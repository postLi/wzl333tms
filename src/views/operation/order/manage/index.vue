<template>
  <div class="customer-manager tab-wrapper">
    <div class="eltab clearfix">
      <router-link v-has:ORDERMANAGER_LIST to="/operation/order/manage/service" class="tab-label">客服订单</router-link>
      <router-link v-has:ORDERMANAGER_IMPLIST to="/operation/order/manage/import" class="tab-label">运单导入</router-link>
      <router-link v-has:ORDERMANAGER_NETWORKLIST to="/operation/order/manage/networks" class="tab-label">网络订单</router-link>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
export default {
  name: 'ordermanage'
}
</script>
