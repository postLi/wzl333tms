
<template>
  <div class="pickup-manager tab-wrapper tab-wrapper-100">
  <keep-alive>
    <router-view ></router-view>
  </keep-alive>
</div>
</template>

<script>
// import Sender from './subjectInfo'

export default {
  name: 'orderpickUp',
  components: {

  },
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      component: ''
    }
  }
}
</script>

