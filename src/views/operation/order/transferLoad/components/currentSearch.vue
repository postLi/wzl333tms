<template>
  <el-form ref="searchForm" inline label-position="right" :model="searchForm" label-width="70px" class="tableHeadItemForm" @submit.native.prevent>
    <el-form-item label="运单号" >
      <el-autocomplete 
      v-model="searchForm.shipSn" 
      :size="btnsize" 
      popper-class="popperHide"
      :fetch-suggestions="(queryString, cb) => querySearch( 'shipSn',queryString, cb)" 
      placeholder="运单号搜索" 
      @keyup.enter.native="handleSelectAll"
      @select="handleSelect"
      >
      </el-autocomplete>
    </el-form-item>
  </el-form>
</template>
<script>
import querySelect from '@/components/querySelect/index'
import { objectMerge2 } from '@/utils/index'
export default {
  components: {
    querySelect
  },
  data() {
    return {
      senderSearch: '',
      searchForm: {
        shipSn: ''
      },
      btnsize: 'mini',
      selectVal: 'shipSn',
      resultList: []
    }
  },
  props: {
    info: {
      type: Array,
      default: []
    },
    showSearch: {
      type: String,
      default: ''
    }
  },
  methods: {
    querySearch(type, queryString, cb) {
      console.log(this.info)
      let leftTable = this.info
      this.searchForm[type] = queryString // 绑定数据视图
      this.selectVal = type // 当前选择输入的对象
      for (let item in this.searchForm) {
        if (this.searchForm[item] === undefined || this.searchForm[item] === '') {
          this.$emit('change', objectMerge2([], this.info)) // 如果输入框为空恢复右边数据列表
        }
      }
      let results = queryString ? leftTable.filter(this.createFilter(queryString, type)) : leftTable
      cb(results)
      let array = []
      results.forEach(e => {
        array.push(e)
      })
      this.resultList = Object.assign([], array)
      this.$emit('change', array)

    },
    createFilter(queryString, type) {
      return (res) => { // 过滤
        return (res[type].toLowerCase().indexOf(queryString.toLowerCase()) !== -1)
      }
    },
    handleSelect(obj) {
      this.searchForm[this.selectVal] = obj[this.selectVal]
      this.selectVal = ''
      let array = []
      array.push(obj)
      this.$emit('change', array)
    },
    clearSender(event) {
      this.searchForm = this.$options.data().searchForm
    },
    handleSelectAll() {
      if (this.searchForm.shipSn && this.resultList.length) {
      this.$emit('keyupEneter')
      this.searchForm = this.$options.data().searchForm
      }
    }
  }
}

</script>
<style lang="scss">
.tableHeadItemForm {
  margin-left: 5px;
  display: flex;
  flex-direction: row;
  .el-input {
    width: 120px;
    .el-input__inner {
      padding: 0 10px;
    }
  }
  .clearfix:after {
    content: "";
    display: block;
    clear: both;
  }
  .hidePopper {
    display: none !important;
    background-color: rgba(0, 0, 0, 0);
  }
}

</style>
