<template>
  <pop-right :title="popTitle +  orderSn" :key="ke1yVal" :isShow="popVisible" @close="closeMe" class="addPreOrderPop_lll"
             v-loading="loading">
    <template class="addPreOrderPop-content" slot="content">
      <el-form :model="form" :rules="rules" ref="ruleForm" :inline="true" label-position="right" size="mini"
               class="manage-add manage-add_lrl" label-width="100px" :show-message="checkShowMessage">
        <div class="info_order clearfloat">发货人信息</div>
        <div class="info_send clearfloat">
          <ul>
            <li>
              <el-form-item label="发货方:">
                <querySelect search="customerUnit" type="sender" valuekey="companyName"
                             v-model="form.customSend.customerUnit" @change="setSender" :disabled="isDbclick"/>
              </el-form-item>
            </li>
            <li>
              <el-form-item label="发货人:" prop="customSend.customerName">
                <querySelect search="customerName" type="sender" valuekey="customerName"
                             v-model="form.customSend.customerName" @change="setSender" :disabled="isDbclick"/>

              </el-form-item>
            </li>
            <li>
              <el-form-item label="联系号码:" prop="customSend.customerMobile">
                <querySelect search="customerMobile" type="sender" valuekey="customerMobile" :maxlength="11"
                             v-model="form.customSend.customerMobile" @change="setSender" :disabled="isDbclick"/>
              </el-form-item>
            </li>
            <li>
              <el-form-item label="发货地址:">
                <querySelect search="detailedAddress" type="sender" valuekey="detailedAddress"
                             v-model="form.customSend.detailedAddress" @change="setSender" class="send_detailedAddress"
                             :disabled="isDbclick"/>
              </el-form-item>
            </li>
          </ul>
        </div>
        <div class="info_order clearfloat">收货人信息</div>
        <div class="info_send clearfloat">
          <ul>
            <li class="marginTop_10">
              <el-form-item label="收货方:">
                <querySelect search="customerUnit" type="receiver" valuekey="customerUnit"
                             v-model="form.customRece.customerUnit" @change="setReceiver" :disabled="isDbclick"/>
              </el-form-item>
            </li>
            <li class="marginTop_10">
              <el-form-item label="收货人:" prop="customRece.customerName">
                <querySelect search="customerName" type="receiver" valuekey="customerName" :maxlength="20"
                             v-model="form.customRece.customerName" @change="setReceiver" :disabled="isDbclick"/>
              </el-form-item>
            </li>
            <li class="marginTop_10">
              <el-form-item label="联系号码:" prop="customRece.customerMobile">
                <querySelect search="customerMobile" type="receiver" valuekey="customerMobile" :maxlength="11"
                             v-model="form.customRece.customerMobile" @change="setReceiver" :disabled="isDbclick"/>
              </el-form-item>
            </li>
            <li>
              <el-form-item label="收货地址:">
                <querySelect search="detailedAddress" type="receiver" valuekey="detailedAddress"
                             v-model="form.customRece.detailedAddress" @change="setReceiver" :disabled="isDbclick"/>
              </el-form-item>
            </li>
          </ul>
        </div>

        <div class="info_order">货物信息</div>
        <div class="info_table">
          <ul>
            <li>
              <p><i>*</i> 货品名</p>
              <el-form-item prop="tmsOrderCargoList.cargoName">
                <querySelect size="mini" search="value" type="cargoName" valuekey="value"
                             v-model="form.tmsOrderCargoList.cargoName" :disabled="isDbclick"/>
              </el-form-item>
            </li>
            <li>
              <p><i>*</i> 件数</p>
              <el-form-item prop="tmsOrderCargoList.cargoAmount">
                <el-input :maxlength="8" v-model="form.tmsOrderCargoList.cargoAmount" v-numberOnly :disabled="isDbclick"></el-input>
              </el-form-item>
            </li>
            <li>
              <p>重量(kg)</p>
              <el-form-item prop="tmsOrderCargoList.cargoWeight">
                <input class="nativeinput order_com" :value="form.tmsOrderCargoList.cargoWeight" @change="(e)=>{setInputVal(e.target.value, 'cargoWeight')}" :maxlength="8" auto-complete="off"  clearable
                            :disabled="isDbclick" v-number-only:point type="text">
              </el-form-item>
            </li>
            <li>
              <p>体积(方)</p>
              <el-form-item prop="tmsOrderCargoList.cargoVolume">
                <input class="nativeinput order_com" :value="form.tmsOrderCargoList.cargoVolume" @change="(e)=>{setInputVal(e.target.value, 'cargoVolume')}" :maxlength="8" auto-complete="off"  clearable
                            :disabled="isDbclick" v-number-only:point type="text">
              </el-form-item>
            </li>
            <li>
              <p>包装</p>
              <el-form-item prop="nowpayCarriage">
                <querySelect size="mini" search="value" type="cargoPack" valuekey="value"
                             v-model="form.tmsOrderCargoList.cargoPack" :disabled="isDbclick"/>
              </el-form-item>
            </li>
            <li>
              <p>品种规格</p>
              <el-form-item prop="">
                <el-input :maxlength="20" v-model="form.tmsOrderCargoList.description" :disabled="isDbclick"></el-input>
              </el-form-item>
            </li>
          </ul>
        </div>

        <div class="info_order" style="margin-top: 18px">订单信息</div>
        <div class="manage-add-table-foot">
          <table>
            <tbody>
            <tr>
              <td>
                <el-form-item label="发站">

                  <queryCity search="longAddr" @change="selectFromCity" type="city"
                               v-model="form.tmsOrderPre.orderFromCityName" :remote="true" :disabled="isDbclick"
                               />
                </el-form-item>
              </td>
              <td>
                <el-form-item label="到站" prop="tmsOrderPre.orderToCityName">
                  <queryCity @change="selectToCity"  search="longAddr" type="city"
                               v-model="form.tmsOrderPre.orderToCityName" :remote="true" :disabled="isDbclick"/>
                </el-form-item>
              </td>
              <td>
                <el-form-item label="开单网点">
                  <SelectTree v-model="form.tmsOrderPre.orderFromOrgid" disabled/>
                </el-form-item>
              </td>

              <td>
                <el-form-item label="目的网点">
                  <SelectTree v-model="form.tmsOrderPre.orderToOrgid" :disabled="isDbclick" @change="changeOrderTo"/>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>
                <el-form-item label="提货方式">
                  <SelectType v-model="form.tmsOrderPre.orderPickupMethod" type="order_pickup_method"
                              :disabled="isDbclick"/>
                </el-form-item>
              </td>
              <td>
                <el-form-item label="紧急度">
                  <SelectType v-model="form.tmsOrderPre.orderEffective" type="ship_effective" :disabled="isDbclick"/>
                </el-form-item>
              </td>

              <td>
                <el-form-item label="代收款" prop="">
                  <input class="nativeinput" :value="form.tmsOrderCargoList.agencyFund" @change="(e)=>{setInputVal(e.target.value, 'agencyFund')}" :maxlength="8" auto-complete="off" clearable
                            :disabled="isDbclick" v-number-only:point type="text">
                </el-form-item>
              </td>
              <td>
                <el-form-item label="代收款手续费" prop="tmsOrderCargoList.commissionFee">
                  <input class="nativeinput order_com" :value="form.tmsOrderCargoList.commissionFee" @change="(e)=>{setInputVal(e.target.value, 'commissionFee')}" :maxlength="8" auto-complete="off"  clearable
                            :disabled="isDbclick" v-number-only:point type="text">
                 
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>
                <el-form-item label="付款方式">
                  <SelectType v-model="form.tmsOrderPre.orderPayWay" type="ship_pay_way" :disabled="isDbclick"/>
                </el-form-item>
              </td>

              <td>
                <el-form-item label="运费" prop="">
                  <input class="nativeinput" :value="form.tmsOrderCargoList.shipFee" @change="(e)=>{setInputVal(e.target.value, 'shipFee')}" :maxlength="8" auto-complete="off" clearable
                            :disabled="isDbclick" v-number-only:point type="text">
                </el-form-item>
              </td>
              <td>
                <el-form-item label="声明价值" prop="">
                  <input class="nativeinput" :value="form.tmsOrderCargoList.productPrice" @change="(e)=>{setInputVal(e.target.value, 'productPrice')}" :maxlength="8" auto-complete="off" clearable
                            :disabled="isDbclick" v-number-only:point type="text">
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>
                <el-form-item label="备注">
                  <el-input v-model="form.tmsOrderPre.orderRemarks" :maxlength="300" auto-complete="off" type="textarea"
                            clearable class="add-textarea" placeholder="少于300字" :disabled="isDbclick"></el-input>
                </el-form-item>
              </td>
            </tr>
            </tbody>

          </table>
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
  import { postAddOrder, postModifyOrder, postAddNetworkOrder } from '@/api/operation/manage'
  import popRight from '@/components/PopRight/index'
  import Upload from '@/components/Upload/singleImage'
  import SelectTree from '@/components/selectTree/index'
  import SelectType from '@/components/selectType/index'
  import querySelect from '@/components/querySelect/index'
  import queryCity from '@/components/querySelect/city'
  import { mapGetters } from 'vuex'
  import { objectMerge2 } from '@/utils/index'

  export default {
    components: {
      popRight,
      Upload,
      SelectTree,
      SelectType,
      querySelect,
      queryCity
    },
    props: {
      popVisible: {
        type: Boolean,
        default: false
      },
      orgid: {
        required: true
      },
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
      },
      networkFlog: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      ...mapGetters([
        'otherinfo'
      ])
    },
    data() {
      const validateOnlyNumberAndLetter = (rule, value, callback) => {
        if (REGEX.ONLY_NUMBER_AND_LETTER.test(value)) {
          callback()
        } else if (value == '') {
          callback()
        } else {
          callback(new Error('只能输入数字或者字母'))
        }
      }
      const validateMobile = (rule, value, callback) => {
        if (REGEX.MOBILE.test(value)) {
          callback()
        } else if (this.isDbclick) {
          callback()
        } else {
          callback(new Error('请输入正确的联系号码~'))
        }
      }
      const validatePickupNum = function(rule, value, callback) {
        if (REGEX.ONLY_NUMBER.test(value)) {
          callback()
        } else {
          callback(new Error('只能输入数字'))
        }
      }
      let hasOne = false
      const validateVolumnWeight = (rule, value, callback) => {
        if (this.form.tmsOrderCargoList.cargoVolume === '' && this.form.tmsOrderCargoList.cargoWeight === '') {
          hasOne = false
        }
        if (!value && !hasOne) {
          callback(new Error('体积或重量必填其中一项'))
        } else {
          hasOne = true
          callback()
        }
      }
      var validcustomerName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('发货人不能为空'))
        } else {
          callback()
        }
      }
      return {
        ke1yVal: '',
        rules: {
          'tmsOrderPre.orderToCityName': [
            { required: true, validator: this.validateIsEmpty('到站不能为空') }
          ],
          'customSend.customerName': [
            // { required: true, validator: this.validateIsEmpty('发货人不能为空'), trigger: 'blur' },
            { required: true, validator: validcustomerName }
          ],
          'customSend.customerMobile': [
            { required: true, validator: this.validateIsEmpty('发货人联系电话不能为空') }
          ],
          'customRece.customerName': [
            { required: true, validator: this.validateIsEmpty('收货人不能为空') }
          ],
          'customRece.customerMobile': [
            { required: true, validator: this.validateIsEmpty('收货人联系电话不能为空') }
          ],
          'tmsOrderCargoList.cargoName': [
            { validator: this.validateIsEmpty('货品名不能为空') }
          ],
          'tmsOrderCargoList.cargoAmount': [
            { validator: this.validateIsEmpty('件数不能为空') },
            { validator: validatePickupNum }
          ],
          'tmsOrderCargoList.cargoVolume': [{
            validator: validateVolumnWeight
          },
            { message: '只能输入数字', pattern: REGEX.Number_point }],
          'tmsOrderCargoList.cargoWeight':
          [{
            validator: validateVolumnWeight
          },
              { message: '只能输入数字', pattern: REGEX.Number_point }
          ],
          'tmsOrderCargoList.description': [
            { validator: validateOnlyNumberAndLetter }
          ],
          'tmsOrderCargoList.agencyFund': [
            { message: '只能输入数字', pattern: REGEX.Number_point }
          ],
          'tmsOrderCargoList.commissionFee': [
            { message: '只能输入数字', pattern: REGEX.Number_point }
          ],
          'tmsOrderCargoList.shipFee': [
            { message: '只能输入数字', pattern: REGEX.Number_point }
          ],
          'tmsOrderCargoList.productPrice': [
            { message: '只能输入数字', pattern: REGEX.Number_point }
          ]
        },
        btnsize: 'mini',
        carObj: {
          cargoName: '',  // 货品名
          cargoAmount: '',  // 件数
          cargoWeight: '',  // 重量
          cargoVolume: '',  // 体积
          cargoPack: ''  // 包装
          // description:''  // 品种规格
        },
        form: {
          customSend: {
            // 发货人
            customerId: '',
            customerUnit: '',
            customerName: '',
            customerMobile: '',
            detailedAddress: '',
            customerType: 1
          },
          customRece: {
            customerId: '',
            customerUnit: '',
            customerName: '',
            customerMobile: '', //
            detailedAddress: '',
            customerType: 2
          },
          customerList: [{}, {}],
          // 货物信息
          tmsOrderCargoList: [
            {
              cargoName: '',  // 货品名
              cargoAmount: '',  // 件数
              cargoWeight: '',  // 重量
              cargoVolume: '',  // 体积
              cargoPack: '',  // 包装
              description: '', // 品种规格
              commissionFee: '', // 代收款手续费
              agencyFund: '', // 代收款
              productPrice: '', // 声明价值
              shipFee: '', // 运费shipFee
              id: ''
            }
          ],
          // 订单信息
          tmsOrderPre: {
            orderFromCityCode: '',
            orderFromCityName: '',
            orderToCityCode: '',
            orderToCityName: '',
            orderFromOrgid: '',
            orderToOrgid: '', // 目的网点
            orderPickupMethod: 218, // 提货方式
            orderEffective: 94, // 紧急度
            orderPayWay: 76, // 付款方式 orderPayWayName
            // deliveryFee:'',//运费
            // commissionFee:'',//代收款手续费
            // agencyFund:'',//代收款
            // productPrice:'',//声明价值
            orderRemarks: '', //
            id: ''
            // cargoId,senderId,receiverId
          }
        },
        customSend: {
          // 发货人
          // customerId:'',
          customerUnit: '',
          customerName: '',
          customerMobile: '',
          detailedAddress: '',
          customerType: 1
        },
        customRece: {
          customerUnit: '',
          customerName: '',
          customerMobile: '', //
          detailedAddress: '',
          customerType: 2
        },
        popTitle: '新增订单',
        orderSn: '',
        loading: true,
        inited: false,
        // 验证
        checkShowMessage: false,
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
          this.$refs['ruleForm'].resetFields()
        }
      },
      orgid(newVal) {
      },
      info() {
        this.s_init()
      },
      isModify() {
        this.s_init()
      },
      isDbclick() {
        this.s_init()
      }
    },
    methods: {
      s_init() {
        if (this.isModify) {
          this.popTitle = '修改订单'
          this.orderSn = this.info.orderSn

          this.infoData(this.info)
        } else if (this.isDbclick) {
          this.popTitle = '查看订单'
          this.orderSn = this.info.orderSn
          this.infoData(this.info)
        } else {
          this.popTitle = '新增订单'
          this.reset()
        }
      },
      setInputVal(val, name) {
        this.$set(this.form.tmsOrderCargoList, name, val)
      },
      changeOrderTo(item) {
      },
      watchData() {
        if (this.isModify) {
          this.popTitle = '修改订单'
          this.orderSn = this.info.orderSn

          this.infoData(this.info)
        } else if (this.isDbclick) {
          this.popTitle = '查看订单'
          this.orderSn = this.info.orderSn
          this.infoData(this.info)
          // this.ke1yVal = Math.random()
        } else {
          this.popTitle = '新增订单'
          this.newinfoData()
          this.ke1yVal = Math.random()
          // this.newinfoData()
        }
        // this.ke1yVal = Math.random()
      },
      infoData(item) {
        if (this.networkFlog) { // 如果是网络订单
          this.orderSn = ''
          this.$set(this.form.tmsOrderPre, 'orderFromOrgid', this.otherinfo.companyId)
        }
        console.log('item::', item)

        this.form.tmsOrderCargoList.cargoName = item.cargoName
        this.form.tmsOrderCargoList.cargoAmount = item.cargoAmount
        this.form.tmsOrderCargoList.cargoWeight = item.cargoWeight
        this.form.tmsOrderCargoList.cargoVolume = item.cargoVolume
        this.form.tmsOrderCargoList.cargoPack = item.cargoPack
        this.form.tmsOrderCargoList.description = item.description
        this.form.tmsOrderCargoList.agencyFund = item.agencyFund
        this.form.tmsOrderCargoList.commissionFee = item.commissionFee
        this.form.tmsOrderCargoList.shipFee = item.shipFee
        this.form.tmsOrderCargoList.productPrice = item.productPrice
        this.form.tmsOrderCargoList.id = item.cargoId
        // 发
        this.form.customSend.customerName = item.senderName
        this.form.customSend.customerMobile = item.senderMobile
        this.form.customSend.detailedAddress = item.senderAddr
        this.form.customSend.customerUnit = item.senderUnit
        this.form.customSend.customerId = item.senderId
        // 收
        this.form.customRece.customerName = item.receiverName
        this.form.customRece.customerMobile = item.receiverMobile
        this.form.customRece.detailedAddress = item.receiverAddr
        this.form.customRece.customerUnit = item.receiverUnit
        this.form.customRece.customerId = item.receiverId

        // 订单信息

        this.form.tmsOrderPre.orderFromCityName = this.info.orderFromCityName
        this.form.tmsOrderPre.orderToCityName = this.info.orderToCityName
        this.form.tmsOrderPre.orderRemarks = item.orderRemarks
        // this.form.tmsOrderPre.orderPickupMethodName = this.info.orderPickupMethodName
        this.form.tmsOrderPre.orderEffective = item.orderEffective
        this.form.tmsOrderPre.id = item.id
        this.form.tmsOrderPre.orderFromOrgid = item.orderFromOrgid
        this.form.tmsOrderPre.orderToOrgid = item.orderToOrgid
        this.ke1yVal = Math.random()
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
      // 选择发站
      selectFromCity(item, city) {
        if (item) {
          this.form.tmsOrderPre.orderFromCityCode = item.id
          this.form.tmsOrderPre.orderFromCityName = item.longAddr
        } else {
          // this.form.tmsOrderPre.orderFromCityCode = city || ''
        }
      },
      // 选择到站
      selectToCity(item, city) {
        if (item) {
          this.form.tmsOrderPre.orderToCityCode = item.id
          this.form.tmsOrderPre.orderToCityName = item.longAddr
        } else {
        }
      },
      /** 收货人/发货人 */
      setSender(item, type) {
        type = type ? 'customRece' : 'customSend'
        if (item) {
          // this.form[type].customerId = item.customerId || ''
          this.form[type].customerType = type === 'customSend' ? 1 : 2
          this.form[type].customerUnit = item.customerUnit
          this.form[type].customerName = item.customerName
          this.form[type].customerMobile = item.customerMobile
          this.form[type].detailedAddress = item.detailedAddress
        }
      },
      setReceiver(item) {
        this.setSender(item, 'receiver')
      },

      setObject(obj1, obj2) {
        for (var i in obj1) {
          obj1[i] = obj2 ? obj2[i] : ''
        }
        return obj1
      },
      initInfo() {
        this.loading = false
      },
      getOrgid(id) {
        // this.form.orgid = id
      },
      submitForm(ruleForm) {
        this.isChecked = true
        this.isCheckedShow = true
        this.checkShowMessage = true
        this.$refs[ruleForm].validate((valid) => {
          this.isChecked = false
          this.isCheckedShow = false
          if (valid && !this.loading) {
            this.loading = true
            this.form.customerList[0] = this.form.customSend
            this.form.customerList[1] = this.form.customRece

            let promiseObj
            if (this.networkFlog) { // 如果是网络订单
              this.$set(this.form.tmsOrderPre, 'type', 1)
              this.$set(this.form.tmsOrderPre, 'orderFromOrgid', this.otherinfo.companyId)
            }
            const data = objectMerge2({}, this.form)
            delete data.customSend
            delete data.customRece
            const obj = {}
            for (const i in data.tmsOrderCargoList) {
              obj[i] = data.tmsOrderCargoList[i]
            }
            data.tmsOrderCargoList = [obj]
            this.loading = true
            if (this.isModify) {
              promiseObj = postModifyOrder(data)
            } else {
              if (this.networkFlog) {
                promiseObj = postAddNetworkOrder(data)
              } else {
                promiseObj = postAddOrder(data)
              }
            }

            promiseObj.then(res => {
              this.$emit('success')
              this.closeMe()
              this.$message.success('保存成功')
              this.loading = false
            }).catch(err => {
              this.loading = false
              this._handlerCatchMsg(err)
            })
          } else {
            return false
          }
        })
      },
      newinfoData() {
        this.orderSn = ''
        this.form = {
          customSend: {
            // 发货人
            customerId: '',
            customerUnit: '',
            customerName: '',
            customerMobile: '',
            detailedAddress: '',
            customerType: 1
          },
          customRece: {
            customerId: '',
            customerUnit: '',
            customerName: '',
            customerMobile: '', //
            detailedAddress: '',
            customerType: 2
          },
          customerList: [{}, {}],
          // 货物信息
          tmsOrderCargoList: [
            {
              cargoName: '',  // 货品名
              cargoAmount: '',  // 件数
              cargoWeight: '',  // 重量
              cargoVolume: '',  // 体积
              cargoPack: '',  // 包装
              description: '', // 品种规格
              commissionFee: '', // 代收款手续费
              agencyFund: '', // 代收款
              productPrice: '', // 声明价值
              shipFee: '', // 运费shipFee
              id: ''
            }
          ],
          // 订单信息
          tmsOrderPre: {
            orderFromCityCode: '',
            orderFromCityName: '',
            orderToCityCode: '',
            orderToCityName: '',
            orderFromOrgid: this.otherinfo.orgid,
            orderToOrgid: '', // 目的网点
            orderPickupMethod: 218, // 提货方式
            orderEffective: 94, // 紧急度
            orderPayWay: 76, // 付款方式 orderPayWayName
            // deliveryFee:'',//运费
            // commissionFee:'',//代收款手续费
            // agencyFund:'',//代收款
            // productPrice:'',//声明价值
            orderRemarks: '', //
            id: ''
            // cargoId,senderId,receiverId
          }
        }
      },
      reset() {
        this.watchData()
      },
      closeMe(done) {
        this.reset()
        // this.ke1yVal = Math.random()
        this.$emit('update:popVisible', false)
        this.$emit('close')
        if (typeof done === 'function') {
          done()
        }
      }
    }
  }
</script>
<style lang="scss">
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

  .addPreOrderPop_lll {
    left: auto;
    top: 50px;
    bottom: auto;
    min-width: 870px;
    max-width: 870px;

    .nativeinput{
      border-radius: 4px;
      border: 1px solid #dcdfe6;
    }
    .el-input__inner {
      color: #3e9ff1;
    }
    .el-textarea__inner {
      color: #3e9ff1;
    }

    .el-form--inline .el-form-item {

    }

    .el-form-item__content {
      flex: 1;
    }

    .select-tree {
      width: 100%;
    }

    .customerPhone .el-form-item__content {
      display: flex;
    }
    .phoneshort {
      width: 78px;
    }
    .phonelong {
      flex: 1;
    }

    .licensePicture {
      height: 116px;
      line-height: 1.2;
    }

    .popRight-content {
      box-sizing: border-box;
    }

    .idcard-pos, .idcard-ver {
      width: 234px;
      height: 136px;
      float: left;
      line-height: 1.2;

      .upload-container {
        height: 100%;
      }
    }
    .idcard-ver {
      float: right;
    }
    .el-input.is-disabled {
      .el-input__inner {
        border-radius: 0;
        color: #3e9ff1;
      }
    }

    .el-form-item.is-success .el-input__inner, .el-form-item.is-success .el-input__inner:focus, .el-form-item.is-success .el-textarea__inner, .el-form-item.is-success .el-textarea__inner:focus {
      border-color: #dcdfe6;
    }

  }

  /*收货-发货方*/
  .info_send {
    ul {
      margin-top: 10px;
      li {
        float: left;
        .el-form-item {
          // margin-right: -10px;
          width: 100%;
          display: flex;
          // margin-left: 7px
        }
      }
      li:last-of-type {
        width: 100%;
        .el-form-item--mini {
          .el-form-item__content {
            // width: 146%;
            .el-autocomplete {
              width: 94%;
            }
          }
        }

      }
      // li:nth-of-type(1) {
      //   .el-input__inner {
      //     width: 94%;
      //   }
      // }
      // li:nth-of-type(2) {
      //   .el-input__inner {
      //     width: 88%;
      //   }
      // }
      .el-autocomplete {
        // width: 146%;
      }
    }
  }

  /*margin-right: -23px;
   width: 90%;
  display: -ms-flexbox;
   display: flex;
   margin-left: 7px;*/

  .manage-add-table-foot {
    margin-right: 30px;
    table {
      height: 100%;
      width: 100%;
      margin-top: 10px;
      .el-input__inner {
        color: #3e9ff1;
      }

      th {
        width: 50%;
        height: 30px;
        background: #eee;
        margin-left: 10px;
        font-size: 14px;
        padding: 2px 2px 2px 5px !important;
        background: transparent;
        width: 0;
      }
      tbody {
        tr {
          td {
            .el-form-item {
              margin-right: -23px;
              width: 101%;
              display: flex;
              margin-left: 0
            }

          }
        }
      }
      .add-textarea {
        width: 660%;
      }
      .el-form-item--mini {
        margin-left: 12px;
      }
    }
    .el-textarea.is-disabled .el-textarea__inner {
      color: #3e9ff1;
    }
  }

  .info_order:first-of-type {
    margin-top: 20px;
  }

  .info_order, .info_rece {
    height: 36px;
    line-height: 36px;
    /*margin-top: 12px;*/
    margin: 0 20px;
    padding-left: 10px;
    font-size: 14px;
    color: #666;
    font-weight: 600;
    border-top: 1px solid #d4d4d4;
    border-bottom: 1px solid #d4d4d4;
    background: #e9f3fa;
  }

  .manage-add_lrl div.el-form-item {
    width: 40%;
  }

  .info_table {
    border-color: #dcdfe6;
    margin: 22px 30px 20px;
    border-left: 2px solid #dcdfe6;
    border-right: 2px solid #dcdfe6;
    ul {
      width: 100%;
      display: -ms-flexbox;
      display: flex;
      -ms-flex-direction: row;
      flex-direction: row;

      li:nth-of-type(1) {
        padding-left: 0;
      }
      li:last-of-type {
        border-right: none;
      }
      li {
        border: 1px solid #d4d4d4;
        width: 30%;
        border-left: none;
        padding-bottom: 10px;

        p {
          font-size: 14px;
          text-align: center;
          line-height: 34px;
          background: #eaf0ff;
          margin-bottom: 5px;
          i {
            color: red;
          }
        }
        .el-form-item.is-success {
          .el-input__inner {
            border-color: transparent;
          }
        }
        .el-input__inner, .nativeinput {
          width: 245%;
        }
        .el-form-item__error {

        }
      }

      .el-input__inner, .nativeinput {
        border-color: transparent;
        border-radius: 0;
        text-align: center;
      }
      .el-form-item.is-error {
        .el-input__inner {
          border-color: transparent;
          border-radius: 0;
          text-align: center;
        }
      }
      .el-form-item__error {
        top: 150%;
        width: 145px;
      }
      .el-form-item {
        margin-bottom: 0;
        margin-right: 0;

      }
      .el-input.is-disabled {
        .el-input__inner {
          border-color: transparent;
          border-radius: 0;
          text-align: center;
        }
      }
    }

  }

  /*清除浮动代码*/
  .clearfloat:after {
    display: block;
    clear: both;
    content: "";
    visibility: hidden;
    height: 0
  }

  .clearfloat {
    zoom: 1
  }

  .manage-add_lrl .el-input.is-disabled .el-input__inner, .manage-add_lrl .el-textarea.is-disabled .el-textarea__inner {
    background-color: #fff;
    /*color: red;*/
  }

</style>

