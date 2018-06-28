<template>
  <div class="dep-maintain">
    <PopFrame :title="popTitle" :isShow="popVisible" @close="closeMe" class='pickpopDepMain' v-loading="loading" >
      <template class='pickRelationPop-content' slot="content">
        <!--isDepMain-->
        <div class="depmain-div">
          <el-form :inline="true" :model="getMentInfo" :label-width="formLabelWidth" ref="ruleForm" :rules="rules">
            <div class="pick_center">是否生成托运单？</div>
            <div class="pick_input_Main" >

              <el-form-item label="生成票数">
                <el-input v-model="getMentInfo.dictNum" placeholder="请输入内容" @click="validNum"></el-input>
              </el-form-item>

            </div>
          </el-form>
        </div>
      </template>
      <div slot="footer" class="dialog-footer-frame" >
        <el-button type="primary" @click="submitForm('ruleForm')">生成</el-button>
        <el-button @click="closeMe">不生成</el-button>
      </div>

    </PopFrame>
  </div>

</template>

<script>
    import { REGEX } from '@/utils/validate'
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
        createrId: [Object,Number,String]
      },
      data() {
        const validatePickupNum = function (rule, value, callback) {
          if(REGEX.ONLY_NUMBER.test(value) || !value.length){
            callback()
          }
          if(value.length>50){
            callback(new Error('最多可生成50票'))
          }
          else {
            callback(new Error('只能输入数字'))
          }
        }
        return {
          rules:{
            dictName:[
              {validator:validatePickupNum,trigger:'blur'}
            ]
          },
          formLabelWidth:'90',
          input:'',
          checked1: true,
          popTitle: '提示',
          loading:false,
          getMentInfo:
            {
              dictNum:1,
              id:''
            }
          ,
          //首行
          orderId: '',
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
          if(this.isDepMain){

          }else{
          }
        },
        dotInfo (newVal) {
          // this.getMentInfo = this.dotInfo
        },
        popVisible (newVal) {
          // console.log('popVisible:', newVal)
        },
        createrId(newVal){

        }
      },
      mounted() {
        this.getSelectDict(this.createrId)
      },
      methods: {
        validNum(){

        },
        getSelectDict(orgId) {
          //
          // this.loading = true
          // getSelectDictInfo(this.createrId).then(res => {
          //   this.loading = false
          //   this.getMentInfo = res
          // })

        },
        getAddDate() {
          // this.loading = true
          // return postDict(this.createrId , this.dictName).then(res => {
          //   this.loading = false
          //   this.dictName = ''
          // })

        },
        closeMe (done) {
          this.$emit('update:popVisible', false);
          if(typeof done === 'function'){
            done()
          }
        },
        submitForm(ruleForm) {
          this.$refs[ruleForm].validate((valid) => {
            if (valid) {
              // this.loading = true
              // this.form.tmsOrderPickup.pickupBatchNumber = this.pickupBatchNumber
              // let data = this.form
              // let promiseObj
              // // 判断操作，调用对应的函数
              // if(this.isModify){
              //   promiseObj = putUpdatePickup(data)
              // } else {
              //   promiseObj = postAddPickup(data)
              // }
              //
              // promiseObj.then(res => {
              //   this.loading = false
              //   this.$alert('操作成功', '提示', {
              //     confirmButtonText: '确定',
              //     callback: action => {
              //       this.closeMe()
              //       this.$emit('success')
              //     }
              //   });
              // }).catch(err => {
              //   this.loading = false
              // })
            } else {
              return false;
            }
          });
        },
      }
    }
</script>

<style lang="scss">
  .dep-maintain .pickpopDepMain{
    top: 29%;
    bottom: auto;
    min-width: 390px;
    max-width:  390px;

  }
  .dep-maintain .pickRelationPop-content{
    padding: 20px 20px 0;
    box-sizing: border-box;

  }
.pick_center{
  text-align: center;
  padding-top: 80px;
  font-size: 16px;
}
  .pick_input_Main{
    padding-top: 60px;
    text-align: center;
    font-size: 14px;

  }
</style>
