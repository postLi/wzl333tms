webpackJsonp([358],{"6f/H":function(e,t,r){"use strict";var n={render:function(){var r=this,e=r.$createElement,n=r._self._c||e;return n("el-autocomplete",{attrs:{size:r.btnsize,"fetch-suggestions":r.querySearch,placeholder:r.placeholderText,"prefix-icon":"el-icon-search"},on:{select:r.handleSelect},scopedSlots:r._u([{key:"default",fn:function(e){var t=e.item;return[t.shipSn?n("div",{staticClass:"name"},[r._v(r._s(t.shipSn))]):n("div",{staticClass:"name"},[r._v(r._s(t.batchNo))])]}}]),model:{value:r.currentSearch,callback:function(e){r.currentSearch=e},expression:"currentSearch"}})},staticRenderFns:[]};t.a=n},"8Nas":function(e,t,r){"use strict";var n=r("0xDb");t.a={props:{info:{type:Array,default:[]}},data:function(){return{currentSearch:"",btnsize:"mini"}},computed:{placeholderText:{get:function(){return-1!==this.$route.query.currentPage.indexOf("batch")?"请输入批次号":"请输入运单号"},set:function(){}}},methods:{querySearch:function(e,t){(void 0===(this.currentSearch=e).shipSn||e.batchNo)&&(this.currentSearch||this.$emit("change",Object(n.objectMerge2)([],this.info)));var r=this.info;t(e?r.filter(this.createFilter(e)):r)},createFilter:function(t){return function(e){return e.shipSn?-1!==e.shipSn.toLowerCase().indexOf(t.toLowerCase()):e.batchNo?-1!==e.batchNo.toLowerCase().indexOf(t.toLowerCase()):void 0}},handleSelect:function(e){e.shipSn?this.currentSearch=e.shipSn:e.batchNo&&(this.currentSearch=e.batchNo);[].push(e),this.currentSearch="",this.$emit("change",e,this.info.indexOf(e))}}}},DT23:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r("8Nas"),c=r("6f/H"),i=r("VU/8")(n.a,c.a,null,null,null);t.default=i.exports}});
//# sourceMappingURL=358.b3f2cb41c61ced3cfc41.js.map