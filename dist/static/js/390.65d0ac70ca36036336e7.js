webpackJsonp([390],{Q12U:function(e,t,i){"use strict";var n={render:function(){var n=this,e=n.$createElement,l=n._self._c||e;return l("el-dialog",{staticClass:"tms_dialog_print",attrs:{title:"打印标签设置",visible:n.dialogVisible,fullscreen:"","before-close":n.closeMe},on:{"update:visible":function(e){n.dialogVisible=e}}},[l("div",{staticClass:"print_aside"},[l("div",{staticClass:"print_aside_head"},[l("span",[n._v("字段列表 "+n._s(n.formModel.labelList.length)+" ")]),n._v(" "),l("el-button",{staticStyle:{float:"right","margin-top":"10px"},attrs:{type:"success",icon:"el-icon-document",size:n.btnsize},on:{click:function(e){n.submitForm("formModel")}}},[n._v("保存设置")]),n._v(" "),l("el-button",{staticStyle:{float:"right","margin-top":"10px","margin-right":"10px"},attrs:{icon:"el-icon-document",size:n.btnsize},on:{click:function(e){n.resetForm("formModel")}}},[n._v("全部重置")])],1),n._v(" "),l("el-form",{ref:"formModel",attrs:{model:n.formModel,rules:n.rules,"label-width":"0px"}},[l("ul",{staticClass:"print_aside_content"},[l("transition-group",n._l(n.formModel.labelList,function(t,i){return l("li",{key:i},[l("i",{class:1===t.isshow?"el-icon-circle-check showLabel":"el-icon-circle-close hideLabel"}),n._v(" "),l("b",[n._v(n._s(t.filedName))]),n._v(" "),l("span",[n._v(n._s(t.filedValue))]),n._v(" "),"setting"!==t.filedValue?l("el-switch",{attrs:{"active-text":t.isshow?"显示":"隐藏"},on:{change:function(e){n.handleSwitch(t)}},model:{value:1===t.isshow,callback:function(e){n.$set(t,"isshow===1?true:false",e)},expression:"item.isshow===1?true:false"}}):n._e(),n._v(" "),l("div",{staticClass:"print_aside_content_itemSet"},[l("el-form-item",[l("el-input",{directives:[{name:"numberOnly",rawName:"v-numberOnly"}],attrs:{size:n.btnsize,placeholder:"X轴坐标"},on:{change:function(e){n.changeValue(e,t,i)}},model:{value:t.leftx,callback:function(e){n.$set(t,"leftx",e)},expression:"item.leftx"}},[l("template",{slot:"prepend"},[n._v("X")])],2)],1),n._v(" "),l("el-form-item",[l("el-input",{directives:[{name:"numberOnly",rawName:"v-numberOnly"}],attrs:{size:n.btnsize,placeholder:"Y轴坐标"},on:{change:function(e){n.changeValue(e,t,i)}},model:{value:t.topy,callback:function(e){n.$set(t,"topy",e)},expression:"item.topy"}},[l("template",{slot:"prepend"},[n._v("Y")])],2)],1),n._v(" "),l("el-form-item",[l("el-input",{directives:[{name:"numberOnly",rawName:"v-numberOnly"}],attrs:{size:n.btnsize,placeholder:"宽度"},on:{change:function(e){n.changeValue(e,t,i)}},model:{value:t.width,callback:function(e){n.$set(t,"width",e)},expression:"item.width"}},[l("template",{slot:"prepend"},[n._v("宽")])],2)],1),n._v(" "),l("el-form-item",[l("el-input",{directives:[{name:"numberOnly",rawName:"v-numberOnly"}],attrs:{size:n.btnsize,placeholder:"高度"},on:{change:function(e){n.changeValue(e,t,i)}},model:{value:t.height,callback:function(e){n.$set(t,"height",e)},expression:"item.height"}},[l("template",{slot:"prepend"},[n._v("高")])],2)],1),n._v(" "),"setting"!==t.filedValue?l("el-form-item",[l("el-input",{directives:[{name:"numberOnly",rawName:"v-numberOnly"}],attrs:{size:n.btnsize,placeholder:"字号"},on:{change:function(e){n.changeValue(e,t,i)}},model:{value:t.fontsize,callback:function(e){n.$set(t,"fontsize",e)},expression:"item.fontsize"}},[l("template",{slot:"prepend"},[n._v("字号")])],2)],1):n._e(),n._v(" "),"setting"!==t.filedValue?l("el-form-item",[l("el-select",{attrs:{placeholder:"粗细",size:"mini"},model:{value:t.bold,callback:function(e){n.$set(t,"bold",e)},expression:"item.bold"}},n._l(n.fontWeightOptions,function(e){return l("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1):n._e(),n._v(" "),"setting"!==t.filedValue?l("el-form-item",[l("el-select",{attrs:{placeholder:"位置",size:"mini"},model:{value:t.alignment,callback:function(e){n.$set(t,"alignment",e)},expression:"item.alignment"}},n._l(n.alignmentOptions,function(e){return l("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1):n._e()],1)],1)}))],1)])],1),n._v(" "),l("div",{staticClass:"print_main"},[l("div",{staticClass:"print_main_head"},[l("span",[n._v("预览展示")])]),n._v(" "),l("div",{key:n.viewKey,staticClass:"print_main_content",style:n.printPreviewContent},n._l(n.formModel.labelList,function(e,t){return"setting"!==e.filedValue&&1===e.isshow?l("div",{staticClass:"previewBlock",style:{transform:"translate("+e.leftx+"px,"+e.topy+"px)",width:e.width+"px",height:e.height+"px",lineHeight:e.height+"px",fontSize:e.fontsize+"px",fontWeight:0===parseInt(e.bold)?400:400*parseInt(e.bold),textAlign:2===e.alignment?"center":0===e.alignment?"right":"left"},on:{mousedown:n.down,mousemove:n.move,mouseup:n.end}},[l("span",[n._v(n._s(e.filedName))])]):n._e()}))])])},staticRenderFns:[]};t.a=n},QXUo:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=i("qRot"),l=i("Q12U"),o=i("VU/8")(n.a,l.a,null,null,null);t.default=o.exports},qRot:function(e,t,i){"use strict";var n=i("bOdI"),l=i.n(n),o=i("DAYN"),s=i.n(o),a=i("6ThG");t.a={components:{draggable:s.a},props:{popVisible:{type:Boolean,default:!1}},data:function(){return{btnsize:"mini",formModel:{labelList:[]},rules:{},viewKey:0,flags:!1,alignmentOptions:[{value:0,label:"文字靠右"},{value:1,label:"文字靠左"},{value:2,label:"文字居中"}],fontWeightOptions:[{value:0,label:"默认粗细"},{value:2,label:"加粗"}]}},watch:{popVisible:function(){this.popVisible?(this.dialogVisible=!0,this.getSettingCompanyLi()):this.dialogVisible=!1}},computed:{dialogVisible:{get:function(){return this.popVisible},set:function(){}},printPreviewContent:function(){var t=600,i=400;return this.formModel&&this.formModel.labelList.forEach(function(e){"setting"===e.filedValue&&(t=e.width,i=e.height)}),console.log(t/3.78,i/3.78),{width:t+"px",height:i+"px"}},printPreviewPaper:function(){}},mounted:function(){this.getSettingCompanyLi()},methods:{down:function(){console.log(event)},move:function(){},end:function(){},getSettingCompanyLi:function(){var t=this;Object(a.d)().then(function(e){t.formModel.labelList=e})},closeMe:function(e){this.$emit("close"),"function"==typeof e&&e()},checkNull:function(e){return null!=e&&""!==e&&void 0},submitForm:function(e){var t=this;this.$refs[e].validate(function(e){e&&(t.formModel.labelList.forEach(function(e){if(t.checkNull(e.topy)||t.checkNull(e.leftx)||t.checkNull(e.width)||t.checkNull(e.height))return t.$message({type:"warning",message:"不能为空"}),!1}),Object(a.g)(t.formModel.labelList).then(function(e){t.$message({type:"success",message:"标签打印设置成功！"}),t.getSettingCompanyLi(),t.viewKey=(new Date).getTime()}))})},resetForm:function(e){var t=this;this.$refs[e].validate(function(e){e&&t.$confirm("此操作将所有设置重置为0,重置后不可恢复,是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.formModel.labelList.forEach(function(e){e.topy=0,e.leftx=0,e.width=0,e.height=0,e.fontsize=14,e.bold=0,e.alignment=1})}).catch(function(e){t.$message(l()({type:"info"},"type","已取消"))})})},canDragStart:function(e){},handleSwitch:function(e){1===e.isshow?e.isshow=0:e.isshow=1},changeValue:function(e,t,i){console.log(e,t,i),this.viewKey=(new Date).getTime()}}}}});