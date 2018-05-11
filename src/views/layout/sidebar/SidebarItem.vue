<template>
    <ul class="sidebar-menu" :default-active="$route.path">
      <SidebarItemNode
        class="menu-item"
        v-for="(route, index) in routes"
        :key="index"
        :routes="route">
      </SidebarItemNode>
    <!-- <el-menu 
      class="sidebar-menu" 
      mode="vertical" 
      theme="dark" 
      :default-active="$route.path" 
      :collapse="!sidebar.opened">

    <template v-for="item in routes">
      <router-link v-if="!item.hidden&&item.noDropdown&&item.children.length>0" :to="item.path" :key="item.name">
        <el-menu-item :index="item.path">
          <icon-svg v-if='item.icon' :icon-class="item.icon" /> <span class="sidebar-nav-title">{{item.children[0].meta.title}}</span>
          <span class="sidebar-nav-stitle">{{item.children[0].meta.stitle || item.children[0].meta.title}}</span>
        </el-menu-item>
      </router-link>
      
        <el-menu-item v-if="!item.hidden&&(!item.children || item.children.length===0)" :index="item.path" :key="item.name">
          <router-link :to="item.path" >
          <icon-svg v-if='item.icon' :icon-class="item.icon" /> <span class="sidebar-nav-title">{{item.meta.title}}</span>
          <span class="sidebar-nav-stitle">{{item.meta.stitle || item.meta.title}}</span>
          </router-link>
        </el-menu-item>
      
      <el-submenu :index="item.name" v-if="!item.noDropdown&&!item.hidden&&item.children&&item.children.length" class="sidebar-sub-menu" :key="item.name">
        <template slot="title">
          <router-link :to="item.path" :key="item.name">
          <icon-svg v-if='item.icon' :icon-class="item.icon" /> <span class="sidebar-nav-title">{{item.meta.title}}</span>
          <span class="sidebar-nav-stitle">{{item.meta.stitle || item.meta.title}}</span>
          </router-link>
        </template>
        <template v-for="child in item.children" v-if='!child.hidden'>
          <sidebar-item class='menu-indent' v-if='child.children&&child.children.length>0' :routes='[child]' :key="child.name"> </sidebar-item>
          <router-link v-else class="menu-indent" :to="child.path" :key="child.name">
            <el-menu-item :index="child.path">
              {{child.meta.title}}
            </el-menu-item>
          </router-link>
        </template>
      </el-submenu>
    </template>
    </el-menu> -->
    </ul>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItemNode from './SidebarItemNode'
export default {
  name: 'SidebarItem',
  components: {
    SidebarItemNode
  },
  props: {
    routes: {
      type: Array
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'sidebarRouters',
      'permission_routers'
    ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
@import "src/styles/variate.scss";
.sidebar-menu{
  color: rgba(255, 255, 255, 0.8);
  &>.menu-item,&>.submenu{
    border-left: 4px solid #002039;
  }

  .el-menu-item, .el-submenu__title{
    height: 44px;
    line-height: 44px;
    font-size: $sidebarFontSize;
    color: rgba(255, 255, 255, 0.8);
  }

  .sidebar-nav-title{
    display: inline-block;
  }

  .sidebar-nav-stitle{
    display: none;
  }

  .el-submenu .el-menu-item{
    min-width: 100%;
    padding-left: 60px !important;
    font-size: $sidebarFontSize - 2px;
  }

  .is-active{
    border-left: 4px solid #104193;
    background: #031523;
    color: #3e9ff1;

    .is-active{
      border: none;
    }

    .el-submenu__title {
      color: #3e9ff1;
    }
  }
  .el-menu-item:focus, .el-menu-item:hover, .el-submenu__title:hover{
    background: #031523;
  }
}
#app .el-menu--collapse.sidebar-menu{
  .el-menu-item,.el-submenu{
    position: relative;
    padding-top: 10px;
  }
  .el-menu--popup{
    background: #031523;
  }
  .el-submenu__icon-arrow{
    display: none;
  }
  .sidebar-nav-title{
    display: none;
  }
  .sidebar-nav-stitle{
    display: block;
    position: absolute;
    left: 0;
    width: 100%;
    top: 14px;
    text-align: center;
    line-height: 22px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .el-menu-item, .el-submenu__title{
    min-height: 44px;
    height: auto;
  }
  .el-submenu{
    min-width: auto;
  }
  .el-submenu .el-menu-item{
    padding-left: 20px !important;
  }
}
.svg-icon {
  margin-right: 10px;
}
.hideSidebar .menu-indent{
  display: block;
  text-indent: 10px;
}

</style>

