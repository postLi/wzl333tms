<template>
  <!-- 送货费 -->
  <div class="tab-content" v-loading="loading">
    <!-- 搜索 -->
    <SearchForm :orgid="otherinfo.orgid" @change="getSearchParam" :btnsize="btnsize"></SearchForm>
    <!-- 操作按钮 -->
    <div class="tab_info">
      <div class="btns_box">
        <el-button type="primary" v-has:PAY_LOADSET2 :size="btnsize" icon="el-icon-sort" @click="doAction('count')" plain>结算</el-button>
        <el-button type="primary" v-has:PAY_LOADPRI2 :size="btnsize" icon="el-icon-printer" @click="doAction('print')" plain>打印</el-button>
        <el-button type="primary" v-has:PAY_LOADEXP2 :size="btnsize" icon="el-icon-download" @click="doAction('export')" plain>导出</el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-setting" @click="setTable" class="table_setup" plain>表格设置</el-button>
      </div>
      <!-- 数据表格 -->
      <div class="info_tab">
        <el-table ref="multipleTable" :key="tablekey" :data="dataList" stripe border @row-click="clickDetails" @selection-change="getSelection" height="100%" tooltip-effect="dark" style="width:100%;" @cell-dblclick="showDetail">
          <el-table-column fixed sortable type="selection" width="35">
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
    </div>
    <!-- 分页 -->
    <div class="info_tab_footer">
      共计:{{ total }}
      <div class="show_pager">
        <Pager :total="total" @change="handlePageChange" />
      </div>
    </div>
    <!-- 表格设置弹出框 -->
    <TableSetup :popVisible="setupTableVisible" :columns='tableColumn' @close="closeSetupTable" @success="setColumn"></TableSetup>
  </div>
</template>
<script>
import { objectMerge2, parseTime } from '@/utils/index'
import SearchForm from './components/searchDeliver'
import Pager from '@/components/Pagination/index'
import TableSetup from '@/components/tableSetup'
import { postPayListByOne } from '@/api/finance/accountsPayable'
import { mapGetters } from 'vuex'
import { PrintInFullPage, SaveAsFile } from '@/utils/lodopFuncs'
export default {
  components: {
    SearchForm,
    Pager,
    TableSetup
  },
  computed: {
    ...mapGetters([
      'otherinfo'
    ])
  },
  data() {
    return {
      btnsize: 'mini',
      feeTypeId: 18, // 送货费
      searchQuery: {
        currentPage: 1,
        pageSize: 100,
        vo: {
          // sign: 2,
          // orgid: 1,
          // ascriptionOrgid: 1,
          status: 'NOSETTLEMENT,PARTSETTLEMENT,ALLSETTLEMENT'
          // loadStartTime: '',
          // loadEndTime: '',
          // departureStartTime: '',
          // departureEndTime: '',
          // batchNo: '',
          // truckIdNumber: '',
          // dirverName: ''
        }
      },
      tablekey: 0,
      total: 0,
      dataList: [],
      selectedList: [],
      selectListBatchNos: [],
      loading: true,
      setupTableVisible: false,
      tableColumn: [
        {
          label: '序号',
          prop: 'id',
          width: '50',
          fixed: true,
          slot: (scope) => {
            return ((this.searchQuery.currentPage - 1) * this.searchQuery.pageSize) + scope.$index + 1
          }
        },
        {
          label: '送货批次',
          prop: 'batchNo',
          width: '130',
          fixed: true
        },
        {
          label: '结算状态',
          prop: 'statusName',
          width: '90',
          fixed: false
        },
        {
          label: '发车网点',
          prop: 'orgName',
          width: '120',
          fixed: false
        },
        {
          label: '送货时间',
          prop: 'loadTime',
          width: '160',
          fixed: false,
          slot: (scope) => {
            return `${parseTime(scope.row.loadTime, '{y}-{m}-{d} {h}:{i}:{s}')}`
          }
        },
        {
          label: '送货费',
          prop: 'fee',
          width: '90',
          fixed: false
        },
        {
          label: '已结送货费',
          prop: 'paidFee',
          width: '100',
          fixed: false,
          slot: (scope) => {
            const row = scope.row
            return this._setTextColor(row.fee, row.paidFee, row.unpaidFee, row.paidFee)
          }
        },
        {
          label: '未结送货费',
          prop: 'unpaidFee',
          width: '100',
          fixed: false,
          slot: (scope) => {
            const row = scope.row
            return this._setTextColor(row.fee, row.paidFee, row.unpaidFee, row.unpaidFee)
          }
        },
        {
          label: '车牌号',
          prop: 'truckIdNumber',
          width: '100',
          fixed: false
        },
        {
          label: '司机名称',
          prop: 'dirverName',
          width: '100',
          fixed: false
        },
        {
          label: '司机电话',
          prop: 'dirverMobile',
          width: '110',
          fixed: false
        },
        {
          label: '送货件数',
          prop: 'loadAmountall',
          width: '90',
          fixed: false
        },
        {
          label: '送货重量',
          prop: 'loadWeightall',
          width: '90',
          fixed: false
        },
        {
          label: '送货体积',
          prop: 'loadVolumeall',
          width: '90',
          fixed: false
        },
        {
          label: '备注',
          prop: 'remark',
          width: '150',
          fixed: false
        }
      ],
      selectedDataList: []
    }
  },
  mounted() {
    this.fetchList()
  },
  methods: {
    getSearchParam(obj) {
      this.searchQuery.currentPage = this.$options.data().searchQuery.currentPage
      this.searchQuery.pageSize = this.$options.data().searchQuery.pageSize
      this.$set(this.searchQuery.vo, 'feeTypeId', this.feeTypeId)
      this.searchQuery.vo = Object.assign({}, obj)
      this.fetchList()
    },
    handlePageChange(obj) {
      this.searchQuery.currentPage = obj.pageNum
      this.searchQuery.pageSize = obj.pageSize
      this.fetchList()
    },
    fetchList() {
      this.$set(this.searchQuery.vo, 'feeTypeId', this.feeTypeId)
      this.loading = true
      return postPayListByOne(this.searchQuery).then(data => {
        this.dataList = data.list
        this.total = data.total
        this.loading = false
      }).catch((err)=>{
        this.loading = false
        this._handlerCatchMsg(err)
      })
    },
    setTable() {},
    doAction(type) {
      switch (type) {
        case 'count':
          this.count()
          break
        case 'export':
          SaveAsFile({
            data: this.selectedDataList.length > 0 ? this.selectedDataList : this.dataList,
            columns: this.tableColumn,
            name: '车费结算-送货费-' + parseTime(new Date(), '{y}{m}{d}{h}{i}{s}')
          })
          break
        case 'print':
          PrintInFullPage({
            data: this.selectedDataList.length > 0 ? this.selectedDataList : this.dataList,
            columns: this.tableColumn,
            name: '车费结算-送货费'
          })
          break
      }
    },
    count() {
      let count = 0
      if (this.selectedList.length !== 0) {
        objectMerge2([], this.selectedList).forEach(e => {
          objectMerge2([], this.selectedList).forEach(el => {
            console.log(e.ascriptionOrgid, el.ascriptionOrgid)
            if (e.ascriptionOrgid !== el.ascriptionOrgid) {
              count++
            }
          })
        })
      }
      if (count > 0) {
        count = 0
        this.$message({ type: 'warning', message: '不能同时结算两个不同的网点' })
        return false
      }
      if (this.selectedList.length !== 0) { // 如果有选择项 就默认传记录里面的结算网点
        this.$set(this.searchQuery.vo, 'ascriptionOrgid', this.selectedList[0].ascriptionOrgid)
      }
      this.$router.push({
        path: '../../accountsLoad',
        query: {
          tab: '送货费结算',
          currentPage: 'batchDeliver', // 本页面标识符
          searchQuery: JSON.stringify(this.searchQuery), // 搜索项
          selectListBatchNos: JSON.stringify(this.selectListBatchNos) // 列表选择项的批次号batchNo
        }
      })
    },
    clickDetails(row) {
      this.$refs.multipleTable.toggleRowSelection(row)
    },
    getSelection(list) {
      this.selectListBatchNos = []
      this.selectedDataList = list
      list.forEach((e, index) => {
        this.selectListBatchNos.push(e.batchNo)
      })
      this.selectedList = list
      console.log(this.selectListBatchNos)
    },
    showDetail(order) {
      // this.eventBus.$emit('showOrderDetail', order.id, order.shipSn, true)
      // this.eventBus.$emit('showOrderDetail', order.id)
    },
    setTable() {
      this.setupTableVisible = true
    },
    closeSetupTable() {
      this.setupTableVisible = false
    },
    setColumn(obj) { // 重绘表格列表
      this.tableColumn = obj
      this.tablekey = Math.random() // 刷新表格视图
    }
  }
}

</script>
