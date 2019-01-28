<template>
  <div class=" tab-wrapper">
    <div class="eltab clearfix">
      <router-link to="/finance/accountsPayable/waybill/kickback" class="tab-label" v-has:SHIP_PAYLIST1>回扣</router-link>
      <router-link  to="/finance/accountsPayable/waybill/transfer" class="tab-label" v-has:SHIP_PAYLIST2>中转费</router-link>
      <router-link  to="/finance/accountsPayable/waybill/ticket" class="tab-label" v-has:SHIP_PAYLIST3>实际提货费</router-link>
      <router-link  to="/finance/accountsPayable/waybill/unusual" class="tab-label" v-has:SHIP_PAYLIST4>异动费用</router-link>
      <router-link  to="/finance/accountsPayable/waybill/abnormal" class="tab-label" v-has:SHIP_PAYLIST5>异常理赔</router-link>
      <router-link  to="/finance/accountsPayable/waybill/other" class="tab-label" v-has:SHIP_PAYLIST6>其他费用支出</router-link>
      <router-link  to="/finance/accountsPayable/waybill/terminal" class="tab-label" v-has:SHIP_PAYLIST7>终端送货费</router-link>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>


