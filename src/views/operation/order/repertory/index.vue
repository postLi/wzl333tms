<template>
  <div class="repetory-manager tab-wrapper">
    <div class="eltab clearfix">
      <!-- 库存管理 -->
       <router-link to="/operation/order/repertory/allrepertory"  class="tab-label" v-has:ORDER_REPER_ALL >库存总表</router-link>
      <router-link to="/operation/order/repertory/deliver"  class="tab-label" v-has:ORDER_REPER_SEND >发货库存</router-link>
      <router-link to="/operation/order/repertory/arrival"  class="tab-label" v-has:ORDER_REPER_ARRIVE >到货库存</router-link>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
export default {
  // 没有新增/修改弹窗的列表页不需要缓存，保证每次访问都请求拿最新的数据
  name: 'orderrepertory'
}

</script>
