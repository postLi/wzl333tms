<template>
  <div class="customer-manager tab-wrapper tab-wrapper-100">
    <div class="accountsLoad_table">
    <!-- 搜索框 -->
    <div class="transferTable_search clearfix">
      <currentSearch :info="orgLeftTable" @change="selectCurrent"></currentSearch>
    </div>
    <transferTable style="height: calc(100% - 40px);padding:10px">
      <!-- 左上角按钮区 -->
      <div slot="btnsBox">
        <el-button :type="isGoReceipt?'info':'success'" size="mini" icon="el-icon-sort" @click="goReceipt" :disabled="isGoReceipt">结算</el-button>
      </div>
      <!-- 左边表格区 -->
      <div style="height:100%;" slot="tableLeft" class="tableHeadItemBtn">

        <el-table ref="multipleTableRight" :data="leftTable" border @row-click="clickDetailsRight" @selection-change="getSelectionRight" tooltip-effect="dark" triped :key="tablekey" height="100%" :summary-method="getSumRight" :default-sort="{prop: 'id', order: 'ascending'}" :show-overflow-tooltip="true" :show-summary="true">
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
        <!-- <div class="accountsLoad_table_pager">
          <b>共计:{{ totalLeft }}</b>
          <div class="show_pager">
            <Pager :total="totalLeft" @change="handlePageChangeLeft" />
          </div>
        </div> -->
      </div>
      <!-- 右边表格区 -->
      <div slot="tableRight" class="tableHeadItemBtn">
        <el-table ref="multipleTableLeft" :data="rightTable" border @row-click="clickDetailsLeft" @selection-change="getSelectionLeft" tooltip-effect="dark" triped :key="tablekey" height="100%" :summary-method="getSumLeft" :default-sort="{prop: 'id', order: 'ascending'}" :show-summary='true' style="height:100%;">
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
                  <!-- <template v-if="scope.row[column.prop.replace(/^input/i,'').replace(/fee$/i,'').toLocaleLowerCase()+'State'] === 'ALLSETTLEMENT'">已结算</template> -->
                  <el-checkbox checked @change="(val) => changLoadData(scope.$index, column.prop, val)" :size="btnsize" >{{ scope.row[column.prop.replace(/^input/i,'not')] }}</el-checkbox>
                  
                  <!-- <el-checkbox checked v-model="rightTable[scope.$index][column.prop]" :size="btnsize" @change="(val) => changLoadData(scope.$index, column.prop, val)"></el-checkbox> -->
                </div>
                <div v-else>
                  <span class="clickitem" v-if="column.click" v-html="column.slot(scope)" @click.stop="column.click(scope)"></span>
                  <span v-else v-html="column.slot(scope)"></span>
                </div>
              </template>
            </el-table-column>
          </template>
        </el-table>
        <!-- <div class="accountsLoad_table_pager">
          <b>共计:{{ totalRight }}</b>
        </div> -->
      </div>
    </transferTable>
    <Receipt :popVisible="popVisibleDialog" :info="tableReceiptInfo" @close="closeDialog"></Receipt>
  </div>
  </div>
</template>
<script>
import * as accountApi from '@/api/finance/accountsReceivable'
import { parseDict, parseShipStatus } from '@/utils/dict'
import { postFindListByFeeType } from '@/api/finance/accountsPayable'
import transferTable from '@/components/transferTable'
import { objectMerge2, parseTime, getSummaries } from '@/utils/index'
import querySelect from '@/components/querySelect/'
import Receipt from './components/receipt'
import Pager from '@/components/Pagination/index'
import currentSearch from './components/currentSearch'
export default {
  components: {
    transferTable,
    querySelect,
    Receipt,
    Pager,
    currentSearch
  },
  data() {
    return {
      currentSearch: '',
      tablekey: '',
      truckMessage: '',
      formModel: {},
      loading: false,
      popVisibleDialog: false,
      btnsize: 'mini',
      // totalLeft: 0,
      // totalRight: 0,
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
        label: '运单号',
        prop: 'shipSn',
        width: '120',
        fixed: false
      },
      {
        label: '开单网点',
        prop: 'shipFromOrgName',
        width: '120',
        fixed: false
      },
      {
        label: '结算状态',
        prop: 'totalStatusCn',
        width: '120'
      },
      {
        label: '发货人',
        prop: 'shipSenderName',
        width: '120',
        fixed: false
      },
      {
        label: '收货人',
        prop: 'shipReceiverName',
        width: '120',
        fixed: false
      },
      {
        'label': '现付',
        'prop': 'nowPayFee'
      }, {
        'label': '现付结算状态',
        'prop': 'nowPayStateCn'
      }, {
        'label': '未结现付',
        'prop': 'notNowPayFee'
      }, {
        'label': '已结现付',
        'prop': 'finishNowPayFee'
      }, {
        label: '实结现付',
        prop: 'inputNowPayFee',
        fixed: false,
        expand: true,
        slot: (scope) => {
          return scope.row.inputNowPayFee
        }
      }, {
        'label': '到付',
        'prop': 'arrivepayFee'
      }, {
        'label': '到付结算状态',
        'prop': 'arrivepayStateCn'
      }, {
        'label': '未结到付',
        'prop': 'notArrivepayFee'
      }, {
        'label': '已结到付',
        'prop': 'finishArrivepayFee'
      }, {
        label: '实结到付',
        prop: 'inputArrivepayFee',
        fixed: false,
        expand: true,
        slot: (scope) => {
          return scope.row.inputArrivepayFee
        }
      }, {
        'label': '回单付',
        'prop': 'receiptpayFee'
      }, {
        'label': '回单付结算状态',
        'prop': 'receiptpayStateCn'
      }, {
        'label': '未结回单付',
        'prop': 'notReceiptpayFee'
      }, {
        'label': '已结回单付',
        'prop': 'finishReceiptpayFee'
      },
      {
        label: '实结回单付',
        prop: 'inputReceiptpayFee',
        fixed: false,
        expand: true,
        slot: (scope) => {
          return scope.row.inputReceiptpayFee
        }
      },
      {
        'label': '月结',
        'prop': 'monthpayFee'
      }, {
        'label': '月结结算状态',
        'prop': 'monthpayStateCn'
      }, {
        'label': '未结月结',
        'prop': 'notMonthpayFee'
      }, {
        'label': '已结月结',
        'prop': 'finishMonthpayFee'
      },
      {
        label: '实结月付',
        prop: 'inputMonthpayFee',
        fixed: false,
        expand: true,
        slot: (scope) => {
          return scope.row.inputMonthpayFee
        }
      },

      {
        'label': '异动',
        'prop': 'changeFee'
      }, {
        'label': '异动结算状态',
        'prop': 'changeStateCn'
      }, {
        'label': '未结异动',
        'prop': 'notChangeFee'
      }, {
        'label': '已结异动',
        'prop': 'finishChangeFee'
      }, {
        label: '实结异动付',
        prop: 'inputChangeFee',
        fixed: false,
        expand: true,
        slot: (scope) => {
          return scope.row.inputChangeFee
        }
      }, {
        'label': '发货方',
        'prop': 'senderCustomerUnit'
      }, {
        'label': '收货方',
        'prop': 'receiverCustomerUnit'
      },

      {
        label: '货号',
        prop: 'shipGoodsSn',
        width: '120',
        fixed: false
      },

      {
        label: '开单时间',
        prop: 'createTime',
        width: '150',
        fixed: false,
        slot: (scope) => {
          return `${parseTime(scope.row.createTime)}`
        }
      },
      {
        label: '出发城市',
        prop: 'shipFromCityName',
        width: '120',
        fixed: false
      },
      {
        label: '到达城市',
        prop: 'shipToCityName',
        width: '120',
        fixed: false
      },
      {
        label: '货品名',
        prop: 'cargoName',
        width: '120',
        fixed: false
      },
      {
        label: '件数',
        prop: 'cargoAmount',
        width: '120',
        fixed: false
      },
      {
        label: '重量',
        prop: 'cargoWeight',
        width: '120',
        fixed: false
      },
      {
        label: '体积',
        prop: 'cargoVolume',
        width: '120',
        fixed: false
      },
      {
        label: '运单备注',
        prop: 'shipRemarks',
        width: '120',
        fixed: false
      }
      ]
    }
  },
  computed: {
    getRouteInfo() {
      return this.$route.query.searchQuery
    },
    totalLeft() {
      return this.leftTable.length
    },
    totalRight() {
      return this.rightTable.length
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
      if (!this.$route.query.searchQuery.vo) {
        this.eventBus.$emit('replaceCurrentView', '/finance/accountsReceivable')
        // this.$router.push({ path: './accountsPayable/waybill' })
        this.isFresh = true // 是否手动刷新页面
      } else {
        this.$set(this.searchQuery.vo, 'feeType', this.getRouteInfo.vo.feeType)
        this.searchQuery.vo.ascriptionOrgId = this.getRouteInfo.vo.ascriptionOrgId
        this.$set(this.searchQuery.vo, 'status', '')
        this.isFresh = false
      }
    },
    setRight(item) {
      /* item.inputNowPayFee = 1
      item.inputArrivepayFee = 1
      item.inputReceiptpayFee = 1
      item.inputMonthpayFee = 1
      item.inputChangeFee = 1 */

      // this.rightTable.push(item)

      this.$set(this.rightTable, this.rightTable.length, item)
    },
    getList() {
      const selectListShipSns = objectMerge2([], this.$route.query.selectListShipSns)
      if (this.$route.query.selectListShipSns) {
        this.isModify = true
      } else {
        this.isModify = false
      }
      this.leftTable = this.$options.data().leftTable
      this.rightTable = this.$options.data().rightTable
      this.tableReceiptInfo = this.$options.data().tableReceiptInfo
      this.orgLeftTable = this.$options.data().orgLeftTable

      this.initLeftParams() // 设置searchQuery
      if (!this.isFresh) {
        accountApi.getReceivableList(this.searchQuery).then(data => {
          // NOSETTLEMENT,PARTSETTLEMENT
          // 过滤未完成结算的数据
          this.leftTable = Object.assign([], data.list.filter(el => {
            return /(NOSETTLEMENT|PARTSETTLEMENT)/.test(el.totalStatus)
          })).map(el => {
            el.inputNowPayFee = el.notNowPayFee
            el.inputArrivepayFee = el.notArrivepayFee
            el.inputReceiptpayFee = el.notReceiptpayFee
            el.inputMonthpayFee = el.notMonthpayFee
            el.inputChangeFee = el.notChangeFee
            return el
          })
          selectListShipSns.forEach(e => {
            this.leftTable.forEach(item => {
              if (e === item.shipSn) {
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
          this.$message.error(err.errorInfo || err.text || '未知错误，请重试~')
        })
      }
    },
    changLoadData(index, prop, newVal) {
      let num = 0

      if (newVal) {
        num = this.rightTable[index][prop.replace('input', 'not')]
      }

      this.$set(this.rightTable, index, Object.assign(this.rightTable[index], {
        [prop]: num
      }))

      return false
      /* this.rightTable[index][prop] = Number(newVal)
      const unpaidName = 'unpaidFee' // 未结费用名
      const unpaidVal = Number(this.rightTable[index][unpaidName]) // 未结费用值
      const paidVal = this.rightTable[index][prop]
      if (paidVal < 0 || paidVal > unpaidVal) {
        this.$message({ type: 'warning', message: '实结费用不小于0，不大于未结费用。' })
      } else {
        this.rightTable[index][prop] = Number(newVal)
      }
      console.log(this.rightTable[index][prop], paidVal, unpaidName, this.rightTable[index][unpaidName], this.rightTable[index]) */
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
      this.tablekey = Math.random()
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
          // 默认设置实结数量
          e.inputBrokerageFee = e.unpaidFee
          this.setRight(e)
          let item = -1
          this.leftTable.map((el, index) => {
            if (el.shipSn === e.shipSn) {
              item = index
            }
          })
          if (item !== -1) { // 左边表格源数据减去被穿梭的数据
            this.leftTable.splice(item, 1)
            this.orgLeftTable.splice(item, 1)
          }
          // const orgItem = this.orgLeftTable.indexOf(e)

          if (item !== -1) { // 搜索源数据同样减去被穿梭数据

          }
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
            return em.shipSn !== e.shipSn
          })
          this.orgLeftTable = objectMerge2([], this.orgLeftTable).filter(em => {
            return em.shipSn !== e.shipSn
          })
          this.leftTable.push(e)
          this.orgLeftTable.push(e) // 搜索源数据更新添加的数据
          this.rightTable = objectMerge2([], this.rightTable).filter(el => {
            return el.shipSn !== e.shipSn
          })
          // this.leftTable.push(e)
          // this.orgLeftTable.push(e) // 搜索源数据更新添加的数据
          // const item = this.rightTable.indexOf(e)
          // if (item !== -1) {
          //   // 右边源数据减去被穿梭的数据
          //   this.rightTable.splice(item, 1)
          // }
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
      // this.leftTable = Object.assign([], obj)
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
    closeDialog() {
      this.popVisibleDialog = false
    },
    openDialog() {
      this.popVisibleDialog = true
    },
    // 结算前整理数据
    goReceipt() {
      this.tableReceiptInfo = []
      if (!this.isGoReceipt) {
        this.rightTable.forEach((e, index) => {
          const item = {
            shipId: e.shipId,
            shipSn: e.shipSn
            // feeTypeId: e.feeTypeId,

          }
          if (e.inputNowPayFee && e.notNowPayFee > 0) {
            this.tableReceiptInfo.push(Object.assign({
              dataName: '现付',
              amount: e.notNowPayFee,
              inputNowPayFee: e.notNowPayFee
            }, item))
            // item.inputNowPayFee = e.notNowPayFee
          }
          if (e.inputArrivepayFee && e.notArrivepayFee > 0) {
            this.tableReceiptInfo.push(Object.assign({
              dataName: '到付',
              amount: e.notArrivepayFee,
              inputArrivepayFee: e.notArrivepayFee
            }, item))
          }
          if (e.inputReceiptpayFee && e.notReceiptpayFee > 0) {
            this.tableReceiptInfo.push(Object.assign({
              dataName: '回单付',
              amount: e.notReceiptpayFee,
              inputReceiptpayFee: e.notReceiptpayFee
            }, item))
          }
          if (e.inputMonthpayFee && e.notMonthpayFee > 0) {
            this.tableReceiptInfo.push(Object.assign({
              dataName: '月结付',
              amount: e.notMonthpayFee,
              inputMonthpayFee: e.notMonthpayFee
            }, item))
          }
          if (e.inputChangeFee && e.notChangeFee > 0) {
            this.tableReceiptInfo.push(Object.assign({
              dataName: '异动费用',
              amount: e.notChangeFee,
              inputChangeFee: e.notChangeFee
            }, item))
          }

         /*  if (item.amount > 0 && item.amount <= e.unpaidFee) { // 提交可结算项
            this.tableReceiptInfo.push(item)
          } */
          /* if (ischeck) {
            this.tableReceiptInfo.push(item)
          } */
        })
        if (this.tableReceiptInfo.length > 0) { // 判断是否要结算
          this.openDialog()
        } else {
          this.$message({ type: 'warning', message: '暂无可结算项！实结费用不小于0，不大于未结费用。' })
        }
      }
    },
    getSumRight(param) { // 右边表格合计-自定义显示
      return getSummaries(param)
    },
    getSumLeft(param) { // 左边表格合计-自定义显示
      return getSummaries(param)
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
.tableHeadItemBtn .setTableHeader{
  position: static;
}
</style>
