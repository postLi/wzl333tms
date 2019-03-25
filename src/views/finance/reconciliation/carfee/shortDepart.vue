<template>
  <div class="tab-content miniHeaderSearch" v-loading="loading">
    <SearchForm :orgid="otherinfo.orgid" title="发车" :issender="true" @change="getSearchParam" :btnsize="btnsize" />
    <div class="tab_info">
      <div class="btns_box">

        <el-button type="primary" :size="btnsize" icon="el-icon-plus" plain @click="doAction('storage')" v-has:FINANCE_CARCREAT1 >创建对账单</el-button>
        <el-button type="success" :size="btnsize" icon="el-icon-tickets" plain @click="doAction('completion')" v-has:FINANCE_CARFINISHI1 >对账完成</el-button>
        <el-button type="info" :size="btnsize" icon="el-icon-error" plain @click="doAction('cancelCom')" v-has:FINANCE_CARCANCEL1 >取消完成</el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-edit" plain @click="doAction('modify')" v-has:FINANCE_CARFIND1 >修改查看</el-button>
        <el-button type="danger" :size="btnsize" icon="el-icon-delete" plain @click="doAction('detele')" v-has:FINANCE_CARDEL1 >删除</el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-download" @click="doAction('export')" plain v-has:FINANCE_CAREXP1 >导出</el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-printer" @click="doAction('print')" plain v-has:FINANCE_CARPRI1 >打印</el-button>

        <el-button type="primary" :size="btnsize" icon="el-icon-setting" plain @click="setTable" class="table_setup">表格设置</el-button>
      </div>
      <div class="info_tab">

         <el-table ref="multipleTable" @row-dblclick="getDbClick" :data="usersArr" border @row-click="clickDetails" @selection-change="getSelection" height="100%" tooltip-effect="dark" :key="tablekey" style="width:100%;" :default-sort="{prop: 'id', order: 'ascending'}" stripe>
          <el-table-column fixed sortable type="selection" width="50"></el-table-column>
          <template v-for="column in tableColumn">
            <el-table-column :key="column.id" :fixed="column.fixed" sortable :label="column.label" :prop="column.prop" v-if="!column.slot" :width="column.width">
               <template slot="header" slot-scope="scope">
                <tableHeaderSearch :scope="scope" :query="searchQuery" @change="changeKey"/>
              </template>
              <template slot-scope="scope">{{scope.row[column.prop]}}</template>
            </el-table-column>
            <el-table-column :key="column.id" :fixed="column.fixed" sortable :label="column.label" v-else :width="column.width" :prop="column.prop">
               <template slot="header" slot-scope="scope">
                <tableHeaderSearch :scope="scope" :query="searchQuery" @change="changeKey"/>
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
    <IndexDialog :issender="true" :isModify="isModify" :isDbclick="isDbclick" :dotInfo="selectInfo" :orgid="orgid" :id='trackId' :popVisible.sync="AddCustomerVisible" @close="closeAddCustomer" @success="fetchData"></IndexDialog>
    <TableSetup :popVisible="setupTableVisible" @close="closeSetupTable" @success="setColumn" :columns="tableColumn"  />
  </div>
</template>
<script>
  import { getExportExcel } from '@/api/company/customerManage'
  import { postCarfShortDetailList, deleteCarShort, postUpdateBillCheckSelective } from '@/api/finance/fin_carfee'
  import SearchForm from './components/search'
  import TableSetup from '@/components/tableSetup'
  import IndexDialog from './components/indexDialog'
  import { mapGetters } from 'vuex'
  import Pager from '@/components/Pagination/index'
import { PrintInFullPage, SaveAsFile } from '@/utils/lodopFuncs'
import tableHeaderSearch from '@/components/tableHeaderSearch'
  export default {
    components: {
      SearchForm,
      Pager,
      TableSetup,
      IndexDialog,
      tableHeaderSearch
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
      // this.searchQuery.vo.memberId = this.$route.query.id
    },
    data() {
      return {
        tablekey: 0,
        loading: true,
        btnsize: 'mini',
        usersArr: [],
        total: 0,
        trackId: '',
        batchTypeId: '', // 批次状态
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
            memberName: '', //
            memberPerson: '', //
            checkStatus: '', // 0未 1已
            loadTypeId: 38, //
            startTime: '', //
            endTime: ''
          }
        },
        tableColumn: [
          {
            label: '序号',
            prop: 'id',
            width: '70',
            fixed: true,
            slot: (scope) => {
              return ((this.searchQuery.currentPage - 1) * this.searchQuery.pageSize) + scope.$index + 1
            }
          }, {
            label: '发车网点',
            prop: 'orgName',
            width: '120',
            fixed: true
          }, {
            label: '车牌号',
            prop: 'memberName',
            width: '130',
            fixed: true
          }, {
            label: '司机',
            prop: 'memberPerson',
            width: '120',
            fixed: false
          }, {
            label: '创建时间',
            prop: 'createTime',
            width: '160',
            fixed: false
          }, {
            label: '未付账款',
            prop: 'payAmount',
            width: '120',
            fixed: false
          }, {
            label: '已付账款',
            prop: 'hadPayAmount',
            width: '120',
            fixed: false
          }, {
            label: '司机电话',
            prop: 'memberPersonPhone',
            width: '120',
            fixed: false
          }, {
            label: '开始时间',
            prop: 'checkStartTime',
            width: '160',
            fixed: false
          }, {
            label: '结束时间',
            prop: 'checkEndTime',
            width: '160',
            fixed: false
          }, {
            label: '运输总数',
            prop: 'totalCount',
            width: '120',
            fixed: false
          }, {
            label: '对账状态',
            prop: 'checkStatusZh',
            width: '120',
            fixed: false
          }, {
            label: '银行卡号',
            prop: 'bankAccount',
            width: '180',
            fixed: false
          }, {
          label: '开户行',
          prop: 'bankName',
          width: '120',
          fixed: false
        }, {
          label: '微信',
          prop: 'wechatAccount',
          width: '150',
          fixed: false
        }, {
          label: '支付宝',
          prop: 'alipayAccount',
          width: '150',
          fixed: false
        }, {
          label: '备注',
          prop: 'remark',
          width: '130',
          fixed: false
        }
        ]
      }
    },
    methods: {
      changeKey(obj) {
        this.total = 0
        this.searchQuery = obj
        this.fetchAllCustomer()
      },
      fetchAllCustomer() {
        this.loading = true
        return postCarfShortDetailList(this.searchQuery).then(data => {
          this.usersArr = data.list
          this.total = data.total
          this.loading = false
        }).catch(err => {
          this._handlerCatchMsg(err)
          this.loading = false
        })
      },
      fetchData() {
        this.fetchAllCustomer()
      },
      handlePageChange(obj) {
        this.searchQuery.currentPage = obj.pageNum
        this.searchQuery.pageSize = obj.pageSize
        this.fetchData()
      },
      getSearchParam(obj) {
        this.searchQuery.currentPage = this.$options.data().searchQuery.currentPage
        this.searchQuery.pageSize = this.$options.data().searchQuery.pageSize
        this.searchQuery.vo = Object.assign(this.searchQuery.vo, obj)
        this.fetchAllCustomer()
      },
      showImport() {
        // 显示导入窗口
      },
      doAction(type) {
        // 判断是否有选中项

        if (!this.selected.length && type !== 'storage' && type !== 'export' && type !== 'print') {
          // this.closeAddCustomer()
          this.$message({
            message: '请选择要操作的项~',
            type: 'warning'
          })
          return false
        }

        switch (type) {
          // 新增
          case 'storage':
            this.$router.push({
              path: '/finance/reconciliation/carfee/components/shortRecon',
              query: {
                tab: '短驳对账-创建对账'
              }
            })

            break
        // 修改
          case 'modify':
            this.$router.push({
              path: '/finance/reconciliation/carfee/components/shortRecon',
              query: {
                tab: '短驳对账-修改查看',
                id: this.selected[0].id
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
                return false
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
                this.loading = true
                _data.id = this.selected[0].id
                postUpdateBillCheckSelective(_data).then(res => {
                  this.loading = false
                  this.$message({
                    type: 'success',
                    message: '已取消对账~'
                  })
                  this.fetchData()
                  this.loading = false
                }).catch(err => {
                  this._handlerCatchMsg(err)
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
                this.loading = true
                deleteCarShort(id).then(res => {
                  this.$message({
                    type: 'success',
                    message: '删除成功~'
                  })
                  this.fetchData()
                  this.loading = false
                }).catch(err => {
                  this._handlerCatchMsg(err)
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
          path: '/finance/reconciliation/carfee/components/shortRecon',
          query: {
            tab: '短驳对账-修改查看',
            id: row.id
          }
        })
        this.$refs.multipleTable.clearSelection()
      },
      setColumn(obj) { // 重绘表格列表
        this.tableColumn = obj
        this.tablekey = Math.random() // 刷新表格视图
      }
    }
  }
</script>

