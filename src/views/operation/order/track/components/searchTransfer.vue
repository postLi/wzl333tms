<template>
  <el-form ref="searchForm" :inline="true" :size="btnsize" label-position="right" :rules="rules" :model="searchForm" label-width="70px" class="staff_searchinfo clearfix">

        <div class="staff_searchinfo--input">
          <el-form-item label="中转时间">
            <el-date-picker v-model="searchTime" :default-value="defaultTime" type="daterange" unlink-panels align="right" value-format="yyyy-MM-dd HH:mm:ss" start-placeholder="开始日期" :picker-options="pickerOptions" end-placeholder="结束日期" @keyup.enter.native="onSubmit">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="承运商" prop="carrierName">
            <el-input v-model="searchForm.carrierName" :maxlength="15" auto-complete="off" placeholder="承运商" clearable @keyup.enter.native="onSubmit"></el-input>
           <!-- <querySelect v-model="searchForm.carrierName" search="carrierName" type="carrier" label="carrierName" :name="city" @change="getcity" :remote="true" clearable ></querySelect> -->
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
      carrierName: {},
      searchForm: {
        orgId: 0,
        carrierName: '',
        startTime: '',
        endTime: ''
      },
      city: '',
      searchData: {
        orgId: 0,
        carrierName: '',
        startTime: '',
        endTime: ''
      },
      cityName: {},
      rules: {
        shipSn: [{ validator: orgidIdentifier, tigger: 'blur' }]
      },
      searchTime: [parseTime(new Date() - 60 * 24 * 60 * 60 * 1000), parseTime(new Date())],
      defaultTime: [new Date() - 60 * 24 * 60 * 60 * 1000, new Date()],
      pickerOptions: {
        shortcuts: pickerOptions2
      }
    }
  },
  mounted () {
    this.onSubmit()
  },
  methods: {
    onSubmit() {
      // if (this.searchForm.carrierName) {
      //   this.searchForm.carrierName = this.searchForm.carrierName.carrierName
      // }
      if (this.searchTime) {
        this.searchForm.startTime = parseTime(this.searchTime[0], '{y}-{m}-{d} ') + '00:00:00'
        this.searchForm.endTime = parseTime(this.searchTime[1], '{y}-{m}-{d} ') + '23:59:59'
      }
      this.$emit('change', this.searchForm)
      // this.searchForm = Object.assign({}, this.searchData)
    },
    clearForm(formName) {
      this.$refs[formName].resetFields()
      this.searchTime = this.$options.data().searchTime
      this.searchForm = Object.assign({}, this.searchData)
    }
  }
}

</script>
