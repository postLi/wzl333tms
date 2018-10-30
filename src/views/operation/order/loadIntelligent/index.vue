<template>
  <div class="loadIntelligent_wrapper">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
export default {
  name: 'loadIntelligentPage'
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
