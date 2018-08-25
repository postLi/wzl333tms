<template>
  <div class="accountsReceivable-manager tab-wrapper">
    <div class="eltab clearfix">
      <router-link to="/finance/accountsReceivable/all"  class="tab-label">全部</router-link>
      <router-link to="/finance/accountsReceivable/cash"  class="tab-label" >现付</router-link>
      <router-link to="/finance/accountsReceivable/arrive"  class="tab-label" >到付</router-link>
      <router-link to="/finance/accountsReceivable/receipt"  class="tab-label" >回单付</router-link>
      <router-link to="/finance/accountsReceivable/month"  class="tab-label" >月结</router-link>
      <router-link to="/finance/accountsReceivable/abnormal"  class="tab-label" >异动费用</router-link>
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

