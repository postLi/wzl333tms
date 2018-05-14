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

function getGroupInfo(params) {
  return new Promise(resolve => {
    resolve([{
      name: '广州网点',
      key: '1'
    }, {
      name: '柳州网点',
      key: '2'
    }, {
      name: '雷州网点',
      key: '3'
    }, {
      name: '西州网点',
      key: '4'
    }])
  })
}

function getDepartmentInfo(params) {
  return new Promise(resolve => {
    resolve([{
      name: '财务部',
      key: '1'
    }, {
      name: '人力行政部',
      key: '2'
    }, {
      name: '调度部',
      key: '3'
    }, {
      name: '销售部',
      key: '4'
    }, {
      name: '运营部',
      key: '5'
    }, {
      name: '客服部',
      key: '6'
    }, {
      name: '项目部',
      key: '7'
    }, {
      name: '专线部',
      key: '8'
    }, {
      name: '仓管部',
      key: '9'
    }, {
      name: '业务部',
      key: '10'
    }])
  })
}

export function getAuthInfo(orgid, pagesize) {
  return fetch.get('/api-system/system/role/v1/', {
    orgid,
    roleName: '',
    pageSize: pagesize || 10
  }).then(res => {
    console.log('res:', res)
  })
  return new Promise(resolve => {
    resolve([{
      name: '超级管理员',
      key: '1'
    }, {
      name: '管理员',
      key: '2'
    }, {
      name: '网点负责人',
      key: '3'
    }, {
      name: '财务人员',
      key: '4'
    }])
  })
}

/**
 * 获取指定组织的信息
 * @param {*} orgid 组织id
 */
export function getOrgInfo(orgid) {
  return Promise.all([getGroupInfo(), getDepartmentInfo(), getAuthInfo()])
}


export function postEmployeer(data) {
  return fetch.post()
}
