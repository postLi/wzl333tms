<template>
  <div class="tab-content" v-loading="loading">
    <!--<SearchForm :orgid="otherinfo.orgid" :issender="true" @change="getSearchParam" :btnsize="btnsize"/>-->
    <div class="tab_info">
      <div class="btns_box">
        <el-form :inline="true" :size="btnsize" label-position="right" label-width="70px" :model="searchQuery"
                 class=" clearfix" style="float: left">
          <div class="">
            <el-form-item label="网点">
              <SelectTree v-model="searchQuery.vo.companyId" :orgid="otherinfo.companyId" clearible @change="searchOrgid"/>
            </el-form-item>

          </div>
        </el-form>
        <el-button class="table_setup" type="success" :size="btnsize" icon="el-icon-sort-down"
                   @click="doAction('doNext')" plain
                   v-has:PICK_FINASH>下一步
        </el-button>
        <el-button class="table_setup" type="success" :size="btnsize" icon="el-icon-sort-up" @click="doAction('doLast')"
                   plain
                   v-has:PICK_SEL>上一步
        </el-button>

        <!--<el-button type="primary" :size="btnsize" icon="el-icon-printer" @click="doAction('print')" plain-->
        <!--v-has:PICK_PRI>打印-->
        <!--</el-button>-->
        <!--<el-button type="primary" :size="btnsize" icon="el-icon-edit-outline" @click="doAction('import')" plain>批量导入</el-button>-->
        <!--<el-button type="primary" :size="btnsize" icon="el-icon-setting" plain @click="setTable" class="table_setup">-->
        <!--表格设置-->
        <!--</el-button>-->
      </div>
      <div class="info_tab">

        <el-table
          ref="multipleTable"
          :data="usersArr"
          stripe
          border
          @selection-change="getSelection"
          height="100%"
          tooltip-effect="dark"
          :default-sort="{prop: 'id', order: 'ascending'}"
          style="width: 100%">
          <el-table-column
            fixed
            sortable
            prop="id"
            label="序号"
            width="150">
            <template slot-scope="scope">{{ ((searchQuery.currentPage - 1)*searchQuery.pageSize) + scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column
            fixed
            sortable
            prop="subjectsFeeType"
            label="核销科目">
          </el-table-column>
          <el-table-column
            fixed
            sortable
            prop="oneName"
            label="一级科目">
          </el-table-column>
          <el-table-column
            fixed
            sortable
            prop="twoName"
            label="二级科目">
          </el-table-column>
          <el-table-column
            fixed
            sortable
            prop="threeName"
            label="三级科目">
          </el-table-column>
          <el-table-column
            fixed
            sortable
            prop="fourName"
            label="四级科目">


          </el-table-column>
          <el-table-column
            fixed
            sortable
            label="操作">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">修改</el-button>
            </template>
          </el-table-column>
        </el-table>

      </div>
      <!--<div class="info_tab_footer">共计:{{ total }}-->
        <!--<div class="show_pager">-->
          <!--<Pager :total="total" @change="handlePageChange"/>-->
        <!--</div>-->
      <!--</div>-->
    </div>
    <!--<TableSetup :popVisible="setupTableVisible" :columns="tableColumn" @close="closeSetupTable"-->
    <!--@success="setColumn"></TableSetup>-->
    <SubjectDialog :isShow.sync='showDialog' @close='closeShowDialog'
                   :isSubClose="isSubClose" :info="selectInfo"></SubjectDialog>
  </div>
</template>
<script>
  import {getExportExcel} from '@/api/company/customerManage'
  import {fetchPostlist, deletebatchDelete} from '@/api/operation/pickup'
  import {postFinRsrelationList} from '@/api/finance/finanInfo'
  import SearchForm from './components/search'
  import TableSetup from '@/components/tableSetup'
  import {mapGetters} from 'vuex'
  import Pager from '@/components/Pagination/index'
  import {objectMerge2} from '@/utils/index'
  import {PrintInFullPage, SaveAsFile} from '@/utils/lodopFuncs'
  import SelectTree from '@/components/selectTree/index'
  import SubjectDialog from './components/subjectDialog'

  export default {
    components: {
      SearchForm,
      Pager,
      TableSetup,
      SubjectDialog,

      SelectTree
    },
    computed: {
      ...mapGetters([
        'otherinfo'
      ]),
      orgid() {
        // return this.isModify ? this.selectInfo.orgid : this.searchQuery.vo.orgid || this.otherinfo.orgid
      }
    },

    data() {
      return {
        searchForm: {
          companyId: '',
        },
        mykey: '',
        btnsize: 'mini',
        usersArr: [],
        total: 0,
        tablekey: 0,
        // 加载状态
        loading: true,
        showDialog: false,
        isSubClose: false,
        selectInfo: {},
        // 选中的行
        selected: [],
        searchQuery: {
          'currentPage': 1,
          'pageSize': 100,
          'vo': {
            'companyId': 1
          }
        },
        tableColumn: [{
          label: '核销科目',
          prop: 'pickupBatchNumber',
          width: '',
          fixed: true
        }, {
          label: '一级科目',
          prop: 'pickupStatusName',
          width: '',
          fixed: true
        },
          {
            label: '一级科目',
            prop: 'customerName',
            width: '',
            fixed: false
          }, {
            label: '三级科目',
            prop: 'customerMobile',
            width: '',
            fixed: false
          }, {
            label: '四级科目',
            prop: 'detailedAddress',
            width: '',
            fixed: false
          }, {
            label: '操作',
            prop: 'pickupName',
            width: '',
            fixed: false
          },
        ]
      }
    },
    mounted() {
      this.searchQuery.vo.companyId = this.otherinfo.companyId
      // this.usersArr = this.tableColumn
      this.fetchData()

    },
    methods: {
      searchOrgid(item) {
        this.searchQuery.vo.companyId = item
        this.fetchData()
      },
      handleClick(row) {
        this.openShowDialog()
        this.selectInfo = row
        this.isSubClose = true
      },
      fetchAllCustomer() {
        this.loading = true
        return postFinRsrelationList(this.searchQuery).then(data => {
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
      showImport() {
        // 显示导入窗口
      },
      doAction(type) {
        // 判断是否有选中项
        if (!this.selected.length && type !== 'doNext' && type !== 'doLast' && type !== 'print') {
          // this.closeAddCustomer()
          this.$message({
            message: '请选择要操作的项~',
            type: 'warning'
          })
          return false
        }
        switch (type) {
          case 'doNext':
            this.$router.push({
              path: '/finance/financeInfo/subjectDirection',
              // query: {
              //   tab: '网点对账-对账明细',
              //   arriveOrgid: row.arriveOrgid,
              //   orgid: row.orgid,
              //   orgName: row.arriveOrgName
              //   // id: row.carrierId
              // }
            })
            break
          case 'doLast':
            this.$router.push({
              path: '/finance/financeInfo/subjectInfo',
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
      clickDetails(row, event, column) {
        this.$refs.multipleTable.toggleRowSelection(row)
      },
      getSelection(selection) {
        this.selected = selection
      },
      setColumn(obj) {
        this.tableColumn = obj
        this.tablekey = Math.random()
      },
      closeShowDialog() {
        this.showDialog = false
      },
      openShowDialog() {
        this.showDialog = true
      },
    }
  }
</script>
