webpackJsonp([127,289],{"+Noo":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("Fj2W"),o=a("ecFV");var l=function(e){a("tLv/")},n=a("VU/8")(r.a,o.a,l,null,null);t.default=n.exports},"7nIZ":function(e,t,a){"use strict";t.i=function(e){return r.b.post("/api-finance/finance/tmsfinancebillrecord/v1.3/getBillRecordList/",e).then(function(e){return e.data})},t.h=function(e){return r.b.post("/api-finance/finance/tmsfinancebillrecorddetail/v1.3/getBillRecordDetailList/",e).then(function(e){return e.data})},t.j=function(e){return r.b.post("/api-finance/finance/tmsfinancebillrecord/v1.3/getVerificationBaseInfo/",e).then(function(e){return e.data})},t.g=function(e){return r.b.post("/api-finance/finance/tmsfinancebillrecord/v1.3/addIncome/",e).then(function(e){return e.data})},t.a=function(e){return r.b.post("/api-finance/finance/tmsfinancebillrecord/v1.3/cancelVerification/",e).then(function(e){return e.data})},t.f=function(e){return r.b.post("/api-finance/finance/tmsfinanceverification/v1.3/getVeryficationList/",e).then(function(e){return e.data})},t.b=function(e){return r.b.post("/api-finance//finance/tmsfinancebillrecord/v1.3/delBillRecord/",e).then(function(e){return e.data})},t.e=function(e){return r.b.post("/api-finance/finance/tmsfinancebillrecord/v1.3/getOrderList/",e).then(function(e){return e.data})},t.d=function(e){return r.b.post("/api-finance/finance/tmsfinancesubjects/v1.3/getFinanceSubjects/",e).then(function(e){return e.data})},t.c=function(e){return r.b.post("/api-finance/finance/tmsfinancebillrecord/v1.3/getBillRecordInfo",e).then(function(e){return e.data})};var r=a("Vo7i")},"7ueC":function(e,t){},"9cTb":function(e,t,a){"use strict";var r={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"transferTable"},[a("div",{staticClass:"transferTable_header"},[a("div",{staticClass:"transferTable_searchs"},[a("div",{staticClass:"transferTable_fresh"},[t._t("tableRefresh")],2),t._v(" "),t._t("tableSearch")],2),t._v(" "),a("div",{staticClass:"transferTable_header_btn_direction"},[a("el-tooltip",{attrs:{effect:"dark",content:"向左侧拉伸",placement:"top-end"}},[a("el-button",{staticClass:"btn-leftright",attrs:{icon:"el-icon-arrow-right",type:"primary",circle:"",disabled:t.isShowLeft,size:"mini",plain:""},on:{click:function(e){t.doAction("showAllLeft")}}})],1),t._v(" "),a("el-tooltip",{attrs:{effect:"dark",content:"向右侧拉伸",placement:"top-start"}},[a("el-button",{staticClass:"btn-leftright",attrs:{icon:"el-icon-arrow-left",type:"primary",circle:"",disabled:t.isShowRight,size:"mini",plain:""},on:{click:function(e){t.doAction("showAllRight")}}})],1),t._v(" "),a("transition",{attrs:{name:"el-zoom-in-bottom"}},[t.isShowReback?a("el-button",{staticClass:"btn-leftright",attrs:{icon:"el-icon-refresh",type:"primary",circle:"",size:"mini",plain:""},on:{click:function(e){t.doAction("showReback")}}}):t._e()],1),t._v(" "),a("div",{staticClass:"transferTable_header_btn_box clearfix"},[t._t("btnsBox")],2)],1)]),t._v(" "),a("div",{staticClass:"transferTable_content"},[a("div",{staticClass:"transferTable_content_table paddingRight",class:t.leftTableClass},[t._t("tableLeft",[t._v("左边表格区")])],2),t._v(" "),a("div",{staticClass:"transferTable_content_table",class:t.rightTableClass},[t._t("tableRight",[t._v("右边表格区")])],2)])])},staticRenderFns:[]};t.a=r},CJmx:function(e,t){},Fj2W:function(e,t,a){"use strict";var r=a("pAQG"),i=a("0xDb");t.a={components:{querySelect:r.a},data:function(){return{senderSearch:"",searchForm:{shipSenderName:"",shipSenderUnit:"",shipSn:""},btnsize:"mini",selectVal:""}},props:{info:{type:Array,default:[]}},methods:{focusFormItm:function(e){for(var t in this.searchForm)t!==e&&this.$set(this.searchForm,t,"")},clearSearchSelect:function(e){this.$emit("change",Object(i.objectMerge2)([],this.info))},querySearch:function(e,t,a){var r=this.info;for(var o in this.searchForm[e]=t,this.selectVal=e,this.searchForm)void 0!==this.searchForm[o]&&""!==this.searchForm[o]||this.$emit("change",Object(i.objectMerge2)([],this.info));var l=t?r.filter(this.createFilter(t,e)):r;a(l);var n=[];l.forEach(function(e){n.push(e)}),this.$emit("change",n)},createFilter:function(t,a){return function(e){if(e[a])return-1!==e[a].toLowerCase().indexOf(t.toLowerCase())}},handleSelect:function(e){this.searchForm[this.selectVal]=e[this.selectVal],this.selectVal="";var t=[];t.push(e),this.$emit("change",t)},clearSender:function(e){this.searchForm=this.$options.data().searchForm}}}},IcMT:function(e,t,a){"use strict";var r=a("PI8x"),o=a("9cTb");var l=function(e){a("7ueC")},n=a("VU/8")(r.a,o.a,l,"data-v-4bbec734",null);t.a=n.exports},Llm4:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("pURq"),o=a("ooRw");var l=function(e){a("CJmx")},n=a("VU/8")(r.a,o.a,l,null,null);t.default=n.exports},PI8x:function(e,t,a){"use strict";t.a={data:function(){return{loading:!1,isShowLeft:!1,isShowRight:!1,isShowReback:!1,searchForm:""}},computed:{leftTableClass:function(){return this.isShowLeft?"showTableLeft":this.isShowRight?"shortTableLeft":"averageTable"},rightTableClass:function(){return this.isShowRight?"showTableRight":this.isShowLeft?"shortTableRight":"averageTable"}},methods:{doAction:function(e){switch(this.loading=!0,e){case"showAllLeft":this.showAllLeft();break;case"showAllRight":this.showAllRight();break;case"showReback":this.showReback()}this.$emit("resizeVTable"),this.loading=!1},showAllLeft:function(){this.isShowLeft=!0,this.isShowRight=!1,this.isShowReback=!0},showAllRight:function(){this.isShowLeft=!1,this.isShowRight=!0,this.isShowReback=!0},showReback:function(){this.isShowReback=!1,this.isShowLeft=!1,this.isShowRight=!1}}}},TsW9:function(e,t,a){"use strict";t.a=function(e,t){return r.b.get("/api-order/order/load/v1/getBatchNo/",{params:{orgId:e,loadTypeId:t}})},t.i=function(e){return r.b.post("/api-order/order/load/v1/",e)},t.j=function(e){return r.b.put("/api-order/order/load/v1/",e)},t.d=function(e){return r.b.get("/api-order/order/load/v1/selectAddLoadRepertoryList/",{params:{orgId:e}})},t.g=function(e,t){return r.b.get("/api-order/order/load/v1/selectUpdateLoadRepertoryList/?orgId="+e+"&loadId="+t)},t.h=function(e,t){return r.b.get("/api-order/order/load/v1/selectUpdateLoadDetailList/?orgId="+e+"&loadId="+t)},t.e=function(e){return r.b.get("/api-order/order/load/v1/selectLoadDetailList/",{params:{loadId:e}})},t.f=function(){return r.b.get("/api-system/system/trunk/v1/findCarAndDriver/").then(function(e){return e})},t.b=function(){return r.b.get("/api-system/system/trunk/v1/findDriverAndCar/").then(function(e){return e})},t.c=function(e){return r.b.post("/api-order/order/tmsordertrailterminal/v1/list",e).then(function(e){return e.data})};var r=a("Vo7i")},ecFV:function(e,t,a){"use strict";var r={render:function(){var a=this,e=a.$createElement,r=a._self._c||e;return r("el-form",{ref:"searchForm",staticClass:"tableHeadItemForm",attrs:{inline:"","label-position":"right",model:a.searchForm,"label-width":"60px"}},[r("el-form-item",[r("el-select",{attrs:{placeholder:"发货方或发货人",size:a.btnsize,clearable:""},on:{clear:a.clearSearchSelect,focus:a.clearSender},model:{value:a.senderSearch,callback:function(e){a.senderSearch=e},expression:"senderSearch"}},[r("el-option",{attrs:{label:"发货方",value:"unit"}}),a._v(" "),r("el-option",{attrs:{label:"发货人",value:"customer"}})],1)],1),a._v(" "),"customer"===a.senderSearch?r("el-form-item",[r("el-autocomplete",{attrs:{"popper-class":"popperHide",maxlength:15,size:a.btnsize,"fetch-suggestions":function(e,t){return a.querySearch("shipSenderName",e,t)},placeholder:"发货人搜索"},on:{focus:function(e){a.focusFormItm("shipSenderName")},select:a.handleSelect},model:{value:a.searchForm.shipSenderName,callback:function(e){a.$set(a.searchForm,"shipSenderName",e)},expression:"searchForm.shipSenderName"}})],1):a._e(),a._v(" "),"unit"===a.senderSearch?r("el-form-item",[r("el-autocomplete",{attrs:{"popper-class":"popperHide",size:a.btnsize,maxlength:15,"fetch-suggestions":function(e,t){return a.querySearch("shipSenderUnit",e,t)},placeholder:"发货方搜索"},on:{focus:function(e){a.focusFormItm("shipSenderUnit")},select:a.handleSelect},model:{value:a.searchForm.shipSenderUnit,callback:function(e){a.$set(a.searchForm,"shipSenderUnit",e)},expression:"searchForm.shipSenderUnit"}})],1):a._e(),a._v(" "),r("el-form-item",{attrs:{label:"运单号"}},[r("el-autocomplete",{attrs:{"popper-class":"popperHide",size:a.btnsize,"fetch-suggestions":function(e,t){return a.querySearch("shipSn",e,t)},placeholder:"运单号搜索",maxlength:20},on:{focus:function(e){a.focusFormItm("shipSn")},select:a.handleSelect},scopedSlots:a._u([{key:"default",fn:function(e){var t=e.item;return[r("div",{staticClass:"name"},[a._v(a._s(t.shipSn))])]}}]),model:{value:a.searchForm.shipSn,callback:function(e){a.$set(a.searchForm,"shipSn",e)},expression:"searchForm.shipSn"}})],1)],1)},staticRenderFns:[]};t.a=r},ooRw:function(e,t,a){"use strict";var r={render:function(){var a=this,e=a.$createElement,r=a._self._c||e;return r("transferTable",{directives:[{name:"loading",rawName:"v-loading",value:a.loading,expression:"loading"}]},[r("div",{staticClass:"tableHeadItemForm clearfix",attrs:{slot:"tableSearch"},slot:"tableSearch"},[r("currentSearch",{attrs:{info:a.countOrgLeftTable},on:{change:a.getSearch}})],1),a._v(" "),r("div",{staticClass:"tableHeadItemBtn",staticStyle:{height:"100%"},attrs:{slot:"tableLeft"},slot:"tableLeft"},[r("el-button",{staticClass:"tableAllBtn",attrs:{size:"mini"},on:{click:a.addALLList}}),a._v(" "),a.showtable?r("el-table",{key:a.tablekey,ref:"multipleTableRight",attrs:{data:a.leftTable,border:"","tooltip-effect":"dark",triped:"",height:"100%","summary-method":a.getSumRight,"default-sort":{prop:"id",order:"ascending"},"show-overflow-tooltip":!0,"show-summary":!0},on:{"row-click":a.clickDetailsRight,"selection-change":a.getSelectionRight,"row-dblclick":a.dclickAddItem}},[r("el-table-column",{attrs:{fixed:"",width:"60",type:"index",label:"序号"},scopedSlots:a._u([{key:"default",fn:function(e){return[a._v("\n          "+a._s(e.$index+1)+"\n        ")]}}])}),a._v(" "),r("el-table-column",{attrs:{fixed:"",width:"50"},scopedSlots:a._u([{key:"default",fn:function(t){return[r("el-button",{staticClass:"tableItemBtn",attrs:{size:"mini"},on:{click:function(e){a.addItem(t.row,t.$index)}}})]}}])}),a._v(" "),r("el-table-column",{attrs:{prop:"shipSn",label:"运单号",fixed:"",width:"130"}}),a._v(" "),r("el-table-column",{attrs:{prop:"shipGoodsSn",sortable:"",label:"货号",width:"150"}}),a._v(" "),r("el-table-column",{attrs:{prop:"shipFeeTotalActual",sortable:"",label:"实际合计",width:"150"}}),a._v(" "),r("el-table-column",{attrs:{prop:"shipFeeTotal",sortable:"",label:"运费合计",width:"120"}}),a._v(" "),r("el-table-column",{attrs:{prop:"noShipFeeTotal",sortable:"",label:"未核销运费合计",width:"120"},scopedSlots:a._u([{key:"default",fn:function(e){return[r("span",{domProps:{innerHTML:a._s(a._setTextColor(e.row.shipFeeTotal,e.row.hadShipFeeTotal,e.row.noShipFeeTotal,e.row.noShipFeeTotal))}})]}}])}),a._v(" "),r("el-table-column",{attrs:{prop:"hadShipFeeTotal",sortable:"",label:"已核销运费合计",width:"120"},scopedSlots:a._u([{key:"default",fn:function(e){return[r("span",{domProps:{innerHTML:a._s(a._setTextColor(e.row.shipFeeTotal,e.row.hadShipFeeTotal,e.row.noShipFeeTotal,e.row.hadShipFeeTotal))}})]}}])}),a._v(" "),r("el-table-column",{attrs:{prop:"kickBackPay",sortable:"",label:"回扣",width:"120"}}),a._v(" "),r("el-table-column",{attrs:{prop:"noKickBackPay",sortable:"",label:"未核销回扣",width:"120"},scopedSlots:a._u([{key:"default",fn:function(e){return[r("span",{domProps:{innerHTML:a._s(a._setTextColor(e.row.kickBackPay,e.row.hadKickBackPay,e.row.noKickBackPay,e.row.noKickBackPay))}})]}}])}),a._v(" "),r("el-table-column",{attrs:{prop:"hadKickBackPay",sortable:"",label:"已核销回扣",width:"120"},scopedSlots:a._u([{key:"default",fn:function(e){return[r("span",{domProps:{innerHTML:a._s(a._setTextColor(e.row.kickBackPay,e.row.hadKickBackPay,e.row.noKickBackPay,e.row.hadKickBackPay))}})]}}])}),a._v(" "),r("el-table-column",{attrs:{prop:"transferPay",sortable:"",label:"中转费",width:"120"}}),a._v(" "),r("el-table-column",{attrs:{prop:"noTransferPay",sortable:"",label:"未核销中转费",width:"120"},scopedSlots:a._u([{key:"default",fn:function(e){return[r("span",{domProps:{innerHTML:a._s(a._setTextColor(e.row.transferPay,e.row.hadTransferPay,e.row.noTransferPay,e.row.noTransferPay))}})]}}])}),a._v(" "),r("el-table-column",{attrs:{prop:"hadTransferPay",sortable:"",label:"已核销中转费",width:"120"},scopedSlots:a._u([{key:"default",fn:function(e){return[r("span",{domProps:{innerHTML:a._s(a._setTextColor(e.row.transferPay,e.row.hadTransferPay,e.row.noTransferPay,e.row.hadTransferPay))}})]}}])}),a._v(" "),r("el-table-column",{attrs:{prop:"unusualPay",sortable:"",label:"异动费用",width:"120"}}),a._v(" "),r("el-table-column",{attrs:{prop:"noUnusualPay",sortable:"",label:"未核销异动费用",width:"120"},scopedSlots:a._u([{key:"default",fn:function(e){return[r("span",{domProps:{innerHTML:a._s(a._setTextColor(e.row.unusualPay,e.row.hadUnusualPay,e.row.noUnusualPay,e.row.noUnusualPay))}})]}}])}),a._v(" "),r("el-table-column",{attrs:{prop:"hadUnusualPay",sortable:"",label:"已核销异动费用",width:"120"},scopedSlots:a._u([{key:"default",fn:function(e){return[r("span",{domProps:{innerHTML:a._s(a._setTextColor(e.row.unusualPay,e.row.hadUnusualPay,e.row.noUnusualPay,e.row.hadUnusualPay))}})]}}])}),a._v(" "),r("el-table-column",{attrs:{prop:"exceptionPay",sortable:"",label:"异常理赔",width:"120"}}),a._v(" "),r("el-table-column",{attrs:{prop:"noExceptionPay",sortable:"",label:"未核销异常理赔",width:"120"},scopedSlots:a._u([{key:"default",fn:function(e){return[r("span",{domProps:{innerHTML:a._s(a._setTextColor(e.row.exceptionPay,e.row.hadExceptionPay,e.row.noExceptionPay,e.row.noExceptionPay))}})]}}])}),a._v(" "),r("el-table-column",{attrs:{prop:"hadExceptionPay",sortable:"",label:"已核销异常理赔",width:"120"},scopedSlots:a._u([{key:"default",fn:function(e){return[r("span",{domProps:{innerHTML:a._s(a._setTextColor(e.row.exceptionPay,e.row.hadExceptionPay,e.row.noExceptionPay,e.row.hadExceptionPay))}})]}}])}),a._v(" "),r("el-table-column",{attrs:{prop:"pickPuPay",sortable:"",label:"实际提货费",width:"120"}}),a._v(" "),r("el-table-column",{attrs:{prop:"noPickPuPay",sortable:"",label:"未核销实际提货费",width:"120"},scopedSlots:a._u([{key:"default",fn:function(e){return[r("span",{domProps:{innerHTML:a._s(a._setTextColor(e.row.pickPuPay,e.row.hadPickPuPay,e.row.noPickPuPay,e.row.noPickPuPay))}})]}}])}),a._v(" "),r("el-table-column",{attrs:{prop:"hadPickPuPay",sortable:"",label:"已核销实际提货费",width:"120"},scopedSlots:a._u([{key:"default",fn:function(e){return[r("span",{domProps:{innerHTML:a._s(a._setTextColor(e.row.pickPuPay,e.row.hadPickPuPay,e.row.noPickPuPay,e.row.hadPickPuPay))}})]}}])}),a._v(" "),r("el-table-column",{attrs:{prop:"othePay",sortable:"",label:"其他费用",width:"120"}}),a._v(" "),r("el-table-column",{attrs:{prop:"noOthePay",sortable:"",label:"未核销其他费用",width:"120"},scopedSlots:a._u([{key:"default",fn:function(e){return[r("span",{domProps:{innerHTML:a._s(a._setTextColor(e.row.othePay,e.row.hadOthePay,e.row.noOthePay,e.row.noOthePay))}})]}}])}),a._v(" "),r("el-table-column",{attrs:{prop:"hadOthePay",sortable:"",label:"已核销其他费用",width:"120"},scopedSlots:a._u([{key:"default",fn:function(e){return[r("span",{domProps:{innerHTML:a._s(a._setTextColor(e.row.othePay,e.row.hadOthePay,e.row.noOthePay,e.row.hadOthePay))}})]}}])}),a._v(" "),r("el-table-column",{attrs:{prop:"deliveryPay",sortable:"",label:"终端送货费",width:"120"}}),a._v(" "),r("el-table-column",{attrs:{prop:"noDeliveryPay",sortable:"",label:"未核销终端送货费",width:"120"},scopedSlots:a._u([{key:"default",fn:function(e){return[r("span",{domProps:{innerHTML:a._s(a._setTextColor(e.row.deliveryPay,e.row.hadDeliveryPay,e.row.noDeliveryPay,e.row.noDeliveryPay))}})]}}])}),a._v(" "),r("el-table-column",{attrs:{prop:"hadDeliveryPay",sortable:"",label:"已核销终端送货费",width:"120"},scopedSlots:a._u([{key:"default",fn:function(e){return[r("span",{domProps:{innerHTML:a._s(a._setTextColor(e.row.deliveryPay,e.row.hadDeliveryPay,e.row.noDeliveryPay,e.row.hadDeliveryPay))}})]}}])}),a._v(" "),r("el-table-column",{attrs:{prop:"shipFromCityName",sortable:"",label:"发站",width:"120"},scopedSlots:a._u([{key:"default",fn:function(e){return[a._v("\n          "+a._s(a._processTableSlot(e,"shipFromCityName"))+"\n        ")]}}])}),a._v(" "),r("el-table-column",{attrs:{prop:"shipToCityName",sortable:"",label:"到站",width:"120"},scopedSlots:a._u([{key:"default",fn:function(e){return[a._v("\n          "+a._s(a._processTableSlot(e,"shipToCityName"))+"\n        ")]}}])}),a._v(" "),r("el-table-column",{attrs:{prop:"cargoName",sortable:"",label:"货品名",width:"120"}}),a._v(" "),r("el-table-column",{attrs:{prop:"cargoAmount",sortable:"",label:"件数",width:"120"}}),a._v(" "),r("el-table-column",{attrs:{prop:"cargoWeight",sortable:"",label:"重量",width:"120"}}),a._v(" "),r("el-table-column",{attrs:{prop:"cargoVolume",sortable:"",label:"体积",width:"120"}}),a._v(" "),r("el-table-column",{attrs:{prop:"shipSenderUnit",sortable:"",label:"发货方",width:"120"}}),a._v(" "),r("el-table-column",{attrs:{prop:"shipSenderName",sortable:"",label:"发货人",width:"120"}}),a._v(" "),r("el-table-column",{attrs:{prop:"shipRemarks",sortable:"",label:"运单备注",width:"120"}})],1):a._e()],1),a._v(" "),r("div",{staticClass:"tableHeadItemBtn",attrs:{slot:"tableRight"},slot:"tableRight"},[r("el-button",{staticClass:"tableAllBtnMinus",attrs:{size:"mini"},on:{click:a.minusAllList}}),a._v(" "),a.showtable?r("el-table",{key:a.tableRight,ref:"multipleTableLeft",staticStyle:{height:"100%"},attrs:{data:a.rightTable,border:"","tooltip-effect":"dark",triped:"",height:"100%","summary-method":a.getSumLeft,"default-sort":{prop:"id",order:"ascending"},"show-summary":!0},on:{"row-dblclick":a.dclickMinusItem,"row-click":a.clickDetailsLeft,"selection-change":a.getSelectionLeft}},[r("el-table-column",{attrs:{fixed:"",width:"60",type:"index",label:"序号"},scopedSlots:a._u([{key:"default",fn:function(e){return[a._v("\n          "+a._s(e.$index+1)+"\n        ")]}}])}),a._v(" "),r("el-table-column",{attrs:{fixed:"",width:"50"},scopedSlots:a._u([{key:"default",fn:function(t){return[r("el-button",{staticClass:"tableItemBtnMinus",attrs:{size:"mini"},on:{click:function(e){a.minusItem(t.row,t.$index)}}})]}}])}),a._v(" "),r("el-table-column",{attrs:{prop:"shipSn",label:"运单号",fixed:"",width:"130"}}),a._v(" "),r("el-table-column",{attrs:{prop:"shipGoodsSn",sortable:"",label:"货号",width:"150"}}),a._v(" "),r("el-table-column",{attrs:{prop:"shipFeeTotalActual",sortable:"",label:"实际合计",width:"150"}}),a._v(" "),r("el-table-column",{attrs:{prop:"shipFeeTotal",sortable:"",label:"运费合计",width:"120"}}),a._v(" "),r("el-table-column",{attrs:{prop:"noShipFeeTotal",sortable:"",label:"未核销运费合计",width:"120"},scopedSlots:a._u([{key:"default",fn:function(e){return[r("span",{domProps:{innerHTML:a._s(a._setTextColor(e.row.shipFeeTotal,e.row.hadShipFeeTotal,e.row.noShipFeeTotal,e.row.noShipFeeTotal))}})]}}])}),a._v(" "),r("el-table-column",{attrs:{prop:"hadShipFeeTotal",sortable:"",label:"已核销运费合计",width:"120"},scopedSlots:a._u([{key:"default",fn:function(e){return[r("span",{domProps:{innerHTML:a._s(a._setTextColor(e.row.shipFeeTotal,e.row.hadShipFeeTotal,e.row.noShipFeeTotal,e.row.hadShipFeeTotal))}})]}}])}),a._v(" "),r("el-table-column",{attrs:{prop:"shipFeeTotalActual",sortable:"",label:"实际运费合计",width:"120"}}),a._v(" "),r("el-table-column",{attrs:{prop:"kickBackPay",sortable:"",label:"回扣",width:"120"}}),a._v(" "),r("el-table-column",{attrs:{prop:"noKickBackPay",sortable:"",label:"未核销回扣",width:"120"},scopedSlots:a._u([{key:"default",fn:function(e){return[r("span",{domProps:{innerHTML:a._s(a._setTextColor(e.row.kickBackPay,e.row.hadKickBackPay,e.row.noKickBackPay,e.row.noKickBackPay))}})]}}])}),a._v(" "),r("el-table-column",{attrs:{prop:"hadKickBackPay",sortable:"",label:"已核销回扣",width:"120"},scopedSlots:a._u([{key:"default",fn:function(e){return[r("span",{domProps:{innerHTML:a._s(a._setTextColor(e.row.kickBackPay,e.row.hadKickBackPay,e.row.noKickBackPay,e.row.hadKickBackPay))}})]}}])}),a._v(" "),r("el-table-column",{attrs:{prop:"kickBackPayActual",sortable:"",label:"实际核销回扣",width:"120"}}),a._v(" "),r("el-table-column",{attrs:{prop:"transferPay",sortable:"",label:"中转费",width:"120"}}),a._v(" "),r("el-table-column",{attrs:{prop:"noTransferPay",sortable:"",label:"未核销中转费",width:"120"},scopedSlots:a._u([{key:"default",fn:function(e){return[r("span",{domProps:{innerHTML:a._s(a._setTextColor(e.row.transferPay,e.row.hadTransferPay,e.row.noTransferPay,e.row.noTransferPay))}})]}}])}),a._v(" "),r("el-table-column",{attrs:{prop:"hadTransferPay",sortable:"",label:"已核销中转费",width:"120"},scopedSlots:a._u([{key:"default",fn:function(e){return[r("span",{domProps:{innerHTML:a._s(a._setTextColor(e.row.transferPay,e.row.hadTransferPay,e.row.noTransferPay,e.row.hadTransferPay))}})]}}])}),a._v(" "),r("el-table-column",{attrs:{prop:"transferPayActual",sortable:"",label:"实际核销中转费",width:"120"}}),a._v(" "),r("el-table-column",{attrs:{prop:"unusualPay",sortable:"",label:"异动费用",width:"120"}}),a._v(" "),r("el-table-column",{attrs:{prop:"noUnusualPay",sortable:"",label:"未核销异动费用",width:"120"},scopedSlots:a._u([{key:"default",fn:function(e){return[r("span",{domProps:{innerHTML:a._s(a._setTextColor(e.row.unusualPay,e.row.hadUnusualPay,e.row.noUnusualPay,e.row.noUnusualPay))}})]}}])}),a._v(" "),r("el-table-column",{attrs:{prop:"hadUnusualPay",sortable:"",label:"已核销异动费用",width:"120"},scopedSlots:a._u([{key:"default",fn:function(e){return[r("span",{domProps:{innerHTML:a._s(a._setTextColor(e.row.unusualPay,e.row.hadUnusualPay,e.row.noUnusualPay,e.row.hadUnusualPay))}})]}}])}),a._v(" "),r("el-table-column",{attrs:{prop:"unusualPayActual",sortable:"",label:"实际核销异动费用",width:"120"}}),a._v(" "),r("el-table-column",{attrs:{prop:"exceptionPay",sortable:"",label:"异常理赔",width:"120"}}),a._v(" "),r("el-table-column",{attrs:{prop:"noExceptionPay",sortable:"",label:"未核销异常理赔",width:"120"}}),a._v(" "),r("el-table-column",{attrs:{prop:"noExceptionPay",sortable:"",label:"未核销异常理赔",width:"120"},scopedSlots:a._u([{key:"default",fn:function(e){return[r("span",{domProps:{innerHTML:a._s(a._setTextColor(e.row.exceptionPay,e.row.hadExceptionPay,e.row.noExceptionPay,e.row.noExceptionPay))}})]}}])}),a._v(" "),r("el-table-column",{attrs:{prop:"hadExceptionPay",sortable:"",label:"已核销异常理赔",width:"120"},scopedSlots:a._u([{key:"default",fn:function(e){return[r("span",{domProps:{innerHTML:a._s(a._setTextColor(e.row.exceptionPay,e.row.hadExceptionPay,e.row.noExceptionPay,e.row.hadExceptionPay))}})]}}])}),a._v(" "),r("el-table-column",{attrs:{prop:"pickPuPay",sortable:"",label:"实际提货费",width:"120"}}),a._v(" "),r("el-table-column",{attrs:{prop:"noPickPuPay",sortable:"",label:"未核销实际提货费",width:"120"},scopedSlots:a._u([{key:"default",fn:function(e){return[r("span",{domProps:{innerHTML:a._s(a._setTextColor(e.row.pickPuPay,e.row.hadPickPuPay,e.row.noPickPuPay,e.row.noPickPuPay))}})]}}])}),a._v(" "),r("el-table-column",{attrs:{prop:"hadPickPuPay",sortable:"",label:"已核销实际提货费",width:"120"},scopedSlots:a._u([{key:"default",fn:function(e){return[r("span",{domProps:{innerHTML:a._s(a._setTextColor(e.row.pickPuPay,e.row.hadPickPuPay,e.row.noPickPuPay,e.row.hadPickPuPay))}})]}}])}),a._v(" "),r("el-table-column",{attrs:{prop:"pickPuPayActual",sortable:"",label:"实际核销实际提货费",width:"120"}}),a._v(" "),r("el-table-column",{attrs:{prop:"othePay",sortable:"",label:"其他费用",width:"120"}}),a._v(" "),r("el-table-column",{attrs:{prop:"noOthePay",sortable:"",label:"未核销其他费用",width:"120"},scopedSlots:a._u([{key:"default",fn:function(e){return[r("span",{domProps:{innerHTML:a._s(a._setTextColor(e.row.othePay,e.row.hadOthePay,e.row.noOthePay,e.row.noOthePay))}})]}}])}),a._v(" "),r("el-table-column",{attrs:{prop:"hadOthePay",sortable:"",label:"已核销其他费用",width:"120"},scopedSlots:a._u([{key:"default",fn:function(e){return[r("span",{domProps:{innerHTML:a._s(a._setTextColor(e.row.othePay,e.row.hadOthePay,e.row.noOthePay,e.row.hadOthePay))}})]}}])}),a._v(" "),r("el-table-column",{attrs:{prop:"othePayActual",sortable:"",label:"实际核销其他费用",width:"120"}}),a._v(" "),r("el-table-column",{attrs:{prop:"deliveryPay",sortable:"",label:"终端送货费",width:"120"}}),a._v(" "),r("el-table-column",{attrs:{prop:"noDeliveryPay",sortable:"",label:"未核销终端送货费",width:"120"},scopedSlots:a._u([{key:"default",fn:function(e){return[r("span",{domProps:{innerHTML:a._s(a._setTextColor(e.row.deliveryPay,e.row.hadDeliveryPay,e.row.noDeliveryPay,e.row.noDeliveryPay))}})]}}])}),a._v(" "),r("el-table-column",{attrs:{prop:"hadDeliveryPay",sortable:"",label:"已核销终端送货费",width:"120"},scopedSlots:a._u([{key:"default",fn:function(e){return[r("span",{domProps:{innerHTML:a._s(a._setTextColor(e.row.deliveryPay,e.row.hadDeliveryPay,e.row.noDeliveryPay,e.row.hadDeliveryPay))}})]}}])}),a._v(" "),r("el-table-column",{attrs:{prop:"deliveryPayActual",sortable:"",label:"实际核销终端送货费",width:"120"}}),a._v(" "),r("el-table-column",{attrs:{prop:"shipFromCityName",sortable:"",label:"发站",width:"120"},scopedSlots:a._u([{key:"default",fn:function(e){return[a._v("\n          "+a._s(a._processTableSlot(e,"shipFromCityName"))+"\n        ")]}}])}),a._v(" "),r("el-table-column",{attrs:{prop:"shipToCityName",sortable:"",label:"到站",width:"120"},scopedSlots:a._u([{key:"default",fn:function(e){return[a._v("\n          "+a._s(a._processTableSlot(e,"shipToCityName"))+"\n        ")]}}])}),a._v(" "),r("el-table-column",{attrs:{prop:"cargoName",sortable:"",label:"货品名",width:"120"}}),a._v(" "),r("el-table-column",{attrs:{prop:"cargoAmount",sortable:"",label:"件数",width:"120"}}),a._v(" "),r("el-table-column",{attrs:{prop:"cargoWeight",sortable:"",label:"重量",width:"120"}}),a._v(" "),r("el-table-column",{attrs:{prop:"cargoVolume",sortable:"",label:"体积",width:"120"}}),a._v(" "),r("el-table-column",{attrs:{prop:"shipSenderUnit",sortable:"",label:"发货方",width:"120"}}),a._v(" "),r("el-table-column",{attrs:{prop:"shipSenderName",sortable:"",label:"发货人",width:"120"}}),a._v(" "),r("el-table-column",{attrs:{prop:"shipRemarks",sortable:"",label:"运单备注",width:"120"}})],1):a._e()],1)])},staticRenderFns:[]};t.a=r},pURq:function(e,t,a){"use strict";var r=a("pFYg"),l=a.n(r),o=a("woOf"),n=a.n(o),i=a("Dd8w"),s=a.n(i),c=a("bOdI"),h=a.n(c),u=a("NYxO"),d=(a("TsW9"),a("pAQG")),p=a("IcMT"),b=a("0xDb"),f=a("7nIZ"),m=a("+Noo"),y=a("0xDb");t.a={data:function(){var e;return e={showtable:!0,loading:!0,searchTime:[Object(b.parseTime)(new Date-5184e6),Object(b.parseTime)(new Date)],tablekey:0,tableRight:0,truckMessage:"",searchForm:{},incomePayType:"PAYABLE",paymentsType:1,settlementId:178},h()(e,"loading",!1),h()(e,"btnsize","mini"),h()(e,"selectedRight",[]),h()(e,"selectedLeft",[]),h()(e,"orgLeftTable",[]),h()(e,"countOrgLeftTable",[]),h()(e,"leftTable",[]),h()(e,"rightTable",[]),h()(e,"orgData",{left:[],right:[]}),h()(e,"arrLastPartActualFeeName",[]),h()(e,"arrLastPartNoFeeName",[]),h()(e,"arrLastPartFeeName",[]),h()(e,"arrNoPayName",[]),h()(e,"arrPayName",[]),h()(e,"arrPayNameActual",[]),e},props:{setLoadTable:{type:Object,default:function(){}},isModify:{type:Boolean,default:!1},countSuccessList:{type:Array,default:[]},countNum:{type:[Number,String]},activeName:{type:String,default:""},orgId:{type:[Number,String]},componentKey:{type:[Number,String]},fiOrderType:{type:[Number,String]}},computed:s()({},Object(u.mapGetters)(["otherinfo"])),components:{transferTable:p.a,querySelect:d.a,currentSearch:m.default},watch:{isModify:{handler:function(e,t){this.getList()},deep:!0},setLoadTable:{handler:function(e,t){e&&(this.orgData=n()({},e),this.getList())},deep:!0},countSuccessList:{handler:function(e,t){this.initCount(e,t)},deep:!0},countNum:{handler:function(e,t){return e},deep:!0},activeName:{handler:function(e,t){var a=this;"second"===e&&(this.changeTableKey(),this.showtable=!1,this.getList(),this.$nextTick(function(){a.showtable=!0}))},deep:!0},fiOrderType:{handler:function(e,t){},deep:!0},orgId:function(){this.getPayName(),this.getList()}},activated:function(){},methods:{getPayName:function(){if(0!==this.rightTable.length){for(var e in this.arrNoPayName=[],this.rightTable[0])0===e.indexOf("no")&&this.arrNoPayName.push(e);for(var t in this.arrPayName=[],this.arrNoPayName){var a=this.arrNoPayName[t].substring(2,3).toLowerCase()+this.arrNoPayName[t].substring(3);this.arrPayName.push(a)}for(var r in this.arrhadPayName=[],this.arrNoPayName){var o="had"+this.arrNoPayName[r].substring(2);this.arrhadPayName.push(o)}for(var l in this.arrPayNameActual=[],this.arrPayName){var n=this.arrPayName[l]+"Actual";this.arrPayNameActual.push(n)}var i={arrPayName:this.arrPayName,arrNoPayName:this.arrNoPayName,arrhadPayName:this.arrhadPayName,arrPayNameActual:this.arrPayNameActual};this.$emit("feeName",i)}},initCount:function(e,t){var o=this;if(console.log("============后台返回的智能运单=============\n",e),this.arrLastPartActualFeeName=[],this.arrLastPartNoFeeName=[],this.arrLastPartFeeName=[],this.leftTable=[],this.rightTable=Object(b.objectMerge2)([],e),this.$emit("loadTable",this.rightTable),0===this.rightTable.length)return this.$message({type:"warning",message:"无符合智能核销条件的运单。"}),this.leftTable=Object(b.objectMerge2)([],this.orgLeftTable),!1;this.leftTable=Object(b.objectMerge2)([],this.orgLeftTable).filter(function(t,e){return-1===o.rightTable.findIndex(function(e){return t.shipSn===e.shipSn})}),0!==this.leftTable.length&&(this.leftTable=this.uniqueArray(this.leftTable,"shipSn")),this.$emit("loadTable",this.rightTable),this.getPayName();this.arrPayNameActual.forEach(function(e,t){var a=o.rightTable[o.rightTable.length-1][e],r=o.rightTable[o.rightTable.length-1][o.arrNoPayName[t]];r!==a&&""!==r&&null!==r&&""!==a&&null!==a&&(void 0===r?"undefined":l()(r))===(void 0===a?"undefined":l()(a))&&(!0,o.arrLastPartFeeName.push(o.arrPayName[t]),o.arrLastPartActualFeeName.push(e),o.arrLastPartNoFeeName.push(o.arrNoPayName[t]))}),this.rightTable[this.rightTable.length-1].noShipFeeTotal!==this.rightTable[this.rightTable.length-1].shipFeeTotalActual&&(this.$notify.info({title:"提示",message:"最后一条数据实际只需支付部分未核销费用，多余的需要返回到左边列表！"}),this.leftTable.push(Object(b.objectMerge2)([],this.rightTable[this.rightTable.length-1])),this.arrLastPartFeeName.forEach(function(e){var t="no"+e.substring(0,1).toUpperCase()+e.substring(1),a=e+"Actual";o.leftTable[o.leftTable.length-1][a]=o.rightTable[o.rightTable.length-1][t]-o.rightTable[o.rightTable.length-1][a]})),this.$emit("loadTable",this.rightTable),this.countOrgLeftTable=Object(b.objectMerge2)([],this.leftTable)},getList:function(){var t=this;this.leftTable=this.$options.data().leftTable,this.rightTable=this.$options.data().rightTable,this.orgLeftTable=this.$options.data().orgLeftTable,this.countOrgLeftTable=this.$options.data().countOrgLeftTable;var e={};this.isModify?(this.leftTable=this.orgData.left,this.rightTable=this.orgData.right,this.orgLeftTable=this.orgData.left,this.countOrgLeftTable=this.orgData.left,this.$emit("loadTable",this.rightTable)):(this.$set(e,"orgId",this.orgId),this.$set(e,"paymentsType",this.paymentsType),this.$set(e,"settlementId",this.settlementId),this.$set(e,"startTime",Object(b.parseTime)(this.searchTime[0],"{y}-{m}-{d} ")+"00:00:00"),this.$set(e,"endTime",Object(b.parseTime)(this.searchTime[1],"{y}-{m}-{d} ")+"23:59:59"),this.$set(e,"autoTotalAmount",""),this.$set(e,"feeId",""),this.$set(e,"fiOrderType",this.fiOrderType),Object(f.e)(e).then(function(e){t.loading=!1,t.leftTable=e,t.orgLeftTable=e,t.countOrgLeftTable=e,t.$emit("loadTable",t.rightTable)}).catch(function(e){t.loading=!1,t._handlerCatchMsg(e)}),e={})},getSearch:function(e){this.leftTable=e},clickDetailsRight:function(e){this.$refs.multipleTableRight.toggleRowSelection(e)},clickDetailsLeft:function(e){this.$refs.multipleTableLeft.toggleRowSelection(e)},getSelectionRight:function(e){this.selectedRight=e},getSelectionLeft:function(e){this.selectedLeft=e},changeTableKey:function(){this.tablekey=(new Date).getTime(),this.tablekeyRight=(new Date).getTime()},doAction:function(e){switch(e){case"goLeft":this.goLeft();break;case"goRight":this.goRight()}},uniqueArray:function(e,t,a){for(var r=[e[0]],o=1;o<e.length;o++){for(var l=e[o],n=!1,i=0;i<r.length;i++)if(l[t]===r[i][t]){if(a)for(var s in a)r[i][a[s]]=y.tmsMath._add(l[a[s]],r[i][a[s]]);n=!0;break}n||r.push(l)}return r},goLeft:function(){var a=this;0===this.selectedRight.length?this.$message({type:"warning",message:"请在左边表格选择数据"}):(this.selectedRight.forEach(function(t,e){t.loadAmount=t.repertoryAmount,t.loadWeight=t.repertoryWeight,t.loadVolume=t.repertoryVolume,a.leftTable=Object(b.objectMerge2)([],a.leftTable).filter(function(e){return e.shipSn!==t.shipSn}),a.rightTable.push(t),a.countOrgLeftTable=Object(b.objectMerge2)([],a.countOrgLeftTable).filter(function(e){return e.shipSn!==t.shipSn})}),this.rightTable=this.uniqueArray(Object(b.objectMerge2)(this.rightTable),"shipSn",this.arrLastPartActualFeeName),this.selectedRight=[],this.getPayName(),this.$emit("loadTable",this.rightTable))},goRight:function(){var a=this;0===this.selectedLeft.length?this.$message({type:"warning",message:"请在右边表格 选择数据"}):(this.selectedLeft.forEach(function(t,e){a.leftTable.push(t),a.countOrgLeftTable.push(t),a.rightTable=Object(b.objectMerge2)([],a.rightTable).filter(function(e){return e.shipSn!==t.shipSn})}),this.leftTable=this.uniqueArray(Object(b.objectMerge2)(this.leftTable),"shipSn",this.arrLastPartActualFeeName),this.countOrgLeftTable=this.uniqueArray(Object(b.objectMerge2)(this.countOrgLeftTable),"shipSn",this.arrLastPartActualFeeName),this.selectedLeft=[],this.getPayName(),this.$emit("loadTable",this.rightTable))},addItem:function(e,t){var a=this;clearTimeout(this.addTimer),this.addTimer=setTimeout(function(){a.selectedRight=[],a.selectedRight[t]=e,a.doAction("goLeft")},50)},minusItem:function(e,t){var a=this;clearTimeout(this.minusTimer),this.minusTimer=setTimeout(function(){a.selectedLeft=[],a.selectedLeft[t]=e,a.doAction("goRight")},50)},addALLList:function(){this.selectedRight=n()([],this.leftTable),this.doAction("goLeft")},minusAllList:function(){this.selectedLeft=n()([],this.rightTable),this.doAction("goRight")},dclickAddItem:function(e,t){this.selectedRight=[],this.selectedRight.push(e),this.doAction("goLeft")},dclickMinusItem:function(e,t){this.selectedLeft=[],this.selectedLeft.push(e),this.doAction("goRight")},getSumRight:function(e){return Object(y.getSummaries)(e,["shipFeeTotal","kickBackPay","transferPay","unusualPay","exceptionPay","pickPuPay","othePay","cargoAmount|","cargoWeight|","cargoVolume|","shipFeeTotalActual","noKickBackPay","hadKickBackPay","noTransferPay","hadTransferPay","noUnusualPay","hadUnusualPay","noExceptionPay","hadExceptionPay","noPickPuPay","hadPickPuPay","noOthePay","hadOthePay","noShipFeeTotal","hadShipFeeTotal","deliveryPay","deliveryPayActual","noDeliveryPay","hadDeliveryPay"])},getSumLeft:function(e){return Object(y.getSummaries)(e,["shipFeeTotal","kickBackPay","transferPay","unusualPay","exceptionPay","pickPuPay","othePay","cargoAmount|","cargoWeight|","cargoVolume|","shipFeeTotalActual","cargoVolume","noKickBackPay","hadKickBackPay","noTransferPay","hadTransferPay","noUnusualPay","hadUnusualPay","noExceptionPay","hadExceptionPay","noPickPuPay","hadPickPuPay","noOthePay","hadOthePay","noShipFeeTotal","hadShipFeeTotal","kickBackPayActual","transferPayActual","unusualPayActual","exceptionPayActual","pickPuPayActual","othePayActual","deliveryPay","deliveryPayActual","noDeliveryPay","hadDeliveryPay"])}}}},"tLv/":function(e,t){}});