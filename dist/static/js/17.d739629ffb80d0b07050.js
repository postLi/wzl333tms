webpackJsonp([17,47,231,294],{"/n+A":function(e,t,i){"use strict";var a={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"popRight-center",class:{showPopRight:e.isShow},style:{zIndex:e.zIndex}},[i("div",{staticClass:"popRight-header"},[e._t("title",[e._v(e._s(e.title))]),e._v(" "),i("i",{staticClass:"el-icon-close",attrs:{title:"关闭"},on:{click:e.close}})],2),e._v(" "),e.shouldRender?i("div",{staticClass:"popRight-content"},[e._t("content",[e._v("内容")])],2):e._e(),e._v(" "),i("div",{staticClass:"popRight-footer"},[e._t("footer",[e._v("底部")])],2)])},staticRenderFns:[]};t.a=a},"1hH/":function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=i("wtTA"),n=i("e+8D");var o=function(e){i("Axk9")},s=i("VU/8")(a.a,n.a,o,null,null);t.default=s.exports},"2toJ":function(e,t,i){"use strict";var a=i("mvHQ"),n=i.n(a),o=i("Dd8w"),s=i.n(o),r=i("3EPC"),l=i("o9X6"),c=i("9UCZ"),u=i("NYxO"),d=i("t5DY"),h=i("0xDb");t.a={computed:s()({},Object(u.mapGetters)(["otherinfo"]),{isShow:{get:function(){return this.popVisible},set:function(){}}}),components:{PopFrame:r.a,SelectTree:l.a,SelectType:c.a},props:{popVisible:{type:Boolean,default:!1},dotInfo:[Object,Array],searchForm:[Object,Array],isDepMain:{type:Boolean,default:!1},createrId:[Number,String],isModify:{type:Boolean,default:!1},isAccept:{type:Boolean,default:!1},searchObj:[Object,Array],proptitle:String},data:function(){return{form:{userId:"",orgId:"",menuCode:"",queryKey:"",queryContent:""},searchCreatTime:+new Date,pickOption2:"",formLabelWidth:"75px",tooltip:!1,rules:{},queryKey:"",checked1:!0,popTitle:"自定义标签",loading:!1,type:""}},mounted:function(){this.$nextTick(function(){})},watch:{dotInfo:function(e){this.isModify&&(this.form.queryContent=n()(this.searchObj),this.form.userId=this.otherinfo.userId,this.form.orgId=this.searchObj.orgId,this.form.menuCode=this.$route.meta.code,console.log(this.otherinfo.userId))},searchObj:{handler:function(e,t){e&&(console.log("cval",e),this.form.queryContent=n()(e),this.form.userId=this.otherinfo.userId,this.form.orgId=this.searchObj.orgId,this.form.menuCode=this.$route.meta.code,console.log(this.otherinfo.userId))},deep:!0},createrId:function(e){}},methods:{reset:function(){this.$refs.ruleForm.resetFields()},closeMe:function(e){this.$emit("close"),this.reset(),"function"==typeof e&&e()},submitForm:function(e){var i=this;this.$refs[e].validate(function(e){if(!e)return!1;i.loading=!0;var t=Object(h.objectMerge2)({},i.form);Object(d.q)(t).then(function(e){i.$message({message:"保存成功~",type:"success"}),i.closeMe(),i.$emit("success")}).catch(function(e){i.$message.warning(e.text),i.closeMe()})})}}}},"3EPC":function(e,t,i){"use strict";var a=i("qYK6"),n=i("/n+A");var o=function(e){i("f3wf")},s=i("VU/8")(a.a,n.a,o,null,null);t.a=s.exports},"8UOW":function(e,t,i){"use strict";var a=i("us2a"),n=i("fyBF");var o=function(e){i("Qhr/")},s=i("VU/8")(a.a,n.a,o,null,null);t.a=s.exports},"8upl":function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=i("ABkB"),n=i("LSMk"),o=i("VU/8")(a.a,n.a,null,null,null);t.default=o.exports},ABkB:function(e,t,i){"use strict";var a,n=i("bOdI"),o=i.n(n),s=i("woOf"),r=i.n(s),l=i("Dd8w"),c=i.n(l),u=i("0xDb"),d=i("1hH/"),h=i("1onU"),f=i("puNT"),m=i("QS/K"),p=i("NYxO"),b=i("oeKO"),v=i("UQm2");t.a={components:{SearchForm:d.default,Pager:h.a,TableSetup:f.a,Receipt:b.default},computed:c()({},Object(p.mapGetters)(["otherinfo"])),data:function(){return{btnsize:"mini",feeType:8,selectedList:[],selectListShipSns:[],tableReceiptInfo:[],searchQuery:{currentPage:1,pageSize:100,vo:{orgId:""}},tablekey:0,total:0,dataList:[],popVisibleDialog:!1,loading:!0,setupTableVisible:!1,tableColumn:[{label:"核销网点",prop:"orgName",width:"120",fixed:!1},{label:"核销单号",prop:"settlementSn",width:"140",fixed:!0},{label:"核销类型",prop:"settlementIdZh",width:"110",fixed:!0},{label:"核销人",prop:"settlementBy",width:"90",fixed:!1},{label:"金额",prop:"amount",width:"90",fixed:!1},{label:"核销时间",prop:"settlementTime",width:"160",slot:function(e){return""+Object(u.parseTime)(e.row.settlementTime,"{y}-{m}-{d} {h}:{i}:{s}")},fixed:!1},{label:"收支方式",prop:"financialWay",width:"90",fixed:!1},{label:"银行名称",prop:"bankName",width:"100",fixed:!1},{label:"银行卡号",prop:"bankAccount",width:"150",fixed:!1},{label:"开户人",prop:"bankAccountName",width:"90",fixed:!1},{label:"支票号码",prop:"chequeNumber",width:"150",fixed:!1},{label:"汇款号码",prop:"receivableNumber",width:"150",fixed:!1},{label:"微信号",prop:"wechatAccount",width:"120",fixed:!1},{label:"支付宝号",prop:"alipayAccount",width:"120",fixed:!1},{label:"备注",prop:"remark",width:"150",fixed:!1}]}},watch:{$route:function(e){e&&this.fetchList()}},methods:(a={getSearchParam:function(e){this.searchQuery.currentPage=this.$options.data().searchQuery.currentPage,this.searchQuery.pageSize=this.$options.data().searchQuery.pageSize,this.searchQuery.vo=r()({},e),this.fetchList()},handlePageChange:function(e){this.searchQuery.currentPage=e.pageNum,this.searchQuery.pageSize=e.pageSize,this.fetchList()},fetchList:function(){var t=this;return this.loading=!0,Object(m.i)(this.searchQuery).then(function(e){t.dataList=e.list,t.total=e.total,t.loading=!1}).catch(function(e){t.loading=!1,t._handlerCatchMsg(e)})},setTable:function(){},doAction:function(e){var t=this,i=!1;switch(1!==this.selectedList.length&&"income"!==e&&"expandtiure"!==e&&"export"!==e&&"print"!==e?(i=!1,this.$message({type:"warning",message:"请选择一条数据"})):i=!0,e){case"income":this.income();break;case"expandtiure":this.expandtiure();break;case"cancelCount":i&&this.$confirm("确定要取消【 "+this.selectedList[0].settlementSn+" 】吗？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.cancelCount()});break;case"showCount":i&&this.showCount();break;case"showDetail":i&&this.showDetail();break;case"export":Object(v.g)({data:this.dataList,columns:this.tableColumn,name:"资金流水-"+Object(u.parseTime)(new Date,"{y}{m}{d}{h}{i}{s}")});break;case"print":Object(v.d)({data:this.dataList,columns:this.tableColumn,name:"资金流水"})}},income:function(){this.$router.push({path:"./settleLogIncome",query:{orgId:this.searchQuery.vo.orgId}})},expandtiure:function(){this.$router.push({path:"./settleLogExpandtiure",query:{orgId:this.searchQuery.vo.orgId}})},cancelCount:function(){var t=this,e={};this.$set(e,"flowId",this.selectedList[0].flowId),Object(m.g)(e).then(function(e){t.$message({type:"success",message:"取消核销操作成功"}),t.fetchList()}).catch(function(e){t._handlerCatchMsg(e),t.fetchList()})},showCount:function(){this.tableReceiptInfo=r()([],this.selectedList),this.popVisibleDialog=!0,this.$refs.multipleTable.clearSelection()},closeDialog:function(){this.popVisibleDialog=!1},clickDetails:function(e){this.$refs.multipleTable.toggleRowSelection(e)},getSelection:function(e){var i=this;this.selectedList=e,this.selectListShipSns=[],e.forEach(function(e,t){i.selectListShipSns.push(e.shipSn)})},selectedItem:function(e){this.$refs.multipleTable.toggleRowSelection(e),this.showDetail()},showDetail:function(){0<this.selectedList.length&&this.$router.push({path:"./settleLogDetail",query:{flowId:this.selectedList[0].flowId,settlementId:this.selectedList[0].settlementId,orgId:this.searchQuery.vo.orgId}})}},o()(a,"setTable",function(){this.setupTableVisible=!0}),o()(a,"closeSetupTable",function(){this.setupTableVisible=!1}),o()(a,"setColumn",function(e){this.tableColumn=e,this.tablekey=Math.random()}),a)}},Axk9:function(e,t){},Clpx:function(e,t,i){"use strict";var a={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-dialog",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"receiptDialog",attrs:{title:t.dialogTitle,visible:t.isShow,"close-on-click-modal":!1,"before-close":t.closeMe},on:{"update:visible":function(e){t.isShow=e}}},[i("el-form",{ref:"formModel",attrs:{model:t.formModel,rules:t.rules}},[i("div",{staticClass:"receiptDialog_head"},[i("div",{staticClass:"receiptDialog_head_item"},[i("label",[t._v("单据号")]),t._v(" "),i("el-input",{attrs:{placeholder:"单据号",size:t.btnsize,disabled:t.isEdit},model:{value:t.formModel.settlementSn,callback:function(e){t.$set(t.formModel,"settlementSn",e)},expression:"formModel.settlementSn"}})],1),t._v(" "),i("div",{staticClass:"receiptDialog_head_item"},[i("label",[t._v("发生时间")]),t._v(" "),i("el-date-picker",{attrs:{size:t.btnsize,"value-format":"yyyy-MM-dd HH:mm:ss",type:"date",disabled:t.isEdit,placeholder:"发生时间"},model:{value:t.formModel.settlementTime,callback:function(e){t.$set(t.formModel,"settlementTime",e)},expression:"formModel.settlementTime"}})],1),t._v(" "),i("div",{staticClass:"receiptDialog_head_item"},[i("label",[t._v("经办人")]),t._v(" "),i("el-input",{attrs:{size:t.btnsize,placeholder:"经办人",disabled:t.isEdit},model:{value:t.formModel.settlementBy,callback:function(e){t.$set(t.formModel,"settlementBy",e)},expression:"formModel.settlementBy"}})],1)]),t._v(" "),i("div",{staticClass:"receiptDialog_table"},[i("el-table",{staticStyle:{width:"100%",height:"100%"},attrs:{data:t.formModel.flowFeeMidList,height:"100%",stripe:"","show-summary":"","summary-method":t.getSum}},[i("el-table-column",{attrs:{prop:"date",label:"序号",type:"index",width:"70"}}),t._v(" "),i("el-table-column",{attrs:{prop:"feeType",label:"费用项"}}),t._v(" "),i("el-table-column",[i("el-table-column",{attrs:{prop:"tenMillion",label:"千",width:"40"}}),t._v(" "),i("el-table-column",{attrs:{prop:"million",label:"百",width:"40"}}),t._v(" "),i("el-table-column",{attrs:{prop:"oneHundrenThousand",label:"十",width:"40"}}),t._v(" "),i("el-table-column",{attrs:{prop:"tenThousand",label:"万",width:"40"}}),t._v(" "),i("el-table-column",{attrs:{prop:"thousand",label:"千",width:"40"}}),t._v(" "),i("el-table-column",{attrs:{prop:"hundren",label:"百",width:"40"}}),t._v(" "),i("el-table-column",{attrs:{prop:"ten",label:"十",width:"40"}}),t._v(" "),i("el-table-column",{attrs:{prop:"yuan",label:"元",width:"40"}}),t._v(" "),i("el-table-column",{attrs:{prop:"jiao",label:"角",width:"40"}}),t._v(" "),i("el-table-column",{attrs:{prop:"fen",label:"分",width:"40"}})],1)],1)],1),t._v(" "),i("div",{staticClass:"receiptDialog_todo"},[i("el-table",{staticStyle:{width:"100%"},attrs:{data:t.formModel.szDtoList,border:"",height:"100%",stripe:""}},[i("el-table-column",{attrs:{prop:"financialWay",label:"收支方式",width:"100"}}),t._v(" "),i("el-table-column",{attrs:{prop:"bankName",label:"银行名称"}}),t._v(" "),i("el-table-column",{attrs:{prop:"bankAccount",label:"银行卡号"}}),t._v(" "),i("el-table-column",{attrs:{prop:"bankAccountName",label:"开户人"}}),t._v(" "),i("el-table-column",{attrs:{prop:"chequeNumber",label:"支票号码"}}),t._v(" "),i("el-table-column",{attrs:{prop:"receivableNumber",label:"汇款号码"}}),t._v(" "),i("el-table-column",{attrs:{prop:"wechatAccount",label:"微信号"}}),t._v(" "),i("el-table-column",{attrs:{prop:"alipayAccount",label:"支付宝号"}}),t._v(" "),i("el-table-column",{attrs:{prop:"agent",label:"经办人",width:"110"}})],1)],1),t._v(" "),i("div",{staticClass:"receiptDialog_remark"},[i("label",[t._v("备注")]),t._v(" "),i("el-input",{attrs:{placeholder:"备注",size:t.btnsize,disabled:t.isEdit,maxlength:300},model:{value:t.formModel.remark,callback:function(e){t.$set(t.formModel,"remark",e)},expression:"formModel.remark"}})],1)]),t._v(" "),i("div",{attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{type:"danger",size:t.btnsize,icon:"el-icon-circle-close-outline"},on:{click:t.closeMe}},[t._v(t._s(t.isEdit?"关 闭":"取 消"))])],1)],1)},staticRenderFns:[]};t.a=a},JCW1:function(e,t){},LSMk:function(e,t,i){"use strict";var a={render:function(){var a=this,e=a.$createElement,n=a._self._c||e;return n("div",{directives:[{name:"loading",rawName:"v-loading",value:a.loading,expression:"loading"}],staticClass:"tab-content"},[n("SearchForm",{attrs:{orgid:a.otherinfo.orgid,btnsize:a.btnsize},on:{change:a.getSearchParam}}),a._v(" "),n("div",{staticClass:"tab_info"},[n("div",{staticClass:"btns_box"},[n("el-button",{directives:[{name:"has",rawName:"v-has:FLOW_IN",arg:"FLOW_IN"}],attrs:{type:"primary",size:a.btnsize,icon:"el-icon-sort-down",plain:""},on:{click:function(e){a.doAction("income")}}},[a._v("记收入")]),a._v(" "),n("el-button",{directives:[{name:"has",rawName:"v-has:FLOW_OUT",arg:"FLOW_OUT"}],attrs:{type:"primary",size:a.btnsize,icon:"el-icon-sort-up",plain:""},on:{click:function(e){a.doAction("expandtiure")}}},[a._v("记支出")]),a._v(" "),n("el-button",{directives:[{name:"has",rawName:"v-has:FLOW_CANCEL",arg:"FLOW_CANCEL"}],attrs:{type:"warning",size:a.btnsize,icon:"el-icon-sort",plain:""},on:{click:function(e){a.doAction("cancelCount")}}},[a._v("取消核销")]),a._v(" "),n("el-button",{directives:[{name:"has",rawName:"v-has:FLOW_FIND",arg:"FLOW_FIND"}],attrs:{type:"success",size:a.btnsize,icon:"el-icon-tickets",plain:""},on:{click:function(e){a.doAction("showCount")}}},[a._v("查看核销单")]),a._v(" "),n("el-button",{directives:[{name:"has",rawName:"v-has:FLOW_DETAIL",arg:"FLOW_DETAIL"}],attrs:{type:"success",size:a.btnsize,icon:"el-icon-rank",plain:""},on:{click:function(e){a.doAction("showDetail")}}},[a._v("查看明细")]),a._v(" "),n("el-button",{directives:[{name:"has",rawName:"v-has:FLOW_PRI",arg:"FLOW_PRI"}],attrs:{type:"primary",size:a.btnsize,icon:"el-icon-printer",plain:""},on:{click:function(e){a.doAction("print")}}},[a._v("打印")]),a._v(" "),n("el-button",{directives:[{name:"has",rawName:"v-has:FLOW_EXP",arg:"FLOW_EXP"}],attrs:{type:"primary",size:a.btnsize,icon:"el-icon-download",plain:""},on:{click:function(e){a.doAction("export")}}},[a._v("导出")]),a._v(" "),n("el-button",{staticClass:"table_setup",attrs:{type:"primary",size:a.btnsize,icon:"el-icon-setting",plain:""},on:{click:a.setTable}},[a._v("表格设置")])],1),a._v(" "),n("div",{staticClass:"info_tab"},[n("el-table",{key:a.tablekey,ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:a.dataList,stripe:"",border:"",height:"100%","tooltip-effect":"dark","default-sort":{prop:"id",order:"ascending"}},on:{"row-dblclick":a.selectedItem,"row-click":a.clickDetails,"selection-change":a.getSelection,"cell-dblclick":a.showDetail}},[n("el-table-column",{attrs:{fixed:"",sortable:"",type:"selection",width:"35"}}),a._v(" "),a._l(a.tableColumn,function(i){return[i.slot?n("el-table-column",{key:i.id,attrs:{fixed:i.fixed,sortable:"",label:i.label,width:i.width},scopedSlots:a._u([{key:"default",fn:function(t){return[i.click?n("span",{staticClass:"clickitem",domProps:{innerHTML:a._s(i.slot(t))},on:{click:function(e){e.stopPropagation(),i.click(t)}}}):n("span",{domProps:{innerHTML:a._s(i.slot(t))}})]}}])}):n("el-table-column",{key:i.id,attrs:{fixed:i.fixed,sortable:"",label:i.label,prop:i.prop,width:i.width}})]})],2)],1)]),a._v(" "),n("div",{staticClass:"info_tab_footer"},[a._v("\n    共计:"+a._s(a.total)+"\n    "),n("div",{staticClass:"show_pager"},[n("Pager",{attrs:{total:a.total},on:{change:a.handlePageChange}})],1)]),a._v(" "),n("TableSetup",{attrs:{popVisible:a.setupTableVisible,columns:a.tableColumn},on:{close:a.closeSetupTable,success:a.setColumn}}),a._v(" "),n("Receipt",{attrs:{popVisible:a.popVisibleDialog,info:a.tableReceiptInfo},on:{close:a.closeDialog}})],1)},staticRenderFns:[]};t.a=a},"QS/K":function(e,t,i){"use strict";t.i=function(e){return a.b.post("/api-finance/finance/tmsfinancecapitalflow/v1/list/",e).then(function(e){return e.data})},t.a=function(e,t){return a.b.get("/api-finance/finance/tmsfinancecapitalflow/v1/getFeeInfo?orgId="+e+"&paymentsType="+t).then(function(e){return e.data})},t.c=function(e){return a.b.post("/api-finance/finance/tmsfinancecapitalflow/v1/getOrderShipList/",{orgId:e.orgId,paymentsType:e.paymentsType,incomePayType:e.incomePayType,settlementId:e.settlementId,startTime:e.startTime,endTime:e.endTime,autoTotalAmount:e.autoTotalAmount,shipSenderName:e.shipSenderName,feeId:e.feeId,truckIdNumber:e.truckIdNumber}).then(function(e){return e.data})},t.g=function(e){return a.b.post("/api-finance/finance/tmsfinancecapitalflow/v1/cancelSettlement/",{flowId:e.flowId,detailFlowId:e.detailFlowId})},t.f=function(e){return a.b.post("/api-finance/finance/tmsfinancecapitalflow/v1/addIncome/",e).then(function(e){return e.data})},t.h=function(e){return a.b.post("/api-finance/finance/tmsfinancecapitalflowdetail/v1/list/",e).then(function(e){return e.data})},t.e=function(e,t){return a.b.get("/api-finance/finance/tmsfinancecapitalflow/v1/getSettlementInfo?flowId="+e+"&settlementId="+t)},t.b=function(e){return a.b.post("/api-finance/finance/tmsfinancefeetype/v1/getFeeTypeDict",{paymentsType:e.paymentsType,fiOrderType:e.fiOrderType}).then(function(e){return e.data})},t.d=function(e){return a.b.post("/api-finance/finance/tmsfinancefinancialway/v1/getOrgFirstFinancialWay/",{financialWay:e.financialWay,orgId:e.orgId}).then(function(e){return e.data})};var a=i("Vo7i");i("0xDb")},"Qhr/":function(e,t){},SjYS:function(e,t,i){"use strict";var a=i("seR9"),n=i("msh6");var o=function(e){i("nl9Y")},s=i("VU/8")(a.a,n.a,o,null,null);t.a=s.exports},WDIC:function(e,t,i){"use strict";var a={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-dialog",{staticClass:"wzl_settleLogSave",attrs:{title:t.popTitle,visible:t.isShow,"close-on-click-modal":!1,"before-close":t.closeMe},on:{close:t.closeMe,"update:visible":function(e){t.isShow=e}}},[i("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:t.form,rules:t.rules,"label-width":t.formLabelWidth,inline:!0,"label-position":"right",size:"mini"}},[i("el-form-item",{attrs:{label:"名称：",prop:"queryKey"}},[i("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.form.queryKey,expression:"form.queryKey",modifiers:{trim:!0}}],attrs:{maxlength:20,placeholder:"请定义名称"},domProps:{value:t.form.queryKey},on:{input:function(e){e.target.composing||t.$set(t.form,"queryKey",e.target.value.trim())},blur:function(e){t.$forceUpdate()}}})])],1),t._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{type:"primary"},on:{click:function(e){t.submitForm("ruleForm")}}},[t._v("确 定")]),t._v(" "),i("el-button",{on:{click:t.closeMe}},[t._v("取 消")])],1)],1)},staticRenderFns:[]};t.a=a},"Wt/v":function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=i("2toJ"),n=i("WDIC");var o=function(e){i("JCW1")},s=i("VU/8")(a.a,n.a,o,null,null);t.default=s.exports},"e+8D":function(e,t,i){"use strict";var a={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("el-form",{ref:"searchForm",staticClass:"staff_searchinfo clearfix",attrs:{inline:!0,size:t.btnsize,"label-position":"right",rules:t.rules,model:t.searchForm,"label-width":"70px"}},[i("div",{staticClass:"staff_searchinfo--input"},[i("el-form-item",{attrs:{label:"核销时间"}},[i("el-date-picker",{attrs:{"default-value":t.defaultTime,type:"daterange","unlink-panels":"",align:"right","value-format":"yyyy-MM-dd","start-placeholder":"开始日期","picker-options":t.pickerOptions2,"end-placeholder":"结束日期"},model:{value:t.searchCreatTime,callback:function(e){t.searchCreatTime=e},expression:"searchCreatTime"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"核销网点",prop:"orgId"}},[i("SelectTree",{attrs:{orgid:t.otherinfo.orgid},on:{change:t.onSubmit},model:{value:t.searchForm.orgId,callback:function(e){t.$set(t.searchForm,"orgId",e)},expression:"searchForm.orgId"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"核销类型",prop:"settlementId"}},[i("selectType",{attrs:{type:"settlement_type",clearable:""},model:{value:t.searchForm.settlementId,callback:function(e){t.$set(t.searchForm,"settlementId",e)},expression:"searchForm.settlementId"}},[i("el-option",{attrs:{slot:"head",label:"全部",value:""},slot:"head"})],1)],1),t._v(" "),i("searchAll",{attrs:{searchObj:t.searchObjs},on:{dataObj:t.getDataObj}})],1),t._v(" "),i("el-form-item",{staticClass:"staff_searchinfo--btn"},[i("el-button",{attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v("查询")]),t._v(" "),i("el-button",{attrs:{type:"info",plain:""},on:{click:function(e){t.clearForm("searchForm")}}},[t._v("清空")])],1)],1)],1)},staticRenderFns:[]};t.a=a},f3wf:function(e,t){},fyBF:function(e,t,i){"use strict";var a={render:function(){var i=this,e=i.$createElement,a=i._self._c||e;return i.hasCode?a("div",{staticClass:"searchAll_lyy"},[a("el-form-item",{staticClass:"zdycx",attrs:{label:"自定义查询"}},[a("el-select",{attrs:{filterable:"",placeholder:"请选择","filter-method":i.querySearchAsync,"popper-class":"zdycx-pop",loading:i.loading},on:{change:i.handleSelect,focus:i.initdata},model:{value:i.datalist,callback:function(e){i.datalist=e},expression:"datalist"}},i._l(i.options4,function(t,e){return a("el-option",{key:e,attrs:{label:t.queryKey,value:t.id}},[i._v("\r\n        "+i._s(t.queryKey)+" "),a("i",{staticClass:"el-icon-circle-close-outline",on:{click:function(e){e.stopPropagation(),e.preventDefault(),i.deleteItem(t)}}})])})),i._v(" "),a("el-button",{attrs:{plain:""},on:{click:i.Custom}},[i._v("保存自定义")])],1),i._v(" "),a("addSave",{attrs:{code:i.hasCode,searchObj:i.searchObj,popVisible:i.popVisible},on:{close:i.closeAddDot,success:i.fetchAllloadAll}})],1):i._e()},staticRenderFns:[]};t.a=a},msh6:function(e,t,i){"use strict";var a={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-dialog",{staticClass:"wzl_settleLogSave",attrs:{title:t.popTitle,visible:t.isShow,"close-on-click-modal":!1,"before-close":t.closeMe},on:{close:t.closeMe,"update:visible":function(e){t.isShow=e}}},[i("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:t.form,rules:t.rules,"label-width":t.formLabelWidth,inline:!0,"label-position":"right",size:"mini"}},[i("el-form-item",{attrs:{label:"名称：",prop:"queryKey"}},[i("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.form.queryKey,expression:"form.queryKey",modifiers:{trim:!0}}],attrs:{maxlength:20,placeholder:"请定义名称"},domProps:{value:t.form.queryKey},on:{input:function(e){e.target.composing||t.$set(t.form,"queryKey",e.target.value.trim())},blur:function(e){t.$forceUpdate()}}})])],1),t._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{type:"primary",disabled:0===t.form.queryKey.length},on:{click:function(e){t.submitForm("ruleForm")}}},[t._v("确 定")]),t._v(" "),i("el-button",{on:{click:t.closeMe}},[t._v("取 消")])],1)],1)},staticRenderFns:[]};t.a=a},nl9Y:function(e,t){},oeKO:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=i("qy12"),n=i("Clpx"),o=i("VU/8")(a.a,n.a,null,null,null);t.default=o.exports},qYK6:function(e,t,i){"use strict";t.a={props:{width:{type:String,default:"400"},title:{type:String,default:"标题"},isShow:{type:Boolean,default:!1}},watch:{isShow:{handler:function(){this.isShow&&(this.shouldRender=!0)},immediate:!0}},data:function(){return{zIndex:(window.tmsPopZindex?window.tmsPopZindex+=1:window.tmsPopZindex=1e3,window.tmsPopZindex),shouldRender:!1}},methods:{close:function(){this.$emit("close")}}}},qy12:function(e,t,i){"use strict";var a=i("woOf"),n=i.n(a),o=i("Dd8w"),s=i.n(o),r=(i("E4LH"),i("NYxO")),l=i("QS/K"),c=i("t5DY"),u=(i("0xDb"),i("Q0Ca")),d=i("pAQG");t.a={components:{querySelect:d.a},data:function(){return{isEdit:!0,amount:0,amountMessage:"",formModel:{},loading:!0,rules:{},settlementInfo:{},btnsize:"mini",dialogTitle:"结 算 收 款 单",submitData:{},paymentsType:1}},computed:s()({},Object(r.mapGetters)(["otherinfo"]),{isShow:{get:function(){return this.popVisible},set:function(){}},getRouteInfo:function(){return this.$route.query.searchQuery},settlementTypeId:function(){switch(this.$route.query.currentPage){case"batchShort":return 180;case"batchDeliver":return 181;case"batchInsurance":case"batchStationLoad":case"batchStationOther":case"batchArrivalLoad":case"batchArrivalOther":case"batchArrivalAll":return 179}},dataName:function(){switch(this.$route.query.currentPage){case"batchShort":return"短驳费";case"batchDeliver":return"送货费";case"batchInsurance":return"整车保险费";case"batchStationLoad":return"发站装卸费";case"batchStationOther":return"发站其他费";case"batchArrivalLoad":return"到站装卸费";case"batchArrivalOther":return"到站其他费";case"waybillKickback":return"回扣"}}}),props:{popVisible:{type:Boolean,default:!1},info:{type:Array,default:[]}},watch:{popVisible:function(){this.popVisible?(this.isShow=!0,this.getFeeInfo()):this.isShow=!1},info:function(e){if(e)return console.log("info",this.info),this.info}},mounted:function(){var e=this;this.$nextTick(function(){e.init()})},methods:{init:function(){this.loading=!1},getFeeInfo:function(){var t=this;this.$set(this.formModel,"szDtoList",[]),Object(l.e)(this.info[0].flowId,this.info[0].settlementId).then(function(e){t.settlementInfo=e.data,t.initDetailDtoList()}).catch(function(e){t.loading=!1,t._handlerCatchMsg(e)})},initDetailDtoList:function(){this.formModel=n()({},this.settlementInfo),console.log(this.formModel),0<this.formModel.flowFeeMidList.length&&this.formModel.flowFeeMidList.forEach(function(e,t){var i=e.amount.toFixed(2).toString().split("").reverse(),a=i.indexOf(".");-1!==a&&i.splice(a,1),e.fen=i[0],e.jiao=i[1],e.yuan=i[2],e.ten=i[3],e.hundren=i[4],e.thousand=i[5],e.tenThousand=i[6],e.oneHundrenThousand=i[7],e.million=i[8],e.tenMillion=i[9]}),this.amountMessage=Object(u.smalltoBIG)(this.formModel.amount),this.amount=this.formModel.amount.toFixed(2).toString().split("").reverse();var e=this.amount.indexOf(".");-1!==e&&this.amount.splice(e,1)},getSystemTime:function(){var t=this;Object(c.i)().then(function(e){t.formModel.settlementTime=new Date(e.trim())}).catch(function(e){t.loading=!1,t._handlerCatchMsg(e)})},closeMe:function(e){this.$emit("close"),"function"==typeof e&&e()},getSum:function(e){var o=this,t=e.columns,s=e.data,r=[];return this.$nextTick(function(){}),t.forEach(function(t,e){if(0!==e)if(1!==e){for(var i=-2,a=12;2<a;a--)if(i++,e===a)return void(r[e]=o.amount[i]);var n=s.map(function(e){return Number(e[t.property])});n.every(function(e){return isNaN(e)})?r[e]="N/A":(r[e]=n.reduce(function(e,t){var i=Number(t);return isNaN(i)?e:e+t},0),r[e]+="")}else r[e]=o.amountMessage;else r[e]="合计"}),r}}}},seR9:function(e,t,i){"use strict";var a=i("mvHQ"),n=i.n(a),o=i("t5DY"),s=i("0xDb");t.a={computed:{isShow:{get:function(){return this.popVisible},set:function(){}}},components:{},props:{popVisible:{type:Boolean,default:!1},dotInfo:[Object,Array],searchQuery:[Object,Array],isDepMain:{type:Boolean,default:!1},createrId:[Number,String],isModify:{type:Boolean,default:!1},isAccept:{type:Boolean,default:!1},proptitle:String,searchObj:{type:[Array,Object],default:function(){}},code:{type:String,default:""}},data:function(){return{form:{userId:"",orgId:"",menuCode:"",queryKey:"",queryContent:""},searchCreatTime:+new Date,pickOption2:"",formLabelWidth:"75px",tooltip:!1,rules:{},queryKey:"",checked1:!0,popTitle:"自定义标签",loading:!1,type:""}},mounted:function(){},watch:{orgid:function(e){this.form.orgid=e},popVisible:function(e){e&&(this.form.userId=this.otherinfo.userId,this.form.orgId=this.otherinfo.orgid,this.form.menuCode=this.code||this.$route.meta.code)}},methods:{reset:function(){this.$refs.ruleForm.resetFields()},closeMe:function(e){this.$emit("close"),this.reset(),"function"==typeof e&&e()},submitForm:function(e){var i=this;this.loading||this.$refs[e].validate(function(e){if(!e)return!1;i.loading=!0,i.form.queryContent=n()(i.searchObj);var t=Object(s.objectMerge2)({},i.form);console.log("addSave_data",t),Object(o.q)(t).then(function(e){i.loading=!1,i.$message({message:"保存成功~",type:"success"}),i.closeMe(),i.$emit("success")}).catch(function(e){i.loading=!1,i.$message.warning(e.text)})})}}}},us2a:function(e,t,i){"use strict";var a=i("t5DY"),n=i("SjYS");t.a={components:{addSave:n.a},props:{searchObj:{type:[Object,Array]},value:[String,Number],code:{type:String,default:""}},data:function(){return{isModify:!1,popVisible:!1,setupTableVisible:!1,dataset:[],datalist:"",timeout:null,loading:!1,options4:[],querySearch:{currentPage:1,pageSize:10,vo:{orgId:"",userId:"",menuCode:""}}}},computed:{hasCode:function(){return this.code||this.$route.meta.code||""}},watch:{value:function(e){""===e&&(this.datalist="")},searchObj:{handler:function(e,t){},deep:!0}},mounted:function(){},methods:{initdata:function(){var t=this;this.inited||(this.inited=!0,this.loading=!0,this.fetchAllloadAll().then(function(e){t.loading=!1}))},deleteItem:function(e){var t=this;Object(a.a)(e.id).then(function(e){t.fetchAllloadAll(),t.datalist&&(t.datalist="")}).catch(function(e){t._handlerCatchMsg(e)})},Custom:function(){this.isModify=!0,this.popVisible=!0},closeAddDot:function(){this.popVisible=!1},fetchAllloadAll:function(){var t=this;return this.querySearch.vo.orgId=this.otherinfo.orgid,this.querySearch.vo.userId=this.otherinfo.userId,this.querySearch.vo.menuCode=this.code||this.$route.meta.code,Object(a.p)(this.querySearch).then(function(e){t.dataset=e.list||[],t.options4=e.list||[]})},querySearchAsync:function(e,t){var i=this.dataset,a=e?i.filter(this.createStateFilter(e)):i;t(this.options4=a)},createStateFilter:function(t){return function(e){return 0===e.queryKey.toLowerCase().indexOf(t.toLowerCase())}},handleSelect:function(t){var e=this.options4.filter(function(e){return e.id===t});if(e.length){var i=e[0].queryContent,a=JSON.parse(i);this.$emit("change",JSON.parse(i.replace(/'/g,'"'))),this.$emit("dataObj",a)}}}}},wtTA:function(e,t,i){"use strict";var a=i("woOf"),n=i.n(a),o=i("E4LH"),s=i("o9X6"),r=i("pAQG"),l=i("9UCZ"),c=i("0xDb"),u=i("Wt/v"),d=i("8UOW");t.a={components:{SelectTree:s.a,querySelect:r.a,SelectType:l.a,addSave:u.default,searchAll:d.a},props:{btnsize:{type:String,default:"mini"},orgid:{type:Number}},data:function(){return{dotInfo:[],isModify:!1,popVisible:!1,setupTableVisible:!1,dataset:[],datalist:"",timeout:null,searchObj:{},searchObjs:{},searchCreatTime:[],defaultTime:[Object(c.parseTime)(+new Date-5184e6,"{y}-{m}-{d}"),Object(c.parseTime)(new Date,"{y}-{m}-{d}")],searchForm:{orgId:"",startTime:"",endTime:"",settlementId:""},rules:{shipSn:[{validator:function(e,t,i){var a=o.a.ONLY_NUMBER;""!==t&&null!==t&&t&&void 0!==t?a.test(t)?i():i(new Error("请输入最多15位数字")):i()},tigger:"blur"}]},pickerOptions2:{shortcuts:c.pickerOptions2}}},watch:{orgid:function(e){this.searchForm.orgId=e},searchCreatTime:function(e){e&&(this.searchObjs.startTime=this.searchCreatTime?this.searchCreatTime[0]+" 00:00:00":"",this.searchObjs.endTime=this.searchCreatTime?this.searchCreatTime[1]+" 23:59:59":"")},searchForm:{handler:function(e,t){this.searchObjs=n()({},e),this.searchObjs.settlementId=this.searchForm.settlementId,this.searchObjs.startTime=this.searchCreatTime?this.searchCreatTime[0]+" 00:00:00":"",this.searchObjs.endTime=this.searchCreatTime?this.searchCreatTime[1]+" 23:59:59":"",this.searchObjs[this.searchForm.type]=this.searchForm.value,console.log(this.searchObjs,e,t)},deep:!0}},mounted:function(){this.searchForm.orgId=this.orgid,this.searchCreatTime=this.defaultTime,this.onSubmit()},methods:{getDataObj:function(e){this.searchCreatTime=[e.startTime,e.endTime],this.searchForm=n()({},e),this.$emit("change",e)},closeAddDot:function(){this.popVisible=!1},onSubmit:function(){var e=n()({},this.searchForm);e.settlementId=this.searchForm.settlementId,e.startTime=this.searchCreatTime?this.searchCreatTime[0]+" 00:00:00":"",e.endTime=this.searchCreatTime?this.searchCreatTime[1]+" 23:59:59":"",this.$emit("change",e),console.log()},clearForm:function(e){var t=this;this.$nextTick(function(){n()(t.$data,t.$options.data()),t.searchForm.orgId=t.orgid,t.searchCreatTime=t.defaultTime,t.$refs[e].resetFields()})}}}}});