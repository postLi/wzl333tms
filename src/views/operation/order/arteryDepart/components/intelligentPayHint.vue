<template>
  <div class="lntelligentPayHint-maintain">

    <el-dialog icon="el-icon-edit-outline" :title="popTitle" :isShow="popVisible"  class='pickpopDepMain' v-loading="loading" :close-on-click-modal="false" :before-close="closeMe" :visible.sync="isShow">


      <!--<template class='pickRelationPop-content' slot="content">-->
      <!--isDepMain-->
      <div class="depmain-div">
        <div class="hitClass">
          <span>你的方案版本是免费版，最多可创建一个方案,</span>
          <span>升级方案解除此限制</span>
        </div>

        <p>注：请填写车费，保证单车毛利的准确性。</p>
      </div>

      <!--</template>-->
      <!--<div slot="footer" class="dialog-footer-frame">-->
      <div slot="footer" class="dialog-footer">

        <el-button type="primary" @click="submitForm('formName')">立即升级</el-button>
        <!--<el-button @click="closeMe">取 消</el-button>-->

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
          }
        ],
        checked1: true,
        popTitle: '付费功能提示',
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
      //     this._handlerCatchMsg(err)
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
            //   this._handlerCatchMsg(err)
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
        //     this._handlerCatchMsg(err)
        //       this.loading = false
        //     })
        //   }
        // }
      },
      clickDetails(row, event, column) {
        this.$refs.multipleTable.toggleRowSelection(row)
      },
      getSelection(selection) {

        if (selection) {
          this.selected = selection
          this.selectdCheck = false
          console.log(this.selectdCheck, '选中')
        } else {
          this.selectdCheck = true
          console.log(this.selectdCheck, '未选中')
        }

      }
    }
  }
</script>

<style lang="scss">
  .lntelligentPayHint-maintain .pickpopDepMain {
    top: 12%;
    bottom: auto;
    .el-dialog{
      min-width: 390px;
      max-width: 390px;
      border-radius: 8px;
      .el-dialog__header{
        border-bottom: 1px solid #ccc;

        /*text-align: center;*/
        .el-dialog__title{
          color: rgb(100,186,245);
        }

      }
      .el-dialog__body {
        padding: 20px 35px;
        /*border-bottom: 1px solid rgb(100,186,245);*/
        .depmain-div{
          .hitClass{

            padding: 40px 0 80px 0;
            color: rgb(69,69,69);
            span{
              text-align: center;
              text-indent: 2px;
            }
            span:last-of-type{
              margin-top: 10px;
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

