<template>
  <!-- 资金流水汇总 -->
  <div class="tab-wrapper tab-wrapper-100">
    <keep-alive v-bind:is="component"></keep-alive>
  </div>
</template>

<script>
import settleLog from './settleLog'
export default {
  components: {
    settleLog
  },
  data () {
    return {
      component: 'settleLog'
    }
  }
}
</script>