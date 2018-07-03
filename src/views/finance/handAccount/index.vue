<template>
  <div class="handAccount-manager tab-wrapper">
    <div class="eltab clearfix">
      <span @click="component = 'Total'" class="tab-label" :class="{'active-tab': component.indexOf('Total')!==-1}">员工交账汇总</span>
      <span @click="component = 'Detail'" class="tab-label" :class="{'active-tab': component.indexOf('Detail')!==-1}">员工交账明细</span>
    </div>
    <keep-alive>
      <component v-bind:is="component"></component>
    </keep-alive>
  </div>
</template>

<script>
import Total from './total'
import Detail from './detail'

export default {
  components: {
    Total,
    Detail
  },
  props: {
  },
  data() {
    return {
      component: 'Total'
    }
  }
}
</script>

