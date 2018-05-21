import fetch from '../../utils/fetch'

export function getAllCustomer(params) {
  return fetch.post('/api-system/system/customer/v1/customerList', params).then(res => {
    return res.data
  })
}
