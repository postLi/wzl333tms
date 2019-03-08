<template>
  <el-dialog title="忘记密码" :visible.sync="dialogVisible" center :close-on-click-modal="false" :close-on-press-escape="false" :before-close="closeMe" width="800px">
    <el-steps :active="active" finish-status="success" align-center class="forgetPwd-steps">
      <el-step :title="active<1?'步骤 1':'成功'" :description="desA"></el-step>
      <el-step :title="active<2?'步骤 2':'成功'" :description="desB"></el-step>
      <el-step :title="active<3?'步骤 3':'成功'" :description="'请为你的账号'+(active>0? formA.username : '')+'设置一个新密码'"></el-step>
    </el-steps>
    <div class="forgetPwd-form">
      <el-form :model="formA" :rules="ruleA" ref="formA" label-width="100px" class="demo-ruleForm" v-if="active === 0">
        <el-form-item label="账号" prop="username">
          <el-input :autofocus="true" autoComplete="off" v-model="formA.username" placeholder="请输入账号" maxlength="30" @keyup.enter.native="next" @focus="focus()"></el-input>
        </el-form-item>
      </el-form>
      <el-form :model="formB" :rules="ruleB" ref="formB" label-width="100px" class="demo-ruleForm" v-if="active === 1">
        <el-form-item label="手机号" prop="phone">
          <el-input autoComplete="off" v-model="formB.phone" placeholder="请输入手机号" maxlength="11" clearable></el-input>
        </el-form-item>
        <el-form-item label="短信验证码" prop="code">
          <el-input autoComplete="off" v-model="formB.code" placeholder="请输入短信验证码" @keyup.enter.native="next"></el-input>
          <el-button type="primary" size="mini" @click="getUserValidate" :disabled="!(regphone.test(formB.phone)) || timerMsg!== '短信验证码'">{{timerMsg}}</el-button>
        </el-form-item>
      </el-form>
      <el-form :model="formC" :rules="ruleC" ref="formC" :label-width="formLabelWidth" v-if="active === 2" :size="formSize" :rule="ruleC">
        <el-form-item label="新密码" prop="newPassword">
          <el-input autoComplete="off" :type="isview ? 'text' :'password'" v-model="formC.newPassword" placeholder="请设置6-15位(可数字+字母)" maxlength="15" @keyup.enter.native="next">
            <i slot="suffix" @click="isview = !isview" :class=" isview ? 'icon_zy' :'icon_by'"></i>
          </el-input>
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button :type="active > 2 ?'success' : 'primary'" @click="next">{{active > 1 ?'保存新密码':'下一步'}}</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { checkUsername, getUserValidate, checkUserValidate, forgetAndUpdatePwd } from '@/api/login'
import { objectMerge2 } from '@/utils/'
import REGEX from '@/utils/validate'
import md5 from 'js-md5'
export default {
  data() {
    const validatePwd = (rule, value, callback) => {
      if (typeof value !== 'string' || value === '' || value.length < 6) {
        callback('密码不能小于6位')
      } else {
        callback()
      }
    }
    const validatePhone = (rule, value, callback) => {
      if (typeof value !== 'string' || value === '' || value.length < 11) {
        callback('请输入11位手机号')
      } else if (/\d{11}/.test(value)) {
        callback()
      } else {
        callback('请输入手机号')
      }
    }
    return {
      regphone: /\d{11}/,
      active: 0,
      isview: false,
      formLabelWidth: '90px',
      formSize: '',
      formA: {
        username: ''
      },
      formB: {
        username: '',
        phone: '',
        code: ''
      },
      formC: {
        username: '',
        newPassword: '',
        successFlag: ''
      },
      timerMsg: '短信验证码',
      desA: '请填写你要找回的密码的账号',
      desB: '请填写手机号码',
      ruleA: {
        username: [{ required: true, trigger: 'blur', message: '请输入账号' }],
      },
      ruleB: {
        phone: [{ required: true, trigger: 'blur', validator: validatePhone }],
        code: [{ required: true, trigger: 'blur', message: '请输入短信验证码' }],
      },
      ruleC: {
        newPassword: [{ required: true, trigger: 'blur', message: '请输入新密码', validator: validatePwd }],
      }
    }
  },
  props: {
    popVisible: {
      type: Boolean,
      default: false
    },
    info: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    popVisible: {
      handler(cval, oval) {
        if (cval) {
          this.init()
        }
      },
      immediate: true
    }
  },
  computed: {
    dialogVisible: {
      get() {
        return this.popVisible
      },
      set() {}
    }
  },
  methods: {
    init() {
      this.active = 0
      this.formA = Object.assign({}, this.$options.data().formA)
      this.formB = Object.assign({}, this.$options.data().formB)
      this.formC = Object.assign({}, this.$options.data().formC)
      this.$nextTick(() => {
        this.$refs['formA'].resetFields()
      })
      this.formA.username = this.info.username || ''
      clearInterval(this.timerOption)
    },
    next() {
      let formName = this.active === 0 ? 'formA' : (this.active === 1 ? 'formB' : 'formC')
      this.$refs[formName].validate((valid) => {
        if (valid) {
          switch (this.active) {
            case 0:
              this.checkUsername()
              break
            case 1:
              this.checkUserValidate()
              break
            case 2:
              this.forgetAndUpdatePwd()
              break
          }
        }
      })
    },
    codeTime() {
      let timer = 60
      this.timerOption = setInterval(() => {
        timer = timer - 1
        this.timerMsg = timer + ' 秒后刷新'
        if (timer <= 0) {
          this.timerMsg = this.$options.data().timerMsg
          clearInterval(this.timerOption)
          timer = 60
        }
      }, 1000)

    },
    checkUsername() { // 校验登录帐号是否存在 1
      return checkUsername(this.formA).then(data => {
          this.active++
            this.formB.username = this.formA.username
          this.formC.username = this.formA.username
        })
        .catch(err => {
          this._handlerCatchMsg(err)
        })
    },
    getUserValidate() { // 根据用户名和电话获取验证码 2
      if (this.formB.phone) {
        return getUserValidate(this.formB).then(data => {
            this.codeTime()
            this.$notify({
              title: '成功',
              message: '短信已发送成功，注意查收！',
              type: 'success'
            })
          })
          .catch(err => {
            this._handlerCatchMsg(err)
          })
      } else {
        this.$message.warning('请填写手机号码')
      }
    },
    checkUserValidate() { // 根据用户名和验证码校验验证码 2
      return checkUserValidate(this.formB).then(data => {
          this.active++
            if (data) {
              this.formC.successFlag = data
            }
        })
        .catch(err => {
          this._handlerCatchMsg(err)
        })
    },
    forgetAndUpdatePwd() { // 忘记密码修改密码 4
      let formC = objectMerge2({}, this.formC)
      formC.newPassword = md5(formC.newPassword)
      return forgetAndUpdatePwd(formC).then(data => {
          this.active++
            this.$message.success('修改密码成功！')
          this.closeMe()
        })
        .catch(err => {
          this._handlerCatchMsg(err)
        })
    },
    closeMe() {
      this.$emit('update:popVisible', false)
    },
    focus() {}
  }
}

</script>
<style lang="scss">
.forgetPwd-steps {
  border-bottom: 1px solid #ddd;
  padding-bottom: 20px;
}

.forgetPwd-form {
  max-width: 660px;
  padding-top: 30px;
  .icon_zy,
  .icon_by {
    left: -30px;
  }
}

</style>
