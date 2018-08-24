<template>
  <div class="sign-manager tab-wrapper">
    <div class="eltab clearfix">
       <router-link to="/operation/order/sign/Pick" tag="span"  class="tab-label" :class="{'active-tab': component.indexOf('Pick')!==-1}">自提签收</router-link>
      <router-link to="/operation/order/sign/Delivery" tag="span"  class="tab-label" :class="{'active-tab': component.indexOf('Delivery')!==-1}">送货签收</router-link>
       <router-link to="/operation/order/sign/Transfer" tag="span"  class="tab-label" :class="{'active-tab': component.indexOf('Transfer')!==-1}">中转签收</router-link>
        <!-- <span @click="component = 'Pick'" class="tab-label" :class="{'active-tab': component.indexOf('Pick')!==-1}">自提签收</span>
        <span @click="component = 'Delivery'" class="tab-label" :class="{'active-tab': component.indexOf('Delivery')!==-1}">送货签收</span>
        <span @click="component = 'Transfer'" class="tab-label" :class="{'active-tab': component.indexOf('Transfer')!==-1}">中转签收</span> -->
    </div>
    <keep-alive>
      <router-view></router-view>
        <!-- <component v-bind:is="component"></component> -->
    </keep-alive>
  </div>
  
</template>

<script>
import Pick from './pick'// 自提签收
import Delivery from './delivery'// 送货签收
import Transfer from './transfer'// 中转签收

// import Flow from './flow'
export default {
  name: 'ordersign',
  components: {
    Pick,
    Delivery,
    Transfer

  },
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  computed: {

  },
  watch: {
    $route(){
      if(this.$route.path.indexOf('/operation/order/sign/Pick')!==-1){
        this.component = 'Pick'
      }
      if(this.$route.path.indexOf('/operation/order/sign/Delivery')!==-1){
        this.component = 'Delivery'
      }
      if(this.$route.path.indexOf('/operation/order/sign/Transfer')!==-1){
        this.component = 'Transfer'
      }
    }
  },
  mounted() {
        // this.searchQuery.vo.orgid = this.otherinfo.orgid
            // this.fetchAllCustomer(this.otherinfo.orgid).then(res => {
                // this.loading = false
            // })
  },
  data() {
    return {
      btnsize: 'mini',
      component: 'Pick'
    }
  },
  methods: {
  }

}
</script>
