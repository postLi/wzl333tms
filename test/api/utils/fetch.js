// store
var store = {
  getters: {
    token: ''
  }
}
// 提交数据到服务器保存
function cacheDEVInfo() {

}

// 创建axios实例
const service = axios.create({
  baseURL: '', // api的base_ur
  timeout: 30 * 1000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    // 让每个请求携带自定义token 请根据实际情况自行修改
    config.headers['access_token'] = store.getters.token

    // 暂时放到链接中
    if (!config.params) {
      config.params = {}
    }
    config.params['access_token'] = store.getters.token
  }

  if (config.url.indexOf('http://') === -1) {
    config.url = '/api' + config.url
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

    if (res.status !== 200 && response.config.url.indexOf('/api-uaa/oauth/token') === -1) {
      const data = {
        url: response.config.url,
        method: response.config.method,
        params: response.config.params,
        data: response.config.data,
        res: res
      }
      console.group('=============状态不对出错==============：')
      console.warn('请求链接：', data.url)
      console.warn('请求方法：', data.method)
      console.warn('请求链接参数：', data.params)
      console.warn('请求body参数：', data.data)
      console.warn('请求结果：', res)
      console.groupEnd('=============状态不对出错==============：')
      // 如果是非正式环境，缓存最近30条信息
      cacheDEVInfo('http', data)
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
      } else if (status === 404) {
        err = {
          text: '未找到相关信息',
          status: 100
        }
      } else if (status === 401) {
        err = {
          text: 'token信息有误',
          status: 100
        }
        return false
      } else {
        err = {
          text: '请求错误：' + status,
          status: 100
        }
      }
    } else {
      console.log('response err:', error) // for debug
    }
    return Promise.reject(err)
  }
)

function checkStatus(res, url = '', config) {
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
    return service.get(url, config).then((res) => {
      return checkStatus(res, url, config)
    })
  },
  post: (url, data = {}, config = {}) => {
    return service.post(url, data, config).then((res) => {
      return checkStatus(res, url, config)
    })
  },
  delete: (url, config = {}) => {
    return service.delete(url, config).then((res) => {
      return checkStatus(res, url, config)
    })
  },
  put: (url, data = {}, config = {}) => {
    return service.put(url, data, config).then((res) => {
      return checkStatus(res, url, config)
    })
  },
  request: (config) => {
    return service(config).then((res) => {
      return checkStatus(res, '', config)
    })
  },
  axios: service
}

const output = new ServiceWrapper()
// window.axiosfetch = new ServiceWrapper()
export default output
