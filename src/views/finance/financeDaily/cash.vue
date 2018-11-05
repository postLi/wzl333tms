<template>
  <!-- 回扣 -->
  <div class="tab-content" v-loading="loading">
    <!-- 搜索 -->
    <SearchForm :orgid="otherinfo.orgid" @change="getSearchParam" :btnsize="btnsize"></SearchForm>
    <div class="tab_count_lyy">
      <el-card shadow="never" class="box-card green">
        <p><span>期初余额</span><i>23452</i></p>
      </el-card>
      <el-tag type="info">+</el-tag>
      <el-card shadow="never" class="box-card orange">
        <p><span>本期发生增加额</span><i>23452</i></p>
      </el-card>
      <el-tag type="info">-</el-tag>
      <el-card shadow="never" class="box-card purple">
        <p><span>期末发生减少额</span><i>23452</i></p>
      </el-card>
      <el-tag type="info">=</el-tag>
      <el-card shadow="never" class="box-card blue">
        <p><span>期末余额</span><i>23452</i></p>
      </el-card>
    </div>
    <!-- 操作按钮 -->
    <div class="tab_info">
      <div class="btns_box">
        <el-button type="primary" :size="btnsize" icon="el-icon-plus" @click="doAction('income')" plain v-has:FLOW_IN>新增</el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-edit" @click="doAction('expandtiure')" plain v-has:FLOW_OUT>修改</el-button>
        <el-button type="warning" :size="btnsize" icon="el-icon-delete" @click="doAction('cancelCount')" plain v-has:FLOW_CANCEL>删除</el-button>
        <el-button type="success" :size="btnsize" icon="el-icon-rank" @click="doAction('showDetail')" plain v-has:FLOW_DETAIL>查看明细</el-button>
        <el-button type="success" :size="btnsize" icon="el-icon-tickets" @click="doAction('showCount')" plain v-has:FLOW_FIND>返核销</el-button>
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
    <!-- 结算单 -->
    <Receipt :popVisible="popVisibleDialog" :info="tableReceiptInfo" @close="closeDialog"></Receipt>
    <!-- 新增 -->
    <Income :popVisible="popVisibleIncome" :info="currentInfo" @close="closeDialogIncome"></Income>
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
import Income from './components/income'
export default {
  components: {
    SearchForm,
    Pager,
    TableSetup,
    Receipt,
    Income
  },
  computed: {
    ...mapGetters([
      'otherinfo'
    ])
  },
  data() {
    return {
      currentInfo: {},
      popVisibleIncome: false,
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
      tableColumn: [{
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
          prop: 'orgName',
          width: '120',
          fixed: false
        },
        {
          label: '类别',
          prop: 'settlementSn',
          width: '140',
          fixed: true
        },
        {
          label: '方向',
          prop: 'settlementIdZh',
          width: '110',
          fixed: true
        },
        {
          label: '金额',
          prop: 'settlementBy',
          width: '90',
          fixed: false
        },
        {
          label: '发票号码',
          prop: 'amount',
          width: '90',
          fixed: false
        },
        {
          label: '收据号码',
          prop: 'amount',
          width: '90',
          fixed: false
        },
        {
          label: '支票号码',
          prop: 'amount',
          width: '90',
          fixed: false
        },
        {
          label: '凭证日期',
          prop: 'settlementTime',
          width: '160',
          slot: (scope) => {
            return `${parseTime(scope.row.settlementTime, '{y}-{m}-{d} {h}:{i}:{s}')}`
          },
          fixed: false
        },
        {
          label: '系统操作日期',
          prop: 'settlementTime',
          width: '160',
          slot: (scope) => {
            return `${parseTime(scope.row.settlementTime, '{y}-{m}-{d} {h}:{i}:{s}')}`
          },
          fixed: false
        },
        {
          label: '一级科目',
          prop: 'financialWay',
          width: '90',
          fixed: false
        },
        {
          label: '二级科目',
          prop: 'bankName',
          width: '100',
          fixed: false
        },
        {
          label: '三级科目',
          prop: 'bankAccount',
          width: '150',
          fixed: false
        },
        {
          label: '四级科目',
          prop: 'bankAccountName',
          width: '90',
          fixed: false
        },
        {
          label: '摘要',
          prop: 'chequeNumber',
          width: '150',
          fixed: false
        },
        {
          label: '记账网点',
          prop: 'receivableNumber',
          width: '150',
          fixed: false
        },
        {
          label: '核销人',
          prop: 'wechatAccount',
          width: '120',
          fixed: false
        },
        {
          label: '手工凭证号',
          prop: 'alipayAccount',
          width: '120',
          fixed: false
        },
        {
          label: '凭证号',
          prop: 'remark',
          width: '150',
          fixed: false
        },
        {
          label: '笔数',
          prop: 'remark',
          width: '150',
          fixed: false
        },
        {
          label: '审核人',
          prop: 'remark',
          width: '150',
          fixed: false
        },
        {
          label: '审核状态',
          prop: 'remark',
          width: '150',
          fixed: false
        },
        {
          label: '审核日期',
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
      }).catch((err) => {
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
        case 'cancelCount': // 取消结算
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
        case 'showCount': // 查看结算单
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
    income() { // 新增
      this.popVisibleIncome = true
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
          this.$message({ type: 'success', message: '取消结算操作成功' })
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
          path: './cashDetail',
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
    closeDialogIncome () {
      this.popVisibleIncome = false
    },
    setColumn(obj) { // 重绘表格列表
      this.tableColumn = obj
      this.tablekey = Math.random() // 刷新表格视图
    }
  }
}

</script>
<style lang="scss">
.tab_count_lyy {
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: center;
  align-items: center;
  background-color: #F2F6FC;
  margin: 0 10px;
  padding: 10px 10px 10px 10px;
  border-bottom: 1px dashed #999;
  .el-tag {
    margin: 0 10px;
    font-weight: 700;
    font-size: 20px;
  }
  .box-card {
    background-color: rgba(0, 0, 0, 0);
    border: none;
    flex-grow: 1;
    .el-card__body {
      padding: 10px;
    }
    p {
      display: flex;
      flex-direction: row;
      font-size: 14px;
      span {
        margin-right: 10px;
        display: block;
        width: 110px;
        text-align: center;
      }
      i {
        text-align: center;
        display: block;
        width: calc(100% - 110px);
        font-style: normal;
        border-bottom: 1px solid #999;
        padding: 0 10px;
      }
    }
  } // .green,
  // .blue,
  // .orange,
  // .purple{
  //   p{
  //     i{
  //       border-bottom: 1px solid #ddd;
  //     }
  //   }
  // }
  // .green{
  //   color:#fff;
  //   background-color: #67C23A;
  // }
  // .blue {
  //   color:#fff;
  //   background-color: #409EFF;
  // }
  // .orange{
  //   color:#fff;
  //   background-color: #E6A23C;
  // }
  // .purple {
  //   color:#fff;
  //   background-color: #CC66CC;
  // }
}

</style>
