<template>
  <div class="login-container">
    <div class="container-left">
      <img src="../../assets/login_images/left.png" alt="">
    </div>
    <div class="container-right">
        <div class="logo">
          <img  class="logo-img" src="../../assets/login_images/logo.png" alt="">
        </div>

      <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px"
               class="card-box login-form">
        <h3 class="title">欢迎使用安发物流</h3>

        <!--<div v-if="errInfo">-->
          <!--<span>{{errInfo}}</span>-->
        <!--</div>-->


        <el-form-item prop="accNum">

          <!--<span class="svg-container svg-container_login">-->
          <!--<icon-svg icon-class="yonghuming" />-->
          <!--</span>-->

         <el-input name="accNum" type="text" v-model="loginForm.accNum" autoComplete="on" :placeholder="holder.accNum" @focus='accNum()'   clearable />
        </el-form-item>

        <el-form-item prop="username">
          <el-input name="username" type="text" @keyup.enter.native="handleLogin" v-model="loginForm.username" autoComplete="on"
                    :placeholder="holder.username" @focus='username()' clearable></el-input>


        </el-form-item>

        <el-form-item prop="password">
          <el-input name="password" type="password" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on"
                    :placeholder="holder.password" @focus='password()' clearable></el-input>
        </el-form-item>

        <el-form-item class="login">
          <el-button class="el-but" type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">
            登录
          </el-button>
        </el-form-item>

        <div class="rember">
          <el-checkbox v-model="checked">记住密码</el-checkbox>
          <p class="rember-tit" @click="forgetPsw">忘记密码</p>
        </div>
      </el-form>
    </div>
    <div class="button-cont">
      <ul>
        <li>广州安发网络科技有限公司</li>
        <li>地址：天河区天河路石牌桥丰兴广场B座1804</li>
        <li>电话 ：020-38856254 </li>
        <li>网址：www.anfanet.com </li>
      </ul>
      <div class="down">
        <img src="../../assets/login_images/code.png" alt="">
        <p>扫描二维码下载app</p>
      </div>
    </div>

  </div>
</template>

<script>
import { isvalidUsername } from '@/utils/validate'

export default {
  name: 'login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error('请输入正确的公司ID'))
      } else {
        callback()
      }
    }
    // const validateUsername = (rule, value, callback) => {
    //   if (!isvalidUsername(value)) {
    //     callback(new Error('请输入正确的用户名'))
    //   } else {
    //     callback()
    //   }
    // }
    const validatePass = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能小于6位'))
      } else if (!value.length) {
        callback(new Error('请输入6位数字密码'))
      } else {
        callback()
      }
    }
    return {
      holder: {
        accNum: '公司ID',
        username: '账号',
        password: '密码'
      },
      loading: false,
      checked: false,
      errInfo: false,
      //模拟登陆信息
      loginForm: {
        accNum: '1234',
        username: 'fangjian',
        password: '123456'
      },
      loginRules: {
        accNum: [{ required: true, trigger: 'blur' }],
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }]
      }

    }
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        console.log(valid)
        if (valid) {
          this.loading = true
          this.$store.dispatch('Login', this.loginForm).then(() => {
            // if (!this.loginForm.accNum) {
            //   this.errInfo = true
            //   this.errInfo = '该公司Id不存在'
            // } else if (!this.loginForm.username) {
            //   this.errInfo = true
            //   this.errInfo = '该用户名不存在'
            // } else if (!this.loginForm.password) {
            //   this.errInfo = true
            //   this.errInfo = '输入的密码错误'
            // }
            this.loading = false
            this.$router.push({ path: '/' })
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    forgetPsw() {
      // this.$router.push({ path: '/' })
      console.log(5555)
    },
    accNum() {
      this.holder = ''
    },
    username() {
      this.holder = ''
    },
    password() {
      this.holder = ''
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "src/styles/mixin.scss";


  $bg:rgb(24,54,80);
  $dark_gray:#889aa4;
  $light_gray:#eee;
  /**/
  .container-left{
    float: left;
    margin: 280px 200px 200px 350px;
  }
  .container-left img{
    display: inline-block;
    width: 500px;
    height: 400px;
  }
  .container-right{
    float: right;
    margin: 200px 350px 0px 0px;
  }
  .login-container {
    @include relative;
    height: 100vh;
    background: url("../../assets/login_images/bg.png");

    input:-webkit-autofill {
      box-shadow: 0 0 0px 1000px #293444 inset !important;
      -webkit-text-fill-color: #fff !important;
    }
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: rgba(153, 153, 153, 0.5);
      height: 47px;
    }
    .el-input {
      display: inline-block;
      height: 47px;
      width: 95%;
    }
    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
      &_login {
        font-size: 20px;
      }
    }

    .login-form {
      display: inline-block;
      padding: 25px 21px 23px 21px;
      background: #fff;
      border: 1px solid #fff;
      border-radius: 10px;
      -moz-box-shadow: 12px 12px 12px 5px rgba(130,170,234,0.7);
      box-shadow: 12px 12px 12px 5px rgba(130,170,234,0.7);

    }
    .el-form-item {
      border: 1px solid #666;
      background: #fff;
      border-radius: 5px;
      color: #454545;
      margin-bottom: 18px !important;
    }
    .el-form-item:hover{
      border-color: #409eff;
    }
    .logo{
      text-align: center;
    }
    .logo-img{
      display: inline-block;
      width: 370px;
      height: 62px;
      vertical-align: middle;
    }
    .title {
      font-size: 26px;
      color: #515151;
      margin: 0px auto 26px auto;
      text-align: center;
      font-weight: bold;
    }


    .el-but{
      line-height: 40px !important;
      font-size: 18px;
      background-color: #0a84ff;
      letter-spacing: 2px;
    }
    .login{
      margin-bottom: 0 !important;
    }

    /*记住密码*/
    .rember{
      display: inline-block;
    }
    .rember .el-checkbox__label{
      text-align: center;
      color: #666;
    }
    .rember-tit{
      display: inline-block;
      padding-left: 220px;
      cursor: pointer;
      color: #666;
      font-size: 14px;
    }
    .el-form-item:focus{
      /*outline: none;*/
      border-color:#409eff ;
    }

  /*底部*/
    .button-cont{
      ul{
        display: inline-block;
        padding-left: 470px;
      }
      li{
        list-style: none;
        float: left;
        font-size: 12px;
        color: #eee;
        padding-right: 38px;
      }
      .down{
        position: relative;
        bottom: 132px;
        left: 1420px;

        img{
          vertical-align: middle;
          padding-left: 8px;
        }
        p{
          color: #eee;
          font-size: 12px;
        }
      }

    }
  }
</style>
