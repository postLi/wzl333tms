webpackJsonp([233],{"7p/c":function(e,t,i){"use strict";var l=i("woOf"),o=i.n(l),r=i("DAYN"),a=(i.n(r),i("TsW9"),i("0xDb")),s=i("Lokx"),n=i.n(s);t.a={props:{getinfoed:Boolean,truckIndex:{type:[Number,String],default:function(){}},loadTable:{type:Object,default:function(){}},delData:{type:Object,default:function(){}},resetTuckLoad:{type:[Number,String],default:function(){}},addOrgRightTable:{type:[String,Number],default:function(){}}},data:function(){return{isDelOtherTruck:!1,tablekey:0,loading:!1,showTableMessage:"全屏查看",isShowLeftTable:!1,isShowRightTable:!1,isDel:!1,orgData:{},leftTable:[],orgLeftTable:[],rightTable:[],orgRightTable:[],selectedRight:[],selectedLeft:[],tableColumnLeft:[],tableColumnLeftDepart:[{label:"运单号",prop:"shipSn",width:"140"},{label:"库存重量",prop:"repertoryWeight"},{label:"库存体积",prop:"repertoryVolume"}],tableColumnLeftAll:[{label:"运单号",prop:"shipSn",width:"140"},{label:"库存重量",prop:"repertoryWeight"},{label:"库存体积",prop:"repertoryVolume"},{label:"到达网点",prop:"shipToOrgName"},{label:"到达城市",prop:"shipToCityName"},{label:"货品名",prop:"cargoName"},{label:"开单网点",prop:"shipFromOrgName"},{label:"出发城市",prop:"shipFromCityName"},{label:"发货人",prop:"shipSenderName"},{label:"收货人",prop:"shipReceiverName"}],tableColumnRight:[],tableColumnRightDepart:[{label:"运单号",prop:"shipSn",width:"140"},{label:"到达网点",prop:"shipToOrgName"},{label:"到达城市",prop:"shipToCityName"},{label:"货品名",prop:"cargoName"},{label:"库存重量",prop:"repertoryWeight"},{label:"库存体积",prop:"repertoryVolume"}],tableColumnRightAll:[{label:"运单号",prop:"shipSn",width:"140"},{label:"到达网点",prop:"shipToOrgName"},{label:"到达城市",prop:"shipToCityName"},{label:"货品名",prop:"cargoName"},{label:"库存重量",prop:"repertoryWeight"},{label:"库存体积",prop:"repertoryVolume"},{label:"库存件数",prop:"repertoryAmount"},{label:"出发城市",prop:"shipFromCityName"},{label:"开单网点",prop:"shipFromOrgName"},{label:"发货人",prop:"shipSenderName"},{label:"收货人",prop:"shipReceiverName"},{label:"货号",prop:"shipGoodsSn"}],oldList:[],newList:[],sortable:null}},watch:{getinfoed:function(){this.getinfoed&&(this.getinfoed2=!0)},loadTable:{handler:function(e,t){this.getinfoed2||(e&&(this.isDelOtherTruck=!1,e.right.forEach(function(e){e.forEach(function(e){e.loadAmount=e.repertoryAmount,e.loadWeight=e.repertoryWeight,e.loadVolume=e.repertoryVolume})})),console.log("66766666",e),this.orgData=o()([],e),this.orgRightTable=o()([],e.right),this.orgLeftTable=o()([],e.left),this.leftTable=o()([],e.left),this.oldList=this.rightTable.map(function(e){return e.repertoryId}),this.newList=this.oldList.slice(),this.initTable())},deep:!0},truckIndex:{handler:function(e,t){this.initTable()},deep:!0},delData:{handler:function(e,t){var i=this;console.log("delCurTruck3",e,t),this.isDel=!0,e.list.carLoadDetail&&0<e.list.carLoadDetail.length?(this.selectedRight=[],e.list.carLoadDetail.forEach(function(e){i.selectedRight.push(e)}),console.log("delCurTruck4",e,this.selectedRight),this.goLeft()):(console.log("delCurTruck5",e.list.carLoadDetail,e,this.orgRightTable.length),this.orgRightTable.splice(this.delData.number,1)),console.log("delCurTruck6",e.list.carLoadDetail,this.orgRightTable)},deep:!0},resetTuckLoad:{handler:function(i,e){var l=this;if(""!==i){console.log("######");this.selectedRight=[];var t=Number(i||0)-Number(this.orgRightTable.length?this.orgRightTable.length:0);if(console.log("*****",t,i),0<t)for(var o=0;o<t;o++)this.orgRightTable.push([]);else this.orgRightTable.forEach(function(e,t){t>=Number(i)&&(e.forEach(function(e){l.selectedRight.push(e)}),l.orgRightTable[t]=[])}),this.isDelOtherTruck=!0,console.log("this.orgRightTable1:",this.orgRightTable[0].length,this.orgRightTable),this.goLeft(),console.log("this.orgRightTable2:",this.orgRightTable[0].length,this.orgRightTable)}},deep:!0},rightTable:function(){console.log("rightTable:",this.rightTable.length)},leftTable:function(){console.log("leftTable:",this.leftTable.length)},addOrgRightTable:{handler:function(e,t){e!==t&&this.orgRightTable.push([])},deep:!0}},mounted:function(){this.tableColumnLeft=o()([],this.tableColumnLeftDepart),this.tableColumnRight=o()([],this.tableColumnRightDepart),this.initTable()},computed:{showLeftStyle:function(){return{width:this.isShowLeftTable?"100%":this.isShowRightTable?"0%":"30%",transition:"0.3s"}},showRightStyle:function(){return{width:this.isShowRightTable?"100%":this.isShowLeftTable?"0%":"70%",transition:"0.3s"}}},methods:{initTable:function(){var i=this;console.log("#$%#$%#$",this.orgRightTable,this.truckIndex),this.rightTable=o()([],this.orgRightTable[this.truckIndex]),this.rightTable.forEach(function(e){e.loadAmount=e.repertoryAmount,e.loadWeight=e.repertoryWeight,e.loadVolume=e.repertoryVolume});var l=[];this.orgRightTable.forEach(function(e,t){e.forEach(function(e){e.loadAmount=e.repertoryAmount,e.loadWeight=e.repertoryWeight,e.loadVolume=e.repertoryVolume,l.push(e)})}),l.length?(console.log("7778888"),l.forEach(function(t,e){i.leftTable=i.leftTable.filter(function(e){return e.repertoryId!=t.repertoryId})})):(console.log("77799999"),this.leftTable=o()([],this.orgLeftTable)),this.$nextTick(function(){i.setSort()}),this.$emit("loadCurTable",this.rightTable),this.$emit("loadTable",this.orgRightTable)},fetchList:function(){console.log("99999"),this.leftTable=this.$options.data().leftTable,this.rightTable=this.$options.data().rightTable},setSort:function(){var l=this,e=document.querySelectorAll(".transferTable_main_right .el-table__body-wrapper > table > tbody")[0];console.log(e),this.sortable=n.a.create(e,{ghostClass:"sortable-ghost",setData:function(e){e.setData("Text","")},onEnd:function(e){var t=l.rightTable.splice(e.oldIndex,1)[0];l.rightTable.splice(e.newIndex,0,t),l.orgRightTable[l.truckIndex].splice(e.newIndex,0,t);var i=l.newList.splice(e.oldIndex,1)[0];l.newList.splice(e.newIndex,0,i)}})},setHeaderAdd:function(e,t){t.column;return e("el-button",{props:{size:"mini"},class:{tableItemBtn:!0},on:{click:this.addALLList}})},setHeaderMinus:function(e,t){t.column;return e("el-button",{props:{size:"mini"},class:{tableItemBtnMinus:!0},on:{click:this.minusAllList}})},goLeft:function(){var i=this;console.log("1000000"),this.selectedRight.forEach(function(t,e){0===i.leftTable.filter(function(e){return e.repertoryId===t.repertoryId}).length&&(t.loadAmount=t.repertoryAmount,t.loadWeight=t.repertoryWeight,t.loadVolume=t.repertoryVolume,i.leftTable.push(t),i.orgLeftTable.push(t),i.rightTable=Object(a.objectMerge2)([],i.rightTable).filter(function(e){return e.repertoryId!==t.repertoryId}),i.isDelOtherTruck&&(i.orgRightTable=i.orgRightTable.splice(0,Number(i.resetTuckLoad))),i.orgRightTable[i.truckIndex]=Object(a.objectMerge2)([],i.orgRightTable[i.truckIndex]).filter(function(e){return e.repertoryId!==t.repertoryId}))}),this.isDel&&(this.orgRightTable.splice(this.delData.number,1),this.isDel=!1),this.$nextTick(function(){i.setSort()}),this.$emit("loadCurTable",this.rightTable),this.$emit("loadTable",this.orgRightTable)},goRight:function(){var i=this;this.selectedLeft.forEach(function(t,e){0===i.rightTable.filter(function(e){return e.repertoryId===t.repertoryId}).length&&(t.loadAmount=t.repertoryAmount,t.loadWeight=t.repertoryWeight,t.loadVolume=t.repertoryVolume,console.log("goRight",i.truckIndex,i.rightTable,i.orgRightTable,i.orgRightTable[i.truckIndex]),i.rightTable.push(t),i.orgRightTable[i.truckIndex]=i.orgRightTable[i.truckIndex]||[],i.orgRightTable[i.truckIndex].push(t),i.leftTable=i.leftTable.filter(function(e){return e.repertoryId!==t.repertoryId}),i.orgLeftTable=i.orgLeftTable.filter(function(e){return e.repertoryId!==t.repertoryId}),console.log("2222222222222222222222",i.rightTable.length))}),this.$nextTick(function(){i.setSort()}),this.tablekey=Math.random(),this.$emit("loadCurTable",this.rightTable),this.$emit("loadTable",this.orgRightTable)},dclickAddItem:function(e,t){this.selectedLeft=[],this.selectedLeft.push(e),this.goRight()},dclickMinusItem:function(e,t){this.selectedRight=[],this.selectedRight.push(e),this.goLeft()},addItem:function(e,t){this.selectedLeft=[],this.selectedLeft[0]=e,this.goRight()},minusItem:function(e,t){this.selectedRight=[],this.selectedRight[t]=e,this.goLeft()},addALLList:function(){console.log("444444"),this.selectedLeft=o()([],this.leftTable),this.goRight()},minusAllList:function(){console.log("5555555"),this.selectedRight=o()([],this.rightTable),this.goLeft()},clickLeftRow:function(e){console.log(e.shipSn),this.$refs.multipleTableLeft.toggleRowSelection(e)},clickRightRow:function(e){this.$refs.multipleTableRight.toggleRowSelection(e)},getSelectionLeft:function(e){},getSelectionRight:function(e){},showAllLeft:function(){console.log("333333"),this.isShowLeftTable=!this.isShowLeftTable,this.tableColumnLeft=this.isShowLeftTable?o()([],this.tableColumnLeftAll):this.tableColumnLeftDepart,this.showTableMessage=this.isShowLeftTable?"点击隐藏":"全屏查看",console.log(this.isShowLeftTable,"左"),this.$emit("showViewTable",this.isShowLeftTable)},showAllRight:function(){this.isShowRightTable=!this.isShowRightTable,this.tableColumnRight=this.isShowRightTable?o()([],this.tableColumnRightAll):this.tableColumnRightDepart,this.showTableMessage=this.isShowRightTable?"点击隐藏":"全屏查看",console.log(this.isShowRightTable,"右"),this.$emit("showViewTable",this.isShowRightTable)},paramSet:function(){this.$emit("openParamSet")}}}},HAQ7:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=i("7p/c"),o=i("bx3+");var r=function(e){i("SBRA")},a=i("VU/8")(l.a,o.a,r,null,null);t.default=a.exports},SBRA:function(e,t){},TsW9:function(e,t,i){"use strict";t.a=function(e,t){return l.b.get("/api-order/order/load/v1/getBatchNo/",{params:{orgId:e,loadTypeId:t}})},t.h=function(e){return l.b.post("/api-order/order/load/v1/",e)},t.i=function(e){return l.b.put("/api-order/order/load/v1/",e)},t.c=function(e){return l.b.get("/api-order/order/load/v1/selectAddLoadRepertoryList/",{params:{orgId:e}})},t.f=function(e,t){return l.b.get("/api-order/order/load/v1/selectUpdateLoadRepertoryList/?orgId="+e+"&loadId="+t)},t.g=function(e,t){return l.b.get("/api-order/order/load/v1/selectUpdateLoadDetailList/?orgId="+e+"&loadId="+t)},t.d=function(e){return l.b.get("/api-order/order/load/v1/selectLoadDetailList/",{params:{loadId:e}})},t.e=function(){return l.b.get("/api-system/system/trunk/v1/findCarAndDriver/").then(function(e){return e})},t.b=function(){return l.b.get("/api-system/system/trunk/v1/findDriverAndCar/").then(function(e){return e})};var l=i("Vo7i")},"bx3+":function(e,t,i){"use strict";var l={render:function(){var i=this,e=i.$createElement,l=i._self._c||e;return l("div",{directives:[{name:"loading",rawName:"v-loading",value:i.loading,expression:"loading"}],staticClass:"transferTable_wrapper"},[l("div",{staticClass:"transferTable_head"}),i._v(" "),l("div",{staticClass:"transferTable_main"},[l("div",{staticClass:"transferTable_main_left",staticStyle:{height:"100%"},style:i.showLeftStyle},[l("div",{staticClass:"transferTable_main_left_head"},[i.isShowRightTable?i._e():l("b",[i._v("库存运单")]),i._v(" "),i.isShowRightTable?i._e():l("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:i.showTableMessage,placement:"left"}},[l("el-button",{attrs:{icon:i.isShowLeftTable?"el-icon-close":"el-icon-rank",type:"primary",circle:"",size:"mini",plain:""},on:{click:i.showAllLeft}})],1)],1),i._v(" "),l("el-table",{key:i.tablekey,ref:"multipleTableLeft",staticClass:"tableHeadItemBtn",staticStyle:{height:"100%",width:"100%"},attrs:{data:i.leftTable,"show-overflow-tooltip":!0,height:"100%","tooltip-effect":"dark",border:"",triped:""},on:{"row-dblclick":i.dclickAddItem,"row-click":i.clickLeftRow,"selection-change":i.getSelectionLeft}},[l("el-table-column",{attrs:{fixed:"",sortable:"",width:"50",label:"序号"},scopedSlots:i._u([{key:"default",fn:function(e){return[i._v("\n            "+i._s(e.$index+1)+"\n          ")]}}])}),i._v(" "),l("el-table-column",{attrs:{fixed:"","render-header":i.setHeaderAdd,width:"50"},scopedSlots:i._u([{key:"default",fn:function(t){return[l("el-button",{staticClass:"tableItemBtn",attrs:{size:"mini"},on:{click:function(e){i.addItem(t.row,t.$index)}}})]}}])}),i._v(" "),i._l(i.tableColumnLeft,function(e){return[l("el-table-column",{key:e.id,attrs:{prop:e.prop,fixed:e.fixed,label:e.label,width:e.width,sortable:""}})]})],2)],1),i._v(" "),l("div",{staticClass:"transferTable_main_right",staticStyle:{height:"100%"},style:i.showRightStyle},[l("div",{staticClass:"transferTable_main_right_head"},[i.isShowLeftTable?i._e():l("b",[i._v("配载清单"),i.isShowLeftTable?i._e():l("span",[i._v(" (可拖拽调整顺序)")])]),i._v(" "),i.isShowLeftTable?i._e():l("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:i.showTableMessage,placement:"top"}},[l("el-button",{attrs:{icon:i.isShowRightTable?"el-icon-close":"el-icon-rank",type:"primary",circle:"",size:"mini",plain:""},on:{click:i.showAllRight}})],1)],1),i._v(" "),l("el-table",{key:i.tablekey,ref:"multipleTableRight",staticClass:"tableHeadItemBtn",staticStyle:{height:"100%",width:"100%"},attrs:{"row-key":"repertoryId",data:i.rightTable,"show-overflow-tooltip":!0,height:"100%","tooltip-effect":"dark",border:"",triped:""},on:{"row-dblclick":i.dclickMinusItem,"row-click":i.clickRightRow,"selection-change":i.getSelectionRight}},[l("el-table-column",{attrs:{fixed:"",sortable:"",width:"50",label:"序号"},scopedSlots:i._u([{key:"default",fn:function(e){return[i._v("\n            "+i._s(e.$index+1)+"\n          ")]}}])}),i._v(" "),l("el-table-column",{attrs:{fixed:"","render-header":i.setHeaderMinus,width:"50"},scopedSlots:i._u([{key:"default",fn:function(t){return[l("el-button",{staticClass:"tableItemBtnMinus",attrs:{size:"mini"},on:{click:function(e){i.minusItem(t.row,t.$index)}}})]}}])}),i._v(" "),i._l(i.tableColumnRight,function(e){return[l("el-table-column",{key:e.id,attrs:{prop:e.prop,fixed:e.fixed,label:e.label,width:e.width,sortable:""}})]})],2)],1)]),i._v(" "),l("div",{staticClass:"transferTable_foot"})])},staticRenderFns:[]};t.a=l}});