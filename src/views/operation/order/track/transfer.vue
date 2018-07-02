<template>
  <div class="tab-content" v-loading="loading">
    <!-- 短驳跟踪 -->
    <SearchForm :orgid="otherinfo.orgid" @change="getSearchParam" :btnsize="btnsize"></SearchForm>
    <div class="tab_info">
      <div class="btns_box">
        <el-button type="primary" :size="btnsize" icon="el-icon-setting" plain @click="setTable" class="table_setup">表格设置</el-button>
        <el-button type="success" :size="btnsize" icon="el-icon-setting" @click="setInfo" plain class="table_setup" :disabled="isDisBtn">在途跟踪</el-button>
      </div>
      <div class="info_tab">
        <el-table ref="multipleTable" :data="dataList" stripe border @row-click="clickDetails" @selection-change="getSelection" height="100%" tooltip-effect="dark" style="width:100%;" :default-sort="{prop: 'id', order: 'ascending'}" @row-dblclick="setInfo">
          <el-table-column fixed width="50" sortable type="selection">
          </el-table-column>
          <el-table-column fixed sortable width="110" prop="shipFromOrgid" label="开单网点">
          </el-table-column>
          <el-table-column sortable width="120" prop="carrierName" label="承运商">
          </el-table-column>
          <el-table-column sortable width="120" prop="carrierMobile" label="承运商电话">
          </el-table-column>
          <el-table-column sortable width="120" prop="arrivalMobile" label="到站电话">
          </el-table-column>
          <el-table-column sortable width="120" prop="shipStatusName" label="运单状态">
          </el-table-column>
          <el-table-column sortable width="120" prop="shipSn" label="运单号">
          </el-table-column>
          <el-table-column sortable width="120" prop="oddNumbers" label="中转单号">
          </el-table-column>
          <!--  <el-table-column sortable width="120" prop="batchTypeId" label="中转批次">
          </el-table-column> -->
          <el-table-column sortable width="160" prop="createTime" label="开单时间">
            <template slot-scope="scope">
              {{ scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{m}:{s}') }}
            </template>
          </el-table-column>
          <el-table-column sortable width="160" prop="transferTime" label="中转时间">
            <template slot-scope="scope">
              {{ scope.row.transferTime | parseTime('{y}-{m}-{d} {h}:{m}:{s}') }}
            </template>
          </el-table-column>
          <el-table-column sortable width="120" prop="transferCharge" label="中转运费">
          </el-table-column>
          <el-table-column sortable width="120" prop="deliveryExpense" label="中转送货费">
          </el-table-column>
          <!-- <el-table-column sortable width="120" prop="batchTypeId" label="中转费其他费">
          </el-table-column> -->
          <el-table-column sortable width="120" prop="totalCost" label="中转费合计">
          </el-table-column>
          <el-table-column sortable width="120" prop="paymentId" label="中转付款方式">
          </el-table-column>
          <el-table-column sortable width="120" prop="codService" label="代收货款">
          </el-table-column>
          <el-table-column sortable width="120" prop="senderName" label="发货人">
          </el-table-column>
          <el-table-column sortable width="120" prop="senderMobile" label="发货人电话">
          </el-table-column>
          <el-table-column sortable width="120" prop="receiverName" label="收货人">
          </el-table-column>
          <el-table-column sortable width="120" prop="receiverMobile" label="收货人电话">
          </el-table-column>
          <el-table-column sortable width="120" prop="shipFromCityCode" label="出发城市">
          </el-table-column>
          <el-table-column sortable width="120" prop="shipToCityCode" label="到达城市">
          </el-table-column>
          <el-table-column sortable width="120" prop="cargoName" label="货物名称">
          </el-table-column>
          <el-table-column sortable width="120" prop="cargoAmount" label="件数">
          </el-table-column>
          <el-table-column sortable width="120" prop="cargoWeight" label="重量">
          </el-table-column>
          <el-table-column sortable width="120" prop="cargoVolume" label="体积">
          </el-table-column>
          <el-table-column sortable width="120" prop="cargoPack" label="包装">
          </el-table-column>
          <el-table-column sortable width="120" prop="shipRemarks" label="运单备注">
          </el-table-column>
          <el-table-column sortable width="120" prop="remark" label="中转备注">
          </el-table-column>
          <el-table-column sortable width="120" prop="senderUnit" label="发货单位">
          </el-table-column>
          <el-table-column sortable width="120" prop="senderAddr" label="发货地址">
          </el-table-column>
          <el-table-column sortable width="120" prop="receiverUnit" label="收货单位">
          </el-table-column>
          <el-table-column sortable width="120" prop="receiverAddr" label="收货地址">
          </el-table-column>
          <el-table-column sortable width="120" prop="shipFee" label="运费">
          </el-table-column>
          <el-table-column sortable width="120" prop="shipToOrgid" label="目的网点">
          </el-table-column>
          <el-table-column sortable width="120" prop="shipDeliveryMethod" label="交接方式">
          </el-table-column>
          <el-table-column sortable width="120" prop="shipGoodsSn" label="货号">
          </el-table-column>
          <el-table-column sortable width="120" prop="description" label="品种规格">
          </el-table-column>
          <!-- <el-table-column sortable width="120" prop="batchTypeId" label="件数单价">
          </el-table-column> -->
          <el-table-column sortable width="120" prop="weightFee" label="重量单价">
          </el-table-column>
          <el-table-column sortable width="120" prop="volumeFee" label="体积单价">
          </el-table-column>
          <!--  <el-table-column sortable width="120" prop="batchTypeId" label="等通知放货">
          </el-table-column> -->
          <el-table-column sortable width="120" prop="shipReceiptRequire" label="回单要求">
          </el-table-column>
          <el-table-column sortable width="120" prop="shipReceiptNum" label="回单份数">
          </el-table-column>
          <el-table-column sortable width="120" prop="commissionFee" label="代收款手续费">
          </el-table-column>
          <el-table-column sortable width="120" prop="shipPayWay" label="付款方式">
          </el-table-column>
          <el-table-column sortable width="120" prop="shipNowpayFee" label="现付">
          </el-table-column>
          <el-table-column sortable width="120" prop="shipArrivepayFee" label="到付">
          </el-table-column>
          <el-table-column sortable width="120" prop="shipReceiptpayFee" label="回单付">
          </el-table-column>
          <el-table-column sortable width="120" prop="shipMonthpayFee" label="月结">
          </el-table-column>
          <el-table-column sortable width="120" prop="shipTotalFee" label="运费合计">
          </el-table-column>
          <el-table-column sortable width="120" prop="name" label="制单人">
          </el-table-column>
          <el-table-column sortable width="120" prop="brokerageFee" label="回扣">
          </el-table-column>
          <!-- <el-table-column sortable width="120" prop="batchTypeId" label="客户单号">
          </el-table-column> -->
          <el-table-column sortable width="120" prop="deliveryFee" label="送货费">
          </el-table-column>
          <el-table-column sortable width="120" prop="productPrice" label="声明价值">
          </el-table-column>
          <el-table-column sortable width="120" prop="insuranceFee" label="保险费">
          </el-table-column>
          <el-table-column sortable width="120" prop="handlingFee" label="装卸费">
          </el-table-column>
          <el-table-column sortable width="120" prop="packageFee" label="包装费">
          </el-table-column>
          <el-table-column sortable width="120" prop="pickupFee" label="提货费">
          </el-table-column>
          <el-table-column sortable width="120" prop="realityhandlingFee" label="实际提货费">
          </el-table-column>
          <el-table-column sortable width="120" prop="goupstairsFee" label="上楼费">
          </el-table-column>
          <el-table-column sortable width="120" prop="customsFee" label="报关费">
          </el-table-column>
          <el-table-column sortable width="120" prop="otherfeeIn" label="其他费收入">
          </el-table-column>
          <el-table-column sortable width="120" prop="otherfeeOut" label="其他费支出">
          </el-table-column>
        </el-table>
      </div>
      <div class="info_tab_footer">
        共计:{{ total }}
        <div class="show_pager">
          <Pager :total="total" @change="handlePageChange" />
        </div>
      </div>
      <!-- 在途跟踪 -->
      <editInfoTransfer :orgid="orgid" :id='transferId' :info="trackInfo" :popVisible.sync="editInfoVisible" @close="closeMe"></editInfoTransfer>
      <!-- 表格设置弹出框 -->
      <TableSetup :popVisible="setupTableVisible" @close="closeSetupTable" @success="fetchList"></TableSetup>
    </div>
  </div>
</template>
<script>
import SearchForm from './components/searchTransfer'
import { mapGetters } from 'vuex'
import { postTransferList } from '@/api/operation/track'
import Pager from '@/components/Pagination/index'
import editInfoTransfer from './components/editInfoTransfer'
import TableSetup from './components/tableSetup'
export default {
  components: {
    SearchForm,
    Pager,
    editInfoTransfer,
    TableSetup
  },
  computed: {
    ...mapGetters([
      'otherinfo'
    ]),
    orgid() {
      return this.isModify ? this.selectInfo.orgid : this.searchQuery.vo.orgid || this.otherinfo.orgid
    }
  },
  data() {
    return {
      btnsize: 'mini',
      dataList: [],
      total: 0,
      isDisBtn: true,
      transferId: 0,
      selectInfo: [],
      trackInfo: {},
      loading: true,
      editInfoVisible: false,
      setupTableVisible: false,
      searchQuery: {
        currentPage: 1,
        pageSize: 100,
        vo: {
          orgId: 0
          // batchNo: '',
          // batchTypeId: '',
          // deliveryBatchType: '',
          // dirverName: '',
          // endTime: '',
          // mainBatchType: '',
          // shortBatchType: '',
          // startTime: '',
          // truckIdNumber: ''
        }
      }
    }
  },
  activated() {
    this.searchQuery.vo.orgId = this.otherinfo.orgid
    this.fetchList()
  },
  methods: {
    getSearchParam(obj) {
      this.searchQuery.vo = Object.assign({}, obj) // 38-短驳 39-干线 40-送货
      if (!this.searchQuery.vo.orgId) {
        this.searchQuery.vo.orgId = this.otherinfo.orgid
        // this.searchQuery.vo.loadTypeId = 39
      }
      this.fetchList()
    },
    getSelection(list) {
      if (this.$route.query.transfer) {
        this.transferId = this.this.$route.query.transfer
      } else {
        if (list.length === 1) {
          this.selectInfo = Object.assign([], list)
          this.isDisBtn = false
          let tid = this.selectInfo[0].transferId
          this.trackId = tid
          this.trackInfo = Object.assign({}, this.selectInfo[0])
        } else if (list.length > 1) {
          this.$message({ type: 'warning', message: '只能选择一条数据进行跟踪设置' })
          this.isDisBtn = true
        } else {
          this.isDisBtn = true
        }
      }
    },
    clickDetails(row) {
      this.$refs.multipleTable.toggleRowSelection(row)
    },
    setTable() {
      this.setupTableVisible = true
    },
    closeSetupTable() {
      this.setupTableVisible = false
    },
    setInfo() {
      this.editInfoVisible = true
      this.$refs.multipleTable.clearSelection()
    },
    closeMe() {
      this.editInfoVisible = false
    },
    handlePageChange(obj) {
      this.searchQuery.currentPage = obj.pageNum
      this.searchQuery.pageSize = obj.pageSize
    },
    fetchList() {
      this.getAllList()
    },
    getAllList() {
      this.loading = true
      postTransferList(this.searchQuery).then(data => {
        if (data) {
          this.dataList = data.list
          this.total = data.total
          this.loading = false
          this.searchQuery.vo = {}
        } else {
          this.loading = false
        }
      })
      this.isTransferTrack()
    },
    isTransferTrack() {
      if (this.$route.query.transfer) {
        console.log('transfer',this.$route.query.transfer)
        this.setInfo()
      } else {
        this.closeMe()
      }
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
    padding: 10px 0px 40px 0px;
    height: 100%;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    position: relative;
    .btns_box {
      margin-bottom: 10px;
      .el-button {
        margin-right: 0;
      }
      .table_setup {
        float: right;
        margin-left: 10px;
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
