<template>
  <div class="tab-content accountsReceivable-summary miniHeaderSearch" v-loading="loading">
    <SearchForm :orgid="otherinfo.orgid" @change="getSearchParam" :btnsize="btnsize" :isShow="true" />  
    <div class="tab_info">
      <div class="btns_box">
          <el-button type="success" :size="btnsize" icon="el-icon-sort" @click="viewDetails" plain v-has:REC_SET2>核销</el-button>
          <el-button type="primary" :size="btnsize" icon="el-icon-edit-outline" @click="doAction('print')" plain v-has:REC_PRI2>打印</el-button>
          <el-button type="primary" :size="btnsize" icon="el-icon-edit-outline" @click="doAction('export')" plain v-has:REC_EXP2>导出</el-button>
          <el-button type="primary" :size="btnsize" icon="el-icon-setting" plain @click="setTable" class="table_setup">表格设置</el-button>
      </div>
      <div class="info_tab">
        <el-table
          ref="multipleTable"
          :data="usersArr"
          :key="tablekey"
          stripe
          border
          @row-click="clickDetails"
          @row-dblclick="showDetail"
          @selection-change="getSelection"
          height="100%"
          show-summary
          :summary-method="getSummaries"
          tooltip-effect="dark"
          :default-sort = "{prop: 'id', order: 'ascending'}"
          style="width: 100%">
          <el-table-column
            fixed
            sortable
            type="selection"
            width="80">
          </el-table-column>
          <template v-for="column in tableColumn">
            <el-table-column
              :key="column.id"
              :fixed="column.fixed"
              sortable
              :label="column.label"
              :prop="column.prop"
              v-if="!column.slot"
              :width="column.width">
              <template slot="header" slot-scope="scope">
                <tableHeaderSearch
                  :scope="scope"
                  :query="searchQuery"
                  @change="changeKey"
                />
              </template>
              <template slot-scope="scope">{{scope.row[column.prop]}}</template>
            </el-table-column>
            <el-table-column
              :key="column.id"
              :fixed="column.fixed"
              :prop="column.prop"
              sortable
              :label="column.label"
              v-else
              :width="column.width">
               <template slot="header" slot-scope="scope">
                <tableHeaderSearch :scope="scope" :query="searchQuery" @change="changeKey"/>
              </template>
              <template slot-scope="scope">
                  <div class="td-slot" v-html="column.slot(scope)"></div>
              </template>
            </el-table-column>
          </template>
        </el-table>
      </div> 
      <div class="info_tab_footer">共计:{{ total }} <div class="show_pager"> <Pager :total="total" @change="handlePageChange" /></div> </div>       
    </div>
    <TableSetup :popVisible="setupTableVisible" @close="closeSetupTable" :columns='tableColumn' @success="setColumn"  />
  </div>
</template>
<script>
import * as accountApi from '@/api/finance/accountsReceivable'
import SearchForm from './components/search'
import TableSetup from '@/components/tableSetup'
import Pager from '@/components/Pagination/index'
import { parseDict, parseShipStatus } from '@/utils/dict'
import { getSummaries, objectMerge2, parseTime } from '@/utils/'
import { PrintInFullPage, SaveAsFile } from '@/utils/lodopFuncs'
import tableHeaderSearch from '@/components/tableHeaderSearch'

export default {
  components: {
    SearchForm,
    Pager,
    TableSetup,
    tableHeaderSearch
  },
  mounted() {
    // this.loading = false
  },
  data() {
    return {
      btnsize: 'mini',
      usersArr: [],
      total: 0,
      // 加载状态
      loading: true,
      setupTableVisible: false,
      isModify: false,
      selectInfo: {},
      // 选中的行
      selected: [],
      searchQuery: {
        'currentPage': 1,
        'pageSize': 100,
        'vo': {
          shipFromOrgid: '',
          endTime: '',
          startTime: '',
          senderName: '',
          senderCompanyName: '',
          shipFromCityCode: '',
          shipToCityCode: '',
          ascriptionOrgId: '',
          shipSn: '',
          'status': 'NOSETTLEMENT',
          'feeType': 1
        }
      },
      // 默认sort值为true
      tablekey: '',
      tableColumn: [{
        'label': '序号',
        'prop': 'number',
        'fixed': true,
        'slot': function(scope) {
          return scope.$index + 1
        }
      }, {
        'label': '开单网点',
        'prop': 'shipFromOrgName',
        'fixed': true
      }, {
        'label': '运单号',
        'prop': 'shipSn',
        width: 120
      }, {
        'label': '货号',
        'prop': 'shipGoodsSn',
        'width': '150'
      }, {
        'label': '运单标识',
        'prop': 'shipIdentifying',
        slot: function(scope) {
          return parseShipStatus(scope.row.shipIdentifying)
        }
      }, {
        label: '签收状态',
        prop: 'signStatus',
        width: '100',
        fixed: false
      }, {
        'label': '发站',
        'prop': 'shipFromCityName'
      }, {
        'label': '到站',
        'prop': 'shipToCityName'
      }, {
        'label': '核销状态',
        'prop': 'nowPayStateCn'
      }, {
        'label': '现付',
        width: '100',
        'prop': 'nowPayFee'
      }, {
        'label': '已核销现付',
        'prop': 'finishNowPayFee',
        slot: (scope) => {
          const row = scope.row
          return this._setTextColor(row.nowPayFee, row.finishNowPayFee, row.notNowPayFee, row.finishNowPayFee)
        }
      }, {
        'label': '未核销现付',
        'prop': 'notNowPayFee',
        slot: (scope) => {
          const row = scope.row
          return this._setTextColor(row.nowPayFee, row.finishNowPayFee, row.notNowPayFee, row.notNowPayFee)
        }
      }, {
        'label': '开单日期',
        'prop': 'createTime',
        width: 180
      }, {
        'label': '发货方',
        'prop': 'senderCustomerUnit'
      }, {
        'label': '发货人',
        'prop': 'shipSenderName'
      }, {
        'label': '收货方',
        'prop': 'receiverCustomerUnit'
      }, {
        'label': '收货人',
        'prop': 'shipReceiverName'
      }, {
        'label': '货品名',
        'prop': 'cargoName'
      }, {
        'label': '件数',
        'prop': 'cargoAmount'
      }, {
        'label': '重量(kg)',
        'prop': 'cargoWeight'
      }, {
        'label': '体积(方)',
        'prop': 'cargoVolume'
      }, {
        'label': '付款方式',
        'prop': 'shipPayWay'
      }, {
        'label': '制单人',
        'prop': 'userName'
      }, {
        'label': '发货人电话',
        'prop': 'senderMobile'
      }, {
        'label': '发货人地址',
        'prop': 'senderAddr'
      }, {
        'label': '收货人电话',
        'prop': 'receiverMoblie'
      }, {
        'label': '收货地址',
        'prop': 'receiverAddr'
      }, {
        'label': '交接方式',
        'prop': 'shipDeliveryMethod'
      }, {
        'label': '时效',
        'prop': 'shipEffectiveName'
      }, {
        'label': '运单备注',
        'prop': 'shipRemarks'
      }]
    }
  },
  methods: {
    changeKey(obj) {
      this.searchQuery = obj
      this.fetchAllOrder()
    },
    viewDetails() {
      const list = []
      this.selected.forEach((e, index) => {
        list.push(e.shipSn)
      })
      const data = objectMerge2(this.searchQuery)
      data.vo.ascriptionOrgId = data.vo.shipFromOrgid

      console.log('传给核销页面的数据:::query', this.searchQuery, list)
      this.$router.push({
        path: '/finance/accountsLoadReceivable',
        query: {
          tab: '现付核销',
          currentPage: 'cash',
          searchQuery: JSON.stringify(data),
          selectListShipSns: JSON.stringify(list)
        }
      })
    },
    showDetail(order) {
      this.viewDetails([order])
    },
    fetchAllOrder() {
      this.loading = true
      const data = objectMerge2(this.searchQuery)
      data.vo.ascriptionOrgId = data.vo.shipFromOrgid
      return accountApi.getReceivableList(data).then(data => {
        this.usersArr = data.list
        this.total = data.total
        this.loading = false
      }).catch((err) => {
        this.loading = false
        this._handlerCatchMsg(err)
      })
    },
    fetchData() {
      this.fetchAllOrder()
    },
    handlePageChange(obj) {
      this.searchQuery.currentPage = obj.pageNum
      this.searchQuery.pageSize = obj.pageSize
      this.fetchData()
    },
    getSearchParam(obj) {
      this.searchQuery.currentPage = this.$options.data().searchQuery.currentPage
      this.searchQuery.pageSize = this.$options.data().searchQuery.pageSize
      this.searchQuery.vo = Object.assign(this.searchQuery.vo, obj)
      this.loading = false
      this.fetchData()
    },
    doAction(type) {
      // 判断是否有选中项
      if (!this.selected.length && type !== 'add' && type !== 'export' && type !== 'print') {
        this.$message({
          message: '请选择要操作的项~',
          type: 'warning'
        })
        return false
      }

      console.log('this.selected:', this.selected)

      switch (type) {
          // 添加运单
        case 'detail':
          this.isModify = false
          this.selectInfo = {}
          this.showDetail(this.selected[0])
          break
          // 导出数据
        case 'export':
          SaveAsFile({
            data: this.selected.length ? this.selected : this.usersArr,
            columns: this.tableColumn,
            name: '现付应收账款-' + parseTime(new Date(), '{y}{m}{d}{h}{i}{s}')
          })
          break
        case 'print':
          PrintInFullPage({
            data: this.selected.length ? this.selected : this.usersArr,
            columns: this.tableColumn,
            name: '现付应收账款'
          })
          break
      }
      // 清除选中状态，避免影响下个操作
      this.$refs.multipleTable.clearSelection()
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
    clickDetails(row, event, column) {
      this.$refs.multipleTable.toggleRowSelection(row)
    },
    getSelection(selection) {
      this.selected = selection
    },
    getSummaries(param) {
      // let propsArr = ['nowPayFee','finishNowPayFee','notNowPayFee','cargoAmount|', 'cargoWeight|', 'cargoVolume|']
      return getSummaries(param)
    }
  }
}
</script>
