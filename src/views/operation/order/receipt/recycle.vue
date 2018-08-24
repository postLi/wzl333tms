<template>
  <div class="tab-wrapper tab-wrapper-100">
    <div class="tab-content"  @success="fetchAllreceipt" v-loading="loading">
      <SearchForm :orgid="otherinfo.orgid" type="rec_status" title="回收" status="recStatus" :issender="true" @change="getSearchParam" :btnsize="btnsize" />
      <div class="tab_info">
        <div class="btns_box">
            <el-button type="primary" :size="btnsize" icon="el-icon-sort-down" plain @click="doAction('recycle')">回单回收</el-button>
            <el-button type="primary" :size="btnsize" icon="el-icon-remove-outline" @click="doAction('cancel')" plain>取消回收</el-button>
            <!-- <el-button type="danger" :size="btnsize" icon="el-icon-delete" @click="doAction('delete')" plain>删除</el-button> -->
            <el-button type="primary" :size="btnsize" icon="el-icon-upload2" @click="doAction('export')" plain>导出</el-button>
            <el-button type="primary" :size="btnsize" icon="el-icon-printer" @click="doAction('print')" plain>打印</el-button>
            <el-button type="primary" :size="btnsize" icon="el-icon-setting" plain @click="setTable" class="table_setup">表格设置</el-button>
        </div>
        <div class="info_tab">
            <!-- <el-table
              ref="multipleTable"
              :data="dataset"
              stripe
              border
              @row-click="clickDetails"
              @selection-change="getSelection"
              height="100%"
              tooltip-effect="dark"
              :default-sort = "{prop: 'id', order: 'ascending'}"
              style="width: 100%">
              <el-table-column
                fixed
                sortable
                type="selection"
                width="50">
              </el-table-column>
               <el-table-column
                fixed
                sortable
                prop="shipId"
                label="序号"
                width="200">
              </el-table-column>
              <el-table-column
                fixed
                sortable
                prop="fromOrgName"
                width="120"
                label="开单网点">
              </el-table-column>f
              <el-table-column
                prop="toOrgName"
                width="120"
                sortable
                label="目的网点">
              </el-table-column>
              <el-table-column
                prop=""
                sortable
                width="200"
                label="开单日期">
                <template slot-scope="scope">{{ scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</template>
              </el-table-column>
              <el-table-column
                prop="shipSn"
                sortable
                width="120"
                label="运单号">
              </el-table-column>
              <el-table-column
                sortable
                prop="shipFromCityName"
                width="120"
                label="出发城市">
              </el-table-column>
              <el-table-column
                label="到达城市"
                width="120"
                prop="shipToCityName"
                sortable
                >
              </el-table-column>
              <el-table-column
                prop="recStatusName"
                label="回收状态"
                width="120"
                sortable
                >
              </el-table-column>
              <el-table-column
                sortable
                prop=""
                width="200"
                label="回收日期">
                <template slot-scope="scope">{{ scope.row.recTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</template>
              </el-table-column>
              <el-table-column
                prop="backStatusName"
                label="回单状态"
                width="120"
                sortable
                >
              </el-table-column>
              <el-table-column
                prop="shipReceiptRequireName"
                label="回单类型"
                width="120"
                sortable
                >
              </el-table-column>
              <el-table-column
                prop="shipReceiptNum"
                label="回单数量"
                width="120"
                sortable
                >
              </el-table-column>
              <el-table-column
                prop="sendName"
                label="发货人"
                width="120"
                sortable
                >
              </el-table-column>
              <el-table-column
                prop="recName"
                label="收货人"
                width="120"
                sortable
                >
              </el-table-column>
              <el-table-column
                prop="cargoName"
                label="货品名"
                width="120"
                sortable
                >
              </el-table-column>
              <el-table-column
                prop="cargoAmount"
                label="件数"
                width="120"
                sortable
                >
              </el-table-column>
              <el-table-column
                prop="cargoWeight"
                label="重量"
                width="120"
                sortable
                >
              </el-table-column>
              <el-table-column
                prop="cargoVolume"
                label="体积"
                width="120"
                sortable
                >
              </el-table-column>
              <el-table-column
                prop="recTypeName"
                label="回收情况"
                width="120"
                sortable
                >
              </el-table-column>
              <el-table-column
                prop="shipPayWay"
                label="付款方式"
                width="120"
                sortable
                >
              </el-table-column>
              <el-table-column
                prop="shipNowpayFee"
                label="现付"
                width="120"
                sortable
                >
              </el-table-column>
              <el-table-column
                prop="shipArrivepayFee"
                label="到付"
                width="120"
                sortable
                >
              </el-table-column>
              <el-table-column
                prop="shipReceiptpayFee"
                label="回单付"
                width="120"
                sortable
                >
              </el-table-column>
              <el-table-column
                prop="shipMonthpayFee"
                label="月结"
                width="120"
                sortable
                >
              </el-table-column>
            
              <el-table-column
                prop=""
                label="多笔付"
                width="120"
                sortable
              >
              </el-table-column>
              <el-table-column
                prop="carrierName"
                label="中转承运商"
                width="120"
                sortable
                >
              </el-table-column>
              <el-table-column
                prop="transferTime"
                label="中转日期"
                width="120"
                sortable
                >
                <template slot-scope="scope">{{ scope.row.transferTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</template>
              </el-table-column>
              <el-table-column
                prop="oddNumbers"
                label="中转单号"
                width="120"
                sortable
                >
              </el-table-column>
             
              <el-table-column
                label="到达省"
                width="200"
                sortable
                >
                <template slot-scope="scope">{{ scope.row.shipToCityName ? scope.row.shipToCityName.split(',')[0] : '' }}</template>     
              </el-table-column>
              <el-table-column
                label="到达市"
                width="200"
                sortable
                >
                <template slot-scope="scope">{{ scope.row.shipToCityName ? scope.row.shipToCityName.split(',')[1] : '' }}</template>
              </el-table-column>
              <el-table-column
                label="到达区"
                width="200"
                sortable
                >
                <template slot-scope="scope">{{ scope.row.shipToCityName ? scope.row.shipToCityName.split(',')[2] : '' }}</template>
              </el-table-column>
              <el-table-column
                prop="sendMobile"
                label="发货人电话"
                width="120"
                sortable
                >
              </el-table-column>
              <el-table-column
                prop="sendAddress"
                label="发货地址"
                width="200"
                sortable
                >
              </el-table-column>
              <el-table-column
                prop="recMobile"
                label="收货人电话"
                width="120"
                sortable
                >
              </el-table-column>
              <el-table-column
                prop="recAddress"
                label="收货地址"
                width="200"
                sortable
                >
              </el-table-column>
              
              <el-table-column
                prop="recRemark"
                label="回收备注"
                width="120"
                sortable
                >
              </el-table-column>
              
            </el-table> -->
          <el-table ref="multipleTable" @row-dblclick="getDbClick" :data="dataset" border @row-click="clickDetails" @selection-change="getSelection" height="100%" tooltip-effect="dark" :key="tablekey" style="width:100%;" :default-sort="{prop: 'id', order: 'ascending'}" stripe>
            <el-table-column fixed sortable type="selection" width="50"></el-table-column>
            <template v-for="column in tableColumn">
              <el-table-column :key="column.id" :fixed="column.fixed" sortable :label="column.label" :prop="column.prop" v-if="!column.slot" :width="column.width"></el-table-column>
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
      <div class="info_tab_footer">共计:{{ total }} <div class="show_pager"> <Pager :total="total" @change="handlePageChange" /></div> </div>
    </div>
    <AddMark :popVisible="popVisible" :issender="true" :dotInfo="dotInfo" :searchQuery="searchQuery"  @close="closeAddDot" @success="fetchAllreceipt" :isModify="isModify" :isAccept="isAccept"/>
    <TableSetup :popVisible="setupTableVisible" :columns="tableColumn" @close="closeSetupTable" @success="setColumn"></TableSetup>
  </div>
</template>
<script>
import SearchForm from './components/search'
import { postReceipt, putUpdateCancelReceipt } from '@/api/operation/receipt'
import { mapGetters } from 'vuex'
import Pager from '@/components/Pagination/index'
import TableSetup from '@/components/tableSetup'
import AddMark from './components/add'
import { objectMerge2, parseTime } from '@/utils/index'
import { PrintInFullPage, SaveAsFile } from '@/utils/lodopFuncs'
export default {
  components: {
    SearchForm,
    Pager,
    TableSetup,
    AddMark
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
    this.fetchAllreceipt(this.otherinfo.orgid).then(res => {
                // this.loading = false
    })
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
        'pageSize': 10000,
        'vo': {
          'pageType': 1,
          'receiptIds': [],
          'recStatus': 105
        }
      },
      tableColumn: [{
        label: '序号',
        prop: 'id',
        width: '100',
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
        width: '180',
        slot: (scope) => {
          return `${parseTime(scope.row.createTime, '{y}-{m}-{d} {h}:{i}:{s}')}`
        },
        fixed: false
      }, {
        label: '出发城市',
        prop: 'shipFromCityName',
        width: '120',
        fixed: false
      }, {
        label: '到达城市',
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
          return `${parseTime(scope.row.recTime, '{y}-{m}-{d} {h}:{i}:{s}')}`
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
        width: '120',
        fixed: false
      }, {
        label: '件数',
        prop: 'cargoAmount',
        width: '120',
        fixed: false
      }, {
        label: '重量',
        prop: 'cargoWeight',
        width: '120',
        fixed: false
      }, {
        label: '体积',
        prop: 'cargoVolume',
        width: '120',
        fixed: false
      }, {
        label: '付款方式',
        prop: 'shipPayWayName',
        width: '120',
        fixed: false
      }, {
        label: '现付',
        prop: 'shipNowpayFee',
        width: '120',
        fixed: false
      }, {
        label: '到付',
        prop: 'shipArrivepayFee',
        width: '120',
        fixed: false
      }, {
        label: '回单付',
        prop: 'shipReceiptpayFee',
        width: '120',
        fixed: false
      }, {
        label: '月结',
        prop: 'shipMonthpayFee',
        width: '120',
        fixed: false
      }, {
        label: '中转承运商',
        prop: 'carrierName',
        width: '120',
        fixed: false
      }, {
        label: '中转日期',
        prop: 'transferTime',
        width: '180',
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
        prop: 'shipToCityName',
        width: '120',
        slot: (scope) => {
          return scope.row.shipToCityName ? scope.row.shipToCityName.split(',')[0] : ''
        },
        fixed: false
      }, {
        label: '到达市',
        prop: 'shipToCityName',
        width: '120',
        slot: (scope) => {
          return scope.row.shipToCityName ? scope.row.shipToCityName.split(',')[1] : ''
        },
        fixed: false
      }, {
        label: '到达县',
        prop: 'shipToCityName',
        width: '120',
        slot: (scope) => {
          return scope.row.shipToCityName ? scope.row.shipToCityName.split(',')[2] : ''
        },
        fixed: false
      }]
    }
  },
  methods: {
    fetchAllreceipt() {
      this.loading = true
      return postReceipt(this.searchQuery).then(data => {
        this.dataset = data.list
        this.total = data.total
        this.loading = false
        // console.log(data);
      })
    },
    fetchData() {
      this.fetchAllreceipt()
    },
    handlePageChange(obj) {
      this.searchQuery.currentPage = obj.pageNum
      this.searchQuery.pageSize = obj.pageSize
    },
    getSearchParam(searchParam) {
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
      if (!this.selected.length && type !== 'exprot' && type !== 'print') {
        this.$message({
          message: '请选择要操作的项~',
          type: 'warning'
        })
        return false
      }
      switch (type) {
        // 导出
        case 'export':
          SaveAsFile({
            data: this.selected.length ? this.selected : this.dataset,
            columns: this.tableColumn,
            name: '回单回收'
          })
          break
          // 打印
        case 'print':
          PrintInFullPage({
            data: this.selected.length ? this.selected : this.dataset,
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
              this.$message({
                type: 'error',
                message: err.errorInfo || err.text || '未知错误，请重试~'
              })
            })
          } else {
            this.$message.warning('回单已寄出不能取消~~')
          }

          break
      }
          // 清除选中状态，避免影响下个操作
      this.$refs.multipleTable.clearSelection()
    },
    closeAddDot() {
      this.popVisible = false
            // this.addDoTotVisible = false
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
