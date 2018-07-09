<template>
  <!--v-loading="loading"-->
  <div class="tab-content" >
    <SearchForm :orgid="otherinfo.orgid" :issender="true" @change="getSearchParam" :btnsize="btnsize" />
    <div class="tab_info">
      <div class="btns_box">

          <el-button type="primary" :size="btnsize" icon="el-icon-edit" plain @click="doAction('storage')">新增</el-button>
          <el-button type="primary" :size="btnsize" icon="el-icon-edit" @click="doAction('modify')" plain>修改</el-button>
          <el-button type="primary" :size="btnsize" icon="el-icon-edit" @click="doAction('deselectCar')" plain>停用</el-button>
          <!--<el-button type="primary" :size="btnsize" icon="el-icon-edit" @click="doAction('deleteStor')" plain>取消入库</el-button>-->
          <el-button type="primary" :size="btnsize" icon="el-icon-edit-outline" @click="doAction('export')" plain>导出</el-button>

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
            width="50">
          </el-table-column>
          <el-table-column
            fixed
            sortable
            prop="id"
            label="序号"
            width="160">
          </el-table-column>
          <el-table-column
            fixed
            sortable
            prop="batchNo"
            width="120"
            label="所属网点">
          </el-table-column>
          <el-table-column
            prop="truckIdNumber"
            width="110"
            sortable
            label="收支方式">
          </el-table-column>
          <el-table-column
            prop="orgName"
            sortable
            width="140"
            label="银行名称">
          </el-table-column>
          <el-table-column
            prop="endOrgName"
            sortable
            width="180"
            label="银行卡号">
          </el-table-column>
          <el-table-column
            sortable
            prop="bathStatusName"
            width="110"
            label="批次状态">
          </el-table-column>

          <el-table-column
            sortable
            prop="dirverName"
            width="130"
            label="开户人">
          </el-table-column>
          <el-table-column
            prop="dirverMobile"
            label="支付宝账号"
            width="150"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="actualAmount"
            label="微信号"
            width="150"
            sortable
            >
          </el-table-column>

          <el-table-column
            prop="truckLoad"
            label="状态"
            width="110"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="truckVolume"
            label="创建人"
            width="110"
            sortable
          >
          </el-table-column>

          <el-table-column
            label="创建时间"
            width="160"
            sortable
          >
            <template slot-scope="scope">
              {{ scope.row.requireArrivedTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}
            </template>
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
import {  getExportExcel } from '@/api/company/customerManage'
import { postArtList ,postCancelLoad ,postCancelPut } from '@/api/operation/arteryDelivery'
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
        //要不你先去健身，差不多
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
      batchTypeId:'',//批次状态
      //加载状态
      // loading: true,
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
          dirverName: '',
          truckIdNumber:'',//车牌号
          batchTypeId: '',//批次状态
          batchNo:'',//发车批次
          loadTypeId:39,//配载类型
          endTime:'',//结束时间
          beginTime:'',//
          arrivedbeginDate:'',//到达时间(起始时间)
          arrivedEndDate:''//到达时间(结束时间)
        }
      }
    }
  },
  methods: {
    fetchAllCustomer () {
      this.loading = true
      return postArtList(this.searchQuery).then(data => {
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
      // if(!this.selected.length|| type !== "storage"){
      //     this.closeAddCustomer()
      //     this.$message({
      //         message: '请选择要操作的项~',
      //         type: 'warning'
      //     })
      //     return false
      // }

      switch (type) {
          // ruku
          case 'storage':
            // if(this.selected.length > 1){
            //   this.$message({
            //     message: '只能选择一条数据进行跟踪设置~',
            //     type: 'warning'
            //   })
            //   return false
            //
            // }else if(this.selected.length === 1){
            //
              this.selectInfo = this.selected[0]
              this.isModify = false
              this.openAddCustomer()
            // }
              break;
          case 'modify':
              this.selectInfo = this.selected[0]
              this.isModify = true
              this.openAddCustomer()
            break;
        // sure 到车确定   deselectCar取消到车  deleteStor取消入库

          // deselectCar取消到车
          case 'deselectCar':
                  let deleteItem = this.selected.length > 1 ? this.selected.length + '名' : this.selected[0].truckIdNumber
                  //=>todo 删除多个
                  let ids = this.selected.map(item => {
                      return item.id
                  })
                  ids = ids.join(',')
                if(this.selected[0].bathStatusName === '已到车'){
                  this.$confirm('确定要取消车牌号 ' + deleteItem + ' 到车吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                  }).then(() => {
                    postCancelLoad(ids,39).then(res => {
                      this.$message({
                        type: 'success',
                        message: '取消到车成功~'
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
                }else{
                  let bathStatusName = this.selected[0].bathStatusName
                  this.$message({
                    message: '批次状态为：' + bathStatusName + '不允许取消到车~',
                    type: 'warning'
                  })
                  return false
                }

              break;
          // 取消入库
          case 'deleteStor':
            let deleteItemName = this.selected.length > 1 ? this.selected.length + '名' : this.selected[0].truckIdNumber
            //=>todo 删除多个
            let _ids = this.selected.map(item => {
              return item.id
            })
            _ids = _ids.join(',')

            if(this.selected[0].bathStatusName === '已入库'){
              this.$confirm('确定要取消车牌号 ' + deleteItemName + ' 入库吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                postCancelPut(_ids,39).then(res => {
                  this.$message({
                    type: 'success',
                    message: '到货入库成功~'
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
            }else{
              let bathStatusName = this.selected[0].bathStatusName
              this.$message({
                message: '批次状态为：' + bathStatusName + '不允许取消入库~',
                type: 'warning'
              })
              return false
            }
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
      this.selectInfo = row
      this.isModify = false
      this.openAddCustomer()
    }
  }
}
</script>
