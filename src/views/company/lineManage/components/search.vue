<template>
  <el-form :inline="true" :size="btnsize" label-position="right"  :model="searchForm" label-width="70px"  class="staff_searchinfo clearfix">
      <div class="staff_searchinfo--input">
        <el-form-item label="发站">
          <el-input
              v-model="searchForm.rangeFromCityName"
              :maxlength="20"
              @change="onSubmit"
              clearable>
          </el-input>
        </el-form-item>
        <el-form-item label="到站">
          <el-input
              v-model="searchForm.rangeToCityName"
              :maxlength="20"
              @change="onSubmit"
              clearable>
          </el-input>
        </el-form-item>
        <el-form-item label="出发网点">
          <select-tree v-model="searchForm.fromOrgid" :orgid="otherinfo.orgid" />
        </el-form-item>
        <el-form-item label="到达网点">
          <select-tree v-model="searchForm.toOrgid" :orgid="otherinfo.orgid" />
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
import SelectTree from '@/components/selectTree/index'
import searchAll from '@/components/searchAll/index'

export default {
  name: 'handaccount-manage-search',
  components: {
    SelectTree,
    searchAll
  },
  props: {
    btnsize: {
      type: String,
      default: 'mini'
    },
    orgid: {
      type: Number
    }
  },
  data() {
    return {
      searchObjs: {},
      searchForm: {
        'fromOrgid': '',
        'rangeFromCityName': '',
        'rangeToCityName': '',
        'toOrgid': ''
      }
    }
  },
  watch: {
    orgid(newVal) {
      this.searchForm.orgid = newVal
    },
    searchForm: {
      handler(cval, oval) {
        this.searchObjs = Object.assign({}, cval)
        this.searchObjs.status = this.searchObjs.status === '' ? null : this.searchObjs.status
      },
      deep: true
    }
  },
  mounted() {
    this.onSubmit()
  },
  methods: {
    getDataObj(obj) {
      this.searchForm = Object.assign({}, obj)
      this.$emit('change', obj)
    },
    onSubmit() {
      const searchObj = Object.assign({}, this.searchForm)
      this.$emit('change', searchObj)
    },
    clearForm() {
      this.searchForm = {
        'fromOrgid': '',
        'rangeFromCityName': '',
        'rangeToCityName': '',
        'toOrgid': ''
      }
    }
  }
}
</script>

