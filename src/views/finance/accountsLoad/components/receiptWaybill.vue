<template>
  <el-dialog :title="dialogTitle" v-loading="loading" :visible.sync="isShow" :close-on-click-modal="false" :before-close="closeMe" class="receiptDialog">
    <el-form ref="formModel" :model="formModel" :rules="rules">
      <div id="settlementWaybill">
        <div class="receiptDialog_head">
          <div class="receiptDialog_head_item">
            <label>单据号</label>
            <el-input v-model="formModel.settlementSn" placeholder="请输入" :size="btnsize" disabled></el-input>
          </div>
          <div class="receiptDialog_head_item">
            <label>发生时间</label>
            <el-date-picker :size="btnsize" v-model="formModel.settlementTime" value-format="yyyy-MM-dd HH:mm:ss" type="date">
            </el-date-picker>
          </div>
          <div class="receiptDialog_head_item">
            <label>经办人</label>
            <!-- <el-input v-model="formModel.settlementBy" placeholder="请输入" :size="btnsize"></el-input> -->
            <querySelect v-model="formModel.settlementBy" :size="btnsize" valuekey="name" show="select" search="name" label="name"></querySelect>
          </div>
        </div>
        <div class="receiptDialog_table">
          <el-table :data="formModel.detailDtoList2" style="width: 100%; height:100%;" height="100%" stripe show-summary :summary-method="getSum">
            <el-table-column prop="date" label="序号" type="index" width="70">
            </el-table-column>
            <el-table-column prop="dataName" label="费用项">
            </el-table-column>
            <el-table-column>
              <el-table-column prop="tenMillion" label="千" width="40">
              </el-table-column>
              <el-table-column prop="million" label="百" width="40">
              </el-table-column>
              <el-table-column prop="oneHundrenThousand" label="十" width="40">
              </el-table-column>
              <el-table-column prop="tenThousand" label="万" width="40">
              </el-table-column>
              <el-table-column prop="thousand" label="千" width="40">
              </el-table-column>
              <el-table-column prop="hundren" label="百" width="40">
              </el-table-column>
              <el-table-column prop="ten" label="十" width="40">
              </el-table-column>
              <el-table-column prop="yuan" label="元" width="40">
              </el-table-column>
              <el-table-column prop="jiao" label="角" width="40">
              </el-table-column>
              <el-table-column prop="fen" label="分" width="40">
              </el-table-column>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="receiptDialog_todo">
        <el-button class="tableBtnAdd" size="mini" @click="plusItem"></el-button>
        <el-table :data="formModel.szDtoList" border style="width: 100%;" height="100%" stripe>
          <el-table-column fixed width="50">
            <template slot-scope="scope">
              <el-button class="tableBtnMinus" size="mini" @click="minusItem(scope.row, scope.$index)"></el-button>
            </template>
          </el-table-column>
          <el-table-column prop="financialWay" label="收支方式" width="80">
            <template slot-scope="props">
              <!-- <querySelect v-model="props.row.financialWay" :popClass="'querySelectItem'" search="financialWay" keyvalue="financialWay" type="payway" :size="btnsize"  @change="(item) => sender(item,props.$index)">
                <template slot-scope="{item}">
                  <span v-for="obj in BANK_INFO">{{item[obj]}}</span>
                </template>
              </querySelect> -->
              <el-autocomplete popper-class="querySelectItem" v-model="props.row.financialWay" :size="btnsize" :fetch-suggestions="querySearch" placeholder="支付方式" @select="(item) => sender(item,props.$index)">
                <template slot-scope="{item}">
                  <span v-for="obj in BANK_INFO">{{item[obj]}}</span>
                </template>
              </el-autocomplete>
            </template>
          </el-table-column>
          <el-table-column prop="bankName" label="银行名称">
            <template slot-scope="props">
              <el-input v-model="props.row.bankName" :size="btnsize" :maxlength="maxlength"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="bankAccount" label="银行卡号" width="200">
            <template slot-scope="props">
              <el-input v-model="props.row.bankAccount" :size="btnsize" :maxlength="maxlength" v-numberOnly></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="bankAccountName" label="开户人" width="80">
            <template slot-scope="props">
              <el-input v-model="props.row.bankAccountName" :size="btnsize" :maxlength="maxlength"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="chequeNumber" label="支票号码">
            <template slot-scope="props">
              <el-input v-model="props.row.chequeNumber" :size="btnsize" :maxlength="maxlength" v-numberOnly></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="receivableNumber" label="汇款号码">
            <template slot-scope="props">
              <el-input v-model="props.row.receivableNumber" :size="btnsize" :maxlength="maxlength" v-numberOnly></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="wechatAccount" label="微信号">
            <template slot-scope="props">
              <el-input v-model="props.row.wechatAccount" :size="btnsize" :maxlength="maxlength"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="alipayAccount" label="支付宝号">
            <template slot-scope="props">
              <el-input v-model="props.row.alipayAccount" :size="btnsize" :maxlength="maxlength"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="agent" label="经办人" width="80">
            <template slot-scope="props">
              <querySelect v-model="props.row.agent" :size="btnsize" valuekey="name" show="select" search="name" label="name" :maxlength="maxlength"></querySelect>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="receiptDialog_remark">
        <label>备注</label>
        <el-input v-model="formModel.remark" placeholder="最多可输入300个字符" :size="btnsize" :maxlength="300"></el-input>
      </div>
    </el-form>
    <div slot="footer">
      <el-button type="primary" @click="submitForm('formModel')" :size="btnsize" icon="el-icon-document">保存</el-button>
      <el-button type="primary" @click="print" :size="btnsize" icon="el-icon-printer">保存并打印</el-button>
      <el-button type="danger" @click="closeMe" :size="btnsize" icon="el-icon-circle-close-outline">取 消</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { REGEX } from '@/utils/validate'
import { mapGetters } from 'vuex'
import { GetFeeInfo, postCreateloadSettlement } from '@/api/finance/accountsPayable'
import { getSystemTime } from '@/api/common'
import { objectMerge2, parseTime } from '@/utils/index'
import { smalltoBIG } from '@/filters/'
import querySelect from '@/components/querySelect/index'
import { PrintSettlement } from '@/utils/lodopFuncs'
import { postTmsFfinancialwayList } from '@/api/finance/financefinancialway'
export default {
  components: {
    querySelect
  },
  data() {
    const pretimeIdentifier = (rule, value, callback) => {
      if (value < 0 || value > 12) {
        callback(new Error('请输入0-12的数字'))
      } else {
        callback()
      }
    }

    return {
      maxlength: 30,
      amount: 0,
      amountMessage: '',
      formModel: {
        detailDtoList2: [],
        settlementBy: ''
      },
      loading: true,
      financialWalList: [],
      rules: {},
      btnsize: 'mini',
      dialogTitle: '结 算 付 款 单',
      submitData: {},
      BANK_INFO: ['financialWay', 'bankName', 'bankAccount', 'bankAccountName', 'chequeNumber', 'receivableNumber', 'wechatAccount', 'alipayAccount', 'agent'],
      // settlementTypeId: 180, // 178：运单核销、179：干线批次核销、180：短驳批次核销、181：送货批次核销
      paymentsType: 1 // 收支类型, 0 收入, 1 支出,
    }
  },
  computed: {
    ...mapGetters([
      'otherinfo'
    ]),
    isShow: {
      get() {
        return this.popVisible
      },
      set() {}
    },
    getRouteInfo() {
      return JSON.parse(this.$route.query.searchQuery)
    },
    settlementTypeId() {
      const currentPage = this.$route.query.currentPage
      switch (currentPage) {
        case 'batchArrivalAll':
          return 179
      }
    },
    dataName() {
      const currentPage = this.$route.query.currentPage
      switch (currentPage) {
        case 'waybillKickback':
          return '回扣'
        case 'waybillTicket':
          return '单票提货费'
        case 'waybillOther':
          return '其他费用支出'
        case 'waybillTransfer':
          return '中转费'
        case 'waybillAbnormal':
          return '异常理赔'
        case 'waybillUnusual':
          return '异动费用核销'
      }
    },
    currentPage() {
      const currentPage = this.$route.query.currentPage
      return currentPage.substr(7, currentPage.length)
    }
  },
  props: {
    popVisible: {
      type: Boolean,
      default: false
    },
    info: {
      type: Array,
      default: []
    }
  },
  watch: {
    popVisible() {
      if (this.popVisible) {
        this.isShow = true
        this.getFeeInfo()
      } else {
        this.isShow = false
      }
    },
    info(newVal) {
      if (newVal) {
        return this.info
      }
    }
  },
  mounted() {
    this.postTmsFfinancialwayList()
    this.$nextTick(() => {
      this.init()
    })
  },
  methods: {
    valueNumber(val) {
      return val.replace(/[^\d]/g, '')
    },
    print() {
      const data = Object.assign(this.formModel)
      this.$set(data, 'amountMessage', this.amountMessage) // 把大写数字传进去
      PrintSettlement(data)
      this.submitForm('formModel')
    },
    postTmsFfinancialwayList() {
      const query = {
        currentPage: 1,
        pageSize: 100,
        vo: {
          financialWay: '',
          financialWayTypeId: '',
          orgId: this.otherinfo.orgid,
          status: ''
        }
      }
      postTmsFfinancialwayList(query).then(data => {
        // this.financialWalList = data.list
        this.financialWalList = []
        data.list.forEach(e => {
          if (e.statusStr === '启用') {
            this.financialWalList.push(e)
          }
        })
      }).catch((err) => {
        this.loading = false
        this._handlerCatchMsg(err)
      })
    },
    querySearch(queryString, cb) {
      const dataList = this.financialWalList
      const results = queryString ? dataList.filter(this.createFilter(queryString)) : dataList
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter(queryString) {
      return (res) => {
        return (res.financialWay.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    init() {
      this.loading = false
    },
    getFeeInfo() {
      const orgId = this.otherinfo.orgid
      return GetFeeInfo(orgId, this.paymentsType).then(data => {
        this.formModel = data.data
        this.formModel.detailDtoList2 = []
        this.formModel.settlementTime = parseTime(new Date())
        this.formModel.settlementBy = this.otherinfo.name
        // this.getSystemTime()
        this.initDetailDtoList()
        this.formModel.szDtoList.forEach(e => {
          e.agent = this.otherinfo.name
        })
        if (this.formModel.szDtoList.length < 1) { // 默认显示一条收支方式
          this.plusItem()
        }
      }).catch((err) => {
        this.loading = false
        this._handlerCatchMsg(err)
      })
    },
    initDetailDtoList() {
      this.formModel.amount = 0
      this.formModel.detailDtoList = objectMerge2([], this.info)
      // 设置费用项
      let obj = {}
      this.formModel.detailDtoList.map(el => {
        if (obj[el.dataName]) {
          obj[el.dataName].amount += el.amount
        } else {
          obj[el.dataName] = el
        }
      })
      for (const i in obj) {
        this.formModel.detailDtoList2.push(obj[i])
      }
      obj = {}

      this.formModel.detailDtoList2.forEach((e, index) => {
        this.formModel.amount += e.amount
        const data = Number(e.amount).toFixed(2).toString().split('').reverse() // 默认保留两位小数 toFixed(2)
        const item = data.indexOf('.')
        if (item !== -1) {
          data.splice(item, 1)
        }
        e.fen = data[0]
        e.jiao = data[1]
        e.yuan = data[2]
        e.ten = data[3]
        e.hundren = data[4]
        e.thousand = data[5]
        e.tenThousand = data[6]
        e.oneHundrenThousand = data[7]
        e.million = data[8]
        e.tenMillion = data[9]
      })
      this.amountMessage = smalltoBIG(this.formModel.amount) // 转换成中午大写数字
      this.amount = this.formModel.amount.toFixed(2).toString().split('').reverse()
      const apoint = this.amount.indexOf('.')
      if (apoint !== -1) {
        this.amount.splice(apoint, 1)
      }
    },
    sender(item, index) {
      this.$set(this.formModel.szDtoList, index, Object.assign(this.formModel.szDtoList[index], item))
    },
    getSystemTime() {
      getSystemTime().then(data => {
        this.formModel.settlementTime = new Date(data.trim())
      }).catch((err) => {
        this.loading = false
        this._handlerCatchMsg(err)
      })
    },
    closeMe(done) {
      this.$emit('close')
      if (typeof done === 'function') {
        done()
      }
    },
    setData() {
      let capitalFlow = {}
      let financialWayLogs = []
      let shipPayableFeeDtos = []
      // this.$set(this.submitData, 'ascriptionOrgid', this.getRouteInfo.vo.ascriptionOrgid)
      // this.$set(this.submitData, 'settlementId', this.settlementId)

      if (this.dataName === '中转费') { // 中转核销的时候 传给后台中转网点
        this.$set(capitalFlow, 'orgId', this.getRouteInfo.vo.transferOrgid)
      } else if (this.dataName === '异常理赔') {
        this.$set(capitalFlow, 'orgId', this.getRouteInfo.vo.orgid)
      } else {
        this.$set(capitalFlow, 'orgId', this.getRouteInfo.vo.shipFromOrgid)
      }
      this.$set(capitalFlow, 'settlementSn', this.formModel.settlementSn)
      this.$set(capitalFlow, 'settlementBy', this.formModel.settlementBy)
      this.$set(capitalFlow, 'settlementTime', this.formModel.settlementTime)
      this.$set(capitalFlow, 'remark', this.formModel.remark)
      this.$set(capitalFlow, 'detailDtoList', this.formModel.detailDtoList)
      this.$set(capitalFlow, 'szDtoList', this.formModel.szDtoList)
      financialWayLogs = Object.assign([], this.formModel.szDtoList)
      shipPayableFeeDtos = Object.assign([], this.info)
      this.$set(this.submitData, 'capitalFlow', capitalFlow)
      this.$set(this.submitData, 'financialWayLogs', financialWayLogs)
      this.$set(this.submitData, 'shipPayableFeeDtos', shipPayableFeeDtos)
      capitalFlow = {}
      financialWayLogs = []
      shipPayableFeeDtos = []
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.setData()
          console.log('submitData', this.submitData)
          let orgid = ''
          if (this.dataName === '中转费') { // 中转核销的时候 传给后台中转网点
            orgid = this.getRouteInfo.vo.transferOrgid
          } else if (this.dataName === '异常理赔') {
            orgid = this.getRouteInfo.vo.orgid
          } else {
            orgid = this.getRouteInfo.vo.shipFromOrgid
          }
          // return false /////////////////////////////////////////////
          postCreateloadSettlement(orgid, this.submitData).then(data => {
            this.$message({ type: 'success', message: '保存成功' })
            this.closeMe()
              // this.$router.push({ path: './accountsPayable/waybill', query:{name: this.currentPage} })
            const currentPage = this.currentPage.substring(0, 1).toLowerCase() + this.currentPage.substring(1)
            this.$router.push({ path: './accountsPayable/waybill/' + currentPage })
          })
            .catch(err => {
              this._handlerCatchMsg(err)
            })
        }
      })
    },
    minusItem(row, index) {
      const item = this.formModel.szDtoList.indexOf(row)
      if (item !== -1) {
        this.formModel.szDtoList.splice(item, 1)
      }
    },
    plusItem() {
      const data = {
        agent: this.otherinfo.name,
        alipayAccount: '',
        bankAccount: '',
        bankAccountName: '',
        bankName: '',
        chequeNumber: '',
        financialWay: '',
        flowId: '',
        receivableNumber: '',
        rnum: '',
        wechatAccount: ''
      }
      this.formModel.szDtoList.push(data)
    },
    getSum(param) { // 表格合计-自定义显示
      const { columns, data } = param
      const sums = []
      this.$nextTick(() => {})
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
          return
        }
        if (index === 1) {
          sums[index] = this.amountMessage
          return
        }
        let count = -2 // 从第3列开始显示
        for (let i = 12; i > 2; i--) {
          count++
          if (index === i) {
            sums[index] = this.amount[count]
            return
          }
        }
        const values = data.map(item => Number(item[column.property]))
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
          sums[index] += ''
        } else {
          sums[index] = ''
        }
      })
      return sums
    }
  }
}

</script>
