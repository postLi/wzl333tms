<template>
  <el-form ref="searchForm" :inline="true" :size="btnsize" label-position="right" :rules="rules" :model="searchForm" label-width="70px" class="staff_searchinfo clearfix">
    <div class="staff_searchinfo--input">
      <el-form-item label="核销时间">
        <el-date-picker v-model="searchTime" :default-value="defaultTime" type="daterange" unlink-panels align="right" value-format="yyyy-MM-dd HH:mm:ss" start-placeholder="开始日期" :picker-options="pickerOptions" end-placeholder="结束日期" @change="changeVal">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="核销网点" prop="orgId">
        <SelectTree v-model="searchForm.orgId" :orgid="otherinfo.orgid" @change="changeVal">
        </SelectTree>
      </el-form-item>
      <el-form-item label="方向" prop="paymentsType">
        <el-select v-model="searchForm.paymentsType" placeholder="方向" :size="btnsize">
          <el-option value="" label="全部"></el-option>
          <el-option v-for="(value, key) in $const.SETTLEMENT_ID" :value="key" :key="key" :label="value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="来源" prop="dataSrc">
        <el-select v-model="searchForm.dataSrc" placeholder="来源" :size="btnsize">
          <el-option v-for="(value, key) in $const.VERIFICATION_SOURCE" :value="key" :key="key" :label="value"></el-option>
        </el-select>
      </el-form-item>
      <searchAll v-model="searchAll" :searchObj="searchObjs" @dataObj="getDataObj"></searchAll>
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
import SelectType from '@/components/selectType/index'
import searchAll from '@/components/searchAll/index'
export default {
  components: {
    SelectTree,
    querySelect,
    SelectType,
    searchAll
  },
  props: {
    btnsize: {
      type: String,
      default: 'mini'
    },
    orgid: {
      type: [Number, String]
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
      searchAll: '',
      searchObjs: {},
      searchForm: {
        orgId: '',
        dataSrc: '',
        paymentsType: '',
        startTime: '',
        endTime: ''
      },
      rules: {},
      searchTime: [parseTime(new Date() - 60 * 24 * 60 * 60 * 1000), parseTime(new Date())],
      defaultTime: [+new Date() - 60 * 24 * 60 * 60 * 1000, +new Date()],
      pickerOptions: {
        shortcuts: pickerOptions2
      }
    }
  },
  watch: {
    orgid(newVal) {
      this.searchForm.orgId = newVal
    },
    searchTime(newVal) {
      if (newVal) {
        this.$set(this.searchObjs, 'startTime', parseTime(this.searchTime[0], '{y}-{m}-{d} ') + '00:00:00')
        this.$set(this.searchObjs, 'endTime', parseTime(this.searchTime[1], '{y}-{m}-{d} ') + '23:59:59')
      }
    },
    // 传到子组件
    searchForm: {
      handler(cval, oval) {
        this.searchObjs = Object.assign({}, cval)
        if (this.searchTime && this.searchTime[0]) {
          this.$set(this.searchObjs, 'startTime', parseTime(this.searchTime[0], '{y}-{m}-{d} ') + '00:00:00')
          this.$set(this.searchObjs, 'endTime', parseTime(this.searchTime[1], '{y}-{m}-{d} ') + '23:59:59')
        }
      },
      deep: true
    }
  },
  mounted() {
    if (this.$route.query.searchQuery) {
      console.log('2323423',this.$route.query.searchQuery)
          this.searchForm = JSON.parse(this.$route.query.searchQuery).vo
        }
    this.searchForm.orgId = this.orgid
    this.onSubmit()
  },
  methods: {
    getDataObj(obj) {
      this.searchTime = [obj.startTime, obj.endTime]
      this.searchForm = Object.assign({}, obj)
      this.$emit('change', obj)
    },
    selectFeeType(obj) {
      console.log(obj)
    },
    onSubmit() {

      const searchObj = Object.assign({}, this.searchForm)
      if (this.searchTime) {
        this.$set(searchObj, 'startTime', parseTime(this.searchTime[0], '{y}-{m}-{d} ') + '00:00:00')
        this.$set(searchObj, 'endTime', parseTime(this.searchTime[1], '{y}-{m}-{d} ') + '23:59:59')
      }
      console.log('searchObj', searchObj)
      this.$emit('change', searchObj)
    },
    changeVal(obj) {

      this.onSubmit()
    },
    clearForm(formName) {
      this.$nextTick(() => {
        Object.assign(this.$data, this.$options.data())
        this.searchForm.orgId = this.orgid
        this.$refs[formName].resetFields()
        this.searchAll = '1'
        setTimeout(() => {
          this.searchAll = ''
        }, 50)
      })
    }
  }
}

</script>
