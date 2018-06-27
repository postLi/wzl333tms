<template>
  <pop-right :title="popTitle" :isShow="popVisible" @close="closeMe" class="addCustomerPop" v-loading="loading">
    <template class="addCustomerPop-content" slot="content">
      <el-form :model="form" :rules="rules" ref="ruleForm" :inline="true" label-position="right" size="mini" class="manage-add" label-width="180px">
        <table class="manage-add-table-top">
          <thead>
          <tr>
            <td>
              <el-form-item label="发货方:">
                <querySelect search="customerUnit" type="sender" valuekey="companyName" v-model="form.customSend.customerUnit" @change="setSender" />
              </el-form-item>
            </td>
            <td>
              <el-form-item label="收货方:">
                <querySelect search="customerUnit" type="receiver" valuekey="customerUnit" v-model="form.customRece.customerUnit" @change="setReceiver" />
              <!--</el-form-item>-->
              </el-form-item>
            </td>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>
              <el-form-item label="发货人:" prop="customSend.customerName">
                <querySelect search="customerName" type="sender" valuekey="customerName" v-model="form.customSend.customerName" @change="setSender" />

              </el-form-item>
            </td>
            <td>
              <el-form-item label="收货人:" prop="customRece.customerName">
                <querySelect search="customerName" type="receiver" valuekey="customerName" v-model="form.customRece.customerName" @change="setReceiver" />
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>
              <!--发-->
              <el-form-item label="联系号码:" prop="customSend.customerMobile">
                <querySelect search="customerMobile" type="sender" valuekey="customerMobile" v-model="form.customSend.customerMobile" @change="setSender" />
              </el-form-item>
            </td>
            <td>
              <el-form-item label="联系号码:" prop="customRece.customerMobile">
                <querySelect search="customerMobile" type="receiver" valuekey="customerMobile" v-model="form.customRece.customerMobile" @change="setReceiver" />
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>
              <el-form-item label="发货地址:">
                <querySelect search="detailedAddress" type="sender" valuekey="detailedAddress" v-model="form.customSend.detailedAddress" @change="setSender" />
              </el-form-item>
            </td>
            <td>
              <el-form-item label="收货地址:">
                <querySelect search="detailedAddress" type="receiver" valuekey="detailedAddress" v-model="form.customRece.detailedAddress" @change="setReceiver" />
              </el-form-item>
            </td>
          </tr>
          </tbody>

        </table>

        <div class="info_order">货物信息</div>
        <div class="info_table">
          <!--<el-form :inline="true" :size="btnsize" label-position="right" label-width="80px" class="sta_searchinfo clearfix">-->
            <ul>
              <li>
                <p><i>*</i> 货品名</p>
                <el-form-item prop="tmsOrderCargoList.cargoName" >
                  <querySelect size="mini" search="value" type="cargoName" valuekey="value" v-model="form.tmsOrderCargoList.cargoName" />
                  <!--<el-input maxlength="10" v-model="form.tmsOrderCargoList.cargoName"></el-input>-->
                </el-form-item>
              </li>
              <li>
                <p><i>*</i> 件数</p>
                <el-form-item prop="tmsOrderCargoList.cargoAmount">
                  <el-input maxlength="10" v-model="form.tmsOrderCargoList.cargoAmount"></el-input>
                </el-form-item>
              </li>
              <li>
                <p>重量</p>
                <el-form-item prop="tmsOrderCargoList.cargoWeight">
                  <el-input maxlength="10" v-model="form.tmsOrderCargoList.cargoWeight"></el-input>
                </el-form-item>
              </li>
              <li>
                <p>体积</p>
                <el-form-item prop="tmsOrderCargoList.cargoVolume">
                  <el-input maxlength="10" v-model="form.tmsOrderCargoList.cargoVolume"></el-input>
                </el-form-item>
              </li>
              <li>
                <p>包装</p>
                <el-form-item prop="nowpayCarriage">
                  <querySelect size="mini" search="value" type="cargoPack" valuekey="value" v-model="form.tmsOrderCargoList.cargoPack" />
                  <!--<el-input maxlength="10"  v-model="form.tmsOrderCargoList.cargoPack"></el-input>-->
                </el-form-item>
              </li>
              <li>
                <p>品种规格</p>
                <el-form-item prop="tmsOrderCargoList.description">
                  <el-input maxlength="20" v-model="form.tmsOrderCargoList.description"></el-input>
                </el-form-item>
              </li>
            </ul>
          <!--</el-form>-->
        </div>

        <div class="info">订单信息</div>
        <table class="manage-add-table-foot">
          <tbody>
          <tr>
            <td>
              <el-form-item label="出发城市">

                <querySelect search="longAddr" @change="selectFromCity" type="city"  v-model="form.tmsOrderPre.orderFromCityCode" :remote="true" />
              </el-form-item>
            </td>
            <td>
              <el-form-item label="到达城市" prop="tmsOrderPre.orderToCityCode">
                <querySelect @change="selectToCity" search="longAddr" type="city"  v-model="form.tmsOrderPre.orderToCityCode" :remote="true" />
              </el-form-item>
            </td>
            <td>
              <el-form-item label="开单网点">
                <SelectTree v-model="form.tmsOrderPre.orderFromOrgid" disabled="disabled"/>
              </el-form-item>
            </td>

            <td>
              <el-form-item label="目的网点" >
                <SelectTree v-model="form.tmsOrderPre.orderToOrgid" />
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>
              <el-form-item label="提货方式">
                <SelectType v-model="form.tmsOrderPre.orderPickupMethodName" type="order_pickup_method" placeholder="请选择" />
              </el-form-item>
            </td>
            <td>
              <el-form-item label="紧急度">
                <SelectType v-model="form.tmsOrderPre.orderEffectiveName" type="ship_effective" placeholder="请选择" />
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
                <SelectType v-model="form.tmsOrderPre.orderPayWayName" type="ship_pay_way" placeholder="请选择" />
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
            <td>
              <el-form-item label="备注">
                <el-input v-model="form.tmsOrderPre.orderRemarks" maxlength="300" auto-complete="off" type="textarea" clearable class="add-textarea"></el-input>
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
import { postAddOrder , postModifyOrder } from '@/api/operation/manage'
import popRight from '@/components/PopRight/index'
import Upload from '@/components/Upload/singleImage'
import SelectTree from '@/components/selectTree/index'
import SelectType from '@/components/selectType/index'
import querySelect from '@/components/querySelect/index'
import { mapGetters } from 'vuex'
import {objectMerge2} from '@/utils/index'

export default {
  components: {
    popRight,
    Upload,
    SelectTree,
    SelectType,
    querySelect
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
  },
  data () {
    const validateOnlyNumberAndLetter = (rule, value, callback) => {
      if(REGEX.ONLY_NUMBER_AND_LETTER.test(value)){
        callback()
      } else if(value == ''){
        callback()
      }else{
        callback(new Error('只能输入数字或者字母'))
      }
    }
    const validateMobile = (rule, value, callback) => {
      if(REGEX.MOBILE.test(value)){
        callback()
      } else {
        callback(new Error('请输入正确的联系号码~'))
      }
    }
    const validateCargoName = (rule,value,callback) => {
      if(value == ''){
        callback(new Error('发货人不能为空1113'))
      }else {
        callback(new Error('发货人不能为空111'))
      }
    }
    const validatePickupNum = function (rule, value, callback) {
      if(REGEX.ONLY_NUMBER.test(value)){
        callback()
      } else {
        callback(new Error('只能输入数字'))
      }
    }
    let hasOne = false
    const validateVolumnWeight = (rule, value, callback) => {
      if(this.form.tmsOrderCargoList.cargoVolume === '' && this.form.tmsOrderCargoList.cargoWeight === '' ){
        hasOne = false
      }
      if(!value && !hasOne){
        callback(new Error('体积或重量必填其中一项'))
      }else{
        hasOne = true
        callback()
      }
    }
    return {
      rules:{
        "tmsOrderPre.orderToCityCode": [
          {validator: this.validateIsEmpty('到达城市不能为空'), trigger: ['change']}
        ],
        "customSend.customerName": [
          {required: true,validator: this.validateIsEmpty('发货人不能为空'), trigger: 'change'}
        ],
        "customSend.customerMobile": [
          {required: true,validator: this.validateIsEmpty('发货人联系电话不能为空'), trigger: 'change'},
          { validator: validateMobile, trigger: 'change' }
        ],
        "customRece.customerName": [
          {required: true,validator: this.validateIsEmpty('收货人不能为空'), trigger: 'change'}
        ],
        "customRece.customerMobile": [
          {required: true,validator: this.validateIsEmpty('收货人联系电话不能为空'), trigger: 'change'},
          { validator: validateMobile, trigger: 'change' }
        ],
        "tmsOrderCargoList.cargoName": [
          {validator: this.validateIsEmpty('货品名不能为空'), trigger: 'blur'},
          // { validator: validateCargoName, trigger: 'change' }
        ],
        "tmsOrderCargoList.cargoAmount": [
          {validator: this.validateIsEmpty('件数不能为空'), trigger: 'blur'},
          {validator: validatePickupNum, trigger: 'blur'}
        ],
        'tmsOrderCargoList.cargoVolume': [{
          validator: validateVolumnWeight, trigger: 'blur'
        }],
        'tmsOrderCargoList.cargoWeight': [{
          validator: validateVolumnWeight, trigger: 'blur'
        }],
        "tmsOrderCargoList.description": [
          { validator: validateOnlyNumberAndLetter,trigger: ['change'] }
        ]
      },
      fromCityName: '',
      toCityName: '',
      btnsize: 'mini',
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
      carObj: {
        cargoName:'',  // 货品名
        cargoAmount:'',  // 件数
        cargoWeight:'',  // 重量
        cargoVolume:'',  // 体积
        cargoPack:'',  // 包装
        description:''  // 品种规格
      },
      form: {

        customSend:{
          //customerId
          // 发货人
          // customerId,
          customerUnit:'',
          customerName:'',
          customerMobile:'',
          detailedAddress:'',
          customerType:1
        },
        customRece:{
          // customerId,
          customerUnit:'',
          customerName:'',
          customerMobile:'',//
          detailedAddress:'',
          customerType:2
        },
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
          orderPickupMethodName:218,//提货方式
          orderEffectiveName:94,//紧急度
          agencyFund:'',//代收款
          commissionFee:'',//代收款手续费
          orderPayWay:76,//付款方式 orderPayWayName
          deliveryFee:'',//运费
          productPrice:'',//声明价值
          orderRemarks:''//声明价值

        }
      },
      customSend:{
        //customerId
        // 发货人
        // customerId,
        companyName:'',
        senderName:'',
        senderMobile:'',
        detailedAddress:'',
        customerType:1
      },
      customRece:{
        // customerId,
        companyName:'',
        receiverName:'',
        receiverMobile:'',//
        detailedAddress:'',
        customerType:2
      },

      formLabelWidth: '100px',
      tooltip: false,
      popTitle: '新建',
      loading: false,
      inited: false


    }
  },
  mounted () {
    if(!this.inited){
      this.inited = true
      this.initInfo()
    }

    this.form.tmsOrderPre.orderFromOrgid = this.otherinfo.orgid
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
      if(this.isModify){
        this.popTitle = '修改'

        this.form.tmsOrderCargoList.cargoName = this.info.cargoName
        this.form.tmsOrderCargoList.cargoAmount = this.info.cargoAmount
        this.form.tmsOrderCargoList.cargoWeight = this.info.cargoWeight
        this.form.tmsOrderCargoList.cargoVolume = this.info.cargoVolume
        this.form.tmsOrderCargoList.cargoPack = this.info.cargoPack
        this.form.tmsOrderCargoList.description = this.info.description
        // 订单信息
        this.form.tmsOrderPre = this.setObject(this.form.tmsOrderPre, this.info)
      } else {
        this.popTitle = '新增'
        this.form.tmsOrderPre = this.setObject(this.form.tmsOrderPre)
        this.form.tmsOrderCargoList = objectMerge2({}, this.carObj)
        // this.form.tmsOrderCargoList = objectMerge2({}, this.carObj)
        this.form.tmsOrderPre.orderFromOrgid = this.otherinfo.orgid
      }
      // this.form.tmsOrderPre.orderPickupMethod = 1 Object.assign
    }
  },
  methods: {
    validateIsEmpty (msg = '不能为空！') {
      return (rule, value, callback) => {
        if(!value){
          callback(new Error(msg))
        }else{
          callback()
        }
      }
    },
    // 选择出发城市
    selectFromCity (item, city) {
      if(item){
        this.form.tmsOrderPre.orderFromCityCode = item.id
      } else {
        //this.form.tmsOrderPre.orderFromCityCode = city || ''
      }
    },
    // 选择到达城市
    selectToCity (item, city) {
      if(item){
        this.form.tmsOrderPre.orderToCityCode = item.id
      } else {
      }
    },
    /** 收货人/发货人 */
    setSender(item, type){
      type = type ? 'customRece' : 'customSend'
      if(item){
        this.form[type].customerId = item.customerId || ''
        this.form[type].customerType = type === 'customSend' ? 1 : 2
        this.form[type].customerUnit = item.customerUnit
        this.form[type].customerName = item.customerName
        this.form[type].customerMobile = item.customerMobile
        this.form[type].detailedAddress = item.detailedAddress
      }
    },
    setReceiver(item){
      this.setSender(item, 'receiver')
    },

    setObject(obj1, obj2) {
      for (var i in obj1) {
        obj1[i] = obj2 ? obj2[i] : ''
      }
      return obj1
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
          this.form.customerList[0] = this.form.customSend
          this.form.customerList[1] = this.form.customRece

          let promiseObj
          let data = objectMerge2({}, this.form)
          delete data.customSend
          delete data.customRece
          let obj = {}
          for(let i in data.tmsOrderCargoList) {
            obj[i] = data.tmsOrderCargoList[i]
          }
          data.tmsOrderCargoList = [obj]
          // 判断操作，调用对应的函数
          if(this.isModify){
            promiseObj = postModifyOrder(data)
          } else {
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
      this.form.customerList[0] = ''
      this.form.customerList[1] = ''
      // this.form.tmsOrderCargoList = ''
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
<style scoped lang="scss">
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
.addCustomerPop{
  left: auto;
  top: 50px;
  bottom: auto;
  min-width: 900px;
  max-width:  900px;

  .el-autocomplete{
    width: 100%;
  }

  .el-form--inline .el-form-item{
    margin-right: -9px;
    width: 90%;
    display: flex;
    margin-left: 7px
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
.manage-add-table-top,.manage-add-table-foot{
  height: 100%;
  width: 100%;
  /*margin-left: 10px;*/
}
.manage-add-table-foot{
  margin-top: 10px;
}
.manage-add-table-top th,.manage-add-table-foot th{
  width: 50%;
  height: 30px;
  background: #eee;
  margin-left: 10px;
  font-size: 14px;
  padding: 2px 2px 2px 5px !important;
}
  .manage-add-table-foot th{
  background:transparent;
  width: 0;
}
.manage-add-table-foot {
  tbody{
    tr{
      td{
        .el-form-item--mini{
          .el-form-item__label{
            width: 40%;
          }
        }

      }
    }
  }
  .add-textarea{
    width: 570%;
    .el-textarea__inner{
      width: 570%;
    }
  }
}
.manage-add-table-top th, .manage-add-table-top td {
  /*border: 1px solid #ccc;*/
  padding: 2px;
  text-align: left;
  font-size: 14px;
}
.manage-add-table-top th:nth-of-type(1) {
  padding-left: 10px !important;
}
.manage-add-table-top .el-input--mini .el-input__inner{
  height: 40px;
  line-height: 40px;
  padding: 0;
}

.manage-add-table-top .el-form-item__label{
  height: 40px;
  line-height: 40px;
  text-align: center;
  padding-left: 10px;
}
.manage-add-table-top .el-input__inner{
  border-color: transparent;
}
.manage-add-table-top .el-input__inner:hover{
  border-color: transparent;
}
.manage-add-table-top .el-input__inner:focus{
  border-color: transparent;
}


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
.info ,.info_order{
  height: 36px;
  line-height: 36px;
  border: 1px solid #ccc;
  margin-top: 12px;
  padding-left: 10px;
  font-size: 14px;
  color: #333;
  font-weight: 600;

}
.info_order{
  margin-top:0;
  border: 1px solid transparent;
  border-top: 1px solid #ccc;
}
.manage-add-table-foot .el-form-item--mini {
  margin-left: 12px;
}

  .manage-add div.el-form-item{
    width: 40%;
  }
  .add-textarea .el-textarea__inner {
    width: 570%;
    padding: 15px 0 0 10px;
  }
  .info_table{
    border-color: #dcdfe6;
    ul{
      /*border-top: 2px dotted #bbbbbb;
      margin: 10px -10px -10px 0;
      padding: 5px 10px 10px 10px;
      /*background-color: #fbfbfb;*/
      width: 100%;
      display: -ms-flexbox;
      display: flex;
      -ms-flex-direction: row;
      flex-direction: row;
      li:nth-of-type(1){
        padding-left: 0;
      }
      li:last-of-type{
        border-right: none;
      }
      li{
        border: 1px solid #eee;
        width: 30%;
        border-bottom: none;
        border-left: none;
        p{
          font-size: 14px;
          text-align: center;
          line-height: 34px;
          i{
            color: red;
          }
        }
      }
      .el-form-item{
        margin-bottom: 0;
        margin-right: 0;

      }
    }

  }
</style>

