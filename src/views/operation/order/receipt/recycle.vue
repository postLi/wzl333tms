<template>
    <div class="tab-content miniHeaderSearch"  @success="fetchAllreceipt" v-loading="loading">
      <SearchForm :orgid="otherinfo.orgid" type="rec_status" title="回收" status="recStatus" :issender="true" @change="getSearchParam" :btnsize="btnsize" />
      <div class="tab_info">
        <div class="btns_box">
            <el-button type="primary" :size="btnsize" icon="el-icon-sold-out" plain @click="doAction('recycle')" v-has:RECE_BACK>回单回收</el-button>
            <el-button type="warning" :size="btnsize" icon="el-icon-remove-outline" @click="doAction('cancel')" plain v-has:RECE_CANCEL>取消回收</el-button>
            <!-- <el-button type="danger" :size="btnsize" icon="el-icon-delete" @click="doAction('delete')" plain>删除</el-button> -->
            <el-button type="primary" :size="btnsize" icon="el-icon-upload2" @click="doAction('export')" plain v-has:RECE_EXP>导出</el-button>
            <el-button type="primary" :size="btnsize" icon="el-icon-printer" @click="doAction('print')" plain v-has:RECE_PRI>打印</el-button>
            <el-button type="primary" :size="btnsize" icon="el-icon-setting" plain @click="setTable" class="table_setup">表格设置</el-button>
        </div>
        <div class="info_tab">
          <el-table ref="multipleTable" @row-dblclick="getDbClick" :data="dataset" border @row-click="clickDetails" @selection-change="getSelection" height="100%"
          :summary-method="getSumLeft"
          show-summary
           tooltip-effect="dark" :key="tablekey" style="width:100%;" :default-sort="{prop: 'id', order: 'ascending'}" stripe>
            <el-table-column fixed sortable type="selection" width="70"></el-table-column>
            <template v-for="column in tableColumn">
              <el-table-column :key="column.id" :fixed="column.fixed" sortable :label="column.label" :prop="column.prop" v-if="!column.slot" :width="column.width">
                <template slot="header" slot-scope="scope">
                <tableHeaderSearch
                  :scope="scope"
                  :query="searchQuery"
                  @change="changeKey"
                />
              </template>
              <template slot-scope="scope">{{scope.row[column.prop]}}</template>
              </el-table-column>
              <el-table-column :key="column.id" :fixed="column.fixed" sortable :label="column.label" :prop="column.prop" v-else :width="column.width">
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
    <AddMark :popVisible="popVisible" :issender="true" :dotInfo="dotInfo" :searchQuery="searchQuery"  @close="closeAddDot" @success="fetchAllreceipt" :isModify="isModify" :isAccept="isAccept"/>
    <TableSetup :popVisible="setupTableVisible" :columns="tableColumn" @close="closeSetupTable" @success="setColumn" :code="'RECEIPT1'"></TableSetup>
  </div>
</template>
<script>
import SearchForm from './components/search'
import { postReceipt, putUpdateCancelReceipt } from '@/api/operation/receipt'
import { mapGetters } from 'vuex'
import Pager from '@/components/Pagination/index'
import TableSetup from '@/components/tableSetup'
import AddMark from './components/add'
import { objectMerge2, parseTime, getSummaries, operationPropertyCalc } from '@/utils/index'
import { PrintInFullPage, SaveAsFile } from '@/utils/lodopFuncs'
import tableHeaderSearch from '@/components/tableHeaderSearch'
export default {
  components: {
    SearchForm,
    Pager,
    TableSetup,
    AddMark,
    tableHeaderSearch
  },
  computed: {
    ...mapGetters([
      'otherinfo'
    ]),
    orgid() {
            // console.log(this.selectInfo.orgid , this.searchQuery.vo.orgid , this.otherinfo.orgid)
            // return this.isModify ? this.selectInfo.orgid : this.searchQuery.vo.orgid || this.otherinfo.orgid
    }
  },
  mounted() {
        // this.searchQuery.vo.orgid = this.otherinfo.orgid
    /* this.fetchAllreceipt(this.otherinfo.orgid).then(res => {
                // this.loading = false
    }).catch((err) => {
      this.loading = false
      this._handlerCatchMsg(err)
    }) */
  },
  data() {
    return {
      btnsize: 'mini',
      component: 'Send',
      selectInfo: {},
      dataset: [],
      selected: [],
      dotInfo: [],
      isModify: false,
      popVisible: false,
      setupTableVisible: false,
      isAccept: false,
      tablekey: 0,
      total: 0,
      // rec_status:113,
      loading: true,
      searchQuery: {
        'currentPage': 1,
        'pageSize': 100,
        'vo': {
          'pageType': 1,
          'receiptIds': [],
          'recStatus': 105
        }
      },
      tableColumn: [{
        label: '序号',
        prop: 'number',
        width: '60',
        fixed: true,
        slot: (scope) => {
          return ((this.searchQuery.currentPage - 1) * this.searchQuery.pageSize) + scope.$index + 1
        }
      }, {
        label: '运单号',
        prop: 'shipSn',
        width: '120',
        fixed: true
      }, {
        label: '开单网点',
        prop: 'fromOrgName',
        width: '120',
        fixed: false
      }, {
        label: '目的网点',
        prop: 'toOrgName',
        width: '120',
        fixed: false
      }, {
        label: '开单日期',
        prop: 'createTime',
        width: '165',
        slot: (scope) => {
          return `${parseTime(scope.row.createTime, '{y}-{m}-{d} {h}:{i}:{s}')}`
        },
        fixed: false
      }, {
        label: '发站',
        prop: 'shipFromCityName',
        width: '120',
        fixed: false
      }, {
        label: '到站',
        prop: 'shipToCityName',
        width: '120',
        fixed: false
      }, {
        label: '回收状态',
        prop: 'recStatusName',
        width: '120',
        fixed: false
      }, {
        label: '回收日期',
        prop: 'recTime',
        width: '180',
        slot: (scope) => {
          return `${parseTime(scope.row.recTime, '{y}-{m}-{d}')}`
        },
        fixed: false
      }, {
        label: '回收备注',
        prop: 'recRemark',
        width: '120',
        fixed: false
      }, {
        label: '回单状态',
        prop: 'backStatusName',
        width: '120',
        fixed: false
      }, {
        label: '回单类型',
        prop: 'shipReceiptRequireName',
        width: '120',
        fixed: false
      }, {
        label: '回单数量',
        prop: 'shipReceiptNum',
        width: '120',
        fixed: false
      }, {
        label: '发货人',
        prop: 'sendName',
        width: '120',
        fixed: false
      }, {
        label: '收货人',
        prop: 'recName',
        width: '120',
        fixed: false
      }, {
        label: '货品名',
        prop: 'cargoName',
        width: '90',
        fixed: false
      }, {
        label: '件数',
        prop: 'cargoAmount',
        width: '80',
        fixed: false
      }, {
        label: '重量',
        prop: 'cargoWeight',
        width: '80',
        fixed: false
      }, {
        label: '体积',
        prop: 'cargoVolume',
        width: '80',
        fixed: false
      }, {
        label: '付款方式',
        prop: 'shipPayWayName',
        width: '120',
        fixed: false
      }, {
        label: '现付',
        prop: 'shipNowpayFee',
        width: '80',
        fixed: false
      }, {
        label: '到付',
        prop: 'shipArrivepayFee',
        width: '80',
        fixed: false
      }, {
        label: '回单付',
        prop: 'shipReceiptpayFee',
        width: '90',
        fixed: false
      }, {
        label: '月结',
        prop: 'shipMonthpayFee',
        width: '80',
        fixed: false
      }, {
        label: '中转承运商',
        prop: 'carrierName',
        width: '120',
        fixed: false
      }, {
        label: '中转日期',
        prop: 'transferTime',
        width: '165',
        slot: (scope) => {
          return `${parseTime(scope.row.transferTime, '{y}-{m}-{d} {h}:{i}:{s}')}`
        },
        fixed: false
      }, {
        label: '中转单号',
        prop: 'oddNumbers',
        width: '120',
        fixed: false
      }, {
        label: '发货人电话',
        prop: 'sendMobile',
        width: '120',
        fixed: false
      }, {
        label: '发货地址',
        prop: 'sendAddress',
        width: '120',
        fixed: false
      }, {
        label: '收货人电话',
        prop: 'recMobile',
        width: '120',
        fixed: false
      }, {
        label: '收货地址',
        prop: 'recAddress',
        width: '120',
        fixed: false
      }, {
        label: '到达省',
        prop: 'endProvince',
        width: '120',
        // slot: (scope) => {
        //   return scope.row.shipToCityName ? scope.row.shipToCityName.split(',')[0] : ''
        // },
        fixed: false
      }, {
        label: '到达市',
        prop: 'endCity',
        width: '120',
        // slot: (scope) => {
        //   return scope.row.shipToCityName ? scope.row.shipToCityName.split(',')[1] : ''
        // },
        fixed: false
      }, {
        label: '到达县',
        prop: 'endArea',
        width: '120',
        // slot: (scope) => {
        //   return scope.row.shipToCityName ? scope.row.shipToCityName.split(',')[2] : ''
        // },
        fixed: false
      }]
    }
  },
  methods: {
    changeKey(obj) {
      this.total = 0
      this.searchQuery = obj
      if (!this.loading) {
        this.fetchAllreceipt()
      }
    },
    getSumLeft(param, type) {
      return getSummaries(param, operationPropertyCalc)
    },
    fetchAllreceipt() {
      this.loading = true
      return postReceipt(this.searchQuery).then(data => {
        this.dataset = data.list
        this.total = data.total
        this.loading = false
        // console.log(data);
      }).catch((err) => {
        this.loading = false
        this._handlerCatchMsg(err)
      })
    },
    fetchData() {
      this.fetchAllreceipt()
    },
    handlePageChange(obj) {
      this.searchQuery.currentPage = obj.pageNum
      this.searchQuery.pageSize = obj.pageSize
      this.fetchAllreceipt()
    },
    getSearchParam(searchParam) {
      this.searchQuery.currentPage = this.$options.data().searchQuery.currentPage
      this.searchQuery.pageSize = this.$options.data().searchQuery.pageSize
            // this.searchQuery.vo.orgid = obj.orgid
            // this.searchQuery.vo.customerMobile = obj.mobile
            // this.searchQuery.vo.customerName = obj.name
      objectMerge2(this.searchQuery.vo, searchParam)
      this.fetchAllreceipt()
    },
    getSelection(selection) {
      this.selected = selection
          // console.log(this.selection)
    },
    doAction(type) {
          // 判断是否有选中项
      console.log(this.selected)
      if (!this.selected.length && type !== 'export' && type !== 'print') {
        this.$message({
          message: '请选择要操作的项~',
          type: 'warning'
        })
        return false
      }
      switch (type) {
        // 导出
        case 'export':
          const arr = objectMerge2([], this.dataset) // 所有的数据
          const arrSel = objectMerge2([], this.selected) // 选择打勾的数据
          SaveAsFile({
            data: arrSel.length ? arrSel : arr,
            columns: this.tableColumn,
            name: '回单回收'
          })
          break
          // 打印
        case 'print':
          const arr1 = objectMerge2([], this.dataset) // 所有的数据
          const arrSel1 = objectMerge2([], this.selected) // 选择打勾的数据
          PrintInFullPage({
            data: arrSel1.length ? arrSel1 : arr1,
            columns: this.tableColumn,
            name: '回单回收'
          })
          break
          // 回单回收
        case 'recycle':
          const ids = this.selected.filter(el => {
            return el.recStatus === 105
          }).map(el => {
            return el.receiptId
          })
          console.log(ids)
          if (ids.length) {
            this.searchQuery.vo.receiptIds = ids
            this.dotInfo = ids
            this.popVisible = true
            // this.isAccept = true
            this.isModify = true
          } else {
            this.$message.warning('请选择未回收项~')
          }
          break
        case 'cancel':
          const _ids = this.selected.filter(el => {
            return el.recStatus === 106 && el.sendStatus === 107
          }).map(el => {
            return el.receiptId
          })

          console.log(this.selected)

          if (_ids.length) {
            this.searchQuery.vo.receiptIds = _ids
            putUpdateCancelReceipt(this.searchQuery.vo).then(res => {
              this.$message({
                message: '取消回收成功~',
                type: 'success'
              })
              this.fetchAllreceipt()
              return false
            }).catch(err => {
              this._handlerCatchMsg(err)
            })
          } else {
            this.$message.warning('回单未回收不可取消~')
          }

          break
      }
          // 清除选中状态，避免影响下个操作
      this.$refs.multipleTable.clearSelection()
    },
    closeAddDot() {
      this.popVisible = false
    },
    clickDetails(row, event, column) {
      this.$refs.multipleTable.toggleRowSelection(row)
    },
    setTable() {
      this.setupTableVisible = true
    },
    setColumn(obj) { // 重绘表格列表
      this.tableColumn = obj
      this.tablekey = Math.random() // 刷新表格视图
    },
    closeSetupTable() {
      this.setupTableVisible = false
    },
    getDbClick() {}
  }
}
</script>
