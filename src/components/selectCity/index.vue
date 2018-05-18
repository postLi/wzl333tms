<template>
<el-autocomplete
  popper-class="city-autocomplete"
  v-model="city"
  :fetch-suggestions="querySearch"
  placeholder="请输入内容"
  @select="handleSelect">
  <template slot-scope="{ item }">
    <div class="name">{{ item.name }}</div>
  </template>
</el-autocomplete>
</template>
<script>
import { getCityInfo } from '../../api/common'

export default {
  data () {
    return {
      city: ''
    }
  },
  methods: {
    querySearch (queryString, cb) {
      getCityInfo({
        query: queryString
      }).then( data => {
        cb(data)
      })
    },
    handleSelect (info) {
      this.$emit('change', info)
    }
  }
}
</script>
<style lang="scss">

</style>
