webpackJsonp([128,267,323],{"1onU":function(e,t,i){"use strict";var a=i("VT+v"),n=i("SgVa");var s=function(e){i("Os99"),i("9yd8")},o=i("VU/8")(a.a,n.a,s,"data-v-4b7ed4df",null);t.a=o.exports},"6f/H":function(e,t,i){"use strict";var a={render:function(){var i=this,e=i.$createElement,a=i._self._c||e;return a("el-autocomplete",{attrs:{size:i.btnsize,"fetch-suggestions":i.querySearch,placeholder:"请输入运单号","prefix-icon":"el-icon-search"},on:{select:i.handleSelect},scopedSlots:i._u([{key:"default",fn:function(e){var t=e.item;return[t.shipSn?a("div",{staticClass:"name"},[i._v(i._s(t.shipSn))]):a("div",{staticClass:"name"},[i._v(i._s(t.batchNo))])]}}]),model:{value:i.currentSearch,callback:function(e){i.currentSearch=e},expression:"currentSearch"}})},staticRenderFns:[]};t.a=a},"8Nas":function(e,t,i){"use strict";var a=i("0xDb");t.a={props:{info:{type:Array,default:[]}},data:function(){return{currentSearch:"",btnsize:"mini"}},methods:{querySearch:function(e,t){(void 0===(this.currentSearch=e).shipSn||e.batchNo)&&(this.currentSearch||this.$emit("change",Object(a.objectMerge2)([],this.info)));var i=this.info;t(e?i.filter(this.createFilter(e)):i)},createFilter:function(t){return function(e){return e.shipSn?-1!==e.shipSn.toLowerCase().indexOf(t.toLowerCase()):e.batchNo?-1!==e.batchNo.toLowerCase().indexOf(t.toLowerCase()):void 0}},handleSelect:function(e){e.shipSn?this.currentSearch=e.shipSn:e.batchNo&&(this.currentSearch=e.batchNo);[].push(e),this.currentSearch="",this.$emit("change",e,this.info.indexOf(e))}}}},"9uTz":function(e,t,i){"use strict";var a=i("woOf"),n=i.n(a),s=i("Dd8w"),o=i.n(s),l=(i("E4LH"),i("NYxO")),r=i("JW1v"),c=i("t5DY"),u=i("0xDb"),h=i("Q0Ca"),f=i("pAQG"),d=i("UQm2"),p=i("xAap");t.a={components:{querySelect:f.a},data:function(){return{maxlength:30,amount:0,amountMessage:"",formModel:{detailDtoList2:[]},financialWalList:[],loading:!0,rules:{},btnsize:"mini",dialogTitle:"结 算 收 款 单",submitData:{},BANK_INFO:["financialWay","bankName","bankAccount","bankAccountName","chequeNumber","receivableNumber","wechatAccount","alipayAccount","agent"],paymentsType:1}},computed:o()({},Object(l.b)(["otherinfo"]),{isShow:{get:function(){return this.popVisible},set:function(){}},getRouteInfo:function(){return JSON.parse(this.$route.query.searchQuery)},settlementTypeId:function(){switch(this.$route.query.currentPage){case"batchShort":return 180;case"batchDeliver":return 181;case"batchInsurance":case"batchStationLoad":case"batchStationOther":case"batchArriveLoad":case"batchArrivalOther":case"batchArrivalAll":return 179}},dataName:function(){switch(this.$route.query.currentPage){case"batchShort":return"短驳费";case"batchDeliver":return"送货费";case"batchInsurance":return"整车保险费";case"batchStationLoad":return"发站装卸费";case"batchStationOther":return"发站其他费";case"batchArriveLoad":return"到站装卸费";case"batchArrivalOther":return"到站其他费";case"waybillKickback":return"回扣"}},currentPage:function(){var e=this.$route.query.currentPage;return e.substr(5,e.length)}}),props:{popVisible:{type:Boolean,default:!1},info:{type:Array,default:[]}},watch:{popVisible:function(){this.popVisible?(this.isShow=!0,this.getFeeInfo()):this.isShow=!1}},mounted:function(){var e=this;this.postTmsFfinancialwayList(),this.$nextTick(function(){e.init()})},methods:{print:function(){var e=n()({},this.formModel);this.$set(e,"amountMessage",this.amountMessage),Object(d.g)(e),this.submitForm("formModel")},postTmsFfinancialwayList:function(){var t=this,e={currentPage:1,pageSize:100,vo:{financialWay:"",financialWayTypeId:"",orgId:this.otherinfo.orgid,status:""}};Object(p.b)(e).then(function(e){t.financialWalList=[],e.list.forEach(function(e){"启用"===e.statusStr&&t.financialWalList.push(e)})}).catch(function(e){t.loading=!1,t._handlerCatchMsg(e)})},querySearch:function(e,t){var i=this.financialWalList;t(e?i.filter(this.createFilter(e)):i)},createFilter:function(t){return function(e){return 0===e.financialWay.toLowerCase().indexOf(t.toLowerCase())}},init:function(){this.loading=!1},getFeeInfo:function(){var t=this,e=this.otherinfo.orgid;return Object(r.a)(e,this.paymentsType).then(function(e){t.formModel=e.data,t.formModel.detailDtoList2=[],t.formModel.settlementTime=Object(u.parseTime)(new Date),t.formModel.settlementBy=t.otherinfo.name,t.initDetailDtoList(),t.formModel.szDtoList.forEach(function(e){e.agent=t.otherinfo.name}),t.formModel.szDtoList.length<1&&t.plusItem()}).catch(function(e){t.loading=!1,t._handlerCatchMsg(e)})},initDetailDtoList:function(){var n=this;this.formModel.amount=0,this.formModel.detailDtoList=Object(u.objectMerge2)([],this.info);var t={};for(var e in this.formModel.detailDtoList.map(function(e){t[e.dataName]?t[e.dataName].amount+=e.amount:t[e.dataName]=e}),t)this.formModel.detailDtoList2.push(t[e]);t={},this.formModel.detailDtoList2.forEach(function(e,t){e.dataName=n.dataName,n.formModel.amount+=e.amount;var i=e.amount.toFixed(2).toString().split("").reverse(),a=i.indexOf(".");-1!==a&&i.splice(a,1),e.fen=i[0],e.jiao=i[1],e.yuan=i[2],e.ten=i[3],e.hundren=i[4],e.thousand=i[5],e.tenThousand=i[6],e.oneHundrenThousand=i[7],e.million=i[8],e.tenMillion=i[9]}),this.amountMessage=Object(h.smalltoBIG)(this.formModel.amount),this.amount=this.formModel.amount.toFixed(2).toString().split("").reverse();var i=this.amount.indexOf(".");-1!==i&&this.amount.splice(i,1)},sender:function(e,t){this.$set(this.formModel.szDtoList,t,n()(this.formModel.szDtoList[t],e))},getSystemTime:function(){var t=this;Object(c.f)().then(function(e){t.formModel.settlementTime=new Date(e.trim())}).catch(function(e){t.loading=!1,t._handlerCatchMsg(e)})},closeMe:function(e){this.$emit("close"),"function"==typeof e&&e()},setData:function(){"到站装卸费"===this.dataName||"到站其他费"===this.dataName?this.$set(this.submitData,"ascriptionOrgid",this.getRouteInfo.vo.ascriptionOrgid):this.$set(this.submitData,"ascriptionOrgid",this.getRouteInfo.vo.orgid),this.$set(this.submitData,"settlementTypeId",this.settlementTypeId),this.$set(this.submitData,"settlementSn",this.formModel.settlementSn),this.$set(this.submitData,"settlementBy",this.formModel.settlementBy),this.$set(this.submitData,"settlementTime",this.formModel.settlementTime),this.$set(this.submitData,"remark",this.formModel.remark),this.$set(this.submitData,"tmsFinanceSettlementList",n()([],this.info)),this.$set(this.submitData,"tmsFinanceFinancialWayLogList",this.formModel.szDtoList)},submitForm:function(e){var i=this;this.$refs[e].validate(function(e){e&&(i.setData(),console.log(i.dataName,i.submitData),Object(r.g)(i.submitData).then(function(e){i.$message({type:"success",message:"保存成功"}),i.closeMe();var t=i.currentPage.substring(0,1).toLowerCase()+i.currentPage.substring(1);console.log(t),i.$router.push({path:"./accountsPayable/batch/"+t}),console.log("./accountsPayable/batch/"+t)}).catch(function(e){i._handlerCatchMsg(e)}))})},minusItem:function(e,t){var i=this.formModel.szDtoList.indexOf(e);-1!==i&&this.formModel.szDtoList.splice(i,1)},plusItem:function(){var e={agent:this.otherinfo.name,alipayAccount:"",bankAccount:"",bankAccountName:"",bankName:"",chequeNumber:"",financialWay:"",flowId:"",receivableNumber:"",rnum:"",wechatAccount:""};this.formModel.szDtoList.push(e)},getSum:function(e){var s=this,t=e.columns,o=e.data,l=[];return this.$nextTick(function(){}),t.forEach(function(t,e){if(0!==e)if(1!==e){for(var i=-2,a=12;2<a;a--)if(i++,e===a)return void(l[e]=s.amount[i]);var n=o.map(function(e){return Number(e[t.property])});n.every(function(e){return isNaN(e)})?l[e]="N/A":(l[e]=n.reduce(function(e,t){var i=Number(t);return isNaN(i)?e:e+t},0),l[e]+="")}else l[e]=s.amountMessage;else l[e]="合计"}),l}}}},"9yd8":function(e,t){},BbNw:function(e,t,i){"use strict";var a={render:function(){var i=this,e=i.$createElement,a=i._self._c||e;return a("el-dialog",{directives:[{name:"loading",rawName:"v-loading",value:i.loading,expression:"loading"}],staticClass:"receiptDialog",attrs:{title:i.dialogTitle,visible:i.isShow,"close-on-click-modal":!1,"before-close":i.closeMe},on:{"update:visible":function(e){i.isShow=e}}},[a("el-form",{ref:"formModel",attrs:{model:i.formModel,rules:i.rules}},[a("div",{staticClass:"receiptDialog_head"},[a("div",{staticClass:"receiptDialog_head_item"},[a("label",[i._v("单据号")]),i._v(" "),a("el-input",{attrs:{placeholder:"请输入",size:i.btnsize,disabled:""},model:{value:i.formModel.settlementSn,callback:function(e){i.$set(i.formModel,"settlementSn",e)},expression:"formModel.settlementSn"}})],1),i._v(" "),a("div",{staticClass:"receiptDialog_head_item"},[a("label",[i._v("发生时间")]),i._v(" "),a("el-date-picker",{attrs:{size:i.btnsize,"value-format":"yyyy-MM-dd HH:mm:ss",type:"date"},model:{value:i.formModel.settlementTime,callback:function(e){i.$set(i.formModel,"settlementTime",e)},expression:"formModel.settlementTime"}})],1),i._v(" "),a("div",{staticClass:"receiptDialog_head_item"},[a("label",[i._v("经办人")]),i._v(" "),a("querySelect",{attrs:{size:i.btnsize,valuekey:"name",show:"select",search:"name",label:"name"},model:{value:i.formModel.settlementBy,callback:function(e){i.$set(i.formModel,"settlementBy",e)},expression:"formModel.settlementBy"}})],1)]),i._v(" "),a("div",{staticClass:"receiptDialog_table"},[a("el-table",{staticStyle:{width:"100%",height:"100%"},attrs:{data:i.formModel.detailDtoList2,height:"100%",stripe:"","show-summary":"","summary-method":i.getSum}},[a("el-table-column",{attrs:{prop:"date",label:"序号",type:"index",width:"70"}}),i._v(" "),a("el-table-column",{attrs:{prop:"dataName",label:"费用项"}}),i._v(" "),a("el-table-column",[a("el-table-column",{attrs:{prop:"tenMillion",label:"千",width:"40"}}),i._v(" "),a("el-table-column",{attrs:{prop:"million",label:"百",width:"40"}}),i._v(" "),a("el-table-column",{attrs:{prop:"oneHundrenThousand",label:"十",width:"40"}}),i._v(" "),a("el-table-column",{attrs:{prop:"tenThousand",label:"万",width:"40"}}),i._v(" "),a("el-table-column",{attrs:{prop:"thousand",label:"千",width:"40"}}),i._v(" "),a("el-table-column",{attrs:{prop:"hundren",label:"百",width:"40"}}),i._v(" "),a("el-table-column",{attrs:{prop:"ten",label:"十",width:"40"}}),i._v(" "),a("el-table-column",{attrs:{prop:"yuan",label:"元",width:"40"}}),i._v(" "),a("el-table-column",{attrs:{prop:"jiao",label:"角",width:"40"}}),i._v(" "),a("el-table-column",{attrs:{prop:"fen",label:"分",width:"40"}})],1)],1)],1),i._v(" "),a("div",{staticClass:"receiptDialog_todo"},[a("el-button",{staticClass:"tableBtnAdd",attrs:{size:"mini"},on:{click:i.plusItem}}),i._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:i.formModel.szDtoList,border:"",height:"100%",stripe:""}},[a("el-table-column",{attrs:{fixed:"",width:"50"},scopedSlots:i._u([{key:"default",fn:function(t){return[a("el-button",{staticClass:"tableBtnMinus",attrs:{size:"mini"},on:{click:function(e){i.minusItem(t.row,t.$index)}}})]}}])}),i._v(" "),a("el-table-column",{attrs:{prop:"financialWay",label:"收支方式",width:"80"},scopedSlots:i._u([{key:"default",fn:function(t){return[a("el-autocomplete",{attrs:{"popper-class":"querySelectItem",size:i.btnsize,"fetch-suggestions":i.querySearch,placeholder:"支付方式"},on:{select:function(e){return i.sender(e,t.$index)}},scopedSlots:i._u([{key:"default",fn:function(e){var t=e.item;return i._l(i.BANK_INFO,function(e){return a("span",[i._v(i._s(t[e]))])})}}]),model:{value:t.row.financialWay,callback:function(e){i.$set(t.row,"financialWay",e)},expression:"props.row.financialWay"}})]}}])}),i._v(" "),a("el-table-column",{attrs:{prop:"bankName",label:"银行名称"},scopedSlots:i._u([{key:"default",fn:function(t){return[a("el-input",{attrs:{size:i.btnsize,maxlength:i.maxlength},model:{value:t.row.bankName,callback:function(e){i.$set(t.row,"bankName",e)},expression:"props.row.bankName"}})]}}])}),i._v(" "),a("el-table-column",{attrs:{prop:"bankAccount",label:"银行卡号",width:"200"},scopedSlots:i._u([{key:"default",fn:function(t){return[a("el-input",{directives:[{name:"numberOnly",rawName:"v-numberOnly"}],attrs:{size:i.btnsize,maxlength:i.maxlength},model:{value:t.row.bankAccount,callback:function(e){i.$set(t.row,"bankAccount",e)},expression:"props.row.bankAccount"}})]}}])}),i._v(" "),a("el-table-column",{attrs:{prop:"bankAccountName",label:"开户人",width:"80"},scopedSlots:i._u([{key:"default",fn:function(t){return[a("el-input",{attrs:{size:i.btnsize,maxlength:i.maxlength},model:{value:t.row.bankAccountName,callback:function(e){i.$set(t.row,"bankAccountName",e)},expression:"props.row.bankAccountName"}})]}}])}),i._v(" "),a("el-table-column",{attrs:{prop:"chequeNumber",label:"支票号码"},scopedSlots:i._u([{key:"default",fn:function(t){return[a("el-input",{directives:[{name:"numberOnly",rawName:"v-numberOnly"}],attrs:{size:i.btnsize,maxlength:i.maxlength},model:{value:t.row.chequeNumber,callback:function(e){i.$set(t.row,"chequeNumber",e)},expression:"props.row.chequeNumber"}})]}}])}),i._v(" "),a("el-table-column",{attrs:{prop:"receivableNumber",label:"汇款号码"},scopedSlots:i._u([{key:"default",fn:function(t){return[a("el-input",{directives:[{name:"numberOnly",rawName:"v-numberOnly"}],attrs:{size:i.btnsize,maxlength:i.maxlength},model:{value:t.row.receivableNumber,callback:function(e){i.$set(t.row,"receivableNumber",e)},expression:"props.row.receivableNumber"}})]}}])}),i._v(" "),a("el-table-column",{attrs:{prop:"wechatAccount",label:"微信号"},scopedSlots:i._u([{key:"default",fn:function(t){return[a("el-input",{attrs:{size:i.btnsize,maxlength:i.maxlength},model:{value:t.row.wechatAccount,callback:function(e){i.$set(t.row,"wechatAccount",e)},expression:"props.row.wechatAccount"}})]}}])}),i._v(" "),a("el-table-column",{attrs:{prop:"alipayAccount",label:"支付宝号"},scopedSlots:i._u([{key:"default",fn:function(t){return[a("el-input",{attrs:{size:i.btnsize,maxlength:i.maxlength},model:{value:t.row.alipayAccount,callback:function(e){i.$set(t.row,"alipayAccount",e)},expression:"props.row.alipayAccount"}})]}}])}),i._v(" "),a("el-table-column",{attrs:{prop:"agent",label:"经办人",width:"80"},scopedSlots:i._u([{key:"default",fn:function(t){return[a("querySelect",{attrs:{size:i.btnsize,valuekey:"name",show:"select",search:"name",label:"name",maxlength:i.maxlength},model:{value:t.row.agent,callback:function(e){i.$set(t.row,"agent",e)},expression:"props.row.agent"}})]}}])})],1)],1),i._v(" "),a("div",{staticClass:"receiptDialog_remark"},[a("label",[i._v("备注")]),i._v(" "),a("el-input",{attrs:{placeholder:"最多可输入300个字符",size:i.btnsize,maxlength:300},model:{value:i.formModel.remark,callback:function(e){i.$set(i.formModel,"remark",e)},expression:"formModel.remark"}})],1)]),i._v(" "),a("div",{attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"primary",size:i.btnsize,icon:"el-icon-document"},on:{click:function(e){i.submitForm("formModel")}}},[i._v("保存")]),i._v(" "),a("el-button",{attrs:{type:"primary",size:i.btnsize,icon:"el-icon-printer"},on:{click:i.print}},[i._v("保存并打印")]),i._v(" "),a("el-button",{attrs:{type:"danger",size:i.btnsize,icon:"el-icon-circle-close-outline"},on:{click:i.closeMe}},[i._v("取 消")])],1)],1)},staticRenderFns:[]};t.a=a},DT23:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=i("8Nas"),n=i("6f/H"),s=i("VU/8")(a.a,n.a,null,null,null);t.default=s.exports},IcMT:function(e,t,i){"use strict";var a=i("PI8x"),n=i("QVoP");var s=function(e){i("PbzC")},o=i("VU/8")(a.a,n.a,s,null,null);t.a=o.exports},JW1v:function(e,t,i){"use strict";t.e=function(e){return a.b.post("/api-finance/finance/tmsfinancefeepayable/v1/findListByFeeType/",e).then(function(e){return e.data||{list:[],totalCount:0}}).catch(function(e){Object(n.handleErrorMsg)(e)})},t.f=function(e){return a.b.post("/api-finance/finance/tmsfinancefeepayable/v1/findTransferList/",e).then(function(e){return e.data||{list:[],totalCount:0}}).catch(function(e){Object(n.handleErrorMsg)(e)})},t.c=function(e){return a.b.post("/api-finance/finance/tmsfinancefeepayable/v1/findAbnormalList/",e).then(function(e){return e.data||{list:[],totalCount:0}}).catch(function(e){Object(n.handleErrorMsg)(e)})},t.d=function(e){return a.b.post("/api-finance/finance/tmsfinancefeepayable/v1/findChangeList/",e).then(function(e){return e.data||{list:[],totalCount:0}}).catch(function(e){Object(n.handleErrorMsg)(e)})},t.b=function(e,t){return a.b.post("/api-finance/finance/tmsfinancefeepayable/v1/create/"+e,t).then(function(e){return e.data}).catch(function(e){Object(n.handleErrorMsg)(e)})},t.i=function(e){return a.b.post("/api-finance/finance/tmsfinancefeepayable/v1/payListBySummary/",e).then(function(e){return e.data||{list:[],totalCount:0}}).catch(function(e){Object(n.handleErrorMsg)(e)})},t.h=function(e){return a.b.post("/api-finance/finance/tmsfinancefeepayable/v1/payListByOne/",e).then(function(e){return e.data||{list:[],totalCount:0}}).catch(function(e){Object(n.handleErrorMsg)(e)})},t.a=function(e,t){return a.b.get("/api-finance/finance/tmsfinancecapitalflow/v1/getFeeInfo/?orgId="+e+"&paymentsType="+t)},t.g=function(e){return a.b.post("/api-finance/finance/tmsfinancefeepayable/v1/loadSettlement/",e).then(function(e){return e.data}).catch(function(e){Object(n.handleErrorMsg)(e)})};var a=i("Vo7i"),n=i("0xDb")},NDph:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=i("O53x"),n=i("gxDK"),s=i("VU/8")(a.a,n.a,null,null,null);t.default=s.exports},O53x:function(e,t,i){"use strict";var a=i("woOf"),s=i.n(a),n=i("Dd8w"),o=i.n(n),l=i("bOdI"),r=i.n(l),c=i("NYxO"),u=i("JW1v"),h=i("IcMT"),f=i("0xDb"),d=i("pAQG"),p=i("u/8D"),b=i("1onU"),m=i("DT23"),g=i("0xDb");t.a={components:{transferTable:h.a,querySelect:d.a,Receipt:p.default,Pager:b.a,currentSearch:m.default},data:function(){var e,i=this;return e={textChangeDanger:[],tablekey:"",loadTruck:"",truckMessage:"",formModel:{}},r()(e,"loadTruck","loadTruckOne"),r()(e,"loading",!1),r()(e,"popVisibleDialog",!1),r()(e,"btnsize","mini"),r()(e,"tableReceiptInfo",[]),r()(e,"orgLeftTable",[]),r()(e,"selectedRight",[]),r()(e,"selectedLeft",[]),r()(e,"isGoReceipt",!0),r()(e,"leftTable",[]),r()(e,"rightTable",[]),r()(e,"orgData",{left:[],right:[]}),r()(e,"isFresh",!1),r()(e,"feeType",8),r()(e,"searchQuery",{currentPage:1,pageSize:100,vo:{}}),r()(e,"tableColumnLeft",[{label:"短驳批次",prop:"batchNo",width:"120",fixed:!0},{label:"开单网点",prop:"orgName",width:"120",fixed:!1},{label:"短驳时间",prop:"departureTime",width:"180",fixed:!1,slot:function(e){return""+Object(f.parseTime)(e.row.departureTime,"{y}-{m}-{d} {h}:{i}:{s}")}},{label:"结算状态",prop:"statusName",width:"120",fixed:!1},{label:"短驳费",prop:"fee",width:"120",fixed:!1},{label:"已结短驳费",prop:"paidFee",width:"120",fixed:!1,slot:function(e){var t=e.row;return i._setTextColor(t.fee,t.paidFee,t.unpaidFee,t.paidFee)}},{label:"未结短驳费",prop:"unpaidFee",width:"120",fixed:!1,slot:function(e){var t=e.row;return i._setTextColor(t.fee,t.paidFee,t.unpaidFee,t.unpaidFee)}},{label:"司机电话",prop:"dirverMobile",width:"120",fixed:!1},{label:"车牌号",prop:"truckIdNumber",width:"120",fixed:!1},{label:"司机姓名",prop:"dirverName",width:"120",fixed:!1},{label:"目的网点",prop:"arriveOrgName",width:"120",fixed:!1},{label:"接收时间",prop:"receivingTime",width:"180",fixed:!1,slot:function(e){return""+Object(f.parseTime)(e.row.receivingTime,"{y}-{m}-{d} {h}:{i}:{s}")}},{label:"短驳件数",prop:"loadAmountall",width:"120",fixed:!1},{label:"短驳重量",prop:"loadWeightall",width:"120",fixed:!1},{label:"短驳体积",prop:"loadVolumeall",width:"120",fixed:!1},{label:"备注",prop:"remark",width:"120",fixed:!1}]),r()(e,"tableColumnRight",[{label:"短驳批次",prop:"batchNo",width:"120",fixed:!0},{label:"结算状态",prop:"statusName",width:"120",fixed:!1},{label:"发车网点",prop:"orgName",width:"120",fixed:!1},{label:"短驳时间",prop:"departureTime",width:"180",fixed:!1,slot:function(e){return""+Object(f.parseTime)(e.row.departureTime,"{y}-{m}-{d} {h}:{i}:{s}")}},{label:"短驳费",prop:"fee",width:"120",fixed:!1},{label:"已结短驳费",prop:"paidFee",width:"120",fixed:!1,slot:function(e){var t=e.row;return i._setTextColor(t.fee,t.paidFee,t.unpaidFee,t.paidFee)}},{label:"未结短驳费",prop:"unpaidFee",width:"120",fixed:!1,slot:function(e){var t=e.row;return i._setTextColor(t.fee,t.paidFee,t.unpaidFee,t.unpaidFee)}},{label:"实结短驳费",prop:"amount",width:"120",fixed:!1,expand:!0,slot:function(e){return e.row.amount}},{label:"司机电话",prop:"dirverMobile",width:"120",fixed:!1},{label:"车牌号",prop:"truckIdNumber",width:"120",fixed:!1},{label:"司机姓名",prop:"dirverName",width:"120",fixed:!1},{label:"目的网点",prop:"arriveOrgName",width:"120",fixed:!1},{label:"接收时间",prop:"receivingTime",width:"180",fixed:!1,slot:function(e){return""+Object(f.parseTime)(e.row.receivingTime,"{y}-{m}-{d} {h}:{i}:{s}")}},{label:"短驳件数",prop:"loadAmountall",width:"120",fixed:!1},{label:"短驳重量",prop:"loadWeightall",width:"120",fixed:!1},{label:"短驳体积",prop:"loadVolumeall",width:"120",fixed:!1},{label:"备注",prop:"remark",width:"120",fixed:!1}]),e},computed:o()({},Object(c.b)(["otherinfo"]),{getRouteInfo:function(){return JSON.parse(this.$route.query.searchQuery)},totalLeft:function(){return this.leftTable.length},totalRight:function(){return this.rightTable.length}}),mounted:function(){this.getList()},methods:{handlePageChangeLeft:function(e){this.searchQuery.currentPage=e.pageNum,this.searchQuery.pageSize=e.pageSize},initLeftParams:function(){this.$set(this.searchQuery.vo,"orgid",this.getRouteInfo.vo.orgid),this.$set(this.searchQuery.vo,"ascriptionOrgid",this.getRouteInfo.vo.ascriptionOrgid),this.$set(this.searchQuery.vo,"feeTypeId",this.getRouteInfo.vo.feeTypeId),this.$set(this.searchQuery.vo,"status","NOSETTLEMENT,PARTSETTLEMENT")},getList:function(){var i=this,t=Object(f.objectMerge2)([],JSON.parse(this.$route.query.selectListBatchNos));this.$route.query.selectListBatchNos?this.isModify=!0:this.isModify=!1,this.leftTable=this.$options.data().leftTable,this.rightTable=this.$options.data().rightTable,this.tableReceiptInfo=this.$options.data().tableReceiptInfo,this.orgLeftTable=this.$options.data().orgLeftTable,this.initLeftParams(),this.isFresh||Object(u.h)(this.searchQuery).then(function(e){i.leftTable=s()([],e.list),t.forEach(function(t){i.leftTable.forEach(function(e){t===e.batchNo&&i.rightTable.push(e)})}),i.rightTable.length<1?i.isGoReceipt=!0:i.isGoReceipt=!1,i.rightTable.forEach(function(e){var t=i.leftTable.indexOf(e);-1!==t&&i.leftTable.splice(t,1),e.amount=e.unpaidFee}),i.orgLeftTable=Object(f.objectMerge2)([],i.leftTable)}).catch(function(e){i.loading=!1,i._handlerCatchMsg(e)})},changLoadData:function(e,t,i){this.rightTable[e][t]=Number(i);var a=Number(this.rightTable[e].unpaidFee),n=this.rightTable[e][t];n!==a?this.$set(this.textChangeDanger,e,!0):this.$set(this.textChangeDanger,e,!1),n<0||a<n?(this.isGoReceipt=!0,this.$message({type:"warning",message:"实结费用不小于0，不大于未结费用。"})):(this.isGoReceipt=!1,this.$set(this.rightTable,e,s()(this.rightTable[e],r()({},t,this.rightTable[e][t]))))},clickDetailsRight:function(e){this.$refs.multipleTableRight.toggleRowSelection(e)},clickDetailsLeft:function(e){this.$refs.multipleTableLeft.toggleRowSelection(e)},getSelectionRight:function(e){this.selectedRight=e},getSelectionLeft:function(e){this.selectedLeft=e},changeTableKey:function(){this.tablekey=Math.random()},doAction:function(e){switch(e){case"goLeft":this.goLeft();break;case"goRight":this.goRight()}},goLeft:function(){var i=this;0===this.selectedRight.length||(this.selectedRight.forEach(function(t,e){t.amount=t.unpaidFee,i.rightTable=Object(f.objectMerge2)([],i.rightTable).filter(function(e){return e.batchNo!==t.batchNo}),i.rightTable.push(t),i.leftTable=Object(f.objectMerge2)([],i.leftTable).filter(function(e){return e.batchNo!==t.batchNo}),i.orgLeftTable=Object(f.objectMerge2)([],i.orgLeftTable).filter(function(e){return e.batchNo!==t.batchNo})}),this.selectedRight=[]),this.rightTable.length<1?this.isGoReceipt=!0:this.isGoReceipt=!1},goRight:function(){var i=this;0===this.selectedLeft.length?this.$message({type:"warning",message:"请在右边表格选择数据"}):(this.selectedLeft.forEach(function(t,e){i.leftTable=Object(f.objectMerge2)([],i.leftTable).filter(function(e){return e.batchNo!==t.batchNo}),i.orgLeftTable=Object(f.objectMerge2)([],i.orgLeftTable).filter(function(e){return e.batchNo!==t.batchNo}),i.leftTable.push(t),i.orgLeftTable.push(t),i.rightTable=Object(f.objectMerge2)([],i.rightTable).filter(function(e){return e.batchNo!==t.batchNo})}),this.selectedLeft=[]),this.rightTable.length<1?this.isGoReceipt=!0:this.isGoReceipt=!1},selectCurrent:function(e,t){this.addItem(e,t)},dclickAddItem:function(e,t){this.selectedRight=[],this.selectedRight.push(e),this.doAction("goLeft")},dclickMinusItem:function(e,t){this.selectedLeft=[],this.selectedLeft.push(e),this.doAction("goRight")},addItem:function(e,t){this.selectedRight=[],this.selectedRight[t]=e,this.doAction("goLeft")},minusItem:function(e,t){this.selectedLeft=[],this.selectedLeft[t]=e,this.doAction("goRight")},addALLList:function(){this.selectedRight=s()([],this.leftTable),this.doAction("goLeft")},minusAllList:function(){this.selectedLeft=s()([],this.rightTable),this.doAction("goRight")},searchShip:function(e){console.log("searchShip",e)},closeDialog:function(){this.popVisibleDialog=!1},openDialog:function(){this.popVisibleDialog=!0},goReceipt:function(){var a=this,i=0;if(1<this.rightTable.length&&Object(f.objectMerge2)([],this.rightTable).forEach(function(t){Object(f.objectMerge2)([],a.rightTable).forEach(function(e){t.ascriptionOrgid!==e.ascriptionOrgid&&i++})}),0<i)return i=0,this.$message({type:"warning",message:"不能同时结算两个网点"}),!1;this.tableReceiptInfo=[],this.isGoReceipt||(this.rightTable.forEach(function(e,t){var i={id:e.id,amount:e.amount,feeTypeId:e.feeTypeId};0<i.amount&&i.amount<=e.unpaidFee&&a.tableReceiptInfo.push(i),i={}}),0<this.tableReceiptInfo.length?this.openDialog():this.$message({type:"warning",message:"暂无可结算项！实结费用不小于0，不大于未结费用。"}))},getSumRight:function(e){return Object(g.getSummaries)(e,["_index|2|单","fee","unpaidFee","paidFee","loadAmountall|","loadWeightall|","loadVolumeall|"])},getSumLeft:function(e){return Object(g.getSummaries)(e,["_index|2|单","fee","unpaidFee","paidFee","loadAmountall|","amount","loadWeightall|","loadVolumeall|"])}}}},Os99:function(e,t){},PI8x:function(e,t,i){"use strict";t.a={data:function(){return{isShowLeft:!1,isShowRight:!1,isShowReback:!1,searchForm:""}},methods:{doAction:function(e){switch(e){case"showAllLeft":this.showAllLeft();break;case"showAllRight":this.showAllRight();break;case"showReback":this.showReback()}},showAllLeft:function(){this.isShowLeft=!0,this.isShowRight=!1,this.isShowReback=!0},showAllRight:function(){this.isShowLeft=!1,this.isShowRight=!0,this.isShowReback=!0},showReback:function(){this.isShowReback=!1,this.isShowLeft=!1,this.isShowRight=!1}}}},PbzC:function(e,t){},QVoP:function(e,t,i){"use strict";var a={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"transferTable"},[i("div",{staticClass:"transferTable_header"},[i("div",{staticClass:"transferTable_searchs"},[i("div",{staticClass:"transferTable_fresh"},[t._t("tableRefresh")],2),t._v(" "),t._t("tableSearch")],2),t._v(" "),i("div",{staticClass:"transferTable_header_btn_direction"},[i("el-tooltip",{attrs:{effect:"dark",content:"向左侧拉伸",placement:"top-end"}},[i("el-button",{attrs:{icon:"el-icon-arrow-right",type:"primary",circle:"",disabled:t.isShowLeft,size:"mini",plain:""},on:{click:function(e){t.doAction("showAllLeft")}}})],1),t._v(" "),i("el-tooltip",{attrs:{effect:"dark",content:"向右侧拉伸",placement:"top-start"}},[i("el-button",{attrs:{icon:"el-icon-arrow-left",type:"primary",circle:"",disabled:t.isShowRight,size:"mini",plain:""},on:{click:function(e){t.doAction("showAllRight")}}})],1),t._v(" "),i("transition",{attrs:{name:"el-zoom-in-bottom"}},[t.isShowReback?i("el-button",{attrs:{icon:"el-icon-refresh",type:"primary",circle:"",size:"mini",plain:""},on:{click:function(e){t.doAction("showReback")}}}):t._e()],1),t._v(" "),i("div",{staticClass:"transferTable_header_btn_box clearfix"},[t._t("btnsBox")],2)],1)]),t._v(" "),i("div",{staticClass:"transferTable_content"},[i("div",{staticClass:"transferTable_content_table paddingRight",class:[t.isShowLeft?"showTableLeft":t.isShowRight?"shortTableLeft":""]},[t._t("tableLeft",[t._v("左边表格区")])],2),t._v(" "),i("div",{staticClass:"transferTable_content_table",class:[t.isShowRight?"showTableRight":""]},[t._t("tableRight",[t._v("右边表格区")])],2)])])},staticRenderFns:[]};t.a=a},SgVa:function(e,t,i){"use strict";var a={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"tms-pagenation"},[i("span",{staticClass:"page-num",class:{disabled:t.pageNum<=1},on:{click:function(e){t.jumpTo(1)}}},[i("span",{staticClass:"first-page"})]),i("span",{staticClass:"page-num",class:{disabled:t.pageNum<=1},on:{click:function(e){t.jumpTo(t.pageNum-1)}}},[i("span",{staticClass:"prev-page"})]),t._v(" "),i("span",{staticClass:"page-jumper"},[t._v("\n    第\n    "),i("el-input",{ref:"input",staticClass:"el-pagination__editor is-in-pagination",attrs:{min:1,max:t.pages,type:"number",disabled:t.pages<=1},on:{change:t.handleChange,focus:t.handleFocus,blur:t.handleBlur},nativeOn:{keydown:function(e){return t.handleKeyup(e)}},model:{value:t.inputval,callback:function(e){t.inputval="string"==typeof e?e.trim():e},expression:"inputval"}}),t._v(" 页\n  ")],1),t._v("\n  /共 "+t._s(t.pages)+" 页\n  "),i("span",{staticClass:"page-num",class:{disabled:t.pageNum===t.pages},on:{click:function(e){t.jumpTo(t.pageNum+1)}}},[i("span",{staticClass:"next-page"})]),t._v(" "),i("span",{staticClass:"page-num",class:{disabled:t.pageNum===t.pages},on:{click:function(e){t.jumpTo(t.pages)}}},[i("span",{staticClass:"last-page"})]),t._v(" "),i("span",{staticClass:"tms-pagination__sizes"},[i("el-select",{staticClass:"page-select",attrs:{placeholder:"请选择"},on:{change:t.sizesChange},model:{value:t.size,callback:function(e){t.size=e},expression:"size"}},t._l(t.sizes,function(e,t){return i("el-option",{key:t,attrs:{label:e,value:e}})}))],1)])},staticRenderFns:[]};t.a=a},"VT+v":function(e,t,i){"use strict";t.a={props:{sizes:{type:Array,default:function(){return[100,200,300,400]}},total:{type:Number,default:0}},computed:{pages:function(){return Math.ceil(this.total/this.size)}},watch:{pageNum:function(){this.inputval=this.pageNum},size:function(){this.pageNum=1}},mounted:function(){this.size=this.sizes[0]},data:function(){return{pageNum:1,oldValue:0,inputval:1,oldNum:1,size:100}},methods:{handleFocus:function(e){this.oldValue=e.target.value},sizesChange:function(){this.pageNum=1,this.oldNum=this.pageNum,this.$emit("change",{pageNum:this.pageNum,pageSize:this.size})},changeEvent:function(){this.oldNum!==this.pageNum&&(this.oldNum=this.pageNum,this.$emit("change",{pageNum:this.pageNum,pageSize:this.size}))},handleCurrentChange:function(e){this.pageNum=e,this.changeEvent()},handleSizeChange:function(e){this.size=e,this.changeEvent()},handleChange:function(e){var t=parseInt(e,10);isNaN(t)?this.inputval=1:t<1?this.inputval=1:t>this.pages?this.inputval=this.pages:this.inputval=t},handleBlur:function(e){var t=e.target;this.handleChange(t.value),this.jumpTo(this.inputval)},handleKeyup:function(e){var t=e.keyCode,i=e.target;console.log("page keydown:",t,i),13===t&&this.oldValue&&i.value!==this.oldValue&&(this.handleChange(i.value),this.oldValue="")},jumpTo:function(e){e<1?this.pageNum=1:e>this.pages?this.pageNum=this.pages:this.pageNum=e,this.changeEvent()}}}},bOdI:function(e,t,i){"use strict";t.__esModule=!0;var a,n=i("C4MV"),s=(a=n)&&a.__esModule?a:{default:a};t.default=function(e,t,i){return t in e?(0,s.default)(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}},gxDK:function(e,t,i){"use strict";var a={render:function(){var a=this,e=a.$createElement,n=a._self._c||e;return n("div",{staticClass:"accountsLoad_table"},[n("div",{staticClass:"transferTable_search clearfix"},[n("currentSearch",{attrs:{info:a.orgLeftTable},on:{change:a.selectCurrent}})],1),a._v(" "),n("transferTable",{staticStyle:{height:"calc(100% - 40px)",padding:"10px"}},[n("div",{attrs:{slot:"btnsBox"},slot:"btnsBox"},[n("el-button",{attrs:{type:a.isGoReceipt?"info":"success",size:"mini",icon:"el-icon-sort",disabled:a.isGoReceipt},on:{click:a.goReceipt}},[a._v("短驳费结算")])],1),a._v(" "),n("div",{staticClass:"tableHeadItemBtn",staticStyle:{height:"100%"},attrs:{slot:"tableLeft"},slot:"tableLeft"},[n("el-button",{staticClass:"tableAllBtn",attrs:{size:"mini"},on:{click:a.addALLList}}),a._v(" "),n("el-table",{key:a.tablekey,ref:"multipleTableRight",attrs:{data:a.leftTable,border:"","tooltip-effect":"dark",triped:"",height:"100%","summary-method":a.getSumRight,"default-sort":{prop:"id",order:"ascending"},"show-overflow-tooltip":!0,"show-summary":!0},on:{"row-click":a.clickDetailsRight,"selection-change":a.getSelectionRight,"row-dblclick":a.dclickAddItem}},[n("el-table-column",{attrs:{fixed:"",width:"50",type:"index",label:"序号"},scopedSlots:a._u([{key:"default",fn:function(e){return[a._v("\n            "+a._s(e.$index+1)+"\n          ")]}}])}),a._v(" "),n("el-table-column",{attrs:{fixed:"",width:"50"},scopedSlots:a._u([{key:"default",fn:function(t){return[n("el-button",{staticClass:"tableItemBtn",attrs:{size:"mini"},on:{click:function(e){a.addItem(t.row,t.$index)}}})]}}])}),a._v(" "),a._l(a.tableColumnLeft,function(i){return[i.slot?n("el-table-column",{key:i.id,attrs:{fixed:i.fixed,sortable:"",label:i.label,width:i.width},scopedSlots:a._u([{key:"default",fn:function(t){return[i.click?n("span",{staticClass:"clickitem",domProps:{innerHTML:a._s(i.slot(t))},on:{click:function(e){e.stopPropagation(),i.click(t)}}}):n("span",{domProps:{innerHTML:a._s(i.slot(t))}})]}}])}):n("el-table-column",{key:i.id,attrs:{fixed:i.fixed,sortable:"",label:i.label,prop:i.prop,width:i.width}})]})],2)],1),a._v(" "),n("div",{staticClass:"tableHeadItemBtn",attrs:{slot:"tableRight"},slot:"tableRight"},[n("el-button",{staticClass:"tableAllBtnMinus",attrs:{size:"mini"},on:{click:a.minusAllList}}),a._v(" "),n("el-table",{key:a.tablekey,ref:"multipleTableLeft",staticStyle:{height:"100%"},attrs:{data:a.rightTable,border:"","tooltip-effect":"dark",triped:"",height:"100%","summary-method":a.getSumLeft,"default-sort":{prop:"id",order:"ascending"},"show-summary":!0},on:{"row-click":a.clickDetailsLeft,"selection-change":a.getSelectionLeft,"row-dblclick":a.dclickMinusItem}},[n("el-table-column",{attrs:{fixed:"",width:"50",type:"index",label:"序号"},scopedSlots:a._u([{key:"default",fn:function(e){return[a._v("\n            "+a._s(e.$index+1)+"\n          ")]}}])}),a._v(" "),n("el-table-column",{attrs:{fixed:"",width:"50"},scopedSlots:a._u([{key:"default",fn:function(t){return[n("el-button",{staticClass:"tableItemBtnMinus",attrs:{size:"mini"},on:{click:function(e){a.minusItem(t.row,t.$index)}}})]}}])}),a._v(" "),a._l(a.tableColumnRight,function(i){return[i.slot?n("el-table-column",{key:i.id,attrs:{fixed:i.fixed,sortable:"",label:i.label,width:i.width,prop:i.prop},scopedSlots:a._u([{key:"default",fn:function(t){return[i.expand?n("div",[n("el-input",{class:{textChangeDanger:a.textChangeDanger[t.$index]},attrs:{type:"number",size:a.btnsize},on:{change:function(e){return a.changLoadData(t.$index,i.prop,e)}},nativeOn:{dblclick:function(e){e.stopPropagation(),e.preventDefault()}},model:{value:i.slot(t),callback:function(e){a.$set(i,"slot(scope)",a._n(e))},expression:"column.slot(scope)"}})],1):n("div",[i.click?n("span",{staticClass:"clickitem",domProps:{innerHTML:a._s(i.slot(t))},on:{click:function(e){e.stopPropagation(),i.click(t)}}}):n("span",{domProps:{innerHTML:a._s(i.slot(t))}})])]}}])}):n("el-table-column",{key:i.id,attrs:{fixed:i.fixed,sortable:"",label:i.label,prop:i.prop,width:i.width}})]})],2)],1)]),a._v(" "),n("Receipt",{attrs:{popVisible:a.popVisibleDialog,info:a.tableReceiptInfo},on:{close:a.closeDialog}})],1)},staticRenderFns:[]};t.a=a},"u/8D":function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=i("9uTz"),n=i("BbNw"),s=i("VU/8")(a.a,n.a,null,null,null);t.default=s.exports}});