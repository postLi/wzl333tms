<template>
  <div class="trackd-manager tab-wrapper">
    <div class="eltab clearfix">
      <!-- 在途跟踪 -->
      <router-link to="/operation/order/track/artery" class="tab-label" v-has:LOADTRACK1>干线跟踪</router-link>
      <router-link to="/operation/order/track/short" class="tab-label" v-has:LOADTRACK2>短驳跟踪</router-link>
      <router-link to="/operation/order/track/deliver" class="tab-label" v-has:LOADTRACK3>送货跟踪</router-link>
      <router-link to="/operation/order/track/transfer" class="tab-label" v-has:LOADTRACK4>中转跟踪</router-link>
      <router-link to="/operation/order/track/trucklog" class="tab-label" v-has:LOADTRACK5>车辆跟踪</router-link>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
export default {
  name: 'ordertrack',
  methods: {
    viewLog() {
      return location.href.indexOf('28tms.cn') === -1 && location.href.indexOf('192.168.1') !== -1
    }
  }
}

</script>
