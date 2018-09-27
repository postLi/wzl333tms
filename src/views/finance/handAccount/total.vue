<template>
  <div class="tab-content handAccount-summary" v-loading="loading">
    <SearchForm :orgid="otherinfo.orgid" @change="getSearchParam" :btnsize="btnsize" />  
    <div class="tab_info">
      <div class="btns_box">
          <el-button type="primary" :size="btnsize" icon="el-icon-info" plain @click="doAction('detail')" v-has:FINANCE_ACCOUNT1>查看明细</el-button>
          
          <el-button type="primary" :size="btnsize" icon="el-icon-edit-outline" class="table_setup" @click="doAction('export')" plain>导出</el-button>
          <el-button type="primary" :size="btnsize" icon="el-icon-edit-outline" class="table_setup" @click="doAction('print')" plain>打印</el-button>
          <el-button type="primary" :size="btnsize" icon="el-icon-setting" plain @click="setTable" class="table_setup">表格设置</el-button>
      </div>
      <div class="info_tab">
        <el-table
          ref="multipleTable"
          :data="usersArr"
          :key="tablekey"
          stripe
          border
          @row-click="clickDetails"
          @row-dblclick="showDetail"
          @selection-change="getSelection"
          height="100%"
          show-summary
          :summary-method="getSummaries"
          tooltip-effect="dark"
          :default-sort = "{prop: 'id', order: 'ascending'}"
          style="width: 100%">
          
          <el-table-column
            fixed
            sortable
            type="selection"
            width="80">
          </el-table-column>
          <template v-for="column in tableColumn">
            <el-table-column
              :key="column.id"
              :fixed="column.fixed"
              sortable
              :label="column.label"
              :prop="column.prop"
              v-if="!column.slot"
              :width="column.width">
            </el-table-column>
            <el-table-column
              :key="column.id"
              :fixed="column.fixed"
              sortable
              :label="column.label"
              v-else
              :width="column.width">
              <template slot-scope="scope" v-html="true">
                  {{ column.slot(scope) }}
              </template>
            </el-table-column>
          </template>
        </el-table>
      </div>   
      <div class="info_tab_footer">共计:{{ total }} <div class="show_pager"> <Pager :total="total" @change="handlePageChange" /></div> </div>
    </div>
    <TableSetup :popVisible="setupTableVisible" @close="closeSetupTable" :columns='tableColumn' @success="setColumn"  />
  </div>
</template>
<script>
import * as handAccountApi from '@/api/finance/handAccount'
import SearchForm from './components/search'
import TableSetup from '@/components/tableSetup'
import Pager from '@/components/Pagination/index'
import { getSummaries, parseTime } from '@/utils/'
import { PrintInFullPage, SaveAsFile } from '@/utils/lodopFuncs'

export default {
  components: {
    SearchForm,
    Pager,
    TableSetup
  },
  mounted() {

  },
  data() {
    return {
      btnsize: 'mini',
      usersArr: [],
      total: 0,
      // 加载状态
      loading: true,
      setupTableVisible: false,
      isModify: false,
      selectInfo: {},
      // 选中的行
      selected: [],
      searchQuery: {
        'currentPage': 1,
        'pageSize': 100,
        'vo': {
          'orgid': '',
          status: '',
          userName: ''
        }
      },
      // 默认sort值为true
      tablekey: '',
      tableColumn: [{
        'label': '序号',
        'prop': '',
        'fixed': true,
        'slot': function(scope) {
          return scope.$index + 1
        }
      }, {
        'label': '网点',
        'prop': 'orgName',
        'fixed': true
      }, {
        'label': '员工姓名',
        'prop': 'name'
      }, {
        'label': '交账合计',
        'prop': 'shipNowpayFee'
      }, {
        'label': '交账状态',
        'prop': 'feeStatus',
        'width': '150'
      }, {
        'label': '已交账合计',
        'prop': 'finishAccount'
      }, {
        'label': '未交账合记',
        'prop': 'noSettlementFee'
      }]
    }
  },
  methods: {
    viewDetails(row) {
      this.$router.push({
        path: '/finance/handAccount/detail',
        query: {
          id: row.userId,
          tab: '查看' + row.name,
          orgid: row.orgid
        }
      })
    },
    showDetail(order) {
      this.viewDetails(order)
    },
    fetchAllOrder() {
      this.loading = true
      return handAccountApi.getSummaryFeeList(this.searchQuery).then(data => {
        this.usersArr = data.list
        this.total = data.total
        this.loading = false
      }).catch((err)=>{
        this.loading = false
        this._handlerCatchMsg(err)
      })
    },
    fetchData() {
      this.fetchAllOrder()
    },
    handlePageChange(obj) {
      this.searchQuery.currentPage = obj.pageNum
      this.searchQuery.pageSize = obj.pageSize
      this.fetchData()
    },
    getSearchParam(obj) {
      this.searchQuery.vo = obj
      this.loading = false
      this.fetchData()
    },
    doAction(type) {
      // 判断是否有选中项
      if (!this.selected.length && type !== 'add' && type !== 'export' && type !== 'print') {
        this.$message({
          message: '请选择要操作的项~',
          type: 'warning'
        })
        return false
      }

      console.log('this.selected:', this.selected)

      switch (type) {
          // 添加运单
        case 'detail':
          this.isModify = false
          this.selectInfo = {}
          this.showDetail(this.selected[0])
          break
          // 导出数据
        case 'export':
          SaveAsFile({
            data: this.selected.length ? this.selected : this.usersArr,
            columns: this.tableColumn,
            name: '员工交账-' + parseTime(new Date(), '{y}{m}{d}{h}{i}{s}')
          })
          break
        case 'print':
          PrintInFullPage({
            data: this.selected.length ? this.selected : this.usersArr,
            columns: this.tableColumn,
            name: '员工交账'
          })
          break
      }
      // 清除选中状态，避免影响下个操作
      this.$refs.multipleTable.clearSelection()
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
    },
    clickDetails(row, event, column) {
      this.$refs.multipleTable.toggleRowSelection(row)
    },
    getSelection(selection) {
      this.selected = selection
    },
    // 计算总数
    getSummaries(param) {
      return getSummaries(param, ['shipNowpayFee', 'finishAccount', 'noSettlementFee'])
    }
  }
}
</script>
<style lang="scss">
.handAccount-manager .tab-content{
  .tab_info{
    padding-bottom: 10px;
  }
}
</style>

