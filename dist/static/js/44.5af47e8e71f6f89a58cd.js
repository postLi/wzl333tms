webpackJsonp([44,164,267,323],{"3aiH":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=r("ZVah"),i=r("FnaA");var o=function(e){r("KDJv")},n=r("VU/8")(a.a,i.a,o,null,null);t.default=n.exports},"8Hxk":function(e,t){},BcEV:function(e,t,r){"use strict";var a=r("woOf"),n=r.n(a),i=r("IcMT"),o=r("9UCZ"),l=r("mZ46"),s=r("0xDb");t.a={props:{leftData:{type:Array},rightData:{type:Array}},data:function(){return{orgLeftTable:[],tablekey:"",truckMessage:"",formModel:{},loadTruck:"loadTruckOne",loading:!1,selectedRight:[],selectedLeft:[],leftTable:[],rightTable:[]}},components:{transferTable:i.a,selectType:o.a,currentSearch:l.default},watch:{leftData:function(e){this.leftTable=e,this.orgLeftTable=e},rightData:function(e){this.rightTable=e}},mounted:function(){},methods:{getList:function(){this.$emit("regetList")},getSum:function(e,t){return Object(s.getSummaries)(e,["_index|2|单","transferCharge","deliveryExpense","transferOtherFee","totalCost","cargoAmount|件","cargoWeight|kg","cargoVolume|方"])},getSumRight:function(e){return this.getSum(e,"right")},getSumLeft:function(e){return this.getSum(e,"left")},clickDetailsRight:function(e){this.$refs.multipleTableRight.toggleRowSelection(e)},clickDetailsLeft:function(e){this.$refs.multipleTableLeft.toggleRowSelection(e)},getSelectionRight:function(e){this.selectedRight=e},getSelectionLeft:function(e){this.selectedLeft=e},changeTableKey:function(){},getSearchEnter:function(){this.leftTable.length&&this.addALLList(),this.leftTable=n()([],this.orgLeftTable)},getSearch:function(e){this.leftTable=e},doAction:function(e){switch(e){case"goLeft":this.goLeft();break;case"goRight":this.goRight()}},changeRow:function(e,t,r){var a=t.$index,i=this,o=i.rightTable[a];o[e]=r,o.totalCost=Object(s.getTotal)(o.transferCharge,o.deliveryExpense,o.transferOtherFee),this.$set(i.rightTable,a,n()(i.rightTable[a],{totalCost:o.totalCost})),console.log(i.rightTable),i.$emit("loadTable",i.rightTable)},goLeft:function(){var r=this;0===this.selectedRight.length?this.$message({type:"warning",message:"请在左边表格选择数据"}):(this.selectedRight.forEach(function(t,e){t.loadAmount=t.repertoryAmount,t.loadWeight=t.repertoryWeight,t.loadVolume=t.repertoryVolume,t.oddNumbers=t.childShipSn||t.shipSn,t.paymentId=t.paymentId||16,r.rightTable=r.rightTable.filter(function(e){return e.repertoryId!==t.repertoryId}),r.rightTable.push(t),r.leftTable=r.leftTable.filter(function(e){return e.repertoryId!==t.repertoryId}),r.orgLeftTable=r.orgLeftTable.filter(function(e){return e.repertoryId!==t.repertoryId})}),this.selectedRight=[],this.$emit("loadTable",this.rightTable))},goRight:function(){var r=this;0===this.selectedLeft.length?this.$message({type:"warning",message:"请在右边表格选择数据"}):(this.selectedLeft.forEach(function(t,e){r.leftTable=r.leftTable.filter(function(e){return e.repertoryId!==t.repertoryId}),r.orgLeftTable=r.orgLeftTable.filter(function(e){return e.repertoryId!==t.repertoryId}),r.leftTable.push(t),r.orgLeftTable.push(t),r.rightTable=r.rightTable.filter(function(e){return e.repertoryId!==t.repertoryId})}),this.selectedLeft=[],this.$emit("loadTable",this.rightTable))},addItem:function(e,t){this.selectedRight=[],this.selectedRight.push(e),this.doAction("goLeft")},minusItem:function(e,t){this.selectedLeft=[],this.selectedLeft.push(e),this.doAction("goRight")},addALLList:function(){this.selectedRight=n()([],this.leftTable),this.doAction("goLeft")},minusAllList:function(){this.selectedLeft=n()([],this.rightTable),this.doAction("goRight")},dclickAddItem:function(e,t){this.selectedRight=[],this.selectedRight.push(e),this.doAction("goLeft")},dclickMinusItem:function(e,t){this.selectedLeft=[],this.selectedLeft.push(e),this.doAction("goRight")},setHeader:function(e,t){t.column;return e("el-button",{props:{size:"mini"},class:{tableItemBtn:!0},on:{click:this.addALLList}})},setHeader2:function(e,t){t.column;return e("el-button",{props:{size:"mini"},class:{tableItemBtnMinus:!0},on:{click:this.minusAllList}})}}}},FB6m:function(e,t,r){"use strict";var a={render:function(){var r=this,e=r.$createElement,a=r._self._c||e;return a("transferTable",[a("el-button",{attrs:{slot:"tableRefresh",icon:"el-icon-refresh",size:"mini",type:"primary",plain:"",circle:""},on:{click:r.getList},slot:"tableRefresh"}),r._v(" "),a("div",{staticClass:"tableHeadItemForm clearfix",attrs:{slot:"tableSearch"},slot:"tableSearch"},[a("currentSearch",{attrs:{info:r.orgLeftTable},on:{change:r.getSearch,keyupEneter:r.getSearchEnter}})],1),r._v(" "),a("div",{staticClass:"tableHeadItemBtn2",staticStyle:{height:"100%"},attrs:{slot:"tableLeft"},slot:"tableLeft"},[a("el-table",{key:r.tablekey,ref:"multipleTableRight",attrs:{data:r.leftTable,border:"","tooltip-effect":"dark",triped:"",height:"100%","summary-method":r.getSumRight,"show-overflow-tooltip":!0,"default-sort":{prop:"id",order:"ascending"},"show-summary":!0},on:{"row-click":r.clickDetailsRight,"selection-change":r.getSelectionRight,"row-dblclick":r.dclickAddItem}},[a("el-table-column",{attrs:{fixed:"",type:"index",width:"60",label:"序号"}}),r._v(" "),a("el-table-column",{attrs:{fixed:"","render-header":r.setHeader,width:"50"},scopedSlots:r._u([{key:"default",fn:function(t){return[a("el-button",{staticClass:"tableItemBtn",attrs:{size:"mini"},on:{click:function(e){r.addItem(t.row,t.$index)}}})]}}])}),r._v(" "),a("el-table-column",{attrs:{fixed:"",prop:"shipFromOrgName",label:"开单网点",width:"100"}}),r._v(" "),a("el-table-column",{attrs:{prop:"shipSn",label:"运单号",width:"120",fixed:""}}),r._v(" "),a("el-table-column",{attrs:{prop:"childShipSn",label:"子运单号",width:"120",fixed:""}}),r._v(" "),a("el-table-column",{attrs:{prop:"shipGoodsSn",sortable:"",label:"货号",width:"140"}}),r._v(" "),a("el-table-column",{attrs:{prop:"shipArrivepayFee",sortable:"",label:"到付(元)",width:"90"}}),r._v(" "),a("el-table-column",{attrs:{prop:"shipFromCityName",sortable:"",label:"发站",width:"120"},scopedSlots:r._u([{key:"default",fn:function(e){return[r._v("\n          "+r._s(r._processTableSlot(e,"shipFromCityName"))+"\n        ")]}}])}),r._v(" "),a("el-table-column",{attrs:{prop:"shipToCityName",sortable:"",label:"到站",width:"120"},scopedSlots:r._u([{key:"default",fn:function(e){return[r._v("\n          "+r._s(r._processTableSlot(e,"shipToCityName"))+"\n        ")]}}])}),r._v(" "),a("el-table-column",{attrs:{prop:"shipSenderName",sortable:"",label:"发货人",width:"90"}}),r._v(" "),a("el-table-column",{attrs:{prop:"shipSenderMobile",sortable:"",label:"发货人电话",width:"110"}}),r._v(" "),a("el-table-column",{attrs:{prop:"shipReceiverName",sortable:"",label:"收货人",width:"90"}}),r._v(" "),a("el-table-column",{attrs:{prop:"shipReceiverMobile",sortable:"",label:"收货人电话",width:"110"}}),r._v(" "),a("el-table-column",{attrs:{prop:"cargoName",sortable:"",label:"货品名",width:"120"}}),r._v(" "),a("el-table-column",{attrs:{prop:"repertoryAmount",sortable:"",label:"库存件数",width:"100"}}),r._v(" "),a("el-table-column",{attrs:{prop:"repertoryWeight",sortable:"",label:"库存重量",width:"100"}}),r._v(" "),a("el-table-column",{attrs:{prop:"repertoryVolume",sortable:"",label:"库存体积",width:"100"}}),r._v(" "),a("el-table-column",{attrs:{prop:"cargoAmount",sortable:"",label:"运单件数",width:"100"}}),r._v(" "),a("el-table-column",{attrs:{prop:"cargoWeight",sortable:"",label:"运单重量",width:"100"}}),r._v(" "),a("el-table-column",{attrs:{prop:"cargoVolume",sortable:"",label:"运单体积",width:"100"}}),r._v(" "),a("el-table-column",{attrs:{prop:"shipRemarks",sortable:"",label:"运单备注",width:"120"}})],1)],1),r._v(" "),a("div",{staticClass:"tableHeadItemBtn2",staticStyle:{height:"100%"},attrs:{slot:"tableRight"},slot:"tableRight"},[a("el-table",{key:r.tablekey,ref:"multipleTableLeft",attrs:{data:r.rightTable,border:"","tooltip-effect":"dark",triped:"",height:"100%","summary-method":r.getSumLeft,"default-sort":{prop:"id",order:"ascending"},"show-summary":!0},on:{"row-click":r.clickDetailsLeft,"selection-change":r.getSelectionLeft,"row-dblclick":r.dclickMinusItem}},[a("el-table-column",{attrs:{fixed:"",type:"index",width:"60",label:"序号"}}),r._v(" "),a("el-table-column",{attrs:{fixed:"",width:"50","render-header":r.setHeader2},scopedSlots:r._u([{key:"default",fn:function(t){return[a("el-button",{staticClass:"tableItemBtnMinus",attrs:{size:"mini"},on:{click:function(e){r.minusItem(t.row,t.$index)}}})]}}])}),r._v(" "),a("el-table-column",{attrs:{fixed:"",prop:"shipFromOrgName",label:"开单网点",width:"100"}}),r._v(" "),a("el-table-column",{attrs:{prop:"shipSn",label:"运单号",width:"120"}}),r._v(" "),a("el-table-column",{attrs:{prop:"shipGoodsSn",sortable:"",label:"货号",width:"140"}}),r._v(" "),a("el-table-column",{attrs:{prop:"oddNumbers",sortable:"",label:"中转单号",width:"120"},scopedSlots:r._u([{key:"default",fn:function(t){return[a("el-input",{attrs:{size:"mini",value:t.row.oddNumbers,required:""},on:{change:function(e){return r.changeRow("oddNumbers",t,e)}}})]}}])}),r._v(" "),a("el-table-column",{attrs:{prop:"transferCharge",sortable:"",label:"中转运费",width:"120"},scopedSlots:r._u([{key:"default",fn:function(t){return[a("el-input",{directives:[{name:"number-only",rawName:"v-number-only:point",arg:"point"}],attrs:{size:"mini",value:t.row.transferCharge},on:{change:function(e){return r.changeRow("transferCharge",t,e)}}})]}}])}),r._v(" "),a("el-table-column",{attrs:{prop:"deliveryExpense",sortable:"",label:"中转送货费",width:"120"},scopedSlots:r._u([{key:"default",fn:function(t){return[a("el-input",{directives:[{name:"number-only",rawName:"v-number-only:point",arg:"point"}],attrs:{size:"mini",value:t.row.deliveryExpense},on:{change:function(e){return r.changeRow("deliveryExpense",t,e)}}})]}}])}),r._v(" "),a("el-table-column",{attrs:{prop:"transferOtherFee",sortable:"",label:"中转其他费",width:"120"},scopedSlots:r._u([{key:"default",fn:function(t){return[a("el-input",{directives:[{name:"number-only",rawName:"v-number-only:point",arg:"point"}],attrs:{size:"mini",value:t.row.transferOtherFee},on:{change:function(e){return r.changeRow("transferOtherFee",t,e)}}})]}}])}),r._v(" "),a("el-table-column",{attrs:{prop:"totalCost",sortable:"",label:"中转费合计",width:"120"},scopedSlots:r._u([{key:"default",fn:function(t){return[a("el-input",{attrs:{size:"mini",disabled:""},model:{value:t.row.totalCost,callback:function(e){r.$set(t.row,"totalCost",e)},expression:"scope.row.totalCost"}})]}}])}),r._v(" "),a("el-table-column",{attrs:{prop:"paymentId",sortable:"",label:"中转费付款方式",width:"120"},scopedSlots:r._u([{key:"default",fn:function(t){return[a("selectType",{attrs:{type:"payment_type",size:"mini",value:t.row.paymentId,name:t.row.paymentName},on:{change:function(e){return r.changeRow("paymentId",t,e)}}})]}}])}),r._v(" "),a("el-table-column",{attrs:{prop:"shipArrivepayFee",sortable:"",label:"到付(元)",width:"90"}}),r._v(" "),a("el-table-column",{attrs:{prop:"repertoryAmount",sortable:"",label:"中转件数",width:"100"}}),r._v(" "),a("el-table-column",{attrs:{prop:"repertoryWeight",sortable:"",label:"中转重量",width:"100"}}),r._v(" "),a("el-table-column",{attrs:{prop:"repertoryVolume",sortable:"",label:"中转体积",width:"100"}}),r._v(" "),a("el-table-column",{attrs:{prop:"shipFromCityName",sortable:"",label:"发站",width:"120"},scopedSlots:r._u([{key:"default",fn:function(e){return[r._v("\n          "+r._s(r._processTableSlot(e,"shipFromCityName"))+"\n        ")]}}])}),r._v(" "),a("el-table-column",{attrs:{prop:"shipToCityName",sortable:"",label:"到站",width:"120"},scopedSlots:r._u([{key:"default",fn:function(e){return[r._v("\n          "+r._s(r._processTableSlot(e,"shipToCityName"))+"\n        ")]}}])}),r._v(" "),a("el-table-column",{attrs:{prop:"shipSenderName",sortable:"",label:"发货人",width:"90"}}),r._v(" "),a("el-table-column",{attrs:{prop:"shipSenderMobile",sortable:"",label:"发货人电话",width:"110"}}),r._v(" "),a("el-table-column",{attrs:{prop:"shipReceiverName",sortable:"",label:"收货人",width:"90"}}),r._v(" "),a("el-table-column",{attrs:{prop:"shipReceiverMobile",sortable:"",label:"收货人电话",width:"110"}}),r._v(" "),a("el-table-column",{attrs:{prop:"cargoName",sortable:"",label:"货品名",width:"120"}}),r._v(" "),a("el-table-column",{attrs:{prop:"shipRemarks",sortable:"",label:"运单备注",width:"120"}})],1)],1)],1)},staticRenderFns:[]};t.a=a},FnaA:function(e,t,r){"use strict";var a={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"transferload-steup"},[r("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"transferload-steup-form"},[r("el-collapse",{model:{value:t.loadTruck,callback:function(e){t.loadTruck=e},expression:"loadTruck"}},[r("el-collapse-item",{attrs:{name:"loadTruckOne"}},[r("template",{slot:"title"},[t._v("\n          中转信息  "),r("b",[t._v("中转批次："+t._s(t.formModel.transferBatchNo))])]),t._v(" "),r("div",{staticClass:"clearfix loadFrom"},[r("el-form",{ref:"formModel",staticClass:"demo-form-inline",attrs:{model:t.formModel,inline:!0,"label-width":"90px",rules:t.formModelRules}},[r("el-form-item",{key:t.carrierKey,staticClass:"addCarrierInput",attrs:{label:"承运商",prop:"carrierId"}},[r("i",{staticClass:"el-icon-plus el-input__icon",on:{click:function(e){t.doAction("addTruck")}}}),t._v(" "),r("querySelect",{attrs:{size:"mini",show:"select",search:"carrierName",remote:!0,name:t.carrierName,type:"carrier",valuekey:"carrierId"},on:{change:t.getCarrier},model:{value:t.formModel.carrierId,callback:function(e){t.$set(t.formModel,"carrierId",e)},expression:"formModel.carrierId"}})],1),t._v(" "),r("el-form-item",{staticClass:"formItemTextDanger",attrs:{prop:"transferTime",label:"中转日期"}},[r("el-date-picker",{attrs:{size:"mini","value-format":"yyyy-MM-dd HH:mm:ss",type:"datetime",placeholder:"中转日期"},model:{value:t.formModel.transferTime,callback:function(e){t.$set(t.formModel,"transferTime",e)},expression:"formModel.transferTime"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"承运商电话",prop:"carrierMobile"}},[r("el-input",{attrs:{size:"mini",disabled:"",placeholder:"承运商电话"},model:{value:t.formModel.carrierMobile,callback:function(e){t.$set(t.formModel,"carrierMobile",e)},expression:"formModel.carrierMobile"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"到站电话",prop:"arrivalMobile"}},[r("el-input",{directives:[{name:"number-only",rawName:"v-number-only"}],attrs:{size:"mini",maxlength:13,placeholder:"到站电话"},model:{value:t.formModel.arrivalMobile,callback:function(e){t.$set(t.formModel,"arrivalMobile",e)},expression:"formModel.arrivalMobile"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"备注",prop:"remark"}},[r("el-input",{attrs:{size:"mini",maxlength:250,placeholder:"备注"},model:{value:t.formModel.remark,callback:function(e){t.$set(t.formModel,"remark",e)},expression:"formModel.remark"}})],1)],1)],1)],2)],1),t._v(" "),r("div",{staticClass:"load_btn_boxs"},[r("el-button",{attrs:{size:"mini",icon:"el-icon-sort",plain:"",type:"primary",loading:t.loading},on:{click:function(e){t.doAction("finish")}}},[t._v("完成中转")])],1),t._v(" "),r("div",{staticClass:"load_btn_transferTable"},[r("dataTable",{attrs:{leftData:t.leftData,rightData:t.rightData},on:{loadTable:t.getLoadTable,regetList:t.regetList}})],1)],1),t._v(" "),r("addCraieer",{attrs:{orgid:t.otherinfo.orgid,popVisible:t.addCarrierVisible},on:{"update:popVisible":function(e){t.addCarrierVisible=e},success:t.fetchCarrierData}})],1)},staticRenderFns:[]};t.a=a},IcMT:function(e,t,r){"use strict";var a=r("PI8x"),i=r("QVoP");var o=function(e){r("jCPK")},n=r("VU/8")(a.a,i.a,o,null,null);t.a=n.exports},KDJv:function(e,t){},PI8x:function(e,t,r){"use strict";t.a={data:function(){return{isShowLeft:!1,isShowRight:!1,isShowReback:!1,searchForm:""}},methods:{doAction:function(e){switch(e){case"showAllLeft":this.showAllLeft();break;case"showAllRight":this.showAllRight();break;case"showReback":this.showReback()}},showAllLeft:function(){this.isShowLeft=!0,this.isShowRight=!1,this.isShowReback=!0},showAllRight:function(){this.isShowLeft=!1,this.isShowRight=!0,this.isShowReback=!0},showReback:function(){this.isShowReback=!1,this.isShowLeft=!1,this.isShowRight=!1}}}},QVoP:function(e,t,r){"use strict";var a={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"transferTable"},[r("div",{staticClass:"transferTable_header"},[r("div",{staticClass:"transferTable_searchs"},[r("div",{staticClass:"transferTable_fresh"},[t._t("tableRefresh")],2),t._v(" "),t._t("tableSearch")],2),t._v(" "),r("div",{staticClass:"transferTable_header_btn_direction"},[r("el-tooltip",{attrs:{effect:"dark",content:"向左侧拉伸",placement:"top-end"}},[r("el-button",{attrs:{icon:"el-icon-arrow-right",type:"primary",circle:"",disabled:t.isShowLeft,size:"mini",plain:""},on:{click:function(e){t.doAction("showAllLeft")}}})],1),t._v(" "),r("el-tooltip",{attrs:{effect:"dark",content:"向右侧拉伸",placement:"top-start"}},[r("el-button",{attrs:{icon:"el-icon-arrow-left",type:"primary",circle:"",disabled:t.isShowRight,size:"mini",plain:""},on:{click:function(e){t.doAction("showAllRight")}}})],1),t._v(" "),r("transition",{attrs:{name:"el-zoom-in-bottom"}},[t.isShowReback?r("el-button",{attrs:{icon:"el-icon-refresh",type:"primary",circle:"",size:"mini",plain:""},on:{click:function(e){t.doAction("showReback")}}}):t._e()],1),t._v(" "),r("div",{staticClass:"transferTable_header_btn_box clearfix"},[t._t("btnsBox")],2)],1)]),t._v(" "),r("div",{staticClass:"transferTable_content"},[r("div",{staticClass:"transferTable_content_table paddingRight",class:[t.isShowLeft?"showTableLeft":t.isShowRight?"shortTableLeft":""]},[t._t("tableLeft",[t._v("左边表格区")])],2),t._v(" "),r("div",{staticClass:"transferTable_content_table",class:[t.isShowRight?"showTableRight":""]},[t._t("tableRight",[t._v("右边表格区")])],2)])])},staticRenderFns:[]};t.a=a},Xv4N:function(e,t,r){"use strict";var a=r("woOf"),l=r.n(a),i=r("pAQG"),s=r("0xDb");t.a={components:{querySelect:i.a},data:function(){return{senderSearch:"",searchForm:{shipSn:""},btnsize:"mini",selectVal:"shipSn",resultList:[]}},props:{info:{type:Array,default:[]},showSearch:{type:String,default:""}},methods:{querySearch:function(e,t,r){console.log(this.info);var a=this.info;for(var i in this.searchForm[e]=t,this.selectVal=e,this.searchForm)void 0!==this.searchForm[i]&&""!==this.searchForm[i]||this.$emit("change",Object(s.objectMerge2)([],this.info));var o=t?a.filter(this.createFilter(t,e)):a;r(o);var n=[];o.forEach(function(e){n.push(e)}),this.resultList=l()([],n),this.$emit("change",n)},createFilter:function(t,r){return function(e){return-1!==e[r].toLowerCase().indexOf(t.toLowerCase())}},handleSelect:function(e){this.searchForm[this.selectVal]=e[this.selectVal],this.selectVal="";var t=[];t.push(e),this.$emit("change",t)},clearSender:function(e){this.searchForm=this.$options.data().searchForm},handleSelectAll:function(){this.searchForm.shipSn&&this.resultList.length&&(this.$emit("keyupEneter"),this.searchForm=this.$options.data().searchForm)}}}},ZVah:function(e,t,r){"use strict";var a=r("woOf"),i=r.n(a),o=r("0xDb"),n=r("exln"),l=r("t5DY"),s=r("pAQG"),c=r("bZax"),d=r("e/1Q");t.a={name:"ordertransferLoad",components:{dataTable:d.default,addCraieer:c.default,querySelect:s.a},data:function(){return{leftData:[],rightData:[],loadTableInfo:[],formModel:{transferBatchNo:"",carrierId:"",carrierMobile:"",arrivalMobile:"",transferTime:"",remark:""},formModelRules:{transferTime:[{required:!0,trigger:"blur",message:"请输入中转日期"}],transferBatchNo:[{required:!0,trigger:"blur"}]},loadTruck:"loadTruckOne",isModify:!1,addCarrierVisible:!1,loading:!1,carrierName:"",carrierKey:0,dataCache:{},cache:{}}},mounted:function(){console.log("transferId:",this.$route),this.init()},activated:function(){this.regetList()},methods:{regetList:function(){this.rightData=[],this.leftData=[],this.getSelectAddLoadRepertoryList()},fetchCarrierData:function(){this.carrierKey=Math.random()},init:function(){var t=this,e=this.$route.query.transferId;this.reset(),void 0!==e?(this.isModify=!0,this.formModel.transferBatchNo=e,this.getUpdateTransferDetail()):(this.isModify=!1,this.gettransferBatchNo(),Object(l.k)().then(function(e){t.formModel.transferTime=Object(o.parseTime)(new Date(e))}).catch(function(e){t.loading=!1,t._handlerCatchMsg(e)})),this.getSelectAddLoadRepertoryList()},gettransferBatchNo:function(){var t=this;if(!this.cache.transferBatchNo)return n.d(this.otherinfo.orgid).then(function(e){t.cache.transferBatchNo=e.data,t.formModel.transferBatchNo=e.data}).catch(function(e){t.loading=!1,t._handlerCatchMsg(e)});this.formModel.transferBatchNo=this.cache.transferBatchNo},getSelectAddLoadRepertoryList:function(){var t=this;return this.isModify?n.g(this.otherinfo.orgid,this.formModel.transferBatchNo).then(function(e){t.leftData=e.data}).catch(function(e){t.loading=!1,t._handlerCatchMsg(e)}):n.e(this.otherinfo.orgid).then(function(e){t.leftData=e.data}).catch(function(e){t.loading=!1,t._handlerCatchMsg(e)})},goTransferList:function(){this.eventBus.$emit("replaceCurrentView","/operation/order/transfer/transfered")},getUpdateTransferDetail:function(){var r=this,a=this.otherinfo.orgid+":"+this.formModel.transferBatchNo;return this.dataCache[a]?(this.setTransferDetail(this.dataCache[a]),!0):n.h(this.otherinfo.orgid,this.formModel.transferBatchNo).then(function(e){var t=e.data;t.transferBatchNo?(r.dataCache[a]=t,r.setTransferDetail(t)):r.$alert("当前批次号不存在","提示",{confirmButtonText:"确定",callback:function(e){r.goTransferList()}})}).catch(function(e){r.$alert("当前批次号不存在","提示",{confirmButtonText:"确定",callback:function(e){r.goTransferList()}})})},setTransferDetail:function(e){for(var t in this.formModel)this.formModel[t]=e[t];this.formModel.transferTime=Object(o.parseTime)(new Date(this.formModel.transferTime)),this.rightData=e.tmsOrderTransferDetails||[],this.loadTableInfo=this.rightData,this.carrierName=e.carrierName},doAction:function(e){switch(e){case"reset":this.resetFieldsForm("formModel");break;case"finish":this.finishLoadInfo();break;case"addTruck":this.addCarrier()}},finishLoadInfo:function(){var a=this;if(this.loading)return!1;this.$refs.formModel.validate(function(e){if(e)if(a.loadTableInfo.length<1)a.$message({type:"warning",message:"右边数据表格不能为空"});else{var t=void 0,r=i()({},a.formModel);r.tmsOrderTransferDetails=a.loadTableInfo.map(function(e){var t={repertoryId:e.repertoryId,shipId:e.shipId,childShipId:e.childShipId,oddNumbers:e.oddNumbers,transferCharge:e.transferCharge,deliveryExpense:e.deliveryExpense,transferOtherFee:e.transferOtherFee,totalCost:e.totalCost,paymentId:e.paymentId};return e.id&&(t.id=e.id),t}),a.isModify?(a.loading=!0,t=n.j(r)):(a.loading=!0,t=n.i(r)),t.then(function(e){a.loading=!1,a.isModify,a.$message.success("保存成功！"),a.goTransferList()}).catch(function(e){a.loading=!1,a._handlerCatchMsg(e)})}else a.$message({type:"warning",message:"请填写完整表单"})})},reset:function(){this.resetFieldsForm("formModel"),this.getSelectAddLoadRepertoryList(),this.carrierName="",this.rightData=[],this.loadTableInfo=[]},getLoadTable:function(e){this.loadTableInfo=e||[]},resetFieldsForm:function(e){this.$refs[e].resetFields()},getCarrier:function(e){e&&(this.formModel.carrierMobile=e.carrierMobile)},addCarrier:function(){this.addCarrierVisible=!0}},beforeRouteUpdate:function(e,t,r){r(),this.init()}}},bZax:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=r("frTf"),i=r("ubb7");var o=function(e){r("8Hxk")},n=r("VU/8")(a.a,i.a,o,null,null);t.default=n.exports},"e/1Q":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=r("BcEV"),i=r("FB6m");var o=function(e){r("jtj/")},n=r("VU/8")(a.a,i.a,o,null,null);t.default=n.exports},exln:function(e,t,r){"use strict";t.e=function(e){return i.b.get("/api-order/order/load/v1/selectAddLoadRepertoryList/",{params:{orgId:e}}).then(i.a)},t.i=function(e){return i.b.post("/api-order/order/transfer/v1/insertTransfer",e).then(i.a)},t.j=function(e){return i.b.put("/api-order/order/transfer/v1/updateTransfer",e).then(i.a)},t.g=function(e,t){return i.b.get("/api-order/order/transfer/v1/selectUpdateLoadRepertoryList",{params:{batchNo:t,orgId:e}}).then(i.a)},t.h=function(e,t){return i.b.get("/api-order/order/transfer/v1/selectUpdateTransferDetailList",{params:{batchNo:t,orgId:e}}).then(i.a)},t.c=function(e){return i.b.post("/api-order/order/transfer/v1/selectAlreadyTransferList",e).then(i.a).then(function(e){return e.data||{list:[],total:0}})},t.b=function(e){return i.b.post("/api-order/order/transfer/v1/selectTransferBatchList",e).then(i.a).then(function(e){return e.data||{list:[],total:0}})},t.f=function(e){return i.b.post("/api-order/order/transfer/v1/selectTransferBatchDetailsList",e).then(i.a).then(function(e){return e.data||[]})},t.a=function(e,t,r){return i.b.delete("/api-order/order/transfer/v1/cancelTransfer?orgId="+e+"&batchNos="+t+"&shipIds="+r).then(i.a)},t.d=function(e){return i.b.get("/api-order/order/transfer/v1/getBatchNo",{params:{orgId:e}}).then(i.a)};var a=r("//Fk"),i=(r.n(a),r("Vo7i"))},frTf:function(e,t,r){"use strict";var a=r("woOf"),i=r.n(a),o=r("Dd8w"),n=r.n(o),l=r("E4LH"),s=r("4UdH"),c=r("P5Di"),d=r("QbVN"),f=r("o9X6"),h=r("NYxO");t.a={components:{popRight:c.a,Upload:d.a,SelectTree:f.a},props:{popVisible:{type:Boolean,default:!1},orgid:{required:!0},isModify:{type:Boolean,default:!1},info:{type:Object,default:function(){}},issender:{type:Boolean,dafault:!1}},computed:n()({},Object(h.mapGetters)(["otherinfo"])),data:function(){var t=this;return{form:{carrierAddr:"",carrierMobile:"",carrierName:"",carrierRemarks:"",carrierSn:"",contractEndtime:"",contractStarttime:"",customerServicePhone:"",liableName:"",liablePhone:"",orgid:0},formLabelWidth:"100px",tooltip:!1,rules:{carrierName:[{required:!0,message:"请输入承运商名称"}],orgid:[{required:!0,message:"请选择所属机构"}],carrierMobile:[{required:!0,trigger:"change",validator:function(e,t,r){""!==t&&null!==t&&t&&void 0!==t?l.a.MOBILE.test(t)?r():r(new Error("请输11位手机号码")):r(new Error("不能为空"))}}],liablePhone:[],carrierSn:[{message:"仅限字母或数字组合",pattern:l.a.ONLY_NUMBER_AND_LETTER}]},popTitle:"新增承运商",orgArr:[],rolesArr:[],departmentArr:[],loading:!1,roles:[],departments:[],groups:[],inited:!1,pickOption:{firstDayOfWeek:1,disabledDate:function(e){return!!t.form.contractEndtime&&e.getTime()>t.form.contractEndtime}},pickOption2:{firstDayOfWeek:1,disabledDate:function(e){return!!t.form.contractStarttime&&e.getTime()<t.form.contractStarttime}}}},mounted:function(){this.form.orgid=this.orgid,this.inited||(this.inited=!0,this.initInfo())},watch:{popVisible:function(e,t){this.inited||(this.inited=!0,this.initInfo()),e&&!this.isModify&&this.getCarrierSn()},orgid:function(e){this.form.orgid=e},info:function(){if(this.isModify){this.popTitle="修改承运商";var e=i()({},this.info);for(var t in this.form)this.form[t]=e[t];this.form.carrierId=e.carrierId}else{for(var r in this.popTitle="新增承运商",this.getCarrierSn(),this.form)this.form[r]="";delete this.form.carrierId,this.form.orgid=this.orgid}}},methods:{getCarrierSn:function(){var t=this;return this.loading=!0,Object(s.c)().then(function(e){t.form.carrierSn=e.data,console.log(e.data),t.loading=!1}).catch(function(e){t._handlerCatchMsg(e)})},initInfo:function(){this.loading=!1},getOrgid:function(e){this.form.orgid=e},submitForm:function(e,r){var a=this;this.$refs[e].validate(function(e){if(!e)return!1;a.loading=!0;var t=i()({},a.form);t.fixPhone=a.fixPhone;(a.isModify?Object(s.e)(t):Object(s.d)(t)).then(function(e){a.loading=!1,a.$message.success("保存成功"),a.reset(),r?(a.form.orgid=a.orgid,a.getCarrierSn()):a.closeMe(),a.$emit("success")}).catch(function(e){a._handlerCatchMsg(e),a.loading=!1})})},reset:function(){var e=this.form.orgid;this.$refs.ruleForm.resetFields(),this.form.orgid=e},closeMe:function(e){this.reset(),this.$emit("update:popVisible",!1),"function"==typeof e&&e()}}}},jCPK:function(e,t){},"jtj/":function(e,t){},mYQo:function(e,t,r){"use strict";var a={render:function(){var r=this,e=r.$createElement,t=r._self._c||e;return t("el-form",{ref:"searchForm",staticClass:"tableHeadItemForm",attrs:{inline:"","label-position":"right",model:r.searchForm,"label-width":"70px"},nativeOn:{submit:function(e){e.preventDefault()}}},[t("el-form-item",{attrs:{label:"运单号"}},[t("el-autocomplete",{attrs:{size:r.btnsize,"popper-class":"popperHide","fetch-suggestions":function(e,t){return r.querySearch("shipSn",e,t)},placeholder:"运单号搜索"},on:{select:r.handleSelect},nativeOn:{keyup:function(e){return"button"in e||!r._k(e.keyCode,"enter",13,e.key,"Enter")?r.handleSelectAll(e):null}},model:{value:r.searchForm.shipSn,callback:function(e){r.$set(r.searchForm,"shipSn",e)},expression:"searchForm.shipSn"}})],1)],1)},staticRenderFns:[]};t.a=a},mZ46:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=r("Xv4N"),i=r("mYQo");var o=function(e){r("pVhU")},n=r("VU/8")(a.a,i.a,o,null,null);t.default=n.exports},pVhU:function(e,t){},ubb7:function(e,t,r){"use strict";var a={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("pop-right",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"addCarrierPop",attrs:{title:t.popTitle,isShow:t.popVisible},on:{close:t.closeMe}},[r("template",{staticClass:"addCarrierPop-content",slot:"content"},[r("el-form",{ref:"ruleForm",attrs:{model:t.form,rules:t.rules,"label-width":t.formLabelWidth,inline:!0,"label-position":"right",size:"mini"}},[r("el-form-item",{attrs:{label:"归属网点",prop:"orgid"}},[r("SelectTree",{attrs:{orgid:t.otherinfo.orgid},model:{value:t.form.orgid,callback:function(e){t.$set(t.form,"orgid",e)},expression:"form.orgid"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"承运商编码",prop:"carrierSn"}},[r("el-input",{attrs:{maxlength:11,"auto-complete":"off"},model:{value:t.form.carrierSn,callback:function(e){t.$set(t.form,"carrierSn","string"==typeof e?e.trim():e)},expression:"form.carrierSn"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"承运商",prop:"carrierName"}},[r("el-input",{attrs:{maxlength:20,"auto-complete":"off"},model:{value:t.form.carrierName,callback:function(e){t.$set(t.form,"carrierName","string"==typeof e?e.trim():e)},expression:"form.carrierName"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"承运商电话",prop:"carrierMobile"}},[r("el-input",{attrs:{maxlength:11,"auto-complete":"off"},model:{value:t.form.carrierMobile,callback:function(e){t.$set(t.form,"carrierMobile",e)},expression:"form.carrierMobile"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"负责人",prop:"liableName"}},[r("el-input",{attrs:{maxlength:25,"auto-complete":"off"},model:{value:t.form.liableName,callback:function(e){t.$set(t.form,"liableName",e)},expression:"form.liableName"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"负责人手机",prop:"liablePhone"}},[r("el-input",{directives:[{name:"numberOnly",rawName:"v-numberOnly"}],attrs:{maxlength:11,"auto-complete":"off"},model:{value:t.form.liablePhone,callback:function(e){t.$set(t.form,"liablePhone",e)},expression:"form.liablePhone"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"合同起始日",prop:"contractStarttime"}},[r("el-date-picker",{attrs:{align:"right",type:"date",placeholder:"选择日期","value-format":"timestamp","picker-options":t.pickOption},model:{value:t.form.contractStarttime,callback:function(e){t.$set(t.form,"contractStarttime",e)},expression:"form.contractStarttime"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"合同终止日",prop:"contractEndtime"}},[r("el-date-picker",{attrs:{align:"right",type:"date","picker-options":t.pickOption2,placeholder:"选择日期","value-format":"timestamp"},model:{value:t.form.contractEndtime,callback:function(e){t.$set(t.form,"contractEndtime",e)},expression:"form.contractEndtime"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"客服电话",prop:"customerServicePhone"}},[r("el-input",{directives:[{name:"numberOnly",rawName:"v-numberOnly"}],attrs:{maxlength:11,"auto-complete":"off"},model:{value:t.form.customerServicePhone,callback:function(e){t.$set(t.form,"customerServicePhone",e)},expression:"form.customerServicePhone"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"地址",prop:"carrierAddr"}},[r("el-input",{attrs:{maxlength:50,"auto-complete":"off"},model:{value:t.form.carrierAddr,callback:function(e){t.$set(t.form,"carrierAddr","string"==typeof e?e.trim():e)},expression:"form.carrierAddr"}})],1),t._v(" "),r("el-form-item",{staticClass:"carrierRemarks",attrs:{label:"备注",prop:"carrierRemarks"}},[r("el-input",{attrs:{type:"textarea",maxlength:300},model:{value:t.form.carrierRemarks,callback:function(e){t.$set(t.form,"carrierRemarks",e)},expression:"form.carrierRemarks"}})],1)],1)],1),t._v(" "),r("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t.isModify?t._e():r("el-button",{attrs:{type:"primary"},on:{click:function(e){t.submitForm("ruleForm",!0)}}},[t._v("保存并添加")]),t._v(" "),r("el-button",{attrs:{type:"primary"},on:{click:function(e){t.submitForm("ruleForm")}}},[t._v("保 存")]),t._v(" "),r("el-button",{on:{click:t.closeMe}},[t._v("取 消")])],1)],2)},staticRenderFns:[]};t.a=a}});