<template>
  <div class="lntelligentFreight-maintain">

    <el-dialog icon="el-icon-edit-outline" :title="popTitle" :isShow="popVisible" class='pickpopDepMain'
               v-loading="loading" :close-on-click-modal="false" :before-close="closeMe" :visible.sync="isShow">


      <!--<template class='pickRelationPop-content' slot="content">-->
      <!--isDepMain-->
      <div class="depmain-div">
        <el-table
          ref="multipleTable"
          :data="usersArr"
          stripe
          border
          height="66"
          tooltip-effect="dark"
          style="width: 650px"
          class="tableIntelligent"
        >
          <el-table-column
            fixed
            prop="nowpayCarriage"
            width="90"
            label="现付运费">
            <template slot-scope="scope">
              <el-input v-model.number="scope.row.nowpayCarriage"
                        :size="btnsize" v-number-only:point
                        @change="(val)=>changeFright(scope.$index, scope.prop, val)"
                        :maxlength="5"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            fixed
            prop="nowpayOilCard"
            width="90"
            label="现付油卡">
            <template slot-scope="scope">
              <el-input v-model.number="scope.row.nowpayOilCard"
                        :size="btnsize" v-number-only:point
                        @change="(val)=>changeFright(scope.$index, scope.prop, val)"
                        :maxlength="5"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            fixed
            prop="backpayCarriage"
            width="90"
            label="回付运费">
            <template slot-scope="scope">
              <el-input v-model.number="scope.row.backpayCarriage"
                        :size="btnsize" v-number-only:point
                        @change="(val)=>changeFright(scope.$index, scope.prop, val)"
                        :maxlength="5"></el-input>
            </template>
          </el-table-column>
          <!--<el-table-column-->
          <!--fixed-->
          <!--prop="pickupFee"-->
          <!--width="90"-->
          <!--label="回付运费">-->
          <!--<template slot-scope="scope">-->
          <!--<el-input v-model.number="scope.row.num"-->
          <!--:size="btnsize" v-number-only:point-->
          <!--@change="(val)=>changeFright(scope.$index, scope.prop, val)"-->
          <!--:maxlength="5"></el-input>-->
          <!--</template>-->
          <!--</el-table-column>-->
          <el-table-column
            fixed
            prop="backpayOilCard"
            width="90"
            label="回付油卡">
            <template slot-scope="scope">
              <el-input v-model.number="scope.row.backpayOilCard"
                        :size="btnsize" v-number-only:point
                        @change="(val)=>changeFright(scope.$index, scope.prop, val)"
                        :maxlength="5"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            fixed
            prop="arrivepayCarriage"
            width="90"
            label="到付运费">
            <template slot-scope="scope">
              <el-input v-model.number="scope.row.arrivepayCarriage"
                        :size="btnsize" v-number-only:point
                        @change="(val)=>changeFright(scope.$index, scope.prop, val)"
                        :maxlength="5"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            fixed
            prop="arrivepayOilCard"
            width="90"
            label="到付油卡">
            <template slot-scope="scope">
              <el-input v-model.number="scope.row.arrivepayOilCard"
                        :size="btnsize" v-number-only:point
                        @change="(val)=>changeFright(scope.$index, scope.prop, val)"
                        :maxlength="5"></el-input>
            </template>
          </el-table-column>
        </el-table>
        <el-table
          ref="multipleTable"
          :data="usersArr"
          stripe
          border
          height="67"
          tooltip-effect="dark"

          style="width: 650px"
          class="tableIntelligent"
        >
          <el-table-column
            fixed
            prop="leaveHandlingFee"
            width="100"
            label="发站装卸费">
            <template slot-scope="scope">
              <el-input v-model.number="scope.row.leaveHandlingFee"
                        :size="btnsize" v-number-only:point
                        @change="(val)=>changeFright(scope.$index, scope.prop, val)"
                        :maxlength="5"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            fixed
            prop="leaveOtherFee"
            width="100"
            label="发站其他费">
            <template slot-scope="scope">
              <el-input v-model.number="scope.row.leaveOtherFee"
                        :size="btnsize" v-number-only:point
                        @change="(val)=>changeFright(scope.$index, scope.prop, val)"
                        :maxlength="5"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            fixed
            prop="arriveHandlingFee"
            width="100"
            label="到站装卸费">
            <template slot-scope="scope">
              <el-input v-model.number="scope.row.arriveHandlingFee"
                        :size="btnsize" v-number-only:point
                        @change="(val)=>changeFright(scope.$index, scope.prop, val)"
                        :maxlength="5"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            fixed
            prop="arriveOtherFee"
            width="100"
            label="到站其他费">
            <template slot-scope="scope">
              <el-input v-model.number="scope.row.arriveOtherFee"
                        :size="btnsize" v-number-only:point
                        @change="(val)=>changeFright(scope.$index, scope.prop, val)"
                        :maxlength="5"></el-input>
            </template>
          </el-table-column>
        </el-table>

        <!--<p>注：请填写车费，保证单车毛利的准确性。</p>-->


      </div>
      <div slot="footer" class="dialog-footer">

        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="closeMe">取 消</el-button>

      </div>
    </el-dialog>
  </div>

</template>

<script>
  import {pickerOptions2, parseTime, objectMerge2, tmsMath} from '@/utils/'
  import {REGEX} from '@/utils/validate'
  import PopFrame from '@/components/PopFrame/index'
  import querySelect from '@/components/querySelect/index'
  import {getFindShipByid, putRelevancyShip, putRremoveShip} from '@/api/operation/pickup'
  import SelectTree from '@/components/selectTree/index'
  import {mapGetters} from 'vuex'

  export default {
    components: {
      PopFrame,
      querySelect,
      SelectTree
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
        type: [Object, Boolean],
        default: false
      },
      createrId: [Number, String],
      intFreightItem: {
        type: [String, Number],
        default: false
      },
      intFreightIndex: {
        type: [String, Number],
        default: false
      },
      sendDataList: {
        type: Array
      }
    },
    data() {
      let hasOne = false
      const validateShipNum = (rule, value, callback) => {
        if (this.formInline.shipSn === '' && this.formInline.shipGoodsSn === '') {
          hasOne = false
        } else {
          hasOne = true
        }
        if (!hasOne) {
          callback(new Error('运单号或货号必填其中一项'))
        } else {
          callback()
        }
      }

      return {

        total: '',
        selectdCheck: true,
        btnsize: 'mini',
        selected: [],
        rules: {
          orgId: [{required: true}],
          shipSn: [
            {validator: validateShipNum}
          ],
          shipGoodsSn: [
            {validator: validateShipNum}
          ]
        },
        formLabelWidth: '100',
        usersArr: [
          {
            nowpayCarriage: '',
            nowpayOilCard: '',
            backpayCarriage: '',
            backpayOilCard: '',
            arrivepayCarriage: '',
            arrivepayOilCard: '',
            carloadInsuranceFee: '',
            leaveHandlingFee: '',
            leaveOtherFee: '',
            arriveHandlingFee: '',
            arriveOtherFee: '',
          },
        ],
        checked1: true,
        popTitle: '运费',
        loading: false,
        formInline: {
          shipSn: '',
          shipGoodsSn: '',
          pickupFee: '',
          orgId: ''
        },
        sendId: {
          pickupId: '',
          shipId: '',
          pickupFee: ''
        }
      }
    },
    computed: {
      ...mapGetters([
        'otherinfo'
      ]),
      isShow: {
        get() {
          return this.popVisible
        },
        set() {
        }
      }
    },
    watch: {
      intFreightItem(newVal, oldVal){
        // if(newVal){
          this.usersArr[0].nowpayCarriage = newVal
        // }
      },
      intFreightIndex(newVal){

      },
      sendDataList (newVal){},
      dotInfo(newVal) {
        // this.infoData(this.dotInfo)
      },
      popVisible(newVal) {
        this.$nextTick(() => {
          this.usersArr[0].nowpayCarriage = this.intFreightItem
        })
        // this.fetchData()
      }
    },
    mounted() {
      this.formInline.orgId = this.otherinfo.orgid
      if (this.popVisible) {
        // this.usersArr[0].nowpayCarriage =
        // alert(this.formInline.orgId)
      }
       this.$nextTick(() => {
         this.sendDataList.forEach((e, index) => {
           this.usersArr[0].nowpayCarriage = e.price
           this.submitForm()
         })
       })
    },
    methods: {
      changeFright(index, prop, newVal) {
        this.usersArr[index][prop] = Number(newVal)
        const newNowpayCarriage = this.usersArr[index].nowpayCarriage
        const newNowpayOilCard = this.usersArr[index].nowpayOilCard
        const newBackpayCarriage = this.usersArr[index].backpayCarriage
        const newBackpayOilCard = this.usersArr[index].backpayOilCard
        const newArrivepayCarriage = this.usersArr[index].arrivepayCarriage
        const newArrivepayOilCard = this.usersArr[index].arrivepayOilCard
        const newLeaveHandlingFee = this.usersArr[index].leaveHandlingFee
        const newLeaveOtherFee = this.usersArr[index].leaveOtherFee
        const newArriveHandlingFee = this.usersArr[index].arriveHandlingFee
        const newArriveOtherFee = this.usersArr[index].arriveOtherFee
        if (newNowpayCarriage === 0 || newNowpayOilCard === 0 || newBackpayCarriage === 0 || newBackpayOilCard === 0 || newArrivepayCarriage === 0 || newArrivepayOilCard === 0 || newLeaveHandlingFee === 0 || newLeaveOtherFee === 0 || newArriveHandlingFee === 0 || newArriveOtherFee === 0) {
          this.usersArr[index].nowpayCarriage = newNowpayCarriage
          this.usersArr[index].nowpayOilCard = newNowpayOilCard
          this.usersArr[index].backpayCarriage = newBackpayCarriage
          this.usersArr[index].backpayOilCard = newBackpayOilCard
          this.usersArr[index].arrivepayCarriage = newArrivepayCarriage
          this.usersArr[index].arrivepayOilCard = newArrivepayOilCard
          this.usersArr[index].leaveHandlingFee = newLeaveHandlingFee
          this.usersArr[index].leaveOtherFee = newLeaveOtherFee
          this.usersArr[index].arriveHandlingFee = newArriveHandlingFee
          this.usersArr[index].arriveOtherFee = newArriveOtherFee
          this.$notify({
            title: '提示',
            message: '车费不能为0',
            type: 'warning'
          })
        } else if (newNowpayCarriage < 0 || newNowpayOilCard < 0 || newBackpayCarriage < 0 || newBackpayOilCard < 0 || newArrivepayCarriage < 0 || newArrivepayOilCard < 0 || newLeaveHandlingFee < 0 || newLeaveOtherFee < 0 || newArriveHandlingFee < 0 || newArriveOtherFee < 0) {
          this.$notify({
            title: '提示',
            message: '车费不能小于0,默认为初始值',
            type: 'warning'
          })
        } else {
          this.$refs.multipleTable.toggleRowSelection(this.usersArr[index], true)
          this.usersArr[index].nowpayCarriage
          this.usersArr[index].nowpayOilCard
          this.usersArr[index].backpayCarriage
          this.usersArr[index].backpayOilCard
          this.usersArr[index].arrivepayCarriage
          this.usersArr[index].arrivepayOilCard
          this.usersArr[index].leaveHandlingFee
          this.usersArr[index].leaveOtherFee
          this.usersArr[index].arriveHandlingFee
          this.usersArr[index].arriveOtherFee
        }
      },
      search(item) {
        return !item.pickupBatchNumber
      },

      closeMe(done) {
        // this.reset()
        this.$emit('update:popVisible', false)
        if (typeof done === 'function') {
          done()
        }
      },
      reset() {
        this.usersArr = [
          {
            nowpayCarriage: '',
            nowpayOilCard: '',
            backpayCarriage: '',
            backpayOilCard: '',
            arrivepayCarriage: '',
            arrivepayOilCard: '',
            carloadInsuranceFee: '',
            leaveHandlingFee: '',
            leaveOtherFee: '',
            arriveHandlingFee: '',
            arriveOtherFee: '',
          },
        ]
      },
      setObject(obj1, obj2) {
        for (var i in obj1) {
          obj1[i] = obj2 ? obj2[i] : ''
        }
        return obj1
      },
      submitForm() {
        this.total = tmsMath.add(this.usersArr[0].nowpayCarriage, this.usersArr[0].nowpayOilCard, this.usersArr[0].backpayCarriage, this.usersArr[0].backpayOilCard, this.usersArr[0].arrivepayCarriage, this.usersArr[0].arrivepayOilCard, this.usersArr[0].carloadInsuranceFee, this.usersArr[0].leaveHandlingFee, this.usersArr[0].leaveOtherFee, this.usersArr[0].arriveHandlingFee, this.usersArr[0].arriveOtherFee).result()
        // this.$emit('getIntFreight', this.usersArr[0],this.total )

        this.$emit('getIntFreight', {
          obj: this.usersArr[0],
          val: this.total
        })
        this.closeMe()
      },
      clickDetails(row, event, column) {
        this.$refs.multipleTable.toggleRowSelection(row)
      }
    }
  }
</script>

<style lang="scss">


  .lntelligentFreight-maintain .pickpopDepMain {
    top: 12%;
    bottom: auto;
    .el-dialog {
      min-width: 720px;
      max-width: 720px;
      border-radius: 8px;
      .el-dialog__header {
        border-bottom: 1px solid #ccc;

        /*text-align: center;*/
        .el-dialog__title {
          color: rgb(100, 186, 245);
        }

      }
      .el-dialog__body {
        padding: 45px 35px;
        border-bottom: 1px solid rgb(100, 186, 245);
        .depmain-div {

          p {
            padding-top: 20px;
            color: rgb(254, 52, 52);
          }
        }
      }
      .el-dialog__footer {
        text-align: right;
      }
    }

  }

</style>

