<template>
<div class="handAccount-manager tab-wrapper tab-wrapper-100">
  <div class="tab-content handAccount-detail" v-loading="loading">
    <SearchForm :orgid="searchQuery.vo.orgid" @change="getSearchParam" :btnsize="btnsize" />  
    <div class="tab_info">
      <div class="btns_box">
          
          <el-button type="primary" :size="btnsize" icon="el-icon-edit-outline" class="table_setup" @click="doAction('export')" plain>导出</el-button>
          <el-button type="primary" :size="btnsize" icon="el-icon-edit-outline" class="table_setup" @click="doAction('print')" plain>打印</el-button>
          <el-button type="primary" :size="btnsize" icon="el-icon-setting" plain @click="setTable" class="table_setup">表格设置</el-button>
      </div>
      <div class="info_tab"> 
        <el-table
          ref="multipleTable"
          :data="usersArr"
          :key="tablekey"
          stripe
          border
          @row-click="clickDetails"
          @selection-change="getSelection"
          height="100%"
          show-summary
          :summary-method="getSummaries"
          tooltip-effect="dark"
          :default-sort = "{prop: 'id', order: 'ascending'}"
          style="width: 100%">
          
          <el-table-column
            fixed
            sortable
            type="selection"
            width="80">
          </el-table-column>
          <template v-for="column in tableColumn">
            <el-table-column
              :key="column.id"
              :fixed="column.fixed"
              sortable
              :label="column.label"
              :prop="column.prop"
              v-if="!column.slot"
              :width="column.width">
            </el-table-column>
            <el-table-column
              :key="column.id"
              :fixed="column.fixed"
              sortable
              :label="column.label"
              v-else
              :width="column.width">
              <template slot-scope="scope" v-html="true">
                  {{ column.slot(scope) }}
              </template>
            </el-table-column>
          </template>
        </el-table>
      </div>   
      <div class="info_tab_footer">共计:{{ total }} <div class="show_pager"> <Pager :total="total" @change="handlePageChange" /></div> </div>
    </div>
    <TableSetup :popVisible="setupTableVisible" @close="closeSetupTable" :columns='tableColumn' @success="setColumn"  />
  </div>
  </div>
</template>
<script>
import * as handAccountApi from '@/api/finance/handAccount'
import SearchForm from './components/search2'
import TableSetup from '@/components/tableSetup'
import { getSummaries, parseTime } from '@/utils/'
import { PrintInFullPage, SaveAsFile } from '@/utils/lodopFuncs'
import Pager from '@/components/Pagination/index'

export default {
  name: 'handAccountDetail',
  components: {
    SearchForm,
    TableSetup,
    Pager
  },
  mounted() {
    // this.searchQuery.vo.userId = this.$route.query.id
  },
  activated() {
    // this.searchQuery.vo.userId = this.$route.query.id
    // this.fetchData()
  },
  watch: {
    $route: {
      handler() {
        this.searchQuery.vo.userId = this.$route.query.id
        this.searchQuery.vo.orgid = this.$route.query.orgid
        this.fetchData()
      },
      immediate: true
    }
  },
  data() {
    return {
      btnsize: 'mini',
      usersArr: [],
      total: 0,
      // 加载状态
      loading: true,
      setupTableVisible: false,
      isModify: false,
      selectInfo: {},
      // 选中的行
      selected: [],
      searchQuery: {
        'currentPage': 1,
        'pageSize': 100,
        'vo': {
          'orgid': '',
          status: '',
          endTime: '',
          startTime: '',
          userId: ''
        }
      },
      // 默认sort值为true
      tablekey: '',
      tableColumn: [{
        'label': '序号',
        'prop': '',
        'fixed': true,
        'slot': function(scope) {
          return scope.$index + 1
        }
      }, {
        'label': '网点',
        'prop': 'orgName',
        'fixed': true
      }, {
        'label': '员工姓名',
        'prop': 'userName'
      }, {
        'label': '运单号',
        'prop': 'shipSn',
        'width': '120'
      }, {
        label: '签收状态',
        prop: 'signStatus',
        width: '100'
      },{
        'label': '费用类别',
        'prop': 'feeName'
      }, {
        'label': '金额',
        'prop': 'shipNowpayFee'
      }, {
        'label': '交账状态',
        'prop': 'statusValue',
        'width': '120'
      }, {
        'label': '已交金额',
        'prop': 'finishAccount'
      }, {
        'label': '未交账金额',
        'prop': 'noSettlementFee',
        'width': '120'
      }, {
        'label': '开单时间',
        'prop': 'createTime',
        'width': '180'
      }, {
        'label': '业务员',
        'prop': 'shipUserName',
        'width': '100'
      }, {
        'label': '出发城市',
        'prop': 'shipFromCityName'
      }, {
        'label': '到达城市',
        'prop': 'shipToCityName'
      }, {
        'label': '发货方',
        'prop': 'senderCustomerUnit'
      }, {
        'label': '发货人',
        'prop': 'senderCustomerName'
      }, {
        'label': '收货方',
        'prop': 'receiverCustomerUnit'
      }, {
        'label': '收货人',
        'prop': 'receiverCustomerName'
      }]
    }
  },
  methods: {
    viewDetails(row) {
      this.$router.push({
        path: '/finance/handAccount/detail',
        query: {
          orderid: row.id,
          type: 'view',
          tab: '查看' + row.shipSn
        }
      })
    },
    showDetail(order) {
      this.viewDetails(order)
    },
    fetchAllOrder() {
      this.loading = true
      return handAccountApi.getFeeList(this.searchQuery).then(data => {
        this.usersArr = data.list
        this.total = data.total
        this.loading = false
      }).catch((err)=>{
        this.loading = false
        this.$message.error(err.errorInfo || err.text || '未知错误，请重试~')
      })
    },
    fetchData() {
      this.fetchAllOrder()
    },
    setColumn () {},
    handlePageChange(obj) {
      this.searchQuery.currentPage = obj.pageNum
      this.searchQuery.pageSize = obj.pageSize
      this.fetchData()
    },
    getSearchParam(obj) {
      this.searchQuery.vo = Object.assign(this.searchQuery.vo, obj)
      this.loading = false
      this.fetchData()
    },
    doAction(type) {
      // 判断是否有选中项
      if (!this.selected.length && type !== 'add' && type !== 'export' && type !== 'print') {
        this.$message({
          message: '请选择要操作的项~',
          type: 'warning'
        })
        return false
      }

      console.log('this.selected:', this.selected)

      switch (type) {
          // 添加运单
        case 'detail':
          this.isModify = false
          this.selectInfo = {}
          this.showDetail(this.selected[0])
          break
          // 导出数据
        case 'export':
          SaveAsFile({
            data: this.selected.length ? this.selected : this.usersArr,
            columns: this.tableColumn,
            name: this.$route.query.tab.replace('查看', '') + '交账单-' + parseTime(new Date(), '{y}{m}{d}{h}{i}{s}')
          })
          break
        case 'print':
          PrintInFullPage({
            data: this.selected.length ? this.selected : this.usersArr,
            columns: this.tableColumn,
            name: this.$route.query.tab.replace('查看', '') + '交账单'
          })
          break
      }
      // 清除选中状态，避免影响下个操作
      this.$refs.multipleTable.clearSelection()
    },
    setTable() {
      this.setupTableVisible = true
    },
    closeSetupTable() {
      this.setupTableVisible = false
    },
    clickDetails(row, event, column) {
      this.$refs.multipleTable.toggleRowSelection(row)
    },
    getSelection(selection) {
      this.selected = selection
    },
    // 计算总数
    getSummaries(param) {
      return getSummaries(param, ['shipNowpayFee', 'finishAccount', 'noSettlementFee'])
    }
  }
}
</script>
<style lang="scss">
.handAccount-manager .tab-content{
  .tab_info{
    padding-bottom: 10px;
  }
}
</style>

