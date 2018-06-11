<template>
  <div class="order-manager">
    <div class="eltab clearfix">
      <span @click="component = 'All'" class="tab-label" :class="{'active-tab': component.indexOf('All')!==-1}">全部订单</span>
      <span @click="component = 'History'" class="tab-label" :class="{'active-tab': component.indexOf('History')!==-1}">改单记录</span>
      <span @click="component = 'Dashboard'" class="tab-label" :class="{'active-tab': component.indexOf('Dashboard')!==-1}">草稿箱</span>
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
  data() {
    return {
      component: 'All'
    }
  }
}
</script>
<style lang="scss" scoped>
  .order-manager{
    height: 100%;
    padding-top: 8px;
    .eltab{
      width: 100%;
      height: 32px;
      line-height: 30px;
      border-bottom: 1px solid #91cbf7;
    }
    .tab-label:first-child{
      margin-left: 1px;
      border-left-width: 1px; 
      
    }
    .tab-label{
      float: left;
      padding-left: 12px;
      padding-right: 12px;
      border-radius: 3px 3px 0px 0px;
      border: solid 1px #d2d2d2;
      font-size: 14px;
      border-left-width: 0;
      border-bottom: 1px solid #3e9ff1;
      position: relative;
      top: 0px;
      cursor: pointer;

      &:hover{
        background: #ffffee;
      }
    }
    .active-tab{
      color:#3e9ff1;
      border-color: #3e9ff1;
      border-bottom-color: #fff;
      z-index: 2;
      left: -1px;
      top: -1px;
      border-left: 1px solid #3e9ff1;
      border-top-width: 2px;
    }
    .tab-content{
      width: 100%;
      padding: 0 20px;
    }
  }
</style>

