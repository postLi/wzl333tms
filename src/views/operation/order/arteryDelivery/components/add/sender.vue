<template>
  <div class="tab-content" v-loading="loading">
    <div class="info_form">
      <!--<el-form-item label="网点">-->
        <!--<SelectTree v-model="otherinfo.orgid" />-->
      <!--</el-form-item>-->
      <el-form :inline="true" :size="btnsize" label-position="right" label-width="80px" class="sta_searchinfo clearfix">
        <el-form-item label="到达网点:" >
          <el-input
            maxlength="15"
            clearable>
          </el-input>
        </el-form-item>
        <el-form-item label="车牌号码:">
          <el-input
            maxlength="15"
            clearable>
          </el-input>
        </el-form-item>
        <el-form-item label="司机姓名:" >
          <el-input
            maxlength="15"
            clearable>
          </el-input>
        </el-form-item>
        <el-form-item label="司机电话:">
          <el-input
            maxlength="15"
            clearable>
          </el-input>
        </el-form-item>
        <el-form-item label="可载体积:" >
          <el-input
            maxlength="15"
            clearable>
          </el-input>
        </el-form-item>
        <el-form-item label="可载重量:" >
          <el-input
            maxlength="15"
            clearable>
          </el-input>
        </el-form-item>
        <el-form-item label="分摊方式:">
          <el-input
            maxlength="15"
            clearable>
          </el-input>
        </el-form-item>
        <el-form-item label="配载日期:">
          <el-input
            maxlength="15"
            clearable>
          </el-input>
        </el-form-item>
        <el-form-item label="要求到达日期:" class="art_arriveTime">
          <el-input
            maxlength="15"
            clearable>
          </el-input>
        </el-form-item>
        <el-form-item label="备注:" class="art_remk">
          <el-input
            clearable
            maxlength="300"
            auto-complete="off"
            type="textarea"
          >
          </el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="info_table">
      <table border="1">
        <tr>
          <th>现付运费</th>
          <th>现付油卡</th>
          <th>回付运费</th>
          <th>回付油卡</th>
          <th>到付运费</th>
          <th>到付油卡</th>
          <th>整车保险费</th>
          <th>发站装卸费</th>
          <th>发站其他费</th>
          <th>到站装卸费</th>
          <th>到站其他费</th>
        </tr>
        <td>1</td>
        <td>2</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </table>
    </div>
    <!--<SearchForm :orgid="otherinfo.orgid" :issender="true" @change="getSearchParam" :btnsize="btnsize" />-->
    <div class="tab_info">
      <div class="btns_box">
          <el-button type="primary" :size="btnsize" icon="el-icon-circle-plus" plain @click="doAction('add')">到车确定</el-button>
          <!--<el-button type="primary" :size="btnsize" icon="el-icon-edit" @click="doAction('modify')" plain>修改</el-button>-->
          <!--<el-button type="danger" :size="btnsize" icon="el-icon-delete" @click="doAction('delete')" plain>删除</el-button>-->
          <el-button type="primary" :size="btnsize" icon="el-icon-edit-outline" @click="doAction('export')" plain class="table_export">导出</el-button>
          <el-button type="primary" :size="btnsize" icon="el-icon-edit-outline" @click="doAction('import')" plain class="table_import">批量导入</el-button>
          <el-button type="primary" :size="btnsize" icon="el-icon-setting" plain @click="setTable" class="table_setup">表格设置</el-button>
      </div>
      <div class="info_tab">
        <el-table
          ref="multipleTable"
          :data="usersArr"
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
          <el-table-column
            fixed
            sortable
            prop="customerId"
            label="序号"
            width="80">
          </el-table-column>
          <el-table-column
            fixed
            sortable
            prop="companyName"
            width="120"
            label="开单网点">
          </el-table-column>
          <el-table-column
            prop="customerUnit"
            width="120"
            sortable
            label="运单号">
          </el-table-column>
          <el-table-column
            prop="customerName"
            sortable
            width="120"
            label="子运单号">
          </el-table-column>
          <el-table-column
            prop="customerMobile"
            sortable
            width="120"
            label="实到件数">
          </el-table-column>
          <el-table-column
            sortable
            prop="orgName"
            width="120"
            label="实到重量">
          </el-table-column>
          <el-table-column
            label="实到体积"
            width="120"
            prop="legalPersonname"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="vipNum"
            label="配载件数"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            sortable
            prop="idcard"
            width="110"
            label="配载重量">
          </el-table-column>
          <el-table-column
            prop="bankName"
            label="配载体积"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="bankCardNumber"
            label="出发城市"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="openBank"
            label="到达城市"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="detailedAddress"
            label="发货人"
            width="100"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="detailedAddress"
            label="收货人电话"
            width="100"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="detailedAddress"
            label="货品名"
            width="100"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="detailedAddress"
            label="货号"
            width="100"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="detailedAddress"
            label="运单备注"
            width="100"
            sortable
          >
          </el-table-column>
        </el-table>
      </div>
    </div>
    <AddCustomer :issender="true" :isModify="isModify" :info="selectInfo" :orgid="orgid" :popVisible.sync="AddCustomerVisible" @close="closeAddCustomer" @success="fetchData"  />
    <TableSetup :issender="true" :popVisible="setupTableVisible" @close="closeSetupTable" @success="fetchData"  />
  </div>
</template>
<script>
import { getAllCustomer, deleteSomeCustomerInfo, getExportExcel } from '@/api/company/customerManage'
import SearchForm from './components/search'
import TableSetup from './components/tableSetup'
import AddCustomer from './components/add'
import { mapGetters } from 'vuex'
import SelectTree from '@/components/selectTree/index'
export default {
  props: {
    info: {
      type: Object,
      default: () => {}
    },
    // btnsize: {
    //   type: String,
    //   default: 'mini'
    // }
  },
  components: {
    SearchForm,
    TableSetup,
    AddCustomer,
    SelectTree
  },
  watch:{
    info(){
      console.log(this.info)
    }
  },
  computed: {
      ...mapGetters([
          'otherinfo'
      ]),
      orgid () {
        // console.log(this.selectInfo.orgid , this.searchQuery.vo.orgid , this.otherinfo.orgid)

        return this.isModify ? this.selectInfo.orgid : this.searchQuery.vo.orgid || this.otherinfo.orgid
      }
  },
  mounted () {
    this.searchQuery.vo.orgid = this.otherinfo.orgid
    this.fetchAllCustomer(this.otherinfo.orgid).then(res => {
      this.loading = false
    })
  },
  data () {
    return {
      btnsize: 'mini',
      usersArr: [],
      //加载状态
      loading: true,
      setupTableVisible: false,
      AddCustomerVisible: false,
      isModify: false,
      selectInfo: {},
      // 选中的行
      selected: [],
      searchQuery: {
        "currentPage": 1,
        "pageSize": 100,
        "vo": {
          "orgid": 1,
          customerType: 1,
          customerMobile: '',
          customerName: ''
        }
      }
    }
  },
  methods: {
    fetchAllCustomer () {
      this.loading = true
      return getAllCustomer(this.searchQuery).then(data => {
        this.usersArr = data.list
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
      this.searchQuery.vo.orgid = obj.orgid
      this.searchQuery.vo.customerMobile = obj.mobile
      this.searchQuery.vo.customerName = obj.name
      this.fetchAllCustomer()
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
      if(!this.selected.length && type !== 'add'){
          this.closeAddCustomer()
          this.$message({
              message: '请选择要操作的项~',
              type: 'warning'
          })
          return false
      }

      console.log("this.selected:", this.selected)


      switch (type) {
          // 添加客户
          case 'add':
              this.isModify = false
              this.selectInfo = {}
              this.openAddCustomer()
              break;
          // 修改客户信息
          case 'modify':
              this.isModify = true
              if(this.selected.length > 1){
                  this.$message({
                      message: '每次只能修改单条数据~',
                      type: 'warning'
                  })
              }
              this.selectInfo = this.selected[0]
              this.openAddCustomer()
              break;
          // 删除客户
          case 'delete':
                  let deleteItem = this.selected.length > 1 ? this.selected.length + '名' : this.selected[0].customerName
                  //=>todo 删除多个
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
                      }).catch(err=>{
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
  }
}
</script>
<style lang="scss">
.tab-content{
    height: calc(100% - 33px);
    display: flex;
    flex-direction:column;
    position: relative;

    .tab_info{
        /*padding:10px 30px 40px;*/
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
          .table_export{
            margin-left: 440px;
          }
          /*.table_ixport{*/
            /*margin-left: 400px;*/
          /*}*/
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
  .info_form{
    padding-bottom: 10px;
    border-bottom: 1px solid #dcdfe6;
    .sta_searchinfo{
      .el-form-item--mini.el-form-item{
        margin-right: 0;
        margin-bottom: 15px;
      }
      .art_arriveTime{
        .el-form-item__label{
          width: 104px !important;
        }
      }
      .art_remk{
        .el-form-item__content{
          width: 750px !important;
        }

      }
    }

  }
  .info_table{
    margin: 10px 0 0 10px;
    border-color: #dcdfe6;
      th,td,tr{
        padding: 8px;
        font-size: 14px;
        color: #606266;
        font-weight: normal;
        border-color: #dcdfe6;
      }
  }

}
</style>
