<template>
  <!-- 回扣 -->
  <div class="tab-content" v-loading="loading">
    <!-- 搜索 -->
    <SearchForm :orgid="otherinfo.orgid" @change="getSearchParam" :btnsize="btnsize"></SearchForm>
    <!-- 操作按钮 -->
    <div class="tab_info">
      <div class="btns_box">
        <el-button type="primary" :size="btnsize" icon="el-icon-sort-down" @click="doAction('income')" plain v-has:FLOW_IN>记收入</el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-sort-up" @click="doAction('expandtiure')" plain v-has:FLOW_OUT>记支出</el-button>
        <el-button type="warning" :size="btnsize" icon="el-icon-sort" @click="doAction('cancelCount')" plain v-has:FLOW_CANCEL>取消核销</el-button>
        <el-button type="success" :size="btnsize" icon="el-icon-tickets" @click="doAction('showCount')" plain v-has:FLOW_FIND>查看核销单</el-button>
        <el-button type="success" :size="btnsize" icon="el-icon-rank" @click="doAction('showDetail')" plain v-has:FLOW_DETAIL>查看明细</el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-printer" @click="doAction('print')" plain v-has:FLOW_PRI>打印</el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-download" @click="doAction('export')" plain v-has:FLOW_EXP>导出</el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-setting" @click="setTable" class="table_setup" plain>表格设置</el-button>
      </div>
      <!-- 数据表格 -->
      <div class="info_tab">
        <el-table ref="multipleTable" @row-dblclick="selectedItem" :key="tablekey" :data="dataList" stripe border @row-click="clickDetails" @selection-change="getSelection" height="100%" tooltip-effect="dark" style="width:100%;" :default-sort="{prop: 'id', order: 'ascending'}" @cell-dblclick="showDetail">
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
import SearchForm from './components/search'
import Pager from '@/components/Pagination/index'
import TableSetup from '@/components/tableSetup'
import { postFindLowList, postCancelSettlement } from '@/api/finance/settleLog'
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
  computed: {
    ...mapGetters([
      'otherinfo'
    ])
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
        vo: {
          orgId: ''
        }
      },
      tablekey: 0,
      total: 0,
      dataList: [],
      popVisibleDialog: false,
      loading: true,
      setupTableVisible: false,
      tableColumn: [
      // {
      //     label: '序号',
      //     prop: 'flowId',
      //     width: '180',
      //     fixed: true
      //   },
        {
          label: '核销网点',
          prop: 'orgName',
          width: '120',
          fixed: false
        },
        {
          label: '核销单号',
          prop: 'settlementSn',
          width: '140',
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
          slot: (scope) => {
            return `${parseTime(scope.row.settlementTime, '{y}-{m}-{d} {h}:{i}:{s}')}`
          },
          fixed: false
        },
        {
          label: '收支方式',
          prop: 'financialWay',
          width: '90',
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
        },
        {
          label: '备注',
          prop: 'remark',
          width: '150',
          fixed: false
        }
      ]
    }
  },
  watch: {
    $route(newVal) {
      if (newVal) {
        this.fetchList()
      }
    }
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
    fetchList() {
      this.loading = true
      return postFindLowList(this.searchQuery).then(data => {
        this.dataList = data.list
        this.total = data.total
        this.loading = false
      }).catch((err)=>{
        this.loading = false
        this._handlerCatchMsg(err)
      })
    },
    setTable() {},
    doAction(type) {
      let isShow = false
      if (this.selectedList.length !== 1 && type !== 'income' && type !== 'expandtiure' && type !== 'export' && type !== 'print') {
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
            this.$confirm('确定要取消【 ' + this.selectedList[0].settlementSn + ' 】吗？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.cancelCount()
            })
          }
          break
        case 'showCount': // 查看核销单
          if (isShow) {
            this.showCount()
          }
          break
        case 'showDetail':
          if (isShow) {
            this.showDetail() // 查看明细
          }
          break
        case 'export':
          SaveAsFile({
            data: this.dataList,
            columns: this.tableColumn,
            name: '资金流水-' + parseTime(new Date(), '{y}{m}{d}{h}{i}{s}')
          })
          break
        case 'print':
          PrintInFullPage({
            data: this.dataList,
            columns: this.tableColumn,
            name: '资金流水'
          })
          break
      }
    },
    income() {
      this.$router.push({
        path: './settleLogIncome',
        query: {
          orgId: this.searchQuery.vo.orgId

        }
      })
    },
    expandtiure() {
      this.$router.push({
        path: './settleLogExpandtiure',
        query: {
          orgId: this.searchQuery.vo.orgId
        }
      })
    },
    cancelCount() {
      const data = {}
      this.$set(data, 'flowId', this.selectedList[0].flowId)
      postCancelSettlement(data).then(data => {
        this.$message({ type: 'success', message: '取消核销操作成功' })
        this.fetchList()
      })
        .catch(err => {
          this._handlerCatchMsg(err)
          this.fetchList()
        })
    },
    showCount() {
      this.tableReceiptInfo = Object.assign([], this.selectedList)
      this.popVisibleDialog = true
      this.$refs.multipleTable.clearSelection()
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
    selectedItem(row) {
      this.$refs.multipleTable.toggleRowSelection(row)
      this.showDetail()
    },
    showDetail() {
      if (this.selectedList.length > 0) {
        this.$router.push({
          path: './settleLogDetail',
          query: {
            flowId: this.selectedList[0].flowId,
            settlementId: this.selectedList[0].settlementId,
            orgId: this.searchQuery.vo.orgId
          }
        })
      }
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
