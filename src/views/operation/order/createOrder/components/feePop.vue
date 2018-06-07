<template>
  <el-dialog
    title="费用设置"
    :visible="dialogVisible"
    custom-class="feeSetupDialog"
    :close-on-click-modal="false"
    :modal-append-to-body="false"
    width="30%"
    :before-close="close">
    <span>这是一段信息</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="close">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      
    }
  },
  methods: {
    close(done){
      this.$emit('update:dialogVisible', false)
      this.$emit('close')
      if(done){
        done()
      }
    }
  }
}
</script>
