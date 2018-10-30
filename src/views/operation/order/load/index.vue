<template>
  <div class="load_wrapper">
    <keep-alive v-if="$route.query.info">
      <component v-bind:is="component"></component>
    </keep-alive>
    <keep-alive v-else>
      <component v-bind:is="component"></component>
    </keep-alive>
  </div>
</template>
<script>
import short from './short'
import deliver from './deliver'
import artery from './artery'
export default {
  name: 'orderload',
  components: {
    short,
    deliver,
    artery
  },
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  // beforeRouteEnter (to, from , next) {
  //   console.log('beforeRouteEnter1')
  //   next()
  // },
  // beforeRouteUpdate (to, from , next) {
  //   console.log(to.path);
  //   console.log(to.query);
  //   console.log('beforeRouteUpdate1')
  //   next()
  // },
  // beforeRouteLeave (to, from , next) {
  //   console.log('beforeRouteLeave1')
  //   next()
  // },
  // beforeCreate () {
  //   console.error('beforeCreate')
  // },
  // created () {
  //   console.error('created')
  // },
  // beforeMount () {
  //   console.error('beforeMount')
  // },
  // mounted () {
  //   console.error('mount')
  // },
  // beforeUpdate () {
  //   console.error('beforeUpdate')
  // },
  // updated () {
  //   console.error('updated')
  // },
  // beforeDestroy () {
  //   console.error('beforeDestroy')
  // },
  // destroyed () {
  //   console.error('destroyed')
  // },
  // activated () {
  //   console.error('activated')
  // },
  methods: {
    visitedViews() {
      return this.$store.state.tagsView.visitedViews
    }
  },
  computed: {
    component() {
      let loadTypeId = Number(this.$route.query.loadTypeId)
      switch (loadTypeId) {
        case 38:
          return 'short'
        case 39:
          return 'short'
        case 40:
          return 'short'
      }
    }
  }
}

</script>
<style lang="scss">
.load_wrapper {
  height: 100%;
  width: 100%;
  min-width: 1200px;
  min-height: 600px;
}

</style>
