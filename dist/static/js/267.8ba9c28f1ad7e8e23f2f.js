webpackJsonp([267],{GjEX:function(t,e,n){"use strict";var a=n("woOf"),o=n.n(a),i=n("Dd8w"),s=n.n(i),l=(n("E4LH"),n("NYxO")),r=n("JW1v"),c=n("t5DY"),u=n("0xDb"),m=n("Q0Ca"),f=n("pAQG");e.a={components:{querySelect:f.a},data:function(){return{amount:0,amountMessage:"",formModel:{},loading:!0,rules:{},btnsize:"mini",dialogTitle:"结 算 收 款 单",submitData:{},paymentsType:1}},computed:s()({},Object(l.mapGetters)(["otherinfo"]),{isShow:{get:function(){return this.popVisible},set:function(){}},getRouteInfo:function(){return this.$route.query.searchQuery},settlementTypeId:function(){switch(this.$route.query.currentPage){case"batchShort":return 180;case"batchDeliver":return 181;case"batchInsurance":case"batchStationLoad":case"batchStationOther":case"batchArrivalLoad":case"batchArrivalOther":case"batchArrivalAll":return 179}},dataName:function(){switch(this.$route.query.currentPage){case"batchShort":return"短驳费";case"batchDeliver":return"送货费";case"batchInsurance":return"整车保险费";case"batchStationLoad":return"发站装卸费";case"batchStationOther":return"发站其他费";case"batchArrivalLoad":return"到站装卸费";case"batchArrivalOther":return"到站其他费";case"waybillKickback":return"回扣"}}}),props:{popVisible:{type:Boolean,default:!1},info:{type:Array,default:[]}},watch:{popVisible:function(){this.popVisible?(this.isShow=!0,this.getFeeInfo()):this.isShow=!1},info:function(t){if(t)return this.info}},mounted:function(){var t=this;this.$nextTick(function(){t.init()})},methods:{init:function(){this.loading=!1},getFeeInfo:function(){var e=this,t=this.otherinfo.orgid;return Object(r.a)(t,this.paymentsType).then(function(t){e.formModel=t.data,e.formModel.settlementTime=Object(u.parseTime)(new Date),e.formModel.settlementBy=e.otherinfo.name,e.initDetailDtoList()}).catch(function(t){e.loading=!1,e._handlerCatchMsg(t)})},initDetailDtoList:function(){var i=this;this.formModel.amount=0,this.formModel.detailDtoList=o()([],this.info),this.formModel.detailDtoList.forEach(function(t,e){t.dataName=i.dataName,i.formModel.amount+=t.amount;var n=t.amount.toFixed(2).toString().split("").reverse(),a=n.indexOf(".");-1!==a&&n.splice(a,1),t.fen=n[0],t.jiao=n[1],t.yuan=n[2],t.ten=n[3],t.hundren=n[4],t.thousand=n[5],t.tenThousand=n[6],t.oneHundrenThousand=n[7],t.million=n[8],t.tenMillion=n[9]}),this.amountMessage=Object(m.smalltoBIG)(this.formModel.amount),this.amount=this.formModel.amount.toFixed(2).toString().split("").reverse();var t=this.amount.indexOf(".");-1!==t&&this.amount.splice(t,1)},getSystemTime:function(){var e=this;Object(c.i)().then(function(t){e.formModel.settlementTime=new Date(t.trim())}).catch(function(t){e.loading=!1,e._handlerCatchMsg(t)})},closeMe:function(t){this.$emit("close"),"function"==typeof t&&t()},setData:function(){this.$set(this.submitData,"ascriptionOrgid",this.getRouteInfo.vo.ascriptionOrgid),this.$set(this.submitData,"settlementTypeId",this.settlementTypeId),this.$set(this.submitData,"settlementSn",this.formModel.settlementSn),this.$set(this.submitData,"settlementBy",this.formModel.settlementBy),this.$set(this.submitData,"settlementTime",this.formModel.settlementTime),this.$set(this.submitData,"remark",this.formModel.remark),this.$set(this.submitData,"tmsFinanceSettlementList",this.formModel.detailDtoList),this.$set(this.submitData,"tmsFinanceFinancialWayLogList",this.formModel.szDtoList)},submitForm:function(t){var e=this;this.$refs[t].validate(function(t){t&&(e.setData(),Object(r.i)(e.submitData).then(function(t){e.$message({type:"success",message:"保存成功"}),e.closeMe(),e.$router.push({path:"./accountsPayable/batch"})}).catch(function(t){e._handlerCatchMsg(t)}))})},minusItem:function(t,e){var n=this.formModel.szDtoList.indexOf(t);-1!==n&&this.formModel.szDtoList.splice(n,1)},plusItem:function(){this.formModel.szDtoList.push({agent:"",alipayAccount:"",bankAccount:"",bankAccountName:"",bankName:"",chequeNumber:"",financialWay:"",flowId:"",receivableNumber:"",rnum:"",wechatAccount:""})},getSum:function(t){var o=this,e=t.columns,s=t.data,l=[];return this.$nextTick(function(){}),e.forEach(function(e,t){if(0!==t)if(1!==t){for(var n=-2,a=12;2<a;a--)if(n++,t===a)return void(l[t]=o.amount[n]);var i=s.map(function(t){return Number(t[e.property])});i.every(function(t){return isNaN(t)})?l[t]="N/A":(l[t]=i.reduce(function(t,e){var n=Number(e);return isNaN(n)?t:t+e},0),l[t]+="")}else l[t]=o.amountMessage;else l[t]="合计"}),l}}}},JW1v:function(t,e,n){"use strict";e.g=function(t){return a.b.post("/api-finance/finance/tmsfinancefeepayable/v1/findListByFeeType/",t).then(function(t){return console.log("postFindListByFeeType22222222222222"),t.data||{list:[],totalCount:0}})},e.h=function(t){return a.b.post("/api-finance/finance/tmsfinancefeepayable/v1/findTransferList/",t).then(function(t){return t.data||{list:[],totalCount:0}})},e.e=function(t){return a.b.post("/api-finance/finance/tmsfinancefeepayable/v1/findAbnormalList/",t).then(function(t){return t.data||{list:[],totalCount:0}})},e.f=function(t){return a.b.post("/api-finance/finance/tmsfinancefeepayable/v1/findChangeList/",t).then(function(t){return t.data||{list:[],totalCount:0}})},e.d=function(t,e){return a.b.post("/api-finance/finance/tmsfinancefeepayable/v1/create/"+t,e).then(function(t){return t.data})},e.k=function(t){return a.b.post("/api-finance/finance/tmsfinancefeepayable/v1/payListBySummary/",t).then(function(t){return t.data||{list:[],totalCount:0}})},e.j=function(t){return a.b.post("/api-finance/finance/tmsfinancefeepayable/v1/payListByOne/",t).then(function(t){return t.data||{list:[],totalCount:0}})},e.a=function(t,e){return a.b.get("/api-finance/finance/tmsfinancecapitalflow/v1/getFeeInfo/?orgId="+t+"&paymentsType="+e)},e.i=function(t){return a.b.post("/api-finance/finance/tmsfinancefeepayable/v1/loadSettlement/",t).then(function(t){return t.data})},e.b=function(t){return a.b.post("/api-finance/finance/tmsfinancefeepayable/v1/loadVerification",t).then(function(t){return t.data})},e.c=function(t){return a.b.post("/api-finance/finance/tmsfinancefeepayable/v1/payListByHandlingFee",t).then(function(t){return t.data})};var a=n("Vo7i");n("0xDb")},"ZGd+":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n("GjEX"),i=n("h4Wt");var o=function(t){n("jz1H")},s=n("VU/8")(a.a,i.a,o,null,null);e.default=s.exports},h4Wt:function(t,e,n){"use strict";var a={render:function(){var n=this,t=n.$createElement,a=n._self._c||t;return a("el-dialog",{directives:[{name:"loading",rawName:"v-loading",value:n.loading,expression:"loading"}],staticClass:"receiptDialog",attrs:{title:n.dialogTitle,visible:n.isShow,"close-on-click-modal":!1,"before-close":n.closeMe},on:{"update:visible":function(t){n.isShow=t}}},[a("el-form",{ref:"formModel",attrs:{model:n.formModel,rules:n.rules}},[a("div",{staticClass:"receiptDialog_head"},[a("div",{staticClass:"receiptDialog_head_item"},[a("label",[n._v("单据号")]),n._v(" "),a("el-input",{attrs:{placeholder:"请输入",size:n.btnsize,disabled:""},model:{value:n.formModel.settlementSn,callback:function(t){n.$set(n.formModel,"settlementSn",t)},expression:"formModel.settlementSn"}})],1),n._v(" "),a("div",{staticClass:"receiptDialog_head_item"},[a("label",[n._v("发生时间")]),n._v(" "),a("el-date-picker",{attrs:{size:n.btnsize,"value-format":"yyyy-MM-dd HH:mm:ss",type:"date"},model:{value:n.formModel.settlementTime,callback:function(t){n.$set(n.formModel,"settlementTime",t)},expression:"formModel.settlementTime"}})],1),n._v(" "),a("div",{staticClass:"receiptDialog_head_item"},[a("label",[n._v("经办人")]),n._v(" "),a("querySelect",{attrs:{size:n.btnsize,valuekey:"id",search:"name",label:"name"},model:{value:n.formModel.settlementBy,callback:function(t){n.$set(n.formModel,"settlementBy",t)},expression:"formModel.settlementBy"}})],1)]),n._v(" "),a("div",{staticClass:"receiptDialog_table"},[a("el-table",{staticStyle:{width:"100%",height:"100%"},attrs:{data:n.formModel.detailDtoList,height:"100%",stripe:"","show-summary":"","summary-method":n.getSum}},[a("el-table-column",{attrs:{prop:"date",label:"序号",type:"index",width:"70"}}),n._v(" "),a("el-table-column",{attrs:{prop:"dataName",label:"费用项"}}),n._v(" "),a("el-table-column",[a("el-table-column",{attrs:{prop:"tenMillion",label:"千",width:"40"}}),n._v(" "),a("el-table-column",{attrs:{prop:"million",label:"百",width:"40"}}),n._v(" "),a("el-table-column",{attrs:{prop:"oneHundrenThousand",label:"十",width:"40"}}),n._v(" "),a("el-table-column",{attrs:{prop:"tenThousand",label:"万",width:"40"}}),n._v(" "),a("el-table-column",{attrs:{prop:"thousand",label:"千",width:"40"}}),n._v(" "),a("el-table-column",{attrs:{prop:"hundren",label:"百",width:"40"}}),n._v(" "),a("el-table-column",{attrs:{prop:"ten",label:"十",width:"40"}}),n._v(" "),a("el-table-column",{attrs:{prop:"yuan",label:"元",width:"40"}}),n._v(" "),a("el-table-column",{attrs:{prop:"jiao",label:"角",width:"40"}}),n._v(" "),a("el-table-column",{attrs:{prop:"fen",label:"分",width:"40"}})],1)],1)],1),n._v(" "),a("div",{staticClass:"receiptDialog_todo"},[a("el-button",{staticClass:"tableAllBtn",attrs:{icon:"el-icon-plus",type:"primary",plain:"",size:"mini"},on:{click:n.plusItem}}),n._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:n.formModel.szDtoList,border:"",height:"100%",stripe:""}},[a("el-table-column",{attrs:{fixed:"",width:"50"},scopedSlots:n._u([{key:"default",fn:function(e){return[a("el-button",{staticClass:"tableItemBtn",attrs:{icon:"el-icon-minus",type:"danger",plain:"",size:"mini"},on:{click:function(t){n.minusItem(e.row,e.$index)}}})]}}])}),n._v(" "),a("el-table-column",{attrs:{prop:"financialWay",label:"收支方式",width:"100"},scopedSlots:n._u([{key:"default",fn:function(e){return[a("el-input",{attrs:{size:n.btnsize,disabled:""},model:{value:e.row.financialWay,callback:function(t){n.$set(e.row,"financialWay",t)},expression:"props.row.financialWay"}})]}}])}),n._v(" "),a("el-table-column",{attrs:{prop:"bankName",label:"银行名称"},scopedSlots:n._u([{key:"default",fn:function(e){return[a("el-input",{attrs:{size:n.btnsize},model:{value:e.row.bankName,callback:function(t){n.$set(e.row,"bankName",t)},expression:"props.row.bankName"}})]}}])}),n._v(" "),a("el-table-column",{attrs:{prop:"bankAccount",label:"银行卡号"},scopedSlots:n._u([{key:"default",fn:function(e){return[a("el-input",{attrs:{size:n.btnsize},model:{value:e.row.bankAccount,callback:function(t){n.$set(e.row,"bankAccount",t)},expression:"props.row.bankAccount"}})]}}])}),n._v(" "),a("el-table-column",{attrs:{prop:"bankAccountName",label:"开户人"},scopedSlots:n._u([{key:"default",fn:function(e){return[a("el-input",{attrs:{size:n.btnsize},model:{value:e.row.bankAccountName,callback:function(t){n.$set(e.row,"bankAccountName",t)},expression:"props.row.bankAccountName"}})]}}])}),n._v(" "),a("el-table-column",{attrs:{prop:"chequeNumber",label:"支票号码"},scopedSlots:n._u([{key:"default",fn:function(e){return[a("el-input",{attrs:{size:n.btnsize},model:{value:e.row.chequeNumber,callback:function(t){n.$set(e.row,"chequeNumber",t)},expression:"props.row.chequeNumber"}})]}}])}),n._v(" "),a("el-table-column",{attrs:{prop:"receivableNumber",label:"汇款号码"},scopedSlots:n._u([{key:"default",fn:function(e){return[a("el-input",{attrs:{size:n.btnsize},model:{value:e.row.receivableNumber,callback:function(t){n.$set(e.row,"receivableNumber",t)},expression:"props.row.receivableNumber"}})]}}])}),n._v(" "),a("el-table-column",{attrs:{prop:"wechatAccount",label:"微信号"},scopedSlots:n._u([{key:"default",fn:function(e){return[a("el-input",{attrs:{size:n.btnsize},model:{value:e.row.wechatAccount,callback:function(t){n.$set(e.row,"wechatAccount",t)},expression:"props.row.wechatAccount"}})]}}])}),n._v(" "),a("el-table-column",{attrs:{prop:"alipayAccount",label:"支付宝号"},scopedSlots:n._u([{key:"default",fn:function(e){return[a("el-input",{attrs:{size:n.btnsize},model:{value:e.row.alipayAccount,callback:function(t){n.$set(e.row,"alipayAccount",t)},expression:"props.row.alipayAccount"}})]}}])}),n._v(" "),a("el-table-column",{attrs:{prop:"agent",label:"经办人",width:"110"},scopedSlots:n._u([{key:"default",fn:function(e){return[a("querySelect",{attrs:{search:"driverName",type:"driver",label:"driverName",remote:!0,size:n.btnsize},model:{value:e.row.agent,callback:function(t){n.$set(e.row,"agent",t)},expression:"props.row.agent"}})]}}])})],1)],1),n._v(" "),a("div",{staticClass:"receiptDialog_remark"},[a("label",[n._v("备注")]),n._v(" "),a("el-input",{attrs:{placeholder:"最多可输入300个字符",size:n.btnsize,maxlength:300},model:{value:n.formModel.remark,callback:function(t){n.$set(n.formModel,"remark",t)},expression:"formModel.remark"}})],1)]),n._v(" "),a("div",{attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"primary",size:n.btnsize,icon:"el-icon-document"},on:{click:function(t){n.submitForm("formModel")}}},[n._v("保存")]),n._v(" "),a("el-button",{attrs:{type:"primary",size:n.btnsize,icon:"el-icon-printer",disabled:""},on:{click:function(t){n.submitForm("formModel")}}},[n._v("保存并打印")]),n._v(" "),a("el-button",{attrs:{type:"danger",size:n.btnsize,icon:"el-icon-circle-close-outline"},on:{click:n.closeMe}},[n._v("取 消")])],1)],1)},staticRenderFns:[]};e.a=a},jz1H:function(t,e){}});