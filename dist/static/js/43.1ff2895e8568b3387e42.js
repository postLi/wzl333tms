webpackJsonp([43,163,264],{"7nIZ":function(e,t,i){"use strict";t.i=function(e){return o.b.post("/api-finance/finance/tmsfinancebillrecord/v1.3/getBillRecordList/",e).then(function(e){return e.data})},t.h=function(e){return o.b.post("/api-finance/finance/tmsfinancebillrecorddetail/v1.3/getBillRecordDetailList/",e).then(function(e){return e.data})},t.j=function(e){return o.b.post("/api-finance/finance/tmsfinancebillrecord/v1.3/getVerificationBaseInfo/",e).then(function(e){return e.data})},t.g=function(e){return o.b.post("/api-finance/finance/tmsfinancebillrecord/v1.3/addIncome/",e).then(function(e){return e.data})},t.a=function(e){return o.b.post("/api-finance/finance/tmsfinancebillrecord/v1.3/cancelVerification/",e).then(function(e){return e.data})},t.f=function(e){return o.b.post("/api-finance/finance/tmsfinanceverification/v1.3/getVeryficationList/",e).then(function(e){return e.data})},t.b=function(e){return o.b.post("/api-finance//finance/tmsfinancebillrecord/v1.3/delBillRecord/",e).then(function(e){return e.data})},t.e=function(e){return o.b.post("/api-finance/finance/tmsfinancebillrecord/v1.3/getOrderList/",e).then(function(e){return e.data})},t.d=function(e){return o.b.post("/api-finance/finance/tmsfinancesubjects/v1.3/getFinanceSubjects/",e).then(function(e){return e.data})},t.c=function(e){return o.b.post("/api-finance/finance/tmsfinancebillrecord/v1.3/getBillRecordInfo",e).then(function(e){return e.data})};var o=i("Vo7i")},"8UOW":function(e,t,i){"use strict";var o=i("us2a"),r=i("fyBF");var s=function(e){i("Qhr/")},n=i("VU/8")(o.a,r.a,s,null,null);t.a=n.exports},CmFX:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=i("tdtH"),r=i("wgpT");var s=function(e){i("si/F")},n=i("VU/8")(o.a,r.a,s,null,null);t.default=n.exports},DHkJ:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=i("JTvU"),r=i("UAQR"),s=i("VU/8")(o.a,r.a,null,null,null);t.default=s.exports},JTvU:function(e,t,i){"use strict";var o=i("woOf"),r=i.n(o),s=(i("E4LH"),i("o9X6")),n=i("pAQG"),a=i("0xDb"),c=i("9UCZ"),l=i("8UOW");t.a={components:{SelectTree:s.a,querySelect:n.a,SelectType:c.a,searchAll:l.a},props:{btnsize:{type:String,default:"mini"},orgid:{type:[Number,String]}},data:function(){return{searchAll:"",searchObjs:{},searchForm:{orgId:"",dataSrc:"",paymentsType:"",startTime:"",endTime:""},rules:{},searchTime:[Object(a.parseTime)(new Date-5184e6),Object(a.parseTime)(new Date)],defaultTime:[+new Date-5184e6,+new Date],pickerOptions:{shortcuts:a.pickerOptions2}}},watch:{orgid:function(e){this.searchForm.orgId=e},searchTime:function(e){e&&(this.$set(this.searchObjs,"startTime",Object(a.parseTime)(this.searchTime[0],"{y}-{m}-{d} ")+"00:00:00"),this.$set(this.searchObjs,"endTime",Object(a.parseTime)(this.searchTime[1],"{y}-{m}-{d} ")+"23:59:59"))},searchForm:{handler:function(e,t){this.searchObjs=r()({},e),this.searchTime&&this.searchTime[0]&&(this.$set(this.searchObjs,"startTime",Object(a.parseTime)(this.searchTime[0],"{y}-{m}-{d} ")+"00:00:00"),this.$set(this.searchObjs,"endTime",Object(a.parseTime)(this.searchTime[1],"{y}-{m}-{d} ")+"23:59:59"))},deep:!0}},mounted:function(){this.searchForm.orgId=this.orgid,this.onSubmit()},methods:{getDataObj:function(e){this.searchTime=[e.startTime,e.endTime],this.searchForm=r()({},e),this.$emit("change",e)},selectFeeType:function(e){console.log(e)},onSubmit:function(){var e=r()({},this.searchForm);this.searchTime&&(this.$set(e,"startTime",Object(a.parseTime)(this.searchTime[0],"{y}-{m}-{d} ")+"00:00:00"),this.$set(e,"endTime",Object(a.parseTime)(this.searchTime[1],"{y}-{m}-{d} ")+"23:59:59")),this.$emit("change",e)},changeVal:function(e){this.onSubmit()},clearForm:function(e){var t=this;this.$nextTick(function(){r()(t.$data,t.$options.data()),t.searchForm.orgId=t.orgid,t.$refs[e].resetFields(),t.searchAll="1",setTimeout(function(){t.searchAll=""},50)})}}}},"Qhr/":function(e,t){},SjYS:function(e,t,i){"use strict";var o=i("seR9"),r=i("msh6");var s=function(e){i("nl9Y")},n=i("VU/8")(o.a,r.a,s,null,null);t.a=n.exports},UAQR:function(e,t,i){"use strict";var o={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-form",{ref:"searchForm",staticClass:"staff_searchinfo clearfix",attrs:{inline:!0,size:t.btnsize,"label-position":"right",rules:t.rules,model:t.searchForm,"label-width":"70px"}},[i("div",{staticClass:"staff_searchinfo--input"},[i("el-form-item",{attrs:{label:"核销时间"}},[i("el-date-picker",{attrs:{"default-value":t.defaultTime,type:"daterange",align:"right","value-format":"yyyy-MM-dd HH:mm:ss","start-placeholder":"开始日期","picker-options":t.pickerOptions,"end-placeholder":"结束日期"},on:{change:t.changeVal},model:{value:t.searchTime,callback:function(e){t.searchTime=e},expression:"searchTime"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"核销网点",prop:"orgId"}},[i("SelectTree",{attrs:{orgid:t.otherinfo.orgid},on:{change:t.changeVal},model:{value:t.searchForm.orgId,callback:function(e){t.$set(t.searchForm,"orgId",e)},expression:"searchForm.orgId"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"方向",prop:"paymentsType"}},[i("el-select",{attrs:{placeholder:"方向",size:t.btnsize},model:{value:t.searchForm.paymentsType,callback:function(e){t.$set(t.searchForm,"paymentsType",e)},expression:"searchForm.paymentsType"}},[i("el-option",{attrs:{value:"",label:"全部"}}),t._v(" "),t._l(t.$const.SETTLEMENT_ID,function(e,t){return i("el-option",{key:t,attrs:{value:t,label:e}})})],2)],1),t._v(" "),i("el-form-item",{attrs:{label:"来源",prop:"dataSrc"}},[i("el-select",{attrs:{placeholder:"来源",size:t.btnsize},model:{value:t.searchForm.dataSrc,callback:function(e){t.$set(t.searchForm,"dataSrc",e)},expression:"searchForm.dataSrc"}},t._l(t.$const.VERIFICATION_SOURCE,function(e,t){return i("el-option",{key:t,attrs:{value:t,label:e}})}))],1),t._v(" "),i("searchAll",{attrs:{searchObj:t.searchObjs},on:{dataObj:t.getDataObj},model:{value:t.searchAll,callback:function(e){t.searchAll=e},expression:"searchAll"}})],1),t._v(" "),i("el-form-item",{staticClass:"staff_searchinfo--btn"},[i("el-button",{attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v("查询")]),t._v(" "),i("el-button",{attrs:{type:"info",plain:""},on:{click:function(e){t.clearForm("searchForm")}}},[t._v("清空")])],1)],1)},staticRenderFns:[]};t.a=o},dYKW:function(e,t,i){"use strict";var o={render:function(){var o=this,e=o.$createElement,r=o._self._c||e;return r("div",{directives:[{name:"loading",rawName:"v-loading",value:o.loading,expression:"loading"}],staticClass:"tab-content"},[r("SearchForm",{attrs:{orgid:o.orgId,btnsize:o.btnsize},on:{change:o.getSearchParam}}),o._v(" "),r("div",{staticClass:"tab_info"},[r("div",{staticClass:"btns_box"},[r("el-button",{directives:[{name:"has",rawName:"v-has:FLOW_IN",arg:"FLOW_IN"}],attrs:{type:"primary",size:o.btnsize,icon:"el-icon-sort",plain:""},on:{click:function(e){o.doAction("income")}}},[o._v("新增")]),o._v(" "),r("el-button",{directives:[{name:"has",rawName:"v-has:FLOW_CANCEL",arg:"FLOW_CANCEL"}],attrs:{type:"primary",size:o.btnsize,icon:"el-icon-sort",plain:""},on:{click:function(e){o.doAction("edit")}}},[o._v("修改")]),o._v(" "),r("el-button",{directives:[{name:"has",rawName:"v-has:FLOW_CANCEL",arg:"FLOW_CANCEL"}],attrs:{type:"warning",size:o.btnsize,icon:"el-icon-sort",plain:""},on:{click:function(e){o.doAction("backCount")}}},[o._v("反核销\n      ")]),o._v(" "),r("el-button",{directives:[{name:"has",rawName:"v-has:FLOW_PRI",arg:"FLOW_PRI"}],attrs:{type:"primary",size:o.btnsize,icon:"el-icon-printer",plain:""},on:{click:function(e){o.doAction("print")}}},[o._v("打印\n      ")]),o._v(" "),r("el-button",{directives:[{name:"has",rawName:"v-has:FLOW_EXP",arg:"FLOW_EXP"}],attrs:{type:"primary",size:o.btnsize,icon:"el-icon-download",plain:""},on:{click:function(e){o.doAction("export")}}},[o._v("导出\n      ")]),o._v(" "),r("el-button",{staticClass:"table_setup",attrs:{type:"primary",size:o.btnsize,icon:"el-icon-setting",plain:""},on:{click:o.setTable}},[o._v("\n        表格设置\n      ")])],1),o._v(" "),r("div",{staticClass:"info_tab"},[r("el-table",{key:o.tablekey,ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:o.dataListTop,stripe:"",border:"",height:"100%","tooltip-effect":"dark","default-sort":{prop:"id",order:"ascending"},"cell-class-name":o.classLineRed},on:{"row-click":o.clickDetails,"selection-change":o.getSelection}},[r("el-table-column",{attrs:{fixed:"",sortable:"",type:"selection",width:"35"}}),o._v(" "),o._l(o.tableColumn,function(i){return[i.slot?r("el-table-column",{attrs:{fixed:i.fixed,sortable:"",label:i.label,width:i.width},scopedSlots:o._u([{key:"default",fn:function(t){return[i.click?r("span",{staticClass:"clickitem",domProps:{innerHTML:o._s(i.slot(t))},on:{click:function(e){e.stopPropagation(),i.click(t)}}}):r("span",{domProps:{innerHTML:o._s(i.slot(t))}})]}}])}):r("el-table-column",{attrs:{fixed:i.fixed,sortable:"",label:i.label,prop:i.prop,width:i.width}})]})],2)],1)]),o._v(" "),r("div",{staticClass:"info_tab_footer"},[o._v("\n    共计:"+o._s(o.total)+"\n    "),r("div",{staticClass:"show_pager"},[r("Pager",{attrs:{total:o.total},on:{change:o.handlePageChange}})],1)]),o._v(" "),r("TableSetup",{attrs:{popVisible:o.setupTableVisible,columns:o.tableColumn},on:{close:o.closeSetupTable,success:o.setColumn}}),o._v(" "),r("Income",{attrs:{popVisible:o.popVisibleIncome,info:o.currentInfo,isModify:o.isModify},on:{close:o.closeDialogIncome,success:o.setAddSuccess}})],1)},staticRenderFns:[]};t.a=o},fyBF:function(e,t,i){"use strict";var o={render:function(){var i=this,e=i.$createElement,o=i._self._c||e;return i.hasCode?o("div",{staticClass:"searchAll_lyy"},[o("el-form-item",{staticClass:"zdycx",attrs:{label:"自定义查询"}},[o("el-select",{attrs:{filterable:"",placeholder:"请选择","filter-method":i.querySearchAsync,"popper-class":"zdycx-pop",loading:i.loading},on:{change:i.handleSelect,focus:i.initdata},model:{value:i.datalist,callback:function(e){i.datalist=e},expression:"datalist"}},i._l(i.options4,function(t,e){return o("el-option",{key:e,attrs:{label:t.queryKey,value:t.id}},[i._v("\r\n        "+i._s(t.queryKey)+" "),o("i",{staticClass:"el-icon-circle-close-outline",on:{click:function(e){e.stopPropagation(),e.preventDefault(),i.deleteItem(t.id)}}})])})),i._v(" "),o("el-button",{attrs:{plain:""},on:{click:i.Custom}},[i._v("保存自定义")])],1),i._v(" "),o("addSave",{attrs:{code:i.hasCode,searchObj:i.searchObj,popVisible:i.popVisible},on:{close:i.closeAddDot,success:i.fetchAllloadAll}})],1):i._e()},staticRenderFns:[]};t.a=o},gcKE:function(e,t,i){"use strict";var o,r=i("bOdI"),s=i.n(r),n=i("woOf"),a=i.n(n),c=i("Dd8w"),l=i.n(c),u=i("0xDb"),d=i("DHkJ"),f=i("1onU"),h=i("puNT"),m=i("7nIZ"),p=i("NYxO"),b=i("UQm2"),g=i("CmFX");t.a={components:{SearchForm:d.default,Pager:f.a,TableSetup:h.a,Income:g.default},data:function(){var t=this;return{isModify:!1,popVisibleIncome:!1,currentInfo:{},btnsize:"mini",feeType:8,selectedList:[],selectListShipSns:[],searchQuery:{currentPage:1,pageSize:100,vo:{recordId:"",orgId:""}},tablekey:0,tablekeyBottom:0,total:0,dataListTop:[],loading:!0,setupTableVisible:!1,tableColumn:[{label:"序号",prop:"id",width:"50",fixed:!0,slot:function(e){return(t.searchQuery.currentPage-1)*t.searchQuery.pageSize+e.$index+1}},{label:"来源",prop:"dataSrcZh",width:"110",fixed:!0},{label:"核销项目",prop:"feeType",width:"110",fixed:!0},{label:"类别",prop:"verificationWay",width:"110"},{label:"方向",prop:"paymentsTypeZh",width:"90"},{label:"金额",prop:"amount",width:"90",fixed:!1},{label:"发票号码",prop:"invoiceNo",width:"130",fixed:!1},{label:"收据号码",prop:"receiptNo",width:"130",fixed:!1},{label:"支票号码",prop:"checkNo",width:"130",fixed:!1},{label:"凭证日期",prop:"certTime",width:"160",fixed:!1},{label:"系统操作日期",prop:"createTime",width:"160",fixed:!1},{label:"一级科目",prop:"subjectOne",width:"110",fixed:!1},{label:"二级科目",prop:"subjectTwo",width:"110",fixed:!1},{label:"三级科目",prop:"subjectThree",width:"110",fixed:!1},{label:"四级科目",prop:"subjectFour",width:"110",fixed:!1},{label:"摘要",prop:"remark",width:"150",fixed:!1},{label:"核销网点",prop:"orgName",width:"150",fixed:!1},{label:"反核销金额",prop:"contrayAmount",width:"100",fixed:!1},{label:"反核销经办人",prop:"contraryVerifyMan",width:"120",fixed:!1},{label:"反核销日期",prop:"contraryVerifyTime",width:"180",fixed:!1},{label:"手工凭证号",prop:"manualCert",width:"150",fixed:!1},{label:"凭证号",prop:"certNo",width:"150",fixed:!1},{label:"审核人",prop:"verifyMan",width:"90",fixed:!1},{label:"审核状态",prop:"verifyStatusZh",width:"100",fixed:!1},{label:"审核日期",prop:"verifyTime",width:"180",fixed:!1},{label:"运单号",prop:"shipSn",width:"180",fixed:!1},{label:"货号",prop:"shipGoodsSn",width:"180",fixed:!1},{label:"发货人",prop:"shipSenderName",width:"90",fixed:!1},{label:"收货人",prop:"shipReceiverName",width:"90",fixed:!1},{label:"开单日期",prop:"shipCreateTime",width:"180",fixed:!1},{label:"发站",prop:"shipFromCityName",width:"120",fixed:!1},{label:"到站",prop:"shipToCityName",width:"120",fixed:!1},{label:"发车类型",prop:"loadTypeIdZh",width:"100",fixed:!1},{label:"车牌号",prop:"truckIdNumber",width:"120",fixed:!1},{label:"发车批次",prop:"batchNo",width:"160",fixed:!1},{label:"发车日期",prop:"departureTime",width:"180",fixed:!1},{label:"司机",prop:"driverName",width:"100",fixed:!1}]}},computed:l()({},Object(p.mapGetters)(["otherinfo"]),{settlementId:function(){return this.$route.query.settlementId},orgId:function(){return this.$route.query.orgId},recordId:function(){return this.$route.query.recordId},cashSearchQuery:function(){return console.log("cashSearchQuery",JSON.parse(this.$route.query.searchQuery)),JSON.parse(this.$route.query.searchQuery)}}),methods:(o={classLineRed:function(e,t){return 0===e.row.billRecordStatus?"lineRed":""},getSearchParam:function(e){this.searchQuery.currentPage=this.$options.data().searchQuery.currentPage,this.searchQuery.pageSize=this.$options.data().searchQuery.pageSize,this.searchQuery.vo=a()({},e),this.fetchList()},handlePageChange:function(e){this.searchQuery.currentPage=e.pageNum,this.searchQuery.pageSize=e.pageSize,this.fetchList()},fetchList:function(){var t=this;this.$route.query&&(this.$route.query.searchQuery&&(this.searchQuery=JSON.parse(this.$route.query.searchQuery)),this.$set(this.searchQuery.vo,"recordId",this.$route.query.recordId),console.log("searchQuery",this.searchQuery),Object(m.h)(this.searchQuery).then(function(e){t.tablekey=(new Date).getTime(),t.dataListTop=e.list,t.total=e.total,t.loading=!1,setTimeout(function(){0===t.dataListTop.length&&(t.$message.info("已更新更新财务日记账数据！"),t.eventBus.$emit("closeCurrentView"),t.$router.push({path:"./financeDaily"}))},500)}).catch(function(e){t.loading=!1,t._handlerCatchMsg(e)}))},setTable:function(){},doAction:function(e){var t=!1;0===this.selectedList.length&&"export"!==e&&"print"!==e&&"income"!==e&&"edit"!==e?(t=!1,this.$message({type:"warning",message:"请选择一条数据"})):t=!0;var i=this.dataListTop.filter(function(e){return 0!==e.billRecordStatus});switch(e){case"income":t&&this.income();break;case"edit":t&&this.doEdit();break;case"backCount":t&&this.backCount();break;case"export":Object(b.g)({data:0<this.selectedList.length?this.selectedList:i,columns:this.tableColumn,name:"资金流水明细-"+Object(u.parseTime)(new Date,"{y}{m}{d}{h}{i}{s}")});break;case"print":Object(b.d)({data:0<this.selectedList.length?this.selectedList:i,columns:this.tableColumn,name:"资金流水明细"})}},doEdit:function(){var t=this;Object(m.c)({id:this.recordId}).then(function(e){"已审核"!==(t.currentInfo=e).verifyStatusZh?(t.isModify=!0,t.popVisibleIncome=!0):t.$message.warning("凭证【 "+e.verifyStatusZh+" 】不可修改"),t.$refs.multipleTable.clearSelection()})},backCount:function(){var i=this;console.log("selectedList",this.selectedList);var o=a()([],this.selectedList).filter(function(e){return"未审核"===e.verifyStatusZh&&"核销产生"===e.dataSrcZh}),e=o.length;this.selectedList.length!==e&&this.$message.warning("凭证【已审核】和【手工录入】不可反核销"),0===e?this.$refs.multipleTable.clearSelection():this.$confirm("确定要反核销吗？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){var t=[];o.forEach(function(e){t.push({id:e.id,recordDetailId:e.recordDetailId})}),i.loading=!0;var e={id:i.recordId,feesList:t};Object(m.a)(e).then(function(e){i.loading=!1,i.$message.success("反核销成功！"),i.fetchList(),i.$refs.multipleTable.clearSelection(),console.warn("dataListTop",i.dataListTop.length)}).catch(function(e){i.loading=!1,i.$message.error("反核销失败！"),i.$refs.multipleTable.clearSelection(),i._handlerCatchMsg(e)})}).catch(function(){})},clickDetails:function(e){this.$refs.multipleTable.toggleRowSelection(e)},getSelection:function(e){var i=this,o=0;this.selectedList=e.filter(function(e,t){return 0===e.billRecordStatus&&(o++,i.$refs.multipleTable.toggleRowSelection(e,!1)),0<o&&i.$message.warning("已经反核销的数据不可操作！"),0!==e.billRecordStatus}),this.selectListShipSns=[],this.selectedList.forEach(function(e,t){i.selectListShipSns.push(e.shipSn)})},income:function(){this.isModify=!1,this.popVisibleIncome=!0},setAddSuccess:function(){this.searchQuery.currentPage=this.$options.data().searchQuery.currentPage,this.searchQuery.pageSize=this.$options.data().searchQuery.pageSize,this.fetchList()},closeDialogIncome:function(){this.popVisibleIncome=!1}},s()(o,"setTable",function(){this.setupTableVisible=!0}),s()(o,"closeSetupTable",function(){this.setupTableVisible=!1}),s()(o,"setColumn",function(e){this.tableColumn=e,this.tablekey=Math.random()}),o)}},msh6:function(e,t,i){"use strict";var o={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-dialog",{staticClass:"wzl_settleLogSave",attrs:{title:t.popTitle,visible:t.isShow,"close-on-click-modal":!1,"before-close":t.closeMe},on:{close:t.closeMe,"update:visible":function(e){t.isShow=e}}},[i("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:t.form,rules:t.rules,"label-width":t.formLabelWidth,inline:!0,"label-position":"right",size:"mini"}},[i("el-form-item",{attrs:{label:"名称：",prop:"queryKey"}},[i("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.form.queryKey,expression:"form.queryKey",modifiers:{trim:!0}}],attrs:{maxlength:20,placeholder:"请定义名称"},domProps:{value:t.form.queryKey},on:{input:function(e){e.target.composing||t.$set(t.form,"queryKey",e.target.value.trim())},blur:function(e){t.$forceUpdate()}}})])],1),t._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{type:"primary",disabled:0===t.form.queryKey.length},on:{click:function(e){t.submitForm("ruleForm")}}},[t._v("确 定")]),t._v(" "),i("el-button",{on:{click:t.closeMe}},[t._v("取 消")])],1)],1)},staticRenderFns:[]};t.a=o},nl9Y:function(e,t){},seR9:function(e,t,i){"use strict";var o=i("mvHQ"),r=i.n(o),s=i("t5DY"),n=i("0xDb");t.a={computed:{isShow:{get:function(){return this.popVisible},set:function(){}}},components:{},props:{popVisible:{type:Boolean,default:!1},dotInfo:[Object,Array],searchQuery:[Object,Array],isDepMain:{type:Boolean,default:!1},createrId:[Number,String],isModify:{type:Boolean,default:!1},isAccept:{type:Boolean,default:!1},proptitle:String,searchObj:{type:[Array,Object],default:function(){}},code:{type:String,default:""}},data:function(){return{form:{userId:"",orgId:"",menuCode:"",queryKey:"",queryContent:""},searchCreatTime:+new Date,pickOption2:"",formLabelWidth:"75px",tooltip:!1,rules:{},queryKey:"",checked1:!0,popTitle:"自定义标签",loading:!1,type:""}},mounted:function(){},watch:{orgid:function(e){this.form.orgid=e},popVisible:function(e){e&&(this.form.userId=this.otherinfo.userId,this.form.orgId=this.otherinfo.orgid,this.form.menuCode=this.code||this.$route.meta.code)}},methods:{reset:function(){this.$refs.ruleForm.resetFields()},closeMe:function(e){this.$emit("close"),this.reset(),"function"==typeof e&&e()},submitForm:function(e){var i=this;this.loading||this.$refs[e].validate(function(e){if(!e)return!1;i.loading=!0,i.form.queryContent=r()(i.searchObj);var t=Object(n.objectMerge2)({},i.form);console.log("addSave_data",t),Object(s.q)(t).then(function(e){i.loading=!1,i.$message({message:"保存成功~",type:"success"}),i.closeMe(),i.$emit("success")}).catch(function(e){i.loading=!1,i.$message.warning(e.text)})})}}}},sgRY:function(e,t){},"si/F":function(e,t){},tdtH:function(e,t,i){"use strict";var o=i("woOf"),s=i.n(o),r=i("o9X6"),n=i("Zjyc"),a=i("0xDb"),c=i("7nIZ"),l=i("E4LH"),u=i("UQm2");t.a={components:{SelectTree:r.a,Upload:n.a},props:{popVisible:{type:Boolean,default:!1},info:{type:Object,default:function(){}},isModify:{type:Boolean,default:!1}},watch:{popVisible:{handler:function(e,t){e&&this.init()},immediate:!0},isModify:{handler:function(e,t){},immediate:!0},info:{handler:function(e,t){}}},computed:{isShow:{get:function(){return this.popVisible},set:function(){}},isCheck:{get:function(){return!1},set:function(){}}},data:function(){var e=function(e,t,i){l.a.ENGLISH_AND_NUMBER.test(t)||""===t?i():i(new Error("只可以输入阿拉伯数字和字母, 最多可输入25位"))};return{btnLoading:!1,subjectOne:[],subjectTwo:[],subjectThree:[],subjectFour:[],verificationWay:[],btnsize:"mini",dialogTitle:"记账凭证",loading:!0,formModel:{picsPath:"",paymentsType:"1"},rules:{amount:[{required:!0,message:"不能为空",trigger:"blur"}],verificationId:[{required:!0,message:"不能为空",trigger:"blur"}],subjectOneId:[{required:!0,message:"不能为空",trigger:"blur"}],receiptNo:[{validator:e,trigger:"blur"}],invoiceNo:[{validator:e,trigger:"blur"}],checkNo:[{validator:e,trigger:"blur"}],manualCert:[{validator:e,trigger:"blur"}]},formModelTitle:"现金记账凭证【出纳】",searchQuery:{orgId:"",dataSrc:1},searchQuerySub:{orgId:"",parentId:"",subjectLevel:""}}},methods:{init:function(){this.verificationWay=[],this.isShow=!0,this.searchQuery.orgId=this.otherinfo.orgid,this.searchQuerySub.orgId=this.otherinfo.orgid,this.isModify?(this.formModel=s()({},this.info),console.log("paymentsType",this.formModel.paymentsType),this.$set(this.formModel,"paymentsType",this.formModel.paymentsType+""),this.initSubject(),this.getVeryficationList(),this.loading=!1):(this.getBaseInfo(),this.getFinanceSubjects()),console.log("formModel",this.formModel)},getVeryficationList:function(){var t=this;Object(c.f)({orgId:this.otherinfo.orgid}).then(function(e){e&&(t.verificationWay=e)}).catch(function(e){t._handlerCatchMsg(e)})},initSubject:function(){var t=this;this.getFinanceSubjects().then(function(){if(t.formModel.subjectOneId){if(!t.checkSubject(1)){for(var e in t.formModel)/^subject/.test(e)&&(t.formModel[e]="");return}t.getFinanceSubjects(2,t.formModel.subjectOneId).then(function(){if(t.formModel.subjectTwoId){if(!t.checkSubject(2)){for(var e in t.formModel)/(Four|Three|Two)/.test(e)&&(t.formModel[e]="");return}t.getFinanceSubjects(3,t.formModel.subjectTwoId).then(function(){if(t.formModel.subjectThreeId){if(!t.checkSubject(3)){for(var e in t.formModel)/(Four|Three)/.test(e)&&(t.formModel[e]="");return}t.getFinanceSubjects(4,t.formModel.subjectThreeId).then(function(){if(t.formModel.subjectFourId&&!t.checkSubject(4))return t.formModel.subjectFourId="",void(t.formModel.subjectFourName="")})}})}})}})},getBaseInfo:function(){var t=this;return this.$set(this.searchQuery,"dataSrc",1),this.$set(this.searchQuery,"companyId",this.otherinfo.companyId),Object(c.j)(this.searchQuery).then(function(e){e&&(t.formModel=e,t.formModel.orgId=t.otherinfo.orgid,t.formModel.paymentsType=t.$options.data().formModel.paymentsType,t.verificationWay=e.verificationList,console.log("getBaseInfo",e),t.loading=!1)}).catch(function(e){t._handlerCatchMsg(e),t.loading=!1})},checkSubject:function(e){var t=this;switch(e){case 1:if(0<this.subjectOne.length)return 0!==this.subjectOne.filter(function(e){return e.id===t.formModel.subjectOneId}).length||(this.formModel.subjectOneId="",this.formModel.subjectOneName="",!1);console.warn("subjectTwoRule3",this.subjectTwoRule);break;case 2:if(0<this.subjectTwo.length)return 0!==this.subjectTwo.filter(function(e){return e.id===t.formModel.subjectTwoId}).length||(this.formModel.subjectTwoId="",this.formModel.subjectTwoName="",!1);break;case 3:if(0<this.subjectThree.length)return 0!==this.subjectThree.filter(function(e){return e.id===t.formModel.subjectThreeId}).length||(this.formModel.subjectThreeId="",this.formModel.subjectThreeName="",!1);break;case 4:if(0<this.subjectFour.length)return 0!==this.subjectFour.filter(function(e){return e.id===t.formModel.subjectFourId}).length||(this.formModel.subjectFourId="",this.formModel.subjectFourName="",!1)}},getFinanceSubjects:function(t,e){var i=this;for(var o in console.warn("getFinanceSubjects 科目",t,e),this.formModel)/^subject/.test(o)&&console.log(o,this.formModel[o]);return this.searchQuerySub.subjectLevel=t||"",this.searchQuerySub.parentId=e||"",Object(c.d)(this.searchQuerySub).then(function(e){switch(t){case 2:i.subjectTwo=e,i.subjectThree=[],i.subjectFour=[],console.log("科目二: ",i.subjectTwo),i.subjectTwo.forEach(function(e,t){console.log(t,e.id)});break;case 3:i.subjectThree=e,i.subjectFour=[],console.log("科目三: ",i.subjectThree),i.subjectThree.forEach(function(e,t){console.log(t,e.id)});break;case 4:i.subjectFour=e,console.log("科目四: ",i.subjectFour),i.subjectFour.forEach(function(e,t){console.log(t,e.id)});break;default:i.subjectOne=e,i.subjectTwo=[],i.subjectThree=[],i.subjectFour=[],console.log("科目一: ",i.subjectOne),i.subjectOne.forEach(function(e,t){console.log(t,e.id)})}}).catch(function(e){i._handlerCatchMsg(e)})},selectSubject:function(t,e){console.log(t);var i={};switch(e){case 1:for(var o in i=s()({},this.subjectOne.filter(function(e){return e.id===t})[0]),this.getFinanceSubjects(2,i.id),this.formModel)/^subject/.test(o)&&(this.formModel[o]="");this.formModel.subjectOneName=i.subjectName,this.formModel.subjectOneId=i.id,console.log("科目一 选中的值",i);break;case 2:for(var r in i=s()({},this.subjectTwo.filter(function(e){return e.id===t})[0]),this.getFinanceSubjects(3,i.id),this.formModel)/(Four|Three)/.test(r)&&(this.formModel[r]="");this.formModel.subjectTwoName=i.subjectName,console.log("科目二 选中的值",i);break;case 3:i=s()({},this.subjectThree.filter(function(e){return e.id===t})[0]),this.getFinanceSubjects(4,i.id),this.formModel.subjectThreeName=i.subjectName,this.formModel.subjectFourName="",this.formModel.subjectFourId="",console.log("科目三 选中的值",i);break;case 4:i=s()({},this.subjectFour.filter(function(e){return e.id===t})[0]),this.formModel.subjectFourName=i.subjectName}i={},console.log("formModel",this.formModel)},selectVerificationWay:function(t){console.log("selectVerificationWay",t);var e=s()({},this.verificationWay.filter(function(e){return e.id===t})[0]);this.formModel.verificationWay=e.verificationWay,console.log(this.formModel)},checkSubjectIsNull:function(){return!(0<this.subjectTwo.length)||(this.formModel.subjectTwoId?!(0<this.subjectThree.length)||(this.formModel.subjectThreeId?!(0<this.subjectFour.length)||(!!this.formModel.subjectFourId||(this.$message.warning("请填写四级科目"),!1)):(this.$message.warning("请填写三级科目"),!1)):(this.$message.warning("请填写二级科目!"),!1))},submitForm:function(e,i){var o=this;if(!this.formModel.certNo&&"1"===this.formModel.isNeededVoucher)return this.$message.error("缺少凭证编号"),void this.getBaseInfo();this.checkSubjectIsNull()&&this.$refs[e].validate(function(e){if(e){o.btnLoading=!0,o.loading=!0;var t=s()({},o.formModel);t.certTime||(t.certTime=new Date),o.$set(t,"certTime",Object(a.parseTime)(t.certTime,"{y}-{m}-{d}")+" 00:00:00"),o.$set(t,"dataSrc",t.id?t.dataSrc:1),o.isModify||(o.$set(t,"orderList",[]),t.orderList.push({shipLoadId:"",manualAmount:t.amount,subjectName:"",subjectId:""})),i&&(o.print(),o.loading=!1),console.log("query:::",t),delete t.verificationList,Object(c.g)(t).then(function(e){t={},o.closeMe(),o.$message.success("保存成功！"),o.$emit("success"),o.loading=!1,o.btnLoading=!1}).catch(function(e){o._handlerCatchMsg(e),o.loading=!1,o.btnLoading=!1})}})},print:function(){var e="?",t=s()({},this.formModel);for(var i in this.$set(t,"orgName",this.otherinfo.orgName),this.$set(t,"certTypeName","1"===t.certType?"冲销":"正常"),t.paymentsTypeZh="1"===t.paymentsType?"支出":"收入",t)e+=i+"="+(null===t[i]||void 0===t[i]||""===t[i]?"无":t[i])+"&";var o=window.location.protocol+"//"+window.location.host+"/static/print/voucher.html"+e+(new Date).getTime();Object(u.c)(encodeURI(o),"voucher")},setting:function(){this.$router.push({path:"/finance/financeInfo/subjectInfo"})},closeMe:function(){this.$emit("close"),"function"==typeof done&&done()}}}},us2a:function(e,t,i){"use strict";var o=i("t5DY"),r=i("SjYS");t.a={components:{addSave:r.a},props:{searchObj:{type:[Object,Array]},value:[String,Number],code:{type:String,default:""}},data:function(){return{isModify:!1,popVisible:!1,setupTableVisible:!1,dataset:[],datalist:"",timeout:null,loading:!1,options4:[],querySearch:{currentPage:1,pageSize:10,vo:{orgId:"",userId:"",menuCode:""}}}},computed:{hasCode:function(){return this.code||this.$route.meta.code||""}},watch:{value:function(e){console.log("nnn:",e),""===e&&(this.datalist="")},searchObj:{handler:function(e,t){this.$nextTick(function(){console.log("searchAll_cval",e,t)})},deep:!0}},mounted:function(){},methods:{initdata:function(){var t=this;this.inited||(this.inited=!0,this.loading=!0,this.fetchAllloadAll().then(function(e){t.loading=!1}))},deleteItem:function(e){var t=this;Object(o.a)(e).then(function(e){t.fetchAllloadAll()}).catch(function(e){t._handlerCatchMsg(e)})},Custom:function(){this.isModify=!0,this.popVisible=!0},closeAddDot:function(){this.popVisible=!1},fetchAllloadAll:function(){var t=this;return this.querySearch.vo.orgId=this.otherinfo.orgid,this.querySearch.vo.userId=this.otherinfo.userId,this.querySearch.vo.menuCode=this.code||this.$route.meta.code,Object(o.p)(this.querySearch).then(function(e){t.dataset=e.list,t.options4=e.list})},querySearchAsync:function(e,t){var i=this.dataset,o=e?i.filter(this.createStateFilter(e)):i;t(this.options4=o)},createStateFilter:function(t){return function(e){return 0===e.queryKey.toLowerCase().indexOf(t.toLowerCase())}},handleSelect:function(t){var e=this.options4.filter(function(e){return e.id===t});if(e.length){var i=e[0].queryContent,o=JSON.parse(i);this.$emit("change",JSON.parse(i.replace(/'/g,'"'))),this.$emit("dataObj",o)}}}}},wgpT:function(e,t,i){"use strict";var o={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-dialog",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:" incomeDialog",attrs:{title:t.dialogTitle,visible:t.isShow,"close-on-click-modal":!1,"before-close":t.closeMe},on:{"update:visible":function(e){t.isShow=e}}},[i("h4",{staticClass:"income_title"},[t._v(t._s(t.formModelTitle))]),t._v(" "),i("el-form",{ref:"formModel",attrs:{model:t.formModel,rules:t.rules,inline:!0,"label-width":"120px"}},[i("div",{staticClass:"income_item"},[i("el-form-item",{attrs:{label:"记账网点"}},[i("SelectTree",{attrs:{orgid:t.otherinfo.orgid,size:t.btnsize},model:{value:t.formModel.orgId,callback:function(e){t.$set(t.formModel,"orgId",e)},expression:"formModel.orgId"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"凭证编号",prop:"certNo"}},[i("el-input",{attrs:{placeholder:"凭证编号",size:t.btnsize,disabled:""},model:{value:t.formModel.certNo,callback:function(e){t.$set(t.formModel,"certNo",e)},expression:"formModel.certNo"}})],1),t._v(" "),i("el-form-item")],1),t._v(" "),i("div",{staticClass:"income_item_line"}),t._v(" "),i("div",{staticClass:"income_item"},[i("el-form-item",{attrs:{label:"记账方向"}},[i("el-select",{attrs:{placeholder:"请选择",size:t.btnsize,disabled:0===t.formModel.dataSrc},model:{value:t.formModel.paymentsType,callback:function(e){t.$set(t.formModel,"paymentsType",e)},expression:"formModel.paymentsType"}},t._l(t.$const.SETTLEMENT_ID,function(e,t){return i("el-option",{key:t,attrs:{value:t,label:e}})}))],1),t._v(" "),i("el-form-item",{attrs:{label:"凭证日期",prop:"certTime"}},[i("el-date-picker",{attrs:{type:"date",size:t.btnsize,placeholder:"选择日期",clearable:!1},model:{value:t.formModel.certTime,callback:function(e){t.$set(t.formModel,"certTime",e)},expression:"formModel.certTime"}})],1),t._v(" "),i("el-form-item",{staticClass:"formItemTextDanger",attrs:{label:"去向",prop:"verificationId"}},[i("el-select",{attrs:{clearable:"",filterable:"",placeholder:"请选择",size:t.btnsize},on:{change:t.selectVerificationWay},model:{value:t.formModel.verificationId,callback:function(e){t.$set(t.formModel,"verificationId",e)},expression:"formModel.verificationId"}},t._l(t.verificationWay,function(e,t){return i("el-option",{key:t,attrs:{label:e.verificationWay,value:e.id}})}))],1)],1),t._v(" "),i("div",{staticClass:"income_item"},[i("el-form-item",{class:{formItemTextDanger:"1"===t.formModel.isNeededVoucher},attrs:{label:"一级科目",prop:"1"===t.formModel.isNeededVoucher?"subjectOneId":""}},[i("el-select",{attrs:{filterable:"",placeholder:"请选择",size:t.btnsize,disabled:"1"!==t.formModel.isNeededVoucher},on:{change:function(e){return t.selectSubject(e,1)}},model:{value:t.formModel.subjectOneId,callback:function(e){t.$set(t.formModel,"subjectOneId",e)},expression:"formModel.subjectOneId"}},t._l(t.subjectOne,function(e,t){return i("el-option",{key:t,attrs:{label:e.subjectName,value:e.id}})}))],1),t._v(" "),i("el-form-item",{class:0<t.subjectTwo.length?"formItemTextDanger":"",attrs:{label:"二级科目",prop:"subjectTwoId"}},[i("el-select",{attrs:{clearable:"",filterable:"",placeholder:"请选择",size:t.btnsize,disabled:"1"!==t.formModel.isNeededVoucher},on:{change:function(e){return t.selectSubject(e,2)}},model:{value:t.formModel.subjectTwoId,callback:function(e){t.$set(t.formModel,"subjectTwoId",e)},expression:"formModel.subjectTwoId"}},t._l(t.subjectTwo,function(e,t){return i("el-option",{key:t,attrs:{label:e.subjectName,value:e.id}})}))],1),t._v(" "),i("el-form-item",{class:0<t.subjectThree.length?"formItemTextDanger":"",attrs:{label:"三级科目"}},[i("el-select",{attrs:{clearable:"",filterable:"",placeholder:"请选择",size:t.btnsize,disabled:"1"!==t.formModel.isNeededVoucher},on:{change:function(e){return t.selectSubject(e,3)}},model:{value:t.formModel.subjectThreeId,callback:function(e){t.$set(t.formModel,"subjectThreeId",e)},expression:"formModel.subjectThreeId"}},t._l(t.subjectThree,function(e,t){return i("el-option",{key:t,attrs:{label:e.subjectName,value:e.id}})}))],1)],1),t._v(" "),i("div",{staticClass:"income_item"},[i("el-form-item",{class:0<t.subjectFour.length?"formItemTextDanger":"",attrs:{label:"四级科目"}},[i("el-select",{attrs:{clearable:"",filterable:"",placeholder:"请选择",size:t.btnsize,disabled:"1"!==t.formModel.isNeededVoucher},on:{change:function(e){return t.selectSubject(e,4)}},model:{value:t.formModel.subjectFourId,callback:function(e){t.$set(t.formModel,"subjectFourId",e)},expression:"formModel.subjectFourId"}},t._l(t.subjectFour,function(e,t){return i("el-option",{key:t,attrs:{label:e.subjectName,value:e.id}})}))],1),t._v(" "),i("el-form-item",{attrs:{label:"凭证类别"}},[i("el-select",{attrs:{filterable:"",placeholder:"请选择",size:t.btnsize},model:{value:t.formModel.certType,callback:function(e){t.$set(t.formModel,"certType",e)},expression:"formModel.certType"}},t._l(t.$const.CERT_TYPE,function(e,t){return i("el-option",{key:t,attrs:{value:t,label:e}})}))],1),t._v(" "),i("el-form-item",{staticClass:"formItemTextDanger",attrs:{label:"发生金额",prop:"amount"}},[i("el-input",{directives:[{name:"numberOnly",rawName:"v-numberOnly:point",arg:"point"}],attrs:{placeholder:"发生金额",size:t.btnsize,maxlength:8,disabled:"核销产生"===t.formModel.dataSrcZh},model:{value:t.formModel.amount,callback:function(e){t.$set(t.formModel,"amount",t._n(e))},expression:"formModel.amount"}})],1)],1),t._v(" "),i("div",{staticClass:"income_item_line"}),t._v(" "),i("div",{staticClass:"income_item"},[i("el-form-item",{attrs:{label:"收据号码",prop:"receiptNo"}},[i("el-input",{attrs:{placeholder:"收据号码",size:t.btnsize,maxlength:25},model:{value:t.formModel.receiptNo,callback:function(e){t.$set(t.formModel,"receiptNo",e)},expression:"formModel.receiptNo"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"发票号码",prop:"invoiceNo"}},[i("el-input",{attrs:{placeholder:"发票号码",size:t.btnsize,maxlength:25},model:{value:t.formModel.invoiceNo,callback:function(e){t.$set(t.formModel,"invoiceNo",e)},expression:"formModel.invoiceNo"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"支票号码",prop:"checkNo"}},[i("el-input",{attrs:{placeholder:"支票号码",size:t.btnsize,maxlength:25},model:{value:t.formModel.checkNo,callback:function(e){t.$set(t.formModel,"checkNo",e)},expression:"formModel.checkNo"}})],1)],1),t._v(" "),i("div",{staticClass:"income_item"},[i("el-form-item",{attrs:{label:"手工凭证",prop:"manualCert"}},[i("el-input",{attrs:{placeholder:"手工凭证",size:t.btnsize,maxlength:25},model:{value:t.formModel.manualCert,callback:function(e){t.$set(t.formModel,"manualCert",e)},expression:"formModel.manualCert"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"摘要"}},[i("el-input",{attrs:{placeholder:"摘要",size:t.btnsize,maxlength:50},model:{value:t.formModel.remark,callback:function(e){t.$set(t.formModel,"remark",e)},expression:"formModel.remark"}})],1),t._v(" "),i("el-form-item")],1),t._v(" "),i("div",{staticClass:"income_item_line"}),t._v(" "),i("div",{staticClass:"income_item_row"},[i("p",{staticStyle:{"margin-left":"15px"}},[t._v("图片上传\n        "),i("el-tag",{attrs:{size:t.btnsize}},[t._v("注：最多可上传5张图片，每张图片不能大于5M")])],1),t._v(" "),i("el-form-item",{staticClass:"clearfix"},[i("div",{staticClass:"clearfix uploadcard"},[i("Upload",{attrs:{title:"本地上传",showFileList:!0,limit:5,listtype:"picture",disabled:t.isCheck},model:{value:t.formModel.picsPath,callback:function(e){t.$set(t.formModel,"picsPath",e)},expression:"formModel.picsPath"}})],1)])],1),t._v(" "),i("div",{staticClass:"income_item_line"})]),t._v(" "),i("span",{attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{type:"primary",plain:"",icon:"el-icon-document",loading:t.btnLoading},on:{click:function(e){t.submitForm("formModel")}}},[t._v("保存")]),t._v(" "),i("el-button",{attrs:{type:"success",plain:"",icon:"el-icon-printer",loading:t.btnLoading},on:{click:function(e){t.submitForm("formModel","print")}}},[t._v("保存并打印")]),t._v(" "),"1"===t.formModel.isNeededVoucher?i("el-button",{attrs:{type:"warning",plain:"",icon:"el-icon-setting"},on:{click:t.setting}},[t._v("设置财务科目")]):t._e(),t._v(" "),i("el-button",{attrs:{type:"danger",plain:"",icon:"el-icon-circle-close"},on:{click:t.closeMe}},[t._v("取消")])],1)],1)},staticRenderFns:[]};t.a=o},z3tb:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=i("gcKE"),r=i("dYKW");var s=function(e){i("sgRY")},n=i("VU/8")(o.a,r.a,s,null,null);t.default=n.exports}});