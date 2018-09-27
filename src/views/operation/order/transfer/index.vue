<template>
  <div class="order-manager tab-wrapper">
    <div class="eltab clearfix">
      <router-link to="/operation/order/transfer/transfered"  class="tab-label" v-has:TRANSFER_ALREADY >已中转运单</router-link>
      <router-link to="/operation/order/transfer/batch"  class="tab-label" v-has:TRANSFER_LOAD >中转批次</router-link>

    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  // name: 'ordertransfer'
}
</script>

