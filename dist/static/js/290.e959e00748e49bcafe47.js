webpackJsonp([290],{Clpx:function(e,t,n){"use strict";var a={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("el-dialog",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"receiptDialog",attrs:{title:t.dialogTitle,visible:t.isShow,"close-on-click-modal":!1,"before-close":t.closeMe},on:{"update:visible":function(e){t.isShow=e}}},[n("el-form",{ref:"formModel",attrs:{model:t.formModel,rules:t.rules}},[n("div",{staticClass:"receiptDialog_head"},[n("div",{staticClass:"receiptDialog_head_item"},[n("label",[t._v("单据号")]),t._v(" "),n("el-input",{attrs:{placeholder:"单据号",size:t.btnsize,disabled:t.isEdit},model:{value:t.formModel.settlementSn,callback:function(e){t.$set(t.formModel,"settlementSn",e)},expression:"formModel.settlementSn"}})],1),t._v(" "),n("div",{staticClass:"receiptDialog_head_item"},[n("label",[t._v("发生时间")]),t._v(" "),n("el-date-picker",{attrs:{size:t.btnsize,"value-format":"yyyy-MM-dd HH:mm:ss",type:"date",disabled:t.isEdit,placeholder:"发生时间"},model:{value:t.formModel.settlementTime,callback:function(e){t.$set(t.formModel,"settlementTime",e)},expression:"formModel.settlementTime"}})],1),t._v(" "),n("div",{staticClass:"receiptDialog_head_item"},[n("label",[t._v("经办人")]),t._v(" "),n("el-input",{attrs:{size:t.btnsize,placeholder:"经办人",disabled:t.isEdit},model:{value:t.formModel.settlementBy,callback:function(e){t.$set(t.formModel,"settlementBy",e)},expression:"formModel.settlementBy"}})],1)]),t._v(" "),n("div",{staticClass:"receiptDialog_table"},[n("el-table",{staticStyle:{width:"100%",height:"100%"},attrs:{data:t.formModel.flowFeeMidList,height:"100%",stripe:"","show-summary":"","summary-method":t.getSum}},[n("el-table-column",{attrs:{prop:"date",label:"序号",type:"index",width:"70"}}),t._v(" "),n("el-table-column",{attrs:{prop:"feeType",label:"费用项"}}),t._v(" "),n("el-table-column",[n("el-table-column",{attrs:{prop:"tenMillion",label:"千",width:"40"}}),t._v(" "),n("el-table-column",{attrs:{prop:"million",label:"百",width:"40"}}),t._v(" "),n("el-table-column",{attrs:{prop:"oneHundrenThousand",label:"十",width:"40"}}),t._v(" "),n("el-table-column",{attrs:{prop:"tenThousand",label:"万",width:"40"}}),t._v(" "),n("el-table-column",{attrs:{prop:"thousand",label:"千",width:"40"}}),t._v(" "),n("el-table-column",{attrs:{prop:"hundren",label:"百",width:"40"}}),t._v(" "),n("el-table-column",{attrs:{prop:"ten",label:"十",width:"40"}}),t._v(" "),n("el-table-column",{attrs:{prop:"yuan",label:"元",width:"40"}}),t._v(" "),n("el-table-column",{attrs:{prop:"jiao",label:"角",width:"40"}}),t._v(" "),n("el-table-column",{attrs:{prop:"fen",label:"分",width:"40"}})],1)],1)],1),t._v(" "),n("div",{staticClass:"receiptDialog_todo"},[n("el-table",{staticStyle:{width:"100%"},attrs:{data:t.formModel.szDtoList,border:"",height:"100%",stripe:""}},[n("el-table-column",{attrs:{prop:"financialWay",label:"收支方式",width:"100"}}),t._v(" "),n("el-table-column",{attrs:{prop:"bankName",label:"银行名称"}}),t._v(" "),n("el-table-column",{attrs:{prop:"bankAccount",label:"银行卡号"}}),t._v(" "),n("el-table-column",{attrs:{prop:"bankAccountName",label:"开户人"}}),t._v(" "),n("el-table-column",{attrs:{prop:"chequeNumber",label:"支票号码"}}),t._v(" "),n("el-table-column",{attrs:{prop:"receivableNumber",label:"汇款号码"}}),t._v(" "),n("el-table-column",{attrs:{prop:"wechatAccount",label:"微信号"}}),t._v(" "),n("el-table-column",{attrs:{prop:"alipayAccount",label:"支付宝号"}}),t._v(" "),n("el-table-column",{attrs:{prop:"agent",label:"经办人",width:"110"}})],1)],1),t._v(" "),n("div",{staticClass:"receiptDialog_remark"},[n("label",[t._v("备注")]),t._v(" "),n("el-input",{attrs:{placeholder:"备注",size:t.btnsize,disabled:t.isEdit,maxlength:300},model:{value:t.formModel.remark,callback:function(e){t.$set(t.formModel,"remark",e)},expression:"formModel.remark"}})],1)]),t._v(" "),n("div",{attrs:{slot:"footer"},slot:"footer"},[n("el-button",{attrs:{type:"danger",size:t.btnsize,icon:"el-icon-circle-close-outline"},on:{click:t.closeMe}},[t._v(t._s(t.isEdit?"关 闭":"取 消"))])],1)],1)},staticRenderFns:[]};t.a=a},"QS/K":function(e,t,n){"use strict";t.i=function(e){return a.b.post("/api-finance/finance/tmsfinancecapitalflow/v1/list/",e).then(function(e){return e.data})},t.a=function(e,t){return a.b.get("/api-finance/finance/tmsfinancecapitalflow/v1/getFeeInfo?orgId="+e+"&paymentsType="+t).then(function(e){return e.data})},t.c=function(e){return a.b.post("/api-finance/finance/tmsfinancecapitalflow/v1/getOrderShipList/",{orgId:e.orgId,paymentsType:e.paymentsType,incomePayType:e.incomePayType,settlementId:e.settlementId,startTime:e.startTime,endTime:e.endTime,autoTotalAmount:e.autoTotalAmount,shipSenderName:e.shipSenderName,feeId:e.feeId,truckIdNumber:e.truckIdNumber}).then(function(e){return e.data})},t.g=function(e){return a.b.post("/api-finance/finance/tmsfinancecapitalflow/v1/cancelSettlement/",{flowId:e.flowId,detailFlowId:e.detailFlowId})},t.f=function(e){return a.b.post("/api-finance/finance/tmsfinancecapitalflow/v1/addIncome/",e).then(function(e){return e.data})},t.h=function(e){return a.b.post("/api-finance/finance/tmsfinancecapitalflowdetail/v1/list/",e).then(function(e){return e.data})},t.e=function(e,t){return a.b.get("/api-finance/finance/tmsfinancecapitalflow/v1/getSettlementInfo?flowId="+e+"&settlementId="+t)},t.b=function(e){return a.b.post("/api-finance/finance/tmsfinancefeetype/v1/getFeeTypeDict",{paymentsType:e.paymentsType,fiOrderType:e.fiOrderType}).then(function(e){return e.data})},t.d=function(e){return a.b.post("/api-finance/finance/tmsfinancefinancialway/v1/getOrgFirstFinancialWay/",{financialWay:e.financialWay,orgId:e.orgId}).then(function(e){return e.data})};var a=n("Vo7i");n("0xDb")},oeKO:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n("qy12"),i=n("Clpx"),l=n("VU/8")(a.a,i.a,null,null,null);t.default=l.exports},qy12:function(e,t,n){"use strict";var a=n("woOf"),i=n.n(a),l=n("Dd8w"),o=n.n(l),r=(n("E4LH"),n("NYxO")),s=n("QS/K"),c=n("t5DY"),u=(n("0xDb"),n("Q0Ca")),d=n("pAQG");t.a={components:{querySelect:d.a},data:function(){return{isEdit:!0,amount:0,amountMessage:"",formModel:{},loading:!0,rules:{},settlementInfo:{},btnsize:"mini",dialogTitle:"结 算 收 款 单",submitData:{},paymentsType:1}},computed:o()({},Object(r.b)(["otherinfo"]),{isShow:{get:function(){return this.popVisible},set:function(){}},getRouteInfo:function(){return this.$route.query.searchQuery},settlementTypeId:function(){switch(this.$route.query.currentPage){case"batchShort":return 180;case"batchDeliver":return 181;case"batchInsurance":case"batchStationLoad":case"batchStationOther":case"batchArrivalLoad":case"batchArrivalOther":case"batchArrivalAll":return 179}},dataName:function(){switch(this.$route.query.currentPage){case"batchShort":return"短驳费";case"batchDeliver":return"送货费";case"batchInsurance":return"整车保险费";case"batchStationLoad":return"发站装卸费";case"batchStationOther":return"发站其他费";case"batchArrivalLoad":return"到站装卸费";case"batchArrivalOther":return"到站其他费";case"waybillKickback":return"回扣"}}}),props:{popVisible:{type:Boolean,default:!1},info:{type:Array,default:[]}},watch:{popVisible:function(){this.popVisible?(this.isShow=!0,this.getFeeInfo()):this.isShow=!1},info:function(e){if(e)return console.log("info",this.info),this.info}},mounted:function(){var e=this;this.$nextTick(function(){e.init()})},methods:{init:function(){this.loading=!1},getFeeInfo:function(){var t=this;this.$set(this.formModel,"szDtoList",[]),Object(s.e)(this.info[0].flowId,this.info[0].settlementId).then(function(e){t.settlementInfo=e.data,t.initDetailDtoList()}).catch(function(e){t.loading=!1,t._handlerCatchMsg(e)})},initDetailDtoList:function(){this.formModel=i()({},this.settlementInfo),console.log(this.formModel),0<this.formModel.flowFeeMidList.length&&this.formModel.flowFeeMidList.forEach(function(e,t){var n=e.amount.toFixed(2).toString().split("").reverse(),a=n.indexOf(".");-1!==a&&n.splice(a,1),e.fen=n[0],e.jiao=n[1],e.yuan=n[2],e.ten=n[3],e.hundren=n[4],e.thousand=n[5],e.tenThousand=n[6],e.oneHundrenThousand=n[7],e.million=n[8],e.tenMillion=n[9]}),this.amountMessage=Object(u.smalltoBIG)(this.formModel.amount),this.amount=this.formModel.amount.toFixed(2).toString().split("").reverse();var e=this.amount.indexOf(".");-1!==e&&this.amount.splice(e,1)},getSystemTime:function(){var t=this;Object(c.h)().then(function(e){t.formModel.settlementTime=new Date(e.trim())}).catch(function(e){t.loading=!1,t._handlerCatchMsg(e)})},closeMe:function(e){this.$emit("close"),"function"==typeof e&&e()},getSum:function(e){var l=this,t=e.columns,o=e.data,r=[];return this.$nextTick(function(){}),t.forEach(function(t,e){if(0!==e)if(1!==e){for(var n=-2,a=12;2<a;a--)if(n++,e===a)return void(r[e]=l.amount[n]);var i=o.map(function(e){return Number(e[t.property])});i.every(function(e){return isNaN(e)})?r[e]="N/A":(r[e]=i.reduce(function(e,t){var n=Number(t);return isNaN(n)?e:e+t},0),r[e]+="")}else r[e]=l.amountMessage;else r[e]="合计"}),r}}}}});