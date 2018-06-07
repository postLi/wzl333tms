<template>
  <pop-right :title="popTitle" :isShow="popVisible" @close="closeMe" class="addCustomerPop" v-loading="loading">
    <template class="addCustomerPop-content" slot="content">
      <el-form :model="form" :rules="rules" ref="ruleForm" :inline="true" label-position="right" size="mini" class="manage-add">
        <table class="manage-add-table-top">
          <thead>
          <tr>
            <th>发货方</th>
            <th>收货方</th>
          </tr>
          </thead>
          <!--senderName:'',-->
          <!--senderMobile:'',-->
          <!--detailedAddress:'',-->
          <!--receiverName:'',//收货人-->
          <!--receiverMobile:''//receiverMobile
          detailedAddress:''-->
          <tbody>
          <tr>
            <td>
              <el-form-item label="发货人:">
                <el-input v-model='customSend.senderName' maxlength="25" auto-complete="off" clearable></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item label="收货人:">
                <el-input v-model='customRece.receiverName' maxlength="25" auto-complete="off" clearable></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>
              <el-form-item label="联系号码:" prop="">
                <el-input v-numberOnly v-model='customSend.senderMobile' maxlength="25" auto-complete="off" clearable></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item label="联系号码:"  prop="">
                <el-input v-model='customRece.receiverMobile' maxlength="25" auto-complete="off" clearable></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>
              <el-form-item label="发货地址:">
                <el-input v-model='customSend.detailedAddress'  maxlength="25" auto-complete="off" clearable></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item label="收货地址:">
                <el-input v-model='customRece.detailedAddress' maxlength="25" auto-complete="off" clearable></el-input>
              </el-form-item>
            </td>
          </tr>
          </tbody>

        </table>


        <table class="manage-add-table-center">
          <thead>
          <tr>
            <th>货物信息</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>
              <el-form-item label="货品名">
                <!--<el-input maxlength="25" auto-complete="off" clearable></el-input>-->
              </el-form-item>
            </td>
            <td>
              <el-form-item label="件数">
                <!--<el-input  auto-complete="off" clearable></el-input>-->
              </el-form-item>
            </td>

            <td>
              <el-form-item label="重量">
                <!--<el-input maxlength="25" auto-complete="off" clearable></el-input>-->
              </el-form-item>
            </td>
            <td>
              <el-form-item label="体积">
                <!--<el-input maxlength="25" auto-complete="off" clearable></el-input>-->
              </el-form-item>
            </td>
            <td>
              <el-form-item label="包装">
                <!--<el-input maxlength="25" auto-complete="off" clearable></el-input>-->
              </el-form-item>
            </td>
            <td>
              <el-form-item label="品种规格">
                <!--<el-input maxlength="25" auto-complete="off" clearable></el-input>-->
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>
              <el-form-item label="" prop="">
                <el-input v-model="form.tmsOrderCargoList.cargoName" maxlength="25" auto-complete="off" clearable></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item label="">
                <el-input v-model="form.tmsOrderCargoList.cargoAmount" maxlength="8" auto-complete="off" clearable></el-input>
              </el-form-item>
            </td>

            <td>
              <el-form-item label="">
                <el-input v-model="form.tmsOrderCargoList.cargoWeight" maxlength="8" auto-complete="off" clearable></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item label="">
                <el-input v-model="form.tmsOrderCargoList.cargoVolume" maxlength="8" auto-complete="off" clearable></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item label="">
                <el-input v-model="form.tmsOrderCargoList.cargoPack" maxlength="25" auto-complete="off" clearable></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item label="">
                <el-input v-model="form.tmsOrderCargoList.description" maxlength="20" auto-complete="off" clearable></el-input>
              </el-form-item>
            </td>
          </tr>
          </tbody>

        </table>
        <div class="info">订单信息</div>
        <table class="manage-add-table-foot">
          <tbody>
          <tr>
            <td>
              <el-form-item label="出发城市">
                <el-input v-model="form.tmsOrderPre.orderFromCityCode" maxlength="25" auto-complete="off" clearable></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item label="到达城市">
                <el-input v-model="form.tmsOrderPre.orderToCityCode" maxlength="25" auto-complete="off" clearable></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item label="开单网点">
                <!--<el-input v-model="form.tmsOrderPre.orderFromOrgid" maxlength="25" auto-complete="off" clearable></el-input>-->
                <SelectTree v-model="form.tmsOrderPre.orderFromOrgid" />
              </el-form-item>
            </td>

            <td>
              <el-form-item label="目的网点">
                <SelectTree v-model="form.tmsOrderPre.orderToOrgid" />
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>
              <el-form-item label="提货方式">

                <SelectType v-model="form.tmsOrderPre.orderPickupMethod" type="order_pickup_method" placeholder="请选择" />
              </el-form-item>
            </td>
            <td>
              <el-form-item label="紧急度">
                <SelectType v-model="form.tmsOrderPre.orderEffective" type="order_effective" placeholder="请选择" />
              </el-form-item>
            </td>

            <td>
              <el-form-item label="代收款">
                <el-input v-model="form.tmsOrderPre.agencyFund" maxlength="8" auto-complete="off" clearable></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item label="代收款手续费">
                <el-input v-model="form.tmsOrderPre.commissionFee" maxlength="8" auto-complete="off" clearable></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>
              <el-form-item label="付款方式">
                <SelectType v-model="form.tmsOrderPre.orderPayWay" type="order_pay_way" placeholder="请选择付款方式" />
              </el-form-item>
            </td>

            <td>
              <el-form-item label="运费">
                <el-input v-model="form.tmsOrderPre.deliveryFee" maxlength="8" auto-complete="off" clearable></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item label="声明价值">
                <el-input v-model="form.tmsOrderPre.productPrice" maxlength="8" auto-complete="off" clearable></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="add-textarea">
              <el-form-item label="备注">
                <el-input v-model="form.tmsOrderPre.orderRemarks" maxlength="300" auto-complete="off" type="textarea" clearable></el-input>
              </el-form-item>
            </td>
          </tr>
          </tbody>

        </table>
      </el-form>
    </template>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitForm('ruleForm')">保 存</el-button>
      <el-button @click="closeMe">取 消</el-button>
    </div>
  </pop-right>
</template>
<script>
import { REGEX } from '@/utils/validate'
import { getAllCustomer } from '@/api/company/customerManage'
import { postAddOrder , postModifyOrder } from '@/api/operation/manage'
import popRight from '@/components/PopRight/index'
import Upload from '@/components/Upload/singleImage'
import SelectTree from '@/components/selectTree/index'
import SelectType from '@/components/selectType/index'
import { mapGetters } from 'vuex'

export default {
  components: {
    popRight,
    Upload,
    SelectTree,
    SelectType
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
      ]),
      "fixPhone": {
        get(){
          return this.phoneshort+'-'+this.phonelong
        },
        set (val){
          //let names = val.match(/(.*)(.{7})$/)
          let names = val ?　val.split('-')　: ''
          if(names){
            this.phoneshort = names[1] ? names[0] : ''
            this.phonelong = names[1] ? names[1] : names[0]
          } else {
            this.phoneshort = ''
            this.phonelong = ''
          }
        }
      }
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
      searchSend: {
        "currentPage": 1,
        "pageSize": 100,
        "vo": {
          "orgid": 1,
          customerType: 1
        }
      },
      searchShou: {
        "currentPage": 1,
        "pageSize": 100,
        "vo": {
          "orgid": 1,
          customerType: 2
        }
      },
      phoneshort: '', // 固话区号
      phonelong: '', // 固话号码
      //fixPhone: '',
      carObj: {
        cargoName:'',  // 货品名
        cargoAmount:'',  // 件数
        cargoWeight:'',  // 重量
        cargoVolume:'',  // 体积
        cargoPack:'',  // 包装
        description:''  // 品种规格
      },
      form: {
        customerList:[{},{}],
        //货物信息
        tmsOrderCargoList: [
          {
            cargoName:'',  // 货品名
            cargoAmount:'',  // 件数
            cargoWeight:'',  // 重量
            cargoVolume:'',  // 体积
            cargoPack:'',  // 包装
            description:''  // 品种规格
          }
        ],
        //订单信息
        tmsOrderPre: {
          orderFromCityCode:'',
          orderToCityCode:'',
          orderFromOrgid:'',
          orderToOrgid:'',//目的网点
          orderPickupMethod:'',//提货方式
          orderEffective:'',//紧急度
          agencyFund:'',//代收款
          commissionFee:'',//代收款手续费
          orderPayWay:'',//付款方式
          deliveryFee:'',//运费
          productPrice:'',//声明价值
          orderRemarks:''//声明价值

        }
      },
      customSend:{
        // 发货人
        senderName:'',
        senderMobile:'',
        detailedAddress:'',
        customerType:1
      },
      customRece:{
        receiverName:'',
        receiverMobile:'',//
        detailedAddress:'',
        customerType:2
      },

      formLabelWidth: '100px',
      tooltip: false,
      rules: {
        cargoName: [
          { message: '请输入输入数字', trigger: 'blur' , pattern: REGEX.ONLY_NUMBER_GT}
        ],
        companyNumber: [
          { message: '请输入输入数字', trigger: 'blur' , pattern: REGEX.ONLY_NUMBER_GT}
          // { min: 2, max: 25, message: '长度在 2 到 25 个字符', trigger: 'blur' }
        ],
        companyName: [
          { required: true, message: '请输入公司名称', trigger: 'blur' },
          { min: 2, max: 25, message: '长度在 2 到 25 个字符', trigger: 'blur' }
        ],
        orgid: [
          { required: true, message: '请选择所属机构', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号码', trigger: 'blur', pattern: validateFormMobile }
          // { validator: validateFormNumber, trigger: 'change'} REGEX.MOBILE
        ],
        receiverMobile: [
          { required: true, message: '请输入手机号码', trigger: 'blur', pattern: REGEX.MOBILE }
         // { validator: validateFormNumber, trigger: 'change'}
        ],
        customerName: [
          { required: true, message: '请输入联系人', trigger: 'blur' },
          { max: 30, message: '不能超过30个字符', trigger: 'blur' }
        ]
      },
      popTitle: '新建',
      orgArr: [],
      rolesArr: [],
      departmentArr: [],
      loading: false,
      departments: [],
      groups: [],
      inited: false,

    //保存表单

    }
  },
  mounted () {
    // this.form.orgid = this.orgid
    if(!this.inited){
      this.inited = true
      this.initInfo()
    }
    this.fetchAllCustomerFa(this.orgid).then(res => {
      this.loading = false
    })
    this.fetchAllCustomerShou(this.orgid).then(res => {
      this.loading = false
    })
    this.form.tmsOrderPre.orderFromOrgid = this.otherinfo.orgid
    // this.form.tmsOrderPre.orderEffective =
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
      console.log(this.info);
      if(this.isModify){
        this.popTitle = '修改'
        this.customSend.senderName = this.info.customerName
        this.customSend.senderMobile = this.info.customerMobile
        this.customSend.detailedAddress = this.info.detailedAddress
        this.customSend.customerType = this.info.customerType

        this.customRece.senderName = this.info.customerName
        this.customRece.senderMobile = this.info.customerMobile
        this.customRece.detailedAddress = this.info.detailedAddress
        this.customRece.customerType = this.info.customerType

        this.form.tmsOrderCargoList.cargoName = this.info.cargoName
        this.form.tmsOrderCargoList.cargoAmount = this.info.cargoAmount
        this.form.tmsOrderCargoList.cargoWeight = this.info.cargoWeight
        this.form.tmsOrderCargoList.cargoVolume = this.info.cargoVolume
        this.form.tmsOrderCargoList.cargoPack = this.info.cargoPack
        this.form.tmsOrderCargoList.description = this.info.description
        // 订单信息
        this.form.tmsOrderPre = this.setObject(this.form.tmsOrderPre, this.info)
        // this.form.tmsOrderPre.orderFromCityCode = this.info.orderFromCityCode
        // this.form.tmsOrderPre.orderToCityCode = this.info.orderToCityCode
        // this.form.tmsOrderPre.orderFromOrgid = this.info.orderFromOrgid
        // this.form.tmsOrderPre.orderToOrgid = this.info.orderToOrgid
        // this.form.tmsOrderPre.orderPickupMethod = this.info.orderPickupMethod
        // this.form.tmsOrderPre.orderEffective = this.info.orderEffective
        // this.form.tmsOrderPre.agencyFund = this.info.agencyFund
        // this.form.tmsOrderPre.commissionFee = this.info.commissionFee
        // this.form.tmsOrderPre.orderPayWay = this.info.orderPayWay
        // this.form.tmsOrderPre.deliveryFee = this.info.deliveryFee
        // this.form.tmsOrderPre.productPrice = this.info.productPrice
        // this.form.tmsOrderPre.orderRemarks = this.info.orderRemarks
      } else {
        this.popTitle = '新增'
        this.form.tmsOrderPre = this.setObject(this.form.tmsOrderPre)
        this.form.tmsOrderCargoList = [Object.assign({}, this.carObj)]
      }
    }
  },
  methods: {
    setObject(obj1, obj2) {
      for (var i in obj1) {
        obj1[i] = obj2 ? obj2[i] : ''
      }
      return obj1
    },
    fetchAllCustomerFa () {
      this.loading = true
      return getAllCustomer(this.searchSend).then(data => {
        let res = data.list[0]
        if(res){
          this.customSend.senderName = res.customerName
          this.customSend.senderMobile = res.customerMobile
          this.customSend.detailedAddress = res.detailedAddress
          this.customSend.customerType = res.customerType
          // customerType:1
        }

        this.loading = false
      })
    },
    fetchAllCustomerShou () {
      this.loading = true
      return getAllCustomer(this.searchShou).then(data => {
        let res = data.list[0]
        if(res){
          // for(var i in this.customRece){
          //   this.customRece[i] = res[i]
          // }
          this.customRece.senderName = res.customerName
          this.customRece.senderMobile = res.customerMobile
          this.customRece.detailedAddress = res.detailedAddress
          this.customRece.customerType = res.customerType
        }
        this.loading = false
      })
    },
    initInfo () {
      this.loading = false
    },
    getOrgid (id) {
      // this.form.orgid = id
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          this.form.customerList[0] = this.customSend
          this.form.customerList[1] = this.customRece
          console.log(this.customSend,this.customRece)

          let promiseObj
          // 判断操作，调用对应的函数
          if(this.isModify){
            this.form.customerList[0].customerId = 1
            this.form.customerList[1].customerId = 1
            let data = this.form
            promiseObj = postModifyOrder(data)
          } else {
            let data = this.form
            promiseObj = postAddOrder(data)
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
  min-width: 700px;
  max-width:  700px;

  .el-form--inline .el-form-item{
    margin-right: 0;
    width: 90%;
    display: flex;
  }

  .el-form-item__content{
    flex:1;
  }

  .select-tree{
    width: 100%;
  }

  .customerPhone .el-form-item__content{
    display: flex;
  }
  .phoneshort{
    width: 78px;
  }
  .phonelong{
    flex:1;
  }

  .licensePicture{
    height: 116px;
    line-height: 1.2;
  }

  .popRight-content{
    /*padding: 20px 24px 0;*/
    box-sizing: border-box;
  }


  .idcard-pos,.idcard-ver{
    width: 234px;
    height: 136px;
    float: left;
    line-height: 1.2;

    .upload-container{
      height: 100%;
    }
  }
  .idcard-ver{
    float: right;
  }

  .el-select .el-input__inner{
    /*padding-right: 15px;*/
  }
}
  /*收货-发货方*/
.manage-add-table-top,.manage-add-table-center,.manage-add-table-foot{
  height: 100%;
  width: 100%;
}
.manage-add-table-foot{
  margin-top: 10px;
}
.manage-add-table-top th,.manage-add-table-center th,.manage-add-table-foot th{
  width: 50%;
  height: 30px;
  background: #eee;
  margin-left: 10px;
  font-size: 14px;
  padding: 2px 2px 2px 5px !important;
}
.manage-add-table-center th,.manage-add-table-foot th{
  background:transparent;
  width: 0;
}
.manage-add-table-foot{}
.manage-add-table-top th, .manage-add-table-top td , .manage-add-table-center td{
  border: 1px solid #ccc;
  padding: 2px;
  text-align: left;
  font-size: 14px;
}
.manage-add-table-top th:nth-of-type(1) {
  padding-left: 10px !important;
}
.manage-add-table-top .el-input--mini .el-input__inner,.manage-add-table-center .el-input--mini .el-input__inner{
  height: 40px;
  line-height: 40px;
  padding: 0;
}
.manage-add-table-center .el-input--mini .el-input__inner{
  height: 40px;
  line-height: 40px;
  padding-left: 5px;
}
.manage-add-table-top .el-form-item,.manage-add-table-center .el-form-item{
  margin-bottom: 0;

}
.manage-add-table-top .el-form-item__label,.manage-add-table-center .el-form-item__label{
  height: 40px;
  line-height: 40px;
  text-align: center;
  padding-left: 10px;
}
.manage-add-table-top .el-input__inner,.manage-add-table-center .el-input__inner{
  border-color: transparent;
}
.manage-add-table-top .el-input__inner:hover,.manage-add-table-center .el-input__inner:hover{
  border-color: transparent;
}
.manage-add-table-top .el-input__inner:focus,.manage-add-table-center .el-input__inner:focus{
  border-color: transparent;
}


/*.manage-add-table-top .el-input--mini .el-input__inner, .manage-add-table-center .el-input--mini .el-input__inner{*/
  /**/
/*}*/

.manage-add-table-top .el-form-item--mini .el-form-item__content{
  line-height: 0;
}
.manage-add-table-top .el-form-item.is-error .el-input__inner, .el-form-item.is-error .el-input__inner:focus, .el-form-item.is-error .el-textarea__inner, .el-form-item.is-error .el-textarea__inner:focus, .el-message-box__input input.invalid, .el-message-box__input input.invalid:focus{
  border-color: transparent;
  /*height: 30px;*/
  line-height: 30px;
}
manage-add-table-top .el-form-item__error {
  color: #f56c6c;
  font-size: 12px;
  line-height: 1;
  padding-top: 4px;
  position: absolute;
  top: 37%;
  left: 59%;
}
.info {
  height: 36px;
  line-height: 36px;
  border: 1px solid #ccc;
  margin-top: 12px;
  padding-left: 10px;
  font-size: 14px;
  color: #333;
  font-weight: 600;

}
  .manage-add div.el-form-item{
    width: 40%;
  }
  .add-textarea .el-textarea__inner {
    width: 570%;
    padding: 15px 0 0 10px;
  }
</style>

