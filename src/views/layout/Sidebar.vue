<template>
  <el-menu 
  class="sidebar-menu" 
  mode="vertical" 
  theme="dark" 
  background-color="#002039"
  text-color="#BFCBD9"
  active-text-color="#3e9ff1"
  :default-active="$route.path" 
  :select="openMenu" 
  :collapse="!sidebar.opened">
    <div class="sidebar-userinfo clearfix">
      <img :src="avatar" alt="">
      <span>{{ name }}</span><br><span>{{ company }}</span>
    </div>
    <SidebarMenuSearch :searchItem="sidebarRouters" />
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
    
    <sidebar-item :routes='sidebarRouters'></sidebar-item>
  </el-menu>
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
      'permission_routers',
      'avatar',
      'name',
      'company'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    openMenu () {

    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
#app .sidebar-menu{
  min-height: 100%;
  .router-link-exact-active{
    .el-menu-item{
      color: #20a0ff;
    }
  }
}
.sidebar-container{
  padding-top: 50px;
  border-radius: 0;

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
    top: 10px;
    right: 10px;
  }
}

</style>
