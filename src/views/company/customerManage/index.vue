<template>
  <div class="customer-manager tab-wrapper">
    <div class="eltab clearfix">
      <router-link to="/company/customerManage/sender" tag="span" class="tab-label" :class="{'active-tab': component.indexOf('sender')!==-1}">发货人</router-link>
      <router-link to="/company/customerManage/receiver" tag="span" class="tab-label" :class="{'active-tab': component.indexOf('receiver')!==-1}">收货人</router-link>
      <!-- <span @click="component = 'Sender'" class="tab-label" :class="{'active-tab': component.indexOf('ender')!==-1}">发货人</span>
      <span @click="component = 'Receiver'" class="tab-label" :class="{'active-tab': component.indexOf('eceiver')!==-1}">收货人</span> -->
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
  name: 'customerManage',
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
      if(this.$route.path.indexOf('/company/customerManage/sender')!==-1){
        this.component = 'sender'
      }
      if(this.$route.path.indexOf('/company/customerManage/receiver')!==-1){
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

