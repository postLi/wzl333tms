<template>
  <pop-right :title="popTitle" :isShow="popVisible" @close="closeMe" class="addCustomerPop" v-loading="loading">
    <template class="addCustomerPop-content" slot="content">
      <el-form :model="form" :rules="rules" ref="ruleForm" :label-width="formLabelWidth" :inline="true" label-position="right" size="mini" class="pickup_lrl">

        <div class="pickUp-top">
          <el-form-item label="提货批次" prop="customerUnit">
            <el-input v-model="pickupBatchNumber" auto-complete="off" disabled></el-input>
          </el-form-item>
          <el-form-item label="发货人" prop="" class="senderName_lrl">
            <querySelect search="customerName" type="sender" valuekey="customerName" v-model="form.tmsCustomer.customerName" @change="setSender" :disabled="isDbclick"/>
          </el-form-item>
          <el-form-item label="手机号" prop="" class="senderName_lrl">
            <querySelect search="customerMobile" type="sender" valuekey="customerMobile" v-model="form.tmsCustomer.customerMobile" @change="setSender" :disabled="isDbclick"/>
          <!--</el-form-item>-->
          </el-form-item>
          <el-form-item label="提货地址" prop="" class="senderName_lrl">

            <querySelect search="detailedAddress" type="sender" valuekey="detailedAddress" v-model="form.tmsCustomer.detailedAddress" @change="setSender" :disabled="isDbclick"/>
          </el-form-item>
        </div>
        <div class="pickUp-order">
          <el-form-item label="货品名" prop="tmsOrderPickup.pickupName">
            <!--<el-input v-model="form.tmsOrderPickup.pickupName" auto-complete="off" ></el-input>-->
            <querySelect search="value" type="cargoName" :remote="true" v-model="form.tmsOrderPickup.pickupName" :disabled="isDbclick"/>

          </el-form-item>
          <el-form-item label="件数" prop="tmsOrderPickup.pickupAmount">
            <el-input v-model="form.tmsOrderPickup.pickupAmount" auto-complete="off" :disabled="isDbclick"></el-input>
          </el-form-item>
          <el-form-item label="体积" prop="tmsOrderPickup.pickupVolume">
            <el-input v-model="form.tmsOrderPickup.pickupVolume" auto-complete="off" :disabled="isDbclick"></el-input>
          </el-form-item>
          <el-form-item label="重量" prop="tmsOrderPickup.pickupWeight">
            <el-input v-model="form.tmsOrderPickup.pickupWeight" auto-complete="off" :disabled="isDbclick"></el-input>
          </el-form-item>
          <el-form-item label="运费" prop="tmsOrderPickup.carriage">
            <el-input v-model="form.tmsOrderPickup.carriage" auto-complete="off" :disabled="isDbclick"></el-input>
          </el-form-item>
          <el-form-item label="付款方式" >
            <!--<el-input v-model="form.tmsOrderPickup.payMethod" auto-complete="off" ></el-input>-->
            <!--默认为现付-->
            <SelectType v-model="form.tmsOrderPickup.payMethod" type="ship_pay_way"  class="pickup-way" :disabled="isDbclick"/>
          </el-form-item>
          <el-form-item label="到达城市" class="order_toCityCode">
            <querySelect @change="selectToCity" search="longAddr" type="city"  v-model="form.tmsOrderPickup.toCityCode" :remote="true" :disabled="isDbclick"/>
          </el-form-item>
          <el-form-item label="备注" prop="tmsOrderPickup.remark" class="order_remark">
            <el-input v-model="form.tmsOrderPickup.remark" type="textarea" auto-complete="off" :disabled="isDbclick"></el-input>
          </el-form-item>
        </div>
        <div class="pickUp-bottom">
          <el-form-item label="车费" prop="tmsOrderPickup.truckFee">
            <el-input v-model="form.tmsOrderPickup.truckFee"  auto-complete="off" :disabled="isDbclick"></el-input>
          </el-form-item>
          <el-form-item label="代收费用" prop="tmsOrderPickup.collectionFee">
            <el-input v-model="form.tmsOrderPickup.collectionFee" auto-complete="off" :disabled="isDbclick"></el-input>
          </el-form-item>
          <el-form-item label="车牌号" prop="tmsDriver.truckIdNumber">
            <querySelect search="truckIdNumber" type="trunk" @change="getTrunkName"  v-model="form.tmsTruck.truckIdNumber" :disabled="isDbclick"/>
          </el-form-item>
          <el-form-item label="司机姓名" prop="tmsDriver.driverName">
            <querySelect search="driverName" valuekey="driverName" type="driver" @change="getdriverName" :remote="true" v-model="form.tmsDriver.driverName" :disabled="isDbclick"/>
          </el-form-item>
          <el-form-item label="车辆类型">
            <SelectType v-model="form.tmsTruck.truckType" type="truck_type" placeholder="请选择" class="pickup-way" :disabled="isDbclick"/>
          </el-form-item>
          <el-form-item label="司机手机" prop="tmsDriver.driverMobile">
            <el-input v-model="form.tmsDriver.driverMobile" auto-complete="off" :disabled="isDbclick"></el-input>
            <!--<querySelect search="driverMobile" type="driver"  @change="getdriverMobile" :remote="true" v-model="form.tmsDriver.driverMobile" />-->
          </el-form-item>
          <el-form-item label="车辆单位" prop="tmsTruck.truckUnit">
            <el-input v-model="form.tmsTruck.truckUnit" auto-complete="off" :disabled="isDbclick"></el-input>
          </el-form-item>
          <el-form-item label="提货状态" prop="tmsOrderPickup.pickupStatus">
            <SelectType v-model="form.tmsOrderPickup.pickupStatus" type="pickup_status" placeholder="请选择" class="pickup-way" :disabled="isDbclick"/>
          </el-form-item>
          <el-form-item label="出车时间" class="customerunit">
              <el-date-picker
                v-model="form.tmsOrderPickup.outTime"
                align="right"
                type="date"
                placeholder="选择日期"
                value-format="timestamp"
                :picker-options="pickOption"
                :disabled="isDbclick"
              >
              </el-date-picker>
          </el-form-item>
          <el-form-item label="要求到达时间" class="arrive-time">
            <el-date-picker
              v-model="form.tmsOrderPickup.arriveTime"
              align="right"
              type="date"
              :picker-options="pickOption2"
              placeholder="选择日期"
              value-format="timestamp"
              :disabled="isDbclick"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item class='checked'>
            <el-checkbox v-model="checked" disabled>发送短信给司机</el-checkbox>
          </el-form-item>

        </div>

      </el-form>
    </template>
    <div slot="footer" class="dialog-footer" v-if="isDbclick">
      <el-button @click="closeMe">取 消</el-button>
    </div>
    <div slot="footer" class="dialog-footer" v-else>
      <el-button @click="submit">保存并打印</el-button>
      <el-button type="primary" @click="submitForm('ruleForm')">保 存</el-button>
      <el-button @click="closeMe">取 消</el-button>
    </div>
  </pop-right>
</template>
<script>
import { REGEX } from '@/utils/validate'
import { getAllCustomer } from '@/api/company/customerManage'
import { fetchGetPickUp , putUpdatePickup , postAddPickup} from '@/api/operation/pickup'
import popRight from '@/components/PopRight/index'
import Upload from '@/components/Upload/singleImage'
// import SelectTree from '@/components/selectTree/index'
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
      if(REGEX.ONLY_NUMBER.test(value) || !value.length){
        callback()
      }
      else {
        callback(new Error('只能输入数字'))
      }
    }
    const validateMobile = (rule, value, callback) => {
      if(REGEX.MOBILE.test(value) || !value.length){
        callback()
      }else {
        callback(new Error('请输入正确的手机号码~'))
      }
    }
    return {
      rules: {
        'tmsOrderPickup.pickupName':[
          { max: 8, message: '货品名最多可输入8个字符', trigger: 'blur' }
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
          { max: 8, message: '车牌号最多可输入8个字符', trigger: 'blur' }
        ],
        'tmsDriver.driverName':[
          { max: 8, message: '司机姓名最多可输入8个字符', trigger: 'blur' }
        ],
        'tmsDriver.driverMobile': [
          { validator: validateMobile, trigger: 'change' }
        ],
        'tmsTruck.truckUnit':[
          { max: 18, message: '车辆单位最多可输入18个字符', trigger: 'blur' }
        ]
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
          detailedAddress:''
        },
        tmsDriver:{
          driverName:'',//司机姓名
          driverMobile:'',//司机手机 /
          //  发送短信给司机
        },
        tmsTruck:{
          truckIdNumber:'', //车牌号 /
          truckType:'',//车辆类型
          truckUnit:'辆'//车辆单位
        },
        tmsOrderPickup:{
          pickupBatchNumber:'',//提货批次
          pickupName:'',//货品名
          pickupAmount:'',//件数
          pickupVolume:'',// 体积
          pickupWeight:'',// 重量
          carriage:'',// 运费
          payMethod:76,// 付款方式
          toCityCode:'',// 到达城市
          remark:'',
          truckFee:'',//车费
          outTime:'',//出车时间
          pickupStatus:'',//提货状态
          collectionFee:'',// 代收费用
          arriveTime:''//
        }
      },
      checked: true,
      formLabelWidth: '80px',
      popTitle: '提货派车单',
      loading: false,
      inited: false,
      pickupBatchNumber:'',

    }
  },
  mounted () {
    // this.orgid
    if(!this.inited){
      this.inited = true
      this.initInfo()
    }

    this.fetchGetPickUp()
    // this.form.tmsOrderPickup.payMethod =
  },
  watch: {
    popVisible (newVal, oldVal) {
      if(!this.inited){
        this.inited = true
        this.initInfo()
      }
    },
    orgid (newVal) {
      // this.form.orgid = newVal
    },
    info () {
      if (this.isModify) {
        this.popTitle = '修改派车单'
        this.form.tmsOrderPickup = this.setObject(this.form.tmsOrderPickup,this.info)
        this.form.tmsCustomer = this.setObject(this.form.tmsCustomer,this.info)
        this.form.tmsTruck = this.setObject(this.form.tmsTruck,this.info)
        this.form.tmsOrderPickup.id = this.info.id
        this.pickupBatchNumber = this.info.pickupBatchNumber

        this.form.tmsTruck.truckUnit = '辆'
      }
      else if(this.isDbclick) {
        this.popTitle = '查看派车单'
        this.form.tmsOrderPickup = this.setObject(this.form.tmsOrderPickup,this.info)
        this.form.tmsCustomer = this.setObject(this.form.tmsCustomer,this.info)
        this.form.tmsTruck = this.setObject(this.form.tmsTruck,this.info)
        this.form.tmsOrderPickup.id = this.info.id
        this.pickupBatchNumber = this.info.pickupBatchNumber
        this.form.tmsTruck.truckUnit = '辆'

      }
      else {
        this.popTitle = '提货派车单'
        this.form.tmsOrderPickup = this.setObject(this.form.tmsOrderPickup)
        this.form.tmsTruck = this.setObject(this.form.tmsTruck)
        this.form.tmsDriver = this.setObject(this.form.tmsDriver)
        this.form.tmsTruck.truckUnit = '辆'
        this.form.tmsOrderPickup.payMethod = 76
      }
    }
  },
  methods: {
    getTrunkName(trunk){
      if(trunk){
        this.form.tmsDriver.driverName = trunk.driverName
        this.form.tmsDriver.driverMobile = trunk.driverMobile
        this.form.tmsTruck.truckType = trunk.truckType
        this.form.tmsTruck.truckUnit = trunk.truckUnit
      }

      // console.log(trunk)
    },
    infoData(item){
      // this.form.tmsOrderPickup.pickupName = item.pickupName
      // this.form.tmsOrderPickup.pickupAmount = item.pickupAmount
      // this.form.tmsOrderPickup.pickupWeight = item.pickupWeight
      // this.form.tmsOrderPickup.carriage = item.carriage
      // this.form.tmsOrderPickup.collectionFee = item.collectionFee
      // this.form.tmsOrderPickup.payMethod = item.payMethodName


      // this.form.tmsTruck.truckIdNumber = item.truckIdNumber
      // this.form.tmsTruck.truckType = item.truckType

      // this.form.tmsDriver.driverName = item.driverName
      // this.form.tmsDriver.driverMobile = item.driverMobile

      // this.form.tmsCustomer.customerName = item.customerName
      // this.form.tmsCustomer.customerMobile = item.customerMobile
      // this.form.tmsCustomer.detailedAddress = item.detailedAddress


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
      }
    },
    selectToCity (item, city) {
      if(item){
        this.form.tmsOrderPickup.toCityCode = item.id
      } else {
      }
    },
    //司机姓名
    getdriverName (item, city) {
      if(item){
        console.log(item);
        this.form.tmsDriver.driverName = item.driverName
        this.form.tmsDriver.driverMobile = item.driverMobile
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
            this.reset()
          } else {
            // customerId
            delete data.customSend.customerId
            delete data.customRece.customerId
            delete data.tmsOrderCargoList.cargoId
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
    min-width: 580px;
    max-width:  580px;
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
   .pickUp-order,.pickUp-bottom{
     padding-top: 10px;
     border-top: 1px solid #e4e7ed;
     .order_toCityCode {
       margin-right: 35px !important;
     }
     .order_remark {
       .el-form-item__content{
         width: 430px;
       }
     }
     .el-form-item--mini{
       .el-input__inner{
         width: 90%;
       }
     }
     .customer-unit{
       width: 80%;
     }


     .checked{
       display: block;
       .el-form-item__content{
         padding-left: 14px;
       }
     }
   }
  .pickUp-bottom .arrive-time .el-form-item__label{
    width: 108px !important;
  }
  .pickUp-top .el-input.is-disabled .el-input__inner{
    background-color: transparent;
  }
.pickup-way .el-input__suffix{
  right: 20px;
}
  .pickup_lrl .el-input.is-disabled .el-input__inner,.pickup_lrl .el-textarea.is-disabled .el-textarea__inner{
    background-color: #fff;
  }

</style>

