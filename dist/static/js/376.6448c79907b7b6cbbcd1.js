webpackJsonp([376],{gbGF:function(e,t,r){"use strict";var _=r("0xDb");t.a={data:function(){return{dialogTableVisible:!1,inputData:"安发网络"}},computed:{utilsobj:function(){return _}},methods:{clipboardSuccess:function(){this.$message({message:"复制成功",type:"success",duration:1500})}}}},lBGh:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var _=r("gbGF"),n=r("mX6p"),v=r("VU/8")(_.a,n.a,null,null,null);t.default=v.exports},mX6p:function(e,t,r){"use strict";var _={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("h2",[e._v("全局工具函数")]),e._v(" "),e._m(0),e._v(" "),r("h3",[e._v("getSummaries")]),e._v(" "),r("p",[e._v("用来实现合计计算")]),e._v(" "),e._m(1),e._v("\n  展示计算结果的语法\n  "),e._m(2),e._v(" "),r("h3",[e._v("parseTime")]),e._v(" "),r("p",[e._v("用来格式化时间")]),e._v(" "),e._m(3),e._v(" "),r("p",[e._v("如： parseTime(new Date())"),r("br"),e._v("结果： "+e._s(e.utilsobj.parseTime(new Date)))]),r("p",[e._v("如： parseTime(new Date(), '{y}/{m}/{d}')"),r("br"),e._v("结果： "+e._s(e.utilsobj.parseTime(new Date,"{y}/{m}/{d}")))]),e._v(" "),r("h3",[e._v("objectMerge2")]),e._v(" "),r("p",[e._v("合并复制对象")]),e._v(" "),r("p",[e._v("第一个参数传false为浅拷贝")]),e._v(" "),r("h3",[e._v("pickerOptions2")]),e._v(" "),r("p",[e._v("应用在el-time-select标签上，显示统一的快捷选择")]),e._v(" "),e._m(4),e._v(" "),r("h3",[e._v("tmsMath")]),e._v(" "),r("p",[e._v("用于数学计算")]),e._v(" "),r("p",[e._v("由于js计算带小数的数值时，容易出现浮点数错误，所以需要专门的工具方法去处理")]),e._v(" "),e._m(5),e._v(" "),e._m(6),e._v("\n  示例：\n  "),r("p",[e._v("原生计算（浮点错误）:40.11 + 10.01 + 13.01 "),r("br"),e._v(" 结果： "+e._s(50.12+13.01))]),e._v(" "),r("p",[e._v("使用tmsMath方法： tmsMath.add(40.11 , 10.01 , 13.01).result() "),r("br"),e._v("  结果： "+e._s(e.utilsobj.tmsMath.add(40.11,10.01,13.01).result())+"\n  ")]),e._v("\n  或者\n  "),r("p",[e._v("使用tmsMath方法： tmsMath.add(40.11).add(10.01).add(13.01).result() "),r("br"),e._v("  结果： "+e._s(e.utilsobj.tmsMath.add(40.11).add(10.01).add(13.01).result())+"\n  ")]),e._v(" "),r("h3",[e._v("uniqueArray")]),e._v(" "),r("p",[e._v("json数组去重")]),e._v(" "),e._m(7),e._v(" "),r("p",[e._v("如果是简单的去重，可以使用 uniqArray 方法")]),e._v(" "),e._m(8),e._v(" "),r("h3",[e._v("closest")]),e._v(" "),r("p",[e._v("DOM相关函数： 获取指定元素最近的匹配选择器的元素")]),e._v(" "),e._m(9),e._v(" "),r("h3",[e._v("loadJs")]),e._v(" "),r("p",[e._v("DOM相关函数： 加载js，返回promise对象")]),e._v(" "),e._m(10)])},staticRenderFns:[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("blockquote",[e._v("\n    主要是方便大家开发，以及采取公共设定"),r("br"),r("br"),e._v("\n    文件路径："),r("br"),e._v("\n    /src/utils/index.js\n  ")])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("blockquote",[e._v("\n    getSummaries(param, propsArr)"),r("br"),e._v("\n    param 表格数据 "),r("br"),e._v("\n    propsArr 需要合计的字段属性 "),r("br"),r("br"),e._v("\n    \n    使用参照"),r("br"),e._v("\n    /src/views/finance/accountsLoad/batchArrivalLoad.vue\n  ")])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("ul",[r("li",[e._v("属性名 单位为元")]),e._v(" "),r("li",[e._v("属性名|单位")]),e._v(" "),r("li",[e._v("_index|索引（|单位）")])])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("blockquote",[e._v("\n    parseTime(time, cFormat)"),r("br"),e._v("\n    time 时间对象/时间戳/标准日期字符串(yyyy-mm-dd hh:MM:ss) "),r("br"),e._v("\n    cFormat 格式化方式 默认值为 {y}-{m}-{d} {h}:{i}:{s}"),r("br"),r("br")])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("blockquote",[e._v("\n    使用参照"),r("br"),e._v("\n   /src/views/finance/accountsPayable/batch/components/searchArtery.vue\n  ")])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("ul",[r("li",[e._v("tmsMath._add(a,b) 加法")]),e._v(" "),r("li",[e._v("tmsMath._sub(a,b) 减法")]),e._v(" "),r("li",[e._v("tmsMath._mul(a,b) 乘法")]),e._v(" "),r("li",[e._v("tmsMath._div(a,b) 除法")])])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("p",[e._v("链式调用/多参调用【最后必须调用result()方法返回结果，否则会影响下一次的计算调用，为避免此种影响，可以在执行计算前先调用clear()方法】"),r("br"),e._v("方法名不带下划线")])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("blockquote",[e._v("\n    以指定的key键作为去重的判定"),r("br"),e._v("\n    uniqueArray(array,key)"),r("br"),e._v("\n    array 需要去重的数组"),r("br"),e._v("\n    key 键名\n  ")])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("blockquote",[e._v("\n    uniqArray(array)"),r("br"),e._v("\n    array 需要去重的数组\n  ")])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("blockquote",[e._v("\n   closest(element, selector)"),r("br"),e._v("\n   element dom元素"),r("br"),e._v("\n   selector 选择器[字符串]\n  ")])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("blockquote",[e._v("\n   loadJs(src, callback)"),r("br"),e._v("\n   src js文件路径"),r("br"),e._v("\n   callback 加载完成后的回调函数\n\n   "),r("br"),r("br"),e._v("\n   使用promise的方式"),r("br"),e._v("\n   loadJs('http://xxxxx.js').then(()=>{"),r("br"),e._v("\n    // 加载成功\n    "),r("br"),e._v("\n   }).catch(()=>{"),r("br"),e._v("\n    // 加载失败\n    "),r("br"),e._v("\n   })\n  ")])}]};t.a=_}});