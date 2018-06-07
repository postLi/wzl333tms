<template>
  <el-form :inline="true" :size="btnsize" label-position="right" :rules="rules" :model="searchForm"  class="staff_searchinfo clearfix">
      <el-form-item label="开单时间:">
        <div class="block">
          <el-date-picker
            v-model="searchCreatTime"
            :default-value="defaultTime"
            type="datetimerange"
            align="right"
            value-format="yyyy-MM-dd hh:mm:ss"
            start-placeholder="开始日期"
            :picker-options="pickerOptions2"
            end-placeholder="结束日期">
          </el-date-picker>
        </div>
      </el-form-item>
      <el-form-item label="开单网点:">
        <select-tree v-model="searchForm.orgid" />
      </el-form-item>
      <el-form-item label="运单号" class="searchinfo--order">
        <el-input
            v-model="searchForm.shipSn"
            maxlength="15"
            @change="onSubmit"
            clearable>
        </el-input>
      </el-form-item>
    <el-form-item label="出发城市" class="searchinfo--order">
        <el-input
            v-model="searchForm.shipFormCityName"
            maxlength="15"
            @change="onSubmit"
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
import SelectType from '@/components/selectType/index'

export default {
  name: 'order-manage-search',
  components: {
    SelectTree,
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
    issender: {
      type: Boolean,
      dafault: false
    }
  },
  data () {
    let _this = this

    return {
      searchCreatTime: [],
      defaultTime: [+new Date() - 60 * 24 * 60 * 60 * 1000, +new Date()],
      searchForm: {
        orgid: '',
        shipSn: '',
        shipFormCityName: ''
      },
      rules: {
        mobile: [{
          //validator: validateFormMobile, trigger: 'blur'
         // validator: validateFormNumber, trigger: 'change'
        }]
      },
      pickerOptions2: {
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            const end = new Date();
            const start = new Date(end.getFullYear()+'-'+(end.getMonth()+1)+"-"+end.getDate() + " 00:00:00")
            picker.$emit('pick', [start, end]);
          }
        },{
          text: '昨天',
          onClick(picker) {
            const day = new Date(new Date().getTime() - 24 * 60 * 60 * 1000)
            const end = new Date(day.getFullYear()+'-'+(day.getMonth()+1)+"-"+day.getDate() + " 23:59:59")
            const start = new Date(day.getFullYear()+'-'+(day.getMonth()+1)+"-"+day.getDate() + " 00:00:00")
            picker.$emit('pick', [start, end]);
          }
        },{
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
        },{
          text: '本月',
          onClick(picker) {
            const end = new Date();
            const start = new Date(end.getFullYear(),end.getMonth(),1);
            picker.$emit('pick', [start, end]);
          }
        },{
          text: '上个月',
          onClick(picker) {
            let day = new Date()
            day = new Date(day.getFullYear(), day.getMonth(), 1)
            const start = new Date(day.getFullYear(),day.getMonth()-1,1);
            const end = new Date(day.getFullYear(),day.getMonth()-1,(day.getTime() - start.getTime())/(24*60*60*1000));
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
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
    this.onSubmit()
  },
  methods: {
    onSubmit () {
      let searchObj = {}
      searchObj.shipFromOrgid = this.searchForm.orgid
      searchObj.shipFormCityName = this.searchForm.shipFormCityName
      searchObj.startTime = this.searchCreatTime[0]
      searchObj.endTime = this.searchCreatTime[1]
      searchObj.shipSn = this.searchForm.shipSn

      this.$emit('change', searchObj)
    },
    clearForm () {
      this.searchForm.orgid = this.orgid
      this.searchForm.shipFormCityName = ''
      this.searchForm.startTime = ''
      this.searchForm.endTime = ''
      this.searchForm.shipSn = ''
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
    .searchinfo--order{
      .el-select{
        width: 100px;
      }
      .el-form-item__content>.el-input{
        width: 200px;
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

