webpackJsonp([346],{JJUW:function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var o=t("TweC"),a=t("YkCO"),c=t("VU/8")(o.a,a.a,null,null,null);r.default=c.exports},TweC:function(e,r,t){"use strict";var a=t("E4LH"),o=t("o9X6");r.a={components:{SelectTree:o.a},props:{btnsize:{type:String,default:"mini"},orgid:{type:Number},truckSources:{type:Array,default:function(){return[]}}},data:function(){var o=this;return{searchForm:{orgid:"",truckSource:"",truckIdNumber:""},rules:{truckIdNumber:[{validator:function(e,r,t){o.searchForm.mobile=r.replace(a.a.NO_NUMBER,""),t()},trigger:"change"}]}}},watch:{orgid:function(e){this.searchForm.orgid=e}},mounted:function(){this.searchForm.orgid=this.orgid},methods:{getOrgid:function(e){this.searchForm.orgid=e},onSubmit:function(){this.$emit("change",this.searchForm)},clearForm:function(){this.searchForm.truckSource="",this.searchForm.orgid=this.orgid,this.searchForm.truckIdNumber=""}}}},YkCO:function(e,r,t){"use strict";var o={render:function(){var r=this,e=r.$createElement,t=r._self._c||e;return t("el-form",{staticClass:"staff_searchinfo clearfix",attrs:{inline:!0,size:r.btnsize,"label-position":"right","label-width":"70px",rules:r.rules,model:r.searchForm}},[t("div",{staticClass:"staff_searchinfo--input"},[t("el-form-item",{attrs:{label:"网点"}},[t("SelectTree",{model:{value:r.searchForm.orgid,callback:function(e){r.$set(r.searchForm,"orgid",e)},expression:"searchForm.orgid"}})],1),r._v(" "),t("el-form-item",{attrs:{label:"车辆来源"}},[t("el-select",{attrs:{placeholder:"全部"},model:{value:r.searchForm.truckSource,callback:function(e){r.$set(r.searchForm,"truckSource",e)},expression:"searchForm.truckSource"}},[t("el-option",{attrs:{label:"全部",value:""}}),r._v(" "),r._l(r.truckSources,function(e){return t("el-option",{key:e.id,attrs:{label:e.dictName,value:e.id}})})],2)],1),r._v(" "),t("el-form-item",{attrs:{label:"车牌号"}},[t("el-input",{attrs:{placeholder:"请输入车牌号",maxlength:"11",clearable:""},model:{value:r.searchForm.truckIdNumber,callback:function(e){r.$set(r.searchForm,"truckIdNumber",e)},expression:"searchForm.truckIdNumber"}})],1)],1),r._v(" "),t("el-form-item",{staticClass:"staff_searchinfo--btn"},[t("el-button",{attrs:{type:"primary"},on:{click:r.onSubmit}},[r._v("查询")]),r._v(" "),t("el-button",{attrs:{type:"info",plain:""},on:{click:r.clearForm}},[r._v("清空")])],1)],1)},staticRenderFns:[]};r.a=o}});