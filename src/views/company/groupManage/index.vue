<template>
  <!--v-loading="loading"-->
  <div class="company clearfix" >
    <div class="company-box">
      <div class="side_left">
        <el-tree
          :data="dataTree"
          node-key="id"
          :default-expanded-keys="[1]"
          :props="defaultProps"
          ref="tree"
          @node-click="getCheckedKeys"
        >
        </el-tree>
      </div>

      <div class="side_right">
        <div class="side_right_top">
          <el-form :model="form" :rules="rules" class="demo-ruleForm" :inline="true" label-position="right" size="mini">
            <el-form-item label="网点名称" :label-width="formLabelWidth" prop="orgName">
              <el-input v-model="form.orgName" auto-complete="off" disabled></el-input>
            </el-form-item>
            <el-form-item label="网点类型" :label-width="formLabelWidth">
              <el-input :value='form.orgType ==="1" ? "营业网点" : "分拨中心"' disabled></el-input>
            </el-form-item>
            <el-form-item label="网点状态" :label-width="formLabelWidth" disabled="disabled">
              <el-input :value='form.status ==="32" ? "有效" : "有效"' disabled></el-input>
            </el-form-item>
            <el-form-item label="客服人员" :label-width="formLabelWidth" prop="chargePerson">
              <el-input v-model="form.serviceName" auto-complete="off" disabled></el-input>
            </el-form-item>
            <el-form-item label="客服电话" :label-width="formLabelWidth" prop="checkPhone">
              <el-input v-model="form.servicePhone" auto-complete="off" disabled></el-input>
            </el-form-item>
            <el-form-item label="上级网点" :label-width="formLabelWidth">
              <el-input v-model="form.parentName" disabled></el-input>
            </el-form-item>
            <el-form-item label="经营类型" :label-width="formLabelWidth">
              <el-input :value='form.manageType ==="3" ? "自营" : "加盟"' disabled></el-input>
            </el-form-item>
            <el-form-item label="创建时间" :label-width="formLabelWidth" prop="creatTime">
              <el-input v-model="form.creatTime" disabled></el-input>
            </el-form-item>
            <el-form-item label="网点代码" :label-width="formLabelWidth" prop="networkCode">
              <el-input v-model="form.networkCode" auto-complete="off" disabled></el-input>
            </el-form-item>
            <el-form-item label="代收款限额" :label-width="formLabelWidth">
              <el-input v-model="form.collectionFee" auto-complete="off" disabled></el-input>
            </el-form-item>
            <el-form-item label="负责人" :label-width="formLabelWidth" prop="chargePerson">
              <el-input v-model="form.responsibleName" auto-complete="off" disabled></el-input>
            </el-form-item>
            <el-form-item label="负责人电话" :label-width="formLabelWidth" prop="checkPhone">
              <el-input  v-model="form.responsibleTelephone"  auto-complete="off" disabled></el-input>
            </el-form-item>
            <el-form-item label="所在城市" :label-width="formLabelWidth">
              <el-input v-model="form.city" auto-complete="off" disabled></el-input>
            </el-form-item>
            <el-form-item label="锁机额度" :label-width="formLabelWidth">
              <el-input v-model="form.lockMachineQuota" auto-complete="off" disabled></el-input>
            </el-form-item>

            <el-form-item label="预警额度" :label-width="formLabelWidth">
              <el-input v-model="form.warningQuota" auto-complete="off" disabled></el-input>
            </el-form-item>


          </el-form>
        </div>
        <div class="side_right_bottom clearfix">
          <div class="btns_box clearfix">
            <!--表格功能-->
            <div class="btns_box_left">
              <img src="../../../assets/icom/xinzeng.png" alt="">
              <el-button type="primary" plain @click="doAction('addPeople')">新增员工</el-button>
              <img src="../../../assets/icom/shanchu.png" alt="">
              <el-button type="primary" plain @click="doAction('deletePeople')">删除员工</el-button>
              <img src="../../../assets/icom/xiugai.png" alt="">
              <el-button type="primary" plain @click="doAction('modifyNot')">修改网点</el-button>
              <img src="../../../assets/icom/xinzengwangdian.png" alt="">
              <el-button type="primary" plain @click="doAction('addNot')" >新增网点</el-button>
            </div>
            <div class="btns_box_right">
              <p>广东广州员工</p>
            </div>
            <div class="Pagination ">
              <div class="block">
                <span class="user-length">共计:{{ usersArr.length }}</span>
                <div class="show_pager"> <Pager :total="usersArr.length" @change="handlePageChange" /></div>

              </div>
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
                label="序号">
              </el-table-column>
              <el-table-column
                fixed
                prop="name"
                label="姓名">
              </el-table-column>
              <el-table-column
                prop="orgName"
                label="归属网点">
              </el-table-column>
              <el-table-column
                prop="departmentName"
                label="归属部门">
              </el-table-column>
              <el-table-column
                prop="position"
                label="职务">
              </el-table-column>
              <el-table-column
                prop="username"
                label="登录账号">
              </el-table-column>
              <el-table-column
                label="权限角色">
                <template slot-scope="scope">
                  <span v-if="scope.row.rolesName">{{ scope.row.rolesName }}</span>
                  <span class="unauth" v-else>未授权</span>
                </template>
              </el-table-column>
              <el-table-column
                label="性别"
                width="80">
                <template slot-scope="scope">
                  {{ scope.row.sexFlag === "0" ? "男" : "女" }}
                </template>
              </el-table-column>
              <el-table-column
                prop="mobilephone"
                label="联系手机"
                width="200">
              </el-table-column>
            </el-table>
          </div>
          <!--表格内容-->

        </div>
      </div>
      <AddDot :dotInfo="form" :isModify="isModify" @success="fetchOrg(getOrgId)" :popVisible="addDoTotVisible" @close="closeAddDot" />
      <AddPeople :popVisible.sync="addPeopleVisible" @close="closeAddPeople" :orgid="getOrgId" @success="fetchOrgId(getOrgId)" />
    </div>
  </div>
</template>
<script type="text/javascript">
    import AddPeople from '../employeeManage/add'
    import AddDot from './addDot'
    import { getOrgId , isEmpty , fmtDate } from '../../../api/company/groupManage'
    import { getAllOrgInfo, getGroupName, getAllUser, getAuthInfo, getDepartmentInfo, deleteEmployeer } from '../../../api/company/employeeManage'
    import { mapGetters } from 'vuex'
    import Pager from '@/components/Pagination/index'

    export default {
      components: {
        AddDot,
        AddPeople,
        Pager
      },
      computed: {
        ...mapGetters([
          'otherinfo'
        ])
      },
        data() {
            return {
              rules:{
                // networkCode:{required: true}
              },
              //加载状态
              loading:true,
              addDoTotVisible:false,
              addPeopleVisible:false,
              usersArr: [],
              //
              isModify: false,
              //新建网点
              ruleForm: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
              },
               formLabelWidth: '120px',
                currentPage1: 5,
                currentPage2: 5,
                currentPage3: 5,
                currentPage4: 4,
                //表格内容
              selected:[],
                //左边树形初始化数据
                dataTree:[],
                defaultProps: {
                  children: 'children',
                  label: 'name'
                },
                //左边树形初始化数据
                getOrgId: '',//根据组织id获取列表
                form: {
                  orgName: '',
                  orgType:1,
                  status:32,
                  responsibleTelephone: '',
                  // creatTime:'',
                  responsibleName: '',
                  city:'',
                  serviceName:'',
                  parentName:'',//上级网点
                  servicePhone:'',
                  detailedAddr:'',
                  networkCode:'',//网点代码
                  collectionFee:'',//代收款额度
                  benchmark:'',
                  warningQuota:'',
                  lockMachineQuota:'',
                  manageType:3,
                  remarks:'',
                  //默认值
                  accountStatus:'0',
                  //id:1,
                  parentId:0

                },
                  // 缓存节点数据
                  orgInfoCache: {}
              };
            },
        mounted () {
          this.fetchOrg()//左边树形数据

        },
        methods: {
          //左边树形数据
          fetchOrg() {
            getAllOrgInfo(this.otherinfo.orgid).then(data => {

                  this.dataTree = data
                  this.fetchOrgId(this.dataTree[0].id)//根据组织id显示列表
            })
          },
          // 处理返回的节点数据
          handleOrgInfo(data){
            this.form = data
          },
          // 根据组织id显示列表
          fetchOrgId(id) {
            this.getOrgId = parseInt(id, 10)
            this.fetchAllUsers(id)
            if(this.orgInfoCache[id]){
              this.handleOrgInfo(this.orgInfoCache[id])
            } else {
              getOrgId(id).then(res => {
                this.orgInfoCache[id] = res.data
                this.handleOrgInfo(res.data)
              })
            }
          },
          fetchAllUsers (orgid, name = "", mobile = "", pageSize = 100, pageNum = 1) {
            getAllUser(orgid, name, mobile , pageSize, pageNum).then(res=>{
              this.usersArr = res
            })
          },
          handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
          },
          handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
          },
          //表格内容
          clickDetails(row, event, column) {
            this.$refs.multipleTable.toggleRowSelection(row)
          },
          seleClick(selected) {
            this.selected = selected
            console.log(this.selected)
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
                //新增员工
              case 'addPeople':
                this.addPeopleVisible = true
                this.isModify = false
                console.log(this.isModify);
                break;
              //  新增网点
              case 'addNot':
                this.isModify = false
                this.addDoTotVisible = true
                break;
            //    删除员工
              case 'deletePeople':
                let deleteItem = this.selected.length > 1 ? this.selected.length + '名' : this.selected[0].name
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
                    this.fetchOrgId(this.getOrgId)
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
              case 'modifyNot':
                this.isModify = true
                this.addDoTotVisible = true
                break;
            }
          },
          //表头筛选
          filterTag(value, row) {
            return row.tag === value
          },
          getCheckedKeys() {
            this.fetchOrgId(this.$refs.tree._data.currentNode.node.data.id)//根据组织id显示列表
          },
          //新增网点
          closeAddDot(){
            this.addDoTotVisible = false
          },
          closeAddPeople(){
            this.addPeopleVisible = false
          },
          handlePageChange (obj) {
            this.fetchAllUsers(this.getOrgId, '', '', obj.pageSize, obj.pageNum)
          }
        }
      }
</script>

<style type="text/css" lang="scss">
  @import "../../../styles/mixin.scss";
  @import "./index.css";

  .show_pager{
    float: right;
  }
</style>
