
<template>
  <div class="permManage miniHeaderSearch" v-loading="loading">
    <div class="permManage-top staff_searchinfo">
      <el-form :inline="true" :model="searchDate" class="demo-form-inline">
        <el-form-item label="角色名称：">
          <el-input v-model="searchDate.roleName" placeholder="" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="permManage-content">
      <div class="side_right_bottom clearfix">
        <div class="btns_box clearfix">
          <!--表格功能-->
          <div class="btns_box_lrl clearfix">
            <el-button type="primary" :size="btnsize" icon="el-icon-circle-plus" plain @click="doAction('addRole')" v-has:PERMISSION_ADD>新增角色</el-button>
            <el-button type="primary" :size="btnsize" icon="el-icon-edit" @click="doAction('roleNot')" plain v-has:PERMISSION_EDIT>修改</el-button>
            <el-button type="danger" :size="btnsize" icon="el-icon-delete" @click="doAction('deletePeople')" plain v-has:PERMISSION_DELETE>删除</el-button>
            <el-button type="primary" :size="btnsize" icon="el-icon-edit" @click="doAction('reference')" plain v-has:PERMISSION_COPY>参照</el-button>
            <el-button type="primary" :size="btnsize" icon="el-icon-edit" @click="doAction('relationPer')" plain v-has:PERMISSION_LINK>关联员工</el-button>
          </div>
        </div>
        <div class="info_news">
          <el-table
            ref="multipleTable"
            :data="usersArr"
            stripe
            border
            height="100%"
            tooltip-effect="dark"
            @row-click="clickDetails"
            @selection-change="seleClick"
            style="width: 100%;">
            <el-table-column
              fixed
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              fixed
              prop="id"
              label="序号" width="50">
              <template slot-scope="scope">{{  scope.$index + 1 }}</template>
            </el-table-column>
               <template v-for="column in tableColumn">
                  <el-table-column :key="column.id" :fixed="column.fixed" sortable :label="column.label" :prop="column.prop" v-if="!column.slot" :width="column.width" >
                    <template slot="header" slot-scope="scope">
                      <tableHeaderSearch :scope="scope" :query="searchQuery" @change="changeKey"  />
                    </template>
                    <template slot-scope="scope">{{scope.row[column.prop]}}</template>
                  </el-table-column>
                  <el-table-column :key="column.id" :fixed="column.fixed" :prop="column.prop" sortable :label="column.label" v-else :width="column.width">
                    <template slot="header" slot-scope="scope">
                      <tableHeaderSearch :scope="scope"  :query="searchQuery" @change="changeKey" />
                    </template>
                    <template slot-scope="scope">
                      <div class="td-slot" v-html="column.slot(scope)"></div>
                    </template>
                  </el-table-column>
              </template>
           <!--  
            <el-table-column
              fixed
              prop="roleName"
              label="角色名称">
            </el-table-column>
            <el-table-column
              prop="createrName"
              label="创建者">
            </el-table-column>
            <el-table-column
              label="创建时间"
              prop="createTime">

            </el-table-column>
            <el-table-column
              prop="remark"
              label="备注">
            </el-table-column> -->
          </el-table>
        </div>

      </div>
    </div>
    <AddRole :dotInfo="getTreeArr" :isModify="isModify" :reference="isReference" :popVisible="addDoRoleVisible" @close="closeAddRole" :createrId ="otherinfo.id" :theUser="theUser" @success="getSeachInfo"></AddRole>
    <RelationPer :popRelatVisible="addRelatVisible" :dotInfo="thePer" :thePerAllUserInfo="thePerAllUser" @close="closeAddDot" @success="getSeachInfo"></RelationPer>
    <div class="info_table_footer">

      <div class="total_footer">共计:{{ usersArr.length }}</div>
    </div>
  </div>
</template>
<script>
  import { getAuthInfo, getauthTreeInfo, deleteRoleInfo, getSelectDictInfo } from '@/api/company/permissionManage'
  import { getAllUser } from '../../../api/company/employeeManage'
  import { mapGetters } from 'vuex'
  import AddRole from './addRole'
  import RelationPer from './relationPer'
  import tableHeaderSearch from '@/components/tableHeaderSearch'
  export default {
    name: 'permissionManage',
    components: {
      AddRole,
      RelationPer,
      tableHeaderSearch
    },
    computed: {
      ...mapGetters([
        'otherinfo'
      ])
    },
    created() {
    },
    data() {
      return {
        searchDate: {
          roleName: '',
          id: ''
        },
        searchQuery: {
          currentPage: 1,
          pageSize: 100,
          searchVo: {}
        },
        btnsize: 'mini',
        loading: true,
        tableColumn: [{
          'label': '角色名称',
          'prop': 'roleName'
        },
        {
          'label': '创建者',
          'prop': 'createrName'
        },
        {
          'label': '创建时间',
          'prop': 'createTime'
        },
        {
          'label': '备注',
          'prop': 'remark'
        }],
        addRelatVisible: false,
        addDoRoleVisible: false,
        addDoTotVisible: false,
        addPeopleVisible: false,
        isModify: false,
        isReference: false,
        formLabelWidth: '120px',
        selected: [],
        usersArr: [],
        getTreeArr: [],
        theUser: {},
        thePer: {},
        theMentInfo: {},
        thePerAllUser: {},
        orgInfoCache: {}
      }
    },
    mounted() {
      Promise.all([getSelectDictInfo(this.otherinfo.orgid), this.fetchAllUser(this.otherinfo.orgid)]).then(resArr => {
        this.loading = false
        this.theMentInfo = resArr[0]
        this.thePerAllUser = resArr[1].list
      }).catch((err) => {
        this.loading = false
        this._handlerCatchMsg(err)
      })

      this.getSeachInfo()
      this.getTreeInfo()
    },
    methods: {
      changeKey(obj) {
        this.total = 0
        this.searchQuery = obj
        this.getSeachInfo(this.otherinfo.orgid, this.searchDate.roleName)
      },
      fetchAllUser(orgid, username, mobilephone) {
        return getAllUser(orgid, username || '', mobilephone || '')
      },
      getSeachInfo(orgid, roleName) {
        if (roleName) {
          this.searchDate.roleName = roleName
          getAuthInfo(this.otherinfo.orgid, this.searchDate.roleName, this.searchQuery.currentPage, this.searchQuery.pageSize, this.searchQuery.searchVo).then(res => {
            this.loading = false
            this.usersArr = res.list
          }).catch(err => {
            this._handlerCatchMsg(err)
          })
        } else {
          this.loading = false
          getAuthInfo(this.otherinfo.orgid, '', this.searchQuery.currentPage, this.searchQuery.pageSize, this.searchQuery.searchVo).then(res => {
            this.usersArr = res.list
          }).catch(err => {
            this._handlerCatchMsg(err)
          })
        }
      },
      getTreeInfo() {
        if (this.isModify || this.isReference) {
          getauthTreeInfo(this.theUser.id).then(res => {
            this.loading = false
            this.getTreeArr = res
          }).catch(err => {
            this._handlerCatchMsg(err)
          })
        } else {
          getauthTreeInfo(0).then(res => {
            this.loading = false
            this.getTreeArr = res
          }).catch(err => {
            this._handlerCatchMsg(err)
          })
        }
      },
      seleClick(selected) {
        this.selected = selected
      },
      doAction(type) {
        if (!this.selected.length && type !== 'addRole' && type !== 'depMain' && type !== 'deletePeople') {
          this.$message({
            message: '请选择要操作的角色~',
            type: 'warning'
          })
          return false
        }

        switch (type) {
          case 'addRole':
            this.theUser = {}
            this.addDoRoleVisible = true
            this.addRelatVisible = false
            this.isModify = false
            this.isReference = false

            break
          case 'roleNot':
            if (this.selected.length > 1) {
              this.$message({
                message: '每次只能修改单条数据~',
                type: 'warning'
              })
              return false
            }
            this.addDoRoleVisible = true
            this.addRelatVisible = false
            this.isReference = false
            this.isModify = true
            this.theUser = this.selected[0]
            this.getTreeInfo()
            break
          case 'reference':
            if (this.selected.length > 1) {
              this.$message({
                message: '每次只能参照单条数据~',
                type: 'warning'
              })
              return false
            } else {
              this.addDoRoleVisible = true
              this.addRelatVisible = false
              this.isModify = false
              this.isReference = true
              this.theUser = this.selected[0]
              this.getTreeInfo()
            }
            break
          case 'relationPer':
            if (this.selected.length > 1) {
              this.$message({
                message: '每次只能参照单条数据~',
                type: 'warning'
              })
              return false
            } else {
              this.addRelatVisible = true
              this.addDoRoleVisible = false
              this.isModify = false
              this.isReference = false
              this.thePer = this.selected[0]
            }
            break
          case 'deletePeople':
            this.addDoRoleVisible = false
            this.addRelatVisible = false
            const deleteItem = this.selected.length > 1 ? this.selected.length + '名' : this.selected[0].roleName
            let ids = ''
            this.selected.map(item => {
              ids += item.id + ','
            })
            ids = ids.slice(0, ids.length - 1)
            const id = this.selected[0].id
            this.$confirm('确定要删除 ' + deleteItem + ' 角色吗？', '提示', {
              confirmButtonText: '删除',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              deleteRoleInfo(id).then(res => {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                })
                this.getSeachInfo()
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
        }
        this.$refs.multipleTable.clearSelection()
      },
      filterTag(value, row) {
        return row.tag === value
      },
      clickDetails(row, event, column) {
        this.$refs.multipleTable.toggleRowSelection(row)
      },
      closeAddRole() {
        this.addDoRoleVisible = false
      },
      closeAddDot() {
        this.addRelatVisible = false
      },
      onSubmit() {
        this.getSeachInfo(this.otherinfo.orgid, this.searchDate.roleName)
      }
    }
  }
</script>
<style  type="text/css" lang="scss">
  @import "./index.css";
  .info_table_footer{
    padding-left: 20px;
    line-height: 30px;
    height: 30px;
    overflow: hidden;
  }
</style>

