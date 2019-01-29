<template>
  <div class="tab-content" v-loading="loading">
    <SearchForm @change="getSearchParam"></SearchForm>
    <div class="tab_info">
      <div class="btns_box">
        <el-button type="danger" :size="btnsize" icon="el-icon-circle-plus-outline" plain @click="openlntelligent" v-has:LOAD_GX_SMART>智能配载
        </el-button>
      </div>
      <div class="info_tab">
        <el-table ref="multipleTable" :data="dataList" border height="100%" tooltip-effect="dark" :key="tablekey" style="width:100%;" stripe>
          <el-table-column label="序号" width="70">
            <template slot-scope="scope">
              {{ ((searchQuery.currentPage - 1) * searchQuery.pageSize) + scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column label="创建时间" prop="createTime" width="180">
          </el-table-column>
          <el-table-column label="运行路线" prop="line"></el-table-column>
          <el-table-column label="方案数量" prop="schemeNum" width="120"></el-table-column>
          <el-table-column label="操作" width="160">
            <template slot-scope="scope">
              <el-button :size="btnsize" icon="el-icon-view" type="text" @click="doView(scope.row, scope.$index)">查看</el-button>
              <el-button :size="btnsize" icon="el-icon-delete" type="text" @click="doDelete(scope.row, scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="info_tab_footer">共计:{{ total }}
        <div class="show_pager">
          <Pager :total="total" @change="handlePageChange" />
        </div>
      </div>
    </div>
    <!-- 智能配载 -->
    <AddLntelligent :popVisible.sync="lntelligentVisible" @close="openlntelligent" @success="fetchData" :dotInfo="selectInfo"></AddLntelligent>
  </div>
</template>
<script>
import SearchForm from './components/searchLoad'
import Pager from '@/components/Pagination/index'
import AddLntelligent from './components/addLntelligent '
import { postLoadSchemeList, deleteScheme, selectSchemeGroupDetail } from '@/api/operation/arteryDepart'
import { objectMerge2, parseTime } from '@/utils/index'

export default {
  components: {
    SearchForm,
    Pager,
    AddLntelligent
  },
  data() {
    return {
      btnsize: 'mini',
      dataList: [],
      lntelligentVisible: false,
      tablekey: 0,
      total: 0,
      loading: true,
      searchQuery: {
        currentPage: 1,
        pageSize: 100,
        vo: {}
      },
      selectInfo: {}
    }
  },
  methods: {
    openlntelligent() { // 打开智能配载弹出框
      this.lntelligentVisible = true
    },
    fetchData() { // 查询方案列表
      this.loading = true
      postLoadSchemeList(this.searchQuery).then(data => {
          if (data) {
            this.loading = false
            this.dataList = data.list
            this.total = data.total
          }
        })
        .catch(err => {
          this.loading = false
          this._handlerCatchMsg(err)
        })
    },
    getSearchParam(obj) { // 获取查询条件
      this.searchQuery.currentPage = this.$options.data().searchQuery.currentPage
      this.searchQuery.pageSize = this.$options.data().searchQuery.pageSize
      this.$set(this.searchQuery, 'vo', obj)
      this.fetchData()
    },
    doView(row, index) { // 查看方案
      this.$router.push({path: '/operation/order/loadIntelligent/load',query:{
        schemeGroup: row.schemeGroup,
        orgid: this.otherinfo.orgid,
        timer: new Date().getTime()
      }})
    },
    doDelete(row, index) { // 删除方案
      let obj = {
        schemeGroup: row.schemeGroup,
        orgid: this.otherinfo.orgid
      }
      this.$confirm('此操作将永久删除该方案, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteScheme(obj).then(data => {
            this.$message.success('删除成功！')
            this.fetchData()
          })
          .catch(err => {
            this._handlerCatchMsg(err)
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handlePageChange(obj) { // 列表翻页
      this.searchQuery.currentPage = obj.currentPage
      this.searchQuery.pageSize = obj.pageSize
      this.fetchData()
    }
  }
}

</script>
