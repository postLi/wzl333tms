webpackJsonp([394],{CWnj:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=o("P5E9"),n=o("Z2is"),r=o("VU/8")(i.a,n.a,null,null,null);e.default=r.exports},P5E9:function(t,e,o){"use strict";var i=o("woOf"),n=o.n(i),r=o("UQm2"),l=o("6ThG"),a=o("0xDb");e.a={components:{},props:{popVisible:{type:Boolean,default:!1},formInfo:{type:[Object,Array],default:function(){}}},data:function(){return{btnsize:"mini",formModel:{heading_content:"",heading_word_size:"",content_word_size:"",print_page_num:"",content_wrap:"",printer:"",paper_width:"",left_distance:"",printing_direction:"",paper_height:"",top_distance:""},formPrint:{printFontSetting:{contract:""}},printers:[],fontSizes:[12,13,14,15,16,18,20,22,24,26,28,32,40,60],orgData:[]}},watch:{popVisible:function(){this.popVisible?(this.dialogVisible=!0,this.getPrintSetting(),this.formPrint=Object(a.objectMerge2)({},this.formInfo),console.log("formPrint",this.formPrint)):this.dialogVisible=!1}},computed:{dialogVisible:{get:function(){return this.popVisible},set:function(){}}},mounted:function(){this.getPrintSetting(),this.initPrinter()},methods:{initPrinter:function(){for(var t in this.printers=n()([],Object(r.b)()),this.printers)this.printers[t]=this.printers[t].replace(/%^/g,"\\")},savePrinter:function(){this.formInfo.printFontSetting.contract!==this.formPrint.printFontSetting.contract&&this.$emit("success",{contractFont:this.formPrint.printFontSetting.contract})},getPrintSetting:function(){var o=this;this.orgData=[],Object(l.c)({companyId:this.otherinfo.companyId,printType:1}).then(function(t){var e=t.data;e?(o.orgData=e).forEach(function(t){void 0!==o.formModel[t.fieldName]&&(o.formModel[t.fieldName]=t.fieldValue||"")}):o._handlerCatchMsg(t)}).catch(function(t){o._handlerCatchMsg(t)})},closeMe:function(t){this.$emit("close"),"function"==typeof t&&t()},submitForm:function(t){var e=this,o=[];this.savePrinter(),this.orgData.forEach(function(t){void 0!==e.formModel[t.fieldName]&&(t.fieldValue=e.formModel[t.fieldName]),o.push(t)}),Object(l.f)({companyId:this.otherinfo.companyId,printType:1,settingList:o}).then(function(t){e.$message({type:"success",message:"打印设置成功！"}),e.closeMe()}).catch(function(t){e._handlerCatchMsg(t)})}}}},Z2is:function(t,e,o){"use strict";var i={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("el-dialog",{staticClass:"tms_dialog_print2",attrs:{title:"打印合同设置",width:"990px",visible:e.dialogVisible,"before-close":e.closeMe,"close-on-click-modal":!1},on:{"update:visible":function(t){e.dialogVisible=t}}},[o("el-form",{ref:"formModel",staticClass:"tms_dialog_print2-ruleForm",attrs:{inline:"",model:e.formModel,size:e.btnsize,"label-width":"100px"}},[o("h3",[e._v("打印内容")]),e._v(" "),o("el-form-item",{staticClass:"tms_dialog_print2-title",attrs:{label:"标题"}},[o("el-input",{attrs:{maxlength:30,autocomplete:"off"},model:{value:e.formModel.heading_content,callback:function(t){e.$set(e.formModel,"heading_content",t)},expression:"formModel.heading_content"}})],1),e._v(" "),o("br"),e._v(" "),o("el-form-item",{attrs:{label:"标题字号"}},[o("el-select",{model:{value:e.formModel.heading_word_size,callback:function(t){e.$set(e.formModel,"heading_word_size",t)},expression:"formModel.heading_word_size"}},e._l(e.fontSizes,function(t){return o("el-option",{key:t,attrs:{value:t,label:t}})}))],1),e._v(" "),o("el-form-item",{attrs:{label:"内容字号"}},[o("el-select",{model:{value:e.formModel.content_word_size,callback:function(t){e.$set(e.formModel,"content_word_size",t)},expression:"formModel.content_word_size"}},e._l(e.fontSizes,function(t){return o("el-option",{key:t,attrs:{value:t,label:t}})}))],1),e._v(" "),o("br"),e._v(" "),o("h3",[e._v("打印参数")]),e._v(" "),o("el-form-item",{attrs:{label:"默认打印机"}},[o("el-select",{model:{value:e.formModel.printer,callback:function(t){e.$set(e.formModel,"printer",t)},expression:"formModel.printer"}},e._l(e.printers,function(t){return o("el-option",{key:t,attrs:{value:t,label:t}})}))],1),e._v(" "),o("el-form-item",{attrs:{label:"纸张宽度(mm)"}},[o("el-input",{attrs:{maxlength:5,autocomplete:"off"},model:{value:e.formModel.paper_width,callback:function(t){e.$set(e.formModel,"paper_width",t)},expression:"formModel.paper_width"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"左边距(mm)"}},[o("el-input",{attrs:{maxlength:5,autocomplete:"off"},model:{value:e.formModel.left_distance,callback:function(t){e.$set(e.formModel,"left_distance",t)},expression:"formModel.left_distance"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"打印方向"}},[o("el-select",{model:{value:e.formModel.printing_direction,callback:function(t){e.$set(e.formModel,"printing_direction",t)},expression:"formModel.printing_direction"}},[o("el-option",{key:"2",attrs:{value:"2",label:"横向"}}),e._v(" "),o("el-option",{key:"1",attrs:{value:"1",label:"竖向"}})],1)],1),e._v(" "),o("el-form-item",{attrs:{label:"纸张高度(mm)"}},[o("el-input",{attrs:{maxlength:5,autocomplete:"off"},model:{value:e.formModel.paper_height,callback:function(t){e.$set(e.formModel,"paper_height",t)},expression:"formModel.paper_height"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"上边距(mm)"}},[o("el-input",{attrs:{maxlength:5,autocomplete:"off"},model:{value:e.formModel.top_distance,callback:function(t){e.$set(e.formModel,"top_distance",t)},expression:"formModel.top_distance"}})],1),e._v(" "),o("h3",[e._v("其他设置")]),e._v(" "),o("el-form-item",{attrs:{label:"打印字体"}},[o("el-select",{attrs:{size:"mini"},model:{value:e.formPrint.printFontSetting.contract,callback:function(t){e.$set(e.formPrint.printFontSetting,"contract",t)},expression:"formPrint.printFontSetting.contract"}},e._l(e.$const.PRINT_FONT,function(t,e){return o("el-option",{key:e,attrs:{value:t,label:t}})}))],1),e._v(" "),o("div",{staticClass:"tms_dialog_print2-footer"},[o("el-button",{attrs:{type:"primary"},on:{click:function(t){e.submitForm("ruleForm2")}}},[e._v("保存")]),e._v(" "),o("el-button",{on:{click:e.closeMe}},[e._v("关闭")])],1)],1)],1)},staticRenderFns:[]};e.a=i}});