<template>
  <el-form ref="searchForm" :inline="true" :size="btnsize" label-position="right" :rules="rules" :model="searchForm" label-width="70px" class="staff_searchinfo clearfix">
    <div class="staff_searchinfo--input">
      <el-form-item label="开单时间">
        <el-date-picker v-model="searchTime" :default-value="defaultTime" type="daterange" align="right" value-format="yyyy-MM-dd HH:mm:ss" start-placeholder="开始日期" :picker-options="pickerOptions" end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="开单网点" prop="shipFromOrgid">
        <SelectTree v-model="searchForm.shipFromOrgid" v-if="isTransferSel || isAbnormal"></SelectTree>
        <SelectTree v-model="searchForm.shipFromOrgid" :orgid="otherinfo.orgid" v-else></SelectTree>
      </el-form-item>
      <el-form-item label="中转网点" prop="transferOrgid" v-if="isTransferSel">
        <SelectTree v-model="searchForm.transferOrgid" :orgid="otherinfo.orgid">
        </SelectTree>
      </el-form-item>
      <el-form-item label="结算网点" prop="orgid" v-if="isAbnormal">
        <SelectTree v-model="searchForm.orgid" :orgid="otherinfo.orgid">
        </SelectTree>
      </el-form-item>
      <el-form-item label="结算状态" prop="status">
        <el-select v-model="searchForm.status" placeholder="结算状态">
          <el-option v-for="(value, key) in $const.COUNT_STATUS" :value="key" :key="key" :label="value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="运单号" prop="shipSn">
        <el-input v-model="searchForm.shipSn" :maxlength="maxlength"></el-input>
      </el-form-item>
      <el-form-item label="发货方" prop="senderUnit">
        <el-input v-model="searchForm.senderUnit" clearable :maxlength="maxlength"></el-input>
      </el-form-item>
      <el-form-item label="发货人" prop="senderName">
        <el-input v-model="searchForm.senderName" clearable :maxlength="maxlength"></el-input>
      </el-form-item>
      <el-form-item label="出发城市">
        <el-input v-model="searchForm.shipFromCityName" clearable :maxlength="maxlength"></el-input>
      </el-form-item>
      <el-form-item label="到达城市">
        <el-input v-model="searchForm.shipToCityName" clearable :maxlength="maxlength"></el-input>
      </el-form-item>
      <el-form-item label="签收状态" prop="signStatus">
        <selectType v-model="searchForm.signStatus" type="sign_status">
          <el-option slot="head" label="全部" value=""></el-option>
        </selectType>
      </el-form-item>
      <searchAll :searchObj="searchObjs" @dataObj="getDataObj"></searchAll>
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
import { objectMerge2, parseTime, pickerOptions2 } from '@/utils/index'
import searchAll from '@/components/searchAll/index'
import SelectType from '@/components/selectType/index'
export default {
  components: {
    SelectTree,
    querySelect,
    searchAll,
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
    isTransferSel: {
      type: Boolean,
      default: false
    },
    isAbnormal: {
      type: Boolean,
      default: false
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
      maxlength: 25,
      searchObjs: {},
      searchForm: {
        shipFromOrgid: '',
        orgid: '',
        signStatus: '',
        // feeType: 8, // 8-应付回扣 10-实际提货费 13-其他费用支出
        // endTime: '',
        // id: 0,
        // incomePayType: 'PAYABLE',
        // incomePayTypeValue: '',
        // orgAllId: '',
        // senderCompanyName: '',
        // senderName: '',
        // shipFromCityCode: '',
        // shipLoadId: 0,
        // shipLoadIdType: 0,
        shipSn: '',
        // shipToCityCode: '',
        // startTime: '',
        status: ''
        // totalFee: 0,
        // totalStatus: '',
        // totalStatusValue: ''
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
  watch: {
    orgid(newVal) {
      this.searchForm.orgid = newVal
    },
    searchTime (newVal) {
      if (newVal) {
          this.$set(this.searchObjs, 'startTime', parseTime(this.searchTime[0], '{y}-{m}-{d} ') + '00:00:00')
          this.$set(this.searchObjs, 'endTime', parseTime(this.searchTime[1], '{y}-{m}-{d} ') + '23:59:59')
        }
    },
    // 传到子组件
    searchForm: {
      handler(cval, oval) {
        this.searchObjs = Object.assign({}, cval)
        if (this.searchTime) {
          this.$set(this.searchObjs, 'startTime', parseTime(this.searchTime[0], '{y}-{m}-{d} ') + '00:00:00')
          this.$set(this.searchObjs, 'endTime', parseTime(this.searchTime[1], '{y}-{m}-{d} ') + '23:59:59')
        }
        console.log(this.searchObjs, cval, oval)
      },
      deep: true
    }
  },
  mounted() {
    if (this.isTransferSel) {
      this.searchForm.transferOrgid = this.orgid
    }
    if (this.isAbnormal) {
      this.searchForm.orgid = this.orgid
    }
    this.searchForm.shipFromOrgid = this.orgid
    this.onSubmit()
  },
  methods: {
    getDataObj (obj) {
      this.searchTime = [obj.startTime, obj.endTime]
      this.searchForm = Object.assign({}, obj)
      this.$emit('change', obj)
    },
    onSubmit() {
      const searchObj = Object.assign({}, this.searchForm)
      if (this.searchTime) {
        this.$set(searchObj, 'startTime', parseTime(this.searchTime[0], '{y}-{m}-{d} ') + '00:00:00')
        this.$set(searchObj, 'endTime', parseTime(this.searchTime[1], '{y}-{m}-{d} ') + '23:59:59')
      }
      this.$emit('change', searchObj)
    },
    clearForm(formName) {
      this.$nextTick(() => {
        Object.assign(this.$data, this.$options.data())
        this.$refs[formName].resetFields()
        this.searchForm.shipFromOrgid = this.orgid
      })
    }
  }
}

</script>
