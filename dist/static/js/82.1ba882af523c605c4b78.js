webpackJsonp([82,321,398],{"55Wa":function(e,t){},"5Wjc":function(e,t){},"7gyK":function(e,t,i){"use strict";var a=i("E4LH"),r=i("o9X6");t.a={components:{SelectTree:r.a},props:{btnsize:{type:String,default:"mini"},orgid:{type:Number}},data:function(){var r=this;return{searchForm:{orgid:"",name:"",mobile:""},rules:{mobile:[{validator:function(e,t,i){r.searchForm.mobile=t.replace(a.a.NO_NUMBER,""),i()},trigger:"change"}]}}},watch:{orgid:function(e){this.searchForm.orgid=e}},mounted:function(){this.searchForm.orgid=this.orgid},methods:{getOrgid:function(e){this.searchForm.orgid=e},onSubmit:function(){this.$emit("change",this.searchForm)},clearForm:function(){this.searchForm.name="",this.searchForm.orgid=this.orgid,this.searchForm.mobile=""}}}},"8grC":function(e,t,i){"use strict";var r={render:function(){var r=this,e=r.$createElement,a=r._self._c||e;return a("div",{directives:[{name:"loading",rawName:"v-loading",value:r.loading,expression:"loading"}],staticClass:"driver-manager miniHeaderSearch"},[a("SearchForm",{attrs:{orgid:r.otherinfo.orgid,issender:!0,btnsize:r.btnsize},on:{change:r.getSearchParam}}),r._v(" "),a("div",{staticClass:"tab_info"},[a("div",{staticClass:"btns_box"},[a("el-button",{directives:[{name:"has",rawName:"v-has:DRIVER_ADD",arg:"DRIVER_ADD"}],attrs:{type:"primary",size:r.btnsize,icon:"el-icon-circle-plus",plain:""},on:{click:function(e){r.doAction("add")}}},[r._v("新增")]),r._v(" "),a("el-button",{directives:[{name:"has",rawName:"v-has:DRIVER_UPDATE",arg:"DRIVER_UPDATE"}],attrs:{type:"primary",size:r.btnsize,icon:"el-icon-edit",plain:""},on:{click:function(e){r.doAction("modify")}}},[r._v("修改")]),r._v(" "),a("el-button",{directives:[{name:"has",rawName:"v-has:DRIVER_DEL",arg:"DRIVER_DEL"}],attrs:{type:"danger",size:r.btnsize,icon:"el-icon-delete",plain:""},on:{click:function(e){r.doAction("delete")}}},[r._v("删除")]),r._v(" "),a("el-button",{directives:[{name:"has",rawName:"v-has:DRIVER_EXP",arg:"DRIVER_EXP"}],attrs:{type:"primary",size:r.btnsize,icon:"el-icon-edit-outline",plain:""},on:{click:function(e){r.doAction("export")}}},[r._v("导出")]),r._v(" "),a("el-button",{directives:[{name:"has",rawName:"v-has:DRIVER_EOP",arg:"DRIVER_EOP"}],attrs:{type:"primary",size:r.btnsize,icon:"el-icon-edit-outline",plain:""},on:{click:function(e){r.doAction("import")}}},[r._v("批量导入")]),r._v(" "),a("el-button",{staticClass:"table_setup",attrs:{type:"primary",size:r.btnsize,icon:"el-icon-setting",plain:""},on:{click:r.setTable}},[r._v("表格设置")])],1),r._v(" "),a("div",{staticClass:"info_tab"},[a("el-table",{key:r.tablekey,ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:r.usersArr,stripe:"",border:"",height:"100%","tooltip-effect":"dark","default-sort":{prop:"id",order:"ascending"}},on:{"row-click":r.clickDetails,"selection-change":r.getSelection}},[a("el-table-column",{attrs:{fixed:"",sortable:"",type:"selection",width:"50"}}),r._v(" "),r._l(r.tableColumn,function(i){return[i.ispic?a("el-table-column",{key:i.id,attrs:{fixed:i.fixed,sortable:"",label:i.label,prop:i.prop,width:i.width},scopedSlots:r._u([{key:"default",fn:function(e){return[e.row[i.prop]?a("span",{directives:[{name:"showPicture",rawName:"v-showPicture"}],attrs:{imgurl:e.row[i.prop]}},[r._v("预览")]):r._e()]}}])}):i.slot?a("el-table-column",{key:i.id,attrs:{fixed:i.fixed,sortable:"",label:i.label,prop:i.prop,width:i.width||""},scopedSlots:r._u([{key:"header",fn:function(e){return[a("tableHeaderSearch",{attrs:{scope:e,query:r.searchQuery},on:{change:r.changeKey}})]}},{key:"default",fn:function(t){return[i.click?a("span",{staticClass:"clickitem",domProps:{innerHTML:r._s(i.slot(t))},on:{click:function(e){e.stopPropagation(),i.click(t)}}}):a("span",{domProps:{innerHTML:r._s(i.slot(t))}})]}}])}):a("el-table-column",{key:i.id,attrs:{fixed:i.fixed,sortable:"",label:i.label,prop:i.prop,width:i.width},scopedSlots:r._u([{key:"header",fn:function(e){return[a("tableHeaderSearch",{attrs:{scope:e,query:r.searchQuery},on:{change:r.changeKey}})]}},{key:"default",fn:function(e){return[r._v(r._s(e.row[i.prop]))]}}])})]})],2)],1),r._v(" "),a("div",{staticClass:"info_tab_footer"},[r._v("共计:"+r._s(r.total)+" "),a("div",{staticClass:"show_pager"},[a("Pager",{attrs:{total:r.total},on:{change:r.handlePageChange}})],1)])]),r._v(" "),a("AddCustomer",{attrs:{licenseTypes:r.licenseTypes,issender:!0,isModify:r.isModify,info:r.selectInfo,orgid:r.orgid,popVisible:r.AddCustomerVisible},on:{"update:popVisible":function(e){r.AddCustomerVisible=e},close:r.closeAddCustomer,success:r.fetchData}}),r._v(" "),a("TableSetup",{attrs:{issender:!0,popVisible:r.setupTableVisible,columns:r.tableColumn},on:{close:r.closeSetupTable,success:r.setColumn}}),r._v(" "),a("ImportDialog",{attrs:{popVisible:r.importDialogVisible,info:"driver"},on:{close:function(e){r.importDialogVisible=!1},success:r.fetchData}})],1)},staticRenderFns:[]};t.a=r},"9l6W":function(e,t,i){"use strict";var r=i("woOf"),o=i.n(r),a=i("Dd8w"),s=i.n(a),n=i("E4LH"),l=i("9ani"),c=i("P5Di"),p=i("QbVN"),d=i("o9X6"),u=i("9UCZ"),m=i("NYxO"),f=i("0xDb");t.a={components:{popRight:c.a,Upload:p.a,SelectTree:d.a,SelectType:u.a},props:{popVisible:{type:Boolean,default:!1},orgid:{required:!0},isModify:{type:Boolean,default:!1},info:{type:Object,default:function(){}},licenseTypes:{type:Array,default:function(){return[]}}},computed:s()({},Object(m.mapGetters)(["otherinfo"])),data:function(){return{searchTime:[],form:{bankCardNumber:"",bankName:"",certification:"",driverAddress:"",driverCardid:"",driverMobile:"",driverName:"",driverRemarks:"",drivingPicture:"",idcardPicture:"",licenseType:"",licenseTypeName:"",openBank:"",validityDate:"",validityStartdate:"",orgid:0},formLabelWidth:"100px",tooltip:!1,rules:{driverName:[{required:!0,message:"请输入司机名称"}],orgid:[{required:!0,message:"请选择所属机构"}],driverMobile:[{required:!0,trigger:"change",validator:function(e,t,i){""!==t&&null!==t&&t&&void 0!==t?n.a.MOBILE.test(t)?i():i(new Error("请输入有效的手机号码")):i(new Error("不能为空"))}}],driverCardid:[{pattern:n.a.ONLY_NUMBER_AND_LETTER,message:"身份证号码只能输入字母和数字"}]},popTitle:"新增司机",orgArr:[],rolesArr:[],departmentArr:[],loading:!1,roles:[],departments:[],groups:[],inited:!1,pickOption2:{firstDayOfWeek:1,disabledDate:function(e){return e.getTime()<Date.now()}}}},mounted:function(){this.form.orgid=this.orgid,this.inited||(this.inited=!0,this.initInfo())},watch:{popVisible:{handler:function(e,t){this.inited||(this.inited=!0,this.initInfo())},immediate:!0},orgid:function(e){this.form.orgid=e},info:{handler:function(e,t){if(this.isModify){this.popTitle="修改司机";var i=o()({},e);for(var r in this.form)this.form[r]=i[r];e.validityStartdate&&this.$set(this.searchTime,0,e.validityStartdate),e.validityDate&&this.$set(this.searchTime,1,e.validityDate),console.log(e.validityStartdate,e.validityDate),this.form.id=i.id}else{for(var a in this.popTitle="新增司机",this.form)this.form[a]="";this.searchTime=this.$options.data().searchTime,delete this.form.id,this.form.orgid=this.orgid}},deep:!0}},methods:{initInfo:function(){this.loading=!1},getOrgid:function(e){this.form.orgid=e},submitForm:function(e,r){var a=this;this.$refs[e].validate(function(e){if(!e)return!1;a.loading=!0;var t=o()({},a.form);t.fixPhone=a.fixPhone,a.searchTime&&a.searchTime[0]&&a.searchTime[1]&&(t.validityStartdate=Object(f.parseTime)(a.searchTime[0],"{y}-{m}-{d} ")+" 00:00:00",t.validityDate=Object(f.parseTime)(a.searchTime[1],"{y}-{m}-{d} ")+" 23:59:59");var i=void 0;console.log(a.isModify),a.isModify?i=Object(l.e)(t):a.isModify||(i=Object(l.d)(t)),i.then(function(e){a.loading=!1,a.$message.success("保存成功"),a.reset(),r||a.closeMe(),a.$emit("success")}).catch(function(e){a._handlerCatchMsg(e),a.loading=!1})})},reset:function(){var e=this.form.orgid;this.$refs.ruleForm.resetFields(),this.form.driverMobile="",this.form.idcardPicture="",this.form.drivingPicture="",this.form.certification="",this.form.orgid=e,this.searchTime=[]},closeMe:function(e){this.$emit("update:popVisible",!1),"function"==typeof e&&e()}}}},AOd5:function(e,t,i){"use strict";var r={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-form",{staticClass:"driver_searchinfo staff_searchinfo clearfix",attrs:{inline:!0,size:t.btnsize,"label-position":"right","label-width":"70px",rules:t.rules,model:t.searchForm}},[i("div",{staticClass:"staff_searchinfo--input"},[i("el-form-item",{attrs:{label:"网点"}},[i("SelectTree",{model:{value:t.searchForm.orgid,callback:function(e){t.$set(t.searchForm,"orgid",e)},expression:"searchForm.orgid"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"司机名称"}},[i("el-input",{attrs:{placeholder:"司机名称",maxlength:"15",clearable:""},model:{value:t.searchForm.name,callback:function(e){t.$set(t.searchForm,"name",e)},expression:"searchForm.name"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"司机电话"}},[i("el-input",{directives:[{name:"numberOnly",rawName:"v-numberOnly"}],attrs:{placeholder:"请输入司机电话",maxlength:"11",clearable:""},model:{value:t.searchForm.mobile,callback:function(e){t.$set(t.searchForm,"mobile",e)},expression:"searchForm.mobile"}})],1)],1),t._v(" "),i("el-form-item",{staticClass:"staff_searchinfo--btn"},[i("el-button",{attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v("查询")]),t._v(" "),i("el-button",{attrs:{type:"info",plain:""},on:{click:t.clearForm}},[t._v("清空")])],1)],1)},staticRenderFns:[]};t.a=r},AfEI:function(e,t,i){"use strict";var r={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("pop-right",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"addDriverPop",attrs:{title:t.popTitle,isShow:t.popVisible},on:{close:t.closeMe}},[i("template",{staticClass:"addDriverPop-content",slot:"content"},[i("el-form",{ref:"ruleForm",attrs:{model:t.form,rules:t.rules,"label-width":t.formLabelWidth,inline:!0,"label-position":"right",size:"mini"}},[i("el-form-item",{attrs:{label:"司机姓名",prop:"driverName"}},[i("el-input",{attrs:{maxlength:10,"auto-complete":"off"},model:{value:t.form.driverName,callback:function(e){t.$set(t.form,"driverName","string"==typeof e?e.trim():e)},expression:"form.driverName"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"手机号码",prop:"driverMobile"}},[i("el-input",{attrs:{maxlength:11,"auto-complete":"off"},model:{value:t.form.driverMobile,callback:function(e){t.$set(t.form,"driverMobile",e)},expression:"form.driverMobile"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"归属网点",prop:"orgid"}},[i("SelectTree",{attrs:{orgid:t.otherinfo.orgid},model:{value:t.form.orgid,callback:function(e){t.$set(t.form,"orgid",e)},expression:"form.orgid"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"身份证号",prop:"driverCardid"}},[i("el-input",{attrs:{maxlength:18,"auto-complete":"off"},model:{value:t.form.driverCardid,callback:function(e){t.$set(t.form,"driverCardid",e)},expression:"form.driverCardid"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"驾驶证类型",prop:"licenseType"}},[i("SelectType",{attrs:{type:"driving_type",placeholder:"驾驶证类型"},model:{value:t.form.licenseType,callback:function(e){t.$set(t.form,"licenseType",e)},expression:"form.licenseType"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"银行卡号",prop:"bankCardNumber"}},[i("el-input",{directives:[{name:"numberOnly",rawName:"v-numberOnly"}],attrs:{maxlength:18,"auto-complete":"off"},model:{value:t.form.bankCardNumber,callback:function(e){t.$set(t.form,"bankCardNumber",e)},expression:"form.bankCardNumber"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"银行名称",prop:"bankName"}},[i("el-input",{attrs:{maxlength:20,"auto-complete":"off"},model:{value:t.form.bankName,callback:function(e){t.$set(t.form,"bankName",e)},expression:"form.bankName"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"开户行",prop:"openBank"}},[i("el-input",{attrs:{maxlength:20,"auto-complete":"off"},model:{value:t.form.openBank,callback:function(e){t.$set(t.form,"openBank",e)},expression:"form.openBank"}})],1),t._v(" "),i("el-form-item",{staticClass:"blockInput",attrs:{label:"驾驶证有效期",prop:"validityDate"}},[i("el-date-picker",{attrs:{type:"daterange","unlink-panels":"",align:"right","value-format":"yyyy-MM-dd HH:mm:ss","start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:t.searchTime,callback:function(e){t.searchTime=e},expression:"searchTime"}})],1),t._v(" "),i("el-form-item",{staticClass:"blockInput",attrs:{label:"司机地址",prop:"driverAddress"}},[i("el-input",{attrs:{maxlength:50,"auto-complete":"off"},model:{value:t.form.driverAddress,callback:function(e){t.$set(t.form,"driverAddress",e)},expression:"form.driverAddress"}})],1),t._v(" "),i("el-form-item",{staticClass:"driverRemarks",attrs:{label:"备注",prop:"driverRemarks"}},[i("el-input",{attrs:{type:"textarea",maxlength:300},model:{value:t.form.driverRemarks,callback:function(e){t.$set(t.form,"driverRemarks","string"==typeof e?e.trim():e)},expression:"form.driverRemarks"}})],1),t._v(" "),i("el-form-item",{staticClass:"clearfix uploadcard"},[i("div",{staticClass:"idcard"},[i("upload",{attrs:{title:"身份证"},model:{value:t.form.idcardPicture,callback:function(e){t.$set(t.form,"idcardPicture",e)},expression:"form.idcardPicture"}})],1),t._v(" "),i("div",{staticClass:"drviercard"},[i("upload",{attrs:{title:"驾驶证"},model:{value:t.form.drivingPicture,callback:function(e){t.$set(t.form,"drivingPicture",e)},expression:"form.drivingPicture"}})],1),t._v(" "),i("div",{staticClass:"certcard"},[i("upload",{attrs:{title:"从业资格证"},model:{value:t.form.certification,callback:function(e){t.$set(t.form,"certification",e)},expression:"form.certification"}})],1)])],1)],1),t._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t.isModify?t._e():i("el-button",{attrs:{type:"primary"},on:{click:function(e){t.submitForm("ruleForm",!0)}}},[t._v("保存并新增")]),t._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:function(e){t.submitForm("ruleForm")}}},[t._v("保 存")]),t._v(" "),i("el-button",{on:{click:t.closeMe}},[t._v("取 消")])],1)],2)},staticRenderFns:[]};t.a=r},FKPH:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=i("9l6W"),a=i("AfEI");var o=function(e){i("grrk")},s=i("VU/8")(r.a,a.a,o,null,null);t.default=s.exports},Llzj:function(e,t,i){"use strict";var r=i("//Fk"),a=i.n(r),o=i("Dd8w"),s=i.n(o),n=i("9ani"),l=i("N0Fb"),c=i("puNT"),p=i("FKPH"),d=i("NYxO"),u=i("1onU"),m=i("ijWn"),f=i("0xDb"),h=i("UQm2"),y=i("vmn5");t.a={name:"driverManage",components:{SearchForm:l.default,Pager:u.a,TableSetup:c.a,AddCustomer:p.default,ImportDialog:m.a,tableHeaderSearch:y.a},computed:s()({},Object(d.mapGetters)(["otherinfo"]),{orgid:function(){return console.log(this.selectInfo.orgid,this.searchQuery.vo.orgid,this.otherinfo.orgid),this.isModify?this.selectInfo.orgid:this.searchQuery.vo.orgid||this.otherinfo.orgid}}),mounted:function(){var t=this;this.searchQuery.vo.orgid=this.otherinfo.orgid,a.a.all([this.fetchAllCustomer(this.otherinfo.orgid),Object(n.c)(this.otherinfo.orgid)]).then(function(e){t.loading=!1,t.licenseTypes=e[1]})},data:function(){var t=this;return{btnsize:"mini",usersArr:[],total:0,loading:!0,importDialogVisible:!1,setupTableVisible:!1,AddCustomerVisible:!1,isModify:!1,selectInfo:{},selected:[],searchQuery:{currentPage:1,pageSize:100,vo:{orgid:1,driverMobile:"",driverName:""}},licenseTypes:[],tablekey:"",tableColumn:[{label:"序号",prop:"id",width:"70",fixed:!0,slot:function(e){return(t.searchQuery.currentPage-1)*t.searchQuery.pageSize+e.$index+1}},{label:"归属网点",prop:"orgName",width:"120",fixed:!0},{label:"司机姓名",prop:"driverName",width:"120",fixed:!1},{label:"司机电话",prop:"driverMobile",width:"120",fixed:!1},{label:"身份证号码",prop:"driverCardid",width:"180",fixed:!1},{label:"驾驶证类型",prop:"licenseTypeName",width:"120",fixed:!1},{label:"驾驶证有效期（开始）",prop:"validityStartdate",width:"170",fixed:!1},{label:"驾驶证有效期（结束）",prop:"validityDate",width:"170",fixed:!1},{label:"银行卡号",prop:"bankCardNumber",width:"180",fixed:!1},{label:"银行名称",prop:"bankName",width:"120",fixed:!1},{label:"开户行",prop:"openBank",width:"120",fixed:!1},{label:"地址",prop:"driverAddress",width:"120",fixed:!1},{label:"备注",prop:"driverRemarks",fixed:!1}]}},methods:{changeKey:function(e){this.total=0,this.searchQuery=e,this.loading||this.fetchAllCustomer()},getLicenType:function(t){var e=this.licenseTypes.filter(function(e){return parseInt(e.id,10)===t});return e[0]?e[0].dictName:t},fetchAllCustomer:function(){var t=this;return this.loading=!0,Object(n.b)(this.searchQuery).then(function(e){t.usersArr=e.list,t.total=e.total,t.loading=!1}).catch(function(e){t.loading=!1,t._handlerCatchMsg(e)})},fetchData:function(){this.fetchAllCustomer()},handlePageChange:function(e){this.searchQuery.currentPage=e.pageNum,this.searchQuery.pageSize=e.pageSize,this.fetchAllCustomer()},getSearchParam:function(e){this.searchQuery.currentPage=this.$options.data().searchQuery.currentPage,this.searchQuery.pageSize=this.$options.data().searchQuery.pageSize,this.searchQuery.vo.orgid=e.orgid,this.searchQuery.vo.driverMobile=e.mobile,this.searchQuery.vo.driverName=e.name,this.fetchAllCustomer()},showImport:function(){},doAction:function(e){var t=this;if(!this.selected.length&&"add"!==e&&"import"!==e&&"export"!==e)return this.closeAddCustomer(),this.$message({message:"请选择要操作的项~",type:"warning"}),!1;switch(console.log("this.selected:",this.selected),e){case"add":this.isModify=!1,this.selectInfo={},this.openAddCustomer();break;case"modify":this.isModify=!0,1<this.selected.length&&this.$message({message:"每次只能修改单条数据~",type:"warning"}),this.selectInfo=this.selected[0],this.openAddCustomer();break;case"delete":var i=1<this.selected.length?this.selected.length+"名":this.selected[0].driverName,r=this.selected.map(function(e){return e.id});r=r.join(","),this.$confirm("确定要删除 "+i+" 司机吗？","提示",{confirmButtonText:"删除",cancelButtonText:"取消",type:"warning"}).then(function(){Object(n.a)(r).then(function(e){t.$message({type:"success",message:"删除成功!"}),t.fetchData()}).catch(function(e){t.$message({type:"info",message:e.errorInfo})})}).catch(function(){t.$message({type:"info",message:"已取消删除"})});break;case"export":Object(h.g)({data:this.selected.length?this.selected:this.usersArr,columns:this.tableColumn,name:"司机列表-"+Object(f.parseTime)(new Date,"{y}{m}{d}{h}{i}{s}")});break;case"import":this.importDialogVisible=!0}this.$refs.multipleTable.clearSelection()},setTable:function(){this.setupTableVisible=!0},closeSetupTable:function(){this.setupTableVisible=!1},setColumn:function(e){this.tableColumn=e,this.tablekey=(new Date).getTime()},openAddCustomer:function(){this.AddCustomerVisible=!0},closeAddCustomer:function(){this.AddCustomerVisible=!1},clickDetails:function(e,t,i){this.$refs.multipleTable.toggleRowSelection(e)},getSelection:function(e){this.selected=e}}}},N0Fb:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=i("7gyK"),a=i("AOd5"),o=i("VU/8")(r.a,a.a,null,null,null);t.default=o.exports},bPPU:function(e,t,i){"use strict";var l=i("t5DY");t.a={props:{isSubjectInfo:{type:Boolean,default:!1},popVisible:{type:Boolean,default:!1},info:{type:String,default:""}},watch:{isSubjectInfo:function(e){this.titlePop=e?"导入模板":"批量导入"}},data:function(){return{titlePop:"批量导入",importType:{},isInitDialog:!0,resMessage:{failInfoList:[]},percentage:0,isProgress:!0,dataInfo:[],tableKey:0,uploadStatus:!0}},computed:{isShow:{get:function(){return this.popVisible&&this.init(),this.popVisible},set:function(){}}},methods:{init:function(){this.$set(this.importType,"sender",this.$const.CUSTOMER_SENDER_EXCEL),this.$set(this.importType,"receiver",this.$const.CUSTOMER_RECEIVER_EXCEL),this.$set(this.importType,"truck",this.$const.TRUCK_EXCEL),this.$set(this.importType,"carrier",this.$const.CARRIER_EXCEL),this.$set(this.importType,"driver",this.$const.DRIVER_EXCEL),this.$set(this.importType,"subinfo",this.$const.SUBINFO_EXCEL),this.isInitDialog=!0},doAction:function(e){switch(e){case"import":break;case"download":this.downloadFile()}},downloadFile:function(){this.info&&window.open(this.importType[this.info])},closeMe:function(e){this.$emit("close"),"function"==typeof e&&e()},handleChange:function(){},uploadHandleFile:function(e){var t=this;this.uploadStatus=!0;var i=e.file,r="",a=i.name.toLowerCase(),o=a.lastIndexOf(".");if(-1<o&&(r=a.substring(o)),r&&".xlsx"===r){var s=new FormData,n=void 0;s.append("uploadfile",i),this.isProgress=!0,this.isSubjectInfo?n=Object(l.q)(s):(s.append("excelSign",this.info),n=Object(l.p)(s)),n.then(function(e){e&&(console.log("res",e),t.resMessage=e,t.failInfoList=e.failInfoList,t.uploadStatus=!0,t.percentageAnimated(),t.$emit("success"),t.$message({type:"success",message:"操作成功"})),t.isInitDialog=!1}).catch(function(e){t.resMessage=e,t.isInitDialog=!1,t.uploadStatus=!1,t.percentageAnimated(),t._handlerCatchMsg(e)})}else this.$message({type:"info",message:"只能上传 .xlsx 模板文件"})},percentageAnimated:function(){var e=this,t=0,i=setInterval(function(){t+=1,100===(e.percentage=t)&&(e.isProgress=!1,window.clearInterval(i))},10)}}}},grrk:function(e,t){},htJl:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=i("Llzj"),a=i("8grC");var o=function(e){i("5Wjc"),i("sMyT")},s=i("VU/8")(r.a,a.a,o,"data-v-41c1318a",null);t.default=s.exports},i2Q8:function(e,t,i){"use strict";var r=i("woOf"),a=i.n(r),o=i("0xDb"),s=i("9UCZ");t.a={components:{SelectType:s.a},props:{scope:{type:Object,default:function(){}},query:{type:Object,default:function(){}}},data:function(){return{btnsize:"mini",queryString:"",curSelect:{property:"shipShippingTypeName",label:"运输方式",type:"ship_shipping_type",options:[],filter:[],dispage:[]},specialType:[{property:"lowerPrice",label:"最低价格(元)",page:[],title:'查询"面议", 请输入 0'}],selectOptions:[{property:"shipShippingTypeName",label:"运输方式",dispage:[],type:"ship_shipping_type",options:[]},{property:"shipPayWayName",label:"付款方式",dispage:[],type:"ship_pay_way",options:[]},{property:"orderPayWayName",label:"付款方式",dispage:[],type:"ship_pay_way",options:[]},{property:"shipDeliveryMethodName",lable:"交接方式",type:"ship_delivery_method",options:[]},{property:"shipStatusName",lable:"运单状态",type:"ship_status",options:[]},{property:"shipBusinessTypeName",label:"业务类型",type:"ship_business_type",options:[]},{property:"sexFlag",label:"性别",type:"",options:[{dictName:"女",id:1},{dictName:"男",id:0}]},{property:"sendStatus",label:"发送状态",type:"",options:[{dictName:"开",id:1},{dictName:"关",id:0}]},{property:"licenseTypeName",label:"驾驶证类型",type:"driving_type",options:[]},{property:"truckSourceName",label:"车辆来源",type:"truck_source",options:[]},{property:"truckTypeName",label:"车型",type:"truck_type",options:[]},{property:"orerStatusName",label:"订单类型",type:"order_status",options:[]},{property:"shipReceiptRequireName",label:"回单要求",type:"ship_receipt_require",options:[]},{property:"signTypeName",label:"签收类型",type:"sign_type",options:[]},{property:"abnormalStatusName",label:"异常状态",type:"abnormal_status",options:[]},{property:"abnormalTypeName",label:"异常类型",type:"abnormal_type",options:[]},{property:"apportionType",label:"分摊方式",type:"apportion_type",options:[]},{property:"signStatus",label:"签收状态",type:"sign_status",options:[]},{property:"shipPayWay",label:"付款方式",type:"ship_pay_way",options:[]},{property:"shipDeliveryMethod",label:"交接方式",type:"ship_delivery_method",options:[]},{property:"totalStatusCn",label:"核销状态",type:"count_status",options:[],filter:[""]},{property:"nowPayStateCn",label:"核销状态",type:"count_status",options:[],filter:[""]},{property:"arrivepayStateCn",label:"核销状态",type:"count_status",options:[],filter:[""]},{property:"receiptpayStateCn",label:"核销状态",type:"count_status",options:[],filter:[""]},{property:"monthpayStateCn",label:"核销状态",type:"count_status",options:[],filter:[""]},{property:"changeStateCn",label:"核销状态",type:"count_status",options:[],filter:[""]},{property:"statusName",label:"核销状态",type:"count_status",options:[],filter:[""]},{property:"statusValue",label:"核销状态",type:"count_status",options:[],filter:[""]},{property:"incomePayTypeValue",label:"费用类型",type:"",options:[{dictName:"异动增款",id:"异动增款"},{dictName:"异动减款",id:"异动减款"}]},{property:"applyStatus",label:"审核状态",type:"",options:[{dictName:"审核中",id:0},{dictName:"审核通过",id:1},{dictName:"审核不通过",id:2}]},{property:"rangeStatus",label:"状态",type:"",options:[{dictName:"禁用",id:0},{dictName:"启用",id:1}]},{property:"pickupStatusName",label:"提货状态",type:"pickup_status",options:[],filter:["235"]},{property:"payMethodName",label:"付款方式",type:"ship_pay_way",options:[],filter:[]},{property:"batchTypeName",label:"批次状态",type:"short_batch_type",dispage:["/operation/order/arteryDepart/sender","/operation/order/track/artery","/operation/order/track/deliver","/operation/order/deliverManage"],options:[],filter:["46"]},{property:"bathStatusName",label:"批次状态",dispage:["/operation/order/arteryDelivery/sender"],type:"short_batch_type",options:[],filter:["46","47"]},{property:"batchTypeName",label:"批次状态",type:"main_batch_type",dispage:["/operation/order/shortDepart/deliver","/operation/order/track/deliver","/operation/order/track/deliver","/operation/order/deliverManage"],options:[],filter:["51"]},{property:"bathStatusName",label:"批次状态",dispage:["/operation/order/shortDepart/arrival"],type:"main_batch_type",options:[],filter:["51"]},{property:"batchTypeName",label:"批次状态",dispage:["/operation/order/shortDepart/deliver","/operation/order/arteryDepart/sender","/operation/order/track/artery"],type:"delivery_batch_type",options:[],filter:["56"]},{property:"unloadSignName",label:"卸货状态",type:"unload_type",options:[],filter:["405"]},{property:"signStatusName",label:"签收状态",type:"sign_status",options:[]},{property:"signCertificateName",label:"凭证状态",type:"sign_certificate",options:[],filter:["230"]},{property:"signCocumentTypeName",label:"签收证件",type:"sign_cocument_type",options:[]},{property:"backStatusName",label:"回单状态",type:"back_status",options:[]},{property:"recStatusName",label:"回收状态",type:"rec_status",options:[]},{property:"sendStatusName",label:"寄出状态",type:"send_status",options:[]},{property:"acceptStatusName",label:"接收状态",type:"accept_status",options:[]},{property:"giveoutStatusName",label:"发放状态",type:"giveout_status",options:[]},{property:"fundsGoodsStatusName",label:"货款状态",type:"funds_goods_status",options:[]},{property:"fundsRecStatusName",label:"回收状态",type:"funds_rec_status",options:[],filter:["253"]},{property:"fundsRemittanceStatusName",label:"汇款状态",type:"funds_remittance_status",options:[],filter:["256"]},{property:"fundsAccountStatusName",label:"到账状态",type:"funds_account_status",options:[],filter:["259"]},{property:"fundsGiveoutStatusName",label:"发放状态",type:"funds_giveout_status",options:[],filter:["262"]},{property:"paymentName",label:"中转付款方式",type:"payment_type",options:[]},{property:"status",label:"控货状态",onlypage:"/operation/service/controlgoods/allGoods",type:"",options:[{dictName:"未放货",id:1},{dictName:"已放货",id:2},{dictName:"未控货",id:"0"}]},{property:"dataSrcZh",label:"来源",type:"",options:[{dictName:"核销产生",id:"核销产生"},{dictName:"手工录入",id:"手工录入"}]},{property:"paymentsTypeZh",label:"方向",type:"",options:[{dictName:"收入",id:"收入"},{dictName:"支出",id:"支出"}]},{property:"verifyStatusZh",label:"审核状态",type:"",options:[{dictName:"未审核",id:"未审核"},{dictName:"已审核",id:"已审核"}]},{property:"checkStatusZh",label:"对账状态",type:"",options:[{dictName:"未对账",id:"未对账"},{dictName:"已对账",id:"已对账"}]}],unSearchList:[{property:"id",label:"序号"},{property:"number",label:"序号"},{property:"grossProfit",label:"毛利"},{property:"status",label:"控货状态",dispage:["/operation/service/controlgoods/noGoods","/operation/service/controlgoods/haveGoods"]}]}},computed:{specialTypeTitle:function(){var e="",t=this.scope.column.property.toLowerCase(),i=this.specialType.filter(function(e){return e.property.toLowerCase()===t});return i&&i.length&&(e=i[0].title),e},unSearch:function(){var t=this,i=this.scope.column.property.toLowerCase(),r=0,a=!1;return!this.unSearchList.filter(function(e){return e.property.toLowerCase()===i&&(a=!0,e.dispage&&e.dispage.length&&(r=e.dispage.filter(function(e){return e===t.$route.fullPath}).length)),e.dispage?!!(a&&0<r)||void 0:a}).length},isTime:function(){var e=/(time)/,t=this.scope.column.property.toLowerCase();if(e.test(t)&&"timeliness"!==t)return e.test(t);return!!["validityDate","validityStartdate","truckRegisterDate","truckScrapDate"].filter(function(e){return e.toLowerCase()===t}).length},isSelect:function(){var o=this,e=this.selectOptions.filter(function(e){var t,i=!1,r=!1,a=0;if(e.property===o.scope.column.property&&(i=!0,e.dispage&&e.dispage.length&&(a=e.dispage.filter(function(e){return e===o.$route.fullPath}).length),r=e.onlypage&&e.onlypage===o.$route.fullPath),t=!(0<a),e.onlypage){if(i&&t&&r)return!0}else if(i&&t)return!0});return e.length&&(this.curSelect=a()({},e[0])),e.length}},methods:{filterfn:function(t){if(this.curSelect.filter){var i=0;return this.curSelect.filter.forEach(function(e){t.id.toString()===e&&(i+=1)}),0===i}return""!==t.id},changeEnter:function(e,t,i){this.changeKey(e,t,i.target.value)},changeKey:function(t,e,i,r){var a=this;this.$nextTick(function(){var e=a.query;e.searchVo||a.$set(e,"searchVo",{}),a.isChange=!0,a.isTime&&(i=Object(o.parseTime)(i,"{y}-{m}-{d}")),e.searchVo[t.property]=i,e.currentPage=1,console.log("changeKey components::",e,t),a.$emit("change",e)})}}}},ijWn:function(e,t,i){"use strict";var r=i("bPPU"),a=i("j///"),o=i("VU/8")(r.a,a.a,null,null,null);t.a=o.exports},"j///":function(e,t,i){"use strict";var r={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-dialog",{staticClass:"tms_dialog tms_dialog_import",attrs:{title:t.titlePop,visible:t.isShow,"close-on-click-modal":!1,"before-close":t.closeMe,width:"500px"},on:{"update:visible":function(e){t.isShow=e}}},[t.isInitDialog?i("el-row",[i("el-col",{attrs:{span:12}},[i("el-upload",{attrs:{"show-file-list":!1,"on-change":t.handleChange,action:"","http-request":t.uploadHandleFile}},[i("div",{staticClass:"bigIconBtn_primary",on:{click:function(e){t.doAction("import")}}},[i("i",{staticClass:"icon-export-btn"}),t._v(" "),i("br"),t._v(" "),i("span",[t._v("上传文件")])])])],1),t._v(" "),i("el-col",{attrs:{span:12}},[i("div",{staticClass:"bigIconBtn_success",on:{click:function(e){t.doAction("download")}}},[i("i",{staticClass:"icon-import-btn"}),t._v(" "),i("br"),t._v(" "),i("span",[t._v("下载标准模板")])])]),t._v(" "),i("el-col",{attrs:{span:22,offset:2}},[t.isSubjectInfo?i("ul",{staticClass:"importTips",attrs:{type:"1"}},[i("li",[t._v("1、导入前，需要先下载标准版，按照标准模板后再上传。")]),t._v(" "),i("li",[t._v("2、每次最多能导入1000条，超过1000条，只导入前1000条。")])]):i("ul",{staticClass:"importTips",attrs:{type:"1"}},[i("li",[t._v("1、导入前，需要先下载标准版，按照标准模板后再上传。")]),t._v(" "),i("li",[t._v("2、发货人，手机号码必须填写，且不能与已有客户重复。")]),t._v(" "),i("li",[t._v("3、导入所属网点默认为本网点。")]),t._v(" "),i("li",[t._v("4、每次最多能导入1000条，超过1000条，只导入前1000条。")])])])],1):i("div",{staticClass:"import_result"},[t.isProgress?i("el-progress",{attrs:{"text-inside":!0,"stroke-width":15,percentage:t.percentage,status:t.uploadStatus&&40<t.percentages?"success":"exception"}}):i("p",[t._v(t._s(t.resMessage.resultInfo))]),t._v(" "),i("el-table",{key:t.tableKey,ref:"multipleTable",class:11<(t.resMessage.failInfoList&&t.resMessage.failInfoList.length)?"failinScroll":"",staticStyle:{width:"100%","margin-top":"10px"},attrs:{data:t.resMessage.failInfoList,stripe:"",border:"","tooltip-effect":"dark","default-sort":{prop:"id",order:"ascending"}}},[i("el-table-column",{attrs:{sortable:"",type:"index",width:"60",label:"序号"}}),t._v(" "),i("el-table-column",{attrs:{prop:"failExcelNum",width:"130",label:"失败行"}}),t._v(" "),i("el-table-column",{attrs:{prop:"failInfo",label:"失败字段"}})],1)],1)],1)},staticRenderFns:[]};t.a=r},sMyT:function(e,t){},sdyU:function(e,t,i){"use strict";var r={render:function(){var i=this,e=i.$createElement,r=i._self._c||e;return r("div",{staticClass:"table-header-wrapper"},[r("p",{staticClass:"table-header-label",attrs:{title:i.scope.column.label}},[i._v(i._s(i.scope.column.label))]),i._v(" "),i.isTime&&i.unSearch?r("el-date-picker",{attrs:{type:"date",placeholder:"选择日期时间",size:i.btnsize},on:{change:function(e){return i.changeKey(i.scope.column,i.scope.$index,e)}},nativeOn:{click:function(e){e.stopPropagation(),e.preventDefault()},keyup:function(e){return"button"in e||!i._k(e.keyCode,"enter",13,e.key,"Enter")?(t=e,i.changeEnter(i.scope.column,i.scope.$index,t)):null;var t}},model:{value:i.queryString,callback:function(e){i.queryString="string"==typeof e?e.trim():e},expression:"queryString"}}):i.isSelect&&i.curSelect.type?r("SelectType",{attrs:{placeholder:"请选择",size:i.btnsize,type:i.curSelect.type,clearable:"",filterfn:i.filterfn},on:{changeItem:function(e,t){return i.changeKey(i.scope.column,i.scope.$index,t.dictName||"")}},nativeOn:{click:function(e){e.stopPropagation(),e.preventDefault()},keyup:function(e){return"button"in e||!i._k(e.keyCode,"enter",13,e.key,"Enter")?(t=e,i.changeEnter(i.scope.column,i.scope.$index,t)):null;var t}},model:{value:i.queryString,callback:function(e){i.queryString=e},expression:"queryString"}}):i.isSelect&&!i.curSelect.type&&i.unSearch?r("el-select",{attrs:{placeholder:"请选择",clearable:"",size:i.btnsize,type:i.curSelect.type},on:{change:function(e){return i.changeKey(i.scope.column,i.scope.$index,e)}},nativeOn:{click:function(e){e.stopPropagation(),e.preventDefault()},keyup:function(e){return"button"in e||!i._k(e.keyCode,"enter",13,e.key,"Enter")?(t=e,i.changeEnter(i.scope.column,i.scope.$index,t)):null;var t}},model:{value:i.queryString,callback:function(e){i.queryString=e},expression:"queryString"}},i._l(i.curSelect.options,function(e,t){return r("el-option",{key:t,attrs:{label:e.dictName,value:e.id}})})):i.unSearch?r("el-tooltip",{attrs:{content:i.specialTypeTitle,disabled:!i.specialTypeTitle,placement:"top",effect:"light"}},[r("el-input",{staticClass:"table-header-input",attrs:{size:i.btnsize,placeholder:"搜索关键字",maxlength:50,clearable:""},on:{change:function(e){return i.changeKey(i.scope.column,i.scope.$index,e)}},nativeOn:{click:function(e){e.stopPropagation(),e.preventDefault()},keyup:function(e){return"button"in e||!i._k(e.keyCode,"enter",13,e.key,"Enter")?(t=e,i.changeEnter(i.scope.column,i.scope.$index,t)):null;var t}},model:{value:i.queryString,callback:function(e){i.queryString="string"==typeof e?e.trim():e},expression:"queryString"}})],1):i._e()],1)},staticRenderFns:[]};t.a=r},vmn5:function(e,t,i){"use strict";var r=i("i2Q8"),a=i("sdyU");var o=function(e){i("55Wa")},s=i("VU/8")(r.a,a.a,o,null,null);t.a=s.exports}});