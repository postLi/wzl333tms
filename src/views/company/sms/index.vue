<template>
  <div class="sms-manager tab-wrapper">
    <div class="eltab clearfix">
      <router-link  to="/company/smsManage/customized" class="tab-label" >定制短信</router-link>
      <router-link  to="/company/smsManage/buy" class="tab-label" >短信购买</router-link>
      <router-link  to="/company/smsManage/log" class="tab-label" >短信记录</router-link>
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
