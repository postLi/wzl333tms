<template>
  <el-form ref="searchForm" :inline="true" :size="btnsize" label-position="right" :rules="rules" :model="searchForm" label-width="80px" class="staff_searchinfo clearfix">
    <div class="staff_searchinfo--input">
      
      <el-form-item label="时间">
        <el-date-picker v-model="searchTime" :default-value="defaultTime" type="daterange" align="right" value-format="yyyy-MM-dd" start-placeholder="开始日期" :picker-options="pickerOptions" end-placeholder="结束日期" @focus="hideIframe(true)" @blur="hideIframe(false)">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="网点" prop="orgId">
        <SelectTree v-model="searchForm.orgId" :focus="()=>{hideIframe(true)}" @change="()=>{hideIframe(false)}" :orgid="otherinfo.orgid">
        </SelectTree>
      </el-form-item>
      <el-form-item label="费用项目" prop="typeIds">
        <el-select v-model="searchForm.typeIds" multiple collapse-tags placeholder="请选择" @focus="()=>{hideIframe(true)}" @visible-change="(bool)=>{hideIframe(bool)}">
          <el-option v-for="item in feeIdsArr" :key="item.id" :label="item.dictName" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
     <!--  <el-form-item label="发货方" prop="senderId">
      <querySelect v-model="searchForm.senderId" valuekey="customerId" search="customerName" type="sender" label="customerName" :remote="true"  @focus="()=>{hideIframe(true)}" @change="()=>{hideIframe(false)}"></querySelect>
      </el-form-item> -->
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
import querySelect from '@/components/querySelect/index'
import SelectType from '@/components/selectType/index'
import { objectMerge2, parseTime, pickerOptions2 } from '@/utils/index'
import { getSelectType } from '@/api/common'
export default {
  components: {
    SelectTree,
    querySelect,
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
        senderId: '',
        typeIds: []
        // currentPage: 1,
        // pageSize: 100,
        // senderCustomerName: '',
        // createTimeStart: '',
        // createTimeEnd: ''
      },
      rules: {
        shipSn: [{ validator: orgidIdentifier, tigger: 'blur' }]
      },
      searchTime: [parseTime(new Date() - 60 * 24 * 60 * 60 * 1000), parseTime(new Date())],
      defaultTime: [+new Date() - 60 * 24 * 60 * 60 * 1000, +new Date()],
      pickerOptions: {
        shortcuts: pickerOptions2
      },
      feeIdsArr: []
    }
  },
  mounted() {
    this.searchForm.orgId = this.orgid
    this.getSelectType()
    this.onSubmit()
  },
  methods: {
    getSelectType() {
      const type = 'fee_type'
      getSelectType(type, this.orgid).then(data => {
        this.feeIdsArr = data
      })
    },
    multiple() {
      this.hideIframe(false)
    },
    selectFeeType(obj) {},
    onSubmit() {
      const searchObj = Object.assign({}, this.searchForm)
      if (this.searchTime) {
        this.$set(searchObj, 'startTime', parseTime(this.searchTime[0], '{y}-{m}-{d} '))
        this.$set(searchObj, 'endTime', parseTime(this.searchTime[1], '{y}-{m}-{d} '))
      }
      this.$emit('change', searchObj)
    },
    hideIframe(status) {
      this.$emit('hideIframe', status)
    },
    clearForm(formName) {
      this.$nextTick(() => {
        this.$refs[formName].resetFields()
        this.searchForm = this.$options.data().searchForm
        this.searchForm.orgId = this.orgid
        console.log(this.searchForm)
      })
    }
  }
}

</script>
