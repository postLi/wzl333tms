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
    this.eventBus.$on('hideSupcanChart', function() {
      const ifr = document.getElementById('senderIframe')
      // 如果有报表组件，需要隐藏她
      if (ifr) {
        const onload = ifr.onload
        ifr.onload = function() {
          setTimeout(() => {
            ifr.contentWindow.hideChart(true)
          }, 100)
          onload && onload()
        }
      }
    })
    this.eventBus.$on('showSupcanChart', function() {
      const ifr = document.getElementById('senderIframe')
      // 如果有报表组件，需要显示她
      if (ifr) {
        const onload = ifr.onload
        ifr.onload = function() {
          setTimeout(() => {
            ifr.contentWindow.hideChart(false)
          }, 100)
          onload && onload()
        }
      }
    })
  }
}
</script>

<style lang="scss">
  @import '~normalize.css/normalize.css';// normalize.css 样式格式化
  // @import './styles/bootstrap/bootstrap.scss';
  @import './styles/index.scss'; // 全局自定义的css样式
</style>
