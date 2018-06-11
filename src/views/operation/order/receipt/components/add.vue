<template>
  <div class="dep-maintain">
    <PopFrame :title="popTitle" :isShow="popVisible" @close="closeMe" class='addpopDepMain' v-loading="loading">
      <template class='addRelationPop-content' slot="content">
        
      </template>
      <div slot="footer" class="dialog-footer-frame">
        <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
        <el-button @click="closeMe">取消</el-button>
      </div>
    
    </PopFrame>
  </div>
</template>
<script>
    import PopFrame from '@/components/PopFrame/index'
    import { getSelectDictInfo,postDict,deletePerManage,putDict } from '@/api/company/groupManage'
    export default {
      components: {
        PopFrame
      },
      props: {
        popVisible: {
          type: Boolean,
          default: false
        },
        dotInfo: [Object,Array],
        isDepMain:{
          type:Boolean,
          default:false
        },
        createrId: [Number,String]
      },
      data() {
        return {
          checked1: true,
          popTitle: '回单回收',
          loading:false,
     
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
      watch: {
        isDepMain(){
          
        },
        dotInfo (newVal) {
          // this.getMentInfo = this.dotInfo
        },
        popVisible (newVal) {
         
        },
        createrId(newVal){

        }
      },
      mounted() {
        // this.getSelectDict(this.createrId)
      },
      methods: {
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
            let reqPromise
            if(this.isModify){
              // reqPromise = putOrgData(this.form)
            } else {
              if(this.form.accountStatus == true){
                this.form.accountStatus = 0
              }else{
                this.form.accountStatus = 1
              }
              // reqPromise = postOrgSaveDate(this.form)
            }
            reqPromise.then(res=>{
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
  .dep-maintain .addpopDepMain{
    top: 29%;
    bottom: auto;
    min-width: 486px;
    max-width:  486px;
  }
  .dep-maintain .addRelationPop-content{
    padding: 20px 20px 0;
    box-sizing: border-box;
  }
  .dep-maintain .el-select .el-input__inner{
    padding-right: 15px;
  }
  // .popRight-header{
  //   height: 45px;
  //   line-height: 45px;
  // }
  .popRight-header {
    height: 30px;
    line-height: 30px;
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


</style>
