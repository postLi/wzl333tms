/**
 * @Author: jianglei
 * @Date:   2017-10-12 12:06:49
 */
'use strict'
import Vue from 'vue'

export default function treeToArray(data, expandAll, parent = null, level = null) {
  let tmp = []
  Array.from(data).forEach(function (record, index) {
    if (record._expanded === undefined) {
      Vue.set(record, '_expanded', expandAll)
    }
    let _level = 1
    if (level !== undefined && level !== null) {
      _level = level + 1
    }

    Vue.set(record, '_level', _level)
    // 如果有父元素
    if (parent) {
      Vue.set(record, 'parent', parent)
    }
    tmp.push(record)
    if (index === (data.length - 1)) {
      if (record.children.length === 0) {
        Vue.set(record, 'islastnochil', true)
      } else {
        Vue.set(record, 'islast', true)
      }

    }
    if (index === (data.length - 2)) {
      Vue.set(record, 'isservernt', true)
    }
    //
    if (record.children && record.children.length > 0) {
      const children = treeToArray(record.children, expandAll, record, _level)
      tmp = tmp.concat(children)

    }
  })
  return tmp
}
