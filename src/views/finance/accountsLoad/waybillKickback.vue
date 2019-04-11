<template>
  <!-- 回扣核销页面 -->
  <div class="accountsLoad_table" v-loading="loading">
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
        <el-button class="tableAllBtn" size="mini" @click="addALLList"></el-button>
        <el-table ref="multipleTableRight" :data="leftTable" border @row-click="clickDetailsRight" @selection-change="getSelectionRight" tooltip-effect="dark" triped :key="tablekey" height="100%" :summary-method="getSumRight" :default-sort="{prop: 'id', order: 'ascending'}" :show-overflow-tooltip="true" :show-summary="true" @row-dblclick="dclickAddItem">
          <el-table-column fixed width="60" label="序号">
            <template slot-scope="scope">
              {{scope.$index + 1}}
            </template>
          </el-table-column>
          <el-table-column fixed width="50">
            <template slot-scope="scope">
              <el-button class="tableItemBtn" size="mini" @click="addItem(scope.row, scope.$index)"></el-button>
            </template>
          </el-table-column>
          <template v-for="column in tableColumnLeft">
            <el-table-column :key="column.id" :fixed="column.fixed" sortable :label="column.label" :prop="column.prop" v-if="!column.slot" :width="column.width">
            </el-table-column>
            <el-table-column :key="column.id" :fixed="column.fixed" sortable :label="column.label" v-else :width="column.width" :prop="column.prop">
              <template slot-scope="scope">
                <div v-if="column.expand">
                  <el-input type="number" @dblclick.stop.prevent.native :class="{'textChangeDanger': textChangeDanger[scope.$index]}" v-model.number="column.slot(scope)" :size="btnsize" @change="(val) => changLoadData(scope.$index, column.prop, val)"></el-input>
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
        <el-button class="tableAllBtnMinus" size="mini" @click="minusAllList"></el-button>
        <el-table ref="multipleTableLeft" :data="rightTable" border @row-click="clickDetailsLeft" @selection-change="getSelectionLeft" tooltip-effect="dark" triped :key="tablekey" height="100%" :summary-method="getSumLeft" :default-sort="{prop: 'id', order: 'ascending'}" :show-summary='true' style="height:100%;" @row-dblclick="dclickMinusItem">
          <el-table-column fixed width="60" label="序号">
            <template slot-scope="scope">
              {{scope.$index + 1}}
            </template>
          </el-table-column>
          <el-table-column fixed width="50">
            <template slot-scope="scope">
              <el-button class="tableItemBtnMinus" size="mini" @click="minusItem(scope.row, scope.$index)"></el-button>
            </template>
          </el-table-column>
          <template v-for="column in tableColumnRight">
            <el-table-column :key="column.id" :fixed="column.fixed" sortable :label="column.label" :prop="column.prop" v-if="!column.slot" :width="column.width">
            </el-table-column>
            <el-table-column :key="column.id" :fixed="column.fixed" sortable :label="column.label" v-else :width="column.width" :prop="column.prop">
              <template slot-scope="scope">
                <div v-if="column.expand">
                  <el-input v-numberOnly:point type="number" @dblclick.stop.prevent.native @click.stop.prevent.native :class="{'textChangeDanger': textChangeDanger[scope.$index]}" v-model.number="column.slot(scope)" :size="btnsize" @change="(val) => changLoadData(scope.$index, column.prop, val)"></el-input>
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
    <Voucher :popVisible="popVisibleDialog" :info="infoTable" @close="closeDialog" :orgId="getRouteInfo.vo.shipFromOrgid" :btnLoading="btnLoading"></Voucher>
    <!-- <Receipt :popVisible="popVisibleDialog" :info="tableReceiptInfo" @close="closeDialog"></Receipt> -->
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { postFindListByFeeType, postCreateloadSettlement } from '@/api/finance/accountsPayable'
import transferTable from '@/components/transferTable'
import { objectMerge2, parseTime, tmsMath } from '@/utils/index'
import querySelect from '@/components/querySelect/'
import Receipt from './components/receiptWaybill'
import Pager from '@/components/Pagination/index'
import currentSearch from './components/currentSearch'
import { getSummaries, uniqueArray } from '@/utils/'
import Voucher from '@/components/voucher/waybill'
export default {
  name: 'waybillKickback',
  components: {
    transferTable,
    querySelect,
    Receipt,
    Pager,
    currentSearch,
    Voucher
  },
  data() {
    return {
      infoTable: {
        amount: 0,
        orderList: []
      },
      btnLoading: false,
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
        fixed: true
      },
      {
        label: '开单网点',
        prop: 'shipFromOrgName',
        width: '120',
        fixed: false
      },
      {
        label: '核销状态',
        prop: 'statusName',
        width: '120',
        fixed: false
      },
      {
        label: '签收状态',
        prop: 'signStatusName',
        width: '100',
        fixed: false
      },
      {
        label: '发货人',
        prop: 'senderCustomerName',
        width: '120',
        fixed: false
      },
      {
        label: '收货人',
        prop: 'receiverCustomerName',
        width: '120',
        fixed: false
      },
      {
        label: '回扣',
        prop: 'fee',
        width: '120',
        fixed: false
      },
      {
        label: '已核销回扣',
        prop: 'closeFee',
        width: '100',
        fixed: false,
        slot: (scope) => {
          const row = scope.row
          return this._setTextColor(row.fee, row.closeFee, row.unpaidFee, row.closeFee)
        }
      },
      {
        label: '未核销回扣',
        prop: 'unpaidFee',
        width: '100',
        fixed: false,
        slot: (scope) => {
          const row = scope.row
          return this._setTextColor(row.fee, row.closeFee, row.unpaidFee, row.unpaidFee)
        }
      },
      {
        label: '发货方',
        prop: 'senderUnit',
        width: '120',
        fixed: false
      },
      {
        label: '收货方',
        prop: 'receiverUnit',
        width: '120',
        fixed: false
      },
      {
        label: '货号',
        prop: 'shipGoodsSn',
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
        label: '开单时间',
        prop: 'createTime',
        width: '120',
        fixed: false,
        slot: (scope) => {
          return `${parseTime(scope.row.createTime, '{y}-{m}-{d} {h}:{i}:{s}')}`
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
      ],
      tableColumnRight: [{
        label: '运单号',
        prop: 'shipSn',
        width: '120',
        fixed: true
      },
      {
        label: '开单网点',
        prop: 'shipFromOrgName',
        width: '120',
        fixed: false
      },
      {
        label: '核销状态',
        prop: 'statusName',
        width: '120',
        fixed: false
      },
      {
        label: '签收状态',
        prop: 'signStatusName',
        width: '100',
        fixed: false
      },
      {
        label: '发货人',
        prop: 'senderCustomerName',
        width: '120',
        fixed: false
      },
      {
        label: '收货人',
        prop: 'receiverCustomerName',
        width: '120',
        fixed: false
      },
      {
        label: '回扣',
        prop: 'fee',
        width: '120',
        fixed: false
      },
      {
        label: '已核销回扣',
        prop: 'closeFee',
        width: '100',
        fixed: false,
        slot: (scope) => {
          const row = scope.row
          return this._setTextColor(row.fee, row.closeFee, row.unpaidFee, row.closeFee)
        }
      },
      {
        label: '未核销回扣',
        prop: 'unpaidFee',
        width: '100',
        fixed: false,
        slot: (scope) => {
          const row = scope.row
          return this._setTextColor(row.fee, row.closeFee, row.unpaidFee, row.unpaidFee)
        }
      },
      {
        label: '实际核销回扣',
        prop: 'inputBrokerageFee',
        width: '120',
        fixed: false,
        expand: true,
        slot: (scope) => {
          return scope.row.inputBrokerageFee
        }
      },
      {
        label: '发货方',
        prop: 'senderUnit',
        width: '120',
        fixed: false
      },
      {
        label: '收货方',
        prop: 'receiverUnit',
        width: '120',
        fixed: false
      },
      {
        label: '货号',
        prop: 'shipGoodsSn',
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
        label: '开单时间',
        prop: 'createTime',
        width: '180',
        fixed: false,
        slot: (scope) => {
          return `${parseTime(scope.row.createTime, '{y}-{m}-{d} {h}:{i}:{s}')}`
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
    ...mapGetters([
      'otherinfo'
    ]),
    getRouteInfo() {
      return JSON.parse(this.$route.query.searchQuery)
    },
    // totalLeft() {
    //   return this.leftTable.length
    // },
    totalRight() {
      return this.rightTable.length
    }
  },
  created() {
    this.searchQuery = Object.assign({}, this.getRouteInfo)
  },
  mounted() {
    this.getList()
  },
  methods: {
    handlePageChangeLeft(obj) {
      this.searchQuery.currentPage = obj.pageNum
      this.searchQuery.pageSize = obj.pageSize
      this.pageGetList()
    },
    pageGetList() {
      const rightTable = objectMerge2([], this.rightTable)
      this.loading = true
      this.$set(this.searchQuery.vo, 'status', 'NOSETTLEMENT,PARTSETTLEMENT')
      postFindListByFeeType(this.searchQuery).then(data => {
        if (data) {
          this.leftTable = Object.assign([], data.list)
          this.totalLeft = data.total
          rightTable.forEach((el, index) => {
            this.leftTable = this.leftTable.filter(em => em.shipSn !== el.shipSn)
          })
        }
        this.orgLeftTable = Object.assign([], this.leftTable)
        this.loading = false
      })
        .catch(err => {
          this._handlerCatchMsg(err)
        })
    },
    initLeftParams() {
      this.searchQuery = Object.assign({}, this.getRouteInfo)
      if (JSON.parse(this.$route.query.selectListShipSns).length > 0) {
      } else {
        this.searchQuery.currentPage = 1
        // this.searchQuery.pageSize = 100
      }
      this.$set(this.searchQuery.vo, 'feeType', this.feeType)
      this.$set(this.searchQuery.vo, 'status', 'NOSETTLEMENT,PARTSETTLEMENT')
      // if (!this.$route.query.searchQuery.vo) {
      //   this.searchQuery = JSON.parse(sessionStorage.getItem('searchQuery'))
      //   this.$set(this.searchQuery.vo, 'feeType', this.feeType)
      //   this.$set(this.searchQuery.vo, 'status', 'NOSETTLEMENT,PARTSETTLEMENT')
      // } else {
      //   this.searchQuery = Object.assign({}, this.getRouteInfo)
      //   this.$set(this.searchQuery.vo, 'feeType', this.feeType)
      //   this.$set(this.searchQuery.vo, 'status', 'NOSETTLEMENT,PARTSETTLEMENT')
      // }
    },
    getList(handle) {
      const sns = JSON.parse(this.$route.query.selectListShipSns)
      const selectListShipSns = Object.assign([], sns)
      if (this.$route.query.selectListShipSns) {
        this.isModify = true
      } else {
        this.isModify = false
      }
      this.leftTable = this.$options.data().leftTable
      this.rightTable = this.$options.data().rightTable
      this.infoTable = this.$options.data().infoTable
      // this.tableReceiptInfo = this.$options.data().tableReceiptInfo
      this.orgLeftTable = this.$options.data().orgLeftTable
      if (!handle) {
        this.initLeftParams() // 设置searchQuery
      }

      postFindListByFeeType(this.searchQuery).then(data => {
        this.leftTable = Object.assign([], data.list)
        this.totalLeft = data.total
        selectListShipSns.forEach(e => {
          this.leftTable.forEach(item => {
            if (e === item.shipSn) {
              this.rightTable.push(item)
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
        this.orgLeftTable = Object.assign([], this.leftTable)
        this.loading = false
      }).catch((err) => {
        this.loading = false
        this._handlerCatchMsg(err)
      })
    },
    changLoadData(index, prop, newVal) {
      this.rightTable[index][prop] = Number(newVal)
      const unpaidName = 'unpaidFee' // 未核销费用名
      const unpaidVal = Number(this.rightTable[index][unpaidName]) // 未核销费用值
      const paidVal = this.rightTable[index][prop]
      if (paidVal < 0 || paidVal > unpaidVal) {
        this.$message({ type: 'warning', message: '实际核销费用不小于0，不大于未核销费用。' })
        this.isGoReceipt = true
      } else {
        this.isGoReceipt = false
        // this.rightTable[index][prop] = Number(newVal)
        // this.$set(this.rightTable[index], prop, Number(newVal))
        this.$set(this.rightTable, index, Object.assign(this.rightTable[index], {
          [prop]: this.rightTable[index][prop]
        }))
      }
      if (paidVal !== unpaidVal) {
        this.$set(this.textChangeDanger, index, true)
      } else {
        this.$set(this.textChangeDanger, index, false)
      }
      console.log(index, paidVal, unpaidVal, unpaidName, this.rightTable[index][unpaidName], this.rightTable[index][prop], this.rightTable[index])
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
        // this.$message({ type: 'warning', message: '请在左边表格选择数据' })
      } else {
        this.selectedRight.forEach((e, index) => {
          // 默认设置实际核销数量
          e.inputBrokerageFee = e.unpaidFee
          this.rightTable = objectMerge2([], this.rightTable).filter(em => {
            return em.shipSn !== e.shipSn
          })
          this.rightTable.push(e)
          this.leftTable = objectMerge2([], this.leftTable).filter(el => {
            return el.shipSn !== e.shipSn
          })
          this.orgLeftTable = objectMerge2([], this.orgLeftTable).filter(el => {
            return el.shipSn !== e.shipSn
          })
          // this.rightTable.push(e)
          // let item = -1
          // this.leftTable.map((el, index) => {
          //   if (el.shipSn === e.shipSn) {
          //     item = index
          //   }
          // })
          // if (item !== -1) {
          //   this.leftTable.splice(item, 1)
          //   this.orgLeftTable.splice(item, 1)
          // }
          // let item = this.leftTable.indexOf(e)
          // if (item !== -1) { // 左边表格源数据减去被穿梭的数据
          //   this.leftTable.splice(item, 1)
          // }
          // let orgItem = this.orgLeftTable.indexOf(e)
          // if (item !== -1) { // 搜索源数据同样减去被穿梭数据
          //   this.orgLeftTable.splice(item, 1)
          // }
        })
        // this.rightTable = uniqueArray(objectMerge2(this.rightTable, 'shipSn'))
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
          if (this.leftTable.length < this.searchQuery.pageSize) {
            // 如果左边的列表长度比分页数少才可以添加到左边列表，否则就直接过滤掉不做处理
             this.leftTable.push(e)
             this.orgLeftTable.push(e) // 搜索源数据更新添加的数据
          }
          this.rightTable = objectMerge2([], this.rightTable).filter(el => {
            return el.shipSn !== e.shipSn
          })
          // this.leftTable.push(e)
          // this.orgLeftTable.push(e) // 搜索源数据更新添加的数据
          // let item = this.rightTable.indexOf(e)
          // if (item !== -1) {
          //   // 右边源数据减去被穿梭的数据
          //   this.rightTable.splice(item, 1)
          // }
        })
        // this.leftTable = uniqueArray(objectMerge2(this.leftTable, 'shipSn'))
        this.selectedLeft = [] // 清空选择列表
      }
      if (this.rightTable.length < 1) {
        this.isGoReceipt = true
      } else {
        this.isGoReceipt = false
      }
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
    selectCurrent(obj, index) {
      this.addItem(obj, index)
      console.log('sdfjs', obj, index)
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
    goReceipt() {
      this.infoTable = this.$options.data().infoTable
      // this.tableReceiptInfo = []
      if (!this.isGoReceipt) {
        let amount = 0
        this.rightTable.forEach((e, index) => {
          console.log('右边列表', index, e)
          if (e.inputBrokerageFee > 0 && e.inputBrokerageFee <= e.unpaidFee) { // 提交可核销项
            let item = {
              shipId: e.shipId,
              shipSn: e.shipSn,
              shipGoodsSn: e.shipGoodsSn,
              createTime: e.createTime,
              inputBrokerageFee: e.inputBrokerageFee,
              shipFromCityName: e.shipFromCityName,
              shipToCityName: e.shipToCityName,
              shipReceiverName: e.receiverCustomerName,
              shipSenderName: e.senderCustomerName
            }
            amount = tmsMath._add(amount, e.inputBrokerageFee)
            this.infoTable.orderList.push(item)
            item = {}
          }
        })
        this.infoTable.amount = amount
        amount = 0
        if (this.infoTable.orderList.length > 0) {
          this.openDialog()
        } else {
          this.$message({ type: 'warning', message: '暂无可核销项！实际核销费用不小于0，不大于未核销费用。' })
        }
        // this.rightTable.forEach((e, index) => {
        //   let item = {
        //     shipId: e.shipId,
        //     amount: e.inputBrokerageFee,
        //     inputBrokerageFee: e.inputBrokerageFee,
        //     shipSn: e.shipSn,
        //     dataName: '回扣'
        //   }
        //   if (item.amount > 0 && item.amount <= e.unpaidFee) { // 提交可核销项
        //     this.tableReceiptInfo.push(item)
        //   }
        //   item = {}
        // })
        // if (this.tableReceiptInfo.length > 0) { // 判断是否要核销
        //   this.openDialog()
        // } else {
        //   this.$message({ type: 'warning', message: '暂无可核销项！实际核销费用不小于0，不大于未核销费用。' })
        // }
      }
    },
    getSumRight(param) { // 右边表格合计-自定义显示
      const propsArr = ['_index|2|单', 'fee', 'unpaidFee', 'closeFee', 'cargoAmount|', 'cargoWeight|', 'cargoVolume|']
      return getSummaries(param, propsArr)
    },
    getSumLeft(param) { // 左边表格合计-自定义显示
      const propsArr = ['_index|2|单', 'fee', 'unpaidFee', 'closeFee', 'inputBrokerageFee', 'cargoAmount|', 'cargoWeight|', 'cargoVolume|']
      return getSummaries(param, propsArr)
    }
  }
}

</script>
