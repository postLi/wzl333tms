<template>
  <div class="customer-manager tab-wrapper">
    <div class="eltab clearfix">
      <router-link to="/company/customerManage/sender" class="tab-label" >发货人</router-link>
      <router-link to="/company/customerManage/receiver" class="tab-label" >收货人</router-link>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
export default {
  name: 'customerManage'
}
</script>
