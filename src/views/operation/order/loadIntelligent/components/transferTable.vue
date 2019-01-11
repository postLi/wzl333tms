<template>
  <div class="transferTable_wrapper" v-loading="loading">
    <!-- <div class="transferTable_head"></div> -->
    <div class="transferTable_head clearfix">
      <!-- 搜索左边表格 -->
    </div>
    <div class="transferTable_main">
      <div class="transferTable_main_left" style="height:100%;" :style="showLeftStyle">
        <div class="transferTable_main_left_head">
          <b v-if="!isShowRightTable">库存运单</b>
          <currentSearch :info="orgLeftTable" @change="getSearch" v-if="!isShowRightTable"></currentSearch>
          <el-tooltip class="item" effect="dark" :content="showTableMessage" placement="left" v-if="!isShowRightTable">
            <el-button :icon="isShowLeftTable ? 'el-icon-close' : 'el-icon-rank'" type="primary" circle size="mini" plain @click="showAllLeft"></el-button>
          </el-tooltip>
        </div>
        <el-table ref="multipleTableLeft" :data="leftTable" :key="tablekey" :show-overflow-tooltip="true" @row-dblclick="dclickAddItem" @row-click="clickLeftRow" @selection-change="getSelectionLeft" height="100%" style="height: 100%;width: 100%;" class="tableHeadItemBtn" tooltip-effect="dark" border triped>
          <el-table-column fixed sortable width="50" label="序号">
            <template slot-scope="scope">
              {{scope.$index+1}}
            </template>
          </el-table-column>
          <el-table-column fixed :render-header="setHeaderAdd" width="50">
            <template slot-scope="scope">
              <el-button class="tableItemBtn" size="mini" @click="addItem(scope.row, scope.$index)"></el-button>
            </template>
          </el-table-column>
          <template v-for="column in tableColumnLeft">
            <el-table-column :key="column.id" :prop="column.prop" :fixed="column.fixed" :label="column.label" :width="column.width" sortable>
            </el-table-column>
          </template>
        </el-table>
      </div>
      <div class="transferTable_main_right" style="height:100%;" :style="showRightStyle">
        <div class="transferTable_main_right_head">
          <b v-if="!isShowLeftTable">配载清单<span v-if="!isShowLeftTable"> (可拖拽调整顺序)</span></b>
          <el-tooltip class="item" effect="dark" :content="showTableMessage" placement="top" v-if="!isShowLeftTable">
            <el-button :icon="isShowRightTable ? 'el-icon-close' : 'el-icon-rank'" type="primary" circle size="mini" plain @click="showAllRight"></el-button>
          </el-tooltip>
          <el-button v-if="!isShowLeftTable" type="primary" size="mini" plain @click="paramSet" icon="el-icon-setting" style="margin:0 10px;">参数设置</el-button>
        </div>
        <el-table row-key="repertoryId" ref="multipleTableRight" :data="rightTable" :key="tablekey" :show-overflow-tooltip="true" @row-dblclick="dclickMinusItem" @row-click="clickRightRow" @selection-change="getSelectionRight" height="100%" style="height: 100%;width: 100%;" class="tableHeadItemBtn" tooltip-effect="dark" border triped>
          <el-table-column fixed sortable width="50" label="序号">
            <template slot-scope="scope">
              {{scope.$index+1}}
            </template>
          </el-table-column>
          <el-table-column fixed :render-header="setHeaderMinus" width="50">
            <template slot-scope="scope">
              <el-button class="tableItemBtnMinus" size="mini" @click="minusItem(scope.row, scope.$index)"></el-button>
            </template>
          </el-table-column>
          <template v-for="(column, cindex) in tableColumnRight">
            <el-table-column :key="cindex" :prop="column.prop" :fixed="column.fixed" :label="column.label" :width="column.width" sortable>
            </el-table-column>
          </template>
        </el-table>
      </div>
    </div>
    <div class="transferTable_foot">
    </div>
  </div>
</template>
<script>
import draggable from 'vuedraggable'
import { getSelectAddLoadRepertoryList } from '@/api/operation/load'
import { objectMerge2, tmsMath } from '@/utils/index'
import Sortable from 'sortablejs'
import currentSearch from './currentSearch'
export default {
  components: {
    currentSearch
  },
  props: {
    getinfoed: Boolean,
    truckIndex: {
      type: [Number, String],
      default: () => {}
    },
    loadTable: {
      type: Object,
      default: () => {}
    },
    delData: {
      type: Object,
      default: () => {}
    },
    resetTuckLoad: {
      type: [Number, String],
      default: () => {}
    },
    addOrgRightTable: { // 判断是否给orgRightTable添加一辆车
      type: [String, Number],
      default: () => {}
    },
    dofo: {
      type: [Array, Object]
    },
    schemeIndex: {
      type: [Number, String],
      default: ''
    },
    submitLoadNew: {
      type: Object,
      default: {}
    },
    handlingFeeInfo: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      isDelOtherTruck: false,
      tablekey: 0,
      loading: false,
      showTableMessage: '全屏查看',
      isShowLeftTable: false,
      isShowRightTable: false,
      isDel: false, // true-删除车型 false-平常
      orgData: {},
      leftTable: [],
      orgLeftTable: [],
      rightTable: [],
      orgRightTable: [],
      selectedRight: [],
      selectedLeft: [],
      tableColumnLeft: [],
      tableColumnLeftDepart: [{
          label: '运单号',
          prop: 'shipSn',
          width: '130'
        },
        {
          label: '库存重量',
          prop: 'repertoryWeight'
        },
        {
          label: '库存体积',
          prop: 'repertoryVolume'
        }
      ],
      tableColumnLeftAll: [{
          label: '运单号',
          prop: 'shipSn',
          width: '140'
        },
        {
          label: '库存重量',
          prop: 'repertoryWeight'
        },
        {
          label: '库存体积',
          prop: 'repertoryVolume'
        },
        {
          label: '到达网点',
          prop: 'shipToOrgName'
        },
        {
          label: '到站',
          prop: 'shipToCityName'
        },
        {
          label: '货品名',
          prop: 'cargoName'
        },
        {
          label: '开单网点',
          prop: 'shipFromOrgName'
        },
        {
          label: '发站',
          prop: 'shipFromCityName'
        },
        {
          label: '发货人',
          prop: 'shipSenderName'
        },
        {
          label: '收货人',
          prop: 'shipReceiverName'
        }
      ],
      tableColumnRight: [],
      tableColumnRightDepart: [{
          label: '运单号',
          prop: 'shipSn',
          width: '140'
        },
        {
          label: '到达网点',
          prop: 'shipToOrgName'
        },
        {
          label: '到站',
          prop: 'shipToCityName'
        },
        {
          label: '货品名',
          prop: 'cargoName'
        },
        {
          label: '操作费',
          prop: 'handlingFee'
        },
        {
          label: '库存重量',
          prop: 'repertoryWeight'
        },
        {
          label: '库存体积',
          prop: 'repertoryVolume'
        }
      ],
      tableColumnRightAll: [{
          label: '运单号',
          prop: 'shipSn',
          width: '140'
        },
        {
          label: '操作费',
          prop: 'handlingFee'
        },
        {
          label: '到达网点',
          prop: 'shipToOrgName'
        },
        {
          label: '到站',
          prop: 'shipToCityName'
        },
        {
          label: '货品名',
          prop: 'cargoName'
        },
        {
          label: '库存重量',
          prop: 'repertoryWeight'
        },
        {
          label: '库存体积',
          prop: 'repertoryVolume'
        },
        {
          label: '库存件数',
          prop: 'repertoryAmount'
        },
        {
          label: '发站',
          prop: 'shipFromCityName'
        },
        {
          label: '开单网点',
          prop: 'shipFromOrgName'
        },
        {
          label: '发货人',
          prop: 'shipSenderName'
        },
        {
          label: '收货人',
          prop: 'shipReceiverName'
        },
        {
          label: '货号',
          prop: 'shipGoodsSn'
        }
      ],
      oldList: [],
      newList: [],
      sortable: null,
      isChangeHandlingFee: false
    }
  },
  watch: {
    handlingFeeInfo: {
      handler(cval, oval) {
        console.warn('-----获取操作费 obj 2------', cval, oval)
        // if (cval) {
          this.countHandingFee()
        // }
      },
      deep: true
    },
    submitLoadNew: { // 计算配载后拿到的数据
      handler(cval, oval) {
        if (cval && cval.right) {
          // this.orgLeftTable[this.truckIndex] = Object.assign([], cval)
          let arr = []
          this.orgLeftTable = Object.assign([], cval.left)
          cval.right.forEach(e => {
            arr.push(e.tmsOrderLoadDetailsList)
          })
          this.orgRightTable = Object.assign([], arr)
          // this.initTable()
        }
      }
    },
    schemeIndex: {
      handler(cval, oval) {
        console.log('schemeIndex watch', cval, oval)
      }
    },
    getinfoed() {
      if (this.getinfoed) {
        this.getinfoed2 = true
      }
    },
    loadTable: { // 深度监听数组变换  
      handler(cval, oval) { // 拿到智能配载返回的数据
        console.log('loadTable1')
        if (this.getinfoed2) {
          console.log('loadTable2')
          return
        }
        if (cval) {
          console.log('loadTable3')
          this.isDelOtherTruck = false
        }
        if (!this.isChangeHandlingFee) {
          this.orgData = Object.assign([], cval)
          this.orgRightTable = Object.assign([], cval.right)
          this.orgLeftTable = Object.assign([], cval.left)
          this.leftTable = Object.assign([], cval.left)
          this.oldList = this.rightTable.map(v => v.repertoryId)
          this.newList = this.oldList.slice()
          this.initTable()
        }
      },
      deep: true
    },
    truckIndex: {
      handler(cval, oval) { // 深度监听车型下标index 例如：0-车型一
        console.log('truckIndex')
        this.initTable()
      },
      deep: true
    },
    delData: {
      handler(cval, oval) { // 删除车型时
        this.isDel = true
        if (cval.list.carLoadDetail && cval.list.carLoadDetail.length > 0) {
          this.selectedRight = []
          cval.list.carLoadDetail.forEach(e => {
            this.selectedRight.push(e)
          })
          this.goLeft()
        } else {
          this.orgRightTable.splice(this.delData.number, 1)
        }
      },
      deep: true
    },
    resetTuckLoad: { // 参数设置新的车型列表长度
      handler(cval, oval) {
        if (cval === '') {
          return
        }
        let arr = []
        this.selectedRight = []
        let difflen = Number(cval ? cval : 0) - Number(this.orgRightTable.length ? this.orgRightTable.length : 0)
        if (difflen > 0) {
          for (let i = 0; i < difflen; i++) {
            this.orgRightTable.push([])
          }
        } else {
          this.orgRightTable.forEach((e, index) => {
            if (index >= Number(cval)) {
              e.forEach(el => {
                this.selectedRight.push(el)
              })
              this.orgRightTable[index] = []
            }
          })
          this.isDelOtherTruck = true
          this.goLeft()
        }
      },
      deep: true
    },
    rightTable() {
      console.log('rightTable:', this.rightTable.length)
      this.$emit('leftTable', this.leftTable)
    },
    leftTable() {
      console.log('leftTable:', this.leftTable.length)
      this.$emit('leftTable', this.leftTable)
    },
    addOrgRightTable: {
      handler(cval, oval) {
        if (cval !== oval) {
          console.log('添加车型前的orgRightTable', this.orgRightTable.length, this.orgRightTable)
          this.orgRightTable.push([])
          console.log('添加车型后的orgRightTable', this.orgRightTable.length, this.orgRightTable)
        }
      },
      deep: true
    }
  },
  mounted() {
    this.tableColumnLeft = Object.assign([], this.tableColumnLeftDepart)
    this.tableColumnRight = Object.assign([], this.tableColumnRightDepart)
    this.initTable()
  },
  computed: {
    dofoLen() {
      return this.dofo ? this.dofo.length : 0
    },
    showLeftStyle() {
      let showWidth = '30%'
      showWidth = this.isShowLeftTable ? '100%' : (this.isShowRightTable ? '0%' : '30%')
      return {
        width: showWidth,
        transition: '0.3s'
      }
    },
    showRightStyle() {
      let showWidth = '70%'
      showWidth = this.isShowRightTable ? '100%' : (this.isShowLeftTable ? '0%' : '70%')
      return {
        width: showWidth,
        transition: '0.3s'
      }
    }
  },
  methods: {
    initTable() {
      console.log('#$%#$%#$1 initTable')
      this.rightTable = objectMerge2([], this.orgRightTable[this.truckIndex]) // 右边列表-当前车辆的配载运单

      let arr = [] // 存储所有被配载的运单
      this.orgRightTable.forEach((e, index) => {
        if (e) {
          e.forEach(em => {
            arr.push(em)
          })
        }
      })
      if (this.orgLeftTable.length) {
        this.leftTable = objectMerge2([], this.orgLeftTable)
      }
      if (arr.length) {
        arr.forEach((e, index) => { // 左边剔除被配载的运单后还剩下的运单列表
          this.leftTable = this.leftTable.filter(em => {
            return em.repertoryId !== e.repertoryId
          })
          this.orgLeftTable = Object.assign([], this.leftTable)
        })
      } else {
        this.leftTable = Object.assign([], this.orgLeftTable)
      }
      this.$nextTick(() => {
        this.setSort() // 右边列表行拖拽
      })
      this.$emit('loadCurTable', this.rightTable)
      this.$emit('loadTable', this.orgRightTable)
    },
    fetchList() {
      this.leftTable = this.$options.data().leftTable
      this.rightTable = this.$options.data().rightTable
    },
    getSearch(arr) {
      this.leftTable = arr
    },
    setSort() { // 右边列表行拖拽
      const el = document.querySelectorAll('.transferTable_main_right .el-table__body-wrapper > table > tbody')[0]
      this.sortable = Sortable.create(el, {
        ghostClass: 'sortable-ghost', // Class name for the drop placeholder,
        setData: function(dataTransfer) {
          dataTransfer.setData('Text', '')
          // to avoid Firefox bug
          // Detail see : https://github.com/RubaXa/Sortable/issues/1012
        },
        onEnd: evt => {
          const targetRow = this.rightTable.splice(evt.oldIndex, 1)[0]
          this.rightTable.splice(evt.newIndex, 0, targetRow)
          this.orgRightTable[this.truckIndex] = Object.assign([], this.rightTable)
          // for show the changes, you can delete in you code
          const tempIndex = this.newList.splice(evt.oldIndex, 1)[0]
          this.newList.splice(evt.newIndex, 0, tempIndex)
        }
      })

    },
    setHeaderAdd(h, { column }) {
      return h('el-button', {
        props: {
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
    setHeaderMinus(h, { column }) {
      return h('el-button', {
        props: {
          size: 'mini'
        },
        'class': {
          'tableItemBtnMinus': true
        },
        on: {
          click: this.minusAllList
        }
      })
    },
    goLeft() { // 右边穿梭到左边
      this.selectedRight.forEach((e, index) => {
        let find = this.leftTable.filter(em => {
          return em.repertoryId === e.repertoryId
        })
        if (find.length === 0) {
          this.leftTable.push(e)
          this.orgLeftTable.push(e)

          this.rightTable = objectMerge2([], this.rightTable).filter(el => {
            return el.repertoryId !== e.repertoryId
          })
          if (this.isDelOtherTruck) { // 如果是做参数设置时，需要删除掉多余对应车型的运单
            this.orgRightTable = this.orgRightTable.splice(0, Number(this.resetTuckLoad))
          }
          this.orgRightTable[this.truckIndex] = objectMerge2([], this.orgRightTable[this.truckIndex]).filter(el => {
            return el.repertoryId !== e.repertoryId
          })
        }
      })
      if (this.isDel) { // 判断是否执行了删除操作，如果true就减去被减去的车型数据
        this.orgRightTable.splice(this.delData.number, 1)
        this.isDel = false
      }
      this.countHandingFee()
      this.$nextTick(() => {
        this.setSort() // 右边列表行拖拽
      })
      this.$emit('loadCurTable', this.rightTable)
      this.$emit('loadTable', this.orgRightTable)
      // this.isChangeHandlingFee = false
    },
    goRight() { // 左边穿梭到右边
      if (this.dofoLen === 0) {
        this.$message.warning('请添加一个车型！')
      } else {
        this.selectedLeft.forEach((e, index) => {
          let find = this.rightTable.filter(em => {
            return em.repertoryId === e.repertoryId
          })
          if (find.length === 0) {
            this.rightTable.push(e)
            this.orgRightTable[this.truckIndex] = this.orgRightTable[this.truckIndex] || []
            this.orgRightTable[this.truckIndex].push(e)
            this.leftTable = objectMerge2([], this.leftTable).filter(el => {
              return el.repertoryId !== e.repertoryId
            })
            this.orgLeftTable = this.orgLeftTable.filter(el => {
              return el.repertoryId !== e.repertoryId
            })
          }
        })
        this.countHandingFee()
        this.$nextTick(() => {
          this.setSort() // 右边列表行拖拽
        })
        this.tablekey = new Date().getTime()
        this.$emit('loadCurTable', this.rightTable)
        this.$emit('loadTable', this.orgRightTable)
        // this.isChangeHandlingFee = false
      }

    },
    dclickAddItem(row, event) { // 双击添加单行
      this.selectedLeft = []
      this.selectedLeft.push(row)
      this.goRight()
    },
    dclickMinusItem(row, event) { // 双击减去单行
      this.selectedRight = []
      this.selectedRight.push(row)
      this.goLeft()
    },
    addItem(row, index) { // 点击按钮+ 添加单行
      this.selectedLeft = []
      this.selectedLeft[0] = row
      this.goRight()
    },
    minusItem(row, index) { // 点击按钮- 减去单行
      this.selectedRight = []
      this.selectedRight[index] = row
      this.goLeft()
    },
    addALLList() { // 添加全部
      this.selectedLeft = Object.assign([], this.leftTable)
      this.goRight()
    },
    minusAllList() { // 减去全部
      this.selectedRight = Object.assign([], this.rightTable)
      this.goLeft()
    },
    clickLeftRow(row) {
      this.$refs.multipleTableLeft.toggleRowSelection(row)
    },
    clickRightRow(row) {
      this.$refs.multipleTableRight.toggleRowSelection(row)
    },
    countHandingFee() {
      if (!this.handlingFeeInfo.apportionTypeId || !this.handlingFeeInfo.handlingFeeAll || this.rightTable.length === 0) {
        return
      }
      this.isChangeHandlingFee = true
      console.log('-----获取操作费 switch 3------ ')
      switch (this.handlingFeeInfo.apportionTypeId) {
        case 45: //按运单车费占车费比例分摊 (运单-回扣）/（总车费-总回扣）*车费
          let totalBrokerageFee = 0 // 总回扣
          let totalShipTotalFee = 0 // 总车费合计
          this.rightTable.forEach(e => {
            totalBrokerageFee = tmsMath._add(totalBrokerageFee, e.brokerageFee ? e.brokerageFee : 0)
            totalShipTotalFee = tmsMath._add(totalShipTotalFee, e.shipTotalFee ? e.shipTotalFee : 0)
          })
          this.rightTable.forEach((e, index) => {
            let sub = tmsMath._sub(e.shipTotalFee, e.brokerageFee)
            if (sub < 0) {
              console.log('-----获取操作费 switch 4------ ', sub)
              e.handlingFee = 0
            } else {
              e.handlingFee = this.calc(tmsMath._mul(tmsMath._div(tmsMath._sub(e.shipTotalFee, e.brokerageFee), tmsMath._sub(totalShipTotalFee, totalBrokerageFee)), this.handlingFeeInfo.handlingFeeAll))
            }
          })
          break
        case 44: // 按票数分摊 车费/票数
          this.rightTable.forEach((e, index) => {
            e.handlingFee = this.calc(tmsMath._div(this.handlingFeeInfo.handlingFeeAll, this.rightTable.length))
          })
          break
        case 43: // 按运单所占重量比例分摊 该单重量/本车总重量*车费
          let totalWeight = 0
          this.rightTable.map(e => {
            totalWeight = tmsMath._add(totalWeight, e.repertoryWeight)
          })
          this.rightTable.forEach((e, index) => {
            e.handlingFee = this.calc(tmsMath._mul(tmsMath._div(e.repertoryWeight, totalWeight), this.handlingFeeInfo.handlingFeeAll))
          })
          break
        case 42: // 按运单体积所占比例分摊 该单体积/本车总体积*车费
          let totalVolume = 0
          this.rightTable.map(e => {
            totalVolume = tmsMath._add(totalVolume, e.repertoryVolume)
          })
          this.rightTable.forEach((e, index) => {
            e.handlingFee = this.calc(tmsMath._mul(tmsMath._div(e.repertoryVolume, totalVolume), this.handlingFeeInfo.handlingFeeAll))
          })
          break
        case 41: // 按运单所占件数比例分摊 该单件数/本车总件数*车费
          let totalAmount = 0
          this.rightTable.map(e => {
            totalAmount = tmsMath._add(totalAmount, e.repertoryAmount)
          })
          this.rightTable.forEach((e, index) => {
            e.handlingFee = this.calc(tmsMath._mul(tmsMath._div(e.repertoryAmount, totalAmount), this.handlingFeeInfo.handlingFeeAll))
          })
          break
      }

      let count = 0
      let countFeeZero = 0
      let listLen = this.rightTable.length

      this.rightTable.forEach((e, index) => {
        count = tmsMath._add(count, e.handlingFee)

        if (count > this.handlingFeeInfo.handlingFeeAll) {
          e.handlingFee = tmsMath._sub(e.handlingFee, tmsMath._sub(count, this.handlingFeeInfo.handlingFeeAll))
          count = this.handlingFeeInfo.handlingFeeAll
        }
        e.handlingFee = e.handlingFee ? e.handlingFee : 0
        if (e.handlingFee === 0) {
          countFeeZero++
        }
      })

      if (count < this.handlingFeeInfo.handlingFeeAll) {
        this.rightTable[this.rightTable.length - 1].handlingFee = tmsMath._add(this.rightTable[this.rightTable.length - 1].handlingFee, tmsMath._sub(this.handlingFeeInfo.handlingFeeAll, count))
      }

      // if (this.handlingFeeInfo.apportionTypeId && this.handlingFeeInfo.handlingFeeAll && countFeeZero === listLen) {
      //   // 判断是否所有的费用都为0 总费计为0的时候和操作不一致需要特殊处理
      //   // 特殊处理： 提示“运单相关数据不足以分摊操作，默认为【按票数分摊】。”
      //   this.$notify.info({
      //     title: '消息',
      //     message: '运单相关数据不足以分摊操作，默认为【按票数分摊】。'
      //   })
      //   this.$emit('resetHandlingFeeInfo', {
      //     apportionTypeId: 44
      //   })
      // }
      this.orgRightTable[this.truckIndex] = this.rightTable
    },
    calc(n) {
      return tmsMath._div(Math.round(tmsMath._mul(n, 100)), 100)
    },
    getSelectionLeft(list) {},
    getSelectionRight(list) {},
    showAllLeft() {
      this.isShowLeftTable = !this.isShowLeftTable
      this.tableColumnLeft = this.isShowLeftTable ? Object.assign([], this.tableColumnLeftAll) : this.tableColumnLeftDepart
      this.showTableMessage = this.isShowLeftTable ? '点击隐藏' : '全屏查看'
      console.log(this.isShowLeftTable, '左')
      this.$emit('showViewTable', this.isShowLeftTable)
    },
    showAllRight() {
      this.isShowRightTable = !this.isShowRightTable
      this.tableColumnRight = this.isShowRightTable ? Object.assign([], this.tableColumnRightAll) : this.tableColumnRightDepart
      this.showTableMessage = this.isShowRightTable ? '点击隐藏' : '全屏查看'
      console.log(this.isShowRightTable, '右')
      this.$emit('showViewTable', this.isShowRightTable)
    },
    paramSet() { // 参数设置
      this.$emit('openParamSet')
    }
  }
}

</script>
<style lang="scss">
.transferTable_wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid #cdf;

  .sortable-ghost {
    opacity: .8;
    color: #fff!important;
    background: #42b983!important;
  }
  .transferTable_main {
    display: flex;
    flex-direction: row;
    height: calc(100% - 35px);
    .transferTable_main_left {
      height: 100%;
      width: 30%;
      padding-right: 10px;
      transition: 0.9s;
    }
    .transferTable_main_right {
      width: 70%;
      height: 100%;
      transition: 0.9s;
    }
    .transferTable_main_left_head {
      border-right: 1px solid #cdf;
      border-top: 2px solid #b8cbd5;
      position: relative;
      .tableHeadItemForm {
        margin-left: 0px;
        position: absolute;
        top: -4px;
        left: 75px;
        .el-form-item {
          margin-bottom: 0px;
        }
      }
    }
    .transferTable_main_right_head {
      border-left: 1px solid #cdf;
      border-top: 2px solid #b8cbd5;
    }
    .transferTable_main_left_head,
    .transferTable_main_right_head {
      height: 36px;
      padding-top: 4px;
      padding-right: 4px;
      display: block;
      width: 100%;
      b {
        line-height: 30px;
        margin-left: 10px;
        color: red;
        span {
          color: #999;
          font-size: 14px;
          font-weight: 400;
        }
      }

      .el-button--primary.is-plain {
        float: right;
      }
    }
  }
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
      width: 100%;
    }
  }
}

</style>
