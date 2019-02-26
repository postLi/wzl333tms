<template>
  <div class="tab-wrapper">
    <keep-alive>
      <component v-bind:is="component"></component>
    </keep-alive>
  </div>
</template>

<script>
import TruckMap from './truckMap'

export default {
  name: 'trucklog',
  components: {
    TruckMap
  },
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      component: 'TruckMap'
    }
  }
}
</script>

