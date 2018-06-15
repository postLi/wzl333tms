<template>
  <pop-right :title="popTitle" :isShow="popVisible" @close="closeMe" class="addCustomerPop" v-loading="loading">
    <template class="addCustomerPop-content" slot="content" :label-width="formLabelWidth">
      <el-form :model="form" :rules="rules" ref="ruleForm" :label-width="formLabelWidth" :inline="true" label-position="right" size="mini" class="manage-add">
      <table class="table">
        <tr>
          <td>
            <el-form-item label="运单号:" prop="shipSn">
                <el-input maxlength="20" v-model="form.shipSn" auto-complete="off" :disabled="true"></el-input>
              </el-form-item>
          </td>
          <td>
            <el-form-item label="开单日期:" prop="createTime">
                <el-input maxlength="20" v-model="form.createTime" auto-complete="off" :disabled="true"></el-input>
              </el-form-item>
          </td>
          <td>
            <el-form-item label="回单号:" prop="shipReceiptSn">
                <el-input maxlength="20" v-model="form.shipReceiptSn" auto-complete="off" :disabled="true"></el-input>
              </el-form-item>
          </td>
          <td>
            <el-form-item label="回单数:" prop="shipReceiptNum">
                <el-input maxlength="20" v-model="form.shipReceiptNum" auto-complete="off" :disabled="true"></el-input>
              </el-form-item>
          </td>
        </tr>
        <tr>
          <td>
            <el-form-item label="发货人:" prop="sender_customer_name">
                <el-input maxlength="20" v-model="form.sender_customer_name" auto-complete="off" :disabled="true"></el-input>
              </el-form-item>
          </td>
          <td>
            <el-form-item label="发货人电话:" prop="sender_customer_mobile">
                <el-input maxlength="20" v-model="form.sender_customer_mobile" auto-complete="off" :disabled="true"></el-input>
              </el-form-item>
          </td>
          <td>
            <el-form-item label="收货人:" prop="receiver_customer_name"> 
                <el-input maxlength="20" v-model="form.receiver_customer_name" auto-complete="off" :disabled="true"></el-input>
              </el-form-item>
          </td>
          <td>
            <el-form-item label="收货人电话:" prop="eceiver_customer_mobile">
                <el-input maxlength="20" v-model="form.eceiver_customer_mobile" auto-complete="off" :disabled="true"></el-input>
              </el-form-item>
          </td>
        </tr>
        <tr>
          <td>
            <el-form-item label="签收时间:" prop="signTime">
              <el-date-picker
                  v-model="searchCreatTime"
                  align="right"
                  type="date"
                  :picker-options="pickOption2"
                  placeholder="选择日期"
                  value-format="timestamp"
                  >
              </el-date-picker>
            </el-form-item>
            <!-- <el-form-item label="签收时间:" prop="signTime">
                <el-input maxlength="20" v-model="form.signTime" auto-complete="off"></el-input>
              </el-form-item> -->
          </td>
          <td>
            <el-form-item label="交接方式:" prop="signCocumentTypeId" >
              <SelectType v-model="form.shipDeliveryMethodName" type="ship_delivery_method" :disabled="true"/>
            </el-form-item>
          </td>
          <td>
            <el-form-item label="到付款:" prop="shipArrivepayFee">
                <el-input maxlength="20" v-model="form.shipArrivepayFee" auto-complete="off"></el-input>
              </el-form-item>
          </td>
          <td>
            <el-form-item label="代收货款:" prop="agencyFund">
                <el-input maxlength="20" v-model="form.agencyFund" auto-complete="off" :disabled="true"></el-input>
              </el-form-item>
          </td>
        </tr>
        <tr>
          <td>
            <el-form-item label="签收人:" prop="shipsignNameSn">
                <el-input maxlength="20" v-model="form.shipsignNameSn" auto-complete="off"></el-input>
              </el-form-item>
          </td>
          <td>
            <el-form-item label="签收证件:" prop="signCocumentTypeId" >
              <SelectType v-model="form.signCocumentTypeId" type="sign_cocument_type"/>
            </el-form-item>
          </td>
          <td>
            <el-form-item label="证件号码:" prop="shipArrivepayFee">
              <el-input maxlength="20" v-model="form.documentNum" auto-complete="off"></el-input>
            </el-form-item>
          </td>
          <td>
           <el-form-item label="签收类型:" prop="signTypeId" >
              <SelectType v-model="form.signTypeId" type="sign_type"/>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>备注</td>
          <td colspan="7"><input type="text" v-model="form.signRemark" placeholder="备注最多输入250个字符" maxlength="250" style="width:100%"/></td>
        </tr>
        <tr style="height:152px">
          <td>签收凭证</td>
          <td colspan="7" class="imgshow">
        
            
          </td>
        </tr> 
      </table>
      </el-form>
    </template>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitForm1('ruleForm')">修改签收</el-button>
      <el-button type="primary" @click="submitForm2('ruleForm')">签 收</el-button>
      <el-button @click="closeMe">取 消</el-button>
    </div>
  </pop-right>
</template>
<script>
import { REGEX } from '@/utils/validate'
import {postPickuplist,postPickupSign,postCancelPickupSign } from '@/api/operation/sign'
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
    repertoryId:[Object,Array,String],
    // dotInfo: [Object,Array],
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
    const validateusername = function (rule, value, callback) {
      if(isvalidUsername(value)){
        callback()
      } else {
        callback(new Error('用户名只能由中文，数字，字母组成'))
      }
    }
    return {
      senderList: [],
      receiverList: [],
      dataset:[],
      searchCreatTime: [ +new Date() - 60 * 24 * 60 * 60 * 1000, +new Date()],
      pickOption2:'',
      // getrepertoryId:'',
      form: {
        "repertoryId":'',
        "signTime":"",
        "signName":"",
        "signCocumentTypeId":'',
        "shipsignNameSn": "",
        "documentNum":"",
        "signTypeId":'',
        "remark":"",
        "signPic":""
      },
      rules: {
        shipsignNameSn: [
          { required: true, message: '请输入签收人', trigger: 'blur' },
          { max: 1, message: '不能超过30个字符', trigger: 'blur' }
        ]
      },
      formLabelWidth: '100px',
      tooltip: false,
      rules: {
      },
      popTitle: '签收录入',
      orgArr: [],
      rolesArr: [],
      departmentArr: [],
      loading: false,
      departments: [],
      groups: [],
      inited: false,
      plId:'',
    }
  },
  mounted () {
    this.form.orgid = this.orgid
    if(!this.inited){
      this.inited = true
      this.initInfo()
    }
  },
  watch: {
    // dotInfo (newVal) {
    //   this.getMentInfo = this.dotInfo
    // },
    repertoryId(newVal){
      this.form = this.repertoryId
      console.log(this.form.repertoryId);
    },
    popVisible (newVal, oldVal) {
      if(!this.inited){
        this.inited = true
        this.initInfo()
      }
    },
  //   orgid (newVal) {
  //     this.form.orgid = newVal
  //   },
  //   isModify: {
  //     handler(newVal) {
  //       if(this.isModify){
  //         this.popTitle = '修改签收'
  //         postPickuplist(this.id).then(res => {
  //           this.form = res;
  //         })
  //       }else{
  //         this.popTitle = '签收录入'
  //         this.form.orgId = this.orgid
  //         this.form.registerTime = new Date();
  //         this.dengji();   
  //       }
  //     },
  //     immediate: true
  //   }
    
  },
  methods: {
    reset () {
      this.$refs['ruleForm'].resetFields()
    },
    querySearchSender (name) {
      let _this = this
      return function(query, cb){
        let data = _this.senderList.filter(el => {
          return el[name].indexOf(query) !== -1
        })
        cb(data)
      }
    },
    pick(){
      return postPickuplist().then(res=>{
          // this.form = res;
          this.form.abnormalNo = res
          // console.log(res, "this.form.abnormalNo: ", this.form);
        })
    },
    handleSelectSender(res){
      this.customSend.senderName = res.customerName
      this.customSend.companyName = res.companyName
      this.customSend.senderMobile = res.customerMobile
      this.customSend.detailedAddress = res.detailedAddress
      this.customSend.customerType = res.customerType
    },
    querySearchReceiver (name) {
      let _this = this
      return function(query, cb){
        let data = _this.receiverList.filter(el => {
          return el[name].indexOf(query) !== -1
        })
        cb(data)
      }
    },
    handleSelectReceiver(res){
      // receiverName:'',
      //   receiverMobile:'',//
      //   detailedAddress:'',
      this.customRece.receiverName = res.customerName
      this.customRece.companyName = res.companyName
      this.customRece.receiverMobile = res.customerMobile
      this.customRece.detailedAddress = res.detailedAddress
      this.customRece.customerType = res.customerType
    },
    initInfo () {
      this.loading = false
      // getAllUser(this.orgid, '', '').then(res=>{
      //   this.resInfo = res.list
      // })
    },
    getOrgid (id) {
      // this.form.orgid = id
    },
    submitForm2(ruleForm){
      this.form.signTime = this.searchCreatTime[0]
      this.$refs[ruleForm].validate((valid) => {
        if(valid){
          this.loading = true
          let data = Object.assign({},this.form)
          // data.repertoryId = this.repertoryId
          // console.log();
          let promiseObj
          promiseObj = postPickupSign(data)//不批量
          promiseObj.then(res=>{
            if(res.status === 200){
              this.$alert('保存成功', '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  this.loading = false
                  this.closeMe()
                  this.$emit('success')
                }
              })
            } else {
              this.loading = false
              this.closeMe()
            }
            
          })
        }else{
          return false
        }
      })
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
  min-width: 1130px;
  max-width:  1255px;
  .table{
    border-collapse :collapse ;
    color: #333333;
    tr{
      td{
        // width:157px;
        height:50px;
        border :1px solid black;
        border-color: rgba(201, 201, 201, 1);
        font-size:14px;
        text-align :center;
        background: #f5f7fa;
        
        input{
          height: 48px;
          line-height: 48px;
          border:none;
          padding-left:10px;
          
        }
        .el-date-editor.el-input, .el-date-editor.el-input__inner{
          width:182px;
        }
        .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item{
          margin: 0px;
          
        }
        .el-form-item--mini .el-form-item__content, .el-form-item--mini .el-form-item__label{
          height:50px;
          line-height: 50px;
          text-align: center;
        }
      }
      .imgshow{
        .uploadcard{
          float:left;
        }
      }
    }
  }
}

</style>

