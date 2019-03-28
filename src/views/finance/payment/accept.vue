<template>
  <div class="tab-content miniHeaderSearch" v-loading="loading">
      <SearchForm :orgid="otherinfo.orgid" type="funds_account_status" title="到账" status="fundsAccountStatus" :issender="true" @change="getSearchParam" :btnsize="btnsize" />
      <div class="tab_info">
        <div class="btns_box">
            <el-button type="primary" :size="btnsize" icon="el-icon-sort" plain @click="doAction('send')" v-has:GOODSFUNDS_BACK3>货款到账</el-button>
            <el-button type="primary" :size="btnsize" icon="el-icon-remove-outline" @click="doAction('cancel')" plain v-has:GOODSFUNDS_CANCEL3>取消到账</el-button>
            <!-- <el-button type="danger" :size="btnsize" icon="el-icon-delete" @click="doAction('delete')" plain>删除</el-button> -->
            <el-button type="primary" :size="btnsize" icon="el-icon-upload2" @click="doAction('export')" plain v-has:GOODSFUNDS_EXP3>导出</el-button>
            <!-- <el-button type="primary" :size="btnsize" icon="el-icon-printer" @click="doAction('import')" plain>打印</el-button> -->
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
              prop="shipGoodsSn"
              sortable
              width="200"
              label="货号">
            </el-table-column>
            <el-table-column
              prop="fundsAccountStatusName"
              label="到账状态"
              width="120"
              sortable
              >
            </el-table-column>
            <el-table-column
              prop="fundsGoodsStatusName"
              label="货款状态"
              width="120"
              sortable
              >
            </el-table-column>
            <el-table-column
              prop="accountTime"
              label="到账日期"
              width="200"
              sortable
              >
              <template slot-scope="scope">{{ scope.row.acceptTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</template>
            </el-table-column>

            <el-table-column
              sortable
              prop="shipFromCityName"
              width="120"
              label="发站">
            </el-table-column>
            <el-table-column
              label="到站"
              width="120"
              prop="shipToCityName"
              sortable
              >
            </el-table-column>

            <el-table-column
              prop="agencyFund"
              label="代收货款"
              width="120"
              sortable
              >
            </el-table-column>
            <el-table-column
              prop="agencyFund"
              label="代收货款手续费"
              width="120"
              sortable
              >
            </el-table-column>

            <el-table-column
              prop="senderName"
              label="发货人"
              width="120"
              sortable
              >
            </el-table-column>
            <el-table-column
              prop="senderMobile"
              label="发货人电话"
              width="120"
              sortable
              >
            </el-table-column>
            <el-table-column
              prop="senderAddress"
              label="发货地址"
              width="120"
              sortable
              >
            </el-table-column>
            <el-table-column
              prop="receiptName"
              label="收货人"
              width="120"
              sortable
              >
            </el-table-column>
            <el-table-column
              prop="receiptMobile"
              label="收货人电话"
              width="120"
              sortable
              >
            </el-table-column>
            <el-table-column
              prop="receiptAddress"
              label="收货地址"
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
              prop="shipRemarks"
              label="运单备注"
              width="120"
              sortable
              >
            </el-table-column>

            <el-table-column
              prop="shipPayWayName"
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
          </el-table> -->
          <el-table ref="multipleTable" :data="dataset" border @row-click="clickDetails" @selection-change="getSelection" height="100%" tooltip-effect="dark" :key="tablekey" style="width:100%;" :default-sort="{prop: 'id', order: 'ascending'}" stripe>
          <el-table-column fixed sortable type="selection" width="50"></el-table-column>
          <template v-for="column in tableColumn">
            <el-table-column :key="column.id" :fixed="column.fixed" sortable :label="column.label" :prop="column.prop" v-if="!column.slot" :width="column.width">
                <template slot="header" slot-scope="scope">
                <tableHeaderSearch :scope="scope" :query="searchQuery" @change="changeKey"/>
              </template>
              <template slot-scope="scope">{{scope.row[column.prop]}}</template>
            </el-table-column>
            <el-table-column :key="column.id" :fixed="column.fixed" sortable :label="column.label" :prop="column.prop" v-else :width="column.width">
                <template slot="header" slot-scope="scope">
                <tableHeaderSearch :scope="scope" :query="searchQuery" @change="changeKey"/>
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

      <AddPayment :popVisible="popVisible" :issender="true" :dotInfo="dotInfo" proptitle="到账" :searchQuery="searchQuery"  @close="closeAddDot" @success="featchAllpayment" :isModify="isModify" :isAccept="isAccept"/>
      <TableSetup :popVisible="setupTableVisible" :columns="tableColumn" @close="closeSetupTable" @success="setColumn"></TableSetup>

</div>
</template>
<script>
import SearchForm from './components/search'
import { postGoodsfundsList, putUpdateCancelReceipt } from '@/api/finance/payment'
import { mapGetters } from 'vuex'
import Pager from '@/components/Pagination/index'
import TableSetup from '@/components/tableSetup'
import AddPayment from './components/add'
import { objectMerge2, parseTime } from '@/utils/index'
import { PrintInFullPage, SaveAsFile } from '@/utils/lodopFuncs'
import tableHeaderSearch from '@/components/tableHeaderSearch'
export default {
  components: {
    SearchForm,
    TableSetup,
    Pager,
    AddPayment,
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
    // this.featchAllpayment(this.otherinfo.orgid).then(res => {
    //   // this.loading = false
    // })
  },
  data() {
    return {
      btnsize: 'mini',
      component: 'Send',
      selectInfo: {},
      dataset: [],
      selected: [],
      dotInfo: {},
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
          'pageType': 3,
          'fundsAccountStatus': '260'
        }
      },
      tableColumn: [{
        label: '序号',
        prop: 'id',
        width: '70',
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
        label: '货号',
        prop: 'shipGoodsSn',
        width: '120',
        fixed: false
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
        label: '到账状态',
        prop: 'fundsAccountStatusName',
        width: '120',
        fixed: false
      }, {
        label: '货款状态',
        prop: 'fundsGoodsStatusName',
        width: '120',
        fixed: false
      }, {
        label: '到账日期',
        prop: 'accountTime',
        width: '165',
        slot: (scope) => {
          return `${parseTime(scope.row.accountTime, '{y}-{m}-{d} {h}:{i}:{s}')}`
        },
        fixed: false
      }, {
        label: '代收货款',
        prop: 'agencyFund',
        width: '120',
        fixed: false
      }, {
        label: '代收货款手续费',
        prop: 'agencyFund',
        width: '120',
        fixed: false
      }, {
        label: '发货人',
        prop: 'senderName',
        width: '120',
        fixed: false
      }, {
        label: '发货地址',
        prop: 'senderAddress',
        width: '120',
        fixed: false
      }, {
        label: '收货人',
        prop: 'receiptName',
        width: '120',
        fixed: false
      }, {
        label: '收货地址',
        prop: 'receiptAddress',
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
        label: '运单备注',
        prop: 'shipRemarks',
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
        label: '到达省',
        prop: 'endProvince',
        width: '120',
        fixed: false
      }, {
        label: '到达市',
        prop: 'endCity',
        width: '120',
        fixed: false
      }, {
        label: '到达县',
        prop: 'endArea',
        width: '120',
        fixed: false
      }]
    }
  },
  methods: {
    changeKey(obj) {
      this.total = 0
      this.searchQuery = obj
      if (!this.loading) {
        this.featchAllpayment()
      }
    },
    featchAllpayment() {
      this.loading = true
      return postGoodsfundsList(this.searchQuery).then(data => {
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
      this.featchAllpayment()
    },
    handlePageChange(obj) {
      this.searchQuery.currentPage = obj.pageNum
      this.searchQuery.pageSize = obj.pageSize
      this.fetchData()
    },
    // 获取组件返回的搜索参数
    getSearchParam(searchParam) {
            // this.searchQuery.vo.orgid = obj.orgid
            // this.searchQuery.vo.customerMobile = obj.mobile
            // this.searchQuery.vo.customerName = obj.name
      this.searchQuery.currentPage = this.$options.data().searchQuery.currentPage
      this.searchQuery.pageSize = this.$options.data().searchQuery.pageSize
      objectMerge2(this.searchQuery.vo, searchParam)
      this.featchAllpayment()
    },
    getSelection(selection) {
      this.selected = selection
          // console.log(this.selection)
    },
    doAction(type) {
          // 判断是否有选中项
      // console.log(this.selected)
      if (!this.selected.length && type !== 'export') {
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
          // arr.forEach(e => {
          //   this.$set(e, 'shipToCityName1', e.shipToCityName ? e.shipToCityName.split(',')[0] : '')
          //   this.$set(e, 'shipToCityName2', e.shipToCityName ? e.shipToCityName.split(',')[1] : '')
          //   this.$set(e, 'shipToCityName3', e.shipToCityName.split(',')[2] ? e.shipToCityName.split(',')[2] : '')
          // })

          const arrSel = objectMerge2([], this.selected) // 选择打勾的数据
          // arrSel.forEach(e => {
          //   this.$set(e, 'shipToCityName1', e.shipToCityName ? e.shipToCityName.split(',')[0] : '')
          //   this.$set(e, 'shipToCityName2', e.shipToCityName ? e.shipToCityName.split(',')[1] : '')
          //   this.$set(e, 'shipToCityName3', e.shipToCityName.split(',')[2] ? e.shipToCityName.split(',')[2] : '')
          // })
          SaveAsFile({
            data: arrSel.length ? arrSel : arr,
            columns: this.tableColumn,
            name: '货款到账'
          })
          break
          // 汇款
        case 'send':
          const ids = this.selected.filter(el => {
            return el.fundsAccountStatus === 260
          })

          if (ids.length) {
            // this.searchQuery.vo.goodsFundsIds = ids
            this.dotInfo = ids
            this.popVisible = true
                  // this.isAccept = true
            this.isModify = true
          } else {
            this.$message.warning('请选择未汇款项~')
          }
          break
            // 取消
        case 'cancel':

          const _ids = this.selected.filter(el => {
            return el.fundsAccountStatus === 261 && el.fundsGiveoutStatus === 263
          }).map(el => {
            return el.id
          })

          if (_ids.length) {
            this.searchQuery.vo.goodsFundsIds = _ids
            putUpdateCancelReceipt(this.searchQuery.vo).then(res => {
              this.$message({
                message: '取消汇款成功~',
                type: 'success'
              })
              this.featchAllpayment()
              return false
            }).catch(res => {
              this.$message.error(res.text)
              this.closeAddDot()
            })
          } else {
            this.$message.warning('不可取消~')
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
    setColumn(obj) { // 重绘表格列表
      this.tableColumn = obj
      this.tablekey = Math.random() // 刷新表格视图
    },
    clickDetails(row, event, column) {
      this.$refs.multipleTable.toggleRowSelection(row)
    },
    setTable() {
      this.setupTableVisible = true
    },
    closeSetupTable() {
      this.setupTableVisible = false
    }
  }
}
</script>
