<template>
  <div class="loadIntelligent_content">
    <div class="loadIntelligent_main">
      <h2>智能配载</h2>
      <h2>智能配载</h2>
      <h2>智能配载</h2>
      <h2>智能配载</h2>
      <h2>智能配载</h2>
      <h2>智能配载</h2>
      <h2>智能配载</h2>
    </div>
    <div class="loadIntelligent_dataview">
      <div class="loadIntelligent_dataview_table" :style="viewTableStyle">
        <!-- 穿梭框 -->
        <transferTable @showViewTable="showFullViewTable" @loadTable="getLoadTable"></transferTable>
      </div>
      <div class="loadIntelligent_dataview_chart" :style="viewChartStyle">
        <!-- 配载率 -->
        <loadChart :info="loadInfoPercent" :truckInfo="formModel" @showViewChart="showFullViewChart"></loadChart>
      </div>
    </div>
  </div>
</template>
<script>
import transferTable from './components/transferTable'
import loadChart from './components/loadChart'
import { objectMerge2 } from '@/utils/index'
export default {
  name: "load",
  components: {
    transferTable,
    loadChart
  },
  data() {
    return {
      isShowViewChart: false,
      isShowViewTable: false, // 穿梭框 false-不全屏 true-全屏
      formModel: {
        truckLoad: 80,
        truckVolume: 120
      },
      loadInfoPercentOrg: [],
      loadTableInfo: []
    }
  },
  computed: {
    viewTableStyle () {
      let showView = '80%'
      showView = this.isShowViewTable ? '100%' : (this.isShowViewChart ? '0%' : '80%')
      return {
        width: showView,
        display: this.isShowViewTable ? '' : (this.isShowViewChart ? 'none' : '')
      }
    },
    viewChartStyle () {
      let showWidth = '20%'
      showWidth = this.isShowViewChart ? '100%' : (this.isShowViewTable ? '0%' : '20%')
      return {
        width: showWidth,
        display: this.isShowViewChart ? '' : (this.isShowViewTable ? 'none' : ''),
        transition: '0.2s'
      }
    },
    loadInfoPercent() {
      const data = Object.assign([], this.loadInfoPercentOrg)
      return data
    }
  },
  methods: {
    getLoadTable (arr) {
      this.loadInfoPercentOrg = objectMerge2([], arr)
      this.loadTableInfo = arr
    },
    showFullViewTable(val){ // 穿梭框全屏展示
      this.isShowViewTable = val
      console.log('showViewTable', val)
    },
    showFullViewChart (val) {
      this.isShowViewChart = val
    }
  }
}

</script>
<style lang="scss" scoped>
.loadIntelligent_content {
  height: 100%;
  width:100%;
  display: flex;
  flex-direction: column;
  .loadIntelligent_dataview {
    height: 100%;
    width: 100%;
    min-height: 300px;
    display: flex;
    flex-direction: row;
    padding-bottom: 10px;
    .loadIntelligent_dataview_table {
      width: 80%;
      height: 100%;
    }
    .loadIntelligent_dataview_chart {
      height: 100%;
      width: 20%;
      transition: 0.9s;
    }
  }
}

</style>
