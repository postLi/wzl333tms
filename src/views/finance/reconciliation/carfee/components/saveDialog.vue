<template>
  <div class="saveDialog-maintain">
    <PopFrame :title="popTitle" :isShow="popVisible" @close="closeMe" class='pickpopDepMain' v-loading="loading">
      <template class='pickRelationPop-content' slot="content">
        <!--isDepMain-->
        <div class="depmain-div">
          <div class="dialogMoney">
            对账总金额：<span>{{totaMoney}}元</span>
          </div>
          <el-table
            ref="multipleTable"
            :data="dialogInfo"
            stripe
            border
            tooltip-effect="dark"
            :default-sort="{prop: 'id', order: 'ascending'}"
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
              label="费用项">
            </el-table-column>
            <el-table-column
              fixed
              sortable
              prop="toPay"
              width="240"
              label="金额">
            </el-table-column>
          </el-table>


        </div>
      </template>
      <div slot="footer" class="dialog-footer-frame">

        <el-button @click="closeMe">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>

    </PopFrame>
  </div>

</template>

<script>
  import {REGEX} from '@/utils/validate'
  import PopFrame from '@/components/PopFrame/index'
  import querySelect from '@/components/querySelect/index'
  import {postCreateBillCheckCarInfo} from '@/api/finance/fin_carfee'
  // parseTime
  import {parseTime, tmsMath} from '@/utils'

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
      //
      deliver: {
        type: Boolean,
        default: false
      },
      isShort: {
        type: Boolean,
        default: false
      },
      isArtery: {
        type: Boolean,
        default: false
      },
      tota: {
        type: [Object, Array, Boolean],
        default: false
      },
      dotInfo: {
        type: [Object, Array],
        default: false
      },
      sendId: [Number, String]
    },
    data() {
      return {
        selected: [],

        formLabelWidth: '90',
        dialogInfo: [
          {
            toPay: 0,
            date: '应付账款'
          },
          {
            toPay: 0,
            date: '已付账款'
          }
        ],
        dialogData: {},
        checked1: true,
        popTitle: '',
        totaMoney: 0,
        loading: true
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
      deliver: {
        handler(newVal) {

        }

      },
      isShort: {
        handler(newVal) {

        }

      },
      isArtery: {
        handler(newVal) {

        }

      },
      tota: {
        handler(newVal) {
          this.dialogInfo[0].toPay = 0
          this.dialogInfo[1].toPay = 0
          this.dialogData = this.tota
          this.dialogData.dealPaytota.map(el => {
            this.$set(this.dialogInfo, 0, {
              date: '未付账款',
              toPay: tmsMath.add(this.dialogInfo[0].toPay).add(el.totalPay ? +el.totalPay : 0).result()
            })
            // this.dialogInfo[0].toPay += (el.arrSendPay ? +el.arrSendPay : 0)
          })
          this.dialogData.alreadyPaytota.map(el => {
            this.$set(this.dialogInfo, 1, {
              date: '已付账款',
              toPay: tmsMath.add(this.dialogInfo[1].toPay).add(el.totalPay ? +el.totalPay : 0).result()
            })
            // this.dialogInfo[1].toPay += (el.arrSendPay ? +el.arrSendPay : 0)
          })
          this.totaMoney = tmsMath.add(this.dialogInfo[0].toPay, this.dialogInfo[1].toPay).result()
          if (this.sendId) {
            this.dotInfo.id = this.sendId
          } else {
            this.dotInfo
          }
        },
        deep: true
      },
      dotInfo: {
        handler(newVal) {
          this.popTitle = this.dotInfo.checkBillName
          if (this.sendId) {
            this.dotInfo.id = this.sendId
          } else {
            this.dotInfo
          }
        },
        deep: true
      },
      popVisible(newVal) {
        // this.fetchData()
      },
      sendId(newVal) {
        if (this.sendId) {
          this.dotInfo.id = this.sendId
        } else {
          this.dotInfo
        }
      }
    },
    mounted() {
      if (this.popVisible) {
        this.popTitle = this.dotInfo.checkBillName
      }
    },
    methods: {
      closeMe(done) {
        this.reset()
        this.$emit('update:popVisible', false)
        if (typeof done === 'function') {
          done()
        }
      },
      reset() {

      },

      submitForm() {
        this.loading = true
        let promiseObj
        let data = []
        data = this.dotInfo
        data.checkStartTime = (data.checkStartTime + ' 00:00:00')
        data.checkEndTime = (data.checkEndTime) + ' 23:59:59'
        data.createTime = parseTime(data.createTime)
        console.log(data)
        // return false
        if (this.sendId) {
          data.id = this.sendId
          if (this.deliver) {
            data.loadTypeId = 40
            promiseObj = postCreateBillCheckCarInfo(data)
            this.eventBus.$emit('replaceCurrentView', '/finance/reconciliation/carfee/deliver')
          } else if (this.isArtery) {
            data.loadTypeId = 39
            promiseObj = postCreateBillCheckCarInfo(data)
            this.eventBus.$emit('replaceCurrentView', '/finance/reconciliation/carfee/artery')
          } else {
            data.loadTypeId = 38
            promiseObj = postCreateBillCheckCarInfo(data)
            this.eventBus.$emit('replaceCurrentView', '/finance/reconciliation/carfee/shortDepart')
          }
        } else {
          if (this.deliver) {
            promiseObj = postCreateBillCheckCarInfo(data)
            this.eventBus.$emit('replaceCurrentView', '/finance/reconciliation/carfee/deliver')
          } else if (this.isArtery) {
            promiseObj = postCreateBillCheckCarInfo(data)
            this.eventBus.$emit('replaceCurrentView', '/finance/reconciliation/carfee/artery')
          } else {
            promiseObj = postCreateBillCheckCarInfo(data)
            this.eventBus.$emit('replaceCurrentView', '/finance/reconciliation/carfee/shortDepart')
          }
        }

        promiseObj.then(res => {
          this.loading = false
          this.reset()
          this.$message({
            message: '保存成功~',
            type: 'success'
          })
        })
      }
    }
  }
</script>

<style lang="scss">
  .saveDialog-maintain .pickpopDepMain {
    top: 29%;
    bottom: auto;
    min-width: 486px;
    max-width: 486px;
    .dialog-footer-frame {
      text-align: right;
      padding-right: 10px;
    }

  }

  .saveDialog-maintain .popRight-content {
    padding: 20px 10px 5px 10px;
    box-sizing: border-box;
    .el-form--inline .el-form-item {
      margin-right: -8px;
      margin-bottom: 5px;
    }
    .el-input {
      width: 90%;

    }

    .el-input__inner {
      height: 30px;
      font-size: 14px;

    }
    .dialogMoney {
      margin: 0 0 13px 0px;
      font-size: 14px;
      color: #333333;
      span {
        color: #ff2f2f;
        font-weight: 600;
      }
    }
  }
</style>
