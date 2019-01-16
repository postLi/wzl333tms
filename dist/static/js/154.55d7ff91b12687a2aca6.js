webpackJsonp([154],{"+Khr":function(e,t,i){"use strict";var n={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-form",{ref:"searchForm",staticClass:"staff_searchinfo clearfix",attrs:{inline:!0,size:t.btnsize,"label-position":"right",rules:t.rules,model:t.searchForm,"label-width":"70px"}},[i("div",{staticClass:"staff_searchinfo--input"},[i("el-form-item",{attrs:{label:"核销时间"}},[i("el-date-picker",{attrs:{"default-value":t.defaultTime,type:"daterange",align:"right","value-format":"yyyy-MM-dd HH:mm:ss","start-placeholder":"开始日期","picker-options":t.pickerOptions,"end-placeholder":"结束日期"},on:{change:t.changeVal},model:{value:t.searchTime,callback:function(e){t.searchTime=e},expression:"searchTime"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"核销网点",prop:"orgId"}},[i("SelectTree",{attrs:{orgid:t.otherinfo.orgid},on:{change:t.changeVal},model:{value:t.searchForm.orgId,callback:function(e){t.$set(t.searchForm,"orgId",e)},expression:"searchForm.orgId"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"费用类型",prop:"feeId"}},[i("el-select",{on:{change:t.changeVal},model:{value:t.searchForm.feeId,callback:function(e){t.$set(t.searchForm,"feeId",e)},expression:"searchForm.feeId"}},[i("el-option",{attrs:{label:"全部",value:""}}),t._v(" "),t._l(t.feeIds,function(e){return i("el-option",{key:e.id,attrs:{label:e.feeType,value:e.id}})})],2)],1),t._v(" "),i("searchAll",{attrs:{searchObj:t.searchObjs},on:{dataObj:t.getDataObj}})],1),t._v(" "),i("el-form-item",{staticClass:"staff_searchinfo--btn"},[i("el-button",{attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v("查询")]),t._v(" "),i("el-button",{attrs:{type:"info",plain:""},on:{click:function(e){t.clearForm("searchForm")}}},[t._v("清空")])],1)],1)},staticRenderFns:[]};t.a=n},"/FGV":function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=i("Bgjj"),a=i("+Khr"),r=i("VU/8")(n.a,a.a,null,null,null);t.default=r.exports},"8UOW":function(e,t,i){"use strict";var n=i("us2a"),a=i("fyBF");var r=function(e){i("Qhr/")},s=i("VU/8")(n.a,a.a,r,null,null);t.a=s.exports},Bgjj:function(e,t,i){"use strict";var n=i("woOf"),a=i.n(n),r=i("E4LH"),s=i("o9X6"),o=i("pAQG"),c=i("0xDb"),l=i("9UCZ"),u=i("QS/K"),d=i("8UOW");t.a={components:{SelectTree:s.a,querySelect:o.a,SelectType:l.a,searchAll:d.a},props:{btnsize:{type:String,default:"mini"},orgid:{type:[Number,String]}},data:function(){return{searchObjs:{},searchForm:{orgId:"",settlementId:"",feeId:""},feeIds:[],rules:{shipSn:[{validator:function(e,t,i){var n=r.a.ONLY_NUMBER;""!==t&&null!==t&&t&&void 0!==t?n.test(t)?i():i(new Error("请输入最多15位数字")):i()},tigger:"blur"}]},searchTime:[Object(c.parseTime)(new Date-5184e6),Object(c.parseTime)(new Date)],defaultTime:[+new Date-5184e6,+new Date],pickerOptions:{shortcuts:c.pickerOptions2},settlementId:""}},watch:{orgid:function(e){this.searchForm.orgId=e},searchTime:function(e){e&&(this.$set(this.searchObjs,"startTime",Object(c.parseTime)(this.searchTime[0],"{y}-{m}-{d} ")+"00:00:00"),this.$set(this.searchObjs,"endTime",Object(c.parseTime)(this.searchTime[1],"{y}-{m}-{d} ")+"23:59:59"))},searchForm:{handler:function(e,t){this.searchObjs=a()({},e),this.searchTime&&this.searchTime[0]&&(this.$set(this.searchObjs,"startTime",Object(c.parseTime)(this.searchTime[0],"{y}-{m}-{d} ")+"00:00:00"),this.$set(this.searchObjs,"endTime",Object(c.parseTime)(this.searchTime[1],"{y}-{m}-{d} ")+"23:59:59"))},deep:!0}},mounted:function(){this.searchForm.orgId=this.orgid,this.getFeeTypeDict(),this.onSubmit()},methods:{getDataObj:function(e){this.searchTime=[e.startTime,e.endTime],this.searchForm=a()({},e),this.$emit("change",e)},getFeeTypeDict:function(){var t=this;this.settlementId=Number(this.$route.query.settlementId),Object(u.b)(this.settlementId).then(function(e){t.feeIds=e})},selectFeeType:function(e){console.log(e)},onSubmit:function(){var e=a()({},this.searchForm);this.searchTime&&(this.$set(e,"startTime",Object(c.parseTime)(this.searchTime[0],"{y}-{m}-{d} ")+"00:00:00"),this.$set(e,"endTime",Object(c.parseTime)(this.searchTime[1],"{y}-{m}-{d} ")+"23:59:59")),this.$emit("change",e)},changeVal:function(e){this.onSubmit()},clearForm:function(e){var t=this;this.$nextTick(function(){a()(t.$data,t.$options.data()),t.searchForm.orgId=t.orgid,t.searchForm.settlementId=t.$const.SETTLEMENT_ID[0].value,t.$refs[e].resetFields()})}}}},"QS/K":function(e,t,i){"use strict";t.i=function(e){return n.b.post("/api-finance/finance/tmsfinancecapitalflow/v1/list/",e).then(function(e){return e.data})},t.a=function(e,t){return n.b.get("/api-finance/finance/tmsfinancecapitalflow/v1/getFeeInfo?orgId="+e+"&paymentsType="+t).then(function(e){return e.data})},t.c=function(e){return n.b.post("/api-finance/finance/tmsfinancecapitalflow/v1/getOrderShipList/",{orgId:e.orgId,paymentsType:e.paymentsType,incomePayType:e.incomePayType,settlementId:e.settlementId,startTime:e.startTime,endTime:e.endTime,autoTotalAmount:e.autoTotalAmount,shipSenderName:e.shipSenderName,feeId:e.feeId,truckIdNumber:e.truckIdNumber}).then(function(e){return e.data})},t.g=function(e){return n.b.post("/api-finance/finance/tmsfinancecapitalflow/v1/cancelSettlement/",{flowId:e.flowId,detailFlowId:e.detailFlowId})},t.f=function(e){return n.b.post("/api-finance/finance/tmsfinancecapitalflow/v1/addIncome/",e).then(function(e){return e.data})},t.h=function(e){return n.b.post("/api-finance/finance/tmsfinancecapitalflowdetail/v1/list/",e).then(function(e){return e.data})},t.e=function(e,t){return n.b.get("/api-finance/finance/tmsfinancecapitalflow/v1/getSettlementInfo?flowId="+e+"&settlementId="+t)},t.b=function(e){return n.b.post("/api-finance/finance/tmsfinancefeetype/v1/getFeeTypeDict",{paymentsType:e.paymentsType,fiOrderType:e.fiOrderType}).then(function(e){return e.data})},t.d=function(e){return n.b.post("/api-finance/finance/tmsfinancefinancialway/v1/getOrgFirstFinancialWay/",{financialWay:e.financialWay,orgId:e.orgId}).then(function(e){return e.data})};var n=i("Vo7i");i("0xDb")},"Qhr/":function(e,t){},SjYS:function(e,t,i){"use strict";var n=i("seR9"),a=i("msh6");var r=function(e){i("nl9Y")},s=i("VU/8")(n.a,a.a,r,null,null);t.a=s.exports},fyBF:function(e,t,i){"use strict";var n={render:function(){var i=this,e=i.$createElement,n=i._self._c||e;return i.hasCode?n("div",{staticClass:"searchAll_lyy"},[n("el-form-item",{staticClass:"zdycx",attrs:{label:"自定义查询"}},[n("el-select",{attrs:{filterable:"",placeholder:"请选择","filter-method":i.querySearchAsync,"popper-class":"zdycx-pop",loading:i.loading},on:{change:i.handleSelect,focus:i.initdata},model:{value:i.datalist,callback:function(e){i.datalist=e},expression:"datalist"}},i._l(i.options4,function(t,e){return n("el-option",{key:e,attrs:{label:t.queryKey,value:t.id}},[i._v("\r\n        "+i._s(t.queryKey)+" "),n("i",{staticClass:"el-icon-circle-close-outline",on:{click:function(e){e.stopPropagation(),e.preventDefault(),i.deleteItem(t.id)}}})])})),i._v(" "),n("el-button",{attrs:{plain:""},on:{click:i.Custom}},[i._v("保存自定义")])],1),i._v(" "),n("addSave",{attrs:{code:i.hasCode,searchObj:i.searchObj,popVisible:i.popVisible},on:{close:i.closeAddDot,success:i.fetchAllloadAll}})],1):i._e()},staticRenderFns:[]};t.a=n},msh6:function(e,t,i){"use strict";var n={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-dialog",{staticClass:"wzl_settleLogSave",attrs:{title:t.popTitle,visible:t.isShow,"close-on-click-modal":!1,"before-close":t.closeMe},on:{close:t.closeMe,"update:visible":function(e){t.isShow=e}}},[i("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:t.form,rules:t.rules,"label-width":t.formLabelWidth,inline:!0,"label-position":"right",size:"mini"}},[i("el-form-item",{attrs:{label:"名称：",prop:"queryKey"}},[i("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.form.queryKey,expression:"form.queryKey",modifiers:{trim:!0}}],attrs:{maxlength:20,placeholder:"请定义名称"},domProps:{value:t.form.queryKey},on:{input:function(e){e.target.composing||t.$set(t.form,"queryKey",e.target.value.trim())},blur:function(e){t.$forceUpdate()}}})])],1),t._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{type:"primary",disabled:0===t.form.queryKey.length},on:{click:function(e){t.submitForm("ruleForm")}}},[t._v("确 定")]),t._v(" "),i("el-button",{on:{click:t.closeMe}},[t._v("取 消")])],1)],1)},staticRenderFns:[]};t.a=n},nl9Y:function(e,t){},seR9:function(e,t,i){"use strict";var n=i("mvHQ"),a=i.n(n),r=i("t5DY"),s=i("0xDb");t.a={computed:{isShow:{get:function(){return this.popVisible},set:function(){}}},components:{},props:{popVisible:{type:Boolean,default:!1},dotInfo:[Object,Array],searchQuery:[Object,Array],isDepMain:{type:Boolean,default:!1},createrId:[Number,String],isModify:{type:Boolean,default:!1},isAccept:{type:Boolean,default:!1},proptitle:String,searchObj:{type:[Array,Object],default:function(){}},code:{type:String,default:""}},data:function(){return{form:{userId:"",orgId:"",menuCode:"",queryKey:"",queryContent:""},searchCreatTime:+new Date,pickOption2:"",formLabelWidth:"75px",tooltip:!1,rules:{},queryKey:"",checked1:!0,popTitle:"自定义标签",loading:!1,type:""}},mounted:function(){},watch:{orgid:function(e){this.form.orgid=e},popVisible:function(e){e&&(this.form.userId=this.otherinfo.userId,this.form.orgId=this.otherinfo.orgid,this.form.menuCode=this.code||this.$route.meta.code)}},methods:{reset:function(){this.$refs.ruleForm.resetFields()},closeMe:function(e){this.$emit("close"),this.reset(),"function"==typeof e&&e()},submitForm:function(e){var i=this;this.loading||this.$refs[e].validate(function(e){if(!e)return!1;i.loading=!0,i.form.queryContent=a()(i.searchObj);var t=Object(s.objectMerge2)({},i.form);console.log("addSave_data",t),Object(r.q)(t).then(function(e){i.loading=!1,i.$message({message:"保存成功~",type:"success"}),i.closeMe(),i.$emit("success")}).catch(function(e){i.loading=!1,i.$message.warning(e.text)})})}}}},us2a:function(e,t,i){"use strict";var n=i("t5DY"),a=i("SjYS");t.a={components:{addSave:a.a},props:{searchObj:{type:[Object,Array]},value:[String,Number],code:{type:String,default:""}},data:function(){return{isModify:!1,popVisible:!1,setupTableVisible:!1,dataset:[],datalist:"",timeout:null,loading:!1,options4:[],querySearch:{currentPage:1,pageSize:10,vo:{orgId:"",userId:"",menuCode:""}}}},computed:{hasCode:function(){return this.code||this.$route.meta.code||""}},watch:{value:function(e){console.log("nnn:",e),""===e&&(this.datalist="")},searchObj:{handler:function(e,t){this.$nextTick(function(){console.log("searchAll_cval",e,t)})},deep:!0}},mounted:function(){},methods:{initdata:function(){var t=this;this.inited||(this.inited=!0,this.loading=!0,this.fetchAllloadAll().then(function(e){t.loading=!1}))},deleteItem:function(e){var t=this;Object(n.a)(e).then(function(e){t.fetchAllloadAll()}).catch(function(e){t._handlerCatchMsg(e)})},Custom:function(){this.isModify=!0,this.popVisible=!0},closeAddDot:function(){this.popVisible=!1},fetchAllloadAll:function(){var t=this;return this.querySearch.vo.orgId=this.otherinfo.orgid,this.querySearch.vo.userId=this.otherinfo.userId,this.querySearch.vo.menuCode=this.code||this.$route.meta.code,Object(n.p)(this.querySearch).then(function(e){t.dataset=e.list,t.options4=e.list})},querySearchAsync:function(e,t){var i=this.dataset,n=e?i.filter(this.createStateFilter(e)):i;t(this.options4=n)},createStateFilter:function(t){return function(e){return 0===e.queryKey.toLowerCase().indexOf(t.toLowerCase())}},handleSelect:function(t){var e=this.options4.filter(function(e){return e.id===t});if(e.length){var i=e[0].queryContent,n=JSON.parse(i);this.$emit("change",JSON.parse(i.replace(/'/g,'"'))),this.$emit("dataObj",n)}}}}}});