<template>
  <div class="customer-manager tab-wrapper tab-wrapper-100">
    <keep-alive>
      <component v-bind:is="component"></component>
    </keep-alive>
  </div>
</template>
<script>
import all from './all' // 全部
import arrive from './arrive' // 到达付
import abnormal from './abnormal' // 异动
import cash from './cash' // 现付
import receipt from './receipt' // 回单付
import month from './month' // 月结
import handleFee from './handleFee' // 操作费

export default {
  name: 'accountsLoadReceivable',
  components: {
    all,
    arrive,
    abnormal,
    cash,
    receipt,
    month,
    handleFee
  },
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  mounted(){
    console.log('mountedmountedmounted')
  },
  data () {
    return{
      pageNameList: {
        all: '全部核销',
        month: '月结核销',
        abnormal: '异动费用核销',
        receipt: '回单付将诶算',
        cash: '现付核销',
        arrive: '到付核销',
        handleFee: '操作费核销'
      }
    }
  },
  computed: {
    parentPage() {
      return this.$route.query.currentPage
    },
    component() {
      return this.$route.query.currentPage
    }
  }
}

</script>
