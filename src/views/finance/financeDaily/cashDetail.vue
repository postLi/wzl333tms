<template>
  <!-- 资金流水明细 -->
  <div class="tab-content" v-loading="loading">
    <!-- 搜索 -->
    <SearchForm :orgid="orgId" @change="getSearchParam" :btnsize="btnsize"></SearchForm>
    <!-- 操作按钮 -->
    <div class="tab_info">
      <div class="btns_box">
        <el-button type="primary" :size="btnsize" icon="el-icon-sort" @click="doAction('cancelCount')" plain v-has:FLOW_CANCEL>新增</el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-sort" @click="doAction('cancelCount')" plain v-has:FLOW_CANCEL>修改</el-button>
        <el-button type="danger" :size="btnsize" icon="el-icon-sort" @click="doAction('cancelCount')" plain v-has:FLOW_CANCEL>删除</el-button>
        <el-button type="success" :size="btnsize" icon="el-icon-sort" @click="doAction('cancelCount')" plain v-has:FLOW_CANCEL>查看明细</el-button>
        <el-button type="warning" :size="btnsize" icon="el-icon-sort" @click="doAction('cancelCount')" plain v-has:FLOW_CANCEL>反核销</el-button>
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
  </div>
</template>
<script>
import { objectMerge2, parseTime } from '@/utils/index'
import SearchForm from './components/searchDetail'
import Pager from '@/components/Pagination/index'
import TableSetup from '@/components/tableSetup'
import { postBillRecordDetailList } from '@/api/finance/financeDaily'
import { mapGetters } from 'vuex'
import { PrintInFullPage, SaveAsFile } from '@/utils/lodopFuncs'
export default {
  components: {
    SearchForm,
    Pager,
    TableSetup
  },
  data() {
    return {
      btnsize: 'mini',
      feeType: 8,
      selectedList: [],
      selectListShipSns: [],
      searchQuery: {
        currentPage: 1,
        pageSize: 100,
        vo: {
          recordId: '',
          orgId: ''
        }
      },
      tablekey: 0,
      tablekeyBottom: 0,
      total: 0,
      dataListTop: [],
      loading: false,
      setupTableVisible: false,
      tableColumn: [],
      columnOrder: [{
          label: '序号',
          prop: 'id',
          width: '50',
          fixed: true,
          slot: (scope) => {
            return ((this.searchQuery.currentPage - 1) * this.searchQuery.pageSize) + scope.$index + 1
          }
        },
        {
          label: '来源',
          prop: 'dataSrcZh',
          width: '110',
          fixed: true
        },
        {
          label: '核销项目',
          prop: 'feeType',
          width: '110',
          fixed: true
        },
        {
          label: '类别',
          prop: 'verificationWay',
          width: '110',
        },
        {
          label: '方向',
          prop: 'paymentsTypeZh',
          width: '90',
        },
        {
          label: '金额',
          prop: 'amount',
          width: '90',
          fixed: false
        },
        {
          label: '发票号码',
          prop: 'invoiceNo',
          width: '130',
          fixed: false
        },
        {
          label: '收据号码',
          prop: 'receiptNo',
          width: '130',
          fixed: false
        },
        {
          label: '支票号码',
          prop: 'checkNo',
          width: '130',
          fixed: false
        },
        {
          label: '凭证日期',
          prop: 'certTime',
          width: '160',
          slot: (scope) => {
            return `${parseTime(scope.row.certTime, '{y}-{m}-{d} {h}:{i}:{s}')}`
          },
          fixed: false
        },
        {
          label: '系统操作日期',
          prop: 'verifyTime',
          width: '160',
          slot: (scope) => {
            return `${parseTime(scope.row.verifyTime, '{y}-{m}-{d} {h}:{i}:{s}')}`
          },
          fixed: false
        },
        {
          label: '一级科目',
          prop: 'subjectOne',
          width: '110',
          fixed: false
        },
        {
          label: '二级科目',
          prop: 'subjectTwo',
          width: '110',
          fixed: false
        },
        {
          label: '三级科目',
          prop: 'subjectThree',
          width: '110',
          fixed: false
        },
        {
          label: '四级科目',
          prop: 'subjectFour',
          width: '110',
          fixed: false
        },
        {
          label: '摘要',
          prop: 'remark',
          width: '150',
          fixed: false
        },
        {
          label: '核销网点',
          prop: 'orgName',
          width: '150',
          fixed: false
        },
        {
          label: '反核销金额',
          prop: 'amount', 
          width: '100',
          fixed: false
        },
        {
          label: '反核销经办人',
          prop: 'contraryVerifyMan', 
          width: '90',
          fixed: false
        },
        {
          label: '反核销日期',
          prop: 'contraryVerifyTime', 
          width: '180',
          fixed: false
        },
        {
          label: '手工凭证号',
          prop: 'manualCert',
          width: '150',
          fixed: false
        },
        {
          label: '凭证号',
          prop: 'certNo',
          width: '150',
          fixed: false
        },
        {
          label: '审核人',
          prop: 'verifyMan',
          width: '90',
          fixed: false
        },
        {
          label: '审核状态',
          prop: 'verifyStatusZh',
          width: '100',
          fixed: false
        },
        {
          label: '审核日期',
          prop: 'verifyTime',
          width: '180',
          fixed: false
        },
        {
          label: '运单号',
          prop: 'shipSn',
          width: '180',
          fixed: false
        },
        {
          label: '货号',
          prop: 'shipGoodsSn',
          width: '180',
          fixed: false
        },
        {
          label: '发货人',
          prop: 'shipSenderName',
          width: '90',
          fixed: false
        },
        {
          label: '收货人',
          prop: 'shipReceiverName',
          width: '90',
          fixed: false
        },
        {
          label: '开单日期',
          prop: 'shipCreateTime',
          width: '180',
          fixed: false
        },
        {
          label: '出发城市',
          prop: 'shipFromCityName',
          width: '120',
          fixed: false
        },
        {
          label: '到达城市',
          prop: 'shipToCityName',
          width: '120',
          fixed: false
        },
        {
          label: '发车类型',
          prop: 'loadTypeId',
          width: '100',
          fixed: false
        },
        {
          label: '车牌号',
          prop: 'truckIdNumber',
          width: '120',
          fixed: false
        },
        {
          label: '发车批次',
          prop: 'batchNo',
          width: '160',
          fixed: false
        },
        {
          label: '发车日期',
          prop: 'departureTime',
          width: '180',
          fixed: false
        },
        {
          label: '司机',
          prop: 'driverName',
          width: '100',
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
      // 【178-运单结算 179-干线批次结算 180-短驳结算 181-送货结算】
      if (this.$route.query.settlementId === 178) {
        this.tableColumn = this.columnOrder // 运单视图
      } else {
        this.tableColumn = this.columnOrder // 没有数据上显示运单视图
      }
    },
    fetchList() {
      if (this.$route.query) {
        console.log('searchQuery', this.searchQuery)
        this.$set(this.searchQuery, 'recordId',this.$route.query.recordId)
        postBillRecordDetailList(this.searchQuery).then(data => {
          this.dataListTop = data.list
          this.total = data.total
        }).catch((err) => {
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
        case 'cancelCount': // 取消结算
          if (isShow) {
            this.cancelCount()
          }
          break
        case 'showCount': // 查看结算单
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
      this.$confirm('确定要取消结算【 ' + this.selectedList[0].settlementSn + ' 】吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const data = {
          flowId: this.selectedList[0].flowId,
          detailFlowId: this.selectedList[0].id
        }
        // postCancelSettlement(data).then(data => {
        //   this.$message({ type: 'success', message: '取消结算操作成功' })
        //   this.fetchList()
        // })
        // .catch(err => {
        //   this._handlerCatchMsg(err)
        //   this.fetchList()
        // })
      })
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
