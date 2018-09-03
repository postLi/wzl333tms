<template>
  <!-- 资金流水汇总 -->
  <div class="tab-wrapper tab-wrapper-100">
    <keep-alive v-bind:is="component"></keep-alive>
  </div>
</template>
<script>
import settleLog2 from './settleLog'
import settleLogDetail from './settleLogDetail'
export default {
  name: 'settleLog',
  components: {
    settleLog2,
    settleLogDetail
  },
  data() {
    return {
      component: 'settleLog2'
    }
  },
  watch: {
    $route(){
      this.setComponent()
    }
  },
  mounted() {
    this.setComponent()
  },
  methods: {
    setComponent() {
      if (this.$route.path.indexOf('settleLogDetail') !== -1) {
        this.component = 'settleLogDetail'
      } else {
        this.component = 'settleLog2'
      }
    }
  }
}

</script>
