<template>
    <ul class="sidebar-menu" :default-active="$route.path"  ref="sidebarMenu">
      <SidebarItemNode
        class="menu-item"
        v-for="(route, index) in routes"
        :key="index"
        v-if="!route.hidden"
        @removeOtherOpenFolder="removeOtherOpenFolder"
        ref="sidebarMenuItem"
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

function hasParent(el,clsName) {
  if(el.parentNode.classList.contain(clsName)){
    el.parentNode.classList.add('clsName')
  }
}

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
  },
  methods: {
    removeOtherOpenFolder () {
      let childRef = Array.isArray(this.$refs.sidebarMenuItem) ? this.$refs.sidebarMenuItem : [this.$refs.sidebarMenuItem]
      childRef.map( el =>{
        if(el.isFolder && el.open){
          el.open = false
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
@import "src/styles/variate.scss";
.sidebar-menu{
  color: rgba(255, 255, 255, 0.8);
  &>.menu-item,&>.sidebar-submenu{
    border-left: 4px solid #002039;
    padding-left: 20px;
  }
  .sidebar-submenu{
    display: none;
  }

  a{
    display: block;
  }

  .isOpen>.sidebar-submenu{
    display: block;
  }

  .menu-item{
    height: 40px;
    line-height: 40px;
    font-size: $sidebarFontSize;
    color: rgba(255, 255, 255, 0.8);
    position: relative;
    transition: height .4s ease;
  }
  .isOpen{
    height: auto;
  }

  .sidebar-nav-title{
    display: inline-block;
  }

  .sidebar-submenu .submenu-item{
    min-width: 100%;
    padding-left: $sidebarFontSize * 1.2 + 10px;
    font-size: $sidebarFontSize - 2px;
  }

  &>.is-active, &>.isOpen{
    border-left: 4px solid #104193;
    background: #031523;

    .is-active{
      border: none;
    }
  }

  .is-active{
    &>a {
      color: #3e9ff1;
    }
  }

  


  .menu-item:focus, .menu-item:hover, .sidebar-nav-title:hover{
    background: #031523;
    border-left-color: #104193;
  }
  .svg-icon {
    margin-right: 6px;
    font-size: 1.2em;
    color: #fff;
  }
  .dropdownIcon{
    position: absolute;
    top: 12px;
    right: 5px;
    cursor: pointer;
  }
}
.hideSidebar .sidebar-menu{
  position: relative;
  z-index: 99;

  .menu-item{
    padding-top: 5px;
    padding-bottom: 25px;
    height: auto;
    font-size: 12px;
    min-height: 40px;
    margin-bottom: 10px;

    &>a>.sidebar-nav-title{
      line-height: 20px;
      min-height: auto;
    }
  }
  .isOpen{
    .sidebar-submenu{
      display: none;
    }
  }
  .menu-item:hover{
    .sidebar-submenu{
      background: #031523;
      display: block;
    }
  }
  .svg-icon{
    margin-left: -4px;
  }
  .sidebar-submenu{
    position: absolute;
    left: $hideSidebarWidth - 4px;
    top: 0;
    width: 150px;
  }
  .el-menu--popup{
    background: #031523;
  }
  .el-submenu__icon-arrow{
    display: none;
  }

  a:hover{
    color: #3e9ff1;
  }

  .dropdownIcon{
    display: none;
  }

  .menu-item>a>.sidebar-nav-title{
    position: absolute;
    left: 0;
    width: 100%;
    top: 20px;
    text-align: center;
    line-height: 22px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .el-menu-item, .sidebar-nav-title{
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

</style>

