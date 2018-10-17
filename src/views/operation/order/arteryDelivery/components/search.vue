<template>
  <el-form :inline="true" :size="btnsize" label-position="right" :rules="rules" :model="searchForm" label-width="70px"
           class="staff_searchinfo clearfix">
    <div class="staff_searchinfo--input">
      <el-form-item label="发车时间">
        <el-date-picker
          v-model="searchCreatTime"
          type="daterange"
          align="right"
          unlink-panels
          :picker-options="pickerOptions2"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </el-form-item>

      <el-form-item label="到车时间">
        <el-date-picker
          v-model="searchEndTime"
          type="daterange"
          align="right"
          unlink-panels
          :picker-options="pickerOptions2"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="批次状态">
        <SelectType v-model="searchForm.batchTypeId" type="main_batch_type" placeholder="请选择" class="pickup-way"
                    clearable :arterDelivery="true"/>
      </el-form-item>
      <el-form-item label="发车网点">
        <SelectTree v-model="searchForm.orgid" clearable/>
      </el-form-item>
      <el-form-item label="到车网点">
        <SelectTree v-model="searchForm.arriveOrgid" clearable :orgid="otherinfo.orgid"/>
      </el-form-item>
      <el-form-item label="发车批次" prop="">
        <el-input v-model.trim="searchForm.batchNo"
          maxlength="15"
          clearable>
        </el-input>
      </el-form-item>
      <el-form-item label="车牌号" class="art_marginTop">
        <el-input
          v-model="searchForm.truckIdNumber"
          maxlength="8"
          clearable>
        </el-input>
      </el-form-item>
      <el-form-item label="司机姓名" class="art_marginTop" prop="">
        <el-input
          v-model="searchForm.dirverName"
          maxlength="8"
          clearable>
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
  import {REGEX} from '@/utils/validate'
  import {parseTime, pickerOptions2} from '@/utils/'

  import SelectTree from '@/components/selectTree/index'
  import SelectType from '@/components/selectType/index'
  import {mapGetters} from 'vuex'

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
      },
      issender: {
        type: Boolean,
        dafault: false
      }
    },
    computed: {
      ...mapGetters([
        'otherinfo'
      ])
    },
    data() {
      const _this = this

      return {
        searchCreatTime: [+new Date() - 60 * 24 * 60 * 60 * 1000, +new Date()],
        searchEndTime: '',
        pickOption: {
          firstDayOfWeek: 1,
          disabledDate(time) {
            return _this.form.tmsOrderPickup.arriveTime ? time.getTime() > _this.form.tmsOrderPickup.arriveTime : false
          }
        },
        pickOption2: {
          firstDayOfWeek: 1,
          disabledDate(time) {
            return _this.form.tmsOrderPickup.outTime ? time.getTime() < _this.form.tmsOrderPickup.outTime : false
          }
        },
        searchForm: {
          orgid: '',
          dirverName: '',
          truckIdNumber: '',
          batchTypeId: '', //
          batchNo: '', //
          loadTypeId: 39, //
          endTime: '', //
          beginTime: '', //
          arrivedbeginDate: '', //
          arrivedEndDate: '', //
          arriveOrgid: '' //
        },
        rules: {

        },
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
      this.searchForm.arriveOrgid = this.otherinfo.orgid
      this.onSubmit()
    },
    methods: {
      getOrgid(id) {

      },
      onSubmit() {
        this.searchForm.beginTime = this.searchCreatTime ? parseTime(this.searchCreatTime[0], '{y}-{m}-{d} ') + '00:00:00' : ''
        this.searchForm.endTime = this.searchCreatTime ? parseTime(this.searchCreatTime[1], '{y}-{m}-{d} ') + '23:59:59' : ''
        this.searchForm.arrivedbeginDate = this.searchEndTime ? parseTime(this.searchEndTime[0], '{y}-{m}-{d} ') + '00:00:00' : ''
        this.searchForm.arrivedEndDate = this.searchEndTime ? parseTime(this.searchEndTime[1], '{y}-{m}-{d} ') + '23:59:59' : ''
        this.$emit('change', this.searchForm)
      },
      clearForm() {
        this.searchForm.beginTime = ''
        this.searchForm.batchTypeId = ''
        this.searchForm.endTime = ''
        this.searchForm.arrivedbeginDate = ''
        this.searchForm.arrivedEndDate = ''
        this.searchCreatTime = [+new Date() - 60 * 24 * 60 * 60 * 1000, +new Date()]
        // this.searchEndTime = [+new Date() - 60 * 24 * 60 * 60 * 1000, +new Date()]
        this.searchEndTime = ''
        this.searchForm.dirverName = ''
        this.searchForm.orgid = ''
        this.searchForm.arriveOrgid = this.otherinfo.orgid
        this.searchForm.truckIdNumber = ''
        this.searchForm.batchNo = ''
      }
    }
  }
</script>

