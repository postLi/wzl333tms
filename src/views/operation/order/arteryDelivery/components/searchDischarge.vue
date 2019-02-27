<template>
  <el-form :inline="true" :size="btnsize" label-position="right" :rules="rules" :model="searchForm" label-width="70px" class="staff_searchinfo clearfix">
    <div class="staff_searchinfo--input">
      <el-form-item label="发车时间">
        <el-date-picker v-model="searchTime" type="daterange" unlink-panels align="right" unlink-panels :picker-options="pickerOptions2" start-placeholder="开始日期" end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="卸货状态">
        <SelectType v-model="searchForm.unloadSign" type="unload_type" placeholder="请选择" class="pickup-way" clearable/>
      </el-form-item>
      <el-form-item label="发车网点">
        <SelectTree v-model="searchForm.orgid" clearable/>
      </el-form-item>
      <el-form-item label="发车批次" prop="">
        <el-input v-model.trim="searchForm.batchNo" maxlength="30" clearable>
        </el-input>
      </el-form-item>
      <el-form-item label="车牌号" class="art_marginTop">
        <el-input v-model="searchForm.truckIdNumber" maxlength="10" clearable>
        </el-input>
      </el-form-item>
      <el-form-item label="司机姓名" class="art_marginTop" prop="">
        <el-input v-model="searchForm.dirverName" maxlength="15" clearable>
        </el-input>
      </el-form-item>
    </div>
    <el-form-item class="staff_searchinfo--btn art_marginTop">
      <el-button type="primary" @click="onSubmit">查询</el-button>
      <el-button type="info" @click="clearForm" plain>清空</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { REGEX } from '@/utils/validate'
import { parseTime, pickerOptions2 } from '@/utils/'

import SelectTree from '@/components/selectTree/index'
import SelectType from '@/components/selectType/index'
import { mapGetters } from 'vuex'

export default {
  components: {
    SelectTree,
    SelectType
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
  computed: {
    ...mapGetters([
      'otherinfo'
    ])
  },
  data() {
    return {
      searchTime: [+new Date() - 60 * 24 * 30 * 60 * 1000, +new Date()],
      searchForm: {
        orgid: '',
        dirverName: '',
        truckIdNumber: '',
        batchNo: '',
        departureTimeStart: '',
        departureTimeEnd: '',
        userOrgid: '',
        unloadSign: 405 // 405-全部 406-已卸货 407-未卸货
      },
      rules: {},
      pickerOptions2: {
        shortcuts: pickerOptions2
      }
    }
  },
  watch: {
    orgId(newVal) {
      this.searchForm.orgid = newVal
    }
  },
  mounted() {
    this.searchForm.userOrgid = this.otherinfo.orgid
    this.searchForm.unloadSign = 405
    this.onSubmit()
  },
  methods: {
    onSubmit() {
      if (this.searchTime) {
        this.searchForm.departureTimeStart = parseTime(this.searchTime[0], '{y}-{m}-{d} ') + '00:00:00'
        this.searchForm.departureTimeEnd = parseTime(this.searchTime[1], '{y}-{m}-{d} ') + '23:59:59'
      }
      this.$emit('change', this.searchForm)
    },
    clearForm() {
      this.searchForm = this.$options.data().searchForm

    }
  }
}

</script>
