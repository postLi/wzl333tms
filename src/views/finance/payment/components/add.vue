<template>
   <el-dialog :title='popTitle' @close="closeMe" :visible.sync="isShow" :close-on-click-modal="false" :before-close="closeMe" class="setupTablePop">
    <el-form :model="form" :rules="rules" ref="ruleForm"  :label-width="formLabelWidth" class="demo-ruleForm" :inline="true" label-position="right" size="mini">
          <div class="title"><i class="el-icon-info"></i>请您确认是否进行贷款汇款，总金额：<span>30000</span>元？</div>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <!-- <el-button :plain="true" @click="openHTML">使用 HTML 片段</el-button>  -->
      <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      <el-button @click="closeMe">取 消</el-button>
    </div>
  </el-dialog>
</template>
<script>
import PopFrame from '@/components/PopFrame/index'
import SelectTree from '@/components/selectTree/index'
import SelectType from '@/components/selectType/index'
import { putUpdateReceipt,putUpdateCancelReceipt } from '@/api/operation/receipt'
import { REGEX }  from '@/utils/validate'
import { mapGetters } from 'vuex'
import { exportWithIframe } from '@/utils';
import {objectMerge2} from '@/utils/index'
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
    searchQuery:[Object,Array],
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
      form:{
        "pageType":'',
        "recTypeId":113,
        "recRemark":'',
        "acceptTypeId":115,
        "acceptRemark":''
      },
      formLabelWidth: '75px',
      tooltip: false,
      rules: {
       
      },
      checked1: true,
      popTitle: '操作确认',
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
      this.getMentInfo = this.dotInfo
    },
    searchQuery(newVal){
       this.form.pageType = this.searchQuery.vo.pageType
      //  console.log(this.form.pageType);
    },
    orgid (newVal) {
      this.form.orgid = newVal
    },
    isModify: {
      handler(newVal) {
        if(this.isModify){
          // this.popTitle = '回单回收'
          this.form.pageType = this.searchQuery.vo.pageType
          console.log(888);
        }
      },
      immediate: true
    },
    isAccept: {
      handler(newVal) {
        if(this.isAccept){
          // this.popTitle = '回单接收'
          this.form.pageType = this.searchQuery.vo.pageType
          console.log(888);
        }
      },
      immediate: true
    },
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
      this.$refs[formName].validate((valid) => {
        if(valid){
          this.loading = true
          let data = objectMerge2({},this.form)
          data.receiptIds = this.dotInfo
          let promiseObj
          promiseObj = putUpdateReceipt(data)
          promiseObj.then(res=>{
            this.$message({
                message: '保存成功~',
                type: 'success'
                
              })
              this.closeMe()
              this.$emit('success')
          }).catch(res => {
            this.$message.warning(res.text)
            this.closeMe()
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
.setupTablePop{
  margin-top: 25vh;
 
}
.el-dialog{
   max-width: 445px;
   border:1px solid #cbcbcb;

}
.el-dialog__header{
  background: #e9e9e9;
  border-bottom: 1px solid #cbcbcb;
  padding: 10px 20px 10px;
  
  span{
    font-size: 15px;
    font-weight: bold;
  }
}
.el-dialog__body{
  padding: 40px 20px;
}
.el-dialog__footer{
  background: #e9e9e9;
  border-top: 1px solid #cbcbcb;
  padding: 9px 20px 9px;
  .el-button{
    padding: 5px 8px;
  }
}
.title{
  font-size: 15px;
  color:black;
  text-align: center;
  i{
    color:#93c0e9;
    margin-right: 10px;
    font-size: 15px;
  }
  span{
    font-size: 20px;
    color:#f02222;
    font-weight: bold;
  }
}
</style>
