webpackJsonp([308],{EvzS:function(e,t,i){"use strict";var a={render:function(){var n=this,e=n.$createElement,o=n._self._c||e;return o("el-dialog",{staticClass:"tms_dialog_print_drag",attrs:{title:"打印运单设置 (单位:毫米mm)",visible:n.dialogVisible,fullscreen:"","before-close":n.closeMe},on:{"update:visible":function(e){n.dialogVisible=e}}},[o("div",{key:n.viewKey,staticClass:"print_aside"},[o("div",{staticClass:"print_aside_head"},[o("span",[o("i",{staticClass:"el-icon-menu"}),n._v(" 字段列表 "+n._s(n.formModel.labelList.length)+" ")]),n._v(" "),o("el-popover",{staticStyle:{float:"right","margin-top":"0px","margin-left":"10px"},attrs:{placement:"right",width:"400",trigger:"hover"}},[o("span",[n._v("可将信息项手动拖拽到右边纸张中显示及设置位置和宽高；"),o("br"),n._v("(单位：毫米mm)")]),n._v(" "),o("i",{staticClass:"el-icon-warning",attrs:{slot:"reference"},slot:"reference"})]),n._v(" "),o("el-button",{staticStyle:{float:"right","margin-top":"10px"},attrs:{type:"success",icon:"el-icon-document",size:n.btnsize},on:{click:function(e){n.submitForm("formModel")}}},[n._v("保存")]),n._v(" "),o("el-button",{staticStyle:{float:"right","margin-top":"10px","margin-right":"10px"},attrs:{icon:"el-icon-refresh",size:n.btnsize},on:{click:n.review}},[n._v("刷新")])],1),n._v(" "),o("el-form",{ref:"formModel",attrs:{model:n.formModel,rules:n.rules,"label-width":"0px"}},[o("ul",{staticClass:"print_aside_content"},[o("transition-group",n._l(n.formModel.labelList,function(t,i){return"setting"!==t.fieldValue?o("li",{key:i,attrs:{draggable:"true","data-fileName":t.filedValue},on:{dragstart:function(e){n.drag(e)},click:function(e){n.addItemDrag(t,i)}}},[t.isshow?o("i",{staticClass:"el-icon-circle-check showLabel"}):n._e(),n._v(" "),o("b",[n._v(n._s(t.filedName))])]):n._e()}))],1),n._v(" "),o("div",{staticClass:"prinit_aside_paper"},[o("span",[o("i",{staticClass:"el-icon-document"}),n._v(" 纸张设置")]),n._v(" "),o("br"),n._v(" "),o("el-form-item",[o("el-input",{directives:[{name:"number-only",rawName:"v-number-only:point",arg:"point"}],attrs:{placeholder:"请输入内容",size:"mini"},on:{change:n.changeDragDetailInfo},model:{value:n.formModel.paper.width,callback:function(e){n.$set(n.formModel.paper,"width",e)},expression:"formModel.paper.width"}},[o("template",{slot:"prepend"},[n._v("宽")]),n._v(" "),o("template",{slot:"append"},[n._v("mm")])],2)],1),n._v(" "),o("el-form-item",[o("el-input",{directives:[{name:"number-only",rawName:"v-number-only:point",arg:"point"}],attrs:{placeholder:"请输入内容",size:"mini"},on:{change:n.changeDragDetailInfo},model:{value:n.formModel.paper.height,callback:function(e){n.$set(n.formModel.paper,"height",e)},expression:"formModel.paper.height"}},[o("template",{slot:"prepend"},[n._v("高")]),n._v(" "),o("template",{slot:"append"},[n._v("mm")])],2)],1),n._v(" "),o("el-form-item",[o("el-input",{attrs:{placeholder:"请输入内容",size:"mini"},on:{change:n.changeDragDetailInfo},model:{value:n.formModel.paper.leftx,callback:function(e){n.$set(n.formModel.paper,"leftx",e)},expression:"formModel.paper.leftx"}},[o("template",{slot:"prepend"},[n._v("左偏移")]),n._v(" "),o("template",{slot:"append"},[n._v("mm")])],2)],1),n._v(" "),o("el-form-item",[o("el-input",{attrs:{placeholder:"请输入内容",size:"mini"},on:{change:n.changeDragDetailInfo},model:{value:n.formModel.paper.topy,callback:function(e){n.$set(n.formModel.paper,"topy",e)},expression:"formModel.paper.topy"}},[o("template",{slot:"prepend"},[n._v("上偏移")]),n._v(" "),o("template",{slot:"append"},[n._v("mm")])],2)],1)],1),n._v(" "),o("el-collapse-transition",[n.showDragDetail?o("div",[o("div",{staticClass:"prinit_aside_detail"},[o("span",[o("i",{staticClass:"el-icon-setting"}),n._v(" "+n._s(n.dragDetailInfo.filedName))]),n._v(" "),o("span",[n._v(n._s(" ("+n.dragDetailInfo.leftx+", "+n.dragDetailInfo.topy+")"))]),n._v(" "),o("br"),n._v(" "),o("el-form-item",[o("el-input",{directives:[{name:"number-only",rawName:"v-number-only:point",arg:"point"}],attrs:{placeholder:"请输入内容",size:"mini"},on:{change:n.changeDragDetailInfo},model:{value:n.dragDetailInfo.width,callback:function(e){n.$set(n.dragDetailInfo,"width",e)},expression:"dragDetailInfo.width"}},[o("template",{slot:"prepend"},[n._v("宽")]),n._v(" "),o("template",{slot:"append"},[n._v("mm")])],2)],1),n._v(" "),o("el-form-item",[o("el-input",{directives:[{name:"number-only",rawName:"v-number-only:point",arg:"point"}],attrs:{placeholder:"请输入内容",size:"mini"},on:{change:n.changeDragDetailInfo},model:{value:n.dragDetailInfo.height,callback:function(e){n.$set(n.dragDetailInfo,"height",e)},expression:"dragDetailInfo.height"}},[o("template",{slot:"prepend"},[n._v("高")]),n._v(" "),o("template",{slot:"append"},[n._v("mm")])],2)],1),n._v(" "),o("el-form-item",[o("el-input",{directives:[{name:"numberOnly",rawName:"v-numberOnly"}],attrs:{placeholder:"请输入内容",size:"mini"},on:{change:n.changeDragDetailInfo},model:{value:n.dragDetailInfo.fontsize,callback:function(e){n.$set(n.dragDetailInfo,"fontsize",e)},expression:"dragDetailInfo.fontsize"}},[o("template",{slot:"prepend"},[n._v("字号")])],2)],1),n._v(" "),o("el-form-item",[o("el-checkbox",{attrs:{label:"加粗",border:"",size:"mini"},on:{change:n.changeDragDetailInfo},model:{value:n.dragDetailInfo.bold,callback:function(e){n.$set(n.dragDetailInfo,"bold",e)},expression:"dragDetailInfo.bold"}}),n._v(" "),o("el-switch",{attrs:{"active-color":"#67c23a","active-text":n.dragDetailInfo.isshow?"显示":"隐藏"},on:{change:n.handleSwitch},model:{value:n.dragDetailInfo.isshow,callback:function(e){n.$set(n.dragDetailInfo,"isshow",e)},expression:"dragDetailInfo.isshow"}})],1),n._v(" "),o("el-form-item",{staticClass:"print_itemSet_col"},[o("el-radio-group",{attrs:{size:"mini"},on:{change:n.changeDragDetailInfo},model:{value:n.dragDetailInfo.alignment,callback:function(e){n.$set(n.dragDetailInfo,"alignment",e)},expression:"dragDetailInfo.alignment"}},n._l(n.alignmentOptions,function(e){return o("el-radio-button",{key:e.value,attrs:{label:e.value,border:""}},[n._v(n._s(e.label))])}))],1)],1)]):n._e()]),n._v(" "),o("div",{staticClass:"prinit_aside_setpreview"},[o("div",{staticClass:"prinit_aside_setpreview_head"},[o("span",[o("i",{staticClass:"el-icon-picture"}),n._v(" 打印背景图片效果预览")]),n._v(" "),n.imageUrl?o("el-button",{staticStyle:{float:"right","margin-right":"10px","margin-top":"10px"},attrs:{icon:"el-icon-delete",size:n.btnsize},on:{click:function(e){n.imageUrl=""}}},[n._v("清除背景")]):n._e()],1),n._v(" "),o("el-upload",{attrs:{drag:"","show-file-list":!1,"on-change":n.handleChange,action:"","http-request":n.uploadHandleFile}},[o("i",{staticClass:"el-icon-upload"}),n._v(" "),o("div",{staticClass:"el-upload__text"},[n._v("将文件拖到此处，或"),o("em",[n._v("点击上传")])])]),n._v(" "),n.imageUrl?o("div",{staticClass:"prinit_aside_setpreview_foot"},[o("el-button",{attrs:{size:"mini",type:"primary",title:"放大",icon:"el-icon-circle-plus-outline"},on:{click:function(e){n.setBg("zoomOut")}}}),n._v(" "),o("el-button",{attrs:{size:"mini",type:"primary",title:"缩小",icon:"el-icon-remove-outline"},on:{click:function(e){n.setBg("zoomIn")}}}),n._v(" "),o("el-button",{attrs:{size:"mini",type:"primary",title:"向左移动",icon:"el-icon-caret-left"},nativeOn:{mouseup:function(e){return n.stopSetBg(e)},mousedown:function(e){n.startSetBg("moveLeft")}}}),n._v(" "),o("el-button",{attrs:{size:"mini",type:"primary",title:"向右移动",icon:"el-icon-caret-right"},nativeOn:{mouseup:function(e){return n.stopSetBg(e)},mousedown:function(e){n.startSetBg("moveRight")}}}),n._v(" "),o("el-button",{attrs:{size:"mini",type:"primary",title:"向上移动",icon:"el-icon-caret-top"},nativeOn:{mouseup:function(e){return n.stopSetBg(e)},mousedown:function(e){n.startSetBg("moveUp")}}}),n._v(" "),o("el-button",{attrs:{size:"mini",type:"primary",title:"向下移动",icon:"el-icon-caret-bottom"},nativeOn:{mouseup:function(e){return n.stopSetBg(e)},mousedown:function(e){n.startSetBg("moveDown")}}}),n._v(" "),o("el-button",{attrs:{size:"mini",type:"primary",title:"重置",icon:"el-icon-refresh"},on:{click:function(e){n.setBg("reset")}}})],1):n._e()],1),n._v(" "),o("div",{staticClass:"prinit_aside_info"},[o("el-button",{attrs:{type:"warning",icon:"el-icon-document",size:n.btnsize},on:{click:function(e){n.resetForm("formModel")}}},[n._v("全部重置为默认值")])],1)],1)],1),n._v(" "),o("div",{staticClass:"print_main"},[o("div",{staticClass:"print_main_head"},[o("b",[n._v("预览展示:")]),o("span",[n._v(" 纸张大小(宽×高)："+n._s(this.formModel.paper.width+" (毫米mm) × "+this.formModel.paper.height+" (毫米mm)"))])]),n._v(" "),o("div",{key:n.viewKey,staticClass:"print_main_content",style:n.printPreviewContent,on:{drop:function(e){n.drop(e)},dragover:function(e){n.allowDrop(e)}}},n._l(n.labelListView,function(i,a){return o("div",{key:a,staticClass:"previewBlock",class:{isActiveDrag:n.classItem[a]},style:{cursor:n.dragCursor,transform:"translate("+i.leftx+"px,"+i.topy+"px)",width:i.width/n.prxvalue+"px",height:i.height/n.prxvalue+"px",lineHeight:i.height/n.prxvalue-3+"px",fontSize:i.fontsize+"pt",whiteSpace:"nowrap",fontWeight:i.bold?800:400,textAlign:n.alignmentValue[i.alignment]},attrs:{draggable:"true","data-fileName":i.filedValue},on:{dragstart:function(e){return n.dragStart(e,i,a)},dragend:function(e){return n.dragEnd(e,i,a)},click:function(e){n.editDragItem(i,a,e)}}},[n.showDragTips[a]?o("div",{staticClass:"dragTips"},[n._v("\n          "+n._s("(x :"+Math.round(i.leftx*n.prxvalue)+" mm, y :"+Math.round(i.topy*n.prxvalue)+" mm)")+" "+n._s("(宽: "+i.width+" mm, 高: "+i.height+" mm)")+"\n        ")]):n._e(),n._v(" "),o("div",{staticClass:"dragSizeControler"},[o("span",[n._v(n._s("{ "+i.filedName+" }"))]),n._v(" "),o("div",{staticClass:"conrigth",on:{dragstart:function(e){e.preventDefault(),e.stopPropagation()},"!mousedown":function(e){return e.preventDefault(),e.stopPropagation(),t=e,n.conrigthStart(t,i,a,"right");var t}}}),n._v(" "),o("div",{staticClass:"conbottom",on:{"!dragstart":function(e){e.preventDefault(),e.stopPropagation()},"!mousedown":function(e){return e.preventDefault(),e.stopPropagation(),t=e,n.conrigthStart(t,i,a,"bottom");var t}}}),n._v(" "),o("div",{staticClass:"conbottomright",on:{"!dragstart":function(e){e.preventDefault(),e.stopPropagation()},"!mousedown":function(e){return e.preventDefault(),e.stopPropagation(),t=e,n.conrigthStart(t,i,a,"bottomright");var t}}})])])})),n._v(" "),n.classItem.length?o("div",{staticClass:"print_main_foot"},[o("br"),n._v(" 按↑ ↓ ← →移动编辑项，按ctrl+↑↓控制高度变化，按ctrl+←→控制宽度变化\n      "),o("br"),n._v("按tab键切换编辑项，shift+tab切换回上一个编辑项\n    ")]):n._e()])])},staticRenderFns:[]};t.a=a},SAxw:function(e,t,i){"use strict";var a=i("woOf"),l=i.n(a),n=i("DAYN"),o=i.n(n),r=i("oagj"),s=i("0xDb"),c=i("6ThG"),d="";t.a={components:{draggable:o.a},props:{popVisible:{type:Boolean,default:!1}},data:function(){return{imageUrl:"",btnsize:"mini",bgprop:{scale:1,x:0,y:0},formModel:{labelList:[],paper:{width:0,height:0,leftx:0,topy:0}},prxvalue:.264,mm2px:3.779,classItem:[],orgLabelList:[],labelListView:[],rules:{},viewKey:0,flags:!1,isDragView:!1,isMove:!1,showDragDetail:!1,showDragTips:[],isShowDragTips:!0,isHiddenDragDetail:!0,isDrag:null,dragDetailInfo:{},dragCursor:"move",alignmentValue:["","left","center","right"],alignmentOptions:[{value:1,label:"文字靠左"},{value:2,label:"文字居中"},{value:3,label:"文字靠右"}],dialogVisible:!1}},watch:{popVisible:function(){this.popVisible?(this.dialogVisible=!0,this.getCommonSetting(),this.getSettingCompanyOrder(),this.bindKey()):(this.dialogVisible=!1,this.unbindKey())}},computed:{printPreviewContent:function(){var t=300,i=150,e=this.imageUrl;return this.formModel&&this.formModel.labelList.forEach(function(e){"setting"===e.filedValue&&(t=e.width,i=e.height)}),{width:t/this.prxvalue+"px",height:i/this.prxvalue+"px",backgroundImage:"url("+e+")",backgroundRepeat:"no-repeat",backgroundSize:100*this.bgprop.scale+"% auto",backgroundPosition:this.bgprop.x+"px "+this.bgprop.y+"px"}},printPreviewPaper:function(){},isActiveDrag:function(){return{}}},mounted:function(){},destroyed:function(){this.unbindKey()},methods:{bindKey:function(){document.addEventListener("mousemove",this.conrightMove,!0),document.addEventListener("mouseup",this.conrightEnd,!0),document.addEventListener("keyup",this.deleteEditIndex,!0),document.addEventListener("keydown",this.controlEditIndex,!0)},unbindKey:function(){document.removeEventListener("mousemove",this.conrightMove),document.removeEventListener("mouseup",this.conrightEnd),document.removeEventListener("keyup",this.deleteEditIndex),document.removeEventListener("keydown",this.controlEditIndex)},handleChange:function(e,t){console.log("handleChange file:",e),console.log("handleChange list:",t);try{e.url=URL.createObjectURL(e.raw),this.imageUrl=e.url,this.setBg("reset")}catch(e){return void console.error("上传本地图片错误",e)}},uploadHandleFile:function(e){},startSetBg:function(e){var t=this;clearInterval(this.bgtimer),this.bgtimer=setInterval(function(){t.setBg(e)},100)},stopSetBg:function(e){clearInterval(this.bgtimer)},setBg:function(e){var t=this.bgprop.scale;switch(e){case"zoomOut":t=2<(t+=.05)?2:t,this.bgprop.scale=t;break;case"zoomIn":t=(t-=.05)<.5?.5:t,this.bgprop.scale=t;break;case"moveLeft":this.bgprop.x-=1;break;case"moveRight":this.bgprop.x+=1;break;case"moveUp":this.bgprop.y-=1;break;case"moveDown":this.bgprop.y+=1;break;case"reset":this.bgprop={scale:1,x:0,y:0}}},conrigthStart:function(e,t,i,a){this.isHiddenDragDetail=!1,t.x=e.pageX,t.y=e.pageY,t.orgwidth=Math.round(t.width/this.prxvalue),t.orgheight=Math.round(t.height/this.prxvalue),t.mousetype=a,this.isDrag=t},conrightMove:function(e){if(this.isDrag){var t=this.isDrag,i=t.mousetype,a=e.pageX-t.x,n=e.pageY-t.y;this.calcWH(t,a,n,i)}},calcWH:function(e,t,i,a){var n=e.orgwidth,o=e.orgheight;"right"!==a&&"bottomright"!==a||(n+=t),"bottom"!==a&&"bottomright"!==a||(o+=i),n=n<15?15:1e3<n?1e3:n,o=o<20?20:1e3<o?1e3:o,e.width=Math.round(n*this.prxvalue),e.height=Math.round(o*this.prxvalue)},conrightEnd:function(e){if(this.isDrag){var t=this.isDrag;t.x=e.pageX,t.y=e.pageY,this.isDrag=null}},addItemDrag:function(t,e){if(t.isshow)this.$notify.info({title:"消息",message:"【 "+t.filedName+" 】已设置显示打印"});else{console.log("row::::",t);var i=this.orgLabelList.filter(function(e){if(e.filedValue===t.filedValue)return e.leftx=event.offsetX,e.topy=event.offsetY,e.isshow=!0})[0];i.isshow=!0,t.isshow=!0,this.labelListView.push(i)}this.editDragItem(t,e)},editDragItem:function(e,t,i){this.dragDetailInfo={},this.dragDetailInfo=l()({},e),this.classItem=[],this.showDragTips=[],this.classItem[t]&&i&&this.isHiddenDragDetail?(this.showDragDetail=!1,this.isHiddenDragDetail=!1):(this.isHiddenDragDetail=!0,this.classItem[t]=!0,this.showDragDetail=!0),this.showDragTips[t]=!0},changeDragDetailInfo:function(e){var i=this;e&&(this.labelListView.forEach(function(e,t){e.filedValue===i.dragDetailInfo.filedValue&&i.$set(i.labelListView,t,i.dragDetailInfo)}),this.formModel.labelList.forEach(function(e,t){e.filedValue===i.dragDetailInfo.filedValue&&i.$set(i.formModel.labelList,t,i.dragDetailInfo),"setting"===e.filedValue&&(i.$set(i.formModel.labelList,t,i.formModel.paper),console.log("this.formModel.paper:",i.formModel.paper))}))},review:function(){this.viewKey=(new Date).getTime(),this.formModel.labelList=[],this.labelListView=[],this.getCommonSetting(),this.getSettingCompanyOrder(),this.showDragDetail=!1,this.dragDetailInfo={},this.isDrag=null},dragStart:function(i,e,t){if(this.showDragTips[t]=!0,this.isDrag)return console.log("dragStart"),!1;this.isDragView=!0;var a=(d=i.currentTarget).getAttribute("data-fileName");this.isMove=!0,this.labelListView.forEach(function(e,t){e.filedValue===a&&(e.x=i.pageX,e.y=i.pageY)})},dragEnd:function(t,e,i){if(this.isDrag)return console.log("dragEnd"),!1;console.log(this.showDragTips[i]),this.isDragView=!0;var a=(d=t.currentTarget).getAttribute("data-fileName");this.isMove=!0,this.labelListView.forEach(function(e){e.filedValue===a&&(e.leftx+=t.pageX-e.x,e.topy+=t.pageY-e.y)}),console.log(e.leftx,e.width),Math.round(e.leftx*this.prxvalue)+e.width<0||Math.round(e.topy*this.prxvalue)+e.height<0||e.leftx>Math.round(this.formModel.paper.width/this.prxvalue)||e.topy>Math.round(this.formModel.paper.height/this.prxvalue)?(this.dragCursor="not-allowed",this.deleteItemByIndex(e,i)):this.editDragItem(e,i),this.dragCursor="move",this.showDragTips=[]},deleteItemByIndex:function(e,i){e.isshow=!1,this.dragDetailInfo={},this.classItem=[],this.showDragTips=[],this.showDragDetail=!1,this.labelListView=this.labelListView.filter(function(e,t){return t!==i})},handleKeyEvent:function(e,t,i){var a=this,n=r.a.getPressedKey(e),o=event.target.tagName||event.srcElement.tagName;if("INPUT"!==o&&"SELECT"!==o&&"TEXTAREA"!==o&&-1!==t.indexOf(n)&&this.dragDetailInfo.filedValue){var l={};this.labelListView.filter(function(e,t){return a.dragDetailInfo.filedValue===e.filedValue&&(l.el=e,l.index=t,!0)}),l.el&&i(l,n,e)}},deleteEditIndex:function(e){var i=this;this.handleKeyEvent(e,["delete","backspace"],function(e,t){i.deleteItemByIndex(e.el,e.index)})},controlEditIndex:function(e){var o=this;this.handleKeyEvent(e,["tab","shift+tab"],function(e,t,i){i.preventDefault();var a=e.index;"tab"===t?a++:a--,a=a>=o.labelListView.length?0:a<0?o.labelListView.length-1:a,o.editDragItem(o.labelListView[a],a,i)}),this.handleKeyEvent(e,["ctrl+up","ctrl+down","ctrl+left","ctrl+right"],function(e,t,i){i.preventDefault();var a=/(up|down)/.test(t)?"height":"width",n=e.el[a];switch(t){case"ctrl+up":case"ctrl+left":n-=1;break;case"ctrl+down":case"ctrl+right":n+=1}n=n<5?5:n>o.formModel.paper.width?o.formModel.paper.width:n,e.el[a]=n}),this.handleKeyEvent(e,["up","down","left","right"],function(e,t){var i=/(up|down)/.test(t)?"topy":"leftx",a=e.el[i],n=0;switch(n=Math.round(a/o.mm2px)*o.mm2px,t){case"up":case"left":n-=o.mm2px;break;case"down":case"right":n+=o.mm2px}e.el[i]=n})},drag:function(e){this.isDragView=!1,this.isMove=!1,d=e.currentTarget},drop:function(t){t.preventDefault();var i=d.getAttribute("data-fileName"),e=!1;this.isMove||(e=!this.labelListView.filter(function(e){return e.filedValue===i}).length),e&&!this.isDragView&&this.labelListView.push(this.orgLabelList.filter(function(e){if(e.filedValue===i)return e.leftx=t.offsetX,e.topy=t.offsetY,e.isshow=!0})[0])},allowDrop:function(e){e.preventDefault()},getCommonSetting:function(){var i=this;Object(c.a)().then(function(e){e&&e.forEach(function(e,t){i.formModel.labelList.push({id:e.id,filedValue:e.fieldValue,filedName:e.fieldName,topy:0,leftx:0,width:152,height:27,companyId:i.otherinfo.companyId,isshow:0,fontsize:10,alignment:1,bold:0}),i.orgLabelList=Object(s.objectMerge2)([],i.formModel.labelList)})})},getSettingCompanyOrder:function(){var o=this;this.labelListView=[],this.viewKey=(new Date).getTime(),Object(c.e)().then(function(e){if(e){var t=l()([],e),a=[],n=Object(s.objectMerge2)([],o.formModel.labelList);t.forEach(function(i){if(i.width=Math.round((i.width?i.width:210)*o.prxvalue),i.height=Math.round((i.height?i.height:150)*o.prxvalue),"setting"===i.filedValue){var e=l()({},i);e.leftx=Math.round(e.leftx*o.prxvalue),e.topy=Math.round(e.topy*o.prxvalue),o.formModel.paper=e}else i.isshow&&o.labelListView.push(i),i.fontsize=i.fontsize?i.fontsize:10,i.isshow=1===i.isshow,i.bold=2===i.bold,i.alignment=i.alignment||1;n.forEach(function(e,t){e.filedValue===i.filedValue&&(console.log(e.filedValue,i.filedValue,!0),n.splice(t,1),a.push(e))}),a.length}),console.log("相同字段",a.length,a),console.log("差异字段",n.length,n)}})},closeMe:function(e){this.$emit("close"),"function"==typeof e&&e()},checkNull:function(e){return null!=e&&""!==e&&void 0},submitForm:function(e){var i=this;this.$refs[e].validate(function(e){if(e){var t=Object(s.objectMerge2)([],i.formModel.labelList);t.forEach(function(e){if(i.checkNull(e.topy)||i.checkNull(e.leftx)||i.checkNull(e.width)||i.checkNull(e.height))return i.$message({type:"warning",message:"不能为空"}),!1;e.width=Math.round(e.width/i.prxvalue),e.height=Math.round(e.height/i.prxvalue),"setting"===e.filedValue&&(console.log("this.formModel.paper::",i.formModel.paper,e),e.leftx=Math.round(i.formModel.paper.leftx/i.prxvalue),e.topy=Math.round(i.formModel.paper.topy/i.prxvalue)),e.isshow=e.isshow?1:0,e.bold=e.bold?1:0}),Object(c.g)(t).then(function(e){i.$message({type:"success",message:"运单打印设置成功！"}),i.getSettingCompanyOrder(),i.viewKey=(new Date).getTime()})}})},resetForm:function(e){var i=this;this.$refs[e].validate(function(e){e&&i.$confirm("此操作将所有设置重置为0,重置后不可恢复,是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){i.formModel.labelList.forEach(function(e,t){"setting"!==e.filedValue&&(e.topy=0,e.leftx=0,e.isshow=0,e.width=Math.round(150*i.prxvalue),e.height=Math.round(24*i.prxvalue),e.fontsize=10,e.bold=0,e.alignment=1)}),i.labelListView=[]}).catch(function(e){})})},canDragStart:function(e){},handleSwitch:function(e){var i=this;this.formModel.labelList.forEach(function(e,t){e.filedValue===i.dragDetailInfo.filedValue&&i.$set(i.formModel.labelList,t,i.dragDetailInfo)}),this.labelListView=this.labelListView.filter(function(e){return e.filedValue!==i.dragDetailInfo.filedValue}),this.$nextTick(function(){i.showDragDetail=!1})},changeValue:function(e,t,i){this.viewKey=(new Date).getTime()}}}},meby:function(e,t){},rxpl:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=i("SAxw"),n=i("EvzS");var o=function(e){i("meby")},l=i("VU/8")(a.a,n.a,o,null,null);t.default=l.exports}});