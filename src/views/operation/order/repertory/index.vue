<template>
  <div class="repetory-manager tab-wrapper">
    <div class="eltab clearfix">
      <!-- 库存管理 -->
       <router-link to="/operation/order/repertory/allrepertory" tag="span"  class="tab-label" :class="{'active-tab': component.indexOf('allrepertory')!==-1}">库存总表</router-link>
      <router-link to="/operation/order/repertory/deliver" tag="span"  class="tab-label" :class="{'active-tab': component.indexOf('deliver')!==-1}">发货库存</router-link>
      <router-link to="/operation/order/repertory/arrival" tag="span"  class="tab-label" :class="{'active-tab': component.indexOf('arrival')!==-1}">到货库存</router-link>
      <!-- <span @click="component = 'allrepertory'" class="tab-label" :class="{'active-tab': component.indexOf('allrepertory')!==-1}">库存总表</span>
      <span @click="component = 'deliver'" class="tab-label" :class="{'active-tab': component.indexOf('deliver')!==-1}">发货库存</span>
      <span @click="component = 'arrival'" class="tab-label" :class="{'active-tab': component.indexOf('arrival')!==-1}">到货库存</span> -->
    </div>
    <keep-alive>
      <router-view></router-view>
      <!-- <component v-bind:is="component"></component> -->
    </keep-alive>
  </div>
</template>
<script>
import arrival from './arrival'
import deliver from './deliver'
import allrepertory from './allrepertory'
export default {
  name: 'orderrepertory',
  components: {
    allrepertory,
    deliver,
    arrival
  },
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    $route(){
      if(this.$route.path.indexOf('/operation/order/repertory/allrepertory')!==-1){
        this.component = 'allrepertory'
      }
      if(this.$route.path.indexOf('/operation/order/repertory/deliver')!==-1){
        this.component = 'deliver'
      }
      if(this.$route.path.indexOf('/operation/order/repertory/arrival')!==-1){
        this.component = 'arrival'
      }
    }
  },
  data() {
    return {
      component: 'allrepertory'
    }
  }
}

</script>
