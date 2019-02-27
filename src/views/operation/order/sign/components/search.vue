<template>
    <el-form :inline="true" :size="btnsize" label-position="right" label-width="70px" :rules="rules" :model="searchForm"  class="staff_searchinfo wzl clearfix">
      <div class="staff_searchinfo--input">
        <el-form-item label="开单时间">
          <div class="block">
            <el-date-picker
              v-model="searchCreatTime"
              :default-value="defaultTime"
              type="daterange" unlink-panels
              align="right"
              popper-class='searchCreatTime'
              value-format="yyyy-MM-dd"
              start-placeholder="开始日期"
              :picker-options="pickerOptions2"
              end-placeholder="结束日期">
            </el-date-picker>
          </div>
        </el-form-item>
          <el-form-item label="开单网点">
              <SelectTree v-model="searchForm.shipFromOrgid" />
          </el-form-item>
          <el-form-item label="签收网点">
              <SelectTree v-model="searchForm.signOrgid" :orgid="otherinfo.orgid"/>
          </el-form-item>
          <el-form-item label="签收状态"  prop="signStatus">
            <selectType v-model="searchForm.signStatus"  type="sign_status">
              <el-option slot="head" label="全部" value="" ></el-option>
            </selectType>
          </el-form-item>
          <el-form-item label="凭证状态"  prop="signCertificate">
            <selectType v-model="searchForm.signCertificate" type="sign_certificate" >
            </selectType>
          </el-form-item>
          <el-form-item label="运单号" prop="shipSn">
              <el-input v-model="searchForm.shipSn" :maxlength="20" auto-complete="off" clearable @keyup.enter.native="onSubmit"></el-input>
          </el-form-item>
          <el-form-item label="发站">
            <el-input v-model="searchForm.shipFromCityName" :maxlength="20" auto-complete="off" clearable @keyup.enter.native="onSubmit"></el-input>
          </el-form-item>
          <el-form-item label="到站">
              <el-input v-model="searchForm.shipToCityName" :maxlength="20" auto-complete="off" clearable @keyup.enter.native="onSubmit"></el-input>
          </el-form-item>
      </div>
        <el-form-item class="staff_searchinfo--btn">
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <el-button type="info" @click="clearForm" plain>清空</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
// import { REGEX } from '@/utils/validate'
import SelectTree from '@/components/selectTree/index'
import SelectType from '@/components/selectType/index'
import SelectCity from '@/components/selectCity/index'
import { parseTime, pickerOptions2, objectMerge3 } from '@/utils/index'
export default {
  components: {
    SelectTree,
    SelectCity,
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
    // const _this = this
    // const validateshipSn = function(rule, value, callback) {
    //   if (value === '' || value === null || !value || value === undefined) {
    //     callback(new Error('请输入运单号'))
    //   } else if (REGEX.ONLY_NUMBER_AND_LETTER.test(value)) {
    //     callback()
    //   } else {
    //     callback(new Error('只能输字母和数字'))
    //   }
    // }

    return {
      // searchCreatTime: [parseTime(new Date() - 60 * 24 * 60 * 60 * 1000), parseTime(new Date())],
      searchCreatTime: [],
      defaultTime: [parseTime(+new Date() - 60 * 24 * 60 * 60 * 1000, '{y}-{m}-{d}'), parseTime(new Date(), '{y}-{m}-{d}')],
      thestatus: '',
      searchForm: {
        shipFromOrgid: '',
        signOrgid: '',
        shipSn: '',
        // shipFromCityCode: '',
        shipFromCityName: '',
        // shipToCityCode: '',
        shipToCityName: '',
        signCertificate: 230,
        signStatus: 226,
        startTime: '',
        endTime: ''
      },
      rules: {
        // shipSn: [

        //   { required: true, trigger: 'blur', validator: validateshipSn }
        // ]
      },
      pickerOptions2: {
        shortcuts: pickerOptions2
      }
    }
  },
  watch: {
    orgid(newVal) {
      // this.searchForm.signOrgid = newVal
      this.searchForm.shipFromOrgid = newVal
    }
  },
  mounted() {
    this.searchForm.shipFromOrgid = ''
    this.searchForm.signOrgid = this.otherinfo.orgid
    this.searchCreatTime = this.defaultTime
    this.onSubmit()
  },
  methods: {
    // getOrgid (id){
    //   this.searchForm.orgid = id
    // },
    // getFromCity(city) {
    //   this.searchForm.shipFromCityCodobjectMerge3.id.toString()
    //   this.searchForm.shipFromCityName = city.longAddr
    // },
    // getToCity(city) {
    //   this.searchForm.shipToCityCode = city.id.toString()
    //   this.searchForm.shipToCityName = city.longAddr
    // },
    onSubmit() {
      // this.searchForm.startTime = this.searchCreatTime ? parseTime(this.searchCreatTime[0]) : ''
      // this.searchForm.endTime = this.searchCreatTime ? parseTime(this.searchCreatTime[1]) : ''
      this.searchForm.startTime = this.searchCreatTime ? parseTime(this.searchCreatTime[0], '{y}-{m}-{d}') + ' 00:00:00' : ''
      this.searchForm.endTime = this.searchCreatTime ? parseTime(this.searchCreatTime[1], '{y}-{m}-{d}') + ' 23:59:59' : ''
      // this.$emit('change', this.searchForm)
      const data = Object.assign({}, this.searchForm)
      this.$emit('change', data)
    },
    clearForm() {
      this.searchForm.signOrgid = this.otherinfo.orgid
      this.searchForm.shipFromOrgid = ''
      this.searchForm.signStatus = ''
      this.searchForm.signCertificate = ''
      this.searchForm.shipSn = ''
      this.searchForm.shipFromCityName = ''
      this.searchForm.shipToCityName = ''
      this.searchCreatTime = this.defaultTime
      // this.searchCreatTime = []
    }
  }
}
</script>
