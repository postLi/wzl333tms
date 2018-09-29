<template>
  <el-form ref="searchForm" :inline="true" :size="btnsize" label-position="right" :rules="rules" :model="searchForm" label-width="70px" class="staff_searchinfo clearfix">
    <div class="staff_searchinfo--input">
      <el-form-item label="发车时间">
        <el-date-picker
              v-model="searchTime"
              type="daterange"
              align="right"
              value-format="yyyy-MM-dd HH:mm:ss"
              start-placeholder="开始日期"
              :picker-options="pickerOptions"
              end-placeholder="结束日期">
            </el-date-picker>
      </el-form-item>
      <el-form-item label="发车网点">
        <SelectTree v-model="searchForm.orgid" v-if="!isAllOrg"  :orgid="otherinfo.orgid"></SelectTree>
        <SelectTree v-model="searchForm.orgid"  v-else>
        </SelectTree>
      </el-form-item>
      <el-form-item label="结算网点"  v-if="isAllOrg"> <!-- 到付 -->
        <SelectTree v-model="searchForm.ascriptionOrgid" :orgid="otherinfo.orgid"></SelectTree>
      </el-form-item>
      <el-form-item label="到车网点"  v-if="!isAllOrg && isArrivalSel">
        <SelectTree v-model="searchForm.arriveOrgid"  clearable></SelectTree>
      </el-form-item>
      <el-form-item label="发车批次" prop="batchNo">
        <el-input placeholder="请输入发车批次" v-model="searchForm.batchNo"></el-input>
      </el-form-item>
      <el-form-item label="车牌号" prop="truckIdNumber">
         <el-input v-model="searchForm.truckIdNumber" placeholder="请输入车牌号"></el-input>
        <!-- <querySelect v-model="searchForm.truckIdNumber" valuekey="truckIdNumber" search="truckIdNumber" type="trunk" /> -->
      </el-form-item>
      <el-form-item label="司机">
        <el-input v-model="searchForm.dirverName" clearable :maxlength="10" placeholder="司机名称"></el-input>
        <!-- <querySelect v-model="searchForm.dirverName" valuekey="driverName" search="driverName" type="driver" label="driverName" :remote="true" /> -->
      </el-form-item>
      <searchAll v-model="searchAll" :searchObj="searchObjs" @dataObj="getDataObj"></searchAll>
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
export default {
  components: {
    SelectTree,
    querySelect,
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
    isAllOrg: {
      type: Boolean
    },
    isArrivalSel: {
      type: Boolean
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
      searchAll: '1',
      searchObjs: {},
      searchForm: {
        // sign: 2,
        orgid: '',
        ascriptionOrgid: '',
        arriveOrgid: '',
        status: 'NOSETTLEMENT,PARTSETTLEMENT,ALLSETTLEMENT',
        // loadStartTime: '',
        // loadEndTime: '',
        // departureStartTime: '',
        // departureEndTime: '',
        // batchNo: '',
        truckIdNumber: '',
        dirverName: ''
      },
      rules: {
        shipSn: [{ validator: orgidIdentifier, tigger: 'blur' }]
      },
      searchTime: [parseTime(new Date() - 60 * 24 * 60 * 60 * 1000), parseTime(new Date())],
      pickerOptions: {
        shortcuts: pickerOptions2
      }
    }
  },
  watch: {
    searchTime (newVal) {
      if (newVal) {
          this.$set(this.searchObjs, 'departureStartTime', parseTime(this.searchTime[0], '{y}-{m}-{d} ') + '00:00:00')
          this.$set(this.searchObjs, 'departureEndTime', parseTime(this.searchTime[1], '{y}-{m}-{d} ') + '23:59:59')
        }
    },
    // 传到子组件
    searchForm: {
      handler(cval, oval) {
        this.searchObjs = Object.assign({}, cval)
        if (this.searchTime) {
          this.$set(this.searchObjs, 'departureStartTime', parseTime(this.searchTime[0], '{y}-{m}-{d} ') + '00:00:00')
          this.$set(this.searchObjs, 'departureEndTime', parseTime(this.searchTime[1], '{y}-{m}-{d} ') + '23:59:59')
        }
      },
      deep: true
    }
  },
  mounted() {
    this.searchForm.orgid = this.otherinfo.orgid
    if (this.isAllOrg) { // 到车汇总/到站装卸费/到站其他费，(到付)要传结算网点 其他的费用不需要
      this.searchForm.ascriptionOrgid = this.otherinfo.orgid
    }
    this.onSubmit()
  },
  methods: {
    // 接收子组件传回来的东西
    getDataObj(obj) {
      this.searchTime = [obj.departureStartTime, obj.departureEndTime]
      this.searchForm = Object.assign({}, obj)
      this.$emit('change', obj)
    },
    onSubmit() {
      /**
       * 发车网点orgid
         到车网点arriveOrgid
         结算网点ascriptionOrgid
       */
      const searchObj = Object.assign({}, this.searchForm)
      if (this.searchTime) {
        this.$set(searchObj, 'departureStartTime', parseTime(this.searchTime[0], '{y}-{m}-{d} ') + '00:00:00')
        this.$set(searchObj, 'departureEndTime', parseTime(this.searchTime[1], '{y}-{m}-{d} ') + '23:59:59')
      }
      this.$emit('change', searchObj)
    },
    clearForm(formName) {
      this.$nextTick(() => {
        this.searchForm = this.$options.data().searchForm
        this.searchTime = this.$options.data().searchTime
        // Object.assign(this.$data, this.$options.data())
        this.$refs[formName].resetFields()
        this.searchForm.orgid = this.otherinfo.orgid
        this.searchForm.ascriptionOrgid = this.otherinfo.orgid
        this.searchAll = '1'
      setTimeout(() => {
        this.searchAll = ''
      }, 50)
      })
    }
  }
}

</script>
