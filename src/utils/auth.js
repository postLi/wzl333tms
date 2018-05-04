import Cookies from 'js-cookie'

const TokenKey = 'TMS-Token'
const UsernameKey = 'lastloginUsername'
const OrgIdKey = 'OrganizationId'

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

export function getOrgId() {
  return localStorage.getItem(OrgIdKey)
}

export function setOrgId(name) {
  return localStorage.setItem(OrgIdKey, name)
}

export function removeOrgId() {
  return localStorage.removeItem(OrgIdKey)
}