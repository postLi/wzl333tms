<template>
  <el-form :inline="true" :size="btnsize" label-position="right" label-width="70px" :rules="rules" ref="searchFormRef" :model="searchForm"  class="staff_searchinfo clearfix">
      <div class="staff_searchinfo--input">
        <el-form-item label="归属网点">
            <SelectTree v-model="searchForm.orgid" :orgid="otherinfo.orgid" />
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
                maxlength="11"
                v-model="searchForm.mobile"
                v-numberOnly
                clearable>
            </el-input>
        </el-form-item>
      </div>
      <el-form-item class="staff_searchinfo--btn">
          <el-button type="primary" @click="onSubmit">查询</el-button><el-button type="info" @click="clearForm('searchFormRef')" plain>清空</el-button>
      </el-form-item>
  </el-form>
</template>

<script>
import { validateMobile, REGEX } from '@/utils/validate'
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
    orgid: {
      type: Number
    }
  },
  data() {
    const validateFormMobile = function(rule, value, callback) {
      if (validateMobile(value)) {
        callback()
      } else {
        callback(new Error('请输入有效的手机号码'))
      }
    }

    const validateFormEmployeer = function(rule, value, callback) {
      callback()
    }

    return {
      searchForm: {
        orgid: '',
        name: '',
        mobile: ''
      },
      rules: {
        mobile: [{
          pattern: REGEX.MOBILE
        }]
      }
    }
  },
  watch: {
    orgid(newVal) {
      this.searchForm.orgid = newVal
    }
  },
  mounted() {
    this.searchForm.orgid = this.orgid
  },
  methods: {
    onSubmit() {
      this.$emit('change', this.searchForm)
    },
    clearForm(formName) {
      this.searchForm.name = ''
      this.searchForm.orgid = this.orgid
      this.searchForm.mobile = ''
    }
  }
}
</script> 

