<template>
  <div class="lntelligentPset-maintain">

    <el-dialog icon="el-icon-edit-outline" :title="popTitle" :isShow="popVisible"  class='pickpopDepMain' v-loading="loading" :close-on-click-modal="false" :before-close="closeMe" :visible.sync="isShow">
      <div class="depmain-div">
       <!--<div class="checklistClass">-->
         <!--<el-checkbox-group v-model="checkList">-->
           <!--<ul>-->
             <!--<li><el-checkbox label="大件优先"></el-checkbox></li>-->
             <!--<li><el-checkbox label="急件优先"></el-checkbox></li>-->
             <!--<li><el-checkbox label="库龄升序优先"></el-checkbox></li>-->
           <!--</ul>-->
           <!--<ul>-->
             <!--<li><el-checkbox label="库龄降序优先" ></el-checkbox></li>-->
             <!--<li><el-checkbox label="件数单价高优先" ></el-checkbox></li>-->
             <!--<li><el-checkbox label="体积单价高优先" ></el-checkbox></li>-->
           <!--</ul>-->
           <!--<ul>-->
             <!--<li><el-checkbox label="重量单价高优先" ></el-checkbox></li>-->
           <!--</ul>-->
         <!--</el-checkbox-group>-->
       <!--</div>-->

        <div>
          <el-tabs type="border-card">
            <el-tab-pane>
              <span slot="label"> 系统车型</span>
              <el-table
                ref="multipleTable"
                :data="usersArr"
                stripe
                border
                @row-click="clickDetails"
                @selection-change="getSelection"
                height="200"
                tooltip-effect="dark"

                style="width: 490px"
                class="tableIntelligent"
              >
                <el-table-column
                  fixed

                  type="selection"
                  width="60">
                </el-table-column>
                <el-table-column
                  fixed

                  prop="shipSn"
                  label="车型"
                  width="80">
                </el-table-column>
                <el-table-column
                  fixed

                  prop="shipGoodsSn"
                  width="90"
                  label="承载重">
                </el-table-column>
                <el-table-column
                  fixed

                  prop="pickupFee"
                  width="90"
                  label="承载方">
                </el-table-column>
                <el-table-column
                  fixed
                  prop="pickupFee"
                  width="135"
                  label="车费">
                  <template slot-scope="scope">
                    <el-input v-model.number="scope.row.num"
                              :size="btnsize" v-number-only:point
                              @change="(val)=>changeFright(scope.$index, scope.prop, val)"
                              :disabled="selectdCheck"></el-input>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="自定义车型">
              <div class="tableIntelligentPSet">
                <el-table
                  ref="multipleTable"
                  :data="usersArr"
                  stripe
                  border
                  @row-click="clickDetails"
                  @selection-change="getSelection"
                  height="200"
                  tooltip-effect="dark"

                  style="width: 490px"

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
                      <el-input v-model.number="scope.row.price"
                                :size="btnsize" v-number-only:point
                                @change="(val)=>changeFright(scope.$index, scope.prop, val)"
                                :disabled="scope.row['selectdCheck']" :maxlength="3" @click.stop.prevent.native></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column
                    fixed
                    prop="weight"
                    width="90"
                    label="承载重">
                    <template slot-scope="scope">
                      <el-input v-model.number="scope.row.price"
                                :size="btnsize" v-number-only:point
                                @change="(val)=>changeFright(scope.$index, scope.prop, val)"
                                :disabled="scope.row['selectdCheck']" :maxlength="3" @click.stop.prevent.native></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column
                    fixed
                    prop="vol"
                    width="90"
                    label="承载方">
                    <template slot-scope="scope">
                      <el-input v-model.number="scope.row.price"
                                :size="btnsize" v-number-only:point
                                @change="(val)=>changeFright(scope.$index, scope.prop, val)"
                                :disabled="scope.row['selectdCheck']" :maxlength="3" @click.stop.prevent.native></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column
                    fixed
                    prop="price"
                    width="125"
                    label="车费">
                    <template slot-scope="scope">
                      <el-input v-model.number="scope.row.price"
                                :size="btnsize" v-number-only:point
                                @change="(val)=>changeFright(scope.$index, scope.prop, val)"
                                :disabled="scope.row['selectdCheck']" :maxlength="3" @click.stop.prevent.native></el-input>
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
      createrId: [Number, String]
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
        selectdCheck: true,
        checkList: ['选中且禁用','复选框 A'],
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
      dotInfo(newVal) {
        // this.infoData(this.dotInfo)
      },
      popVisible(newVal) {
        // this.fetchData()
      }
    },
    mounted() {
      this.formInline.orgId = this.otherinfo.orgid
      if (this.popVisible) {
        this.formInline.orgId = this.otherinfo.orgid
        // alert(this.formInline.orgId)
      }
    },
    methods: {
      changeFright(index, prop, newVal) {
        this.usersArr[index][prop] = Number(newVal)
        const newfreght = this.usersArr[index].num
        if (newfreght === 0) {
          this.usersArr[index].num = newfreght
          this.$notify({
            title: '提示',
            message: '车费不能为0',
            type: 'warning'
          })
        } else if (newfreght < 0) {
          this.$notify({
            title: '提示',
            message: '车费不能小于0,默认为初始值',
            type: 'warning'
          })
        } else {
          this.$refs.multipleTable.toggleRowSelection(this.usersArr[index], true)
          return this.usersArr[index].num
        }
      },
      search(item) {
        return !item.pickupBatchNumber
      },
      // fetchFindByShipSnOrGoodSn() {
      //   this.loading = true
      //   return getFindShipByid(this.dotInfo.id).then(data => {
      //     this.usersArr = data
      //     this.loading = false
      //   }).catch((err)=>{
      //     this.loading = false
      //     this.$message.error(err.errorInfo || err.text || '未知错误，请重试~')
      //   })
      // },
      fetchData() {
        // this.fetchFindByShipSnOrGoodSn()
      },
      getShipSn(order) {
        if (order) {
          this.formInline.shipGoodsSn = order.shipGoodsSn
          this.sendId.shipId = order.id
        }
      },
      getShipGoodsSn(order) {
        if (order) {
          this.formInline.shipSn = order.shipSn
          this.sendId.shipId = order.id
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
        // this.formInline = this.setObject(this.formInline)
        this.formInline = Object.assign({}, this.formInline)

        this.formInline.shipSn = ''
        this.formInline.shipGoodsSn = ''
        this.formInline.pickupFee = ''
      },
      setObject(obj1, obj2) {
        for (var i in obj1) {
          obj1[i] = obj2 ? obj2[i] : ''
        }
        return obj1
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.$router)

            this.$router.push(
              {
                path: '/operation/order/loadIntelligent/components/intelligentImg',
                query: {
                  tab:'智能配载',
                  sendDate: this.usersArr
                }
              },
            )
            this.closeMe()




            // this.$router.push(
            //   {
            //     path: '/operation/order/loadIntelligent/index',
            //     query: {
            //       sendDate: this.usersArr
            //     }
            //   },
            // )

            // this.loading = true
            // this.sendId.pickupFee = this.formInline.pickupFee
            // const pickupFee = this.sendId.pickupFee || ''
            // const promiseObj = putRelevancyShip(this.sendId.pickupId, this.sendId.shipId, pickupFee)
            //
            // promiseObj.then(res => {
            //   this.loading = false
            //   this.$message({
            //     message: '添加成功~',
            //     type: 'success'
            //   })
            //   delete this.sendId.shipId
            //   this.fetchData()
            //   this.reset()
            //   this.$emit('success')
            // }).catch(err => {
            //   this.$message.error('错误：' + (err.text || err.errInfo || err.data || JSON.stringify(err)))
            //   this.loading = false
            // })
          } else {
            return false
          }
        })
      },
      removeList() {
        // if (!this.selected.length) {
        //   this.$message({
        //     message: '请选择要操作的列表项~',
        //     type: 'warning'
        //   })
        //   return false
        // }else {
        //   if (this.selected.length > 1) {
        //     this.$message({
        //       message: '每次只能选择单条数据~',
        //       type: 'warning'
        //     })
        //     return false
        //   }        else {
        //     const promiseObj = putRremoveShip(this.selected[0].id, this.selected[0].shipId)
        //     promiseObj.then(res => {
        //       this.loading = false
        //       this.$message.success("保存成功")
        //       this.fetchData()
        //       this.$emit('success')
        //   }).catch(err => {
        //     this.$message.error('错误：' + (err.text || err.errInfo || err.data || JSON.stringify(err)))
        //       this.loading = false
        //     })
        //   }
        // }
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


  .lntelligentPset-maintain .pickpopDepMain {
    top: 12%;
    bottom: auto;
    .el-dialog{
      min-width: 550px;
      max-width: 550px;
      border-radius: 8px;
      .el-dialog__header{
        border-bottom: 1px solid #ccc;

        /*text-align: center;*/
        .el-dialog__title{
          color: rgb(100,186,245);
        }

      }
      .el-tabs__content{
        .el-table{
          .el-table__fixed-body-wrapper{
            .el-table__row{
              td:not(:first-of-type){
                padding: 0 0;
                .cell{
                  padding-left: 0;
                  padding-right: 0;
                  .el-input.el-input--mini{
                    /*width: 114%;*/
                    .el-input__inner{
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
        border-bottom: 1px solid rgb(100,186,245);
        .depmain-div{
         .checklistClass{
           padding-bottom: 10px;
           ul:first-of-type{
             li{
               float: left;
               padding:0 85px 10px 0;
             }
             li:last-of-type{
               padding-left: 15px;
               padding-right: 0;
             }
           }
           ul:nth-of-type(2){
             li{
               float: left;
               padding:0 58px 10px 0;
             }
             li:last-of-type{
               padding-left: -10px;
               padding-right: 0;
             }
           }
         }

          p{
            padding-top: 20px;
            color: rgb(254,52,52);
          }

        }
      }
      .el-dialog__footer{
        text-align: right;
      }
    }

  }

</style>

