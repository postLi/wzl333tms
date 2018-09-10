<template>
  <div>
    <el-form ref="searchForm" :inline="true" :size="btnsize" label-position="right" :rules="rules" :model="searchForm" label-width="70px" class="staff_searchinfo clearfix">
    <div class="staff_searchinfo--input">
      <el-form-item label="结算时间">
        <el-date-picker v-model="searchTime" :default-value="defaultTime" type="daterange" align="right" value-format="yyyy-MM-dd HH:mm:ss" start-placeholder="开始日期" :picker-options="pickerOptions" end-placeholder="结束日期"  @change="changeVal">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="结算网点" prop="orgId">
        <SelectTree v-model="searchForm.orgId" :orgid="otherinfo.orgid" @change="changeVal"></SelectTree>
      </el-form-item>
      <el-form-item label="结算类型" prop="settlementId">
        <selectType v-model="searchForm.settlementId" type="settlement_type" clearable @change="changeVal">
          <el-option slot="head" label="全部" value=""></el-option>
        </selectType>
      </el-form-item>
      <el-form-item label="自定义查询" class="zdycx">
        <!-- <SelectType v-model="searchForm.shipStatus">
          <el-option slot="head" label="全部" value=""></el-option>
        </SelectType> -->
        <!-- <SelectType @click="GetcustomList" type="settlement_type"></SelectType> -->
        <querySelect  @change="GetcustomList" ></querySelect>
      </el-form-item>
      <el-form-item>
        <el-button plain  @click="Custom">保存自定义</el-button>
      </el-form-item>
    </div>
    <!--  <el-form-item label="方向" prop="settlementId">
      <el-select v-model="searchForm.settlementId" placeholder="方向" :size="btnsize">
       <el-option v-for="(value, key) in $const.SETTLEMENT_ID" :value="key" :key="key" :label="value"></el-option>
      </el-select>
    </el-form-item> -->
    <el-form-item class="staff_searchinfo--btn">
      <el-button type="primary" @click="onSubmit">查询</el-button>
      <el-button type="info" @click="clearForm('searchForm')" plain>清空</el-button>
    </el-form-item>
  </el-form>
 <addSave :popVisible="popVisible" :issender="true" :dotInfo="dotInfo" :searchForm="searchForm"  @close="closeAddDot" @success="fetchAllreceipt" :isModify="isModify"/>

  </div>
 
</template>
<script>
import { REGEX } from '@/utils/validate'
import SelectTree from '@/components/selectTree/index'
import querySelect from '@/components/querySelect/index'
import SelectType from '@/components/selectType/index'
import { objectMerge2, parseTime, pickerOptions2 } from '@/utils/index'
import addSave from './addSave'
import { postQueryLogList, postcreaterQueryCriteriaLog } from '@/api/common'
export default {
  components: {
    SelectTree,
    querySelect,
    SelectType,
    addSave
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
      dotInfo: [],
      isModify: false,
      popVisible: false,
      setupTableVisible: false,
      searchForm: {
        // agent: '',
        // alipayAccount: '',
        // amount: 0,
        // bankAccount: '',
        // bankAccountName: '',
        // bankName: '',
        // chequeNumber: '',
        // createBy: 0,
        // financialWay: '',
        // id: 0,
        orgId: ''
        // paymentsType: 0,
        // receivableNumber: '',
        // remark: '',
        // settlementBy: '',
        // settlementId: 0,
        // settlementSn: '',
        // settlementTime: '',
        // wechatAccount: ''
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
      this.searchForm.orgId = newVal
    }
  },
  mounted() {
    this.searchForm.orgId = this.orgid
    this.onSubmit()
  },
  methods: {
    fetchAllreceipt() {

    },
    Custom() {
      this.isModify = true
      this.popVisible = true
    },
    GetcustomList() {
      return postQueryLogList().then(data => {
        console.log(data)
      })
    },
    closeAddDot() {
      this.popVisible = false
    },
    onSubmit() {
      const searchObj = Object.assign({}, this.searchForm)
      if (this.searchTime) {
        this.$set(searchObj, 'startTime', parseTime(this.searchTime[0], '{y}-{m}-{d} ') + '00:00:00')
        this.$set(searchObj, 'endTime', parseTime(this.searchTime[1], '{y}-{m}-{d} ') + '23:59:59')
      }
      this.$emit('change', searchObj)
    },
    changeVal(obj) {
      this.onSubmit()
    },
    clearForm(formName) {
      this.$nextTick(() => {
        Object.assign(this.$data, this.$options.data())
        this.searchForm.orgId = this.orgid
        this.$refs[formName].resetFields()
      })
    }
  }
}

</script>
<style lang="scss">
.zdycx{
  .el-form-item__label{
    width:85px !important;
  }
}
</style>
