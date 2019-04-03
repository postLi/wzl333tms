<template>
<div v-if="hasCode" class="searchAll_lyy">
  <el-form-item label="自定义查询" class="zdycx">
    <el-select
      v-model="datalist"
      filterable
      placeholder="请选择"
      :filter-method="querySearchAsync"
      @change="handleSelect"
      @focus="initdata"
      popper-class="zdycx-pop"
      :loading="loading">
      <el-option
        v-for="(item,index) in options4"
        :key="index"
        :label="item.queryKey"
        :value="item.id">
        {{item.queryKey}} <i class="el-icon-circle-close-outline" @click.stop.prevent="deleteItem(item)"></i>
      </el-option>
    </el-select>
    <el-button plain  @click="Custom">保存自定义</el-button>
  </el-form-item>
  <addSave :code="hasCode" :searchObj="searchObj" :popVisible="popVisible"    @close="closeAddDot" @success="fetchAllloadAll" />
</div>
</template>
<script>
import { postQueryLogList, deleteQueryLogListById } from '@/api/common'
import addSave from './addSave'
export default {
  components: {
    addSave
  },
  props: {
    searchObj: {
      type: [Object, Array]
    },
    value: [String, Number],
    code: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isModify: false,
      popVisible: false,
      setupTableVisible: false,
      dataset: [],
      datalist: '',
      timeout: null,
      loading: false,
      options4: [],
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
  computed: {
    // 当前页面没有code值时，是不能与后台交互的，所以隐藏掉相关UI可以减少用户的使用认知
    hasCode() {
      return this.code || this.$route.meta.code || ''
    }
  },
  watch: {
    value(n) {
      // 清除选定项
      if (n === '') {
        this.datalist = ''
      }
    },
    searchObj: {
      handler(cval, oval) {
      },
      deep: true
    }
  },
  mounted() {
  },
  methods: {
    initdata() {
      if (!this.inited) {
        this.inited = true
        this.loading = true
        this.fetchAllloadAll().then(res => {
          this.loading = false
        })
      }
    },
    deleteItem(item) {
      deleteQueryLogListById(item.id).then(res => {
        this.fetchAllloadAll()
        // if (this.datalist === item.queryKey) {
        if (this.datalist) {
          this.datalist = ''
        }
      }).catch(err => {
        this._handlerCatchMsg(err)
      })
    },
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
      this.querySearch.vo.menuCode = this.code || this.$route.meta.code
      return postQueryLogList(this.querySearch).then(data => {
        this.dataset = data.list || []
        this.options4 = data.list || []
      })
    },
    querySearchAsync(queryString, cb) {
      var dataset = this.dataset
      var results = queryString ? dataset.filter(this.createStateFilter(queryString)) : dataset
      this.options4 = results
      cb(results)
    },
    createStateFilter(queryString) {
      return (state) => {
        return (state.queryKey.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    handleSelect(id) {
      var find = this.options4.filter(el => el.id === id)
      if (find.length) {
        // this.datalist = item.queryKey
        const item = find[0].queryContent
        const obj = JSON.parse(item)
        this.$emit('change', JSON.parse((item).replace(/'/g, '"')))
        // 用$emit提交给父组件
        this.$emit('dataObj', obj)
      }
    }
  }
}
</script>
<style lang="scss">
.searchAll_lyy{
  display: inline;
  clear:both;
  .zdycx{
    .el-form-item__label{
    font-size: 13px;
  }
  
}
.zdycx-pop{
  li{
    clear: both;
  }
  .el-icon-circle-close-outline{
    float: right;
    line-height: 34px;

    &:hover{
      color: #ef0000;
    }
  }
}
}

</style>
