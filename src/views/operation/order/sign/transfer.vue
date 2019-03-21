<template>
    <div class="tab-content miniHeaderSearch" @success="fetchAllreceipt" v-loading="loading">
      <SearchForm :orgid="otherinfo.orgid" @change="getSearchParam" :btnsize="btnsize" />
      <div class="tab_info">
      <div class="btns_box">
        <el-button type="primary" :size="btnsize" icon="el-icon-circle-check-outline" plain @click="doAction('pick')" v-has:ORDERSIGN_ADD3>签收</el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-circle-close-outline" @click="doAction('cancel')" plain v-has:ORDERSIGN_CANCEL3>取消签收</el-button>
        <el-button type="primary" :size="btnsize"  icon="el-icon-edit" plain @click="doAction('amend')" v-has:ORDERSIGN_EDIT3>修改</el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-upload2" @click="doAction('export')" plain v-has:ORDERSIGN_EXP3>导出</el-button>
        <!-- <el-button type="primary" :size="btnsize"  @click="doAction('import')" plain>打印</el-button> -->
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
      <div class="info_tab_footer">共计:{{ total}} <div class="show_pager"> <Pager :total="total" @change="handlePageChange" /></div> </div>
      </div>
    <Addsign :isPick="isPick" :issender="true" :isDbclick="isDbclick" :repertoryId="repertoryId" :info="selectInfo" :orgid="orgid" :popVisible.sync="AddSignVisible" @close="openAddSign" @success="fetchData" :id="id" :isDelivery="isDelivery"></Addsign>
    <Addbatch  :issender="true" :dotInfo="dotInfo" :popVisible="popVisible" @close="closeAddBacth" @success="fetchData" :isModify="isModify" :isSongh="isSongh"></Addbatch>
    <TableSetup :popVisible="setupTableVisible" :columns="tableColumn" @close="closeSetupTable" @success="setColumn" :code="'ORDERSIGN3'"></TableSetup>
  </div>
</template>
<script>
import SearchForm from './components/search'
import { postTransferList, postCancelSign } from '@/api/operation/sign'
import { mapGetters } from 'vuex'
import Pager from '@/components/Pagination/index'
// import TableSetup from './components/tableSetup'
import TableSetup from '@/components/tableSetup'
import Addsign from './components/add'
import Addbatch from './components/batch'
import { objectMerge2, parseTime, getSummaries, operationPropertyCalc } from '@/utils/index'
import { parseShipStatus } from '@/utils/dict'
import { PrintInFullPage, SaveAsFile } from '@/utils/lodopFuncs'
import tableHeaderSearch from '@/components/tableHeaderSearch'
export default {
  components: {
    SearchForm,
    Addsign,
    Addbatch,
    TableSetup,
    Pager,
    tableHeaderSearch
  },
  computed: {
    ...mapGetters([
      'otherinfo'
    ]),
    orgid() {
            // console.log(this.selectInfo.orgid , this.searchQuery.vo.orgid , this.otherinfo.orgid)
      return this.isModify ? this.selectInfo.orgid : this.searchQuery.vo.orgid || this.otherinfo.orgid
    }
  },
  mounted() {
        // this.searchQuery.vo.orgId = this.otherinfo.orgid
    // Promise.all([this.fetchAllreceipt(this.otherinfo.orgid)]).then(resArr => {
    //   // this.loading = false
    //         // this.licenseTypes = resArr[1]
    // })
  },
  data() {
    return {
      btnsize: 'mini',
      component: 'Send',
      selectInfo: {},
      selected: [],
      dataset: [],
      AddSignVisible: false,
      AddBatchVisible: false,
      setupTableVisible: false,
      popVisible: false,
      isModify: false,
      isDelivery: false,
      isPick: false,
      isSongh: false,
      isDbclick: false,
      dotInfo: [],
      repertoryId: '',
      signId: '',
      tablekey: 0,
      total: 0,
      id: '',
      loading: true,
      searchQuery: {
        'currentPage': 1,
        'pageSize': 100,
        'vo': {
          'shipId': '',
          'signId': '',
          'signStatus': '226'
          // 'shipFromOrgid': 1
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
        label: '开单时间',
        prop: 'createTime',
        width: '165',
        slot: (scope) => {
          return `${parseTime(scope.row.createTime, '{y}-{m}-{d} {h}:{i}:{s}')}`
        },
        fixed: false
      }, {
        label: '签收状态',
        prop: 'signStatusName',
        width: '120',
        fixed: false
      }, {
        label: '凭证状态',
        prop: 'signCertificateName',
        width: '120',
        fixed: false
      }, {
        label: '签收时间',
        prop: 'signTime',
        width: '165',
        slot: (scope) => {
          return `${parseTime(scope.row.signTime, '{y}-{m}-{d} {h}:{i}:{s}')}`
        },
        fixed: false
      }, {
        label: '签收类型',
        prop: 'signTypeName',
        width: '120',
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
        label: '交接方式',
        prop: 'shipDeliveryMethodName',
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
        label: '发货人',
        prop: 'sender_customer_name',
        width: '120',
        fixed: false
      }, {
        label: '发货人电话',
        prop: 'sender_customer_mobile',
        width: '120',
        fixed: false
      }, {
        label: '发货人地址',
        prop: 'sender_detailed_address',
        width: '200',
        fixed: false
      }, {
        label: '收货人',
        prop: 'receiver_customer_name',
        width: '120',
        fixed: false
      }, {
        label: '收货人电话',
        prop: 'receiver_customer_mobile',
        width: '120',
        fixed: false
      }, {
        label: '收货地址',
        prop: 'receiver_detailed_address',
        width: '200',
        fixed: false
      }, {
        label: '代收款',
        prop: 'agencyFund',
        width: '90',
        fixed: false
      }, {
        label: '代收手续费',
        prop: 'commissionFee',
        width: '120',
        fixed: false
      }, {
        label: '运单标识',
        prop: 'shipIdentifying',
        width: '120',
        slot: (scope) => {
          return parseShipStatus(scope.row.shipIdentifying)
        },
        fixed: false
      }, {
        label: '签收人',
        prop: 'signName',
        width: '120',
        fixed: false
      }, {
        label: '签收证件',
        prop: 'signCocumentTypeName',
        width: '120',
        fixed: false
      }, {
        label: '证件号码',
        prop: 'documentNum',
        width: '120',
        fixed: false
      }, {
        label: '回单类型',
        prop: 'shipReceiptRequireName',
        width: '120',
        fixed: false
      }, {
        label: '回单号',
        prop: 'shipReceiptSn',
        width: '90',
        fixed: false
      }, {
        label: '回单份数',
        prop: 'shipReceiptNum',
        width: '120',
        fixed: false
      }, {
        label: '签收备注',
        prop: 'signRemark',
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
      }, {
        label: '付款方式',
        prop: 'shipPayWayName',
        width: '120',
        fixed: false
      }, {
        label: '运费合计',
        prop: 'shipTotalFee',
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
        label: '运费',
        prop: 'shipFee',
        width: '80',
        fixed: false
      }, {
        label: '回扣',
        prop: 'brokerageFee',
        width: '80',
        fixed: false
      }, {
        label: '声明价值',
        prop: 'productPrice',
        width: '120',
        fixed: false
      }, {
        label: '保险费',
        prop: 'insuranceFee',
        width: '90',
        fixed: false
      }, {
        label: '装卸费',
        prop: 'handlingFee',
        width: '90',
        fixed: false
      }, {
        label: '包装费',
        prop: 'packageFee',
        width: '90',
        fixed: false
      }, {
        label: '提货费',
        prop: 'pickupFee',
        width: '90',
        fixed: false
      }, {
        label: '上楼费',
        prop: 'goupstairsFee',
        width: '90',
        fixed: false
      }, {
        label: '实际提货费',
        prop: 'realityhandlingFee',
        width: '120',
        fixed: false
      }, {
        label: '叉车费',
        prop: 'forkliftFee',
        width: '90',
        fixed: false
      }, {
        label: '报关费',
        prop: 'customsFee',
        width: '90',
        fixed: false
      }, {
        label: '其他费收入',
        prop: 'otherfeeIn',
        width: '120',
        fixed: false
      }, {
        label: '其他费支出',
        prop: 'otherfeeOut',
        width: '120',
        fixed: false
      }, {
        label: '税率',
        prop: 'taxRate',
        width: '80',
        fixed: false
      }, {
        label: '税金',
        prop: 'taxes',
        width: '80',
        fixed: false
      }, {
        label: '入仓费',
        prop: 'housingFee',
        width: '120',
        fixed: false
      }, {
        label: '印花税',
        prop: 'stampTax',
        width: '90',
        fixed: false
      }, {
        label: '件数单价',
        prop: 'amountFees',
        width: '120',
        fixed: false
      }, {
        label: '重量单价',
        prop: 'weightFees',
        width: '120',
        fixed: false
      }, {
        label: '体积单价',
        prop: 'volumeFees',
        width: '120',
        fixed: false
      }, {
        label: '运单备注',
        prop: 'shipRemarks',
        width: '120',
        fixed: false
      }, {
        label: '送货车牌',
        prop: 'shipTruckIdNumber',
        width: '120',
        fixed: false
      }, {
        label: '送货司机',
        prop: 'dirverName',
        width: '120',
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
    parseShipStatus(id) {
      return parseShipStatus(id)
    },
    fetchAllreceipt() {
      this.loading = true
      return postTransferList(this.searchQuery).then(data => {
        this.dataset = data.list
        this.total = data.total
        this.signId = data.signId
        this.loading = false
      }).catch(err => {
        this._handlerCatchMsg(err)
      })
    },
    fetchData() {
      this.fetchAllreceipt()
    },
         // 获取组件返回的搜索参数
    getSearchParam(searchParam) {
      this.searchQuery.currentPage = this.$options.data().searchQuery.currentPage
      this.searchQuery.pageSize = this.$options.data().searchQuery.pageSize
            // 根据搜索参数请求后台获取数据
      objectMerge2(this.searchQuery.vo, searchParam)
            // this.searchQuery.vo.orgId = searchParam.orgid
      this.fetchData()
    },
    handlePageChange(obj) {
      this.searchQuery.currentPage = obj.pageNum
      this.searchQuery.pageSize = obj.pageSize
      this.fetchData()
    },
        // getSearchParam (searchParam) {
        //   Object.assign(this.searchQuery.vo, searchParam)
        //   this.fetchAllreceipt()
        // },
    doAction(type) {
      if (type === 'import') {
        this.showImport()
        return false
      }
          // 判断是否有选中项
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
            name: '中转签收-' + parseTime(new Date(), '{y}{m}{d}{h}{i}{s}')
          })
          break
        // 签收
        case 'pick':
          const ids = this.selected.filter(el => {
            return el.signStatus !== 227
          })
          if (ids.length > 1) {
               /*  this.searchQuery.vo.repertoryId = ids.map(el => {
                  return el.repertoryId
                }) */
            this.dotInfo = ids

            this.isSongh = true
                // this.isModify = true;
            this.isDelivery = true
            this.isPick = false
            this.openAddBatch()
          } else if (ids.length) {
            this.repertoryId = this.selected[0]
            this.isDbclick = false
            this.isDelivery = true
            this.isPick = false
            this.openAddSign()
          } else {
            this.$message({
              message: '不可重复签收',
              type: 'warning'
            })
          }
          break
        case 'amend':

          if (this.selected.length > 1) {
            this.$message({
              message: '每次只能修改单条数据',
              type: 'warning'
            })
          } else if (this.selected[0].signStatus === 227) {
            this.isPick = true
            this.isDbclick = false
            this.isDelivery = false
            this.repertoryId = this.selected[0]
            this.id = this.selected[0].signId
            console.log(this.id)
            this.openAddSign()
          } else {
            this.$message({
              message: '已签收状态才可以修改',
              type: 'warning'
            })
          }
          break

        case 'cancel':
          const _id = this.selected.filter(el => {
            return el.signStatus === 227
          })
          // console.log(_id, '9999')
          if (_id.length) {
            const shipId = this.selected[0].shipId
            const signId = this.selected[0].signId

            this.searchQuery.vo.shipId = shipId
            this.searchQuery.vo.signId = signId
                // console.log(repertoryId);
            postCancelSign(this.searchQuery.vo).then(res => {
              this.$message({
                message: '取消签收成功~',
                type: 'success'
              })
              // this.$emit('success')
              this.fetchAllreceipt()
              return false
            }).catch(err => {
              this._handlerCatchMsg(err)
            })
          } else {
            this.$message.warning('不可取消~')
          }
          break
      }
          // 清除选中状态，避免影响下个操作
      this.$refs.multipleTable.clearSelection()
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
    openAddSign() {
      this.AddSignVisible = true
    },
    closeAddSign() {
      this.AddSignVisible = false
    },
    openAddBatch() {
      this.popVisible = true
    },
    closeAddBacth() {
      this.popVisible = false
    },
    clickDetails(row, event, column) {
      this.$refs.multipleTable.toggleRowSelection(row)
    },
    getSelection(selected) {
      this.selected = selected
    },
    getDbClick(row, event) {
      this.repertoryId = row
      this.isPick = false
      this.isDbclick = true
      this.openAddSign()
    }

  }
}
</script>
