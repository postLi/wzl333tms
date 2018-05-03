<template>
  <div class="navbar">
    <div class="logo-panel">
      <router-link to="/"><img src="../../assets/logo_white.png" alt=""></router-link>
    </div>
    <TopNavMenu />
    <TopNavUser />
  </div>
  
</template>

<script>
import TopNavMenu from './TopNavMenu'
import TopNavUser from './TopNavUser'

export default {
  components: {
    TopNavMenu,
    TopNavUser
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
</style>

