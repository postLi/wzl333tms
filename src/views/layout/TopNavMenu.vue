<template>
  <div class="page-top-nav">
    <el-menu 
      mode="horizontal" 
      :default-active="current"
      background-color="#003863"
      text-color="#fff"
      active-text-color="#ffffff"
      :router="true">
      <template v-for="(menu, index) in permission_routers">
         <el-menu-item :key="index" :index="menu.path" v-if="!menu.hidden">
          {{menu.name}}
        </el-menu-item>
      </template>
      </el-menu>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'TopNavMenu',
  computed: {
    ...mapGetters([
      'permission_routers'
    ])
  },
  data () {
    return {
      current: '',
      prevPath: ''
    }
  },
  watch: {
    $route () {
      this.setNavHightlight()
    }
  },
  mounted(){
    this.setNavHightlight()
  },
  methods: {
    /**
     * 设置与当前页匹配的菜单高亮
     */
    setNavHightlight(){
      let find = this.permission_routers.filter(route => {
          return route.path !=='/' && this.$route.path.indexOf(route.path) === 0
        })
      let current = find[0] || this.$route
      this.current = current.path
      if(this.prevPath!==this.current){
        this.prevPath = this.current
        this.$store.dispatch('GenerateSidebarRoutes', current.name)
      }
    }
  }
}
</script>


<style lang="scss">
  #app .page-top-nav .el-menu-item{
    height: 50px;
    line-height: 50px;
    color: #fff;

    &.is-active{
      background: #307AA6;
    }

    &:hover{
      background: #307AA6;
    }
  }
  #app .page-top-nav .el-submenu>.el-menu{
    top: 52px;
  }
</style>
