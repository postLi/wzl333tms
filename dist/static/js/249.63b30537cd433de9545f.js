webpackJsonp([249],{OVjY:function(e,t){},"T+eR":function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=i("TRi9"),o=i("s0og");var l=function(e){i("OVjY")},a=i("VU/8")(s.a,o.a,l,null,null);t.default=a.exports},TRi9:function(e,t,i){"use strict";var s=i("TsW9"),l=i("0xDb"),o=i("UQm2");t.a={components:{},props:{info:{type:Array,default:[]},isShow:{type:Boolean,default:!1}},data:function(){return{visible2:!1,thecode:"ORDER_DELIVER-1",btnsize:"mini",setupTableVisible:!1,loadId:"",tablekey:0,detailList:[],selectDetailList:[],message:!1,signData:{shipIds:[],orgIds:[],childShipIds:[],loadIds:[],signTime:"",signName:"",signCocumentTypeId:0,documentNum:"",signTypeId:0,remark:"",signPic:""},tableColumn:[{label:"运单号",prop:"shipSn",width:"120",fixed:!0},{label:"开单网点",prop:"shipFromOrgName",width:"120",fixed:!1},{label:"签收状态",prop:"signStatus",width:"120",fixed:!1},{label:"到付(元)",prop:"shipArrivepayFee",width:"90",fixed:!1},{label:"实付送货费(元)",prop:"deliveryFeeToPay",width:"100",fixed:!1},{label:"配载件数",prop:"loadAmount",width:"120",fixed:!1},{label:"配载重量(kg)",prop:"loadWeight",width:"120",fixed:!1},{label:"配载体积(m³)",prop:"loadVolume",width:"120",fixed:!1},{label:"运单件数",prop:"cargoAmount",width:"120",fixed:!1},{label:"运单重量(kg)",prop:"cargoWeight",width:"120",fixed:!1},{label:"运单体积(m³)",prop:"cargoVolume",width:"120",fixed:!1},{label:"发站",prop:"shipFromCityName",width:"160",fixed:!1},{label:"到站",prop:"shipToCityName",width:"160",fixed:!1},{label:"发货人",prop:"shipSenderName",width:"120",fixed:!1},{label:"发货人电话",prop:"shipSenderMobile",width:"120",fixed:!1},{label:"收货人",prop:"shipReceiverName",width:"120",fixed:!1},{label:"收货人电话",prop:"shipReceiverMobile",width:"120",fixed:!1},{label:"货品名",prop:"cargoName",width:"120",fixed:!1},{label:"包装",prop:"cargoPack",width:"120",fixed:!1},{label:"货号",prop:"shipGoodsSn",width:"130",fixed:!1},{label:"运单备注",prop:"shipRemarks",width:"120",fixed:!1}]}},watch:{isShow:{handler:function(e,t){e&&(this.getLoadTrack(),this.toggleAllRows())},immediate:!0},info:{handler:function(e,t){e&&(this.getLoadTrack(),this.toggleAllRows())},deep:!0}},methods:{setTable:function(){this.setupTableVisible=!0},doAction:function(e){switch(e){case"add":this.openSignVisible();break;case"print":Object(o.d)({data:this.selectDetailList.length?this.selectDetailList:this.detailList,columns:this.tableColumn,name:"送货管理",type:"load"});break;case"export":Object(o.g)({data:this.selectDetailList.length?this.selectDetailList:this.detailList,columns:this.tableColumn,name:"送货管理"})}},setData:function(){},getLoadTrack:function(){var t=this;this.loadId=this.info.id,Object(s.e)(this.loadId).then(function(e){e&&(t.detailList=e.data,t.toggleAllRows())}).catch(function(e){t.loading=!1,t._handlerCatchMsg(e)})},clickDetails:function(e){this.$refs.multipleTable.toggleRowSelection(e)},getSelection:function(e){var i=this,s={};this.$set(s,"shipIds",[]),this.$set(s,"orgIds",[]),this.$set(s,"childShipIds",[]),this.$set(s,"loadIds",[]),this.$set(s,"signName","");var o=[];0<e.length?(this.selectDetailList=Object(l.objectMerge2)([],e),this.selectDetailList.forEach(function(e,t){s.shipIds.push(e.shipId),e.childShipId&&""!==e.childShipId||(e.childShipId=null),e.orgid&&""!==e.orgid||(e.orgid=null),o[t]=e.shipReceiverName,s.childShipIds.push(e.childShipId),s.orgIds.push(e.orgid),s.loadIds.push(i.loadId)}),1<(o=o.filter(function(e,t){return o.indexOf(e)===t})).length&&o[0]!==o[1]&&(s.signName=""),1===o.length&&(s.signName=o[0]),console.log(s.signName)):this.isBatch=!1,this.signData.shipIds=s.shipIds,this.signData.childShipIds=s.childShipIds,this.signData.orgIds=s.orgIds,this.signData.loadIds=s.loadIds,this.signData.signName=s.signName,s={},console.log("signData",this.signData)},toggleAllRows:function(){var i=this;this.$nextTick(function(){i.detailList.forEach(function(e,t){i.$refs.multipleTable.toggleRowSelection(e,!0)})})},openSignVisible:function(){console.log("批次详情页",this.signData),this.$emit("sendInfoData",this.signData)},setColumn:function(e){this.tableColumn=e,this.tablekey=(new Date).getTime(),this.$refs.multipleTable.doLayout()},setTableWidth:function(e,t,i,s){var o=this,l=this.tableColumn.filter(function(e){return e.prop===i.property});l.length&&(l[0].width=e,console.log("应该要显示保存框了"),this.visible2=!0,clearTimeout(this.tabletimer),this.tabletimer=setTimeout(function(){o.visible2=!1},1e4))},saveToTableSetup:function(){this.visible2=!1,this.eventBus.$emit("tablesetup.change",this.thecode,this.tableColumn)},showSaveBox:function(){clearTimeout(this.tabletimer)},hideSaveBox:function(){var e=this;clearTimeout(this.tabletimer),this.tabletimer=setTimeout(function(){e.visible2=!1},1e4)}}}},TsW9:function(e,t,i){"use strict";t.a=function(e,t){return s.b.get("/api-order/order/load/v1/getBatchNo/",{params:{orgId:e,loadTypeId:t}})},t.i=function(e){return s.b.post("/api-order/order/load/v1/",e)},t.j=function(e){return s.b.put("/api-order/order/load/v1/",e)},t.d=function(e){return s.b.get("/api-order/order/load/v1/selectAddLoadRepertoryList/",{params:{orgId:e}})},t.g=function(e,t){return s.b.get("/api-order/order/load/v1/selectUpdateLoadRepertoryList/?orgId="+e+"&loadId="+t)},t.h=function(e,t){return s.b.get("/api-order/order/load/v1/selectUpdateLoadDetailList/?orgId="+e+"&loadId="+t)},t.e=function(e){return s.b.get("/api-order/order/load/v1/selectLoadDetailList/",{params:{loadId:e}})},t.f=function(){return s.b.get("/api-system/system/trunk/v1/findCarAndDriver/").then(function(e){return e})},t.b=function(){return s.b.get("/api-system/system/trunk/v1/findDriverAndCar/").then(function(e){return e})},t.c=function(e){return s.b.post("/api-order/order/tmsordertrailterminal/v1/list",e).then(function(e){return e.data})};var s=i("Vo7i")},s0og:function(e,t,i){"use strict";var s={render:function(){var s=this,e=s.$createElement,o=s._self._c||e;return o("div",{staticClass:"detailTablePop"},[o("el-form",{staticClass:"detailTablePop_info",attrs:{inline:"","label-width":"100"},model:{value:s.info,callback:function(e){s.info=e},expression:"info"}},[o("table",[o("tbody",[o("tr",[o("th",[s._v("送货费")]),s._v(" "),o("td",[o("el-input",{attrs:{size:s.btnsize,disabled:""},model:{value:s.info.deliveryFee,callback:function(e){s.$set(s.info,"deliveryFee",e)},expression:"info.deliveryFee"}})],1),s._v(" "),o("th",[s._v("司机名称")]),s._v(" "),o("td",[o("el-input",{attrs:{size:s.btnsize,disabled:""},model:{value:s.info.dirverName,callback:function(e){s.$set(s.info,"dirverName",e)},expression:"info.dirverName"}})],1),s._v(" "),o("th",[s._v("司机电话")]),s._v(" "),o("td",[o("el-input",{attrs:{size:s.btnsize,disabled:""},model:{value:s.info.dirverMobile,callback:function(e){s.$set(s.info,"dirverMobile",e)},expression:"info.dirverMobile"}})],1)]),s._v(" "),o("tr",[o("th",[s._v("车牌号码")]),s._v(" "),o("td",[o("el-input",{attrs:{size:s.btnsize,disabled:""},model:{value:s.info.truckIdNumber,callback:function(e){s.$set(s.info,"truckIdNumber",e)},expression:"info.truckIdNumber"}})],1),s._v(" "),o("th",[s._v("可载体积")]),s._v(" "),o("td",[o("el-input",{attrs:{size:s.btnsize,disabled:""},model:{value:s.info.truckVolume,callback:function(e){s.$set(s.info,"truckVolume",e)},expression:"info.truckVolume"}})],1),s._v(" "),o("th",[s._v("可载重量")]),s._v(" "),o("td",[o("el-input",{attrs:{size:s.btnsize,disabled:""},model:{value:s.info.truckLoad,callback:function(e){s.$set(s.info,"truckLoad",e)},expression:"info.truckLoad"}})],1)]),s._v(" "),o("tr",[o("th",[s._v("分摊方式")]),s._v(" "),o("td",[o("el-input",{attrs:{size:s.btnsize,disabled:""},model:{value:s.info.apportionTypeName,callback:function(e){s.$set(s.info,"apportionTypeName",e)},expression:"info.apportionTypeName"}})],1),s._v(" "),o("th",[s._v("送货日期")]),s._v(" "),o("td",[o("el-input",{attrs:{value:s._f("parseTime")(s.info.loadTime,"{y}-{m}-{d} {h}:{i}:{s}"),size:s.btnsize,disabled:""}})],1),s._v(" "),o("th",[s._v("要求到达时间")]),s._v(" "),o("td",[o("el-input",{attrs:{value:s._f("parseTime")(s.info.requireArrivedTime,"{y}-{m}-{d} {h}:{i}:{s}"),size:s.btnsize,disabled:""}})],1)]),s._v(" "),o("tr",[o("th",[s._v("追货宝")]),s._v(" "),o("td",[o("el-input",{attrs:{value:s.info.terminalNo,size:s.btnsize,disabled:""}})],1),s._v(" "),o("th",[s._v("备注")]),s._v(" "),o("td",{attrs:{colspan:"5"}},[o("el-input",{attrs:{size:s.btnsize,disabled:""},model:{value:s.info.remark,callback:function(e){s.$set(s.info,"remark",e)},expression:"info.remark"}})],1)])])])]),s._v(" "),o("div",{staticClass:"tab_infos"},[o("div",{staticClass:"btns_box"},[o("el-button",{attrs:{size:s.btnsize,type:"warning",icon:"el-icon-circle-plus",plain:""},on:{click:function(e){s.doAction("add")}}},[s._v("签收")]),s._v(" "),o("el-popover",{attrs:{placement:"top",trigger:"manual",width:"160",value:s.visible2},nativeOn:{mouseenter:function(e){return s.showSaveBox(e)},mouseout:function(e){return s.hideSaveBox(e)}}},[o("p",[s._v("表格宽度修改了，是否要保存？")]),s._v(" "),o("div",{staticStyle:{"text-align":"right",margin:"0"}},[o("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(e){s.visible2=!1}}},[s._v("取消")]),s._v(" "),o("el-button",{attrs:{type:"primary",size:"mini"},on:{click:s.saveToTableSetup}},[s._v("确定")])],1),s._v(" "),o("el-button",{staticClass:"table_setup",attrs:{slot:"reference",type:"primary",size:s.btnsize,icon:"el-icon-setting",plain:""},on:{click:s.setTable},slot:"reference"},[s._v("表格设置")])],1),s._v(" "),o("el-button",{staticClass:"table_setup",attrs:{type:"success",size:s.btnsize,icon:"el-icon-printer",plain:""},on:{click:function(e){s.doAction("export")}}},[s._v("导出清单")]),s._v(" "),o("el-button",{staticClass:"table_setup",attrs:{type:"success",size:s.btnsize,icon:"el-icon-printer",plain:""},on:{click:function(e){s.doAction("print")}}},[s._v("打印清单")])],1),s._v(" "),o("div",{staticClass:"info_tab"},[o("el-table",{key:s.tablekey,ref:"multipleTable",staticStyle:{height:"100%"},attrs:{"reserve-selection":!0,data:s.detailList,stripe:"",border:"",height:"100%","default-sort":{prop:"id",order:"ascending"},"tooltip-effect":"dark"},on:{"header-dragend":s.setTableWidth,"row-click":s.clickDetails,"selection-change":s.getSelection}},[o("el-table-column",{attrs:{fixed:"",sortable:"",type:"selection",width:"50"}}),s._v(" "),s._l(s.tableColumn,function(i){return[i.slot?o("el-table-column",{key:i.id,attrs:{fixed:i.fixed,sortable:"",label:i.label,width:i.width},scopedSlots:s._u([{key:"default",fn:function(t){return[i.click?o("span",{staticClass:"clickitem",domProps:{innerHTML:s._s(i.slot(t))},on:{click:function(e){e.stopPropagation(),i.click(t)}}}):o("span",{domProps:{innerHTML:s._s(i.slot(t))}})]}}])}):o("el-table-column",{key:i.id,attrs:{fixed:i.fixed,sortable:"",label:i.label,prop:i.prop,width:i.width}})]})],2)],1)]),s._v(" "),o("TableSetup",{attrs:{popVisible:s.setupTableVisible,columns:s.tableColumn,code:s.thecode},on:{close:function(e){s.setupTableVisible=!1},success:s.setColumn}})],1)},staticRenderFns:[]};t.a=s}});