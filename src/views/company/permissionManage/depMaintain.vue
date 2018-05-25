<template>
  <div class="dep-maintain">
    <PopFrame :title="popTitle" :isShow="popVisible" @close="closeMe" class='addpopDepMain' v-loading="loading">
      <template class='addRelationPop-content' slot="content">
        <div ref="ruleForm" class="depmain-div">
          <ul v-for="item in getMentInfo">
            <li>{{item.dictName}}</li>
            <!--<li>123</li>-->
          </ul>
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
          getMentInfo:[]
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
  .dep-maintain .depmain-div li{
    border-bottom: 1px solid #dcdcdc;
    padding: 10px 0 10px 10px;
    color: #333;
    font-size: 14px;
  }
</style>
