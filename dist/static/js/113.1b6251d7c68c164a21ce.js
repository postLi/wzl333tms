webpackJsonp([113,168],{"/vQs":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a("jpWh"),s=a("iRzY"),r=a("VU/8")(i.a,s.a,null,null,null);t.default=r.exports},"8UOW":function(e,t,a){"use strict";var i=a("us2a"),s=a("fyBF");var r=function(e){a("Qhr/")},o=a("VU/8")(i.a,s.a,r,null,null);t.a=o.exports},CaeW:function(e,t,a){"use strict";t.c=function(e,t){return s.b.post("/api-finance/finance/feeReceivable/v1/create/"+e,t)},t.b=function(e){return s.b.post("/api-finance/finance/feeReceivable/v1/list",e).then(function(e){return e.data||{list:[],totalCount:0}})},t.a=function(){return s.b.get("/api-finance/finance/feeReceivable/v1/getReceivableToDoCount")};var i=a("//Fk"),s=(a.n(i),a("Vo7i"))},Mo7Y:function(e,t,a){"use strict";var i=a("woOf"),s=a.n(i),r=a("mvHQ"),o=a.n(r),n=a("CaeW"),l=a("/vQs"),c=a("puNT"),h=a("1onU"),u=a("Mqi+"),d=a("0xDb"),p=a("UQm2");t.a={components:{SearchForm:l.default,Pager:h.a,TableSetup:c.a},mounted:function(){},data:function(){var a=this;return{btnsize:"mini",usersArr:[],total:0,loading:!0,setupTableVisible:!1,isModify:!1,selectInfo:{},selected:[],searchQuery:{currentPage:1,pageSize:100,vo:{shipFromOrgid:"",endTime:"",startTime:"",senderName:"",senderCompanyName:"",shipFromCityCode:"",shipToCityCode:"",ascriptionOrgId:"",shipSn:"",status:"NOSETTLEMENT",feeType:1}},tablekey:"",tableColumn:[{label:"序号",prop:"",fixed:!0,slot:function(e){return e.$index+1}},{label:"开单网点",prop:"shipFromOrgName",fixed:!0},{label:"运单号",prop:"shipSn",width:120},{label:"货号",prop:"shipGoodsSn",width:"150"},{label:"运单标识",prop:"shipIdentifying",slot:function(e){return Object(u.b)(e.row.shipIdentifying)}},{label:"签收状态",prop:"signStatus",width:"100",fixed:!1},{label:"发站",prop:"shipFromCityName"},{label:"到站",prop:"shipToCityName"},{label:"核销状态",prop:"nowPayStateCn"},{label:"现付",width:"100",prop:"nowPayFee"},{label:"已核销现付",prop:"finishNowPayFee",slot:function(e){var t=e.row;return a._setTextColor(t.nowPayFee,t.finishNowPayFee,t.notNowPayFee,t.finishNowPayFee)}},{label:"未核销现付",prop:"notNowPayFee",slot:function(e){var t=e.row;return a._setTextColor(t.nowPayFee,t.finishNowPayFee,t.notNowPayFee,t.notNowPayFee)}},{label:"开单日期",prop:"createTime",width:180},{label:"发货方",prop:"senderCustomerUnit"},{label:"发货人",prop:"shipSenderName"},{label:"收货方",prop:"receiverCustomerUnit"},{label:"收货人",prop:"shipReceiverName"},{label:"货品名",prop:"cargoName"},{label:"件数",prop:"cargoAmount"},{label:"重量(kg)",prop:"cargoWeight"},{label:"体积(方)",prop:"cargoVolume"},{label:"付款方式",prop:"shipPayWay"},{label:"制单人",prop:"userName"},{label:"发货人电话",prop:"senderMobile"},{label:"发货人地址",prop:"senderAddr"},{label:"收货人电话",prop:"receiverMoblie"},{label:"收货地址",prop:"receiverAddr"},{label:"交接方式",prop:"shipDeliveryMethod"},{label:"时效",prop:"shipEffectiveName"},{label:"运单备注",prop:"shipRemarks"}]}},methods:{viewDetails:function(){var a=[];this.selected.forEach(function(e,t){a.push(e.shipSn)});var e=Object(d.objectMerge2)(this.searchQuery);e.vo.ascriptionOrgId=e.vo.shipFromOrgid,console.log("传给核销页面的数据:::query",this.searchQuery,a),this.$router.push({path:"/finance/accountsLoadReceivable",query:{tab:"现付核销",currentPage:"cash",searchQuery:o()(e),selectListShipSns:o()(a)}})},showDetail:function(e){this.viewDetails([e])},fetchAllOrder:function(){var t=this;this.loading=!0;var e=Object(d.objectMerge2)(this.searchQuery);return e.vo.ascriptionOrgId=e.vo.shipFromOrgid,n.b(e).then(function(e){t.usersArr=e.list,t.total=e.total,t.loading=!1}).catch(function(e){t.loading=!1,t._handlerCatchMsg(e)})},fetchData:function(){this.fetchAllOrder()},handlePageChange:function(e){this.searchQuery.currentPage=e.pageNum,this.searchQuery.pageSize=e.pageSize,this.fetchData()},getSearchParam:function(e){this.searchQuery.currentPage=this.$options.data().searchQuery.currentPage,this.searchQuery.pageSize=this.$options.data().searchQuery.pageSize,this.searchQuery.vo=s()(this.searchQuery.vo,e),this.loading=!1,this.fetchData()},doAction:function(e){if(!this.selected.length&&"add"!==e&&"export"!==e&&"print"!==e)return this.$message({message:"请选择要操作的项~",type:"warning"}),!1;switch(console.log("this.selected:",this.selected),e){case"detail":this.isModify=!1,this.selectInfo={},this.showDetail(this.selected[0]);break;case"export":Object(p.g)({data:this.selected.length?this.selected:this.usersArr,columns:this.tableColumn,name:"现付应收账款-"+Object(d.parseTime)(new Date,"{y}{m}{d}{h}{i}{s}")});break;case"print":Object(p.d)({data:this.selected.length?this.selected:this.usersArr,columns:this.tableColumn,name:"现付应收账款"})}this.$refs.multipleTable.clearSelection()},setTable:function(){this.setupTableVisible=!0},closeSetupTable:function(){this.setupTableVisible=!1},setColumn:function(e){this.tableColumn=e,this.tablekey=Math.random()},clickDetails:function(e,t,a){this.$refs.multipleTable.toggleRowSelection(e)},getSelection:function(e){this.selected=e},getSummaries:function(e){return Object(d.getSummaries)(e)}}}},"Qhr/":function(e,t){},SjYS:function(e,t,a){"use strict";var i=a("seR9"),s=a("msh6");var r=function(e){a("nl9Y")},o=a("VU/8")(i.a,s.a,r,null,null);t.a=o.exports},dztK:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a("Mo7Y"),s=a("pr5O"),r=a("VU/8")(i.a,s.a,null,null,null);t.default=r.exports},fyBF:function(e,t,a){"use strict";var i={render:function(){var a=this,e=a.$createElement,i=a._self._c||e;return a.hasCode?i("div",{staticClass:"searchAll_lyy"},[i("el-form-item",{staticClass:"zdycx",attrs:{label:"自定义查询"}},[i("el-select",{attrs:{filterable:"",placeholder:"请选择","filter-method":a.querySearchAsync,"popper-class":"zdycx-pop",loading:a.loading},on:{change:a.handleSelect,focus:a.initdata},model:{value:a.datalist,callback:function(e){a.datalist=e},expression:"datalist"}},a._l(a.options4,function(t,e){return i("el-option",{key:e,attrs:{label:t.queryKey,value:t.id}},[a._v("\r\n        "+a._s(t.queryKey)+" "),i("i",{staticClass:"el-icon-circle-close-outline",on:{click:function(e){e.stopPropagation(),e.preventDefault(),a.deleteItem(t)}}})])})),a._v(" "),i("el-button",{attrs:{plain:""},on:{click:a.Custom}},[a._v("保存自定义")])],1),a._v(" "),i("addSave",{attrs:{code:a.hasCode,searchObj:a.searchObj,popVisible:a.popVisible},on:{close:a.closeAddDot,success:a.fetchAllloadAll}})],1):a._e()},staticRenderFns:[]};t.a=i},iRzY:function(e,t,a){"use strict";var i={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-form",{staticClass:"staff_searchinfo feeReceivableSearch clearfix",attrs:{inline:!0,size:t.btnsize,"label-position":"right",model:t.searchForm,"label-width":"70px"}},[a("div",{staticClass:"staff_searchinfo--input"},[a("el-form-item",{attrs:{label:"开单时间"}},[a("div",{staticClass:"block"},[a("el-date-picker",{attrs:{"default-value":t.defaultTime,type:"daterange","unlink-panels":"",align:"right","picker-options":t.pickerOptions2,"value-format":"yyyy-MM-dd","start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:t.searchCreatTime,callback:function(e){t.searchCreatTime=e},expression:"searchCreatTime"}})],1)]),t._v(" "),t.filter?a("el-form-item",{attrs:{label:"核销网点"}},[a("select-tree",{attrs:{orgid:t.otherinfo.orgid},model:{value:t.searchForm.ascriptionOrgId,callback:function(e){t.$set(t.searchForm,"ascriptionOrgId",e)},expression:"searchForm.ascriptionOrgId"}})],1):t._e(),t._v(" "),t.isShow?a("el-form-item",{attrs:{label:"开单网点"}},[a("select-tree",{model:{value:t.searchForm.shipFromOrgid,callback:function(e){t.$set(t.searchForm,"shipFromOrgid",e)},expression:"searchForm.shipFromOrgid"}})],1):t._e(),t._v(" "),a("el-form-item",{attrs:{label:"发货人"}},[a("el-input",{attrs:{clearable:""},model:{value:t.searchForm.senderName,callback:function(e){t.$set(t.searchForm,"senderName",e)},expression:"searchForm.senderName"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"发货方"}},[a("el-input",{attrs:{clearable:""},model:{value:t.searchForm.senderCompanyName,callback:function(e){t.$set(t.searchForm,"senderCompanyName",e)},expression:"searchForm.senderCompanyName"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"发站"}},[a("el-input",{attrs:{clearable:""},model:{value:t.searchForm.shipFromCityCode,callback:function(e){t.$set(t.searchForm,"shipFromCityCode",e)},expression:"searchForm.shipFromCityCode"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"到站"}},[a("el-input",{attrs:{clearable:""},model:{value:t.searchForm.shipToCityCode,callback:function(e){t.$set(t.searchForm,"shipToCityCode",e)},expression:"searchForm.shipToCityCode"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"运单号"}},[a("el-input",{attrs:{maxlength:"15",clearable:""},nativeOn:{keyup:function(e){t.validates("shipSn")}},model:{value:t.searchForm.shipSn,callback:function(e){t.$set(t.searchForm,"shipSn",e)},expression:"searchForm.shipSn"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"核销状态"}},[a("select-type",{attrs:{type:"count_status"},model:{value:t.searchForm.status,callback:function(e){t.$set(t.searchForm,"status",e)},expression:"searchForm.status"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"签收状态",prop:"signStatus"}},[a("selectType",{attrs:{type:"sign_status"},model:{value:t.searchForm.signStatus,callback:function(e){t.$set(t.searchForm,"signStatus",e)},expression:"searchForm.signStatus"}},[a("el-option",{attrs:{slot:"head",label:"全部",value:""},slot:"head"})],1)],1),t._v(" "),a("searchAll",{attrs:{searchObj:t.searchObjs},on:{dataObj:t.getDataObj},model:{value:t.searchAll,callback:function(e){t.searchAll=e},expression:"searchAll"}})],1),t._v(" "),a("el-form-item",{staticClass:"staff_searchinfo--btn"},[a("el-button",{attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v("查询")]),a("el-button",{attrs:{type:"info",plain:""},on:{click:t.clearForm}},[t._v("清空")])],1)],1)},staticRenderFns:[]};t.a=i},jpWh:function(e,t,a){"use strict";var i=a("woOf"),s=a.n(i),r=a("o9X6"),o=a("9UCZ"),n=a("0xDb"),l=a("8UOW");t.a={name:"handaccount-manage-search",components:{SelectTree:r.a,SelectType:o.a,searchAll:l.a},props:{btnsize:{type:String,default:"mini"},orgid:{type:Number},filter:{type:Boolean,default:!1},isShow:{type:Boolean,default:!0}},data:function(){return{searchAll:"1",searchCreatTime:[],searchObjs:{},defaultTime:[Object(n.parseTime)(+new Date-5184e6,"{y}-{m}-{d}"),Object(n.parseTime)(new Date,"{y}-{m}-{d}")],searchForm:{shipFromOrgid:"",endTime:"",startTime:"",senderName:"",senderCompanyName:"",shipFromCityCode:"",shipToCityCode:"",shipSn:"",ascriptionOrgId:"",status:"",signStatus:""},pickerOptions2:{shortcuts:n.pickerOptions2}}},watch:{orgid:function(e){this.searchForm.shipFromOrgid=e},searchCreatTime:function(e){e&&(this.$set(this.searchObjs,"startTime",Object(n.parseTime)(this.searchCreatTime[0],"{y}-{m}-{d} ")+"00:00:00"),this.$set(this.searchObjs,"endTime",Object(n.parseTime)(this.searchCreatTime[1],"{y}-{m}-{d} ")+"23:59:59"))},searchForm:{handler:function(e,t){this.searchObjs=s()({},e),this.searchCreatTime&&this.searchCreatTime[0]&&(this.searchObjs.startTime=this.searchCreatTime[0]+" 00:00:00",this.searchObjs.endTime=this.searchCreatTime[1]+" 23:59:59")},deep:!0}},mounted:function(){var e=this;this.searchCreatTime=this.defaultTime,this.searchForm.ascriptionOrgId=this.otherinfo.orgid,this.onSubmit(),this.eventBus.$on("updateAccountsReceivableList",function(){e.onSubmit()})},methods:{validates:function(e){this.$set(this.searchForm,e,this.searchForm[e].replace(/[^\d]/g,""))},getDataObj:function(e){this.searchCreatTime=[e.startTime,e.endTime],this.searchForm=s()({},e),this.$emit("change",e)},onSubmit:function(){var e=s()({},this.searchForm);this.searchCreatTime&&this.searchCreatTime[0]&&(e.startTime=this.searchCreatTime[0]+" 00:00:00",e.endTime=this.searchCreatTime[1]+" 23:59:59"),this.$emit("change",e)},clearForm:function(){var e=this;this.searchForm=this.$options.data().searchForm,this.searchCreatTime=this.defaultTime,this.searchForm.ascriptionOrgId=this.otherinfo.orgid,this.searchAll="1",setTimeout(function(){e.searchAll=""},50)}}}},msh6:function(e,t,a){"use strict";var i={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-dialog",{staticClass:"wzl_settleLogSave",attrs:{title:t.popTitle,visible:t.isShow,"close-on-click-modal":!1,"before-close":t.closeMe},on:{close:t.closeMe,"update:visible":function(e){t.isShow=e}}},[a("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:t.form,rules:t.rules,"label-width":t.formLabelWidth,inline:!0,"label-position":"right",size:"mini"}},[a("el-form-item",{attrs:{label:"名称：",prop:"queryKey"}},[a("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.form.queryKey,expression:"form.queryKey",modifiers:{trim:!0}}],attrs:{maxlength:20,placeholder:"请定义名称"},domProps:{value:t.form.queryKey},on:{input:function(e){e.target.composing||t.$set(t.form,"queryKey",e.target.value.trim())},blur:function(e){t.$forceUpdate()}}})])],1),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"primary",disabled:0===t.form.queryKey.length},on:{click:function(e){t.submitForm("ruleForm")}}},[t._v("确 定")]),t._v(" "),a("el-button",{on:{click:t.closeMe}},[t._v("取 消")])],1)],1)},staticRenderFns:[]};t.a=i},nl9Y:function(e,t){},pr5O:function(e,t,a){"use strict";var i={render:function(){var a=this,e=a.$createElement,i=a._self._c||e;return i("div",{directives:[{name:"loading",rawName:"v-loading",value:a.loading,expression:"loading"}],staticClass:"tab-content accountsReceivable-summary"},[i("SearchForm",{attrs:{orgid:a.otherinfo.orgid,btnsize:a.btnsize,isShow:!0},on:{change:a.getSearchParam}}),a._v(" "),i("div",{staticClass:"tab_info"},[i("div",{staticClass:"btns_box"},[i("el-button",{directives:[{name:"has",rawName:"v-has:REC_SET2",arg:"REC_SET2"}],attrs:{type:"success",size:a.btnsize,icon:"el-icon-sort",plain:""},on:{click:a.viewDetails}},[a._v("核销")]),a._v(" "),i("el-button",{directives:[{name:"has",rawName:"v-has:REC_PRI2",arg:"REC_PRI2"}],attrs:{type:"primary",size:a.btnsize,icon:"el-icon-edit-outline",plain:""},on:{click:function(e){a.doAction("print")}}},[a._v("打印")]),a._v(" "),i("el-button",{directives:[{name:"has",rawName:"v-has:REC_EXP2",arg:"REC_EXP2"}],attrs:{type:"primary",size:a.btnsize,icon:"el-icon-edit-outline",plain:""},on:{click:function(e){a.doAction("export")}}},[a._v("导出")]),a._v(" "),i("el-button",{staticClass:"table_setup",attrs:{type:"primary",size:a.btnsize,icon:"el-icon-setting",plain:""},on:{click:a.setTable}},[a._v("表格设置")])],1),a._v(" "),i("div",{staticClass:"info_tab"},[i("el-table",{key:a.tablekey,ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:a.usersArr,stripe:"",border:"",height:"100%","show-summary":"","summary-method":a.getSummaries,"tooltip-effect":"dark","default-sort":{prop:"id",order:"ascending"}},on:{"row-click":a.clickDetails,"row-dblclick":a.showDetail,"selection-change":a.getSelection}},[i("el-table-column",{attrs:{fixed:"",sortable:"",type:"selection",width:"80"}}),a._v(" "),a._l(a.tableColumn,function(t){return[t.slot?i("el-table-column",{key:t.id,attrs:{fixed:t.fixed,prop:t.prop,sortable:"",label:t.label,width:t.width},scopedSlots:a._u([{key:"default",fn:function(e){return[i("div",{staticClass:"td-slot",domProps:{innerHTML:a._s(t.slot(e))}})]}}])}):i("el-table-column",{key:t.id,attrs:{fixed:t.fixed,sortable:"",label:t.label,prop:t.prop,width:t.width}})]})],2)],1),a._v(" "),i("div",{staticClass:"info_tab_footer"},[a._v("共计:"+a._s(a.total)+" "),i("div",{staticClass:"show_pager"},[i("Pager",{attrs:{total:a.total},on:{change:a.handlePageChange}})],1)])]),a._v(" "),i("TableSetup",{attrs:{popVisible:a.setupTableVisible,columns:a.tableColumn},on:{close:a.closeSetupTable,success:a.setColumn}})],1)},staticRenderFns:[]};t.a=i},seR9:function(e,t,a){"use strict";var i=a("mvHQ"),s=a.n(i),r=a("t5DY"),o=a("0xDb");t.a={computed:{isShow:{get:function(){return this.popVisible},set:function(){}}},components:{},props:{popVisible:{type:Boolean,default:!1},dotInfo:[Object,Array],searchQuery:[Object,Array],isDepMain:{type:Boolean,default:!1},createrId:[Number,String],isModify:{type:Boolean,default:!1},isAccept:{type:Boolean,default:!1},proptitle:String,searchObj:{type:[Array,Object],default:function(){}},code:{type:String,default:""}},data:function(){return{form:{userId:"",orgId:"",menuCode:"",queryKey:"",queryContent:""},searchCreatTime:+new Date,pickOption2:"",formLabelWidth:"75px",tooltip:!1,rules:{},queryKey:"",checked1:!0,popTitle:"自定义标签",loading:!1,type:""}},mounted:function(){},watch:{orgid:function(e){this.form.orgid=e},popVisible:function(e){e&&(this.form.userId=this.otherinfo.userId,this.form.orgId=this.otherinfo.orgid,this.form.menuCode=this.code||this.$route.meta.code)}},methods:{reset:function(){this.$refs.ruleForm.resetFields()},closeMe:function(e){this.$emit("close"),this.reset(),"function"==typeof e&&e()},submitForm:function(e){var a=this;this.loading||this.$refs[e].validate(function(e){if(!e)return!1;a.loading=!0,a.form.queryContent=s()(a.searchObj);var t=Object(o.objectMerge2)({},a.form);console.log("addSave_data",t),Object(r.q)(t).then(function(e){a.loading=!1,a.$message({message:"保存成功~",type:"success"}),a.closeMe(),a.$emit("success")}).catch(function(e){a.loading=!1,a.$message.warning(e.text)})})}}}},us2a:function(e,t,a){"use strict";var i=a("t5DY"),s=a("SjYS");t.a={components:{addSave:s.a},props:{searchObj:{type:[Object,Array]},value:[String,Number],code:{type:String,default:""}},data:function(){return{isModify:!1,popVisible:!1,setupTableVisible:!1,dataset:[],datalist:"",timeout:null,loading:!1,options4:[],querySearch:{currentPage:1,pageSize:10,vo:{orgId:"",userId:"",menuCode:""}}}},computed:{hasCode:function(){return this.code||this.$route.meta.code||""}},watch:{value:function(e){""===e&&(this.datalist="")},searchObj:{handler:function(e,t){},deep:!0}},mounted:function(){},methods:{initdata:function(){var t=this;this.inited||(this.inited=!0,this.loading=!0,this.fetchAllloadAll().then(function(e){t.loading=!1}))},deleteItem:function(e){var t=this;Object(i.a)(e.id).then(function(e){t.fetchAllloadAll(),t.datalist&&(t.datalist="")}).catch(function(e){t._handlerCatchMsg(e)})},Custom:function(){this.isModify=!0,this.popVisible=!0},closeAddDot:function(){this.popVisible=!1},fetchAllloadAll:function(){var t=this;return this.querySearch.vo.orgId=this.otherinfo.orgid,this.querySearch.vo.userId=this.otherinfo.userId,this.querySearch.vo.menuCode=this.code||this.$route.meta.code,Object(i.p)(this.querySearch).then(function(e){t.dataset=e.list||[],t.options4=e.list||[]})},querySearchAsync:function(e,t){var a=this.dataset,i=e?a.filter(this.createStateFilter(e)):a;t(this.options4=i)},createStateFilter:function(t){return function(e){return 0===e.queryKey.toLowerCase().indexOf(t.toLowerCase())}},handleSelect:function(t){var e=this.options4.filter(function(e){return e.id===t});if(e.length){var a=e[0].queryContent,i=JSON.parse(a);this.$emit("change",JSON.parse(a.replace(/'/g,'"'))),this.$emit("dataObj",i)}}}}}});