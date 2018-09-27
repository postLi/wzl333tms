<template>
  <div class="saveDialog-index">
    <PopFrame :title="popTitle" :isShow="popVisible" @close="closeMe" class='pickpopDepMain' v-loading="loading" >
      <template class='pickRelationPop-content' slot="content">
        <div class="depmain-div" >
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
            width="80">
            <template slot-scope="scope">{{ scope.$index + 1 }}</template>
            </el-table-column>
            <el-table-column
            fixed
            sortable
            prop="date"
            width="120"
            label="费用项">
            </el-table-column>
            <el-table-column
            fixed
            sortable
            prop="toPay"
            width="250"
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
            toPay:20,
            date:"未付账款"
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
        this.dialogInfo[0].toPay = 0
        this.dialogInfo[1].toPay = 0
        this.dialogInfo[0].toPay = this.dotInfo.payAmount ? this.dotInfo.payAmount : 0
        this.dialogInfo[1].toPay = this.dotInfo.hadPayAmount ? this.dotInfo.hadPayAmount : 0
        this.totaMoney = this.dotInfo.payAmount + this.dotInfo.hadPayAmount
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
            message: '该对账单已经完成对账~'
          })
          this.$emit('success')
          this.closeMe()
        }).catch((err)=>{
          this.loading = false
          this._handlerCatchMsg(err)
        })

      },
    }
  }
</script>

<style lang="scss">
  .saveDialog-index .pickpopDepMain{
    top: 29%;
    bottom: auto;
    min-width: 486px;
    max-width:  486px;
    .dialog-footer-frame{
      text-align: right;
      padding-right: 10px;
    }

  }
  .saveDialog-index .popRight-content{
    padding: 20px 10px 5px 10px;
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
