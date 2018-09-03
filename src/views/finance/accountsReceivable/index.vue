<template>
  <div class="accountsReceivable-manager tab-wrapper">
    <div class="eltab clearfix">
      <router-link to="/finance/accountsReceivable/all"  class="tab-label" v-has:FINANCE_RECLIST1>全部</router-link>
      <router-link to="/finance/accountsReceivable/cash"  class="tab-label" v-has:FINANCE_RECLIST2>现付</router-link>
      <router-link to="/finance/accountsReceivable/arrive"  class="tab-label" v-has:FINANCE_RECLIST3>到付</router-link>
      <router-link to="/finance/accountsReceivable/receipt"  class="tab-label" v-has:FINANCE_RECLIST4>回单付</router-link>
      <router-link to="/finance/accountsReceivable/month"  class="tab-label" v-has:FINANCE_RECLIST5>月结</router-link>
      <router-link to="/finance/accountsReceivable/abnormal"  class="tab-label" v-has:FINANCE_RECLIST6>异动费用</router-link>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'accountsReceivable'
}
</script>

