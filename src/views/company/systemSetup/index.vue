<template>
  <div class="system-setup-page" v-loading="loading">
    <div class="system-setup-table">
      <el-form :model="form" ref="ruleForm" :inline="true" label-position="right" size="mini">
        <el-collapse v-model="activeNames">
          <el-collapse-item name="setup1" v-has:SETTINGS_SHIPNO>
            <template slot="title">
              单号规则
            </template>
            <!-- 运单号规则 -->
            <div class="clearfix setup-table">
              <div class="setup-left">运单号规则</div>
              <div class="setup-right">
                <el-form-item>
                  <el-radio label="1" v-model="shipNo">手工输入</el-radio>
                </el-form-item>
                <el-form-item>
                  <el-radio label="2" v-model="shipNo">2位年+2位月+2位日+按公司单号顺序自增</el-radio>
                  <el-tooltip effect="dark" placement="top" :enterable="false" :manual="true" :value="tooltip1" tabindex="-1">
                    <div slot="content">运单号至少4位，最多8位。</div>
                    <el-input v-numberOnly :disabled="shipNo !== '2'" v-model.trim="form.shipNo.companyNumberAutoIncrementByTwoYMDValue" auto-complete="off" @focus="tooltip1 = true" placeholder="如：0001" @blur="tooltip1 = false"></el-input>
                  </el-tooltip>
                </el-form-item>
                <el-form-item>
                  <el-radio label="3" v-model="shipNo">2位年+2位月+按公司单号顺序自增</el-radio>
                  <el-tooltip effect="dark" placement="top" :enterable="false" :manual="true" :value="tooltip2" tabindex="-1">
                    <div slot="content">运单号至少4位，最多8位。</div>
                    <el-input v-numberOnly :disabled="shipNo !== '3'" v-model.trim="form.shipNo.companyNumberAutoIncrementByTwoYMValue" auto-complete="off" @focus="tooltip2 = true" placeholder="如：0001" @blur="tooltip2 = false"></el-input>
                  </el-tooltip>
                </el-form-item>
                <el-form-item>
                  <el-radio label="4" v-model="shipNo">按公司单号顺序自增</el-radio>
                  <el-tooltip effect="dark" placement="top" :enterable="false" :manual="true" :value="tooltip3" tabindex="-1">
                    <div slot="content">运单号至少6位，最多7位。</div>
                    <el-input v-numberOnly :disabled="shipNo !== '4'" v-model.trim="form.shipNo.companyNumberAutoIncrementValue" auto-complete="off" @focus="tooltip3 = true" placeholder="如：0001" @blur="tooltip3 = false"></el-input>
                  </el-tooltip>
                </el-form-item>
                <el-form-item>
                  <el-checkbox true-label="1" false-label="0" v-model="form.shipNo.systemNumberImmutable">不允许修改系统生成的单号</el-checkbox>
                </el-form-item>
              </div>
            </div>
            <!-- 货号规则 -->
            <div class="clearfix setup-table">
              <div class="setup-left">货号规则</div>
              <div class="setup-right">
                <el-form-item>
                  <el-radio label="1" v-model="cargoNo">手工输入</el-radio>
                </el-form-item>
                <el-form-item>
                  <el-radio label="2" v-model="cargoNo">运单号+件数</el-radio>
                </el-form-item>
                <el-form-item>
                  <el-radio label="3" v-model="cargoNo">网点代码+运单号后</el-radio>
                  <el-input :disabled="cargoNo !== '3'" v-model="form.cargoNo.orgIdAndShipNoAndNumberOfUnitsValue" placeholder=""></el-input>位+件数
                </el-form-item>
                <el-form-item>
                  <el-checkbox true-label="1" false-label="0" v-model="form.cargoNo.systemNumberNotAllowUpdate">不允许修改系统生成的货号</el-checkbox>
                </el-form-item>
              </div>
            </div>
          </el-collapse-item>
          <el-collapse-item name="setup2" title="运费合计规则" v-has:SETTINGS_SHIPFEE>
            <!-- 运费合计规则 -->
            <div class="clearfix setup-table">
              <div class="setup-left">运费合计</div>
              <div class="setup-right">
                <el-form-item>
                  <el-checkbox true-label="1" disabled false-label="0" v-model="form.shipFee.shipFee">基本运费</el-checkbox>
                </el-form-item>
                <el-form-item>
                  <el-checkbox true-label="1" false-label="0" v-model="form.shipFee.brokerageFee">回扣</el-checkbox>
                </el-form-item>
                <!--    <el-form-item>
                <el-checkbox true-label="1" false-label="0" v-model="form.shipFee.productPrice">声明价值</el-checkbox>
              </el-form-item> -->
                <el-form-item>
                  <el-checkbox true-label="1" false-label="0" v-model="form.shipFee.deliveryFee">送货费</el-checkbox>
                </el-form-item>
                <el-form-item>
                  <el-checkbox true-label="1" false-label="0" v-model="form.shipFee.pickupFee">提货费</el-checkbox>
                </el-form-item>
                <el-form-item>
                  <el-checkbox true-label="1" false-label="0" v-model="form.shipFee.goupstairsFee">上楼费</el-checkbox>
                </el-form-item>
                <el-form-item>
                  <el-checkbox true-label="1" false-label="0" v-model="form.shipFee.insuranceFee">保险费</el-checkbox>
                </el-form-item>
                <el-form-item>
                  <el-checkbox true-label="1" false-label="0" v-model="form.shipFee.handlingFee">装卸费</el-checkbox>
                </el-form-item>
                <el-form-item>
                  <el-checkbox true-label="1" false-label="0" v-model="form.shipFee.packageFee">包装费</el-checkbox>
                </el-form-item>
                <el-form-item>
                  <el-checkbox true-label="1" false-label="0" v-model="form.shipFee.forkliftFee">叉车费</el-checkbox>
                </el-form-item>
                <el-form-item>
                  <el-checkbox true-label="1" false-label="0" v-model="form.shipFee.customsFee">报关费</el-checkbox>
                </el-form-item>
                <el-form-item>
                  <el-checkbox true-label="1" false-label="0" v-model="form.shipFee.commissionFee">代收款手续费</el-checkbox>
                </el-form-item>
                <el-form-item>
                  <el-checkbox true-label="1" false-label="0" v-model="form.shipFee.taxes">税金</el-checkbox>
                </el-form-item>
                <el-form-item>
                  <el-checkbox true-label="1" false-label="0" v-model="form.shipFee.housingFee">入仓费</el-checkbox>
                </el-form-item>
                <el-form-item>
                  <el-checkbox true-label="1" false-label="0" v-model="form.shipFee.stampTax">印花税</el-checkbox>
                </el-form-item>
                <el-form-item>
                  <el-checkbox true-label="1" false-label="0" v-model="form.shipFee.otherfeeIn">其他费用收入</el-checkbox>
                </el-form-item>
              </div>
            </div>
          </el-collapse-item>
          <el-collapse-item name="setup3" title="运单功能设置" v-has:SETTINGS_SHIPFUNC>
            <!-- 运单页面 -->
            <div class="clearfix setup-table">
              <div class="setup-left">运单页面</div>
              <div class="setup-right">
                <!-- <el-form-item>
                <el-checkbox true-label="1" false-label="0" v-model="form.shipPageFunc.toCityByAdministrativeRegion">到站必须选择到行政区</el-checkbox>
              </el-form-item> -->
                <el-form-item>
                  <!-- <el-checkbox true-label="1" disabled false-label="0" v-model="form.shipPageFunc.shipFieldSign">运单字段设置</el-checkbox> -->
                  <!-- <el-select :disabled="form.shipPageFunc.shipFieldSign !== '1'" v-model="value" multiple placeholder="请选择">
                  <el-option
                    v-for="(item, index) in shipField"
                    :key="item.key"
                    :label="item.name"
                    :class="{theSelectfirst: index === 0}"
                    :value="item.value">
                    <div class="selectHeader" v-if="index === 0"><span style="float: left">字典名称</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">必填</span></div>
                    <span style="float: left">{{ item.name }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">
                      <el-checkbox true-label="1" false-label="0" v-model="shipField[index][item.key]"></el-checkbox>
                    </span>
                  </el-option>
                </el-select> -->
                  运单字段设置
                  <el-select v-model="fieldSetup" collapse-tags multiple placeholder="请选择">
                    <el-option v-for="(item, index) in shipField" :key="item.key" :label="item.name" :class="{theSelectfirst: index === 0}" :value="item.key">
                      <div class="selectHeader" @click.prevent.stop v-if="index === 0"><span style="float: left">字典名称</span>
                        <span style="float: right; color: #8492a6; font-size: 13px">必填</span></div>
                      <span style="float: left">{{ item.name }}</span>
                    </el-option>
                  </el-select>
                  <!-- shipField -->
                </el-form-item>
                <el-form-item>
                  开单时间规则
                  <SelectType type="ship_time_rule" v-model="form.shipPageFunc.shipTimeRule">
                  </SelectType>
                </el-form-item>
                <el-form-item>
                  通知放货规则
                  <SelectType type="notify_cargo_rule" v-model="form.shipPageFunc.notifyCargoRule">
                  </SelectType>
                </el-form-item>
                <el-form-item>
                  运单名称
                  <el-input :maxlength="20" v-model="form.shipPageFunc.orderName" />
                </el-form-item>
                <el-form-item>
                  保险费与声明价值比例
                  <el-input :maxlength="3" v-number-only v-model="form.shipPageFunc.insurancePremiumIsDeclaredValue" style="width: 120px;">
                    <template slot="append">‰</template>
                  </el-input>
                  <el-popover placement="right" trigger="hover" style="float: right;margin-top:0px;margin-left: 10px">
                    <span>保险费为声明价值{{form.shipPageFunc.insurancePremiumIsDeclaredValue}}‰</span>
                    <i class="el-icon-question" slot="reference"></i>
                  </el-popover>
                </el-form-item>
                <el-form-item v-if="false">
                  开单小数位
                  <el-select v-model="form.shipPageFunc.decimalPlaces" placeholder="请选择">
                    <el-option key="0" label="不保存" value="0">
                    </el-option>
                    <el-option key="1" label="保留一位" value="1">
                    </el-option>
                    <el-option key="2" label="保留俩位" value="2">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
            </div>
            <!-- 运单权限 -->
            <div class="clearfix setup-table">
              <div class="setup-left">运单权限</div>
              <div class="setup-right">
                <el-form-item>
                  <el-checkbox true-label="1" false-label="0" v-model="form.shipPermission.onlyUpdateOwnShip">只能修改自己开的运单</el-checkbox>
                </el-form-item>
                <el-form-item>
                  <el-checkbox true-label="1" false-label="0" v-model="form.shipPermission.onlyInvalidOwnShip">只能作废自己开的运单</el-checkbox>
                </el-form-item>
                <el-form-item>
                  <el-checkbox true-label="1" false-label="0" v-model="form.shipPermission.onlyDeleteOwnShip">只能删除自己开的运单</el-checkbox>
                </el-form-item>
                <el-form-item>
                  <el-checkbox true-label="1" false-label="0" v-model="form.shipPermission.selectOrderSetting">可查询全公司运单</el-checkbox>
                </el-form-item>
                <el-form-item>
                  <el-checkbox true-label="1" false-label="0" v-model="form.shipPermission.controlgoodsVisibleRule">其他网点可看控货信息</el-checkbox>
                </el-form-item>
              </div>
            </div>
          </el-collapse-item>
          <el-collapse-item name="setup7" title="财务设置" v-has:SETTINGS_FINANCE>
            <div class="clearfix setup-table setup-table-finance">
              <div class="setup-left">财务设置</div>
              <div class="setup-right">
                <el-form-item>
                  财务凭证
                  <el-select v-model="form.financeSetting.voucher">
                    <el-option v-for="(item, index) in vouchers" :key="index" :value="item.value" :label="item.label"></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </div>
            <div class="clearfix setup-table setup-table-finance">
              <div class="setup-left">毛利</div>
              <div class="setup-right">
                <el-form-item>
                  运费合计
                </el-form-item>
                <el-form-item>
                  <el-checkbox true-label="1" false-label="0" v-model="form.grossMargin.brokerageFee">-&nbsp;回扣</el-checkbox>
                </el-form-item>
                <el-form-item>
                  <el-checkbox true-label="1" false-label="0" v-model="form.grossMargin.shipFeeAmount">-&nbsp;车费合计</el-checkbox>
                  <el-popover placement="right" trigger="hover" style="float: right;margin-top:0px;margin-left: 10px">
                    <span>计算公式：毛利 = 运费合计{{(form.grossMargin.brokerageFee==='1' ? ' - 回扣':'') + (form.grossMargin.shipFeeAmount==='1'?' - 车费合计':'') }}</span>
                    <i class="el-icon-question" slot="reference"></i>
                  </el-popover>
                </el-form-item>
              </div>
            </div>
          </el-collapse-item>
          <el-collapse-item name="setup8" title="配载设置" v-has:SETTINGS_LOAD>
            <div class="clearfix setup-table">
              <div class="setup-left">配载设置</div>
              <div class="setup-right">
                <el-form-item>
                  发车合同承运方
                  <el-select v-model="form.loadSetting.carrier">
                    <el-option v-for="(item, index) in deliverContacts" :key="index" :value="item.value" :label="item.label"></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </div>
          </el-collapse-item>
          <el-collapse-item name="setup4" title="打印设置" v-has:SETTINGS_PRINT>
            <div class="clearfix setup-table">
              <div class="setup-left">打印机设置</div>
              <div class="setup-right">
                <el-form-item>
                  运单
                  <el-select v-model="form.printSetting.ship">
                    <el-option v-for="item in printers" :key="item" :value="item" :label="item"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  标签
                  <el-select v-model="form.printSetting.label">
                    <el-option v-for="item in printers" :key="item" :value="item" :label="item"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  清单
                  <el-select v-model="form.printSetting.inventory">
                    <el-option v-for="item in printers" :key="item" :value="item" :label="item"></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </div>
            <div class="clearfix setup-table">
              <div class="setup-left">列表模板设置</div>
              <div class="setup-right">
                <el-form-item>
                  <el-radio-group v-model="form.listTemplate.templateSign" size="mini">
                    <el-radio label="0">使用网点模板</el-radio>
                    <el-radio label="1">使用公司模板</el-radio>
                  </el-radio-group>
                </el-form-item>
              </div>
            </div>
          </el-collapse-item>
          <el-collapse-item name="setup5" title="打印模板设置" v-has:SETTINGS_TEMPLATE>
            <div class="clearfix setup-table">
              <div class="setup-left">运单标签设置</div>
              <div class="setup-right">
                <el-form-item>
                  <el-button @click="doAction('printSetOrder')" icon="el-icon-tickets" type="primary" plain>运单-打印设置</el-button>
                </el-form-item>
                <el-form-item>
                  <el-button @click="doAction('printSetLi')" icon="el-icon-news" type="success" plain>标签-打印设置</el-button>
                </el-form-item>
                <el-form-item>
                  <el-button @click="doAction('printLoadInfo')" icon="el-icon-date" type="primary" plain>配载单-打印设置</el-button>
                </el-form-item>
                <el-form-item>
                  <el-button @click="doAction('printContract')" icon="el-icon-document" type="success" plain>合同-打印设置</el-button>
                </el-form-item>
              </div>
            </div>
          </el-collapse-item>
          <el-collapse-item name="setup6" title="常用插件下载">
            <div class="clearfix setup-table">
              <div class="setup-left">下载地址</div>
              <div class="setup-right">
                <el-form-item>
                  <el-button @click="downloadFile('lodop')" icon="el-icon-download" type="primary" plain>LODOP云打印插件下载</el-button>
                </el-form-item>
                <el-form-item>
                  <el-button @click="downloadFile('supcan')" icon="el-icon-download" type="success" plain>硕正报表插件下载</el-button>
                </el-form-item>
              </div>
            </div>
          </el-collapse-item>
          <el-collapse-item name="setup9" title="LOGO设置">
            <div class="clearfix setup-table">
              <div class="setup-left">系统LOGO</div>
              <div class="setup-right">
                <el-form-item>
                  <Upload :title="'本地上传'" :showFileList="true" :limit="1" listtype="picture" v-model="form.uploadLogo.logoUrl" />
                </el-form-item>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-form>
    </div>
    <div class="system-setup-footer">
      <el-button type="primary" @click="saveData" :disabled="nochange">保存</el-button>
    </div>
    <printSetOrder :popVisible="printSetOrderVisible" @close="closePrintSetOrder" :formInfo="form" @success="changeSystem"></printSetOrder>
    <printSetLi :popVisible="printSetLiVisible" @close="closePrintSetLi" :formInfo="form" @success="changeSystem"></printSetLi>
    <printLoadInfo :popVisible="printLoadInfoVisible" @close="printLoadInfoVisible = false"></printLoadInfo>
    <printContract :popVisible="printContractVisible" @close="printContractVisible = false"></printContract>
  </div>
</template>
<script>
import { getAllSetting, putSetting, putResetSetting } from '@/api/company/systemSetup'
import SelectType from '@/components/selectType/index'
import { mapGetters } from 'vuex'
import { CreatePrinterList } from '@/utils/lodopFuncs'
import { downloadFile } from '@/api/common'
import printSetOrder from './components/printSetOrderSelf'
import printSetLi from './components/printSetLiSelf'
import printLoadInfo from './components/printLoadInfo'
import printContract from './components/printContract'
import Upload from '@/components/Upload/singleImage2'

export default {
  name: 'systemSetup',
  components: {
    SelectType,
    printSetOrder,
    printSetLi,
    printLoadInfo,
    printContract,
    Upload
  },
  computed: {
    ...mapGetters([
      'otherinfo'
    ])
  },
  data() {
    return {
      loading: true,
      // 表单项
      printers: [],
      shipNo: '',
      cargoNo: '',
      printSetOrderVisible: false,
      printSetLiVisible: false,
      printLoadInfoVisible: false,
      printContractVisible: false,
      nochange: true,
      tooltip1: false,
      tooltip2: false,
      tooltip3: false,
      fieldSetup: [],
      activeNames: ['setup1', 'setup2', 'setup3', 'setup4', 'setup5', 'setup6', 'setup7', 'setup8', 'setup9'],
      shipField: [{
          key: 'shipFromCityName',
          value: '0',
          name: '发站'
        },
        {
          key: 'shipToOrgid',
          value: '0',
          name: '目的网点'
        },
        {
          key: 'shipGoodsSn',
          value: '0',
          name: '货号'
        },
        {
          key: 'shipSenderId',
          value: '0',
          name: '发货方'
        },
        {
          key: 'shipSenderName',
          value: '0',
          name: '发货人'
        },
        {
          key: 'shipSenderMobile',
          value: '0',
          name: '发货人电话'
        },
        {
          key: 'shipSenderAddress',
          value: '0',
          name: '发货地址'
        },
        {
          key: 'shipReceiverId',
          value: '0',
          name: '收货方'
        },
        {
          key: 'shipReceiverName',
          value: '0',
          name: '收货人'
        },
        {
          key: 'shipReceiverMobile',
          value: '0',
          name: '收货人电话'
        },
        {
          key: 'shipReceiverAddress',
          value: '0',
          name: '收货地址'
        },
        {
          key: 'cargoWeight',
          value: '0',
          name: '重量'
        },
        {
          key: 'cargoVolume',
          value: '0',
          name: '体积'
        },
        {
          key: 'cargoPack',
          value: '0',
          name: '包装'
        },
        {
          key: 'brokerageFee',
          value: '0',
          name: '回扣'
        },
        {
          key: 'deliveryFee',
          value: '0',
          name: '送货费'
        },

        /*         {
                  key: 'productPrice',
                  value: '0',
                  name: '声明价值'
                }, */
        {
          key: 'insuranceFee',
          value: '0',
          name: '保险费'
        },
        {
          key: 'handlingFee',
          value: '0',
          name: '装卸费'
        },
        {
          key: 'packageFee',
          value: '0',
          name: '包装费'
        },
        {
          key: 'pickupFee',
          value: '0',
          name: '提货费'
        },
        {
          key: 'amountFee',
          value: '0',
          name: '件数单价'
        },
        {
          key: 'weightFee',
          value: '0',
          name: '重量单价'
        },
        {
          key: 'volumeFee',
          value: '0',
          name: '体积单价'
        },
        {
          key: 'shipReceiptSn',
          value: '0',
          name: '回单号'
        },
        {
          key: 'shipCustomerNumber',
          value: '0',
          name: '客户单号'
        },
        {
          key: 'shipUserid',
          value: '0',
          name: '业务员'
        }
      ],
      vouchers: [{
        value: '1',
        label: '需要'
      }, {
        value: '2',
        label: '不需要'
      }],
      deliverContacts: [{
        value: 'driver',
        label: '司机名称'
      }, {
        value: 'carno',
        label: '车牌号'
      }],
      form: {
        'uploadLogo': {
          'logoUrl': ''
        },
        'financeSetting': {
          'voucher': '2'
        },
        'grossMargin': {
          'shipFeeAmount': '1',
          'brokerageFee': '1'
        },
        'listTemplate': {
          'templateSign': '1'
        },
        'printSetting': {
          'ship': '0',
          'label': '0',
          'inventory': '0'
        },
        'shipNo': {
          'manualInput': '0',
          'companyNumberAutoIncrementSign': '0',
          'companyNumberAutoIncrementByTwoYMSign': '1',
          'companyNumberAutoIncrementByTwoYMDSign': '0',
          'systemNumberImmutable': '0',
          'companyNumberAutoIncrementValue': '',
          'companyNumberAutoIncrementByTwoYMValue': '',
          'companyNumberAutoIncrementByTwoYMDValue': ''
        },
        'shipPermission': {
          'onlyInvalidOwnShip': '0',
          'onlyUpdateOwnShip': '0',
          'onlyDeleteOwnShip': '0',
          'selectOrderSetting': '1', // 是否可查询全公司运单
          'controlgoodsVisibleRule': '1' // 其他网点是否可看控货信息
        },
        'module': 'order',
        'cargoNo': {
          'orgIdAndShipNoAndNumberOfUnitsSign': '0',
          'manualInput': '0',
          'systemNumberNotAllowUpdate': '0',
          'orgIdAndShipNoAndNumberOfUnitsValue': '',
          'shipNoAndNumberOfUnits': '1'
        },
        'shipFee': {
          'customsFee': '0',
          'commissionFee': '0',
          'handlingFee': '1',
          'otherfeeIn': '0',
          'brokerageFee': '1',
          'goupstairsFee': '0',
          'taxes': '0',
          'shipFee': '1',
          'housingFee': '0',
          'deliveryFee': '1',
          'insuranceFee': '0',
          'forkliftFee': '1',
          'pickupFee': '1',
          'stampTax': '0',
          // 'productPrice': '0',
          'packageFee': '0'
        },
        'shipPageFunc': {
          'shipFieldValue': {
            'cargoPack': '0',
            'shipReceiptSn': '0',
            'shipGoodsSn': '0',
            'amountFee': '0',
            'shipToOrgid': '0',
            'handlingFee': '0',
            'brokerageFee': '0',
            'volumeFee': '0',
            'weightFee': '0',
            'shipFromCityName': '0',
            'cargoVolume': '0',
            'shipCustomerNumber': '0',
            'shipSenderId': '0',
            'shipSenderAddress': '0',
            'shipUserid': '0',
            'deliveryFee': '0',
            'insuranceFee': '0',
            'shipReceiverId': '0',
            'shipReceiverName': '0',
            'shipReceiverMobile': '0',
            'shipSenderName': '0',
            'shipSenderMobile': '0',
            'cargoWeight': '0',
            'pickupFee': '0',
            'shipReceiverAddress': '0',
            // 'productPrice': '0',
            'packageFee': '0'
          },
          insurancePremiumIsDeclaredValue: 3,
          'toCityByAdministrativeRegion': '0',
          'notifyCargoRule': '',
          'shipTimeRule': '',
          'shipFieldSign': '1',
          orderName: '收发货凭证', // 开单页面标题
          decimalPlaces: '2' // 0,1,2
        },
        'loadSetting': {
          'carrier': 'driver'
        },
        'orgid': 1
      }
    }
  },
  mounted() {
    this.initOrder()
  },
  methods: {
    infoFinance() { // 初始化财务设置
      const params = {
        orgid: this.otherinfo.orgid,
        type: '',
        module: 'finance'
      }
      return getAllSetting(params).then(data => {
        console.log('financeSetting', data)
        if (data.financeSetting) { // 老公司没有这个设置 所以要判断一下
          this.$set(this.form.financeSetting, 'voucher', data.financeSetting.voucher)
        }
        if (data.grossMargin) {
          for (let item in data.grossMargin) {
            this.$set(this.form.grossMargin, item, data.grossMargin[item])
          }
        }
        this.loading = false
      }).catch((err) => {
        this.loading = false
        this._handlerCatchMsg(err)
      })
    },
    initBase() { // 系统logo
      const params = {
        orgid: this.otherinfo.orgid,
        type: 'uploadLogo',
        module: 'base'
      }
      return getAllSetting(params).then(data => {
        console.log('uploadLogo', data)
        if (data.uploadLogo) {
           data.uploadLogo.logoUrl = data.uploadLogo.logoUrl ==='null' ? '' : data.uploadLogo.logoUrl
          this.$set(this.form.uploadLogo, 'logoUrl',data.uploadLogo.logoUrl)
        }
        this.loading = false
      }).catch((err) => {
        this.loading = false
        this._handlerCatchMsg(err)
      })
    },
    initOrder() {
      this.getInfo('order').then(() => {
        this.setShipNo()
        this.setCargoNo()
        this.initField()
        this.initPrinter()
        this.infoFinance()
        this.initBase()
        // 加载好后才可以提交数据
        this.nochange = false
      })
    },
    initPrinter() {
      this.printers = Object.assign([], CreatePrinterList())
      for (const item in this.printers) {
        this.printers[item] = this.printers[item].replace(/%^/g, '\\')
      }
    },
    doAction(type) {
      switch (type) {
        case 'printSetOrder': // 打印运单设置
          this.printSetOrder()
          // this.$message({ type: 'warning', message: '功能尚在开发中' })
          break
        case 'printSetLi': // 打印标签设置
          this.printSetLi()
          // this.$message({ type: 'warning', message: '功能尚在开发中' })
          break
        case 'printLoadInfo': // 打印配载单设置
          this.printLoadInfoVisible = true
          // this.$message({ type: 'warning', message: '功能尚在开发中' })
          break
        case 'printContract': // 打印合同设置
          this.printContractVisible = true
          // this.$message({ type: 'warning', message: '功能尚在开发中' })
          break
      }
    },
    printSetOrder() {
      this.printSetOrderVisible = true
    },
    printSetLi() {
      this.printSetLiVisible = true
    },
    closePrintSetOrder() {
      this.printSetOrderVisible = false
    },
    closePrintSetLi() {
      this.printSetLiVisible = false
    },
    getInfo(module, type = '') {
      return getAllSetting({
        orgid: this.otherinfo.orgid,
        type,
        module
      }).then(data => {
        this.form = data
        this.form.shipPageFunc.shipTimeRule = parseInt(this.form.shipPageFunc.shipTimeRule, 10)
        this.form.shipPageFunc.notifyCargoRule = parseInt(this.form.shipPageFunc.notifyCargoRule, 10)
        for (const item in this.form.printSetting) {
          this.form.printSetting[item] = this.form.printSetting[item].replace(/%\^/g, '\\')
          console.log(this.form.printSetting[item])
        }
        this.$set(this.form, 'financeSetting', {
          voucher: ''
        })
        this.$set(this.form, 'grossMargin', {
          shipFeeAmount: '1',
          brokerageFee: '1'
        })
        this.$set(this.form, 'uploadLogo', {
          logoUrl: ''
        })

        if (!this.form.loadSetting) { // 老公司没有这个设置 所以要判断一下
          this.$set(this.form, 'loadSetting', {
            carrier: ''
          })
        }
      }).catch((err) => {
        this.loading = false
        this._handlerCatchMsg(err)
      })
    },
    setShipNo() {
      if (this.form.shipNo.manualInput === '1') {
        this.shipNo = '1'
      }
      if (this.form.shipNo.companyNumberAutoIncrementByTwoYMDSign === '1') {
        this.shipNo = '2'
      }
      if (this.form.shipNo.companyNumberAutoIncrementByTwoYMSign === '1') {
        this.shipNo = '3'
      }
      if (this.form.shipNo.companyNumberAutoIncrementSign === '1') {
        this.shipNo = '4'
      }
    },
    setCargoNo() {
      if (this.form.cargoNo.manualInput === '1') {
        this.cargoNo = '1'
      }
      if (this.form.cargoNo.shipNoAndNumberOfUnits === '1') {
        this.cargoNo = '2'
      }
      if (this.form.cargoNo.orgIdAndShipNoAndNumberOfUnitsSign === '1') {
        this.cargoNo = '3'
      }
    },
    resetShipNo() {
      this.form.shipNo.manualInput = '0'
      this.form.shipNo.companyNumberAutoIncrementByTwoYMDSign = '0'
      this.form.shipNo.companyNumberAutoIncrementByTwoYMSign = '0'
      this.form.shipNo.companyNumberAutoIncrementSign = '0'
    },
    resetCargoNo() {
      this.form.cargoNo.manualInput = '0'
      this.form.cargoNo.shipNoAndNumberOfUnits = '0'
      this.form.cargoNo.orgIdAndShipNoAndNumberOfUnitsSign = '0'
    },
    saveData() { // 保存
      this.loading = true
      // 转译一下打印的\\字符
      const formPrintSetting = Object.assign({}, this.form.printSetting)
      for (const item in formPrintSetting) {
        formPrintSetting[item] = formPrintSetting[item].replace(/\\/g, '%^')
      }
      const form = Object.assign({}, this.form)
      form.printSetting = Object.assign({}, formPrintSetting)


      const finance = {
        orgid: form.orgid,
        module: 'finance',
        financeSetting: form.financeSetting,
        grossMargin: form.grossMargin
      }
      const base = {
        orgid: form.orgid,
        module: 'base',
        upLoadLogo: form.uploadLogo
      }
      console.log('saveData', form, finance, form.shipPageFunc.insurancePremiumIsDeclaredValue)
      if (!form.shipPageFunc.insurancePremiumIsDeclaredValue || form.shipPageFunc.insurancePremiumIsDeclaredValue === 'null') {
        form.shipPageFunc.insurancePremiumIsDeclaredValue = 3
      }
      this.putSetting(form).then(() => {
        this.putSetting(finance).then(() => {
          this.putSetting(base).then(() => {
            this.initOrder()
            this.loading = false
            // this.infoFinance()
          })
        })
      })
    },
    putSetting(query) {
      return putSetting(query).then(res => {
        this.otherinfo.systemSetup = this.form
        console.log('other.systemSetup', this.otherinfo.systemSetup)
        this.$message({
          message: '保存成功',
          type: 'success'
        })
      }).catch((err) => {
        this.loading = false
        this._handlerCatchMsg(err)
      })
    },
    changeSystem(obj) {
      if (obj.ship) {
        this.$set(this.form.printSetting, 'ship', obj.ship)
        this.saveData()
      }
      if (obj.label) {
        this.$set(this.form.printSetting, 'label', obj.label)
        this.saveData()
      }
    },
    initField() {
      this.fieldSetup = []
      for (const i in this.form.shipPageFunc.shipFieldValue) {
        if (this.form.shipPageFunc.shipFieldValue[i] === '1') {
          this.fieldSetup.push(i)
        }
      }
    },
    setField() {
      for (const i in this.form.shipPageFunc.shipFieldValue) {
        if (this.fieldSetup.indexOf(i) !== -1) {
          this.form.shipPageFunc.shipFieldValue[i] = '1'
        } else {
          this.form.shipPageFunc.shipFieldValue[i] = '0'
        }
      }
    },
    downloadFile(type) { // 下载系统所需插件
      window.open(downloadFile(type))
    }
  },
  watch: {
    fieldSetup(newVal) {
      this.setField()
    },
    shipNo(newVal) {
      // 先重置
      this.resetShipNo()
      switch (newVal) {
        case '1':
          this.form.shipNo.manualInput = '1'
          break
        case '2':
          this.form.shipNo.companyNumberAutoIncrementByTwoYMDSign = '1'
          break
        case '3':
          this.form.shipNo.companyNumberAutoIncrementByTwoYMSign = '1'
          break
        case '4':
          this.form.shipNo.companyNumberAutoIncrementSign = '1'
          break
      }
    },
    cargoNo(newVal) {
      // 先重置
      this.resetCargoNo()
      switch (newVal) {
        case '1':
          this.form.cargoNo.manualInput = '1'
          break
        case '2':
          this.form.cargoNo.shipNoAndNumberOfUnits = '1'
          break
        case '3':
          this.form.cargoNo.orgIdAndShipNoAndNumberOfUnitsSign = '1'
          break
      }
    }
  }
}

</script>
<style lang="scss">
.system-setup-page {
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;

  .system-setup-table {
    flex-grow: 1;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 10px 10px 0 10px;

    .el-collapse {
      border: 1px solid #E0E0E0;
    }

    .el-collapse-item__header {
      background: #E9F3FA;
      text-align: center;
      height: 42px;
      line-height: 42px;
      font-size: 16px;
      color: #333;
      position: relative;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .el-collapse-item__arrow {
      position: absolute;
      left: 10px;
      top: 5px;
    }
    .el-collapse-item__content {
      padding-bottom: 0;
    }

    .el-form-item__content>.el-input {
      width: 100px;
    }

    .el-form-item--mini.el-form-item {
      margin-bottom: 5px;
    }

    .setup-table {
      margin: 0 0 10px;
      min-height: 58px;
      display: flex;

      .setup-left {
        width: 144px;
        text-align: center;
        background: #EBEBEB;
        padding-top: 20px;
        font-size: 14px;
        color: #333;
        font-weight: bold;
      }

      .setup-right {
        padding: 10px 16px;
        flex: 1;
        .box_container_2 {
          .el-upload-dragger {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    .setup-table-finance {
      .el-form--inline .el-form-item {
        margin-right: 5px;
      }
      .el-checkbox__label {
        padding-left: 5px;
      }
    }
  }

  .system-setup-footer {
    height: 70px;
    text-align: center;
  }
}

.theSelectfirst {
  height: 70px;
}

.selectHeader {
  color: #999;
  clear: both;
  border-bottom: 1px solid #999;
  margin-bottom: 10px;
  height: 34px;
}

.el-select-dropdown__item.selected {
  .selectHeader {
    font-weight: normal;
  }
}

</style>
