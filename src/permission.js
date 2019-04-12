import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式
import {
  getToken,
  removeToken,
  setToken
} from '@/utils/auth' // 验权
import {
  Message,
  MessageBox
} from 'element-ui'

const whiteList = ['/login']

function setExperience(to) {
  // 判断当前用户是否是体验用户， 做标记
  sessionStorage.setItem('TMS_experience_system', 'no')
  sessionStorage.setItem('TMS_experience_info', null)
  if (to.query.grant_type && to.query.grant_type === 'experience_system') {
    sessionStorage.setItem('TMS_experience_system', 'yes')
    sessionStorage.setItem('TMS_experience_info', JSON.stringify(to.query))
  }
}

router.beforeEach((to, from, next) => {
  const _hmt = window._hmt || []
  // _hmt.push(['_trackPageview', '/virtual/login']);
  /* must call `next` */
  NProgress.start()
  // 如果链接带有token信息，则将其保存
  // 会覆盖原有的token

  if (to.query.access_token) {
    console.log('to.query', to.query)
    // 判断当前用户是否是体验用户
    setExperience(to)

    store.dispatch('FeLogin', to.query.access_token, to.query.refresh_token).then(() => {
      next({
        path: to.fullPath.replace(/([&|?])(access_token=[^&]*&?)/, '$1').replace(/\?$/, '')
      })
      console.log('load Token:', getToken(), to.fullPath.replace(/([&|?])(access_token=[^&]*&?)/, '$1').replace(/\?$/, ''))
    })

  } else if (getToken()) {
    if (to.path === '/login') {
      next({
        path: '/'
      })
    } else {
      // 如果没有当前角色权限信息，则请求获取
      if (store.getters.roles.length === 0) {
        store.dispatch('GetInfo').then(res => {
          const roles = res.data.permissionTrees
          store.dispatch('GenerateRoutes', {
            roles
          }).then(() => {
            router.addRoutes(store.getters.addRouters)
            next({ ...to,
              replace: true
            })
          })
        }).catch((err) => {
          if (err.text || err.errInfo) {
            Message.error('错误：' + (err.text || err.errInfo || err.data || JSON.stringify(err)))
            console.log('错误：', JSON.stringify(err))
          }
          // console.log('错误：' + (err.text || err.errInfo || err.data || JSON.stringify(err)))
          removeToken()
          // 如果在登录页面时，因为跳转到的还是/login页，会导致右上角一直在转动加载条
          // 

          next({
            path: '/login',
            query: {
              // 删除access_token，避免重复循环
              tourl: to.fullPath.replace(/([&|?])(access_token=[^&]*&?)/, '$1')
            }
          })
          NProgress.done()
        })
      } else {
        const title = to.meta.title || to.name || ''
        // window.document.title = (title ? title + ' - ' : '') + '安发TMS管理系统'
        window.document.title = '安发TMS管理系统'
        if (location.href.indexOf('28tms.cn') !== -1) {
          _hmt.push(['_trackPageview', to.fullPath])
        }

        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next({
        path: '/login',
        query: {
          tourl: to.fullPath
        }
      })
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})