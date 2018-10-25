<template>
  <transferTable>
    <el-button icon="el-icon-refresh" slot="tableRefresh" size="mini" type="primary" plain circle @click="getList"></el-button>
    <div slot="tableSearch" class="tableHeadItemForm clearfix">
      <!-- 搜索左边表格 -->
      <currentSearch :info="orgLeftTable" @change="getSearch"></currentSearch>
    </div>
    <!-- 左边表格区 -->
    <div style="height:100%;" slot="tableLeft" class="tableHeadItemBtn">
      <el-button class="tableAllBtn" size="mini" @click="addALLList"></el-button>
      <el-table ref="multipleTableRight" @row-dblclick="dclickAddItem" :data="leftTable" border @row-click="clickDetailsRight" @selection-change="getSelectionRight" tooltip-effect="dark" triped :key="tablekey" height="100%" :summary-method="getSumRight" :default-sort="{prop: 'id', order: 'ascending'}" :show-overflow-tooltip="true" :show-summary="true">
        <el-table-column fixed width="50" label="序号">
          <template slot-scope="scope">
            {{scope.$index + 1}}
          </template>
        </el-table-column>
        <el-table-column fixed width="50">
          <template slot-scope="scope">
            <el-button class="tableItemBtn" size="mini" @click="addItem(scope.row, scope.$index)"></el-button>
          </template>
        </el-table-column>
        <el-table-column fixed prop="shipFromOrgName" label="开单网点" width="80">
        </el-table-column>
        <el-table-column prop="shipSn" width="130" label="运单号">
        </el-table-column>
        <el-table-column prop="shipArrivepayFee" sortable label="到付(元)" width="90">
        </el-table-column>
        <el-table-column prop="shipTotalFee" sortable label="运费(元)" width="90">
        </el-table-column>
        <el-table-column prop="brokerageFee" sortable label="回扣(元)" width="90">
        </el-table-column>
        <el-table-column prop="shipFromCityName" sortable label="出发城市" width="120">
        </el-table-column>
        <el-table-column prop="shipToCityName" sortable label="到达城市" width="120">
        </el-table-column>
        <el-table-column prop="shipSenderName" sortable label="发货人" width="120">
        </el-table-column>
        <el-table-column prop="shipSenderMobile" sortable label="发货人电话" width="120">
        </el-table-column>
        <el-table-column prop="shipReceiverName" sortable label="收货人" width="120">
        </el-table-column>
        <el-table-column prop="shipReceiverMobile" sortable label="收货人电话" width="120">
        </el-table-column>
        <el-table-column prop="cargoName" sortable label="货品名" width="140">
        </el-table-column>
        <el-table-column prop="shipGoodsSn" sortable label="货号" width="140">
        </el-table-column>
        <el-table-column prop="repertoryAmount" sortable label="库存件数" width="120">
        </el-table-column>
        <el-table-column prop="repertoryWeight" sortable label="库存重量(千克)" width="140">
        </el-table-column>
        <el-table-column prop="repertoryVolume" sortable label="库存体积(方)" width="120">
        </el-table-column>
        <el-table-column prop="cargoAmount" sortable label="运单件数" width="120">
        </el-table-column>
        <el-table-column prop="cargoWeight" sortable label="运单重量(千克)" width="120">
        </el-table-column>
        <el-table-column prop="cargoVolume" sortable label="运单体积(方)" width="120">
        </el-table-column>
        <el-table-column prop="shipRemarks" sortable label="运单备注" width="120">
        </el-table-column>
      </el-table>
    </div>
    <!-- 右边表格区 -->
    <div slot="tableRight" class="tableHeadItemBtn">
      <el-button class="tableAllBtnMinus" size="mini" @click="minusAllList"></el-button>
      <el-table ref="multipleTableLeft" :data="rightTable" @row-dblclick="dclickMinusItem" border @row-click="clickDetailsLeft" @selection-change="getSelectionLeft" tooltip-effect="dark" triped :key="tablekey" height="100%" :summary-method="getSumLeft" :default-sort="{prop: 'id', order: 'ascending'}" :show-summary='true' style="height:100%;">
        <el-table-column fixed width="50" label="序号">
          <template slot-scope="scope">
            {{scope.$index + 1}}
          </template>
        </el-table-column>
        <el-table-column fixed width="50">
          <template slot-scope="scope">
            <el-button class="tableItemBtnMinus" size="mini" @click="minusItem(scope.row, scope.$index)"></el-button>
          </template>
        </el-table-column>
        <el-table-column fixed prop="shipFromOrgName" label="开单网点" width="80">
        </el-table-column>
        <el-table-column prop="shipSn" label="运单号" width="130">
        </el-table-column>
        <el-table-column prop="shipArrivepayFee" sortable label="到付(元)" width="90">
        </el-table-column>
        <el-table-column prop="handlingFee" sortable label="操作费(元)" width="120" v-if="loadTypeId !== 40">
          <template slot-scope="scope">
            <el-input type="number" :size="btnsize" v-model.number="scope.row.handlingFee" @change="(val) =>changHandlingFee(scope.$index, val)" required :maxlength="10"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="loadAmount" sortable label="配载件数" width="120">
          <template slot-scope="scope">
            <el-input type="number" :size="btnsize" v-model.number="scope.row.loadAmount" @change="changLoadData(scope.$index)" required :maxlength="10"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="loadWeight" sortable label="配载重量(千克)" width="120">
          <template slot-scope="scope">
            <el-input type="number" :size="btnsize" v-model.number="scope.row.loadWeight" @change="changLoadData(scope.$index)" :maxlength="10"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="loadVolume" sortable label="配载体积(方)" width="120">
          <template slot-scope="scope">
            <el-input type="number" :size="btnsize" v-model.number="scope.row.loadVolume" @change="changLoadData(scope.$index)"  :maxlength="10"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="shipTotalFee" sortable label="运费(元)" width="90" v-if="loadTypeId !== 40">
        </el-table-column>
        <el-table-column prop="brokerageFee" sortable label="回扣(元)" width="90" v-if="loadTypeId !== 40">
        </el-table-column>
        <el-table-column prop="repertoryAmount" sortable label="库存件数" width="120">
        </el-table-column>
        <el-table-column prop="repertoryWeight" sortable label="库存重量(千克)" width="120">
        </el-table-column>
        <el-table-column prop="repertoryVolume" sortable label="库存体积(方)" width="120">
        </el-table-column>
        <el-table-column prop="cargoAmount" sortable label="运单件数" width="120">
        </el-table-column>
        <el-table-column prop="cargoWeight" sortable label="运单重量(千克)" width="120">
        </el-table-column>
        <el-table-column prop="cargoVolume" sortable label="运单体积(方)" width="120">
        </el-table-column>
        <el-table-column prop="shipFromCityName" sortable label="出发城市" width="120">
        </el-table-column>
        <el-table-column prop="shipToCityName" sortable label="到达城市" width="120">
        </el-table-column>
        <el-table-column prop="shipSenderName" sortable label="发货人" width="120">
        </el-table-column>
        <el-table-column prop="shipSenderMobile" sortable label="发货人电话" width="120">
        </el-table-column>
        <el-table-column prop="shipReceiverName" sortable label="收货人" width="120">
        </el-table-column>
        <el-table-column prop="shipReceiverMobile" sortable label="收货人电话" width="120">
        </el-table-column>
        <el-table-column prop="cargoName" sortable label="货品名" width="140">
        </el-table-column>
        <el-table-column prop="shipGoodsSn" sortable label="货号" width="140">
        </el-table-column>
      </el-table>
    </div>
  </transferTable>
</template>
<script>
import { mapGetters } from 'vuex'
import { getSelectAddLoadRepertoryList, postLoadInfo } from '@/api/operation/load'
import transferTable from '@/components/transferTable'
import { objectMerge2 } from '@/utils/index'
import currentSearch from './currentSearch'
import { getSummaries, tmsMath } from '@/utils/'
export default {
  data() {
    return {
      tablekey: '',
      loadTruck: '',
      truckMessage: '',
      formModel: {},
      loadTruck: 'loadTruckOne',
      loading: false,
      btnsize: 'mini',
      selectedRight: [],
      selectedLeft: [],
      orgLeftTable: [],
      leftTable: [],
      rightTable: [],
      orgData: {
        left: [],
        right: []
      }
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
    handlingFeeInfo: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    ...mapGetters([
      'otherinfo'
    ]),
    loadTypeId: {
      get() {
        return Number(this.$route.query.loadTypeId)
      },
      set() {}
    }
  },
  components: {
    transferTable,
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
          console.log('setLoadTable')
          this.orgData = objectMerge2({}, cval)
          this.getList()
        }
      },
      deep: true
    },
    handlingFeeInfo: {
      handler(cval, oval) {
        // 没有填操作费 并且 没有选择运单 就不计算避免浪费
        // 只有39干线和38短驳需要做操作费处理  40送货不需要
        if (this.$route.query && this.$route.query.loadTypeId !== 40) {
          if (!cval.handlingFeeAll || this.rightTable.length === 0) {
            return
          }
          console.log(cval.apportionTypeId, cval.handlingFeeAll)
          this.countHandingFee()
        }
      },
      deep: true
    }
  },
  mounted() {
    if (this.leftTable.length === 0) {
      this.getList()
    }
  },
  activated() {
    this.getList()
  },
  methods: {
    countHandingFee() {
      switch (this.handlingFeeInfo.apportionTypeId) {
        case 45: //按运单运费占车费比例分摊 (运单-回扣）/（总运费-总回扣）*车费
        let totalBrokerageFee = 0
        let totalShipTotalFee = 0
        this.rightTable.map(e =>{
          totalBrokerageFee = tmsMath._add(totalBrokerageFee, e.brokerageFee)
          totalShipTotalFee = tmsMath._add(totalShipTotalFee, e.shipTotalFee)
        })
        this.rightTable.forEach((e, index) => {
          e.handlingFee = this.calc(tmsMath._mul(tmsMath._div(tmsMath._sub(e.shipTotalFee, e.brokerageFee), tmsMath._sub(totalShipTotalFee, totalBrokerageFee)), this.handlingFeeInfo.handlingFeeAll))
        })
          // this.$message.warning('暂无该分摊方式计算功能，尚在开发中！')
          break
        case 44: // 按票数分摊 车费/票数
          this.rightTable.forEach((e, index) => {
            e.handlingFee = this.calc(tmsMath._div(this.handlingFeeInfo.handlingFeeAll, this.rightTable.length))
          })
          break
        case 43: // 按运单所占重量比例分摊 该单重量/本车总重量*车费
          let totalWeight = 0
          this.rightTable.map(e => {
            totalWeight = tmsMath._add(totalWeight, e.loadWeight)
          })
          this.rightTable.forEach((e, index) => {
            e.handlingFee = this.calc(tmsMath._mul(tmsMath._div(e.loadWeight, totalWeight), this.handlingFeeInfo.handlingFeeAll))
          })
          break
        case 42: // 按运单体积所占比例分摊 该单体积/本车总体积*车费
          let totalVolume = 0
          this.rightTable.map(e => {
            totalVolume = tmsMath._add(totalVolume, e.loadVolume)
          })
          this.rightTable.forEach((e, index) => {
            e.handlingFee = this.calc(tmsMath._mul(tmsMath._div(e.loadVolume, totalVolume), this.handlingFeeInfo.handlingFeeAll))
          })

          break
        case 41: // 按运单所占件数比例分摊 该单件数/本车总件数*车费
          let totalAmount = 0
          this.rightTable.map(e => {
            totalAmount = tmsMath._add(totalAmount, e.loadAmount)
          })
          this.rightTable.forEach((e, index) => {
            e.handlingFee = this.calc(tmsMath._mul(tmsMath._div(e.loadAmount, totalAmount), this.handlingFeeInfo.handlingFeeAll))
          })

          break
      }

      let count = 0
      this.rightTable.forEach((e, index) => {
        count = tmsMath._add(count,e.handlingFee)
        if(count > this.handlingFeeInfo.handlingFeeAll){
          e.handlingFee = tmsMath._sub(e.handlingFee ,tmsMath._sub(count, this.handlingFeeInfo.handlingFeeAll))
        }
      })
    },
    calc(n){
      return tmsMath._div(Math.round( tmsMath._mul(n, 100) ), 100)
    },
    getList() {
      this.leftTable = this.$options.data().leftTable
      this.rightTable = this.$options.data().rightTable
      this.orgLeftTable = this.$options.data().orgLeftTable
      if (this.isModify) {
        this.leftTable = this.orgData.left
        this.rightTable = this.orgData.right
        this.orgLeftTable = this.orgData.left
        this.$emit('loadTable', this.rightTable)
      } else {
        getSelectAddLoadRepertoryList(this.otherinfo.orgid).then(data => {
          this.leftTable = data.data
          this.orgLeftTable = data.data
          this.$emit('loadTable', this.rightTable)
        }).catch((err) => {
          this.loading = false
          this._handlerCatchMsg(err)
        })
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
        case 'goLeft': // 左边数据勾选到右边 
          this.goLeft()
          break
        case 'goRight': // 右边数据勾选到左边
          this.goRight()
          break
      }
    },
    changLoadData(newVal) { // 修改右边表格是配载数量 newVal为rightTable的下标index
      const curAmount = this.rightTable[newVal].loadAmount // 配载件数
      const curWeight = this.rightTable[newVal].loadWeight // 配载重量
      const curVolume = this.rightTable[newVal].loadVolume // 配载体积
      const currepertAmount = this.rightTable[newVal].repertoryAmount // 库存件数
      const currepertWeight = this.rightTable[newVal].repertoryWeight // 库存重量
      const currepertVolume = this.rightTable[newVal].repertoryVolume // 库存体积
      if (curAmount > currepertAmount || curAmount < 1 || curWeight > currepertWeight || curWeight < 0 || curVolume > currepertVolume || curVolume < 0) {
        this.$notify({
          title: '警告',
          message: '配载件数不能小于1,配载重量和体积不能小于0,都不能大于库存数量,默认为该库存数量',
          type: 'warning'
        })
        this.rightTable[newVal].loadAmount = currepertAmount
        this.rightTable[newVal].loadWeight = currepertWeight
        this.rightTable[newVal].loadVolume = currepertVolume
      } else if (curAmount === currepertAmount) {
        this.$notify({
          title: '提示',
          message: '配载件数等于该库存大小,即所有配载数量为库存数量',
          type: 'warning'
        })
        this.rightTable[newVal].loadAmount = currepertAmount
      } else if (curVolume === currepertVolume && curWeight === currepertWeight) {
        this.$notify({
          title: '提示',
          message: '配载重量与配载体积都等于该库存大小,即所有配载数量为库存数量',
          type: 'warning'
        })
        this.rightTable[newVal].loadWeight = currepertWeight
        this.rightTable[newVal].loadVolume = currepertVolume
      } else {}
      this.$emit('loadTable', this.rightTable)
      return this.rightTable[newVal].loadAmount && this.rightTable[newVal].loadWeight && this.rightTable[newVal].loadVolume
    },
    changHandlingFee(index, newVal) {
      console.log(this.rightTable.length)
      let total = 0
      this.rightTable.forEach(e => {
        total = tmsMath._add(total, e.handlingFee ? e.handlingFee : 0)
      })
      this.$emit('changeHandlingFeeAll', total)
    },
    goLeft() { // 数据从左边穿梭到右边
      console.log('goLeft 数据从左边穿梭到右边')
      if (this.selectedRight.length === 0) {
        this.$message({ type: 'warning', message: '请在左边表格选择数据' })
      } else {
        this.selectedRight.forEach((e, index) => {
          // 默认设置配载重量,配载体积,配载数量,操作费用
          if (this.$route.query && this.$route.query.loadTypeId !== 40) {
            e.handlingFee = 0
          }
          e.loadAmount = e.repertoryAmount
          e.loadWeight = e.repertoryWeight
          e.loadVolume = e.repertoryVolume
          this.rightTable = this.rightTable.filter(em => {
            return em.repertoryId !== e.repertoryId
          })
          this.rightTable.push(e)
          this.leftTable = objectMerge2([], this.leftTable).filter(el => {
            return el.repertoryId !== e.repertoryId
          })
          this.orgLeftTable = objectMerge2([], this.orgLeftTable).filter(el => {
            return el.repertoryId !== e.repertoryId
          })
        })
        this.selectedRight = [] // 清空选择列表
        this.countHandingFee()
        console.log('rightTable', this.rightTable.length, this.rightTable)
        this.$emit('loadTable', this.rightTable)
      }
    },
    goRight() { // 数据从右边穿梭到左边
      console.log('goRight 数据从右边穿梭到左边')
      if (this.selectedLeft.length === 0) {
        this.$message({ type: 'warning', message: '请在右边表格选择数据' })
      } else {
        this.selectedLeft.forEach((e, index) => {
          this.leftTable = this.leftTable.filter(em => {
            return em.repertoryId !== e.repertoryId
          })
          this.orgLeftTable = this.orgLeftTable.filter(em => {
            return em.repertoryId !== e.repertoryId
          })
          this.leftTable.push(e)
          this.orgLeftTable.push(e)

          this.rightTable = objectMerge2([], this.rightTable).filter(el => {
            return el.repertoryId !== e.repertoryId
          })
        })
        this.selectedLeft = [] // 清空选择列表
        console.log('rightTable', this.rightTable)
        this.countHandingFee()
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
      const propsArr = ['_index|2|单', '_index|3|单', 'shipArrivepayFee|', 'repertoryAmount|', 'repertoryWeight|', 'repertoryVolume|', 'cargoAmount|', 'cargoWeight|', 'cargoVolume|']
      return getSummaries(param, propsArr)
    },
    getSumLeft(param) { // 左边表格合计-自定义显示
      const propsArr = ['_index|2|单', '_index|3|单', 'shipArrivepayFee|','handlingFee', 'repertoryAmount|', 'repertoryWeight|', 'repertoryVolume|', 'cargoAmount|', 'cargoWeight|', 'cargoVolume|', 'loadAmount|', 'loadWeight|', 'loadVolume|']
      return getSummaries(param, propsArr)
    }
  }
}

</script>
<style lang="scss" scoped>
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
  }
  .showAllTable {
    width: calc(100% - 100px);
  }
}

</style>
