<template>
  <div class="tab-content" v-loading="loading">
    <SearchForm :orgid="otherinfo.orgid" :issender="true" @change="getSearchParam" :btnsize="btnsize" />
    <div class="tab_info">
      <div class="btns_box">
          <el-button type="primary" :size="btnsize" icon="el-icon-circle-plus" plain @click="doAction('add')">新建</el-button>
          <el-button type="primary" :size="btnsize" icon="el-icon-edit" @click="doAction('modify')" plain>受理</el-button>
          <el-button type="primary" :size="btnsize" icon="el-icon-edit" @click="doAction('modify')" plain>拒绝</el-button>
          <el-button type="primary" :size="btnsize" icon="el-icon-edit" @click="doAction('modify')" plain>修改</el-button>
          <el-button type="primary" :size="btnsize" icon="el-icon-edit" @click="doAction('modify')" plain>作废</el-button>
          <el-button type="danger" :size="btnsize" icon="el-icon-delete" @click="doAction('delete')" plain>删除</el-button>
          <el-button type="primary" :size="btnsize" icon="el-icon-edit-outline" @click="doAction('export')" plain>导出</el-button>
          <!--<el-button type="primary" :size="btnsize" icon="el-icon-edit-outline" @click="doAction('import')" plain>批量导入</el-button>-->
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
            prop="orderSn"
            width="90"
            label="订单号">
          </el-table-column>
          <el-table-column
            prop='orderStatus ==="1" ? "已受理" :"未受理"'
            width="110"
            sortable
            label="订单状态">
            <!--订单状态 0:未受理 1:已受理-->
            <!--orderStatus-->
            <!--<el-input :value='form.orgType ==="1" ? "营业网点" : "分拨中心"' disabled></el-input>-->
          </el-table-column>
          <el-table-column
            prop="shipSn"
            sortable
            width="120"
            label="关联运单号">
          </el-table-column>
          <el-table-column
            prop="orderType"
            sortable
            width="110"
            label="订单类型">
          </el-table-column>
          <el-table-column
            sortable
            prop="orderEffective"
            width="100"
            label="紧急度">
          </el-table-column>
          <el-table-column
            label="提货方式"
            width="110"
            prop="orderPickupMethod"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="cargoName"
            label="货品名"
            width="90"
            sortable
            >
          </el-table-column>
          <el-table-column
            sortable
            prop="cargoAmount"
            width="80"
            label="件数">
          </el-table-column>
          <el-table-column
            prop="cargoWeight"
            label="重量"
            width="90"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="cargoVolume"
            label="体积"
            width="80"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="cargoPack"
            label="包装"
            width="80"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="description"
            label="品种规格"
            width="110"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="deliveryFee"
            label="运费"
            width="80"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="orderPayWay"
            label="付款方式"
            width="110"
            sortable
          >
          </el-table-column>
          <!--创建时间-->
          <el-table-column
            prop="detailedAddress"
            label="创建时间"
            width="110"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="orderSenderId"
            label="发货人"
            width="90"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="senderMobile"
            label="发货人电话"
            width="130"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="orderReceiverId"
            label="收货人"
            width="90"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="receiverMobile"
            label="收货人电话"
            width="130"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="refuseReason"
            label="拒绝原因"
            width="120"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="orderRemarks"
            label="备注"
            width="80"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="orderFromCityCode"
            label="出发城市"
            width="110"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="orderToCityCode"
            label="目的城市"
            width="110"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="orderFromOrgid"
            label="开单网点"
            width="110"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="orderToOrgid"
            label="目的网点"
            width="110"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="productPrice"
            label="声明价值"
            width="110"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="agencyFund"
            label="代收款"
            width="90"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="commissionFee"
            label="代收款手续费"
            width="130"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="cargoAmount"
            label="件数单价"
            width="110"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="weightFee"
            label="重量单价"
            width="110"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="volumeFee"
            label="体积单价"
            width="110"
            sortable
          >
          </el-table-column>
          <!--<el-table-column-->
            <!--label="品种规格"-->
            <!--width="120"-->
            <!--sortable-->
            <!--&gt;-->
            <!--<template slot-scope="scope">-->
                <!--<span v-showPicture :imgurl="scope.row.idCardPositive">预览</span>-->
            <!--</template>-->
          <!--</el-table-column>-->
        </el-table>
      </div>
      <div class="info_tab_footer">共计:{{ total }} <div class="show_pager"> <Pager :total="total" @change="handlePageChange" /></div> </div>
    </div>
    <AddCustomer :issender="true" :isModify="isModify" :info="selectInfo" :orgid="orgid" :popVisible.sync="AddCustomerVisible" @close="closeAddCustomer" @success="fetchData"  />
    <TableSetup :issender="true" :popVisible="setupTableVisible" @close="closeSetupTable" @success="fetchData"  />
  </div>
</template>
<script>
import { getAllCustomer, deleteSomeCustomerInfo, getExportExcel } from '@/api/company/customerManage'
import { getPostlist } from '../../../../api/operation/manage'
import SearchForm from './components/search'
import TableSetup from './components/tableSetup'
import AddCustomer from './components/add'
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
        console.log(this.selectInfo.orgid , this.searchQuery.vo.orgid , this.otherinfo.orgid)
        return this.isModify ? this.selectInfo.orgid : this.searchQuery.vo.orgid || this.otherinfo.orgid
      }
  },
  mounted () {
    this.searchQuery.vo.orgid = this.otherinfo.orgid
    // this.fetchAllList(this.otherinfo.orgid).then(res => {
    //   this.loading = false
    // })
    // this.fetchAllList(this.otherinfo.orgid)
  },
  data () {
    return {
      btnsize: 'mini',
      usersArr: [],
      total: 0,
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
      },
      searchForms: {
        "currentPage": 1,
        "pageSize": 100,
        "vo": {
          "orgid": 1,
          orderStatus: '',
          orderSn: '',
          createTime: '',
          endTime: ''
        }
      }
    }
  },
  methods: {
    fetchAllList() {
      this.loading = true
      return getPostlist(this.searchForms).then(data => {
        this.usersArr = data.list
        this.total = data.totalCount
        this.loading = false
      })
    },
    fetchAllCustomer () {
      this.loading = true
      return getAllCustomer(this.searchQuery).then(data => {
        // this.usersArr = data.list
        this.total = data.totalCount

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
      // console.log("getSearchParam：", obj)

      this.searchForms.vo = Object.assign(this.searchForms.vo, obj)
      this.fetchAllList()
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
