<template>
    <ul class="sidebar-menu" ref="sidebarMenu" @click.stop="showTab">
      <li
        class="menu-item"
        v-for="(route, index) in routes"
        :key="index"
        v-if="!route.hidden"
        :class="{'is-active': route.path === $route.path}" 
        ref="sidebaritem"
        >
        <!-- 有子菜单但不展示 && 没有子菜单 -->
        <router-link v-if="isFolder(route) ? route.noDropdown : (!route.tab && true)" :to="route.path" :key="route.name" >
          <icon-svg v-if='route.icon' :icon-class="route.icon" /> <span class="sidebar-nav-title">{{ !sidebar.opened ? (route.meta.stitle||route.meta.title) : route.meta.title}}</span>
        </router-link>
        <!-- 带子菜单展示 -->
        <template v-if="isFolder(route)">
          <span class="sidebar_menu_toggle"  @click.stop="toggle($event)" >
            <icon-svg v-if='route.icon' :icon-class="route.icon" /> <span class="sidebar-nav-title">{{ !sidebar.opened ? (route.meta.stitle||route.meta.title) : route.meta.title}}</span>
            <i class="el-icon-caret-bottom dropdownIcon" ></i>
           </span>
           <ul class='sidebar-submenu' @click.stop>
            <!-- 暂时只展开二级菜单 -->
            <li v-for="(item, index) in route.children"
              v-if="!item.hidden"
              :key="index"
              :class="{'is-active': item.path === $route.path}"
              class="submenu-item">
              <router-link :to="item.path" :index="item.path" :key="item.name">
                <icon-svg v-if='item.icon' :icon-class="item.icon" /> <span class="sidebar-nav-title">{{ item.meta.title }}</span>
              </router-link>
            </li>
          </ul>
        </template>
        <!-- 带tab菜单展示 -->
        <template v-if="route.tab">
          <span class="sidebar_menu_toggle"  @click.stop="toggle($event)" >
            <icon-svg v-if='route.icon' :icon-class="route.icon" /> <span class="sidebar-nav-title">{{ !sidebar.opened ? (route.meta.stitle||route.meta.title) : route.meta.title}}</span>
            <i class="el-icon-caret-bottom dropdownIcon" ></i>
           </span>
           <ul class='sidebar-submenu' @click.stop>
            <!-- 暂时只展开二级菜单 -->
            <li v-for="(item, index) in route.tab"
              v-if="!item.hidden"
              :key="index"
              :path="item.path"
              :class="{'is-active': item.path === $route.path}"
              class="submenu-item submenu-item-tab">
                <icon-svg v-if='item.icon' :icon-class="item.icon" /> <span class="sidebar-nav-title">{{ item.meta.title }}</span>
            </li>
          </ul>
        </template>  
      </li>
    </ul>
</template>

<script>
import { mapGetters } from 'vuex'
import { closest } from '@/utils/index'
import { eventBus } from '@/eventBus'

export default {
  name: 'SidebarItem',
  props: {
    routes: {
      type: Array
    }
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ])
  },
  data () {
    return {
      open: true
    }
  },
  methods: {
    isFolder (item) {
      return item.children && item.children.length
    },
    removeOtherOpenFolder () {
      let childRef = Array.isArray(this.$refs.sidebarMenuItem) ? this.$refs.sidebarMenuItem : [this.$refs.sidebarMenuItem]
      childRef.map( el =>{
        if(el.isFolder && el.open){
          el.open = false
        }
      })
    },
    isOpen (route) {
      return true
    },
    toggle (event) {
      const el = closest(event.target, 'li')
      el.classList.toggle('isOpen')
    },
    showTab (event) {
      let el = closest(event.target, 'li.submenu-item-tab')
      
      if(el){
        eventBus.$emit('changeTab', el.path)        
      }
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
    .dropdownIcon{
      transform-origin: center center;
      transform: rotate(180deg);
    }
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

  .sidebar_menu_toggle, .submenu-item-tab{
    cursor: pointer;
    display: block;
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
    transition: transform .6s ease;
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

