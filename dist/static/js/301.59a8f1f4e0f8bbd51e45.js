webpackJsonp([301],{SG4p:function(e,t){},bMpP:function(e,t,r){"use strict";var s={render:function(){var r=this,e=r.$createElement,s=r._self._c||e;return s("el-form",{ref:"searchForm",staticClass:"tableHeadItemForm",attrs:{inline:"","label-position":"right",model:r.searchForm,"label-width":"60px"}},[s("el-form-item",[s("el-select",{attrs:{placeholder:"批次类型",size:r.btnsize},on:{change:r.changeSenderSearch},model:{value:r.senderSearch,callback:function(e){r.senderSearch=e},expression:"senderSearch"}},[s("el-option",{attrs:{label:"短驳",value:"short"}}),r._v(" "),s("el-option",{attrs:{label:"干线",value:"load"}})],1)],1),r._v(" "),"short"===r.senderSearch?s("el-form-item",[s("el-autocomplete",{attrs:{maxlength:20,size:r.btnsize,"fetch-suggestions":function(e,t){return r.querySearch("shortBatchNo",e,t)},placeholder:"短驳批次号搜索","popper-class":"popperHide"},on:{select:r.handleSelect,focus:function(e){r.focusFormItm("shortBatchNo")}},scopedSlots:r._u([{key:"default",fn:function(e){var t=e.item;return[s("div",{staticClass:"name"},[r._v(r._s(t.batchNo))])]}}]),model:{value:r.searchForm.shortBatchNo,callback:function(e){r.$set(r.searchForm,"shortBatchNo",e)},expression:"searchForm.shortBatchNo"}})],1):r._e(),r._v(" "),"load"===r.senderSearch?s("el-form-item",[s("el-autocomplete",{attrs:{maxlength:20,size:r.btnsize,"fetch-suggestions":function(e,t){return r.querySearch("mainBatchNo",e,t)},placeholder:"干线批次号搜索","popper-class":"popperHide"},on:{select:r.handleSelect,focus:function(e){r.focusFormItm("mainBatchNo")}},scopedSlots:r._u([{key:"default",fn:function(e){var t=e.item;return[s("div",{staticClass:"name"},[r._v(r._s(t.batchNo))])]}}]),model:{value:r.searchForm.mainBatchNo,callback:function(e){r.$set(r.searchForm,"mainBatchNo",e)},expression:"searchForm.mainBatchNo"}})],1):r._e(),r._v(" "),"deliver"===r.senderSearch?s("el-form-item",[s("el-autocomplete",{attrs:{maxlength:20,size:r.btnsize,"fetch-suggestions":function(e,t){return r.querySearch("sendBatchNo",e,t)},placeholder:"送货批次号搜索","popper-class":"popperHide"},on:{select:r.handleSelect,focus:function(e){r.focusFormItm("sendBatchNo")}},scopedSlots:r._u([{key:"default",fn:function(e){var t=e.item;return[s("div",{staticClass:"name"},[r._v(r._s(t.batchNo))])]}}]),model:{value:r.searchForm.sendBatchNo,callback:function(e){r.$set(r.searchForm,"sendBatchNo",e)},expression:"searchForm.sendBatchNo"}})],1):r._e(),r._v(" "),s("el-form-item",{attrs:{label:"车牌号"}},[s("el-autocomplete",{attrs:{maxlength:8,size:r.btnsize,"fetch-suggestions":function(e,t){return r.querySearch("truckIdNumber",e,t)},placeholder:"车牌号搜索","popper-class":"popperHide"},on:{select:r.handleSelect,focus:function(e){r.focusFormItm("truckIdNumber")}},scopedSlots:r._u([{key:"default",fn:function(e){var t=e.item;return[s("div",{staticClass:"name"},[r._v(r._s(t.truckIdNumber))])]}}]),model:{value:r.searchForm.truckIdNumber,callback:function(e){r.$set(r.searchForm,"truckIdNumber",e)},expression:"searchForm.truckIdNumber"}})],1)],1)},staticRenderFns:[]};t.a=s},edkX:function(e,t,r){"use strict";var s=r("pAQG"),c=r("0xDb");t.a={components:{querySelect:s.a},data:function(){return{senderSearch:"load",searchForm:{shortBatchNo:"",mainBatchNo:"",sendBatchNo:"",truckIdNumber:""},btnsize:"mini",selectVal:"",settlementId:"",isSender:!1,SETTLEMENT_TYPE:{short:180,load:179,deliver:181}}},props:{info:{type:Array,default:[]},getSettlementId:{type:[Number,String]}},watch:{getSettlementId:{handler:function(e,t){e&&(this.isSender=!0,this.settlementId=e,this.senderSearch=179===e?"load":180===e?"short":"deliver")},deep:!0}},mounted:function(){this.isSender||this.initSettlementid()},methods:{focusFormItm:function(e){for(var t in this.searchForm)t!==e&&this.$set(this.searchForm,t,"")},initSettlementid:function(){this.senderSearch;this.settlementId=this.SETTLEMENT_TYPE[this.senderSearch],console.log("选择批次类型后的settlementId",this.settlementId),this.$emit("setSettlementId",this.settlementId)},changeSenderSearch:function(e){e&&this.initSettlementid()},querySearch:function(e,t,r){var s=s=this.info;for(var o in this.searchForm[e]=t,this.selectVal=e,this.searchForm)void 0!==this.searchForm[o]&&""!==this.searchForm[o]||this.$emit("change",Object(c.objectMerge2)([],this.info));var a=t?s.filter(this.createFilter(t,e)):s;r(a);var n=[];a.forEach(function(e){n.push(e)}),this.$emit("change",n)},createFilter:function(t,r){return function(e){if("truckIdNumber"!==r){if(e.batchNo)return-1!==e.batchNo.toLowerCase().indexOf(t.toLowerCase())}else if(e.truckIdNumber)return-1!==e.truckIdNumber.toLowerCase().indexOf(t.toLowerCase())}},handleSelect:function(e){this.searchForm[this.selectVal]=e[this.selectVal],this.selectVal="";var t=[];t.push(e),this.$emit("change",t),this.searchForm=this.$options.data().searchForm},clearSender:function(e){this.searchForm=this.$options.data().searchForm}}}},sR0s:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=r("edkX"),o=r("bMpP");var a=function(e){r("SG4p")},n=r("VU/8")(s.a,o.a,a,null,null);t.default=n.exports}});