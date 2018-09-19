<template>
  <el-form :inline="true" :size="btnsize" label-position="right"  :model="searchForm" label-width="70px"  class="staff_searchinfo clearfix">
      <div class="staff_searchinfo--input">
        <el-form-item label="所在网点">
          <select-tree v-model="searchForm.orgid" :orgid="otherinfo.orgid" />
        </el-form-item>
        <el-form-item label="员工姓名">
          <el-input
              v-model="searchForm.userName"
              maxlength="15"
              @change="onSubmit"
              clearable>
          </el-input>
        </el-form-item>
      <el-form-item label="交账状态">
        <select-type v-model="searchForm.status" type="fee_status" >
        </select-type>
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
import SelectType from '@/components/selectType/index'
import searchAll from '@/components/searchAll/index'

export default {
  name: 'handaccount-manage-search',
  components: {
    SelectTree,
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
    }
  },
  data() {
    return {
      searchObjs: {},
      searchForm: {
        orgid: '',
        status: '',
        userName: ''
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
    this.searchForm.orgid = this.orgid
    // this.searchForm.status = 'NOSETTLEMENT'
    this.onSubmit()
  },
  methods: {
    getDataObj(obj) {
      this.searchForm = Object.assign({}, obj)
      this.$emit('change', obj)
    },
    onSubmit() {
      const searchObj = Object.assign({}, this.searchForm)
      searchObj.status = searchObj.status === '' ? null : searchObj.status
      this.$emit('change', searchObj)
    },
    clearForm() {
      this.searchForm.status = ''
      this.searchForm.userName = ''
      this.searchForm.orgid = this.otherinfo.orgid
    }
  }
}
</script>

