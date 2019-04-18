<template>
  <!-- 核销凭证 运单核销-->
  <el-dialog :title="dialogTitle" :visible.sync="isShow" :close-on-click-modal="false" :before-close="closeMe" class="incomeDialog">
    <el-form ref="formModel" :model="formModel" :rules="rules" :inline="true" label-width="120px" v-loading="loading">
      <div class="income_item">
        <el-form-item label="方向" prop="verificationId" class="formItemTextDanger">
          <el-select v-model="formModel.verificationId" filterable placeholder="请选择" :size="btnsize" @change="selectVerificationWay">
            <el-option v-for="(value, key) in veryficationList" :value="value.id" :key="key" :label="value.verificationWay"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发生金额" prop="amount">
          <el-input v-model.number="formModel.amount" v-numberOnly:point placeholder="发生金额" :size="btnsize" :maxlength="8" disabled></el-input>
        </el-form-item>
      </div>
      <div class="income_item">
        <el-form-item label="一级科目" :prop="formModel.isNeededVoucher === '1' ?  'subjectOneId' : ''" :class="{formItemTextDanger: formModel.isNeededVoucher === '1'}">
          <el-select v-model="formModel.subjectOneId" filterable placeholder="无数据" :size="btnsize" @change="val => selectSubject(val,1)" :disabled="formModel.isNeededVoucher !== '1'" @clear="initSubject" size="mini">
            <el-option v-for="(item, index) in subjectOne" :key="index" :label="item.subjectName" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="凭证日期" prop="certTime">
          <el-date-picker v-model="formModel.certTime" type="date" :size="btnsize" placeholder="选择日期" :clearable="false">
          </el-date-picker>
        </el-form-item>
      </div>
      <div class="income_item">
        <el-form-item label="二级科目" :class="subjectTwo.length > 0 ? 'formItemTextDanger' : ''">
          <el-select v-model="formModel.subjectTwoId" filterable placeholder="无数据" :size="btnsize" @change="val => selectSubject(val,2)" :disabled="formModel.isNeededVoucher !== '1'" size="mini">
            <el-option v-for="(item, index) in subjectTwo" :key="index" :label="item.subjectName" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="收据号码" prop="receiptNo">
          <el-input v-model="formModel.receiptNo" placeholder="收据号码" :size="btnsize" :maxlength="25"></el-input>
        </el-form-item>
      </div>
      <div class="income_item">
        <el-form-item label="三级科目" :class="subjectThree.length > 0 ? 'formItemTextDanger' : ''">
          <el-select v-model="formModel.subjectThreeId" filterable placeholder="无数据" :size="btnsize" @change="val => selectSubject(val,3)" :disabled="formModel.isNeededVoucher !== '1'">
            <el-option v-for="(item, index) in subjectThree" :key="index" :label="item.subjectName" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发票号码" prop="invoiceNo">
          <el-input v-model="formModel.invoiceNo" placeholder="发票号码" :size="btnsize" :maxlength="25"></el-input>
        </el-form-item>
      </div>
      <div class="income_item">
        <el-form-item label="四级科目" :class="subjectFour.length > 0 ? 'formItemTextDanger' : ''">
          <el-select v-model="formModel.subjectFourId" filterable placeholder="无数据" :size="btnsize" @change="val => selectSubject(val,4)" :disabled="formModel.isNeededVoucher !== '1'">
            <el-option v-for="(item, index) in subjectFour" :key="index" :label="item.subjectName" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="支票号码" prop="checkNo">
          <el-input v-model="formModel.checkNo" placeholder="支票号码" :size="btnsize" :maxlength="25"></el-input>
        </el-form-item>
      </div>
      <div class="income_item">
        <el-form-item label="摘要">
          <el-input type="textarea" v-model="formModel.remark" placeholder="摘要" :size="btnsize" :maxlength="50"></el-input>
        </el-form-item>
        <el-form-item>
        </el-form-item>
      </div>
    </el-form>
    <span slot="footer">
          <el-button type="primary" @click="submitForm('formModel')" plain icon="el-icon-document" :loading="btnLoading">保存</el-button>
          <el-button type="warning" @click="setting" plain icon="el-icon-setting" v-if="formModel.isNeededVoucher === '1'" v-has:INIT_SUBJECT_DEFINE>设置财务科目</el-button>
          <el-button type="danger" @click="closeMe" plain icon="el-icon-circle-close">取消</el-button>
        </span>
  </el-dialog>
</template>
<script>
import { getSystemTime } from '@/api/common'
import { parseTime } from '@/utils/'
import { postVerificationBaseInfo, getVeryficationList, getFinanceSubjects } from '@/api/finance/financeDaily'
import { postCreateloadSettlement } from '@/api/finance/accountsPayable'
import { REGEX } from '@/utils/validate'
export default {
  props: {
    popVisible: {
      type: Boolean,
      default: false
    },
    orgId: {
      type: [String, Number],
      default: ''
    },
    info: {
      type: [Object, Array],
      default: () => []
    }
  },
  watch: {
    popVisible: {
      handler(cval, oval) {
        if (cval) {
          this.init()
        }
      },
      immediate: true
    },
    info: {
      handler(cval, oval) {
        console.log('voucher 接收到的数据::', cval)
      },
      deep: true
    },
    // btnLoading: {
    //   handler(cval, oval) {

    //   },
    //   deep: true
    // },
    orgId: {
      handler(cval, oval) {
        console.log('orgId', cval, oval)
      },
      immediate: true,
      deep: true
    }
  },
  computed: {
    isShow: {
      get() {
        return this.popVisible
      },
      set() {}
    },
    currentPage() {
      const currentPage = this.$route.query.currentPage
      return currentPage.substr(7, currentPage.length)
    },
    dataName() {
      const currentPage = this.$route.query.currentPage
      switch (currentPage) {
        case 'waybillKickback':
          return '回扣'
        case 'waybillTicket':
          return '单票提货费'
        case 'waybillOther':
          return '其他费用支出'
        case 'waybillTransfer':
          return '中转费'
        case 'waybillAbnormal':
          return '异常理赔'
        case 'waybillUnusual':
          return '异动费用核销'
        case 'waybillTerminal':
          return '终端送货费'
      }
    },
    getRouteInfo() {
      return JSON.parse(this.$route.query.searchQuery)
    },
    feeId() {
      return JSON.parse(this.$route.query.searchQuery).vo.feeType
    },
  },
  data() {
    const numberAndWordValid = function(rule, value, callback) {
      if (REGEX.ENGLISH_AND_NUMBER.test(value) || value === '') {
        callback()
      } else {
        callback(new Error('只可以输入阿拉伯数字和字母, 最多可输入25位'))
      }
    }
    return {
      btnLoading: false,
      dialogTitle: '核销凭证',
      loading: true,
      btnsize: 'mini',
      baseQuery: {
        orgId: '',
        amount: 0,
        feeIds: ''
      },
      formModel: {
        verificationWay: '',
        paymentsType: '',
        amount: '',
        certTime: '',
        receiptNo: '',
        invoiceNo: '',
        checkNo: '',
        remark: '',
        subjectOneName: '',
        subjectOneId: '',
        subjectTwoName: '',
        subjectTwoId: '',
        subjectThreeName: '',
        subjectThreeId: '',
        subjectFourName: '',
        subjectFourId: ''
      },
      rules: {
        verificationId: [{ required: true, message: '请填写记账方向!', trigger: 'blur' }],
        subjectOneId: [{ required: true, message: '请填写一级科目!', trigger: 'blur' }],
        receiptNo: [{ validator: numberAndWordValid, trigger: 'blur' }],
        invoiceNo: [{ validator: numberAndWordValid, trigger: 'blur' }],
        checkNo: [{ validator: numberAndWordValid, trigger: 'blur' }],
        manualCert: [{ validator: numberAndWordValid, trigger: 'blur' }]
      },
      veryficationType: {},
      veryficationList: [],
      subjectOne: [],
      subjectTwo: [],
      subjectThree: [],
      subjectFour: [],
      searchQuerySub: {
        orgId: '',
        parentId: '',
        subjectLevel: ''
      }
    }
  },
  methods: {
    init() {
      this.baseQuery = this.$options.data().baseQuery
      this.postVerificationBaseInfo()
      this.formModel.amount = this.info.amount || 0
    },
    postVerificationBaseInfo() { // 新增时初始化数据
      // this.loading = true
      this.baseQuery.orgId = this.orgId || this.otherinfo.orgid
      this.baseQuery.amount = this.info.amount
      console.log('getRouteInfo', this.getRouteInfo, this.feeId)
      this.baseQuery.feeIds = this.feeId + ''
      this.$set(this.baseQuery, 'dataSrc', 0)
      this.$set(this.baseQuery, 'companyId', this.otherinfo.companyId)
      postVerificationBaseInfo(this.baseQuery).then(data => {
          if (data) {
            this.subjectOne = data.subOneList || []
            this.subjectTwo = data.subTwoList || []
            this.subjectThree = data.subThreeList || []
            this.subjectFour = data.subFourList || []
            this.formModel = data
            this.loading = false
            if (data.verificationList) {
              this.veryficationList = data.verificationList || []
              data.verificationList.forEach((el, index) => {
                this.veryficationType[el.id] = el.verificationWay
              })
            }
            // this.initSubject()
          }
        })
        .catch(err => {
          this.loading = false
          this._handlerCatchMsg(err)
        })
    },
    initSubject() { // 修改时回填科目列表
      this.getFinanceSubjects().then(() => { // 获取一级科目
        if (this.formModel.subjectOneId) {
          if (!this.checkSubject(1)) {
            for (let item in this.formModel) {
              if (/^subject/.test(item)) {
                this.formModel[item] = ''
              }
            }
            return
          }
          this.getFinanceSubjects(2, this.formModel.subjectOneId).then(() => { // 获取二级科目
            if (this.formModel.subjectTwoId) {
              if (!this.checkSubject(2)) {
                for (let item in this.formModel) {
                  if (/(Four|Three|Two)/.test(item)) {
                    this.formModel[item] = ''
                  }
                }
                return
              }
              this.getFinanceSubjects(3, this.formModel.subjectTwoId).then(() => { // 获取三级科目
                if (this.formModel.subjectThreeId) {
                  if (!this.checkSubject(3)) {
                    for (let item in this.formModel) {
                      if (/(Four|Three)/.test(item)) {
                        this.formModel[item] = ''
                      }
                    }
                    return
                  }
                  this.getFinanceSubjects(4, this.formModel.subjectThreeId).then(() => { // 获取四级科目
                    if (this.formModel.subjectFourId) {
                      if (!this.checkSubject(4)) {
                        this.formModel.subjectFourId = ''
                        this.formModel.subjectFourName = ''
                        return
                      }
                    }
                  })
                }
              })
            }
          })
        }
      })
    },
    checkSubjectIsNull() { // 判断下级科目列表有时 是否未选择
      if (this.subjectTwo.length > 0) {
        if (this.formModel.subjectTwoId) {
          if (this.subjectThree.length > 0) {
            if (this.formModel.subjectThreeId) {
              if (this.subjectFour.length > 0) {
                if (this.formModel.subjectFourId) {
                  return true
                } else {
                  this.$message.warning('请填写四级科目')
                  return false
                }
              } else {
                return true
              }
            } else {
              this.$message.warning('请填写三级科目')
              return false
            }
          } else {
            return true
          }
        } else {
          this.$message.warning('请填写二级科目!')
          return false
        }
      } else {
        return true
      }
    },
    submitForm(formName) { // 保存
      if (!this.checkSubjectIsNull()) { return }
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.btnLoading = true
          let dataInfo = Object.assign({}, this.formModel)
          this.$set(dataInfo, 'orderList', this.info.orderList)
          this.$set(dataInfo, 'dataSrc', 0) // (数据)来源 ,0  核销产生, 1 手工录入
          if (!dataInfo.certTime) {
            dataInfo.certTime = new Date()
          }
          this.$set(dataInfo, 'certTime', parseTime(dataInfo.certTime, '{y}-{m}-{d}') + ' 00:00:00')
          delete dataInfo.verificationList
          let query = {
            shipPayableFeeDtos: dataInfo.orderList,
            tmsFinanceBillRecordDto: dataInfo
          }
          delete query.tmsFinanceBillRecordDto.orderList
          let orgid = ''
          if (this.dataName === '中转费') { // 中转核销的时候 传给后台中转网点
            orgid = this.getRouteInfo.vo.transferOrgid
          } else if (this.dataName === '异常理赔') {
            orgid = this.getRouteInfo.vo.orgid
          } else {
            orgid = this.getRouteInfo.vo.shipFromOrgid
          }
          postCreateloadSettlement(orgid, query).then(data => {
              this.$message.success('保存成功！')
              this.btnLoading = false
              this.popVisibleDialog = false
              const currentPage = this.currentPage.substring(0, 1).toLowerCase() + this.currentPage.substring(1)
              this.$router.push({ path: './accountsPayable/waybill/' + currentPage })
            })
            .catch(err => {
              this._handlerCatchMsg(err)
              this.btnLoading = false
            })
        }
      })
    },
    setting() {
      this.$router.push({ path: '/finance/financeInfo/subjectInfo' })
    },
    checkSubject(type) { // 修改时 检查返回的凭证科目是否还存在科目库中 如果不存在 就清空下拉框不显示
      switch (type) {
        case 1:
          let one = []
          if (this.subjectOne.length > 0) {
            one = this.subjectOne.filter(e => {
              return e.id === this.formModel.subjectOneId
            })
            if (one.length === 0) {
              this.formModel.subjectOneId = ''
              this.formModel.subjectOneName = ''
              return false
            } else {
              return true
            }
          }
          break
        case 2:
          let two = []
          if (this.subjectTwo.length > 0) {
            two = this.subjectTwo.filter(e => {
              return e.id === this.formModel.subjectTwoId
            })
            if (two.length === 0) {
              this.formModel.subjectTwoId = ''
              this.formModel.subjectTwoName = ''
              return false
            } else {
              return true
            }
          }
          break
        case 3:
          let three = []
          if (this.subjectThree.length > 0) {
            three = this.subjectThree.filter(e => {
              return e.id === this.formModel.subjectThreeId
            })
            if (three.length === 0) {
              this.formModel.subjectThreeId = ''
              this.formModel.subjectThreeName = ''
              return false
            } else {
              return true
            }
          }
          break
        case 4:
          let four = []
          if (this.subjectFour.length > 0) {
            four = this.subjectFour.filter(e => {
              return e.id === this.formModel.subjectFourId
            })
            if (four.length === 0) {
              this.formModel.subjectFourId = ''
              this.formModel.subjectFourName = ''
              return false
            } else {
              return true
            }
          }
          break
      }
    },
    getFinanceSubjects(subjectLevel, parentId) {
      // this.loading = true
      console.log('接口查询下级科目列表：\n', subjectLevel, parentId)
      this.searchQuerySub.subjectLevel = subjectLevel || ''
      this.searchQuerySub.parentId = parentId || ''
      this.searchQuerySub.orgId = this.orgId || this.otherinfo.orgid

      return getFinanceSubjects(this.searchQuerySub).then(data => {
          switch (subjectLevel) {
            case 2:
              this.subjectTwo = data
              this.subjectTwo.forEach((e, index) => {
                console.log(index, e.id)
              })
              this.subjectThree = []
              this.subjectFour = []
              console.log('科目二: ', this.subjectTwo)
              break
            case 3:
              this.subjectThree = data
              this.subjectThree.forEach((e, index) => {
                console.log(index, e.id)
              })
              this.subjectFour = []
              console.log('科目三: ', this.subjectThree)
              break
            case 4:
              this.subjectFour = data
              this.subjectFour.forEach((e, index) => {
                console.log(index, e.id)
              })
              console.log('科目四: ', this.subjectFour)
              break
            default:
              this.subjectOne = data
              this.subjectTwo = []
              this.subjectThree = []
              this.subjectFour = []
              console.log('科目一: ', this.subjectOne)
              this.subjectOne.forEach((e, index) => {
                console.log(index, e.id)
              })
              break
          }
          this.loading = false
          console.log('科目: ', subjectLevel, data)
        })
        .catch(err => {
          this.loading = false
          this._handlerCatchMsg(err)
        })
    },
    selectSubject(val, type) {
      console.log(val)
      let obj = {}
      switch (type) {
        case 1:
          obj = Object.assign({}, this.subjectOne.filter(e => {
            return e.id === val
          })[0])
          this.getFinanceSubjects(2, obj.id)
          for (let item in this.formModel) {
            if (/^subject/.test(item)) {
              this.formModel[item] = ''
            }
          }
          this.formModel.subjectOneName = obj.subjectName
          this.formModel.subjectOneId = obj.id
          console.log('科目一 选中的值', obj)
          break
        case 2:
          obj = Object.assign({}, this.subjectTwo.filter(e => {
            return e.id === val
          })[0])
          this.getFinanceSubjects(3, obj.id)
          for (let item in this.formModel) {
            if (/(Four|Three)/.test(item)) {
              this.formModel[item] = ''
            }
          }
          this.formModel.subjectTwoName = obj.subjectName
          console.log('科目二 选中的值', obj)
          break
        case 3:
          obj = Object.assign({}, this.subjectThree.filter(e => {
            return e.id === val
          })[0])
          this.getFinanceSubjects(4, obj.id)
          this.formModel.subjectThreeName = obj.subjectName
          this.formModel.subjectFourName = ''
          this.formModel.subjectFourId = ''
          console.log('科目三 选中的值', obj)
          break
        case 4:
          obj = Object.assign({}, this.subjectFour.filter(e => {
            return e.id === val
          })[0])
          this.formModel.subjectFourName = obj.subjectName
          break
      }
      obj = {}
      console.log('formModel', this.formModel)
    },
    selectVerificationWay(val) {
      let obj = {}
      obj = this.formModel.verificationList.filter(e => {
        return e.id === val
      })[0]
      this.$set(this.formModel, 'verificationWay', obj.verificationWay)
      console.log('选中方向：：', obj, this.formModel)
    },
    closeMe(done) {
      this.$emit('close')
      if (typeof done === 'function') {
        done()
      }
    }
  }
}

</script>
