<template>
  <el-form ref="searchForm" :inline="true" :size="btnsize" label-position="right" :rules="rules" :model="searchForm" label-width="70px" class="staff_searchinfo clearfix">
        <div class="staff_searchinfo--input">
          <el-form-item label="配载时间">
            <el-date-picker v-model="searchTime" :default-value="defaultTime" type="daterange" unlink-panels align="right" value-format="yyyy-MM-dd HH:mm:ss" start-placeholder="开始日期" :picker-options="pickerOptions" end-placeholder="结束日期" @keyup.enter.native="onSubmit">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="批次状态" prop="batchTypeId">
            <selectBatchType v-model="searchForm.batchTypeId" type="short_batch_type" clearable @keyup.enter.native="onSubmit"></selectBatchType>
          </el-form-item>
          <el-form-item label="发车批次">
            <el-input v-model="searchForm.batchNo" :maxlength="15" auto-complete="off" placeholder="发车批次" clearable @keyup.enter.native="onSubmit"></el-input>
          </el-form-item>
          <el-form-item label="车牌号">
            <el-input v-model="searchForm.truckIdNumber" :maxlength="8" auto-complete="off" placeholder="车牌号" clearable @keyup.enter.native="onSubmit"></el-input>
            <!-- <querySelect search="truckIdNumber" :remote="true" v-model="searchForm.truckIdNumber" type="trunk" clearable></querySelect> -->
          </el-form-item>
          <el-form-item label="司机名称">
            <el-input v-model="searchForm.dirverName" :maxlength="8" auto-complete="off" placeholder="司机名称" clearable @keyup.enter.native="onSubmit"></el-input>
            <!-- <querySelect search="driverName"  valuekey="dirverName" type="driver" v-model="searchForm.dirverName"  label="driverName" :remote="true" clearable /> -->
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
import selectBatchType from '@/components/selectType/index'
import { objectMerge2, parseTime, pickerOptions2 } from '@/utils/index'
export default {
  components: {
    SelectTree,
    selectBatchType,
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
        loadTypeId: 38,
        orgId: 0,
        // batchNo: '',
        batchTypeId: 46
        // deliveryBatchType: '',
        // dirverName: '',
        // endTime: '',
        // mainBatchType: '',
        // shortBatchType: '',
        // startTime: '',
        // truckIdNumber: ''
      },
      searchData: {
        loadTypeId: 38,
        orgId: 0
      },
      cityName: {},
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
    this.searchForm.batchTypeId = this.$options.data().searchForm.batchTypeId
    this.onSubmit()
  },
  methods: {
    onSubmit() {
      // if (this.searchForm.truckIdNumber) {
      //   this.searchForm.truckIdNumber = this.searchForm.truckIdNumber.truckIdNumber
      // }
      //  if (this.searchForm.dirverName) {
      //   this.searchForm.dirverName = this.searchForm.dirverName.driverName
      // }
      // if (this.searchForm.batchTypeId === 46) {
      //   this.searchForm.batchTypeId = undefined
      // }
      if (this.searchTime) {
        this.searchForm.startTime = parseTime(this.searchTime[0], '{y}-{m}-{d} ') + '00:00:00'
        this.searchForm.endTime = parseTime(this.searchTime[1], '{y}-{m}-{d} ') + '23:59:59'
      }
      this.$emit('change', this.searchForm)
    },
    clearForm(formName) {
      this.$refs[formName].resetFields()
      this.searchTime = this.$options.data().searchTime
      this.searchForm = Object.assign({}, this.$options.data().searchForm)
    }
  }
}

</script>
