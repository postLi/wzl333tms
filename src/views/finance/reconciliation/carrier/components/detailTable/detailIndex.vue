<template>
  <!---->
  <div class="tab-content" v-loading="loading">
    <SearchForm :orgid="searchQuery.vo.orgid" :issender="true" @change="getSearchParam" :btnsize="btnsize"/>
    <div class="tab_info">
      <div class="btns_box">

        <el-button type="primary" :size="btnsize" icon="el-icon-plus" plain @click="doAction('storage')">创建对账单
        </el-button>
        <el-button type="success" :size="btnsize" icon="el-icon-tickets" plain @click="doAction('completion')">对账完成
        </el-button>
        <el-button type="info" :size="btnsize" icon="el-icon-error" plain @click="doAction('cancelCom')">取消完成
        </el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-edit" plain @click="doAction('modify')">修改查看</el-button>
        <el-button type="danger" :size="btnsize" icon="el-icon-delete" plain @click="doAction('detele')">删除</el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-download" @click="doAction('export')" plain>导出
        </el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-printer" @click="doAction('print')" plain>打印</el-button>

        <el-button type="primary" :size="btnsize" icon="el-icon-setting" plain @click="setTable" class="table_setup">
          表格设置
        </el-button>
      </div>
      <div class="info_tab">

        <el-table ref="multipleTable" @row-dblclick="getDbClick" :data="usersArr" border @row-click="clickDetails"
                  @selection-change="getSelection" height="100%" tooltip-effect="dark" :key="tablekey"
                  style="width:100%;" :default-sort="{prop: 'id', order: 'ascending'}" stripe>
          <el-table-column fixed sortable type="selection" width="50"></el-table-column>
          <template v-for="column in tableColumn">
            <el-table-column :key="column.id" :fixed="column.fixed" sortable :label="column.label" :prop="column.prop"
                             v-if="!column.slot" :width="column.width"></el-table-column>
            <el-table-column :key="column.id" :fixed="column.fixed" sortable :label="column.label" v-else
                             :width="column.width">
              <template slot-scope="scope">
                <span class="clickitem" v-if="column.click" v-html="column.slot(scope)"
                      @click.stop="column.click(scope)"></span>
                <span v-else v-html="column.slot(scope)"></span>
              </template>
            </el-table-column>
          </template>
        </el-table>
      </div>
      <div class="info_tab_footer">共计:{{ total }}
        <div class="show_pager">
          <Pager :total="total" @change="handlePageChange"/>
        </div>
      </div>
    </div>
    <IndexDialog :issender="true" :isModify="isModify" :isDbclick="isDbclick" :dotInfo="selectInfo" :orgid="orgid"
                 :id='trackId' :popVisible.sync="AddCustomerVisible" @close="closeAddCustomer"
                 @success="fetchData"></IndexDialog>
    <TableSetup :popVisible="setupTableVisible" :columns='tableColumn' @close="closeSetupTable"
                @success="setColumn"></TableSetup>
  </div>
</template>
<script>
  import {getExportExcel} from '@/api/company/customerManage'
  import {postCarrierdetailList} from '@/api/finance/fin_carrier'
  import {deleteCarShort, postUpdateBillCheckSelective} from '@/api/finance/fin_carfee'
  import SearchForm from './components/search'
  import TableSetup from '@/components/tableSetup'
  import IndexDialog from './components/indexDialog'
  import {mapGetters} from 'vuex'
  import Pager from '@/components/Pagination/index'
  import {PrintInFullPage, SaveAsFile} from '@/utils/lodopFuncs'

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
      this.searchQuery.vo.orgid = this.$route.query.orgid
      this.searchQuery.vo.carrierId = this.$route.query.id
    },
    data() {
      return {
        tablekey: 0,
        btnsize: 'mini',
        usersArr: [],
        total: 0,
        trackId: '',
        // 加载状态
        loading: false,
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
            'orgid': '',
            carrierId: 1, //
            checkStatus: '', // 0未 1已
            startTime: '', //
            endTime: ''
          }
        },
        tableColumn: [
          {
            label: '序号',
            prop: 'id',
            width: '100',
            fixed: true,
            slot: (scope) => {
              return ((this.searchQuery.currentPage - 1) * this.searchQuery.pageSize) + scope.$index + 1
            }
          }, {
            label: '网点',
            prop: 'orgName',
            width: '130',
            fixed: true
          }, {
            label: '承运商',
            prop: 'memberName',
            width: '130',
            fixed: true
          }, {
            label: '对账单名',
            prop: 'checkBillName',
            width: '320',
            fixed: false
          }, {
            label: '创建时间',
            prop: 'createTime',
            width: '160',
            fixed: false
          }, {
            label: '对账编号',
            prop: 'checkBillCode',
            width: '280',
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
            label: '未收账款',
            prop: 'receivableFee',
            width: '150',
            fixed: false
          }, {
            label: '未付账款',
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
            label: '核销方式',
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
        return postCarrierdetailList(this.searchQuery).then(data => {
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

        if (!this.selected.length && type !== 'storage' && type !== 'print' && type !== 'export') {
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
              path: '/finance/reconciliation/carrier/detailTable/carrierRecon',
              query: {
                tab: '承运商对账-创建对账',
                id: this.$route.query.id
              }
            })

            break
          // modify
          case 'modify':
            this.$router.push({
              path: '/finance/reconciliation/carrier/detailTable/carrierRecon',
              query: {
                tab: '承运商对账-修改查看',
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
                deleteCarShort(id).then(res => {
                  this.loading = false
                  this.$message({
                    type: 'success',
                    message: '保存成功~'
                  })
                  this.fetchData()
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
          case 'export':
            this.closeAddCustomer()
            SaveAsFile({
              data: this.selected.length ? this.selected : this.usersArr,
              columns: this.tableColumn,
              name: '承运商全部明细'
            })
            break
          case 'print': // 打印
            this.closeAddCustomer()
            PrintInFullPage({
              data: this.selected.length ? this.selected : this.usersArr,
              columns: this.tableColumn,
              name: '承运商全部明细'
            })
            break;
          // 导出
          case 'export':
            SaveAsFile({
              data: this.selected.length ? this.selected : this.usersArr,
              columns: this.tableColumn
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
          path: '/finance/reconciliation/carrier/detailTable/carrierRecon',
          query: {
            tab: '承运商对账-修改查看',
            id: row.id,
            urlId: this.$route.query.id
          }
        })
      },
      setColumn(obj) {
        this.tableColumn = obj
        this.tablekey = Math.random()
      }
    }
  }
</script>
