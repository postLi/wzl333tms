<template>
  <div class="payment-manager tab-wrapper">
    <div class="eltab clearfix">
        <router-link to="/finance/reconciliation/carfee/shortDepart" v-has:FINANCE_CARFEE_SHORT  class="tab-label">短驳对账</router-link>
        <router-link to="/finance/reconciliation/carfee/artery" v-has:FINANCE_CARFEE_LINE class="tab-label">干线对账</router-link>
        <router-link to="/finance/reconciliation/carfee/deliver" v-has:FINANCE_CARFEE_SEND class="tab-label">送货对账</router-link>
    </div>
    <keep-alive>
        <router-view></router-view>
    </keep-alive>
  </div>

</template>
<script>
export default {
  name: 'reconciliationCarfee'
}
</script>
