<template>
  <div class="loadIntelligent_wrapper">
    <keep-alive>
      <component v-bind:is="component"></component>
    </keep-alive>
  </div>
</template>

<script>
  import Load from './load'

  export default {
    components: {
      Load
    },
    props: {
      isShow: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        component: 'Load'
      }
    }
  }
</script>
<style lang="scss">
.loadIntelligent_wrapper{
  height: 100%;
  width:100%;
  min-width: 1000px;
  overflow: hidden;
}
</style>
