<template>
  <el-form ref="searchForm" :inline="true" :size="btnsize" label-position="right" :rules="rules" :model="searchForm" label-width="70px" class="staff_searchinfo clearfix">

        <div class="staff_searchinfo--input">
          <el-form-item label="短驳时间">
            <el-date-picker v-model="searchTime" :default-value="defaultTime" type="daterange" unlink-panels align="right" value-format="yyyy-MM-dd HH:mm:ss" start-placeholder="开始日期" :picker-options="pickerOptions2" end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="批次状态" prop="batchTypeId">
            <selectBatchType v-model="searchForm.batchTypeId" type="short_batch_type" clearable @keyup.enter.native="onSubmit" :filterable="false" :filterfn="filterfn"></selectBatchType>
          </el-form-item>
          <el-form-item label="发车批次" prop="batchNo">
            <el-input v-model="searchForm.batchNo" :maxlength="15" auto-complete="off" clearable @keyup.enter.native="onSubmit"></el-input>
          </el-form-item>
          <el-form-item label="车牌号">
            <querySelect search="truckIdNumber" :remote="true" :maxlength="8" valuekey="truckIdNumber" v-model="searchForm.truckIdNumber" type="trunk" clearable @keyup.enter.native="onSubmit"></querySelect>
          </el-form-item>
          <el-form-item label="司机名称">
            <querySelect search="driverName" type="driver" :maxlength="10" v-model="searchForm.dirverName" valuekey="driverName" label="driverName" :remote="true" clearable @keyup.enter.native="onSubmit" />
          </el-form-item>
          <el-form-item label="发车网点">
            <SelectTree v-model="searchForm.orgid" clearable @keyup.enter.native="onSubmit">
              <el-option slot="head" label="全部" value=""></el-option>
            </SelectTree>
          </el-form-item>
          <el-form-item label="到车网点">
            <SelectTree v-model="searchForm.arriveOrgid" clearable @keyup.enter.native="onSubmit" :orgid="otherinfo.orgid">
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
import selectBatchType from '@/components/selectType/index'
import querySelect from '@/components/querySelect/index'
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
    const setDefaultOrgid = _ => {
      return this.orgid
    }
    return {
      searchTime: [parseTime(new Date() - 60 * 24 * 60 * 60 * 1000), parseTime(new Date())],
      searchForm: {
        orgid: '',
        loadTypeId: 38,
        arriveOrgid: setDefaultOrgid(),
        // apportionTypeId: '',
        // arriveOrgid: '',
        // batchNo: '',
        batchTypeId: 46,
        // beginDate: '',
        // contractNo: '',
        // createTime: '',
        // dirverMobile: '',
        dirverName: '',
        // endDate: '',
        // loadTime: '',
        truckIdNumber: ''
        // truckLoad: '',
        // truckVolume: '',
        // arrivedbeginDate: '',
        // arrivedEndDate: ''
      },
      rules: {
        // orgid: [{ validator: orgidIdentifier, tigger: 'blur' }]
      },
      defaultTime: [parseTime(new Date() - 60 * 24 * 60 * 60 * 1000), parseTime(new Date())],
      pickerOptions2: {
        shortcuts: pickerOptions2
      }
    }
  },
  mounted() {
    this.onSubmit()
  },
  methods: {
    onSubmit() {
      if (this.searchTime) {
        this.$set(this.searchForm, 'beginDate', parseTime(this.searchTime[0], '{y}-{m}-{d} ') + '00:00:00')
        this.$set(this.searchForm, 'endDate', parseTime(this.searchTime[1], '{y}-{m}-{d} ') + '23:59:59')
      }
      // if (this.searchForm.batchTypeId === 46) {
      //   this.searchForm.batchTypeId = undefined
      // }
      // this.$set(this.searchForm, 'arriveOrgid', this.orgid)
      this.$emit('change', this.searchForm)
      // this.searchForm = Object.assign({}, this.$options.data().searchForm)
    },
    filterfn(obj) {
      return obj.id !== 47
    },
    clearForm(formName) {
      this.$refs[formName].resetFields()
      this.searchForm = Object.assign({}, this.$options.data().searchForm)
      this.searchTime = this.$options.data().searchTime
      this.searchForm.arriveOrgid = this.orgid
      if (this.searchForm.batchTypeId === undefined) {
        this.searchForm.batchTypeId = 46
      }
    }
  }
}

</script>
