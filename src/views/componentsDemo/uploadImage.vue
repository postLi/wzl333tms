<template>
  <div class="component">
    <h2>上传图片</h2>
    <h4>默认样式</h4>
    <UploadImage v-model="url1" />
    <h4>定义标题</h4>
    <UploadImage  title="法人身份证正面" v-model="url2"  />
    <h4>定义提示</h4>
    <UploadImage  v-model="url3" tip="（有年检章，jpg/png。小于5M）" />
    <h4>定义标题跟提示 + 默认值</h4>
    <UploadImage @success="getUrl" title="法人身份证正面" v-model="url" tip="（有年检章，jpg/png。小于5M）" />
    <p>上传后的链接地址：{{ url }}</p>
    <img :src="url" />

    <blockquote>
      引用地址：
      component/Upload/singleImage.vue
    </blockquote>
    <h3>prop</h3>
    <ul>
      <li class="info-require">v-model<div class="type">String</div>用来绑定控件的值</li>
      <li>title<div class="type">String</div>标题</li>
      <li>tip<div class="type">String</div>提示信息</li>
    </ul>
    <h3>event</h3>
    <ul>
      <li><div class="function">success</div>返回当前控件的值，如 <pre>
      'xxxx' // 上传后的链接  
      </pre></li>
    </ul>
  </div>
</template>
<script>
import UploadImage from '@/components/Upload/singleImage'

export default {
  components: {
    UploadImage
  },
  data () {
    return {
      url: 'http://aflc.oss-cn-shenzhen.aliyuncs.com//tms/JepzficX6twzc2F76MtED8kMC53pxQmH.png',
      url1: '',
      url2: '',
      url3: ''
    }
  },
  methods: {
    getUrl (url) {
      console.log('upload Url:', url)
    }
  }
}
</script>
