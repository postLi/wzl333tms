<template>
  <!-- 回扣 -->
  <div class="tab-content" v-loading="loading">
    <!-- 搜索 -->
    <SearchForm :orgid="otherinfo.orgid" @change="getSearchParam" :btnsize="btnsize"></SearchForm>
    <!-- 操作按钮 -->
    <div class="tab_info">
      <div class="btns_box">
        <el-button type="primary" :size="btnsize" icon="el-icon-sort" @click="doAction('income')" plain>记收入</el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-sort" @click="doAction('expandtiure')" plain>记支出</el-button>
        <el-button type="danger" :size="btnsize" icon="el-icon-sort" @click="doAction('cancelCount')" plain>取消结算</el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-sort" @click="doAction('showCount')" plain>查看结算单</el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-printer" @click="doAction('print')" plain>打印</el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-download" @click="doAction('export')" plain>导出</el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-setting" @click="setTable" class="table_setup" plain>表格设置</el-button>
      </div>
      <!-- 数据表格 -->
      <div class="info_tab">
        <el-table ref="multipleTable" :key="tablekey" :data="dataList" stripe border @row-click="clickDetails" @selection-change="getSelection" height="100%" tooltip-effect="dark" style="width:100%;" :default-sort="{prop: 'id', order: 'ascending'}" @cell-dblclick="showDetail">
          <el-table-column fixed sortable type="selection" width="50">
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
import SearchForm from './components/search'
import Pager from '@/components/Pagination/index'
import TableSetup from '@/components/tableSetup'
import { postFindLowList } from '@/api/finance/settleLog'
import { mapGetters } from 'vuex'
export default {
  components: {
    SearchForm,
    Pager,
    TableSetup
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
      selectListShipSns: [],
      searchQuery: {
        currentPage: 1,
        pageSize: 100,
        vo: {}
      },
      tablekey: 0,
      total: 0,
      dataList: [],
      loading: false,
      setupTableVisible: false,
      tableColumn: [{
          label: '序号',
          prop: 'flowId',
          width: '110',
          fixed: true
        },
        {
          label: '结算网点',
          prop: 'orgId',
          width: "120",
          fixed: false
        },
        {
          label: '结算单号',
          prop: 'settlementSn',
          width: '150',
          fixed: true
        },
        {
          label: '结算类型',
          prop: 'settlementId',
          width: '150',
          fixed: false
        },
        {
          label: '结算人',
          prop: 'settlementBy',
          width: '150',
          fixed: false
        },
        {
          label: '金额',
          prop: 'amount',
          width: '150',
          fixed: false
        },
        {
          label: '结算时间',
          prop: 'settlementTime',
          width: '150',
          slot: (scope) => {
            return `${parseTime(scope.row.settlementTime, '{y}-{m}-{d} {h}:{i}:{s}')}`
          },
          fixed: false
        },
        {
          label: '收支方式',
          prop: 'paymentsType',
          width: '150',
          fixed: false
        },
        {
          label: '银行名称',
          prop: 'closeFee',
          width: '150',
          fixed: false
        },
        {
          label: '银行卡号',
          prop: 'unpaidFee',
          width: '150',
          fixed: false
        },
        {
          label: '开户人',
          prop: 'createTime',
          width: '180',
          slot: (scope) => {
            return `${parseTime(scope.row.createTime, '{y}-{m}-{d} {h}:{i}:{s}')}`
          },
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
          prop: 'senderCustomerName',
          width: '150',
          fixed: false
        },
        {
          label: '微信号',
          prop: 'receiverCompanyName',
          width: '150',
          fixed: false
        },
        {
          label: '支付宝号',
          prop: 'receiverCustomerName',
          width: '150',
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
      return postFindLowList(this.searchQuery).then(data => {
        this.dataList = data.list
      })
    },
    setTable() {},
    doAction(type) {
      switch (type) {
        case 'income': // 记收入
          this.income()
          break
        case 'expandtiure': // 记支出
          this.expandtiure()
          break
        case 'cancelCount': // 取消结算
          this.cancelCount()
          break
        case 'showCount': // 查看结算单
          this.showCount()
          break
        case 'export':
          this.$message({ type: 'warning', message: '暂无此功能，敬请期待！' })
          break
        case 'print':
          this.$message({ type: 'warning', message: '暂无此功能，敬请期待！' })
          break
      }
    },
    income() {
       this.$router.push({
        path: './settleLogIncome',
      })
       console.log(this.$router)
    },
    expandtiure() {},
    cancelCount () {},
    showCount () {},
    // count () {
    //  this.$router.push({
    //     path: '../accountsLoad',
    //     query: {
    //       currentPage: 'waybillKickback', // 本页面标识符
    //       searchQuery: this.searchQuery, // 搜索项
    //       selectListShipSns: this.selectListShipSns // 列表选择项的批次号batchNo
    //     }
    //   })
    // },
    clickDetails(row) {
      this.$refs.multipleTable.toggleRowSelection(row)
    },
    getSelection(list) {
      this.selectListShipSns = []
      list.forEach((e, index) => {
        this.selectListShipSns.push(e.shipSn)
      })
    },
    showDetail(order) {
      // this.eventBus.$emit('showOrderDetail', order.id)
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
