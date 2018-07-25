<template>
  <div class="saveDialog-maintain">
    <PopFrame :title="popTitle" :isShow="popVisible" @close="closeMe" class='pickpopDepMain' v-loading="loading" >
      <template class='pickRelationPop-content' slot="content">
        <!--isDepMain-->
        <div class="depmain-div" >
          <div class="dialogMoney">

          对账总金额：<span>{{totaMoney}}元</span>
          </div>
          <el-table
            ref="multipleTable"
            :data="dialogInfo"
            stripe
            border
            height="160"
            tooltip-effect="dark"
            :default-sort = "{prop: 'id', order: 'ascending'}"
            style="width: 100%">
            <el-table-column
            fixed
            sortable
            label="序号"
            width="100">
            <template slot-scope="scope">{{ scope.$index + 1 }}</template>
            </el-table-column>
            <el-table-column
            fixed
            sortable
            prop="date"
            width="185"
            label="费用项">
            </el-table-column>
            <el-table-column
            fixed
            sortable
            prop="toPay"
            width="189"
            label="金额">
            </el-table-column>
          </el-table>


        </div>
      </template>
      <div slot="footer" class="dialog-footer-frame" >

        <el-button @click="closeMe">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>

    </PopFrame>
  </div>

</template>

<script>
  import { REGEX } from '@/utils/validate'
  import PopFrame from '@/components/PopFrame/index'
  import querySelect from '@/components/querySelect/index'
  import {postUpdateBillCheckSelective} from '@/api/finance/fin_carfee'
  // import { getFindShipByid,putRelevancyShip,putRremoveShip} from '@/api/operation/pickup'

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
      isDepMain: {
        type: Boolean,
        default: false
      },
      dotInfo: {
        type: [Object,Array,Boolean],
        default: false
      },
      sendId: [Number,String]
    },
    data() {
      return {
        selected: [],

        formLabelWidth:'90',
        dialogInfo:[
          {
            toPay:10,
            date:"应收账款"
          },
          {
            toPay:20,
            date:"应付账款"
          },
          {
            toPay:10,
            date:"已收货款"
          },
          {
            toPay:20,
            date:"已付账款"
          }
        ],
        dialogData:{},
        checked1: true,
        popTitle: '',
        totaMoney: '',
        loading:false,
        formInline: {
          shipSn: '',
          shipGoodsSn: '',
          pickupFee: ''
        },
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
        this.dialogInfo[0].toPay = this.dotInfo.receivableFee
        this.dialogInfo[1].toPay = this.dotInfo.payableFee
        this.dialogInfo[2].toPay = this.dotInfo.receivedFee
        this.dialogInfo[3].toPay = this.dotInfo.paidFee
        this.totaMoney = this.dotInfo.receivableFee + this.dotInfo.payableFee + this.dotInfo.receivedFee + this.dotInfo.paidFee
        this.popTitle = this.dotInfo.checkBillName
      },
        popVisible (newVal) {

      },
      sendId(newVal){

      }
    },
    mounted() {
      if(this.popVisible){

      }
    },
    methods: {
      search (item) {

      },
      closeMe (done) {
        this.reset()
        this.$emit('update:popVisible', false);
        if(typeof done === 'function'){
          done()
        }
      },
      reset(){
      },

      submitForm(formName) {
        let data = {
          id:'',
          checkStatus:1
        }
        data.id = this.dotInfo.id
        postUpdateBillCheckSelective(data).then(res => {
          this.loading = false
          this.$message({
            type: 'success',
            message: '操作成功~'
          })
          this.$emit('success')
          this.closeMe()
        }).catch(err => {
          this.loading = false
        })

      },
    }
  }
</script>

<style lang="scss">
  .saveDialog-maintain .pickpopDepMain{
    top: 29%;
    bottom: auto;
    min-width: 486px;
    max-width:  486px;
    .dialog-footer-frame{
      text-align: right;
      padding-right: 10px;
    }

  }
  .saveDialog-maintain .popRight-content{
    padding: 20px 0 5px 10px;
    box-sizing: border-box;
    .el-form--inline .el-form-item{
      margin-right: -8px;
      margin-bottom: 5px;
    }
    .el-input{
      width: 90%;

    }

    .el-input__inner{
      height: 30px;
      font-size: 14px;

    }
    .dialogMoney{
      margin: 0 0 13px 0px;
      font-size: 14px;
      color: #333333;
      span{
        color: #ff2f2f;
        font-weight: 600;
      }
    }
  }
</style>
