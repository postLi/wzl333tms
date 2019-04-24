<template>
  <!-- 回扣 -->
  <div class="tab-content miniHeaderSearch" v-loading="loading">
    <!-- 搜索 -->
    <SearchForm :orgid="otherinfo.orgid" @change="getSearchParam" :btnsize="btnsize" :isReceivable="true"></SearchForm>
    <!-- 操作按钮 -->
    <div class="tab_info">
      <div class="btns_box">
        <el-button type="primary" :size="btnsize" icon="el-icon-sort" v-has:REC_SET1 @click="doAction('count')" plain v-has:HANDLING_PAY1>核销</el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-printer" @click="doAction('print')" plain v-has:HANDLING_PRINT1>打印</el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-download" @click="doAction('export')" plain v-has:HANDLING_EXPORT1>导出</el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-setting" @click="setTable" class="table_setup" plain>表格设置</el-button>
      </div>
      <!-- 数据表格 -->
      <div class="info_tab">
        <el-table ref="multipleTable" :key="tablekey" :data="dataList" stripe border @row-click="clickDetails" @selection-change="getSelection" height="100%" tooltip-effect="dark" style="width:100%;" :show-summary="true" :summary-method="getSummaries">
          <el-table-column fixed sortable type="selection" width="80"></el-table-column>
          <template v-for="column in tableColumn">
            <el-table-column :key="column.id" :fixed="column.fixed" sortable :label="column.label" :prop="column.prop" v-if="!column.slot" :width="column.width">
              <template slot="header" slot-scope="scope">
                <tableHeaderSearch :scope="scope" :query="searchQuery" @change="changeKey" />
              </template>
              <template slot-scope="scope">{{scope.row[column.prop]}}</template>
            </el-table-column>
            <el-table-column :key="column.id" :fixed="column.fixed" sortable :label="column.label" v-else :width="column.width" :prop="column.prop">
              <template slot="header" slot-scope="scope">
                <tableHeaderSearch :scope="scope" :query="searchQuery" @change="changeKey" />
              </template>
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
    <TableSetup :popVisible="setupTableVisible" :columns="tableColumn" @close="closeSetupTable" @success="setColumn"></TableSetup>
  </div>
</template>
<script>
import { objectMerge2, parseTime, getSummaries } from '@/utils/index'
import SearchForm from '@/views/finance/accountsPayable/handleFee/components/search'
import Pager from '@/components/Pagination/index'
// import TableSetup from '@/components/tableSetup'
import { payListByHandlingFee } from '@/api/finance/accountsPayable'
import { parseShipStatus } from '@/utils/dict'
import { PrintInFullPage, SaveAsFile } from '@/utils/lodopFuncs'
// import tableHeaderSearch from '@/components/tableHeaderSearch'
export default {
  components: {
    SearchForm,
    Pager
    // TableSetup,
    // tableHeaderSearch
  },
  data() {
    return {
      btnsize: 'mini',
      selectListBatchNos: [],
      searchQuery: {
        currentPage: 1,
        pageSize: 100,
        vo: {
          sign: 3
        }
      },
      tablekey: 0,
      total: 0,
      dataList: [],
      loading: true,
      setupTableVisible: false,
      tableColumn: [{
        label: '序号',
        prop: 'number',
        width: '70',
        fixed: true,
        slot: scope => {
            return (
              (this.searchQuery.currentPage - 1) * this.searchQuery.pageSize +
              scope.$index +
              1
            )
          }
      },
      {
        label: '发车批次',
        prop: 'batchNo',
        width: '150',
        fixed: true
      },
      {
        label: '发车类型',
        prop: 'loadTypeName',
        width: '100',
        fixed: true
      },
      {
        label: '发车网点',
        prop: 'orgName',
        width: '120',
        fixed: false
      },
      {
        label: '到达网点',
        prop: 'arriveOrgName',
        width: '120',
        fixed: false
      },
      {
        label: '发车时间',
        prop: 'departureTime',
        width: '160',
        fixed: false
      },
      {
        label: '到达时间',
        prop: 'receivingTime',
        width: '160',
        fixed: false
      },
      {
        label: '干线操作费',
        prop: 'gxHandlingFeeRec',
        width: '110',
        fixed: false
      },
      {
        label: '已核销干线操作费',
        prop: 'paidGxHandlingFeeRec',
        width: '140',
        slot: scope => {
            const row = scope.row
            return this._setTextColor(row.gxHandlingFeeRec, row.paidGxHandlingFeeRec, row.unpaidGxHandlingFeeRec, row.paidGxHandlingFeeRec)
          },
        fixed: false
      },
      {
        label: '未核销干线操作费',
        prop: 'unpaidGxHandlingFeeRec',
        width: '140',
        slot: scope => {
            const row = scope.row
            return this._setTextColor(row.gxHandlingFeeRec, row.paidGxHandlingFeeRec, row.unpaidGxHandlingFeeRec, row.unpaidGxHandlingFeeRec)
          },
        fixed: false
      },
      {
        label: '干线已付（应付）',
        prop: 'paidGxHandlingFeePay',
        width: '140',
        fixed: false
      },
      {
        label: '短驳操作费',
        prop: 'dbHandlingFeeRec',
        width: '110',
        fixed: false
      },
      {
        label: '已核销短驳操作费',
        prop: 'paidDbHandlingFeeRec',
        width: '140',
        slot: scope => {
            const row = scope.row
            return this._setTextColor(row.dbHandlingFeeRec, row.paidDbHandlingFeeRec, row.unpaidDbHandlingFeeRec, row.paidDbHandlingFeeRec)
          },
        fixed: false
      },
      {
        label: '未核销短驳操作费',
        prop: 'unpaidDbHandlingFeeRec',
        width: '140',
        slot: scope => {
            const row = scope.row
            return this._setTextColor(row.dbHandlingFeeRec, row.paidDbHandlingFeeRec, row.unpaidDbHandlingFeeRec, row.unpaidDbHandlingFeeRec)
          },
        fixed: false
      },
      {
        label: '短驳已付（应付）',
        prop: 'paidDbHandlingFeePay',
        width: '140',
        fixed: false
      },
        // {
        //   label: '操作费',
        //   prop: 'fee',
        //   width: '110',
        //   fixed: false
        // },
        // {
        //   label: '已核销操作费',
        //   prop: 'paidFee',
        //   width: '140',
        //   slot: scope => {
        //     const row = scope.row
        //     const fee =
        //       row.loadTypeName === '干线'
        //         ? row.gxHandlingFeeRec
        //         : row.dbHandlingFeeRec
        //     const closeFee =
        //       row.loadTypeName === '干线'
        //         ? row.paidGxHandlingFeeRec
        //         : row.paidDbHandlingFeeRec
        //     const unpaidFee =
        //       row.loadTypeName === '干线'
        //         ? row.unpaidGxHandlingFeeRec
        //         : row.unpaidDbHandlingFeeRec
        //     return this._setTextColor(fee, closeFee, unpaidFee, closeFee)
        //   },
        //   fixed: false
        // },
        // {
        //   label: '未核销操作费',
        //   prop: 'unpaidFee',
        //   width: '140',
        //   slot: scope => {
        //     const row = scope.row
        //     const fee =
        //       row.loadTypeName === '干线'
        //         ? row.gxHandlingFeeRec
        //         : row.dbHandlingFeeRec
        //     const closeFee =
        //       row.loadTypeName === '干线'
        //         ? row.paidGxHandlingFeeRec
        //         : row.paidDbHandlingFeeRec
        //     const unpaidFee =
        //       row.loadTypeName === '干线'
        //         ? row.unpaidGxHandlingFeeRec
        //         : row.unpaidDbHandlingFeeRec
        //     return this._setTextColor(fee, closeFee, unpaidFee, unpaidFee)
        //   },
        //   fixed: false
        // },
        // {
        //   label: '已付（应付）',
        //   prop: 'pandHandlingFeePay',
        //   width: '140',
        //   fixed: false
        // },
      {
        label: '备注',
        prop: 'remark',
        fixed: false
      }
      ],
      selectedDataList: []
    }
  },
  methods: {
    changeKey(obj) {
      this.total = 0
      this.searchQuery = obj
      this.fetchList()
    },
    getSearchParam(obj) {
      // 获取搜索条件
      this.searchQuery.currentPage = this.$options.data().searchQuery.currentPage
      this.searchQuery.pageSize = this.$options.data().searchQuery.pageSize
      this.searchQuery.vo = Object.assign({}, obj)
      this.fetchList()
    },
    handlePageChange(obj) {
      // 翻页
      this.searchQuery.currentPage = obj.pageNum
      this.searchQuery.pageSize = obj.pageSize
      this.fetchList()
    },
    fetchList() {
      // 调列表接口
      this.loading = true
      this.searchQuery.vo.sign = this.$options.data().searchQuery.vo.sign
      return payListByHandlingFee(this.searchQuery)
        .then(data => {
          if (data) {
            this.dataList = data.list
            // this.dataList.forEach((e, index) => {
            //   e.fee =
            //     e.loadTypeName === '干线'
            //       ? e.gxHandlingFeeRec
            //       : e.dbHandlingFeeRec
            //   e.paidFee =
            //     e.loadTypeName === '干线'
            //       ? e.paidGxHandlingFeeRec
            //       : e.paidDbHandlingFeeRec
            //   e.unpaidFee =
            //     e.loadTypeName === '干线'
            //       ? e.unpaidGxHandlingFeeRec
            //       : e.unpaidDbHandlingFeeRec
            //   e.pandHandlingFeePay =
            //     e.loadTypeName === '干线'
            //       ? e.paidGxHandlingFeePay
            //       : e.paidDbHandlingFeePay
            // })
            this.total = data.total
          }
          this.loading = false
        })
        .catch(err => {
          this.loading = false
          this._handlerCatchMsg(err)
        })
    },
    doAction(type) {
      switch (type) {
        case 'count':
          this.count()
          break
        case 'export':
          SaveAsFile({
            data: this.selectedDataList.length > 0
              ? this.selectedDataList
              : this.dataList,
            columns: this.tableColumn,
            name: '操作费核销' + parseTime(new Date(), '{y}{m}{d}{h}{i}{s}')
          })
          break
        case 'print':
          PrintInFullPage({
            data: this.selectedDataList.length > 0
              ? this.selectedDataList
              : this.dataList,
            columns: this.tableColumn,
            name: '操作费核销'
          })
          break
      }
    },
    count() {
      this.$router.push({
        path: '/finance/accountsLoadReceivable/handleFee',
        query: {
          tab: '操作费核销',
          currentPage: 'handleFee', // 本页面标识符
          searchQuery: JSON.stringify(this.searchQuery), // 搜索项
          selectListBatchNos: JSON.stringify(this.selectListBatchNos) // 列表选择项的批次号batchNo
        }
      })
    },
    clickDetails(row) {
      this.$refs.multipleTable.toggleRowSelection(row)
    },
    getSelection(list) {
      this.selectListBatchNos = []
      this.selectedDataList = list
      list.forEach((e, index) => {
        this.selectListBatchNos.push(e.batchNo)
      })
    },
    setTable() {
      this.setupTableVisible = true
    },
    closeSetupTable() {
      this.setupTableVisible = false
    },
    setColumn(obj) {
      // 重绘表格列表
      this.tableColumn = obj
      this.tablekey = Math.random() // 刷新表格视图
    },
    getSummaries(param) {
      return getSummaries(param)
    }
  }
}

</script>
