<template>
  <div class="tab-content" v-loading="loading">
    <SearchForm :orgid="otherinfo.orgid" :issender="true" @change="getSearchParam" :btnsize="btnsize" />
    <div class="tab_info">
      <div class="btns_box">

          <el-button type="primary" :size="btnsize" icon="el-icon-edit" plain @click="doAction('storage')">对账明细</el-button>
          <el-button type="primary" :size="btnsize" icon="el-icon-edit-outline" @click="doAction('export')" plain>导出</el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-edit-outline" @click="doAction('export')" plain>打印</el-button>

          <el-button type="primary" :size="btnsize" icon="el-icon-setting" plain @click="setTable" class="table_setup">表格设置</el-button>
      </div>
      <div class="info_tab">
        <el-table
          ref="multipleTable"
          :data="usersArr"
          stripe
          border
          @row-dblclick="getDbClick"
          @row-click="clickDetails"
          @selection-change="getSelection"
          height="100%"
          tooltip-effect="dark"
          :default-sort = "{prop: 'id', order: 'ascending'}"
          style="width: 100%">
          <el-table-column
            fixed
            sortable
            type="selection"
            width="80">
          </el-table-column>
          <el-table-column
            fixed
            sortable
            label="序号"
            width="120">
            <template slot-scope="scope">{{ ((searchQuery.currentPage - 1)*searchQuery.pageSize) + scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column
            fixed
            sortable
            prop="orgName"
            width="200"
            label="网点">
          </el-table-column>
          <el-table-column
            prop="carrierName"
            width="220"
            sortable
            label="承运商">
          </el-table-column>
          <el-table-column
            prop="carrierMobile"
            sortable
            width="220"
            label="承运商电话">
          </el-table-column>
          <el-table-column
            prop="receivableFee"
            sortable
            width="220"
            label="应收账款">
          </el-table-column>

          <el-table-column
            sortable
            prop="payableFee"
            width="220"
            label="应付账款">
          </el-table-column>
          <el-table-column
            prop="recAndPayFee"
            label="应收应付对账合计"
            width="250"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="totalCount"
            label="总单数"
            width="200"
            sortable
            >
          </el-table-column>

        </el-table>


        <!--<el-table ref="multipleTable" @row-dblclick="getDbClick" :data="usersArr" border @row-click="clickDetails" @selection-change="getSelection" height="100%" tooltip-effect="dark" :key="tablekey" style="width:100%;" :default-sort="{prop: 'id', order: 'ascending'}" stripe>-->
          <!--<el-table-column fixed sortable type="selection" width="50"></el-table-column>-->
          <!--<template v-for="column in tableColumn">-->
            <!--<el-table-column :key="column.id" :fixed="column.fixed" sortable :label="column.label" :prop="column.prop" v-if="!column.slot" :width="column.width"></el-table-column>-->
            <!--<el-table-column :key="column.id" :fixed="column.fixed" sortable :label="column.label" v-else :width="column.width">-->
              <!--<template slot-scope="scope">-->
                <!--<span class="clickitem" v-if="column.click" v-html="column.slot(scope)" @click.stop="column.click(scope)"></span>-->
                <!--<span v-else v-html="column.slot(scope)"></span>-->
              <!--</template>-->
            <!--</el-table-column>-->
          <!--</template>-->
        <!--</el-table>-->
        <!---->




      </div>
      <div class="info_tab_footer">共计:{{ total }} <div class="show_pager"> <Pager :total="total" @change="handlePageChange" /></div> </div>
    </div>

    <TableSetup :popVisible="setupTableVisible" @close="closeSetupTable" @success="setColumn" :columns="tableColumn"  />
  </div>
</template>
<script>
import {  getExportExcel } from '@/api/company/customerManage'
import {postCarrierCarrierList} from '@/api/finance/fin_carrier'
import SearchForm from './components/search'
import TableSetup from '@/components/tableSetup'
import { mapGetters } from 'vuex'
import Pager from '@/components/Pagination/index'
export default {
  components: {
    SearchForm,
    Pager,
    TableSetup
  },
  computed: {
      ...mapGetters([
          'otherinfo'
      ]),
      orgid () {
      }
  },
  mounted () {
    this.searchQuery.vo.orgid = this.otherinfo.orgid
  },
  data () {
    return {
      btnsize: 'mini',
      usersArr: [],
      total: 0,
      trackId:'',
      //加载状态
      loading: true,
      setupTableVisible: false,
      AddCustomerVisible: false,
      isModify: false,
      isDbclick: false,
      selectInfo: {},
      // 选中的行
      selected: [],
      searchQuery: {
        "currentPage": 1,
        "pageSize": 100,
        "vo": {
          "orgid":'',
          carrierId: '',//
          startTime: '',//
          endTime:''
        }
      }
    }
  },
  methods: {
    fetchAllCustomer () {
      this.loading = true
      return postCarrierCarrierList(this.searchQuery).then(data => {
        this.usersArr = data.list
        this.total = data.total
        this.loading = false
      })
    },
    fetchData () {
      this.fetchAllCustomer()
    },
    handlePageChange (obj) {
      this.searchQuery.currentPage = obj.pageNum
      this.searchQuery.pageSize = obj.pageSize
    },
    getSearchParam (obj) {
      this.searchQuery.vo = Object.assign(this.searchQuery.vo, obj)

      this.fetchData()
    },
    showImport () {
      // 显示导入窗口
    },
    doAction (type) {
      if(type==='import'){
        this.showImport()
        return false
      }
      // 判断是否有选中项

      if(!this.selected.length){

          this.$message({
              message: '请选择要操作的项~',
              type: 'warning'
          })
          return false
      }

      switch (type) {
        // 明细
          case 'storage':

            this.$router.push({
              path: '/finance/reconciliation/carrier/detailTable',
              query: {
                tab: '承运商对账-对账明细',
                id: this.selected[0].carrierId
              }
            })

            break;

              break;
          // 导出数据
          case 'export':
              let ids2 = this.selected.map(el => {
                return el.customerId
              })
              getExportExcel(ids2.join(',')).then(res => {
                this.$message({
                    type: 'success',
                    message: '即将自动下载!'
                })
              })
              break;
      }
      // 清除选中状态，避免影响下个操作
      this.$refs.multipleTable.clearSelection()
    },
    setTable () {
      this.setupTableVisible = true
    },
    closeSetupTable () {
      this.setupTableVisible = false
    },
    openAddCustomer () {
      this.AddCustomerVisible = true
    },
    closeAddCustomer () {
      this.AddCustomerVisible = false
    },
    clickDetails(row, event, column){
      this.$refs.multipleTable.toggleRowSelection(row)
    },
    getSelection (selection) {
      this.selected = selection
    },
    getDbClick(row, event){
      this.$router.push({
        path: '/finance/reconciliation/carrier/detailTable',
        query: {
          tab: '承运商对账-对账明细',
          id: row.carrierId
        }
      })
    }
  }
}
</script>
