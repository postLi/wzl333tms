import fetch from '@/utils/fetch'

export function login(username, password, orgid) {
  var grant_type = 'password'
  var scope = 'webApp'
  return fetch({
    url: '/uaa/oauth/token',
    method: 'post',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'authorization': 'Basic d2ViQXBwOndlYkFwcA=='
    },
    params: {
      username,
      password,
      grant_type,
      orgid
      // scope,
    }
  })
}

export function getInfo(username, orgid) {
  return fetch({
    url: '/tmssystemservice/system/user/v1/',
    method: 'get',
    params: { username, orgid }
  })
}

export function logout() {
  return fetch.delete('/uaa/oauth/token', {
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'authorization': 'Basic d2ViQXBwOndlYkFwcA=='
    }
  })
}
