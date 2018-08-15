<template>
  <transferTable v-loading='loading'>
    <div slot="tableSearch" class="tableHeadItemForm clearfix">
      <!-- 搜索左边表格 -->
      <currentSearch :info="orgLeftTable" @change="getSearch"></currentSearch>
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
        <el-table-column prop="shipSn" label="运单号" fixed width="130">
        </el-table-column>
        <el-table-column prop="shipGoodsSn" sortable label="货号" width="180">
        </el-table-column>
        <el-table-column prop="shipFeeTotal" sortable label="运费合计" width="120">
        </el-table-column>
        <el-table-column prop="onPay" sortable label="现付" width="120">
        </el-table-column>
        <el-table-column prop="arrivalPay" sortable label="到付" width="120">
        </el-table-column>
        <el-table-column prop="backPay" sortable label="回单付" width="120">
        </el-table-column>
        <el-table-column prop="unusualPay" sortable label="异动费用" width="120">
        </el-table-column>
        <el-table-column prop="monthPay" sortable label="月结" width="120">
        </el-table-column>
        <el-table-column prop="shipFromCityName" sortable label="出发城市" width="120">
        </el-table-column>
        <el-table-column prop="shipToCityName" sortable label="到达城市" width="120">
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
        <el-table-column prop="remark" sortable label="运单备注" width="120">
        </el-table-column>
      </el-table>
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
        <el-table-column prop="shipSn" label="运单号" fixed width="130">
        </el-table-column>
        <el-table-column prop="shipGoodsSn" sortable label="货号" width="150">
        </el-table-column>
        <el-table-column prop="shipFeeTotal" sortable label="运费合计" width="120">
        </el-table-column>
        <el-table-column prop="onPay" sortable label="现付" width="120">
        </el-table-column>
        <el-table-column prop="arrivalPay" sortable label="到付" width="120">
        </el-table-column>
        <el-table-column prop="backPay" sortable label="回单付" width="120">
        </el-table-column>
        <el-table-column prop="unusualPay" sortable label="异动费用" width="120">
        </el-table-column>
        <el-table-column prop="monthPay" sortable label="月结" width="120">
        </el-table-column>
        <el-table-column prop="shipFromCityName" sortable label="出发城市" width="120">
        </el-table-column>
        <el-table-column prop="shipToCityName" sortable label="到达城市" width="120">
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
        <el-table-column prop="remark" sortable label="运单备注" width="120">
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
      leftTable: [],
      rightTable: [],
      orgData: {
        left: [],
        right: []
      },
      senderSearch: ''
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
  methods: {
    initCount(cval, oval) { // 对智能结算返回的数据进行操作
      this.leftTable = Object.assign([], this.orgLeftTable) // 左边表格显示最原始的数据
      this.rightTable = objectMerge2([], cval) // 右边表格显示的数据 
      this.$emit('loadTable', this.rightTable) // 方便费用信息处显示计算总额
      this.leftTable = objectMerge2([], this.orgLeftTable.filter((el, index) => { // 左边表格显示的数据
        if (this.rightTable[index]) {
          return el.shipSn !== this.rightTable[index].shipSn
        } else {
          return true
        }
      }))

      // 判断右边表格的数据 合计是否为智能结算中输入的值
      let listCount = 0
      let countDifference = 0

      this.rightTable.forEach(e => {
        listCount += Number(e.shipFeeTotal)
      })
      let lastShipFeeTotal = Number(this.rightTable[this.rightTable.length - 1].shipFeeTotal)


      if (this.rightTable.length > 1) { // 右边表格不只一条数据的时候
        if (this.countNum < listCount) {
          let curShipFeeTotal = parseFloat(Number(lastShipFeeTotal - (listCount - this.countNum)).toFixed(2))
          this.rightTable[this.rightTable.length - 1].shipFeeTotal = curShipFeeTotal

          this.leftTable.push(objectMerge2(cval[cval.length - 1]))
          this.leftTable[this.leftTable.length - 1].shipFeeTotal = tmsMath._sub(cval[cval.length - 1].shipFeeTotal, curShipFeeTotal)
          console.log('leftTable', this.leftTable, cval[cval.length - 1], this.selectedRight)
        }
      }
      // else if (this.rightTable.length === 1){ // 当右边表格只有一条数据的时候
      //   if (this.countNum < listCount) {
      //     this.$set(this.rightTable, 0, Object.assign(this.rightTable[0], { 'shipFeeTotal': this.countNum }))
      //     this.leftTable = this.leftTable.push(this.rightTable[0])

      //   }
      // }
       this.orgLeftTable = objectMerge2(this.leftTable)

    },
    getList() {
      this.leftTable = this.$options.data().leftTable
      this.rightTable = this.$options.data().rightTable
      this.orgLeftTable = this.$options.data().orgLeftTable
      let obj = {}
      if (this.isModify) {
        this.leftTable = this.orgData.left
        this.orgLeftTable = this.orgData.left
        this.rightTable = this.orgData.right
        this.$emit('loadTable', this.rightTable)
      } else {
        this.$set(obj, 'orgId', this.otherinfo.orgid)
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
    uniqueArray(array, key) {
      let result = [array[0]]
      for (let i = 1; i < array.length; i++) {
        let item = array[i]
        let repeat = false
        for (let j = 0; j < result.length; j++) {
          if (item[key] === result[j][key]) {
            result[j].shipFeeTotal = tmsMath._add(item.shipFeeTotal,result[j].shipFeeTotal)
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
          let item = this.leftTable.indexOf(e)
          if (item !== -1) { // 源数据减去被穿梭的数据
            this.leftTable.splice(item, 1)
          }
          let orgItem = this.orgLeftTable.indexOf(e)
          if (orgItem !== -1) { // 搜索源数据减去被穿梭的数据
            this.orgLeftTable.splice(orgItem, 1)
          }
        })
        this.rightTable = this.uniqueArray(objectMerge2(this.rightTable), 'shipSn')
        // this.changeTableKey() // 刷新表格视图
        this.selectedRight = [] // 清空选择列表
        this.$emit('loadTable', this.rightTable)
      }
    },
    goRight() { // 数据从右边穿梭到左边
      if (this.selectedLeft.length === 0) {
        this.$message({ type: 'warning', message: '请在右边表格选择数据' })
      } else {
        this.selectedLeft.forEach((e, index) => {
          this.leftTable.push(e)
          // this.orgLeftTable.push(e)
          let item = this.rightTable.indexOf(e)
          if (item !== -1) {
            // 源数据减去被穿梭的数据
            this.rightTable.splice(item, 1)
          }
        })
        this.leftTable = this.uniqueArray(objectMerge2(this.leftTable), 'shipSn')
        // this.changeTableKey() // 刷新表格视图
        this.selectedLeft = [] // 清空选择列表
        this.$emit('loadTable', this.rightTable)
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
      let propsArr = ['shipFeeTotal', 'onPay', 'arrivalPay', 'backPay', 'unusualPay', 'monthPay', 'cargoAmount', 'cargoWeight', 'cargoVolume']
      return getSummaries(param, propsArr)
    },
    getSumLeft(param) { // 左边表格合计-自定义显示
      let propsArr = ['shipFeeTotal', 'onPay', 'arrivalPay', 'backPay', 'unusualPay', 'monthPay', 'cargoAmount', 'cargoWeight', 'cargoVolume']
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
