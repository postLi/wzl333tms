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
                   v-has:PICK_EXP class="table_setup fr_btn">增加下级
        </el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-plus" @click="doAction('doAddStair')" plain
                   v-has:PICK_EXP class="table_setup fr_btn">新增一级
        </el-button>
        <el-button :size="btnsize" icon="el-icon-tickets" @click="doAction('doDefaultTem')" plain
                   v-has:PICK_EXP class="table_setup fr_btn">获取默认模板
        </el-button>

        <!--<el-button type="primary" :size="btnsize" icon="el-icon-setting" plain @click="setTable" class="table_setup">-->
        <!--表格设置-->
        <!--</el-button>-->
      </div>
      <div class="info_tab info_tab_media">
        <!--<tree-table :data="data" :columns="columns" border/>-->
        <tree-table :data="data" :eval-func="func" :eval-args="args" :expand-all="expandAll" border
                    ref="multipleTable" height="100%" tooltip-effect="dark" :key="tablekey" @change="getTreeTableParam">
          <el-table-column label="科目代码">
            <template slot-scope="scope">
              <span style="color:sandybrown">{{ scope.row.event }}</span>
              <!--<el-tag>{{ scope.row.timeLine+'ms' }}</el-tag>-->
            </template>
          </el-table-column>
          <el-table-column label="是否公共" :render-header="renderHeader">
            <template slot-scope="scope">
              <span>{{ scope.row.event }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200">
            <template slot-scope="scope">
              <el-button type="text" @click="message(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </tree-table>

        <!--<el-table ref="multipleTable" @row-dblclick="getDbClick" :data="usersArr" border @row-click="clickDetails"-->
        <!--@selection-change="getSelection" height="100%" tooltip-effect="dark" :key="tablekey"-->
        <!--style="width:100%;" :default-sort="{prop: 'id', order: 'ascending'}" stripe>-->
        <!--<el-table-column fixed sortable type="selection" width="50"></el-table-column>-->
        <!--<template v-for="column in tableColumn">-->
        <!--<el-table-column :key="column.id" :fixed="column.fixed" sortable :label="column.label" :prop="column.prop"-->
        <!--v-if="!column.slot" :width="column.width"></el-table-column>-->
        <!--<el-table-column :key="column.id" :fixed="column.fixed" sortable :label="column.label" v-else-->
        <!--:width="column.width">-->
        <!--<template slot-scope="scope">-->
        <!--<span class="clickitem" v-if="column.click" v-html="column.slot(scope)"-->
        <!--@click.stop="column.click(scope)"></span>-->
        <!--<span v-else v-html="column.slot(scope)"></span>-->
        <!--</template>-->
        <!--</el-table-column>-->
        <!--</template>-->
        <!--</el-table>-->


      </div>
      <div class="info_tab_footer">共计:{{ total }}
        <div class="show_pager">
          <Pager :total="total" @change="handlePageChange"/>
        </div>
      </div>
    </div>
    <SubjectDialog :isShow.sync='showDialog' @close='closeShowDialog' :isDoAddEnd="isDoAddEnd"
                   :isDoExport="isDoExport"></SubjectDialog>
    <SubDownDialog :isShow.sync='downShowDialog' @close='closeDownShowDialog'></SubDownDialog>

  </div>
</template>
<script>
  import treeTable from '@/components/TreeTable'
  import {fetchPostlist, deletebatchDelete} from '@/api/operation/pickup'
  import SelectTree from '@/components/selectTree/index'
  import SearchForm from './components/search'
  import TableSetup from '@/components/tableSetup'
  import SubjectDialog from './components/subjectDialog'
  import SubDownDialog from './components/subDownDialog'
  import {mapGetters} from 'vuex'
  import Pager from '@/components/Pagination/index'
  import {objectMerge2} from '@/utils/index'
  import {PrintInFullPage, SaveAsFile} from '@/utils/lodopFuncs'
  import treeToArray from '@/utils/customEval'

  export default {
    components: {
      SearchForm,
      Pager,
      TableSetup,
      SelectTree,
      SubjectDialog,
      SubDownDialog,
      treeTable
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
        isDoExport: false,
        isDoAddEnd: false,
        showDialog: false,
        func: treeToArray,
        expandAll: false,
        data: {
          id: 1,
          event: '事件1',
          timeLine: 100,
          comment: '无',
          parentId: 0,
          children: [
            {
              id: 2,
              event: '事件2',
              timeLine: 10,
              comment: '无'
            },
            {
              id: 3,
              event: '事件3',
              timeLine: 90,
              comment: '无',
              children: [
                {
                  id: 4,
                  event: '事件4',
                  timeLine: 5,
                  comment: '无'
                },
                {
                  id: 5,
                  event: '事件5',
                  timeLine: 10,
                  comment: '无'
                },
                {
                  id: 6,
                  event: '事件6',
                  timeLine: 75,
                  comment: '无',
                  children: [
                    {
                      id: 7,
                      event: '事件7',
                      timeLine: 50,
                      comment: '无',
                      children: [
                        {
                          id: 71,
                          event: '事件71',
                          timeLine: 25,
                          comment: 'xx'
                        },
                        {
                          id: 72,
                          event: '事件72',
                          timeLine: 5,
                          comment: 'xx'
                        },
                        {
                          id: 73,
                          event: '事件73',
                          timeLine: 20,
                          comment: 'xx'
                        }
                      ]
                    },
                    {
                      id: 8,
                      event: '事件8',
                      timeLine: 25,
                      comment: '无',
                      children: [
                        {
                          id: 7,
                          event: '事件7',
                          timeLine: 50,
                          comment: '无',
                          children: [
                            {
                              id: 71,
                              event: '事件71',
                              timeLine: 25,
                              comment: 'xx'
                            },
                            {
                              id: 72,
                              event: '事件72',
                              timeLine: 5,
                              comment: 'xx'
                            },
                            {
                              id: 73,
                              event: '事件73',
                              timeLine: 20,
                              comment: 'xx'
                            }
                          ]
                        },
                        {
                          id: 8,
                          event: '事件8',
                          timeLine: 25,
                          comment: '无',
                          children: [
                            {
                              id: 7,
                              event: '事件7',
                              timeLine: 50,
                              comment: '无',
                              children: [
                                {
                                  id: 71,
                                  event: '事件71',
                                  timeLine: 25,
                                  comment: 'xx'
                                },
                                {
                                  id: 72,
                                  event: '事件72',
                                  timeLine: 5,
                                  comment: 'xx'
                                },
                                {
                                  id: 73,
                                  event: '事件73',
                                  timeLine: 20,
                                  comment: 'xx'
                                }
                              ]
                            },
                            {
                              id: 8,
                              event: '事件8',
                              timeLine: 25,
                              comment: '无',
                              children: [
                                {
                                  id: 7,
                                  event: '事件7',
                                  timeLine: 50,
                                  comment: '无',
                                  children: [
                                    {
                                      id: 71,
                                      event: '事件71',
                                      timeLine: 25,
                                      comment: 'xx'
                                    },
                                    {
                                      id: 72,
                                      event: '事件72',
                                      timeLine: 5,
                                      comment: 'xx'
                                    },
                                    {
                                      id: 73,
                                      event: '事件73',
                                      timeLine: 20,
                                      comment: 'xx'
                                    }
                                  ]
                                },
                                {
                                  id: 8,
                                  event: '事件8',
                                  timeLine: 25,
                                  comment: '无'
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        args: [null, null, 'timeLine'],
        mykey: '',
        btnsize: 'mini',
        usersArr: [],
        total: 0,
        tablekey: 0,
        // 加载状态
        loading: false,
        setupTableVisible: false,
        downShowDialog: false,
        selectInfo: {},
        searchForm: {
          orgid: '',
        },
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
        columns: [
          {
            text: '科目名称',
            value: 'event',
            width: 200,
            fixed: true,
            slot: (scope) => {
              return `${scope.row.value}`
            },
          }
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
          {
            label: '操作',
            prop: 'customerName',
            width: '',
            fixed: false
          }
        ]
      }
    },
    methods: {
      renderHeader(h, {column, $index}) {
        return h('span', {}, [
          h('span', {}, '是否公共'),
          h('el-popover', {
            props: {
              placement: 'top-end',
              width: '250',
              trigger: 'hover',
              content: '公共为总公司设置的财务科目~'
            }
          }, [
            h('i', {slot: 'reference', class: 'el-icon-warning'}, '')
          ])
        ])

        // return h('span', [
        //   h('span',
        //     {
        //       props: {
        //       },
        //       class: 'errorIcon2',
        //       style: {
        //         marginLeft: ''
        //       },
        //     }),
        //   h('span','333 ')
        // ])
      },
      // tipFn(h, {column}) {
      //   if(column.labelClassName){
      //     return(
      //       <el-tooltip class='item' effect='dark' content='Top Center 提示文字' placement='top'>
      //       <span>3333</span>
      //     </el-tooltip>
      //     )
      //   }
      //   console.log(column, 'column');
      // },
      message(row) {
        console.log(row, 'row')
        this.$message.info(row.event)
      },
      handleClick(row) {
        console.log(row);
      },
      fetchAllCustomer() {
        // this.loading = true
        return fetchPostlist(this.searchQuery).then(data => {
          this.usersArr = data.list
          console.log(data)
          this.total = data.total
          // this.loading = false
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
        // this.searchQuery.vo = objectMerge2(this.searchQuery.vo, obj)
        // this.fetchAllCustomer()
      },
      showImport() {
        // 显示导入窗口
      },
      doAction(type) {
        // 判断是否有选中项
        if (!this.selected.length && type !== 'doNext' && type !== 'doAll' && type !== 'doUp' && type !== 'export' && type !== 'print') {
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
            this.$confirm('确定覆盖原有模板?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$message({
                type: 'success',
                message: '覆盖成功!'
              });
              this.openDownShowDialog()
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
            this.openShowDialog()
            this.isDoAddEnd = true
            this.isDoExport = false
            break
          case 'doAddStair':
            if (this.selected.length > 1) {
              this.$message({
                message: '每次只能修改单条数据~',
                type: 'warning'
              })
              return false
            }
            this.openShowDialog()
            this.isDoAddEnd = false
            this.isDoExport = false
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
            // this.expandAll = true
            // this.expandAll === false ? this.expandAll = true : this.expandAll = false
            console.log(this.expandAll, 'doAll,false')
            break
          case 'doUp':
            // this.expandAll === true ? this.expandAll = false : this.expandAll = true
            console.log(this.expandAll, 'doUp')
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
      closeDownShowDialog() {
        this.downShowDialog = false
      },
      openDownShowDialog() {
        this.downShowDialog = true
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
        console.log(obj, 'obj')
      }
    }

  }

</script>
<style type="text/css" lang="scss">
  .errorIcon2 {
    display: inline-flex;
    flex-direction: row-reverse;
    margin-right: 3px;
    width: 15px;
    height: 15px;
    background: url('../../../assets/role.png') 100% 100% no-repeat;
  }
</style>
