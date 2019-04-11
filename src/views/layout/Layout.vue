<template>
  <div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
    <div class="navbar-wrapper">
        <navbar></navbar>
        <img :src="defaultce" v-show="otherinfo.isTest===1" class="navbar-wrapper-ce">
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
    <el-dialog top="0" width="90%" :close-on-click-modal="false" class="showDetailPop" v-if="showDetail" title="运单详情" :visible.sync="showDetailVisible">
        <OrderDetail v-if="showDetail" :ispop="showDetailVisible" :orderid="orderid" />
    </el-dialog>
    <el-dialog top="0" :close-on-click-modal="false" width="90%" class="showDetailPop" v-if="showCreate" title="创建运单" :visible.sync="showCreateVisible">
        <CreateOrder v-if="showCreate" :ispop="showCreateVisible" :orderobj="orderobj" />
    </el-dialog>
    <!-- <iframe src="http://192.168.1.170/member/autologin.php" frameborder="0" style="width:0;height:0;"></iframe> -->
    <setApiUrl />
  </div>
</template>


<script>
import { objectMerge2 } from '@/utils/'
import LockScreen from '@/components/LockScreen/index'
import OrderDetail from '@/views/operation/order/orderDetail/index'
import CreateOrder from '@/views/operation/order/createOrder/main'
import { Navbar, Sidebar, AppMain, TagsView } from '@/views/layout'
import setApiUrl from '@/components/changeApiUrl/index'

export default {
  name: 'layout',
  components: {
    Navbar,
    Sidebar,
    AppMain,
    TagsView,
    LockScreen,
    CreateOrder,
    OrderDetail,
    setApiUrl
  },
  data() {
    return {
      defaultce: require('../../assets/png/ce.png'),
      theRefreshKey: '',
      orderid: '',
      orderobj: {
        orderid: '',
        batchid: '',
        preid: '',
        ordernum: 1,
        batchobj: {}
      },
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
      // 通过标签打开的方式
    this.eventBus.$on('showOrderDetail', (orderid, shipSn, isTab) => {
          // 避免重复触发的事件
      if (isTab) {
        this.$router.push('/operation/order/orderDetail?orderid=' + orderid + '&tab=查看运单' + shipSn)
        /* this.$router.push({ path: '/operation/order/orderDetail', query: {
          orderid
        }}) */
      } else if (!this.showDetailVisible) {
        console.log('showOrderDetail:', orderid)
        this.orderid = orderid || ''
        this.showDetail = true
        this.showDetailVisible = true
      }
    })
    this.eventBus.$on('hideOrderDetail', (orderid) => {
      this.showDetailVisible = false
    })
      // 如果传过来orderid，表示修改该订单
    this.eventBus.$on('showCreateOrder', (orderobj) => {
          // 避免重复触发的事件
      if (!this.showCreateVisible) {
        const data = objectMerge2({}, this._orderobj, orderobj)
        console.log('showCreateOrder:', orderobj, data)
        this.orderobj = data
        this.showCreate = true
        this.showCreateVisible = true
      }
    })
    this.eventBus.$on('hideCreateOrder', (orderid) => {
      this.showCreateVisible = false
    })
    this._orderobj = objectMerge2({}, this.orderobj)
  },
  methods: {
    refreshKey() {
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
            .navbar-wrapper-ce{
              height:46px;
              vertical-align: middle;
            }
        }
    }
</style>
<style lang="scss">
.showDetailPop{
    height: 100%;

    .el-dialog{
        height: 90%;
        display: flex;
        flex-direction: column;
        top: 5%;
    }


    .el-dialog__body{
        padding:5px 10px 10px;
        overflow: auto;
        flex: 1;
    }
}
</style>
