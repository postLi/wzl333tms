webpackJsonp([300],{"6PPo":function(e,t,n){"use strict";var a={render:function(){var n=this,e=n.$createElement,a=n._self._c||e;return a("el-dialog",{directives:[{name:"loading",rawName:"v-loading",value:n.loading,expression:"loading"}],staticClass:"receiptDialog",attrs:{title:n.dialogTitle,visible:n.isShow,"close-on-click-modal":!1,"before-close":n.closeMe},on:{"update:visible":function(e){n.isShow=e}}},[a("el-form",{ref:"formModel",attrs:{model:n.formModel,rules:n.rules}},[a("div",{attrs:{id:"settlementWaybill"}},[a("div",{staticClass:"receiptDialog_head"},[a("div",{staticClass:"receiptDialog_head_item"},[a("label",[n._v("单据号")]),n._v(" "),a("el-input",{attrs:{placeholder:"请输入",size:n.btnsize,disabled:""},model:{value:n.formModel.settlementSn,callback:function(e){n.$set(n.formModel,"settlementSn",e)},expression:"formModel.settlementSn"}})],1),n._v(" "),a("div",{staticClass:"receiptDialog_head_item"},[a("label",[n._v("发生时间")]),n._v(" "),a("el-date-picker",{attrs:{size:n.btnsize,"value-format":"yyyy-MM-dd HH:mm:ss",type:"date"},model:{value:n.formModel.settlementTime,callback:function(e){n.$set(n.formModel,"settlementTime",e)},expression:"formModel.settlementTime"}})],1),n._v(" "),a("div",{staticClass:"receiptDialog_head_item"},[a("label",[n._v("经办人")]),n._v(" "),a("querySelect",{attrs:{size:n.btnsize,valuekey:"name",show:"select",search:"name",label:"name"},model:{value:n.formModel.settlementBy,callback:function(e){n.$set(n.formModel,"settlementBy",e)},expression:"formModel.settlementBy"}})],1)]),n._v(" "),a("div",{staticClass:"receiptDialog_table"},[a("el-table",{staticStyle:{width:"100%",height:"100%"},attrs:{data:n.formModel.detailDtoList2,height:"100%",stripe:"","show-summary":"","summary-method":n.getSum}},[a("el-table-column",{attrs:{prop:"date",label:"序号",type:"index",width:"70"}}),n._v(" "),a("el-table-column",{attrs:{prop:"dataName",label:"费用项"}}),n._v(" "),a("el-table-column",[a("el-table-column",{attrs:{prop:"tenMillion",label:"千",width:"40"}}),n._v(" "),a("el-table-column",{attrs:{prop:"million",label:"百",width:"40"}}),n._v(" "),a("el-table-column",{attrs:{prop:"oneHundrenThousand",label:"十",width:"40"}}),n._v(" "),a("el-table-column",{attrs:{prop:"tenThousand",label:"万",width:"40"}}),n._v(" "),a("el-table-column",{attrs:{prop:"thousand",label:"千",width:"40"}}),n._v(" "),a("el-table-column",{attrs:{prop:"hundren",label:"百",width:"40"}}),n._v(" "),a("el-table-column",{attrs:{prop:"ten",label:"十",width:"40"}}),n._v(" "),a("el-table-column",{attrs:{prop:"yuan",label:"元",width:"40"}}),n._v(" "),a("el-table-column",{attrs:{prop:"jiao",label:"角",width:"40"}}),n._v(" "),a("el-table-column",{attrs:{prop:"fen",label:"分",width:"40"}})],1)],1)],1)]),n._v(" "),a("div",{staticClass:"receiptDialog_todo"},[a("el-button",{staticClass:"tableBtnAdd",attrs:{size:"mini"},on:{click:n.plusItem}}),n._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:n.formModel.szDtoList,border:"",height:"100%",stripe:""}},[a("el-table-column",{attrs:{fixed:"",width:"50"},scopedSlots:n._u([{key:"default",fn:function(t){return[a("el-button",{staticClass:"tableBtnMinus",attrs:{size:"mini"},on:{click:function(e){n.minusItem(t.row,t.$index)}}})]}}])}),n._v(" "),a("el-table-column",{attrs:{prop:"financialWay",label:"收支方式",width:"80"},scopedSlots:n._u([{key:"default",fn:function(t){return[a("el-autocomplete",{attrs:{"popper-class":"querySelectItem",size:n.btnsize,"fetch-suggestions":n.querySearch,placeholder:"支付方式"},on:{select:function(e){return n.sender(e,t.$index)}},scopedSlots:n._u([{key:"default",fn:function(e){var t=e.item;return n._l(n.BANK_INFO,function(e){return a("span",[n._v(n._s(t[e]))])})}}]),model:{value:t.row.financialWay,callback:function(e){n.$set(t.row,"financialWay",e)},expression:"props.row.financialWay"}})]}}])}),n._v(" "),a("el-table-column",{attrs:{prop:"bankName",label:"银行名称"},scopedSlots:n._u([{key:"default",fn:function(t){return[a("el-input",{attrs:{size:n.btnsize,maxlength:n.maxlength},model:{value:t.row.bankName,callback:function(e){n.$set(t.row,"bankName",e)},expression:"props.row.bankName"}})]}}])}),n._v(" "),a("el-table-column",{attrs:{prop:"bankAccount",label:"银行卡号",width:"200"},scopedSlots:n._u([{key:"default",fn:function(t){return[a("el-input",{directives:[{name:"numberOnly",rawName:"v-numberOnly"}],attrs:{size:n.btnsize,maxlength:n.maxlength},model:{value:t.row.bankAccount,callback:function(e){n.$set(t.row,"bankAccount",e)},expression:"props.row.bankAccount"}})]}}])}),n._v(" "),a("el-table-column",{attrs:{prop:"bankAccountName",label:"开户人",width:"80"},scopedSlots:n._u([{key:"default",fn:function(t){return[a("el-input",{attrs:{size:n.btnsize,maxlength:n.maxlength},model:{value:t.row.bankAccountName,callback:function(e){n.$set(t.row,"bankAccountName",e)},expression:"props.row.bankAccountName"}})]}}])}),n._v(" "),a("el-table-column",{attrs:{prop:"chequeNumber",label:"支票号码"},scopedSlots:n._u([{key:"default",fn:function(t){return[a("el-input",{directives:[{name:"numberOnly",rawName:"v-numberOnly"}],attrs:{size:n.btnsize,maxlength:n.maxlength},model:{value:t.row.chequeNumber,callback:function(e){n.$set(t.row,"chequeNumber",e)},expression:"props.row.chequeNumber"}})]}}])}),n._v(" "),a("el-table-column",{attrs:{prop:"receivableNumber",label:"汇款号码"},scopedSlots:n._u([{key:"default",fn:function(t){return[a("el-input",{directives:[{name:"numberOnly",rawName:"v-numberOnly"}],attrs:{size:n.btnsize,maxlength:n.maxlength},model:{value:t.row.receivableNumber,callback:function(e){n.$set(t.row,"receivableNumber",e)},expression:"props.row.receivableNumber"}})]}}])}),n._v(" "),a("el-table-column",{attrs:{prop:"wechatAccount",label:"微信号"},scopedSlots:n._u([{key:"default",fn:function(t){return[a("el-input",{attrs:{size:n.btnsize,maxlength:n.maxlength},model:{value:t.row.wechatAccount,callback:function(e){n.$set(t.row,"wechatAccount",e)},expression:"props.row.wechatAccount"}})]}}])}),n._v(" "),a("el-table-column",{attrs:{prop:"alipayAccount",label:"支付宝号"},scopedSlots:n._u([{key:"default",fn:function(t){return[a("el-input",{attrs:{size:n.btnsize,maxlength:n.maxlength},model:{value:t.row.alipayAccount,callback:function(e){n.$set(t.row,"alipayAccount",e)},expression:"props.row.alipayAccount"}})]}}])}),n._v(" "),a("el-table-column",{attrs:{prop:"agent",label:"经办人",width:"80"},scopedSlots:n._u([{key:"default",fn:function(t){return[a("querySelect",{attrs:{size:n.btnsize,valuekey:"name",show:"select",search:"name",label:"name",maxlength:n.maxlength},model:{value:t.row.agent,callback:function(e){n.$set(t.row,"agent",e)},expression:"props.row.agent"}})]}}])})],1)],1),n._v(" "),a("div",{staticClass:"receiptDialog_remark"},[a("label",[n._v("备注")]),n._v(" "),a("el-input",{attrs:{placeholder:"最多可输入300个字符",size:n.btnsize,maxlength:300},model:{value:n.formModel.remark,callback:function(e){n.$set(n.formModel,"remark",e)},expression:"formModel.remark"}})],1)]),n._v(" "),a("div",{attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"primary",size:n.btnsize,icon:"el-icon-document"},on:{click:function(e){n.submitForm("formModel")}}},[n._v("保存")]),n._v(" "),a("el-button",{attrs:{type:"primary",size:n.btnsize,icon:"el-icon-printer"},on:{click:n.print}},[n._v("保存并打印")]),n._v(" "),a("el-button",{attrs:{type:"danger",size:n.btnsize,icon:"el-icon-circle-close-outline"},on:{click:n.closeMe}},[n._v("取 消")])],1)],1)},staticRenderFns:[]};t.a=a},JW1v:function(e,t,n){"use strict";t.g=function(e){return a.b.post("/api-finance/finance/tmsfinancefeepayable/v1/findListByFeeType/",e).then(function(e){return console.log("postFindListByFeeType22222222222222"),e.data||{list:[],totalCount:0}})},t.h=function(e){return a.b.post("/api-finance/finance/tmsfinancefeepayable/v1/findTransferList/",e).then(function(e){return e.data||{list:[],totalCount:0}})},t.e=function(e){return a.b.post("/api-finance/finance/tmsfinancefeepayable/v1/findAbnormalList/",e).then(function(e){return e.data||{list:[],totalCount:0}})},t.f=function(e){return a.b.post("/api-finance/finance/tmsfinancefeepayable/v1/findChangeList/",e).then(function(e){return e.data||{list:[],totalCount:0}})},t.d=function(e,t){return a.b.post("/api-finance/finance/tmsfinancefeepayable/v1/create/"+e,t).then(function(e){return e.data})},t.k=function(e){return a.b.post("/api-finance/finance/tmsfinancefeepayable/v1/payListBySummary/",e).then(function(e){return e.data||{list:[],totalCount:0}})},t.j=function(e){return a.b.post("/api-finance/finance/tmsfinancefeepayable/v1/payListByOne/",e).then(function(e){return e.data||{list:[],totalCount:0}})},t.a=function(e,t){return a.b.get("/api-finance/finance/tmsfinancecapitalflow/v1/getFeeInfo/?orgId="+e+"&paymentsType="+t)},t.i=function(e){return a.b.post("/api-finance/finance/tmsfinancefeepayable/v1/loadSettlement/",e).then(function(e){return e.data})},t.b=function(e){return a.b.post("/api-finance/finance/tmsfinancefeepayable/v1/loadVerification",e).then(function(e){return e.data})},t.c=function(e){return a.b.post("/api-finance/finance/tmsfinancefeepayable/v1/payListByHandlingFee",e).then(function(e){return e.data})};var a=n("Vo7i");n("0xDb")},i5L8:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n("pH7i"),i=n("6PPo"),o=n("VU/8")(a.a,i.a,null,null,null);t.default=o.exports},pH7i:function(e,t,n){"use strict";var a=n("woOf"),i=n.n(a),o=n("Dd8w"),s=n.n(o),l=(n("E4LH"),n("NYxO")),r=n("JW1v"),c=n("t5DY"),u=n("0xDb"),m=n("Q0Ca"),f=n("pAQG"),d=n("UQm2"),p=n("xAap");t.a={components:{querySelect:f.a},data:function(){return{maxlength:30,amount:0,amountMessage:"",formModel:{detailDtoList2:[],settlementBy:""},loading:!0,financialWalList:[],rules:{},btnsize:"mini",dialogTitle:"结 算 付 款 单",submitData:{},BANK_INFO:["financialWay","bankName","bankAccount","bankAccountName","chequeNumber","receivableNumber","wechatAccount","alipayAccount","agent"],paymentsType:1}},computed:s()({},Object(l.mapGetters)(["otherinfo"]),{isShow:{get:function(){return this.popVisible},set:function(){}},getRouteInfo:function(){return JSON.parse(this.$route.query.searchQuery)},settlementTypeId:function(){switch(this.$route.query.currentPage){case"batchArrivalAll":return 179}},dataName:function(){switch(this.$route.query.currentPage){case"waybillKickback":return"回扣";case"waybillTicket":return"单票提货费";case"waybillOther":return"其他费用支出";case"waybillTransfer":return"中转费";case"waybillAbnormal":return"异常理赔";case"waybillUnusual":return"异动费用核销"}},currentPage:function(){var e=this.$route.query.currentPage;return e.substr(7,e.length)}}),props:{popVisible:{type:Boolean,default:!1},info:{type:Array,default:[]}},watch:{popVisible:function(){this.popVisible?(this.isShow=!0,this.getFeeInfo()):this.isShow=!1},info:function(e){if(e)return this.info}},mounted:function(){var e=this;this.postTmsFfinancialwayList(),this.$nextTick(function(){e.init()})},methods:{valueNumber:function(e){return e.replace(/[^\d]/g,"")},print:function(){var e=i()(this.formModel);this.$set(e,"amountMessage",this.amountMessage),Object(d.f)(e),this.submitForm("formModel")},postTmsFfinancialwayList:function(){var t=this,e={currentPage:1,pageSize:100,vo:{financialWay:"",financialWayTypeId:"",orgId:this.otherinfo.orgid,status:""}};Object(p.b)(e).then(function(e){t.financialWalList=[],e.list.forEach(function(e){"启用"===e.statusStr&&t.financialWalList.push(e)})}).catch(function(e){t.loading=!1,t._handlerCatchMsg(e)})},querySearch:function(e,t){var n=this.financialWalList;t(e?n.filter(this.createFilter(e)):n)},createFilter:function(t){return function(e){return 0===e.financialWay.toLowerCase().indexOf(t.toLowerCase())}},init:function(){this.loading=!1},getFeeInfo:function(){var t=this,e=this.otherinfo.orgid;return Object(r.a)(e,this.paymentsType).then(function(e){t.formModel=e.data,t.formModel.detailDtoList2=[],t.formModel.settlementTime=Object(u.parseTime)(new Date),t.formModel.settlementBy=t.otherinfo.name,t.initDetailDtoList(),t.formModel.szDtoList.forEach(function(e){e.agent=t.otherinfo.name}),t.formModel.szDtoList.length<1&&t.plusItem()}).catch(function(e){t.loading=!1,t._handlerCatchMsg(e)})},initDetailDtoList:function(){var i=this;this.formModel.amount=0,this.formModel.detailDtoList=Object(u.objectMerge2)([],this.info);var t={};for(var e in this.formModel.detailDtoList.map(function(e){t[e.dataName]?t[e.dataName].amount+=e.amount:t[e.dataName]=e}),t)this.formModel.detailDtoList2.push(t[e]);t={},this.formModel.detailDtoList2.forEach(function(e,t){i.formModel.amount+=e.amount;var n=Number(e.amount).toFixed(2).toString().split("").reverse(),a=n.indexOf(".");-1!==a&&n.splice(a,1),e.fen=n[0],e.jiao=n[1],e.yuan=n[2],e.ten=n[3],e.hundren=n[4],e.thousand=n[5],e.tenThousand=n[6],e.oneHundrenThousand=n[7],e.million=n[8],e.tenMillion=n[9]}),this.amountMessage=Object(m.smalltoBIG)(this.formModel.amount),this.amount=this.formModel.amount.toFixed(2).toString().split("").reverse();var n=this.amount.indexOf(".");-1!==n&&this.amount.splice(n,1)},sender:function(e,t){this.$set(this.formModel.szDtoList,t,i()(this.formModel.szDtoList[t],e))},getSystemTime:function(){var t=this;Object(c.i)().then(function(e){t.formModel.settlementTime=new Date(e.trim())}).catch(function(e){t.loading=!1,t._handlerCatchMsg(e)})},closeMe:function(e){this.$emit("close"),"function"==typeof e&&e()},setData:function(){var e={},t=[],n=[];"中转费"===this.dataName?this.$set(e,"orgId",this.getRouteInfo.vo.transferOrgid):"异常理赔"===this.dataName?this.$set(e,"orgId",this.getRouteInfo.vo.orgid):this.$set(e,"orgId",this.getRouteInfo.vo.shipFromOrgid),this.$set(e,"settlementSn",this.formModel.settlementSn),this.$set(e,"settlementBy",this.formModel.settlementBy),this.$set(e,"settlementTime",this.formModel.settlementTime),this.$set(e,"remark",this.formModel.remark),this.$set(e,"detailDtoList",this.formModel.detailDtoList),this.$set(e,"szDtoList",this.formModel.szDtoList),t=i()([],this.formModel.szDtoList),n=i()([],this.info),this.$set(this.submitData,"capitalFlow",e),this.$set(this.submitData,"financialWayLogs",t),this.$set(this.submitData,"shipPayableFeeDtos",n),e={},t=[],n=[]},submitForm:function(e){var n=this;this.$refs[e].validate(function(e){if(e){n.setData(),console.log("submitData",n.submitData);var t="";t="中转费"===n.dataName?n.getRouteInfo.vo.transferOrgid:"异常理赔"===n.dataName?n.getRouteInfo.vo.orgid:n.getRouteInfo.vo.shipFromOrgid,Object(r.d)(t,n.submitData).then(function(e){n.$message({type:"success",message:"保存成功"}),n.closeMe();var t=n.currentPage.substring(0,1).toLowerCase()+n.currentPage.substring(1);n.$router.push({path:"./accountsPayable/waybill/"+t})}).catch(function(e){n._handlerCatchMsg(e)})}})},minusItem:function(e,t){var n=this.formModel.szDtoList.indexOf(e);-1!==n&&this.formModel.szDtoList.splice(n,1)},plusItem:function(){var e={agent:this.otherinfo.name,alipayAccount:"",bankAccount:"",bankAccountName:"",bankName:"",chequeNumber:"",financialWay:"",flowId:"",receivableNumber:"",rnum:"",wechatAccount:""};this.formModel.szDtoList.push(e)},getSum:function(e){var o=this,t=e.columns,s=e.data,l=[];return this.$nextTick(function(){}),t.forEach(function(t,e){if(0!==e)if(1!==e){for(var n=-2,a=12;2<a;a--)if(n++,e===a)return void(l[e]=o.amount[n]);var i=s.map(function(e){return Number(e[t.property])});i.every(function(e){return isNaN(e)})?l[e]="":(l[e]=i.reduce(function(e,t){var n=Number(t);return isNaN(n)?e:e+t},0),l[e]+="")}else l[e]=o.amountMessage;else l[e]="合计"}),l}}}}});