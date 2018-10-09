<template>
  <div class="tab-content">
    <SearchForm></SearchForm>
    <div class="tab_info">
      <div class="btns_box">
        <el-button type="danger" :size="btnsize" icon="el-icon-circle-plus-outline" plain @click="openlntelligent" v-has:LOAD_GX_SMART>智能配载
        </el-button>
        <!-- <span class="dbclickTips">双击查看详情</span> -->
      </div>
      <div class="info_tab">
        <el-table ref="multipleTable" :data="dataList" border height="100%" tooltip-effect="dark" :key="tablekey" style="width:100%;" stripe>
          <el-table-column label="序号" width="50">
            <template slot-scope="scope">
              {{ ((searchQuery.pageNum - 1) * searchQuery.pageSize) + scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column label="创建时间" prop="time"></el-table-column>
          <el-table-column label="运行路线" prop="line"></el-table-column>
          <el-table-column label="方案数量" prop="count"></el-table-column>
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

export default {
  components: {
    SearchForm,
    Pager,
    AddLntelligent
  },
  data() {
    return {
      btnsize: 'mini',
      dataList: [{
        time: '2018-10-08 10:05:20',
        line: '广州到深圳',
        count: 30
      }],
      lntelligentVisible: false,
      tablekey: 0,
      total: 0,
      searchQuery: {
        pageNum: 1,
        pageSize: 100,
        vo: {
          orgId: ''
        }
      },
      selectInfo: {}
    }
  },
 
  methods: {
    openlntelligent() {
      this.lntelligentVisible = true
    },
    fetchData() {},
    doView(row, index) {
      // 查看方案
      this.$message.warning('暂无查看功能')
    },
    doDelete(row, index) {
      // 删除方案
      this.$message.warning('暂无删除功能')
    },
    handlePageChange(obj) {}
  }
}

</script>
