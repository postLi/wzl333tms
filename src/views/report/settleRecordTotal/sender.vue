<template>
  <div class="chartSender">
    <iframe :src="gameIframe" ref="showIframe" frameborder='0' scrolling=auto name="showHere" class="chartIframe"></iframe>
  </div>
</template>
<script>
export default {
  data() {
    return {
      gameIframe: ''
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      let path = window.location.protocol + '//' + window.location.host + '/static/supcan/demo.html'
      this.gameIframe = path
    }
  }
}

</script>

<style lang="scss">
.chartSender{
  width:100%;
  height: calc(100% - 10px);
.chartIframe{
  width:100%;
  height:100%;
}
}

</style>
