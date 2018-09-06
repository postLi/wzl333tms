<template>
  <div class="">
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
