webpackJsonp([379],{"40md":function(e,t,n){"use strict";var i=n("o9X6");t.a={components:{SelectTree:i.a},data:function(){return{orgid:1}},methods:{getOrgid:function(e){console.log("pagenation",e)}}}},YSgN:function(e,t,n){"use strict";var i={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"component"},[n("h2",[t._v("获取网点树id")]),t._v(" "),n("SelectTree",{on:{change:t.getOrgid},model:{value:t.orgid,callback:function(e){t.orgid=e},expression:"orgid"}}),t._v(" "),n("blockquote",[t._v("\n    引用地址：\n    components/selectTree/index.vue\n  ")]),t._v(" "),n("h3",[t._v("prop")]),t._v(" "),t._m(0),t._v(" "),n("h3",[t._v("event")]),t._v(" "),t._m(1)],1)},staticRenderFns:[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("ul",[n("li",{staticClass:"info-require"},[e._v("v-model"),n("div",{staticClass:"type"},[e._v(" [Number, String]")]),e._v("用来绑定值")]),e._v(" "),n("li",[e._v("disabled"),n("div",{staticClass:"type"},[e._v("Boolean")]),e._v("是否禁用组件，默认为false")])])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("ul",[n("li",[n("div",{staticClass:"function"},[e._v("change")]),e._v("返回当前选择的网点id ")])])}]};t.a=i},cH6s:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n("40md"),s=n("YSgN"),r=n("VU/8")(i.a,s.a,null,null,null);t.default=r.exports}});