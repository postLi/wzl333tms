<template>
  <div class="createOrder-main" v-loading="loading">
    <div class="createOrder-title"><span>收发货凭证</span></div>
    <el-form :model="form" label-width="100px" :rules="rules2" ref="ruleForm" :show-message="false" status-icon inline label-position="right" size="mini">
    <div class="createOrder-info clearfix">
      <div class="order-num">运单号： <span class="order-num-info">
        <el-form-item prop="tmsOrderShip.shipSn">
          <el-input size="mini" maxlength="20" :disabled="!canChangeOrderNum" v-model="form.tmsOrderShip.shipSn" />
        </el-form-item>
        </span></div>
      <div class="create-num">开单日期： <span class="create-num-info">
         <el-date-picker
            v-model="form.tmsOrderShip.createTime"
            type="date"
            value-format="yyyy-MM-dd hh:mm:ss"
            :disabled="!canChangeOrderDate"
            :picker-options="pickoption"
            v-if="nowTime"
            size="mini"
            placeholder="选择日期">
          </el-date-picker>
      </span></div>
    </div>
    <div class="order-main">
      <!-- 网点信息 -->
      <el-row class="firstline-order">
        <el-col :span="4">
          <div class="order-form-item">
            <span class="order-form-label">开单网点</span>
            <el-form-item prop="tmsOrderShip.shipSn">
              <el-input size="mini" maxlength="20" :disabled="!canChangeOrderNum" v-model="form.tmsOrderShip.shipSn" />
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="order-form-item">
            <span class="order-form-label">出发城市</span>
            <el-form-item prop="tmsOrderShip.shipSn">
              <el-input size="mini" maxlength="20" :disabled="!canChangeOrderNum" v-model="form.tmsOrderShip.shipSn" />
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="order-form-item">
            <span class="order-form-label">到达城市</span>
            <el-form-item prop="tmsOrderShip.shipSn">
              <el-input size="mini" maxlength="20" :disabled="!canChangeOrderNum" v-model="form.tmsOrderShip.shipSn" />
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="order-form-item">
            <span class="order-form-label">目的网点</span>
            <el-form-item prop="tmsOrderShip.shipSn">
              <el-input size="mini" maxlength="20" :disabled="!canChangeOrderNum" v-model="form.tmsOrderShip.shipSn" />
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="order-form-item">
            <span class="order-form-label">交接方式</span>
            <el-form-item prop="tmsOrderShip.shipSn">
              <el-input size="mini" maxlength="20" :disabled="!canChangeOrderNum" v-model="form.tmsOrderShip.shipSn" />
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="order-form-item">
            <span class="order-form-label">货号</span>
            <el-form-item prop="tmsOrderShip.shipSn">
              <el-input size="mini" maxlength="20" :disabled="!canChangeOrderNum" v-model="form.tmsOrderShip.shipSn" />
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <!-- 收发货方 -->
      <div class="customer-form clearfix">
        <div class="sender-form">
          <div class="form-title">
            发货方
          </div>
          <div class="order-form-item">
            <span class="order-form-label">发货单位</span>
            <el-form-item prop="tmsOrderShip.shipSn">
              <el-input size="mini" maxlength="20" :disabled="!canChangeOrderNum" v-model="form.tmsOrderShip.shipSn" />
            </el-form-item>
          </div>
          <div class="order-form-item">
            <span class="order-form-label">发 货 人</span>
            <el-form-item prop="tmsOrderShip.shipSn">
              <el-input size="mini" maxlength="20" :disabled="!canChangeOrderNum" v-model="form.tmsOrderShip.shipSn" />
            </el-form-item>
          </div>
          <div class="order-form-item">
            <span class="order-form-label">联系电话</span>
            <el-form-item prop="tmsOrderShip.shipSn">
              <el-input size="mini" maxlength="20" :disabled="!canChangeOrderNum" v-model="form.tmsOrderShip.shipSn" />
            </el-form-item>
          </div>
          <div class="order-form-item">
            <span class="order-form-label">发货地址</span>
            <el-form-item prop="tmsOrderShip.shipSn">
              <el-input size="mini" maxlength="20" :disabled="!canChangeOrderNum" v-model="form.tmsOrderShip.shipSn" />
            </el-form-item>
          </div>
        </div>
        <div class="receiver-form">
          <div class="form-title">
            收货方
          </div>
          <div class="order-form-item">
            <span class="order-form-label">收货单位</span>
            <el-form-item prop="tmsOrderShip.shipSn">
              <el-input size="mini" maxlength="20" :disabled="!canChangeOrderNum" v-model="form.tmsOrderShip.shipSn" />
            </el-form-item>
          </div>
          <div class="order-form-item">
            <span class="order-form-label">收 货 人</span>
            <el-form-item prop="tmsOrderShip.shipSn">
              <el-input size="mini" maxlength="20" :disabled="!canChangeOrderNum" v-model="form.tmsOrderShip.shipSn" />
            </el-form-item>
          </div>
          <div class="order-form-item">
            <span class="order-form-label">联系电话</span>
            <el-form-item prop="tmsOrderShip.shipSn">
              <el-input size="mini" maxlength="20" :disabled="!canChangeOrderNum" v-model="form.tmsOrderShip.shipSn" />
            </el-form-item>
          </div>
          <div class="order-form-item">
            <span class="order-form-label">详细地址</span>
            <el-form-item prop="tmsOrderShip.shipSn">
              <el-input size="mini" maxlength="20" :disabled="!canChangeOrderNum" v-model="form.tmsOrderShip.shipSn" />
            </el-form-item>
          </div>
        </div>
      </div>
      <!-- 货物费用 -->
      <div class="order-cargo-form">

      </div>
      <!-- 其它项 -->
      <div class="order-other-form clearfix">
        <table>
          <tbody>
            <tr>
              <th>运费合计</th>
              <td>
                <el-form-item prop="tmsOrderShip.shipSn">
                  <el-input size="mini" maxlength="20" :disabled="!canChangeOrderNum" v-model="form.tmsOrderShip.shipSn" />
                </el-form-item>
              </td>
              <th>付款方式</th>
              <td>
                <el-form-item prop="tmsOrderShip.shipSn">
                  <SelectType size="mini" v-model="form.tmsOrderTransfer.paymentId" type="ship_pay_way" />
                </el-form-item>
              </td>
              <th>现付</th>
              <td>
                <el-form-item prop="tmsOrderShip.shipSn">
                  <el-input size="mini" maxlength="20" :disabled="!canChangeOrderNum" v-model="form.tmsOrderShip.shipSn" />
                </el-form-item>
              </td>
              <th>到付</th>
              <td>
                <el-form-item prop="tmsOrderShip.shipSn">
                  <el-input size="mini" maxlength="20" :disabled="!canChangeOrderNum" v-model="form.tmsOrderShip.shipSn" />
                </el-form-item>
              </td>
              <th>回单付</th>
              <td>
                <el-form-item prop="tmsOrderShip.shipSn">
                  <el-input size="mini" maxlength="20" :disabled="!canChangeOrderNum" v-model="form.tmsOrderShip.shipSn" />
                </el-form-item>
              </td>
              <th>月结</th>
              <td>
                <el-form-item prop="tmsOrderShip.shipSn">
                  <el-input size="mini" maxlength="20" :disabled="!canChangeOrderNum" v-model="form.tmsOrderShip.shipSn" />
                </el-form-item>
              </td>
            </tr>
            <tr>
              <th>回单要求</th>
              <td>
                <el-form-item prop="tmsOrderShip.shipSn">
                  <SelectType size="mini" v-model="form.tmsOrderTransfer.paymentId" type="ship_receipt_require" />
                </el-form-item>
              </td>
              <th>
                <el-form-item prop="tmsOrderShip.shipSn">
                  <el-input size="mini" maxlength="20" :disabled="!canChangeOrderNum" v-model="form.tmsOrderShip.shipSn" />
                </el-form-item>
              </th>
              <td>
                <el-form-item prop="tmsOrderShip.shipSn">
                  <el-input size="mini" maxlength="20" :disabled="!canChangeOrderNum" placeholder="回单号" v-model="form.tmsOrderShip.shipSn" />
                </el-form-item>
              </td>
              <th>打印标签</th>
              <td>
                <el-form-item prop="tmsOrderShip.shipSn">
                  <el-input size="mini" maxlength="20" :disabled="!canChangeOrderNum" v-model="form.tmsOrderShip.shipSn" />
                </el-form-item>
              </td>
              <th>客户单号</th>
              <td>
                <el-form-item prop="tmsOrderShip.shipSn">
                  <el-input size="mini" maxlength="20" :disabled="!canChangeOrderNum" v-model="form.tmsOrderShip.shipSn" />
                </el-form-item>
              </td>
              <th>运输方式</th>
              <td>
                <el-form-item prop="tmsOrderShip.shipSn">
                  <SelectType size="mini" v-model="form.tmsOrderTransfer.paymentId" type="ship_shipping_type" />
                </el-form-item>
              </td>
              <th>业务类型</th>
              <td>
                <el-form-item prop="tmsOrderShip.shipSn">
                  <SelectType size="mini" v-model="form.tmsOrderTransfer.paymentId" type="ship_business_type" />
                </el-form-item>
              </td>
            </tr>
            <tr>
              <th>时效</th>
              <td>
                <el-form-item prop="tmsOrderShip.shipSn">
                  <SelectType size="mini" v-model="form.tmsOrderTransfer.paymentId" type="ship_effective" />
                </el-form-item>
              </td>
              <th>提货批次</th>
              <td>
                <el-form-item prop="tmsOrderShip.shipSn">
                  <querySelect  size="mini" search="carrierName" type="carrier" show="select" valuekey="carrierId" @change="getCarrier" v-model="form.tmsOrderTransfer.carrierId" />
                </el-form-item>
              </td>
              <th>车牌号</th>
              <td>
                <el-form-item prop="tmsOrderShip.shipSn">
                  <el-input size="mini" maxlength="20" :disabled="!canChangeOrderNum" v-model="form.tmsOrderShip.shipSn" />
                </el-form-item>
              </td>
              <th>制单员</th>
              <td>
                <el-form-item prop="tmsOrderShip.shipSn">
                  <querySelect  size="mini" search="name"  v-model="form.tmsOrderTransfer.carrierId" />
                </el-form-item>
              </td>
              <th>其他</th>
              <td colspan="3">
                <el-form-item prop="tmsOrderShip.shipSn">
                  <el-checkbox-group v-model="checkList">
                      <el-checkbox label="控货"></el-checkbox>
                      <el-checkbox label="贵重物品"></el-checkbox>
                      <el-checkbox label="现付尚欠"></el-checkbox>
                      <el-checkbox label="回扣已返" disabled></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <th>备注</th>
              <td colspan="11">
                <el-form-item prop="tmsOrderShip.shipSn">
                  <el-input size="mini" maxlength="20" :disabled="!canChangeOrderNum" v-model="form.tmsOrderShip.shipSn" />
                </el-form-item>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 中转信息 -->
      <div class="order-transfer-form" v-if="shouldInputTransfer">
        <el-collapse v-model="activeNames" >
          <el-collapse-item title="中转信息" name="1">
            <table class="order-transfer-table">
              <thead>
                <tr>
                  <th style="min-width:100px">中转日期</th>
                  <th style="min-width:100px">中转单号</th>
                  <th style="min-width:100px">承运商</th>
                  <th style="min-width:100px">承运商电话</th>
                  <th style="min-width:100px">中转到站电话</th>
                  <th style="min-width:100px">中转费</th>
                  <th style="min-width:100px">中转送货费</th>
                  <th style="min-width:100px">中转费合计</th>
                  <th style="min-width:100px">代收货款</th>
                  <th style="min-width:100px">中转付款方式</th>
                  <th style="min-width:100px">中转备注</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <el-date-picker
                      v-model="form.tmsOrderTransfer.createTime"
                      type="date"
                      value-format="yyyy-MM-dd hh:mm:ss"
                      :picker-options="pickoption"
                      v-if="nowTime"
                      size="mini"
                      placeholder="选择日期">
                    </el-date-picker>
                  </td>
                  <td>
                    <el-input size="mini" maxlength="20"
                    @change="setOddNumbers" v-model="form.tmsOrderTransfer.oddNumbers" />
                  </td>
                  <td>
                    <querySelect  size="mini" search="carrierName" type="carrier" valuekey="carrierId" @change="getCarrier" v-model="form.tmsOrderTransfer.carrierId" />
                  </td>
                  <td>
                    <el-input size="mini" maxlength="20"  v-numberOnly v-model="form.tmsOrderTransfer.carrierMobile" />
                  </td>
                  <td>
                    <el-input size="mini" maxlength="13"  v-numberOnly v-model="form.tmsOrderTransfer.arrivalMobile" />
                  </td>
                  <td>
                    <el-input size="mini" maxlength="8"  v-numberOnly:point v-model.number="form.tmsOrderTransfer.transferCharge" />
                  </td>
                  <td>
                    <el-input size="mini" maxlength="8"  v-numberOnly:point v-model.number="form.tmsOrderTransfer.deliveryExpense" />
                  </td>
                  <td>
                    <el-input size="mini" maxlength="8" disabled v-model="form.tmsOrderTransfer.totalCost" />
                  </td>
                  <td>
                    <el-input size="mini" maxlength="20"  v-model="form.tmsOrderTransfer.codService" />
                  </td>
                  <td>
                    <SelectType size="mini" v-model="form.tmsOrderTransfer.paymentId" type="payment_type" />
                  </td>
                  <td>
                    <el-input size="mini" maxlength="250"  v-model="form.tmsOrderTransfer.remark" />
                  </td>
                </tr>
              </tbody>
            </table>
          </el-collapse-item>
        </el-collapse>
      </div>

    </div>
    </el-form>
    <!-- 底部按钮操作部分 -->
    <FooterBtns :isChange="changeFlag" @doAction="doAction" @doCommand="handleCommand" />
    <!-- 弹窗 -->
    <FeeDialog :dialogVisible.sync="dialogVisible" />
    <PersonDialog @success="getKeySetup" :dialogVisiblePerson.sync="dialogVisiblePerson" />
  </div>
</template>
<script>
import { REGEX } from '@/utils/validate'
import FeeDialog from './components/feePop'
import PersonDialog from './components/personSetup'
import OrderApi from  '@/api/operation/orderManage'
import { getSystemTime } from  '@/api/common'
import { getAllSetting } from '@/api/company/systemSetup'
import FooterBtns from './components/btns'
import orderManage from '@/api/operation/orderManage'
import SelectType from '@/components/selectType/index'
import SelectTree from '@/components/selectTree/index'
import SelectCity from '@/components/selectCity/index'
import querySelect from '@/components/querySelect/index'

export default {
  components: {
    FeeDialog,
    PersonDialog,
    FooterBtns,
    SelectType,
    SelectTree,
    SelectCity,
    querySelect
  },
  data () {
    let _this = this
    const validateOrderNum= (rule, value, callback) => {
      _this.detectOrderNum().then(isDulip => {
        if(isDulip){
          this.$message.error('重复的订单号')
          callback(new Error())
        } else {
          callback()
        }
      })
    }

    // REGEX.ONLY_NUMBER_AND_LETTER
    const validateOnlyNumberAndLetter = (rule, value, callback) => {
      if(REGEX.ONLY_NUMBER_AND_LETTER.test(value)){
        callback()
      } else {
        this.$message.error('只能输入数字或者字母')
        callback(new Error())
      }
    }

    return {
      activeNames: ['1'],
      rules2: {
        "tmsOrderShip.shipSn": [
          { validator: validateOrderNum, trigger: 'blur' },
          { validator: validateOnlyNumberAndLetter, message: '只能输入数字跟字母', trigger: ['blur'] }
        ]
      },
      // 费用设置弹窗
      dialogVisible: false,
      // 个人设置弹窗
      dialogVisiblePerson: false,
      // 标记个人设置是否有改动
      changeFlag: Math.random(),
      pickoption: {
        disabledDate (now) {
          let time = +now
          if(_this.config.shipPageFunc.shipTimeRule === '34') {
            return time > +(new Date(_this.nowTime))
          } else if(_this.config.shipPageFunc.shipTimeRule === '33') {
            let lastyear = +(new Date(_this.nowTime)) - 365 * 1 * 24 * 60 * 60 * 1000
            let comyear = +(new Date(_this.nowTime)) + 365 * 1 * 24 * 60 * 60 * 1000
            return (time < lastyear) || (time > comyear)
          }
          
        }
      },
      form: {
        "customerList": [
          /* {
            "bankCardNumber": "string",
            "bankName": "string",
            "companyName": "string",
            "companyType": 0,
            "customerId": 0,
            "customerMobile": "string",
            "customerName": "string",
            "customerNum": "string",
            "customerType": 0,
            "customerUnit": "string",
            "detailedAddress": "string",
            "fixPhone": "string",
            "idCardPositive": "string",
            "idCardVerso": "string",
            "idcard": "string",
            "legalPersonname": "string",
            "licensePicture": "string",
            "openBank": "string",
            "orgid": 0,
            "vipNum": "string"
          } */
        ],
        "tmsOrderCargoList": [
          /* {
            "agencyFund": 0,
            "brokerageFee": 0,
            "cargoAmount": 0,
            "cargoName": "string",
            "cargoPack": "string",
            "cargoRemark": "string",
            "cargoVolume": 0,
            "cargoWeight": 0,
            "commissionFee": 0,
            "createTime": "2018-06-04T07:08:52.754Z",
            "customsFee": 0,
            "deliveryFee": 0,
            "description": "string",
            "forkliftFee": 0,
            "goupstairsFee": 0,
            "handlingFee": 0,
            "housingFee": 0,
            "id": 0,
            "insuranceFee": 0,
            "orderId": 0,
            "orgid": 0,
            "otherfeeIn": 0,
            "otherfeeOut": 0,
            "packageFee": 0,
            "pickupFee": 0,
            "productPrice": 0,
            "realityhandlingFee": 0,
            "shipFee": 0,
            "shipId": 0,
            "stampTax": 0,
            "taxRate": 0,
            "taxes": 0,
            "volumeFee": 0,
            "weightFee": 0
          } */
        ],
        "tmsOrderPre": {
          /* "id": 0,
          "orderAgencyFund": 0,
          "orderEffective": 0,
          "orderFromCityCode": "string",
          "orderFromOrgid": 0,
          "orderPayWay": 0,
          "orderPickupMethod": 0,
          "orderProcedureFee": 0,
          "orderReceiverId": 0,
          "orderRemarks": "string",
          "orderSenderId": 0,
          "orderSn": "string",
          "orderStatus": 0,
          "orderToCityCode": "string",
          "orderToOrgid": 0,
          "orderTotalFee": 0,
          "orderType": 0,
          "refuseReason": "string",
          "shipId": 0 */
        },
        "tmsOrderShip": {
          // 修改的时候需要带上id
          // "id": 0,
          "createTime": "2018-06-04T07:08:52.755Z",
          "shipArrivepayFee": 0,
          "shipBusinessType": 0,
          "shipCustomerNumber": "string",
          "shipDelete": 0,
          "shipDeliveryMethod": 0,
          "shipDriverName": "string",
          "shipEffective": 0,
          "shipFormCityName": "string",
          "shipFromCityCode": "string",
          "shipFromOrgid": 0,
          "shipGoodsSn": "string",
          "shipIsAbnormal": 0,
          "shipIsControll": 0,
          "shipIsSeparate": 0,
          "shipIsTransfer": 0,
          "shipIsUpdate": 0,
          "shipMonthpayFee": 0,
          "shipNowpayFee": 0,
          "shipOther": "string",
          "shipPayWay": 0,
          "shipPrintLib": 0,
          "shipReceiptNum": 0,
          "shipReceiptRequire": 0,
          "shipReceiptSn": "string",
          "shipReceiptpayFee": 0,
          "shipReceiverId": 0,
          "shipRemarks": "string",
          "shipSenderId": 0,
          "shipShippingType": 0,
          "shipSn": "",
          "shipStatus": 0,
          "shipToCityCode": "string",
          "shipToCityName": "string",
          "shipToOrgid": 0,
          "shipTotalFee": 0,
          "shipTruckIdNumber": "string",
          "shipUserid": 0
        },
        "tmsOrderTransfer": {
          "arrivalMobile": "",
          "carrierId": '',
          "carrierMobile": "",
          "codService": '',
          "createTime": "",
          "deliveryExpense": '',
          // 当修改运单时，是否可以修改中转信息
          // "id": '',
          "oddNumbers": "",
          "paymentId": '',
          "remark": "",
          "shipId": '',
          "totalCost": '',
          "transferCharge": '',
          "transferTime": "",
          "updateTime": ""
        }
      },
      // 系统设置
      config: {},
      // 费用设置
      feeConfig: {},
      // 个人设置
      personConfig: {},
      value1: '',
      loading: false,
      // 是否允许修改订单号
      canChangeOrderNum: true,
      // 是否允许修改开单日期
      canChangeOrderDate: true,
      // 是否需要填写中转信息
      shouldInputTransfer: false,
      nowTime: ''
    }
  },
  computed: {
    'transferTotalFee' () {
      return this.form.tmsOrderTransfer.transferCharge + this.form.tmsOrderTransfer.deliveryExpense
    }
  },
  watch: {
    transferTotalFee (newVal) {
      this.form.tmsOrderTransfer.totalCost = newVal
    }
  },
  mounted () {
    this.loading = true
    Promise.all([getAllSetting({
      orgid: this.otherinfo.orgid,
      type: '',
      module: 'order'
    }), OrderApi.getFeeSetup(), OrderApi.getPersonalSetup(this.otherinfo.id), orderManage.getCreateOrderDate()]).then(dataArr => {
      // 获取全局设置
      this.config = dataArr[0]
      // 获取费用设置
      this.feeConfig = dataArr[1]
      // 获取个人设置
      this.personConfig = dataArr[2]
      // 获取后台时间
      this.nowTime = dataArr[3]
      this.init()
      this.loading = false
    })
  },
  beforeDestroy () {
  },
  methods: {
    // 初始化各个表单的情况
    init() {
      this.setOrderNum()
      this.setOrderDate()
      this.setOrderFee()
      this.setOrderTransfer()
    },
    // 设置运单号规则 
    setOrderNum () {
      // 允许手动输入
      if(this.config.shipNo.manualInput === '1'){

      } else {
        // 不允许修改系统生成的单号
        if(this.config.shipNo.systemNumberImmutable === '1'){
          this.canChangeOrderNum = false
        }
        orderManage.getShipSn(this.otherinfo.orgid).then(res => {
          this.form.tmsOrderShip.shipSn = res.data
        })
      }
    },
    // 设置运单日期规则 
    setOrderDate () {
      this.form.tmsOrderShip.createTime = this.nowTime

      if(this.config.shipPageFunc.shipTimeRule === '35'){
        this.canChangeOrderDate = false
      } else if(this.config.shipPageFunc.shipTimeRule === '34') {

      } else if(this.config.shipPageFunc.shipTimeRule === '33') {

      }
    },
    // 设置费用列 
    setOrderFee () {

    },
    // 设置中转表单
    setOrderTransfer () {
      this.shouldInputTransfer = this.personConfig.shipDefault.openOrderAndTransferInfo === "1" ? true : false
    },
    // 检查运单号是否唯一
    detectOrderNum () {
      return orderManage.getJudgeShipSn(this.form.tmsOrderShip.shipSn, this.otherinfo.orgid).then(res => {
        if(res.data >= 1){
          // 有重复
          return true
        } else {
          return false
        }
      })
    },
    // 中转信息
    setOddNumbers(val){
      this.form.tmsOrderTransfer.oddNumbers = val.replace(/\s/g, '')
    },
    getCarrier (item) {
      this.form.tmsOrderTransfer.carrierMobile = item.carrierMobile
    },
    // 底部按钮操作
    doAction (type) {
      alert(type)
      switch (type) {
        case 'cleanKey':
          
          break;
        case 'printLibkey':
          
          break;
        case 'printShipKey':
          
          break;
        case 'saveShipKey':
          
          break;
        case 'savePrintKey':
          
          break;
      }
    },
    // 右下角设置按钮菜单点击操作
    handleCommand(command) {
      switch(command) {
        case 'feeSetup':
          this.dialogVisible = true
          break;
        case 'personalSetup':
          this.dialogVisiblePerson = true
          break;
        case 'orderSetup':
          this.$router.push('/company/systemSetup')          
          break;
        case 'openInNewWindow':
          this.$message('暂不支持新开窗口创建运单~')
          break;
      }
    },
    getKeySetup () {
      this.changeFlag = Math.random()
    }
  }
}
</script>
<style lang="scss">
$bordercolor: #d4d4d4;
  .createOrder-main{
    margin-left: 12px;
    margin-right: 12px;
    box-shadow: 0px 0px 10px 0px 
    rgba(0, 0, 0, 0.47);
    padding-top: 28px;
    padding-left: 26px;
    padding-right: 26px;
    padding-bottom: 58px;
    font-size: 12px;
    max-height: 100%;
    display: flex;
    flex-direction: column;

    .el-dialog__wrapper,.v-modal{
      position: absolute;
    }

    .el-date-editor.el-input{
      width: 140px;
    }

    .el-form-item--mini.el-form-item{
      margin: 0;
    }
    
    .createOrder-title{
      font-size: 24px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 9px;
      color: #000;
      text-align: center;
      height: 28px;

      span{
        border-bottom:1px solid rgba(0, 0, 0, 0.43);
      }
    }
    .order-num{
      float: left;
      padding-left: 8px;
      color: #333;
      line-height: 28px;

      .order-num-info{
        display: inline-block;
        width: 120px;
      }
      .el-input__inner{
        color: #f00;
        font-weight: bold;

      }
    }
    .create-num{
      float: right;
      padding-right: 8px;
      color: #777;

      span{
        color: #333;
        font-weight: bold;
      }
    }
    .order-main{
      min-height: 400px;
      border: solid 2px #000827;
      margin-top: 8px;
      // max-height: calc(100% - 38px);
      flex: 1;
      overflow-y: auto;
    }
    &>.el-form{
      //height: calc( 100% - 100px);
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    .order-form-item{
      float: left;
    }
    .createOrder-info{
      height: 30px;
    }
    /* 收发货表单 */
    .sender-form,.receiver-form{
      float: left;
      width: calc( (100% - 5px) / 2 );
    }
    .receiver-form{
      float: right;
    }

    /* 中转信息 */
    .order-transfer-form{
      .el-collapse,.el-collapse-item__wrap{
        border-bottom: none;
      }
      .el-collapse-item__content{
        overflow-x: auto;
      }
      th{
        height: 30px;
        line-height: 30px;
        background: #eee;
      }
      table,td,th{
        border: 1px solid $bordercolor;
      }
    }
    

    /* 底部按钮部分 */
    .order-btns{
      padding-top: 21px;
      text-align: center;
      position: relative;
      height: 72px;

      .el-button{
        font-size: 16px;
        //background: transparent;
        i{
          font-size: 1.5em;
          vertical-align: middle;
        }
      }
      .createOrder-setup{
        
        position: absolute;
        top: 8px;
        right: 8px;

        .el-button{
          font-size: 16px;
          padding: 2px;
        }
      }
    }
  }
</style>
