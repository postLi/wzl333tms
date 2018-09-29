<template>
  <div class=" tab-wrapper">
    <div class="eltab clearfix">
      <router-link to="/finance/accountsPayable/batch/short" class="tab-label" v-has:PAY_LOADLIST1 >短驳费</router-link>
      <router-link to="/finance/accountsPayable/batch/deliver" class="tab-label" v-has:PAY_LOADLIST2 >送货费</router-link>
      <router-link to="/finance/accountsPayable/batch/truckAll" class="tab-label" v-has:PAY_LOADLIST3 >发车汇总</router-link>
      <router-link to="/finance/accountsPayable/batch/arrivalAll" class="tab-label" v-has:PAY_LOADLIST4 >到车汇总</router-link>
      <router-link to="/finance/accountsPayable/batch/insurance" class="tab-label" v-has:PAY_LOADLIST5 >整车保险费</router-link>
      <router-link to="/finance/accountsPayable/batch/stationLoad" class="tab-label" v-has:PAY_LOADLIST6 >发站装卸费</router-link>
      <router-link to="/finance/accountsPayable/batch/stationOther" class="tab-label" v-has:PAY_LOADLIST7 >发站其他费</router-link>
      <router-link to="/finance/accountsPayable/batch/arriveLoad" class="tab-label" v-has:PAY_LOADLIST8 >到站装卸费</router-link>
      <router-link to="/finance/accountsPayable/batch/arrivalOther" class="tab-label" v-has:PAY_LOADLIST9 >到站其他费</router-link>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
