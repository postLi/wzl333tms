<template>
  <!--v-loading="loading"-->
  <div class="company clearfix" v-loading="loading">
    <div class="company-box">
      <div class="side_left">
        <el-tree
          :data="getDataTree"
          node-key="id"
          :default-expanded-keys="[1]"
          :props="defaultProps"
          ref="tree"
          default-expand-all
          @node-click="getCheckedKeys"

        >
            <span class="custom-tree-node" slot-scope="{ node, data }">
             <span v-bind:class="[data.status === 31 ? 'treeClass' : 'treeAct'] ">{{ node.label }}</span>
        </span>


        </el-tree>
      </div>

      <div class="side_right">
        <el-collapse accordion change="doLayout">


          <el-collapse-item title="公司信息:" v-if="form.parentId === 0">
            <div class="side_right_top" :class="{currActive:form.status ===31}">
              <el-form :model="form" class="demo-ruleForm" :inline="true" label-position="right" size="mini">
                <el-form-item label="公司名称" :label-width="formLabelWidth">
                  <el-input v-model="form.orgName" auto-complete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="网点类型" :label-width="formLabelWidth">
                  <el-input :value='form.orgTypeName' disabled></el-input>
                  <!--<el-input :value='form.orgType ===1 ? "营业网点" : "分拨中心"' disabled></el-input>-->
                </el-form-item>
                <el-form-item label="公司状态" :label-width="formLabelWidth" disabled="disabled">
                  <el-input :value='form.status ===32 ? "有效" : "无效"' disabled></el-input>
                </el-form-item>
                <el-form-item label="客服人员" :label-width="formLabelWidth">
                  <el-input v-model="form.serviceName" auto-complete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="客服电话" :label-width="formLabelWidth">
                  <el-input v-model="form.servicePhone" auto-complete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="公司代码" :label-width="formLabelWidth">
                  <el-input v-model="form.networkCode" auto-complete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="负责人" :label-width="formLabelWidth">
                  <el-input v-model="form.responsibleName" auto-complete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="负责人电话" :label-width="formLabelWidth">
                  <el-input v-model="form.responsibleTelephone" auto-complete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="所在城市" :label-width="formLabelWidth">
                  <el-input v-model="form.city" auto-complete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="详情地址" :label-width="formLabelWidth">
                  <el-input v-model="form.detailedAddr" auto-complete="off" disabled></el-input>
                </el-form-item>


              </el-form>
            </div>
          </el-collapse-item>


          <el-collapse-item title="网点信息:" v-else>
            <div class="side_right_top" :class="{currActive:form.status ===31}">
              <el-form :model="form" class="demo-ruleForm" :inline="true" label-position="right" size="mini">
                <el-form-item label="网点名称" :label-width="formLabelWidth">
                  <el-input v-model="form.orgName" auto-complete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="网点类型" :label-width="formLabelWidth">
                  <el-input :value='form.orgTypeName' disabled></el-input>
                </el-form-item>
                <el-form-item label="网点状态" :label-width="formLabelWidth" disabled="disabled">
                  <el-input :value='form.status ===32 ? "有效" : "无效"' disabled></el-input>
                </el-form-item>
                <el-form-item label="客服人员" :label-width="formLabelWidth">
                  <el-input v-model="form.serviceName" auto-complete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="客服电话" :label-width="formLabelWidth">
                  <el-input v-model="form.servicePhone" auto-complete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="上级网点" :label-width="formLabelWidth">
                  <el-input :value="form.parentName || form.orgName" disabled></el-input>
                </el-form-item>
                <el-form-item label="经营类型" :label-width="formLabelWidth">
                  <el-input :value='form.manageType ===4 ? "加盟" : "自营"' disabled></el-input>
                </el-form-item>
                <el-form-item label="创建时间" :label-width="formLabelWidth">
                  <el-input :value=" form.createTime| parseTime('{y}/{m}/{d}')" disabled></el-input>
                </el-form-item>
                <el-form-item label="网点代码" :label-width="formLabelWidth">
                  <el-input v-model="form.networkCode" auto-complete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="代收款限额" :label-width="formLabelWidth">
                  <el-input v-model="form.collectionFee" auto-complete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="负责人" :label-width="formLabelWidth">
                  <el-input v-model="form.responsibleName" auto-complete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="负责人电话" :label-width="formLabelWidth">
                  <el-input v-model="form.responsibleTelephone" auto-complete="off" disabled></el-input>
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
          </el-collapse-item>
        </el-collapse>


        <div class="side_right_bottom clearfix">
          <div class="btns_box_lrl clearfix">
            <el-button type="primary" :size="btnsize" icon="el-icon-circle-plus" v-if="form.status ===32" plain @click="doAction('addPeople')" v-has:ORGTREELIST_ADD>              新增员工
            </el-button>
            <el-button type="danger" :size="btnsize" icon="el-icon-delete" @click="doAction('deletePeople')" plain v-has:ORGTREELIST_DELETE>
              删除员工
            </el-button>
            <el-button type="primary" :size="btnsize" icon="el-icon-edit" @click="doAction('modifyNot')" plain v-has:ORGTREELIST_UPDATE>修改网点
            </el-button>
            <el-button v-if="form.status ===32" type="primary" :size="btnsize" icon="el-icon-circle-plus" @click="doAction('addNot')" plain v-has:ORGTREELIST_ADDWD>
              新增网点
            </el-button>
            <el-button type="primary" :size="btnsize" icon="el-icon-edit" @click="doAction('depMain')" plain v-has:ORGTREELIST_EDIT>部门维护
            </el-button>
            <el-col class="org-name"><p>{{form.orgName}}</p></el-col>
          </div>
          <div class="info_news">

            <el-table
              ref="multipleTable"
              :data="usersArr"
              stripe
              border
              tooltip-effect="dark"
              height="100%"
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
                width="60"
                label="序号">
                <template slot-scope="scope">{{ ((pageNum - 1)*pageSize) + scope.$index + 1 }}</template>
              </el-table-column>
              <el-table-column
                fixed
                prop="name"
                width="150"
                label="姓名">
              </el-table-column>
              <el-table-column
                prop="orgName"
                width="230"
                label="归属网点">
              </el-table-column>
              <el-table-column
                prop="departmentName"
                width="150"
                label="归属部门">
              </el-table-column>
              <el-table-column
                prop="position"
                width="150"
                label="职务">
              </el-table-column>
              <el-table-column
                prop="username"
                width="200"
                label="登录账号">
              </el-table-column>
              <el-table-column
                width="220"
                label="权限角色">
                <template slot-scope="scope">
                  <span v-if="scope.row.rolesId !== '0'">{{ scope.row.rolesName }}</span>
                  <span class="unauth" v-else>未授权</span>
                </template>
              </el-table-column>
              <el-table-column
                label="性别"
                width="100">
                <template slot-scope="scope">
                  {{ scope.row.sexFlag === "0" ? "男" : "女" }}
                </template>
              </el-table-column>
              <el-table-column
                prop="mobilephone"
                label="联系手机"
              >
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <AddDot :dotInfo="getform" :orgid="getOrgId || otherinfo.orgid" :companyId="otherinfo.companyId"
              :isModify="isModify" :getCheckedKeyId="getCheckedKeyId" @success="updateSuccess"
              :popVisible="addDoTotVisible" @close="closeAddDot"/>
      <AddPeople :popVisible.sync="addPeopleVisible" @close="closeAddPeople" :orgid="getOrgId || otherinfo.orgid"
                 @success="fetchOrgId(getOrgId)"/>
      <DepMaintain :popVisible.sync="addDepMaintainisible" :isDepMain="isDepMain" :dotInfo="usersArr" @close="closeDep"
                   :createrId="otherinfo.orgid"></DepMaintain>
    </div>
    <div class="info_news_footer">
      <div class="checked_footer">
        <el-checkbox v-model="checkedInput" value="checkbox" checked="checked">过滤失效网点</el-checkbox>
      </div>
      <div class="total_footer">共计:{{ total }}</div>
      <div class="show_pager">
        <Pager :total="total" @change="handlePageChange"/>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
  import AddPeople from '../employeeManage/add'
  import AddDot from './addDot'
  import DepMaintain from './depMaintain'
  import { getOrgId } from '../../../api/company/groupManage'
  import { getAllUser, deleteEmployeer, postAllOrgInfo } from '../../../api/company/employeeManage'

  import { mapGetters } from 'vuex'
  import Pager from '@/components/Pagination/index'
  import { getUserInfo } from '../../../utils/auth'
  import { objectMerge2 } from '@/utils/index'

  export default {
    name: 'groupManage',
    components: {
      AddDot,
      AddPeople,
      Pager,
      DepMaintain
    },
    computed: {
      ...mapGetters([
        'otherinfo'
      ]),
      getDataTree() {
        return this.checkedInput ? this.dataTreeFn(objectMerge2([], this.dataTree)) : this.dataTree
      }
    },
    data() {
      return {
        checkedInput: false, // 过滤失效网点
        getCheckedKeyId: '',
        btnsize: 'mini',
        // 加载状态
        loading: true,
        addDoTotVisible: false,
        addPeopleVisible: false,
        addDepMaintainisible: false,
        hiddenDep: false,
        isDepMain: false,
        usersArr: [],
        total: 0,
        orgName: '',
        //
        isModify: false,
        // 新建网点
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
        // 表格内容
        selected: [],
        dataTree: [],
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        getOrgId: '',
        form: {
          orgName: '',
          orgTypeName: '',
          status: 32,
          responsibleTelephone: '',
          responsibleName: '',
          city: '',
          serviceName: '',
          parentName: '',
          servicePhone: '',
          detailedAddr: '',
          networkCode: '', //
          collectionFee: '', //
          benchmark: '',
          warningQuota: '',
          lockMachineQuota: '',
          manageType: 3,
          remarks: '',
          accountStatus: '0',
          parentId: 0
        },
        orgInfoCache: {},
        userinfo: {},
        pageSize: '',
        pageNum: '',
        getform: {}
      }
    },

    mounted() {
      this.loading = true
      this.fetchOrg()
      this.userinfo = getUserInfo()
      if (this.userinfo.companyId === this.userinfo.orgid) {
        this.hiddenDep = true
      }
    },
    methods: {
      dataTreeFn(arr) {
        return arr.filter((el, val) => {
          if (el.status !== 31) {
            if (el.children) {
              el.children = this.dataTreeFn(el.children)
            }
            return true
          } else {
            return false
          }
        })
      },
      updateSuccess(isModify) {
        this.fetchOrg(this.getOrgId)
        if (isModify) {
          this.getOrgInfo(this.getOrgId)
        }
      },
      fetchOrg() {
        this.loading = true
        postAllOrgInfo(this.otherinfo.orgid).then(data => {
          this.dataTree = data
          this.fetchOrgId(this.dataTree[0].id)
          this.loading = false
        }).catch((err) => {
          this.loading = false
          this._handlerCatchMsg(err)
        })
      },
      handleOrgInfo(data) {
        this.form = data
        this.getform = objectMerge2({}, this.form)
      },
      fetchOrgId(id) {
        this.loading = true
        this.getOrgId = parseInt(id, 10)
        this.fetchAllUsers(id)
        if (this.orgInfoCache[id]) {
          this.handleOrgInfo(this.orgInfoCache[id])
          this.loading = false
        } else {
          this.loading = true
          this.getOrgInfo(id)
        }
        this.loading = false
      },
      getOrgInfo(id) {
        this.loading = true
        getOrgId(id).then(res => {
          this.orgInfoCache[id] = res.data
          this.handleOrgInfo(res.data)
          this.loading = false
        })
      },
      fetchAllUsers(orgid, name = '', mobile = '', pageSize = 100, pageNum = 1) {
        this.loading = true
        getAllUser(orgid, name, mobile, pageSize, pageNum).then(res => {
          this.usersArr = res.list
          this.total = res.total
          this.loading = false
        })
      },
      seleClick(selected) {
        this.selected = selected
      },
      doAction(type) {
        if (!this.selected.length && type === 'deletePeople') {
          this.$message({
            message: '请选择要操作的员工~',
            type: 'warning'
          })
          return false
        }
        switch (type) {
          case 'addPeople':
            this.addPeopleVisible = true
            this.addDoTotVisible = false
            this.addDepMaintainisible = false
            this.isModify = false
            this.isDepMain = false
            break
          case 'addNot':
            this.isModify = false
            this.isDepMain = false
            this.addDoTotVisible = true
            this.addPeopleVisible = false
            this.addDepMaintainisible = false
            break
          case 'modifyNot':
            this.isModify = true
            this.isDepMain = false
            this.addDoTotVisible = true
            break
          case 'depMain':
            this.isModify = false
            this.isDepMain = true
            this.addDepMaintainisible = true
            this.addDoTotVisible = false
            this.addPeopleVisible = false
            break
          case 'deletePeople':
            this.addDepMaintainisible = false
            this.addDoTotVisible = false
            this.addPeopleVisible = false
            var deleteItem = this.selected.length > 1 ? this.selected.length + '名' : this.selected[0].name
            var ids = ''
            this.selected.map(item => {
              ids += item.id + ','
            })
            ids = ids.slice(0, ids.length - 1)
            this.$confirm('确定要删除 ' + deleteItem + ' 员工吗？', '提示', {
              confirmButtonText: '删除',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.loading = true
              deleteEmployeer(ids).then(res => {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                })

                this.fetchOrgId(this.getOrgId)
                this.loading = false
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
      // 表头筛选
      filterTag(value, row) {
        return row.tag === value
      },
      getCheckedKeys() {
        this.loading = true
        this.getCheckedKeyId = this.$refs.tree._data.currentNode.node.data.id
        this.fetchOrgId(this.$refs.tree._data.currentNode.node.data.id)
        this.addDoTotVisible = false
        this.loading = false
      },
      closeAddDot() {
        this.addDoTotVisible = false
      },
      closeAddPeople() {
        this.addPeopleVisible = false
      },
      closeDep() {
        this.addDepMaintainisible = false
      },
      handlePageChange(obj) {
        this.fetchAllUsers(this.getOrgId, '', '', obj.pageSize, obj.pageNum)
      },
      doLayout() {
        this.$refs.multipleTable.doLayout()
      },
      clickDetails(row, event, column) {
        this.$refs.multipleTable.toggleRowSelection(row)
      }
    }
  }
</script>

<style type="text/css" lang="scss">
  @import "../../../styles/mixin.scss";
  @import "../../../styles/gmIndex.css";

  .info_news_footer .total_footer {
    float: left;
    padding-left: 80px;
  }

  .info_news_footer .checked_footer {
    float: left;
    padding-left: 10px;
  }

</style>
