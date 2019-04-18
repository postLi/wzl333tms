<template>
  <!-- ciawu   -->
  <div class="tab-wrapper tab-wrapper-100">
    <keep-alive include="cash">
      <component v-bind:is="component"></component>
    </keep-alive>
  </div>
</template>
<script>
import cash from './cash'
import cashDetail from './cashDetail'
export default {
  name: 'financeDaily',
  components: {
    cash,
    cashDetail
  },
  data() {
    return {
      component: 'cash'
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
      console.log(this.$route.path)
      if (this.$route.path.indexOf('cashDetail') !== -1) {
        this.component = 'cashDetail'
      } else {
        this.component = 'cash'
      }
    }
  }
}

</script>
