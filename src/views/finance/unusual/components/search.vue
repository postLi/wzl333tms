<template>
    <el-form :inline="true" :size="btnsize" label-position="right" :rules="rules" :model="searchForm" label-width="70px"      class="staff_searchinfo unusual_search clearfix">
      <div class="staff_searchinfo--input">
        
          <el-form-item label="开单时间">
          <div class="block">
            <el-date-picker
              v-model="searchCreatTime"
              :default-value="defaultTime"
              type="daterange"
              align="right"
              value-format="yyyy-MM-dd"
              start-placeholder="开始日期"
              :picker-options="pickerOptions2"
              end-placeholder="结束日期">
            </el-date-picker>
          </div>
          </el-form-item>
          <el-form-item label="开单网点">
              <SelectTree v-model="searchForm.shipFromOrgid" type="org_id" :orgid="otherinfo.orgid"/>
          </el-form-item>
          <el-form-item label="结算状态:" prop="statusName">
            <el-select v-model="searchForm.statusName">
            <el-option label="全部" value=""></el-option>
            <el-option label="已结算" value="ALLSETTLEMENT"></el-option>
            <el-option label="部分结算" value="PARTSETTLEMENT"></el-option>
            <el-option label="未结算" value="NOSETTLEMENT"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="运单号">
              <el-input v-model="searchForm.shipSn" :maxlength="20" auto-complete="off" clearable @keyup.enter.native="onSubmit"></el-input>
          </el-form-item>
          <!-- <el-form-item label="出发城市">
              <SelectCity @change="getFromCity"  v-model="searchForm.shipFromCityName"/>
          </el-form-item>
          <el-form-item label="到达城市">
              <SelectCity @change="getToCity" v-model="searchForm.shipToCityName" />
          </el-form-item> -->
          <el-form-item label="出发城市">
            <el-input v-model="searchForm.shipFromCityName" :maxlength="20" auto-complete="off" clearable @keyup.enter.native="onSubmit"></el-input>
          </el-form-item>
          <el-form-item label="到达城市">
              <el-input v-model="searchForm.shipToCityName" :maxlength="20" auto-complete="off" clearable @keyup.enter.native="onSubmit"></el-input>
          </el-form-item>
          <searchAll :searchObj="searchObjs" @dataObj="getDataObj"></searchAll>
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
import { parseTime, pickerOptions2 } from '@/utils/index'
import SelectCity from '@/components/selectCity/index'
import searchAll from '@/components/searchAll/index'
export default {
  components: {
    SelectTree,
    SelectType,
    SelectCity,
    searchAll
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

    const validateFormNumber = function(rule, value, callback) {
      // _this.searchForm.mobile = value.replace(REGEX.NO_NUMBER, '')
      callback()
    }

    return {
      // searchCreatTime: [parseTime(new Date() - 60 * 24 * 60 * 60 * 1000), parseTime(new Date())],
      searchCreatTime: [],
      searchObjs: {},
      defaultTime: [parseTime(+new Date() - 60 * 24 * 60 * 60 * 1000, '{y}-{m}-{d}'), parseTime(new Date(), '{y}-{m}-{d}')],
      searchForm: {
        shipFromOrgid: '', // 网点
        shipSn: '', //  运单号
        statusName: 'NOSETTLEMENT', // 结算状态
        // searchCreatTime: [], // 登记时间
        // shipFromCityCode: '',
        shipFromCityName: '',
        // shipToCityCode: '',
        // statusName:'',
        shipToCityName: ''
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
    searchCreatTime (newVal) {
      if (newVal) {
          this.$set(this.searchObjs, 'createTimeStart', parseTime(this.searchCreatTime[0], '{y}-{m}-{d} ') + '00:00:00')
          this.$set(this.searchObjs, 'createTimeEnd', parseTime(this.searchCreatTime[1], '{y}-{m}-{d} ') + '23:59:59')
        }
    },
    orgid(newVal) {
      this.searchForm.shipFromOrgid = newVal
    },
    // 传到子组件
    searchForm: {
      handler(cval, oval) {
        this.searchObjs = Object.assign({}, cval)
        if (this.searchCreatTime) {
          this.$set(this.searchObjs, 'createTimeStart', parseTime(this.searchCreatTime[0], '{y}-{m}-{d} ') + '00:00:00')
          this.$set(this.searchObjs, 'createTimeEnd', parseTime(this.searchCreatTime[1], '{y}-{m}-{d} ') + '23:59:59')
        }
      },
      deep: true
    }
  },
  mounted() {
    // 默认进来的网点
    this.searchForm.shipFromOrgid = this.orgid
    this.searchCreatTime = this.defaultTime
    this.onSubmit()
  },
  methods: {
     getDataObj(obj) {
      this.searchCreatTime = [obj.createTimeStart, obj.createTimeEnd]
      this.searchForm = Object.assign({}, obj)
      this.$emit('change', obj)
    },
    getOrgid(id) {
      this.searchForm.orgId = id
    },
    // getFromCity(city) {
    //   this.searchForm.shipFromCityCode = city.id.toString()
    // },
    // getToCity(city) {
    //   this.searchForm.shipToCityCode = city.id.toString()
    // },
    onSubmit() {
      this.searchForm.createTimeStart = this.searchCreatTime ? parseTime(this.searchCreatTime[0], '{y}-{m}-{d} ') + '00:00:00' : ''
      this.searchForm.createTimeEnd = this.searchCreatTime ? parseTime(this.searchCreatTime[1], '{y}-{m}-{d} ') + '23:59:59' : ''
      // this.searchForm.createTimeStart = this.searchCreatTime ? parseTime(this.searchCreatTime[0], '{y}-{m}-{d} ' + '00:00:00') + '' : ''
      // this.searchForm.createTimeEnd = this.searchCreatTime ? parseTime(this.searchCreatTime[1], '{y}-{m}-{d} ' + '23:59:59') + '' : ''
      // this.searchForm.createTimeStart = this.searchCreatTime ? parseTime(this.searchCreatTime[0]) : ''
      // this.searchForm.createTimeEnd = this.searchCreatTime ? parseTime(this.searchCreatTime[1]) : ''
      const data = Object.assign({}, this.searchForm)
      this.$emit('change', data)
    },
    clearForm() {
      // this.searchCreatTime = this.$options.data().searchCreatTime
      // this.searchCreatTime = []
      this.searchForm.shipFromOrgid = this.orgid
      this.searchForm.shipSn = ''
      this.searchForm.statusName = ''
      this.searchForm.shipFromCityName = ''
      this.searchForm.shipToCityName = ''
      this.searchCreatTime = this.defaultTime
    }
  }
}
</script> 
