<template>
    <div class="tab-content miniHeaderSearch" v-loading="loading" @success="fetchAllreceipt">
      <SearchForm :orgid="otherinfo.orgid" title="发放" type="giveout_status" status="giveoutStatus" @change="getSearchParam" :btnsize="btnsize" />
      <div class="tab_info">
        <div class="btns_box">
            <el-button type="primary" :size="btnsize"  icon="el-icon-goods" plain @click="doAction('grant')" v-has:RECE_SENSUCCESS>回单发放</el-button>
            <!-- <el-button type="primary" :size="btnsize"  @click="doAction('cancel')" plain>取消发放</el-button> -->
            <!-- <el-button type="danger" :size="btnsize" icon="el-icon-delete" @click="doAction('delete')" plain>删除</el-button> -->
            <el-button type="primary" :size="btnsize" icon="el-icon-upload2" @click="doAction('export')" plain v-has:RECE_EXP4>导出</el-button>
            <el-button type="primary" :size="btnsize"  icon="el-icon-printer"@click="doAction('print')" plain v-has:RECE_PRI4>打印</el-button>
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
              prop="shipFromOrgid"
              width="120"
              label="发站">
            </el-table-column>
            <el-table-column
              label="到站"
              width="120"
              prop="shipToCityCode"
              sortable
              >
            </el-table-column>
            <el-table-column
              prop="giveoutStatusName"
              label="发放状态"
              width="120"
              sortable
              >
            </el-table-column>
            <el-table-column
              prop=""
              label="发放日期"
              width="200"
              sortable
              >
              <template slot-scope="scope">{{ scope.row.giveoutTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</template>
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
              prop="acceptRemark"
              label="回收备注"
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
              prop="cargoName"
              label="多笔付"
              width="120"
              sortable
            >
            </el-table-column>
            <el-table-column
              prop="cargoName"
              label="carrierName"
              width="120"
              sortable
              >
            </el-table-column>
            <el-table-column
              prop=""
              label="中转日期"
              width="120"
              sortable
              >
              <template slot-scope="scope">{{ scope.row.transferTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</template>
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
              width="120"
              sortable
              >
              <template slot-scope="scope">{{ scope.row.shipToCityName ? scope.row.shipToCityName.split(',')[0] : '' }}</template>
            </el-table-column>
            <el-table-column
              label="到达市"
              width="120"
              sortable
              >
              <template slot-scope="scope">{{ scope.row.shipToCityName ? scope.row.shipToCityName.split(',')[1] : '' }}</template>
            </el-table-column>
            <el-table-column
              label="到达区"
              width="120"
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
          <el-table ref="multipleTable" :data="dataset" border @row-click="clickDetails" @selection-change="getSelection" height="100%" tooltip-effect="dark" :key="tablekey" style="width:100%;"
          :summary-method="getSumLeft"
          show-summary
           :default-sort="{prop: 'id', order: 'ascending'}" stripe>
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
      </div>
      <div class="info_tab_footer">共计:{{ total }} <div class="show_pager"> <Pager :total="total" @change="handlePageChange" /></div> </div>
      <AddMark :popVisible="popVisible" :issender="true" :dotInfo="dotInfo" :searchQuery="searchQuery"  @close="closeAddDot" @success="fetchAllreceipt" :isGrant="isGrant"/>
      <TableSetup :popVisible="setupTableVisible" :columns="tableColumn" @close="closeSetupTable" @success="setColumn" code="RECEIPT4"></TableSetup>
  </div>
</template>
<script>
import SearchForm from './components/search'
import { postReceipt, putUpdateReceipt } from '@/api/operation/receipt'
import { mapGetters } from 'vuex'
import TableSetup from '@/components/tableSetup'
import Pager from '@/components/Pagination/index'
import { objectMerge2, parseTime, getSummaries, operationPropertyCalc } from '@/utils/index'
import { PrintInFullPage, SaveAsFile } from '@/utils/lodopFuncs'
import AddMark from './components/add'
import tableHeaderSearch from '@/components/tableHeaderSearch'
export default {
  components: {
    SearchForm,
    TableSetup,
    Pager,
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
      selected: [],
      dataset: [],
      dotInfo: [],
      loading: true,
      setupTableVisible: false,
      popVisible: false,
      isGrant: false,
      tablekey: 0,
      total: 0,
      searchQuery: {
        'currentPage': 1,
        'pageSize': 100,
        'vo': {
          'pageType': 4,
          'receiptIds': [],
          'giveoutStatus': 111
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
        label: '发放状态',
        prop: 'giveoutStatusName',
        width: '120',
        fixed: false
      }, {
        label: '发放日期',
        prop: 'giveoutTime',
        width: '165',
        slot: (scope) => {
          return `${parseTime(scope.row.giveoutTime, '{y}-{m}-{d} {h}:{i}:{s}')}`
        },
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
      this.searchQuery = obj
      this.fetchAllreceipt()
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
      objectMerge2(this.searchQuery.vo, searchParam)
      this.fetchAllreceipt()
    },
    doAction(type) {
      if (type === 'import') {
        this.showImport()
        return false
      }
          // 判断是否有选中项
      if (!this.selected.length && type !== 'print' && type !== 'export') {
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
          arr.forEach(e => {
            this.$set(e, 'shipToCityName1', e.shipToCityName ? e.shipToCityName.split(',')[0] : '')
            this.$set(e, 'shipToCityName2', e.shipToCityName ? e.shipToCityName.split(',')[1] : '')
            this.$set(e, 'shipToCityName3', e.shipToCityName.split(',')[2] ? e.shipToCityName.split(',')[2] : '')
          })

          const arrSel = objectMerge2([], this.selected) // 选择打勾的数据
          arrSel.forEach(e => {
            this.$set(e, 'shipToCityName1', e.shipToCityName ? e.shipToCityName.split(',')[0] : '')
            this.$set(e, 'shipToCityName2', e.shipToCityName ? e.shipToCityName.split(',')[1] : '')
            this.$set(e, 'shipToCityName3', e.shipToCityName.split(',')[2] ? e.shipToCityName.split(',')[2] : '')
          })
          SaveAsFile({
            data: arrSel.length ? arrSel : arr,
            columns: this.tableColumn,
            name: '回单发放'
          })
          break
          // 打印
        case 'print':
          const arr1 = objectMerge2([], this.dataset) // 所有的数据
          arr1.forEach(e => {
            this.$set(e, 'shipToCityName1', e.shipToCityName ? e.shipToCityName.split(',')[0] : '')
            this.$set(e, 'shipToCityName2', e.shipToCityName ? e.shipToCityName.split(',')[1] : '')
            this.$set(e, 'shipToCityName3', e.shipToCityName.split(',')[2] ? e.shipToCityName.split(',')[2] : '')
          })

          const arrSel1 = objectMerge2([], this.selected) // 选择打勾的数据
          arrSel1.forEach(e => {
            this.$set(e, 'shipToCityName1', e.shipToCityName ? e.shipToCityName.split(',')[0] : '')
            this.$set(e, 'shipToCityName2', e.shipToCityName ? e.shipToCityName.split(',')[1] : '')
            this.$set(e, 'shipToCityName3', e.shipToCityName.split(',')[2] ? e.shipToCityName.split(',')[2] : '')
          })
          PrintInFullPage({
            data: arrSel1.length ? arrSel1 : arr1,
            columns: this.tableColumn,
            name: '回单发放'
          })
          break
          // 回单发放
        case 'grant':
          const ids = this.selected.filter(el => {
            return el.giveoutStatus === 111
          }).map(el => {
            return el.receiptId
          })
          if (ids.length) {
            this.searchQuery.vo.receiptIds = ids
            this.dotInfo = ids
            this.popVisible = true
            // this.isAccept = true
            // this.isModify = false
            this.isGrant = true
            this.searchQuery.vo.receiptIds = ids
            // putUpdateReceipt(this.searchQuery.vo).then(res => {
            //   this.$message({
            //     message: '回单发放成功~',
            //     type: 'success'
            //   })
            //   this.fetchAllreceipt()
            //   return false
            // }).catch(err => {
            //   this._handlerCatchMsg(err)
            // })
          } else {
            this.$message.warning('请选择未发放项~')
          }
          break
      }
          // 清除选中状态，避免影响下个操作
      this.$refs.multipleTable.clearSelection()
    },
    setTable() {
      this.setupTableVisible = true
    },
    closeAddDot() {
      this.popVisible = false
    },
    setColumn(obj) { // 重绘表格列表
      this.tableColumn = obj
      this.tablekey = Math.random() // 刷新表格视图
    },
    closeSetupTable() {
      this.setupTableVisible = false
    },
    clickDetails(row, event, column) {
      this.$refs.multipleTable.toggleRowSelection(row)
    },
    getSelection(selected) {
      this.selected = selected
    }

  }
}
</script>
