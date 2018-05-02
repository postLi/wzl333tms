<template>
  <div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
    <div class="navbar-wrapper">
        <navbar></navbar>
    </div>
    <div class="sidebar-wrapper">
      <sidebar class="sidebar-container"></sidebar>
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
    .app-wrapper {
        @include clearfix;
        position: relative;
        height: 100%;
        width: 100%;

        &.hideSidebar {
            .main-container {
                margin-left: 50px;
            }
            .sidebar-wrapper{
                width: 50px;
                .el-submenu__icon-arrow{
                    display: none;
                }
                .el-menu--collapse {
                    width: 50px;
                }
                .svg-icon{
                    display: block;
                }
            }
            .sidebar-userinfo, .sidebar-menu-search{
                display: none;
            }
        }
        .sidebar-wrapper {
            width: 180px;
            position: fixed;
            top: 50px;
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
            margin-left: 180px;
            box-sizing: border-box;
            padding-top: 84px;
            position: relative;
        }
        .main-container-wrap{
            height: 100%;
            overflow: auto;
        }
        .tags-view-container{
            position: absolute;
            height: 34px;
            top: 50px;
            left: 0;
            width: 100%;
        }
        .navbar-wrapper{
            position: fixed;
            left: 0;
            top: 0;
            width: 100%;
            height: 50px;
            line-height: 50px;
            border-radius: 0px !important;
            background: rgb(63, 114, 214);
            z-index: 999;
        }
    }
</style>
