<template>
  <div class="tab-content" v-loading="loading">
    <SearchForm :orgid="otherinfo.orgid" :issender="true" @change="getSearchParam" :btnsize="btnsize" />
    <div class="tab_info">
      <div class="btns_box">
          <el-button type="primary" :size="btnsize" icon="el-icon-circle-plus" plain @click="doAction('add')" v-has:SENDER_ADD>新增</el-button>
          <el-button type="primary" :size="btnsize" icon="el-icon-edit" @click="doAction('modify')" plain v-has:SENDER_UP>修改</el-button>
          <el-button type="danger" :size="btnsize" icon="el-icon-delete" @click="doAction('delete')" plain v-has:SENDER_DEL>删除</el-button>
          <el-button type="primary" :size="btnsize" icon="el-icon-edit-outline" @click="doAction('export')" plain v-has:SENDER_EXP>导出</el-button>
          <el-button type="primary" :size="btnsize" icon="el-icon-edit-outline" @click="doAction('import')" plain v-has:SENDER_EOP>批量导入</el-button>
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
          tooltip-effect="dark"
          :default-sort = "{prop: 'id', order: 'ascending'}"
          style="width: 100%">
          <el-table-column
            fixed
            sortable
            type="selection"
            width="50">
          </el-table-column>
          <template v-for="column in tableColumn">
            <el-table-column :key="column.id" :fixed="column.fixed" sortable :label="column.label" :prop="column.prop" v-if="column.ispic" :width="column.width">
              <template slot-scope="scope">
                <span v-if="scope.row[column.prop]" v-showPicture :imgurl="scope.row[column.prop]">预览</span>
              </template>
            </el-table-column>
            <el-table-column :key="column.id" :fixed="column.fixed" sortable :label="column.label" :prop="column.prop" v-else-if="!column.slot" :width="column.width"></el-table-column>
            
            <el-table-column :key="column.id" :fixed="column.fixed" sortable :label="column.label" v-else :width="column.width || ''">
              <template slot-scope="scope">
                <span class="clickitem" v-if="column.click" v-html="column.slot(scope)" @click.stop="column.click(scope)"></span>
                <span v-else v-html="column.slot(scope)"></span>
              </template>
            </el-table-column>
          </template>
        </el-table>
      </div>
      <div class="info_tab_footer">共计:{{ total }} <div class="show_pager"> <Pager :total="total" @change="handlePageChange" /></div> </div>
    </div>
    <AddCustomer :issender="true" :isModify="isModify" :info="selectInfo" :orgid="orgid" :popVisible.sync="AddCustomerVisible" @close="closeAddCustomer" @success="fetchData"  />
    <TableSetup :issender="true" :popVisible="setupTableVisible" @close="closeSetupTable" :columns="tableColumn" @success="setColumn"  />
    <ImportDialog :popVisible="importDialogVisible" @close="importDialogVisible = false" @success="fetchData" :info="'sender'"></ImportDialog>
  </div>
</template>
<script>
import { getAllCustomer, deleteSomeCustomerInfo, getExportExcel } from '@/api/company/customerManage'
import SearchForm from './components/search'
import TableSetup from '@/components/tableSetup'
import AddCustomer from './components/add'
import { mapGetters } from 'vuex'
import Pager from '@/components/Pagination/index'
import ImportDialog from '@/components/importDialog'
import { objectMerge2, parseTime } from '@/utils/'
import { PrintInFullPage, SaveAsFile } from '@/utils/lodopFuncs'

export default {
  components: {
    SearchForm,
    Pager,
    TableSetup,
    AddCustomer,
    ImportDialog
  },
  computed: {
    ...mapGetters([
      'otherinfo'
    ]),
    orgid() {
      console.log(this.selectInfo.orgid, this.searchQuery.vo.orgid, this.otherinfo.orgid)
      return this.isModify ? this.selectInfo.orgid : this.searchQuery.vo.orgid || this.otherinfo.orgid
    }
  },
  mounted() {
    this.searchQuery.vo.orgid = this.otherinfo.orgid
    this.fetchAllCustomer(this.otherinfo.orgid).then(res => {
      this.loading = false
    })
  },
  data() {
    return {
      btnsize: 'mini',
      usersArr: [],
      total: 0,
      // 加载状态
      loading: true,
      importDialogVisible: false,
      setupTableVisible: false,
      AddCustomerVisible: false,
      isModify: false,
      selectInfo: {},
      // 选中的行
      selected: [],
      searchQuery: {
        'currentPage': 1,
        'pageSize': 100,
        'vo': {
          'orgid': 1,
          customerType: 1,
          customerMobile: '',
          customerName: ''
        }
      },
      tablekey: '',
      tableColumn: [{
        label: '序号',
        prop: 'id',
        width: '80',
        fixed: true,
        slot: (scope) => {
          return ((this.searchQuery.currentPage - 1) * this.searchQuery.pageSize) + scope.$index + 1
        }
      }, {
        label: '发货公司',
        prop: 'companyName',
        width: '120',
        fixed: true
      }, {
        label: '发货方',
        prop: 'customerUnit',
        width: '120',
        fixed: false
      }, {
        label: '发货人',
        prop: 'customerName',
        width: '120',
        fixed: false
      }, {
        label: '手机号码',
        prop: 'customerMobile',
        width: '120',
        fixed: false
      }, {
        label: '归属组织',
        prop: 'orgName',
        width: '120',
        fixed: false
      }, {
        label: '公司法人',
        prop: 'legalPersonname',
        width: '120',
        fixed: false
      }, {
        label: 'VIP号',
        prop: 'vipNum',
        width: '180'
      }, {
        label: '身份证号码',
        prop: 'idcard',
        width: 200,
        fixed: false
      }, {
        label: '银行名称',
        prop: 'bankName',
        fixed: false
      }, {
        label: '银行卡号',
        prop: 'bankCardNumber',
        fixed: false
      }, {
        label: '开户行',
        prop: 'openBank',
        fixed: false
      }, {
        label: '详细地址',
        prop: 'detailedAddress',
        fixed: false
      }, {
        label: '身份证图片',
        prop: 'idCardPositive',
        width: '180',
        fixed: false,
        ispic: true
      }]
    }
  },
  methods: {
    fetchAllCustomer() {
      this.loading = true
      return getAllCustomer(this.searchQuery).then(data => {
        this.usersArr = data.list
        this.total = data.total
        this.loading = false
      }).catch((err)=>{
        this.loading = false
        this.$message.error(err.errorInfo || err.text || '未知错误，请重试~')
      })
    },
    fetchData() {
      this.fetchAllCustomer()
    },
    handlePageChange(obj) {
      this.searchQuery.currentPage = obj.pageNum
      this.searchQuery.pageSize = obj.pageSize
      this.fetchAllCustomer()
    },
    getSearchParam(obj) {
      this.searchQuery.vo.orgid = obj.orgid
      this.searchQuery.vo.customerMobile = obj.mobile
      this.searchQuery.vo.customerName = obj.name
      this.fetchAllCustomer()
    },
    doAction(type) {
      // 判断是否有选中项
      if (!this.selected.length && type !== 'add' && type !== 'import' && type !== 'export') {
        this.closeAddCustomer()
        this.$message({
          message: '请选择要操作的项~',
          type: 'warning'
        })
        return false
      }

      console.log('this.selected:', this.selected)

      switch (type) {
          // 添加客户
        case 'add':
          this.isModify = false
          this.selectInfo = {}
          this.openAddCustomer()
          break
          // 修改客户信息
        case 'modify':
          this.isModify = true
          if (this.selected.length > 1) {
            this.$message({
              message: '每次只能修改单条数据~',
              type: 'warning'
            })
          }
          this.selectInfo = this.selected[0]
          this.openAddCustomer()
          break
          // 删除客户
        case 'delete':
          const deleteItem = this.selected.length > 1 ? this.selected.length + '名' : this.selected[0].customerName
                  // =>todo 删除多个
          let ids = this.selected.map(item => {
            return item.customerId
          })
          ids = ids.join(',')

          this.$confirm('确定要删除 ' + deleteItem + ' 客户吗？', '提示', {
            confirmButtonText: '删除',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            deleteSomeCustomerInfo(ids).then(res => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.fetchData()
            }).catch(err => {
              this.$message({
                type: 'info',
                message: '删除失败，原因：' + err.errorInfo ? err.errorInfo : err.text
              })
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
          break
          // 导出数据
        case 'export':
          SaveAsFile({
            data: this.selected.length ? this.selected : this.usersArr,
            columns: this.tableColumn,
            name: '发货人列表-' + parseTime(new Date(), '{y}{m}{d}{h}{i}{s}')
          })
          break
        case 'import':
          this.importDialogVisible = true
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
    setColumn(obj) { // 重绘表格列表
      this.tableColumn = obj
      this.tablekey = Math.random() // 刷新表格视图
    },
    openAddCustomer() {
      this.AddCustomerVisible = true
    },
    closeAddCustomer() {
      this.AddCustomerVisible = false
    },
    clickDetails(row, event, column) {
      this.$refs.multipleTable.toggleRowSelection(row)
    },
    getSelection(selection) {
      this.selected = selection
    }
  }
}
</script>
