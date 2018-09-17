import * as $const from '@/utils/constant'

const TMS_DICT_OBJECT = {
  'fee_status': [],
  'ship_shipIdentifying': {
    '转': '<i title="运单已被中转外发" class="ship-zhuan"></i>',
    '拆': '<i title="运单已被拆分" class="ship-chai"></i>',
    '改': '<i title="运单已被修改" class="ship-gai"></i>',
    '控': '<i title="等通知放货" class="ship-kong"></i>',
    '异': '<i title="运单有异常" class="ship-yi"></i>',
    '急': '<i title="此单需要加急处理" class="ship-ji"></i>'
  }
}

/**
 * 赋值
 */
for (const i in $const) {
  if (typeof $const[i] === 'object') {
    TMS_DICT_OBJECT[(i + '').toLocaleLowerCase()] = Object.entries($const[i]).map(el => {
      let obj = {}
      obj = {
        id: /\d+/.test(el[0]) ? (parseInt(el[0], 10) || el[0]) : el[0],
        dictName: el[1]
      }
      return obj
    })
  }
}
console.log('TMS_DICT_OBJECT:', TMS_DICT_OBJECT)

export default TMS_DICT_OBJECT

export function parseDict(type, name) {
  if (name === '') {
    return ''
  }
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
    res += TMS_DICT_OBJECT['ship_shipIdentifying'][el.trim()] || el.trim()
  })
  return res
}
