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
  import {tmsMath} from '@/utils/'
  import { REGEX } from '@/utils/validate'
  import PopFrame from '@/components/PopFrame/index'
  import querySelect from '@/components/querySelect/index'
  import { postCSaveCustomerDetail } from '@/api/finance/fin_customer'
  // parseTime
  import { parseTime } from '@/utils'
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
      tota: {
        type: [Object, Array],
        default: false
      },
      dotInfo: {
        type: [Object, Array],
        default: false
      },
      sendId: [Number, String],
      memberId: [Number, String],
      urlId: [Number, String]
    },
    data() {
      return {
        selected: [],

        formLabelWidth: '90',
        dialogInfo: [
          {
            toPay: 0,
            date: '应收清单'
          },
          {
            toPay: 0,
            date: '应付清单'
          },
          {
            toPay: 0,
            date: '已收清单'
          },
          {
            toPay: 0,
            date: '已付清单'
          }
        ],
        dialogData: {},
        checked1: true,
        popTitle: '',
        totaMoney: 0,
        loading: false
      }
    },
    computed: {
      isShow: {
        get() {
          return this.popVisible
        },
        set() {
        }
      }
    },
    watch: {
      tota: {
        handler(newVal) {
          this.watchDate()
        },
        deep: true
      },
      dotInfo: {
        handler(newVal) {
          this.popTitle = this.dotInfo.tmsFinanceBillCheckDto.checkBillName
          this.watchDate()
        },
        deep: true
      },
      popVisible(newVal) {

      },
      sendId(newVal) {

      },
      memberId(newVal) {
      },

      urlId() {
      }
    },

    mounted() {
    },
    methods: {
      watchDate() {
        this.dialogInfo[0].toPay = 0
        this.dialogInfo[1].toPay = 0
        this.dialogInfo[2].toPay = 0
        this.dialogInfo[3].toPay = 0
        this.dialogData = this.tota
        this.dialogData.dealtota.map(el => {
          this.$set(this.dialogInfo, 0, {
            date: '未收清单',
            toPay: tmsMath.add(this.dialogInfo[0].toPay).add(el.totalFee ? +el.totalFee : 0).result()
          })
            // this.dialogInfo[0].toPay += (el.arrSendPay ? +el.arrSendPay : 0)
        })
        this.dialogData.dealPaytota.map(el => {
          this.$set(this.dialogInfo, 1, {
            date: '未付清单',
            // toPay: this.dialogInfo[1].toPay + (el.totalFee ? +el.totalFee : 0)
            toPay: tmsMath.add(this.dialogInfo[1].toPay).add(el.totalFee ? +el.totalFee : 0).result()

          })
            // this.dialogInfo[1].toPay += (el.arrSendPay ? +el.arrSendPay : 0)
        })
        this.dialogData.alreadytota.map(el => {
          this.$set(this.dialogInfo, 2, {
            date: '已收清单',
            toPay: tmsMath.add(this.dialogInfo[2].toPay).add(el.totalFee ? +el.totalFee : 0).result()
          })
            // this.dialogInfo[1].toPay += (el.arrSendPay ? +el.arrSendPay : 0)
        })
        this.dialogData.alreadyPaytota.map(el => {
          this.$set(this.dialogInfo, 3, {
            date: '已付清单',
            toPay: tmsMath.add(this.dialogInfo[3].toPay).add(el.totalFee ? +el.totalFee : 0).result()
          })
            // this.dialogInfo[1].toPay += (el.arrSendPay ? +el.arrSendPay : 0)
        })
        this.totaMoney = tmsMath.add(this.dialogInfo[0].toPay , this.dialogInfo[1].toPay , this.dialogInfo[2].toPay , this.dialogInfo[3].toPay).result()
        // console.log(this.dialogData[1].toPay,"应付清单")
        // this.totaMoney = this.dialogInfo[0].toPay + this.dialogInfo[1].toPay + this.dialogInfo[2].toPay + this.dialogInfo[3].toPay
      },
      closeMe(done) {
        this.reset()
        this.$emit('update:popVisible', false)
        if (typeof done === 'function') {
          done()
        }
      },
      reset() {
      },

      submitForm(formName) {
        this.loading = true
        let promiseObj
        const data = {}
        for (const i in this.dotInfo) {
          data[i] = this.dotInfo[i]
        }
        console.log('////////////', data)
        // data.tmsFinanceBillCheckDto.createTime = (data.tmsFinanceBillCheckDto.createTime)
        data.tmsFinanceBillCheckDto.createTime = parseTime(data.tmsFinanceBillCheckDto.createTime)
        if (this.sendId) {
          data.tmsFinanceBillCheckDto.id = this.sendId
          promiseObj = postCSaveCustomerDetail(data)
          this.eventBus.$emit('replaceCurrentView', '/finance/reconciliation/customer/detailTable?tab=客户对账明细&id=' + this.urlId)
        } else {
          promiseObj = postCSaveCustomerDetail(data)
          this.eventBus.$emit('replaceCurrentView', '/finance/reconciliation/customer/detailTable?tab=客户对账明细&id=' + this.memberId)
        }

        promiseObj.then(res => {
          this.loading = false
          this.$message({
            message: '保存成功~',
            type: 'success'
          })

              this.closeMe()
            }).catch(err => {
              this._handlerCatchMsg(err)
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
