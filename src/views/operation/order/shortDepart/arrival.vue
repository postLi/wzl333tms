<template>
  <div class="tab-content">
    <!-- 短驳到货 -->
    <SearchForm :orgid="otherinfo.orgid" @change="getSearchParam" :btnsize="btnsize" />
    <div class="tab_info">
      <div class="btns_box">
        <el-button type="primary" :size="btnsize" icon="el-icon-document" plain @click="doAction('truck')">短驳到车</el-button>
        <el-button type="success" :size="btnsize" icon="el-icon-document" plain @click="doAction('repertory')">短驳入库</el-button>
        <el-button type="danger" :size="btnsize" icon="el-icon-circle-close-outline" plain @click="doAction('chanelTruck')">取消到车</el-button>
        <el-button type="danger" :size="btnsize" icon="el-icon-circle-close-outline" plain @click="doAction('chanelRepertory')">取消入库</el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-printer" @click="doAction('printPaper')" plain>打印清单</el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-printer" @click="doAction('printList')" plain>打印批次</el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-download" @click="doAction('export')" plain>导出</el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-setting" plain @click="setTable" class="table_setup">表格设置</el-button>
      </div>
      <div class="info_tab">
        <el-table ref="multipleTable" :data="infoList" stripe border @row-click="clickDetails" @selection-change="getSelection" height="100%" tooltip-effect="dark" style="width:100%;" :default-sort="{prop: 'id', order: 'ascending'}" :key="tableKey">
          <el-table-column fixed width="50" sortable type="selection">
          </el-table-column>
          <el-table-column fixed sortable width="110" prop="batchNo" label="发货批次">
          </el-table-column>
          <el-table-column sortable width="120" prop="batchTypeName" label="批次状态">
          </el-table-column>
          <el-table-column sortable width="120" prop="truckIdNumber" label="车牌号">
          </el-table-column>
          <el-table-column sortable width="120" prop="dirverName" label="司机">
          </el-table-column>
          <el-table-column sortable width="120" prop="dirverMobile" label="司机电话">
          </el-table-column>
          <el-table-column sortable width="155" prop="departureTime" label="短驳时间">
            <template slot-scope="scope">
              {{ scope.row.departureTime | parseTime('{y}-{m}-{d} {h}:{m}:{s}') }}
            </template>
          </el-table-column>
          <el-table-column sortable width="120" prop="arriveOrgName" label="目的网点">
          </el-table-column>
          <el-table-column sortable width="155" prop="createTime" label="接收时间">
            <template slot-scope="scope">
              {{ scope.row.arriveOrgName | parseTime('{y}-{m}-{d} {h}:{m}:{s}') }}
            </template>
          </el-table-column>
          <el-table-column sortable width="120" prop="shortFee" label="短驳费">
          </el-table-column>
          <el-table-column sortable width="120" prop="actualAmountall" label="实到件数">
          </el-table-column>
          <el-table-column sortable width="120" prop="actualWeigntall" label="实到重量">
          </el-table-column>
          <el-table-column sortable width="120" prop="actualVolumeall" label="实到体积">
          </el-table-column>
          <el-table-column sortable width="120" prop="loadAmountall" label="配载总件数">
          </el-table-column>
          <el-table-column sortable width="120" prop="loadWeightall" label="配载总重量">
          </el-table-column>
          <el-table-column sortable width="120" prop="loadVolumeall" label="配载总体积">
          </el-table-column>
          <el-table-column sortable width="120" prop="weightLoadRate" label="重量装载率">
          </el-table-column>
          <el-table-column sortable width="120" prop="volumeLoadRate" label="体积装载率">
          </el-table-column>
          <el-table-column sortable width="120" prop="userName" label="短驳经办人">
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
    </div>
  </div>
</template>
<script>
import { postAllshortDepartList, putTruckDepart, putTruckChanel, putTruckLoad } from '@/api/operation/shortDepart'
import { mapGetters } from 'vuex'
import SearchForm from './components/search'
import Pager from '@/components/Pagination/index'
export default {
  components: {
    Pager,
    SearchForm
  },
  data() {
    return {
      total: 0,
      btnsize: 'mini',
      setupTableVisible: false,
      selected: [],
      tableKey: 0, 
      loading: false,
      isModify: false,
      selectInfo: {},
      isBatch: true,
      commonTruck: {},
      infoList: [],
      searchQuery: {
        "orgId": 1,
        "loadTypeId": 38,
        "loadStartTime": '',
        "loadEndTime": '',
        "departureStartTime": '',
        "departureEndTime": '',
        "batchTypeId": 48,
        "arriveOrgid": '',
        "batchNo": '',
        "truckIdNumber": '',
        "dirverName": ''
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
    this.searchQuery.orgId = this.otherinfo.orgid
    // this.fetchShortDepartList()
    this.fetchShortDepartList()
  },
  methods: {
    getSearchParam(obj) {},
    doAction(type) {
      if (this.selected.length < 1) {
        this.$message({
          message: '请选择一条数据~',
          type: 'warning'
        })
      }
      switch (type) {
        case 'truck':
          break
        case 'repertory':
          break
        case 'chanelTruck':
          break
        case 'chanelRepertory':
          break
        case 'printPaper':
          this.$message({ type: 'warning', message: '暂无此功能，敬请期待~' })
          break
        case 'printList':
          this.$message({ type: 'warning', message: '暂无此功能，敬请期待~' })
          break
        case 'export':
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
    fetchShortDepartList() {
      this.dataList = []
      this.total = 0
      this.getAllListOne()
      this.getAllListTwo()
      this.getAllListThree()
    },
    getAllListOne () {
       this.loading = true
      let dataOne = Object.assign({}, this.searchQuery) // 短驳中 48
      dataOne.batchTypeId = 48
      return postAllshortDepartList(dataOne).then(data => {
        if (data) {
          data.list.forEach(e => {
            this.infoList.push(e)
          })
          this.total += data.total
          this.loading = false
        } else {
          this.loading = false
        }
      })
    },
    getAllListTwo() {
      this.loading = true
      let dataTwo = Object.assign({}, this.searchQuery) // 已到车 49
      dataTwo.batchTypeId = 49
      return postAllshortDepartList(dataTwo).then(data => {
        if (data) {
          data.list.forEach(e => {
            this.infoList.push(e)
          })
          this.total += data.total
          this.loading = false
        } else {
          this.loading = false
        }
      })
    },
    getAllListThree() {
      this.loading = true
      let dataThree = Object.assign({}, this.searchQuery) // 已入库 50
      dataThree.batchTypeId = 50
      return postAllshortDepartList(dataThree).then(data => {
        if (data) {
          data.list.forEach(e => {
            this.infoList.push(e)
          })
          this.total += data.total
          this.loading = false
        } else {
          this.loading = false
        }
      })
    }
    // getAllList() {
    //   this.loading = true
    //   let dataOne = Object.assign({}, this.searchQuery) // 短驳中 48
    //   let dataTwo = Object.assign({}, this.searchQuery) // 已到车 49
    //   let dataThree = Object.assign({}, this.searchQuery) // 已入库 50
    //   dataOne.batchTypeId = 48
    //   dataTwo.batchTypeId = 49
    //   dataThree.batchTypeId = 50
    //   postAllshortDepartList(dataOne).then(data => {
    //     if (data) {
    //       data.list.forEach(e => {
    //         this.infoList.push(e)
    //       })
    //       this.total += data.total
    //       this.loading = false
    //     } else {
    //       this.loading = false
    //     }
    //   })
    //   postAllshortDepartList(dataTwo).then(data => {
    //     if (data) {
    //       data.list.forEach(e => {
    //         this.infoList.push(e)
    //       })
    //       this.total += data.total
    //       this.loading = false
    //     } else {
    //       this.loading = false
    //     }
    //   })
    //   postAllshortDepartList(dataThree).then(data => {
    //     if (data) {
    //       data.list.forEach(e => {
    //         this.infoList.push(e)
    //       })
    //       this.total += data.total
    //       this.loading = false
    //     } else {
    //       this.loading = false
    //     }
    //   })
    // }
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
