import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from './auth'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 15000                  // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    // 让每个请求携带自定义token 请根据实际情况自行修改
    // config.headers['access_token'] = getToken()
    // config.headers.Authorization = 'Bearer ' + getToken()

    // 暂时放到链接中
    if (!config.params) {
      config.params = {}
    }
    config.params['access_token'] = getToken()
    // console.log(config.url, config.params)
  }
  if (config.url.indexOf('http://') !== -1) {

  } else {
    // 统一加上/api 前缀，方便后台转发接口
    config.url = '/api' + config.url
  }

  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
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
      Message({
        message: res.errorInfo + res.status,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    if (error.response) {
      const status = error.response.status

      if (status === 403) {
        Message({
          message: '禁止访问',
          type: 'error',
          duration: 5 * 1000
        })
      } else if (status === 404) {
        Message({
          message: '未找到相关信息',
          type: 'error',
          duration: 5 * 1000
        })
      } else if (status === 401) {
        // 401:非法的token;Token 过期了;
        MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload()// 为了重新实例化vue-router对象 避免bug
          })
        })
      } else {
        Message({
          message: '请求错误：' + status,
          type: 'error',
          duration: 5 * 1000
        })
      }
    } else {
      console.log('err' + error)// for debug
      Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
      })
    }
    return Promise.reject(error)
  }
)

export default service
