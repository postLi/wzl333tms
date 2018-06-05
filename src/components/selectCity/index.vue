<template>
<el-autocomplete
  popper-class="city-autocomplete"
  v-model="cityName"
  :fetch-suggestions="querySearch"
  placeholder="请输入内容"
  @select="handleSelect">
  <template slot-scope="{ item }">
    <span class="city-area" v-if="item.area">{{ item.area + ',' }}</span>
    <span class="city-city" v-if="item.city">{{ item.city + ',' }}</span>
    <span class="city-province" v-if="item.province">{{ item.province }}</span>
    <!-- <div class="city-name">{{ item.area + ',' + item.city + ',' + item.province }}</div> -->
  </template>
</el-autocomplete>
</template>
<script>
import { getCityInfo } from '../../api/common'

export default {
  props: {
    city: {
      type: String,
      default: ''
    },
    value: {
      type: [String, Number, Object]
    }
  },
  watch: {
    city: {
      handler (newVal) {
        this.cityName = newVal
      },
      immediate: true
    }
  },
  computed: {
  },
  data () {
    return {
      cityName: "",
      // 缓存最近一次的请求数据
      lastQuery: '',
      lastRequest: []
    }
  },
  methods: {
    querySearch (queryString, cb) {
      if(queryString === this.lastQuery){
        cb(this.lastRequest)
      }else{
        getCityInfo(queryString).then( data => {
          this.lastQuery = queryString
          this.lastRequest = data
          cb(data)
        })
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
