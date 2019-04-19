<template>
  <transferTable v-loading="loading" @resizeVTable="resizeVTable">
    <el-button icon="el-icon-refresh" slot="tableRefresh" size="mini" type="primary" plain circle @click="regetList"></el-button>
    <div slot="tableSearch" class="tableHeadItemForm clearfix">
      <!-- 搜索左边表格 -->
      <currentSearch :info="orgLeftTable" @change="getSearch" @keyupEneter="getSearchEnter"></currentSearch>
    </div>
    <!-- 左边表格区 -->
    <div slot="tableLeft" class="vtableHeadItemBtn">
      <el-button class="tableAllBtn" size="mini" @click="addALLList"></el-button>
      <v-table ref="orgLeftTable" v-show="isOrgLeftTable" style="width:100%;" column-width-drag is-horizontal-resize is-vertical-resize row-hover-color="#eee" :vertical-resize-offset='18' :columns="columnsLeft" :table-data="leftTable" :footer="footerLeft" :footer-row-height="30" :row-dblclick="dclickAddItem" @on-custom-comp="doActionExpandTable">
      </v-table>
      <v-table ref="leftTable" v-show="!isOrgLeftTable" style="width:100%;" column-width-drag is-horizontal-resize is-vertical-resize :vertical-resize-offset='18' row-hover-color="#eee" :columns="columnsLeft" :table-data="leftTable" :footer="footerLeft" :footer-row-height="30" :row-dblclick="dclickAddItem" @on-custom-comp="doActionExpandTable">
      </v-table>
    </div>
    <!-- 右边表格区 -->
    <div slot="tableRight" class="vtableHeadItemBtn">
      <el-button class="tableAllBtnMinus" size="mini" @click="minusAllList"></el-button>
      <v-table ref="rightTable" style="width:100%;" column-width-drag is-horizontal-resize is-vertical-resize row-hover-color="#eee" :vertical-resize-offset='18' :columns="columnsRight" :table-data="rightTable" :footer="footerRight" :footer-row-height="30" :row-dblclick="dclickMinusItem" @on-custom-comp="doActionExpandTable">
      </v-table>
    </div>
  </transferTable>
</template>
<script>
import { mapGetters } from 'vuex';
import {
  getSelectAddLoadRepertoryList,
  postLoadInfo
} from '@/api/operation/load';
import transferTable from '@/components/transferTable';
import { objectMerge2 } from '@/utils/index';
import currentSearch from './currentSearch';
import { getSummaries, tmsMath, getSummariesVtable } from '@/utils/';
import Vue from 'vue';
export default {
  data() {
    return {
      loading: false,
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
      },
      isOrgLeftTable: true,
      isCountFooter: true,
      orgcolumnsLeft: [{
          field: 'number',
          title: '序号',
          width: 60,
          isFrozen: true,
          titleAlign: 'center',
          columnAlign: 'center',
          formatter: function(rowData, rowIndex, pagingIndex, field) {
            return rowIndex + 1
          }
        },
        {
          field: 'customeAdv',
          title: '',
          width: 50,
          titleAlign: 'center',
          columnAlign: 'center',
          isFrozen: true,
          componentName: 'addItemBtn'
        },
        {
          field: 'shipGoodsSn',
          title: '货号',
          width: 120,
          // isFrozen: true,
          titleAlign: 'center',
          columnAlign: 'center'
        },
        {
          field: 'shipFromOrgName',
          title: '开单网点',
          width: 120,
          titleAlign: 'center',
          columnAlign: 'center'
        },
        {
          field: 'shipDeliveryMethodName',
          title: '交接方式',
          width: 90,
          titleAlign: 'center',
          columnAlign: 'center'
        },
        {
          field: 'shipSn',
          title: '运单号',
          width: 120,
          titleAlign: 'center',
          columnAlign: 'center'
        },
        {
          field: 'shipArrivepayFee',
          title: '到付(元)',
          width: 120,
          titleAlign: 'center',
          columnAlign: 'center'
        },
        {
          field: 'shipTotalFee',
          title: '运费合计(元)',
          width: 140,
          titleAlign: 'center',
          columnAlign: 'center'
        },
        {
          field: 'brokerageFee',
          title: '回扣(元)',
          width: 140,
          titleAlign: 'center',
          columnAlign: 'center'
        },
        {
          field: 'shipFromCityName',
          title: '发站',
          width: 120,
          titleAlign: 'center',
          columnAlign: 'center'
        },
        {
          field: 'shipToCityName',
          title: '到站',
          width: 120,
          titleAlign: 'center',
          columnAlign: 'center'
        },
        {
          field: 'shipSenderName',
          title: '发货人',
          width: 120,
          titleAlign: 'center',
          columnAlign: 'center'
        },
        {
          field: 'shipSenderMobile',
          title: '发货人电话',
          width: 120,
          titleAlign: 'center',
          columnAlign: 'center'
        },
        {
          field: 'shipReceiverName',
          title: '收货人',
          width: 120,
          titleAlign: 'center',
          columnAlign: 'center'
        },
        {
          field: 'shipReceiverMobile',
          title: '收货人电话',
          width: 120,
          titleAlign: 'center',
          columnAlign: 'center'
        },
        {
          field: 'cargoName',
          title: '货品名',
          width: 120,
          titleAlign: 'center',
          columnAlign: 'center'
        },
        {
          field: 'cargoPack',
          title: '包装',
          width: 120,
          titleAlign: 'center',
          columnAlign: 'center'
        },
        {
          field: 'repertoryAmount',
          title: '库存件数',
          width: 120,
          titleAlign: 'center',
          columnAlign: 'center'
        },
        {
          field: 'repertoryWeight',
          title: '库存重量(千克)',
          width: 140,
          titleAlign: 'center',
          columnAlign: 'center'
        },
        {
          field: 'repertoryVolume',
          title: '库存体积(方)',
          width: 140,
          titleAlign: 'center',
          columnAlign: 'center'
        },
        {
          field: 'cargoAmount',
          title: '运单件数',
          width: 120,
          titleAlign: 'center',
          columnAlign: 'center'
        },
        {
          field: 'cargoWeight',
          title: '运单重量(千克)',
          width: 140,
          titleAlign: 'center',
          columnAlign: 'center'
        },
        {
          field: 'cargoVolume',
          title: '运单体积(方)',
          width: 140,
          titleAlign: 'center',
          columnAlign: 'center'
        },
        {
          field: 'shipRemarks',
          title: '运单备注',
          width: 120,
          titleAlign: 'center',
          columnAlign: 'center'
        }
      ],
      orgcolumnsRight: [{
          field: 'number',
          title: '序号',
          width: 60,
          isFrozen: true,
          titleAlign: 'center',
          columnAlign: 'center',
          formatter: function(rowData, rowIndex, pagingIndex, field) {
            return rowIndex + 1
          }
        },
        {
          field: 'customeAdv',
          title: '',
          width: 50,
          titleAlign: 'center',
          columnAlign: 'center',
          isFrozen: true,
          componentName: 'minusItemBtn'
        },
        {
          field: 'shipGoodsSn',
          title: '货号',
          width: 120,
          // isFrozen: true,
          titleAlign: 'center',
          columnAlign: 'center'
        },
        {
          field: 'shipFromOrgName',
          title: '开单网点',
          width: 120,
          titleAlign: 'center',
          columnAlign: 'center'
        },
        {
          field: 'shipDeliveryMethodName',
          title: '交接方式',
          width: 90,
          titleAlign: 'center',
          columnAlign: 'center'
        },
        {
          field: 'shipSn',
          title: '运单号',
          width: 120,
          titleAlign: 'center',
          columnAlign: 'center'
        },
        {
          field: 'shipArrivepayFee',
          title: '到付(元)',
          width: 120,
          titleAlign: 'center',
          columnAlign: 'center'
        },
        {
          field: 'handlingFee',
          title: '操作费(元)',
          width: 140,
          hide: true,
          titleAlign: 'center',
          columnAlign: 'center',
          componentName: 'expandInput'
        },
        {
          field: 'deliveryFeeToPay',
          title: '实付送货费(元)',
          width: 140,
          hide: true,
          titleAlign: 'center',
          columnAlign: 'center',
          componentName: 'expandInput'
        },
        {
          field: 'loadAmount',
          title: '配载件数',
          width: 120,
          hide: true,
          titleAlign: 'center',
          columnAlign: 'center',
          componentName: 'expandInput'
        },
        {
          field: 'loadWeight',
          title: '配载重量(千克)',
          width: 120,
          hide: true,
          titleAlign: 'center',
          columnAlign: 'center',
          componentName: 'expandInput'
        },
        {
          field: 'loadVolume',
          title: '配载体积(方)',
          width: 120,
          hide: true,
          titleAlign: 'center',
          columnAlign: 'center',
          componentName: 'expandInput'
        },
        {
          field: 'shipTotalFee',
          title: '运费合计(元)',
          width: 120,
          titleAlign: 'center',
          columnAlign: 'center'
        },
        {
          field: 'brokerageFee',
          title: '回扣(元)',
          width: 120,
          titleAlign: 'center',
          columnAlign: 'center'
        },
        {
          field: 'repertoryAmount',
          title: '库存件数',
          width: 120,
          titleAlign: 'center',
          columnAlign: 'center'
        },
        {
          field: 'repertoryWeight',
          title: '库存重量(千克)',
          width: 140,
          titleAlign: 'center',
          columnAlign: 'center'
        },
        {
          field: 'repertoryVolume',
          title: '库存体积(方)',
          width: 140,
          titleAlign: 'center',
          columnAlign: 'center'
        },
        {
          field: 'cargoAmount',
          title: '运单件数',
          width: 120,
          titleAlign: 'center',
          columnAlign: 'center'
        },
        {
          field: 'cargoWeight',
          title: '运单重量(千克)',
          width: 140,
          titleAlign: 'center',
          columnAlign: 'center'
        },
        {
          field: 'cargoVolume',
          title: '运单体积(方)',
          width: 140,
          titleAlign: 'center',
          columnAlign: 'center'
        },
        {
          field: 'shipRemarks',
          title: '运单备注',
          width: 120,
          titleAlign: 'center',
          columnAlign: 'center'
        },
        {
          field: 'cargoPack',
          title: '包装',
          width: 120,
          titleAlign: 'center',
          columnAlign: 'center'
        },
        {
          field: 'shipFromCityName',
          title: '发站',
          width: 120,
          titleAlign: 'center',
          columnAlign: 'center'
        },
        {
          field: 'shipToCityName',
          title: '到站',
          width: 120,
          titleAlign: 'center',
          columnAlign: 'center'
        },
        {
          field: 'shipSenderName',
          title: '发货人',
          width: 120,
          titleAlign: 'center',
          columnAlign: 'center'
        },
        {
          field: 'shipSenderMobile',
          title: '发货人电话',
          width: 120,
          titleAlign: 'center',
          columnAlign: 'center'
        },
        {
          field: 'shipReceiverName',
          title: '收货人',
          width: 120,
          titleAlign: 'center',
          columnAlign: 'center'
        },
        {
          field: 'shipReceiverMobile',
          title: '收货人电话',
          width: 120,
          titleAlign: 'center',
          columnAlign: 'center'
        },
        {
          field: 'cargoName',
          title: '货品名',
          width: 120,
          titleAlign: 'center',
          columnAlign: 'center'
        }
      ],
      footerLeft: [
        []
      ],
      footerRight: [
        []
      ]
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
    ...mapGetters(['otherinfo']),
    loadTypeId: {
      get() {
        return Number(this.$route.query.loadTypeId)
      },
      set() {}
    },
    columnsLeft() {
      return this.orgcolumnsLeft
    },
    columnsRight() {
      return this.orgcolumnsRight.filter(el => {
        if (el.hide) {
          if (el.field === 'handlingFee' && this.loadTypeId === 40) {
            return false
          } else if (
            el.field === 'deliveryFeeToPay' &&
            this.loadTypeId !== 40
          ) {
            return false
          } else {
            return true
          }
        } else {
          return true
        }
      })
    }
  },
  components: {
    transferTable,
    currentSearch
  },
  watch: {
    isModify: {
      handler(cval, oval) {
        // 深度监听
        this.getList()
      },
      immediate: true
    },
    setLoadTable: {
      // 深度监听数组变换
      handler(cval, oval) {
        if (cval) {
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
          this.countHandingFee()
          this.setBothFooterData()
        }
      },
      deep: true
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    resizeVTable() {
      this.loading = true
      setTimeout(() => {
        if (this.isOrgLeftTable) {
          this.$refs.orgLeftTable.resize()
        } else {
          this.$refs.leftTable.resize()
        }
        this.$refs.rightTable.resize()
        this.loading = false
      }, 900)
    },
    countHandingFee() {
      if (!this.handlingFeeInfo.apportionTypeId ||
        !this.handlingFeeInfo.handlingFeeAll ||
        this.rightTable.length < 1
      ) {
        return
      }
      const info = this.handlingFeeInfo
      info.params =
        Number(this.$route.query.loadTypeId) === 40 ?
        'deliveryFeeToPay' :
        'handlingFee';

      switch (this.handlingFeeInfo.apportionTypeId) {
        case 45: // 按运单运费占运费比例分摊 (运单-回扣）/（总运费-总回扣）*运费[送货费]
          let totalBrokerageFee = 0 // 总回扣
          let totalShipTotalFee = 0 // 总运费合计
          this.rightTable.forEach(e => {
            totalBrokerageFee = tmsMath._add(
              totalBrokerageFee,
              e.brokerageFee ? e.brokerageFee : 0
            )
            totalShipTotalFee = tmsMath._add(
              totalShipTotalFee,
              e.shipTotalFee ? e.shipTotalFee : 0
            )
          })
          this.rightTable.forEach((e, index) => {
            const sub = tmsMath._sub(e.shipTotalFee, e.brokerageFee)
            if (sub < 0) {
              // 当前运单 回扣比运费合计多的话 就设置为0 不小于0
              e[info.params] = 0
            } else {
              e[info.params] = this.calc(
                tmsMath._mul(
                  tmsMath._div(
                    tmsMath._sub(e.shipTotalFee, e.brokerageFee),
                    tmsMath._sub(totalShipTotalFee, totalBrokerageFee)
                  ),
                  this.handlingFeeInfo.handlingFeeAll
                )
              )
            }
          })
          break;
        case 44: // 按票数分摊 运费/票数
          this.rightTable.forEach((e, index) => {
            e[info.params] = this.calc(
              tmsMath._div(
                this.handlingFeeInfo.handlingFeeAll,
                this.rightTable.length
              )
            )
          })
          break;
        case 43: // 按运单所占重量比例分摊 该单重量/本车总重量*运费[送货费]
          let totalWeight = 0
          this.rightTable.map(e => {
            totalWeight = tmsMath._add(totalWeight, e.loadWeight)
          })
          this.rightTable.forEach((e, index) => {
            e[info.params] = this.calc(
              tmsMath._mul(
                tmsMath._div(e.loadWeight, totalWeight),
                this.handlingFeeInfo.handlingFeeAll
              )
            )
          })
          break;
        case 42: // 按运单体积所占比例分摊 该单体积/本车总体积*运费[送货费]
          let totalVolume = 0
          this.rightTable.map(e => {
            totalVolume = tmsMath._add(totalVolume, e.loadVolume)
          })
          this.rightTable.forEach((e, index) => {
            e[info.params] = this.calc(
              tmsMath._mul(
                tmsMath._div(e.loadVolume, totalVolume),
                this.handlingFeeInfo.handlingFeeAll
              )
            )
          })
          break;
        case 41: // 按运单所占件数比例分摊 该单件数/本车总件数*运费[送货费]
          let totalAmount = 0
          this.rightTable.map(e => {
            totalAmount = tmsMath._add(totalAmount, e.loadAmount)
          })
          this.rightTable.forEach((e, index) => {
            e[info.params] = this.calc(
              tmsMath._mul(
                tmsMath._div(e.loadAmount, totalAmount),
                this.handlingFeeInfo.handlingFeeAll
              )
            )
          })
          break;
      }

      let count = 0
      let countFeeZero = 0
      const listLen = this.rightTable.length

      this.rightTable.forEach((e, index) => {
        count = tmsMath._add(count, e[info.params])
        if (count > this.handlingFeeInfo.handlingFeeAll) {
          e[info.params] = tmsMath._sub(
            e[info.params],
            tmsMath._sub(count, this.handlingFeeInfo.handlingFeeAll)
          )
        }
        e[info.params] = e[info.params] ? e[info.params] : 0
        if (e[info.params] === 0) {
          countFeeZero++
        }
      })

      if (count < this.handlingFeeInfo.handlingFeeAll) {
        this.rightTable[this.rightTable.length - 1][info.params] = tmsMath._add(
          this.rightTable[this.rightTable.length - 1][info.params],
          tmsMath._sub(this.handlingFeeInfo.handlingFeeAll, count)
        )
      }

      if (
        this.handlingFeeInfo.apportionTypeId &&
        this.handlingFeeInfo.handlingFeeAll &&
        countFeeZero === listLen
      ) {
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
      }

      // 计算底部合计行
      this.setBothFooterData()
    },
    regetList() {
      this.$emit('reset')
    },
    getSearch(obj) {
      // 搜索
      if (this.leftTable.length !== this.orgLeftTable.length) {

        this.isOrgLeftTable = false
        this.leftTable = obj
        this.setBothFooterData()
      }
    },
    getSearchEnter() {
      this.isOrgLeftTable = true
      // console.time('goLeft')
      if (this.leftTable.length) {
        this.addALLList()
      }
      this.leftTable = Object.assign([], this.orgLeftTable)
      this.setBothFooterData()
      // console.timeEnd('goLeft')
    },
    clickDetailsRight(row) {
      this.$refs.multipleTableRight.toggleRowSelection(row)
    },
    clickDetailsLeft(row) {
      this.$refs.multipleTableLeft.toggleRowSelection(row)
    },
    getSelectionRight(list) {
      // 获取右边表格打勾的数据列表
      this.selectedRight = list
    },
    getSelectionLeft(list) {
      // 获取左边表格打勾的数据列表
      this.selectedLeft = list
    },
    changeTableKey() {
      // 刷新表格
      this.tablekey = Math.random()
    },
    doAction(type) {
      switch (type) {
        case 'goLeft': // 左边数据勾选到右边
          this.goLeft()
          break;
        case 'goRight': // 右边数据勾选到左边
          this.goRight()
          break;
      }
    },
    changLoadData(index, value, type) {
      console.log(index, value, type)
       this.$set(this.rightTable[index], type, Number(value) || '')
       console.log(this.rightTable[index][type])
      // 修改右边表格是配载数量 index为rightTable的下标index
      const curAmount = this.rightTable[index].loadAmount // 配载件数
      const curWeight = this.rightTable[index].loadWeight // 配载重量
      const curVolume = this.rightTable[index].loadVolume // 配载体积
      const currepertAmount = this.rightTable[index].repertoryAmount // 库存件数
      const currepertWeight = this.rightTable[index].repertoryWeight // 库存重量
      const currepertVolume = this.rightTable[index].repertoryVolume // 库存体积
      if (
        curAmount > currepertAmount ||
        curAmount < 1 ||
        curWeight > currepertWeight ||
        curWeight < 0 ||
        curVolume > currepertVolume ||
        curVolume < 0
      ) {
        this.$notify({
          title: '警告',
          message: '配载件数不能小于1,配载重量和体积不能小于0,都不能大于库存数量,默认为该库存数量',
          type: 'warning'
        })
        this.rightTable[index].loadAmount = currepertAmount
        this.rightTable[index].loadWeight = currepertWeight
        this.rightTable[index].loadVolume = currepertVolume
      } else if (curAmount === currepertAmount) {
        this.$notify({
          title: '提示',
          message: '配载件数等于该库存大小,即所有配载数量为库存数量',
          type: 'warning'
        })
        this.rightTable[index].loadAmount = currepertAmount
      } else if (
        curVolume === currepertVolume &&
        curWeight === currepertWeight
      ) {
        this.$notify({
          title: '提示',
          message: '配载重量与配载体积都等于该库存大小,即所有配载数量为库存数量',
          type: 'warning'
        })
        this.rightTable[index].loadWeight = currepertWeight
        this.rightTable[index].loadVolume = currepertVolume
      } else {}
      if (this.$route.query.loadTypeId !== 40) {
        this.countHandingFee()
      }
      this.$emit('loadTable', this.rightTable)
      this.$emit('repertoryList', this.orgLeftTable)
      this.setBothFooterData()
      return (
        this.rightTable[index].loadAmount &&
        this.rightTable[index].loadWeight &&
        this.rightTable[index].loadVolume
      )
    },
    changHandlingFee(index, newVal, type) {
      const info = objectMerge2({}, this.handlingFeeInfo)
      info.params =
        Number(this.$route.query.loadTypeId) === 40 ?
        'deliveryFeeToPay' :
        'handlingFee';

      this.$set(this.rightTable[index], type, Number(newVal) || '')

      this.setBothFooterData()

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
      info.handlingFeeAll = total
      this.$emit('changeHandlingFeeAll', info)
    },
    goLeft() {
      // 数据从左边穿梭到右边
      console.log('goLeft 数据从左边穿梭到右边')
      if (this.selectedRight.length === 0) {
        this.$message({ type: 'warning', message: '请在左边表格选择数据' })
      } else {
        let rightTable = objectMerge2([], this.rightTable)
        let leftTable = objectMerge2([], this.leftTable)
        let orgLeftTable = objectMerge2([], this.orgLeftTable)
        this.selectedRight.forEach((e, index) => {
          // 默认设置配载重量,配载体积,配载数量,操作费用
          //
          if (this.$route.query) {
            const params =
              Number(this.$route.query.loadTypeId) === 40 ?
              'deliveryFeeToPay' :
              'handlingFee';
            e[params] = 0
          }
          e.loadAmount = e.repertoryAmount
          e.loadWeight = e.repertoryWeight
          e.loadVolume = e.repertoryVolume
          rightTable = rightTable.filter(em => {
            return em.repertoryId !== e.repertoryId
          })
          rightTable.push(e)
          // this.leftTable = objectMerge2([], this.leftTable).filter(el => {
          leftTable = leftTable.filter(el => {
            return el.repertoryId !== e.repertoryId
          })
          // this.orgLeftTable = objectMerge2([], this.orgLeftTable).filter(el => {
          orgLeftTable = orgLeftTable.filter(el => {
            return el.repertoryId !== e.repertoryId
          })
        })
        this.rightTable = rightTable
        this.leftTable = leftTable
        this.orgLeftTable = orgLeftTable

        this.selectedRight = [] // 清空选择列表
        this.countHandingFee()

        this.$emit('loadTable', this.rightTable)
        this.$emit('repertoryList', this.orgLeftTable)
        this.loading = false
      }
    },
    goRight() {
      // 数据从右边穿梭到左边
      console.log('goRight 数据从右边穿梭到左边')
      if (this.selectedLeft.length === 0) {
        this.$message({ type: 'warning', message: '请在右边表格选择数据' })
      } else {
        let rightTable = objectMerge2([], this.rightTable)
        let leftTable = objectMerge2([], this.leftTable)
        let orgLeftTable = objectMerge2([], this.orgLeftTable)

        this.selectedLeft.forEach((e, index) => {
          leftTable = leftTable.filter(em => {
            return em.repertoryId !== e.repertoryId
          })
          orgLeftTable = orgLeftTable.filter(em => {
            return em.repertoryId !== e.repertoryId
          })
          leftTable.push(e)
          orgLeftTable.push(e)

          rightTable = rightTable.filter(el => {
            return el.repertoryId !== e.repertoryId
          })
        })
        this.rightTable = rightTable
        this.leftTable = leftTable
        this.orgLeftTable = orgLeftTable
        this.selectedLeft = [] // 清空选择列表
        // if (this.$route.query.loadTypeId !== 40) {
        this.countHandingFee()
        // }

        this.$emit('loadTable', this.rightTable)
        this.$emit('repertoryList', this.orgLeftTable)
        this.loading = false
      }
    },
    addItem(row, index) {
      // 添加单行
      this.selectedRight = []
      this.selectedRight[index] = row
      this.doAction('goLeft')
      this.setBothFooterData()
    },
    minusItem(row, index) {
      // 减去单行
      this.selectedLeft = []
      this.selectedLeft[index] = row
      this.doAction('goRight')
      this.setBothFooterData()
    },
    addALLList() {
      // 添加全部
      this.loading = true
      this.selectedRight = Object.assign([], this.leftTable)
      this.doAction('goLeft')
      this.setBothFooterData()
    },
    minusAllList() {
      // 减去全部
      this.loading = true
      this.selectedLeft = Object.assign([], this.rightTable)
      this.doAction('goRight')
      this.setBothFooterData()
    },
    // dclickAddItem(row, event) { // 双击添加单行
    dclickAddItem(index, row, column) {
      // 双击添加单行
      console.log('row', index, row, column)
      this.selectedRight = []
      this.selectedRight.push(row)
      this.doAction('goLeft')
      this.setBothFooterData()
    },
    dclickMinusItem(index, row, column) {
      // 双击减去单行
      this.selectedLeft = []
      this.selectedLeft.push(row)
      this.doAction('goRight')
      this.setBothFooterData()
    },
    _processSearch(flag, callback) {
      // queryString 输入框值
      // nextTime 时间值
      obj.nextTime = obj.nextTime || 300
      if (this.timer) {
        clearTimeout(this.timer)
      }
      if (obj.queryString) {
        this.timer = setTimeout(() => {
          callback()
        }, obj.nextTime)
      } else {
        callback()
      }
    },
    setBothFooterData() {
      // 延时处理 防止快速切换数据多次计算
      if (this.isCountFooter) {
        if (this.timer) {
          clearTimeout(this.timer)
        }
        this.isCountFooter = false
        this.timer = setTimeout(() => {
          const propsArrLeft = [
            '_index|2|单',
            'brokerageFee',
            'shipTotalFee',
            'shipArrivepayFee|',
            'repertoryAmount|',
            'repertoryWeight|',
            'repertoryVolume|',
            'cargoAmount|',
            'cargoWeight|',
            'cargoVolume|'
          ]
          const propsArrRight = [
            '_index|2|单',
            'brokerageFee',
            'shipTotalFee',
            'shipArrivepayFee|',
            'handlingFee',
            'repertoryAmount|',
            'repertoryWeight|',
            'repertoryVolume|',
            'cargoAmount|',
            'cargoWeight|',
            'cargoVolume|',
            'loadAmount|',
            'loadWeight|',
            'loadVolume|'
          ]

          if (this.leftTable.length) {
            this.footerLeft = this.setFooterData({
                columns: this.columnsLeft,
                data: objectMerge2([], this.leftTable)
              },
              propsArrLeft
            )
          } else {
            this.footerLeft = [
              []
            ]
          }

          if (this.rightTable.length) {
            this.footerRight = this.setFooterData({
                columns: this.columnsRight,
                data: objectMerge2([], this.rightTable)
              },
              propsArrRight
            )
          } else {
            this.footerRight = [
              []
            ]
          }
          this.isCountFooter = true
        }, 100)
      }
    },
    setFooterData(param, propsArr) {
      const footer = []
      let arr = getSummariesVtable(param, propsArr)
      footer.push(arr)
      return footer
    },
    doActionExpandTable(params) {
      switch (params.type) {
        case 'addItemBtn': // 单行添加
          this.addItem(params.row, params.index)
          break;
        case 'minusItemBtn': // 单行减去
          this.minusItem(params.row, params.index)
          break;
        case 'expandInput': // 输入框
          if (/(handlingFee|deliveryFeeToPay)/.test(params.field)) {
            this.changHandlingFee(params.index, params.value, params.field)
          } else {
            this.changLoadData(params.index, params.value, params.field)
          }
          break
      }
    }
  }
}
// 自定义列组件 添加单行
Vue.component('addItemBtn', {
  template: `<button class="tableItemBtn" size="mini" @click="addItem(rowData, field,index)">
        </button>`,
  props: {
    rowData: {
      type: Object
    },
    field: {
      type: String
    },
    index: {
      type: Number
    }
  },
  methods: {
    addItem(rowData, field, index) {
      this.$emit('on-custom-comp', {
        row: rowData,
        index: index,
        type: 'addItemBtn'
      })
    }
  }
})
// 自定义列组件 减去单行
Vue.component('minusItemBtn', {
  template: `<button class="tableItemBtnMinus" size="mini" @click="minusItem(rowData,field, index)">
        </button>`,
  props: {
    rowData: {
      type: Object
    },
    field: {
      type: String
    },
    index: {
      type: Number
    }
  },
  methods: {
    minusItem(rowData, field, index) {
      this.$emit('on-custom-comp', {
        row: rowData,
        index: index,
        type: 'minusItemBtn'
      })
    }
  }
})
// 自定义列组件 其他输入框
Vue.component('expandInput', {
  template: `<input placeholder="请输入"
  class="vtableInput"
  :maxlength="10"
   v-model.number="rowData[field]" 
  @dblclick.stop.prevent.native 
  @click.stop.prevent.native
  @change="(e) => handleChange(e.target.value, rowData, field, index)" />`,
  props: {
    rowData: {
      type: Object
    },
    field: {
      type: String
    },
    index: {
      type: Number
    }
  },
  methods: {
    handleChange(value, rowData, field, index) {
      this.$emit('on-custom-comp', {
        row: rowData,
        index: index,
        type: 'expandInput',
        value: value,
        field: field
      })
    }
  }
})

</script>
<style lang="scss">
.vtableHeadItemBtn {
  height: 100%;
  position: relative;
  .vtableInput {
    width: 100%;
    height: 100%;
    border: 1px solid #ccc;
    padding: 0 7px;
    &:hover {
      background-color: #f2f2f2;
    }
  }
  button {
    border: none;
    background-color: rgba(0, 0, 0, 0);
    cursor: pointer;
  } // .el-button {
  //   border: none;
  // }
  // .el-button--mini,
  // .el-button--mini.is-round {
  //   padding: 5px 9px;
  // }
  .tableItemBtnMinus,
  .tableItemBtn {
    width: 18px;
    height: 18px;
    background-size: 18px;
    background-repeat: no-repeat;
    margin-top: 5px;
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
    background-image: url("../../../../../assets/png/01zengjia-c.png");
  }
  .tableAllBtn:hover,
  .tableItemBtn:hover {
    background-image: url("../../../../../assets/png/02zengjia.png");
  }

  .tableAllBtnMinus,
  .tableItemBtnMinus {
    background-image: url("../../../../../assets/png/03shanqu-c.png");
  }
  .tableAllBtnMinus:hover,
  .tableItemBtnMinus:hover {
    background-image: url("../../../../../assets/png/04shanqu.png");
  }
  .showAllTable {
    width: calc(100% - 100px);
  }
}

</style>
