import Vue from 'vue'
import store from './store'
import { cacheDEVInfo } from '@/utils/'

// you can set only in production env show the error-log
// if (process.env.NODE_ENV === 'production') {

if (process.env.NODE_ENV !== 'production') {
  window.addEventListener('error', function() {
    // (msg, url, line, col, error)
    console.error('window error:', arguments)
  }, true)
  window.addEventListener('unhandledrejection', event => {
    console.error('unhandledRejection', event.reason) // 打印未捕获的promise错误
  })

  window.addEventListener('rejectionhandled', event => {
    console.error('rejection handled', event) // 打印捕获的promise错误
  })
}

Vue.config.errorHandler = function(err, vm, info, a) {
  // err 包含 stack 跟 message 属性
  console.error('errorHandler:', err, '|', info, '|', vm)
  // console.log(Object.getOwnPropertyNames(err))

  cacheDEVInfo('j2s', err.stack || err.message || err)
  // Don't ask me why I use Vue.nextTick, it just a hack.
  // detail see https://forum.vuejs.org/t/dispatch-in-vue-config-errorhandler-has-some-problem/23500
  Vue.nextTick(() => {
    store.dispatch('addErrorLog', {
      err,
      vm,
      info,
      url: window.location.href
    })
    // console.error(err, info)
  })
}

// }
