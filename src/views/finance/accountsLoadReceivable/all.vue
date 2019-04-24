<template>
  <div class="customer-manager tab-wrapper tab-wrapper-100 receivableTable" v-loading="loading">
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
        <div slot="tableLeft" class="tableHeadItemBtn tableHeadItemBtnHeight">
        <!--   <table @click="">
            <thead>
              <tr >
                  <th v-for="(item, index) in tableColumnLeft" :key="index">{{ item.label }}</th>
              </tr>
            </thead>
            <tr v-for="(item, index) in leftTable" :key="index">
              <td>{{index}}</td>
              <td v-for="(i, a) in item" :key="a + index">{{ i }}</td>
            </tr>
          </table> -->
          <el-table ref="multipleTableRight" :data="leftTable" border @row-click="clickDetailsRight" @selection-change="getSelectionRight" tooltip-effect="dark" triped :key="tablekey" height="100%" :summary-method="getSumRight" :default-sort="{prop: 'id', order: 'ascending'}" :show-overflow-tooltip="true" :show-summary="true" @row-dblclick="dclickAddItem">
            <el-table-column fixed width="60" label="序号">
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
          <div class="accountsLoad_table_pager">
            <b>共计:{{ totalLeft }}</b>
            <div class="show_pager">
              <Pager :total="totalLeft" @change="handlePageChangeLeft" :btnsize="'mini'" :defaultValues="searchQuery" />
            </div>
          </div>
        </div>
        <!-- 右边表格区 -->
        <div slot="tableRight" class="tableHeadItemBtn tableHeadItemBtnHeight">
          <el-table ref="multipleTableLeft" :data="rightTable" border @row-click="clickDetailsLeft" @selection-change="getSelectionLeft" tooltip-effect="dark" triped :key="tablekey" height="100%" :summary-method="getSumLeft" :default-sort="{prop: 'id', order: 'ascending'}" :show-summary='true' style="height:100%;" @row-dblclick="dclickMinusItem">
            <el-table-column fixed width="60" label="序号">
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
                    <!-- <template v-if="scope.row[column.prop.replace(/^input/i,'').replace(/fee$/i,'').toLocaleLowerCase()+'State'] === 'ALLSETTLEMENT'">已核销</template> -->
                    <el-checkbox checked @change="(val) => changLoadData(scope.$index, column.prop, val)" :size="btnsize">{{ scope.row[column.prop.replace(/^input/i,'not')] }}</el-checkbox>
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
          <div class="accountsLoad_table_pager">
            <b>共计:{{ totalRight }}</b>
            <div class="show_pager">
              <!-- <Pager :total="totalRight" @change="handlePageChangeRight" :btnsize="'mini'" /> -->
            </div>
          </div>
        </div>
      </transferTable>
      <!-- 核销凭证 -->
      <Voucher :popVisible="popVisibleDialog" :info="infoTable" @close="closeDialog" :orgId="getRouteInfo.vo.ascriptionOrgId  ||  otherinfo.orgid" :btnLoading="btnLoading"></Voucher>
      <!-- <Receipt :popVisible="popVisibleDialog" :info="tableReceiptInfo" @close="closeDialog"></Receipt> -->
    </div>
  </div>
</template>
<script>
import * as accountApi from '@/api/finance/accountsReceivable'
import { parseDict, parseShipStatus } from '@/utils/dict'
import { postFindListByFeeType } from '@/api/finance/accountsPayable'

import { objectMerge2, parseTime, getSummaries, tmsMath, operationPropertyCalc } from '@/utils/index'
import mix from './mixin'

export default {
  name: 'allAccountsLoadReceivable',
  mixins: [mix],
  data() {
    return {
      btnLoading: false,
      infoTable: {
        amount: 0,
        orderList: [],
        feeIds: []
      },
      currentSearch: '',
      tablekey: '',
      truckMessage: '',
      formModel: {},
      loading: true,
      popVisibleDialog: false,
      btnsize: 'mini',
      totalLeft: 0,
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
        label: '核销状态',
        prop: 'totalStatusCn',
        width: '100'
      }, {
        label: '签收状态',
        prop: 'signStatus',
        width: '100',
        fixed: false
      },
      {
        label: '发货人',
        prop: 'shipSenderName',
        width: '80',
        fixed: false
      },
      {
        label: '收货人',
        prop: 'shipReceiverName',
        width: '80',
        fixed: false
      },
      {
        label: '签收状态',
        prop: 'signStatus',
        width: '100',
        fixed: false
      },
      {
        'label': '现付',
        'prop': 'nowPayFee'
      }, {
        'label': '现付核销状态',
        width: '120',
        'prop': 'nowPayStateCn'
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
        label: '实际核销现付',
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
        'label': '到付核销状态',
        width: '120',
        'prop': 'arrivepayStateCn'
      }, {
        'label': '已核销到付',
        'prop': 'finishArrivepayFee',
        slot: (scope) => {
          const row = scope.row
          return this._setTextColor(row.arrivepayFee, row.finishArrivepayFee, row.notArrivepayFee, row.finishArrivepayFee)
        }
      }, {
        'label': '未核销到付',
        'prop': 'notArrivepayFee',
        slot: (scope) => {
          const row = scope.row
          return this._setTextColor(row.arrivepayFee, row.finishArrivepayFee, row.notArrivepayFee, row.notArrivepayFee)
        }
      }, {
        label: '实际核销到付',
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
        'label': '回单付核销状态',
        'prop': 'receiptpayStateCn'
      }, {
        'label': '已核销回单付',
        width: '100',
        'prop': 'finishReceiptpayFee',
        slot: (scope) => {
          const row = scope.row
          return this._setTextColor(row.receiptpayFee, row.finishReceiptpayFee, row.notReceiptpayFee, row.finishReceiptpayFee)
        }
      }, {
        'label': '未核销回单付',
        width: '100',
        'prop': 'notReceiptpayFee',
        slot: (scope) => {
          const row = scope.row
          return this._setTextColor(row.receiptpayFee, row.finishReceiptpayFee, row.notReceiptpayFee, row.notReceiptpayFee)
        }
      },
      {
        label: '实际核销回单付',
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
        'label': '月结核销状态',
        width: '110',
        'prop': 'monthpayStateCn'
      }, {
        'label': '已核销月结',
        'prop': 'finishMonthpayFee',
        slot: (scope) => {
          const row = scope.row
          return this._setTextColor(row.monthpayFee, row.finishMonthpayFee, row.notMonthpayFee, row.finishMonthpayFee)
        }
      }, {
        'label': '未核销月结',
        'prop': 'notMonthpayFee',
        slot: (scope) => {
          const row = scope.row
          return this._setTextColor(row.monthpayFee, row.finishMonthpayFee, row.notMonthpayFee, row.notMonthpayFee)
        }
      },
      {
        label: '实际核销月付',
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
        'label': '异动核销状态',
        width: '100',
        'prop': 'changeStateCn'
      }, {
        'label': '已核销异动',
        'prop': 'finishChangeFee',
        slot: (scope) => {
          const row = scope.row
          return this._setTextColor(row.changeFee, row.finishChangeFee, row.notChangeFee, row.finishChangeFee)
        }
      }, {
        'label': '未核销异动',
        'prop': 'notChangeFee',
        slot: (scope) => {
          const row = scope.row
          return this._setTextColor(row.changeFee, row.finishChangeFee, row.notChangeFee, row.notChangeFee)
        }
      }, {
        label: '实际核销异动付',
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
        label: '发站',
        prop: 'shipFromCityName',
        width: '120',
        fixed: false
      },
      {
        label: '到站',
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
  methods: {
    setRight(item) {
      /* item.inputNowPayFee = 1
      item.inputArrivepayFee = 1
      item.inputReceiptpayFee = 1
      item.inputMonthpayFee = 1
      item.inputChangeFee = 1 */

      // this.rightTable.push(item)

      this.$set(this.rightTable, this.rightTable.length, item)
    },
    setRightValue(el) {
      el.inputNowPayFee = el.notNowPayFee
      el.inputArrivepayFee = el.notArrivepayFee
      el.inputReceiptpayFee = el.notReceiptpayFee
      el.inputMonthpayFee = el.notMonthpayFee
      el.inputChangeFee = el.notChangeFee
    },
    getList(handle) {
      this.loading = true
      const selectListShipSns = objectMerge2([], JSON.parse(this.$route.query.selectListShipSns))
      if (JSON.parse(this.$route.query.selectListShipSns)) {
        this.isModify = true
      } else {
        this.isModify = false
      }
      this.leftTable = this.$options.data().leftTable
      this.rightTable = this.$options.data().rightTable
      // this.tableReceiptInfo = this.$options.data().tableReceiptInfo
      this.infoTable = this.$options.data().infoTable
      this.orgLeftTable = this.$options.data().orgLeftTable

      if (!handle) {
        this.initLeftParams() // 设置searchQuery
      }
      if (!this.isFresh) {
        accountApi.getReceivableList(this.searchQuery).then(data => {
          // NOSETTLEMENT,PARTSETTLEMENT
          // 过滤未完成核销的数据
          this.totalLeft = data.total
          // this.leftTable = Object.assign([], data.list.filter(el => {
          //   return /(NOSETTLEMENT|PARTSETTLEMENT)/.test(el.totalStatus)
          // })).map(el => {
          this.leftTable = Object.assign([], data.list).map(el => {
            this.setRightValue(el)
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
          this.loading = false
        }).catch((err) => {
          this.loading = false
          this._handlerCatchMsg(err)
        })
      }
    },
    changLoadData(index, prop, newVal) {
      let num = 0
      if (newVal) {
        num = this.rightTable[index][prop.replace('input', 'not')]
      } else {
        // this.rightTable[index][prop.replace('input', 'not')] = 0
      }

      this.$set(this.rightTable, index, Object.assign(this.rightTable[index], {
        [prop]: num
      }))

      return false
      /* this.rightTable[index][prop] = Number(newVal)
      const unpaidName = 'unpaidFee' // 未核销费用名
      const unpaidVal = Number(this.rightTable[index][unpaidName]) // 未核销费用值
      const paidVal = this.rightTable[index][prop]
      if (paidVal < 0 || paidVal > unpaidVal) {
        this.$message({ type: 'warning', message: '实际核销费用不小于0，不大于未核销费用。' })
      } else {
        this.rightTable[index][prop] = Number(newVal)
      }
      console.log(this.rightTable[index][prop], paidVal, unpaidName, this.rightTable[index][unpaidName], this.rightTable[index]) */
    },
    // 选中的行
    selectCurrent(obj, index) {
      // 1 设置默认数据
      // 2 检查左边列表有没有该数据
      // 2-1 如果有，就直接筛选左边数据，并且左边数据列减去该条数据
      // 2-2 如果没有，就直接添加到右边表格
      this.setRightValue(obj)

      this.addItem(obj, index)
    },

    // 核销前整理数据
    goReceipt() {
      this.infoTable = this.$options.data().infoTable
      // this.tableReceiptInfo = []
      if (!this.isGoReceipt) {
        let amount = 0
        this.rightTable.forEach((e, index) => {
          amount = tmsMath.add(
            amount,
            e.inputNowPayFee,
            e.inputArrivepayFee,
            e.inputReceiptpayFee,
            e.inputMonthpayFee,
            e.inputChangeFee,
          ).result()

          const item = objectMerge2({}, e)
          let count = 0
          if (e.inputNowPayFee && e.notNowPayFee > 0) {
            count++
            this.$set(item, 'inputNowPayFee', item.notNowPayFee)
            // arr.push(Object.assign({
            //   dataName: '现付',
            //   amount: e.notNowPayFee,
            //   inputNowPayFee: e.notNowPayFee,
            //   feeReceivableTypeId: e.nowPayFeeId
            // }, item))
            this.infoTable.feeIds.push(e.nowPayFeeId)
          }
          if (e.inputArrivepayFee && e.notArrivepayFee > 0) {
            count++
            this.$set(item, 'inputArrivepayFee', item.notArrivepayFee)
            // arr.push(Object.assign({
            //   dataName: '到付',
            //   amount: e.notArrivepayFee,
            //   inputArrivepayFee: e.notArrivepayFee,
            //   feeReceivableTypeId: e.arrivepayFeeId
            // }, item))
            this.infoTable.feeIds.push(e.arrivepayFeeId)
          }
          if (e.inputReceiptpayFee && e.notReceiptpayFee > 0) {
            count++
            this.$set(item, 'inputReceiptpayFee', item.notReceiptpayFee)
            // arr.push(Object.assign({
            //   dataName: '回单付',
            //   amount: e.notReceiptpayFee,
            //   inputReceiptpayFee: e.notReceiptpayFee,
            //   feeReceivableTypeId: e.receiptpayFeeId
            // }, item))
            this.infoTable.feeIds.push(e.receiptpayFeeId)
          }
          if (e.inputMonthpayFee && e.notMonthpayFee > 0) {
            count++
            this.$set(item, 'inputReceiptpayFee', item.notReceiptpayFee)
            // arr.push(Object.assign({
            //   dataName: '回单付',
            //   amount: e.notReceiptpayFee,
            //   inputReceiptpayFee: e.notReceiptpayFee,
            //   feeReceivableTypeId: e.receiptpayFeeId
            // }, item))
            this.infoTable.feeIds.push(e.monthpayFeeId)
          }
          if (e.inputChangeFee && e.notChangeFee > 0) {
            count++
            this.$set(item, 'inputChangeFee', item.notChangeFee)
            // arr.push(Object.assign({
            //   dataName: '异动费用',
            //   amount: e.notChangeFee,
            //   inputChangeFee: e.notChangeFee,
            //   feeReceivableTypeId: e.changeFeeId
            // }, item))
            this.infoTable.feeIds.push(e.changeFeeId)
          }
          if (count > 0) {
            this.infoTable.orderList.push(item)
          }

          // let item = Object.assign({}, e)
          // if (e.inputNowPayFee && e.notNowPayFee > 0) {
          //   this.infoTable.orderList.push(Object.assign({
          //     dataName: '现付',
          //     amount: e.notNowPayFee,
          //     inputNowPayFee: e.notNowPayFee,
          //     feeReceivableTypeId: e.nowPayFeeId
          //   }, item))
          // }
          // if (e.inputArrivepayFee && e.notArrivepayFee > 0) {
          //   this.infoTable.orderList.push(Object.assign({
          //     dataName: '到付',
          //     amount: e.notArrivepayFee,
          //     inputArrivepayFee: e.notArrivepayFee,
          //     feeReceivableTypeId: e.arrivepayFeeId
          //   }, item))
          // }
          // if (e.inputReceiptpayFee && e.notReceiptpayFee > 0) {
          //   this.infoTable.orderList.push(Object.assign({
          //     dataName: '回单付',
          //     amount: e.notReceiptpayFee,
          //     inputReceiptpayFee: e.notReceiptpayFee,
          //     feeReceivableTypeId: e.receiptpayFeeId
          //   }, item))
          // }
          // if (e.inputMonthpayFee && e.notMonthpayFee > 0) {
          //   this.infoTable.orderList.push(Object.assign({
          //     dataName: '月结付',
          //     amount: e.notMonthpayFee,
          //     inputMonthpayFee: e.notMonthpayFee,
          //     feeReceivableTypeId: e.monthpayFeeId
          //   }, item))
          // }
          // if (e.inputChangeFee && e.notChangeFee > 0) {
          //   this.infoTable.orderList.push(Object.assign({
          //     dataName: '异动费用',
          //     amount: e.notChangeFee,
          //     inputChangeFee: e.notChangeFee,
          //     feeReceivableTypeId: e.changeFeeId
          //   }, item))
          // }
        })
        this.infoTable.amount = amount
        amount = 0
        if (this.infoTable.orderList.length > 0) { // 判断是否要核销
          this.openDialog()
        } else {
          this.$message({ type: 'warning', message: '暂无可核销项！实际核销费用不小于0，不大于未核销费用。' })
        }
        // this.rightTable.forEach((e, index) => {
        //   const item = {
        //     shipId: e.shipId,
        //     shipSn: e.shipSn
        //   }
        //   if (e.inputNowPayFee && e.notNowPayFee > 0) {
        //     this.tableReceiptInfo.push(Object.assign({
        //       dataName: '现付',
        //       amount: e.notNowPayFee,
        //       inputNowPayFee: e.notNowPayFee
        //     }, item))
        //   }
        //   if (e.inputArrivepayFee && e.notArrivepayFee > 0) {
        //     this.tableReceiptInfo.push(Object.assign({
        //       dataName: '到付',
        //       amount: e.notArrivepayFee,
        //       inputArrivepayFee: e.notArrivepayFee
        //     }, item))
        //   }
        //   if (e.inputReceiptpayFee && e.notReceiptpayFee > 0) {
        //     this.tableReceiptInfo.push(Object.assign({
        //       dataName: '回单付',
        //       amount: e.notReceiptpayFee,
        //       inputReceiptpayFee: e.notReceiptpayFee
        //     }, item))
        //   }
        //   if (e.inputMonthpayFee && e.notMonthpayFee > 0) {
        //     this.tableReceiptInfo.push(Object.assign({
        //       dataName: '月结付',
        //       amount: e.notMonthpayFee,
        //       inputMonthpayFee: e.notMonthpayFee
        //     }, item))
        //   }
        //   if (e.inputChangeFee && e.notChangeFee > 0) {
        //     this.tableReceiptInfo.push(Object.assign({
        //       dataName: '异动费用',
        //       amount: e.notChangeFee,
        //       inputChangeFee: e.notChangeFee
        //     }, item))
        //   }
        // })
        // if (this.tableReceiptInfo.length > 0) { // 判断是否要核销
        //   this.openDialog()
        // } else {
        //   this.$message({ type: 'warning', message: '暂无可核销项！实际核销费用不小于0，不大于未核销费用。' })
        // }
      }
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
