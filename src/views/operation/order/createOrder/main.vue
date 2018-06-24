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
            <el-form-item prop="tmsOrderShip.shipFromOrgid">
              <SelectTree :filterable="false" size="mini" v-model="form.tmsOrderShip.shipFromOrgid" />
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="order-form-item">
            <span class="order-form-label">出发城市</span>
            <el-form-item prop="tmsOrderShip.shipFromCityCode">
              <querySelect search="longAddr" type="city"  v-model="form.tmsOrderShip.shipFromCityCode" :remote="true" />
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="order-form-item">
            <span class="order-form-label">到达城市</span>
            <el-form-item prop="tmsOrderShip.shipToCityCode">
              <SelectCity size="mini" v-model="form.tmsOrderShip.shipToCityCode" />
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="order-form-item">
            <span class="order-form-label">目的网点</span>
            <el-form-item prop="tmsOrderShip.shipToOrgid">
              <SelectTree :filterable="false" size="mini" v-model="form.tmsOrderShip.shipToOrgid" />
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="order-form-item">
            <span class="order-form-label">交接方式</span>
            <el-form-item prop="tmsOrderShip.shipDeliveryMethod">
              <SelectType size="mini" v-model="form.tmsOrderShip.shipDeliveryMethod" type="ship_delivery_method" />
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="order-form-item">
            <span class="order-form-label">货号</span>
            <el-form-item prop="tmsOrderShip.shipGoodsSn">
              <el-input size="mini" maxlength="20" :disabled="!canChangeCargoNum" v-model="form.tmsOrderShip.shipGoodsSn" />
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
            <el-form-item prop="sender.customerUnit">
              <querySelect search="customerUnit" type="sender" valuekey="customerUnit" v-model="form.sender.customerUnit" @change="setSender" />
            </el-form-item>
          </div>
          <div class="order-form-item">
            <span class="order-form-label">发 货 人</span>
            <el-form-item prop="sender.customerName">
              <querySelect search="customerName" type="sender" valuekey="customerName" v-model="form.sender.customerName" @change="setSender" />
            </el-form-item>
          </div>
          <div class="order-form-item">
            <span class="order-form-label">联系电话</span>
            <el-form-item prop="sender.customerMobile">
              <querySelect search="customerMobile" type="sender" valuekey="customerMobile" v-model="form.sender.customerMobile" @change="setSender" />
            </el-form-item>
          </div>
          <div class="order-form-item">
            <span class="order-form-label">发货地址</span>
            <el-form-item prop="sender.detailedAddress">
              <querySelect search="detailedAddress" type="sender" valuekey="detailedAddress" v-model="form.sender.detailedAddress" @change="setSender" />
            </el-form-item>
          </div>
        </div>
        <div class="receiver-form">
          <div class="form-title">
            收货方
          </div>
          <div class="order-form-item">
            <span class="order-form-label">收货单位</span>
            <el-form-item prop="receiver.customerUnit">
              <querySelect search="customerUnit" type="receiver" valuekey="customerUnit" v-model="form.receiver.customerUnit" @change="setReceiver" />
            </el-form-item>
          </div>
          <div class="order-form-item">
            <span class="order-form-label">收 货 人</span>
            <el-form-item prop="receiver.customerName">
              <querySelect search="customerName" type="receiver" valuekey="customerName" v-model="form.receiver.customerName" @change="setReceiver" />
            </el-form-item>
          </div>
          <div class="order-form-item">
            <span class="order-form-label">联系电话</span>
            <el-form-item prop="receiver.customerMobile">
              <querySelect search="customerMobile" type="receiver" valuekey="customerMobile" v-model="form.receiver.customerMobile" @change="setReceiver" />
            </el-form-item>
          </div>
          <div class="order-form-item">
            <span class="order-form-label">详细地址</span>
            <el-form-item prop="receiver.detailedAddress">
              <querySelect search="detailedAddress" type="receiver" valuekey="detailedAddress" v-model="form.receiver.detailedAddress" @change="setReceiver" />
            </el-form-item>
          </div>
        </div>
      </div>
      <!-- 货物费用 -->
      <div class="order-cargo-form">
        <table>
          <thead>
            <tr>
              <th>
                <span class="addButton" @click="addCargoList()"><i class="el-icon-plus"></i></span>
                </th>
              <th v-for="item in feeConfig" :key="item.id">
                {{ item.fieldName }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in cargoList" :key="index">
              <td>
                <span class="minusButton" v-if="index !== 0" @click="deleteCargoList(index)"><i class="el-icon-minus"></i></span>
                </td>
              <td v-for="item in feeConfig" :key="item.id">
                <template v-if="item.fieldProperty.indexOf('cargoName')!==-1">
                  <querySelect size="mini" search="value" type="cargoName" valuekey="value" v-model="cargoList[index][item.fieldProperty]" />
                </template>
                <template v-else-if="item.fieldProperty.indexOf('cargoPack')!==-1">
                  <querySelect size="mini" search="value" type="cargoPack" valuekey="value" v-model="cargoList[index][item.fieldProperty]" />
                </template>
                <template v-else-if="item.fieldProperty.indexOf('cargoAmount')!==-1">
                  <el-input size="mini" maxlength="20"
                  v-model="cargoList[index][item.fieldProperty]" @change="detectCargoNumChange" />
                </template>
                <template v-else>
                  <el-input size="mini" maxlength="20"
                  v-model="cargoList[index][item.fieldProperty]" />
                </template>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 其它项 -->
      <div class="order-other-form clearfix">
        <table>
          <tbody>
            <tr>
              <th>运费合计</th>
              <td>
                <el-form-item prop="tmsOrderShip.shipTotalFee">
                  <el-input size="mini" maxlength="20" disabled v-model="form.tmsOrderShip.shipTotalFee" />
                </el-form-item>
              </td>
              <th>付款方式</th>
              <td>
                <el-form-item prop="tmsOrderShip.shipPayWay">
                  <SelectType size="mini" v-model="form.tmsOrderShip.shipPayWay" type="ship_pay_way" />
                </el-form-item>
              </td>
              <th>现付</th>
              <td>
                <el-form-item prop="tmsOrderShip.shipNowpayFee">
                  <el-input size="mini" maxlength="20" :disabled="shipNowpayFeeDisabled"  v-model="form.tmsOrderShip.shipNowpayFee" />
                </el-form-item>
              </td>
              <th>到付</th>
              <td>
                <el-form-item prop="tmsOrderShip.shipArrivepayFee">
                  <el-input size="mini" maxlength="20" :disabled="shipArrivepayFeeDisabled"  v-model="form.tmsOrderShip.shipArrivepayFee" />
                </el-form-item>
              </td>
              <th>回单付</th>
              <td>
                <el-form-item prop="tmsOrderShip.shipReceiptpayFee">
                  <el-input size="mini" maxlength="20" :disabled="shipReceiptpayFeeDisabled"  v-model="form.tmsOrderShip.shipReceiptpayFee" />
                </el-form-item>
              </td>
              <th>月结</th>
              <td>
                <el-form-item prop="tmsOrderShip.shipMonthpayFee">
                  <el-input size="mini" maxlength="20" :disabled="shipMonthpayFeeDisabled"  v-model="form.tmsOrderShip.shipMonthpayFee" />
                </el-form-item>
              </td>
            </tr>
            <tr>
              <th><div>回单要求</div></th>
              <td>
                <el-form-item prop="tmsOrderShip.shipReceiptRequire">
                  <SelectType size="mini"  v-model="form.tmsOrderShip.shipReceiptRequire" type="ship_receipt_require" />
                </el-form-item>
              </td>
              <th class="shipReceiptNum">
                <el-form-item prop="tmsOrderShip.shipReceiptNum">
                  <el-input v-number-only size="mini" maxlength="20"  v-model="form.tmsOrderShip.shipReceiptNum" >
                    <template slot="append">份</template>
                  </el-input>
                </el-form-item>
              </th>
              <td>
                <el-form-item prop="tmsOrderShip.shipReceiptSn">
                  <el-input size="mini" maxlength="20"  placeholder="回单号" v-model="form.tmsOrderShip.shipReceiptSn" />
                </el-form-item>
              </td>
              <th>打印标签</th>
              <td>
                <el-form-item prop="tmsOrderShip.shipPrintLib">
                  <el-input size="mini" maxlength="20"  v-model="form.tmsOrderShip.shipPrintLib" >
                    <template slot="append">份</template>
                  </el-input>
                </el-form-item>
              </td>
              <th>客户单号</th>
              <td>
                <el-form-item prop="tmsOrderShip.shipCustomerNumber">
                  <el-input size="mini" maxlength="20"  v-model="form.tmsOrderShip.shipCustomerNumber" />
                </el-form-item>
              </td>
              <th>运输方式</th>
              <td>
                <el-form-item prop="tmsOrderShip.shipShippingType">
                  <SelectType size="mini" v-model="form.tmsOrderShip.shipShippingType" type="ship_shipping_type" />
                </el-form-item>
              </td>
              <th>业务类型</th>
              <td>
                <el-form-item prop="tmsOrderShip.shipBusinessType">
                  <SelectType size="mini" v-model="form.tmsOrderShip.shipBusinessType" type="ship_business_type" />
                </el-form-item>
              </td>
            </tr>
            <tr>
              <th><div>时效</div></th>
              <td>
                <el-form-item prop="tmsOrderShip.shipEffective">
                  <SelectType size="mini" v-model="form.tmsOrderShip.shipEffective" type="ship_effective" />
                </el-form-item>
              </td>
              <th>提货批次</th>
              <td>
                <el-form-item prop="tmsOrderShip.shipBatchId">
                  <querySelect :filterable="false"  size="mini" search="batchNumber" placeholder="请选择" type="batch" show="select" valuekey="bathId" @change="getBatch" v-model="form.tmsOrderShip.shipBatchId" />
                </el-form-item>
              </td>
              <th>车牌号</th>
              <td>
                <el-form-item prop="tmsOrderShip.shipTruckIdNumber">
                  <el-input size="mini" maxlength="20" disabled v-model="form.tmsOrderShip.shipTruckIdNumber" />
                </el-form-item>
              </td>
              <th>制单员</th>
              <td>
                <el-form-item prop="tmsOrderShip.shipUserid">
                  <querySelect  size="mini" :name="otherinfo.name" search="name"  v-model="form.tmsOrderShip.shipUserid" />
                </el-form-item>
              </td>
              <th>其他</th>
              <td colspan="3">
                <el-checkbox-group v-model="shipOther">
                    <el-checkbox label="168">控货</el-checkbox>
                    <el-checkbox label="169">贵重物品</el-checkbox>
                    <el-checkbox label="170">现付尚欠</el-checkbox>
                    <el-checkbox label="171">回扣已返</el-checkbox>
                  </el-checkbox-group>
              </td>
            </tr>
            <tr>
              <th>备注</th>
              <td colspan="11">
                <el-form-item prop="tmsOrderShip.shipRemarks">
                  <el-input size="mini" maxlength="20" v-model="form.tmsOrderShip.shipRemarks" />
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
                      tabindex="-1"
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
// 引入事件对象
import { eventBus } from '@/eventBus'
// 工具函数
import { REGEX } from '@/utils/validate'
import { closest } from '@/utils/'
// 请求接口
import { getSystemTime } from  '@/api/common'
import OrderApi from  '@/api/operation/orderManage'
import { getAllSetting } from '@/api/company/systemSetup'
import orderManage from '@/api/operation/orderManage'
// 外部公用组件
import SelectType from '@/components/selectType/index'
import SelectTree from '@/components/selectTree/index'
import SelectCity from '@/components/selectCity/index'
import querySelect from '@/components/querySelect/index'
// 当前模块子组件
import FeeDialog from './components/feePop'
import PersonDialog from './components/personSetup'
import FooterBtns from './components/btns'

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
      // 付款方式禁用
      shipNowpayFeeDisabled: false,
      shipArrivepayFeeDisabled: false,
      shipReceiptpayFeeDisabled: false,
      shipMonthpayFeeDisabled: false,
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
      // 费用其他项
      shipOther: [],
      // 用来保存货物对象的信息
      cargoObject: {},
      // 用来保存货物列表
      cargoList: [{}, {}],
      // 最多创建N个货品
      maxCargoLength: 15,
      form: {
        sender: {
          customerUnit: '',
          customerType: '',
          customerName: '',
          customerMobile: '',
          detailedAddress: '',
          customerId: ''
        },
        receiver: {
          customerUnit: '',
          customerType: '',
          customerName: '',
          customerMobile: '',
          detailedAddress: '',
          customerId: ''
        },
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
          "createTime": "",
          "shipArrivepayFee": '',
          "shipBusinessType": '',
          "shipCustomerNumber": "",
          "shipDelete": '',
          "shipDeliveryMethod": '',
          "shipDriverName": "",
          "shipEffective": 94, // 默认为普通
          "shipFormCityName": "",
          "shipFromCityCode": "",
          "shipFromOrgid": '',
          "shipGoodsSn": "",
          "shipIsAbnormal": '',
          "shipIsControll": '',
          "shipIsSeparate": '',
          "shipIsTransfer": '',
          "shipIsUpdate": '',
          "shipMonthpayFee": '',
          "shipNowpayFee": '',
          "shipOther": "",
          "shipPayWay": '',
          "shipPrintLib": '',
          "shipReceiptNum": '',
          "shipReceiptRequire": '',
          "shipReceiptSn": "",
          "shipReceiptpayFee": '',
          "shipReceiverId": '',
          "shipRemarks": "",
          "shipSenderId": '',
          "shipShippingType": '',
          "shipSn": "",
          "shipStatus": '',
          "shipToCityCode": "",
          "shipToCityName": "",
          "shipToOrgid": '',
          "shipTotalFee": '',
          "shipTruckIdNumber": "",
          "shipUserid": ''
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
      // 是否允许修改huo号
      canChangeCargoNum: true,
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
    },
    shipOther (newVal) {
      this.form.tmsOrderShip.shipOther = newVal.join(',')
      console.log('this.form.tmsOrderShip.shipOther:', this.form.tmsOrderShip.shipOther)
    },
    'form.tmsOrderShip.shipPrintLib': {
      handler(newVal){
        if(newVal > 500){
          this.form.tmsOrderShip.shipPrintLib = 500
        }
      },
      immediate: true
    },
    // 运单号修改，对应的货号也修改
    'form.tmsOrderShip.shipSn': {
      handler(newVal){
        this.setCargoNum()
      }
    },
    'form.tmsOrderShip.shipReceiptRequire': {
      handler(newVal) {
        let num = 1
        if(newVal === 80){
          num = 0
        }
        this.form.tmsOrderShip.shipReceiptNum = num
      },
      immediate: true
    },
    'form.tmsOrderShip.shipPayWay': {
      handler(newVal){
        let key = parseInt(newVal, 10)
        this.shipNowpayFeeDisabled = true
        this.shipArrivepayFeeDisabled = true
        this.shipReceiptpayFeeDisabled = true
        this.shipMonthpayFeeDisabled = true
        switch(key){
          // 现付
          case 76:
            this.shipNowpayFeeDisabled = false
            break;
          // 到付
          case 77:
            this.shipArrivepayFeeDisabled = false
            break;
          // 月结
          case 78:
            this.shipMonthpayFeeDisabled = false
            break;
          // 回单付
          case 79:
            this.shipReceiptpayFeeDisabled = false
            break;
          // 免费
          case 103:
            break;
          // 多笔付
          case 104:
            this.shipNowpayFeeDisabled = false
            this.shipArrivepayFeeDisabled = false
            this.shipReceiptpayFeeDisabled = false
            this.shipMonthpayFeeDisabled = false
            break;
        }
      },
      immediate: true
    }
  },
  mounted () {
    this.loading = true
    Promise.all([getAllSetting({
      orgid: this.otherinfo.orgid,
      type: '',
      module: 'order'
    }), orderManage.getCargoSetting(this.otherinfo.orgid), OrderApi.getPersonalSetup(this.otherinfo.id), orderManage.getCreateOrderDate()]).then(dataArr => {
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
      this.setCargoNum()
      this.setOrderDate()
      this.setOrderFee()
      this.setOrderTransfer()
      this.setDefaultValue()
      setTimeout(() => {
        this.bindTabWithArrow()
      }, 1000);
    },
    // 查找当前表单所有存在的input元素
    findAllInput() {
      this.inputEles = Array.prototype.slice.call(document.querySelectorAll('.order-main input'))
      let len = this.inputEles.length
      for(let i = 0; i< len; i++){
        this.inputEles[i].setAttribute('taborder', i++)
      }
    },
    findNextInput(type, currentIndex) {
      let nextIndex = type === 37 ? currentIndex - 1 : currentIndex + 1
      if(nextIndex < 0 || nextIndex >= this.inputEles.length){
        return null
      } else {
        let ele = this.inputEles[nextIndex]
        if(ele.disabled){
          return this.findNextInput(type, nextIndex)
        } else {
          return ele
        }
      }
    },
    // 绑定左右按键
    bindTabWithArrow () {
      // closest(ele, '.order-main')
      let doc = document
      let parentEle = doc.querySelector('.order-main')
      this.findAllInput()
      parentEle.addEventListener('keydown', (e) => {
        let ele = e.srcElement
        // 如果是左右按键，则屏蔽其默认事件以及禁止冒泡
        // 当前触发元素为input且非button时
        if(ele.nodeName === 'INPUT' && (e.keyCode === 37 || e.keyCode === 39)){
          let index = this.inputEles.indexOf(ele)
          let nextEle = this.findNextInput(e.keyCode, index)
          console.log('nextEle:', index, ele, nextEle)
          if(index >= 0 && index !== (this.inputEles.lenth - 1) && nextEle){
            e.preventDefault()
            e.stopPropagation()
            // ele.blur()
            eventBus.$emit('closepopbox')
            nextEle.focus()
          }
        }
      }, false)
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
    // 设置货号规则 
    setCargoNum () {
      // 允许手动输入
      if(this.config.cargoNo.manualInput === '1'){

      } else {
        // 不允许修改系统生成的单号
        if(this.config.cargoNo.systemNumberNotAllowUpdate === '1'){
          this.canChangeCargoNum = false
        }
        /* [
            {
              "cargoAmount": 2
            },
            {
              "cargoAmount": 4
            }
          ] */
        orderManage.postGenerateGoodsSn({
          "tmsOrderShip":{
            "shipSn": this.form.tmsOrderShip.shipSn
          },
          "tmsOrderCargoList": this.cargoList.map(el => {
            let a = {}
            a.cargoAmount = parseInt(el.cargoAmount1, 10) || parseInt(el.cargoAmount, 10) || 0
            return a
          })
        }).then(res => {
          this.form.tmsOrderShip.shipGoodsSn = res.data
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
      // 处理返回的数据，将fixed的列排在前面，剔除没有被选中的列
      this.feeConfig = this.feeConfig.filter(el => {
        // 如果是fixed元素，则给其较小的序号保证其排在前面
        el.fieldOrder = el.isfixed === 1 ? el.fieldOrder - 1000 : el.fieldOrder
        if(el.ischeck !== 0){
          this.cargoObject[el.fieldProperty] = ''
          return true
        } else {
          return false
        }
        return el.ischeck !== 0
      })
      this.feeConfig.sort((a,b)=>{
        return a.fieldOrder < b.fieldOrder ? -1 : 1
      })
      this.$set(this.cargoList, 0, Object.assign(this.cargoList[0], this.cargoObject))
      this.$set(this.cargoList, 1, Object.assign(this.cargoList[1], this.cargoObject))
    },
    // 设置中转表单
    setOrderTransfer () {
      this.shouldInputTransfer = this.personConfig.shipDefault.openOrderAndTransferInfo === "1" ? true : false
    },
    // 设置默认值
    setDefaultValue () {
      // 默认开单网点为本网点
      this.form.tmsOrderShip.shipFromOrgid = this.otherinfo.orgid
      // 默认制单人为当前用户
      this.form.tmsOrderShip.shipUserid = this.otherinfo.id
      // 付款方式
      this.form.tmsOrderShip.shipPayWay = this.personConfig.shipSetKey.paymentMode
      // 回单类型
      this.form.tmsOrderShip.shipReceiptRequire = this.personConfig.shipSetKey.receiptType
      // 回单份数
      this.form.tmsOrderShip.shipReceiptNum = this.personConfig.shipSetKey.receiptNum
      // 运输方式
      this.form.tmsOrderShip.shipShippingType = this.personConfig.shipSetKey.transportMode
      // 业务类型
      this.form.tmsOrderShip.shipBusinessType = this.personConfig.shipSetKey.businessType
      // 交接方式
      this.form.tmsOrderShip.shipDeliveryMethod = this.personConfig.shipSetKey.handoverMode
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
    /** 收货人/发货人 */
    setSender(item, type){
      type = type ? type : 'sender'
      if(item){
        this.form[type].customerId = item.customerId || ''
        this.form[type].customerType = type === 'sender' ? 1 : 2
        this.form[type].customerUnit = item.customerUnit
        this.form[type].customerName = item.customerName
        this.form[type].customerMobile = item.customerMobile
        this.form[type].detailedAddress = item.detailedAddress
        console.log('setSender:', item, type,  this.form[type])
      }
    },
    setReceiver(item){
      this.setSender(item, 'receiver')
    },
    /** 货品列表 */
    addCargoList(){
      if(this.cargoList.length < this.maxCargoLength){
        this.cargoList.push(Object.assign({}, this.cargoObject))
      }
    },
    deleteCargoList(index){
      this.cargoList.splice(index,1)
    },
    detectCargoNumChange () {
      this.setCargoNum()
    },
    // 其他表单
    getBatch (item) {
      console.log('getBatch', item)
      this.form.tmsOrderShip.shipTruckIdNumber = item.truckIdNumber || '' 
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
$backgroundcolor: #cbe1f7;

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
      float: none;
    }
    .createOrder-info{
      height: 30px;
    }

    .order-form-label{
      color: #666;
    }

    .order-form-item{
      display: flex;
      line-height: 30px;
      .order-form-label{
        width: 65px;
        text-align: center;
        border-right: 1px solid $bordercolor;
      }
      .el-form-item{
        flex: 1;
      }
      .autocomplete-input,.el-form-item__content,.el-autocomplete{
        display: block;
        width: 100%;
      }
    }

    .firstline-order{
      border-bottom: 1px solid $bordercolor;
      
      .el-col:first-child .order-form-label{
        border-left: none;
      }
      .order-form-label{
        display: inline-block;
        
        border-left: 1px solid $bordercolor;
        
      }
      .el-input__inner{
        border-color: transparent;
        border-radius: 0;
      }
      
    }
    
    /* 收发货表单 */
    .sender-form,.receiver-form{
      float: left;
      width: calc( (100% - 5px) / 2 );

      .order-form-item{
        border-bottom: 1px solid $bordercolor;

        &:last-child{
          border: none;
        }
      }

      .form-title{
        border-bottom: 1px solid $bordercolor;
        line-height: 28px;
        text-align: center;
        font-size: 16px;
        color: #5dabed;
        background: $backgroundcolor;
        font-weight: bold;
        letter-spacing: 2px;
      }
      .el-input__inner{
        border-color: transparent;
        border-radius: 0;
      }
    }
    .sender-form{
      border-right: 1px solid $bordercolor;
    }
    .receiver-form{
      float: right;
      border-left: 1px solid $bordercolor;
    }

    /** 货品表单 **/
    .order-cargo-form{
      overflow: auto;
      table, td{
        border: 1px solid $bordercolor;
        text-align: center;
      }
      td, th{
        padding: 0 0;
        height: 28px;
      }
      th{
        min-width: 110px;
        background: #d5e7f9;
        color: #666;
        height: 28px;
        vertical-align: middle;
        border-left: 1px solid #88bef3;
        text-align: center;
      }
      .el-input__inner{
        border-color: transparent;
        border-radius: 0;

        &:focus{
          background: rgba(0, 0, 0, 0.1);
        }
      }
      .addButton, .minusButton{
        display: inline-block;
        width: 18px;
        height: 18px;
        text-align: center;
        border: 1px solid #3b95ee;
        color: #3b95ee;
        line-height: 14px;
        border-radius: 4px;

        cursor: pointer;

        i{
          font-weight: bold;
          vertical-align: middle;
        }
      }
      .minusButton{
        border-color: #ee3b3b;
        color: #ee3b3b;
      }
    }
    /* 其他费用 */
    .order-other-form{
      th{
        width: 68px;
        font-weight: normal;
        color: #666;
        font-size: 12px;
        vertical-align: middle;

        div{
        text-align: justify;
        &:after{display: inline-block ; content: ''; padding-left: 100%; }  
        }
      }
      td{
        min-width: 120px;
      }
      .el-input-group__append{
        padding: 0 5px;
      }
      .shipReceiptNum{
        .el-input__inner{
          width: 50px;
        }
      }
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
