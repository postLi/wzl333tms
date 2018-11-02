<template>
  <div class="createOrder-page">
      <Main />
  </div>
</template>
<script>
import Main from './main'
// 引入keep-alive 的时候，页面第一次进入，钩子的触发顺序created-> mounted-> activated，退出时触发deactivated
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
  watch: {
    '$route'(to, from) {
      // console.log('createOrder333---', to.fullPath, from.fullPath)
    }
  },
  beforeCreate() {
    // console.log('createOrder22----beforeCreate', JSON.stringify(this.$store.state.tagsView.cachedViews))
  },
  created() {
    // console.log('createOrder22----created')
  },
  beforeMount() {
    // console.log('createOrder22----beforeMount')
  },
  beforeUpdate() {
    // console.log('createOrder22----beforeUpdate')
  },
  updated() {
    // console.log('createOrder22----updated')
  },
  deactivated() {
    // console.log('createOrder22----deactivated')
  },
  beforeDestroy() {
    // console.log('createOrder22----beforeDestroy')
  },
  destroyed() {
    // console.log('createOrder22----destroyed')
  },
  errorCaptured(err, vm, info) {
    // console.log('createOrder22----errorCaptured', err, vm, info)
  },
  activated() {
    // console.log('createOrder22----activated')
  },
  mounted() {
    // console.log('createOrder22----mounted')
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
