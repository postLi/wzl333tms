<template>
  <!-- 收入统计报表 -->
  <div class="tab-wrapper tab-wrapper-100">
    <keep-alive v-bind:is="component"></keep-alive>
  </div>
</template>
<script>
import sender from './sender'
import list from './list'
export default {
  components: {
    sender,
    list
  },
  data() {
    return {
      component: 'list'
    }
  }
}

</script>
