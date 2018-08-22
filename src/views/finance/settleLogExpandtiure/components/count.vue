<template>
  <!-- 智能结算弹出框 -->
  <el-dialog :title="'智能结算-'+title" :visible.sync="isShow" :close-on-click-modal="false" :before-close="closeMe" class="tms_dialog tms_dialog_count" width="600px">
    <el-form ref="formModel" :inline="true" size="mini" label-position="right" :rules="rules" :model="formModel" label-width="70px">
      <el-form-item label="发货人" prop="shipSenderName" v-if="settlementId===178">
        <el-select v-model="formModel.shipSenderName" filterable placeholder="搜索发货人" clearable>
          <el-option v-for="item in senderOptions" :key="item.customerId" :label="item.customerName" :value="item.customerName">
          </el-option>
        </el-select>
        <!-- <querySelect search="customerName" type="sender" valuekey="customerName" label="customerName" v-model="formModel.shipSenderName" :remote="true" /> -->
      </el-form-item>
      <el-form-item label="车牌号" prop="truckIdNumber" v-else>
        <el-select v-model="formModel.truckIdNumber" filterable placeholder="搜索车牌号" clearable>
          <el-option v-for="item in truckOptions" :key="item.truckId" :label="item.truckIdNumber" :value="item.truckIdNumber">
          </el-option>
        </el-select>
        <!-- <querySelect search="truckIdNumber" type="trunk" valuekey="truckIdNumber" label="truckIdNumber" v-model="formModel.truckIdNumber" :remote="true" /> -->
      </el-form-item>
      <el-form-item label="支出金额" prop="autoTotalAmount">
        <el-input placeholder="只能输入阿拉伯数字" v-numberOnly:point v-model="formModel.autoTotalAmount"></el-input>
      </el-form-item>
      <el-form-item label="费用项">
        <el-select v-model="formModel.feeId" v-if="settlementId === 178">
          <el-option label="全部" value=""></el-option>
          <el-option v-for="item in feeIds" :label="item.feeType" :value="item.id" :key="item.id"></el-option>
        </el-select>
        <el-select v-model="formModel.settlementId" v-else @change="selectFeeIdBatch">
          <el-option v-for="item in feeIdsBatch" :key="item.id" :label="item.feeType" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="开单日期">
        <el-date-picker v-model="searchTime" type="daterange" align="right" value-format="yyyy-MM-dd HH:mm:ss" start-placeholder="开始日期" :picker-options="pickerOptions2" end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
    </el-form>
    <p>提示：智能结算可以按照发货人开单日期自动挑选运单结算，运用场景如:某某客户结算某个月运费一万块，可以筛选客户，收入金额10000块，系统将自动挑选运单结算。</p>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="onSubmit('formModel')">确 定</el-button>
    <el-button @click="closeMe">取 消</el-button>
    
  </span>
  </el-dialog>
</template>
<script>
import { objectMerge2, parseTime, pickerOptions2 } from '@/utils/index'
import querySelect from '@/components/querySelect/index'
import { getFeeTypeDict, getOrderShipList } from '@/api/finance/settleLog'
import { getAllCustomer } from '@/api/company/customerManage'
import { getAllTrunk} from '@/api/company/trunkManage'
export default {
  components: {
    querySelect
  },
  props: {
    popVisible: {
      type: Boolean,
      default: false
    },
    info: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: '智能结算'
    },
    setSettlementId: {
      type: [Number, String]
    }
  },
  data() {
    return {
      formModel: {
        autoTotalAmount: 0,
        paymentsType: 1, // 收支类型, 0 收入, 1 支出
        feeId: ''
      },
      senderOptions: [],
      truckOptions: [],
      settlementId: 179, // 178-运单结算 179-干线批次结算 180-短驳结算 181-送货结算
      incomePayType: 'PAYABLE', // RECEIVABLE-运单收入费用项 PAYABLE-运单支出费用项
      rules: {},
      searchTime: [parseTime(new Date() - 60 * 24 * 60 * 30 * 1000), parseTime(new Date())],
      pickerOptions2: {
        shortcuts: pickerOptions2
      },
      feeIds: [],
      feeIdsBatch: [{
        id: 179,
        feeType: '干线'
      }, {
        id: 180,
        feeType: '短驳'
      }, {
        id: 181,
        feeType: '送货'
      }]
    }
  },
  computed: {
    isShow: {
      get() {
        if (this.popVisible) {
          this.formModel = this.$options.data().formModel
          switch (this.title) {
            case '批次':
              this.getAllTrunk()
              this.settlementId = 179
              this.formModel.settlementId = this.setSettlementId
              this.$set(this.formModel, 'truckIdNumber', '')
              break
            case '运单':
              this.getAllCustomer()
              this.settlementId = 178
              this.formModel.settlementId = ''
              this.$set(this.formModel, 'shipSenderName', '')

              break
          }
          this.init()
        }
        return this.popVisible
      },
      set() {}
    }
  },
  watch: {
    title: {
      handler(cval, oval) {},
      deep: true
    },
    setSettlementId: {
      handler(cval, oval) {
        if (this.settlementId === 179) {
          this.formModel.settlementId = cval
        }
      },
      deep: true
    }
  },
  methods: {
    init() {
      this.getFeeTypeDict()
    },
    getAllCustomer() { // 获取发货人
      let searchQuery = {
        currentPage: 1,
        pageSize: 200,
        vo: {
          orgid: this.otherinfo.orgid,
          customerType: 1,
          customerMobile: '',
          customerName: ''
        }
      }
      getAllCustomer(searchQuery).then(data => {
        this.senderOptions = data.list
      })
    },
    getAllTrunk () { // 获取车牌号
      let searchQuery = {
        currentPage: 1,
        pageSize: 200,
        vo: {
          orgid: this.otherinfo.orgid,
          truckIdNumber: '',
          truckSource: ''
        }
      }
      getAllTrunk(searchQuery).then(data => {
        this.truckOptions = data.list
      })
    },
    getFeeTypeDict() {
      // this.settlementId = 178
      getFeeTypeDict(this.settlementId).then(data => {
        this.feeIds = data
      })
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$set(this.formModel, 'startTime', parseTime(this.searchTime[0], '{y}-{m}-{d} ') + '00:00:00')
          this.$set(this.formModel, 'endTime', parseTime(this.searchTime[1], '{y}-{m}-{d} ') + '23:59:59')
          this.$set(this.formModel, 'orgId', this.otherinfo.orgid)
          this.$set(this.formModel, 'incomePayType', this.incomePayType)
          if (this.settlementId === 178) {
            this.$set(this.formModel, 'settlementId', this.settlementId)
          }

          this.formModel.autoTotalAmount = Number(this.formModel.autoTotalAmount)
          let info = Object.assign({}, this.formModel)
          getOrderShipList(info).then(data => {
              this.$emit('success', { info: data, count: info.autoTotalAmount, type: this.settlementId })
              this.closeMe()
              this.$message({ type: 'success', message: '智能结算搜索运单操作成功' })
            })
            .catch(error => {
              this.$message({ type: 'error', message: error.errorInfo || error.text })
            })
        }
      })
    },
    selectFeeIdBatch(obj) {
      this.$emit('change', obj)
    },
    closeMe(done) {
      this.$emit('close')
      if (typeof done === 'function') {
        done()
      }
    }
  }
}

</script>
