
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

  return axiosfetch.request({
    url: '/api-uaa/oauth/token',
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
  return axiosfetch.get('/api-system/system/user/v1/getCurrentUser')
}

export function logout() {
  return axiosfetch.delete('/api-uaa/oauth/token', {
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'authorization': 'Basic d2ViQXBwOndlYkFwcA=='
    }
  })
}

export function refreshToken() {
  return axiosfetch.put()
}
