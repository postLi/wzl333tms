<template>
  <div class="tab-content" v-loading="loading">
    <!-- 送货跟踪 -->
    <SearchForm :orgid="otherinfo.orgid" @change="getSearchParam" :btnsize="btnsize"></SearchForm>
    <div class="tab_info">
      <div class="btns_box">
        <el-button type="primary" :size="btnsize" icon="el-icon-setting" plain @click="setTable" class="table_setup">表格设置</el-button>
        <el-button type="success" :size="btnsize" icon="el-icon-setting" @click="setInfo" plain class="table_setup" :disabled="isDisBtn">在途跟踪</el-button>
      </div>
      <div class="info_tab">
        <el-table ref="multipleTable" :data="dataList" stripe border @row-click="clickDetails" @selection-change="getSelection" height="100%" tooltip-effect="dark" 
        style="width:100%;" 
        :default-sort="{prop: 'id', order: 'ascending'}"  @row-dblclick="setInfo">
          <el-table-column fixed width="50" sortable type="selection">
          </el-table-column>
          <el-table-column fixed sortable width="110" prop="batchNo" label="发车批次">
          </el-table-column>
          <el-table-column sortable width="120" prop="truckIdNumber" label="车牌号">
          </el-table-column>
          <el-table-column sortable width="120" prop="truckIdNumber" label="发车网点">
          </el-table-column>
          <el-table-column sortable width="120" prop="arriveOrgName" label="目的网点">
          </el-table-column>
          <el-table-column sortable width="120" prop="batchTypeName" label="车辆状态">
          </el-table-column>
          <el-table-column sortable width="160" prop="departureTime" label="发车时间">
            <template slot-scope="scope">
              {{ scope.row.departureTime | parseTime('{y}-{m}-{d} {h}:{m}:{s}') }}
            </template>
          </el-table-column>
          <el-table-column sortable width="120" prop="dirverName" label="司机">
          </el-table-column>
          <el-table-column sortable width="120" prop="dirverMobile" label="司机电话">
          </el-table-column>
          <el-table-column sortable width="120" prop="actualAmountall" label="实载总件数">
          </el-table-column>
          <el-table-column sortable width="120" prop="actualWeigntall" label="实载总重量">
          </el-table-column>
          <el-table-column sortable width="120" prop="actualVolumeall" label="实载总体积">
          </el-table-column>
          <el-table-column sortable width="120" prop="shipAmount" label="运单总件数">
          </el-table-column>
          <el-table-column sortable width="120" prop="shipWeigntall" label="运单总重量">
          </el-table-column>
          <el-table-column sortable width="120" prop="shipVolumeall" label="运单总体积">
          </el-table-column>
          <el-table-column sortable width="120" prop="weightLoadRate" label="重量装载率">
          </el-table-column>
          <el-table-column sortable width="120" prop="volumeLoadRate" label="体积装载率">
          </el-table-column>
          <el-table-column sortable width="120" prop="nowpayCarriage" label="现付运费">
          </el-table-column>
          <el-table-column sortable width="120" prop="nowpayOilCard" label="现付油卡">
          </el-table-column>
          <el-table-column sortable width="120" prop="arrivepayCarriage" label="到付运费">
          </el-table-column>
          <el-table-column sortable width="120" prop="arrivepayOilCard" label="到付油卡">
          </el-table-column>
          <el-table-column sortable width="120" prop="backpayOilCard" label="回付油卡">
          </el-table-column>
          <el-table-column sortable width="120" prop="backpayOilCard" label="回付运费">
          </el-table-column>
          <el-table-column sortable width="120" prop="remark" label="运费合计">
          </el-table-column>
          <el-table-column sortable width="120" prop="carloadInsuranceFee" label="整车保险费">
          </el-table-column>
          <el-table-column sortable width="120" prop="leaveHandlingFee" label="发站装卸费">
          </el-table-column>
          <el-table-column sortable width="120" prop="leaveOtherFee" label="发站其他费">
          </el-table-column>
          <el-table-column sortable width="120" prop="arriveHandlingFee" label="到站装卸费">
          </el-table-column>
          <el-table-column sortable width="120" prop="arriveOtherFee" label="到站其他费">
          </el-table-column>
          <el-table-column sortable width="160" prop="loadTime" label="配载时间">
            <template slot-scope="scope">
              {{ scope.row.loadTime | parseTime('{y}-{m}-{d} {h}:{m}:{s}') }}
            </template>
          </el-table-column>
          <el-table-column sortable width="120" prop="username" label="配载人">
          </el-table-column>
          <el-table-column sortable width="120" prop="truckUsername" label="发车人">
          </el-table-column>
          <el-table-column sortable width="120" prop="remark" label="备注">
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
      <editInfo :orgid="orgid" :id='trackId' :info="trackInfo" :popVisible.sync="editInfoVisible" @close="closeMe"></editInfo>
      <!-- 表格设置弹出框 -->
      <TableSetup :popVisible="setupTableVisible" @close="closeSetupTable" @success="fetchList"></TableSetup>
    </div>
  </div>
</template>
<script>
import SearchForm from './components/searchDeliver'
import { mapGetters } from 'vuex'
import { postTrackList } from '@/api/operation/track'
import Pager from '@/components/Pagination/index'
import editInfo from './components/editInfo'
import TableSetup from './components/tableSetup'
export default {
  components: {
    SearchForm,
    Pager,
    editInfo,
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
      trackId: 0,
      selectInfo: [],
      trackInfo: {},
      loading: true,
      editInfoVisible: false,
      setupTableVisible: false,
      searchQuery: {
        currentPage: 1,
        pageSize: 100,
        vo: {
          loadTypeId: 40,
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
  mounted() {
    this.searchQuery.vo.orgId = this.otherinfo.orgid
    this.fetchList()
  },
  methods: {
    getSearchParam(obj) {
      this.searchQuery.vo = Object.assign({}, obj) // 38-短驳 39-干线 40-送货
      if (!this.searchQuery.vo.orgId) {
        this.searchQuery.vo.orgId = this.otherinfo.orgid
        this.searchQuery.vo.loadTypeId = 40
      }
      this.fetchList()
    },
    getSelection(list) {
      if (list.length === 1) {
        this.selectInfo = Object.assign([], list)
        this.isDisBtn = false
        let tid = 0
        this.selectInfo.forEach(e => {
          tid = e.id
          this.trackInfo = Object.assign({}, e)
        })
        this.trackId = tid
      } else if (list.length > 1){
        this.$message({ type: 'warning', message: '只能选择一条数据进行跟踪设置' })
        this.isDisBtn = true
      } else {
        this.isDisBtn = true
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
      return postTrackList(this.searchQuery).then(data => {
        if (data) {
          this.dataList = data.list
          this.total = data.total
          this.loading = false
          this.searchQuery.vo = {}
        } else {
          this.loading = false
        }
      })
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
