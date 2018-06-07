<template>
  <div class="tab-content">
  <!-- 库存总表 -->
    <SearchForm :orgid="otherinfo.orgid" @change="getSearchParam" :btnsize="btnsize" />  
  <div class="tab_info">
    <div class="btns_box">
    <el-button type="primary" :size="btnsize" icon="el-icon-menu" plain @click="doAction('colorpicker')">提醒颜色设置</el-button>
    <el-button type="primary" :size="btnsize" icon="el-icon-edit-outline" @click="doAction('print')" plain>打印</el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-edit-outline" @click="doAction('export')" plain>导出</el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-setting" plain @click="setTable" class="table_setup">表格设置</el-button>
    </div>
    <div class="info_tab">
      <el-table 
      ref="multipleTable"
      :data="repertoryArr"
      border
      @row-click="clickDetails"
      @selection-change="getSelection"
      height="100%"
      tooltip-effect="dark"
      :row-style="tableRowColor"
      style="width:100%;"
      :default-sort = "{prop: 'id', order: 'ascending'}">
      <el-table-column
      fixed width="50" sortable type="selection">
      </el-table-column>
      <el-table-column
      fixed sortable width="110"
      prop="shipSn" label="运单号">
      </el-table-column>
      <el-table-column
      sortable width="120"
      prop="shipStatusName" label="运单状态">
      </el-table-column>
      <el-table-column 
      sortable width="120"
      prop="shipIdentifying" label="运单标识">
      </el-table-column>
      <el-table-column 
      sortable width="155"
      prop="repertoryCreateTime" label="入库时间">
       <template slot-scope="scope">
         {{ scope.row.repertoryCreateTime | parseTime('{y}-{m}-{d} {h}:{m}:{s}') }}
      </template>
      </el-table-column>
      <el-table-column
      sortable width="120"
      prop="hashours" label="库存时长">
      </el-table-column>
      <el-table-column
      sortable width="120"
      prop="fromOrgName" label="开单网点">
      </el-table-column>
      <el-table-column
      sortable width="155"
      prop="createTime" label="开单时间">
      <template slot-scope="scope">
         {{ scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{m}:{s}') }}
      </template>
      </el-table-column>
      <el-table-column
      sortable width="120"
      prop="cargoName" label="货品名">
      </el-table-column>
      <el-table-column
      sortable width="120"
      prop="repertoryAmount" label="库存件数">
      </el-table-column>
      <el-table-column
      sortable width="120"
      prop="repertoryWeight" label="库存重量">
      </el-table-column>
      <el-table-column
      sortable width="120"
      prop="repertoryVolume" label="库存体积">
      </el-table-column>
      <el-table-column
      sortable width="120"
      prop="cargoAmount" label="运单件数">
      </el-table-column>
      <el-table-column
      sortable width="120"
      prop="cargoWeight" label="运单重量">
      </el-table-column>
      <el-table-column
      sortable width="120"
      prop="cargoVolume" label="运单体积">
      </el-table-column>
      <el-table-column
      sortable width="120"
      prop="shipFromCityName" label="出发城市">
      </el-table-column>
      <el-table-column
      sortable width="120"
      prop="shipToCityName" label="到达城市">
      </el-table-column>
      <el-table-column
      sortable width="120"
      prop="shipSenderId" label="发货人">
      </el-table-column>
      <el-table-column
      width="120"
      prop="receiverCustomerMobile"
      label="发货人电话">
      </el-table-column>
      <el-table-column
      sortable width="120"
      prop="shipReceiverId" label="收货人">
      </el-table-column>
      <el-table-column
      width="120"
      prop="senderCustomerMobile" label="收货人电话">
      </el-table-column>
      <el-table-column
      sortable width="120"
      prop="shipDeliveryMethodName" label="交接方式">
      </el-table-column>
      <el-table-column
      sortable width="120"
      prop="shipTotalFee" label="运费">
      </el-table-column>
      <el-table-column
      sortable width="120"
      prop="pickupFee" label="提货费">
      </el-table-column>
      <!-- <el-table-column
      width="120"
      prop="realityhandlingFee" label="实际提货费">
      </el-table-column> -->
      <el-table-column
      sortable width="120"
      prop="brokerageFee" label="回扣">
      </el-table-column>
      <el-table-column
      sortable width="120"
      prop="insuranceFee" label="保险费">
      </el-table-column>
      <el-table-column
      sortable width="120"
      prop="productPrice" label="声明价值">
      </el-table-column>
      <el-table-column
      sortable width="120"
      prop="packageFee" label="包装费">
      </el-table-column>
      <el-table-column
      sortable width="120"
      prop="deliveryFee" label="送货费">
      </el-table-column>
      <el-table-column
      sortable width="120"
      prop="shipTotalFee" label="运费合计">
      </el-table-column>
      <el-table-column
      sortable width="120"
      prop="shipPayWayName" label="付款方式">
      </el-table-column>
      <el-table-column
      sortable width="120"
      prop="shipNowpayFee" label="现付">
      </el-table-column>
      <el-table-column
      sortable width="120"
      prop="shipArrivepayFee" label="到付">
      </el-table-column>
      <el-table-column
      sortable width="120"
      prop="shipReceiptpayFee" label="回单付">
      </el-table-column>
      <el-table-column
      sortable width="120"
      prop="shipMonthpayFee" label="月结">
      </el-table-column>
      <el-table-column
      sortable width="120"
      prop="shipRemarks" label="备注">
      </el-table-column>
      <!-- <el-table-column
      prop="orgId" label="到达省">
      </el-table-column>
      <el-table-column
      prop="orgId" label="到达市">
      </el-table-column>
      <el-table-column
      prop="orgId" label="到达县区">
      </el-table-column> -->
      <el-table-column
      sortable width="120"
      prop="shipSenderId" label="发货方">
      </el-table-column>
      <el-table-column
      width="120"
      prop="senderDetailedAddress" label="发货地址">
      </el-table-column>
      <el-table-column
      sortable width="120"
      prop="shipReceiverId" label="收货方">
      </el-table-column>
      <el-table-column
      prop="receiverDetailedAddress" label="收货地址">
      </el-table-column>
      <el-table-column
      sortable width="120"
      prop="shipGoodsSn" label="货号">
      </el-table-column>
      <el-table-column
      sortable width="120"
      prop="description" label="品种规格">
      </el-table-column>
      <el-table-column
      sortable width="120"
      prop="amountFee" label="件数单价">
      </el-table-column>
      <el-table-column
      sortable width="120"
      prop="weightFee" label="重量单价">
      </el-table-column>
      <el-table-column
      sortable width="120"
      prop="volumeFee" label="体积单价">
      </el-table-column>
      <el-table-column
      sortable width="120"
      prop="shipReceiptSn" label="回单号">
      </el-table-column>
      <el-table-column
      sortable width="120"
      prop="shipReceiptRequireName" label="回单要求">
      </el-table-column>
      <el-table-column
      sortable width="120"
      prop="shipReceiptNum" label="回单份数">
      </el-table-column>
      <el-table-column
      sortable width="120"
      prop="agencyFund" label="代收货款">
      </el-table-column>
      <el-table-column
      sortable width="130"
      prop="commissionFee" label="代收款手续费">
      </el-table-column>
      <!-- <el-table-column
      prop="userName" label="制单人">
      </el-table-column> -->
      <el-table-column
      sortable width="120"
      prop="shipCustomerNumber" label="客户单号">
      </el-table-column>
      <el-table-column
      sortable width="120"
      prop="shipShippingTypeName" label="运输方式">
      </el-table-column>
      <el-table-column
      sortable width="120"
      prop="shipBusinessType" label="业务类型">
      </el-table-column>
      <el-table-column
      sortable width="120"
      prop="shipEffectiveName" label="是时效">
      </el-table-column>
      <el-table-column
      sortable width="120"
      prop="goupstairsFee" label="上楼费">
      </el-table-column>
      <el-table-column
      sortable width="120"
      prop="forkliftFee" label="叉车费">
      </el-table-column>
      <el-table-column
      sortable width="120"
      prop="handlingFee" label="装卸费">
      </el-table-column>
      <!-- <el-table-column
      sortable width="120"
      prop="realityhandlingFee" label="实际装卸费">
      </el-table-column> -->
      <el-table-column
      sortable width="120"
      prop="housingFee" label="入仓费">
      </el-table-column>
      </el-table>
    </div>
     <div class="info_tab_footer">
        共计:{{ total }} 
        <div class="show_pager"> 
            <Pager :total="total" @change="handlePageChange" />
        </div> 
    </div> 
    <Colorpicker :popVisible="colorpickerVisible" :reportors="reportorSelect"
    @close="closeColorpicker" @success="setColumColor"></Colorpicker>
    </div>
  </div>
</template>

<script>
import { postAllOrderRepertory } from '@/api/operation/repertory'
import { mapGetters } from 'vuex'
import SearchForm from './components/search'
import Colorpicker from './components/colorpicker'
import Pager from '@/components/Pagination/index'
export default {
  components: {
    Pager,
    SearchForm,
    Colorpicker
  },
  data() {
    return {
      total: 0,
      btnsize: 'mini',
      setupTableVisible: false,
      repertoryArr: [],
      selected: [],
      loading: false,
      colorpickerVisible: false,
      isModify: false,
      selectInfo: [],
      selectionColorSetting: {},
      reportorSelect: {},
      searchQuery: {
        'currentPage': 1,
        'pageSize': 100,
        vo: {
          'orgid': 1
        }
      }
    }
  },
  computed: {
    ...mapGetters([
      'otherinfo'
    ]),
    orgid() {
      return this.isModify ? this.selectInfo.orgid : this.searchQuery.vo.orgid || this.otherinfo.orgid
    }
  },
  mounted() {
    this.searchQuery.vo.orgid = this.otherinfo.orgid
    this.fetchAllOrderRepertory()
  },
  methods: {
    tableRowColor({ row, rowIndex }) {
      let orgTime = new Date().getTime() - row.repertoryCreateTime
      let timeOne = this.selectionColorSetting.sectionOne * 3600
      let timeTwo = this.selectionColorSetting.sectionTwo * 3600
      let timeThree = this.selectionColorSetting.sectionThree *3600
      if (orgTime < timeOne || orgTime === timeOne) {
        return { "background-color": this.selectionColorSetting.sectionOneColour }
      } else if (orgTime > timeThree) {
        return { "background-color": this.selectionColorSetting.sectionThreeColour }
      } else {
        return { "background-color": this.selectionColorSetting.sectionTwoColour }
      }
    },
    getSearchParam(obj) {
      this.searchQuery.vo = Object.assign(this.searchQuery.vo, obj)
      this.fetchAllOrderRepertory()
    },
    doAction(type) {
      if (type !== 'colorpicker' && this.selected.length !== 1) {
        this.closeColorpicker()
        this.$message({
          message: '请选择一条数据~',
          type: 'warning'
        })
      }
      switch (type) {
        case 'colorpicker':
          this.reportorSelect = this.selected
          this.openColor()
          break
        case 'print':
          this.closeColorpicker()
          this.$message({ type: 'warning', message: '暂无此功能，敬请期待~' })
          break
        case 'export':
          this.closeColorpicker()
          this.$message({ type: 'warning', message: '暂无此功能，敬请期待~' })
          break
      }
    },
    setTable() {},
    clickDetails(row) {
      this.$refs.multipleTable.toggleRowSelection(row)
    },
    getSelection(list) {
      this.selected = list
    },
    handlePageChange(obj) {
      this.searchQuery.currentPage = obj.pageNum
      this.searchQuery.pageSize = obj.pageSize
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
      .catch(error => {
        this.$message({type: 'danger', message: '错误'})
        this.loading = false
      })
    },
    setColumColor(obj) {
      this.selectionColorSetting = obj
      this.closeColorpicker()
      this.fetchAllOrderRepertory()
    }
  }
}
</script>

<style lang="scss">
.tab-content {
  height: calc(100% - 33px);
  display: flex;
  flex-direction: column;
  position: relative;

  .tab_info {
    padding: 10px 30px 40px;
    height: 100%;
    flex-grow: 1;
    display: flex;
    flex-direction: column;

    .btns_box {
      margin-bottom: 10px;
      .el-button {
        margin-right: 0;
      }
      .table_setup {
        float: right;
        margin-right: 0;
      }
    }
    .info_tab {
      width: 100%;
      height: calc(100% - 68px);
      flex-grow: 1;

      .el-table {
        table {
          th,
          td {
            text-align: center;
          }
        }
        .unauth {
          color: #f00;
        }
      }
      .el-table td,
      .el-table th {
        padding: 5px 0;
      }
    }
  }
  .info_tab_footer {
    padding-left: 20px;
    background: #eee;
    height: 40px;
    line-height: 40px;
    box-shadow: 0 -2px 2px rgba(0, 0, 0, .1);
    position: relative;
    z-index: 10;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
  }

  .show_pager {
    float: right;
    line-height: 40px;
    height: 40px;
    overflow: hidden;
  }
}

</style>
