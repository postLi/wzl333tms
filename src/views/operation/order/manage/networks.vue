<template>
  <div class="tab-content manage-content miniHeaderSearch" v-loading="loading">
    <SearchForm :orgid="otherinfo.orgid" :issender="true" @change="getSearchParam" :networkFlog="true" :btnsize="btnsize" />
    <div class="tab_info">
      <div class="btns_box">
          <el-button type="success" :size="btnsize" icon="el-icon-success" v-has:ORDERMANAGER_REVER2 @click="doAction('acceptance')" plain>受理</el-button>
          <el-button type="warning" :size="btnsize" icon="el-icon-error" v-has:ORDERMANAGER_CANCEL2 @click="doAction('refuse')" plain>拒绝</el-button>
          <el-button type="primary" :size="btnsize" icon="el-icon-edit" v-has:ORDERMANAGER_EDIT2 @click="doAction('modify')" plain>修改</el-button>
          <el-button type="info" :size="btnsize" icon="el-icon-circle-close-outline" @click="doAction('cancel')" v-has:ORDERMANAGER_NO2 plain>作废</el-button>
          <el-button type="danger" :size="btnsize" icon="el-icon-delete" v-has:ORDERMANAGER_DEL2 @click="doAction('delete')" plain>删除</el-button>
          <el-button type="primary" v-has:ORDERMANAGER_EXP2 :size="btnsize" icon="el-icon-download" @click="doAction('export')" plain>导出</el-button>
          <el-button type="primary" :size="btnsize" icon="el-icon-setting" plain @click="setTable" class="table_setup">表格设置</el-button>
      </div>
      <div class="info_tab">


        <el-table ref="multipleTable" @row-dblclick="getDbClick" :data="usersArr" border @row-click="clickDetails" @selection-change="getSelection" height="100%"
        :summary-method="getSumLeft"
          show-summary
         tooltip-effect="dark" :key="tablekey" style="width:100%;" :default-sort="{prop: 'id', order: 'ascending'}" stripe>
          <el-table-column fixed sortable type="selection" width="70"></el-table-column>
          <template v-for="column in tableColumn">
            <el-table-column :key="column.id" :fixed="column.fixed" sortable :label="column.label" :prop="column.prop" v-if="!column.slot" :width="column.width">
                <template slot="header" slot-scope="scope">
                <tableHeaderSearch
                  :scope="scope"
                  :query="searchForms"
                  @change="changeKey"
                />
              </template>
              <template slot-scope="scope">{{scope.row[column.prop]}}</template>
            </el-table-column>

            <el-table-column :key="column.id" :fixed="column.fixed" sortable :label="column.label"  :prop="column.prop" v-else :width="column.width">
<template slot="header" slot-scope="scope">
                <tableHeaderSearch :scope="scope" :query="searchForms" @change="changeKey"/>
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
    <AddCustomer :key="mykey" :issender="true" :networkFlog="true"  :isModify="isModify" :isDbclick="isDbclick" :info="selectInfo" :orgid="orgid" :popVisible.sync="AddCustomerVisible" @close="closeAddCustomer" @success="fetchData"  />
    <TableSetup :code="code" :popVisible="setupTableVisible" @close="closeSetupTable" @success="setColumn" :columns="tableColumn"  />
  </div>
</template>
<script>
import { getExportExcel } from '@/api/company/customerManage'
import { postNetworkList, putRefuse, deletebatchDelete, putCancel, putAccept } from '../../../../api/operation/manage'
import SearchForm from './components/search'
import TableSetup from '@/components/tableSetup'
import AddCustomer from './components/add'
import { mapGetters } from 'vuex'
import Pager from '@/components/Pagination/index'
import { objectMerge2, getSummaries, operationPropertyCalc } from '@/utils/index'
import { PrintInFullPage, SaveAsFile } from '@/utils/lodopFuncs'
import tableHeaderSearch from '@/components/tableHeaderSearch'
export default {
  components: {
    SearchForm,
    Pager,
    TableSetup,
    AddCustomer,
    tableHeaderSearch
  },
  computed: {
    ...mapGetters([
      'otherinfo'
    ]),
    orgid() {
      return this.isModify ? this.selectInfo.orgid : this.searchForms.vo.orgid || this.otherinfo.orgid
    }
  },
  data() {
    return {
      code: 'ORDERMANAGER_NETWORKLIST',
      mykey: '',
      tablekey: 0,
      btnsize: 'mini',
      usersArr: [],
      total: 0,
      // 加载状态
      loading: true,
      setupTableVisible: false,
      AddCustomerVisible: false,
      isModify: false,
      isDbclick: false,
      selectInfo: {},
      // 选中的行
      selected: [],

      searchForms: {
        'currentPage': 1,
        'pageSize': 100,
        'vo': {
          orderStatus: '',
          orderSn: '',
          createTime: '',
          endTime: ''
        }
      },
      tableColumn: [
        {
          label: '序号',
          prop: 'number',
          width: '70',
          fixed: false,
          slot: (scope) => {
            return ((this.searchForms.currentPage - 1) * this.searchForms.pageSize) + scope.$index + 1
          }
        }, {
          label: '订单号',
          prop: 'orderSn',
          width: '130',
          fixed: true
        }, {
          label: '订单状态',
          prop: 'orerStatusName',
          width: '110',
          fixed: true
        }, {
          label: '关联运单号',
          prop: 'shipSn',
          width: '130',
          fixed: false
        }, {
          label: '订单类型',
          prop: 'orderTypeName',
          width: '110',
          fixed: false
        }, {
          label: '紧急度',
          prop: 'orderEffectiveName',
          width: '100',
          fixed: false
        }, {
          label: '提货方式',
          prop: 'orderPickupMethodName',
          width: '110',
          fixed: false
        }, {
          label: '货品名',
          prop: 'cargoName',
          width: '90',
          fixed: false
        }, {
          label: '件数',
          prop: 'cargoAmount',
          width: '80',
          fixed: false
        }, {
          label: '重量',
          prop: 'cargoWeight',
          width: '90',
          fixed: false
        }, {
          label: '体积',
          prop: 'cargoVolume',
          width: '80',
          fixed: false
        }, {
          label: '包装',
          prop: 'cargoPack',
          width: '80',
          fixed: false
        }, {
          label: '品种规格',
          prop: 'description',
          width: '110',
          fixed: false
        }, {
          label: '运费',
          prop: 'shipFee',
          width: '80',
          fixed: false
        }, {
          label: '付款方式',
          prop: 'orderPayWayName',
          width: '110',
          fixed: false
        }, {
          label: '创建时间',
          prop: 'createTime',
          width: '160',
          fixed: false
        }, {
          label: '发货人',
          prop: 'senderName',
          width: '150',
          fixed: false
        }, {
          label: '发货人电话',
          prop: 'senderMobile',
          width: '130',
          fixed: false
        }, {
          label: '收货人',
          prop: 'receiverName',
          width: '150',
          fixed: false
        }, {
          label: '收货人电话',
          prop: 'receiverMobile',
          width: '130',
          fixed: false
        }, {
          label: '拒绝原因',
          prop: 'refuseReason',
          width: '150',
          fixed: false
        }, {
          label: '备注',
          prop: 'orderRemarks',
          width: '120',
          fixed: false
        }, {
          label: '发站',
          prop: 'orderFromCityName',
          width: '110',
          fixed: false
        }, {
          label: '到站',
          prop: 'orderToCityName',
          width: '110',
          fixed: false
        }, {
          label: '开单网点',
          prop: 'orderFromOrgName',
          width: '110',
          fixed: false
        }, {
          label: '目的网点',
          prop: 'orderToOrgName',
          width: '110',
          fixed: false
        }, {
          label: '声明价值',
          prop: 'productPrice',
          width: '110',
          fixed: false
        }, {
          label: '代收款',
          prop: 'agencyFund',
          width: '90',
          fixed: false
        }, {
          label: '代收款手续费',
          prop: 'commissionFee',
          width: '130',
          fixed: false
        }, {
          label: '件数单价',
          prop: 'cargoAmount',
          width: '110',
          fixed: false
        }, {
          label: '重量单价',
          prop: 'weightFee',
          width: '110',
          fixed: false
        }, {
          label: '体积单价',
          prop: 'volumeFee',
          width: '110',
          fixed: false
        }
      ]
    }
  },
  mounted() {
    this.searchForms.vo.orgid = this.otherinfo.orgid
    this.eventBus.$on('putAcceptOrder', (_ids) => {
      putAccept(_ids).then(res => {
        this.$message({
          type: 'success',
          message: '保存成功!'
        })
        this.fetchData()
      }).catch(err => {
        this._handlerCatchMsg(err)
      })
    })
  },
  methods: {
    changeKey(obj) {
      this.total = 0
      this.searchForms = obj
      this.fetchAllList()
    },
    getSumLeft(param, type) {
      return getSummaries(param, operationPropertyCalc)
    },
    fetchAllList() {
      this.loading = true
      return postNetworkList(this.searchForms).then(data => {
        this.usersArr = data.list
        this.total = data.total
        this.loading = false
      }).catch(err => {
        this._handlerCatchMsg(err)
      })
    },
    fetchData() {
      this.fetchAllList()
    },
    handlePageChange(obj) {
      this.searchForms.currentPage = obj.pageNum
      this.searchForms.pageSize = obj.pageSize
      this.fetchAllList()
    },
    getSearchParam(obj) {
      this.searchForms.currentPage = this.$options.data().searchForms.currentPage
      this.searchForms.pageSize = this.$options.data().searchForms.pageSize
      this.searchForms.vo = objectMerge2(this.searchForms.vo, obj)
      this.fetchAllList()
    },
    showImport() {
      // 显示导入窗口
    },
    doAction(type) {
      // 判断是否有选中项
      if (!this.selected.length && type !== 'add' && type !== 'export' && type !== 'acceptance') {
        this.closeAddCustomer()
        this.$message({
          message: '请选择要操作的订单~',
          type: 'warning'
        })
        return false
      } else if (!this.selected.length && type === 'acceptance') {
        this.closeAddCustomer()
        this.$message({
          message: '请选择要受理的订单~',
          type: 'warning'
        })
        return false
      }
      switch (type) {
        case 'export':
          SaveAsFile({
            data: this.selected.length ? this.selected : this.usersArr,
            columns: this.tableColumn,
            name: '网络订单'
          })
          this.$refs.multipleTable.clearSelection()
          // if (this.selected.length === 0) {
          //   SaveAsFile(this.usersArr, this.tableColumn)
          // } else {
          //   // 筛选选中的项
          //   SaveAsFile(this.selected, this.tableColumn)
          // }
          break
          // 添加客户
        case 'add':
          this.isModify = false
          this.isDbclick = false
          this.selectInfo = {}
          this.openAddCustomer()
          break
              // 受理  acceptance
        case 'acceptance':
          this.isModify = false
          this.isDbclick = false
          this.closeAddCustomer()
          this.selectInfo = this.selected[0]
          if (this.selected.length > 1) {
            this.$message({
              message: '每次只能修改单条数据~',
              type: 'warning'
            })
            this.$refs.multipleTable.clearSelection()
            return false
          }
          if (this.selected[0].orderStatus === 213) {
            this.eventBus.$emit('showCreateOrder', {
              preid: this.selected[0].id
            })

            //  订单至少需要一个预订单，点击受理跳转到开单页面
          } else if (this.selected[0].orerStatusName === '已受理') {
            this.$message({
              message: '订单已经受理了~',
              type: 'warning'
            })
            return false
          } else if (this.selected[0].orderStatus === 216) {
            this.$message({
              message: '已作废的运单不可以受理~',
              type: 'warning'
            })
            return false
          } else {
            return false
          }
          break
          // 修改
        case 'modify':

          if (this.selected.length > 1) {
            this.$message({
              message: '每次只能修改单条数据~',
              type: 'warning'
            })
          } else {
            if (this.selected[0].orderStatus === 213) {
              this.openAddCustomer()

              this.isModify = true
              this.isDbclick = false
              this.selectInfo = this.selected[0]
            } else {
              this.$message({
                message: '未受理才能修改~',
                type: 'warning'
              })
              this.$refs.multipleTable.clearSelection()
              this.closeAddCustomer()
            }
          }

          break
        // 作废
        case 'cancel':
          this.closeAddCustomer()
          if (this.selected[0].orderStatus == 213) {
            const _deleteIt = this.selected.length > 1 ? this.selected.length + '条' : this.selected[0].orderSn
            let _ids = this.selected.map(item => {
              return item.id
            })
            _ids = _ids.length > 1 ? _ids.join(',') : _ids
            this.$confirm('确定要操作 ' + _deleteIt + ' 订单号吗？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              putCancel(_ids).then(res => {
                this.$message({
                  type: 'success',
                  message: '保存成功!'
                })
                this.fetchData()
              }).catch(err => {
                this._handlerCatchMsg(err)
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消操作'
              })
            })
          } else if (this.selected[0].orderStatus === 214) {
            this.$message({
              message: '已受理的订单不可以作废~',
              type: 'warning'
            })
          } else {
            this.$message({
              message: '已作废的订单不可以作废~',
              type: 'warning'
            })
            this.$refs.multipleTable.clearSelection()
          }

          break
        // 拒绝 'refuse':
        case 'refuse':

          this.closeAddCustomer()
          if (this.selected[0].orderStatus == 213) {
              // =>todo 删除多个
            let ids = this.selected.map(item => {
              return item.id
            })
            ids = ids.splice(',')
            this.$prompt('拒绝原因', '拒绝订单', {

              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then((value) => {
              const refuseReason = value.value
              const data = {
                ids,
                refuseReason
              }
              data.ids = ids
              data.refuseReason = refuseReason
              putRefuse(data).then(res => {
                this.loading = false
                this.$message({
                  type: 'success',
                  message: '保存成功!'
                })
                this.fetchData()
              }).catch(err => {
                this._handlerCatchMsg(err)
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消操作'
              })
              this.loading = false
            })
          } else if (this.selected[0].orderStatus === 214) {
            this.$message({
              message: '已受理的订单不可以拒绝~',
              type: 'warning'
            })
            return false
          } else {
            this.$message({
              message: '该订单不可以拒绝~',
              type: 'warning'
            })
            this.$refs.multipleTable.clearSelection()
            return false
          }

          break
          // 删除
        case 'delete':
          this.closeAddCustomer()
          if (this.selected[0].orderStatus === 213 || this.selected[0].orderStatus === 215 || this.selected[0].orderStatus === 216) {
            const deleteIt = this.selected.length > 1 ? this.selected.length + '条' : this.selected[0].orderSn
            let ids = this.selected.map(item => {
              return item.id
            })
            ids = ids.length > 1 ? ids.join(',') : ids
            this.$confirm('确定要删除 ' + deleteIt + ' 订单号吗？', '提示', {
              confirmButtonText: '删除',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              deletebatchDelete(ids).then(res => {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                })
                this.fetchData()
              }).catch(err => {
                this._handlerCatchMsg(err)
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              })
            })
          } else if (this.selected[0].orderStatus === 214) {
            this.$message({
              message: '已受理的订单不可以删除~',
              type: 'warning'
            })
          } else {
            this.$message({
              message: '未受理和已拒绝订单才可以删除~',
              type: 'warning'
            })
            this.$refs.multipleTable.clearSelection()
          }

          break
          // 导出数据
          // case 'export':
          //     let ids2 = this.selected.map(el => {
          //       return el.customerId
          //     })
          //     getExportExcel(ids2.join(',')).then(res => {
          //       this.$message({
          //           type: 'success',
          //           message: '即将自动下载!'
          //       })
          //     })
          //     break;
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
    openAddCustomer() {
      this.AddCustomerVisible = true
    },
    closeAddCustomer() {
      // this.mykey = Math.random()
      this.AddCustomerVisible = false
    },
    clickDetails(row, event, column) {
      this.$refs.multipleTable.toggleRowSelection(row)
    },
    getSelection(selection) {
      this.selected = selection
    },
    getDbClick(row, event) {
      if (this.isModify) {
        this.closeSetupTable()
        this.$refs.multipleTable.clearSelection()
      }
      this.selectInfo = row
      this.isModify = false
      this.isDbclick = true
      this.openAddCustomer()
      this.$refs.multipleTable.clearSelection()
    },
    setColumn(obj) { // 重绘表格列表
      this.tableColumn = obj
      this.tablekey = Math.random() // 刷新表格视图
    }
  }
}
</script>
<style lang="scss">
.manage-content{
    .el-message-box__message{
      padding-left: 0;
    }

}
</style>
