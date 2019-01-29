<template>
  <!-- 终端送货费 -->
  <div class="tab-content" v-loading="loading">
    <!-- 搜索 -->
    <SearchForm :orgid="otherinfo.orgid" @change="getSearchParam" :isTerminal="true" :btnsize="btnsize"></SearchForm>
    <!-- 操作按钮 -->
    <div class="tab_info">
      <div class="btns_box">
        <el-button type="primary" :size="btnsize" icon="el-icon-sort" v-has:REC_SET1 @click="doAction('count')" plain v-has:SHIP_PAYLIST7>核销</el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-printer" @click="doAction('print')" plain v-has:SHIP_PAYLIST7_PRINT>打印</el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-download" @click="doAction('export')" plain v-has:SHIP_PAYLIST7_EXPORT>导出</el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-setting" @click="setTable" class="table_setup" plain>表格设置</el-button>
      </div>
      <!-- 数据表格 -->
      <div class="info_tab">
        <el-table ref="multipleTable" :key="tablekey" :data="dataList" stripe border @row-click="clickDetails" @selection-change="getSelection" height="100%" tooltip-effect="dark" style="width:100%;" @cell-dblclick="showDetail" :show-summary="true" :summary-method="getSummaries">
          <el-table-column fixed sortable type="selection" width="60">
          </el-table-column>
          <template v-for="column in tableColumn">
            <el-table-column :key="column.id" :fixed="column.fixed" sortable :label="column.label" :prop="column.prop" v-if="!column.slot" :width="column.width">
            </el-table-column>
            <el-table-column :key="column.id" :fixed="column.fixed" sortable :label="column.label" v-else :width="column.width" :prop="column.prop">
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
import { objectMerge2, parseTime, getSummaries } from '@/utils/index'
import SearchForm from './components/search'
import Pager from '@/components/Pagination/index'
import TableSetup from '@/components/tableSetup'
import { postFindListByFeeType } from '@/api/finance/accountsPayable'
import { parseShipStatus } from '@/utils/dict'
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
      feeType: 49,
      selectListShipSns: [],
      searchQuery: {
        currentPage: 1,
        pageSize: 100,
        vo: {}
      },
      tablekey: 0,
      total: 0,
      dataList: [],
      loading: true,
      setupTableVisible: false,
      tableColumn: [{
          label: '序号',
          prop: 'number',
          width: '60',
          slot: (scope)=> {
             return ((this.searchQuery.currentPage - 1) * this.searchQuery.pageSize) + scope.$index + 1
          },
          fixed: true
        },{
          label: '运单号',
          prop: 'shipSn',
          width: '120',
          fixed: true
        },
        {
          label: '开单日期',
          prop: 'createTime',
          width: '160',
          slot: (scope) => {
            return `${parseTime(scope.row.createTime, '{y}-{m}-{d} {h}:{i}:{s}')}`
          },
          fixed: false
        },
        {
          label: '货号',
          prop: 'shipGoodsSn',
          width: '150',
          fixed: false
        },
        {
          label: '核销状态',
          prop: 'statusName',
          width: '90',
          fixed: true
        },
        {
          label: '终端送货费',
          prop: 'fee',
          width: '120',
          fixed: false
        },
        {
          label: '已核销终端送货费',
          prop: 'closeFee',
          width: '120',
          fixed: false,
          slot: (scope) => {
            const row = scope.row
            return this._setTextColor(row.fee, row.closeFee, row.unpaidFee, row.closeFee)
          }
        },
        {
          label: '未核销终端送货费',
          prop: 'unpaidFee',
          width: '120',
          fixed: false,
          slot: (scope) => {
            const row = scope.row
            return this._setTextColor(row.fee, row.closeFee, row.unpaidFee, row.unpaidFee)
          }
        },
        {
          label: '实收送货费',
          prop: 'fee',
          width: '120',
          fixed: false
        },
         {
          label: '实付送货费',
          prop: 'deliveryFeeToPay',
          width: '120',
          fixed: false
        },
        {
          label: '差额',
          prop: 'deliveryFeeDiffer',
          width: '90',
          fixed: false
        },
        {
          label: '发站',
          prop: 'shipFromCityName',
          width: '140',
          fixed: false
        },
        {
          label: '到站',
          prop: 'shipToCityName',
          width: '140',
          fixed: false
        },
        {
          label: '货品名',
          prop: 'cargoName',
          width: '120',
          fixed: false
        },
        {
          label: '件数',
          prop: 'cargoAmount',
          width: '90',
          fixed: false
        },
        {
          label: '重量(kg)',
          prop: 'cargoWeight',
          width: '90',
          fixed: false
        },
        {
          label: '体积(方)',
          prop: 'cargoVolume',
          width: '90',
          fixed: false
        },
        {
          label: '运单状态',
          prop: 'shipStatusName',
          width: '100',
          fixed: false
        },
        {
          label: '送货车牌',
          prop: 'truckIdNumber',
          width: '100',
          fixed: false
        },
        {
          label: '送货时间',
          prop: 'deliveryTime',
          width: '100',
          fixed: false
        },
        {
          label: '送货司机',
          prop: 'driverName',
          width: '100',
          fixed: false
        }
      ],
      selectedDataList: [] // 被勾选的数据行
    }
  },
  methods: {
    getSearchParam(obj) {
      this.searchQuery.currentPage = this.$options.data().searchQuery.currentPage
      this.searchQuery.pageSize = this.$options.data().searchQuery.pageSize
      this.$set(this.searchQuery.vo, 'feeType', this.feeType) // 8-应付终端送货费 10-实际提货费 13-其他费用支出 49-终端送货费
      this.searchQuery.vo = Object.assign({}, obj)
      this.fetchList()
    },
    handlePageChange(obj) {
      this.searchQuery.currentPage = obj.pageNum
      this.searchQuery.pageSize = obj.pageSize
      this.fetchList()
    },
    fetchList() {
      this.$set(this.searchQuery.vo, 'feeType', this.feeType)
      this.loading = true
      return postFindListByFeeType(this.searchQuery).then(data => {
        if (data) {
          this.dataList = data.list
          this.total = data.total
        }
        this.loading = false
      }).catch((err) => {
        this.loading = false
        this._handlerCatchMsg(err)
      })
    },
    setTable() {},
    doAction(type) {
      switch (type) {
        case 'count':
          this.count()
          break
        case 'export':
          SaveAsFile({
            data: this.selectedDataList.length > 0 ? this.selectedDataList : this.dataList,
            columns: this.tableColumn,
            name: '运单核销-终端送货费-' + parseTime(new Date(), '{y}{m}{d}{h}{i}{s}')
          })
          break
        case 'print':
          PrintInFullPage({
            data: this.selectedDataList.length > 0 ? this.selectedDataList : this.dataList,
            columns: this.tableColumn,
            name: '运单核销-终端送货费'
          })
          break
      }
    },
    count() {
      this.$router.push({
        path: '../../accountsLoad',
        query: {
          tab: '终端送货费核销',
          currentPage: 'waybillTerminal', // 本页面标识符
          searchQuery: JSON.stringify(this.searchQuery), // 搜索项
          selectListShipSns: JSON.stringify(this.selectListShipSns) // 列表选择项的批次号batchNo
        }
      })
    },
    clickDetails(row) {
      this.$refs.multipleTable.toggleRowSelection(row)
    },
    getSelection(list) {
      this.selectListShipSns = []
      this.selectedDataList = list
      list.forEach((e, index) => {
        this.selectListShipSns.push(e.shipSn)
      })
    },
    showDetail(order) {
      this.eventBus.$emit('showOrderDetail', order.shipId, order.shipSn, true)
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
    getSummaries(param) {
      return getSummaries(param)
    }
  }
}

</script>
