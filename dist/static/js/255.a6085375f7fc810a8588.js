webpackJsonp([255],{"7nIZ":function(e,t,n){"use strict";t.i=function(e){return i.b.post("/api-finance/finance/tmsfinancebillrecord/v1.3/getBillRecordList/",e).then(function(e){return e.data})},t.h=function(e){return i.b.post("/api-finance/finance/tmsfinancebillrecorddetail/v1.3/getBillRecordDetailList/",e).then(function(e){return e.data})},t.j=function(e){return i.b.post("/api-finance/finance/tmsfinancebillrecord/v1.3/getVerificationBaseInfo/",e).then(function(e){return e.data})},t.g=function(e){return i.b.post("/api-finance/finance/tmsfinancebillrecord/v1.3/addIncome/",e).then(function(e){return e.data})},t.a=function(e){return i.b.post("/api-finance/finance/tmsfinancebillrecord/v1.3/cancelVerification/",e).then(function(e){return e.data})},t.f=function(e){return i.b.post("/api-finance/finance/tmsfinanceverification/v1.3/getVeryficationList/",e).then(function(e){return e.data})},t.b=function(e){return i.b.post("/api-finance//finance/tmsfinancebillrecord/v1.3/delBillRecord/",e).then(function(e){return e.data})},t.e=function(e){return i.b.post("/api-finance/finance/tmsfinancebillrecord/v1.3/getOrderList/",e).then(function(e){return e.data})},t.d=function(e){return i.b.post("/api-finance/finance/tmsfinancesubjects/v1.3/getFinanceSubjects/",e).then(function(e){return e.data})},t.c=function(e){return i.b.post("/api-finance/finance/tmsfinancebillrecord/v1.3/getBillRecordInfo",e).then(function(e){return e.data})};var i=n("Vo7i")},"QS/K":function(e,t,n){"use strict";t.i=function(e){return i.b.post("/api-finance/finance/tmsfinancecapitalflow/v1/list/",e).then(function(e){return e.data})},t.a=function(e,t){return i.b.get("/api-finance/finance/tmsfinancecapitalflow/v1/getFeeInfo?orgId="+e+"&paymentsType="+t).then(function(e){return e.data})},t.c=function(e){return i.b.post("/api-finance/finance/tmsfinancecapitalflow/v1/getOrderShipList/",{orgId:e.orgId,paymentsType:e.paymentsType,incomePayType:e.incomePayType,settlementId:e.settlementId,startTime:e.startTime,endTime:e.endTime,autoTotalAmount:e.autoTotalAmount,shipSenderName:e.shipSenderName,feeId:e.feeId,truckIdNumber:e.truckIdNumber}).then(function(e){return e.data})},t.g=function(e){return i.b.post("/api-finance/finance/tmsfinancecapitalflow/v1/cancelSettlement/",{flowId:e.flowId,detailFlowId:e.detailFlowId})},t.f=function(e){return i.b.post("/api-finance/finance/tmsfinancecapitalflow/v1/addIncome/",e).then(function(e){return e.data})},t.h=function(e){return i.b.post("/api-finance/finance/tmsfinancecapitalflowdetail/v1/list/",e).then(function(e){return e.data})},t.e=function(e,t){return i.b.get("/api-finance/finance/tmsfinancecapitalflow/v1/getSettlementInfo?flowId="+e+"&settlementId="+t)},t.b=function(e){return i.b.post("/api-finance/finance/tmsfinancefeetype/v1/getFeeTypeDict",{paymentsType:e.paymentsType,fiOrderType:e.fiOrderType}).then(function(e){return e.data})},t.d=function(e){return i.b.post("/api-finance/finance/tmsfinancefinancialway/v1/getOrgFirstFinancialWay/",{financialWay:e.financialWay,orgId:e.orgId}).then(function(e){return e.data})};var i=n("Vo7i");n("0xDb")},TsW9:function(e,t,n){"use strict";t.a=function(e,t){return i.b.get("/api-order/order/load/v1/getBatchNo/",{params:{orgId:e,loadTypeId:t}})},t.i=function(e){return i.b.post("/api-order/order/load/v1/",e)},t.j=function(e){return i.b.put("/api-order/order/load/v1/",e)},t.d=function(e){return i.b.get("/api-order/order/load/v1/selectAddLoadRepertoryList/",{params:{orgId:e}})},t.g=function(e,t){return i.b.get("/api-order/order/load/v1/selectUpdateLoadRepertoryList/?orgId="+e+"&loadId="+t)},t.h=function(e,t){return i.b.get("/api-order/order/load/v1/selectUpdateLoadDetailList/?orgId="+e+"&loadId="+t)},t.e=function(e){return i.b.get("/api-order/order/load/v1/selectLoadDetailList/",{params:{loadId:e}})},t.f=function(){return i.b.get("/api-system/system/trunk/v1/findCarAndDriver/").then(function(e){return e})},t.b=function(){return i.b.get("/api-system/system/trunk/v1/findDriverAndCar/").then(function(e){return e})},t.c=function(e){return i.b.post("/api-order/order/tmsordertrailterminal/v1/list",e).then(function(e){return e.data})};var i=n("Vo7i")},UxNU:function(e,t,n){"use strict";var i=n("woOf"),r=n.n(i),o=n("0xDb"),a=n("pAQG"),c=n("QS/K"),s=n("7nIZ"),l=n("Vi15"),u=n("TsW9");t.a={components:{querySelect:a.a},props:{popVisible:{type:Boolean,default:!1},info:{type:String,default:""},title:{type:String,default:"智能核销"},setSettlementId:{type:[Number,String]},fiOrderType:{type:[Number,String],default:1}},data:function(){return{formModel:{autoTotalAmount:0,paymentsType:1,feeId:""},senderOptions:[],truckOptions:[],settlementId:179,incomePayType:"PAYABLE",rules:{},searchTime:[Object(o.parseTime)(new Date-2592e6),Object(o.parseTime)(new Date)],pickerOptions2:{shortcuts:o.pickerOptions2},feeIds:[],feeIdsBatch:[{id:179,feeType:"干线"},{id:180,feeType:"短驳"},{id:181,feeType:"送货"}],paymentsType:1}},computed:{isShow:{get:function(){if(this.popVisible){switch(this.formModel=this.$options.data().formModel,this.title){case"批次":this.getAllTrunk(),this.settlementId=179,this.formModel.settlementId=this.setSettlementId,this.$set(this.formModel,"truckIdNumber","");break;case"运单":this.getAllCustomer(),this.settlementId=178,this.fiOrderType=0,this.formModel.settlementId="",this.$set(this.formModel,"shipSenderName","")}this.init()}return this.popVisible},set:function(){}}},watch:{title:{handler:function(e,t){},deep:!0},setSettlementId:{handler:function(e,t){179===this.settlementId&&(this.formModel.settlementId=e)},deep:!0},fiOrderType:{handler:function(e,t){},deep:!0}},methods:{init:function(){this.getFeeTypeDict()},getAllCustomer:function(){var t=this,e={currentPage:1,pageSize:200,vo:{orgid:this.otherinfo.orgid,customerType:1,customerMobile:"",customerName:""}};Object(l.b)(e).then(function(e){t.senderOptions=e.list}).catch(function(e){t._handlerCatchMsg(e)})},getAllTrunk:function(){var t=this;Object(u.f)().then(function(e){t.truckOptions=e.data}).catch(function(e){t._handlerCatchMsg(e)})},querySearchTruck:function(e,t){var n=this.truckOptions;t(e?n.filter(this.createFilter(new RegExp(e,"gi"),"truckIdNumber")):n)},querySearchSender:function(e,t){var n=this.senderOptions;t(e?n.filter(this.createFilter(new RegExp(e,"gi"),"truckIdNumber")):n)},createFilter:function(t,n){return function(e){if(e[n])return t.test(e[n])}},changeAmount:function(e){this.$set(this.formModel,"autoTotalAmount",e)},handleSelectTruck:function(e){this.formModel.truckIdNumber=e.truckIdNumber},handleSelectSender:function(e){this.formModel.shipSenderName=e.customerName},getFeeTypeDict:function(){var t=this;return Object(c.b)({paymentsType:this.paymentsType,fiOrderType:this.fiOrderType}).then(function(e){t.feeIds=e}).catch(function(e){t.loading=!1,t._handlerCatchMsg(e)})},onSubmit:function(e){var n=this;this.$refs[e].validate(function(e){if(e){n.$set(n.formModel,"startTime",Object(o.parseTime)(n.searchTime[0],"{y}-{m}-{d} ")+"00:00:00"),n.$set(n.formModel,"endTime",Object(o.parseTime)(n.searchTime[1],"{y}-{m}-{d} ")+"23:59:59"),n.$set(n.formModel,"orgId",n.$route.query.orgId),n.$set(n.formModel,"fiOrderType",n.fiOrderType),178===n.settlementId&&n.$set(n.formModel,"settlementId",n.settlementId),n.formModel.autoTotalAmount=Number(n.formModel.autoTotalAmount);var t=r()({},n.formModel);Object(s.e)(t).then(function(e){n.$emit("success",{info:e,count:t.autoTotalAmount,type:n.settlementId}),n.closeMe(),n.$message({type:"success",message:"智能核销搜索运单操作成功"})}).catch(function(e){n._handlerCatchMsg(e)})}})},selectFeeIdBatch:function(e){this.$emit("change",e)},closeMe:function(e){this.$emit("close"),"function"==typeof e&&e()}}}},pymS:function(e,t,n){"use strict";var i={render:function(){var n=this,e=n.$createElement,i=n._self._c||e;return i("el-dialog",{staticClass:"tms_dialog tms_dialog_count",attrs:{title:"智能核销-"+n.title,visible:n.isShow,"close-on-click-modal":!1,"before-close":n.closeMe,width:"600px"},on:{"update:visible":function(e){n.isShow=e}}},[i("el-form",{ref:"formModel",attrs:{inline:!0,size:"mini","label-position":"right",rules:n.rules,model:n.formModel,"label-width":"70px"}},[178===n.settlementId?i("el-form-item",{attrs:{label:"发货人",prop:"shipSenderName"}},[i("el-autocomplete",{attrs:{"popper-class":"my-autocomplete","fetch-suggestions":n.querySearchSender,placeholder:"发货人搜索",size:"mini","auto-complete":"off",maxlength:8},on:{select:n.handleSelectSender},scopedSlots:n._u([{key:"default",fn:function(e){var t=e.item;return[i("div",{staticClass:"name"},[n._v(n._s(t.customerName))])]}}]),model:{value:n.formModel.shipSenderName,callback:function(e){n.$set(n.formModel,"shipSenderName",e)},expression:"formModel.shipSenderName"}})],1):i("el-form-item",{attrs:{label:"车牌号",prop:"truckIdNumber"}},[i("el-autocomplete",{attrs:{"popper-class":"my-autocomplete","fetch-suggestions":n.querySearchTruck,placeholder:"车牌号码搜索",size:"mini","auto-complete":"off",maxlength:8},on:{select:n.handleSelectTruck},scopedSlots:n._u([{key:"default",fn:function(e){var t=e.item;return[i("div",{staticClass:"name"},[n._v(n._s(t.truckIdNumber))])]}}]),model:{value:n.formModel.truckIdNumber,callback:function(e){n.$set(n.formModel,"truckIdNumber",e)},expression:"formModel.truckIdNumber"}})],1),n._v(" "),i("el-form-item",{attrs:{label:"支出金额",prop:"autoTotalAmount"}},[i("input",{directives:[{name:"number-only",rawName:"v-number-only:point",arg:"point"}],ref:"autoTotalAmount",staticClass:"nativeinput",attrs:{type:"text",maxlength:30,placeholder:"只能输入阿拉伯数字"},domProps:{value:n.formModel.autoTotalAmount},on:{change:function(e){return n.changeAmount(e.target.value)}},nativeOn:{keyup:function(e){if(!("button"in e)&&n._k(e.keyCode,"enter",13,e.key,"Enter"))return null;n.onSubmit("formModel")}}})]),n._v(" "),i("el-form-item",{attrs:{label:"费用项"}},[178===n.settlementId?i("el-select",{model:{value:n.formModel.feeId,callback:function(e){n.$set(n.formModel,"feeId",e)},expression:"formModel.feeId"}},[i("el-option",{attrs:{label:"全部",value:""}}),n._v(" "),n._l(n.feeIds,function(e){return i("el-option",{key:e.id,attrs:{label:e.feeType,value:e.id}})})],2):i("el-select",{on:{change:n.selectFeeIdBatch},model:{value:n.formModel.settlementId,callback:function(e){n.$set(n.formModel,"settlementId",e)},expression:"formModel.settlementId"}},n._l(n.feeIdsBatch,function(e){return i("el-option",{key:e.id,attrs:{label:e.feeType,value:e.id}})}))],1),n._v(" "),i("el-form-item",{attrs:{label:"开单日期"}},[i("el-date-picker",{attrs:{type:"daterange","unlink-panels":"",align:"right","value-format":"yyyy-MM-dd HH:mm:ss","start-placeholder":"开始日期","picker-options":n.pickerOptions2,"end-placeholder":"结束日期"},model:{value:n.searchTime,callback:function(e){n.searchTime=e},expression:"searchTime"}})],1)],1),n._v(" "),i("p",[n._v("提示：智能核销可以按照发货人开单日期自动挑选运单核销，运用场景如:某某客户核销某个月运费一万块，可以筛选客户，收入金额10000块，系统将自动挑选运单核销。")]),n._v(" "),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{type:"primary"},on:{click:function(e){n.onSubmit("formModel")}}},[n._v("确 定")]),n._v(" "),i("el-button",{on:{click:n.closeMe}},[n._v("取 消")])],1)],1)},staticRenderFns:[]};t.a=i},wudX:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n("UxNU"),r=n("pymS"),o=n("VU/8")(i.a,r.a,null,null,null);t.default=o.exports}});