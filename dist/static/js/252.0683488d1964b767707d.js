webpackJsonp([252],{"9/xW":function(e,t,i){"use strict";var o={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"personal-wrapper"},[i("div",{staticClass:"personal-btn",on:{click:t.openDialog}},[i("img",{attrs:{src:t.personalIcon}}),t._v(" "),i("span",[t._v("个性化设置")])]),t._v(" "),i("el-dialog",{attrs:{title:"个性化设置",visible:t.dialogVisible,"append-to-body":"",width:"600px","close-on-click-modal":!1,"before-close":t.closeMe},on:{"update:visible":function(e){t.dialogVisible=e}}},[i("div",{staticClass:"personal-content"},[i("el-form",{ref:"formModel",attrs:{model:t.formModel,rules:t.rules,size:t.btnsize,"label-width":"90px"}},[i("el-form-item",{attrs:{label:"字体大小:",prop:"name"}},[i("el-radio-group",{attrs:{size:"mini"},model:{value:t.formModel.fontSize,callback:function(e){t.$set(t.formModel,"fontSize",e)},expression:"formModel.fontSize"}},t._l(t.fontSizes,function(e){return i("el-radio-button",{key:e.value,attrs:{label:e.value}},[i("span",{style:{"font-size":e.value+"px"}},[t._v(t._s(e.label))])])}))],1)],1)],1),t._v(" "),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{size:t.btnsize},on:{click:function(e){t.dialogVisible=!1}}},[t._v("取 消")]),t._v(" "),i("el-button",{attrs:{size:t.btnsize,type:"primary"},on:{click:function(e){t.onSubmit()}}},[t._v("确 定")])],1)])],1)},staticRenderFns:[]};t.a=o},TEUF:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=i("hByE"),n=i("9/xW");var a=function(e){i("oMZb")},s=i("VU/8")(o.a,n.a,a,null,null);t.default=s.exports},hByE:function(e,t,i){"use strict";var s=i("0xDb"),l=i("t5DY");t.a={data:function(){return{btnsize:"mini",formModel:{fontSize:"18"},loading:!1,dialogVisible:!1,personalIcon:i("vezL"),rules:{},fontSizes:[{label:"超小",value:"12"},{label:"常规",value:"14"},{label:"较大",value:"16"},{label:"最大",value:"18"}]}},created:function(){this.initTheme()},methods:{initTheme:function(){var t=this;return Object(l.d)().then(function(e){e&&(t.formModel=e,t.setTheme())}).catch(function(e){t._handlerCatchMsg(e),t.setTheme()})},setTheme:function(){var e=Object(s.objectMerge2)({},this.formModel);for(var t in e)e[t]=""===e[t]?this.$options.data().formModel[t]:e[t];var i=document.body,o="";switch(e.fontSize){case"12":o="tms_theme_mini";break;case"14":o="";break;case"16":o="tms_theme_medium";break;case"18":default:o="tms_theme_large"}i.setAttribute("class",o)},onSubmit:function(){var a=this;this.$refs.formModel.validate(function(e){if(e){a.loading=!0;var t=Object(s.objectMerge2)({},a.formModel),i=[];for(var o in t)if("userId"!==o){var n={fieldName:o,fieldVal:t[o]};i.push(n)}Object(l.u)(i).then(function(e){a.loading=!1,a.$message.success("修改成功"),a.setTheme()}).catch(function(e){a._handlerCatchMsg(e)}),a.setTheme(),a.closeMe()}})},openDialog:function(){this.dialogVisible=!0},closeMe:function(){this.dialogVisible=!1}}}},oMZb:function(e,t){},vezL:function(e,t,i){e.exports=i.p+"static/img/personal.e7861dd.png"}});