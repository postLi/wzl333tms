webpackJsonp([337],{B6Ve:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n("pPks"),c=n("HCdn"),i=n("VU/8")(r.a,c.a,null,null,null);t.default=i.exports},HCdn:function(e,t,n){"use strict";var r={render:function(){var n=this,e=n.$createElement,r=n._self._c||e;return r("el-autocomplete",{attrs:{size:n.btnsize,"fetch-suggestions":n.querySearch,placeholder:"请输入运单号","prefix-icon":"el-icon-search"},on:{select:n.handleSelect},scopedSlots:n._u([{key:"default",fn:function(e){var t=e.item;return[t.shipSn?r("div",{staticClass:"name"},[n._v(n._s(t.shipSn))]):r("div",{staticClass:"name"},[n._v(n._s(t.batchNo))])]}}]),model:{value:n.currentSearch,callback:function(e){n.currentSearch=e},expression:"currentSearch"}})},staticRenderFns:[]};t.a=r},pPks:function(e,t,n){"use strict";var r=n("0xDb");t.a={props:{info:{type:Array,default:[]}},data:function(){return{currentSearch:"",btnsize:"mini"}},methods:{querySearch:function(e,t){(void 0===(this.currentSearch=e).shipSn||e.batchNo)&&(this.currentSearch||this.$emit("change",Object(r.objectMerge2)([],this.info)));var n=this.info;t(e?n.filter(this.createFilter(e)):n)},createFilter:function(t){return function(e){return e.shipSn?-1!==e.shipSn.toLowerCase().indexOf(t.toLowerCase()):e.batchNo?-1!==e.batchNo.toLowerCase().indexOf(t.toLowerCase()):void 0}},handleSelect:function(e){e.shipSn?this.currentSearch=e.shipSn:e.batchNo&&(this.currentSearch=e.batchNo);[].push(e),this.currentSearch="",this.$emit("change",e,this.info.indexOf(e))}}}}});