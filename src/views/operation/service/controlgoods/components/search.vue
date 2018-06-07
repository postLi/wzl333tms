<template>
    <el-form :inline="true" :size="btnsize" label-position="right" :rules="rules" :model="searchForm" label-width="80px" class="staff_searchinfo clearfix">
        <el-form-item label="开单时间:">
          <div class="block">
            <el-date-picker
              v-model="searchCreatTime"
              type="datetimerange"
              
              align="right"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions1"
            >
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="开单网点">
            <SelectTree v-model="searchForm.shipFromOrgid" />
        </el-form-item>
        <el-form-item label="运单号" prop="shipSn">
            <el-input v-model="searchForm.shipSn" maxlength="20" auto-complete="off"></el-input>
        </el-form-item>
       
        <el-form-item label="出发城市">
            <SelectCity @change="getFromCity" />
        </el-form-item>
        <el-form-item label="到达城市">
            <!-- <el-input v-model="searchForm.shipToCityCode" maxlength="20" auto-complete="off"></el-input> -->
            <SelectCity @change="getToCity" />
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
import SelectCity from '@/components/selectCity/index'

export default {
  components: {
    SelectTree,
    SelectCity
  },
  props: {
    btnsize: {
      type: String,
      default: 'mini'
    },
    orgid: {
      type: Number
    },
    shipSn: {
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
      searchCreatTime: [+new Date() - 60 * 24 * 60 * 60 * 1000, +new Date()],
      pickerOptions1:'',
    
      searchForm: {
        // orgid: '',
        shipFromOrgid:'',
        shipSn:'',
        shipFromCityCode:'',
        shipToCityCode:''
      },
      rules: {
        shipSn: [{
          
          validator: orgidIdentifier, trigger: 'change'
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
    getFromCity(city){
     
      this.searchForm.shipFromCityCode = city.id.toString() 
    },
    getToCity(city){
      this.searchForm.shipToCityCode =  city.id.toString() 
    },
    // getOrgid (id){
    //   this.searchForm.orgid = id
    // },
    onSubmit () {
      // this.$set(this.searchForm, 'startTime', this.searchCreatTime[0])
      // this.$set(this.searchForm, 'endTime', this.searchCreatTime[1])
      this.searchForm.createTime = this.searchCreatTime ? this.searchCreatTime[0] : ""
      this.searchForm.endTime = this.searchCreatTime ? this.searchCreatTime[1] : ""
      let data = Object.assign({},this.searchForm)
      data.shipFromOrgid =[this.searchForm.shipFromOrgid]
      this.$emit('change', data)
    },
    clearForm () {
    //   this.searchForm.name = ''
      this.searchForm.orgid = this.orgid
      this.searchForm.shipSn = ''
      this.searchForm.shipFromCityCode = ''
      this.searchForm.shipToCityCode = ''
       this.searchForm.shipFromOrgid = ''
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
            margin-top:10px;
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

