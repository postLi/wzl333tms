<template>
    <li>
      <!-- 有子菜单但不展示 -->
      <router-link v-if="!item.hidden&&item.noDropdown&&item.children.length>0" :to="item.path" :key="item.name" :index="item.path">
        <icon-svg v-if='item.icon' :icon-class="item.icon" /> <span class="sidebar-nav-title">{{ !sidebar.opened ? (item.children[0].meta.stitle||item.children[0].meta.title) : item.children[0].meta.title}}</span>
      </router-link>
      <!-- 没有子菜单 -->
      <router-link :to="item.path" v-if="!item.hidden&&(!item.children || item.children.length===0)" :index="item.path" :key="item.name">
        <icon-svg v-if='item.icon' :icon-class="item.icon" /> <span class="sidebar-nav-title">{{ !sidebar.opened ? (item.meta.stitle||item.meta.title) : item.meta.title}}</span>
      </router-link>

      <!-- 包含子菜单展示 -->
      <template v-if="!item.noDropdown&&!item.hidden&&item.children&&item.children.length" class="sidebar-sub-menu">
        <router-link :to="item.path" :key="item.name">
          <icon-svg v-if='item.icon' :icon-class="item.icon" /> <span class="sidebar-nav-title">{{ !sidebar.opened ? (item.children[0].meta.stitle||item.children[0].meta.title) : item.children[0].meta.title}}</span>
        </router-link>
        <ul class='menu-indent'>
          <SidebarItemNode
            class="submenu-item"
            v-for="(route, index) in item.children"
            :key="index"
            :routes="route">
          </SidebarItemNode>
        </ul>
      </template>
    </li>
    
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'SidebarItemNode',
  props: {
    routes: {
      type: Object
    }
  },
  computed: {
    item () {
      return this.routes
    },
    ...mapGetters([
      'sidebar'
    ]),
    isFolder: function () {
      return this.model.children &&
        this.model.children.length
    }
  },
  data: function () {
    return {
      open: false
    }
  },
  methods: {
    toggle: function () {
      if (this.isFolder) {
        this.open = !this.open
      }
    },
    changeType: function () {
      if (!this.isFolder) {
        Vue.set(this.model, 'children', [])
        this.addChild()
        this.open = true
      }
    }
  }
}
</script>
