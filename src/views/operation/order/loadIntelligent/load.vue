<template>
  <div class="loadIntelligent_content" v-loading="loading">
    <div class="loadIntelligent_main">
      <loadInfo @truckPrecent="getTruckPrecent" @delCurTruck="getDelCurTruck" :loadTable="loadTableInfo" :orgid="$route.query.orgId" :dofo="intelligentData" @truckIndex="getTruckIndex" :paramTuck="paramTuck" @resetTrucDelList="resetTrucDelList" @addOrgRightTable="addOrgRightTable"></loadInfo>
    </div>
    <div class="loadIntelligent_dataview">
      <div class="loadIntelligent_dataview_table" :style="viewTableStyle">
        <!-- 穿梭框 -->
        <transferTable :truckIndex="truckIndex" :getinfoed="getinfoed" :loadTable="setLoadTableList" :delData="delCurTruckData" @showViewTable="showFullViewTable" @loadTable="getLoadTable" @loadCurTable="getLoadCurTable" @openParamSet="openlntelligent" :resetTuckLoad="resetTrucDelListLen" :addOrgRightTable="isAddOrgRightTable"></transferTable>
      </div>
      <div class="loadIntelligent_dataview_chart" @transitionend.self="resizeChart" :style="viewChartStyle">
        <!-- 配载率 -->
        <loadChart :info="loadInfoPercent" ref="loadchart" :truckInfo="truckPrecent" @showViewChart="showFullViewChart"></loadChart>
      </div>
      <!-- 添加车辆信息 -->
      <addTruckInfo :truckSources="truckSources" :truckTypes="truckTypes" :issender="true" :isModify="isModify" :info="selectInfo" :orgid="otherinfo.orgid" :popVisible.sync="addTruckVisible" @close="closeAddTruckVisible" @success="fetchData"></addTruckInfo>
      <!-- 添加司机信息 -->
      <addDriverInfo :licenseTypes="licenseTypes" :issender="true" :isModifyDriver="isModifyDriver" :infoDriver="selectInfoDriver" :orgid="otherinfo.orgid" :popVisible.sync="addDriverVisible" @close="closeAddDriver" @success="fetchData"></addDriverInfo>
      <!-- 参数设置 -->
      <AddLntelligent :popVisible.sync="lntelligentVisible" @close="closelntelligent" @savaParamTruck="getSavaParamTruck" :selectTruck="intelligentData"></AddLntelligent>
    </div>
  </div>
</template>
<script>
import { REGEX } from '@/utils/validate'
import transferTable from './components/transferTable'
import loadChart from './components/loadChart'
import loadInfo from './components/loadInfo'
import { objectMerge2, parseTime, pickerOptions2 } from '@/utils/index'
import { mapGetters } from 'vuex'
import SelectType from '@/components/selectType/index'
import addTruckInfo from '@/views/company/trunkManage/components/add'
import addDriverInfo from '@/views/company/driverManage/components/add'
import { getDrivers, getTrucK, getSelectAddLoadRepertoryList } from '@/api/operation/load'
import { getAllDriver } from '@/api/company/driverManage'
import { getIntnteInit } from '@/api/operation/arteryDepart'
import AddLntelligent from './components/intelligentParameterSet'

export default {
  name: "load",
  components: {
    transferTable,
    loadChart,
    SelectType,
    addTruckInfo,
    addDriverInfo,
    loadInfo,
    AddLntelligent
  },
  props: {
    model: {
      type: Array
    }
  },
  data() {
    return {
      truckIndex: '',
      truckPrecent: {},
      isAddOrgRightTable: '',
      sendRoute: {
        orgId: '',
        standCar: [{}]
      },
      loading: true,
      lntelligentVisible: false,
      isShowViewChart: false,
      isShowViewTable: false, // 穿梭框 false-不全屏 true-全屏
      isModify: false,
      isModifyDriver: false,
      addTruckVisible: false,
      addDriverVisible: false,
      inited: false,
      formModel: {
        truckLoad: 80,
        truckVolume: 120
      },
      loadInfoPercentOrg: [],
      loadTableInfo: [],
      valkey: '',
      truckSources: [],
      truckTypes: [],
      licenseTypes: [],
      selectInfo: {},
      selectInfoDriver: {},
      cacheDriverList: {},
      cacheTruckList: {},
      Drivers: [],
      Trucks: [],
      contractNo: '',
      intelligentData: [],
      changeDriverKey: '',
      changeTruckKey: '',
      rules: {},
      setLoadTableList: {
        left: [],
        right: []
      },
      delCurTruckData: {
        number: '',
        list: []
      },
      paramTuck: [],
      resetTrucDelListLen: '',
      getinfoed: false
    }
  },
  computed: {
    ...mapGetters([
      'otherinfo'
    ]),
    orgid() {},
    viewTableStyle() {
      let showView = '80%'
      showView = this.isShowViewTable ? '100%' : (this.isShowViewChart ? '0%' : '80%')
      return {
        width: showView,
        display: this.isShowViewTable ? '' : (this.isShowViewChart ? 'none' : '')
      }
    },
    viewChartStyle() {
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
  mounted() {
    this.init()
    this.infoData()
  },
  methods: {
    infoData() {
      let obj = JSON.parse(this.$route.query.sendDate)
      this.sendRoute.orgId = this.$route.query.orgId
      this.sendRoute.standCar = obj.map((item, val) => {
        return { id: item.cid, spri: item.price }
      })
      this.loading = true
      return getIntnteInit(this.sendRoute).then(data => {
        if (data) {
          this.intelligentData = data.transp[0].standacars
          console.log('9090909090')
          this.setLoadTableList.left = data.transp[0].storeOrderListloss
          this.intelligentData.forEach((e, index) => {
            this.$set(this.setLoadTableList.right, index, e.carLoadDetail)
          })
          
        } else {
          this.eventBus.$emit('closeCurrentView')
          this.$message({ type: 'warning', message: '无配载信息' })

        }
        setTimeout(()=>{
          this.getinfoed = true
        },1000)
        this.loading = false
      }).catch(err => {
        this._handlerCatchMsg(err)
        this.$router.push({ path: '../arteryDepart' })
        this.eventBus.$emit('closeCurrentView')
        this.loading = false
      })
    },
    getTruckIndex(obj) {
      console.log('this.truckIndex:',this.truckIndex ,obj)
      this.truckIndex = ''
      this.$nextTick(() => {
        this.truckIndex = obj
      })
      
    },
    getTruckPrecent(obj) {
      this.truckPrecent = obj
    },
    getDelCurTruck(obj) { // 删除车辆的时候 需要将右边的数据减到左边
      this.delCurTruckData = Object.assign({}, obj)
       console.log('delCurTruck2', obj, this.delCurTruckData)
    },
    addOrgRightTable () { // 添加了一辆车型
      this.isAddOrgRightTable = new Date().getTime()
    },
    resizeChart() {
      this.$refs.loadchart.resizeChart()
    },
    init() {
      this.intelligentData = this.$options.data().intelligentData
      this.intelligentData.orgid = this.orgid
      this.DriverList = this.Drivers
      this.TruckList = this.Trucks
      if (!this.inited) {
        this.inited = true
        this.initInfo()
      }
    },
    doAction(type) {
      switch (type) {
        case 'addTruck': // 添加车辆信息
          this.addTruck()
          break
        case 'addDriver': // 添加司机信息
          this.addDriver()
          break
      }
    },
    initInfo() {},
    fetchData() {
      this.initInfo() // 添加完司机或车辆之后，刷新下拉数据
    },
    resetTrucDelList () { // 参数设置之后需要返回到左边列表的运单
      this.resetTrucDelListLen = ''
      this.$nextTick(() => {
        this.resetTrucDelListLen = this.paramTuck ? this.paramTuck.length : 0
      })
    },
    addTruck() { // 添加车辆信息
      this.addTruckVisible = true
    },
    addDriver() { // 添加司机信息
      this.infoDriver = {}
      this.addDriverVisible = true
    },
    closeAddDriver() {
      this.addDriverVisible = false
    },
    closeAddTruckVisible() {
      this.addTruckVisible = false
    },
    getSavaParamTruck(arr) { // 参数设置时返回的数据
      console.log('getSavaParamTruck', arr)
      this.paramTuck = Object.assign([], arr)
    },
    getLoadTable(arr) {
      this.loadTableInfo = arr
    },
    getLoadCurTable(arr) {
      this.loadInfoPercentOrg = objectMerge2([], arr)
    },
    showFullViewTable(val) { // 穿梭框全屏展示
      this.isShowViewTable = val
    },
    showFullViewChart(val) {
      this.isShowViewChart = val
    },
    openlntelligent() {
      this.lntelligentVisible = true
    },
    closelntelligent() {
      this.lntelligentVisible = false
    }
  }
}

</script>
<style lang="scss" scoped>
.loadIntelligent_content {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  .loadIntelligent_dataview {
    height: 100%;
    width: 100%;
    min-height: 300px;
    display: flex;
    flex-direction: row;
    padding: 10px;
    .loadIntelligent_dataview_table {
      width: 80%;
      height: 100%;
    }
    .loadIntelligent_dataview_chart {
      height: 100%;
      width: 20%;
      transition: 0.9s;
      padding-left: 10px;
    }
  }
}

.load-intelligent {
  .header-left {
    .intelligent-card {
      .el-tabs__header {
        .el-tabs__nav-wrap {
          .el-tabs__nav-scroll {
            background-color: rgb(252, 255, 245);
          }
        }
      }

      .intelligentForm_lrl {
        .load-intelligent-content {
          .content-left {
            /*display: inline-grid;*/
            border-top: 2px solid rgb(184, 203, 213);
            border-right: 1px solid rgb(232, 233, 234);
            border-bottom: 1px solid rgb(232, 233, 234);
            border-left: 1px solid rgb(232, 233, 234);
            padding: 10px 5px 0 0;
            float: left;
            width: 280px;
            .el-form-item.orgidClass {
              .el-input {
                width: 108%;
              }
            }
          }
          .content-cent {
            /*background: skyblue;*/
            border-top: 2px solid rgb(184, 203, 214);
            border-bottom: 1px solid rgb(232, 233, 234);
            float: left;
            margin-left: 20px;
            .btn1,
            .btn2,
            .btn3,
            .btn4 {
              float: left;
              .el-button.saveInt.el-button--primary.is-plain {
                width: 20px;
                text-align: left;
                border-radius: 0;
                span {
                  width: 20px;
                  writing-mode: tb !important;
                  span {
                    padding-right: 12px;
                    padding-top: 10px;
                  }
                }
              }
            }
            .btn4 {
              .el-button.saveInt.el-button--primary.is-plain {
                span {
                  span {

                    padding-top: 12px;
                  }
                }
              }
            }

            .btnCont {
              float: left;
              .content-right {
                padding: 10px 5px 0 0;
                float: left;
                width: 290px;
                .el-form-item {
                  .el-form-item__content {
                    .el-input__suffix {
                      .el-input__icon {
                        cursor: pointer;
                      }
                    }
                  }
                }
                .el-form-item.orgidClass1 {
                  .el-input {
                    width: 108%;
                  }
                }
                .el-form-item.orgidClass2 {
                  .el-input {
                    width: 112%;
                  }
                }
                .el-form-item.arriveTimeClass {
                  .el-date-editor.el-input {
                    width: 200px;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  .header-right {
    position: relative;
    top: -172px;
    right: -82%;
  }
}

.lll-autocomplete {
  li {
    line-height: normal;
    padding: 7px;

    .name {
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .addr {
      font-size: 12px;
      color: #999;
    }
    .highlighted .addr {
      color: #ddd;
    }
  }
}

</style>
