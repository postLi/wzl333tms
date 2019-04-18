<template>
  <!-- 网点年度费用对比 -->
  <div class="tab-wrapper tab-wrapper-100">
    <keep-alive>
      <component v-bind:is="component"></component>
    </keep-alive>
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
