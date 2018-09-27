<template>
  <div class="receipt-manager tab-wrapper">
    <div class="eltab clearfix">
      <router-link to="/operation/order/receipt/Recycle"  class="tab-label" v-has:RECEIPT1 >回单回收</router-link>
      <router-link to="/operation/order/receipt/Send"  class="tab-label" v-has:RECEIPT2 >回单寄出</router-link>
      <router-link to="/operation/order/receipt/Accept"  class="tab-label" v-has:RECEIPT3 >回单接收</router-link>
      <router-link to="/operation/order/receipt/Grant"  class="tab-label" v-has:RECEIPT4 >回单发放</router-link>
     
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
export default {
  // name: 'orderreceipt'
}
</script>
