webpackJsonp([287],{CHfq:function(e,t){},IQw3:function(e,t,r){"use strict";var s={render:function(){var r=this,e=r.$createElement,s=r._self._c||e;return s("el-form",{ref:"searchForm",staticClass:"tableHeadItemForm",attrs:{inline:"","label-position":"right",model:r.searchForm,"label-width":"60px"}},[s("el-form-item",[s("el-select",{attrs:{placeholder:"发货方或发货人",size:r.btnsize,clearable:""},on:{clear:r.clearSearchSelect,focus:r.clearSender},model:{value:r.senderSearch,callback:function(e){r.senderSearch=e},expression:"senderSearch"}},[s("el-option",{attrs:{label:"发货方",value:"unit"}}),r._v(" "),s("el-option",{attrs:{label:"发货人",value:"customer"}})],1)],1),r._v(" "),"customer"===r.senderSearch?s("el-form-item",[s("el-autocomplete",{attrs:{"popper-class":"popperHide",maxlength:15,size:r.btnsize,"fetch-suggestions":function(e,t){return r.querySearch("shipSenderName",e,t)},placeholder:"发货人搜索"},on:{select:r.handleSelect},model:{value:r.searchForm.shipSenderName,callback:function(e){r.$set(r.searchForm,"shipSenderName",e)},expression:"searchForm.shipSenderName"}})],1):r._e(),r._v(" "),"unit"===r.senderSearch?s("el-form-item",[s("el-autocomplete",{attrs:{"popper-class":"popperHide",size:r.btnsize,maxlength:15,"fetch-suggestions":function(e,t){return r.querySearch("shipSenderUnit",e,t)},placeholder:"发货方搜索"},on:{select:r.handleSelect},model:{value:r.searchForm.shipSenderUnit,callback:function(e){r.$set(r.searchForm,"shipSenderUnit",e)},expression:"searchForm.shipSenderUnit"}})],1):r._e(),r._v(" "),s("el-form-item",{attrs:{label:"运单号"}},[s("el-autocomplete",{attrs:{"popper-class":"popperHide",size:r.btnsize,"fetch-suggestions":function(e,t){return r.querySearch("shipSn",e,t)},placeholder:"运单号搜索",maxlength:20},on:{select:r.handleSelect},scopedSlots:r._u([{key:"default",fn:function(e){var t=e.item;return[s("div",{staticClass:"name"},[r._v(r._s(t.shipSn))])]}}]),model:{value:r.searchForm.shipSn,callback:function(e){r.$set(r.searchForm,"shipSn",e)},expression:"searchForm.shipSn"}})],1)],1)},staticRenderFns:[]};t.a=s},NV2j:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=r("xEn/"),n=r("IQw3");var a=function(e){r("CHfq")},c=r("VU/8")(s.a,n.a,a,null,null);t.default=c.exports},"xEn/":function(e,t,r){"use strict";var s=r("pAQG"),i=r("0xDb");t.a={components:{querySelect:s.a},data:function(){return{senderSearch:"",searchForm:{shipSenderName:"",senderCustomerUnit:"",shipSn:""},btnsize:"mini",selectVal:""}},props:{info:{type:Array,default:[]}},methods:{clearSearchSelect:function(e){this.$emit("change",Object(i.objectMerge2)([],this.info))},querySearch:function(e,t,r){var s=this.info;for(var n in this.searchForm[e]=t,this.selectVal=e,this.searchForm)void 0!==this.searchForm[n]&&""!==this.searchForm[n]||this.$emit("change",Object(i.objectMerge2)([],this.info));var a=t?s.filter(this.createFilter(t,e)):s;r(a);var c=[];a.forEach(function(e){c.push(e)}),this.$emit("change",c)},createFilter:function(t,r){return function(e){return-1!==e[r].toLowerCase().indexOf(t.toLowerCase())}},handleSelect:function(e){this.searchForm[this.selectVal]=e[this.selectVal],this.selectVal="";var t=[];t.push(e),this.$emit("change",t)},clearSender:function(e){this.searchForm=this.$options.data().searchForm}}}}});
//# sourceMappingURL=287.4344c767f1702d27b19a.js.map