<template>
  <el-dialog :title="dialogTitle" :visible.sync="isShow" :close-on-click-modal="false" :before-close="closeMe" class=" incomeDialog" v-loading="loading">
    <h4 class="income_title">{{formModelTitle}}</h4>
    <el-form ref="formModel" :model="formModel" :rules="rules" :inline="true" label-width="120px">
      <div class="income_item">
        <el-form-item label="记账网点">
          <SelectTree v-model="formModel.orgId" :orgid="otherinfo.orgid" :size="btnsize"></SelectTree>
        </el-form-item>
        <el-form-item label="凭证编号" prop="certNo">
          <el-input v-model="formModel.certNo" placeholder="凭证编号" :size="btnsize" disabled></el-input>
        </el-form-item>
        <el-form-item>
        </el-form-item>
      </div>
      <div class="income_item_line"></div>
      <div class="income_item">
        <el-form-item label="记账方向">
          <el-select v-model="formModel.paymentsType" placeholder="请选择" :size="btnsize">
            <el-option v-for="(value, key) in $const.SETTLEMENT_ID" :value="key" :key="key" :label="value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="凭证日期" prop="certTime">
          <el-date-picker v-model="formModel.certTime" type="date" :size="btnsize" placeholder="选择日期" :clearable="false">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="去向" prop="verificationId" class="formItemTextDanger">
          <el-select clearable v-model="formModel.verificationId" filterable placeholder="请选择" :size="btnsize" @change="selectVerificationWay">
            <el-option v-for="(wayItem, wayIndex) in verificationWay" :key="wayIndex" :label="wayItem.verificationWay" :value="wayItem.id">
            </el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="income_item">
        <el-form-item label="一级科目" prop="subjectOneId" class="formItemTextDanger">
          <el-select v-model="formModel.subjectOneId" filterable placeholder="请选择" :size="btnsize" @change="val => selectSubject(val,1)">
            <el-option v-for="(item, index) in subjectOne" :key="index" :label="item.subjectName" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级科目" prop="subjectTwoId" :class="subjectTwo.length > 0 ? 'formItemTextDanger' : ''">
          <el-select clearable v-model="formModel.subjectTwoId" filterable placeholder="请选择" :size="btnsize" @change="val => selectSubject(val,2)">
            <el-option v-for="(item, index) in subjectTwo" :key="index" :label="item.subjectName" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="三级科目" :class="subjectThree.length > 0 ? 'formItemTextDanger' : ''">
          <el-select clearable v-model="formModel.subjectThreeId" filterable placeholder="请选择" :size="btnsize" @change="val => selectSubject(val,3)">
            <el-option v-for="(item, index) in subjectThree" :key="index" :label="item.subjectName" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="income_item">
        <el-form-item label="四级科目" :class="subjectFour.length > 0 ? 'formItemTextDanger' : ''">
          <el-select clearable v-model="formModel.subjectFourId" filterable placeholder="请选择" :size="btnsize" @change="val => selectSubject(val,4)">
            <el-option v-for="(item, index) in subjectFour" :key="index" :label="item.subjectName" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="凭证类别">
          <el-select v-model="formModel.certType" filterable placeholder="请选择" :size="btnsize">
            <el-option v-for="(value, key) in $const.CERT_TYPE" :value="key" :key="key" :label="value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发生金额" prop="amount" class="formItemTextDanger">
          <el-input v-model.number="formModel.amount" v-numberOnly:point placeholder="发生金额" :size="btnsize" :maxlength="8"></el-input>
        </el-form-item>
      </div>
      <div class="income_item_line"></div>
      <div class="income_item">
        <el-form-item label="收据号码" prop="receiptNo">
          <el-input v-model="formModel.receiptNo" placeholder="收据号码" :size="btnsize" :maxlength="25"></el-input>
        </el-form-item>
        <el-form-item label="发票号码" prop="invoiceNo">
          <el-input v-model="formModel.invoiceNo" placeholder="发票号码" :size="btnsize" :maxlength="25"></el-input>
        </el-form-item>
        <el-form-item label="支票号码" prop="checkNo">
          <el-input v-model="formModel.checkNo" placeholder="支票号码" :size="btnsize" :maxlength="25"></el-input>
        </el-form-item>
      </div>
      <div class="income_item">
        <el-form-item label="手工凭证" prop="manualCert">
          <el-input v-model="formModel.manualCert" placeholder="手工凭证" :size="btnsize" :maxlength="25"></el-input>
        </el-form-item>
        <el-form-item label="摘要">
          <el-input v-model="formModel.remark" placeholder="摘要" :size="btnsize" :maxlength="50"></el-input>
        </el-form-item>
        <el-form-item>
        </el-form-item>
      </div>
      <div class="income_item_line"></div>
      <div class="income_item_row">
        <p style="margin-left: 15px;">图片上传
          <el-tag :size="btnsize">注：最多可上传5张图片，每张图片不能大于5M</el-tag>
        </p>
        <el-form-item class="clearfix">
          <div class="clearfix uploadcard">
            <Upload :title="'本地上传'" :showFileList="true" :limit="5" listtype="picture" v-model="formModel.picsPath" :disabled="isCheck" />
          </div>
        </el-form-item>
      </div>
      <div class="income_item_line"></div>
    </el-form>
    <span slot="footer">
          <el-button type="primary" @click="submitForm('formModel')" plain icon="el-icon-document">保存</el-button>
          <el-button type="success" @click="submitForm('formModel', 'print')" plain icon="el-icon-printer">保存并打印</el-button>
          <el-button type="warning" @click="setting" plain icon="el-icon-setting">设置财务科目</el-button>
          <el-button type="danger" @click="closeMe" plain icon="el-icon-circle-close">取消</el-button>
        </span>
  </el-dialog>
</template>
<script>
import SelectTree from '@/components/selectTree/index'
import Upload from '@/components/Upload/singleImage2'
import { parseTime } from '@/utils/'
import { postVerificationBaseInfo, postAddIncome, postBillRecordDetailList, getVeryficationList, getFinanceSubjects } from '@/api/finance/financeDaily'
import { REGEX } from '@/utils/validate'
export default {
  components: {
    SelectTree,
    Upload
  },
  props: {
    popVisible: {
      type: Boolean,
      default: false
    },
    info: {
      type: Object,
      default: () => {}
    },
    isModify: {
      type: Boolean,
      default: false
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
    isModify: {
      handler(cval, oval) {
        if (cval) {

        }
      },
      immediate: true
    },
    info: {
      handler(cval, oval) {
        if (cval) {}
      }
    }
  },
  computed: {
    isShow: {
      get() {
        return this.popVisible
      },
      set() {}
    },
    isCheck: {
      get() {
        return false
        // return this.isModify
      },
      set() {}
    }
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
      subjectOne: [],
      subjectTwo: [],
      subjectThree: [],
      subjectFour: [],
      verificationWay: [],
      btnsize: 'mini',
      dialogTitle: '记账凭证',
      loading: true,
      formModel: {
        picsPath: '',
        paymentsType: '1'
      },
      rules: {
        amount: [{ required: true, message: '不能为空', trigger: 'blur' }],
        verificationId: [{ required: true, message: '不能为空', trigger: 'blur' }],
        subjectOneId: [{ required: true, message: '不能为空', trigger: 'blur' }],
        receiptNo: [{ validator: numberAndWordValid, trigger: 'blur' }],
        invoiceNo: [{ validator: numberAndWordValid, trigger: 'blur' }],
        checkNo: [{ validator: numberAndWordValid, trigger: 'blur' }],
        manualCert: [{ validator: numberAndWordValid, trigger: 'blur' }]
      },
      formModelTitle: '现金记账凭证【出纳】',
      searchQuery: {
        orgId: ''
      },
      searchQuerySub: {
        orgId: '',
        parentId: '',
        subjectLevel: ''
      }
    }
  },
  methods: {
    init() {
      this.verificationWay = []
      this.isShow = true
      this.searchQuery.orgId = this.otherinfo.orgid
      this.searchQuerySub.orgId = this.otherinfo.orgid
      if (this.isModify) {
        // 根据id获取当前日记账信息
        this.formModel = Object.assign({}, this.info)
        console.log('paymentsType', this.formModel.paymentsType)
        this.$set(this.formModel, 'paymentsType', this.formModel.paymentsType + '')
        this.initSubject()
        this.getVeryficationList()
        this.loading = false
      } else {
        this.getBaseInfo()
        this.getFinanceSubjects()
      }
      console.log('formModel', this.formModel)
    },
    getVeryficationList() { // 去向列表
      getVeryficationList({ orgId: this.otherinfo.orgid }).then(data => {
          if (data) {
            this.verificationWay = data
          }
        })
        .catch(err => {
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
    getBaseInfo() {
      return postVerificationBaseInfo(this.searchQuery).then(data => {
          if (data) {
            this.formModel = data
            this.formModel.orgId = this.otherinfo.orgid
            this.formModel.paymentsType = this.$options.data().formModel.paymentsType
            this.verificationWay = data.verificationList
            console.log('getBaseInfo', data)
            this.loading = false
          }
        })
        .catch(err => {
          this._handlerCatchMsg(err)
          this.loading = false
        })

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
          console.warn('subjectTwoRule3', this.subjectTwoRule)
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
      console.warn('getFinanceSubjects 科目', subjectLevel, parentId)
      for(let item in this.formModel) {
        if (/^subject/.test(item)) {
          console.log(item, this.formModel[item])
        }
      }
      this.searchQuerySub.subjectLevel = subjectLevel || ''
      this.searchQuerySub.parentId = parentId || ''
      return getFinanceSubjects(this.searchQuerySub).then(data => {
          switch (subjectLevel) {
            case 2:
              this.subjectTwo = data
              this.subjectThree = []
              this.subjectFour = []
              console.log('科目二: ', this.subjectTwo)
              this.subjectTwo.forEach((e, index) => {
                console.log(index, e.id)
              })
              break
            case 3:
              this.subjectThree = data
              this.subjectFour = []
              console.log('科目三: ', this.subjectThree)
              this.subjectThree.forEach((e, index) => {
                console.log(index, e.id)
              })
              break
            case 4:
              this.subjectFour = data
              console.log('科目四: ', this.subjectFour)
              this.subjectFour.forEach((e, index) => {
                console.log(index, e.id)
              })
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
        })
        .catch(err => {
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
    selectVerificationWay(val) { // 选择去向
      console.log('selectVerificationWay', val)
      let obj = Object.assign({}, this.verificationWay.filter(e => {
        return e.id === val
      })[0])
      this.formModel.verificationWay = obj.verificationWay
      console.log(this.formModel)
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
    submitForm(formName, type) {
      if (!this.formModel.certNo) {
        this.$message.error('缺少凭证编号')
        this.postVerificationBaseInfo()
        return
      }
      if (!this.checkSubjectIsNull()) {
        return
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true
          let query = Object.assign({}, this.formModel)
          if (!query.certTime) {
            query.certTime = new Date()
          }
          this.$set(query, 'certTime', parseTime(query.certTime, '{y}-{m}-{d} {h}:{i}:{s}'))
          this.$set(query, 'dataSrc', query.id ? query.dataSrc : 1) // (数据)来源 ,0  核销产生, 1 手工录入
          if (!this.isModify) {
            this.$set(query, 'orderList', [])
            // 添加的时候 需要创建一个空的详情列表
            query.orderList.push({
              shipLoadId: '',
              manualAmount: query.amount,
              subjectName: '',
              subjectId: ''
            })
          }
          if (type) { // 打印
            this.$message.warning('暂无此功能~')
          }
          console.log('query:::', query)
          delete query.verificationList
          postAddIncome(query).then(data => {
              query = {}
              this.closeMe()
              this.$message.success('记账成功！')
              this.$emit('success')
              this.loading = false
            })
            .catch(err => {
              this._handlerCatchMsg(err)
              this.loading = false
            })
        }
      })
    },
    setting() {
      this.$router.push({ path: '/finance/financeInfo/subjectInfo' })
    },
    closeMe() {
      this.$emit('close')
      if (typeof done === 'function') {
        done()
      }
    }
  }
}

</script>
<style lang="scss">
.formItemTextDanger {
  .el-form-item__label {
    color: #ef0000;
  }
}

</style>
