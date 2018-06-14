<template>
  <div class="batch_main">
      <PopFrame :title='popTitle' :isShow="popVisible" @close="closeMe" class='addpopDepMain'>
        <template class='addRelationPop-content' slot="content">
           <el-form :model="form" :rules="rules" ref="ruleForm"  :label-width="formLabelWidth" class="demo-ruleForm" :inline="true" label-position="right" size="mini">
            <div class="batch">
              <el-form-item label="签收单数:" prop="num">
                <el-input maxlength="20" v-model="form.num" auto-complete="off" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="到付合计:" prop="shipArrivepayFee">
                <el-input maxlength="20" v-model="form.shipArrivepayFee" auto-complete="off" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="代收款合计:" prop="agencyFund">
                <el-input maxlength="20" v-model="form.agencyFund" auto-complete="off" :disabled="true"></el-input>
              </el-form-item>
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
              <el-form-item label="签收类型:" prop="signTypeId" >
                <SelectType v-model="form.signTypeId" type="sign_type"/>
              </el-form-item>
              <el-form-item label="签收证件:" prop="signCocumentTypeId" >
                <SelectType v-model="form.signCocumentTypeId" type="sign_cocument_type"/>
              </el-form-item>
              <el-form-item label="证件号码:" prop="documentNum">
                <el-input maxlength="20" v-model="form.documentNum" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="备注:" prop="remark">
                <el-input maxlength="20" v-model="form.remark" auto-complete="off"></el-input>
              </el-form-item>
            </div>  
               
          </el-form>
        </template>
        <div slot="footer" class="dialog-footer-frame">
          <el-button type="primary" @click="submitForm('ruleForm')" class="btn">签收</el-button>
          <el-button @click="closeMe" class="btn">取消</el-button>
        </div>
      </PopFrame>
  </div>
</template>
<script>
import PopFrame from '@/components/PopFrame/index'
import SelectTree from '@/components/selectTree/index'
import SelectType from '@/components/selectType/index'
import {postPickuplist,postPickupBatchSign } from '@/api/operation/sign'
import { REGEX }  from '@/utils/validate'
import { mapGetters } from 'vuex'
import { exportWithIframe } from '@/utils';
export default {
  // computed: {
  // ...mapGetters([
  //     'otherinfo'
  //   ])
  // },
  computed: {
    isShow: {
      get(){
        return this.popVisible
      },
      set(){

      }
    }
  },
  components: {
    PopFrame,
    SelectTree,
    SelectType
  },
  props: {
    popVisible: {
      type: Boolean,
      default: false
    },
    dotInfo: [Object,Array],
    // searchQuery:[Object,Array],
    isDepMain:{
      type:Boolean,
      default:false
    },
    createrId: [Number,String],
      isModify: {
      type: Boolean,
      default: false
    },
    isAccept: {
      type: Boolean,
      default: false
    }
  },
  
  data() {
    return {
      searchCreatTime: [ +new Date() - 60 * 24 * 60 * 60 * 1000, +new Date()],
      pickOption2:'',
      form:{
        "signTime":'',
        "num":'',
        // "signCertificate":'',
        // "documentNum":'',
        // "signRemark":'',
        // "signTime":'',
        // "agencyFund":'',
        // "signCocumentTypeName":'',
        // "repertoryId":'',
        // "shipArrivepayFee":''
        "repertoryIds":'',
        "signTime":"",
        "signName":"",
        "signCocumentTypeId":'',
        "documentNum":"",
        "signTypeId":'',
        "remark":'',
        "signPic":''
      },
      formLabelWidth: '80px',
      tooltip: false,
      disabled:false,
      rules: {
       
      },
      checked1: true,
      popTitle: '',
      loading:false,
      type:''
  
    }
  },
  computed: {
    isShow: {
      get(){
        return this.popVisible
      },
      set(){

      }
    }
  },
  mounted() {
   
  },
  watch: {
    isDepMain(){
      
    },
    dotInfo (newVal) {
      // this.form = this.dotInfo
      // console.log(this.searchQuery);
     this.form.num = this.dotInfo.length
    },
    // searchQuery(newVal){
    //    this.form.repertoryId = this.searchQuery.vo.repertoryId
    //    console.log(this.searchQuery);
    // },
    orgid (newVal) {
      this.form.orgid = newVal
    },
    isModify: {
      handler(newVal) {
        if(this.isModify){
          this.popTitle = '批量签收'
          // this.form.pageType = this.searchQuery.vo.pageType
          // console.log(888);
        }
      },
      immediate: true
    },
    // isAccept: {
    //   handler(newVal) {
    //     if(!this.isAccept){
    //       this.popTitle = '回单接收'
    //       this.form.pageType = this.searchQuery.vo.pageType
    //       console.log(888);
    //     }
    //   },
    //   immediate: true
    // },
    createrId(newVal){
    }
    
  },
  methods: {
  reset () {
    this.$refs['ruleForm'].resetFields()
  },
  closeMe(done){
    this.$emit('close')
    this.reset()
    if(typeof done === 'function'){
      done()
    }
  },
  submitForm(formName){
    this.form.signTime = this.searchCreatTime[0]
    this.$refs[formName].validate((valid) => {
      if(valid){
        this.loading = true
        let data = Object.assign({},this.form)
        data.repertoryIds = this.dotInfo
        // console.log();
        let promiseObj
        promiseObj = postPickupBatchSign(data)//批量
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
  }

  }
}
</script>

<style lang="scss">
  .batch_main .addpopDepMain{
    top: 29%;
    bottom: auto;
    min-width: 426px;
    max-width:  486px;
    .batch_main .addRelationPop-content{
      margin: 20px 20px 0;
      box-sizing: border-box;
    }
    // .batch_main .el-select .el-input__inner{
    //   padding-right: 15px;
    // }


    .popRight-header {
      background-color: #e6e6e6;
      color: #333;
      text-align: left;
      font-weight: 600;
      top: 0;
      left: 0;
      width: 100%;
      position: absolute;
      border-radius: 6px 0px 0px 0px;
      /* padding-left: 22px; */
      text-align: center;
      
    }
   
    .popRight-content{
      width:426px;
      height: 308px;
    }
    .batch{
      margin:10px 50px;
      font-size: 14px;
      text-align: left;
      color: #333333;
      .el-form-item__label{
        padding: 0px;
      }
      .el-input--suffix .el-input__inner{
        padding-right: 17px;
      }
      .el-date-editor.el-input, .el-date-editor.el-input__inner{
        width: 180px;
      }
    }
    
    .dialog-footer-frame{
        text-align: center;
        .btn{
          width: 107px;
          height: 35px;
        }
    }
  }
  
  // .popRight-header{
  //   height: 45px;
  //   line-height: 45px;
  // }
  
  
</style>
