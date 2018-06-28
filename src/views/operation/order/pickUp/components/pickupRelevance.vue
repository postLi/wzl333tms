<template>
  <div class="pick-maintain">
    <PopFrame :title="popTitle" :isShow="popVisible" @close="closeMe" class='pickpopDepMain' v-loading="loading">
      <template class='pickRelationPop-content' slot="content">
        <!--isDepMain-->
        <div ref="ruleForm" class="depmain-div">
          <el-form :inline="true" :rules="rules" class="demo-form-inline" :model="formInline" :label-width="formLabelWidth" ref="formName">
            <el-form-item label="提货批次">
              <el-input v-model="getMentInfo.pickupBatchNumber" disabled></el-input>
            </el-form-item>
            <el-form-item label="派车费用">
              <el-input v-model="getMentInfo.truckFee" disabled></el-input>
            </el-form-item>
            <el-form-item label="车牌号码">
              <el-input v-model="getMentInfo.truckIdNumber" disabled></el-input>
            </el-form-item>
            <el-form-item label="司机姓名">
              <el-input v-model="getMentInfo.driverName" disabled></el-input>
            </el-form-item>
          </el-form>
          <el-table
            ref="multipleTable"
            :data="usersArr"
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
              prop="shipGoodsSn"
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

          <el-form :inline="true"  class="order_bottom" :label-width="formLabelWidth">
            <el-form-item label="运单号" prop="shipSn">
              <!--<el-input v-model="formInline.shipSn"></el-input>-->
              <querySelect valuekey="shipSn" search="shipSn" type="order" @change="getShipSn" v-model="formInline.shipSn"/>
            </el-form-item>
            <el-form-item label="货号" prop="shipGoodsSn">
              <!--<el-input v-model="formInline.shipGoodsSn"></el-input>-->
              <querySelect valuekey="shipGoodsSn" search="shipGoodsSn" type="order" @change="getShipGoodsSn" v-model="formInline.shipGoodsSn"/>
            </el-form-item>
            <el-form-item label="本单提货费" prop="pickupFee">
              <el-input v-model="formInline.pickupFee"></el-input>
            </el-form-item>
          </el-form>

        </div>
      </template>
      <div slot="footer" class="dialog-footer-frame" >
        <el-button type="primary" @click="submitForm('formName')">加入列表</el-button>
        <el-button @click="removeList">从列表移除</el-button>
      </div>

    </PopFrame>
  </div>

</template>

<script>
  import { REGEX } from '@/utils/validate'
  import PopFrame from '@/components/PopFrame/index'
  import querySelect from '@/components/querySelect/index'
  import { getFindShipByid,putRelevancyShip,putRremoveShip} from '@/api/operation/pickup'

  export default {
    components: {
      PopFrame,
      querySelect
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
      let hasOne = false
      let validateShipNum = (rule,value,callback) =>{
        if(this.formInline.shipSn ==='' && this.formInline.shipSn ===''){
          hasOne = false
        }
        if(!value && !hasOne){
          callback(new Error('运单号或货号必填其中一项'))
        }
        else{
          hasOne = true
          callback()
        }

      }
      let validatePickupFee = (rule,value,callback) =>{
        if(REGEX.ONLY_NUMBER.test(value) || !value.length){
          callback()
        }
        else {
          callback(new Error('只能输入数字'))
        }
      }
      return {
        selected: [],
        rules:{
          shipSn:[
            { validator:validateShipNum, trigger: 'blur' }
          ],
          shipGoodsSn:[
            { validator:validateShipNum, trigger: 'blur' }
          ],
          pickupFee: [
            {validator: validatePickupFee, trigger: 'change'}
          ],
        },
        formLabelWidth:'90',

        usersArr: [],
        checked1: true,
        popTitle: '关联运单',
        loading:false,
        formInline: {
          shipSn: '',
          shipGoodsSn: '',
          pickupFee: ''
        },
        getMentInfo:
          {
            pickupBatchNumber:'',
            truckFee:'',//派车费用
            truckIdNumber:'',//车牌
            driverName:''//司机姓名
          },
        sendId:{
          pickupId:'',
          shipId:'',
          pickupFee:''
        }
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
        this.getMentInfo.pickupBatchNumber = this.dotInfo.pickupBatchNumber
        this.getMentInfo.driverName = this.dotInfo.driverName
        this.getMentInfo.getMentInfo = this.dotInfo.getMentInfo
        this.getMentInfo.truckFee = this.dotInfo.truckFee
        this.sendId.pickupId = this.dotInfo.id
        // console.log(this.sendId.pickupId);
        this.fetchData()
      },
      popVisible (newVal) {
      },
      createrId(newVal){

      }
    },
    mounted() {
      if(this.popVisible){
        this.sendId.pickupId = this.dotInfo.id

      }
      // this.fetchData()

    },
    methods: {
      fetchFindByShipSnOrGoodSn() {
        this.loading = true
        return getFindShipByid(this.dotInfo.id).then(data => {
          // console.log(data)
          this.usersArr = data
          this.loading = false
        })
      },
      fetchData() {
        this.fetchFindByShipSnOrGoodSn()
      },
      getShipSn(order){
        if(order){
          this.formInline.shipGoodsSn = order.shipGoodsSn
          this.sendId.shipId = order.id
        }
      },
      getShipGoodsSn(order){
        if(order){
          this.formInline.shipSn = order.shipSn
          this.sendId.shipId = order.id
        }
      },
      closeMe (done) {
        this.$emit('update:popVisible', false);
        if(typeof done === 'function'){
          done()
        }
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading = true
            this.sendId.pickupFee = this.formInline.pickupFee
            let pickupFee =this.sendId.pickupFee || ''
            // parseInt(data.pickupFee)
            // console.log(data);
            // console.log(typeof parseInt(data.pickupFee));
            let promiseObj = putRelevancyShip(this.sendId.pickupId,this.sendId.shipId,pickupFee)

            promiseObj.then(res => {
              this.loading = false
              this.$alert('操作成功', '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  this.fetchData()

                }
              });
            }).catch(err => {
              this.loading = false
            })
          } else {
            return false;
          }
        });
      },
      removeList(){
        console.log(this.selected.length)
        if(!this.selected.length){
          this.$message({
            message: '请选择要操作的列表项~',
            type: 'warning'
          })
          return false
        }else{
          // let data =
          let promiseObj = putRremoveShip(this.sendId.pickupId,this.sendId.shipId)
        //  putRremoveShip

          promiseObj.then(res => {
            this.loading = false
            this.$alert('操作成功', '提示', {
              confirmButtonText: '确定',
              callback: action => {
                this.fetchData()

              }
            });
          }).catch(err => {
            this.loading = false
          })
        }
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
