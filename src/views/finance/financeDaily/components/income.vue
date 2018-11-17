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
          <el-select clearable v-model="formModel.paymentsType" filterable placeholder="请选择" :size="btnsize">
            <el-option v-for="(value, key) in $const.SETTLEMENT_ID" :value="key" :key="key" :label="value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="凭证日期" prop="certTime">
          <el-date-picker v-model="formModel.certTime" type="date" :size="btnsize" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="去向">
          <el-select clearable v-model="formModel.verificationWay" filterable placeholder="请选择" :size="btnsize">
            <el-option v-for="(wayItem, wayIndex) in verificationWay" :key="wayIndex" :label="wayItem.verificationWay" :value="wayItem.id">
            </el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="income_item">
        <el-form-item label="一级科目">
          <el-select clearable v-model="formModel.subjectOneId" filterable placeholder="请选择" :size="btnsize" @change="val => selectSubject(val,1)">
            <el-option v-for="(item, index) in subjectOne" :key="index" :label="item.subjectName" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级科目">
          <el-select clearable v-model="formModel.subjectTwoId" filterable placeholder="请选择" :size="btnsize" @change="val => selectSubject(val,2)">
            <el-option v-for="(item, index) in subjectTwo" :key="index" :label="item.subjectName" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="三级科目">
          <el-select clearable v-model="formModel.subjectThreeId" filterable placeholder="请选择" :size="btnsize" @change="val => selectSubject(val,3)">
            <el-option v-for="(item, index) in subjectThree" :key="index" :label="item.subjectName" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="income_item">
        <el-form-item label="四级科目">
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
        <el-form-item label="发生金额" prop="amount">
          <el-input v-model.number="formModel.amount" placeholder="发生金额" :size="btnsize" :maxlength="8"></el-input>
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
import { postVerificationBaseInfo, postAddIncome, postBillRecordDetailList, getVeryficationList, getFinanceSubjects } from '@/api/finance/financeDaily'
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
        if (cval) {
        }
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
        picsPath: ''
      },
      rules: {
        amount: [{ required: true, message: '不能为空', trigger: 'blur' }]
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
        this.formModel = Object.assign({}, this.info)
        this.$set(this.formModel, 'paymentsType', this.formModel.paymentsType +'')
        this.getVeryficationList()
        this.initSubject()
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
      this.getFinanceSubjects().then(() => {
        if (this.formModel.subjectOneId) {
          this.getFinanceSubjects(2, this.formModel.subjectOneId).then(() => {
            if (this.formModel.subjectTwoId) {
              this.getFinanceSubjects(3, this.formModel.subjectTwoId).then(() => {
                if (this.formModel.subjectThreeId) {
                  this.getFinanceSubjects(4, this.formModel.subjectThreeId)
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
    getFinanceSubjects(subjectLevel, parentId) {
      console.warn('getFinanceSubjects 科目', subjectLevel, parentId)
      this.searchQuerySub.subjectLevel = subjectLevel || ''
      this.searchQuerySub.parentId = parentId || ''

      return getFinanceSubjects(this.searchQuerySub).then(data => {
          switch (subjectLevel) {
            case 2:
              this.subjectTwo = data
              this.subjectThree = []
              this.subjectFour = []
              console.log('科目二: ', this.subjectTwo)
              break
            case 3:
              this.subjectThree = data
              this.subjectFour = []
              console.log('科目三: ', this.subjectThree)
              break
            case 4:
              this.subjectFour = data
              console.log('科目四: ', this.subjectFour)
              break
            default:
              this.subjectOne = data
              this.subjectTwo = []
              this.subjectThree = []
              this.subjectFour = []
              console.log('科目一: ', this.subjectOne)
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
    submitForm(formName, type) {
      if (!this.formModel.certNo) {
        this.$message.error('缺少凭证编号')
        this.postVerificationBaseInfo()
        return
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true
          let query = Object.assign({}, this.formModel)
          this.$set(query, 'dataSrc', query.id ? query.dataSrc : 1) // (数据)来源 ,0  核销产生, 1 手工录入
          this.$set(query, 'orderList', [])
          // if (this.isModify) {
          //   // 修改的时候 需要获取详情列表
          //   let detailSearchQuery = {
          //     currentPage: 1,
          //     pageSize: 100,
          //     vo: {
          //       recordId: this.formModel.id,
          //       orgId: this.formModel.orgId
          //     }
          //   }
          //   postBillRecordDetailList(detailSearchQuery).then(data => {
          //     if (data) {
          //       this.$set(query, 'orderList', data.list)
          //     } else { // 如果没有详情列表就创建一个空的详情列表
          //       query.orderList.push({
          //         manualAmount: query.amount,
          //         subjectId: '',
          //         subjectName: ''
          //       })
          //     }
          //   })
          // } else {
          // 添加的时候 需要创建一个空的详情列表
          query.orderList.push({
            shipLoadId: '',
            manualAmount: query.amount,
            subjectName: '',
            subjectId: ''
          })
          // }
          if (type) { // 打印
            this.$message.warning('暂无此功能~')
          }
          console.log('query:::', query)
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
