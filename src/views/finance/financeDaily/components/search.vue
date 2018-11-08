<template>
  <div>
    <el-form ref="searchForm" :inline="true" :size="btnsize" label-position="right" :rules="rules" :model="searchForm" label-width="70px" class="staff_searchinfo clearfix">
      <div class="staff_searchinfo--input">
        <el-form-item label="核销时间">
          <el-date-picker v-model="searchCreatTime" :default-value="defaultTime" type="daterange" align="right" value-format="yyyy-MM-dd" start-placeholder="开始日期" :picker-options="pickerOptions2" end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="核销网点" prop="orgId">
          <SelectTree v-model="searchForm.orgId" :orgid="otherinfo.orgid" @change="onSubmit"></SelectTree>
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
        <searchAll :searchObj="searchObjs" @dataObj="getDataObj"></searchAll>
      </div>
      <el-form-item class="staff_searchinfo--btn">
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button type="info" @click="clearForm('searchForm')" plain>清空</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { REGEX } from '@/utils/validate'
import SelectTree from '@/components/selectTree/index'
import querySelect from '@/components/querySelect/index'
import SelectType from '@/components/selectType/index'
import { objectMerge2, parseTime, pickerOptions2 } from '@/utils/index'
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
      dotInfo: [],
      isModify: false,
      popVisible: false,
      setupTableVisible: false,
      // 自定义查询字段
      dataset: [],
      datalist: '',
      timeout: null,
      searchObj: {},
      searchObjs: {},
      searchCreatTime: [],
      defaultTime: [parseTime(+new Date() - 60 * 24 * 60 * 60 * 1000, '{y}-{m}-{d}'), parseTime(new Date(), '{y}-{m}-{d}')],
      searchForm: {
        orgId: '',
        startTime: '',
        endTime: '',
        dataSrc: '',
        paymentsType: ''
      },
      rules: {
        shipSn: [{ validator: orgidIdentifier, tigger: 'blur' }]
      },
      pickerOptions2: {
        shortcuts: pickerOptions2
      }
    }
  },
  watch: {
    orgid(newVal) {
      this.searchForm.orgId = newVal
    },
    searchCreatTime(newVal) {
      if (newVal) {
        this.searchObjs.startTime = this.searchCreatTime ? this.searchCreatTime[0] + ' 00:00:00' : ''
        this.searchObjs.endTime = this.searchCreatTime ? this.searchCreatTime[1] + ' 23:59:59' : ''
      }
    },
    // 传到子组件
    searchForm: {
      handler(cval, oval) {
        this.searchObjs = Object.assign({}, cval)
        this.searchObjs.settlementId = this.searchForm.settlementId
        this.searchObjs.startTime = this.searchCreatTime ? this.searchCreatTime[0] + ' 00:00:00' : ''
        this.searchObjs.endTime = this.searchCreatTime ? this.searchCreatTime[1] + ' 23:59:59' : ''
        this.searchObjs[this.searchForm.type] = this.searchForm.value
        console.log(this.searchObjs, cval, oval)
      },
      deep: true
    }
  },
  mounted() {
    this.searchForm.orgId = this.orgid
    this.searchCreatTime = this.defaultTime
    // this.onSubmit()
  },
  methods: {
    getDataObj(obj) {  // 接收子组件传回来的东西
      this.searchCreatTime = [obj.startTime, obj.endTime]
      this.searchForm = Object.assign({}, obj)
      this.$emit('change', obj)
    },
    closeAddDot() {
      this.popVisible = false
    },
    onSubmit() {
      const searchObj = Object.assign({}, this.searchForm)
      searchObj.settlementId = this.searchForm.settlementId
      searchObj.startTime = this.searchCreatTime ? this.searchCreatTime[0] + ' 00:00:00' : ''
      searchObj.endTime = this.searchCreatTime ? this.searchCreatTime[1] + ' 23:59:59' : ''
      this.$emit('change', searchObj)
      console.log()
    },
    clearForm(formName) {
      this.$nextTick(() => {
        Object.assign(this.$data, this.$options.data())
        this.searchForm.orgId = this.orgid
        this.searchCreatTime = this.defaultTime
        this.$refs[formName].resetFields()
      })
    }
  }
}

</script>
<style lang="scss">
.zdycx {
  .el-form-item__label {
    width: 85px !important;
  }
}

</style>
