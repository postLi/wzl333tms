<template>
  <div class="tab-content miniHeaderSearch" v-loading="loading">
    <!-- 库存总表 -->
    <SearchForm :orgid="otherinfo.orgid" @change="getSearchParam" :btnsize="btnsize" />
    <div class="tab_info">
      <div class="btns_box">
        <el-button type="primary" :size="btnsize" icon="el-icon-menu" plain @click="doAction('colorpicker')" v-has:ORDER_COLOUR1>提醒颜色设置</el-button>
        <el-button type="success" :size="btnsize" icon="el-icon-printer" @click="doAction('print')" plain v-has:ORDER_COLOURP1>打印</el-button>
        <el-button type="success" :size="btnsize" icon="el-icon-download" @click="doAction('export')" plain v-has:ORDER_COLOUREXP1>导出</el-button>
        <el-popover
            @mouseenter.native="showSaveBox"
            @mouseout.native="hideSaveBox"
            placement="top"
            width="160"
            trigger="manual"
            v-model="visible2">
            <p>表格宽度修改了，是否要保存？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="visible2 = false">取消</el-button>
              <el-button type="primary" size="mini" @click="saveToTableSetup">确定</el-button>
            </div>
            <el-button slot="reference" type="primary" :size="btnsize" icon="el-icon-setting" plain @click="setTable" class="table_setup" 
           >表格设置</el-button>
          </el-popover>
      </div>
      <div class="info_tab">
        <el-table ref="multipleTable" @row-dblclick="showDetail" :data="repertoryArr" border @row-click="clickDetails" @selection-change="getSelection" height="100%" tooltip-effect="dark" @header-dragend="setTableWidth" :row-style="tableRowColor"
        :summary-method="getSumLeft"
          show-summary
         :key="tablekey" style="width:100%;" :default-sort="{prop: 'id', order: 'ascending'}" stripe>
          <el-table-column fixed sortable type="selection" width="60">
          </el-table-column>
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
            <el-table-column :key="column.id" :fixed="column.fixed" :prop="column.prop" sortable :label="column.label" v-else :width="column.width">
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
      <div class="info_tab_footer">
        共计:{{ total }}
        <div class="show_pager">
          <Pager :total="total" @change="handlePageChange" />
        </div>
      </div>
      <!-- 颜色设置弹出框 -->
      <Colorpicker :popVisible="colorpickerVisible" :reportors="reportorSelect" @close="closeColorpicker" @success="setColumColor"></Colorpicker>
      <!-- 表格设置弹出框 -->
      <TableSetup :code="thecode" :popVisible="setupTableVisible" :columns='tableColumn' @close="closeSetupTable" @success="setColumn"></TableSetup>
    </div>
  </div>
</template>
<script>
import { postAllOrderRepertory } from '@/api/operation/repertory'
import { mapGetters } from 'vuex'
import SearchForm from './components/search'
import Colorpicker from './components/colorpicker'
import Pager from '@/components/Pagination/index'
import TableSetup from '@/components/tableSetup'
import { objectMerge2, parseTime, getSummaries, operationPropertyCalc } from '@/utils/index'
import { parseShipStatus } from '@/utils/dict'
import { PrintInFullPage, SaveAsFile } from '@/utils/lodopFuncs'
import tableHeaderSearch from '@/components/tableHeaderSearch'
export default {
  components: {
    Pager,
    SearchForm,
    Colorpicker,
    TableSetup,
    tableHeaderSearch
  },
  data() {
    return {
      thecode: 'ORDER_REPER_ALL',
      visible2: false,
      isFix: false,
      total: 0,
      tablekey: '',
      btnsize: 'mini',
      setupTableVisible: false,
      repertoryArr: [],
      selected: [],
      loading: true,
      colorpickerVisible: false,
      isModify: false,
      selectInfo: [],
      selectionColorSetting: {},
      reportorSelect: {},
      searchQuery: {
        currentPage: 1,
        pageSize: 100,
        vo: {
          orgId: 1
        }
      },
      tableColumn: [{
        label: '序号',
        prop: 'number',
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
      },
      {
        label: '运单状态',
        prop: 'shipStatusName',
        width: '80',
        fixed: false
      },
      {
        label: '运单标识',
        prop: 'shipIdentifying',
        width: '150',
        fixed: false,
        slot: function(scope) {
          return parseShipStatus(scope.row.shipIdentifying)
        }
      },
      {
        label: '入库时间',
        prop: 'repertoryCreateTime',
        width: '160',
          // slot: (scope) => {
          //   return `${parseTime(scope.row.repertoryCreateTime, '{y}-{m}-{d} {h}:{i}:{s}')}`
          // },
        fixed: false
      },
      {
        label: '库存时长',
        prop: 'hashour',
        width: '110',
        fixed: false
      },
      {
        label: '开单网点',
        prop: 'fromOrgName',
        width: '110',
        fixed: false
      },
      {
        label: '开单时间',
        prop: 'createTime',
        width: '160',
          // slot: (scope) => {
          //   return `${parseTime(scope.row.createTime, '{y}-{m}-{d} {h}:{i}:{s}')}`
          // },
        fixed: false
      },
      {
        label: '货品名',
        prop: 'cargoName',
        width: '150',
        fixed: false
      },
      {
        label: '库存件数',
        prop: 'repertoryAmount',
        width: '90',
        fixed: false
      },
      {
        label: '库存重量',
        prop: 'repertoryWeight',
        width: '90',
        fixed: false
      },
      {
        label: '库存体积',
        prop: 'repertoryVolume',
        width: '90',
        fixed: false
      },
      {
        label: '运单件数',
        prop: 'cargoAmount',
        width: '90',
        fixed: false
      },
      {
        label: '运单重量',
        prop: 'cargoWeight',
        width: '90',
        fixed: false
      },
      {
        label: '运单体积',
        prop: 'cargoVolume',
        width: '90',
        fixed: false
      },
      {
        label: '发站',
        prop: 'shipFromCityName',
        width: '150',
        fixed: false
      },
      {
        label: '到站',
        prop: 'shipToCityName',
        width: '150',
        fixed: false
      },
      {
        label: '发货人',
        prop: 'senderCustomerName',
        width: '100',
        fixed: false
      },
      {
        label: '发货人电话',
        prop: 'senderCustomerMobile',
        width: '110',
        fixed: false
      },
      {
        label: '收货人',
        prop: 'receiverCustomerName',
        width: '100',
        fixed: false
      },
      {
        label: '收货人电话',
        prop: 'receiverCustomerMobile',
        width: '110',
        fixed: false
      },
      {
        label: '交接方式',
        prop: 'shipDeliveryMethodName',
        width: '90',
        fixed: false
      },
      {
        label: '运费',
        prop: 'shipFee',
        width: '90',
        fixed: false
      },
      {
        label: '提货费',
        prop: 'pickupFee',
        width: '90',
        fixed: false
      },
        // {
        //   label: "实际提货费",
        //   prop: "realityhandlingFee",
        //   width: "90"
        // },
      {
        label: '回扣',
        prop: 'brokerageFee',
        width: '90',
        fixed: false
      },
      {
        label: '保险费',
        prop: 'insuranceFee',
        width: '90',
        fixed: false
      },
      {
        label: '声明价值',
        prop: 'productPrice',
        width: '90',
        fixed: false
      },
      {
        label: '包装费',
        prop: 'packageFee',
        width: '90',
        fixed: false
      },
      {
        label: '送货费',
        prop: 'deliveryFee',
        width: '90',
        fixed: false
      },
      {
        label: '运费合计',
        prop: 'shipTotalFee',
        width: '90',
        fixed: false
      },
      {
        label: '付款方式',
        prop: 'shipPayWayName',
        width: '90',
        fixed: false
      },
      {
        label: '现付',
        prop: 'shipNowpayFee',
        width: '90',
        fixed: false
      },
      {
        label: '到付',
        prop: 'shipArrivepayFee',
        width: '90',
        fixed: false
      },
      {
        label: '回单付',
        prop: 'shipReceiptpayFee',
        width: '90',
        fixed: false
      },
      {
        label: '月结',
        prop: 'shipMonthpayFee',
        width: '90',
        fixed: false
      },
      {
        label: '备注',
        prop: 'shipRemarks',
        width: '150',
        fixed: false
      },
        // {
        //   label: "到达省",
        //   prop: "orgId",
        //   width: "150"
        // },
        // {
        //   label: "到达市",
        //   prop: "orgId",
        //   width: "150"
        // },
        // {
        //   label: "到达县区",
        //   prop: "orgId",
        //   width: "150"
        // },
      {
        label: '发货方',
        prop: 'senderCustomerUnit',
        width: '120',
        fixed: false
      },
      {
        label: '发货地址',
        prop: 'senderDetailedAddress',
        width: '120',
        fixed: false
      },
      {
        label: '收货方',
        prop: 'receiverCustomerUnit',
        width: '120',
        fixed: false
      },
      {
        label: '收货地址',
        prop: 'receiverDetailedAddress',
        width: '120',
        fixed: false
      },
      {
        label: '货号',
        prop: 'shipGoodsSn',
        width: '150',
        fixed: false
      },
      {
        label: '品种规格',
        prop: 'description',
        width: '100',
        fixed: false
      },
      {
        label: '件数单价',
        prop: 'amountFee',
        width: '90',
        fixed: false
      },
      {
        label: '重量单价',
        prop: 'weightFee',
        width: '90',
        fixed: false
      },
      {
        label: '体积单价',
        prop: 'volumeFee',
        width: '90',
        fixed: false
      },
      {
        label: '回单号',
        prop: 'shipReceiptSn',
        width: '150',
        fixed: false
      },
      {
        label: '回单要求',
        prop: 'shipReceiptRequireName',
        width: '150',
        fixed: false
      },
      {
        label: '回单份数',
        prop: 'shipReceiptNum',
        width: '90',
        fixed: false
      },
      {
        label: '代收货款',
        prop: 'agencyFund',
        width: '90',
        fixed: false
      },
      {
        label: '代收款手续费',
        prop: 'commissionFee',
        width: '120',
        fixed: false
      },
      {
        label: '制单人',
        prop: 'userName',
        width: '90'
      },
      {
        label: '毛利',
        prop: 'grossProfit',
        width: '90'
      },
      {
        label: '客户单号',
        prop: 'shipCustomerNumber',
        width: '150',
        fixed: false
      },
      {
        label: '运输方式',
        prop: 'shipShippingTypeName',
        width: '100',
        fixed: false
      },
      {
        label: '业务类型',
        prop: 'shipBusinessTypeName',
        width: '100',
        fixed: false
      },
      {
        label: '时效',
        prop: 'shipEffectiveName',
        width: '100',
        fixed: false
      },
      {
        label: '上楼费',
        prop: 'goupstairsFee',
        width: '90',
        fixed: false
      },
      {
        label: '叉车费',
        prop: 'forkliftFee',
        width: '90',
        fixed: false
      },
      {
        label: '装卸费',
        prop: 'handlingFee',
        width: '90',
        fixed: false
      },
        // {
        //   label: "实际装卸费",
        //   prop: "realityhandlingFee",
        //   width: "90"
        // },
      {
        label: '入仓费',
        prop: 'housingFee',
        width: '90',
        fixed: false
      }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'otherinfo'
    ]),
    orgid() {
      return this.isModify ? this.selectInfo.orgid : this.searchQuery.vo.orgId || this.otherinfo.orgid
    }
  },
  mounted() {
    this.initTable()
    this.searchQuery.vo.orgId = this.otherinfo.orgid
    // this.fetchAllOrderRepertory()
  },
  methods: {
    changeKey(obj) {
      this.searchQuery = obj
      this.fetchAllOrderRepertory()
    },
    getSumLeft(param, type) {
      return getSummaries(param, operationPropertyCalc)
    },
    showDetail(order) {
      this.eventBus.$emit('showOrderDetail', order.shipId, order.shipSn, true)
    },
    initTable() {
      // let strArray = this.$refs.multipleTable.$children
      const strArray = this.$refs.multipleTable.columns
      this.$refs.multipleTable.columns.forEach((e, index) => {
        if (index > 0) {
          if (e.label === '运单状态') {
            e.fixed = true
          }
        }
      })
      // this.$refs.multipleTable.$children[2].fixed = true
      // str.forEach((e, index) => {
      //   if (e.columnConfig && index > 0) {
      //     if (e.columnConfig.label === '运单状态') {
      //       // this.isFix = true
      //       e.columnConfig.fixed = true
      //       console.log(index, e.columnConfig.label, e.columnConfig.fixed)
      //       console.log(e.columnConfig)
      //     }
      //   }
      // })
    },
    tableRowColor({ row, rowIndex }) {
      if (Number(this.selectionColorSetting.sectionOne) < Number(row.hashours) && Number(row.hashours) < Number(this.selectionColorSetting.sectionTwo) + 1) {
        return { 'color': this.selectionColorSetting.sectionOneColour }
      } else if (Number(this.selectionColorSetting.sectionTwo) < Number(row.hashours) && Number(row.hashours) < Number(this.selectionColorSetting.sectionThree) + 1) {
        return { 'color': this.selectionColorSetting.sectionTwoColour }
      } else if (Number(this.selectionColorSetting.sectionThree) < Number(row.hashours)) {
        return { 'color': this.selectionColorSetting.sectionThreeColour }
      } else {
        return { 'color': '#222' }
      }
    },
    getSearchParam(obj) {
      this.searchQuery.currentPage = this.$options.data().searchQuery.currentPage
      this.searchQuery.pageSize = this.$options.data().searchQuery.pageSize
      this.searchQuery.vo = Object.assign(this.searchQuery.vo, obj)
      this.fetchAllOrderRepertory()
    },
    doAction(type) {
      // if (type === 'colorpicker') {
      //   this.closeColorpicker()
      //   this.$message({
      //     message: '请选择一条数据~',
      //     type: 'warning'
      //   })
      // }
      switch (type) {
        case 'colorpicker':
          this.reportorSelect = this.selected
          this.openColor()
          break
        case 'export': // 导出
          this.closeColorpicker()
          SaveAsFile({
            data: this.selected.length ? this.selected : this.repertoryArr,
            columns: this.tableColumn,
            name: '全部库存'
          })
          break
        case 'print': // 打印
          this.closeColorpicker()
          PrintInFullPage({
            data: this.selected.length ? this.selected : this.repertoryArr,
            columns: this.tableColumn,
            name: '全部库存'
          })
          break
      }
    },
    setTable() {
      this.setupTableVisible = true
    },
    closeSetupTable() {
      this.setupTableVisible = false
    },
    clickDetails(row) {
      this.$refs.multipleTable.toggleRowSelection(row)
    },
    getSelection(list) {
      this.selected = list
    },
    handlePageChange(obj) {
      this.searchQuery.currentPage = obj.pageNum
      this.searchQuery.pageSize = obj.pageSize
      this.fetchAllOrderRepertory()
    },
    fetchAllOrderRepertory() {
      this.getAllOrderRepertory()
    },
    openColor() {
      this.colorpickerVisible = true
    },
    closeColorpicker() {
      this.colorpickerVisible = false
    },
    getAllOrderRepertory() {
      this.loading = true
      postAllOrderRepertory(this.searchQuery).then(data => {
        this.repertoryArr = data.list
        this.total = data.total
        this.loading = false
      })
        .catch(err => {
          this._handlerCatchMsg(err)
          this.loading = false
        })
    },
    setColumColor(obj) {
      this.selectionColorSetting = obj
      this.closeColorpicker()
      this.fetchAllOrderRepertory()
      this.tablekey = Math.random()
    },
    setColumn(obj) {
      this.tableColumn = obj
      this.tablekey = Math.random()
    },
    setTableWidth(newWidth, oldWidth, column, event) {
      // column.property
      // column.label

      const find = this.tableColumn.filter(el => el.prop === column.property)
      if (find.length) {
        find[0].width = newWidth

        this.visible2 = true
        clearTimeout(this.tabletimer)
        this.tabletimer = setTimeout(() => {
          this.visible2 = false
        }, 10000)
      }
    },
    saveToTableSetup() {
      this.visible2 = false
      this.eventBus.$emit('tablesetup.change', this.thecode, this.tableColumn)
    },
    showSaveBox() {
      clearTimeout(this.tabletimer)
    },
    hideSaveBox() {
      clearTimeout(this.tabletimer)
      this.tabletimer = setTimeout(() => {
        this.visible2 = false
      }, 10000)
    }
  }
}

</script>
