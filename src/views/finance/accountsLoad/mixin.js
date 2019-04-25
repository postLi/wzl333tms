export default {
  activated() {
    // 先不做判断提示，如果是新的核销参数则更新，否则不更新
    if (this.lastquery !== JSON.stringify(this.$route.query)) {
      this.getRouteInfo = JSON.parse(this.$route.query.searchQuery)
      this.lastquery = JSON.stringify(this.$route.query)
      this.getList()
    }
  },
  data() {
    return {
      getRouteInfo: {}
    }
  },
  created() {
    this.getRouteInfo = JSON.parse(this.$route.query.searchQuery)
    this.searchQuery = Object.assign({}, this.getRouteInfo)
    this.lastquery = JSON.stringify(this.$route.query)
  }
}
