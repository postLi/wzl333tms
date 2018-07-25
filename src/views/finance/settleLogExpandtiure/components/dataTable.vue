<template>
   <!-- 批次支出 -->
  <transferTable>
    <div slot="tableSearch" class="tableHeadItemForm clearfix">
       <!-- 搜索左边表格 -->
      <currentSearch :info="orgLeftTable" @change="getSearch" @setSettlementId="setSettlementId"></currentSearch>
    </div>
    <!-- 左边表格区 批次支出 -->
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
        <el-table-column label="发车批次" fixed width="120">
          <template slot-scope="props">
            <span v-if="props.row.shortBatchNo">{{props.row.shortBatchNo}}</span> <!-- 短驳 -->
            <span v-if="props.row.mainBatchNo">{{props.row.mainBatchNo}}</span> <!-- 干线 -->
            <span v-if="props.row.sendBatchNo">{{props.row.sendBatchNo}}</span> <!-- 送货 -->
          </template>
        </el-table-column>
        <el-table-column prop="truckIdNumber" sortable label="车牌号" width="120">
        </el-table-column>
        <el-table-column prop="driverName" sortable label="司机" width="120">
        </el-table-column>
         <el-table-column prop="shortPay" sortable label="短驳费" width="120" v-if="settlementId===180">
        </el-table-column>
        <el-table-column prop="sendPay" sortable label="送货费" width="120"  v-else-if="settlementId===181">
        </el-table-column>
        <el-table-column prop="backPay" sortable label="干线合计" width="120" v-else>
        </el-table-column>
        <el-table-column prop="startLoadPay" sortable label="发站装卸费" width="120">
        </el-table-column>
        <el-table-column prop="startOtherPay" sortable label="发站其他费" width="120">
        </el-table-column>
        <el-table-column prop="endLoadPay" sortable label="到站装卸费" width="120">
        </el-table-column>
        <el-table-column prop="endOtherPay" sortable label="到站其他费" width="120">
        </el-table-column>
        <el-table-column prop="repertoryAmount" sortable label="整车保险费" width="120">
        </el-table-column>
        <el-table-column prop="repertoryWeight" sortable label="发车时间" width="120">
        </el-table-column>
        <el-table-column prop="repertoryVolume" sortable label="到车时间" width="120">
        </el-table-column>
        <el-table-column prop="shipFromOrgName" sortable label="发车网点" width="120">
        </el-table-column>
        <el-table-column prop="cargoWeight" sortable label="到车网点" width="120">
        </el-table-column>
        <el-table-column prop="remark" sortable label="备注" width="120">
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
        <el-table-column label="发车批次" fixed width="120">
          <template slot-scope="props">
            <span v-if="props.row.shortBatchNo">{{props.row.shortBatchNo}}</span> <!-- 短驳 -->
            <span v-if="props.row.mainBatchNo">{{props.row.mainBatchNo}}</span> <!-- 干线 -->
            <span v-if="props.row.sendBatchNo">{{props.row.sendBatchNo}}</span> <!-- 送货 -->
          </template>
        </el-table-column>
        <el-table-column prop="truckIdNumber" sortable label="车牌号" width="120">
        </el-table-column>
        <el-table-column prop="driverName" sortable label="司机" width="120">
        </el-table-column>
        <el-table-column prop="shortPay" sortable label="短驳费" width="120" v-if="settlementId===180">
        </el-table-column>
        <el-table-column prop="sendPay" sortable label="送货费" width="120"  v-else-if="settlementId===181">
        </el-table-column>
        <el-table-column prop="backPay" sortable label="干线合计" width="120" v-else>
        </el-table-column>
        <el-table-column prop="startLoadPay" sortable label="发站装卸费" width="120">
        </el-table-column>
        <el-table-column prop="startOtherPay" sortable label="发站其他费" width="120">
        </el-table-column>
        <el-table-column prop="endLoadPay" sortable label="到站装卸费" width="120">
        </el-table-column>
        <el-table-column prop="endOtherPay" sortable label="到站其他费" width="120">
        </el-table-column>
        <el-table-column prop="repertoryAmount" sortable label="整车保险费" width="120">
        </el-table-column>
        <el-table-column prop="repertoryWeight" sortable label="发车时间" width="120">
        </el-table-column>
        <el-table-column prop="repertoryVolume" sortable label="到车时间" width="120">
        </el-table-column>
        <el-table-column prop="shipFromOrgName" sortable label="发车网点" width="120">
        </el-table-column>
        <el-table-column prop="cargoWeight" sortable label="到车网点" width="120">
        </el-table-column>
        <el-table-column prop="remark" sortable label="备注" width="120">
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
import { getOrderShipList } from '@/api/finance/settleLog'
import currentSearch from './currentSearch'
export default {
  data() {
    return {
      searchTime: [parseTime(new Date() - 60 * 24 * 60 * 60 * 1000), parseTime(new Date())],
      tablekey: '',
      truckMessage: '',
      searchForm: {},
      incomePayType: 'PAYABLE', // RECEIVABLE-运单收入费用项 PAYABLE-运单支出费用项
      paymentsType: 1, // 收支类型, 0 收入, 1 支出
      settlementId: 179, // 178-运单结算 179-干线批次结算 180-短驳结算 181-送货结算
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
    }
  },
  activated() {
    this.getList()
  },
  methods: {
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
        getOrderShipList(obj).then(data => {
          this.leftTable = data
          this.orgLeftTable = data
          this.$emit('loadTable', this.rightTable)
        })
        obj = {}
      }
    },
    setSettlementId (val) {
      this.settlementId = val
      console.log(val, this.settlementId)
      this.tableKey = Math.random()
      this.$emit('setSettlementId', this.settlementId)
    },
    getSearch (obj) { // 搜索
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
    goLeft() { // 数据从左边穿梭到右边
      if (this.selectedRight.length === 0) {
        this.$message({ type: 'warning', message: '请在左边表格选择数据' })
      } else {
        this.selectedRight.forEach((e, index) => {
          // 默认设置配载重量,配载体积,配载数量
          e.loadAmount = e.repertoryAmount
          e.loadWeight = e.repertoryWeight
          e.loadVolume = e.repertoryVolume
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
        // this.changeTableKey() // 刷新表格视图
        this.selectedRight = [] // 清空选择列表
        console.log('rightTable', this.rightTable)
        this.$emit('loadTable', this.rightTable)
      }
    },
    goRight() { // 数据从右边穿梭到左边
      if (this.selectedLeft.length === 0) {
        this.$message({ type: 'warning', message: '请在右边表格选择数据' })
      } else {
        this.selectedLeft.forEach((e, index) => {
          this.leftTable.push(e)
          this.orgLeftTable.push(e)
          let item = this.rightTable.indexOf(e)
          if (item !== -1) {
            // 源数据减去被穿梭的数据
            this.rightTable.splice(item, 1)
          }
        })
        // this.changeTableKey() // 刷新表格视图
        this.selectedLeft = [] // 清空选择列表
        console.log('rightTable', this.rightTable)
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
<style lang="scss">
.tableHeadItemForm {
    margin-left:5px;
    display: flex;
    flex-direction: row;
    .el-select{
      width:100px;
      .el-input{
        width:100px;
      }
    }
    .el-input {
      width: 125px;
      .el-input__inner{
        padding: 0 10px;
      }
    }
  }
.tableHeadItemBtn {
  height: 100%;
  position: relative;
  // .tableHeadItemForm{
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
