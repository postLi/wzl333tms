<template>
  <el-form :inline="true" :size="btnsize" label-position="right" :rules="rules" :model="searchForm" label-width="80px" class="staff_searchinfo clearfix">
    <el-form-item label="发车时间:">
      <el-date-picker
        v-model="searchCreatTime"
        type="daterange"
        align="right"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        >
      </el-date-picker>
    </el-form-item>
    <el-form-item label="批次状态:">
      <SelectType v-model="searchForm.batchTypeId" type="main_batch_type" placeholder="请选择" class="pickup-way" />
      <!--<SelectTree v-model="searchForm.orgid" />-->
    </el-form-item>
    <el-form-item label="发车批次:">
      <el-input
        v-model="searchForm.batchNo"
        maxlength="15"
        clearable>
      </el-input>
    </el-form-item>
      <!--<el-form-item label="发站:">-->
          <!--<SelectTree v-model="searchForm.orgid" />-->
      <!--</el-form-item>-->

    <el-form-item label="车牌号:" class="">
      <el-input
        v-model="searchForm.truckIdNumber"
        maxlength="15"
        clearable>
      </el-input>
    </el-form-item>
    <el-form-item label="司机名称:" prop="dirverName">
      <el-input
        v-model="searchForm.driverName"
        maxlength="15"
        clearable>
      </el-input>
    </el-form-item>

      <el-form-item class="staff_searchinfo--btn art_marginTop" >
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button type="info" @click="clearForm" plain>清空</el-button>
      </el-form-item>
  </el-form>
</template>

<script>
import { REGEX }  from '@/utils/validate'
import { parseTime }  from '@/utils/'
import SelectTree from '@/components/selectTree/index'
import SelectType from '@/components/selectType/index'
export default {
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
  computed: {
    title () {
      // return this.issender ? '发' : '收'
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
    //dirverName
    const validateDriverName = function (rule,value,callback) {
      if(REGEX.ONLY_NUMBER_AND_LETTER(value)){
        callback()
      }else{
        callback(new Error('请输入有效的发车批次'))
      }
    }
    const validateFormNumber = function (rule, value, callback) {
      _this.searchForm.mobile = value.replace(REGEX.NO_NUMBER, '')
      callback()
    }

    return {
      searchCreatTime: [+new Date() - 60 * 24 * 60 * 60 * 1000, +new Date()],
      pickOption: {
        firstDayOfWeek:1,
        disabledDate(time) {
          // 小于终止日
          return _this.form.tmsOrderPickup.arriveTime ? time.getTime() > _this.form.tmsOrderPickup.arriveTime : false
        }
      },
      pickOption2: {
        firstDayOfWeek:1,
        disabledDate(time) {
          // 大于起始日
          return _this.form.tmsOrderPickup.outTime ? time.getTime() < _this.form.tmsOrderPickup.outTime : false
        }
      },
      searchForm: {
        orgid: '',
        driverName: '',
        truckIdNumber:'',//车牌号
        batchTypeId: '',//批次状态
        batchNo:'',//发车批次
        loadTypeId:39,//配载类型
        endTime:'',//结束时间
        beginTime:''
      },
      rules: {
        mobile: [{
          //validator: validateFormMobile, trigger: 'blur'
          validator: validateFormNumber, trigger: 'change'
        }],
        driverName: [{
          //validator: validateFormMobile, trigger: 'blur'
          validator: validateDriverName, trigger: 'change'
        }]
      }
    }
  },
  watch: {
    orgid(newVal){
      // this.searchForm.orgid = newVal
    }
  },
  mounted () {
    this.searchForm.orgid = this.orgid
    // this.searchForm.batchTypeId = this.orgid
    // this.searchForm.batchTypeId = this.orgid
  },
  methods: {
    getOrgid (id){
      // this.searchForm.orgid = id
    },
    onSubmit () {
      if(this.searchForm){
        this.searchForm.loadStartTime = parseTime(this.searchCreatTime[0])
        this.searchForm.loadEndTime = parseTime(this.searchCreatTime[1])
        this.$emit('change', this.searchForm)
      }

    },
    clearForm () {
      this.searchForm.dirverName = ''
      this.searchForm.orgid = this.orgid
      this.searchForm.truckIdNumber = ''
      this.searchForm.batchNo = ''

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
  .art_marginTop{
    margin-top: 10px;
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

