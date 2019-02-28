<template>
    <el-form :inline="true" :size="btnsize" label-position="right" :rules="rules" :model="searchForm" label-width="70px" class="staff_searchinfo clearfix">
      <div class="staff_searchinfo--input">
        <el-form-item label="开单时间">
          <div class="block">
            <el-date-picker
              v-model="searchCreatTime"
              :default-value="defaultTime"
              type="daterange" unlink-panels
              align="right"
              value-format="yyyy-MM-dd"
              start-placeholder="开始日期"
              :picker-options="pickerOptions2"
              end-placeholder="结束日期">
            </el-date-picker>
          </div>
            <!--<SelectTree v-model="searchForm.orgid" />-->
        </el-form-item>
          <!-- <el-form-item :label="title+'状态'"  prop="fundsRecStatus">
            <selectType v-model="thestatus" :type="type" />
          </el-form-item> -->
          <el-form-item :label="title+'状态'"  prop="thestatus">
            <selectType v-model="thestatus"  :type="type">
            </selectType>
          </el-form-item>
          <el-form-item label="运单号">
              <el-input v-model="searchForm.shipSn" :maxlength="20" auto-complete="off"
              clearable @keyup.enter.native="onSubmit"></el-input>
          </el-form-item>
          <el-form-item label="发站">
            <el-input v-model="searchForm.shipFromCityName" :maxlength="20"
            clearable auto-complete="off" @keyup.enter.native="onSubmit"></el-input>
          </el-form-item>
          <el-form-item label="到站">
              <el-input v-model="searchForm.shipToCityName"
              clearable :maxlength="20" auto-complete="off" @keyup.enter.native="onSubmit"></el-input>
          </el-form-item>
          <el-form-item label="发货人">
              <el-input v-model="searchForm.senderName"
              clearable :maxlength="15" auto-complete="off" @keyup.enter.native="onSubmit"></el-input>
          </el-form-item>
          <el-form-item label="收货人">
              <el-input v-model="searchForm.receiverName"
              clearable :maxlength="15" auto-complete="off" @keyup.enter.native="onSubmit"></el-input>
          </el-form-item>
          <searchAll :searchObj="searchObjs" @dataObj="getDataObj"></searchAll>
      </div>
        <el-form-item class="staff_searchinfo--btn">
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <el-button type="info" @click="clearForm" plain>清空</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import { REGEX } from '@/utils/validate'
import SelectTree from '@/components/selectTree/index'
import SelectType from '@/components/selectType/index'
import SelectCity from '@/components/selectCity/index'
import { parseTime, pickerOptions2 } from '@/utils/index'
import searchAll from '@/components/searchAll/index'
export default {
  components: {
    SelectTree,
    SelectCity,
    SelectType,
    searchAll
  },
  props: {
    btnsize: {
      type: String,
      default: 'mini'
    },
    orgid: {
      type: Number
    },
    type: String,
    title: String,
    status: String,
    issender: {
      type: Boolean,
      dafault: false
    }
  },
  computed: {
  },
  data() {
    // const _this = this
    const validateshipSn = function(rule, value, callback) {
      if (value === '' || value === null || !value || value === undefined) {
        callback(new Error('请输入运单号'))
      } else if (REGEX.ONLY_NUMBER_AND_LETTER.test(value)) {
        callback()
      } else {
        callback(new Error('只能输字母和数字'))
      }
    }

    return {
      // searchCreatTime: [new Date() - 60 * 24 * 60 * 60 * 1000, +new Date()],
      searchCreatTime: [],
      defaultTime: [parseTime(+new Date() - 60 * 24 * 60 * 60 * 1000, '{y}-{m}-{d}'), parseTime(new Date(), '{y}-{m}-{d}')],
      thestatus: '',
      searchForm: {
        // shipFromOrgid: '',
        // number:'',
        shipSn: '',
        // shipFromCityCode: '',
        shipFromCityName: '',
        // shipToCityCode: '',
        shipToCityName: '',
        senderName: '',
        receiverName: '',
        startTime: '',
        endTime: ''

      },
      rules: {
        shipSn: [
          { required: true, trigger: 'blur', validator: validateshipSn }
        ]
      },
      pickerOptions2: {
        shortcuts: pickerOptions2
      },
      searchObjs: {}
    }
  },
  watch: {
    orgid(newVal) {
      this.searchForm.orgid = newVal
    },
    type: {
      handler(status) {
        console.log(status)
        if (status === 'funds_rec_status') {
          this.thestatus = 254 // 回收状态
        }
        if (status === 'funds_remittance_status') {
          this.thestatus = 257 // 汇款状态
        }
        if (status === 'funds_account_status') {
          this.thestatus = 260 // 到账状态
        }
        if (status === 'funds_giveout_status') {
          this.thestatus = 263 // 发放状态
        }
      },
      immediate: true
    },
    searchCreatTime (newVal) {
      if (newVal) {
          this.$set(this.searchObjs, 'startTime', parseTime(this.searchCreatTime[0], '{y}-{m}-{d} ') + '00:00:00')
          this.$set(this.searchObjs, 'endTime', parseTime(this.searchCreatTime[1], '{y}-{m}-{d} ') + '23:59:59')
        }
    },
    searchForm: {
      handler(cval, oval) {
        this.searchObjs = Object.assign({}, cval)
        this.searchObjs[this.status] = this.thestatus
        if (this.searchCreatTime) {
           this.$set(this.searchObjs, 'startTime', parseTime(this.searchCreatTime[0], '{y}-{m}-{d} ') + '00:00:00')
          this.$set(this.searchObjs, 'endTime', parseTime(this.searchCreatTime[1], '{y}-{m}-{d} ') + '23:59:59')
        }
      },
      deep: true
    }
  },
  mounted() {
    // console.log('title:', this.title, this.status)
    this.searchCreatTime = this.defaultTime
    this.onSubmit()
    // this.searchForm.shipFromOrgid = this.otherinfo.orgid
  },
  methods: {
     getDataObj(obj) {
      this.type= this.status
      this.thestatus = obj[this.status]
      this.searchForm[this.status] = obj[this.status]
      this.searchCreatTime = [obj.startTime, obj.endTime]
      this.searchForm = Object.assign({}, obj)
      this.$emit('change', obj)
    },
    getOrgid(id) {
      this.searchForm.orgid = id
    },
    // getFromCity(city) {
    //   console.log(city)
    //   this.searchForm.shipFromCityCode = city.id.toString()
    //   this.searchForm.shipFromCityName = city.longAddr
    // },
    // getToCity(city) {
    //   this.searchForm.shipToCityCode = city.id.toString()
    //   this.searchForm.shipToCityName = city.longAddr
    // },
    onSubmit() {
      // this.searchForm.startTime = this.searchCreatTime ? parseTime(this.searchCreatTime[0]) : ''
      // this.searchForm.endTime = this.searchCreatTime ? parseTime(this.searchCreatTime[1]) : ''
      this.searchForm.startTime = this.searchCreatTime ? parseTime(this.searchCreatTime[0], '{y}-{m}-{d} ') + '00:00:00' : ''
      this.searchForm.endTime = this.searchCreatTime ? parseTime(this.searchCreatTime[1], '{y}-{m}-{d} ') + '23:59:59' : ''
      this.searchForm[this.status] = this.thestatus
      const data = Object.assign({}, this.searchForm)
      this.$emit('change', data)
    },
    clearForm() {
      this.searchForm.shipSn = ''
      this.searchForm.receiverName = ''
      this.searchForm.senderName = ''
      this.searchForm.shipFromCityName = ''
      this.searchForm.shipToCityName = ''
      this.thestatus = ''
      this.searchCreatTime = this.defaultTime
    }
  }
}
</script> 
