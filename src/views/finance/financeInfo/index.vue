<script
  src="../../../../../test/vue-element-admin-master/vue-element-admin-master/src/components/TreeTable/eval.js"></script>
<template>
  <div class="pickup-manager tab-wrapper tab-wrapper-100">
    <keep-alive>
      <component v-bind:is="component"></component>
    </keep-alive>
  </div>
</template>

<script>
import Sender from './financeInfo'

export default {
  name: 'orderpickUp',
  components: {
    Sender
  },
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      component: 'Sender'
    }
  }
}
</script>

