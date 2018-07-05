<template>
  <el-form :inline="true" :size="btnsize" label-position="right" :rules="rules" :model="searchForm" label-width="80px" class="staff_searchinfo clearfix">
      <el-form-item label="所属网点:">
          <SelectTree v-model="searchForm.orgid" />
      </el-form-item>
      <el-form-item label="收支方式:">
          <el-input
              v-model="searchForm.batchNo"
              maxlength="15"
              clearable>
          </el-input>
      </el-form-item>
    <el-form-item label="状态:" class="art_marginTop">
      <el-input
        v-model="searchForm.truckIdNumber"
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
      // searchCreatTime:[],
      // searchEndTime:[],
      searchCreatTime: [+new Date() - 60 * 24 * 60 * 60 * 1000, +new Date()],
      searchEndTime: [+new Date() - 60 * 24 * 60 * 60 * 1000, +new Date()],
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
        beginTime:'',//
        arrivedbeginDate:'',//到达时间(起始时间)
        arrivedEndDate:''//到达时间(结束时间)
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
  },
  methods: {
    getOrgid (id){
      // this.searchForm.orgid = id
    },
    onSubmit () {
      this.searchForm.beginTime = parseTime(this.searchCreatTime[0])
      this.searchForm.endTime = parseTime(this.searchCreatTime[1])
      this.searchForm.arrivedbeginDate = parseTime(this.searchEndTime[0])
      this.searchForm.arrivedEndDate = parseTime(this.searchEndTime[1])
      this.$emit('change', this.searchForm)
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

