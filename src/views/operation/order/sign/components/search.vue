<template>
    <el-form :inline="true" :size="btnsize" label-position="right" :rules="rules" :model="searchForm" label-width="80px" class="receipt_searchinfo clearfix">
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
        <el-form-item label="开单网点">
            <SelectTree v-model="searchForm.shipFromOrgid" />
        </el-form-item>
        
        <el-form-item label="签收状态"  prop="signStatus">
          <selectType v-model="searchForm.signStatus"  type="sign_status"/>
        </el-form-item>
        <el-form-item label="凭证状态"  prop="recStatus">
          <selectType v-model="searchForm.thestatus" type="" />
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
    issender: {
      type: Boolean,
      dafault: false
    }
  },
  computed: {
  },
  data () {
    let _this = this
    const validateFormNumber = (rule, value, callback) => {
      let reg = REGEX.ONLY_NUMBER
       if (value === '' || value === null || !value || value === undefined) {
        callback()
      } else if (!(reg.test(value))) {
        callback(new Error('请输入最多20个字符，只能输字母和数字'))
      } else {
        callback()
      }
    }

    return {
      searchCreatTime: [new Date() - 60 * 24 * 60 * 60 * 1000, +new Date()],
      thestatus: '',
      searchForm: {
        shipFromOrgid:'',
        // number:'',
        shipSn:'',
        shipFromCityCode:'',
        shipToCityCode:'',
        shipSenderId:'',
        shipReceiverId:'',
        signStatus:''
      },
      rules: {
        mobile: [{
          //validator: validateFormMobile, trigger: 'blur'
          shipSn: validateFormNumber, trigger: 'change'
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
      this.$emit('change', this.searchForm)
    },
    clearForm () {
      this.searchForm.shipFromOrgid = ''
      this.searchForm.orgid = this.orgid
      this.searchForm.shipSn = ''
      this.searchForm.shipReceiverId = ''
      this.searchForm.shipSenderId = ''
       this.searchForm.searchCreatTime = ''
    }
  }
}
</script> 
<style lang="scss">
.tab-content{
    .receipt_searchinfo{
        padding:15px 20px;
        border-bottom:1px dashed #999;
        .el-form-item{
            margin-bottom: 0;
            margin-top:10px;
        }
        
    }
    .receipt_searchinfo--btn{
        float: right;
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
</style>

