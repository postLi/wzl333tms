<template>
  <div class="accountsReceivable-manager tab-wrapper">
    <div class="eltab clearfix">
      <router-link to="/finance/accountsReceivable/all" tag="span" class="tab-label" :class="{'active-tab': component.indexOf('All')!==-1}">全部</router-link>
      <router-link to="/finance/accountsReceivable/cash" tag="span" class="tab-label" :class="{'active-tab': component.indexOf('Cash')!==-1}">现付</router-link>
      <router-link to="/finance/accountsReceivable/arrive" tag="span" class="tab-label" :class="{'active-tab': component.indexOf('Arrive')!==-1}">到付</router-link>
      <router-link to="/finance/accountsReceivable/receipt" tag="span" class="tab-label" :class="{'active-tab': component.indexOf('Receipt')!==-1}">回单付</router-link>
      <router-link to="/finance/accountsReceivable/month" tag="span" class="tab-label" :class="{'active-tab': component.indexOf('Month')!==-1}">月结</router-link>
      <router-link to="/finance/accountsReceivable/abnormal" tag="span" class="tab-label" :class="{'active-tab': component.indexOf('Abnormal')!==-1}">异动费用</router-link>
      <!-- <span @click="component = 'All'" class="tab-label" :class="{'active-tab': component.indexOf('All')!==-1}">全部</span>
      <span @click="component = 'Cash'" class="tab-label" :class="{'active-tab': component.indexOf('Cash')!==-1}">现付</span>
      <span @click="component = 'Arrive'" class="tab-label" :class="{'active-tab': component.indexOf('Arrive')!==-1}">到付</span>
      <span @click="component = 'Receipt'" class="tab-label" :class="{'active-tab': component.indexOf('Receipt')!==-1}">回单付</span>
      <span @click="component = 'Month'" class="tab-label" :class="{'active-tab': component.indexOf('Month')!==-1}">月结</span>
      <span @click="component = 'Abnormal'" class="tab-label" :class="{'active-tab': component.indexOf('Abnormal')!==-1}">异动费用</span> -->
    </div>
    <keep-alive>
      <router-view></router-view>
      <!-- <component v-bind:is="component"></component> -->
    </keep-alive>
  </div>
</template>

<script>
import All from './all'
import Cash from './cash'
import Arrive from './arrive'
import Receipt from './receipt'
import Month from './month'
import Abnormal from './abnormal'

export default {
  name: 'accountsReceivable',
  components: {
    All,
    Cash,
    Arrive,
    Receipt,
    Month,
    Abnormal
  },
  props: {
  },
  mounted() {
    this.initPage()
  },
  data() {
    return {
      component: 'All'
    }
  },
  watch: {
    $route(){
      if(this.$route.path.indexOf('/finance/accountsReceivable/all')!==-1){
        this.component = 'All'
      }
      if(this.$route.path.indexOf('/finance/accountsReceivable/cash')!==-1){
        this.component = 'Cash'
      }
      if(this.$route.path.indexOf('/finance/accountsReceivable/arrive')!==-1){
        this.component = 'Arrive'
      }
      if(this.$route.path.indexOf('/finance/accountsReceivable/receipt')!==-1){
        this.component = 'Receipt'
      }
      if(this.$route.path.indexOf('/finance/accountsReceivable/month')!==-1){
        this.component = 'Month'
      }
      if(this.$route.path.indexOf('/finance/accountsReceivable/abnormal')!==-1){
        this.component = 'Abnormal'
      }
    }
  },
  methods: {
    initPage() {
      if (this.$route.query.name) {
        const name = this.$route.query.name
        switch (name) {
          case 'Cash':
            this.component = 'Cash'
            break
          case 'Arrive':
            this.component = 'Arrive'
            break
          case 'Receipt':
            this.component = 'Receipt'
            break
          case 'Month':
            this.component = 'Month'
            break
          case 'Abnormal':
            this.component = 'Abnormal'
        }
      }
    }
  }
}
</script>

