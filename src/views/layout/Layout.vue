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
          <app-main :key="theRefreshKey"></app-main>
      </div>
    </div>
    <LockScreen></LockScreen>
    <el-dialog top="0" width="90%" :close-on-click-modal="false" custom-class="showDetailPop" v-if="showDetail" title="订单详情" :visible.sync="showDetailVisible">
        <OrderDetail :ispop="true" :orderid="orderid" />
    </el-dialog>
    <el-dialog top="0" width="90%" custom-class="showCreatePop" v-if="showCreate" title="创建订单" :visible.sync="showCreateVisible">
        <OrderDetail :ispop="true" :close-on-click-modal="false"  @close="hideCreateOrder" :orderid="orderid" />
    </el-dialog>
  </div>
</template>


<script>
import LockScreen from '@/components/LockScreen/index'
import OrderDetail from '@/views/operation/order/orderDetail/index'
import CreateOrder from '@/views/operation/order/createOrder/index'
import { Navbar, Sidebar, AppMain, TagsView } from '@/views/layout'

export default {
  name: 'layout',
  components: {
    Navbar,
    Sidebar,
    AppMain,
    TagsView,
    LockScreen,
    CreateOrder,
    OrderDetail
  },
  data () {
      return {
          theRefreshKey: '',
          orderid: '',
          showDetail: false,
          showCreate: false,
          showDetailVisible: false,
          showCreateVisible: false
      }
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    }
  },
  mounted() {
      this.eventBus.$on('showOrderDetail', (orderid) => {
          // 避免重复触发的事件
          if(!this.showDetailVisible){
            console.log('showOrderDetail:', orderid)
            this.showDetail = true
            this.showDetailVisible = true
            this.orderid = orderid || ''
          }
          
      })
      this.eventBus.$on('hideOrderDetail', (orderid) => {
          this.showDetailVisible = true
      })
      // 如果传过来orderid，表示修改该订单
      this.eventBus.$on('showCreateOrder', (orderid) => {
          // 避免重复触发的事件
          if(!this.showCreateVisible){
            console.log('showCreateOrder:', orderid)
            this.showDetail = true
            this.showCreateVisible = true
            this.orderid = orderid || ''  
          }
                  
      })
      this.eventBus.$on('hideCreateOrder', (orderid) => {
          this.showCreateVisible = true
      })
  },
  methods: {
      refreshKey(){
          this.theRefreshKey = Math.random()
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
            height: 100%;
            padding-top: $topNavHeight;
            bottom: 0;
            left: 0;
            z-index: 1001;
            transition: all .1s ease-out;
            box-sizing: border-box;
        }
        .sidebar-container {
            transition: all .1s ease-out;
            position: relative;
            height: 100%;
            width: 100%;
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
            background: #373d41;
            z-index: 1009;
            min-width: 1180px;
        }
    }
</style>
<style lang="scss">
.showDetailPop{
    min-height: 80%;
    max-height: 100%;
    display: flex;
    flex-direction: column;

    .el-dialog__body{
        padding:0 10px 10px;
        overflow: auto;
        flex: 1;
    }
}
</style>
