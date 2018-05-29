<template>
  <div class="dep-maintain">
    <PopFrame :title="popTitle" :isShow="popVisible" @close="closeMe" class='addpopDepMain' v-loading="loading">
      <template class='addRelationPop-content' slot="content">
        <div ref="ruleForm" class="depmain-div">
          <!--<div class="depmain-top" v-if="hiddenTop">-->
            <!--<el-input-->
              <!--placeholder="请输入内容"-->
              <!--v-model="inputDate"-->
              <!--&gt;-->
            <!--</el-input>-->
            <!--<el-checkbox v-model="checked" text-color="#3e9ff1"></el-checkbox>-->
            <!--<el-checkbox v-model="checked1"></el-checkbox>-->
          <!--</div>-->

          <div class="depmain-content" v-if="showDate">
            <ul>
              <li v-for="item in getMentInfo">
                <span>{{item.dictName}}</span>
              </li>
            </ul>
          </div>
          <div class="depmain-add" v-if="hiddenAdd">
            <el-input
              placeholder="请输入内容"
              v-model="dictName"
            >
            </el-input>
            <el-checkbox v-model="checked1" @change="addDep"></el-checkbox>
            <el-checkbox v-model="checked2"></el-checkbox>
            <ul>
              <li v-for="item in getMentInfo">
                <span>{{item.dictName}}</span>
                <!--<i class="el-icon-close"></i>-->
              </li>
            </ul>
          </div>
          <div class="depmain-edit" v-if="hiddenEdit">
            <ul>
              <li v-for="item in getMentInfo">
                <el-input
                  placeholder="请输入内容"
                  v-model="item.dictName"
                  >
                </el-input>
                <el-checkbox v-model="checked1"></el-checkbox>
                <el-checkbox v-model="checked2"></el-checkbox>
                <!--<i class="el-icon-close"></i>-->
              </li>
            </ul>
          </div>
        </div>
      </template>
      <div slot="footer" class="dialog-footer" v-if="showBotton">
        <el-button type="primary" @click="submitForm('ruleForm')">{{addText}}</el-button>
        <el-button @click="editMe">{{editText}}</el-button>
      </div>
      <div slot="footer" class="dialog-footer" v-if="remBotton">
        <el-button @click="closeMe">{{remText}}</el-button>
      </div>
    </PopFrame>
  </div>
</template>

<script>
    import PopFrame from '@/components/PopFrame/index'
    import { getSelectDictInfo } from '../../../api/company/groupManage'
    import {postDict} from '../../../api/company/permissionManage'
    import { mapGetters } from 'vuex'
    export default {
      computed: {
        ...mapGetters([
          'otherinfo'
        ])
      },
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
          popTitle: '部门',
          loading:false,
          getMentInfo:[],
          //首行
          checked: true,
          checked2:true,
          hiddenAdd:false,
          hiddenEdit:false,
          showDate:false,
          dictName: '', //添加
       //首行
       //   底部按钮
          addText:'添加',
          editText:'编辑',
          remText:'取消',
          showBotton:false,
          remBotton:false
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
        isDepMain(){
          if(this.isDepMain){
            this.popTitle = '部门';
            this.showBotton = true
            this.remBotton = false
            this.hiddenAdd = false
            this.hiddenEdit = false
            this.showDate = true
            console.log('true');
          }else{
            console.log('false');
            // this.showBotton = false
            // this.remBotton = true
            // this.hiddenTop = true
          }
        },
        dotInfo (newVal) {
          // this.getMentInfo = this.dotInfo
        },
        popVisible (newVal) {
          console.log('popVisible:', newVal)
        }
      },
      mounted() {
        // Promise.all([getSelectDictInfo(this.createrId),getSelectDictInfo(this.createrId)]).then( resArr => {
        //   this.loading = false
        //   this.getMentInfo = resArr[0]
        //   this.getMentInfo = resArr[1]
        //   console.log(resArr);
        // })
        this.getAddDate()
      },
      methods: {
        getAddDate(orgid) {
          this.createrId = orgid
          getSelectDictInfo(this.createrId).then(res => {
            this.loading = true
            this.getMentInfo = res
            console.log(res);
          })

        },
        // fetchAllUser (orgid, username, mobilephone) {
        //   return getAllUser(orgid, username||'', mobilephone||'')
        // },
        // getAddDate(orgid,dictName) {
        //   this.createrId = orgid
        //   this.dictName = dictName
        //   postDict(this.createrId , this.dictName).then(res => {
        //     this.loading = true
        //     console.log(res);
        //   })
        //
        // },
        closeMe(done){
          this.$emit('close')
          // this.$refs['ruleForm'].resetFields()
          if(typeof done === 'function'){
            done()
          }
        },
        editMe(){
          this.popTitle = '编辑'
          this.remBotton = true
          this.showBotton = false
          this.hiddenAdd = false
          this.hiddenEdit = true
          this.showDate = false
        },
        submitForm(ruleForm){
          // this.loading = true
          this.popTitle = '添加'
          this.remBotton = true
          this.hiddenAdd = true
          this.showBotton = false
          this.hiddenEdit = false
          this.showDate = false

          // this.$refs[ruleForm].validate((valid) => {
          //   if(valid){

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
        },
        addDep(){
          this.getAddDate()
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
  /*添加*/

  .depmain-add .el-input .el-input__inner,.depmain-edit .el-input .el-input__inne{
    width: 76%;
    height: 30px;
    line-height: 30px;
    /*border: #fff;*/
  }
  .depmain-add .el-input__inner:hover,.depmain-edit .el-input__inner:hover{
    border-color: #0a84ff;
  }

  /*.depmain-edit .el-input__inner:hover{*/
    /*border-: transparent;*/
  /*}*/
  .depmain-add .el-checkbox:nth-of-type(1) .el-checkbox__input.is-checked .el-checkbox__inner,.depmain-add .el-checkbox:nth-of-type(2) .el-checkbox__input.is-checked .el-checkbox__inner, .depmain-edit .el-checkbox:nth-of-type(1) .el-checkbox__input.is-checked .el-checkbox__inner,.depmain-edit .el-checkbox:nth-of-type(2) .el-checkbox__input.is-checked .el-checkbox__inner{
    background: #fff;
    border-color: #3e9ff1;
  }
  .depmain-add .el-checkbox:nth-of-type(1) .el-checkbox__inner::after,.depmain-add .el-checkbox:nth-of-type(2) .el-checkbox__inner::after,.depmain-edit .el-checkbox:nth-of-type(1) .el-checkbox__inner::after,.depmain-edit .el-checkbox:nth-of-type(2) .el-checkbox__inner::after{
    border-color:#3e9ff1;
  }
  .depmain-add .el-checkbox:nth-of-type(1),.depmain-edit .el-checkbox:nth-of-type(1){
    top: -29px;
    left: 345px;
  }
  .depmain-add .el-checkbox:nth-of-type(1) .el-checkbox__inner,.depmain-add .el-checkbox:nth-of-type(2) .el-checkbox__inner ,.depmain-edit .el-checkbox:nth-of-type(1) .el-checkbox__inner,.depmain-edit .el-checkbox:nth-of-type(2) .el-checkbox__inner{
    width: 28px;
    height: 28px;
  }
  /*.depmain-edit .el-checkbox:nth-of-type(2) .el-checkbox__input.is-checked .el-checkbox__inner{*/
    /*background: #fff;*/
    /*border-color: #3e9ff1;*/
  /*}*/
  /*.depmain-edit .el-checkbox:nth-of-type(2) .el-checkbox__inner::after{*/
    /*border-color:#3e9ff1;*/
  /*}*/
  .depmain-add .el-checkbox:nth-of-type(2),.depmain-edit .el-checkbox:nth-of-type(2){
    top: -29px;
    left: 318px;
  }
  /*.depmain-edit .el-checkbox:nth-of-type(2) .el-checkbox__inner{*/
    /*width: 28px;*/
    /*height: 28px;*/
  /*}*/
  .depmain-add .el-checkbox:nth-of-type(1) .el-checkbox__inner::after, .depmain-add .el-checkbox:nth-of-type(2) .el-checkbox__inner::after,.depmain-edit .el-checkbox:nth-of-type(1) .el-checkbox__inner::after, .depmain-edit .el-checkbox:nth-of-type(2) .el-checkbox__inner::after{
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
  .dep-maintain .depmain-content li{
    border-bottom: 1px solid #dcdcdc;
    padding: 10px 0 10px 10px;
    color: #333;
    font-size: 14px;

  }
  .dep-maintain .depmain-edit li,.dep-maintain .depmain-add li{
    border-bottom: 1px solid #dcdcdc;
    padding: 10px 0 10px 10px;
    color: #333;
    font-size: 14px;
    height: 35px;
  }
</style>
