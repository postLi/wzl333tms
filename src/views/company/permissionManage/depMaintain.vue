<template>
  <div class="dep-maintain">
    <PopFrame :title="popTitle" :isShow="popVisible" @close="closeMe" class='addpopDepMain' v-loading="loading">
      <template class='addRelationPop-content' slot="content">
        <div ref="ruleForm" class="depmain-div">
          <div class="depmain-top" v-if="hiddenTop">
            <el-input
              placeholder="请输入内容"
              v-model="inputDate"
              >
            </el-input>
            <el-checkbox v-model="checked" text-color="#3e9ff1"></el-checkbox>
            <el-checkbox v-model="checked1"></el-checkbox>
          </div>
          <div class="depmain-content" v-model="getMentInfo">
            <ul>
              <li v-for="item in getMentInfo">
                <span>{{item.dictName}}</span>
              </li>
            </ul>
          </div>
        </div>
      </template>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('ruleForm')">添加</el-button>
        <el-button @click="closeMe">编辑</el-button>
      </div>
    </PopFrame>
  </div>
</template>

<script>
    import PopFrame from '@/components/PopFrame/index'
    export default {
      components: {
        PopFrame
      },
      props: {
        popVisible: {
          type: Boolean,
          default: false
        },
        dotInfo: [Object,Array]
      },
      data() {
        return {
          popTitle: '部门',
          loading:false,
          getMentInfo:[],
          //首行
          checked: true,
          checked1:true,
          hiddenTop:false,
          inputDate: ''
       //首行
       //   底部按钮

       //   底部按钮
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
        dotInfo (newVal) {
          this.getMentInfo = this.dotInfo
        },
        popVisible (newVal) {
          console.log('popVisible:', newVal)
        }
      },
      mounted(){
        console.log(this.dotInfo);
        // this.fetchSlectDictInfo()
      },
      methods: {
        closeMe(done){
          this.$emit('close')
          // this.$refs['ruleForm'].resetFields()
          if(typeof done === 'function'){
            done()
          }
        },
        submitForm(ruleForm){
          // this.$refs[ruleForm].validate((valid) => {
          //   if(valid){
              console.log(JSON.stringify(this.form));
              this.loading = true
              // postOrgSaveDate(this.form).then(res=>{
              //   console.log(res);
              //   this.$alert('保存成功', '提示', {
              //     confirmButtonText: '确定',
              //     callback: action => {
              //       this.loading = false
              //       this.closeMe()
              //       this.$emit('success')
              //     }
              //   })
              //
              // })
            // }else{
            //   return false
            // }
          // })
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

  /*首行头部*/

  .depmain-top .el-input .el-input__inner{
    width: 76%;
    height: 30px;
    line-height: 30px;
  }
  .depmain-top .el-checkbox:nth-of-type(1) .el-checkbox__input.is-checked .el-checkbox__inner{
    background: #fff;
    border-color: #3e9ff1;
  }
  .depmain-top .el-checkbox:nth-of-type(1) .el-checkbox__inner::after{
    border-color:#3e9ff1;
  }
  .depmain-top .el-checkbox:nth-of-type(1){
    top: -29px;
    left: 345px;
  }
  .depmain-top .el-checkbox:nth-of-type(1) .el-checkbox__inner{
    width: 28px;
    height: 28px;
  }
  .depmain-top .el-checkbox:nth-of-type(1) .el-checkbox__inner::after{
    height: 16px;
    left: 9px;
    top: 2px;
    width: 8px;
    border-width: 2px;
  }
  .depmain-top .el-checkbox:nth-of-type(2) .el-checkbox__input.is-checked .el-checkbox__inner{
    background: #fff;
    border-color: #3e9ff1;
  }
  .depmain-top .el-checkbox:nth-of-type(2) .el-checkbox__inner::after{
    border-color:#3e9ff1;
  }
  .depmain-top .el-checkbox:nth-of-type(2){
    top: -29px;
    left: 318px;
  }
  .depmain-top .el-checkbox:nth-of-type(2) .el-checkbox__inner{
    width: 28px;
    height: 28px;
  }
  .depmain-top .el-checkbox:nth-of-type(2) .el-checkbox__inner::after{
    height: 16px;
    left: 9px;
    top: 2px;
    width: 8px;
    border-width: 2px;
  }
  /*.depmain-top .el-checkbox__input .el-checkbox__inner:after{
     box-sizing: content-box;
     content: "";
     border: 1px solid #fff;
     border-left: 0;
     border-top: 0;
     height: 7px;
     left: 4px;
     position: absolute;
     top: 1px;
    background: #fff;
    border-color: #3e9ff1;
     -webkit-transform: rotate(45deg) scaleY(0);
     transform: rotate(45deg) scaleY(0);
     width: 3px;
     -webkit-transition: -webkit-transform .15s cubic-bezier(.71,-.46,.88,.6) 50ms;
     transition: -webkit-transform .15s cubic-bezier(.71,-.46,.88,.6) 50ms;
     transition: transform .15s cubic-bezier(.71,-.46,.88,.6) 50ms;
     transition: transform .15s cubic-bezier(.71,-.46,.88,.6) 50ms,-webkit-transform .15s cubic-bezier(.71,-.46,.88,.6) 50ms;
     -webkit-transform-origin: center;
     transform-origin: center;
   }
   /*首行头部*/
  .dep-maintain .depmain-div li{
    border-bottom: 1px solid #dcdcdc;
    padding: 10px 0 10px 10px;
    color: #333;
    font-size: 14px;
  }
</style>
