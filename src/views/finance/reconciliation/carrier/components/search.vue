<template>
  <el-form :inline="true" :size="btnsize" label-position="right" :rules="rules" :model="searchForm" label-width="70px" class="staff_searchinfo clearfix">
      <div class="staff_searchinfo--input">
        <el-form-item label="中转时间">
          <el-date-picker
            v-model="searchCreatTime"
            type="daterange"
            align="right"
            unlink-panels
            :picker-options="pickerOptions2"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="timestamp"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="中转网点">
            <SelectTree v-model="searchForm.orgid" :orgid="otherinfo.orgid" />
        </el-form-item>
        <el-form-item label="承运商">
          <querySelect  size="mini" search="carrierName" type="carrier" valuekey="carrierId" :filterable="true" show="select"  @change="getCarrier"/>
  
        </el-form-item>
      </div>
      <el-form-item class="staff_searchinfo--btn art_marginTop" >
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button type="info" @click="clearForm" plain>清空</el-button>
      </el-form-item>
  </el-form>
</template>

<script>
import SelectTree from '@/components/selectTree/index'
import SelectType from '@/components/selectType/index'
import querySelect from '@/components/querySelect/index'
import { REGEX } from '@/utils/validate'
import { parseTime, pickerOptions2 } from '@/utils/'
export default {
  components: {
    SelectTree,
    SelectType,
    querySelect
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
    title() {

    }
  },
  data() {
    const _this = this
    return {
      searchCreatTime: [new Date() - 60 * 24 * 60 * 60 * 1000, new Date()],
      pickOption: {
        firstDayOfWeek: 1,
        disabledDate(time) {
          // 小于终止日
          return _this.form.tmsOrderPickup.arriveTime ? time.getTime() > _this.form.tmsOrderPickup.arriveTime : false
        }
      },
      pickOption2: {
        firstDayOfWeek: 1,
        disabledDate(time) {
          // 大于起始日
          return _this.form.tmsOrderPickup.outTime ? time.getTime() < _this.form.tmsOrderPickup.outTime : false
        }
      },
      searchForm: {
        orgid: '',
        carrierId: '', // /
        startTime: '', //
        endTime: ''

      },
      rules: {

      },
      pickerOptions2: {
        shortcuts: pickerOptions2
      }
    }
  },
  watch: {
    orgid(newVal) {
      this.searchForm.orgid = newVal
    }
  },
  mounted() {
    this.searchForm.orgid = this.orgid
    this.onSubmit()
    // this.searchForm.batchTypeId = this.orgid
  },
  methods: {
    getCarrier(item) {
      if (item) {
        console.log(item)
        this.searchForm.carrierId = item.carrierId
      }
    },
    onSubmit() {
      this.searchForm.startTime = this.searchCreatTime ? parseTime(this.searchCreatTime[0], '{y}-{m}-{d} ') + '00:00:00' : ''
      this.searchForm.endTime = this.searchCreatTime ? parseTime(this.searchCreatTime[1], '{y}-{m}-{d} ') + '23:59:59' : ''
      this.$emit('change', this.searchForm)
    },
    clearForm() {
      this.searchForm.orgid = this.orgid
      this.searchForm.carrierId = ''
      this.searchForm.startTime = ''
      this.searchForm.endTime = ''
      // this.searchCreatTime = []
    },
    carrierItem(item) {
      this.searchForm.orgid = item.orgid
    }
  }
}
</script>
