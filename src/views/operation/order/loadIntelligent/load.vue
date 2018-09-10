<template>
  <div class="loadIntelligent_content">
    <div class="loadIntelligent_main">

      <loadInfo @truckPrecent="getTruckPrecent" :getLoadTable="loadInfoPercent" :orgid="$route.query.orgId" :dofo="intelligentData" @truckIndex="getTruckIndex"></loadInfo>
    </div>
    <div class="loadIntelligent_dataview">
      <div class="loadIntelligent_dataview_table" :style="viewTableStyle">
        <!-- 穿梭框 -->
        <transferTable :truckIndex="truckIndex" :loadTable="setLoadTableList" @showViewTable="showFullViewTable" @loadTable="getLoadTable" @loadCurTable="getLoadCurTable"></transferTable>
      </div>
      <div class="loadIntelligent_dataview_chart" @transitionend.self="resizeChart" :style="viewChartStyle">
        <!-- 配载率 -->
        <loadChart :info="loadInfoPercent" ref="loadchart" :truckInfo="truckPrecent"
                   @showViewChart="showFullViewChart"></loadChart>
      </div>
      <!-- 添加车辆信息 -->
      <addTruckInfo :truckSources="truckSources" :truckTypes="truckTypes" :issender="true" :isModify="isModify"
                    :info="selectInfo" :orgid="otherinfo.orgid" :popVisible.sync="addTruckVisible"
                    @close="closeAddTruckVisible" @success="fetchData"></addTruckInfo>
      <!-- 添加司机信息 -->
      <addDriverInfo :licenseTypes="licenseTypes" :issender="true" :isModifyDriver="isModifyDriver"
                     :infoDriver="selectInfoDriver" :orgid="otherinfo.orgid" :popVisible.sync="addDriverVisible"
                     @close="closeAddDriver" @success="fetchData"></addDriverInfo>
    </div>
  </div>
</template>
<script>
  import {REGEX} from '@/utils/validate'
  import transferTable from './components/transferTable'
  import loadChart from './components/loadChart'
  import loadInfo from './components/loadInfo'
  import {objectMerge2, parseTime, pickerOptions2} from '@/utils/index'
  import {mapGetters} from 'vuex'
  import SelectType from '@/components/selectType/index'
  import addTruckInfo from '@/views/company/trunkManage/components/add'
  import addDriverInfo from '@/views/company/driverManage/components/add'
  import {getDrivers, getTrucK, getSelectAddLoadRepertoryList} from '@/api/operation/load'
  import {getAllDriver} from '@/api/company/driverManage'
  import {getIntnteInit} from '@/api/operation/arteryDepart'

  export default {
    name: "load",
    components: {
      transferTable,
      loadChart,
      SelectType,
      addTruckInfo,
      addDriverInfo,
      loadInfo
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
        sendRoute: {
          orgId: '',
          standCar: [{}]
        },
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
        }
      }
    },
    computed: {
      ...mapGetters([
        'otherinfo'
      ]),
      orgid() {
      },
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
      // console.log(this.$route.query, '首页数据')

    },
    activated() {
      this.init()
      this.infoData()
    },
    methods: {

      infoData() {
        let obj = JSON.parse(this.$route.query.sendDate)
        this.sendRoute.orgId = this.$route.query.orgId
        // for (var i in this.$route.query.sendDate) {
        //   this.sendRoute.standCar[i] = Object.assign(this.$route.query.sendDate[i])
        // }
        this.sendRoute.standCar = obj.map((item, val) => {
          return {id: item.cid, spri: item.price}
        })
        this.loading = true
        return getIntnteInit(this.sendRoute).then(data => {
          this.intelligentData = data.transp[0].standacars
          this.intelligentData.forEach((e, index) => {
            this.$set(this.setLoadTableList.right, index, e.carLoadDetail)
          })
          this.loading = false
        }).catch(err => {
          this.$message.error('错误：' + (err.text || err.errInfo || err.data || JSON.stringify(err)))
          this.loading = false
        })
      },
      getTruckIndex (obj) {
        this.truckIndex = obj
      },
      getTruckPrecent (obj) {
        this.truckPrecent = obj
      },
      //
      resizeChart() {
        this.$refs.loadchart.resizeChart()
      },
      init() {
        this.intelligentData = this.$options.data().intelligentData
        // this.$refs['ruleForm'].resetFields()
        // this.setLoadTypeId()
        // this.initIsEdit()
        this.intelligentData.orgid = this.orgid
        this.DriverList = this.Drivers
        this.TruckList = this.Trucks
        // this.getSelectAddLoadRepertoryList()
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
      initInfo() {
        this.loading = false
        // this.truckKey = new Date().getTime()
        // this.driverKey = new Date().getTime()
        this.changeDriverKey = Math.random()
        this.changeTruckKey = Math.random()
        this.Drivers = this.$options.data().Drivers
        this.Trucks = this.$options.data().Trucks
        this.cacheDriverList = this.$options.data().cacheDriverList
        this.cacheTruckList = this.$options.data().cacheTruckList
        // 切换组织了列表时更新司机列表信息
        // this.getDrivers(this.otherinfo.orgid)
        // this.getTrucks(this.otherinfo.orgid)
        console.log('刷新了下拉数据')
      },
      getDrivers(orgid) {
        if (this.cacheDriverList[orgid]) {
          this.Drivers = this.cacheDriverList[orgid]
        } else {
          getDrivers().then(data => {
            this.Drivers = data.data
            this.cacheDriverList[orgid] = data.data
            console.log('Drivers', this.Drivers)
          })
        }
      },
      getTrucks(orgid) {
        if (this.cacheTruckList[orgid]) {
          this.Trucks = this.cacheTruckList[orgid]
        } else {
          getTrucK().then(data => {
            this.Trucks = data.data
            this.cacheTruckList[orgid] = data.data
            console.log('Trucks', this.Trucks)
          }).catch(error => {
            this.$message.error(error.errorInfo || error.text)
          })
        }
      },
      handleSelectName(item) {
        // this.driverKey = new Date().getTime()
        this.changeDriverKey = Math.random()
        if (this.intelligentData.truckIdNumber === '' || this.intelligentData.truckIdNumber === undefined) {
          this.intelligentData.truckIdNumber = item.truckIdNumber
        }
        this.intelligentData.dirverMobile = item.driverMobile
        this.intelligentData.dirverName = item.driverName
        this.isDriverSelect = true
      },
      handleSelectTruckNum(item) {

        // this.truckKey = new Date().getTime()
        this.changeTruckKey = Math.random()
        this.intelligentData.truckIdNumber = item.truckIdNumber
        this.intelligentData.dirverMobile = item.driverMobile
        this.intelligentData.dirverName = item.driverName

        this.$set(this.intelligentData, 'truckLoad', Number(item.truckLoad))
        this.$set(this.intelligentData, 'truckVolume', Number(item.truckVolume))
        // this.formModel.truckLoad = item.truckLoad
        // this.formModel.truckVolume = item.truckVolume
      },
      querySearch(queryString, cb) {
        const driverList = this.Drivers
        const results = queryString ? driverList.filter(this.createFilter(new RegExp(queryString, 'gi'), 'driverName')) : driverList
        // 调用 callback 返回司机列表的数据
        cb(results)
      },
      querySearchTruck(queryString, cb) {
        const truckList = this.Trucks
        const results = queryString ? truckList.filter(this.createFilter(new RegExp(queryString, 'gi'), 'truckIdNumber')) : truckList
        // 调用 callback 返回车辆列表的数据
        cb(results)
      },
      createFilter(queryString, prop) {
        return (data) => {
          if (data[prop]) {
            return (queryString.test(data[prop]))
          }
        }
      },
      blurTruck() { // 车牌输入框失去响应时
        const data = ''
        // this.Trucks.find(el => {
        //   if (this.formModel.truckIdNumber === el.truckIdNumber) {
        //     this.formModel.truckIdNumber = el.truckIdNumber
        //   } else {
        //     this.formModel.truckIdNumber = undefined
        //   }
        // })
      },
      fetchData() {
        this.initInfo() // 添加完司机或车辆之后，刷新下拉数据
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
      //
      submitLoad() {
        alert("计算配载")
        // this.searchForm.createTime = this.searchCreatTime ? parseTime(this.searchCreatTime[0], '{y}-{m}-{d} ') + '00:00:00' : ''
        // this.searchForm.endTime = this.searchCreatTime ? parseTime(this.searchCreatTime[1], '{y}-{m}-{d} ') + '23:59:59' : ''
        // this.$emit('change', this.searchForm)
      },
      getLoadTable(arr) {
        this.loadTableInfo = arr
      },
      getLoadCurTable (arr) {
        this.loadInfoPercentOrg = objectMerge2([], arr)
      },
      showFullViewTable(val) { // 穿梭框全屏展示
        this.isShowViewTable = val
        console.log('showViewTable', val)
      },
      showFullViewChart(val) {
        this.isShowViewChart = val
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
