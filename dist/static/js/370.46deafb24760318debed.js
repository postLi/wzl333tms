webpackJsonp([370],{"+NQE":function(e,_,n){"use strict";var t={render:function(){var _=this,e=_.$createElement,n=_._self._c||e;return n("div",[n("h2",[_._v("自定义过滤器")]),_._v(" "),n("blockquote",[_._v("\n    目前所有自定义过滤器都是注册到全局，可在子组件中直接使用\n  ")]),_._v(" "),n("h3",[_._v("timeAgo")]),_._v(" "),n("div",{staticClass:"type"},[_._v("接受数值格式的时间值")]),_._v(" "),n("p",[_._v("返回指定时间距离现在的时间段")]),_._v(" "),n("p",[_._v(_._s(_._f("timeAgo")(+new Date/1e3-1e3)))]),_._v(" "),n("p",[_._v(_._s(_._f("timeAgo")(+new Date/1e3-1e4)))]),_._v(" "),n("p",[_._v(_._s(_._f("timeAgo")(+new Date/1e3-1e5)))]),_._v(" "),n("p",[_._v(_._s(_._f("timeAgo")(new Date("2017/01/01 00:00:00"))))]),_._v(" "),n("pre",[_._v("    \n  ")]),_._v(" "),n("h3",[_._v("parseTime")]),_._v(" "),n("p",[_._v("将时间以指定格式输出展示")]),_._v(" "),n("p",[_._v("new Date() | parseTime "),n("br"),_._v("\n  "+_._s(_._f("parseTime")(new Date)))]),_._v(" "),n("p",[_._v("\n    new Date() | parseTime('{y}/{m}/{d}') "),n("br"),_._v("\n    "+_._s(_._f("parseTime")(new Date,"{y}/{m}/{d}"))+"\n  ")]),_._v(" "),n("p",[_._v("\n    new Date() | parseTime('{y}{m}{d} {h}:{i}:{s}')"),n("br"),_._v("\n    "+_._s(_._f("parseTime")(new Date,"{y}{m}{d} {h}:{i}:{s}"))+"\n  ")]),_._v(" "),n("h3",[_._v("formatTime")]),_._v(" "),n("p",[_._v("输出距离时间段")]),_._v(" "),n("p",[_._v("\n    +new Date()/1000 | formatTime"),n("br"),_._v("\n    "+_._s(_._f("formatTime")(+new Date/1e3))+"\n  ")]),_._v(" "),n("p",[_._v("\n    +new Date('2017/01/01 00:00:00')/1000 | formatTime"),n("br"),_._v("\n    "+_._s(_._f("formatTime")(+new Date("2017/01/01 00:00:00")/1e3))+"\n  ")]),_._v(" "),n("p",[_._v("\n    +new Date('2018/05/27 00:00:00')/1000 | formatTime"),n("br"),_._v("\n    "+_._s(_._f("formatTime")(+new Date("2018/05/27 00:00:00")/1e3))+"\n  ")]),_._v(" "),n("h3",[_._v("nFormatter")]),_._v(" "),n("p",[_._v("数字 格式化")]),_._v(" "),n("p",[_._v("\n     1111 | nFormatter "),n("br"),_._v("\n    "+_._s(_._f("nFormatter")(1111))+"\n  ")]),_._v(" "),n("p",[_._v("\n     2222222 | nFormatter "),n("br"),_._v("\n    "+_._s(_._f("nFormatter")(2222222))+"\n  ")]),_._v(" "),n("p",[_._v("\n     55555555 | nFormatter "),n("br"),_._v("\n    "+_._s(_._f("nFormatter")(55555555))+"\n  ")]),_._v(" "),n("p",[_._v("\n     999 | nFormatter "),n("br"),_._v("\n    "+_._s(_._f("nFormatter")(999))+"\n  ")]),_._v(" "),n("h3",[_._v("toThousandslsFilter")]),_._v(" "),n("p",[_._v("用逗号分隔数字")]),_._v(" "),n("p",[_._v("\n    1234567890 | toThousandslsFilte "),n("br"),_._v("\n    "+_._s(_._f("toThousandslsFilter")(1234567890))+"\n  ")]),_._v(" "),n("h3",[_._v("smalltoBIG")]),_._v(" "),n("p",[_._v("人民币转大写")]),_._v(" "),n("el-input",{model:{value:_.money,callback:function(e){_.money=_._n(e)},expression:"money"}}),_._v(" "),n("p",[_._v("转换:{ { money|smalltoBIG } }"),n("br"),_._v("\n  结果："+_._s(_._f("smalltoBIG")(_.money)))]),_._v(" "),n("br"),_._v(" "),n("br"),_._v(" "),n("br"),_._v(" "),n("br"),_._v(" "),n("br")],1)},staticRenderFns:[]};_.a=t},BILc:function(e,_,n){"use strict";_.a={data:function(){return{dialogTableVisible:!1,inputData:"安发网络",money:0}},methods:{clipboardSuccess:function(){this.$message({message:"复制成功",type:"success",duration:1500})}}}},b7kg:function(e,_,n){"use strict";Object.defineProperty(_,"__esModule",{value:!0});var t=n("BILc"),v=n("+NQE"),a=n("VU/8")(t.a,v.a,null,null,null);_.default=a.exports}});