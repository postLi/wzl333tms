<template>
  <pop-right :title="popTitle" :isShow="popVisible" @close="closeMe" class="addPickUpPop" v-loading="loading">
    <template class="addPickUpPop-content" slot="content">
      <el-form :model="form" :rules="rules" ref="ruleForm" label-width="90px" :show-message="checkShowMessage"
               :inline="true" label-position="right" size="mini" class="pickup_lrl" :key="valkey">
        <div class="info_date" style="margin-top: 10px;">提货信息</div>
        <div class="pickUp-top">
          <el-form-item label="提货批次" prop="customerUnit">
            <el-input v-model="pickupBatchNumber" auto-complete="off" disabled></el-input>
          </el-form-item>
          <el-form-item label="发货人" prop="" class="senderName_lrl">
            <querySelect search="customerName" type="sender" valuekey="customerName"
                         v-model="form.tmsCustomer.customerName" @change="setSender" :disabled="isDbclick"/>
          </el-form-item>
          <el-form-item label="手机号" prop="tmsCustomer.customerMobile" class="senderName_lrl">
            <querySelect search="customerMobile" type="sender" valuekey="customerMobile"
                         v-model="form.tmsCustomer.customerMobile" @change="setSender" :disabled="isDbclick"/>
          </el-form-item>
          <el-form-item label="提货地址" prop="tmsCustomer.detailedAddress" class="senderAddr_lrl">

            <querySelect search="detailedAddress" type="sender" valuekey="detailedAddress"
                         v-model="form.tmsCustomer.detailedAddress" @change="setSender" :disabled="isDbclick"/>
          </el-form-item>
        </div>
        <div class="info_date">货物信息</div>
        <div class="pickUp-order">
          <el-form-item label="货品名" prop="tmsOrderPickup.pickupName">
            <querySelect search="value" valuekey="value" :maxlength="8" type="cargoName" :remote="true"
                         v-model="form.tmsOrderPickup.pickupName" :disabled="isDbclick"/>

          </el-form-item>
          <el-form-item label="件数" prop="tmsOrderPickup.pickupAmount">
            <el-input v-model="form.tmsOrderPickup.pickupAmount" v-numberOnly auto-complete="off" :disabled="isDbclick"
                      :maxlength="8"></el-input>
          </el-form-item>
          <el-form-item label="体积" prop="">
            <input class="nativeinput" :value="form.tmsOrderPickup.pickupVolume" @change="(e)=>{setInputVal(e.target.value, 'pickupVolume')}" :maxlength="8" auto-complete="off" clearable
                            :disabled="isDbclick" v-number-only:point type="text">

          </el-form-item>
          <el-form-item label="重量" prop="tmsOrderPickup.pickupWeight">
            <input class="nativeinput" :value="form.tmsOrderPickup.pickupWeight" @change="(e)=>{setInputVal(e.target.value, 'pickupWeight')}" :maxlength="8" auto-complete="off" clearable
                            :disabled="isDbclick" v-number-only:point type="text">

          </el-form-item>
          <el-form-item label="运费" prop="tmsOrderPickup.carriage">
            <input class="nativeinput" :value="form.tmsOrderPickup.carriage" @change="(e)=>{setInputVal(e.target.value, 'carriage')}" :maxlength="8" auto-complete="off" clearable
                            :disabled="isDbclick" v-number-only:point type="text">

          </el-form-item>
          <el-form-item label="付款方式">
            <SelectType v-model="form.tmsOrderPickup.payMethod" type="ship_pay_way" class="pickup-way"
                        :disabled="isDbclick"/>
          </el-form-item>
          <el-form-item label="到达城市" class="order_toCityCode">
            <querySelect @change="selectToCity" show="select" search="longAddr" type="city"
                         v-model="form.tmsOrderPickup.toCityName" :remote="true" :disabled="isDbclick"/>
          </el-form-item>
          <el-form-item label="备注" prop="tmsOrderPickup.remark" class="order_remark">
            <el-input v-model="form.tmsOrderPickup.remark" type="textarea" auto-complete="off" :disabled="isDbclick"
                      :maxlength="300"></el-input>
          </el-form-item>
        </div>
        <div class="info_date">其他信息</div>
        <div class="pickUp-bottom">
          <el-form-item label="车费" prop="tmsOrderPickup.truckFee">
            <input class="nativeinput" :value="form.tmsOrderPickup.truckFee" @change="(e)=>{setInputVal(e.target.value, 'truckFee')}" :maxlength="8" auto-complete="off" clearable
                            :disabled="isDbclick" v-number-only:point type="text">
          </el-form-item>
          <el-form-item label="代收费用" prop="">
            <input class="nativeinput" :value="form.tmsOrderPickup.collectionFee" @change="(e)=>{setInputVal(e.target.value, 'collectionFee')}" :maxlength="8" auto-complete="off" clearable
                            :disabled="isDbclick" v-number-only:point type="text">
          </el-form-item>
          <el-form-item label="车牌号" prop="tmsTruck.truckIdNumber">
            <querySelect search="truckIdNumber" valuekey="truckIdNumber" type="trunk" @change="getTrunkName"
                         v-model="form.tmsTruck.truckIdNumber" :disabled="isDbclick" :maxlength="8"/>
          </el-form-item>
          <el-form-item label="司机姓名" prop="tmsDriver.driverName">
            <querySelect search="driverName" valuekey="driverName" type="driver" @change="getdriverName" :remote="true"
                         v-model="form.tmsDriver.driverName" :disabled="isDbclick" :maxlength="8"/>
          </el-form-item>
          <el-form-item label="车辆类型">
            <SelectType v-model="form.tmsTruck.truckType" type="truck_type" placeholder="请选择" class="pickup-way"
                        :disabled="isDbclick"/>
          </el-form-item>
          <el-form-item label="司机手机" prop="tmsDriver.driverMobile">
            <el-input v-model="form.tmsDriver.driverMobile" auto-complete="off" :disabled="isDbclick"></el-input>
          </el-form-item>
          <el-form-item label="车辆单位" prop="tmsTruck.truckUnit">
            <el-input v-model="form.tmsTruck.truckUnit" auto-complete="off" :disabled="isDbclick"
                      :maxlength="18"></el-input>
          </el-form-item>
          <el-form-item label="提货状态" prop="tmsOrderPickup.pickupStatus">
            <SelectType :filterfn="filterfn" v-model="form.tmsOrderPickup.pickupStatus" type="pickup_status"
                        placeholder="请选择" class="pickup-way" :disabled="isDbclick"/>
          </el-form-item>
          <el-form-item label="出车时间" class="customerunit">
            <el-date-picker
              v-model="form.tmsOrderPickup.outTime"
              align="right"
              type="date"
              placeholder="选择日期"
              value-format="timestamp"
              :picker-options="pickOption"
              :disabled="isDbclick"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="到达时间" class="arrive-time" prop="tmsOrderPickup.arriveTime">
            <el-date-picker
              v-model="form.tmsOrderPickup.arriveTime"
              align="right"
              type="date"
              :picker-options="pickOption2"
              placeholder="选择日期"
              value-format="timestamp"
              :disabled="isDbclick"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item class='checked'>
            <el-checkbox v-model="checked" disabled>发送短信给司机</el-checkbox>
          </el-form-item>

        </div>

      </el-form>
    </template>
    <div slot="footer" class="dialog-footer" v-if="isDbclick">
      <el-button @click="closeMe">关 闭</el-button>
    </div>
    <div slot="footer" class="dialog-footer" v-else>
      <el-button type="primary" @click="submitForm('ruleForm')">保 存</el-button>
      <el-button @click="closeMe">取 消</el-button>
    </div>
  </pop-right>


</template>
<script>
  import { REGEX } from '@/utils/validate'
  import { fetchGetPickUp, putUpdatePickup, postAddPickup } from '@/api/operation/pickup'
  import popRight from '@/components/PopRight/index'
  import Upload from '@/components/Upload/singleImage'
  import SelectType from '@/components/selectType/index'
  import SelectCity from '@/components/selectCity/index'
  import querySelect from '@/components/querySelect/index'
  import { mapGetters } from 'vuex'
  import { objectMerge2 } from '@/utils/index'

  export default {
    components: {
      popRight,
      Upload,
      querySelect,
      SelectType,
      SelectCity
    },
    props: {
      popVisible: {
        type: Boolean,
        default: false
      },
      orgid: {
        required: true
      },
      // isDbclick
      isModify: {
        type: Boolean,
        default: false
      },
      isDbclick: {
        type: Boolean,
        default: false
      },
      info: {
        type: Object,
        default: () => {
        }
      },
      issender: {
        type: Boolean,
        dafault: false
      }
    },
    computed: {
      ...mapGetters([
        'otherinfo'
      ])

    },
    data() {
      const _this = this
      const validatePickupNum = function(rule, value, callback) {
        if (REGEX.ONLY_NUMBER.test(value) || !value) {
          callback()
        } else {
          callback(new Error('只能输入数字'))
        }
      }
      const validatetruckFee = function(rule, value, callback) {
        if (REGEX.Number_point.test(value) || !value) {
          callback()
        } else {
          callback(new Error('只能输入数字'))
        }
      }
      const validateMobile = (rule, value, callback) => {
        if (REGEX.MOBILE.test(value) || !value) {
          callback()
        } else if (this.isDbclick) {
          callback()
        } else {
          callback(new Error('请输入正确的手机号码~'))
        }
      }

      return {
        rules: {
          'tmsOrderPickup.pickupName': [
            { required: true, validator: this.validateIsEmpty('货品名不能为空') }
          ],
          'tmsOrderPickup.pickupAmount': [
            { validator: validatePickupNum, trigger: 'blur' },
            { required: true, validator: this.validateIsEmpty('件数不能为空') }
          ],
          'tmsOrderPickup.pickupVolume': [
            { validator: validatePickupNum, trigger: 'blur' }
          ],
          'tmsOrderPickup.pickupWeight': [
            { validator: validatePickupNum, trigger: 'blur' }
          ],
          'tmsOrderPickup.carriage': [
            { validator: validatetruckFee, mtrigger: 'blur' }
            // { max: 8, message: '运费最多可输入8个字符', trigger: 'blur' }
          ],
          'tmsOrderPickup.remark': [
            { max: 300, message: '备注最多可输入300个字符', trigger: 'blur' }
          ],
          'tmsOrderPickup.truckFee': [
            { validator: validatetruckFee, trigger: 'blur' }
            // { validator: validatetruckFee, trigger: 'blur' }
          ],
          'tmsOrderPickup.collectionFee': [
            { validator: validatePickupNum, trigger: 'blur' }
            // { max: 8, message: '代收费用最多可输入8个字符', trigger: 'blur' }
          ],
          'tmsTruck.truckIdNumber': [
            { required: true, validator: this.validateIsEmpty('车牌号不能为空') }
            // { max: 8, message: '车牌号最多可输入8个字符' }
          ],
          'tmsDriver.driverName': [
            { required: true, validator: this.validateIsEmpty('司机姓名不能为空') }
          ],
          'tmsDriver.driverMobile': [
            { validator: validateMobile, trigger: 'change' }
          ],
          'tmsTruck.truckUnit': [
            { max: 18, message: '车辆单位最多可输入18个字符', trigger: 'blur' }
          ],
          'tmsOrderPickup.arriveTime': [
            { required: true, validator: this.validateIsEmpty('要求到达时间不能为空') }
          ],
          'tmsCustomer.customerMobile': [
            { required: true, validator: this.validateIsEmpty('发货人手机号不能为空') }
          ],
          'tmsCustomer.detailedAddress': [
            { required: true, validator: this.validateIsEmpty('提货地址不能为空') }
          ]
        },
        pickOption: {
          firstDayOfWeek: 1,
          disabledDate(time) {
            // 小于终止日
            return _this.form.tmsOrderPickup.arriveTime ? time.getTime() > _this.form.tmsOrderPickup.arriveTime : false
          }
        },
        pickOption2: {
          firstDayOfWeek: 1,
          disabledDate(time) {
            // 大于起始日
            return _this.form.tmsOrderPickup.outTime ? time.getTime() < _this.form.tmsOrderPickup.outTime : false
          }
        },
        form: {
          tmsCustomer: {
            customerName: '',
            customerMobile: '',
            detailedAddress: '',
            customerId: ''
          },
          tmsDriver: {
            driverName: '', // 司机姓名
            driverMobile: '', // 司机手机 /
            driverId: ''
            //  发送短信给司机
          },
          tmsTruck: {
            truckIdNumber: '', // 车牌号 /
            truckType: '', // 车辆类型
            truckUnit: '', // 车辆单位
            truckId: ''
          },
          tmsOrderPickup: {
            pickupBatchNumber: '', // 提货批次
            pickupName: '', // 货品名
            pickupAmount: '', // 件数
            pickupVolume: '', // 体积
            pickupWeight: '', // 重量
            carriage: '', // 运费
            payMethod: 76, // 付款方式
            toCityCode: '', // 到达城市
            toCityName: '', // 到达城市
            remark: '',
            truckFee: '', // 车费
            pickupStatus: 236, // 提货状态
            collectionFee: '', // 代收费用
            outTime: '', // 出车时间
            arriveTime: ''//
          }
        },
        valkey: '',
        checked: true,
        checkShowMessage: false,
        formLabelWidth: '80px',
        popTitle: '提货派车单',
        loading: false,
        inited: false,
        pickupBatchNumber: '',
// 用来在提交
        sender: {},
        // 验证
        isChecked: false,
        isCheckedShow: false
      }
    },
    mounted() {
      if (!this.inited) {
        this.inited = true
        this.initInfo()
      }
    },
    watch: {
      popVisible(newVal, oldVal) {
        if (!this.inited) {
          this.inited = true
          this.initInfo()
        }
      },
      info() {
        this.$refs['ruleForm'].resetFields()
        this.checkShowMessage = false
        if (this.isModify) {
          this.popTitle = '修改派车单'
          this.infoData(this.info)
        } else if (this.isDbclick) {
          this.popTitle = '查看派车单'
          this.infoData(this.info)
        } else {
          this.popTitle = '提货派车单'
          this.reset()
          this.fetchGetPickUp()
        }
      },
      isModify() {
        this.$refs['ruleForm'].resetFields()
        this.checkShowMessage = false
        if (this.isModify) {
          this.popTitle = '修改派车单'
          this.infoData(this.info)
        } else if (this.isDbclick) {
          this.popTitle = '查看派车单'
          this.infoData(this.info)
        } else {
          this.popTitle = '提货派车单'
          this.reset()
          this.fetchGetPickUp()
        }
      },
      isDbclick() {
        this.$refs['ruleForm'].resetFields()
        this.checkShowMessage = false
        if (this.isModify) {
          this.popTitle = '修改派车单'
          this.infoData(this.info)
        } else if (this.isDbclick) {
          this.popTitle = '查看派车单'
          this.infoData(this.info)
        } else {
          this.popTitle = '提货派车单'
          this.reset()
          this.fetchGetPickUp()
        }
      }
    },
    methods: {
      setInputVal(val, name) {
        this.$set(this.form.tmsOrderPickup, name, val)
      },
      watchInfo() {
        if (this.isModify) {
          this.popTitle = '修改派车单'
          this.infoData(this.info)
        } else if (this.isDbclick) {
          this.popTitle = '查看派车单'
          this.infoData(this.info)
        } else {
          this.popTitle = '提货派车单'
          this.newInfoData()
          this.fetchGetPickUp()
          this.valkey = Math.random()
        }
      },
      filterfn(el) {
        return el.id !== 235
      },

      infoData(item) {
        this.form.tmsOrderPickup.pickupName = item.pickupName
        this.form.tmsOrderPickup.pickupAmount = item.pickupAmount
        this.form.tmsOrderPickup.pickupWeight = item.pickupWeight
        this.form.tmsOrderPickup.pickupVolume = item.pickupVolume
        this.form.tmsOrderPickup.carriage = item.carriage
        this.form.tmsOrderPickup.collectionFee = item.collectionFee
        this.form.tmsOrderPickup.payMethod = item.payMethod
        this.form.tmsOrderPickup.pickupStatus = item.pickupStatus
        this.form.tmsOrderPickup.remark = item.remark
        this.form.tmsOrderPickup.arriveTime = +new Date(item.arriveTime)
        this.form.tmsOrderPickup.outTime = +new Date(item.outTime)
        this.form.tmsOrderPickup.toCityName = item.toCityName
        this.form.tmsOrderPickup.id = item.id
        this.form.tmsOrderPickup.truckFee = item.truckFee
      console.log('infoData', item)
        this.form.tmsTruck.truckIdNumber = item.truckIdNumber
        this.form.tmsTruck.truckType = item.truckType
        this.form.tmsTruck.truckUnit = item.truckUnit

        this.form.tmsDriver.driverName = item.driverName
        this.form.tmsDriver.driverMobile = item.driverMobile

        this.form.tmsCustomer.customerName = item.customerName
        this.form.tmsCustomer.customerMobile = item.customerMobile
        this.form.tmsCustomer.detailedAddress = item.detailedAddress

        this.pickupBatchNumber = item.pickupBatchNumber
        this.valkey = Math.random()
      },
      validateIsEmpty(msg = '不能为空！') {
        return (rule, value, callback) => {
          if (!value) {
            this.showMessage(msg)
            callback(new Error(msg))
          } else {
            callback()
          }
        }
      },

      showMessage(msg) {
        if (this.isChecked && !this.isCheckedShow) {
          this.isCheckedShow = true
        }
        if (this.isCheckedShow) {
          this.checkShowMessage = true
        } else {
          this.checkShowMessage = false
        }
      },
      setObject(obj1, obj2) {
        for (var i in obj1) {
          obj1[i] = obj2 ? obj2[i] : ''
        }
        return obj1
      },
      fetchGetPickUp() {
        this.loading = true
        return fetchGetPickUp().then(data => {
          this.pickupBatchNumber = data.data
          this.loading = false
        }).catch(err => {
          this._handlerCatchMsg(err)
        })
      },
      setSender(item, type) {
        type = type ? 'customRece' : 'tmsCustomer'
        if (item) {
          this.form[type].customerType = type === 'tmsCustomer' ? 1 : 2
          this.form[type].customerName = item.customerName
          this.form[type].customerMobile = item.customerMobile
          this.form[type].detailedAddress = item.detailedAddress
          this.form[type].customerId = item.customerId
        }
      },
      selectToCity(item, city) {
        if (item) {
          this.form.tmsOrderPickup.toCityCode = item.id
          this.form.tmsOrderPickup.toCityName = item.longAddr
        } else {
        }
      },
      getdriverName(item, city) {
        if (item) {
          if (this.form.tmsDriver.driverMobile) {
            this.form.tmsDriver.driverMobile = Object.assign(this.form.tmsDriver.driverMobile)
          } else {
            this.form.tmsDriver.driverName = item.driverName
            this.form.tmsDriver.driverMobile = item.driverMobile
            this.form.tmsDriver.driverId = item.id
          }
        }
      },
      getTrunkName(trunk) {
        if (trunk) {
          if (this.form.tmsDriver.driverName === '' || this.form.tmsDriver.driverMobile === '') {
            this.form.tmsDriver.driverName = trunk.driverName
            this.form.tmsDriver.driverMobile = trunk.dirverMobile
            this.form.tmsDriver.driverId = trunk.driverId
          } else {
            // this.valkey = Math.random()
            this.form.tmsDriver.driverName = Object.assign(this.form.tmsDriver.driverName)
            this.form.tmsDriver.driverMobile = Object.assign(this.form.tmsDriver.driverMobile)
          }
          this.form.tmsTruck.truckId = trunk.truckId
          this.form.tmsTruck.truckType = trunk.truckType
          this.form.tmsTruck.truckUnit = trunk.truckUnit
          this.form.tmsTruck.truckIdNumber = trunk.truckIdNumber
        }
      },
      initInfo() {
        this.loading = false
      },
      submitForm(formName) {
        this.isChecked = true
        this.isCheckedShow = true
        this.checkShowMessage = true
        //
        this.$refs[formName].validate((valid) => {
          this.isChecked = false
          this.isCheckedShow = false
          if (valid && !this.loading) {
            this.loading = true
            this.form.tmsOrderPickup.pickupBatchNumber = this.pickupBatchNumber

            let promiseObj
            // console.log(this.form.tmsTruck.truckIdNumber)
            const data = objectMerge2({}, this.form)
            // 判断操作，调用对应的函数
            this.loading = true
            if (this.isModify) {
              promiseObj = putUpdatePickup(data)
            } else {
              let changeSender = false
              for (const i in data.tmsCustomer) {
                if (this.sender[i] !== data.tmsCustomer[i]) {
                  changeSender = true
                }
              }
              if (changeSender) {
                data.tmsCustomer.customerId = ''
              } else {
                data.tmsCustomer.customerId = this.form.tmsCustomer.customerId
              }
              data.tmsOrderPickup.outTime = +new Date(this.form.tmsOrderPickup.outTime)
              promiseObj = postAddPickup(data)
            }

            promiseObj.then(res => {
              this.loading = false
              this.$refs[formName].resetFields()
              this.$emit('success')
              this.closeMe()
              this.$message.success('保存成功')
              this.loading = false
            }).catch(err => {
              if (err.text === '提货批次已存在') {
                this.fetchGetPickUp()
              } else {
                this._handlerCatchMsg(err)
              }
              this.loading = false
            })
          } else {
            return false
          }
        })
      },
      newInfoData() {
        this.form = {
          tmsCustomer: {
            customerName: '',
            customerMobile: '',
            detailedAddress: '',
            customerId: ''
          },
          tmsDriver: {
            driverName: '', // 司机姓名
            driverMobile: '', // 司机手机 /
            driverId: ''
            //  发送短信给司机
          },
          tmsTruck: {
            truckIdNumber: '', // 车牌号 /
            truckType: '', // 车辆类型
            truckUnit: '', // 车辆单位
            truckId: ''
          },
          tmsOrderPickup: {
            pickupBatchNumber: '', // 提货批次
            pickupName: '', // 货品名
            pickupAmount: '', // 件数
            pickupVolume: '', // 体积
            pickupWeight: '', // 重量
            carriage: '', // 运费
            payMethod: 76, // 付款方式
            toCityCode: '', // 到达城市
            toCityName: '', // 到达城市
            remark: '',
            truckFee: '', // 车费
            pickupStatus: 236, // 提货状态
            collectionFee: '', // 代收费用
            outTime: new Date(), // 出车时间
            arriveTime: ''//
          }
        }
      },
      reset() {
        this.watchInfo()
      },
      closeMe(done) {
        this.reset()
        this.$emit('update:popVisible', false)
        if (typeof done === 'function') {
          done()
        }
      }
    }
  }
</script>
<style lang="scss">

  .addPickUpPop {
    left: auto;
    top: 50px;
    bottom: auto;
    min-width: 900px;
    max-width: 900px;
    .popRight-content {
      /*padding: 20px 0px 0;*/
      box-sizing: border-box;
    }
    .el-input__inner {
      color: #3e9ff1
    }
    .el-textarea__inner {
      color: #3e9ff1
    }
    .el-form-item.is-success .el-input__inner, .el-form-item.is-success .el-input__inner:focus, .el-form-item.is-success .el-textarea__inner, .el-form-item.is-success .el-textarea__inner:focus {
      border-color: #dcdfe6;
    }
    .nativeinput{
      border-radius: 4px;
      border: 1px solid #dcdfe6;
      font-size: 12px;
    }
  }

  .senderName_lrl {
    .el-autocomplete {
      width: 178px;
    }
  }

  .senderAddr_lrl {
    
    .el-autocomplete {
      width: 745px;
    }
  }
  .order_toCityCode{
    .el-input--suffix .el-input__inner{
      padding-right: 15px;
    }
  }

  .selectListOption_lrl {
    clear: both;
    span {
      display: inline-block;
      width: 50%;
    }
    .addr {
      text-align: right;
      color: #999;
      font-size: 12px;
    }
  }

  .pickUp-order, .pickUp-bottom {
    padding-top: 10px;
    border-top: 1px solid #e4e7ed;
    .order_toCityCode {
      margin-right: 10px !important;
    }
    .order_remark {
      .el-form-item__label {
        /*text-align: center;*/
      }
      .el-form-item__content {
        width: 460px;
      }
    }
    .el-form-item--mini {
      .el-input__inner {
        /*width: 90%;*/
      }
    }
    .customer-unit {
      width: 80%;
    }

    .checked {
      display: block;
      .el-form-item__content {
        padding-left: 14px;
      }
    }
  }

  .pickUp-order {
    .pickup-way {
      .el-input {
        width: 91%;
      }
    }

    .el-input:nth-of-type(5) {
      /*.el-input__inner{*/
      width: 100%;
      /*}*/
    }
  }

  .pickUp-bottom .arrive-time .el-input__inner {
    width: 80%;
  }

  .pickUp-bottom {
    .el-form-item--mini:nth-of-type(5) {
      .el-input__inner,.nativeinput {
        width: 91%;
      }
    }
    .el-form-item--mini:nth-of-type(6) {
      .el-input--mini {
        width: 93%;
      }
    }
    .el-form-item--mini:nth-of-type(8) {
      .el-input__inner,.nativeinput {
        width: 91%;
      }
    }
    .el-form-item--mini:nth-of-type(9) {
      .el-input__inner,.nativeinput {
        width: 75%;
      }
      .el-date-editor.el-input {
        width: 105% !important;
      }
    }

  }

  .pickUp-top {
    margin-top: 10px;
  }

  .pickUp-top .el-input.is-disabled .el-input__inner {
    background-color: transparent;
  }

  .pickup-way .el-input__suffix {
    right: 20px;
  }

  .pickup_lrl .el-input.is-disabled .el-input__inner, .pickup_lrl .el-textarea.is-disabled .el-textarea__inner {
    background-color: #fff;
    color: #3e9ff1;
  }

  .pickup_lrl {
    padding-left: 10px;
    .info_date {
      background: #e9f3fa;
      padding: 8px 5px;
      font-size: 14px;
      color: #666;

    }
  }

</style>

