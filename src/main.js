import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en'
import App from './App'
import router from './router'
import store from './store'
import '@/icons' // icon
import './errorLog'// error
import '@/permission' // permission
import * as $const from './utils/constant'
// import * as $lodop from './utils/LodopFuncs'

import * as filters from './filters'
import md5 from 'js-md5'

import './mixins'

import './directive'

// 需要考虑按需引入，减小引入体积
// echarts的各模块
// https://github.com/apache/incubator-echarts/blob/master/index.js
import echarts from 'echarts/lib/echarts'
// 引入柱状图
import 'echarts/lib/chart/bar'
// 引入折线图
import 'echarts/lib/chart/line'
// 引入饼图
import 'echarts/lib/chart/pie'
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/toolbox'

// import 'echarts/lib/component/dataset'
// import 'echarts/lib/component/graphic'
// import 'echarts/lib/component/grid'
// import 'echarts/lib/component/singleAxis'
import 'echarts/lib/component/legendScroll'
// import 'echarts/lib/component/axisPointer'
// import 'echarts/lib/component/polar'

// 公用组件-表格设置
import TableSetup from '@/components/tableSetup/index'
Vue.use(TableSetup)
// 公用组件-表头模糊查询
import tableHeaderSearch from '@/components/tableHeaderSearch/index'
Vue.use(tableHeaderSearch)

Vue.prototype.$echarts = echarts

// Vue.use(ElementUI, { locale })
Vue.use(ElementUI)

if (process.env.NODE_ENV !== 'production') {
  Vue.config.performance = true
}
Vue.config.productionTip = false
Vue.prototype.$const = $const
Vue.prototype.$md5 = md5
// Vue.prototype.$lodop = $lodop

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
