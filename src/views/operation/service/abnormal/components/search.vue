<template>
    <el-form :inline="true" :size="btnsize" label-position="right" :rules="rules" :model="searchForm" label-width="70px" class="staff_searchinfo clearfix">
      
        <!-- <el-form-item label="登记时间:">
          <div class="block">
            <el-date-picker
              v-model="searchCreatTime"
              type="datetimerange"
              value-format="yyyy-MM-dd hh:mm:ss"
              align="right"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions1"
            >
            </el-date-picker>
          </div>
        </el-form-item> -->

        <div class="staff_searchinfo--input">
          <el-form-item label="登记时间">
          <div class="block">
            <el-date-picker
              v-model="searchCreatTime"
              :default-value="defaultTime"
              type="daterange" unlink-panels
              align="right"
              value-format="yyyy-MM-dd"
              start-placeholder="开始日期"
              :picker-options="pickerOptions2"
              end-placeholder="结束日期">
            </el-date-picker>
          </div>
        </el-form-item>
  
  
          <el-form-item label="运单号">
            <el-input v-model="searchForm.shipSn" :maxlength="20" auto-complete="off" @keyup.enter.native="onSubmit" clearable></el-input>
          </el-form-item>
          <el-form-item label="登记网点">
              <SelectTree v-model="searchForm.orgId" type="org_id" v-if="isAllOrg"/>
              <SelectTree v-model="searchForm.orgId" type="org_id" :orgid="otherinfo.orgid" v-else/>
          </el-form-item>
  
          <el-form-item label="异常状态">
            <selectType v-model="searchForm.abnormalStatus" type="abnormal_status" />
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
import SelectTree from '@/components/selectTree/index'
import SelectType from '@/components/selectType/index'
import { parseTime, pickerOptions2 } from '@/utils/index'
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
    },
    isAllOrg: {
      type: Boolean
    }
  },
  computed: {
  },
  data() {
    const _this = this

    const validateFormNumber = function(rule, value, callback) {
      _this.searchForm.mobile = value.replace(REGEX.NO_NUMBER, '')
      callback()
    }

    return {
      // searchCreatTime: [parseTime(new Date() - 60 * 24 * 60 * 60 * 1000), parseTime(new Date())],
      searchCreatTime: [],
      defaultTime: [parseTime(+new Date() - 60 * 24 * 60 * 60 * 1000, '{y}-{m}-{d}'), parseTime(new Date(), '{y}-{m}-{d}')],
      searchForm: {
        orgId: '', // 网点
        shipSn: '', //  运单号
        abnormalStatus: 117, // 异常状态
        // name: '',
        // mobile: '',
        registerTime: '', // 登记时间
        statu: '',
        number: '',
        startcity: '',
        endcity: '',
        sendpepole: '',
        recivepepole: ''

      },
      rules: {
        mobile: [{
          // validator: validateFormMobile, trigger: 'blur'
          validator: validateFormNumber, trigger: 'change'
        }]
      },
      pickerOptions2: {
        shortcuts: pickerOptions2
      }
    }
  },
  watch: {
    orgid(newVal) {
      this.searchForm.orgId = newVal
    }
  },
  mounted() {
    this.searchForm.orgId = this.orgid
    this.searchCreatTime = this.defaultTime
    this.onSubmit()
  },
  methods: {
    getOrgid(id) {
      this.searchForm.orgId = id
    },
    onSubmit() {
      this.searchForm.startTime = this.searchCreatTime ? parseTime(this.searchCreatTime[0], '{y}-{m}-{d} ') + '00:00:00' : ''
      this.searchForm.endTime = this.searchCreatTime ? parseTime(this.searchCreatTime[1], '{y}-{m}-{d} ') + '23:59:59' : ''
      // this.searchForm.startTime = this.searchCreatTime ? parseTime(this.searchCreatTime[0]) : ''
      // this.searchForm.endTime = this.searchCreatTime ? parseTime(this.searchCreatTime[1]) : ''

      this.$emit('change', this.searchForm)
    },
    clearForm() {
      this.searchForm.shipSn = ''
      this.searchCreatTime = this.defaultTime
      // this.searchForm.orgId = ''
      this.searchForm.orgId = this.orgid
      this.searchForm.abnormalStatus = ''
      // this.searchCreatTime = []
    }
  }
}
</script> 
<style lang="scss">

</style>
