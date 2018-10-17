<template>
  <div class="lntelligentFreight-maintain">
    <el-dialog icon="el-icon-edit-outline" :title="popTitle" :isShow="popVisible" class='pickpopDepMain' v-loading="loading" :close-on-click-modal="false" :before-close="closeMe" :visible.sync="isShow">
      <!--<template class='pickRelationPop-content' slot="content">-->
      <!--isDepMain-->
      <div class="depmain-div">
        <el-table ref="multipleTable" :data="usersArr" stripe border height="66" tooltip-effect="dark" style="width: 650px" class="tableIntelligent">
          <el-table-column prop="nowpayCarriage" label="现付运费">
            <template slot-scope="scope">
              <input v-model="scope.row.nowpayCarriage" class="nativeinput" @change="(val)=>changeFright(scope.$index, 'nowpayCarriage', val)" v-number-only:point></input>
              <!-- <el-input v-model.trim="scope.row.nowpayCarriage" :size="btnsize" v-number-only:point class="nativeinput" @change="(val)=>changeFright(scope.$index, scope.prop, val)" :maxlength="10"></el-input> -->
            </template>.
          </el-table-column>
          <el-table-column prop="nowpayOilCard" label="现付油卡">
            <template slot-scope="scope">
              <input v-model.trim="scope.row.nowpayOilCard" :size="btnsize" v-number-only:point class="nativeinput" @change="(val)=>changeFright(scope.$index, 'nowpayOilCard', val)" :maxlength="10"></input>
            </template>
          </el-table-column>
          <el-table-column prop="backpayCarriage" label="回付运费">
            <template slot-scope="scope">
              <input v-model.trim="scope.row.backpayCarriage" :size="btnsize" v-number-only:point class="nativeinput" @change="(val)=>changeFright(scope.$index, 'backpayCarriage', val)" :maxlength="10"></input>
            </template>
          </el-table-column>
          <el-table-column prop="backpayOilCard" label="回付油卡">
            <template slot-scope="scope">
              <input v-model.trim="scope.row.backpayOilCard" :size="btnsize" v-number-only:point class="nativeinput" @change="(val)=>changeFright(scope.$index, 'backpayOilCard', val)" :maxlength="10"></input>
            </template>
          </el-table-column>
          <el-table-column prop="arrivepayCarriage" label="到付运费">
            <template slot-scope="scope">
              <input v-model.trim="scope.row.arrivepayCarriage" :size="btnsize" v-number-only:point class="nativeinput" @change="(val)=>changeFright(scope.$index, 'arrivepayCarriage', val)" :maxlength="10"></input>
            </template>
          </el-table-column>
          <el-table-column prop="arrivepayOilCard" label="到付油卡">
            <template slot-scope="scope">
              <input v-model.trim="scope.row.arrivepayOilCard" :size="btnsize" v-number-only:point class="nativeinput" @change="(val)=>changeFright(scope.$index, 'arrivepayOilCard', val)" :maxlength="10"></input>
            </template>
          </el-table-column>
        </el-table>
        <el-table ref="multipleTable" :data="usersArr" stripe border height="67" tooltip-effect="dark" style="width: 650px" class="tableIntelligent">
          <el-table-column prop="leaveHandlingFee" width="109" label="发站装卸费">
            <template slot-scope="scope">
              <input v-model.trim="scope.row.leaveHandlingFee" :size="btnsize" v-number-only:point class="nativeinput" @change="(val)=>changeFright(scope.$index, 'leaveHandlingFee', val)" :maxlength="10"></input>
            </template>
          </el-table-column>
          <el-table-column prop="leaveOtherFee" width="109" label="发站其他费">
            <template slot-scope="scope">
              <input v-model.trim="scope.row.leaveOtherFee" :size="btnsize" v-number-only:point class="nativeinput" @change="(val)=>changeFright(scope.$index, 'leaveOtherFee', val)" :maxlength="10"></input>
            </template>
          </el-table-column>
          <el-table-column prop="arriveHandlingFee" width="109" label="到站装卸费">
            <template slot-scope="scope">
              <input v-model.trim="scope.row.arriveHandlingFee" :size="btnsize" v-number-only:point class="nativeinput" @change="(val)=>changeFright(scope.$index, 'arriveHandlingFee', val)" :maxlength="10"></input>
            </template>
          </el-table-column>
          <el-table-column prop="arriveOtherFee" width="107" label="到站其他费">
            <template slot-scope="scope">
              <input v-model.trim="scope.row.arriveOtherFee" :size="btnsize" v-number-only:point class="nativeinput" @change="(val)=>changeFright(scope.$index,'arriveOtherFee', val)" :maxlength="10"></input>
            </template>
          </el-table-column>
          <el-table-column prop="carloadInsuranceFee" width="107" label="整车保险费">
            <template slot-scope="scope">
              <input v-model.trim="scope.row.carloadInsuranceFee" :size="btnsize" v-number-only:point class="nativeinput" @change="(val)=>changeFright(scope.$index, 'carloadInsuranceFee', val)" :maxlength="10"></input>
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
import { pickerOptions2, parseTime, objectMerge2, tmsMath } from '@/utils/'
import { REGEX } from '@/utils/validate'
import PopFrame from '@/components/PopFrame/index'
import querySelect from '@/components/querySelect/index'
import { getFindShipByid, putRelevancyShip, putRremoveShip } from '@/api/operation/pickup'
import SelectTree from '@/components/selectTree/index'
import { mapGetters } from 'vuex'


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
      type: Object,
      default: () => {}
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

    return {

      total: '',
      selectdCheck: true,
      btnsize: 'mini',
      selected: [],
      rules: {},
      formLabelWidth: '100',
      usersArr: [{
        nowpayCarriage: '', // 现付运费
        nowpayOilCard: '', // 现付油卡
        backpayCarriage: '', // 回付运费
        backpayOilCard: '', // 回付油卡
        arrivepayCarriage: '', // 到付运费
        arrivepayOilCard: '', // 到付油卡
        carloadInsuranceFee: '', // 整车保险费
        leaveHandlingFee: '', // 发站装卸费
        leaveOtherFee: '', // 发站其他费
        arriveHandlingFee: '', // 到站装卸费
        arriveOtherFee: '', // 到站其他费
      }],
      checked1: true,
      popTitle: '运费',
      loading: false,
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
      set() {}
    }
  },
  watch: {
    intFreightItem(newVal) {},
    intFreightIndex(newVal) {},
    sendDataList(newVal) {},
    dotInfo(newVal) {},
    popVisible(newVal) {
      if (newVal) {
        this.$set(this.usersArr, 0, this.intFreightItem)
      }
    }
  },
  // mounted() {
  //   this.$nextTick(() => {
  //     this.sendDataList.forEach(e => {
  //       this.usersArr[0] = e.tmsOrderLoadFee
  //       this.submitForm()
  //     })
  //   })
  // },
  methods: {
    changeFright(index, prop, newVal) {
      // newVal = newVal.replace(REGEX.FLOAT2ING, '')
      newVal = newVal.target.value

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
      const newCarloadInsuranceFee = this.usersArr[index].carloadInsuranceFee
      if (newNowpayCarriage === 0 || newNowpayOilCard === 0 || newBackpayCarriage === 0 || newBackpayOilCard === 0 || newArrivepayCarriage === 0 || newArrivepayOilCard === 0 || newLeaveHandlingFee === 0 || newLeaveOtherFee === 0 || newArriveHandlingFee === 0 || newArriveOtherFee === 0 || newCarloadInsuranceFee === 0) {
        // this.$notify({
        //   title: '提示',
        //   message: '不能为0',
        //   type: 'warning'
        // })
      } else if (newNowpayCarriage < 0 || newNowpayOilCard < 0 || newBackpayCarriage < 0 || newBackpayOilCard < 0 || newArrivepayCarriage < 0 || newArrivepayOilCard < 0 || newLeaveHandlingFee < 0 || newLeaveOtherFee < 0 || newArriveHandlingFee < 0 || newArriveOtherFee < 0 || newCarloadInsuranceFee < 0) {
        this.$notify({
          title: '提示',
          message: '车费不能小于0,默认为初始值',
          type: 'warning'
        })
      } else {
        this.$refs.multipleTable.toggleRowSelection(this.usersArr[index], true)
      }

    },

    closeMe(done) {
      this.reset()
      this.$emit('update:popVisible', false)
      if (typeof done === 'function') {
        done()
      }
    },
    reset() {
      this.usersArr = this.$options.data().usersArr
    },
    submitForm() {
      // 车费=现付运费+现付油卡+回付运费+回付油卡+到付运费+到付油卡
      this.total = tmsMath.add(
        this.usersArr[0].nowpayCarriage,
        this.usersArr[0].nowpayOilCard,
        this.usersArr[0].backpayCarriage,
        this.usersArr[0].backpayOilCard,
        this.usersArr[0].arrivepayCarriage,
        this.usersArr[0].arrivepayOilCard).result()
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
        .el-table__fixed-body-wrapper {
          .el-table__body {
            .el-table__row {
              td {
                padding: 0 0;
                .cell {
                  padding-left: 0;
                  padding-right: 0;
                  .el-input.el-input--mini {
                    .el-input__inner {
                      border-radius: 0;
                    }
                  }
                }
              }
            }
          }
        }

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
