<template>
  <div>
    <h2>全局工具函数</h2>

    <blockquote>
      主要是方便大家开发，以及采取公共设定<br><br>
      文件路径：<br>
      /src/utils/index.js
    </blockquote>

    <h3>getSummaries</h3>
    <p>用来实现合计计算</p>
    <blockquote>
      getSummaries(param, propsArr)<br>
      param 表格数据 <br>
      propsArr 需要合计的字段属性 <br><br>
      
      使用参照<br>
      /src/views/finance/accountsLoad/batchArrivalLoad.vue
    </blockquote>
    展示计算结果的语法
    <ul>
      <li>属性名 单位为元</li>
      <li>属性名|单位</li>
      <li>_index|索引（|单位）</li>
    </ul>

    <h3>parseTime</h3>
    <p>用来格式化时间</p>
    <blockquote>
      parseTime(time, cFormat)<br>
      time 时间对象/时间戳/标准日期字符串(yyyy-mm-dd hh:MM:ss) <br>
      cFormat 格式化方式 默认值为 {y}-{m}-{d} {h}:{i}:{s}<br><br>

    </blockquote>
    <p>如： parseTime(new Date())<br>结果： {{utilsobj.parseTime(new Date())}}</p><p>如： parseTime(new Date(), '{y}/{m}/{d}')<br>结果： {{utilsobj.parseTime(new Date(),'{y}/{m}/{d}')}}</p>
    

    <h3>objectMerge2</h3>
    <p>合并复制对象</p>
    <p>第一个参数传false为浅拷贝</p>

    <h3>pickerOptions2</h3>
    <p>应用在el-time-select标签上，显示统一的快捷选择</p>
    <blockquote>
      使用参照<br>
     /src/views/finance/accountsPayable/batch/components/searchArtery.vue
    </blockquote>

    <h3>tmsMath</h3>
    <p>用于数学计算</p>
    <p>由于js计算带小数的数值时，容易出现浮点数错误，所以需要专门的工具方法去处理</p>
    <ul>
      <li>tmsMath._add(a,b) 加法</li>
      <li>tmsMath._sub(a,b) 减法</li>
      <li>tmsMath._mul(a,b) 乘法</li>
      <li>tmsMath._div(a,b) 除法</li>
    </ul>
    <p>链式调用/多参调用【最后必须调用result()方法返回结果，否则会影响下一次的计算调用，为避免此种影响，可以在执行计算前先调用clear()方法】<br>方法名不带下划线</p>
    示例：
    <p>原生计算（浮点错误）:40.11 + 10.01 + 13.01 <br> 结果： {{ 40.11 + 10.01 + 13.01  }}</p>
    <p>使用tmsMath方法： tmsMath.add(40.11 , 10.01 , 13.01).result() <br>  结果： {{ utilsobj.tmsMath.add(40.11 , 10.01 , 13.01).result() }}
    </p>
    或者
    <p>使用tmsMath方法： tmsMath.add(40.11).add(10.01).add(13.01).result() <br>  结果： {{ utilsobj.tmsMath.add(40.11).add(10.01).add(13.01).result() }}
    </p>

    <h3>uniqueArray</h3>
    <p>json数组去重</p>
    <blockquote>
      以指定的key键作为去重的判定<br>
      uniqueArray(array,key)<br>
      array 需要去重的数组<br>
      key 键名
    </blockquote>
    <p>如果是简单的去重，可以使用 uniqArray 方法</p>
    <blockquote>
      uniqArray(array)<br>
      array 需要去重的数组
    </blockquote>
    
    <h3>closest</h3>
    <p>DOM相关函数： 获取指定元素最近的匹配选择器的元素</p>
    <blockquote>
     closest(element, selector)<br>
     element dom元素<br>
     selector 选择器[字符串]
    </blockquote>

    <h3>loadJs</h3>
    <p>DOM相关函数： 加载js，返回promise对象</p>
    <blockquote>
     loadJs(src, callback)<br>
     src js文件路径<br>
     callback 加载完成后的回调函数

     <br><br>
     使用promise的方式<br>
     loadJs('http://xxxxx.js').then(()=>{<br>
      // 加载成功
      <br>
     }).catch(()=>{<br>
      // 加载失败
      <br>
     })
    </blockquote>
  </div>
  </div>
</template>
<script>
import * as utilsobj from '@/utils/index'
export default {
  data() {
    return {
      dialogTableVisible: false,
      inputData: '安发网络'
    }
  },
  computed: {
    utilsobj() {
      return utilsobj
    }
  },
  methods: {
    clipboardSuccess() {
      this.$message({
        message: '复制成功',
        type: 'success',
        duration: 1500
      })
    }
  }
}
</script>

