<template>
  <div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
    <div class="navbar-wrapper">
        <navbar></navbar>
    </div>
    <div class="sidebar-wrapper">
      <sidebar></sidebar>
    </div>
    <div class="main-container">
      <TagsView></TagsView>
      <div class="main-container-wrap">
          <app-main></app-main>
      </div>
    </div>
    <LockScreen></LockScreen>
  </div>
</template>


<script>
import LockScreen from '@/components/LockScreen/index'
import { Navbar, Sidebar, AppMain, TagsView } from '@/views/layout'

export default {
  name: 'layout',
  components: {
    Navbar,
    Sidebar,
    AppMain,
    TagsView,
    LockScreen
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
    @import "src/styles/mixin.scss";
    @import "src/styles/variate.scss";

    .app-wrapper {
        @include clearfix;
        position: relative;
        height: 100%;
        width: 100%;

        &.hideSidebar {
            .main-container {
                margin-left: $hideSidebarWidth;
            }
            .sidebar-wrapper{
                width: $hideSidebarWidth;
                .el-submenu__icon-arrow{
                    display: none;
                }
                .el-menu--collapse {
                    width: $hideSidebarWidth;
                }
                .svg-icon{
                    display: block;
                }
            }
            .sidebar-userinfo, .sidebar-menu-search{
                display: none;
            }
            .sidebar-container{
                padding-top: 80px;                
            }
        }
        .sidebar-wrapper {
            width: $sidebarWidth;
            position: fixed;
            top: $topNavHeight;
            bottom: 0;
            left: 0;
            z-index: 1001;
            transition: all .1s ease-out;
        }
        .sidebar-container {
            transition: all .1s ease-out;
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
        }
        .main-container {
            height: 100%;
            transition: all .1s ease-out;
            margin-left: $sidebarWidth;
            box-sizing: border-box;
            padding-top: $topNavHeight + $tabsHeight;
            position: relative;
        }
        .main-container-wrap{
            height: 100%;
            overflow: auto;
        }
        .navbar-wrapper{
            position: fixed;
            left: 0;
            top: 0;
            width: 100%;
            height: $topNavHeight;
            line-height: $topNavHeight;
            border-radius: 0px !important;
            background: #003863;
            z-index: 999;
            min-width: 1180px;
        }
    }
</style>
