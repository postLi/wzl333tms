<template>
<span>
<el-autocomplete
  v-if="show === 'input'"
  popper-class="query-input-autocomplete"
  v-model="handlevalue"
  :fetch-suggestions="querySearch"
  :value-key="valuekey"
  :placeholder="placeholder"
  @select="handleSelect"
  v-bind="$attrs"
  >
  <template slot-scope="{ item }">
    <slot v-bind:item="item">
      <!-- 回退的内容 -->
      {{ item[label] }}
    </slot>
  </template>
</el-autocomplete>
<el-select
    v-if="show === 'select'"
    v-model="value9"
    popper-class="query-select-autocomplete"
    filterable
    remote
    :placeholder="placeholder"
    :remote-method="remoteMethod"
    :loading="loading"
    v-bind="$attrs"
    >
    <el-option
      v-for="item in options4"
      :key="item.value"
      :label="item.label"
      :value="item.value">
      <template slot-scope="{ item }">
        {{ item.area }}
      </template>
    </el-option>
  </el-select>
  </span>
</template>
<script>
// 获取城市信息
import { getCityInfo } from '@/api/common'
// 获取承运商信息
import { getAllCarrier } from "@/api/company/carrierManage"
// 获取客户信息
import { getAllCustomer } from "@/api/company/customerManage"
// 获取司机信息
import { getAllDriver } from "@/api/company/driverManage"
// 获取员工信息
import { getAllUser } from "@/api/company/employeeManage"
// 获取车辆信息
import { getAllTrunk } from "@/api/company/trunkManage"
// 获取异常列表、控货列表信息
import { PostGetAbnormalList, PostControlgoods } from "@/api/operation/dashboard"
// 获取订单列表
import { getPostlist } from "@/api/operation/manage"
// 获取运单列表
import orderManageApi from "@/api/operation/orderManage"
// 获取提货单列表
import { fetchPostlist } from "@/api/operation/pickup"
// 获取回单列表
import { postReceipt } from "@/api/operation/receipt"
// 获取库存列表
import { postAllOrderRepertory } from "@/api/operation/repertory"

export default {
  props: {
    // 指定控件里要显示的获得项的字段
    label: {
      type: String,
      default: ''
    },
    // v-model绑定值
    value: {
      type: [String, Number, Object]
    },
    placeholder: {
      type: String,
      default: '请输入'
    },
    // 搜索的表格
    type: {
      type: String,
      default: 'user'
    },
    // 搜索匹配的字段
    // 可以一次匹配多个字段取做搜索
    search: {
      type: [String, Array]
    },
    // 请求多少条数据
    count: {
      type: Number,
      default: 100
    },
    // 指定需要获得的value对应的字段
    'value-key': {
      type: String,
      default: 'id'
    },
    // 控件展示形式
    show: {
      type: String,
      default: 'input'
    },
    // 是否每次搜索都请求数据
    // 默认是请求指定数量的进行前端筛选查找
    // 当为true时，每次都请求接口查找数据
    remote: {
      type: Boolean,
      default: false
    },
    // 用来初次显示在输入框的值
    name: {
      type: [String, Number],
      default: ''
    },
    // 网点id
    orgid: {
      type: String,
      default: ''
    }
  },
  watch: {
    name: {
      handler (newVal) {
        this.handlevalue = newVal
      },
      immediate: true
    }
  },
  computed: {
    getOrgid () {
      return this.orgid || this.otherinfo.orgid
    },
    valuekey () {
      return this['value-key']
    },
    queryFn () {
      this.queryParam.pageSize = this.count
      switch(this.type){
        case 'user':
          delete this.queryParam.vo
          this.queryParam.orgid = this.getOrgid
          this.queryParam.mobilephone = ''
          this.queryParam.name = ''

          return getAllUser
          break
        case 'city':
          return getCityInfo
          break
        case 'carrier':
          return getAllCarrier
          break
        case 'sender':
          return getAllCustomer
          break
        case 'receiver':
          return getAllCustomer
          break
        case 'driver':
          return getAllDriver
          break
        case 'trunk':
          return getAllTrunk
          break
        case 'abnormal':
          return PostGetAbnormalList
          break
        case 'controlgoods':
          return PostControlgoods
          break
        case 'preorder':
          return getPostlist
          break
        case 'order':
          return orderManageApi.getAllShip
          break
        case 'pickup':
          return fetchPostlist
          break
        case 'receipt':
          return postReceipt
          break
        case 'repertory':
          return postAllOrderRepertory
          break
      }
    }
  },
  data () {
    return {
      handlevalue: "",
      allData: [],
      queryParam: {
        pageSize: 100,
        pageNum: 1,
        vo: {

        }
      },
      // 缓存最近一次的请求数据
      lastQuery: '',
      lastRequest: []
    }
  },
  mounted () {
    // 判断是否需要每次都请求
    if(!this.remote){
      this.fetchFn().then(data => {
        this.allData = data
      })
    }
  },
  methods: {
    fetchFn () {
      return this.queryFn(this.queryParam).then(res => {
        let data = res.data ? res.data : res
        if(data.list){
          return data.list
        } else {
          return data
        }
      })
    },
    querySearch (queryString, cb) {
      if(queryString === this.lastQuery){
        cb(this.lastRequest)
      }else{
        if(this.queryParam.vo){
          this.queryParam.vo[this.search] = queryString
        } else {
          this.queryParam[this.search] = queryString
        }
        if(this.remote){
          this.fetchFn().then( data => {
            this.lastQuery = queryString
            this.lastRequest = data
            cb(data)
          })
        } else {
          this.lastQuery = queryString
          this.lastRequest = this.allData.filter(el => {
            return el[this.search].indexOf(queryString) !== -1
          })
          console.log(this.allData, this.lastRequest)
          cb(this.lastRequest)
        }
        
      }
      
    },
    handleSelect (info) {
      
      this.$emit("input", info.id || 0)
      this.$emit('change', info)
    }
  }
}
</script>
<style lang="scss">
.city-name{
  float: left;
}
.city-longname{
  float: right;
  font-size: 12px;
  color: #666;
}
.city-autocomplete{
  width: auto !important;
  max-width: 400px;
  .el-autocomplete-suggestion__list li{
    clear: both;
    display: flex;
    span{
      flex: 1;
      white-space: nowrap;
      color: #333;
    }
    .city-province{
      text-align: right;
      color: #999;
    }
  }
}
</style>
