<template>
  <div class="sidebar-container">
    <!--     <div class="sidebar-userinfo clearfix">
        <img :src="avatar" alt="">
        <span>{{ name }}</span><br><span>{{ company }}</span>
      </div> -->
      <SidebarMenuSearch :searchItem="sidebarRouters" />
      <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
      <sidebar-item ref="sidebaritem" :routes='sidebarRouters'></sidebar-item>
      <div class="nologin">
        <a href="http://192.168.1.157:9528/?nologin=1">
        <el-button size="large" type="primary">TMS系统</el-button></a><br>
        <a href="http://192.168.1.24:9526/?nologin=1"><el-button size="large" type="success">运力中心</el-button></a><br>
        <a href="http://192.168.1.170/member/content_list.php?channelid=1"><el-button size="large" type="warning">官网系统</el-button></a>
      </div>
      <div @mouseover="showSubnav" @mouseout="hideSubnav" class="subNavWrapper"></div>
  </div>
  
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import SidebarMenuSearch from './SidebarMenuSearch'
import Hamburger from '@/components/Hamburger'

export default {
  components: { SidebarItem, Hamburger, SidebarMenuSearch },
  computed: {
    ...mapGetters([
      'sidebar',
      'sidebarRouters',
      'permission_routers'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    showSubnav() {
      this.$refs.sidebaritem.clearTimer()
    },
    hideSubnav() {
      this.$refs.sidebaritem.hideSubNav()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
@import "src/styles/variate.scss";
@import "src/styles/mixin.scss";

#app .sidebar-menu{
  height: 100%;
  overflow-y: auto;
  overflow-x: visible;
  width: 100%;

  @include hiddenScrollBar;

  .router-link-exact-active{
    .el-menu-item{
      color: #20a0ff;
    }
  }
}
.sidebar-container{
  min-height: 100%;
  padding-top: 70px;
  background: #42485B;
  border-radius: 0;

  .el-menu{
    border-right: 0;
    background: #333744;
  }

  .sidebar-userinfo{
    margin-top: -40px;
    margin-bottom: 15px;
    img{
      float: left;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 10px;
      margin-left: 5px;
      
    }
    span{
      display: inline-block;
      width: 100px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 14px;
      color: #eee;
      line-height: 20px;
    }
  }

  .hamburger-container{
    position: absolute;
    top: 40px;
    right: 10px;
  }

  .subNavWrapper{
    display: none;
    position: absolute;
    left: 100%;
    max-height: 100%;
    overflow: auto;
  }
}
.nologin{
  position: absolute;
  width: 168px;
  bottom: 0;
  left: 0;
  text-align: center;
  .el-button{
    margin-bottom: 10px;
    width: 150px;
  }
  .el-button2{
    width: 190px;
    height: 50px;
    background-color: rgb(0,32,56);
    border: 4px solid #000;
    border-top-color: rgb(5,55,93);
    border-right-color: rgb(5,55,93);
    border-left-color: rgb(5,21,39);
    border-bottom-color: rgb(5,21,39);
    opacity: 0.65;
    border-radius: 0;
    font-size: 16px;
    color: rgba(255,255,255,.65);
  }
}
</style>
