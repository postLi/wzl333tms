<template>
  <div class="payment-manager tab-wrapper">
    <div class="eltab clearfix">
      <router-link to="/finance/payment/recycle" tag="span" class="tab-label" :class="{'active-tab': component.indexOf('Recycle')!==-1}">货款回收</router-link>
      <router-link to="/finance/payment/send" tag="span" class="tab-label" :class="{'active-tab': component.indexOf('Send')!==-1}">货款汇款</router-link>
      <router-link to="/finance/payment/accept" tag="span" class="tab-label" :class="{'active-tab': component.indexOf('Accept')!==-1}">货款到账</router-link>
      <router-link to="/finance/payment/grant" tag="span" class="tab-label" :class="{'active-tab': component.indexOf('Grant')!==-1}">货款发放</router-link>
      <!--  <span @click="component = 'Recycle'" class="tab-label" :class="{'active-tab': component.indexOf('Recycle')!==-1}">货款回收</span>
        <span @click="component = 'Send'" class="tab-label" :class="{'active-tab': component.indexOf('Send')!==-1}">货款汇款</span>
        <span @click="component = 'Accept'" class="tab-label" :class="{'active-tab': component.indexOf('Accept')!==-1}">货款到账</span>
        <span @click="component = 'Grant'" class="tab-label" :class="{'active-tab': component.indexOf('Grant')!==-1}">货款发放</span> -->
    </div>
    <keep-alive>
      <router-view></router-view>
      <!-- <component v-bind:is="component"></component> -->
    </keep-alive>
  </div>
</template>
<script>
import Send from './send' // 寄出
import Recycle from './recycle' // 回收
import Grant from './grant' // 发放
import Accept from './accept' // 接收
// import Flow from './flow'
export default {
  name: 'financepayment',
  components: {
    Send,
    Recycle,
    Grant,
    Accept
  },
  mounted() {
    this.initPage()
  },
  data() {
    return {
      component: 'Recycle'
    }
  },
  watch: {
    $route(){
      if(this.$route.path.indexOf('/finance/payment/recycle')!==-1){
        this.component = 'Recycle'
      }
      if(this.$route.path.indexOf('/finance/payment/send')!==-1){
        this.component = 'Send'
      }
      if(this.$route.path.indexOf('/finance/payment/accept')!==-1){
        this.component = 'Accept'
      }
      if(this.$route.path.indexOf('/finance/payment/grant')!==-1){
        this.component = 'Grant'
      }
    }
  },
  methods: {
    initPage() {
      if (this.$route.query.name) {
        const name = this.$route.query.name
        switch (name) {
          case 'Recycle':
            this.component = 'Recycle'
            break
          case 'Send':
            this.component = 'Send'
            break
          case 'Accept':
            this.component = 'Accept'
            break
          case 'Grant':
            this.component = 'Grant'
            break
        }
      }
    }
  }
}

</script>
