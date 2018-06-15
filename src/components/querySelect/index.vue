<template>
<span class="autocomplete-input">
<el-autocomplete
  v-if="show === 'input'"
  popper-class="query-input-autocomplete"
  v-model="handlevalue"
  :fetch-suggestions="querySearch"
  :value-key="showkey"
  :placeholder="placeholder"
  @select="handleSelect"
  v-bind="$attrs"
  >
  <template slot-scope="{ item }">
    <slot v-bind:item="item">
      <!-- 回退的内容 -->
      {{ item[showkey] }}
    </slot>
  </template>
</el-autocomplete>
<el-select
    v-if="show === 'select' && remote"
    v-model="handlevalue"
    popper-class="query-select-autocomplete"
    filterable
    remote
    :placeholder="placeholder"
    :remote-method="querySearch"
    :loading="loading"
    v-bind="$attrs"
    >
    <el-option
      v-for="item in searchData"
      :key="item[valuekey]"
      :label="item[showkey]"
      :value="item[valuekey]">
        <slot name="select-remote" v-bind:item="item">
          <!-- 回退的内容 -->
          {{ item[showkey] }}
        </slot>
    </el-option>
  </el-select>
  <el-select
    v-if="show === 'select' && !remote"
    v-model="handlevalue"
    popper-class="query-select-autocomplete"
    filterable
    :placeholder="placeholder"
    v-bind="$attrs"
    >
    <el-option
      v-for="item in allData"
      :key="item[valuekey]"
      :label="item[showkey]"
      :value="item[valuekey]">
        <slot name="select" v-bind:item="item">
          <!-- 回退的内容 -->
          {{ item[showkey] }}
        </slot>
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
    'valuekey': {
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
      type: [String, Number],
      default: ''
    },
    // 额外的请求参数，默认是合并到vo中
    param: {
      type: Object,
      default: () => {}
    },
    // 自定义的搜索函数，传入的参数为当前项，函数执行需返回true/false
    searchFn: {
      type: Function
    },
    // 是否需要处理参数
    nochangeparam: {
      type: Boolean,
      default: false
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
    showkey () {
      return this.label || this.search
    },
    queryFn () {
      let fn
      switch(this.type){
        case 'user':
          delete this.queryParam.vo
          this.queryParam.orgid = this.getOrgid
          this.queryParam.mobilephone = ''
          this.queryParam.name = ''

          fn = getAllUser
          break
        case 'city':
          this.queryParam = ''
          fn = getCityInfo
          break
        case 'carrier':
          fn = getAllCarrier
          break
        case 'sender':
          this.queryParam.vo.customerType = 1
          this.queryParam.vo.orgid = this.getOrgid
          fn = getAllCustomer
          break
        case 'receiver':
          this.queryParam.vo.customerType = 2
          this.queryParam.vo.orgid = this.getOrgid
          fn = getAllCustomer
          break
        case 'driver':
          this.queryParam.vo.orgid = this.getOrgid
          fn = getAllDriver
          break
        case 'trunk':
          this.queryParam.vo.orgid = this.getOrgid
          fn = getAllTrunk
          break
        case 'abnormal':
          fn = PostGetAbnormalList
          break
        case 'controlgoods':
          fn = PostControlgoods
          break
        case 'preorder':
          fn = getPostlist
          break
        case 'order':
          fn = orderManageApi.getAllShip
          break
        case 'pickup':
          fn = fetchPostlist
          break
        case 'receipt':
          this.queryParam.vo.pageType = 1
          fn = postReceipt
          break
        case 'repertory':
          fn = postAllOrderRepertory
          break
        case 'batch':
          this.canchangeparam = false
          this.queryParam = this.getOrgid
          fn = orderManageApi.getBatchList
          break
        case 'cargoName':
          this.canchangeparam = false
          this.queryParam = '1'
          fn = orderManageApi.getRecently
          break
        case 'cargoPack':
          this.canchangeparam = false
          this.queryParam = '2'
          fn = orderManageApi.getRecently
          break
      }
      // 设定pageSize参数
      if(typeof this.queryParam === 'object') {
        this.queryParam.pageSize = this.count
        // 处理传过来的额外参数
        if(typeof this.queryParam.vo === 'object') {
          this.queryParam.vo = Object.assign(this.queryParam.vo, this.param)
          // 当有传入组织id时，表示需要控制获取指定组织id的数据
          if(this.orgid !== ''){
            this.queryParam.vo.orgid = this.orgid
          }
        } else {
          this.queryParam = Object.assign(this.queryParam, this.param)
          if(this.orgid !== ''){
            this.queryParam.orgid = this.orgid
          }
        }
      }

      return fn
    },
    shouldremote () {
      // 智障侦测。。？要不要
      // 通过判断返回的总数跟设置的总数对比，如果返回的总数小于设置的总数则表示不用每次都请求
      if(this.remote){
        return true
      } else {
        return false
      }
    }
  },
  data () {
    return {
      handlevalue: "",
      allData: [],
      searchData: [],
      loading: false,
      queryParam: {
        pageSize: 100,
        pageNum: 1,
        vo: {

        }
      },
      canchangeparam: true,
      // 缓存最近一次的请求数据
      lastQuery: '*',
      lastRequest: []
    }
  },
  mounted () {
    // 初始化请求、请求参数等
    this.canchangeparam = !this.nochangeparam
    this.remoteFn = this.queryFn
    // 判断是否需要每次都请求
    if(!this.remote){
      this.fetchFn().then(data => {
        this.allData = data
        this.searchData = data
      })
    }
  },
  methods: {
    fetchFn () {
      return this.remoteFn(this.queryParam).then(res => {
        let data = res.data ? res.data : res
        if(data.list){
          return data.list || []
        } else {
          return data || []
        }
      })
    },
    querySearch (queryString, cb = ()=>{}) {
      // 缓存最近一次请求数据
      // 如果设定了不修改参数，则不缓存记录
      if(queryString === this.lastQuery && this.canchangeparam){
        cb(this.lastRequest)
      }else{
        if(this.canchangeparam){
          if(this.queryParam.vo){
            this.queryParam.vo[this.search] = queryString
          } else if(typeof this.queryParam === 'object') {
            this.queryParam[this.search] = queryString
          } else {
            this.queryParam = queryString
          }
        }

        let searchFunction = (el) => {
            // 如果有自定义的搜索函数，则调用其进行判断
            if(typeof this.searchFn === 'function'){
              return this.searchFn(el, queryString)
            }
            // 字符串  布尔值 空值 数值
            // 模糊匹配 全等于
            return el[this.search] ? el[this.search].toString().indexOf(queryString) !== -1 : false
          }
        
        if(this.remote){
          this.fetchFn().then( data => {
            this.lastQuery = queryString
            this.lastRequest = data
            if(!this.canchangeparam && data.length){
              data = data.filter(searchFunction)
            }
            this.searchData = data
            cb(data)
          })
        } else {
          this.lastQuery = queryString
          this.lastRequest = this.allData.filter(searchFunction)
          console.log('this.allData, this.lastRequest:', this.allData, this.lastRequest)
          cb(this.lastRequest)
        }
        
      }
      
    },
    handleSelect (info) {
      
      this.$emit("input", info[this.valuekey] || '')
      this.$emit('change', info)
    }
  }
}
</script>
