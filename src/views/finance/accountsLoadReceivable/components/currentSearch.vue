<template>
  <!-- 搜索框-搜索左边列表数据 -->
  <!-- shipSn 运单号   batchNo 批次号 -->
  <el-autocomplete v-model="currentSearch" :size="btnsize" :fetch-suggestions="querySearch" placeholder="请输入运单号" prefix-icon="el-icon-search" @select="handleSelect">
    <template slot-scope="{ item }">
      <div class="name" v-if="item.shipSn">{{ item.shipSn }}</div>
      <div class="name" v-else>{{ item.batchNo }}</div>
    </template>
  </el-autocomplete>
</template>
<script>
import { objectMerge2 } from '@/utils/index'
import * as accountApi from '@/api/finance/accountsReceivable'
import { payListByHandlingFee } from '@/api/finance/accountsPayable'
export default {
  props: {
    info: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      currentSearch: '',
      btnsize: 'mini',
      dataList: []
    }
  },
  computed: {
    getRouteInfo() {
      return JSON.parse(this.$route.query.searchQuery)
    }
  },
  methods: {
     fetchData(queryString) {
      let params = objectMerge2({}, this.getRouteInfo)
      params.vo.shipSn = queryString
      params.vo.status = 'NOSETTLEMENT,PARTSETTLEMENT'

      let fetchList
      let currentPage = this.$route.query.currentPage
      if (currentPage === 'handleFee') { // 操作费
        fetchList = payListByHandlingFee 
      }else {
        fetchList =  accountApi.getReceivableList
      }

      return fetchList(params).then(data => {
          if (data) {
            this.dataList = objectMerge2([], data.list)
            console.log('this.dataList', this.dataList)
          }
        })
        .catch(err => {
          this._handlerCatchMsg(err)
        })
    },
    querySearch(queryString, cb) {
       this.fetchData(queryString).then(() => { // 远程搜索
        let arr = objectMerge2([], this.dataList)
        this.currentSearch = queryString
        const leftTable = arr || this.info
        const results = queryString ? leftTable.filter(this.createFilter(queryString)) : leftTable
        cb(results)
      })
      // this.currentSearch = queryString
      // if (queryString.shipSn === undefined || queryString.batchNo) {
      //   if (!this.currentSearch) { // 如果搜索框为空则恢复右边列表
      //     this.$emit('change', objectMerge2([], this.info))
      //   }
      // }
      // const leftTable = this.info
      // const results = queryString ? leftTable.filter(this.createFilter(queryString)) : leftTable
      // // 调用 callback 返回建议列表的数据
      // cb(results)
    },
    createFilter(queryString) {
      return (res) => {
        if (res.shipSn) {
          return (res.shipSn.toLowerCase().indexOf(queryString.toLowerCase()) !== -1)
        } else if (res.batchNo) {
          return (res.batchNo.toLowerCase().indexOf(queryString.toLowerCase()) !== -1)
        }
      }
    },
    handleSelect(obj) {
      console.log('========', obj)
      if (obj.shipSn) {
        this.currentSearch = obj.shipSn
      } else if (obj.batchNo) {
        this.currentSearch = obj.batchNo
      }
      // const array = []
      // array.push(obj)

      this.currentSearch = ''
      this.$emit('change', obj, 0)
      // this.$emit('change', obj, this.info.indexOf(obj))
      // this.$emit('change', array)
    }
  }
}

</script>
