<template>
  <div class="load-steup">
    <!-- 新增配载 loadTypeId：38-短驳 39-干线 40-送货 -->
    <div class="load-steup-form" v-loading="loading">
      <el-collapse v-model="loadTruck">
        <el-collapse-item name="loadTruckOne">
          <template slot="title">
            车辆信息&nbsp; <b>{{loadTypeId===40?'送货':'发车'}}批次：{{truckMessage}} <span v-if="loadTypeId===39">合同编号：{{contractNo}}</span></b>
          </template>
          <div class=" loadFrom clearfix">
            <el-form :model="formModel" :size="mini" ref="formModel" label-width="110px" :rules="formModelRules">
              <!-- <div class="loadFrom-type">
                <el-checkbox v-if="loadTypeId === 39" v-model="isDirectDelivery" @change="changeDirect">直送</el-checkbox>
              </div> -->
              <!-- 基本信息 -->
              <div class="loadFrom-type-baseInfo">
                <div>
                  <el-form-item label="送货费" prop="deliveryFee" v-if="loadTypeId===40" class="multipleInput">
                    <el-input size="mini" v-model="formModel.deliveryDetailFee" v-number-only:point :maxlength="8" placeholder="送货费">
                    </el-input>
                    <el-input size="mini" v-model="formModel.deliveryHandlingFee" v-number-only:point :maxlength="8" placeholder="装卸费">
                      <template slot="append">元</template>
                    </el-input>
                  </el-form-item>
                  <el-form-item label="到达网点" prop="arriveOrgid" v-if="loadTypeId!==40" class="formItemTextDanger" :rules="{required: !isDirectDelivery, trigger: 'change', message: '不能为空'}">
                    <SelectTree v-model="formModel.arriveOrgid" clearable size="mini" :disabledOption="[otherinfo.orgid]" :disabled="isDirectDelivery"></SelectTree>
                  </el-form-item>
                </div>
                <div>
                  <el-form-item label="车牌号码" prop="truckIdNumber" class="formItemTextDanger" :key="truckKey">
                    <el-autocomplete popper-class="my-autocomplete" v-model="formModel.truckIdNumber" :fetch-suggestions="querySearchTruck" placeholder="车牌号码" size="mini" @select="handleSelectTruck" auto-complete="off" :maxlength="8">
                      <i class="el-icon-plus el-input__icon" slot="suffix" @click="doAction('addTruck')"></i>
                      <template slot-scope="{ item }">
                        <div class="name">{{ item.truckIdNumber }}</div>
                        <span class="addr">{{ item.driverName }}</span>
                        <br>
                        <span class="addr">{{ item.dirverMobile}}</span>
                      </template>
                    </el-autocomplete>
                  </el-form-item>
                </div>
                <div>
                  <el-form-item label="司机名称" prop="dirverName" class="formItemTextDanger" :key="driverKey">
                    <el-autocomplete popper-class="my-autocomplete" v-model="formModel.dirverName" :fetch-suggestions="querySearch" placeholder="司机名称" size="mini" @select="handleSelect" auto-complete="off" :maxlength="10">
                      <i class="el-icon-plus el-input__icon" slot="suffix" @click="doAction('addDriver')"></i>
                      <template slot-scope="{ item }">
                        <div class="name">{{ item.driverName }}</div>
                        <span class="addr">{{ item.driverMobile }}</span>
                        <br>
                        <span class="addr">{{ item.truckIdNumber }}</span>
                      </template>
                    </el-autocomplete>
                  </el-form-item>
                </div>
                <div>
                  <el-form-item label="司机电话" prop="dirverMobile" class="formItemTextDanger">
                    <el-input size="mini" v-model="formModel.dirverMobile" placeholder="司机电话" :maxlength="11"></el-input>
                  </el-form-item>
                </div>
                <div>
                  <el-form-item label="分摊方式" prop="apportionTypeId">
                    <el-select v-model="formModel.apportionTypeId" placeholder="请选择" @change="getApportionTypeId">
                      <el-option v-for="(item, index) in apportionTypeList" :key="index" :label="item.dictName" :value="item.id">
                        <span style="float: left;">{{ item.dictName }}</span>
                        <span style="float: right;margin-left: 10px;">
                            <el-tooltip class="item" effect="dark" :content="item.descript" placement="left">
                            <el-button type="text">说明</el-button>
                            </el-tooltip>
                          </span>
                      </el-option>
                    </el-select>
                    <!-- <selectType v-model="formModel.apportionTypeId" type="apportion_type" clearable size="mini" @change="getApportionTypeId"></selectType> -->
                  </el-form-item>
                </div>
              </div>
              <div class="loadFrom-type-baseInfo">
                <div>
                  <el-form-item label="可载体积" prop="truckVolume">
                    <input type="text" class="nativeinput" v-number-only:point :value="formModel.truckVolume" ref="truckVolume" :maxlength="8" @change="(e)=>changeTruckNum(e.target.value, 'truckVolume')" />
                    <span class="input-append">方</span>
                    <!-- <el-input size="mini" v-model="formModel.truckVolume" @change="(val) => {changeTruckNum(val,'truckVolume')}" placeholder="可载体积" clearable v-number-only:point :maxlength="8"> -->
                    <!-- <template slot="append">方</template> -->
                    <!-- </el-input> -->
                  </el-form-item>
                </div>
                <div>
                  <el-form-item label="可载重量" prop="truckLoad">
                    <input type="text" class="nativeinput" v-number-only:point :value="formModel.truckLoad" ref="truckLoad" :maxlength="8" @change="(e)=>changeTruckNum(e.target.value, 'truckLoad')" />
                    <span class="input-append" style="margin-left: -40px;">千克</span>
                    <!-- <el-input size="mini" v-model="formModel.truckLoad" @change="(val) => {changeTruckNum(val,'truckLoad')}" placeholder="可载重量" clearable v-number-only:point :maxlength="8">
                      <template slot="append">千克</template>
                    </el-input> -->
                  </el-form-item>
                </div>
                <div>
                  <el-form-item :label="loadTimeFormName">
                    <el-date-picker size="mini" v-model="formModel.loadTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" :placeholder="loadTimeFormName">
                    </el-date-picker>
                  </el-form-item>
                </div>
                <div>
                  <el-form-item label="预计到达时间" v-if="loadTypeId===39">
                    <el-date-picker size="mini" v-model="formModel.planArrivedTime" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="预计到达时间">
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item label="要求到达时间" v-else>
                    <el-date-picker size="mini" v-model="formModel.requireArrivedTime" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="要求到达时间">
                    </el-date-picker>
                  </el-form-item>
                </div>
                <div>
                  <el-form-item label="操作费" prop="handlingFeeAll" v-if="loadTypeId!==40">
                    <input type="text" class="nativeinput" v-number-only:point :value="formModel.handlingFeeAll" ref="handlingFeeAll" :maxlength="8" @change="(e)=>changeHandlingFeeAll(e.target.value)" />
                    <span class="input-append">元</span>
                    <!-- <el-input size="mini" v-model="formModel.handlingFeeAll" v-number-only:point clearable :maxlength="8" @change="changeHandlingFeeAll"></el-input> -->
                  </el-form-item>
                  <el-form-item label="备注" v-else>
                    <el-input :maxlength="300" size="mini" v-model="formModel.remark"></el-input>
                  </el-form-item>
                </div>
              </div>
              <div class="loadFrom-type-baseInfo">
                <div>
                  <el-form-item label="短驳费" prop="shortFee" v-if="loadTypeId===38">
                    <input type="text" class="nativeinput" v-number-only:point :value="formModel.shortFee" ref="shortFee" :maxlength="8" @change="(e)=>changeTruckNum(e.target.value, 'shortFee')" />
                    <span class="input-append">元</span>
                    <!-- <el-input size="mini" v-model="formModel.shortFee" clearable :maxlength="8"></el-input> -->
                  </el-form-item>
                </div>
                <div>
                  <el-form-item label="备注" v-if="loadTypeId !== 40">
                    <el-input :maxlength="300" size="mini" v-model="formModel.remark"></el-input>
                  </el-form-item>
                </div>
              </div>
            </el-form>
            <!-- 费用参数 -->
            <el-form label-width="0px" :model="formFee" :rules="formFeeRules" ref="formFee" v-if="loadTypeId===39">
              <ul class="feeList_lyy">
                <li>
                  <p>运费合计(元)</p>
                  <el-form-item>
                    <el-input :maxlength="10" :size="mini" disabled :value="totalFormFee" style="text-align:center;"></el-input>
                  </el-form-item>
                </li>
                <li>
                  <p>现付运费(元)</p>
                  <el-form-item prop="nowpayCarriage">
                    <input type="text" class="nativeinput" v-number-only:point :value="formFee.nowpayCarriage" ref="nowpayCarriage" :maxlength="10" @change="(e)=>changeLoadNum(e.target.value, 'nowpayCarriage')" />
                  </el-form-item>
                </li>
                <li>
                  <p>现付油卡(元)</p>
                  <el-form-item prop="nowpayOilCard">
                    <input type="text" class="nativeinput" v-number-only:point :value="formFee.nowpayOilCard" ref="nowpayOilCard" :maxlength="10" @change="(e)=>changeLoadNum(e.target.value, 'nowpayOilCard')" />
                  </el-form-item>
                </li>
                <li>
                  <p>回付运费(元)</p>
                  <el-form-item prop="backpayCarriage">
                    <input type="text" class="nativeinput" v-number-only:point :value="formFee.backpayCarriage" ref="backpayCarriage" :maxlength="10" @change="(e)=>changeLoadNum(e.target.value, 'backpayCarriage')" />
                  </el-form-item>
                </li>
                <li>
                  <p>回付油卡(元)</p>
                  <el-form-item prop="backpayOilCard">
                    <input type="text" class="nativeinput" v-number-only:point :value="formFee.backpayOilCard" ref="backpayOilCard" :maxlength="10" @change="(e)=>changeLoadNum(e.target.value, 'backpayOilCard')" />
                  </el-form-item>
                </li>
                <li>
                  <p>到付运费(元)</p>
                  <el-form-item prop="arrivepayCarriage">
                    <input type="text" class="nativeinput" v-number-only:point :value="formFee.arrivepayCarriage" ref="arrivepayCarriage" :maxlength="10" @change="(e)=>changeLoadNum(e.target.value, 'arrivepayCarriage')" />
                  </el-form-item>
                </li>
                <li>
                  <p>到付油卡(元)</p>
                  <el-form-item prop="arrivepayOilCard">
                    <input type="text" class="nativeinput" v-number-only:point :value="formFee.arrivepayOilCard" ref="arrivepayOilCard" :maxlength="10" @change="(e)=>changeLoadNum(e.target.value, 'arrivepayOilCard')" />
                  </el-form-item>
                </li>
                <li>
                  <p>整车保险费(元)</p>
                  <el-form-item prop="carloadInsuranceFee">
                    <input type="text" class="nativeinput" v-number-only:point :value="formFee.carloadInsuranceFee" ref="carloadInsuranceFee" :maxlength="10" @change="(e)=>changeLoadNum(e.target.value, 'carloadInsuranceFee')" />
                  </el-form-item>
                </li>
                <li>
                  <p>发站装卸费(元)</p>
                  <el-form-item prop="leaveHandlingFee">
                    <input type="text" class="nativeinput" v-number-only:point :value="formFee.leaveHandlingFee" ref="leaveHandlingFee" :maxlength="10" @change="(e)=>changeLoadNum(e.target.value, 'leaveHandlingFee')" />
                  </el-form-item>
                </li>
                <li>
                  <p>发站其他费(元)</p>
                  <el-form-item prop="leaveOtherFee">
                    <input type="text" class="nativeinput" v-number-only:point :value="formFee.leaveOtherFee" ref="leaveOtherFee" :maxlength="10" @change="(e)=>changeLoadNum(e.target.value, 'leaveOtherFee')" />
                  </el-form-item>
                </li>
                <li>
                  <p>到站装卸费(元)</p>
                  <el-form-item prop="arriveHandlingFee">
                    <input type="text" class="nativeinput" v-number-only:point :value="formFee.arriveHandlingFee" ref="arriveHandlingFee" :maxlength="10" @change="(e)=>changeLoadNum(e.target.value, 'arriveHandlingFee')" />
                  </el-form-item>
                </li>
                <li>
                  <p>到站其他费(元)</p>
                  <el-form-item prop="arriveOtherFee">
                    <input type="text" class="nativeinput" v-number-only:point :value="formFee.arriveOtherFee" ref="arriveOtherFee" :maxlength="10" @change="(e)=>changeLoadNum(e.target.value, 'arriveOtherFee')" />
                  </el-form-item>
                </li>
                <li>
                  <p>封签号</p>
                  <el-form-item prop="sealNumber">
                    <el-input v-model.trim="formFee.sealNumber" :maxlength="20" :size="mini" onkeyup="this.value=this.value.replace(/\s+/g,'')"></el-input>
                  </el-form-item>
                </li>
                <li>
                  <p>油卡号</p>
                  <el-form-item prop="oilCardNumber">
                    <input type="text" class="nativeinput" v-numberOnly :value="formFee.oilCardNumber" ref="oilCardNumber" :maxlength="25" @change="(e)=>changeLoadNum(e.target.value, 'oilCardNumber')" />
                  </el-form-item>
                </li>
              </ul>
              <span class="feeTips">注：运费合计 = 现付运费 + 现付油卡 + 回付运费 + 回付油卡 + 到付运费 + 到付油卡</span>
            </el-form>
          </div>
        </el-collapse-item>
      </el-collapse>
      <!-- 操作按钮区 -->
      <div class="load_btn_boxs" v-if="!isEdit">
        <el-button size="mini" plain type="primary" @click="doAction('precent')">
          <icon-svg icon-class="btn12_guanlianyd" /> 配载率</el-button>
        <el-button size="mini" plain type="primary" @click="doAction('finish')">
          <icon-svg icon-class="btn14_fache" /> 完成配载</el-button>
        <el-button size="mini" plain type="primary" @click="doAction('finishTruck')" v-if='loadTypeId===40? false:true '>
          <icon-svg icon-class="btn17_daocheqd" /> 完成并发车</el-button>
      </div>
      <div class="load_btn_boxs" v-if="isEdit">
        <el-button size="mini" plain type="primary" @click="doAction('precent')">
          <icon-svg icon-class="btn12_guanlianyd" /> 配载率</el-button>
        <el-button size="mini" plain type="primary" @click="doAction('finish')">
          <icon-svg icon-class="btn14_fache" /> 保存</el-button>
      </div>
      <div class="load_btn_transferTable">
        <!-- 穿梭框 -->
        <dataTable @loadTable="getLoadTable" @repertoryList="getRepertoryList" :setLoadTable="setLoadTableList" :isModify="isEdit" @change="getTableChange" :handlingFeeInfo="handlingFeeInfo" @changeHandlingFeeAll="getHandingFeeAll" @resetHandlingFeeInfo="resetHandlingFeeInfo" :isRestorage="isRestorage"></dataTable>
      </div>
      <!-- 配载率 -->
      <loadChart :info="loadInfoPercent" :truckInfo="formModel" :popVisible.sync="showRightTablePercent"></loadChart>
      <!-- 添加车辆信息 -->
      <addTruckInfo :truckSources="truckSources" :truckTypes="truckTypes" :issender="true" :isModify="isModify" :info="selectInfo" :orgid="otherinfo.orgid" :popVisible.sync="addTruckVisible" @close="closeAddTruckVisible" @success="fetchData"></addTruckInfo>
      <!-- 添加司机信息 -->
      <addDriverInfo :licenseTypes="licenseTypes" :issender="true" :isModifyDriver="isModifyDriver" :infoDriver="selectInfoDriver" :orgid="otherinfo.orgid" :popVisible.sync="addDriverVisible" @close="closeAddDriver" @success="fetchData"></addDriverInfo>
      <!-- 实际发车时间 弹出框 -->
      <actualSendtime :popVisible.sync="timeInfoVisible" @time="getActualTime"></actualSendtime>
    </div>
  </div>
</template>
<script>
import { REGEX } from '@/utils/validate'
import { getSelectType } from '@/api/common'
import { mapGetters } from 'vuex'
import { getBatchNo, getSelectAddLoadRepertoryList, postLoadInfo, getUpdateRepertoryLeft, getUpdateRepertoryRight, putLoadInfo, getTrucK, getDrivers } from '@/api/operation/load'
import { getAllDriver } from '@/api/company/driverManage'
import selectType from '@/components/selectType/index'
import dataTable from './components/dataTable'
import SelectTree from '@/components/selectTree/index'
import addTruckInfo from '@/views/company/trunkManage/components/add'
import addDriverInfo from '@/views/company/driverManage/components/add'
import loadChart from './components/loadChart'
import { objectMerge2, parseTime, tmsMath } from '@/utils/index'
import { getSystemTime } from '@/api/common'
import actualSendtime from './components/actualSendtimeDialog'
import { postAllshortDepartList } from '@/api/operation/shortDepart'
import { postSelectLoadMainInfoList } from '@/api/operation/arteryDepart'
import { postSelectLoadMainInfoListDeliver } from '@/api/operation/deliverManage'
export default {
  // name: 'orderload',
  data() {
    const validateInt = function(rule, value, callback) {
      if (REGEX.ONLY_NUMBER_GT.test(value)) {
        callback()
      } else {
        callback(new Error('请输入整数'))
      }
    }
    const validateBigDecimal = function(rule, value, callback) {
      const reg = /^\d+(\.([1-9]|\d[1-9]))?$/
      if (!reg.test(value) && value !== undefined && value !== '') {
        callback(new Error('请输入最多两位小数'))
      } else {
        callback()
      }
    }
    const validateFormMobile = function(rule, value, callback) {
      if (value === '' || value === null || !value || value === undefined) {
        callback(new Error('不能为空'))
      } else if (REGEX.MOBILE.test(value)) {
        callback()
      } else {
        callback(new Error('请输入有效的手机号码'))
      }
    }
    const validateStringEight = function(rule, value, callback) {
      if (value === '' || value === null || !value || value === undefined) {
        callback(new Error('不能为空'))
      } else if (value.length > 8) {
        callback(new Error('不能超过8个字符'))
      } else {
        callback()
      }
    }
    const validateStringTen = function(rule, value, callback) {
      if (value === '' || value === null || !value || value === undefined) {
        callback(new Error('不能为空'))
      } else if (value.length > 10) {
        callback(new Error('不能超过10个字符'))
      } else {
        callback()
      }
    }
    return {
      handlingFeeInfo: {
        handlingFeeAll: null,
        apportionTypeId: null
      },
      searchQueryData: {
        pageSize: 100,
        currentPage: 1,
        vo: {
          orgId: '',
          loadTypeId: '',
          batchTypeId: '',
          truckIdNumber: '',
          dirverName: ''
        }
      },
      // arriveOrgid: '',
      timeInfoVisible: false,
      apportionTypeList: [],
      driverKey: 0,
      truckKey: 0,
      tablekey: '',
      loadTruck: '',
      truckMessage: '',
      contractNo: '',
      formModel: {
        loadTime: parseTime(new Date()),
        requireArrivedTime: '',
        planArrivedTime: '',
        orgid: '',
        dirverName: '',
        dirverMobile: '',
        truckIdNumber: '',
        arriveOrgid: ''
        // truckLoad: '',
        // truckVolume: ''
      },
      isDirectDelivery: false,
      formFee: {},
      loadTruck: 'loadTruckOne',
      showRightTablePercent: false,
      loading: false,
      selectedRight: [],
      selectedLeft: [],
      leftTable: [],
      rightTable: [],
      loadTableInfo: [],
      loadInfoPercentOrg: [],
      mini: 'mini',
      loadInfo: {
        tmsOrderLoad: {},
        tmsOrderLoadDetailsList: [],
        tmsOrderLoadFee: {}
      },
      setLoadTableList: {
        left: [],
        right: []
      },
      orgData: {},
      isEdit: false,
      isModify: false,
      repertoryList: [],
      addTruckVisible: false,
      truckSources: [],
      truckTypes: [],
      selectInfo: {},
      licenseTypes: [],
      isModifyDriver: false,
      selectInfoDriver: {},
      addDriverVisible: false,
      DriverList: [],
      TruckList: [],
      cacheDriverList: {},
      cacheTruckList: {},
      Drivers: [],
      Trucks: [],
      submitvalidate: false,
      // loadTypeId: 38,
      batchTypeIdFinish: 47,
      batchTypeIdFinishTruck: 48,
      inited: false,
      formModelRules: {
        // arriveOrgid: [{ required: true, trigger: 'change', message: '不能为空' }],
        apportionTypeName: [{ required: true, trigger: 'change', message: '必选' }],
        // handlingFeeAll: [{ required: true, trigger: 'change', validator: validateStringEight }],
        truckIdNumber: [{ required: true, trigger: 'change', validator: validateStringEight }],
        dirverName: [{ required: true, trigger: 'change', validator: validateStringTen }],
        dirverMobile: [{ required: true, trigger: 'change', validator: validateFormMobile }]
        // truckVolume: [{ trigger: 'blur', validator: validateBigDecimal }]
      },
      isRestorage: false,
      formFeeRules: {
        // nowpayCarriage: [{ trigger: 'blur', validator: validateBigDecimal }],
        // nowpayOilCard: [{ trigger: 'blur', validator: validateBigDecimal }],
        // backpayCarriage: [{ trigger: 'blur', validator: validateBigDecimal }],
        // backpayOilCard: [{ trigger: 'blur', validator: validateBigDecimal }],
        // arrivepayCarriage: [{ trigger: 'blur', validator: validateBigDecimal }],
        // arrivepayOilCard: [{ trigger: 'blur', validator: validateBigDecimal }],
        // carloadInsuranceFee: [{ trigger: 'blur', validator: validateBigDecimal }],
        // leaveHandlingFee: [{ trigger: 'blur', validator: validateBigDecimal }],
        // leaveOtherFee: [{ trigger: 'blur', validator: validateBigDecimal }],
        // arriveHandlingFee: [{ trigger: 'blur', validator: validateBigDecimal }],
        // arriveOtherFee: [{ trigger: 'blur', validator: validateBigDecimal }]
      },
      apportionTypeDescript: ['(运单 - 回扣）/（总运费 - 总回扣）* 操作费', '操作费 / 票数', '该单重量 / 本车总重量 * 操作费', '该单体积 / 本车总体积 * 操作费', '该单件数 / 本车总件数 * 操作费']
    }
  },
  computed: {
    ...mapGetters([
      'otherinfo'
    ]),
    arriveOrgid(newVal) {
      this.$set(this.formModel, 'arriveOrgid', newVal)
      // this.formModel.arriveOrgid = newVal
    },
    orgid() {},
    loadInfoPercent() {
      const data = Object.assign([], this.loadInfoPercentOrg)
      return data
    },
    loadTimeFormName() {
      return (this.loadTypeId === 38 ? '配载' : (this.loadTypeId === 39 ? '配载' : '送货')) + '时间'
    },
    typeid() {
      return Number(this.$route.query.loadTypeId)
    },
    loadTypeId: {
      get() {
        return Number(this.$route.query.loadTypeId)
      },
      set() {

      }
    },
    totalFormFee: {
      get() {
        let count = 0
        count = tmsMath.add(this.formFee.nowpayCarriage, this.formFee.nowpayOilCard, this.formFee.backpayCarriage, this.formFee.backpayOilCard, this.formFee.arrivepayCarriage, this.formFee.arrivepayOilCard).result()
        return count
      },
      set() {}
    }
  },
  components: {
    selectType,
    dataTable,
    SelectTree,
    addTruckInfo,
    addDriverInfo,
    loadChart,
    actualSendtime
  },
  created() {
    this.setLoadTypeId()
  },
  mounted() {
    // this.getSelectType()
    // this.init()
    // this.getSystemTime()
  },
  activated() {
    this.getSystemTime()
  },
  watch: {
    '$route':{
      handler(to, from) {
        const bothBool = false
        if (to.path.indexOf('/operation/order/load') !== -1) {
          // 1
          // 3
          if (from && from.path.indexOf('/operation/order/load') !== -1) {
            this.switchUrl(from.fullPath, true)
          }
          this.switchUrl(to.fullPath, false) // 从其他页面跳转进配载页面
        } else if (from.path.indexOf('/operation/order/load') !== -1) {
          // 2
          // 4
          this.switchUrl(from.fullPath, true) //  从配载页面跳转进其他页面
        } else {
          // this.getSelectType()
          // this.init()
          // this.getSystemTime()
        }
      },
      immediate: true
    }
  },
  methods: {
    switchUrl(path, issave) {
      const visited = this.visitedViews().filter(el => el.fullPath === path)
      path = decodeURIComponent(path)
      let data = {
        truckMessage: this.truckMessage,
        contractNo: this.contractNo,
        formModel: this.formModel,
        formFee: this.formFee,
        apportionTypeList: this.apportionTypeList,
        loadTable: {
          left: this.repertoryList,
          right: this.loadTableInfo
        }
      }
      if (issave) {
        // save data 离开配载页面时需要缓存当前配载页面的数据进sessionStorage
        console.log('save daTA::::::', path)
        sessionStorage.setItem(path, JSON.stringify(data))
        this.loadTableInfo = []
        this.repertoryList = []
        this.apportionTypeList = []
        this.formFee = objectMerge2({}, this.$options.data().orgData)
        this.formModel = objectMerge2({}, this.$options.data().formModel)
        this.$refs['formModel'].resetFields()
      } else {
        // read data
        if (visited) { // 如果tab列表里面有当前配载页 就从sessionStorage恢复页面数据
          console.log('ssssssss22222222222222')
          data = sessionStorage.getItem(path)
          if (data) {
            data = JSON.parse(data)
            // 初始化前需要重置所有有变更的变量
            if (this.$route.query.flag) {
              this.isEdit = true
            } else {
              this.isEdit = false
            }
            this.isRestorage = true
            // render data
            console.log('render data', data)
            this.formModel = data.formModel
            this.formFee = data.formFee
            this.$set(this.setLoadTableList, 'left', data.loadTable.left)
            this.$set(this.setLoadTableList, 'right', data.loadTable.right)
            this.apportionTypeList = data.apportionTypeList
            this.truckMessage = data.truckMessage // 批次号
            this.contractNo = data.contractNo // 合同编号
          } else {
            this.isRestorage = false
            // normal render
            this.getSelectType()
            this.init()
            this.getSystemTime()
          }
        } else {
          this.isRestorage = false
          // normal render
          this.getSelectType()
          this.init()
          this.getSystemTime()
        }
      }
    },
    visitedViews() {
      return this.$store.state.tagsView.visitedViews
    },
    init() {
      this.formModel = this.$options.data().formModel
      this.$refs['formModel'] && this.$refs['formModel'].resetFields()
      this.setLoadTypeId()
      this.setLoadTableList = {
        left: [],
        right: []
      }
      this.initIsEdit().then(res => {
        this.formModel.orgid = this.orgid
        this.DriverList = this.Drivers
        this.TruckList = this.Trucks
        console.log('isEdit', this.isEdit)
        this.getSelectAddLoadRepertoryList()
      })

      if (!this.inited) {
        this.inited = true
        this.initInfo()
      }
    },
    getTableChange(obj) {
      this.loadInfoPercentOrg = objectMerge2([], obj)
      this.loadTableInfo = obj
    },
    getRepertoryList(list) {
      this.repertoryList = list
    },
    /**
     * load_type_id：配载类型（字典表38-40）
     * batch_type_id：批次状态（字典表46-58，短驳和干线配载完就是已装车，短驳发车是短驳中，干线发车是在途中，送货为送货中）
     */
    setLoadTypeId() {
      const typeid = Number(this.$route.query.loadTypeId)
      if (typeid) {
        // this.loadTypeId = typeid
        switch (typeid) {
          case 38: // 短驳
            this.batchTypeIdFinish = 47 // 完成配载
            this.batchTypeIdFinishTruck = 48 // 配载并发车
            console.log('短驳38', this.loadTypeId, this.batchTypeIdFinish, this.batchTypeIdFinishTruck)
            break
          case 39: // 干线
            this.batchTypeIdFinish = 52
            this.batchTypeIdFinishTruck = 53
            console.log('干线39', this.loadTypeId, this.batchTypeIdFinish, this.batchTypeIdFinishTruck)
            break
          case 40: // 送货
            this.batchTypeIdFinish = 57
            this.batchTypeIdFinishTruck = 57
            console.log('送货40', this.loadTypeId, this.batchTypeIdFinish, this.batchTypeIdFinishTruck)
            break
        }
      } else {
        this.loadTypeId = 38 // 默认是新增短驳
        this.batchTypeIdFinish = 47 // 完成配载
        this.batchTypeIdFinishTruck = 48 // 配载并发车
      }
    },
    setOrgData() {
      console.log('initIsEdit3', this.$route.query.loadTypeId)
      this.searchQueryData.vo.orgId = this.otherinfo.orgid
      const loadTypeId = Number(this.$route.query.loadTypeId)
      let pro
      switch (loadTypeId) {
        case 38:
          console.log('initIsEdit4')
          this.searchQueryData.vo.loadTypeId = 38
          this.searchQueryData.vo.batchTypeId = 46
          this.searchQueryData.vo.batchNo = this.$route.query.flag
          pro = postAllshortDepartList(this.searchQueryData).then(data => {
            this.orgData = objectMerge2({}, data.list[0])
            console.log(data.list[0], this.orgData)
            this.setAfterOrgData()
          })
          break
        case 39:
          this.searchQueryData.vo.loadTypeId = 39
          this.searchQueryData.vo.batchNo = this.$route.query.flag
          pro = postSelectLoadMainInfoList(this.searchQueryData).then(data => {
            if (data) {
              this.orgData = objectMerge2({}, data.list[0])
              this.setAfterOrgData()
            }
          })
          break
        case 40:
          this.searchQueryData.vo.loadTypeId = 40
          this.searchQueryData.vo.batchTypeId = 56
          this.searchQueryData.vo.batchNo = this.$route.query.flag
          pro = postSelectLoadMainInfoListDeliver(this.searchQueryData).then(data => {
            if (data) {
              this.orgData = objectMerge2({}, data.list[0])
              this.setAfterOrgData()
            }
          })
          break
      }
      return pro
    },
    setAfterOrgData() {
      // this.isEdit = true
      this.truckMessage = this.orgData.batchNo
      this.contractNo = this.orgData.contractNo ? this.orgData.contractNo : null
      // formModel 数据
      const data = {}
      data.id = this.orgData.id
      data.orgid = this.orgData.orgid
      data.batchNo = this.orgData.batchNo
      data.arriveOrgid = this.orgData.arriveOrgid
      data.loadTypeId = this.loadTypeId
      data.batchTypeId = this.batchTypeIdFinish
      data.apportionTypeId = this.orgData.apportionTypeId
      data.truckIdNumber = this.orgData.truckIdNumber
      data.dirverName = this.orgData.dirverName
      data.dirverMobile = this.orgData.dirverMobile
      data.truckLoad = this.orgData.truckLoad
      data.truckVolume = this.orgData.truckVolume
      data.loadTime = this.orgData.loadTime
      data.shortFee = this.orgData.shortFee
      data.requireArrivedTime = this.orgData.requireArrivedTime
      data.planArrivedTime = this.orgData.planArrivedTime
      data.remark = this.orgData.remark
      data.deliveryDetailFee = this.orgData.deliveryDetailFee // 送货费 40-送货管理修改的时候用
      data.deliveryHandlingFee = this.orgData.deliveryHandlingFee
      data.handlingFeeAll = this.orgData.handlingFeeAll
      this.formModel = objectMerge2({}, data)
      this.handlingFeeInfo.apportionTypeId = this.orgData.apportionTypeId
      this.handlingFeeInfo.handlingFeeAll = this.orgData.handlingFeeAll
      // formFee 数据
      const dataFee = {}
      dataFee.nowpayCarriage = this.orgData.nowpayCarriage
      dataFee.nowpayOilCard = this.orgData.nowpayOilCard
      dataFee.backpayCarriage = this.orgData.backpayCarriage
      dataFee.backpayOilCard = this.orgData.backpayOilCard
      dataFee.arrivepayCarriage = this.orgData.arrivepayCarriage
      dataFee.arrivepayOilCard = this.orgData.arrivepayOilCard
      dataFee.carloadInsuranceFee = this.orgData.carloadInsuranceFee
      dataFee.leaveHandlingFee = this.orgData.leaveHandlingFee
      dataFee.leaveOtherFee = this.orgData.leaveOtherFee
      dataFee.arriveHandlingFee = this.orgData.arriveHandlingFee
      dataFee.arriveOtherFee = this.orgData.arriveOtherFee
      dataFee.sealNumber = this.orgData.sealNumber
      dataFee.oilCardNumber = this.orgData.oilCardNumber
      this.formFee = objectMerge2({}, dataFee)
    },
    initIsEdit() {
      this.orgData = objectMerge2({}, this.$options.data().orgData)
      this.formFee = objectMerge2({}, this.$options.data().orgData)
      if (this.$route.query.flag) {
        this.isEdit = true
        return this.setOrgData()
      } else {
        this.orgData = objectMerge2({}, this.$options.data().orgData)
        this.isEdit = false
        return this.getLoadNo()
      }
    },
    getLoadNo() {
      // if (this.loadTypeId) {
        return getBatchNo(this.otherinfo.orgid, this.loadTypeId).then(data => {
            this.truckMessage = data.text // 批次号
            this.contractNo = data.text // 合同编号？？？？？
          })
          .catch(err => {
            this._handlerCatchMsg(err)
          })
      // }else {
      //   return
      // }
    },
    getSystemTime() { // 获取系统时间
      if (!this.isEdit) {
        getSystemTime().then(data => {
          this.formModel.loadTime = data.trim()
        }).catch((err) => {
          this.loading = false
          this._handlerCatchMsg(err)
        })
      }
    },
    getSelectAddLoadRepertoryList() { // 获取列表
      this.loading = true
      if (this.isEdit) {
        this.getUpdateRepertoryLeft()
        this.getUpdateRepertoryRight()
      } else {
        this.$set(this.setLoadTableList, 'left', [])
        getSelectAddLoadRepertoryList(this.otherinfo.orgid).then(data => {
            this.setLoadTableList.left = data.data
            this.loading = false
            console.log('不修改 ')
          })
          .catch(err => {
            this.loading = false
            this._handlerCatchMsg(err)
          })
      }
    },
    changeTableKey() {
      this.tablekey = Math.random()
    },
    doAction(type) {
      switch (type) {
        case 'reset':
          this.$nextTick(() => {
            this.resetFieldsForm()
          })
          break
        case 'precent': // 设置配载率
          this.showPercent()
          break
        case 'finish': // 完成配载
          this.finishLoadInfo()
          break
        case 'finishTruck': // 完成并发车
          this.timeInfoVisible = true
          break
        case 'addTruck': // 添加车辆信息
          this.addTruck()
          break
        case 'addDriver': // 添加司机信息
          this.addDriver()
          break
      }
    },
    showPercent() {
      this.showRightTablePercent = true
    },
    formValidate() { // 判断表单验证
      console.log(this.formModel, this.formFee)
      this.$refs['formModel'].validate((valid) => {
        if (valid && this.loadTypeId === 39) {
          this.$refs['formFee'].validate((validFee) => {
            if (validFee) {
              if (this.loadTableInfo.length < 1) {
                this.submitvalidate = false
                this.$message({ type: 'warning', message: '右边数据表格不能为空' })
              } else {
                this.submitvalidate = true
              }
            } else {
              this.$message({ type: 'warning', message: '请填写完整费用表单' })
              this.submitvalidate = false
            }
          })
        } else if (valid && this.loadTypeId !== 39) {
          this.submitvalidate = true
        } else {
          this.$message({ type: 'warning', message: '请填写完整表单' })
          this.submitvalidate = false
        }
      })
    },
    gotoPage() { // 操作成功后跳转回到配载列表页面
      this.eventBus.$emit('closeCurrentView')
      switch (this.loadTypeId) {
        case 38: // 短驳
          this.$router.push({ path: '././shortDepart/deliver', query: { pageKey: new Date().getTime() } })
          this.eventBus.$emit('replaceCurrentView', '/operation/order/shortDepart/deliver')
          break
        case 39: // 干线
          this.$router.push({ path: '././arteryDepart', query: { pageKey: new Date().getTime() } })
          this.eventBus.$emit('replaceCurrentView', '/operation/order/arteryDepart')
          break
        case 40: // 送货
          this.$router.push({ path: '././deliverManage', query: { pageKey: new Date().getTime() } })
          this.eventBus.$emit('replaceCurrentView', '/operation/order/deliverManage')
          break
      }
    },
    finishLoadInfo() {
      if (this.loading) {
        return false
      }
      this.formValidate() // 表单验证
      if (this.submitvalidate) {
        this.setData() // 处理数据
        this.$nextTick(() => {
          if (this.isEdit) {
            this.loading = true
            console.log('这里是编辑完成配载', this.loadInfo)
            putLoadInfo(this.loadInfo).then(data => {
                this.loading = false
                this.$message({ type: 'success', message: '修改配载信息成功' })
                this.resetFieldsForm()
                this.$nextTick(() => {
                  this.gotoPage() // 操作成功后跳转到配载列表页面
                })
              })
              .catch(err => {
                this.loading = false
                this._handlerCatchMsg(err)
              })
          } else {
            console.log('这里是添加完成配载', this.loadInfo)
            this.loading = true
            postLoadInfo(this.loadInfo).then(data => { // 插入配载信息
                this.loading = false
                this.$message({ type: 'success', message: '插入配载信息成功' })
                this.resetFieldsForm()
                this.$nextTick(() => {
                  this.gotoPage()
                })
              })
              .catch(err => {
                this.loading = false
                this._handlerCatchMsg(err)
              })
          }
        })
      }
    },
    getActualTime(obj) {
      this.finishTruckInfo(obj)
    },
    finishTruckInfo(obj) {
      if (this.loading) {
        return false
      }
      this.formValidate() // 表单验证
      if (this.submitvalidate) {
        this.setDataFinishTruck() // 处理数据
        this.$nextTick(() => {
          this.loading = true
          this.$set(this.loadInfo.tmsOrderLoad, 'actualSendtime', obj.actualSendtime)
          postLoadInfo(this.loadInfo).then(data => { // 完成并发车
              this.loading = false
              this.$message({ type: 'success', message: '保存成功' })
              this.resetFieldsForm()
              this.$nextTick(() => {
                this.gotoPage() // 操作成功后跳转到配载列表页面
              })
            })
            .catch(err => {
              this.loading = false
              this._handlerCatchMsg(err)
            })
        })
      }
    },
    getLoadTable(obj) { // 获取穿梭框表格数据列表
      this.loadInfoPercentOrg = objectMerge2([], obj)
      this.loadTableInfo = obj
    },
    resetFieldsForm() { // resetFields表单验证
      const formName = ['formModel', 'formFee']
      const loadtypeid = this.loadTypeId
      objectMerge2(this.$data, this.$options.data())
      this.$nextTick(() => {
        if (loadtypeid === 39) { // 只有39-干线有表单formFee，38-短驳费 40-送货费
          formName.forEach(e => {
            this.$refs[e].resetFields()
          })
        } else {
          this.$refs[formName[0]].resetFields()
        }
      })
      if (loadtypeid) {
        this.$router.push({ path: '././load', query: { loadTypeId: loadtypeid } })
      } else {}
      this.init()
    },
    changeDirect(newVal) { // true-直送 false-不直送
      console.log('orgid', this.otherinfo.orgid)
      if (newVal) { // 如果直送就不用选择网点
        this.formModel.arriveOrgid = ''
      } else { // 不直送要判断网点
        if (this.isEdit) { // 编辑配载信息时
          this.formModel.arriveOrgid = this.orgData.orgid
        } else { // 添加配载信息时
          this.formModel.arriveOrgid = ''
        }
      }
      console.log(newVal, this.formModel.arriveOrgid)
    },
    setData() { // 完成配载 ：处理数据格式。。。
      this.setLoadTypeId()
      if (this.isEdit) { // 编辑配载信息时
        this.$set(this.formModel, 'orgid', this.orgData.orgid)
      } else { // 添加配载信息时
        this.$set(this.formModel, 'orgid', this.otherinfo.orgid)
      }
      this.$set(this.formModel, 'batchNo', this.truckMessage)
      this.$set(this.formModel, 'loadTypeId', this.loadTypeId)
      this.$set(this.formModel, 'batchTypeId', this.batchTypeIdFinish)
      if (this.loadTypeId === 39) { // 干线
        this.$set(this.formModel, 'contractNo', this.contractNo)
        this.$set(this.formModel, 'oilCardNumber', this.formFee.oilCardNumber) // 封签号 不属于费用
        this.$set(this.formModel, 'sealNumber', this.formFee.sealNumber) // 油卡号 不属于费用
      }
      delete this.formFee.oilCardNumber
      delete this.formFee.sealNumber

      this.loadInfo.tmsOrderLoadFee = objectMerge2({}, this.formFee)
      this.loadInfo.tmsOrderLoad = objectMerge2({}, this.formModel)
      this.loadInfo.tmsOrderLoadDetailsList = objectMerge2([], this.loadTableInfo)
      if (this.loadTypeId === 40) { // 送货费deliveryFee = 送货费deliveryDetailFee + 装卸费deliveryHandlingFee
        const total = tmsMath.add(this.formModel.deliveryDetailFee, this.formModel.deliveryHandlingFee).result()
        this.$set(this.loadInfo.tmsOrderLoadFee, 'deliveryFee', total)
        this.$set(this.loadInfo.tmsOrderLoadFee, 'deliveryDetailFee', this.formModel.deliveryDetailFee)
        this.$set(this.loadInfo.tmsOrderLoadFee, 'deliveryHandlingFee', this.formModel.deliveryHandlingFee)
      } else {
        this.$set(this.loadInfo.tmsOrderLoadFee, 'shortFee', this.formModel.shortFee)
        this.$set(this.loadInfo.tmsOrderLoadFee, 'handlingFeeAll', this.formModel.handlingFeeAll)
        delete this.loadInfo.tmsOrderLoad.shortFee
        delete this.loadInfo.tmsOrderLoad.handlingFeeAll
      }
      // 时间处理
      this.formModel.requireArrivedTime = this.formModel.requireArrivedTime ? parseTime(this.formModel.requireArrivedTime, '{y}-{m}-{d} ') + '23:59:59' : ''
      this.formModel.planArrivedTime = this.formModel.planArrivedTime ? parseTime(this.formModel.planArrivedTime, '{y}-{m}-{d} ') + '23:59:59' : ''
      this.formModel.loadTime = parseTime(this.formModel.loadTime, '{y}-{m}-{d} ') + '00:00:00'
    },
    setDataFinishTruck() { // 完成并发车 ：处理数据格式。。。
      this.$set(this.formModel, 'batchNo', this.truckMessage)
      this.$set(this.formModel, 'orgid', this.otherinfo.orgid)
      this.$set(this.formModel, 'loadTypeId', this.loadTypeId) // 配载类型：38-短驳 39-干线 40-送货
      this.$set(this.formModel, 'batchTypeId', this.batchTypeIdFinishTruck) // 批次状态： 干线(52已装车,53在途中)
      if (this.loadTypeId === 39) {
        this.$set(this.formModel, 'contractNo', this.contractNo)
        this.$set(this.formModel, 'oilCardNumber', this.formFee.oilCardNumber) // 封签号 不属于费用
        this.$set(this.formModel, 'sealNumber', this.formFee.sealNumber) // 油卡号 不属于费用
      }
      delete this.formFee.oilCardNumber
      delete this.formFee.sealNumber

      this.loadInfo.tmsOrderLoadFee = objectMerge2({}, this.formFee)
      this.loadInfo.tmsOrderLoad = objectMerge2({}, this.formModel)
      this.loadInfo.tmsOrderLoadDetailsList = objectMerge2([], this.loadTableInfo)
      if (this.loadTypeId === 40) { // 送货费deliveryFee = 送货费deliveryDetailFee + 装卸费deliveryHandlingFee
        const total = tmsMath.add(this.formModel.deliveryDetailFee, this.formModel.deliveryHandlingFee).result()
        this.$set(this.loadInfo.tmsOrderLoadFee, 'deliveryFee', total)
        this.$set(this.loadInfo.tmsOrderLoadFee, 'deliveryDetailFee', this.formModel.deliveryDetailFee)
        this.$set(this.loadInfo.tmsOrderLoadFee, 'deliveryHandlingFee', this.formModel.deliveryHandlingFee)
      } else {
        this.$set(this.loadInfo.tmsOrderLoadFee, 'shortFee', this.formModel.shortFee)
        this.$set(this.loadInfo.tmsOrderLoadFee, 'handlingFeeAll', this.formModel.handlingFeeAll)
        delete this.loadInfo.tmsOrderLoad.shortFee
        delete this.loadInfo.tmsOrderLoad.handlingFeeAll
      }
      // console.log('短驳完成发车', this.loadInfo)
      // 时间处理
      // this.loadInfo.tmsOrderLoad.loadTime = parseTime(this.loadInfo.tmsOrderLoad.loadTime)
      // this.loadInfo.tmsOrderLoad.requireArrivedTime = parseTime(this.loadInfo.tmsOrderLoad.requireArrivedTime)
      this.formModel.requireArrivedTime = this.formModel.requireArrivedTime ? parseTime(this.formModel.requireArrivedTime, '{y}-{m}-{d} ') + '23:59:59' : ''
      this.formModel.planArrivedTime = this.formModel.planArrivedTime ? parseTime(this.formModel.planArrivedTime, '{y}-{m}-{d} ') + '23:59:59' : ''
      this.formModel.loadTime = parseTime(this.formModel.loadTime, '{y}-{m}-{d} ') + '00:00:00'
    },
    getUpdateRepertoryLeft() { // 修改时 左边的数据列表
      console.log('left', this.orgData.orgid)
      if (this.orgData.orgid) {
        this.loading = true
        getUpdateRepertoryLeft(this.orgData.orgid, this.orgData.loadId).then(data => {
            this.$set(this.setLoadTableList, 'left', data.data) // this.setLoadTableList.left = objectMerge2([], data.data)
            console.log('修改ing左边列表', this.setLoadTableList.left)
            this.loading = false
          })
          .catch(err => {
            this.loading = false
            this._handlerCatchMsg(err)
          })
      }
      return this.setLoadTableList
    },
    getUpdateRepertoryRight() { // 修改时 右边的数据列表
      console.log('right', this.orgData.orgid)
      if (this.orgData.orgid) {
        getUpdateRepertoryRight(this.orgData.orgid, this.orgData.loadId).then(data => {
            this.$set(this.setLoadTableList, 'right', data.data)
            // this.setLoadTableList.right = objectMerge2([], data.data)
            console.log('修改ing右边列表', this.setLoadTableList.right)
          })
          .catch(err => {
            this._handlerCatchMsg(err)
          })
      }
      return this.setLoadTableList
    },
    addTruck() { // 添加车辆信息
      this.addTruckVisible = true
    },
    addDriver() { // 添加司机信息
      this.infoDriver = {}
      this.addDriverVisible = true
    },
    fetchData() {
      this.initInfo() // 添加完司机或车辆之后，刷新下拉数据
    },
    closeAddDriver() {
      this.addDriverVisible = false
    },
    closeAddTruckVisible() {
      this.addTruckVisible = false
    },
    initInfo() { // 初始化车辆和司机下拉信息
      this.loading = false
      this.truckKey = new Date().getTime()
      this.driverKey = new Date().getTime()
      this.Drivers = this.$options.data().Drivers
      this.Trucks = this.$options.data().Trucks
      this.cacheDriverList = this.$options.data().cacheDriverList
      this.cacheTruckList = this.$options.data().cacheTruckList
      // 切换组织了列表时更新司机列表信息
      this.getDrivers(this.otherinfo.orgid)
      this.getTrucks(this.otherinfo.orgid)
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
          })
          .catch(err => {
            this._handlerCatchMsg(err)
          })
      }
    },
    handleSelect(item) {
      this.driverKey = new Date().getTime()
      if (this.formModel.truckIdNumber === '' || this.formModel.truckIdNumber === undefined) {
        this.formModel.truckIdNumber = item.truckIdNumber
      }
      this.formModel.dirverMobile = item.driverMobile
      this.formModel.dirverName = item.driverName
      this.isDriverSelect = true
    },
    handleSelectTruck(item) {
      this.truckKey = new Date().getTime()
      this.formModel.truckIdNumber = item.truckIdNumber
      this.formModel.dirverMobile = item.driverMobile
      this.formModel.dirverName = item.driverName
      this.$set(this.formModel, 'truckLoad', Number(item.truckLoad))
      this.$set(this.formModel, 'truckVolume', Number(item.truckVolume))
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
    blurDriver() { // 司机输入框失去响应时
      this.Drivers.forEach(el => {
        if (this.formModel.dirverName === el.driverName) {
          this.formModel.dirverName = el.driverName
        } else {
          if (!this.isDriverSelect) {
            this.isDriverSelect = false
            this.formModel.dirverName = ''
            this.formModel.dirverMobile = ''
          }
        }
      })
    },
    getSelectType() {
      getSelectType('apportion_type', this.otherinfo.orgid || this.otherinfo.companyId).then(data => {
          if (data) {
            this.apportionTypeList = data
            this.apportionTypeList.forEach((e, index) => {
              this.$set(e, 'descript', this.apportionTypeDescript[index])
            })
          }
        })
        .catch(err => {
          this._handlerCatchMsg(err)
        })
    },
    changeTruckNum(val, type) { // 原生input 设置值
      this.$set(this.formModel, type, Number(val))
    },
    changeLoadNum(val, type) {
      this.$set(this.formFee, type, val)
    },
    changeHandlingFeeAll(val) {
      this.$set(this.handlingFeeInfo, 'handlingFeeAll', Number(val))
      this.$set(this.formModel, 'handlingFeeAll', Number(val))
    },
    getApportionTypeId(value) { // 选择分摊方式
      console.log('getApportionTypeId', value, this.formModel.apportionTypeId)
      this.handlingFeeInfo.apportionTypeId = value
    },
    getHandingFeeAll(value) {
      this.$set(this.formModel, 'handlingFeeAll', value)
    },
    resetHandlingFeeInfo(value) {
      this.$set(this.formModel, 'apportionTypeId', value.apportionTypeId)
      this.$set(this.handlingFeeInfo, 'apportionTypeId', value.apportionTypeId)
    }
  }
}

</script>
<style lang="scss">
.load-steup {
  min-width: 1000px;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  position: relative;
  .load_btn_transferTable {
    display: flex;
    flex-direction: column;
    flex: 1;
    height: 100%;
  }
  .load_btn_boxs {
    position: relative;
    top: 18px;
    right: 10px;
    z-index: 33;
    text-align: right;
    height: 0;
  }
  .load-steup-form {
    flex-grow: 1;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 10px 10px 0 10px;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;

    .loadFrom {
      margin-bottom: 10px;
      .loadFrom-type {
        position: absolute;
        z-index: 33;
        right: 40px;
        top: 20px;
      }
      .formItemTextDanger {
        .el-form-item__label {
          color: #ef0000;
        }
      }
    }
    .el-collapse {
      border: 2px solid #cdf;
    }
    .el-collapse-item__content {
      padding: 0;
    }
    .el-collapse-item__header {
      border-bottom: 2px solid #cdf;
      background-color: #FFFFFF;
      padding: 0 0 0 20px;
      height: 40px;
      line-height: 40px;
      font-size: 16px;
      color: #333;
      position: relative;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .el-collapse-item__arrow {
      position: absolute;
      left: 20px;
      top: 5px;
    }
    .loadFrom-type-baseInfo {
      display: flex;
      flex-direction: row;
      margin-bottom: -10px;
      .input-append {
        position: absolute;
        left: 100%;
        top: 0;
        font-size: 14px;
        margin-left: -25px;
        color: #999;
      }
      .el-input {
        width: 210px;
      }
      .nativeinput {
        width: 210px;
        border: 1px solid #dcdfe6;
        border-radius: 4px;
      }
      .el-input-group__append,
      .el-input-group__prepend {
        padding: 0 5px;
      }
      .multipleInput {
        .el-form-item__content {
          display: flex;
          flex-direction: row;
        }
        .el-input {
          width: 105px;
        }
      }
    }
  }
}

.my-autocomplete {
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

.feeTips {
  color: #999;
  font-size: 12px;
  margin-left: 10px;
}

ul.feeList_lyy {
  margin: 10px 10px 5px 10px;
  border: 1px solid #d0d7e5;
  display: flex;
  li {
    text-align: center;
    height: 70px;
    border-right: 1px solid #d0d7e5;
    p {
      font-size: 13px;
      background-color: #eaf0ff;
      line-height: 36px;
      height: 36px;
      margin-bottom: -5px;
    }
    .el-input__inner {
      margin-top: -5px;
      height: 33px;
      border: none;
    }
    .el-input__inner:focus {
      background-color: #d0d7e5;
      border-radius: 0px;
    }
    .el-form-item__error {
      margin-top: -6px;
    }
    .el-input.is-disabled .el-input__inner {
      text-align: center;
      color: #222;
    }
  }
}

</style>
