<template>
  <el-form ref="searchForm" :inline="true" :size="btnsize" label-position="right" :rules="rules" :model="searchForm" label-width="70px" class="staff_searchinfo clearfix">
    <div class="staff_searchinfo--input">
      <el-form-item label="开单时间">
        <el-date-picker v-model="searchTime" :default-value="defaultTime" type="daterange" unlink-panels align="right" value-format="yyyy-MM-dd" start-placeholder="开始日期" :picker-options="pickerOptions" end-placeholder="结束日期" @focus="hideIframe(true)" @blur="hideIframe(false)">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="开单网点" prop="shipFromOrgid">
        <SelectTree v-model="searchForm.shipFromOrgid" :focus="()=>{hideIframe(true)}" @change="(val, obj)=>{hideIframe(false,val, obj, 'from')}" :orgid="otherinfo.orgid">
        </SelectTree>
      </el-form-item>
      <el-form-item label="到达网点" prop="shipToOrgid">
        <SelectTree v-model="searchForm.shipToOrgid" :focus="()=>{hideIframe(true)}" @change="(val, obj)=>{hideIframe(false, val, obj, 'to')}" clearable>
        </SelectTree>
      </el-form-item>
      <el-form-item label="发货人" prop="senderCustomerName">
        <el-input v-model="searchForm.senderCustomerName"></el-input>
      </el-form-item>
      <el-form-item label="发站" prop="shipFromCityName">
        <el-input v-model="searchForm.shipFromCityName"></el-input>
        <!-- <querySelectCity filterable show="select" @change="(city) => getCity(city, 'shipFromCityName')" search="longAddr" valuekey="longAddr" type="city" v-model="searchForm.shipFromCityName" :remote="true" clearable/> -->
      </el-form-item>
      <el-form-item label="到站" prop="shipToCityName">
        <el-input v-model="searchForm.shipToCityName"></el-input>
        <!-- <querySelectCity filterable show="select" @change="(city) => getCity(city, 'shipToCityName')" search="longAddr" valuekey="longAddr" type="city" v-model="searchForm.shipToCityName" :remote="true" clearable/> -->
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
import querySelectCity from '@/components/querySelect/city'
import querySelect from '@/components/querySelect/index'
import { objectMerge2, parseTime, pickerOptions2 } from '@/utils/index'
export default {
  components: {
    SelectTree,
    querySelect,
    querySelectCity
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
    return {
      searchForm: {
        shipFromOrgid: '',
        // currentPage: 1,
        // pageSize: 100,
        senderCustomerName: '',
        shipFromOrgid: '',
        shipToOrgid: '',
        shipToCityName: '',
        shipFromCityName: ''
        // createTimeStart: '',
        // createTimeEnd: ''
      },
      orgName: {
        from: '',
        to: ''
      },
      rules: {
        shipSn: [{ validator: orgidIdentifier, tigger: 'blur' }]
      },
      searchTime: [parseTime(new Date() - 60 * 24 * 60 * 60 * 1000), parseTime(new Date())],
      defaultTime: [+new Date() - 60 * 24 * 60 * 60 * 1000, +new Date()],
      pickerOptions: {
        shortcuts: pickerOptions2
      }
    }
  },
  mounted() {
    this.searchForm.shipFromOrgid = this.orgid
    this.orgName.from = this.otherinfo.orgName
    this.$emit('orgName', this.orgName)
    this.onSubmit()
  },
  methods: {
    getCity(city, type) {
      this.searchForm[type] = city ? city.longAddr : city
    },
    onSubmit() {
      const searchObj = Object.assign({}, this.searchForm)
      if (this.searchTime) {
        this.$set(searchObj, 'createTimeStart', parseTime(this.searchTime[0], '{y}-{m}-{d}'))
        this.$set(searchObj, 'createTimeEnd', parseTime(this.searchTime[1], '{y}-{m}-{d}'))
      }
      this.$emit('change', searchObj)
    },
    hideIframe(status, val, obj, type) {
      this.$emit('hideIframe', status)
      console.log(val, obj, type)
      if (type) {
        this.orgName[type] = obj.name
        this.$emit('orgName', this.orgName)
      } 
    },
    clearForm(formName) {
      this.$nextTick(() => {
        // Object.assign(this.$data, this.$options.data())
        this.$refs[formName].resetFields()
        this.searchForm = this.$options.data().searchForm
        console.log(this.searchForm)
        this.searchForm.shipFromOrgid = this.orgid
        // this.searchForm.senderCustomerName = ''

      })
    }
  }
}

</script>
