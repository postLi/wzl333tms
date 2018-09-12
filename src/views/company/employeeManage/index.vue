<template>
  <div class="staff_manage" v-loading="loading">
    <SearchForm :groups="groupsArr" :orgid="otherinfo.orgid" @change="getSearchParam" :btnsize="btnsize" />
    <div class="staff_info">
      <div class="btns_box">
        <el-button type="primary" :size="btnsize" icon="el-icon-circle-plus" plain @click="doAction('add')" v-has:USER_ADD>新增员工</el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-edit-outline" @click="doAction('auth')" plain v-has:USER_ROLES>员工授权</el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-edit" @click="doAction('modify')" plain v-has:USER_UPDATE>修改</el-button>
        <el-button type="danger" :size="btnsize" icon="el-icon-delete" @click="doAction('delete')" plain v-has:USER_DELETE>删除</el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-setting" plain @click="setTable" class="table_setup">表格设置</el-button>
      </div>
      <div class="info_news">
        <el-table ref="multipleTable" :data="usersArr" :key="tablekey" stripe border @row-click="clickDetails" @selection-change="getSelection" height="100%" tooltip-effect="dark" :default-sort="{prop: 'id', order: 'ascending'}" style="width: 100%">
          <el-table-column fixed sortable type="selection" width="50">
          </el-table-column>
          <template v-for="column in tableColumn">
            <el-table-column :key="column.id" :fixed="column.fixed" sortable :label="column.label" :prop="column.prop" v-if="!column.slot" :width="column.width"></el-table-column>
            <el-table-column :key="column.id" :fixed="column.fixed" sortable :label="column.label" v-else :width="column.width || ''">
              <template slot-scope="scope">
                <span class="clickitem" v-if="column.click" v-html="column.slot(scope)" @click.stop="column.click(scope)"></span>
                <span v-else v-html="column.slot(scope)"></span>
              </template>
            </el-table-column>
          </template>
        </el-table>
      </div>
      <div class="info_news_footer">共计:{{ total }}
        <div class="show_pager">
          <Pager :total="total" @change="handlePageChange" />
        </div>
      </div>
    </div>
    <transition name="slideInRight">
      <AddEmployeer :isModify="isModify" :userInfo="theUser" :orgid="searchForm.orgid || otherinfo.orgid" :popVisible.sync="AddEmployeerVisible" @close="closeAddEmployeer" @success="fetchData" />
    </transition>
    <TableSetup :popVisible="setupTableVisible" :columns="tableColumn" @close="closeSetupTable" @success="setColumn" />
    <transition name="slideInRight">
      <SetAuth :orgid="otherinfo.companyId" :popVisible.sync="SetAuthVisible" @close="closeAuth" @success="fetchData" :users="authUser" v-if="showSetAuth" />
    </transition>
  </div>
</template>
<script type="text/javascript">
import { getAllOrgInfo, getAllUser, deleteEmployeer } from '@/api/company/employeeManage'
import { mapGetters } from 'vuex'
import SearchForm from './search'
import TableSetup from '@/components/tableSetup'
import AddEmployeer from './add'
import SetAuth from './authorization'
import Pager from '@/components/Pagination/index'
import { objectMerge2, parseTime } from '@/utils/'

export default {
  name: 'employeeManage',
  components: {
    SearchForm,
    TableSetup,
    AddEmployeer,
    SetAuth,
    Pager
  },
  computed: {
    ...mapGetters([
      'otherinfo'
    ])
  },
  data() {
    return {
      // 请求获得的数据
      groupsArr: [],
      rolesArr: [],
      departmentArr: [],
      usersArr: [],
      // 加载状态
      loading: true,
      // 选中的行
      selected: [],
      authUser: [],
      // 保存要修改的用户
      theUser: {},
      // 按钮大小
      btnsize: 'mini',
      // 各个弹窗状态更改
      setupTableVisible: false,
      AddEmployeerVisible: false,
      SetAuthVisible: false,
      showTableSetup: false,
      showSetAuth: false,
      showAddEmployeer: false,
      searchForm: {
        name: '',
        pageSize: 100,
        pageNum: 1,
        mobile: '',
        orgid: ''
      },
      dialogFormVisible: false,
      // 是否修改员工信息
      isModify: false,
      total: 0,
      tablekey: '',
      tableColumn: [{
        label: '序号',
        prop: 'id',
        width: '60',
        fixed: true,
        slot: (scope) => {
          return ((this.searchForm.pageNum - 1) * this.searchForm.pageSize) + scope.$index + 1
        }
      }, {
        label: '姓名',
        prop: 'name',
        width: '120',
        fixed: true
      }, {
        label: '归属网点',
        prop: 'orgName',
        width: '120',
        fixed: false
      }, {
        label: '归属部门',
        prop: 'departmentName',
        width: '120',
        fixed: false
      }, {
        label: '职务',
        prop: 'position',
        width: '120',
        fixed: false
      }, {
        label: '员工号',
        prop: 'jobNumber',
        width: '120',
        fixed: false
      }, {
        label: '登录账号',
        prop: 'username',
        width: '120',
        fixed: false
      }, {
        label: '权限角色',
        prop: 'rolesName',
        width: '200',
        slot: (scope) => {
          return scope.row.rolesId !== '0' ? scope.row.rolesName : '<span class="unauth" v-else>未授权</span>'
        },
        fixed: false
      }, {
        label: '性别',
        prop: 'sexFlag',
        width: '100',
        slot: (scope) => {
          return scope.row.sexFlag === '0' ? '男' : scope.row.sexFlag === '1' ? '女' : ''
        }
      }, {
        label: '联系手机',
        prop: 'mobilephone',
        width: '120',
        fixed: false
      }, {
        label: '创建日期',
        prop: 'createTime',
        slot: (scope) => {
          return `${parseTime(scope.row.createTime, '{y}-{m}-{d} {h}:{i}:{s}')}`
        },
        fixed: false
      }]
    }
  },
  mounted() {
    Promise.all([getAllOrgInfo(this.otherinfo.orgid), this.fetchAllUser(this.otherinfo.orgid)]).then(resArr => {
      this.loading = false
      this.groupsArr = resArr[0]
      this.usersArr = resArr[1].list
      this.total = resArr[1].total
    }).catch((err) => {
      this.loading = false
      this.$message.error(err.errorInfo || err.text || '未知错误，请重试~')
    })
  },
  methods: {
    fetchAllUser(orgid, username, mobilephone) {
      return getAllUser(orgid, username || '', mobilephone || '')
    },
    doAction(type) {
      // 判断是否有选中项
      if (!this.selected.length && type !== 'add') {
        this.closeAuth()
        this.closeAddEmployeer()
        this.$message({
          message: '请选择要操作的员工~',
          type: 'warning'
        })
        return false
      }

      console.log('this.selected:', this.selected)

      switch (type) {
        // 添加员工
        case 'add':
          this.isModify = false
          this.theUser = {}
          this.openAddEmployeer()
          break
          // 修改员工信息
        case 'modify':
          this.isModify = true
          if (this.selected.length > 1) {
            this.$message({
              message: '每次只能修改单条数据~',
              type: 'warning'
            })
          }
          this.theUser = objectMerge2({}, this.selected[0])
          this.openAddEmployeer()
          break
          // 删除员工
        case 'delete':
          var deleteItem = this.selected.length > 1 ? this.selected.length + '名' : this.selected[0].name
          // =>todo 删除多个
          var ids = ''
          this.selected.map(item => {
            ids += item.id + ','
          })
          ids = ids.slice(0, ids.length - 1)

          // const id = this.selected[0].id
          this.$confirm('确定要删除 ' + deleteItem + ' 员工吗？', '提示', {
            confirmButtonText: '删除',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            deleteEmployeer(ids).then(res => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.fetchData()
            }).catch(err => {
              this.$message({
                type: 'info',
                message: '删除失败，原因：' + err.errorInfo ? err.errorInfo : err.text
              })
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
          break
          // 设置员工权限
        case 'auth':
          this.authUser = this.selected
          this.openAuth()
          break
      }
      // 清除选中状态，避免影响下个操作
      this.$refs.multipleTable.clearSelection()
    },
    // 设置表格
    setTable() {
      this.showTableSetup = true
      this.setupTableVisible = true
    },
    closeSetupTable() {
      this.setupTableVisible = false
    },
    setColumn(obj) { // 重绘表格列表
      this.tableColumn = obj
      this.tablekey = Math.random() // 刷新表格视图
    },
    openAddEmployeer() {
      this.showAddEmployeer = true
      this.AddEmployeerVisible = true
    },
    closeAddEmployeer() {
      this.AddEmployeerVisible = false
    },
    openAuth() {
      this.showSetAuth = true
      this.SetAuthVisible = true
    },
    closeAuth() {
      this.SetAuthVisible = false
    },
    clickDetails(row, event, column) {
      this.$refs.multipleTable.toggleRowSelection(row)
    },
    getSelection(selection) {
      this.selected = selection
    },
    fetchData(orgid = this.searchForm.orgid || this.otherinfo.orgid, name = this.searchForm.name, mobile = this.searchForm.mobile, pageSize = this.searchForm.pageSize, pageNum = this.searchForm.pageNum) {
      this.loading = true
      this.fetchAllUser(orgid, name, mobile).then(data => {
        this.loading = false
        this.usersArr = data.list
        this.total = data.total
      }).catch((err) => {
        this.loading = false
        this.$message.error(err.errorInfo || err.text || '未知错误，请重试~')
      })
    },
    // 获取组件返回的搜索参数
    getSearchParam(searchParam) {
      // 根据搜索参数请求后台获取数据
      Object.assign(this.searchForm, searchParam)
      this.fetchData()
    },
    // 获取翻页返回的数据
    handlePageChange(obj) {
      Object.assign(this.searchForm, obj)
      this.fetchData()
    }
  }

}

</script>
<style type="text/css" lang="scss">
.staff_manage {
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;

  .staff_info {
    padding: 10px 10px 40px;
    height: 100%;
    flex-grow: 1;
    display: flex;
    flex-direction: column;

    .btns_box {
      margin-bottom: 10px;
      .el-button {}
      .table_setup {
        float: right;
        margin-right: 0;
      }
    }
    .info_news {
      width: 100%;
      height: calc(100% - 90px);
      flex-grow: 1;

      .el-table {
        table {
          th,
          td {
            text-align: center;
          }
        }
        .unauth {
          color: #f00;
        }
      }
    }
  }
  .info_news_footer {
    padding-left: 20px;
    background: #eee;
    height: 40px;
    line-height: 40px;
    box-shadow: 0 -2px 2px rgba(0, 0, 0, .1);
    position: relative;
    z-index: 10;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
  }

  .show_pager {
    float: right;
    line-height: 40px;
    height: 40px;
    overflow: hidden;
  }
}

</style>
