import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { getToken, removeToken, setToken } from '@/utils/auth' // 验权
import { Message, MessageBox } from 'element-ui'

const whiteList = ['/login']
router.beforeEach((to, from, next) => {
  /* must call `next` */
  NProgress.start()
  // 如果链接带有token信息，则将其保存
  // 会覆盖原有的token
  if (to.query.tmstoken) {
    store.dispatch('FeLogin', to.query.tmstoken).then(() => {
      next({
        path: to.fullPath.replace(/([&|?])(tmstoken=[^&]*&?)/, '$1').replace(/\?$/, '')
      })
      console.log('load Token:', getToken(), to.fullPath.replace(/([&|?])(tmstoken=[^&]*&?)/, '$1').replace(/\?$/, ''))
    })
  } else if (to.query.nologin) {
    store.dispatch('Login', {
      password: '123456',
      username: 'fangjian'
    }).then(() => {
      next({
        path: '/'
      })
    })
  } else if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      // 如果没有当前角色权限信息，则请求获取
      if (store.getters.roles.length === 0) {
        store.dispatch('GetInfo').then(res => {
          const roles = res.data.rolesIdList
          store.dispatch('GenerateRoutes', { roles }).then(() => {
            router.addRoutes(store.getters.addRouters)
            next({ ...to, replace: true })
          })
        }).catch((err) => {
          //Message.error('错误：' + (err.text || err.errInfo || err.data || JSON.stringify(err)))
          console.log('错误：' + (err.text || err.errInfo || err.data || JSON.stringify(err)))
          removeToken()
          next({ path: '/login', query: {
            // 删除tmstoken，避免重复循环
            tourl: to.fullPath.replace(/([&|?])(tmstoken=[^&]*&?)/, '$1')
          }})
        })
      } else {
        const title = to.meta.title || to.name || ''
        // window.document.title = (title ? title + ' - ' : '') + '安发TMS管理系统'
        window.document.title = '安发TMS管理系统'
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next({ path: '/login', query: {
        tourl: to.fullPath
      }})
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
