<template>
  <div class="order-manager tab-wrapper">
    <div class="eltab clearfix">
      <router-link to="/operation/order/orderManage/All"  class="tab-label" >全部运单</router-link>
      <router-link to="/operation/order/orderManage/History"  class="tab-label" >改单记录</router-link>
      <router-link to="/operation/order/orderManage/Dashboard"  class="tab-label" >草稿箱</router-link>
    </div>
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>
