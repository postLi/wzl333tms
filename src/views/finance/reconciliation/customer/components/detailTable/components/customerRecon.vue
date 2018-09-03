<template>
  <!---->
  <div class="costomerCreat_lll" v-loading="loading">
    <div class="sTop">
      <el-form :inline="true" ref="formName1" :size="btnsize" label-position="right" label-width="100px"
               class="short_searchinfo clearfix" :model="searchTitle">

        <div class="sTitle">
          <el-form-item label="">
            <el-tooltip class="item" effect="dark" placement="top" :enterable="false" :manual="true" :value="tooltip"
                        tabindex="-1">
              <div slot="content">双击可修改对账单名称</div>
              <el-input :class="{'showBg':disabledName === false}" v-model.trim="checkBillName" clearable
                        @dblclick.native="(disabledName = false) ; (tooltip = false)" :disabled="disabledName"
                        auto-complete="off" @mouseover.native=" disabledName === true && (tooltip = true)"
                        @blur="tooltip = false;disabledName = true"
                        @mouseenter.native=" disabledName === true && (tooltip = true)"
                        @mouseleave.native="tooltip = false;disabledName = true"></el-input>
              <!--@blur="tooltip = false;disabledName = true"-->
              <!--@mouseout.native="tooltip = false;disabledName = true"-->
              <!--<template slot-scope="scope">-->
              <!--<span class="deletebtn" @click="iconDeleteDealPay(scope.$index)"><icon-svg icon-class="delete_lll"  fill="red"></icon-svg></span>-->
              <!--</template>-->
            </el-tooltip>

            <!--<el-input v-model="checkBillName" auto-complete="off" ></el-input><span></span>-->
          </el-form-item>
        </div>
        <div class="sDate">
          <el-date-picker
            v-model="searchCreatTime"
            :default-value="defaultTime"
            type="daterange"
            align="right"
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
               class="clearfix" ref="formName2" :rules="rules">

        <el-form-item label="发货方">
          <el-input v-model="messageInfo.memberName" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="发货人">
          <el-input v-model="messageInfo.memberPerson" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="messageInfo.memberPersonPhone" auto-complete="off" :maxlength="11" v-numberOnly
                    disabled></el-input>
        </el-form-item>
        <el-form-item label="对账单编号">
          <el-input v-model="messageInfo.checkBillCode" auto-complete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="客户编号">
          <el-input v-model="messageInfo.memberCode" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="开始时间">
          <el-input v-model="messageInfo.checkStartTime" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="结束时间">
          <el-input v-model="messageInfo.checkEndTime" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="结算方式">
          <el-input v-model="messageInfo.settlementType" auto-complete="off" :maxlength="8" clearable></el-input>
        </el-form-item>
        <el-form-item label="账户账号" prop="bankAccount">
          <el-input v-model="messageInfo.bankAccount" auto-complete="off" :maxlength="20" clearable></el-input>
        </el-form-item>
        <el-form-item label="账户开户行">
          <el-input v-model="messageInfo.bankName" auto-complete="off" :maxlength="15" clearable></el-input>
        </el-form-item>
        <el-form-item label="财务负责人">
          <el-input v-model="messageInfo.financialOfficer" auto-complete="off" :maxlength="10" clearable></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="financialOfficerPhone">
          <el-input v-model="messageInfo.financialOfficerPhone" auto-complete="off" :maxlength="11"
                    clearable></el-input>
        </el-form-item>
        <el-form-item label="支付宝">
          <el-input v-model="messageInfo.alipayAccount" auto-complete="off" :maxlength="30" clearable></el-input>
        </el-form-item>
        <el-form-item label="微信" class="sWetPay">
          <el-input v-model="messageInfo.wechatAccount" auto-complete="off" :maxlength="30" clearable></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="sMessageCont">
      <div class="sMessageCont_info">
        <p>应收清单</p>
      </div>
      <div class="info_tab">
        <!--@selection-change="getSelection"-->
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
            width="70">
            <template slot-scope="scope">{{ scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column
            fixed
            sortable
            label=""
            width="80">
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
            label="开单时间">
          </el-table-column>
          <el-table-column
            prop="shipSn"
            width="160"
            sortable
            label="运单号">
          </el-table-column>
          <el-table-column
            prop="shipGoodsSn"
            sortable
            width="160"
            label="货号">
          </el-table-column>
          <el-table-column
            prop="shipFromCityName"
            sortable
            width="160"
            label="出发城市">
          </el-table-column>
          <el-table-column
            prop="shipToCityName"
            sortable
            width="160"
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
            width="140"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="cargoWeight"
            sortable
            width="160"
            label="重量">
          </el-table-column>
          <el-table-column
            prop="cargoVolume"
            sortable
            width="160"
            label="体积">
          </el-table-column>
          <el-table-column
          <el-table-column
            prop="shipDeliveryMethod"
            sortable
            width="160"
            label="交接方式">
          </el-table-column>
          <el-table-column
            prop="unusualRemark"
            label="异动备注"
            width="130"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="shipPayWay"
            label="付款方式"
            width="130"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="unusualFee"
            label="异动增款"
            width="130"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="shipReceiptpayFee"
            label="回单付"
            width="130"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="shipMonthpayFee"
            label="月结"
            width="130"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="totalFee"
            label="小计"
            width="130"
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
        <p>应付清单</p>
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
          <el-table-column
            fixed
            sortable
            label="序号"
            width="70">
            <template slot-scope="scope">{{ scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column
            fixed
            sortable
            label=""
            width="80">
            <template slot-scope="scope">
              <span class="deletebtn" @click="iconDeleteDealPay(scope.$index)"><icon-svg icon-class="delete_lll"
                                                                                         fill="red"></icon-svg></span>
            </template>

          </el-table-column>
          <el-table-column
            fixed
            sortable
            prop="createTime"
            width="160"
            label="开单时间">
          </el-table-column>
          <el-table-column
            prop="shipSn"
            width="160"
            sortable
            label="运单号">
          </el-table-column>
          <el-table-column
            prop="shipGoodsSn"
            sortable
            width="160"
            label="货号">
          </el-table-column>
          <el-table-column
            prop="shipFromCityName"
            sortable
            width="160"
            label="出发城市">
          </el-table-column>
          <el-table-column
            prop="shipToCityName"
            sortable
            width="160"
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
            width="140"
            sortable
          >
          </el-table-column>

          <el-table-column
            prop="cargoWeight"
            sortable
            width="160"
            label="重量">
          </el-table-column>
          <el-table-column
            prop="cargoVolume"
            label="体积"
            width="130"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="unusualRemark"
            label="异动备注"
            width="130"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="abnormalType"
            label="异常类型"
            width="130"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="abnormalAmount"
            label="异常件数"
            width="130"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="unusualFee"
            label="异动减款"
            width="130"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="registerFee"
            label="异常金额"
            width="130"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="agencyFund"
            label="代收货款"
            width="130"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="totalFee"
            label="小计"
            width="130"
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
            width="70">
            <template slot-scope="scope">{{ scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column
            fixed
            sortable
            label=""
            width="80">
            <template slot-scope="scope">
              <span class="deletebtn" @click="iconDeleteAlready(scope.$index)"><icon-svg icon-class="delete_lll"
                                                                                         fill="red"></icon-svg></span>
            </template>
          </el-table-column>
          <el-table-column
            fixed
            sortable
            prop="createTime"
            width="160"
            label="开单时间">
          </el-table-column>
          <el-table-column
            prop="shipSn"
            width="160"
            sortable
            label="运单号">
          </el-table-column>
          <el-table-column
            prop="shipGoodsSn"
            sortable
            width="160"
            label="货号">
          </el-table-column>
          <el-table-column
            prop="shipFromCityName"
            sortable
            width="160"
            label="出发城市">
          </el-table-column>
          <el-table-column
            prop="shipToCityName"
            sortable
            width="160"
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
            width="140"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="cargoWeight"
            sortable
            width="160"
            label="重量">
          </el-table-column>
          <el-table-column
            prop="cargoVolume"
            sortable
            width="160"
            label="体积">
          </el-table-column>
          <el-table-column
            prop="shipDeliveryMethod"
            sortable
            width="160"
            label="交接方式">
          </el-table-column>
          <el-table-column
            prop="unusualRemark"
            label="异动备注"
            width="130"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="shipPayWay"
            label="付款方式"
            width="130"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="unusualFee"
            label="异动增款"
            width="130"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="shipReceiptpayFee"
            label="回单付"
            width="130"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="shipMonthpayFee"
            label="月结"
            width="130"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="totalFee"
            label="小计"
            width="130"
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
            width="70">
            <template slot-scope="scope">{{ scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column
            fixed
            sortable
            label=""
            width="80">
            <template slot-scope="scope">
              <span class="deletebtn" @click="iconDeleteAlreadyPay(scope.$index)"><icon-svg icon-class="delete_lll"
                                                                                            fill="red"></icon-svg></span>
            </template>
          </el-table-column>
          <el-table-column
            fixed
            sortable
            prop="createTime"
            width="160"
            label="开单时间">
          </el-table-column>
          <el-table-column
            prop="shipSn"
            width="160"
            sortable
            label="运单号">
          </el-table-column>
          <el-table-column
            prop="shipGoodsSn"
            sortable
            width="160"
            label="货号">
          </el-table-column>
          <el-table-column
            prop="shipFromCityName"
            sortable
            width="160"
            label="出发城市">
          </el-table-column>
          <el-table-column
            prop="shipToCityName"
            sortable
            width="160"
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
            width="140"
            sortable
          >
          </el-table-column>

          <el-table-column
            prop="cargoWeight"
            sortable
            width="160"
            label="重量">
          </el-table-column>
          <el-table-column
            prop="cargoVolume"
            label="体积"
            width="130"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="unusualRemark"
            label="异动备注"
            width="130"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="abnormalType"
            label="异常类型"
            width="130"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="abnormalAmount"
            label="异常件数"
            width="130"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="unusualFee"
            label="异动减款"
            width="130"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="registerFee"
            label="异常金额"
            width="130"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="agencyFund"
            label="代收货款"
            width="130"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="totalFee"
            label="小计"
            width="130"
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
            <el-input v-model="messageButtonInfo.orgBusinessOfficerPhone" auto-complete="off" clearable
                      :maxlength="11"></el-input>
          </el-form-item>
          <el-form-item label="财务负责人">
            <el-input v-model="messageButtonInfo.orgFinancialOfficer" auto-complete="off" :maxlength="10"
                      clearable></el-input>
          </el-form-item>
          <el-form-item label="联系方式" prop="orgFinancialOfficerPhone">
            <el-input v-model="messageButtonInfo.orgFinancialOfficerPhone" auto-complete="off" :maxlength="11"
                      clearable></el-input>
          </el-form-item>
          <el-form-item label="时间">
            <el-date-picker
              v-model="messageButtonInfo.createTime"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
            <!--<el-input v-model="messageButtonInfo.createTime" auto-complete="off" :maxlength="8"></el-input>-->
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="sBottomBut">
      <div>
        <!-- <el-button >打印</el-button> -->
        <el-button @click="export1">导出</el-button>
        <el-button @click="canBtn()">取消</el-button>
        <el-button @click="submit('formName')" type="primary">保存</el-button>
      </div>
    </div>
    <SaveDialog :popVisible.sync="visibleDialog" :dotInfo="form" @close="oopenVisibleDialog" :tota="tota"
                :sendId="sendId" :memberId="messageInfo.memberId" @success="fetchList"
                :urlId="$route.query.urlId"></SaveDialog>
  </div>
</template>

<script>
  import {pickerOptions2, parseTime,objectMerge2,tmsMath} from '@/utils/'
  import {REGEX} from '@/utils/validate'
  import {postCFinanceinitialize, getCustomerdetail} from '@/api/finance/fin_customer'
  import querySelect from '@/components/querySelect/index'
  import {mapGetters} from 'vuex'
  import SaveDialog from './saveDialog'
  import {SaveAsFileCustomer} from '@/utils/recLodopFuncs'

  export default {
    components: {
      querySelect,
      SaveDialog
    },
    data() {
      return {
        tooltip: false,
        disabledName: true,
        pickerOptions2: {
          shortcuts: pickerOptions2
        },

        searchCreatTime: [],
        // changeCreateTime: [],
        defaultTime: [parseTime(+new Date() - 60 * 24 * 60 * 60 * 1000, '{y}-{m}-{d}'), parseTime(new Date(), '{y}-{m}-{d}')],
        searchForm: {},
        usersArr: [],
        messageArr: [],
        checkBillName: '',
        messageInfo: {
          orgName: '',
          memberName: '',
          memberPerson: '',
          memberPersonPhone: '',
          memberCode: '',
          checkStartTime: '',
          checkEndTime: '',
          bankAccount: '',
          checkBillCode: '',
          settlementType: '',
          bankName: '',
          financialOfficer: '',
          financialOfficerPhone: '',
          alipayAccount: '',
          wechatAccount: '',
          companyId: '',
          memberId: '',
          orgId: '',
          memberIdType: ''
        },
        messageButtonInfo: {
          companyName: '',
          orgBusinessOfficer: '', // 本网点业务负责人
          orgBusinessOfficerPhone: '', // 本网点业务负责人
          orgFinancialOfficer: '', // 本网点财务负责人
          orgFinancialOfficerPhone: '', // 本网点财务负责人
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
          customerDetailDtoList: []

        },
        // 总计
        tota: {
          dealtota: [],
          dealPaytota: [],
          alreadytota: [],
          alreadyPaytota: []
        },
        dealPayInfoData: [], // 应付    1-应收 2-应付 3-已收 4-已付
        dealInfoData: [],
        alreadyPayInfoData: [],
        alreadyInfoData: [],
        // 总计
        sendId: '',
        visibleDialog: false,
        loading: true,
        btnsize: 'mini',
        searchTitle: {
          shipSenderId: '', //
          startTime: '',
          endTime: ''
        },
        rules: {
          'bankAccount': [
            // { trigger: 'change', validator: validateOnlyNum}
            {message: '只能输入数字', trigger: 'blur', pattern: REGEX.ONLY_NUMBER}
          ],
          'financialOfficerPhone': [
            {message: '请输入正确手机号码', trigger: 'blur', pattern: REGEX.MOBILE}
          ]

        },
        btnRule: {
          'orgBusinessOfficerPhone': [
            {message: '请输入正确手机号码', trigger: 'blur', pattern: REGEX.MOBILE}
          ],
          'orgFinancialOfficerPhone': [
            {message: '请输入正确手机号码', trigger: 'blur', pattern: REGEX.MOBILE}
          ]
        }
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
        // console.log(JSON.stringify(this.form))
        SaveAsFileCustomer({
          data: objectMerge2({}, this.form),
          name: '新建对账'
        })
      },
      fetchList() {
        this.loading = true
        this.searchTitle.shipSenderId = this.$route.query.urlId ? this.$route.query.urlId : this.$route.query.id
        return postCFinanceinitialize(this.searchTitle).then(data => {
          this.messageArr = data.tmsFinanceBillCheckDto
          this.infoMessage(this.messageArr)
          this.infoList()
          if (data.customerDetailDtoList.length > 0) {
            data.customerDetailDtoList.forEach((el, val) => {
              if (el.type === 1) {
                this.dealInfo.push(el)
                this.dealInfoData.push(el)
              } else if (el.type === 2) {
                this.dealPayInfo.push(el)
                this.dealPayInfoData.push(el)

                // let el1 = objectMerge2({},el,{
                //   totalFee:13.01
                // })
                // this.dealPayInfo.push(el1)
                // let el2 = objectMerge2({},el,{
                //   totalFee:10.01
                // })
                // this.dealPayInfo.push(el2)
                // let el3 = objectMerge2({},el,{
                //   totalFee:3010.01
                // })
                // this.dealPayInfo.push(el3)
              } else if (el.type === 3) {
                this.alreadyInfo.push(el)
                this.alreadyInfoData.push(el)
              } else {
                this.alreadyPayInfo.push(el)
                this.alreadyPayInfoData.push(el)
              }
            })
          } else {
            this.infoPayFor()
          }
          this.loading = false
        }).catch(err => {
          this.$message.error(err.errorInfo || err.text || '未知错误，请重试~')
        })
      },
      modifyList() {
        this.loading = true
        this.searchTitle.shipSenderId = this.$route.query.id
        return getCustomerdetail(this.searchTitle.shipSenderId).then(res => {
          const data = res.data
          this.messageArr = data.tmsFinanceBillCheckDto
          this.infoMessage(this.messageArr)
          this.infoList()
          data.customerDetailDtoList.forEach((el, val) => {
            if (el.type === 1) {
              this.dealInfo.push(el)
              this.dealInfoData.push(el)
            //

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
          this.$message.error(err.errorInfo || err.text || '未知错误，请重试~')
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
        this.infoPayFor()
        this.closeVisibleDialog()

      },
      onSubmit() {
        if (this.$route.query.tab === '客户对账-创建对账') {
          this.searchCreatTime = this.defaultTime
          this.onSearch()
        } else {
          this.modifyList()
          this.sendId = this.$route.query.id
        }
      },
      submit() {
        this.$refs['formName2'].validate((valid) => {
          if (valid) {
            this.$refs['formName3'].validate((valid) => {
              if (valid) {
                this.form.tmsFinanceBillCheckDto.checkBillName = this.checkBillName
                for (const i in this.messageInfo) {
                  this.form.tmsFinanceBillCheckDto[i] = this.messageInfo[i]
                }
                for (const i in this.messageButtonInfo) {
                  this.form.tmsFinanceBillCheckDto[i] = this.messageButtonInfo[i]
                }
                this.form.customerDetailDtoList = []
                this.dealInfo.map(el => this.form.customerDetailDtoList.push(el))
                this.dealPayInfo.map(el => this.form.customerDetailDtoList.push(el))
                this.alreadyInfo.map(el => this.form.customerDetailDtoList.push(el))
                this.alreadyPayInfo.map(el => this.form.customerDetailDtoList.push(el))
                //
                this.tota.dealtota = this.dealInfo ? this.dealInfo.map(el => {
                  const a = {}
                  a.totalFee = el.totalFee

                  return a
                }) : []
                this.tota.dealPaytota = this.dealPayInfo ? this.dealPayInfo.map(el => {
                  const a = {}
                  a.totalFee = el.totalFee
                  return a
                }) : []
                this.tota.alreadytota = this.alreadyInfo ? this.alreadyInfo.map(el => {
                  const a = {}
                  a.totalFee = el.totalFee
                  return a
                }) : []
                this.tota.alreadyPaytota = this.alreadyPayInfo ? this.alreadyPayInfo.map(el => {
                  const a = {}
                  a.totalFee = el.totalFee
                  return a
                }) : []
                if (!this.form.customerDetailDtoList.length) {
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
      sendData() {
        this.form.tmsFinanceBillCheckDto.checkBillName = this.checkBillName
        for (const i in this.messageInfo) {
          this.form.tmsFinanceBillCheckDto[i] = this.messageInfo[i]
        }
        for (const i in this.messageButtonInfo) {
          this.form.tmsFinanceBillCheckDto[i] = this.messageButtonInfo[i]
        }
        this.form.customerDetailDtoList = []
        this.dealInfo.map(el => this.form.customerDetailDtoList.push(el))
        this.dealPayInfo.map(el => this.form.customerDetailDtoList.push(el))
        this.alreadyInfo.map(el => this.form.customerDetailDtoList.push(el))
        this.alreadyPayInfo.map(el => this.form.customerDetailDtoList.push(el))
      },
      infoPayFor() {
        this.dealInfo = []
        this.dealPayInfo = []
        this.alreadyInfo = []
        this.alreadyPayInfo = []
      },
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
          if (this.$route.query.tab === '客户对账-创建对账') {
            this.eventBus.$emit('replaceCurrentView', '/finance/reconciliation/customer/detailTable?tab=客户对账-对账明细&id=' + this.$route.query.id)
          } else {
            this.eventBus.$emit('replaceCurrentView', '/finance/reconciliation/customer/detailTable?tab=客户对账-对账明细&id=' + this.$route.query.urlId)
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          })
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
      validateIsEmpty(msg = '不能为空！') {
        return (rule, value, callback) => {
          if (!value) {
            callback(new Error(msg))
          } else {
            callback()
          }
        }
      },
      getSummaries(param) {
        const {columns, data} = param
        const sums = []
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '合计'
            return
          }
          if (index === 3 || index === 4 || index === 5 || index === 7 || index === 18) {
            sums[index] = ''
            return
          }
          const values = data.map(item => Number(item[column.property]))
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr)
              if (!isNaN(value)) {
                return tmsMath._add(prev , curr)
                // return prev + curr
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
        this.delCont()
      },
      iconDeleteDealPay(index) {
        this.dealPayInfo = this.dealPayInfo.filter((el, inx) => {
          return inx !== index
        })
        this.delCont()
      },

      iconDeleteAlready(index) {
        this.alreadyInfo = this.alreadyInfo.filter((el, inx) => {
          return inx !== index
        })
        this.delCont()
      },
      iconDeleteAlreadyPay(index) {
        this.alreadyPayInfo = this.alreadyPayInfo.filter((el, inx) => {
          return inx !== index
        })
        this.delCont()
      },
      delCont() {
        this.$message({
          message: '删除成功~',
          type: 'success'
        })
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
        this.messageInfo.memberPerson = item.memberPerson
        this.messageInfo.memberPersonPhone = item.memberPersonPhone
        this.messageInfo.memberCode = item.memberCode
        this.messageInfo.settlementType = item.settlementType
        this.messageInfo.checkBillCode = item.checkBillCode
        this.messageInfo.bankAccount = item.bankAccount
        this.messageInfo.bankName = item.bankName
        this.messageInfo.alipayAccount = item.alipayAccount
        this.messageInfo.wechatAccount = item.wechatAccount
        this.messageInfo.checkStartTime = item.checkStartTime
        this.messageInfo.checkEndTime = item.checkEndTime
        this.messageInfo.financialOfficer = item.financialOfficer
        this.messageInfo.financialOfficerPhone = item.financialOfficerPhone
        this.messageInfo.companyId = item.companyId
        this.messageInfo.memberId = item.memberId
        this.messageInfo.orgId = item.orgId
        this.messageInfo.memberIdType = item.memberIdType
        this.messageButtonInfo.companyName = item.companyName
        this.messageButtonInfo.orgBusinessOfficer = item.orgBusinessOfficer
        this.messageButtonInfo.orgBusinessOfficerPhone = item.orgBusinessOfficerPhone
        this.messageButtonInfo.orgFinancialOfficer = item.orgFinancialOfficer
        this.messageButtonInfo.orgFinancialOfficerPhone = item.orgFinancialOfficerPhone
        this.messageButtonInfo.createTime = item.createTime
        this.messageButtonInfo.remark = item.remark
        this.messageButtonInfo.totalCount = item.totalCount
        this.checkBillName = item.checkBillName
        this.searchCreatTime = this.defaultTime
        this.searchCreatTime[0] = item.checkStartTime
        this.searchCreatTime[1] = item.checkEndTime
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
  .costomerCreat_lll {
    margin: 0 9px;
    .sTop {

      .short_searchinfo {
        display: flex;
        padding: 20px 0 15px 0;
        .sTitle {
          flex: 1;
          text-align: center;
          .el-tooltip.showBg {
            .el-input__inner {
              border-left-color: #c0c4cc;
              border-right-color: #c0c4cc;
              /*border-top-color: #c0c4cc;*/
              /*border-bottom:3px double #c0c4cc;*/
              /*font-size: 18px;*/
              color: #fff;
              font-weight: 600;
              background: skyblue;
            }
          }
          .el-input__suffix {
            left: -30px;
            top: -10px;
          }
          .el-input--suffix .el-input__inner {
            padding-right: 0;
          }
          .el-input.is-disabled .el-input__inner {
            background-color: #fff;
          }
          span {
            position: relative;
            top: -20px;
            left: 200px;
            font-size: 18px;
            color: #333333;
            font-weight: 600;
          }
          .el-input__inner {
            border-left-color: transparent;
            border-right-color: transparent;
            border-top-color: transparent;
            border-bottom: 3px double #c0c4cc;
            font-size: 18px;
            color: #333333;
            font-weight: 600;
          }
          .el-input__inner:focus {
            border-bottom-color: #c0c4cc;
          }
          .el-input {
            width: 158%;
          }
        }
        .el-form-item__content {
          line-height: 0;
        }
      }
      .el-form-item {
        margin-bottom: 0;
      }
      .el-form--inline .el-form-item {
        vertical-align: middle;
      }
    }

    .sMessageTop {
      border: 1px solid #b4b4b4;
      border-top: transparent;
      border-bottom: transparent;

      .el-form-item {
        margin-bottom: 0;
        margin-right: -5px;
        border: 1px solid #b4b4b4;
        border-left-color: transparent;
        .el-input__inner {
          border-top-color: transparent;
          border-right-color: transparent;
          border-bottom-color: transparent;
          width: 185px;
          border-radius: 0;
        }
        .el-input__inner:focus {
          border-left: 1px solid #dcdfe6;
        }

      }
      .el-form-item:nth-of-type(6) {
        border-right-color: transparent;
      }
      .el-form-item:nth-of-type(7) {
        border-top-color: transparent;
      }
      .el-form-item:nth-of-type(8) {
        border-top-color: transparent;
      }
      .el-form-item:nth-of-type(9) {
        border-top-color: transparent;
      }
      .el-form-item:nth-of-type(10) {
        border-top-color: transparent;
      }
      .el-form-item:nth-of-type(11) {
        border-top-color: transparent;
      }
      .el-form-item:nth-of-type(12) {
        border-top-color: transparent;
        border-right-color: transparent;
      }
      .el-form-item:nth-last-of-type(2) {
        border-top-color: transparent;
      }
      .sWetPay {
        width: 83.4%;;
        border-top-color: transparent;
        border-right-color: transparent;
        .el-form-item__content {
          .el-input {
            .el-input__inner {
            }

          }
        }
      }
      .el-input.is-disabled .el-input__inner {
        background-color: transparent;
        color: #666666;
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
              width: 191px;
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
            border-left-color: transparent;
            width: 100%;
            .el-input__inner {
              width: 1625px;
            }
          }
          .el-form-item:nth-of-type(1) {

          }
          .el-form-item:nth-of-type(3) {
            border-left-color: transparent;
          }
          .el-form-item:nth-of-type(2n) {
            border-right-color: transparent;
          }
          .el-form-item:last-of-type {
            border-right-color: #b4b4b4;
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
