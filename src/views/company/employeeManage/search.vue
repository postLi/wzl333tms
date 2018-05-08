<template>
  <el-form :inline="true" :size="btnsize" label-position="right" :rules="rules" ref="searchFormRef" :model="searchForm" label-width="80px" class="staff_searchinfo clearfix">
      <el-form-item label="归属网点">
          <el-select v-model="searchForm.group" filterable>
              <el-option
              value="all"
              label="全部"
              >
              </el-option>
              <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
              </el-option>
          </el-select>
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
import { getGroupName } from '@/api/company/employeeManage'
import { validateMobile }  from '@/utils/validate'

export default {
  props: {
    btnsize: {
      type: String,
      default: 'mini'
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
        group: '',
        name: '',
        mobile: ''
      },
      options: [],
      rules: {
        mobile: [{
          validator: validateFormMobile, trigger: 'blur'
        }]
      }
    }
  },
  mounted () {
    getGroupName().then(res => {
      this.options = res.data.list
    })
  },
  methods: {
    onSubmit () {
      this.$emit('change', this.searchForm)
    },
    clearForm (formName) {
      this.searchForm.name = ''
      this.searchForm.group = ''
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

