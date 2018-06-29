<template>
  <div class="tab-content" v-loading="loading">
    <!-- 短驳发车 -->
    <SearchForm :orgid="otherinfo.orgid" @change="getSearchParam" :btnsize="btnsize" />
    <div class="tab_info">
      <div class="btns_box">
        <el-button type="primary" :size="btnsize" icon="el-icon-plus" plain @click="doAction('add')">新增短驳</el-button>
        <el-button type="success" :size="btnsize" icon="el-icon-document" plain @click="doAction('truck')">发车</el-button>
        <el-button type="danger" :size="btnsize" icon="el-icon-circle-close-outline" plain @click="doAction('chanelTruck')">取消发车</el-button>
        <el-button type="danger" :size="btnsize" icon="el-icon-circle-close-outline" plain @click="doAction('chanelRepertory')">取消装车</el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-printer" @click="doAction('edit')" plain :disabled="isDisBtn">修改</el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-printer" @click="doAction('print')" plain>打印</el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-download" @click="doAction('export')" plain>导出</el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-setting" plain @click="setTable" class="table_setup">表格设置</el-button>
      </div>
      <div class="info_tab">
        <el-table ref="multipleTable" :data="dataList" stripe border @row-click="clickDetails" @selection-change="getSelection" height="100%" tooltip-effect="dark" style="width:100%;" :default-sort="{prop: 'id', order: 'ascending'}">
          <el-table-column fixed width="50" sortable type="selection">
          </el-table-column>
          <el-table-column fixed sortable width="110" prop="batchNo" label="发车批次">
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
          <el-table-column sortable width="155" prop="receivingTime" label="接收时间">
            <template slot-scope="scope">
              {{ scope.row.receivingTime | parseTime('{y}-{m}-{d} {h}:{m}:{s}') }}
            </template>
          </el-table-column>
          <el-table-column sortable width="120" prop="shortFee" label="短驳费">
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
          <el-table-column sortable width="150" prop="remark" label="备注">
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
    <!-- 表格设置 -->
    <TableSetup :popVisible="setupTableVisible" @close="closeSetupTable" @success="fetchAllShortDepartList"></TableSetup>
  </div>
</template>
<script>
import { postAllshortDepartList, putTruckDepart, putTruckChanel, putTruckLoad } from '@/api/operation/shortDepart'
import { mapGetters } from 'vuex'
import SearchForm from './components/search'
import Pager from '@/components/Pagination/index'
import { objectMerge2 } from '@/utils/index'
import TableSetup from './components/tableSetup'
export default {
  components: {
    Pager,
    SearchForm,
    postAllshortDepartList,
    TableSetup
  },
  data() {
    return {
      total: 0,
      btnsize: 'mini',
      setupTableVisible: false,
      selected: [],
      loading: true,
      selectedList: [],
      isModify: false,
      isBatch: false,
      commonTruck: {},
      selectInfo: {},
      isDisBtn: true,
      selectedData: {},
      dataList: [],
      searchQueryData: {
        pageSize: 100,
        currentPage: 1
      },
      searchQuery: {
        orgId: 1,
        loadTypeId: 38,
        loadStartTime: '',
        loadEndTime: '',
        departureStartTime: '',
        departureEndTime: '',
        batchTypeId: '',
        arriveOrgid: '',
        batchNo: '',
        truckIdNumber: '',
        dirverName: ''
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
  activated() {
    this.searchQuery.orgId = this.otherinfo.orgid
    this.fetchAllShortDepartList()
  },
  methods: {
    getSearchParam(obj) {
      this.searchQuery = objectMerge2({}, obj) // 38-短驳 39-干线 40-送货
      if (!this.searchQuery.orgId) {
        this.searchQuery.orgId = this.otherinfo.orgid
      }
      this.fetchAllShortDepartList()
    },
    doAction(type) {
      let isWork = false
      if (this.selected.length < 1 && type !== 'add' && this.selectedList.length < 1) {
        this.$message({
          message: '请选择数据~',
          type: 'warning'
        })
        isWork = false
      } else {
        isWork = true
      }
      switch (type) {
        case 'add':
          this.$router.push({ path: '././load', query: { loadTypeId: 38 } })
          break
        case 'truck': // 发车
          if (isWork) {
            this.$confirm('此操作将发车, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.truck()
            })
          }
          break
        case 'chanelTruck': // 取消发车
          if (isWork) {
            this.$confirm('此操作将取消发车, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.chanelTruck()
            })
          }
          break
        case 'chanelRepertory': // 取消装车
          if (isWork) {
            this.$confirm('此操作将取消装车, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.chanelRepertory()
            })
          }
          break
        case 'edit': // 修改
          this.edit()
          break
        case 'print':
          this.$message({ type: 'warning', message: '暂无此功能，敬请期待~' })
          break
        case 'export':
          this.$message({ type: 'warning', message: '暂无此功能，敬请期待~' })
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
      if (list.length === 1) {
        this.selected = objectMerge2([], list)
        this.isDisBtn = false
        let tid = 0
        this.selected.forEach(e => {
          this.selectedData = objectMerge2({}, e)
        })
      } else {
        this.isDisBtn = true
        this.selectedList = objectMerge2([], list)
      }
      this.isBatch = true
    },
    handlePageChange(obj) {
      this.searchQuery.currentPage = obj.pageNum
      this.searchQuery.pageSize = obj.pageSize
    },
    fetchAllShortDepartList() {
      this.getAllList()
    },
    getAllList() {
      this.loading = true
      this.$set(this.searchQueryData, 'vo', this.searchQuery)
      return postAllshortDepartList(this.searchQueryData).then(data => {
        if (data) {
          this.dataList = data.list
          this.total = data.total
          this.loading = false
        } else {
          this.loading = false
        }
      })
    },
    clearData() {
      this.isBatch = false
      this.commonTruck = {}
      this.selected = []
      this.selectedList = []
      this.selectedData = {}
      this.$refs.multipleTable.clearSelection()
    },
    setData(type) {
      let data = {}
      this.$set(data, 'loadTypeId', 38) // 短驳
      this.$set(data, 'loadIds', [])
      if (this.isDisBtn) { // 批量操作
        this.selectedList.forEach((e, index) => {
          if (e.batchTypeId === type) { // 47-短驳发车 48-短驳中
            data.loadIds.push(e.loadId) // 将符合type的id选取
          }
        })
      } else {
        this.selected.forEach((e, index) => {
          if (e.batchTypeId === type) { // 47-短驳发车 48-短驳中
            data.loadIds.push(e.loadId)
          } else {
            this.isBatch = false
          }
        })
      }
      data.loadIds = data.loadIds.join(',')
      if (!data.loadIds){ // 如果id为空，即请求状态不对，拦截请求
        this.isBatch = false
      }
      this.commonTruck = data
      data = {}
    },
    truck() { // 发车
      this.setData(47)
      if (this.isBatch) {
        console.log('loadIds', this.commonTruck.loadIds)
        putTruckDepart(this.commonTruck).then(data => {
            if (data) {
              this.$message({ type: 'success', message: '发车成功！' })
              this.fetchAllShortDepartList()
              this.clearData()
            }
          })
          .catch(error => {
            this.$message({ type: 'error', message: '操作失败' })
          })
      } else {
        this.$message({ type: 'warning', message: '已装车状态才可以发车确认' })
      }
      this.clearData()
    },
    chanelTruck() { // 取消发车
      this.setData(48)
      if (this.isBatch) {
        putTruckChanel(this.commonTruck).then(data => {
            if (data) {
              this.$message({ type: 'success', message: '取消发车操作成功！' })
              this.fetchAllShortDepartList()
              this.clearData()
            }
          })
          .catch(error => {
            this.$message({ type: 'error', message: '操作失败' })
          })
      } else {
        this.$message({ type: 'warning', message: '短驳中状态才可以取消发车' })
      }
      this.clearData()
    },
    chanelRepertory() { // 取消装车
      this.setData(47)
      if (this.isBatch) {
        putTruckLoad(this.commonTruck).then(data => {
            if (data) {
              this.$message({ type: 'success', message: '取消装车操作成功！' })
              this.fetchAllShortDepartList()
              this.clearData()
            }
          })
          .catch(error => {
            this.$message({ type: 'error', message: '操作失败' })
          })
      } else {
        this.$message({ type: 'warning', message: '已装车状态才可以取消装车' })
      }
      this.clearData()
    },
    edit() { // 修改
      let batchTypeId = this.selectedData.batchTypeId
      if (batchTypeId === 47 || batchTypeId === 48) {
        this.$router.push({ path: '././load', query: { loadTypeId: 38, info: this.selectedData } })
      } else {
        this.$message({ type: 'warning', message: '【 ' + this.selectedData.batchNo + ' 】已【 ' + this.selectedData.batchTypeName + ' 】不可以修改' })
      }
      this.clearData()
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
    padding: 10px 0px 40px;
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
