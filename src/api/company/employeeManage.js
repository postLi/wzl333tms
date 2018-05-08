import fetch from '../../utils/fetch'

/**
 *
 * @param {*} params 获取网点列表信息
 */
export function getGroupName(params) {
  // 模拟数据
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        status: 200,
        data: {
          list: [{
            value: '1',
            label: '广州网点'
          }, {
            value: '2',
            label: '雷州网点'
          }, {
            value: '3',
            label: '梅州网点'
          }, {
            value: '4',
            label: '柳州网点'
          }, {
            value: '5',
            label: '崇州网点'
          }]
        }
      })
    }, 100)
  })

  return fetch.post('/getGroupName')
}
