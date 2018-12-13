<template>
  <div class="tab-content" v-loading="loading">
    <!-- 短驳发车 -->
    <SearchForm :orgid="otherinfo.orgid" @change="getSearchParam" :btnsize="btnsize" />
    <div class="tab_info">
      <div class="btns_box">
        <el-button type="primary" v-has:LOAD_DB_ADD :size="btnsize" icon="el-icon-plus" plain @click="doAction('add')" v-has:LOAD_DB_ADD>新增短驳</el-button>
        <el-button type="success" :size="btnsize" icon="el-icon-document" plain @click="doAction('truck')" v-has:LOAD_DB_LOADDEPART>发车</el-button>
        <el-button type="warning" :size="btnsize" icon="el-icon-circle-close-outline" plain @click="doAction('chanelTruck')" v-has:LOAD_DB_CANCELDEPART>取消发车</el-button>
        <el-button type="warning" :size="btnsize" icon="el-icon-circle-close-outline" plain @click="doAction('chanelRepertory')" v-has:LOAD_DB_CANCELTRUCK>取消装车</el-button>
        <el-button :type="isDisBtn?'info':'primary'" :size="btnsize" icon="el-icon-printer" @click="doAction('edit')" plain :disabled="isDisBtn" v-has:LOAD_DB_UPDATE>修改</el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-printer" @click="doAction('print')" plain v-has:LOAD_DB_PRINT>打印</el-button>
        <el-button type="success" :size="btnsize" icon="el-icon-download" @click="doAction('export')" plain v-has:LOAD_DB_EXPORT>导出</el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-setting" plain @click="setTable" class="table_setup">表格设置</el-button>
        <span class="dbclickTips">双击查看详情</span>
      </div>
      <div class="info_tab">
        <!-- 完成并发车：有发车时间和配载时间
            完成配载：只有配载时间 -->
        <el-table ref="multipleTable" :key="tablekey" :data="dataList" stripe border @row-click="clickDetails" @selection-change="getSelection" height="100%"
        :summary-method="getSumLeft"
          show-summary
           tooltip-effect="dark" style="width:100%;" :default-sort="{prop: 'id', order: 'ascending'}" @cell-dblclick="truckDetail">
          <el-table-column fixed sortable type="selection" width="50">
          </el-table-column>
          <template v-for="column in tableColumn">
            <el-table-column :key="column.id" :fixed="column.fixed" sortable :label="column.label" :prop="column.prop" v-if="!column.slot" :width="column.width">
            </el-table-column>
            <el-table-column :key="column.id" :fixed="column.fixed" sortable :label="column.label" v-else :width="column.width">
              <template slot-scope="scope">
                <span class="clickitem" v-if="column.click" v-html="column.slot(scope)" @click.stop="column.click(scope)"></span>
                <span v-else v-html="column.slot(scope)"></span>
              </template>
            </el-table-column>
          </template>
        </el-table>
      </div>
      <div class="info_tab_footer">
        共计:{{ total }}
        <div class="show_pager">
          <Pager :total="total" @change="handlePageChange" />
        </div>
      </div>
    </div>
    <!-- 表格设置 -->
    <TableSetup code="ORDER_SHORT-1" :popVisible="setupTableVisible" :columns='tableColumn' @close="closeSetupTable" @success="setColumn"></TableSetup>
    <!-- 在途跟踪 -->
    <editInfo :id='loadId' :info="loadInfo" :popVisible.sync="editInfoVisible" @close="closeMe" @isSuccess="isSuccess" :type="'deliver'"></editInfo>
    <!-- 实际发车时间 弹出框 -->
    <actualSendtime :popVisible.sync="timeInfoVisible" @time="getActualTime"></actualSendtime>
  </div>
</template>
<script>
import { postAllshortDepartList, putTruckDepart, putTruckChanel, putTruckLoad } from '@/api/operation/shortDepart'
import { mapGetters } from 'vuex'
import SearchForm from './components/search'
import Pager from '@/components/Pagination/index'
import { objectMerge2, parseTime, getSummaries, operationPropertyCalc } from '@/utils/index'
import TableSetup from '@/components/tableSetup'
import editInfo from './components/editInfo'
import { PrintInFullPage, SaveAsFile } from '@/utils/lodopFuncs'
import actualSendtime from '../load/components/actualSendtimeDialog'
export default {
  components: {
    Pager,
    SearchForm,
    postAllshortDepartList,
    TableSetup,
    editInfo,
    actualSendtime
  },
  data() {
    return {
      searchForm: {},
      timeInfoVisible: false,
      selectInfoList: [],
      total: 0,
      btnsize: 'mini',
      setupTableVisible: false,
      tablekey: 0, // 初始化表格视图key
      selected: [],
      loading: true,
      selectedList: [],
      loadInfo: [],
      isModify: false,
      isBatch: false,
      commonTruck: {},
      loadId: 0,
      selectInfo: {},
      isDisBtn: true,
      selectedData: {},
      editInfoVisible: false,
      dataList: [],
      searchQueryData: {
        pageSize: 100,
        currentPage: 1
      },
      searchQuery: {
        orgId: 1,
        loadTypeId: 38,
        loadStartTime: '',
        loadEndTime: '',
        departureStartTime: '',
        departureEndTime: '',
        batchTypeId: '',
        arriveOrgid: '',
        batchNo: '',
        truckIdNumber: '',
        dirverName: ''
      },
      tableColumn: [
        // {
        //     label: "ID",
        //     width: "80",
        //     fixed: true,
        //     slot: (scope) => {
        //       return ((this.searchQueryData.currentPage - 1)*this.searchQueryData.pageSize) + scope.$index + 1
        //     }
        //   },
        {
          label: '发车批次',
          prop: 'batchNo',
          width: '110'
        },
        {
          label: '批次状态',
          prop: 'batchTypeName',
          width: '90'
        },
        {
          label: '到付(元)',
          prop: 'shipArrivepayFee',
          width: '90',
          fixed: false
        },
        {
          label: '操作费(元)',
          prop: 'handlingFeeAll',
          width: '100',
          fixed: false
        },
        {
          label: '车牌号',
          prop: 'truckIdNumber',
          width: '100'
        },
        {
          label: '司机',
          prop: 'dirverName',
          width: '120'
        },
        {
          label: '司机电话',
          prop: 'dirverMobile',
          width: '110'
        },
        {
          label: '实际短驳时间',
          prop: 'departureTime',
          width: '160',
          slot: (scope) => {
            return `${parseTime(scope.row.actualSendtime, '{y}-{m}-{d} {h}:{i}:{s}')}`
          }
        },
        {
          label: '短驳操作时间',
          prop: 'departureTime',
          width: '160',
          slot: (scope) => {
            return `${parseTime(scope.row.departureTime, '{y}-{m}-{d} {h}:{i}:{s}')}`
          }
        },
        {
          label: '配载时间',
          prop: 'loadTime',
          width: '160',
          slot: (scope) => {
            return `${parseTime(scope.row.loadTime, '{y}-{m}-{d} {h}:{i}:{s}')}`
          }
        },
        {
          label: '发车网点',
          prop: 'orgName',
          width: '120'
        },
        {
          label: '到达网点',
          prop: 'arriveOrgName',
          width: '120'
        },
        {
          label: '到车操作时间',
          prop: 'receivingTime',
          width: '160',
          slot: (scope) => {
            return `${parseTime(scope.row.receivingTime, '{y}-{m}-{d} {h}:{i}:{s}')}`
          }
        },
        {
          label: '短驳费(元)',
          prop: 'shortFee',
          width: '100'
        },
        {
          label: '配载总件数',
          prop: 'loadAmountall',
          width: '100'
        },
        {
          label: '配载总重量(kg)',
          prop: 'loadWeightall',
          width: '120'
        },
        {
          label: '配载总体积(m³)',
          prop: 'loadVolumeall',
          width: '120'
        },
        {
          label: '重量装载率',
          prop: 'weightLoadRate',
          width: '100'
        }, {
          label: '体积装载率',
          prop: 'volumeLoadRate',
          width: '100'
        },
        {
          label: '短驳经办人',
          prop: 'userName',
          width: '100'
        },
        {
          label: '备注',
          prop: 'remark',
          width: '150'
        }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'otherinfo'
    ]),
    orgid() {
      return this.isModify ? this.selectInfo.orgid : this.searchQuery.vo.orgid || this.otherinfo.orgid
    }
  },
  watch: {
    '$route'(to, from) {
      console.log('========route========', to, from)
    }
  },
  methods: {
    getSumLeft(param, type) {
      return getSummaries(param, operationPropertyCalc)
    },
    closeMe() { // 关闭弹出框
      this.editInfoVisible = false
    },
    getSearchParam(obj) {
      this.searchQueryData = this.$options.data().searchQueryData
      this.searchQuery = objectMerge2({}, obj) // 38-短驳 39-干线 40-送货
      // if (!this.searchQuery.orgId) {
      //   this.searchQuery.orgId = this.otherinfo.orgid
      // }
      this.fetchAllShortDepartList()
    },
    doAction(type) {
      let isWork = false
      if (this.selected.length < 1 && type !== 'add' && this.selectedList.length < 1 && type !== 'export' && type !== 'print') {
        this.$message({
          message: '请选择数据~',
          type: 'warning'
        })
        isWork = false
      } else {
        isWork = true
      }
      switch (type) {
        case 'add':
          this.$router.push({ path: '/operation/order/load', query: { loadTypeId: 38, tab: '新增短驳' }})
          break
        case 'truck': // 发车
          if (isWork) {
            this.timeInfoVisible = true
          }
          break
        case 'chanelTruck': // 取消发车
          if (isWork) {
            this.chanelTruck()
          }
          break
        case 'chanelRepertory': // 取消装车
          if (isWork) {
            this.chanelRepertory()
          }
          break
        case 'edit': // 修改
          this.edit()
          break
        case 'export': // 导出
          SaveAsFile({
            data: this.selectInfoList.length ? this.selectInfoList : this.dataList,
            columns: this.tableColumn,
            name: '短驳发车'
          })
          break
        case 'print': // 打印
          PrintInFullPage({
            data: this.selectInfoList.length ? this.selectInfoList : this.dataList,
            columns: this.tableColumn,
            name: '短驳发车'
          })
          break
      }
    },
    setTable() {
      this.setupTableVisible = true
    },
    closeSetupTable() {
      this.setupTableVisible = false
    },
    clickDetails(row) {
      this.$refs.multipleTable.toggleRowSelection(row)
    },
    getSelection(list) {
      this.selectInfoList = Object.assign([], list)
      if (list.length === 1) {
        this.selected = Object.assign([], list)
        this.isDisBtn = false
        const tid = 0
        this.selected.forEach(e => {
          this.selectedData = Object.assign({}, e)
        })
      } else {
        this.isDisBtn = true
        this.selectedList = Object.assign([], list)
      }
      this.isBatch = true
    },
    handlePageChange(obj) {
      this.searchQueryData.currentPage = obj.pageNum
      this.searchQueryData.pageSize = obj.pageSize
      this.getAllList()
    },
    fetchAllShortDepartList() {
      this.getAllList()
    },
    getAllList() {
      this.loading = true
      this.$set(this.searchQueryData, 'vo', this.searchQuery)
      if (this.searchQueryData.vo.batchTypeId === 46) {
        this.searchQueryData.vo.batchTypeId = undefined
      }
      return postAllshortDepartList(this.searchQueryData).then(data => {
        if (data) {
          this.dataList = data.list
          this.total = data.total
          this.loading = false
        } else {
          this.loading = false
        }
      })
        .catch(err => {
          this._handlerCatchMsg(err)
        })
    },
    clearData() {
      this.isBatch = false
      this.commonTruck = {}
      this.selected = []
      this.selectedList = []
      this.selectedData = {}
      this.$refs.multipleTable.clearSelection()
    },
    truckDetail(row) {
      console.log(row)
      this.loadId = row.id
      this.loadInfo = Object.assign([], row)
      this.$nextTick(() => {
        this.editInfoVisible = true
        this.$refs.multipleTable.clearSelection()
      })
    },
    setData(type) {
      let data = {}
      this.$set(data, 'loadTypeId', 38) // 短驳
      this.$set(data, 'loadIds', [])
      if (this.isDisBtn) { // 批量操作
        this.selectedList.forEach((e, index) => {
          if (e.batchTypeId === type) { // 47-短驳发车 48-短驳中
            data.loadIds.push(e.loadId) // 将符合type的id选取
          }
        })
      } else {
        this.selected.forEach((e, index) => {
          if (e.batchTypeId === type) { // 47-短驳发车 48-短驳中
            data.loadIds.push(e.loadId)
          } else {
            this.isBatch = false
          }
        })
      }
      data.loadIds = data.loadIds.join(',')
      if (!data.loadIds) { // 如果id为空，即请求状态不对，拦截请求
        this.isBatch = false
      }
      console.log('data', data)
      this.commonTruck = Object.assign({}, data)
      data = {}
    },
    getActualTime(obj) {
      this.setData(47)
      if (this.isBatch) {
        console.log('发车', this.commonTruck)
        const timer = obj.actualSendtime ? obj.actualSendtime : parseTime(new Date(), '{y}-{m}-{d} {h}:{i}:{s}')
        this.$set(this.commonTruck, 'actualSendtime', timer)
        this.loading = true
        putTruckDepart(this.commonTruck).then(data => {
          if (data) {
            this.loading = false
            this.$message({ type: 'success', message: '发车成功！' })
            this.fetchAllShortDepartList()
            this.clearData()
          }
        })
          .catch(err => {
            this.loading = false
            this._handlerCatchMsg(err)
            this.clearData()
          })
      } else {
        this.$message({ type: 'warning', message: '已装车状态才可以发车确认' })
        this.clearData()
      }
    },
    chanelTruck() { // 取消发车
      this.setData(48)
      if (this.isBatch) {
        this.$confirm('此操作将取消发车, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.loading = true
          console.log('取消发车', this.commonTruck)
          putTruckChanel(this.commonTruck).then(data => {
            if (data) {
              this.loading = false
              this.$message({ type: 'success', message: '取消发车操作成功！' })
              this.fetchAllShortDepartList()
              this.clearData()
            }
          })
            .catch(err => {
              this.loading = false
              this._handlerCatchMsg(err)
              this.clearData()
            })
        })
      } else {
        this.$message({ type: 'warning', message: '短驳中状态才可以取消发车' })
        this.clearData()
      }
    },
    chanelRepertory() { // 取消装车
      this.setData(47)
      if (this.isBatch) {
        this.$confirm('此操作将取消装车, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log('取消装车', this.commonTruck)
          this.loading = true
          putTruckLoad(this.commonTruck).then(data => {
            if (data) {
              this.loading = false
              this.$message({ type: 'success', message: '取消装车操作成功！' })
              this.fetchAllShortDepartList()
              this.clearData()
            }
          })
            .catch(err => {
              this.loading = false
              this._handlerCatchMsg(err)
              this.clearData()
            })
        })
      } else {
        this.$message({ type: 'warning', message: '已装车状态才可以取消装车' })
        this.clearData()
      }
    },
    edit() { // 修改
      const batchTypeId = this.selectedData.batchTypeId
      if (batchTypeId === 47 || batchTypeId === 48) {
        this.$router.push({ path: '/operation/order/load', query: { loadTypeId: 38, info: this.selectedData, tab: '修改短驳', flag: this.selectedData.batchNo }})
      } else {
        this.$message({ type: 'warning', message: '【 ' + this.selectedData.batchNo + ' 】已【 ' + this.selectedData.batchTypeName + ' 】不可以修改' })
        this.clearData()
      }
    },
    isSuccess(obj) {
      if (obj) {
        this.getAllList()
      }
    },
    setColumn(obj) { // 重绘表格列表
      this.tableColumn = obj
      this.tablekey = Math.random() // 刷新表格视图
    }
  }
}

</script>
