webpackJsonp([57,254,255,256],{"+zEK":function(e,t,i){"use strict";var a={render:function(){var a=this,e=a.$createElement,o=a._self._c||e;return o("div",{directives:[{name:"loading",rawName:"v-loading",value:a.loading,expression:"loading"}],staticClass:"detailTables"},[o("el-form",{staticClass:"detailTables_info",attrs:{inline:"","label-width":"100"},model:{value:a.info,callback:function(e){a.info=e},expression:"info"}},[o("table",[o("tbody",[o("tr",[o("th",[a._v("到达网点")]),a._v(" "),o("td",[o("el-input",{attrs:{size:a.btnsize,disabled:""},model:{value:a.info.arriveOrgName,callback:function(e){a.$set(a.info,"arriveOrgName",e)},expression:"info.arriveOrgName"}})],1),a._v(" "),o("th",[a._v("司机名称")]),a._v(" "),o("td",[o("el-input",{attrs:{size:a.btnsize,disabled:""},model:{value:a.info.dirverName,callback:function(e){a.$set(a.info,"dirverName",e)},expression:"info.dirverName"}})],1),a._v(" "),o("th",[a._v("司机电话")]),a._v(" "),o("td",[o("el-input",{attrs:{size:a.btnsize,disabled:""},model:{value:a.info.dirverMobile,callback:function(e){a.$set(a.info,"dirverMobile",e)},expression:"info.dirverMobile"}})],1)]),a._v(" "),o("tr",[o("th",[a._v("可载重量")]),a._v(" "),o("td",[o("el-input",{attrs:{size:a.btnsize,disabled:""},model:{value:a.info.truckLoad,callback:function(e){a.$set(a.info,"truckLoad",e)},expression:"info.truckLoad"}})],1),a._v(" "),o("th",[a._v("车牌号码")]),a._v(" "),o("td",[o("el-input",{attrs:{size:a.btnsize,disabled:""},model:{value:a.info.truckIdNumber,callback:function(e){a.$set(a.info,"truckIdNumber",e)},expression:"info.truckIdNumber"}})],1),a._v(" "),o("th",[a._v("分摊方式")]),a._v(" "),o("td",[o("el-input",{attrs:{size:a.btnsize,disabled:""},model:{value:a.info.apportionType,callback:function(e){a.$set(a.info,"apportionType",e)},expression:"info.apportionType"}})],1)]),a._v(" "),o("tr",[o("th",[a._v("可载体积")]),a._v(" "),o("td",[o("el-input",{attrs:{size:a.btnsize,disabled:""},model:{value:a.info.truckVolume,callback:function(e){a.$set(a.info,"truckVolume",e)},expression:"info.truckVolume"}})],1),a._v(" "),o("th",[a._v("配载日期")]),a._v(" "),o("td",[o("el-input",{attrs:{value:a._f("parseTime")(a.info.loadTime,"{y}-{m}-{d} {h}:{i}:{s}"),size:a.btnsize,disabled:""}})],1),a._v(" "),o("th",[a._v("预计到达时间")]),a._v(" "),o("td",[o("el-input",{attrs:{value:a._f("parseTime")(a.info.planArrivedTime,"{y}-{m}-{d} {h}:{i}:{s}"),size:a.btnsize,disabled:""}})],1)]),a._v(" "),o("tr",[o("th",[a._v("备注")]),a._v(" "),o("td",{attrs:{colspan:"5"}},[o("el-input",{attrs:{size:a.btnsize,disabled:"",maxlength:300},model:{value:a.info.remark,callback:function(e){a.$set(a.info,"remark",e)},expression:"info.remark"}})],1)])])])]),a._v(" "),o("table",{staticClass:"detailTables_info_artery"},[a._m(0),a._v(" "),o("tbody",[o("tr",[o("td",[a._v(a._s(a.info.nowpayCarriage))]),a._v(" "),o("td",[a._v(a._s(a.info.nowpayOilCard))]),a._v(" "),o("td",[a._v(a._s(a.info.backpayCarriage))]),a._v(" "),o("td",[a._v(a._s(a.info.backpayOilCard))]),a._v(" "),o("td",[a._v(a._s(a.info.arrivepayCarriage))]),a._v(" "),o("td",[a._v(a._s(a.info.arrivepayOilCard))]),a._v(" "),o("td",[a._v(a._s(a.info.carloadInsuranceFee))]),a._v(" "),o("td",[a._v(a._s(a.info.leaveHandlingFee))]),a._v(" "),o("td",[a._v(a._s(a.info.leaveOtherFee))]),a._v(" "),o("td",[a._v(a._s(a.info.arriveHandlingFee))]),a._v(" "),o("td",[a._v(a._s(a.info.arriveOtherFee))])])])]),a._v(" "),o("div",{staticClass:"tab_infos"},[o("div",{staticClass:"btns_box"},[o("el-button",{staticClass:"table_setup",attrs:{type:"primary",size:a.btnsize,icon:"el-icon-setting",plain:""},on:{click:a.setTable}},[a._v("表格设置")]),a._v(" "),o("el-button",{staticClass:"table_setup",attrs:{type:"success",size:a.btnsize,icon:"el-icon-setting",plain:""},on:{click:function(e){a.doAction("export")}}},[a._v("导出清单")]),a._v(" "),o("el-button",{staticClass:"table_setup",attrs:{type:"success",size:a.btnsize,icon:"el-icon-setting",plain:""},on:{click:function(e){a.doAction("print")}}},[a._v("打印清单")])],1),a._v(" "),o("div",{staticClass:"info_tab"},[o("el-table",{ref:"multipleTable",staticStyle:{height:"100%"},attrs:{data:a.detailList,stripe:"",border:"",height:"100%","default-sort":{prop:"id",order:"ascending"},"tooltip-effect":"dark"},on:{"row-click":a.clickDetails,"selection-change":a.getSelection}},[o("el-table-column",{attrs:{fixed:"",sortable:"",type:"selection",width:"50"}}),a._v(" "),a._l(a.tableColumn,function(i){return[i.slot?o("el-table-column",{key:i.id,attrs:{fixed:i.fixed,sortable:"",label:i.label,width:i.width},scopedSlots:a._u([{key:"default",fn:function(t){return[i.click?o("span",{staticClass:"clickitem",domProps:{innerHTML:a._s(i.slot(t))},on:{click:function(e){e.stopPropagation(),i.click(t)}}}):o("span",{domProps:{innerHTML:a._s(i.slot(t))}})]}}])}):o("el-table-column",{key:i.id,attrs:{fixed:i.fixed,sortable:"",label:i.label,prop:i.prop,width:i.width}})]})],2)],1)]),a._v(" "),o("TableSetup",{attrs:{popVisible:a.setupTableVisible,columns:a.tableColumn},on:{close:function(e){a.setupTableVisible=!1},success:a.setColumn}})],1)},staticRenderFns:[function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("thead",[i("tr",[i("th",[e._v("现付车费(元)")]),e._v(" "),i("th",[e._v("现付油卡(元)")]),e._v(" "),i("th",[e._v("回付车费(元)")]),e._v(" "),i("th",[e._v("回付油卡(元)")]),e._v(" "),i("th",[e._v("到付车费(元)")]),e._v(" "),i("th",[e._v("到付油卡(元)")]),e._v(" "),i("th",[e._v("整车保险费(元)")]),e._v(" "),i("th",[e._v("发站装卸费(元)")]),e._v(" "),i("th",[e._v("发站其他费(元)")]),e._v(" "),i("th",[e._v("到站装卸费(元)")]),e._v(" "),i("th",[e._v("到站其他费(元)")])])])}]};t.a=a},"01nq":function(e,t,i){"use strict";t.e=function(e){return a.b.post("/api-order/order/track/v1/list/",e).then(function(e){return e.data||{list:[],totalCount:0}})},t.f=function(e){return a.b.post("/api-order/order/track/v1/transferList/",e).then(function(e){return e.data||{list:[],totalCount:0}})},t.b=function(e){return a.b.get("/api-order/order/track/v1/getLoadTrack/"+e).then(function(e){return e.data})},t.a=function(e){return a.b.delete("/api-order/order/track/v1/"+e).then(function(e){return e.data})},t.d=function(e){return a.b.post("/api-order/order/track/v1/insertTrack/",e).then(function(e){return e.data})},t.g=function(e){return a.b.put("/api-order/order/track/v1/updateById/",e).then(function(e){return e.data})},t.c=function(e){return a.b.get("/api-order/order/load/v1/selectLoadDetailList/?loadId="+e).then(function(e){return e.data})};var a=i("Vo7i")},"1A72":function(e,t){},"3TtR":function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=i("UxYz"),o=i("SJFH");var l=function(e){i("ufrc")},s=i("VU/8")(a.a,o.a,l,null,null);t.default=s.exports},"46Pd":function(e,t,i){"use strict";var a=i("TsW9"),o=i("puNT"),l=i("UQm2");t.a={components:{TableSetup:o.a},props:{info:{type:Object,default:{}},isShow:{type:Boolean,default:!1}},data:function(){return{btnsize:"mini",setupTableVisible:!1,loading:!0,loadId:"",detailList:[],selected:[],query:{arriveOrgid:0,batchNo:"",batchTypeId:0,departureEndTime:"",departureStartTime:"",dirverName:"",loadEndTime:"",loadId:0,loadStartTime:"",loadTypeId:0,orgId:0,truckIdNumber:""},tableColumn:[{label:"运单号",prop:"shipSn",width:"130",fixed:!0},{label:"开单网点",prop:"shipFromOrgName",width:"130",fixed:!1},{label:"配载件数",prop:"loadAmount",width:"120",fixed:!1},{label:"配载重量",prop:"loadWeight",width:"120",fixed:!1},{label:"配载体积",prop:"loadVolume",width:"120",fixed:!1},{label:"库存件数",prop:"repertoryAmount",width:"120",fixed:!1},{label:"库存重量",prop:"repertoryWeight",width:"120",fixed:!1},{label:"库存体积",prop:"repertoryVolume",width:"120",fixed:!1},{label:"运单件数",prop:"cargoAmount",width:"120",fixed:!1},{label:"运单重量",prop:"cargoWeight",width:"120",fixed:!1},{label:"运单体积",prop:"cargoVolume",width:"120",fixed:!1},{label:"发站",prop:"shipFromCityName",width:"120",fixed:!1},{label:"到站",prop:"shipToCityName",width:"120",fixed:!1},{label:"发货人",prop:"shipSenderName",width:"120",fixed:!1},{label:"收货人",prop:"shipReceiverName",width:"120",fixed:!1},{label:"收货人电话",prop:"shipReceiverMobile",width:"120",fixed:!1},{label:"货品名",prop:"cargoName",width:"120",fixed:!1},{label:"货号",prop:"shipGoodsSn",width:"120",fixed:!1},{label:"运单备注",prop:"shipRemarks",width:"120",fixed:!1}]}},watch:{isShow:{handler:function(e,t){e&&this.fecthSelectLoadList()},immediate:!0},info:function(e){e&&this.fecthSelectLoadList()}},methods:{setTable:function(){this.setupTableVisible=!0},fecthSelectLoadList:function(){this.getLoadTrack()},getSelection:function(e){this.selected=e},doAction:function(e){switch(e){case"print":Object(l.d)({data:this.selected.length?this.selected:this.detailList,columns:this.tableColumn});break;case"export":Object(l.g)({data:this.selected.length?this.selected:this.detailList,columns:this.tableColumn,name:"在途跟踪"})}},clickDetails:function(e){this.$refs.multipleTable.toggleRowSelection(e)},getLoadTrack:function(){var t=this;this.loading=!0,this.loadId=this.info.id,Object(a.d)(this.loadId).then(function(e){t.detailList=e.data,t.loading=!1}).catch(function(e){t.loading=!1,t._handlerCatchMsg(e)})},setColumn:function(e){this.tableColumn=e,this.tablekey=Math.random()}}}},"8vYc":function(e,t){},F5BD:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=i("46Pd"),o=i("lIxA");var l=function(e){i("8vYc")},s=i("VU/8")(a.a,o.a,l,null,null);t.default=s.exports},NX9x:function(e,t){},OdPB:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=i("nN/X"),o=i("ritI");var l=function(e){i("1A72")},s=i("VU/8")(a.a,o.a,l,null,null);t.default=s.exports},P0Fm:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=i("gnv1"),o=i("+zEK");var l=function(e){i("NX9x")},s=i("VU/8")(a.a,o.a,l,null,null);t.default=s.exports},SJFH:function(e,t,i){"use strict";var a={render:function(){var a=this,e=a.$createElement,o=a._self._c||e;return o("div",{directives:[{name:"loading",rawName:"v-loading",value:a.loading,expression:"loading"}],staticClass:"detailTables"},[o("el-form",{staticClass:"detailTables_info",attrs:{inline:"","label-width":"100"},model:{value:a.info,callback:function(e){a.info=e},expression:"info"}},[o("table",[o("tbody",[o("tr",[o("th",[a._v("到达网点")]),a._v(" "),o("td",[o("el-input",{attrs:{size:a.btnsize,disabled:""},model:{value:a.info.arriveOrgName,callback:function(e){a.$set(a.info,"arriveOrgName",e)},expression:"info.arriveOrgName"}})],1),a._v(" "),o("th",[a._v("司机名称")]),a._v(" "),o("td",[o("el-input",{attrs:{size:a.btnsize,disabled:""},model:{value:a.info.dirverName,callback:function(e){a.$set(a.info,"dirverName",e)},expression:"info.dirverName"}})],1),a._v(" "),o("th",[a._v("司机电话")]),a._v(" "),o("td",[o("el-input",{attrs:{size:a.btnsize,disabled:""},model:{value:a.info.dirverMobile,callback:function(e){a.$set(a.info,"dirverMobile",e)},expression:"info.dirverMobile"}})],1)]),a._v(" "),o("tr",[o("th",[a._v("车牌号码")]),a._v(" "),o("td",[o("el-input",{attrs:{size:a.btnsize,disabled:""},model:{value:a.info.truckIdNumber,callback:function(e){a.$set(a.info,"truckIdNumber",e)},expression:"info.truckIdNumber"}})],1),a._v(" "),o("th",[a._v("短驳费")]),a._v(" "),o("td",[o("el-input",{attrs:{size:a.btnsize,disabled:""},model:{value:a.info.shortFee,callback:function(e){a.$set(a.info,"shortFee",e)},expression:"info.shortFee"}})],1),a._v(" "),o("th",[a._v("分摊方式")]),a._v(" "),o("td",[o("el-input",{attrs:{size:a.btnsize,disabled:""},model:{value:a.info.apportionType,callback:function(e){a.$set(a.info,"apportionType",e)},expression:"info.apportionType"}})],1)]),a._v(" "),o("tr",[o("th",[a._v("可载体积")]),a._v(" "),o("td",[o("el-input",{attrs:{size:a.btnsize,disabled:""},model:{value:a.info.truckVolume,callback:function(e){a.$set(a.info,"truckVolume",e)},expression:"info.truckVolume"}})],1),a._v(" "),o("th",[a._v("短驳日期")]),a._v(" "),o("td",[o("el-input",{attrs:{value:a._f("parseTime")(a.info.loadTime,"{y}-{m}-{d} {h}:{i}:{s}"),size:a.btnsize,disabled:""}})],1),a._v(" "),o("th",[a._v("要求到达时间")]),a._v(" "),o("td",[o("el-input",{attrs:{value:a._f("parseTime")(a.info.requireArrivedTime,"{y}-{m}-{d} {h}:{i}:{s}"),size:a.btnsize,disabled:""}})],1)]),a._v(" "),o("tr",[o("th",[a._v("可载重量")]),a._v(" "),o("td",[o("el-input",{attrs:{size:a.btnsize,disabled:""},model:{value:a.info.truckLoad,callback:function(e){a.$set(a.info,"truckLoad",e)},expression:"info.truckLoad"}})],1),a._v(" "),o("th",[a._v("备注")]),a._v(" "),o("td",{attrs:{colspan:"3"}},[o("el-input",{attrs:{size:a.btnsize,disabled:"",maxlength:300},model:{value:a.info.remark,callback:function(e){a.$set(a.info,"remark",e)},expression:"info.remark"}})],1)])])])]),a._v(" "),o("div",{staticClass:"tab_infos"},[o("div",{staticClass:"btns_box"},[o("el-button",{staticClass:"table_setup",attrs:{type:"primary",size:a.btnsize,icon:"el-icon-setting",plain:""},on:{click:a.setTable}},[a._v("表格设置")]),a._v(" "),o("el-button",{staticClass:"table_setup",attrs:{type:"success",size:a.btnsize,icon:"el-icon-setting",plain:""},on:{click:function(e){a.doAction("export")}}},[a._v("导出清单")]),a._v(" "),o("el-button",{staticClass:"table_setup",attrs:{type:"success",size:a.btnsize,icon:"el-icon-setting",plain:""},on:{click:function(e){a.doAction("print")}}},[a._v("打印清单")])],1),a._v(" "),o("div",{staticClass:"info_tab"},[o("el-table",{ref:"multipleTable",staticStyle:{height:"100%"},attrs:{data:a.detailList,stripe:"",border:"",height:"100%","default-sort":{prop:"id",order:"ascending"},"tooltip-effect":"dark"},on:{"row-click":a.clickDetails,"selection-change":a.getSelection}},[o("el-table-column",{attrs:{fixed:"",sortable:"",type:"selection",width:"50"}}),a._v(" "),a._l(a.tableColumn,function(i){return[i.slot?o("el-table-column",{key:i.id,attrs:{fixed:i.fixed,sortable:"",label:i.label,width:i.width},scopedSlots:a._u([{key:"default",fn:function(t){return[i.click?o("span",{staticClass:"clickitem",domProps:{innerHTML:a._s(i.slot(t))},on:{click:function(e){e.stopPropagation(),i.click(t)}}}):o("span",{domProps:{innerHTML:a._s(i.slot(t))}})]}}])}):o("el-table-column",{key:i.id,attrs:{fixed:i.fixed,sortable:"",label:i.label,prop:i.prop,width:i.width}})]})],2)],1)]),a._v(" "),o("TableSetup",{attrs:{popVisible:a.setupTableVisible,columns:a.tableColumn},on:{close:function(e){a.setupTableVisible=!1},success:a.setColumn}})],1)},staticRenderFns:[]};t.a=a},TsW9:function(e,t,i){"use strict";t.a=function(e,t){return a.b.get("/api-order/order/load/v1/getBatchNo/",{params:{orgId:e,loadTypeId:t}})},t.h=function(e){return a.b.post("/api-order/order/load/v1/",e)},t.i=function(e){return a.b.put("/api-order/order/load/v1/",e)},t.c=function(e){return a.b.get("/api-order/order/load/v1/selectAddLoadRepertoryList/",{params:{orgId:e}})},t.f=function(e,t){return a.b.get("/api-order/order/load/v1/selectUpdateLoadRepertoryList/?orgId="+e+"&loadId="+t)},t.g=function(e,t){return a.b.get("/api-order/order/load/v1/selectUpdateLoadDetailList/?orgId="+e+"&loadId="+t)},t.d=function(e){return a.b.get("/api-order/order/load/v1/selectLoadDetailList/",{params:{loadId:e}})},t.e=function(){return a.b.get("/api-system/system/trunk/v1/findCarAndDriver/").then(function(e){return e})},t.b=function(){return a.b.get("/api-system/system/trunk/v1/findDriverAndCar/").then(function(e){return e})};var a=i("Vo7i")},UxYz:function(e,t,i){"use strict";var a=i("TsW9"),o=i("puNT"),l=i("UQm2");t.a={components:{TableSetup:o.a},props:{info:{type:Object,default:{}},isShow:{type:Boolean,default:!1}},data:function(){return{loading:!0,btnsize:"mini",setupTableVisible:!1,loadId:"",detailList:[],selected:[],query:{arriveOrgid:0,batchNo:"",batchTypeId:0,departureEndTime:"",departureStartTime:"",dirverName:"",loadEndTime:"",loadId:0,loadStartTime:"",loadTypeId:0,orgId:0,truckIdNumber:""},tableColumn:[{label:"运单号",prop:"shipSn",width:"130",fixed:!0},{label:"开单网点",prop:"shipFromOrgName",width:"130",fixed:!1},{label:"配载件数",prop:"loadAmount",width:"120",fixed:!1},{label:"配载重量",prop:"loadWeight",width:"120",fixed:!1},{label:"配载体积",prop:"loadVolume",width:"120",fixed:!1},{label:"库存件数",prop:"repertoryAmount",width:"120",fixed:!1},{label:"库存重量",prop:"repertoryWeight",width:"120",fixed:!1},{label:"库存体积",prop:"repertoryVolume",width:"120",fixed:!1},{label:"运单件数",prop:"cargoAmount",width:"120",fixed:!1},{label:"运单重量",prop:"cargoWeight",width:"120",fixed:!1},{label:"运单体积",prop:"cargoVolume",width:"120",fixed:!1},{label:"发站",prop:"shipFromCityName",width:"120",fixed:!1},{label:"到站",prop:"shipToCityName",width:"120",fixed:!1},{label:"发货人",prop:"shipSenderName",width:"120",fixed:!1},{label:"收货人",prop:"shipReceiverName",width:"120",fixed:!1},{label:"收货人电话",prop:"shipReceiverMobile",width:"120",fixed:!1},{label:"货品名",prop:"cargoName",width:"120",fixed:!1},{label:"货号",prop:"shipGoodsSn",width:"120",fixed:!1},{label:"运单备注",prop:"shipRemarks",width:"120",fixed:!1}]}},watch:{isShow:{handler:function(e,t){e&&this.fecthSelectLoadList()},immediate:!0},info:function(e){e&&this.fecthSelectLoadList()}},methods:{setTable:function(){this.setupTableVisible=!0},fecthSelectLoadList:function(){this.getLoadTrack()},getSelection:function(e){this.selected=e},doAction:function(e){switch(e){case"print":Object(l.d)({data:this.selected.length?this.selected:this.detailList,columns:this.tableColumn});break;case"export":Object(l.g)({data:this.selected.length?this.selected:this.detailList,columns:this.tableColumn,name:"在途跟踪"})}},clickDetails:function(e){this.$refs.multipleTable.toggleRowSelection(e)},getLoadTrack:function(){var t=this;this.loading=!0,this.loadId=this.info.id,Object(a.d)(this.loadId).then(function(e){t.detailList=e.data,t.loading=!1}).catch(function(e){t.loading=!1,t._handlerCatchMsg(e)})},setColumn:function(e){this.tableColumn=e,this.tablekey=Math.random()}}}},gnv1:function(e,t,i){"use strict";var a=i("TsW9"),o=i("puNT"),l=i("UQm2");t.a={components:{TableSetup:o.a},props:{info:{type:Object,default:{}},isShow:{type:Boolean,default:!1}},data:function(){return{btnsize:"mini",setupTableVisible:!1,loading:!0,loadId:"",detailList:[],selected:[],query:{arriveOrgid:0,batchNo:"",batchTypeId:0,departureEndTime:"",departureStartTime:"",dirverName:"",loadEndTime:"",loadId:0,loadStartTime:"",loadTypeId:0,orgId:0,truckIdNumber:""},tableColumn:[{label:"运单号",prop:"shipSn",width:"130",fixed:!0},{label:"开单网点",prop:"shipFromOrgName",width:"130",fixed:!1},{label:"配载件数",prop:"loadAmount",width:"120",fixed:!1},{label:"配载重量",prop:"loadWeight",width:"120",fixed:!1},{label:"配载体积",prop:"loadVolume",width:"120",fixed:!1},{label:"库存件数",prop:"repertoryAmount",width:"120",fixed:!1},{label:"库存重量",prop:"repertoryWeight",width:"120",fixed:!1},{label:"库存体积",prop:"repertoryVolume",width:"120",fixed:!1},{label:"运单件数",prop:"cargoAmount",width:"120",fixed:!1},{label:"运单重量",prop:"cargoWeight",width:"120",fixed:!1},{label:"运单体积",prop:"cargoVolume",width:"120",fixed:!1},{label:"发站",prop:"shipFromCityName",width:"120",fixed:!1},{label:"到站",prop:"shipToCityName",width:"120",fixed:!1},{label:"发货人",prop:"shipSenderName",width:"120",fixed:!1},{label:"收货人",prop:"shipReceiverName",width:"120",fixed:!1},{label:"收货人电话",prop:"shipReceiverMobile",width:"120",fixed:!1},{label:"货品名",prop:"cargoName",width:"120",fixed:!1},{label:"货号",prop:"shipGoodsSn",width:"120",fixed:!1},{label:"运单备注",prop:"shipRemarks",width:"120",fixed:!1}]}},watch:{isShow:{handler:function(e,t){e&&(this.loading=!0,this.fecthSelectLoadList())},immediate:!0},info:function(e){e&&this.fecthSelectLoadList()}},methods:{setTable:function(){this.setupTableVisible=!0},fecthSelectLoadList:function(){this.getLoadTrack()},getSelection:function(e){this.selected=e},doAction:function(e){switch(e){case"print":Object(l.d)({data:this.selected.length?this.selected:this.detailList,columns:this.tableColumn});break;case"export":Object(l.g)({data:this.selected.length?this.selected:this.detailList,columns:this.tableColumn,name:"在途跟踪"})}},clickDetails:function(e){this.$refs.multipleTable.toggleRowSelection(e)},getLoadTrack:function(){var t=this;this.loading=!0,this.loadId=this.info.id,Object(a.d)(this.loadId).then(function(e){t.detailList=e.data,t.loading=!1}).catch(function(e){t.loading=!1,t._handlerCatchMsg(e)})},setColumn:function(e){this.tableColumn=e,this.tablekey=Math.random()}}}},lIxA:function(e,t,i){"use strict";var a={render:function(){var a=this,e=a.$createElement,o=a._self._c||e;return o("div",{directives:[{name:"loading",rawName:"v-loading",value:a.loading,expression:"loading"}],staticClass:"detailTables"},[o("el-form",{staticClass:"detailTables_info",attrs:{inline:"","label-width":"100"},model:{value:a.info,callback:function(e){a.info=e},expression:"info"}},[o("table",[o("tbody",[o("tr",[o("th",[a._v("司机名称")]),a._v(" "),o("td",[o("el-input",{attrs:{size:a.btnsize,disabled:""},model:{value:a.info.dirverName,callback:function(e){a.$set(a.info,"dirverName",e)},expression:"info.dirverName"}})],1),a._v(" "),o("th",[a._v("司机电话")]),a._v(" "),o("td",[o("el-input",{attrs:{size:a.btnsize,disabled:""},model:{value:a.info.dirverMobile,callback:function(e){a.$set(a.info,"dirverMobile",e)},expression:"info.dirverMobile"}})],1),a._v(" "),o("th",[a._v("车牌号码")]),a._v(" "),o("td",[o("el-input",{attrs:{size:a.btnsize,disabled:""},model:{value:a.info.truckIdNumber,callback:function(e){a.$set(a.info,"truckIdNumber",e)},expression:"info.truckIdNumber"}})],1)]),a._v(" "),o("tr",[o("th",[a._v("送货费")]),a._v(" "),o("td",[o("el-input",{attrs:{size:a.btnsize,disabled:""},model:{value:a.info.deliveryFee,callback:function(e){a.$set(a.info,"deliveryFee",e)},expression:"info.deliveryFee"}})],1),a._v(" "),o("th",[a._v("分摊方式")]),a._v(" "),o("td",[o("el-input",{attrs:{size:a.btnsize,disabled:""},model:{value:a.info.apportionType,callback:function(e){a.$set(a.info,"apportionType",e)},expression:"info.apportionType"}})],1),a._v(" "),o("th",[a._v("送货日期")]),a._v(" "),o("td",[o("el-input",{attrs:{value:a._f("parseTime")(a.info.loadTime,"{y}-{m}-{d} {h}:{i}:{s}"),size:a.btnsize,disabled:""}})],1)]),a._v(" "),o("tr",[o("th",[a._v("可载重量")]),a._v(" "),o("td",[o("el-input",{attrs:{size:a.btnsize,disabled:""},model:{value:a.info.truckLoad,callback:function(e){a.$set(a.info,"truckLoad",e)},expression:"info.truckLoad"}})],1),a._v(" "),o("th",[a._v("可载体积")]),a._v(" "),o("td",[o("el-input",{attrs:{size:a.btnsize,disabled:""},model:{value:a.info.truckVolume,callback:function(e){a.$set(a.info,"truckVolume",e)},expression:"info.truckVolume"}})],1),a._v(" "),o("th",[a._v("要求到达时间")]),a._v(" "),o("td",[o("el-input",{attrs:{value:a._f("parseTime")(a.info.requireArrivedTime,"{y}-{m}-{d} {h}:{i}:{s}"),size:a.btnsize,disabled:""}})],1)]),a._v(" "),o("tr",[o("th",[a._v("备注")]),a._v(" "),o("td",{attrs:{colspan:"5"}},[o("el-input",{attrs:{size:a.btnsize,disabled:"",maxlength:300},model:{value:a.info.remark,callback:function(e){a.$set(a.info,"remark",e)},expression:"info.remark"}})],1)])])])]),a._v(" "),o("div",{staticClass:"tab_infos"},[o("div",{staticClass:"btns_box"},[o("el-button",{staticClass:"table_setup",attrs:{type:"primary",size:a.btnsize,icon:"el-icon-setting",plain:""},on:{click:a.setTable}},[a._v("表格设置")]),a._v(" "),o("el-button",{staticClass:"table_setup",attrs:{type:"success",size:a.btnsize,icon:"el-icon-setting",plain:""},on:{click:function(e){a.doAction("export")}}},[a._v("导出清单")]),a._v(" "),o("el-button",{staticClass:"table_setup",attrs:{type:"success",size:a.btnsize,icon:"el-icon-setting",plain:""},on:{click:function(e){a.doAction("print")}}},[a._v("打印清单")])],1),a._v(" "),o("div",{staticClass:"info_tab"},[o("el-table",{ref:"multipleTable",staticStyle:{height:"100%"},attrs:{data:a.detailList,stripe:"",border:"",height:"100%","default-sort":{prop:"id",order:"ascending"},"tooltip-effect":"dark"},on:{"row-click":a.clickDetails,"selection-change":a.getSelection}},[o("el-table-column",{attrs:{fixed:"",sortable:"",type:"selection",width:"50"}}),a._v(" "),a._l(a.tableColumn,function(i){return[i.slot?o("el-table-column",{key:i.id,attrs:{fixed:i.fixed,sortable:"",label:i.label,width:i.width},scopedSlots:a._u([{key:"default",fn:function(t){return[i.click?o("span",{staticClass:"clickitem",domProps:{innerHTML:a._s(i.slot(t))},on:{click:function(e){e.stopPropagation(),i.click(t)}}}):o("span",{domProps:{innerHTML:a._s(i.slot(t))}})]}}])}):o("el-table-column",{key:i.id,attrs:{fixed:i.fixed,sortable:"",label:i.label,prop:i.prop,width:i.width}})]})],2)],1)]),a._v(" "),o("TableSetup",{attrs:{popVisible:a.setupTableVisible,columns:a.tableColumn},on:{close:function(e){a.setupTableVisible=!1},success:a.setColumn}})],1)},staticRenderFns:[]};t.a=a},"nN/X":function(e,t,i){"use strict";var a=i("bOdI"),o=i.n(a),l=(i("E4LH"),i("P5Di")),s=i("01nq"),n=(i("NYxO"),i("3TtR")),r=i("P0Fm"),d=i("F5BD"),c=i("0xDb"),u=i("t5DY");t.a={components:{popRight:l.a,Detail:n.default,DetailArtery:r.default,DetailDeliver:d.default},props:{popVisible:{type:Boolean,default:!1},orgid:{required:!0},id:{type:[Number,String]},info:{type:Object,default:{}},detailType:{type:String,default:""}},data:function(){return o()({popTitle:"在途跟踪",loading:!0,isModify:!1,infoId:{},trackDetail:[],activeName:"first",formModel:{},ruleForm:{loadStatus:[{required:!0,trigger:"blur",message:"不能为空"}],operatorTime:[{required:!0,trigger:"blur",message:"不能为空"}],operatorInfo:[{required:!0,trigger:"blur",message:"不能为空"}]},isShowBtn:!0,isFootEdit:!1},"formModel",{addStatus:1,id:0,loadId:0,loadStatus:"",operatorInfo:"",operatorOrgid:1,operatorTime:"",operatorUserid:0})},watch:{id:function(){},info:function(e){e&&(this.getDetail(),this.getSystemTime())},popVisible:function(e,t){this.popVisible&&(this.getDetail(),this.getSystemTime())}},methods:{getSystemTime:function(){var t=this;this.formModel.id||Object(u.i)().then(function(e){e&&(t.formModel.operatorTime=Object(c.parseTime)(e.trim(),"{y}-{m}-{d} {h}:{i}:{s}"))}).catch(function(e){t._handlerCatchMsg(e)})},submitForm:function(e){var t=this;this.$refs[e].validate(function(e){e&&(t.formModel.id?t.$confirm("此操作将修改跟踪信息, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.editTrack()}):t.$confirm("此操作将添加跟踪信息, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.addTrack()}))})},getDetail:function(){var t=this,e=this.id;return Object(s.b)(e).then(function(e){t.trackDetail=Object(c.objectMerge2)([],e),t.loading=!1}).catch(function(e){t.loading=!1,t._handlerCatchMsg(e)})},closeMe:function(e){this.$emit("update:popVisible",!1),"function"==typeof e&&e()},deleteTrack:function(e){var t=this;this.$confirm("此操作将删除本跟踪信息, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){return Object(s.a)(e.id).then(function(e){t.$message({type:"success",message:"删除成功"}),t.getDetail(),t.resetForm()}).catch(function(e){t._handlerCatchMsg(e)})})},editItem:function(e){this.formModel=Object(c.objectMerge2)({},e),this.isModify=!0},editTrack:function(){var t=this;return console.log("修改",this.formModel),this.formModel.transferId=0,this.formModel.operatorTime=Object(c.parseTime)(this.formModel.operatorTime,"{y}-{m}-{d} {h}:{i}:{s}"),Object(s.g)(this.formModel).then(function(e){t.$message({type:"success",message:"修改成功"}),t.getDetail(),t.resetForm()}).catch(function(e){t._handlerCatchMsg(e)})},addTrack:function(){var t=this;return console.log("添加"),this.formModel.loadId=this.id,this.formModel.operatorTime=Object(c.parseTime)(this.formModel.operatorTime,"{y}-{m}-{d} {h}:{i}:{s}"),Object(s.d)(this.formModel).then(function(e){t.$message({type:"success",message:"添加成功"}),t.getDetail(),t.resetForm()}).catch(function(e){t._handlerCatchMsg(e)})},handleClick:function(){"second"===this.activeName?this.isFootEdit=!0:this.isFootEdit=!1},resetForm:function(){var e=this;this.$nextTick(function(){e.isModify=!1,e.$refs.formModel.resetFields(),e.formModel=e.$options.data().formModel,e.getSystemTime()})},offThisActive:function(e){var t=Object(c.closest)(e.target,".el-step");t&&t.classList.remove("trackactive")},setThisActive:function(e){var t=Object(c.closest)(e.target,".el-step");t&&t.classList.add("trackactive")}}}},ritI:function(e,t,i){"use strict";var a={render:function(){var i=this,e=i.$createElement,a=i._self._c||e;return a("pop-right",{directives:[{name:"loading",rawName:"v-loading",value:i.loading,expression:"loading"}],staticClass:"trackInfoPop",attrs:{title:i.popTitle,isShow:i.popVisible},on:{close:i.closeMe}},[a("template",{slot:"content"},[a("div",{staticClass:"content_head"},[i._v("\n      批次号： "+i._s(i.info.batchNo)+"\n    ")]),i._v(" "),a("div",{staticClass:"editInfoPop_content"},[a("el-tabs",{attrs:{type:"card"},on:{"tab-click":i.handleClick},model:{value:i.activeName,callback:function(e){i.activeName=e},expression:"activeName"}},[a("el-tab-pane",{attrs:{label:"批次详情",name:"first"}},["detailShort"===i.detailType?a("Detail",{staticClass:"animated fadeInRight",attrs:{info:i.info,isShow:i.popVisible}}):"detailArtery"===i.detailType?a("DetailArtery",{staticClass:"animated fadeInRight",attrs:{info:i.info,isShow:i.popVisible}}):a("DetailDeliver",{staticClass:"animated fadeInRight",attrs:{info:i.info,isShow:i.popVisible}})],1),i._v(" "),a("el-tab-pane",{attrs:{label:"批次跟踪",name:"second"}},[a("div",{staticClass:"info_box"},[a("el-row",{staticClass:"stepItem_title"},[a("el-col",{staticClass:"tracktype",attrs:{span:5}},[i._v("类型")]),i._v(" "),a("el-col",{attrs:{span:4}},[i._v("操作时间")]),i._v(" "),a("el-col",{attrs:{span:3}},[i._v("操作网点")]),i._v(" "),a("el-col",{attrs:{span:4}},[i._v("操作人")]),i._v(" "),a("el-col",{attrs:{span:8}},[i._v("操作信息")])],1),i._v(" "),a("div",{staticClass:"stepinfo"},[a("el-steps",{attrs:{direction:"vertical"}},i._l(i.trackDetail,function(t,e){return a("el-step",{key:e,class:{firstactive:0===e},nativeOn:{mouseover:function(e){return i.setThisActive(e)},mouseout:function(e){return i.offThisActive(e)}}},[a("span",{staticClass:"location",attrs:{slot:"icon"},slot:"icon"}),i._v(" "),a("template",{slot:"description"},[a("el-row",{staticClass:"stepItem"},[a("el-col",{attrs:{span:5}},[a("span",{staticClass:"typebox"},[i._v(i._s(t.loadStatus))]),i._v(" "),1===t.addStatus?[a("span",{staticClass:"modifybtn",attrs:{title:"编辑"},on:{click:function(e){i.editItem(t)}}}),i._v(" "),a("span",{staticClass:"deletebtn",attrs:{title:"删除"},on:{click:function(e){i.deleteTrack(t)}}})]:i._e()],2),i._v(" "),a("el-col",{attrs:{span:4}},[a("p",[i._v(i._s(t.operatorTime))])]),i._v(" "),a("el-col",{attrs:{span:3}},[a("p",[i._v(i._s(t.orgName))])]),i._v(" "),a("el-col",{attrs:{span:4}},[a("p",[1===t.addStatus?a("i",{staticClass:"track-human"}):a("i",{staticClass:"icon_blank"}),i._v(" "+i._s(t.operatorUsername)+"\n                        ")])]),i._v(" "),a("el-col",{attrs:{span:8}},[a("p",[i._v(i._s(t.operatorInfo))])])],1)],1)],2)}))],1)],1)])],1)],1)]),i._v(" "),i.isFootEdit?a("div",{staticClass:"stepinfo-footer stepFrom",attrs:{slot:"footer"},slot:"footer"},[a("el-form",{ref:"formModel",attrs:{inline:"",model:i.formModel,rules:i.ruleForm}},[a("el-form-item",{attrs:{label:"类型",prop:"loadStatus"}},[a("el-input",{attrs:{maxlength:10,placeholder:"类型",size:"mini"},model:{value:i.formModel.loadStatus,callback:function(e){i.$set(i.formModel,"loadStatus",e)},expression:"formModel.loadStatus"}})],1),i._v(" "),a("el-form-item",{attrs:{label:"时间",prop:"operatorTime"}},[a("el-date-picker",{attrs:{"value-format":"yyyy-MM-dd hh:mm:ss",type:"datetime",placeholder:"选择时间",size:"mini"},model:{value:i.formModel.operatorTime,callback:function(e){i.$set(i.formModel,"operatorTime","string"==typeof e?e.trim():e)},expression:"formModel.operatorTime"}})],1),i._v(" "),a("el-form-item",{attrs:{label:"操作信息",prop:"operatorInfo"}},[a("el-input",{attrs:{maxlength:250,placeholder:"",size:"mini"},model:{value:i.formModel.operatorInfo,callback:function(e){i.$set(i.formModel,"operatorInfo",e)},expression:"formModel.operatorInfo"}})],1),i._v(" "),a("el-form-item",{staticClass:"tracksavebtn"},[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(e){i.submitForm("formModel")}}},[i._v("保 存")]),i._v(" "),a("transition",{attrs:{name:"el-zoom-in-center"}},[i.isModify?a("el-button",{attrs:{type:"warning",size:"mini"},on:{click:function(e){i.resetForm()}}},[i._v("取 消")]):i._e()],1)],1)],1)],1):a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:i.closeMe}},[i._v("关闭")])],1)],2)},staticRenderFns:[]};t.a=a},ufrc:function(e,t){}});