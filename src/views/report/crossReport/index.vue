<template>
  <!-- 网点业务费用对比 -->
  <div class="tab-wrapper tab-wrapper-100">
    <keep-alive v-bind:is="component"></keep-alive>
  </div>
</template>
<script>
import sender from './sender'
export default {
  components: {
    sender
  },
  data() {
    return {
      component: 'sender'
    }
  }
}

</script>
