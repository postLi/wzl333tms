<template>
  <div class="load_wrapper">
    <keep-alive>
      <component v-bind:is="component"></component>
    </keep-alive>
  </div>
</template>
<script>
import info from './info'
export default {
  name: 'orderloaddeliveryModify',
  components: {
    info
  },
  data() {
    return {
      component: 'info'
    }
  }
}

</script>
<style lang="scss">
.load_wrapper {
  height: 100%;
  width: 100%;
  min-width: 1200px;
  min-height: 600px;
}

</style>
