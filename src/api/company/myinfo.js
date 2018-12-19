import fetch from '../../utils/fetch'
import md5 from 'js-md5'

/**
 * 修改密码
 */
export function putChangeMyPassword(obj) {
  obj.password = md5(obj.password)
  obj.newPassword = md5(obj.newPassword)
  obj.affirmNewPassword = md5(obj.affirmNewPassword)
  return fetch.put('/api-system/system/user/v1/updatePassword', obj)
}
