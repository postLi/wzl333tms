<template>
  <div class=" tab-wrapper">
    <div class="eltab clearfix">
      <router-link to="/finance/accountsPayable/waybill/kickback" class="tab-label" >回扣</router-link>
      <router-link  to="/finance/accountsPayable/waybill/transfer" class="tab-label" >中转费</router-link>
      <router-link  to="/finance/accountsPayable/waybill/ticket" class="tab-label" >实际提货费</router-link>
      <router-link  to="/finance/accountsPayable/waybill/unusual" class="tab-label" >异动费用</router-link>
      <router-link  to="/finance/accountsPayable/waybill/abnormal" class="tab-label" >异常理赔</router-link>
      <router-link  to="/finance/accountsPayable/waybill/other" class="tab-label" >其他费用支出</router-link>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
