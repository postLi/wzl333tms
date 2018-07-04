<template>
    <el-form :inline="true" :size="btnsize" label-position="right" :rules="rules" :model="searchForm" class="receipt_searchinfo clearfix">
      <el-form-item label="开单时间:">
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
        <!-- <el-form-item label="开单网点">
            <SelectTree v-model="searchForm.shipFromOrgid" />
        </el-form-item> -->
        
        <el-form-item :label="title+'状态'"  prop="recStatus">
          <selectType v-model="thestatus" :type="type" />
        </el-form-item>
        <el-form-item label="运单号">
            <el-input v-model="searchForm.shipSn" maxlength="20" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="出发城市">
            <SelectCity @change="getFromCity" />
        </el-form-item>
        <el-form-item label="到达城市">
            <!-- <el-input v-model="searchForm.shipToCityCode" maxlength="20" auto-complete="off"></el-input> -->
            <SelectCity @change="getToCity" />
        </el-form-item>
        <el-form-item label="发货人">
            <el-input v-model="searchForm.shipSenderId" maxlength="15" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="收货人">
            <el-input v-model="searchForm.shipReceiverId" maxlength="15" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item class="receipt_searchinfo--btn">
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <el-button type="info" @click="clearForm" plain>清空</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import { REGEX }  from '@/utils/validate'
import SelectTree from '@/components/selectTree/index'
import SelectType from '@/components/selectType/index'
import SelectCity from '@/components/selectCity/index'
import { parseTime }  from '@/utils/index'
export default {
  components: {
    SelectTree,
    SelectCity,
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
    type:String,
    title:String,
    status:String,
    issender: {
      type: Boolean,
      dafault: false
    }
  },
  computed: {
  },
  data () {
    let _this = this
    const validateshipSn = function(rule, value, callback) {
      if (value === '' || value === null || !value || value === undefined) {
        callback(new Error('请输入运单号'))
      }else if (REGEX.ONLY_NUMBER_AND_LETTER.test(value)) {
        callback()
      }else {
        callback(new Error('只能输字母和数字'))
      }
    }

    return {
      searchCreatTime: [new Date() - 60 * 24 * 60 * 60 * 1000, +new Date()],
      thestatus: 105,
      // recStatus:105,
      searchForm: {
        shipFromOrgid:'',
        // number:'',
        shipSn:'',
        shipFromCityCode:'',
        shipToCityCode:'',
        shipSenderId:'',
        shipReceiverId:''
      },
      rules: {
        shipSn: [
          { required: true, trigger: 'blur', validator: validateshipSn}
        ]
      }
    }
  },
  watch: {
    orgid(newVal){
      this.searchForm.orgid = newVal
    }
  },
  mounted () {
    // this.searchForm.orgid = this.orgid
  },
  methods: {
    getOrgid (id){
      this.searchForm.orgid = id
    },
    getFromCity(city){
     
      this.searchForm.shipFromCityCode = city.id.toString() 
    },
    getToCity(city){
      this.searchForm.shipToCityCode =  city.id.toString() 
    },
    onSubmit () {
      // this.searchForm.startTime = this.searchCreatTime ? parseTime(this.searchCreatTime[0]) : ""
      // this.searchForm.endTime = this.searchCreatTime ? parseTime(this.searchCreatTime[1]) : ""
      this.searchForm.startTime = this.searchCreatTime[0]
      this.searchForm.endTime = this.searchCreatTime[1]
      this.searchForm[this.status] = this.thestatus
      this.$emit('change', this.searchForm)
    },
    clearForm () {
      this.searchForm.shipFromOrgid = ''
      this.searchForm.orgid = this.orgid
      this.searchForm.shipSn = ''
      this.searchForm.shipReceiverId = ''
      this.searchForm.shipSenderId = ''
      this.searchForm.searchCreatTime = ''
      this.searchForm.shipFromCityCode = ''
      this.searchForm.shipToCityCode = ''
      this.searchForm.thestatus = ''
      this.searchForm.startTime = ''
      this.searchForm.endTime = ''
    }
  }
}
</script> 
<style lang="scss">
.receipt-manager{
    .receipt_searchinfo{
        padding:10px 0;
        margin: 0 10px;
        border-bottom:1px dashed #999;
        .el-form-item{
            margin-bottom: 0;
            margin-top:10px;
        }
        
    }
    .receipt_searchinfo--btn{
        float: right;
        margin-right: 0;
    }
}
@media screen and (max-width:1308px){
  .tab-content {
      .receipt_searchinfo{
          .el-form-item{
              margin-bottom: 10px;
          }
      }
      .receipt_searchinfo--btn{
          float: none;
      }
  }
}
.el-date-editor--datetimerange.el-input, .el-date-editor--datetimerange.el-input__inner{
  width:200px;
}
</style>

