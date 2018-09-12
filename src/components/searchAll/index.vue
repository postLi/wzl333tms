<template>
<div>
  <el-form-item label="自定义查询" class="zdycx">
    <el-autocomplete
      v-model="datalist"
      :fetch-suggestions="querySearchAsync"
      placeholder="请输入内容"
      @select="handleSelect"
      clearable
      >
      <template slot-scope="{ item }">
        <div class="name">{{ item.queryKey }}</div>
      </template>
    </el-autocomplete>
    <el-button plain  @click="Custom">保存自定义</el-button>
  </el-form-item>
  <addSave :searchObj="searchObj" :popVisible="popVisible" :issender="true" :dotInfo="dotInfo" :searchForm="querySearch"  @close="closeAddDot" @success="fetchAllloadAll" :isModify="isModify"/>
</div>
</template>
<script>
import { postQueryLogList } from '@/api/common'
import addSave from '../addSave/index'
export default {
  components: {
    addSave
  },
  props: {
    searchObj: {
      type: [Object, Array]
    }
  },
  data() {
    return {
      dotInfo: [],
      isModify: false,
      popVisible: false,
      setupTableVisible: false,
      dataset: [],
      datalist: '',
      timeout: null,
      querySearch: {
        'currentPage': 1,
        'pageSize': 10,
        'vo': {
          'orgId': '',
          'userId': '',
          'menuCode': ''
        }
      }
    }
  },
  watch: {
    searchObj: {
      handler(cval, oval) {
        this.$nextTick(() => {
          console.log('searchAll_cval', cval, oval)
        })
      },
      deep: true
    }
  },
  mounted() {
    console.log('werwer', this.searchObj)
    this.fetchAllloadAll()
  },
  methods: {
    Custom() {
      this.isModify = true
      this.popVisible = true
    },
    closeAddDot() {
      this.popVisible = false
    },
    fetchAllloadAll() {
      this.querySearch.vo.orgId = this.otherinfo.orgid
      this.querySearch.vo.userId = this.otherinfo.userId
      this.querySearch.vo.menuCode = this.$route.meta.code
      return postQueryLogList(this.querySearch).then(data => {
        this.dataset = data.list
      })
    },
    querySearchAsync(queryString, cb) {
      var dataset = this.dataset
      var results = queryString ? dataset.filter(this.createStateFilter(queryString)) : dataset
      cb(results)
    },
    createStateFilter(queryString) {
      return (state) => {
        return (state.queryKey.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    handleSelect(item) {
      this.datalist = item.queryKey
      const obj = JSON.parse(item.queryContent)
      this.$emit('change', JSON.parse((item.queryContent).replace(/'/g, '"')))
      // 用$emit提交给父组件
      this.$emit('dataObj', obj)
    }
  }
}
</script>
<style lang="scss">
.zdycx{
    .el-form-item__label{
    width:85px !important;
  }
}
</style>
