<template>
  <!-- 发车汇总 -->
  <div class="tab-content" v-loading="loading">
    <!-- 搜索 -->
    <SearchForm :orgid="otherinfo.orgid" @change="getSearchParam" :isAllOrg="false"  :isArrivalSel="true" :btnsize="btnsize"></SearchForm>
    <!-- 操作按钮 -->
    <div class="tab_info">
      <div class="btns_box">
        <el-button type="primary" :size="btnsize" icon="el-icon-sort" v-has:PAY_LOADSET3 @click="doAction('count')" plain>核销</el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-printer" v-has:PAY_LOADPRI3 @click="doAction('print')" plain>打印</el-button>
        <el-button type="primary" v-has:PAY_LOADEXP3 :size="btnsize" icon="el-icon-download" @click="doAction('export')" plain>导出</el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-setting" @click="setTable" class="table_setup" plain>表格设置</el-button>
      </div>
      <!-- 数据表格 -->
      <div class="info_tab">
        <el-table ref="multipleTable" :key="tablekey" :data="dataList" stripe border @row-click="clickDetails" @selection-change="getSelection" height="100%" tooltip-effect="dark" style="width:100%;"  @cell-dblclick="showDetail" :show-summary="true" :summary-method="getSummaries">
          <el-table-column fixed sortable type="selection" width="35">
          </el-table-column>
          <template v-for="column in tableColumn">
            <el-table-column :key="column.id" :fixed="column.fixed" sortable :label="column.label" :prop="column.prop" v-if="!column.slot" :width="column.width">
            </el-table-column>
            <el-table-column :key="column.id" :fixed="column.fixed" sortable :label="column.label" v-else :width="column.width" :prop="column.prop">
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
import { objectMerge2, parseTime, getSummaries } from '@/utils/index'
import SearchForm from './components/searchArtery'
import Pager from '@/components/Pagination/index'
import TableSetup from '@/components/tableSetup'
import { postPayListBySummary } from '@/api/finance/accountsPayable'
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
      sign: 1, // 1-发车汇总
      searchQuery: {
        currentPage: 1,
        pageSize: 100,
        vo: {
          // sign: 1,
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
      selectListBatchNos: [],
      selectedList: [],
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
          label: '发车批次',
          prop: 'batchNo',
          width: '120',
          fixed: true
        },
        {
          label: '批次状态',
          prop: 'batchTypeName',
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
          label: '到达网点',
          prop: 'arriveOrgName',
          width: '120',
          fixed: false
        },
        {
          label: '发车时间',
          prop: 'departureTime',
          width: '160',
          fixed: false,
          slot: (scope) => {
            return `${parseTime(scope.row.departureTime, '{y}-{m}-{d} {h}:{i}:{s}')}`
          }
        },
        {
          label: '到达时间',
          prop: 'receivingTime',
          width: '160',
          fixed: false,
          slot: (scope) => {
            return `${parseTime(scope.row.receivingTime, '{y}-{m}-{d} {h}:{i}:{s}')}`
          }
        },
        {
          label: '现付车费',
          prop: 'nowpayCarriage',
          width: '90',
          fixed: false
        },
        {
          label: '已核销现付车费',
          prop: 'paidNowpayCarriage',
          width: '120',
          fixed: false,
          slot: (scope) => {
            const row = scope.row
            return this._setTextColor(row.nowpayCarriage, row.paidNowpayCarriage, row.unpaidNowpayCarriage, row.paidNowpayCarriage)
          }
        },
        {
          label: '未核销现付车费',
          prop: 'unpaidNowpayCarriage',
          width: '120',
          fixed: false,
          slot: (scope) => {
            const row = scope.row
            return this._setTextColor(row.nowpayCarriage, row.paidNowpayCarriage, row.unpaidNowpayCarriage, row.unpaidNowpayCarriage)
          }
        },
        {
          label: '现付油卡',
          prop: 'nowpayOilCard',
          width: '90',
          fixed: false
        },
        {
          label: '已核销现付油卡',
          prop: 'paidNowpayOilCard',
          width: '120',
          fixed: false,
          slot: (scope) => {
            const row = scope.row
            return this._setTextColor(row.nowpayOilCard, row.paidNowpayOilCard, row.unpaidNowpayOilCard, row.paidNowpayOilCard)
          }
        },
        {
          label: '未核销现付油卡',
          prop: 'unpaidNowpayOilCard',
          width: '120',
          fixed: false,
          slot: (scope) => {
            const row = scope.row
            return this._setTextColor(row.nowpayOilCard, row.paidNowpayOilCard, row.unpaidNowpayOilCard, row.unpaidNowpayOilCard)
          }
        },
        {
          label: '回付车费',
          prop: 'backpayCarriage',
          width: '90',
          fixed: false
        },
        {
          label: '已核销回付车费',
          prop: 'paidBackpayCarriage',
          width: '120',
          fixed: false,
          slot: (scope) => {
            const row = scope.row
            return this._setTextColor(row.backpayCarriage, row.paidBackpayCarriage, row.unpaidBackpayCarriage, row.paidBackpayCarriage)
          }
        },
        {
          label: '未核销回付车费',
          prop: 'unpaidBackpayCarriage',
          width: '120',
          fixed: false,
          slot: (scope) => {
            const row = scope.row
            return this._setTextColor(row.backpayCarriage, row.paidBackpayCarriage, row.unpaidBackpayCarriage, row.unpaidBackpayCarriage)
          }
        },
        {
          label: '回付油卡',
          prop: 'backpayOilCard',
          width: '90',
          fixed: false
        },
        {
          label: '已核销回付油卡',
          prop: 'paidBackpayOilCard',
          width: '120',
          fixed: false,
          slot: (scope) => {
            const row = scope.row
            return this._setTextColor(row.backpayOilCard, row.paidBackpayOilCard, row.paidBackpayOilCard, row.paidBackpayOilCard)
          }
        },
        {
          label: '未核销回付油卡',
          prop: 'unpaidBackpayOilCard',
          width: '120',
          fixed: false,
          slot: (scope) => {
            const row = scope.row
            return this._setTextColor(row.backpayOilCard, row.paidBackpayOilCard, row.unpaidBackpayOilCard, row.unpaidBackpayOilCard)
          }
        },
        {
          label: '整车保险费',
          prop: 'carloadInsuranceFee',
          width: '100',
          fixed: false
        },
        {
          label: '已核销整车保险费',
          prop: 'paidCarloadInsuranceFee',
          width: '120',
          fixed: false,
          slot: (scope) => {
            const row = scope.row
            return this._setTextColor(row.carloadInsuranceFee, row.paidCarloadInsuranceFee, row.unpaidCarloadInsuranceFee, row.paidCarloadInsuranceFee)
          }
        },
        {
          label: '未核销整车保险费',
          prop: 'unpaidCarloadInsuranceFee',
          width: '120',
          fixed: false,
          slot: (scope) => {
            const row = scope.row
            return this._setTextColor(row.carloadInsuranceFee, row.paidCarloadInsuranceFee, row.unpaidCarloadInsuranceFee, row.unpaidCarloadInsuranceFee)
          }
        },
        {
          label: '发站装卸费',
          prop: 'leaveHandlingFee',
          width: '100',
          fixed: false
        },
        {
          label: '已核销发站装卸费',
          prop: 'paidLeaveHandlingFee',
          width: '120',
          fixed: false,
          slot: (scope) => {
            const row = scope.row
            return this._setTextColor(row.leaveHandlingFee, row.paidLeaveHandlingFee, row.unpaidLeaveHandlingFee, row.paidLeaveHandlingFee)
          }
        },
        {
          label: '未核销发站装卸费',
          prop: 'unpaidLeaveHandlingFee',
          width: '120',
          fixed: false,
          slot: (scope) => {
            const row = scope.row
            return this._setTextColor(row.leaveHandlingFee, row.paidLeaveHandlingFee, row.unpaidLeaveHandlingFee, row.unpaidLeaveHandlingFee)
          }
        },
        {
          label: '发站其他费',
          prop: 'leaveOtherFee',
          width: '100',
          fixed: false
        },
        {
          label: '已核销发站其他费',
          prop: 'paidLeaveOtherFee',
          width: '120',
          fixed: false,
          slot: (scope) => {
            const row = scope.row
            return this._setTextColor(row.leaveOtherFee, row.paidLeaveOtherFee, row.unpaidLeaveOtherFee, row.paidLeaveOtherFee)
          }
        },
        {
          label: '未核销发站其他费',
          prop: 'unpaidLeaveOtherFee',
          width: '120',
          fixed: false,
          slot: (scope) => {
            const row = scope.row
            return this._setTextColor(row.leaveOtherFee, row.paidLeaveOtherFee, row.unpaidLeaveOtherFee, row.unpaidLeaveOtherFee)
          }
        },
        {
          label: '车牌号',
          prop: 'truckIdNumber',
          width: '110',
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
          label: '配载件数',
          prop: 'loadAmountall',
          width: '90',
          fixed: false
        },
        {
          label: '配载重量',
          prop: 'loadWeightall',
          width: '90',
          fixed: false
        },
        {
          label: '配载体积',
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
  methods: {
    getSearchParam(obj) {
      this.searchQuery.currentPage = this.$options.data().searchQuery.currentPage
      this.searchQuery.pageSize = this.$options.data().searchQuery.pageSize
      this.searchQuery.vo = Object.assign({}, obj)
      this.fetchList()
    },
    handlePageChange(obj) {
      this.searchQuery.currentPage = obj.pageNum
      this.searchQuery.pageSize = obj.pageSize
      this.fetchList()
    },
    fetchList() {
      this.$set(this.searchQuery.vo, 'sign', this.sign)
      // this.$set(this.searchQuery.vo, 'orgid', this.otherinfo.orgid)
      // this.$set(this.searchQuery.vo, 'ascriptionOrgid', this.otherinfo.orgid)
      this.loading = true
      return postPayListBySummary(this.searchQuery).then(data => {
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
            name: '车费核销-发车汇总-' + parseTime(new Date(), '{y}{m}{d}{h}{i}{s}')
          })
          break
        case 'print':
          PrintInFullPage({
            data: this.selectedDataList.length > 0 ? this.selectedDataList : this.dataList,
            columns: this.tableColumn,
            name: '车费核销-发车汇总'
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
        this.$message({ type: 'warning', message: '不能同时核销两个不同的网点' })
        return false
      }
      if (this.selectedList.length !== 0) { // 如果有选择项 就默认传记录里面的核销网点
        this.$set(this.searchQuery.vo, 'ascriptionOrgid', this.selectedList[0].ascriptionOrgid)
      }
      this.$router.push({
       path: '../../accountsLoad',
       query: {
          tab: '发车汇总核销',
          currentPage: 'batchTruckAll', // 本页面标识符
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
    },
    getSummaries (param) {
      return getSummaries(param)
    }
  }
}

</script>
