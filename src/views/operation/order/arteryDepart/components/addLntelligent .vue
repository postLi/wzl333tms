<template>
  <div class="lntelligent-maintain">

    <el-dialog icon="el-icon-edit-outline" :title="popTitle" :isShow="popVisible" class='pickpopDepMain'
                :close-on-click-modal="false" :before-close="closeMe" :visible.sync="isShow">
      <template>
        <!--<i class="el-icon-edit"></i>-->
        <!--<span class="deletebtn"><icon-svg icon-class="delete_lll" fill="red"></icon-svg></span>-->
      </template>

      <!--<template class='pickRelationPop-content' slot="content">-->
      <!--isDepMain-->
      <div class="depmain-div" v-loading="loading">
        <el-form :inline="true" class="order_bottom" label-width="80px" :rules="rules" :model="formInline"
                 ref="formName">
          <el-form-item label="到达网点" prop="orgId">
            <!-- <SelectTree v-model="formInline.orgId" :orgid="otherinfo.orgid" clearable class="orgClass"></SelectTree> -->
            <SelectTree v-model="formInline.orgId" clearable class="orgClass" :disabledOption="[otherinfo.orgid]"></SelectTree>
          </el-form-item>

        </el-form>
        <el-table
          ref="multipleTable"
          :data="usersArr"
          stripe
          border
          @row-click="clickDetails"
          @selection-change="getSelection"
          height="200"
          tooltip-effect="dark"

          style="width: 560px"
          class="tableIntelligent"
        >
          <el-table-column
            fixed
            type="selection"
            width="60">
          </el-table-column>
          <el-table-column
            fixed
            prop="name"
            label="车型"
            width="90">
          </el-table-column>
          <el-table-column
            fixed
            prop="weight"
            width="110"
            label="承载重(kg)">
          </el-table-column>
          <el-table-column
            fixed
            prop="vol"
            width="90"
            label="承载方(m³)">
          </el-table-column>
          <el-table-column
            fixed
            prop="price"
            width="120"
            label="车费">
            <template slot-scope="scope">
              <el-input v-model.number="scope.row.price"
                        :size="btnsize" v-number-only:point
                        @change="(val)=>changeFright(scope.$index, scope.prop, val)"
                        :disabled="scope.row['selectdCheck']" :maxlength="8" @click.stop.prevent.native></el-input>
            </template>
          </el-table-column>
        </el-table>
        <p>注：请填写车费，保证单车毛利的准确性。</p>


      </div>

      <!--</template>-->
      <!--<div slot="footer" class="dialog-footer-frame">-->
      <div slot="footer" class="dialog-footer">

        <el-button type="primary" @click="submitForm('formName')">确 定</el-button>
        <el-button @click="closeMe">取 消</el-button>

      </div>
      <!--<div>-->
      <!--<el-button @click="closeMe">取消</el-button>-->
      <!--<el-button type="primary" @click="submitForm('formName')">确定</el-button>-->
      <!--</div>-->
      <!--</div>-->
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
  import {getIntnteSMainInfoList} from '@/api/operation/arteryDepart'

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
      createrId: [Number, String]
    },
    data() {
      return {
        selectdCheck: true,
        btnsize: 'mini',
        selected: [],
        rules: {
          orgId: [{required: true, message: '到达网点不能为空', trigger: 'blur'}]
        },
        formLabelWidth: '100',
        usersArr: [],
        checked1: true,
        popTitle: '填写参数',
        loading: true,
        formInline: {
          orgId: ''
        },
        sendId: {
          pickupId: '',
          shipId: '',
          pickupFee: ''
        },
        searchTable: {
          'pageNum': 1,
          'pageSize': 100
        },
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
          return this.formInline.orgId
        }
      }
    },
    watch: {
      dotInfo(newVal) {
      },
      popVisible(newVal) {
        this.infoFetch()
      },
      orgId(newVal){

      }
    },
    mounted() {
      if (this.popVisible) {
      }
    },
    methods: {
      infoFetch() {
        this.loading = true
        return getIntnteSMainInfoList(this.searchTable).then(data => {
          this.usersArr = data.list
          this.loading = false
        }).catch(err => {
          this.$message.error('错误：' + (err.text || err.errInfo || err.data || JSON.stringify(err)))
          this.loading = false
        })
      },
      changeFright(index, prop, newVal) {
        this.usersArr[index][prop] = Number(newVal)
        const newfreght = this.usersArr[index].price
        if (newfreght === 0) {
          this.usersArr[index].price = newfreght
          this.$notify({
            title: '提示',
            message: '车费不能为0',
            type: 'warning'
          })
        } else if (newfreght < 0) {
          this.usersArr[index].price = newfreght
          this.$notify({
            title: '提示',
            message: '车费不能小于0,默认为初始值',
            type: 'warning'
          })
        } else {
          this.$refs.multipleTable.toggleRowSelection(this.usersArr[index], true)
          return this.usersArr[index].price
        }
      },
      search(item) {
        return !item.pickupBatchNumber
      },
      closeMe(done) {
        this.reset()
        this.$emit('update:popVisible', false)
        if (typeof done === 'function') {
          done()
        }
      },
      reset() {
        this.usersArr = []
        this.formInline.orgId = ""
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //跳到动画
            let data = this.usersArr.filter(el => {
              return el.selectdCheck === false
            })
            console.log()
            this.$router.push(
              {
                path: '/operation/order/loadIntelligent/components/intelligentImg',
                query: {
                  tab: '智能配载',
                  orgId: this.formInline.orgId,
                  sendData: JSON.stringify(data)
                }
              },
            )
            // this.$router.push(
            //   {
            //     path: '/operation/order/loadIntelligent/index',
            //     query: {
            //       tab: '智能配载',
            //       orgId: this.formInline.orgId,
            //       // name:
            //       sendData: this.usersArr.filter(el => {
            //         return el.selectdCheck === false
            //       })
            //     }
            //   },
            // )
            this.closeMe()
          } else {
            return false
          }
        })
      },
      clickDetails(row, event, column) {
        this.$refs.multipleTable.toggleRowSelection(row)
      },
      getSelection(selection) {
        // 1.全部置为不可编辑状态
        this.usersArr.forEach(el => {
          el.selectdCheck = true
        })

        // 2.选中的改为可编辑状态
        if (selection) {
          this.selected = selection
          this.selected.forEach(el => {
            el.selectdCheck = false

          })
        } else {
          // 3.剩下的为不可编辑状态
        }

      }
    }
  }
</script>

<style lang="scss">


  .lntelligent-maintain .pickpopDepMain {
    top: 12%;
    bottom: auto;
    .el-dialog {
      min-width: 550px;
      max-width: 550px;
      border-radius: 8px;
      .el-dialog__header {
        border-bottom: 1px solid #ccc;

        /*text-align: center;*/
        .el-dialog__title {
          color: rgb(100, 186, 245);
        }

      }
      .el-dialog__body {
        padding: 20px 35px;
        border-bottom: 1px solid rgb(100, 186, 245);
        .depmain-div {
          .order_bottom {
            .el-form-item.is-required {
              width: 100%;
              .el-select.select-tree.orgClass {
                width: 185%;
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
