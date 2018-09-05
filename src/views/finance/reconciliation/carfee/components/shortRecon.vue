<template>
  <!---->
  <div class="short_lll" v-loading="loading">
    <div class="sTop">
      <el-form :inline="true" :size="btnsize" label-position="right" :rules="rules" label-width="100px"
               class="short_searchinfo clearfix" ref="formName" :model="searchTitle">

        <div class="sTitle">
          <el-form-item label="">
            <!--<el-input v-model="checkBillName" auto-complete="off" ></el-input><span></span>-->

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

          </el-form-item>
        </div>
        <div class="sDate">
          <el-form-item label="车牌号" v-if="$route.query.id" :key="truckKey">
            <el-input v-model="searchTitle.memberName" auto-complete="off" disabled></el-input>
          </el-form-item>


          <el-form-item label="车牌号" prop="memberName" v-else>
            <el-select v-model="searchTitle.memberName" clearable>
              <el-option v-for="(item, index) in memberNameType" :label="item.truckIdNumber"
                         :value="item.truckIdNumber" :key="index"></el-option>
            </el-select>
            <!--<querySelect search="truckIdNumber"  show="select" valuekey="truckIdNumber" type="trunk" @change="getTrunkName"  v-model="searchTitle.memberName" clearable />-->

          </el-form-item>


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
            <el-button type="primary" @click="onSubmit()">查询</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <div class="sMessageTop">
      <el-form :inline="true" :size="btnsize" label-position="center" :model="messageInfo" label-width="100px"
               class=" clearfix" ref="formName2" :rules="rules">

        <el-form-item label="车牌号">
          <el-input v-model="messageInfo.memberName" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="司机">
          <el-input v-model="messageInfo.memberPerson" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="messageInfo.memberPersonPhone" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="对账单编号">
          <el-input v-model="messageInfo.checkBillCode" auto-complete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="开始时间">
          <el-input v-model="messageInfo.checkStartTime" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="结束时间">
          <el-input v-model="messageInfo.checkEndTime" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="账户账号" prop="bankAccount">
          <el-input v-model="messageInfo.bankAccount" auto-complete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="账户开户行">
          <el-input v-model="messageInfo.bankName" auto-complete="off" clearable></el-input>
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
        <p>未付账款</p>
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
              <span class="deletebtn" @click="iconDelete(scope.$index)"><icon-svg icon-class="delete_lll"
                                                                                  fill="red"></icon-svg></span>
            </template>
          </el-table-column>
          <el-table-column
            fixed
            sortable
            prop="departureTime"
            width="160"
            label="发车时间">
          </el-table-column>
          <el-table-column
            prop="batchNo"
            width="160"
            sortable
            label="短驳批次号">
          </el-table-column>
          <el-table-column
            prop="orgName"
            sortable
            width="160"
            label="发车网点">
          </el-table-column>
          <el-table-column
            prop="arriveOrgName"
            sortable
            width="160"
            label="到达网点">
          </el-table-column>

          <el-table-column
            sortable
            prop="loadAmount"
            width="140"
            label="配载件数">
          </el-table-column>
          <el-table-column
            prop="loadWeight"
            label="配载重量"
            width="140"
            sortable
          >
          </el-table-column>

          <el-table-column
            prop="loadVolume"
            sortable
            width="160"
            label="配载体积">
          </el-table-column>
          <el-table-column
            prop="driverName"
            label="司机"
            width="130"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="shortPay"
            label="短驳费"
            width="180"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="remark"
            label="备注"
            width="192"
            sortable
          >
            <template slot-scope="scope">
              <el-input v-model="dealPayInfo[scope.$index].remark" auto-complete="off" :maxlength="30"
                        clearable></el-input>
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
            width="70">
            <template slot-scope="scope">{{ scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column
            fixed
            sortable
            label=""
            width="80">
            <template slot-scope="scope">
              <span class="deletebtn" @click="iconDeleteAl(scope.$index)"><icon-svg icon-class="delete_lll"
                                                                                    fill="red"></icon-svg></span>
            </template>
          </el-table-column>
          <el-table-column
            fixed
            sortable
            prop="departureTime"
            width="160"
            label="发车时间">
          </el-table-column>
          <el-table-column
            prop="batchNo"
            width="160"
            sortable
            label="短驳批次号">
          </el-table-column>
          <el-table-column
            prop="orgName"
            sortable
            width="160"
            label="发车网点">
          </el-table-column>
          <el-table-column
            prop="arriveOrgName"
            sortable
            width="160"
            label="到达网点">
          </el-table-column>

          <el-table-column
            sortable
            prop="loadAmount"
            width="140"
            label="配载件数">
          </el-table-column>
          <el-table-column
            prop="loadWeight"
            label="配载重量"
            width="140"
            sortable
          >
          </el-table-column>

          <el-table-column
            prop="loadVolume"
            sortable
            width="160"
            label="配载体积">
          </el-table-column>
          <el-table-column
            prop="driverName"
            label="司机"
            width="130"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="shortPay"
            label="短驳费"
            width="180"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="remark"
            label="备注"
            width="192"
            sortable
          >
            <template slot-scope="scope">
              <el-input v-model="alreadyPayInfo[scope.$index].remark" auto-complete="off" :maxlength="30"
                        clearable></el-input>
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
            <el-input v-model="messageButtonInfo.remark" auto-complete="off" :maxlength="300"></el-input>
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
                :sendId="sendId" :isShort="isShort"></SaveDialog>
  </div>
</template>

<script>
  import {pickerOptions2, parseTime, objectMerge2, tmsMath} from '@/utils/'
  import {REGEX} from '@/utils/validate'
  import {
    postCarfBillCheckCarBaseInfo,
    postCarfBillCheckCarInitList,
    postCarfDtoById,
    postCarfBillCheckCarUpdateList
  } from '@/api/finance/fin_carfee'
  import querySelect from '@/components/querySelect/index'
  import {mapGetters} from 'vuex'
  import SaveDialog from './saveDialog'
  import {getTrucK} from '@/api/operation/load'
  import {SaveAsFileCarfeefeeShort} from '@/utils/recLodopFuncs'

  export default {
    components: {
      querySelect,
      SaveDialog
    },
    data() {
      const _this = this
      return {
        tooltip: false,
        disabledName: true,
        memberNameType: [],
        truckKey: 0,
        pickOption: {
          firstDayOfWeek: 1,
          disabledDate(time) {
            // 小于终止日
            return _this.messageInfo.checkEndTime ? time.getTime() > _this.messageInfo.checkEndTime : false
          }
        },
        pickOption2: {
          firstDayOfWeek: 1,
          disabledDate(time) {
            // 大于起始日
            return _this.messageInfo.checkStartTime ? time.getTime() < _this.messageInfo.checkStartTime : false
          }
        },
        pickerOptions2: {
          shortcuts: pickerOptions2
        },

        searchCreatTime: [],
        // changeCreateTime: [],
        defaultTime: [parseTime(+new Date() - 60 * 24 * 60 * 60 * 1000, '{y}-{m}-{d}'), parseTime(new Date(), '{y}-{m}-{d}')],
        messageArr: [],
        checkBillName: '',
        messageInfo: {
          checkStartTime: '',
          checkEndTime: '',
          orgName: '',
          memberIdType: 3,
          memberName: '',
          memberPerson: '',
          memberPersonPhone: '',
          checkBillCode: '',
          bankAccount: '',
          bankName: '',
          alipayAccount: '',
          wechatAccount: ''
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
        alreadyPayInfo: [],
        form: {
          'orgId': '',
          'checkBillCode': '',
          'payDetailList': [],
          'hadPayDetailList': []
        },
        // 总计
        tota: {
          alreadyPaytota: [],
          dealPaytota: []
        },
        // 保存总计数据
        alreadyPaytota: [],
        dealPaytota: [],
        sendId: '',
        visibleDialog: false,
        loading: false,
        isShort: false,
        deliver: false,
        isArtery: false,
        btnsize: 'mini',
        searchTitle: {
          orgId: '',
          memberName: '', //
          startTime: '',
          endTime: ''
        },
        searchDealPay: {
          orgId: '',
          memberType: '3',
          loadTypeId: 38,
          payTypeStatus: 'pay',
          memberName: '',
          startTime: '',
          endTime: ''
        },
        searchAlReadyPay: {
          orgId: '',
          memberType: '3',
          loadTypeId: 38,
          payTypeStatus: 'hadPay',
          memberName: '',
          startTime: '',
          endTime: ''
        },
        moiffyDealPay: {
          loadTypeId: 38,
          orgId: '',
          payTypeStatus: 'pay',
          checkId: '1'
        },
        moiffyAlReadyPay: {
          loadTypeId: 38,
          orgId: '',
          payTypeStatus: 'hadPay',
          checkId: '1'
        },
        rules: {
          'bankAccount': [
            {message: '只能输入数字', trigger: 'blur', pattern: REGEX.ONLY_NUMBER}
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
    mounted() {
      // this.searchCreatTime = this.defaultTime
      this.messageButtonInfo.createTime = new Date()
      this.changeOrgid(this.otherinfo, this.$route.query.id)
      if (this.$route.query.id) {
        this.sendId = this.$route.query.id
        this.changeId(this.$route.query.id)

        this.moodifyList().then(() => {
          this.truckKey = new Date().getTime()
          this.searchDealPay.memberName = this.searchTitle.memberName
          this.searchAlReadyPay.memberName = this.searchTitle.memberName
        }).catch((err)=>{
          this.loading = false
          this.$message.error(err.errorInfo || err.text || '未知错误，请重试~')
        })
        this.moodifyDealPay()
        this.moodifyReadyPay()
      } else {
        // this.onSubmit()
        this.truckName()
        this.searchCreatTime = this.defaultTime
      }
    },
    methods: {
      export1() {
        if (this.searchTitle.memberName) {
          this.sendData()
          // console.log(JSON.stringify(this.form))
          SaveAsFileCarfeefeeShort({
            data: objectMerge2({}, this.form),
            name: '新建对账'
          })
        } else {
          this.$message({
            message: '请选择车牌号进行查询~',
            type: 'error'
          })
          return false
        }
      },
      truckName() {
        this.loading = true
        return getTrucK().then(data => {
          this.memberNameType = data.data
          this.loading = false
        }).catch(err => {
          this.$message.error(err.errorInfo || err.text || '未知错误，请重试~')
        })
      },
      fetchList() {
        this.loading = true

        return postCarfBillCheckCarBaseInfo(this.searchTitle).then(data => {
          this.messageArr = []
          this.messageArr = data
          this.infoMessageData(this.messageArr)
          this.loading = false
        }).catch(err => {
          this.newMessageData()
          this.$message.error(err.errorInfo || err.text || '未知错误，请重试~')
        })
      },
      fetchDealPay() {
        this.loading = true

        return postCarfBillCheckCarInitList(this.searchDealPay).then(data => {
          this.dealPayInfo = []
          this.dealPaytota = []
          this.dealPayInfo = data
          this.dealPaytota = data
          this.loading = false
        }).catch(err => {
          this.$message.error(err.errorInfo || err.text || '未知错误，请重试~')
        })
      },
      fetchReadyPay() {
        this.loading = true

        return postCarfBillCheckCarInitList(this.searchAlReadyPay).then(data => {
          this.alreadyPayInfo = []
          this.alreadyPaytota = []
          this.alreadyPayInfo = data
          this.alreadyPaytota = data

          this.loading = false
        }).catch(err => {
          this.$message.error(err.errorInfo || err.text || '未知错误，请重试~')
        })
      },
      // 修改
      moodifyList() {
        this.loading = true
        this.sendId = this.$route.query.id
        return postCarfDtoById(this.sendId).then(data => {
          this.messageArr = data.data
          this.infoMessageData(this.messageArr)
          this.loading = false
        }).catch(err => {
          this.$message.error(err.errorInfo || err.text || '未知错误，请重试~')
        })
      },
      moodifyDealPay() {
        this.loading = true
        return postCarfBillCheckCarUpdateList(this.moiffyDealPay).then(data => {
          this.dealPayInfo = []
          this.dealPaytota = []
          this.dealPayInfo = data
          this.dealPaytota = data


          this.loading = false
        }).catch(err => {
          this.$message({
            type: 'info',
            message: err.errorInfo || err.text || '未知错误，请重试~'
          })
        })
      },
      moodifyReadyPay() {
        this.loading = true
        return postCarfBillCheckCarUpdateList(this.moiffyAlReadyPay).then(data => {
          this.alreadyPayInfo = []
          this.alreadyPaytota = []
          this.alreadyPayInfo = data
          this.alreadyPaytota = data
          this.loading = false
        }).catch(err => {
          this.$notify({
            type: 'info',
            message: err.errorInfo || err.text || '未知错误，请重试~'
          })
        })
      },
      changeOrgid(item, checkId) {
        this.searchTitle.orgId = item.orgid
        this.searchDealPay.orgId = item.orgid
        this.searchAlReadyPay.orgId = item.orgid
        this.moiffyDealPay.orgId = item.orgid
        this.moiffyAlReadyPay.orgId = item.orgid
        this.moiffyDealPay.checkId = checkId
        this.moiffyAlReadyPay.checkId = checkId
      },
      changeId(id) {
        this.searchTitle.id = id
        this.searchDealPay.id = id
        this.searchAlReadyPay.id = id
      },
      getTrunkName(trunk) {
        if (trunk) {
          this.searchTitle.memberName = trunk.truckIdNumber
          this.searchDealPay.memberName = trunk.truckIdNumber
          this.searchAlReadyPay.memberName = trunk.truckIdNumber
        }
      },
      // 查询

      onSubmit() {
        if (this.searchTitle.memberName) {
          // if (!this.searchCreatTime[0]) {
          //   this.searchCreatTime = this.defaultTime
          //   console.log(this.searchCreatTime,"打印")
          // }
          // console.log(this.searchCreatTime, '打印')
          const searchObj = {}
          // debugger
          // this.searchCreatTime = this.defaultTime
          searchObj.startTime = this.searchCreatTime ? this.searchCreatTime[0] + ' 00:00:00' : ''
          searchObj.endTime = this.searchCreatTime ? this.searchCreatTime[1] + ' 23:59:59' : ''
          // console.log(searchObj.startTime,"打印2")
          // console.log(this.defaultTime[0],"打印3")
          this.infoSearchTime(searchObj.startTime, searchObj.endTime)
          this.fetchList()
          this.fetchDealPay()
          this.fetchReadyPay()
          this.searchDealPay.memberName = this.searchTitle.memberName
          this.searchAlReadyPay.memberName = this.searchTitle.memberName
        } else {
          this.$message({
            message: '车牌号不能为空~',
            type: 'error'
          })
          return false
        }
      },
      // onSubmit() {
      //   if (this.searchTitle.memberName) {
      //     this.fetchList()
      //     this.fetchDealPay()
      //     this.fetchReadyPay()
      //   } else {
      //     this.$message({
      //       message: '车牌号不能为空~',
      //       type: 'error'
      //     })
      //     return false
      //   }
      //   const searchObj = {}
      //   this.searchCreatTime = this.defaultTime
      //   searchObj.startTime = this.searchCreatTime ? this.searchCreatTime[0] + ' 00:00:00' : ''
      //   searchObj.endTime = this.searchCreatTime ? this.searchCreatTime[1] + ' 23:59:59' : ''
      //   this.infoSearchTime(searchObj.startTime, searchObj.endTime)
      // },
      closeMe() {

      },
      // 保存
      submit() {
        this.$refs['formName2'].validate((valid) => {
          if (valid) {
            this.$refs['formName3'].validate((valid) => {
              if (valid) {
                this.sendData()
                // 总计
                this.tota.dealPaytota = this.dealPayInfo ? this.dealPayInfo.map(el => {
                  const a = {}
                  a.totalPay = el.totalPay
                  return a
                }) : []
                this.tota.alreadyPaytota = this.alreadyPayInfo ? this.alreadyPayInfo.map(el => {
                  const a = {}
                  a.totalPay = el.totalPay
                  return a
                }) : []

                if (!this.form.payDetailList.length && !this.form.hadPayDetailList.length) {
                  this.$message({
                    message: '各款项不能为空~',
                    type: 'error'
                  })
                  this.closeVisibleDialog()
                  return false
                } else {
                  this.oopenVisibleDialog()
                  this.isShort = true
                  this.deliver = false
                  this.isArtery = false
                }
              }
            })
          } else {
            return false
          }
        })
      },
      sendData() {
        for (const i in this.messageInfo) {
          this.form[i] = this.messageInfo[i]
        }
        for (const i in this.messageButtonInfo) {
          this.form[i] = this.messageButtonInfo[i]
        }
        this.form.orgId = this.otherinfo.orgid
        this.form.checkBillName = this.checkBillName
        this.form.payDetailList = []
        this.form.hadPayDetailList = []
        this.form.payDetailList = this.dealPayInfo ? this.dealPayInfo.map(el => {
          const a = {}
          a.shipOrderId = el.shipOrderId
          a.shortPay = el.shortPay
          a.remark = el.remark
          a.departureTime = el.departureTime
          a.batchNo = el.batchNo
          a.orgName = el.orgName
          a.arriveOrgName = el.arriveOrgName
          a.loadAmount = el.loadAmount
          a.loadWeight = el.loadWeight
          a.loadVolume = el.loadVolume
          a.driverName = el.driverName
          return a
        }) : []
        this.form.hadPayDetailList = this.alreadyPayInfo ? this.alreadyPayInfo.map(el => {
          const a = {}
          a.shipOrderId = el.shipOrderId
          a.shortPay = el.shortPay
          a.remark = el.remark
          a.departureTime = el.departureTime
          a.batchNo = el.batchNo
          a.orgName = el.orgName
          a.arriveOrgName = el.arriveOrgName
          a.loadAmount = el.loadAmount
          a.loadWeight = el.loadWeight
          a.loadVolume = el.loadVolume
          a.driverName = el.driverName
          return a
        }) : []
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
          this.eventBus.$emit('replaceCurrentView', '/finance/reconciliation/carfee/shortDepart')
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
          }
          if (this.$route.query.id && !value) {
            callback()
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
          if (index === 3 || index === 4 || index === 5) {
            sums[index] = ''
            return
          }
          const values = data.map(item => Number(item[column.property]))
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr)
              if (!isNaN(value)) {
                // return prev + curr
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
      iconDelete(index) {
        this.dealPayInfo = this.dealPayInfo.filter((el, inx) => {
          return inx !== index
        })
        this.delCont()
      },
      //
      iconDeleteAl(index) {
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
      infoMessageData(item) {
        this.searchTitle.memberName = item.memberName
        this.messageInfo.memberName = item.memberName
        this.messageInfo.memberPerson = item.memberPerson
        this.messageInfo.memberPersonPhone = item.memberPersonPhone
        this.messageInfo.checkBillCode = item.checkBillCode
        this.messageInfo.bankAccount = item.bankAccount
        this.messageInfo.bankName = item.bankName
        this.messageInfo.alipayAccount = item.alipayAccount
        this.messageInfo.wechatAccount = item.wechatAccount
        this.messageInfo.checkStartTime = item.checkStartTime
        this.messageInfo.checkEndTime = item.checkEndTime
        this.messageInfo.orgName = item.orgName
        this.messageButtonInfo.companyName = item.companyName
        this.messageButtonInfo.orgBusinessOfficer = item.orgBusinessOfficer
        this.messageButtonInfo.orgBusinessOfficerPhone = item.orgBusinessOfficerPhone
        this.messageButtonInfo.orgFinancialOfficer = item.orgFinancialOfficer
        this.messageButtonInfo.orgFinancialOfficerPhone = item.orgFinancialOfficerPhone
        this.messageButtonInfo.createTime = item.createTime
        this.messageButtonInfo.remark = item.remark
        this.messageButtonInfo.totalCount = item.totalCount
        this.messageButtonInfo.checkStatus = item.checkStatus
        this.checkBillName = item.checkBillName
        this.searchCreatTime = this.defaultTime
        this.searchCreatTime[0] = item.checkStartTime
        this.searchCreatTime[1] = item.checkEndTime
      },
      newMessageData() {
        this.searchTitle.memberName = ''
        this.messageInfo.memberName = ''
        this.messageInfo.memberPerson = ''
        this.messageInfo.memberPersonPhone = ''
        this.messageInfo.checkBillCode = ''
        this.messageInfo.bankAccount = ''
        this.messageInfo.bankName = ''
        this.messageInfo.alipayAccount = ''
        this.messageInfo.wechatAccount = ''
        this.messageInfo.checkStartTime = ''
        this.messageInfo.checkEndTime = ''
        this.messageInfo.orgName = ''
        this.messageButtonInfo.companyName = ''
        this.messageButtonInfo.orgBusinessOfficer = ''
        this.messageButtonInfo.orgBusinessOfficerPhone = ''
        this.messageButtonInfo.orgFinancialOfficer = ''
        this.messageButtonInfo.orgFinancialOfficerPhone = ''
        this.messageButtonInfo.createTime = ''
        this.messageButtonInfo.remark = ''
        this.messageButtonInfo.totalCount = ''
        this.checkBillName = ''
        // this.searchCreatTime = ''
        // this.searchCreatTime[0] = ''
        // this.searchCreatTime[1] = ''
      },
      infoSearchTime(startTime, endTime) {
        this.searchTitle.startTime = startTime
        this.searchDealPay.startTime = startTime
        this.searchAlReadyPay.startTime = startTime
        this.searchTitle.endTime = endTime
        this.searchDealPay.endTime = endTime
        this.searchAlReadyPay.endTime = endTime
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
  .short_lll {
    margin: 0 9px;
    .sTop {

      .short_searchinfo {
        display: flex;
        padding: 20px 0 15px 0;
        .sTitle {
          flex: 1;
          text-align: center;
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
            top: -11px;
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
            width: 200%;
            text-align: center;
          }
          .el-input__inner:focus {
            border-bottom-color: #c0c4cc;
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
      .sDate {
        .el-form-item__label {
          line-height: 40px;
        }
        .el-input__inner {
          height: 40px;
        }
        .el-input.is-disabled {
          .el-input__inner {
            background-color: transparent;
            color: #666;
          }
        }
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
          width: 187px;
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
      .sWetPay {
        width: 50%;
        border-top-color: transparent;
        border-right-color: transparent;
        .el-form-item__content {
          /*width: 90%;*/
          .el-input {
            .el-input__inner {
              /*width: 100%;*/

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
      margin-bottom: 70px;
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

        /*padding: 16px 0 10px 0;*/
        .sButtom_searchinfo {
          .el-form-item {
            border: 1px solid #b4b4b4;
            margin-right: -5px;
            margin-bottom: 0;
            .el-input__inner {
              width: 193px;
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
            /*border-bottom-color: transparent;*/
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
