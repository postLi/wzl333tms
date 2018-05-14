<template>
  <pop-right title="员工授权" :isShow="popVisible" @close="closeMe" class="setUserAuthPop">
    <template class="setUserAuthPop-content" slot="content">
      <table>
        <thead>
          <tr>
            <th>员工</th>
            <th>权限角色</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user,index) in users" :key="index">
            <td>
              {{user.name}}
            </td>
            <td>
              <el-select size="mini" multiple v-model="form.rolesId" placeholder="请选择权限">
                <el-option v-for="item in roles" :key="item.id" :label="item.roleName" :value="item.id"></el-option>
              </el-select>
            </td>
          </tr>
        </tbody>
      </table>
    </template>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
      <el-button @click="closeMe">取 消</el-button>
    </div>
  </pop-right>
</template>
<script>
import { postEmployeer } from '../../../api/company/employeeManage'
import popRight from '@/components/PopRight/index'

export default {
  components: {
    popRight
  },
  props: {
    popVisible: {
      type: Boolean,
      default: false
    },
    users: {
      type: Array,
      default: []
    },
    roles: {
      type: Array,
      default: []
    }
  },
  data () {

    return {
      form: {
        username: '', // 用户姓名
        mobilephone: '', // 手机号码
        loginAccount: '', // 登录账户
        position: '', // 职位
        sexFlag: '',// 性别
        orgId: [], // 归属网点
        rolesId: [], // 权限角色
        departmentId: '', // 归属部门
        password: '123456'
      },
      formLabelWidth: '80px',
      tooltip: false,
      orgArr: [],
      rolesArr: [],
      departmentArr: []

    }
  },
  mounted () {

  },
  methods: {
    submitForm(formName) {
      alert('TIjiao')
    },
    closeMe () {
      this.$emit('update:popVisible', false);
    },
  }
}
</script>
<style lang="scss">
.setUserAuthPop{
  left: auto;
  top: 50px;
  bottom: auto;
  min-width: 320px;
  max-width:  320px;

  table{
    width: 100%;
  }

  th,td{
    border: 1px solid #ccc;
    padding: 5px;
    text-align: center;
    font-size: 14px;
  }

  thead{
    th{
      background: #eee;
    }
  }

  .popRight-content{
    padding: 20px 20px 0;
  }

  .el-select .el-input__inner{
    padding-right: 15px;
  }
}
</style>

