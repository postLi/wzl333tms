<template>
  <div class="tab-content accountsReceivable-summary" v-loading="loading">
    <SearchForm :filter="true" :orgid="otherinfo.orgid" @change="getSearchParam" :btnsize="btnsize" />  
    <div class="tab_info">
      <div class="btns_box">
          <el-button type="success" :size="btnsize" icon="el-icon-sort" @click="viewDetails(selected)" plain v-has:REC_SET3>结算</el-button>
          
          <el-button type="primary" :size="btnsize" icon="el-icon-edit-outline" @click="doAction('print')" plain v-has:REC_PRI3>打印</el-button>
          <el-button type="primary" :size="btnsize" icon="el-icon-edit-outline" @click="doAction('export')" plain v-has:REC_EXP3>导出</el-button>
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
            </el-table-column>
            <el-table-column
              :key="column.id"
              :prop="column.prop"
              :fixed="column.fixed"
              sortable
              :label="column.label"
              v-else
              :width="column.width">
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
import { getSummaries, parseTime } from '@/utils/'
import { PrintInFullPage, SaveAsFile } from '@/utils/lodopFuncs'

export default {
  components: {
    SearchForm,
    Pager,
    TableSetup
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
          'feeType': 2
        }
      },
      // 默认sort值为true
      tablekey: '',
      tableColumn: [{
        'label': '序号',
        'prop': '',
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
      },{
          label: '签收状态',
          prop: 'signStatus',
          width: '100',
          fixed: false
        }, {
        'label': '出发城市',
        'prop': 'shipFromCityName'
      }, {
        'label': '到达城市',
        'prop': 'shipToCityName'
      }, {
        'label': '结算状态',
        'prop': 'arrivepayStateCn'
      }, {
        'label': '到付',
        'prop': 'arrivepayFee'
      }, {
        'label': '已结到付',
        'prop': 'finishArrivepayFee',
          slot: (scope) => {
          const row = scope.row
          return this._setTextColor(row.arrivepayFee, row.finishArrivepayFee, row.notArrivepayFee, row.finishArrivepayFee)
        }
      }, {
        'label': '未结到付',
        'prop': 'notArrivepayFee',
          slot: (scope) => {
          const row = scope.row
          return this._setTextColor(row.arrivepayFee, row.finishArrivepayFee, row.notArrivepayFee, row.notArrivepayFee)
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
    viewDetails(row) {
      row = row || []
      console.log('row:', row.map(el => { console.log('11') }).join(','))
      this.$router.push({
        path: '/finance/accountsLoadReceivable',
        query: {
          tab: '到付核销',
          searchQuery: JSON.stringify(this.searchQuery),
          currentPage: 'arrive',
          selectListShipSns: JSON.stringify(row.map(el => el.shipSn))
        }
      })
    },
    showDetail(order) {
      this.viewDetails([order])
    },
    fetchAllOrder() {
      this.loading = true
      return accountApi.getReceivableList(this.searchQuery).then(data => {
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
            name: '到付应收账款-' + parseTime(new Date(), '{y}{m}{d}{h}{i}{s}')
          })
          break
        case 'print':
          PrintInFullPage({
            data: this.selected.length ? this.selected : this.usersArr,
            columns: this.tableColumn,
            name: '到付应收账款'
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
    // 计算总数
    getSummaries(param) {
      return getSummaries(param)
    }
  }
}
</script>
