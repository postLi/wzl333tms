<template>
  <div class="loadInfo_wrapper" v-loading="loading">
    <div class="loadInfo_btns clraefix">
      <el-button type="primary" @click="saveForm" icon="el-icon-document" plain size="mini" :loading="saveLoading">保存当前方案
      </el-button>
      <el-button type="success" @click="dialogVisible = true" icon="el-icon-document" plain size="mini" :loading="submitLoading">存为配载单
      </el-button>
      <el-button :type="isSubmitLoad ? 'info' : 'primary'" @click="submitLoad" icon="el-icon-refresh" plain size="mini">计算配载
      </el-button>
      <el-button type="danger" @click="dialogCloseVisible = true" icon="el-icon-circle-close-outline" plain size="mini">关闭
      </el-button>
    </div>
    <div class="loadInfo_tab">
      <el-tabs type="border-card" v-model="activeTab" :closable="transpList && transpList.length !==1" @tab-remove="removeTab" @tab-click="tabSelect" ref="schemeTab">
        <el-tab-pane :label="(transpIndex === 0 ? '原始方案' :'方案'+changeNumCN[transpIndex])" v-for="(transpItem, transpIndex) in transpList" :key="transpIndex" :name="transpIndex + ''" :object="orgTranspList">
          <div class="loadInfo_content">
            <div class="content_left">
              <el-form :model="intelligentLeftData" :size="btnsize" ref="formModel" label-width="65px">
                <el-form-item label="到达网点" prop="arriveOrgid">
                  <SelectTree v-model="intelligentLeftData.arriveOrgid" clearable class="orgClass" disabled></SelectTree>
                  <!--<el-input v-model="intelligentLeftData.arriveOrgid" disabled></el-input>-->
                </el-form-item>
                <el-form-item label="分摊方式" prop="apportionTypeId">
                  <selectType v-model="intelligentLeftData.apportionTypeId" type="apportion_type" clearable size="mini" class="apportClass"></selectType>
                </el-form-item>
              </el-form>
            </div>
            <div class="loadInfo_collapse">
              <el-form :model="intelligentData" :rules="rules" ref="ruleForm" label-width="90px" :inline="true" label-position="right" size="mini" class="loadInfo_collapse_list" :key="valkey">
                <div class="loadInfo_collapse_list_content">
                  <p class="loadInfo_tips" v-if="isEmptyTruck">无数据，点击右边添加车型</p>
                  <div class="loadInfo_item" v-for="(item, index) in showCurPagesData.dataList" :style="{width: showCurrenFormStyle[item._index]?'100%': '',transition:'0.5s'}">
                    <el-button class="verticalBtn" @click="selectCurrentTuck(item._index,item)" :dataindex="item._index + ' : ' + showCurrenFormStyle[item._index]" :class="{'verticalBtnActive':showCurrenFormStyle[item._index]}">
                      <i class="lll-ntelligent-del" :class="{'lll-ntelligent-delActive':showCurrenFormStyle[item._index]}" @click.stop.prevent="delCurTruck(item._index,item)"></i> 车型{{ changeNumCN[item._index]}}
                    </el-button>
                    <div class="loadInfo_item_form" v-show="showCurrenFormStyle[item._index]">
                      <div class="loadInfo_item_form_row">
                        <el-form-item label="车型" class="nameClass">
                          <el-select v-model="item.name" placeholder="请选择" @change="(val) => handleTuckOptions(val, item, item._index)">
                            <el-option v-for="t in truckOptions" :key="t.cid" :label="t.name" :value="t.name">
                            </el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item label="车牌号" :key="changeTruckKey" :prop="`dataList.${index}.truckIdNumber`" class="formItemTextDanger" :rules="{required: true, message: '请选择车牌号~', trigger: ['blur', 'change']}">
                          <el-autocomplete popper-class="lll-autocomplete" v-model="item.truckIdNumber" :fetch-suggestions="querySearchTruck" placeholder="车牌号码" size="mini" @select="(val) => handleSelectTruckNum(val,item._index)" auto-complete="off" :maxlength="8">
                            <i class="intAddF" slot="suffix" @click="doAction('addTruck')"><icon-svg icon-class="inadd_lll"></icon-svg></i>
                            <template slot-scope="{ item }">
                              <div class="name">{{ item.truckIdNumber }}</div>
                              <span class="addr">{{ item.driverName }}</span>
                              <br>
                              <span class="addr">{{ item.dirverMobile}}</span>
                            </template>
                          </el-autocomplete>
                        </el-form-item>
                        <el-form-item label="可载方(方)" prop="volume">
                          <input type="text" class="nativeinput" v-numberOnly :value="item.volume" @change="(e)=>changeLoadNum(e.target.value, item._index, 'volume')" ref="volume" :maxlength="3" />
                          </el-input>
                        </el-form-item>
                        <el-form-item label="可载重(千克)" prop="weight">
                          <input type="text" class="nativeinput" v-numberOnly :value="item.weight" @change="(e)=>changeLoadNum(e.target.value, item._index, 'weight')" ref="weight" :maxlength="6" />
                          </el-input>
                        </el-form-item>
                      </div>
                      <div class="loadInfo_item_form_row">
                        <el-form-item label="车费">
                          <input type="text" class="nativeinput" v-numberOnly:point :value="item.price" @change="(e)=>changeLoadNum(e.target.value, item._index, 'price')" ref="price" :maxlength="15">
                          <i class="intEditF" @click="addFreight(item.price, item._index, item)"><icon-svg icon-class="intlDel_lll"></icon-svg></i>
                          </input>
                        </el-form-item>
                        <el-form-item label="司机" class="formItemTextDanger" :key="changeDriverKey" :prop="'dataList.'+index+'.dirverName'" :rules="{required: true, message: '请选择司机~', trigger: ['blur', 'change']}">
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
                        <el-form-item label="司机电话" :prop="'dataList.'+index+'.dirverMobile'" :rules="{required: true, message: '司机电话不能为空~', trigger: ['blur', 'change']}" class="formItemTextDanger">
                          <el-input v-model="item.dirverMobile" :maxlength="11"></el-input>
                        </el-form-item>
                        <el-form-item label="到达日期">
                          <el-date-picker size="mini" v-model="item.planArrivedTime" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="预计到达时间">
                          </el-date-picker>
                        </el-form-item>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="verticalBtn_college">
                  <el-button class="verticalBtn verticalBtnAdd clearfix" :disabled="addDisabled" @click="addtuck">增加+</el-button>
                  <div class="verticalBtnTransfer" v-if="viewControl">
                    <el-button class="verticalBtnSort" @click="pretruck" icon="el-icon-d-arrow-left" :disabled="pretruckDisable2"></el-button>
                    <el-button class="verticalBtnSort" @click="nexttruck" icon="el-icon-d-arrow-right" :disabled="nexttruckDisable2"></el-button>
                  </div>
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
    <!-- 完成配载单 -->
    <el-dialog :title="'您正选择把方案'+changeNumCN[tabInfo.name]+'作为正式配载运单'" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <p>温馨提示：</p>
      <span>1，保存当前配载方案后，其他未被选中的侯选方案同步作废。系统的正式库存亦会同步减少；</span>
      <br />
      <span>2，如果您对当前配载方案不满意，可取消后重新配载，系统库存会恢复为原始状态。</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">返回重选</el-button>
        <el-button type="primary" @click="submitForm" :loading="submitFormLoading">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 关闭 -->
    <el-dialog :title="'当前的1个方案都未保存！'" :visible.sync="dialogCloseVisible" width="30%" :before-close="handleClose">
      <p>当前系列方案还未保存哦！需要保存吗？</p>
      <span>说明：保存或删除配载方案（草稿）不会影响系统的库存，只有使用某一方案作为正式配载运单时，才会减少系统库存。</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelButtonText">不保存</el-button>
        <el-button type="primary" @click="submitLoad">保  存</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import SelectTree from '@/components/selectTree/index'
import { REGEX } from '@/utils/validate'
import { objectMerge2, parseTime, pickerOptions2, tmsMath } from '@/utils/index'
import { mapGetters } from 'vuex'
import SelectType from '@/components/selectType/index'
import addTruckInfo from '@/views/company/trunkManage/components/add'
import addDriverInfo from '@/views/company/driverManage/components/add'
import { getDrivers, getTrucK, postLoadInfo } from '@/api/operation/load'
import { getAllDriver } from '@/api/company/driverManage'
import { getSystemTime } from '@/api/common'
import AddLntelligentFreight from './intelligentFreight'
import { postIntnteSmartLoad } from '@/api/operation/arteryDepart'
import { postSaveScheme, deleteSchemeById, putUpdateScheme, getIntnteCarInfo, getIntnteInit, deleteScheme } from '@/api/operation/arteryDepart'

export default {
  components: {
    SelectTree,
    SelectType,
    addTruckInfo,
    addDriverInfo,
    AddLntelligentFreight
  },
  props: {
    modify: Boolean, // true-修改方案 false-新增配载
    orgid: [Number, String],
    dofo: [Array, Object],
    model: [Array, Object],
    loadTable: {
      type: Array
    },
    paramTuck: {
      type: [Array, Object],
      default: () => {}
    },
    transpList: {
      type: Array,
      default: []
    },
    leftTableArr: {
      type: Array,
      default: []
    },
    orgFirstScheme: {
      type: Array,
      default: []
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
    },
    isEmptyTruck() {
      if (this.intelligentData.dataList && this.intelligentData.dataList.length === 0) {
        return true
      } else {
        return false
      }
    }
  },
  data() {
    return {
      submitFormLoading: false,
      dialogCloseVisible: false,
      dialogVisible: false,
      loading: false,
      tabInfo: {
        all: null, // 整个tab实例
        name: '', // 当前tab的下标
        list: [], // 方案组
        object: {} // 当前方案 
      },
      activeTab: '0',
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
      saveLoading: false,
      submitLoading: false,
      inited: false,
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
      loadDataObject: {},
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
      },
      initOrgFirstScheme: false,
      firstScheme: [],
      orgTranspList: [],
      isEditCurrentScheme: false // true-修改当前方案 false-添加当前方案
    }
  },
  watch: {
    orgFirstScheme: {
      handler(newVal) {
        if (!this.initOrgFirstScheme) {
          this.initOrgFirstScheme = true
          this.firstScheme = objectMerge2([], this.orgFirstScheme)
        }
      }
    },
    leftTableArr: {
      handler(newVal) {}
    },
    modify: {
      handler(newVal) {}
    },
    orgid: {
      handler(newVal) {
        this.intelligentLeftData.arriveOrgid = this.orgid
      },
      deep: true
    },
    dofo: {
      handler(newVal) {
        if (!this.inited2) {
          this.orgTranspList = objectMerge2([], this.transpList)
          this.tabInfo = {
            all: null, // 整个tab实例
            name: '0', // 当前tab的下标
            list: this.orgTranspList, // 方案组
            object: this.transpList[0] // 当前方案 
          }
          // this.orgFirstScheme = objectMerge2({}, this.transpList) // 页面存储原始方案为副本，方便添加后还原数据
          console.warn('======this.orgFirstScheme=====', this.orgFirstScheme)
          this.intelligentData.dataList = Object.assign([], this.dofo)
          this.intelligentData.dataList.forEach((e, index) => {
            this.inited2 = true
            e.loadTime = parseTime(new Date())
            // e.planArrivedTime = parseTime(new Date())
            e.weight = e.weight ? e.weight : 0
            e.volume = e.volume ? e.volume : 0
            e._index = index
            this.truckOptions.forEach(el => {
              if (el.cid === e.cid + '' || el.cid === e.cid) {
                this.$set(e, 'name', el.name)
              }
            })
            if (!this.modify) {
              this.intelligentLeftData.arriveOrgid = this.orgid
              this.$set(e, 'tmsOrderLoadFee', this.feeData)
              this.$set(e.tmsOrderLoadFee, 'nowpayCarriage', e.price)
              this.feeData = this.$options.data().feeData
            } else {
              this.intelligentLeftData.arriveOrgid = e.arriveOrgid
              this.intelligentLeftData.apportionTypeId = e.apportionTypeId
            }
          })
          this.showCurPagesData = Object.assign({}, this.intelligentData)
          this.setCurPageView(0) // 设置显示
          this.$emit('truckIndex', this.currentIndex)
          this.$emit('truckPrecent', this.intelligentData.dataList[0])
          this.$emit('schemeIndex', this.tabInfo.name)
        }
      }
    },
    loadTable: {
      handler(cval, oval) {
        if (cval) {
          this.$nextTick(() => {
            if (cval[this.currentIndex]) {
              this.intelligentData.dataList[this.currentIndex].carLoadDetail = cval[this.currentIndex]
            }
          })
        }
      }
    },
    transpList: {
      handler(cval, oval) {
        if (cval) {
          console.log('=====transpList====', cval)
        }
      }
    },
    paramTuck: {
      handler(cval, oval) {
        // 计算配载按钮显示可用
        this.isSubmitLoad = false
        // 替换车型列表 并显示 需求只能选择一个车型来替换当前的车型
        // let selArr = []
        this.getIntnteCarInfo()
        let selObj = Object.assign({}, cval[0])
        console.warn('paramTuck', cval, oval)
        this.$set(this.intelligentData.dataList[this.currentIndex], 'cid', selObj.cid)
        this.$set(this.intelligentData.dataList[this.currentIndex], 'name', selObj.name)
        this.$set(this.intelligentData.dataList[this.currentIndex], 'volume', selObj.vol)
        this.$set(this.intelligentData.dataList[this.currentIndex], 'weight', selObj.weight)

        // 保存需要去除的运单
        // if (cval.length < this.intelligentData.dataList.length) {
        //   this.preDelDataList = this.intelligentData.dataList.slice(cval.length, this.intelligentData.dataList.length)
        // } else {
        //   this.pretruckDisable = []
        // }
        // cval.forEach((e, index) => {
        //   selArr.push({
        //     name: e.name,
        //     cid: e.cid,
        //     volume: e.vol ? e.vol : 0,
        //     weight: e.weight ? e.weight : 0,
        //     price: e.price,
        //     carDriver: '',
        //     tagid: e.tagid,
        //     carDriverId: '',
        //     carDriverPhone: '',
        //     carId: '',
        //     carLoadDetail: this.intelligentData.dataList[index] ? this.intelligentData.dataList[index].carLoadDetail : [],
        //     carNo: '',
        //     reachDate: '',
        //     spri: '',
        //     svol: '',
        //     swei: '',
        //     url: '',
        //     loadTime: parseTime(new Date()),
        //     tmsOrderLoadFee: this.feeData,
        //     planArrivedTime: '',
        //     requireArrivedTime: '',
        //     _index: index
        //   })
        // })

        // this.intFreightIndex = 0
        // this.currentIndex = 0
        // this.showCurrenFormStyle = []
        // this.showCurrenFormStyle[this.currentIndex] = true
        // this.$emit('truckIndex', this.currentIndex)
        // this.intelligentData.dataList = Object.assign([], selArr)
        // selArr = []
        // this.setCurPageView(0) // 设置显示
        // this.showCurPagesData = Object.assign({}, this.intelligentData)
        // // 如果选择的车型比之前的车型列表数量少 就要把运单返回到左边列表
        // this.$emit('resetTrucDelList')
      }
    }
  },
  mounted() {
    this.getIntnteCarInfo()
    this.converToCn()
    this.init()
    this.getSystemTime()
    if (this.modify) {

    } else {
      this.intelligentLeftData.arriveOrgid = this.orgid
    }
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
      this.$message({
        type: 'success',
        message: '已关闭成功!'
      })
      this.dialogCloseVisible = false
      this.eventBus.$emit('replaceCurrentView', '/operation/order/arteryDepart/loadList')
    },
    addFreight(val, index, item) {
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
    },
    getIntnteCarInfo() {
      // 获取车型列表
      // sign 1查询系统车型 2查询当前网点自定义车型 3查询系统车型+当前网点自定义车型
      getIntnteCarInfo(this.otherinfo.orgid, 3).then(data => {
        this.truckOptions = data
        console.log('getIntnteCarInfo2', data)
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
    handleSelectName(item, index) { // 选择司机
      this.changeDriverKey = Math.random()
      if (this.intelligentData.dataList[index].truckIdNumber === '' || this.intelligentData.dataList[index].truckIdNumber === undefined) {
        // this.intelligentData.dataList[index].truckIdNumber = item.truckIdNumber
        this.$set(this.intelligentData.dataList[index], 'truckIdNumber', item.truckIdNumber)
      }
      this.$set(this.intelligentData.dataList[index], 'dirverMobile', item.driverMobile)
      this.$set(this.intelligentData.dataList[index], 'dirverName', item.driverName)
      this.isDriverSelect = true
    },
    handleSelectTruckNum(item, index) { // 选择车牌
      this.changeTruckKey = Math.random()
      this.$set(this.intelligentData.dataList[index], 'truckIdNumber', item.truckIdNumber)
      this.$set(this.intelligentData.dataList[index], 'dirverMobile', item.driverMobile)
      this.$set(this.intelligentData.dataList[index], 'dirverName', item.driverName)

      // this.$set(this.intelligentData.dataList[index], 'truckLoad', Number(item.truckLoad))
      // this.$set(this.intelligentData.dataList[index], 'truckVolume', Number(item.truckVolume))
    },
    handleTuckOptions(val, item, index) {
      let obj = {}
      this.isSubmitLoad = false
      this.truckOptions.forEach(e => {
        if (e.name === val) {
          obj = Object.assign({}, e)
          console.log('车型:', obj, index)
        }
      })

      this.$set(this.intelligentData.dataList[index], 'volume', obj.vol)
      this.$set(this.intelligentData.dataList[index], 'weight', obj.weight)
      this.$set(this.intelligentData.dataList[index], 'cid', obj.cid)
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
    submitLoad() { // 计算配载
      console.log('this.intelligentData.dataList', this.intelligentData.dataList)
      let emptyCountTruck = 0
      this.loading = true
      let truckObject = {
        orgId: this.intelligentLeftData.arriveOrgid,
        standCar: []
      }
      if (this.intelligentData.dataList.length === 0) {
        this.loading = false
        this.$message.warning('请添加车型！')
        return
      }
      this.intelligentData.dataList.forEach((e, index) => {
        let item = {
          id: e.cid ? e.cid : e.id,
          spri: e.price ? e.spri : 0,
          carNo: e.truckIdNumber ? e.truckIdNumber : ''
        }
        if (!item.id) {
          this.$message.warning('车型' + this.changeNumCN[index] + '不能为空！')
          emptyCountTruck++
        }
        truckObject.standCar.push(item)
        item = {}
      })
      if (emptyCountTruck > 0) {
        emptyCountTruck = 0
        this.loading = false
        return
      }
      console.log('submitLoad', truckObject)

      getIntnteInit(truckObject).then(data => {
          if (data) {
            this.dialogCloseVisible = false
            this.loading = false
            console.log('计算配载', data)
            let arr = objectMerge2([], data.transp)
            arr.forEach((e, index) => {
              this.tabInfo.object.repertoryList = objectMerge2([], e.storeOrderListloss)
              this.$set(e, 'repertoryList', e.storeOrderListloss)
              this.$set(e, 'tmsLoadSchemeDetailDtoList', e.standacars)
              e.tmsLoadSchemeDetailDtoList.forEach((el, elindex) => {
                this.$set(el, 'arriveOrgid', truckObject.orgId)
                this.$set(el, 'dirverName', el.carDriver ? el.carDriver : '')
                this.$set(el, 'dirverMobile', el.carDriverPhone ? el.carDriverPhone : '')
                this.$set(el, 'truckIdNumber', el.carNo ? el.carNo : '')
                this.$set(el, '_index', elindex)
                let obj = {}
                for (let item in el) {
                  this.$set(obj, item, el[item])
                }
                this.$set(el, 'tmsOrderLoad', obj)
                this.$set(el, 'tmsOrderLoadDetailsList', el.carLoadDetail)
                this.$set(el, 'tmsOrderLoadFee', { nowpayCarriage: el.price })
              })
              console.log('计算配置后格式化的json', arr)
            })
            this.tabInfo.object.tmsLoadSchemeDetailDtoList = Object.assign([], arr[0].tmsLoadSchemeDetailDtoList)

            // 区域二  intelligentData
            this.intelligentData.dataList = objectMerge2([], this.tabInfo.object.tmsLoadSchemeDetailDtoList)
            this.showCurPagesData = Object.assign({}, this.intelligentData)
            this.setCurPageView(0) // 设置显示
            this.currentIndex = 0
            this.showCurrenFormStyle = []
            this.showCurrenFormStyle[this.currentIndex] = true
            this.$emit('truckIndex', this.currentIndex)
            this.$emit('truckPrecent', this.intelligentData.dataList[0])
            this.$emit('schemeIndex', this.tabInfo.name) // 当前方案的下标
            this.$emit('submitLoadNew', {
              left: this.tabInfo.object.repertoryList,
              right: this.tabInfo.object.tmsLoadSchemeDetailDtoList
            })
            truckObject = {}
          } else {
            truckObject = {}
            this.$message({ type: 'warning', message: '无配载信息' })
            this.loading = false
          }
        })
        .catch(err => {
          this.dialogCloseVisible = false
          this.loading = false
          this._handlerCatchMsg(err)
        })
    },
    setData(orgFirstScheme) { // 为存为配载单设置提交给后台的数据结构
      this.loadDataObject = {
        schemeGroup: '',
        tmsLoadSchemeDetailDtoList: []
      }
      let arr = []
      let data = {} // 数组中的单个对象
      arr = objectMerge2([], orgFirstScheme ? this.orgFirstScheme[0].tmsLoadSchemeDetailDtoList : this.intelligentData.dataList)
      console.warn('===============intelligentData.dataList', this.intelligentData.dataList)
      console.log('this.orgFirstScheme', this.orgFirstScheme)
      console.log('this.intelligentData.dataList', this.intelligentData.dataList, this.tabInfo, arr, this.loadTable)
      // arr.forEach((e, index) => {
      //   this.$set(arr[index], 'carLoadDetail', this.loadTable[index] ? this.loadTable[index] : [])
      // })

      this.noLoadListCount = 0
      this.loadDataArray = []
      arr.forEach((e, index) => {
        this.$set(arr[index], 'carLoadDetail', this.loadTable[index] ? this.loadTable[index] : [])
        let curinfo = {
          apportionTypeId: orgFirstScheme ? '' : this.intelligentLeftData.apportionTypeId ? this.intelligentLeftData.apportionTypeId : '',
          arriveOrgid: this.intelligentLeftData.arriveOrgid,
          contractNo: e.contractNo || '',
          batchNo: e.batchNo || '',
          batchTypeId: this.intelligentLeftData.batchTypeId,
          truckIdNumber: e.truckIdNumber ? e.truckIdNumber : '',
          dirverName: e.dirverName ? e.dirverName : '',
          dirverMobile: e.dirverMobile ? e.dirverMobile : '',
          truckLoad: e.weight,
          truckVolume: e.volume,
          loadTime: e.loadTime ? e.loadTime : parseTime(new Date(), '{y}-{m}-{d} {h}:{i}:{s}'),
          planArrivedTime: e.planArrivedTime,
          requireArrivedTime: e.requireArrivedTime,
          truckUserId: e.truckUserId,
          loadTypeId: this.intelligentLeftData.loadTypeId,
          orgid: this.otherinfo.orgid,
          remark: e.remark,
          cid: e.cid ? e.cid : (e.id ? e.id : null)
        }
        this.$set(e, 'tmsOrderLoad', curinfo)
        this.$set(data, 'tmsOrderLoad', e.tmsOrderLoad)
        this.$set(data, 'tmsOrderLoadFee', e.tmsOrderLoadFee)

        e.carLoadDetail.forEach(em => {
          em.loadAmount = em.repertoryAmount
          em.loadWeight = em.repertoryWeight
          em.loadVolume = em.repertoryVolume
        })
        if (orgFirstScheme) {
          this.orgFirstScheme[0].tmsLoadSchemeDetailDtoList.forEach((em, emindex) => {
            if (emindex === index) {
              this.$set(data, 'tmsOrderLoadDetailsList', em.carLoadDetail)
              this.$set(this.loadDataArray, index, data)
            }
          })
          console.log('this.loadDataArray', this.loadDataArray)
        } else {
          this.$set(data, 'tmsOrderLoadDetailsList', e.carLoadDetail)
          this.$set(this.loadDataArray, index, data)
        }
        data = {}
        curinfo = {}
      })
      if (!orgFirstScheme) {
        // 计算几个车型 是否有配载清单为空的 如果为空就加一不可以提交
        // 保存方案时，配载清单可以为空，提交配载单时，不能为空
        this.loadDataArray.forEach(e => {
          if (e.tmsOrderLoadDetailsList.length === 0) {
            this.noLoadListCount++
          }
        })
      }
    },
    setSaveData(orgFirstScheme) {
      // setSaveData()为保存当前方案设置提交的数据结构
      // 如果当前方案组有 方案组标识schemeGroup (true) 就【不需要保存原始方案】
      // 如果当前方案组没有 方案组标识schemeGroup (false) 【需要保存原始方案】以及【当前方案】
      // 如果有方案组就会直接添加当前方案到方案组里面，否则就新增一条当前方案到列表
      console.log('this.transpList[0].schemeGroup', this.transpList[0].schemeGroup)

      if (this.transpList[0].schemeGroup) {
        this.setData()
        this.$set(this.loadDataObject, 'schemeGroup', this.transpList[0].schemeGroup)
        this.$set(this.loadDataObject, 'tmsLoadSchemeDetailDtoList', this.loadDataArray)
      } else {
        if (orgFirstScheme) {
          this.setData(orgFirstScheme) // 设置原始方案
        } else {
          this.setData() // 设置当前方案
        }
        this.$set(this.loadDataObject, 'schemeGroup', '')
        this.$set(this.loadDataObject, 'tmsLoadSchemeDetailDtoList', this.loadDataArray)
      }
    },
    saveForm() { // 保存当前方案
      this.saveLoading = true
      this.loading = true
      if (this.noLoadListCount > 0) { // 判断右边的表格时候为空 清单不能为空
        this.$message.warning('配载清单不可以为空')
        this.noLoadListCount = 0
        this.saveLoading = false
        this.loading = false
        return
      }
      if (!this.transpList[0].schemeGroup) {
        // 新增保存 原始方案
        this.setSaveData(true)
        console.log('需要添加原始方案', this.loadDataObject)
        this.postSaveScheme(this.loadDataObject)
      } else {
        // 如果当前方案右schemeId 那么为修改当前方案 否则为新增当前方案
        this.isEditCurrentScheme = this.tabInfo.object.schemeId ? true : false
        console.log('saveForm - isEditCurrentScheme', this.isEditCurrentScheme, this.tabInfo.name)
        if (this.isEditCurrentScheme && this.tabInfo.name !== '0') {
          // 修改保存 当前方案
          this.setSaveData()
          console.log('需要修改当前方案', this.loadDataObject)
          this.$set(this.loadDataObject, 'schemeId', this.tabInfo.object.schemeId)
          this.putUpdateScheme(this.loadDataObject)
        } else {
          // 新增保存 当前方案
          this.setSaveData()
          console.log('需要添加当前方案', this.loadDataObject, this.transpList[0].schemeGroup)
          this.postSaveScheme(this.loadDataObject)
        }
      }

    },
    putUpdateScheme(dataObject) {
      putUpdateScheme(dataObject).then(data => {
          if (data) {
            console.log('editForm', data)
            this.$message({ type: 'success', message: '修改当前方案成功！' })
            this.eventBus.$emit('replaceCurrentView', {
              path: '/operation/order/loadIntelligent/load',
              query: {
                tab: '智能配载',
                schemeGroup: data.schemeGroup,
                orgid: this.otherinfo.orgid,
                time: new Date().getTime()
              }
            })
            console.log('修改后刷新页面后的tabinfo', this.tabInfo)
          }
           this.saveLoading = false
            this.loading = false
        })
        .catch(err => {
           this.saveLoading = false
            this.loading = false
          this._handlerCatchMsg(err)
        })
    },
    postSaveScheme(dataObject) {
      // 调用保存接口以及将成功返回的方案组标识schemeGroup和当前方案的id分别设置进方案中，
      // 以便删除和修改方案
      postSaveScheme(dataObject).then(data => {
          if (data) {
            console.log('saveForm', data)
            if (this.transpList[0].schemeGroup) {
              this.$message({ type: 'success', message: '保存当前方案成功！' })
            } else {
              this.$message({ type: 'success', message: '保存原始方案成功！' })
            }
            let loadDataObject = objectMerge2({}, dataObject)
            // 设置页面显示数据结构
            this.$set(loadDataObject, 'schemeGroup', data.schemeGroup)
            this.$set(loadDataObject, 'schemeId', data.schemeId)
            if (this.initScheme) {
              this.eventBus.$emit('replaceCurrentView', {
                path: '/operation/order/loadIntelligent/load',
                query: {
                  tab: '智能配载',
                  schemeGroup: data.schemeGroup,
                  orgid: this.otherinfo.orgid,
                  time: new Date().getTime()
                }
              })
            }
            if (this.transpList[0].schemeGroup === '' || this.transpList[0].schemeGroup === undefined || !this.transpList[0].schemeGroup) {
              this.transpList[0] = this.orgFirstScheme[0]
              this.$set(this.transpList[0], 'schemeGroup', data.schemeGroup)
              this.$set(this.transpList[0], 'schemeId', data.schemeId)
              this.orgFirstScheme[0] = objectMerge2({}, this.transpList[0])
              this.initScheme = true
              console.log('=========', this.orgFirstScheme[0], this.transpList[0])
              this.saveForm()
            }

            this.$set(loadDataObject, 'repertoryList', this.leftTableArr)
            loadDataObject.tmsLoadSchemeDetailDtoList.forEach((el, elindex) => {
              this.$set(el, 'carLoadDetail', el.tmsOrderLoadDetailsList)
              this.$set(el, '_index', elindex)
              for (let item in el.tmsOrderLoad) {
                this.$set(el, item, el.tmsOrderLoad[item])
                this.$set(el, 'weight', el.tmsOrderLoad.truckLoad)
                this.$set(el, 'volume', el.tmsOrderLoad.truckVolume)
              }
              this.truckOptions.forEach(em => {
                if (em.cid === el.cid || em.cid === el.cid + '') {
                  console.log(em.cid)
                  this.$set(el, 'name', em.name)
                }
              })
              // 计算现付费用 为 车型费用price
              let totalPrice = tmsMath.add(
                el.tmsOrderLoadFee.nowpayCarriage,
                el.tmsOrderLoadFee.nowpayOilCard,
                el.tmsOrderLoadFee.backpayCarriage,
                el.tmsOrderLoadFee.backpayOilCard,
                el.tmsOrderLoadFee.arrivepayCarriage,
                el.tmsOrderLoadFee.arrivepayOilCard).result()
              this.$set(el, 'price', totalPrice)
              totalPrice = 0
            })
            // 将新的方案添加到方案组列表里面
            if (!this.initScheme) {
              this.transpList.push(loadDataObject)
              this.orgTranspList.push(loadDataObject)
            }

            this.activeTab = this.transpList.length - 1 + '' // 设置高亮最新的tab
            this.tabInfo.name = this.activeTab
            this.tabInfo.object = this.tabInfo.list[this.activeTab]
            this.transpList[0] = this.orgFirstScheme[0]
            loadDataObject = {}
            console.log('transpList&&&&&&&&&&&&&&&&&&', this.transpList, loadDataObject)
            // 高亮最新的方案
            this.$emit('schemeIndex', this.activeTab)
          }
          this.saveLoading = false
          this.loading = false
        })
        .catch(err => {
          this.saveLoading = false
          this.loading = false
          this._handlerCatchMsg(err)
        })
    },
    submitForm() { // 存为配载单
      this.submitLoading = true
      console.log("this.$refs['ruleForm']", this.$refs['ruleForm'], this)
      this.$refs['ruleForm'][0].validate((valid) => {
        if (valid) {
          // this.loading = true
          this.setData()
          if (this.noLoadListCount > 0) { // 判断右边的表格时候为空 清单不能为空
            this.$message.warning('配载清单不可以为空')
            this.noLoadListCount = 0
            this.submitLoading = false
            return false
          } else {
            this.submitFormLoading = true
            postIntnteSmartLoad(this.loadDataArray).then(res => {
              this.dialogVisible = false
              this.submitLoading = false
              this.submitFormLoading = false
              this.$message({ type: 'success', message: '保存配载成功！' })
              // 删除当前方案组
              if (this.tabInfo.object.schemeGroup) {
                let obj = {
                  schemeGroup: this.tabInfo.object.schemeGroup,
                  orgid: this.otherinfo.orgid
                }
                deleteScheme(obj).then(data => {}).catch(err => { this._handlerCatchMsg(err) })
              }
              this.$router.push({ path: '/operation/order/arteryDepart', query: { pageKey: new Date().getTime() } })
              this.eventBus.$emit('replaceCurrentView', '/operation/order/arteryDepart')
              this.loading = false
            }).catch(err => {
              this.submitFormLoading = false
              this.dialogVisible = false
              this.submitLoading = false
              this._handlerCatchMsg(err)
              this.loading = false
            })
          }
        } else {
          this.submitFormLoading = false
          this.loading = false
          this.dialogVisible = false
          this.submitLoading = false
          return false
        }
      })
    },
    tabSelect(obj) { // click: current tab
      console.log('Tab方案' + this.changeNumCN[this.activeTab] + '信息：tabInfo', this.tabInfo)
      let orgTranspList = JSON.stringify(this.orgFirstScheme[this.tabInfo.name])
      let copyobj = objectMerge2({}, this.tabInfo.object)
      copyobj.tmsLoadSchemeDetailDtoList.forEach(el => {
        delete el.loadTime
      })
      let curTranspList = JSON.stringify(copyobj)

      if (curTranspList.indexOf(orgTranspList) < 0) {
        if (obj.name !== this.tabInfo.name) {
          this.$confirm('还没有保存当前方案，是否保存?', '提示', {
            confirmButtonText: '保存',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.saveForm()
          }).catch(() => {
            this.$notify.info({
              title: '消息',
              message: '已取消保存当前方案'
            })
            this.isSubmitLoad = true
            this.tabInfo = {
              all: obj, // 整个tab实例
              name: obj.name, // 当前tab的下标
              list: obj.$attrs.object, // 方案组
              object: obj.$attrs.object[obj.name] // 当前方案 
            }
            this.activeTab = this.tabInfo.name
            console.log('Tab方案' + this.changeNumCN[this.activeTab] + '信息：tabInfo', this.tabInfo)
            // 点击tab页面后 开始设置数据视图
            // 区域一  intelligentLeftData 到达网点+分摊方式
            this.intelligentLeftData.arriveOrgid = this.tabInfo.object.tmsLoadSchemeDetailDtoList[0].arriveOrgid
            this.intelligentLeftData.apportionTypeId = this.tabInfo.object.tmsLoadSchemeDetailDtoList[0].apportionTypeId
            // 区域二  intelligentData
            this.intelligentData.dataList = Object.assign([], this.tabInfo.object.tmsLoadSchemeDetailDtoList)
            this.showCurPagesData = Object.assign({}, this.intelligentData)
            this.setCurPageView(0) // 设置显示
            this.currentIndex = 0
            this.showCurrenFormStyle = []
            this.showCurrenFormStyle[this.currentIndex] = true
            this.$emit('truckIndex', this.currentIndex)
            this.$emit('truckPrecent', this.intelligentData.dataList[0])
            this.$emit('schemeIndex', this.tabInfo.name) // 当前方案的下标
          })
        }
      } else {
        orgTranspList = ''
        curTranspList = ''
        copyobj = {}
        this.isSubmitLoad = true
        this.tabInfo = {
          all: obj, // 整个tab实例
          name: obj.name, // 当前tab的下标
          list: obj.$attrs.object, // 方案组
          object: obj.$attrs.object[obj.name] // 当前方案 
        }
        this.activeTab = this.tabInfo.name
        console.log('Tab方案' + this.changeNumCN[this.activeTab] + '信息：tabInfo', this.tabInfo)
        // 点击tab页面后 开始设置数据视图
        // 区域一  intelligentLeftData 到达网点+分摊方式
        this.intelligentLeftData.arriveOrgid = this.tabInfo.object.tmsLoadSchemeDetailDtoList[0].arriveOrgid
        this.intelligentLeftData.apportionTypeId = this.tabInfo.object.tmsLoadSchemeDetailDtoList[0].apportionTypeId
        // 区域二  intelligentData
        this.intelligentData.dataList = Object.assign([], this.tabInfo.object.tmsLoadSchemeDetailDtoList)
        this.showCurPagesData = Object.assign({}, this.intelligentData)
        this.setCurPageView(0) // 设置显示
        this.currentIndex = 0
        this.showCurrenFormStyle = []
        this.showCurrenFormStyle[this.currentIndex] = true
        this.$emit('truckIndex', this.currentIndex)
        this.$emit('truckPrecent', this.intelligentData.dataList[0])
        this.$emit('schemeIndex', this.tabInfo.name) // 当前方案的下标
      }
    },
    removeTab(targetName) { // 删除当前方案
      let obj = {
        schemeId: this.transpList[targetName].schemeId
      }
      if (targetName === '0') {
        this.$message.warning('不可以删除原始方案！')
        return
      } else {
        if (this.transpList && this.transpList.length > 0) {
          this.isSubmitLoad = true
          deleteSchemeById(obj).then(data => {
              this.$message.success('删除成功！')
              this.transpList.splice(targetName, 1) // 删除当前tab
              this.activeTab = this.transpList.length - 1 + '' // 设置高亮最新的tab
              this.currentIndex = 0
              this.$emit('truckIndex', this.currentIndex)
              this.$emit('truckPrecent', this.intelligentData.dataList[0])
              this.$emit('schemeIndex', this.activeTab) // 当前方案的下标
            })
            .catch(err => {
              this._handlerCatchMsg(err)
            })
        }
      }

    },
    changeLoadNum(val, index, type) {
      this.$set(this.intelligentData.dataList[index], type, val)
      if (type === 'price') {
        this.$set(this.intelligentData.dataList[index], 'tmsOrderLoadFee', this.$options.data().feeData)
        this.$set(this.intelligentData.dataList[index].tmsOrderLoadFee, 'nowpayCarriage', val)
      }
      this.$emit('truckPrecent', this.intelligentData.dataList[index])

    },
    selectCurrentTuck(index, item) {
      if (this.currentIndex !== index) {
        this.isSubmitLoad = true
      }
      console.log('当前点击是车型', index, item)
      this.currentIndex = index
      this.showCurrenFormStyle = []
      this.showCurrenFormStyle[index] = true
      this.$emit('truckIndex', this.currentIndex)
      this.$emit('truckPrecent', this.intelligentData.dataList[this.currentIndex])
    },
    delCurTruck(index, item) {
      this.currentIndex = index - 1
      this.$emit('delCurTruck', {
        number: index,
        list: this.intelligentData.dataList[index]
      })
      this.isSubmitLoad = true
      this.intelligentData.dataList.splice(index, 1)
      this.showCurrenFormStyle = []
      var len = this.intelligentData.dataList.length
      if (this.currentIndex < 0 && len) {
        this.currentIndex = 0
        this.showCurrenFormStyle[this.currentIndex] = true
      } else if (index > 0) {
        this.$set(this.showCurrenFormStyle, this.currentIndex, true)
      } else {}
      this.$emit('truckIndex', this.currentIndex)
      this.$emit('truckInfo', this.intelligentData.dataList)
      this.$emit('truckPrecent', this.intelligentData.dataList[0])
      this.$message.info('已删除')
      setTimeout(() => {
        this.intelligentData.dataList.forEach((el, index) => {
          this.$set(this.intelligentData.dataList, index, Object.assign(el, { '_index': index }))
        })
      }, 500)
      this.setCurPageView(this.currentIndex) // 设置显示
    },
    addtuck() {
      this.isSubmitLoad = true
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
        vol: '',
        weight: '',
        loadTime: parseTime(new Date()),
        planArrivedTime: '',
        requireArrivedTime: '',
        truckUserId: '',
        remark: '',
        price: 0,
        tmsOrderLoadFee: this.$options.data().feeData,
        carLoadDetail: [],
        _index: index
      })
      this.$emit('addOrgRightTable') // 同时添加为车型添加相应的配载清单空列表
      this.showCurrenFormStyle = []
      this.showCurrenFormStyle[index] = true
      this.currentIndex = index
      this.setCurPageView(index - 2) // 设置显示
      this.$emit('truckIndex', this.currentIndex)
      this.$emit('truckPrecent', this.intelligentData.dataList[this.currentIndex])
      console.log('当前添加是车型', this.currentIndex)

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
    },
    handleClose(done) {
      this.dialogVisible = false
      this.dialogCloseVisible = false
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
    min-height: 174px;
    .el-tabs--border-card {
      box-shadow: none;
      border: 1px solid #cdf;
      .el-tabs__header.is-top {
        .el-tabs__nav-wrap {}
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
          margin-right: 0px;
        }
      }
      .loadInfo_collapse {
        width: 100%;
        height: 113px;
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
        .loadInfo_tips {
          position: absolute;
          top: 50%;
          left: 50%;
          margin-left: -100px;
          margin-top: -10px;
          color: #999;
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
          justify-content: space-between;
          overflow: hidden;
          .loadInfo_collapse_list_content {
            display: flex;
            flex-direction: row;
            width: 100%;
          }
          .verticalBtn_college {
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            .verticalBtnTransfer {
              display: flex;
              flex-direction: column;
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
          }

          .loadInfo_item {
            display: flex;
            flex-direction: row;
            .loadInfo_item_form {
              padding-top: 15px;
              width: 100%;
              display: inline-block;
              animation: rowFormMoveIn 0.4s 0.1s ease backwards;
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
                  .nativeinput {
                    border: 1px solid #dcdfe6;
                    padding: 0 5px;
                    border-radius: 4px;
                    font-size: 12px;
                    position: relative;
                  }
                  .el-input {
                    width: 100%;
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
                  word-wrap: nowrap;
                }
                .el-form-item--mini .el-form-item__content,
                .el-form-item--mini .el-form-item__label {
                  min-width: 90px;
                }
                .el-input-group__append,
                .el-input-group__prepend {
                  padding: 0 5px;
                }
              }
            }
          }
          i.intEditF {
            position: absolute;
            right: 5px;
            top: 1px;
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

@keyframes rowFormMoveIn {
  0% {
    transform: translate(100%, 0);
    opacity: 0;
  }
  100% {
    transform: translate(0, 0);
    opacity: 1;
  }
}

</style>
