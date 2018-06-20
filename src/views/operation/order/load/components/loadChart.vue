<template>
  <div>
    <!-- 配载率 -->
    <el-dialog title="配载率提示" :isShow="popVisible" :visible.sync="popVisible" @close="closeMe" class="addDriverPop" v-loading="loading" :before-close="closeMe" width="60%" 
    :close-on-click-modal="false" center>
      <el-row>
        <el-col :span="12">
          <div :class="className" :id="idWeigth" :style="{height:height,width:width}" ref="echartWeight"></div>
        </el-col>
        <el-col :span="12">
          <div :class="className" :id="idVolume" :style="{height:height,width:width}" ref="echartVolume"></div>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
    <el-button @click="closeMe">取 消</el-button>
  </span>
    </el-dialog>
  </div>
</template>
<script>
import echarts from 'echarts'
export default {
  props: {
    info: {
      type: Array,
      default: []
    },
    truckInfo: {
      type: Object,
      default: {}
    },
    popVisible: {
      type: Boolean,
      default: false
    },
    className: {
      type: String,
      default: 'yourClassName'
    },
    idWeigth: {
      type: String,
      default: 'idWeigth'
    },
    idVolume: {
      type: String,
      default: 'idVolume'
    },
    width: {
      type: String,
      default: '500px'
    },
    height: {
      type: String,
      default: '400px'
    }
  },
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
      },
      newInfo: {
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
      // let data = Object.assign([], this.info)
      let countWeigth = 0
      let countVolume = 0
      this.info.forEach(e => {
        countWeigth += e.loadWeight
        countVolume += e.loadVolume
      })
      this.baseInfo.weight = Number(countWeigth)
      this.baseInfo.volume = Number(countVolume)
      console.log('info')
    },
    truckInfo() {
      // let data = Object.assign({}, this.truckInfo)
      // this.$nextTick(() => {
        console.log('sdfsd')
        this.baseInfo.totalWeight = Number(this.truckInfo.truckLoad)
        this.baseInfo.totalVolume = Number(this.truckInfo.truckVolume)
      // })
    },
    popVisible() {
      if (this.popVisible) {
        this.$nextTick(() => {
          if (this.baseInfo.totalWeight || this.baseInfo.weight) {
            this.initChart()
          } else {
            this.baseInfo = Object.assign({},this.newInfo)
            this.initChart()
          }
        })
      }
    }
  },
  methods: {
    initChart() {
      this.initChartWeight()
      this.initChartVolume()
    },
    initChartWeight() {
      const surweight = this.baseInfo.totalWeight - this.baseInfo.weight
      this.baseInfo.surplusWeight = surweight
      console.log(this.baseInfo.surplusWeight)
      if (this.popVisible) {
        this.chart = echarts.init(this.$refs.echartWeight)
        this.chart.setOption({
          title: {
            text: '总载重: ' + this.baseInfo.totalWeight,
            subtext: '单位：吨',
            subtextStyle: {
              fontSize: 14,
              color: '#666666'
            },
            x: 'center',
            bottom: '0px'
          },
          series: [{
            name: '注册信息',
            type: 'pie',
            radius: '45%',
            label: {
              normal: {
                show: true,
                formatter: '{b} : {c}',
                textStyle: {
                  fontWeight: 'normal',
                  fontSize: 16,
                  color: '#666'
                }
              }
            },
            data: [{
                value: this.baseInfo.weight,
                name: '已配载',
                itemStyle: {
                  color: '#FFCC66'
                }
              },
              {
                value: this.baseInfo.surplusWeight,
                name: '可配载',
                itemStyle: {
                  color: '#79F7C1'
                }
              }
            ]
          }]
        })
      }
    },
    initChartVolume() {
      const survolume = this.baseInfo.totalVolume - this.baseInfo.volume
      this.baseInfo.surplusVolume = survolume
      if (this.popVisible) {
        this.chart = echarts.init(this.$refs.echartVolume)
        this.chart.setOption({
          title: {
            text: '总载立方: ' + this.baseInfo.totalVolume,
            subtext: '单位：方',
            subtextStyle: {
              fontSize: 14,
              color: '#666666'
            },
            x: 'center',
            bottom: '0px'
          },
          series: [{
            name: '注册信息',
            type: 'pie',
            radius: '45%',
            label: {
              normal: {
                show: true,
                formatter: '{b} : {c}',
                textStyle: {
                  fontWeight: 'normal',
                  fontSize: 16,
                  color: '#666'
                }
              }
            },
            data: [{
                value: this.baseInfo.volume,
                name: '已配载',
                itemStyle: {
                  color: '#FFCC66'
                }
              },
              {
                value: this.baseInfo.surplusVolume,
                name: '可配载',
                itemStyle: {
                  color: '#79F7C1'
                }
              }
            ]
          }]
        })
      }
    },
    notNull(value) {
      if (value === '' || value === null || !value || value === undefined) {
        return false
      }
    },
    closeMe(done) {
      this.$emit('update:popVisible', false)
      // if (typeof done === 'function') {
      //   done()
      // }
    }
  }
}

</script>
