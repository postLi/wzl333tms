<template>
  <transferTable>
    <!-- 左边表格区  运单支出-->
    <div style="height:100%;" slot="tableLeft" class="tableHeadItemBtn">
      <el-form ref="searchForm" inline label-position="right" :model="searchForm" label-width="60px" class="tableHeadItemForm clearfix">
        <el-form-item label="批次">
          <el-input :size="btnsize" placeholder="短驳.干线.送货批次搜索"></el-input>
        </el-form-item>
         <el-form-item label="车牌号">
          <querySelect v-model="searchForm.truckIdNumber"  :size="btnsize" valuekey="truckIdNumber" search="truckIdNumber" type="trunk" />
        </el-form-item>
        <el-form-item>
           <el-button size="mini" type="primary" icon="el-icon-search">搜索</el-button>
        </el-form-item>
      </el-form>
      <el-button class="tableAllBtn" size="mini" @click="addALLList"></el-button>
      <el-table ref="multipleTableRight" :data="leftTable" border @row-click="clickDetailsRight" @selection-change="getSelectionRight" tooltip-effect="dark" triped :key="tablekey" height="100%" :summary-method="getSumRight" :default-sort="{prop: 'id', order: 'ascending'}" :show-overflow-tooltip="true" :show-summary="true">
        <el-table-column fixed type="index" width="50">
        </el-table-column>
        <el-table-column fixed width="50">
          <template slot-scope="scope">
            <el-button class="tableItemBtn" size="mini" @click="addItem(scope.row, scope.$index)"></el-button>
          </template>
        </el-table-column>
        <el-table-column prop="shipSn" label="运单号" fixed width="120">
        </el-table-column>
        <el-table-column prop="shipGoodsSn" sortable label="货号" width="120">
        </el-table-column>
        <el-table-column prop="amount" sortable label="运费合计" width="120">
        </el-table-column>
        <el-table-column prop="onPay" sortable label="现付" width="120">
        </el-table-column>
        <el-table-column prop="arrivalPay" sortable label="到付" width="120">
        </el-table-column>
        <el-table-column prop="backPay" sortable label="回单付" width="120">
        </el-table-column>
        <el-table-column prop="monthPay" sortable label="月结" width="120">
        </el-table-column>
        <el-table-column prop="shipGoodsSn" sortable label="出发城市" width="120">
        </el-table-column>
        <el-table-column prop="shipGoodsSn" sortable label="到达城市" width="120">
        </el-table-column>
        <el-table-column prop="cargoName" sortable label="货品名" width="120">
        </el-table-column>
        <el-table-column prop="repertoryAmount" sortable label="件数" width="120">
        </el-table-column>
        <el-table-column prop="repertoryWeight" sortable label="重量" width="120">
        </el-table-column>
        <el-table-column prop="repertoryVolume" sortable label="体积" width="120">
        </el-table-column>
        <el-table-column prop="cargoAmount" sortable label="发货方" width="120">
        </el-table-column>
        <el-table-column prop="cargoWeight" sortable label="发货人" width="120">
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
        <el-table-column prop="shipSn" label="运单号" fixed width="120">
        </el-table-column>
        <el-table-column prop="shipGoodsSn" sortable label="货号" width="120">
        </el-table-column>
        <el-table-column prop="amount" sortable label="运费合计" width="120">
        </el-table-column>
        <el-table-column prop="onPay" sortable label="现付" width="120">
        </el-table-column>
        <el-table-column prop="arrivalPay" sortable label="到付" width="120">
        </el-table-column>
        <el-table-column prop="backPay" sortable label="回单付" width="120">
        </el-table-column>
        <el-table-column prop="monthPay" sortable label="月结" width="120">
        </el-table-column>
        <el-table-column prop="shipGoodsSn" sortable label="出发城市" width="120">
        </el-table-column>
        <el-table-column prop="shipGoodsSn" sortable label="到达城市" width="120">
        </el-table-column>
        <el-table-column prop="cargoName" sortable label="货品名" width="120">
        </el-table-column>
        <el-table-column prop="repertoryAmount" sortable label="件数" width="120">
        </el-table-column>
        <el-table-column prop="repertoryWeight" sortable label="重量" width="120">
        </el-table-column>
        <el-table-column prop="repertoryVolume" sortable label="体积" width="120">
        </el-table-column>
        <el-table-column prop="cargoAmount" sortable label="发货方" width="120">
        </el-table-column>
        <el-table-column prop="cargoWeight" sortable label="发货人" width="120">
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
import querySelect from '@/components/querySelect/index'
import transferTable from '@/components/transferTable'
import { objectMerge2 } from '@/utils/index'
import { getOrderShipList } from '@/api/finance/settleLog'
export default {
  data() {
    return {
      tablekey: '',
      loadTruck: '',
      truckMessage: '',
      searchForm: {},
      loadTruck: 'loadTruckOne',
      incomePayType: 'PAYABLE',
      paymentsType: 1, // 收支类型, 0 收入, 1 支出
      loading: false,
      btnsize: 'mini',
      selectedRight: [],
      selectedLeft: [],
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
    querySelect
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
      if (this.isModify) {
        this.leftTable = this.orgData.left
        this.rightTable = this.orgData.right
        this.$emit('loadTable', this.rightTable)
      } else {
        getOrderShipList(this.otherinfo.orgid, this.incomePayType, this.paymentsType).then(data => {
          this.leftTable = data
          this.$emit('loadTable', this.rightTable)
        })
      }
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
.tableHeadItemBtn {
  height: 100%;
  position: relative;
  .tableHeadItemForm{
    position:absolute;
    z-index:2;
    top:-41px;
    left:-10px;
    display:flex;
    flex-direction: row;
    .el-input {
      width: 125px;
      .el-input__inner{
        padding: 0 10px;
      }
    }
  }
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
