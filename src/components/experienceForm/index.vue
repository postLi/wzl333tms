<template>
  <!--  -->
  <el-dialog :title="titlePop" :visible.sync="isShow" :close-on-click-modal="false" append-to-body :before-close="closeMe" class="tms_experience">
    <el-form :inline="true" ref="formModel" :model="formModel" class="demo-form-inline" :rules="rules" :size="btnsize" label-width="130px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="公司名称" prop="orgName">
            <el-input v-model="formModel.orgName" placeholder="公司名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="联系人" prop="name">
            <el-input v-model="formModel.name" placeholder="联系人" maxlength="30"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="联系手机" prop="username">
            <el-input v-model="formModel.username" placeholder="联系手机" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="客服电话" prop="servicePhone">
            <el-input v-model="formModel.servicePhone" placeholder="客服电话" maxlength="25"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="地址" prop="city">
            <querySelect filterable show="select" @change="getCity" search="longAddr" valuekey="longAddr" type="city" v-model="formModel.city" :remote="true" clearable/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="详细地址" prop="detailedAddr">
            <el-input v-model="formModel.detailedAddr" placeholder="详细地址"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="统一社会信用代码" prop="socialCreditCode">
            <el-input v-model="formModel.socialCreditCode" placeholder="统一社会信用代码"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="12" class="tms_experience_picture">
        <el-col :span="24">
          <p class="upload-title">上传证件</p>
        </el-col>
        <el-col :span="16">
          <el-form-item>
            <upload twocode tip="（有年检章，jpg/png。小于5M）" v-model="formModel.checkChapterYear" class="checkChapterYear" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item>
            <upload twocode title="法人身份证正面" v-model="formModel.idCardFront" />
          </el-form-item>
          <el-form-item>
            <upload twocode title="法人身份证反面" v-model="formModel.idCardReverse" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button @click="closeMe">取消</el-button>
  </span>
  </el-dialog>
</template>
<script>
import { completeTheInformation } from '@/api/common'
import Upload from '@/components/Upload/singleImage'
import querySelect from '@/components/querySelect/city'
export default {
  props: {
    popVisible: {
      type: Boolean,
      default: false
    },
    info: {
      type: String,
      default: ''
    }
  },
  components: {
    Upload,
    querySelect
  },
  data() {
    return {
      btnsize: '',
      titlePop: '完善资料',
      rules: {
        orgName: [{ required: true, message: '不能为空', trigger: 'change' }],
        city: [{ required: true, message: '不能为空', trigger: 'change' }],
        username: [{ required: true, message: '不能为空', trigger: 'change' }],
        socialCreditCode: [{ required: true, message: '不能为空', trigger: 'change' }]
      },
      orgiInfo: {
        orgName: '', // 公司名称
        username: '', // 联系手机
        name: '' // 联系人
      },
      formModel: {
        orgName: '', // 公司名称
        username: '', // 联系手机
        name: '', // 联系人
        city: '', // 地址
        servicePhone: '', // 客户电话
        detailedAddr: '', // 详细地址
        checkChapterYear: '', // 有年检章url
        idCardFront: '', // 身份证正面url
        idCardReverse: '', // 身份证背面url
        socialCreditCode: '' // 统一社会信用代码
      }
    }
  },
  computed: {
    isShow: {
      get() {
        if (this.popVisible) {
          this.init()
        }
        return this.popVisible
      },
      set() {}
    }
  },
  methods: {
    getExperienceInfo() {
      if (sessionStorage.getItem('TMS_experience_info')) {
        this.orgiInfo = JSON.parse(sessionStorage.getItem('TMS_experience_info'))
        this.$set(this.formModel, 'orgName', this.orgiInfo.orgName)
        this.$set(this.formModel, 'username', this.orgiInfo.username)
      }
    },
    init() {
      this.getExperienceInfo()
    },
    postData() {
      // 体验系统_完善资料 提交
      return completeTheInformation(this.formModel).then(data => {
          this.$message.success('提交成功')
          if (sessionStorage.getItem('TMS_experience_info')) {
            sessionStorage.setItem('TMS_experience_info', null)
          }
          if (sessionStorage.getItem('TMS_experience_system') === 'yes') {
            sessionStorage.setItem('TMS_experience_system', 'no')
          }
          const query = {
            username: this.formModel.username,
            password: '123456'
          }
          this.changeLogin(query)
        })
        .catch(err => {
          this._handlerCatchMsg(err)
          setTimeout(() => {
            if (sessionStorage.getItem('TMS_experience_system') === 'yes') {
              sessionStorage.setItem('TMS_experience_system', 'no')
              this.logout()
            }
          }, 1000)
        })
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      }).catch((err) => {
        location.reload()
      })
    },
    changeLogin(query) {
      this.$store.dispatch('Login', query).then(() => {
        location.href = '/'
        this.closeMe()
      }).catch((error) => {
        this._handlerCatchMsg(error)
      })
    },
    onSubmit() {
      this.$refs.formModel.validate(valid => {
        if (valid) {
          this.postData()
        }
      })
    },
    getCity(city) {
      this.$set(this.formModel, 'city', city ? city.longAddr : city)
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
<style lang="scss">
.tms_experience {
  .el-dialog {
    width: 80%;
    max-width: 1189px;
    min-width: 700px;
    margin-top: 84px !important;
    .el-dialog__header {
      background-color: #E6E6E6;
      padding: 20px 34px 16px;
    }
    .el-dialog__body {
      padding: 20px 20px 10px;
    }
    .el-dialog__footer {
      padding: 20px;
      background-color: #E6E6E6;
      .el-button {
        width: 120px;
        height: 48px;
      }
    }
  }
  .el-col-8 {
    .el-form-item {
      display: flex;
      flex-direction: row;
      .el-form-item__content {
        width: 100%;
        margin-left: 11px;
      }
    }
  }
  .el-form--inline .el-form-item__content {
    width: 100%;
    .el-select {
      width: 100%;
    }
  }
  .el-form-item {
    margin-bottom: 15px;
    width: 100%;
    .el-input.is-disabled .el-input__inner {
      background-color: #fff;
      color: #333333;
    }
  }

  .tms_experience_picture {
    .upload-title {
      font-size: 18px;
      margin: 20px 0;
      padding: 0;
    }
    .el-form-item {
      width: 100%;
      .el-form-item__content {
        width: 100%;
      }
    }
    .upload-container {
      height: 170px;
      .el-button {
        margin-top: 15px;
      }
    }
    .checkChapterYear {
      height: 355px;
      .el-button {
        margin-top: 140px;
      }
    }
  }
}

</style>
