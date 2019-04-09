<template>
  <transferTable>
    <el-button icon="el-icon-refresh" slot="tableRefresh" size="mini" type="primary" plain circle @click="regetList"></el-button>
    <div slot="tableSearch" class="tableHeadItemForm clearfix">
      <!-- 搜索左边表格 -->
      <currentSearch :info="orgLeftTable" @change="getSearch" @keyupEneter="getSearchEnter"></currentSearch>
    </div>
    <!-- 左边表格区 -->
    <div style="height:100%;" slot="tableLeft" class="tableHeadItemBtn">
      <el-button class="tableAllBtn" size="mini" @click="addALLList"></el-button>
      <el-table ref="multipleTableRight" @row-dblclick="dclickAddItem" :data="leftTable" border @row-click="clickDetailsRight" @selection-change="getSelectionRight" tooltip-effect="dark" triped :key="tablekey" height="100%" :summary-method="getSumRight" :default-sort="{prop: 'id', order: 'ascending'}" :show-overflow-tooltip="true" :show-summary="true">
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
        <el-table-column fixed prop="shipGoodsSn" sortable label="货号" width="140">
        </el-table-column>
        <el-table-column prop="shipFromOrgName" label="开单网点" width="80">
        </el-table-column>
        <el-table-column prop="shipDeliveryMethodName" label="交接方式" width="80">
        </el-table-column>
        <el-table-column prop="shipSn" width="130" label="运单号">
        </el-table-column>
        <el-table-column prop="shipArrivepayFee" sortable label="到付(元)" width="90">
        </el-table-column>
        <el-table-column prop="shipTotalFee" sortable label="运费合计(元)" width="120">
        </el-table-column>
        <el-table-column prop="brokerageFee" sortable label="回扣(元)" width="90">
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
        <el-table-column fixed prop="shipGoodsSn" sortable label="货号" width="140">
        </el-table-column>
        <el-table-column prop="shipFromOrgName" label="开单网点" width="80">
        </el-table-column>
        <el-table-column prop="shipDeliveryMethodName" label="交接方式" width="80">
        </el-table-column>
        <el-table-column prop="shipSn" label="运单号" width="130">
        </el-table-column>
        <el-table-column prop="shipArrivepayFee" sortable label="到付(元)" width="90">
        </el-table-column>
        <el-table-column prop="handlingFee" sortable label="操作费(元)" width="120" v-if="loadTypeId !== 40">
          <template slot-scope="scope">
            <el-input type="number" :size="btnsize" v-model.number="scope.row.handlingFee" @change="(val) =>changHandlingFee(scope.$index, val, 'handlingFee')" required :maxlength="10" @dblclick.stop.prevent.native @click.stop.prevent.native></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="deliveryFeeToPay" sortable label="实付送货费(元)" width="120" v-else>
          <template slot-scope="scope">
            <el-input type="number" :size="btnsize" v-model.number="scope.row.deliveryFeeToPay" @change="(val) =>changHandlingFee(scope.$index, val, 'deliveryFeeToPay')" required :maxlength="10" @dblclick.stop.prevent.native @click.stop.prevent.native></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="loadAmount" sortable label="配载件数" width="120">
          <template slot-scope="scope">
            <el-input type="number" :size="btnsize" v-model.number="scope.row.loadAmount" @change="changLoadData(scope.$index)" required :maxlength="10" @dblclick.stop.prevent.native @click.stop.prevent.native></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="loadWeight" sortable label="配载重量(千克)" width="120">
          <template slot-scope="scope">
            <el-input type="number" :size="btnsize" v-model.number="scope.row.loadWeight" @change="changLoadData(scope.$index)" :maxlength="10" @dblclick.stop.prevent.native @click.stop.prevent.native></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="loadVolume" sortable label="配载体积(方)" width="120">
          <template slot-scope="scope">
            <el-input type="number" :size="btnsize" v-model.number="scope.row.loadVolume" @change="changLoadData(scope.$index)" :maxlength="10" @dblclick.stop.prevent.native @click.stop.prevent.native></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="shipTotalFee" sortable label="运费合计(元)" width="120" v-if="loadTypeId !== 40">
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
    },
    isRestorage: {
      type: Boolean,
      default: false
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
      immediate: true
    },
    setLoadTable: { // 深度监听数组变换
      handler(cval, oval) {
        if (cval) {
          console.log('setLoadTable', cval)
          this.orgData = objectMerge2({}, cval)
          // if (!this.isRestorage) {
          this.getList()
          // }
        }
      },
      deep: true
    },
    handlingFeeInfo: {
      handler(cval, oval) {
        // 没有填操作费 并且 没有选择运单 就不计算避免浪费
        // 只有39干线和38短驳需要做操作费处理  40送货不需要操作费
        // 40送货费需要单独做送货费
        if (this.$route.query) {
          if (!cval.handlingFeeAll || this.rightTable.length === 0) {
            return
          }
          console.log('列表组件的分摊费用信息::::::', cval.apportionTypeId, cval.handlingFeeAll)
          this.countHandingFee()
        }
      },
      deep: true
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    countHandingFee() {
      if (!this.handlingFeeInfo.apportionTypeId || !this.handlingFeeInfo.handlingFeeAll || this.rightTable.length < 1) {
        return
      }
      const info = this.handlingFeeInfo
      info.params = this.$route.query.loadTypeId === 40 ? 'deliveryFeeToPay' : 'handlingFee'
      switch (this.handlingFeeInfo.apportionTypeId) {
        case 45: // 按运单运费占运费比例分摊 (运单-回扣）/（总运费-总回扣）*运费[送货费]
          let totalBrokerageFee = 0 // 总回扣
          let totalShipTotalFee = 0 // 总运费合计
          this.rightTable.forEach(e => {
            totalBrokerageFee = tmsMath._add(totalBrokerageFee, e.brokerageFee ? e.brokerageFee : 0)
            totalShipTotalFee = tmsMath._add(totalShipTotalFee, e.shipTotalFee ? e.shipTotalFee : 0)
          })
          this.rightTable.forEach((e, index) => {
            const sub = tmsMath._sub(e.shipTotalFee, e.brokerageFee)
            if (sub < 0) { // 当前运单 回扣比运费合计多的话 就设置为0 不小于0
              e[info.params] = 0
            } else {
              e[info.params] = this.calc(tmsMath._mul(tmsMath._div(tmsMath._sub(e.shipTotalFee, e.brokerageFee), tmsMath._sub(totalShipTotalFee, totalBrokerageFee)), this.handlingFeeInfo.handlingFeeAll))
            }
          })
          break
        case 44: // 按票数分摊 运费/票数
          this.rightTable.forEach((e, index) => {
            e[info.params] = this.calc(tmsMath._div(this.handlingFeeInfo.handlingFeeAll, this.rightTable.length))
          })
          break
        case 43: // 按运单所占重量比例分摊 该单重量/本车总重量*运费[送货费]
          let totalWeight = 0
          this.rightTable.map(e => {
            totalWeight = tmsMath._add(totalWeight, e.loadWeight)
          })
          this.rightTable.forEach((e, index) => {
            e[info.params] = this.calc(tmsMath._mul(tmsMath._div(e.loadWeight, totalWeight), this.handlingFeeInfo.handlingFeeAll))
          })
          break
        case 42: // 按运单体积所占比例分摊 该单体积/本车总体积*运费[送货费]
          let totalVolume = 0
          this.rightTable.map(e => {
            totalVolume = tmsMath._add(totalVolume, e.loadVolume)
          })
          this.rightTable.forEach((e, index) => {
            e[info.params] = this.calc(tmsMath._mul(tmsMath._div(e.loadVolume, totalVolume), this.handlingFeeInfo.handlingFeeAll))
          })
          break
        case 41: // 按运单所占件数比例分摊 该单件数/本车总件数*运费[送货费]
          let totalAmount = 0
          this.rightTable.map(e => {
            totalAmount = tmsMath._add(totalAmount, e.loadAmount)
          })
          this.rightTable.forEach((e, index) => {
            e[info.params] = this.calc(tmsMath._mul(tmsMath._div(e.loadAmount, totalAmount), this.handlingFeeInfo.handlingFeeAll))
          })
          break
      }

      let count = 0
      let countFeeZero = 0
      const listLen = this.rightTable.length

      this.rightTable.forEach((e, index) => {
        count = tmsMath._add(count, e[info.params])
        if (count > this.handlingFeeInfo.handlingFeeAll) {
          e[info.params] = tmsMath._sub(e[info.params], tmsMath._sub(count, this.handlingFeeInfo.handlingFeeAll))
        }
        e[info.params] = e[info.params] ? e[info.params] : 0
        if (e[info.params] === 0) {
          countFeeZero++
        }
      })

      if (count < this.handlingFeeInfo.handlingFeeAll) {
        this.rightTable[this.rightTable.length - 1][info.params] = tmsMath._add(this.rightTable[this.rightTable.length - 1][info.params], tmsMath._sub(this.handlingFeeInfo.handlingFeeAll, count))
      }

      if (this.handlingFeeInfo.apportionTypeId && this.handlingFeeInfo.handlingFeeAll && countFeeZero === listLen) {
        // 判断是否所有的费用都为0 总计为0的时候和操作费不一致需要特殊处理
        // 特殊处理： 提示“运单相关数据不足以分摊操作，默认为【按票数分摊】。”
        this.$notify.info({
          title: '消息',
          message: '运单相关数据不足以分摊操作，默认为【按票数分摊】。'
        })
        this.$emit('resetHandlingFeeInfo', {
          apportionTypeId: 44
        })
      }
    },
    calc(n) {
      return tmsMath._div(Math.round(tmsMath._mul(n, 100)), 100)
    },
    getList() {
      console.log('getList1', this.isModify)
      this.leftTable = this.$options.data().leftTable
      this.rightTable = this.$options.data().rightTable
      this.orgLeftTable = this.$options.data().orgLeftTable
      if (this.isModify) {
        console.log('getList2')
        this.leftTable = this.orgData.left
        this.rightTable = this.orgData.right
        this.orgLeftTable = this.orgData.left
        this.$emit('loadTable', this.rightTable)
        this.$emit('repertoryList', this.orgLeftTable)
      } else {
        console.log('getList3')
        this.leftTable = this.orgData.left
        this.rightTable = this.orgData.right
        this.orgLeftTable = this.orgData.left
        this.$emit('loadTable', this.rightTable)
        this.$emit('repertoryList', this.orgLeftTable)
        // getSelectAddLoadRepertoryList(this.otherinfo.orgid).then(data => {
        //   this.leftTable = data.data
        //   this.orgLeftTable = data.data
        //   this.$emit('loadTable', this.rightTable)
        //   this.$emit('repertoryList', this.orgLeftTable)
        // }).catch((err) => {
        //   this.loading = false
        //   this._handlerCatchMsg(err)
        // })
      }
    },
    regetList() {
      this.$emit('reset')
    },
    getSearch(obj) { // 搜索
      this.leftTable = obj
    },
    getSearchEnter() {
      if (this.leftTable.length) {
        this.addALLList()
      }
      this.leftTable = Object.assign([], this.orgLeftTable)
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
      if (this.$route.query.loadTypeId !== 40) {
        this.countHandingFee()
      }
      this.$emit('loadTable', this.rightTable)
      this.$emit('repertoryList', this.orgLeftTable)
      return this.rightTable[newVal].loadAmount && this.rightTable[newVal].loadWeight && this.rightTable[newVal].loadVolume
    },
    changHandlingFee(index, newVal, type) {
      const info = objectMerge2({}, this.handlingFeeInfo)
      info.params = Number(this.$route.query.loadTypeId) === 40 ? 'deliveryFeeToPay' : 'handlingFee'
      this.$set(this.rightTable[index], type, Number(newVal) || '')
      let total = 0
      this.rightTable.forEach(e => {
        total = tmsMath._add(total, e[type] ? e[type] : 0)
      })
      let cut = 0
      // 判断是否有卸货费， 如果有卸货费就total值为小框送货费deliveryDetailFee
      // 如果有卸货费
      //     卸货费比total大就把卸货费置为0，total为送货费deliveryDetailFee
      //     卸货费比total小就把卸货费不变，total为减去卸货费后的送货费deliveryDetailFee
      //     卸货费比total相同, total为0
      const delihandFee = info.deliveryHandlingFee
      if (delihandFee) {
        cut = total - delihandFee
        if (cut >= 0) {
          total = cut
        } else {
          info.deliveryHandlingFee = 0
        }
      }
      info.value = total
      this.$emit('changeHandlingFeeAll', info)
    },
    goLeft() { // 数据从左边穿梭到右边
      console.log('goLeft 数据从左边穿梭到右边')
      if (this.selectedRight.length === 0) {
        this.$message({ type: 'warning', message: '请在左边表格选择数据' })
      } else {
        this.selectedRight.forEach((e, index) => {
          // 默认设置配载重量,配载体积,配载数量,操作费用
          //
          if (this.$route.query) {
            const params = Number(this.$route.query.loadTypeId) === 40 ? 'deliveryFeeToPay' : 'handlingFee'
            console.log('=============', params)
            e[params] = 0
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
        // if (this.$route.query.loadTypeId !== 40) {
        this.countHandingFee()
        // }
        console.log('rightTable', this.rightTable.length, this.rightTable)
        this.$emit('loadTable', this.rightTable)
        this.$emit('repertoryList', this.orgLeftTable)
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
        // if (this.$route.query.loadTypeId !== 40) {
        this.countHandingFee()
        // }
        this.$emit('loadTable', this.rightTable)
        this.$emit('repertoryList', this.orgLeftTable)
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
      const propsArr = ['_index|2|单', 'brokerageFee', 'shipTotalFee', 'shipArrivepayFee|', 'repertoryAmount|', 'repertoryWeight|', 'repertoryVolume|', 'cargoAmount|', 'cargoWeight|', 'cargoVolume|']
      return getSummaries(param, propsArr)
    },
    getSumLeft(param) { // 左边表格合计-自定义显示
      const propsArr = ['_index|2|单', 'brokerageFee', 'shipTotalFee', 'shipArrivepayFee|', 'handlingFee', 'repertoryAmount|', 'repertoryWeight|', 'repertoryVolume|', 'cargoAmount|', 'cargoWeight|', 'cargoVolume|', 'loadAmount|', 'loadWeight|', 'loadVolume|']
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
    left: 77px;
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
