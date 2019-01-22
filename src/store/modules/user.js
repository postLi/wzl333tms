import Vue from 'vue'
import {
  login,
  logout,
  getInfo,
  refreshToken
} from '@/api/login'
import Cookies from 'js-cookie'
import {
  getAllSetting
} from '@/api/company/systemSetup'
import {
  getToken,
  setToken,
  removeToken,
  setRefreshToken,
  removeRefreshToken,
  setUsername,
  setOrgId,
  getOrgId,
  getUsername,
  setUserInfo,
  removeUserInfo,
  removeUsername,
  removeOrgId
} from '@/utils/auth'
import {
  getOrgId as getOrgInfo
} from '@/api/company/groupManage'

const refreshTimeKey = 'TMS-refreshTime'

const user = {
  state: {
    token: getToken(),
    name: '',
    username: '',
    company: '',
    avatar: '',
    roles: [],
    otherinfo: {}
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_USERNAME: (state, username) => {
      state.username = username
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_COMPANY: (state, company) => {
      state.company = company
    },
    SET_OTHERINFO: (state, otherinfo) => {
      state.otherinfo = otherinfo
    }
  },

  actions: {
    // 登录
    Login({
      commit
    }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password, userInfo.accNum).then(response => {
          const data = response
          if (location.href.indexOf('192.168.1') !== -1) {
            const token = data.access_token
            window.localStorage.ANFA_tms_login = JSON.stringify(data)
            const obj = localStorage.lastTmsToken || ''
            const arr = obj.split(',')
            if (arr.length < 5) {
              arr.push(new Date().toLocaleString() + '|' + username + '|' + token + '|' + data.expires_in)
            } else {
              arr.unshift(new Date().toLocaleString() + '|' + username + '|' + token + '|' + data.expires_in)
              arr.splice(4, 1)
            }
            localStorage.lastTmsToken = arr.join(',')
          }

          setToken(data.access_token)
          setRefreshToken(data.refresh_token)
          setUsername(username)
          setOrgId(userInfo.accNum)
          commit('SET_TOKEN', data.access_token)
          commit('SET_USERNAME', username)
          Cookies.set(refreshTimeKey, +new Date())
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端设置token信息
    FeLogin({
      commit
    }, token, refresh_token) {
      return new Promise((resolve, reject) => {
        console.log('feLogin:', token)
        commit('SET_TOKEN', token)
        setToken(token)
        setRefreshToken(refresh_token)
        Cookies.set(refreshTimeKey, +new Date())
        resolve()
      })
    },

    // 获取用户信息
    GetInfo({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          const data = response.data
          // data.rolesIdList = data.rolesId.split(',')
          commit('SET_ROLES', data.rolesIdList)
          commit('SET_NAME', data.username)
          commit('SET_USERNAME', data.username)
          setUsername(data.username)
          commit('SET_COMPANY', data.orgName)
          setOrgId(data.orgid)
          commit('SET_AVATAR', require('../../assets/role.png'))
          data.roleTree = JSON.parse(data.jsonTree) || null

          // 如果有访问系统设置的权限，则先获取下系统设置信息，有利于后面的操作
          // if (Vue.prototype.$_has_permission('SETTING')) {
          const pro1 = getAllSetting({
            orgid: data.orgid,
            type: '',
            module: 'order'
          })
          const pro2 = getAllSetting({
            orgid: data.orgid,
            type: '',
            module: 'finance'
          })
          const pro3 = getAllSetting({
            orgid: data.orgid,
            type: 'uploadLogo',
            module: 'base'
          })
          Promise.all([pro1, pro2, pro3]).then(resArr => {
            const res = resArr[0]
            console.warn('resArr::::::', resArr)

            data.systemSetup = res
            data.systemSetup.financeSetting = resArr[1].financeSetting
            data.systemSetup.uploadLogo = resArr[2].uploadLogo
            commit('SET_OTHERINFO', data)

            // 补充公司信息
            getOrgInfo(data.orgid).then(res => {
              data.companyInfo = res.data || {}
              commit('SET_OTHERINFO', data)
              setUserInfo(data)
              resolve({
                data
              })
            }).catch(error => {
              data.companyInfo = {}
              commit('SET_OTHERINFO', data)
              setUserInfo(data)
              resolve({
                data
              })
              // reject(error)
            })
          }).catch(error => {
            data.systemSetup = {}
            commit('SET_OTHERINFO', data)
            setUserInfo(data)
            resolve({
              data
            })
            // reject(error)
          })
          // } else {
          //   data.systemSetup = {}
          //   commit('SET_OTHERINFO', data)
          //   setUserInfo(data)
          //   resolve({ data })
          // }
        }).catch(error => {
          reject(error)
        })
        /* Promise.all([getInfo(),getAllSetting({})]).then(arr => {
          let response = arr[0]
          let systemSetup = arr[1]
          const data = response.data
          data.rolesIdList = data.rolesId.split(',')
          commit('SET_ROLES', data.rolesIdList)
          commit('SET_NAME', data.username)
          commit('SET_USERNAME', data.username)
          setUsername(data.username)
          commit('SET_COMPANY', data.orgName)
          setOrgId(data.orgid)
          commit('SET_AVATAR', require('../../assets/role.png'))
          commit('SET_OTHERINFO', data)
          setUserInfo(data)
          resolve({ data })
        }).catch(error => {
          reject(error)
        }) */
      })
    },

    // 更新TOKEN
    RefreshToken({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        refreshToken().then((data) => {
          setToken(data.access_token)
          setRefreshToken(data.refresh_token)
          commit('SET_TOKEN', data.access_token)
          Cookies.set(refreshTimeKey, +new Date())
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        logout(state.token || getToken()).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          removeRefreshToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({
      commit
    }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        removeRefreshToken()
        removeUserInfo()
        removeOrgId()
        removeUsername()
        resolve()
      })
    }
  }
}

export default user