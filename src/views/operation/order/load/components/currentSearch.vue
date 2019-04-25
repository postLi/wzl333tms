<template>
  <el-form
    ref="searchForm"
    inline
    label-position="right"
    :model="searchForm"
    label-width="70px"
    class="tableHeadItemForm"
  >
   <el-form-item label="目的网点">
       <!-- <SelectTree placeholder="目的网点搜索" v-model="searchForm.shipToOrgName" clearable size="mini" @change="changeTree"></SelectTree> -->
      <el-autocomplete
        v-model="searchForm.shipToOrgName"
        :size="btnsize"
        popper-class="popperHide"
        :fetch-suggestions="(queryString, cb) => querySearch( 'shipToOrgName',queryString, cb)"
        placeholder="到站搜索"
        @keyup.enter.native="handleSelectAll"
        @select="handleSelect"
      >
      </el-autocomplete>
    </el-form-item>
    <el-form-item label="到站">
      <el-autocomplete
        v-model="searchForm.shipToCityName"
        :size="btnsize"
        popper-class="popperHide"
        :fetch-suggestions="(queryString, cb) => querySearch( 'shipToCityName',queryString, cb)"
        placeholder="到站搜索"
        @select="handleSelect"
        @keyup.enter.native="handleSelectAll"
      >
      </el-autocomplete>
    </el-form-item>
   
    <el-form-item
      label="运单号"
      class="curSearchShipSn"
    >
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
import SelectTree from '@/components/selectTree/index'
import { objectMerge2 } from '@/utils/index'
export default {
  components: {
    querySelect,
    SelectTree
  },
  data() {
    return {
      senderSearch: '',
      searchForm: {
        shipToCityName: '',
        shipSn: '',
        shipToOrgName: ''
      },
      btnsize: 'mini',
      selectVal: '',
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
    changeTree (value, row) {
      console.log('changeTree',value, row)
      //  this.searchForm[type] = queryString // 绑定数据视图
      let queryString = row.name
      let type = 'shipToOrgName'
      
      let results = this.commonFilter(type, queryString)
      let array = []
      results.forEach(e => {
        array.push(e)
      })
      this.resultList = Object.assign([], array)
      this.$emit('change', array)
      if (array.length === 1) {
        this.handleSelectAll()
      }
      
    },
    commonFilter (type, queryString) {
       let leftTable = this.info
      //  if (type !== 'shipToOrgName') {

         this.searchForm[type] = queryString // 绑定数据视图
      //  }
      this.selectVal = type // 当前选择输入的对象
      for (let item in this.searchForm) {
        if (
          this.searchForm[item] === undefined ||
          this.searchForm[item] === ''
        ) {
          this.$emit('change', objectMerge2([], this.info)) // 如果输入框为空恢复右边数据列表
        }
      }

      let results = queryString
        ? leftTable.filter(this.createFilter(new RegExp(queryString, 'gi'), type))
        : leftTable
    return results
    },
    querySearch(type, queryString, cb) {
      console.log(type, queryString)
      let results  = this.commonFilter(type, queryString)
      cb(results)
      let array = []
      results.forEach(e => {
        array.push(e)
      })
      this.resultList = Object.assign([], array)
      this.$emit('change', array)
      if (array.length === 1) {
        this.handleSelectAll()
      }
    },
    createFilter(queryString, type) {
      return res => {
        // 过滤
        return (
            queryString.test(res[type])
          // res[type].toLowerCase().indexOf(queryString.toLowerCase()) !== -1
          )
      }
    },
    handleSelect(obj) {
      this.searchForm[this.selectVal] = obj[this.selectVal]
      this.selectVal = ''
      const array = []
      array.push(obj)
      this.$emit('change', array)
    },
    clearSender(event) {
      this.searchForm = this.$options.data().searchForm
    },
    handleSelectAll() {
      clearTimeout(this.ttimer)
      this.ttimer = setTimeout(() => {
        if (this.searchForm.shipSn || this.searchForm.shipToCityName || this.searchForm.shipToOrgName) {
          if (this.resultList.length) {
            this.$emit('keyupEneter')
            this.searchForm = this.$options.data().searchForm
          }
        }
      }, 500)
    }
  }
}
</script>
<style lang="scss">
.tableHeadItemForm {
  margin-left: 5px;
  width: 100%;
  position: relative;
  display: flex;
  .el-input {
    width: 120px;
    .el-input__inner {
      padding: 0 10px;
    }
  }
  .curSearchShipSn {
    position: absolute;
    left: 50%;
    margin-left: 20px;
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
