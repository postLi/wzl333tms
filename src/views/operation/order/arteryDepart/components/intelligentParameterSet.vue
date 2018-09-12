<template>
  <div class="lntelligentPset-maintain">

    <el-dialog icon="el-icon-edit-outline" :title="popTitle" :isShow="popVisible" class='pickpopDepMain'
               v-loading="loading" :close-on-click-modal="false" :before-close="closeMe" :visible.sync="isShow">
      <div class="depmain-div">
        <div class="carDiv" v-if=isSecond>
          <el-button type="primary" size="mini" icon="el-icon-plus" @click="doAction('addCar')"></el-button>
          <el-button type="danger" size="mini" icon="el-icon-minus" @click="doAction('subCar')"></el-button>
        </div>
        <div class="tabsDiv">
          <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">

            <el-tab-pane name="first">
              <span slot="label"> 系统车型</span>
              <el-table
                ref="multipleTable1"
                :data="systemList"
                stripe
                border
                @row-click="clickDetail"
                @selection-change="getSelectionSys"
                height="200"
                tooltip-effect="dark"
                style="width: 450px"
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
                  width="80">
                </el-table-column>
                <el-table-column
                  fixed

                  prop="weight"
                  width="90"
                  label="承载重">
                </el-table-column>
                <el-table-column
                  fixed

                  prop="vol"
                  width="90"
                  label="承载方">
                </el-table-column>
                <el-table-column
                  fixed
                  prop="price"
                  width="120"
                  label="车费">
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="自定义车型" name="second">
              <div class="tableIntelligentPSet">
                <el-table
                  ref="multipleTable"
                  :data="definedList"
                  stripe
                  border
                  @row-click="clickDetails"
                  @selection-change="getSelection"
                  height="200"
                  tooltip-effect="dark"
                  style="width: 450px"
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
                    <template slot-scope="scope">
                      <el-input v-model.number="scope.row.name"
                                :size="btnsize" v-number-only:point
                                @change="(val)=>changeFright(scope.$index, scope.prop, val)"
                                :disabled="scope.row['selectdCheck']" :maxlength="3"
                                @click.stop.prevent.native></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column
                    fixed
                    prop="weight"
                    width="90"
                    label="承载重">
                    <template slot-scope="scope">
                      <el-input v-model.number="scope.row.weight"
                                :size="btnsize" v-number-only:point
                                @change="(val)=>changeFright(scope.$index, scope.prop, val)"
                                :disabled="scope.row['selectdCheck']" :maxlength="3"
                                @click.stop.prevent.native></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column
                    fixed
                    prop="vol"
                    width="90"
                    label="承载方">
                    <template slot-scope="scope">
                      <el-input v-model.number="scope.row.vol"
                                :size="btnsize" v-number-only:point
                                @change="(val)=>changeFright(scope.$index, scope.prop, val)"
                                :disabled="scope.row['selectdCheck']" :maxlength="3"
                                @click.stop.prevent.native></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column
                    fixed
                    prop="price"
                    width="110"
                    label="车费">
                    <template slot-scope="scope">
                      <el-input v-model.number="scope.row.price"
                                :size="btnsize" v-number-only:point
                                @change="(val)=>changeFright(scope.$index, scope.prop, val)"
                                :disabled="scope.row['selectdCheck']" :maxlength="3"
                                @click.stop.prevent.native></el-input>
                    </template>
                  </el-table-column>
                </el-table>
              </div>

            </el-tab-pane>
          </el-tabs>
        </div>

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
  import {REGEX} from '@/utils/validate'
  import PopFrame from '@/components/PopFrame/index'
  import querySelect from '@/components/querySelect/index'
  import {getIntnteCarInfo, postPzcarinfotms, putPzcarinfotms, deletePzcarinfotms} from '@/api/operation/arteryDepart'
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
      createrId: [Number, String]
    },
    data() {
      return {
        activeName: "first",
        isSecond: false,
        selectdCheck: true,
        btnsize: 'mini',
        selected: [],
        selectedSys: [],
        rules: {},
        formLabelWidth: '100',
        usersArr: [
          {
            num: 10,
            date: '车型'
          },
          {
            num: 10,
            date: '车型'
          },
          {
            num: 10,
            date: '车型'
          },
          {
            num: 10,
            date: '车型'
          }
        ],
        checked1: true,
        popTitle: '参数设置',
        loading: false,
        formInline: {},
        infoGetSystemList: {
          sign: 1,
          orgid: ''
        },
        infoGetDefinedList: {
          sign: 2,
          orgid: ''
        },
        systemList: [],
        definedList: []
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
      dotInfo(newVal) {
        // this.infoData(this.dotInfo)
      },
      popVisible(newVal) {
        this.infoGetSystemList.orgid = this.otherinfo.orgid
        this.infoGetDefinedList.orgid = this.otherinfo.orgid
        this.fetchGetIntnteCarInfo()
        this.fetchGetIntnteCarDefinedInfo()

      }
    },
    mounted() {
      if (this.popVisible) {

      }
    },
    methods: {
      doAction(type) {
        if (this.selected.length === 0) {
          this.$message({
            message: '请选择要操作的项~',
            type: 'warning'
          })
          return false
        } else {
          switch (type) {
            case 'addCar':
              if (this.definedList.length < 5) {
                this.definedList = this.selected
                let data = {}
                let sendData1 = {}
                data = this.definedList.filter(el => {
                  return el.selectdCheck === false
                }).map(el => {
                  sendData1 = {
                    name: el.name,
                    vol: el.vol,
                    weight: el.weight
                  }
                })
                const promiseObj = postPzcarinfotms(sendData1)
                promiseObj.then(res => {
                  this.loading = false
                  this.$message({
                    message: '添加成功~',
                    type: 'success'
                  })
                  this.fetchData()
                })
              }else{
                this.$message({
                  message: '自定义车型不能超过5种~',
                  type: 'success'
                })
                return false
              }
              break;
            case 'subCar':
              this.definedList = this.selected
              let loadId = ''
              loadId = this.definedList.filter(el => {
                return el.selectdCheck === true
              }).map(el => {
                return el.cid
              })
              loadId = loadId.join(',')
              deletePzcarinfotms(loadId).then(res => {
                this.loading = false
                this.$message({
                  message: '删除成功~',
                  type: 'success'
                })
                this.fetchData()
              })
              break;
          }
        }

      },
      fetchGetIntnteCarInfo() {
        this.loading = true
        return getIntnteCarInfo(this.infoGetSystemList.orgid, this.infoGetSystemList.sign).then(data => {

          this.systemList = data
          this.loading = false
        })
      },
      fetchGetIntnteCarDefinedInfo() {
        this.loading = true
        return getIntnteCarInfo(this.infoGetDefinedList.orgid, this.infoGetDefinedList.sign).then(data => {
          this.definedList = data
          this.loading = false
        })
      },
      changeFright(index, prop, newVal) {
        this.definedList[index][prop] = Number(newVal)
        const newName = this.definedList[index].name
        const newWeight = this.definedList[index].weight
        const newVol = this.definedList[index].vol
        const newPrice = this.definedList[index].price
        if (newName === 0 || newWeight === 0 || newVol === 0 || newPrice === 0) {
          this.definedList[index].num = newName
          this.definedList[index].weight = newWeight
          this.definedList[index].vol = newVol
          this.definedList[index].price = newPrice
          this.$notify({
            title: '提示',
            message: '车费不能为0',
            type: 'warning'
          })
        } else if (newName < 0) {
          this.$notify({
            title: '提示',
            message: '车费不能小于0,默认为初始值',
            type: 'warning'
          })
        } else {
          this.definedList[index].name
          this.definedList[index].weight
          this.definedList[index].vol
          this.definedList[index].price
        }
      },
      fetchData() {
        this.fetchGetIntnteCarDefinedInfo()
      },
      closeMe(done) {
        this.reset()
        this.$emit('update:popVisible', false)
        if (typeof done === 'function') {
          done()
        }
      },
      reset() {
        // this.formInline = this.setObject(this.formInline)
        this.formInline = Object.assign({}, this.formInline)

        this.formInline.shipSn = ''
        this.formInline.shipGoodsSn = ''
        this.formInline.pickupFee = ''
      },
      submitForm() {
        if (!this.isSecond) {
          if (!this.selectedSys.length) {
            this.$message({
              message: '请选择要操作的项~',
              type: 'warning'
            })
            return false
          } else {
            this.selectedSys
          }
        } else {

        }
      },
      clickDetail(row, event, column) {
        this.$refs.multipleTable1.toggleRowSelection(row)
      },
      clickDetails(row, event, column) {
        this.$refs.multipleTable.toggleRowSelection(row)
      },
      getSelectionSys(selection) {
        this.selectedSys = selection
      },
      getSelection(selection) {
        this.definedList.forEach(el => {
          el.selectdCheck = true
        })
        if (selection) {
          this.selected = selection
          this.selected.forEach(el => {
            el.selectdCheck = false

          })
        }

      },
      handleClick(tab, event) {
        if (this.activeName === 'second') {
          this.isSecond = true
        } else {
          this.isSecond = false
        }
      }
    }
  }
</script>

<style lang="scss">


  .lntelligentPset-maintain .pickpopDepMain {
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
      .el-tabs__content {
        .el-table {
          .el-table__fixed-body-wrapper {
            .el-table__row {
              td:not(:first-of-type) {
                padding: 0 0;
                .cell {
                  padding-left: 0;
                  padding-right: 0;
                  .el-input.el-input--mini {
                    /*width: 114%;*/
                    .el-input__inner {
                      border-radius: 0;
                    }
                  }
                }
              }

            }

          }
        }
      }
      .el-dialog__body {
        padding: 20px 35px;
        border-bottom: 1px solid rgb(100, 186, 245);
        .depmain-div {
          .carDiv {
            position: absolute;
            left: 350px;
            top: 80px;
            z-index: 1;
          }
          .tabsDiv {
            position: relative;
          }
          .checklistClass {
            padding-bottom: 10px;
            ul:first-of-type {
              li {
                float: left;
                padding: 0 85px 10px 0;
              }
              li:last-of-type {
                padding-left: 15px;
                padding-right: 0;
              }
            }
            ul:nth-of-type(2) {
              li {
                float: left;
                padding: 0 58px 10px 0;
              }
              li:last-of-type {
                padding-left: -10px;
                padding-right: 0;
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

