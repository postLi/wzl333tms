<template>
<span class="autocomplete-input">
<el-autocomplete
  v-if="show === 'input'"
  :popper-class="'query-input-autocomplete ' + setCustomCss"
  v-model="filterValue"
  :fetch-suggestions="querySearch"
  :value-key="showkey"
  @focus="()=>{$emit('focus'),initData()}"
  @change="(val)=>{handleSelect(val)}"
  @blur="()=>{$emit('blur')}"
  :placeholder="place"
  ref="myautocomplete"
  @select="handleSelect"
  v-bind="$attrs"
  >
  <i slot="suffix" v-if="suffix" :class="[suffix]" class="el-input__icon el-icon-date"></i>
  <i slot="prefix" v-if="prefix" :class="[prefix]" class="el-input__icon el-icon-search"></i>
  <slot name="head"></slot>
  <template slot-scope="{ item }">
    <slot v-bind:item="item">
      <!-- 回退的内容 -->
      <template v-if="type === 'sender' || type === 'receiver'">
        <span class="query-input-customer-org" :title="item.customerUnit" v-html="highLight(item,'customerUnit')"> </span><span class="query-input-customer-name" :title="item.customerName" v-html="highLight(item,'customerName')"></span><span class="query-input-customer-mobile" v-html="highLight(item,'customerMobile')"></span><span class="query-input-customer-addr" :title="item.detailedAddress" v-html="highLight(item,'detailedAddress')"></span>
      </template>
      <template v-else-if="type === 'city' || type === 'fromcity' || type === 'tocity'">
        <div class="query-input-city-info">
          <span class="query-input-city-query" v-html="highLightCity(item, true)"> </span><span class="query-input-city-name" v-html="highLightCity(item)"></span>
        </div>
      </template>
      <template v-else>
        <span v-html="highLight(item, showkey)"></span>
      </template>
    </slot>
  </template>
</el-autocomplete>
<el-select
    v-if="show === 'select' && remote"
    v-model="handlevalue"
    :popper-class="'query-input-autocomplete ' + setCustomCss"
    :filterable="filterable"
    @change="(val) => {$emit('focus'),handleSelect(val)}"
    @focus="()=>{$emit('focus'),initData()}"
    @blur="()=>{$emit('blur')}"
    :value-key="showkey"
    remote
    :placeholder="place"
    :remote-method="querySearch"
    ref="myautocomplete"
    :loading="loading"
    v-bind="$attrs"
    >
    <slot name="select-remote-head"></slot>
    <el-option
      v-for="item in searchData"
      :key="item[valuekey]"
      :label="item[showkey]"
      :value="item[valuekey]">
        <slot name="select-remote" v-bind:item="item">
          <!-- 回退的内容 -->
          <template v-if="type === 'sender' || type === 'receiver'">
            <span class="query-input-customer-org" v-html="highLight(item,'customerUnit')"> </span><span class="query-input-customer-name" v-html="highLight(item,'customerName')"></span><span class="query-input-customer-mobile" v-html="highLight(item,'customerMobile')"></span><span class="query-input-customer-addr" v-html="highLight(item,'detailedAddress')"></span>
          </template>
          <template v-else-if="type === 'city' || type === 'fromcity' || type === 'tocity'">
            <div class="query-input-city-info">
              <span class="query-input-city-query" v-html="highLightCity(item, true)"> </span><span class="query-input-city-name" v-html="highLightCity(item)"></span>
            </div>
          </template>
          <template v-else>
            <span v-html="highLight(item, showkey)"></span>
          </template>
        </slot>
    </el-option>
  </el-select>
  <el-select
    v-if="show === 'select' && !remote"
    v-model="handlevalue"
    @change="(val) => {$emit('change'),handleSelect(val)}"
    @focus="()=>{$emit('focus'),initData()}"
    @blur="()=>{$emit('blur')}"
    :value-key="showkey"
    :popper-class="'query-input-autocomplete ' + setCustomCss"
    :filterable="filterable"
    :placeholder="place"
    ref="myautocomplete"
    v-bind="$attrs"
    >
    <slot name="select-head"></slot>
    <el-option
      v-for="item in allData"
      :key="item[valuekey]"
      :label="item[showkey]"
      :value="item[valuekey]">
        <slot name="select" v-bind:item="item">
          <!-- 回退的内容 -->
          <template v-if="type === 'sender' || type === 'receiver'">
            <span class="query-input-customer-org" v-html="highLight(item,'customerUnit')"> </span><span class="query-input-customer-name" v-html="highLight(item,'customerName')"></span><span class="query-input-customer-mobile" v-html="highLight(item,'customerMobile')"></span><span class="query-input-customer-addr" v-html="highLight(item,'detailedAddress')"></span>
          </template>
          <template v-else-if="type === 'city' || type === 'fromcity' || type === 'tocity'">
            <div class="query-input-city-info">
              <span class="query-input-city-query" v-html="highLightCity(item, true)"> </span><span class="query-input-city-name" v-html="highLightCity(item)"></span>
            </div>
          </template>
          <template v-else>
            <span v-html="highLight(item, showkey)"></span>
          </template>
        </slot>
    </el-option>
  </el-select>
  </span>
</template>
<script>
// 引入事件对象
import { eventBus } from '@/eventBus'
// 获取城市信息
import { getCityInfo } from '@/api/common'
// 获取承运商信息
import { getAllCarrier } from '@/api/company/carrierManage'
// 获取客户信息
import { getAllCustomer } from '@/api/company/customerManage'
// 获取司机信息
import { getAllDriver } from '@/api/company/driverManage'
// 获取员工信息
import { getAllUser, getAllOrgUser } from '@/api/company/employeeManage'
// 获取车辆信息
import { getAllTrunk } from '@/api/company/trunkManage'
// 获取异常列表、控货列表信息
import { PostGetAbnormalList, PostControlgoods } from '@/api/operation/dashboard'
// 获取订单列表
import { getPostlist } from '@/api/operation/manage'
// 获取运单列表
import orderManageApi from '@/api/operation/orderManage'
// 获取提货单列表
import { fetchPostlist } from '@/api/operation/pickup'
// 获取回单列表
import { postReceipt } from '@/api/operation/receipt'
// 获取库存列表
import { postAllOrderRepertory } from '@/api/operation/repertory'
// 获取收支方式列表
import { postTmsFfinancialwayList2 } from '@/api/finance/financefinancialway'

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
      default: '请选择'
    },
    // 搜索的表格
    type: {
      type: String,
      default: 'user'
    },
    // 搜索匹配的字段
    // 可以一次匹配多个字段去做搜索
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
    },
    // select是否开启搜索
    filterable: {
      type: Boolean,
      default: true
    },
    popClass: {
      type: String,
      default: ''
    },
    getinput: {
      type: Boolean,
      default: false
    },
    suffix: {
      type: String,
      default: ''
    },
    prefix: {
      type: String,
      default: ''
    },
    showlastinput: {
      type: [Boolean, String],
      default: 'nonono'
    }
  },
  watch: {
    name: {
      handler(newVal) {
        if (!this.inited) {
          // this.findName(newVal)
        }
      },
      immediate: false
    },
    value: {
      handler(newVal, oldVal) {
        // 当绑定值跟搜索字段一致时，响应绑定值的变化
        // 当被清空时
        // 转成字符串格式
        /* newVal = newVal ? newVal + '' : ''
        if (this.search === this.valuekey || !newVal) {
          this.handlevalue = newVal
          console.log('handkler: ', newVal)
        }
         */

        if (this.show !== 'input') {
          this.findValue(newVal)
        } else {
          console.log('handkler: ', newVal, oldVal)
          this.handlevalue = newVal
        }
      },
      immediate: false
    },
    handlevalue(newVal, oldval) {
      if (this.show === 'input') {
        console.log('handlevalue:', newVal, oldval)
        this.$emit('input', this.handlevalue)
      }
      if (this.getinput) {
        // this.$emit('change', '', this.handlevalue)
      }
        //
    }
  },
  computed: {
    filterValue: {
      get() {
        console.log('getgetget', this.handlevalue)
        let val = this.handlevalue || ''
        val = (val + '').split(',')
        return val[2] || val[1] || val[0] || this.handlevalue
      },
      set(val) {
        console.log('setsetset', val)
        this.handlevalue = val
        this.handleSelect(val)
      }
    },
    setCustomCss() {
      return this.popClass + ' ' + this.customCss
    },
    place() {
      return this.show === 'select' ? '请选择' : this.placeholder
    },
    getOrgid() {
      return this.orgid || this.otherinfo.orgid
    },
    showkey() {
      return this.showlabel || this.label || this.search
    },
    queryFn() {
      let fn
      switch (this.type) {
        case 'user':
          this.queryParam.vo.orgid = this.getOrgid
          this.queryParam.vo.mobilephone = ''
          this.queryParam.vo.name = ''

          fn = getAllOrgUser
          break
        case 'tocity':
          this.preFn = orderManageApi.getRecently('5')

        case 'fromcity':
          if (this.type !== 'tocity') {
            this.preFn = orderManageApi.getRecently('4')
          }
        case 'city':
          if (this.preFn) {
            this.preFn.then(res => {
              this.preData = this.formatToCityData(res.data || [])
            })
          }
          this.queryParam = ''
          fn = getCityInfo
          this.customCss = 'query-input-city'
          this.showlabel = this.label || 'last'
          // 判断是否需要显示最近输入的记录
          this.lastinput = this.showlastinput === 'nonono' ? true : this.showlastinput
          break
        case 'carrier':
          fn = getAllCarrier
          this.queryParam.vo.orgid = this.getOrgid
          break
        case 'sender':
          this.queryParam.vo.customerType = 1
          this.queryParam.vo.orgid = this.getOrgid
          fn = getAllCustomer
          this.customCss = 'query-input-customer'
          break
        case 'receiver':
          this.queryParam.vo.customerType = 2
          this.queryParam.vo.orgid = this.getOrgid
          fn = getAllCustomer
          this.customCss = 'query-input-customer'
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
          this.lastQuery = ''
          this.queryParam = this.getOrgid
          fn = orderManageApi.getBatchList
          break
        case 'cargoName':
          this.canchangeparam = false
          this.lastQuery = ''
          this.queryParam = '1'
          fn = orderManageApi.getRecently
          break
        case 'cargoPack':
          this.canchangeparam = false
          this.lastQuery = ''
          this.queryParam = '2'
          fn = orderManageApi.getRecently
          break
        /* case 'fromcity':
          this.canchangeparam = false
          this.lastQuery = ''
          this.queryParam = '4'
          fn = orderManageApi.getRecently
          break
        case 'tocity':
          this.canchangeparam = false
          this.lastQuery = ''
          this.queryParam = '5'
          fn = orderManageApi.getRecently
          break */
        case 'remark':
          this.canchangeparam = false
          this.lastQuery = ''
          this.queryParam = '3'
          fn = orderManageApi.getRemarkList
          break
        case 'payway':
          this.canchangeparam = false
          this.queryParam = {}
          this.queryParam.orgId = this.getOrgid
          // this.queryParam.vo.orgId = this.getOrgid
          // this.queryParam.vo.status = 0
          fn = postTmsFfinancialwayList2
          break
      }
      // 设定pageSize参数
      if (typeof this.queryParam === 'object' && this.canchangeparam) {
        this.queryParam.pageSize = this.count
        // 处理传过来的额外参数
        if (typeof this.queryParam.vo === 'object') {
          this.queryParam.vo = Object.assign(this.queryParam.vo, this.param)
          // 当有传入组织id时，表示需要控制获取指定组织id的数据
          if (this.orgid !== '') {
            this.queryParam.vo.orgid = this.orgid
          }
        } else {
          this.queryParam = Object.assign(this.queryParam, this.param)
          if (this.orgid !== '') {
            this.queryParam.orgid = this.orgid
          }
        }
      }

      return fn
    }
  },
  data() {
    return {
      preFn: '',
      preData: [], // 用来组合数据用的
      showlabel: '',
      customCss: '',
      handlevalue: '',
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
      lastQuery: '\\*',
      lastRequest: []
    }
  },
  mounted() {
    // 初始化请求、请求参数等
    this.canchangeparam = !this.nochangeparam
    this.remoteFn = this.queryFn
    // console.log('handkler2: ', this.value)
    this.handlevalue = this.value

    if (this.value && this.show !== 'input') {
      // this.initFindItem()
    }

    this.initEvent()
  },
  methods: {
    initEvent() {
      eventBus.$on('closepopbox', () => {
        if (this.$refs.myautocomplete) {
          this.$refs.myautocomplete.close ? this.$refs.myautocomplete.close() : this.$refs.myautocomplete.handleClose ? this.$refs.myautocomplete.handleClose() : ''
        }
      })
    },
    initFindItem() {
      this.initData().then(res => {
        if (this.value) {
          // 遍历已有的数据
          // 假如请求的数据没有包含这个数据呢？
          this.findValue(this.value)
        }
        if (this.name) {
        //  this.findName(this.name)
        }
      })
    },
    findItem(value, name) {
      if (this.inited) {
        let isfind = false
        this.allData.map(el => {
          if (el[name] === value) {
            this.handlevalue = el[this.showkey]
            isfind = true
            this.handleSelect(el)
          }
        })
        // 当查找不到时，回显到输入框
        this.handlevalue = !isfind ? value + '' : this.handlevalue
      } else {
        this.initFindItem()
      }
    },
    findName(value) {
      this.findItem(value, this.showkey)
    },
    findValue(value) {
      // console.log('findValue', value)
      this.findItem(value, this.valuekey)
    },
    initData() {
      if (!this.inited) {
        this.inited = true
        // 判断是否需要每次都请求
        return this.fetchFn().then(data => {
          this.allData = data
          this.searchData = data
        })
      }
      return Promise.resolve([])
    },
    // 高亮城市选择项
    highLightCity(item, ishightlight) {
      if (item.area) {
        return ishightlight ? this.setHightLight(item.longAddr.split(',')[2] || item.area, this.lastQuery) : (item.province === item.city ? item.province : (item.province + item.city))
      } else if (item.city) {
        return ishightlight ? this.setHightLight(item.city, this.lastQuery) : item.province
      } else {
        return ishightlight ? this.setHightLight(item.province, this.lastQuery) : ''
      }
    },
    setHightLight(str, key) {
      str = str || ''
      return str.replace(new RegExp(key, 'igm'), '<i class="highlight">' + key + '</i>')
    },
    highLight(item, key) {
      if (key === this.search && this.lastQuery !== '') {
        return this.setHightLight(item[key], this.lastQuery)
      } else {
        return item[key]
      }
    },
    formatList(arr) {
      if (this.type.indexOf('city') !== -1) {
        arr = arr.map(el => {
          const addr = el.longAddr.split(',')
          el.last = addr[2] || addr[1] || addr[0]
          return el
        })
      }
      return arr
    },
    formatToCityData(arr) {
      return arr.map((el, index) => {
        const arr = el.value.split(',')
        const obj = {
          id: index,
          province: arr[0] || '',
          city: arr[1] || '',
          area: arr[2] || '',
          longAddr: el.value
        }
        return obj
      })
    },
    fetchFn() {
      return this.remoteFn(this.queryParam).then(res => {
        const data = res.data ? res.data : res
        let list = (data.list ? data.list : data) || []
        list = Array.isArray(list) ? list : []
        // 针对最近记录输入控件的一些判断
        if (this.preData && this.preData.length && !this._lastQuery) {
          // 如果没有输入任何值，则显示最近记录（假如有）
          list = this.preData
        }
        /* if (this.preData && this.preData.length) {
          list = this.preData.concat(list)
        } */
        return this.formatList(list)
      })
    },
    querySearch(queryString = '', cb = () => {}) {
      // 缓存最近一次请求数据
      // 如果设定了不修改参数，则不缓存记录
      this._lastQuery = queryString
      if (queryString === this.lastQuery && this.canchangeparam) {
        cb(this.lastRequest)
      } else {
        if (this.canchangeparam) {
          if (this.queryParam.vo) {
            this.queryParam.vo[this.search] = queryString
          } else if (typeof this.queryParam === 'object') {
            this.queryParam[this.search] = queryString
          } else {
            this.queryParam = queryString
          }
        }

        const searchFunction = (el) => {
            // 如果有自定义的搜索函数，则调用其进行判断
          if (typeof this.searchFn === 'function') {
            return this.searchFn(el, queryString)
          }
          if (queryString === '') {
            return true
          }
            // 字符串  布尔值 空值 数值
            // 模糊匹配 全等于
            // console.log('el[this.search]:', el[this.search], this.search, el[this.search].toString().indexOf(queryString), queryString)
          return el[this.search] ? el[this.search].toString().indexOf(queryString) !== -1 : false
        }

        if (this.remote) {
          this.fetchFn().then(data => {
            this.lastQuery = queryString
            this.lastRequest = data
            if (!this.canchangeparam && data.length) {
              data = data.filter(searchFunction)
            }
            this.searchData = data
            this.allData = data
            cb(data)
          })
        } else {
          this.lastQuery = queryString
          if (!this.canchangeparam) {
            this.lastRequest = this.allData
          } else {
            this.lastRequest = this.allData.filter(searchFunction)
          }

          cb(this.lastRequest)
        }
      }
    },
    handleSelect(info) {
      const old = info
      // select 只传值过来，不符合需求
      if (this.show === 'select') {
        info = this.allData.filter(el => {
          return el[this.valuekey] === info
        })
        info = info[0] || old
      }
      console.log('handleSelect::::', info, this.handlevalue, ':::', (info ? (info[this.valuekey] || info.value || info) : ''))
      this.$emit('input', info ? (info[this.valuekey] || info.value || info) : '')

      this.$emit('change', {
        longAddr: info.longAddr || info,
        id: info.id || '',
        province: info.province || '',
        city: info.city || '',
        area: info.area || ''
      }, {
        longAddr: info.longAddr || info,
        id: info.id || '',
        province: info.province || '',
        city: info.city || '',
        area: info.area || ''
      })
    }
  }
}
</script>
<style lang="scss">
.query-input-autocomplete{
  .highlight{
    font-style: normal;
    color: #f00;
  }
  &.el-autocomplete-suggestion li.highlighted, &.el-autocomplete-suggestion li:hover{
    background: rgb(203,225,247);
  }
}
.query-input-customer, .query-input-city{
  min-width: 400px !important;
  li{
    padding: 0 10px;
    font-size: 12px;
    line-height: 28px;
    height: 28px;
    span{
      display: inline-block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      min-height: 28px;
    }

  }
  .query-input-customer-org{
    width: 100px;
    border-right: 1px solid #ddd;
  }
  .query-input-customer-name{
    width: 100px;
    border-right: 1px solid #ddd;
    padding-left: 5px;
  }
  .query-input-customer-mobile{
    width: 100px;
    border-right: 1px solid #ddd;
    padding-left: 5px;
  }
  .query-input-customer-addr{
    min-width: 200px;
    padding-left: 5px;
  }
}
.query-input-city{
  min-width: 300px !important;

  .query-input-city-info{
    display: flex;
    .query-input-city-query{
      min-width: 100px;
      max-width: 200px;
      text-align: left;
    }
    .query-input-city-name{
      flex: 1;
      color: #999;
      text-align: right;
    }
  }
}
</style>

