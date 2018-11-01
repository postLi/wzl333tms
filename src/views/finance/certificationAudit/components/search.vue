<template>
  <el-form :inline="true" :size="btnsize" label-position="right" label-width="70px" :rules="rules" :model="searchForm" class="staff_searchinfo clearfix">
    <div class="staff_searchinfo--input">
      <el-form-item label="凭证时间">
        <div class="block">
          <el-date-picker v-model="searchCreatTime" type="daterange" align="right" :picker-options="pickerOptions" start-placeholder="开始日期" end-placeholder="结束日期" unlink-panels>
          </el-date-picker>
        </div>
      </el-form-item>
      <el-form-item label="核销网点">
        <SelectTree v-model="searchForm.orgid" :orgid="otherinfo.orgid" clearible/>
      </el-form-item>
      <el-form-item label="审核状态">
          <el-select v-model="searchForm.pickupBatchNumber">
            <el-option label="未审核" :value="0"></el-option>
            <el-option label="已审核" :value="1"></el-option>
            <el-option label="全部" value=""></el-option>
          </el-select>
        </el-input>
      </el-form-item>
      <el-form-item label="方向">
        <el-select v-model="searchForm.checkStatus">
          <el-option label="未对账" :value="0"></el-option>
          <el-option label="已对账" :value="1"></el-option>
          <el-option label="全部" value=""></el-option>
        </el-select>
        <!--<el-input placeholder="" maxlength="8" v-model="searchForm.truckIdNumber" clearable>-->
        <!--</el-input>-->
      </el-form-item>
      <el-form-item label="来源">
        <!--<el-input placeholder="" maxlength="8" v-model="searchForm.driverName" clearable>-->
        <!--</el-input>-->
        <el-select v-model="searchForm.driverName">
          <el-option label="结算产生" :value="0"></el-option>
          <el-option label="手工录入" :value="1"></el-option>
          <el-option label="全部" value=""></el-option>
        </el-select>
      </el-form-item>
    </div>
    <el-form-item class="staff_searchinfo--btn">
      <el-button type="primary" @click="onSubmit">查询</el-button>
      <el-button type="info" @click="clearForm" plain>清空</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { REGEX } from '@/utils/validate'
import SelectType from '@/components/selectType/index'
import SelectTree from '@/components/selectTree/index'
import { parseTime, pickerOptions2 } from '@/utils/'
export default {
  components: {
    SelectType,
    SelectTree
  },
  props: {
    btnsize: {
      type: [String, Object],
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
    title() {

    }
  },
  data() {
    const _this = this


    return {
      searchCreatTime: [+new Date(), +new Date() + 60 * 24 * 60 * 60 * 1000],
      searchForm: {
        pickupStatus: 235,
        pickupBatchNumber: '',
        truckIdNumber: '',
        orgid: '',
        driverName: ''
      },
      rules: {
        mobile: [{

        }]
      },
      pickerOptions: {
        shortcuts: pickerOptions2
        /* disabledDate(time) {
          return time.getTime() < Date.now() - 3600 * 1000 * 24
        } */
      }
    }
  },
  watch: {
    orgid(newVal) {
      this.searchForm.orgid = newVal
    }
  },
  mounted() {
    this.loading = true
    this.searchForm.orgid = this.orgid
    this.onSubmit()
  },
  methods: {
    getOrgid(id) {
      // this.searchForm.orgid = id
    },
    onSubmit() {
      // this.searchForm.startTime = this.searchCreatTime[0] ? +this.searchCreatTime[0] : ''
      // this.searchForm.endTime = this.searchCreatTime[1] ? +this.searchCreatTime[1] : ''
      this.searchForm.startTime = this.searchCreatTime[0] ? parseTime(this.searchCreatTime[0], '{y}-{m}-{d} ') + '00:00:00' : ''
      this.searchForm.endTime = this.searchCreatTime[1] ? parseTime(this.searchCreatTime[1], '{y}-{m}-{d} ') + '23:59:59' : ''
      this.$emit('change', this.searchForm)
    },
    clearForm() {
      this.searchForm.startTime = ''
      this.searchForm.endTime = ''
      this.searchCreatTime = [+new Date() - 60 * 24 * 60 * 60 * 1000, +new Date()]
      this.searchForm.pickupBatchNumber = ''
      this.searchForm.truckIdNumber = ''
      this.searchForm.driverName = ''
      this.searchForm.pickupStatus = ''
    }
  }
}

</script>
