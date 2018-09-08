<template>
  <div class="loadInfo_wrapper">
    <div class="loadInfo_btns clraefix">
      <el-button type="primary" @click="submitLoad('formModel')" icon="el-icon-refresh" plain size="mini">计算配载
      </el-button>
      <el-button type="success" @click="submitForm('formModel')" icon="el-icon-document" plain size="mini">保存配载
      </el-button>
      <el-button type="danger" @click="" icon="el-icon-circle-close-outline" plain size="mini">取消</el-button>
    </div>
    <div class="loadInfo_tab">
      <el-tabs type="border-card">
        <el-tab-pane label="方案一">
          <div class="loadInfo_content">
            <div class="content_left">
              <el-form :model="formModel" :size="btnsize" ref="formModel" label-width="65px" :rules="formModelRules">
                <el-form-item label="到达网点" prop="arriveOrgid">
                  <el-input v-model="formModel.arriveOrgid" disabled></el-input>
                </el-form-item>
                <el-form-item label="分摊方式" prop="apportionTypeId">
                  <selectType v-model="formModel.apportionTypeId" type="apportion_type" clearable size="mini"></selectType>
                </el-form-item>
              </el-form>
            </div>
            <div class="loadInfo_collapse">
              <el-form :model="intelligentData" :rules="rules" ref="ruleForm" label-width="63px" :inline="true" label-position="right" size="mini" class="loadInfo_collapse_list" :key="valkey">
                <!-- <el-form :model="intelligentData" label-width="63px" inline class="loadInfo_collapse_list"> -->
                <div class="loadInfo_item"  v-for="(item, index) in dataList" :style="{width: showCurrenFormStyle[index]?'calc(100% - 185px)': ''}">
                  <el-button class="verticalBtn" @click="selectCurrentTuck(item, index)" :class="{'verticalBtnActive':showCurrenFormStyle[index]}">车型{{ changeNumCN[index]}}</el-button>
                  <div class="loadInfo_item_form" v-show="showCurrenFormStyle[index]">
                    <div class="loadInfo_item_form_row">
                      <el-form-item label="车型">
                        <el-input disabled :size="btnsize"></el-input>
                      </el-form-item>
                      <el-form-item label="车牌号" prop="" :key="changeTruckKey">
                        <el-autocomplete popper-class="lll-autocomplete" v-model="intelligentData.truckIdNumber" :fetch-suggestions="querySearchTruck" placeholder="车牌号码" size="mini" @select="handleSelectTruckNum" auto-complete="off" @blur="blurTruck" :maxlength="8">
                          <i class="el-icon-plus el-input__icon" slot="suffix" @click="doAction('addTruck')"></i>
                          <template slot-scope="{ item }">
                            <div class="name">{{ item.truckIdNumber }}</div>
                            <span class="addr">{{ item.driverName }}</span>
                            <br>
                            <span class="addr">{{ item.dirverMobile}}</span>
                          </template>
                        </el-autocomplete>
                      </el-form-item>
                      </el-form-item>
                      <el-form-item label="可载方" prop="">
                        <el-input v-model="intelligentData.truckVolume" :maxlength="3"></el-input>
                      </el-form-item>
                      <el-form-item label="可载吨" prop="">
                        <el-input v-model="intelligentData.truckLoad" :maxlength="3"></el-input>
                      </el-form-item>
                    </div>
                    <div class="loadInfo_item_form_row">
                      <el-form-item label="车费">
                        <el-input :size="btnsize"></el-input>
                      </el-form-item>
                      <el-form-item label="司机" prop="dirverName" class="formItemTextDanger" :key="changeDriverKey">
                        <el-autocomplete popper-class="lll-autocomplete" v-model="intelligentData.dirverName" :fetch-suggestions="querySearch" placeholder="司机名称" size="mini" @select="handleSelectName" auto-complete="off" :maxlength="10">
                          <i class="el-icon-plus el-input__icon" slot="suffix" @click="doAction('addDriver')"></i>
                          <template slot-scope="{ item }">
                            <div class="name">{{ item.driverName }}</div>
                            <span class="addr">{{ item.driverMobile }}</span>
                            <br>
                            <span class="addr">{{ item.truckIdNumber }}</span>
                          </template>
                        </el-autocomplete>
                      </el-form-item>
                      <el-form-item label="司机电话">
                        <el-input v-model="intelligentData.dirverMobile"></el-input>
                      </el-form-item>
                      <el-form-item label="到达日期">
                        <el-input :size="btnsize"></el-input>
                      </el-form-item>
                    </div>
                  </div>
                </div>
                <el-button class="verticalBtn verticalBtnAdd" @click="addtuck">+</el-button>
                <div class="verticalBtnTransfer">
                  <el-button class="verticalBtnSort" @click="pretruck" icon="el-icon-d-arrow-left" :disabled="pretruckDisable"></el-button>
                  <el-button class="verticalBtnSort" @click="nexttruck" icon="el-icon-d-arrow-right" :disabled="nexttruckDisable"></el-button>
                </div>
              </el-form>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 添加车辆信息 -->
    <addTruckInfo :truckSources="truckSources" :truckTypes="truckTypes" :issender="true" :isModify="isModify" :info="selectInfo" :orgid="otherinfo.orgid" :popVisible.sync="addTruckVisible" @close="closeAddTruckVisible" @success="fetchData"></addTruckInfo>
    <!-- 添加司机信息 -->
    <addDriverInfo :licenseTypes="licenseTypes" :issender="true" :isModifyDriver="isModifyDriver" :infoDriver="selectInfoDriver" :orgid="otherinfo.orgid" :popVisible.sync="addDriverVisible" @close="closeAddDriver" @success="fetchData"></addDriverInfo>
  </div>
</template>
<script>
import SelectTree from '@/components/selectTree/index'
import { REGEX } from '@/utils/validate'
import { objectMerge2, parseTime, pickerOptions2 } from '@/utils/index'
import { mapGetters } from 'vuex'
import SelectType from '@/components/selectType/index'
import addTruckInfo from '@/views/company/trunkManage/components/add'
import addDriverInfo from '@/views/company/driverManage/components/add'
import { getDrivers, getTrucK, getSelectAddLoadRepertoryList } from '@/api/operation/load'
import { getAllDriver } from '@/api/company/driverManage'
import { getSystemTime } from '@/api/common'
export default {
  components: {
    SelectTree,
    SelectType,
    addTruckInfo,
    addDriverInfo,
  },
  data() {
    return {
      searchCreatTime: [+new Date() - 60 * 24 * 60 * 60 * 1000, +new Date()],
      pickerOptions2: {
        shortcuts: pickerOptions2
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
      intelligentData: {
        // loadTime: parseTime(new Date()),
        requireArrivedTime: '',
        planArrivedTime: '',
        orgid: '',
        dirverName: '',
        dirverMobile: '',
        truckIdNumber: '',
        truckVolume: '',
        truckWidth: '',
        // truckLoad: '',
        // truckVolume: ''
      },
      changeDriverKey: '',
      changeTruckKey: '',
      rules: {},
      showCurrenFormStyle: [true],
      btnsize: 'mini',
      formModel: {
        arriveOrgid: ''
      },
      currentIndex: 0,
      formModelRules: {},
      changeNumCN: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'],
      dataList: [{}, {}, {}],
      pretruckDisable: true,
      nexttruckDisable: false
    }
  },
  mounted() {
    this.init()
    this.getSystemTime()
  },
  activated() {
    this.init()
    this.getSystemTime()
  },
  methods: {
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
    getSystemTime() { // 获取系统时间
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
      this.getDrivers(this.otherinfo.orgid)
      this.getTrucks(this.otherinfo.orgid)
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
    submitLoad(formName) {
      this.$message({ type: 'warning', message: '计算配载' })
    },
    submitForm(formName) {
      this.$message({ type: 'warning', message: '保存配载' })
    },
    selectCurrentTuck(item, index) {
      this.currentIndex = index
      this.showCurrenFormStyle = []
      this.showCurrenFormStyle[index] = true
      console.log(this.showCurrenFormStyle[index], this.currentIndex)
    },
    addtuck() {

    },
    pretruck() { // 展示上一个车型
      if (this.dataList.length < 2) { // 列表为空或者有一条数据的时候 都不可以切换
        this.pretruckDisable = true
        this.nexttruckDisable = true
      } else {
        if (this.currentIndex === 0) {
          this.pretruckDisable = true
          this.nexttruckDisable = false
        } else {
          --this.currentIndex
          this.showCurrenFormStyle = []
          this.showCurrenFormStyle[this.currentIndex] = true
          this.nexttruckDisable = false
          if (this.currentIndex === 0) {
            this.pretruckDisable = true
          }
        }
      }
    },
    nexttruck() { // 展示下一个车型
      if (this.dataList.length < 2) { // 列表为空或者有一条数据的时候 都不可以切换
        this.pretruckDisable = true
        this.nexttruckDisable = true
      } else {
        if (this.currentIndex === this.dataList.length - 1) {
          this.nexttruckDisable = true
          this.pretruckDisable = false
        } else {
          ++this.currentIndex
          this.showCurrenFormStyle = []
          this.showCurrenFormStyle[this.currentIndex] = true
          this.pretruckDisable = false
          if (this.currentIndex === this.dataList.length - 1) {
            this.nexttruckDisable = true
          }
        }
      }
    }
  }
}

</script>
<style lang="scss">
.loadInfo_wrapper {
  position: relative;
  .loadInfo_btns {
    position: absolute;
    top: 16px;
    right: 20px;
    z-index: 2;
  }
  .loadInfo_tab {
    padding: 10px 10px 0px 10px;
    .el-tabs--border-card {
      box-shadow: none;
      border: 1px solid #cdf;
    }
    .el-tabs--border-card>.el-tabs__content {
      padding: 10px;
    }
    .loadInfo_content {
      display: flex;
      flex-direction: row;
      .content_left {
        border-top: 2px solid rgb(184, 203, 213);
        border-right: 1px solid rgb(232, 233, 234);
        border-bottom: 1px solid rgb(232, 233, 234);
        border-left: 1px solid rgb(232, 233, 234);
        padding: 10px 5px 0 10px;
        .el-form {
          padding-top: 15px;
        }
        .el-form-item--mini.el-form-item,
        .el-form-item--small.el-form-item {
          margin-bottom: 10px;
        }
      }
      .loadInfo_collapse {
        width: 100%;
        border-top: 2px solid rgb(184, 203, 213);
        border-right: 1px solid rgb(232, 233, 234);
        border-bottom: 1px solid rgb(232, 233, 234);
        border-left: 1px solid rgb(232, 233, 234);
        padding: 0px;
        margin-left: 10px;
        position: relative;
        .el-form-item--mini.el-form-item,
        .el-form-item--small.el-form-item {
          margin-bottom: 10px;
        }
        .el-button {
          white-space: normal;
          border-radius: 0px;
        }
        .verticalBtn {
          width: 45px;
          height: 110px;
          padding: 10px;
          font-family: '微软雅黑';
          background-color: #fff;
          border: 1px solid #0588c3;
          font-size: 16px;
          line-height: 20px;
          word-wrap: break-word;
          color: #0588c3;
          font-weight: 600;
        }
        .verticalBtn:hover {
          color: #fff;
          transition: 0.3s;
          background-color: #0588c3;
        }
        .verticalBtnActive {
          color: #fff;
          background-color: #0588c3;
        }
        .loadInfo_collapse_list {
          width: 100%;
          display: flex;
          flex-direction: row;
          overflow: hidden;
          .verticalBtnAdd {
            float: right;
            right: 0px;
            top: 0;
          }
          .verticalBtnTransfer {
            display: flex;
            flex-direction: column;
            position: absolute;
            right: 0px;
            top: 0px;
            .el-button+.el-button {
              margin-left: 0px;
            }
            .el-button {
              padding: 10px;
            }
            .verticalBtnSort {
              width: 45px;
              height: 55px;
            }
          }
          .loadInfo_item {
            display: flex;
            flex-direction: row;
            .loadInfo_item_form {
              padding-top: 15px;
              min-width: 1010px;
              display: inline-block;
              .loadInfo_item_form_row {
                display: flex;
                flex-direction: row;
                margin-bottom: 10px;
                margin-top: 10px;
                .el-form-item {
                  margin-bottom: 0px;
                }
                .el-form-item--mini.el-form-item,
                .el-form-item--small.el-form-item {
                  margin-bottom: 0px;
                }
              }
            }
          }
        }
      }
    }
  }
}

</style>
