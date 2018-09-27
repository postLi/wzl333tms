<template>
  <el-dialog :title="popTitle" v-loading="loading" :visible.sync="isShow" :close-on-click-modal="false" :before-close="closeMe" class="tms_dialog tms_dialog_alignleft" width="500px">
    <el-form ref="formModel" :model="formModel" :rules="rules">
      <el-form-item prop="modifySign">
        <el-input v-model="formModel.modifySign" placeholder="请输入短信前缀" :disabled="isEdit" :maxlength="25" :minlength="1"></el-input>
      </el-form-item>
      <p><b>系统默认前缀为公司名称：</b><br><br><el-tag size="mini">例如</el-tag> 【公司名称】您在某某网点托运的5件电脑，已成功受理，运单号：123445554.</p>
    </el-form>
    <div slot="footer">
      <el-button type="primary" @click="submitForm('formModel')" v-if="!isEdit">确 定</el-button>
      <el-button @click="closeMe">取 消</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { createSmsSign, postSmsSign } from '@/api/company/sms'
export default {
  props: {
    popVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      popTitle: '定制专属签名',
      loading: true,
      isEdit: false,
      formModel: {
        id: '',
        modifySign: '',
        companyId: ''
      },
      rules: {
        modifySign: [{required: true, message: '不能为空', trigger: 'change'}]
      },
      isShow: false
    }
  },
  watch: {
    popVisible (newVal) {
      this.isShow = newVal
      if (newVal) {
         this.postSmsSign()
      }
    }
  },
  methods: {
    postSmsSign () {
      /**
       * 审核状态: 审核中 审核通过 审核不通过
       */
      postSmsSign(this.otherinfo.orgid).then(data => {
        if (data) {
          this.formModel.modifySign = data.data.modifySign
          this.formModel.id = data.data.id
          this.isEdit = data.data.modifyCount === 1 && data.data.applyStatusZh !== '审核不通过'
        }
      })
      .catch(err => {
        this._handlerCatchMsg(err)
      })
    },
    closeMe(done) {
      this.$emit('close')
      if (typeof done === 'function') {
        done()
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.formModel.companyId = this.otherinfo.companyId
          createSmsSign(this.formModel).then(data => {
            this.$message.success('添加专属签名成功！')
            this.$emit('success')
            this.closeMe()
          })
        }
      })
    }
  }
}

</script>
