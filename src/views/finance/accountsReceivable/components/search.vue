<template>
  <el-form :inline="true" :size="btnsize" label-position="right"  :model="searchForm" label-width="70px"  class="staff_searchinfo feeReceivableSearch clearfix">
    <div class="staff_searchinfo--input">
      <el-form-item label="开单时间">
      <div class="block">
        <el-date-picker
          v-model="searchCreatTime"
          :default-value="defaultTime"
          type="daterange" unlink-panels
          align="right"
          :picker-options="pickerOptions2"
          value-format="yyyy-MM-dd"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </div>
    </el-form-item>
    <el-form-item v-if="filter" label="核销网点">
      <select-tree v-model="searchForm.ascriptionOrgId" :orgid="otherinfo.orgid" />
    </el-form-item>
    <el-form-item label="开单网点" v-if="isShow">
      <select-tree v-model="searchForm.shipFromOrgid"/>
    </el-form-item>
    <el-form-item label="发货人">
      <el-input
          v-model="searchForm.senderName"
          clearable>
      </el-input>
    </el-form-item>
    <el-form-item label="发货方">
      <el-input
          v-model="searchForm.senderCompanyName"
          clearable>
      </el-input>
    </el-form-item>
    <el-form-item label="发站">
      <el-input
          v-model="searchForm.shipFromCityCode"
          clearable>
      </el-input>
    </el-form-item>
    <el-form-item label="到站">
      <el-input
          v-model="searchForm.shipToCityCode"
          clearable>
      </el-input>
    </el-form-item>
    <el-form-item label="运单号">
      <el-input
          maxlength="15"
          @keyup.native="validates('shipSn')"
          v-model="searchForm.shipSn"
          clearable>
      </el-input>
    </el-form-item>
    <el-form-item label="核销状态">
      <select-type v-model="searchForm.status" type="count_status" >
      </select-type>
    </el-form-item>
    <el-form-item label="签收状态"  prop="signStatus">
      <selectType v-model="searchForm.signStatus"  type="sign_status">
        <el-option slot="head" label="全部" value="" ></el-option>
      </selectType>
    </el-form-item>
    <searchAll v-model="searchAll" :searchObj="searchObjs" @dataObj="getDataObj"></searchAll>
    </div>
    <el-form-item class="staff_searchinfo--btn">
      <el-button type="primary" @click="onSubmit">查询</el-button><el-button type="info" @click="clearForm" plain>清空</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import SelectTree from '@/components/selectTree/index'
import SelectType from '@/components/selectType/index'
import { parseTime, pickerOptions2 } from '@/utils/'
import searchAll from '@/components/searchAll/index'
export default {
  name: 'handaccount-manage-search',
  components: {
    SelectTree,
    SelectType,
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
    filter: {
      type: Boolean,
      default: false
    },
    isShow: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      searchAll: '1',
      searchCreatTime: [],
      searchObjs: {},
      defaultTime: [parseTime(+new Date() - 60 * 24 * 60 * 60 * 1000, '{y}-{m}-{d}'), parseTime(new Date(), '{y}-{m}-{d}')],
      searchForm: {
        shipFromOrgid: '',
        endTime: '',
        startTime: '',
        senderName: '',
        senderCompanyName: '',
        shipFromCityCode: '',
        shipToCityCode: '',
        shipSn: '',
        ascriptionOrgId: '',
        status: '',
        signStatus: ''
      },
      pickerOptions2: {
        shortcuts: pickerOptions2
      }
    }
  },
  watch: {
    orgid(newVal) {
      this.searchForm.shipFromOrgid = newVal
    },
    searchCreatTime (newVal) {
      if (newVal) {
          this.$set(this.searchObjs, 'startTime', parseTime(this.searchCreatTime[0], '{y}-{m}-{d} ') + '00:00:00')
          this.$set(this.searchObjs, 'endTime', parseTime(this.searchCreatTime[1], '{y}-{m}-{d} ') + '23:59:59')
        }
    },
    // 传到子组件
    searchForm: {
      handler(cval, oval) {
        this.searchObjs = Object.assign({}, cval)
        if (this.searchCreatTime && this.searchCreatTime[0]) {
          this.searchObjs.startTime = this.searchCreatTime[0] + ' 00:00:00'
          this.searchObjs.endTime = this.searchCreatTime[1] + ' 23:59:59'
        }
      },
      deep: true
    }
  },
  mounted() {
    this.searchCreatTime = this.defaultTime
    this.searchForm.ascriptionOrgId = this.otherinfo.orgid
    // this.searchForm.status = 'NOSETTLEMENT'
    this.onSubmit()
    // 当添加核销时更新列表
    this.eventBus.$on('updateAccountsReceivableList', () => {
      this.onSubmit()
    })
  },
  methods: {
    validates (key) {
      this.$set(this.searchForm, key, this.searchForm[key].replace(/[^\d]/g,'')) // 只能输入数字
    },
    getDataObj(obj) {
      this.searchCreatTime = [obj.startTime, obj.endTime]
      this.searchForm = Object.assign({}, obj)
      this.$emit('change', obj)
    },
    onSubmit() {
      const searchObj = Object.assign({}, this.searchForm)
      if (this.searchCreatTime && this.searchCreatTime[0]) {
        searchObj.startTime = this.searchCreatTime[0] + ' 00:00:00'
        searchObj.endTime = this.searchCreatTime[1] + ' 23:59:59'
      }
      this.$emit('change', searchObj)
    },
    clearForm() {
      this.searchForm = this.$options.data().searchForm
      this.searchCreatTime = this.defaultTime
      this.searchForm.ascriptionOrgId = this.otherinfo.orgid
      this.searchAll = '1'
      setTimeout(() => {
        this.searchAll = ''
      }, 50)
      // this.searchForm.senderName = ''
      // this.searchForm.senderCompanyName = ''
      // this.searchForm.shipFromCityCode = ''
      // this.searchForm.shipToCityCode = ''
      // this.searchForm.shipSn = ''
      // this.searchForm.startTime = ''
      // this.searchForm.endTime = ''
      // this.searchCreatTime = this.defaultTime
      // this.searchForm.shipFromOrgid = ''
      // this.searchForm.ascriptionOrgId = this.otherinfo.orgid
    }
  }
}
</script>

