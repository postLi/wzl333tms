<template>
  <div>
    <!-- 配载率 -->
    <el-dialog title="配载率提示" :isShow="popVisible" :visible.sync="popVisible" @close="closeMe" v-loading="loading" :before-close="closeMe" width="50%" :close-on-click-modal="false" center>
      <el-row>
        <el-col :span="12">
          <div :class="className" :id="idWeigth" :style="{height:height,width:width, margin: '0 auto'}" ref="echartWeight" ></div>
        </el-col>
        <el-col :span="12">
          <div :class="className" :id="idVolume" :style="{height:height,width:width, margin: '0 auto'}" ref="echartVolume"></div>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
    <el-button @click="closeMe">取 消</el-button>
  </span>
    </el-dialog>
  </div>
</template>
<script>
import { objectMerge2 } from '@/utils/index'
export default {
  props: {
    info: { // 表格里面的数据
      type: Array,
      default: []
    },
    truckInfo: { // 顶部基本信息里面的数据
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
      default: '300px'
    },
    height: {
      type: String,
      default: '300px'
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
    info(newVal) {
      // if (newVal) {
      //   return newVal
      // } else {
      //   return this.$options.data().baseInfo
      // }
    },
    truckInfo: {
      handler() {
        this.baseInfo.totalWeight = Number(this.truckInfo.truckLoad) || 0
        this.baseInfo.totalVolume = Number(this.truckInfo.truckVolume) || 0
      },
      deep: true
    },
    popVisible() {
      if (this.popVisible) {
        this.$nextTick(() => {
          if (this.baseInfo.totalWeight || this.baseInfo.weight) {
            this.initChart()
          } else {
            this.baseInfo = objectMerge2({}, this.$options.data().baseInfo)
            this.initChart()
          }
        })
      }
    }
  },
  methods: {
    initData() {
      if (this.popVisible) {
        this.baseInfo.weight = 0
        this.baseInfo.volume = 0
        this.info.forEach(e => {
          this.baseInfo.weight += Number(e.loadWeight)
          this.baseInfo.volume += Number(e.loadVolume)
        })
      }
    },
    initChart() {
      this.initData()
      this.initChartWeight()
      this.initChartVolume()
    },
    initChartWeight() {
      const surweight = this.baseInfo.totalWeight - this.baseInfo.weight
      this.baseInfo.surplusWeight = surweight
      if (this.popVisible) {
        this.chart = this.$echarts.init(this.$refs.echartWeight)
        this.chart.setOption({
          title: {
            text: '总载重: ' + this.baseInfo.totalWeight,
            subtext: '单位：千克',
            subtextStyle: {
              fontSize: 14,
              color: '#666666'
            },
            x: 'center',
            bottom: '0px'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          series: [{
            name: '总载重',
            type: 'pie',
            radius: '40%',
            label: {
              normal: {
                show: true,
                formatter: '{b}:\n\n{c}千克\n\n{d}%',
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
        this.chart = this.$echarts.init(this.$refs.echartVolume)
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
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          series: [{
            name: '总载立方',
            type: 'pie',
            radius: '40%',
            label: {
              normal: {
                show: true,
                formatter: '{b}:\n\n{c}方\n\n{d}%',
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
