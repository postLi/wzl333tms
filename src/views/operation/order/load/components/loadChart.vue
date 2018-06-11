<template>
  <div>
    <!-- 配载率 -->
    <!--  <pop-right title="配载率提示" :isShow="popVisible" @close="closeMe" class="addDriverPop" v-loading="loading">
      <template class="addDriverPop-content" slot="content">
        {{baseInfo}}
      </template>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeMe">关 闭</el-button>
      </div>
    </pop-right> -->
    <el-dialog title="配载率提示" :isShow="popVisible" :visible.sync="popVisible" @close="closeMe" class="addDriverPop" v-loading="loading" :before-close="closeMe" width="80%">
      {{baseInfo}}
      <el-row>
        <el-col :span="12">
          <!-- <div :class="className" :id="id" :style="{height:height,width:width}" ref="echartWeight"></div> -->
        </el-col>
        <el-col :span="12">
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
    <el-button @click="closeMe">取 消</el-button>
  </span>
    </el-dialog>
  </div>
</template>
<script>
// import popRight from '@/components/PopRight/index'
import echarts from 'echarts'
export default {
  props: {
    info: {
      type: Array,
      default: () => {}
    },
    truckInfo: {
      type: Object,
      default: () => {}
    },
    popVisible: {
      type: Boolean,
      default: false
    },
    className: {
      type: String,
      default: 'yourClassName'
    },
    id: {
      type: String,
      default: 'yourId'
    },
    width: {
      type: String,
      default: '500px'
    },
    height: {
      type: String,
      default: '300px'
    }
  },
  // components: {
  //   popRight
  // },
  data() {
    return {
      loading: false,
      baseInfo: {
        totalWeight: 0, // 总载重
        weight: 0, // 已配载-重量
        surplusWeight: 0, // 可配载
        totalVolume: 0, // 总载立方
        volume: 0, // 已配载-立方
        surplusVolume: 0 // 可配载
      }
    }
  },
  watch: {
    info() {
      let data = Object.assign([], this.info)
      let countWeigth = 0
      let countVolume = 0
      data.forEach(e => {
        countWeigth += e.loadWeight
        countVolume += e.loadVolume
      })
      this.baseInfo.weight = Number(countWeigth)
      this.baseInfo.volume = Number(countVolume)
    },
    truckInfo() {
      let data = Object.assign({}, this.truckInfo)
      this.$nextTick(() => {
        if (this.notNull(this.baseInfo.totalWeight) || this.notNull(this.baseInfo.totalVolume)) {
          this.baseInfo.totalWeight = 0
          this.baseInfo.totalVolume = 0
        } else {
          this.baseInfo.totalWeight = Number(data.truckLoad)
          this.baseInfo.totalVolume = Number(data.truckVolume)
        }
      })
    }
  },
  computed: {
    setData() {
      return this.baseInfo
    }
  },
  mounted() {
    // this.initChartRegistered()
  },
  methods: {
    initChartRegistered() {
      this.chart = echarts.init(this.$refs.echartWeight)
      console.log(this.chart)
      // this.chart.showLoading()
      // this.chart.hideLoading()
      this.baseInfo.surplusWeight = this.baseInfo.totalWeight - this.baseInfo.weight
      this.baseInfo.surplusVolume = this.baseInfo.totalVolume - this.baseInfo.volume
      // this.chart.setOption({
      //   series: [{
      //     name: '访问来源',
      //     type: 'pie',
      //     radius: '55%',
      //     data: [
      //       { value: 235, name: '视频广告' },
      //       { value: 274, name: '联盟广告' },
      //       { value: 310, name: '邮件营销' },
      //       { value: 335, name: '直接访问' },
      //       { value: 400, name: '搜索引擎' }
      //     ]
      //   }]
      // })
      // this.chart.setOption({
      //   title: {
      //     text: '总载重',
      //     subtext: '总载重数:' + this.baseInfo.totalWeight,
      //     x: 'center'
      //   },
      //   legend: {
      //     orient: 'vertical',
      //     left: 'left',
      //     data: ['已配载', '可配载']
      //   },
      //   series: [{
      //     name: '注册信息',
      //     type: 'pie',
      //     radius: '60%',
      //     label: {
      //       normal: {
      //         show: true,
      //         formatter: '{b}\n\n{c}\n({d}%)',
      //         textStyle: {
      //           fontWeight: 'normal',
      //           fontSize: 16
      //         }
      //       }
      //     },
      //     data: [{
      //         value: this.baseInfo.weight,
      //         name: '已配载',
      //         itemStyle: {
      //           color: '#909399'
      //         }
      //       },
      //       {
      //         value: this.baseInfo.surplusWeight,
      //         name: '可配载',
      //         itemStyle: {
      //           color: '#666'
      //         }
      //       }
      //     ]
      //   }]
      // })
    },
    notNull(value) {
      if (value === '' || value === null || !value || value === undefined) {
        return true
      }
    },
    closeMe(done) {
      this.$emit('update:popVisible', false);
      if (typeof done === 'function') {
        done()
      }
    }
  }
}

</script>
