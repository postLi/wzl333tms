<template>
  <el-dialog :title="dialogTitle" v-loading="loading" :visible.sync="isShow" :close-on-click-modal="false" :before-close="closeMe" class="tms_dialog voucherDialog">
    <el-form ref="formModel" :model="formModel" :rules="rules" :inline="true">
      <el-row>
        <el-form-item label="记账网点">
        </el-form-item>
        <el-form-item label="凭证编号">
          <el-input v-model="formModel.user" placeholder="审批人" :size="btnsize"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="记账方向">
        </el-form-item>
        <el-form-item label="凭证日期">
          <el-input v-model="formModel.user" placeholder="审批人" :size="btnsize"></el-input>
        </el-form-item>
        <el-form-item label="去向">
          <el-input v-model="formModel.user" placeholder="审批人" :size="btnsize"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="记账方向">
        </el-form-item>
        <el-form-item label="凭证日期">
          <el-input v-model="formModel.user" placeholder="审批人" :size="btnsize"></el-input>
        </el-form-item>
        <el-form-item label="去向">
          <el-input v-model="formModel.user" placeholder="审批人" :size="btnsize"></el-input>
        </el-form-item>
      </el-row>
    </el-form>
  </el-dialog>
</template>
<script>
export default {
  props: {
    popVisible: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    popVisible: {
      handler(cval, oval) {
        if (cval) {
          this.isShow = true
        }
      },
      immediate: true
    }
  },
  computed: {
    isShow: {
      get() {
        return this.popVisible
      },
      set() {}
    }
  },
  data() {
    return {
      btnsize: 'mini',
      dialogTitle: '记账凭证',
      loading: false,
      formModel: {},
      rules: {}
    }
  },
  methods: {
    closeMe() {
      this.$emit('close')
      if (typeof done === 'function') {
        done()
      }
    }
  }
}

</script>
