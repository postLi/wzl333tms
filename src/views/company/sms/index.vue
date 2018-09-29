<template>
  <div class="sms-manager tab-wrapper">
    <div class="eltab clearfix">
      <router-link v-has:SMS_CUSTOMIZATION  to="/company/smsManage/customized" class="tab-label" >定制短信</router-link>
      <router-link v-has:SMS_BUY  to="/company/smsManage/buy" class="tab-label" >短信购买</router-link>
      <router-link v-has:SMS_RECORD  to="/company/smsManage/log" class="tab-label" >短信记录</router-link>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
export default {
  name: 'smsManage'
}
</script>
