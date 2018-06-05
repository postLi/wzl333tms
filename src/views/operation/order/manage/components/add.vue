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
                <el-input v-model='form.senderName' maxlength="25" auto-complete="off" clearable></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item label="收货人:">
                <el-input v-model='form.receiverName' maxlength="25" auto-complete="off" clearable></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>
              <el-form-item label="联系号码:">
                <el-input v-model='form.senderMobile' maxlength="25" auto-complete="off" clearable></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item label="联系号码:">
                <el-input v-model='form.receiverMobile' maxlength="25" auto-complete="off" clearable></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>
              <el-form-item label="发货地址:">
                <el-input v-model='form.detailedAddress'  maxlength="25" auto-complete="off" clearable></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item label="收货地址:">
                <el-input v-model='form.detailedAddress' maxlength="25" auto-complete="off" clearable></el-input>
              </el-form-item>
            </td>
          </tr>
          </tbody>

        </table>


        <table class="manage-add-table-center" :model='tmsOrderCargoList'>
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
              <el-form-item label="">
                <el-input v-model="tmsOrderCargoList.cargoName" maxlength="25" auto-complete="off" clearable></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item label="">
                <el-input v-model="tmsOrderCargoList.cargoAmount" maxlength="8" auto-complete="off" clearable></el-input>
              </el-form-item>
            </td>

            <td>
              <el-form-item label="">
                <el-input v-model="tmsOrderCargoList.cargoWeight" maxlength="8" auto-complete="off" clearable></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item label="">
                <el-input v-model="tmsOrderCargoList.cargoVolume" maxlength="8" auto-complete="off" clearable></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item label="">
                <el-input v-model="tmsOrderCargoList.cargoPack" maxlength="25" auto-complete="off" clearable></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item label="">
                <el-input v-model="tmsOrderCargoList.description" maxlength="20" auto-complete="off" clearable></el-input>
              </el-form-item>
            </td>
          </tr>
          </tbody>

        </table>
        <div class="info">订单信息</div>
        <table class="manage-add-table-foot" :model="tmsOrderPre">
          <tbody>
          <tr>
            <td>
              <el-form-item label="出发城市">
                <el-input v-model="tmsOrderPre.orderFromCityCode" maxlength="25" auto-complete="off" clearable></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item label="到达城市">
                <el-input v-model="tmsOrderPre.orderToCityCode" maxlength="25" auto-complete="off" clearable></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item label="开单网点">
                <el-input  v-model="tmsOrderPre.orderFromOrgid" maxlength="25" auto-complete="off" clearable></el-input>
              </el-form-item>
            </td>

            <td>
              <el-form-item label="目的网点">

                <el-input v-model="tmsOrderPre.orderToOrgid" maxlength="25" auto-complete="off" clearable></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>
              <el-form-item label="提货方式">
                <el-input v-model="tmsOrderPre.orderPickupMethod" maxlength="25" auto-complete="off" clearable></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item label="紧急度">
                <el-input v-model="tmsOrderPre.orderEffective" maxlength="25" auto-complete="off" clearable></el-input>
              </el-form-item>
            </td>

            <td>
              <el-form-item label="代收款">
                <el-input v-model="tmsOrderPre.agencyFund" maxlength="25" auto-complete="off" clearable></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item label="代收款手续费">
                <el-input v-model="tmsOrderPre.commissionFee" maxlength="25" auto-complete="off" clearable></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>
              <el-form-item label="付款方式">
                <el-input v-model="tmsOrderPre.orderPayWay" maxlength="25" auto-complete="off" clearable></el-input>
              </el-form-item>
            </td>

            <td>
              <el-form-item label="运费">
                <el-input v-model="tmsOrderPre.deliveryFee" maxlength="25" auto-complete="off" clearable></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item label="声明价值">
                <el-input v-model="tmsOrderPre.productPrice" maxlength="25" auto-complete="off" clearable></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="add-textarea">
              <el-form-item label="备注">
                <el-input v-model="tmsOrderPre.orderRemarks" maxlength="300" auto-complete="off" type="textarea" clearable></el-input>
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
import { REGEX }  from '@/utils/validate'
import { postCustomer, putCustomer , getAllCustomer} from '@/api/company/customerManage'
import popRight from '@/components/PopRight/index'
import Upload from '@/components/Upload/singleImage'
import SelectTree from '@/components/selectTree/index'
import { mapGetters } from 'vuex'

export default {
  components: {
    popRight,
    Upload,
    SelectTree
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
      form: {

        // senderName:'',
        // senderMobile:'',
        // detailedAddress:'',
        // receiverName:'',//收货人
        // receiverMobile:'',//receiverMobile
        // detailedAddress:''
      },
      formLabelWidth: '100px',
      tooltip: false,
      rules: {
        companyName: [
          { required: true, message: '请输入公司名称', trigger: 'blur' },
          { min: 2, max: 25, message: '长度在 2 到 25 个字符', trigger: 'blur' }
        ],
        orgid: [
          { required: true, message: '请选择所属机构', trigger: 'blur' }
        ],
        customerMobile: [
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
      roles: [],
      departments: [],
      groups: [],
      inited: false,

    //保存表单
      customerList: [
        //发货人
        { senderName:'',
         senderMobile:'',
         detailedAddress:''
        },
        //收货人
        {
          receiverName:'',
          receiverMobile:'',//
          detailedAddress:''
        }
      ],
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

      },
      tmsOrderTransfer: {
        receiverName:'',//收货人
        receiverMobile:'',//receiverMobile
        detailedAddress:''
      }
    }
  },
  mounted () {
    this.form.orgid = this.orgid
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
  },
  watch: {
    popVisible (newVal, oldVal) {
      if(!this.inited){
        this.inited = true
        this.initInfo()
      }
    },
    orgid (newVal) {
      this.form.orgid = newVal
    },
    info () {
      // if(this.isModify){
      //   this.popTitle = '修改'+(this.issender ? '发' : '收')+'货人'
      //   let data = Object.assign({},this.info)
      //   for(let i in this.form){
      //     this.form[i] = data[i]
      //   }
      //   this.form.customerId = data.customerId
      //   console.log('this.fixphone', this.fixPhone, this.form.fixPhone, data)
      //   this.fixPhone = this.form.fixPhone
      // } else {
      //   this.popTitle = '新增'+(this.issender ? '发' : '收')+'货人'
      //   for(let i in this.form){
      //     this.form[i] = ''
      //   }
      //   delete this.form.customerId
      //   this.form.companyType = 2 // 重置为选中公司
      //   this.form.customerType = this.issender ? 1 : 2 // 重置为发货人
      //   this.form.orgid = this.orgid
      //   this.fixPhone = ''
      // }
    }
  },
  methods: {
    fetchAllCustomerFa () {
      this.loading = true
      return getAllCustomer(this.searchSend).then(data => {
        this.customerList[0] = data.list
        // this.total = data.totalCount
        this.loading = false
        console.log(data)
      })
    },
    fetchAllCustomerShou () {
      this.loading = true
      return getAllCustomer(this.searchShou).then(data => {
        this.customerList[1] = data.list
        // this.total = data.totalCount
        this.loading = false
        console.log(data)
      })
    },
    initInfo () {
      this.loading = false
    },
    getOrgid (id) {
      this.form.orgid = id
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          let data = Object.assign({},this.form)
          data.fixPhone = this.fixPhone
          let promiseObj
          // 判断操作，调用对应的函数
          if(this.isModify){
            promiseObj = putCustomer(data)
          } else {
            promiseObj = postCustomer(data)
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

