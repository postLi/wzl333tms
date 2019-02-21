<template>
  <div class="login-container">
    <div class="container-top">
      <div class="login-top-wrapper clearfix">
        <img class="logo-img" src="../../assets/login_images/login_03.png" alt="">
        <a href="http://www.28tms.com" target="_blank" rel="noopener noreferrer">
          <icon-svg icon-class="shouye" /> 产品官网</a>
      </div>
      <!-- 产品官网链接 -->
    </div>
    <div class="login-wrapper clearfix">
      <!-- <div class="container-left">
      <img src="../../assets/login_images/left.png" alt="">
      </div> -->
      <div class="container-right">
        <!--  <div class="logo">
          <img  class="logo-img" src="../../assets/login_images/logo.png" alt="">
        </div> -->
        <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px" class="card-box login-form">
          <h3 class="title">会员登录</h3>
          <!--<div v-if="errInfo">-->
          <!--<span>{{errInfo}}</span>-->
          <!--</div>-->
          <!-- <el-form-item prop="accNum"> -->
          <!--<span class="svg-container svg-container_login">-->
          <!--<icon-svg icon-class="yonghuming" />-->
          <!--</span>-->
          <!-- <el-input name="accNum" type="text" v-model="loginForm.accNum" autoComplete="off" :placeholder="holder.accNum" @focus='accNum()'   clearable >
          <template slot="prepend">公司ID</template>
         </el-input>
        </el-form-item> -->
          <el-form-item prop="username">
            <el-input name="username" type="text" @keyup.enter.native="handleLogin" v-model="loginForm.username" :maxlength="30" autoComplete="off" :placeholder="holder.username" @focus='username()' clearable :autofocus="true" @change="changeUsername">
              <template slot="prepend"><i class="icon_login " :class="[loginError? 'icon_login_user_error':'icon_login_user']"></i></template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password" class="previewPwd">
            <el-input name="password" :maxlength="20" :type="!isview? 'password' : 'text'" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="off" :placeholder="holder.password" @focus='password()' clearable>
              <template slot="prepend">
                <i class="icon_login" :class="[loginError? 'icon_login_password_error':'icon_login_password']"></i>
                <!-- 两种写法都可以 -->
                <i @click="isview = !isview" :class="{ 'icon_zy': isview , 'icon_by':!isview}"></i>
                <!-- <i @click="isview = !isview" :class="[isview ? 'icon_by':'icon_zy']"></i> -->
              </template>
            </el-input>
          </el-form-item>
          <div class="login">
            <el-button class="el-but" type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">
              登录
            </el-button>
          </div>
          <div class="rember">
            <el-checkbox v-model="checked">记住密码</el-checkbox>
            <!-- <p class="rember-tit" @click="forgetPwd">忘记密码</p> -->
          </div>
        </el-form>
      </div>
      <!-- </div>
    <div class="login-wrapper clearfix"> -->
      <div class="button-cont">
        <ul>
          <li><a href="http://www.anfanet.com" target="_blank">广州市安发网络科技有限公司</a></li>
          <!-- <li>地址：天河区天河路石牌桥丰兴广场B座1804</li> -->
          <li>电话 ：400-999-2828 </li>
          <li>网址：<a href="http://www.28tms.com" target="_blank">www.28tms.com</a> </li>
          <li class="hoverLink"><a href="http://www.miitbeian.gov.cn">粤ICP备16061301号-5</a></li>
        </ul>
        <div class="down">
          <img src="../../assets/login_images/code.png" alt="">
          <p>扫描二维码下载app</p>
        </div>
      </div>
    </div>
    <setApiUrl />
    <!-- <ForgetPwd :popVisible.sync="popVisibleDialog" /> -->
  </div>
</template>
<script>
import { isvalidUsername } from '@/utils/validate'
import { requestFullScreen } from '@/utils/fullScreen'
import setApiUrl from '@/components/changeApiUrl/index'
import { objectMerge2 } from '@/utils/index'
import md5 from 'js-md5'
import ForgetPwd from './components/forgetPwd'

export default {
  name: 'login',
  components: {
    setApiUrl,
    ForgetPwd
  },
  data() {
    // const validateUsername = (rule, value, callback) => {
    //   if (!isvalidUsername(value)) {
    //     callback(new Error('请输入正确的公司ID'))
    //   } else {
    //     callback()
    //   }
    // }
    // const validateUsername = (rule, value, callback) => {
    //   if (!isvalidUsername(value)) {
    //     callback(new Error('请输入正确的用户名'))
    //   } else {
    //     callback()
    //   }
    // }
    const validatePass = (rule, value, callback) => {
      if (typeof value !== 'string' || value === '' || value.length < 6) {
        callback('密码不能小于6位')
      } else {
        callback()
      }
    }
    return {
      popVisibleDialog: false,
      holder: {
        accNum: '公司ID',
        username: '账号',
        password: '密码'
      },
      loading: false,
      checked: false,
      errInfo: false,
      isview: false,
      // 模拟登陆信息
      loginForm: {
        // accNum: '4',
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', message: '请输入账号' }],
        // username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }]
      },
      loginError: false,
      localForm: {
        password: '',
        username: ''
      },

    }
  },
  watch: {
    checked(cval) {
      this.setLocalStorage()
    }
  },
  mounted() {
    if (process.env.NODE_ENV !== 'production') {
      this.loginForm.username = 'fangjian'
      this.loginForm.password = '123456'
    }
    this.initLocalStorage()
  },
  methods: {
    setLocalStorage() {
      console.log(this.checked)
      if (this.checked) {
        let form = {}
        form.username = this.loginForm.username
        form.checked = this.checked
        if (this.loginForm.password !== this.localForm.password) {
          form.password = md5(this.loginForm.password)
        } else {
          form.password = this.localForm.password
        }
        localStorage.setItem('TMS_rememberPwd', JSON.stringify(form))
      } else {
        localStorage.removeItem('TMS_rememberPwd')
      }
    },
    initLocalStorage() {
      if (window.localStorage) {
        const storage = window.localStorage
        if (storage.getItem('TMS_rememberPwd')) {
          this.localForm = JSON.parse(storage.getItem('TMS_rememberPwd'))
          this.loginForm.password = this.localForm.password
          this.loginForm.username = this.localForm.username
          this.checked = this.localForm.checked
        } else {

        }
      }
    },
    handleLogin() {
      requestFullScreen()
      this.$refs.loginForm.validate(valid => {
        console.log(valid)
        if (valid) {
          this.loading = true
          if (this.checked) {
            this.setLocalStorage()
          }
          this.$store.dispatch('Login', this.loginForm).then(() => {
            this.loading = false

            // 获取登录前的页面地址
            // 有可能会出现前一个页面是现在登录账号没有权限访问的？
            // const nexturl = this.$route.query.tourl
            // this.$router.push({ path: nexturl && nexturl.indexOf('/login') === -1 ? nexturl : '/' })
            this.$router.push({ path: '/' })
          }).catch(() => {
            this.loginError = true
            this.$message({
              message: '您的账号或者密码有误~',
              type: 'warning'
            })
            this.loading = false
          })
        } else {
          this.loginError = true
          console.log('error submit!!')
          return false
        }
      })
    },
    forgetPwd() {
      this.popVisibleDialog = true
      
      // this.$router.push({ path: '/' })
      console.log(5555)
    },
    accNum() {
      // this.holder = ''
    },
    username() {
      // this.holder = ''
      this.loginError = false
    },
    password() {
      // this.holder = ''
      this.loginError = false
    },
    YJicon() {
      this.isview = !this.isview
    },
    changeUsername() {
      if (this.checked) {
        if (this.loginForm.password === this.localForm.password) { // 更换账号时要清空记录的密码，如果是输入的密码，更换账号可以不清空
          this.loginForm.password = ''
        }
        if (this.loginForm.username === this.localForm.username) {
          this.loginForm.password = this.localForm.password
        }
      }
    }
  }
}

</script>
<style rel="stylesheet/scss" lang="scss">
@import "../../styles/mixin.scss";
@import "../../styles/login-index.css";
.hoverLink:hover {
  border-bottom: 1px solid #eee;
}

</style>
