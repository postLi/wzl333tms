<template>
  <div class="component">
    <h2>获取城市</h2>
    <querySelect search="name" label="name"  :name="city" @change="getcity" />
    <blockquote>
      引用地址：
      components/querySelect/index.vue
    </blockquote>
    <p>搜索手机号码，显示名字</p>
    <querySelect search="mobilephone" label="name" @change="getcity" >
      <template slot-scope="{ item }">
        {{ item.name }} : {{ item.mobilephone }}
      </template>
    </querySelect>
    <h3>prop</h3>
    <ul>
      <li class="info-require">city<div class="type">  String</div>用来绑定值</li>
    </ul>
    <h3>event</h3>
    <ul>
      <li><div class="function">change</div>返回当前选择的城市 </li>
    </ul>
  </div>
</template>
<script>
import querySelect from '@/components/querySelect/index'
export default {
  components: {
    querySelect
  },
  data () {
    return {
      city: '方'
    }
  },
  methods: {
    getcity (obj) {
      // {
      //   pageNum: 1,
      //   pageSize: 100
      // }
      console.log('pagenation', obj)
      this.city = obj.longAddr
    }
  }
}
</script>
