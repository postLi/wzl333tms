<template>
  <el-form :inline="true" :size="btnsize" label-position="right"  :model="searchForm" label-width="70px"  class="staff_searchinfo clearfix">
    <div class="staff_searchinfo--input">
      <el-form-item label="开单网点">
        <select-tree v-model="searchForm.orgid" :orgid="searchForm.orgid" />
      </el-form-item>
      <el-form-item label="交账状态">
        <select-type v-model="searchForm.status" type="fee_status" >
        </select-type>
      </el-form-item>
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
      <el-form-item label="签收状态" prop="signStatus">
        <selectType v-model="searchForm.signStatus" type="sign_status">
          <el-option slot="head" label="全部" value=""></el-option>
        </selectType>
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
      type: [Number, String]
    }
  },
  data() {
    return {
      searchObjs: {},
      searchCreatTime: [],
      defaultTime: [parseTime(+new Date() - 60 * 24 * 60 * 60 * 1000, '{y}-{m}-{d}'), parseTime(new Date(), '{y}-{m}-{d}')],
      searchForm: {
        orgid: '',
        status: '',
        endTime: '',
        startTime: ''
      },
      pickerOptions2: {
        shortcuts: pickerOptions2
      }
    }
  },
  watch: {
    searchCreatTime (newVal) {
      if (newVal) {
          this.$set(this.searchObjs, 'startTime', parseTime(this.searchCreatTime[0], '{y}-{m}-{d} ') + '00:00:00')
          this.$set(this.searchObjs, 'endTime', parseTime(this.searchCreatTime[1], '{y}-{m}-{d} ') + '23:59:59')
        }
    },
    orgid: {
      handler(newVal) {
        this.searchForm.orgid = Number(newVal) || ''
      },
      immediate: true
    },
    // 传到子组件
    searchForm: {
      handler(cval, oval) {
        this.searchObjs = Object.assign({}, cval)
        this.searchObjs.status = this.searchObjs.status === '' ? null : this.searchObjs.status
        if (this.searchCreatTime) {
          this.$set(this.searchObjs, 'startTime', parseTime(this.searchCreatTime[0], '{y}-{m}-{d} ') + '00:00:00')
          this.$set(this.searchObjs, 'endTime', parseTime(this.searchCreatTime[1], '{y}-{m}-{d} ') + '23:59:59')
        }
      },
      deep: true
    }
  },
  mounted() {
    this.searchForm.orgid = this.orgid
    this.searchCreatTime = this.defaultTime
    // this.searchForm.status = 'NOSETTLEMENT'
    this.onSubmit()
  },
  methods: {
     // 接收子组件传回来的东西
    getDataObj(obj) {
      this.searchCreatTime = [obj.startTime, obj.endTime]
      this.searchForm = Object.assign({}, obj)
      this.$emit('change', obj)
    },
    onSubmit() {
      const searchObj = Object.assign({}, this.searchForm)
      searchObj.status = searchObj.status === '' ? null : searchObj.status
      if (this.searchCreatTime && this.searchCreatTime[0]) {
        searchObj.startTime = this.searchCreatTime[0] + ' 00:00:00'
        searchObj.endTime = this.searchCreatTime[1] + ' 23:59:59'
      }

      this.$emit('change', searchObj)
    },
    clearForm() {
      this.searchForm.status = ''
      this.searchForm.startTime = ''
      this.searchForm.endTime = ''
      this.searchCreatTime = this.defaultTime
      this.searchForm.orgid = this.otherinfo.orgid
      this.searchObjs.signStatus = ''
    }
  }
}
</script>

