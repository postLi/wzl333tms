<template>
  <!-- 营业额汇总表 -->
  <div class="tab-wrapper tab-wrapper-100">
      <list />
  </div>
</template>
<script>
// import list from './sender'
import list from './list'
export default {
  name: 'turnoverTotal',
  components: {
    list
  }
}

</script>
