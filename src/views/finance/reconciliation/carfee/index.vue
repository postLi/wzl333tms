<template>
  <div class="payment-manager tab-wrapper">
    <div class="eltab clearfix">
        <router-link to="/finance/reconciliation/carfee/shortDepart"  class="tab-label" v-has:FINANCE_CARFEE_SHORT>短驳对账</router-link>
        <router-link to="/finance/reconciliation/carfee/artery" class="tab-label" v-has:FINANCE_CARFEE_LINE>干线对账</router-link>
        <router-link to="/finance/reconciliation/carfee/deliver" class="tab-label" v-hasFINANCE_CARFEE_SEND:>送货对账</router-link>
    </div>
    <keep-alive>
        <router-view></router-view>
    </keep-alive>
  </div>

</template>
