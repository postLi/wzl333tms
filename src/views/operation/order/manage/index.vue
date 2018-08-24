<template>
  <div class="customer-manager tab-wrapper">
    <div class="eltab clearfix">
      <router-link to="/operation/order/manage/sender" tag="span"  class="tab-label" :class="{'active-tab': component.indexOf('sender')!==-1}">客服订单</router-link>
      <router-link to="/operation/order/manage/receiver" tag="span"  class="tab-label" :class="{'active-tab': component.indexOf('receiver')!==-1}">运单导入</router-link>
     <!--  <span @click="component = 'Sender'" class="tab-label" :class="{'active-tab': component.indexOf('ender')!==-1}">客服订单</span>
      <span @click="component = 'Receiver'" class="tab-label" :class="{'active-tab': component.indexOf('eceiver')!==-1}">运单导入</span> -->
    </div>
    <keep-alive>
      <router-view></router-view>
      <!-- <component v-bind:is="component"></component> -->
    </keep-alive>
  </div>
</template>

<script>
import Sender from './sender'
import Receiver from './receiver'

export default {
  name: 'ordermanage',
  components: {
    Sender,
    Receiver
  },
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    $route(){
      if(this.$route.path.indexOf('/operation/order/manage/sender')!==-1){
        this.component = 'sender'
      }
      if(this.$route.path.indexOf('/operation/order/manage/receiver')!==-1){
        this.component = 'receiver'
      }
    }
  },
  data() {
    return {
      component: 'sender'
    }
  }
}
</script>

