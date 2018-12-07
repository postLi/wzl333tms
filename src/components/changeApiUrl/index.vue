<template>
  <el-select class="apiurlchange" @visible-change="detectUrl" @change="setApiurl" size="mini" v-model="apiurl" placeholder="请选择" v-if="showapi">
    <el-option
      v-for="item in options"
      :key="item.value"
      :disabled="!item.online"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      apiurl: 'api',
      showapi: false,
      options: [
        {
          value: 'api',
          label: '开发服（79）',
          online: true
        },
        {
          value: '157service',
          label: '测试服（157）',
          online: true
        },
        {
          value: '180service',
          label: '预发布服（180）',
          online: true
        },
        {
          value: 'ceshi',
          label: '测试服2（78）',
          online: true
        },
        {
          value: 'localapi',
          label: '黄衍沐',
          online: true
        },
        {
          value: 'wukunzhi',
          label: '吴坤智',
          online: true
        },
        {
          value: 'huangyuwen',
          label: '黄宇文',
          online: true
        },
        {
          value: 'dingfei',
          label: '丁飞',
          online: true
        },
        {
          value: 'chenrongtao',
          label: '程荣涛',
          online: true
        },
        {
          value: 'fangjian',
          label: '方坚',
          online: true
        },
        {
          value: 'lingzhiying',
          label: '凌梓颖',
          online: true
        },
        {
          value: 'aliyun',
          label: '阿里云',
          online: true
        },
        {
          value: 'home',
          label: '157-2',
          online: true
        }
      ]
    }
  },
  mounted() {
    // 方便测试
    if (process.env.NODE_ENV !== 'production' || window.location.href.indexOf('192.168.1') !== -1) {
      this.showapi = true
      this.apiurl = localStorage.tms_testapiurl || 'api'
      window.tms_testapiurl = this.apiurl
    }
  },
  methods: {
    // 优化检测机制，不点开就不开始检测
    detectUrl() {
      if (!this.ischecked) {
        this.ischecked = true
        this.checkUrl()
      }
    },
    setApiurl(url) {
      window.tms_testapiurl = url
      localStorage.tms_testapiurl = url
    },
    // 检测在线的服务器
    // 超过3秒没有返回的就当不在线
    checkUrl() {
      this.options.map((el, index) => {
        // 调整监测逻辑，改为每秒检测一个，避免全部同时请求造成浏览器的请求堵塞影响准确性~
        setTimeout(() => {
          // axios.get('/' + el.value + '/api-order/order/v1/orderCreateDate/', {
          axios.get('/' + el.value + '/api-common/common/oss/v1/policy', {
            timeout: 10000
          }).catch((err) => {
            const status = err.response ? err.response.status : 'unconnect'
            if (status === 504 || status === 500 || status === 'unconnect') {
              el.online = false
            }
          })
        }, 1000 * index)
      })
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

