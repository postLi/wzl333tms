<template>
  <!--label-width="80px"-->
  <el-form :inline="true" :size="btnsize" label-position="right" :rules="rules" :model="searchForm"  class="staff_searchinfo clearfix">
      <el-form-item label="创建时间:">
        <div class="block">
          <el-date-picker
            v-model="searchCreatTime"
            type="datetimerange"
            align="right"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </div>
          <!--<SelectTree v-model="searchForm.orgid" />-->
      </el-form-item>
      <!--<el-form-item :label="title+'货人'">-->
          <!--<el-input-->
              <!--:placeholder="title+'货单位或'+title+'货人'"-->
              <!--v-model="searchForm.name"-->
              <!--maxlength="15"-->
              <!--clearable>-->
          <!--</el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="订单状态:">-->
          <!--<el-input-->
              <!--v-numberOnly-->
              <!--placeholder=""-->
              <!--maxlength="11"-->
              <!--v-model="searchForm.mobile"-->
              <!--clearable>-->
          <!--</el-input>-->
      <!--</el-form-item>-->
    <el-form-item label="订单状态：">
      <el-select v-model="searchForm.mobile">
        <!--<el-option v-for="item in manageType" :key="item.id" :label="item.dictName" :value="item.id"></el-option>-->
        <el-option label="已受理" :value="3"></el-option>
        <el-option label="未受理" :value="4"></el-option>
        <el-option label="已拒绝" :value="4"></el-option>
        <el-option label="全部" :value="4"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="运单号:">
      <el-input
        v-numberOnly
        placeholder=""
        maxlength="11"
        v-model="searchForm.name"
        clearable>
      </el-input>
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
    },
    issender: {
      type: Boolean,
      dafault: false
    }
  },
  computed: {
    title () {
      return this.issender ? '发' : '收'
    }
  },
  data () {
    let _this = this
    const validateFormMobile = function (rule, value, callback) {
      if(validateMobile(value)){
        callback()
      } else {
        callback(new Error('请输入有效的手机号码'))
      }
    }

    const validateFormEmployeer = function (rule, value, callback) {
      callback()
    }

    const validateFormNumber = function (rule, value, callback) {
      _this.searchForm.mobile = value.replace(REGEX.NO_NUMBER, '')
      callback()
    }

    return {
      searchCreatTime: [+new Date() - 60 * 24 * 60 * 60 * 1000, new Date()],
      searchForm: {
        orgid: '',
        name: '',
        mobile: ''
      },
      rules: {
        mobile: [{
          //validator: validateFormMobile, trigger: 'blur'
          validator: validateFormNumber, trigger: 'change'
        }]
      }
    }
  },
  watch: {
    orgid(newVal){
      this.searchForm.orgid = newVal
    }
  },
  mounted () {
    this.searchForm.orgid = this.orgid
  },
  methods: {
    getOrgid (id){
      this.searchForm.orgid = id
    },
    onSubmit () {
      this.$emit('change', this.searchForm)
    },
    clearForm () {
      this.searchForm.name = ''
      this.searchForm.orgid = this.orgid
      this.searchForm.mobile = ''
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

