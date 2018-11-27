<template>
  <div class="tab-content" v-loading="loading">
    <!-- 到货库存 -->
    <SearchForm :orgid="otherinfo.orgid" @change="getSearchParam" :btnsize="btnsize" />
    <div class="tab_info">
      <div class="btns_box">
        <el-button type="primary" :size="btnsize" icon="el-icon-menu" plain @click="doAction('colorpicker')" v-has:ORDER_COLOUR3>提醒颜色设置</el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-printer" @click="doAction('print')" plain v-has:ORDER_COLOURP3>打印</el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-download" @click="doAction('export')" plain v-has:ORDER_COLOUREXP3>导出</el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-setting" plain @click="setTable" class="table_setup">表格设置</el-button>
      </div>
      <div class="info_tab">
        <el-table ref="multipleTable" :data="repertoryArr" border @row-dblclick="showDetail" @row-click="clickDetails" :key="tablekey" @selection-change="getSelection" height="100%" tooltip-effect="dark" :row-style="tableRowColor" style="width:100%;" :default-sort="{prop: 'id', order: 'ascending'}">
          <el-table-column fixed sortable type="selection" width="35">
          </el-table-column>
          <template v-for="column in tableColumn">
            <el-table-column :key="column.id" :fixed="column.fixed" sortable :label="column.label" :prop="column.prop" v-if="!column.slot" :width="column.width">
            </el-table-column>
            <el-table-column :key="column.id" :fixed="column.fixed" sortable :label="column.label" v-else :width="column.width">
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
      <TableSetup :popVisible="setupTableVisible" :columns='tableColumn' @close="closeSetupTable" @success="setColumn"></TableSetup>
    </div>
  </div>
</template>
<script>
import { postAllOrderRepertory } from '@/api/operation/repertory'
import { mapGetters } from 'vuex'
import SearchForm from './components/search'
import Colorpicker from './components/colorpicker'
import Pager from '@/components/Pagination/index'
import { objectMerge2, parseTime } from '@/utils/index'
import TableSetup from '@/components/tableSetup'
import { parseShipStatus } from '@/utils/dict'
import { PrintInFullPage, SaveAsFile } from '@/utils/lodopFuncs'
export default {
  components: {
    Pager,
    SearchForm,
    Colorpicker,
    TableSetup
  },
  data() {
    return {
      setupTableVisible: false, // 默认弹出框关闭
      tablekey: 0, // 初始化表格视图key
      tableColumn: [], // 后台接口获取到的列表数据
      total: 0,
      btnsize: 'mini',
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
          label: '运单号',
          prop: 'shipSn',
          width: '110',
          fixed: true
        },
        {
          label: '运单状态',
          prop: 'shipStatusName',
          width: '120'
        },
        {
          label: '运单标识',
          prop: 'shipIdentifying',
          width: '120',
          slot: function(scope) {
            return parseShipStatus(scope.row.shipIdentifying)
          }
        },
        {
          label: '入库时间',
          prop: 'repertoryCreateTime',
          width: '160',
          slot: (scope) => {
            return `${parseTime(scope.row.repertoryCreateTime, '{y}-{m}-{d} {h}:{i}:{s}')}`
          }
        },
        {
          label: '库存时长',
          prop: 'hashour',
          width: '110'
        },
        {
          label: '开单网点',
          prop: 'fromOrgName',
          width: '110'
        },
        {
          label: '开单时间',
          prop: 'createTime',
          width: '160',
          slot: (scope) => {
            return `${parseTime(scope.row.repertoryCreateTime, '{y}-{m}-{d} {h}:{i}:{s}')}`
          }
        },
        {
          label: '货品名',
          prop: 'cargoName',
          width: '150'
        },
        {
          label: '库存件数',
          prop: 'repertoryAmount',
          width: '90'
        },
        {
          label: '库存重量',
          prop: 'repertoryWeight',
          width: '90'
        },
        {
          label: '库存体积',
          prop: 'repertoryVolume',
          width: '90'
        },
        {
          label: '运单件数',
          prop: 'cargoAmount',
          width: '90'
        },
        {
          label: '运单重量',
          prop: 'cargoWeight',
          width: '90'
        },
        {
          label: '运单体积',
          prop: 'cargoVolume',
          width: '90'
        },
        {
          label: '出发城市',
          prop: 'shipFromCityName',
          width: '150'
        },
        {
          label: '到达城市',
          prop: 'shipToCityName',
          width: '150'
        },
        {
          label: '发货人',
          prop: 'senderCustomerName',
          width: '100'
        },
        {
          label: '发货人电话',
          prop: 'receiverCustomerMobile',
          width: '110'
        },
        {
          label: '收货人',
          prop: 'receiverCustomerName',
          width: '100'
        },
        {
          label: '收货人电话',
          prop: 'receiverCustomerMobile',
          width: '110'
        },
        {
          label: '交接方式',
          prop: 'shipDeliveryMethodName',
          width: '90'
        },
        {
          label: '运费',
          prop: 'shipFee',
          width: '90'
        },
        {
          label: '提货费',
          prop: 'pickupFee',
          width: '90'
        },
        // {
        //   label: "实际提货费",
        //   prop: "realityhandlingFee",
        //   width: "90"
        // },
        {
          label: '回扣',
          prop: 'brokerageFee',
          width: '90'
        },
        {
          label: '保险费',
          prop: 'insuranceFee',
          width: '90'
        },
        {
          label: '声明价值',
          prop: 'productPrice',
          width: '90'
        },
        {
          label: '包装费',
          prop: 'packageFee',
          width: '90'
        },
        {
          label: '送货费',
          prop: 'deliveryFee',
          width: '90'
        },
        {
          label: '运费合计',
          prop: 'shipTotalFee',
          width: '90'
        },
        {
          label: '付款方式',
          prop: 'shipPayWayName',
          width: '90'
        },
        {
          label: '现付',
          prop: 'shipNowpayFee',
          width: '90'
        },
        {
          label: '到付',
          prop: 'shipArrivepayFee',
          width: '90'
        },
        {
          label: '回单付',
          prop: 'shipReceiptpayFee',
          width: '90'
        },
        {
          label: '月结',
          prop: 'shipMonthpayFee',
          width: '90'
        },
        {
          label: '备注',
          prop: 'shipRemarks',
          width: '150'
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
          width: '120'
        },
        {
          label: '发货地址',
          prop: 'senderDetailedAddress',
          width: '150'
        },
        {
          label: '收货方',
          prop: 'receiverCustomerUnit',
          width: '120'
        },
        {
          label: '收货地址',
          prop: 'receiverDetailedAddress',
          width: '150'
        },
        {
          label: '货号',
          prop: 'shipGoodsSn',
          width: '150'
        },
        {
          label: '品种规格',
          prop: 'description',
          width: '100'
        },
        {
          label: '件数单价',
          prop: 'amountFee',
          width: '90'
        },
        {
          label: '重量单价',
          prop: 'weightFee',
          width: '90'
        },
        {
          label: '体积单价',
          prop: 'volumeFee',
          width: '90'
        },
        {
          label: '回单号',
          prop: 'shipReceiptSn',
          width: '150'
        },
        {
          label: '回单要求',
          prop: 'shipReceiptRequireName',
          width: '150'
        },
        {
          label: '回单份数',
          prop: 'shipReceiptNum',
          width: '90'
        },
        {
          label: '代收款手续费',
          prop: 'commissionFee',
          width: '120'
        },
        // {
        //   label: "制单人",
        //   prop: "userName",
        //   width: "90"
        // },
        {
          label: '客户单号',
          prop: 'shipCustomerNumber',
          width: '90'
        },
        {
          label: '运输方式',
          prop: 'shipShippingTypeName',
          width: '100'
        },
        {
          label: '业务类型',
          prop: 'shipBusinessType',
          width: '100'
        },
        {
          label: '时效',
          prop: 'shipEffectiveName',
          width: '100'
        },
        {
          label: '上楼费',
          prop: 'goupstairsFee',
          width: '90'
        },
        {
          label: '叉车费',
          prop: 'forkliftFee',
          width: '90'
        },
        {
          label: '装卸费',
          prop: 'handlingFee',
          width: '90'
        },
        // {
        //   label: "实际装卸费",
        //   prop: "realityhandlingFee",
        //   width: "90"
        // },
        {
          label: '入仓费',
          prop: 'housingFee',
          width: '90'
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
    this.searchQuery.vo.orgId = this.otherinfo.orgid
    this.fetchAllOrderRepertory()
  },
  methods: {
    tableRowColor({ row, rowIndex }) {
      if (Number(this.selectionColorSetting.sectionOne) < Number(row.hashours) && Number(row.hashours) < Number(this.selectionColorSetting.sectionTwo) + 1) {
        return { 'color': this.selectionColorSetting.sectionOneColour }
      } else if (Number(this.selectionColorSetting.sectionTwo) < Number(row.hashours) && Number(row.hashours) < Number(this.selectionColorSetting.sectionThree) + 1) {
        return { 'color': this.selectionColorSetting.sectionTwoColour }
      } else if (Number(this.selectionColorSetting.sectionThree) < Number(row.hashours)) {
        return { 'color': this.selectionColorSetting.sectionThreeColour }
      } else {
        return { 'color': '#333' }
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
            name: '到货库存'
          })
          break
        case 'print': // 打印
          this.closeColorpicker()
          PrintInFullPage({
            data: this.selected.length ? this.selected : this.repertoryArr,
            columns: this.tableColumn,
            name: '到货库存'
          })
          break
      }
    },
    showDetail(order) {
      this.eventBus.$emit('showOrderDetail', order.shipId, order.shipSn, true)
      console.log(order.shipId)
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
      this.$set(this.searchQuery.vo, 'repertoryType', 2)
      return postAllOrderRepertory(this.searchQuery).then(data => {
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
    },
    setColumn(obj) { // 重绘表格列表
      this.tableColumn = obj
      this.tablekey = Math.random() // 刷新表格视图
    }
  }
}

</script>
