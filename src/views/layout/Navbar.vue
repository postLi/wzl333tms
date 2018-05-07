<template>
  <div class="navbar">
    <div class="logo-panel">
      <router-link to="/"><img src="../../assets/logo_white.png" alt=""></router-link>
    </div>
    <TopNavMenu />
    <TopNavSearch />
    <router-link tag="div" class="pickClip" to="/order/pickClip"><i class="el-icon-document"></i> 挑单夹</router-link>
    <TopNavMessage />
    <TopNavUser />
    <router-link tag="div" class="createOrder" to="/order/createOrder">创建运单</router-link>
  </div>
  
</template>

<script>
import TopNavMenu from './TopNavMenu'
import TopNavUser from './TopNavUser'
import TopNavSearch from './TopNavSearch'
import TopNavMessage from './TopNavMessage'

export default {
  components: {
    TopNavMenu,
    TopNavUser,
    TopNavSearch,
    TopNavMessage
  },
  data () {
    return {
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .navbar {
        background: #378CBE;
        border-radius: 0;
        .hamburger-container {
            line-height: 58px;
            height: 50px;
            float: left;
            padding: 0 10px;
        }
        .errLog-container {
            display: inline-block;
            position: absolute;
            right: 150px;
        }
        .screenfull {
            position: absolute;
            right: 90px;
            top: 16px;
            color: red;
        }
        .page-top-nav{
          height: 50px;
          float: left;
          margin-left: 5px;
        }
    }

    .logo-panel{
      padding-top: 6px;
      padding-left: 9px;
      height: auto;
      float: left;
      height: 50px;
      
      img{
        height: 38px;
        width: 198px;
      }
    }
    
    .createOrder{
      position: absolute;
      right: 0;
      top: 0;
      height: 50px;
      width: 118px;
      text-align: center;
      line-height: 50px;
      background-color: #0099FF;
      color: #fff;
      cursor: pointer;

      &:hover{
        background-color: rgb(0, 129, 214);
      }
    }
    .pickClip{
      width: 110px;
      position: absolute;
      top: 0;
      right: 294px;
      height: 50px;
      border-left: 1px solid #1B79B1;
      color: #fff;
      text-align: center;
      cursor: pointer;
      &:hover{
        background-color: rgba(0, 0, 0, .2);
      }
    }
</style>

