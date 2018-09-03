<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  mounted() {
    // 隐藏表格事件
    const _this = this
    this.eventBus.$on('hideSupcanChart', function() {
      _this.setSupcanChart(true)
    })
    this.eventBus.$on('showSupcanChart', function() {
      _this.setSupcanChart(false)
    })
  },
  methods: {
    setSupcanChart(ishide) {
      const ifr = document.getElementById('senderIframe')
      // 如果有报表组件，需要隐藏她
      if (ifr) {
        if (ifr.contentWindow && ifr.contentWindow.hideChart) {
          ifr.contentWindow.hideChart(ishide)
        }
        // const onload = ifr.onload
        /* ifr.onload = function() {
          setTimeout(() => {
            ifr.contentWindow.hideChart(ishide)
          }, 100)
          onload && onload()
        } */
      }
    }
  }
}
</script>

<style lang="scss">
  @import '~normalize.css/normalize.css';// normalize.css 样式格式化
  // @import './styles/bootstrap/bootstrap.scss';
  @import './styles/index.scss'; // 全局自定义的css样式
</style>
