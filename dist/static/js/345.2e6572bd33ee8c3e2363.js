webpackJsonp([345],{pY3o:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n("q2Rx"),r=n("uJEU"),i=n("VU/8")(a.a,r.a,null,null,null);t.default=i.exports},q2Rx:function(e,t,n){"use strict";t.a={data:function(){return{dialogTableVisible:!1,testdata:"",inputData:"安发网络"}},watch:{testdata:function(e){console.log("value:",e)}},methods:{focus:function(){console.log("focus:",this.testdata)},blur:function(){console.log("blur:",this.testdata)},change:function(){console.log("change:",this.testdata)},clipboardSuccess:function(){this.$message({message:"复制成功",type:"success",duration:1500})}}}},uJEU:function(e,t,n){"use strict";var a={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("h2",[t._v("自定义指令")]),t._v(" "),t._m(0),t._v(" "),n("h3",[t._v("v-numberOnly")]),t._v(" "),n("p",[t._v("只允许输入数字")]),t._v(" "),n("input",{directives:[{name:"numberOnly",rawName:"v-numberOnly"}],attrs:{type:"text"}}),t._v(" "),n("blockquote",[t._v("\n    只适用于input、el-input标签\n  ")]),t._v(" "),n("p",[t._v("修饰符 v-number-only:point 允许小数点")]),t._v(" "),n("input",{directives:[{name:"number-only",rawName:"v-number-only:point",arg:"point"}],attrs:{type:"text"}}),t._v(" "),n("p",[t._v("elementUI 输入框")]),t._v(" "),n("el-input",{attrs:{clearable:""},nativeOn:{keyup:function(e){return t.keepNumber(e)},blur:function(e){return t.keepNumber(e)},keydown:function(e){return t.keepNumber(e)}}}),t._v(" "),n("el-input",{attrs:{clearable:""},on:{blur:t.blur,focus:t.focus,change:t.change},nativeOn:{keydown:function(e){return t.keepNumberAndPoint(e)}},model:{value:t.testdata,callback:function(e){t.testdata=e},expression:"testdata"}}),t._v(" "),n("p",[t._v("带校检的输入框")]),t._v(" "),n("el-form",[n("el-form-item",{attrs:{label:"账户账号"}},[n("el-input",{directives:[{name:"numberOnly",rawName:"v-numberOnly"}],attrs:{"auto-complete":"off",maxlength:20,clearable:""}})],1)],1),t._v(" "),n("h3",[t._v("v-showPicture")]),t._v(" "),n("p",[t._v("弹窗展示图片")]),t._v(" "),n("button",{directives:[{name:"showPicture",rawName:"v-showPicture"}],attrs:{imgurl:"http://aflc.oss-cn-shenzhen.aliyuncs.com//tms/JepzficX6twzc2F76MtED8kMC53pxQmH.png"}},[t._v("点击预览")]),t._v(" "),t._m(1),t._v(" "),t._m(2),t._v(" "),n("h3",[t._v("v-Clipboard")]),t._v(" "),n("p",[t._v("复制文案")]),t._v(" "),n("el-button",{directives:[{name:"clipboard",rawName:"v-clipboard:copy",value:t.inputData,expression:"inputData",arg:"copy"},{name:"clipboard",rawName:"v-clipboard:success",value:t.clipboardSuccess,expression:"clipboardSuccess",arg:"success"}],attrs:{type:"primary",icon:"document"}},[t._v("copy")]),t._v(" "),t._m(3),t._v(" "),n("h3",[t._v("可移动的dialog")]),t._v(" "),n("p",[t._v("应用在el-dialog标签上")]),t._v(" "),n("div",{staticClass:"components-container"},[n("el-button",{attrs:{type:"primary"},on:{click:function(e){t.dialogTableVisible=!0}}},[t._v("open a Drag Dialog")]),t._v(" "),n("el-dialog",{directives:[{name:"el-drag-dialog",rawName:"v-el-drag-dialog"}],attrs:{title:"Shipping address",visible:t.dialogTableVisible},on:{"update:visible":function(e){t.dialogTableVisible=e}}},[t._v("\n    asfasfasf\n  ")])],1)],1)},staticRenderFns:[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("blockquote",[e._v("\n    目前所有自定义指令都是注册到全局，可在子组件中直接使用"),n("br"),n("br"),e._v("\n    文件路径："),n("br"),e._v("\n    /src/directive/index.js\n  ")])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("blockquote",[e._v("\n    目前获取大图链接的逻辑是："),n("br"),e._v("el.getAttribute('imgurl') || el.src || el.href\n  ")])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("ul",[n("li",[e._v("先尝试获取自定义属性imgurl；")]),e._v(" "),n("li",[e._v("如果没有，则将其当作图片对待，获取src属性；")]),e._v(" "),n("li",[e._v("最后前面都没拿到链接，则当a标签处理，获取其href属性")])])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("ul",[n("li",[e._v("\n      v-clipboard:copy='inputData' 要复制的数据\n    ")]),e._v(" "),n("li",[e._v("\n      v-clipboard:success 复制成功后的回调函数\n    ")]),e._v(" "),n("li",[e._v("\n      v-clipboard:error 复制失败后的回调函数\n    ")])])}]};t.a=a}});