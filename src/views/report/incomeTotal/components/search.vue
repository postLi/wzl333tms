<template>
  <el-form ref="searchForm" :inline="true" :size="btnsize" label-position="right" :rules="rules" :model="searchForm" label-width="80px" class="staff_searchinfo clearfix">
    <div class="staff_searchinfo--input">
      <el-form-item label="开单时间">
        <el-date-picker v-model="searchTime" :default-value="defaultTime" type="daterange" unlink-panels align="right" value-format="yyyy-MM-dd" start-placeholder="开始日期" :picker-options="pickerOptions" end-placeholder="结束日期" @focus="hideIframe(true)" @blur="hideIframe(false)">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="开单网点" prop="shipFromOrgid">
        <SelectTree v-model="searchForm.shipFromOrgid" :focus="()=>{hideIframe(true)}" @change="()=>{hideIframe(false)}" :orgid="otherinfo.orgid">
        </SelectTree>
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
        shipFromOrgid: ''
        // currentPage: 1,
        // pageSize: 100,
        // senderCustomerName: ''
        // createTimeStart: '',
        // createTimeEnd: ''
      },
      rules: {
        shipSn: [{ validator: orgidIdentifier, tigger: 'blur' }]
      },
      searchTime: [parseTime(new Date() - 60 * 24 * 60 * 60 * 1000), parseTime(new Date())],
      defaultTime: [+new Date() - 60 * 24 * 60 * 60 * 1000, +new Date()],
      pickerOptions: {
        shortcuts: pickerOptions2
      }
    }
  },
  mounted() {
    this.searchForm.shipFromOrgid = this.orgid
    this.onSubmit()
  },
  methods: {
    onSubmit() {
      const searchObj = Object.assign({}, this.searchForm)
      if (this.searchTime) {
        this.$set(searchObj, 'startCreatTime', parseTime(this.searchTime[0], '{y}-{m}-{d}'))
        this.$set(searchObj, 'endCreatTime', parseTime(this.searchTime[1], '{y}-{m}-{d}'))
      }
      this.$emit('change', searchObj)
    },
    hideIframe(status) {
      this.$emit('hideIframe', status)
    },
    clearForm(formName) {
      this.$nextTick(() => {
        Object.assign(this.$data, this.$options.data())
        this.$refs[formName].resetFields()
        this.searchForm.shipFromOrgid = this.orgid
      })
    }
  }
}

</script>
