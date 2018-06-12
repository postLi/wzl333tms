<template>
  <pop-right :title="popTitle" :isShow="popVisible" @close="closeMe" class="addCustomerPop" v-loading="loading">
    <template class="addCustomerPop-content" slot="content">
      <el-form :model="form" :rules="rules" ref="ruleForm" :label-width="formLabelWidth" :inline="true" label-position="right" size="mini">

        <div class="pickUp-top">
          <el-form-item label="提货批次" prop="customerUnit">
            <el-input v-model="pickupBatchNumber" auto-complete="off" disabled></el-input>
          </el-form-item>
          <el-form-item label="发货人" prop="" class="senderName_lrl">
            <el-autocomplete
              class="inline-input"
              v-model="customSend.customerName"
              :fetch-suggestions="querySearchSender('customerName')"
              value-key="customerName"
              :maxlength="25"
              placeholder="请选择"
              @select="handleSelectSender"
            >
              <template slot-scope="{ item }">
                <div class="selectListOption_lrl">
                  <span class="name">{{ item.customerName }}</span>
                  <span class="addr">{{ item.customerMobile }}</span>
                </div>
              </template>
            </el-autocomplete>
          </el-form-item>
          <el-form-item label="手机号" prop="" class="senderName_lrl">
            <el-autocomplete
              class="inline-input"
              v-model="customSend.customerMobile"
              :fetch-suggestions="querySearchSender('customerMobile')"
              value-key="customerMobile"
              :maxlength="25"
              placeholder="请选择"
              @select="handleSelectSender"
            >
              <template slot-scope="{ item }">
                <div class="selectListOption_lrl">
                  <span class="name">{{ item.customerMobile }}</span>
                  <span class="addr">{{ item.customerName }}</span>
                </div>
              </template>
            </el-autocomplete>
          </el-form-item>
          <el-form-item label="提货地址" prop="" class="senderName_lrl">
            <el-autocomplete
              class="inline-input"
              v-model="customSend.detailedAddress"
              :fetch-suggestions="querySearchSender('detailedAddress')"
              value-key="detailedAddress"
              :maxlength="25"
              placeholder="请选择"
              @select="handleSelectSender"
            >
              <template slot-scope="{ item }">
                <div class="selectListOption_lrl">
                  <span class="name">{{ item.detailedAddress }}</span>
                  <span class="addr">{{ item.customerName }}</span>
                </div>
              </template>
            </el-autocomplete>
          </el-form-item>
        </div>
        <div class="pickUp-order">
          <el-form-item label="货品名" prop="customerUnit">
            <el-input v-model="form.tmsOrderPickup.pickupName" auto-complete="off" ></el-input>
          </el-form-item>
          <el-form-item label="件数" prop="customerUnit">
            <el-input maxlength="8" v-model="form.tmsOrderPickup.pickupAmount" auto-complete="off" ></el-input>
          </el-form-item>
          <el-form-item label="体积" prop="customerUnit">
            <el-input maxlength="8" v-model="form.tmsOrderPickup.pickupVolume" auto-complete="off" ></el-input>
          </el-form-item>
          <el-form-item label="重量" prop="customerUnit">
            <el-input maxlength="8" v-model="form.tmsOrderPickup.pickupWeight" auto-complete="off" ></el-input>
          </el-form-item>
          <el-form-item label="运费" prop="customerUnit">
            <el-input maxlength="8" v-model="form.tmsOrderPickup.carriage" auto-complete="off" ></el-input>
          </el-form-item>
          <el-form-item label="付款方式" prop="customerUnit">
            <!--<el-input v-model="form.tmsOrderPickup.payMethod" auto-complete="off" ></el-input>-->
            <!--默认为现付-->
            <SelectType v-model="form.tmsOrderPickup.payMethod" type="order_pay_way" placeholder="请选择" class="pickup-way" />
          </el-form-item>
          <el-form-item label="到达城市" prop="" class="order_toCityCode">
            <SelectCity @change="getToCity" />
            <!--<el-input v-model="form.tmsOrderPickup.toCityCode" auto-complete="off" ></el-input>-->
          </el-form-item>
          <el-form-item label="备注" prop="customerUnit" class="order_remark">
            <el-input v-model="form.tmsOrderPickup.remark" maxlength="300" type="textarea" auto-complete="off" ></el-input>
          </el-form-item>
        </div>
        <div class="pickUp-bottom">
          <el-form-item label="车费" prop="customerUnit">
            <el-input v-model="form.tmsOrderPickup.truckFee" maxlength="8" auto-complete="off" ></el-input>
          </el-form-item>
          <el-form-item label="代收费用" prop="customerUnit">
            <el-input v-model="form.tmsOrderPickup.collectionFee" maxlength="8" auto-complete="off" ></el-input>
          </el-form-item>
          <el-form-item label="车牌号" prop="customerUnit">
            <el-input v-model="form.tmsTruck.truckIdNumber" maxlength="8" auto-complete="off" ></el-input>
          </el-form-item>
          <el-form-item label="司机姓名" prop="customerUnit">
            <el-input v-model="form.tmsDriver.driverName" maxlength="8" auto-complete="off" ></el-input>
          </el-form-item>
          <el-form-item label="车辆类型" prop="customerUnit">
            <!--<el-input v-model="form.tmsTruck.truckFee" maxlength="8" auto-complete="off" ></el-input>-->
            <SelectType v-model="form.tmsTruck.truckType" type="truck_type" placeholder="请选择" class="pickup-way" />
          </el-form-item>
          <el-form-item label="司机手机" prop="dirverMobile">
            <el-input v-model="form.tmsDriver.dirverMobile" maxlength="11" auto-complete="off" ></el-input>
          </el-form-item>
          <el-form-item label="车辆单位" prop="customerUnit">
            <el-input v-model="form.tmsTruck.truckUnit" maxlength="18" auto-complete="off" ></el-input>
          </el-form-item>
          <el-form-item label="提货状态" prop="customerUnit">
            <!--<el-input v-model="form.tmsDriver.pickupStatus" maxlength="8" auto-complete="off" ></el-input>-->
            <SelectType v-model="form.tmsOrderPickup.pickupStatus" type="pickup_status" placeholder="请选择" class="pickup-way" />
          </el-form-item>
          <el-form-item label="出车时间" prop="customerUnit" class="customerunit">
            <!--<el-input v-model="form.tmsTruck.outTime" maxlength="8" auto-complete="off" class="customer-unit"></el-input>-->
              <el-date-picker
                v-model="newDate"
                type="datetime"
                placeholder=""
                picker-options="pickoption1"
                align="right"
                start-placeholder="开始日期"
              >
                <!--:picker-options="pickerOptions1"-->
              </el-date-picker>
          </el-form-item>


          <el-form-item label="要求到达时间" prop="customerUnit" class="arrive-time">
            <el-date-picker
              v-model="endDate"
              type="datetime"
              placeholder=""
              align="right"
              picker-options="pickoption2"
              end-placeholder="结束日期"
            >
              <!--:picker-options="pickerOptions1"-->
            </el-date-picker>
            <!--<el-input v-model="form.tmsDriver.arriveTime" maxlength="8" auto-complete="off" ></el-input>-->
          </el-form-item>
          <el-form-item class='checked'>
            <el-checkbox v-model="checked">发送短信给司机</el-checkbox>
          </el-form-item>

        </div>

      </el-form>
    </template>
    <div slot="footer" class="dialog-footer">
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
import { mapGetters } from 'vuex'

export default {
  components: {
    popRight,
    Upload,
    // SelectTree,
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
    isModify: {
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
      // "fixPhone": {
      //   get(){
      //     return this.phoneshort+'-'+this.phonelong
      //   },
      //   set (val){
      //     //let names = val.match(/(.*)(.{7})$/)
      //     let names = val ?　val.split('-')　: ''
      //     if(names){
      //       this.phoneshort = names[1] ? names[0] : ''
      //       this.phonelong = names[1] ? names[1] : names[0]
      //     } else {
      //       this.phoneshort = ''
      //       this.phonelong = ''
      //     }
      //   }
      // }
  },
  data () {
    const _this = this
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm2.checkPass !== '') {
          this.$refs.ruleForm2.validateField('checkPass');
        }
        callback();
      }
    }

    const validateFormMobile = function (rule, value, callback) {
      if(REGEX.MOBILE.test(value)){
        callback()
      } else {
        callback(new Error('请输入有效的手机号码'))
      }
    }

    const validateFormNumber = function (rule, value, callback) {
      _this.form.customerMobile = value.replace(REGEX.NO_NUMBER, '')
      callback()
    }

    return {
      pickoption1: {
        firstDayOfWeek:1,
        disabledDate(time) {
          // 小于终止日
          return _this.form.tmsOrderPickup.outTime ? time.getTime() > _this.form.tmsOrderPickup.arriveTime : false
        }
        // disabledDate(now) {
        //   return +this.form.tmsOrderPickup.outTime < +this.form.tmsOrderPickup.arriveTime
        // }
      },
      pickoption2: {
        firstDayOfWeek:1,
        disabledDate(time) {
          // 小于终止日
          return _this.form.tmsOrderPickup.outTime ? time.getTime() < _this.form.tmsOrderPickup.arriveTime : false
        }
        // disabledDate(now) {
        //   return +this.form.tmsOrderPickup.outTime < +this.form.tmsOrderPickup.arriveTime
        // }
      },
      form: {
        tmsCustomer:{
          customerName:'',
          customerMobile:'',
          detailedAddress:''
        },
        tmsDriver:{

          driverName:'',//司机姓名
          dirverMobile:'',//司机手机 /

          //  发送短信给司机
        },
        tmsTruck:{
          truckIdNumber:'', //车牌号 /
          truckType:'',//车辆类型
          truckUnit:''//车辆单位
        },
        tmsOrderPickup:{
          pickupBatchNumber:'',//提货批次
          pickupName:'',//货品名
          pickupAmount:'',//件数
          pickupVolume:'',// 体积
          pickupWeight:'',// 重量
          carriage:'',// 运费
          payMethod:'',// 付款方式
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
      newDate: +new Date(),
      endDate: +new Date(),
      formLabelWidth: '80px',
      tooltip: false,
      rules: {
        companyName: [
          { required: true, message: '请输入公司名称', trigger: 'blur' },
          { min: 2, max: 25, message: '长度在 2 到 25 个字符', trigger: 'blur' }
        ],
        orgid: [
          { required: true, message: '请选择所属机构', trigger: 'blur' }
        ],
        dirverMobile: [
          { message: '请输入手机号码', trigger: '[blur,change]', pattern: REGEX.MOBILE }
         // { validator: validateFormNumber, trigger: 'change'}
        ],
        customerName: [
          { required: true, message: '请输入联系人', trigger: 'blur' },
          { max: 30, message: '不能超过30个字符', trigger: 'blur' }
        ]
      },
      popTitle: '提货派车单',
      orgArr: [],
      rolesArr: [],
      departmentArr: [],
      loading: false,
      roles: [],
      departments: [],
      groups: [],
      inited: false,
      pickupBatchNumber:'',
      searchSend: {
        "currentPage": 1,
        "pageSize": 100,
        "vo": {
          "orgid": 1,
          customerType: 1
        }
      },
      senderList:[],
      customSend:{
        // 发货人
        customerName:'',
        customerMobile:'',
        detailedAddress:''
      },
    }
  },
  mounted () {
    // this.orgid
    if(!this.inited){
      this.inited = true
      this.initInfo()
    }
    // Promise.all([fetchGetPickUp()]).then(resArr => {
    //   this.loading = false
    //   this.form.tmsOrderPickup.pickupBatchNumber = resArr[0].data
    //   // console.log(this.form.tmsOrderPickup.pickupBatchNumber);
    // })
    this.fetchGetPickUp()
    this.fetchAllCustomerFa(this.orgid).then(res => {
      this.loading = false
      this.senderList = res
    })
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
        // console.log(this.info);
        this.form.tmsOrderPickup = this.setObject(this.form.tmsOrderPickup,this.info)
        this.form.tmsTruck = this.setObject(this.form.tmsTruck,this.info)
        this.form.tmsOrderPickup.id = this.info.id
        // this.form.tmsDriver = this.setObject(this.form.tmsDriver,this.info)
      } else {
        // this.form.tmsOrderPickup = this.setObject(this.form.tmsOrderPickup)

        this.form.tmsOrderPickup = this.setObject(this.form.tmsOrderPickup)
        this.form.tmsTruck = this.setObject(this.form.tmsTruck)
        this.form.tmsDriver = this.setObject(this.form.tmsDriver)

      }
    }
  },
  methods: {
    querySearchSender (name) {
      let _this = this
      return function(query, cb){
        let data = _this.senderList.filter(el => {
          return el[name].indexOf(query) !== -1
        })
        cb(data)
      }
    },
    handleSelectSender(res){
      this.customSend.customerName = res.customerName
      this.customSend.customerMobile = res.customerMobile
      this.customSend.detailedAddress = res.detailedAddress
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
        // this.form.tmsOrderPickup.pickupBatchNumber = data

        this.loading = false
      })
    },
    fetchAllCustomerFa () {
      this.loading = true
      return getAllCustomer(this.searchSend).then(data => {
        return data.list || []
        let res = data.list[0]
        if(res){
          this.customSend.customerName = res.customerName
          this.customSend.customerMobile = res.customerMobile
          this.customSend.detailedAddress = res.detailedAddress
        }

        this.loading = false
      })
    },
    getToCity(city){
      this.form.tmsOrderPickup.toCityCode =  city.id.toString()
    },
    initInfo () {
      this.loading = false
    },
    getOrgid (id) {
      // this.form.orgid = id
    },
    submit(){
      console.log('保存并打印')
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          this.form.tmsOrderPickup.pickupBatchNumber = this.pickupBatchNumber
          this.form.tmsCustomer = this.customSend
          this.form.tmsOrderPickup.outTime = this.newDate
          this.form.tmsOrderPickup.arriveTime = this.endDate
          // console.log(this.form)
          let data = this.form
          // let data = Object.assign({},this.form)
          // data.fixPhone = this.fixPhone
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
                this.closeMe()
                this.$emit('success')
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
    reset () {
      this.$refs['ruleForm'].resetFields()
      this.form.licensePicture = ''
      this.form.idCardPositive = ''
      this.form.idCardVerso = ''
    },
    closeMe (done) {
      this.reset()
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
    min-width: 530px;
    max-width:  530px;
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
     .el-form-item--mini.el-form-item{
       margin-right: -9px;
     }
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
/*.customerunit {*/
  /*.el-form-item--mini{*/
    /*.el-input__inner{*/
      /*width: 100%;*/
    /*}*/
  /*}*/
/*}*/

</style>

