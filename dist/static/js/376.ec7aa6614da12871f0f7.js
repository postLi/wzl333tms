webpackJsonp([376],{Og8h:function(e,t,r){"use strict";t.a={data:function(){return{dialogTableVisible:!1,inputData:"安发网络"}},methods:{clipboardSuccess:function(){this.$message({message:"复制成功",type:"success",duration:1500})}}}},PUcb:function(e,t,r){"use strict";var i={render:function(){var e=this;e.$createElement;e._self._c;return e._m(0)},staticRenderFns:[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("h2",[e._v("全局公共事件")]),e._v(" "),r("blockquote",[e._v("\n    定义一些公共事件，方便在各个组件中调用"),r("br"),r("br")]),e._v(" "),r("h3",[e._v("显/隐硕正报表")]),e._v(" "),r("p",[e._v("因为硕正报表属于浏览器插件形式展现，正常情况下普通dom元素不能覆盖在它上面，只能配合其AF.func('grayWindow', '')方法或者iframe来实现dom元素覆盖。")]),e._v(" "),r("p",[e._v("this.eventBus.$emit('hideSupcanChart') 隐藏报表"),r("br"),e._v("this.eventBus.$emit('showSupcanChart') 显示报表")]),e._v(" "),r("p",[e._v("ie下需要用配合iframe来提示dom元素的展示层级，可以参考右上角用户信息弹窗的实现~")]),e._v(" "),r("h3",[e._v("展示运单详情")]),e._v(" "),r("p",[e._v("this.eventBus.$emit('showOrderDetail', orderid, shipSn, isTab)")]),e._v(" "),r("p",[e._v("orderid 运单id；shipSn 运单号;isTab true为新开标签页展示，false为弹窗形式打开 ")]),e._v(" "),r("h3",[e._v("修改运单")]),e._v(" "),r("p",[e._v("以弹窗形式打开修改/创建运单")]),e._v(" "),r("p",[e._v("（以订单转运单、以提货批次转运单是创建）")]),e._v(" "),r("p",[e._v("this.eventBus.$emit('showCreateOrder', orderobj)")]),e._v(" "),r("pre",[e._v("    orderobj: {\n      orderid: '', // 运单id 只传这个参数表示修改该运单\n\n      batchid: '', // 提货批次id 以这个批次创建运单\n      ordernum: 1, // 运单数量 该提货批次可以创建多少个运单\n      batchobj: {}, // 提货批次对象\n\n      preid: '', // 订单id 传这个表示从订单转运单\n    }\n  ")]),e._v(" "),r("p",[e._v("this.eventBus.$emit('hideCreateOrder') 关闭修改运单的弹窗")]),e._v(" "),r("h3",[e._v("替换当前标签页")]),e._v(" "),r("p",[e._v("this.eventBus.$emit('replaceCurrentView', route)"),r("br"),e._v("(route 可以为vue route对象或者链接字符串)")]),e._v(" "),r("h3",[e._v("关闭当前标签页")]),e._v(" "),r("p",[e._v("this.eventBus.$emit('closeCurrentView')")]),e._v(" "),r("br"),e._v(" "),r("br"),e._v(" "),r("br"),e._v(" "),r("br")])}]};t.a=i},"n6/Y":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=r("Og8h"),v=r("PUcb"),n=r("VU/8")(i.a,v.a,null,null,null);t.default=n.exports}});