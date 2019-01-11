<template>
  <!-- <div class="customer-manager tab-wrapper tab-wrapper-100"> -->
  <div class="tab-wrapper">
     <div class="eltab clearfix">
      <router-link to="/operation/order/arteryDelivery/sender" class="tab-label">干线到货</router-link>
      <router-link to="/operation/order/arteryDelivery/channel" class="tab-label" >途径卸货</router-link>
    </div>
     <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'arteryDelivery',
   methods: {
    visitedViews() {
      console.log('visitedViews : ', this.$store.state.tagsView.visitedViews)
      return this.$store.state.tagsView.visitedViews
    }
  },
  activated() {
    this.visitedViews()
  }
}
</script>
