webpackJsonp([43,146,261,263],{"3oKu":function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=i("b0gS"),r=i("EIn/");var l=function(e){i("R6cw")},s=i("VU/8")(a.a,r.a,l,null,null);t.default=s.exports},"7ueC":function(e,t){},"9cTb":function(e,t,i){"use strict";var a={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"transferTable"},[i("div",{staticClass:"transferTable_header"},[i("div",{staticClass:"transferTable_searchs"},[i("div",{staticClass:"transferTable_fresh"},[t._t("tableRefresh")],2),t._v(" "),t._t("tableSearch")],2),t._v(" "),i("div",{staticClass:"transferTable_header_btn_direction"},[i("el-tooltip",{attrs:{effect:"dark",content:"向左侧拉伸",placement:"top-end"}},[i("el-button",{staticClass:"btn-leftright",attrs:{icon:"el-icon-arrow-right",type:"primary",circle:"",disabled:t.isShowLeft,size:"mini",plain:""},on:{click:function(e){t.doAction("showAllLeft")}}})],1),t._v(" "),i("el-tooltip",{attrs:{effect:"dark",content:"向右侧拉伸",placement:"top-start"}},[i("el-button",{staticClass:"btn-leftright",attrs:{icon:"el-icon-arrow-left",type:"primary",circle:"",disabled:t.isShowRight,size:"mini",plain:""},on:{click:function(e){t.doAction("showAllRight")}}})],1),t._v(" "),i("transition",{attrs:{name:"el-zoom-in-bottom"}},[t.isShowReback?i("el-button",{staticClass:"btn-leftright",attrs:{icon:"el-icon-refresh",type:"primary",circle:"",size:"mini",plain:""},on:{click:function(e){t.doAction("showReback")}}}):t._e()],1),t._v(" "),i("div",{staticClass:"transferTable_header_btn_box clearfix"},[t._t("btnsBox")],2)],1)]),t._v(" "),i("div",{staticClass:"transferTable_content"},[i("div",{staticClass:"transferTable_content_table paddingRight",class:t.leftTableClass},[t._t("tableLeft",[t._v("左边表格区")])],2),t._v(" "),i("div",{staticClass:"transferTable_content_table",class:t.rightTableClass},[t._t("tableRight",[t._v("右边表格区")])],2)])])},staticRenderFns:[]};t.a=a},BcEV:function(e,t,i){"use strict";var a=i("woOf"),s=i.n(a),r=i("IcMT"),l=i("9UCZ"),o=i("mZ46"),n=i("0xDb");t.a={props:{leftData:{type:Array},rightData:{type:Array}},data:function(){return{orgLeftTable:[],tablekey:"",truckMessage:"",formModel:{},loadTruck:"loadTruckOne",loading:!1,selectedRight:[],selectedLeft:[],leftTable:[],rightTable:[]}},components:{transferTable:r.a,selectType:l.a,currentSearch:o.default},watch:{leftData:function(e){this.leftTable=e,this.orgLeftTable=e},rightData:function(e){this.rightTable=e}},mounted:function(){},methods:{getList:function(){this.$emit("regetList")},getSum:function(e,t){return Object(n.getSummaries)(e,["_index|2|单","transferCharge","deliveryExpense","transferOtherFee","totalCost","cargoAmount|件","cargoWeight|kg","cargoVolume|方"])},getSumRight:function(e){return this.getSum(e,"right")},getSumLeft:function(e){return this.getSum(e,"left")},clickDetailsRight:function(e){this.$refs.multipleTableRight.toggleRowSelection(e)},clickDetailsLeft:function(e){this.$refs.multipleTableLeft.toggleRowSelection(e)},getSelectionRight:function(e){this.selectedRight=e},getSelectionLeft:function(e){this.selectedLeft=e},changeTableKey:function(){},getSearchEnter:function(){this.leftTable.length&&this.addALLList(),this.leftTable=s()([],this.orgLeftTable)},getSearch:function(e){this.leftTable=e},doAction:function(e){switch(e){case"goLeft":this.goLeft();break;case"goRight":this.goRight()}},changeRow:function(e,t,i){var a=t.$index,r=this,l=r.rightTable[a];l[e]=i,l.totalCost=Object(n.getTotal)(l.transferCharge,l.deliveryExpense,l.transferOtherFee),this.$set(r.rightTable,a,s()(r.rightTable[a],{totalCost:l.totalCost})),r.$emit("loadTable",r.rightTable)},goLeft:function(){var i=this;0===this.selectedRight.length?this.$message({type:"warning",message:"请在左边表格选择数据"}):(this.selectedRight.forEach(function(t,e){t.loadAmount=t.repertoryAmount,t.loadWeight=t.repertoryWeight,t.loadVolume=t.repertoryVolume,t.oddNumbers=t.childShipSn||t.shipSn,t.paymentId=t.paymentId||16,i.rightTable=i.rightTable.filter(function(e){return e.repertoryId!==t.repertoryId}),i.rightTable.push(t),i.leftTable=i.leftTable.filter(function(e){return e.repertoryId!==t.repertoryId}),i.orgLeftTable=i.orgLeftTable.filter(function(e){return e.repertoryId!==t.repertoryId})}),this.selectedRight=[],this.$emit("loadTable",this.rightTable))},goRight:function(){var i=this;0===this.selectedLeft.length?this.$message({type:"warning",message:"请在右边表格选择数据"}):(this.selectedLeft.forEach(function(t,e){i.leftTable=i.leftTable.filter(function(e){return e.repertoryId!==t.repertoryId}),i.orgLeftTable=i.orgLeftTable.filter(function(e){return e.repertoryId!==t.repertoryId}),i.leftTable.push(t),i.orgLeftTable.push(t),i.rightTable=i.rightTable.filter(function(e){return e.repertoryId!==t.repertoryId})}),this.selectedLeft=[],this.$emit("loadTable",this.rightTable))},addItem:function(e,t){this.selectedRight=[],this.selectedRight.push(e),this.doAction("goLeft")},minusItem:function(e,t){this.selectedLeft=[],this.selectedLeft.push(e),this.doAction("goRight")},addALLList:function(){this.selectedRight=s()([],this.leftTable),this.doAction("goLeft")},minusAllList:function(){this.selectedLeft=s()([],this.rightTable),this.doAction("goRight")},dclickAddItem:function(e,t){this.selectedRight=[],this.selectedRight.push(e),this.doAction("goLeft")},dclickMinusItem:function(e,t){this.selectedLeft=[],this.selectedLeft.push(e),this.doAction("goRight")},setHeader:function(e,t){t.column;return e("el-button",{props:{size:"mini"},class:{tableItemBtn:!0},on:{click:this.addALLList}})},setHeader2:function(e,t){t.column;return e("el-button",{props:{size:"mini"},class:{tableItemBtnMinus:!0},on:{click:this.minusAllList}})}}}},"EIn/":function(e,t,i){"use strict";var a={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-form",{staticClass:"staff_searchinfo clearfix",attrs:{inline:!0,size:t.btnsize,"label-position":"right",rules:t.rules,model:t.searchForm,"label-width":"70px"}},[i("div",{staticClass:"staff_searchinfo--input"},[i("el-form-item",{attrs:{label:"开单时间"}},[i("div",{staticClass:"block"},[i("el-date-picker",{attrs:{"default-value":t.defaultTime,type:"daterange","unlink-panels":"",align:"right","value-format":"yyyy-MM-dd","start-placeholder":"开始日期","picker-options":t.pickerOptions2,"end-placeholder":"结束日期"},model:{value:t.searchCreatTime,callback:function(e){t.searchCreatTime=e},expression:"searchCreatTime"}})],1)]),t._v(" "),i("el-form-item",{attrs:{label:"开单网点"}},[i("SelectTree",{attrs:{orgid:t.otherinfo.orgid},model:{value:t.searchForm.shipFromOrgid,callback:function(e){t.$set(t.searchForm,"shipFromOrgid",e)},expression:"searchForm.shipFromOrgid"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"运单号",prop:"shipSn"}},[i("el-input",{attrs:{maxlength:20,"auto-complete":"off",clearable:""},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.onSubmit(e):null}},model:{value:t.searchForm.shipSn,callback:function(e){t.$set(t.searchForm,"shipSn",e)},expression:"searchForm.shipSn"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"发站"}},[i("el-input",{attrs:{maxlength:20,"auto-complete":"off",clearable:""},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.onSubmit(e):null}},model:{value:t.searchForm.shipFromCityName,callback:function(e){t.$set(t.searchForm,"shipFromCityName",e)},expression:"searchForm.shipFromCityName"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"到站"}},[i("el-input",{attrs:{maxlength:20,"auto-complete":"off",clearable:""},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.onSubmit(e):null}},model:{value:t.searchForm.shipToCityName,callback:function(e){t.$set(t.searchForm,"shipToCityName",e)},expression:"searchForm.shipToCityName"}})],1)],1),t._v(" "),i("el-form-item",{staticClass:"staff_searchinfo--btn"},[i("el-button",{attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v("查询")]),t._v(" "),i("el-button",{attrs:{type:"info",plain:""},on:{click:t.clearForm}},[t._v("清空")])],1)],1)},staticRenderFns:[]};t.a=a},FB6m:function(e,t,i){"use strict";var a={render:function(){var i=this,e=i.$createElement,a=i._self._c||e;return a("transferTable",[a("el-button",{attrs:{slot:"tableRefresh",icon:"el-icon-refresh",size:"mini",type:"primary",plain:"",circle:""},on:{click:i.getList},slot:"tableRefresh"}),i._v(" "),a("div",{staticClass:"tableHeadItemForm clearfix",attrs:{slot:"tableSearch"},slot:"tableSearch"},[a("currentSearch",{attrs:{info:i.orgLeftTable},on:{change:i.getSearch,keyupEneter:i.getSearchEnter}})],1),i._v(" "),a("div",{staticClass:"tableHeadItemBtn2",staticStyle:{height:"100%"},attrs:{slot:"tableLeft"},slot:"tableLeft"},[a("el-table",{key:i.tablekey,ref:"multipleTableRight",attrs:{data:i.leftTable,border:"","tooltip-effect":"dark",triped:"",height:"100%","summary-method":i.getSumRight,"show-overflow-tooltip":!0,"default-sort":{prop:"id",order:"ascending"},"show-summary":!0},on:{"row-click":i.clickDetailsRight,"selection-change":i.getSelectionRight,"row-dblclick":i.dclickAddItem}},[a("el-table-column",{attrs:{fixed:"",type:"index",width:"60",label:"序号"}}),i._v(" "),a("el-table-column",{attrs:{fixed:"","render-header":i.setHeader,width:"50"},scopedSlots:i._u([{key:"default",fn:function(t){return[a("el-button",{staticClass:"tableItemBtn",attrs:{size:"mini"},on:{click:function(e){i.addItem(t.row,t.$index)}}})]}}])}),i._v(" "),a("el-table-column",{attrs:{fixed:"",prop:"shipFromOrgName",label:"开单网点",width:"100"}}),i._v(" "),a("el-table-column",{attrs:{prop:"shipSn",label:"运单号",width:"120",fixed:""}}),i._v(" "),a("el-table-column",{attrs:{prop:"childShipSn",label:"子运单号",width:"120",fixed:""}}),i._v(" "),a("el-table-column",{attrs:{prop:"shipGoodsSn",sortable:"",label:"货号",width:"140"}}),i._v(" "),a("el-table-column",{attrs:{prop:"shipArrivepayFee",sortable:"",label:"到付(元)",width:"90"}}),i._v(" "),a("el-table-column",{attrs:{prop:"shipFromCityName",sortable:"",label:"发站",width:"120"},scopedSlots:i._u([{key:"default",fn:function(e){return[i._v("\n          "+i._s(i._processTableSlot(e,"shipFromCityName"))+"\n        ")]}}])}),i._v(" "),a("el-table-column",{attrs:{prop:"shipToCityName",sortable:"",label:"到站",width:"120"},scopedSlots:i._u([{key:"default",fn:function(e){return[i._v("\n          "+i._s(i._processTableSlot(e,"shipToCityName"))+"\n        ")]}}])}),i._v(" "),a("el-table-column",{attrs:{prop:"shipSenderName",sortable:"",label:"发货人",width:"90"}}),i._v(" "),a("el-table-column",{attrs:{prop:"shipSenderMobile",sortable:"",label:"发货人电话",width:"110"}}),i._v(" "),a("el-table-column",{attrs:{prop:"shipReceiverName",sortable:"",label:"收货人",width:"90"}}),i._v(" "),a("el-table-column",{attrs:{prop:"shipReceiverMobile",sortable:"",label:"收货人电话",width:"110"}}),i._v(" "),a("el-table-column",{attrs:{prop:"cargoName",sortable:"",label:"货品名",width:"120"}}),i._v(" "),a("el-table-column",{attrs:{prop:"repertoryAmount",sortable:"",label:"库存件数",width:"100"}}),i._v(" "),a("el-table-column",{attrs:{prop:"repertoryWeight",sortable:"",label:"库存重量",width:"100"}}),i._v(" "),a("el-table-column",{attrs:{prop:"repertoryVolume",sortable:"",label:"库存体积",width:"100"}}),i._v(" "),a("el-table-column",{attrs:{prop:"cargoAmount",sortable:"",label:"运单件数",width:"100"}}),i._v(" "),a("el-table-column",{attrs:{prop:"cargoWeight",sortable:"",label:"运单重量",width:"100"}}),i._v(" "),a("el-table-column",{attrs:{prop:"cargoVolume",sortable:"",label:"运单体积",width:"100"}}),i._v(" "),a("el-table-column",{attrs:{prop:"budgetDeliveryFee",sortable:"",label:"预计送货费",width:"100"}}),i._v(" "),a("el-table-column",{attrs:{prop:"budgetTransferFee",sortable:"",label:"预计中转费",width:"100"}}),i._v(" "),a("el-table-column",{attrs:{prop:"shipRemarks",sortable:"",label:"运单备注",width:"120"}})],1)],1),i._v(" "),a("div",{staticClass:"tableHeadItemBtn2",staticStyle:{height:"100%"},attrs:{slot:"tableRight"},slot:"tableRight"},[a("el-table",{key:i.tablekey,ref:"multipleTableLeft",attrs:{data:i.rightTable,border:"","tooltip-effect":"dark",triped:"",height:"100%","summary-method":i.getSumLeft,"default-sort":{prop:"id",order:"ascending"},"show-summary":!0},on:{"row-click":i.clickDetailsLeft,"selection-change":i.getSelectionLeft,"row-dblclick":i.dclickMinusItem}},[a("el-table-column",{attrs:{fixed:"",type:"index",width:"60",label:"序号"}}),i._v(" "),a("el-table-column",{attrs:{fixed:"",width:"50","render-header":i.setHeader2},scopedSlots:i._u([{key:"default",fn:function(t){return[a("el-button",{staticClass:"tableItemBtnMinus",attrs:{size:"mini"},on:{click:function(e){i.minusItem(t.row,t.$index)}}})]}}])}),i._v(" "),a("el-table-column",{attrs:{fixed:"",prop:"shipFromOrgName",label:"开单网点",width:"100"}}),i._v(" "),a("el-table-column",{attrs:{prop:"shipSn",label:"运单号",width:"120"}}),i._v(" "),a("el-table-column",{attrs:{prop:"shipGoodsSn",sortable:"",label:"货号",width:"140"}}),i._v(" "),a("el-table-column",{attrs:{prop:"oddNumbers",sortable:"",label:"中转单号",width:"120"},scopedSlots:i._u([{key:"default",fn:function(t){return[a("el-input",{attrs:{size:"mini",value:t.row.oddNumbers,required:""},on:{change:function(e){return i.changeRow("oddNumbers",t,e)}}})]}}])}),i._v(" "),a("el-table-column",{attrs:{prop:"transferCharge",sortable:"",label:"中转运费",width:"120"},scopedSlots:i._u([{key:"default",fn:function(t){return[a("el-input",{directives:[{name:"number-only",rawName:"v-number-only:point",arg:"point"}],attrs:{size:"mini",value:t.row.transferCharge},on:{change:function(e){return i.changeRow("transferCharge",t,e)}}})]}}])}),i._v(" "),a("el-table-column",{attrs:{prop:"deliveryExpense",sortable:"",label:"中转送货费",width:"120"},scopedSlots:i._u([{key:"default",fn:function(t){return[a("el-input",{directives:[{name:"number-only",rawName:"v-number-only:point",arg:"point"}],attrs:{size:"mini",value:t.row.deliveryExpense},on:{change:function(e){return i.changeRow("deliveryExpense",t,e)}}})]}}])}),i._v(" "),a("el-table-column",{attrs:{prop:"transferOtherFee",sortable:"",label:"中转其他费",width:"120"},scopedSlots:i._u([{key:"default",fn:function(t){return[a("el-input",{directives:[{name:"number-only",rawName:"v-number-only:point",arg:"point"}],attrs:{size:"mini",value:t.row.transferOtherFee},on:{change:function(e){return i.changeRow("transferOtherFee",t,e)}}})]}}])}),i._v(" "),a("el-table-column",{attrs:{prop:"totalCost",sortable:"",label:"中转费合计",width:"120"},scopedSlots:i._u([{key:"default",fn:function(t){return[a("el-input",{attrs:{size:"mini",disabled:""},model:{value:t.row.totalCost,callback:function(e){i.$set(t.row,"totalCost",e)},expression:"scope.row.totalCost"}})]}}])}),i._v(" "),a("el-table-column",{attrs:{prop:"paymentId",sortable:"",label:"中转费付款方式",width:"120"},scopedSlots:i._u([{key:"default",fn:function(t){return[a("selectType",{attrs:{type:"payment_type",size:"mini",value:t.row.paymentId,name:t.row.paymentName},on:{change:function(e){return i.changeRow("paymentId",t,e)}}})]}}])}),i._v(" "),a("el-table-column",{attrs:{prop:"shipArrivepayFee",sortable:"",label:"到付(元)",width:"90"}}),i._v(" "),a("el-table-column",{attrs:{prop:"repertoryAmount",sortable:"",label:"中转件数",width:"100"}}),i._v(" "),a("el-table-column",{attrs:{prop:"repertoryWeight",sortable:"",label:"中转重量",width:"100"}}),i._v(" "),a("el-table-column",{attrs:{prop:"repertoryVolume",sortable:"",label:"中转体积",width:"100"}}),i._v(" "),a("el-table-column",{attrs:{prop:"budgetDeliveryFee",sortable:"",label:"预计送货费",width:"100"}}),i._v(" "),a("el-table-column",{attrs:{prop:"budgetTransferFee",sortable:"",label:"预计中转费",width:"100"}}),i._v(" "),a("el-table-column",{attrs:{prop:"shipFromCityName",sortable:"",label:"发站",width:"120"},scopedSlots:i._u([{key:"default",fn:function(e){return[i._v("\n          "+i._s(i._processTableSlot(e,"shipFromCityName"))+"\n        ")]}}])}),i._v(" "),a("el-table-column",{attrs:{prop:"shipToCityName",sortable:"",label:"到站",width:"120"},scopedSlots:i._u([{key:"default",fn:function(e){return[i._v("\n          "+i._s(i._processTableSlot(e,"shipToCityName"))+"\n        ")]}}])}),i._v(" "),a("el-table-column",{attrs:{prop:"shipSenderName",sortable:"",label:"发货人",width:"90"}}),i._v(" "),a("el-table-column",{attrs:{prop:"shipSenderMobile",sortable:"",label:"发货人电话",width:"110"}}),i._v(" "),a("el-table-column",{attrs:{prop:"shipReceiverName",sortable:"",label:"收货人",width:"90"}}),i._v(" "),a("el-table-column",{attrs:{prop:"shipReceiverMobile",sortable:"",label:"收货人电话",width:"110"}}),i._v(" "),a("el-table-column",{attrs:{prop:"cargoName",sortable:"",label:"货品名",width:"120"}}),i._v(" "),a("el-table-column",{attrs:{prop:"shipRemarks",sortable:"",label:"运单备注",width:"120"}})],1)],1)],1)},staticRenderFns:[]};t.a=a},IcMT:function(e,t,i){"use strict";var a=i("PI8x"),r=i("9cTb");var l=function(e){i("7ueC")},s=i("VU/8")(a.a,r.a,l,"data-v-4bbec734",null);t.a=s.exports},"O48/":function(e,t,i){"use strict";var a=i("Dd8w"),r=i.n(a),l=i("3oKu"),s=i("Tv76"),o=i("NYxO"),n=i("1onU"),c=i("Mqi+"),h=(i("e/1Q"),i("0xDb")),d=i("UQm2");t.a={components:{SearchForm:l.default,Pager:n.a},computed:r()({},Object(o.mapGetters)(["otherinfo"])),mounted:function(){this.searchQuery.vo.orgid=this.otherinfo.orgid},data:function(){var t=this;return{btnsize:"mini",component:"Send",selectInfo:{},dataset:[],loading:!0,setupTableVisible:!1,selected:[],total:0,id:"",allId:!1,tablekey:0,searchQuery:{currentPage:1,pageSize:100,vo:{status:1}},tableColumn:[{label:"序号",prop:"number",width:"60",fixed:!0,slot:function(e){return(t.searchQuery.currentPage-1)*t.searchQuery.pageSize+e.$index+1}},{label:"运单号",prop:"shipSn",width:"120",fixed:!0},{label:"控货状态",prop:"status",width:"180",slot:function(e){return 1===e.row.status?"未放货":"已放货"},fixed:!1},{label:"运单状态",prop:"shipStatusName",width:"120",fixed:!1},{label:"运单标识",prop:"shipIdentifying",width:"120",slot:function(e){return Object(c.b)(e.row.shipIdentifying)},fixed:!1},{label:"开单网点",prop:"fromOrgName",width:"120",fixed:!1},{label:"目的网点",prop:"toOrgName",width:"180",fixed:!1},{label:"开单时间",prop:"orderCreateTime",width:"180",fixed:!1},{label:"发货人",prop:"senderCustomerName",width:"120",fixed:!1},{label:"发货人电话",prop:"senderCustomerMobile",width:"120",fixed:!1},{label:"收货人",prop:"receiverCustomerName",width:"120",fixed:!1},{label:"收货人电话",prop:"receiverCustomerMobile",width:"120",fixed:!1},{label:"交接方式",prop:"shipDeliveryMethodName",width:"120",fixed:!1},{label:"货物名称",prop:"cargoName",width:"120",fixed:!1},{label:"品种规格",prop:"description",width:"120",fixed:!1},{label:"件数",prop:"cargoAmount",width:"80",fixed:!1},{label:"重量",prop:"cargoWeight",width:"80",fixed:!1},{label:"体积",prop:"cargoVolume",width:"80",fixed:!1},{label:"件数单价",prop:"amountFee",width:"120",fixed:!1},{label:"重量单价",prop:"weightFee",width:"120",fixed:!1},{label:"体积单价",prop:"volumeFee",width:"120",fixed:!1},{label:"发站",prop:"shipFromCityName",width:"120",fixed:!1},{label:"到站",prop:"shipToCityName",width:"120",fixed:!1},{label:"送货方式",prop:"shipDeliveryMethodName",width:"120",fixed:!1},{label:"回单要求",prop:"shipReceiptRequireName",width:"120",fixed:!1},{label:"回单份数",prop:"shipReceiptNum",width:"120",fixed:!1},{label:"代收货款",prop:"agencyFund",width:"120",fixed:!1},{label:"付款方式",prop:"shipPayWayName",width:"120",fixed:!1},{label:"现付",prop:"shipNowpayFee",width:"80",fixed:!1},{label:"到付",prop:"shipArrivepayFee",width:"80",fixed:!1},{label:"回单付",prop:"shipReceiptpayFee",width:"90",fixed:!1},{label:"月结",prop:"shipMonthpayFee",width:"80",fixed:!1},{label:"合计运费",prop:"shipTotalFee",width:"120",fixed:!1},{label:"备注",prop:"shipRemarks",width:"120",fixed:!1},{label:"到达省",prop:"endProvince",width:"120",fixed:!1},{label:"到达市",prop:"endCity",width:"120",fixed:!1},{label:"到达区",prop:"endArea",width:"120",fixed:!1},{label:"制单人",prop:"userName",width:"120",fixed:!1},{label:"发货单位",prop:"senderCustomerUnit",width:"120",fixed:!1},{label:"发货人地址",prop:"senderDetailedAddress",width:"120",fixed:!1},{label:"收货地址",prop:"receiverDetailedAddress",width:"120",fixed:!1},{label:"回扣",prop:"brokerageFee",width:"80",fixed:!1},{label:"送货费",prop:"deliveryFee",width:"90",fixed:!1},{label:"代收手续费",prop:"commissionFee",width:"120",fixed:!1},{label:"声明价值",prop:"productPrice",width:"120",fixed:!1},{label:"保险费",prop:"insuranceFee",width:"90",fixed:!1},{label:"装卸费",prop:"handlingFee",width:"90",fixed:!1},{label:"包装费",prop:"packageFee",width:"90",fixed:!1},{label:"提货费",prop:"pickupFee",width:"90",fixed:!1},{label:"上楼费",prop:"goupstairsFee",width:"90",fixed:!1},{label:"实际提货费",prop:"shipFee",width:"120",fixed:!1},{label:"叉车费",prop:"forkliftFee",width:"90",fixed:!1},{label:"实际装卸费",prop:"realityhandlingFee",width:"120",fixed:!1},{label:"报关费",prop:"customsFee",width:"90",fixed:!1},{label:"其他费收入",prop:"otherfeeIn",width:"120",fixed:!1},{label:"税率",prop:"taxRate",width:"80",fixed:!1},{label:"税金",prop:"taxes",width:"80",fixed:!1},{label:"入仓费",prop:"housingFee",width:"90",fixed:!1},{label:"印花税",prop:"stampTax",width:"90",fixed:!1}]}},methods:{changeKey:function(e){this.total=0,this.searchQuery=e,this.loading||this.fetchAllPutFh()},getSumLeft:function(e,t){return Object(h.getSummaries)(e,h.operationPropertyCalc)},parseShipStatus:function(e){return Object(c.b)(e)},fetchAllPutFh:function(){var t=this;return this.loading=!0,Object(s.d)(this.searchQuery).then(function(e){t.dataset=e.list,t.total=e.total,t.loading=!1}).catch(function(e){t.loading=!1,t._handlerCatchMsg(e)})},fetchData:function(){this.fetchAllPutFh()},getSearchParam:function(e){this.searchQuery.currentPage=this.$options.data().searchQuery.currentPage,this.searchQuery.pageSize=this.$options.data().searchQuery.pageSize,Object(h.objectMerge2)(this.searchQuery.vo,e),this.fetchData()},handlePageChange:function(e){this.searchQuery.currentPage=e.pageNum,this.searchQuery.pageSize=e.pageSize,this.fetchData()},getSelection:function(e){this.selected=e},doAction:function(e){var t=this;if(!this.selected.length&&"reg"!==e&&"export"!==e)return this.$message({message:"请选择要操作的项~",type:"warning"}),!1;switch(e){case"export":var i=Object(h.objectMerge2)([],this.dataset),a=Object(h.objectMerge2)([],this.selected);Object(d.g)({data:a.length?a:i,columns:this.tableColumn,name:"未放货"});break;case"haveGoods":if(1<this.selected.length)this.$message({message:"一次只能选择一条运单放货",type:"warning"});else{var r=this.selected[0].id;Object(s.g)(r).then(function(e){return t.$message({message:"已放货成功~",type:"success"}),!1}).catch(function(e){t.loading=!1,t._handlerCatchMsg(e)})}}this.$refs.multipleTable.clearSelection()},clickDetails:function(e,t,i){this.$refs.multipleTable.toggleRowSelection(e)},setTable:function(){this.setupTableVisible=!0},setColumn:function(e){this.tableColumn=e,this.tablekey=Math.random()},closeSetupTable:function(){this.setupTableVisible=!1},getDbClick:function(){}}}},PI8x:function(e,t,i){"use strict";t.a={data:function(){return{loading:!1,isShowLeft:!1,isShowRight:!1,isShowReback:!1,searchForm:""}},computed:{leftTableClass:function(){return this.isShowLeft?"showTableLeft":this.isShowRight?"shortTableLeft":"averageTable"},rightTableClass:function(){return this.isShowRight?"showTableRight":this.isShowLeft?"shortTableRight":"averageTable"}},methods:{doAction:function(e){switch(this.loading=!0,e){case"showAllLeft":this.showAllLeft();break;case"showAllRight":this.showAllRight();break;case"showReback":this.showReback()}this.$emit("resizeVTable"),this.loading=!1},showAllLeft:function(){this.isShowLeft=!0,this.isShowRight=!1,this.isShowReback=!0},showAllRight:function(){this.isShowLeft=!1,this.isShowRight=!0,this.isShowReback=!0},showReback:function(){this.isShowReback=!1,this.isShowLeft=!1,this.isShowRight=!1}}}},R6cw:function(e,t){},Xv4N:function(e,t,i){"use strict";var a=i("woOf"),o=i.n(a),r=i("pAQG"),n=i("0xDb");t.a={components:{querySelect:r.a},data:function(){return{senderSearch:"",searchForm:{shipSn:""},btnsize:"mini",selectVal:"shipSn",resultList:[]}},props:{info:{type:Array,default:[]},showSearch:{type:String,default:""}},methods:{querySearch:function(e,t,i){console.log(this.info);var a=this.info;for(var r in this.searchForm[e]=t,this.selectVal=e,this.searchForm)void 0!==this.searchForm[r]&&""!==this.searchForm[r]||this.$emit("change",Object(n.objectMerge2)([],this.info));var l=t?a.filter(this.createFilter(t,e)):a;i(l);var s=[];l.forEach(function(e){s.push(e)}),this.resultList=o()([],s),this.$emit("change",s)},createFilter:function(t,i){return function(e){return-1!==e[i].toLowerCase().indexOf(t.toLowerCase())}},handleSelect:function(e){this.searchForm[this.selectVal]=e[this.selectVal],this.selectVal="";var t=[];t.push(e),this.$emit("change",t)},clearSender:function(e){this.searchForm=this.$options.data().searchForm},handleSelectAll:function(){this.searchForm.shipSn&&this.resultList.length&&(this.$emit("keyupEneter"),this.searchForm=this.$options.data().searchForm)}}}},b0gS:function(e,t,i){"use strict";var a=i("0xDb"),r=i("o9X6"),l=i("66wn");t.a={components:{SelectTree:r.a,SelectCity:l.a},props:{btnsize:{type:String,default:"mini"},orgid:{type:[Array,Number]},shipSn:{type:Number},issender:{type:Boolean,dafault:!1},allId:{type:Boolean,dafault:!1}},computed:{},data:function(){return{searchCreatTime:[],defaultTime:[Object(a.parseTime)(+new Date-5184e6,"{y}-{m}-{d}"),Object(a.parseTime)(new Date,"{y}-{m}-{d}")],pickerOptions1:"",searchForm:{shipFromOrgid:"",shipSn:"",shipFromCityName:"",shipToCityName:""},rules:{},pickerOptions2:{shortcuts:a.pickerOptions2}}},watch:{orgid:function(e){this.searchForm.shipFromOrgid=e},allId:function(e){}},mounted:function(){this.searchForm.shipFromOrgid=this.orgid,this.searchCreatTime=this.defaultTime,this.onSubmit()},methods:{onSubmit:function(){this.searchForm.startTime=this.searchCreatTime?Object(a.parseTime)(this.searchCreatTime[0],"{y}-{m}-{d} ")+"00:00:00":"",this.searchForm.endTime=this.searchCreatTime?Object(a.parseTime)(this.searchCreatTime[1],"{y}-{m}-{d} ")+"23:59:59":"";var e=Object(a.objectMerge2)({},this.searchForm);this.allId?e.shipFromOrgid=this.searchForm.shipFromOrgid:this.searchForm.shipFromOrgid?e.shipFromOrgid=[this.searchForm.shipFromOrgid]:delete e.shipFromOrgid,this.$emit("change",e)},clearForm:function(){this.searchForm.shipFromOrgid=this.orgid,this.searchForm.shipSn="",this.searchForm.shipFromCityName="",this.searchForm.shipToCityName="",this.searchForm.shipFromOrgid="",this.searchCreatTime=this.defaultTime}}}},"e/1Q":function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=i("BcEV"),r=i("FB6m");var l=function(e){i("jtj/")},s=i("VU/8")(a.a,r.a,l,null,null);t.default=s.exports},eIu7:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=i("O48/"),r=i("kZ7z"),l=i("VU/8")(a.a,r.a,null,null,null);t.default=l.exports},"jtj/":function(e,t){},kZ7z:function(e,t,i){"use strict";var a={render:function(){var a=this,e=a.$createElement,r=a._self._c||e;return r("div",{directives:[{name:"loading",rawName:"v-loading",value:a.loading,expression:"loading"}],staticClass:"tab-content miniHeaderSearch"},[r("SearchForm",{attrs:{orgid:a.otherinfo.orgid,allId:a.allId,btnsize:a.btnsize},on:{change:a.getSearchParam}}),a._v(" "),r("div",{staticClass:"tab_info"},[r("div",{staticClass:"btns_box"},[r("el-button",{directives:[{name:"has",rawName:"v-has:CONTR_UP",arg:"CONTR_UP"}],attrs:{type:"primary",size:a.btnsize,icon:"el-icon-goods",plain:""},on:{click:function(e){a.doAction("haveGoods")}}},[a._v("放货")]),a._v(" "),r("el-button",{directives:[{name:"has",rawName:"v-has:CONTR_EXP1",arg:"CONTR_EXP1"}],attrs:{type:"primary",size:a.btnsize,icon:"el-icon-upload2",plain:""},on:{click:function(e){a.doAction("export")}}},[a._v("导出")]),a._v(" "),r("el-button",{staticClass:"table_setup",attrs:{type:"primary",size:a.btnsize,icon:"el-icon-setting",plain:""},on:{click:a.setTable}},[a._v("表格设置")])],1),a._v(" "),r("div",{staticClass:"info_tab"},[r("el-table",{key:a.tablekey,ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:a.dataset,border:"",height:"100%","summary-method":a.getSumLeft,"show-summary":"","tooltip-effect":"dark","default-sort":{prop:"id",order:"ascending"},stripe:""},on:{"row-dblclick":a.getDbClick,"row-click":a.clickDetails,"selection-change":a.getSelection}},[r("el-table-column",{attrs:{fixed:"",sortable:"",type:"selection",width:"70"}}),a._v(" "),a._l(a.tableColumn,function(i){return[i.slot?r("el-table-column",{key:i.id,attrs:{fixed:i.fixed,sortable:"",label:i.label,prop:i.prop,width:i.width},scopedSlots:a._u([{key:"header",fn:function(e){return[r("tableHeaderSearch",{attrs:{scope:e,query:a.searchQuery},on:{change:a.changeKey}})]}},{key:"default",fn:function(t){return[i.click?r("span",{staticClass:"clickitem",domProps:{innerHTML:a._s(i.slot(t))},on:{click:function(e){e.stopPropagation(),i.click(t)}}}):r("span",{domProps:{innerHTML:a._s(i.slot(t))}})]}}])}):r("el-table-column",{key:i.id,attrs:{fixed:i.fixed,sortable:"",label:i.label,prop:i.prop,width:i.width},scopedSlots:a._u([{key:"header",fn:function(e){return[r("tableHeaderSearch",{attrs:{scope:e,query:a.searchQuery},on:{change:a.changeKey}})]}}])})]})],2)],1),a._v(" "),r("div",{staticClass:"info_tab_footer"},[a._v("共计:"+a._s(a.total)+" "),r("div",{staticClass:"show_pager"},[r("Pager",{attrs:{total:a.total},on:{change:a.handlePageChange}})],1)]),a._v(" "),r("TableSetup",{attrs:{popVisible:a.setupTableVisible,columns:a.tableColumn,code:"CONTRO_NO"},on:{close:a.closeSetupTable,success:a.setColumn}})],1)],1)},staticRenderFns:[]};t.a=a},mYQo:function(e,t,i){"use strict";var a={render:function(){var i=this,e=i.$createElement,t=i._self._c||e;return t("el-form",{ref:"searchForm",staticClass:"tableHeadItemForm",attrs:{inline:"","label-position":"right",model:i.searchForm,"label-width":"70px"},nativeOn:{submit:function(e){e.preventDefault()}}},[t("el-form-item",{attrs:{label:"运单号"}},[t("el-autocomplete",{attrs:{size:i.btnsize,"popper-class":"popperHide","fetch-suggestions":function(e,t){return i.querySearch("shipSn",e,t)},placeholder:"运单号搜索"},on:{select:i.handleSelect},nativeOn:{keyup:function(e){return"button"in e||!i._k(e.keyCode,"enter",13,e.key,"Enter")?i.handleSelectAll(e):null}},model:{value:i.searchForm.shipSn,callback:function(e){i.$set(i.searchForm,"shipSn",e)},expression:"searchForm.shipSn"}})],1)],1)},staticRenderFns:[]};t.a=a},mZ46:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=i("Xv4N"),r=i("mYQo");var l=function(e){i("pVhU")},s=i("VU/8")(a.a,r.a,l,null,null);t.default=s.exports},pVhU:function(e,t){}});