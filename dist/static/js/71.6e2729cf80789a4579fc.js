webpackJsonp([71,175],{"4RGY":function(e,t,a){"use strict";var r={render:function(){var a=this,e=a.$createElement,r=a._self._c||e;return r("div",{staticClass:"linemanage-manager tab-wrapper tab-wrapper-100 miniHeaderSearch"},[r("div",{directives:[{name:"loading",rawName:"v-loading",value:a.loading,expression:"loading"}],staticClass:"tab-content linemanage-summary"},[r("SearchForm",{attrs:{orgid:a.otherinfo.orgid,btnsize:a.btnsize},on:{change:a.getSearchParam}}),a._v(" "),r("div",{staticClass:"tab_info"},[r("div",{staticClass:"btns_box"},[r("el-button",{directives:[{name:"has",rawName:"v-has:LINE_MANAGE_ADD",arg:"LINE_MANAGE_ADD"}],attrs:{type:"primary",size:a.btnsize,icon:"el-icon-info",plain:""},on:{click:function(e){a.doAction("add")}}},[a._v("新增线路")]),a._v(" "),r("span",{staticClass:"viewtip"},[a._v("\n          双击查看详情\n        ")]),a._v(" "),r("el-button",{staticClass:"table_setup",attrs:{type:"primary",size:a.btnsize,icon:"el-icon-setting",plain:""},on:{click:a.setTable}},[a._v("表格设置")])],1),a._v(" "),r("div",{staticClass:"info_tab"},[r("el-table",{key:a.tablekey,ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:a.usersArr,stripe:"",border:"",height:"100%","tooltip-effect":"dark","default-sort":{prop:"id",order:"ascending"}},on:{"row-click":a.clickDetails,"row-dblclick":a.showDetail,"selection-change":a.getSelection}},[a._l(a.tableColumn,function(t){return[t.slot?r("el-table-column",{key:t.id,attrs:{fixed:t.fixed,sortable:"",prop:t.prop,label:t.label,width:t.width},scopedSlots:a._u([{key:"header",fn:function(e){return[r("tableHeaderSearch",{attrs:{scope:e,query:a.searchQuery},on:{change:a.changeKey}})]}},{key:"default",fn:function(e){return[r("span",{domProps:{innerHTML:a._s(t.slot(e))}})]}}])}):r("el-table-column",{key:t.id,attrs:{fixed:t.fixed,sortable:"",label:t.label,prop:t.prop,width:t.width},scopedSlots:a._u([{key:"header",fn:function(e){return[r("tableHeaderSearch",{attrs:{scope:e,query:a.searchQuery},on:{change:a.changeKey}})]}},{key:"default",fn:function(e){return[a._v(a._s(e.row[t.prop]))]}}])})]}),a._v(" "),r("el-table-column",{attrs:{label:"操作",width:"300"},scopedSlots:a._u([{key:"default",fn:function(t){return[r("el-button",{directives:[{name:"has",rawName:"v-has:LINE_MANAGE_DISABLED",arg:"LINE_MANAGE_DISABLED"}],attrs:{type:"0"==t.row.rangeStatus?"primary":"info",size:"mini"},on:{click:function(e){e.stopPropagation(),a.handleStatus(t.row)}}},[a._v(a._s("0"==t.row.rangeStatus?"启用":"禁用"))]),a._v(" "),r("el-button",{directives:[{name:"has",rawName:"v-has:LINE_MANAGE_UPDATE",arg:"LINE_MANAGE_UPDATE"}],attrs:{type:"primary",size:"mini"},on:{click:function(e){e.stopPropagation(),a.handleEdit(t.row)}}},[a._v("修改")]),a._v(" "),r("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(e){e.stopPropagation(),a.viewDetails(t.row)}}},[a._v("查看")]),a._v(" "),r("el-button",{directives:[{name:"has",rawName:"v-has:LINE_MANAGE_DELETE",arg:"LINE_MANAGE_DELETE"}],attrs:{type:"danger",size:"mini"},on:{click:function(e){e.stopPropagation(),a.handleDelete(t.row)}}},[a._v("删除")])]}}])})],2)],1),a._v(" "),r("div",{staticClass:"info_tab_footer"},[a._v("共计:"+a._s(a.total)+" "),r("div",{staticClass:"show_pager"},[r("Pager",{attrs:{total:a.total},on:{change:a.handlePageChange}})],1)])]),a._v(" "),r("TableSetup",{attrs:{popVisible:a.setupTableVisible,columns:a.tableColumn},on:{close:a.closeSetupTable,success:a.setColumn}})],1)])},staticRenderFns:[]};t.a=r},"6v3q":function(e,t,a){"use strict";var r={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-form",{staticClass:"staff_searchinfo clearfix",attrs:{inline:!0,size:t.btnsize,"label-position":"right",model:t.searchForm,"label-width":"70px"}},[a("div",{staticClass:"staff_searchinfo--input"},[a("el-form-item",{attrs:{label:"发站"}},[a("el-input",{attrs:{maxlength:20,clearable:""},on:{change:t.onSubmit},model:{value:t.searchForm.rangeFromCityName,callback:function(e){t.$set(t.searchForm,"rangeFromCityName",e)},expression:"searchForm.rangeFromCityName"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"到站"}},[a("el-input",{attrs:{maxlength:20,clearable:""},on:{change:t.onSubmit},model:{value:t.searchForm.rangeToCityName,callback:function(e){t.$set(t.searchForm,"rangeToCityName",e)},expression:"searchForm.rangeToCityName"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"出发网点"}},[a("select-tree",{attrs:{orgid:t.otherinfo.orgid},model:{value:t.searchForm.fromOrgid,callback:function(e){t.$set(t.searchForm,"fromOrgid",e)},expression:"searchForm.fromOrgid"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"到达网点"}},[a("select-tree",{attrs:{orgid:t.otherinfo.orgid},model:{value:t.searchForm.toOrgid,callback:function(e){t.$set(t.searchForm,"toOrgid",e)},expression:"searchForm.toOrgid"}})],1),t._v(" "),a("searchAll",{attrs:{searchObj:t.searchObjs},on:{dataObj:t.getDataObj}})],1),t._v(" "),a("el-form-item",{staticClass:"staff_searchinfo--btn"},[a("el-button",{attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v("查询")]),t._v(" "),a("el-button",{attrs:{type:"info",plain:""},on:{click:t.clearForm}},[t._v("清空")])],1)],1)},staticRenderFns:[]};t.a=r},"8UOW":function(e,t,a){"use strict";var r=a("us2a"),i=a("fyBF");var n=function(e){a("Qhr/")},s=a("VU/8")(r.a,i.a,n,null,null);t.a=s.exports},Hv3M:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("afDq"),i=a("4RGY");var n=function(e){a("yVdJ")},s=a("VU/8")(r.a,i.a,n,null,null);t.default=s.exports},NU94:function(e,t,a){"use strict";var r=a("woOf"),i=a.n(r),n=a("o9X6"),s=a("8UOW");t.a={name:"handaccount-manage-search",components:{SelectTree:n.a,searchAll:s.a},props:{btnsize:{type:String,default:"mini"},orgid:{type:Number}},data:function(){return{searchObjs:{},searchForm:{fromOrgid:"",rangeFromCityName:"",rangeToCityName:"",toOrgid:""}}},watch:{orgid:function(e){this.searchForm.orgid=e},searchForm:{handler:function(e,t){this.searchObjs=i()({},e),this.searchObjs.status=""===this.searchObjs.status?null:this.searchObjs.status},deep:!0}},mounted:function(){this.onSubmit()},methods:{getDataObj:function(e){this.searchForm=i()({},e),this.$emit("change",e)},onSubmit:function(){var e=i()({},this.searchForm);this.$emit("change",e)},clearForm:function(){this.searchForm={fromOrgid:"",rangeFromCityName:"",rangeToCityName:"",toOrgid:""}}}}},"Qhr/":function(e,t){},SjYS:function(e,t,a){"use strict";var r=a("seR9"),i=a("msh6");var n=function(e){a("nl9Y")},s=a("VU/8")(r.a,i.a,n,null,null);t.a=s.exports},U4i9:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("NU94"),i=a("6v3q"),n=a("VU/8")(r.a,i.a,null,null,null);t.default=n.exports},WoEk:function(e,t,a){"use strict";t.d=function(e){return r.b.post("/api-system/system/tmssystemtransportrange/v1/add",e)},t.a=function(e){return r.b.get("/api-system/system/tmssystemtransportrange/v1/"+e)},t.b=function(e){return r.b.put("/api-system/system/tmssystemtransportrange/v1/update",e)},t.e=function(e){return r.b.post("/api-system/system/tmssystemtransportrange/v1/list",e)},t.c=function(e){return r.b.delete("/api-system/system/tmssystemtransportrange/v1/"+e)},t.f=function(e,t){return r.b.put("/api-system/system/tmssystemtransportrange/v1/updateStatus/"+e+"/"+t)};var r=a("Vo7i")},afDq:function(e,t,a){"use strict";var n=a("WoEk"),r=a("U4i9"),i=a("1onU"),s=a("0xDb"),o=a("UQm2");t.a={components:{SearchForm:r.default,Pager:i.a},mounted:function(){},data:function(){var t=this;return{btnsize:"mini",usersArr:[],total:0,loading:!0,setupTableVisible:!1,isModify:!1,selectInfo:{},selected:[],searchQuery:{currentPage:1,pageSize:100,vo:{fromOrgid:"",rangeFromCityName:"",rangeToCityName:"",toOrgid:""}},tablekey:"",tableColumn:[{label:"序号",prop:"number",fixed:!0,slot:function(e){return e.$index+1}},{label:"发站",prop:"rangeFromCity",width:200,slot:function(e){return e.row.rangeFromCity+e.row.rangeFromArea}},{label:"出发网点",prop:"fromOrgName",width:100},{label:"到站",prop:"rangeToCity",width:200,slot:function(e){return e.row.rangeToCity+e.row.rangeToArea}},{label:"到达网点",prop:"toOrgName",width:"100"},{label:"运输时效",prop:"transportAging",width:"90",slot:function(e){return e.row.transportAgingType?e.row.transportAging+["天","小时","天"][e.row.transportAgingType]:""}},{label:"重货价格",prop:"heavePrice",width:200,slot:function(e){return t.getRangePrice(e.row.heavePrice,"公斤")}},{label:"轻货价格",prop:"lightPrice",width:200,slot:function(e){return t.getRangePrice(e.row.lightPrice,"立方")}},{label:"最低价格(元)",prop:"lowerPrice",width:130,slot:function(e){return""===e.row.lowerPrice?"面议":e.row.lowerPrice}},{label:"创建时间",prop:"createTime",width:200},{label:"状态",prop:"rangeStatus",slot:function(e){return['<span class="imp">禁用</span>',"启用"][e.row.rangeStatus]||""}},{label:"线路说明",width:"150",prop:"transportRemark"}]}},methods:{changeKey:function(e){this.total=0,this.searchQuery=e,this.fetchAllOrder()},getRangePrice:function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:[],r=arguments[1];if(!e||!e.length)return"";var i='<div class="hyq-priceList">';return e.forEach(function(e){var t=e.startVolume||0,a=e.endVolume||0;i+=a<t?"<p>"+t+r+"以上  "+e.primeryPrice+"元</p>":"<p>"+t+"-"+a+r+"  "+e.primeryPrice+"元</p>"}),i+="</div>"},handleEdit:function(e){var t="0"===e.rangeStatus,a=e.rangeFromCity+e.rangeFromArea+"-"+(e.rangeToCity+e.rangeToArea);t?this.$router.push({path:"/company/lineManage/modify",query:{id:e.id,tab:"修改线路"+a}}):this.$message.info("请先停用该条线路再修改")},handleDelete:function(e){var t=this,a="0"===e.rangeStatus,r=e.rangeFromCity+e.rangeFromArea+"-"+(e.rangeToCity+e.rangeToArea),i=a?"确定删除"+r+"线路吗":"确定停用"+r+"线路吗";a?this.$confirm(i,"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){n.c(e.id).then(function(e){t.$message({type:"success",message:"操作成功!"}),t.fetchAllOrder()}).catch(function(e){t._handlerCatchMsg(e,"操作失败，原因：")})}).catch(function(){t.$message({type:"info",message:"已取消操作"})}):this.$message.info("请先停用该条线路再修改")},handleStatus:function(t){var a=this,r="0"===t.rangeStatus,e=t.rangeFromCity+t.rangeFromArea+"-"+(t.rangeToCity+t.rangeToArea),i=r?"确定启用"+e+"线路吗":"确定停用"+e+"线路吗";this.$confirm(i,"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){n.f(t.id,r?1:0).then(function(e){a.$message({type:"success",message:"操作成功!"}),t.rangeStatus=r?"1":"0"}).catch(function(e){a._handlerCatchMsg(e,"操作失败，原因：")})}).catch(function(){a.$message({type:"info",message:"已取消操作"})})},viewDetails:function(e){var t=e.rangeFromCity+e.rangeFromArea+"-"+(e.rangeToCity+e.rangeToArea);this.$router.push({path:"/company/lineManage/detail",query:{id:e.id,tab:"查看线路"+t}})},showDetail:function(e){this.viewDetails(e)},fetchAllOrder:function(){var a=this;return this.loading=!0,n.e(this.searchQuery).then(function(e){var t=e.data;t?(a.usersArr=t.list.map(function(e){for(var t in e)null===e[t]&&(e[t]="");return e}),a.total=t.total,a.loading=!1):a.$message.info("加载数据失败")}).catch(function(e){a.loading=!1,a._handlerCatchMsg(e)})},fetchData:function(){this.fetchAllOrder()},handlePageChange:function(e){this.searchQuery.currentPage=e.pageNum,this.searchQuery.pageSize=e.pageSize,this.fetchData()},getSearchParam:function(e){this.searchQuery.currentPage=this.$options.data().searchQuery.currentPage,this.searchQuery.pageSize=this.$options.data().searchQuery.pageSize,this.searchQuery.vo=e,this.loading=!1,this.fetchData()},doAction:function(e){if(!this.selected.length&&"add"!==e&&"export"!==e&&"print"!==e)return this.$message({message:"请选择要操作的项~",type:"warning"}),!1;switch(e){case"add":this.selectInfo={},this.$router.push({path:"/company/lineManage/create"});break;case"detail":this.isModify=!1,this.selectInfo={},this.showDetail(this.selected[0]);break;case"export":Object(o.g)({data:this.selected.length?this.selected:this.usersArr,columns:this.tableColumn,name:"员工交账-"+Object(s.parseTime)(new Date,"{y}{m}{d}{h}{i}{s}")});break;case"print":Object(o.d)({data:this.selected.length?this.selected:this.usersArr,columns:this.tableColumn,name:"员工交账"})}this.$refs.multipleTable.clearSelection()},setTable:function(){this.setupTableVisible=!0},closeSetupTable:function(){this.setupTableVisible=!1},setColumn:function(e){this.tableColumn=e,this.tablekey=(new Date).getTime()},clickDetails:function(e,t,a){this.$refs.multipleTable.toggleRowSelection(e)},getSelection:function(e){this.selected=e},getSummaries:function(e){return Object(s.getSummaries)(e,["shipNowpayFee","finishAccount","noSettlementFee"])}}}},fyBF:function(e,t,a){"use strict";var r={render:function(){var a=this,e=a.$createElement,r=a._self._c||e;return a.hasCode?r("div",{staticClass:"searchAll_lyy"},[r("el-form-item",{staticClass:"zdycx",attrs:{label:"自定义查询"}},[r("el-select",{attrs:{filterable:"",placeholder:"请选择","filter-method":a.querySearchAsync,"popper-class":"zdycx-pop",loading:a.loading},on:{change:a.handleSelect,focus:a.initdata},model:{value:a.datalist,callback:function(e){a.datalist=e},expression:"datalist"}},a._l(a.options4,function(t,e){return r("el-option",{key:e,attrs:{label:t.queryKey,value:t.id}},[a._v("\r\n        "+a._s(t.queryKey)+" "),r("i",{staticClass:"el-icon-circle-close-outline",on:{click:function(e){e.stopPropagation(),e.preventDefault(),a.deleteItem(t)}}})])})),a._v(" "),r("el-button",{attrs:{plain:""},on:{click:a.Custom}},[a._v("保存自定义")])],1),a._v(" "),r("addSave",{attrs:{code:a.hasCode,searchObj:a.searchObj,popVisible:a.popVisible},on:{close:a.closeAddDot,success:a.fetchAllloadAll}})],1):a._e()},staticRenderFns:[]};t.a=r},msh6:function(e,t,a){"use strict";var r={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-dialog",{staticClass:"wzl_settleLogSave",attrs:{title:t.popTitle,visible:t.isShow,"close-on-click-modal":!1,"before-close":t.closeMe},on:{close:t.closeMe,"update:visible":function(e){t.isShow=e}}},[a("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:t.form,rules:t.rules,"label-width":t.formLabelWidth,inline:!0,"label-position":"right",size:"mini"}},[a("el-form-item",{attrs:{label:"名称：",prop:"queryKey"}},[a("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.form.queryKey,expression:"form.queryKey",modifiers:{trim:!0}}],attrs:{maxlength:20,placeholder:"请定义名称"},domProps:{value:t.form.queryKey},on:{input:function(e){e.target.composing||t.$set(t.form,"queryKey",e.target.value.trim())},blur:function(e){t.$forceUpdate()}}})])],1),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"primary",disabled:0===t.form.queryKey.length},on:{click:function(e){t.submitForm("ruleForm")}}},[t._v("确 定")]),t._v(" "),a("el-button",{on:{click:t.closeMe}},[t._v("取 消")])],1)],1)},staticRenderFns:[]};t.a=r},nl9Y:function(e,t){},seR9:function(e,t,a){"use strict";var r=a("mvHQ"),i=a.n(r),n=a("t5DY"),s=a("0xDb");t.a={computed:{isShow:{get:function(){return this.popVisible},set:function(){}}},components:{},props:{popVisible:{type:Boolean,default:!1},dotInfo:[Object,Array],searchQuery:[Object,Array],isDepMain:{type:Boolean,default:!1},createrId:[Number,String],isModify:{type:Boolean,default:!1},isAccept:{type:Boolean,default:!1},proptitle:String,searchObj:{type:[Array,Object],default:function(){}},code:{type:String,default:""}},data:function(){return{form:{userId:"",orgId:"",menuCode:"",queryKey:"",queryContent:""},searchCreatTime:+new Date,pickOption2:"",formLabelWidth:"75px",tooltip:!1,rules:{},queryKey:"",checked1:!0,popTitle:"自定义标签",loading:!1,type:""}},mounted:function(){},watch:{orgid:function(e){this.form.orgid=e},popVisible:function(e){e&&(this.form.userId=this.otherinfo.userId,this.form.orgId=this.otherinfo.orgid,this.form.menuCode=this.code||this.$route.meta.code)}},methods:{reset:function(){this.$refs.ruleForm.resetFields()},closeMe:function(e){this.$emit("close"),this.reset(),"function"==typeof e&&e()},submitForm:function(e){var a=this;this.loading||this.$refs[e].validate(function(e){if(!e)return!1;a.loading=!0,a.form.queryContent=i()(a.searchObj);var t=Object(s.objectMerge2)({},a.form);console.log("addSave_data",t),Object(n.s)(t).then(function(e){a.loading=!1,a.$message({message:"保存成功~",type:"success"}),a.closeMe(),a.$emit("success")}).catch(function(e){a.loading=!1,a.$message.warning(e.text)})})}}}},us2a:function(e,t,a){"use strict";var r=a("t5DY"),i=a("SjYS");t.a={components:{addSave:i.a},props:{searchObj:{type:[Object,Array]},value:[String,Number],code:{type:String,default:""}},data:function(){return{isModify:!1,popVisible:!1,setupTableVisible:!1,dataset:[],datalist:"",timeout:null,loading:!1,options4:[],querySearch:{currentPage:1,pageSize:10,vo:{orgId:"",userId:"",menuCode:""}}}},computed:{hasCode:function(){return this.code||this.$route.meta.code||""}},watch:{value:function(e){""===e&&(this.datalist="")},searchObj:{handler:function(e,t){},deep:!0}},mounted:function(){},methods:{initdata:function(){var t=this;this.inited||(this.inited=!0,this.loading=!0,this.fetchAllloadAll().then(function(e){t.loading=!1}))},deleteItem:function(e){var t=this;Object(r.b)(e.id).then(function(e){t.fetchAllloadAll(),t.datalist&&(t.datalist="")}).catch(function(e){t._handlerCatchMsg(e)})},Custom:function(){this.isModify=!0,this.popVisible=!0},closeAddDot:function(){this.popVisible=!1},fetchAllloadAll:function(){var t=this;return this.querySearch.vo.orgId=this.otherinfo.orgid,this.querySearch.vo.userId=this.otherinfo.userId,this.querySearch.vo.menuCode=this.code||this.$route.meta.code,Object(r.r)(this.querySearch).then(function(e){t.dataset=e.list||[],t.options4=e.list||[]})},querySearchAsync:function(e,t){var a=this.dataset,r=e?a.filter(this.createStateFilter(e)):a;t(this.options4=r)},createStateFilter:function(t){return function(e){return 0===e.queryKey.toLowerCase().indexOf(t.toLowerCase())}},handleSelect:function(t){var e=this.options4.filter(function(e){return e.id===t});if(e.length){var a=e[0].queryContent,r=JSON.parse(a);this.$emit("change",JSON.parse(a.replace(/'/g,'"'))),this.$emit("dataObj",r)}}}}},yVdJ:function(e,t){}});