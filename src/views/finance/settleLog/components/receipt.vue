<template>
  <el-dialog :title="dialogTitle" v-loading="loading" :visible.sync="isShow" :close-on-click-modal="false" :before-close="closeMe" class="receiptDialog">
    <el-form ref="formModel" :model="formModel" :rules="rules">
      <div class="receiptDialog_head">
        <div class="receiptDialog_head_item">
          <label>单据号</label>
          <el-input v-model="formModel.settlementSn" placeholder="单据号" :size="btnsize" :disabled="isEdit"></el-input>
        </div>
        <div class="receiptDialog_head_item">
          <label>发生时间</label>
          <el-date-picker :size="btnsize" v-model="formModel.settlementTime" value-format="yyyy-MM-dd HH:mm:ss" type="date" :disabled="isEdit" placeholder="发生时间">
          </el-date-picker>
        </div>
        <div class="receiptDialog_head_item">
          <label>经办人</label>
          <el-input v-model="formModel.settlementBy" :size="btnsize" placeholder="经办人" :disabled="isEdit"></el-input>
        </div>
      </div>
      <div class="receiptDialog_table">
        <el-table :data="formModel.flowFeeMidList" style="width: 100%; height:100%;" height="100%" stripe show-summary :summary-method="getSum">
          <el-table-column prop="date" label="序号" type="index" width="70">
          </el-table-column>
          <el-table-column prop="feeType" label="费用项">
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
      <div class="receiptDialog_todo">
        <el-table :data="formModel.szDtoList" border style="width: 100%;" height="100%" stripe>
          <el-table-column prop="financialWay" label="收支方式" width="100">
          </el-table-column>
          <el-table-column prop="bankName" label="银行名称">
          </el-table-column>
          <el-table-column prop="bankAccount" label="银行卡号">
          </el-table-column>
          <el-table-column prop="bankAccountName" label="开户人">
          </el-table-column>
          <el-table-column prop="chequeNumber" label="支票号码">
          </el-table-column>
          <el-table-column prop="receivableNumber" label="汇款号码">
          </el-table-column>
          <el-table-column prop="wechatAccount" label="微信号">
          </el-table-column>
          <el-table-column prop="alipayAccount" label="支付宝号">
          </el-table-column>
          <el-table-column prop="agent" label="经办人" width="110">
          </el-table-column>
        </el-table>
      </div>
      <div class="receiptDialog_remark">
        <label>备注</label>
        <el-input v-model="formModel.remark" placeholder="备注" :size="btnsize" :disabled="isEdit" :maxlength="300"></el-input>
      </div>
    </el-form>
    <div slot="footer">
      <el-button type="danger" @click="closeMe" :size="btnsize" icon="el-icon-circle-close-outline">{{isEdit?'关 闭':'取 消'}}</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { REGEX } from '@/utils/validate'
import { mapGetters } from 'vuex'
import { getSettlementInfo } from '@/api/finance/settleLog'
import { getSystemTime } from '@/api/common'
import { objectMerge2, parseTime } from '@/utils/index'
import { smalltoBIG } from '@/filters/'
import querySelect from '@/components/querySelect/index'
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
      isEdit: true, // false-编辑状态 true-查看状态
      amount: 0,
      amountMessage: '',
      formModel: {},
      loading: true,
      rules: {},
      settlementInfo: {},
      btnsize: 'mini',
      dialogTitle: '结 算 收 款 单',
      submitData: {},
      // settlementTypeId: 180, // 178：运单结算、179：干线批次结算、180：短驳批次结算、181：送货批次结算
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
      return this.$route.query.searchQuery
    },
    settlementTypeId() {
      let currentPage = this.$route.query.currentPage
      switch (currentPage) {
        case 'batchShort':
          return 180
        case 'batchDeliver':
          return 181
        case 'batchInsurance':
          return 179
        case 'batchStationLoad':
          return 179
        case 'batchStationOther':
          return 179
        case 'batchArrivalLoad':
          return 179
        case 'batchArrivalOther':
          return 179
        case 'batchArrivalAll':
          return 179
      }
    },
    dataName() {
      let currentPage = this.$route.query.currentPage
      switch (currentPage) {
        case 'batchShort':
          return '短驳费'
        case 'batchDeliver':
          return '送货费'
        case 'batchInsurance':
          return '整车保险费'
        case 'batchStationLoad':
          return '发站装卸费'
        case 'batchStationOther':
          return '发站其他费'
        case 'batchArrivalLoad':
          return '到站装卸费'
        case 'batchArrivalOther':
          return '到站其他费'
        case 'waybillKickback':
          return '回扣'
      }
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
        console.log('info', this.info)
        return this.info
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.init()
    })
  },
  methods: {
    init() {
      this.loading = false
    },
    getFeeInfo() {
      this.$set(this.formModel, 'szDtoList', [])
      getSettlementInfo(this.info[0].flowId).then(data => {
        this.settlementInfo = data.data
        this.initDetailDtoList()
      })
    },
    initDetailDtoList() {
      this.formModel = Object.assign({}, this.settlementInfo)
      console.log(this.formModel)
      if (this.formModel.flowFeeMidList.length > 0) {
        this.formModel.flowFeeMidList.forEach((e, index) => {
          let data = e.amount.toFixed(2).toString().split('').reverse()
          let item = data.indexOf('.')
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
      }
      this.amountMessage = smalltoBIG(this.formModel.amount)
      this.amount = this.formModel.amount.toFixed(2).toString().split('').reverse()
      let apoint = this.amount.indexOf('.')
      if (apoint !== -1) {
        this.amount.splice(apoint, 1)
      }
    },
    getSystemTime() {
      getSystemTime().then(data => {
        this.formModel.settlementTime = new Date(data.trim())
      })
    },
    closeMe(done) {
      this.$emit('close')
      if (typeof done === 'function') {
        done()
      }
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
          sums[index] = 'N/A'
        }
      })
      return sums
    }
  }
}

</script>
