<template>
  <div class="transferTable_wrapper" v-loading="loading">
    <div class="transferTable_head"></div>
    <div class="transferTable_main">
      <div class="transferTable_main_left" style="height:100%;" :style="showLeftStyle">
        <div class="transferTable_main_left_head">
          <b v-if="!isShowRightTable">库存运单</b>
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
          <b v-if="!isShowLeftTable">配载清单</b><span v-if="!isShowLeftTable"> (可拖拽调整顺序)</span>
          <el-tooltip class="item" effect="dark" :content="showTableMessage" placement="left" v-if="!isShowLeftTable">
            <el-button :icon="isShowRightTable ? 'el-icon-close' : 'el-icon-rank'" type="primary" circle size="mini" plain @click="showAllRight"></el-button>
          </el-tooltip>
        </div>
        <el-table draggable='true' @dragstart='drag($event)' ref="multipleTableRight" :data="rightTable" :key="tablekey" :show-overflow-tooltip="true" @row-dblclick="dclickMinusItem" @row-click="clickRightRow" @selection-change="getSelectionRight" height="100%" style="height: 100%;width: 100%;" class="tableHeadItemBtn" tooltip-effect="dark" border triped>
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
          <template v-for="column in tableColumnRight">
            <el-table-column :key="column.id" :prop="column.prop" :fixed="column.fixed" :label="column.label" :width="column.width" sortable>
            </el-table-column>
          </template>
        </el-table>
      </div>
    </div>
    <div class="transferTable_foot"></div>
  </div>
</template>
<script>
import draggable from 'vuedraggable'
import { getSelectAddLoadRepertoryList } from '@/api/operation/load'
import { objectMerge2 } from '@/utils/index'
export default {
  props: {
    truckIndex: {
      type: [Number, String],
      default: () => {}
    },
    loadTable: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      tablekey: 0,
      loading: false,
      showTableMessage: '点击展开',
      isShowLeftTable: false,
      isShowRightTable: false,
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
          width: '140'
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
          label: '到达城市',
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
          label: '出发城市',
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
          label: '到达城市',
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
        }
      ],
      tableColumnRightAll: [{
          label: '运单号',
          prop: 'shipSn',
          width: '140'
        },
        {
          label: '到达网点',
          prop: 'shipToOrgName'
        },
        {
          label: '到达城市',
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
          label: '出发城市',
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
    }
  },
  watch: {
    loadTable: { // 深度监听数组变换
      handler(cval, oval) { // 拿到智能配载返回的数据
        this.orgData = Object.assign([], cval)
        this.orgRightTable = Object.assign([], cval.right)
        this.$nextTick(() => {
          this.fetchList()
        })
      },
      deep: true
    },
    truckIndex: {
      handler(cval, oval) { // 深度监听车型下标index 例如：0-车型一
        this.initTable()
      }
    },
    deep: true
  },
  mounted() {
    this.tableColumnLeft = Object.assign([], this.tableColumnLeftDepart)
    this.tableColumnRight = Object.assign([], this.tableColumnRightDepart)
this.fetchList()
  },
  computed: {
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
      this.rightTable = Object.assign([], this.orgRightTable[this.truckIndex]) // 右边列表-当前车辆的配载运单
      
      let arr = [] // 存储所有被配载的运单
      this.orgRightTable.forEach((e, index) => {
        e.forEach(em => {
          arr.push(em)
        })
      })
      if (arr.length) {
        arr.forEach((e, index) => { // 左边剔除被配载的运单后还剩下的运单列表
          this.leftTable = this.leftTable.filter(em => {
            return em.repertoryId != e.repertoryId
          })
        })
      }else{
        this.leftTable = Object.assign([], this.orgLeftTable)
      }
      this.$emit('loadCurTable', this.rightTable)
      this.$emit('loadTable', this.orgRightTable)

    },
    fetchList() {
      this.loading = false
      this.leftTable = this.$options.data().leftTable
      this.rightTable = this.$options.data().rightTable
      getSelectAddLoadRepertoryList(this.otherinfo.orgid).then(data => { // 库存运单列表
        this.loading = true
          this.orgLeftTable = data.data
          this.initTable()
        })
        .catch(error => {
          this.$message({ type: 'danger', message: error.errorInfo || error.text || '发生未知错误~' })
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
        this.leftTable = objectMerge2([], this.leftTable).filter(em => {
          return em.repertoryId !== e.repertoryId
        })
        this.orgLeftTable = objectMerge2([], this.orgLeftTable).filter(em => {
          return em.repertoryId !== e.repertoryId
        })
        this.leftTable.push(e)
        this.orgLeftTable.push(e)
        this.rightTable = objectMerge2([], this.rightTable).filter(el => {
          return el.repertoryId !== e.repertoryId
        })
        this.orgRightTable[this.truckIndex] = objectMerge2([], this.orgRightTable[this.truckIndex]).filter(el => {
          return el.repertoryId !== e.repertoryId
        })
      })
      this.$emit('loadCurTable', this.rightTable)
      this.$emit('loadTable', this.orgRightTable)
    },
    goRight() { // 左边穿梭到右边
      this.selectedLeft.forEach((e, index) => {
        this.rightTable = this.rightTable.filter(em => {
          return em.repertoryId !== e.repertoryId
        })
        this.orgRightTable[this.truckIndex] = objectMerge2([],this.orgRightTable[this.truckIndex]).filter(em => {
          return em.repertoryId !== e.repertoryId
        })
        this.rightTable.push(e)
        this.orgRightTable[this.truckIndex].push(e)
        this.leftTable = this.leftTable.filter(el => {
          return el.repertoryId !== e.repertoryId
        })
        this.orgLeftTable = this.orgLeftTable.filter(el => {
          return el.repertoryId !== e.repertoryId
        })
      })
      this.$emit('loadCurTable', this.rightTable)
      this.$emit('loadTable', this.orgRightTable)
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
      this.selectedRight[0] = row
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
      this.selectedLeft = []
      this.selectedLeft[0] = row
      // this.$refs.multipleTableLeft.toggleRowSelection(row)
    },
    clickRightRow(row) {
      this.selectedRight = []
      this.selectedRight[0] = row
      this.$refs.multipleTableRight.toggleRowSelection(row)
    },
    getSelectionLeft(list) {},
    getSelectionRight(list) {},
    showAllLeft() {
      this.isShowLeftTable = !this.isShowLeftTable
      this.tableColumnLeft = this.isShowLeftTable ? Object.assign([], this.tableColumnLeftAll) : this.tableColumnLeftDepart
      this.showTableMessage = this.isShowLeftTable ? '点击隐藏' : '点击展开'
      console.log(this.isShowLeftTable, '左')
      this.$emit('showViewTable', this.isShowLeftTable)
    },
    showAllRight() {
      this.isShowRightTable = !this.isShowRightTable
      this.tableColumnRight = this.isShowRightTable ? Object.assign([], this.tableColumnRightAll) : this.tableColumnRightDepart
      this.showTableMessage = this.isShowRightTable ? '点击隐藏' : '点击展开'
      console.log(this.isShowRightTable, '右')
      this.$emit('showViewTable', this.isShowRightTable)
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
    }
    .transferTable_main_right_head {
      border-left: 1px solid #cdf;
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
      }
      span {
        color: #999;
        font-size: 14px;
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
