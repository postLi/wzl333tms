webpackJsonp([212,284],{"4NG3":function(e,t,i){"use strict";var l={render:function(){var i=this,e=i.$createElement,t=i._self._c||e;return t("el-form",{ref:"searchForm",staticClass:"tableHeadItemForm",attrs:{inline:"","label-position":"right",model:i.searchForm,"label-width":"70px"}},[t("el-form-item",{attrs:{label:"到站"}},[t("el-autocomplete",{attrs:{size:i.btnsize,clearable:"","popper-class":"popperHide","fetch-suggestions":function(e,t){return i.querySearch("shipToCityName",e,t)},placeholder:"到站搜索"},on:{select:i.handleSelect},model:{value:i.searchForm.shipToCityName,callback:function(e){i.$set(i.searchForm,"shipToCityName",e)},expression:"searchForm.shipToCityName"}})],1)],1)},staticRenderFns:[]};t.a=l},"7p/c":function(e,t,i){"use strict";var l=i("woOf"),a=i.n(l),n=i("DAYN"),h=(i.n(n),i("TsW9"),i("0xDb")),o=i("Lokx"),r=i.n(o),s=i("RSru");t.a={components:{currentSearch:s.default},props:{getinfoed:Boolean,truckIndex:{type:[Number,String],default:function(){}},loadTable:{type:Object,default:function(){}},delData:{type:Object,default:function(){}},resetTuckLoad:{type:[Number,String],default:function(){}},addOrgRightTable:{type:[String,Number],default:function(){}},dofo:{type:[Array,Object]},schemeIndex:{type:[Number,String],default:""},submitLoadNew:{type:Object,default:{}},handlingFeeInfo:{type:Object,default:function(){}}},data:function(){return{isDelOtherTruck:!1,tablekey:0,loading:!1,showTableMessage:"全屏查看",isShowLeftTable:!1,isShowRightTable:!1,isDel:!1,orgData:{},leftTable:[],orgLeftTable:[],rightTable:[],orgRightTable:[],selectedRight:[],selectedLeft:[],tableColumnLeft:[],tableColumnLeftDepart:[{label:"运单号",prop:"shipSn",width:"130"},{label:"库存重量",prop:"repertoryWeight"},{label:"库存体积",prop:"repertoryVolume"}],tableColumnLeftAll:[{label:"运单号",prop:"shipSn",width:"140"},{label:"库存重量",prop:"repertoryWeight"},{label:"库存体积",prop:"repertoryVolume"},{label:"到达网点",prop:"shipToOrgName"},{label:"到站",prop:"shipToCityName"},{label:"货品名",prop:"cargoName"},{label:"开单网点",prop:"shipFromOrgName"},{label:"发站",prop:"shipFromCityName"},{label:"发货人",prop:"shipSenderName"},{label:"收货人",prop:"shipReceiverName"}],tableColumnRight:[],tableColumnRightDepart:[{label:"运单号",prop:"shipSn",width:"140"},{label:"到达网点",prop:"shipToOrgName"},{label:"到站",prop:"shipToCityName"},{label:"货品名",prop:"cargoName"},{label:"操作费",prop:"handlingFee"},{label:"库存重量",prop:"repertoryWeight"},{label:"库存体积",prop:"repertoryVolume"}],tableColumnRightAll:[{label:"运单号",prop:"shipSn",width:"140"},{label:"操作费",prop:"handlingFee"},{label:"到达网点",prop:"shipToOrgName"},{label:"到站",prop:"shipToCityName"},{label:"货品名",prop:"cargoName"},{label:"库存重量",prop:"repertoryWeight"},{label:"库存体积",prop:"repertoryVolume"},{label:"库存件数",prop:"repertoryAmount"},{label:"发站",prop:"shipFromCityName"},{label:"开单网点",prop:"shipFromOrgName"},{label:"发货人",prop:"shipSenderName"},{label:"收货人",prop:"shipReceiverName"},{label:"货号",prop:"shipGoodsSn"}],oldList:[],newList:[],sortable:null,isChangeHandlingFee:!1}},watch:{handlingFeeInfo:{handler:function(e,t){console.log("-----获取操作费 obj 2------",e,t),e&&this.countHandingFee()},deep:!0},submitLoadNew:{handler:function(e,t){if(e&&e.right){console.log("jsdifjisdjfisjdifjsifjiwjeifjsdijf",e,t);var i=[];this.orgLeftTable=a()([],e.left),e.right.forEach(function(e){i.push(e.tmsOrderLoadDetailsList)}),this.orgRightTable=a()([],i)}}},schemeIndex:{handler:function(e,t){console.log("schemeIndex watch",e,t)}},getinfoed:function(){this.getinfoed&&(this.getinfoed2=!0)},loadTable:{handler:function(e,t){console.log("loadTable1"),this.getinfoed2?console.log("loadTable2"):(e&&(console.log("loadTable3"),this.isDelOtherTruck=!1),this.isChangeHandlingFee||(this.orgData=a()([],e),this.orgRightTable=a()([],e.right),this.orgLeftTable=a()([],e.left),this.leftTable=a()([],e.left),this.oldList=this.rightTable.map(function(e){return e.repertoryId}),this.newList=this.oldList.slice(),this.initTable()))},deep:!0},truckIndex:{handler:function(e,t){console.log("truckIndex"),this.initTable()},deep:!0},delData:{handler:function(e,t){var i=this;this.isDel=!0,e.list.carLoadDetail&&0<e.list.carLoadDetail.length?(this.selectedRight=[],e.list.carLoadDetail.forEach(function(e){i.selectedRight.push(e)}),this.goLeft()):this.orgRightTable.splice(this.delData.number,1)},deep:!0},resetTuckLoad:{handler:function(i,e){var l=this;if(""!==i){this.selectedRight=[];var t=Number(i||0)-Number(this.orgRightTable.length?this.orgRightTable.length:0);if(0<t)for(var a=0;a<t;a++)this.orgRightTable.push([]);else this.orgRightTable.forEach(function(e,t){t>=Number(i)&&(e.forEach(function(e){l.selectedRight.push(e)}),l.orgRightTable[t]=[])}),this.isDelOtherTruck=!0,this.goLeft()}},deep:!0},rightTable:function(){console.log("rightTable:",this.rightTable.length),this.$emit("leftTable",this.leftTable)},leftTable:function(){console.log("leftTable:",this.leftTable.length),this.$emit("leftTable",this.leftTable)},addOrgRightTable:{handler:function(e,t){e!==t&&(console.log("添加车型前的orgRightTable",this.orgRightTable.length,this.orgRightTable),this.orgRightTable.push([]),console.log("添加车型后的orgRightTable",this.orgRightTable.length,this.orgRightTable))},deep:!0}},mounted:function(){this.tableColumnLeft=a()([],this.tableColumnLeftDepart),this.tableColumnRight=a()([],this.tableColumnRightDepart),this.initTable()},computed:{dofoLen:function(){return this.dofo?this.dofo.length:0},showLeftStyle:function(){return{width:this.isShowLeftTable?"100%":this.isShowRightTable?"0%":"30%",transition:"0.3s"}},showRightStyle:function(){return{width:this.isShowRightTable?"100%":this.isShowLeftTable?"0%":"70%",transition:"0.3s"}}},methods:{initTable:function(){var i=this;console.log("#$%#$%#$1 initTable"),this.rightTable=Object(h.objectMerge2)([],this.orgRightTable[this.truckIndex]);var l=[];this.orgRightTable.forEach(function(e,t){e&&e.forEach(function(e){l.push(e)})}),l.length?l.forEach(function(t,e){i.leftTable=i.leftTable.filter(function(e){return e.repertoryId!=t.repertoryId}),i.orgLeftTable=a()([],i.leftTable)}):this.leftTable=a()([],this.orgLeftTable),this.$nextTick(function(){i.setSort()}),this.$emit("loadCurTable",this.rightTable),this.$emit("loadTable",this.orgRightTable)},fetchList:function(){this.leftTable=this.$options.data().leftTable,this.rightTable=this.$options.data().rightTable},getSearch:function(e){this.leftTable=e},setSort:function(){var l=this,e=document.querySelectorAll(".transferTable_main_right .el-table__body-wrapper > table > tbody")[0];this.sortable=r.a.create(e,{ghostClass:"sortable-ghost",setData:function(e){e.setData("Text","")},onEnd:function(e){var t=l.rightTable.splice(e.oldIndex,1)[0];l.rightTable.splice(e.newIndex,0,t),l.orgRightTable[l.truckIndex]=a()([],l.rightTable);var i=l.newList.splice(e.oldIndex,1)[0];l.newList.splice(e.newIndex,0,i)}})},setHeaderAdd:function(e,t){t.column;return e("el-button",{props:{size:"mini"},class:{tableItemBtn:!0},on:{click:this.addALLList}})},setHeaderMinus:function(e,t){t.column;return e("el-button",{props:{size:"mini"},class:{tableItemBtnMinus:!0},on:{click:this.minusAllList}})},goLeft:function(){var i=this;this.selectedRight.forEach(function(t,e){0===i.leftTable.filter(function(e){return e.repertoryId===t.repertoryId}).length&&(i.leftTable.push(t),i.orgLeftTable.push(t),i.rightTable=Object(h.objectMerge2)([],i.rightTable).filter(function(e){return e.repertoryId!==t.repertoryId}),i.isDelOtherTruck&&(i.orgRightTable=i.orgRightTable.splice(0,Number(i.resetTuckLoad))),i.orgRightTable[i.truckIndex]=Object(h.objectMerge2)([],i.orgRightTable[i.truckIndex]).filter(function(e){return e.repertoryId!==t.repertoryId}))}),this.isDel&&(this.orgRightTable.splice(this.delData.number,1),this.isDel=!1),this.countHandingFee(),this.$nextTick(function(){i.setSort()}),this.$emit("loadCurTable",this.rightTable),this.$emit("loadTable",this.orgRightTable)},goRight:function(){var i=this;0===this.dofoLen?this.$message.warning("请添加一个车型！"):(this.selectedLeft.forEach(function(t,e){0===i.rightTable.filter(function(e){return e.repertoryId===t.repertoryId}).length&&(i.rightTable.push(t),i.orgRightTable[i.truckIndex]=i.orgRightTable[i.truckIndex]||[],i.orgRightTable[i.truckIndex].push(t),i.leftTable=Object(h.objectMerge2)([],i.leftTable).filter(function(e){return e.repertoryId!==t.repertoryId}),i.orgLeftTable=i.orgLeftTable.filter(function(e){return e.repertoryId!==t.repertoryId}))}),this.countHandingFee(),this.$nextTick(function(){i.setSort()}),this.tablekey=(new Date).getTime(),this.$emit("loadCurTable",this.rightTable),this.$emit("loadTable",this.orgRightTable))},dclickAddItem:function(e,t){this.selectedLeft=[],this.selectedLeft.push(e),this.goRight()},dclickMinusItem:function(e,t){this.selectedRight=[],this.selectedRight.push(e),this.goLeft()},addItem:function(e,t){this.selectedLeft=[],this.selectedLeft[0]=e,this.goRight()},minusItem:function(e,t){this.selectedRight=[],this.selectedRight[t]=e,this.goLeft()},addALLList:function(){this.selectedLeft=a()([],this.leftTable),this.goRight()},minusAllList:function(){this.selectedRight=a()([],this.rightTable),this.goLeft()},clickLeftRow:function(e){this.$refs.multipleTableLeft.toggleRowSelection(e)},clickRightRow:function(e){this.$refs.multipleTableRight.toggleRowSelection(e)},countHandingFee:function(){var l=this;if(this.handlingFeeInfo.apportionTypeId&&this.handlingFeeInfo.handlingFeeAll&&0!==this.rightTable.length){switch(this.isChangeHandlingFee=!0,console.log("-----获取操作费 switch 3------ "),this.handlingFeeInfo.apportionTypeId){case 45:var a=0,n=0;this.rightTable.forEach(function(e){a=h.tmsMath._add(a,e.brokerageFee?e.brokerageFee:0),n=h.tmsMath._add(n,e.shipTotalFee?e.shipTotalFee:0)}),this.rightTable.forEach(function(e,t){var i=h.tmsMath._sub(e.shipTotalFee,e.brokerageFee);i<0?(console.log("-----获取操作费 switch 4------ ",i),e.handlingFee=0):e.handlingFee=l.calc(h.tmsMath._mul(h.tmsMath._div(h.tmsMath._sub(e.shipTotalFee,e.brokerageFee),h.tmsMath._sub(n,a)),l.handlingFeeInfo.handlingFeeAll))});break;case 44:this.rightTable.forEach(function(e,t){e.handlingFee=l.calc(h.tmsMath._div(l.handlingFeeInfo.handlingFeeAll,l.rightTable.length))});break;case 43:var i=0;this.rightTable.map(function(e){i=h.tmsMath._add(i,e.repertoryWeight)}),this.rightTable.forEach(function(e,t){e.handlingFee=l.calc(h.tmsMath._mul(h.tmsMath._div(e.repertoryWeight,i),l.handlingFeeInfo.handlingFeeAll))});break;case 42:var o=0;this.rightTable.map(function(e){o=h.tmsMath._add(o,e.repertoryVolume)}),this.rightTable.forEach(function(e,t){e.handlingFee=l.calc(h.tmsMath._mul(h.tmsMath._div(e.repertoryVolume,o),l.handlingFeeInfo.handlingFeeAll))});break;case 41:var r=0;this.rightTable.map(function(e){r=h.tmsMath._add(r,e.repertoryAmount)}),this.rightTable.forEach(function(e,t){e.handlingFee=l.calc(h.tmsMath._mul(h.tmsMath._div(e.repertoryAmount,r),l.handlingFeeInfo.handlingFeeAll))})}var s=0;this.rightTable.length;this.rightTable.forEach(function(e,t){(s=h.tmsMath._add(s,e.handlingFee))>l.handlingFeeInfo.handlingFeeAll&&(e.handlingFee=h.tmsMath._sub(e.handlingFee,h.tmsMath._sub(s,l.handlingFeeInfo.handlingFeeAll)),s=l.handlingFeeInfo.handlingFeeAll),e.handlingFee=e.handlingFee?e.handlingFee:0,0===e.handlingFee&&0}),s<this.handlingFeeInfo.handlingFeeAll&&(this.rightTable[this.rightTable.length-1].handlingFee=h.tmsMath._add(this.rightTable[this.rightTable.length-1].handlingFee,h.tmsMath._sub(this.handlingFeeInfo.handlingFeeAll,s))),this.orgRightTable[this.truckIndex]=this.rightTable}},calc:function(e){return h.tmsMath._div(Math.round(h.tmsMath._mul(e,100)),100)},getSelectionLeft:function(e){},getSelectionRight:function(e){},showAllLeft:function(){this.isShowLeftTable=!this.isShowLeftTable,this.tableColumnLeft=this.isShowLeftTable?a()([],this.tableColumnLeftAll):this.tableColumnLeftDepart,this.showTableMessage=this.isShowLeftTable?"点击隐藏":"全屏查看",console.log(this.isShowLeftTable,"左"),this.$emit("showViewTable",this.isShowLeftTable)},showAllRight:function(){this.isShowRightTable=!this.isShowRightTable,this.tableColumnRight=this.isShowRightTable?a()([],this.tableColumnRightAll):this.tableColumnRightDepart,this.showTableMessage=this.isShowRightTable?"点击隐藏":"全屏查看",console.log(this.isShowRightTable,"右"),this.$emit("showViewTable",this.isShowRightTable)},paramSet:function(){this.$emit("openParamSet")}}}},HAQ7:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=i("7p/c"),a=i("bx3+");var n=function(e){i("isco")},o=i("VU/8")(l.a,a.a,n,null,null);t.default=o.exports},RSru:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=i("x9WB"),a=i("4NG3");var n=function(e){i("hQzi")},o=i("VU/8")(l.a,a.a,n,null,null);t.default=o.exports},TsW9:function(e,t,i){"use strict";t.a=function(e,t){return l.b.get("/api-order/order/load/v1/getBatchNo/",{params:{orgId:e,loadTypeId:t}})},t.h=function(e){return l.b.post("/api-order/order/load/v1/",e)},t.i=function(e){return l.b.put("/api-order/order/load/v1/",e)},t.c=function(e){return l.b.get("/api-order/order/load/v1/selectAddLoadRepertoryList/",{params:{orgId:e}})},t.f=function(e,t){return l.b.get("/api-order/order/load/v1/selectUpdateLoadRepertoryList/?orgId="+e+"&loadId="+t)},t.g=function(e,t){return l.b.get("/api-order/order/load/v1/selectUpdateLoadDetailList/?orgId="+e+"&loadId="+t)},t.d=function(e){return l.b.get("/api-order/order/load/v1/selectLoadDetailList/",{params:{loadId:e}})},t.e=function(){return l.b.get("/api-system/system/trunk/v1/findCarAndDriver/").then(function(e){return e})},t.b=function(){return l.b.get("/api-system/system/trunk/v1/findDriverAndCar/").then(function(e){return e})};var l=i("Vo7i")},"bx3+":function(e,t,i){"use strict";var l={render:function(){var i=this,e=i.$createElement,l=i._self._c||e;return l("div",{directives:[{name:"loading",rawName:"v-loading",value:i.loading,expression:"loading"}],staticClass:"transferTable_wrapper"},[l("div",{staticClass:"transferTable_head clearfix"}),i._v(" "),l("div",{staticClass:"transferTable_main"},[l("div",{staticClass:"transferTable_main_left",staticStyle:{height:"100%"},style:i.showLeftStyle},[l("div",{staticClass:"transferTable_main_left_head"},[i.isShowRightTable?i._e():l("b",[i._v("库存运单")]),i._v(" "),i.isShowRightTable?i._e():l("currentSearch",{attrs:{info:i.orgLeftTable},on:{change:i.getSearch}}),i._v(" "),i.isShowRightTable?i._e():l("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:i.showTableMessage,placement:"left"}},[l("el-button",{attrs:{icon:i.isShowLeftTable?"el-icon-close":"el-icon-rank",type:"primary",circle:"",size:"mini",plain:""},on:{click:i.showAllLeft}})],1)],1),i._v(" "),l("el-table",{key:i.tablekey,ref:"multipleTableLeft",staticClass:"tableHeadItemBtn",staticStyle:{height:"100%",width:"100%"},attrs:{data:i.leftTable,"show-overflow-tooltip":!0,height:"100%","tooltip-effect":"dark",border:"",triped:""},on:{"row-dblclick":i.dclickAddItem,"row-click":i.clickLeftRow,"selection-change":i.getSelectionLeft}},[l("el-table-column",{attrs:{fixed:"",sortable:"",width:"50",label:"序号"},scopedSlots:i._u([{key:"default",fn:function(e){return[i._v("\n            "+i._s(e.$index+1)+"\n          ")]}}])}),i._v(" "),l("el-table-column",{attrs:{fixed:"","render-header":i.setHeaderAdd,width:"50"},scopedSlots:i._u([{key:"default",fn:function(t){return[l("el-button",{staticClass:"tableItemBtn",attrs:{size:"mini"},on:{click:function(e){i.addItem(t.row,t.$index)}}})]}}])}),i._v(" "),i._l(i.tableColumnLeft,function(e){return[l("el-table-column",{key:e.id,attrs:{prop:e.prop,fixed:e.fixed,label:e.label,width:e.width,sortable:""}})]})],2)],1),i._v(" "),l("div",{staticClass:"transferTable_main_right",staticStyle:{height:"100%"},style:i.showRightStyle},[l("div",{staticClass:"transferTable_main_right_head"},[i.isShowLeftTable?i._e():l("b",[i._v("配载清单"),i.isShowLeftTable?i._e():l("span",[i._v(" (可拖拽调整顺序)")])]),i._v(" "),i.isShowLeftTable?i._e():l("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:i.showTableMessage,placement:"top"}},[l("el-button",{attrs:{icon:i.isShowRightTable?"el-icon-close":"el-icon-rank",type:"primary",circle:"",size:"mini",plain:""},on:{click:i.showAllRight}})],1),i._v(" "),i.isShowLeftTable?i._e():l("el-button",{staticStyle:{margin:"0 10px"},attrs:{type:"primary",size:"mini",plain:"",icon:"el-icon-setting"},on:{click:i.paramSet}},[i._v("参数设置")])],1),i._v(" "),l("el-table",{key:i.tablekey,ref:"multipleTableRight",staticClass:"tableHeadItemBtn",staticStyle:{height:"100%",width:"100%"},attrs:{"row-key":"repertoryId",data:i.rightTable,"show-overflow-tooltip":!0,height:"100%","tooltip-effect":"dark",border:"",triped:""},on:{"row-dblclick":i.dclickMinusItem,"row-click":i.clickRightRow,"selection-change":i.getSelectionRight}},[l("el-table-column",{attrs:{fixed:"",sortable:"",width:"50",label:"序号"},scopedSlots:i._u([{key:"default",fn:function(e){return[i._v("\n            "+i._s(e.$index+1)+"\n          ")]}}])}),i._v(" "),l("el-table-column",{attrs:{fixed:"","render-header":i.setHeaderMinus,width:"50"},scopedSlots:i._u([{key:"default",fn:function(t){return[l("el-button",{staticClass:"tableItemBtnMinus",attrs:{size:"mini"},on:{click:function(e){i.minusItem(t.row,t.$index)}}})]}}])}),i._v(" "),i._l(i.tableColumnRight,function(e){return[l("el-table-column",{key:e.id,attrs:{prop:e.prop,fixed:e.fixed,label:e.label,width:e.width,sortable:""}})]})],2)],1)]),i._v(" "),l("div",{staticClass:"transferTable_foot"})])},staticRenderFns:[]};t.a=l},hQzi:function(e,t){},isco:function(e,t){},x9WB:function(e,t,i){"use strict";var l=i("pAQG"),r=i("0xDb");t.a={components:{querySelect:l.a},data:function(){return{senderSearch:"",searchForm:{shipToCityName:"",shipSn:""},btnsize:"mini",selectVal:""}},props:{info:{type:Array,default:[]}},watch:{info:{handler:function(e,t){},deep:!0}},methods:{querySearch:function(e,t,i){console.log(this.info);var l=this.info;for(var a in this.searchForm[e]=t,this.selectVal=e,this.searchForm)void 0!==this.searchForm[a]&&""!==this.searchForm[a]||this.$emit("change",Object(r.objectMerge2)([],this.info));var n=t?l.filter(this.createFilter(t,e)):l;i(n);var o=[];n.forEach(function(e){o.push(e)}),this.$emit("change",o)},createFilter:function(t,i){return function(e){return-1!==e[i].toLowerCase().indexOf(t.toLowerCase())}},handleSelect:function(e){this.searchForm[this.selectVal]=e[this.selectVal],this.selectVal="";var t=[];t.push(e),this.$emit("change",t)},clearSender:function(e){this.searchForm=this.$options.data().searchForm}}}}});