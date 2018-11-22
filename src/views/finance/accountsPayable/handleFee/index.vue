<template>
  <!-- 操作费核销 -->
  <div class="tab-wrapper tab-wrapper-100">
    <keep-alive v-bind:is="component"></keep-alive>
  </div>
</template>
<script>
import fee from './fee'
export default {
  name: 'handleFee',
  components: {
    fee
  },
  data() {
    return {
      component: 'fee'
    }
  }
}

</script>
