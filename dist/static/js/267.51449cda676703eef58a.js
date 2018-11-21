webpackJsonp([267],{"6PPo":function(t,e,n){"use strict";var a={render:function(){var n=this,t=n.$createElement,a=n._self._c||t;return a("el-dialog",{directives:[{name:"loading",rawName:"v-loading",value:n.loading,expression:"loading"}],staticClass:"receiptDialog",attrs:{title:n.dialogTitle,visible:n.isShow,"close-on-click-modal":!1,"before-close":n.closeMe},on:{"update:visible":function(t){n.isShow=t}}},[a("el-form",{ref:"formModel",attrs:{model:n.formModel,rules:n.rules}},[a("div",{attrs:{id:"settlementWaybill"}},[a("div",{staticClass:"receiptDialog_head"},[a("div",{staticClass:"receiptDialog_head_item"},[a("label",[n._v("单据号")]),n._v(" "),a("el-input",{attrs:{placeholder:"请输入",size:n.btnsize,disabled:""},model:{value:n.formModel.settlementSn,callback:function(t){n.$set(n.formModel,"settlementSn",t)},expression:"formModel.settlementSn"}})],1),n._v(" "),a("div",{staticClass:"receiptDialog_head_item"},[a("label",[n._v("发生时间")]),n._v(" "),a("el-date-picker",{attrs:{size:n.btnsize,"value-format":"yyyy-MM-dd HH:mm:ss",type:"date"},model:{value:n.formModel.settlementTime,callback:function(t){n.$set(n.formModel,"settlementTime",t)},expression:"formModel.settlementTime"}})],1),n._v(" "),a("div",{staticClass:"receiptDialog_head_item"},[a("label",[n._v("经办人")]),n._v(" "),a("querySelect",{attrs:{size:n.btnsize,valuekey:"name",show:"select",search:"name",label:"name"},model:{value:n.formModel.settlementBy,callback:function(t){n.$set(n.formModel,"settlementBy",t)},expression:"formModel.settlementBy"}})],1)]),n._v(" "),a("div",{staticClass:"receiptDialog_table"},[a("el-table",{staticStyle:{width:"100%",height:"100%"},attrs:{data:n.formModel.detailDtoList2,height:"100%",stripe:"","show-summary":"","summary-method":n.getSum}},[a("el-table-column",{attrs:{prop:"date",label:"序号",type:"index",width:"70"}}),n._v(" "),a("el-table-column",{attrs:{prop:"dataName",label:"费用项"}}),n._v(" "),a("el-table-column",[a("el-table-column",{attrs:{prop:"tenMillion",label:"千",width:"40"}}),n._v(" "),a("el-table-column",{attrs:{prop:"million",label:"百",width:"40"}}),n._v(" "),a("el-table-column",{attrs:{prop:"oneHundrenThousand",label:"十",width:"40"}}),n._v(" "),a("el-table-column",{attrs:{prop:"tenThousand",label:"万",width:"40"}}),n._v(" "),a("el-table-column",{attrs:{prop:"thousand",label:"千",width:"40"}}),n._v(" "),a("el-table-column",{attrs:{prop:"hundren",label:"百",width:"40"}}),n._v(" "),a("el-table-column",{attrs:{prop:"ten",label:"十",width:"40"}}),n._v(" "),a("el-table-column",{attrs:{prop:"yuan",label:"元",width:"40"}}),n._v(" "),a("el-table-column",{attrs:{prop:"jiao",label:"角",width:"40"}}),n._v(" "),a("el-table-column",{attrs:{prop:"fen",label:"分",width:"40"}})],1)],1)],1)]),n._v(" "),a("div",{staticClass:"receiptDialog_todo"},[a("el-button",{staticClass:"tableBtnAdd",attrs:{size:"mini"},on:{click:n.plusItem}}),n._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:n.formModel.szDtoList,border:"",height:"100%",stripe:""}},[a("el-table-column",{attrs:{fixed:"",width:"50"},scopedSlots:n._u([{key:"default",fn:function(e){return[a("el-button",{staticClass:"tableBtnMinus",attrs:{size:"mini"},on:{click:function(t){n.minusItem(e.row,e.$index)}}})]}}])}),n._v(" "),a("el-table-column",{attrs:{prop:"financialWay",label:"收支方式",width:"80"},scopedSlots:n._u([{key:"default",fn:function(e){return[a("el-autocomplete",{attrs:{"popper-class":"querySelectItem",size:n.btnsize,"fetch-suggestions":n.querySearch,placeholder:"支付方式"},on:{select:function(t){return n.sender(t,e.$index)}},scopedSlots:n._u([{key:"default",fn:function(t){var e=t.item;return n._l(n.BANK_INFO,function(t){return a("span",[n._v(n._s(e[t]))])})}}]),model:{value:e.row.financialWay,callback:function(t){n.$set(e.row,"financialWay",t)},expression:"props.row.financialWay"}})]}}])}),n._v(" "),a("el-table-column",{attrs:{prop:"bankName",label:"银行名称"},scopedSlots:n._u([{key:"default",fn:function(e){return[a("el-input",{attrs:{size:n.btnsize,maxlength:n.maxlength},model:{value:e.row.bankName,callback:function(t){n.$set(e.row,"bankName",t)},expression:"props.row.bankName"}})]}}])}),n._v(" "),a("el-table-column",{attrs:{prop:"bankAccount",label:"银行卡号",width:"200"},scopedSlots:n._u([{key:"default",fn:function(e){return[a("el-input",{directives:[{name:"numberOnly",rawName:"v-numberOnly"}],attrs:{size:n.btnsize,maxlength:n.maxlength},model:{value:e.row.bankAccount,callback:function(t){n.$set(e.row,"bankAccount",t)},expression:"props.row.bankAccount"}})]}}])}),n._v(" "),a("el-table-column",{attrs:{prop:"bankAccountName",label:"开户人",width:"80"},scopedSlots:n._u([{key:"default",fn:function(e){return[a("el-input",{attrs:{size:n.btnsize,maxlength:n.maxlength},model:{value:e.row.bankAccountName,callback:function(t){n.$set(e.row,"bankAccountName",t)},expression:"props.row.bankAccountName"}})]}}])}),n._v(" "),a("el-table-column",{attrs:{prop:"chequeNumber",label:"支票号码"},scopedSlots:n._u([{key:"default",fn:function(e){return[a("el-input",{directives:[{name:"numberOnly",rawName:"v-numberOnly"}],attrs:{size:n.btnsize,maxlength:n.maxlength},model:{value:e.row.chequeNumber,callback:function(t){n.$set(e.row,"chequeNumber",t)},expression:"props.row.chequeNumber"}})]}}])}),n._v(" "),a("el-table-column",{attrs:{prop:"receivableNumber",label:"汇款号码"},scopedSlots:n._u([{key:"default",fn:function(e){return[a("el-input",{directives:[{name:"numberOnly",rawName:"v-numberOnly"}],attrs:{size:n.btnsize,maxlength:n.maxlength},model:{value:e.row.receivableNumber,callback:function(t){n.$set(e.row,"receivableNumber",t)},expression:"props.row.receivableNumber"}})]}}])}),n._v(" "),a("el-table-column",{attrs:{prop:"wechatAccount",label:"微信号"},scopedSlots:n._u([{key:"default",fn:function(e){return[a("el-input",{attrs:{size:n.btnsize,maxlength:n.maxlength},model:{value:e.row.wechatAccount,callback:function(t){n.$set(e.row,"wechatAccount",t)},expression:"props.row.wechatAccount"}})]}}])}),n._v(" "),a("el-table-column",{attrs:{prop:"alipayAccount",label:"支付宝号"},scopedSlots:n._u([{key:"default",fn:function(e){return[a("el-input",{attrs:{size:n.btnsize,maxlength:n.maxlength},model:{value:e.row.alipayAccount,callback:function(t){n.$set(e.row,"alipayAccount",t)},expression:"props.row.alipayAccount"}})]}}])}),n._v(" "),a("el-table-column",{attrs:{prop:"agent",label:"经办人",width:"80"},scopedSlots:n._u([{key:"default",fn:function(e){return[a("querySelect",{attrs:{size:n.btnsize,valuekey:"name",show:"select",search:"name",label:"name",maxlength:n.maxlength},model:{value:e.row.agent,callback:function(t){n.$set(e.row,"agent",t)},expression:"props.row.agent"}})]}}])})],1)],1),n._v(" "),a("div",{staticClass:"receiptDialog_remark"},[a("label",[n._v("备注")]),n._v(" "),a("el-input",{attrs:{placeholder:"最多可输入300个字符",size:n.btnsize,maxlength:300},model:{value:n.formModel.remark,callback:function(t){n.$set(n.formModel,"remark",t)},expression:"formModel.remark"}})],1)]),n._v(" "),a("div",{attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"primary",size:n.btnsize,icon:"el-icon-document"},on:{click:function(t){n.submitForm("formModel")}}},[n._v("保存")]),n._v(" "),a("el-button",{attrs:{type:"primary",size:n.btnsize,icon:"el-icon-printer"},on:{click:n.print}},[n._v("保存并打印")]),n._v(" "),a("el-button",{attrs:{type:"danger",size:n.btnsize,icon:"el-icon-circle-close-outline"},on:{click:n.closeMe}},[n._v("取 消")])],1)],1)},staticRenderFns:[]};e.a=a},JW1v:function(t,e,n){"use strict";e.e=function(t){return a.b.post("/api-finance/finance/tmsfinancefeepayable/v1/findListByFeeType/",t).then(function(t){return t.data||{list:[],totalCount:0}}).catch(function(t){Object(i.handleErrorMsg)(t)})},e.f=function(t){return a.b.post("/api-finance/finance/tmsfinancefeepayable/v1/findTransferList/",t).then(function(t){return t.data||{list:[],totalCount:0}}).catch(function(t){Object(i.handleErrorMsg)(t)})},e.c=function(t){return a.b.post("/api-finance/finance/tmsfinancefeepayable/v1/findAbnormalList/",t).then(function(t){return t.data||{list:[],totalCount:0}}).catch(function(t){Object(i.handleErrorMsg)(t)})},e.d=function(t){return a.b.post("/api-finance/finance/tmsfinancefeepayable/v1/findChangeList/",t).then(function(t){return t.data||{list:[],totalCount:0}}).catch(function(t){Object(i.handleErrorMsg)(t)})},e.b=function(t,e){return a.b.post("/api-finance/finance/tmsfinancefeepayable/v1/create/"+t,e).then(function(t){return t.data}).catch(function(t){Object(i.handleErrorMsg)(t)})},e.i=function(t){return a.b.post("/api-finance/finance/tmsfinancefeepayable/v1/payListBySummary/",t).then(function(t){return t.data||{list:[],totalCount:0}}).catch(function(t){Object(i.handleErrorMsg)(t)})},e.h=function(t){return a.b.post("/api-finance/finance/tmsfinancefeepayable/v1/payListByOne/",t).then(function(t){return t.data||{list:[],totalCount:0}}).catch(function(t){Object(i.handleErrorMsg)(t)})},e.a=function(t,e){return a.b.get("/api-finance/finance/tmsfinancecapitalflow/v1/getFeeInfo/?orgId="+t+"&paymentsType="+e)},e.g=function(t){return a.b.post("/api-finance/finance/tmsfinancefeepayable/v1/loadSettlement/",t).then(function(t){return t.data}).catch(function(t){Object(i.handleErrorMsg)(t)})};var a=n("Vo7i"),i=n("0xDb")},i5L8:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n("pH7i"),i=n("6PPo"),o=n("VU/8")(a.a,i.a,null,null,null);e.default=o.exports},pH7i:function(t,e,n){"use strict";var a=n("woOf"),i=n.n(a),o=n("Dd8w"),s=n.n(o),l=(n("E4LH"),n("NYxO")),r=n("JW1v"),c=n("t5DY"),u=n("0xDb"),m=n("Q0Ca"),f=n("pAQG"),d=n("UQm2"),h=n("xAap");e.a={components:{querySelect:f.a},data:function(){return{maxlength:30,amount:0,amountMessage:"",formModel:{detailDtoList2:[],settlementBy:""},loading:!0,financialWalList:[],rules:{},btnsize:"mini",dialogTitle:"结 算 付 款 单",submitData:{},BANK_INFO:["financialWay","bankName","bankAccount","bankAccountName","chequeNumber","receivableNumber","wechatAccount","alipayAccount","agent"],paymentsType:1}},computed:s()({},Object(l.b)(["otherinfo"]),{isShow:{get:function(){return this.popVisible},set:function(){}},getRouteInfo:function(){return JSON.parse(this.$route.query.searchQuery)},settlementTypeId:function(){switch(this.$route.query.currentPage){case"batchArrivalAll":return 179}},dataName:function(){switch(this.$route.query.currentPage){case"waybillKickback":return"回扣";case"waybillTicket":return"单票提货费";case"waybillOther":return"其他费用支出";case"waybillTransfer":return"中转费";case"waybillAbnormal":return"异常理赔";case"waybillUnusual":return"异动费用结算"}},currentPage:function(){var t=this.$route.query.currentPage;return t.substr(7,t.length)}}),props:{popVisible:{type:Boolean,default:!1},info:{type:Array,default:[]}},watch:{popVisible:function(){this.popVisible?(this.isShow=!0,this.getFeeInfo()):this.isShow=!1},info:function(t){if(t)return this.info}},mounted:function(){var t=this;this.postTmsFfinancialwayList(),this.$nextTick(function(){t.init()})},methods:{valueNumber:function(t){return t.replace(/[^\d]/g,"")},print:function(){var t=i()(this.formModel);this.$set(t,"amountMessage",this.amountMessage),Object(d.f)(t),this.submitForm("formModel")},postTmsFfinancialwayList:function(){var e=this,t={currentPage:1,pageSize:100,vo:{financialWay:"",financialWayTypeId:"",orgId:this.otherinfo.orgid,status:""}};Object(h.b)(t).then(function(t){e.financialWalList=[],t.list.forEach(function(t){"启用"===t.statusStr&&e.financialWalList.push(t)})}).catch(function(t){e.loading=!1,e._handlerCatchMsg(t)})},querySearch:function(t,e){var n=this.financialWalList;e(t?n.filter(this.createFilter(t)):n)},createFilter:function(e){return function(t){return 0===t.financialWay.toLowerCase().indexOf(e.toLowerCase())}},init:function(){this.loading=!1},getFeeInfo:function(){var e=this,t=this.otherinfo.orgid;return Object(r.a)(t,this.paymentsType).then(function(t){e.formModel=t.data,e.formModel.detailDtoList2=[],e.formModel.settlementTime=Object(u.parseTime)(new Date),e.formModel.settlementBy=e.otherinfo.name,e.initDetailDtoList(),e.formModel.szDtoList.forEach(function(t){t.agent=e.otherinfo.name}),e.formModel.szDtoList.length<1&&e.plusItem()}).catch(function(t){e.loading=!1,e._handlerCatchMsg(t)})},initDetailDtoList:function(){var i=this;this.formModel.amount=0,this.formModel.detailDtoList=Object(u.objectMerge2)([],this.info);var e={};for(var t in this.formModel.detailDtoList.map(function(t){e[t.dataName]?e[t.dataName].amount+=t.amount:e[t.dataName]=t}),e)this.formModel.detailDtoList2.push(e[t]);e={},this.formModel.detailDtoList2.forEach(function(t,e){i.formModel.amount+=t.amount;var n=Number(t.amount).toFixed(2).toString().split("").reverse(),a=n.indexOf(".");-1!==a&&n.splice(a,1),t.fen=n[0],t.jiao=n[1],t.yuan=n[2],t.ten=n[3],t.hundren=n[4],t.thousand=n[5],t.tenThousand=n[6],t.oneHundrenThousand=n[7],t.million=n[8],t.tenMillion=n[9]}),this.amountMessage=Object(m.smalltoBIG)(this.formModel.amount),this.amount=this.formModel.amount.toFixed(2).toString().split("").reverse();var n=this.amount.indexOf(".");-1!==n&&this.amount.splice(n,1)},sender:function(t,e){this.$set(this.formModel.szDtoList,e,i()(this.formModel.szDtoList[e],t))},getSystemTime:function(){var e=this;Object(c.f)().then(function(t){e.formModel.settlementTime=new Date(t.trim())}).catch(function(t){e.loading=!1,e._handlerCatchMsg(t)})},closeMe:function(t){this.$emit("close"),"function"==typeof t&&t()},setData:function(){var t={},e=[],n=[];"中转费"===this.dataName?this.$set(t,"orgId",this.getRouteInfo.vo.transferOrgid):"异常理赔"===this.dataName?this.$set(t,"orgId",this.getRouteInfo.vo.orgid):this.$set(t,"orgId",this.getRouteInfo.vo.shipFromOrgid),this.$set(t,"settlementSn",this.formModel.settlementSn),this.$set(t,"settlementBy",this.formModel.settlementBy),this.$set(t,"settlementTime",this.formModel.settlementTime),this.$set(t,"remark",this.formModel.remark),this.$set(t,"detailDtoList",this.formModel.detailDtoList),this.$set(t,"szDtoList",this.formModel.szDtoList),e=i()([],this.formModel.szDtoList),n=i()([],this.info),this.$set(this.submitData,"capitalFlow",t),this.$set(this.submitData,"financialWayLogs",e),this.$set(this.submitData,"shipPayableFeeDtos",n),t={},e=[],n=[]},submitForm:function(t){var n=this;this.$refs[t].validate(function(t){if(t){n.setData(),console.log("submitData",n.submitData);var e="";e="中转费"===n.dataName?n.getRouteInfo.vo.transferOrgid:"异常理赔"===n.dataName?n.getRouteInfo.vo.orgid:n.getRouteInfo.vo.shipFromOrgid,Object(r.b)(e,n.submitData).then(function(t){n.$message({type:"success",message:"保存成功"}),n.closeMe();var e=n.currentPage.substring(0,1).toLowerCase()+n.currentPage.substring(1);n.$router.push({path:"./accountsPayable/waybill/"+e})}).catch(function(t){n._handlerCatchMsg(t)})}})},minusItem:function(t,e){var n=this.formModel.szDtoList.indexOf(t);-1!==n&&this.formModel.szDtoList.splice(n,1)},plusItem:function(){var t={agent:this.otherinfo.name,alipayAccount:"",bankAccount:"",bankAccountName:"",bankName:"",chequeNumber:"",financialWay:"",flowId:"",receivableNumber:"",rnum:"",wechatAccount:""};this.formModel.szDtoList.push(t)},getSum:function(t){var o=this,e=t.columns,s=t.data,l=[];return this.$nextTick(function(){}),e.forEach(function(e,t){if(0!==t)if(1!==t){for(var n=-2,a=12;2<a;a--)if(n++,t===a)return void(l[t]=o.amount[n]);var i=s.map(function(t){return Number(t[e.property])});i.every(function(t){return isNaN(t)})?l[t]="":(l[t]=i.reduce(function(t,e){var n=Number(e);return isNaN(n)?t:t+e},0),l[t]+="")}else l[t]=o.amountMessage;else l[t]="合计"}),l}}}}});
//# sourceMappingURL=267.51449cda676703eef58a.js.map