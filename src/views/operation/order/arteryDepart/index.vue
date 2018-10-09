<template>
  <div class="arteryDepart-manager tab-wrapper">
    <div class="eltab clearfix">
      <router-link to="/operation/order/arteryDepart/sender" class="tab-label">干线配载列表</router-link>
      <router-link to="/operation/order/arteryDepart/loadList" class="tab-label">智能配载列表</router-link>
      <router-link to="/operation/order/repertory/allrepertory" class="tab-label">库存总表</router-link>
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
