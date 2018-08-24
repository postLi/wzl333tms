<template>
  <div class="order-manager tab-wrapper">
    <div class="eltab clearfix">
      <router-link to="/operation/order/orderManage/All" tag="span"  class="tab-label" :class="{'active-tab': component.indexOf('All')!==-1}">全部运单</router-link>
      <router-link to="/operation/order/orderManage/History" tag="span"  class="tab-label" :class="{'active-tab': component.indexOf('History')!==-1}">改单记录</router-link>
      <router-link to="/operation/order/orderManage/Dashboard" tag="span"  class="tab-label" :class="{'active-tab': component.indexOf('Dashboard')!==-1}">草稿箱</router-link>
      <!-- <span @click="component = 'All'" class="tab-label" :class="{'active-tab': component.indexOf('All')!==-1}">全部运单</span>
      <span @click="component = 'History'" class="tab-label" :class="{'active-tab': component.indexOf('History')!==-1}">改单记录</span>
      <span @click="component = 'Dashboard'" class="tab-label" :class="{'active-tab': component.indexOf('Dashboard')!==-1}">草稿箱</span> -->
    </div>
    <keep-alive>
      <component v-bind:is="component"></component>
    </keep-alive>
  </div>
</template>

<script>
import All from './all'
import Dashboard from './dashboard'
import History from './history'

export default {
  name: 'orderManage',
  components: {
    All,
    Dashboard,
    History
  },
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    $route(){
      if(this.$route.path.indexOf('/operation/order/orderManage/All')!==-1){
        this.component = 'All'
      }
      if(this.$route.path.indexOf('/operation/order/orderManage/History')!==-1){
        this.component = 'History'
      }
      if(this.$route.path.indexOf('/operation/order/orderManage/Dashboard')!==-1){
        this.component = 'Dashboard'
      }
    }
  },
  data() {
    return {
      component: 'All'
    }
  }
}
</script>
<style lang="scss">
.viewtip{
  font-size: 12px;
  color: #999;
  margin-left: 10px;
  line-height: 30px;
}
</style>

