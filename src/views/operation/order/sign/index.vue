<template>
  <div class="sign-manager tab-wrapper">
    <div class="eltab clearfix">
       <router-link to="/operation/order/sign/Pick"  class="tab-label" >自提签收</router-link>
      <router-link to="/operation/order/sign/Delivery"  class="tab-label" >送货签收</router-link>
       <router-link to="/operation/order/sign/Transfer"  class="tab-label" >中转签收</router-link>
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
