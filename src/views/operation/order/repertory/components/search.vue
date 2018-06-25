<template>
  <el-form ref="searchForm" :inline="true" :size="btnsize" label-position="right" :rules="rules" :model="searchForm" label-width="80px" class="staff_searchinfo clearfix">
    <el-form-item label="开单时间">
      <el-date-picker v-model="searchTime" :default-value="defaultTime" type="daterange" align="right" value-format="yyyy-MM-dd" start-placeholder="开始日期" :picker-options="pickerOptions" end-placeholder="结束日期">
      </el-date-picker>
    </el-form-item>
    <el-form-item label="运单号" prop="shipSn">
      <el-input v-model="searchForm.shipSn" maxlength="15" auto-complete="off" clearable></el-input>
    </el-form-item>
    <el-form-item label="出发城市">
      <el-input v-model="searchForm.shipFromCityName" maxlength="15" auto-complete="off" clearable></el-input>
    </el-form-item>
    <el-form-item label="到达城市">
      <el-input v-model="searchForm.shipToCityName" maxlength="15" auto-complete="off" clearable></el-input>
    </el-form-item>
    <el-form-item class="staff_searchinfo--btn">
      <el-button type="primary" @click="onSubmit">查询</el-button>
      <el-button type="info" @click="clearForm('searchForm')" plain>清空</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { REGEX } from '@/utils/validate'
import SelectTree from '@/components/selectTree/index'
export default {
  components: {
    SelectTree
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
      let reg = REGEX.ONLY_NUMBER
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
        shipSn: '',
        shipFromCityName: '',
        shipToCityName: ''
      },
      rules: {
        shipSn: [{ validator: orgidIdentifier, tigger: 'blur' }]
      },
      searchTime: [],
      defaultTime: [+new Date() - 60 * 24 * 60 * 60 * 1000, +new Date()],
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近两个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 60);
            picker.$emit('pick', [start, end]);
          }
        }]
      }
    }
  },
  methods: {
    onSubmit() {
      let searchObj = {}
      searchObj = Object.assign({}, this.searchForm)
      this.$set(searchObj, 'createTime', this.searchTime[0])
      this.$set(searchObj, 'endTime', this.searchTime[1])
      this.$emit('change', searchObj)
    },
    clearForm(formName) {

      this.$nextTick(() => {
        Object.assign(this.$data, this.$options.data())
        this.$refs[formName].resetFields()
      })
      // this.$refs[formName].resetFields()
      // this.searchForm.shipSn = ''
      // this.searchForm.shipFromCityName = ''
      // this.searchForm.shipToCityName = ''
      // this.searchTime = []
    }
  }
}

</script>
<style lang="scss" scoped>
.tab-content {
  .el-input--mini{
    width:150px;
  }
  .el-range-editor--mini.el-input__inner{
    width:200px;
  }
  .staff_searchinfo {
    padding: 15px 20px;
    border-bottom: 1px dashed #999;
    .el-form-item {
      margin-bottom: 0;
    }
  }
  .staff_searchinfo--btn {
    float: right;
  }
}

@media screen and (max-width:1308px) {
  .tab-content {
    .staff_searchinfo {
      .el-form-item {
        margin-bottom: 10px;
      }
    }
    .staff_searchinfo--btn {
      float: none;
    }
  }
}

</style>
