<template>
  <pop-right :title="popTitle" :isShow="popVisible" @close="closeMe" class="addIOManagePop" v-loading="loading">
    <template class="addIOManagePop-content" slot="content">
      <el-form :model="form" :rules="rules" ref="ruleForm" :label-width="formLabelWidth" :inline="true" label-position="right" size="mini" class="pickup_lrl">


        <div class="iommanage-bottom">
          <el-form-item label="所属网点">
            <SelectTree v-model="form.orgId" :disabled="isDbclick" :orgid="otherinfo.orgid" />
          </el-form-item>
          <el-form-item label="收支方式" prop="financialWayId">
            <SelectType v-model="form.financialWayId" type="financial_way_type" placeholder="请选择"  @change="financialWayClick" @mounted="getData" :disabled="isDbclick ? isDbclick : isModify"/>

          </el-form-item>

          <div v-if="bankPay===true">
            <el-form-item label="银行名称" prop="bankName">
              <el-input v-model="form.bankName" auto-complete="off" :disabled="isDbclick"></el-input>
            </el-form-item>
            <el-form-item label="银行卡号" prop="bankAccount">
              <el-input v-model="form.bankAccount" auto-complete="off" :disabled="isDbclick" v-numberOnly></el-input>
            </el-form-item>
            <el-form-item label="开户人">
              <el-input v-model="form.bankAccountName" auto-complete="off" :disabled="isDbclick"></el-input>
            </el-form-item>
          </div>
          <div v-if="aliPay===true">
            <el-form-item label="支付宝号" >
              <el-input v-model="form.alipayAccount" auto-complete="off" :disabled="isDbclick"></el-input>
            </el-form-item>
          </div>
          <div v-if="wPay===true">
            <el-form-item label="微信号" >
              <el-input v-model="form.wechatAccount" auto-complete="off" :disabled="isDbclick"></el-input>
            </el-form-item>
          </div>
          <div v-if="casyPay===true">
            <el-form-item label="经手人" >
              <el-input v-model="form.agent" auto-complete="off" :disabled="isDbclick"></el-input>
            </el-form-item>
          </div>
          <!--<el-form-item label="微信号" >-->
            <!--<el-input v-model="form.wechatAccount" auto-complete="off" :disabled="isDbclick"></el-input>-->
          <!--</el-form-item>-->
          <el-form-item label="备注" class="iom_textarea">
            <el-input v-model="form.remark" :maxlength="200" auto-complete="off" :disabled="isDbclick" type="textarea"></el-input>
          </el-form-item>

        </div>

      </el-form>
    </template>
    <div slot="footer" class="dialog-footer" v-if="isDbclick">
      <el-button @click="closeMe">关 闭</el-button>
    </div>
    <div slot="footer" class="dialog-footer" v-else>
      <el-button type="primary" @click="submitForm('ruleForm')">保 存</el-button>
      <el-button @click="closeMe">取 消</el-button>
    </div>
  </pop-right>



</template>
<script>
import { REGEX } from '@/utils/validate'
import { postAdd, putUpdate } from '@/api/finance/financefinancialway'
import popRight from '@/components/PopRight/index'
import Upload from '@/components/Upload/singleImage'
import SelectTree from '@/components/selectTree/index'
import SelectType from '@/components/selectType/index'
import SelectCity from '@/components/selectCity/index'
import querySelect from '@/components/querySelect/index'
import { mapGetters } from 'vuex'
// import { objectMerge2, parseTime, closest } from '@/utils/'

export default {
  components: {
    popRight,
    Upload,
    querySelect,
    SelectType,
    SelectTree,
    SelectCity
  },
  props: {
    popVisible: {
      type: Boolean,
      default: false
    },
    orgid: {
      required: true
    },
    // isDbclick
    isModify: {
      type: Boolean,
      default: false
    },
    isDbclick: {
      type: Boolean,
      default: false
    },
    info: {
      type: Object,
      default: () => {}
    },
    issender: {
      type: Boolean,
      dafault: false
    }
  },
  computed: {
    ...mapGetters([
      'otherinfo'
    ])

  },
  data() {
    // const validatebankName = function(rule, value, callback) {
    //   if (REGEX.ONLY_CHINESE.test(value) || this.form.financialWayId) {
    //     callback()
    //   } else {
    //     callback(new Error('只能输入中文'))
    //   }
    // }
    return {
      rules: {
        'financialWayId': [
          { required: true, validator: this.validateIsEmpty('收支方式不能为空'), trigger: 'blur' }
        ],
        'bankName': [
          { max: 20, message: '最多可以输入20个字符~', trigger: 'blur' },
          // { validator: REGEX.ONLY_CHINESE, trigger: 'blur' }
            { pattern: REGEX.ONLY_CHINESE, trigger: 'blur', message: '只能输入中文' }
        ],
        'bankAccount': [
          //  { pattern: REGEX.ONLY_NUMBER, trigger: 'blur',message: '只能输入数字' }
        ]
      },
      form: {
        orgId: '',
        financialWay: '', // 收支方式
        financialWayId: '',
        bankName: '', // 银行名称
        bankAccount: '', // 银行卡号
        bankAccountName: '', // 开户人
        alipayAccount: '', // 支付宝号
        wechatAccount: '', // 微信号
        remark: '', //
        agent: '' //
      },
      checked: true,
      formLabelWidth: '80px',
      popTitle: '新增收支方式',
      loading: false,
      inited: false,
      bankPay: false, // 银行
      aliPay: false, // 支付宝
      wPay: false, // 微信
      casyPay: false, // 现金
      chePay: false // 支票

    }
  },
  mounted() {
    if (!this.inited) {
      this.inited = true
      this.initInfo()
    }
  },
  watch: {
    popVisible(newVal, oldVal) {
      if (!this.inited) {
        this.inited = true
        this.initInfo()
      }
    },
    orgid(newVal) {
      this.form.orgId = newVal
    },
    info() {
      if (this.isModify) {
        this.popTitle = '修改收支方式'
        // this.infoData(this.info)
        this.changeInfo(this.info)
      } else if (this.isDbclick) {
        this.popTitle = '查看收支方式'
        this.changeInfo(this.info)
      } else {
        this.popTitle = '新增收支方式'
        this.newInfo(this.otherinfo)
      }
    },
    isModify: {
      handler() {
        if (this.isModify) {
          this.popTitle = '修改收支方式'
          this.changeInfo(this.info)
        } else if (this.isDbclick) {
          this.popTitle = '查看收支方式'
          this.changeInfo(this.info)
        } else {
          this.popTitle = '新增收支方式'
          this.newInfo(this.otherinfo)
        }
      },
      immediate: true
    }
  },
  methods: {
    changeInfo(item) {
      this.form.orgId = item.orgId
      this.form.financialWay = item.financialWay
      this.form.financialWayId = item.financialWayId
      this.form.remark = item.remark
      this.form.bankAccount = item.bankAccount
      this.form.bankAccountName = item.bankAccountName
      this.form.alipayAccount = item.alipayAccount
      this.form.wechatAccount = item.wechatAccount
      this.form.bankName = item.bankName
      this.financialWayClick(this.form.financialWayId)
    },
    newInfo(item) {
      this.form.orgId = item.orgid
      this.form.remark = ''
      this.form.bankAccount = ''
      this.form.bankAccountName = ''
      this.form.alipayAccount = ''
      this.form.wechatAccount = ''
      this.form.financialWayId = 280
      this.form.financialWay = ''
      this.form.bankName = ''

      this.financialWayClick(this.form.financialWayId)
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
    getData(data) {

    },
    financialWayClick(item) {
      this.bankPay = false
      this.aliPay = false
      this.wPay = false
      this.casyPay = false
      this.chePay = false

      if (item === 280 || item === '银行卡') {
        this.bankPay = true
        this.form.financialWay = '银行卡'
      } else if (item === 281 || item === '支付宝') {
        this.aliPay = true
        this.form.financialWay = '支付宝'
      } else if (item === 282 || item === '微信') {
        this.wPay = true
        this.form.financialWay = '微信'
      } else if (item === 283 || item === '现金') {
        this.casyPay = true
        this.form.financialWay = '现金'
      } else {
        this.chePay = true
        this.form.financialWay = '支票'
      }
    },
    initInfo() {
      this.loading = false
    },
    submit() {
      console.log('保存并打印')
    },
    submitForm(ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          this.loading = true
          let data = {}
          data = this.form
          let promiseObj
          // 判断操作，调用对应的函数
          if (this.isModify) {
            data.id = this.info.id
            promiseObj = putUpdate(data)
          } else {
            promiseObj = postAdd(data)
          }

          promiseObj.then(res => {
            this.loading = false
            this.$message.success('保存成功')
            this.$emit('success')
            this.closeMe()
          }).catch(err => {
            this._handlerCatchMsg(err)
            this.loading = false
          })
        } else {
          return false
        }
      })
    },
    reset() {
      // this.$refs['ruleForm'].resetFields()
      // this.form = {}
      this.form.orgId = this.otherinfo.orgid
      // this.form.financialWayId = 280
      // this.financialWayClick(this.form.financialWayId)
    },
    closeMe(done) {
      this.reset()
      this.$emit('update:popVisible', false)
      if (typeof done === 'function') {
        done()
      }
    }
  }
}
</script>
<style lang="scss">
  .addIOManagePop{
    left: auto;
    top: 50px;
    bottom: auto;
    min-width: 600px;
    max-width:  600px;
    z-index: 999 !important;//1000左右
    .popRight-content{
      padding: 20px 0px 0;
      box-sizing: border-box;
    }
    .el-form-item{
      .el-form-item__content{
        width: 67%;
      }
    }
    .el-form-item.iom_textarea{
      width: 98%;
      .el-form-item__content{
        width:83%;
      }

    }
  }
  .senderName_lrl{
    .el-autocomplete{
      width: 430px;
    }
  }
    .selectListOption_lrl{
    clear:both;
    span{
      display: inline-block;
      width: 50%;
    }
    .addr{
      text-align: right;
      color: #999;
      font-size: 12px;
    }
  }

  .iommanage-bottom .arrive-time .el-form-item__label{
    width: 108px !important;
  }

.pickup-way .el-input__suffix{
  right: 20px;
}
  .pickup_lrl .el-input.is-disabled .el-input__inner,.pickup_lrl .el-textarea.is-disabled .el-textarea__inner{
    background-color: #fff;
    color: #666;
  }
  .pickup_lrl{
    padding-left: 10px;
  }


</style>

