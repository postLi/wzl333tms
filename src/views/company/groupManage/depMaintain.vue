<template>
  <div class="dep-maintain">
    <PopFrame :title="popTitle" :isShow="popVisible" @close="closeMe" class='addpopDepMain' v-loading="loading">
      <template class='addRelationPop-content' slot="content">
        <div ref="ruleForm" class="depmain-div">
          <div class="depmain-content" v-if="showDate">
            <ul>
              <li v-for="item in getMentInfo">
                <span>{{item.dictName}}</span>
              </li>
            </ul>
          </div>
          <div class="depmain-add" v-if="hiddenAdd" v-model='resInfo'>
            <el-input
              placeholder="请输入内容"
              v-model="dictName"
              >
            </el-input>

            <div class="dep-img">
              <img src="../../../assets/icom/groupManage-checked.png" @click="addDep">
              <img src="../../../assets/icom/groupManage-false.png" @click="delDep">
            </div>
            <div class="depmain-list">
              <ul>
                <li v-for="item in getMentInfo">
                  <span>{{item.dictName}}</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="depmain-edit" v-model='resInfo' v-if="hiddenEdit">

            <div class="depmain-list" v-model="getMentInfo">
              <ul>
                <li v-for="item in getMentInfo" >
                  <span>{{item.dictName}}</span>
                  <div class="edit-hidden">
                    <el-input
                      v-model="item.dictName"

                    >
                    </el-input>
                    <div class="dep-img">
                      <img src="../../../assets/icom/groupManage-checked.png" @click="addDep" >
                      <img src="../../../assets/icom/groupManage-false.png" @click="delDep(item.id)" :data-id="item.id">
                    </div>
                  </div>
                </li>
              </ul>
            </div>
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
    import { getSelectDictInfo,postDict } from '../../../api/company/groupManage'
    import {deleteEmployeer} from '../../../api/company/employeeManage'
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
          getMentInfo:[
            {dictName:'',id:''}
          ],
          //首行
          checked: true,
          checked2:true,
          hiddenAdd:false,
          hiddenEdit:false,
          showDate:false,
          dictName: '', //添加
          orderId: '',
          resInfo:[
            {
              dictName:''
            }
          ],
       //首行
       //   底部按钮
          addText:'添加',
          editText:'编辑',
          remText:'取消',
          showBotton:false,
          remBotton:false,
       //   底部按钮

          restaurants: [],
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
          }else{
          }
        },
        dotInfo (newVal) {
          // this.getMentInfo = this.dotInfo
        },
        popVisible (newVal) {
          console.log('popVisible:', newVal)
        },
        createrId(newVal){

        }
      },
      mounted() {
        this.getSelectDict()
      },
      methods: {
        getSelectDict() {
          this.loading = true
          getSelectDictInfo(this.createrId).then(res => {
            this.loading = false
            this.getMentInfo = res

          })

        },
        getAddDate() {
          this.loading = true
          postDict(this.createrId , this.dictName).then(res => {
            this.loading = false
            this.dictName = ''
          })

        },
        closeMe(done){
          this.$emit('close')
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
          this.popTitle = '添加'
          this.remBotton = true
          this.hiddenAdd = true
          this.showBotton = false
          this.hiddenEdit = false
          this.showDate = false
        },
        addDep(){
          if(!this.dictName){
            this.$message({
              message: '请输入用户名~',
              type: 'warning'
            })
            return false
          } else {
            this.getAddDate()

            //
            // let reqPromise
            // reqPromise = this.getAddDate()
            // reqPromise.then(res=>{
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
          }

        },
        delDep(){
          console.log(this.data-id)
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


  .my-autocomplete {
    li {
      line-height: normal;
      padding: 7px;

      .name {
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .addr {
        font-size: 12px;
        color: #b4b4b4;
      }

      .highlighted .addr {
        color: #ddd;
      }
    }
  }
/*depmain-add*/
.depmain-add .el-input{
  width: 340px;
  float: left;

}
  .depmain-add .el-input .el-input__inner{
    height: 30px;
  }
  .depmain-add .depmain-list{
    margin-top: -32px;
    border-top: 1px solid #dcdcdc;
  }
  .depmain-add .depmain-list .edit-hidden{
    /*display: none;*/
  }

   /*edit*/
  .depmain-edit .el-input{
    width: 340px;
    float: left;

  }
  .depmain-edit .el-input .el-input__inner{
    height: 30px;
  }
  .depmain-edit .depmain-list{
  }
  .dep-maintain .depmain-edit li{
    border-bottom: 1px solid #dcdcdc;
    padding: 10px 0 10px 10px;
    color: #333;
    font-size: 14px;
    height: 35px;
    cursor: pointer;
  }
  .depmain-edit .depmain-list li .edit-hidden{
    display: none;
  }
  .depmain-edit .depmain-list li:hover .edit-hidden{
    display: block;
  }
  .depmain-edit .depmain-list li span{
    display: block;
  }
  .depmain-edit .depmain-list li:hover span{
    display: none
  }
  .depmain-edit .depmain-list .edit-hidden{
    position: relative;
    top: -8px;
  }
  .dep-maintain .depmain-edit .depmain-list li:focus{
    background: #0a84ff;
  }
  .depmain-edit .el-input.is-active .el-input__inner, .el-input__inner:focus{

  }
  /*depmain-list*/
  .dep-img {
    display: inline-block;
    width: 28px;
    height: 28px;
  }
  .dep-img img{
    width: 100%;
    height: 100%;
  }
  .dep-img img:nth-of-type(1){
    margin-left: 10px;
  }
  .dep-img img:nth-of-type(2){
    position: relative;
    top: -30px;
    left: 45px;
  }
   /*首行头部*/
  .dep-maintain .depmain-content li{
    border-bottom: 1px solid #dcdcdc;
    padding: 10px 0 10px 10px;
    color: #333;
    font-size: 14px;

  }
  .dep-maintain .depmain-add li{
    border-bottom: 1px solid #dcdcdc;
    padding: 10px 0 10px 10px;
    color: #333;
    font-size: 14px;
    height: 35px;
  }



</style>
