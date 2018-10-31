<template>
  <div class="createOrder-page">
      <Main />
  </div>
</template>
<script>
import Main from './main'

export default {
  name: 'createOrder22',
  components: {
    Main
  },
  data() {
    return {
      userinfo: {}
    }
  },
  activated() {
    console.log('createOrder22----111111111')
  },
  mounted() {
    console.log('createOrder22----1222222222')
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
