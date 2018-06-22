<template>
  <!--v-loading="loading"-->
  <div class="tab-content" >
    <SearchForm :orgid="otherinfo.orgid" :issender="true" @change="getSearchParam" :btnsize="btnsize" />
    <div class="tab_info">
      <div class="btns_box">
          <el-button type="primary" :size="btnsize" icon="el-icon-circle-plus" plain @click="doAction('add')">新增送货</el-button>

        <el-button type="primary" :size="btnsize" icon="el-icon-edit" plain @click="doAction('sure')">修改</el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-edit" @click="doAction('deselectCar')" plain>取消发货</el-button>
          <el-button type="primary" :size="btnsize" icon="el-icon-edit" @click="doAction('deleteStor')" plain>取消装货</el-button>
          <el-button type="primary" :size="btnsize" icon="el-icon-edit-outline" @click="doAction('export')" plain>导出</el-button>
          <el-button type="primary" :size="btnsize" icon="el-icon-edit-outline" @click="doAction('import')" plain>打印</el-button>
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
            prop="id"
            label="序号"
            width="80">
          </el-table-column>
          <el-table-column
            fixed
            sortable
            prop="batchTypeId"
            width="120"
            label="送货批次">
          </el-table-column>
          <el-table-column
            fixed
            sortable
            prop="batchTypeId"
            width="120"
            label="批次状态">
          </el-table-column>
          <el-table-column
            label="送货时间"
            width="160"
            sortable
          >
            <template slot-scope="scope">
              {{ scope.row.departureTime | parseTime('{y}-{m}-{d} {h}:{m}:{s}') }}
            </template>
          </el-table-column>
          <el-table-column
            label="完成时间"
            width="160"
            sortable
          >
            <template slot-scope="scope">
              {{ scope.row.departureTime | parseTime('{y}-{m}-{d} {h}:{m}:{s}') }}
            </template>
          </el-table-column>
          <el-table-column
            prop="truckIdNumber"
            width="110"
            sortable
            label="车牌号">
          </el-table-column>
          <el-table-column
            sortable
            prop="dirverName"
            width="110"
            label="司机名称">
          </el-table-column>
          <el-table-column
            prop="dirverMobile"
            label="司机电话"
            width="110"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="amountall"
            label="送货件数"
            width="120"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="weightall"
            label="送货重量"
            width="120"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="volumeall"
            label="送货体积"
            width="120"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="weightRate"
            label="重量装载率"
            width="120"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="volumeRate"
            label="体积装载率"
            width="120"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="remark"
            label="备注"
            width="150"
            sortable
          >
          </el-table-column>
        </el-table>
      </div>
      <div class="info_tab_footer">共计:{{ total }} <div class="show_pager"> <Pager :total="total" @change="handlePageChange" /></div> </div>
    </div>
    <AddCustomer :issender="true" :isModify="isModify" :info="selectInfo" :orgid="orgid" :id='trackId' :popVisible.sync="AddCustomerVisible" @close="closeAddCustomer" @success="fetchData"  />
    <TableSetup :issender="true" :popVisible="setupTableVisible" @close="closeSetupTable" @success="fetchData"  />
  </div>
</template>
<script>
import { getAllCustomer, deleteSomeCustomerInfo, getExportExcel } from '@/api/company/customerManage'
import { postArtList ,postCancelLoad ,postCancelPut } from '@/api/operation/arteryDelivery'
import { postSelectLoadMainInfoList } from '@/api/operation/arteryDepart'
import SearchForm from './components/search'
import TableSetup from './components/tableSetup'
import AddCustomer from './components/storages'
import { mapGetters } from 'vuex'
import Pager from '@/components/Pagination/index'

export default {
  components: {
    SearchForm,
    Pager,
    TableSetup,
    AddCustomer
  },
  computed: {
      ...mapGetters([
          'otherinfo'
      ]),
      orgid () {
        // console.log(this.selectInfo.orgid , this.searchQuery.vo.orgid , this.otherinfo.orgid)
        // return this.isModify ? this.selectInfo.arriveOrgid : this.searchQuery.vo.arriveOrgid || this.otherinfo.orgid
      }
  },
  mounted () {
    this.searchQuery.vo.arriveOrgid = this.otherinfo.orgid
    this.fetchAllCustomer()
    // Promise.all(this.fetchAllCustomer(this.otherinfo.orgid)).then(res => {
    //   console.log(res)
    //   this.loading = false
    // })
  },
  data () {
    return {
      loading: false,
      btnsize: 'mini',
      usersArr: [],
      total: 0,
      trackId:'',
      //加载状态
      // loading: true,
      setupTableVisible: false,
      AddCustomerVisible: false,
      isModify: false,
      selectInfo: {},
      // 选中的行
      selected: [],
      searchQuery: {
        // "currentPage": 1,
        "pageNum": 1,
        "pageSize": 100,
        "vo": {
          "orgId": 1,
          dirverName: '',
          truckIdNumber:'',//车牌号
          batchTypeId: '',//批次状态
          batchNo:'',//发车批次
          loadTypeId:40,//配载类型 38
          loadEndTime:'',//结束时间
          loadStartTime:'',
          departureStartTime:'',
          departureEndTime:'',
          arriveOrgid:1,
        }
      }
    }
  },
  methods: {
    fetchAllCustomer () {
      this.loading = true
      console.log(this.searchQuery)
      return postSelectLoadMainInfoList(this.searchQuery).then(data => {
        this.usersArr = data.list
        this.total = data.total
        this.loading = false
      })
    },
    fetchData () {
      this.fetchAllCustomer()
    },
    handlePageChange (obj) {
      Object.assign(this.searchQuery, obj)
      this.fetchData()
      // this.searchQuery.currentPage = obj.pageNum
      // this.searchQuery.pageSize = obj.pageSize
    },
    getSearchParam (obj) {
      this.searchQuery.vo = Object.assign(this.searchQuery.vo, obj)
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

      switch (type) {
        case 'add':
        this.$router.push({path: '././load', query:{loadTypeId: 40}}) // 38-短驳 39-干线 40-送货
        break
          // 添加客户
          case 'storage':
            if(this.selected.length > 1){
              this.$message({
                message: '只能选择一条数据进行跟踪设置~',
                type: 'warning'
              })
              return false

            }else if(this.selected.length === 1){

              this.selectInfo = this.selected[0]
              this.isModify = false
              this.openAddCustomer()
            }

              break;
          //到车确定
          case 'sure':

              if(this.selected.length > 1){
                  this.$message({
                      message: '每次只能修改单条数据~',
                      type: 'warning'
                  })
                return false
              }else if(this.selected.length === 1){

                this.selectInfo = this.selected[0]
                this.isModify = true
                this.openAddCustomer()
              }
              break;
        // sure 到车确定   deselectCar取消到车  deleteStor取消入库

          // 删除客户
          case 'deselectCar':
                  let deleteItem = this.selected.length > 1 ? this.selected.length + '名' : this.selected[0].truckIdNumber
                  //=>todo 删除多个
                  let ids = this.selected.map(item => {
                      return item.id
                  })
                  ids = ids.join(',')

                  this.$confirm('确定要取消车牌号 ' + deleteItem + ' 到车吗？', '提示', {
                      confirmButtonText: '确定',
                      cancelButtonText: '取消',
                      type: 'warning'
                  }).then(() => {
                    postCancelLoad(ids,40).then(res => {
                          this.$message({
                              type: 'success',
                              message: '取消成功!'
                          })
                          this.fetchData()
                      }).catch(err=>{
                          this.$message({
                              type: 'info',
                              message: '取消失败，原因：' + err.errorInfo ? err.errorInfo : err
                          })
                      })

                  }).catch(() => {
                      this.$message({
                          type: 'info',
                          message: '已取消'
                      })
                  })
              break;
          // 取消入库
          case 'deleteStor':
            let deleteItemName = this.selected.length > 1 ? this.selected.length + '名' : this.selected[0].truckIdNumber
            //=>todo 删除多个
            let _ids = this.selected.map(item => {
              return item.id
            })
            _ids = _ids.join(',')

            this.$confirm('确定要取消车牌号 ' + deleteItemName + ' 入库吗？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              postCancelPut(_ids,40).then(res => {
                this.$message({
                  type: 'success',
                  message: '取消成功!'
                })
                this.fetchData()
              }).catch(err=>{
                this.$message({
                  type: 'info',
                  message: '取消失败，原因：' + err.errorInfo ? err.errorInfo : err
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
        padding:10px 30px 40px;
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
