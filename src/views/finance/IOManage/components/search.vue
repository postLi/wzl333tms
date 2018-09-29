<template>
  <el-form :inline="true" :size="btnsize" label-position="right" :rules="rules" :model="searchForm" label-width="70px" class="staff_searchinfo clearfix">
      <div class="staff_searchinfo--input">
        <el-form-item label="所属网点">
            <SelectTree v-model="searchForm.orgId" :orgid="otherinfo.orgid" />
        </el-form-item>
        <el-form-item label="收支方式">
          <SelectType @change="finitem" v-model="searchForm.financialWayTypeId" type="financial_way_type" placeholder="请选择" class="pickup-way" />
        </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="searchForm.status">
          <el-option label="启用" :value="0"></el-option>
          <el-option label="停用" :value="1"></el-option>
        </el-select>
      </el-form-item>
      <searchAll :searchObj="searchObjs" @dataObj="getDataObj"></searchAll>
      </div>
      <el-form-item class="staff_searchinfo--btn art_marginTop" >
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
    },
    issender: {
      type: Boolean,
      dafault: false
    }
  },
  computed: {
    title() {

    }
  },
  data() {
    return {
      searchObjs: {},
      searchForm: {
        orgId: '',
        financialWayTypeId: '',
        status: ''
      },
      rules: {

      }
    }
  },
  watch: {
    orgid(newVal) {
      this.searchForm.orgid = newVal
    },
     // 传到子组件
    searchForm: {
      handler(cval, oval) {
        this.searchObjs = Object.assign({}, cval)
      },
      deep: true
    }
  },
  mounted() {
    this.searchForm.orgId = this.orgid
    // this.searchForm.batchTypeId = this.orgid
  },
  methods: {
    // 接收子组件传回来的东西
    getDataObj(obj) {
      this.searchForm = Object.assign({}, obj)
      this.$emit('change', obj)
    },
    finitem(item) {
      console.log(typeof item)
    },
    onSubmit() {
      this.$emit('change', this.searchForm)
    },
    clearForm() {
      this.searchForm.orgId = this.orgid
      this.searchForm.financialWayTypeId = ''
      this.searchForm.status = ''
    }
  }
}
</script>
