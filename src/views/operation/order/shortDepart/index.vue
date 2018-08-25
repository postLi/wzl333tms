<template>
  <div class="showdepart-manager tab-wrapper" :key="key">
    <div class="eltab clearfix">
      <!-- 短驳管理 -->
      <router-link to="/operation/order/shortDepart/deliver"   class="tab-label" >短驳发车</router-link>
      <router-link to="/operation/order/shortDepart/arrival"   class="tab-label" >短驳到货</router-link>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>

export default {
  name: 'shortDepart'
}

</script>
