webpackJsonp([73,306],{"5/nr":function(e,t,i){"use strict";var n={render:function(){var n=this,e=n.$createElement,o=n._self._c||e;return o("div",{directives:[{name:"loading",rawName:"v-loading",value:n.loading,expression:"loading"}],staticClass:"accountsLoad_table"},[o("div",{staticClass:"transferTable_search clearfix"},[o("currentSearch",{attrs:{info:n.orgLeftTable},on:{change:n.selectCurrent}})],1),n._v(" "),o("transferTable",{staticStyle:{height:"calc(100% - 40px)",padding:"10px"}},[o("div",{attrs:{slot:"btnsBox"},slot:"btnsBox"},[o("el-button",{attrs:{type:n.isGoReceipt?"info":"success",size:"mini",icon:"el-icon-sort",disabled:n.isGoReceipt},on:{click:n.goReceipt}},[n._v("核销")])],1),n._v(" "),o("div",{staticClass:"tableHeadItemBtn tableHeadItemBtnHeight",attrs:{slot:"tableLeft"},slot:"tableLeft"},[o("el-button",{staticClass:"tableAllBtn",attrs:{size:"mini"},on:{click:n.addALLList}}),n._v(" "),o("el-table",{key:n.tablekey,ref:"multipleTableRight",attrs:{data:n.leftTable,border:"","tooltip-effect":"dark",triped:"",height:"100%","summary-method":n.getSumRight,"default-sort":{prop:"id",order:"ascending"},"show-overflow-tooltip":!0,"show-summary":!0},on:{"row-click":n.clickDetailsRight,"selection-change":n.getSelectionRight,"row-dblclick":n.dclickAddItem}},[o("el-table-column",{attrs:{fixed:"",width:"60",type:"index",label:"序号"},scopedSlots:n._u([{key:"default",fn:function(e){return[n._v("\n            "+n._s(e.$index+1)+"\n          ")]}}])}),n._v(" "),o("el-table-column",{attrs:{fixed:"",width:"50"},scopedSlots:n._u([{key:"default",fn:function(t){return[o("el-button",{staticClass:"tableItemBtn",attrs:{size:"mini"},on:{click:function(e){n.addItem(t.row,t.$index)}}})]}}])}),n._v(" "),n._l(n.tableColumnLeft,function(i){return[i.slot?o("el-table-column",{key:i.id,attrs:{fixed:i.fixed,sortable:"",label:i.label,width:i.width,prop:i.prop},scopedSlots:n._u([{key:"default",fn:function(t){return[i.expand?o("div",[o("el-input",{attrs:{type:"number",size:n.btnsize},on:{change:function(e){n.changLoadData(t.$index)}},model:{value:i.slot(t),callback:function(e){n.$set(i,"slot(scope)",n._n(e))},expression:"column.slot(scope)"}})],1):o("div",[i.click?o("span",{staticClass:"clickitem",domProps:{innerHTML:n._s(i.slot(t))},on:{click:function(e){e.stopPropagation(),i.click(t)}}}):o("span",{domProps:{innerHTML:n._s(i.slot(t))}})])]}}])}):o("el-table-column",{key:i.id,attrs:{fixed:i.fixed,sortable:"",label:i.label,prop:i.prop,width:i.width}})]})],2),n._v(" "),o("div",{staticClass:"accountsLoad_table_pager"},[o("b",[n._v("共计:"+n._s(n.totalLeft))]),n._v(" "),o("div",{staticClass:"show_pager"},[o("Pager",{attrs:{total:n.totalLeft,btnsize:"mini",defaultValues:n.searchQuery},on:{change:n.handlePageChangeLeft}})],1)])],1),n._v(" "),o("div",{staticClass:"tableHeadItemBtn tableHeadItemBtnHeight",attrs:{slot:"tableRight"},slot:"tableRight"},[o("el-button",{staticClass:"tableAllBtnMinus",attrs:{size:"mini"},on:{click:n.minusAllList}}),n._v(" "),o("el-table",{key:n.tablekey,ref:"multipleTableLeft",staticStyle:{height:"100%"},attrs:{data:n.rightTable,border:"","tooltip-effect":"dark",triped:"",height:"100%","summary-method":n.getSumLeft,"default-sort":{prop:"id",order:"ascending"},"show-summary":!0},on:{"row-click":n.clickDetailsLeft,"selection-change":n.getSelectionLeft,"row-dblclick":n.dclickMinusItem}},[o("el-table-column",{attrs:{fixed:"",width:"60",type:"index",label:"序号"},scopedSlots:n._u([{key:"default",fn:function(e){return[n._v("\n            "+n._s(e.$index+1)+"\n          ")]}}])}),n._v(" "),o("el-table-column",{attrs:{fixed:"",width:"50"},scopedSlots:n._u([{key:"default",fn:function(t){return[o("el-button",{staticClass:"tableItemBtnMinus",attrs:{size:"mini"},on:{click:function(e){n.minusItem(t.row,t.$index)}}})]}}])}),n._v(" "),n._l(n.tableColumnRight,function(i){return[i.slot?o("el-table-column",{key:i.id,attrs:{fixed:i.fixed,sortable:"",label:i.label,width:i.width,prop:i.prop},scopedSlots:n._u([{key:"default",fn:function(t){return[i.expand?o("div",[o("el-input",{directives:[{name:"numberOnly",rawName:"v-numberOnly:point",arg:"point"}],class:{textChangeDanger:n.textChangeDanger[t.$index]},attrs:{type:"number",size:n.btnsize},on:{change:function(e){return n.changLoadData(t.$index,i.prop,e)}},nativeOn:{dblclick:function(e){e.stopPropagation(),e.preventDefault()},click:function(e){e.stopPropagation(),e.preventDefault()}},model:{value:i.slot(t),callback:function(e){n.$set(i,"slot(scope)",n._n(e))},expression:"column.slot(scope)"}})],1):o("div",[i.click?o("span",{staticClass:"clickitem",domProps:{innerHTML:n._s(i.slot(t))},on:{click:function(e){e.stopPropagation(),i.click(t)}}}):o("span",{domProps:{innerHTML:n._s(i.slot(t))}})])]}}])}):o("el-table-column",{key:i.id,attrs:{fixed:i.fixed,sortable:"",label:i.label,prop:i.prop,width:i.width}})]})],2),n._v(" "),o("div",{staticClass:"accountsLoad_table_pager"},[o("b",[n._v("共计:"+n._s(n.totalRight))]),n._v(" "),o("div",{staticClass:"show_pager"})])],1)]),n._v(" "),o("Voucher",{attrs:{popVisible:n.popVisibleDialog,info:n.infoTable,orgId:n.getRouteInfo.vo.orgid,btnLoading:n.btnLoading},on:{close:n.closeDialog}})],1)},staticRenderFns:[]};t.a=n},"6f/H":function(e,t,i){"use strict";var n={render:function(){var i=this,e=i.$createElement,n=i._self._c||e;return n("el-autocomplete",{attrs:{size:i.btnsize,"fetch-suggestions":i.querySearch,placeholder:i.placeholderText,"prefix-icon":"el-icon-search"},on:{select:i.handleSelect},scopedSlots:i._u([{key:"default",fn:function(e){var t=e.item;return[t.shipSn?n("div",{staticClass:"name"},[i._v(i._s(t.shipSn))]):n("div",{staticClass:"name"},[i._v(i._s(t.batchNo))])]}}]),model:{value:i.currentSearch,callback:function(e){i.currentSearch=e},expression:"currentSearch"}})},staticRenderFns:[]};t.a=n},"7nIZ":function(e,t,i){"use strict";t.i=function(e){return n.b.post("/api-finance/finance/tmsfinancebillrecord/v1.3/getBillRecordList/",e).then(function(e){return e.data})},t.h=function(e){return n.b.post("/api-finance/finance/tmsfinancebillrecorddetail/v1.3/getBillRecordDetailList/",e).then(function(e){return e.data})},t.j=function(e){return n.b.post("/api-finance/finance/tmsfinancebillrecord/v1.3/getVerificationBaseInfo/",e).then(function(e){return e.data})},t.g=function(e){return n.b.post("/api-finance/finance/tmsfinancebillrecord/v1.3/addIncome/",e).then(function(e){return e.data})},t.a=function(e){return n.b.post("/api-finance/finance/tmsfinancebillrecord/v1.3/cancelVerification/",e).then(function(e){return e.data})},t.f=function(e){return n.b.post("/api-finance/finance/tmsfinanceverification/v1.3/getVeryficationList/",e).then(function(e){return e.data})},t.b=function(e){return n.b.post("/api-finance//finance/tmsfinancebillrecord/v1.3/delBillRecord/",e).then(function(e){return e.data})},t.e=function(e){return n.b.post("/api-finance/finance/tmsfinancebillrecord/v1.3/getOrderList/",e).then(function(e){return e.data})},t.d=function(e){return n.b.post("/api-finance/finance/tmsfinancesubjects/v1.3/getFinanceSubjects/",e).then(function(e){return e.data})},t.c=function(e){return n.b.post("/api-finance/finance/tmsfinancebillrecord/v1.3/getBillRecordInfo",e).then(function(e){return e.data})};var n=i("Vo7i")},"8Nas":function(e,t,i){"use strict";var r=i("0xDb"),a=i("JW1v");t.a={props:{info:{type:Array,default:[]}},data:function(){return{currentSearch:"",btnsize:"mini",dataList:[]}},computed:{placeholderText:{get:function(){return-1!==this.$route.query.currentPage.indexOf("batch")?"请输入批次号":"请输入运单号"},set:function(){}},getRouteInfo:function(){return JSON.parse(this.$route.query.searchQuery)}},methods:{fetchData:function(e){var t=this,i=Object(r.objectMerge2)({},this.getRouteInfo);i.vo.status="NOSETTLEMENT,PARTSETTLEMENT";var n=void 0,o=this.$route.query.currentPage;return-1!==o.indexOf("batch")?(i.vo.batchNo=e,n=/(batchTruckAll|batchArrivalAll)/.test(o)?a.k:a.j):"handleFee"===o?(i.vo.batchNo=e,n=a.c):(i.vo.shipSn=e,n=a.g),n(i).then(function(e){e&&(t.dataList=Object(r.objectMerge2)([],e.list))}).catch(function(e){t._handlerCatchMsg(e)})},querySearch:function(n,o){var a=this;this.currentSearch=n;this._processSearch({queryString:n},function(){a.fetchData(n).then(function(){var e=Object(r.objectMerge2)([],a.dataList),t=e||a.info,i=n?t.filter(a.createFilter(n)):t;o(i),e=[]})})},createFilter:function(t){return function(e){return e.shipSn?-1!==e.shipSn.toLowerCase().indexOf(t.toLowerCase()):e.batchNo?-1!==e.batchNo.toLowerCase().indexOf(t.toLowerCase()):void 0}},handleSelect:function(e){e.shipSn?this.currentSearch=e.shipSn:e.batchNo&&(this.currentSearch=e.batchNo),console.log("选中的：",e),this.currentSearch="",this.$emit("change",e,0)}}}},DT23:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=i("8Nas"),o=i("6f/H"),a=i("VU/8")(n.a,o.a,null,null,null);t.default=a.exports},DTdt:function(e,t,i){"use strict";var n=i("bOdI"),r=i.n(n),o=i("Dd8w"),a=i.n(o),s=i("woOf"),c=i.n(s),l=i("NYxO"),u=i("JW1v"),f=i("IcMT"),h=i("0xDb"),d=i("pAQG"),b=i("1onU"),p=i("DT23"),m=i("YoB2"),g=i("0xDb");t.a={name:"waybillOther",components:{transferTable:f.a,querySelect:d.a,Pager:b.a,currentSearch:p.default,Voucher:m.a},data:function(){var i=this;return{infoTable:{amount:0,orderList:[]},btnLoading:!1,textChangeDanger:[],tablekey:"",truckMessage:"",formModel:{},orgLeftTable:[],loading:!0,popVisibleDialog:!1,btnsize:"mini",totalLeft:0,tableReceiptInfo:[],selectedRight:[],selectedLeft:[],isGoReceipt:!0,leftTable:[],rightTable:[],orgData:{left:[],right:[]},isFresh:!1,feeType:13,searchQuery:{currentPage:1,pageSize:100,vo:{}},tableColumnLeft:[{label:"运单号",prop:"shipSn",width:"120",fixed:!0},{label:"开单网点",prop:"shipFromOrgName",width:"120",fixed:!1},{label:"核销状态",prop:"statusName",width:"120",fixed:!1},{label:"签收状态",prop:"signStatusName",width:"100",fixed:!1},{label:"发货人",prop:"senderCustomerName",width:"120",fixed:!1},{label:"收货人",prop:"receiverCustomerName",width:"120",fixed:!1},{label:"其他费用",prop:"fee",width:"120",fixed:!1},{label:"已核销其他费用",prop:"closeFee",width:"120",fixed:!1,slot:function(e){var t=e.row;return i._setTextColor(t.fee,t.closeFee,t.unpaidFee,t.closeFee)}},{label:"未核销其他费用",prop:"unpaidFee",width:"120",fixed:!1,slot:function(e){var t=e.row;return i._setTextColor(t.fee,t.closeFee,t.unpaidFee,t.unpaidFee)}},{label:"发货方",prop:"senderUnit",width:"120",fixed:!1},{label:"收货方",prop:"receiverUnit",width:"120",fixed:!1},{label:"货号",prop:"shipGoodsSn",width:"120",fixed:!1},{label:"货品名",prop:"cargoName",width:"120",fixed:!1},{label:"开单时间",prop:"createTime",width:"120",fixed:!1,slot:function(e){return""+Object(h.parseTime)(e.row.createTime,"{y}-{m}-{d} {h}:{i}:{s}")}},{label:"发站",prop:"shipFromCityName",width:"120",fixed:!1},{label:"到站",prop:"shipToCityName",width:"120",fixed:!1},{label:"件数",prop:"cargoAmount",width:"120",fixed:!1},{label:"重量",prop:"cargoWeight",width:"120",fixed:!1},{label:"体积",prop:"cargoVolume",width:"120",fixed:!1},{label:"运单备注",prop:"shipRemarks",width:"120",fixed:!1}],tableColumnRight:[{label:"运单号",prop:"shipSn",width:"120",fixed:!0},{label:"开单网点",prop:"shipFromOrgName",width:"120",fixed:!1},{label:"核销状态",prop:"statusName",width:"120",fixed:!1},{label:"签收状态",prop:"signStatusName",width:"100",fixed:!1},{label:"发货人",prop:"senderCustomerName",width:"120",fixed:!1},{label:"收货人",prop:"receiverCustomerName",width:"120",fixed:!1},{label:"其他费用",prop:"fee",width:"120",fixed:!1},{label:"已核销其他费用",prop:"closeFee",width:"120",fixed:!1,slot:function(e){var t=e.row;return i._setTextColor(t.fee,t.closeFee,t.unpaidFee,t.closeFee)}},{label:"未核销其他费用",prop:"unpaidFee",width:"120",fixed:!1,slot:function(e){var t=e.row;return i._setTextColor(t.fee,t.closeFee,t.unpaidFee,t.unpaidFee)}},{label:"实际核销其他费用",prop:"inputOtherFee",width:"120",fixed:!1,expand:!0,slot:function(e){return e.row.inputOtherFee}},{label:"发货方",prop:"senderUnit",width:"120",fixed:!1},{label:"收货方",prop:"receiverUnit",width:"120",fixed:!1},{label:"货号",prop:"shipGoodsSn",width:"120",fixed:!1},{label:"货品名",prop:"cargoName",width:"120",fixed:!1},{label:"开单时间",prop:"createTime",width:"180",fixed:!1,slot:function(e){return""+Object(h.parseTime)(e.row.createTime,"{y}-{m}-{d} {h}:{i}:{s}")}},{label:"发站",prop:"shipFromCityName",width:"120",fixed:!1},{label:"到站",prop:"shipToCityName",width:"120",fixed:!1},{label:"件数",prop:"cargoAmount",width:"120",fixed:!1},{label:"重量",prop:"cargoWeight",width:"120",fixed:!1},{label:"体积",prop:"cargoVolume",width:"120",fixed:!1},{label:"运单备注",prop:"shipRemarks",width:"120",fixed:!1}]}},created:function(){this.searchQuery=c()({},this.getRouteInfo)},computed:a()({},Object(l.mapGetters)(["otherinfo"]),{getRouteInfo:function(){return JSON.parse(this.$route.query.searchQuery)},totalRight:function(){return this.rightTable.length}}),mounted:function(){this.getList()},methods:{handlePageChangeLeft:function(e){this.searchQuery.currentPage=e.pageNum,this.searchQuery.pageSize=e.pageSize,console.log(e.pageSize,e.pageNum,e),this.pageGetList()},pageGetList:function(){var i=this,t=Object(h.objectMerge2)([],this.rightTable);this.loading=!0,this.$set(this.searchQuery.vo,"status","NOSETTLEMENT,PARTSETTLEMENT"),Object(u.g)(this.searchQuery).then(function(e){e&&(i.leftTable=c()([],e.list),i.totalLeft=e.total,t.forEach(function(t,e){i.leftTable=i.leftTable.filter(function(e){return e.shipSn!==t.shipSn})})),i.orgLeftTable=c()([],i.leftTable),i.loading=!1}).catch(function(e){i._handlerCatchMsg(e)})},initLeftParams:function(){this.searchQuery=c()({},this.getRouteInfo),0<JSON.parse(this.$route.query.selectListShipSns).length?console.log("111111111111111"):(console.log("22222222222222222"),this.searchQuery.currentPage=1),this.$set(this.searchQuery.vo,"feeType",this.feeType),this.$set(this.searchQuery.vo,"status","NOSETTLEMENT,PARTSETTLEMENT")},getList:function(e){var i=this,t=JSON.parse(this.$route.query.selectListShipSns),n=Object(h.objectMerge2)([],t);this.$route.query.selectListShipSns?this.isModify=!0:this.isModify=!1,this.leftTable=this.$options.data().leftTable,this.rightTable=this.$options.data().rightTable,this.infoTable=this.$options.data().infoTable,this.orgLeftTable=this.$options.data().orgLeftTable,e||this.initLeftParams(),Object(u.g)(this.searchQuery).then(function(e){i.leftTable=c()([],e.list),i.totalLeft=e.total,n.forEach(function(t){i.leftTable.forEach(function(e){t===e.shipSn&&i.rightTable.push(e)})}),i.rightTable.length<1?i.isGoReceipt=!0:i.isGoReceipt=!1,i.rightTable.forEach(function(e){var t=i.leftTable.indexOf(e);-1!==t&&i.leftTable.splice(t,1),e.inputOtherFee=e.unpaidFee}),i.orgLeftTable=Object(h.objectMerge2)([],i.leftTable),i.loading=!1}).catch(function(e){i.loading=!1,i._handlerCatchMsg(e)})},changLoadData:function(e,t,i){this.rightTable[e][t]=Number(i);var n="unpaidFee",o=Number(this.rightTable[e][n]),a=this.rightTable[e][t];a!==o?this.$set(this.textChangeDanger,e,!0):this.$set(this.textChangeDanger,e,!1),a<0||o<a?(this.$message({type:"warning",message:"实际核销费用不小于0，不大于未核销费用。"}),this.isGoReceipt=!0):(this.isGoReceipt=!1,this.$set(this.rightTable,e,c()(this.rightTable[e],r()({},t,this.rightTable[e][t])))),console.log(this.rightTable[e][t],a,n,this.rightTable[e][n],this.rightTable[e])},clickDetailsRight:function(e){this.$refs.multipleTableRight.toggleRowSelection(e)},clickDetailsLeft:function(e){this.$refs.multipleTableLeft.toggleRowSelection(e)},getSelectionRight:function(e){this.selectedRight=e},getSelectionLeft:function(e){this.selectedLeft=e},changeTableKey:function(){this.tablekey=(new Date).getTime()},doAction:function(e){switch(e){case"goLeft":this.goLeft();break;case"goRight":this.goRight()}},goLeft:function(){var i=this;0===this.selectedRight.length||(this.selectedRight.forEach(function(t,e){t.inputOtherFee=t.unpaidFee,i.rightTable=Object(h.objectMerge2)([],i.rightTable).filter(function(e){return e.shipSn!==t.shipSn}),i.rightTable.push(t),i.leftTable=Object(h.objectMerge2)([],i.leftTable).filter(function(e){return e.shipSn!==t.shipSn}),i.orgLeftTable=Object(h.objectMerge2)([],i.orgLeftTable).filter(function(e){return e.shipSn!==t.shipSn})}),this.selectedRight=[]),this.rightTable.length<1?this.isGoReceipt=!0:this.isGoReceipt=!1},goRight:function(){var i=this;0===this.selectedLeft.length?this.$message({type:"warning",message:"请在右边表格选择数据"}):(this.selectedLeft.forEach(function(t,e){i.leftTable=Object(h.objectMerge2)([],i.leftTable).filter(function(e){return e.shipSn!==t.shipSn}),i.orgLeftTable=Object(h.objectMerge2)([],i.orgLeftTable).filter(function(e){return e.shipSn!==t.shipSn}),i.leftTable.push(t),i.orgLeftTable.push(t),i.rightTable=Object(h.objectMerge2)([],i.rightTable).filter(function(e){return e.shipSn!==t.shipSn})}),this.selectedLeft=[]),this.rightTable.length<1?this.isGoReceipt=!0:this.isGoReceipt=!1},dclickAddItem:function(e,t){this.selectedRight=[],this.selectedRight.push(e),this.doAction("goLeft")},dclickMinusItem:function(e,t){this.selectedLeft=[],this.selectedLeft.push(e),this.doAction("goRight")},selectCurrent:function(e,t){this.addItem(e,t)},addItem:function(e,t){this.selectedRight=[],this.selectedRight[t]=e,this.doAction("goLeft")},minusItem:function(e,t){this.selectedLeft=[],this.selectedLeft[t]=e,this.doAction("goRight")},addALLList:function(){this.selectedRight=c()([],this.leftTable),this.doAction("goLeft")},minusAllList:function(){this.selectedLeft=c()([],this.rightTable),this.doAction("goRight")},searchShip:function(e){console.log("searchShip",e)},closeDialog:function(){this.popVisibleDialog=!1},openDialog:function(){this.popVisibleDialog=!0},goReceipt:function(){var n=this;if(this.infoTable=this.$options.data().infoTable,!this.isGoReceipt){var o=0;this.rightTable.forEach(function(e,t){if(console.log("右边列表",t,e),0<e.inputOtherFee&&e.inputOtherFee<=e.unpaidFee){var i={shipId:e.shipId,shipSn:e.shipSn,shipGoodsSn:e.shipGoodsSn,createTime:e.createTime,inputOtherFee:e.inputOtherFee,shipFromCityName:e.shipFromCityName,shipToCityName:e.shipToCityName,shipReceiverName:e.receiverCustomerName,shipSenderName:e.senderCustomerName};o=h.tmsMath._add(o,e.inputOtherFee),n.infoTable.orderList.push(i),i={}}}),this.infoTable.amount=o,(o=0)<this.infoTable.orderList.length?this.openDialog():this.$message({type:"warning",message:"暂无可核销项！实际核销费用不小于0，不大于未核销费用。"})}},getSumRight:function(e){return Object(g.getSummaries)(e,["_index|2|单","fee","unpaidFee","closeFee","cargoAmount|","cargoWeight|","cargoVolume|"])},getSumLeft:function(e){return Object(g.getSummaries)(e,["_index|2|单","fee","unpaidFee","closeFee","inputOtherFee","cargoAmount|","cargoWeight|","cargoVolume|"])}}}},DkQc:function(e,t,i){"use strict";var n=i("woOf"),a=i.n(n),r=(i("t5DY"),i("0xDb")),o=i("7nIZ"),s=i("JW1v"),c=i("E4LH");t.a={props:{popVisible:{type:Boolean,default:!1},orgId:{type:[String,Number],default:""},info:{type:[Object,Array],default:function(){return[]}}},watch:{popVisible:{handler:function(e,t){e&&this.init()},immediate:!0},info:{handler:function(e,t){console.log("voucher 接收到的数据::",e)},deep:!0},orgId:{handler:function(e,t){console.log("orgId",e,t)},immediate:!0,deep:!0}},computed:{isShow:{get:function(){return this.popVisible},set:function(){}},currentPage:function(){var e=this.$route.query.currentPage;return e.substr(7,e.length)},dataName:function(){switch(this.$route.query.currentPage){case"waybillKickback":return"回扣";case"waybillTicket":return"单票提货费";case"waybillOther":return"其他费用支出";case"waybillTransfer":return"中转费";case"waybillAbnormal":return"异常理赔";case"waybillUnusual":return"异动费用核销";case"waybillTerminal":return"终端送货费"}},getRouteInfo:function(){return JSON.parse(this.$route.query.searchQuery)},feeId:function(){return JSON.parse(this.$route.query.searchQuery).vo.feeType}},data:function(){var e=function(e,t,i){c.a.ENGLISH_AND_NUMBER.test(t)||""===t?i():i(new Error("只可以输入阿拉伯数字和字母, 最多可输入25位"))};return{btnLoading:!1,dialogTitle:"核销凭证",loading:!0,btnsize:"mini",baseQuery:{orgId:"",amount:0,feeIds:""},formModel:{verificationWay:"",paymentsType:"",amount:"",certTime:"",receiptNo:"",invoiceNo:"",checkNo:"",remark:"",subjectOneName:"",subjectOneId:"",subjectTwoName:"",subjectTwoId:"",subjectThreeName:"",subjectThreeId:"",subjectFourName:"",subjectFourId:""},rules:{verificationId:[{required:!0,message:"请填写记账方向!",trigger:"blur"}],subjectOneId:[{required:!0,message:"请填写一级科目!",trigger:"blur"}],receiptNo:[{validator:e,trigger:"blur"}],invoiceNo:[{validator:e,trigger:"blur"}],checkNo:[{validator:e,trigger:"blur"}],manualCert:[{validator:e,trigger:"blur"}]},veryficationType:{},veryficationList:[],subjectOne:[],subjectTwo:[],subjectThree:[],subjectFour:[],searchQuerySub:{orgId:"",parentId:"",subjectLevel:""}}},methods:{init:function(){this.baseQuery=this.$options.data().baseQuery,this.postVerificationBaseInfo(),this.formModel.amount=this.info.amount||0},postVerificationBaseInfo:function(){var i=this;this.baseQuery.orgId=this.orgId||this.otherinfo.orgid,this.baseQuery.amount=this.info.amount,console.log("getRouteInfo",this.getRouteInfo,this.feeId),this.baseQuery.feeIds=this.feeId+"",this.$set(this.baseQuery,"dataSrc",0),this.$set(this.baseQuery,"companyId",this.otherinfo.companyId),Object(o.j)(this.baseQuery).then(function(e){e&&(i.subjectOne=e.subOneList||[],i.subjectTwo=e.subTwoList||[],i.subjectThree=e.subThreeList||[],i.subjectFour=e.subFourList||[],i.formModel=e,i.loading=!1,e.verificationList&&(i.veryficationList=e.verificationList||[],e.verificationList.forEach(function(e,t){i.veryficationType[e.id]=e.verificationWay})))}).catch(function(e){i.loading=!1,i._handlerCatchMsg(e)})},initSubject:function(){var t=this;this.getFinanceSubjects().then(function(){if(t.formModel.subjectOneId){if(!t.checkSubject(1)){for(var e in t.formModel)/^subject/.test(e)&&(t.formModel[e]="");return}t.getFinanceSubjects(2,t.formModel.subjectOneId).then(function(){if(t.formModel.subjectTwoId){if(!t.checkSubject(2)){for(var e in t.formModel)/(Four|Three|Two)/.test(e)&&(t.formModel[e]="");return}t.getFinanceSubjects(3,t.formModel.subjectTwoId).then(function(){if(t.formModel.subjectThreeId){if(!t.checkSubject(3)){for(var e in t.formModel)/(Four|Three)/.test(e)&&(t.formModel[e]="");return}t.getFinanceSubjects(4,t.formModel.subjectThreeId).then(function(){if(t.formModel.subjectFourId&&!t.checkSubject(4))return t.formModel.subjectFourId="",void(t.formModel.subjectFourName="")})}})}})}})},checkSubjectIsNull:function(){return!(0<this.subjectTwo.length)||(this.formModel.subjectTwoId?!(0<this.subjectThree.length)||(this.formModel.subjectThreeId?!(0<this.subjectFour.length)||(!!this.formModel.subjectFourId||(this.$message.warning("请填写四级科目"),!1)):(this.$message.warning("请填写三级科目"),!1)):(this.$message.warning("请填写二级科目!"),!1))},submitForm:function(e){var o=this;this.checkSubjectIsNull()&&this.$refs[e].validate(function(e){if(e){o.btnLoading=!0;var t=a()({},o.formModel);o.$set(t,"orderList",o.info.orderList),o.$set(t,"dataSrc",0),t.certTime||(t.certTime=new Date),o.$set(t,"certTime",Object(r.parseTime)(t.certTime,"{y}-{m}-{d}")+" 00:00:00"),delete t.verificationList;var i={shipPayableFeeDtos:t.orderList,tmsFinanceBillRecordDto:t};delete i.tmsFinanceBillRecordDto.orderList;var n="";n="中转费"===o.dataName?o.getRouteInfo.vo.transferOrgid:"异常理赔"===o.dataName?o.getRouteInfo.vo.orgid:o.getRouteInfo.vo.shipFromOrgid,Object(s.d)(n,i).then(function(e){o.$message.success("保存成功！"),o.btnLoading=!1,o.popVisibleDialog=!1;var t=o.currentPage.substring(0,1).toLowerCase()+o.currentPage.substring(1);o.$router.push({path:"./accountsPayable/waybill/"+t})}).catch(function(e){o._handlerCatchMsg(e),o.btnLoading=!1})}})},setting:function(){this.$router.push({path:"/finance/financeInfo/subjectInfo"})},checkSubject:function(e){var t=this;switch(e){case 1:if(0<this.subjectOne.length)return 0!==this.subjectOne.filter(function(e){return e.id===t.formModel.subjectOneId}).length||(this.formModel.subjectOneId="",this.formModel.subjectOneName="",!1);break;case 2:if(0<this.subjectTwo.length)return 0!==this.subjectTwo.filter(function(e){return e.id===t.formModel.subjectTwoId}).length||(this.formModel.subjectTwoId="",this.formModel.subjectTwoName="",!1);break;case 3:if(0<this.subjectThree.length)return 0!==this.subjectThree.filter(function(e){return e.id===t.formModel.subjectThreeId}).length||(this.formModel.subjectThreeId="",this.formModel.subjectThreeName="",!1);break;case 4:if(0<this.subjectFour.length)return 0!==this.subjectFour.filter(function(e){return e.id===t.formModel.subjectFourId}).length||(this.formModel.subjectFourId="",this.formModel.subjectFourName="",!1)}},getFinanceSubjects:function(t,e){var i=this;return console.log("接口查询下级科目列表：\n",t,e),this.searchQuerySub.subjectLevel=t||"",this.searchQuerySub.parentId=e||"",this.searchQuerySub.orgId=this.orgId||this.otherinfo.orgid,Object(o.d)(this.searchQuerySub).then(function(e){switch(t){case 2:i.subjectTwo=e,i.subjectTwo.forEach(function(e,t){console.log(t,e.id)}),i.subjectThree=[],i.subjectFour=[],console.log("科目二: ",i.subjectTwo);break;case 3:i.subjectThree=e,i.subjectThree.forEach(function(e,t){console.log(t,e.id)}),i.subjectFour=[],console.log("科目三: ",i.subjectThree);break;case 4:i.subjectFour=e,i.subjectFour.forEach(function(e,t){console.log(t,e.id)}),console.log("科目四: ",i.subjectFour);break;default:i.subjectOne=e,i.subjectTwo=[],i.subjectThree=[],i.subjectFour=[],console.log("科目一: ",i.subjectOne),i.subjectOne.forEach(function(e,t){console.log(t,e.id)})}i.loading=!1,console.log("科目: ",t,e)}).catch(function(e){i.loading=!1,i._handlerCatchMsg(e)})},selectSubject:function(t,e){console.log(t);var i={};switch(e){case 1:for(var n in i=a()({},this.subjectOne.filter(function(e){return e.id===t})[0]),this.getFinanceSubjects(2,i.id),this.formModel)/^subject/.test(n)&&(this.formModel[n]="");this.formModel.subjectOneName=i.subjectName,this.formModel.subjectOneId=i.id,console.log("科目一 选中的值",i);break;case 2:for(var o in i=a()({},this.subjectTwo.filter(function(e){return e.id===t})[0]),this.getFinanceSubjects(3,i.id),this.formModel)/(Four|Three)/.test(o)&&(this.formModel[o]="");this.formModel.subjectTwoName=i.subjectName,console.log("科目二 选中的值",i);break;case 3:i=a()({},this.subjectThree.filter(function(e){return e.id===t})[0]),this.getFinanceSubjects(4,i.id),this.formModel.subjectThreeName=i.subjectName,this.formModel.subjectFourName="",this.formModel.subjectFourId="",console.log("科目三 选中的值",i);break;case 4:i=a()({},this.subjectFour.filter(function(e){return e.id===t})[0]),this.formModel.subjectFourName=i.subjectName}i={},console.log("formModel",this.formModel)},selectVerificationWay:function(t){var e;e=this.formModel.verificationList.filter(function(e){return e.id===t})[0],this.$set(this.formModel,"verificationWay",e.verificationWay),console.log("选中方向：：",e,this.formModel)},closeMe:function(e){this.$emit("close"),"function"==typeof e&&e()}}}},IcMT:function(e,t,i){"use strict";var n=i("PI8x"),o=i("QVoP");var a=function(e){i("jCPK")},r=i("VU/8")(n.a,o.a,a,null,null);t.a=r.exports},JW1v:function(e,t,i){"use strict";t.g=function(e){return n.b.post("/api-finance/finance/tmsfinancefeepayable/v1/findListByFeeType/",e).then(function(e){return console.log("postFindListByFeeType22222222222222"),e.data||{list:[],totalCount:0}})},t.h=function(e){return n.b.post("/api-finance/finance/tmsfinancefeepayable/v1/findTransferList/",e).then(function(e){return e.data||{list:[],totalCount:0}})},t.e=function(e){return n.b.post("/api-finance/finance/tmsfinancefeepayable/v1/findAbnormalList/",e).then(function(e){return e.data||{list:[],totalCount:0}})},t.f=function(e){return n.b.post("/api-finance/finance/tmsfinancefeepayable/v1/findChangeList/",e).then(function(e){return e.data||{list:[],totalCount:0}})},t.d=function(e,t){return n.b.post("/api-finance/finance/tmsfinancefeepayable/v1/create/"+e,t).then(function(e){return e.data})},t.k=function(e){return n.b.post("/api-finance/finance/tmsfinancefeepayable/v1/payListBySummary/",e).then(function(e){return e.data||{list:[],totalCount:0}})},t.j=function(e){return n.b.post("/api-finance/finance/tmsfinancefeepayable/v1/payListByOne/",e).then(function(e){return e.data||{list:[],totalCount:0}})},t.a=function(e,t){return n.b.get("/api-finance/finance/tmsfinancecapitalflow/v1/getFeeInfo/?orgId="+e+"&paymentsType="+t)},t.i=function(e){return n.b.post("/api-finance/finance/tmsfinancefeepayable/v1/loadSettlement/",e).then(function(e){return e.data})},t.b=function(e){return n.b.post("/api-finance/finance/tmsfinancefeepayable/v1/loadVerification",e).then(function(e){return e.data})},t.c=function(e){return n.b.post("/api-finance/finance/tmsfinancefeepayable/v1/payListByHandlingFee",e).then(function(e){return e.data})};var n=i("Vo7i");i("0xDb")},PABe:function(e,t,i){"use strict";var n={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-dialog",{staticClass:"incomeDialog",attrs:{title:t.dialogTitle,visible:t.isShow,"close-on-click-modal":!1,"before-close":t.closeMe},on:{"update:visible":function(e){t.isShow=e}}},[i("el-form",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],ref:"formModel",attrs:{model:t.formModel,rules:t.rules,inline:!0,"label-width":"120px"}},[i("div",{staticClass:"income_item"},[i("el-form-item",{staticClass:"formItemTextDanger",attrs:{label:"方向",prop:"verificationId"}},[i("el-select",{attrs:{filterable:"",placeholder:"请选择",size:t.btnsize},on:{change:t.selectVerificationWay},model:{value:t.formModel.verificationId,callback:function(e){t.$set(t.formModel,"verificationId",e)},expression:"formModel.verificationId"}},t._l(t.veryficationList,function(e,t){return i("el-option",{key:t,attrs:{value:e.id,label:e.verificationWay}})}))],1),t._v(" "),i("el-form-item",{attrs:{label:"发生金额",prop:"amount"}},[i("el-input",{directives:[{name:"numberOnly",rawName:"v-numberOnly:point",arg:"point"}],attrs:{placeholder:"发生金额",size:t.btnsize,maxlength:8,disabled:""},model:{value:t.formModel.amount,callback:function(e){t.$set(t.formModel,"amount",t._n(e))},expression:"formModel.amount"}})],1)],1),t._v(" "),i("div",{staticClass:"income_item"},[i("el-form-item",{class:{formItemTextDanger:"1"===t.formModel.isNeededVoucher},attrs:{label:"一级科目",prop:"1"===t.formModel.isNeededVoucher?"subjectOneId":""}},[i("el-select",{attrs:{filterable:"",placeholder:"无数据",size:t.btnsize,disabled:"1"!==t.formModel.isNeededVoucher,size:"mini"},on:{change:function(e){return t.selectSubject(e,1)},clear:t.initSubject},model:{value:t.formModel.subjectOneId,callback:function(e){t.$set(t.formModel,"subjectOneId",e)},expression:"formModel.subjectOneId"}},t._l(t.subjectOne,function(e,t){return i("el-option",{key:t,attrs:{label:e.subjectName,value:e.id}})}))],1),t._v(" "),i("el-form-item",{attrs:{label:"凭证日期",prop:"certTime"}},[i("el-date-picker",{attrs:{type:"date",size:t.btnsize,placeholder:"选择日期",clearable:!1},model:{value:t.formModel.certTime,callback:function(e){t.$set(t.formModel,"certTime",e)},expression:"formModel.certTime"}})],1)],1),t._v(" "),i("div",{staticClass:"income_item"},[i("el-form-item",{class:0<t.subjectTwo.length?"formItemTextDanger":"",attrs:{label:"二级科目"}},[i("el-select",{attrs:{filterable:"",placeholder:"无数据",size:t.btnsize,disabled:"1"!==t.formModel.isNeededVoucher,size:"mini"},on:{change:function(e){return t.selectSubject(e,2)}},model:{value:t.formModel.subjectTwoId,callback:function(e){t.$set(t.formModel,"subjectTwoId",e)},expression:"formModel.subjectTwoId"}},t._l(t.subjectTwo,function(e,t){return i("el-option",{key:t,attrs:{label:e.subjectName,value:e.id}})}))],1),t._v(" "),i("el-form-item",{attrs:{label:"收据号码",prop:"receiptNo"}},[i("el-input",{attrs:{placeholder:"收据号码",size:t.btnsize,maxlength:25},model:{value:t.formModel.receiptNo,callback:function(e){t.$set(t.formModel,"receiptNo",e)},expression:"formModel.receiptNo"}})],1)],1),t._v(" "),i("div",{staticClass:"income_item"},[i("el-form-item",{class:0<t.subjectThree.length?"formItemTextDanger":"",attrs:{label:"三级科目"}},[i("el-select",{attrs:{filterable:"",placeholder:"无数据",size:t.btnsize,disabled:"1"!==t.formModel.isNeededVoucher},on:{change:function(e){return t.selectSubject(e,3)}},model:{value:t.formModel.subjectThreeId,callback:function(e){t.$set(t.formModel,"subjectThreeId",e)},expression:"formModel.subjectThreeId"}},t._l(t.subjectThree,function(e,t){return i("el-option",{key:t,attrs:{label:e.subjectName,value:e.id}})}))],1),t._v(" "),i("el-form-item",{attrs:{label:"发票号码",prop:"invoiceNo"}},[i("el-input",{attrs:{placeholder:"发票号码",size:t.btnsize,maxlength:25},model:{value:t.formModel.invoiceNo,callback:function(e){t.$set(t.formModel,"invoiceNo",e)},expression:"formModel.invoiceNo"}})],1)],1),t._v(" "),i("div",{staticClass:"income_item"},[i("el-form-item",{class:0<t.subjectFour.length?"formItemTextDanger":"",attrs:{label:"四级科目"}},[i("el-select",{attrs:{filterable:"",placeholder:"无数据",size:t.btnsize,disabled:"1"!==t.formModel.isNeededVoucher},on:{change:function(e){return t.selectSubject(e,4)}},model:{value:t.formModel.subjectFourId,callback:function(e){t.$set(t.formModel,"subjectFourId",e)},expression:"formModel.subjectFourId"}},t._l(t.subjectFour,function(e,t){return i("el-option",{key:t,attrs:{label:e.subjectName,value:e.id}})}))],1),t._v(" "),i("el-form-item",{attrs:{label:"支票号码",prop:"checkNo"}},[i("el-input",{attrs:{placeholder:"支票号码",size:t.btnsize,maxlength:25},model:{value:t.formModel.checkNo,callback:function(e){t.$set(t.formModel,"checkNo",e)},expression:"formModel.checkNo"}})],1)],1),t._v(" "),i("div",{staticClass:"income_item"},[i("el-form-item",{attrs:{label:"摘要"}},[i("el-input",{attrs:{type:"textarea",placeholder:"摘要",size:t.btnsize,maxlength:50},model:{value:t.formModel.remark,callback:function(e){t.$set(t.formModel,"remark",e)},expression:"formModel.remark"}})],1),t._v(" "),i("el-form-item")],1)]),t._v(" "),i("span",{attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{type:"primary",plain:"",icon:"el-icon-document",loading:t.btnLoading},on:{click:function(e){t.submitForm("formModel")}}},[t._v("保存")]),t._v(" "),"1"===t.formModel.isNeededVoucher?i("el-button",{attrs:{type:"warning",plain:"",icon:"el-icon-setting"},on:{click:t.setting}},[t._v("设置财务科目")]):t._e(),t._v(" "),i("el-button",{attrs:{type:"danger",plain:"",icon:"el-icon-circle-close"},on:{click:t.closeMe}},[t._v("取消")])],1)],1)},staticRenderFns:[]};t.a=n},PI8x:function(e,t,i){"use strict";t.a={data:function(){return{isShowLeft:!1,isShowRight:!1,isShowReback:!1,searchForm:""}},methods:{doAction:function(e){switch(e){case"showAllLeft":this.showAllLeft();break;case"showAllRight":this.showAllRight();break;case"showReback":this.showReback()}},showAllLeft:function(){this.isShowLeft=!0,this.isShowRight=!1,this.isShowReback=!0},showAllRight:function(){this.isShowLeft=!1,this.isShowRight=!0,this.isShowReback=!0},showReback:function(){this.isShowReback=!1,this.isShowLeft=!1,this.isShowRight=!1}}}},QVoP:function(e,t,i){"use strict";var n={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"transferTable"},[i("div",{staticClass:"transferTable_header"},[i("div",{staticClass:"transferTable_searchs"},[i("div",{staticClass:"transferTable_fresh"},[t._t("tableRefresh")],2),t._v(" "),t._t("tableSearch")],2),t._v(" "),i("div",{staticClass:"transferTable_header_btn_direction"},[i("el-tooltip",{attrs:{effect:"dark",content:"向左侧拉伸",placement:"top-end"}},[i("el-button",{attrs:{icon:"el-icon-arrow-right",type:"primary",circle:"",disabled:t.isShowLeft,size:"mini",plain:""},on:{click:function(e){t.doAction("showAllLeft")}}})],1),t._v(" "),i("el-tooltip",{attrs:{effect:"dark",content:"向右侧拉伸",placement:"top-start"}},[i("el-button",{attrs:{icon:"el-icon-arrow-left",type:"primary",circle:"",disabled:t.isShowRight,size:"mini",plain:""},on:{click:function(e){t.doAction("showAllRight")}}})],1),t._v(" "),i("transition",{attrs:{name:"el-zoom-in-bottom"}},[t.isShowReback?i("el-button",{attrs:{icon:"el-icon-refresh",type:"primary",circle:"",size:"mini",plain:""},on:{click:function(e){t.doAction("showReback")}}}):t._e()],1),t._v(" "),i("div",{staticClass:"transferTable_header_btn_box clearfix"},[t._t("btnsBox")],2)],1)]),t._v(" "),i("div",{staticClass:"transferTable_content"},[i("div",{staticClass:"transferTable_content_table paddingRight",class:[t.isShowLeft?"showTableLeft":t.isShowRight?"shortTableLeft":""]},[t._t("tableLeft",[t._v("左边表格区")])],2),t._v(" "),i("div",{staticClass:"transferTable_content_table",class:[t.isShowRight?"showTableRight":""]},[t._t("tableRight",[t._v("右边表格区")])],2)])])},staticRenderFns:[]};t.a=n},YoB2:function(e,t,i){"use strict";var n=i("DkQc"),o=i("PABe"),a=i("VU/8")(n.a,o.a,null,null,null);t.a=a.exports},bOdI:function(e,t,i){"use strict";t.__esModule=!0;var n,o=i("C4MV"),a=(n=o)&&n.__esModule?n:{default:n};t.default=function(e,t,i){return t in e?(0,a.default)(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}},bUT0:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=i("DTdt"),o=i("5/nr"),a=i("VU/8")(n.a,o.a,null,null,null);t.default=a.exports},jCPK:function(e,t){}});