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
            <div class="add-fixed">
              <el-input
                placeholder="请输入内容"
                v-model="dictName"
              >
              </el-input>
              <div class="dep-img">
                <img src="../../../assets/icom/groupManage-checked.png" @click="addDep">
                <img src="../../../assets/icom/groupManage-false.png" @click="delDep">
              </div>
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
                      <img src="../../../assets/icom/groupManage-checked.png" @click="editDep(item)" >
                      <img src="../../../assets/icom/groupManage-false.png" @click="delDep(item)" :data-id="item.id">
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
    import { getSelectDictInfo,postDict,deletePerManage } from '../../../api/company/groupManage'
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
          return postDict(this.createrId , this.dictName).then(res => {
            this.loading = false
            this.dictName = ''
          })

        },
        closeMe(done){
          this.$emit('close')
          // if(typeof done === 'function'){
          //   done()
          // }
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
            let reqPromise = this.getAddDate()
            reqPromise.then(res=>{
              this.$alert('添加成功', '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  this.loading = false
                  this.getSelectDict()
                }
              })

            })
          }

        },
        editDep(item){
          this.dictName = item.dictName
          let reqPromise = this.getAddDate(this.dictName)
          reqPromise.then(res=>{
            this.$alert('修改成功', '提示', {
              confirmButtonText: '确定',
              callback: action => {
                this.loading = false
                this.getSelectDict()
              }
            })

          })
        },
        delDep(item){
          let id = item.id
          let deleteItem = item.dictName
          this.$confirm('确定要删除 ' + deleteItem + ' 部门吗？', '提示', {
            confirmButtonText: '删除',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            deletePerManage(id).then(res => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.getSelectDict()
            }).catch(err=>{
              this.$message({
                type: 'info',
                message: '删除失败，原因：' + err.errorInfo ? err.errorInfo : err
              })
            })

          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
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
  .add-fixed{
    display: flex;
  }
.depmain-add .el-input{
  width: 340px;
  float: left;

}
  .depmain-add .el-input .el-input__inner{
    height: 30px;
  }
  .depmain-add .depmain-list{
    margin-top: -32px;
    overflow: hidden;
  }

   /*edit*/
  .depmain-edit .el-input{
    width: 340px;
    float: left;

  }
  .depmain-edit .el-input .el-input__inner{
    height: 30px;
    padding-left: 8px;
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
    left: -9px;;
  }
  .dep-maintain .depmain-edit .depmain-list li:focus{
    background: #0a84ff;
  }
  .depmain-edit .el-input.is-active .el-input__inner, .el-input__inner:focus{

  }
  /*dep-img*/
  depmain-add .dep-img ,.depmain-edit .dep-img{
    display: inline-block;
    width: 26px;
    height: 26px;
  }
  depmain-add .dep-img img,.depmain-edit .dep-img img{
    width: 100%;
    height: 100%;
  }
  depmain-add .dep-img img:nth-of-type(1),.depmain-edit .dep-img img:nth-of-type(1){
    position: relative;
    top: 4px;
    left: 12px;
    width: 26px;
    height: 25px;

  }
  depmain-add .dep-img img:nth-of-type(2){
    position: relative;
    top: -24px;
    left: 45px;
    width: 23px;
    height: 23px
  }
  /*dep-img*/

  .depmain-edit .dep-img img:nth-of-type(2){
    position: relative;
    top: -23px;
    left: 45px;
    width: 23px;
    height: 23px
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
