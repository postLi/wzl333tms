<template>
  <div class="tab-content" v-loading="loading">
    <!--<SearchForm :orgid="otherinfo.orgid" :issender="true" @change="getSearchParam" :btnsize="btnsize"/>-->
    <div class="tab_info">
      <div class="btns_box">
        <el-form :inline="true" :size="btnsize" label-position="right" label-width="70px" :model="searchForm"
                 class=" clearfix" style="float: left">
          <div class="">
            <el-form-item label="网点">
              <SelectTree v-model="searchForm.orgid" :orgid="otherinfo.orgid" clearible/>
            </el-form-item>

          </div>
        </el-form>
        <el-button class="table_setup" type="success" :size="btnsize" icon="el-icon-sort-up" @click="doAction('doLast')" plain
                   v-has:PICK_FINASH>上一步
        </el-button>
        <el-button class="table_setup" type="primary" :size="btnsize" icon="el-icon-circle-plus" @click="doAction('doAdd')" plain
                   v-has:PICK_SEL>新增
        </el-button>
      </div>
      <div class="info_tab">


        <el-table ref="multipleTable" @row-dblclick="getDbClick" :data="usersArr" border @row-click="clickDetails"
                  @selection-change="getSelection" height="100%" tooltip-effect="dark" :key="tablekey"
                  style="width:100%;" :default-sort="{prop: 'id', order: 'ascending'}" stripe>
          <!--<el-table-column fixed sortable type="selection" width="50"></el-table-column>-->
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
    <AddCustomer :issender="true" :isModify="isModify" :isDbclick="isDbclick" :info="selectInfo" :orgid="orgid"
                 :popVisible.sync="AddCustomerVisible" @close="closeAddCustomer" @success="fetchData" :key="mykey"/>
    <TableSetup :popVisible="setupTableVisible" :columns="tableColumn" @close="closeSetupTable"
                @success="setColumn"></TableSetup>
    <PickupMain :popVisible.sync="pickMaintainisible" :isDepMain="isDepMain" @close="openpickMaintainisible"
                @success="fetchData" :dotInfo="selectInfo"></PickupMain>
    <PickupRelevance :popVisible.sync="releMaintainisible" :isDepMain="isDepMain" @close="openpickReletainisible"
                     @success="fetchData" :dotInfo="selectInfo"></PickupRelevance>

  </div>
</template>
<script>
  import {getExportExcel} from '@/api/company/customerManage'
  import {fetchPostlist, deletebatchDelete} from '@/api/operation/pickup'
  import SelectTree from '@/components/selectTree/index'
  import SearchForm from './components/search'
  import TableSetup from '@/components/tableSetup'
  import AddCustomer from './components/add'
  import PickupMain from './components/pickupMain'
  import PickupRelevance from './components/pickupRelevance'
  import {mapGetters} from 'vuex'
  import Pager from '@/components/Pagination/index'
  import {objectMerge2} from '@/utils/index'
  import {PrintInFullPage, SaveAsFile} from '@/utils/lodopFuncs'

  export default {
    components: {
      SearchForm,
      Pager,
      TableSetup,
      AddCustomer,
      PickupMain,
      SelectTree,
      PickupRelevance
    },
    computed: {
      ...mapGetters([
        'otherinfo'
      ]),
      orgid() {
        return this.isModify ? this.selectInfo.orgid : this.searchQuery.vo.orgid || this.otherinfo.orgid
      }
    },
    mounted() {
      this.searchQuery.vo.orgid = this.otherinfo.orgid
    },
    data() {
      return {
        searchForm: {
          orgid: '',
        },
        mykey: '',
        btnsize: 'mini',
        usersArr: [],
        total: 0,
        tablekey: 0,
        // 加载状态
        loading: false,
        setupTableVisible: false,
        AddCustomerVisible: false,
        pickMaintainisible: false,
        releMaintainisible: false,
        isModify: false,
        isDepMain: false,
        isDbclick: false,
        selectInfo: {},
        // 选中的行
        selected: [],
        searchQuery: {
          'currentPage': 1,
          'pageSize': 100,
          'vo': {
            'orgid': 1,
            pickupStatus: '',
            startTime: '',
            pickupBatchNumber: '',
            truckIdNumber: '',
            driverName: ''
          }
        },
        tableColumn: [{
          label: '序号',
          prop: 'id',
          width: '70',
          fixed: true,
          slot: (scope) => {
            return ((this.searchQuery.currentPage - 1) * this.searchQuery.pageSize) + scope.$index + 1
          }
        }, {
          label: '核销方向',
          prop: 'pickupBatchNumber',
          width: '',
          fixed: true
        }, {
            label: '备注',
            prop: 'carriage',
            width: '',
            fixed: false
          }, {
            label: '操作',
            prop: 'collectionFee',
            width: '',
            fixed: false
          }
        ]
      }
    },
    methods: {
      fetchAllCustomer() {
        this.loading = true
        return fetchPostlist(this.searchQuery).then(data => {
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
      showImport() {
        // 显示导入窗口
      },
      doAction(type) {
        // 判断是否有选中项
        if (!this.selected.length && type !== 'doAdd' && type !== 'doLast' && type !== 'print') {
          this.closeAddCustomer()
          this.$message({
            message: '请选择要操作的项~',
            type: 'warning'
          })
          return false
        }
        switch (type) {
          case 'doLast':
            this.$router.push({
              path: '/finance/financeInfo/subjectClose',
              // query: {
              //   tab: '网点对账-对账明细',
              //   arriveOrgid: row.arriveOrgid,
              //   orgid: row.orgid,
              //   orgName: row.arriveOrgName
              //   // id: row.carrierId
              // }
            })
            break
          case 'export':
            SaveAsFile({
              data: this.selected.length ? this.selected : this.usersArr,
              columns: this.tableColumn,
              name: '提货'
            })
            this.$refs.multipleTable.clearSelection()
            // if (this.selected.length === 0) {
            //   SaveAsFile(this.usersArr, this.tableColumn)
            // } else {
            //   // 筛选选中的项
            //   SaveAsFile(this.selected, this.tableColumn)
            // }
            break
          case 'print':
            PrintInFullPage({
              data: this.selected.length ? this.selected : this.usersArr,
              columns: this.tableColumn
            })
            break
          // 新增
          case 'doAdd':
            this.closeAddCustomer()
            this.isModify = false
            this.isDbclick = false
            this.selectInfo = {}
            this.openAddCustomer()
            break
          // 修改
          case 'modify':
            this.closeAddCustomer()
            this.isModify = true
            this.isDbclick = false
            if (this.selected.length > 1) {
              this.$message({
                message: '每次只能修改单条数据~',
                type: 'warning'
              })
              return false
            }
            if (this.selected[0].pickupStatus === 237) {
              this.$message({
                message: '提货完成不能修改~',
                type: 'warning'
              })
              this.$refs.multipleTable.clearSelection()
              return false
            }
            this.selectInfo = this.selected[0]
            this.openAddCustomer()
            break
          // 提货完成
          case 'finishPick':
            this.closeAddCustomer()
            if (this.selected.length > 1) {
              this.$message({
                message: '每次只能生成单条数据~',
                type: 'warning'
              })
              return false
            }
            if (this.selected[0].pickupStatus === 237) {
              this.$message({
                message: '已经提货完成了~',
                type: 'warning'
              })
              this.$refs.multipleTable.clearSelection()
              return false
            }
            this.selectInfo = this.selected[0]
            this.openpickMaintainisible()
            break
          // 关联运单
          case 'relevance':
            this.closeAddCustomer()
            if (this.selected.length > 1) {
              this.$message({
                message: '每次只能生成单条数据~',
                type: 'warning'
              })
              return false
            }
            this.selectInfo = this.selected[0]
            this.openpickReletainisible()
            break
          // 删除客户
          case 'delete':
            const ids = this.selected.filter(el => {
              return el.pickupStatusName === '提货中'
            }).map(el => {
              return el.id
            })
            if (!ids.length) {
              this.$message({
                type: 'info',
                message: '提货完成的提货单不能删除!'
              })
              return false
            } else {
              ids = ids.join(',')
              this.$confirm('确定要删除提货批次吗？', '提示', {
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
              })
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
        // this.mykey = Math.random()
        this.AddCustomerVisible = false
      },
      openpickMaintainisible() {
        this.pickMaintainisible = true
        this.releMaintainisible = false
      },
      openpickReletainisible() {
        this.releMaintainisible = true
        this.pickMaintainisible = false
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
        this.$refs.multipleTable.clearSelection()
      },
      setColumn(obj) {
        this.tableColumn = obj
        this.tablekey = Math.random()
      }
    }
  }
</script>
