<template>
  <!-- 记收入 -->
  <div class="fee-steup" v-loading="loading">
    <div class="fee-steup-form">
      <el-collapse v-model="feeInfo">
        <el-collapse-item name="feeInfoOne">
          <template slot="title">
            费用信息
          </template>
          <div class="feeFrom clearfix">
            <el-form :model="formModel" :size="btnsize" ref="formModel" label-width="80px" :rules="formModelRules">
              <div class="feeFrom-type-baseInfo">
                <el-form-item label="单据号" prop="settlementSn">
                  <el-input v-model="formModel.settlementSn" search="shipSn" type="order" valuekey="shipSn" clearable disabled></el-input>
                </el-form-item>
                <el-form-item label="收入金额" prop="amount">
                  <el-input :size="btnsize" v-model="formModel.amount" placeholder="收入金额" disabled v-number-only:point :maxlength="8"></el-input>
                </el-form-item>
                <el-form-item label="发生时间" prop="settlementTime">
                  <el-date-picker size="mini" v-model="formModel.settlementTime" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="发生时间">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="经办人" prop="agent">
                  <querySelect :size="btnsize" v-model="formModel.agent" valuekey="name" search="name" label="name" placeholder="选择经办人" />
                </el-form-item>
              </div>
              <div class="feeFrom-type-baseInfo">
                <el-form-item label="收支方式" prop="financialWay">
                  <selectType filterable allow-create default-first-option :size="btnsize" v-model="formModel.financialWay" type="financial_way_type" placeholder="选择收支方式" @change="setFinanceWay"></selectType>
                </el-form-item>
                <el-form-item label="银行卡号" prop="bankAccount">
                  <el-input :size="btnsize" v-model="formModel.bankAccount" placeholder="银行卡号" clearable v-numberOnly></el-input>
                </el-form-item>
                <el-form-item label="微信号" prop="wechatAccount">
                  <el-input :size="btnsize" v-model="formModel.wechatAccount" placeholder="微信号" clearable></el-input>
                </el-form-item>
                <el-form-item label="支付宝号" prop="alipayAccount">
                  <el-input :size="btnsize" v-model="formModel.alipayAccount" placeholder="支付宝号" clearable></el-input>
                </el-form-item>
              </div>
              <el-form-item label="说明" prop="remark">
                <el-input :size="btnsize" v-model="formModel.remark" placeholder="说明" clearable></el-input>
              </el-form-item>
            </el-form>
          </div>
        </el-collapse-item>
      </el-collapse>
      <!-- 穿梭框 -->
      <div class="fee_btn_transferTable tableItem">
        <!-- 操作按钮区 -->
        <div class="fee_btn_boxs">
          <el-button :size="btnsize" plain type="success" @click="doAction('count')" icon="el-icon-date">智能核销</el-button>
          <el-button :size="btnsize" plain type="primary" @click="doAction('savePrint')" icon="el-icon-printer">保存并打印</el-button>
          <el-button :size="btnsize" plain type="primary" @click="doAction('save')" icon="el-icon-document">保存</el-button>
          <el-button :size="btnsize" plain type="warning" @click="doAction('cancel')" icon="el-icon-circle-close-outline">取消</el-button>
        </div>
        <!-- 穿梭框 -->
        <dataTable @loadTable="getLoadTable" :orgId="getRouteInfo" :setLoadTable="setLoadTableList" :key="tableKey" :countNum="countNum" :isModify="isEdit" @feeName="getFeeName" :countSuccessList="countSuccessList"></dataTable>
        <!-- 智能核销弹出框 -->
        <Count :popVisible="countVisible" @close="countVisible = false" @success="countSuccess"></Count>
      </div>
    </div>
  </div>
</template>
<script>
import { REGEX } from '@/utils/validate'
import { mapGetters } from 'vuex'
import selectType from '@/components/selectType/index'
import SelectTree from '@/components/selectTree/index'
import querySelect from '@/components/querySelect/index'
import { objectMerge2, parseTime } from '@/utils/index'
import { getSystemTime } from '@/api/common'
import dataTable from './components/dataTable'
import { getFeeInfo, postAddIncome, getOrgFirstFinancialWay } from '@/api/finance/settleLog'
import Count from './components/count'
export default {
  name: 'settleLogIncome',
  components: {
    SelectTree,
    selectType,
    querySelect,
    dataTable,
    Count
  },
  data() {
    return {
      paymentsType: 0, // 收支类型, 0 收入, 1 支出
      loading: true,
      countVisible: false, // 弹出框默认隐藏
      feeInfo: 'feeInfoOne',
      settlementId: 178, // 178-运单核销 179-干线批次核销 180-短驳核销 181-送货核销
      btnsize: 'mini',
      formModel: {
        bankAccount: '',
        settlementTime: '',
        wechatAccount: '',
        alipayAccount: '',
        financialWay: '',
        financialWayId: '',
        settlementSn: '',
        amount: 0,
        agent: '',
        remark: ''
      },
      formModelRules: {},
      setLoadTableList: {},
      countSuccessList: [],
      isEdit: false,
      loadTable: [],
      addIncomeInfo: {},
      countNum: 0,
      financialWays: [],
      isFinancialWays: false,
      tableKey: 0,
      feeName: {
        arrPayName: [],
        arrNoPayName: [],
        arrPayNameActual: [],
        arrhadPayName: []
      },
      FINANCE_WAY: {
        280: '银行卡',
        281: '支付宝',
        282: '微信',
        283: '现金',
        284: '支票',
        '银行卡': 280,
        '支付宝': 281,
        '微信': 282,
        '现金': 283,
        '支票': 284
      }
    }
  },
  computed: {
    ...mapGetters([
      'otherinfo'
    ]),
    getRouteInfo() {
      return this.$route.query.orgId ? this.$route.query.orgId : this.otherinfo.orgid
    }
  },
  mounted() {
    this.getFeeInfo()
  },
  methods: {
    getSystemTime() {
      getSystemTime().then(data => {
          this.formModel.settlementTime = parseTime(data)
        })
        .catch(err => {
          this._handlerCatchMsg(err)
        })
    },
    getFeeInfo() {
      this.getOrgFirstFinancialWay() // 获取收支方式
      getFeeInfo(this.getRouteInfo, this.paymentsType).then(data => {
          this.loading = false
          this.getSystemTime()
          this.formModel.amount = data.amount
          this.formModel.settlementSn = data.settlementSn
          // this.formModel.agent = data.szDtoList[0].agent
          this.formModel.agent = this.otherinfo.name
          this.formModel.wechatAccount = data.szDtoList[0].wechatAccount
          this.formModel.alipayAccount = data.szDtoList[0].alipayAccount
          this.formModel.financialWay = data.szDtoList[0].financialWay
          this.formModel.bankAccount = data.szDtoList[0].bankAccount
          this.formModel.remark = data.remark

        })
        .catch(err => {
          this._handlerCatchMsg(err)
        })

    },
    doAction(type) {
      switch (type) {
        case 'save': // 保存
          this.save()
          break
        case 'cancel': // 取消
          this.cancel()
          break
        case 'savePrint': // 保存并打印
          break
        case 'count':
          this.countVisible = true
          break
      }
    },
    setFinanceWay(obj) {
      this.formModel.financialWayId = obj
      this.formModel.financialWay = obj
      this.getOrgFirstFinancialWay()
    },
    setData() { // 设置传给后台的数据结构
      if (typeof this.formModel.financialWay === 'string') {
        this.formModel.financialWayId = this.FINANCE_WAY[this.formModel.financialWay]
        this.formModel.financialWay = this.formModel.financialWay
      } else {
        this.formModel.financialWayId = this.formModel.financialWay
        this.formModel.financialWay = this.FINANCE_WAY[this.formModel.financialWay]
      }
      this.loadTable.forEach(e => {
        this.feeName.arrPayName.forEach((el, index) => {
          e[el] = e[this.feeName.arrPayNameActual[index]]
        })
      })
      const szDtoList = []
      szDtoList.push(this.formModel)
      this.addIncomeInfo = Object.assign({}, this.formModel)
      this.$set(this.addIncomeInfo, 'settlementId', this.settlementId)
      this.$set(this.addIncomeInfo, 'orgId', this.getRouteInfo)
      this.$set(this.addIncomeInfo, 'paymentsType', this.paymentsType)
      this.$set(this.addIncomeInfo, 'detailDtoList', this.loadTable)
      this.$set(this.addIncomeInfo, 'szDtoList', szDtoList)
    },
    save() {
      if (this.loadTable.length < 1) {
        this.$message({ type: 'warning', message: '右边表格不能为空！' })
        return false
      }
      this.setData()
      this.loading = true
      postAddIncome(this.addIncomeInfo).then(data => { // 保存
          this.loading = false
          this.$message({ type: 'success', message: '保存成功！' })
          this.getFeeInfo()
          this.tableKey = new Date().getTime()
          this.$router.push({ path: './settleLog', query: { pageKey: new Date().getTime() } })
        })
        .catch(err => {
          this.loading = false
          this._handlerCatchMsg(err)
        })
    },
    cancel() {
      this.$confirm('确定要取消记收入操作吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$router.push({
          path: './settleLog',
          query: {
            pageKey: new Date().getTime()
          }
        })
      })
    },
    getFeeName(obj) {
      this.feeName = Object.assign([], obj)
    },
    getLoadTable(obj) { // 获取右边合计总数 = 收入金额
      let amount = 0
      this.loadTable = Object.assign([], obj)
      this.loadTable.forEach((e, index) => {
        amount += e.shipFeeTotalActual
      })
      this.formModel.amount = amount
    },
    countSuccess(list) {
      this.countSuccessList = Object.assign([], list.info)
      this.countNum = list.count
    },
    getOrgFirstFinancialWay() { // 获取收支方式
      let obj = {
        financialWay: this.FINANCE_WAY[this.formModel.financialWay], // 转中文
        orgId: this.getRouteInfo
      }
      getOrgFirstFinancialWay(obj).then(data => {
        this.financialWays = data
        if (this.financialWays) {
          this.formModel.bankAccount = this.financialWays.bankAccount ? this.financialWays.bankAccount : ''
          this.formModel.wechatAccount = this.financialWays.wechatAccount ? this.financialWays.wechatAccount : ''
          this.formModel.alipayAccount = this.financialWays.alipayAccount ? this.financialWays.alipayAccount : ''
        } else {
          this.formModel.bankAccount = ''
          this.formModel.wechatAccount = ''
          this.formModel.alipayAccount = ''
        }
      }).catch((err) => {
        this.loading = false
        this._handlerCatchMsg(err)
      })
    }
  }
}

</script>
<style lang="scss">
.fee-steup {
  height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  position: relative;
  .fee_btn_transferTable {
    display: flex;
    flex-direction: column;
    flex: 1;
    height: 100%;
  }
  .fee_btn_boxs {
    position: relative;
    top: 18px;
    right: 10px;
    z-index: 33;
    text-align: right;
    height: 0;
  }
  .fee-steup-form {
    flex-grow: 1;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 10px 10px 0 10px;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;

    .feeFrom {
      margin-bottom: 10px;
      padding: 0 10px;
      .feeFrom-type {
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
      .el-input.is-disabled .el-input__inner {
        background-color: #fff;
        color: #222;
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
    .feeFrom-type-baseInfo {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-bottom: -10px;
      .el-input {
        width: 220px;
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
      color: #b4b4b4;
    }
    .highlighted .addr {
      color: #ddd;
    }
  }
}

ul.feeList {
  margin: 10px;
  border: 1px solid #d0d7e5;
  display: flex;
  li {
    text-align: center;
    height: 70px;
    border-right: 1px solid #d0d7e5;
    p {
      background-color: #eaf0ff;
      line-height: 36px;
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
  }
}

</style>
