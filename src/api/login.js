import fetch from '@/utils/fetch'
import {
  getRefreshToken
} from '../utils/auth'
import md5 from 'js-md5'

export function login(username, password, orgid) {
  var grant_type = 'password'
  var scope = 'webApp'
  /*   return fetch.post('/api-uaa/oauth/token', {
      username,
      password,
      grant_type,
      orgid
      // scope,
    }, {
      headers: {
        // 'content-type': 'application/x-www-form-urlencoded',
        'authorization': 'Basic d2ViQXBwOndlYkFwcA=='
      }
    }) */
  console.log('login:', arguments, fetch.axios)
  let rememberPwd = ''
  if (localStorage.getItem('TMS_rememberPwd')) {
    rememberPwd = JSON.parse(localStorage.getItem('TMS_rememberPwd')).password
  }
  return fetch.request({
    url: '/api-uaa/oauth/token',
    method: 'post',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'authorization': 'Basic d2ViQXBwOndlYkFwcA=='
    },
    params: {
      username,
      password: localStorage.getItem('TMS_rememberPwd') ? (password === rememberPwd ? rememberPwd : md5(password)) : md5(password),
      grant_type,
      orgid
      // scope,
    }
  })
}

export function getInfo(username, orgid) {
  return fetch.get('/api-system/system/user/v1/getCurrentUser')
}

export function logout(token) {
  return new Promise(resolve => {
    resolve({
      errorInfo: '',
      status: 200,
      text: '请求成功',
      data: ''
    })
  })
  return fetch.delete('/api-uaa/oauth/token', {
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'authorization': 'Basic d2ViQXBwOndlYkFwcA=='
    }
  })
}

export function refreshToken() {
  var grant_type = 'refresh_token'
  var rtoken = getRefreshToken()
  /*   return fetch.post('/api-uaa/oauth/token', {
      username,
      password,
      grant_type,
      orgid
      // scope,
    }, {
      headers: {
        // 'content-type': 'application/x-www-form-urlencoded',
        'authorization': 'Basic d2ViQXBwOndlYkFwcA=='
      }
    }) */
  console.log('login:', arguments, fetch.axios)
  return fetch.request({
    url: '/api-uaa/oauth/token',
    method: 'post',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'authorization': 'Basic d2ViQXBwOndlYkFwcA=='
    },
    params: {
      refresh_token: rtoken,
      grant_type
    }
  })
}
/**
 * 获得所有网点及网点下用户信息
 */
export function getOrgAndFollowingUser() {
  return fetch.get('/api-system/system/user/v1/getOrgAndFollowingUser').then(res => {
    return res.data || {}
  })
}
/**
 * 获得所有网点及网点下用户信息
 */
export function loginOhter(params) {
  return fetch.request({
    url: '/api-uaa/tmslogin/token',
    method: 'post',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'authorization': 'Basic d2ViQXBwOndlYkFwcA=='
    },
    params: {
      grant_type: params.grant_type,
      switch_username: params.switch_username,
      access_token: params.access_token
    }
  })
}
/**
 * 查询是否需要提示
 */
export function checkPrompt() {
  return fetch.get('/api-system/system/user/v1/initializationCheckPrompt').then(res => {
    return res.data
  })
}
/**
 * 更改为不再提示
 */
export function updatePrompt() {
  return fetch.get('/api-system/system/user/v1/updateCheckPrompt').then(res => {
    return res.data
  })
}