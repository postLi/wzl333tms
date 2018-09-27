<template>
  <div class="loadInfo_wrapper">
    <div class="loadInfo_btns clraefix">
      <el-button :type="isSubmitLoad ? 'info' : 'primary'" @click="submitLoad" icon="el-icon-refresh" plain size="mini" :disabled="isSubmitLoad">计算配载
      </el-button>
      <el-button type="success" @click="submitForm" icon="el-icon-document" plain size="mini">保存配载
      </el-button>
      <el-button type="danger" @click="cancelButtonText" icon="el-icon-circle-close-outline" plain size="mini">取消
      </el-button>
    </div>
    <div class="loadInfo_tab">
      <el-tabs type="border-card">
        <el-tab-pane label="方案一">
          <div class="loadInfo_content">
            <div class="content_left">
              <el-form :model="intelligentLeftData" :size="btnsize" ref="formModel" label-width="65px">
                <el-form-item label="到达网点" prop="arriveOrgid">
                  <SelectTree v-model="intelligentLeftData.arriveOrgid" :orgid="otherinfo.orgid" clearable class="orgClass" disabled></SelectTree>
                  <!--<el-input v-model="intelligentLeftData.arriveOrgid" disabled></el-input>-->
                </el-form-item>
                <el-form-item label="分摊方式" prop="apportionTypeId">
                  <selectType v-model="intelligentLeftData.apportionTypeId" type="apportion_type" clearable size="mini" class="apportClass"></selectType>
                </el-form-item>
              </el-form>
            </div>
            <div class="loadInfo_collapse">
              <el-form :model="intelligentData" :rules="rules" ref="ruleForm" label-width="100px" :inline="true" label-position="right" size="mini" class="loadInfo_collapse_list" :key="valkey">
                <div class="loadInfo_item" v-for="(item, index) in showCurPagesData.dataList" :style="{width: showCurrenFormStyle[item._index]?'calc(100% - 183px)': '',transition:'0.5s'}">
                  <el-button class="verticalBtn" @click="selectCurrentTuck(item._index,item)" :class="{'verticalBtnActive':showCurrenFormStyle[item._index]}">
                    <i class="lll-ntelligent-del" :class="{'lll-ntelligent-delActive':showCurrenFormStyle[item._index]}" @click="delCurTruck(item._index,item)"></i> 车型{{ changeNumCN[item._index]}}
                  </el-button>
                  <div class="loadInfo_item_form" v-show="showCurrenFormStyle[item._index]">
                    <div class="loadInfo_item_form_row">
                      <el-form-item label="车型" class="nameClass">
                        <!-- <el-input disabled :size="btnsize" v-model="item.name"></el-input> -->
                        <el-select v-model="item.name" placeholder="请选择">
                          <el-option
                            v-for="t in truckOptions"
                            :key="t.cid"
                            :label="t.name"
                            :value="t.name">
                          </el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="车牌号" :key="changeTruckKey" :prop="`dataList.${index}.truckIdNumber`" class="formItemTextDanger" :rules="{required: true, message: '请选择车牌号~', trigger: 'blur'}">
                        <el-autocomplete popper-class="lll-autocomplete" v-model="item.truckIdNumber" :fetch-suggestions="querySearchTruck" placeholder="车牌号码" size="mini" @select="(val) => handleSelectTruckNum(val,item._index)" auto-complete="off" @blur="blurTruck" :maxlength="8">
                          <i class="intAddF" slot="suffix" @click="doAction('addTruck')"><icon-svg icon-class="inadd_lll"></icon-svg></i>
                          <template slot-scope="{ item }">
                            <div class="name">{{ item.truckIdNumber }}</div>
                            <span class="addr">{{ item.driverName }}</span>
                            <br>
                            <span class="addr">{{ item.dirverMobile}}</span>
                          </template>
                        </el-autocomplete>
                      </el-form-item>
                      <!--</el-form-item>-->
                      <el-form-item label="可载方(方)" prop="">
                        <el-input v-model="item.volume" :maxlength="3" @change="(val) =>changeLoadNum(val, item._index, 'volume')">
                        </el-input>
                      </el-form-item>
                      <el-form-item label="可载重(千克)" prop="">
                        <el-input v-model="item.weight" :maxlength="3" @change="(val) =>changeLoadNum(val, item._index, 'weight')">
                        </el-input>
                      </el-form-item>
                    </div>
                    <div class="loadInfo_item_form_row">
                      <el-form-item label="车费">
                        <el-input :size="btnsize" v-model="item.price">
                          <i class="intEditF" slot="suffix" @click="addFreight(item.price, item._index, item)"><icon-svg icon-class="intlDel_lll"></icon-svg></i>
                        </el-input>
                      </el-form-item>
                      <el-form-item label="司机" class="formItemTextDanger" :key="changeDriverKey" :prop="'dataList.'+index+'.dirverName'" :rules="{required: true, message: '请选择司机~', trigger: 'change'}">
                        <el-autocomplete popper-class="lll-autocomplete" v-model="item.dirverName" :fetch-suggestions="querySearch" placeholder="司机名称" size="mini" @select="(val) => handleSelectName(val, item._index)" auto-complete="off" :maxlength="10">
                          <i class="intAddF" slot="suffix" @click="doAction('addDriver')">
                            <icon-svg icon-class="inadd_lll"></icon-svg>
                          </i>
                          <template slot-scope="{ item }">
                            <div class="name">{{ item.driverName }}</div>
                            <span class="addr">{{ item.driverMobile }}</span>
                            <br>
                            <span class="addr">{{ item.truckIdNumber }}</span>
                          </template>
                        </el-autocomplete>
                      </el-form-item>
                      <el-form-item label="司机电话" :prop="'dataList.'+index+'.dirverMobile'" :rules="{required: true, message: '请选择司机电话~', trigger: 'change'}" class="formItemTextDanger">
                        <el-input v-model="item.dirverMobile" :maxlength="11"></el-input>
                      </el-form-item>
                      <el-form-item label="到达日期">
                        <el-date-picker size="mini" v-model="item.planArrivedTime" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="预计到达时间">
                        </el-date-picker>
                      </el-form-item>
                    </div>
                  </div>
                </div>
                <el-button class="verticalBtn verticalBtnAdd clearfix" :disabled="addDisabled" @click="addtuck">增加+</el-button>
                <div class="verticalBtnTransfer" v-if="viewControl">
                  <el-button class="verticalBtnSort" @click="pretruck" icon="el-icon-d-arrow-left" :disabled="pretruckDisable2"></el-button>
                  <el-button class="verticalBtnSort" @click="nexttruck" icon="el-icon-d-arrow-right" :disabled="nexttruckDisable2"></el-button>
                </div>
              </el-form>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <addTruckInfo :truckSources="truckSources" :truckTypes="truckTypes" :issender="true" :isModify="isModify" :info="selectInfo" :orgid="otherinfo.orgid" :popVisible.sync="addTruckVisible" @close="closeAddTruckVisible" @success="fetchData"></addTruckInfo>
    <addDriverInfo :licenseTypes="licenseTypes" :issender="true" :isModifyDriver="isModifyDriver" :infoDriver="selectInfoDriver" :orgid="otherinfo.orgid" :popVisible.sync="addDriverVisible" @close="closeAddDriver" @success="fetchData"></addDriverInfo>
    <AddLntelligentFreight :popVisible.sync="lntelligentFVisible" @close="openlntelligent" @getIntFreight="getIntFreight" :intFreightItem="intFreightItem" :sendDataList="intelligentData.dataList" :intFreightIndex="intFreightIndex"></AddLntelligentFreight>
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
import { getDrivers, getTrucK, postLoadInfo } from '@/api/operation/load'
import { getAllDriver } from '@/api/company/driverManage'
import { getSystemTime } from '@/api/common'
import AddLntelligentFreight from './intelligentFreight'
import { postIntnteSmartLoad } from '@/api/operation/arteryDepart'
import {getIntnteSMainInfoList} from '@/api/operation/arteryDepart'

export default {
  components: {
    SelectTree,
    SelectType,
    addTruckInfo,
    addDriverInfo,
    AddLntelligentFreight
  },
  props: {
    orgid: [Number, String],
    dofo: [Array, Object],
    model: [Array, Object],
    loadTable: {
      type: Array
    },
    paramTuck: {
      type: [Array, Object],
      default: () => {}
    }
  },
  computed: {
    ...mapGetters([
      'otherinfo'
    ]),
    addDisabled() {
      if (this.intelligentData.dataList.length >= this.maxDataLength) {
        return true
      }
      return false
    },
    pretruckDisable2() {
      if (this.currentIndex < 1) {
        return true
      }
      return false
    },
    nexttruckDisable2() {
      if ((this.intelligentData.dataList.length - 1) <= this.currentIndex) {
        return true
      }
      return false
    },
    viewControl() {
      if (this.intelligentData.dataList && this.intelligentData.dataList.length > this.maxShowLen) {
        return true
      } else {
        return false
      }
    }
  },
  data() {
    return {
      truckOptions: [],
      noLoadListCount: 0,
      intFreightItem: {},
      intFreightIndex: '',
      intFreight: '',
      intFreightObj: {},
      sendorgid: '',
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
      lntelligentFVisible: false,
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
      intelligentRouterData: [],
      intelligentData: {
        orgid: '',
        dataList: []
      },
      intelligentLeftData: {
        contractNo: '',
        batchNo: '',
        batchTypeId: 52,
        loadTypeId: 39,
        truckIdNumber: '',
        dirverName: '',
        dirverMobile: '',
        truckLoad: '',
        truckVolume: '',
        loadTime: parseTime(new Date()),
        planArrivedTime: '',
        requireArrivedTime: '',
        truckUserId: '',
        remark: ''
      },
      // intelligentLeftData: {
      //   apportionTypeId: '',
      //   arriveOrgid: '',
      // },
      searchTable: {},
      changeDriverKey: '',
      changeTruckKey: '',
      rules: {
        truckIdNumber: [
          { required: true, message: '请选择车牌号~' }
        ],
        dirverName: [
          { required: true, message: '请选择司机~' }
        ],
        dirverMobile: [
          { required: true, message: '请选择司机电话~' }
        ]
        // truckIdNumber: [{required: true, validator: this.validateIsEmpty('请选择车牌号!'), trigger: 'blur'}]
      },
      showCurrenFormStyle: [true],
      btnsize: 'mini',
      formModel: {
        arriveOrgid: ''
      },
      currentIndex: 0,
      formModelRules: {},
      changeNumCN: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二', '十三', '十四'],
      dataList: [],
      pretruckDisable: true,
      nexttruckDisable: false,
      loadDataArray: [],
      maxShowLen: 3,
      maxDataLength: 20,
      truckTotalPage: 0,
      isShowCurPages: true,
      showCurPagesData: {
        dataList: []
      },
      isSubmitLoad: true,
      preDelDataList: [],
      feeData: {
        nowpayCarriage: 0,
        nowpayOilCard: '',
        backpayCarriage: '',
        backpayOilCard: '',
        arrivepayCarriage: '',
        arrivepayOilCard: '',
        carloadInsuranceFee: '',
        leaveHandlingFee: '',
        leaveOtherFee: '',
        arriveHandlingFee: '',
        arriveOtherFee: ''
      }
    }
  },
  watch: {
    orgid: {
      handler(newVal) {
        this.intelligentLeftData.arriveOrgid = this.orgid
      },
      deep: true
    },
    dofo: {
      handler(newVal) {
        if (!this.inited2) {
          this.intelligentData.dataList = Object.assign([], this.dofo)
          this.intelligentData.dataList.forEach((e, index) => {
            this.inited2 = true
            e.loadTime = parseTime(new Date())
            // e.planArrivedTime = parseTime(new Date())
            e.weight = e.weight ? e.weight : 0
            e.volume = e.volume ? e.volume : 0
            e._index = index
            this.$set(e, 'tmsOrderLoadFee', this.feeData)
            this.$set(e.tmsOrderLoadFee, 'nowpayCarriage', e.price)
          })
          this.showCurPagesData = Object.assign({}, this.intelligentData)

          this.setCurPageView(0) // 设置显示
          this.$emit('truckIndex', this.currentIndex)
          this.$emit('truckPrecent', this.intelligentData.dataList[0])
        }
      }
    },
    loadTable: {
      handler(cval, oval) {}
    },
    paramTuck: {
      handler(cval, oval) {
        // 计算配载按钮显示可用
        this.isSubmitLoad = false
        // 替换车型列表 并显示
        let selArr = []
        // 保存需要去除的运单
        if (cval.length < this.intelligentData.dataList.length) {
          this.preDelDataList = this.intelligentData.dataList.slice(cval.length, this.intelligentData.dataList.length)
        } else {
          this.pretruckDisable = []
        }
        cval.forEach((e, index) => {
          selArr.push({
            name: e.name,
            cid: e.cid,
            volume: e.vol ? e.vol : 0,
            weight: e.weight ? e.weight : 0,
            price: e.price,
            carDriver: '',
            tagid: e.tagid,
            carDriverId: '',
            carDriverPhone: '',
            carId: '',
            carLoadDetail: this.intelligentData.dataList[index] ? this.intelligentData.dataList[index].carLoadDetail : [],
            carNo: '',
            reachDate: '',
            spri: '',
            svol: '',
            swei: '',
            url: '',
            loadTime: parseTime(new Date()),
            tmsOrderLoadFee: this.feeData,
            planArrivedTime: '',
            requireArrivedTime: '',
            _index: index
          })
        })

        this.intFreightIndex = 0
        this.currentIndex = 0
        this.showCurrenFormStyle = []
        this.showCurrenFormStyle[this.currentIndex] = true
        this.$emit('truckIndex', this.currentIndex)
        this.intelligentData.dataList = Object.assign([], selArr)
        selArr = []
        this.setCurPageView(0) // 设置显示
        this.showCurPagesData = Object.assign({}, this.intelligentData)
        // 如果选择的车型比之前的车型列表数量少 就要把运单返回到左边列表
        this.$emit('resetTrucDelList')
      }
    }
  },
  mounted() {
    this.converToCn()
    this.init()
    this.getSystemTime()
    this.intelligentLeftData.arriveOrgid = this.orgid
  },
  methods: {
    converToCn() {
      let i = 0
      let arr = ['十', '一', '二', '三', '四', '五', '六', '七', '八', '九']
      this.changeNumCN = []
      while (i++ < 99) {
        let nums = (i + '').split('')
        let str = nums[1] ? (nums[0] === '1' ? '' : arr[nums[0]]) + '十' + (nums[1] === '0' ? '' : arr[nums[1]]) : arr[nums[0]]
        if (i === 10) {
          str = '十'
        }
        this.changeNumCN.push(str)
      }
    },
    setCurPageView(index) { // 设置只显示三个车型
      let maxShowLen = this.maxShowLen // 最多显示车型数量
      let orgLen = this.intelligentData.dataList ? this.intelligentData.dataList.length : 0 // 车型列表的长度
      if (orgLen) {
        if (orgLen > maxShowLen) {
          if (index + maxShowLen > orgLen) {
            index = orgLen - maxShowLen
          }

          this.showCurPagesData.dataList = this.intelligentData.dataList.slice(index, index + 3)
        } else {
          this.showCurPagesData.dataList = this.intelligentData.dataList
        }
      } else {
        this.showCurPagesData.dataList = []
      }
    },
    validateIsEmpty(msg = '不能为空！') {
      return (rule, value, callback) => {
        if (!value) {
          // this.showMessage(msg)
          callback(new Error(msg))
        } else {
          callback()
        }
      }
    },
    getIntFreight(data) {
      this.intFreight = data.val
      this.intFreightObj = data.obj
      this.$set(this.intelligentData.dataList[this.intFreightIndex], 'price', this.intFreight)
      this.$set(this.intelligentData.dataList[this.intFreightIndex], 'tmsOrderLoadFee', this.intFreightObj)
      console.log('getIntFreight', data)
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
    cancelButtonText() {
      this.$confirm('页面没保存，确定关闭吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '已关闭成功!'
        });
        this.eventBus.$emit('replaceCurrentView', '/operation/order/arteryDepart')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已成功取消!'
        });
      });
    },
    addFreight(val, index, item) {
      console.log(item.tmsOrderLoadFee, 'tmsOrderLoadFee')
      this.intFreightItem = Object.assign({}, item.tmsOrderLoadFee)
      this.intFreightIndex = index
      this.openlntelligent()
    },
    getSystemTime() { // 获取系统时间

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
    initInfo() { // 车牌号和司机信息 init
      this.loading = false
      this.changeDriverKey = Math.random()
      this.changeTruckKey = Math.random()
      this.Drivers = this.$options.data().Drivers
      this.Trucks = this.$options.data().Trucks
      this.cacheDriverList = this.$options.data().cacheDriverList
      this.cacheTruckList = this.$options.data().cacheTruckList
      // 切换组织了列表时更新司机列表信息
      this.getDrivers(this.otherinfo.orgid)
      this.getTrucks(this.otherinfo.orgid)
      this.getSystemTruck()
    },
    getSystemTruck () {
      let obj = {
          pageNum: 1,
          pageSize: 100
        }
      getIntnteSMainInfoList(obj).then(data => {

        this.truckOptions = data.list
        console.log('truckOptions', this.truckOptions, data)
      })
    },
    getDrivers(orgid) {
      if (this.cacheDriverList[orgid]) {
        this.Drivers = this.cacheDriverList[orgid]
      } else {
        getDrivers().then(data => {
          this.Drivers = data.data
          this.cacheDriverList[orgid] = data.data

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
        }).catch(err => {
          this._handlerCatchMsg(err)
        })
      }
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
    },
    handleSelectName(item, index) {
      this.changeDriverKey = Math.random()
      if (this.intelligentData.dataList[index].truckIdNumber === '' || this.intelligentData.dataList[index].truckIdNumber === undefined) {
        this.intelligentData.dataList[index].truckIdNumber = item.truckIdNumber
      }
      this.$set(this.intelligentData.dataList[index], 'dirverMobile', item.dirverMobile)
      this.$set(this.intelligentData.dataList[index], 'dirverName', item.driverName)
      this.isDriverSelect = true
    },
    handleSelectTruckNum(item, index) {
      this.changeTruckKey = Math.random()
      this.$set(this.intelligentData.dataList[index], 'truckIdNumber', item.truckIdNumber)
      this.$set(this.intelligentData.dataList[index], 'dirverMobile', item.driverMobile)
      this.$set(this.intelligentData.dataList[index], 'dirverName', item.driverName)

      this.$set(this.intelligentData.dataList[index], 'truckLoad', Number(item.truckLoad))
      this.$set(this.intelligentData.dataList[index], 'truckVolume', Number(item.truckVolume))
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
    openlntelligent() {
      this.lntelligentFVisible = true
    },
    submitLoad() { // 结算配载
      if (!this.paramTuck || this.paramTuck.length < 1) {
        this.$message.warning('请进行参数设置')
      } else {
        let arr = []
        this.paramTuck.forEach(e => {
          arr.push({
            cid: e.cid,
            price: e.price
          })
        })
        this.loading = true
        this.$router.push({
          path: '/operation/order/loadIntelligent/components/intelligentImg',
          query: {
            orgId: this.$route.query.orgId,
            sendData: JSON.stringify(arr)
          }
        })
        this.eventBus.$emit('closeCurrentView')
      }
    },
    setData() { // 设置提交给后台的数据结构
      let arr = []
      let data = {} // 数组中的单个对象
      arr = Object.assign([], this.intelligentData.dataList)
      arr.forEach((e, index) => {
        this.$set(arr[index], 'carLoadDetail', this.loadTable[index] ? this.loadTable[index] : [])
        // if (index === this.intFreightIndex) {
        //   this.$set(arr[index], 'tmsOrderLoadFee', this.intFreightObj)
        // } else {}
      })

      arr.forEach((e, index) => {
        let curinfo = {
          apportionTypeId: this.intelligentLeftData.apportionTypeId,
          arriveOrgid: this.intelligentLeftData.arriveOrgid,
          contractNo: e.contractNo || '',
          batchNo: e.batchNo || '',
          batchTypeId: this.intelligentLeftData.batchTypeId,
          truckIdNumber: e.truckIdNumber,
          dirverName: e.dirverName,
          dirverMobile: e.dirverMobile,
          truckLoad: e.truckLoad,
          truckVolume: e.truckVolume,
          loadTime: e.loadTime,
          planArrivedTime: e.planArrivedTime,
          requireArrivedTime: e.requireArrivedTime,
          truckUserId: e.truckUserId,
          loadTypeId: this.intelligentLeftData.loadTypeId,
          orgid: this.otherinfo.orgid,
          remark: e.remark
        }
        this.$set(e, 'tmsOrderLoad', curinfo)
        this.$set(data, 'tmsOrderLoad', e.tmsOrderLoad)
        this.$set(data, 'tmsOrderLoadFee', e.tmsOrderLoadFee)

        e.carLoadDetail.forEach(em => {
          em.loadAmount = em.repertoryAmount
          em.loadWeight = em.repertoryWeight
          em.loadVolume = em.repertoryVolume
        })
        this.$set(data, 'tmsOrderLoadDetailsList', e.carLoadDetail)
        this.$set(this.loadDataArray, index, data)
        data = {}
        curinfo = {}
        // this.loadDataArray = this.loadDataArray.filter((e, index) => {
        //   return (e.tmsOrderLoadDetailsList && e.tmsOrderLoadDetailsList.length > 0)
        // })
        this.loadDataArray.forEach(e => { // 计算几个车型 是否有配载清单为空的 如果为空就加一不可以提交
          if (e.tmsOrderLoadDetailsList.length === 0) {
            this.noLoadListCount++
          }
        })

      })

    },
    submitForm() {
      this.$refs['formModel'].validate((valid) => {
        if (valid) {
          this.$refs['ruleForm'].validate((valid) => {
            if (valid) {
              this.loading = true
              this.setData()
              if (this.noLoadListCount > 0) { // 判断右边的表格时候为空 清单不能为空
                this.$message.warning('配载清单不可以为空')
                this.noLoadListCount = 0
                return false
              } else {
                postIntnteSmartLoad(this.loadDataArray).then(res => {
                  this.$message({ type: 'success', message: '保存配载成功！' })
                  this.$router.push({ path: '/operation/order/arteryDepart', query: { pageKey: new Date().getTime() } })
                  this.eventBus.$emit('replaceCurrentView', '/operation/order/arteryDepart')
                  this.loading = false
                }).catch(err => {
                  this.$message.error('错误：' + (err.text || err.errInfo || err.data || JSON.stringify(err)))
                  this.loading = false
                })
              }

            } else {
              return false
            }
          })
        }
      })
    },
    changeLoadNum(val, index, type) {
      this.$emit('truckPrecent', this.intelligentData.dataList[index])
    },
    selectCurrentTuck(index, item) {
      this.currentIndex = index
      this.showCurrenFormStyle = []
      this.showCurrenFormStyle[index] = true
      this.$emit('truckIndex', this.currentIndex)
      this.$emit('truckPrecent', this.intelligentData.dataList[this.currentIndex])
    },
    delCurTruck(index, item) {
      this.showCurrenFormStyle = []
      this.currentIndex = index - 1
      this.$emit('delCurTruck', {
        number: index,
        list: this.intelligentData.dataList[index]
      })
      this.intelligentData.dataList.splice(index, 1)
      var len = this.intelligentData.dataList.length
      var flag
      while (len--) {
        if (this.showCurrenFormStyle[len]) {
          this.currentIndex = len
          flag = true
          break
        }
      }
      if (!flag) {
        this.showCurrenFormStyle[this.currentIndex] = true
      }
      this.$emit('truckIndex', this.currentIndex)
      this.$message.info('已删除')
      setTimeout(() => {
        this.intelligentData.dataList.forEach((el, index) => {
          this.$set(this.intelligentData.dataList, index, Object.assign(el, { '_index': index }))
        })
      }, 500)
      this.setCurPageView(this.currentIndex) // 设置显示
    },
    addtuck() {
      var index = this.intelligentData.dataList.length
      if (index > this.maxDataLength) {
        return false
      }
      this.intelligentData.dataList.push({
        contractNo: '',
        batchNo: '',
        batchTypeId: 52,
        loadTypeId: 39,
        truckIdNumber: '',
        dirverName: '',
        dirverMobile: '',
        truckLoad: '',
        truckVolume: '',
        loadTime: parseTime(new Date()),
        planArrivedTime: '',
        requireArrivedTime: '',
        truckUserId: '',
        remark: '',
        price: 0,
        carLoadDetail: [],
        _index: index
      })
      this.$emit('addOrgRightTable')
      this.showCurrenFormStyle = []
      this.showCurrenFormStyle[index] = true
      this.currentIndex = index
      this.setCurPageView(index - 2) // 设置显示
      this.$emit('truckIndex', this.currentIndex)
      this.$emit('truckPrecent', this.intelligentData.dataList[this.currentIndex])

    },
    pretruck() { // 展示上一个车型
      if (this.intelligentData.dataList.length < 2) { // 列表为空或者有一条数据的时候 都不可以切换
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
          this.setCurPageView(this.currentIndex) // 设置显示
          if (this.currentIndex === 0) {
            this.pretruckDisable = true
          }
        }
        this.$emit('truckPrecent', this.intelligentData.dataList[this.currentIndex])
      }
      this.$emit('truckIndex', this.currentIndex)
    },
    nexttruck() { // 展示下一个车型
      if (this.intelligentData.dataList.length < 2) { // 列表为空或者有一条数据的时候 都不可以切换
        this.pretruckDisable = true
        this.nexttruckDisable = true
      } else {
        if (this.currentIndex === this.intelligentData.dataList.length - 1) {
          this.nexttruckDisable = true
          this.pretruckDisable = false
        } else {
          ++this.currentIndex
          this.showCurrenFormStyle = []
          this.showCurrenFormStyle[this.currentIndex] = true
          this.pretruckDisable = false
          this.setCurPageView(this.currentIndex) // 设置显示
          if (this.currentIndex === this.intelligentData.dataList.length - 1) {
            this.nexttruckDisable = true
          }
        }
      }
      this.$emit('truckIndex', this.currentIndex)
      this.$emit('truckPrecent', this.intelligentData.dataList[this.currentIndex])
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
      .el-tabs__header.is-top {
        .el-tabs__nav-wrap {
          // background: rgb(251, 255, 244);
        }
      }
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
          .orgClass {
            .el-input.is-disabled {
              .el-input__inner {
                color: #606266;
              }
            }
          }
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
          display: flex;
          flex-direction: row;
        }
        .el-button {
          white-space: normal;
          border-radius: 0px;
        }
        .verticalBtn {
          width: 40px;
          height: 110px;
          padding: 10px;
          font-family: '微软雅黑';
          background-color: #fff;
          border: 1px solid rgb(5, 136, 195);
          font-size: 16px;
          line-height: 20px;
          word-wrap: break-word;
          color: rgb(5, 136, 195);
          font-weight: 600;
          position: relative;
        }
        .verticalBtn:hover {
          color: #fff;
          transition: 0.3s;
          background-color: #0c6e9b;
        }
        .verticalBtnActive {
          color: #fff;
          background-color: rgb(5, 136, 195);
        }

        .verticalBtn:hover i.lll-ntelligent-del::before {
          background-image: url(../../../../../assets/icom/load/07sc.png);
          background-repeat: no-repeat;
          transition: 0.3s;
        }
        i.lll-ntelligent-del:before {
          content: '';
          display: block;
          position: absolute;
          top: 0px;
          right: -7px;
          width: 20px;
          height: 20px;
          background-image: url(../../../../../assets/icom/load/09sc.png);
          background-repeat: no-repeat;
          transition: 0.3s;
        }

        i.lll-ntelligent-delActive:before {
          content: '';
          display: block;
          position: absolute;
          top: 0px;
          right: -7px;
          width: 20px;
          height: 20px;
          background-image: url(../../../../../assets/icom/load/07sc.png);
          background-repeat: no-repeat;
          transition: 0.3s;
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
              padding-top: 15px; // width: 1200px;
              display: inline-block;

              .loadInfo_item_form_row {
                display: flex;
                flex-direction: row;
                margin-bottom: 10px;
                margin-top: 10px;
                .formItemTextDanger {
                  .el-form-item__label {
                    color: #ef0000;
                  }
                }
                .el-form-item {
                  width: 100%;
                  margin-bottom: 0px;
                  .el-input {
                    width: 100%; // min-width: 120px;
                    // max-width: 153px;
                    .el-input__inner {
                      padding: 0 5px;
                    }
                  }
                }
                .el-form-item.nameClass {
                  .el-input.is-disabled {
                    .el-input__inner {
                      color: #606266;
                    }
                  }
                }
                .el-form-item--mini.el-form-item,
                .el-form-item--small.el-form-item {
                  margin-bottom: 0px;
                }
                .el-input-group__append,
                .el-input-group__prepend {
                  padding: 0 5px;
                }
              }
            }
          }
          i.intEditF {
            font-size: 20px;
            cursor: pointer;
          }
          i.intAddF {
            font-size: 20px;
            cursor: pointer;
          }
        }
      }
    }
  }
}

.lll-autocomplete {
  li {
    line-height: normal;
    padding: 7px;
    .name,
    .addr {
      font-size: 12px;
    }
  }
}

</style>
