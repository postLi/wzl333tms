<template>
  <div class="permManage" v-loading="loading">
    <div class="permManage-top">
      <el-form :inline="true" :model="usersArr" class="demo-form-inline">
        <el-form-item label="角色名称：">
          <el-input v-model="usersArr.roleName" placeholder="" clearable></el-input>
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
          <div class="btns_box_left">
            <img src="../../../assets/icom/xinzeng.png" alt="">
            <el-button type="primary" plain @click="doAction('addRole')">新增角色</el-button>
            <img src="../../../assets/icom/shanchu.png" alt="">
            <el-button type="primary" plain @click="doAction('roleNot')">修改</el-button>
            <img src="../../../assets/icom/shanchu.png" alt="">
            <el-button type="primary" plain @click="doAction('deletePeople')">删除</el-button>
            <img src="../../../assets/icom/shanchu.png" alt="">
            <el-button type="primary" plain @click="doAction('reference')">参照</el-button>
            <img src="../../../assets/icom/shanchu.png" alt="">
            <el-button type="primary" plain @click="doAction('relationPer')">关联员工 </el-button>
            <img src="../../../assets/icom/xinzengwangdian.png" alt="">
            <el-button type="primary" plain @click="doAction('depMaintain')" >部门维护</el-button>
          </div>
        </div>
        <!--表格功能-->
        <!--表格内容-->
        <div class="info_news">
          <el-table
            ref="multipleTable"
            :data="usersArr"
            stripe
            border
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
            </el-table-column>
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
              label="创建时间">
              <template slot-scope="scope">{{ new Date(scope.row.createTime).toLocaleDateString() }}</template>
            </el-table-column>
            <el-table-column
              prop="remark"
              label="备注">
            </el-table-column>
          </el-table>
        </div>
        <!--表格内容-->

      </div>
    </div>
    <AddRole :dotInfo="getTreeArr" :isModify="isModify" :popVisible="addDoRoleVisible" @close="closeAddRole" ></AddRole>
    <RelationPer :popRelatVisible="addRelatVisible" @close="closeAddDot"></RelationPer>
    <!--<DepMaintain :popDepMainVisible="adddepMaintainisible" @close="closeAddDot"></DepMaintain>-->
  </div>
</template>
<script>
  import { getAuthInfo , getauthTreeInfo } from '@/api/company/permissionManage'
  import { deleteEmployeer } from '@/api/company/employeeManage'
  import { mapGetters } from 'vuex'
  import AddRole from './addRole'
  import RelationPer from './relationPer'
  import DepMaintain from './depMaintain'
  export default {
    components: {
      AddRole,
      RelationPer,
      DepMaintain
    },
    computed: {
      ...mapGetters([
        'otherinfo'
      ])
    },
    created() {
      // console.log(this.otherinfo)
    },
    data() {
      return {
        searchDate: {
          roleName: '',
          id:''
        },
        //加载状态
        loading:true,
        addRelatVisible:false,
        addDoRoleVisible:false,
        adddepMaintainisible:false,
        addDoTotVisible:false,
        addPeopleVisible:false,
        isModify: false,
        formLabelWidth: '120px',
        //表格内容
        selected:[],
        usersArr: [],
        getTreeArr:[],
        //左边树形初始化数据
        dataTree:[],
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        //左边树形初始化数据
        getOrgId: '',//根据组织id获取列表
        role_id:0,
        // 缓存节点数据
        orgInfoCache: {}
      }
    },
    mounted() {
      Promise.all([getAuthInfo(this.otherinfo.orgid),getauthTreeInfo(this.role_id)]).then( resArr => {
        this.loading = false
        this.usersArr = resArr[0]
        this.getTreeArr = resArr[1]
      })
    },
    methods: {
      seleClick(selected) {
        this.selected = selected
      },
      doAction(type){
        //  判断是否有选中项
        if(!this.selected.length && type === 'deletePeople') {
          this.$message({
            message: '请选择要操作的员工~',
            type: 'warning'
          })
          return false
        }

        switch (type){
          //新增角色
          case 'addRole':
            this.addDoRoleVisible = true
            this.addRelatVisible = false
            this.isModify = false
            console.log(this.isModify + "163");
            break;
          //修改角色
          case 'roleNot':
            this.addDoRoleVisible = true
            this.addRelatVisible = false
            this.isModify = true

            break;
          //关联员工
          case 'relationPer':
            this.addDoRoleVisible = false
            this.addRelatVisible = true
            this.isModify = false
            break;
          //  部门维护
          case 'depMaintain':
            this.isModify = false
            this.adddepMaintainisible = true
            break;
          //    删除员工
          case 'deletePeople':
            let deleteItem = this.selected.length > 1 ? this.selected.length + '名' : this.selected[0].roleName
            //=>todo 删除多个
            let ids = ''
            this.selected.map(item => {
              ids += item.id + ','
            })
            ids = ids.slice(0, ids.length - 1)
            let id = this.selected[0].id
            this.$confirm('确定要删除 ' + deleteItem + ' 员工吗？', '提示', {
              confirmButtonText: '删除',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              deleteEmployeer(id).then(res => {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                })
                // this.getAuthInfo()
              }).catch(err=>{
                this.$message({
                  type: 'info',
                  message: '删除失败，原因：' + err.errorInfo ? err.errorInfo : err
                })
              })

            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              })
            })
            break;
          //修改网点
          case 'modifyDot':
            this.isModify = true
            this.addDoTotVisible = true
            break;
        }
      },
      //表头筛选
      filterTag(value, row) {
        return row.tag === value
      },
      clickDetails(row, event, column){
        this.$refs.multipleTable.toggleRowSelection(row)
      },
      getCheckedKeys() {
        this.getOrgId = this.$refs.tree._data.currentNode.node.data.id
        this.fetchOrgId(this.getOrgId)//根据组织id显示列表
      },
      closeAddRole(){
        this.addDoRoleVisible = false
      },
      closeAddDot(){
        this.addRelatVisible = false
      },
      onSubmit() {
        console.log(this.searchDate.roleName)
        console.log('submit!');
      }
    }
  }
</script>
<style  type="text/css" lang="scss">
  @import "./index.css";
</style>

