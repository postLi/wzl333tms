<template>
  <div class="tab-content miniHeaderSearch" v-loading="loading">
    <SearchForm :isbatch="true" :orgid="otherinfo.orgid" @change="getSearchParam" :btnsize="btnsize" />
    <div class="tab_info">
      <div class="btns_box">
          <el-button type="info" :size="btnsize" icon="el-icon-delete" @click="doAction('cancel')" plain v-has:TRANSFER_DELETE2>取消中转</el-button>
          <el-button type="primary" :size="btnsize" icon="el-icon-edit-outline" @click="doAction('export')" plain v-has:TRANSFER_EXPORT2>导出</el-button>
          <el-button type="primary" :size="btnsize" icon="el-icon-edit-outline" @click="doAction('print')" plain v-has:TRANSFER_PRINT2>打印</el-button>
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
          @row-dblclick="openAddOrder"
          @selection-change="getSelection"
          height="100%"
          tooltip-effect="dark"
          :default-sort = "{prop: 'id', order: 'ascending'}"
          style="width: 100%">

          <el-table-column
            fixed
            sortable
            type="selection"
            width="70">
          </el-table-column>
          <template v-for="column in tableColumn">
            <el-table-column
              :key="column.id"
               show-overflow-tooltip
              :fixed="column.fixed"
              sortable
              :label="column.label"
              :prop="column.prop"
              v-if="!column.slot"
              :width="column.width">
              <template slot="header" slot-scope="scope">
                <tableHeaderSearch
                  :scope="scope"
                  :query="searchQuery"
                  @change="changeKey"
                />
              </template>
              <template slot-scope="scope">{{scope.row[column.prop]}}</template>
            </el-table-column>
            <el-table-column
              :key="column.id"
              :fixed="column.fixed"
               show-overflow-tooltip
              sortable
              :label="column.label"
              :prop="column.prop"
              v-else
              :width="column.width">
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
      <div class="info_tab_footer">共计:{{ total }} <div class="show_pager"> <Pager :total="total" @change="handlePageChange" /></div> </div>
    </div>
    <AddOrder @action="setAction" :isModify="isModify" :info="selectInfo" :orgid="orgid" :popVisible.sync="AddOrderVisible" @close="closeAddOrder" @success="fetchData"  />
    <TableSetup :popVisible="setupTableVisible" @close="closeSetupTable" :columns='tableColumn' @success="setColumn" code="TRANSFER_LOAD" />
  </div>
</template>
<script>
import * as transferManageApi from '@/api/operation/transfer'
import SearchForm from './components/search'
import TableSetup from '@/components/tableSetup'
import AddOrder from './components/add'
import { mapGetters } from 'vuex'
import Pager from '@/components/Pagination/index'
import { parseTime, uniqArray } from '@/utils/'
import { PrintInFullPage, SaveAsFile } from '@/utils/lodopFuncs'
import tableHeaderSearch from '@/components/tableHeaderSearch'

export default {
  components: {
    SearchForm,
    Pager,
    TableSetup,
    AddOrder,
    tableHeaderSearch
  },
  computed: {
    ...mapGetters([
      'otherinfo'
    ]),
    orgid() {
      console.log(this.selectInfo.orgid, this.searchQuery.vo.orgid, this.otherinfo.orgid)
      return this.isModify ? this.selectInfo.orgid : this.searchQuery.vo.orgId || this.otherinfo.orgid
    }
  },
  mounted() {
    /* this.searchQuery.vo.orgid = this.otherinfo.orgid
    this.fetchAllTransfer(this.otherinfo.orgid).then(res => {
      this.loading = false
    }) */
  },
  data() {
    const _this = this
    return {
      btnsize: 'mini',
      usersArr: [],
      total: 0,
      // 加载状态
      loading: true,
      setupTableVisible: false,
      AddOrderVisible: false,
      isModify: false,
      selectInfo: {},
      addCarrierVisible: false,
      // 选中的行
      selected: [],
      searchQuery: {
        'currentPage': 1,
        'pageSize': 100,
        'vo': {
          'orgId': 1,
          'transferTimeStart': '',
          'transferTimeEnd': '',
          'ydCreateTimeStart': '',
          'ydCreateTimeEnd': '',
          'carrierId': '',
          'shipFromCityName': '',
          'shipToCityName': ''
        }
      },
      // 默认sort值为true
      tablekey: '',
      tableColumn: [{
        label: '序号',
        prop: 'number',
        width: '70',
        fixed: true,
        slot: (scope) => {
          return ((this.searchQuery.currentPage - 1) * this.searchQuery.pageSize) + scope.$index + 1
        }
      }, {
        'label': '中转批次',
        'prop': 'transferBatchNo',
        'width': '150',
        'slot': function(scope) {
          return scope.row.transferBatchNo
        }
      }, {
        'label': '中转时间',
        'prop': 'transferTime',
        'width': '180',
        'slot': function(scope) {
          return `${parseTime(scope.row.transferTime)}`
        }
      }, {
        'label': '承运商',
        'prop': 'carrierName',
        'width': '150'
      }, {
        'label': '承运商电话',
        'prop': 'carrierMobile',
        'width': '150'
      }, {
        label: '到付(元)',
        prop: 'shipArrivepayFee',
        width: '90',
        fixed: false
      }, {
        'label': '中转件数',
        'prop': 'transferAmount',
        'width': '150'
      }, {
        'label': '中转体积(kg)',
        'prop': 'transferVolume',
        'width': '150'
      }, {
        'label': '中转重量(m³)',
        'prop': 'transferWeight',
        'width': '150'
      }, {
        'label': '代收货款(元)',
        'prop': 'codService',
        'width': '150'
      }, {
        'label': '中转运费(元)',
        'prop': 'transferCharge',
        'width': '150'
      }, {
        'label': '中转送货费(元)',
        'prop': 'deliveryExpense',
        'width': '150'
      }, {
        'label': '中转费其他费(元)',
        'prop': 'transferOtherFee',
        'width': '150'
      }, {
        'label': '中转费合计(元)',
        'prop': 'totalCost',
        'width': '150'
      }, {
        'label': '中转费付款方式',
        'prop': 'paymentName',
        'width': '150'
      }, {
        'label': '中转备注',
        'prop': 'remark',
        'width': '150'
      }]
    }
  },
  methods: {
    changeKey(obj) {
      this.searchQuery = obj
      this.fetchAllTransfer()
    },
    fetchAllTransfer() {
      this.loading = true
      return transferManageApi.getAlreadyTransferBatchList(this.searchQuery).then(data => {
        this.usersArr = data.list
        this.total = data.total
        this.loading = false
        console.log('this.usersArr:', this.usersArr, data)
      }).catch((err) => {
        this.loading = false
        this._handlerCatchMsg(err)
      })
    },
    fetchData() {
      this.fetchAllTransfer()
    },
    handlePageChange(obj) {
      this.searchQuery.currentPage = obj.pageNum
      this.searchQuery.pageSize = obj.pageSize
      this.fetchData()
    },
    getSearchParam(obj) {
      this.searchQuery.currentPage = this.$options.data().searchQuery.currentPage
      this.searchQuery.pageSize = this.$options.data().searchQuery.pageSize
      this.searchQuery.vo = obj
      this.loading = false
      this.fetchData()
    },
    setAction(type, val) {
      if (type === 'cancel') {
        this.cancelBatch(val)
      }
    },
    cancelBatch(transferBatchNos) {
      this.$confirm('确定要取消 ' + transferBatchNos.length + ' 条运单吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
          // 提交前先进行去重
        transferManageApi.deleteTransfer(this.otherinfo.orgid, uniqArray(transferBatchNos).join(','), '').then(res => {
          this.$message({
            type: 'success',
            message: '取消成功!'
          })
          this.fetchData()
        }).catch(err => {
          this.$message({
            type: 'info',
            message: '取消失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
          })
        })
      }).catch((err) => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    doAction(type) {
      // 判断是否有选中项
      if (!this.selected.length && type !== 'waifa' && type !== 'export' && type !== 'print') {
        this.closeAddOrder()
        this.$message({
          message: '请选择要操作的项~',
          type: 'warning'
        })
        return false
      }

      console.log('this.selected:', this.selected)

      switch (type) {
          // 中转外发
        case 'waifa':
          this.isModify = false
          this.selectInfo = {}
          this.$router.push('/operation/order/transferLoad')
          break
          // 修改中转信息
        case 'modify':
          this.isModify = true
          if (this.selected.length > 1) {
            this.$message({
              message: '每次只能修改单条数据~',
              type: 'warning'
            })
          }
          this.selectInfo = this.selected[0]
          this.$router.push({ path: '/operation/order/transferLoad', query: {
            id: this.selectInfo.transferBatchNo
          }})
          break
          // 跟踪中转
        case 'track':
          if (this.selected.length > 1) {
            this.$message({
              message: '每次只能操作单条数据~',
              type: 'warning'
            })
          }
          const id = this.selected[0].id

          this.$router.push({ path: '/operation/order/track', query: {
            transfer: id
          }})
          break
          // 取消中转
        case 'cancel':
          const avaiableItem = this.selected.filter(el => {
            return el.ship_status !== 67
          })
          if (!avaiableItem.length) {
            this.$message.warning('已签收运单不能被取消~')
          } else {
                  // 获取批次
            const transferBatchNos = avaiableItem.map(el => {
              return el.transferBatchNo
            })
                  // 获取运单号
            const shipSns = avaiableItem.map(el => {
              return el.shipSn
            })

            this.cancelBatch(transferBatchNos)
          }

          break
          // 导出数据
        case 'export':
          SaveAsFile({
            data: this.selected.length ? this.selected : this.usersArr,
            columns: this.tableColumn,
            name: '中转批次列表-' + parseTime(new Date(), '{y}{m}{d}{h}{i}{s}')
          })
          break
        case 'print':
          PrintInFullPage({
            data: this.selected.length ? this.selected : this.usersArr,
            columns: this.tableColumn,
            name: '中转批次列表'
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
    openAddOrder(item) {
      this.selectInfo = item
      this.AddOrderVisible = true
    },
    closeAddOrder() {
      this.AddOrderVisible = false
    },
    clickDetails(row, event, column) {
      this.$refs.multipleTable.toggleRowSelection(row)
    },
    getSelection(selection) {
      this.selected = selection
    }
  }
}
</script>
