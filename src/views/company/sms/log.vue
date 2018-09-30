<template>
  <div class="tab-content" v-loading="loading">
    <!-- 库存总表 -->
    <SearchForm :orgid="otherinfo.orgid" @change="getSearchParam" :btnsize="btnsize" />
    <div class="tab_info">
      <div class="info_tab">
        <el-table ref="multipleTable" :data="infoList" border height="100%" tooltip-effect="dark" style="width:100%;" stripe>
          <el-table-column 
          width="60"
          label="序号">
          <template slot-scope="scope">
            {{((searchQuery.currentPage - 1) * searchQuery.pageSize) + scope.$index + 1}}
          </template>
        </el-table-column>
        <el-table-column
        label="网点"
        prop="orgName"
        width="120">
      </el-table-column>
      <el-table-column
        label="发送节点"
        prop="sendNode"
        width="150">
      </el-table-column>
      <el-table-column
        label="发送对象"
        prop="sendTarget"
        width="120">
      </el-table-column>
      <el-table-column
        label="手机号码"
        prop="phone"
        width="110">
      </el-table-column>
      <el-table-column
        label="发送时间"
        prop="sendTime"
        width="160">
      </el-table-column>
      <el-table-column
        label="短信内容"
        prop="smsContent">
        <template slot-scope="scope">
          <el-popover placement="bottom" width="400" trigger="hover" :content="scope.row.smsContent">
            <span slot="reference">{{scope.row.smsContent}}</span>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        label="状态"
        prop="statusStr"
        width="120">
        <template slot-scope="scope">
          <el-tag :type="scope.row.statusStr==='发送失败'? 'danger': 'success'" size="mini">{{scope.row.statusStr}}</el-tag>
        </template>
      </el-table-column>
          <!-- <template v-for="column in tableColumn">
            <el-table-column :key="column.id" :fixed="column.fixed" sortable :label="column.label" :prop="column.prop" v-if="!column.slot &&!column.expand" :width="column.width">
            </el-table-column>
            <el-table-column :key="column.id" :fixed="column.fixed" sortable :label="column.label" :prop="column.prop" v-else-if="!column.slot &&column.expand" :width="column.width">
              <template slot-scope="scope">
                <el-popover placement="bottom" width="400" trigger="hover" :content="scope.row.smsContent">
                  <span slot="reference">{{scope.row.smsContent}}</span>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column :key="column.id" :fixed="column.fixed" sortable :label="column.label" v-else :width="column.width">
              <template slot-scope="scope">
                <span class="clickitem" v-if="column.click" v-html="column.slot(scope)" @click.stop="column.click(scope)"></span>
                <span v-else v-html="column.slot(scope)"></span>
              </template>
            </el-table-column>
          </template> -->
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
import SearchForm from './components/search'
import Pager from '@/components/Pagination/index'
import { postSmsSendLogList } from '@/api/company/sms'
export default {
  data() {
    return {
      btnsize: 'mini',
      loading: true,
      total: 0,
      searchQuery: {
        currentPage: 1,
        pageSize: 100,
        vo: {}
      },
      infoList: []
      // tableColumn: [{
      //     label: '序号',
      //     width: '50',
      //     slot: (scope) => {
      //       return ((this.searchQuery.currentPage - 1) * this.searchQuery.pageSize) + scope.$index + 1
      //     }
      //   },
      //   {
      //     label: '网点',
      //     prop: 'orgName',
      //     width: '120'
      //   }, {
      //     label: '发送节点',
      //     prop: 'sendNode',
      //     width: '150'
      //   }, {
      //     label: '发送对象',
      //     prop: 'sendTarget',
      //     width: '150'
      //   }, {
      //     label: '发送时间',
      //     prop: 'sendTime',
      //     width: '160'
      //   }, {
      //     label: '短信内容',
      //     prop: 'smsContent'
      //   }, {
      //     label: '状态',
      //     prop: 'statusStr',
      //     width: '120'
      //   }
      // ]
    }
  },
  components: {
    Pager,
    SearchForm
  },
  mounted() {

  },
  methods: {
    postSmsSendLogList() {
      this.loading = true
      postSmsSendLogList(this.searchQuery).then(data => {
        this.infoList = data.list
        this.total = data.total
        this.loading = false
      })
    },
    handlePageChange(obj) {
      this.searchQuery.currentPage = obj.pageNum
      this.searchQuery.pageSize = obj.pageSize
    },
    getSearchParam(obj) {
      this.$set(this.searchQuery, 'vo', obj)
      this.postSmsSendLogList()
    }
  }
}

</script>
