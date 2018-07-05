<template>
  <pop-right :title="popTitle" :isShow="popVisible" @close="closeMe" class="addCustomerPop" v-loading="loading">
    <template class="addCustomerPop-content" slot="content">
      <el-form :model="form" :rules="rules" ref="ruleForm" :label-width="formLabelWidth" :inline="true" label-position="right" size="mini" class="pickup_lrl">


        <div class="iommanage-bottom">
          <el-form-item label="所属网点" prop="tmsOrderPickup.truckFee">
            <el-input v-model="form.tmsOrderPickup.truckFee"  auto-complete="off" :disabled="isDbclick"></el-input>
          </el-form-item>
          <el-form-item label="收支方式" prop="tmsOrderPickup.collectionFee">
            <el-input v-model="form.tmsOrderPickup.collectionFee" auto-complete="off" :disabled="isDbclick" placeholder="如：银行卡、支付宝"></el-input>
          </el-form-item>
          <el-form-item label="银行名称" prop="tmsDriver.driverMobile">
            <el-input v-model="form.tmsDriver.driverMobile" auto-complete="off" :disabled="isDbclick"></el-input>
          </el-form-item>
          <el-form-item label="开户人" prop="tmsTruck.truckUnit">
            <el-input v-model="form.tmsTruck.truckUnit" auto-complete="off" :disabled="isDbclick"></el-input>
          </el-form-item>
          <el-form-item label="支付宝号" prop="tmsTruck.truckUnit">
            <el-input v-model="form.tmsTruck.truckUnit" auto-complete="off" :disabled="isDbclick"></el-input>
          </el-form-item>
          <el-form-item label="微信号" prop="tmsTruck.truckUnit">
            <el-input v-model="form.tmsTruck.truckUnit" auto-complete="off" :disabled="isDbclick"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="tmsTruck.truckUnit">
            <el-input v-model="form.tmsTruck.truckUnit" auto-complete="off" :disabled="isDbclick" type="textarea"></el-input>
          </el-form-item>

        </div>

      </el-form>
    </template>
    <div slot="footer" class="dialog-footer" v-if="isDbclick">
      <el-button @click="closeMe">取 消</el-button>
    </div>
    <div slot="footer" class="dialog-footer" v-else>
      <el-button type="primary" @click="submitForm('ruleForm')">保 存</el-button>
      <el-button @click="closeMe">取 消</el-button>
    </div>
  </pop-right>



</template>
<script>
import { REGEX } from '@/utils/validate'
import { fetchGetPickUp , putUpdatePickup , postAddPickup} from '@/api/operation/pickup'
import popRight from '@/components/PopRight/index'
import Upload from '@/components/Upload/singleImage'
import SelectType from '@/components/selectType/index'
import SelectCity from '@/components/selectCity/index'
import querySelect from '@/components/querySelect/index'
import { mapGetters } from 'vuex'

export default {
  components: {
    popRight,
    Upload,
    querySelect,
    SelectType,
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
    //isDbclick
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
  data () {
    const _this = this
    const validatePickupNum = function (rule, value, callback) {
      if(REGEX.ONLY_NUMBER.test(value) || !value){
        callback()
      }
      else {
        callback(new Error('只能输入数字'))
      }
    }
    const validateMobile = (rule, value, callback) => {
      if(REGEX.MOBILE.test(value) || !value){
        callback()
      }
      else if(this.isDbclick){
        callback()
      }
      else {
        callback(new Error('请输入正确的手机号码~'))
      }
    }

    return {
      rules: {
        'tmsOrderPickup.pickupName':[
          {required: true,validator: this.validateIsEmpty('货品名不能为空'), trigger: 'blur'},
          //{max: 8, message: '货品名最多可输入8个字符', trigger:'blur'}
        ],
        'tmsOrderPickup.pickupAmount': [
          { validator:validatePickupNum, trigger: 'blur' },
          { max: 8, message: '件数最多可输入8个字符', trigger: 'blur' }
          // { min: 2, max: 8, message: '件数最多可输入8位数', trigger: 'blur' }
        ],
        'tmsOrderPickup.pickupVolume':[
          { validator:validatePickupNum, trigger: 'blur' },
          { max: 8, message: '体积最多可输入8个字符', trigger: 'blur' }
        ],
        'tmsOrderPickup.pickupWeight':[
          { validator:validatePickupNum, trigger: 'blur' },
          { max: 8, message: '重量最多可输入8个字符', trigger: 'blur' }
        ],
        'tmsOrderPickup.carriage': [
          { validator:validatePickupNum,mtrigger: 'blur' },
          { max: 8, message: '运费最多可输入8个字符', trigger: 'blur' }
        ],
        'tmsOrderPickup.remark':[
          { max: 300, message: '备注最多可输入300个字符', trigger: 'blur' }
        ],
        'tmsOrderPickup.truckFee': [
          { validator:validatePickupNum, trigger: 'blur' },
        ],
        'tmsOrderPickup.collectionFee': [
          { validator:validatePickupNum, trigger: 'blur' },
          { max: 8, message: '代收费用最多可输入8个字符', trigger: 'blur' }
        ],
        'tmsDriver.truckIdNumber':[
          { max: 8, message: '车牌号最多可输入8个字符'},
         // {validator: this.validateIsEmpty('车牌号不能为空')},
        ],
        'tmsDriver.driverName':[
          { max: 8, message: '司机姓名最多可输入8个字符', trigger: 'blur' },
          {required: true,validator: this.validateIsEmpty('司机姓名不能为空'), trigger: ['change','blur']},
        ],
        'tmsDriver.driverMobile': [
          { validator: validateMobile, trigger: 'change' }
        ],
        'tmsTruck.truckUnit':[
          { max: 18, message: '车辆单位最多可输入18个字符', trigger: 'blur' }
        ],
        "tmsOrderPickup.arriveTime": [
          {required: true,validator: this.validateIsEmpty('要求到达时间不能为空'), trigger: ['blur']}
        ],
        "tmsCustomer.customerMobile": [
          {required: true,validator: this.validateIsEmpty('发货人手机号不能为空'), trigger: ['blur']}
        ],
        "tmsCustomer.detailedAddress": [
          {required: true,validator: this.validateIsEmpty('提货地址不能为空'), trigger: ['blur']}
        ],
      },
      pickOption: {
        firstDayOfWeek:1,
        disabledDate(time) {
          // 小于终止日
          return _this.form.tmsOrderPickup.arriveTime ? time.getTime() > _this.form.tmsOrderPickup.arriveTime : false
        }
      },
      pickOption2: {
        firstDayOfWeek:1,
        disabledDate(time) {
          // 大于起始日
          return _this.form.tmsOrderPickup.outTime ? time.getTime() < _this.form.tmsOrderPickup.outTime : false
        }
      },
      form: {
        tmsCustomer:{
          customerName:'',
          customerMobile:'',
          detailedAddress:'',
          customerId:''
        },
        tmsDriver:{
          driverName:'',//司机姓名
          driverMobile:'',//司机手机 /
          driverId:''
          //  发送短信给司机
        },
        tmsTruck:{
          truckIdNumber:'', //车牌号 /
          truckType:'',//车辆类型
          truckUnit:'',//车辆单位
          truckId:''
        },
        // tmsOrderCargoList: {},
        tmsOrderPickup:{
          pickupBatchNumber:'',//提货批次
          pickupName:'',//货品名
          pickupAmount:'',//件数
          pickupVolume:'',// 体积
          pickupWeight:'',// 重量
          carriage:'',// 运费
          payMethod:76,// 付款方式
          toCityCode:'',// 到达城市
          toCityName:'',// 到达城市
          remark:'',
          truckFee:'',//车费
          pickupStatus:236,//提货状态
          collectionFee:'',// 代收费用
          outTime:'',//出车时间
          arriveTime:''//
        }
      },
      checked: true,
      formLabelWidth: '80px',
      popTitle: '新增收支方式',
      loading: false,
      inited: false,
      pickupBatchNumber:'',

    }
  },
  mounted () {
    if(!this.inited){
      this.inited = true
      this.initInfo()
    }

    this.fetchGetPickUp()
  },
  watch: {
    popVisible (newVal, oldVal) {
      if(!this.inited){
        this.inited = true
        this.initInfo()
      }
    },
    orgid (newVal) {
    },
    info () {
      if (this.isModify) {
        this.popTitle = '修改收支方式'
        this.infoData(this.info)
      }
      else if(this.isDbclick) {
        this.popTitle = '查看收支方式'
        this.infoData(this.info)
      }
      else {
        this.popTitle = '新增收支方式'
        this.form.tmsOrderPickup = this.setObject(this.form.tmsOrderPickup)
        this.form.tmsTruck = this.setObject(this.form.tmsTruck)
        this.form.tmsDriver = this.setObject(this.form.tmsDriver)
        this.form.tmsCustomer = this.setObject(this.form.tmsCustomer)
        this.form.tmsTruck.truckUnit = ''
        this.form.tmsOrderPickup.payMethod = 76
        this.form.tmsOrderPickup.pickupStatus = 236
      }
    }
  },
  methods: {
    getTrunkName(trunk){
      if(trunk){
        this.form.tmsDriver.driverName = trunk.driverName
        this.form.tmsDriver.driverMobile = trunk.dirverMobile
        this.form.tmsDriver.driverId = trunk.driverId
        this.form.tmsTruck.truckId = trunk.truckId
        this.form.tmsTruck.truckType = trunk.truckType
        this.form.tmsTruck.truckUnit = trunk.truckUnit
        this.form.tmsTruck.truckIdNumber = trunk.truckIdNumber

      }

    },
    infoData(item){
      this.form.tmsOrderPickup.pickupName = item.pickupName
      this.form.tmsOrderPickup.pickupAmount = item.pickupAmount
      this.form.tmsOrderPickup.pickupWeight = item.pickupWeight
      this.form.tmsOrderPickup.carriage = item.carriage
      this.form.tmsOrderPickup.collectionFee = item.collectionFee
      this.form.tmsOrderPickup.payMethod = item.payMethod
      this.form.tmsOrderPickup.pickupStatus = item.pickupStatus
      this.form.tmsOrderPickup.remark = item.remark
      this.form.tmsOrderPickup.arriveTime = item.arriveTime
      this.form.tmsOrderPickup.outTime = item.outTime
      this.form.tmsOrderPickup.toCityName = item.toCityName
      this.form.tmsOrderPickup.id = item.id

      this.form.tmsTruck.truckIdNumber = item.truckIdNumber
      this.form.tmsTruck.truckType = item.truckType
      this.form.tmsTruck.truckUnit = item.truckUnit

      this.form.tmsDriver.driverName = item.driverName
      this.form.tmsDriver.driverMobile = item.driverMobile

      this.form.tmsCustomer.customerName = item.customerName
      this.form.tmsCustomer.customerMobile = item.customerMobile
      this.form.tmsCustomer.detailedAddress = item.detailedAddress

      this.pickupBatchNumber = item.pickupBatchNumber
    },
    validateIsEmpty (msg = '不能为空！') {
      return (rule, value, callback) => {
        if(!value){
          callback(new Error(msg))
        }else{
          callback()
        }
      }
    },
    setObject(obj1, obj2) {
      for (var i in obj1) {
        obj1[i] = obj2 ? obj2[i] : ''
      }
      return obj1
    },
    fetchGetPickUp(){
      this.loading = true
      return fetchGetPickUp().then(data => {
        this.pickupBatchNumber = data.data
        this.loading = false
      })
    },
    /** 收货人/发货人  tmsCustomer*/
    setSender(item, type){
      type = type ? 'customRece' : 'tmsCustomer'
      if(item){
        this.form[type].customerType = type === 'tmsCustomer' ? 1 : 2
        this.form[type].customerName = item.customerName
        this.form[type].customerMobile = item.customerMobile
        this.form[type].detailedAddress = item.detailedAddress
        this.form[type].customerId = item.customerId
      }
    },
    selectToCity (item, city) {
      if(item){
        this.form.tmsOrderPickup.toCityCode = item.id
        this.form.tmsOrderPickup.toCityName = item.longAddr
        } else {
      }
    },
    //司机姓名
    getdriverName (item, city) {
      if(item){
        this.form.tmsDriver.driverName = item.driverName
        this.form.tmsDriver.driverMobile = item.driverMobile
        this.form.tmsDriver.driverId = item.id
      } else {
      }
    },
    initInfo () {
      this.loading = false
    },
    submit(){
      console.log('保存并打印')
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          this.form.tmsOrderPickup.pickupBatchNumber = this.pickupBatchNumber
          let data = this.form

          let promiseObj
          // 判断操作，调用对应的函数
          if(this.isModify){
            promiseObj = putUpdatePickup(data)
          } else {
            promiseObj = postAddPickup(data)
          }

          promiseObj.then(res => {
            this.loading = false
            this.$alert('操作成功', '提示', {
              confirmButtonText: '确定',
              callback: action => {
                this.$emit('success')
                this.closeMe()
              }
            });
          }).catch(err => {
            this.loading = false
          })
        } else {
          return false;
        }
      });
    },
    reset() {
      this.$refs['ruleForm'].resetFields()
      this.form.tmsCustomer = ''
      this.form.tmsDriver = ''
      this.form.tmsTruck = ''
      this.form.tmsOrderPickup = ''
    },
    closeMe (done) {
      this.$emit('update:popVisible', false);
      if(typeof done === 'function'){
        done()
      }
    },
  }
}
</script>
<style lang="scss">
  .addCustomerPop{
    left: auto;
    top: 50px;
    bottom: auto;
    min-width: 600px;
    max-width:  600px;
    .popRight-content{
      padding: 20px 0px 0;
      box-sizing: border-box;
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
.el-form-item:last-of-type{
  width: 96%;
  .el-form-item__content{
    width: 80%;
  }
}
</style>

