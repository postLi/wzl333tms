<template>
  <!-- 智能结算弹出框 -->
  <el-dialog title="智能结算" :visible.sync="isShow" :close-on-click-modal="false" :before-close="closeMe" class="tms_dialog tms_dialog_count" width="600px">
    <el-form ref="formModel" :inline="true" size="mini" label-position="right" :rules="rules" :model="formModel" label-width="70px">
          <el-form-item label="发货人" prop="shipSenderName">
            <querySelect search="customerName" type="sender" valuekey="customerName" label="customerName" v-model="formModel.shipSenderName" :remote="true" />
          </el-form-item>
          <el-form-item label="收入金额" prop="autoTotalAmount">
            <el-input placeholder="只能输入阿拉伯数字" v-numberOnly:point v-model="formModel.autoTotalAmount"></el-input>
          </el-form-item>
          <el-form-item label="费用项" prop="feeId">
            <el-select v-model="formModel.feeId">
              <el-option label="全部" value=""></el-option>
              <el-option v-for="item in feeIds" :label="item.feeType" :value="item.id" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="开单日期">
            <el-date-picker v-model="searchTime" type="daterange" align="right" value-format="yyyy-MM-dd HH:mm:ss" start-placeholder="开始日期" :picker-options="pickerOptions2" end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
    </el-form>
    <p>提示：智能结算可以按照发货人开单日期自动挑选运单结算，运用场景如:某某客户结算某个月运费一万块，可以筛选客户，收入金额10000块，系统将自动挑选运单结算。</p>
    <span slot="footer" class="dialog-footer">
    <el-button @click="closeMe">取 消</el-button>
    <el-button type="primary" @click="onSubmit('formModel')">确 定</el-button>
  </span>
  </el-dialog>
</template>
<script>
import { objectMerge2, parseTime, pickerOptions2 } from '@/utils/index'
import querySelect from '@/components/querySelect/index'
import { getFeeTypeDict, getOrderShipList } from '@/api/finance/settleLog'
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
    }
  },
  data() {
    return {
      formModel: {
        autoTotalAmount: 0,
        settlementId: 178,
        feeId: ''
      },
      rules: {},
      searchTime: [parseTime(new Date() - 60 * 24 * 60 * 30 * 1000), parseTime(new Date())],
      pickerOptions2: {
        shortcuts: pickerOptions2
      },
      feeIds: []
    }
  },
  computed: {
    isShow: {
      get() {
        if (this.popVisible) {
          this.formModel = this.$options.data().formModel
          this.init()
        }
        return this.popVisible
      },
      set() {}
    }
  },
 
  methods: {
    init() {
      this.getFeeTypeDict()
    },
    getFeeTypeDict() {
      this.settlementId = 178
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
          this.$set(this.formModel, 'incomePayType', 'RECEIVABLE')
          this.$set(this.formModel, 'paymentsType', 0)
          this.formModel.autoTotalAmount = Number(this.formModel.autoTotalAmount)
          let info = Object.assign({}, this.formModel)
          getOrderShipList(info).then(data => {
            this.$emit('success', {info:data, count: this.formModel.autoTotalAmount})
            this.closeMe()
            this.$message({type: 'success', message: '智能结算搜索运单操作成功'})
          })
          .catch(error => {
            this.$message({type: 'error', message: error.errorInfo || error.text})
          })
        }
      })
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
