<template>
  <div class="tab-content" v-loading="loading">
    <div class="tab_info">
      <div class="btns_box">
        <el-button type="primary" :size="btnsize" icon="el-icon-document" plain @click="createSmsSign">定制专属签名</el-button>
      </div>
      <div class="info_tab">
        <el-table ref="multipleTable" height="100%" style="width:100%;" tooltip-effect="dark" :data="infoList" stripe border :default-sort="{prop: 'id', order: 'ascending'}">
          <el-table-column fixed sortable width="50" label="序号">
          	<template slot-scope="scope">
          		{{scope.row.$index}}
          	</template>
          </el-table-column>
          <el-table-column fixed sortable label="短信发送节点">
          </el-table-column>
          <el-table-column fixed sortable label="提醒对象">
          </el-table-column>
          <el-table-column fixed sortable label="短信内容（双击编辑短信内容）">
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
import { mapGetters } from 'vuex'
import { postSmsTemplateLogList } from '@/api/company/sms'
import Pager from '@/components/Pagination/index'
export default {
  components: {
  	Pager
  },
  data() {
    return {
      btnsize: 'mini',
      infoList: [],
      loading: true,
      total: 0,
      searchQuery: {
        currentPage: 1,
        pageSize: 100,
        vo: {
          orgId: ''
        }
      }
    }
  },
  mounted() {
    this.fetchList()
  },
  methods: {
    fetchList() {
    	this.loading = true
      this.searchQuery.vo.orgId = this.otherinfo.orgid
      postSmsTemplateLogList(this.searchQuery).then(data => {
        this.infoList = data.list
        this.total = data.total
        this.loading = false
      })
      .catch(err => {

      })
    },
    handlePageChange(obj) { // 翻页
      this.searchQuery.currentPage = obj.pageNum
      this.searchQuery.pageSize = obj.pageSize
    },
    createSmsSign () {
      this.$message.warning('暂无此功能，敬请期待')
    }
  }
}

</script>
