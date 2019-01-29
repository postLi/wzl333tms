import { objectMerge2 } from '@/utils/'
// 保存的引用型数据，会有可能造成数据篡改错误
// TODO：修复这个引用错误
window.TMS_DATA_CACHE = {}
const cache_OBJ = {
  get(key) {
    // return ''
    return window.TMS_DATA_CACHE[key] || ''
  },
  set(key, val) {
    window.TMS_DATA_CACHE[key] = val
    return val
  }
}

export default cache_OBJ
