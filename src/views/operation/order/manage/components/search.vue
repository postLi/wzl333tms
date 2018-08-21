<template>
  <!--label-width="80px"-->
  <el-form :inline="true" :size="btnsize" label-position="right"
  label-width="70px" 
  :model="searchForm"  class="staff_searchinfo clearfix" :rules="rules">
      <div class="staff_searchinfo--input">
        <el-form-item label="创建时间">
          <div class="block">
            <el-date-picker
              v-model="searchCreatTime"
              type="daterange"
              align="right"
              :picker-options="pickerOptions2"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              unlink-panels
            >
            </el-date-picker>
          </div>
            <!--<SelectTree v-model="searchForm.orgid" />-->
        </el-form-item>
      <el-form-item label="订单状态">
        <SelectType v-model="searchForm.orderStatus" type="order_status" />
      </el-form-item>
      <el-form-item label="订单号" prop="orderSn">
        <el-input
          placeholder=""
          maxlength="11"
          v-model="searchForm.orderSn"
          clearable
          @keyup.enter.native="onSubmit"
        >
        </el-input>
      </el-form-item>
      </div>
      <el-form-item class="staff_searchinfo--btn">
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button type="info" @click="clearForm" plain>清空</el-button>
      </el-form-item>
  </el-form>
</template>

<script>
import SelectType from '@/components/selectType/index'
import { parseTime, pickerOptions2 } from '@/utils/'
import { REGEX } from '@/utils/validate'
export default {
  components: {
    SelectType
  },
  props: {
    btnsize: {
      type: String,
      default: 'mini'
    },
    orgid: {
      type: Number
    },
    issender: {
      type: Boolean,
      dafault: false
    }
  },
  computed: {
  },
  data() {
    return {
      searchCreatTime: [+new Date() - 60 * 24 * 60 * 60 * 1000, +new Date()],
      searchForm: {
        orderStatus: 213,
        orderSn: ''
      },
      rules: {
        orderSn: [
          // { message: '只能输入数字', trigger: 'blur', pattern: REGEX.ONLY_NUMBER}
        ]
      },
      pickerOptions2: {
        shortcuts: pickerOptions2
      }
    }
  },
  watch: {
    orgid(newVal) {
      // this.searchForm.orgid = newVal
    }

  },
  mounted() {
    this.loading = true
    this.searchForm.orgid = this.orgid
    this.onSubmit()
  },
  methods: {
    getOrgid(id) {
      this.searchForm.orgid = id
    },
    onSubmit() {
      // this.searchForm.createTime = this.searchCreatTime ? +this.searchCreatTime[0] : ''
      // this.searchForm.endTime = this.searchCreatTime ? +this.searchCreatTime[1] : ''
      this.searchForm.createTime = this.searchCreatTime ? parseTime(this.searchCreatTime[0], '{y}-{m}-{d} ') + '00:00:00' : ''
      this.searchForm.endTime = this.searchCreatTime ? parseTime(this.searchCreatTime[1], '{y}-{m}-{d} ') + '23:59:59' : ''
      this.$emit('change', this.searchForm)
      // console.log(this.searchForm);
    },
    clearForm() {
      this.searchForm.createTime = ''
      this.searchForm.endTime = ''
      this.searchCreatTime = [+new Date() - 60 * 24 * 60 * 60 * 1000, +new Date()]
      this.searchForm.orderStatus = ''
      this.searchForm.orderSn = ''
    }
  }
}
</script>

