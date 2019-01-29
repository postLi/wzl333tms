webpackJsonp([262],{JuzC:function(e,t,i){"use strict";t.e=function(e){return o.b.post("/api-order/order/load/v1/unloadList",e).then(function(e){return e.data?e.data:{}})},t.b=function(e){return o.b.get("/api-order/order/load/v1/selectLoadDetailList?loadId="+e.loadId+"&sortSign="+e.sortSign).then(function(e){return e.data?e.data:{}})},t.c=function(e){return o.b.post("/api-order/order/load/v1/selectLoadMainInfoList",e).then(function(e){return e.data?e.data:{}})},t.d=function(e){return o.b.post("/api-order/order/load/v1/unload",e).then(function(e){return e.data?e.data:{}})},t.a=function(e){return o.b.post("/api-order/order/load/v1/cancelUnload",e).then(function(e){return e.data?e.data:{}})};var o=i("Vo7i")},W6SE:function(e,t){},bXmW:function(e,t,i){"use strict";var o=i("woOf"),n=i.n(o),a=i("P5Di"),l=i("puNT"),s=i("o9X6"),r=(i("0xDb"),i("UQm2"),i("JuzC"));t.a={props:{popVisible:{type:Boolean,default:!1},info:{type:[Array,Object],default:function(){}}},components:{popRight:a.a,SelectTree:s.a,TableSetup:l.a},data:function(){return{thecode:"GX_UNLOAD_LIST-1",btnsize:"mini",loading:!0,popTitle:"中途卸货",dataList:[],selectList:[],tablekey:0,visible2:!1,setupTableVisible:!1,formModel:{},searchQuery:{currentPage:1,pageSize:9999,vo:{loadId:""}},tableColumn:[{label:"序号",prop:"number",width:"50",fixed:!0,slot:function(e){return e.$index+1}},{label:"开单网点",prop:"shipFromOrgName",width:"100"},{label:"运单号",prop:"shipSn",width:"100"},{label:"子运单号",prop:"childShipSn",width:"100"},{label:"到付(元)",prop:"shipArrivepayFee",width:"100"},{label:"操作费(元)",prop:"handlingFee",width:"100"},{label:"配载件数",prop:"loadAmount",width:"100"},{label:"配载重量(kg)",prop:"loadWeight",width:"100"},{label:"配载体积(m³)",prop:"loadVolume",width:"100"},{label:"发站",prop:"shipFromCityName",width:"100"},{label:"到站",prop:"shipToCityName",width:"100"},{label:"货品名",prop:"cargoName",width:"100"},{label:"发货人",prop:"shipSenderName",width:"100"},{label:"发货人电话",prop:"shipSenderMobile",width:"100"},{label:"收货人",prop:"shipReceiverName",width:"100"},{label:"收货人电话",prop:"shipReceiverMobile",width:"100"},{label:"货号",prop:"shipGoodsSn",width:"100"},{label:"运单备注",prop:"shipRemarks",width:"150"}]}},watch:{popVisible:function(e,t){},info:{handler:function(e,t){this.fetchData(),this.fetchBase()},deep:!0}},mounted:function(){},methods:{init:function(){},classLineRed:function(e){if(this.dataList.length)return 1===e.row.unloadSign?"rowDisable":""},doAction:function(e){switch(e){case"discharge":this.discharge();break;case"export":case"print":this.$message.warning("功能尚在开发中,敬请期待~")}},discharge:function(){var t=this;if(53!==this.info.batchTypeId)return this.$message.warning("批次【在途中】才可以卸货~"),!1;if(this.selectList.length<1)return this.$message.warning("请选择需要卸货的运单"),!1;var i=[];this.selectList.forEach(function(e,t){1===e.warehouStatus&&1===e.unloadSign||i.push(e.id)}),this.$confirm("请核对好卸货的运单哦！不要卸错货物~","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.loading=!0,Object(r.d)(i).then(function(e){t.$message.success("卸货成功!"),t.$emit("success"),t.loading=!1,t.closeMe()}).catch(function(e){t.loading=!1,t._handlerCatchMsg(e)})}).catch(function(){t.$message({type:"info",message:"已取消"})})},fetchData:function(){var t=this,e={loadId:this.info.loadId,sortSign:2};this.loading=!0,Object(r.b)(e).then(function(e){e&&(t.dataList=e,t.toggleAllRows()),t.loading=!1}).catch(function(e){t.loading=!1,t._handlerCatchMsg(e)})},fetchBase:function(){var t=this;this.loading=!0,this.searchQuery.vo.loadId=this.info.loadId,Object(r.c)(this.searchQuery).then(function(e){e&&e.list.length&&(t.formModel=e.list[0],t.formModel.userOrgName=t.otherinfo.orgName),t.loading=!1}).catch(function(e){t.loading=!1,t._handlerCatchMsg(e)})},toggleAllRows:function(){var i=this;this.$nextTick(function(){i.dataList.forEach(function(e,t){e.shipToOrgid===i.otherinfo.orgid&&1!==e.unloadSign&&1!==e.warehouStatus?i.$refs.multipleTable.toggleRowSelection(e,!0):i.$refs.multipleTable.toggleRowSelection(e,!1)})})},setTableWidth:function(e,t,i,o){var a=this,n=this.tableColumn.filter(function(e){return e.prop===i.property});n.length&&(n[0].width=e,this.visible2=!0,clearTimeout(this.tabletimer),this.tabletimer=setTimeout(function(){a.visible2=!1},1e4))},showSaveBox:function(){clearTimeout(this.tabletimer)},hideSaveBox:function(){var e=this;clearTimeout(this.tabletimer),this.tabletimer=setTimeout(function(){e.visible2=!1},1e4)},saveToTableSetup:function(){this.visible2=!1,this.initSort(),this.eventBus.$emit("tablesetup.change",this.thecode,this.tableColumn)},getSelection:function(t){var o=this,a=[];this.dataList.forEach(function(i,e){t.forEach(function(e,t){i.repertoryId===e.repertoryId&&(1===e.warehouStatus||1===e.unloadSign?o.$refs.multipleTable.toggleRowSelection(i,!1):a.push(e))})}),this.selectList=n()([],a)},clickDetails:function(e){1!==e.unloadSign&&this.$refs.multipleTable.toggleRowSelection(e)},setTable:function(){this.setupTableVisible=!0},closeSetupTable:function(){this.setupTableVisible=!1},closeMe:function(e){this.$emit("update:popVisible",!1),"function"==typeof e&&e()},setColumn:function(e){this.tableColumn=e,this.tablekey=(new Date).getTime(),this.$refs.multipleTable.doLayout()}}}},c3JR:function(e,t,i){"use strict";var o={render:function(){var o=this,e=o.$createElement,a=o._self._c||e;return a("pop-right",{directives:[{name:"loading",rawName:"v-loading",value:o.loading,expression:"loading"}],staticClass:"discharge-pop",attrs:{title:o.popTitle,isShow:o.popVisible},on:{close:o.closeMe}},[a("template",{slot:"content"},[a("div",{staticClass:"discharge-head"},[o._v("\n      批次号："+o._s(o.formModel.batchNo)+"\n    ")]),o._v(" "),a("div",{staticClass:"discharge-content"},[a("el-form",{staticClass:"base-info",attrs:{inline:"","label-width":"100"},model:{value:o.formModel,callback:function(e){o.formModel=e},expression:"formModel"}},[a("table",[a("tbody",[a("tr",[a("th",[o._v("途径网点")]),o._v(" "),a("td",[a("el-input",{attrs:{size:o.btnsize,disabled:""},model:{value:o.formModel.userOrgName,callback:function(e){o.$set(o.formModel,"userOrgName",e)},expression:"formModel.userOrgName"}})],1),o._v(" "),a("th",[o._v("司机名称")]),o._v(" "),a("td",[a("el-input",{attrs:{size:o.btnsize,disabled:""},model:{value:o.formModel.dirverName,callback:function(e){o.$set(o.formModel,"dirverName",e)},expression:"formModel.dirverName"}})],1),o._v(" "),a("th",[o._v("司机电话")]),o._v(" "),a("td",[a("el-input",{attrs:{size:o.btnsize,disabled:""},model:{value:o.formModel.dirverMobile,callback:function(e){o.$set(o.formModel,"dirverMobile",e)},expression:"formModel.dirverMobile"}})],1)]),o._v(" "),a("tr",[a("th",[o._v("车牌号码")]),o._v(" "),a("td",[a("el-input",{attrs:{size:o.btnsize,disabled:""},model:{value:o.formModel.truckIdNumber,callback:function(e){o.$set(o.formModel,"truckIdNumber",e)},expression:"formModel.truckIdNumber"}})],1),o._v(" "),a("th",[o._v("发车时间")]),o._v(" "),a("td",[a("el-input",{attrs:{size:o.btnsize,disabled:""},model:{value:o.formModel.departureTime,callback:function(e){o.$set(o.formModel,"departureTime",e)},expression:"formModel.departureTime"}})],1),o._v(" "),a("th",[o._v("备注")]),o._v(" "),a("td",[a("el-input",{attrs:{size:o.btnsize,disabled:""},model:{value:o.formModel.remark,callback:function(e){o.$set(o.formModel,"remark",e)},expression:"formModel.remark"}})],1)])])])]),o._v(" "),a("div",{staticClass:"discharge-table"},[a("div",{staticClass:"btns_box"},[a("el-button",{directives:[{name:"loading",rawName:"v-loading",value:o.loading,expression:"loading"},{name:"has",rawName:"v-has:GX_UNLOAD",arg:"GX_UNLOAD"}],attrs:{size:o.btnsize,type:"warning",icon:"el-icon-circle-plus",plain:""},on:{click:function(e){o.doAction("discharge")}}},[o._v("卸货")]),o._v(" "),a("el-popover",{attrs:{placement:"top",trigger:"manual",width:"160",value:o.visible2},nativeOn:{mouseenter:function(e){return o.showSaveBox(e)},mouseout:function(e){return o.hideSaveBox(e)}}},[a("p",[o._v("表格宽度修改了，是否要保存？")]),o._v(" "),a("div",{staticStyle:{"text-align":"right",margin:"0"}},[a("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(e){o.visible2=!1}}},[o._v("取消")]),o._v(" "),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:o.saveToTableSetup}},[o._v("确定")])],1),o._v(" "),a("el-button",{staticClass:"table_setup",attrs:{slot:"reference",type:"primary",size:o.btnsize,icon:"el-icon-setting",plain:""},on:{click:o.setTable},slot:"reference"},[o._v("表格设置")])],1),o._v(" "),a("el-button",{staticClass:"table_setup",attrs:{type:"success",size:o.btnsize,icon:"el-icon-printer",plain:""},on:{click:function(e){o.doAction("export")}}},[o._v("导出清单")]),o._v(" "),a("el-button",{staticClass:"table_setup",attrs:{type:"success",size:o.btnsize,icon:"el-icon-printer",plain:""},on:{click:function(e){o.doAction("print")}}},[o._v("打印清单")])],1),o._v(" "),a("div",{staticClass:"detail-table"},[a("el-table",{key:o.tablekey,ref:"multipleTable",staticStyle:{width:"100%"},attrs:{"reserve-selection":!0,data:o.dataList,border:"",height:"100%","tooltip-effect":"dark","row-class-name":o.classLineRed},on:{"header-dragend":o.setTableWidth,"row-click":o.clickDetails,"selection-change":o.getSelection}},[a("el-table-column",{attrs:{fixed:"",sortable:"",type:"selection",width:"50"}}),o._v(" "),o._l(o.tableColumn,function(i){return[i.slot?a("el-table-column",{key:i.id,attrs:{fixed:i.fixed,sortable:"",label:i.label,width:i.width},scopedSlots:o._u([{key:"default",fn:function(t){return[i.click?a("span",{staticClass:"clickitem",domProps:{innerHTML:o._s(i.slot(t))},on:{click:function(e){e.stopPropagation(),i.click(t)}}}):a("span",{domProps:{innerHTML:o._s(i.slot(t))}})]}}])}):a("el-table-column",{key:i.id,attrs:{fixed:i.fixed,sortable:"",label:i.label,prop:i.prop,width:i.width}})]})],2)],1)]),o._v(" "),a("TableSetup",{attrs:{code:o.thecode,popVisible:o.setupTableVisible,columns:o.tableColumn},on:{close:o.closeSetupTable,success:o.setColumn}})],1)]),o._v(" "),a("div",{attrs:{slot:"footer"},slot:"footer"},[a("div",{staticClass:"discharge-footer"},[a("el-button",{on:{click:o.closeMe}},[o._v("关闭")])],1)])],2)},staticRenderFns:[]};t.a=o},jKY2:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=i("bXmW"),a=i("c3JR");var n=function(e){i("W6SE")},l=i("VU/8")(o.a,a.a,n,null,null);t.default=l.exports}});