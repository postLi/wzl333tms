<template>
  <div class="arteryDepart-manager tab-wrapper">
    <div class="eltab clearfix">
      <router-link to="/operation/order/arteryDepart/sender" class="tab-label" v-has:LOAD_GX_LIST>干线配载列表</router-link>
      <router-link to="/operation/order/arteryDepart/loadList" class="tab-label" v-has:LOAD_GX_SMART_LIST >智能配载列表</router-link>
      <router-link to="/operation/order/arteryDepart/allrepertory" class="tab-label" v-has:ORDER_REPER_ALL >库存总表</router-link>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'arteryDepart'
}
</script>
