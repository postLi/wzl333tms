<template>
  <div class="trackd-manager tab-wrapper">
    <div class="eltab clearfix">
      <!-- 在途跟踪 -->
      <router-link to="/operation/order/track/artery" tag="span" class="tab-label" :class="{'active-tab': component.indexOf('artery')!==-1}">干线跟踪</router-link>
      <router-link to="/operation/order/track/short" tag="span" class="tab-label" :class="{'active-tab': component.indexOf('short')!==-1}">短驳跟踪</router-link>
      <router-link to="/operation/order/track/deliver" tag="span" class="tab-label" :class="{'active-tab': component.indexOf('deliver')!==-1}">送货跟踪</router-link>
      <router-link to="/operation/order/track/transfer" tag="span" class="tab-label" :class="{'active-tab': component.indexOf('transfer')!==-1}">中转跟踪</router-link>
      <!--  <span @click="component = 'artery'" class="tab-label" 
      :class="{'active-tab': component.indexOf('artery')!==-1}">干线跟踪</span>
      <span @click="component = 'short'" class="tab-label" 
      :class="{'active-tab': component.indexOf('short')!==-1}">短驳跟踪</span>
      <span @click="component = 'deliver'" class="tab-label" 
      :class="{'active-tab': component.indexOf('deliver')!==-1}">送货跟踪</span>
      <span @click="component = 'transfer'" class="tab-label" 
      :class="{'active-tab': component.indexOf('transfer')!==-1}">中转跟踪</span> -->
    </div>
    <keep-alive>
      <router-view></router-view>
      <!-- <component v-bind:is="component"></component> -->
    </keep-alive>
  </div>
</template>
<script>
import artery from './artery'
import short from './short'
import deliver from './deliver'
import transfer from './transfer'
export default {
  name: 'ordertrack',
  components: {
    artery,
    short,
    deliver,
    transfer
  },
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      component: 'artery'
    }
  },
  activated() {
    this.isTransfer()
  },
  watch: {
    $route(){
      if(this.$route.path.indexOf('/operation/order/track/artery')!==-1){
        this.component = 'artery'
      }
      if(this.$route.path.indexOf('/operation/order/track/short')!==-1){
        this.component = 'short'
      }
      if(this.$route.path.indexOf('/operation/order/track/deliver')!==-1){
        this.component = 'deliver'
      }
      if(this.$route.path.indexOf('/operation/order/track/transfer')!==-1){
        this.component = 'transfer'
      }
    }
  },
  methods: {
    isTransfer() {
      if (this.$route.query.transfer) {
        this.component = 'transfer'
      } else {
        this.component = 'artery'
      }
      console.log(this.component, 'component')
    }
  }
}

</script>
