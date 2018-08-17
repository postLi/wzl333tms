<template>
  <!--v-loading="loading"-->
  <div class="tab-content" >
    <SearchForm :orgid="otherinfo.orgid" :issender="true" @change="getSearchParam" :btnsize="btnsize" />
    <div class="tab_info">
      <div class="btns_box">

          <el-button type="primary" :size="btnsize" icon="el-icon-circle-plus" plain @click="doAction('storage')">新增</el-button>
          <el-button type="primary" :size="btnsize" icon="el-icon-edit" @click="doAction('modify')" plain>修改</el-button>
          <el-button type="warning" :size="btnsize" icon="el-icon-error" @click="doAction('stop')" plain>停用</el-button>
          <!--<el-button type="primary" :size="btnsize" icon="el-icon-edit" @click="doAction('deleteStor')" plain>取消入库</el-button>-->
          <el-button type="primary" :size="btnsize" icon="el-icon-download" @click="doAction('export')" plain>导出</el-button>

          <el-button type="primary" :size="btnsize" icon="el-icon-setting" plain @click="setTable" class="table_setup">表格设置</el-button>
      </div>
      <div class="info_tab">


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
    <AddCustomer :issender="true" :isModify="isModify" :isDbclick="isDbclick" :info="selectInfo" :orgid="orgid" :id='trackId' :popVisible.sync="AddCustomerVisible" @close="closeAddCustomer" @success="fetchData"  />
    <TableSetup :popVisible="setupTableVisible" @close="closeSetupTable" @success="setColumn" :columns="tableColumn"  />
  </div>
</template>
<script>
import { getExportExcel } from '@/api/company/customerManage'
import { postArtList, postCancelLoad, postCancelPut } from '@/api/operation/arteryDelivery'
import { postTmsFfinancialwayList, putStop } from '@/api/finance/financefinancialway'
import SearchForm from './components/search'
import TableSetup from '@/components/tableSetup'
import AddCustomer from './components/add'
import { mapGetters } from 'vuex'
import Pager from '@/components/Pagination/index'
import { objectMerge2, parseTime } from '@/utils/index'
import { PrintInFullPage, SaveAsFile } from '@/utils/lodopFuncs'

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
    orgid() {
    }
  },
  mounted() {
    this.searchQuery.vo.orgId = this.otherinfo.orgid
    this.fetchAllCustomer()
  },
  data() {
    return {
      loading: false,
      btnsize: 'mini',
      usersArr: [],
      total: 0,
      tablekey: 0,
      trackId: '',
      batchTypeId: '', // 批次状态
      // 加载状态
      // loading: true,
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
          financialWay: '', // 收支方式名称
          status: '',
          financialWayTypeId: ''
        }
      },
      tableColumn: [
        {
          label: '序号',
          prop: 'id',
          width: '160',
          fixed: true,
          slot: (scope) => {
            return ((this.searchQuery.currentPage - 1) * this.searchQuery.pageSize) + scope.$index + 1
          }
        }, {
          label: '所属网点',
          prop: 'orgName',
          width: '120',
          fixed: true
        }, {
          label: '收支方式',
          prop: 'financialWay',
          width: '110',
          fixed: true
        }, {
          label: '银行名称',
          prop: 'bankName',
          width: '140',
          fixed: false
        }, {
          label: '银行卡号',
          prop: 'bankAccount',
          width: '180',
          fixed: false
        }, {
          label: '开户人',
          prop: 'bankAccountName',
          width: '130',
          fixed: false
        }, {
          label: '支付宝账号',
          prop: 'alipayAccount',
          width: '160',
          fixed: false
        }, {
          label: '微信号',
          prop: 'wechatAccount',
          width: '150',
          fixed: false
        }, {
          label: '状态',
          prop: 'statusStr',
          width: '110',
          fixed: false
        }, {
          label: '创建人',
          prop: 'createBy',
          width: '110',
          fixed: false
        }, {
          label: '创建时间',
          prop: 'createTime',
          width: '160',
          slot: (scope) => {
            return `${parseTime(scope.row.createTime, '{y}-{m}-{d} {h}:{m}:{s}')}`
          },
          fixed: false
        }, {
          label: '备注',
          prop: 'remark',
          width: '150',
          fixed: false
        }
      ]
    }
  },
  methods: {
    fetchAllCustomer() {
      this.loading = true
      return postTmsFfinancialwayList(this.searchQuery).then(data => {
        this.usersArr = data.list
        this.total = data.total
        this.loading = false
      }).catch(err => {
        this.$message.error(err.errorInfo || err.text || '未知错误，请重试~')
      })
    },
    fetchData() {
      this.fetchAllCustomer()
    },
    handlePageChange(obj) {
      // Object.assign(this.searchQuery, obj)
      // this.fetchData()
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

      if (!this.selected.length && type !== 'storage' && type !== 'export') {
          // this.closeAddCustomer()
        this.$message({
          message: '请选择要操作的项~',
          type: 'warning'
        })
        return false
      }

      switch (type) {
        case 'export':
          SaveAsFile({
            data: this.selected.length ? this.selected : this.usersArr,
            columns: this.tableColumn

          })
          this.$refs.multipleTable.clearSelection()
          break
        // 新增
        case 'storage':
          this.selectInfo = {}
          this.isModify = false
          this.isDbclick = false
          this.openAddCustomer()
          break
          //  修改
        case 'modify':
          this.closeAddCustomer()
          if (this.selected.length > 1) {
            this.$message({
              message: '只能选择单条数据进行跟踪设置~',
              type: 'warning'
            })
            return false
          } else {
            this.selectInfo = this.selected[0]
            this.isModify = true
            this.isDbclick = false
            this.openAddCustomer()
          }

          break
          // 停用
        case 'stop':
          this.closeAddCustomer()
          if (this.selected.length > 1) {
            this.$message({
              message: '只能选择一条数据进行跟踪设置~',
              type: 'warning'
            })
            return false
          } else {
            if (this.selected[0].statusStr === '启用') {
              const id = this.selected[0].id
              putStop(id).then(res => {
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
                message: '当前收支方式已经在停用状态~'
              })
            }
          }

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
      this.selectInfo = row
      this.isModify = false
      this.isDbclick = true
      this.openAddCustomer()
    },
    setColumn(obj) { // 重绘表格列表
      this.tableColumn = obj
      this.tablekey = Math.random() // 刷新表格视图
    }
  }
}
</script>
