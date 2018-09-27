<template>
  <div class="createOrder-main" :class="{'creatBatch-main': output.isbatch}" v-loading="loading">
    <div class="batchlist" v-if="output.isbatch">
      <span class="batchNum" :class="{'on': i === currentBatch}" v-for="i in output.ordernum" @click="changeBatch(i)" :key="i">第{{ i }}票</span>
    </div>
    <div class="createOrderWrapper">
    <div class="createOrder-title"><span>{{ otherinfo.systemSetup.shipPageFunc.orderName || '收发货凭证'}}</span></div>
    <el-form :model="form" label-width="100px" ref="ruleForm" :show-message="false" :status-icon='false' inline label-position="right" size="mini">
    <div class="createOrder-info clearfix">
      <div class="order-num required">运单号： <span class="order-num-info">
        <el-form-item  :error='shipFieldValueInfo.shipSn'>
          <el-input ref="tmsOrderShipshipSn" v-onlyNumberAndLetter size="mini" :maxlength="20" :disabled="!canChangeOrderNum" v-model="form.tmsOrderShip.shipSn" />
        </el-form-item>
        </span></div>
      <div class="create-num required">开单日期： <span class="create-num-info">
         <el-date-picker
            v-model="form.tmsOrderShip.createTime"
            type="date"
            :clearable="false"
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
          <div class="order-form-item showFormInfo">
            <span class="order-form-label">开单网点</span>
            <el-form-item prop="tmsOrderShip.shipFromOrgid">
              <SelectTree disabled :filterable="false" size="mini" v-model="form.tmsOrderShip.shipFromOrgid" />
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="order-form-item">
            <span class="order-form-label" :class="{'required': shipFieldValue.shipFromCityName}">出发城市</span>
            <el-form-item :error='shipFieldValueInfo.shipFromCityName' >
              <querySelect :maxlength="50" ref="tmsOrderShipFromCityName" @keydown.enter.native="goNextInput" show='select' filterable search="longAddr" @change="selectFromCity" :name="fromCityName" valuekey="longAddr" type="fromcity"  v-model="form.tmsOrderShip.shipFromCityName" :remote="true" />
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="order-form-item">
            <span class="order-form-label required">到达城市</span>
            <el-form-item :error='shipFieldValueInfo.shipToCityName'>
              <querySelect :maxlength="50" ref="tmsOrderShipshipToCityName" @keydown.enter.native="goNextInput" show='select' filterable @change="selectToCity" search="longAddr" valuekey="longAddr" type="tocity"  v-model="form.tmsOrderShip.shipToCityName" :remote="true" />
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="order-form-item">
            <span class="order-form-label" :class="{'required': shipFieldValue.shipToOrgid}">目的网点</span>
            <el-form-item :error='shipFieldValueInfo.shipToOrgid'>
              <SelectTree ref="tmsOrderShipToOrgid" @keydown.enter.native="goNextInput"  size="mini" v-model="form.tmsOrderShip.shipToOrgid" />
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="order-form-item">
            <span class="order-form-label">交接方式</span>
            <el-form-item prop="tmsOrderShip.shipDeliveryMethod">
              <SelectType @keydown.enter.native="goNextInput" size="mini" v-model="form.tmsOrderShip.shipDeliveryMethod" type="ship_delivery_method" />
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="order-form-item showFormInfo">
            <span class="order-form-label" :class="{'required': shipFieldValue.shipGoodsSn}">货号</span>
            <el-form-item :error='shipFieldValueInfo.shipGoodsSn'>
              <el-input ref="tmsOrderShipGoodsSn" v-onlyNumberAndLetter size="mini" :maxlength="20" :disabled="!canChangeCargoNum" v-model="form.tmsOrderShip.shipGoodsSn" />
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
            <span :class="{'required': shipFieldValue.shipSenderId}" class="order-form-label">发货方</span>
            <el-form-item :error='shipFieldValueInfo.shipSenderUnit' >
              <querySelect :maxlength="25" ref="tmsOrdercustomerUnit" search="customerUnit" type="sender" valuekey="customerUnit" v-model="form.sender.customerUnit" @change="setSender" />
            </el-form-item>
          </div>
          <div class="order-form-item">
            <span class="order-form-label " :class="{'required': shipFieldValue.shipSenderName}">发 货 人</span>
            <el-form-item :error='shipFieldValueInfo.shipSenderName' >
              <querySelect :maxlength="25" ref="tmsOrdercustomerName" suffix="el-icon-search" search="customerName" type="sender" valuekey="customerName" v-model="form.sender.customerName" @change="setSender" />
            </el-form-item>
          </div>
          <div class="order-form-item">
            <span class="order-form-label " :class="{'required': shipFieldValue.shipSenderMobile}">联系电话</span>
            <el-form-item :error='shipFieldValueInfo.shipSenderMobile'>
              <querySelect :maxlength="11" ref="tmsOrdercustomerMobile" search="customerMobile" type="sender" valuekey="customerMobile" v-model="form.sender.customerMobile" @change="setSender" />
            </el-form-item>
          </div>
          <div class="order-form-item">
            <span class="order-form-label" :class="{'required': shipFieldValue.shipSenderAddress}">发货地址</span>
            <el-form-item :error='shipFieldValueInfo.shipSenderAddress'>
              <querySelect :maxlength="50" ref="tmsOrderdetailedAddress" search="detailedAddress" type="sender" valuekey="detailedAddress" v-model="form.sender.detailedAddress" @change="setSender" />
            </el-form-item>
          </div>
        </div>
        <div class="receiver-form">
          <div class="form-title">
            收货方
          </div>
          <div class="order-form-item">
            <span class="order-form-label" :class="{'required': shipFieldValue.shipReceiverId}">收货方</span>
            <el-form-item :error='shipFieldValueInfo.shipReceiverUnit'>
              <querySelect :maxlength="25" ref="tmsOrdershipReceiverUnit" search="customerUnit" type="receiver" valuekey="customerUnit" v-model="form.receiver.customerUnit" @change="setReceiver" />
            </el-form-item>
          </div>
          <div class="order-form-item">
            <span class="order-form-label" :class="{'required': shipFieldValue.shipReceiverName}">收 货 人</span>
            <el-form-item :error='shipFieldValueInfo.shipReceiverName'>
              <querySelect :maxlength="25" ref="tmsOrdershipReceiverName" suffix="el-icon-search" search="customerName" type="receiver" valuekey="customerName" v-model="form.receiver.customerName" @change="setReceiver" />
            </el-form-item>
          </div>
          <div class="order-form-item">
            <span class="order-form-label" :class="{'required': shipFieldValue.shipReceiverMobile}">联系电话</span>
            <el-form-item :error='shipFieldValueInfo.shipReceiverMobile'>
              <querySelect :maxlength="11" ref="tmsOrdershipReceiverMobile" search="customerMobile" type="receiver" valuekey="customerMobile" v-model="form.receiver.customerMobile" @change="setReceiver" />
            </el-form-item>
          </div>
          <div class="order-form-item">
            <span class="order-form-label" :class="{'required': shipFieldValue.shipReceiverAddress}">收货地址</span>
            <el-form-item :error='shipFieldValueInfo.shipReceiverAddress'>
              <querySelect :maxlength="50" ref="tmsOrdershipReceiverAddress" search="detailedAddress" type="receiver" valuekey="detailedAddress" v-model="form.receiver.detailedAddress" @change="setReceiver" />
            </el-form-item>
          </div>
        </div>
      </div>
      <!-- 货物费用 -->
      <div class="order-cargo-form">
        <el-table ref="cargoListTable" :key="cargoKey" :data="form.cargoList" border tooltip-effect="dark" triped width="100%" style="width: 100%">
          <el-table-column class="addButtonTh" fixed :render-header="setHeader" width="50">
            <template slot-scope="scope">
              <span class="minusButton" v-if="scope.$index !== 0" @click="deleteCargoList(scope.$index)"><i class="el-icon-minus"></i></span>
            </template>
          </el-table-column>
          <el-table-column v-for="(item, index) in theFeeConfig" :key="index" :width="item.fieldProperty.indexOf('cargoName')!==-1 ? 120 : 'auto'" :label-class-name="(shipFieldValue[item.fieldProperty] || (/(cargoName|cargoAmount)/.test(item.fieldProperty))) ? 'required' : ''" :label="item.fieldName">
            <template slot-scope="scope">
              <template v-if="item.fieldProperty.indexOf('cargoName')!==-1">
                  <el-form-item  :error="scope.$index === 0 ? shipFieldValueInfo.cargoName : ''">
                    <querySelect :maxlength="30" ref="tmsOrdercargoName" getinput size="mini" search="value" type="cargoName" valuekey="value" v-model="form.cargoList[scope.$index].cargoName" />
                  </el-form-item>
                </template>
                <template v-else-if="item.fieldProperty.indexOf('cargoPack')!==-1">
                  <el-form-item :error="scope.$index === 0 ? shipFieldValueInfo.cargoPack : ''">
                    <querySelect :maxlength="20" ref="tmsOrdercargoPack" size="mini" search="value" type="cargoPack" valuekey="value" v-model="form.cargoList[scope.$index].cargoPack" />
                  </el-form-item>
                </template>
                <template v-else-if="item.fieldProperty.indexOf('cargoAmount')!==-1">
                  <el-form-item :error="scope.$index === 0 ? shipFieldValueInfo.cargoAmount : ''">
                    <input ref="tmsOrdercargoAmount" v-number-only size="mini" maxlength="20"
                   :value="form.cargoList[scope.$index].cargoAmount" @change="(val) => detectCargoNumChange(scope.$index, item.fieldProperty, val)" />
                  </el-form-item>
                </template>
                <template v-else-if="item.fieldProperty.indexOf('shipFee')!==-1">
                  <el-form-item >
                  <input ref="tmsOrdershipFee" v-number-only:point size="mini" maxlength="20"
                  :value="form.cargoList[scope.$index].shipFee" @change="(val) => changeFee(scope.$index, item.fieldProperty, val)" />
                  </el-form-item>
                </template>
                <template v-else-if="/(cargoWeight|cargoVolume)/.test(item.fieldProperty)">
                  <el-form-item  :error="scope.$index === 0 ? shipFieldValueInfo[item.fieldProperty] : ''">
                    <input :ref="`${'tmsOrder'+item.fieldProperty}`" v-number-only:point size="mini" maxlength="20"
                  :value="form.cargoList[scope.$index][item.fieldProperty]" @change="(val) => changeFee(scope.$index, item.fieldProperty, val)" />
                  </el-form-item>
                </template>
                <template v-else-if="/(fee|price|agency|tax)/i.test(item.fieldProperty)">
                  <el-form-item  :error="scope.$index === 0 ? shipFieldValueInfo[item.fieldProperty] : ''">
                    <input :ref="`${'tmsOrder'+item.fieldProperty}`" size="mini" v-number-only:point maxlength="20" :value="form.cargoList[scope.$index][item.fieldProperty]" @change="(val) => changeFee(scope.$index, item.fieldProperty, val)"
                    />
                  </el-form-item>
                </template>
                <template v-else>
                  <input :ref="`${'tmsOrder'+item.fieldProperty}`" size="mini" class="nativeinput" maxlength="20" :value="form.cargoList[scope.$index][item.fieldProperty]" @change="(val) => changeFee(scope.$index, item.fieldProperty, val)"
                    />
                </template>
              </template>
          </el-table-column>  
        </el-table>
      </div>
      <!-- 其它项 -->
      <div class="order-other-form clearfix">
        <el-row class="firstline-order-other">
          <el-col :span="4">
            <div class="order-form-item">
              <span class="order-form-label">运费合计</span>
              <el-form-item prop="tmsOrderShip.shipTotalFee">
                <el-input size="mini" :maxlength="20" disabled v-model="form.tmsOrderShip.shipTotalFee" />
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="order-form-item">
              <span class="order-form-label">付款方式</span>
              <el-form-item prop="tmsOrderShip.shipPayWay">
                <SelectType size="mini" v-model="form.tmsOrderShip.shipPayWay" type="ship_pay_way" />
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="order-form-item">
              <span class="order-form-label">现付</span>
              <el-form-item prop="tmsOrderShip.shipNowpayFee">
                <el-input @blur="formatShipFee" @focus="setOtherFee('shipNowpayFee')" size="mini" :maxlength="20" :disabled="shipNowpayFeeDisabled"  v-model="form.tmsOrderShip.shipNowpayFee" />
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="order-form-item">
              <span class="order-form-label">到付</span>
              <el-form-item prop="tmsOrderShip.shipArrivepayFee">
                <el-input @blur="formatShipFee" @focus="setOtherFee('shipArrivepayFee')" size="mini" :maxlength="20" :disabled="shipArrivepayFeeDisabled"  v-model="form.tmsOrderShip.shipArrivepayFee" />
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="order-form-item">
              <span class="order-form-label">回单付</span>
              <el-form-item prop="tmsOrderShip.shipReceiptpayFee">
                <el-input @blur="formatShipFee" @focus="setOtherFee('shipReceiptpayFee')" size="mini" :maxlength="20" :disabled="shipReceiptpayFeeDisabled"  v-model="form.tmsOrderShip.shipReceiptpayFee" />
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="order-form-item">
              <span class="order-form-label">月结</span>
              <el-form-item prop="tmsOrderShip.shipMonthpayFee">
                <el-input @blur="formatShipFee" @focus="setOtherFee('shipMonthpayFee')" size="mini" :maxlength="20" :disabled="shipMonthpayFeeDisabled"  v-model="form.tmsOrderShip.shipMonthpayFee" />
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row class="second-order-other">
          <el-col :span="4">
            <div class="order-form-item">
              <span class="order-form-label">回单类型</span>
              <el-form-item prop="tmsOrderShip.shipReceiptRequire">
                <SelectType size="mini"  v-model="form.tmsOrderShip.shipReceiptRequire" type="ship_receipt_require" />
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="order-form-item">
              <span class="order-form-label other-form-shipReceiptNum">
                <el-form-item prop="tmsOrderShip.shipReceiptNum">
                  <el-input v-number-only size="mini" :maxlength="3"  v-model="form.tmsOrderShip.shipReceiptNum" >
                    <template slot="append">份</template>
                  </el-input>
                </el-form-item>
              </span>
              <el-form-item prop="tmsOrderShip.shipReceiptSn">
                <el-input v-onlyNumberAndLetter size="mini" :maxlength="20"  placeholder="回单号" v-model="form.tmsOrderShip.shipReceiptSn" />
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="order-form-item">
              <span class="order-form-label">打印标签</span>
              <el-form-item prop="tmsOrderShip.shipPrintLib">
                <el-input v-number-only size="mini" :maxlength="3"  v-model="form.tmsOrderShip.shipPrintLib" >
                  <template slot="append">份</template>
                </el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="order-form-item">
              <span class="order-form-label " :class="{'required': shipFieldValue.shipCustomerNumber}">客户单号</span>
              <el-form-item :error="shipFieldValueInfo.shipCustomerNumber">
                <el-input ref="tmsOrdershipCustomerNumber" v-onlyNumberAndLetter size="mini" :maxlength="20"  v-model="form.tmsOrderShip.shipCustomerNumber" />
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="order-form-item">
              <span class="order-form-label">运输方式</span>
              <el-form-item prop="tmsOrderShip.shipShippingType">
                <SelectType size="mini" v-model="form.tmsOrderShip.shipShippingType" type="ship_shipping_type" />
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="order-form-item">
              <span class="order-form-label">业务类型</span>
              <el-form-item prop="tmsOrderShip.shipBusinessType">
                <SelectType size="mini" v-model="form.tmsOrderShip.shipBusinessType" type="ship_business_type" />
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row class="third-order-other">
          <el-col :span="4">
            <div class="order-form-item">
              <span class="order-form-label">时效</span>
              <el-form-item prop="tmsOrderShip.shipEffective">
                <SelectType size="mini" v-model="form.tmsOrderShip.shipEffective" type="ship_effective" />
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="order-form-item">
              <span class="order-form-label">提货批次</span>
              <el-form-item prop="tmsOrderShip.shipBatchId">
                <querySelect key="batchid"  size="mini" search="batchNumber" placeholder="请选择" type="batch" show="select" valuekey="bathId" @change="getBatch" v-model="form.tmsOrderShip.shipBatchId" />
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="order-form-item">
              <span class="order-form-label">车牌号</span>
              <el-form-item prop="tmsOrderShip.shipTruckIdNumber">
                <el-input size="mini" :maxlength="20" disabled v-model="form.tmsOrderShip.shipTruckIdNumber" />
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="order-form-item">
              <span class="order-form-label" :class="{'required': shipFieldValue.shipUserid}">业务员</span>
              <el-form-item :error="shipFieldValueInfo.shipUserid">
                <querySelect ref="tmsOrdershipUserid" show="select" filterable :orgid="otherinfo.orgid "  size="mini" :name="otherinfo.name" search="name"  v-model="form.tmsOrderShip.shipUserid" />
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="order-form-item">
              <span class="order-form-label">其他</span>
              <el-checkbox-group v-model="shipOther">
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
              <el-form-item prop="tmsOrderShip.shipRemarks">
                <el-button class="remarks-btn" size="mini" icon="el-icon-date" @click="popVisible = true" plain>常用备注</el-button>
                <querySelect size="mini" search="value" type="remark" valuekey="value"  :maxlength="250"  v-model="form.tmsOrderShip.shipRemarks" />
              </el-form-item>
            </div>
          </el-col>
        </el-row>
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
                  <th style="min-width:100px">中转其它费</th>
                  <th style="min-width:100px">中转费合计</th>
                  <th style="min-width:100px">中转付款方式</th>
                  <th style="min-width:100px">中转备注</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <el-date-picker
                      v-model="form.tmsOrderTransfer.transferTime"
                      type="date"
                      value-format="yyyy-MM-dd hh:mm:ss"
                      :picker-options="pickoption2"
                      v-if="nowTime"
                      size="mini"
                      tabindex="-1"
                      placeholder="选择日期">
                    </el-date-picker>
                  </td>
                  <td>
                    <el-input size="mini" v-onlyNumberAndLetter :maxlength="20"
                    @change="setOddNumbers" v-model="form.tmsOrderTransfer.oddNumbers" />
                  </td>
                  <td>
                    <querySelect  size="mini" search="carrierName" type="carrier" valuekey="carrierId" @change="getCarrier"
                    :filterable="true" show="select" v-model="form.tmsOrderTransfer.carrierId" />
                  </td>
                  <td>
                    <el-input size="mini" :maxlength="20"  v-numberOnly v-model="form.tmsOrderTransfer.carrierMobile" />
                  </td>
                  <td>
                    <el-input size="mini" :maxlength="13"  v-numberOnly v-model="form.tmsOrderTransfer.arrivalMobile" />
                  </td>
                  <td>
                    <el-input size="mini" :maxlength="8"  v-numberOnly:point v-model.number="form.tmsOrderTransfer.transferCharge" />
                  </td>
                  <td>
                    <el-input size="mini" :maxlength="8"  v-numberOnly:point v-model.number="form.tmsOrderTransfer.deliveryExpense" />
                  </td>
                  <td>
                    <el-input size="mini" :maxlength="20"
                    v-numberOnly:point   v-model="form.tmsOrderTransfer.transferOtherFee" />
                  </td>
                  <td>
                    <el-input size="mini" :maxlength="8" disabled v-model="form.tmsOrderTransfer.totalCost" />
                  </td>
                  <td>
                    <SelectType size="mini" v-model="form.tmsOrderTransfer.paymentId" type="payment_type" />
                  </td>
                  <td>
                    <el-input size="mini" :maxlength="250"  v-model="form.tmsOrderTransfer.remark" />
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
    <FeeDialog @success="(config)=>{feeConfig = config}" :dialogVisible.sync="dialogVisible" />
    <PersonDialog @success="getKeySetup" :dialogVisiblePerson.sync="dialogVisiblePerson" />
    <ManageRemarks @success="setRemark" :popVisible.sync="popVisible" />
    </div>
  </div>
</template>
<script>
// 引入事件对象
import { eventBus } from '@/eventBus'
// 工具函数
import { REGEX } from '@/utils/validate'
import { closest, getTotal, objectMerge2, parseTime, tmsMath } from '@/utils/'
// 请求接口
import { getSystemTime } from '@/api/common'
import { getAllSetting } from '@/api/company/systemSetup'
import orderManage from '@/api/operation/orderManage'
import * as preOrderManage from '@/api/operation/manage'
// 外部公用组件
import SelectType from '@/components/selectType/index'
import SelectTree from '@/components/selectTree/index'
import SelectCity from '@/components/selectCity/index'
import querySelect from '@/components/querySelect/index'
import { getSelectType } from '@/api/common'
// 当前模块子组件
import FeeDialog from './components/feePop'
import PersonDialog from './components/personSetup'
import FooterBtns from './components/btns'
import ManageRemarks from './components/remarks'
import { CreatePrintPage, CreatePrintPageEnable } from '@/utils/lodopFuncs'
import { getPrintOrderItems, getEnableLibSetting, getEnableOrderSetting } from '@/api/operation/print'
import { getOrgId } from '@/api/company/groupManage'

export default {
  components: {
    FeeDialog,
    PersonDialog,
    FooterBtns,
    SelectType,
    SelectTree,
    SelectCity,
    querySelect,
    ManageRemarks
  },
  props: {
    ispop: {
      type: Boolean,
      default: false
    },
    orderobj: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    const _this = this
    const validateOrderNum = (rule, value, callback) => {
      if (this.output.ismodify) {
        callback()
      } else {
        _this.detectOrderNum().then(isDulip => {
          if (isDulip) {
            this.showMessage('重复的订单号')
            callback(new Error())
          } else {
            callback()
          }
        })
      }
    }

    const validateMobile = (rule, value, callback) => {
      if (REGEX.MOBILE.test(value)) {
        callback()
      } else {
        this.showMessage('请输入正确的联系号码~')

        callback(new Error())
      }
    }

    // REGEX.ONLY_NUMBER_AND_LETTER
    const validateOnlyNumberAndLetter = (rule, value, callback) => {
      console.log('rule:', rule)
      if (REGEX.ONLY_NUMBER_AND_LETTER.test(value) || (rule.field === 'tmsOrderShip.shipCustomerNumber' && !value)) {
        callback()
      } else {
        this.showMessage(rule.message || '只能输入数字或者字母')

        callback(new Error())
      }
    }

    return {
      // 控制显示提示消息
      isChecked: false,
      isCheckedShow: false,
      isSaving: false,
      // 提货批次相关
      currentBatch: 1,
      // 最近编辑的批次，用来返回或者切换到下一个未保存的票
      lastEditBatch: 1,
      // 记录batch对应的list保存状态
      batchSaveList: {},
      DELIVERY_METHODS: {}, // 提货方式
      PAY_WAY: {}, // 付款方式
      activeNames: ['1'],
      'shipFieldValueInfo': {
        // 当前页面控制
        shipSn: '', // 运单号
        shipCreateTime: '',
        shipToCityName: '', // 到达城市

        shipReceiverName: '',
        shipReceiverUnit: '',
        shipReceiverMobile: '',
        'shipReceiverAddress': '', // 收货方地址
        'shipSenderAddress': '', // 发货方地址
        shipSenderName: '',
        shipSenderUnit: '',
        shipSenderMobile: '',

        cargoName: '',
        cargoAmount: '',
        cargoWeight: '',
        cargoVolume: '',

        // 系统设置页面控制
        'amountFee': '',
        'brokerageFee': '',
        'cargoPack': '',
        // "cargoVolume": "0",
        // "cargoWeight": "0",
        'deliveryFee': '',
        'handlingFee': '',
        'insuranceFee': '',
        'packageFee': '',
        'pickupFee': '',
        // "productPrice": "0",
        'shipCustomerNumber': '', // 客户单号
        'shipFromCityName': '', // 开单城市
        'shipGoodsSn': '', // 货号
        'shipReceiptSn': '', // 回单号

        'shipToOrgid': '', // 目的网点
        'shipUserid': '', // 业务员/开单人
        'volumeFee': '',
        'weightFee': ''
      },
      'shipFieldValue': {
        // 当前页面控制
        shipSn: true,
        shipCreateTime: true,
        shipToCityName: true,
        cargoName: true,
        cargoAmount: true,
        cargoWeight: false,
        cargoVolume: false,
        shipReceiverName: true,
        shipReceiverMobile: true,
        shipSenderName: true,
        shipSenderMobile: true,

        // 系统设置页面控制
        'amountFee': false,
        'brokerageFee': false,
        'cargoPack': false,
        // "cargoVolume": "0",
        // "cargoWeight": "0",
        'deliveryFee': false,
        'handlingFee': false,
        'insuranceFee': false,
        'packageFee': false,
        'pickupFee': false,
        // "productPrice": "0",
        'shipCustomerNumber': false, // 客户单号
        'shipFromCityName': false, // 开单城市
        'shipGoodsSn': false, // 货号
        'shipReceiptSn': false, // 回单号
        'shipReceiverAddress': false, // 收货方地址
        'shipReceiverId': false, // 包含发货方
        'shipSenderAddress': false, // 发货方地址
        'shipSenderId': false, // 包含收货方
        'shipToOrgid': false, // 目的网点
        'shipUserid': false, // 业务员/开单人
        'volumeFee': false,
        'weightFee': false
      },
      rules2: {},
      rules3: {
        'tmsOrderShip.shipCustomerNumber': [
          { validator: validateOnlyNumberAndLetter, trigger: 'blur', message: '请输入客户单号' }
        ],
        'tmsOrderShip.shipSn': [
          { validator: this.validateIsEmpty('运单号不能为空！') },
          { validator: validateOnlyNumberAndLetter, message: '只能输入数字跟字母' },
          { validator: validateOrderNum }
        ],
        'tmsOrderShip.shipToCityName': [
          { validator: this.validateIsEmpty('到达城市不能为空'), trigger: 'blur' }
        ],
        'sender.customerName': [
          { validator: this.validateIsEmpty('发货人不能为空') }
        ],
        'sender.customerMobile': [
          { validator: this.validateIsEmpty('发货人联系电话不能为空') },
          { validator: validateMobile, trigger: 'blur' }
        ],
        'receiver.customerName': [
          { validator: this.validateIsEmpty('收货人不能为空') }
        ],
        'receiver.customerMobile': [
          { validator: this.validateIsEmpty('收货人联系电话不能为空') },
          { validator: validateMobile, trigger: 'blur' }
        ]

      },
      // 用来判断是否有填体积或者重量
      inputWOrV: {},
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
      pickoption: {
        disabledDate(now) {
          const time = +now
          if (_this.config.shipPageFunc.shipTimeRule === '34') {
            return time > +(new Date(_this.nowTime))
          } else if (_this.config.shipPageFunc.shipTimeRule === '33') {
            const lastyear = +(new Date(_this.nowTime)) - 365 * 1 * 24 * 60 * 60 * 1000
            const comyear = +(new Date(_this.nowTime)) + 365 * 1 * 24 * 60 * 60 * 1000
            return (time < lastyear) || (time > comyear)
          }
        }
      },
      pickoption2: {
        disabledDate(now) {
          const time = +now
          // 不小于开单时间
          return time < new Date(_this.form.tmsOrderShip.createTime).getTime()
        }
      },
      // 费用其他项
      shipOther: [],
      // 用来保存货物对象的信息
      cargoObject: {},
      // 最多创建N个货品
      maxCargoLength: 15,
      // sender副本
      // 用来在提交时做对比
      sender: {},
      receiver: {},
      form: {
        // 用来保存货物列表
        cargoList: [],
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
        'tmsOrderCargoList': [
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
        'tmsOrderPre': {
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
        'tmsOrderShip': {
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
          'shipIsAbnormal': 0,
          'shipIsControll': 0,
          'shipIsSeparate': 0,
          'shipIsTransfer': 0,
          'shipIsUpdate': 0,
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
          'shipTotalFee': '0.00',
          'shipTruckIdNumber': '',
          'shipUserid': ''
        },
        'tmsOrderTransfer': {
          'arrivalMobile': '',
          'carrierId': '',
          'carrierMobile': '',
          'transferOtherFee': '',
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
        }
      },
      // 系统设置
      config: {},
      // 费用设置
      feeConfig: [],
      // 个人设置
      personConfig: {},
      // 组织信息
      orgInfo: {},
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
      tmsOrderShipId: '', // 运单保存后返回的运单ID,
      isSavePrint: false, // false-不保存并打印 true-保存并打印,
      printDataObject: {},
      cargoKey: 'init',
      resOrderId: '' // 开单成功后返回的运单id
    }
  },
  computed: {
    'transferTotalFee'() {
      return tmsMath.add(this.form.tmsOrderTransfer.transferCharge, this.form.tmsOrderTransfer.deliveryExpense, this.form.tmsOrderTransfer.transferOtherFee).result()
    },
    'theFeeConfig'() {
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
      return this.feeConfig
    }
  },
  watch: {
    // 控制第一个填写的焦点位置
    canChangeOrderNum: {
      handler(newVal) {
        /* console.log("this.$refs['tmsOrderShipshipSn'].focus()",this.config.shipNo.manualInput)
        if(this.config.shipNo.manualInput !== '1'){
          // 否则在到达城市位置
          this.$refs['tmsOrderShipshipToCityName'].$refs['myautocomplete'].focus()
        } else {
           // 允许修改单号，则在运单号位置
          this.$refs['tmsOrderShipshipSn'].focus()

        } */
      }
    },
    orderobj: {
      handler(newVal) {
        console.log('3333333333333333333')
        // 如果是弹窗才响应这个变化
        if (this.ispop) {
          this.initIndex()
        }
      },
      deep: true
    },
    transferTotalFee(newVal) {
      this.form.tmsOrderTransfer.totalCost = newVal
    },
    shipOther(newVal) {
      this.form.tmsOrderShip.shipOther = newVal.join(',')
      console.log('this.form.tmsOrderShip.shipOther:', this.form.tmsOrderShip.shipOther)
    },
    'form.tmsOrderShip.shipPrintLib': {
      handler(newVal) {
        if (newVal > 500) {
          this.form.tmsOrderShip.shipPrintLib = 500
        }
      },
      immediate: true
    },
    // 运单号修改，对应的货号也修改
    'form.tmsOrderShip.shipSn': {
      handler(newVal) {
        this.setCargoNum()
      }
    },
    'form.tmsOrderShip.shipReceiptRequire': {
      handler(newVal) {
        console.log('form.tmsOrderShip.shipReceiptRequire', newVal)
        let num = 1
        if (newVal === 80 || newVal === '80' || newVal === null) {
          num = 0
        }
        this.form.tmsOrderShip.shipReceiptNum = num
      },
      immediate: true
    },
    'form.tmsOrderShip.shipTotalFee': {
      handler(newVal) {
        if (newVal === '') {
          this.form.tmsOrderShip.shipTotalFee = '0.00'
        }
        this.setShipFee('aaaaa')
      },
      immediate: true
    },
    'form.tmsOrderShip.shipPayWay': {
      handler(newVal) {
        this.setShipFee('bbbbb')
      },
      immediate: true
    },
    '$route'(to, from) {
      if (to.path.indexOf('/operation/order/modifyOrder') !== -1 && !this.ispop) {
        this.initIndex()
      }
    }
  },
  activated() {
    // if (this.ispop) {
    this.initIndex()
    // }
  },
  deactivated() {

  },
  mounted() {
    this.loading = true

    this.initIndex()
    this.getSelectType()
    this.getShipPayWay()
    this.form.tmsOrderTransfer.paymentId = 16
  },
  methods: {
    // 公共工具函数
    showMessage(msg) {
      if (this.isChecked && !this.isCheckedShow) {
        this.isCheckedShow = true
      }
      /* if (!this.isChecked || this.isCheckedShow) {
        this.$message.error(msg)
      } */
      // 控制不提交的时候不做提示
      if (this.isCheckedShow) {
        // this.$message.error(msg)
      }
    },
    validateIsEmptyOr0(prop, index, msg = '不能为0') {
      return (rule, value, callback) => {
        value = this.form.cargoList[index][prop]
        const val = value ? parseInt(value, 10) : ''
        if (!val || val < 0) {
          this.showMessage(msg)
          callback(new Error())
        } else {
          callback()
        }
      }
    },
    validateIsEmpty2(prop, index, msg = '不能为空！') {
      return (rule, value, callback) => {
        value = this.form.cargoList[index][prop]
        if (!value) {
          this.showMessage(msg)
          callback(new Error())
        } else {
          callback()
        }
      }
    },
    validateIsEmpty(msg = '不能为空！') {
      return (rule, value, callback) => {
        if (!value) {
          this.showMessage(msg)
          callback(new Error())
        } else {
          callback()
        }
      }
    },
    validateWeightAndVolume(prop, index) {
      return (rule, value, callback) => {
        if (this.form.cargoList[index].cargoWeight || this.form.cargoList[index].cargoVolume) {
          callback()
        } else {
          console.log('index：', this.form.cargoList[index].cargoWeight, this.form.cargoList[index].cargoVolume)
          this.showMessage('体积跟重量必填其一')
          callback(new Error())
        }
      }
    },
    // 其它基础部分
    // 查找当前表单所有存在的input元素
    goNextInput(e) {
      console.log('eeeee:', e)
      const ele = e.srcElement
      const index = this.inputEles.indexOf(ele)
      const nextEle = this.findNextInput(39, index)
      if (index >= 0 && index !== (this.inputEles.lenth - 1) && nextEle) {
        e.preventDefault()
        e.stopPropagation()
        // ele.blur()
        eventBus.$emit('closepopbox')
        nextEle.focus()
      }
    },
    findAllInput() {
      const eles = Array.prototype.slice.call(document.querySelectorAll('.order-main input'))
      // 过滤掉fixed表格中的选项（当且仅当fixed中没有展示的input框时显示正确）
      // 如果有input框是fixed显示，则其被显示的顺序会有问题
      this.inputEles = eles.filter(el => {
        return closest(el, '.el-table__fixed') === null
      })
      const len = this.inputEles.length
      for (let i = 0; i < len; i++) {
        this.inputEles[i].setAttribute('taborder', i++)
      }
    },
    findNextInput(type, currentIndex) {
      const nextIndex = type === 37 ? currentIndex - 1 : currentIndex + 1
      if (nextIndex < 0 || nextIndex >= this.inputEles.length) {
        return null
      } else {
        const ele = this.inputEles[nextIndex]
        // 被禁用的跳过
        // 被隐藏不可见的跳过
        if (ele.disabled) {
          return this.findNextInput(type, nextIndex)
        } else {
          return ele
        }
      }
    },
    // 绑定左右按键
    // todo: 增加enter移到下一个
    bindTabWithArrow() {
      this.isbindtab = true
      // closest(ele, '.order-main')
      const doc = document
      const parentEle = doc.querySelector('.order-main')
      this.findAllInput()
      if (!parentEle) {
        console.log('errorr parentEle:', parentEle)
        return false
      }
      parentEle.addEventListener('keydown', (e) => {
        const ele = e.target || e.srcElement
        // 如果是左右按键，则屏蔽其默认事件以及禁止冒泡
        // 当前触发元素为input且非button时
        if (ele.nodeName === 'INPUT' && (e.keyCode === 37 || e.keyCode === 39 || e.keyCode === 13)) {
          const index = this.inputEles.indexOf(ele)
          const nextEle = this.findNextInput(e.keyCode, index)
          console.log('nextEle:', index, ele, nextEle, this.inputEles.length, this.inputEles)
          if (index >= 0 && index !== (this.inputEles.lenth - 1) && nextEle) {
            e.preventDefault()
            e.stopPropagation()
            // ele.blur()
            eventBus.$emit('closepopbox')
            nextEle.focus()
          }
        }
      }, false)
    },
    setHeader(h, { column }) {
      return h('span', {
        props: {
        },
        'class': {
          'addButton': true
        },
        on: {
          click: this.addCargoList
        }
      }, [
        h('i', {
          'class': {
            'el-icon-plus': true
          }
        })
      ])
    },
    // 各个接口
    // 为了方便缓存数据，重新包装各个接口
    // 获取预订单数据
    getPreOrder(preId) {
      return preOrderManage.getSearchOrder(preId)
    },
    // 获取运单数据
    getOrderInfo(orderId) {
      return orderManage.getOrderInfoById(orderId)
    },
    // 获取公司全部设置
    getAllSetting() {
      /* if (this.dataCache['allSeting']) {
        return Promise.resolve(this.dataCache['allSeting'])
      } else { */
      return getAllSetting({
        orgid: this.otherinfo.orgid,
        type: '',
        module: 'order'
      })
      // }
    },
    // 获取网点信息
    getOrgId() {
      return getOrgId(this.otherinfo.orgid).then(res => {
        return res.data || {}
      }).catch((err) => {
        this.loading = false
        this._handlerCatchMsg(err)
      })
    },
    // 获取个人设置
    getPersonSetting(nocache) {
      /* if (!nocache && this.dataCache['personSeting']) {
        return Promise.resolve(this.dataCache['personSeting'])
      } else { */
      return orderManage.getPersonalSetup(this.otherinfo.id)
      // }
    },
    // 获取货物设置
    getCargoSetting() {
      /* if (this.dataCache['cargoSeting']) {
        return Promise.resolve(this.dataCache['cargoSeting'])
      } else { */
      return orderManage.getCargoSetting(this.otherinfo.orgid)
      // }
    },
    // 获取基本设置信息
    getBaseSetting() {
      return Promise.all([this.getAllSetting(), this.getCargoSetting(), this.getPersonSetting(), orderManage.getCreateOrderDate(), this.getOrgId()]).then(dataArr => {
        // 获取全局设置
        this.config = dataArr[0]
        // 获取费用设置
        this.feeConfig = dataArr[1]
        // 获取个人设置
        this.personConfig = dataArr[2]
        // 获取后台时间
        this.nowTime = dataArr[3]
        // 获取网点信息
        this.orgInfo = dataArr[4]
        console.log('get INIT Infomation::', dataArr)
      }).catch((err) => {
        this.loading = false
        this._handlerCatchMsg(err)
      })
    },
    // 设置出发城市
    setOrgCity() {
      this.form.tmsOrderShip.shipFromCityName = this.orgInfo.city
    },
    // 设置必填项
    setRequired() {
      const obj = this.config.shipPageFunc.shipFieldValue
      for (const i in obj) {
        this.shipFieldValue[i] = obj[i] === '1'
      }
    },
    // 初始化各个表单的情况
    init() {
      this.setRequired()
      this.setOrderNum()
      this.setCargoNum()
      this.setOrderDate()
      this.setOrderFee()
      this.setOrderTransfer()
      this.setOrgCity()
      // 当为修改运单时，不设置默认值
      if (!this.output.isOrder) {
        this.setDefaultValue()
      }
      const _this = this
      setTimeout(() => {
        // 避免重复绑定
        if (!_this.isbindtab) {
          _this.bindTabWithArrow()
        }
      }, 1000)
    },
    // 设置运单号规则
    setOrderNum() {
      // 允许手动输入
      let obj
      if (this.config.shipNo.manualInput !== '1') {
        obj = this.$refs['tmsOrderShipshipToCityName']
        if (obj) {
          obj = obj.$refs['myautocomplete']
        }
        // 不允许修改系统生成的单号
        if (this.config.shipNo.systemNumberImmutable === '1') {
          this.canChangeOrderNum = false
        }
        // 非修改运单，需要生成运单信息
        if (!this.output.isOrder) {
          orderManage.getShipSn(this.otherinfo.orgid).then(res => {
            this.form.tmsOrderShip.shipSn = res.data
          }).catch((err) => {
            this.loading = false
            this._handlerCatchMsg(err)
          })
        }
      } else {
        obj = this.$refs['tmsOrderShipshipSn']
      }
      if (obj && this.output.iscreate) {
        obj.focus()
      }
    },
    // 设置货号规则
    setCargoNum() {
      // 允许手动输入
      if (this.config.cargoNo.manualInput === '1') {

      } else {
        // 不允许修改系统生成的单号
        if (this.config.cargoNo.systemNumberNotAllowUpdate === '1') {
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
        if (!this.output.isOrder &&　this.form.tmsOrderShip.shipSn) {
          orderManage.postGenerateGoodsSn({
            'tmsOrderShip': {
              'shipSn': this.form.tmsOrderShip.shipSn
            },
            'tmsOrderCargoList': this.form.cargoList.map(el => {
              const a = {}
              a.cargoAmount = parseInt(el.cargoAmount1, 10) || parseInt(el.cargoAmount, 10) || 0
              return a
            })
          }).then(res => {
            this.form.tmsOrderShip.shipGoodsSn = res.data
          }).catch((err) => {
            this.loading = false
            this._handlerCatchMsg(err)
          })
        }
      }
    },
    // 设置运单日期规则
    setOrderDate() {
      this.form.tmsOrderShip.createTime = this.nowTime

      if (this.config.shipPageFunc.shipTimeRule === '35') {
        this.canChangeOrderDate = false
      } else if (this.config.shipPageFunc.shipTimeRule === '34') {

      } else if (this.config.shipPageFunc.shipTimeRule === '33') {

      }
      if (!this.output.isOrder) {
        this.form.tmsOrderTransfer.transferTime = this.nowTime
      }
    },
    // 选择出发城市
    selectFromCity(item, city) {
      console.log('selectFromCity:', item, city)
      if (item) {
        this.form.tmsOrderShip.shipFromCityName = item.longAddr
      }/*  else {
        this.form.tmsOrderShip.shipFromCityCode = city || ''
        this.form.tmsOrderShip.shipFromCityName = city || ''
      } */
    },
    // 选择到达城市
    selectToCity(item, city) {
      if (item) {
        this.form.tmsOrderShip.shipToCityName = item.longAddr
      }
    },
    // 设置费用列
    setOrderFee() {
      /* // 处理返回的数据，将fixed的列排在前面，剔除没有被选中的列
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
      }) */
      if (this.output.iscreate) {
        this.$set(this.form.cargoList, 0, objectMerge2({}, this.cargoObject))
        // 重新渲染，避免复用原有结构造成渲染出错
        this.cargoKey = new Date().getTime()
        // this.$set(this.form.cargoList, 1, objectMerge2(this.cargoList[1], this.cargoObject))
        console.log('theFeeConfig:', this.cargoObject)
        console.log('this.shipFieldValue::', this.shipFieldValue)
      } else {
        // 如果是本身有数据

      }
    },
    // 从弹窗设置备注
    setRemark(remarks) {
      console.log('remarks:', remarks)
      const remark = this.form.tmsOrderShip.shipRemarks
      this.form.tmsOrderShip.shipRemarks = remark ? remark + ', ' + remarks : remarks
    },
    // 设置中转表单
    setOrderTransfer() {
      this.shouldInputTransfer = this.personConfig.shipDefault.openOrderAndTransferInfo === '1'
    },
    // 设置默认值
    setDefaultValue() {
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
    detectOrderNum() {
      // 有值才去判断
      if (!this.form.tmsOrderShip.shipSn) {
        return new Promise(r => {
          r(true)
        })
      } else {
        return orderManage.getJudgeShipSn(this.form.tmsOrderShip.shipSn, this.otherinfo.orgid).then(res => {
          if (res.data >= 1) {
            // 有重复
            return true
          } else {
            return false
          }
        }).catch((err) => {
          this.loading = false
          this._handlerCatchMsg(err)
        })
      }
    },
    /**
     * 初始化各类情况
     */
    initIndex() {
      // 1.判断有无运单id
      // 1.1 判断是否为修改
      // 1.1.1 判断是否已结算，设置可修改部分
      // 1.1.1 如果为完全不能修改，则限制可修改部分
      // 1.2 判断是否为查看
      // 1.2.1 如果有运单id，但无操作参数，则表示为查看运单
      // 1.3 如果找不到订单，则提示用户并退回到运单管理页面
      // 2.判断有无订单id
      // 2.1 订单有数据且可关联
      // 2.2 订单有数据但不能关联→填充订单数据到页面，但不关联
      // 2.3 订单无数据，提示用户并退回到订单页面
      // 3.判断是否有提货批次信息
      // 3.1 有批次信息且可关联
      // 3.2 有批次信息不可关联，提示并回退到提货管理(删除状态)
      // 3.3 无批次信息，提示并回退到提货管理
      // 4.1 正常的创建运单
      // 5. 从弹窗过来
      this.loading = true
      this.reset()
      this.getBaseSetting().then(res => {
        console.log('base setting info:', res, this.$route)
        let param
        if (this.ispop) {
          console.log('pop create order:', this.orderobj)
          param = this.orderobj
        } else {
          param = this.$route.query
        }

        if (param.orderid) {
          this.output.orderid = param.orderid
          this.output.isOrder = true
          this.initOrder()
        } else if (param.preid) {
          this.output.preId = param.preid
          this.output.isPreOrder = true
          this.initPreOrder()
        } else if (param.batchid) {
          // 此batchid实为batchnumber
          this.output.batchid = param.batchid
          // 如果传过来的非正常字符，则默认为1
          // 如果传过来的数字大于10，则设置为10
          this.output.ordernum = Math.min(parseInt(param.ordernum, 10) || 1, 10)
          this.output.isbatch = true
          this.output.batchinfo = param.batchobj
          this.initBatch()
        } else {
          this.output.iscreate = true
          this.initCreate()
        }
      }).catch(err => {
        console.log('base setting error:', err)
        this.$message.error('获取信息失败：' + err.text + ' 请尝试重新刷新页面。')
      })
    },
    // 创建订单
    initCreate() {
      this.init()
      this.loading = false
    },
    // 初始化运单
    initOrder() {
      this.output.ismodify = true

      const errFn = () => {
        this.$confirm('查无此运单信息：' + this.output.orderid, '提示', {
          confirmButtonText: '返回运单列表页',
          cancelButtonText: '创建运单',
          type: 'warning'
        }).then(() => {
          this.eventBus.$emit('replaceCurrentView', '/operation/order/orderManage')
        }).catch(() => {
          this.eventBus.$emit('replaceCurrentView', '/operation/order/createOrder')
        })
      }
      this.getOrderInfo(this.output.orderid).then(res => {
        this.orderData = res.data
        // 找到运单信息
        this.init()
        this.setOrderData(res.data)
        this.modifyOrder()
        this.loading = false
      }).catch(err => {
        console.log('initOrder err:', err)
        errFn()
      })
    },
    // 修改运单
    modifyOrder() {

    },
    // 从订单创建运单
    initPreOrder() {
      const errFn = () => {
        this.$confirm('查无此订单信息：' + this.output.preId, '提示', {
          confirmButtonText: '返回订单列表页',
          cancelButtonText: '创建运单',
          type: 'warning'
        }).then(() => {
          this.eventBus.$emit('replaceCurrentView', '/operation/order/manage')
        }).catch(() => {
          this.eventBus.$emit('replaceCurrentView', '/operation/order/createOrder')
        })
      }

      return this.getPreOrder(this.output.preId).then(res => {
        this.form.tmsOrderPre = res.data
        this.init()
        this.setPreOrder()
        if (this.form.tmsOrderPre.orderStatus !== 213) {
          this.$message.warning('此订单不是 非受理 状态，将不能关联创建的运单。')
          this.form.tmsOrderPre = {}
          this.output.isPreOrder = false
        }
        this.loading = false
      }).catch(err => {
        errFn(err)
      })
    },
    // 从提货创建运单
    getBatchInfo(batchid) {
      if (this.ispop) {
        // 如果是弹窗页面，可以直接获取到信息
        return Promise.resolve(this.output.batchinfo)
      } else {
        // 如果非弹窗，需要先请求后台接口拿数据
        return orderManage.getBatchInfo(batchid).then(res => {
          if (res.data) {
            return res.data
          } else {
            return Promise.reject('查无此提货信息~~~~')
          }
        }).catch((err) => {
          this.loading = false
          this._handlerCatchMsg(err)
        })
      }
    },
    initBatch() {
      const errFn = () => {
        this.$confirm('查无此提货批次信息：' + this.output.batchid, '提示', {
          confirmButtonText: '返回提货列表页',
          cancelButtonText: '关闭',
          type: 'warning'
        }).then(() => {
          this.eventBus.$emit('replaceCurrentView', '/operation/order/pickUp')
        }).catch(() => {
          // 弹窗页则关闭弹窗
          if (this.ispop) {
            this.eventBus.$emit('hideCreateOrder')
          } else {
          // 关闭标签页
            this.eventBus.$emit('closeCurrentView')
          }
        })
      }

      this.getBatchInfo(this.output.btachid).then(data => {
        console.log('batch info：', this.output.batchinfo)

        this.output.batchinfo = data
        // 先重置原有的信息
        this.batchSaveList = {}
        for (let i = 0; i < this.output.ordernum; i++) {
          this.batchSaveList[i + 1] = {
            issave: false,
            data: {},
            ischange: false
          }
        }

        this.gotoBatch(this.currentBatch)
      }).catch(err => {
        console.log('getBatchInfo error:', err)
        errFn()
      })
    },
    // 设置batch信息
    setBatchInfo(data) {
      if (this.output.ismodify) {
        // 当为修改时，当作运单修改
        this.setOrderData(data)
      } else {
        data = this.output.batchinfo
        // 城市信息
        this.form.tmsOrderShip.shipToCityCode = data.toCityCode
        this.toCityName = data.toCityName
        // 收发货人信息
        this.form.sender.customerType = 1
        this.form.sender.customerName = data.customerName
        this.form.sender.customerMobile = data.customerMobile
        this.form.sender.detailedAddress = data.detailedAddress
        this.form.sender.customerId = data.senderId
        // 设置货物信息
        const cargoData = {}
        for (const i in this.cargoObject) {
          if (typeof data[i] !== 'undefined') {
            // cargoData[i] = data[i]
          } else {
            cargoData[i] = this.cargoObject[i]
          }
          if (i === 'cargoName') {
            cargoData[i] = data.pickupName
          }
          if (i === 'cargoAmount') {
            cargoData[i] = data.pickupAmount
          }
          if (i === 'cargoWeight') {
            cargoData[i] = data.pickupWeight
          }
          if (i === 'cargoVolume') {
            cargoData[i] = data.pickupVolume
          }
          if (i === 'shipFee') {
            cargoData[i] = data.carriage
          }
        }
        // pickupBatchNumber
        // id
        // truckIdNumber
        this.form.tmsOrderShip.shipTruckIdNumber = data.truckIdNumber
        this.form.tmsOrderShip.shipBatchId = data.id

        this.$set(this.form.cargoList, 0, cargoData)

        // 其它设置
        this.form.tmsOrderShip.shipPayWay = data.payMethod
        this.form.tmsOrderShip.shipRemarks = data.remark
      }

      console.log('setBatchInfo data:', data)
    },
    gotoBatch(i) {
      this.loading = true
      // 判断此票是修改还是创建
      if (this.batchSaveList[i].issave) {
        this.output.ismodify = true
      } else {
        this.output.ismodify = false
      }
      // 重新设置界面
      this.init()
      // 填充数据
      this.setBatchInfo(this.batchSaveList[i].data)
      this.loading = false
    },
    // 切换批次列表
    changeBatch(i) {
      // 当点击当前选中项时，不做处理
      if (i === this.currentBatch) {
        return false
      }
      // 如果当前项未保存，则其为最近的未保存可编辑项
      if (!this.batchSaveList[this.currentBatch].issave) {
        this.lastEditBatch = this.currentBatch
      }

      // 检查目标票是否被保存，已保存才能切换过去
      if (this.batchSaveList[i].issave) {
        // 当切换后，将其对应的数据保存一份，方便返回继续填写
        if (!this.batchSaveList[this.currentBatch].issave) {
          // 只有未保存项，才缓存其数据
          // 为什么？不知道
          // 暂时不做取出缓存回显的操作，此操作与修改运单有冲突
          this.batchSaveList[this.currentBatch].data = objectMerge2({}, this.form)
        }
        // 执行跳转
        this.currentBatch = i
        this.gotoBatch(i)
      } else if (this.batchSaveList[this.currentBatch].issave) {
        // 当切换到最近的编辑项时，才执行跳转
        if ((i === this.lastEditBatch) || (this.lastEditBatch === this.currentBatch)) {
          this.currentBatch = i
          this.lastEditBatch = i
          this.gotoBatch(i)
        } else {
          this.$message.warning('第' + this.lastEditBatch + '单还没保存，请先保存！')
        }
      } else {
        this.$message.warning('第' + this.currentBatch + '单还没保存，请先保存！')
      }
    },
    // 跳转到下一个可编辑的票
    goNextEditBatch() {
      // 如果当前票已经是最后一票了，则提示用户去不去运单页面
      if (this.currentBatch >= this.output.ordernum) {
        this.$confirm('已经完成全票填写，下一步操作？', '提示', {
          confirmButtonText: '查看运单列表页',
          cancelButtonText: '关闭',
          type: 'warning'
        }).then(() => {
          if (this.ispop) {
            this.eventBus.$emit('hideCreateOrder')
          }
          this.eventBus.$emit('replaceCurrentView', '/operation/order/orderManage')
        }).catch(() => {
          // 弹窗页则关闭弹窗
          if (this.ispop) {
            this.eventBus.$emit('hideCreateOrder')
          } else {
          // 关闭标签页
            this.eventBus.$emit('closeCurrentView')
          }
        })
      } else {
        if (this.currentBatch === this.lastEditBatch) {
          this.changeBatch(this.lastEditBatch + 1)
        } else {
          this.changeBatch(this.lastEditBatch)
        }
      }
    },
    // 回填运单信息
    // 将null值转为空值
    setOrderData(data) {
      data.tmsOrderShip = data.tmsOrderShipInfo || data.tmsOrderShip || {}
      // 设置运单信息
      for (const i in this.form.tmsOrderShip) {
        this.form.tmsOrderShip[i] = data.tmsOrderShip[i] === null ? '' : data.tmsOrderShip[i]
      }
      this.form.tmsOrderShip.createTime = parseTime(this.form.tmsOrderShip.createTime)
      // 设置城市名称
      this.fromCityName = data.tmsOrderShip.shipFromCityName
      this.toCityName = data.tmsOrderShip.shipToCityName
      this.form.tmsOrderShip.shipFromCityName = data.tmsOrderShip.shipFromCityName
      this.form.tmsOrderShip.shipToCityName = data.tmsOrderShip.shipToCityName
      console.log('data.tmsOrderShip:::', data.tmsOrderShip, this.form.tmsOrderShip)
      // 设置货物信息
      this.form.cargoList = data.tmsOrderCargoList
      // this.$set(this.form.cargoList, data.tmsOrderCargoList)
      // 设置收发货人信息
      if (data.customerList[0]) {
        for (const i in this.form.sender) {
          this.sender[i] = data.customerList[0][i] === null ? '' : data.customerList[0][i]
          this.form.sender[i] = data.customerList[0][i] === null ? '' : data.customerList[0][i]
        }
      }
      if (data.customerList[1]) {
        for (const i in this.form.receiver) {
          this.receiver[i] = data.customerList[1][i] === null ? '' : data.customerList[1][i]
          this.form.receiver[i] = data.customerList[1][i] === null ? '' : data.customerList[1][i]
        }
      }
      // 回显控货
      this.shipOther = this.form.tmsOrderShip.shipOther.split(',') || []
      console.log('回显控货:', this.shipOther)

      this.form.customerList = data.customerList || []
      console.log('setOrderInfo:', data, this.form)
      // 设置中转信息
      // 设置运单信息
      if (data.tmsOrderTransfer) {
        for (const i in this.form.tmsOrderTransfer) {
          this.form.tmsOrderTransfer[i] = data.tmsOrderTransfer[i] === null ? '' : data.tmsOrderTransfer[i]
        }
        this.form.tmsOrderTransfer.transferTime = parseTime(this.form.tmsOrderTransfer.transferTime)
      }

      // 处理下回填的多笔付数据
      // if (parseInt(this.form.tmsOrderShip.shipPayWay, 10) === 104) {
      setTimeout(() => {
        this.form.tmsOrderShip.shipNowpayFee = data.tmsOrderShipInfo.shipNowpayFee
        this.form.tmsOrderShip.shipArrivepayFee = data.tmsOrderShipInfo.shipArrivepayFee
        this.form.tmsOrderShip.shipMonthpayFee = data.tmsOrderShipInfo.shipMonthpayFee
        this.form.tmsOrderShip.shipReceiptpayFee = data.tmsOrderShipInfo.shipReceiptpayFee
      }, 300)
      // }
    },
    // 回填订单信息
    setPreOrder() {
      // 将数据回填到页面上
      // 网点信息
      const data = this.form.tmsOrderPre
      // 格式化下数据
      for (const i in data) {
        data[i] = data[i] === null ? '' : data[i]
      }
      this.form.tmsOrderShip.shipFromOrgid = data.orderFromOrgid
      this.form.tmsOrderShip.shipToOrgid = data.orderToOrgid
      // 城市信息
      this.form.tmsOrderShip.shipFromCityCode = data.orderFromCityCode
      this.form.tmsOrderShip.shipToCityCode = data.orderToCityCode
      this.form.tmsOrderShip.shipFromCityName = data.orderFromCityName
      this.form.tmsOrderShip.shipToCityName = data.orderToCityName
      // 收发货人信息
      this.form.sender.customerUnit = data.senderUnit
      this.form.sender.customerType = 1
      this.form.sender.customerName = data.senderName
      this.form.sender.customerMobile = data.senderMobile
      this.form.sender.detailedAddress = data.senderAddr
      this.form.sender.customerId = data.orderSenderId

      this.form.receiver.customerUnit = data.receiverUnit
      this.form.receiver.customerType = 2
      this.form.receiver.customerName = data.receiverName
      this.form.receiver.customerMobile = data.receiverMobile
      this.form.receiver.detailedAddress = data.receiverAddr
      this.form.receiver.customerId = data.orderReceiverId

      // 设置货物信息
      const cargoData = {}
      for (const i in this.cargoObject) {
        if (typeof data[i] !== 'undefined') {
          cargoData[i] = data[i]
        } else {
          cargoData[i] = this.cargoObject[i]
        }
        if (i === 'agencyFund') {
          cargoData[i] = data.agencyFund
        }
        if (i === 'commissionFee') {
          cargoData[i] = data.commissionFee
        }
        if (i === 'productPrice') {
          cargoData[i] = data.productPrice
        }
        if (i === 'shipFee') {
          cargoData[i] = data.shipFee
        }
        if (i === 'description') {
          cargoData[i] = data.description
        }
      }
      this.$set(this.form.cargoList, 0, cargoData)

      // 其它设置
      this.form.tmsOrderShip.shipEffective = data.orderEffective
      this.form.tmsOrderShip.shipPayWay = data.orderPayWay
      this.form.tmsOrderShip.shipRemarks = data.orderRemarks

      console.log('preOrderInfo:', this.form)
    },
    /** 收货人/发货人 */
    setSender(item, type) {
      type = type || 'sender'
      if (item) {
        this.form[type].customerId = item.customerId || ''
        this.form[type].customerType = type === 'sender' ? 1 : 2
        this.form[type].customerUnit = item.customerUnit
        this.form[type].customerName = item.customerName
        this.form[type].customerMobile = item.customerMobile
        this.form[type].detailedAddress = item.detailedAddress
        this[type] = item
      }
    },
    setReceiver(item) {
      this.setSender(item, 'receiver')
    },
    /** 货品列表 */
    addCargoList() {
      if (this.form.cargoList.length < this.maxCargoLength) {
        this.form.cargoList.push(objectMerge2({}, this.cargoObject))
      }
      // 需要有个更新渲染时间
      setTimeout(() => {
        this.findAllInput()
      }, 100)
    },
    deleteCargoList(index) {
      this.form.cargoList.splice(index, 1)
      // 需要有个更新渲染时间
      setTimeout(() => {
        this.findAllInput()
      }, 100)
    },
    detectCargoNumChange(index, name, event) {
      this.form.cargoList[index][name] = event.target.value
      this.setCargoNum()
    },
    // 修改货品列表
    changeFee(index, name, event) {
      this.form.cargoList[index][name] = event.target.value
      // 修改时计算总运费
      this.getTotalFee()
    },
    // 其他表单
    getBatch(item) {
      this.form.tmsOrderShip.shipTruckIdNumber = item.truckIdNumber || ''
    },
    // 获取总运费
    getTotalFee() {
      let total = 0
      this.form.cargoList.forEach(el => {
        // 匹配系统设置里的运费合计规则
        for (const i in el) {
          if (this.config.shipFee[i] === '1' && el[i] !== null) {
            total = tmsMath.add(total, el[i]).result()
          }
        }
      })
      this.form.tmsOrderShip.shipTotalFee = parseFloat(total, 10).toFixed(2)
    },
    // 格式化运费输入框
    formatShipFee() {
      this.form.tmsOrderShip.shipNowpayFee = parseFloat(this.form.tmsOrderShip.shipNowpayFee, 10) ? parseFloat(this.form.tmsOrderShip.shipNowpayFee, 10).toFixed(2) : '0.00'
      this.form.tmsOrderShip.shipArrivepayFee = parseFloat(this.form.tmsOrderShip.shipArrivepayFee, 10) ? parseFloat(this.form.tmsOrderShip.shipArrivepayFee, 10).toFixed(2) : '0.00'
      this.form.tmsOrderShip.shipMonthpayFee = parseFloat(this.form.tmsOrderShip.shipMonthpayFee, 10) ? parseFloat(this.form.tmsOrderShip.shipMonthpayFee, 10).toFixed(2) : '0.00'
      this.form.tmsOrderShip.shipReceiptpayFee = parseFloat(this.form.tmsOrderShip.shipReceiptpayFee, 10) ? parseFloat(this.form.tmsOrderShip.shipReceiptpayFee, 10).toFixed(2) : '0.00'
    },
    // 智能填充运费
    setOtherFee(type) {
      const oldVal = parseFloat(this.form.tmsOrderShip[type], 10) || 0
      // form.tmsOrderShip.shipMonthpayFee
      // 如果本身已经有值了，则不参与计算
      if ((oldVal === 0 || oldVal === '') && this.form.tmsOrderShip.shipTotalFee > 0) {
        const otherShipFee = tmsMath.sub(this.form.tmsOrderShip.shipTotalFee, this.form.tmsOrderShip.shipNowpayFee, this.form.tmsOrderShip.shipArrivepayFee, this.form.tmsOrderShip.shipMonthpayFee, this.form.tmsOrderShip.shipReceiptpayFee).result()

        if (otherShipFee > 0) {
          this.form.tmsOrderShip[type] = otherShipFee
        }
      }
    },
    setShipFee(flag) {
      const key = parseInt(this.form.tmsOrderShip.shipPayWay, 10)
      this.shipNowpayFeeDisabled = true
      this.shipArrivepayFeeDisabled = true
      this.shipReceiptpayFeeDisabled = true
      this.shipMonthpayFeeDisabled = true

      this.form.tmsOrderShip.shipNowpayFee = '0.00'
      this.form.tmsOrderShip.shipArrivepayFee = '0.00'
      this.form.tmsOrderShip.shipMonthpayFee = '0.00'
      this.form.tmsOrderShip.shipReceiptpayFee = '0.00'
      // 处理切换为免费后的计算逻辑
      if (key === 103) {
        this.form.tmsOrderShip.shipTotalFee = 0
      } else {
        this.getTotalFee()
      }
      console.log('this.form.tmsOrderShip.shipTotalFee:', this.form.tmsOrderShip.shipTotalFee)
      switch (key) {
        // 现付
        case 76:
          this.form.tmsOrderShip.shipNowpayFee = this.form.tmsOrderShip.shipTotalFee
          // this.shipNowpayFeeDisabled = false
          break
        // 到付
        case 77:
          this.form.tmsOrderShip.shipArrivepayFee = this.form.tmsOrderShip.shipTotalFee
          // this.shipArrivepayFeeDisabled = false
          break
        // 月结
        case 78:
          this.form.tmsOrderShip.shipMonthpayFee = this.form.tmsOrderShip.shipTotalFee
          // this.shipMonthpayFeeDisabled = false
          break
        // 回单付
        case 79:
          this.form.tmsOrderShip.shipReceiptpayFee = this.form.tmsOrderShip.shipTotalFee
          // this.shipReceiptpayFeeDisabled = false
          break
        // 免费
        case 103:

          this.form.tmsOrderShip.shipTotalFee = '0.00'
          break
        // 多笔付
        case 104:
          this.shipNowpayFeeDisabled = false
          this.shipArrivepayFeeDisabled = false
          this.shipReceiptpayFeeDisabled = false
          this.shipMonthpayFeeDisabled = false

          this.form.tmsOrderShip.shipNowpayFee = this.form.tmsOrderShip.shipTotalFee

          /* this.form.tmsOrderShip.shipNowpayFee = tmsMath.div(this.form.tmsOrderShip.shipTotalFee, 2).result()

          this.form.tmsOrderShip.shipArrivepayFee = tmsMath.div(this.form.tmsOrderShip.shipTotalFee, 2).result()

          if (tmsMath.add(this.form.tmsOrderShip.shipNowpayFee, this.form.tmsOrderShip.shipArrivepayFee).result() > this.form.tmsOrderShip.shipTotalFee) {
            this.form.tmsOrderShip.shipNowpayFee = tmsMath.sub(this.form.tmsOrderShip.shipNowpayFee, 0.01).result()
          } */

          break
      }
    },
    // 中转信息
    setOddNumbers(val) {
      this.form.tmsOrderTransfer.oddNumbers = val.replace(/\s/g, '')
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
    reset(shouldReinputDefault) {
      // 缓存不可修改、默认数据
      const copy = objectMerge2({}, this.form)

      this.$refs['ruleForm'].resetFields()
      this.form.cargoList = []
      this.form.sender = this.resetObj(this.form.sender)
      this.form.receiver = this.resetObj(this.form.receiver)
      this.form.customerList = []
      this.form.tmsOrderCargoList = []
      this.sender = {}
      this.receiver = {}
      this.form.tmsOrderShip = this.resetObj(this.form.tmsOrderShip)
      this.form.tmsOrderShip.shipIsAbnormal = 0
      this.form.tmsOrderShip.shipIsControll = 0
      this.form.tmsOrderShip.shipIsSeparate = 0
      this.form.tmsOrderShip.shipIsTransfer = 0
      this.form.tmsOrderShip.shipIsUpdate = 0
      this.form.tmsOrderShip.shipTotalFee = '0.00'
      this.form.tmsOrderTransfer = this.resetObj(this.form.tmsOrderTransfer)

      // 回填默认的数据
      if (shouldReinputDefault) {
        this.form.tmsOrderShip.shipSn = copy.tmsOrderShip.shipSn

        this.form.tmsOrderShip.createTime = copy.tmsOrderShip.createTime

        this.form.tmsOrderShip.shipFromOrgid = copy.tmsOrderShip.shipFromOrgid

        this.form.tmsOrderShip.shipDeliveryMethod = copy.tmsOrderShip.shipDeliveryMethod

        this.form.tmsOrderShip.shipGoodsSn = copy.tmsOrderShip.shipGoodsSn

        this.form.tmsOrderShip.shipPayWay = copy.tmsOrderShip.shipPayWay

        this.form.tmsOrderTransfer.transferTime = copy.tmsOrderTransfer.transferTime
        // this.$set(this.form.cargoList, 0, objectMerge2(this.cargoList[0], this.cargoObject))
        this.$set(this.form.cargoList, 0, objectMerge2({}, this.cargoObject))
        this.cargoKey = Math.random()
        this.setDefaultValue()
      }

      // 多票相关的数据也需要清空
      this.currentBatch = 1
      this.lastEditBatch = 1
      this.batchSaveList = {}
      // this.setOrderDate()

      this.output = {}
    },
    /** * 提交表单 */
    checkshipSn() {
      const value = this.form.tmsOrderShip.shipSn
      let msg = ''
      if (!value) {
        msg = '运单号不能为空'
      } else if (REGEX.ONLY_NUMBER_AND_LETTER.test(value) === false) {
        msg = '运单号只能输入数字或者字母'
      }
      this.shipFieldValueInfo.shipSn = msg
      if (msg) {
        this.$message.error(msg)
        this.$refs.tmsOrderShipshipSn.focus()
      }

      return msg
    },
    checkshipFromCityName(m) {
      const value = this.form.tmsOrderShip.shipFromCityName
      let msg = ''
      if (!value) {
        msg = '出发城市不能为空'
      }
      this.shipFieldValueInfo.shipFromCityName = msg
      if (msg && !m) {
        this.$message.error(msg)
        this.$refs['tmsOrderShipFromCityName'].$refs['myautocomplete'].focus()
      } else {
        msg = m
      }
      return msg
    },
    checkshipToCityName(m) {
      const value = this.form.tmsOrderShip.shipToCityName
      let msg = ''
      if (!value) {
        msg = '到达城市不能为空'
      }
      this.shipFieldValueInfo.shipToCityName = msg
      if (msg && !m) {
        this.$message.error(msg)
        this.$refs['tmsOrderShipshipToCityName'].$refs['myautocomplete'].focus()
      } else {
        msg = m
      }
      return msg
    },
    checkshipToOrgid(m) {
      const value = this.form.tmsOrderShip.shipToOrgid
      let msg = ''
      if (!value) {
        msg = '请选择目的网点'
      }
      this.shipFieldValueInfo.shipToOrgid = msg
      if (msg && !m) {
        this.$message.error(msg)
        this.$refs['tmsOrderShipToOrgid'].$refs['myautocomplete'].focus()
      } else {
        msg = m
      }
      return msg
    },
    checkshipGoodsSn(m) {
      const value = this.form.tmsOrderShip.shipGoodsSn
      let msg = ''
      if (!value) {
        msg = '货号不能为空'
      }
      this.shipFieldValueInfo.shipGoodsSn = msg
      if (msg && !m) {
        this.$message.error(msg)
        this.$refs['tmsOrderShipGoodsSn'].focus()
      } else {
        msg = m
      }
      return msg
    },
    checkshipSenderUnit(m) {
      const value = this.form.sender.customerUnit
      let msg = ''
      if (!value) {
        msg = '发货人不能为空'
      }
      this.shipFieldValueInfo.shipSenderUnit = msg
      if (msg && !m) {
        this.$message.error(msg)
        this.$refs['tmsOrdercustomerUnit'].$refs['myautocomplete'].focus()
      } else {
        msg = m
      }
      return msg
    },
    checkshipSenderName(m) {
      const value = this.form.sender.customerName
      let msg = ''
      if (!value) {
        msg = '发货人不能为空'
      }
      this.shipFieldValueInfo.shipSenderName = msg
      if (msg && !m) {
        this.$message.error(msg)
        this.$refs['tmsOrdercustomerName'].$refs['myautocomplete'].focus()
      } else {
        msg = m
      }
      return msg
    },
    checkshipSenderMobile(m) {
      const value = this.form.sender.customerMobile
      let msg = ''
      if (!value) {
        msg = '发货人电话不能为空'
      }
      this.shipFieldValueInfo.shipSenderMobile = msg
      if (msg && !m) {
        this.$message.error(msg)
        this.$refs['tmsOrdercustomerMobile'].$refs['myautocomplete'].focus()
      } else {
        msg = m
      }
      return msg
    },
    checkshipSenderAddress(m) {
      const value = this.form.sender.detailedAddress
      let msg = ''
      if (!value) {
        msg = '发货人地址不能为空'
      }
      this.shipFieldValueInfo.shipSenderAddress = msg
      if (msg && !m) {
        this.$message.error(msg)
        this.$refs['tmsOrderdetailedAddress'].$refs['myautocomplete'].focus()
      } else {
        msg = m
      }
      return msg
    },
    checkshipReceiverUnit(m) {
      const value = this.form.receiver.customerUnit
      let msg = ''
      if (!value) {
        msg = '收货方不能为空'
      }
      this.shipFieldValueInfo.shipReceiverUnit = msg
      if (msg && !m) {
        this.$message.error(msg)
        this.$refs['tmsOrdershipReceiverUnit'].$refs['myautocomplete'].focus()
      } else {
        msg = m
      }
      return msg
    },
    checkshipReceiverName(m) {
      const value = this.form.receiver.customerName
      let msg = ''
      if (!value) {
        msg = '收货人不能为空'
      }
      this.shipFieldValueInfo.shipReceiverName = msg
      if (msg && !m) {
        this.$message.error(msg)
        this.$refs['tmsOrdershipReceiverName'].$refs['myautocomplete'].focus()
      } else {
        msg = m
      }
      return msg
    },
    checkshipReceiverMobile(m) {
      const value = this.form.receiver.customerMobile
      let msg = ''
      if (!value) {
        msg = '收货人电话不能为空'
      }
      this.shipFieldValueInfo.shipReceiverMobile = msg
      if (msg && !m) {
        this.$message.error(msg)
        this.$refs['tmsOrdershipReceiverMobile'].$refs['myautocomplete'].focus()
      } else {
        msg = m
      }
      return msg
    },
    checkshipReceiverAddress(m) {
      const value = this.form.receiver.detailedAddress
      let msg = ''
      if (!value) {
        msg = '收货人地址不能为空'
      }
      this.shipFieldValueInfo.shipReceiverAddress = msg
      if (msg && !m) {
        this.$message.error(msg)
        this.$refs['tmsOrdershipReceiverAddress'].$refs['myautocomplete'].focus()
      } else {
        msg = m
      }
      return msg
    },
    checkcargoName(m) {
      const value = this.form.cargoList[0].cargoName
      let msg = ''
      if (!value) {
        msg = '货品名不能为空'
      }
      this.shipFieldValueInfo.cargoName = msg
      if (msg && !m) {
        this.$message.error(msg)
        this.$refs['tmsOrdercargoName'][1].$refs['myautocomplete'].focus()
      } else {
        msg = m
      }
      return msg
    },
    checkcargoAmount(m) {
      const value = this.form.cargoList[0].cargoAmount
      let msg = ''
      if (!value) {
        msg = '货品件数不能为空'
      }
      this.shipFieldValueInfo.cargoAmount = msg
      if (msg && !m) {
        this.$message.error(msg)
        this.$refs['tmsOrdercargoAmount'][1].focus()
      } else {
        msg = m
      }
      return msg
    },
    checkcargoVolume(m) {
      const value = parseInt(this.form.cargoList[0].cargoVolume, 10) || 0
      let msg = ''
      if (!value) {
        msg = '请填写有效的体积'
      }
      this.shipFieldValueInfo.cargoVolume = msg
      if (msg && !m) {
        this.$message.error(msg)
        this.$refs['tmsOrdercargoVolume'][1].focus()
      } else {
        msg = m
      }
      return msg
    },
    checkcargoWeight(m) {
      const value = parseInt(this.form.cargoList[0].cargoWeight, 10) || 0

      let msg = ''
      if (!value) {
        msg = '请填写有效的重量'
      }
      this.shipFieldValueInfo.cargoWeight = msg

      if (msg && !m) {
        this.$message.error(msg)
        this.$refs['tmsOrdercargoWeight'][1].focus()
      } else {
        msg = m
      }
      return msg
    },
    /* checkcargoWeight(m) {
      // 不作检测
      return m
      const value = this.form.cargoList[0].cargoWeight
      const value2 = this.form.cargoList[0].cargoVolume

      let msg = ''
      if (!value && !value2) {
        msg = '重量或者体积必填其一'
      }
      this.shipFieldValueInfo.cargoWeight = msg
      this.shipFieldValueInfo.cargoVolume = msg
      if (msg && !m) {
        this.$message.error(msg)
        console.log("this.$refs['tmsOrdercargoWeight']：", this.$refs['tmsOrdercargoWeight'])
        this.$refs['tmsOrdercargoWeight'][1].focus()
      } else {
        msg = m
      }
      return msg
    }, */
    checkcargoFee(m) {
      let find = ''
      // 遍历货物选项
      this.theFeeConfig.forEach(el => {
          // 遍历是否必填选项
          // 重量或者体积只填其一即可，所以不作处理
        if (this.shipFieldValue[el.fieldProperty] && (/(cargoWeight|cargoVolume)/.test(el.fieldProperty) === false)) {
          if (!this.form.cargoList[0][el.fieldProperty]) {
              // 如果找到则不再更改错误信息，但继续遍历标记错误状态
            if (!find) {
              find = el
            }
            this.shipFieldValueInfo[el.fieldProperty] = '1'
          } else {
            // 如果有值则去除其错误标记
            this.shipFieldValueInfo[el.fieldProperty] = ''
          }
        }
      })
      let msg = ''
      if (find) {
        msg = find.fieldName + '不能为空'
      }

      if (msg && !m) {
        this.$message.error(msg)
        let obj = this.$refs['tmsOrder' + find.fieldProperty]
        obj = Array.isArray(obj) ? obj[1] : obj
        if (obj) {
          obj.focus()
        }
      } else {
        msg = m
      }
      return msg
    },
    checkshipReceiptSn(m) {
      return m
      /* const value = this.form.tmsOrderShip.shipToCityName
      let msg = ''
      if (!value) {
        msg = '出发城市不能为空'
      }
      this.shipFieldValueInfo.shipToCityName = msg
      if (msg && !m) {
        this.$message.error(msg)
      } else {
        msg = m
      }
      return msg */
    },
    checkshipCustomerNumber(m) {
      const value = this.form.tmsOrderShip.shipCustomerNumber
      let msg = ''
      if (!value) {
        msg = '客户单号不能为空'
      }
      if (REGEX.ONLY_NUMBER_AND_LETTER.test(value) === false) {
        msg = '客户单号只能为数字或者字母'
      }
      this.shipFieldValueInfo.shipCustomerNumber = msg
      if (msg && !m) {
        this.$message.error(msg)
        this.$refs['tmsOrdershipCustomerNumber'].focus()
      } else {
        msg = m
      }
      return msg
    },
    checkshipUserid(m) {
      const value = this.form.tmsOrderShip.shipUserid
      let msg = ''
      if (!value) {
        msg = '业务员不能为空'
      }
      this.shipFieldValueInfo.shipUserid = msg
      if (msg && !m) {
        this.$message.error(msg)
        this.$refs['tmsOrdershipUserid'].$refs['myautocomplete'].focus()
      } else {
        msg = m
      }
      return msg
    },
    vaildateForm() {
      // 每一次验证前都重置之前的
      return new Promise(resolve => {
        const data = this.form.tmsOrderShip
        const cargo = this.form.cargoList
        const sender = this.form.sender
        const receiver = this.form.receiver
        const transfer = this.form.tmsOrderTransfer
        const checklist = this.shipFieldValue
        let msg = ''
      // 运单号
        if (checklist.shipSn) {
          msg = this.checkshipSn()
        }
      // 出发城市
        if (checklist.shipFromCityName) {
          msg = this.checkshipFromCityName(msg)
        }
      // 到达城市
        if (checklist.shipToCityName) {
          msg = this.checkshipToCityName(msg)
        }
      // 目的网点
        if (checklist.shipToOrgid) {
          msg = this.checkshipToOrgid(msg)
        }
      // 货号
        if (checklist.shipGoodsSn) {
          msg = this.checkshipGoodsSn(msg)
        }
      // 发货方
        if (checklist.shipSenderId) {
          msg = this.checkshipSenderUnit(msg)
        }
      // 发货人
        if (checklist.shipSenderName) {
          msg = this.checkshipSenderName(msg)
        }
      // 发货人电话
        if (checklist.shipSenderMobile) {
          msg = this.checkshipSenderMobile(msg)
        }
      // 发货地址
        if (checklist.shipSenderAddress) {
          msg = this.checkshipSenderAddress(msg)
        }
      // 收货方
        if (checklist.shipReceiverId) {
          msg = this.checkshipReceiverUnit(msg)
        }
      // 收货人
        if (checklist.shipReceiverName) {
          msg = this.checkshipReceiverName(msg)
        }
      // 收货人电话
        if (checklist.shipReceiverMobile) {
          msg = this.checkshipReceiverMobile(msg)
        }
      // 收货地址
        if (checklist.shipReceiverAddress) {
          msg = this.checkshipReceiverAddress(msg)
        }
      // 货品名
        if (checklist.cargoName) {
          msg = this.checkcargoName(msg)
        }
      // 件数
        if (checklist.cargoAmount) {
          msg = this.checkcargoAmount(msg)
        }
      // 重量
        if (checklist.cargoWeight) {
          msg = this.checkcargoWeight(msg)
        }
        //  体积
        if (checklist.cargoVolume) {
          msg = this.checkcargoVolume(msg)
        }
      // 其它费用项
        msg = this.checkcargoFee(msg)
      // 回单号
        if (checklist.shipReceiptSn) {
          msg = this.checkshipReceiptSn(msg)
        }
      // 客户单号
        if (checklist.shipCustomerNumber) {
          msg = this.checkshipCustomerNumber(msg)
        }
      // 业务员
        if (checklist.shipUserid) {
          msg = this.checkshipUserid(msg)
        }

      // 检查运单号是否重复
        if (this.output.ismodify && !this.$route.query.isdash) {
          resolve(!msg)
        } else {
          if (!this.form.tmsOrderShip.shipSn) {
            this.$refs['tmsOrderShipshipSn'].focus()
            this.$message.error('请填写运单号~')
            resolve(false)
          } else {
            this.detectOrderNum().then(isDulip => {
              if (isDulip) {
              /**
               运单号重复
                  ↓
              是否允许手动输入 → 不允许，自动生成一个新的
                  ↓
              允许输入，聚焦到运单号框由用户修改
              */
                if (this.config.shipNo.manualInput !== '1') {
                  orderManage.getShipSn(this.otherinfo.orgid).then(res => {
                    this.form.tmsOrderShip.shipSn = res.data
                  }).catch((err) => {
                    this.loading = false
                    this._handlerCatchMsg(err)
                  })
                  this.$message.error('重复的订单号，已为你重新生成新的运单号~')
                } else {
                  this.$refs['tmsOrderShipshipSn'].focus()
                  this.$message.error('重复的订单号，请修改~')
                }

                resolve(false)
              } else {
                resolve(!msg)
              }
            })
          }
        }
      })
    },
    submitForm() {
      this.loading = true
      this.isChecked = true
      this.isCheckedShow = false
      // 先判断表单必填项是否校验通过
      // this.$refs['ruleForm'].validate((valid, errlist) => {
      this.vaildateForm().then(valid => {
        this.isChecked = false
        this.isCheckedShow = false

        if (valid) {
          // 判断运费是否符合总计
          if (tmsMath.add(this.form.tmsOrderShip.shipNowpayFee, this.form.tmsOrderShip.shipArrivepayFee, this.form.tmsOrderShip.shipMonthpayFee, this.form.tmsOrderShip.shipReceiptpayFee).result() !== parseFloat(this.form.tmsOrderShip.shipTotalFee, 10)) {
            this.$message.error('各付款方式之和与合计运费不等~')
            this.loading = false
          } else {
            console.log('提交前数据4：', valid)
            // 再提取各个表格项里的数据
            const data = objectMerge2({}, this.form)
            delete data.sender
            delete data.receiver
            delete data.cargoList
            // 非订单页面传过来
            if (!this.output.isPreOrder) {
              console.log('this.output.isPreOrder:', this.output.isPreOrder)
              delete data.tmsOrderPre
            }
            console.log('create submit data:', JSON.stringify(data))
            // 没有设置填写中转信息
            if (!this.shouldInputTransfer) {
              delete data.tmsOrderTransfer
              data.tmsOrderTransfer = {}
            } else {
              data.tmsOrderTransfer.transferTime = new Date((data.tmsOrderTransfer.transferTime + '').trim()).getTime()
              if (this.output.ismodify) {
                data.tmsOrderTransfer.id = this.orderData.tmsOrderTransfer ? this.orderData.tmsOrderTransfer.id : ''
              }
            }
            // 处理城市信息
            data.tmsOrderShip.shipFromCityName = data.tmsOrderShip.shipFromCityName ? data.tmsOrderShip.shipFromCityName.replace(/,$/, '') : ''
            data.tmsOrderShip.shipToCityName = data.tmsOrderShip.shipToCityName ? data.tmsOrderShip.shipToCityName.replace(/,$/, '') : ''

            // 判断收发货人信息
            let changeSender = false
            for (const i in this.form.sender) {
              if (this.sender[i] !== this.form.sender[i]) {
                changeSender = true
              }
            }
            let changeReceiver = false
            for (const i in this.form.receiver) {
              if (this.receiver[i] !== this.form.receiver[i]) {
                changeReceiver = true
              }
            }

            data.customerList[0] = objectMerge2({}, this.form.sender)
            data.customerList[1] = objectMerge2({}, this.form.receiver)
            if (changeSender) {
              data.customerList[0].customerId = ''
            } else {
              data.tmsOrderShip.shipSenderId = data.customerList[0].customerId
            }
            data.customerList[0].customerType = 1

            if (changeReceiver) {
              data.customerList[1].customerId = ''
            } else {
              data.tmsOrderShip.shipReceiverId = data.customerList[1].customerId
            }
            data.customerList[1].customerType = 2
            // 处理货物
            data.tmsOrderCargoList = this.form.cargoList.filter(el => {
              // 没填写货品名称的丢弃
              return !!el.cargoName
            }).map(el => {
              const b = {}
              for (const i in el) {
                if (el[i] === '') {
                  b[i] = 0
                } else {
                  b[i] = el[i]
                }
              }
              return b
            })
            data.tmsOrderShip.createTime = new Date((data.tmsOrderShip.createTime + '').trim()).getTime()

            // 处理费用的小数点
            data.tmsOrderShip.shipTotalFee = parseFloat(data.tmsOrderShip.shipTotalFee, 10).toFixed(2)
            data.tmsOrderShip.shipNowpayFee = parseFloat(data.tmsOrderShip.shipNowpayFee, 10).toFixed(2)
            data.tmsOrderShip.shipArrivepayFee = parseFloat(data.tmsOrderShip.shipArrivepayFee, 10).toFixed(2)
            data.tmsOrderShip.shipReceiptpayFee = parseFloat(data.tmsOrderShip.shipReceiptpayFee, 10).toFixed(2)
            data.tmsOrderShip.shipMonthpayFee = parseFloat(data.tmsOrderShip.shipMonthpayFee, 10).toFixed(2)

            if (this.output.ismodify) {
              /* this.$message.success('成功修改运单！')
                this.batchSaveList[this.currentBatch].data = data
                if(!this.output.isbatch){
                  if(this.ispop){
                    this.eventBus.$emit('hideCreateOrder')
                    this.eventBus.$on('showOrderDetail', data.tmsOrderShip.id)
                  } else {
                    // this.eventBus.$emit('replaceCurrentView', '/operation/order/orderDetail?orderid=' + data.tmsOrderShip.id + '&tab=查看' + data.tmsOrderShip.shipSn)
                    this.eventBus.$emit('replaceCurrentView', '/operation/order/orderManage')
                  }
                }
                return */

              data.tmsOrderShip.id = this.orderData.tmsOrderShip.id
              data.tmsOrderShip.shipStatus = this.orderData.tmsOrderShip.shipStatus
              console.log('change Order:', data)
              // 判断是否从草稿箱过来
              let pro
              const isdashed = this.$route.query.isdash
              if (isdashed) {
                pro = orderManage.postNewOrder(data)
              } else {
                pro = orderManage.putChangeOrder(data)
              }
              pro.then(res => {
                this.loading = false
                this.$message.success('成功' + (isdashed ? '创建' : '修改') + '运单！')
                this.eventBus.$emit('saveOrderSuccess')

                if (!this.output.isbatch) {
                  if (this.ispop) {
                    this.eventBus.$emit('hideCreateOrder')
                    this.eventBus.$emit('showOrderDetail', data.tmsOrderShip.id)
                  } else {
                    // this.eventBus.$emit('replaceCurrentView', '/operation/order/orderDetail?orderid=' + data.tmsOrderShip.id + '&tab=查看' + data.tmsOrderShip.shipSn)
                    this.eventBus.$emit('replaceCurrentView', '/operation/order/orderManage')
                  }
                } else {
                  this.batchSaveList[this.currentBatch].data = data
                }
              }).catch(err => {
                this.loading = false
                this.$message.error((isdashed ? '创建' : '修改') + '失败，原因：' + err.text)
              })
            } else {
              /* this.$message.success('成功创建运单！')
                this.batchSaveList[this.currentBatch].data = data
                this.batchSaveList[this.currentBatch].issave = true
                // 当为批次列表过来的，不作处理
                if(!this.output.isbatch){
                  if(this.ispop){
                    this.eventBus.$emit('hideCreateOrder')
                    this.eventBus.$on('showOrderDetail', 9)
                  } else {
                    this.eventBus.$emit('replaceCurrentView', '/operation/order/orderDetail?orderid=' + 9 + '&tab=查看' + data.tmsOrderShip.shipSn)
                  }
                }

                return */
              orderManage.postNewOrder(data).then(res => {
                this.resOrderId = res.data // 获取开单后返回的运单id
                this.$message.success('成功创建运单！')
                this.eventBus.$emit('saveOrderSuccess')
                data.tmsOrderShip.id = res.data
                this.tmsOrderShipId = res.data
                this.loading = false
                // 当为批次列表过来的，不作处理
                if (!this.output.isbatch) {
                  if (this.output.isPreOrder) {
                    this.eventBus.$emit('putAcceptOrder', this.output.preId)
                  }
                  if (this.ispop) {
                    this.eventBus.$emit('hideCreateOrder')
                    this.eventBus.$emit('showOrderDetail', res.data)
                  } else {
                    this.eventBus.$emit('replaceCurrentView', '/operation/order/orderDetail?orderid=' + res.data + '&tab=查看' + data.tmsOrderShip.shipSn)
                  }
                } else {
                  this.batchSaveList[this.currentBatch].data = data
                  this.batchSaveList[this.currentBatch].issave = true
                  this.goNextEditBatch()
                }
                if (this.isSavePrint) {
                  this.printSave() // 执行成功后打印运单
                }
              }).catch(err => {
                this.loading = false
                this.$message.error('创建失败，原因：' + err.text)
              })
            }
          }
        } else {
          this.loading = false
        }
      })
    },
    // 底部按钮操作
    doAction(type) {
      switch (type) {
        case 'cleanKey':
          this.reset(true)
          break
        case 'printLibkey': // 打印标签
          this.printLibkey()
          break
        case 'printShipKey': // 打印运单
          this.print()
          // this.$message.info('正在开发中，敬请期待。')
          break
        case 'saveShipKey':
          this.isSavePrint = false // false-不保存并打印，只保存
          this.submitForm()
          break
        case 'savePrintKey':
          this.isSavePrint = true // true-保存并打印
          this.submitForm()

          // this.$message.info('正在开发中，敬请期待。')
          break
      }
    },
    printLibkey() { // 打印标签
      getEnableLibSetting().then(data => {
        console.log('getEnableLibSetting', data)
        this.setPrintData('lib') // 设置数据
        const libData = Object.assign([], data)
        for (const item in this.printDataObject) {
          libData.forEach((e, index) => {
            if (e.filedValue === item) {
              e['value'] = this.printDataObject[item] // 把页面数据存储到打印数组中
            }
          })
        }
        CreatePrintPageEnable(libData, this.otherinfo.systemSetup.printSetting.label) // 调打印接口
      })
      .catch(err => {
        this._handlerCatchMsg(err)
      })
    },
    print() { // 打印运单
      getEnableOrderSetting().then(data => {
        console.log('getEnableOrderSetting', data)
        this.setPrintData('order') // 设置数据
        const libData = Object.assign([], data)
        for (const item in this.printDataObject) {
          libData.forEach((e, index) => {
            if (e.filedValue === item) {
              e['value'] = this.printDataObject[item] // 把页面数据存储到打印数组中
            }
          })
        }
        CreatePrintPageEnable(data, this.otherinfo.systemSetup.printSetting.ship)
      })
      .catch(err => {
        this._handlerCatchMsg(err)
      })
    },
    printSave() { // 打印保存的运单
      getPrintOrderItems(this.resOrderId).then(data => {
        CreatePrintPage(data, this.otherinfo.systemSetup.printSetting.ship)
      })
      .catch(err => {
        this._handlerCatchMsg(err)
      })
    },
    getSelectType() { // 获取提货方式中文
      getSelectType('ship_delivery_method', this.otherinfo.orgid).then(data => {
        data.forEach(e => {
          this.DELIVERY_METHODS[e.id] = e.dictName
        })
      }).catch((err) => {
        this.loading = false
        this._handlerCatchMsg(err)
      })
    },
    getShipPayWay() { // 获取付款方式中文
      getSelectType('ship_pay_way', this.otherinfo.orgid).then(data => {
        console.log('ship_pay_way', data, parseInt(this.form.tmsOrderShip.shipPayWay))
        data.forEach(e => {
          this.PAY_WAY[e.id] = e.dictName
        })
      }).catch((err) => {
        this.loading = false
        this._handlerCatchMsg(err)
      })
    },
    setPrintData(type) { // 设置打印的字段
      // 标签数据
      let obj = new Object()
      if (type === 'lib') {
        this.$set(obj, 'goodsSn', this.form.tmsOrderShip.shipGoodsSn)
        this.$set(obj, 'createTime', this.form.tmsOrderShip.createTime)
        this.$set(obj, 'fromCity', this.form.tmsOrderShip.shipFromCityName)
        this.$set(obj, 'toCity', this.form.tmsOrderShip.shipToCityName)
        this.$set(obj, 'toOrgName', this.form.tmsOrderShip.shipToCityName)
        this.$set(obj, 'fromOrgName', this.otherinfo.name)
        this.$set(obj, 'senderUnit', this.form.sender.customerUnit)
        this.$set(obj, 'senderName', this.form.sender.customerName)
        this.$set(obj, 'senderMobile', this.form.sender.customerMobile)
        this.$set(obj, 'cargoPack', this.form.cargoList[0].cargoPack)
        this.$set(obj, 'companyName', this.otherinfo.companyName)
        this.$set(obj, 'deliveryMethod', this.DELIVERY_METHODS[parseInt(this.form.tmsOrderShip.shipDeliveryMethod)])
      } else if (type === 'order') {
        this.$set(obj, 'shipSn', this.form.tmsOrderShip.shipSn) // 运单号
        this.$set(obj, 'createTime', this.form.tmsOrderShip.createTime) // 开单时间
        this.$set(obj, 'fromCity', this.form.tmsOrderShip.shipFromCityName) // 出发城市
        this.$set(obj, 'toCity', this.form.tmsOrderShip.shipToCityName) // 到达城市
        this.$set(obj, 'deliveryMethod', this.DELIVERY_METHODS[parseInt(this.form.tmsOrderShip.shipDeliveryMethod)]) // 交接方式
        this.$set(obj, 'toOrgName', this.form.tmsOrderShip.shipToCityName) // 到达网点
        this.$set(obj, 'fromOrgName', this.otherinfo.name) // 开单网点
        this.$set(obj, 'goodsSn', this.form.tmsOrderShip.shipGoodsSn) // 货号
        this.$set(obj, 'senderUnit', this.form.sender.customerUnit) // 发货单位
        this.$set(obj, 'senderName', this.form.sender.customerName) // 发货人
        this.$set(obj, 'senderMobile', this.form.sender.customerMobile) // 发货人手机
        this.$set(obj, 'senderAddress', this.form.sender.detailedAddress) // 发货地址
        this.$set(obj, 'receiverUnit', this.form.receiver.customerUnit) // 收货方
        this.$set(obj, 'receiverName', this.form.receiver.customerName) // 收货人
        this.$set(obj, 'receiverMobile', this.form.receiver.customerMobile) // 收货人手机号吗
        this.$set(obj, 'receiverAddress', this.form.receiver.detailedAddress) // 收货地址
        for (const item in this.form.cargoList[0]) { // 货品信息及其费用项
          obj[item] = this.form.cargoList[0][item]
        }
        console.log('this.form.cargoList[0]', this.form.cargoList[0])
        this.$set(obj, 'description', this.form.cargoList[0]['description'] ? this.form.cargoList[0]['description'] : '') // 品种规格
        this.$set(obj, 'otherfeeOut', this.form.cargoList[0]['otherfeeOut'] ? this.form.cargoList[0]['otherfeeOut'] : '') // 其他费用支出
        this.$set(obj, 'otherfeeIn', this.form.cargoList[0]['otherfeeIn'] ? this.form.cargoList[0]['otherfeeIn'] : '') // 其他费用收入
        this.$set(obj, 'taxRate', this.form.cargoList[0]['taxRate'] ? this.form.cargoList[0]['taxRate'] : '') // 税率
        this.$set(obj, 'taxes', this.form.cargoList[0]['taxes'] ? this.form.cargoList[0]['taxes'] : '') // 税金
        this.$set(obj, 'housingFee', this.form.cargoList[0]['housingFee'] ? this.form.cargoList[0]['housingFee'] : '') // 入仓费
        this.$set(obj, 'stampTax', this.form.cargoList[0]['stampTax'] ? this.form.cargoList[0]['stampTax'] : '') // 印花税
        this.$set(obj, 'payWay', this.PAY_WAY[parseInt(this.form.tmsOrderShip.shipPayWay)]) // 付款方式
        this.$set(obj, 'totalFee', this.form.tmsOrderShip.shipTotalFee) // 运费合计
        this.$set(obj, 'receiptRequire', this.form.tmsOrderShip.shipReceiptRequire) // 回单类型
        this.$set(obj, 'customerNumber', this.form.tmsOrderShip.shipCustomerNumber) // 客户单号
        this.$set(obj, 'shippingType', this.form.tmsOrderShip.shipShippingType) // 运输方式
        this.$set(obj, 'businessType', this.form.tmsOrderShip.shipBusinessType) // 业务类型
        this.$set(obj, 'effective', this.form.tmsOrderShip.shipEffective) // 时效
        if (this.form.tmsOrderShip.shipEffective === 95) {
          this.$set(obj, 'urgent', this.form.tmsOrderShip.shipEffective) // 95-时效-加急
        } else {
          this.$set(obj, 'common', this.form.tmsOrderShip.shipEffective) // 94-时效-普通
        }
        this.$set(obj, 'userName', this.form.tmsOrderShip.shipUserid) // 制单员
        if (this.shipOther === 168) {
          this.$set(obj, 'controlGoods', this.shipOther) // 168-控货
        } else {
          this.$set(obj, 'valuables', this.shipOther) // 169-贵重物品
        }
        this.$set(obj, 'remarks', this.form.tmsOrderShip.shipRemarks) // 备注
      }
      this.printDataObject = Object.assign({}, obj)
      obj = {}
      console.log('printDataObject', this.printDataObject)
    },
    // 右下角设置按钮菜单点击操作
    handleCommand(command) {
      switch (command) {
        case 'feeSetup':
          this.dialogVisible = true
          break
        case 'personalSetup':
          this.dialogVisiblePerson = true
          break
        case 'orderSetup':
          this.$router.push('/company/systemSetup')
          break
        case 'openInNewWindow':
          this.$message('暂不支持新开窗口创建运单~')
          break
      }
    },
    getKeySetup() {
      this.changeFlag = Math.random()
      this.getPersonSetting(true).then(data => {
        this.personConfig = data
        this.setOrderTransfer()
        if (!this.output.isOrder) {
          this.setDefaultValue()
        }
      }).catch((err) => {
        this.loading = false
        this._handlerCatchMsg(err)
      })
    }
  }, // 路由更新时触发，用来切换渲染数据
  // 需要对应router-view的组件才能触发
  beforeRouteUpdate(to, from, next) {
    next()
    console.log('beforeRouteUpdate:', to, from)
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
    padding-top: 34px;
    padding-left: 26px;
    padding-right: 26px;
    padding-bottom: 58px;
    font-size: 12px;
    // max-height: 100%;
    min-width: 1316px;
    display: flex;
    position: relative;
    flex-flow:row;

    .el-dialog__wrapper,.v-modal{
      position: absolute;
    }

    .el-date-editor.el-input{
      width: 140px;
    }

    .el-form-item--mini.el-form-item{
      margin: 0;
    }

    .el-input.is-disabled .el-input__inner{
      color: #666;
    }

    .el-table th.required>div::before{
      display: none;
    }

    .batchlist{
      flex: 0 0 60px;
      margin-right: 10px;
      margin-top: 38px;
      border-top: 1px solid #999;
      span{
        display: block;
        border: 1px solid #999;
        border-top: none;
        height: 36px;
        line-height: 36px;
        text-align: center;
        cursor: pointer;

        &.on{
          color: #333;
          background: #cbe1f7;
          cursor: default;
        }
      }
    }

    /* &.creatBatch-main{
      .createOrderWrapper{
        width:calc(100% - 60px - 10px);
      }
    } */

    .createOrderWrapper{
      max-height: 100%;
      display: flex;
      flex-direction: column;
      width: 100%;
      overflow-x: hidden;
      position: relative;
      &>.el-form{
        //height: calc( 100% - 100px);
        flex: 1;
        display: flex;
        flex-direction: column;
      }
    }
    
    .createOrder-title{
      font-size: 24px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 9px;
      color: #000;
      text-align: center;
      height: 28px;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;

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
        border: none;
        border-radius: 0;
        border-bottom: 1px solid #ccc;
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
      min-height: 366px;
      border: solid 2px #000827;
      margin-top: 8px;
      // max-height: calc(100% - 38px);
      flex: 1;
      overflow-y: auto;

      .required{
        color: #f00;
        font-weight: normal;
      }
    }
    
    .order-form-item{
      float: none;
    }
    .createOrder-info{
      height: 30px;
      .required{
        color: #f00;
        font-weight: normal;
      }
    }

    .el-select__caret::before{
      content:"\E60C";
    }
    
    .showFormInfo{
      .el-input.is-disabled .el-input__inner{
        color: #000;
      }
    }

    .order-form-label{
      color: #666;
    }

    .order-form-item{
      display: flex;
      line-height: 28px;
      .order-form-label{
        width: 66px;
        text-align: justify;
        border-right: 1px solid $bordercolor;
        height: 28px;
        overflow: hidden;
        padding: 0 5px;

        &:after{display: inline-block ; content: ''; padding-left: 100%;height: 0;width: 0;line-height: 0; }
      }
      
      .el-form-item{
        flex: 1;
      }
      .autocomplete-input,.el-form-item__content,.el-autocomplete,.el-select{
        display: block;
        width: 100%;
      }
      .el-input__suffix{
        right: 0;
      }
      .el-form-item__content{
        height: 28px;
        overflow:hidden;
      }
      .el-input__inner{
        vertical-align: 1px;
      }
      .el-form-item.is-error .el-input__inner{
        border-color: #f56c6c;
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

        &:focus{
          background: rgba(0, 0, 0, 0.04);
        }
      }
      
    }

    .el-checkbox__label{
      font-size: 12px;
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

        &:focus{
          background: rgba(0, 0, 0, 0.04);
        }
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
      margin-bottom: 1px;
      width: 100%;

      th{
        min-width: 110px;
        background: #d5e7f9;
        color: #666;
        height: 28px;
        vertical-align: middle;
        border-left: 1px solid #88bef3;
        text-align: center;
        font-weight: normal;
      }
      .el-table .cell{
        padding: 0;
      }
      .el-table td{
        padding: 0;
      }
      .el-form-item,.el-form-item__content,.autocomplete-input,.el-autocomplete{
        width: 100%;
      }

      /* table, td{
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
      } */
      .addButtonTh{
        min-width: 50px;
      }
      .el-input__inner{
        border-color: transparent;
        border-radius: 0;

        &:focus{
          background: rgba(0, 0, 0, 0.04);
        }
      }
      .el-form-item__content>input{
        font-size: 12px;
      }
      .el-form-item.is-error .el-input__inner{
        border-color: #f56c6c;
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
      border-top: 1px solid $bordercolor;
      border-bottom: 1px solid $bordercolor;
      margin-bottom: 1px;

      .order-form-item{
        border-bottom: 1px solid $bordercolor;
      }

      .fouth-order-other{
        .order-form-item{
          border-bottom: none;
        }
      }

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

        &:focus{
          background: rgba(0, 0, 0, 0.04);
        }
      }

      .el-input-group__append{
        padding: 0 5px;
        border-radius: 0;
        border: none;
      }
      .el-checkbox{
        margin-left: 10px;
      }
      .el-checkbox{
        font-size: 0;
      }
      .el-checkbox__label{
        vertical-align: middle;
      }

      .other-form-shipReceiptNum{
        padding: 0;
        .el-input__inner{
          padding: 0;
          text-align: center;
        }
      }

      .remarks-btn{
        position: absolute;
        top: 0;
        right: 1px;
        color: #3189e2;
        border-color: #3189e2;
        z-index: 2;
      }
    }

    /* 中转信息 */
    .order-transfer-form{
      .el-input__inner{
        border-color: transparent;
        border-radius: 0;

        &:focus{
          background: rgba(0, 0, 0, 0.04);
        }
      }

      .el-collapse,.el-collapse-item__wrap{
        border-bottom: none;
      }
      .el-collapse-item__content{
        overflow-x: auto;
        padding-bottom: 0;
      }
      th{
        height: 30px;
        line-height: 30px;
        background: #eee;
      }
      table,td,th{
        border: 1px solid $bordercolor;
      }

      .el-collapse-item:last-child{
        margin-bottom: 0;
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
