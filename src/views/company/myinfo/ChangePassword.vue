<template>
<el-dialog class="passwordPop" title="修改密码" :visible.sync="isShow" :close-on-click-modal="false" :before-close="closeMe">
  <el-form :model="form" status-icon size="mini" :rules="rules" ref="ruleForm">
    <el-form-item label="账号" :label-width="formLabelWidth" prop="username">
      <el-input disabled v-model="form.username" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="原始密码" :label-width="formLabelWidth" prop="origin_pwd">
      <el-input type="password" v-model="form.origin_pwd" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="新密码" :label-width="formLabelWidth" prop="pwd">
      <el-input type="password" v-model="form.pwd" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="确认新密码" :label-width="formLabelWidth" prop="re_pwd">
      <el-input type="password" v-model="form.re_pwd" auto-complete="off"></el-input>
    </el-form-item>

  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button size="mini" @click="closeMe">取 消</el-button>
    <el-button size="mini" type="primary" @click="submitForm('ruleForm')">确 定</el-button>
  </div>
</el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import { putChangeMyPassword } from '../../../api/company/myinfo'

export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters([
      'otherinfo'
    ])
  },
  mounted() {
    this.form.username = this.otherinfo.username
    this.form.id = this.otherinfo.id
  },
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.pwd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      if (this.isCheck === 'false') {
        callback(new Error('请输入正确的密码！'))
        this.isCheck = ''
      } else {
        callback()
      }
    }
    const validatePwd = (rule, value, callback) => {
      if (typeof value !== 'string' || value === '' || value.length < 6) {
        callback('密码不能小于6位')
      } else {
        callback()
      }
    }
    return {
      isCheck: '',
      form: {
        id: 0,
        username: '',
        origin_pwd: '',
        pwd: '',
        re_pwd: '',
        errorTip: ''
      },
      formLabelWidth: '100px',
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        origin_pwd: [
          { required: true, message: '请输入原密码', trigger: 'blur' },
          {
            validator: validatePass, message: '请输入正确的密码'
          }
        ],
        pwd: [
          { required: true, message: '请输入新密码', trigger: 'blur', validator: validatePwd }
        ],
        re_pwd: [
          { required: true, message: '请再次输入新密码', trigger: 'change' },
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const form = this.form
          putChangeMyPassword({
            'username': form.username,
            'id': form.id,
            'password': form.origin_pwd,
            'newPassword': form.pwd,
            'affirmNewPassword': form.re_pwd
          }).then(res => {
            this.$alert('修改成功', '提示', {
              confirmButtonText: '确定',
              callback: action => {
                this.closeMe()
              }
            })
          }).catch(res => {
            if (res.text.indexOf('原密码错误') !== -1) {
              this.isCheck = 'false'
              this.$refs[formName].validate()
            }
            this.$message.error(res.text)
          })
        } else {
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    closeMe(done) {
      this.resetForm('ruleForm')
      this.$emit('update:isShow', false)
      if (typeof done === 'function') {
        done()
      }
    }
  }
}
</script>

<style lang="scss">
  .passwordPop .el-dialog{
    min-width: 300px;
    max-width: 404px;
    box-shadow: 0px 0px 15px 0px 
		rgba(0, 0, 0, 0.32);

    .el-dialog__header{
      padding-top: 10px;
      border-bottom: 1px solid #e6e6e6;
    }
    .el-dialog__title{
      font-size: 14px;
      font-weight: bold;
    }
    .el-dialog__footer{
      border-top: 1px solid #b6dfff;
      padding-bottom: 10px;
    }
  }
</style>
