<template>
  <div class="dashboard-container">
    <div class="index-flow">
      <!-- 第一块 -->
      <div class="sendGroup">
        <h3 class="thetitle">发货网点</h3>
        <div class="flowitem send-tihuo">
          <i class="flowicon tihuo"></i>
          <p class="flowtitle">提货</p>
        </div>
        <div class="flowitem send-daoru">
          <i class="flowicon daoru"></i>
          <p class="flowtitle">运单导入</p>
        </div>
        <div class="flowitem send-kehu">
          <i class="flowicon kehu"></i>
          <p class="flowtitle">客户订单</p>
        </div>

        <div class="flowitem send-yundan">
          <i class="flowicon yundan"></i>
          <p class="flowtitle">正式运单</p>
        </div>

        <div class="flowitem send-waifa">
          <i class="flowicon waifa"></i>
          <p class="flowtitle">中转外发</p>
        </div>
        <div class="flowitem send-kucun">
          <i class="flowicon kucun"></i>
          <p class="flowtitle">发货库存</p>
        </div>
        <div class="flowitem send-duanbo">
          <i class="flowicon duanbo"></i>
          <p class="flowtitle">短驳接收</p>
        </div>

        <div class="flowitem send-fache">
          <i class="flowicon fache"></i>
          <p class="flowtitle">配载发车</p>
        </div>
      </div>
      <!-- 中间 -->
      <span class="flow-add-1">中转跟踪</span>
      <span class="flow-add-2">智能在途跟踪</span>
      <!-- 第二块 -->
      <div class="receiveGroup">
        <h3 class="thetitle">收货网点</h3>

        <div class="flowitem receive-daohuo">
          <i class="flowicon daohuo"></i>
          <p class="flowtitle">到车/到货</p>
        </div>

        <div class="flowitem receive-waifa">
          <i class="flowicon waifa"></i>
          <p class="flowtitle">中转外发</p>
        </div>
        <div class="flowitem receive-daohuokucun">
          <i class="flowicon daohuokucun"></i>
          <p class="flowtitle">到货库存</p>
        </div>
        <div class="flowitem receive-duanbofache">
          <i class="flowicon duanbofache"></i>
          <p class="flowtitle">短驳发车</p>
        </div>

        <div class="flowitem receive-ziti">
          <i class="flowicon ziti"></i>
          <p class="flowtitle">自提</p>
        </div>
        <div class="flowitem receive-songhuo">
          <i class="flowicon songhuo"></i>
          <p class="flowtitle">送货上门</p>
        </div>

        <div class="flowitem receive-qianshou">
          <i class="flowicon qianshou"></i>
          <p class="flowtitle">签收</p>
        </div>
      </div>
      <!-- 第三块 -->
      <div class="receiptGroup">
        <h3 class="thetitle">回单管理</h3>
        <div class="flowitem receipt-fafang">
          <i class="flowicon fafang"></i>
          <p class="flowtitle">回单发放</p>
        </div>
        <div class="flowitem receipt-jiehsou">
          <i class="flowicon jiehsou"></i>
          <p class="flowtitle">回单接收</p>
        </div>
        <div class="flowitem receipt-jichu">
          <i class="flowicon jichu"></i>
          <p class="flowtitle">回单寄出</p>
        </div>
        <div class="flowitem receipt-huishou">
          <i class="flowicon huishou"></i>
          <p class="flowtitle">回单回收</p>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'dashboard',

  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.index-flow{
  width: 1171px;
  height: 754px;
  margin: 53px auto 0;
  background: url("../../assets/flow/index.png") no-repeat;
}
.flowicon{
  
}
</style>
