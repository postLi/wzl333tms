<template>
  <div class="orderinfo-manager" v-loading="loading">
    <el-tabs type="border-card" v-model="activeIndex" :before-leave="canViewOther" @tab-click="setTabShow">
      <el-tab-pane class="ordermaininfo" name="one" label="运单信息">
        <orderdetail :orderid="orderid" :orderdata="orderdata" />
      </el-tab-pane>
      <el-tab-pane name="two" label="费用信息">
        <fee :orderid="output.orderid" v-if="activeTab.two" />
      </el-tab-pane>
      <el-tab-pane name="three" label="运单跟踪">
        <ordertrack v-if="activeTab.three" :orderid="output.orderid" />
      </el-tab-pane>
      <el-tab-pane name="six" label="运单轨迹">
        <trunk v-if="activeTab.six" :orderdata="orderdata" :orderid="output.orderid" />
      </el-tab-pane>
      <el-tab-pane v-if="viewLog()" name="seven" label="行车轨迹">
        <trunkLog v-if="activeTab.seven" :orderdata="orderdata" :orderid="output.orderid" />
      </el-tab-pane>
      <el-tab-pane name="four" label="异常记录">
        <abnormal :orderinfo="orderdata" v-if="activeTab.four" :shipsn="output.shipsn" :orderid="output.orderid" />
      </el-tab-pane>
      <el-tab-pane name="five" label="改单日志">
        <log v-if="activeTab.five" :orderid="output.orderid" />
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
import trunk from './trunk'
import trunkLog from './trunkLog'

export default {
  name: 'orderDetail',
  // 当作为弹窗时使用
  props: {
    orderid: {
      type: [String, Number],
      default: ''
    },
    ispop: {
      type: Boolean,
      default: false
    }
  },
  components: {
    orderdetail,
    fee,
    ordertrack,
    abnormal,
    log,
    trunk,
    trunkLog
  },
  watch: {

    ispop(newVal) {
      if (newVal) {
        // this.init()
      }
    },
    '$route' (to, from) {
      if (to.path.indexOf('/operation/order/orderDetail') !== -1) {
        // 当前页面为弹窗时，不响应链接变化
        if (!this.orderid) {
          this.init()
        }
      }
    },
    orderid: {
      handler(newVal) {
        if (newVal) {
          this.init()
        }
      },
      immediate: true
    }
  },
  activated() {
    if (!this.isInit) {
      this.init()
    }
  },
  mounted() {
    // if (this.ispop) {
    // this.init()
    // }
  },
  data() {
    return {
      loading: false,
      canview: true,
      dataCache: {},
      orderdata: {},
      activeIndex: 'one',
      activeTab: {
        'two': false,
        'three': false,
        'four': false,
        'five': false,
        'six': false,
        'seven': false
      },
      output: {
        orderid: '',
        shipsn: ''
      },
      isInit: false
    }
  },
  methods: {
    viewLog(){
      return location.href.indexOf('28tms.cn')===-1
    },
    // 获取运单数据
    getOrderInfo(orderId) {
      return orderManage.getOrderInfoById(orderId)
    },
    setTabShow(tab) {
      this.activeTab[tab.name] = true
    },
    init() {
      this.isInit = true
      this.loading = true

      const route = this.$route
      // 是否可以点击查看其它tab页
      this.canview = true

      if (this.ispop) {
        // 在弹窗中访问
        this.output.orderid = this.orderid
        this.output.ispop = true
      } else {
        // 在窗口访问
        this.output.orderid = this.$route.query.orderid || ''
        this.output.iswindow = true
      }
      // 如果没有运单id信息
      if (!this.output.orderid) {
        this.canview = false
        this.showError()
        return false
      }
      console.log('initOrderDetail err:', route)
      this.initindex = 0
      this.initOrder()
    },
    showError() {
      this.$confirm('查无此运单信息：' + this.output.orderid, '提示', {
        confirmButtonText: '返回运单列表页',
        cancelButtonText: '关闭',
        type: 'warning'
      }).then(() => {
        this.eventBus.$emit('replaceCurrentView', '/operation/order/orderManage/All')
      }).catch(() => {
        if (this.output.iswindow) {
          this.eventBus.$emit('closeCurrentView')
        } else {
          this.eventBus.$emit('hideOrderDetail')
        }
      })
    },
    initOrder() {
      this.activeIndex = 'one'
      this.initindex++
        // setTimeout(() => {
        this.getOrderInfo(this.output.orderid).then(res => {
          if (!res.data) {
            if (this.initindex > 3) {
              this.$message.alert('获取信息失败，请尝试刷新页面。')
            } else {
              this.initOrder()
            }
          } else {
            this.initindex = 0
            this.orderdata = res.data
            this.output.shipsn = this.orderdata.tmsOrderShipInfo.shipSn
            this.loading = false
            console.log('initOrder', res, this.orderid, this.orderdata)
            this.$nextTick(() => {
              this.eventBus.$emit('startPrint')
            })
          }
        }).catch(err => {
          this.loading = false
          console.log('initOrderDetail err:', err)
          this.showError()
        })
      // }, 10000)
    },
    // 当前运单是否有效且含有信息
    // 当无效时，禁止浏览后面的tab
    canViewOther() {
      // return false
      return this.canview
    }
  }
}

</script>
<style lang="scss">
.orderinfo-manager {
  height: 100%;
  padding-top: 12px;
  .el-tabs {
    height: 100%;
    display: flex;
    flex-direction: column;

    .el-tabs__content {
      flex: 1;
      overflow: auto;
    }
    .el-tab-pane {
      height: 100%;
      &>div {
        height: 100%;
      }
    }
  }
}

</style>
