webpackJsonp([112,164],{"/vQs":function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=i("jpWh"),s=i("iRzY"),r=i("VU/8")(a.a,s.a,null,null,null);t.default=r.exports},"8UOW":function(e,t,i){"use strict";var a=i("us2a"),s=i("fyBF");var r=function(e){i("Qhr/")},o=i("VU/8")(a.a,s.a,r,null,null);t.a=o.exports},CaeW:function(e,t,i){"use strict";t.c=function(e,t){return s.b.post("/api-finance/finance/feeReceivable/v1/create/"+e,t)},t.b=function(e){return s.b.post("/api-finance/finance/feeReceivable/v1/list",e).then(function(e){return e.data||{list:[],totalCount:0}})},t.a=function(){return s.b.get("/api-finance/finance/feeReceivable/v1/getReceivableToDoCount")};var a=i("//Fk"),s=(i.n(a),i("Vo7i"))},FaHG:function(e,t,i){"use strict";var a=i("woOf"),s=i.n(a),r=i("mvHQ"),o=i.n(r),n=i("CaeW"),l=i("/vQs"),c=i("puNT"),h=i("1onU"),u=i("Mqi+"),p=i("0xDb"),d=i("UQm2");t.a={components:{SearchForm:l.default,Pager:h.a,TableSetup:c.a},mounted:function(){},data:function(){var i=this;return{btnsize:"mini",usersArr:[],total:0,loading:!0,setupTableVisible:!1,isModify:!1,selectInfo:{},selected:[],searchQuery:{currentPage:1,pageSize:100,vo:{shipFromOrgid:"",endTime:"",startTime:"",senderName:"",senderCompanyName:"",shipFromCityCode:"",shipToCityCode:"",ascriptionOrgId:"",shipSn:"",status:"NOSETTLEMENT",feeType:2}},tablekey:"",tableColumn:[{label:"序号",prop:"",fixed:!0,slot:function(e){return e.$index+1}},{label:"开单网点",prop:"shipFromOrgName",fixed:!0},{label:"运单号",prop:"shipSn",width:120},{label:"货号",prop:"shipGoodsSn",width:"150"},{label:"运单标识",prop:"shipIdentifying",slot:function(e){return Object(u.b)(e.row.shipIdentifying)}},{label:"签收状态",prop:"signStatus",width:"100",fixed:!1},{label:"发站",prop:"shipFromCityName"},{label:"到站",prop:"shipToCityName"},{label:"核销状态",prop:"arrivepayStateCn"},{label:"到付",prop:"arrivepayFee"},{label:"已核销到付",prop:"finishArrivepayFee",slot:function(e){var t=e.row;return i._setTextColor(t.arrivepayFee,t.finishArrivepayFee,t.notArrivepayFee,t.finishArrivepayFee)}},{label:"未核销到付",prop:"notArrivepayFee",slot:function(e){var t=e.row;return i._setTextColor(t.arrivepayFee,t.finishArrivepayFee,t.notArrivepayFee,t.notArrivepayFee)}},{label:"开单日期",prop:"createTime",width:180},{label:"发货方",prop:"senderCustomerUnit"},{label:"发货人",prop:"shipSenderName"},{label:"收货方",prop:"receiverCustomerUnit"},{label:"收货人",prop:"shipReceiverName"},{label:"货品名",prop:"cargoName"},{label:"件数",prop:"cargoAmount"},{label:"重量(kg)",prop:"cargoWeight"},{label:"体积(方)",prop:"cargoVolume"},{label:"付款方式",prop:"shipPayWay"},{label:"制单人",prop:"userName"},{label:"发货人电话",prop:"senderMobile"},{label:"发货人地址",prop:"senderAddr"},{label:"收货人电话",prop:"receiverMoblie"},{label:"收货地址",prop:"receiverAddr"},{label:"交接方式",prop:"shipDeliveryMethod"},{label:"时效",prop:"shipEffectiveName"},{label:"运单备注",prop:"shipRemarks"}]}},methods:{viewDetails:function(e){e=e||[],console.log("row:",e.map(function(e){console.log("11")}).join(","));var t=Object(p.objectMerge2)(this.searchQuery);t.vo.ascriptionOrgId=t.vo.shipFromOrgid,this.$router.push({path:"/finance/accountsLoadReceivable",query:{tab:"到付核销",searchQuery:o()(t),currentPage:"arrive",selectListShipSns:o()(e.map(function(e){return e.shipSn}))}})},showDetail:function(e){this.viewDetails([e])},fetchAllOrder:function(){var t=this;return this.loading=!0,n.b(this.searchQuery).then(function(e){t.usersArr=e.list,t.total=e.total,t.loading=!1}).catch(function(e){t.loading=!1,t._handlerCatchMsg(e)})},fetchData:function(){this.fetchAllOrder()},handlePageChange:function(e){this.searchQuery.currentPage=e.pageNum,this.searchQuery.pageSize=e.pageSize,this.fetchData()},getSearchParam:function(e){this.searchQuery.currentPage=this.$options.data().searchQuery.currentPage,this.searchQuery.pageSize=this.$options.data().searchQuery.pageSize,this.searchQuery.vo=s()(this.searchQuery.vo,e),this.loading=!1,this.fetchData()},doAction:function(e){if(!this.selected.length&&"add"!==e&&"export"!==e&&"print"!==e)return this.$message({message:"请选择要操作的项~",type:"warning"}),!1;switch(console.log("this.selected:",this.selected),e){case"detail":this.isModify=!1,this.selectInfo={},this.showDetail(this.selected[0]);break;case"export":Object(d.g)({data:this.selected.length?this.selected:this.usersArr,columns:this.tableColumn,name:"到付应收账款-"+Object(p.parseTime)(new Date,"{y}{m}{d}{h}{i}{s}")});break;case"print":Object(d.d)({data:this.selected.length?this.selected:this.usersArr,columns:this.tableColumn,name:"到付应收账款"})}this.$refs.multipleTable.clearSelection()},setTable:function(){this.setupTableVisible=!0},closeSetupTable:function(){this.setupTableVisible=!1},setColumn:function(e){this.tableColumn=e,this.tablekey=Math.random()},clickDetails:function(e,t,i){this.$refs.multipleTable.toggleRowSelection(e)},getSelection:function(e){this.selected=e},getSummaries:function(e){return Object(p.getSummaries)(e)}}}},"Qhr/":function(e,t){},SjYS:function(e,t,i){"use strict";var a=i("seR9"),s=i("msh6");var r=function(e){i("nl9Y")},o=i("VU/8")(a.a,s.a,r,null,null);t.a=o.exports},fyBF:function(e,t,i){"use strict";var a={render:function(){var i=this,e=i.$createElement,a=i._self._c||e;return i.hasCode?a("div",{staticClass:"searchAll_lyy"},[a("el-form-item",{staticClass:"zdycx",attrs:{label:"自定义查询"}},[a("el-select",{attrs:{filterable:"",placeholder:"请选择","filter-method":i.querySearchAsync,"popper-class":"zdycx-pop",loading:i.loading},on:{change:i.handleSelect,focus:i.initdata},model:{value:i.datalist,callback:function(e){i.datalist=e},expression:"datalist"}},i._l(i.options4,function(t,e){return a("el-option",{key:e,attrs:{label:t.queryKey,value:t.id}},[i._v("\r\n        "+i._s(t.queryKey)+" "),a("i",{staticClass:"el-icon-circle-close-outline",on:{click:function(e){e.stopPropagation(),e.preventDefault(),i.deleteItem(t.id)}}})])})),i._v(" "),a("el-button",{attrs:{plain:""},on:{click:i.Custom}},[i._v("保存自定义")])],1),i._v(" "),a("addSave",{attrs:{code:i.hasCode,searchObj:i.searchObj,popVisible:i.popVisible},on:{close:i.closeAddDot,success:i.fetchAllloadAll}})],1):i._e()},staticRenderFns:[]};t.a=a},iRzY:function(e,t,i){"use strict";var a={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-form",{staticClass:"staff_searchinfo feeReceivableSearch clearfix",attrs:{inline:!0,size:t.btnsize,"label-position":"right",model:t.searchForm,"label-width":"70px"}},[i("div",{staticClass:"staff_searchinfo--input"},[i("el-form-item",{attrs:{label:"开单时间"}},[i("div",{staticClass:"block"},[i("el-date-picker",{attrs:{"default-value":t.defaultTime,type:"daterange",align:"right","picker-options":t.pickerOptions2,"value-format":"yyyy-MM-dd","start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:t.searchCreatTime,callback:function(e){t.searchCreatTime=e},expression:"searchCreatTime"}})],1)]),t._v(" "),t.filter?i("el-form-item",{attrs:{label:"核销网点"}},[i("select-tree",{attrs:{orgid:t.otherinfo.orgid},model:{value:t.searchForm.ascriptionOrgId,callback:function(e){t.$set(t.searchForm,"ascriptionOrgId",e)},expression:"searchForm.ascriptionOrgId"}})],1):t._e(),t._v(" "),t.isShow?i("el-form-item",{attrs:{label:"开单网点"}},[i("select-tree",{model:{value:t.searchForm.shipFromOrgid,callback:function(e){t.$set(t.searchForm,"shipFromOrgid",e)},expression:"searchForm.shipFromOrgid"}})],1):t._e(),t._v(" "),i("el-form-item",{attrs:{label:"发货人"}},[i("el-input",{attrs:{clearable:""},model:{value:t.searchForm.senderName,callback:function(e){t.$set(t.searchForm,"senderName",e)},expression:"searchForm.senderName"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"发货方"}},[i("el-input",{attrs:{clearable:""},model:{value:t.searchForm.senderCompanyName,callback:function(e){t.$set(t.searchForm,"senderCompanyName",e)},expression:"searchForm.senderCompanyName"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"发站"}},[i("el-input",{attrs:{clearable:""},model:{value:t.searchForm.shipFromCityCode,callback:function(e){t.$set(t.searchForm,"shipFromCityCode",e)},expression:"searchForm.shipFromCityCode"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"到站"}},[i("el-input",{attrs:{clearable:""},model:{value:t.searchForm.shipToCityCode,callback:function(e){t.$set(t.searchForm,"shipToCityCode",e)},expression:"searchForm.shipToCityCode"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"运单号"}},[i("el-input",{attrs:{maxlength:"15",clearable:""},nativeOn:{keyup:function(e){t.validates("shipSn")}},model:{value:t.searchForm.shipSn,callback:function(e){t.$set(t.searchForm,"shipSn",e)},expression:"searchForm.shipSn"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"核销状态"}},[i("select-type",{attrs:{type:"count_status"},model:{value:t.searchForm.status,callback:function(e){t.$set(t.searchForm,"status",e)},expression:"searchForm.status"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"签收状态",prop:"signStatus"}},[i("selectType",{attrs:{type:"sign_status"},model:{value:t.searchForm.signStatus,callback:function(e){t.$set(t.searchForm,"signStatus",e)},expression:"searchForm.signStatus"}},[i("el-option",{attrs:{slot:"head",label:"全部",value:""},slot:"head"})],1)],1),t._v(" "),i("searchAll",{attrs:{searchObj:t.searchObjs},on:{dataObj:t.getDataObj},model:{value:t.searchAll,callback:function(e){t.searchAll=e},expression:"searchAll"}})],1),t._v(" "),i("el-form-item",{staticClass:"staff_searchinfo--btn"},[i("el-button",{attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v("查询")]),i("el-button",{attrs:{type:"info",plain:""},on:{click:t.clearForm}},[t._v("清空")])],1)],1)},staticRenderFns:[]};t.a=a},jpWh:function(e,t,i){"use strict";var a=i("woOf"),s=i.n(a),r=i("o9X6"),o=i("9UCZ"),n=i("0xDb"),l=i("8UOW");t.a={name:"handaccount-manage-search",components:{SelectTree:r.a,SelectType:o.a,searchAll:l.a},props:{btnsize:{type:String,default:"mini"},orgid:{type:Number},filter:{type:Boolean,default:!1},isShow:{type:Boolean,default:!0}},data:function(){return{searchAll:"1",searchCreatTime:[],searchObjs:{},defaultTime:[Object(n.parseTime)(+new Date-5184e6,"{y}-{m}-{d}"),Object(n.parseTime)(new Date,"{y}-{m}-{d}")],searchForm:{shipFromOrgid:"",endTime:"",startTime:"",senderName:"",senderCompanyName:"",shipFromCityCode:"",shipToCityCode:"",shipSn:"",ascriptionOrgId:"",status:"",signStatus:""},pickerOptions2:{shortcuts:n.pickerOptions2}}},watch:{orgid:function(e){this.searchForm.shipFromOrgid=e},searchCreatTime:function(e){e&&(this.$set(this.searchObjs,"startTime",Object(n.parseTime)(this.searchCreatTime[0],"{y}-{m}-{d} ")+"00:00:00"),this.$set(this.searchObjs,"endTime",Object(n.parseTime)(this.searchCreatTime[1],"{y}-{m}-{d} ")+"23:59:59"))},searchForm:{handler:function(e,t){this.searchObjs=s()({},e),this.searchCreatTime&&this.searchCreatTime[0]&&(this.searchObjs.startTime=this.searchCreatTime[0]+" 00:00:00",this.searchObjs.endTime=this.searchCreatTime[1]+" 23:59:59")},deep:!0}},mounted:function(){var e=this;this.searchCreatTime=this.defaultTime,this.searchForm.ascriptionOrgId=this.otherinfo.orgid,this.onSubmit(),this.eventBus.$on("updateAccountsReceivableList",function(){e.onSubmit()})},methods:{validates:function(e){this.$set(this.searchForm,e,this.searchForm[e].replace(/[^\d]/g,""))},getDataObj:function(e){this.searchCreatTime=[e.startTime,e.endTime],this.searchForm=s()({},e),this.$emit("change",e)},onSubmit:function(){var e=s()({},this.searchForm);this.searchCreatTime&&this.searchCreatTime[0]&&(e.startTime=this.searchCreatTime[0]+" 00:00:00",e.endTime=this.searchCreatTime[1]+" 23:59:59"),this.$emit("change",e)},clearForm:function(){var e=this;this.searchForm=this.$options.data().searchForm,this.searchCreatTime=this.defaultTime,this.searchForm.ascriptionOrgId=this.otherinfo.orgid,this.searchAll="1",setTimeout(function(){e.searchAll=""},50)}}}},lbLu:function(e,t,i){"use strict";var a={render:function(){var i=this,e=i.$createElement,a=i._self._c||e;return a("div",{directives:[{name:"loading",rawName:"v-loading",value:i.loading,expression:"loading"}],staticClass:"tab-content accountsReceivable-summary"},[a("SearchForm",{attrs:{filter:!0,orgid:i.otherinfo.orgid,btnsize:i.btnsize},on:{change:i.getSearchParam}}),i._v(" "),a("div",{staticClass:"tab_info"},[a("div",{staticClass:"btns_box"},[a("el-button",{directives:[{name:"has",rawName:"v-has:REC_SET3",arg:"REC_SET3"}],attrs:{type:"success",size:i.btnsize,icon:"el-icon-sort",plain:""},on:{click:function(e){i.viewDetails(i.selected)}}},[i._v("核销")]),i._v(" "),a("el-button",{directives:[{name:"has",rawName:"v-has:REC_PRI3",arg:"REC_PRI3"}],attrs:{type:"primary",size:i.btnsize,icon:"el-icon-edit-outline",plain:""},on:{click:function(e){i.doAction("print")}}},[i._v("打印")]),i._v(" "),a("el-button",{directives:[{name:"has",rawName:"v-has:REC_EXP3",arg:"REC_EXP3"}],attrs:{type:"primary",size:i.btnsize,icon:"el-icon-edit-outline",plain:""},on:{click:function(e){i.doAction("export")}}},[i._v("导出")]),i._v(" "),a("el-button",{staticClass:"table_setup",attrs:{type:"primary",size:i.btnsize,icon:"el-icon-setting",plain:""},on:{click:i.setTable}},[i._v("表格设置")])],1),i._v(" "),a("div",{staticClass:"info_tab"},[a("el-table",{key:i.tablekey,ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:i.usersArr,stripe:"",border:"",height:"100%","show-summary":"","summary-method":i.getSummaries,"tooltip-effect":"dark","default-sort":{prop:"id",order:"ascending"}},on:{"row-click":i.clickDetails,"row-dblclick":i.showDetail,"selection-change":i.getSelection}},[a("el-table-column",{attrs:{fixed:"",sortable:"",type:"selection",width:"80"}}),i._v(" "),i._l(i.tableColumn,function(t){return[t.slot?a("el-table-column",{key:t.id,attrs:{prop:t.prop,fixed:t.fixed,sortable:"",label:t.label,width:t.width},scopedSlots:i._u([{key:"default",fn:function(e){return[a("div",{staticClass:"td-slot",domProps:{innerHTML:i._s(t.slot(e))}})]}}])}):a("el-table-column",{key:t.id,attrs:{fixed:t.fixed,sortable:"",label:t.label,prop:t.prop,width:t.width}})]})],2)],1),i._v(" "),a("div",{staticClass:"info_tab_footer"},[i._v("共计:"+i._s(i.total)+" "),a("div",{staticClass:"show_pager"},[a("Pager",{attrs:{total:i.total},on:{change:i.handlePageChange}})],1)])]),i._v(" "),a("TableSetup",{attrs:{popVisible:i.setupTableVisible,columns:i.tableColumn},on:{close:i.closeSetupTable,success:i.setColumn}})],1)},staticRenderFns:[]};t.a=a},msh6:function(e,t,i){"use strict";var a={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-dialog",{staticClass:"wzl_settleLogSave",attrs:{title:t.popTitle,visible:t.isShow,"close-on-click-modal":!1,"before-close":t.closeMe},on:{close:t.closeMe,"update:visible":function(e){t.isShow=e}}},[i("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:t.form,rules:t.rules,"label-width":t.formLabelWidth,inline:!0,"label-position":"right",size:"mini"}},[i("el-form-item",{attrs:{label:"名称：",prop:"queryKey"}},[i("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.form.queryKey,expression:"form.queryKey",modifiers:{trim:!0}}],attrs:{maxlength:20,placeholder:"请定义名称"},domProps:{value:t.form.queryKey},on:{input:function(e){e.target.composing||t.$set(t.form,"queryKey",e.target.value.trim())},blur:function(e){t.$forceUpdate()}}})])],1),t._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{type:"primary",disabled:0===t.form.queryKey.length},on:{click:function(e){t.submitForm("ruleForm")}}},[t._v("确 定")]),t._v(" "),i("el-button",{on:{click:t.closeMe}},[t._v("取 消")])],1)],1)},staticRenderFns:[]};t.a=a},nl9Y:function(e,t){},seR9:function(e,t,i){"use strict";var a=i("mvHQ"),s=i.n(a),r=i("t5DY"),o=i("0xDb");t.a={computed:{isShow:{get:function(){return this.popVisible},set:function(){}}},components:{},props:{popVisible:{type:Boolean,default:!1},dotInfo:[Object,Array],searchQuery:[Object,Array],isDepMain:{type:Boolean,default:!1},createrId:[Number,String],isModify:{type:Boolean,default:!1},isAccept:{type:Boolean,default:!1},proptitle:String,searchObj:{type:[Array,Object],default:function(){}},code:{type:String,default:""}},data:function(){return{form:{userId:"",orgId:"",menuCode:"",queryKey:"",queryContent:""},searchCreatTime:+new Date,pickOption2:"",formLabelWidth:"75px",tooltip:!1,rules:{},queryKey:"",checked1:!0,popTitle:"自定义标签",loading:!1,type:""}},mounted:function(){},watch:{orgid:function(e){this.form.orgid=e},popVisible:function(e){e&&(this.form.userId=this.otherinfo.userId,this.form.orgId=this.otherinfo.orgid,this.form.menuCode=this.code||this.$route.meta.code)}},methods:{reset:function(){this.$refs.ruleForm.resetFields()},closeMe:function(e){this.$emit("close"),this.reset(),"function"==typeof e&&e()},submitForm:function(e){var i=this;this.loading||this.$refs[e].validate(function(e){if(!e)return!1;i.loading=!0,i.form.queryContent=s()(i.searchObj);var t=Object(o.objectMerge2)({},i.form);console.log("addSave_data",t),Object(r.q)(t).then(function(e){i.loading=!1,i.$message({message:"保存成功~",type:"success"}),i.closeMe(),i.$emit("success")}).catch(function(e){i.loading=!1,i.$message.warning(e.text)})})}}}},us2a:function(e,t,i){"use strict";var a=i("t5DY"),s=i("SjYS");t.a={components:{addSave:s.a},props:{searchObj:{type:[Object,Array]},value:[String,Number],code:{type:String,default:""}},data:function(){return{isModify:!1,popVisible:!1,setupTableVisible:!1,dataset:[],datalist:"",timeout:null,loading:!1,options4:[],querySearch:{currentPage:1,pageSize:10,vo:{orgId:"",userId:"",menuCode:""}}}},computed:{hasCode:function(){return this.code||this.$route.meta.code||""}},watch:{value:function(e){console.log("nnn:",e),""===e&&(this.datalist="")},searchObj:{handler:function(e,t){this.$nextTick(function(){console.log("searchAll_cval",e,t)})},deep:!0}},mounted:function(){},methods:{initdata:function(){var t=this;this.inited||(this.inited=!0,this.loading=!0,this.fetchAllloadAll().then(function(e){t.loading=!1}))},deleteItem:function(e){var t=this;Object(a.a)(e).then(function(e){t.fetchAllloadAll()}).catch(function(e){t._handlerCatchMsg(e)})},Custom:function(){this.isModify=!0,this.popVisible=!0},closeAddDot:function(){this.popVisible=!1},fetchAllloadAll:function(){var t=this;return this.querySearch.vo.orgId=this.otherinfo.orgid,this.querySearch.vo.userId=this.otherinfo.userId,this.querySearch.vo.menuCode=this.code||this.$route.meta.code,Object(a.p)(this.querySearch).then(function(e){t.dataset=e.list,t.options4=e.list})},querySearchAsync:function(e,t){var i=this.dataset,a=e?i.filter(this.createStateFilter(e)):i;t(this.options4=a)},createStateFilter:function(t){return function(e){return 0===e.queryKey.toLowerCase().indexOf(t.toLowerCase())}},handleSelect:function(t){var e=this.options4.filter(function(e){return e.id===t});if(e.length){var i=e[0].queryContent,a=JSON.parse(i);this.$emit("change",JSON.parse(i.replace(/'/g,'"'))),this.$emit("dataObj",a)}}}}},yJ0t:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=i("FaHG"),s=i("lbLu"),r=i("VU/8")(a.a,s.a,null,null,null);t.default=r.exports}});