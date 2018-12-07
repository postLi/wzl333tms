<template>
  <transferTable v-loading="loading">
    <div slot="tableSearch" class="tableHeadItemForm clearfix">
      <!-- 搜索左边表格 -->
      <currentSearch :info="countOrgLeftTable" @change="getSearch"></currentSearch>
    </div>
    <!-- 左边表格区  运单支出-->
    <div style="height:100%;" slot="tableLeft" class="tableHeadItemBtn">
      <el-button class="tableAllBtn" size="mini" @click="addALLList"></el-button>
      <el-table ref="multipleTableRight" :data="leftTable" border @row-click="clickDetailsRight" @selection-change="getSelectionRight" tooltip-effect="dark" triped :key="tablekey" height="100%" :summary-method="getSumRight" :default-sort="{prop: 'id', order: 'ascending'}" :show-overflow-tooltip="true" :show-summary="true" @row-dblclick="dclickAddItem">
        <el-table-column fixed width="50" type="index" label="序号">
          <template slot-scope="scope">
            {{scope.$index + 1}}
          </template>
        </el-table-column>
        <el-table-column fixed width="50">
          <template slot-scope="scope">
            <el-button class="tableItemBtn" size="mini" @click="addItem(scope.row, scope.$index)"></el-button>
          </template>
        </el-table-column>
        <el-table-column prop="shipSn" label="运单号" fixed width="130">
        </el-table-column>
        <el-table-column prop="shipGoodsSn" sortable label="货号" width="150">
        </el-table-column>
        <el-table-column prop="shipFeeTotalActual" sortable label="实际合计" width="150">
        </el-table-column>
        <el-table-column prop="shipFeeTotal" sortable label="运费合计" width="120">
        </el-table-column>
        <el-table-column prop="noShipFeeTotal" sortable label="未核销运费合计" width="120">
          <template slot-scope="scope">
            <span v-html="_setTextColor(scope.row.shipFeeTotal, scope.row.hadShipFeeTotal, scope.row.noShipFeeTotal, scope.row.noShipFeeTotal)"></span>
          </template>
        </el-table-column>
        <el-table-column prop="hadShipFeeTotal" sortable label="已核销运费合计" width="120">
          <template slot-scope="scope">
            <span v-html="_setTextColor(scope.row.shipFeeTotal, scope.row.hadShipFeeTotal, scope.row.noShipFeeTotal, scope.row.hadShipFeeTotal)"></span>
          </template>
        </el-table-column>
        <el-table-column prop="onPay" sortable label="现付" width="90">
        </el-table-column>
        <el-table-column prop="noOnPay" sortable label="未核销现付" width="90">
          <template slot-scope="scope">
            <span v-html="_setTextColor(scope.row.onPay, scope.row.hadOnPay, scope.row.noOnPay, scope.row.noOnPay)"></span>
          </template>
        </el-table-column>
        <el-table-column prop="hadOnPay" sortable label="已核销现付" width="90">
          <template slot-scope="scope">
            <span v-html="_setTextColor(scope.row.onPay, scope.row.hadOnPay, scope.row.noOnPay, scope.row.hadOnPay)"></span>
          </template>
        </el-table-column>
        <el-table-column prop="arrivalPay" sortable label="到付" width="90">
        </el-table-column>
        <el-table-column prop="noArrivalPay" sortable label="未核销到付" width="90">
          <template slot-scope="scope">
            <span v-html="_setTextColor(scope.row.arrivalPay, scope.row.hadArrivalPay, scope.row.noArrivalPay, scope.row.noArrivalPay)"></span>
          </template>
        </el-table-column>
        <el-table-column prop="hadArrivalPay" sortable label="已核销到付" width="90">
          <template slot-scope="scope">
            <span v-html="_setTextColor(scope.row.arrivalPay, scope.row.hadArrivalPay, scope.row.noArrivalPay, scope.row.hadArrivalPay)"></span>
          </template>
        </el-table-column>
        <el-table-column prop="backPay" sortable label="回单付" width="90">
        </el-table-column>
        <el-table-column prop="noBackPay" sortable label="未核销回单付" width="100">
          <template slot-scope="scope">
            <span v-html="_setTextColor(scope.row.backPay, scope.row.hadBackPay, scope.row.noBackPay, scope.row.noBackPay)"></span>
          </template>
        </el-table-column>
        <el-table-column prop="hadBackPay" sortable label="已核销回单付" width="100">
          <template slot-scope="scope">
            <span v-html="_setTextColor(scope.row.backPay, scope.row.hadBackPay, scope.row.noBackPay, scope.row.hadBackPay)"></span>
          </template>
        </el-table-column>
        <el-table-column prop="monthPay" sortable label="月结" width="90">
        </el-table-column>
        <el-table-column prop="noMonthPay" sortable label="未核销月结" width="90">
          <template slot-scope="scope">
            <span v-html="_setTextColor(scope.row.monthPay, scope.row.hadMonthPay, scope.row.noMonthPay, scope.row.noMonthPay)"></span>
          </template>
        </el-table-column>
        <el-table-column prop="hadMonthPay" sortable label="已核销月结" width="90">
          <template slot-scope="scope">
            <span v-html="_setTextColor(scope.row.monthPay, scope.row.hadMonthPay, scope.row.noMonthPay, scope.row.hadMonthPay)"></span>
          </template>
        </el-table-column>
        <el-table-column prop="unusualPay" sortable label="异动费用" width="90">
        </el-table-column>
        <el-table-column prop="noUnusualPay" sortable label="未核销异动费用" width="110">
          <template slot-scope="scope">
            <span v-html="_setTextColor(scope.row.unusualPay, scope.row.hadUnusualPay, scope.row.noUnusualPay, scope.row.noUnusualPay)"></span>
          </template>
        </el-table-column>
        <el-table-column prop="hadUnusualPay" sortable label="已核销异动费用" width="110">
          <template slot-scope="scope">
            <span v-html="_setTextColor(scope.row.unusualPay, scope.row.hadUnusualPay, scope.row.noUnusualPay, scope.row.hadUnusualPay)"></span>
          </template>
        </el-table-column>
        <el-table-column prop="shipFromCityName" sortable label="出发城市" width="120">
          <template slot-scope="scope">
            {{ _processTableSlot(scope, 'shipFromCityName')}}
          </template>
        </el-table-column>
        <el-table-column prop="shipToCityName" sortable label="到达城市" width="120">
          <template slot-scope="scope">
            {{ _processTableSlot(scope, 'shipToCityName')}}
          </template>
        </el-table-column>
        <el-table-column prop="cargoName" sortable label="货品名" width="120">
        </el-table-column>
        <el-table-column prop="cargoAmount" sortable label="件数" width="120">
        </el-table-column>
        <el-table-column prop="cargoWeight" sortable label="重量" width="120">
        </el-table-column>
        <el-table-column prop="cargoVolume" sortable label="体积" width="120">
        </el-table-column>
        <el-table-column prop="shipSenderUnit" sortable label="发货方" width="120">
        </el-table-column>
        <el-table-column prop="shipSenderName" sortable label="发货人" width="120">
        </el-table-column>
        <el-table-column prop="shipRemarks" sortable label="运单备注" width="120">
        </el-table-column>
      </el-table>
    </div>
    <!-- 右边表格区 -->
    <div slot="tableRight" class="tableHeadItemBtn">
      <el-button class="tableAllBtnMinus" size="mini" @click="minusAllList"></el-button>
      <el-table ref="multipleTableLeft" :data="rightTable" @row-dblclick="dclickMinusItem" border @row-click="clickDetailsLeft" @selection-change="getSelectionLeft" tooltip-effect="dark" triped :key="tablekey" height="100%" :summary-method="getSumLeft" :default-sort="{prop: 'id', order: 'ascending'}" :show-summary='true' style="height:100%;">
        <el-table-column fixed width="50" type="index" label="序号">
          <template slot-scope="scope">
            {{scope.$index + 1}}
          </template>
        </el-table-column>
        <el-table-column fixed width="50">
          <template slot-scope="scope">
            <el-button class="tableItemBtnMinus" size="mini" @click="minusItem(scope.row, scope.$index)"></el-button>
          </template>
        </el-table-column>
        <el-table-column prop="shipSn" label="运单号" fixed width="130">
        </el-table-column>
        <el-table-column prop="shipGoodsSn" sortable label="货号" width="150">
        </el-table-column>
        <el-table-column prop="shipFeeTotalActual" sortable label="实际合计" width="150">
        </el-table-column>
        <el-table-column prop="shipFeeTotal" sortable label="运费合计" width="120">
        </el-table-column>
        <el-table-column prop="noShipFeeTotal" sortable label="未核销运费合计" width="120">
          <template slot-scope="scope">
            <span v-html="_setTextColor(scope.row.shipFeeTotal, scope.row.hadShipFeeTotal, scope.row.noShipFeeTotal, scope.row.noShipFeeTotal)"></span>
          </template>
        </el-table-column>
        <el-table-column prop="hadShipFeeTotal" sortable label="已核销运费合计" width="120">
          <template slot-scope="scope">
            <span v-html="_setTextColor(scope.row.shipFeeTotal, scope.row.hadShipFeeTotal, scope.row.noShipFeeTotal, scope.row.hadShipFeeTotal)"></span>
          </template>
        </el-table-column>
        <el-table-column prop="shipFeeTotalActual" sortable label="实际运费合计" width="120">
        </el-table-column>
        <el-table-column prop="onPay" sortable label="现付" width="90">
        </el-table-column>
        <el-table-column prop="noOnPay" sortable label="未核销现付" width="90">
          <template slot-scope="scope">
            <span v-html="_setTextColor(scope.row.onPay, scope.row.hadOnPay, scope.row.noOnPay, scope.row.noOnPay)"></span>
          </template>
        </el-table-column>
        <el-table-column prop="hadOnPay" sortable label="已核销现付" width="90">
          <template slot-scope="scope">
            <span v-html="_setTextColor(scope.row.onPay, scope.row.hadOnPay, scope.row.noOnPay, scope.row.hadOnPay)"></span>
          </template>
        </el-table-column>
        <el-table-column prop="onPayActual" sortable label="实际核销现付" width="90">
        </el-table-column>
        <el-table-column prop="arrivalPay" sortable label="到付" width="90">
        </el-table-column>
        <el-table-column prop="noArrivalPay" sortable label="未核销到付" width="90">
          <template slot-scope="scope">
            <span v-html="_setTextColor(scope.row.arrivalPay, scope.row.hadArrivalPay, scope.row.noArrivalPay, scope.row.noArrivalPay)"></span>
          </template>
        </el-table-column>
        <el-table-column prop="hadArrivalPay" sortable label="已核销到付" width="90">
          <template slot-scope="scope">
            <span v-html="_setTextColor(scope.row.arrivalPay, scope.row.hadArrivalPay, scope.row.noArrivalPay, scope.row.hadArrivalPay)"></span>
          </template>
        </el-table-column>
        <el-table-column prop="arrivalPayActual" sortable label="实际核销到付" width="90">
        </el-table-column>
        <el-table-column prop="backPay" sortable label="回单付" width="90">
        </el-table-column>
        <el-table-column prop="noBackPay" sortable label="未核销回单付" width="100">
          <template slot-scope="scope">
            <span v-html="_setTextColor(scope.row.backPay, scope.row.hadBackPay, scope.row.noBackPay, scope.row.noBackPay)"></span>
          </template>
        </el-table-column>
        <el-table-column prop="hadBackPay" sortable label="已核销回单付" width="100">
          <template slot-scope="scope">
            <span v-html="_setTextColor(scope.row.backPay, scope.row.hadBackPay, scope.row.noBackPay, scope.row.hadBackPay)"></span>
          </template>
        </el-table-column>
         <el-table-column prop="backPayActual" sortable label="实际核销回单付" width="100">
        </el-table-column>
        <el-table-column prop="monthPay" sortable label="月结" width="90">
        </el-table-column>
        <el-table-column prop="noMonthPay" sortable label="未核销月结" width="90">
          <template slot-scope="scope">
            <span v-html="_setTextColor(scope.row.monthPay, scope.row.hadMonthPay, scope.row.noMonthPay, scope.row.noMonthPay)"></span>
          </template>
        </el-table-column>
        <el-table-column prop="hadMonthPay" sortable label="已核销月结" width="90">
          <template slot-scope="scope">
            <span v-html="_setTextColor(scope.row.monthPay, scope.row.hadMonthPay, scope.row.noMonthPay, scope.row.hadMonthPay)"></span>
          </template>
        </el-table-column>
        <el-table-column prop="monthPayActual" sortable label="实际核销月结" width="90">
        </el-table-column>
        <el-table-column prop="unusualPay" sortable label="异动费用" width="90">
        </el-table-column>
        <el-table-column prop="noUnusualPay" sortable label="未核销异动费用" width="110">
          <template slot-scope="scope">
            <span v-html="_setTextColor(scope.row.unusualPay, scope.row.hadUnusualPay, scope.row.noUnusualPay, scope.row.noUnusualPay)"></span>
          </template>
        </el-table-column>
        <el-table-column prop="hadUnusualPay" sortable label="已核销异动费用" width="110">
          <template slot-scope="scope">
            <span v-html="_setTextColor(scope.row.unusualPay, scope.row.hadUnusualPay, scope.row.noUnusualPay, scope.row.hadUnusualPay)"></span>
          </template>
        </el-table-column>
         <el-table-column prop="unusualPayActual" sortable label="实际核销异动费用" width="110">
        </el-table-column>
        <el-table-column prop="shipFromCityName" sortable label="出发城市" width="120">
          <template slot-scope="scope">
            {{ _processTableSlot(scope, 'shipFromCityName')}}
          </template>
        </el-table-column>
        <el-table-column prop="shipToCityName" sortable label="到达城市" width="120">
          <template slot-scope="scope">
            {{ _processTableSlot(scope, 'shipToCityName')}}
          </template>
        </el-table-column>
        <el-table-column prop="cargoName" sortable label="货品名" width="120">
        </el-table-column>
        <el-table-column prop="cargoAmount" sortable label="件数" width="120">
        </el-table-column>
        <el-table-column prop="cargoWeight" sortable label="重量" width="120">
        </el-table-column>
        <el-table-column prop="cargoVolume" sortable label="体积" width="120">
        </el-table-column>
        <el-table-column prop="shipSenderUnit" sortable label="发货方" width="120">
        </el-table-column>
        <el-table-column prop="shipSenderName" sortable label="发货人" width="120">
        </el-table-column>
        <el-table-column prop="shipRemarks" sortable label="运单备注" width="120">
        </el-table-column>
      </el-table>
    </div>
  </transferTable>
</template>
<script>
import { mapGetters } from 'vuex'
import { getSelectAddLoadRepertoryList } from '@/api/operation/load'
import querySelect from '@/components/querySelect/index'
import transferTable from '@/components/transferTable'
import { objectMerge2, parseTime } from '@/utils/index'
import { getOrderList } from '@/api/finance/financeDaily'
import currentSearch from './currentSearchOrder'
import { getSummaries, tmsMath } from '@/utils/'
export default {
  data() {
    return {
      loading: true,
      searchTime: [parseTime(new Date() - 60 * 24 * 60 * 60 * 1000), parseTime(new Date())],
      tablekey: '',
      truckMessage: '',
      searchForm: {},
      incomePayType: 'PAYABLE', // RECEIVABLE-运单收入费用项 PAYABLE-运单支出费用项
      paymentsType: 0, // 收支类型, 0 收入, 1 支出
      settlementId: 178, // 178-运单核销 179-干线批次核销 180-短驳核销 181-送货核销
      loading: false,
      btnsize: 'mini',
      selectedRight: [],
      selectedLeft: [],
      orgLeftTable: [],
      countOrgLeftTable: [],
      leftTable: [],
      rightTable: [],
      orgData: {
        left: [],
        right: []
      },
      arrLastPartActualFeeName: [],
      arrLastPartNoFeeName: [],
      arrLastPartFeeName: [], // 左边添加一条数据的所有部分核销的费用字段名
      arrNoPayName: [],
      arrPayName: [],
      arrPayNameActual: []
    }
  },
  props: {
    setLoadTable: {
      type: Object,
      default: () => {}
    },
    isModify: {
      type: Boolean,
      default: false
    },
    countSuccessList: {
      type: Array,
      default: []
    },
    countNum: {
      type: [Number, String]
    },
    activeName: {
      type: String,
      default: ''
    },
    orgId: {
      type: [Number, String]
    },
    componentKey: {
      type: [Number, String]
    },
    fiOrderType: {
      type: [Number, String]
    }
  },
  computed: {
    ...mapGetters([
      'otherinfo'
    ])
  },
  components: {
    transferTable,
    querySelect,
    currentSearch
  },
  watch: {
    isModify: {
      handler(cval, oval) { // 深度监听
        this.getList()
      },
      deep: true
    },
    setLoadTable: { // 深度监听数组变换
      handler(cval, oval) {
        if (cval) {
          this.orgData = Object.assign({}, cval)
          this.getList()
        }
      },
      deep: true
    },
    countSuccessList: {
      handler(cval, oval) {
        this.initCount(cval, oval) // 智能核销返回的数据
      },
      deep: true
    },
    countNum: {
      handler(cval, oval) {
        return cval
      },
      deep: true
    },
    activeName: {
      handler(cval, oval) {
        if (cval === 'second') {
          this.getList()
        }
      },
      deep: true
    },
    fiOrderType: {
      handler(cval, oval) {

      },
      deep: true
    }
  },
  activated() {
    this.getPayName()
    this.getList()
  },
  methods: {
    getPayName() {
      if (this.rightTable.length !== 0) {
        this.arrNoPayName = [] // 未核销费用项字段名
        for (const item in this.rightTable[0]) {
          if (item.indexOf('no') === 0) { // 获取开头为no的字符串字段名
            this.arrNoPayName.push(item)
          }
        }
        // console.log('=====未核销费用项字段名', this.arrNoPayName)

        this.arrPayName = [] // 费用项字段名
        for (const item in this.arrNoPayName) {
          const str = this.arrNoPayName[item].substring(2, 3).toLowerCase() + this.arrNoPayName[item].substring(3) // 截取no后面的字符串，并将首字母大写转成小写
          this.arrPayName.push(str)
        }
        // console.log('=====费用项字段名', this.arrPayName)

        this.arrhadPayName = [] // 已核销费用项字段名
        for (const item in this.arrNoPayName) {
          const str = 'had' + this.arrNoPayName[item].substring(2) // 截取no后面的字符串，并在前面拼接had
          this.arrhadPayName.push(str)
        }
        // console.log('=====已核销费用项字段名', this.arrhadPayName)

        this.arrPayNameActual = [] // 费用实际支出项字段名
        for (const item in this.arrPayName) {
          const str = this.arrPayName[item] + 'Actual'
          this.arrPayNameActual.push(str)
        }
        // console.log('=====费用实际支出项字段名', this.arrPayNameActual)
        const obj = {
          arrPayName: this.arrPayName,
          arrNoPayName: this.arrNoPayName,
          arrhadPayName: this.arrhadPayName,
          arrPayNameActual: this.arrPayNameActual
        }
        this.$emit('feeName', obj)
      }
    },
    initCount(cval, oval) { // 对智能核销进行操作
      console.log('============后台返回的智能运单=============\n', cval)
      this.arrLastPartActualFeeName = []
      this.arrLastPartNoFeeName = []
      this.arrLastPartFeeName = []
      this.leftTable = []
      this.rightTable = objectMerge2([], cval) // 被智能挑选到的数据 右边表格
      this.$emit('loadTable', this.rightTable)
      if (this.rightTable.length === 0) {
        this.$message({ type: 'warning', message: '无符合智能核销条件的运单。' })
        this.leftTable = objectMerge2([], this.orgLeftTable)
        return false
      }

      this.leftTable = objectMerge2([], this.orgLeftTable).filter((el, index) => { // 左边表格显示的数据
        return this.rightTable.findIndex(e => {
          return el.shipSn === e.shipSn
        }) === -1
      })
      if (this.leftTable.length !== 0) {
        this.leftTable = this.uniqueArray(this.leftTable, 'shipSn') // 去重
      }

      this.$emit('loadTable', this.rightTable)
      this.getPayName()
      // // 判断右边表格的数据 合计是否为智能核销中输入的值
      const listCount = 0
      const countDifference = 0

      // 判断返回的数据 实际核销支出费用等于 未核销费用
      // 前者等于 | 小于后者 不用进行操作
      // 前者大于否则 的时候 左边要添加右边的最后一条数据并且显示核销多余的数

      const nameFlag = '' // 右边最后一条的批次号或者运单号
      let isCopyLastData = false // 左边是否需要复制一条右边最后那条数据  true-要复制 false-不复制
      this.arrPayNameActual.forEach((el, actIndex) => {
        const feeActual = this.rightTable[this.rightTable.length - 1][el] // 实际费用
        const feeNo = this.rightTable[this.rightTable.length - 1][this.arrNoPayName[actIndex]] // 未核销费用

        if (feeNo !== feeActual && feeNo !== '' && feeNo !== null && feeActual !== '' && feeActual !== null && typeof feeNo === typeof feeActual) { // 判断实际费用是否等于未核销费用
          // this.$message({ type: 'warning', message: '最后一条数据实际只需支付部分未核销费用，多余的需要返回到左边列表！' })
          isCopyLastData = true
          this.arrLastPartFeeName.push(this.arrPayName[actIndex]) // 保存部分核销的字段，以便左边添加数据
          this.arrLastPartActualFeeName.push(el)
          this.arrLastPartNoFeeName.push(this.arrNoPayName[actIndex])
        }
      })

      if (this.rightTable[this.rightTable.length - 1].shipFeeTotal !== this.rightTable[this.rightTable.length - 1].shipFeeTotalActual) {
        isCopyLastData = true
      } else {
        isCopyLastData = false
      }

      if (isCopyLastData) { // true-给左边添加一条数据，并修改相关未核销费用
        this.$notify.info({ title: '提示', message: '最后一条数据实际只需支付部分未核销费用，多余的需要返回到左边列表！' })
        this.leftTable.push(objectMerge2([], this.rightTable[this.rightTable.length - 1]))
        this.arrLastPartFeeName.forEach(e => { // 左边最后一条 未核销=未核销-实际
          const noFeeName = 'no' + e.substring(0, 1).toUpperCase() + e.substring(1) // 未核销费用名
          const feeNameActual = e + 'Actual' // 实际费用名
          this.leftTable[this.leftTable.length - 1][feeNameActual] = this.rightTable[this.rightTable.length - 1][noFeeName] - this.rightTable[this.rightTable.length - 1][feeNameActual]
        })
      }

      this.$emit('loadTable', this.rightTable)
      this.countOrgLeftTable = objectMerge2([], this.leftTable)
    },
    getList() {
      this.leftTable = this.$options.data().leftTable
      this.rightTable = this.$options.data().rightTable
      this.orgLeftTable = this.$options.data().orgLeftTable
      this.countOrgLeftTable = this.$options.data().countOrgLeftTable
      let obj = {}
      if (this.isModify) {
        this.leftTable = this.orgData.left
        this.rightTable = this.orgData.right
        this.orgLeftTable = this.orgData.left
        this.countOrgLeftTable = this.orgData.left
        this.$emit('loadTable', this.rightTable)
      } else {
        this.$set(obj, 'orgId', this.orgId)
        // this.$set(obj, 'incomePayType', this.incomePayType)
        this.$set(obj, 'paymentsType', this.paymentsType)
        this.$set(obj, 'settlementId', this.settlementId)
        this.$set(obj, 'startTime', parseTime(this.searchTime[0], '{y}-{m}-{d} ') + '00:00:00')
        this.$set(obj, 'endTime', parseTime(this.searchTime[1], '{y}-{m}-{d} ') + '23:59:59')
        this.$set(obj, 'autoTotalAmount', '')
        this.$set(obj, 'feeId', '')
        this.$set(obj, 'fiOrderType', this.fiOrderType) // 财务订单类型 0-运单；1-干线；2-短驳；3-送货
        getOrderList(obj).then(data => {
          this.loading = false
          this.leftTable = data
          this.orgLeftTable = data
          this.countOrgLeftTable = data
          this.$emit('loadTable', this.rightTable)
        }).catch((err) => {
          this.loading = false
          this._handlerCatchMsg(err)
        })
        obj = {}
      }
    },
    getSearch(obj) { // 搜索
      this.leftTable = obj
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
    uniqueArray(array, key, fee) { // 去重算法 fee-需要合并值的字段 key-合并判断标识 array-数据列
      const result = [array[0]]
      for (let i = 1; i < array.length; i++) {
        const item = array[i]
        let repeat = false
        for (let j = 0; j < result.length; j++) {
          if (item[key] === result[j][key]) {
            if (fee) {
              for (const k in fee) {
                result[j][fee[k]] = tmsMath._add(item[fee[k]], result[j][fee[k]])
              }
            }
            repeat = true
            break
          }
        }
        if (!repeat) {
          result.push(item)
        }
      }
      return result
    },
    goLeft() { // 数据从左边穿梭到右边
      if (this.selectedRight.length === 0) {
        this.$message({ type: 'warning', message: '请在左边表格选择数据' })
      } else {
        this.selectedRight.forEach((e, index) => {
          // 默认设置配载重量,配载体积,配载数量
          e.loadAmount = e.repertoryAmount
          e.loadWeight = e.repertoryWeight
          e.loadVolume = e.repertoryVolume
          // this.rightTable = objectMerge2([], this.rightTable).filter(em => {
          //   return em.shipSn !== e.shipSn
          // })
          this.leftTable = objectMerge2([], this.leftTable).filter(el => { // 源数据减去被穿梭的数据
            return el.shipSn !== e.shipSn
          })
          this.rightTable.push(e)
          // this.orgLeftTable = objectMerge2([], this.orgLeftTable).filter(el => { // 搜索源数据减去被穿梭的数据
          //   return el.shipSn !== e.shipSn
          // })
          this.countOrgLeftTable = objectMerge2([], this.countOrgLeftTable).filter(el => { // 搜索源数据减去被穿梭的数据
            return el.shipSn !== e.shipSn
          })
        })
        this.rightTable = this.uniqueArray(objectMerge2(this.rightTable), 'shipSn', this.arrLastPartActualFeeName) // 去重
        this.selectedRight = [] // 清空选择列表
        this.getPayName()
        this.$emit('loadTable', this.rightTable)
      }
    },
    goRight() { // 数据从右边穿梭到左边
      if (this.selectedLeft.length === 0) {
        this.$message({ type: 'warning', message: '请在右边表格 选择数据' })
      } else {
        this.selectedLeft.forEach((e, index) => {
          // this.leftTable = objectMerge2([], this.leftTable).filter(el => {
          //   return el.shipSn !== e.shipSn
          // })
          // this.countOrgLeftTable = objectMerge2([], this.countOrgLeftTable).filter(el => {
          //   return el.shipSn !== e.shipSn
          // })
          this.leftTable.push(e)
          this.countOrgLeftTable.push(e)
          // this.orgLeftTable.push(e)
          this.rightTable = objectMerge2([], this.rightTable).filter(el => { // 源数据减去被穿梭的数据
            return el.shipSn !== e.shipSn
          })
        })
        this.leftTable = this.uniqueArray(objectMerge2(this.leftTable), 'shipSn', this.arrLastPartActualFeeName) // 去重
        this.countOrgLeftTable = this.uniqueArray(objectMerge2(this.countOrgLeftTable), 'shipSn', this.arrLastPartActualFeeName) // 去重
        this.selectedLeft = [] // 清空选择列表
        this.getPayName()
        this.$emit('loadTable', this.rightTable)
      }
    },
    addItem(row, index) { // 添加单行
      clearTimeout(this.addTimer)
      this.addTimer = setTimeout(() => {
        this.selectedRight = []
        this.selectedRight[index] = row
        this.doAction('goLeft')
      }, 50)
    },
    minusItem(row, index) { // 减去单行
      clearTimeout(this.minusTimer)
      this.minusTimer = setTimeout(() => {
        this.selectedLeft = []
        this.selectedLeft[index] = row
        this.doAction('goRight')
      }, 50)
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
    getSumRight(param) { // 右边表格合计-自定义显示
      const propsArr = ['shipFeeTotalActual', 'shipFeeTotal', 'onPay', 'noOnPay', 'hadOnPay', 'hadBackPay', 'hadArrivalPay', 'noArrivalPay', 'hadMonthPay', 'noMonthPay', 'noBackPay', 'hadUnusualPay', 'noUnusualPay', 'arrivalPay', 'backPay', 'unusualPay', 'monthPay', 'cargoAmount|', 'cargoWeight|', 'cargoVolume|', 'noShipFeeTotal', 'noShipFeeTotal', 'hadShipFeeTotal']
      return getSummaries(param, propsArr)
    },
    getSumLeft(param) { // 左边表格合计-自定义显示、
      const propsArr = ['shipFeeTotalActual', 'shipFeeTotal', 'onPay', 'noOnPay', 'hadBackPay', 'hadArrivalPay', 'hadOnPay', 'noArrivalPay', 'hadMonthPay', 'noMonthPay', 'noBackPay', 'hadUnusualPay', 'noUnusualPay', 'hadBackPay', 'hadArrivalPay', 'arrivalPay', 'backPay', 'unusualPay', 'monthPay', 'cargoAmount|', 'cargoWeight|', 'cargoVolume|', 'noShipFeeTotal', 'noShipFeeTotal', 'hadShipFeeTotal', 'hadShipFeeTotal', 'onPayActual', 'arrivalPayActual', 'backPayActual', 'unusualPayActual', 'monthPayActual']
      return getSummaries(param, propsArr)
    }
  }
}

</script>
<style lang="scss">
.tableHeadItemForm {
  margin-left: 5px;
  display: flex;
  flex-direction: row;
  .el-select {
    width: 100px;
    .el-input {
      width: 100px;
    }
  }
  .el-input {
    width: 125px;
    .el-input__inner {
      padding: 0 10px;
    }
  }
}

.tableHeadItemBtn {
  height: 100%;
  position: relative; // .tableHeadItemForm{
  //   position:absolute;
  //   z-index:2;
  //   top:-41px;
  //   left:-10px;
  //   display:flex;
  //   flex-direction: row;
  //   .el-input {
  //     width: 125px;
  //     .el-input__inner{
  //       padding: 0 10px;
  //     }
  //   }
  // }
  .el-button {
    border: none;
  }
  .el-button--mini,
  .el-button--mini.is-round {
    padding: 5px 9px;
  }
  .tableItemBtnMinus,
  .tableItemBtn {
    width: 18px;
    height: 18px;
    background-size: 18px;
    background-repeat: no-repeat;
  }
  .tableAllBtnMinus,
  .tableAllBtn {
    width: 18px;
    height: 18px;
    position: absolute;
    z-index: 33;
    top: 10px;
    left: 67px;
    background-size: 18px;
    background-repeat: no-repeat;
  }
  .tableAllBtn,
  .tableItemBtn {
    background-image: url('../../../../assets/png/01zengjia-c.png');
  }
  .tableAllBtn:hover,
  .tableItemBtn:hover {
    background-image: url('../../../../assets/png/02zengjia.png');
  }

  .tableAllBtnMinus,
  .tableItemBtnMinus {
    background-image: url('../../../../assets/png/03shanqu-c.png');
  }
  .tableAllBtnMinus:hover,
  .tableItemBtnMinus:hover {
    background-image: url('../../../../assets/png/04shanqu.png');
  }
  .showAllTable {
    width: calc(100% - 100px);
  }
}

</style>
