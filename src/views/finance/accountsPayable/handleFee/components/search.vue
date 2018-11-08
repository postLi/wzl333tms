<template>
  <el-form ref="searchForm" :inline="true" :size="btnsize" label-position="right" :rules="rules" :model="searchForm" label-width="70px" class="staff_searchinfo clearfix">
    <div class="staff_searchinfo--input">
      <el-form-item label="发车时间">
        <el-date-picker v-model="searchTime" :default-value="defaultTime" type="daterange" align="right" value-format="yyyy-MM-dd HH:mm:ss" start-placeholder="开始日期" :picker-options="pickerOptions" end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="发车网点" prop="orgid">
        <SelectTree v-model="searchForm.orgid" :orgid="otherinfo.orgid"></SelectTree>
      </el-form-item>
      <el-form-item label="到达网点" prop="arriveOrgid">
        <SelectTree v-model="searchForm.arriveOrgid" >
        </SelectTree>
      </el-form-item>
      <el-form-item label="核销状态" prop="status">
        <el-select v-model="searchForm.status" placeholder="核销状态">
          <el-option v-for="(value, key) in $const.COUNT_STATUS2" :value="key" :key="key" :label="value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="发车批次" prop="batchNo">
        <el-input v-model="searchForm.batchNo" :maxlength="30"></el-input>
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
      type: [Number, String]
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
      maxlength: 25,
      searchObjs: {},
      searchForm: {
        sign: 4, //sign： 3配载应收操作费 4配载应付操作
        orgid: '',
        arriveOrgid: '',
        ascriptionOrgid: '',
        status: '',
        loadStartTime: '',
        loadEndTime: '',
        departureStartTime: '',
        departureEndTime: '',
        batchNo: '',
        truckIdNumber: '',
        dirverName: ''
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
    searchTime(newVal) {
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
    this.searchForm.orgid = this.orgid
    this.searchForm.ascriptionOrgid = this.orgid
    this.onSubmit()
  },
  methods: {
    getDataObj(obj) {
      this.searchTime = [obj.startTime, obj.endTime]
      this.searchForm = Object.assign({}, obj)
      this.$emit('change', obj)
    },
    onSubmit() {
      const searchObj = Object.assign({}, this.searchForm)
      if (this.searchTime) {
        this.$set(searchObj, 'departureStartTime', parseTime(this.searchTime[0], '{y}-{m}-{d} ') + '00:00:00')
        this.$set(searchObj, 'departureEndTime', parseTime(this.searchTime[1], '{y}-{m}-{d} ') + '23:59:59')
      }
      if (searchObj.status==='') {
        searchObj.status = 'NOSETTLEMENT,PARTSETTLEMENT,ALLSETTLEMENT'
      }
      console.log('searchObj', searchObj)
      this.$emit('change', searchObj)
    },
    clearForm(formName) {
      this.$nextTick(() => {
        Object.assign(this.$data, this.$options.data())
        this.$refs[formName].resetFields()
        this.searchForm.orgid = this.orgid
        this.searchAll = '1'
        setTimeout(() => {
          this.searchAll = ''
        }, 50)
      })
    }
  }
}

</script>
