<template>
  <div class="createOrder-page">
      <Main2 key="modifyOrder" />
  </div>
</template>
<script>
import Main2 from './main'

export default {
  // name: 'modifyOrder22',
  components: {
    Main2
  },
  data() {
    return {
      userinfo: {}
    }
  },
  watch: {
    '$route'(to, from) {
      // console.log('modifyOrder333---', to.fullPath, from.fullPath)
    }
  },
  activated() {
    // console.log('modifyOrder22----111111111')
  },
  mounted() {
    // console.log('modifyOrder22----1222222222')
  }
}
</script>
<style lang="scss">
.createOrder-page{
  position: relative;
  width: 100%;
  height: 100%;
  padding-top: 24px;
  z-index: 1;
  
}
</style>
