<template>
  <el-select class="apiurlchange" @change="setApiurl" size="mini" v-model="apiurl" placeholder="请选择" v-if="showapi">
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
          label: '157服务器',
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
          value: 'aliyun',
          label: '阿里云',
          online: true
        },
        {
          value: 'ceshi',
          label: '78服务器',
          online: true
        },
        {
          value: 'home',
          label: '157-2',
          online: true
        },
        {
          value: 'lingzhiying',
          label: '凌梓颖',
          online: true
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
      this.checkUrl()
    }
  },
  methods: {
    setApiurl(url) {
      window.tms_testapiurl = url
      localStorage.tms_testapiurl = url
    },
    // 检测在线的服务器
    // 超过3秒没有返回的就当不在线
    checkUrl() {
      console.log("11111111111")
      this.options.map(el => {
        console.log("2222222222222222",el)
        axios.get('/' + el.value + '/api-order/order/v1/orderCreateDate/', {
          timeout: 3000
        }).catch((err) => {
          const status = err.response ? err.response.status : 'unconnect'
          if (status === 504 ||status === 500 || status === 'unconnect') {
            el.online = false
          }
        })
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

