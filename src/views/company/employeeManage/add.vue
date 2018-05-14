<template>
  <pop-right :title="popTitle" :isShow="popVisible" @close="closeMe" class="addEmployeerPop">
    <template class="addEmployeerPop-content" slot="content">
      <el-form :model="form" :rules="rules" ref="ruleForm" :inline="true" label-position="right" size="mini">
        <el-form-item label="用户姓名" :label-width="formLabelWidth" prop="username">
          <el-input v-model="form.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" :label-width="formLabelWidth" prop="mobilephone">
          <el-input v-model="form.mobilephone" maxlength="11" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="登录账号" :label-width="formLabelWidth" prop="loginAccount">
          <el-tooltip class="item" effect="dark" placement="top" :enterable="false" :manual="true" :value="tooltip" tabindex="-1">
            <div slot="content">账号可以由字母、数字、中文组成<br/>长度范围2~15个字符</div>
            <el-input v-model.trim="form.loginAccount" auto-complete="off" @focus="tooltip = true" @blur="tooltip = false"></el-input>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="职位" :label-width="formLabelWidth" prop="position">
          <el-input v-model="form.position" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-select v-model="form.sexFlag" placeholder="请选择性别">
            <el-option label="男" value="0"></el-option>
            <el-option label="女" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="归属网点" :label-width="formLabelWidth">
          <el-select v-model="form.orgId" placeholder="请选择网点">
            <el-option v-for="item in groups" :key="item.id" :label="item.orgName" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="权限角色" :label-width="formLabelWidth">
          <el-select multiple v-model="form.rolesId" placeholder="请选择权限">
            <el-option v-for="item in roles" :key="item.id" :label="item.roleName" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="归属部门" :label-width="formLabelWidth">
          <el-select v-model="form.departmentId" placeholder="请选择部门">
            <el-option v-for="item in departments" :key="item.id" :label="item.dictName" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="info">注：密码默认为：123456。</div>
    </template>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      <el-button @click="closeMe">取 消</el-button>
    </div>
  </pop-right>
</template>
<script>
import { validateMobile, isvalidUsername }  from '@/utils/validate'
import { getOrgInfo, postEmployeer } from '../../../api/company/employeeManage'
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
    roles: {
      type: Array,
      default: []
    },
    departments: {
      type: Array,
      default: []
    },
    groups: {
      type: Array,
      default: []
    }
  },
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm2.checkPass !== '') {
          this.$refs.ruleForm2.validateField('checkPass');
        }
        callback();
      }
    }

    const validateFormMobile = function (rule, value, callback) {
      if(validateMobile(value)){
        callback()
      } else {
        callback(new Error('请输入有效的手机号码'))
      }
    }

    const validateLoginAccount = function (rule, value, callback) {
      if(isvalidUsername(value)){
        callback()
      } else {
        callback(new Error('用户名只能由中文，数字，字母组成'))
      }
    }

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
      rules: {
        username: [
          { required: true, message: '请输入用户姓名', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        mobilephone: [
          { required: true, message: '请输入手机号码', trigger: 'change', validator: validateFormMobile }
        ],
        loginAccount: [
          { required: true, message: '请输入有效的登录账号', trigger: 'blur', validator: validateLoginAccount },
          { max: 15, message: '不能超过15个字符', trigger: 'change' },
        ],
        position: [
          { max: 10,  message: '不能超过10个字符', trigger: 'change' }
        ]
      },
      popTitle: '新增员工',
      orgArr: [],
      rolesArr: [],
      departmentArr: []

    }
  },
  mounted () {
    //this.fetchInfo()
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('可以提交到后台!');
        } else {
          return false;
        }
      });
    },
    fetchInfo () {
      getOrgInfo().then(dataArr => {
        this.orgArr = dataArr[0]
        this.departmentArr = dataArr[1]
        this.rolesArr = dataArr[2]
      })
    },
    closeMe (done) {
      this.$refs['ruleForm'].resetFields()
      this.$emit('update:popVisible', false);
      if(typeof done === 'function'){
        done()
      }
    },
  }
}
</script>
<style lang="scss">
.addEmployeerPop{
  left: auto;
  top: 50px;
  bottom: auto;
  height: 100%;
  min-width: 600px;
  max-width:  600px;

  .popRight-content{
    padding: 20px 20px 0;
    box-sizing: border-box;
  }

  .el-select .el-input__inner{
    padding-right: 15px;
  }
}
</style>

