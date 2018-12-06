<template>
  <div class="tab-content" v-loading="loading">
    <!--<SearchForm :orgid="otherinfo.orgid" :issender="true" @change="getSearchParam" :btnsize="btnsize"/>-->
    <div class="tab_info">
      <div class="btns_box">
        <!--<el-form :inline="true" :size="btnsize" label-position="right" label-width="70px" :model="searchForm"-->
                 <!--class=" clearfix" style="float: left">-->
          <!--<div class="">-->
          <!--<el-form-item label="网点">-->
          <!--<SelectTree v-model="searchForm.orgid" :orgid="otherinfo.orgid" clearible @change="changeOrderId"/>-->
          <!--</el-form-item>-->

          <!--</div>-->
        <!--</el-form>-->
        <el-button class="table_setup" type="success" :size="btnsize" icon="el-icon-sort-up" @click="doAction('doLast')"
                   plain
                   >上一步
        </el-button>
        <el-button class="table_setup" type="primary" :size="btnsize" icon="el-icon-circle-plus"
                   @click="doAction('doAdd')" plain
                   v-has:INIT_VERIFY_DIRECTION_ADD>新增
        </el-button>
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
            prop="verificationWay"
            width=""
            label="核销方向">
          </el-table-column>
          <el-table-column
            fixed
            sortable
            prop="remark"
            width=""
            label="备注">
          </el-table-column>
          <el-table-column
            fixed
            sortable
            prop="abnormalNo"
            width="300"
            label="操作">
            <template slot-scope="scope">
              <el-button @click="editClick(scope.row)" type="text" size="small" icon="">修改</el-button>
              <el-button type="text" icon="" size="small" @click="removeClick(scope.row)"><span
                style="color: #f56c6c;border-bottom: 1px solid #f56c6c">删除</span></el-button>
            </template>
          </el-table-column>
        </el-table>


        <!--<el-table ref="multipleTable" @row-dblclick="getDbClick" :data="usersArr" border @row-click="clickDetails"-->
        <!--@selection-change="getSelection" height="100%" tooltip-effect="dark" :key="tablekey"-->
        <!--style="width:100%;" :default-sort="{prop: 'id', order: 'ascending'}" stripe>-->
        <!--&lt;!&ndash;<el-table-column fixed sortable type="selection" width="50"></el-table-column>&ndash;&gt;-->
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
    <TableSetup :popVisible="setupTableVisible" :columns="tableColumn" @close="closeSetupTable"
                @success="setColumn"></TableSetup>
    <SubDirectDialog :popVisible.sync='showDialog' @close='closeShowDialog'
                   :isDoEdit="isDoEdit" :info="selectInfo" @success="fetchData"></SubDirectDialog>


  </div>
</template>
<script>
  import {postFinFicationlList, deleteFinFicationl} from '@/api/finance/finanInfo'
  import SelectTree from '@/components/selectTree/index'
  import SearchForm from './components/search'
  import TableSetup from '@/components/tableSetup'
  import SubDirectDialog from './components/subDirectDialog'
  // import SubjectDialog from './components/subjectDialog'
  import {mapGetters} from 'vuex'
  import Pager from '@/components/Pagination/index'
  import {objectMerge2} from '@/utils/index'
  import {PrintInFullPage, SaveAsFile} from '@/utils/lodopFuncs'

  export default {
    components: {
      SearchForm,
      Pager,
      TableSetup,
      SelectTree,
      SubDirectDialog,
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

        mykey: '',
        btnsize: 'mini',
        usersArr: [],
        total: 0,
        tablekey: 0,
        // 加载状态
        loading: true,
        setupTableVisible: false,
        showDialog: false,
        isDoEdit: false,
        selectInfo: {},
        // 选中的行
        selected: [],
        searchQuery: {
          'currentPage': 1,
          'pageSize': 100,
          'vo': {
            'companyId': '',
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
          width: '200',
          fixed: false
        }
        ],
      }
    },
    mounted() {
      this.searchQuery.vo.companyId = this.otherinfo.companyId
      // this.usersArr = this.tableColumn
      this.fetchData()
    },
    methods: {
      fetchFinFicationlList() {
        this.loading = true
        return postFinFicationlList(this.searchQuery).then(data => {
          this.usersArr = data.list
          this.total = data.total
          this.loading = false
        }).catch((err) => {
          this.loading = false
          this._handlerCatchMsg(err)
        })
      },
      fetchData() {
        this.fetchFinFicationlList()
      },
      handlePageChange(obj) {
        this.searchQuery.currentPage = obj.pageNum
        this.searchQuery.pageSize = obj.pageSize
        this.fetchFinFicationlList()
      },
      getSearchParam(obj) {
        this.searchQuery.vo = objectMerge2(this.searchQuery.vo, obj)
        this.fetchFinFicationlList()
      },
      showImport() {
        // 显示导入窗口
      },
      doAction(type) {
        // 判断是否有选中项
        if (!this.selected.length && type !== 'doAdd' && type !== 'doLast' && type !== 'print') {
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
            })
            break
          case 'export':
            SaveAsFile({
              data: this.selected.length ? this.selected : this.usersArr,
              columns: this.tableColumn,
              name: '提货'
            })
            this.$refs.multipleTable.clearSelection()
            break
          case 'print':
            PrintInFullPage({
              data: this.selected.length ? this.selected : this.usersArr,
              columns: this.tableColumn
            })
            break
          // 新增
          case 'doAdd':
            this.openShowDialog()
            this.selectInfo = {}
            this.isDoEdit = false
            break
        }
        // 清除选中状态，避免影响下个操作
        this.$refs.multipleTable.clearSelection()
      },
      editClick(row) {
        this.openShowDialog()
        this.isDoEdit = true
        this.selectInfo = row
      },
      removeClick(row) {
        this.loading = true
        this.$confirm('确定删除 [' + row.verificationWay + '] 吗?', '提示', {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteFinFicationl(row.id).then(res => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.fetchData()
            this.loading = false
          }).catch(err => {
            this._handlerCatchMsg(err)
            this.loading = false
          })
        }).catch(() => {
          this.$message.info('已取消操作')
          this.loading = false
        });
        this.$refs.multipleTable.clearSelection()
      },
      setTable() {
        this.setupTableVisible = true
      },
      closeSetupTable() {
        this.setupTableVisible = false
      },
      closeShowDialog() {
        this.showDialog = false
        this.selectInfo = {}
      },
      openShowDialog() {
        this.showDialog = true
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
      }
    }
  }
</script>
