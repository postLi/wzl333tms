webpackJsonp([125,323,401],{"60/2":function(e,t){},"8Hxk":function(e,t){},B2EE:function(e,t,i){"use strict";var r={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-form",{staticClass:"staff_searchinfo clearfix",attrs:{inline:!0,size:t.btnsize,"label-position":"right","label-width":"70px",rules:t.rules,model:t.searchForm}},[i("div",{staticClass:"staff_searchinfo--input"},[i("el-form-item",{attrs:{label:"网点"}},[i("SelectTree",{attrs:{orgid:t.otherinfo.orgid},model:{value:t.searchForm.orgid,callback:function(e){t.$set(t.searchForm,"orgid",e)},expression:"searchForm.orgid"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"承运商"}},[i("el-input",{attrs:{placeholder:"承运商",maxlength:"15",clearable:""},model:{value:t.searchForm.name,callback:function(e){t.$set(t.searchForm,"name",e)},expression:"searchForm.name"}})],1)],1),t._v(" "),i("el-form-item",{staticClass:"staff_searchinfo--btn"},[i("el-button",{attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v("查询")]),t._v(" "),i("el-button",{attrs:{type:"info",plain:""},on:{click:t.clearForm}},[t._v("清空")])],1)],1)},staticRenderFns:[]};t.a=r},"MQ/+":function(e,t){},"Rf/G":function(e,t,i){"use strict";var o=i("E4LH"),r=i("o9X6");t.a={components:{SelectTree:r.a},props:{btnsize:{type:String,default:"mini"},orgid:{type:Number}},data:function(){var r=this;return{searchForm:{orgid:"",name:"",mobile:""},rules:{mobile:[{validator:function(e,t,i){r.searchForm.mobile=t.replace(o.a.NO_NUMBER,""),i()},trigger:"change"}]}}},watch:{orgid:function(e){this.searchForm.orgid=e}},mounted:function(){this.searchForm.orgid=this.orgid},methods:{getOrgid:function(e){this.searchForm.orgid=e},onSubmit:function(){this.$emit("change",this.searchForm)},clearForm:function(){this.searchForm.name="",this.searchForm.orgid=this.orgid,this.searchForm.mobile=""}}}},YNOH:function(e,t,i){"use strict";var r=i("Dd8w"),o=i.n(r),a=i("4UdH"),s=i("cqHs"),n=i("bZax"),l=i("NYxO"),c=i("1onU"),d=i("ijWn"),u=i("0xDb"),m=i("UQm2");t.a={name:"carrierManage",components:{SearchForm:s.default,Pager:c.a,AddCustomer:n.default,ImportDialog:d.a},computed:o()({},Object(l.mapGetters)(["otherinfo"]),{orgid:function(){return console.log(this.selectInfo.orgid,this.searchQuery.vo.orgid,this.otherinfo.orgid),this.isModify?this.selectInfo.orgid:this.searchQuery.vo.orgid||this.otherinfo.orgid}}),mounted:function(){var t=this;this.searchQuery.vo.orgid=this.otherinfo.orgid,this.fetchAllCustomer(this.otherinfo.orgid).then(function(e){t.loading=!1})},data:function(){var t=this;return{btnsize:"mini",usersArr:[],total:0,loading:!0,importDialogVisible:!1,setupTableVisible:!1,AddCustomerVisible:!1,isModify:!1,selectInfo:{},selected:[],searchQuery:{currentPage:1,pageSize:100,vo:{orgid:1,carrierMobile:"",carrierName:""}},tablekey:"",tableColumn:[{label:"序号",prop:"id",width:"70",fixed:!0,slot:function(e){return(t.searchQuery.currentPage-1)*t.searchQuery.pageSize+e.$index+1}},{label:"承运商名称",prop:"carrierName",width:"120",fixed:!0},{label:"归属网点",prop:"orgName",width:"120",fixed:!1},{label:"承运商编码",prop:"carrierSn",width:"120",fixed:!1},{label:"负责人",prop:"liableName",width:"120",fixed:!1},{label:"负责人手机",prop:"liablePhone",width:"120",fixed:!1},{label:"客服电话",prop:"carrierMobile",width:"120",fixed:!1},{label:"合同起始日",prop:"contractStarttime",width:"180",slot:function(e){return Object(u.parseTime)(e.row.contractStarttime,"{y}-{m}-{d} {h}:{i}:{s}")}},{label:"合同终止日",prop:"contractEndtime",width:"180",fixed:!1,slot:function(e){return Object(u.parseTime)(e.row.contractEndtime,"{y}-{m}-{d} {h}:{i}:{s}")}},{label:"地址",prop:"carrierAddr",width:200,fixed:!1},{label:"备注",prop:"carrierRemarks",fixed:!1}]}},methods:{changeKey:function(e){this.total=0,this.searchQuery=e,this.loading||this.fetchAllCustomer()},fetchAllCustomer:function(){var t=this;return this.loading=!0,Object(a.b)(this.searchQuery).then(function(e){t.usersArr=e.list,t.total=e.total,t.loading=!1}).catch(function(e){t.loading=!1,t._handlerCatchMsg(e)})},fetchData:function(){this.fetchAllCustomer()},handlePageChange:function(e){this.searchQuery.currentPage=e.pageNum,this.searchQuery.pageSize=e.pageSize,this.fetchAllCustomer()},getSearchParam:function(e){this.searchQuery.currentPage=this.$options.data().searchQuery.currentPage,this.searchQuery.pageSize=this.$options.data().searchQuery.pageSize,this.searchQuery.vo.orgid=e.orgid,this.searchQuery.vo.carrierMobile=e.mobile,this.searchQuery.vo.carrierName=e.name,this.fetchAllCustomer()},showImport:function(){},doAction:function(e){var t=this;if(!this.selected.length&&"add"!==e&&"import"!==e&&"export"!==e)return this.closeAddCustomer(),this.$message({message:"请选择要操作的项~",type:"warning"}),!1;switch(console.log("this.selected:",this.selected),e){case"add":this.isModify=!1,this.selectInfo={},this.openAddCustomer();break;case"modify":this.isModify=!0,1<this.selected.length&&this.$message({message:"每次只能修改单条数据~",type:"warning"}),this.selectInfo=this.selected[0],this.openAddCustomer();break;case"delete":var i=1<this.selected.length?this.selected.length+"名":this.selected[0].carrierName,r=this.selected.map(function(e){return e.carrierId});r=r.join(","),this.$confirm("确定要删除 "+i+" 客户吗？","提示",{confirmButtonText:"删除",cancelButtonText:"取消",type:"warning"}).then(function(){Object(a.a)(r).then(function(e){t.$message({type:"success",message:"删除成功!"}),t.fetchData()}).catch(function(e){t.$message({type:"info",message:e.errorInfo})})}).catch(function(){t.$message({type:"info",message:"已取消删除"})});break;case"export":Object(m.g)({data:this.selected.length?this.selected:this.usersArr,columns:this.tableColumn,name:"承运商列表-"+Object(u.parseTime)(new Date,"{y}{m}{d}{h}{i}{s}")});break;case"import":this.importDialogVisible=!0}this.$refs.multipleTable.clearSelection()},setTable:function(){this.setupTableVisible=!0},closeSetupTable:function(){this.setupTableVisible=!1},setColumn:function(e){this.tableColumn=e,this.tablekey=(new Date).getTime()},openAddCustomer:function(){this.AddCustomerVisible=!0},closeAddCustomer:function(){this.AddCustomerVisible=!1},clickDetails:function(e,t,i){this.$refs.multipleTable.toggleRowSelection(e)},getSelection:function(e){this.selected=e}}}},bPPU:function(e,t,i){"use strict";var l=i("t5DY");t.a={props:{isSubjectInfo:{type:Boolean,default:!1},popVisible:{type:Boolean,default:!1},info:{type:String,default:""}},watch:{isSubjectInfo:function(e){this.titlePop=e?"导入模板":"批量导入"}},data:function(){return{titlePop:"批量导入",importType:{},isInitDialog:!0,resMessage:{failInfoList:[]},percentage:0,isProgress:!0,dataInfo:[],tableKey:0,uploadStatus:!0}},computed:{isShow:{get:function(){return this.popVisible&&this.init(),this.popVisible},set:function(){}}},methods:{init:function(){this.$set(this.importType,"sender",this.$const.CUSTOMER_SENDER_EXCEL),this.$set(this.importType,"receiver",this.$const.CUSTOMER_RECEIVER_EXCEL),this.$set(this.importType,"truck",this.$const.TRUCK_EXCEL),this.$set(this.importType,"carrier",this.$const.CARRIER_EXCEL),this.$set(this.importType,"driver",this.$const.DRIVER_EXCEL),this.$set(this.importType,"subinfo",this.$const.SUBINFO_EXCEL),this.isInitDialog=!0},doAction:function(e){switch(e){case"import":break;case"download":this.downloadFile()}},downloadFile:function(){this.info&&window.open(this.importType[this.info])},closeMe:function(e){this.$emit("close"),"function"==typeof e&&e()},handleChange:function(){},uploadHandleFile:function(e){var t=this;this.uploadStatus=!0;var i=e.file,r="",o=i.name.toLowerCase(),a=o.lastIndexOf(".");if(-1<a&&(r=o.substring(a)),r&&".xlsx"===r){var s=new FormData,n=void 0;s.append("uploadfile",i),this.isProgress=!0,this.isSubjectInfo?n=Object(l.q)(s):(s.append("excelSign",this.info),n=Object(l.p)(s)),n.then(function(e){e&&(console.log("res",e),t.resMessage=e,t.failInfoList=e.failInfoList,t.uploadStatus=!0,t.percentageAnimated(),t.$emit("success"),t.$message({type:"success",message:"操作成功"})),t.isInitDialog=!1}).catch(function(e){t.resMessage=e,t.isInitDialog=!1,t.uploadStatus=!1,t.percentageAnimated(),t._handlerCatchMsg(e)})}else this.$message({type:"info",message:"只能上传 .xlsx 模板文件"})},percentageAnimated:function(){var e=this,t=0,i=setInterval(function(){t+=1,100===(e.percentage=t)&&(e.isProgress=!1,window.clearInterval(i))},10)}}}},bZax:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=i("frTf"),o=i("ubb7");var a=function(e){i("8Hxk")},s=i("VU/8")(r.a,o.a,a,null,null);t.default=s.exports},cqHs:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=i("Rf/G"),o=i("B2EE"),a=i("VU/8")(r.a,o.a,null,null,null);t.default=a.exports},frTf:function(e,t,i){"use strict";var r=i("woOf"),o=i.n(r),a=i("Dd8w"),s=i.n(a),n=i("E4LH"),l=i("4UdH"),c=i("P5Di"),d=i("QbVN"),u=i("o9X6"),m=i("NYxO");t.a={components:{popRight:c.a,Upload:d.a,SelectTree:u.a},props:{popVisible:{type:Boolean,default:!1},orgid:{required:!0},isModify:{type:Boolean,default:!1},info:{type:Object,default:function(){}},issender:{type:Boolean,dafault:!1}},computed:s()({},Object(m.mapGetters)(["otherinfo"])),data:function(){var t=this;return{form:{carrierAddr:"",carrierMobile:"",carrierName:"",carrierRemarks:"",carrierSn:"",contractEndtime:"",contractStarttime:"",customerServicePhone:"",liableName:"",liablePhone:"",orgid:0},formLabelWidth:"100px",tooltip:!1,rules:{carrierName:[{required:!0,message:"请输入承运商名称"}],orgid:[{required:!0,message:"请选择所属机构"}],carrierMobile:[{required:!0,trigger:"change",validator:function(e,t,i){""!==t&&null!==t&&t&&void 0!==t?n.a.MOBILE.test(t)?i():i(new Error("请输11位手机号码")):i(new Error("不能为空"))}}],liablePhone:[],carrierSn:[{message:"仅限字母或数字组合",pattern:n.a.ONLY_NUMBER_AND_LETTER}]},popTitle:"新增承运商",orgArr:[],rolesArr:[],departmentArr:[],loading:!1,roles:[],departments:[],groups:[],inited:!1,pickOption:{firstDayOfWeek:1,disabledDate:function(e){return!!t.form.contractEndtime&&e.getTime()>t.form.contractEndtime}},pickOption2:{firstDayOfWeek:1,disabledDate:function(e){return!!t.form.contractStarttime&&e.getTime()<t.form.contractStarttime}}}},mounted:function(){this.form.orgid=this.orgid,this.inited||(this.inited=!0,this.initInfo())},watch:{popVisible:function(e,t){this.inited||(this.inited=!0,this.initInfo()),e&&!this.isModify&&this.getCarrierSn()},orgid:function(e){this.form.orgid=e},info:function(){if(this.isModify){this.popTitle="修改承运商";var e=o()({},this.info);for(var t in this.form)this.form[t]=e[t];this.form.carrierId=e.carrierId}else{for(var i in this.popTitle="新增承运商",this.getCarrierSn(),this.form)this.form[i]="";delete this.form.carrierId,this.form.orgid=this.orgid}}},methods:{getCarrierSn:function(){var t=this;return this.loading=!0,Object(l.c)().then(function(e){t.form.carrierSn=e.data,console.log(e.data),t.loading=!1}).catch(function(e){t._handlerCatchMsg(e)})},initInfo:function(){this.loading=!1},getOrgid:function(e){this.form.orgid=e},submitForm:function(e,i){var r=this;this.$refs[e].validate(function(e){if(!e)return!1;r.loading=!0;var t=o()({},r.form);t.fixPhone=r.fixPhone;(r.isModify?Object(l.e)(t):Object(l.d)(t)).then(function(e){r.loading=!1,r.$message.success("保存成功"),r.reset(),i?(r.form.orgid=r.orgid,r.getCarrierSn()):r.closeMe(),r.$emit("success")}).catch(function(e){r._handlerCatchMsg(e),r.loading=!1})})},reset:function(){var e=this.form.orgid;this.$refs.ruleForm.resetFields(),this.form.orgid=e},closeMe:function(e){this.reset(),this.$emit("update:popVisible",!1),"function"==typeof e&&e()}}}},ijWn:function(e,t,i){"use strict";var r=i("bPPU"),o=i("j///"),a=i("VU/8")(r.a,o.a,null,null,null);t.a=a.exports},"j///":function(e,t,i){"use strict";var r={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-dialog",{staticClass:"tms_dialog tms_dialog_import",attrs:{title:t.titlePop,visible:t.isShow,"close-on-click-modal":!1,"before-close":t.closeMe,width:"500px"},on:{"update:visible":function(e){t.isShow=e}}},[t.isInitDialog?i("el-row",[i("el-col",{attrs:{span:12}},[i("el-upload",{attrs:{"show-file-list":!1,"on-change":t.handleChange,action:"","http-request":t.uploadHandleFile}},[i("div",{staticClass:"bigIconBtn_primary",on:{click:function(e){t.doAction("import")}}},[i("i",{staticClass:"icon-export-btn"}),t._v(" "),i("br"),t._v(" "),i("span",[t._v("上传文件")])])])],1),t._v(" "),i("el-col",{attrs:{span:12}},[i("div",{staticClass:"bigIconBtn_success",on:{click:function(e){t.doAction("download")}}},[i("i",{staticClass:"icon-import-btn"}),t._v(" "),i("br"),t._v(" "),i("span",[t._v("下载标准模板")])])]),t._v(" "),i("el-col",{attrs:{span:22,offset:2}},[t.isSubjectInfo?i("ul",{staticClass:"importTips",attrs:{type:"1"}},[i("li",[t._v("1、导入前，需要先下载标准版，按照标准模板后再上传。")]),t._v(" "),i("li",[t._v("2、每次最多能导入1000条，超过1000条，只导入前1000条。")])]):i("ul",{staticClass:"importTips",attrs:{type:"1"}},[i("li",[t._v("1、导入前，需要先下载标准版，按照标准模板后再上传。")]),t._v(" "),i("li",[t._v("2、发货人，手机号码必须填写，且不能与已有客户重复。")]),t._v(" "),i("li",[t._v("3、导入所属网点默认为本网点。")]),t._v(" "),i("li",[t._v("4、每次最多能导入1000条，超过1000条，只导入前1000条。")])])])],1):i("div",{staticClass:"import_result"},[t.isProgress?i("el-progress",{attrs:{"text-inside":!0,"stroke-width":15,percentage:t.percentage,status:t.uploadStatus&&40<t.percentages?"success":"exception"}}):i("p",[t._v(t._s(t.resMessage.resultInfo))]),t._v(" "),i("el-table",{key:t.tableKey,ref:"multipleTable",class:11<(t.resMessage.failInfoList&&t.resMessage.failInfoList.length)?"failinScroll":"",staticStyle:{width:"100%","margin-top":"10px"},attrs:{data:t.resMessage.failInfoList,stripe:"",border:"","tooltip-effect":"dark","default-sort":{prop:"id",order:"ascending"}}},[i("el-table-column",{attrs:{sortable:"",type:"index",width:"60",label:"序号"}}),t._v(" "),i("el-table-column",{attrs:{prop:"failExcelNum",width:"130",label:"失败行"}}),t._v(" "),i("el-table-column",{attrs:{prop:"failInfo",label:"失败字段"}})],1)],1)],1)},staticRenderFns:[]};t.a=r},rvO4:function(e,t,i){"use strict";var r={render:function(){var r=this,e=r.$createElement,o=r._self._c||e;return o("div",{directives:[{name:"loading",rawName:"v-loading",value:r.loading,expression:"loading"}],staticClass:"carrier-manager miniHeaderSearch"},[o("SearchForm",{attrs:{orgid:r.otherinfo.orgid,issender:!0,btnsize:r.btnsize},on:{change:r.getSearchParam}}),r._v(" "),o("div",{staticClass:"tab_info"},[o("div",{staticClass:"btns_box"},[o("el-button",{directives:[{name:"has",rawName:"v-has:CARRIER_ADD",arg:"CARRIER_ADD"}],attrs:{type:"primary",size:r.btnsize,icon:"el-icon-circle-plus",plain:""},on:{click:function(e){r.doAction("add")}}},[r._v("新增")]),r._v(" "),o("el-button",{directives:[{name:"has",rawName:"v-has:CARRIER_UP",arg:"CARRIER_UP"}],attrs:{type:"primary",size:r.btnsize,icon:"el-icon-edit",plain:""},on:{click:function(e){r.doAction("modify")}}},[r._v("修改")]),r._v(" "),o("el-button",{directives:[{name:"has",rawName:"v-has:CARRIER_DEL",arg:"CARRIER_DEL"}],attrs:{type:"danger",size:r.btnsize,icon:"el-icon-delete",plain:""},on:{click:function(e){r.doAction("delete")}}},[r._v("删除")]),r._v(" "),o("el-button",{directives:[{name:"has",rawName:"v-has:CARRIER_EXP",arg:"CARRIER_EXP"}],attrs:{type:"primary",size:r.btnsize,icon:"el-icon-edit-outline",plain:""},on:{click:function(e){r.doAction("export")}}},[r._v("导出")]),r._v(" "),o("el-button",{directives:[{name:"has",rawName:"v-has:CARRIER_EOP",arg:"CARRIER_EOP"}],attrs:{type:"primary",size:r.btnsize,icon:"el-icon-edit-outline",plain:""},on:{click:function(e){r.doAction("import")}}},[r._v("批量导入")]),r._v(" "),o("el-button",{staticClass:"table_setup",attrs:{type:"primary",size:r.btnsize,icon:"el-icon-setting",plain:""},on:{click:r.setTable}},[r._v("表格设置")])],1),r._v(" "),o("div",{staticClass:"info_tab"},[o("el-table",{key:r.tablekey,ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:r.usersArr,stripe:"",border:"",height:"100%","tooltip-effect":"dark","default-sort":{prop:"id",order:"ascending"}},on:{"row-click":r.clickDetails,"selection-change":r.getSelection}},[o("el-table-column",{attrs:{fixed:"",sortable:"",type:"selection",width:"50"}}),r._v(" "),r._l(r.tableColumn,function(i){return[i.slot?o("el-table-column",{key:i.id,attrs:{fixed:i.fixed,sortable:"",label:i.label,prop:i.prop,width:i.width||""},scopedSlots:r._u([{key:"header",fn:function(e){return[o("tableHeaderSearch",{attrs:{scope:e,query:r.searchQuery},on:{change:r.changeKey}})]}},{key:"default",fn:function(t){return[i.click?o("span",{staticClass:"clickitem",domProps:{innerHTML:r._s(i.slot(t))},on:{click:function(e){e.stopPropagation(),i.click(t)}}}):o("span",{domProps:{innerHTML:r._s(i.slot(t))}})]}}])}):o("el-table-column",{key:i.id,attrs:{fixed:i.fixed,sortable:"",label:i.label,prop:i.prop,width:i.width},scopedSlots:r._u([{key:"header",fn:function(e){return[o("tableHeaderSearch",{attrs:{scope:e,query:r.searchQuery},on:{change:r.changeKey}})]}},{key:"default",fn:function(e){return[r._v(r._s(e.row[i.prop]))]}}])})]})],2)],1),r._v(" "),o("div",{staticClass:"info_tab_footer"},[r._v("共计:"+r._s(r.total)+" "),o("div",{staticClass:"show_pager"},[o("Pager",{attrs:{total:r.total},on:{change:r.handlePageChange}})],1)])]),r._v(" "),o("AddCustomer",{attrs:{issender:!0,isModify:r.isModify,info:r.selectInfo,orgid:r.orgid,popVisible:r.AddCustomerVisible},on:{"update:popVisible":function(e){r.AddCustomerVisible=e},close:r.closeAddCustomer,success:r.fetchData}}),r._v(" "),o("TableSetup",{attrs:{issender:!0,columns:r.tableColumn,popVisible:r.setupTableVisible},on:{success:r.setColumn,close:r.closeSetupTable}}),r._v(" "),o("ImportDialog",{attrs:{popVisible:r.importDialogVisible,info:"carrier"},on:{close:function(e){r.importDialogVisible=!1},success:r.fetchData}})],1)},staticRenderFns:[]};t.a=r},ubb7:function(e,t,i){"use strict";var r={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("pop-right",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"addCarrierPop",attrs:{title:t.popTitle,isShow:t.popVisible},on:{close:t.closeMe}},[i("template",{staticClass:"addCarrierPop-content",slot:"content"},[i("el-form",{ref:"ruleForm",attrs:{model:t.form,rules:t.rules,"label-width":t.formLabelWidth,inline:!0,"label-position":"right",size:"mini"}},[i("el-form-item",{attrs:{label:"归属网点",prop:"orgid"}},[i("SelectTree",{attrs:{orgid:t.otherinfo.orgid},model:{value:t.form.orgid,callback:function(e){t.$set(t.form,"orgid",e)},expression:"form.orgid"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"承运商编码",prop:"carrierSn"}},[i("el-input",{attrs:{maxlength:11,"auto-complete":"off"},model:{value:t.form.carrierSn,callback:function(e){t.$set(t.form,"carrierSn","string"==typeof e?e.trim():e)},expression:"form.carrierSn"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"承运商",prop:"carrierName"}},[i("el-input",{attrs:{maxlength:20,"auto-complete":"off"},model:{value:t.form.carrierName,callback:function(e){t.$set(t.form,"carrierName","string"==typeof e?e.trim():e)},expression:"form.carrierName"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"承运商电话",prop:"carrierMobile"}},[i("el-input",{attrs:{maxlength:11,"auto-complete":"off"},model:{value:t.form.carrierMobile,callback:function(e){t.$set(t.form,"carrierMobile",e)},expression:"form.carrierMobile"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"负责人",prop:"liableName"}},[i("el-input",{attrs:{maxlength:25,"auto-complete":"off"},model:{value:t.form.liableName,callback:function(e){t.$set(t.form,"liableName",e)},expression:"form.liableName"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"负责人手机",prop:"liablePhone"}},[i("el-input",{directives:[{name:"numberOnly",rawName:"v-numberOnly"}],attrs:{maxlength:11,"auto-complete":"off"},model:{value:t.form.liablePhone,callback:function(e){t.$set(t.form,"liablePhone",e)},expression:"form.liablePhone"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"合同起始日",prop:"contractStarttime"}},[i("el-date-picker",{attrs:{align:"right",type:"date",placeholder:"选择日期","value-format":"timestamp","picker-options":t.pickOption},model:{value:t.form.contractStarttime,callback:function(e){t.$set(t.form,"contractStarttime",e)},expression:"form.contractStarttime"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"合同终止日",prop:"contractEndtime"}},[i("el-date-picker",{attrs:{align:"right",type:"date","picker-options":t.pickOption2,placeholder:"选择日期","value-format":"timestamp"},model:{value:t.form.contractEndtime,callback:function(e){t.$set(t.form,"contractEndtime",e)},expression:"form.contractEndtime"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"客服电话",prop:"customerServicePhone"}},[i("el-input",{directives:[{name:"numberOnly",rawName:"v-numberOnly"}],attrs:{maxlength:11,"auto-complete":"off"},model:{value:t.form.customerServicePhone,callback:function(e){t.$set(t.form,"customerServicePhone",e)},expression:"form.customerServicePhone"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"地址",prop:"carrierAddr"}},[i("el-input",{attrs:{maxlength:50,"auto-complete":"off"},model:{value:t.form.carrierAddr,callback:function(e){t.$set(t.form,"carrierAddr","string"==typeof e?e.trim():e)},expression:"form.carrierAddr"}})],1),t._v(" "),i("el-form-item",{staticClass:"carrierRemarks",attrs:{label:"备注",prop:"carrierRemarks"}},[i("el-input",{attrs:{type:"textarea",maxlength:300},model:{value:t.form.carrierRemarks,callback:function(e){t.$set(t.form,"carrierRemarks",e)},expression:"form.carrierRemarks"}})],1)],1)],1),t._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t.isModify?t._e():i("el-button",{attrs:{type:"primary"},on:{click:function(e){t.submitForm("ruleForm",!0)}}},[t._v("保存并添加")]),t._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:function(e){t.submitForm("ruleForm")}}},[t._v("保 存")]),t._v(" "),i("el-button",{on:{click:t.closeMe}},[t._v("取 消")])],1)],2)},staticRenderFns:[]};t.a=r},yFcB:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=i("YNOH"),o=i("rvO4");var a=function(e){i("MQ/+"),i("60/2")},s=i("VU/8")(r.a,o.a,a,"data-v-1cb38296",null);t.default=s.exports}});