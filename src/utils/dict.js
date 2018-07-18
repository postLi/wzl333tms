const TMS_DICT_OBJECT = {
  'fee_status': [{
    id: 'NOSETTLEMENT',
    dictName: '未交账'
  }, {
    id: 'PARTSETTLEMENT',
    dictName: '部分交账'
  }, {
    id: 'ALLSETTLEMENT',
    dictName: '已交账'
  }],
  'pay_status': [{
    id: 'NOSETTLEMENT',
    dictName: '未结算'
  }, {
    id: 'PARTSETTLEMENT',
    dictName: '部分结算'
  }, {
    id: 'ALLSETTLEMENT',
    dictName: '已结算'
  }],
  'ship_status': {
    '转': '<i class="ship-zhuan"></i>',
    '拆': '<i class="ship-chai"></i>',
    '改': '<i class="ship-gai"></i>',
    '控': '<i class="ship-kong"></i>',
    '异': '<i class="ship-yi"></i>'
  }
}
export default TMS_DICT_OBJECT

export function parseDict(type, name) {
  const find = TMS_DICT_OBJECT[type] ? TMS_DICT_OBJECT[type].filter(el => {
    return el.id === name
  }) : []
  return find[0] ? find[0].dictName : name
}

export function parseShipStatus(status = '') {
  status = !status ? '' : status
  const arr = status.trim().split(',')
  let res = ''
  arr.map(el => {
    res += TMS_DICT_OBJECT['ship_status'][el.trim()] || ''
  })
  return res
}
