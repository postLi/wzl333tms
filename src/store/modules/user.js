import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken, setUsername, setOrgId, getOrgId, getUsername } from '@/utils/auth'

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
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password, userInfo.accNum).then(response => {
          const data = response
          setToken(data.access_token)
          setUsername(username)
          setOrgId(userInfo.accNum)
          commit('SET_TOKEN', data.access_token)
          commit('SET_USERNAME', username)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(getUsername(), getOrgId()).then(response => {
          const data = response.data[0]
          commit('SET_ROLES', data.rolesIdList || [])
          commit('SET_NAME', data.username)
          commit('SET_COMPANY', data.orgName)
          commit('SET_AVATAR', require('../../assets/role.png'))
          commit('SET_OTHERINFO', data)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
