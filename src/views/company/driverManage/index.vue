<template>
  <div class="driver-manager miniHeaderSearch" v-loading="loading">
    <SearchForm :orgid="otherinfo.orgid" :issender="true" @change="getSearchParam" :btnsize="btnsize" />  
    <div class="tab_info">
      <div class="btns_box">
          <el-button type="primary" :size="btnsize" icon="el-icon-circle-plus" plain @click="doAction('add')" v-has:DRIVER_ADD>新增</el-button>
          <el-button type="primary" :size="btnsize" icon="el-icon-edit" @click="doAction('modify')" plain v-has:DRIVER_UPDATE>修改</el-button>
          <el-button type="danger" :size="btnsize" icon="el-icon-delete" @click="doAction('delete')" plain v-has:DRIVER_DEL>删除</el-button>
          <el-button type="primary" :size="btnsize" icon="el-icon-edit-outline" @click="doAction('export')" plain v-has:DRIVER_EXP>导出</el-button>
          <el-button type="primary" :size="btnsize" icon="el-icon-edit-outline" @click="doAction('import')" plain v-has:DRIVER_EOP>批量导入</el-button>
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
            <el-table-column :key="column.id" :fixed="column.fixed" sortable :label="column.label" :prop="column.prop" v-else-if="!column.slot" :width="column.width">
               <template slot="header" slot-scope="scope">
                <tableHeaderSearch :scope="scope" :query="searchQuery" @change="changeKey" />
              </template>
               <template slot-scope="scope">{{scope.row[column.prop]}}</template>
            </el-table-column>
            
            <el-table-column :key="column.id" :fixed="column.fixed" sortable :label="column.label" :prop="column.prop" v-else :width="column.width || ''">
               <template slot="header" slot-scope="scope">
                <tableHeaderSearch :scope="scope" :query="searchQuery" @change="changeKey" />
              </template>
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
    <AddCustomer :licenseTypes="licenseTypes" :issender="true" :isModify="isModify" :info="selectInfo" :orgid="orgid" :popVisible.sync="AddCustomerVisible" @close="closeAddCustomer" @success="fetchData"  />
    <TableSetup :issender="true" :popVisible="setupTableVisible" @close="closeSetupTable" :columns="tableColumn" @success="setColumn"  />
    <ImportDialog :popVisible="importDialogVisible" @close="importDialogVisible = false" @success="fetchData" :info="'driver'"></ImportDialog>
  </div>
</template>
<script>
import { getAllDriver, deleteSomeDriverInfo, getExportExcel, getDriverLiceseType } from '@/api/company/driverManage'
import SearchForm from './components/search'
import TableSetup from '@/components/tableSetup'
import AddCustomer from './components/add'
import { mapGetters } from 'vuex'
import Pager from '@/components/Pagination/index'
import ImportDialog from '@/components/importDialog'
import { objectMerge2, parseTime } from '@/utils/'
import { PrintInFullPage, SaveAsFile } from '@/utils/lodopFuncs'
import tableHeaderSearch from '@/components/tableHeaderSearch'

export default {
  name: 'driverManage',
  components: {
    SearchForm,
    Pager,
    TableSetup,
    AddCustomer,
    ImportDialog,
    tableHeaderSearch
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
    Promise.all([this.fetchAllCustomer(this.otherinfo.orgid), getDriverLiceseType(this.otherinfo.orgid)]).then(resArr => {
      this.loading = false
      this.licenseTypes = resArr[1]
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
          driverMobile: '',
          driverName: ''
        }
      },
      licenseTypes: [],
      tablekey: '',
      tableColumn: [{
        label: '序号',
        prop: 'id',
        width: '70',
        fixed: true,
        slot: (scope) => {
          return ((this.searchQuery.currentPage - 1) * this.searchQuery.pageSize) + scope.$index + 1
        }
      }, {
        label: '归属网点',
        prop: 'orgName',
        width: '120',
        fixed: true
      }, {
        label: '司机姓名',
        prop: 'driverName',
        width: '120',
        fixed: false
      }, {
        label: '司机电话',
        prop: 'driverMobile',
        width: '120',
        fixed: false
      }, {
        label: '身份证号码',
        prop: 'driverCardid',
        width: '180',
        fixed: false
      }, {
        label: '驾驶证类型',
        prop: 'licenseTypeName',
        width: '120',
        fixed: false
      }, {
        label: '驾驶证有效期',
        prop: 'validityDate',
        width: '300',
        fixed: false,
        slot: (scope) => {
          const start = scope.row.validityStartdate ? parseTime(scope.row.validityStartdate, '{y}-{m}-{d} {h}:{i}:{s}') : ''
          const end = scope.row.validityDate ? parseTime(scope.row.validityDate, '{y}-{m}-{d} {h}:{i}:{s}') : ''
          const data = start + ' - ' + end
          return data
        }
      }, {
        label: '银行卡号',
        prop: 'bankCardNumber',
        width: '180',
        fixed: false
      }, {
        label: '银行名称',
        prop: 'bankName',
        width: '120',
        fixed: false
      }, {
        label: '开户行',
        prop: 'openBank',
        width: '120',
        fixed: false
      }, {
        label: '地址',
        prop: 'driverAddress',
        width: '120',
        fixed: false
      }, {
        label: '备注',
        prop: 'driverRemarks',
        fixed: false
      }]
    }
  },
  methods: {
    changeKey(obj) {
      this.searchQuery = obj
      this.fetchAllCustomer()
    },
    getLicenType(id) {
      const info = this.licenseTypes.filter(item => {
        // console.log(item, id)
        return parseInt(item.id, 10) === id
      })
      return info[0] ? info[0].dictName : id
    },
    fetchAllCustomer() {
      this.loading = true
      return getAllDriver(this.searchQuery).then(data => {
        this.usersArr = data.list
        this.total = data.total
        this.loading = false
      }).catch((err) => {
        this.loading = false
        this._handlerCatchMsg(err)
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
      this.searchQuery.currentPage = this.$options.data().searchQuery.currentPage
      this.searchQuery.pageSize = this.$options.data().searchQuery.pageSize
      this.searchQuery.vo.orgid = obj.orgid
      this.searchQuery.vo.driverMobile = obj.mobile
      this.searchQuery.vo.driverName = obj.name
      this.fetchAllCustomer()
    },
    showImport() {
      // 显示导入窗口
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
          var deleteItem = this.selected.length > 1 ? this.selected.length + '名' : this.selected[0].driverName
                  // =>todo 删除多个
          var ids = this.selected.map(item => {
            return item.id
          })
          ids = ids.join(',')

          this.$confirm('确定要删除 ' + deleteItem + ' 司机吗？', '提示', {
            confirmButtonText: '删除',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            deleteSomeDriverInfo(ids).then(res => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.fetchData()
            }).catch(err => {
              this.$message({
                type: 'info',
                message: '删除失败，原因：' + err.errorInfo ? err.errorInfo : err
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
            name: '司机列表-' + parseTime(new Date(), '{y}{m}{d}{h}{i}{s}')
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
      this.tablekey = new Date().getTime() // 刷新表格视图
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
<style lang="scss" scoped>
  .driver-manager{
    height: 100%;
    width: 100%;
    padding: 0 0 40px;
  }
</style>
<style lang="scss">
.driver-manager{
    display: flex;
    flex-direction:column;
    position: relative;

    .tab_info{
        padding:10px 10px;
        height: 100%;
        flex-grow: 1;
        display: flex;
        flex-direction:column;

        .btns_box{
            margin-bottom:10px;
            .el-button{
                margin-right:0;
            }
            .table_setup{
                float: right;
                margin-right: 0;
            }
        }
        .info_tab{
            width: 100%;
            height: calc(100% - 68px);
            flex-grow: 1;
            
            .el-table{
                table{
                    th,td{
                        text-align:center;
                    }
                }
                .unauth{
                    color: #f00;
                }
            }
            .el-table td, .el-table th{
                padding: 5px 0;
            }
        }
    }
    .info_tab_footer{
        padding-left: 20px;
        background: #eee;
        height: 40px;
        line-height: 40px;
        box-shadow: 0 -2px 2px rgba(0,0,0,.1);
        position: relative;
        z-index: 10;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
    }

    .show_pager{
        float: right;
        line-height: 40px;
        height: 40px;
        overflow: hidden;
    }
}
</style>
