<template>
  <el-dialog :title="dialogTitle" v-loading="loading" :visible.sync="isShow" :close-on-click-modal="false" :before-close="closeMe" class="incomeDialog">
    <el-form ref="formModel" :model="formModel" :rules="rules" :inline="true" label-width="120px" v-loading="loading">
      <div class="income_item">
        <el-form-item label="方向">
          <el-select v-model="formModel.verificationWay" filterable placeholder="请选择" :size="btnsize">
            <el-option v-for="(value, key) in veryficationList" :value="value.id" :key="key" :label="value.verificationWay"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发生金额" prop="amount">
          <el-input v-model.number="formModel.amount" placeholder="发生金额" :size="btnsize" :maxlength="8"></el-input>
        </el-form-item>
      </div>
      <div class="income_item">
        <el-form-item label="一级科目">
          <el-select v-model="formModel.subjectOne" filterable placeholder="请选择" :size="btnsize">
            <el-option v-for="item in subjectOne" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="凭证日期" prop="certTime">
          <el-date-picker v-model="formModel.certTime" type="date" :size="btnsize" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
      </div>
      <div class="income_item">
        <el-form-item label="二级科目">
          <el-select v-model="formModel.subjectTwo" filterable placeholder="请选择" :size="btnsize">
            <el-option v-for="item in subjectTwo" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="收据号码" prop="receiptNo">
          <el-input v-model="formModel.receiptNo" placeholder="收据号码" :size="btnsize" :maxlength="25"></el-input>
        </el-form-item>
      </div>
      <div class="income_item">
        <el-form-item label="三级科目">
          <el-select v-model="formModel.subjectThree" filterable placeholder="请选择" :size="btnsize">
            <el-option v-for="item in subjectThree" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发票号码" prop="invoiceNo">
          <el-input v-model="formModel.invoiceNo" placeholder="发票号码" :size="btnsize" :maxlength="25"></el-input>
        </el-form-item>
      </div>
      <div class="income_item">
        <el-form-item label="四级科目">
          <el-select v-model="formModel.subjectFour" filterable placeholder="请选择" :size="btnsize">
            <el-option v-for="item in subjectFour" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="支票号码" prop="checkNo">
          <el-input v-model="formModel.checkNo" placeholder="支票号码" :size="btnsize" :maxlength="25"></el-input>
        </el-form-item>
      </div>
      <div class="income_item">
        <el-form-item label="摘要">
          <el-input type="textarea" v-model="formModel.remark" placeholder="摘要" :size="btnsize" :maxlength="50"></el-input>
        </el-form-item>
        <el-form-item>
        </el-form-item>
      </div>
    </el-form>
    <span slot="footer">
          <el-button type="primary" @click="submitForm('formModel')" plain icon="el-icon-document">保存</el-button>
          <el-button type="warning" @click="setting" plain icon="el-icon-setting">设置财务科目</el-button>
          <el-button type="danger" @click="closeMe" plain icon="el-icon-circle-close">取消</el-button>
        </span>
  </el-dialog>
</template>
<script>
import { getSystemTime } from '@/api/common'
import { postVerificationBaseInfo, getVeryficationList } from '@/api/finance/financeDaily'
export default {
  props: {
    popVisible: {
      type: Boolean,
      default: false
    },
    orgId: {
      type: [String, Number],
      default: ''
    },
    info: {
      type: [Object, Array],
      default: () => []
    }
  },
  watch: {
    popVisible: {
      handler(cval, oval) {
        if (cval) {
          this.init()
        }
      },
      immediate: true
    },
    info: {
      handler(cval, oval) {
        console.log('voucher info-table::', cval, oval)
      },
      deep: true
    }
  },
  computed: {
    isShow: {
      get() {
        return this.popVisible
      },
      set() {}
    }
  },
  data() {
    return {
      dialogTitle: '核销凭证',
      loading: false,
      btnsize: 'mini',
      baseQuery: {
        orgId: '',
        amount: 0,
        feeIds: ''
      },
      formModel: {
        verificationWay: '',
        paymentsType: '',
        amount: '',
        certTime: '',
        receiptNo: '',
        invoiceNo: '',
        checkNo: '',
        remark: '',
        subjectOne: '',
        subjectTwo: '',
        subjectThree: '',
        subjectFour: ''
      },
      rules: {
        verificationWay: [{ required: true, message: '请填写记账方向!', trigger: 'blur' }]
      },
      veryficationType: {},
      veryficationList: [],
      subjectOne: [],
      subjectTwo: [],
      subjectThree: [],
      subjectFour: []
    }
  },
  methods: {
    init() {
      this.baseQuery = this.$options.data().baseQuery
      this.postVerificationBaseInfo()
      this.formModel.amount = this.info.amount || 0
    },
    postVerificationBaseInfo() {
      this.baseQuery.orgId = this.orgId
      this.baseQuery.amount = this.info.amount
      postVerificationBaseInfo(this.baseQuery).then(data => {
          this.formModel = data
          this.veryficationList = data.verificationList
          data.verificationList.forEach((el, index) => {
            this.veryficationType[el.id] = el.verificationWay
          })
        })
        .catch(err => {
          this._handlerCatchMsg(err)
        })
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let dataInfo = Object.assign({}, this.formModel)
          this.$set(dataInfo, 'orderList', this.info.orderList)
          this.$emit('success', dataInfo)
        }
      })
    },
    setting() {
      this.$router.push({ path: '/finance/financeInfo/subjectInfo' })
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
