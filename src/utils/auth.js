import Cookies from 'js-cookie'

const TokenKey = 'TMS-Token'
const UsernameKey = 'lastloginUsername'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getUsername() {
  return localStorage.getItem(UsernameKey)
}

export function setUsername(name) {
  return localStorage.setItem(UsernameKey, name)
}

export function removeUsername() {
  return localStorage.removeItem(UsernameKey)
}
