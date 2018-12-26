<template>
  <el-form :inline="true" :size="btnsize" label-position="right" label-width="70px" :rules="rules" :model="searchForm" class="staff_searchinfo clearfix">
    <div class="staff_searchinfo--input">
      <el-form-item label="运单号" >
        <el-input
            v-model="searchForm.shipSn"
            maxlength="30"
            @keyup.native="validates('shipSn')"
            clearable>
        </el-input>
      </el-form-item>
      <el-form-item label="货品名" >
        <el-input
          v-model="searchForm.cargoName"
          maxlength="15"
          clearable>
        </el-input>
      </el-form-item>
      <el-form-item label="件数" class="order-pop-search-multi" >
        <el-input
            v-model="searchForm.startAmount"
            maxlength="6"
            clearable>
            </el-input>
            <el-input
            v-model="searchForm.endAmount"
            maxlength="6"
            clearable>
        </el-input>
      </el-form-item>
      <el-form-item label="货号" >
        <el-input
            v-model="searchForm.shipGoodsSn"
             @keyup.native="validates('shipGoodsSn')"
            maxlength="30"
            clearable>
        </el-input>
      </el-form-item>
      <el-form-item label="开单时间">
        <div class="block">
          <el-date-picker v-model="searchCreatTime" :default-value="defaultTime" type="daterange" align="right" value-format="yyyy-MM-dd" start-placeholder="开始日期"
          :clearable="false" :picker-options="pickerOptions2" end-placeholder="结束日期">
          </el-date-picker>
        </div>
      </el-form-item>
      <el-form-item label="发货人" >
        <el-input
            v-model="searchForm.shipSenderName"
            maxlength="15"
            clearable>
        </el-input>
      </el-form-item>
      <el-form-item label="发货电话" >
        <el-input
            v-model="searchForm.shipSenderMobile"
            maxlength="15"
            clearable>
        </el-input>
      </el-form-item>
      <el-form-item label="收货人" >
        <el-input
            v-model="searchForm.shipReceiverName"
            maxlength="15"
            clearable>
        </el-input>
      </el-form-item>
      <el-form-item label="收货电话" >
        <el-input
            v-model="searchForm.shipReceiverMobile"
            maxlength="15"
            clearable>
        </el-input>
      </el-form-item>
      <el-form-item label="到站" >
        <el-autocomplete
          v-model="searchForm.shipToCityName"
          :fetch-suggestions="querySearchAsync"
          placeholder=""
          trigger-on-focus
          @select="handleSelect"
        ></el-autocomplete>
        <!-- <el-input
            v-model="searchForm.shipToCityName"
            maxlength="30"
            clearable>
        </el-input> -->
      </el-form-item>
      <el-form-item label="目的网点">
        <select-tree v-model="searchForm.shipToOrgid" :orgid="otherinfo.companyId" />
      </el-form-item>
      <el-form-item label="　" class="">
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button type="info" @click="clearForm" plain>清空</el-button>
      </el-form-item>
    </div>
    
  </el-form>
</template>
<script>
import orderManageApi from '@/api/operation/orderManage'
import { pickerOptions2, parseTime, objectMerge2 } from '@/utils/'
import SelectTree from '@/components/selectTree/index'
import { REGEX } from '@/utils/validate'
export default {
  name: 'order-manage-pop-search',
  components: {
    SelectTree
  },
  props: {
    query: {
      type: Object,
      default: () => {}
    },
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
  data() {
    return {
      searchCreatTime: [],
      defaultTime: [parseTime(+new Date() - 60 * 24 * 60 * 60 * 1000, '{y}-{m}-{d}'), parseTime(new Date(), '{y}-{m}-{d}')],
      searchForm: {
        shipSn: '',
        cargoName: '',
        endAmount: '',
        startAmount: '',
        shipSenderName: '',
        shipSenderMobile: '',
        shipReceiverMobile: '',
        shipReceiverName: '',
        shipToCityName: '',
        shipToOrgid: '',
        shipGoodsSn: ''
      },
      searchObjs: {},
      rules: {
        mobile: [{
          // validator: validateFormMobile, trigger: 'blur'
          // validator: validateFormNumber, trigger: 'change'
        }]
      },
      pickerOptions2: {
        shortcuts: pickerOptions2
      },
      searchAll: '1'
    }
  },
  watch: {
    query: {
      handler(newVal) {
        if (newVal.key && newVal.value) {
          this.setSearch()
          this.onSubmit()
        }
      }
    },
    orgid(newVal) {
      // this.searchForm.orgid = newVal
    },
    $route(newVal) {
      if (this.$route.path.indexOf('operation/order/orderManage') !== -1) {

      }
    },
      // 传到子组件
    searchForm: {
      handler(cval, oval) {
        console.log('searchForm:', this.searchObjs, cval, oval)
        this.searchObjs = Object.assign({}, cval)
        this.searchObjs.shipFromOrgid = this.searchForm.orgid
        this.searchObjs.shipStatus = this.searchForm.shipStatus
        this.searchObjs.startTime = this.searchCreatTime ? this.searchCreatTime[0] + ' 00:00:00' : ''
        this.searchObjs.endTime = this.searchCreatTime ? this.searchCreatTime[1] + ' 23:59:59' : ''
        this.searchObjs[this.searchForm.type] = this.searchForm.value
      },
      deep: true
    }
  },
  mounted() {
    // this.searchForm.orgid = this.orgid
    this.searchCreatTime = this.defaultTime

    if (this.query.key && this.query.value) {
      this.setSearch()
      this.onSubmit()
    }
  },
  methods: {

    setSearch() {
      this.clearForm()
      const key = this.query.key
      const value = this.query.value
      this.searchForm[key] = value
    },
    validates(key) {
      this.$set(this.searchForm, key, this.searchForm[key].replace(/[\W]/g, ''))
    },
    onSubmit() {
      const searchObj = objectMerge2({}, this.searchForm)

      searchObj.startTime = this.searchCreatTime ? this.searchCreatTime[0] + ' 00:00:00' : ''
      searchObj.endTime = this.searchCreatTime ? this.searchCreatTime[1] + ' 23:59:59' : ''

      this.$emit('change', searchObj)
    },
    clearForm() {
      this.searchCreatTime = this.defaultTime
      this.searchForm = this.$options.data().searchForm
    },
    querySearchAsync(query, cb) {
      orderManageApi.getLastToCities({
        'currentPage': 1,
        'pageSize': 10,
        'vo': {
          'type': 5,
          'value': query || ''
        }
      }).then(res => {
        const data = res.data
        if (data) {
          cb(res.data.list)
        } else {
          cb([])
        }
        console.log('querySearchAsync', res)
      })
    },
    handleSelect(item) {
      console.log('handleSelect:', item)
    }
  }
}

</script>
<style lang="scss">
.tab-content {
  .searchinfo--order {
    .el-select {
      width: 100px;
    }
    .el-form-item__content>.el-input {
      width: 200px;
    }
  }
  .zdycx {
    .el-form-item__label {
      width: 85px !important;
    }
  } // .el-form-item__label{
  //   width:85px !important;
  // }
}

</style>
