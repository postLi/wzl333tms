webpackJsonp([259],{"46Pd":function(e,t,i){"use strict";var o=i("TsW9"),a=i("puNT"),l=i("UQm2");t.a={components:{TableSetup:a.a},props:{info:{type:Object,default:{}},isShow:{type:Boolean,default:!1}},data:function(){return{btnsize:"mini",setupTableVisible:!1,loading:!0,loadId:"",detailList:[],selected:[],query:{arriveOrgid:0,batchNo:"",batchTypeId:0,departureEndTime:"",departureStartTime:"",dirverName:"",loadEndTime:"",loadId:0,loadStartTime:"",loadTypeId:0,orgId:0,truckIdNumber:""},tableColumn:[{label:"运单号",prop:"shipSn",width:"130",fixed:!0},{label:"开单网点",prop:"shipFromOrgName",width:"130",fixed:!1},{label:"配载件数",prop:"loadAmount",width:"120",fixed:!1},{label:"配载重量",prop:"loadWeight",width:"120",fixed:!1},{label:"配载体积",prop:"loadVolume",width:"120",fixed:!1},{label:"库存件数",prop:"repertoryAmount",width:"120",fixed:!1},{label:"库存重量",prop:"repertoryWeight",width:"120",fixed:!1},{label:"库存体积",prop:"repertoryVolume",width:"120",fixed:!1},{label:"运单件数",prop:"cargoAmount",width:"120",fixed:!1},{label:"运单重量",prop:"cargoWeight",width:"120",fixed:!1},{label:"运单体积",prop:"cargoVolume",width:"120",fixed:!1},{label:"发站",prop:"shipFromCityName",width:"120",fixed:!1},{label:"到站",prop:"shipToCityName",width:"120",fixed:!1},{label:"发货人",prop:"shipSenderName",width:"120",fixed:!1},{label:"收货人",prop:"shipReceiverName",width:"120",fixed:!1},{label:"收货人电话",prop:"shipReceiverMobile",width:"120",fixed:!1},{label:"货品名",prop:"cargoName",width:"120",fixed:!1},{label:"货号",prop:"shipGoodsSn",width:"120",fixed:!1},{label:"运单备注",prop:"shipRemarks",width:"120",fixed:!1}]}},watch:{isShow:{handler:function(e,t){e&&this.fecthSelectLoadList()},immediate:!0},info:function(e){e&&this.fecthSelectLoadList()}},methods:{setTable:function(){this.setupTableVisible=!0},fecthSelectLoadList:function(){this.getLoadTrack()},getSelection:function(e){this.selected=e},doAction:function(e){switch(e){case"print":Object(l.d)({data:this.selected.length?this.selected:this.detailList,columns:this.tableColumn});break;case"export":Object(l.g)({data:this.selected.length?this.selected:this.detailList,columns:this.tableColumn,name:"在途跟踪"})}},clickDetails:function(e){this.$refs.multipleTable.toggleRowSelection(e)},getLoadTrack:function(){var t=this;this.loading=!0,this.loadId=this.info.id,Object(o.e)(this.loadId).then(function(e){t.detailList=e.data,t.loading=!1}).catch(function(e){t.loading=!1,t._handlerCatchMsg(e)})},setColumn:function(e){this.tableColumn=e,this.tablekey=Math.random()}}}},"8vYc":function(e,t){},F5BD:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=i("46Pd"),a=i("lIxA");var l=function(e){i("8vYc")},n=i("VU/8")(o.a,a.a,l,null,null);t.default=n.exports},TsW9:function(e,t,i){"use strict";t.a=function(e,t){return o.b.get("/api-order/order/load/v1/getBatchNo/",{params:{orgId:e,loadTypeId:t}})},t.i=function(e){return o.b.post("/api-order/order/load/v1/",e)},t.j=function(e){return o.b.put("/api-order/order/load/v1/",e)},t.d=function(e){return o.b.get("/api-order/order/load/v1/selectAddLoadRepertoryList/",{params:{orgId:e}})},t.g=function(e,t){return o.b.get("/api-order/order/load/v1/selectUpdateLoadRepertoryList/?orgId="+e+"&loadId="+t)},t.h=function(e,t){return o.b.get("/api-order/order/load/v1/selectUpdateLoadDetailList/?orgId="+e+"&loadId="+t)},t.e=function(e){return o.b.get("/api-order/order/load/v1/selectLoadDetailList/",{params:{loadId:e}})},t.f=function(){return o.b.get("/api-system/system/trunk/v1/findCarAndDriver/").then(function(e){return e})},t.b=function(){return o.b.get("/api-system/system/trunk/v1/findDriverAndCar/").then(function(e){return e})},t.c=function(e){return o.b.post("/api-order/order/tmsordertrailterminal/v1/list",e).then(function(e){return e.data})};var o=i("Vo7i")},lIxA:function(e,t,i){"use strict";var o={render:function(){var o=this,e=o.$createElement,a=o._self._c||e;return a("div",{directives:[{name:"loading",rawName:"v-loading",value:o.loading,expression:"loading"}],staticClass:"detailTables"},[a("el-form",{staticClass:"detailTables_info",attrs:{inline:"","label-width":"100"},model:{value:o.info,callback:function(e){o.info=e},expression:"info"}},[a("table",[a("tbody",[a("tr",[a("th",[o._v("司机名称")]),o._v(" "),a("td",[a("el-input",{attrs:{size:o.btnsize,disabled:""},model:{value:o.info.dirverName,callback:function(e){o.$set(o.info,"dirverName",e)},expression:"info.dirverName"}})],1),o._v(" "),a("th",[o._v("司机电话")]),o._v(" "),a("td",[a("el-input",{attrs:{size:o.btnsize,disabled:""},model:{value:o.info.dirverMobile,callback:function(e){o.$set(o.info,"dirverMobile",e)},expression:"info.dirverMobile"}})],1),o._v(" "),a("th",[o._v("车牌号码")]),o._v(" "),a("td",[a("el-input",{attrs:{size:o.btnsize,disabled:""},model:{value:o.info.truckIdNumber,callback:function(e){o.$set(o.info,"truckIdNumber",e)},expression:"info.truckIdNumber"}})],1)]),o._v(" "),a("tr",[a("th",[o._v("送货费")]),o._v(" "),a("td",[a("el-input",{attrs:{size:o.btnsize,disabled:""},model:{value:o.info.deliveryFee,callback:function(e){o.$set(o.info,"deliveryFee",e)},expression:"info.deliveryFee"}})],1),o._v(" "),a("th",[o._v("分摊方式")]),o._v(" "),a("td",[a("el-input",{attrs:{size:o.btnsize,disabled:""},model:{value:o.info.apportionType,callback:function(e){o.$set(o.info,"apportionType",e)},expression:"info.apportionType"}})],1),o._v(" "),a("th",[o._v("送货日期")]),o._v(" "),a("td",[a("el-input",{attrs:{value:o._f("parseTime")(o.info.loadTime,"{y}-{m}-{d} {h}:{i}:{s}"),size:o.btnsize,disabled:""}})],1)]),o._v(" "),a("tr",[a("th",[o._v("可载重量")]),o._v(" "),a("td",[a("el-input",{attrs:{size:o.btnsize,disabled:""},model:{value:o.info.truckLoad,callback:function(e){o.$set(o.info,"truckLoad",e)},expression:"info.truckLoad"}})],1),o._v(" "),a("th",[o._v("可载体积")]),o._v(" "),a("td",[a("el-input",{attrs:{size:o.btnsize,disabled:""},model:{value:o.info.truckVolume,callback:function(e){o.$set(o.info,"truckVolume",e)},expression:"info.truckVolume"}})],1),o._v(" "),a("th",[o._v("要求到达时间")]),o._v(" "),a("td",[a("el-input",{attrs:{value:o._f("parseTime")(o.info.requireArrivedTime,"{y}-{m}-{d} {h}:{i}:{s}"),size:o.btnsize,disabled:""}})],1)]),o._v(" "),a("tr",[a("th",[o._v("备注")]),o._v(" "),a("td",{attrs:{colspan:"5"}},[a("el-input",{attrs:{size:o.btnsize,disabled:"",maxlength:300},model:{value:o.info.remark,callback:function(e){o.$set(o.info,"remark",e)},expression:"info.remark"}})],1)])])])]),o._v(" "),a("div",{staticClass:"tab_infos"},[a("div",{staticClass:"btns_box"},[a("el-button",{staticClass:"table_setup",attrs:{type:"primary",size:o.btnsize,icon:"el-icon-setting",plain:""},on:{click:o.setTable}},[o._v("表格设置")]),o._v(" "),a("el-button",{staticClass:"table_setup",attrs:{type:"success",size:o.btnsize,icon:"el-icon-setting",plain:""},on:{click:function(e){o.doAction("export")}}},[o._v("导出清单")]),o._v(" "),a("el-button",{staticClass:"table_setup",attrs:{type:"success",size:o.btnsize,icon:"el-icon-setting",plain:""},on:{click:function(e){o.doAction("print")}}},[o._v("打印清单")])],1),o._v(" "),a("div",{staticClass:"info_tab"},[a("el-table",{ref:"multipleTable",staticStyle:{height:"100%"},attrs:{data:o.detailList,stripe:"",border:"",height:"100%","default-sort":{prop:"id",order:"ascending"},"tooltip-effect":"dark"},on:{"row-click":o.clickDetails,"selection-change":o.getSelection}},[a("el-table-column",{attrs:{fixed:"",sortable:"",type:"selection",width:"50"}}),o._v(" "),o._l(o.tableColumn,function(i){return[i.slot?a("el-table-column",{key:i.id,attrs:{fixed:i.fixed,sortable:"",label:i.label,width:i.width},scopedSlots:o._u([{key:"default",fn:function(t){return[i.click?a("span",{staticClass:"clickitem",domProps:{innerHTML:o._s(i.slot(t))},on:{click:function(e){e.stopPropagation(),i.click(t)}}}):a("span",{domProps:{innerHTML:o._s(i.slot(t))}})]}}])}):a("el-table-column",{key:i.id,attrs:{fixed:i.fixed,sortable:"",label:i.label,prop:i.prop,width:i.width}})]})],2)],1)]),o._v(" "),a("TableSetup",{attrs:{popVisible:o.setupTableVisible,columns:o.tableColumn},on:{close:function(e){o.setupTableVisible=!1},success:o.setColumn}})],1)},staticRenderFns:[]};t.a=o}});