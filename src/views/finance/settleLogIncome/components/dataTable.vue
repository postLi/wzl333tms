<template>
  <transferTable v-loading='loading'>
    <div slot="tableSearch" class="tableHeadItemForm clearfix">
      <!-- 搜索左边表格 -->
      <currentSearch :info="countOrgLeftTable" @change="getSearch"></currentSearch>
    </div>
    <!-- 左边表格区 -->
    <div style="height:100%;" slot="tableLeft" class="tableHeadItemBtn">
      <el-button class="tableAllBtn" size="mini" @click="addALLList"></el-button>
      <el-table ref="multipleTableRight" :data="leftTable" border @row-click="clickDetailsRight" @selection-change="getSelectionRight" tooltip-effect="dark" triped :key="tablekey" height="100%" :summary-method="getSumRight" :default-sort="{prop: 'id', order: 'ascending'}" :show-overflow-tooltip="true" :show-summary="true" @row-dblclick="dclickAddItem">
        <el-table-column fixed type="index" width="50">
        </el-table-column>
        <el-table-column fixed width="50">
          <template slot-scope="scope">
            <el-button class="tableItemBtn" size="mini" @click="addItem(scope.row, scope.$index)"></el-button>
          </template>
        </el-table-column>
        <el-table-column prop="shipSn" label="运单号" fixed width="120">
        </el-table-column>
        <el-table-column prop="shipGoodsSn" sortable label="货号" width="140">
        </el-table-column>
        <el-table-column prop="shipFeeTotal" sortable label="运费合计" width="120">
        </el-table-column>
        <el-table-column prop="noShipFeeTotal" sortable label="未结运费合计" width="120">
        </el-table-column>
        <el-table-column prop="hadShipFeeTotal" sortable label="已结运费合计" width="120">
        </el-table-column>
        <el-table-column prop="onPay" sortable label="现付" width="90">
        </el-table-column>
        <el-table-column prop="noOnPay" sortable label="未结现付" width="90">
        </el-table-column>
        <el-table-column prop="hadOnPay" sortable label="已结现付" width="90">
        </el-table-column>
        <el-table-column prop="arrivalPay" sortable label="到付" width="90">
        </el-table-column>
        <el-table-column prop="noArrivalPay" sortable label="未结到付" width="90">
        </el-table-column>
        <el-table-column prop="hadArrivalPay" sortable label="已结到付" width="90">
        </el-table-column>
        <el-table-column prop="backPay" sortable label="回单付" width="90">
        </el-table-column>
        <el-table-column prop="noBackPay" sortable label="未结回单付" width="100">
        </el-table-column>
        <el-table-column prop="hadBackPay" sortable label="已结回单付" width="100">
        </el-table-column>
        <el-table-column prop="unusualPay" sortable label="异动费用" width="90">
        </el-table-column>
        <el-table-column prop="noUnusualPay" sortable label="未结异动费用" width="110">
        </el-table-column>
        <el-table-column prop="hadUnusualPay" sortable label="已结异动费用" width="110">
        </el-table-column>
        <el-table-column prop="monthPay" sortable label="月结" width="90">
        </el-table-column>
        <el-table-column prop="noMonthPay" sortable label="未结月结" width="90">
        </el-table-column>
        <el-table-column prop="hadMonthPay" sortable label="已结月结" width="90">
        </el-table-column>
        <el-table-column prop="shipFromCityName" sortable label="出发城市" width="130">
        </el-table-column>
        <el-table-column prop="shipToCityName" sortable label="到达城市" width="130">
        </el-table-column>
        <el-table-column prop="cargoName" sortable label="货品名" width="100">
        </el-table-column>
        <el-table-column prop="cargoAmount" sortable label="件数" width="80">
        </el-table-column>
        <el-table-column prop="cargoWeight" sortable label="重量" width="80">
        </el-table-column>
        <el-table-column prop="cargoVolume" sortable label="体积" width="80">
        </el-table-column>
        <el-table-column prop="shipSenderUnit" sortable label="发货方" width="120">
        </el-table-column>
        <el-table-column prop="shipSenderName" sortable label="发货人" width="120">
        </el-table-column>
        <el-table-column prop="shipRemarks" sortable label="运单备注" width="150">
        </el-table-column>
      </el-table>
    </div>
    <!-- 右边表格区 -->
    <div slot="tableRight" class="tableHeadItemBtn">
      <el-button class="tableAllBtnMinus" size="mini" @click="minusAllList"></el-button>
      <el-table ref="multipleTableLeft" :data="rightTable" @row-dblclick="dclickMinusItem" border @row-click="clickDetailsLeft" @selection-change="getSelectionLeft" tooltip-effect="dark" triped :key="tablekey" height="100%" :summary-method="getSumLeft" :default-sort="{prop: 'id', order: 'ascending'}" :show-summary='true' style="height:100%;">
        <el-table-column fixed type="index" width="50">
        </el-table-column>
        <el-table-column fixed width="50">
          <template slot-scope="scope">
            <el-button class="tableItemBtnMinus" size="mini" @click="minusItem(scope.row, scope.$index)"></el-button>
          </template>
        </el-table-column>
        <el-table-column prop="shipSn" label="运单号" fixed width="120">
        </el-table-column>
        <el-table-column prop="shipGoodsSn" sortable label="货号" width="140">
        </el-table-column>
        <el-table-column prop="shipFeeTotalActual" sortable label="实际合计" width="90">
        </el-table-column>
        <el-table-column prop="shipFeeTotal" sortable label="运费合计" width="90">
        </el-table-column>
        <el-table-column prop="noShipFeeTotal" sortable label="未结运费合计" width="120">
        </el-table-column>
        <el-table-column prop="hadShipFeeTotal" sortable label="已结运费合计" width="120">
        </el-table-column>
        <el-table-column prop="shipFeeTotalActual" sortable label="实际运费合计" width="120">
        </el-table-column>
        <el-table-column prop="onPay" sortable label="现付" width="90">
        </el-table-column>
        <el-table-column prop="noOnPay" sortable label="未结现付" width="90">
        </el-table-column>
        <el-table-column prop="hadOnPay" sortable label="已结现付" width="90">
        </el-table-column>
        <el-table-column prop="onPayActual" sortable label="实结现付" width="90">
        </el-table-column>
        <el-table-column prop="arrivalPay" sortable label="到付" width="90">
        </el-table-column>
        <el-table-column prop="noArrivalPay" sortable label="未结到付" width="90">
        </el-table-column>
        <el-table-column prop="hadArrivalPay" sortable label="已结到付" width="90">
        </el-table-column>
        <el-table-column prop="arrivalPayActual" sortable label="实结到付" width="90">
        </el-table-column>
        <el-table-column prop="backPay" sortable label="回单付" width="90">
        </el-table-column>
        <el-table-column prop="noBackPay" sortable label="未结回单付" width="100">
        </el-table-column>
        <el-table-column prop="hadBackPay" sortable label="已结回单付" width="100">
        </el-table-column>
        <el-table-column prop="backPayActual" sortable label="实结回单付" width="100">
        </el-table-column>
        <el-table-column prop="unusualPay" sortable label="异动费用" width="90">
        </el-table-column>
        <el-table-column prop="noUnusualPay" sortable label="未结异动费用" width="110">
        </el-table-column>
        <el-table-column prop="hadUnusualPay" sortable label="已结异动费用" width="110">
        </el-table-column>
        <el-table-column prop="unusualPayActual" sortable label="实结异动费用" width="110">
        </el-table-column>
        <el-table-column prop="monthPay" sortable label="月结" width="90">
        </el-table-column>
        <el-table-column prop="noMonthPay" sortable label="未结月结" width="90">
        </el-table-column>
        <el-table-column prop="hadMonthPay" sortable label="已结月结" width="90">
        </el-table-column>
        <el-table-column prop="monthPayActual" sortable label="实结月结" width="90">
        </el-table-column>
        <el-table-column prop="shipFromCityName" sortable label="出发城市" width="130">
        </el-table-column>
        <el-table-column prop="shipToCityName" sortable label="到达城市" width="130">
        </el-table-column>
        <el-table-column prop="cargoName" sortable label="货品名" width="100">
        </el-table-column>
        <el-table-column prop="cargoAmount" sortable label="件数" width="90">
        </el-table-column>
        <el-table-column prop="cargoWeight" sortable label="重量" width="90">
        </el-table-column>
        <el-table-column prop="cargoVolume" sortable label="体积" width="90">
        </el-table-column>
        <el-table-column prop="shipSenderUnit" sortable label="发货方" width="120">
        </el-table-column>
        <el-table-column prop="shipSenderName" sortable label="发货人" width="120">
        </el-table-column>
        <el-table-column prop="shipRemarks" sortable label="运单备注" width="150">
        </el-table-column>
      </el-table>
    </div>
  </transferTable>
</template>
<script>
import { mapGetters } from 'vuex'
import { getSelectAddLoadRepertoryList } from '@/api/operation/load'
import transferTable from '@/components/transferTable'
import querySelect from '@/components/querySelect/index'
import { objectMerge2, parseTime } from '@/utils/index'
import { getOrderShipList } from '@/api/finance/settleLog'
import currentSearch from './currentSearch'
import { getSummaries, tmsMath, uniqueArray } from '@/utils/'
export default {
  data() {
    return {
      loading: true,
      searchTime: [parseTime(new Date() - 60 * 24 * 60 * 60 * 1000), parseTime(new Date())],
      tablekey: '',
      truckMessage: '',
      incomePayType: 'RECEIVABLE', // RECEIVABLE-运单收入费用项 PAYABLE-运单支出费用项
      paymentsType: 0, // 收支类型, 0 收入, 1 支出
      settlementId: 178, // 178-运单结算 179-干线批次结算 180-短驳结算 181-送货结算
      loading: false,
      btnsize: 'mini',
      searchForm: {},
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
      senderSearch: '',
      arrLastPartActualFeeName: [],
      arrLastPartNoFeeName: [],
      arrLastPartFeeName: [], // 左边添加一条数据的所有部分结算的费用字段名
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
      type: Number,
      default: 0
    },
    orgId: {
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
        // this.getList()
      },
      deep: true
    },
    setLoadTable: { // 深度监听数组变换
      handler(cval, oval) {
        if (cval) {
          this.orgData = Object.assign({}, cval)
        }
      },
      deep: true
    },
    countSuccessList: {
      handler(cval, oval) {
        this.initCount(cval, oval) // 智能结算返回的数据
      },
      deep: true
    }
  },
  mounted() {
    this.getList()
  },
  activated() {
    this.getList()
  },
  methods: {
    getPayName() {
      if (this.rightTable.length !== 0) {
        this.arrNoPayName = [] // 未结费用项字段名
        for (let item in this.rightTable[0]) {
          if (item.indexOf('no') === 0) { // 获取开头为no的字符串字段名
            this.arrNoPayName.push(item)
          }
        }
        // console.log('=====未结费用项字段名', this.arrNoPayName)

        this.arrPayName = [] // 费用项字段名
        for (let item in this.arrNoPayName) {
          let str = this.arrNoPayName[item].substring(2, 3).toLowerCase() + this.arrNoPayName[item].substring(3) // 截取no后面的字符串，并将首字母大写转成小写
          this.arrPayName.push(str)
        }
        // console.log('=====费用项字段名', this.arrPayName)

        this.arrhadPayName = [] // 已结费用项字段名
        for (let item in this.arrNoPayName) {
          let str = 'had' + this.arrNoPayName[item].substring(2) // 截取no后面的字符串，并在前面拼接had
          this.arrhadPayName.push(str)
        }
        // console.log('=====已结费用项字段名', this.arrhadPayName)

        this.arrPayNameActual = [] // 费用实际支出项字段名
        for (let item in this.arrPayName) {
          let str = this.arrPayName[item] + 'Actual'
          this.arrPayNameActual.push(str)
        }
        // console.log('=====费用实际支出项字段名', this.arrPayNameActual)
        let obj = {
          arrPayName: this.arrPayName,
          arrNoPayName: this.arrNoPayName,
          arrhadPayName: this.arrhadPayName,
          arrPayNameActual: this.arrPayNameActual
        }
        this.$emit('feeName', obj)
      }
    },
    initCount(cval, oval) { // 对智能结算进行操作
      console.log('============后台返回的智能运单=============\n', cval)
      this.arrLastPartActualFeeName = []
      this.arrLastPartNoFeeName = []
      this.arrLastPartFeeName = []
      this.leftTable = []
      this.rightTable = objectMerge2([], cval) // 被智能挑选到的数据 右边表格
      this.$emit('loadTable', this.rightTable)
      if (this.rightTable.length === 0) {
        this.$message({ type: 'warning', message: '无符合智能结算条件的运单。' })
        this.leftTable = objectMerge2([], this.orgLeftTable)
        return false
      }
      console.log('orgLeftTable',this.orgLeftTable.length)
      this.leftTable = Object.assign([], this.orgLeftTable).filter((el, index) => { // 左边表格显示的数据 
        if (this.rightTable[index]) {
          return el.shipSn !== this.rightTable[index].shipSn
        } else {
          return true
        }
      })
      if (this.leftTable.length !== 0) {
        this.leftTable = this.uniqueArray(this.leftTable, 'shipSn') // 去重
      }

      this.$emit('loadTable', this.rightTable)
      this.getPayName()
      // // 判断右边表格的数据 合计是否为智能结算中输入的值
      let listCount = 0
      let countDifference = 0

      // 判断返回的数据 实结支出费用等于 未结费用
      // 前者等于 | 小于后者 不用进行操作
      // 前者大于否则 的时候 左边要添加右边的最后一条数据并且显示结算多余的数

      let nameFlag = '' // 右边最后一条的批次号或者运单号
      let isCopyLastData = false // 左边是否需要复制一条右边最后那条数据  true-要复制 false-不复制
      this.arrPayNameActual.forEach((el, actIndex) => {

        let feeActual = this.rightTable[this.rightTable.length - 1][el] // 实际费用
        let feeNo = this.rightTable[this.rightTable.length - 1][this.arrNoPayName[actIndex]] // 未结费用

        if (feeNo !== feeActual && feeNo !== '' && feeNo !== null && feeActual !== '' && feeActual !== null && typeof feeNo === typeof feeActual) { // 判断实际费用是否等于未结费用
          this.$message({ type: 'warning', message: '最后一条数据实际只需支付部分未结费用，多余的需要返回到左边列表！' })
          isCopyLastData = true
          this.arrLastPartFeeName.push(this.arrPayName[actIndex]) // 保存部分结算的字段，以便左边添加数据
          this.arrLastPartActualFeeName.push(el)
          this.arrLastPartNoFeeName.push(this.arrNoPayName[actIndex])
        }
      })

      if (this.rightTable[this.rightTable.length - 1].shipFeeTotal !== this.rightTable[this.rightTable.length - 1].shipFeeTotalActual) {
        isCopyLastData = true
      } else {
        isCopyLastData = false
      }

      if (isCopyLastData) { // true-给左边添加一条数据，并修改相关未结费用
        this.leftTable.push(objectMerge2([], this.rightTable[this.rightTable.length - 1]))
        this.arrLastPartFeeName.forEach(e => { // 左边最后一条 未结=未结-实际
          let noFeeName = 'no' + e.substring(0, 1).toUpperCase() + e.substring(1) // 未结费用名
          let feeNameActual = e + 'Actual' // 实际费用名
          this.leftTable[this.leftTable.length - 1][feeNameActual] = this.rightTable[this.rightTable.length - 1][noFeeName] - this.rightTable[this.rightTable.length - 1][feeNameActual]
        })
      }
     
      this.$emit('loadTable', this.rightTable)
      this.countOrgLeftTable = objectMerge2([], this.leftTable)

    },

    // initCount(cval, oval) { // 对智能结算返回的数据进行操作
    //   // this.getList()
    //   this.leftTable = [] // 左边表格显示最原始的数据
    //   this.rightTable = objectMerge2([], cval) // 右边表格显示的数据 
    //   this.$emit('loadTable', this.rightTable) // 方便费用信息处显示计算总额

    //   this.leftTable = objectMerge2([], this.orgLeftTable).filter((el, index) => { // 左边表格显示的数据
    //     if (this.rightTable[index]) {
    //       return el.shipSn !== this.rightTable[index].shipSn
    //     } else {
    //       return true
    //     }
    //   })
    //   if (this.leftTable.length !== 0) {
    //     this.leftTable = this.uniqueArray(this.leftTable, 'shipSn')
    //   }
    //   // 判断右边表格的数据 合计是否为智能结算中输入的值
    //   let listCount = 0
    //   let countDifference = 0

    //   this.rightTable.forEach(e => {
    //     listCount += Number(e.shipFeeTotal)
    //   })
    //   if (this.rightTable.length === 0) {
    //     this.$message({ type: 'warning', message: '无符合智能结算条件的运单。' })
    //     return false
    //   }
    //   let lastShipFeeTotal = Number(this.rightTable[this.rightTable.length - 1].shipFeeTotal)

    //   if (this.rightTable.length > 1) { // 右边表格不只一条数据的时候
    //     if (this.countNum < listCount) {
    //       let curShipFeeTotal = parseFloat(Number(lastShipFeeTotal - (listCount - this.countNum)).toFixed(2))
    //       this.rightTable[this.rightTable.length - 1].shipFeeTotal = curShipFeeTotal
    //       this.leftTable.push(objectMerge2(cval[cval.length - 1]))
    //       this.leftTable[this.leftTable.length - 1].shipFeeTotal = tmsMath._sub(cval[cval.length - 1].shipFeeTotal, curShipFeeTotal)
    //       this.leftTable[this.leftTable.length - 1].shipFeeTotalActual = this.leftTable[this.leftTable.length - 1].shipFeeTotal
    //       this.leftTable = this.uniqueArray(this.leftTable, 'shipSn') // 去重
    //       this.$emit('loadTable', this.rightTable)
    //     } else if (this.countNum > listCount) {
    //       console.log(this.countNum, listCount, parseFloat(Number(lastShipFeeTotal - (listCount - this.countNum)).toFixed(2)))

    //     }
    //   } else if (this.rightTable.length === 1) { // 当右边表格只有一条数据的时候
    //     if (this.countNum < listCount) {
    //       let curShipFeeTotal = parseFloat(Number(lastShipFeeTotal - (listCount - this.countNum)).toFixed(2))
    //       this.rightTable[this.rightTable.length - 1].shipFeeTotal = curShipFeeTotal
    //       this.leftTable.push(objectMerge2(cval[cval.length - 1]))
    //       this.leftTable[this.leftTable.length - 1].shipFeeTotal = tmsMath._sub(cval[cval.length - 1].shipFeeTotal, curShipFeeTotal)
    //       this.leftTable[this.leftTable.length - 1].shipFeeTotalActual = this.leftTable[this.leftTable.length - 1].shipFeeTotal
    //       this.leftTable = this.uniqueArray(this.leftTable, 'shipSn') // 去重
    //       this.$emit('loadTable', this.rightTable)
    //     }
    //   }
    //   this.countOrgLeftTable = objectMerge2([], this.leftTable)
    // },
    getList() {
      this.leftTable = this.$options.data().leftTable
      this.rightTable = this.$options.data().rightTable
      this.orgLeftTable = this.$options.data().orgLeftTable
      let obj = {}
      if (this.isModify) {
        this.leftTable = this.orgData.left
        this.orgLeftTable = this.orgData.left
        this.rightTable = this.orgData.right
        this.countOrgLeftTable = this.orgData.left
        this.$emit('loadTable', this.rightTable)
      } else {
        this.$set(obj, 'orgId', this.orgId)
        this.$set(obj, 'incomePayType', this.incomePayType)
        this.$set(obj, 'paymentsType', this.paymentsType)
        this.$set(obj, 'settlementId', this.settlementId)
        this.$set(obj, 'startTime', parseTime(this.searchTime[0], '{y}-{m}-{d} ') + '00:00:00')
        this.$set(obj, 'endTime', parseTime(this.searchTime[1], '{y}-{m}-{d} ') + '23:59:59')
        this.$set(obj, 'autoTotalAmount', '')
        getOrderShipList(obj).then(data => {
          this.loading = false
          this.leftTable = data
          this.orgLeftTable = data
          this.countOrgLeftTable = data
          this.$emit('loadTable', this.rightTable)
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
    dclickAddItem(row, event) { // 双击添加单行
      this.selectedRight = []
      this.selectedRight.push(row)
      console.log('selectedRight', this.selectedRight.length)
      this.doAction('goLeft')
    },
    dclickMinusItem(row, event) { // 双击减去单行
      this.selectedLeft = []
      this.selectedLeft.push(row)
      console.log('selectedLeft',  this.selectedLeft.length)
      this.doAction('goRight')
    },
    uniqueArray(array, key, fee) {
      let result = [array[0]]
      for (let i = 1; i < array.length; i++) {
        let item = array[i]
        let repeat = false
        for (let j = 0; j < result.length; j++) {
          if (item[key] === result[j][key]) {
            if (fee) {
              for (let k in fee) {
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
          this.rightTable.push(e)
          this.leftTable = objectMerge2([], this.leftTable).filter(el => { // 源数据减去被穿梭的数据
            return el.shipSn !== e.shipSn
          })
          // this.orgLeftTable = objectMerge2([], this.orgLeftTable).filter(el => { // 搜索源数据减去被穿梭的数据
          //   return el.shipSn !== e.shipSn
          // })
          this.countOrgLeftTable = objectMerge2([], this.countOrgLeftTable).filter(el => {
            return el.shipSn !== e.shipSn
          })
        })
        this.rightTable = this.uniqueArray(objectMerge2(this.rightTable), 'shipSn',  this.arrLastPartActualFeeName) // 去重
        // this.changeTableKey() // 刷新表格视图
        this.selectedRight = [] // 清空选择列表
        this.getPayName()
        this.$emit('loadTable', this.rightTable)
        console.log('-', this.countOrgLeftTable.length)
      }
    },
    goRight() { // 数据从右边穿梭到左边
      if (this.selectedLeft.length === 0) {
        this.$message({ type: 'warning', message: '请在右边表格选择数据' })
      } else {
        this.selectedLeft.forEach((e, index) => {
          this.leftTable.push(e)
          this.countOrgLeftTable.push(e)
          // this.orgLeftTable.push(e)
          this.rightTable = objectMerge2([], this.rightTable).filter(el => {
            return el.shipSn !== e.shipSn
          })
        })
        this.leftTable = this.uniqueArray(objectMerge2(this.leftTable), 'shipSn',  this.arrLastPartActualFeeName) // 去重
        this.countOrgLeftTable = this.uniqueArray(objectMerge2(this.countOrgLeftTable), 'shipSn', this.arrLastPartActualFeeName) // 去重
        // this.changeTableKey() // 刷新表格视图
        this.selectedLeft = [] // 清空选择列表
        this.getPayName()
        this.$emit('loadTable', this.rightTable)
        console.log('+', this.countOrgLeftTable.length)
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
    getSumRight(param) { // 右边表格合计-自定义显示
      let propsArr = ['shipFeeTotalActual', 'shipFeeTotal', 'onPay', 'noOnPay','hadOnPay','hadBackPay','hadArrivalPay','noArrivalPay','hadMonthPay','noMonthPay','noBackPay','hadUnusualPay','noUnusualPay','arrivalPay', 'backPay', 'unusualPay', 'monthPay', 'cargoAmount|', 'cargoWeight|', 'cargoVolume|','noShipFeeTotal', 'noShipFeeTotal','hadShipFeeTotal']
      return getSummaries(param, propsArr)
    },
    getSumLeft(param) { // 左边表格合计-自定义显示
      let propsArr = ['shipFeeTotalActual', 'shipFeeTotal', 'onPay', 'noOnPay','hadBackPay','hadArrivalPay','hadOnPay','noArrivalPay','hadMonthPay','noMonthPay','noBackPay','hadUnusualPay','noUnusualPay','hadBackPay','hadArrivalPay','arrivalPay', 'backPay', 'unusualPay', 'monthPay', 'cargoAmount|', 'cargoWeight|', 'cargoVolume|','noShipFeeTotal', 'noShipFeeTotal', 'hadShipFeeTotal','hadShipFeeTotal', 'onPayActual', 'arrivalPayActual', 'backPayActual', 'unusualPayActual', 'monthPayActual']
      return getSummaries(param, propsArr)
    }
  }
}

</script>
<style lang="scss">
.tableHeadItemBtn {
  height: 100%;
  position: relative;
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
    left: 66px;
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
