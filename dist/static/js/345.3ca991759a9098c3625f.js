webpackJsonp([345],{B2EE:function(e,r,t){"use strict";var i={render:function(){var r=this,e=r.$createElement,t=r._self._c||e;return t("el-form",{staticClass:"staff_searchinfo clearfix",attrs:{inline:!0,size:r.btnsize,"label-position":"right","label-width":"70px",rules:r.rules,model:r.searchForm}},[t("div",{staticClass:"staff_searchinfo--input"},[t("el-form-item",{attrs:{label:"网点"}},[t("SelectTree",{attrs:{orgid:r.otherinfo.orgid},model:{value:r.searchForm.orgid,callback:function(e){r.$set(r.searchForm,"orgid",e)},expression:"searchForm.orgid"}})],1),r._v(" "),t("el-form-item",{attrs:{label:"承运商"}},[t("el-input",{attrs:{placeholder:"承运商",maxlength:"15",clearable:""},model:{value:r.searchForm.name,callback:function(e){r.$set(r.searchForm,"name",e)},expression:"searchForm.name"}})],1)],1),r._v(" "),t("el-form-item",{staticClass:"staff_searchinfo--btn"},[t("el-button",{attrs:{type:"primary"},on:{click:r.onSubmit}},[r._v("查询")]),r._v(" "),t("el-button",{attrs:{type:"info",plain:""},on:{click:r.clearForm}},[r._v("清空")])],1)],1)},staticRenderFns:[]};r.a=i},"Rf/G":function(e,r,t){"use strict";var a=t("E4LH"),i=t("o9X6");r.a={components:{SelectTree:i.a},props:{btnsize:{type:String,default:"mini"},orgid:{type:Number}},data:function(){var i=this;return{searchForm:{orgid:"",name:"",mobile:""},rules:{mobile:[{validator:function(e,r,t){i.searchForm.mobile=r.replace(a.a.NO_NUMBER,""),t()},trigger:"change"}]}}},watch:{orgid:function(e){this.searchForm.orgid=e}},mounted:function(){this.searchForm.orgid=this.orgid},methods:{getOrgid:function(e){this.searchForm.orgid=e},onSubmit:function(){this.$emit("change",this.searchForm)},clearForm:function(){this.searchForm.name="",this.searchForm.orgid=this.orgid,this.searchForm.mobile=""}}}},cqHs:function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var i=t("Rf/G"),a=t("B2EE"),o=t("VU/8")(i.a,a.a,null,null,null);r.default=o.exports}});