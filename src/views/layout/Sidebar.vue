<template>
  <el-menu class="sidebar-menu" mode="vertical" theme="dark" :default-active="$route.path" :collapse="!sidebar.opened">
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
    
    <sidebar-item :routes='permission_routers'></sidebar-item>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import Hamburger from '@/components/Hamburger'

export default {
  components: { SidebarItem, Hamburger },
  computed: {
    ...mapGetters([
            'sidebar',
      'permission_routers'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
#app .sidebar-menu{
  min-height: 100%;
}
.sidebar-container{
  padding-top: 50px;
  border-radius: 0;
  .hamburger-container{
    position: absolute;
    top: 10px;
    right: 15px;
  }
}
#app .sidebar-menu{
  .el-menu-item, .el-submenu__title{
    height: 44px;
    line-height: 44px;
  }

  .el-submenu .el-menu-item{
    min-width: 100%;
  }
}

</style>
