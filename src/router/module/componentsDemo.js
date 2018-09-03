const _import = require('../_import_' + process.env.NODE_ENV)

export default {
  name: 'components',
  path: '/components',
  component: _import('componentsDemo/index'),
  hidden: true,
  children: [
    {
      path: '/components/utils',
      name: '工具类函数',
      component: _import('componentsDemo/utils')
    },
    {
      path: '/components/events',
      name: '全局事件',
      component: _import('componentsDemo/events')
    },
    {
      path: '/components/dirctive',
      name: '自定义指令',
      component: _import('componentsDemo/dirctive')
    },
    {
      path: '/components/filters',
      name: '自定义过滤器',
      component: _import('componentsDemo/filters')
    },
    {
      path: '/components/uploadImage',
      name: '上传图片',
      component: _import('componentsDemo/uploadImage')
    },
    {
      path: '/components/pagination',
      name: '翻页',
      component: _import('componentsDemo/pagination')
    },
    {
      path: '/components/selectTree',
      name: '下拉网点树',
      component: _import('componentsDemo/selectTree')
    },
    {
      path: '/components/selectCity',
      name: '城市选择器',
      component: _import('componentsDemo/selectCity')
    },
    {
      path: '/components/selectType',
      name: '类型下拉框',
      component: _import('componentsDemo/selectType')
    },
    {
      path: '/components/popRight',
      name: '右边弹窗',
      component: _import('componentsDemo/popRight')
    },
    {
      path: '/components/popCenter',
      name: '中间弹窗',
      component: _import('componentsDemo/popCenter')
    },
    {
      path: '/components/querySelect',
      name: '下拉框查询',
      component: _import('componentsDemo/querySelect')
    },
    {
      path: '/components/tableSetup',
      name: '表格设置',
      component: _import('componentsDemo/tableSetup')
    },
    {
      path: '/components/print',
      name: '打印导出',
      component: _import('componentsDemo/print')
    },
    {
      path: '/components/import',
      name: '批量导入',
      component: _import('componentsDemo/import')
    }
  ]
}
