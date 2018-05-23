<template>
  <div class="dashboard-container">
    <div class='dashboard-text'>用户名:{{name}}</div>
    <div class='dashboard-text'>权限组:<span v-for='role in roles' :key='role'>{{role}}</span></div>
    <UploadImage @success="getUrl" title="法人身份证正面" v-model="url" tip="（有年检章，jpg/png。小于5M）" />
    <p>上传后的链接地址：{{ url }}</p>
    <img :src="url" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UploadImage from '@/components/Upload/singleImage'

export default {
  name: 'dashboard',
  components: {
    UploadImage
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  data () {
    return {
      url: 'http://aflc.oss-cn-shenzhen.aliyuncs.com//tms/JepzficX6twzc2F76MtED8kMC53pxQmH.png'
    }
  },
  methods: {
    getUrl(info){
      this.url = info.url
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
