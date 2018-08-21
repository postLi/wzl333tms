<template>
  <div class="add-dot" v-loading="loading">
  <pop-right :title='popTitle' :isShow="popVisible" @close="closeMe" class='addEmployeerPop'>
    <template class='addEmployeerPop-content' slot="content">

<!-- 本网点是父级时显示 -->
          <el-form :model="form" :rules="rules"  ref="ruleForm"  class="demo-ruleForm" :inline="true" label-position="right" size="mini" :show-message="checkShowMessage" :key="formKey" v-if="companyId === form.id">
            <el-form-item label="公司名称" :label-width="formLabelWidth" prop="orgName" >
              <el-input v-model="form.orgName" auto-complete="off" :disabled="companyId === form.id || form.status===31 " :maxlength="15" ></el-input>
            </el-form-item>
            <el-form-item label="总公司" :label-width="formLabelWidth" >
              <el-select v-model="form.orgType" :disabled="companyId === form.id || form.status===31">
                <el-option v-for="item in netWorkType" :key="item.id" :label="item.dictName" :value="item.id"  ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="公司状态" :label-width="formLabelWidth" disabled="disabled">
              <el-select v-model="form.status" :disabled="!isModify && companyId === form.id || form.status===31 ? false : true"  >
                <el-option label="有效" :value="32"></el-option>
                <el-option label="无效" :value="31"></el-option>
              </el-select>
            </el-form-item>
              <el-form-item label="公司代码" :label-width="formLabelWidth" prop="networkCode" >
              <el-input v-model="form.networkCode" auto-complete="off " :disabled="form.status===31 || companyId === form.id" :maxlength="10" clearable></el-input>
            </el-form-item>

            <!-- <el-form-item label="上级网点" :label-width="formLabelWidth">
              <SelectTree v-model="form.parentId"  :disabled="isModify || form.status===31" />
            </el-form-item> -->
            <!-- <el-form-item label="经营类型" :label-width="formLabelWidth">
              <el-select v-model="form.manageType" :disabled="form.status===31" >
                <!--<el-option v-for="item in manageType" :key="item.id" :label="item.dictName" :value="item.id"></el-option>
                <el-option label="自营" :value="3"></el-option>
                <el-option label="加盟" :value="4"></el-option>
              </el-select>
            </el-form-item> -->
            <!-- <el-form-item label="创建时间" v-if="isModify" :label-width="formLabelWidth">
              <el-input  :value="form.createTime | parseTime('{y}/{m}/{d}')" :disabled="isModify || form.status===31" ></el-input>
            </el-form-item> -->
            <el-form-item label="负责人" :label-width="formLabelWidth" prop="responsibleName" >
              <el-input v-model="form.responsibleName" auto-complete="off" :disabled="form.status===31" clearable></el-input>
            </el-form-item>
            <el-form-item label="负责人电话" :label-width="formLabelWidth" prop="responsibleTelephone">
              <el-input  v-model="form.responsibleTelephone"  auto-complete="off" :disabled="form.status===31" ></el-input>
            </el-form-item>

            <el-form-item label="客服人员" :label-width="formLabelWidth" prop="serviceName">
              <el-input v-model="form.serviceName" auto-complete="off" :disabled="form.status===31" clearable></el-input>
            </el-form-item>
            <el-form-item label="客服电话" :label-width="formLabelWidth"  clearable>
              <el-input v-model="form.servicePhone" auto-complete="off" :disabled="form.status===31"></el-input>
            </el-form-item>
            <el-form-item label="所在城市" :label-width="formLabelWidth" prop="city" >


              <querySelect filterable show="select" @change="getCity" search="longAddr" valuekey="longAddr"  :disabled="companyId === form.id || form.status===31" type="city"  v-model="form.city" :remote="true" clearable  />


            </el-form-item>
            <el-form-item label="详细地址" :label-width="formLabelWidth">
              <el-input v-model="form.detailedAddr" auto-complete="off" :disabled="form.status===31" ></el-input>
            </el-form-item>

            <!-- <el-form-item label="代收款限额" :label-width="formLabelWidth" prop="">
              <el-input v-model="form.collectionFee" auto-complete="off" :maxlength="9" :disabled="form.status===31" v-number-only ></el-input>
            </el-form-item>
            <el-form-item label="提现基准" :label-width="formLabelWidth" prop="">
              <el-input v-model="form.benchmark"  auto-complete="off" :disabled="form.status===31" v-number-only ></el-input>
            </el-form-item>
            <el-form-item label="预警额度" :label-width="formLabelWidth" prop="">
              <el-input v-model="form.warningQuota" auto-complete="off" :maxlength="9" :disabled="form.status===31" v-number-only ></el-input>
            </el-form-item>
            <el-form-item label="锁机额度" :label-width="formLabelWidth" prop="">
              <el-input v-model="form.lockMachineQuota" auto-complete="off" v-number-only :maxlength="9" :disabled="form.status===31" ></el-input>
            </el-form-item>

            <div class="ad-add-dot" v-if="!isModify">
              <el-checkbox :true-label="0" :false-label="1" v-model="form.accountStatus">开通管理员账号</el-checkbox>
              <p> 密码：123456</p>
            </div>
            <el-form-item v-if="form.accountStatus === 0 && !isModify" :label-width="formLabelWidth" prop="">
              <el-input placeholder="管理员账号" v-model="form.accountName" auto-complete="off" :maxlength="20" ></el-input>
            </el-form-item>

            <div class="rem-add-dot">
              <el-form-item label="备注" :label-width="formLabelWidth" prop="">
                <el-input
                  type="textarea"
                  :rows="2"
                  placeholder="不可超300字"
                  v-model="form.remarks"
                  auto-complete="off" maxlength="300" ></el-input>
              </el-form-item>
            </div> -->
          </el-form>
                    <el-form :model="form" :rules="rules"  ref="ruleForm"  class="demo-ruleForm" :inline="true" label-position="right" size="mini" :show-message="checkShowMessage" :key="formKey" v-else>
            <el-form-item label="网点名称" :label-width="formLabelWidth" prop="orgName" >
              <el-input v-model="form.orgName" auto-complete="off" :disabled="form.status===31 " :maxlength="15" ></el-input>
            </el-form-item>
            <el-form-item label="网点类型" :label-width="formLabelWidth">
              <el-select v-model="form.orgType" >
                <el-option v-for="item in netWorkType" :key="item.id" :label="item.dictName" :value="item.id" :disabled="form.status===31" ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="网点状态" :label-width="formLabelWidth" disabled="disabled">
              <el-select v-model="form.status" :disabled="isModify ? false : true"  >
                <!--<el-option v-for="item in netWorkStatus" :key="item.id" :label="item.dictName" :value="item.id"></el-option>-->
                <el-option label="有效" :value="32"></el-option>
                <el-option label="无效" :value="31"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="上级网点" :label-width="formLabelWidth">
              <SelectTree @change="canadd" v-model="form.parentId"  :disabled="isModify || form.status===31" :orgid="form.parentId || otherinfo.orgid" />
            </el-form-item>
            <el-form-item label="经营类型" :label-width="formLabelWidth">
              <el-select v-model="form.manageType" :disabled="form.status===31" >
                <!--<el-option v-for="item in manageType" :key="item.id" :label="item.dictName" :value="item.id"></el-option>-->
                <el-option label="自营" :value="3"></el-option>
                <el-option label="加盟" :value="4"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="创建时间" v-if="isModify" :label-width="formLabelWidth">
              <el-input  :value="form.createTime | parseTime('{y}/{m}/{d}')" :disabled="isModify || form.status===31" ></el-input>
            </el-form-item>
            <el-form-item label="负责人" :label-width="formLabelWidth" prop="responsibleName" >
              <el-input v-model="form.responsibleName" auto-complete="off" :disabled="form.status===31" clearable></el-input>
            </el-form-item>
            <el-form-item label="负责人电话" :label-width="formLabelWidth" prop="responsibleTelephone">
              <el-input  v-model="form.responsibleTelephone"  auto-complete="off" :disabled="form.status===31" ></el-input>
            </el-form-item>
            <el-form-item label="所在城市" :label-width="formLabelWidth" prop="city" >


              <querySelect filterable show="select" @change="getCity" search="longAddr" valuekey="longAddr"  :disabled="form.status===31" type="city"  v-model="form.city" :remote="true" clearable  />


            </el-form-item>
            <el-form-item label="客服人员" :label-width="formLabelWidth" prop="serviceName">
              <el-input v-model="form.serviceName" auto-complete="off" :disabled="form.status===31" clearable></el-input>
            </el-form-item>
            <el-form-item label="客服电话" :label-width="formLabelWidth"  clearable>
              <el-input v-model="form.servicePhone" auto-complete="off" :disabled="form.status===31" ></el-input>
            </el-form-item>
            <el-form-item label="详细地址" :label-width="formLabelWidth">
              <el-input v-model="form.detailedAddr" auto-complete="off" :disabled="form.status===31" ></el-input>
            </el-form-item>
            <el-form-item label="网点代码" :label-width="formLabelWidth" prop="networkCode" >
              <el-input v-model="form.networkCode" auto-complete="off " :disabled="form.status===31" :maxlength="10" clearable></el-input>
            </el-form-item>
            <el-form-item label="代收款限额" :label-width="formLabelWidth" prop="">
              <el-input v-model="form.collectionFee" auto-complete="off" :maxlength="9" :disabled="form.status===31" v-number-only ></el-input>
            </el-form-item>
            <el-form-item label="提现基准" :label-width="formLabelWidth" prop="">
              <el-input v-model="form.benchmark"  auto-complete="off" :disabled="form.status===31" v-number-only ></el-input>
            </el-form-item>
            <el-form-item label="预警额度" :label-width="formLabelWidth" prop="">
              <el-input v-model="form.warningQuota" auto-complete="off" :maxlength="9" :disabled="form.status===31" v-number-only ></el-input>
            </el-form-item>
            <el-form-item label="锁机额度" :label-width="formLabelWidth" prop="">
              <el-input v-model="form.lockMachineQuota" auto-complete="off" v-number-only :maxlength="9" :disabled="form.status===31" ></el-input>
            </el-form-item>

            <div class="ad-add-dot" v-if="!isModify">
              <el-checkbox checked  v-model="form.accountStatus">开通管理员账号</el-checkbox>
              <p> 密码：123456</p>
            </div>
            <el-form-item v-if="form.accountStatus  && !isModify" :label-width="formLabelWidth" prop="accountName">

              <el-tooltip class="item" effect="dark" placement="top" :enterable="false" :manual="true" :value="tooltip" tabindex="-1">
                <div slot="content">账号可以由字母、数字组成<br/>长度范围2~15个字符</div>
                <el-input v-model.trim="form.accountName" auto-complete="off" @focus="tooltip = true" @blur="tooltip = false"></el-input>
              </el-tooltip>

              <!--<el-input placeholder="管理员账号" v-model="form.accountName" auto-complete="off" :maxlength="20" ></el-input>-->
            </el-form-item>

            <div class="rem-add-dot">
              <el-form-item label="备注" :label-width="formLabelWidth" prop="">
                <el-input

                  type="textarea"
                  :rows="2"
                  placeholder="不可超300字"
                  v-model="form.remarks"
                  auto-complete="off" :maxlength="300" ></el-input>
              </el-form-item>
            </div>
          </el-form>
      <div class="spanDiv" v-if="companyId !== form.id">
        <span>元</span>
        <span>元</span>
        <span v-if="isModify" class="span-hidden">元</span>
        <span v-if="!isModify"  class="span-last">元</span>
      </div>
    </template>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
            <el-button @click="closeMe">取 消</el-button>
          </div>
  </pop-right>
  </div>
</template>

<script>
  import { postOrgSaveDate, putOrgData, getNetWorkTypeInfo, getManageTypeInfo, getNetworkStatusInfo } from '../../../api/company/groupManage'
  import popRight from '@/components/PopRight/index'
  import SelectTree from '@/components/selectTree/index'
  import SelectCity from '@/components/selectCity/index'
  import querySelect from '@/components/querySelect/index'
  import { REGEX } from '../../../utils/validate'
  import { objectMerge2 } from '@/utils/index'
  // import {Obj}
  export default {
    components: {
      popRight,
      SelectTree,
      SelectCity,
      querySelect
    },
    props: {
      popVisible: {
        type: Boolean,
        default: false
      },
      isModify: {
        type: Boolean,
        default: false
      },
      dotInfo: Object,
      orgid: {
        type: Number
      },
      companyId: {
        type: Number
      },
      getCheckedKeyId :{
        type:Number
      }
    },
    computed: {
      isShow: {
        get() {
          return this.popVisible
        },
        set() {

        }
      }

    },
    watch: {
      'form.accountStatus': {
        handler() {
          this.form.accountName = ''
        }
      },
      popVisible(val) {
        if (val) {
          this.formKey = Math.random()
          // console.log(JSON.stringify(this.doInfo))
        }
        this.watchDate(this.doInfo)
      },
      getCheckedKeyId(val){

      },
      doInfo: {
        handler() {
          this.checkShowMessage = false
          this.watchDate(this.doInfo)
        },
        immediate: true,
        deep: true
      },

      isModify: {
        handler() {
          this.watchDate()
        },
        immediate: true
      }
    },
    data() {
      var callBackName = (rule, value, callback) => {
        callback()
      }
      return {
        tooltip: false,
        formKey: 'lll',
        popTitle: '新增网点',
        // 多选框
        checked: true,
        loading: false,
        checkShowMessage: false,
        netWorkType: [],
        manageType: [],
        netWorkStatus: [],
        // 验证
        isChecked: false,
        isCheckedShow: false,
        form: {
          orgName: '',
          orgType: 1,
          status: 32,
          responsibleTelephone: '',
          // createTime:'',
          responsibleName: '',
          city: '',
          serviceName: '',
          parentName: '', // 上级网点
          servicePhone: '',
          detailedAddr: '',
          networkCode: '', // 网点代码
          collectionFee: '', // 代收款额度
          benchmark: '',
          warningQuota: '',
          lockMachineQuota: '',
          manageType: 3,
          remarks: '',
          // 默认值
          accountStatus: true,
          // id: '',
          parentId: 0,
          createTime: '',
          id: '',
          accountName: ''  // 管理员账号

        },
        rules: {
          orgName: [
            { required: true, validator: this.validateIsEmpty('请输入网点名称') }
          ],
          responsibleName: [
            { validator: callBackName, trigger: 'blur' },
            { min: 2, message: '最少2个字符', trigger: 'blur' },
            { max: 10, message: '不可超过10个字符', trigger: 'blur' }
          ],
          responsibleTelephone: [
            { pattern: REGEX.MOBILE, message: '请输入正确的电话号码', trigger: ['blur', 'change'] }
          ],
          serviceName: [
            { validator: callBackName, trigger: 'blur' },
            { min: 2, message: '最少2个字符', trigger: 'blur' },
            { max: 10, message: '不可超过10个字符', trigger: 'blur' }
          ],
          // servicePhone: [
          //   { pattern: REGEX.TELEPHONE, message: '请输入正确的客服电话', trigger: ['blur', 'change'] }
          // ],
          // 网点代码
          networkCode: [
            { required: true, validator: this.validateIsEmpty('请输入网点代码') },
            { min: 2, message: '最少2个字符', trigger: 'blur' },
            { max: 10, message: '不可超过10个字符', trigger: 'blur' }
          ],
          city: [
            // 请选择城市
            { required: true, validator: this.validateIsEmpty('请选择城市') }
          ],
          accountName: [
            { required: true, message: '请输入有效的登录账号', pattern: REGEX.USERNAME },
            { max: 15, message: '不能超过15个字符', trigger: 'blur' }
          ],
        },
        dialogVisible: false,
        formLabelWidth: '120px'
      }
    },
    mounted() {
      this.watchDate()
      this.form.parentId = this.orgid || this.companyId
      Promise.all([getNetWorkTypeInfo(this.form.parentId), getManageTypeInfo(this.form.parentId), getNetworkStatusInfo(this.form.parentId)]).then(resArr => {
        this.loading = false
        this.netWorkType = resArr[0]
        this.manageType = resArr[1]
        this.netWorkStatus = resArr[2]
      })
    },
    methods: {
      canadd(val, item) {
        if (item && item.index && item.index >= 5) {
          this.$message.info('添加的层级数不能超过5层，请重新选择~')
          this.form.parentId = this.otherinfo.companyId
        }
      },
      watchDate() {
        for (const i in this.form) {
          this.form[i] = ''
        }
        if (this.isModify) {
          this.popTitle = '修改网点'
          this.changeDate(this.dotInfo)
          this.form.id = this.dotInfo.id
          this.form.parentId = this.dotInfo.parentId || this.companyId
        } else {
          this.popTitle = '新增网点'
          if (this.form.id) {
            delete this.form.id
          }
          delete this.form.createTime
          this.form.orgType = 1
          this.form.status = 32
          this.form.manageType = 3
          // this.form.parentId = this.companyId
          this.form.parentId = this.getCheckedKeyId || this.companyId
        }
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
      getCity(city) {
        this.form.city = city ? city.longAddr : city
      },
      getOrgid(id) {
        this.form.parentId = id
      },
      reset() {
        this.$refs['ruleForm'].resetFields()
      },
      closeMe(done) {
        this.$emit('close')
        this.reset()
        if (typeof done === 'function') {
          done()
        }
      },
      submitForm(formName) {
        this.isChecked = true
        this.isCheckedShow = false
        this.checkShowMessage = true
        this.$refs[formName].validate((valid) => {
          this.isChecked = false
          this.isCheckedShow = false
          if (valid) {
            this.loading = true
            let reqPromise
            if (this.isModify) {
              // 当修改最上级网点时，传0
              if (this.form.id === this.form.parentId && this.form.parentId === this.otherinfo.companyId) {
                this.form.parentId = 0
              }
              this.form.id = this.dotInfo.id
              this.form.createTime = +new Date(this.form.createTime)
              reqPromise = putOrgData(this.form)
            } else {
              if (this.form.accountStatus === true) {
                this.form.accountStatus = 0
              } else {
                this.form.accountStatus = 1
              }
              reqPromise = postOrgSaveDate(this.form)
            }
            reqPromise.then(res => {
              this.loading = false
              this.$emit('success')
              this.$message.success('保存成功')
              this.closeMe()
            }).catch(err => {
              this.$message({
                type: 'error',
                message: err.errorInfo || err.text || '未知错误，请重试~'
              })
            })
          } else {
            this.$message({
              type: 'error',
              message: '保存失败'
            })
            return false
          }
        })
      },
      changeDate(item) {
        this.form.orgName = item.orgName
        this.form.responsibleTelephone = item.responsibleTelephone
        this.form.responsibleName = item.responsibleName
        this.form.city = item.city
        this.form.serviceName = item.serviceName
        this.form.parentName = item.parentName
        this.form.servicePhone = item.servicePhone
        this.form.detailedAddr = item.detailedAddr
        this.form.networkCode = item.networkCode
        this.form.collectionFee = item.collectionFee
        this.form.benchmark = item.benchmark
        this.form.warningQuota = item.warningQuota
        this.form.lockMachineQuota = item.lockMachineQuota
        this.form.remarks = item.remarks
        this.form.orgType = item.orgType
        this.form.status = item.status
        this.form.accountStatus = item.accountStatus
        this.form.manageType = item.manageType
        this.form.createTime = item.createTime
      }
    }
  }
</script>
<style type="text/css" lang="scss">
  @import "../../../styles/mixin.scss";
  @import "./addDot.css";
  .addEmployeerPop{
    left: auto;
    top: 50px;
    bottom: auto;
    min-width:600px;
    max-width:  600px;
    .popRight-content{
      padding: 20px 20px 0;
      box-sizing: border-box;
    }
    .el-select .el-input__inner{
      padding-right: 15px;
    }
  }

</style>

