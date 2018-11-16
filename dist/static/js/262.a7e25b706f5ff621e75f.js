webpackJsonp([262],{"4dd8":function(e,t,n){"use strict";var o={render:function(){var n=this,e=n.$createElement,o=n._self._c||e;return o("el-dialog",{staticClass:"tms_dialog tms_dialog_count",attrs:{title:"智能结算",visible:n.isShow,"close-on-click-modal":!1,"before-close":n.closeMe,width:"600px"},on:{"update:visible":function(e){n.isShow=e}}},[o("el-form",{ref:"formModel",attrs:{inline:!0,size:"mini","label-position":"right",rules:n.rules,model:n.formModel,"label-width":"70px"}},[o("el-form-item",{attrs:{label:"发货人",prop:"shipSenderName"}},[o("el-autocomplete",{attrs:{"popper-class":"my-autocomplete","fetch-suggestions":n.querySearchSender,placeholder:"发货人搜索",size:"mini","auto-complete":"off",maxlength:8},on:{select:n.handleSelectSender},scopedSlots:n._u([{key:"default",fn:function(e){var t=e.item;return[o("div",{staticClass:"name"},[n._v(n._s(t.customerName))])]}}]),model:{value:n.formModel.shipSenderName,callback:function(e){n.$set(n.formModel,"shipSenderName",e)},expression:"formModel.shipSenderName"}})],1),n._v(" "),o("el-form-item",{attrs:{label:"收入金额",prop:"autoTotalAmount"}},[o("el-input",{directives:[{name:"numberOnly",rawName:"v-numberOnly:point",arg:"point"}],attrs:{placeholder:"只能输入阿拉伯数字"},nativeOn:{keyup:function(e){if(!("button"in e)&&n._k(e.keyCode,"enter",13,e.key,"Enter"))return null;n.onSubmit("formModel")}},model:{value:n.formModel.autoTotalAmount,callback:function(e){n.$set(n.formModel,"autoTotalAmount",e)},expression:"formModel.autoTotalAmount"}})],1),n._v(" "),o("el-form-item",{attrs:{label:"费用项",prop:"feeId"}},[o("el-select",{model:{value:n.formModel.feeId,callback:function(e){n.$set(n.formModel,"feeId",e)},expression:"formModel.feeId"}},[o("el-option",{attrs:{label:"全部",value:""}}),n._v(" "),n._l(n.feeIds,function(e){return o("el-option",{key:e.id,attrs:{label:e.feeType,value:e.id}})})],2)],1),n._v(" "),o("el-form-item",{attrs:{label:"开单日期"}},[o("el-date-picker",{attrs:{type:"daterange",align:"right","value-format":"yyyy-MM-dd HH:mm:ss","start-placeholder":"开始日期","picker-options":n.pickerOptions2,"end-placeholder":"结束日期"},model:{value:n.searchTime,callback:function(e){n.searchTime=e},expression:"searchTime"}})],1)],1),n._v(" "),o("p",[n._v("提示：智能结算可以按照发货人开单日期自动挑选运单结算，运用场景如:某某客户结算某个月运费一万块，可以筛选客户，收入金额10000块，系统将自动挑选运单结算。")]),n._v(" "),o("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{attrs:{type:"primary"},on:{click:function(e){n.onSubmit("formModel")}}},[n._v("确 定")]),n._v(" "),o("el-button",{on:{click:n.closeMe}},[n._v("取 消")])],1)],1)},staticRenderFns:[]};t.a=o},MVIQ:function(e,t,n){"use strict";var o=n("woOf"),i=n.n(o),a=n("0xDb"),r=n("pAQG"),c=n("QS/K"),l=n("Vi15");t.a={components:{querySelect:r.a},props:{popVisible:{type:Boolean,default:!1},info:{type:String,default:""}},data:function(){return{formModel:{autoTotalAmount:0,settlementId:178,feeId:""},rules:{},searchTime:[Object(a.parseTime)(new Date-2592e6),Object(a.parseTime)(new Date)],pickerOptions2:{shortcuts:a.pickerOptions2},feeIds:[],senderOptions:[]}},computed:{isShow:{get:function(){return this.popVisible&&(this.getAllCustomer(),this.formModel=this.$options.data().formModel,this.init()),this.popVisible},set:function(){}}},methods:{init:function(){this.getFeeTypeDict()},getAllCustomer:function(){var t=this,e={currentPage:1,pageSize:200,vo:{orgid:this.otherinfo.orgid,customerType:1,customerMobile:"",customerName:""}};Object(l.b)(e).then(function(e){t.senderOptions=e.list}).catch(function(e){t.loading=!1,t._handlerCatchMsg(e)})},getFeeTypeDict:function(){var t=this;this.settlementId=178,Object(c.b)(this.settlementId).then(function(e){t.feeIds=e}).catch(function(e){t.loading=!1,t._handlerCatchMsg(e)})},querySearchSender:function(e,t){var n=this.senderOptions;t(e?n.filter(this.createFilter(new RegExp(e,"gi"),"truckIdNumber")):n)},createFilter:function(t,n){return function(e){if(e[n])return t.test(e[n])}},handleSelectSender:function(e){this.formModel.shipSenderName=e.customerName},onSubmit:function(e){var n=this;this.$refs[e].validate(function(e){if(e){n.$set(n.formModel,"startTime",Object(a.parseTime)(n.searchTime[0],"{y}-{m}-{d} ")+"00:00:00"),n.$set(n.formModel,"endTime",Object(a.parseTime)(n.searchTime[1],"{y}-{m}-{d} ")+"23:59:59"),n.$set(n.formModel,"orgId",n.$route.query.orgId),n.$set(n.formModel,"incomePayType","RECEIVABLE"),n.$set(n.formModel,"paymentsType",0),n.formModel.autoTotalAmount=Number(n.formModel.autoTotalAmount);var t=i()({},n.formModel);Object(c.c)(t).then(function(e){n.$emit("success",{info:e,count:n.formModel.autoTotalAmount}),n.closeMe(),n.$message({type:"success",message:"智能结算搜索运单操作成功"})}).catch(function(e){n._handlerCatchMsg(e)})}})},closeMe:function(e){this.$emit("close"),"function"==typeof e&&e()}}}},"QS/K":function(e,t,n){"use strict";t.i=function(e){return o.b.post("/api-finance/finance/tmsfinancecapitalflow/v1/list/",e).then(function(e){return e.data}).catch(function(e){Object(i.handleErrorMsg)(e)})},t.a=function(e,t){return o.b.get("/api-finance/finance/tmsfinancecapitalflow/v1/getFeeInfo?orgId="+e+"&paymentsType="+t).then(function(e){return e.data})},t.c=function(e){return o.b.post("/api-finance/finance/tmsfinancecapitalflow/v1/getOrderShipList/",{orgId:e.orgId,paymentsType:e.paymentsType,incomePayType:e.incomePayType,settlementId:e.settlementId,startTime:e.startTime,endTime:e.endTime,autoTotalAmount:e.autoTotalAmount,shipSenderName:e.shipSenderName,feeId:e.feeId,truckIdNumber:e.truckIdNumber}).then(function(e){return e.data}).catch(function(e){Object(i.handleErrorMsg)(e)})},t.g=function(e){return o.b.post("/api-finance/finance/tmsfinancecapitalflow/v1/cancelSettlement/",{flowId:e.flowId,detailFlowId:e.detailFlowId})},t.f=function(e){return o.b.post("/api-finance/finance/tmsfinancecapitalflow/v1/addIncome/",e).then(function(e){return e.data}).catch(function(e){Object(i.handleErrorMsg)(e)})},t.h=function(e){return o.b.post("/api-finance/finance/tmsfinancecapitalflowdetail/v1/list/",e).then(function(e){return e.data}).catch(function(e){Object(i.handleErrorMsg)(e)})},t.e=function(e,t){return o.b.get("/api-finance/finance/tmsfinancecapitalflow/v1/getSettlementInfo?flowId="+e+"&settlementId="+t)},t.b=function(e){return o.b.post("/api-finance/finance/tmsfinancefeetype/v1/getFeeTypeDict/",{settlementId:e}).then(function(e){return e.data}).catch(function(e){Object(i.handleErrorMsg)(e)})},t.d=function(e){return o.b.post("/api-finance/finance/tmsfinancefinancialway/v1/getOrgFirstFinancialWay/",{financialWay:e.financialWay,orgId:e.orgId}).then(function(e){return e.data}).catch(function(e){Object(i.handleErrorMsg)(e)})};var o=n("Vo7i"),i=n("0xDb")},qa60:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n("MVIQ"),i=n("4dd8"),a=n("VU/8")(o.a,i.a,null,null,null);t.default=a.exports}});