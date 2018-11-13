<template>
  <div class="tab-content" v-loading="loading">
    <!--<SearchForm :orgid="otherinfo.orgid" :issender="true" @change="getSearchParam" :btnsize="btnsize"/>-->
    <div class="tab_info">

      <div class="btns_box">
        <!--<el-form :inline="true" :size="btnsize" label-position="right" label-width="70px" :model="searchQuery"-->
                 <!--class=" clearfix" style="float: left">-->
          <!--<div class="">-->
            <!--<el-form-item label="网点">-->
            <!--<SelectTree v-model="searchQuery.vo.companyId" :orgid="otherinfo.companyId" @change="searchOrgid" clearible/>-->
            <!--</el-form-item>-->

          <!--</div>-->
        <!--</el-form>-->
        <el-button type="success" :size="btnsize" icon="el-icon-sort-down" @click="doAction('doNext')" plain
                   v-has:PICK_FINASH class="table_setup fr_btn">下一步
        </el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-upload" @click="doAction('doExport')" plain
                   v-has:PICK_SEL class="table_setup fr_btn">导入摸板
        </el-button>
        <el-button type="info" :size="btnsize" icon="el-icon-remove" @click="doAction('doAll')" plain
                   v-has:PICK_EXP class="table_setup fr_btn">全部展开
        </el-button>
        <el-button type="info" :size="btnsize" icon="el-icon-circle-plus" @click="doAction('doUp')" plain
                   v-has:PICK_EXP class="table_setup fr_btn">全部收起
        </el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-circle-plus-outline" @click="doAction('doAddEnd')" plain
                   v-has:PICK_EXP class="table_setup fr_btn" v-if="isParentId">增加下级
        </el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-plus" @click="doAction('doAddStair')" plain
                   v-has:PICK_EXP class="table_setup fr_btn" v-if="isParentId">新增一级
        </el-button>
        <el-button :size="btnsize" icon="el-icon-tickets" @click="doAction('doDefaultTem')" plain
                   v-has:PICK_EXP class="table_setup fr_btn">获取默认模板
        </el-button>

        <!--<el-button type="primary" :size="btnsize" icon="el-icon-setting" plain @click="setTable" class="table_setup">-->
        <!--表格设置-->
        <!--</el-button>-->
      </div>
      <div class="info_tab info_tab_media">
        <tree-table :data="usersArr" :columns="columns" border :expand-all="expandAll" @change="getTreeTableParam"
                    @success="fetchData" :isParentId="isParentId"/>
      </div>
      <!--<div class="info_tab_footer">共计:{{ total }}-->
      <!--<div class="show_pager">-->
      <!--<Pager :total="total" @change="handlePageChange"/>-->
      <!--</div>-->
      <!--</div>-->
    </div>
    <SubjectDialog :isShow.sync='showDialog' @close='closeShowDialog' :isDoAddEnd="isDoAddEnd"
                   :doAddStair="doAddStair" :info="selectInfo" @success="fetchData"></SubjectDialog>
    <ImportDialog :popVisible="importDialogVisible" @close="importDialogVisible = false" @success="fetchData"
                  :info="'driver'" :isSubjectInfo='isSubjectInfo'></ImportDialog>
  </div>
</template>
<script>
  import treeTable from '@/components/TreeTable'
  import {fetchPostlist, deletebatchDelete} from '@/api/operation/pickup'
  import {getFinSubjectTree} from '@/api/finance/finanInfo'
  import SelectTree from '@/components/selectTree/index'
  import SearchForm from './components/search'
  import TableSetup from '@/components/tableSetup'
  import SubjectDialog from './components/subjectDialog'
  import {mapGetters} from 'vuex'
  import Pager from '@/components/Pagination/index'
  import {objectMerge2} from '@/utils/index'
  import {PrintInFullPage, SaveAsFile} from '@/utils/lodopFuncs'
  import treeToArray from '@/utils/customEval'
  import ImportDialog from '@/components/importDialog'

  export default {
    components: {
      SearchForm,
      Pager,
      TableSetup,
      SelectTree,
      SubjectDialog,
      ImportDialog,
      treeTable
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
        isSubjectInfo: false,
        isParentId: false,
        doAddStair: false,
        isDoAddEnd: false,
        showDialog: false,
        importDialogVisible: false,
        func: treeToArray,
        expandAll: true,

        args: [null, null, 'timeLine'],
        mykey: '',
        btnsize: 'mini',
        usersArr: [],
        total: 0,
        tablekey: 0,
        // 加载状态
        loading: false,
        setupTableVisible: false,
        selectInfo: {},
        searchForm: {
          companyId: '',
        },
        // 选中的行
        selected: [],
        searchQuery: {
          'currentPage': 1,
          'pageSize': 100,
          'vo': {
            'companyId': 1,
          }
        },
        columns: [
          {
            text: '科目名称',
            value: 'subjectName',
            fixed: true,
          },
        ],
        tableColumn: [{
          label: '序号',
          prop: 'id',
          width: '70',
          fixed: true,
          slot: (scope) => {
            return ((this.searchQuery.currentPage - 1) * this.searchQuery.pageSize) + scope.$index + 1
          }
        }, {
          label: '科目名称',
          prop: 'pickupBatchNumber',
          width: '',
          fixed: true
        }, {
          label: '科目代码',
          prop: 'pickupStatusName',
          width: '',
          fixed: true
        },
        ]
      }
    },
    mounted() {
      this.searchQuery.vo.companyId = this.otherinfo.companyId
      // if (this.otherinfo.companyId === this.otherinfo.orgid) {
      //   isParentId = true
      // } else {
      //   isParentId = false
      // }
      this.isParentId = this.otherinfo.orgid === this.otherinfo.companyId ? true : false
      this.fetchData()
    },
    methods: {
      searchOrgid(item) {
        this.searchQuery.vo.companyId = item
        this.fetchData()
      },
      message(row) {
        this.$message.info(row.event)
      },
      fetchTreeList() {
        // this.loading = true
        return getFinSubjectTree(this.otherinfo.companyId).then(data => {
          this.usersArr = data.data

          console.log(data)
          // this.total = data.total
          // this.loading = false
        }).catch((err) => {
          this.loading = false
          this._handlerCatchMsg(err)
        })
      },
      fetchData() {
        this.fetchTreeList()
      },
      handlePageChange(obj) {
        this.searchQuery.currentPage = obj.pageNum
        this.searchQuery.pageSize = obj.pageSize
      },
      getSearchParam(obj) {
        // this.searchQuery.vo = objectMerge2(this.searchQuery.vo, obj)
        // this.fetchAllCustomer()
      },
      showImport() {
        // 显示导入窗口
      },
      doAction(type) {
        // 判断是否有选中项
        if (!this.selected.length && type !== 'doNext' && type !== 'doAll' && type !== 'doUp' && type !== 'doExport' && type !== 'print') {
          // this.closeAddCustomer()
          this.$message({
            message: '请选择要操作的项~',
            type: 'warning'
          })
          return false
        }
        switch (type) {
          case 'doDefaultTem':
            if (this.selected[0].parentId === 0) {
              this.$confirm('确定覆盖原有模板?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.$message({
                  type: 'success',
                  message: '覆盖成功!'
                });
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消覆盖'
                });
              });
            } else {
              return false
            }
            break
          case 'doExport':

            // fetchData () { // 重新获取列表数据 }
            this.$confirm('确定覆盖原有模板?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {

              this.importDialogVisible = true
              this.isSubjectInfo = true
              // this.$message({
              //   type: 'success',
              //   message: '覆盖成功!'
              // });
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消覆盖'
              });
            });
            break
          case 'doAddEnd':
            if (this.selected.length > 1) {
              this.$message({
                message: '每次只能修改单条数据~',
                type: 'warning'
              })
              return false
            }
            if (this.selected[0].subjectLevel >= 4) {
              this.$message.info('添加的级数不能超过4级')
              return false
            }
            this.isDoAddEnd = true
            this.doAddStair = false
            this.openShowDialog()
            this.selectInfo = this.selected[0]
            break
          case 'doAddStair':
            if (this.selected.length > 1) {
              this.$message({
                message: '每次只能新增单条数据~',
                type: 'warning'
              })
              return false
            }
            this.isDoAddEnd = false
            this.doAddStair = true
            this.openShowDialog()
            this.selectInfo = this.selected[0]
            break
          case 'doNext':
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
            break;
          case 'doAll':
            this.expandAll = true
            break
          case 'doUp':
            this.expandAll = false
            break
          case 'export':
            SaveAsFile({
              data: this.selected.length ? this.selected : this.usersArr,
              columns: this.tableColumn,
              name: '提货'
            })
            // this.$refs.multipleTable.clearSelection()
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
        // this.$refs.multipleTable.clearSelection()
      },
      setTable() {
        this.setupTableVisible = true
      },

      closeShowDialog() {
        this.showDialog = false
      },
      openShowDialog() {
        this.showDialog = true
      },

      clickDetails(row, event, column) {
        this.$refs.multipleTable.toggleRowSelection(row)
      },
      getDbClick(row, event) {
        this.$refs.multipleTable.clearSelection()
      },
      setColumn(obj) {
        this.tableColumn = obj
        this.tablekey = Math.random()
      },
      getTreeTableParam(obj) {
        this.selected = obj
      }
    }

  }

</script>
<style type="text/css" lang="scss">

  .row-expand-cover .el-table__expand-column .el-icon {
    visibility: hidden;
  }
</style>
