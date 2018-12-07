import fetch from '../../utils/fetch'

// /finance/tmsfinanceverificationcert/v1.3/getVerificationCertList
// getVerificationCertList
export function postFinCerList(params) {
  return fetch.post('/api-finance/finance/tmsfinanceverificationcert/v1.3/getVerificationCertList', params).then(res => {
    return res.data || {list: [], totalCount: 0}
  })
}
///finance/tmsfinanceverificationcert/v1.3/updateVerificationCertStatus
export function postFinCerFicationcert(params) {
  return fetch.post('/api-finance/finance/tmsfinanceverificationcert/v1.3/updateVerificationCertStatus', params)
}
