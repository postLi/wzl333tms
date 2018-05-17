<template>
  <el-form :inline="true" :size="btnsize" label-position="right" :rules="rules" ref="searchFormRef" :model="searchForm" label-width="80px" class="staff_searchinfo clearfix">
      <el-form-item label="归属网点">
          <SelectTree @change="getOrgid" :groups="groups" :orgid="orgid" />
      </el-form-item>
      <el-form-item label="员工名称">
          <el-input
              placeholder="请输入姓名"
              v-model="searchForm.name"
              clearable>
          </el-input>
      </el-form-item>
      <el-form-item label="手机号码">
          <el-input
              placeholder="请输入手机号码"
              v-model="searchForm.mobile"
              clearable>
          </el-input>
      </el-form-item>
      <el-form-item class="staff_searchinfo--btn">
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button type="info" @click="clearForm('searchFormRef')" plain>清空</el-button>
      </el-form-item>
  </el-form>
</template>

<script>
import { validateMobile }  from '@/utils/validate'
import SelectTree from '@/components/selectTree/index'

export default {
  components: {
    SelectTree
  },
  props: {
    btnsize: {
      type: String,
      default: 'mini'
    },
    groups: {
      type: Array,
      default: []
    },
    orgid: {
      type: Number
    }
  },
  data () {
    const validateFormMobile = function (rule, value, callback) {
      if(validateMobile(value)){
        callback()
      } else {
        callback(new Error('请输入有效的手机号码'))
      }
    }

    const validateFormEmployeer = function (rule, value, callback) {
      callback()
    }

    return {
      searchForm: {
        orgid: this.orgid,
        name: '',
        mobile: ''
      },
      rules: {
        mobile: [{
          validator: validateFormMobile, trigger: 'blur'
        }]
      }
    }
  },
  mounted () {

  },
  methods: {
    getOrgid (id){
      this.searchForm.orgid = id
    },
    onSubmit () {
      this.$emit('change', this.searchForm)
    },
    clearForm (formName) {
      this.searchForm.name = ''
      this.searchForm.orgid = this.orgid
      this.searchForm.mobile = ''
    }
  }
}
</script> 


<style lang="scss">
.staff_manage{
    .staff_searchinfo{
        padding:10px 20px;
        border-bottom:1px solid #ccc;
        .el-form-item{
            margin-bottom: 0;
        }
        
    }
    .staff_searchinfo--btn{
        float: right;
    }
}
@media screen and (max-width:1308px){
  .staff_manage {
      .staff_searchinfo{
          .el-form-item{
              margin-bottom: 10px;
          }
      }
      .staff_searchinfo--btn{
          float: none;
      }
  }
}
</style>

