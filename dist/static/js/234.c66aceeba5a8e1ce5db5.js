webpackJsonp([234,375],{"6izB":function(e,t,a){"use strict";var i={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-form",{staticClass:"staff_searchinfo clearfix",attrs:{inline:!0,size:t.btnsize,"label-position":"right","label-width":"70px",rules:t.rules,model:t.searchForm}},[a("div",{staticClass:"staff_searchinfo--input"},[a("el-form-item",{attrs:{label:"凭证时间"}},[a("div",{staticClass:"block"},[a("el-date-picker",{attrs:{type:"daterange","unlink-panels":"",align:"right","picker-options":t.pickerOptions2,"start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:t.searchCreatTime,callback:function(e){t.searchCreatTime=e},expression:"searchCreatTime"}})],1)]),t._v(" "),a("el-form-item",{attrs:{label:"核销网点"}},[a("SelectTree",{attrs:{orgid:t.otherinfo.orgid,clearible:""},model:{value:t.searchForm.orgId,callback:function(e){t.$set(t.searchForm,"orgId",e)},expression:"searchForm.orgId"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"审核状态"}},[a("el-select",{attrs:{clearable:""},model:{value:t.searchForm.verifyStatus,callback:function(e){t.$set(t.searchForm,"verifyStatus",e)},expression:"searchForm.verifyStatus"}},[a("el-option",{attrs:{label:"未审核",value:0}}),t._v(" "),a("el-option",{attrs:{label:"已审核",value:1}}),t._v(" "),a("el-option",{attrs:{label:"全部",value:""}})],1)],1),t._v(" "),a("el-form-item",{attrs:{label:"方向"}},[a("el-select",{attrs:{clearable:""},model:{value:t.searchForm.paymentsType,callback:function(e){t.$set(t.searchForm,"paymentsType",e)},expression:"searchForm.paymentsType"}},[a("el-option",{attrs:{label:"收入",value:0}}),t._v(" "),a("el-option",{attrs:{label:"支出",value:1}}),t._v(" "),a("el-option",{attrs:{label:"全部",value:""}})],1)],1),t._v(" "),a("el-form-item",{attrs:{label:"来源"}},[a("el-select",{attrs:{clearable:""},model:{value:t.searchForm.dataSrc,callback:function(e){t.$set(t.searchForm,"dataSrc",e)},expression:"searchForm.dataSrc"}},[a("el-option",{attrs:{label:"核销产生",value:0}}),t._v(" "),a("el-option",{attrs:{label:"手工录入",value:1}}),t._v(" "),a("el-option",{attrs:{label:"全部",value:""}})],1)],1)],1),t._v(" "),a("el-form-item",{staticClass:"staff_searchinfo--btn"},[a("el-button",{attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v("查询")]),t._v(" "),a("el-button",{attrs:{type:"info",plain:""},on:{click:t.clearForm}},[t._v("清空")])],1)],1)},staticRenderFns:[]};t.a=i},HOwW:function(e,t,a){"use strict";a("E4LH");var i=a("9UCZ"),r=a("o9X6"),s=a("0xDb");t.a={components:{SelectType:i.a,SelectTree:r.a},props:{btnsize:{type:[String,Object],default:"mini"},orgid:{type:Number},issender:{type:Boolean,dafault:!1}},computed:{title:function(){}},data:function(){return{searchCreatTime:[Object(s.parseTime)(+new Date-5184e6,"{y}-{m}-{d}"),Object(s.parseTime)(new Date,"{y}-{m}-{d}")],searchForm:{orgId:"",verifyStatus:0,paymentsType:"",dataSrc:"",startTime:"",endTime:""},rules:{mobile:[{}]},pickerOptions2:{shortcuts:s.pickerOptions2}}},watch:{orgid:function(e){this.searchForm.orgId=e}},mounted:function(){this.loading=!0,this.searchForm.orgId=this.orgid,this.onSubmit()},methods:{getOrgid:function(e){},onSubmit:function(){this.searchForm.startTime=this.searchCreatTime[0]?Object(s.parseTime)(this.searchCreatTime[0],"{y}-{m}-{d} ")+"00:00:00":"",this.searchForm.endTime=this.searchCreatTime[1]?Object(s.parseTime)(this.searchCreatTime[1],"{y}-{m}-{d} ")+"23:59:59":"",this.$emit("change",this.searchForm)},clearForm:function(){this.searchForm.startTime="",this.searchForm.endTime="",this.searchCreatTime=[+new Date-5184e6,+new Date],this.searchForm.orgId=this.orgid,this.searchForm.verifyStatus="",this.searchForm.paymentsType="",this.searchForm.dataSrc="",this.searchForm.dataSrc=""}}}},ihBp:function(e,t,a){"use strict";var i=a("mvHQ"),r=a.n(i),s=a("Dd8w"),n=a.n(s),l=(a("Vi15"),a("onZQ")),o=a("ycAe"),c=a("NYxO"),u=a("1onU"),h=a("0xDb"),d=a("UQm2");t.a={components:{SearchForm:o.default,Pager:u.a},computed:n()({},Object(c.mapGetters)(["otherinfo"]),{orgid:function(){}}),mounted:function(){this.searchQuery.vo.orgId=this.otherinfo.orgid},data:function(){var t=this;return{mykey:"",btnsize:"mini",usersArr:[],total:0,tablekey:0,loading:!0,setupTableVisible:!1,selectInfo:{},selected:[],searchQuery:{currentPage:1,pageSize:100,vo:{orgId:1,verifyStatus:"",paymentsType:"",dataSrc:"",startTime:"",endTime:""}},tableColumn:[{label:"序号",prop:"number",width:"70",fixed:!0,slot:function(e){return(t.searchQuery.currentPage-1)*t.searchQuery.pageSize+e.$index+1}},{label:"审核状态",prop:"verifyStatusZh",width:"110",fixed:!0},{label:"来源",prop:"dataSrcZh",width:"110",fixed:!0},{label:"核销项目",prop:"subjectName",width:"120",fixed:!1},{label:"类别",prop:"verificationWay",width:"130",fixed:!1},{label:"方向",prop:"paymentsTypeZh",width:"170",fixed:!1},{label:"金额",prop:"amount",width:"120",fixed:!1},{label:"凭证号",prop:"certNo",width:"150",fixed:!1},{label:"凭证日期",prop:"certTime",width:"160",fixed:!1},{label:"系统操作日期",prop:"createTime",width:"160",fixed:!1},{label:"一级科目",prop:"subjectOne",width:"120",fixed:!1},{label:"二级科目",prop:"subjectTwo",width:"120",fixed:!1},{label:"三级科目",prop:"subjectThree",width:"120",fixed:!1},{label:"四级科目",prop:"subjectFour",width:"120",fixed:!1},{label:"摘要",prop:"remark",width:"180",fixed:!1},{label:"核销网点",prop:"orgName",width:"120",fixed:!1},{label:"笔数",prop:"verifyCount",width:"120",fixed:!1},{label:"发票号码",prop:"invoiceNo",width:"150",fixed:!1},{label:"收据号码",prop:"receiptNo",width:"150",fixed:!1},{label:"支票号码",prop:"checkNo",width:"150",fixed:!1},{label:"手工凭证号",prop:"manualCert",width:"150",fixed:!1}]}},methods:{changeKey:function(e){this.total=0,this.searchQuery=e,this.loading||this.fetchAllCustomer()},fetchAllCustomer:function(){var t=this;return this.loading=!0,Object(l.b)(this.searchQuery).then(function(e){t.usersArr=e.list,t.total=e.total,t.loading=!1}).catch(function(e){t.loading=!1,t._handlerCatchMsg(e)})},fetchData:function(){this.fetchAllCustomer()},handlePageChange:function(e){this.searchQuery.currentPage=e.pageNum,this.searchQuery.pageSize=e.pageSize},getSearchParam:function(e){this.searchQuery.vo=Object(h.objectMerge2)(this.searchQuery.vo,e),this.fetchAllCustomer()},doAction:function(e){var t=this;if(!this.selected.length&&"export"!==e&&"print"!==e)return this.$message({message:"请选择要操作的项~",type:"warning"}),!1;switch(e){case"theAudit":var a=this.selected.filter(function(e){return 1===e.verifyStatus}).map(function(e){return e.id});if(!a.length)return this.$message.info("凭证还未审核，不可以反审核~"),!1;this.$confirm("你已选择"+a.length+"条凭证？","提示",{confirmButtonText:"反审核",cancelButtonText:"取消",type:"warning"}).then(function(){var e={};e.idList=a,e.verifyStatus=0,Object(l.a)(e).then(function(e){t.$message({type:"success",message:"反核销成功!"}),t.fetchData()}).catch(function(e){t._handlerCatchMsg(e)})});break;case"audit":var i=this.selected.filter(function(e){return 0===e.verifyStatus}).map(function(e){return e.id});if(!i.length)return this.$message.info("凭证已经审核，不能重复审核~"),!1;this.$confirm("你已选择"+i.length+"条凭证？","提示",{confirmButtonText:"审核",cancelButtonText:"取消",type:"warning"}).then(function(){var e={};e.idList=i,e.verifyStatus=1,Object(l.a)(e).then(function(e){t.$message({type:"success",message:"审核成功!"}),t.fetchData()}).catch(function(e){t._handlerCatchMsg(e)})});break;case"export":Object(d.g)({data:this.selected.length?this.selected:this.usersArr,columns:this.tableColumn,name:"凭证审核"}),this.$refs.multipleTable.clearSelection();break;case"print":Object(d.d)({data:this.selected.length?this.selected:this.usersArr,columns:this.tableColumn})}this.$refs.multipleTable.clearSelection()},setTable:function(){this.setupTableVisible=!0},closeSetupTable:function(){this.setupTableVisible=!1},clickDetails:function(e,t,a){this.$refs.multipleTable.toggleRowSelection(e)},getSelection:function(e){this.selected=e},getDbClick:function(e,t){var a=r()(this.searchQuery);this.$router.push({path:"/finance/cashDetail",query:{recordId:e.billRecordId,searchQuery:a}}),this.$refs.multipleTable.clearSelection()},setColumn:function(e){this.tableColumn=e,this.tablekey=Math.random()}}}},jllS:function(e,t,a){"use strict";var i={render:function(){var i=this,e=i.$createElement,r=i._self._c||e;return r("div",{directives:[{name:"loading",rawName:"v-loading",value:i.loading,expression:"loading"}],staticClass:"tab-content miniHeaderSearch"},[r("SearchForm",{attrs:{orgid:i.otherinfo.orgid,issender:!0,btnsize:i.btnsize},on:{change:i.getSearchParam}}),i._v(" "),r("div",{staticClass:"tab_info"},[r("div",{staticClass:"btns_box"},[r("el-button",{directives:[{name:"has",rawName:"v-has:CERTVERFICATION_CONTRARY_VERIFY",arg:"CERTVERFICATION_CONTRARY_VERIFY"}],attrs:{type:"success",size:i.btnsize,icon:"el-icon-document",plain:""},on:{click:function(e){i.doAction("theAudit")}}},[i._v("反审核\n      ")]),i._v(" "),r("el-button",{directives:[{name:"has",rawName:"v-has:CERTVERFICATION_VERIFY",arg:"CERTVERFICATION_VERIFY"}],attrs:{type:"info",size:i.btnsize,icon:"el-icon-tickets",plain:""},on:{click:function(e){i.doAction("audit")}}},[i._v("审核\n      ")]),i._v(" "),r("el-button",{directives:[{name:"has",rawName:"v-has:CERTVERFICATION_EXPORT",arg:"CERTVERFICATION_EXPORT"}],attrs:{type:"primary",size:i.btnsize,icon:"el-icon-download",plain:""},on:{click:function(e){i.doAction("export")}}},[i._v("导出\n      ")]),i._v(" "),r("span",{staticStyle:{"font-size":"14px","line-height":"28px","padding-left":"10px",color:"#ccc"}},[i._v("双击查看明细")]),i._v(" "),r("el-button",{staticClass:"table_setup",attrs:{type:"primary",size:i.btnsize,icon:"el-icon-setting",plain:""},on:{click:i.setTable}},[i._v("\n        表格设置\n      ")])],1),i._v(" "),r("div",{staticClass:"info_tab"},[r("el-table",{key:i.tablekey,ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:i.usersArr,border:"",height:"100%","tooltip-effect":"dark","default-sort":{prop:"id",order:"ascending"},stripe:""},on:{"row-dblclick":i.getDbClick,"row-click":i.clickDetails,"selection-change":i.getSelection}},[r("el-table-column",{attrs:{fixed:"",sortable:"",type:"selection",width:"50"}}),i._v(" "),i._l(i.tableColumn,function(a){return[a.slot?r("el-table-column",{key:a.id,attrs:{fixed:a.fixed,sortable:"",label:a.label,prop:a.prop,width:a.width},scopedSlots:i._u([{key:"header",fn:function(e){return[r("tableHeaderSearch",{attrs:{scope:e,query:i.searchQuery},on:{change:i.changeKey}})]}},{key:"default",fn:function(t){return[a.click?r("span",{staticClass:"clickitem",domProps:{innerHTML:i._s(a.slot(t))},on:{click:function(e){e.stopPropagation(),a.click(t)}}}):r("span",{domProps:{innerHTML:i._s(a.slot(t))}})]}}])}):r("el-table-column",{key:a.id,attrs:{fixed:a.fixed,sortable:"",label:a.label,prop:a.prop,width:a.width},scopedSlots:i._u([{key:"header",fn:function(e){return[r("tableHeaderSearch",{attrs:{scope:e,query:i.searchQuery},on:{change:i.changeKey}})]}},{key:"default",fn:function(e){return[i._v(i._s(e.row[a.prop]))]}}])})]})],2)],1),i._v(" "),r("div",{staticClass:"info_tab_footer"},[i._v("共计:"+i._s(i.total)+"\n      "),r("div",{staticClass:"show_pager"},[r("Pager",{attrs:{total:i.total},on:{change:i.handlePageChange}})],1)])]),i._v(" "),r("TableSetup",{attrs:{popVisible:i.setupTableVisible,columns:i.tableColumn},on:{close:i.closeSetupTable,success:i.setColumn}})],1)},staticRenderFns:[]};t.a=i},onZQ:function(e,t,a){"use strict";t.b=function(e){return i.b.post("/api-finance/finance/tmsfinanceverificationcert/v1.3/getVerificationCertList",e).then(function(e){return e.data||{list:[],totalCount:0}})},t.a=function(e){return i.b.post("/api-finance/finance/tmsfinanceverificationcert/v1.3/updateVerificationCertStatus",e)};var i=a("Vo7i")},qYnG:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a("ihBp"),r=a("jllS"),s=a("VU/8")(i.a,r.a,null,null,null);t.default=s.exports},ycAe:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a("HOwW"),r=a("6izB"),s=a("VU/8")(i.a,r.a,null,null,null);t.default=s.exports}});