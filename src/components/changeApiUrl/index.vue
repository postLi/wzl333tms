<template>
  <el-select class="apiurlchange" @change="setApiurl" size="mini" v-model="apiurl" placeholder="请选择" v-if="showapi">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>
<script>
export default {
  data() {
    return {
      apiurl: 'api',
      showapi: false,
      options: [
        {
          value: 'api',
          label: '157服务器'
        },
        {
          value: 'localapi',
          label: '黄衍沐'
        },
        {
          value: 'wukunzhi',
          label: '吴坤智'
        },
        {
          value: 'huangyuwen',
          label: '黄宇文'
        },
        {
          value: 'dingfei',
          label: '丁飞'
        },
        {
          value: 'chenrongtao',
          label: '陈荣涛'
        },
        {
          value: 'fangjian',
          label: '方坚'
        },
        {
          value: 'aliyun',
          label: '阿里云'
        },
        {
          value: 'ceshi',
          label: '78服务器'
        }
      ]
    }
  },
  mounted() {
    // 方便测试
    if (process.env.NODE_ENV !== 'production') {
      this.showapi = true
      this.apiurl = localStorage.tms_testapiurl || 'api'
      window.tms_testapiurl = this.apiurl
    }
  },
  methods: {
    setApiurl(url) {
      window.tms_testapiurl = url
      localStorage.tms_testapiurl = url
    }
  }
}
</script>
<style lang="scss">
.apiurlchange{
    position: fixed;
    z-index: 9999;
    left: 0;
    top: 0;
}
</style>

