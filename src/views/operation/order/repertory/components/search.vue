<template>
  <el-form ref="searchForm" :inline="true" :size="btnsize" label-position="right" :rules="rules" :model="searchForm" label-width="70px" class="staff_searchinfo clearfix">
    <div class="staff_searchinfo--input">
      
      <el-form-item label="开单时间">
        <el-date-picker v-model="searchTime" :default-value="defaultTime" type="daterange" unlink-panels align="right" value-format="yyyy-MM-dd HH:mm:ss" start-placeholder="开始日期" :picker-options="pickerOptions2" :clearable="false"  end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="运单号" prop="shipSn">
        <querySelect v-model="searchForm.shipSn" clearable search="shipSn" type="order" valuekey="shipSn"  :maxlength="15"></querySelect>
      </el-form-item>
      <el-form-item label="发站">
        <el-input v-model="searchForm.shipFromCityName" :maxlength="15" clearable></el-input>
        <!-- <querySelect v-model="searchForm.shipFromCityName" search="name" valuekey="longAddr" type="city" label="longAddr" :remote="true" /> -->
      </el-form-item>
      <el-form-item label="到站">
        <el-input v-model="searchForm.shipToCityName"  :maxlength="15" clearable></el-input>
        <!-- <querySelect v-model="searchForm.shipToCityName" search="name" valuekey="longAddr" type="city" label="longAddr" :remote="true" /> -->
      </el-form-item>
      <el-form-item label="发货人" prop="senderCustomerName">
        <el-input v-model="searchForm.senderCustomerName"  :maxlength="15" clearable></el-input>
      </el-form-item>
    </div>
    <el-form-item class="staff_searchinfo--btn">
      <el-button type="primary" @click="onSubmit">查询</el-button>
      <el-button type="info" @click="clearForm('searchForm')" plain>清空</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { REGEX } from '@/utils/validate'
import SelectTree from '@/components/selectTree/index'
import querySelect from '@/components/querySelect/index'
import { objectMerge2, parseTime, pickerOptions2 } from '@/utils/index'
export default {
  components: {
    SelectTree,
    querySelect
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
    const orgidIdentifier = (rule, value, callback) => {
      const reg = REGEX.ONLY_NUMBER
      if (value === '' || value === null || !value || value === undefined) {
        callback()
      } else if (!(reg.test(value))) {
        callback(new Error('请输入最多15位数字'))
      } else {
        callback()
      }
    }
    return {
      searchForm: {
        shipSn: '',
        shipFromCityName: '',
        shipToCityName: '',
        senderCustomerName: ''
      },
      rules: {
        // shipSn: [{ validator: orgidIdentifier, tigger: 'blur' }]
      },
      searchTime: [parseTime(new Date() - 60 * 24 * 60 * 60 * 1000), parseTime(new Date())],
      defaultTime: [parseTime(new Date() - 60 * 24 * 60 * 60 * 1000), parseTime(new Date())],
      pickerOptions2: {
        shortcuts: pickerOptions2
      }
    }
  },
  mounted() {

  },
  methods: {
    onSubmit() {
      const searchObj = Object.assign({}, this.searchForm)
      if (this.searchTime) {
        this.$set(searchObj, 'startTime', parseTime(this.searchTime[0], '{y}-{m}-{d} ') + '00:00:00')
        this.$set(searchObj, 'endTime', parseTime(this.searchTime[1], '{y}-{m}-{d} ') + '23:59:59')
      }
      this.$emit('change', searchObj)
    },
    clearForm(formName) {
      this.$nextTick(() => {
        Object.assign(this.$data, this.$options.data())
        this.$refs[formName].resetFields()
        this.searchTime = this.$options.data().searchTime
      })
    }
  }
}

</script>
