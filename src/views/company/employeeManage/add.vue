<template>
  <el-dialog :title="popTitle" :visible.sync="isShow" :close-on-click-modal="false" :before-close="closeMe" class="addEmployeerPop">
    <el-form :model="form" :inline="true" label-position="right" size="mini">
      <el-form-item label="用户姓名" :label-width="formLabelWidth">
        <el-input v-model="form.username" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机号码" :label-width="formLabelWidth">
        <el-input v-model="form.mobilephone" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="登录账号" :label-width="formLabelWidth">
        <el-input v-model="form.loginAccount" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="职位" :label-width="formLabelWidth">
        <el-input v-model="form.position" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="性别" :label-width="formLabelWidth">
        <el-select v-model="form.sexFlag" placeholder="请选择性别">
          <el-option label="男" value="0"></el-option>
          <el-option label="女" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="归属网点" :label-width="formLabelWidth">
         <el-select v-model="form.orgId" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="权限角色" :label-width="formLabelWidth">
        <el-select v-model="form.rolesId" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="归属部门" :label-width="formLabelWidth">
        <el-select v-model="form.departmentId" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div class="info">注：密码默认为：123456。</div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeMe">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
    </div>
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
  computed: {
    isShow: {
      get () {
        return this.popVisible
      },
      set () {

      }
    }
  },
  data () {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '80px',
      popTitle: '新增员工'
    }
  },
  methods: {
    closeMe (done) {
      this.$emit('close')
      if(typeof done === 'function'){
        done()
      }
    },
  }
}
</script>
<style lang="scss">
.addEmployeerPop{
  left: auto;
  top: 50px;
  bottom: auto;
  height: 100%;

  .el-dialog {
    min-width: 600px;
    max-width:  600px;
    margin-top: 0 !important;
    height: calc( 100% - 50px);
  }
  .el-select .el-input__inner{
    padding-right: 15px;
  }
}
</style>

