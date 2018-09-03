<template>
  <el-form :inline="true" :size="btnsize" label-position="right" label-width="70px" :rules="rules" :model="searchForm" class="driver_searchinfo staff_searchinfo clearfix">
      <div class="staff_searchinfo--input">
        <el-form-item label="网点">
            <SelectTree v-model="searchForm.orgid" />
        </el-form-item>
        <el-form-item label="司机名称">
            <el-input
                placeholder="司机名称"
                v-model="searchForm.name"
                maxlength="15"
                clearable>
            </el-input>
        </el-form-item>
        <el-form-item label="司机电话" >
            <el-input
                placeholder="请输入司机电话"
                maxlength="11"
                v-model="searchForm.mobile"
                v-numberOnly
                clearable>
            </el-input>
        </el-form-item>
      </div>
      <el-form-item class="staff_searchinfo--btn">
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button type="info" @click="clearForm" plain>清空</el-button>
      </el-form-item>
  </el-form>
</template>

<script>
import { REGEX } from '@/utils/validate'
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
    const _this = this
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

    const validateFormNumber = function(rule, value, callback) {
      _this.searchForm.mobile = value.replace(REGEX.NO_NUMBER, '')
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
          // validator: validateFormMobile, trigger: 'blur'
          validator: validateFormNumber, trigger: 'change'
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
    getOrgid(id) {
      this.searchForm.orgid = id
    },
    onSubmit() {
      this.$emit('change', this.searchForm)
    },
    clearForm() {
      this.searchForm.name = ''
      this.searchForm.orgid = this.orgid
      this.searchForm.mobile = ''
    }
  }
}
</script> 

