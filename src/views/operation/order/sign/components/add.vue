<template>
  <pop-right :title="popTitle" :isShow="popVisible" @close="closeMe" class="addCustomerPop" v-loading="loading">
    <template class="addCustomerPop-content" slot="content" :label-width="formLabelWidth">
      <el-form  :rules="rules" ref="ruleForm" :label-width="formLabelWidth" :inline="true" label-position="right" size="mini" class="manage-add">
      <table class="table">
        <tr>
          <td>运单号</td>
          <td><input type="text" v-model="form.shipSn" :disabled="true"/></td>
          <td>开单日期</td>
          <td><input type="text" v-model="form.createTime" :disabled="true"/></td>
          <td>回单号</td>
          <td><input type="text" v-model="form.shipReceiptSn" :disabled="true"/></td>
          <td>回单数</td>
          <td><input type="text" v-model="form.shipReceiptNum" :disabled="true"/></td>
        </tr>
        <tr>
          <td>发货人</td>
          <td><input type="text" v-model="form.sender_customer_name" :disabled="true"/></td>
          <td>发货人电话</td>
          <td><input type="text" v-model="form.sender_customer_mobile" :disabled="true"/></td>
          <td>收货人</td>
          <td><input type="text" v-model="form.receiver_customer_name" :disabled="true"/></td>
          <td>收货人电话</td>
          <td><input type="text" v-model="form.eceiver_customer_mobile" :disabled="true"/></td>
        </tr>
        <tr>
          <td>签收时间</td>
          <td><input type="text" v-model="form.signTime"/></td>
          <td>交接方式</td>
          <td><input type="text" v-model="form.shipDeliveryMethodName" :disabled="true"/></td>
          <td>到付款</td>
          <td><input type="text" v-model="form.shipSn"/></td>
          <td>代收货款</td>
          <td><input type="text" v-model="form.agencyFund" :disabled="true"/></td>
        </tr>
        <tr>
          <td>*签收人</td>
          <td><input type="text" v-model="form.shipsignNameSn"/></td>
          <td>签收证件</td>
          <td> 
            <el-form-item  prop="signCertificate" >
              <SelectType v-model="form.signCocumentTypeId" type="sign_cocument_type_id"/>
            </el-form-item>
          </td>
          <td>证件号码</td>
          <td><input type="text" v-model="form.documentNum"/></td>
          <td>签收类型</td>
          <td>
            <el-form-item  prop="signTypeName" >
              <SelectType v-model="form.signTypeName" type="sign_type_id"/>
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
            <!-- <div class="clearfix uploadcard">
              <upload :title="'本地上传'"  :showFileList="true" listtype="picture"  v-model="form.disposePicture"/>
            </div> -->
            
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
// import { getAllCustomer } from '@/api/company/customerManage'
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
    return {
      senderList: [],
      receiverList: [],
      dataset:[],
      // getrepertoryId:'',
      form: {
        "repertoryId":'',
        "signTime":"",
        "signName":"",
        "signCocumentTypeId":'',
        "documentNum":"",
        "signTypeId":'',
        "remark":"",
        "signPic":""
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
      getAllUser(this.orgid, '', '').then(res=>{
        this.resInfo = res.list
      })
    },
    getOrgid (id) {
      // this.form.orgid = id
    },
    submitForm2(formName){
      this.form.signTime = this.searchCreatTime[0]
      this.$refs[formName].validate((valid) => {
        if(valid){
          this.loading = true
          let data = Object.assign({},this.form)
          data.repertoryId = this.repertoryId
          // console.log();
          let promiseObj
          promiseObj = postPickupSign(data)//批量
          promiseObj.then(res=>{
            this.$alert('保存成功', '提示', {
              confirmButtonText: '确定',
              callback: action => {
                this.loading = false
                this.closeMe()
                this.$emit('success')
              }
            })
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
  min-width: 1255px;
  max-width:  1255px;
  .table{
    border-collapse :collapse ;
    color: #333333;
    tr{
      td:nth-child(odd){
        background-color: rgba(242, 242, 242, 1);
      }
      td{
        width:157px;
        height:50px;
        border :1px solid black;
        border-color: rgba(201, 201, 201, 1);
        font-size:14px;
        text-align :center;
        input{
          height: 50px;
          line-height: 50px;
          border:none;
          padding-left:10px;
        }
        .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item{
          margin-bottom: none;
          .el-input{
            position: relative;
            top:10px;
          }
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

