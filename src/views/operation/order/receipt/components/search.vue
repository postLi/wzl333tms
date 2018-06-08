<template>
    <el-form :inline="true" :size="btnsize" label-position="right" :rules="rules" :model="searchForm" label-width="80px" class="staff_searchinfo clearfix">
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
        <el-form-item label="开单网点">
            <SelectTree v-model="searchForm.shipFromOrgid" />
        </el-form-item>
        <el-form-item label="寄出状态">
            <SelectTree v-model="searchForm.sendStatus"  placeholder="请选择" />
        </el-form-item>
        <el-form-item label="运单号" prop="shipSn">
            <el-input v-model="searchForm.shipSn" maxlength="20" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="出发城市">
            <el-input v-model="searchForm.shipFromCityCode" maxlength="10" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="到达城市">
            <el-input v-model="searchForm.shipToCityCode" maxlength="10" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="发货人">
            <el-input v-model="searchForm.shipSenderId" maxlength="15" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="收货人">
            <el-input v-model="searchForm.shipReceiverId" maxlength="15" auto-complete="off"></el-input>
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
    // title () {
    //   return this.issender ? '发' : '收'
    // }
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
      searchCreatTime: [+new Date() - 60 * 24 * 60 * 60 * 1000, new Date()],
      searchForm: {
        orgid: '',
        shipSn:'',
        // name: '',
        // mobile: '',
        time:'',
        statu:'',
        number:'',
        startcity:'',
        endcity:'',
        sendpepole:'',
        recivepepole:''
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
    //   this.searchForm.name = ''
      this.searchForm.orgid = this.orgid
      this.searchForm.shipSn = ''
    //   this.searchForm.mobile = ''
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

