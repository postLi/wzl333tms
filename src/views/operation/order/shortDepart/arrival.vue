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
          <el-table-column sortable width="120" prop="bathStatusName" label="批次状态">
          </el-table-column>
          <el-table-column sortable width="120" prop="truckIdNumber" label="车牌号">
          </el-table-column>
          <el-table-column sortable width="120" prop="dirverName" label="司机">
          </el-table-column>
          <el-table-column sortable width="120" prop="dirverMobile" label="司机电话">
          </el-table-column>
          <el-table-column sortable width="180" prop="departureTime" label="短驳时间">
            <template slot-scope="scope">
              {{ scope.row.departureTime}}
            </template>
          </el-table-column>
          <el-table-column sortable width="120" prop="endOrgName" label="目的网点">
          </el-table-column>
          <el-table-column sortable width="155" prop="receivingTime" label="接收时间">
            <template slot-scope="scope">
              {{ scope.row.receivingTime }}
            </template>
          </el-table-column>
          <el-table-column sortable width="120" prop="shortFee" label="短驳费">
          </el-table-column>
          <el-table-column sortable width="120" prop="actualAmount" label="实到件数">
          </el-table-column>
          <el-table-column sortable width="120" prop="actualWeight" label="实到重量">
          </el-table-column>
          <el-table-column sortable width="120" prop="actualVolume" label="实到体积">
          </el-table-column>
          <el-table-column sortable width="120" prop="amountall" label="配载总件数">
          </el-table-column>
          <el-table-column sortable width="120" prop="weightall" label="配载总重量">
          </el-table-column>
          <el-table-column sortable width="120" prop="volumeall" label="配载总体积">
          </el-table-column>
          <el-table-column sortable width="120" prop="weightRate" label="重量装载率">
          </el-table-column>
          <el-table-column sortable width="120" prop="volumeRate" label="体积装载率">
          </el-table-column>
          <el-table-column sortable width="120" prop="username" label="短驳经办人">
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
      <editInfo :orgid="orgid" :id='loadId' :info="loadInfo" :popVisible.sync="editInfoVisible" @close="closeMe"></editInfo>
    </div>
  </div>
</template>
<script>
import { postLoadList, postCancelLoad, postCancelPut, postConfirmToCar } from '@/api/operation/shortDepart'
import { mapGetters } from 'vuex'
import SearchForm from './components/searchArrival'
import Pager from '@/components/Pagination/index'
import editInfo from './components/editInfo'
export default {
  components: {
    Pager,
    SearchForm,
    editInfo
  },
  data() {
    return {
      total: 0,
      btnsize: 'mini',
      setupTableVisible: false,
      selected: [],
      tableKey: 0,
      loadId: 0,
      loading: false,
      isModify: false,
      editInfoVisible: false,
      selectInfo: {},
      loadInfo: [],
      isBatch: true,
      commonTruck: {},
      infoList: [],
      searchQuery: {
        currentPage: 1,
        pageSize: 100,
        vo: {
          loadTypeId: 38,
          orgid: 0
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
    this.getAllList()
  },
  methods: {
    getSearchParam(obj) { // 获取搜索框表单内容
      this.searchQuery.vo = Object.assign({}, obj) // 38-短驳 39-干线 40-送货
      if (!this.searchQuery.vo.orgid) {
        this.searchQuery.vo.orgid = this.otherinfo.orgid
      }
      this.getAllList()
    },
    doAction(type) {
      let isWork = false
      if (this.selected.length !== 1) {
        this.$message({
          message: '请选择一条数据~',
          type: 'warning'
        })
        isWork = false
      } else {
        isWork = true
      }
      switch (type) {
        case 'truck':
          if (isWork) {
            this.truck()
          }
          break
        case 'repertory':
          if (isWork) {
            this.repertory()
          }
          break
        case 'chanelTruck':
          if (isWork) {
            this.chanelTruck()
          }
          break
        case 'chanelRepertory':
          if (isWork) {
            this.chanelRepertory()
          }
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
    setTable() {
      this.$message({ type: 'warning', message: '暂无此功能，敬请期待~' })
    },
    clickDetails(row) { //打勾勾
      this.$refs.multipleTable.toggleRowSelection(row)
    },
    getSelection(list) { // 获取列表勾选项
      this.selected = Object.assign([], list)
      if (list.length === 1) {
        let lid = 0
        list.forEach(e => {
          lid = e.id
          this.loadInfo = Object.assign([], e)
        })
        this.loadId = lid
      }
    },
    handlePageChange(obj) { // 翻页
      this.searchQuery.currentPage = obj.pageNum
      this.searchQuery.pageSize = obj.pageSize
    },
    truck() { // 短驳到车确认
      let data = {}
      this.$set(data, 'id', this.loadInfo.id)
      this.$set(data, 'typeId', 49) // 49为短驳到车，54为干线到车
      postConfirmToCar(data).then(data => {
        this.$message({ type: 'success', message: '短驳到车操作成功' })
        this.getAllList()
        this.clearInfo()
      })
    },
    repertory() { // 短驳入库-打开弹出框
      this.setInfo()
    },
    chanelTruck() { // 取消到车
      let data = {}
      this.$set(data, 'id', this.loadInfo.id)
      this.$set(data, 'loadType', 38) // 装载类型：38-短驳
      if (this.loadInfo.bathStatusName === '已到车'){
        postCancelLoad(data).then(data => {
          this.$message({ type: 'success', message: '取消到车成功' })
          this.getAllList()
          this.clearInfo()
        })
        .catch(error => {
          this.$message({ type: 'success', message: '操作失败' })
        })
      } else {
        this.$message({ type: 'warning', message: '【 '+this.loadInfo.batchNo+' 】已【 '+this.loadInfo.bathStatusName+' 】不允许取消到车' })
        this.clearInfo()
      }
      
    },
    chanelRepertory() { // 取消入库
      let data = {}
      this.$set(data, 'id', this.selected[0].id)
      this.$set(data, 'loadType', 38) // 装载类型：短驳
      postCancelPut(data).then(data => {
          this.$message({ type: 'success', message: '取消入库成功' })
          this.getAllList()
          this.clearInfo()
        })
        .catch(error => {
          this.$message({ type: 'success', message: '操作失败' })
        })
    },
    getAllList() { // 获取短驳到货列表
      this.loading = true
      return postLoadList(this.searchQuery).then(data => {
        if (data) {
          this.infoList = data.list
          this.total = data.total
          this.loading = false
        } else {
          this.loading = false
        }
      })
    },
    closeMe() { // 关闭弹出框
      this.editInfoVisible = false
    },
    setInfo() { // 打开弹出框
      this.editInfoVisible = true
      this.$refs.multipleTable.clearSelection()
    },
    clearInfo() { // 清空数据
      this.editInfoVisible = false
      this.$refs.multipleTable.clearSelection()
    },
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
