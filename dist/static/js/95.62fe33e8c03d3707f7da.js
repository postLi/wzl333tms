webpackJsonp([95,177],{"0bwg":function(e,t){},"7ZQA":function(e,t,i){"use strict";t.a=function(e){return a.b.post("/api-finance/finance/employeeaccount/v1/getEmployeeList",e).then(function(e){return e.data||{list:[],totalCount:0}})},t.b=function(e){return a.b.post("/api-finance/finance/employeeaccount/v1/getEmployeeSummarize",e).then(function(e){return e.data||{list:[],totalCount:0}})};var s=i("//Fk"),a=(i.n(s),i("Vo7i"))},"8UOW":function(e,t,i){"use strict";var s=i("us2a"),a=i("fyBF");var o=function(e){i("Qhr/")},n=i("VU/8")(s.a,a.a,o,null,null);t.a=n.exports},"9sPy":function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=i("eLXT"),a=i("tCx7");var o=function(e){i("0bwg")},n=i("VU/8")(s.a,a.a,o,null,null);t.default=n.exports},OEqj:function(e,t,i){"use strict";var s=i("woOf"),a=i.n(s),o=i("o9X6"),n=i("9UCZ"),r=i("8UOW");t.a={name:"handaccount-manage-search",components:{SelectTree:o.a,SelectType:n.a,searchAll:r.a},props:{btnsize:{type:String,default:"mini"},orgid:{type:Number}},data:function(){return{searchObjs:{},searchForm:{orgid:"",status:"",userName:""}}},watch:{orgid:function(e){this.searchForm.orgid=e},searchForm:{handler:function(e,t){this.searchObjs=a()({},e),this.searchObjs.status=""===this.searchObjs.status?null:this.searchObjs.status},deep:!0}},mounted:function(){this.searchForm.orgid=this.orgid,this.onSubmit()},methods:{getDataObj:function(e){this.searchForm=a()({},e),this.$emit("change",e)},onSubmit:function(){var e=a()({},this.searchForm);e.status=""===e.status?null:e.status,this.$emit("change",e)},clearForm:function(){this.searchForm.status="",this.searchForm.userName="",this.searchForm.orgid=this.otherinfo.orgid}}}},"Qhr/":function(e,t){},SjYS:function(e,t,i){"use strict";var s=i("seR9"),a=i("msh6");var o=function(e){i("nl9Y")},n=i("VU/8")(s.a,a.a,o,null,null);t.a=n.exports},YXC3:function(e,t,i){"use strict";var s={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-form",{staticClass:"staff_searchinfo clearfix",attrs:{inline:!0,size:t.btnsize,"label-position":"right",model:t.searchForm,"label-width":"70px"}},[i("div",{staticClass:"staff_searchinfo--input"},[i("el-form-item",{attrs:{label:"所在网点"}},[i("select-tree",{attrs:{orgid:t.otherinfo.orgid},model:{value:t.searchForm.orgid,callback:function(e){t.$set(t.searchForm,"orgid",e)},expression:"searchForm.orgid"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"员工姓名"}},[i("el-input",{attrs:{maxlength:"15",clearable:""},on:{change:t.onSubmit},model:{value:t.searchForm.userName,callback:function(e){t.$set(t.searchForm,"userName",e)},expression:"searchForm.userName"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"交账状态"}},[i("select-type",{attrs:{type:"fee_status"},model:{value:t.searchForm.status,callback:function(e){t.$set(t.searchForm,"status",e)},expression:"searchForm.status"}})],1),t._v(" "),i("searchAll",{attrs:{searchObj:t.searchObjs},on:{dataObj:t.getDataObj}})],1),t._v(" "),i("el-form-item",{staticClass:"staff_searchinfo--btn"},[i("el-button",{attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v("查询")]),t._v(" "),i("el-button",{attrs:{type:"info",plain:""},on:{click:t.clearForm}},[t._v("清空")])],1)],1)},staticRenderFns:[]};t.a=s},eLXT:function(e,t,i){"use strict";var s=i("7ZQA"),a=i("zJck"),o=i("puNT"),n=i("1onU"),r=i("0xDb"),l=i("UQm2");t.a={components:{SearchForm:a.default,Pager:n.a,TableSetup:o.a},mounted:function(){},data:function(){return{btnsize:"mini",usersArr:[],total:0,loading:!0,setupTableVisible:!1,isModify:!1,selectInfo:{},selected:[],searchQuery:{currentPage:1,pageSize:100,vo:{orgid:"",status:"",userName:""}},tablekey:"",tableColumn:[{label:"序号",prop:"",fixed:!0,slot:function(e){return e.$index+1}},{label:"网点",prop:"orgName",fixed:!0},{label:"员工姓名",prop:"name"},{label:"交账合计",prop:"shipNowpayFee"},{label:"交账状态",prop:"feeStatus",width:"150"},{label:"已交账合计",prop:"finishAccount"},{label:"未交账合记",prop:"noSettlementFee"}]}},methods:{viewDetails:function(e){this.$router.push({path:"/finance/handAccount/detail",query:{id:e.userId,tab:"查看"+e.name,orgid:e.orgid}})},showDetail:function(e){this.viewDetails(e)},fetchAllOrder:function(){var t=this;return this.loading=!0,s.b(this.searchQuery).then(function(e){t.usersArr=e.list,t.total=e.total,t.loading=!1}).catch(function(e){t.loading=!1,t._handlerCatchMsg(e)})},fetchData:function(){this.fetchAllOrder()},handlePageChange:function(e){this.searchQuery.currentPage=e.pageNum,this.searchQuery.pageSize=e.pageSize,this.fetchData()},getSearchParam:function(e){this.searchQuery.currentPage=this.$options.data().searchQuery.currentPage,this.searchQuery.pageSize=this.$options.data().searchQuery.pageSize,this.searchQuery.vo=e,this.loading=!1,this.fetchData()},doAction:function(e){if(!this.selected.length&&"add"!==e&&"export"!==e&&"print"!==e)return this.$message({message:"请选择要操作的项~",type:"warning"}),!1;switch(console.log("this.selected:",this.selected),e){case"detail":this.isModify=!1,this.selectInfo={},this.showDetail(this.selected[0]);break;case"export":Object(l.g)({data:this.selected.length?this.selected:this.usersArr,columns:this.tableColumn,name:"员工交账-"+Object(r.parseTime)(new Date,"{y}{m}{d}{h}{i}{s}")});break;case"print":Object(l.d)({data:this.selected.length?this.selected:this.usersArr,columns:this.tableColumn,name:"员工交账"})}this.$refs.multipleTable.clearSelection()},setTable:function(){this.setupTableVisible=!0},closeSetupTable:function(){this.setupTableVisible=!1},setColumn:function(e){this.tableColumn=e,this.tablekey=Math.random()},clickDetails:function(e,t,i){this.$refs.multipleTable.toggleRowSelection(e)},getSelection:function(e){this.selected=e},getSummaries:function(e){return Object(r.getSummaries)(e,["shipNowpayFee","finishAccount","noSettlementFee"])}}}},fyBF:function(e,t,i){"use strict";var s={render:function(){var i=this,e=i.$createElement,s=i._self._c||e;return i.hasCode?s("div",{staticClass:"searchAll_lyy"},[s("el-form-item",{staticClass:"zdycx",attrs:{label:"自定义查询"}},[s("el-select",{attrs:{filterable:"",placeholder:"请选择","filter-method":i.querySearchAsync,"popper-class":"zdycx-pop",loading:i.loading},on:{change:i.handleSelect,focus:i.initdata},model:{value:i.datalist,callback:function(e){i.datalist=e},expression:"datalist"}},i._l(i.options4,function(t,e){return s("el-option",{key:e,attrs:{label:t.queryKey,value:t.id}},[i._v("\r\n        "+i._s(t.queryKey)+" "),s("i",{staticClass:"el-icon-circle-close-outline",on:{click:function(e){e.stopPropagation(),e.preventDefault(),i.deleteItem(t.id)}}})])})),i._v(" "),s("el-button",{attrs:{plain:""},on:{click:i.Custom}},[i._v("保存自定义")])],1),i._v(" "),s("addSave",{attrs:{code:i.hasCode,searchObj:i.searchObj,popVisible:i.popVisible},on:{close:i.closeAddDot,success:i.fetchAllloadAll}})],1):i._e()},staticRenderFns:[]};t.a=s},msh6:function(e,t,i){"use strict";var s={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-dialog",{staticClass:"wzl_settleLogSave",attrs:{title:t.popTitle,visible:t.isShow,"close-on-click-modal":!1,"before-close":t.closeMe},on:{close:t.closeMe,"update:visible":function(e){t.isShow=e}}},[i("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:t.form,rules:t.rules,"label-width":t.formLabelWidth,inline:!0,"label-position":"right",size:"mini"}},[i("el-form-item",{attrs:{label:"名称：",prop:"queryKey"}},[i("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.form.queryKey,expression:"form.queryKey",modifiers:{trim:!0}}],attrs:{maxlength:20,placeholder:"请定义名称"},domProps:{value:t.form.queryKey},on:{input:function(e){e.target.composing||t.$set(t.form,"queryKey",e.target.value.trim())},blur:function(e){t.$forceUpdate()}}})])],1),t._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{type:"primary",disabled:0===t.form.queryKey.length},on:{click:function(e){t.submitForm("ruleForm")}}},[t._v("确 定")]),t._v(" "),i("el-button",{on:{click:t.closeMe}},[t._v("取 消")])],1)],1)},staticRenderFns:[]};t.a=s},nl9Y:function(e,t){},seR9:function(e,t,i){"use strict";var s=i("mvHQ"),a=i.n(s),o=i("t5DY"),n=i("0xDb");t.a={computed:{isShow:{get:function(){return this.popVisible},set:function(){}}},components:{},props:{popVisible:{type:Boolean,default:!1},dotInfo:[Object,Array],searchQuery:[Object,Array],isDepMain:{type:Boolean,default:!1},createrId:[Number,String],isModify:{type:Boolean,default:!1},isAccept:{type:Boolean,default:!1},proptitle:String,searchObj:{type:[Array,Object],default:function(){}},code:{type:String,default:""}},data:function(){return{form:{userId:"",orgId:"",menuCode:"",queryKey:"",queryContent:""},searchCreatTime:+new Date,pickOption2:"",formLabelWidth:"75px",tooltip:!1,rules:{},queryKey:"",checked1:!0,popTitle:"自定义标签",loading:!1,type:""}},mounted:function(){},watch:{orgid:function(e){this.form.orgid=e},popVisible:function(e){e&&(this.form.userId=this.otherinfo.userId,this.form.orgId=this.otherinfo.orgid,this.form.menuCode=this.code||this.$route.meta.code)}},methods:{reset:function(){this.$refs.ruleForm.resetFields()},closeMe:function(e){this.$emit("close"),this.reset(),"function"==typeof e&&e()},submitForm:function(e){var i=this;this.loading||this.$refs[e].validate(function(e){if(!e)return!1;i.loading=!0,i.form.queryContent=a()(i.searchObj);var t=Object(n.objectMerge2)({},i.form);console.log("addSave_data",t),Object(o.q)(t).then(function(e){i.loading=!1,i.$message({message:"保存成功~",type:"success"}),i.closeMe(),i.$emit("success")}).catch(function(e){i.loading=!1,i.$message.warning(e.text)})})}}}},tCx7:function(e,t,i){"use strict";var s={render:function(){var i=this,e=i.$createElement,s=i._self._c||e;return s("div",{directives:[{name:"loading",rawName:"v-loading",value:i.loading,expression:"loading"}],staticClass:"tab-content handAccount-summary"},[s("SearchForm",{attrs:{orgid:i.otherinfo.orgid,btnsize:i.btnsize},on:{change:i.getSearchParam}}),i._v(" "),s("div",{staticClass:"tab_info"},[s("div",{staticClass:"btns_box"},[s("el-button",{directives:[{name:"has",rawName:"v-has:FINANCE_ACCOUNT1",arg:"FINANCE_ACCOUNT1"}],attrs:{type:"primary",size:i.btnsize,icon:"el-icon-info",plain:""},on:{click:function(e){i.doAction("detail")}}},[i._v("查看明细")]),i._v(" "),s("el-button",{staticClass:"table_setup",attrs:{type:"primary",size:i.btnsize,icon:"el-icon-edit-outline",plain:""},on:{click:function(e){i.doAction("export")}}},[i._v("导出")]),i._v(" "),s("el-button",{staticClass:"table_setup",attrs:{type:"primary",size:i.btnsize,icon:"el-icon-edit-outline",plain:""},on:{click:function(e){i.doAction("print")}}},[i._v("打印")]),i._v(" "),s("el-button",{staticClass:"table_setup",attrs:{type:"primary",size:i.btnsize,icon:"el-icon-setting",plain:""},on:{click:i.setTable}},[i._v("表格设置")])],1),i._v(" "),s("div",{staticClass:"info_tab"},[s("el-table",{key:i.tablekey,ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:i.usersArr,stripe:"",border:"",height:"100%","show-summary":"","summary-method":i.getSummaries,"tooltip-effect":"dark","default-sort":{prop:"id",order:"ascending"}},on:{"row-click":i.clickDetails,"row-dblclick":i.showDetail,"selection-change":i.getSelection}},[s("el-table-column",{attrs:{fixed:"",sortable:"",type:"selection",width:"80"}}),i._v(" "),i._l(i.tableColumn,function(t){return[t.slot?s("el-table-column",{key:t.id,attrs:{fixed:t.fixed,sortable:"",label:t.label,width:t.width},scopedSlots:i._u([{key:"default",fn:function(e){return[i._v("\n                "+i._s(t.slot(e))+"\n            ")]}}])}):s("el-table-column",{key:t.id,attrs:{fixed:t.fixed,sortable:"",label:t.label,prop:t.prop,width:t.width}})]})],2)],1),i._v(" "),s("div",{staticClass:"info_tab_footer"},[i._v("共计:"+i._s(i.total)+" "),s("div",{staticClass:"show_pager"},[s("Pager",{attrs:{total:i.total},on:{change:i.handlePageChange}})],1)])]),i._v(" "),s("TableSetup",{attrs:{popVisible:i.setupTableVisible,columns:i.tableColumn},on:{close:i.closeSetupTable,success:i.setColumn}})],1)},staticRenderFns:[]};t.a=s},us2a:function(e,t,i){"use strict";var s=i("t5DY"),a=i("SjYS");t.a={components:{addSave:a.a},props:{searchObj:{type:[Object,Array]},value:[String,Number],code:{type:String,default:""}},data:function(){return{isModify:!1,popVisible:!1,setupTableVisible:!1,dataset:[],datalist:"",timeout:null,loading:!1,options4:[],querySearch:{currentPage:1,pageSize:10,vo:{orgId:"",userId:"",menuCode:""}}}},computed:{hasCode:function(){return this.code||this.$route.meta.code||""}},watch:{value:function(e){console.log("nnn:",e),""===e&&(this.datalist="")},searchObj:{handler:function(e,t){this.$nextTick(function(){console.log("searchAll_cval",e,t)})},deep:!0}},mounted:function(){},methods:{initdata:function(){var t=this;this.inited||(this.inited=!0,this.loading=!0,this.fetchAllloadAll().then(function(e){t.loading=!1}))},deleteItem:function(e){var t=this;Object(s.a)(e).then(function(e){t.fetchAllloadAll()}).catch(function(e){t._handlerCatchMsg(e)})},Custom:function(){this.isModify=!0,this.popVisible=!0},closeAddDot:function(){this.popVisible=!1},fetchAllloadAll:function(){var t=this;return this.querySearch.vo.orgId=this.otherinfo.orgid,this.querySearch.vo.userId=this.otherinfo.userId,this.querySearch.vo.menuCode=this.code||this.$route.meta.code,Object(s.p)(this.querySearch).then(function(e){t.dataset=e.list,t.options4=e.list})},querySearchAsync:function(e,t){var i=this.dataset,s=e?i.filter(this.createStateFilter(e)):i;t(this.options4=s)},createStateFilter:function(t){return function(e){return 0===e.queryKey.toLowerCase().indexOf(t.toLowerCase())}},handleSelect:function(t){var e=this.options4.filter(function(e){return e.id===t});if(e.length){var i=e[0].queryContent,s=JSON.parse(i);this.$emit("change",JSON.parse(i.replace(/'/g,'"'))),this.$emit("dataObj",s)}}}}},zJck:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=i("OEqj"),a=i("YXC3"),o=i("VU/8")(s.a,a.a,null,null,null);t.default=o.exports}});