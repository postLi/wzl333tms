webpackJsonp([385],{B19L:function(e,t,o){"use strict";var i={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("el-dialog",{staticClass:"tms_dialog_print2",attrs:{title:"打印合同设置",width:"990px",visible:t.dialogVisible,"before-close":t.closeMe,"close-on-click-modal":!1},on:{"update:visible":function(e){t.dialogVisible=e}}},[o("el-form",{ref:"formModel",staticClass:"tms_dialog_print2-ruleForm",attrs:{inline:"",model:t.formModel,size:t.btnsize,"label-width":"100px"}},[o("h3",[t._v("打印内容")]),t._v(" "),o("el-form-item",{staticClass:"tms_dialog_print2-title",attrs:{label:"标题"}},[o("el-input",{attrs:{maxlength:30,autocomplete:"off"},model:{value:t.formModel.heading_content,callback:function(e){t.$set(t.formModel,"heading_content",e)},expression:"formModel.heading_content"}})],1),t._v(" "),o("br"),t._v(" "),o("el-form-item",{attrs:{label:"标题字号"}},[o("el-select",{model:{value:t.formModel.heading_word_size,callback:function(e){t.$set(t.formModel,"heading_word_size",e)},expression:"formModel.heading_word_size"}},t._l(t.fontSizes,function(e){return o("el-option",{key:e,attrs:{value:e,label:e}})}))],1),t._v(" "),o("el-form-item",{attrs:{label:"内容字号"}},[o("el-select",{model:{value:t.formModel.content_word_size,callback:function(e){t.$set(t.formModel,"content_word_size",e)},expression:"formModel.content_word_size"}},t._l(t.fontSizes,function(e){return o("el-option",{key:e,attrs:{value:e,label:e}})}))],1),t._v(" "),o("br"),t._v(" "),o("h3",[t._v("打印参数")]),t._v(" "),o("el-form-item",{attrs:{label:"默认打印机"}},[o("el-select",{model:{value:t.formModel.printer,callback:function(e){t.$set(t.formModel,"printer",e)},expression:"formModel.printer"}},t._l(t.printers,function(e){return o("el-option",{key:e,attrs:{value:e,label:e}})}))],1),t._v(" "),o("el-form-item",{attrs:{label:"纸张宽度(mm)"}},[o("el-input",{attrs:{maxlength:5,autocomplete:"off"},model:{value:t.formModel.paper_width,callback:function(e){t.$set(t.formModel,"paper_width",e)},expression:"formModel.paper_width"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"左边距(mm)"}},[o("el-input",{attrs:{maxlength:5,autocomplete:"off"},model:{value:t.formModel.left_distance,callback:function(e){t.$set(t.formModel,"left_distance",e)},expression:"formModel.left_distance"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"打印方向"}},[o("el-select",{model:{value:t.formModel.printing_direction,callback:function(e){t.$set(t.formModel,"printing_direction",e)},expression:"formModel.printing_direction"}},[o("el-option",{key:"2",attrs:{value:"2",label:"横向"}}),t._v(" "),o("el-option",{key:"1",attrs:{value:"1",label:"竖向"}})],1)],1),t._v(" "),o("el-form-item",{attrs:{label:"纸张高度(mm)"}},[o("el-input",{attrs:{maxlength:5,autocomplete:"off"},model:{value:t.formModel.paper_height,callback:function(e){t.$set(t.formModel,"paper_height",e)},expression:"formModel.paper_height"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"上边距(mm)"}},[o("el-input",{attrs:{maxlength:5,autocomplete:"off"},model:{value:t.formModel.top_distance,callback:function(e){t.$set(t.formModel,"top_distance",e)},expression:"formModel.top_distance"}})],1),t._v(" "),o("div",{staticClass:"tms_dialog_print2-footer"},[o("el-button",{attrs:{type:"primary"},on:{click:function(e){t.submitForm("ruleForm2")}}},[t._v("保存")]),t._v(" "),o("el-button",{on:{click:t.closeMe}},[t._v("关闭")])],1)],1)],1)},staticRenderFns:[]};t.a=i},CWnj:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=o("P5E9"),l=o("B19L"),n=o("VU/8")(i.a,l.a,null,null,null);t.default=n.exports},P5E9:function(e,t,o){"use strict";var i=o("woOf"),l=o.n(i),n=o("UQm2"),r=o("6ThG");t.a={components:{},props:{popVisible:{type:Boolean,default:!1}},data:function(){return{btnsize:"mini",formModel:{heading_content:"",heading_word_size:"",content_word_size:"",print_page_num:"",content_wrap:"",printer:"",paper_width:"",left_distance:"",printing_direction:"",paper_height:"",top_distance:""},printers:[],fontSizes:[12,13,14,15,16,18,20,22,24,26,28,32,40,60],orgData:[]}},watch:{popVisible:function(){this.popVisible?(this.dialogVisible=!0,this.getPrintSetting()):this.dialogVisible=!1}},computed:{dialogVisible:{get:function(){return this.popVisible},set:function(){}}},mounted:function(){this.getPrintSetting(),this.initPrinter()},methods:{initPrinter:function(){for(var e in this.printers=l()([],Object(n.b)()),this.printers)this.printers[e]=this.printers[e].replace(/%^/g,"\\")},getPrintSetting:function(){var o=this;this.orgData=[],Object(r.c)({companyId:this.otherinfo.companyId,printType:1}).then(function(e){var t=e.data;t?(o.orgData=t).forEach(function(e){void 0!==o.formModel[e.fieldName]&&(o.formModel[e.fieldName]=e.fieldValue||"")}):o._handlerCatchMsg(e)}).catch(function(e){o._handlerCatchMsg(e)})},closeMe:function(e){this.$emit("close"),"function"==typeof e&&e()},submitForm:function(e){var t=this,o=[];this.orgData.forEach(function(e){void 0!==t.formModel[e.fieldName]&&(e.fieldValue=t.formModel[e.fieldName]),o.push(e)}),Object(r.f)({companyId:this.otherinfo.companyId,printType:1,settingList:o}).then(function(e){t.$message({type:"success",message:"打印设置成功！"}),t.closeMe()}).catch(function(e){t._handlerCatchMsg(e)})}}}}});