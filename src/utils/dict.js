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
  }]
}
export default TMS_DICT_OBJECT

export function parseDict(type, name) {
  const find = TMS_DICT_OBJECT[type] ? TMS_DICT_OBJECT[type].filter(el => {
    return el.id === name
  }) : []
  return find[0] ? find[0].dictName : name
}
