<template>
  <div class="sidebar-nav">
    <template v-for="item in routes">
      <router-link v-if="!item.hidden&&item.noDropdown&&item.children.length>0" :to="item.path" :key="item.name">
        <el-menu-item :index="item.path">
          <icon-svg v-if='item.icon' :icon-class="item.icon" /> <span class="sidebar-nav-title">{{item.children[0].name}}</span>
        </el-menu-item>
      </router-link>

      <router-link v-if="!item.hidden&&(!item.children || item.children.length===0)" :to="item.path" :key="item.name">
        <el-menu-item :index="item.path">
          <icon-svg v-if='item.icon' :icon-class="item.icon" /> <span class="sidebar-nav-title">{{item.name}}</span>
        </el-menu-item>
      </router-link>

      <el-submenu :index="item.name" v-if="!item.noDropdown&&!item.hidden&&item.children&&item.children.length" :key="item.name">
        <template slot="title">
          <router-link :to="item.path" :key="item.name">
          <icon-svg v-if='item.icon' :icon-class="item.icon" /> <span class="sidebar-nav-title">{{item.name}}</span>
          </router-link>
        </template>
        <template v-for="child in item.children" v-if='!child.hidden'>
          <sidebar-item class='menu-indent' v-if='child.children&&child.children.length>0' :routes='[child]' :key="child.name"> </sidebar-item>
          <router-link v-else class="menu-indent" :to="child.path" :key="child.name">
            <el-menu-item :index="child.path">
              {{child.name}}
            </el-menu-item>
          </router-link>
        </template>
      </el-submenu>
    </template>
  </div>
</template>

<script>
export default {
  name: 'SidebarItem',
  props: {
    routes: {
      type: Array
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
#app .sidebar-menu{
  .el-menu-item, .el-submenu__title{
    height: 44px;
    line-height: 44px;
  }

  .el-submenu .el-menu-item{
    min-width: 100%;
    padding-left: 60px !important;
  }
}
#app .el-menu--collapse .sidebar-nav{
  .el-menu-item{
    position: relative;
  }
  .el-submenu__icon-arrow{
    display: none;
  }
  .sidebar-nav-title{
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

