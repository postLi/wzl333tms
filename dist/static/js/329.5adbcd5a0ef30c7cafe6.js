webpackJsonp([329],{"6BU6":function(t,e,n){"use strict";var i={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"component"},[n("h2",[e._v("右边弹窗")]),e._v(" "),n("popCenter",{attrs:{title:"自定义的标题",isShow:e.show},on:{close:e.close}}),e._v(" "),n("button",{on:{click:function(t){e.show=!0}}},[e._v("展示弹窗")]),e._v(" "),n("blockquote",[e._v("\n    引用地址：\n    components/PopRight/index.vue\n  ")]),e._v(" "),n("h3",[e._v("prop")]),e._v(" "),e._m(0),e._v(" "),n("h3",[e._v("event")]),e._v(" "),e._m(1),e._v(" "),n("h3",[e._v("SLOT")]),e._v(" "),e._m(2)],1)},staticRenderFns:[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("ul",[n("li",[t._v("title"),n("div",{staticClass:"type"},[t._v("String")]),t._v("自定义的标题")]),t._v(" "),n("li",{staticClass:"info-require"},[t._v("isShow"),n("div",{staticClass:"type"},[t._v("Boolean")]),t._v("是否显示弹窗")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("ul",[n("li",[n("div",{staticClass:"function"},[t._v("close")]),t._v("点击关闭按钮触发 ")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("ul",[n("li",[t._v("\n      title 标题部分\n    ")]),t._v(" "),n("li",[t._v("\n      content 内容部分\n    ")]),t._v(" "),n("li",[t._v("\n      footer 底部部分\n    ")])])}]};e.a=i},dydd:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n("itvk"),s=n("6BU6"),o=n("VU/8")(i.a,s.a,null,null,null);e.default=o.exports},itvk:function(t,e,n){"use strict";var i=n("P5Di");e.a={components:{popCenter:i.a},data:function(){return{show:!1}},methods:{close:function(t){this.show=!1}}}}});