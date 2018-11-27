<template>
  <el-form :inline="true" :size="btnsize" label-position="right" :rules="rules" :model="searchForm" label-width="70px" class="staff_searchinfo clearfix">
    <div class="staff_searchinfo--input">
      <el-form-item label="创建时间">
        <el-date-picker v-model="searchCreatTime" :picker-options="pickerOptions2" type="daterange" align="right" start-placeholder="开始日期" end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="到达网点">
        <SelectTree v-model="searchForm.arriveOrgid" :disabledOption="[otherinfo.orgid]"></SelectTree>
      </el-form-item>
    </div>
    <el-form-item class="staff_searchinfo--btn art_marginTop">
      <el-button type="primary" @click="onSubmit">查询</el-button>
      <el-button type="info" @click="clearForm" plain>清空</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { parseTime, pickerOptions2 } from '@/utils/'
import SelectTree from '@/components/selectTree/index'
export default {
  components: {
    SelectTree
  },
  data() {
    return {
      btnsize: 'mini',
      rules: {},
      searchForm: {
        createTimeStart: '',
        createTimeEnd: '',
        arriveOrgid: '',
        orgid: ''
      },
      searchCreatTime: [parseTime(new Date() - 60 * 24 * 60 * 60 * 1000), parseTime(new Date())],
      pickerOptions2: {
        shortcuts: pickerOptions2
      }
    }
  },
  mounted() {
    this.searchForm.orgid = this.otherinfo.orgid
    this.onSubmit()
  },
  methods: {
    onSubmit() {
      this.searchForm.createTimeStart = this.searchCreatTime ? parseTime(this.searchCreatTime[0], '{y}-{m}-{d} ') + '00:00:00' : ''
      this.searchForm.createTimeEnd = this.searchCreatTime ? parseTime(this.searchCreatTime[1], '{y}-{m}-{d} ') + '23:59:59' : ''
      this.$emit('change', this.searchForm)
    },
    clearForm() {
      this.searchForm = this.$options.data().searchForm
      this.searchCreatTime = this.$options.data().searchCreatTime
      this.searchForm.orgid = this.otherinfo.orgid
    }
  }
}

</script>
