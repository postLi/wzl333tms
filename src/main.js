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

import * as filters from './filters'

import './mixins'

import './directive'


if (process.env.NODE_ENV !== 'production') {
  console.log('init')
  window.addEventListener('error', function() {
    console.error(arguments)
  }, true)
  let old_error = window.onerror
  window.onerror = function() {
    old_error.call(this, arguments)
    console.error(arguments)
  }
}
// mock
// import './mock/'

// Vue.use(ElementUI, { locale })
Vue.use(ElementUI)

Vue.config.productionTip = false
Vue.prototype.$const = $const

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
