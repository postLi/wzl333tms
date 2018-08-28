<template>
  <el-form ref="searchForm" :inline="true" :size="btnsize" label-position="right" :rules="rules" :model="searchForm" label-width="80px" class="staff_searchinfo clearfix">
    <div class="staff_searchinfo--input">
      <el-form-item label="时间">
        <el-date-picker v-model="searchTime" :default-value="defaultTime" type="daterange" align="right" value-format="yyyy-MM-dd" start-placeholder="开始日期" :picker-options="pickerOptions" end-placeholder="结束日期" @focus="hideIframe(true)" @blur="hideIframe(false)">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="开单网点" prop="orgId">
        <SelectTree v-model="searchForm.orgId" :focus="()=>{hideIframe(true)}" @change="()=>{hideIframe(false)}" :orgid="otherinfo.orgid">
        </SelectTree>
      </el-form-item>
      <el-form-item label="到达城市" prop="shipToCityName">
       <el-input v-model="searchForm.shipToCityName"></el-input>
      </el-form-item>
      <el-form-item label="时间类型" prop="selectType">
       <el-select v-model="searchForm.selectType" @focus="()=>{hideIframe(true)}" @change="()=>{hideIframe(false)}">
        <el-option v-for="(item, index) in selectType"
        :label="item.label"
        :value="item.value"
        :key="item.key"
        ></el-option>
       </el-select>
      </el-form-item>
       <el-form-item label="业务类型" prop="businessType">
       <el-select v-model="searchForm.businessType" @focus="()=>{hideIframe(true)}" @change="()=>{hideIframe(false)}">
        <el-option v-for="(item, index) in businessType"
        :label="item.label"
        :value="item.value"
        :key="item.key"
        ></el-option>
       </el-select>
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
import SelectType from '@/components/selectType/index'
import { objectMerge2, parseTime, pickerOptions2 } from '@/utils/index'
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
        orgId: '',
        selectType: '',
        businessType: '',
        shipToCityName: ''
        // currentPage: 1,
        // pageSize: 100,
        // senderCustomerName: '',
        // createTimeStart: '',
        // createTimeEnd: ''
      },
      businessType: [
        {
          value: 0,
          label: '全部'
        },
        {
          value: 1,
          label: '走货业务'
        },
        {
          value: 2,
          label: '来货业务'
        }
      ],
      selectType: [{
        value: 1,
        label: '按月'
      },
      {
        value: 2,
        label: '按日'
      }],
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
    this.searchForm.orgId = this.orgid
    this.searchForm.selectType = 1
    this.searchForm.businessType = 1
    this.onSubmit()
  },
  methods: {
    onSubmit() {
      const searchObj = Object.assign({}, this.searchForm)
      if (this.searchTime) {
        // this.$set(searchObj, 'startTime', parseTime(this.searchTime[0], '{y}-{m}-{d} '))
        this.$set(searchObj, 'startTime', parseTime(this.searchTime[0], '{y}-{m}-{d} '))
        this.$set(searchObj, 'endTime', parseTime(this.searchTime[1], '{y}-{m}-{d} '))
        // this.$set(searchObj, 'startTime', parseTime(this.searchTime[0], '{y}-{m}-{d} ') + '00:00:00')
        // this.$set(searchObj, 'endTime', parseTime(this.searchTime[1], '{y}-{m}-{d} ') + '23:59:59')
      }
      this.$emit('change', searchObj)
    },
    hideIframe(status) {
      this.$emit('hideIframe', status)
    },
    clearForm(formName) {
      this.$nextTick(() => {
        Object.assign(this.$data, this.$options.data())
        this.$refs[formName].resetFields()
        this.searchForm.orgId = this.orgid
      })
    }
  }
}

</script>
