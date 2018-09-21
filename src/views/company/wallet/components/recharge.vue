<template>
  <el-dialog  width="520px" :title="popTitle" :visible="popVisible" :before-close="closeMe" custom-class='rechargePop' :close-on-click-modal="false" :close-on-press-escape="false" :center="true" v-loading="loading">
    <div class='rechargePop-content' >
      <div class="recharge-panel" v-if="showcharge">
        <div class="recharge-fee clearfix">
          <div class="recharge-label">充值金额</div>
          <div class="chargefee-list">
            <span class="charefee-opt" :class="{'select-opt': currentIndex===index}" @click="currentIndex = index"  v-for="(item,index) in feelist" :key="index">{{ item }} <i class="el-icon-circle-check"></i></span>
          </div>
          <div class="otherrecharge-fee clearfix">
            <span class="charefee-opt" @click="currentIndex = 555" :class="{'select-opt': currentIndex===555}">其它金额<i class="el-icon-circle-check"></i></span><input type="text" @focus="currentIndex=555" class="nativeinput" v-numberOnly:point v-model="otherfee" ref="otherinp" :maxlength="10" placeholder="注:每次充值至少1块钱" />
            <span class="otherfee-error" v-if="payerror">至少充值金额1块钱</span>
          </div>
        </div>
        <div class="recharge-payway">
          <div class="payway-title">支付方式</div>
          <div class="payway-list clearfix">
            <span @click="payway = 'wx'" :class="{'active': payway === 'wx'}" class="hyq-wx"></span>
            <span @click="payway = 'ali'" :class="{'active': payway === 'ali'}" class="hyq-ali"></span>
          </div>
        </div>
        <el-button type="primary" @click="submitForm">充值</el-button>
      </div>
      <div class="twocode-panel" v-else>
        <div class="hyq-pay-twocode">
          <div class="hyq-tc-title">使用{{paywayname}}扫一扫付款</div>
          <div class="hyq-tc-box">
            <img :src="tcurl" v-if="tcurl" class="hyq-tc-img">
          </div>
          <div class="hyq-pay-success" v-if="paysuccess">充值成功</div>
          <div class="hyq-pay-fail" v-if="payfail">充值失败{{errmsg}}</div>
        </div>
      </div>
      
    </div>
  </el-dialog>
</template>
<script>
import PopFrame from '@/components/PopFrame/index'
import * as walletApi from '@/api/company/wallet'
import { getSelectType } from '@/api/common'
import QRCode from 'qrcode'

export default {
  props: {
    popVisible: {
      type: Boolean,
      default: false
    }
  },
  components: {
    PopFrame
  },
  data() {
    return {
      loading: false,
      popTitle: '充值详情',
      otherfee: '',
      feelist: [],
      payerror: false,
      errmsg: '',
      paysuccess: false,
      payfail: false,
      payway: '',
      tcurl: 'http://192.168.1.188:125/tms20180912/%E9%92%B1%E5%8C%85%EF%BC%8C%E7%9F%AD%E4%BF%A1/images/%E5%85%85%E5%80%BC/u5601.png',
      showcharge: true,
      currentIndex: 0
    }
  },
  mounted() {
    this.loading = true
    getSelectType('pay_money', this.otherinfo.orgid).then(data => {
      this.loading = false
      this.feelist = data.map(el => el.dictName).reverse()
    }).catch((err) => {
      this.loading = false
      this.$message.error(err.errorInfo || err.text || '未知错误，请重试~')
    })
  },
  destroyed() {
    clearTimeout(this.timer)
  },
  computed: {
    paywayname() {
      const mapobj = {
        wx: '微信',
        ali: '支付宝'
      }
      return mapobj[this.payway] ||
      ''
    }
  },
  watch: {
    currentIndex(newVal) {
      if (newVal === 555) {
        this.$refs.otherinp.focus()
      } else {
        this.otherfee = ''
        this.payerror = false
      }
    },
    otherfee(newVal) {
      if (this.currentIndex === 555 && newVal) {
        const val = parseFloat(newVal, 10)
        this.payerror = val < 1
      }
    }
  },
  methods: {
    reset() {
      this.popTitle = '充值详情'
      this.otherfee = ''
      this.payerror = false
      this.errmsg = ''
      this.paysuccess = false
      this.payfail = false
      this.payway = ''
      this.tcurl = ''
      this.showcharge = true
      this.currentIndex = ''
    },
    closeMe(done) {
      if (!this.showcharge) {
        this.showcharge = true
        clearTimeout(this.timer)
        return
      }
      this.$emit('close')
      this.$emit('update:popVisible', false)
      this.reset()
          // this.$refs['ruleForm'].resetFields()
      if (typeof done === 'function') {
        done()
      }
    },
    submitForm() {
      if (this.currentIndex === '') {
        this.$message.error('需要选择充值金额。')
        return false
      }
      if (this.currentIndex === 555 && (!this.otherfee || this.payerror)) {
        this.$message.error('请填写有效的金额。')
        return false
      }
      if (this.payway === '') {
        this.$message.error('请选择支付方式。')
        return false
      }
      const data = {}
      // 获取充值金额
      if (this.currentIndex !== 555) {
        data.fee = this.feelist[this.currentIndex]
      } else {
        data.fee = this.otherfee
      }
      // 获取支付方式
      data.type = this.payway

      data.companyId = this.otherinfo.companyId

      // 1.获取交易id
      // 2.生成二维码
      // 2.1 生成成功，跳转到二维码页面
      // 2.2 生成失败，提示错误信息
      let pro
      if (data.type === 'ali') {
        pro = walletApi.getAliPayTwocode(data)
      } else {
        pro = walletApi.getWeixinPayTwocode(data)
      }
      pro.then(res => {
        if (res.data) {
          this.id = res.text
          this.showcharge = false
          // this.tcurl = res.data
          // 根据支付链接生成二维码
          QRCode.toDataURL(res.data, {
            rendererOpts: {
              margin: 0
            }
          }).then(url => {
            this.tcurl = url
            this.startPay()
          })
        }
      }).catch(err => {
        console.log('err', err)
        this.$message.error(err.errorInfo || err.text || '未知错误，请重试~')
      })
    },
    // 开始轮询获取支付结果
    startPay() {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        if (this.payway === 'wx') {
          walletApi.getWXTradeResult(this.id).then(res => {
            if (res.text === '未支付') {
              this.startPay()
            }
          }).catch(err => {
            this.startPay()
          })
        } else {
          walletApi.getAliTradeResult(this.id).then(res => {
            if (res.text === '未支付') {
              this.startPay()
            }
          }).catch(err => {
            this.startPay()
          })
        }
      }, 3000)
    }
  }
}
</script>
<style lang="scss">
.rechargePop{
  height: 404px;
  top: 50%;
  margin-top: -202px !important;

  .el-dialog__header{
    border-bottom: 1px solid #ccc;
  }
  .recharge-panel{
    .recharge-fee{
      padding-left: 4em;
      margin-bottom: 10px;
    }
    .recharge-label{
      float: left;
      width: 4em;
      margin-left: -4em;
      line-height: 26px;
    }
    .chargefee-list{
      text-align: justify;
    }
    .nativeinput{
      height: 30px;
      width: 328px;
      border: 1px solid #c9c9c9;
      border-left: none;
    }
    .otherrecharge-fee{
      position: relative;
      .charefee-opt{
        float: left;
        vertical-align: middle;
      }
    }
    .otherfee-error{
      position: absolute;
      bottom: -12.5px;
      left: 86px;
      font-size: 12px;
      color: #ef0000;
    }
    .charefee-opt{
      position: relative;
      display: inline-block;
      width: 70px;
      height: 30px;
      border: 1px solid #C9C9C9;
      text-align: center;
      line-height: 30px;
      margin-left: 12px;
      margin-bottom: 6px;
      overflow: hidden;
      cursor: pointer;

      i{
        display: none;
        position: absolute;
        top: -2px;
        right:-2px;
        font-size: 10px;
      }
      &:hover{
        border-color: #0099FF;
      }
      &.select-opt{
        border-color: #0099FF;
        color: #0099FF;
        cursor: default;
        i{
          display: block;
        }
      }
    }
    .payway-title{
      margin-bottom: 10px;
    }
    .recharge-payway{
      padding-bottom: 25px;
      border-bottom: 1px solid #ccc;
      margin-bottom: 35px;
    }
    .el-button{
      width: 100%;
      display: block;
      font-size: 24px;
      letter-spacing:20px;
    }
  }
  .payway-list{
  }
  .payway-list span{
    display: inline-block;
    width: 170px;
    height: 56px;
    border: 1px solid #ccc;
    cursor: pointer;
    &.active{
      border-color:#F3978F;
      cursor: default;
    }
  }
  .hyq-wx{
    float: left;
    background: url(../../../../assets/weipay.png);
  }
  .hyq-ali{
    float: right;
    background: url(../../../../assets/alipay.png);
  }
  .twocode-panel{
    text-align: center;
    padding-top: 10px;
    .hyq-tc-title{
      margin-bottom: 10px;
    }
    .hyq-tc-box{
      width: 220px;
      height: 220px;
      border: 1px solid #56AC65;
      margin: 10px auto;
    }
    img{
      width: 100%;
      height: 100%;
    }
    .hyq-pay-success{
      color: darkgreen;
      font-weight: bold;
    }
    .hyq-pay-fail{
      color: darkred;
      font-weight: bold;
    }
  }
}
</style>

