webpackJsonp([208],{BcEV:function(t,e,l){"use strict";var a=l("woOf"),o=l.n(a),i=l("IcMT"),r=l("9UCZ"),s=l("0xDb");e.a={props:{leftData:{type:Array},rightData:{type:Array}},data:function(){return{tablekey:"",truckMessage:"",formModel:{},loadTruck:"loadTruckOne",loading:!1,selectedRight:[],selectedLeft:[],leftTable:[],rightTable:[]}},components:{transferTable:i.a,selectType:r.a},watch:{leftData:function(t){this.leftTable=t},rightData:function(t){this.rightTable=t}},mounted:function(){},methods:{getList:function(){this.$emit("regetList")},getSum:function(t,e){return Object(s.getSummaries)(t,["_index|1|单","transferCharge","deliveryExpense","transferOtherFee","totalCost","cargoAmount|件","cargoWeight|kg","cargoVolume|方"])},getSumRight:function(t){return this.getSum(t,"right")},getSumLeft:function(t){return this.getSum(t,"left")},clickDetailsRight:function(t){this.$refs.multipleTableRight.toggleRowSelection(t)},clickDetailsLeft:function(t){this.$refs.multipleTableLeft.toggleRowSelection(t)},getSelectionRight:function(t){this.selectedRight=t},getSelectionLeft:function(t){this.selectedLeft=t},changeTableKey:function(){},doAction:function(t){switch(t){case"goLeft":this.goLeft();break;case"goRight":this.goRight()}},changeRow:function(t,e,l){var a=e.$index,i=this,r=i.rightTable[a];r[t]=l,r.totalCost=Object(s.getTotal)(r.transferCharge,r.deliveryExpense,r.transferOtherFee),this.$set(i.rightTable,a,o()(i.rightTable[a],{totalCost:r.totalCost})),console.log(i.rightTable),i.$emit("loadTable",i.rightTable)},goLeft:function(){var l=this;0===this.selectedRight.length?this.$message({type:"warning",message:"请在左边表格选择数据"}):(this.selectedRight.forEach(function(e,t){e.loadAmount=e.repertoryAmount,e.loadWeight=e.repertoryWeight,e.loadVolume=e.repertoryVolume,e.oddNumbers=e.oddNumbers||e.shipSn,e.paymentId=e.paymentId||16,l.rightTable=l.rightTable.filter(function(t){return t.repertoryId!==e.repertoryId}),l.rightTable.push(e),l.leftTable=l.leftTable.filter(function(t){return t.repertoryId!==e.repertoryId})}),this.selectedRight=[],this.$emit("loadTable",this.rightTable))},goRight:function(){var l=this;0===this.selectedLeft.length?this.$message({type:"warning",message:"请在右边表格选择数据"}):(this.selectedLeft.forEach(function(e,t){l.leftTable=l.leftTable.filter(function(t){return t.repertoryId!==e.repertoryId}),l.leftTable.push(e),l.rightTable=l.rightTable.filter(function(t){return t.repertoryId!==e.repertoryId})}),this.selectedLeft=[],this.$emit("loadTable",this.rightTable))},addItem:function(t,e){this.selectedRight=[],this.selectedRight.push(t),this.doAction("goLeft")},minusItem:function(t,e){this.selectedLeft=[],this.selectedLeft.push(t),this.doAction("goRight")},addALLList:function(){this.selectedRight=o()([],this.leftTable),this.doAction("goLeft")},minusAllList:function(){this.selectedLeft=o()([],this.rightTable),this.doAction("goRight")},dclickAddItem:function(t,e){this.selectedRight=[],this.selectedRight.push(t),this.doAction("goLeft")},dclickMinusItem:function(t,e){this.selectedLeft=[],this.selectedLeft.push(t),this.doAction("goRight")},setHeader:function(t,e){e.column;return t("el-button",{props:{size:"mini"},class:{tableItemBtn:!0},on:{click:this.addALLList}})},setHeader2:function(t,e){e.column;return t("el-button",{props:{size:"mini"},class:{tableItemBtnMinus:!0},on:{click:this.minusAllList}})}}}},FB6m:function(t,e,l){"use strict";var a={render:function(){var l=this,t=l.$createElement,a=l._self._c||t;return a("transferTable",[a("el-button",{attrs:{slot:"tableRefresh",icon:"el-icon-refresh",size:"mini",type:"primary",plain:"",circle:""},on:{click:l.getList},slot:"tableRefresh"}),l._v(" "),a("div",{staticClass:"tableHeadItemBtn2",staticStyle:{height:"100%"},attrs:{slot:"tableLeft"},slot:"tableLeft"},[a("el-table",{key:l.tablekey,ref:"multipleTableRight",attrs:{data:l.leftTable,border:"","tooltip-effect":"dark",triped:"",height:"100%","summary-method":l.getSumRight,"show-overflow-tooltip":!0,"default-sort":{prop:"id",order:"ascending"},"show-summary":!0},on:{"row-click":l.clickDetailsRight,"selection-change":l.getSelectionRight,"row-dblclick":l.dclickAddItem}},[a("el-table-column",{attrs:{fixed:"",type:"index",width:"50"}}),l._v(" "),a("el-table-column",{attrs:{fixed:"","render-header":l.setHeader,width:"50"},scopedSlots:l._u([{key:"default",fn:function(e){return[a("el-button",{staticClass:"tableItemBtn",attrs:{size:"mini"},on:{click:function(t){l.addItem(e.row,e.$index)}}})]}}])}),l._v(" "),a("el-table-column",{attrs:{fixed:"",prop:"shipFromOrgName",label:"开单网点",width:"80"}}),l._v(" "),a("el-table-column",{attrs:{prop:"shipSn",label:"运单号",width:"120"}}),l._v(" "),a("el-table-column",{attrs:{prop:"shipArrivepayFee",sortable:"",label:"到付(元)",width:"90"}}),l._v(" "),a("el-table-column",{attrs:{prop:"shipFromCityName",sortable:"",label:"出发城市",width:"120"}}),l._v(" "),a("el-table-column",{attrs:{prop:"shipToCityName",sortable:"",label:"到达城市",width:"120"}}),l._v(" "),a("el-table-column",{attrs:{prop:"shipSenderName",sortable:"",label:"发货人",width:"90"}}),l._v(" "),a("el-table-column",{attrs:{prop:"shipSenderMobile",sortable:"",label:"发货人电话",width:"110"}}),l._v(" "),a("el-table-column",{attrs:{prop:"shipReceiverName",sortable:"",label:"收货人",width:"90"}}),l._v(" "),a("el-table-column",{attrs:{prop:"shipReceiverMobile",sortable:"",label:"收货人电话",width:"110"}}),l._v(" "),a("el-table-column",{attrs:{prop:"cargoName",sortable:"",label:"货品名",width:"120"}}),l._v(" "),a("el-table-column",{attrs:{prop:"shipGoodsSn",sortable:"",label:"货号",width:"140"}}),l._v(" "),a("el-table-column",{attrs:{prop:"repertoryAmount",sortable:"",label:"库存件数",width:"100"}}),l._v(" "),a("el-table-column",{attrs:{prop:"repertoryWeight",sortable:"",label:"库存重量",width:"100"}}),l._v(" "),a("el-table-column",{attrs:{prop:"repertoryVolume",sortable:"",label:"库存体积",width:"100"}}),l._v(" "),a("el-table-column",{attrs:{prop:"cargoAmount",sortable:"",label:"运单件数",width:"100"}}),l._v(" "),a("el-table-column",{attrs:{prop:"cargoWeight",sortable:"",label:"运单重量",width:"100"}}),l._v(" "),a("el-table-column",{attrs:{prop:"cargoVolume",sortable:"",label:"运单体积",width:"100"}}),l._v(" "),a("el-table-column",{attrs:{prop:"shipRemarks",sortable:"",label:"运单备注",width:"120"}})],1)],1),l._v(" "),a("div",{staticClass:"tableHeadItemBtn2",staticStyle:{height:"100%"},attrs:{slot:"tableRight"},slot:"tableRight"},[a("el-table",{key:l.tablekey,ref:"multipleTableLeft",attrs:{data:l.rightTable,border:"","tooltip-effect":"dark",triped:"",height:"100%","summary-method":l.getSumLeft,"default-sort":{prop:"id",order:"ascending"},"show-summary":!0},on:{"row-click":l.clickDetailsLeft,"selection-change":l.getSelectionLeft,"row-dblclick":l.dclickMinusItem}},[a("el-table-column",{attrs:{fixed:"",type:"index",width:"50"}}),l._v(" "),a("el-table-column",{attrs:{fixed:"",width:"50","render-header":l.setHeader2},scopedSlots:l._u([{key:"default",fn:function(e){return[a("el-button",{staticClass:"tableItemBtnMinus",attrs:{size:"mini"},on:{click:function(t){l.minusItem(e.row,e.$index)}}})]}}])}),l._v(" "),a("el-table-column",{attrs:{fixed:"",prop:"shipFromOrgName",label:"开单网点",width:"80"}}),l._v(" "),a("el-table-column",{attrs:{prop:"shipSn",label:"运单号",width:"120"}}),l._v(" "),a("el-table-column",{attrs:{prop:"oddNumbers",sortable:"",label:"中转单号",width:"120"},scopedSlots:l._u([{key:"default",fn:function(e){return[a("el-input",{attrs:{size:"mini",value:e.row.oddNumbers,required:""},on:{change:function(t){return l.changeRow("oddNumbers",e,t)}}})]}}])}),l._v(" "),a("el-table-column",{attrs:{prop:"transferCharge",sortable:"",label:"中转运费",width:"120"},scopedSlots:l._u([{key:"default",fn:function(e){return[a("el-input",{directives:[{name:"number-only",rawName:"v-number-only:point",arg:"point"}],attrs:{size:"mini",value:e.row.transferCharge},on:{change:function(t){return l.changeRow("transferCharge",e,t)}}})]}}])}),l._v(" "),a("el-table-column",{attrs:{prop:"deliveryExpense",sortable:"",label:"中转送货费",width:"120"},scopedSlots:l._u([{key:"default",fn:function(e){return[a("el-input",{directives:[{name:"number-only",rawName:"v-number-only:point",arg:"point"}],attrs:{size:"mini",value:e.row.deliveryExpense},on:{change:function(t){return l.changeRow("deliveryExpense",e,t)}}})]}}])}),l._v(" "),a("el-table-column",{attrs:{prop:"transferOtherFee",sortable:"",label:"中转其他费",width:"120"},scopedSlots:l._u([{key:"default",fn:function(e){return[a("el-input",{directives:[{name:"number-only",rawName:"v-number-only:point",arg:"point"}],attrs:{size:"mini",value:e.row.transferOtherFee},on:{change:function(t){return l.changeRow("transferOtherFee",e,t)}}})]}}])}),l._v(" "),a("el-table-column",{attrs:{prop:"totalCost",sortable:"",label:"中转费合计",width:"120"},scopedSlots:l._u([{key:"default",fn:function(e){return[a("el-input",{attrs:{size:"mini",disabled:""},model:{value:e.row.totalCost,callback:function(t){l.$set(e.row,"totalCost",t)},expression:"scope.row.totalCost"}})]}}])}),l._v(" "),a("el-table-column",{attrs:{prop:"paymentId",sortable:"",label:"中转费付款方式",width:"120"},scopedSlots:l._u([{key:"default",fn:function(e){return[a("selectType",{attrs:{type:"payment_type",size:"mini",value:e.row.paymentId,name:e.row.paymentName},on:{change:function(t){return l.changeRow("paymentId",e,t)}}})]}}])}),l._v(" "),a("el-table-column",{attrs:{prop:"shipArrivepayFee",sortable:"",label:"到付(元)",width:"90"}}),l._v(" "),a("el-table-column",{attrs:{prop:"cargoAmount",sortable:"",label:"运单件数",width:"100"}}),l._v(" "),a("el-table-column",{attrs:{prop:"cargoWeight",sortable:"",label:"运单重量",width:"100"}}),l._v(" "),a("el-table-column",{attrs:{prop:"cargoVolume",sortable:"",label:"运单体积",width:"100"}}),l._v(" "),a("el-table-column",{attrs:{prop:"shipFromCityName",sortable:"",label:"出发城市",width:"120"}}),l._v(" "),a("el-table-column",{attrs:{prop:"shipToCityName",sortable:"",label:"到达城市",width:"120"}}),l._v(" "),a("el-table-column",{attrs:{prop:"shipSenderName",sortable:"",label:"发货人",width:"90"}}),l._v(" "),a("el-table-column",{attrs:{prop:"shipSenderMobile",sortable:"",label:"发货人电话",width:"110"}}),l._v(" "),a("el-table-column",{attrs:{prop:"shipReceiverName",sortable:"",label:"收货人",width:"90"}}),l._v(" "),a("el-table-column",{attrs:{prop:"shipReceiverMobile",sortable:"",label:"收货人电话",width:"110"}}),l._v(" "),a("el-table-column",{attrs:{prop:"cargoName",sortable:"",label:"货品名",width:"120"}}),l._v(" "),a("el-table-column",{attrs:{prop:"shipGoodsSn",sortable:"",label:"货号",width:"140"}}),l._v(" "),a("el-table-column",{attrs:{prop:"shipRemarks",sortable:"",label:"运单备注",width:"120"}})],1)],1)],1)},staticRenderFns:[]};e.a=a},IcMT:function(t,e,l){"use strict";var a=l("PI8x"),i=l("QVoP");var r=function(t){l("jCPK")},o=l("VU/8")(a.a,i.a,r,null,null);e.a=o.exports},PI8x:function(t,e,l){"use strict";e.a={data:function(){return{isShowLeft:!1,isShowRight:!1,isShowReback:!1,searchForm:""}},methods:{doAction:function(t){switch(t){case"showAllLeft":this.showAllLeft();break;case"showAllRight":this.showAllRight();break;case"showReback":this.showReback()}},showAllLeft:function(){this.isShowLeft=!0,this.isShowRight=!1,this.isShowReback=!0},showAllRight:function(){this.isShowLeft=!1,this.isShowRight=!0,this.isShowReback=!0},showReback:function(){this.isShowReback=!1,this.isShowLeft=!1,this.isShowRight=!1}}}},QVoP:function(t,e,l){"use strict";var a={render:function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",{staticClass:"transferTable"},[l("div",{staticClass:"transferTable_header"},[l("div",{staticClass:"transferTable_searchs"},[l("div",{staticClass:"transferTable_fresh"},[e._t("tableRefresh")],2),e._v(" "),e._t("tableSearch")],2),e._v(" "),l("div",{staticClass:"transferTable_header_btn_direction"},[l("el-tooltip",{attrs:{effect:"dark",content:"向左侧拉伸",placement:"top-end"}},[l("el-button",{attrs:{icon:"el-icon-arrow-right",type:"primary",circle:"",disabled:e.isShowLeft,size:"mini",plain:""},on:{click:function(t){e.doAction("showAllLeft")}}})],1),e._v(" "),l("el-tooltip",{attrs:{effect:"dark",content:"向右侧拉伸",placement:"top-start"}},[l("el-button",{attrs:{icon:"el-icon-arrow-left",type:"primary",circle:"",disabled:e.isShowRight,size:"mini",plain:""},on:{click:function(t){e.doAction("showAllRight")}}})],1),e._v(" "),l("transition",{attrs:{name:"el-zoom-in-bottom"}},[e.isShowReback?l("el-button",{attrs:{icon:"el-icon-refresh",type:"primary",circle:"",size:"mini",plain:""},on:{click:function(t){e.doAction("showReback")}}}):e._e()],1),e._v(" "),l("div",{staticClass:"transferTable_header_btn_box clearfix"},[e._t("btnsBox")],2)],1)]),e._v(" "),l("div",{staticClass:"transferTable_content"},[l("div",{staticClass:"transferTable_content_table paddingRight",class:[e.isShowLeft?"showTableLeft":e.isShowRight?"shortTableLeft":""]},[e._t("tableLeft",[e._v("左边表格区")])],2),e._v(" "),l("div",{staticClass:"transferTable_content_table",class:[e.isShowRight?"showTableRight":""]},[e._t("tableRight",[e._v("右边表格区")])],2)])])},staticRenderFns:[]};e.a=a},"e/1Q":function(t,e,l){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=l("BcEV"),i=l("FB6m");var r=function(t){l("jtj/")},o=l("VU/8")(a.a,i.a,r,null,null);e.default=o.exports},jCPK:function(t,e){},"jtj/":function(t,e){}});
//# sourceMappingURL=208.949630536f4e15f45dd5.js.map