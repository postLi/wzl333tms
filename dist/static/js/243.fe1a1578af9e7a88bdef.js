webpackJsonp([243],{"7UT2":function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NkUwNUQyQjI5RDA1MTFFOEI0Q0Q4ODYzRjU0Q0JCMDgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NkUwNUQyQjM5RDA1MTFFOEI0Q0Q4ODYzRjU0Q0JCMDgiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2RTA1RDJCMDlEMDUxMUU4QjRDRDg4NjNGNTRDQkIwOCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo2RTA1RDJCMTlEMDUxMUU4QjRDRDg4NjNGNTRDQkIwOCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PiLfE1EAAAC+SURBVHjapJLBDcIwDEWdbsEEvaDukB04wQDJBYaBSxagJ3ZoZ0C5MEHHCN+qkVJk5wCWvpo0/8nOb11KaU9EV+gUY1zIKPh2eNyhSwghd1jcIA9NcmhBk/jYTwweoRfUa3AF9eJjPznj0PPY1vtSygoa8AF6fEPs3YAKXGSiDaSCAnPKT4EYHgDl2vNXx65xx6GVdtdINct3U2FnRd6YxOPPWbjjaEFcsq87j59Rz9CsQQo8i58cJ/RLvQUYANH4fzspKeAsAAAAAElFTkSuQmCC"},BxPv:function(e,t,i){"use strict";var a={render:function(){var a=this,e=a.$createElement,s=a._self._c||e;return s("div",{directives:[{name:"loading",rawName:"v-loading",value:a.loading,expression:"loading"}],staticClass:"orderinfo-manager truck-page-log heightvhPoptree"},[s("div",{staticClass:"info_card"},[s("el-tabs",{attrs:{"tab-position":"top"},on:{"tab-click":a.handleTabModel},model:{value:a.tabModel,callback:function(e){a.tabModel=e},expression:"tabModel"}},[s("el-tab-pane",{attrs:{label:"定位查询",name:"1"}},[s("span",{attrs:{slot:"label"},slot:"label"},[s("i",{staticClass:"el-icon-location"}),a._v(" 定位查询")]),a._v(" "),s("el-tabs",{staticClass:"child_tabs",on:{"tab-click":a.handleTabMap},model:{value:a.tabMap,callback:function(e){a.tabMap=e},expression:"tabMap"}},[s("el-tab-pane",{attrs:{label:"运单查询",name:"1"}},[a.showSearchCard&&!a.isAllTable?s("el-form",{ref:"form",attrs:{size:"mini",model:a.searchQuery,"label-width":"65px"},nativeOn:{submit:function(e){e.preventDefault()}}},[s("el-form-item",{attrs:{label:"运单查询"}},[s("querySelect",{attrs:{size:a.btnsize,placeholder:"请输入运单号",search:"shipSn",type:"order"},on:{change:a.getShipSn},model:{value:a.searchQuery.vo.shipSn,callback:function(e){a.$set(a.searchQuery.vo,"shipSn",e)},expression:"searchQuery.vo.shipSn"}})],1),a._v(" "),s("el-form-item",{staticClass:"staff_searchinfo--btn"},[s("el-button",{attrs:{type:"warning",icon:"el-icon-search",loading:a.loadSearch},on:{click:function(e){a.onSubmit("location","order")}}},[a._v("立即查询")])],1)],1):a._e(),a._v(" "),s("el-tabs",{staticClass:"secChild_tabs"},[s("el-tab-pane",{attrs:{label:"查询结果"}},[s("el-card",{staticClass:"childOrderTruckTree"},[s("div",{staticClass:"truckTree-group"},[0===a.realLocatOrderTrucks.length?s("div",{staticClass:"emptyTips"},[a._v("暂无信息")]):a._l(a.realLocatOrderTrucks,function(t,i){return s("div",{staticClass:"truckTree-group-item",class:a.actLocatOrderTruckItem[i]?"activeItem":"",on:{click:function(e){a.selectGroupOrderLocat(t,i)}}},[s("h3",[s("el-tag",{attrs:{type:0===i?"danger":1===i?"warning":2===i?"success":"primary",size:a.btnsize}},[a._v(a._s(i+1))]),a._v("\n                      "+a._s(t.truckIdNumber)+" "),s("i",[a._v("["+a._s(t.speed)+" km/h]")]),a._v(" "),s("i",[a._v(a._s(t.truckLength?t.truckLength+"米":""))]),a._v(" "),s("i",[a._v(a._s(t.truckTypeName||""))])],1),a._v(" "),s("div",{staticClass:"truckTree-group-item-desc"},[s("h4",[a._v(a._s(t.orgName))]),a._v(" "),s("div",[s("i",{staticClass:"el-icon-mobile-phone"}),a._v(" "),t.driverName||t.dirverName?s("span",[a._v("\n                          "+a._s(t.driverName||"")+" "+a._s(t.dirverMobile||"")+"\n                       ")]):s("span",[a._v("暂无关联司机")])])])])})],2)])],1)],1)],1),a._v(" "),s("el-tab-pane",{attrs:{label:"车辆查询",name:"2"}},[a.showSearchCard&&!a.isAllTable?s("el-form",{ref:"form",attrs:{size:"mini",model:a.searchQuery,"label-width":"65px"}},[s("el-form-item",{attrs:{label:"选择车辆"}},[s("el-autocomplete",{attrs:{"popper-class":"my-autocomplete","fetch-suggestions":a.querySearchTruck,placeholder:"请输入车牌号",size:"mini","auto-complete":"off",maxlength:8,clearable:""},on:{select:a.handleSelectTruck},scopedSlots:a._u([{key:"default",fn:function(e){var t=e.item;return[s("div",{staticClass:"name"},[a._v(a._s(t.truckIdNumber))])]}}]),model:{value:a.searchQuery.vo.truckIdNumber,callback:function(e){a.$set(a.searchQuery.vo,"truckIdNumber",e)},expression:"searchQuery.vo.truckIdNumber"}})],1),a._v(" "),s("el-form-item",{staticClass:"staff_searchinfo--btn"},[s("el-button",{attrs:{type:"warning",icon:"el-icon-search",loading:a.loadSearch},on:{click:function(e){a.onSubmit("location","truck")}}},[a._v("立即查询")])],1)],1):a._e(),a._v(" "),s("el-card",{staticClass:"truckTree"},[s("div",{staticClass:"truckTree-group"},a._l(a.TruckList,function(t,i){return s("div",{staticClass:"truckTree-group-item",class:a.activeTruckItem[i]?"activeItem":"",on:{click:function(e){a.selectGroup(t,i,"location","truck")}}},[s("h3",[s("el-tag",{attrs:{type:0===i?"danger":1===i?"warning":2===i?"success":"primary",size:a.btnsize}},[a._v(a._s(i+1))]),a._v(" \n                      "+a._s(t.truckIdNumber)+" \n                      ")],1),a._v(" "),s("div",{staticClass:"truckTree-group-item-desc"},[s("div",[s("i",{staticClass:"el-icon-mobile-phone"}),a._v(" "),t.driverName||t.dirverName?s("span",[a._v("\n                          "+a._s(t.dirverName||"")+" "+a._s(t.dirverMobile||"")+"\n                       ")]):s("span",[a._v("暂无关联司机")])])])])}))])],1)],1)],1),a._v(" "),s("el-tab-pane",{attrs:{label:"轨迹追踪",name:"2"}},[s("span",{attrs:{slot:"label"},slot:"label"},[s("i",{staticClass:"el-icon-share"}),a._v(" 轨迹追踪")]),a._v(" "),s("el-tabs",{staticClass:"child_tabs",on:{"tab-click":a.handleTabLine},model:{value:a.tabLine,callback:function(e){a.tabLine=e},expression:"tabLine"}},[s("el-tab-pane",{attrs:{label:"运单查询",name:"1"}},[s("el-form",{ref:"form",attrs:{size:"mini",model:a.searchQuery,"label-width":"65px"}},[s("el-form-item",{attrs:{label:"运单查询"}},[s("querySelect",{attrs:{size:a.btnsize,placeholder:"请输入运单号",search:"shipSn",type:"order"},on:{change:a.getShipSn},model:{value:a.searchQuery.vo.shipSn,callback:function(e){a.$set(a.searchQuery.vo,"shipSn",e)},expression:"searchQuery.vo.shipSn"}})],1),a._v(" "),s("el-form-item",{attrs:{label:"开始时间"}},[s("el-date-picker",{attrs:{type:"datetime",align:"right","value-format":"yyyy-MM-dd HH:mm:ss",placeholder:"开始日期","picker-options":a.pickerOptionsSimple},model:{value:a.searchQuery.vo.startTime,callback:function(e){a.$set(a.searchQuery.vo,"startTime",e)},expression:"searchQuery.vo.startTime"}})],1),a._v(" "),s("el-form-item",{attrs:{label:"结束时间"}},[s("el-date-picker",{attrs:{type:"datetime",align:"right","value-format":"yyyy-MM-dd HH:mm:ss","picker-options":a.pickerOptionsSimple,placeholder:"结束日期"},model:{value:a.searchQuery.vo.endTime,callback:function(e){a.$set(a.searchQuery.vo,"endTime",e)},expression:"searchQuery.vo.endTime"}})],1),a._v(" "),s("el-form-item",{staticClass:"staff_searchinfo--btn"},[s("el-button",{attrs:{type:"success",icon:"el-icon-search",loading:a.loadSearch},on:{click:function(e){a.onSubmit("line","order")}}},[a._v("立即查询")])],1)],1),a._v(" "),s("el-tabs",{staticClass:"secChild_tabs"},[s("el-tab-pane",{attrs:{label:"查询结果"}},[s("el-card",{staticClass:"childTruckTree"},[s("div",{staticClass:"truckTree-group"},[0===a.realTimeOrderTrucks.length?s("div",{staticClass:"emptyTips"},[a._v("暂无信息")]):a._l(a.realTimeOrderTrucks,function(t,i){return s("div",{staticClass:"truckTree-group-item",class:a.activeTruckItem[i]?"activeItem":"",on:{click:function(e){a.selectGroup(t,i,"line","order")}}},[s("h3",[s("el-tag",{attrs:{type:0===i?"danger":1===i?"warning":2===i?"success":"primary",size:a.btnsize}},[a._v(a._s(i+1))]),a._v(" \n                      "+a._s(t.truckIdNumber)+" \n                      "),s("i",[a._v(a._s(t.truckLength?t.truckLength+"米":""))]),a._v(" "),s("i",[a._v(a._s(t.truckTypeName||""))])],1),a._v(" "),s("div",{staticClass:"truckTree-group-item-desc"},[s("h4",[a._v(a._s(t.orgName))]),a._v(" "),s("div",[s("i",{staticClass:"el-icon-mobile-phone"}),a._v(" "),t.driverName||t.dirverName?s("span",[a._v("\n                          "+a._s(t.driverName||"")+" "+a._s(t.dirverMobile||"")+"\n                       ")]):s("span",[a._v("暂无关联司机")])])])])})],2)])],1)],1)],1),a._v(" "),s("el-tab-pane",{attrs:{label:"车辆查询",name:"2"}},[s("el-form",{ref:"form",attrs:{size:"mini",model:a.searchQuery,"label-width":"65px"}},[s("el-form-item",{attrs:{label:"选择车辆"}},[s("el-autocomplete",{attrs:{"popper-class":"my-autocomplete","fetch-suggestions":a.querySearchTruck,placeholder:"请输入车牌号",size:"mini","auto-complete":"off",maxlength:8,clearable:""},on:{select:a.handleSelectTruck},scopedSlots:a._u([{key:"default",fn:function(e){var t=e.item;return[s("div",{staticClass:"name"},[a._v(a._s(t.truckIdNumber))])]}}]),model:{value:a.searchQuery.vo.truckIdNumber,callback:function(e){a.$set(a.searchQuery.vo,"truckIdNumber",e)},expression:"searchQuery.vo.truckIdNumber"}})],1),a._v(" "),s("el-form-item",{attrs:{label:"开始时间"}},[s("el-date-picker",{attrs:{type:"datetime",align:"right","value-format":"yyyy-MM-dd HH:mm:ss",placeholder:"开始日期","picker-options":a.pickerOptionsSimple},model:{value:a.searchQuery.vo.startTime,callback:function(e){a.$set(a.searchQuery.vo,"startTime",e)},expression:"searchQuery.vo.startTime"}})],1),a._v(" "),s("el-form-item",{attrs:{label:"结束时间"}},[s("el-date-picker",{attrs:{type:"datetime",align:"right","value-format":"yyyy-MM-dd HH:mm:ss","picker-options":a.pickerOptionsSimple,placeholder:"结束日期"},model:{value:a.searchQuery.vo.endTime,callback:function(e){a.$set(a.searchQuery.vo,"endTime",e)},expression:"searchQuery.vo.endTime"}})],1),a._v(" "),s("el-form-item",{staticClass:"staff_searchinfo--btn"},[s("el-button",{attrs:{type:"success",icon:"el-icon-search",loading:a.loadSearch},on:{click:function(e){a.onSubmit("line","truck")}}},[a._v("立即查询")])],1)],1),a._v(" "),s("el-tabs",{staticClass:"secChild_tabs",model:{value:a.tabLineChild,callback:function(e){a.tabLineChild=e},expression:"tabLineChild"}},[s("el-tab-pane",{attrs:{label:"全部车辆",name:"1"}},[s("el-card",{staticClass:"childTruckTree"},[s("div",{staticClass:"truckTree-group"},a._l(a.TruckList,function(t,i){return s("div",{staticClass:"truckTree-group-item",class:a.activeTruckItem[i]?"activeItem":"",on:{click:function(e){a.selectGroup(t,i,"line","truck")}}},[s("h3",[s("el-tag",{attrs:{type:0===i?"danger":1===i?"warning":2===i?"success":"primary",size:a.btnsize}},[a._v(a._s(i+1))]),a._v(" \n                      "+a._s(t.truckIdNumber)+" \n                      "),s("i",[a._v(a._s(t.truckLength?t.truckLength+"米":""))]),a._v(" "),s("i",[a._v(a._s(t.truckTypeName||""))])],1),a._v(" "),s("div",{staticClass:"truckTree-group-item-desc"},[s("h4",[a._v(a._s(t.orgName))]),a._v(" "),s("div",[s("i",{staticClass:"el-icon-mobile-phone"}),a._v(" "),t.driverName||t.dirverName?s("span",[a._v("\n                          "+a._s(t.driverName||"")+" "+a._s(t.dirverMobile||"")+"\n                       ")]):s("span",[a._v("暂无关联司机")])])])])}))])],1),a._v(" "),s("el-tab-pane",{attrs:{label:"查询结果",name:"2"}},[s("el-card",{staticClass:"childTruckTree"},[s("div",{staticClass:"truckTree-group"},[0===a.realTimeTrucks.length?s("div",{staticClass:"emptyTips"},[a._v("暂无信息")]):a._l(a.realTimeTrucks,function(t,i){return s("div",{staticClass:"truckTree-group-item",class:a.activeTruckItem[i]?"activeItem":"",on:{click:function(e){a.showLine(t,i)}}},[s("h3",[s("el-tag",{attrs:{type:0===i?"danger":1===i?"warning":2===i?"success":"primary",size:a.btnsize}},[a._v(a._s(i+1))]),a._v(" \n                      "+a._s(t.truckIdNumber)+" \n                      "),s("i",[a._v(a._s(t.truckLength?t.truckLength+"米":""))]),a._v(" "),s("i",[a._v(a._s(t.truckTypeName||""))])],1),a._v(" "),s("div",{staticClass:"truckTree-group-item-desc"},[s("h4",[a._v(a._s(t.orgName))]),a._v(" "),s("div",[s("i",{staticClass:"el-icon-mobile-phone"}),a._v(" "),t.driverName||t.dirverName?s("span",[a._v("\n                          "+a._s(t.driverName||"")+" "+a._s(t.dirverMobile||"")+"\n                       ")]):s("span",[a._v("暂无关联司机")])])])])})],2)])],1)],1)],1)],1)],1),a._v(" "),s("el-tab-pane",{attrs:{label:"监控中心",name:"3"}},[s("span",{attrs:{slot:"label"},slot:"label"},[s("i",{staticClass:"el-icon-menu"}),a._v(" 监控中心")]),a._v(" "),s("el-card",{staticClass:"terminalTree"},[s("div",{staticClass:"truckTree-group"},[0===a.terminalList.length?s("div",{staticClass:"emptyTips"},[a._v("暂无设备信息")]):a._l(a.terminalList,function(t,i){return s("div",{staticClass:"truckTree-group-item",on:{click:function(e){a.selectTerminal(t,i)}}},[s("h3",[s("el-tag",{attrs:{type:0===t.vehicleStatus?"info":1===t.vehicleStatus?"success":2===t.vehicleStatus?"warning":"info",size:a.btnsize}},[a._v(a._s(i+1))]),a._v(" \n                "+a._s(t.terminalNo)+" \n                "),s("i",[a._v(a._s(t.terminalType||""))]),a._v(" "),s("i",[a._v(a._s(0===t.terminalStatus?" 从未上线":1===t.terminalStatus?" 行驶":2===t.terminalStatus?" 停车":" 离线"))])],1)])})],2)])],1)],1)],1),a._v(" "),s("div",{staticClass:"truck-log-main"},[s("div",{attrs:{id:"trucklogmap"}},[a.isTimer?s("div",{staticClass:"popTimer"},[a.isTimerOpen?s("span",[s("i",{staticClass:"el-icon-time"}),a._v(" "+a._s(a.timer)+"秒后刷新轨迹")]):a._e(),a._v(" "),s("el-button",{attrs:{size:"mini",type:"text",icon:a.isTimerOpen?"":"el-icon-time"},on:{click:a.timerCon}},[a._v(a._s(a.isTimerOpen?"关闭":"开启自动刷新"))])],1):a._e()]),a._v(" "),s("transition",{attrs:{name:"el-zoom-in-bottom"}},[a.activeTruckItem.length&&"2"===a.tabModel?s("div",{staticClass:"truck-log-table"},[s("div",{staticClass:"info-btns"},[s("el-button",{attrs:{size:a.btnsize,type:"primary",icon:"el-icon-document"},on:{click:a.exportData}},[a._v("导出EXCEL")]),a._v(" "),s("el-button",{staticClass:"btnsright",attrs:{type:"info",size:a.btnsize,icon:"el-icon-close"},on:{click:function(e){a.activeTruckItem=[]}}},[a._v("关闭")])],1),a._v(" "),s("div",{staticClass:"info_tab"},[s("el-table",{key:a.tablekey,ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:a.dataList,stripe:"",border:"",height:"250px","tooltip-effect":"dark","row-class-name":a.classLineRed}},[a._l(a.tableColumn,function(i){return[i.slot?s("el-table-column",{key:i.id,attrs:{fixed:i.fixed,label:i.label,width:i.width},scopedSlots:a._u([{key:"default",fn:function(t){return[i.click?s("span",{staticClass:"clickitem",domProps:{innerHTML:a._s(i.slot(t))},on:{click:function(e){e.stopPropagation(),i.click(t)}}}):s("span",{domProps:{innerHTML:a._s(i.slot(t))}})]}}])}):s("el-table-column",{key:i.id,attrs:{fixed:i.fixed,label:i.label,prop:i.prop,width:i.width}})]})],2)],1),a._v(" "),s("div",{staticClass:"table-contr"}),a._v(" "),s("div",{staticClass:"info_tab_footer"},[a._v("\n          共计:"+a._s(a.total)+"\n          "),s("div",{staticClass:"show_pager"},[s("Pager",{attrs:{total:a.total,btnsize:"mini"},on:{change:a.handlePageChange}})],1)])]):a._e()])],1),a._v(" "),"3"!==a.tabModel?s("div",{staticClass:"truck-log-expand"},[s("transition",{attrs:{name:"el-zoom-in-center"}},[s("div",{staticClass:"control-panel"},[s("el-button",{attrs:{size:a.btnsize,type:"text",icon:"el-icon-caret-right",title:"播放"},on:{click:function(e){a.doLine("start")}}}),a._v(" "),s("el-button",{attrs:{size:a.btnsize,type:"text",icon:"el-icon-refresh",title:"恢复"},on:{click:function(e){a.doLine("resume")}}}),a._v(" "),s("el-button",{staticClass:"btn-stop",attrs:{size:a.btnsize,type:"text",title:"暂停"},on:{click:function(e){a.doLine("pause")}}}),a._v(" "),s("el-button",{attrs:{size:a.btnsize,type:"text",icon:"el-icon-close",title:"清空"},on:{click:function(e){a.doLine("destroy")}}}),a._v(" "),s("span",{staticClass:"speed-sudu"},[a._v("速度:")]),s("i",{staticClass:"speed-slow"},[a._v("慢 ")]),a._v(" "),s("el-slider",{staticClass:"slider-step",attrs:{min:1e3,max:1e6,"show-tooltip":!1},model:{value:a.speedSlider,callback:function(e){a.speedSlider=e},expression:"speedSlider"}}),a._v(" "),s("i",{staticClass:"speed-quick"},[a._v("快 ")]),a._v(" "),s("el-progress",{attrs:{"text-inside":!0,"stroke-width":18,percentage:a.progressPercentage,status:"success"}})],1)])],1):a._e()])},staticRenderFns:[]};t.a=a},TsW9:function(e,t,i){"use strict";t.a=function(e,t){return a.b.get("/api-order/order/load/v1/getBatchNo/",{params:{orgId:e,loadTypeId:t}})},t.i=function(e){return a.b.post("/api-order/order/load/v1/",e)},t.j=function(e){return a.b.put("/api-order/order/load/v1/",e)},t.d=function(e){return a.b.get("/api-order/order/load/v1/selectAddLoadRepertoryList/",{params:{orgId:e}})},t.g=function(e,t){return a.b.get("/api-order/order/load/v1/selectUpdateLoadRepertoryList/?orgId="+e+"&loadId="+t)},t.h=function(e,t){return a.b.get("/api-order/order/load/v1/selectUpdateLoadDetailList/?orgId="+e+"&loadId="+t)},t.e=function(e){return a.b.get("/api-order/order/load/v1/selectLoadDetailList/",{params:{loadId:e}})},t.f=function(){return a.b.get("/api-system/system/trunk/v1/findCarAndDriver/").then(function(e){return e})},t.b=function(){return a.b.get("/api-system/system/trunk/v1/findDriverAndCar/").then(function(e){return e})},t.c=function(e){return a.b.post("/api-order/order/tmsordertrailterminal/v1/list",e).then(function(e){return e.data})};var a=i("Vo7i")},sBKc:function(e,t,i){"use strict";i("OHys");var c=i("0xDb"),a=i("1onU"),l=i("YMLJ"),s=i("UQm2"),r=i("pAQG"),n=(i("QBRH"),i("TsW9"));t.a={components:{Pager:a.a,querySelect:r.a},props:{orderid:[String,Number],orderdata:[Object]},data:function(){return{actLocatOrderTruckItem:[],tabModel:"1",tabMap:"1",tabLine:"1",tabTerminal:"2",activeName:"1",tabLineChild:"1",realTimeLocateList:[],tableStyle:!1,activeTruckItem:[],showDataList:[],dataList:[],truckInfoList:[],truckCollapse:1,searchShipSn:"",isTimerOpen:!0,loadSearch:!1,isAllTable:!1,showSearchCard:!0,isShowInlineOrderMap:!0,speedSlider:520130,popTreeVisible:!1,gridData:[],tablekey:0,loading:!1,noinfo:!0,dialogTableVisible:!1,thepos:"",thename:"",theobj:{},btnsize:"mini",pickerOptionsSimple:{shortcuts:c.pickerOptionsSimple},groupList:[],tableColumn:[{label:"序号",prop:"number",width:"100",fixed:!0},{label:"车辆定位时间",prop:"time",width:"160"},{label:"速度 km/h",prop:"speed",width:"90"},{label:"部件状态",prop:"status",width:"90",slot:function(e){return" - "}},{label:"里程 km",prop:"li",width:"80",slot:function(e){return" - "}},{label:"海拔 m",prop:"altitude",width:"80"},{label:"车牌号码",prop:"truckIdNumber",width:"100"},{label:"司机名称",prop:"dirverName"}],total:0,searchQuery:{currentPage:1,pageSize:100,vo:{truckIdNumber:"",startTime:Object(c.parseTime)(new Date-6048e5),endTime:Object(c.parseTime)(new Date),shipId:"",shipSn:""}},timer:60,isTimer:!0,pathSimplifierIns:{},map:{},allPathData:[],imgurl:i("slEn"),closeurl:i("7UT2"),initedPath:!1,orgPageDataList:[],orgDataList:[],allList:[],markers:[],pathNavigs:[],comDis:!1,totalPageSize:0,progressPercentage:0,curCursor:{},TruckList:[],realTimeTrucks:[],org_order_realTimeTrucks:[],org_truck_realTimeTrucks:[],lineColor:["#3366cc","#329262","#ff9900","#109618","#990099","#0099c6","#dd4477","#66aa00","#b82e2e","#316395","#994499","#22aa99","#aaaa11","#6633cc","#e67300","#8b0707","#651067","#dc3912","#5574a6","#3b3eac","#409eff","#008000","#40E0D0","#22aa99","#9400D3","#FFC0CB","#0000FF","#FFA500","#B22222","#808080","#00FFFF","#8A2BE2","#5F9EA0","#7FFF00","#DAA520"],terminalList:[],curTerminalList:[],realTimeOrderTrucks:[],m:!1,realLocatOrderTrucks:[]}},watch:{orderid:function(e){},orderdata:{handler:function(){this.init(333)},deep:!0},speedSlider:function(i){i&&this.pathNavigs.length&&this.pathNavigs.forEach(function(e,t){e&&e.setSpeed(i)})},$route:{handler:function(e,t){var i=this;this.isTimer&&window.AMapUI&&(e.fullPath&&-1!==e.fullPath.indexOf("/operation/order/trucklog")||(this.isTimerOpen=!1,clearInterval(this.timerOption))),e.query&&e.query.searchQuery&&this.map&&window.AMap&&window.AMapUI&&this.$nextTick(function(){i.openRouteLineTruck()}),console.log("to",e),console.log("from",t)},immediate:!0},curCursor:{handler:function(e,t){if(e)if(this.pathNavigs[0]){var i=e.idx,a=this.allPathData[0].path.length,s=Math.floor(i/a*100),r=Math.floor(i/this.searchQuery.pageSize);this.progressPercentage=this.comDis?100:0<=s?s:0,this.searchQuery.currentPage=this.pathNavigs[0]?r:0,this.dataList=this.orgPageDataList[this.searchQuery.currentPage]}else this.progressPercentage=0;else this.progressPercentage=0},deep:!0},activeTruckItem:{handler:function(e,t){e&&e.length&&this.initLine()},immediate:!0}},computed:{routeSearch:function(){var e={searchQuery:{},flag:""};if(this.$route.query&&this.$route.query.searchQuery){var t=JSON.parse(this.$route.query.searchQuery);e.searchQuery=Object(c.objectMerge2)({},t),e.flag=this.$route.query.flag,e.type=this.$route.query.type}return e}},mounted:function(){console.log("测试车辆：陕YH0009");var t=this;window.loadedGaodeMap=function(){var e=this;Object(c.loadJs)("//webapi.amap.com/ui/1.0/main.js").then(function(){t.initMap(),t.hasLoadedMap=!0,t.getPathSimplifierIns(),console.log("window.AMap",window.AMap),console.log("window.AMapUI",window.AMapUI),console.log("this.map",e.map),t.openRouteLineTruck()})},this.init(2222),this.fetchTruck(),this.fetchTerminal()},destoryed:function(){this.exit(),clearInterval(this.timerOption)},activated:function(){},methods:{createFilter:function(t,i){return function(e){if(e[i])return t.test(e[i])}},querySearchTruck:function(e,t){console.log("this.TruckList",this.TruckList);var i=this.TruckList;t(e?i.filter(this.createFilter(new RegExp(e,"gi"),"truckIdNumber")):i)},handleSelectTruck:function(e){this.searchQuery.vo.truckIdNumber=e.truckIdNumber},selectGroupOrderLocat:function(e,t){var i=this.map,a=[Number(e.longitude),Number(e.latitude)];this.actLocatOrderTruckItem=[],this.actLocatOrderTruckItem[t]=!0,this.closeInfoWindow(),this.infoWindow(e),window.infoWindow.open(i,a),console.log("row",e,t,e.truckIdNumber,a),i.setFitView()},handleTabModel:function(e){console.log("当前选中的tab::",e)},handleTabMap:function(e){console.log("当前选中的二级tab::Map",e),this.fetchTruck()},handleTabLine:function(e){console.log("当前选中的二级tab::Line",e)},terminalToLine:function(e){return function(){alert()}},openCheckLineTruck:function(e){this.tabModel="2",this.tabLine="2",this.$set(this.searchQuery.vo,"truckIdNumber",e.truckIdNumber),this.onSubmit("line","truck")},openRouteLineTruck:function(){if(console.log("init route query ",this.routeSearch),this.routeSearch&&this.routeSearch.searchQuery.truckIdNumber)if("truck"===this.routeSearch.type)switch(this.routeSearch.flag){case"line":this.tabModel="2",this.tabLine="2",this.$set(this.searchQuery.vo,"truckIdNumber",this.routeSearch.searchQuery.truckIdNumber),this.$set(this.searchQuery.vo,"startTime",this.routeSearch.searchQuery.startTime||""),this.onSubmit("line","truck");break;case"location":this.tabModel="1",this.tabMap="2",this.$set(this.searchQuery.vo,"truckIdNumber",this.routeSearch.searchQuery.truckIdNumber),this.onSubmit("location","truck")}else switch(this.routeSearch.flag){case"line":this.tabModel="2",this.tabLine="1",this.$set(this.searchQuery.vo,"shipSn",this.routeSearch.searchQuery.shipSn),this.$set(this.searchQuery.vo,"startTime",this.routeSearch.searchQuery.startTime||""),this.onSubmit("line","truck");break;case"location":this.tabModel="1",this.tabMap="1",this.$set(this.searchQuery.vo,"shipSn",this.routeSearch.searchQuery.shipSn),this.onSubmit("location","truck")}},closeInfoWindow:function(){var e=window.AMap,t=window.AMapUI,i=this.map;console.log(window.AMap,window.AMapUI),(e||t)&&i.clearInfoWindow()},createInfoWindow:function(e){var t=this,i=(window.AMap,window.AMapUI,this.map);this.closeInfoWindow();var a=[];if(window.globalMapFn=function(){console.log(e),t.$message.warning("暂无该功能~")},window.globalLineTruck=function(){t.openCheckLineTruck(e)},window.closeInfoWindow=function(){i.clearInfoWindow()},"1"===this.tabModel){for(var s in e)e[s]=e[s]||"-无数据-";a.push('<div class="mapwin">'),a.push('<div class="winhead"><i>'+e.truckIdNumber+'</i><a href="javascript:;" onclick="closeInfoWindow()"><img src="'+this.closeurl+'" /></a></div>'),a.push('<div class="winmain">'),a.push("<p>速度: <span>"+e.speed+"km/h</span></p>"),a.push("<p>关联司机: <span>"+e.dirverName+"km</span></p>"),a.push("<p>司机号码: <span>"+e.dirverMobile+"</span></p>"),a.push("<p>地址: <span>"+e.address+"</span></p>"),a.push("</div>"),a.push('<div class="winfoot">'),a.push('<a href="javascript:;" onclick="globalLineTruck()"><i class="el-icon-share"></i> 轨迹</a>'),a.push("</div>"),a.push("</div>")}else{var r="0"===e.posStyle?"不定位":"1"===e.posStyle?"GPS":"2"===e.posStyle?"WIFI":"3"===e.posStyle?"多基站":"单基站";"0"===e.vehicleStatus||("1"===e.vehicleStatus||e.vehicleStatus);for(var n in e)e[n]=e[n]||"-无数据-";a.push('<div class="mapwin">'),a.push('<div class="winhead"><i>'+e.terminalNo+"</i> [ "+e.terminalType+" / <span>电量: "+e.lastPower+'%</span> ]<a href="javascript:;" onclick="closeInfoWindow()"><img src="'+this.closeurl+'" /></a></div>'),a.push('<div class="winmain">'),a.push("<p>速度: <span>"+e.speed+"km/h</span></p>"),a.push("<p>里程: <span>"+e.mlileage+"km</span></p>"),a.push("<p>信号时间: <span>"+e.gpsTime+"</span></p>"),a.push("<p>定位时间: <span>"+e.gpsTime+"</span></p>"),a.push("<p>定位: <span>"+r+"</span></p>"),a.push("<p>车辆状态: <span>"+e.formatTime+"</span></p>"),a.push("<p>报警: <span>"+e.alarmInfo+"</span></p>"),a.push("<p>地址: <span>"+e.address+"</span></p>"),a.push("</div>"),a.push("</div>"),a.push("</div>")}return a.join("")},infoWindow:function(e){var t=window.AMap;window.AMapUI,this.map;window.infoWindow=new t.InfoWindow({isCustom:!0,content:this.createInfoWindow(e),offset:new t.Pixel(5,-45),showShadow:!0})},tomapTerminal:function(){var i=this,a=window.AMap,s=(window.AMapUI,this.map),r=this;console.log("markers",this.markers),console.log("curTerminalList",this.curTerminalList),s.remove(this.markers);var n=[],o=void 0;this.markers=[],this.curTerminalList.length&&(this.curTerminalList.forEach(function(t,e){null!==t.lon&&null!==t.lat&&(n[e]=[t.lon,t.lat],o=new a.Marker({map:s,position:n[e]}),r.infoWindow(t),window.infoWindow.open(s,o.getPosition()),o.on("click",function(e){r.infoWindow(t),window.infoWindow.open(s,e.lnglat)}),o.setLabel({offset:new a.Pixel(20,20),icon:r.imgurl}),i.markers.push(o),s.setFitView())}),console.log("实时设备定位：：",this.curTerminalList,n,this.map))},selectTerminal:function(t,e){window.pathSimplifierIns&&window.pathSimplifierIns.setData([]);var i=this.curTerminalList.filter(function(e){return e.terminalNo===t.terminalNo}).length;console.log("flag",i),(!i||i<1)&&this.fetchTerminalLocation(t.vehicleId),this.curTerminal=t,console.log("选中的设备",t,t.terminalNo)},fetchTerminalLocation:function(e){var t=this;Object(l.a)(e).then(function(e){e&&e.terminalNo?(console.log("dadta",e),t.$message.success("设备查询成功~"),t.curTerminalList.push(e),t.tomapTerminal()):t.$message.warning("暂无数据, 请稍后重试~")}).catch(function(e){t._handlerCatchMsg(e)})},fetchTerminal:function(){var t=this,e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:"",i=this.otherinfo.companyId;var a={currentPage:1,pageSize:1e4,vo:{companyId:i,terminalNo:e}};Object(n.c)(a).then(function(e){e&&(console.log("Terminals",e),t.terminalList=e.list)}).catch(function(e){t._handlerCatchMsg(e)})},getShipSn:function(e){this.$set(this.searchQuery.vo,"shipSn",e.shipSn),this.searchShipSn=e.shipSn,console.log("运单选择item",e,this.searchShipSn,this.searchQuery)},classLineRed:function(e){if(this.allPathData.length)return e.row.number===this.curCursor.idx?"rowSelect":""},timerCon:function(){this.isTimerOpen?(this.isTimerOpen=!1,clearInterval(this.timerOption)):this.initTimer()},initTimer:function(){if(clearInterval(this.timerOption),this.isTimer){var e=this;e.isTimerOpen=!0,e.timer=e.$options.data().timer,this.timerOption=setInterval(function(){e.timer=e.timer-1,e.timer<=0&&(e.onSubmit(),e.timer=e.$options.data().timer)},1e3)}},handleSearchView:function(){var e=this;this.isShowInlineOrderMap?(this.org_order_realTimeTrucks=Object(c.objectMerge2)([],this.realTimeTrucks),this.realTimeTrucks=Object(c.objectMerge2)([],this.org_truck_realTimeTrucks)):(this.org_truck_realTimeTrucks=Object(c.objectMerge2)([],this.realTimeTrucks),this.realTimeTrucks=Object(c.objectMerge2)([],this.org_order_realTimeTrucks),this.fetchTruck()),this.isShowInlineOrderMap=!this.isShowInlineOrderMap,this.showSearchCard=!1,setTimeout(function(){e.showSearchCard=!0},300)},handlePageChange:function(e){console.log("handlePageChange",e);var t=e.pageSize!==this.searchQuery.pageSize;this.searchQuery.currentPage=e.pageNum,this.searchQuery.pageSize=e.pageSize,t?this.setPage():(this.tablekey=(new Date).getTime(),this.dataList=this.orgPageDataList[this.searchQuery.currentPage-1])},handleTruck:function(){this.popTreeVisible=!this.popTreeVisible,this.fetchTruck()},fetchTruck:function(){var t=this;Object(l.b)().then(function(e){e&&(console.log("getTruckIdNumbers",e),t.TruckList=e||[])}).catch(function(e){t._handlerCatchMsg(e)})},showPopTrucktree:function(){var e=this;this.showDataList=!1,this.popTreeVisible=!1,setTimeout(function(){e.popTreeVisible=!0},300)},setPage:function(){var a=this;this.total=this.showDataList.length||0,this.totalPageSize=Math.floor(this.total/this.searchQuery.pageSize)+1;for(var e=0;e<this.totalPageSize;e++)this.orgPageDataList[e]=[];this.showDataList.forEach(function(e,t){var i=Math.floor(t/a.searchQuery.pageSize);a.orgPageDataList[i].push(e)}),this.dataList=this.orgPageDataList[this.searchQuery.currentPage-1]},validateForm:function(e,t,i){var a=!0;switch(e){case"location":"order"===t?this.searchQuery.vo.shipSn||(this.$message.warning("请选择运单号~"),a=!1):this.searchQuery.vo.truckIdNumber||(this.$message.warning("请选择车牌号~"),a=!1);break;case"line":this.searchQuery.vo.startTime&&this.searchQuery.vo.endTime||(this.$message.warning("时间范围不能为空~"),a=!1),"order"===t?(console.log("thisearch",this.searchQuery),this.searchQuery.vo.shipSn||(this.$message.warning("运单号不能为空~"),a=!1)):this.searchQuery.vo.truckIdNumber||(this.$message.warning("车牌号不能为空~"),a=!1)}return a},showLine:function(e,t){this.showDataList=[],this.searchQuery.currentPage=1,this.searchQuery.pageSize=this.$options.data().searchQuery.pageSize,console.log("选中的车：：",t,e.truckIdNumber,e.longitude,e.latitude,e),this.activeTruckItem[t]?this.activeTruckItem=[]:(this.activeTruckItem=[],this.$set(this.searchQuery.vo,"truckIdNumber",e.truckIdNumber),this.showDataList=Object(c.objectMerge2)([],e.trajectoryList),this.activeTruckItem[t]=!0,this.setPage()),this.initLine()},selectGroup:function(e,t,i,a){switch(console.log("选中的项:",e,t,i,a),this.searchQuery.currentPage=1,this.searchQuery.pageSize=this.$options.data().searchQuery.pageSize,i){case"location":"truck"===a?(this.$set(this.searchQuery.vo,"truckIdNumber",e.truckIdNumber),this.onSubmit(i,a,{truckIdNumber:e.truckIdNumber},"select")):this.onSubmit(i,a,{shipSn:e.shipSn},"select");break;case"line":"truck"===a?(this.searchQuery.vo.truckIdNumber=e.truckIdNumber,this.onSubmit(i,a)):this.showLine(e,t)}},onSubmit:function(e,i,t,a){var s=this,r=this;if(r.loadSearch=!0,!this.validateForm(e,i))return r.loadSearch=!1;r.progressPercentage=0,r.pathNavigs=[],r.activeTruckItem=[],r.realTimeTrucks=[],clearInterval(r.timerOption),window.pathSimplifierIns&&window.pathSimplifierIns.setData([]),this.map&&this.closeInfoWindow();var n="order"===i?l.h:l.i,o=a?t:Object(c.objectMerge2)({},r.searchQuery.vo);"location"===e&&(delete o.startTime,delete o.endTime,delete o.shipId),"order"===i?delete o.truckIdNumber:delete o.shipId,console.log("params",o),"location"===e?(o&&r.getRealTimeLocate(i,o),r.loadSearch=!1):"line"===e&&(o?n(o).then(function(e){r.initTimer(),s.tabLineChild="2",e&&0<e.length?(!function(e){if(e){r.orgDataList=[],r.dataList=[];var t=[];e&&e.length&&(r.showPopTrucktree(),t=Object(c.objectMerge2)([],e),e.forEach(function(i,e){var a=[];i.trajectoryList.forEach(function(e,t){e.dirverMobile=i.dirverMobile,e.dirverName=i.dirverName,e.truckIdNumber=i.truckIdNumber,e.number=t+1,r.orgDataList[t]=e,a[t]=e}),r.allList[e]=a,t[e].trajectoryList=Object(c.objectMerge2)([],a),t[e]._index=e,console.log("allList",r.allList),console.log("realTimeTrucks",t)})),"order"===i?r.realTimeOrderTrucks=t:r.realTimeTrucks=t}}(e),r.initLine()):s.$message.warning("暂无轨迹跟踪数据！"),r.loadSearch=!1}).catch(function(e){r.loadSearch=!1,s._handlerCatchMsg(e)}):(this.$message.warning("请输入查询参数~"),r.loadSearch=!1))},getRealTimeLocate:function(e,t){var i=this,a="order"===e,s=a?l.e:l.d;t&&s(t).then(function(e){e?(a&&0<e.length?(i.realTimeLocateList=e,i.realLocatOrderTrucks=e):e.truckIdNumber&&(i.realTimeLocateList=[],i.realTimeLocateList.push(e)),i.loadSearch=!1,i.tomap(),i.$message.success("查询成功~")):i.$message.warning("暂无车辆定位数据！")}).catch(function(e){i._handlerCatchMsg(e)})},tomap:function(){var i=this,a=window.AMap;window.AMapUI;if(!a)return this.$message("高德地图加载失败~"),!1;var s=this.map,r=this;s.remove(this.markers);var n=[],o=void 0;this.markers=[],this.realTimeLocateList.length&&(this.realTimeLocateList.forEach(function(t,e){null!==t.longitude&&null!==t.latitude&&(n[e]=[t.longitude,t.latitude],o=new a.Marker({map:s,position:n[e]}),r.infoWindow(t),window.infoWindow.open(s,o.getPosition()),o.on("click",function(e){r.infoWindow(t),window.infoWindow.open(s,e.lnglat)}),o.setLabel({offset:new a.Pixel(20,20)}),i.markers.push(o),s.setFitView())}),console.log("实时车辆定位：：",this.realTimeLocateList,n,this.map))},exportData:function(){Object(s.g)({data:this.orgDataList,columns:this.tableColumn,name:"轨迹详情"+Object(c.parseTime)(new Date,"{y}{m}{d}{h}{i}{s}")})},getPathSimplifierIns:function(){console.log("初始化轨迹配置信息");var i=this,e=window.AMapUI,a=i.map;e.load(["ui/misc/PathSimplifier"],function(e){if(e.supportCanvas){var s=i.lineColor,t=new e({zIndex:100,setFitView:-1,map:a,getPath:function(e,t){return e.path},getHoverTitle:function(e,t,i){return 0<=i?e.name+"，点:"+i+"/"+e.path.length:e.name+"，点数量"+e.path.length},renderOptions:{pathLineStyle:{dirArrowStyle:!0},getPathStyle:function(e,t){var i=s[e.pathIndex],a=Math.round(4*Math.pow(1.1,t-3));return{pathLineStyle:{strokeStyle:i,lineWidth:a},pathLineSelectedStyle:{lineWidth:a+2},pathNavigatorStyle:{fillStyle:i}}},startPointStyle:{radius:6,fillStyle:"#109618",lineWidth:1,strokeStyle:"#eeeeee"},endPointStyle:{radius:6,fillStyle:"#dc3912",lineWidth:1,strokeStyle:"#eeeeee"}}});window.PathSimplifier=e,window.pathSimplifierIns=t}else alert("当前环境不支持 Canvas！")})},getNavg:function(i,e){var a=this,t=(window.AMap,window.AMapUI,a.map,window.pathSimplifierIns);if(!a.pathNavigs[i]){var s=t.createPathNavigator(i,{loop:!1,speed:a.speedSlider,pathNavigatorStyle:{width:24,height:24,content:PathSimplifier.Render.Canvas.getImageContent(a.imgurl,function(){t.renderLater()},function(e){a.$message.info("巡航器图片加载失败！")})}});s.onDestroy(function(){a.pathNavigs[i]=null}),s.on("start resume",function(){s._startTime=Date.now(),s._startDist=this.getMovedDistance()}),s.on("stop pause",function(){s._movedTime=Date.now()-s._startTime,s._movedDist=this.getMovedDistance()-s._startDist,s._realSpeed=s._movedDist/s._movedTime*3600;var e=Math.round(this.getMovedDistance()/1e3)||0,t=Math.round(s._movedDist/1e3)||0;this.getNaviStatus(),this.getSpeed(),s._movedTime,Math.round(s._realSpeed);this.comDis=e===t,a.refreshNavgButtons(i)}),s.on("move",function(){this.getNaviStatus(),this.getSpeed(),Math.round(this.getMovedDistance()/1e3);a.allPathData&&1===a.allPathData.length&&(a.curCursor=s.getCursor())}),a.pathNavigs[i]=s}return a.pathNavigs[i]},setDataLine:function(){var r=this,n=[];return this.allList.forEach(function(e,t){if(e.length){var a={name:"",path:[]};if(r.activeTruckItem&&r.activeTruckItem.length){var i=0;for(var s in r.activeTruckItem)i=Number(s);t===i&&(e.forEach(function(e,t){var i=[Number(e.longitude),Number(e.latitude)];a.name=e.truckIdNumber,a.path.push(i)}),n.push(a))}else e.forEach(function(e,t){var i=[Number(e.longitude),Number(e.latitude)];a.name=e.truckIdNumber,a.path.push(i)}),n.push(a)}}),this.allPathData=n},initLine:function(){var i=this;if(window.pathSimplifierIns){this.map.remove(this.markers);var e=window.pathSimplifierIns,t=this.setDataLine();e.setData(this.setDataLine()),t.forEach(function(e,t){i.getNavg(t,e)})}else this.initedPath||(this.getPathSimplifierIns(),this.initedPath=!0)},doLine:function(i){var a=this;if(window.pathSimplifierIns){/(start|resume|pause)/.test(i)?(clearInterval(this.timerOption),this.isTimerOpen=!1):this.initTimer();window.pathSimplifierIns;this.allPathData.forEach(function(e,t){a.getNavg(t,e)[i](),a.refreshNavgButtons(t)})}else this.initedPath||(this.getPathSimplifierIns(),this.initedPath=!0)},refreshNavgButtons:function(e){if(!(e<0)){var t=!!this.pathNavigs[e],i=this.pathNavigs[e];t&&i.getNaviStatus()}},refreshNavg:function(){this.searchQuery.currentPage=1,this.dataList=this.orgPageDataList[this.searchQuery.currentPage-1]},exit:function(){this.map&&this.map.destroy&&"function"==typeof this.map.destroy&&(this.map.destroy(),this.map={}),this.thepos="",this.thename="",this.theobj={},this.noinfo=!0},init:function(){this.dialogTableVisible=this.popVisible,this.loadMap(),this.popVisible?(this.thepos=this.pos,this.thename=this.name):this.exit()},loadMap:function(){var e=this;window.AMap?setTimeout(function(){e.initMap(),e.getPathSimplifierIns()},500):Object(c.loadJs)("https://webapi.amap.com/maps?v=1.4.8&key=e61aa7ddc6349acdb3b57c062080f730&plugin=AMap.Autocomplete,AMap.PlaceSearch,AMap.Geocoder&callback=loadedGaodeMap").then(function(){})},close:function(e){this.exit(),this.$emit("update:popVisible",!1),"function"==typeof e&&e()},initMap:function(){var e=window.AMap;window.AMapUI;this.map=new e.Map("trucklogmap",{resizeEnable:!0,zoom:6})},setData:function(e,t,i){this.thepos=e,this.thename=t,this.theobj=i,this.noinfo=!1,console.log(i)},clipboardSuccess:function(){this.$message({message:"复制成功",type:"success",duration:1500})}}}},"sm+L":function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=i("sBKc"),s=i("BxPv"),r=i("VU/8")(a.a,s.a,null,null,null);t.default=r.exports}});