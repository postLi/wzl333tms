<template>
  <el-form refs="searchForm" :inline="true" :size="btnsize" label-position="right" :rules="rules" :model="searchForm" label-width="80px" class="staff_searchinfo clearfix">
    <el-form-item label="短驳时间">
      <el-date-picker v-model="searchForm.createTime" type="datetime" placeholder="选择日期" clearable></el-date-picker>
    </el-form-item>
    <el-form-item label="批次状态" prop="billing_type">
      <el-select v-model="searchForm.billing_type" clearable size="small" clearable>
        <el-option v-for="(value, key) in $const.SHORT_STATE" :key="key" :label="value" :value="key">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="发车批次" prop="orgid">
      <el-input v-model="searchForm.orgid" maxlength="15" auto-complete="off" clearable></el-input>
    </el-form-item>
    <el-form-item label="车牌号">
      <el-input v-model="searchForm.shipToCityCode" maxlength="8" auto-complete="off" clearable></el-input>
    </el-form-item>
    <el-form-item label="司机名称">
      <el-input v-model="searchForm.shipToCityCode" maxlength="8" auto-complete="off" clearable></el-input>
    </el-form-item>
    <el-form-item label="发车网点">
      <el-input v-model="searchForm.shipToCityCode" maxlength="15" auto-complete="off" clearable></el-input>
    </el-form-item>
    <el-form-item class="staff_searchinfo--btn">
      <el-button type="primary" @click="onSubmit">查询</el-button>
      <el-button type="info" @click="clearForm" plain>清空</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { REGEX }  from '@/utils/validate'
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
  data () {
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
      searchForm: {},
      rules:{
        orgid: [{validator: orgidIdentifier, tigger: 'blur'}]
      }
    }
  },
  methods: {
    onSubmit () {
      this.$emit('change', this.searchForm)
    },
    clearForm () {
      // this.$refs['searchForm'].resetFields()
      this.searchForm.orgid = ''
      this.searchForm.shipFromCityCode = ''
      this.searchForm.shipToCityCode = ''
    }
  }
}
</script>

<style lang="scss">
.tab-content{
    .staff_searchinfo{
        padding:15px 20px;
        border-bottom:1px dashed #999;
        .el-form-item{
            margin-bottom: 0;
        }
        
    }
    .staff_searchinfo--btn{
        float: right;
    }
}
@media screen and (max-width:1308px){
  .tab-content {
      .staff_searchinfo{
          .el-form-item{
              margin-bottom: 10px;
          }
      }
      .staff_searchinfo--btn{
          float: none;
      }
  }
}
</style>
