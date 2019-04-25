<template>
  <!-- 营业额日报表 -->
  <div class="tab-wrapper tab-wrapper-100">
      <list />
  </div>
</template>
<script>
// import list from './sender'
import list from './list'
export default {
  name: 'turnoverDaily',
  components: {
    list
  }
}

</script>
