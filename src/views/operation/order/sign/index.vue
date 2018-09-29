<template>
  <div class="sign-manager tab-wrapper">
    <div class="eltab clearfix">
       <router-link to="/operation/order/sign/Pick"  class="tab-label" v-has:ORDERSIGN1 >自提签收</router-link>
      <router-link to="/operation/order/sign/Delivery"  class="tab-label" v-has:ORDERSIGN2 >送货签收</router-link>
       <router-link to="/operation/order/sign/Transfer"  class="tab-label" v-has:ORDERSIGN3 >中转签收</router-link>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
  
</template>

<script>

export default {
  name: 'ordersign'
}
</script>
