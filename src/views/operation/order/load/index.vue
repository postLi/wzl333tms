<template>
  <div class="load_wrapper">
    <keep-alive v-if="$route.query.info">
      <component v-bind:is="component"></component>
    </keep-alive>
    <keep-alive v-else>
      <component v-bind:is="component"></component>
    </keep-alive>
  </div>
</template>
<script>
import short from './short'
import deliver from './deliver'
import artery from './artery'
export default {
  name: 'orderload',
  components: {
    short,
    deliver,
    artery
  },
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    component() {
      let loadTypeId = Number(this.$route.query.loadTypeId)
      switch (loadTypeId) {
        case 38:
          return 'short'
        case 39:
          return 'artery'
        case 40:
          return 'deliver'
      }
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
