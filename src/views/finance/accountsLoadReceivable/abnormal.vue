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
            <Pager :total="totalLeft" @change="handlePageChangeLeft" :btnsize="'mini'" :defaultValues="searchQuery"  />
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
                    <el-input :value="scope.row.notChangeFee" v-numberOnly:point @dblclick.stop.prevent.native :class="{'textChangeDanger': textChangeDanger[scope.$index]}" @change="(val) => changLoadData(scope.$index, column.prop, val)" :size="btnsize"></el-input>
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
  name: 'abnormalAccountsLoadReceivable',
  mixins: [mix],
  data() {
    return {
      btnLoading: false,
      infoTable: {
        amount: 0,
        orderList: []
      },
      textChangeDanger: [],
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
        width: '120'
      },
      {
        label: '签收状态',
        prop: 'signStatus',
        width: '100',
        fixed: false
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
        'label': '异动',
        'prop': 'changeFee'
      }, {
        'label': '异动核销状态',
        'prop': 'changeStateCn'
      }, {
        'label': '未核销异动',
        'prop': 'notChangeFee',
        slot: (scope) => {
          const row = scope.row
          return this._setTextColor(row.changeFee, row.finishChangeFee, row.notChangeFee, row.notChangeFee)
        }
      }, {
        'label': '已核销异动',
        'prop': 'finishChangeFee',
        slot: (scope) => {
          const row = scope.row
          return this._setTextColor(row.changeFee, row.finishChangeFee, row.notChangeFee, row.finishChangeFee)
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
          this.leftTable = Object.assign([], data.list)
          // this.leftTable = Object.assign([], data.list.filter(el => {
          //   return /(NOSETTLEMENT|PARTSETTLEMENT)/.test(el.changeState)
          // }))
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
      // this.rightTable[index][prop] = Number(newVal)

      this.$set(this.rightTable, index, Object.assign(this.rightTable[index], {
        [prop]: Number(newVal)
      }))
      if (this.rightTable[index].notChangeFee !== newVal) {
        this.textChangeDanger[index] = true
      } else {
        this.textChangeDanger[index] = false
      }
      if (Number(newVal) < 0 || Number(newVal) > this.rightTable[index].notChangeFee) {
        this.isGoReceipt = true
        this.$message({ type: 'warning', message: '实际核销费用不小于0，不大于未核销费用。' })
      } else {
        this.isGoReceipt = false
      }
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

    // 核销前整理数据
    goReceipt() {
      this.infoTable = this.$options.data().infoTable

      // this.tableReceiptInfo = []
      if (!this.isGoReceipt) {
        let amount = 0
        this.rightTable.forEach((e, index) => {
          amount = tmsMath._add(amount, e.inputChangeFee)
          // const item = {
          //   shipId: e.shipId,
          //   shipSn: e.shipSn
          //   // feeTypeId: e.feeTypeId,
          // }
          if (e.inputChangeFee && e.notChangeFee > 0 && e.inputChangeFee <= e.notChangeFee) {
            this.infoTable.orderList.push(e)
            // this.tableReceiptInfo.push(Object.assign({
            //   dataName: '异动费用',
            //   amount: e.inputChangeFee,
            //   inputChangeFee: e.inputChangeFee
            // }, item))
          }

          /*  if (item.amount > 0 && item.amount <= e.unpaidFee) { // 提交可核销项
             this.tableReceiptInfo.push(item)
           } */
          /* if (ischeck) {
            this.tableReceiptInfo.push(item)
          } */
        })
        this.infoTable.amount = amount

        amount = 0
        if (this.infoTable.orderList.length > 0) { // 判断是否要核销
          this.openDialog()
        } else {
          this.$message({ type: 'warning', message: '暂无可核销项！实际核销费用不小于0，不大于未核销费用。' })
        }
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
