<template>
  <!-- 到车汇总 -->
  <div class="tab-content miniHeaderSearch" v-loading="loading">
    <!-- 搜索 -->
    <SearchForm :orgid="otherinfo.orgid" @change="getSearchParam" :isAllOrg="true" :btnsize="btnsize"></SearchForm>
    <!-- 操作按钮 -->
    <div class="tab_info">
      <div class="btns_box">
        <el-button type="primary" :size="btnsize" icon="el-icon-sort" v-has:PAY_LOADSET4 @click="doAction('count')" plain>核销</el-button>
        <el-button type="primary" v-has:PAY_LOADPRI4 :size="btnsize" icon="el-icon-printer" @click="doAction('print')" plain>打印</el-button>
        <el-button type="primary" v-has:PAY_LOADEXP4 :size="btnsize" icon="el-icon-download" @click="doAction('export')" plain>导出</el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-setting" @click="setTable" class="table_setup" plain>表格设置</el-button>
      </div>
      <!-- 数据表格 -->
      <div class="info_tab">
        <el-table ref="multipleTable" :key="tablekey" :data="dataList" stripe border @row-click="clickDetails" @selection-change="getSelection" height="100%" tooltip-effect="dark" style="width:100%;" @cell-dblclick="showDetail" :show-summary="true" :summary-method="getSummaries">
          <el-table-column fixed sortable type="selection" width="60">
          </el-table-column>
          <template v-for="column in tableColumn">
            <el-table-column :key="column.id" :fixed="column.fixed" sortable :label="column.label" :prop="column.prop" v-if="!column.slot" :width="column.width">
             <template slot="header" slot-scope="scope">
                <tableHeaderSearch :scope="scope" :query="searchQuery" @change="changeKey"/>
              </template>
              <template slot-scope="scope">{{scope.row[column.prop]}}</template>
            </el-table-column>
            <el-table-column :key="column.id" :fixed="column.fixed" sortable :label="column.label" v-else :width="column.width" :prop="column.prop">
              <template slot="header" slot-scope="scope">
                <tableHeaderSearch :scope="scope" :query="searchQuery" @change="changeKey"/>
              </template>
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
// import TableSetup from '@/components/tableSetup'
import { postPayListBySummary } from '@/api/finance/accountsPayable'
import { mapGetters } from 'vuex'
import { PrintInFullPage, SaveAsFile } from '@/utils/lodopFuncs'
// import tableHeaderSearch from '@/components/tableHeaderSearch'
export default {
  components: {
    SearchForm,
    Pager
    // TableSetup,
    // tableHeaderSearch
  },
  computed: {
    ...mapGetters([
      'otherinfo'
    ])
  },
  data() {
    return {
      btnsize: 'mini',
      sign: 2, // 2-到车汇总
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
      loading: true,
      setupTableVisible: false,
      tableColumn: [
        {
          label: '序号',
          prop: 'id',
          width: '70',
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
          width: '100',
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
          label: '到付车费',
          prop: 'arrivepayCarriage',
          width: '90',
          fixed: false
        },
        {
          label: '已核销到付车费',
          prop: 'paidArrivepayCarriage',
          width: '120',
          fixed: false,
          slot: (scope) => {
            const row = scope.row
            return this._setTextColor(row.arrivepayCarriage, row.paidArrivepayCarriage, row.unpaidArrivepayCarriage, row.paidArrivepayCarriage)
          }
        },
        {
          label: '未核销到付车费',
          prop: 'unpaidArrivepayCarriage',
          width: '120',
          fixed: false,
          slot: (scope) => {
            const row = scope.row
            return this._setTextColor(row.arrivepayCarriage, row.paidArrivepayCarriage, row.unpaidArrivepayCarriage, row.unpaidArrivepayCarriage)
          }
        },
        {
          label: '到付油卡',
          prop: 'arrivepayOilCard',
          width: '90',
          fixed: false
        },
        {
          label: '已核销到付油卡',
          prop: 'paidArrivepayOilCard',
          width: '120',
          fixed: false,
          slot: (scope) => {
            const row = scope.row
            return this._setTextColor(row.arrivepayOilCard, row.paidArrivepayOilCard, row.unpaidArrivepayOilCard, row.paidArrivepayOilCard)
          }
        },
        {
          label: '未核销到付油卡',
          prop: 'unpaidArrivepayOilCard',
          width: '120',
          fixed: false,
          slot: (scope) => {
            const row = scope.row
            return this._setTextColor(row.arrivepayOilCard, row.paidArrivepayOilCard, row.unpaidArrivepayOilCard, row.unpaidArrivepayOilCard)
          }
        },
        {
          label: '到站装卸费',
          prop: 'arriveHandlingFee',
          width: '100',
          fixed: false
        },
        {
          label: '已核销到站装卸费',
          prop: 'paidArriveHandlingFee',
          width: '120',
          fixed: false,
          slot: (scope) => {
            const row = scope.row
            return this._setTextColor(row.arriveHandlingFee, row.paidArriveHandlingFee, row.unpaidArriveHandlingFee, row.paidArriveHandlingFee)
          }
        },
        {
          label: '未核销到站装卸费',
          prop: 'unpaidArriveHandlingFee',
          width: '120',
          fixed: false,
          slot: (scope) => {
            const row = scope.row
            return this._setTextColor(row.arriveHandlingFee, row.paidArriveHandlingFee, row.unpaidArriveHandlingFee, row.unpaidArriveHandlingFee)
          }
        },
        {
          label: '到站其他费',
          prop: 'arriveOtherFee',
          width: '100',
          fixed: false
        },
        {
          label: '已核销到站其他费',
          prop: 'paidArriveOtherFee',
          width: '120',
          fixed: false,
          slot: (scope) => {
            const row = scope.row
            return this._setTextColor(row.arriveOtherFee, row.paidArriveOtherFee, row.unpaidArriveOtherFee, row.paidArriveOtherFee)
          }
        },
        {
          label: '未核销到站其他费',
          prop: 'unpaidArriveOtherFee',
          width: '120',
          fixed: false,
          slot: (scope) => {
            const row = scope.row
            return this._setTextColor(row.arriveOtherFee, row.paidArriveOtherFee, row.unpaidArriveOtherFee, row.unpaidArriveOtherFee)
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
    changeKey(obj) {
      this.total = 0
      this.searchQuery = obj
      if (!this.loading) {
        this.fetchList()
      }
    },
    getSearchParam(obj) {
      this.searchQuery.currentPage = this.$options.data().searchQuery.currentPage
      this.searchQuery.pageSize = this.$options.data().searchQuery.pageSize
      // this.$set(this.searchQuery.vo, 'sign', this.sign)
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
      }).catch((err) => {
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
            name: '车费核销-到车汇总-' + parseTime(new Date(), '{y}{m}{d}{h}{i}{s}')
          })
          break
        case 'print':
          PrintInFullPage({
            data: this.selectedDataList.length > 0 ? this.selectedDataList : this.dataList,
            columns: this.tableColumn,
            name: '车费核销-到车汇总'
          })
          break
      }
    },
    count() {
      this.$router.push({
        path: '/finance/accountsLoad/batchArrivalAll',
        query: {
          currentPage: 'batchArrivalAll', // 本页面标识符
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
    getSummaries(param) {
      return getSummaries(param)
    }
  }
}

</script>
