<template>
  <!-- 批次支出 -->
  <transferTable v-loading="loading">
    <div slot="tableSearch" class="tableHeadItemForm clearfix">
      <!-- 搜索左边表格 -->
      <currentSearch :info="countOrgLeftTable" @change="getSearch" :getSettlementId="settlementId" @setSettlementId="setSettlementId"></currentSearch>
    </div>
    <!-- 左边表格区 批次支出 -->
    <div style="height:100%;" slot="tableLeft" class="tableHeadItemBtn">
      <el-button class="tableAllBtn" size="mini" @click="addALLList"></el-button>
      <el-table :key="tablekey" v-if="showtable" ref="multipleTableRight" :data="leftTable" border @row-click="clickDetailsRight" @selection-change="getSelectionRight" tooltip-effect="dark" triped height="100%" :summary-method="getSumRight" :default-sort="{prop: 'id', order: 'ascending'}" :show-overflow-tooltip="true" :show-summary="true" @row-dblclick="dclickAddItem">
        <el-table-column fixed type="index" width="60" label="序号">
        </el-table-column>
        <el-table-column fixed width="50">
          <template slot-scope="scope">
            <el-button class="tableItemBtn" size="mini" @click="addItem(scope.row, scope.$index)"></el-button>
          </template>
        </el-table-column>
        <el-table-column label="发车批次" prop="batchNo" fixed width="120">
        </el-table-column>
        <el-table-column prop="truckIdNumber" sortable label="车牌号" width="100">
        </el-table-column>
        <el-table-column prop="driverName" sortable label="司机" width="120">
        </el-table-column>
        <!-- <el-table-column prop="loadFeeTotalActual" sortable label="实际合计" width="120">
        </el-table-column> -->
        <el-table-column prop="shortPay" sortable label="短驳费" width="120" v-if="settlementId===180">
        </el-table-column>
        <el-table-column prop="noShortPay" sortable label="未核销短驳费" width="120" v-if="settlementId===180">
          <template slot-scope="scope">
            <span v-html="_setTextColor(scope.row.shortPay, scope.row.hadShortPay, scope.row.noShortPay, scope.row.noShortPay)"></span>
          </template>
        </el-table-column>
        <el-table-column prop="hadShortPay" sortable label="已核销短驳费" width="120" v-if="settlementId===180">
          <template slot-scope="scope">
            <span v-html="_setTextColor(scope.row.shortPay, scope.row.hadShortPay, scope.row.noShortPay, scope.row.hadShortPay)"></span>
          </template>
        </el-table-column>
        <el-table-column prop="sendPay" sortable label="送货费" width="120" v-if="settlementId===181">
        </el-table-column>
        <el-table-column prop="noSendPay" sortable label="未核销送货费" width="120" v-if="settlementId===181">
          <template slot-scope="scope">
            <span v-html="_setTextColor(scope.row.sendPay, scope.row.hadSendPay, scope.row.noSendPay, scope.row.noSendPay)"></span>
          </template>
        </el-table-column>
        <el-table-column prop="hadSendPay" sortable label="已核销送货费" width="120" v-if="settlementId===181">
          <template slot-scope="scope">
            <span v-html="_setTextColor(scope.row.sendPay, scope.row.hadSendPay, scope.row.noSendPay, scope.row.hadSendPay)"></span>
          </template>
        </el-table-column>
        <el-table-column prop="departTotal" sortable label="发车汇总" width="100" v-if="settlementId===179">
        </el-table-column>
        <!-- <el-table-column prop="departTotalActual" sortable label="发车汇总实际支出" width="140" v-if="settlementId===179">
        </el-table-column> -->
        <el-table-column prop="noDepartTotal" sortable label="未核销发车汇总" width="120" v-if="settlementId===179">
          <template slot-scope="scope">
            <span v-html="_setTextColor(scope.row.departTotal, scope.row.hadDepartTotal, scope.row.noDepartTotal, scope.row.noDepartTotal)"></span>
          </template>
        </el-table-column>
        <el-table-column prop="hadDepartTotal" sortable label="已核销发车汇总" width="120" v-if="settlementId===179">
          <template slot-scope="scope">
            <span v-html="_setTextColor(scope.row.departTotal, scope.row.hadDepartTotal, scope.row.noDepartTotal, scope.row.hadDepartTotal)"></span>
          </template>
        </el-table-column>
        <el-table-column prop="arriveTotal" sortable label="到车汇总" width="100" v-if="settlementId===179">
        </el-table-column>
        <!--  <el-table-column prop="arriveTotalActual" sortable label="到车汇总实际支出" width="140" v-if="settlementId===179">
        </el-table-column> -->
        <el-table-column prop="noArriveTotal" sortable label="未核销到车汇总" width="120" v-if="settlementId===179">
          <template slot-scope="scope">
            <span v-html="_setTextColor(scope.row.arriveTotal, scope.row.hadArriveTotal, scope.row.noArriveTotal, scope.row.noArriveTotal)"></span>
          </template>
        </el-table-column>
        <el-table-column prop="hadArriveTotal" sortable label="已核销到车汇总" width="120" v-if="settlementId===179">
          <template slot-scope="scope">
            <span v-html="_setTextColor(scope.row.arriveTotal, scope.row.hadArriveTotal, scope.row.noArriveTotal, scope.row.hadArriveTotal)"></span>
          </template>
        </el-table-column>
        <!--  <el-table-column prop="othePay" sortable label="其他费用" width="120">
        </el-table-column>
        <el-table-column prop="noOthePay" sortable label="未核销其他费用" width="120">
          <template slot-scope="scope">
            <span v-html="_setTextColor(scope.row.othePay, scope.row.hadOthePay, scope.row.noOthePay, scope.row.noOthePay)"></span>
          </template>
        </el-table-column>
        <el-table-column prop="hadOthePay" sortable label="已核销其他费用" width="120">
          <template slot-scope="scope">
            <span v-html="_setTextColor(scope.row.othePay, scope.row.hadOthePay, scope.row.noOthePay, scope.row.hadOthePay)"></span>
          </template>
        </el-table-column> -->
        <el-table-column prop="operationPay" sortable label="操作费" width="120" v-if="settlementId!==181">
        </el-table-column>
        <el-table-column prop="noOperationPay" sortable label="未核销操作费" width="120" v-if="settlementId!==181">
          <template slot-scope="scope">
            <span v-html="_setTextColor(scope.row.operationPay, scope.row.hadOperationPay, scope.row.noOperationPay, scope.row.noOperationPay)"></span>
          </template>
        </el-table-column>
        <el-table-column prop="hadOperationPay" sortable label="已核销操作费" width="120" v-if="settlementId!==181">
          <template slot-scope="scope">
            <span v-html="_setTextColor(scope.row.operationPay, scope.row.hadOperationPay, scope.row.noOperationPay, scope.row.hadOperationPay)"></span>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="startLoadPay" sortable label="发站装卸费" width="120" v-if="settlementId===179">
        </el-table-column>
        <el-table-column prop="noStartLoadPay" sortable label="未核销发站装卸费" width="120" v-if="settlementId===179">
        </el-table-column>
        <el-table-column prop="hadStartLoadPay" sortable label="已核销发站装卸费" width="120" v-if="settlementId===179">
        </el-table-column>
        <el-table-column prop="startOtherPay" sortable label="发站其他费" width="120" v-if="settlementId===179">
        </el-table-column>
        <el-table-column prop="noStartOtherPay" sortable label="未核销发站其他费" width="120" v-if="settlementId===179">
        </el-table-column>
        <el-table-column prop="hadStartOtherPay" sortable label="已核销发站其他费" width="120" v-if="settlementId===179">
        </el-table-column>
        <el-table-column prop="endLoadPay" sortable label="到站装卸费" width="120" v-if="settlementId===179">
        </el-table-column>
        <el-table-column prop="noEndLoadPay" sortable label="未核销到站装卸费" width="120" v-if="settlementId===179">
        </el-table-column>
        <el-table-column prop="hadEndLoadPay" sortable label="已核销到站装卸费" width="120" v-if="settlementId===179">
        </el-table-column>
        <el-table-column prop="endOtherPay" sortable label="到站其他费" width="120" v-if="settlementId===179">
        </el-table-column>
        <el-table-column prop="noEndOtherPay" sortable label="未核销到站其他费" width="120" v-if="settlementId===179">
        </el-table-column>
        <el-table-column prop="hadEndOtherPay" sortable label="已核销到站其他费" width="120" v-if="settlementId===179">
        </el-table-column>
        <el-table-column prop="wholeSurePay" sortable label="整车保险费" width="120" v-if="settlementId===179">
        </el-table-column>
        <el-table-column prop="noWholeSurePay" sortable label="未核销整车保险费" width="120" v-if="settlementId===179">
        </el-table-column>
        <el-table-column prop="hadWholeSurePay" sortable label="已核销整车保险费" width="120" v-if="settlementId===179">
        </el-table-column> -->
        <el-table-column prop="departureTime" sortable label="送货时间" width="160" v-if="settlementId===181">
        </el-table-column>
        <el-table-column prop="requireArrivedTime" sortable label="到达时间" width="160" v-if="settlementId===181">
        </el-table-column>
        <el-table-column prop="departureTime" sortable label="发车时间" width="160" v-if="settlementId===179">
        </el-table-column>
        <el-table-column prop="receivingTime" sortable label="到车时间" width="160" v-if="settlementId!==181">
        </el-table-column>
        <el-table-column prop="orgName" sortable label="发车网点" width="120" v-if="settlementId!==181">
        </el-table-column>
        <el-table-column prop="arriveOrgName" sortable label="到车网点" width="120" v-if="settlementId!==181">
        </el-table-column>
        <el-table-column prop="remark" sortable label="备注">
        </el-table-column>
      </el-table>
    </div>
    <!-- 右边表格区 -->
    <div slot="tableRight" class="tableHeadItemBtn">
      <el-button class="tableAllBtnMinus" size="mini" @click="minusAllList"></el-button>
      <el-table :key="tablekeyRight" v-if="showtable" ref="multipleTableLeft" @row-dblclick="dclickMinusItem" :data="rightTable" border @row-click="clickDetailsLeft" @selection-change="getSelectionLeft" tooltip-effect="dark" triped height="100%" :summary-method="getSumLeft" :default-sort="{prop: 'id', order: 'ascending'}" :show-summary='true' style="height:100%;">
        <el-table-column fixed type="index" width="60" label="序号">
        </el-table-column>
        <el-table-column fixed width="50">
          <template slot-scope="scope">
            <el-button class="tableItemBtnMinus" size="mini" @click="minusItem(scope.row, scope.$index)"></el-button>
          </template>
        </el-table-column>
        <el-table-column label="发车批次" fixed prop="batchNo" width="120">
        </el-table-column>
        <el-table-column prop="truckIdNumber" sortable label="车牌号" width="120">
        </el-table-column>
        <el-table-column prop="driverName" sortable label="司机" width="120">
        </el-table-column>
        <el-table-column prop="loadFeeTotalActual" sortable label="实际合计" width="120">
        </el-table-column>
        <el-table-column prop="shortPay" sortable label="短驳费" width="120" v-if="settlementId===180">
        </el-table-column>
        <el-table-column prop="noShortPay" sortable label="未核销短驳费" width="120" v-if="settlementId===180">
          <template slot-scope="scope">
            <span v-html="_setTextColor(scope.row.shortPay, scope.row.hadShortPay, scope.row.noShortPay, scope.row.noShortPay)"></span>
          </template>
        </el-table-column>
        <el-table-column prop="hadShortPay" sortable label="已核销短驳费" width="120" v-if="settlementId===180">
          <template slot-scope="scope">
            <span v-html="_setTextColor(scope.row.shortPay, scope.row.hadShortPay, scope.row.noShortPay, scope.row.hadShortPay)"></span>
          </template>
        </el-table-column>
        <el-table-column prop="sendPay" sortable label="送货费" width="120" v-if="settlementId===181">
        </el-table-column>
        <el-table-column prop="noSendPay" sortable label="未核销送货费" width="120" v-if="settlementId===181">
          <template slot-scope="scope">
            <span v-html="_setTextColor(scope.row.sendPay, scope.row.hadSendPay, scope.row.noSendPay, scope.row.noSendPay)"></span>
          </template>
        </el-table-column>
        <el-table-column prop="hadSendPay" sortable label="已核销送货费" width="120" v-if="settlementId===181">
          <template slot-scope="scope">
            <span v-html="_setTextColor(scope.row.sendPay, scope.row.hadSendPay, scope.row.noSendPay, scope.row.hadSendPay)"></span>
          </template>
        </el-table-column>
        <el-table-column prop="departTotal" sortable label="发车汇总" width="100" v-if="settlementId===179">
        </el-table-column>
        <el-table-column prop="departTotalActual" sortable label="发车汇总实际支出" width="140" v-if="settlementId===179">
        </el-table-column>
        <el-table-column prop="noDepartTotal" sortable label="未核销发车汇总" width="120" v-if="settlementId===179">
          <template slot-scope="scope">
            <span v-html="_setTextColor(scope.row.departTotal, scope.row.hadDepartTotal, scope.row.noDepartTotal, scope.row.noDepartTotal)"></span>
          </template>
        </el-table-column>
        <el-table-column prop="hadDepartTotal" sortable label="已核销发车汇总" width="120" v-if="settlementId===179">
          <template slot-scope="scope">
            <span v-html="_setTextColor(scope.row.departTotal, scope.row.hadDepartTotal, scope.row.noDepartTotal, scope.row.hadDepartTotal)"></span>
          </template>
        </el-table-column>
        <el-table-column prop="arriveTotal" sortable label="到车汇总" width="100" v-if="settlementId===179">
        </el-table-column>
        <el-table-column prop="arriveTotalActual" sortable label="到车汇总实际支出" width="140" v-if="settlementId===179">
        </el-table-column>
        <el-table-column prop="noArriveTotal" sortable label="未核销到车汇总" width="120" v-if="settlementId===179">
          <template slot-scope="scope">
            <span v-html="_setTextColor(scope.row.arriveTotal, scope.row.hadArriveTotal, scope.row.noArriveTotal, scope.row.noArriveTotal)"></span>
          </template>
        </el-table-column>
        <el-table-column prop="hadArriveTotal" sortable label="已核销到车汇总" width="120" v-if="settlementId===179">
          <template slot-scope="scope">
            <span v-html="_setTextColor(scope.row.arriveTotal, scope.row.hadArriveTotal, scope.row.noArriveTotal, scope.row.hadArriveTotal)"></span>
          </template>
        </el-table-column>
        <!--  <el-table-column prop="othePay" sortable label="其他费用" width="120">
        </el-table-column>
        <el-table-column prop="noOthePay" sortable label="未核销其他费用" width="120">
          <template slot-scope="scope">
            <span v-html="_setTextColor(scope.row.othePay, scope.row.hadOthePay, scope.row.noOthePay, scope.row.noOthePay)"></span>
          </template>
        </el-table-column>
        <el-table-column prop="hadOthePay" sortable label="已核销其他费用" width="120">
          <template slot-scope="scope">
            <span v-html="_setTextColor(scope.row.othePay, scope.row.hadOthePay, scope.row.noOthePay, scope.row.hadOthePay)"></span>
          </template>
        </el-table-column> -->
        <el-table-column prop="operationPay" sortable label="操作费" width="120" v-if="settlementId!==181">
        </el-table-column>
        <el-table-column prop="noOperationPay" sortable label="未核销操作费" width="120" v-if="settlementId!==181">
          <template slot-scope="scope">
            <span v-html="_setTextColor(scope.row.operationPay, scope.row.hadOperationPay, scope.row.noOperationPay, scope.row.noOperationPay)"></span>
          </template>
        </el-table-column>
        <el-table-column prop="hadOperationPay" sortable label="已核销操作费" width="120" v-if="settlementId!==181">
          <template slot-scope="scope">
            <span v-html="_setTextColor(scope.row.operationPay, scope.row.hadOperationPay, scope.row.noOperationPay, scope.row.hadOperationPay)"></span>
          </template>
        </el-table-column>
        <el-table-column prop="operationPayActual" sortable label="实际核销操作费" width="120" v-if="settlementId!==181">
        </el-table-column>
        <!-- 
        <el-table-column prop="sendPay" sortable label="送货费" width="120" v-if="settlementId===181">
        </el-table-column>
        <el-table-column prop="noSendPay" sortable label="未核销送货费" width="120" v-if="settlementId===181">
        </el-table-column>
        <el-table-column prop="hadSendPay" sortable label="已核销送货费" width="120" v-if="settlementId===181">
        </el-table-column>
        <el-table-column prop="loadFeeTotal" sortable label="发车汇总" width="120" v-if="settlementId===179">
        </el-table-column>
        <el-table-column prop="noLoadFeeTotal" sortable label="未核销发车汇总" width="120" v-if="settlementId===179">
        </el-table-column>
        <el-table-column prop="hadLoadFeeTotal" sortable label="已核销发车汇总" width="120" v-if="settlementId===179">
        </el-table-column>
        <el-table-column prop="loadFeeTotal" sortable label="到车汇总" width="120" v-if="settlementId===179">
        </el-table-column>
        <el-table-column prop="noLoadFeeTotal" sortable label="未核销到车汇总" width="120" v-if="settlementId===179">
        </el-table-column>
        <el-table-column prop="hadLoadFeeTotal" sortable label="已核销到车汇总" width="120" v-if="settlementId===179">
        </el-table-column> -->
        <!--  <el-table-column prop="startLoadPay" sortable label="发站装卸费" width="120" v-if="settlementId===179">
        </el-table-column>
        <el-table-column prop="noStartLoadPay" sortable label="未核销发站装卸费" width="120" v-if="settlementId===179">
        </el-table-column>
        <el-table-column prop="hadStartLoadPay" sortable label="已核销发站装卸费" width="120" v-if="settlementId===179">
        </el-table-column>
        <el-table-column prop="startOtherPay" sortable label="发站其他费" width="120" v-if="settlementId===179">
        </el-table-column>
        <el-table-column prop="noStartOtherPay" sortable label="未核销发站其他费" width="120" v-if="settlementId===179">
        </el-table-column>
        <el-table-column prop="hadStartOtherPay" sortable label="已核销发站其他费" width="120" v-if="settlementId===179">
        </el-table-column>
        <el-table-column prop="endLoadPay" sortable label="到站装卸费" width="120" v-if="settlementId===179">
        </el-table-column>
        <el-table-column prop="noEndLoadPay" sortable label="未核销到站装卸费" width="120" v-if="settlementId===179">
        </el-table-column>
        <el-table-column prop="hadEndLoadPay" sortable label="已核销到站装卸费" width="120" v-if="settlementId===179">
        </el-table-column>
        <el-table-column prop="endOtherPay" sortable label="到站其他费" width="120" v-if="settlementId===179">
        </el-table-column>
        <el-table-column prop="noEndOtherPay" sortable label="未核销到站其他费" width="120" v-if="settlementId===179">
        </el-table-column>
        <el-table-column prop="hadEndOtherPay" sortable label="已核销到站其他费" width="120" v-if="settlementId===179">
        </el-table-column>
        <el-table-column prop="wholeSurePay" sortable label="整车保险费" width="120" v-if="settlementId===179">
        </el-table-column>
        <el-table-column prop="noWholeSurePay" sortable label="未核销整车保险费" width="120" v-if="settlementId===179">
        </el-table-column>
        <el-table-column prop="hadWholeSurePay" sortable label="已核销整车保险费" width="120" v-if="settlementId===179">
        </el-table-column> -->
        <el-table-column prop="departureTime" sortable label="送货时间" width="160" v-if="settlementId===181">
        </el-table-column>
        <el-table-column prop="departureTime" sortable label="发车时间" width="160" v-if="settlementId===179">
        </el-table-column>
        <el-table-column prop="receivingTime" sortable label="到车时间" width="160" v-if="settlementId!==181">
        </el-table-column>
        <el-table-column prop="orgName" sortable label="发车网点" width="120" v-if="settlementId!==181">
        </el-table-column>
        <el-table-column prop="arriveOrgName" sortable label="到车网点" width="120" v-if="settlementId!==181">
        </el-table-column>
        <el-table-column prop="remark" sortable label="备注">
        </el-table-column>
      </el-table>
    </div>
  </transferTable>
</template>
<script>
import { mapGetters } from 'vuex'
import querySelect from '@/components/querySelect/index'
import transferTable from '@/components/transferTable'
import { objectMerge2, parseTime } from '@/utils/index'
import { getOrderList } from '@/api/finance/financeDaily'
import currentSearch from './currentSearch'
import { getSummaries, tmsMath } from '@/utils/'
export default {
  data() {
    return {
      showtable: true,
      loading: true,
      searchTime: [parseTime(new Date() - 60 * 24 * 60 * 60 * 1000), parseTime(new Date())],
      tablekey: 0,
      tablekeyRight: 0,
      truckMessage: '',
      searchForm: {},
      incomePayType: 'PAYABLE', // RECEIVABLE-运单收入费用项 PAYABLE-运单支出费用项
      paymentsType: 1, // 收支类型, 0 收入, 1 支出
      settlementId: 179, // 178-运单核销 179-干线批次核销 180-短驳核销 181-送货核销
      loading: false,
      btnsize: 'mini',
      selectedRight: [],
      selectedLeft: [],
      orgLeftTable: [],
      leftTable: [],
      rightTable: [],
      countOrgLeftTable: [],
      FEE_TYPE: {
        179: 'loadFeeTotal',
        180: 'shortPay',
        181: 'sendPay'
      },
      // feeName: '',
      orgData: {
        left: [],
        right: []
      },
      arrLastPartActualFeeName: [],
      arrLastPartNoFeeName: [],
      arrLastPartFeeName: [], // 左边添加一条数据的所有部分核销的费用字段名
      arrNoPayName: [],
      arrPayName: [],
      arrPayNameActual: []
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
      type: [Number, String]
    },
    getSettlementId: {
      type: [Number, String]
    },
    orgId: {
      type: [Number, String]
    },
    componentKey: {
      type: [Number, String]
    },
    fiOrderType: {
      type: [Number, String]
    }
  },
  computed: {
    ...mapGetters([
      'otherinfo'
    ]),
    feeName: {
      get() {
        return this.FEE_TYPE[this.settlementId]
      },
      set() {
        return ''
      }
    }
  },
  components: {
    transferTable,
    querySelect,
    currentSearch
  },
  watch: {
    isModify: {
      get() {
        if (this.isModify) {
          // this.getList()
        }
      },
      set() {}
    },
    setLoadTable: { // 深度监听数组变换
      handler(cval, oval) {
        if (cval) {
          this.orgData = Object.assign({}, cval)
          // this.getList()
        }
      },
      deep: true
    },
    countSuccessList: {
      handler(cval, oval) {
        this.initCount(cval, oval) // 智能核销返回的数据
      },
      deep: true
    },
    getSettlementId: {
      handler(cval, oval) {
        if (cval) {
          this.changeTableKey()
          this.settlementId = cval
          this.getList()
        }
      },
      deep: true
    },
    fiOrderType: {
      handler(cval, oval) {
        console.log('fiOrderType', cval, oval)
      },
      deep: true
    }
  },
  // mounted() {
  //   this.getPayName()
  // },
  activated() {
    this.getPayName()
    this.getList()
  },
  methods: {
    getPayName() {
      if (this.rightTable.length !== 0) {
        this.arrNoPayName = [] // 未核销费用项字段名
        for (const item in this.rightTable[0]) {
          if (item.indexOf('no') === 0) { // 获取开头为no的字符串字段名
            this.arrNoPayName.push(item)
          }
        }
        // console.log('=====未核销费用项字段名', this.arrNoPayName)

        this.arrPayName = [] // 费用项字段名
        for (const item in this.arrNoPayName) {
          const str = this.arrNoPayName[item].substring(2, 3).toLowerCase() + this.arrNoPayName[item].substring(3) // 截取no后面的字符串，并将首字母大写转成小写
          this.arrPayName.push(str)
        }
        // console.log('=====费用项字段名', this.arrPayName)

        this.arrhadPayName = [] // 已核销费用项字段名
        for (const item in this.arrNoPayName) {
          const str = 'had' + this.arrNoPayName[item].substring(2) // 截取no后面的字符串，并在前面拼接had
          this.arrhadPayName.push(str)
        }
        // console.log('=====已核销费用项字段名', this.arrhadPayName)

        this.arrPayNameActual = [] // 费用实际支出项字段名
        for (const item in this.arrPayName) {
          const str = this.arrPayName[item] + 'Actual'
          this.arrPayNameActual.push(str)
        }
        // console.log('=====费用实际支出项字段名', this.arrPayNameActual)
        const obj = {
          arrPayName: this.arrPayName,
          arrNoPayName: this.arrNoPayName,
          arrhadPayName: this.arrhadPayName,
          arrPayNameActual: this.arrPayNameActual
        }
        this.$emit('feeName', obj)
      }
    },
    initCount(cval, oval) { // 对智能核销进行操作
      console.log('============后台返回的智能运单=============\n', cval)
      this.arrLastPartActualFeeName = []
      this.arrLastPartNoFeeName = []
      this.arrLastPartFeeName = []
      this.leftTable = []
      this.rightTable = objectMerge2([], cval) // 被智能挑选到的数据 右边表格
      this.$emit('loadTable', this.rightTable)

      if (this.rightTable.length === 0) {
        this.$message({ type: 'warning', message: '无符合智能核销条件的运单。' })
        this.leftTable = objectMerge2([], this.orgLeftTable)
        return false
      }

      this.leftTable = objectMerge2([], this.orgLeftTable).filter((el, index) => { // 左边表格显示的数据
        return this.rightTable.findIndex(e => {
          return el.batchNo === e.batchNo
        }) === -1
      })

      if (this.leftTable.length !== 0) {
        console.log('第一次去重！！！！！')
        this.leftTable = this.uniqueArray(this.leftTable, 'batchNo') // 去重
      }

      this.$emit('loadTable', this.rightTable)
      this.getPayName()
      // // 判断右边表格的数据 合计是否为智能核销中输入的值
      const listCount = 0
      const countDifference = 0
      // let feeName = this.FEE_TYPE[this.settlementId] // 当前列表费用名

      // 判断返回的数据 实际核销支出费用等于 未核销费用
      // 前者等于 | 小于后者 不用进行操作
      // 前者大于否则 的时候 左边要添加右边的最后一条数据并且显示核销多余的数

      const nameFlag = '' // 右边最后一条的批次号或者运单号
      let isCopyLastData = false // 左边是否需要复制一条右边最后那条数据  true-要复制 false-不复制
      this.arrPayNameActual.forEach((el, actIndex) => {
        const feeActual = this.rightTable[this.rightTable.length - 1][el] // 实际费用
        const feeNo = this.rightTable[this.rightTable.length - 1][this.arrNoPayName[actIndex]] // 未核销费用
        if (feeNo !== feeActual && feeNo !== '' && feeNo !== null && feeActual !== '' && feeActual !== null && typeof feeNo === typeof feeActual) { // 判断实际费用是否等于未核销费用
          isCopyLastData = true
          this.arrLastPartFeeName.push(this.arrPayName[actIndex]) // 保存部分核销的字段，以便左边添加数据
          this.arrLastPartActualFeeName.push(el)
          this.arrLastPartNoFeeName.push(this.arrNoPayName[actIndex])
        }
      })
      if (this.rightTable[this.rightTable.length - 1].loadFeeTotal !== this.rightTable[this.rightTable.length - 1].loadFeeTotalActual) {
        this.$notify.info({ title: '提示', message: '最后一条数据实际只需支付部分未核销费用，多余的需要返回到左边列表！' })
        isCopyLastData = true
        this.arrLastPartFeeName.push('loadFeeTotal')
        this.arrLastPartActualFeeName.push('loadFeeTotalActual')
      } else {
        isCopyLastData = false
      }

      if (isCopyLastData) { // true-给左边添加一条数据，并修改相关未核销费用
        this.leftTable.push(objectMerge2([], this.rightTable[this.rightTable.length - 1]))
        this.arrLastPartFeeName.forEach(e => { // 左边最后一条 未核销=未核销-实际
          const noFeeName = 'no' + e.substring(0, 1).toUpperCase() + e.substring(1) // 未核销费用名
          const feeNameActual = e + 'Actual' // 实际费用名
          this.leftTable[this.leftTable.length - 1][feeNameActual] = this.rightTable[this.rightTable.length - 1][noFeeName] - this.rightTable[this.rightTable.length - 1][feeNameActual]
          this.leftTable[this.leftTable.length - 1].loadFeeTotalActual = this.rightTable[this.rightTable.length - 1].loadFeeTotal - this.rightTable[this.rightTable.length - 1].loadFeeTotalActual
        })
      }
      // 需要回传的rightTable
      // let actualRightTable = objectMerge2([], this.rightTable).forEach((e, index) => { // 设置需要回传的右边列表 需求：费用-未核销
      //   this.arrPayName.forEach((el, payIndex) => {
      //     e[el] = e[this.arrNoPayName[payIndex]]
      //   })
      // })
      // this.$emit('loadTable', actualRightTable)

      this.$emit('loadTable', this.rightTable)
      this.countOrgLeftTable = objectMerge2([], this.leftTable)
      console.log(this.countOrgLeftTable.length)
    },
    uniqueArray(array, key, fee) { // 去重算法 fee-需要合并值的字段 key-合并判断标识 array-数据列
      const result = [array[0]]
      for (let i = 1; i < array.length; i++) {
        const item = array[i]
        let repeat = false
        for (let j = 0; j < result.length; j++) {
          if (item[key] === result[j][key]) {
            if (fee) {
              for (const k in fee) {
                result[j][fee[k]] = tmsMath._add(item[fee[k]], result[j][fee[k]])
              }
            }
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
    getList() {
      this.leftTable = this.$options.data().leftTable
      this.rightTable = this.$options.data().rightTable
      this.orgLeftTable = this.$options.data().orgLeftTable
      this.countOrgLeftTable = this.$options.data().countOrgLeftTable
      let obj = {}
      if (this.isModify) {
        this.leftTable = this.orgData.left
        this.orgLeftTable = this.orgData.left
        this.rightTable = this.orgData.right
        this.countOrgLeftTable = this.orgData.left
        this.$emit('loadTable', this.rightTable)
      } else {
        this.$set(obj, 'orgId', this.orgId)
        // this.$set(obj, 'incomePayType', this.incomePayType)
        this.$set(obj, 'paymentsType', this.paymentsType)
        // this.$set(obj, 'settlementId', this.settlementId)
        this.$set(obj, 'startTime', parseTime(this.searchTime[0], '{y}-{m}-{d} ') + '00:00:00')
        this.$set(obj, 'endTime', parseTime(this.searchTime[1], '{y}-{m}-{d} ') + '23:59:59')
        this.$set(obj, 'autoTotalAmount', '')
        this.$set(obj, 'feeId', '')
        this.$set(obj, 'fiOrderType', this.fiOrderType) // 财务订单类型 0-运单；1-干线；2-短驳；3-送货
        getOrderList(obj).then(data => {
          this.loading = false
          this.leftTable = data
          this.orgLeftTable = data
          this.countOrgLeftTable = data
          this.$emit('loadTable', this.rightTable)
        }).catch((err) => {
          this.loading = false
          this._handlerCatchMsg(err)
        })
        obj = {}
      }
    },
    setSettlementId(val) {
      if (val) {
        this.showtable = false
        this.settlementId = val
        this.changeTableKey()
        console.warn('切换tableKey', this.tableKey, this.tablekeyRight)
        this.rightTable = this.$options.data().rightTable
        // this.getList() // 重新获取列表
        this.$emit('setSettlementId', this.settlementId)
        this.$nextTick(() => {
          this.showtable = true
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
      this.tablekey = new Date().getTime()
      this.tablekeyRight = new Date().getTime()
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
          // this.rightTable = objectMerge2([], this.rightTable).filter(el => {
          //   return el.batchNo !== e.batchNo
          // })
          this.leftTable = objectMerge2([], this.leftTable).filter(el => { // 源数据减去被穿梭的数据
            return el.batchNo !== e.batchNo
          })
          this.rightTable.push(e)
          // this.orgLeftTable = objectMerge2([], this.orgLeftTable).filter(el => { // 搜索源数据减去被穿梭的数据
          //   return el.batchNo !== e.batchNo
          // })
          this.countOrgLeftTable = objectMerge2([], this.countOrgLeftTable).filter(el => { // 搜索源数据减去被穿梭的数据
            return el.batchNo !== e.batchNo
          })
        })

        this.rightTable = this.uniqueArray(objectMerge2(this.rightTable), 'batchNo', this.arrLastPartActualFeeName) // 去重并合并合计的值
        // this.changeTableKey() // 刷新表格视图
        this.selectedRight = [] // 清空选择列表
        this.getPayName()
        this.$emit('loadTable', this.rightTable)
        console.log('-', this.countOrgLeftTable.length)
      }
    },
    goRight() { // 数据从右边穿梭到左边
      if (this.selectedLeft.length === 0) {
        this.$message({ type: 'warning', message: '请在右边表格选择数据' })
      } else {
        this.selectedLeft.forEach((e, index) => {
          // this.leftTable = objectMerge2([], this.leftTable).filter(el => {
          //   return el.batchNo !== e.batchNo
          // })
          // this.countOrgLeftTable = objectMerge2( [], this.countOrgLeftTable).filter(el=>{
          //   return el.batchNo !== e.batchNo
          // })
          this.leftTable.push(e)
          this.countOrgLeftTable.push(e)
          // this.orgLeftTable.push(e)
          this.rightTable = objectMerge2([], this.rightTable).filter(el => {
            return el.batchNo !== e.batchNo
          })
        })
        this.leftTable = this.uniqueArray(objectMerge2(this.leftTable), 'batchNo', this.arrLastPartActualFeeName) // 去重并合并合计的值
        this.countOrgLeftTable = this.uniqueArray(objectMerge2(this.countOrgLeftTable), 'batchNo', this.arrLastPartActualFeeName) // 去重
        // this.changeTableKey() // 刷新表格视图
        this.selectedLeft = [] // 清空选择列表
        this.getPayName()
        this.$emit('loadTable', this.rightTable)
        console.log('+', this.countOrgLeftTable.length)
      }
    },
    addItem(row, index) { // 添加单行
      clearTimeout(this.addTimer)
      this.addTimer = setTimeout(() => {
        this.selectedRight = []
        this.selectedRight[index] = row
        this.doAction('goLeft')
      }, 50)
    },
    minusItem(row, index) { // 减去单行
      clearTimeout(this.minusTimer)
      this.minusTimer = setTimeout(() => {
        this.selectedLeft = []
        this.selectedLeft[index] = row
        this.doAction('goRight')
      }, 50)
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
      const propsArr = ['shortPay', 'sendPay', 'loadFeeTotal', 'startLoadPay', 'startOtherPay', 'endLoadPay', 'endOtherPay', 'repertoryAmount', 'loadFeeTotalActual', 'wholeSurePay', 'noShortPay', 'hadShortPay', 'noSendPay', 'hadSendPay', 'noLoadFeeTotal', 'hadLoadFeeTotal', 'noStartLoadPay', 'hadStartLoadPay', 'noStartOtherPay', 'hadStartOtherPay', 'noEndLoadPay', 'hadEndLoadPay', 'noEndOtherPay', 'hadEndOtherPay', 'noWholeSurePay', 'hadWholeSurePay', 'departTotal', 'departTotalActual', 'noDepartTotal', 'hadDepartTotal', 'arriveTotal', 'arriveTotalActual', 'noArriveTotal', 'hadArriveTotal', 'operationPay', 'noOperationPay', 'hadOperationPay']
      return getSummaries(param, propsArr)
    },
    getSumLeft(param) { // 左边表格合计-自定义显示
      const propsArr = ['shortPay', 'sendPay', 'loadFeeTotal', 'startLoadPay', 'startOtherPay', 'endLoadPay', 'endOtherPay', 'repertoryAmount', 'loadFeeTotalActual', 'wholeSurePay', 'noShortPay', 'hadShortPay', 'noSendPay', 'hadSendPay', 'noLoadFeeTotal', 'hadLoadFeeTotal', 'noStartLoadPay', 'hadStartLoadPay', 'noStartOtherPay', 'hadStartOtherPay', 'noEndLoadPay', 'hadEndLoadPay', 'noEndOtherPay', 'hadEndOtherPay', 'noWholeSurePay', 'hadWholeSurePay', 'departTotal', 'departTotalActual', 'noDepartTotal', 'hadDepartTotal', 'arriveTotal', 'arriveTotalActual', 'noArriveTotal', 'hadArriveTotal', 'operationPay', 'noOperationPay', 'hadOperationPay', 'operationPayActual']
      return getSummaries(param, propsArr)
    }
  }
}

</script>
<style lang="scss">
.tableHeadItemForm {
  margin-left: 5px;
  display: flex;
  flex-direction: row;
  .el-select {
    width: 100px;
    .el-input {
      width: 100px;
    }
  }
  .el-input {
    width: 125px;
    .el-input__inner {
      padding: 0 10px;
    }
  }
}

.tableHeadItemBtn {
  height: 100%;
  position: relative; // .tableHeadItemForm{
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
    left: 77px;
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
