<template>
  <!--v-loading="loading"-->
  <!-- 送货管理 -->
  <div class="tab-content">
    <SearchForm :orgid="otherinfo.orgid" :issender="true" @change="getSearchParam" :btnsize="btnsize" />
    <div class="tab_info">
      <div class="btns_box">
        <el-button type="primary" :size="btnsize" icon="el-icon-circle-plus" plain @click="doAction('add')" v-has:LOAD_SH_ADD>新增送货</el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-document" plain @click="doAction('edit')" v-has:LOAD_SH_UPDATE>修改</el-button>
        <el-button type="danger" :size="btnsize" icon="el-icon-circle-close-outline" @click="doAction('cancelDeliver')" plain v-has:LOAD_SH_CANCELTRUCK>取消送货</el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-edit" @click="doAction('deliverFinish')" plain v-has:LOAD_SH_COMPLETE>送货完成</el-button>
        <!-- <el-button type="primary" :size="btnsize" icon="el-icon-edit-outline" @click="doAction('export')" plain>导出</el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-edit-outline" @click="doAction('print')" plain>打印</el-button> -->
        <el-button type="success" :size="btnsize" icon="el-icon-printer" @click="doAction('export')" plain v-has:LOAD_SH_EXPORT>导出</el-button>
        <el-button type="success" :size="btnsize" icon="el-icon-printer" @click="doAction('print')" plain v-has:LOAD_SH_PRINT>打印</el-button>
         <el-button type="warning" :size="btnsize" icon="el-icon-share" @click="doMap('line')" plain>轨迹跟踪-车辆</el-button>
        <el-button type="warning" :size="btnsize" icon="el-icon-location" @click="doMap('location')" plain>实时定位-车辆</el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-setting" plain @click="setTable" class="table_setup">表格设置</el-button>
        <span class="dbclickTips">双击查看详情</span>
      </div>
      <div class="info_tab">
        <el-table ref="multipleTable" @cell-dblclick="deliverDetail" :data="infoList" stripe border @row-click="clickDetails" @selection-change="getSelection" height="100%"
        :summary-method="getSumLeft"
          show-summary
         tooltip-effect="dark" :default-sort="{prop: 'id', order: 'ascending'}" style="width: 100%" :key="tablekey">
          <el-table-column fixed sortable type="selection" width="60">
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
      <div class="info_tab_footer">共计:{{ total }}
        <div class="show_pager">
          <Pager :total="total" @change="handlePageChange" />
        </div>
      </div>
    </div>
    <!-- 批次详情 -->
    <editInfo :orgid="orgid" :id='loadId' :info="loadInfo" :popVisible.sync="editInfoVisible" @close="closeMe" @isSuccess="isSuccess" @sendInfoData="sendInfo">
    </editInfo>
    <!-- 表格设置弹出框 -->
    <TableSetup :popVisible="setupTableVisible" :columns='tableColumn' @close="closeSetupTable" @success="setColumn" :code="'ORDER_DELIVER'"></TableSetup>
    <!-- 签收弹出框 -->
    <SignFrom :popVisible="signVisible" :dotInfo="dotInfo" @close="closeSign" @message="signMessage"> </SignFrom>
    <!-- 实际发车时间 弹出框 -->
    <actualSendtime :popVisible.sync="timeInfoVisible" @time="getActualTime" :title="'送货完成'"></actualSendtime>
  </div>
</template>
<script>
import { postSelectLoadMainInfoListDeliver, putDeliverLoad, putCompleteDelivery } from '@/api/operation/deliverManage'
import SearchForm from './components/search'
import TableSetup from '@/components/tableSetup'
import editInfo from './components/editInfo'
import { mapGetters } from 'vuex'
import Pager from '@/components/Pagination/index'
import { objectMerge2, parseTime, loadJs, getSummaries, operationPropertyCalc } from '@/utils/index'
import SignFrom from './components/sign'
import { PrintInFullPage, SaveAsFile } from '@/utils/lodopFuncs'
import actualSendtime from '../load/components/actualSendtimeDialog'
export default {
  components: {
    SearchForm,
    Pager,
    TableSetup,
    editInfo,
    SignFrom,
    actualSendtime
  },
  computed: {
    ...mapGetters([
      'otherinfo'
    ]),
    orgid() {
      return this.isModify ? this.selectInfo.orgid : this.searchQuery.vo.orgId || this.otherinfo.orgid
    }
  },
  mounted() {
    this.searchQuery.vo.orgId = this.otherinfo.orgid
    this.fetchAllData()
    // Promise.all(this.fetchAllData(this.otherinfo.orgid)).then(res => {
    //   console.log(res)
    //   this.loading = false
    // })
  },
  data() {
    let LODOP
    return {
      timeInfoVisible: false,
      loading: false,
      btnsize: 'mini',
      infoList: [],
      total: 0,
      trackId: '',
      loadId: 0,
      tablekey: 0,
      dotInfo: {},
      // 加载状态
      // loading: true,
      setupTableVisible: false,
      // AddCustomerVisible: false,
      editInfoVisible: false,
      signVisible: false,
      isModify: false,
      isBatch: false,
      selectInfo: {},
      loadInfo: [],
      commonData: {},
      // 选中的行
      selected: [],
      searchQuery: {
        currentPage: 1,
        // pageNum: 1,
        pageSize: 100,
        vo: {
          // orgId: 1,
          loadTypeId: 40,
          loadStartTime: '',
          loadEndTime: '',
          departureStartTime: '',
          departureEndTime: '',
          batchTypeId: '',
          arriveOrgid: '',
          batchNo: '',
          truckIdNumber: '',
          dirverName: ''
        }
      },
      tableColumn: [
      {
        label: '序号',
        prop: 'number',
        width: '80',
        fixed: true,
        slot: (scope) => {
          return ((this.searchQuery.currentPage - 1) * this.searchQuery.pageSize) + scope.$index + 1
        }
      },
      {
        label: '送货批次',
        prop: 'batchNo',
        width: '110',
        fixed: true
      },
      {
        label: '批次状态',
        prop: 'bathStatusName',
        width: '120'
      },
      {
        label: '到付(元)',
        prop: 'shipArrivepayFee',
        width: '90',
        fixed: false
      },
      {
        label: '车牌号',
        prop: 'truckIdNumber',
        width: '120'
      },
      {
        label: '司机',
        prop: 'dirverName',
        width: '120'
      },
      {
        label: '司机电话',
        prop: 'dirverMobile',
        width: '120'
      },
      {
        label: '实际送货完成时间',
        prop: 'actualArrivetime',
        width: '180',
        slot: (scope) => {
          return `${parseTime(scope.row.actualArrivetime, '{y}-{m}-{d} {h}:{i}:{s}')}`
        }
      },
      {
        label: '实际送货时间',
        prop: 'loadTime',
        width: '180',
        slot: (scope) => {
          return `${parseTime(scope.row.loadTime, '{y}-{m}-{d} {h}:{i}:{s}')}`
        }
      },
      {
        label: '完成时间',
        prop: 'departureTime',
        width: '180',
        slot: (scope) => {
          return `${parseTime(scope.row.departureTime, '{y}-{m}-{d} {h}:{i}:{s}')}`
        }
      },
      {
        label: '送货费(元)',
        prop: 'deliveryFee',
        width: '120'
      },
      {
        label: '送货件数',
        prop: 'loadAmountall',
        width: '120'
      },
      {
        label: '送货重量(kg)',
        prop: 'loadWeightall',
        width: '120'
      },
      {
        label: '送货体积(m³)',
        prop: 'loadVolumeall',
        width: '120'
      },
      {
        label: '重量装载率',
        prop: 'weightLoadRate',
        width: '120'
      }, {
        label: '体积装载率',
        prop: 'volumeLoadRate',
        width: '120'
      },
      {
        label: '备注',
        prop: 'remark',
        width: '120'
      }
      ]
    }
  },
  methods: {
    doMap(type) { // 查询批次车辆轨迹或定位
      console.log('选择的批次数', this.selected.length)
      if (!this.selected.length || this.selected.length !== 1) {
        this.$message.warning('只能选择一条数据来查询~')
        this.$refs.multipleTable.clearSelection()
        return false
      }
      let item = this.selected[0]
      console.log('当前选中的批次', item, item.truckIdNumber)
      if (!item.truckIdNumber) {
        this.$message.warning('查询失败！该批次没有关联车辆~')
        return false
      }

       let query = {
        truckIdNumber: item.truckIdNumber,
        startTime: item.createTime,
        endTime: parseTime(new Date())
      }

      // 判断时间区间
      // 送货状态为 送货中(57) createTime创建时间 ~ now
      // 其他送货状态  createTime ~ departureTime送货完成时间
      // 开始时间定义：小于7天才用前面的时间createTime，大于7天则用后面的时间倒推7天

      let now = new Date().getTime() // 现在
      let betweenDay = now - 3600 * 1000 * 24 * 7 // 7天前
      let startTime = new Date(item.createTime).getTime()

      let isAfterSeven = betweenDay > startTime // true-超过7天  false-不超过7天

      if (item.batchTypeId === 57) { // 送货中
        query.startTime = isAfterSeven ? parseTime(betweenDay) : item.createTime
        query.endTime = parseTime(now)
      }else { // 其他状态
        query.startTime = item.createTime
        query.endTime = item.departureTime
      }

      switch (type) {
        case 'line': // 轨迹
          this.$router.push({path: '/operation/order/trucklog', query: {
            searchQuery: JSON.stringify(query),
            flag: 'line',
            type: 'truck',
            timer: new Date().getTime()
          }})
          break
        case 'location': // 定位
        this.$router.push({path: '/operation/order/trucklog', query: {
            searchQuery: JSON.stringify(query),
            flag: 'location',
            type: 'truck',
            timer: new Date().getTime()
          }})
          break
      }
      this.$refs.multipleTable.clearSelection()
    },
    getSumLeft(param, type) {
      return getSummaries(param, operationPropertyCalc)
    },
    fetchAllData() {
      this.loading = true
      this.$set(this.searchQuery.vo, 'orgId', this.otherinfo.orgid)
      if (this.searchQuery.vo.batchTypeId === 56) {
        this.searchQuery.vo.batchTypeId = undefined
      }
      return postSelectLoadMainInfoListDeliver(this.searchQuery).then(data => {
        this.infoList = data.list
        this.infoList.forEach((el, index) =>{
          el.bathStatusName = el.batchTypeName
        })
        this.total = data.total
        this.loading = false
      })
        .catch(err => {
          this._handlerCatchMsg(err)
        })
    },
    fetchData() {
      this.fetchAllData()
    },
    handlePageChange(obj) {
      Object.assign(this.searchQuery, obj)
      this.fetchData()
    },
    getSearchParam(obj) {
      this.searchQuery.currentPage = this.$options.data().searchQuery.currentPage
      this.searchQuery.pageSize = this.$options.data().searchQuery.pageSize
      this.searchQuery.vo = objectMerge2({}, obj)
      if (!this.searchQuery.vo.orgId) {
        this.searchQuery.vo.orgId = this.otherinfo.orgid
      }
      this.fetchAllData()
    },
    getSelection(selection) {
      this.selected = selection
      this.isBatch = true
    },
    doAction(type) {
      let isWork = false
      if (this.selected.length < 1 && type !== 'add' && type !== 'print' && type !== 'export') { // 判断是否有选中项
        // this.closeAddCustomer()
        this.$message({
          message: '请选择要操作的项~',
          type: 'warning'
        })
        isWork = false
      } else {
        isWork = true
      }

      switch (type) {
        case 'add': // 添加
          this.add()
          break
        case 'edit': // 编辑
          this.edit()
          break
        case 'deliverFinish': // 送货完成(批量)
          if (isWork) {
            this.timeInfoVisible = true
          }
          break
        case 'cancelDeliver': // 取消送货(批量)
          if (isWork) {
            this.cancelDeliver()
          }
          break
        case 'export': // 导出
          SaveAsFile({
            data: this.selected.length ? this.selected : this.infoList,
            columns: this.tableColumn,
            name: '送货管理'
          })
          break
        case 'print': // 打印
          PrintInFullPage({
            data: this.selected.length ? this.selected : this.infoList,
            columns: this.tableColumn,
            name: '送货管理'
          })
          break
      }
      if (type !== 'deliverFinish') {
        // 清除选中状态，避免影响下个操作
        this.$refs.multipleTable.clearSelection()
      }
    },
    setData(type) {
      let data = {}
      this.$set(data, 'loadTypeId', 40) // 40-送货
      this.$set(data, 'loadIds', [])
      this.selected.forEach(e => {
        if (e.batchTypeId === type) {
          data.loadIds.push(e.loadId) // 将符合typeid的选取，过滤选择项
        } else {
          this.isBatch = false
        }
      })
      data.loadIds = data.loadIds.join(',')
      if (data.loadIds.length < 1) { // 如果id为空，即请求状态不对，拦截请求
        this.isBatch = false
      }
      this.commonData = data
      data = {}
    },
    add() {
      this.$router.push({ path: '././load', query: { loadTypeId: 40, tab: '新增送货' }})
    },
    edit() {
      if (this.selected.length !== 1) {
        this.$message({
          message: '每次只能修改单条数据~',
          type: 'warning'
        })
        return false
      } else if (this.selected[0].batchTypeId !== 57) {
        this.$message({ type: 'warning', message: '送货中状态才可以编辑' })
      } else if (this.selected.length === 1) {
        this.selectInfo = this.selected[0]
        this.$router.push({ path: '././load', query: { loadTypeId: 40, info: this.selectInfo, tablekey: Math.random(), tab: '修改送货', flag: this.selectInfo.batchNo }})
      }
    },
    getActualTime(obj) { // 送货完成
      this.setData(57) // 57-送货中
      if (this.isBatch) {
        const timer = obj.actualSendtime ? obj.actualSendtime : parseTime(new Date(), '{y}-{m}-{d} {h}:{i}:{s}')
        this.$set(this.commonData, 'actualArrivetime', timer)
        this.loading = true
        putCompleteDelivery(this.commonData).then(data => {
          if (data) {
            this.loading = false
            this.$message({ type: 'success', message: '操作成功' })
            this.fetchData()
          }
        })
          .catch(err => {
            this.loading = false
            this._handlerCatchMsg(err)
          })
      } else {
        this.$message({ type: 'warning', message: '送货中状态才可以送货完成' })
      }
    },
    cancelDeliver() { // 取消送货
      this.setData(57)
      if (this.isBatch) {
        this.loading = true
        putDeliverLoad(this.commonData).then(data => {
          if (data) {
            this.loading = false
            this.$message({ type: 'success', message: '操作成功' })
            this.fetchData()
          }
        })
          .catch(err => {
            this.loading = false
            this._handlerCatchMsg(err)
          })
      } else {
        this.$message({ type: 'warning', message: '送货中状态才可以取消送货' })
      }
    },
    deliverDetail(row, column, cell, event) { // 双击单元格弹出详情页
      this.loadInfo = objectMerge2([], row)
      this.loadId = row.loadId
      this.setInfo()
      console.log(this.loadInfo)
    },
    clearData() {
      this.isBatch = false
      this.commonTruck = {}
      this.selected = []
      this.$refs.multipleTable.clearSelection()
    },
    setTable() {
      this.setupTableVisible = true
    },
    closeSetupTable() {
      this.setupTableVisible = false
    },
    clickDetails(row, event, column) {
      this.$refs.multipleTable.toggleRowSelection(row)
    },
    closeMe() { // 关闭弹出框
      this.editInfoVisible = false
    },
    closeSign() {
      this.signVisible = false
    },
    setInfo() { // 打开弹出框
      this.editInfoVisible = true
      this.$refs.multipleTable.clearSelection()
    },
    clearInfo() { // 清空数据
      this.editInfoVisible = false
      this.$refs.multipleTable.clearSelection()
    },
    isSuccess(obj) {
      if (obj) {
        this.getAllList()
      }
    },
    sendInfo(obj) { // 孙子-打开签收弹出框
      // console.log('祖父',JSON.stringify(obj))
      this.dotInfo = objectMerge2({}, obj)
      console.log(this.dotInfo, 'sdfsdfsdfhwuiefhsuihf')
      this.$nextTick(() => {
        this.signVisible = true
      })
    },
    signMessage(obj) { // 孙子-获取签收弹出框信息
      this.tablekey = Math.random()
      this.closeMe()
    },
    setColumn(obj) { // 重绘表格列表
      this.tableColumn = obj
      this.tablekey = new Date().getTime() // 刷新表格视图
    }
  }
}

</script>
