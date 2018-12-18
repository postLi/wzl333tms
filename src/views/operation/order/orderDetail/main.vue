<template>
  <div class="OrderDetail-main" v-loading="loading">
    <!-- 各种状态显示 -->
    <div class="order-status-info">
      <span class="order-status-name">{{ form.tmsOrderShipInfo.shipIsSeparate !== 1 ? form.tmsOrderShipInfo.shipStatusName : '已拆单' }}</span><span class="order-status-org" v-if="form.tmsOrderShipInfo.shipIsSeparate !== 1">{{form.tmsOrderShipInfo.shipOrgidName}}</span>
    </div>
    <div class="shipstatus" :class="[shipStatus]"></div>
    <div class="shipstatus" :class="[shipHuidanStatus]"></div>
    <div class="shipstatus" :class="[shipHuokuanStatus]"></div>
    <div class="createOrder-title"><span>{{ otherinfo.systemSetup.shipPageFunc.orderName || '收发货凭证'}}</span></div>
    <el-form :model="form" label-width="100px" ref="ruleForm" :show-message="false" status-icon inline label-position="right" size="mini">
      <div class="createOrder-info clearfix">
        <div class="order-num">运单号： <span class="order-num-info">
        {{ form.tmsOrderShipInfo.shipSn }}
        </span></div>
        <div class="create-num">开单日期： <span class="create-num-info">
         {{ form.tmsOrderShipInfo.createTime }}
      </span></div>
      </div>
      <div class="order-main">
        <!-- 网点信息 -->
        <el-row class="firstline-order">
          <el-col :span="4">
            <div class="order-form-item">
              <span class="order-form-label">开单网点</span>
              <el-form-item prop="tmsOrderShipInfo.shipFromOrgid">
                <el-input :value="form.tmsOrderShipInfo.fromOrgName" disabled size="mini" />
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="order-form-item">
              <span class="order-form-label required">发站</span>
              <el-form-item>
                <el-input :value="form.tmsOrderShipInfo.shipFromCityName" disabled size="mini" />
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="order-form-item">
              <span class="order-form-label required">到站</span>
              <el-form-item>
                <el-input :value="form.tmsOrderShipInfo.shipToCityName" disabled size="mini" />
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="order-form-item">
              <span class="order-form-label">目的网点</span>
              <el-form-item>
                <el-input :value="form.tmsOrderShipInfo.toOrgName" disabled size="mini" />
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="order-form-item">
              <span class="order-form-label">交接方式</span>
              <el-form-item>
                <el-input :value="form.tmsOrderShipInfo.shipDeliveryMethodName" disabled size="mini" />
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="order-form-item">
              <span class="order-form-label">货号</span>
              <el-input size="mini" :maxlength="20" disabled :value="form.tmsOrderShipInfo.shipGoodsSn" />
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
              <el-form-item>
                <el-input size="mini" disabled :value="form.sender.customerUnit" />
              </el-form-item>
            </div>
            <div class="order-form-item">
              <span class="order-form-label required">发 货 人</span>
              <el-form-item>
                <el-input size="mini" disabled :value="form.sender.customerName" />
              </el-form-item>
            </div>
            <div class="order-form-item">
              <span class="order-form-label required">联系电话</span>
              <el-form-item>
                <el-input size="mini" disabled :value="form.sender.customerMobile" />
              </el-form-item>
            </div>
            <div class="order-form-item">
              <span class="order-form-label">发货地址</span>
              <el-form-item>
                <el-input size="mini" disabled :value="form.sender.detailedAddress" />
              </el-form-item>
            </div>
          </div>
          <div class="receiver-form">
            <div class="form-title">
              收货方
            </div>
            <div class="order-form-item">
              <span class="order-form-label">收货单位</span>
              <el-form-item>
                <el-input size="mini" disabled :value="form.receiver.customerUnit" />
              </el-form-item>
            </div>
            <div class="order-form-item">
              <span class="order-form-label required">收 货 人</span>
              <el-form-item>
                <el-input size="mini" disabled :value="form.receiver.customerName" />
              </el-form-item>
            </div>
            <div class="order-form-item">
              <span class="order-form-label required">联系电话</span>
              <el-form-item>
                <el-input size="mini" disabled :value="form.receiver.customerMobile" />
              </el-form-item>
            </div>
            <div class="order-form-item">
              <span class="order-form-label">详细地址</span>
              <el-form-item>
                <el-input size="mini" disabled :value="form.receiver.detailedAddress" />
              </el-form-item>
            </div>
          </div>
        </div>
        <!-- 货物费用 -->
        <div class="order-cargo-form">
          <table>
            <thead>
              <tr>
                <th v-for="item in feeConfig" :class="{'required': item.fieldProperty.indexOf('cargoName')!==-1 ||  item.fieldProperty.indexOf('cargoAmount')!==-1}" :key="item.id">
                  {{ item.fieldName }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in form.cargoList" :key="index">
                <td v-for="item in feeConfig" :key="item.id">
                  {{ form.cargoList[index][item.fieldProperty] }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- 其它项 -->
        <div class="order-other-form clearfix">
          <el-row class="firstline-order-other">
            <el-col :span="4">
              <div class="order-form-item">
                <span class="order-form-label">运费合计</span>
                <el-form-item>
                  <el-input size="mini" disabled v-model="form.tmsOrderShipInfo.shipTotalFee" />
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="4">
              <div class="order-form-item">
                <span class="order-form-label">付款方式</span>
                <el-form-item>
                  <el-input :value="form.tmsOrderShipInfo.shipPayWayName" disabled size="mini" />
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="4">
              <div class="order-form-item">
                <span class="order-form-label">现付</span>
                <el-form-item>
                  <el-input size="mini" disabled v-model="form.tmsOrderShipInfo.shipNowpayFee" />
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="4">
              <div class="order-form-item">
                <span class="order-form-label">到付</span>
                <el-form-item>
                  <el-input size="mini" disabled v-model="form.tmsOrderShipInfo.shipArrivepayFee" />
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="4">
              <div class="order-form-item">
                <span class="order-form-label">回单付</span>
                <el-form-item>
                  <el-input size="mini" disabled v-model="form.tmsOrderShipInfo.shipReceiptpayFee" />
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="4">
              <div class="order-form-item">
                <span class="order-form-label">月结</span>
                <el-form-item>
                  <el-input size="mini" disabled v-model="form.tmsOrderShipInfo.shipMonthpayFee" />
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row class="second-order-other">
            <el-col :span="4">
              <div class="order-form-item">
                <span class="order-form-label">回单要求</span>
                <el-form-item>
                  <el-input :value="form.tmsOrderShipInfo.shipReceiptRequireName" disabled size="mini" />
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="4">
              <div class="order-form-item">
                <span class="order-form-label other-form-shipReceiptNum">
                <el-form-item>
                  <el-input size="mini" disabled  :value="form.tmsOrderShipInfo.shipReceiptNum" >
                    <template slot="append">份</template>
                  </el-input>
                </el-form-item>
              </span>
                <el-form-item>
                  <el-input size="mini" disabled v-model="form.tmsOrderShipInfo.shipReceiptSn" />
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="4">
              <div class="order-form-item">
                <span class="order-form-label">打印标签</span>
                <el-form-item>
                  <el-input size="mini" disabled :value="form.tmsOrderShipInfo.shipPrintLib">
                    <template slot="append">份</template>
                  </el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="4">
              <div class="order-form-item">
                <span class="order-form-label required">客户单号</span>
                <el-form-item>
                  <el-input size="mini" disabled v-model="form.tmsOrderShipInfo.shipCustomerNumber" />
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="4">
              <div class="order-form-item">
                <span class="order-form-label">运输方式</span>
                <el-form-item>
                  <el-input :value="form.tmsOrderShipInfo.shipShippingTypeName" disabled size="mini" />
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="4">
              <div class="order-form-item">
                <span class="order-form-label">业务类型</span>
                <el-form-item>
                  <el-input :value="form.tmsOrderShipInfo.shipBusinessTypeName" disabled size="mini" />
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row class="third-order-other">
            <el-col :span="4">
              <div class="order-form-item">
                <span class="order-form-label">时效</span>
                <el-form-item>
                  <el-input :value="form.tmsOrderShipInfo.shipEffectiveName" disabled size="mini" />
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="4">
              <div class="order-form-item">
                <span class="order-form-label">提货批次</span>
                <el-form-item>
                  <el-input size="mini" disabled v-model="form.tmsOrderShipInfo.pickupBatchNumber" />
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="4">
              <div class="order-form-item">
                <span class="order-form-label">车牌号</span>
                <el-form-item>
                  <el-input size="mini" disabled v-model="form.tmsOrderShipInfo.shipTruckIdNumber" />
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="4">
              <div class="order-form-item">
                <span class="order-form-label">业务员</span>
                <el-form-item>
                  <el-input :value="form.tmsOrderShipInfo.userName" disabled size="mini" />
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="order-form-item">
                <span class="order-form-label">其他</span>
                <el-checkbox-group disabled v-model="shipOther">
                  <el-checkbox label="168">控货</el-checkbox>
                  <el-checkbox label="169">贵重物品</el-checkbox>
                  <el-checkbox label="170">现付尚欠</el-checkbox>
                  <el-checkbox label="171">回扣已返</el-checkbox>
                </el-checkbox-group>
              </div>
            </el-col>
          </el-row>
          <el-row class="fouth-order-other">
            <el-col :span="24">
              <div class="order-form-item">
                <span class="order-form-label">备注</span>
                <el-form-item>
                  <el-input size="mini" disabled v-model="form.tmsOrderShipInfo.shipRemarks" :maxlength="300" />
                </el-form-item>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-form>
    <!-- 中转信息 -->
    <div class="order-transfer-form">
      <div class="show-form-title">中转信息</div>
      <div class="order-transfer-table">
        <table>
          <thead>
            <tr>
              <th>中转日期</th>
              <th>中转单号</th>
              <th>承运商</th>
              <th>承运商电话</th>
              <th>中转到站电话</th>
              <th>中转费</th>
              <th>中转送货费</th>
              <th>中转其它费</th>
              <th>中转费合计</th>
              <th>中转付款方式</th>
              <th>中转备注</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in form.tmsOrderTransferList" :key="index">
              <td>
                {{ item.transferTime}}
              </td>
              <td>
                {{ item.oddNumbers }}
              </td>
              <td>
                {{ item.carrierName }}
              </td>
              <td>
                {{ item.carrierMobile }}
              </td>
              <td>
                {{ item.arrivalMobile }}
              </td>
              <td>
                {{ item.transferCharge }}
              </td>
              <td>
                {{ item.deliveryExpense }}
              </td>
              <td>
                {{ item.transferOtherFee }}
              </td>
              <td>
                {{ item.totalCost }}
              </td>
              <td>
                {{ item.paymentName }}
              </td>
              <td>
                {{ item.remark }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- 短驳配载信息 -->
    <div class="order-transfer-form">
      <div class="show-form-title">短驳配载信息</div>
      <div class="order-transfer-table">
        <table>
          <thead>
            <tr>
              <th>短驳批次</th>
              <th>短驳时间</th>
              <th>接收时间</th>
              <th>车牌号</th>
              <th>司机</th>
              <th>司机电话</th>
              <th>短驳费</th>
              <th>发车网点</th>
              <th>到达网点</th>
              <th>接收人</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in form.tmsDbLoadsList" :key="index">
              <td>
                {{ item.batchNo }}
              </td>
              <td>
                {{ item.loadTime | parseTime }}
              </td>
              <td>
                {{ item.receivingTime | parseTime }}
              </td>
              <td>
                {{ item.truckIdNumber }}
              </td>
              <td>
                {{ item.dirverName }}
              </td>
              <td>
                {{ item.dirverMobile }}
              </td>
              <td>
                {{ item.shortFee }}
              </td>
              <td>
                {{ item.orgidName }}
              </td>
              <td>
                {{ item.arriveOrgidName }}
              </td>
              <td>
                {{ item.userName }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- 干线配载信息 -->
    <div class="order-transfer-form">
      <div class="show-form-title">干线配载信息</div>
      <div class="order-transfer-table">
        <table>
          <thead>
            <tr>
              <th>发车批次</th>
              <th>车牌号</th>
              <th>司机</th>
              <th>司机电话</th>
              <th>发车网点</th>
              <th>到达网点</th>
              <th>发车时间</th>
              <th>到车时间</th>
              <th>配载员</th>
              <th>到车确定人</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in form.tmsGxLoadsList" :key="index">
              <td>
                {{ item.batchNo }}
              </td>
              <td>
                {{ item.truckIdNumber }}
              </td>
              <td>
                {{ item.dirverName }}
              </td>
              <td>
                {{ item.dirverMobile }}
              </td>
              <td>
                {{ item.orgidName }}
              </td>
              <td>
                {{ item.arriveOrgidName }}
              </td>
              <td>
                {{ item.loadTime | parseTime }}
              </td>
              <td>
                {{ item.receivingTime | parseTime }}
              </td>
              <td>
                {{ item.userName }}
              </td>
              <td>
                {{ item.receivedUserName }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- 送货配载信息 -->
    <div class="order-transfer-form">
      <div class="show-form-title">送货配载信息</div>
      <div class="order-transfer-table">
        <table>
          <thead>
            <tr>
              <th>送货批次</th>
              <th>车牌号</th>
              <th>司机</th>
              <th>司机电话</th>
              <th>送货时间</th>
              <th>配载员</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in form.tmsShLoadsList" :key="index">
              <td>
                {{ item.bathNo }}
              </td>
              <td>
                {{ item.truckIdNumber }}
              </td>
              <td>
                {{ item.dirverName }}
              </td>
              <td>
                {{ item.dirverMobile }}
              </td>
              <td>
                {{ item.departureTime }}
              </td>
              <td>
                {{ item.loadName }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- 签收信息 -->
    <div class="order-transfer-form">
      <div class="show-form-title">签收信息</div>
      <div class="order-transfer-table">
        <table>
          <thead>
            <tr>
              <th>签收人</th>
              <th>签收时间</th>
              <th>签收状态</th>
              <th>签收类型</th>
              <th>身份证</th>
              <th>签收描述</th>
            </tr>
          </thead>
          <tbody v-for="(item, index) in form.tmsOrderShipSignList" :key="index">
            <tr>
              <td>
                {{ item.signName }}
              </td>
              <td>
                {{ item.signTime }}
              </td>
              <td>
                {{ item.signStatusName }}
              </td>
              <td>
                {{ item.signTypeName }}
              </td>
              <td>
                {{ item.documentNum }}
              </td>
              <td>
                {{ item.remark }}
              </td>
            </tr>
            <tr>
              <td colspan="6">
                <div class="clickimglist">
                  <span class="clickimg" v-for="(item, index) in (item.signPic ? item.signPic.split(',') : [])" :key="index">
              <img v-showPicture  :src="item" />
              </span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- 打印区域 -->
    <el-row :gutter="12">
      <el-col :span="12" :offset="10" style="margin-top: 20px;">
        <el-button @click="doAction('printLibkey')" icon="el-icon-printer" type="success">打印标签</el-button>
        <el-button @click="doAction('printShipKey')" icon="el-icon-tickets" type="primary">打印运单</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
// 引入事件对象
// 工具函数
// 请求接口
import orderManage from '@/api/operation/orderManage'
// 外部公用组件
// 打印插件
import { CreatePrintPage, CreatePrintPageEnable } from '@/utils/lodopFuncs'
// 获取打印位置参数接口
// import { getPrintOrderItems, getPrintLibItems } from '@/api/operation/print'
import { getEnableLibSetting, getEnableOrderSetting, getSettingCompanyLi, getSettingCompanyOrder } from '@/api/operation/print'
// 阿拉伯数字转中文大写
import { smalltoBIG } from '@/filters/'
import { tmsMath, parseTime } from '@/utils/'
import { getSelectType } from '@/api/common'

export default {
  components: {},
  props: {
    orderid: {
      type: [Number, String],
      default: ''
    },
    orderdata: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      activeNames: ['1'],
      // 付款方式禁用
      shipNowpayFeeDisabled: false,
      shipArrivepayFeeDisabled: false,
      shipReceiptpayFeeDisabled: false,
      shipMonthpayFeeDisabled: false,
      // 费用设置弹窗
      dialogVisible: false,
      // 个人设置弹窗
      dialogVisiblePerson: false,
      // 备注管理弹窗
      popVisible: false,
      // 标记个人设置是否有改动
      changeFlag: Math.random(),
      // 费用其他项
      shipOther: [],
      // 用来保存货物对象的信息
      cargoObject: {},
      // 用来保存货物列表
      cargoList: [{}, {}],
      // 最多创建N个货品
      maxCargoLength: 15,
      // sender副本
      // 用来在提交
      sender: {},
      receiver: {},
      form: {
        cargoList: [{}, {}],
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
        'customerList': [

        ],
        'tmsOrderCargoList': [

        ],
        'tmsOrderPre': {

        },
        'tmsOrderShipInfo': {
          // 修改的时候需要带上id
          // "id": 0,
          'createTime': '',
          'shipArrivepayFee': '',
          'shipBusinessType': '',
          'shipCustomerNumber': '',
          'shipDelete': '',
          'shipDeliveryMethod': '',
          'shipDriverName': '',
          'shipEffective': 94, // 默认为普通
          'shipFromCityName': '',
          'shipFromCityCode': '',
          'shipFromOrgid': '',
          'shipGoodsSn': '',
          // "shipIsAbnormal": '',
          // "shipIsControll": '',
          // "shipIsSeparate": '',
          // "shipIsTransfer": '',
          // "shipIsUpdate": '',
          'shipMonthpayFee': '',
          'shipNowpayFee': '',
          'shipOther': '',
          'shipPayWay': '',
          'shipPrintLib': '',
          'shipReceiptNum': '',
          'shipReceiptRequire': '',
          'shipReceiptSn': '',
          'shipReceiptpayFee': '',
          'shipReceiverId': '',
          'shipRemarks': '',
          'shipSenderId': '',
          'shipShippingType': '',
          'shipSn': '',
          // "shipStatus": '',
          'shipToCityCode': '',
          'shipToCityName': '',
          'shipToOrgid': '',
          'shipTotalFee': '',
          'shipTruckIdNumber': '',
          'shipUserid': '',
          backStatus: '', // 112 已发放
          fundsGoodsStatus: '' // 269 已发放
        },
        'tmsOrderTransfer': {
          'arrivalMobile': '',
          'carrierId': '',
          'carrierMobile': '',
          'codService': '',
          'createTime': '',
          'deliveryExpense': '',
          // 当修改运单时，是否可以修改中转信息
          // "id": '',
          'oddNumbers': '',
          'paymentId': '',
          'remark': '',
          'shipId': '',
          'totalCost': '',
          'transferCharge': '',
          'transferTime': '',
          'updateTime': ''
        },
        tmsOrderTransferList: [],
        tmsOrderShipSign: {},
        tmsShLoadsList: [],
        tmsGxLoadsList: [],
        tmsDbLoadsList: [],
        shipFeeStatusDto: {
          agencyFundStatus: false,
          brokerageFeeStatus: false,
          otherfeeOutStatus: false,
          realityhandlingFeeStatus: false,
          shipReceivableFeeStatus: 'NOSETTLEMENT',
          shipTotalFeeStatus: false,
          transferTotalFeeStatus: false
        }
      },
      // 运单核销样式
      shipStatus: 'ship-yunfeiweijie',
      shipHuidanStatus: '',
      shipHuokuanStatus: '',
      // 系统设置
      config: {},
      // 费用设置
      feeConfig: {},
      // 个人设置
      personConfig: {},
      loading: false,
      // 是否允许修改订单号
      canChangeOrderNum: true,
      // 是否允许修改开单日期
      canChangeOrderDate: true,
      // 是否需要填写中转信息
      shouldInputTransfer: false,
      // 是否允许修改huo号
      canChangeCargoNum: true,
      nowTime: '',
      // 保存城市名
      fromCityName: '',
      toCityName: '',
      // 用来保存外部参数信息
      output: {},
      // 用来缓存当前页面的一些信息
      dataCache: {},
      // 打印数据
      printDataObject: {},
      // 付款方式
      PAY_WAY: {}
    }
  },
  watch: {
    orderdata(newVal) {
      console.log('watch orderdata:', newVal)
      if (newVal) {
        this.initIndex()
      }
    },
    'form.shipFeeStatusDto.shipReceivableFeeStatus'(newVal) {
      switch (newVal) {
        case 'NOSETTLEMENT':
          this.shipStatus = 'ship-yunfeiweijie'
          break
        case 'PARTSETTLEMENT':
          this.shipStatus = 'ship-bufenjiesuan'
          break
        case 'ALLSETTLEMENT':
          this.shipStatus = 'ship-yunfeiyijie'
          break
        default:
          this.shipStatus = ''
          break
      }
    },
    'form.tmsOrderShipInfo.backStatus'(newVal) {
      // 241 已接收未发放
      if (newVal === 242) {
        // shipReceiptNum
        this.shipHuidanStatus = 'ship-huidanyifafang'
        // ship-huidanweifafang
        // ship-huidanweihuishou
      } else {
        if (newVal === 241) {
          this.shipHuidanStatus = 'ship-huidanweifafang'
        } else if (this.form.tmsOrderShipInfo.shipReceiptNum) {
          this.shipHuidanStatus = 'ship-huidanweihuishou'
        } else {
          this.shipHuidanStatus = ''
        }
      }
    },
    'form.tmsOrderShipInfo.fundsGoodsStatus'(newVal) {
      // 268 已到账未发放
      if (newVal === 269) {
        this.shipHuokuanStatus = 'ship-huokuanyifafang'
        // ship-huokuanweifafang
        // ship-huokuanweihuishou
      } else {
        // agencyFund
        // commissionFee
        const find = this.form.cargoList.filter(el => {
          const val = parseFloat(el.agencyFund, 10) || 0
          console.log('form.tmsOrderC', el, val)
          return val > 0
        })
        if (newVal === 268) {
          this.shipHuokuanStatus = 'ship-huokuanweifafang'
        } else if (find.length) {
          this.shipHuokuanStatus = 'ship-huokuanweihuishou'
        } else {
          this.shipHuokuanStatus = ''
        }
      }
    }
  },
  activated() {
    // if (window.TMS_printOrderInfo) {
    //   const fn = () => {
    //     if (this.form.tmsOrderShipInfo.shipPrintLib && this.form.tmsOrderShipInfo.shipPrintLib > 0) {
    //       this.doAction('printLibkey').then(r => {
    //         window.TMS_printOrderInfo = false
    //       }).catch(r => {
    //         window.TMS_printOrderInfo = false
    //       })
    //     } else {
    //       window.TMS_printOrderInfo = false
    //     }
    //   }
    //   this.doAction('printShipKey').then(fn).catch(fn)
    // }
  },
  mounted() {
    this.eventBus.$on('startPrint', () => {
      this.startPrint()
    })
    this.loading = true
    this.initIndex()
  },
  methods: {
    startPrint() {
      if (window.TMS_printOrderInfo) {
        const fn = () => {
          if (this.form.tmsOrderShipInfo.shipPrintLib && this.form.tmsOrderShipInfo.shipPrintLib > 0) {
            this.doAction('printLibkey').then(r => {
              window.TMS_printOrderInfo = false
            }).catch(r => {
              window.TMS_printOrderInfo = false
            })
          } else {
            window.TMS_printOrderInfo = false
          }
        }
        this.doAction('printShipKey').then(fn).catch(fn)
      }
    },
    // 各个接口
    // 为了方便缓存数据，重新包装各个接口
    // 获取货物设置
    getCargoSetting() {
      // if (this.dataCache['cargoSeting']) {
      //   return Promise.resolve(this.dataCache['cargoSeting'])
      // } else {
      return orderManage.getCargoSetting(this.otherinfo.orgid)
      // }
    },
    // 获取基本设置信息
    getBaseSetting() {
      return Promise.all([this.getCargoSetting()]).then(dataArr => {
        // 获取费用设置
        this.feeConfig = dataArr[0]
      }).catch((err) => {
        this.loading = false
        this._handlerCatchMsg(err)
      })
    },
    // 初始化各个表单的情况
    init() {
      // this.getShipPayWay()
      this.setOrderFee()
    },
    // 设置费用列
    setOrderFee() {
      // 处理返回的数据，将fixed的列排在前面，剔除没有被选中的列
      this.feeConfig = this.feeConfig.filter(el => {
        // 如果是fixed元素，则给其较小的序号保证其排在前面
        el.fieldOrder = el.isfixed === 1 ? el.fieldOrder - 1000 : el.fieldOrder
        if (el.ischeck !== 0) {
          this.cargoObject[el.fieldProperty] = ''
          return true
        } else {
          return false
        }
      })
      this.feeConfig.sort((a, b) => {
        return a.fieldOrder < b.fieldOrder ? -1 : 1
      })
    },
    /**
     * 初始化各类情况
     */
    initIndex() {
      this.reset()
      this.getBaseSetting().then(res => {
        this.initOrder()
      }).catch(err => {
        console.log('base setting error:', err)
        this.$message.error('获取信息失败：' + (err.text || err) + ' 请尝试重新刷新页面。')
      })
    },
    // 初始化运单
    initOrder() {
      // 找到运单信息
      this.init()
      this.setOrderData(this.orderdata)
      this.loading = false
    },
    // 回填运单信息
    setOrderData(data) {
      data.customerList = data.customerList || []
      data.tmsOrderCargoList = data.tmsOrderCargoList || []
      data.tmsOrderShipInfo = data.tmsOrderShipInfo || {}

      // 设置运单信息
      for (const i in data.tmsOrderShipInfo) {
        this.form.tmsOrderShipInfo[i] = data.tmsOrderShipInfo[i] === null ? '' : data.tmsOrderShipInfo[i]
      }
      // 设置城市名称
      this.fromCityName = data.tmsOrderShipInfo.shipFromCityName || ''
      this.toCityName = data.tmsOrderShipInfo.shipToCityName || ''
      // this.fromCityName = this.fromCityName.replace(/,$/,'')
      // 设置货物信息
      this.form.cargoList = data.tmsOrderCargoList
      // 设置收发货人信息
      if (data.customerList[0]) {
        for (const i in this.form.sender) {
          this.form.sender[i] = data.customerList[0][i]
        }
      }
      if (data.customerList[1]) {
        for (const i in this.form.receiver) {
          this.form.receiver[i] = data.customerList[1][i]
        }
      }

      this.form.shipFeeStatusDto = data.shipFeeStatusDto

      // 回显控货
      this.shipOther = this.form.tmsOrderShipInfo.shipOther.split(',') || []
      console.log('回显控货:', this.shipOther)

      this.form.customerList = data.customerList
      console.log('setOrderInfo:', data, this.form)
      // 设置中转信息
      if (data.tmsOrderTransferList && data.tmsOrderTransferList.length) {
        this.form.tmsOrderTransferList = data.tmsOrderTransferList
      } else if (data.tmsOrderTransfer) {
        for (const i in data.tmsOrderTransfer) {
          this.form.tmsOrderTransfer[i] = data.tmsOrderTransfer[i]
        }
        this.form.tmsOrderTransferList = [this.form.tmsOrderTransfer]
      }

      // 设置运单信息
      this.form.tmsOrderShipSign = data.tmsOrderShipSign || {}
      this.form.tmsOrderShipSignList = data.tmsOrderShipSignList || []
      this.form.tmsShLoadsList = data.tmsShLoadsList || [{}]
      this.form.tmsGxLoadsList = data.tmsGxLoadsList || [{}]
      this.form.tmsDbLoadsList = data.tmsDbLoadsList || [{}]
      console.log('setOrderInfo3:', data, this.form)
    },
    getCarrier(item) {
      if (item) {
        this.form.tmsOrderTransfer.carrierMobile = item.carrierMobile
      }
    },
    resetObj(obj) {
      for (const i in obj) {
        obj[i] = ''
      }
      return obj
    },
    reset() {
      this.$refs['ruleForm'].resetFields()
      this.form.cargoList = [{}, {}]
      this.form.sender = this.resetObj(this.form.sender)
      this.form.receiver = this.resetObj(this.form.receiver)
      this.form.customerList = []
      this.form.tmsOrderCargoList = []
      this.sender = {}
      this.receiver = {}
      this.form.tmsOrderShipInfo = this.resetObj(this.form.tmsOrderShipInfo)
      this.form.tmsOrderTransfer = this.resetObj(this.form.tmsOrderTransfer)
      // this.setOrderDate()
    },
    // doAction(type) {
    //   switch (type) {
    //     case 'printLibkey':
    //       getPrintLibItems(this.form.tmsOrderShipInfo.id).then(data => {
    //         CreatePrintPage(data)
    //       }).catch((err) => {
    //         this.loading = false
    //         this._handlerCatchMsg(err)
    //       })
    //       break
    //     case 'printShipKey':
    //       getPrintOrderItems(this.form.tmsOrderShipInfo.id).then(data => {
    //         CreatePrintPage(data)
    //       }).catch((err) => {
    //         this.loading = false
    //         this._handlerCatchMsg(err)
    //       })
    //       break
    //   }
    // },
    doAction(type) {
      const printObj = {
        orderdata: {
          tmsOrderShipInfo: this.orderdata.tmsOrderShipInfo,
          tmsOrderCargoList: this.orderdata.tmsOrderCargoList,
          tmsOrderTransferList: this.orderdata.tmsOrderTransferList,

          tmsOrderShipSignList: this.orderdata.tmsOrderShipSignList,
          tmsGxLoadsList: this.orderdata.tmsGxLoadsList,
          tmsDbLoadsList: this.orderdata.tmsDbLoadsList
        },
        number: 1,
        printer: '',
        printSetup: [],
        type: '',
        preview: true
      }
      printObj.preview = !window.TMS_printOrderInfo
      switch (type) {
        case 'printLibkey': // 打印标签
          // console.log('运单详情 orderdata::', JSON.stringify(this.orderdata))
          // getSettingCompanyLi().then(data => {
          // console.log('系统所有打印可设置的数据 标签::', JSON.stringify(data))
          // })
          printObj.printer = this.otherinfo.systemSetup.printSetting.label
          return getEnableLibSetting().then(data => {
            printObj.printSetup = data
            printObj.type = 'lib'
            printObj.number = parseInt(this.orderdata.tmsOrderShipInfo.shipPrintLib, 10) || 0
            CreatePrintPageEnable(printObj)
            return data
              // console.log('打印设置标签 libData::', JSON.stringify(libData))
            this.setPrintData('lib') // 设置数据
            const libData = Object.assign([], data)
            for (const item in this.printDataObject) {
              libData.forEach((e, index) => {
                if (e.filedValue === item) {
                  e['value'] = this.printDataObject[item] // 把页面数据存储到打印数组中
                }
              })
            }
            console.log('window.TMS_printOrderInfo', window.TMS_printOrderInfo)
            if (window.TMS_printOrderInfo) { // 不需要预览的可以设置份数的打印
              return CreatePrintPageEnable(libData, this.otherinfo.systemSetup.printSetting.label, true, this.orderdata.tmsOrderShipInfo.shipPrintLib) // 调打印接口
            } else {
              return CreatePrintPageEnable(libData, this.otherinfo.systemSetup.printSetting.label, false, this.orderdata.tmsOrderShipInfo.shipPrintLib) // 调打印接口
            }
          })
            .catch(err => {
              this._handlerCatchMsg(err)
            })
          break
        case 'printShipKey': // 打印运单
          // console.log('运单详情 orderdata::', JSON.stringify(this.orderdata))
          // getSettingCompanyOrder().then(data => {
          // console.log('系统所有打印可设置的数据 运单::', data)
          // })
          printObj.printer = this.otherinfo.systemSetup.printSetting.ship
          return getEnableOrderSetting().then(data => {
            printObj.printSetup = data
            printObj.type = 'order'
            CreatePrintPageEnable(printObj)
            return data
            this.setPrintData('order') // 设置数据
            const libData = Object.assign([], data)
              // console.log('打印设置运单 libData::', libData)
            for (const item in this.printDataObject) {
              libData.forEach((e, index) => {
                if (e.filedValue === item) {
                  e['value'] = this.printDataObject[item] // 把页面数据存储到打印数组中
                }
              })
            }
            console.log('window.TMS_printOrderInfo', window.TMS_printOrderInfo)
            if (window.TMS_printOrderInfo) { // 不需要预览的打印
              return CreatePrintPageEnable(data, this.otherinfo.systemSetup.printSetting.ship, true)
            } else {
              return CreatePrintPageEnable(data, this.otherinfo.systemSetup.printSetting.ship)
            }
          })
            .catch(err => {
              this._handlerCatchMsg(err)
            })
          break
      }
    },
    setPrintData(type) { // 设置打印数据对象 lib-标签 order-运单
      let obj = new Object()
      const infoDetail = Object.assign({}, this.orderdata.tmsOrderShipInfo)
      const count = 0
      for (const item in this.orderdata.tmsOrderCargoList[0]) {
        if (item !== 'id' && item !== 'orgid' && item !== 'createTime') {
          infoDetail[item] = this.orderdata.tmsOrderCargoList[0][item]
        }
      }
      // 公用
      this.$set(obj, 'shipSn', infoDetail.shipSn) // 运单号
      this.$set(obj, 'createTime', infoDetail.createTime) // 开单日期
      this.$set(obj, 'goodsSn', infoDetail.shipGoodsSn) // 货号
      this.$set(obj, 'senderUnit', infoDetail.shipSenderUnit) // 发货单位
      this.$set(obj, 'senderName', infoDetail.shipSenderName) // 发货人
      this.$set(obj, 'senderMobile', infoDetail.shipSenderMobile) // 发货电话
      this.$set(obj, 'senderAddress', infoDetail.shipSenderAddress) // 发货地址
      this.$set(obj, 'receiverUnit', infoDetail.shipReceiverUnit) // 收货单位
      this.$set(obj, 'receiverName', infoDetail.shipReceiverName) // 收货人
      this.$set(obj, 'receiverAddress', infoDetail.shipReceiverAddress) // 收货地址
      this.$set(obj, 'receiverMobile', infoDetail.shipReceiverMobile) // 收货人电话
      this.$set(obj, 'cargoName', infoDetail.cargoName) // 货品名
      this.$set(obj, 'cargoPack', infoDetail.cargoPack) // 包装
      this.$set(obj, 'cargoAmount', infoDetail.cargoAmount) // 件数
      this.$set(obj, 'cargoWeight', infoDetail.cargoWeight) // 重量
      this.$set(obj, 'cargoVolume', infoDetail.cargoVolume) // 体积
      this.$set(obj, 'fromOrgName', infoDetail.fromOrgName) // 开单网点
      this.$set(obj, 'toOrgName', infoDetail.toOrgName) // 目的网点 || 到达网点
      this.$set(obj, 'description', infoDetail.description) // 品种规格

      const addrToCity = infoDetail.shipToCityName || ''
      const addrToCityArr = addrToCity.split(',')

      const addrFormCity = infoDetail.shipFromCityName || ''
      const addrFormCityArr = addrFormCity.split(',')

      this.$set(obj, 'fromCity', addrFormCityArr[2] || addrFormCityArr[1] || addrFormCityArr[0] || '') // 发站
      this.$set(obj, 'toCity', addrToCityArr[2] || addrToCityArr[1] || addrToCityArr[0] || '') // 到站
      this.$set(obj, 'deliveryMethod', infoDetail.shipDeliveryMethodName) // 交接方式

      if (type === 'lib') {
        this.$set(obj, 'companyName', this.otherinfo.companyName) // 公司名称
        this.$set(obj, 'companyPhone', this.otherinfo.companyInfo.servicePhone) // 公司电话
        this.$set(obj, 'mobilephone', this.otherinfo.mobilephone) // 业务员电话
        this.$set(obj, 'qrcode', '') // 二维码
        this.$set(obj, 'companyAddr', '') // 公司地址
      } else if (type === 'order') {
        this.$set(obj, 'totalFee', parseFloat(infoDetail.shipTotalFee)) // 运费合计
        this.$set(obj, 'shipFee', parseFloat(infoDetail.shipFee)) // 运费
        this.$set(obj, 'deliveryFee', parseFloat(infoDetail.deliveryFee)) // 送货费
        this.$set(obj, 'productPrice', parseFloat(infoDetail.productPrice)) // 声明价值
        this.$set(obj, 'brokerageFee', parseFloat(infoDetail.brokerageFee)) // 回扣
        this.$set(obj, 'brokerageFeeSign', 'R:' + parseFloat(infoDetail.brokerageFee)) // 回扣标识
        this.$set(obj, 'agencyFund', parseFloat(infoDetail.agencyFund)) // 代收货款
        this.$set(obj, 'commissionFee', parseFloat(infoDetail.commissionFee)) // 代收货款手续费
        this.$set(obj, 'insuranceFee', parseFloat(infoDetail.insuranceFee)) // 保险费
        this.$set(obj, 'handlingFee', parseFloat(infoDetail.handlingFee)) // 装卸费
        this.$set(obj, 'packageFee', parseFloat(infoDetail.packageFee)) // 包装费
        this.$set(obj, 'pickupFee', parseFloat(infoDetail.pickupFee)) // 提货费
        this.$set(obj, 'upStairsFee', parseFloat(infoDetail.goupstairsFee)) // 上楼费
        this.$set(obj, 'realityhandlingFee', parseFloat(infoDetail.realityhandlingFee)) // 实际提货费
        this.$set(obj, 'forkliftFee', parseFloat(infoDetail.forkliftFee)) // 叉车费
        this.$set(obj, 'customsFee', parseFloat(infoDetail.customsFee)) // 报关费
        this.$set(obj, 'weightFee', parseFloat(infoDetail.weightFee)) // 重量单价
        this.$set(obj, 'volumeFee', parseFloat(infoDetail.volumeFee)) // 体积单价
        this.$set(obj, 'amountFee', parseFloat(infoDetail.amountFee)) // 件数单价
        this.$set(obj, 'otherfeeOut', parseFloat(infoDetail.otherfeeOut)) // 其他费用支出
        this.$set(obj, 'otherfeeIn', parseFloat(infoDetail.otherfeeIn)) // 其他费用收入
        this.$set(obj, 'taxRate', parseFloat(infoDetail.taxRate)) // 税率
        this.$set(obj, 'taxes', parseFloat(infoDetail.taxes)) // 税金
        this.$set(obj, 'housingFee', parseFloat(infoDetail.housingFee)) // 入仓费
        this.$set(obj, 'stampTax', parseFloat(infoDetail.stampTax)) // 印花税
        this.$set(obj, 'housingFee', parseFloat(infoDetail.housingFee)) // 入仓费
        this.$set(obj, 'receiptRequire', infoDetail.shipReceiptRequireName) // 回单要求
        this.$set(obj, 'customerNumber', infoDetail.shipCustomerNumber) // 客户单号
        this.$set(obj, 'shippingType', infoDetail.shipShippingTypeName) // 运输方式
        this.$set(obj, 'businessType', infoDetail.shipBusinessTypeName) // 业务类型
        this.$set(obj, 'createrName', infoDetail.userName) // 开单员
        this.$set(obj, 'userName', infoDetail.userName) // 制单员
        this.$set(obj, 'remarks', infoDetail.shipRemarks) // 备注
        this.$set(obj, 'effective', infoDetail.shipEffectiveName) // 时效
        // ///////////////////////////////////////////////////////////
        // /运单号-件数
        this.$set(obj, 'shipSnCargoAmount', infoDetail.shipSn + '-' + infoDetail.cargoAmount)
        // //////////////////////////////////////////////////////////
        // /年月日
        const year = parseTime(infoDetail.createTime, '{y}')
        this.$set(obj, 'createYear', parseTime(infoDetail.createTime, '{y}'))
        this.$set(obj, 'createYear2', year.substr(2, 2))
        this.$set(obj, 'createMonth', parseTime(infoDetail.createTime, '{m}'))
        this.$set(obj, 'createDate', parseTime(infoDetail.createTime, '{d}'))
        // //////////////////////////////////////////////////////////
        // /特殊处理 中转费
        let totalTransferFee = 0
        if (this.orderdata.tmsOrderTransferList && this.orderdata.tmsOrderTransferList.length > 0) {
          this.orderdata.tmsOrderTransferList.forEach(e => {
            totalTransferFee = tmsMath._add(totalTransferFee, e.totalCost)
          })
        }
        this.$set(obj, 'transferFee', parseFloat(totalTransferFee)) // 中转费
        console.log('中转费', totalTransferFee)

        // //////////////////////////////////////////////////////////
        // /特殊处理 打勾
        this.$set(obj, 'payWay', infoDetail.shipPayWayName) // 付款方式
        switch (infoDetail.shipPayWay) { // 付款方式
          case 76:
            this.$set(obj, 'nowPay', '√') // 现付（√）
            // this.$set(obj, 'payWay', infoDetail.shipNowpayFee) // 付款方式
            break
          case 77:
            this.$set(obj, 'deliveryPay', '√') // 提付（√）|| 到付（√）
            // this.$set(obj, 'payWay', infoDetail.shipArrivepayFee) // 付款方式
            // this.$set(obj, 'payWay', infoDetail.shipArrivepayFee) // 付款方式
            break
          case 78:
            this.$set(obj, 'monthPay', '√') // 月结（√）
            // this.$set(obj, 'payWay', infoDetail.shipMonthpayFee) // 付款方式
            break
          case 79:
            this.$set(obj, 'receiptPay', '√') // 回单付（√）
            // this.$set(obj, 'payWay', infoDetail.shipReceiptpayFee) // 付款方式
            break
        }
        if (infoDetail.shipDeliveryMethod === 68) {
          this.$set(obj, 'deliveryGood', '√') // 自提（√）
        } else if (infoDetail.shipDeliveryMethod === 69) {
          this.$set(obj, 'sendGood', '√') // 送货（√）
        }
        if (infoDetail.shipOther && infoDetail.shipOther.indexOf(168) !== -1) {
          this.$set(obj, 'controlGoods', infoDetail.shipOther) // 168-控货
        }
        if (infoDetail.shipOther && infoDetail.shipOther.indexOf(169) !== -1) {
          this.$set(obj, 'valuables', infoDetail.shipOther) //  169-贵重物品
        }
        if (infoDetail.shipEffective === 95) {
          this.$set(obj, 'urgent', infoDetail.shipEffective) // 95-时效-加急
        } else {
          this.$set(obj, 'common', infoDetail.shipEffective) // 94-时效-普通
        }
        // //////////////////////////////////////////////////////////
        // /处理合计中文大写
        if (infoDetail.shipTotalFee) {
          const totalFeeBig = this.setFeeToBig(infoDetail.shipTotalFee)
          this.$set(obj, 'uptotalFeeW', totalFeeBig[4]) // 运费合计(万)
          this.$set(obj, 'uptotalFeeQ', totalFeeBig[3]) // 运费合计(仟)
          this.$set(obj, 'uptotalFeeB', totalFeeBig[2]) // 运费合计(佰)
          this.$set(obj, 'uptotalFeeS', totalFeeBig[1]) // 运费合计(拾)
          this.$set(obj, 'uptotalFeeY', totalFeeBig[0]) // 运费合计(元)
        }
        if (infoDetail.agencyFund) {
          const upagencyFeeBig = this.setFeeToBig(infoDetail.agencyFund)
          this.$set(obj, 'upagencyFundW', upagencyFeeBig[4]) // 代收货款(万)
          this.$set(obj, 'upagencyFundQ', upagencyFeeBig[3]) // 代收货款(仟)
          this.$set(obj, 'upagencyFundB', upagencyFeeBig[2]) // 代收货款(佰)
          this.$set(obj, 'upagencyFundS', upagencyFeeBig[1]) // 代收货款(拾)
          this.$set(obj, 'upagencyFundY', upagencyFeeBig[0]) // 代收货款(元)
        }
      }
      this.printDataObject = Object.assign({}, obj)
      obj = {}
    },
    filterNumber(val) {
      const str = val.toString().split('').reverse()
      const pointIndex = str.indexOf('.')
      console.log('filterNumber str:::', str, pointIndex, parseFloat(val))
      for (let i = 0; i < pointIndex; i++) {

      }
    },
    setFeeToBig(fee) { // 费用转成中文大写
      console.log('fee:::::::', fee, smalltoBIG(fee))
      if (fee) {
        let feezh = fee.toString().split('').reverse()
        const pointIndex = feezh.indexOf('.') + 1
        const feezhAll = smalltoBIG(fee)
        feezh = feezh.slice(pointIndex).reverse()
        feezh.forEach((e, index) => {
          this.$set(feezh, index, smalltoBIG(e).slice(0, 1))
        })
        feezh = feezh.reverse()
        if (feezh && feezh.length > 4) { // 过万的数字直接拼接
          feezh[4] = feezhAll.slice(0, feezhAll.indexOf('万'))
        } else if (feezh && feezh.length < 5) { // 补充零
          for (let i = 0; i < 5; i++) {
            feezh[i] = feezh[i] || '零'
          }
        }
        console.log('feezh:::::', feezh)
        return feezh
      }
    },
    getShipPayWay() { // 获取付款方式中文
      getSelectType('ship_pay_way', this.otherinfo.orgid).then(data => {
        data.forEach(e => {
          this.PAY_WAY[e.id] = e.dictName
        })
      }).catch((err) => {
        this.loading = false
        this._handlerCatchMsg(err)
      })
    }
  }
}

</script>
<style lang="scss">
$bordercolor: #d4d4d4;
$backgroundcolor: #cbe1f7;

.orderinfo-manager .el-tabs .ordermaininfo {
  height: auto;
}

.OrderDetail-main {
  padding-top: 10px;
  font-size: 12px;
  max-height: 100%;
  min-width: 1316px;
  display: flex;
  flex-direction: column;
  position: relative;
  height: auto;

  .el-dialog__wrapper,
  .v-modal {
    position: absolute;
  }

  .el-date-editor.el-input {
    width: 140px;
  }

  .el-form-item--mini.el-form-item {
    margin: 0;
  }

  .createOrder-title {
    font-size: 24px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 9px;
    color: #000;
    text-align: center;
    height: 28px;
    position: absolute;
    top: 4px;
    left: 0;
    width: 100%;

    span {
      border-bottom: 1px solid rgba(0, 0, 0, 0.43);
    }
  }
  .order-num {
    float: left;
    padding-left: 8px;
    color: #333;
    line-height: 28px;

    .order-num-info {
      display: inline-block;
      width: 120px;
      color: #f00;
      font-weight: bold;
    }
  }
  .create-num {
    float: right;
    padding-right: 8px;
    color: #777;

    span {
      color: #333;
      font-weight: bold;
    }
  }
  .order-main {
    min-height: 360px;
    border: solid 2px #000827;
    margin-top: 8px; // max-height: calc(100% - 38px);
    flex: 1;
    overflow-y: auto;

    .required {
      color: #f00;
      font-weight: normal;
    }
  }
  &>.el-form {
    //height: calc( 100% - 100px);
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .order-form-item {
    float: none;
  }
  .createOrder-info {
    height: 30px;
    line-height: 30px;
  }

  .el-select__caret::before {
    content: "\E60C";
  }

  .order-form-label {
    color: #666;
  }

  .order-form-item {
    display: flex;
    line-height: 28px;
    .order-form-label {
      width: 66px;
      text-align: justify;
      border-right: 1px solid $bordercolor;
      height: 28px;
      overflow: hidden;
      padding: 0 5px;

      &:after {
        display: inline-block;
        content: '';
        padding-left: 100%;
        height: 0;
        width: 0;
        line-height: 0;
      }
    }

    .el-form-item {
      flex: 1;
    }
    .autocomplete-input,
    .el-form-item__content,
    .el-autocomplete,
    .el-select {
      display: block;
      width: 100%;
    }
    .el-input__suffix {
      right: 0;
    }
    .el-form-item__content {
      height: 28px;
      overflow: hidden;
    }
    .el-input__inner {
      vertical-align: 1px;
    }
    .el-form-item.is-error .el-input__inner {
      border-color: #f56c6c;
    }
  }
  .el-input.is-disabled .el-input__inner {
    color: #3e9ff1;
  }

  .firstline-order {
    border-bottom: 1px solid $bordercolor;

    .el-col:first-child .order-form-label {
      border-left: none;
    }
    .order-form-label {
      display: inline-block;

      border-left: 1px solid $bordercolor;
    }
    .el-input__inner {
      border-color: transparent;
      border-radius: 0;

      &:focus {
        background: rgba(0, 0, 0, 0.04);
      }
    }
  }

  /* 收发货表单 */
  .sender-form,
  .receiver-form {
    float: left;
    width: calc( (100% - 5px) / 2);

    .order-form-item {
      border-bottom: 1px solid $bordercolor;

      &:last-child {
        border: none;
      }
    }

    .form-title {
      border-bottom: 1px solid $bordercolor;
      line-height: 28px;
      text-align: center;
      font-size: 16px;
      color: #5dabed;
      background: $backgroundcolor;
      font-weight: bold;
      letter-spacing: 2px;
    }
    .el-input__inner {
      border-color: transparent;
      border-radius: 0;

      &:focus {
        background: rgba(0, 0, 0, 0.04);
      }
    }
  }
  .sender-form {
    border-right: 1px solid $bordercolor;
  }
  .receiver-form {
    float: right;
    border-left: 1px solid $bordercolor;
  }

  /** 货品表单 **/
  .order-cargo-form {
    overflow: auto;
    margin-bottom: 1px;
    table,
    td {
      border: 1px solid $bordercolor;
      text-align: center;
    }
    td,
    th {
      padding: 0 0;
      height: 28px;
    }
    th {
      min-width: 110px;
      background: #d5e7f9;
      color: #666;
      height: 28px;
      vertical-align: middle;
      border-left: 1px solid #88bef3;
      text-align: center;
    }
    .addButtonTh {
      min-width: 50px;
    }
    .el-input__inner {
      border-color: transparent;
      border-radius: 0;

      &:focus {
        background: rgba(0, 0, 0, 0.04);
      }
    }
    .addButton,
    .minusButton {
      display: inline-block;
      width: 18px;
      height: 18px;
      text-align: center;
      border: 1px solid #3b95ee;
      color: #3b95ee;
      line-height: 14px;
      border-radius: 4px;

      cursor: pointer;

      i {
        font-weight: bold;
        vertical-align: middle;
      }
    }
    .minusButton {
      border-color: #ee3b3b;
      color: #ee3b3b;
    }
  }
  /* 其他费用 */
  .order-other-form {
    border-top: 1px solid $bordercolor;
    border-bottom: 1px solid $bordercolor;
    margin-bottom: 1px;

    .order-form-item {
      border-bottom: 1px solid $bordercolor;
    }

    .fouth-order-other {
      .order-form-item {
        border-bottom: none;
      }
    }

    .el-col:first-child .order-form-label {
      border-left: none;
    }
    .order-form-label {
      display: inline-block;

      border-left: 1px solid $bordercolor;
    }

    .el-input__inner {
      border-color: transparent;
      border-radius: 0;

      &:focus {
        background: rgba(0, 0, 0, 0.04);
      }
    }

    .el-input-group__append {
      padding: 0 5px;
      border-radius: 0;
      border: none;
    }
    .el-checkbox {
      margin-left: 10px;
    }
    .el-checkbox {
      font-size: 0;
    }
    .el-checkbox__label {
      vertical-align: middle;
    }

    .other-form-shipReceiptNum {
      padding: 0;
      .el-input__inner {
        padding: 0;
        text-align: center;
      }
    }

    .remarks-btn {
      position: absolute;
      top: 0;
      right: 1px;
      color: #3189e2;
      border-color: #3189e2;
      z-index: 2;
    }
  }

  /* 中转信息 */
  .order-transfer-form {
    margin-top: 12px;
    display: flex;
    align-items: stretch;

    .show-form-title {
      width: 136px;
      text-align: center;
      color: #000;
      font-size: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #d5e7f9;
    }

    .order-transfer-table {
      flex: 1;
      overflow: auto;
    }

    .el-input__inner {
      border-color: transparent;
      border-radius: 0;

      &:focus {
        background: rgba(0, 0, 0, 0.04);
      }
    }

    th {
      height: 30px;
      line-height: 30px;
      background: #eee;
      min-width: 100px;
    }
    td {
      text-align: center;
      color: #3e9ff1;
      white-space: nowrap;
      padding: 0 5px;
      min-width: 100px;
      height: 30px;
    }
    table {
      width: 100%;
    }
    table,
    td,
    th {
      border: 1px solid $bordercolor;
    }
  }


  /* 底部按钮部分 */
  .order-btns {
    padding-top: 21px;
    text-align: center;
    position: relative;
    height: 72px;

    .el-button {
      font-size: 16px; //background: transparent;
      i {
        font-size: 1.5em;
        vertical-align: middle;
      }
    }
    .createOrder-setup {

      position: absolute;
      top: 8px;
      right: 8px;

      .el-button {
        font-size: 16px;
        padding: 2px;
      }
    }
  } // 各种状态控制显示
  .order-status-info {
    position: absolute;
    top: 0;
    left: 140px;
    color: #ef0000;
    font-size: 16px;
    text-align: center;
    font-weight: bold;
    font-family: "宋体", serif;
    span {
      display: block;
    }
    .order-status-name {
      margin-bottom: 5px;
    }
    .order-status-org {}
  } // 签收图片
  .clickimglist {
    width: 100%;
    overflow: auto;
    padding-bottom: 2px;
    margin: 10px auto;
  }
}

</style>
