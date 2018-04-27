<template>
  <el-menu class="navbar" mode="horizontal" theme="dark">
    <div class="logo-panel">
      <img src="../../assets/home_logo_2.png" alt="">
    </div>
    <TopNavMenu />
    <!-- <levelbar></levelbar> -->
    <TopNavUser />
  </el-menu>
</template>

<script>
import TopNavMenu from './TopNavMenu'
import TopNavUser from './TopNavUser'

export default {
  components: {
    TopNavMenu,
    TopNavUser
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .navbar {
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
        }
    }

    .logo-panel{
      padding-top: 6px;
      padding-left: 9px;
      height: auto;
      float: left;
      height: 50px;
      
      img{
        height: 37px;
        width: 197px;
      }
    }
</style>

