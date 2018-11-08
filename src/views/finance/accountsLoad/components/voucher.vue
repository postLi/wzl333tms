<template>
  <el-dialog :title="dialogTitle" v-loading="loading" :visible.sync="isShow" :close-on-click-modal="false" :before-close="closeMe" class="incomeDialog">
    <el-form ref="formModel" :model="formModel" :rules="rules" :inline="true" label-width="120px" v-loading="loading">
      <div class="income_item">
        <el-form-item label="方向">
          <el-select v-model="formModel.paymentsType" filterable placeholder="请选择" :size="btnsize">
            <el-option v-for="(value, key) in paymentsTypes" :value="key" :key="key" :label="value"></el-option>
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
export default {
  props: {
    popVisible: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    popVisible: {
      handler(cval, oval) {
        if (cval) {}
      },
      immediate: true
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
      formModel: {
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
      rules: {},
      paymentsTypes: [],
      subjectOne: [],
      subjectTwo: [],
      subjectThree: [],
      subjectFour: []
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
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
    },
    getSystemTime() {
      return getSystemTime().then(data => {
          this.formModel.certTime = data.trim()
        })
        .catch(err => {
          this._handlerCatchMsg(err)
        })
    },
  }
}

</script>
