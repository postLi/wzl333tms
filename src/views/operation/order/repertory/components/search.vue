<template>
  <el-form ref="searchForm" :inline="true" :size="btnsize" label-position="right" :rules="rules" :model="searchForm" label-width="80px" class="staff_searchinfo clearfix">
    <el-form-item label="开单时间">
      <el-date-picker v-model="searchForm.createTime" type="datetime" value-format="timestamp" placeholder="选择日期"></el-date-picker>
    </el-form-item>
    <el-form-item label="运单号" prop="orgid">
      <el-input v-model="searchForm.orgid" maxlength="15" auto-complete="off" clearable></el-input>
    </el-form-item>
    <el-form-item label="出发城市">
      <el-input v-model="searchForm.shipFromCityCode" maxlength="15" auto-complete="off" clearable></el-input>
    </el-form-item>
    <el-form-item label="到达城市">
      <el-input v-model="searchForm.shipToCityCode" maxlength="15" auto-complete="off" clearable></el-input>
    </el-form-item>
    <el-form-item class="staff_searchinfo--btn">
      <el-button type="primary" @click="onSubmit('searchForm')">查询</el-button>
      <el-button type="info" @click="clearForm('searchForm')" plain>清空</el-button>
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
      searchForm: {
        orgid: ''
      },
      rules:{
        orgid: [{validator: orgidIdentifier, tigger: 'blur'}]
      }
    }
  },
  methods: {
    onSubmit (formName) {
      // this.$refs[formName].resetFields()
      this.$emit('change', this.searchForm)
      // this.$nextTick(() => {
      //   this.$refs[formName].resetFields()
      // })
    },
    clearForm (formName) {
      this.$refs[formName].resetFields()
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
