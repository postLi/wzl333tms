<template>
  <div class="customer-manager">
    <div class="eltab clearfix">
      <router-link to="/company/customerManage/sender" class="tab-label" :class="{'active-tab': $route.path.indexOf('sender')!==-1}">发货人</router-link>
      <router-link to="/company/customerManage/receiver" class="tab-label" :class="{'active-tab': $route.path.indexOf('receiver')!==-1}">收货人</router-link>
    </div>
    <router-view></router-view> 
  </div>
</template>

<script>
  export default {
    props: {
      isShow: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {}
    }
  }
</script>
<style lang="scss" scoped>
  .customer-manager{
    height: 100%;
    padding-top: 12px;
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

