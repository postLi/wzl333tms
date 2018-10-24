<template>
  <!---->
  <div class="carrierCreat_lll" v-loading="loading">
    <div class="sTop">
      <el-form :inline="true" :size="btnsize" label-position="right" label-width="100px"
               class="short_searchinfo clearfix" ref="formName1" :model="searchTitle">

        <div class="sTitle">
          <el-form-item label="">

            <el-tooltip class="item" effect="dark" placement="top" :enterable="false" :manual="true" :value="tooltip"
                        tabindex="-1">
              <div slot="content">双击可修改对账单名称</div>
              <div class="showBg" @dblclick="(disabledName = false) ; (tooltip = false)" @mouseover=" tooltip = true" @mouseenter=" tooltip = true" @mouseleave="tooltip = false" v-if="disabledName">{{checkBillName}}</div>
              <el-input v-else v-model.trim="checkBillName"
                         :disabled="disabledName"
                        auto-complete="off" 
                        @blur="tooltip = false;disabledName = true"
                        
                        @mouseleave.native="tooltip = false;disabledName = true"></el-input>

            </el-tooltip>
          </el-form-item>
        </div>
        <div class="sPayType">
          <el-form-item label="中转付款方式" prop="">
            <selectType v-model="searchTitle.paymentId" type="payment_type" clearable
                        size="mini" class=""></selectType>
          </el-form-item>
        </div>
        <div class="sDate">
          <el-date-picker
            v-model="searchCreatTime"
            :default-value="defaultTime"
            type="daterange"
            align="right"
            size="mini"
            value-format="yyyy-MM-dd"
            start-placeholder="开始日期"
            :picker-options="pickerOptions2"
            end-placeholder="结束日期">
          </el-date-picker>
          <el-form-item class="">
            <el-button type="primary" @click="onSearch">查询</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <div class="sMessageTop">
      <el-form :inline="true" :size="btnsize" label-position="center" :model="messageInfo" label-width="100px"
               class=" clearfix" ref="formName2" :rules="rules">
        <ul>
          <li>
            <el-form-item label="承运商名称">
              <el-input v-model="messageInfo.memberName" auto-complete="off" disabled></el-input>
              </el-form-item>
                </li>
          <li>
            <el-form-item label="业务负责人">
              <el-input v-model="messageInfo.memberPerson" auto-complete="off" clearable></el-input>
            </el-form-item>
          </li>
          <li>
            <el-form-item label="联系方式" prop="memberPersonPhone">
              <el-input v-model="messageInfo.memberPersonPhone" auto-complete="off" :maxlength="11" clearable></el-input>
            </el-form-item>
          </li>
          <li>
            <el-form-item label="对账单编号">
              <el-input v-model="messageInfo.checkBillCode" auto-complete="off" clearable></el-input>
            </el-form-item>
          </li>


        </ul>
        <ul>
          <li>
            <el-form-item label="承运商编号">
              <el-input v-model="messageInfo.memberCode" auto-complete="off" disabled></el-input>
            </el-form-item>
          </li>
          <li>
            <el-form-item label="开始时间">
              <el-input v-model="messageInfo.checkStartTime" auto-complete="off" disabled></el-input>
            </el-form-item>
          </li>
          <li>
            <el-form-item label="结束时间">
              <el-input v-model="messageInfo.checkEndTime" auto-complete="off" disabled></el-input>
            </el-form-item>
          </li>
          <li>
            <el-form-item label="结算方式">
              <el-input v-model="messageInfo.settlementType" auto-complete="off" :maxlength="8" clearable></el-input>
            </el-form-item>
          </li>
        </ul>
        <ul>
          <li>
            <el-form-item label="账户账号" prop="bankAccount">
              <el-input v-model="messageInfo.bankAccount" auto-complete="off" :maxlength="20" clearable></el-input>
            </el-form-item>
          </li>
          <li>
            <el-form-item label="账户开户行">
            <el-input v-model="messageInfo.bankName" auto-complete="off" :maxlength="15" clearable></el-input>
            </el-form-item>
          </li>
          <li>
            <el-form-item label="财务负责人">
              <el-input v-model="messageInfo.financialOfficer" auto-complete="off" :maxlength="10" clearable></el-input>
            </el-form-item>
          </li>
          <li>
            <el-form-item label="联系方式" prop="financialOfficerPhone">
              <el-input v-model="messageInfo.financialOfficerPhone" auto-complete="off" :maxlength="11"></el-input>
            </el-form-item>
          </li>
        </ul>
        <ul>
          <li>
            <el-form-item label="支付宝">
            <el-input v-model="messageInfo.alipayAccount" auto-complete="off" :maxlength="30" clearable></el-input>
            </el-form-item>
          </li>
          <li>
            <el-form-item label="微信" class="sWetPay">
            <el-input v-model="messageInfo.wechatAccount" auto-complete="off" :maxlength="30" clearable></el-input>
            </el-form-item>
          </li>
        </ul>
      </el-form>


    </div>
    <div class="sMessageCont">
      <div class="sMessageCont_info">
        <p>未收清单</p>
      </div>
      <div class="info_tab">
        <el-table
          ref="multipleTable"
          :data="dealInfo"
          stripe
          border
          show-summary
          :summary-method="getSummaries"
          @row-dblclick="getDbClick"
          @row-click="clickDetails"
          tooltip-effect="dark"
          :default-sort="{prop: 'id', order: 'ascending'}"
          style="width: 100%">

          <el-table-column
            fixed
            sortable
            label="序号"
            width="60">
            <template slot-scope="scope">{{ scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column
            fixed
            sortable
            label=""
            width="60">
            <template slot-scope="scope">
              <span class="deletebtn" @click="iconDeleteDeal(scope.$index)"><icon-svg icon-class="delete_lll"
                                                                                      fill="red"></icon-svg></span>
            </template>
          </el-table-column>
          <el-table-column
            fixed
            sortable
            prop="createTime"
            width="160"
            label="中转时间">
          </el-table-column>
          <el-table-column
            prop="shipSn"
            width="130"
            sortable
            label="运单号">
          </el-table-column>
          <el-table-column
            prop="oddNumbers"
            sortable
            width="150"
            label="中转单号">
          </el-table-column>
          <el-table-column
            prop="shipFromCityName"
            sortable
            width="120"
            label="出发城市">
          </el-table-column>
          <el-table-column
            prop="signStatusName"
            sortable
            width="120"
            label="签收状态">
          </el-table-column>
          <el-table-column
            prop="shipToCityName"
            sortable
            width="130"
            label="到达城市">
          </el-table-column>
          <el-table-column
            sortable
            prop="cargoName"
            width="150"
            label="货品名">
          </el-table-column>
          <el-table-column
            prop="cargoAmount"
            label="件数"
            width="100"
            sortable
          >
          </el-table-column>

          <el-table-column
            prop="shipDeliveryMethod"
            sortable
            width="100"
            label="交接方式">
          </el-table-column>
          <el-table-column
            prop="paymentMethod"
            label="中转付款方式"
            width="110"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="shipArrivepayFee"
            label="到付款"
            width="150"
            sortable
          >
          </el-table-column>

          <el-table-column
            prop="agencyFund"
            label="代收货款"
            width="150"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="totalFee"
            label="小计"
            width="120"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="remark"
            label="备注"
            width="140"
            sortable
          >
            <template slot-scope="scope">
              <el-input v-model="dealInfo[scope.$index].remark" auto-complete="off" :maxlength="30"></el-input>
            </template>
          </el-table-column>


        </el-table>
      </div>
      <div class="sMessageCont_info">
        <p>未付清单</p>
      </div>
      <div class="info_tab">
        <!--@selection-change="getSelection"-->
        <el-table
          ref="multipleTable"
          :data="dealPayInfo"
          stripe
          border
          show-summary
          :summary-method="getSummaries"
          @row-dblclick="getDbClick"
          @row-click="clickDetails"
          tooltip-effect="dark"
          :default-sort="{prop: 'id', order: 'ascending'}"
          style="width: 100%">
          <!--<el-table-column-->
          <!--fixed-->
          <!--sortable-->
          <!--type="selection"-->
          <!--width="50">-->
          <!--</el-table-column>-->
          <el-table-column
            fixed
            sortable
            label="序号"
            width="60">
            <template slot-scope="scope">{{ scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column
            fixed
            sortable
            label=""
            width="60">
            <template slot-scope="scope">
              <span class="deletebtn" @click="iconDeleteDealPay(scope.$index)"><icon-svg icon-class="delete_lll"
                                                                                         fill="red"></icon-svg></span>
            </template>
            <!--<template slot-scope="scope">-->
            <!--<span @click="iconDeleteDealPay(scope.$index)"><icon-svg icon-class="delete_lll" ></icon-svg></span>-->
            <!--</template>-->
          </el-table-column>
          <el-table-column
            fixed
            sortable
            prop="createTime"
            width="160"
            label="中转时间">
          </el-table-column>
          <el-table-column
            prop="shipSn"
            width="140"
            sortable
            label="运单号">
          </el-table-column>
          <el-table-column
            prop="oddNumbers"
            sortable
            width="120"
            label="中转单号">
          </el-table-column>
          <el-table-column
            prop="signStatusName"
            sortable
            width="120"
            label="签收状态">
          </el-table-column>
          <el-table-column
            prop="shipFromCityName"
            sortable
            width="100"
            label="出发城市">
          </el-table-column>
          <el-table-column
            prop="shipToCityName"
            sortable
            width="100"
            label="到达城市">
          </el-table-column>
          <el-table-column
            sortable
            prop="cargoName"
            width="140"
            label="货品名">
          </el-table-column>
          <el-table-column
            prop="cargoAmount"
            label="件数"
            width="80"
            sortable
          >
          </el-table-column>

          <el-table-column
            prop="shipDeliveryMethod"
            sortable
            width="90"
            label="交接方式">
          </el-table-column>
          <el-table-column
            prop="paymentMethod"
            label="中转付款方式"
            width="110"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="transferCharge"
            label="中转费"
            width="100"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="deliveryExpense"
            label="中转送货费"
            width="110"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="transferOtherFee"
            label="中转其他费"
            width="110"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="totalCost"
            label="中转费合计"
            width="110"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="remark"
            label="备注"
            width="130"
            sortable
          >
            <template slot-scope="scope">
              <el-input v-model="dealPayInfo[scope.$index].remark" auto-complete="off" :maxlength="30"></el-input>
            </template>
          </el-table-column>


        </el-table>
      </div>
      <div class="sMessageCont_info">
        <p>已收清单(本结算期内)</p>
      </div>
      <div class="info_tab">
        <!--@selection-change="getSelection"-->
        <el-table
          ref="multipleTable"
          :data="alreadyInfo"
          stripe
          border
          show-summary
          :summary-method="getSummaries"
          @row-dblclick="getDbClick"
          @row-click="clickDetails"
          tooltip-effect="dark"
          :default-sort="{prop: 'id', order: 'ascending'}"
          style="width: 100%">
          <!--<el-table-column-->
          <!--fixed-->
          <!--sortable-->
          <!--type="selection"-->
          <!--width="50">-->
          <!--</el-table-column>-->
          <el-table-column
            fixed
            sortable
            label="序号"
            width="60">
            <template slot-scope="scope">{{ scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column
            fixed
            sortable
            label=""
            width="60">
            <template slot-scope="scope">
              <span class="deletebtn" @click="iconDeleteAlready(scope.$index)"><icon-svg icon-class="delete_lll"
                                                                                         fill="red"></icon-svg></span>
            </template>
            <!--<template slot-scope="scope">-->
            <!--<span @click="iconDeleteAlready(scope.$index)"><icon-svg icon-class="delete_lll" ></icon-svg></span>-->
            <!--</template>-->
          </el-table-column>
          <el-table-column
            fixed
            sortable
            prop="createTime"
            width="160"
            label="中转时间">
          </el-table-column>
          <el-table-column
            prop="shipSn"
            width="130"
            sortable
            label="运单号">
          </el-table-column>
          <el-table-column
            prop="oddNumbers"
            sortable
            width="150"
            label="中转单号">
          </el-table-column>
          <el-table-column
            prop="signStatusName"
            sortable
            width="120"
            label="签收状态">
          </el-table-column>
          <el-table-column
            prop="shipFromCityName"
            sortable
            width="120"
            label="出发城市">
          </el-table-column>
          <el-table-column
            prop="shipToCityName"
            sortable
            width="130"
            label="到达城市">
          </el-table-column>
          <el-table-column
            sortable
            prop="cargoName"
            width="150"
            label="货品名">
          </el-table-column>
          <el-table-column
            prop="cargoAmount"
            label="件数"
            width="100"
            sortable
          >
          </el-table-column>

          <el-table-column
            prop="shipDeliveryMethod"
            sortable
            width="100"
            label="交接方式">
          </el-table-column>
          <el-table-column
            prop="paymentMethod"
            label="中转付款方式"
            width="110"
            sortable
          >
          </el-table-column>
          <!--<el-table-column-->
            <!--prop="abnormalType"-->
            <!--label="异常类型"-->
            <!--width="100"-->
            <!--sortable-->
          <!--&gt;-->
          <!--</el-table-column>-->
          <!--<el-table-column-->
            <!--prop="abnormalAmount"-->
            <!--label="异常件数"-->
            <!--width="90"-->
            <!--sortable-->
          <!--&gt;-->
          <!--</el-table-column>-->
          <!--<el-table-column-->
            <!--prop="registerFee"-->
            <!--label="异常费用"-->
            <!--width="100"-->
            <!--sortable-->
          <!--&gt;-->
          <!--</el-table-column>-->
          <el-table-column
            prop="shipArrivepayFee"
            label="到付款"
            width="150"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="agencyFund"
            label="代收货款"
            width="150"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="totalFee"
            label="小计"
            width="120"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="remark"
            label="备注"
            width="140"
            sortable
          >
            <template slot-scope="scope">
              <el-input v-model="alreadyInfo[scope.$index].remark" auto-complete="off" :maxlength="30"></el-input>
            </template>
          </el-table-column>


        </el-table>
      </div>

      <div class="sMessageCont_info">
        <p>已付清单(本结算期内)</p>
      </div>
      <div class="info_tab">
        <!--@selection-change="getSelection"-->
        <el-table
          ref="multipleTable"
          :data="alreadyPayInfo"
          stripe
          border
          show-summary
          :summary-method="getSummaries"
          @row-dblclick="getDbClick"
          @row-click="clickDetails"
          tooltip-effect="dark"
          :default-sort="{prop: 'id', order: 'ascending'}"
          style="width: 100%">
          <el-table-column
            fixed
            sortable
            label="序号"
            width="60">
            <template slot-scope="scope">{{ scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column
            fixed
            sortable
            label=""
            width="60">
            <template slot-scope="scope">
              <span class="deletebtn" @click="iconDeleteAlreadyPay(scope.$index)"><icon-svg icon-class="delete_lll"
                                                                                            fill="red"></icon-svg></span>
            </template>
            <!--<template slot-scope="scope">-->
            <!--<span @click="iconDeleteAlreadyPay(scope.$index)"><icon-svg icon-class="delete_lll" ></icon-svg></span>-->
            <!--</template>-->
          </el-table-column>
          <el-table-column
            fixed
            sortable
            prop="createTime"
            width="160"
            label="中转时间">
          </el-table-column>
          <el-table-column
            prop="shipSn"
            width="140"
            sortable
            label="运单号">
          </el-table-column>
          <el-table-column
            prop="oddNumbers"
            sortable
            width="120"
            label="中转单号">
          </el-table-column>
          <el-table-column
            prop="signStatusName"
            sortable
            width="120"
            label="签收状态">
          </el-table-column>
          <el-table-column
            prop="shipFromCityName"
            sortable
            width="100"
            label="出发城市">
          </el-table-column>
          <el-table-column
            prop="shipToCityName"
            sortable
            width="100"
            label="出发城市">
          </el-table-column>
          <el-table-column
            sortable
            prop="cargoName"
            width="140"
            label="货品名">
          </el-table-column>
          <el-table-column
            prop="cargoAmount"
            label="件数"
            width="80"
            sortable
          >
          </el-table-column>

          <el-table-column
            prop="shipDeliveryMethod"
            sortable
            width="90"
            label="交接方式">
          </el-table-column>
          <el-table-column
            prop="paymentMethod"
            label="中转付款方式"
            width="110"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="transferCharge"
            label="中转费"
            width="100"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="deliveryExpense"
            label="中转送货费"
            width="110"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="transferOtherFee"
            label="中转其他费"
            width="110"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="totalCost"
            label="中转费合计"
            width="110"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="remark"
            label="备注"
            width="130"
            sortable
          >
            <template slot-scope="scope">
              <el-input v-model="alreadyPayInfo[scope.$index].remark" auto-complete="off" :maxlength="30"></el-input>
            </template>
          </el-table-column>


        </el-table>
      </div>
    </div>
    <div class="sBottom">
      <div class="sMessageBut">


        <el-form :inline="true" :size="btnsize" label-position="center" :model="messageButtonInfo" label-width="90px"
                 class="sButtom_searchinfo clearfix" ref="formName3" :rules="btnRule">
          <el-form-item label="备注">
            <el-input :maxlength="300" v-model="messageButtonInfo.remark" auto-complete="off"></el-input>
          </el-form-item>
          <div class="sMessageCont_info">
            <p>若对以上对账 明细有疑问，请及时联系我们，我们的联系信息如下</p>
          </div>


          <el-form-item label="公司名称">
            <el-input v-model="messageButtonInfo.companyName" auto-complete="off" clearable></el-input>
          </el-form-item>
          <el-form-item label="业务负责人">
            <el-input v-model="messageButtonInfo.orgBusinessOfficer" auto-complete="off" clearable></el-input>
          </el-form-item>
          <el-form-item label="联系方式" prop="orgBusinessOfficerPhone">
            <el-input v-model="messageButtonInfo.orgBusinessOfficerPhone" auto-complete="off" clearable></el-input>
          </el-form-item>
          <el-form-item label="财务负责人">
            <el-input v-model="messageButtonInfo.orgFinancialOfficer" auto-complete="off" :maxlength="10"
                      clearable></el-input>
          </el-form-item>
          <el-form-item label="财务联系电话" prop="orgFinancialOfficerPhone">
            <el-input v-model="messageButtonInfo.orgFinancialOfficerPhone" auto-complete="off" :maxlength="11"
                      clearable></el-input>
          </el-form-item>
          <el-form-item label="时间">
            <el-date-picker
              v-model="messageButtonInfo.createTime"
              type="date"
              placeholder="选择日期">
            </el-date-picker>

          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="sBottomBut">
      <div>
        <!-- <el-button >打印</el-button> -->
        <el-button @click="export1">导出</el-button>
        <el-button @click="canBtn">取消</el-button>
        <el-button @click="submit('formName')" type="primary">保存</el-button>
      </div>
    </div>
    <SaveDialog :popVisible.sync="visibleDialog" :dotInfo="form" @close="oopenVisibleDialog" :tota="tota"
                :sendId="sendId" :memberId="messageInfo.memberId" @success="fetchList"
                :urlId="$route.query.urlId" :popKey="popKey"></SaveDialog>
  </div>
</template>

<script>
  import { pickerOptions2, parseTime, objectMerge2, tmsMath } from '@/utils/'
  import { REGEX } from '@/utils/validate'
  import { postCarrierinitialize, getCarrierCarrierdetail } from '@/api/finance/fin_carrier'
  import querySelect from '@/components/querySelect/index'
  import { mapGetters } from 'vuex'
  import SaveDialog from './saveDialog'
  import { SaveAsFileCarrier } from '@/utils/recLodopFuncs'
  import SelectType from '@/components/selectType/index'

  export default {
    components: {
      querySelect,
      SaveDialog,
      SelectType
    },
    data() {
      const validateMobile = (rule, value, callback) => {
        if (!REGEX.MOBILE.test(value) && value !== '') {
          callback(new Error('请输入正确的联系号码~'))
        } else {
          callback()
        }
      }
      return {
        tooltip: false,
        disabledName: true,
        rules: {
          'bankAccount': [
            // { trigger: 'change', validator: validateOnlyNum}
            { message: '只能输入数字', trigger: 'blur', pattern: REGEX.ONLY_NUMBER }
          ],
          'memberPersonPhone': [
            { trigger: 'change', validator: validateMobile }
          ],
          'financialOfficerPhone': [
            { message: '请输入正确手机号码', trigger: 'blur', pattern: REGEX.MOBILE }
          ]
        },
        btnRule: {
          'orgBusinessOfficerPhone': [
            { message: '请输入正确手机号码', trigger: 'blur', pattern: REGEX.MOBILE }
          ],
          'orgFinancialOfficerPhone': [
            { message: '请输入正确手机号码', trigger: 'blur', pattern: REGEX.MOBILE }
          ]
        },
        pickerOptions2: {
          shortcuts: pickerOptions2
        },
        searchCreatTime: [],
        defaultTime: [parseTime(+new Date() - 60 * 24 * 60 * 60 * 1000, '{y}-{m}-{d}'), parseTime(new Date(), '{y}-{m}-{d}')],
        searchForm: {},
        usersArr: [],
        messageArr: [],
        checkBillName: '',
        messageInfo: {
          orgName: '',
          memberId: '',
          orgId: '',
          companyId: '',
          memberIdType: '',
          memberCode: '',
          memberName: '',
          memberPersonPhone: '',
          memberPerson: '',
          checkBillCode: '',
          checkStartTime: '',
          checkEndTime: '',
          settlementType: '',
          bankAccount: '',
          bankName: '',
          financialOfficer: '',
          financialOfficerPhone: '',
          alipayAccount: '',
          wechatAccount: ''
        },
        messageButtonInfo: {
          companyName: '',
          orgBusinessOfficer: '', //
          orgBusinessOfficerPhone: '', //
          orgFinancialOfficer: '', //
          orgFinancialOfficerPhone: '', //
          createTime: '',
          remark: '',
          totalCount: ''
        },
        dealPayInfo: [],
        dealInfo: [],
        alreadyPayInfo: [],
        alreadyInfo: [],

        form: {
          tmsFinanceBillCheckDto: {
            checkBillName: ''
          },
          carrierDetailDtoList: []
        },
        // 总计
        tota: {
          dealtota: [],
          dealPaytota: [],
          alreadytota: [],
          alreadyPaytota: []
        },
        dealPayInfoData: [],
        dealInfoData: [],
        alreadyPayInfoData: [],
        alreadyInfoData: [],
        // 总计
        sendId: '',
        visibleDialog: false,
        loading: false,
        btnsize: 'mini',

        searchTitle: {
          carrierId: '', //
          paymentId: '', //
          startTime: '',
          endTime: ''
        },
        popKey: 0 // 用于刷新弹出框数据
      }
    },

    computed: {
      ...mapGetters([
        'otherinfo'
      ])
    },
    activated() {
      this.onSubmit()
    },
    mounted() {
      this.onSubmit()
    },
    methods: {
      export1() {
        this.sendData()
        SaveAsFileCarrier({
          data: objectMerge2({}, this.form),
          name: '新建对账'
        })
      },
      fetchList() {
        this.loading = true
        this.searchTitle.carrierId = this.$route.query.urlId ? this.$route.query.urlId : this.$route.query.id
        return postCarrierinitialize(this.searchTitle).then(data => {
          this.messageArr = data.tmsFinanceBillCheckDto
          this.infoMessage(this.messageArr)
          this.infoList()
          if (data.carrierDetailDtoList.length > 0) {
            data.carrierDetailDtoList.forEach((el, val) => {
              if (el.type === 1) {
                this.dealInfo.push(el)
              } else if (el.type === 2) {
                this.dealPayInfo.push(el)
                this.dealPayInfoData.push(el)
              } else if (el.type === 3) {
                this.alreadyInfo.push(el)
                this.alreadyInfoData.push(el)
              } else {
                this.alreadyPayInfo = []
                this.alreadyPayInfo.push(el)
                this.alreadyPayInfoData.push(el)
              }
            })
          } else {
            this.dealInfo = []
            this.dealPayInfo = []
            this.alreadyInfo = []
            this.alreadyPayInfo = []
          }
          this.loading = false
        }).catch(err => {
          this._handlerCatchMsg(err)
        })
      },
      modifyList() {
        this.loading = true
        this.searchTitle.carrierId = this.$route.query.id
        return getCarrierCarrierdetail(this.searchTitle.carrierId).then(res => {
          const data = res.data
          this.messageArr = data.tmsFinanceBillCheckDto
          this.infoMessage(this.messageArr)
          this.infoList()
          data.carrierDetailDtoList.forEach((el, val) => {
            if (el.type === 1) {
              this.dealInfo.push(el)
              this.dealInfoData.push(el)
            } else if (el.type === 2) {
              this.dealPayInfo.push(el)
              this.dealPayInfoData.push(el)
            } else if (el.type === 3) {
              this.alreadyInfo.push(el)
              this.alreadyInfoData.push(el)
            } else {
              this.alreadyPayInfo.push(el)
              this.alreadyPayInfoData.push(el)
            }
          })
          this.loading = false
        }).catch(err => {
          this._handlerCatchMsg(err)
        })
      },
      onSearch() {
        if (!this.searchCreatTime[0]) {
          this.searchCreatTime = this.defaultTime
        }

        const searchObj = {}
        searchObj.startTime = this.searchCreatTime ? this.searchCreatTime[0] + ' 00:00:00' : ''
        searchObj.endTime = this.searchCreatTime ? this.searchCreatTime[1] + ' 23:59:59' : ''
        this.infoSearchTime(searchObj.startTime, searchObj.endTime)
        this.fetchList()
        this.closeVisibleDialog()
      },
      onSubmit() {
        if (this.$route.query.tab === '承运商对账-创建对账') {
          this.searchCreatTime = this.defaultTime
          this.onSearch()
        } else {
          this.modifyList()
          this.sendId = this.$route.query.id
        }
      },
      // 保存 /////////////
      submit() {
        this.$refs['formName2'].validate((valid) => {
          if (valid) {
            this.$refs['formName3'].validate((valid) => {
              if (valid) {
                this.form.tmsFinanceBillCheckDto.checkBillName = this.checkBillName
                for (const i in this.messageInfo) {
                  this.form.tmsFinanceBillCheckDto[i] = this.messageInfo[i]
                }
                this.form.tmsFinanceBillCheckDto.checkStartTime = this.searchCreatTime[0]
                this.form.tmsFinanceBillCheckDto.checkEndTime = this.searchCreatTime[1]
                for (const i in this.messageButtonInfo) {
                  this.form.tmsFinanceBillCheckDto[i] = this.messageButtonInfo[i]
                }
                this.form.carrierDetailDtoList = []
                this.dealInfo.map(el => this.form.carrierDetailDtoList.push(el))
                this.dealPayInfo.map(el => this.form.carrierDetailDtoList.push(el))
                this.alreadyInfo.map(el => this.form.carrierDetailDtoList.push(el))
                this.alreadyPayInfo.map(el => this.form.carrierDetailDtoList.push(el))
                this.countTotal() // 计算合计
                if (!this.form.carrierDetailDtoList.length) {
                  this.$message({
                    message: '各款项不能为空~',
                    type: 'error'
                  })

                  this.closeVisibleDialog()
                  return false
                } else {
                  this.oopenVisibleDialog()
                }
              }
            })
          } else {
            return false
          }
        })
      },
      countTotal() {
        this.tota.dealtota = this.dealInfo ? this.dealInfo.map(el => {
          const a = {}
          a.totalFee = el.totalFee

          return a
        }) : []
        this.tota.dealPaytota = this.dealPayInfo ? this.dealPayInfo.map(el => {
          const a = {}
          a.totalFee = el.totalCost

          return a
        }) : []
        this.tota.alreadytota = this.alreadyInfo ? this.alreadyInfo.map(el => {
          const a = {}
          a.totalFee = el.totalFee
          return a
        }) : []
        this.tota.alreadyPaytota = this.alreadyPayInfo ? this.alreadyPayInfo.map(el => {
          const a = {}
          a.totalFee = el.totalCost
          return a
        }) : []
      },
      sendData() {
        this.form.tmsFinanceBillCheckDto.checkBillName = this.checkBillName
        for (const i in this.messageInfo) {
          this.form.tmsFinanceBillCheckDto[i] = this.messageInfo[i]
        }
        this.form.tmsFinanceBillCheckDto.checkStartTime = this.searchCreatTime[0]
        this.form.tmsFinanceBillCheckDto.checkEndTime = this.searchCreatTime[1]
        for (const i in this.messageButtonInfo) {
          this.form.tmsFinanceBillCheckDto[i] = this.messageButtonInfo[i]
        }
        this.form.carrierDetailDtoList = []
        this.dealInfo.map(el => this.form.carrierDetailDtoList.push(el))
        this.dealPayInfo.map(el => this.form.carrierDetailDtoList.push(el))
        this.alreadyInfo.map(el => this.form.carrierDetailDtoList.push(el))
        this.alreadyPayInfo.map(el => this.form.carrierDetailDtoList.push(el))
      },
      //
      canBtn() {
        this.$confirm('确定要取消对账单吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '保存成功!'
          })
          // this.$router.back(-1)
          if (this.$route.query.tab === '承运商对账-创建对账') {
            this.eventBus.$emit('replaceCurrentView', '/finance/reconciliation/carrier/detailTable?tab=承运商对账-对账明细&id=' + this.$route.query.id)
          } else {
            this.eventBus.$emit('replaceCurrentView', '/finance/reconciliation/carrier/detailTable?tab=承运商对账-对账明细&id=' + this.$route.query.urlId)
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          })
        })
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
      billNameOver() {
        this.delCont()
      },
      getSummaries(param) {
        const { columns, data } = param
        const sums = []
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '合计'
            return
          }
          if (index === 3 || index === 4 || index === 5 || index === 7) {
            sums[index] = ''
            return
          }
          const values = data.map(item => Number(item[column.property]))
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr)
              if (!isNaN(value)) {
                return tmsMath._add(prev, curr)
              } else {
                return prev
              }
            }, 0)
            sums[index] += ' '
          } else {
            sums[index] = ''
          }
        })

        return sums
      },

      iconDeleteDeal(index) {
        this.dealInfo = this.dealInfo.filter((el, inx) => {
          return inx !== index
        })
        this.countTotal()
        this.popKey = Math.random()
        this.delCont()
      },
      iconDeleteDealPay(index) {
        this.dealPayInfo = this.dealPayInfo.filter((el, inx) => {
          return inx !== index
        })
        this.countTotal()
        this.popKey = Math.random()
        this.delCont()
      },

      iconDeleteAlready(index) {
        this.alreadyInfo = this.alreadyInfo.filter((el, inx) => {
          return inx !== index
        })
        this.countTotal()
        this.popKey = Math.random()
        this.delCont()
      },
      iconDeleteAlreadyPay(index) {
        this.alreadyPayInfo = this.alreadyPayInfo.filter((el, inx) => {
          return inx !== index
        })
        this.countTotal()
        this.popKey = Math.random()
        this.delCont()
      },
      delCont() {
        this.$message({
          message: '删除成功~',
          type: 'success'
        })
      },
      infoList() {
        this.dealInfo = []
        this.dealInfoData = []
        this.dealPayInfo = []
        this.dealPayInfoData = []
        this.alreadyInfo = []
        this.alreadyInfoData = []
        this.alreadyPayInfoData = []
      },
      oopenVisibleDialog() {
        this.visibleDialog = true
      },
      closeVisibleDialog() {
        this.visibleDialog = false
      },
      infoMessage(item) {
        this.messageInfo.orgName = item.orgName
        this.messageInfo.memberName = item.memberName
        this.messageInfo.memberPersonPhone = item.memberPersonPhone
        this.messageInfo.memberPerson = item.memberPerson
        this.messageInfo.checkBillCode = item.checkBillCode
        this.messageInfo.settlementType = item.settlementType
        this.messageInfo.bankAccount = item.bankAccount
        this.messageInfo.bankName = item.bankName
        this.messageInfo.alipayAccount = item.alipayAccount
        this.messageInfo.wechatAccount = item.wechatAccount
        this.messageInfo.checkStartTime = item.checkStartTime
        this.messageInfo.checkEndTime = item.checkEndTime
        this.messageInfo.financialOfficer = item.financialOfficer
        this.searchCreatTime = this.defaultTime
        this.searchCreatTime[0] = item.checkStartTime
        this.searchCreatTime[1] = item.checkEndTime
        this.messageInfo.memberId = item.memberId
        this.messageInfo.orgId = item.orgId
        this.messageInfo.companyId = item.companyId
        this.messageInfo.memberIdType = item.memberIdType
        this.messageInfo.memberCode = item.memberCode
        this.messageButtonInfo.companyName = item.companyName
        this.messageButtonInfo.orgBusinessOfficer = item.orgBusinessOfficer
        this.messageButtonInfo.orgBusinessOfficerPhone = item.orgBusinessOfficerPhone
        this.messageButtonInfo.orgFinancialOfficer = item.orgFinancialOfficer
        this.messageButtonInfo.orgFinancialOfficerPhone = item.orgFinancialOfficerPhone
        this.messageButtonInfo.createTime = item.createTime
        this.messageButtonInfo.remark = item.remark
        this.messageButtonInfo.totalCount = item.totalCount
        this.checkBillName = item.checkBillName
      },
      infoSearchTime(startTime, endTime) {
        this.searchTitle.startTime = startTime
        this.searchTitle.endTime = endTime
      },
      clickDetails(row, event, column) {
        this.$refs.multipleTable.toggleRowSelection(row)
      },
      getDbClick(row, event) {
      }

    },
    getSelection(selection) {
      this.selected = selection
    }
  }
</script>

<style lang="scss">
  .carrierCreat_lll {
    margin: 0 10px;
    
    .el-table__footer-wrapper{
      td:nth-child(n+1){
        color: #fe0000;
      }
    }

    .sTop {
      .short_searchinfo {
        display: flex;
        flex-direction:row;
        padding: 20px 0 10px 0;
        .sTitle {
          flex: 1;
          text-align: center;
         .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item{
          margin-bottom: 0px;
          width: 100%;
          .el-form-item__content{
            min-width: 400px;
          }
         }
         .showBg{
            border-left-color: transparent;
            border-right-color: transparent;
            border-top-color: transparent;
            border-bottom: 3px double #c0c4cc;
            font-size: 18px;
            color: #333333;
            font-weight: 600;
            line-height: 1.3;
            max-width: 600px;
            min-width: 100px;
            text-align: center;
            display: inline-block;
          }
          /*showBg*/
          .el-tooltip.showBg {
            .el-input__inner {
              border-left-color: #c0c4cc;
              border-right-color: #c0c4cc;
              color: #fff;
              font-weight: 600;
              background: skyblue;
            }
          }
          .el-input__suffix {
            left: -20px;
            top: -10px;
          }
          .el-input--suffix .el-input__inner {
            padding-right: 0;
          }
          .el-input.is-disabled .el-input__inner {
            background-color: #fff;
          }

          /*/*showBg*/
          span {
            position: relative;
            top: -20px;
            left: 200px;
            font-size: 18px;
            color: #333333;
            font-weight: 600;
          }
          .el-input__inner {
            
            font-size: 18px;
            color: #333333;
            font-weight: 600;
            text-align: center;
             padding-left: 0;
            padding-right: 0;
          }

          .el-input__inner:focus {
            border-bottom-color: #c0c4cc;
          }
          .el-input {
           display: block;
            width: 600px;
          }
        }
        // .el-form-item__content {
        //   line-height: 0;
        // }
      }
      // .el-form-item {
      //   margin-bottom: 0;
      // }
      // .el-form--inline .el-form-item {
      //   vertical-align: middle;
      // }
    }
    .sMessageTop{
      ul{
        display: flex;
        li{
          border: 1px solid #b4b4b4;
          flex: 1;
          .el-form-item{
            margin-bottom:0;
            margin-right:0;
            height: 28px;
            line-height: 28px;
            .el-form-item__label{
              text-align: left;
              padding-left: 10px;
            }
            .el-input__inner{
              border-radius: 0;
              /*border: 1px solid #b4b4b4;*/
              border-left-color: #b4b4b4;
              border-right-color: transparent;
              border-bottom-color: #b4b4b4;
              border-top-color: transparent;
            }
          }


          .el-form-item.is-success .el-input__inner, .el-form-item.is-success .el-input__inner:focus, .el-form-item.is-success .el-textarea__inner, .el-form-item.is-success .el-textarea__inner:focus {
            border-left-color: #b4b4b4;
            border-right-color: transparent;
            border-bottom-color: #b4b4b4;
            border-top-color: transparent;
          }

          .el-input.is-active .el-input__inner, .el-input__inner:focus {
            border-left-color: #b4b4b4;
            border-top-color: transparent;
            border-right-color: transparent;
            border-bottom-color: #b4b4b4;
            outline: 0;
          }

          .el-input.is-disabled .el-input__inner {
            background-color: transparent;
            border-left-color: #b4b4b4;
            border-right-color: transparent;
            border-bottom-color: #b4b4b4;
            color: #606266;
          }

        }

      }
      ul:nth-of-type(2),ul:nth-of-type(3),ul:nth-of-type(4){
        li{
          border-top-color: transparent;
        }
      }
    }
    @media screen and (max-width: 1375px) {
      .sMessageTop{
        ul{
          li{

          }
        }
      }
    }
    .sMessageCont {
      .sMessageCont_info {
        background-color: #e2eaff;
        p {
          text-align: center;
          font-size: 14px;
          color: #668cf0;
          padding: 4px 0 5px 0;
          font-weight: 600;
        }
      }
      .info_tab {
        .el-table__fixed-body-wrapper {
          .deletebtn {
            .svg-icon {
              fill: #bec4d1;
              font-size: 18px;
            }
          }
          .deletebtn:hover {
            .svg-icon {
              fill: #ff4381;
              cursor: pointer;
            }
          }
        }
      }
      .el-table {
        thead {
          line-height: 28px;

        }
        .cell {
          line-height: 28px;
        }
      }
      .el-table {
        td {
          padding: 0px 0;
        }
      }

      span {
        cursor: pointer;
      }
    }



   .sBottom {
      border-right: 1px solid #b4b4b4;
      border-left: 1px solid #b4b4b4;
      margin-bottom: 100px;
      .sMessageCont_info {
        background-color: #e2eaff;
        p {
          text-align: left;
          font-size: 14px;
          color: #668cf0;
          padding: 4px 0 5px 0;
          font-weight: 600;
        }
      }
      .sMessageBut {
        .sButtom_searchinfo {
          .el-form-item {
            border: 1px solid #b4b4b4;
            margin-right: -5px;
            margin-bottom: 0;
            .el-input__inner {
              width: 190px;
              border-radius: 0;
              border-top-color: transparent;
              border-right-color: transparent;
              border-bottom-color: transparent;
            }
            .el-input__inner:nth-of-type(2n) {
              border-right-color: transparent;
            }
          }
          .el-form-item:nth-of-type(1) {
            border-right-color: transparent;
          }
          .el-form-item:nth-of-type(1) {
            border-left-color: transparent;
            width: 100%;
            .el-input__inner {
              width: 1625px;
            }
          }
          .el-form-item:nth-of-type(3) {
            border-left-color: transparent;
          }
          .el-form-item:nth-of-type(2n) {
            border-right-color: transparent;
          }
        }
        .el-input__inner:focus {
          border-color: #b4b4b4;
        }
      }
    }
    .sBottomBut {
      background: #eee;
      height: 70px;
      box-shadow: 0 -2px 2px rgba(0, 0, 0, 0.1);
      position: relative;
      z-index: 10;
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      div {
        position: fixed;
        bottom: 0;
        left: 50%;
        margin: 20px 0 15px 0;
      }
    }
  }


</style>
