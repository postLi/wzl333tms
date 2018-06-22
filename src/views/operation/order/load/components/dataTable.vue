<template>
  <transferTable>
    <!-- 左边表格区 -->
    <div slot="tableLeft" class="tableHeadItemBtn">
      <el-button icon="el-icon-plus" class="tableAllBtn" size="mini" @click="addALLList"></el-button>
      <el-table ref="multipleTableRight" 
      :data="leftTable" border 
      @row-click="clickDetailsRight"
       @selection-change="getSelectionRight" 
       tooltip-effect="dark" triped :key="tablekey" 
       height="100%" style="height:100%;"
       :summary-method="getSumRight" :default-sort="{prop: 'id', order: 'ascending'}" 
       :show-summary="true">
        <el-table-column fixed type="index" width="50">
        </el-table-column>
        <el-table-column fixed width="50">
          <template slot-scope="scope">
            <el-button icon="el-icon-plus" class="tableItemBtn" size="mini" @click="addItem(scope.row, scope.$index)"></el-button>
          </template>
        </el-table-column>
        <el-table-column fixed prop="shipFromOrgName" label="开单网点" width="80">
        </el-table-column>
        <el-table-column prop="shipSn" label="运单号">
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
        <el-table-column prop="cargoName" sortable label="货品名" width="120">
        </el-table-column>
        <el-table-column prop="shipGoodsSn" sortable label="货号" width="120">
        </el-table-column>
        <el-table-column prop="repertoryAmount" sortable label="库存件数" width="120">
        </el-table-column>
        <el-table-column prop="repertoryWeight" sortable label="库存重量" width="120">
        </el-table-column>
        <el-table-column prop="repertoryVolume" sortable label="库存体积" width="120">
        </el-table-column>
        <el-table-column prop="cargoAmount" sortable label="运单件数" width="120">
        </el-table-column>
        <el-table-column prop="cargoWeight" sortable label="运单重量" width="120">
        </el-table-column>
        <el-table-column prop="cargoVolume" sortable label="运单体积" width="120">
        </el-table-column>
        <el-table-column prop="shipRemarks" sortable label="运单备注" width="120">
        </el-table-column>
      </el-table>
    </div>
    <!-- 右边表格区 -->
    <div slot="tableRight" class="tableHeadItemBtn">
      <el-button icon="el-icon-minus" class="tableAllBtn" size="mini" @click="minusAllList"></el-button>
      <el-table ref="multipleTableLeft" :data="rightTable" border @row-click="clickDetailsLeft" @selection-change="getSelectionLeft" tooltip-effect="dark" triped :key="tablekey" height="100%" :summary-method="getSumLeft" :default-sort="{prop: 'id', order: 'ascending'}" :show-summary='true' style="height:100%;">
        <el-table-column fixed type="index" width="50">
        </el-table-column>
        <el-table-column fixed width="50">
          <template slot-scope="scope">
            <el-button icon="el-icon-minus" class="tableItemBtn" size="mini" @click="minusItem(scope.row, scope.$index)"></el-button>
          </template>
        </el-table-column>
        <el-table-column fixed prop="shipFromOrgName" label="开单网点" width="80">
        </el-table-column>
        <el-table-column prop="shipSn" label="运单号" width="120">
        </el-table-column>
        <el-table-column prop="loadAmount" sortable label="配载件数" width="120">
          <template slot-scope="scope">
            <el-input type="number" v-model.number="scope.row.loadAmount" @change="changLoadAmount[scope.$index]" required></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="loadWeight" sortable label="配载重量" width="120">
          <template slot-scope="scope">
            <el-input type="number" v-model.number="scope.row.loadWeight" @change="changLoadWeight[scope.$index]"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="loadVolume" sortable label="配载体积" width="120">
          <template slot-scope="scope">
            <el-input type="number" v-model.number="scope.row.loadVolume" @change="changLoadVolume[scope.$index]"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="repertoryAmount" sortable label="库存件数" width="120">
        </el-table-column>
        <el-table-column prop="repertoryWeight" sortable label="库存重量" width="120">
        </el-table-column>
        <el-table-column prop="repertoryVolume" sortable label="库存体积" width="120">
        </el-table-column>
        <el-table-column prop="cargoAmount" sortable label="运单件数" width="120">
        </el-table-column>
        <el-table-column prop="cargoWeight" sortable label="运单重量" width="120">
        </el-table-column>
        <el-table-column prop="cargoVolume" sortable label="运单体积" width="120">
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
        <el-table-column prop="cargoName" sortable label="货品名" width="120">
        </el-table-column>
        <el-table-column prop="shipGoodsSn" sortable label="货号" width="120">
        </el-table-column>
      </el-table>
    </div>
  </transferTable>
</template>
<script>
import { mapGetters } from 'vuex'
import { getSelectAddLoadRepertoryList, postLoadInfo } from '@/api/operation/load'
import transferTable from '@/components/transferTable'
export default {
  data() {
    return {
      tablekey: '',
      loadTruck: '',
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
  props: {
    setLoadTable: {
      type: Object,
      default: {}
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
    transferTable
  },
  watch: {
    setLoadTable() {},
    isModify() {}
  },
  mounted() {
    this.getSelectAddLoadRepertoryList()
  },
  methods: {
    getSumRight(param) { // 右边表格合计-自定义显示
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总计'
          return
        }
        if (index === 1 || index === 2 || index === 10) {
          sums[index] = data.length + '单'
          return
        }
        if (index === 3 || index === 4 || index === 5 || index === 6 || index === 7 || index === 8 || index === 9) {
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
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总计'
          return
        }
        if (index === 1 || index === 2) {
          sums[index] = data.length + '单'
          return
        }
        if (index === 12 || index === 13 || index === 14 || index === 15 || index === 16 || index === 17 || index === 18 || index === 19) {
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
    getSelectAddLoadRepertoryList() {
      if (this.isModify) {
        this.leftTable = this.setLoadTable.left
        this.rigthTable = this.setLoadTable.right
        console.log('穿梭框修改时',this.leftTable, this.rightTable)
      } else {
        getSelectAddLoadRepertoryList(this.otherinfo.orgid).then(data => {
          this.leftTable = data.data
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
    changLoadAmount(newVal) { // 修改配载件数
      if (this.rightTable && newVal) {
        this.rightTable.forEach((e) => {
          e.loadAmount = Number(newVal)
        })
      }
      this.$emit('change', this.rightTable)
    },
    changLoadWeight(newVal) { // 修改配载重量
      if (this.rightTable && newVal) {
        this.rightTable.forEach((e) => {
          e.loadWeight = Number(newVal)
          console.log(e.loadWeight, e)
        })
      }
      this.$emit('change', this.rightTable)
      console.log(this.rightTable)
    },
    changLoadVolume(newVal) { // 修改配载体积
      if (this.rightTable && newVal) {
        this.rightTable.forEach((e) => {
          e.loadVolume = Number(newVal)
        })
      }
      this.$emit('change', this.rightTable)
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
          if (item !== -1) {
            // 源数据减去被穿梭的数据
            this.leftTable.splice(item, 1)
          }
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
          this.leftTable.push(e)
          let item = this.rightTable.indexOf(e)
          if (item !== -1) {
            // 源数据减去被穿梭的数据
            this.rightTable.splice(item, 1)
          }
        })
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
    }
  }
}

</script>
<style lang="scss" scoped>
.tableHeadItemBtn {
  display: flex;
  flex-direction: column;
  flex:1;
  height:calc(100vh - 480px);
  position: relative;
  .tableItemBtn {
    width: 30px;
    padding-left: 8px;
  }
  .tableAllBtn {
    width: 30px;
    padding-left: 8px;
    position: absolute;
    z-index: 33;
    top: 8px;
    left: 61px;
  }
  .showAllTable {
    width: calc(100% - 100px);
  }
}

</style>
