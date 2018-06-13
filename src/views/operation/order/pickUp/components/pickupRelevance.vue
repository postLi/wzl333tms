<template>
  <div class="pick-maintain">
    <PopFrame :title="popTitle" :isShow="popVisible" @close="closeMe" class='pickpopDepMain' v-loading="loading">
      <template class='pickRelationPop-content' slot="content">
        <!--isDepMain-->
        <div ref="ruleForm" class="depmain-div">
          <el-form :inline="true" :model="getMentInfo" class="demo-form-inline" :label-width="formLabelWidth">
            <el-form-item label="提货批次">
              <el-input v-model="getMentInfo.pickupBatchNumber" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="派车费用">
              <el-input v-model="getMentInfo.pickupBatchNumber" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="车牌号码">
              <el-input v-model="getMentInfo.truckIdNumber" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="司机姓名">
              <el-input v-model="getMentInfo.driverName" placeholder=""></el-input>
            </el-form-item>
          </el-form>
          <el-table
            ref="multipleTable"
            :data="userar"
            stripe
            border
            @row-click="clickDetails"
            @selection-change="getSelection"
            height="110"
            tooltip-effect="dark"
            :default-sort = "{prop: 'id', order: 'ascending'}"
            style="width: 100%">
            <el-table-column
              fixed
              sortable
              type="selection"
              width="78">
            </el-table-column>
            <el-table-column
              fixed
              sortable
              prop="shipSn"
              label="运单号"
              width="160">
            </el-table-column>
            <el-table-column
              fixed
              sortable
              prop="pickupBatchNumber"
              width="150"
              label="货号">
            </el-table-column>
            <el-table-column
              fixed
              sortable
              prop="pickupFee"
              width="150"
              label="实际提货费">
            </el-table-column>
          </el-table>

          <el-form :inline="true" :model="formInline" class="order_bottom" :label-width="formLabelWidth">
            <el-form-item label="运单号">
              <el-input v-model="formInline.user" placeholder="审批人"></el-input>
            </el-form-item>
            <el-form-item label="货号">
              <el-input v-model="formInline.user" placeholder="审批人"></el-input>
            </el-form-item>
            <el-form-item label="本单提货费">
              <el-input v-model="formInline.user" placeholder="审批人"></el-input>
            </el-form-item>
          </el-form>

        </div>
      </template>
      <div slot="footer" class="dialog-footer-frame" >
        <el-button type="primary" @click="submitForm('ruleForm')">加入列表</el-button>
        <el-button @click="closeMe">从列表移除</el-button>
      </div>

    </PopFrame>
  </div>

</template>

<script>
  import PopFrame from '@/components/PopFrame/index'
  // import { getSelectDictInfo,postDict,deletePerManage,putDict } from '@/api/company/groupManage'
  export default {
    components: {
      PopFrame
    },
    props: {
      popVisible: {
        type: Boolean,
        default: false
      },
      dotInfo: {
        type: Object,
        default: false
      },
      isDepMain:{
        type:Boolean,
        default:false
      },
      createrId: [Number,String]
    },
    data() {
      return {
        formLabelWidth:'90',
        formInline: {
          user: '',
          region: ''
        },
        checked1: true,
        popTitle: '关联运单',
        loading:false,
        getMentInfo:
          {
            pickupBatchNumber:'',
          //派车费用
            truckIdNumber:'',//车牌
            driverName:''//司机姓名
          },
        //首行
        input: '',
        orderId: '',
        resInfo:[
          {
            dictName:''
          }
        ],
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

        }else{
        }
      },
      dotInfo (newVal) {
        // this.getMentInfo = this.dotInfo
        // console.log(typeof this.dotInfo)
      },
      popVisible (newVal) {
        console.log('popVisible:', newVal)
      },
      createrId(newVal){

      }
    },
    mounted() {
      this.getSelectDict(this.createrId)
    },
    methods: {
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
      submitForm(formName) {
        this.$message({
          message: '开单页面~',
          type: 'warning'
        })
        // this.$refs[formName].validate((valid) => {
        //   if (valid) {
        //     this.loading = true
        //     this.form.tmsCustomer = this.customSend
        //     this.form.tmsOrderPickup.outTime = this.newDate
        //     this.form.tmsOrderPickup.arriveTime = this.endDate
        //     // console.log(this.form)
        //     let data = this.form
        //     // let data = Object.assign({},this.form)
        //     // data.fixPhone = this.fixPhone
        //     let promiseObj
        //     // 判断操作，调用对应的函数
        //     if(this.isModify){
        //       // promiseObj = putUpdatePickup(data)
        //     } else {
        //       // promiseObj = postAddPickup(data)
        //     }
        //
        //     promiseObj.then(res => {
        //       this.loading = false
        //       this.$alert('操作成功', '提示', {
        //         confirmButtonText: '确定',
        //         callback: action => {
        //           this.closeMe()
        //           this.$emit('success')
        //         }
        //       });
        //     }).catch(err => {
        //       this.loading = false
        //     })
        //   } else {
        //     return false;
        //   }
        // });
      },
      clickDetails(row, event, column){
        this.$refs.multipleTable.toggleRowSelection(row)
      },
      getSelection (selection) {
        this.selected = selection
      },
    }
  }
</script>

<style lang="scss">
  .pick-maintain .pickpopDepMain{
    top: 29%;
    bottom: auto;
    min-width: 550px;
    max-width:  550px;
    /*min-height: 450px;*/
    /*max-height:  100%;*/

  }
  .pick-maintain .popRight-content{
    padding: 20px 0 5px 10px;
    box-sizing: border-box;
    .el-form--inline .el-form-item{
      margin-right: -8px;
      /*margin-bottom: 15px;*/
    }
    .el-input{
      width: 90%;

    }
    .order_bottom{
      margin-top: 10px;
      .el-form-item{
        margin-right: 10px;
      }
      .el-input{
        width: 100px;

      }
    }
    .el-input__inner{
      height: 30px;
      font-size: 14px;

    }
  }
  .pick_center{
    text-align: center;
    padding-top: 80px;
    font-size: 16px;
  }
  .pick_input{
    padding-top: 60px;
    text-align: center;
    font-size: 14px;
    .el-input{
      width: 40%;

    }
  }
</style>
