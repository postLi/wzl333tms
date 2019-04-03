<template>
  <div class="tab-content miniHeaderSearch" v-loading="loading">
    <SearchForm :orgid="otherinfo.orgid" @change="getSearchParam" :btnsize="btnsize"/>
    <div class="tab_info">
      <div class="btns_box">
        <el-button
          type="primary"
          :size="btnsize"
          icon="el-icon-circle-plus"
          plain
          @click="doAction('accept')"
          v-has:ORDERMANGER_REVER2
        >受理</el-button>
        <!--<el-button type="primary" :size="btnsize" icon="el-icon-edit" @click="doAction('modify')" plain>修改</el-button>-->
        <el-button
          type="danger"
          :size="btnsize"
          icon="el-icon-delete"
          @click="doAction('delete')"
          plain
          v-has:ORDERMANGER_DEL2
        >删除</el-button>
        <el-button
          type="primary"
          :size="btnsize"
          icon="el-icon-edit-outline"
          @click="doAction('export')"
          plain
          v-has:ORDERMANGER_EXP2
        >导出</el-button>
        <el-button
          type="primary"
          :size="btnsize"
          icon="el-icon-edit-outline"
          @click="doAction('import')"
          plain
          v-has:ORDERMANGER_IN
        >导入运单</el-button>
        <el-button
          type="primary"
          :size="btnsize"
          icon="el-icon-setting"
          plain
          @click="setTable"
          class="table_setup"
        >表格设置</el-button>
        <!--<el-button type="primary" :size="btnsize" icon="el-icon-circle-plus" plain @click="doAction('add')">新增</el-button>-->
        <!--<el-button type="primary" :size="btnsize" icon="el-icon-edit" @click="doAction('modify')" plain>修改</el-button>-->
        <!--<el-button type="danger" :size="btnsize" icon="el-icon-delete" @click="doAction('delete')" plain>删除</el-button>-->
        <!--<el-button type="primary" :size="btnsize" icon="el-icon-edit-outline" @click="doAction('export')" plain>导出</el-button>-->
        <!--<el-button type="primary" :size="btnsize" icon="el-icon-edit-outline" @click="doAction('import')" plain>批量导入</el-button>-->
        <!--<el-button type="primary" :size="btnsize" icon="el-icon-setting" plain @click="setTable" class="table_setup">表格设置</el-button>-->
      </div>
      <div class="info_tab">
        <el-table
          ref="multipleTable"
          :data="usersArr"
          border
          @row-click="clickDetails"
          @selection-change="getSelection"
          height="100%"
          tooltip-effect="dark"
          :key="tablekey"
          :summary-method="getSumLeft"
          show-summary
          style="width:100%;"
          :default-sort="{prop: 'id', order: 'ascending'}"
          stripe
        >
          <el-table-column fixed sortable type="selection" width="70"></el-table-column>
          <template v-for="column in tableColumn">
            <el-table-column
              :key="column.id"
              :fixed="column.fixed"
              sortable
              :label="column.label"
              :prop="column.prop"
              v-if="!column.slot"
              :width="column.width"
            >
           <template slot="header" slot-scope="scope">
                <tableHeaderSearch
                  :scope="scope"
                  :query="searchQuery"
                  @change="changeKey"
                />
              </template>
              <template slot-scope="scope">{{scope.row[column.prop]}}</template>
            </el-table-column>

            <el-table-column
              :key="column.id"
              :fixed="column.fixed"
              sortable
               :prop="column.prop"
              :label="column.label"
              v-else
              :width="column.width"
            >
            <template slot="header" slot-scope="scope">
                <tableHeaderSearch :scope="scope" :query="searchQuery" @change="changeKey"/>
              </template>
              <template slot-scope="scope">
                <span
                  class="clickitem"
                  v-if="column.click"
                  v-html="column.slot(scope)"
                  @click.stop="column.click(scope)"
                ></span>
                <span v-else v-html="column.slot(scope)"></span>
              </template>
            </el-table-column>
          </template>
        </el-table>
      </div>
      <div class="info_tab_footer">
        共计:{{ total }}
        <div class="show_pager">
          <Pager :total="total" @change="handlePageChange"/>
        </div>
      </div>
    </div>
    <AddCustomer
      :isModify="isModify"
      :info="selectInfo"
      :orgid="orgid"
      :popVisible.sync="AddCustomerVisible"
      @close="closeAddCustomer"
      @success="fetchData"
    />
    <TableSetup
      :code="code"
      :popVisible="setupTableVisible"
      @close="closeSetupTable"
      @success="setColumn"
      :columns="tableColumn"
    />
  </div>
</template>
<script>
import {
  deleteSomeCustomerInfo,
  getExportExcel
} from '@/api/company/customerManage'
import { getPostlist } from '../../../../api/operation/manage'
import SearchForm from './components/search'
// import TableSetup from '@/components/tableSetup'
import AddCustomer from './components/add'
import { mapGetters } from 'vuex'
import Pager from '@/components/Pagination/index'
import { getSummaries, operationPropertyCalc } from '@/utils/index'
// import tableHeaderSearch from '@/components/tableHeaderSearch'

export default {
  components: {
    SearchForm,
    Pager,
    // TableSetup,
    AddCustomer
    // tableHeaderSearch
  },
  computed: {
    ...mapGetters(['otherinfo']),
    orgid() {
      return this.isModify
        ? this.selectInfo.orgid
        : this.searchQuery.vo.orgid || this.otherinfo.orgid
    }
  },
  mounted() {
    this.searchQuery.vo.orgid = this.otherinfo.orgid
    this.searchForm.vo.orgid = this.otherinfo.orgid
    this.fetchAllList(this.otherinfo.orgid)
      .then(res => {
        this.loading = false
      })
      .catch(err => {
        this.loading = false
        this._handlerCatchMsg(err)
      })
  },
  data() {
    return {
      tablekey: 0,
      code: 'ORDERMANAGER_IMPLIST',
      columns: [],
      btnsize: 'mini',
      usersArr: [],
      total: 0,
      // 加载状态
      loading: true,
      setupTableVisible: false,
      AddCustomerVisible: false,
      isModify: false,
      selectInfo: {},
      // 选中的行
      selected: [],
      searchQuery: {
        currentPage: 1,
        pageSize: 100,
        vo: {
          orgid: 1,
          customerType: 2,
          customerMobile: '',
          customerName: ''
        }
      },
      searchForm: {
        currentPage: 1,
        pageSize: 100,
        vo: {
          orgid: 1
        }
      },
      tableColumn: [
        {
          label: '序号',
          prop: 'number',
          width: '70',
          fixed: false,
          slot: scope => {
            return (
              (this.searchForms.currentPage - 1) * this.searchForms.pageSize +
              scope.$index +
              1
            )
          }
        },
        {
          label: '订单号',
          prop: 'orderSn',
          width: '130',
          fixed: true
        },
        {
          label: '订单状态',
          prop: 'orerStatusName',
          width: '110',
          fixed: true
        },
        {
          label: '关联运单号',
          prop: 'shipSn',
          width: '130',
          fixed: false
        },
        {
          label: '紧急度',
          prop: 'orderEffectiveName',
          width: '100',
          fixed: false
        },
        {
          label: '提货方式',
          prop: 'orderPickupMethodName',
          width: '110',
          fixed: false
        },
        {
          label: '货品名',
          prop: 'cargoName',
          width: '90',
          fixed: false
        },
        {
          label: '件数',
          prop: 'cargoAmount',
          width: '80',
          fixed: false
        },
        {
          label: '重量',
          prop: 'cargoWeight',
          width: '90',
          fixed: false
        },
        {
          label: '体积',
          prop: 'cargoVolume',
          width: '80',
          fixed: false
        },
        {
          label: '包装',
          prop: 'cargoPack',
          width: '80',
          fixed: false
        },
        {
          label: '品种规格',
          prop: 'description',
          width: '110',
          fixed: false
        },
        {
          label: '运费',
          prop: 'shipFee',
          width: '80',
          fixed: false
        },
        {
          label: '付款方式',
          prop: 'orderPayWayName',
          width: '110',
          fixed: false
        },
        {
          label: '创建时间',
          prop: 'createTime',
          width: '160',
          fixed: false
        },
        {
          label: '发货人',
          prop: 'senderName',
          width: '150',
          fixed: false
        },
        {
          label: '发货人电话',
          prop: 'senderMobile',
          width: '130',
          fixed: false
        },
        {
          label: '收货人',
          prop: 'receiverName',
          width: '150',
          fixed: false
        },
        {
          label: '收货人电话',
          prop: 'receiverMobile',
          width: '130',
          fixed: false
        },
        {
          label: '拒绝原因',
          prop: 'refuseReason',
          width: '150',
          fixed: false
        },
        {
          label: '备注',
          prop: 'orderRemarks',
          width: '120',
          fixed: false
        },
        {
          label: '发站',
          prop: 'orderFromCityName',
          width: '110',
          fixed: false
        },
        {
          label: '到站',
          prop: 'orderToCityName',
          width: '110',
          fixed: false
        },
        {
          label: '开单网点',
          prop: 'orderFromOrgName',
          width: '110',
          fixed: false
        },
        {
          label: '目的网点',
          prop: 'orderToOrgName',
          width: '110',
          fixed: false
        },
        {
          label: '声明价值',
          prop: 'productPrice',
          width: '110',
          fixed: false
        },
        {
          label: '代收款',
          prop: 'agencyFund',
          width: '90',
          fixed: false
        },
        {
          label: '代收款手续费',
          prop: 'commissionFee',
          width: '130',
          fixed: false
        }
        // {
        //   label: '件数单价',
        //   prop: 'cargoAmount',
        //   width: '110',
        //   fixed: false
        // }, {
        //   label: '重量单价',
        //   prop: 'weightFee',
        //   width: '110',
        //   fixed: false
        // }, {
        //   label: '体积单价',
        //   prop: 'volumeFee',
        //   width: '110',
        //   fixed: false
        // }
      ]
    }
  },
  methods: {
    changeKey(obj) {
      this.total = 0
      this.searchForms = obj
      if (!this.loading) {
        this.fetchAllList()
      }
    },
    getSumLeft(param, type) {
      return getSummaries(param, operationPropertyCalc)
    },
    fetchAllList() {
      this.loading = true
      return getPostlist(this.searchForm)
        .then(data => {
          // this.total = data.total
          // this.usersArr = data.list
          // this.total = data.totalCount
          this.loading = false
        })
        .catch(err => {
          this.loading = false
          this._handlerCatchMsg(err)
        })
    },
    fetchData() {
      this.fetchAllList()
    },
    handlePageChange(obj) {
      this.searchQuery.currentPage = obj.pageNum
      this.searchQuery.pageSize = obj.pageSize
      this.searchForm.currentPage = obj.pageNum
      this.searchForm.pageSize = obj.pageSize
      this.fetchAllList()
    },
    getSearchParam(obj) {
      this.searchForm.currentPage = this.$options.data().searchForm.currentPage
      this.searchForm.pageSize = this.$options.data().searchForm.pageSize
      this.searchForm.vo = Object.assign(this.searchForm.vo, obj)
      this.fetchAllList()
    },
    showImport() {
      // 显示导入窗口
      this.$message({ type: 'warning', message: '该功能尚在开发中！' })
    },
    doAction(type) {
      if (type === 'import') {
        this.showImport()
        // return false
      }
      // 判断是否有选中项
      if (!this.selected.length && type !== 'accept' && type !== 'import') {
        this.closeAddCustomer()
        this.$message({
          message: '请选择要操作的项~',
          type: 'warning'
        })
        return false
      } else if (!this.selected.length && type === 'accept') {
        this.closeAddCustomer()
        this.$message({
          message: '请选择要受理的订单~',
          type: 'warning'
        })
        return false
      }

      // console.log("this.selected:", this.selected)
      switch (type) {
        // 添加客户
        case 'add':
          this.isModify = false
          this.selectInfo = {}
          this.openAddCustomer()
          break
        // 修改客户信息
        case 'accept':
          // this.isModify = true
          if (this.selected.length > 1) {
            this.$message({
              message: '每次只能修改单条数据~',
              type: 'warning'
            })
          }
          this.selectInfo = this.selected[0]
          // if (this.selectInfo.orderStatus == 1) {
          // }
          console.log(this.selectInfo)
          // this.openAddCustomer()
          break
        case 'delete': // 删除客户
          const deleteItem =
            this.selected.length > 1
              ? this.selected.length + '名'
              : this.selected[0].customerName
          // =>todo 删除多个
          let ids = this.selected.map(item => {
            return item.customerId
          })
          ids = ids.join(',')

          this.$confirm('确定要删除 ' + deleteItem + ' 客户吗？', '提示', {
            confirmButtonText: '删除',
            cancelButtonText: '取消',
            type: 'warning'
          })
            .then(() => {
              deleteSomeCustomerInfo(ids)
                .then(res => {
                  this.$message({
                    type: 'success',
                    message: '删除成功!'
                  })
                  this.fetchData()
                })
                .catch(err => {
                  this._handlerCatchMsg(err)
                })
            })
            .catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              })
            })
          break
        // 导出数据
        case 'export':
          const ids2 = this.selected.map(el => {
            return el.customerId
          })
          getExportExcel(ids2.join(',')).then(res => {
            this.$message({
              type: 'success',
              message: '即将自动下载!'
            })
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
    },
    setColumn(obj) {
      // 重绘表格列表
      this.tableColumn = obj
      this.tablekey = Math.random() // 刷新表格视图
    }
  }
}
</script>
