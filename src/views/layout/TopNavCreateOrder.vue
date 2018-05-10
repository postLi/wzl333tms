<template>
  <div class="createOrder" @click="openCreatePage"><icon-svg icon-class="jia" /> 创建运单</div>
</template>
<script>
import openWindow from '../../utils/openWindow'
export default {
  methods: {
    openCreatePage () {
      // 根据用户配置信息，决定是新开窗口打开还是在当前页面打开
      //1.当前页面跳转
      this.$router.push('/operation/order/createOrder')
      //2.新开窗口查看
      //openWindow('/createOrder', '创建运单', 1200, 666)
    }
  }
}
</script>
