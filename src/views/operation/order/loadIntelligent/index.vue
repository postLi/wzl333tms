<template>
  <div class="loadIntelligent_wrapper">
    <keep-alive>
      <router-view>
        <!-- <component v-bind:is="component"></component> -->
      </router-view>
    </keep-alive>
  </div>
</template>
<script>
import Load from './load'

export default {
  name: 'loadIntelligentPage',
  components: {
    Load
  },
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      component: 'Load'
    }
  }
}

</script>
<style lang="scss">
.loadIntelligent_wrapper {
  height: 100%;
  width: 100%;
  min-width: 1200px;
  min-height: 600px;
}

</style>
