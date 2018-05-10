import 'babel-polyfill'
window.Promise = Promise
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

import * as filters from './filters'

// mock
import './mock/'

// Vue.use(ElementUI, { locale })
Vue.use(ElementUI)

Vue.config.productionTip = false

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
