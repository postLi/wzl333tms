<template>
  <el-menu 
      class="navbar" 
      mode="horizontal" 
      :default-active="current"
      background-color="#378CBE"
      text-color="#fff"
      active-text-color="#273545"
      :router="true">
    <div class="logo-panel">
      <router-link to="/"><img src="../../assets/logo_white.png" alt=""></router-link>
    </div>
    <TopNavMenu />
    <!-- <levelbar></levelbar> -->
    <TopNavUser />
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import TopNavMenu from './TopNavMenu'
import TopNavUser from './TopNavUser'

export default {
  components: {
    TopNavMenu,
    TopNavUser
  },
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

<style rel="stylesheet/scss" lang="scss" scoped>
    .navbar {
        background: #378CBE;
        border-radius: 0;
        .hamburger-container {
            line-height: 58px;
            height: 50px;
            float: left;
            padding: 0 10px;
        }
        .errLog-container {
            display: inline-block;
            position: absolute;
            right: 150px;
        }
        .screenfull {
            position: absolute;
            right: 90px;
            top: 16px;
            color: red;
        }
        .page-top-nav{
          height: 50px;
          float: left;
          margin-left: 5px;
        }
    }

    .logo-panel{
      padding-top: 6px;
      padding-left: 9px;
      height: auto;
      float: left;
      height: 50px;
      
      img{
        height: 38px;
        width: 198px;
      }
    }
</style>

