webpackJsonp([379],{HtfE:function(e,t,i){"use strict";var a={render:function(){var l=this,e=l.$createElement,o=l._self._c||e;return o("el-dialog",{directives:[{name:"loading",rawName:"v-loading",value:l.loading,expression:"loading"}],staticClass:"tms_dialog_print_drag",attrs:{title:"打印标签设置 (单位:毫米mm)",visible:l.dialogVisible,fullscreen:"","before-close":l.closeMe},on:{"update:visible":function(e){l.dialogVisible=e}}},[o("div",{key:l.viewKey,staticClass:"print_aside"},[o("div",{staticClass:"print_aside_head"},[o("span",[o("i",{staticClass:"el-icon-menu"}),l._v(" 字段列表 "+l._s(l.formModel.labelList.length)+" ")]),l._v(" "),o("el-popover",{staticStyle:{float:"right","margin-top":"0px","margin-left":"10px"},attrs:{placement:"right",width:"400",trigger:"hover"}},[o("span",[l._v("可将信息项手动拖拽到右边纸张中显示及设置位置和宽高；"),o("br"),l._v("(单位：毫米mm)")]),l._v(" "),o("br"),l._v(" "),o("span",[l._v("【快捷键：】")]),l._v(" "),o("br"),l._v(" "),o("span",[l._v("按↑ ↓ ← →移动编辑项，")]),l._v(" "),o("br"),o("span",[l._v("按ctrl+↑↓控制高度变化，")]),l._v(" "),o("br"),o("span",[l._v("按ctrl+←→控制宽度变化 ")]),l._v(" "),o("br"),l._v(" "),o("span",[l._v("按tab键切换编辑项，")]),l._v(" "),o("br"),o("span",[l._v("shift+tab切换回上一个编辑项")]),l._v(" "),o("i",{staticClass:"el-icon-warning",attrs:{slot:"reference"},slot:"reference"})]),l._v(" "),o("el-button",{staticStyle:{float:"right","margin-top":"10px"},attrs:{type:"success",icon:"el-icon-document",size:l.btnsize},on:{click:function(e){l.submitForm("formModel")}}},[l._v("保存")]),l._v(" "),o("el-button",{staticStyle:{float:"right","margin-top":"10px","margin-right":"10px"},attrs:{icon:"el-icon-refresh",size:l.btnsize},on:{click:l.review}},[l._v("刷新")])],1),l._v(" "),o("div",{staticClass:"print_aside_search"},[o("el-autocomplete",{attrs:{"fetch-suggestions":l.querySearch,placeholder:"查找非自定义字段","popper-class":"popperHide",size:"mini",clearable:""},on:{select:l.handleSelect},model:{value:l.currentSearch,callback:function(e){l.currentSearch=e},expression:"currentSearch"}},[o("i",{staticClass:"el-input__icon el-icon-search",attrs:{slot:"prefix"},slot:"prefix"})])],1),l._v(" "),o("el-form",{ref:"formModel",attrs:{model:l.formModel,rules:l.rules,"label-width":"0px"}},[o("div",{staticClass:"print_aside_content_form"},[o("label",[l._v("模板名称")]),l._v(" "),o("ul",{staticClass:"print_aside_content"},l._l(l.formModel.labelList,function(t,i){return 6===t.type?o("li",{key:i,staticClass:"print_aside_content_self",staticStyle:{width:"100%"},attrs:{"data-fileName":t.filedValue}},[o("el-input",{staticStyle:{width:"100%"},attrs:{size:"mini",placeholder:"请输入模板名称(最多128个字符)",clearable:"",maxlength:128},nativeOn:{keyup:function(e){if(!("button"in e)&&l._k(e.keyCode,"enter",13,e.key,"Enter"))return null;l.addItemDrag(t,i)}},model:{value:l.modelNameSelf,callback:function(e){l.modelNameSelf=e},expression:"modelNameSelf"}})],1):l._e()})),l._v(" "),o("label",[l._v("发货人信息")]),l._v(" "),o("ul",{staticClass:"print_aside_content"},l._l(l.formModel.labelList,function(t,i){return 1===t.type?o("li",{key:i,attrs:{draggable:"true","data-fileName":t.filedValue},on:{dragstart:function(e){l.drag(e)},click:function(e){l.addItemDrag(t,i)}}},[o("el-tag",{attrs:{type:"info",size:l.tagSize}},[t.isshow?o("i",{staticClass:"el-icon-circle-check showLabel"}):l._e(),l._v(" "),o("b",[l._v(l._s(t.filedName))])])],1):l._e()})),l._v(" "),o("label",[l._v("收货人信息")]),l._v(" "),o("ul",{staticClass:"print_aside_content"},l._l(l.formModel.labelList,function(t,i){return 2===t.type?o("li",{key:i,attrs:{draggable:"true","data-fileName":t.filedValue},on:{dragstart:function(e){l.drag(e)},click:function(e){l.addItemDrag(t,i)}}},[o("el-tag",{attrs:{type:"info",size:l.tagSize}},[t.isshow?o("i",{staticClass:"el-icon-circle-check showLabel"}):l._e(),l._v(" "),o("b",[l._v(l._s(t.filedName))])])],1):l._e()})),l._v(" "),o("label",[l._v("标签主要信息")]),l._v(" "),o("ul",{staticClass:"print_aside_content"},l._l(l.formModel.labelList,function(t,i){return 3===t.type?o("li",{key:i,attrs:{draggable:"true","data-fileName":t.filedValue},on:{dragstart:function(e){l.drag(e)},click:function(e){l.addItemDrag(t,i)}}},[o("el-tag",{attrs:{type:"info",size:l.tagSize}},[t.isshow?o("i",{staticClass:"el-icon-circle-check showLabel"}):l._e(),l._v(" "),o("b",[l._v(l._s(t.filedName))])])],1):l._e()})),l._v(" "),o("label",[l._v("自定义信息")]),l._v(" "),o("ul",{staticClass:"print_aside_content"},l._l(l.formModel.labelList,function(t,i){return 5===t.type?o("li",{key:i,staticClass:"print_aside_content_self",staticStyle:{width:"100%"},attrs:{"data-fileName":t.filedValue}},[o("el-input",{attrs:{size:"mini",placeholder:"自定义标签(最多128个字符)",clearable:"",maxlength:128},nativeOn:{keyup:function(e){if(!("button"in e)&&l._k(e.keyCode,"enter",13,e.key,"Enter"))return null;l.addItemDrag(t,i)}},model:{value:l.labelSelf,callback:function(e){l.labelSelf=e},expression:"labelSelf"}}),l._v(" "),o("el-button",{attrs:{size:"mini",icon:"el-icon-plus"},on:{click:function(e){l.addItemDrag(t,i)}}},[l._v("添加")])],1):l._e()}))]),l._v(" "),o("div",{staticClass:"prinit_aside_paper"},[o("span",[o("i",{staticClass:"el-icon-document"}),l._v(" 纸张设置")]),l._v(" "),o("br"),l._v(" "),o("el-form-item",[o("el-input",{directives:[{name:"number-only",rawName:"v-number-only:point",arg:"point"}],attrs:{placeholder:"请输入内容",size:"mini"},on:{change:l.changeDragDetailInfo},model:{value:l.formModel.paper.width,callback:function(e){l.$set(l.formModel.paper,"width",e)},expression:"formModel.paper.width"}},[o("template",{slot:"prepend"},[l._v("宽")]),l._v(" "),o("template",{slot:"append"},[l._v("mm")])],2)],1),l._v(" "),o("el-form-item",[o("el-input",{directives:[{name:"number-only",rawName:"v-number-only:point",arg:"point"}],attrs:{placeholder:"请输入内容",size:"mini"},on:{change:l.changeDragDetailInfo},model:{value:l.formModel.paper.height,callback:function(e){l.$set(l.formModel.paper,"height",e)},expression:"formModel.paper.height"}},[o("template",{slot:"prepend"},[l._v("高")]),l._v(" "),o("template",{slot:"append"},[l._v("mm")])],2)],1),l._v(" "),o("el-form-item",[o("el-input",{attrs:{placeholder:"请输入内容",size:"mini"},on:{change:l.changeDragDetailInfo},model:{value:l.formModel.paper.leftx,callback:function(e){l.$set(l.formModel.paper,"leftx",e)},expression:"formModel.paper.leftx"}},[o("template",{slot:"prepend"},[l._v("左偏移")]),l._v(" "),o("template",{slot:"append"},[l._v("mm")])],2)],1),l._v(" "),o("el-form-item",[o("el-input",{attrs:{placeholder:"请输入内容",size:"mini"},on:{change:l.changeDragDetailInfo},model:{value:l.formModel.paper.topy,callback:function(e){l.$set(l.formModel.paper,"topy",e)},expression:"formModel.paper.topy"}},[o("template",{slot:"prepend"},[l._v("上偏移")]),l._v(" "),o("template",{slot:"append"},[l._v("mm")])],2)],1)],1),l._v(" "),o("div",{staticClass:"prinit_aside_rotate"},[o("span",[o("i",{staticClass:"el-icon-refresh"}),l._v(" 内容-打印输出方向")]),l._v(" "),o("br"),l._v(" "),o("el-form-item",[o("el-radio-group",{attrs:{size:"mini"},on:{change:l.changePrintRotate},model:{value:l.printRotate.width,callback:function(e){l.$set(l.printRotate,"width",e)},expression:"printRotate.width"}},l._l(l.printRotateRule,function(e){return o("el-radio-button",{key:e.value,attrs:{label:e.value,border:""}},[l._v(l._s(e.label))])}))],1)],1),l._v(" "),o("el-collapse-transition",[l.showDragDetail?o("div",[o("div",{staticClass:"prinit_aside_detail"},[o("span",[o("i",{staticClass:"el-icon-setting"}),l._v(" "+l._s(l.dragDetailInfo.filedName))]),l._v(" "),o("el-form-item",{staticClass:"print_itemSet_switch"},[o("el-switch",{attrs:{"active-color":"#67c23a","active-text":l.dragDetailInfo.isshow?"显示":"隐藏"},on:{change:l.handleSwitch},model:{value:l.dragDetailInfo.isshow,callback:function(e){l.$set(l.dragDetailInfo,"isshow",e)},expression:"dragDetailInfo.isshow"}})],1),l._v(" "),o("br"),l._v(" "),o("el-form-item",[o("el-input",{directives:[{name:"number-only",rawName:"v-number-only:point",arg:"point"}],attrs:{placeholder:"请输入内容",size:"mini"},on:{change:l.changeDragDetailInfo},model:{value:l.dragDetailInfo.width,callback:function(e){l.$set(l.dragDetailInfo,"width",e)},expression:"dragDetailInfo.width"}},[o("template",{slot:"prepend"},[l._v("宽")]),l._v(" "),o("template",{slot:"append"},[l._v("mm")])],2)],1),l._v(" "),o("el-form-item",[o("el-input",{directives:[{name:"number-only",rawName:"v-number-only:point",arg:"point"}],attrs:{placeholder:"请输入内容",size:"mini"},on:{change:l.changeDragDetailInfo},model:{value:l.dragDetailInfo.height,callback:function(e){l.$set(l.dragDetailInfo,"height",e)},expression:"dragDetailInfo.height"}},[o("template",{slot:"prepend"},[l._v("高")]),l._v(" "),o("template",{slot:"append"},[l._v("mm")])],2)],1),l._v(" "),o("el-form-item",[o("el-input",{directives:[{name:"numberOnly",rawName:"v-numberOnly"}],attrs:{placeholder:"请输入内容",size:"mini"},on:{change:l.changeDragDetailInfo},model:{value:l.dragDetailInfo.fontsize,callback:function(e){l.$set(l.dragDetailInfo,"fontsize",e)},expression:"dragDetailInfo.fontsize"}},[o("template",{slot:"prepend"},[l._v("字号")])],2)],1),l._v(" "),o("el-form-item",{staticClass:"print_itemSet_col"},[o("el-checkbox",{attrs:{label:"文字加粗",border:"",size:"mini"},on:{change:l.changeDragDetailInfo},model:{value:l.dragDetailInfo.bold,callback:function(e){l.$set(l.dragDetailInfo,"bold",e)},expression:"dragDetailInfo.bold"}}),l._v(" "),o("el-radio-group",{attrs:{size:"mini"},on:{change:l.changeDragDetailInfo},model:{value:l.dragDetailInfo.alignment,callback:function(e){l.$set(l.dragDetailInfo,"alignment",e)},expression:"dragDetailInfo.alignment"}},l._l(l.alignmentOptions,function(e){return o("el-radio-button",{key:e.value,attrs:{label:e.value,border:""}},[l._v(l._s(e.label))])}))],1)],1)]):l._e()]),l._v(" "),o("div",{staticClass:"prinit_aside_setpreview"},[o("div",{staticClass:"prinit_aside_setpreview_head"},[o("span",[o("i",{staticClass:"el-icon-picture"}),l._v(" 打印背景图片效果预览")]),l._v(" "),l.imageUrl?o("el-button",{staticStyle:{float:"right","margin-top":"10px"},attrs:{icon:"el-icon-delete",size:l.btnsize},on:{click:l.clearImgUrl}},[l._v("清除背景")]):l._e()],1),l._v(" "),o("Upload",{attrs:{title:"本地上传",listtype:"picture"},model:{value:l.imageUrl,callback:function(e){l.imageUrl=e},expression:"imageUrl"}})],1),l._v(" "),o("div",{staticClass:"prinit_aside_info"},[o("el-button",{attrs:{type:"warning",icon:"el-icon-document",size:l.btnsize},on:{click:function(e){l.resetForm("formModel")}}},[l._v("全部重置为默认值")])],1)],1)],1),l._v(" "),o("div",{staticClass:"print_main",on:{click:l.clickPanel}},[o("div",{staticClass:"print_main_head"},[o("b",[l._v("预览展示:")]),l._v(" "),o("span",[l._v(" 纸张(宽×高)："+l._s(this.formModel.paper.width+"(mm) × "+this.formModel.paper.height+"(mm)"))]),l._v(" "),o("div",{staticClass:"print_main_head_btns"},[o("label",{attrs:{for:""}},[l._v("默认打印机：")]),l._v(" "),o("el-select",{attrs:{size:"mini"},model:{value:l.formPrint.printSetting.label,callback:function(e){l.$set(l.formPrint.printSetting,"label",e)},expression:"formPrint.printSetting.label"}},l._l(l.printers,function(e){return o("el-option",{key:e,attrs:{value:e,label:e}})})),l._v(" "),o("el-button",{attrs:{icon:"el-icon-printer",size:"mini",title:"打印测试"},on:{click:function(e){l.print("test")}}}),l._v(" "),o("el-button",{attrs:{icon:"el-icon-view",size:"mini",title:"打印预览"},on:{click:function(e){l.print("preview")}}})],1)]),l._v(" "),o("div",{key:l.viewKey,staticClass:"print_main_content",style:l.printPreviewContent,on:{drop:function(e){l.drop(e)},dragover:function(e){l.allowDrop(e)}}},l._l(l.labelListView,function(i,a){return o("div",{key:a,staticClass:"previewBlock",class:{isActiveDrag:l.classItem[a]},style:{cursor:l.dragCursor,transform:"translate("+i.leftx+"px,"+i.topy+"px)",width:i.width/l.prxvalue+"px",height:i.height/l.prxvalue+"px",fontSize:i.fontsize+"pt",whiteSpace:"nowrap",fontWeight:i.bold?800:400,textAlign:l.alignmentValue[i.alignment]},attrs:{draggable:"true","data-fileName":i.filedValue,"data-index":i._index},on:{dragstart:function(e){return l.dragStart(e,i,a)},dragend:function(e){return l.dragEnd(e,i,a)},click:function(e){l.editDragItem(i,a,e)}}},[l.showDragTips[a]?o("div",{staticClass:"dragTips"},[l._v("\n          "+l._s("(x :"+Math.round(i.leftx*l.prxvalue)+" mm, y :"+Math.round(i.topy*l.prxvalue)+" mm)")+" "+l._s("(宽: "+i.width+" mm, 高: "+i.height+" mm)")+"\n          ")]):l._e(),l._v(" "),o("div",{staticClass:"dragSizeControler"},[o("span",[l._v(l._s("{ "+i.filedName+" }"))]),l._v(" "),o("div",{staticClass:"conrigth",on:{dragstart:function(e){e.preventDefault(),e.stopPropagation()},"!mousedown":function(e){return e.preventDefault(),e.stopPropagation(),t=e,l.conrigthStart(t,i,a,"right");var t}}}),l._v(" "),o("div",{staticClass:"conbottom",on:{"!dragstart":function(e){e.preventDefault(),e.stopPropagation()},"!mousedown":function(e){return e.preventDefault(),e.stopPropagation(),t=e,l.conrigthStart(t,i,a,"bottom");var t}}}),l._v(" "),o("div",{staticClass:"conbottomright",on:{"!dragstart":function(e){e.preventDefault(),e.stopPropagation()},"!mousedown":function(e){return e.preventDefault(),e.stopPropagation(),t=e,l.conrigthStart(t,i,a,"bottomright");var t}}})])])})),l._v(" "),l.classItem.length?o("div",{staticClass:"print_main_foot"},[o("br"),l._v(" 按↑ ↓ ← →移动编辑项，按ctrl+↑↓控制高度变化，按ctrl+←→控制宽度变化\n      "),o("br"),l._v("按tab键切换编辑项，shift+tab切换回上一个编辑项\n    ")]):l._e()])])},staticRenderFns:[]};t.a=a},RCWJ:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=i("oSqW"),l=i("HtfE"),o=i("VU/8")(a.a,l.a,null,null,null);t.default=o.exports},oSqW:function(e,t,i){"use strict";var a=i("woOf"),d=i.n(a),l=i("DAYN"),o=i.n(l),r=i("oagj"),h=i("0xDb"),n=i("Zjyc"),s=i("UQm2"),f=(i("i7Ou"),i("6ThG")),c="";t.a={components:{draggable:o.a,Upload:n.a},props:{popVisible:{type:Boolean,default:!1},formInfo:{type:[Object,Array],default:function(){}}},data:function(){return{tagSize:"mini",formPrint:{printSetting:{ship:""}},printRotate:{width:0,filedValue:"settingRotate"},printRotateRule:[{value:0,label:"还原"},{value:90,label:"逆时针90°"},{value:180,label:"旋转180°"}],cargoLabelList:[[],[],[]],cargoNum:1,maxCargo:3,printers:[],currentSearch:"",labelSelf:"",labelIndex:0,loading:!0,imageUrl:"",btnsize:"mini",bgprop:{scale:1,x:0,y:0},formModel:{labelList:[],paper:{width:0,height:0,leftx:0,topy:0}},defaultLabelWidth:150,defaultLabelHeight:30,defaultLabelFontSize:12,defaultPaperWidth:80,defaultPaperHeight:80,imgNameStr:"预览图片lyy,",prxvalue:.264,mm2px:3.779,maxLabel:3,maxLabelSelf:19,classItem:[],orgLabelList:[],labelListView:[],rules:{},viewKey:0,flags:!1,isDragView:!1,isMove:!1,showDragDetail:!1,showDragTips:[],isShowDragTips:!0,isHiddenDragDetail:!0,isDrag:null,dragDetailInfo:{},dragCursor:"move",alignmentValue:["","left","center","right"],alignmentOptions:[{value:1,label:"文字靠左"},{value:2,label:"文字居中"},{value:3,label:"文字靠右"}],dialogVisible:!1,commonLabelList:[],cargoKey:0,modelNameSelf:""}},watch:{imageUrl:{handler:function(e,t){console.log("图片",e,t)},deep:!0},formInfo:{handler:function(e,t){},deep:!0},popVisible:function(){this.popVisible?(this.dialogVisible=!0,this.loading=!0,this.init(),this.bindKey()):(this.dialogVisible=!1,this.unbindKey())}},computed:{printPreviewContent:function(){var e=300,t=150,i=this.imageUrl;return this.formModel&&(e=this.formModel.paper.width,t=this.formModel.paper.height),{width:e/this.prxvalue+"px",height:t/this.prxvalue+"px",backgroundImage:"url("+i+")",backgroundRepeat:"no-repeat",backgroundSize:100*this.bgprop.scale+"% auto",backgroundPosition:this.bgprop.x+"px "+this.bgprop.y+"px"}},printPreviewPaper:function(){},isActiveDrag:function(){return{}}},mounted:function(){},destroyed:function(){this.unbindKey(),this.closeMe()},methods:{changePrintRotate:function(e){this.printRotate.width=e,console.log(e,this.printRotate)},showCargoPlus:function(){var a=this;console.log("cargoNum",this.cargoNum),this.cargoNum<this.maxCargo?(this.cargoNum=this.cargoNum+1,this.cargoLabelList[this.cargoNum-1].forEach(function(i){a.formModel.labelList.forEach(function(e,t){i.filedValue===e.filedValue&&(i.showCargo=!0,a.$set(a.formModel.labelList,t,i))})}),this.cargoKey=(new Date).getTime()):this.$message({type:"warning",message:"最多添加"+this.maxCargo+"套货物信息"})},init:function(){this.cargoNum=this.$options.data().cargoNum,this.cargoKey=(new Date).getTime(),this.currentSearch="",this.initPrinter(),this.formPrint=Object(h.objectMerge2)({},this.formInfo),this.getCommonSettingLib()},print:function(e){var t=this,i=Object(h.objectMerge2)([],this.labelListView);i.push(Object(h.objectMerge2)({},this.formModel.paper)),i.push(Object(h.objectMerge2)({},this.printRotate)),i.forEach(function(e){e.width=Math.round(e.width/t.prxvalue),e.height=Math.round(e.height/t.prxvalue),e.isshow=e.isshow?1:0,e.bold=e.bold?2:1,e.isshow=e.isshow?1:0,e.value=e.filedName,"setting"===e.filedValue&&(e.bold=0,e.fontsize=null,e.alignment=null,e.value="")}),Object(s.a)({orderdata:i,number:1,printer:this.formPrint.printSetting.label,printSetup:i,type:"order",preview:"preview"===e,mock:!0})},initPrinter:function(){for(var e in this.printers=d()([],Object(s.b)()),this.printers)this.printers[e]=this.printers[e].replace(/%^/g,"\\")},clearImgUrl:function(){this.imageUrl=""},querySearch:function(t,e){this.currentSearch=t;var i=Object(h.objectMerge2)([],this.orgLabelList),a=t?i.filter(function(e){return-1!==e.filedName.indexOf(t)}):i;this.formModel.labelList=Object(h.objectMerge2)([],a),e(a)},handleSelect:function(e){console.log("handleSelect item",e)},bindKey:function(){document.addEventListener("mousemove",this.conrightMove,!0),document.addEventListener("mouseup",this.conrightEnd,!0),document.addEventListener("keyup",this.deleteEditIndex,!0),document.addEventListener("keydown",this.controlEditIndex,!0)},unbindKey:function(){document.removeEventListener("mousemove",this.conrightMove),document.removeEventListener("mouseup",this.conrightEnd),document.removeEventListener("keyup",this.deleteEditIndex),document.removeEventListener("keydown",this.controlEditIndex)},startSetBg:function(e){var t=this;clearInterval(this.bgtimer),this.bgtimer=setInterval(function(){t.setBg(e)},100)},stopSetBg:function(e){clearInterval(this.bgtimer)},setBg:function(e){var t=this.bgprop.scale;switch(e){case"zoomOut":t=2<(t+=.05)?2:t,this.bgprop.scale=t;break;case"zoomIn":t=(t-=.05)<.5?.5:t,this.bgprop.scale=t;break;case"moveLeft":this.bgprop.x-=1;break;case"moveRight":this.bgprop.x+=1;break;case"moveUp":this.bgprop.y-=1;break;case"moveDown":this.bgprop.y+=1;break;case"reset":this.bgprop={scale:1,x:0,y:0}}},conrigthStart:function(e,t,i,a){this.isHiddenDragDetail=!1,t.x=e.pageX,t.y=e.pageY,t.orgwidth=Math.round(t.width/this.prxvalue),t.orgheight=Math.round(t.height/this.prxvalue),t.mousetype=a,this.isDrag=t},conrightMove:function(e){if(this.isDrag){var t=this.isDrag,i=t.mousetype,a=e.pageX-t.x,l=e.pageY-t.y;this.calcWH(t,a,l,i)}},calcWH:function(e,t,i,a){var l=e.orgwidth,o=e.orgheight;"right"!==a&&"bottomright"!==a||(l+=t),"bottom"!==a&&"bottomright"!==a||(o+=i),l=l<15?15:1e3<l?1e3:l,o=o<20?20:1e3<o?1e3:o,e.width=Math.round(l*this.prxvalue),e.height=Math.round(o*this.prxvalue)},conrightEnd:function(e){if(this.isDrag){var t=this.isDrag;t.x=e.pageX,t.y=e.pageY,this.isDrag=null}},addItemDrag:function(i,e){var a=this,t=this.labelListView.filter(function(e){return e.filedValue===i.filedValue}).length;"customFields"===i.filedValue&&(i.topy=0,i.leftx=0,i.filedName=this.labelSelf,setTimeout(function(){a.labelSelf=""},300));var l=function(){i.isshow=!0,i.fontsize=a.defaultLabelFontSize,a.formModel.labelList.forEach(function(e,t){i.filedValue===e.filedValue&&a.$set(a.formModel.labelList,t,i)}),console.log("row::::",i);var e=Object(h.objectMerge2)({},i);e._index=++a.labelIndex,e.width=Math.round(a.defaultLabelWidth*a.prxvalue),e.height=Math.round(a.defaultLabelHeight*a.prxvalue),e.fontsize=a.defaultLabelFontSize,e.bold=0,e.alignment=1,a.labelListView.push(Object(h.objectMerge2)({},e)),a.orgLabelList.forEach(function(e,t){e.filedValue===i.filedValue&&a.$set(a.orgLabelList,t,Object(h.objectMerge2)({},i))}),a.editDragItem(e,a.labelListView.length-1)};"customFields"===i.filedValue&&t<this.maxLabelSelf?l():t<this.maxLabel?l():this.$notify.info({title:"消息",message:"【 "+i.filedName+" 】最多添加"+("customFields"===i.filedValue?this.maxLabelSelf:this.maxLabel)+"次"})},clickPanel:function(e){var i=0;e.path.forEach(function(e,t){e.className&&-1!==e.className.indexOf("previewBlock")&&(i+=1)}),i||(this.dragDetailInfo={},this.classItem=[],this.showDragTips=[],this.showDragDetail=!1,this.isHiddenDragDetail=!0),i=0},editDragItem:function(e,t,i){this.dragDetailInfo={},this.dragDetailInfo=d()({},e),console.log("编辑显示项:",this.dragDetailInfo,t),this.classItem=[],this.showDragTips=[],this.classItem[t]&&i&&this.isHiddenDragDetail?(this.showDragDetail=!1,this.isHiddenDragDetail=!1):(this.isHiddenDragDetail=!0,this.classItem[t]=!0,this.showDragDetail=!0),this.showDragTips[t]=!0},changeDragDetailInfo:function(e){var i=this;e&&(this.labelListView.forEach(function(e,t){e._index===i.dragDetailInfo._index&&i.$set(i.labelListView,t,i.dragDetailInfo)}),this.formModel.labelList.forEach(function(e,t){e.filedValue===i.dragDetailInfo.filedValue&&i.$set(i.formModel.labelList,t,i.dragDetailInfo),"setting"===e.filedValue&&(i.$set(i.formModel.labelList,t,i.formModel.paper),console.log("this.formModel.paper:",i.formModel.paper))}))},review:function(){this.showDragDetail=!1,this.viewKey=(new Date).getTime(),this.formModel.labelList=[],this.orgLabelList=[],this.labelListView=[],this.cargoNum=this.$options.data().cargoNum,this.cargoKey=(new Date).getTime(),this.currentSearch="",this.initPrinter(),this.getCommonSettingLib(),this.dragDetailInfo={},this.isDrag=null},dragStart:function(i,e,t){if(this.showDragTips[t]=!0,this.isDrag)return console.log("dragStart"),!1;this.isDragView=!0;(c=i.currentTarget).getAttribute("data-fileName");var a=Number(c.getAttribute("data-index"));this.isMove=!0,this.labelListView.forEach(function(e,t){e._index===a&&(e.x=i.pageX,e.y=i.pageY)})},dragEnd:function(t,e,i){if(this.isDrag)return console.log("dragEnd"),!1;console.log(this.showDragTips[i]),this.isDragView=!0;(c=t.currentTarget).getAttribute("data-fileName");var a=Number(c.getAttribute("data-index"));this.isMove=!0,this.labelListView.forEach(function(e){e._index===a&&(e.leftx+=t.pageX-e.x,e.topy+=t.pageY-e.y)}),this.findOutPage(e,i),this.dragCursor="move",this.showDragTips=[]},findOutPage:function(e,t){console.log(e.leftx,e.width),Math.round(e.leftx*this.prxvalue)+e.width<0||Math.round(e.topy*this.prxvalue)+e.height<0||e.leftx>Math.round(this.formModel.paper.width/this.prxvalue)||e.topy>Math.round(this.formModel.paper.height/this.prxvalue)?(this.dragCursor="not-allowed",this.deleteItemByIndex(e,t)):this.editDragItem(e,t)},deleteItemByIndex:function(i,a){var l=this;i.isshow=!1,this.dragDetailInfo={},this.classItem=[],this.showDragTips=[],this.showDragDetail=!1,this.labelListView=Object(h.objectMerge2)([],this.labelListView).filter(function(e,t){return t!==a});var e=this.labelListView.filter(function(e){return e.filedValue===i.filedValue}).length;console.log("删除的"+i.filedValue+"还有"+e+"个"),0===e&&(this.formModel.labelList.forEach(function(e,t){e.filedValue===i.filedValue&&(l.$set(e,"isshow",!1),console.log("labelList上的row",e.filedValue,e.isshow))}),this.orgLabelList=Object(h.objectMerge2)([],this.formModel.labelList))},handleKeyEvent:function(e,t,i){var a=this,l=r.a.getPressedKey(e),o=event.target.tagName||event.srcElement.tagName;if("INPUT"!==o&&"SELECT"!==o&&"TEXTAREA"!==o&&-1!==t.indexOf(l)&&this.dragDetailInfo.filedValue){var n={};this.labelListView.filter(function(e,t){return a.dragDetailInfo._index===e._index&&(n.el=e,n.index=t,!0)}),n.el&&i(n,l,e)}},deleteEditIndex:function(e){var i=this;this.handleKeyEvent(e,["delete","backspace"],function(e,t){i.deleteItemByIndex(e.el,e.index)})},controlEditIndex:function(e){var o=this;this.handleKeyEvent(e,["tab","shift+tab"],function(e,t,i){i.preventDefault();var a=e.index;"tab"===t?a++:a--,a=a>=o.labelListView.length?0:a<0?o.labelListView.length-1:a,o.editDragItem(o.labelListView[a],a,i)}),this.handleKeyEvent(e,["ctrl+up","ctrl+down","ctrl+left","ctrl+right"],function(e,t,i){i.preventDefault();var a=/(up|down)/.test(t)?"height":"width",l=e.el[a];switch(t){case"ctrl+up":case"ctrl+left":l-=1;break;case"ctrl+down":case"ctrl+right":l+=1}l=l<5?5:l>o.formModel.paper.width?o.formModel.paper.width:l,e.el[a]=l}),this.handleKeyEvent(e,["up","down","left","right"],function(e,t){var i=/(up|down)/.test(t)?"topy":"leftx",a=e.el[i],l=0;switch(l=Math.round(a/o.mm2px)*o.mm2px,t){case"up":case"left":l-=o.mm2px;break;case"down":case"right":l+=o.mm2px}e.el[i]=l})},drag:function(e){this.isDragView=!1,this.isMove=!1,c=e.currentTarget},drop:function(t){var i=this;t.preventDefault(),console.log(t.offsetX,t.offsetY,t);var a=c.getAttribute("data-fileName");this.isMove||this.orgLabelList.filter(function(e){e.filedValue!==a||i.isDragView||(e.leftx=t.offsetX,e.topy=t.offsetY,i.addItemDrag(e))})},allowDrop:function(e){e.preventDefault()},sortLabel:function(e,l){return e.sort(function(e,t){var i=e[l],a=t[l];return i.length-a.length})},getCommonSettingLib:function(){var a=this;this.loading=!0,this.commonLabelList=[],Object(f.a)().then(function(e){e&&(Object(h.objectMerge2)([],e).forEach(function(e,t){var i={id:e.id,filedValue:e.fieldValue,filedName:e.fieldName,topy:0,leftx:0,width:0,height:0,companyid:a.otherinfo.companyId,isshow:0,fontsize:10,alignment:1,bold:0,type:e.type};"horizontalLine"===i.filedValue||"verticalLine"===i.filedValue?console.log(i.filedName):a.commonLabelList.push(i)}),a.sortLabel(a.commonLabelList,"filedName"),a.$nextTick(function(){a.getSettingCompanyLi()}))}).catch(function(e){a.loading=!1,a._handlerCatchMsg(e)})},getSettingCompanyLi:function(){var r=this;this.loading=!0,this.labelListView=[],this.orgLabelList=[],this.viewKey=(new Date).getTime();var s=!1,c=!1;Object(f.d)().then(function(a){var l=d()([],a||[]),o=[],n=Object(h.objectMerge2)([],r.commonLabelList);l.forEach(function(i){n.forEach(function(e,t){e.filedValue===i.filedValue&&(i.isshow||"setting"===e.filedValue||"settingRotate"===e.filedValue||(i.width=r.defaultLabelWidth,i.height=r.defaultLabelHeight),"setting"===e.filedValue&&(console.log("纸张设置",r.formModel.labelList[t],i),r.$set(r.formModel.labelList,t,i),r.formModel.labelList[t]=i),r.$set(i,"type",e.type),4===i.type&&("2"===i.filedName.slice(-1)&&(s=!0,r.cargoNum=2),"3"===i.filedName.slice(-1)&&(c=!0,r.cargoNum=3)),n.splice(t,1),o.push(i))})}),console.log("相同字段",o.length,o),console.log("差异字段",n.length,n),r.formModel.labelList=Object(h.objectMerge2)([],o.concat(n)),r.formModel.labelList.forEach(function(t,e){if("settingRotate"===t.filedValue?t.width=Math.round((t.width?t.width:0)*r.prxvalue):(t.width=Math.round((t.width?t.width:r.defaultLabelWidth)*r.prxvalue),t.height=Math.round((t.height?t.height:r.defaultLabelHeight)*r.prxvalue)),"setting"===t.filedValue){var i=d()({},t);a||(i.width=r.defaultPaperWidth,i.height=r.defaultPaperHeight),i.leftx=Math.round(i.leftx*r.prxvalue),i.topy=Math.round(i.topy*r.prxvalue),r.formModel.paper=i}else"settingRotate"===t.filedValue?(console.log("sjkfiwjkeifjsid",t,t.width),r.printRotate=d()({},t)):(l.forEach(function(e){e.filedValue===t.filedValue&&(e.isshow?(e.width=Math.round((e.width?e.width:r.defaultLabelWidth)*r.prxvalue),e.height=Math.round((e.height?e.height:r.defaultLabelHeight)*r.prxvalue),e.fontsize=e.fontsize?e.fontsize:10,e.isshow=1===e.isshow,e.bold=2===e.bold,e.alignment=e.alignment||1,e._index=++r.labelIndex,r.labelListView.push(e)):-1!==e.filedName.indexOf(r.imgNameStr)&&(r.imageUrl=e.filedName.split(",")[1]))}),t.fontsize=t.fontsize?t.fontsize:10,t.isshow=1===t.isshow,t.bold=2===t.bold,t.alignment=t.alignment||1);if(4===t.type)switch(t.showCargo=!1,t.filedName.slice(-1)){case"2":s&&(t.showCargo=!0),r.cargoLabelList[1].push(t);break;case"3":c&&(t.showCargo=!0),r.cargoLabelList[2].push(t);break;default:t.showCargo=!0,r.cargoLabelList[0].push(t)}6===t.type&&(r.modelNameSelf=t.filedName)}),r.orgLabelList=Object(h.objectMerge2)([],r.formModel.labelList),console.log("相同+差异",r.formModel.labelList),r.loading=!1}).catch(function(e){r.loading=!1,r._handlerCatchMsg(e)})},closeMe:function(e){this.$emit("close"),"function"==typeof e&&e()},checkNull:function(e){return null!=e&&""!==e&&void 0},resetForm:function(e){var i=this;this.$refs[e].validate(function(e){e&&i.$confirm("此操作将所有设置重置为0,是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){i.formModel.labelList.forEach(function(e,t){"setting"!==e.filedValue&&(e.topy=0,e.leftx=0,e.isshow=0,e.width=Math.round(i.defaultLabelWidth*i.prxvalue),e.height=Math.round(i.defaultLabelHeight*i.prxvalue),e.fontsize=10,e.bold=0,e.alignment=1)}),i.formModel.paper.width=i.defaultPaperWidth,i.formModel.paper.height=i.defaultPaperHeight,i.formModel.paper.topy=0,i.formModel.paper.leftx=0,i.labelListView=[],i.currentSearch="",i.showDragDetail=!1,console.log("cargoNum",i.cargoNum)}).catch(function(e){})})},canDragStart:function(e){},handleSwitch:function(e){var i=this,a=0;this.labelListView.forEach(function(e,t){e._index===i.dragDetailInfo._index&&i.labelListView.splice(t,1),e.filedValue===i.dragDetailInfo.filedValue&&(a+=1)}),console.log("len",a),1===a&&(this.formModel.labelList.forEach(function(e,t){e.filedValue===i.dragDetailInfo.filedValue&&i.$set(i.formModel.labelList[t],"isshow",!1)}),this.orgLabelList=Object(h.objectMerge2)([],this.formModel.labelList)),this.$nextTick(function(){i.showDragDetail=!1})},changeValue:function(e,t,i){this.viewKey=(new Date).getTime()},savePrinter:function(){var e=this;this.formInfo.printSetting.label!==this.formPrint.printSetting.label&&this.$confirm("默认打印机已修改，是否需要保存?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){e.$emit("success",{label:e.formPrint.printSetting.label})}).catch(function(){})},submitForm:function(e){var o=this;this.$refs[e].validate(function(e){if(e){o.savePrinter(),o.loading=!0,o.showDragDetail=!1;var i=Object(h.objectMerge2)([],o.labelListView),a={},l={};i.push(Object(h.objectMerge2)({},o.formModel.paper)),o.formModel.labelList.forEach(function(e){if("customFields"===e.filedValue&&o.imageUrl&&((a=Object(h.objectMerge2)({},e)).filedName=o.imgNameStr+o.imageUrl,a.isshow=!1,console.log(" 提交的时候 imageUrl1",o.imageUrl,a)),6===e.type&&((l=Object(h.objectMerge2)({},e)).filedName=o.modelNameSelf+"",l.isshow=!1,i.push(l)),"settingRotate"===e.filedValue){var t=Object(h.objectMerge2)({},e);t.width=o.printRotate.width,t.isshow=!1,i.push(t),console.log("rotate",t,o.printRotate)}}),o.imageUrl&&i.push(a),i=Object(h.objectMerge2)([],i).filter(function(e){var t=function(){e.width=Math.round(e.width/o.prxvalue),e.height=Math.round(e.height/o.prxvalue),e.isshow=e.isshow?1:0,e.bold=e.bold?2:1,"setting"===e.filedValue&&(console.log("this.formModel.paper::",o.formModel.paper,e),e.leftx=Math.round(o.formModel.paper.leftx/o.prxvalue),e.topy=Math.round(o.formModel.paper.topy/o.prxvalue))};return"setting"!==e.filedValue&&"modelName"!==e.filedValue&&"settingRotate"!==e.filedValue?!(Math.round(e.leftx*o.prxvalue)+e.width<0||Math.round(e.topy*o.prxvalue)+e.height<0||e.leftx>Math.round(o.formModel.paper.width/o.prxvalue)||e.topy>Math.round(o.formModel.paper.height/o.prxvalue))&&(t(),!0):(t(),!0)}),console.log(" 提交的时候 arr",i),Object(f.g)(i).then(function(e){o.loading=!1,o.$message({type:"success",message:"标签打印设置成功！"}),o.getCommonSettingLib(),o.viewKey=(new Date).getTime()}).catch(function(e){o.loading=!1,o._handlerCatchMsg(e)})}})}}}}});