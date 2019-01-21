<template>
  <div class="customer-manager tab-wrapper tab-wrapper-100 receivableTable">
    <div class="accountsLoad_table">
      <!-- 搜索框 -->
      <div class="transferTable_search clearfix">
        <currentSearch :info="orgLeftTable" @change="selectCurrent"></currentSearch>
      </div>
      <transferTable style="height: calc(100% - 40px);padding:10px">
        <!-- 左上角按钮区 -->
        <div slot="btnsBox">
          <el-button :type="isGoReceipt?'info':'success'" size="mini" icon="el-icon-sort" @click="goReceipt" :disabled="isGoReceipt">核销</el-button>
        </div>
        <!-- 左边表格区 -->
        <div style="height:100%;" slot="tableLeft" class="tableHeadItemBtn">
          <el-table ref="multipleTableRight" :data="leftTable" border @row-click="clickDetailsRight" @selection-change="getSelectionRight" tooltip-effect="dark" triped :key="tablekey" height="100%" :summary-method="getSumRight" :default-sort="{prop: 'id', order: 'ascending'}" :show-overflow-tooltip="true" :show-summary="true" @row-dblclick="dclickAddItem">
            <el-table-column fixed width="50" label="序号">
              <template slot-scope="scope">
                {{scope.$index + 1}}
              </template>
            </el-table-column>
            <el-table-column fixed :render-header="setHeader" width="50">
              <template slot-scope="scope">
                <el-button class="tableItemBtn" size="mini" @click="addItem(scope.row, scope.$index)"></el-button>
              </template>
            </el-table-column>
            <template v-if="!column.expand" v-for="column in tableColumnLeft">
              <el-table-column :key="column.id" :fixed="column.fixed" sortable :label="column.label" :prop="column.prop" v-if="!column.slot" :width="column.width">
              </el-table-column>
              <el-table-column :key="column.id" :fixed="column.fixed" sortable :label="column.label" v-else :width="column.width" :prop="column.prop">
                <template slot-scope="scope">
                  <div v-if="column.expand">
                    <el-input type="number" v-model.number="column.slot(scope)" :size="btnsize" @change="(val) => changLoadData(scope.$index, column.prop, val)"></el-input>
                  </div>
                  <div v-else>
                    <span class="clickitem" v-if="column.click" v-html="column.slot(scope)" @click.stop="column.click(scope)"></span>
                    <span v-else v-html="column.slot(scope)"></span>
                  </div>
                </template>
              </el-table-column>
            </template>
          </el-table>
        </div>
        <!-- 右边表格区 -->
        <div slot="tableRight" class="tableHeadItemBtn">
          <el-table ref="multipleTableLeft" :data="rightTable" border @row-click="clickDetailsLeft" @selection-change="getSelectionLeft" tooltip-effect="dark" triped :key="tablekey" height="100%" :summary-method="getSumLeft" :default-sort="{prop: 'id', order: 'ascending'}" :show-summary='true' style="height:100%;" @row-dblclick="dclickMinusItem">
            <el-table-column fixed width="50" label="序号">
              <template slot-scope="scope">
                {{scope.$index + 1}}
              </template>
            </el-table-column>
            <el-table-column :render-header="setHeader2" fixed width="50">
              <template slot-scope="scope">
                <el-button class="tableItemBtnMinus" size="mini" @click="minusItem(scope.row, scope.$index)"></el-button>
              </template>
            </el-table-column>
            <template v-for="column in tableColumnLeft">
              <el-table-column :key="column.id" :fixed="column.fixed" sortable :label="column.label" :prop="column.prop" v-if="!column.slot" :width="column.width">
              </el-table-column>
              <el-table-column :key="column.id" :fixed="column.fixed" sortable :label="column.label" v-else :width="column.width" :prop="column.prop">
                <template slot-scope="scope">
                  <div v-if="column.expand">
                    <el-input v-numberOnly:point :value="scope.row.amount" @dblclick.stop.prevent.native :class="{'textChangeDanger': textChangeDanger[scope.$index]}" @change="(val) => changLoadData(scope.$index, column.prop, val)" :size="btnsize"></el-input>
                  </div>
                  <div v-else>
                    <span class="clickitem" v-if="column.click" v-html="column.slot(scope)" @click.stop="column.click(scope)"></span>
                    <span v-else v-html="column.slot(scope)"></span>
                  </div>
                </template>
              </el-table-column>
            </template>
          </el-table>
        </div>
      </transferTable>
      <!-- 核销凭证 -->
      <Voucher :popVisible="popVisibleDialog" :info="infoTable" @close="closeDialog" :orgId="getRouteInfo.vo.ascriptionOrgid ||  otherinfo.orgid" :btnLoading="btnLoading"></Voucher>
    </div>
  </div>
</template>
<script>
import { payListByHandlingFee } from '@/api/finance/accountsPayable'
import { parseDict, parseShipStatus } from '@/utils/dict'
import transferTable from '@/components/transferTable'
import { objectMerge2, parseTime, getSummaries, tmsMath } from '@/utils/index'
import querySelect from '@/components/querySelect/'
import Pager from '@/components/Pagination/index'
import currentSearch from './components/currentSearch'
import Voucher from '@/components/voucher/receivable'
export default {
  components: {
    transferTable,
    querySelect,
    // Receipt,
    Pager,
    currentSearch,
    Voucher
  },
  data() {
    return {
      btnLoading: false,
      infoTable: {
        amount: 0,
        orderList: [],
        settlementTypeSign: 'HandlingFeeRec' //  HandlingFeeRec-配载应收操作费
      },
      textChangeDanger: [],
      currentSearch: '',
      tablekey: '',
      truckMessage: '',
      formModel: {},
      loading: false,
      popVisibleDialog: false,
      btnsize: 'mini',
      tableReceiptInfo: [],
      orgLeftTable: [],
      selectedRight: [],
      selectedLeft: [],
      isGoReceipt: true,
      leftTable: [],
      rightTable: [],
      orgData: {
        left: [],
        right: []
      },
      isFresh: false, // 是否手动刷新页面
      feeType: 8,
      searchQuery: {
        currentPage: 1,
        pageSize: 100,
        vo: {}
      },
      tableColumnLeft: [{
        label: '发车批次',
        prop: 'batchNo',
        width: '130',
        fixed: true
      },
      {
        label: '核销状态',
        prop: 'statusName',
        width: '120',
        fixed: false
      },
      {
        label: '发车类型',
        prop: 'loadTypeName',
        width: '90',
        fixed: true
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
        fixed: false
      },
      {
        label: '到达时间',
        prop: 'receivingTime',
        width: '160',
        fixed: false
      },
      {
        label: '操作费',
        prop: 'fee',
        width: '110',
          // slot: (scope) => {
          //   return scope.row.loadTypeName === '干线' ? scope.row.gxHandlingFeePay : scope.row.dbHandlingFeePay
          // },
        fixed: false
      },
      {
        label: '已核销操作费',
        prop: 'paidFee',
        width: '110',
        slot: (scope) => {
            const row = scope.row
            return this._setTextColor(row.fee, row.paidFee, row.unpaidFee, row.paidFee)
          },
        fixed: false
      },
      {
        label: '未核销操作费',
        prop: 'unpaidFee',
        width: '110',
        slot: (scope) => {
            const row = scope.row
            return this._setTextColor(row.fee, row.paidFee, row.unpaidFee, row.unpaidFee)
            //   return scope.row.loadTypeName === '干线' ? scope.row.unpaidGxHandlingFeePay : scope.row.unpaidDbHandlingFeePay
          },
        fixed: false
      },
      {
        label: '实际核销操作费',
        prop: 'amount',
        width: '110',
        expand: true,
        slot: (scope) => {
            return scope.row.amount
          },
        fixed: false
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
        fixed: false
      },
      {
        label: '配载体积',
        prop: 'loadVolumeall',
        fixed: false
      },
      {
        label: '配载重量',
        prop: 'loadWeightall',
        fixed: false
      },
      {
        label: '备注',
        prop: 'remark',
        fixed: false
      }
      ]
    }
  },
  computed: {
    getRouteInfo() {
      console.log(JSON.parse(this.$route.query.searchQuery))
      return JSON.parse(this.$route.query.searchQuery)
    },
    totalLeft() {
      return this.leftTable.length
    },
    totalRight() {
      return this.rightTable.length
    }
  },
  watch: {
    '$route.query': {
      handler(cval, oval) {
        if (cval) {
          this.getList()
        }
      },
      deep: true
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    handlePageChangeLeft(obj) {
      this.searchQuery.currentPage = obj.pageNum
      this.searchQuery.pageSize = obj.pageSize
    },
    initLeftParams() {
      if (!this.$route.query) {
        this.eventBus.$emit('replaceCurrentView', '/finance/accountsReceivable')
        this.isFresh = true // 是否手动刷新页面
      } else {
        this.searchQuery.vo = Object.assign({}, this.getRouteInfo.vo)
        if (this.searchQuery.vo.status === '' || /(ALLSETTLEMENT)/.test(this.searchQuery.vo.status)) {
         this.$set(this.searchQuery.vo, 'status', 'NOSETTLEMENT,PARTSETTLEMENT')
        }
        this.isFresh = false
      }
    },
    setRight(item) {
      item.inputNowPayFee = item.notNowPayFee
      item.inputArrivepayFee = item.notArrivepayFee
      item.inputReceiptpayFee = item.notReceiptpayFee
      item.inputMonthpayFee = item.notMonthpayFee
      item.inputChangeFee = item.notChangeFee
      this.$set(this.rightTable, this.rightTable.length, item)
    },
    getList() {
      this.loading = true
      const selectListShipSns = objectMerge2([], JSON.parse(this.$route.query.selectListBatchNos))
      if (JSON.parse(this.$route.query.selectListBatchNos)) {
        this.isModify = true
      } else {
        this.isModify = false
      }
      this.leftTable = this.$options.data().leftTable
      this.rightTable = this.$options.data().rightTable
      this.infoTable = this.$options.data().infoTable
      this.orgLeftTable = this.$options.data().orgLeftTable

      this.initLeftParams() // 设置searchQuery
      if (!this.isFresh) {
        console.log('getList::::', this.searchQuery)
        payListByHandlingFee(this.searchQuery).then(data => {
          // NOSETTLEMENT,PARTSETTLEMENT
          // 过滤未完成核销的数据
          this.leftTable = data.list
          this.leftTable.forEach((e, index) => {
            e.fee = e.fee ? e.fee : (e.loadTypeName === '干线' ? e.gxHandlingFeeRec : e.dbHandlingFeeRec)
            e.paidFee = e.paidFee ? e.paidFee : (e.loadTypeName === '干线' ? e.paidGxHandlingFeeRec : e.paidDbHandlingFeeRec)
            e.unpaidFee = e.unpaidFee ? e.unpaidFee : (e.loadTypeName === '干线' ? e.unpaidGxHandlingFeeRec : e.unpaidDbHandlingFeeRec)
            e.statusName = e.statusName ? e.statusName : (e.loadTypeName === '干线' ? e.gxHandlingFeeRecStatusZh : e.dbHandlingFeeRecStatusZh)
            this.$set(e, 'amount', e.unpaidFee)
            console.log(e)
          })
          selectListShipSns.forEach(e => {
            this.leftTable.forEach(item => {
              if (e === item.batchNo) {
                this.setRight(item)
              }
            })
          })
          if (this.rightTable.length < 1) {
            this.isGoReceipt = true
          } else {
            this.isGoReceipt = false
          }
          this.rightTable.forEach(e => { // 左边表格减去右边的数据
            e.inputBrokerageFee = e.unpaidFee
            const item = this.leftTable.indexOf(e)
            if (item !== -1) {
              this.leftTable.splice(item, 1)
            }
          })
          // 保留原有数据的引用
          this.orgLeftTable = objectMerge2([], this.leftTable)
        }).catch((err) => {
          this.loading = false
          this._handlerCatchMsg(err)
        })
      }
    },
    changLoadData(index, prop, newVal) {
      this.$set(this.rightTable, index, Object.assign(this.rightTable[index], {
        [prop]: Number(newVal)
      }))
      if (this.rightTable[index].unpaidFee !== newVal) {
        this.textChangeDanger[index] = true
      } else {
        this.textChangeDanger[index] = false
      }
      if (Number(newVal) < 0 || Number(newVal) > this.rightTable[index].unpaidFee) {
        this.isGoReceipt = true
        this.$message({ type: 'warning', message: '实际核销费用不小于0，不大于未核销费用。' })
      } else {
        this.isGoReceipt = false
      }
      return false
    },
    clickDetailsRight(row) {
      this.$refs.multipleTableRight.toggleRowSelection(row)
    },
    clickDetailsLeft(row) {
      this.$refs.multipleTableLeft.toggleRowSelection(row)
    },
    getSelectionRight(list) { // 获取右边表格打勾的数据列表
      this.selectedRight = list
    },
    getSelectionLeft(list) { // 获取左边表格打勾的数据列表
      this.selectedLeft = list
    },
    changeTableKey() { // 刷新表格
      this.tablekey = new Date().getTime()
    },
    doAction(type) {
      switch (type) {
        case 'goLeft': // 右边数据勾选到左边
          this.goLeft()
          break
        case 'goRight': // 左边数据勾选到右边
          this.goRight()
          break
      }
    },
    goLeft() { // 数据从左边穿梭到右边
      if (this.selectedRight.length === 0) {
        this.$message({ type: 'warning', message: '请在左边表格选择数据' })
      } else {
        this.selectedRight.forEach((e, index) => {
          // 默认设置实际核销数量
          e.inputBrokerageFee = e.unpaidFee
          this.setRight(e)
          this.rightTable = objectMerge2([], this.rightTable).filter(em => {
             return em.batchNo !== e.batchNo
           })
          this.rightTable.push(e)
          this.leftTable = objectMerge2([], this.leftTable).filter(el => {
            return el.batchNo !== e.batchNo
          })
          this.orgLeftTable = objectMerge2([], this.orgLeftTable).filter(el => {
            return el.batchNo !== e.batchNo
          })
          // let item = -1
          // this.leftTable.map((el, index) => {
          //   if (el.batchNo === e.batchNo) {
          //     item = index
          //   }
          // })
          // if (item !== -1) { // 左边表格源数据减去被穿梭的数据
          //   this.leftTable.splice(item, 1)
          //   this.orgLeftTable.splice(item, 1)
          // }
        })
        this.selectedRight = [] // 清空选择列表
      }
      if (this.rightTable.length < 1) {
        this.isGoReceipt = true
      } else {
        this.isGoReceipt = false
      }
    },
    goRight() { // 数据从右边穿梭到左边
      if (this.selectedLeft.length === 0) {
        this.$message({ type: 'warning', message: '请在右边表格选择数据' })
      } else {
        this.selectedLeft.forEach((e, index) => {
          this.leftTable = objectMerge2([], this.leftTable).filter(em => {
            return em.batchNo !== e.batchNo
          })
          this.orgLeftTable = objectMerge2([], this.orgLeftTable).filter(em => {
            return em.batchNo !== e.batchNo
          })
          this.leftTable.push(e)
          this.orgLeftTable.push(e) // 搜索源数据更新添加的数据
          this.rightTable = objectMerge2([], this.rightTable).filter(el => {
            return el.batchNo !== e.batchNo
          })
        })
        this.selectedLeft = [] // 清空选择列表
      }
      if (this.rightTable.length < 1) {
        this.isGoReceipt = true
      } else {
        this.isGoReceipt = false
      }
    },
    // 选中的行
    selectCurrent(obj, index) {
      this.addItem(obj, index)
    },
    addItem(row, index) { // 添加单行
      this.selectedRight = []
      this.selectedRight[index] = row
      this.doAction('goLeft')
    },
    minusItem(row, index) { // 减去单行
      this.selectedLeft = []
      this.selectedLeft[index] = row
      this.doAction('goRight')
    },
    addALLList() { // 添加全部
      this.selectedRight = Object.assign([], this.leftTable)
      this.doAction('goLeft')
    },
    minusAllList() { // 减去全部
      this.selectedLeft = Object.assign([], this.rightTable)
      this.doAction('goRight')
    },
    dclickAddItem(row, event) { // 双击添加单行
      this.selectedRight = []
      this.selectedRight.push(row)
      this.doAction('goLeft')
    },
    dclickMinusItem(row, event) { // 双击减去单行
      this.selectedLeft = []
      this.selectedLeft.push(row)
      this.doAction('goRight')
    },
    closeDialog() {
      this.popVisibleDialog = false
    },
    openDialog() {
      this.popVisibleDialog = true
    },
    // 核销前整理数据
    goReceipt() {
      this.infoTable = this.$options.data().infoTable
      if (!this.isGoReceipt) {
        let amount = 0
        this.rightTable.forEach((e, index) => {
          amount = tmsMath._add(amount, e.amount)
          const item = {
            id: e.id,
            amount: e.amount,
            loadTypeName: e.loadTypeName,
            feeTypeId: e.loadTypeName === '干线' ? 33 : 32
          }
          if (e.amount && e.unpaidFee > 0 && e.amount <= e.unpaidFee) {
            this.infoTable.orderList.push(item)
          }
        })
        this.infoTable.amount = amount
        if (this.infoTable.orderList.length > 0) { // 判断是否要核销
          this.openDialog()
        } else {
          this.$message({ type: 'warning', message: '暂无可核销项！实际核销费用不小于0，不大于未核销费用。' })
        }
      }
    },
    getSumRight(param) { // 右边表格合计-自定义显示
      const propsArr = ['_index|2|单', 'fee', 'unpaidFee', 'paidFee', 'loadAmountall|', 'loadWeightall|', 'loadVolumeall|']
      return getSummaries(param, propsArr)
    },
    getSumLeft(param) { // 左边表格合计-自定义显示
      const propsArr = ['_index|2|单', 'fee', 'unpaidFee', 'paidFee', 'loadAmountall|', 'amount', 'loadWeightall|', 'loadVolumeall|']
      return getSummaries(param, propsArr)
    },
    setHeader(h, { column }) {
      return h('el-button', {
        props: {
          // icon: 'el-icon-plus',
          size: 'mini'
        },
        'class': {
          'tableAllBtn': true,
          'setTableHeader': true
        },
        on: {
          click: this.addALLList
        }
      })
    },
    setHeader2(h, { column }) {
      return h('el-button', {
        props: {
          // icon: 'el-icon-minus',
          size: 'mini'
        },
        'class': {
          'tableAllBtnMinus': true,
          'setTableHeader': true
        },
        on: {
          click: this.minusAllList
        }
      })
    }
  }
}
// settlementId 178

</script>
<style lang="scss">
.receivableTable {
  .tableHeadItemBtn .setTableHeader {
    position: static;
  }
}

</style>
