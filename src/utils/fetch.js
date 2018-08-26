import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '@/store'
import { getToken, removeToken } from '@/utils/auth'
// 引入事件对象
import { eventBus } from '@/eventBus'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_ur
  timeout: 15000                  // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    // 让每个请求携带自定义token 请根据实际情况自行修改
    config.headers['access_token'] = getToken()
    // config.headers.Authorization = 'Bearer ' + getToken()

    // 暂时放到链接中
    if (!config.params) {
      config.params = {}
    }
    config.params['access_token'] = getToken()
    // console.log(config.url, config.params)
  }
  if (config.url.indexOf('http://') === -1) {
    // 如果是生产环境，强制访问157
    if (process.env.NODE_ENV === 'production') {
      // 这个值也要转为设定的值
      window.tms_testapiurl = 'api'
      localStorage.tms_testapiurl = 'api'
      config.url = '/api' + config.url
    } else {
      /**
       * 测试环境修改这里，不要修改上面那句代码
       */
      // 统一加上/api 前缀，方便后台转发接口

      window.tms_testapiurl = localStorage.tms_testapiurl || 'api'

      if (window.tms_testapiurl) {
        config.url = '/' + window.tms_testapiurl + config.url
      } else {
        config.url = '/api' + config.url
        // config.url = '/localapi' + config.url
        // config.url = '/wukunzhi' + config.url
        // config.url = '/huangyuwen' + config.url
        // config.url = '/dingfei' + config.url
        // config.url = '/ceshi' + config.url
        // config.url = '/chenrongtao' + config.url
        // config.url = '/home' + config.url
        // config.url = '/fangjian' + config.url
        // config.url = '/aliyun' + config.url
        // config.url = '/lingzhiying' + config.url
      }
    }
  }

  return config
}, error => {
  // Do something with request error
  console.log('interceptors:', error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
  /**
  * status为非200是抛错 可结合自己业务进行修改
  */
    const res = response.data

    if (res.status !== 200 && response.config.url.indexOf('/uaa/oauth/token') === -1) {
      console.group('=============状态不对出错==============：')
      console.warn('请求链接：', response.config.url)
      console.warn('请求方法：', response.config.method)
      console.warn('请求链接参数：', response.config.params)
      console.warn('请求body参数：', response.config.data)
      console.warn('请求结果：', res)
      console.groupEnd('=============状态不对出错==============：')
      /* Message({
        message: ((res.errorInfo || '') + ' : ' + (res.msg || '') + ' : ' + (res.code || '') + ' : ' + (res.text || '') + ' : ' + (res.status || '')),
        type: 'error',
        duration: 1 * 1000
      }) */
      // return Promise.reject(res)
      return res
    } else {
      return response.data
    }
  },
  error => {
    console.warn('=============请求出错==============：', error)
    let err = error
    if (error.response) {
      const status = error.response.status

      if (status === 403) {
        err = {
          text: '禁止访问',
          status: 100
        }
        /* Message({
          message: '禁止访问',
          type: 'error',
          duration: 1 * 1000
        }) */
      } else if (status === 404) {
        err = {
          text: '未找到相关信息',
          status: 100
        }
        /* Message({
          message: '未找到相关信息',
          type: 'error',
          duration: 1 * 1000
        }) */
      } else if (status === 401) {
        err = {
          text: '',
          status: 200
        }
        // 401:非法的token;Token 过期了;
        eventBus.$emit('hideSupcanChart')
        removeToken()
        MessageBox.alert('你已被登出，请重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.href = '/login' // 为了重新实例化vue-router对象 避免bug
          })
        }).catch(() => {
          store.dispatch('FedLogOut').then(() => {
            location.href = '/login'// 为了重新实例化vue-router对象 避免bug
          })
        })
        return false
      } else {
        err = {
          text: '请求错误：' + status,
          status: 100
        }
        /* Message({
          message: '请求错误：' + status,
          type: 'error',
          duration: 1 * 1000
        }) */
      }
    } else {
      console.log('response err:', error)// for debug
      /* Message({
        message: error.message,
        type: 'error',
        duration: 1 * 1000
      }) */
    }
    return Promise.reject(err)
  }
)

export function checkStatus(res) {
  if (res.status !== 100 && res.status !== -1 && res.status !== 40001 && res.status !== 0) {
    return res
  } else {
    return Promise.reject(res)
  }
}

// 覆写常用方法，对返回状态进行判断
function ServiceWrapper(config) {
  if (typeof config === 'object') {
    return service(config).then(checkStatus)
  }
}

ServiceWrapper.prototype = {
  get: (url, config = {}) => {
    return service.get(url, config).then(checkStatus)
  },
  post: (url, data = {}, config = {}) => {
    return service.post(url, data, config).then(checkStatus)
  },
  delete: (url, config = {}) => {
    return service.delete(url, config).then(checkStatus)
  },
  put: (url, data = {}, config = {}) => {
    return service.put(url, data, config).then(checkStatus)
  },
  request: (config) => {
    return service(config).then(checkStatus)
  },
  axios: service
}

const output = new ServiceWrapper()

export default output
// export default service
