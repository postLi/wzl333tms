<template>
  <!--v-loading="loading"-->
  <div class="tab-content" v-loading="loading">
    <SearchForm :orgid="otherinfo.orgid" :issender="true" @change="getSearchParam" :btnsize="btnsize" />
    <div class="tab_info">
      <div class="btns_box">

          <el-button type="primary" :size="btnsize" icon="el-icon-plus" plain @click="doAction('storage')">创建对账单</el-button>
        <el-button type="success" :size="btnsize" icon="el-icon-tickets" plain @click="doAction('completion')">对账完成</el-button>
        <el-button type="info" :size="btnsize" icon="el-icon-error" plain @click="doAction('cancelCom')">取消完成</el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-edit" plain @click="doAction('modify')">修改查看</el-button>
        <el-button type="danger" :size="btnsize" icon="el-icon-delete" plain @click="doAction('detele')">删除</el-button>
          <el-button type="primary" :size="btnsize" icon="el-icon-download" @click="doAction('export')" plain>导出</el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-printer" @click="doAction('print')" plain>打印</el-button>

          <el-button type="primary" :size="btnsize" icon="el-icon-setting" plain @click="setTable" class="table_setup">表格设置</el-button>
      </div>
      <div class="info_tab">
        <!-- <el-table
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
            label="序号"
            width="100">
            <template slot-scope="scope">{{ ((searchQuery.currentPage - 1)*searchQuery.pageSize) + scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column
            fixed
            sortable
            prop="memberName"
            width="130"
            label="发货方">
          </el-table-column>
          <el-table-column
            prop="memberPerson"
            width="130"
            sortable
            label="发货人">
          </el-table-column>
          <el-table-column
            prop="createTime"
            sortable
            width="160"
            label="创建时间">
          </el-table-column>
          <el-table-column
            prop="checkBillName"
            sortable
            width="280"
            label="对账单名">
          </el-table-column>

          <el-table-column
            sortable
            prop="checkBillCode"
            width="170"
            label="对账编号">
          </el-table-column>
          <el-table-column
            prop="checkStartTime"
            label="对账开始时间"
            width="160"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="checkEndTime"
            label="对账结束时间"
            width="160"
            sortable
            >
          </el-table-column>

          <el-table-column
            prop="totalCountFee"
            label="应收应付对账合计"
            width="180"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="receivableFee"
            label="应收账款"
            width="150"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="payableFee"
            label="应付账款"
            width="120"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="receivedFee"
            label="已收账款"
            width="120"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="paidFee"
            label="已付账款"
            width="120"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="checkStatusName"
            label="对账状态"
            width="120"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="createBy"
            label="创建人"
            width="120"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="totalCount"
            label="总单数"
            width="120"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="remark"
            label="备注"
            width="120"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="memberPerson"
            label="业务负责人"
            width="120"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="memberPersonPhone"
            label="业务负责人电话"
            width="140"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="settlementType"
            label="结算方式"
            width="120"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="bankAccount"
            label="账户账号"
            width="130"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="bankName"
            label="账户开户行"
            width="150"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="financialOfficer"
            label="财务负责人"
            width="130"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="financialOfficerPhone"
            label="财务负责人电话"
            width="130"
            sortable
          >
          </el-table-column><el-table-column
          prop="alipayAccount"
          label="支付宝"
          width="130"
          sortable
        >
        </el-table-column><el-table-column
          prop="wechatAccount"
          label="微信"
          width="130"
          sortable
        >
        </el-table-column>

        </el-table> -->




         <el-table ref="multipleTable" @row-dblclick="getDbClick" :data="usersArr" border @row-click="clickDetails" @selection-change="getSelection" height="100%" tooltip-effect="dark" :key="tablekey" style="width:100%;" :default-sort="{prop: 'id', order: 'ascending'}" stripe>
          <el-table-column fixed sortable type="selection" width="50"></el-table-column>
          <template v-for="column in tableColumn">
            <el-table-column :key="column.id" :fixed="column.fixed" sortable :label="column.label" :prop="column.prop" v-if="!column.slot" :width="column.width"></el-table-column>
            <el-table-column :key="column.id" :fixed="column.fixed" sortable :label="column.label" v-else :width="column.width">
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
    <IndexDialog :issender="true" :isModify="isModify"  :dotInfo="selectInfo" :orgid="orgid" :id='trackId' :popVisible.sync="AddCustomerVisible" @close="closeAddCustomer" @success="fetchData"></IndexDialog>
    <TableSetup :popVisible="setupTableVisible" @close="closeSetupTable" @success="setColumn" :columns="tableColumn"  />
  </div>
</template>
<script>
import { getExportExcel } from '@/api/company/customerManage'

import { postCFinancebillcheckList } from '@/api/finance/fin_customer'
import { deleteCarShort, postUpdateBillCheckSelective } from '@/api/finance/fin_carfee'
import SearchForm from './components/search'
import TableSetup from '@/components/tableSetup'
import IndexDialog from '../../../carrier/components/detailTable/components/indexDialog'
import { mapGetters } from 'vuex'
import Pager from '@/components/Pagination/index'
import { PrintInFullPage, SaveAsFile } from '@/utils/lodopFuncs'

export default {
  components: {
    SearchForm,
    Pager,
    TableSetup,
    IndexDialog
  },
  computed: {
    ...mapGetters([
      'otherinfo'
    ]),
    orgid() {
    }
  },
  mounted() {
    this.searchQuery.vo.orgId = this.otherinfo.orgid
    this.searchQuery.vo.memberId = this.$route.query.id
  },
  data() {
    return {
      tablekey: 0,
      btnsize: 'mini',
      usersArr: [],
      total: 0,
      trackId: '',
      batchTypeId: '', // 批次状态
      // 加载状态
      loading: true,
      setupTableVisible: false,
      AddCustomerVisible: false,
      isModify: false,
      isDbclick: false,
      selectInfo: {},
      // 选中的行
      selected: [],
      searchQuery: {
        'currentPage': 1,
        'pageSize': 100,
        'vo': {
          'orgId': '',
          memberId: '', //
          memberIdType: 2, //
          checkStatus: '', // 0未 1已
          startTime: '', //
          endTime: ''
        }
      },
      tableColumn: [
        {
          label: '序号',
          prop: 'id',
          width: '120',
          fixed: true,
          slot: (scope) => {
            return ((this.searchQuery.currentPage - 1) * this.searchQuery.pageSize) + scope.$index + 1
          }
        }, {
          label: '发货方',
          prop: 'memberName',
          width: '130',
          fixed: true
        }, {
          label: '发货人',
          prop: 'memberPerson',
          width: '130',
          fixed: true
        }, {
          label: '创建时间',
          prop: 'createTime',
          width: '160',
          fixed: false
        }, {
          label: '对账单名',
          prop: 'checkBillName',
          width: '280',
          fixed: false
        }, {
          label: '对账编号',
          prop: 'checkBillCode',
          width: '170',
          fixed: false
        }, {
          label: '对账开始时间',
          prop: 'checkStartTime',
          width: '160',
          fixed: false
        }, {
          label: '对账结束时间',
          prop: 'checkEndTime',
          width: '160',
          fixed: false
        }, {
          label: '应收应付对账合计',
          prop: 'totalCountFee',
          width: '180',
          fixed: false
        }, {
          label: '应收账款',
          prop: 'receivableFee',
          width: '150',
          fixed: false
        }, {
          label: '应付账款',
          prop: 'payableFee',
          width: '120',
          fixed: false
        }, {
          label: '已收账款',
          prop: 'receivedFee',
          width: '120',
          fixed: false
        }, {
          label: '已付账款',
          prop: 'paidFee',
          width: '120',
          fixed: false
        }, {
          label: '对账状态',
          prop: 'checkStatusName',
          width: '120',
          fixed: false
        }, {
          label: '创建人',
          prop: 'createBy',
          width: '120',
          fixed: false
        }, {
          label: '总单数',
          prop: 'totalCount',
          width: '120',
          fixed: false
        }, {
          label: '备注',
          prop: 'remark',
          width: '120',
          fixed: false
        }, {
          label: '业务负责人',
          prop: 'memberPerson',
          width: '120',
          fixed: false
        }, {
          label: '业务负责人电话',
          prop: 'memberPersonPhone',
          width: '140',
          fixed: false
        }, {
          label: '结算方式',
          prop: 'settlementType',
          width: '120',
          fixed: false
        }, {
          label: '账户账号',
          prop: 'bankAccount',
          width: '130',
          fixed: false
        }, {
          label: '账户开户行',
          prop: 'bankName',
          width: '150',
          fixed: false
        }, {
          label: '财务负责人',
          prop: 'financialOfficer',
          width: '130',
          fixed: false
        }, {
          label: '财务负责人电话',
          prop: 'financialOfficerPhone',
          width: '130',
          fixed: false
        }, {
          label: '支付宝',
          prop: 'alipayAccount',
          width: '130',
          fixed: false
        }, {
          label: '微信',
          prop: 'wechatAccount',
          width: '130',
          fixed: false
        }
      ]
    }
  },
  methods: {
    fetchAllCustomer() {
      this.loading = true
      return postCFinancebillcheckList(this.searchQuery).then(data => {
        this.usersArr = data.list
        this.total = data.total
        this.loading = false
      })
    },
    fetchData() {
      this.fetchAllCustomer()
    },
    handlePageChange(obj) {
      this.searchQuery.currentPage = obj.pageNum
      this.searchQuery.pageSize = obj.pageSize
    },
    getSearchParam(obj) {
      this.searchQuery.vo = Object.assign(this.searchQuery.vo, obj)
      this.fetchAllCustomer()
    },
    showImport() {
      // 显示导入窗口
    },
    doAction(type) {
      // 判断是否有选中项

      if (!this.selected.length && type !== 'storage' && type !== 'export' && type !== 'print') {
        this.$message({
          message: '请选择要操作的对账单~',
          type: 'warning'
        })
        return false
      }

      switch (type) {
        // 新增
        case 'storage':
          this.$router.push({
            path: '/finance/reconciliation/customer/detailTable/customerRecon',
            query: {
              tab: '客户对账-创建对账',
              id: this.$route.query.id
            }
          })

          break
        // 修改 modify
        case 'modify':
          this.$router.push({
            path: '/finance/reconciliation/customer/detailTable/customerRecon',
            query: {
              tab: '客户对账-修改查看',
              id: this.selected[0].id,
              urlId: this.$route.query.id
            }
          })

          break
        // 对账完成 cancelCom
        case 'completion':
          if (this.selected.length > 1) {
            this.$message({
              message: '只能选择一条数据进行跟踪设置~',
              type: 'warning'
            })
            return false
          } else {
            if (this.selected[0].checkStatus === 0) {
              this.openAddCustomer()
              this.selectInfo = this.selected[0]
            } else {
              this.$message({
                type: 'info',
                message: '该对账单已经完成对账~'
              })
            }
          }

          break
        // 取消对账
        case 'cancelCom':
          this.closeAddCustomer()
          if (this.selected.length > 1) {
            this.$message({
              message: '只能选择一条数据进行跟踪设置~',
              type: 'warning'
            })
            return false
          } else {
            if (this.selected[0].checkStatus === 1) {
              const _data = {
                id: '',
                checkStatus: 0
              }
              _data.id = this.selected[0].id
              postUpdateBillCheckSelective(_data).then(res => {
                this.loading = false
                this.$message({
                  type: 'success',
                  message: '保存成功~'
                })
                this.fetchData()
              }).catch(err => {
                this.loading = false
              })
            } else {
              this.$message({
                type: 'info',
                message: '该对账单还没对账~'
              })
            }
          }

          break
          // 删除
        case 'detele':
          this.closeAddCustomer()
          if (this.selected.length > 1) {
            this.$message({
              message: '只能选择一条数据进行跟踪设置~',
              type: 'warning'
            })
            return false
          } else {
            if (this.selected[0].checkStatus === 0) {
              const id = this.selected[0].id
              deleteCarShort(id).then(res => {
                this.loading = false
                this.$message({
                  type: 'success',
                  message: '保存成功~'
                })
                this.fetchData()
              }).catch(err => {
                this.loading = false
              })
            } else {
              this.$message({
                type: 'info',
                message: '该对账单已完成对账不可以删除~'
              })
            }
          }

          break
           // 导出数据
        case 'print': // 打印表格常用方法
          PrintInFullPage({
            data: this.usersArr, // 列表中的数据
            columns: this.tableColumn, // 表格设置好的列
            name: '全部对账单' // 文件名称
          })
          break
        case 'export': // 导出表格常用方法
          SaveAsFile({
            data: this.usersArr, // 列表中的数据
            columns: this.tableColumn, // 表格设置好的列
            name: '全部对账单' // 文件名称
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
    getDbClick(row, event) {
      this.$router.push({
        path: '/finance/reconciliation/customer/detailTable/customerRecon',
        query: {
          tab: '客户对账-修改查看',
          id: row.id,
          urlId: this.$route.query.id
        }
      })
    },
    setColumn(obj) { // 重绘表格列表
      this.tableColumn = obj
      this.tablekey = Math.random() // 刷新表格视图
    }
  }
}
</script>
