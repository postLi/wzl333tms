<template>
  <el-dialog title="收货地址" :visible.sync="dialogVisible">
    <el-steps :active="active" finish-status="success">
      <el-step title="步骤 1">
        <el-form :model="formA">
          <el-form-item label="账号" :label-width="formLabelWidth">
            <el-input v-model="formA.username" autocomplete="off" placeholder="请输入账号"></el-input>
          </el-form-item>
        </el-form>
      </el-step>
      <el-step title="步骤 2"></el-step>
      <el-step title="步骤 3"></el-step>
    </el-steps>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      active: 1,
      formLabelWidth: '100px',
      formA: {
        username: ''
      }
    }
  },
  prop: {
    popVisible: {
      type: Boolean,
      default: false
    },
  },
  computed: {
    dialogVisible: {
      get() {
          return this.popVisible
        },
        set() {}
    }
  },
  methods: {

  }
}

</script>
