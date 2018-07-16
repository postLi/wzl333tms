<template>
  <!-- 发车汇总结算页面 -->
  <div class="accountsLoad_table">
    <transferTable style="height: calc(100% - 40px);padding:10px">
      <!-- 搜索框 -->
      <div slot="search">
        <querySelect search="shipSn" type="order" size="mini" @change="searchShip" />
      </div>
      <!-- 左上角按钮区 -->
      <div slot="btnsBox">
        <el-button :type="isGoReceipt?'info':'success'" size="mini" icon="el-icon-sort" @click="goReceipt" :disabled="isGoReceipt">发车汇总结算</el-button>
      </div>
      <!-- 左边表格区 -->
      <div style="height:100%;" slot="tableLeft" class="tableHeadItemBtn">
        <el-button class="tableAllBtn" size="mini" @click="addALLList"></el-button>
        <el-table ref="multipleTableRight" :data="leftTable" border @row-click="clickDetailsRight" @selection-change="getSelectionRight" tooltip-effect="dark" triped :key="tablekey" height="100%" :summary-method="getSumRight" :default-sort="{prop: 'id', order: 'ascending'}" :show-overflow-tooltip="true" :show-summary="true">
          <el-table-column fixed type="index" width="50">
          </el-table-column>
          <el-table-column fixed width="50">
            <template slot-scope="scope">
              <el-button class="tableItemBtn" size="mini" @click="addItem(scope.row, scope.$index)"></el-button>
            </template>
          </el-table-column>
          <template v-for="column in tableColumnLeft">
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
        <!-- <div class="accountsLoad_table_pager">
          <b>共计:{{ totalLeft }}</b>
          <div class="show_pager">
            <Pager :total="totalLeft" @change="handlePageChangeLeft" />
          </div>
        </div> -->
      </div>
      <!-- 右边表格区 -->
      <div slot="tableRight" class="tableHeadItemBtn">
        <el-button class="tableAllBtnMinus" size="mini" @click="minusAllList"></el-button>
        <el-table ref="multipleTableLeft" :data="rightTable" border @row-click="clickDetailsLeft" @selection-change="getSelectionLeft" tooltip-effect="dark" triped :key="tablekey" height="100%" :summary-method="getSumLeft" :default-sort="{prop: 'id', order: 'ascending'}" :show-summary='true' style="height:100%;">
          <el-table-column fixed type="index" width="50">
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
                  <el-input type="number" v-model.number="column.slot(scope)" :size="btnsize" @change="changLoadData(scope.$index)"></el-input>
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
</template>
<script>
import { mapGetters } from 'vuex'
import { postPayListBySummary } from '@/api/finance/accountsPayable'
import transferTable from '@/components/transferTable'
import { objectMerge2, parseTime } from '@/utils/index'
import querySelect from '@/components/querySelect/'
import Receipt from './components/receiptAll'
import Pager from '@/components/Pagination/index'
export default {
  data() {
    return {
      tablekey: '',
      loadTruck: '',
      truckMessage: '',
      formModel: {},
      loadTruck: 'loadTruckOne',
      loading: false,
      popVisibleDialog: false,
      btnsize: 'mini',
      // totalLeft: 0,
      // totalRight: 0,
      tableReceiptInfo: [],
      selectedRight: [],
      selectedLeft: [],
      isGoReceipt: true,
      leftTable: [],
      rightTable: [],
      orgData: {
        left: [],
        right: []
      },
      isFresh: false,
      feeType: 8,
      searchQuery: {
        currentPage: 1,
        pageSize: 100,
        vo: {}
      },
      sign: 1, // 1-发车汇总
      tableColumnLeft: [{
          label: '发车批次',
          prop: 'batchNo',
          width: '120',
          fixed: true
        },
        {
          label: '批次状态',
          prop: 'batchTypeName',
          width: '120',
          fixed: false
        },
        {
          label: '发车网点',
          prop: 'orgName',
          width: '120',
          fixed: false
        },
        {
          label: '达到网点',
          prop: 'arriveOrgName',
          width: '120',
          fixed: false
        },
        {
          label: '发车时间',
          prop: 'departureTime',
          width: '180',
          fixed: false,
          slot: (scope) => {
            return `${parseTime(scope.row.departureTime, '{y}-{m}-{d} {h}:{i}:{s}')}`
          }
        },
        {
          label: '到达时间',
          prop: 'receivingTime',
          width: '180',
          fixed: false,
          slot: (scope) => {
            return `${parseTime(scope.row.receivingTime, '{y}-{m}-{d} {h}:{i}:{s}')}`
          }
        },
        {
          label: '现付运费',
          prop: 'nowpayCarriage',
          width: '150',
          fixed: false
        },
        {
          label: '已结现付运费',
          prop: 'paidNowpayCarriage',
          width: '180',
          fixed: false
        },
        {
          label: '未结现付运费',
          prop: 'unpaidNowpayCarriage',
          width: '150',
          fixed: false
        },
        {
          label: '现付油卡',
          prop: 'nowpayOilCard',
          width: '150',
          fixed: false
        },
        {
          label: '已结现付油卡',
          prop: 'paidNowpayOilCard',
          width: '180',
          fixed: false
        },
        {
          label: '未结现付油卡',
          prop: 'unpaidNowpayOilCard',
          width: '150',
          fixed: false
        },
        {
          label: '回付运费',
          prop: 'backpayCarriage',
          width: '150',
          fixed: false
        },
        {
          label: '已结回付运费',
          prop: 'paidBackpayCarriage',
          width: '180',
          fixed: false
        },
        {
          label: '未结回付运费',
          prop: 'unpaidBackpayCarriage',
          width: '150',
          fixed: false
        },
        {
          label: '回付油卡',
          prop: 'backpayOilCard',
          width: '150',
          fixed: false
        },
        {
          label: '已结回付油卡',
          prop: 'paidBackpayOilCard',
          width: '180',
          fixed: false
        },
        {
          label: '未结回付油卡',
          prop: 'unpaidBackpayOilCard',
          width: '150',
          fixed: false
        },
        {
          label: '整车保险费',
          prop: 'carloadInsuranceFee',
          width: '150',
          fixed: false
        },
        {
          label: '已结整车保险费',
          prop: 'paidCarloadInsuranceFee',
          width: '180',
          fixed: false
        },
        {
          label: '未结整车保险费',
          prop: 'unpaidCarloadInsuranceFee',
          width: '150',
          fixed: false
        },
        {
          label: '发站装卸费',
          prop: 'leaveHandlingFee',
          width: '150',
          fixed: false
        },
        {
          label: '已结发站装卸费',
          prop: 'paidLeaveHandlingFee',
          width: '180',
          fixed: false
        },
        {
          label: '未结发站装卸费',
          prop: 'unpaidLeaveHandlingFee',
          width: '150',
          fixed: false
        },
        {
          label: '发站其他费',
          prop: 'leaveOtherFee',
          width: '150',
          fixed: false
        },
        {
          label: '已结发站其他费',
          prop: 'paidLeaveOtherFee',
          width: '180',
          fixed: false
        },
        {
          label: '未结发站其他费',
          prop: 'unpaidLeaveOtherFee',
          width: '150',
          fixed: false
        },
        {
          label: '司机电话',
          prop: 'dirverMobile',
          width: '120',
          fixed: false
        },
        {
          label: '车牌号',
          prop: 'truckIdNumber',
          width: '120',
          fixed: false
        },
        {
          label: '司机姓名',
          prop: 'dirverName',
          width: '120',
          fixed: false
        },

        {
          label: '配载件数',
          prop: 'loadAmountall',
          width: '120',
          fixed: false
        },
        {
          label: '配载重量',
          prop: 'loadWeightall',
          width: '120',
          fixed: false
        },
        {
          label: '配载体积',
          prop: 'loadVolumeall',
          width: '120',
          fixed: false
        },
        {
          label: '备注',
          prop: 'remark',
          width: '120',
          fixed: false
        }
      ],
      tableColumnRight: [{
          label: '发车批次',
          prop: 'batchNo',
          width: '120',
          fixed: true
        },
        {
          label: '批次状态',
          prop: 'batchTypeName',
          width: '120',
          fixed: false
        },
        {
          label: '发车网点',
          prop: 'orgName',
          width: '120',
          fixed: false
        },
        {
          label: '达到网点',
          prop: 'arriveOrgName',
          width: '120',
          fixed: false
        },
        {
          label: '发车时间',
          prop: 'departureTime',
          width: '180',
          fixed: false,
          slot: (scope) => {
            return `${parseTime(scope.row.departureTime, '{y}-{m}-{d} {h}:{i}:{s}')}`
          }
        },
        {
          label: '到达时间',
          prop: 'receivingTime',
          width: '180',
          fixed: false,
          slot: (scope) => {
            return `${parseTime(scope.row.receivingTime, '{y}-{m}-{d} {h}:{i}:{s}')}`
          }
        },
        {
          label: '现付运费',
          prop: 'nowpayCarriage',
          width: '150',
          fixed: false
        },
        {
          label: '已结现付运费',
          prop: 'paidNowpayCarriage',
          width: '180',
          fixed: false
        },
        {
          label: '未结现付运费',
          prop: 'unpaidNowpayCarriage',
          width: '150',
          fixed: false
        },
        {
          label: '实结现付运费',
          prop: 'amountCarriage',
          width: '120',
          fixed: false,
          expand: true,
          slot: (scope) => {
            return scope.row.amountCarriage
          }
        },
        {
          label: '现付油卡',
          prop: 'nowpayOilCard',
          width: '150',
          fixed: false
        },
        {
          label: '已结现付油卡',
          prop: 'paidNowpayOilCard',
          width: '180',
          fixed: false
        },
        {
          label: '未结现付油卡',
          prop: 'unpaidNowpayOilCard',
          width: '150',
          fixed: false
        },
        {
          label: '实结现付油卡',
          prop: 'amountOilCard',
          width: '120',
          fixed: false,
          expand: true,
          slot: (scope) => {
            return scope.row.amountOilCard
          }
        },
        {
          label: '回付运费',
          prop: 'backpayCarriage',
          width: '150',
          fixed: false
        },
        {
          label: '已结回付运费',
          prop: 'paidBackpayCarriage',
          width: '180',
          fixed: false
        },
        {
          label: '未结回付运费',
          prop: 'unpaidBackpayCarriage',
          width: '150',
          fixed: false
        },
        {
          label: '实结回付运费',
          prop: 'amountBackpayCarriage',
          width: '120',
          fixed: false,
          expand: true,
          slot: (scope) => {
            return scope.row.amountBackpayCarriage
          }
        },
        {
          label: '回付油卡',
          prop: 'backpayOilCard',
          width: '150',
          fixed: false
        },
        {
          label: '已结回付油卡',
          prop: 'paidBackpayOilCard',
          width: '180',
          fixed: false
        },
        {
          label: '未结回付油卡',
          prop: 'unpaidBackpayOilCard',
          width: '150',
          fixed: false
        },
        {
          label: '实结回付油卡',
          prop: 'amountBackpayOilCard',
          width: '120',
          fixed: false,
          expand: true,
          slot: (scope) => {
            return scope.row.amountBackpayOilCard
          }
        },
        {
          label: '整车保险费',
          prop: 'carloadInsuranceFee',
          width: '150',
          fixed: false
        },
        {
          label: '已结整车保险费',
          prop: 'paidCarloadInsuranceFee',
          width: '180',
          fixed: false
        },
        {
          label: '未结整车保险费',
          prop: 'unpaidCarloadInsuranceFee',
          width: '150',
          fixed: false
        },
        {
          label: '实结整车保险费',
          prop: 'amountInsurance',
          width: '120',
          fixed: false,
          expand: true,
          slot: (scope) => {
            return scope.row.amountInsurance
          }
        },
        {
          label: '发站装卸费',
          prop: 'leaveHandlingFee',
          width: '150',
          fixed: false
        },
        {
          label: '已结发站装卸费',
          prop: 'paidLeaveHandlingFee',
          width: '180',
          fixed: false
        },
        {
          label: '未结发站装卸费',
          prop: 'unpaidLeaveHandlingFee',
          width: '150',
          fixed: false
        },
        {
          label: '实结发站装卸费',
          prop: 'amountHandling',
          width: '120',
          fixed: false,
          expand: true,
          slot: (scope) => {
            return scope.row.amountHandling
          }
        },
        {
          label: '发站其他费',
          prop: 'leaveOtherFee',
          width: '150',
          fixed: false
        },
        {
          label: '已结发站其他费',
          prop: 'paidLeaveOtherFee',
          width: '180',
          fixed: false
        },
        {
          label: '未结发站其他费',
          prop: 'unpaidLeaveOtherFee',
          width: '150',
          fixed: false
        },
        {
          label: '实结发站其他费',
          prop: 'amountLeaveOtherFee',
          width: '120',
          fixed: false,
          expand: true,
          slot: (scope) => {
            return scope.row.amountLeaveOtherFee
          }
        },
        {
          label: '司机电话',
          prop: 'dirverMobile',
          width: '120',
          fixed: false
        },
        {
          label: '车牌号',
          prop: 'truckIdNumber',
          width: '120',
          fixed: false
        },
        {
          label: '司机姓名',
          prop: 'dirverName',
          width: '120',
          fixed: false
        },

        {
          label: '配载件数',
          prop: 'loadAmountall',
          width: '120',
          fixed: false
        },
        {
          label: '配载重量',
          prop: 'loadWeightall',
          width: '120',
          fixed: false
        },
        {
          label: '配载体积',
          prop: 'loadVolumeall',
          width: '120',
          fixed: false
        },
        {
          label: '备注',
          prop: 'remark',
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
      return this.$route.query.searchQuery
    },
    totalLeft() {
      return this.leftTable.length
    },
    totalRight() {
      return this.rightTable.length
    }
  },
  components: {
    transferTable,
    querySelect,
    Receipt,
    Pager
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
        this.eventBus.$emit('replaceCurrentView', '/finance/accountsPayable/batch')
        // this.$router.push({ path: './accountsPayable/batch' })
        this.isFresh = true
      } else {
        this.$set(this.searchQuery.vo, 'orgid', this.getRouteInfo.vo.orgid)
        this.$set(this.searchQuery.vo, 'ascriptionOrgid', this.getRouteInfo.vo.ascriptionOrgid)
        this.$set(this.searchQuery.vo, 'sign', this.sign)
        this.$set(this.searchQuery.vo, 'status', 'NOSETTLEMENT,PARTSETTLEMENT')
        this.isFresh = false
      }
    },
    getList() {
      let selectListBatchNos = objectMerge2([], this.$route.query.selectListBatchNos)
      if (this.$route.query.selectListBatchNos) {
        this.isModify = true
      } else {
        this.isModify = false
      }
      this.leftTable = this.$options.data().leftTable
      this.rightTable = this.$options.data().rightTable
      this.tableReceiptInfo = this.$options.data().tableReceiptInfo

      this.initLeftParams() // 设置searchQuery
      if (!this.isFresh) {
        postPayListBySummary(this.searchQuery).then(data => {
          this.leftTable = Object.assign([], data.list)
          selectListBatchNos.forEach(e => {
            this.leftTable.forEach(item => {
              if (e === item.batchNo) {
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
            let item = this.leftTable.indexOf(e)
            if (item !== -1) {
              this.leftTable.splice(item, 1)
            }
            // 默认设置实结数量
            e.amountCarriage = e.unpaidNowpayCarriage // 实结现付运费
            e.amountOilCard = e.unpaidNowpayOilCard // 实结现付油卡
            e.amountBackpayCarriage = e.unpaidBackpayCarriage // 实结回付运费
            e.amountBackpayOilCard = e.unpaidBackpayOilCard // 实结回付油卡
            e.amountInsurance = e.unpaidCarloadInsuranceFee // 实结整车保险费
            e.amountHandling = e.unpaidLeaveHandlingFee // 实结发站装卸费
            e.amountLeaveOtherFee = e.unpaidLeaveOtherFee // 实结发站其他费
          })
        })

      }
    },
    changLoadData(newVal) {
      if (this.rightTable[newVal].amountCarriage > this.rightTable[newVal].unpaidNowpayCarriage || this.rightTable[newVal].amountCarriage < 0 || this.rightTable[newVal].amountOilCard > this.rightTable[newVal].unpaidNowpayOilCard || this.rightTable[newVal].amountOilCard < 0 || this.rightTable[newVal].amountBackpayCarriage > this.rightTable[newVal].unpaidBackpayCarriage || this.rightTable[newVal].amountBackpayCarriage < 0 || this.rightTable[newVal].amountBackpayOilCard > this.rightTable[newVal].unpaidBackpayOilCard || this.rightTable[newVal].amountBackpayOilCard < 0 || this.rightTable[newVal].amountInsurance > this.rightTable[newVal].unpaidCarloadInsuranceFee || this.rightTable[newVal].amountInsurance < 0 || this.rightTable[newVal].amountHandling > this.rightTable[newVal].unpaidLeaveHandlingFee || this.rightTable[newVal].amountHandling < 0 || this.rightTable[newVal].amountLeaveOtherFee > this.rightTable[newVal].unpaidLeaveOtherFee || this.rightTable[newVal].amountLeaveOtherFee < 0) {
        this.$notify({
          title: '提示',
          message: '不能大于未结小于0',
          type: 'warning'
        })
        this.rightTable[newVal].amountCarriage = this.rightTable[newVal].unpaidNowpayCarriage // 实结现付运费
        this.rightTable[newVal].amountOilCard = this.rightTable[newVal].unpaidNowpayOilCard // 实结现付油卡
        this.rightTable[newVal].amountBackpayCarriage = this.rightTable[newVal].unpaidBackpayCarriage // 实结回付运费
        this.rightTable[newVal].amountBackpayOilCard = this.rightTable[newVal].unpaidBackpayOilCard // 实结回付油卡
        this.rightTable[newVal].amountInsurance = this.rightTable[newVal].unpaidCarloadInsuranceFee // 实结整车保险费
        this.rightTable[newVal].amountHandling = this.rightTable[newVal].unpaidLeaveHandlingFee // 实结发站装卸费
        this.rightTable[newVal].amountLeaveOtherFee = this.rightTable[newVal].unpaidLeaveOtherFee // 实结发站其他费
      }
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
          e.amountCarriage = e.unpaidNowpayCarriage // 实结现付运费
          e.amountOilCard = e.unpaidNowpayOilCard // 实结现付油卡
          e.amountBackpayCarriage = e.unpaidBackpayCarriage // 实结回付运费
          e.amountBackpayOilCard = e.unpaidBackpayOilCard // 实结回付油卡
          e.amountInsurance = e.unpaidCarloadInsuranceFee // 实结整车保险费
          e.amountHandling = e.unpaidLeaveHandlingFee // 实结发站装卸费
          e.amountLeaveOtherFee = e.unpaidLeaveOtherFee // 实结发站其他费

          this.rightTable.push(e)
          let item = this.leftTable.indexOf(e)
          if (item !== -1) { // 源数据减去被穿梭的数据
            this.leftTable.splice(item, 1)
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
          this.leftTable.push(e)
          let item = this.rightTable.indexOf(e)
          if (item !== -1) {
            // 源数据减去被穿梭的数据
            this.rightTable.splice(item, 1)
          }
        })
        this.selectedLeft = [] // 清空选择列表
      }
      if (this.rightTable.length < 1) {
        this.isGoReceipt = true
      } else {
        this.isGoReceipt = false
      }

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
    searchShip(obj) {
      console.log('searchShip', obj)
    },
    closeDialog() {
      this.popVisibleDialog = false
    },
    openDialog() {
      this.popVisibleDialog = true
    },
    goReceipt() {
      this.tableReceiptInfo = this.$options.data().tableReceiptInfo
      if (!this.isGoReceipt) {
        this.rightTable.forEach((e, index) => {
          let itemCarriage = { id: e.id, amount: e.amountCarriage, feeTypeId: 19, dataName: '现付运费' } // 实结现付运费
          let itemOilCard = { id: e.id, amount: e.amountOilCard, feeTypeId: 20, dataName: '现付油卡' } // 实结现付油卡
          let itemBackpayCarriage = { id: e.id, amount: e.amountBackpayCarriage, feeTypeId: 21, dataName: '回付运费' } // 实结回付运费
          let itemBackpayOilCard = { id: e.id, amount: e.amountBackpayOilCard, feeTypeId: 22, dataName: '回付油卡' } // 实结回付油卡
          let itemInsurance = { id: e.id, amount: e.amountInsurance, feeTypeId: 25, dataName: '整车保险费' } // 实结整车保险费
          let itemHandling = { id: e.id, amount: e.amountHandling, feeTypeId: 26, dataName: '发站装卸费' } // 实结发站装卸费
          let itemLeaveOtherFee = { id: e.id, amount: e.amountLeaveOtherFee, feeTypeId: 27, dataName: '发站其他费' } // 实结发站其他费

          if (itemCarriage.amount !== 0) {
            this.tableReceiptInfo.push(itemCarriage)
          }
          if (itemOilCard.amount !== 0) {
            this.tableReceiptInfo.push(itemOilCard)
          }
          if (itemBackpayCarriage.amount !== 0) {
            this.tableReceiptInfo.push(itemBackpayCarriage)
          }
          if (itemBackpayOilCard.amount !== 0) {
            this.tableReceiptInfo.push(itemBackpayOilCard)
          }
          if (itemInsurance.amount !== 0) {
            this.tableReceiptInfo.push(itemInsurance)
          }
          if (itemHandling.amount !== 0) {
            this.tableReceiptInfo.push(itemHandling)
          }
          if (itemLeaveOtherFee.amount !== 0) {
            this.tableReceiptInfo.push(itemLeaveOtherFee)
          }
          itemCarriage = {}
          itemOilCard = {}
          itemBackpayCarriage = {}
          itemBackpayOilCard = {}
          itemInsurance = {}
          itemHandling = {}
          itemLeaveOtherFee = {}
        })
        this.openDialog()
      }
    },
    getSumRight(param) { // 右边表格合计-自定义显示
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总计'
          return
        }
        if (index === 1) {
          sums[index] = '操作'
          return
        }
        if (index === 2) {
          sums[index] = data.length + '单'
          return
        }
        if (index === 3 || index === 4 || index === 5 || index === 6 || index === 7 || index === 8 || index === 9 || index === 10 || index === 11 || index === 18) {
          sums[index] = ''
          return
        }
        const values = data.map(item => Number(item[column.property]))
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
          sums[index] += ''
        } else {
          sums[index] = 'N/A'
        }
      })
      return sums
    },
    getSumLeft(param) { // 左边表格合计-自定义显示
      const { columns, data } = param
      const sums = []
      let strNull = [12, 13, 14, 15, 16, 17, 18, 19, 20]
      columns.forEach((column, index) => {

        if (index === 0) {
          sums[index] = '总计'
          return
        }
        if (index === 1) {
          sums[index] = '操作'
          return
        }
        if (index === 2 || index === 3) {
          sums[index] = data.length + '单'
          return
        }
        if (index === 12 || index === 13 || index === 14 || index === 15 || index === 16 || index === 17 || index === 18 || index === 19 || index === 20) {
          sums[index] = ''
          return
        }
        const values = data.map(item => Number(item[column.property]))
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
          sums[index] += ''
        } else {
          sums[index] = 'N/A'
        }
      })
      return sums
    }
  }
}

</script>
