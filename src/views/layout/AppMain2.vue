<template>
  <section class="app-main">
      <keep-alive :include="cachedViews">
        <router-view></router-view>
      </keep-alive>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    }
  },
  mounted() {

  }
}
</script>
