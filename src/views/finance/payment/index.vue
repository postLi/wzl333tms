<template>
  <div class="payment-manager tab-wrapper">
    <div class="eltab clearfix">
      <router-link to="/finance/payment/recycle"  class="tab-label" >货款回收</router-link>
      <router-link to="/finance/payment/send"  class="tab-label" >货款汇款</router-link>
      <router-link to="/finance/payment/accept"  class="tab-label" >货款到账</router-link>
      <router-link to="/finance/payment/grant"  class="tab-label" >货款发放</router-link>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>

export default {
  name: 'financepayment'
}

</script>
