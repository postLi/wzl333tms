<template>
  <el-dialog title="收货地址" :visible.sync="dialogVisible" :close-on-click-modal="false" :before-close="closeMe" width="800px">
    <el-steps :active="active" finish-status="success"  align-center simple>
      <el-step title="步骤 1" :description="desA"></el-step>
      <el-step title="步骤 2" :description="desB"></el-step>
      <el-step title="步骤 3" :description="'请为你的账号'+formA.username+'设置一个新密码'"></el-step>
    </el-steps>
    <div>
      <el-form :model="formA" :label-width="formLabelWidth" v-if="active === 0" :size="formSize">
        <el-form-item label="账号">
          <el-input v-model="formA.username" autocomplete="off" placeholder="请输入账号"></el-input>
        </el-form-item>
      </el-form>
      <el-form :model="formB" :label-width="formLabelWidth" v-if="active === 1" :size="formSize">
        <el-form-item label="手机号">
          <el-input v-model="formB.phone" autocomplete="off" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="短信验证码">
          <el-input v-model="formB.code" autocomplete="off" placeholder="请输入短信验证码"></el-input>
        </el-form-item>
      </el-form>
      <el-form :model="formC" :label-width="formLabelWidth" v-if="active === 2" :size="formSize">
        <el-form-item label="新密码">
          <el-input v-model="formC.newPassword" autocomplete="off" placeholder="请设置6-15位(可数字+字母)"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer" style="text-align: center;">
      <el-button :type="active > 2 ?'success' : 'primary'" style="margin-top: 12px;" @click="next">{{active > 2 ?'保存':'下一步'}}</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      active: 0,
      formLabelWidth: '100px',
      formSize: 'mini',
      formA: {
        username: ''
      },
      formB: {
        username: '',
        phone: '',
      },
      formC: {
        username: '',
        newPassword: '',
        successFlag: ''
      },
      desA: '请填写你要找回的密码的账号',
      desB: '请填写手机号码',
    }
  },
  props: {
    popVisible: {
      type: Boolean,
      default: false
    },
  },
  watch: {
    popVisible: {
      handler (cval, oval) {
        if (cval) {
          this.init()
        }
      },
      immediate: true
    }
  },
  computed: {
    dialogVisible: {
      get() {
        console.log(6666, this.popVisible)
        return this.popVisible
      },
      set() {}
    }
  },
  methods: {
    init () {
      this.active = 0
      this.formA = Object.assign({}, this.$options.data().formA)
      this.formB = Object.assign({}, this.$options.data().formB)
      this.formC = Object.assign({}, this.$options.data().formC)
    },
    next() {
      if (this.active++ > 2) this.active = 0
    },
    closeMe() {
      this.$emit('update:popVisible', false)
    }
  }
}

</script>
