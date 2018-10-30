<template>
  <div class="loadIntelligent_content" v-loading="loading" :key="loadKey">
    <div class="loadIntelligent_main">
      <loadInfo 
      :modify="modify" 
      :transpList="transpList" 
      @truckPrecent="getTruckPrecent"
      @delCurTruck="getDelCurTruck" 
      :loadTable="loadTableInfo" 
      :orgid="$route.query.orgId" 
      :dofo="intelligentData" 
      @truckIndex="getTruckIndex" 
      :paramTuck="paramTuck" 
      @resetTrucDelList="resetTrucDelList" 
      @addOrgRightTable="addOrgRightTable" 
      @truckInfo="getTruckInfo" 
      @schemeIndex="getSchemeIndex" 
      :leftTableArr="leftTableArr" 
      :orgFirstScheme="orgFirstScheme" 
      @submitLoadNew="getSubmitLoadNew" 
      @handlingFeeInfo="getHandlingFeeInfo"
      @setPageLoading="setPageLoading"></loadInfo>
    </div>
    <div class="loadIntelligent_dataview">
      <div class="loadIntelligent_dataview_table" :style="viewTableStyle">
        <!-- 穿梭框 -->
        <transferTable 
        :truckIndex="truckIndex" 
        :getinfoed="getinfoed" 
        :loadTable="setLoadTableList" 
        :delData="delCurTruckData" 
        @showViewTable="showFullViewTable" 
        @loadTable="getLoadTable" 
        @loadCurTable="getLoadCurTable" 
        @openParamSet="openlntelligent" 
        :resetTuckLoad="resetTrucDelListLen" 
        :addOrgRightTable="isAddOrgRightTable" 
        :dofo="truckInfo" 
        :handlingFeeInfo="handlingFeeInfo"
        :schemeIndex="schemeIndex" 
        @leftTable="getLeftTable" 
        :submitLoadNew="submitLoadNew"></transferTable>
      </div>
      <div class="loadIntelligent_dataview_chart" @transitionend.self="resizeChart" :style="viewChartStyle">
        <!-- 配载率 -->
        <loadChart 
        :info="loadInfoPercent" 
        ref="loadchart" 
        :truckInfo="truckPrecent" 
        @showViewChart="showFullViewChart"></loadChart>
      </div>
      <!-- 添加车辆信息 -->
      <addTruckInfo 
      :truckSources="truckSources" 
      :truckTypes="truckTypes" 
      :issender="true" 
      :isModify="isModify" 
      :info="selectInfo" 
      :orgid="otherinfo.orgid" 
      :popVisible.sync="addTruckVisible" 
      @close="closeAddTruckVisible" 
      @success="fetchData"></addTruckInfo>
      <!-- 添加司机信息 -->
      <addDriverInfo 
      :licenseTypes="licenseTypes" 
      :issender="true" 
      :isModifyDriver="isModifyDriver" 
      :infoDriver="selectInfoDriver" 
      :orgid="otherinfo.orgid" 
      :popVisible.sync="addDriverVisible" 
      @close="closeAddDriver" 
      @success="fetchData"></addDriverInfo>
      <!-- 参数设置 -->
      <AddLntelligent 
      :popVisible.sync="lntelligentVisible" 
      @close="closelntelligent" 
      @savaParamTruck="getSavaParamTruck" :selectTruck="intelligentData"></AddLntelligent>
    </div>
  </div>
</template>
<script>
import { REGEX } from '@/utils/validate'
import transferTable from './components/transferTable'
import loadChart from './components/loadChart'
import loadInfo from './components/loadInfo'
import { objectMerge2, parseTime, pickerOptions2, tmsMath } from '@/utils/index'
import { mapGetters } from 'vuex'
import SelectType from '@/components/selectType/index'
import addTruckInfo from '@/views/company/trunkManage/components/add'
import addDriverInfo from '@/views/company/driverManage/components/add'
import { getDrivers, getTrucK, getSelectAddLoadRepertoryList } from '@/api/operation/load'
import { getAllDriver } from '@/api/company/driverManage'
import { getIntnteInit, selectSchemeGroupDetail, getIntnteCarInfo } from '@/api/operation/arteryDepart'
import AddLntelligent from './components/intelligentParameterSet'

export default {
  name: "Load",
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
      modify: false, // true-修改 false-添加
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
      getinfoed: false,
      truckInfo: {},
      transpList: [],
      truckOptions: [],
      schemeIndex: 0,
      leftTableArr: [],
      orgFirstScheme: [],
      loadKey: 0,
      submitLoadNew: {},
      handlingFeeInfo: {}
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
  watch: {
    $route(newVal, oldVal) {
      console.log('this.$router', newVal, this.$router)
      if (newVal.fullPath.indexOf('/operation/order/loadIntelligent/load') !== -1 && newVal.fullPath !== window.intelligentUrl) {
        this.inited = false
        this.loadKey = new Date().getTime()
        window.intelligentUrl = newVal.fullPath
        this.init()
        this.infoData()
      }
    }
  },
  mounted() {
    console.log('load mounted~~~~~~~~~~')
    this.getSystemTruck()
    this.init()
    this.infoData()
    window.intelligentUrl = this.$route.fullPath
  },
  activated () {
    let visitedViewsArr = this.visitedViews()
    let viewCount = 0
    console.error('visitedViews : ', visitedViewsArr)
    visitedViewsArr.forEach((e, index) => {
      if (this.$route.fullPath === e.fullPath) {
        console.log(this.$route.fullPath, '====',e.fullPath)
        viewCount++
      }
    })
    console.error('viewCount : ', viewCount)
    if (viewCount !== 1) {
      console.error('reinit : ', viewCount !== visitedViewsArr.length)
    }
  },
  methods: {
     visitedViews() {
      return this.$store.state.tagsView.visitedViews
    },
    infoData() {
      if (this.$route.query && this.$route.query.schemeGroup) { // 查看修改配载
        this.modify = true
        this.loading = true
        return selectSchemeGroupDetail(this.$route.query).then(data => {
            let arr = objectMerge2([], data) // 这里不能用Object.assign 需要深拷贝
            console.log('修改', data)
            arr.forEach((e, index) => {
              e.tmsLoadSchemeDetailDtoList.forEach((el, elindex) => { // 将数据改成新增配载时原始方案的数据结构
                this.$set(el, 'carLoadDetail', el.tmsOrderLoadDetailsList)
                this.$set(el, '_index', elindex)
                for (let item in el.tmsOrderLoad) {
                  if (item !== 'schemeId' && item !== 'id') {
                    this.$set(el, item, el.tmsOrderLoad[item])
                  }
                  this.$set(el, 'weight', el.tmsOrderLoad.truckLoad)
                  this.$set(el, 'volume', el.tmsOrderLoad.truckVolume)
                  this.$set(el, 'dirverName', el.dirverName ? el.dirverName : '')
                  this.$set(el, 'dirverMobile', el.dirverMobile ? el.dirverMobile : '')
                  this.$set(el, 'truckIdNumber', el.truckIdNumber ? el.truckIdNumber : '')
                }
                this.$set(el, 'handlingFeeAll', el.tmsOrderLoadFee.handlingFeeAll)
                this.truckOptions.forEach(em => {
                  if (em.cid === el.cid || em.cid === el.cid + '') {
                    this.$set(el, 'name', em.name)
                    // console.log('车：======', el, em.cid, em, em.name, el.cid)
                  }
                })
                let totalPrice = tmsMath.add(
                  el.tmsOrderLoadFee.nowpayCarriage,
                  el.tmsOrderLoadFee.nowpayOilCard,
                  el.tmsOrderLoadFee.backpayCarriage,
                  el.tmsOrderLoadFee.backpayOilCard,
                  el.tmsOrderLoadFee.arrivepayCarriage,
                  el.tmsOrderLoadFee.arrivepayOilCard).result()
                this.$set(el, 'price', totalPrice)
                totalPrice = 0
                // console.log('==============el', el)
              })
            })
            this.transpList = objectMerge2([], arr)
            this.orgFirstScheme = objectMerge2([], arr)
            this.intelligentData = this.transpList[0].tmsLoadSchemeDetailDtoList // 第一个方案的车型及配载信息 
            this.setLoadTableList.left = data[0].repertoryList // 第一个方案的库存列表
            this.intelligentData.forEach((e, index) => {
              this.$set(this.setLoadTableList.right, index, e.carLoadDetail)
              this.loading = false
            })
          })
          .catch(err => {
            this._handlerCatchMsg(err)
            this.loading = false
          })
      } else { // 新增配载
        this.modify = false
        let obj = JSON.parse(this.$route.query.sendDate)
        this.sendRoute.orgId = this.$route.query.orgId
        this.sendRoute.standCar = obj.map((item, val) => {
          return { id: item.cid, spri: item.price, carNo: item.carNo }
        })
        this.loading = true
        return getIntnteInit(this.sendRoute).then(data => {
          if (data) {
            console.log('新增', data)
            let arr = objectMerge2([], data.transp)
            arr.forEach((e, index) => {
              this.$set(e, 'repertoryList', e.storeOrderListloss)
              this.$set(e, 'tmsLoadSchemeDetailDtoList', e.standacars)
              e.tmsLoadSchemeDetailDtoList.forEach((el, elindex) => {
                this.$set(el, 'arriveOrgid', this.$route.query.orgId)
                this.$set(el, 'dirverName', el.carDriver ? el.carDriver : '')
                this.$set(el, 'dirverMobile', el.carDriverPhone ? el.carDriverPhone : '')
                this.$set(el, 'truckIdNumber', el.carNo ? el.carNo : '')
                this.$set(el, '_index', elindex)
                let obj = {}
                for (let item in el) {
                  this.$set(obj, item, el[item])
                }
                this.$set(el, 'handlingFeeAll','')
                this.$set(el, 'tmsOrderLoad', obj)
                this.$set(el, 'tmsOrderLoadDetailsList', el.carLoadDetail)
                this.$set(el, 'tmsOrderLoadFee', { nowpayCarriage: el.price })
              })
            })
            this.transpList = objectMerge2([], arr)
            this.orgFirstScheme = objectMerge2([], arr)
            console.log('transpList=========', this.transpList)
            this.intelligentData = this.transpList[0].tmsLoadSchemeDetailDtoList // 第一个方案的车型及配载信息 
            this.setLoadTableList.left = this.transpList[0].repertoryList // 第一个方案的库存列表
            this.intelligentData.forEach((e, index) => {
              this.$set(this.setLoadTableList.right, index, e.carLoadDetail)
              this.loading = false
            })
          } else {
            this.eventBus.$emit('closeCurrentView')
            this.$message({ type: 'warning', message: '无配载信息' })
          }
          setTimeout(() => {
            this.getinfoed = true
          }, 1000)
          this.loading = false
        }).catch(err => {
          this._handlerCatchMsg(err)
          this.$router.push({ path: '../arteryDepart' })
          this.eventBus.$emit('closeCurrentView')
          this.loading = false
        })

      }
    },
    getTruckIndex(obj) {
      this.truckIndex = ''
      this.$nextTick(() => {
        this.truckIndex = obj
      })
    },
    getTruckPrecent(obj) {
      this.truckPrecent = {}
      this.$nextTick(() => {
        this.truckPrecent = obj
      })
    },
    getDelCurTruck(obj) { // 删除车辆的时候 需要将右边的数据减到左边
      this.delCurTruckData = Object.assign({}, obj)
    },
    getTruckInfo(obj) {
      this.truckInfo = {}
      this.$nextTick(() => {
        this.truckInfo = obj
      })
    },
    addOrgRightTable() { // 添加了一辆车型
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
    resetTrucDelList() { // 参数设置之后需要返回到左边列表的运单
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
    getSystemTruck() {
      getIntnteCarInfo(this.otherinfo.orgid, 3).then(data => {
        if (data) {
          this.truckOptions = data
          console.log('getIntnteCarInfo', data)
        }
      })
    },
    closeAddDriver() {
      this.addDriverVisible = false
    },
    closeAddTruckVisible() {
      this.addTruckVisible = false
    },
    getLeftTable(arr) { // 获取当前方案的库存列表
      this.leftTableArr = Object.assign([], arr)
    },
    getSavaParamTruck(arr) { // 参数设置时返回的数据
      this.paramTuck = Object.assign([], arr)
    },
    getLoadTable(arr) {
      this.loadTableInfo = objectMerge2([], arr)
    },
    getLoadCurTable(arr) {
      this.loadInfoPercentOrg = objectMerge2([], arr)
    },
    getSubmitLoadNew(obj) { // 计算配置后获得的数据
      this.transpList[this.schemeIndex].repertoryList = obj.left
      this.transpList[this.schemeIndex].tmsLoadSchemeDetailDtoList = obj.right
      this.submitLoadNew = {}
      this.$nextTick(() => {
        this.submitLoadNew = obj
      })
    },
    getSchemeIndex(num) { // 获取当前方案下标index
      this.schemeIndex = num
      console.log('this.transpList[num]===========', this.transpList[num])
      // 设置库存运单和配载清单
      this.$nextTick(() => {
        if (this.transpList && this.transpList.length > 0) {
          if (this.modify) {
            this.setLoadTableList.left = this.transpList[num].repertoryList // 第一个方案的库存列表
            this.transpList[num].tmsLoadSchemeDetailDtoList.forEach((e, index) => {
              this.$set(this.setLoadTableList.right, index, e.carLoadDetail)
              this.loading = false
            })
          }
        }
      })
    },
    getHandlingFeeInfo (obj) { // 获取操作费
      console.log('-----获取操作费 obj 1------', obj)
      this.handlingFeeInfo = obj
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
    },
    setPageLoading (boolean) {
      this.loading = boolean
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
