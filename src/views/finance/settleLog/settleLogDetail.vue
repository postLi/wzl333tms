<template>
  <!-- 资金流水明细 -->
  <div class="tab-content" v-loading="loading">
    <!-- 搜索 -->
    <SearchForm :orgid="orgId" @change="getSearchParam" :btnsize="btnsize"></SearchForm>
    <!-- 操作按钮 -->
    <div class="tab_info">
      <div class="btns_box">
        <el-button type="danger" :size="btnsize" icon="el-icon-sort" @click="doAction('cancelCount')" plain v-has:FLOW_CANCEL>取消核销</el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-printer" @click="doAction('print')" plain v-has:FLOW_PRI>打印</el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-download" @click="doAction('export')" plain v-has:FLOW_EXP>导出</el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-setting" @click="setTable" class="table_setup" plain>表格设置</el-button>
      </div>
      <!-- 数据表格 -->
      <div class="info_tab">
        <el-table ref="multipleTable" :key="tablekey" :data="dataListTop" stripe border @row-click="clickDetails" @selection-change="getSelection" height="100%" tooltip-effect="dark" style="width:100%;" :default-sort="{prop: 'id', order: 'ascending'}" @cell-dblclick="showDetail">
          <el-table-column fixed sortable type="selection" width="35">
          </el-table-column>
          <template v-for="column in tableColumn">
            <el-table-column :key="column.id" :fixed="column.fixed" sortable :label="column.label" :prop="column.prop" v-if="!column.slot" :width="column.width">
            </el-table-column>
            <el-table-column :key="column.id" :fixed="column.fixed" sortable :label="column.label" v-else :width="column.width">
              <template slot-scope="scope">
                <span class="clickitem" v-if="column.click" v-html="column.slot(scope)" @click.stop="column.click(scope)"></span>
                <span v-else v-html="column.slot(scope)"></span>
              </template>
            </el-table-column>
          </template>
        </el-table>
      </div>
    </div>
    <!-- 分页 -->
    <div class="info_tab_footer">
      共计:{{ total }}
      <div class="show_pager">
        <Pager :total="total" @change="handlePageChange" />
      </div>
    </div>
    <!-- 表格设置弹出框 -->
    <TableSetup :popVisible="setupTableVisible" :columns='tableColumn' @close="closeSetupTable" @success="setColumn"></TableSetup>
    <!-- 核销单 -->
    <Receipt :popVisible="popVisibleDialog" :info="tableReceiptInfo" @close="closeDialog"></Receipt>
  </div>
</template>
<script>
import { objectMerge2, parseTime } from '@/utils/index'
import SearchForm from './components/searchDetail'
import Pager from '@/components/Pagination/index'
import TableSetup from '@/components/tableSetup'
import { postDetailList, postDetailCancel, postCancelSettlement } from '@/api/finance/settleLog'
import { mapGetters } from 'vuex'
import Receipt from './components/receipt'
import { PrintInFullPage, SaveAsFile } from '@/utils/lodopFuncs'
export default {
  components: {
    SearchForm,
    Pager,
    TableSetup,
    Receipt
  },
  data() {
    return {
      btnsize: 'mini',
      feeType: 8,
      selectedList: [],
      selectListShipSns: [],
      tableReceiptInfo: [],
      searchQuery: {
        currentPage: 1,
        pageSize: 100,
        vo: {}
      },
      tablekey: 0,
      tablekeyBottom: 0,
      total: 0,
      dataListTop: [],
      popVisibleDialog: false,
      loading: false,
      setupTableVisible: false,
      tableColumn: [],
      columnOrder: [{
        label: '核销网点',
        prop: 'orgName',
        width: '100',
        fixed: false
      },
      {
        label: '核销单号',
        prop: 'settlementSn',
        width: '140',
        fixed: true
      },
      {
        label: '运单号',
        prop: 'shipSn',
        width: '150',
        fixed: false
      },
      {
        label: '核销类型',
        prop: 'settlementIdZh',
        width: '90',
        fixed: true
      },
      {
        label: '核销人',
        prop: 'settlementBy',
        width: '90',
        fixed: false
      },
      {
        label: '金额',
        prop: 'amount',
        width: '90',
        fixed: false
      },
      {
        label: '核销时间',
        prop: 'settlementTime',
        width: '160',
        slot: (scope) => {
          return `${parseTime(scope.row.settlementTime, '{y}-{m}-{d} {h}:{i}:{s}')}`
        },
        fixed: false
      },
      {
        label: '备注',
        prop: 'paymentsType',
        width: '150',
        fixed: false
      },
      {
        label: '现付',
        prop: 'onPay',
        width: '90',
        fixed: false
      },
      {
        label: '到付',
        prop: 'arrivalPay',
        width: '90',
        fixed: false
      },
      {
        label: '回单付',
        prop: 'backPay',
        width: '90',
        fixed: false
      },
      {
        label: '月结',
        prop: 'monthPay',
        width: '90',
        fixed: false
      },
      {
        label: '中转费合计',
        prop: 'transferPay',
        width: '100',
        fixed: false
      },
      {
        label: '异动费用',
        prop: 'unusualPay',
        width: '90',
        fixed: false
      },
      {
        label: '异常费用',
        prop: 'exceptionPay',
        width: '90',
        fixed: false
      },
      {
        label: '实际提货费',
        prop: 'pickPuPay',
        width: '100',
        fixed: false
      },
      {
        label: '回扣',
        prop: 'kickBackPay',
        width: '90',
        fixed: false
      },
      {
        label: '其他费用支出',
        prop: 'othePay',
        width: '110',
        fixed: false
      },
      {
        label: '收支方式',
        prop: 'financialWay',
        width: '100',
        fixed: false
      },
      {
        label: '银行名称',
        prop: 'bankName',
        width: '100',
        fixed: false
      },
      {
        label: '银行卡号',
        prop: 'bankAccount',
        width: '150',
        fixed: false
      },
      {
        label: '开户人',
        prop: 'bankAccountName',
        width: '90',
        fixed: false
      },
      {
        label: '支票号码',
        prop: 'chequeNumber',
        width: '150',
        fixed: false
      },
      {
        label: '汇款号码',
        prop: 'receivableNumber',
        width: '150',
        fixed: false
      },
      {
        label: '微信号',
        prop: 'wechatAccount',
        width: '120',
        fixed: false
      },
      {
        label: '支付宝号',
        prop: 'alipayAccount',
        width: '120',
        fixed: false
      }
      ],
      columnBatch: [{
        label: '核销网点',
        prop: 'orgName',
        width: '120',
        fixed: false
      },
      {
        label: '短驳批次',
        prop: 'shortBatchNo',
        width: '150',
        fixed: false
      },
      {
        label: '送货批次',
        prop: 'sendBatchNo',
        width: '150',
        fixed: false
      },
      {
        label: '干线批次',
        prop: 'mainBatchNo',
        width: '150',
        fixed: false
      },
      {
        label: '核销单号',
        prop: 'settlementSn',
        width: '150',
        fixed: true
      },
      {
        label: '核销类型',
        prop: 'settlementIdZh',
        width: '110',
        fixed: true
      },
      {
        label: '核销人',
        prop: 'settlementBy',
        width: '90',
        fixed: false
      },
      {
        label: '金额',
        prop: 'amount',
        width: '90',
        fixed: false
      },
      {
        label: '核销时间',
        prop: 'settlementTime',
        width: '160',
        fixed: false,
        slot: (scope) => {
          return `${parseTime(scope.row.settlementTime, '{y}-{m}-{d} {h}:{i}:{s}')}`
        }
      },
      {
        label: '收支类型',
        prop: 'paymentsType',
        width: '110',
        fixed: false
      },
      {
        label: '备注',
        prop: 'remark',
        width: '150',
        fixed: false
      },
      {
        label: '短驳费',
        prop: 'shortPay',
        width: '90',
        fixed: false
      },

      {
        label: '送货费',
        prop: 'sendPay',
        width: '90',
        fixed: false
      },
      {
        label: '现付运费',
        prop: 'onSendPay',
        width: '90',
        fixed: false
      },
      {
        label: '现付油卡',
        prop: 'onCardPay',
        width: '90',
        fixed: false
      },
      {
        label: '到付运费',
        prop: 'arrSendPay',
        width: '90',
        fixed: false
      },
      {
        label: '到付油卡',
        prop: 'arrCardPay',
        width: '90',
        fixed: false
      },
      {
        label: '回付运费',
        prop: 'backSendPay',
        width: '90',
        fixed: false
      },
      {
        label: '回付油卡',
        prop: 'backCardPay',
        width: '90',
        fixed: false
      },
      {
        label: '发站装卸费',
        prop: 'startLoadPay',
        width: '100',
        fixed: false
      },
      {
        label: '发站其他费',
        prop: 'startOtherPay',
        width: '100',
        fixed: false
      },
      {
        label: '到站装卸费',
        prop: 'endLoadPay',
        width: '100',
        fixed: false
      },
      {
        label: '到站其他费',
        prop: 'endOtherPay',
        width: '100',
        fixed: false
      },
      {
        label: '整车保险费',
        prop: 'wholeSurePay',
        width: '120',
        fixed: false
      },
      {
        label: '收支方式',
        prop: 'financialWay',
        width: '100',
        fixed: false
      },
      {
        label: '银行名称',
        prop: 'bankName',
        width: '120',
        fixed: false
      },
      {
        label: '银行卡号',
        prop: 'bankAccount',
        width: '150',
        fixed: false
      },
      {
        label: '开户人',
        prop: 'bankAccountName',
        width: '90',
        fixed: false
      },
      {
        label: '支票号码',
        prop: 'senderCompanyName',
        width: '150',
        fixed: false
      },
      {
        label: '汇款号码',
        prop: 'receivableNumber',
        width: '150',
        fixed: false
      },
      {
        label: '微信号',
        prop: 'wechatAccount',
        width: '120',
        fixed: false
      },
      {
        label: '支付宝号',
        prop: 'alipayAccount',
        width: '120',
        fixed: false
      }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'otherinfo'
    ]),
    flowId() {
      return this.$route.query.flowId
    },
    settlementId() {
      return this.$route.query.settlementId
    },
    orgId() {
      return this.$route.query.orgId
    }
  },
  created() {
    this.setView()
  },
  methods: {
    getSearchParam(obj) {
      this.searchQuery.currentPage = this.$options.data().searchQuery.currentPage
      this.searchQuery.pageSize = this.$options.data().searchQuery.pageSize
      this.searchQuery.vo = Object.assign({}, obj)
      this.fetchList()
    },
    handlePageChange(obj) {
      this.searchQuery.currentPage = obj.pageNum
      this.searchQuery.pageSize = obj.pageSize
      this.fetchList()
    },
    setView() {
      // 设置表格视图
      // 【178-运单核销 179-干线批次核销 180-短驳核销 181-送货核销】
      if (this.$route.query.settlementId === 178) {
        this.tableColumn = this.columnOrder // 运单视图
      } else {
        this.tableColumn = this.columnBatch // 没有数据上显示运单视图
      }
    },
    fetchList() {
      if (this.$route.query) {
        this.$set(this.searchQuery.vo, 'flowId', this.flowId)
        this.$set(this.searchQuery.vo, 'settlementId', this.settlementId)
        postDetailList(this.searchQuery).then(data => {
          this.dataListTop = data.list
          this.total = data.total
        }).catch((err)=>{
          this.loading = false
          this._handlerCatchMsg(err)
        })
        this.setView() // 设置视图
      }
    },
    setTable() {},
    doAction(type) {
      let isShow = false
      if (this.selectedList.length !== 1 && type !== 'export' && type !== 'print') {
        isShow = false
        this.$message({ type: 'warning', message: '请选择一条数据' })
      } else {
        isShow = true
      }
      switch (type) {
        case 'income': // 记收入
          this.income()
          break
        case 'expandtiure': // 记支出
          this.expandtiure()
          break
        case 'cancelCount': // 取消核销
          if (isShow) {
            this.cancelCount()
          }
          break
        case 'showCount': // 查看核销单
          if (isShow) {
            this.showCount()
          }
          break
        case 'showDetail':
          if (isShow) {
            this.showDetail()
          }
          break
        case 'export':
          SaveAsFile({
            data: this.dataListTop,
            columns: this.tableColumn,
            name: '资金流水明细-' + parseTime(new Date(), '{y}{m}{d}{h}{i}{s}')
          })
          break
        case 'print':
          PrintInFullPage({
            data: this.dataListTop,
            columns: this.tableColumn,
            name: '资金流水明细'
          })
          break
      }
    },
    cancelCount() {
      this.$confirm('确定要取消核销【 ' + this.selectedList[0].settlementSn + ' 】吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const data = {
          flowId: this.selectedList[0].flowId,
          detailFlowId: this.selectedList[0].id
        }
        postCancelSettlement(data).then(data => {
          this.$message({ type: 'success', message: '取消核销操作成功' })
          this.fetchList()
        })
        .catch(err => {
          this._handlerCatchMsg(err)
          this.fetchList()
        })
      })
    },
    showCount() {
      this.popVisibleDialog = true
    },
    closeDialog() {
      this.popVisibleDialog = false
    },
    clickDetails(row) {
      this.$refs.multipleTable.toggleRowSelection(row)
    },
    getSelection(list) {
      this.selectedList = list
      this.selectListShipSns = []
      list.forEach((e, index) => {
        this.selectListShipSns.push(e.shipSn)
      })
    },
    showDetail(order) {
      // this.eventBus.$emit('showOrderDetail', order.id)
    },
    showDetail() {

    },
    setTable() {
      this.setupTableVisible = true
    },
    closeSetupTable() {
      this.setupTableVisible = false
    },
    setColumn(obj) { // 重绘表格列表
      this.tableColumn = obj
      this.tablekey = Math.random() // 刷新表格视图
    }
  }
}

</script>
<style lang="scss">
.info_tab_row {
  flex-grow: 1;
  height: 50%;
}

</style>
