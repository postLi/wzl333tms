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
        <!-- <el-form-item label="开单网点">
            <SelectTree v-model="searchForm.shipFromOrgid" />
        </el-form-item> -->
        
        <el-form-item :label="title+'状态'"  prop="recStatus">
          <!-- <el-option slot="head" label="全部" value=""></el-option>
          <selectType v-model="thestatus" :type="type" /> -->
          <selectType v-model="thestatus"  :type="type">
            <el-option slot="head" label="全部" value="" v-if="component !== 'accept'"></el-option>
          </selectType>
        </el-form-item>
        <el-form-item label="运单号">
            <el-input v-model="searchForm.shipSn" :maxlength="20" auto-complete="off"
            clearable @keyup.enter.native="onSubmit"></el-input>
        </el-form-item>
        <el-form-item label="发站">
            <!-- <SelectCity @change="getFromCity" v-model="searchForm.shipFromCityName"/> -->
             <el-input v-model="searchForm.shipFromCityName" :maxlength="20" auto-complete="off" clearable @keyup.enter.native="onSubmit"></el-input>
        </el-form-item>
        <el-form-item label="到站">
            <!-- <el-input v-model="searchForm.shipToCityCode" :maxlength="20" auto-complete="off"></el-input> -->
            <!-- <SelectCity @change="getToCity" v-model="searchForm.shipToCityName"/> -->
            <el-input v-model="searchForm.shipToCityName" :maxlength="20" auto-complete="off" clearable @keyup.enter.native="onSubmit"></el-input>
        </el-form-item>
        <el-form-item label="发货人">
            <el-input v-model="searchForm.sendName" :maxlength="15" clearable auto-complete="off" @keyup.enter.native="onSubmit"></el-input>
        </el-form-item>
        <el-form-item label="收货人">
            <el-input v-model="searchForm.recName" :maxlength="15" clearable auto-complete="off" @keyup.enter.native="onSubmit"></el-input>
        </el-form-item>
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
    component: {
      type: String,
      default: ''
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
    // let _this = this
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
        shipFromOrgid: '',
        // number:'',
        shipSn: '',
        shipFromCityCode: '',
        shipFromCityName: '',
        shipToCityCode: '',
        shipToCityName: '',
        shipSenderId: '',
        recName: ''
      },
      rules: {
        shipSn: [
          { required: true, trigger: 'blur', validator: validateshipSn }
        ]
      },
      pickerOptions2: {
        shortcuts: pickerOptions2
      }
    }
  },
  watch: {
    orgid(newVal) {
      this.searchForm.orgid = newVal
    },
    component: {
      handler (cval, oval) {

      },
      deep: true
    },
    type: {
      handler(status) {
        console.log(status)
        if (status === 'rec_status') {
          this.thestatus = 105
        }
        if (status === 'accept_status') {
          this.thestatus = 109
        }
        if (status === 'send_status') {
          this.thestatus = 107
        }
        if (status === 'giveout_status') {
          this.thestatus = 111
        }
      },
      immediate: true
    }
  },
  mounted() {
    // this.searchForm.orgid = this.orgid
    this.searchCreatTime = this.defaultTime
    this.onSubmit()
  },
  methods: {
    getOrgid(id) {
      this.searchForm.orgid = id
    },
    // getFromCity(city) {
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
      this.searchForm.startTime = this.searchCreatTime ? (parseTime(this.searchCreatTime[0], '{y}-{m}-{d} ') + '00:00:00') : ''
      this.searchForm.endTime = this.searchCreatTime ? (parseTime(this.searchCreatTime[1], '{y}-{m}-{d} ') + '23:59:59') : ''
      const data = Object.assign({}, this.searchForm)
      data[this.status] = this.thestatus
      this.$emit('change', data)
    },
    clearForm() {
      this.searchForm.shipSn = ''
      this.searchForm.recName = ''
      this.searchForm.sendName = ''
      this.searchCreatTime = this.$options.data().searchCreatTime
      this.searchForm.shipFromCityName = ''
      this.searchForm.shipToCityName = ''
      this.thestatus = ''
      this.searchCreatTime = this.defaultTime
    }
  }
}
</script> 
