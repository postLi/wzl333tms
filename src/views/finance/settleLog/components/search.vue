<template>
  <el-form ref="searchForm" :inline="true" :size="btnsize" label-position="right" :rules="rules" :model="searchForm" label-width="80px" class="staff_searchinfo clearfix">
    <!-- <el-form-item label="结算时间">
      <el-date-picker v-model="searchTime" :default-value="defaultTime" type="daterange" align="right" value-format="yyyy-MM-dd HH:mm:ss" start-placeholder="开始日期" :picker-options="pickerOptions" end-placeholder="结束日期">
      </el-date-picker>
    </el-form-item> -->
    <el-form-item label="结算网点" prop="orgId">
      <SelectTree v-model="searchForm.orgId" clearable>
      </SelectTree>
    </el-form-item>
    <el-form-item label="结算类型" prop="settlementId">
      <querySelect v-model="searchForm.settlementId" search="settlementId" type="settlementId" valuekey="settlementId" clearable></querySelect>
    </el-form-item>
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
import { objectMerge2, parseTime } from '@/utils/index'
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
      let reg = REGEX.ONLY_NUMBER
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
        // agent: '',
        // alipayAccount: '',
        // amount: 0,
        // bankAccount: '',
        // bankAccountName: '',
        // bankName: '',
        // chequeNumber: '',
        // createBy: 0,
        // financialWay: '',
        // id: 0,
        // orgId: 0,
        // paymentsType: 0,
        // receivableNumber: '',
        // remark: '',
        // settlementBy: '',
        // settlementId: 0,
        // settlementSn: '',
        // settlementTime: '',
        // wechatAccount: ''
      },
      rules: {
        shipSn: [{ validator: orgidIdentifier, tigger: 'blur' }]
      },
      // searchTime: [parseTime(new Date() - 60 * 24 * 60 * 60 * 1000), parseTime(new Date())],
      // defaultTime: [+new Date() - 60 * 24 * 60 * 60 * 1000, +new Date()],
      // pickerOptions: {
      //   shortcuts: [{
      //     text: '最近一周',
      //     onClick(picker) {
      //       const end = new Date();
      //       const start = new Date();
      //       start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
      //       picker.$emit('pick', [start, end]);
      //     }
      //   }, {
      //     text: '最近一个月',
      //     onClick(picker) {
      //       const end = new Date();
      //       const start = new Date();
      //       start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
      //       picker.$emit('pick', [start, end]);
      //     }
      //   }, {
      //     text: '最近两个月',
      //     onClick(picker) {
      //       const end = new Date();
      //       const start = new Date();
      //       start.setTime(start.getTime() - 3600 * 1000 * 24 * 60);
      //       picker.$emit('pick', [start, end]);
      //     }
      //   }]
      // }
    }
  },
  mounted() {
    this.searchForm.orgId = this.orgid
    this.onSubmit()
  },
  methods: {
    onSubmit() {
      let searchObj = Object.assign({}, this.searchForm)
      // if (this.searchTime) {
      //   this.$set(searchObj, 'startTime', parseTime(this.searchTime[0], '{y}-{m}-{d} ') + '00:00:00')
      //   this.$set(searchObj, 'endTime', parseTime(this.searchTime[1], '{y}-{m}-{d} ') + '23:59:59')
      // }
      this.$emit('change', searchObj)
      // this.searchForm = Object.assign({}, this.$options.data().searchForm)
      // this.clearForm('searchForm')
    },
    clearForm(formName) {
      this.$nextTick(() => {
        Object.assign(this.$data, this.$options.data())
        this.$refs[formName].resetFields()
      })
    }
  }
}

</script>
