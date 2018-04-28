<template>
  <div class="page-top-nav">
      <template v-for="(menu, index) in permission_routers">
         <el-menu-item :key="index" :index="menu.path" v-if="!menu.hidden">
          {{menu.name}}
        </el-menu-item>
      </template>
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
      menus: [{
        name: '运营管理',
        childrens: [
          {
            name: '订单管理',
            link: ''
          },
          {
            name: '运单管理',
            link: ''
          },
          {
            name: '提货管理',
            link: ''
          }
        ]
      },{
        name: '财务管理',
        childrens: [
          {
            name: '核销管理',
            link: ''
          },
          {
            name: '财务初始化',
            link: ''
          },
          {
            name: '会计凭证',
            link: ''
          },
          {
            name: '财务对账',
            link: ''
          },
          {
            name: '员工交账',
            link: ''
          }
        ]
      },{
        name: '报表管理',
        childrens: [
          {
            name: '财务报表',
            link: ''
          },
          {
            name: '运营报表',
            link: ''
          },
          {
            name: '其它报表',
            link: ''
          }
        ]
      },{
        name: '公司管理',
        childrens: [
          {
            name: '系统设置',
            link: ''
          },
          {
            name: '网点管理',
            link: ''
          },
          {
            name: '权限管理',
            link: ''
          },
          {
            name: '员工管理',
            link: ''
          },
          {
            name: '客户管理',
            link: ''
          },
          {
            name: '司机管理',
            link: ''
          },
          {
            name: '车辆管理',
            link: ''
          },
          {
            name: '承运商管理',
            link: ''
          },
          {
            name: '打印模板管理',
            link: ''
          }
        ]
      }]
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
