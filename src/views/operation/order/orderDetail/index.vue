<template>
  <div class="orderinfo-manager" v-loading="loading">
    <el-tabs type="border-card" value="one" :before-leave="canViewOther">
      <el-tab-pane name="one" label="运单信息">
        <orderdetail :orderdata="orderdata" :feeconfig="feeconfig" />
      </el-tab-pane>
      <el-tab-pane name="two" label="费用信息">
        <fee orderid="output.orderid" />
      </el-tab-pane>
      <el-tab-pane name="three" label="运单跟踪">
        <ordertrack orderid="output.orderid" />
      </el-tab-pane>
      <el-tab-pane name="four" label="异常记录">
        <abnormal orderid="output.orderid" />
      </el-tab-pane>
      <el-tab-pane name="five" label="改单日志">
        <log orderid="output.orderid" />
      </el-tab-pane>
  </el-tabs>
  </div>
</template>

<script>
// 请求接口
import orderManage from '@/api/operation/orderManage'

import orderdetail from './main'
import fee from './fee'
import ordertrack from './track'
import abnormal from './abnormal'
import log from './log'

export default {
  // 当作为弹窗时使用
  props: {
    orderid: [String, Number]
  },
  components: {
    orderdetail,
    fee,
    ordertrack,
    abnormal,
    log
  },
  watch: {
    '$route'(to, from){
      if(to.path.indexOf('/operation/order/orderDetail') !== -1){
        // 当前页面为弹窗时，不响应链接变化
        if(!this.orderid){
          this.init()
        }
      }
    }
  },
  mounted(){
    this.init()
  },
  data() {
    return {
      loading: false,
      canview: true,
      dataCache: {},
      orderdata: {},
      feeconfig: {},
      output: {
        orderid: ''
      }
    }
  },
  methods: {
    // 获取货物设置
    getCargoSetting(){
      if(this.dataCache['cargoSeting']){
        return Promise.resolve(this.dataCache['cargoSeting'])
      } else {
        return orderManage.getCargoSetting(this.otherinfo.orgid).then(data => {
          this.dataCache['cargoSeting'] = data
          return data
        })
      }
    },
    // 获取基本设置信息
    getBaseSetting(){
      return this.getCargoSetting().then(data => {
        this.feeconfig = data

      })
    },
    // 获取运单数据
    getOrderInfo(orderId){
      return orderManage.getOrderInfoById(orderId)
    },
    init () {
      this.loading = true

      this.getBaseSetting().then(res => {
        let route = this.$route
        // 是否可以点击查看其它tab页
        this.canview = true
        if(this.orderid){
          // 在弹窗中访问
          this.output.orderid = this.orderid
          this.output.ispop = true
        } else if(route.query.orderid){
          // 在窗口访问
          this.output.orderid = this.$route.query.orderid
          this.output.iswindow = true
        } else {
          this.canview = false
          
          this.showError()
          return false
        }
        this.initOrder()
      }).catch(err => {
        this.$message.error('获取信息失败：' + err.text + ' 请尝试重新刷新页面。')
      })
    },
    showError() {
      this.$confirm('查无此运单信息：' + this.output.orderid, '提示', {
          confirmButtonText: '返回运单列表页',
          cancelButtonText: '关闭',
          type: 'warning'
        }).then(() => {
          this.eventBus.$emit('replaceCurrentView', '/operation/order/orderManage')
        }).catch(() => {
          if(this.output.iswindow){
            this.eventBus.$emit('closeCurrentView')
          } else {
            this.$emit('close')
          }
        })
    },
    initOrder () {
      this.getOrderInfo(this.output.orderid).then(res => {
        this.orderdata = res.data
        this.loading = false
      }).catch(err => {
        console.log('initOrderDetail err:', err)
        this.showError()
      })
    },
    // 当前运单是否有效且含有信息
    // 当无效时，禁止浏览后面的tab
    canViewOther(){
      // return false
      return this.canview
    }
  }
}
</script>
<style lang="scss">
  .orderinfo-manager{
    height: 100%;
    padding-top: 12px;
    .el-tabs{
      height: 100%;
      display: flex;
      flex-direction: column;

      .el-tabs__content{
        flex: 1;
        overflow: auto;
      }
    }
    
  }
</style>

