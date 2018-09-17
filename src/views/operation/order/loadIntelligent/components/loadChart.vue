<template>
  <div class="loadChart_wrapper">
    <!-- 配载率 -->
    <div class="loadChart_head">
      <el-tooltip class="item" effect="dark" :content="showChartMessage" placement="left">
        <el-button :icon="isShowChart ? 'el-icon-close' : 'el-icon-rank'" type="primary" circle size="mini" plain @click="showAllChart"></el-button>
      </el-tooltip>
    </div>
    <div class="loadChart_chart" :style="{ flexDirection:isShowChart? 'row' : 'column' }">
      <div class="chartItem bggreen" :style="chartItemWeight" ref="echartItemWeight">
        <b>重量装载率</b>
        <div class="chartItemDetail" :style="chartWeightStyle" ref="echartWeight"></div>
      </div>
      <div class="chartItem bgblue" :style="{height: isShowChart ? '100%' :'50%'}"  ref="echartItemVolumn">
        <b>体积装载率</b>
        <div class="chartItemDetail" :style="chartVolumnStyle" ref="echartVolume"></div>
      </div>
    </div>
  </div>
</template>
<script>
// 需要考虑按需引入，减小引入体积
// echarts的各模块
// https://github.com/apache/incubator-echarts/blob/master/index.js
import echarts from 'echarts'
import { objectMerge2 } from '@/utils/index'
export default {
  data() {
    return {
      showChartMessage: '点击展开',
      isShowChart: false, // false-不全屏 true-全屏
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
  props: {
    info: { // 右边列表里面的数据
      type: Array,
      default: () => {}
    },
    truckInfo: { // 顶部基本信息里面的数据
      type: Object,
      default: () => {}
    },
    className: {
      type: String,
      default: 'chartItemDetail'
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
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    }
  },
  computed: {
    chartItemWeight () {
      return {
        height: this.isShowChart ? '100%' : '50%',
        borderBottom: this.isShowChart ? 'none' : '1px solid #cdf',
        borderRight: this.isShowChart ? '1px solid #cdf' : 'none'
      }
    },
    chartWeightStyle () {
      return {
        height: '100%',
        width:  '100%'
      }
    },
    chartVolumnStyle () {
      return {
        height: '100%',
        width:  '100%'
      }
    }
  },
  watch: {
    info: {
      handler(cval, oval) {
        this.baseInfo.weight = 0
        this.baseInfo.volume = 0
        cval.forEach(e => {
          this.baseInfo.weight += Number(e.repertoryWeight) || 0
          this.baseInfo.volume += Number(e.repertoryVolume) || 0
        })
        if (cval) {
          this.initChart()
        }
      },
      deep: true
    },
    truckInfo: {
      handler(cval, oval) {
        if (cval) {
        this.baseInfo.totalWeight = Number(cval.weight) || 0
        this.baseInfo.totalVolume = Number(cval.volume) || 0
          this.initChart()
        }
      },
      deep: true
    }
  },
  methods: {
    initData() {},
    initChart() {
      this.initData()
      this.initChartWeight()
      this.initChartVolume()
      window.addEventListener('resize', this.resizeChart.bind(this))
    },
    showAllChart() {
      this.isShowChart = !this.isShowChart
      this.showChartMessage = this.isShowChart ? '点击隐藏' : '点击展开'
      this.$emit('showViewChart', this.isShowChart)
    },
    initChartWeight() {
      this.chart = echarts.init(this.$refs.echartWeight)
      this.chart.setOption({
        title: {
          subtextStyle: {
            fontSize: 12,
            color: '#666666'
          },
          x: 'center',
          bottom: '0px'
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        series: [{
          name: '总载重',
          type: 'pie',
          radius: '45%',
          label: {
            normal: {
              show: true,
              formatter: '{b} \n\n {d}%',
              textStyle: {
                fontWeight: 'normal',
                fontSize: 14,
                color: '#666'
              }
            }
          },
          data: [{
              value: this.baseInfo.totalWeight,
              name: '已配载',
              itemStyle: {
                color: '#FFCC66'
              }
            },
            {
              value: this.baseInfo.weight,
              name: '可载吨',
              itemStyle: {
                color: '#79F7C1'
              }
            }
          ]
        }]
      })
    },
    resizeChart(){
      this.chart.resize()
      this.chart2.resize()
    },
    initChartVolume() {
      this.chart2 = echarts.init(this.$refs.echartVolume)

      this.chart2.setOption({
        title: {
          subtextStyle: {
            fontSize: 14,
            color: '#666666'
          },
          x: 'center',
          bottom: '0px'
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        series: [{
          name: '总载立方',
          type: 'pie',
          radius: '45%',
          label: {
            normal: {
              show: true,
              formatter: '{b} \n\n {d}%',
              textStyle: {
                fontWeight: 'normal',
                fontSize: 14,
                color: '#666'
              }
            }
          },
          data: [{
              value: this.baseInfo.totalVolume,
              name: '已配载',
              itemStyle: {
                color: '#FFCC66'
              }
            },
            {
              value: this.baseInfo.volume,
              name: '可载方',
              itemStyle: {
                color: '#79F7C1'
              }
            }
          ]
        }]
      })
    },
    notNull(value) {
      if (value === '' || value === null || !value || value === undefined) {
        return false
      }
    }
  }
}

</script>
<style lang="scss">
.loadChart_wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid #cdf;
  .loadChart_head {
    height: 38px;
    width: 100%;
    padding-right: 5px;
    padding-top: 3px;
    border-bottom: 1px solid #cdf;
    .el-button--primary.is-plain {
      float: right;
    }
  }
  .loadChart_chart {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .bggreen {
    }
    .bgblue {
    }
    .chartItem {
      flex: 1;
      position: relative;
      b {  
        color: red;
        position: absolute;
        top: 10px;
        left: 10px;
      }
      .chartItemDetail{
        display: block;
        text-align: center;
      }
      canvas{
          height: 100%;
          width: 100%;
        }
    }
  }
}

</style>
