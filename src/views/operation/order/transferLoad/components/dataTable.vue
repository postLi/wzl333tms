<template>
  <transferTable>
    <el-button icon="el-icon-refresh" slot="tableRefresh" size="mini" type="primary" plain circle @click="getList"></el-button>
    <div slot="tableSearch" class="tableHeadItemForm clearfix">
      <!-- 搜索左边表格 -->
      <currentSearch :info="orgLeftTable" @change="getSearch" @keyupEneter="getSearchEnter"></currentSearch>
    </div>
    <!-- 左边表格区 -->
    <div style="height:100%;" slot="tableLeft" class="tableHeadItemBtn2">
      <el-table ref="multipleTableRight" :data="leftTable" border @row-click="clickDetailsRight" @selection-change="getSelectionRight" tooltip-effect="dark" triped :key="tablekey" height="100%" @row-dblclick="dclickAddItem" :summary-method="getSumRight" :show-overflow-tooltip="true" :default-sort="{prop: 'id', order: 'ascending'}" :show-summary="true">
        <el-table-column fixed type="index" width="50">
        </el-table-column>
        <el-table-column fixed :render-header="setHeader" width="50">
          <template slot-scope="scope">
            <!-- <el-button icon="el-icon-plus" class="tableItemBtn" size="mini" @click="addItem(scope.row, scope.$index)"></el-button> -->
            <el-button class="tableItemBtn" size="mini" @click="addItem(scope.row, scope.$index)"></el-button>
          </template>
        </el-table-column>
        <el-table-column fixed prop="shipFromOrgName" label="开单网点" width="80">
        </el-table-column>
        <el-table-column prop="shipSn" label="运单号" width="120" fixed>
        </el-table-column>
        <el-table-column prop="childShipSn" label="子运单号" width="120" fixed>
        </el-table-column>
        <el-table-column prop="shipArrivepayFee" sortable label="到付(元)" width="90">
        </el-table-column>
        <el-table-column prop="shipFromCityName" sortable label="发站" width="120">
          <template slot-scope="scope">
            {{ _processTableSlot(scope, 'shipFromCityName')}}
          </template>
        </el-table-column>
        <el-table-column prop="shipToCityName" sortable label="到站" width="120">
          <template slot-scope="scope">
            {{ _processTableSlot(scope, 'shipToCityName')}}
          </template>
        </el-table-column>
        <el-table-column prop="shipSenderName" sortable label="发货人" width="90">
        </el-table-column>
        <el-table-column prop="shipSenderMobile" sortable label="发货人电话" width="110">
        </el-table-column>
        <el-table-column prop="shipReceiverName" sortable label="收货人" width="90">
        </el-table-column>
        <el-table-column prop="shipReceiverMobile" sortable label="收货人电话" width="110">
        </el-table-column>
        <el-table-column prop="cargoName" sortable label="货品名" width="120">
        </el-table-column>
        <el-table-column prop="shipGoodsSn" sortable label="货号" width="140">
        </el-table-column>
        <el-table-column prop="repertoryAmount" sortable label="库存件数" width="100">
        </el-table-column>
        <el-table-column prop="repertoryWeight" sortable label="库存重量" width="100">
        </el-table-column>
        <el-table-column prop="repertoryVolume" sortable label="库存体积" width="100">
        </el-table-column>
        <el-table-column prop="cargoAmount" sortable label="运单件数" width="100">
        </el-table-column>
        <el-table-column prop="cargoWeight" sortable label="运单重量" width="100">
        </el-table-column>
        <el-table-column prop="cargoVolume" sortable label="运单体积" width="100">
        </el-table-column>
        <el-table-column prop="shipRemarks" sortable label="运单备注" width="120">
        </el-table-column>
      </el-table>
    </div>
    <!-- 右边表格区 -->
    <div style="height:100%;" slot="tableRight" class="tableHeadItemBtn2">
      <el-table ref="multipleTableLeft" :data="rightTable" border @row-click="clickDetailsLeft" @selection-change="getSelectionLeft" tooltip-effect="dark" triped :key="tablekey" height="100%" @row-dblclick="dclickMinusItem" :summary-method="getSumLeft" :default-sort="{prop: 'id', order: 'ascending'}" :show-summary='true'>
        <el-table-column fixed type="index" width="50">
        </el-table-column>
        <el-table-column fixed width="50" :render-header="setHeader2">
          <template slot-scope="scope">
            <!-- <el-button icon="el-icon-minus" class="tableItemBtn" size="mini" @click="minusItem(scope.row, scope.$index)"></el-button> -->
            <el-button class="tableItemBtnMinus" size="mini" @click="minusItem(scope.row, scope.$index)"></el-button>
          </template>
        </el-table-column>
        <el-table-column fixed prop="shipFromOrgName" label="开单网点" width="80">
        </el-table-column>
        <el-table-column prop="shipSn" label="运单号" width="120">
        </el-table-column>
        <el-table-column prop="oddNumbers" sortable label="中转单号" width="120">
          <template slot-scope="scope">
            <el-input size="mini" :value="scope.row.oddNumbers" @change="(val) => changeRow('oddNumbers', scope, val)" required></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="transferCharge" sortable label="中转运费" width="120">
          <template slot-scope="scope">
            <el-input size="mini" v-number-only:point :value="scope.row.transferCharge" @change="(val) => changeRow('transferCharge', scope, val)"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="deliveryExpense" sortable label="中转送货费" width="120">
          <template slot-scope="scope">
            <el-input size="mini" v-number-only:point @change="(val) => changeRow('deliveryExpense', scope, val)" :value="scope.row.deliveryExpense"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="transferOtherFee" sortable label="中转其他费" width="120">
          <template slot-scope="scope">
            <el-input size="mini" v-number-only:point @change="(val) => changeRow('transferOtherFee', scope, val)" :value="scope.row.transferOtherFee"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="totalCost" sortable label="中转费合计" width="120">
          <template slot-scope="scope">
            <!-- <el-input size="mini" disabled v-model="rightTable[scope.$index].totalCost" ></el-input> -->
            <el-input size="mini" disabled v-model="scope.row.totalCost"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="paymentId" sortable label="中转费付款方式" width="120">
          <template slot-scope="scope">
            <selectType type="payment_type" size="mini" @change="(val) => changeRow('paymentId', scope, val)" :value="scope.row.paymentId" :name="scope.row.paymentName" />
          </template>
        </el-table-column>
        <el-table-column prop="shipArrivepayFee" sortable label="到付(元)" width="90">
        </el-table-column>
        <el-table-column prop="repertoryAmount" sortable label="中转件数" width="100">
        </el-table-column>
        <el-table-column prop="repertoryWeight" sortable label="中转重量" width="100">
        </el-table-column>
        <el-table-column prop="repertoryVolume" sortable label="中转体积" width="100">
        </el-table-column>
        <el-table-column prop="shipFromCityName" sortable label="发站" width="120">
          <template slot-scope="scope">
            {{ _processTableSlot(scope, 'shipFromCityName')}}
          </template>
        </el-table-column>
        <el-table-column prop="shipToCityName" sortable label="到站" width="120">
          <template slot-scope="scope">
            {{ _processTableSlot(scope, 'shipToCityName')}}
          </template>
        </el-table-column>
        <el-table-column prop="shipSenderName" sortable label="发货人" width="90">
        </el-table-column>
        <el-table-column prop="shipSenderMobile" sortable label="发货人电话" width="110">
        </el-table-column>
        <el-table-column prop="shipReceiverName" sortable label="收货人" width="90">
        </el-table-column>
        <el-table-column prop="shipReceiverMobile" sortable label="收货人电话" width="110">
        </el-table-column>
        <el-table-column prop="cargoName" sortable label="货品名" width="120">
        </el-table-column>
        <el-table-column prop="shipGoodsSn" sortable label="货号" width="140">
        </el-table-column>
        <el-table-column prop="shipRemarks" sortable label="运单备注" width="120">
        </el-table-column>
      </el-table>
    </div>
  </transferTable>
</template>
<script>
import transferTable from '@/components/transferTable'
import selectType from '@/components/selectType/index'
import currentSearch from './currentSearch'
import { getTotal, getSummaries } from '@/utils/'

export default {
  props: {
    leftData: {
      type: Array
    },
    rightData: {
      type: Array
    }
  },
  data() {
    return {
      orgLeftTable: [],
      tablekey: '',
      truckMessage: '',
      formModel: {},
      loadTruck: 'loadTruckOne',
      loading: false,
      selectedRight: [],
      selectedLeft: [],
      leftTable: [],
      rightTable: []
    }
  },
  components: {
    transferTable,
    selectType,
    currentSearch
  },
  watch: {
    leftData(newVal) {
      this.leftTable = newVal
      this.orgLeftTable = newVal
    },
    rightData(newVal) {
      this.rightTable = newVal
    }
  },
  mounted() {},
  methods: {
    getList() {
      this.$emit('regetList')
    },
    getSum(param, type) {
      const propsArr = [ '_index|2|单', 'transferCharge', 'deliveryExpense', 'transferOtherFee', 'totalCost', 'cargoAmount|件', 'cargoWeight|kg', 'cargoVolume|方']
      return getSummaries(param, propsArr)
    },
    getSumRight(param) { // 右边表格合计-自定义显示
      return this.getSum(param, 'right')
    },
    getSumLeft(param) { // 左边表格合计-自定义显示
      return this.getSum(param, 'left')
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
      // this.tablekey = Math.random()
    },
    getSearchEnter() {
       if (this.leftTable.length) {
        this.addALLList()
      }
      this.leftTable = Object.assign([], this.orgLeftTable)
    },
    getSearch(arr) {
      this.leftTable = arr
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
    // 设置对应行
    changeRow(filed, scope, val) {
      const index = scope.$index
      const _this = this
      const current = _this.rightTable[index]
      current[filed] = val
      // 计算总费用
      current['totalCost'] = getTotal(current['transferCharge'], current['deliveryExpense'], current['transferOtherFee'])
      this.$set(_this.rightTable, index, Object.assign(_this.rightTable[index], {
        totalCost: current['totalCost']
      }))
      console.log(_this.rightTable)
      // _this.rightTable[index].totalCost = current['totalCost']
      _this.$emit('loadTable', _this.rightTable)
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
          e.oddNumbers = e.childShipSn || e.shipSn
          e.paymentId = e.paymentId || 16
          // this.rightTable.push(e)
          this.rightTable = this.rightTable.filter(em => {
            return em.repertoryId !== e.repertoryId
          })
          this.rightTable.push(e)
          this.leftTable = this.leftTable.filter(el => {
            return el.repertoryId !== e.repertoryId
          })
          this.orgLeftTable = this.orgLeftTable.filter(el => {
            return el.repertoryId !== e.repertoryId
          })
        })
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
          this.leftTable = this.leftTable.filter(em => {
            return em.repertoryId !== e.repertoryId
          })
          this.orgLeftTable = this.orgLeftTable.filter(el => {
            return el.repertoryId !== e.repertoryId
          })
          this.leftTable.push(e)
          this.orgLeftTable.push(e)
          this.rightTable = this.rightTable.filter(el => {
            return el.repertoryId !== e.repertoryId
          })
        })
        // this.changeTableKey() // 刷新表格视图
        this.selectedLeft = [] // 清空选择列表
        this.$emit('loadTable', this.rightTable)
      }
    },
    addItem(row, index) { // 添加单行
      this.selectedRight = []
      this.selectedRight.push(row)
      this.doAction('goLeft')
    },
    minusItem(row, index) { // 减去单行
      this.selectedLeft = []
      this.selectedLeft.push(row)
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
    setHeader(h, { column }) {
      return h('el-button', {
        props: {
          // icon: 'el-icon-plus',
          size: 'mini'
        },
        'class': {
          'tableItemBtn': true
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
          'tableItemBtnMinus': true
        },
        on: {
          click: this.minusAllList
        }
      })
    }
  }
}

</script>
<style lang="scss">
.tableHeadItemBtn2 {
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
    background-image: url('../../../../../assets/png/01zengjia-c.png');
  }
  .tableAllBtn:hover,
  .tableItemBtn:hover {
    background-image: url('../../../../../assets/png/02zengjia.png');
  }

  .tableAllBtnMinus,
  .tableItemBtnMinus {
    background-image: url('../../../../../assets/png/03shanqu-c.png');
  }
  .tableAllBtnMinus:hover,
  .tableItemBtnMinus:hover {
    background-image: url('../../../../../assets/png/04shanqu.png');
  } // position: relative;
  // .tableItemBtn {
  //   width: 30px;
  //   padding-left: 8px;
  // }
  // .tableAllBtn {
  //   width: 30px;
  //   padding-left: 8px;
  //   position: absolute;
  //   z-index: 33;
  //   top: 8px;
  //   left: 61px;
  // }
  .showAllTable {
    width: calc(100% - 100px);
  }
}

</style>
