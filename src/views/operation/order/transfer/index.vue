<template>
  <div class="order-manager tab-wrapper">
    <div class="eltab clearfix">
      <router-link to="/operation/order/transfer/transfered" tag="span" class="tab-label" :class="{'active-tab': component.indexOf('transfered')!==-1}">已中转运单</router-link>
      <router-link to="/operation/order/transfer/batch" tag="span" class="tab-label" :class="{'active-tab': component.indexOf('batch')!==-1}">中转批次</router-link>
      <!-- <span @click="component = 'transfered'" class="tab-label" :class="{'active-tab': component.indexOf('transfered')!==-1}">已中转运单</span>
      <span @click="component = 'batch'" class="tab-label" :class="{'active-tab': component.indexOf('batch')!==-1}">中转批次</span> -->
    </div>
    <keep-alive>
      <router-view></router-view>
      <!-- <component v-bind:is="component"></component> -->
    </keep-alive>
  </div>
</template>

<script>
import transfered from './transfered'
import batch from './batch'

export default {
  name: 'ordertransfer',
  components: {
    transfered,
    batch
  },
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    $route(){
      if(this.$route.path.indexOf('/operation/order/transfer/transfered')!==-1){
        this.component = 'transfered'
      }
      if(this.$route.path.indexOf('/operation/order/transfer/batch')!==-1){
        this.component = 'batch'
      }
    }
  },
  data() {
    return {
      component: 'transfered'
    }
  }
}
</script>

