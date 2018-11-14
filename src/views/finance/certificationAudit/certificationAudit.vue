<template>
  <div class="tab-content" v-loading="loading">
    <SearchForm :orgid="otherinfo.orgid" :issender="true" @change="getSearchParam" :btnsize="btnsize"/>
    <div class="tab_info">
      <div class="btns_box">
        <el-button type="success" :size="btnsize" icon="el-icon-document" @click="doAction('theAudit')" plain
                   v-has:PICK_FINASH>反审核
        </el-button>
        <el-button type="info" :size="btnsize" icon="el-icon-tickets" @click="doAction('audit')" plain
                   v-has:PICK_SEL>审核
        </el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-download" @click="doAction('export')" plain
                   v-has:PICK_EXP>导出
        </el-button>
        <!--<el-button type="primary" :size="btnsize" icon="el-icon-printer" @click="doAction('print')" plain-->
        <!--v-has:PICK_PRI>打印-->
        <!--</el-button>-->
        <!--<el-button type="primary" :size="btnsize" icon="el-icon-edit-outline" @click="doAction('import')" plain>批量导入</el-button>-->
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
    <TableSetup :popVisible="setupTableVisible" :columns="tableColumn" @close="closeSetupTable"
                @success="setColumn"></TableSetup>

  </div>
</template>
<script>
  import {getExportExcel} from '@/api/company/customerManage'
  import {postFinCerList, postFinCerFicationcert} from '@/api/finance/finCertificationAudit'
  import SearchForm from './components/search'
  import TableSetup from '@/components/tableSetup'
  import {mapGetters} from 'vuex'
  import Pager from '@/components/Pagination/index'
  import {objectMerge2} from '@/utils/index'
  import {PrintInFullPage, SaveAsFile} from '@/utils/lodopFuncs'

  export default {
    components: {
      SearchForm,
      Pager,
      TableSetup,
    },
    computed: {
      ...mapGetters([
        'otherinfo'
      ]),
      orgid() {
        // return this.isModify ? this.selectInfo.orgid : this.searchQuery.vo.orgid || this.otherinfo.orgid
      }
    },
    mounted() {
      this.searchQuery.vo.orgId = this.otherinfo.orgid
    },
    data() {
      return {
        mykey: '',
        btnsize: 'mini',
        usersArr: [],
        total: 0,
        tablekey: 0,
        // 加载状态
        loading: true,
        setupTableVisible: false,
        selectInfo: {},
        // 选中的行
        selected: [],
        searchQuery: {
          'currentPage': 1,
          'pageSize': 100,
          'vo': {
            'orgId': 1,
            verifyStatus: '',
            paymentsType: '',
            dataSrc: '',
            startTime: '',
            endTime: '',
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
            label: '审核状态',
            prop: 'verifyStatusZh',
            width: '110',
            fixed: true,
          }, {
            label: '来源',
            prop: 'dataSrcZh',
            width: '110',
            fixed: true
          },
          {
            label: '核销项目',
            prop: 'subjectName',
            width: '120',
            fixed: false
          }, {
            label: '类别',
            prop: 'verificationWay',
            width: '130',
            fixed: false,

          }, {
            label: '方向',
            prop: 'paymentsTypeZh',
            width: '170',
            fixed: false,
          }, {
            label: '金额',
            prop: 'amount',
            width: '120',
            fixed: false
          }, {
            label: '凭证号',
            prop: 'certNo',
            width: '150',
            fixed: false
          }, {
            label: '凭证日期',
            prop: 'certTime',
            width: '160',
            fixed: false
          }, {
            label: '系统操作日期',
            prop: 'createTime',
            width: '160',
            fixed: false
          }, {
            label: '一级科目',
            prop: 'subjectOne',
            width: '120',
            fixed: false
          }, {
            label: '二级科目',
            prop: 'subjectTwo',
            width: '120',
            fixed: false
          }, {
            label: '三级科目',
            prop: 'subjectThree',
            width: '120',
            fixed: false
          }, {
            label: '四级科目',
            prop: 'subjectFour',
            width: '120',
            fixed: false
          }, {
            label: '摘要',
            prop: 'remark',
            width: '180',
            fixed: false
          }, {
            label: '核销网点',
            prop: 'orgName',
            width: '120',
            fixed: false
          }, {
            label: '笔数',
            prop: 'verifyCount',
            width: '120',
            fixed: false
          }, {
            label: '发票号码',
            prop: 'invoiceNo',
            width: '150',
            fixed: false
          }, {
            label: '收据号码',
            prop: 'receiptNo',
            width: '150',
            fixed: false
          }, {
            label: '支票号码',
            prop: 'checkNo',
            width: '150',
            fixed: false
          }, {
            label: '手工凭证号',
            prop: 'manualCert',
            width: '150',
            fixed: false
          }
        ]
      }
    },
    methods: {
      fetchAllCustomer() {
        this.loading = true
        return postFinCerList(this.searchQuery).then(data => {
          this.usersArr = data.list
          this.total = data.total
          this.loading = false
        }).catch((err) => {
          this.loading = false
          this._handlerCatchMsg(err)
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
        this.searchQuery.vo = objectMerge2(this.searchQuery.vo, obj)
        this.fetchAllCustomer()
      },
      doAction(type) {
        // 判断是否有选中项
        if (!this.selected.length && type !== 'export' && type !== 'print') {
          this.closeAddCustomer()
          this.$message({
            message: '请选择要操作的项~',
            type: 'warning'
          })
          return false
        }
        switch (type) {
          case 'theAudit':
            const idLists = this.selected.filter(el => {
              //审核状态, 0 未审核, 1 已审核
              return el.verifyStatus === 1
            }).map(el => {
              return el.id
            })
            if (idLists.length) {
              this.$confirm('你已选择' + idLists.length + '条凭证？', '提示', {
                confirmButtonText: '审核',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                const data = {}
                data.idList = idLists
                data.verifyStatus = 0
                postFinCerFicationcert(data).then(res => {
                  this.$message({
                    type: 'success',
                    message: '审核成功!'
                  })
                  this.fetchData()
                }).catch(err => {
                  this._handlerCatchMsg(err)
                })
              })
            } else {
              this.$message.info('凭证还未审核，不可以反审核~')
              return false
            }
            break
          case 'audit':
            const idList = this.selected.filter(el => {
              //审核状态, 0 未审核, 1 已审核
              return el.verifyStatus === 0
            }).map(el => {
              return el.id
            })
            if (idList.length) {
              this.$confirm('你已选择' + idList.length + '条凭证？', '提示', {
                confirmButtonText: '审核',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                const data = {}
                data.idList = idList
                data.verifyStatus = 1
                postFinCerFicationcert(data).then(res => {
                  this.$message({
                    type: 'success',
                    message: '审核成功!'
                  })
                  this.fetchData()
                }).catch(err => {
                  this._handlerCatchMsg(err)
                })
              })
            } else {
              this.$message.info('凭证已经审核，不能重复审核~')
              return false
            }
            break
          case 'export':
            SaveAsFile({
              data: this.selected.length ? this.selected : this.usersArr,
              columns: this.tableColumn,
              name: '凭证审核'
            })
            this.$refs.multipleTable.clearSelection()

            break
          case 'print':
            PrintInFullPage({
              data: this.selected.length ? this.selected : this.usersArr,
              columns: this.tableColumn
            })
            break
        }
        this.$refs.multipleTable.clearSelection()
      },
      setTable() {
        this.setupTableVisible = true
      },
      closeSetupTable() {
        this.setupTableVisible = false
      },
      clickDetails(row, event, column) {
        this.$refs.multipleTable.toggleRowSelection(row)
      },
      getSelection(selection) {
        this.selected = selection
      },
      getDbClick(row, event) {
        this.$router.push({
          path: '/finance/cashDetail',
          query: {
            recordId: row.id,
            orgId: row.orgId
          }
        })
        this.$refs.multipleTable.clearSelection()
      },
      setColumn(obj) {
        this.tableColumn = obj
        this.tablekey = Math.random()
      }
    }
  }
</script>
