webpackJsonp([111,170],{"1E+B":function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=i("ejm9"),r=i("sc8G"),n=i("VU/8")(a.a,r.a,null,null,null);t.default=n.exports},"3yB5":function(e,t,i){"use strict";var a={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-form",{ref:"searchForm",staticClass:"staff_searchinfo clearfix",attrs:{inline:!0,size:t.btnsize,"label-position":"right",rules:t.rules,model:t.searchForm,"label-width":"70px"}},[i("div",{staticClass:"staff_searchinfo--input"},[i("el-form-item",{attrs:{label:"发车时间"}},[i("el-date-picker",{attrs:{type:"daterange","unlink-panels":"",align:"right","value-format":"yyyy-MM-dd HH:mm:ss","start-placeholder":"开始日期","picker-options":t.pickerOptions,"end-placeholder":"结束日期"},model:{value:t.searchTime,callback:function(e){t.searchTime=e},expression:"searchTime"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"短驳网点",prop:"orgid"}},[i("SelectTree",{attrs:{orgid:t.otherinfo.orgid},model:{value:t.searchForm.orgid,callback:function(e){t.$set(t.searchForm,"orgid",e)},expression:"searchForm.orgid"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"短驳批次",prop:"batchNo"}},[i("el-input",{attrs:{placeholder:"请输入短驳批次"},model:{value:t.searchForm.batchNo,callback:function(e){t.$set(t.searchForm,"batchNo",e)},expression:"searchForm.batchNo"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"车牌号",prop:"truckIdNumber"}},[i("el-input",{attrs:{placeholder:"请输入车牌号"},model:{value:t.searchForm.truckIdNumber,callback:function(e){t.$set(t.searchForm,"truckIdNumber",e)},expression:"searchForm.truckIdNumber"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"司机"}},[i("el-input",{attrs:{clearable:"",maxlength:10,placeholder:"司机名称"},model:{value:t.searchForm.dirverName,callback:function(e){t.$set(t.searchForm,"dirverName",e)},expression:"searchForm.dirverName"}})],1),t._v(" "),i("searchAll",{attrs:{searchObj:t.searchObjs},on:{dataObj:t.getDataObj},model:{value:t.searchAll,callback:function(e){t.searchAll=e},expression:"searchAll"}})],1),t._v(" "),i("el-form-item",{staticClass:"staff_searchinfo--btn"},[i("el-button",{attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v("查询")]),t._v(" "),i("el-button",{attrs:{type:"info",plain:""},on:{click:function(e){t.clearForm("searchForm")}}},[t._v("清空")])],1)],1)},staticRenderFns:[]};t.a=a},"8UOW":function(e,t,i){"use strict";var a=i("us2a"),r=i("fyBF");var n=function(e){i("Qhr/")},s=i("VU/8")(a.a,r.a,n,null,null);t.a=s.exports},"IOW+":function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=i("x7Sc"),r=i("3yB5"),n=i("VU/8")(a.a,r.a,null,null,null);t.default=n.exports},JW1v:function(e,t,i){"use strict";t.g=function(e){return a.b.post("/api-finance/finance/tmsfinancefeepayable/v1/findListByFeeType/",e).then(function(e){return console.log("postFindListByFeeType22222222222222"),e.data||{list:[],totalCount:0}})},t.h=function(e){return a.b.post("/api-finance/finance/tmsfinancefeepayable/v1/findTransferList/",e).then(function(e){return e.data||{list:[],totalCount:0}})},t.e=function(e){return a.b.post("/api-finance/finance/tmsfinancefeepayable/v1/findAbnormalList/",e).then(function(e){return e.data||{list:[],totalCount:0}})},t.f=function(e){return a.b.post("/api-finance/finance/tmsfinancefeepayable/v1/findChangeList/",e).then(function(e){return e.data||{list:[],totalCount:0}})},t.d=function(e,t){return a.b.post("/api-finance/finance/tmsfinancefeepayable/v1/create/"+e,t).then(function(e){return e.data})},t.k=function(e){return a.b.post("/api-finance/finance/tmsfinancefeepayable/v1/payListBySummary/",e).then(function(e){return e.data||{list:[],totalCount:0}})},t.j=function(e){return a.b.post("/api-finance/finance/tmsfinancefeepayable/v1/payListByOne/",e).then(function(e){return e.data||{list:[],totalCount:0}})},t.a=function(e,t){return a.b.get("/api-finance/finance/tmsfinancecapitalflow/v1/getFeeInfo/?orgId="+e+"&paymentsType="+t)},t.i=function(e){return a.b.post("/api-finance/finance/tmsfinancefeepayable/v1/loadSettlement/",e).then(function(e){return e.data})},t.b=function(e){return a.b.post("/api-finance/finance/tmsfinancefeepayable/v1/loadVerification",e).then(function(e){return e.data})},t.c=function(e){return a.b.post("/api-finance/finance/tmsfinancefeepayable/v1/payListByHandlingFee",e).then(function(e){return e.data})};var a=i("Vo7i");i("0xDb")},"Qhr/":function(e,t){},SjYS:function(e,t,i){"use strict";var a=i("seR9"),r=i("msh6");var n=function(e){i("nl9Y")},s=i("VU/8")(a.a,r.a,n,null,null);t.a=s.exports},ejm9:function(e,t,i){"use strict";var a,r=i("bOdI"),n=i.n(r),s=i("mvHQ"),o=i.n(s),c=i("woOf"),l=i.n(c),u=i("Dd8w"),h=i.n(u),d=i("0xDb"),f=i("IOW+"),p=i("1onU"),m=i("JW1v"),b=i("NYxO"),y=i("UQm2");t.a={components:{SearchForm:f.default,Pager:p.a},computed:h()({},Object(b.mapGetters)(["otherinfo"])),data:function(){var i=this;return{btnsize:"mini",feeTypeId:17,searchQuery:{currentPage:1,pageSize:100,vo:{status:"NOSETTLEMENT,PARTSETTLEMENT,ALLSETTLEMENT"}},tablekey:0,total:0,dataList:[],selectedList:[],selectListBatchNos:[],loading:!0,setupTableVisible:!1,tableColumn:[{label:"序号",prop:"number",width:"70",fixed:!0,slot:function(e){return(i.searchQuery.currentPage-1)*i.searchQuery.pageSize+e.$index+1}},{label:"短驳批次",prop:"batchNo",width:"130",fixed:!0},{label:"核销状态",prop:"statusName",width:"90",fixed:!1},{label:"发车网点",prop:"orgName",width:"120",fixed:!1},{label:"到达网点",prop:"arriveOrgName",width:"120",fixed:!1},{label:"短驳时间",prop:"actualSendtime",width:"160",fixed:!1,slot:function(e){return""+Object(d.parseTime)(e.row.actualSendtime,"{y}-{m}-{d} {h}:{i}:{s}")}},{label:"接收时间",prop:"receivingTime",width:"160",fixed:!1,slot:function(e){return""+Object(d.parseTime)(e.row.receivingTime,"{y}-{m}-{d} {h}:{i}:{s}")}},{label:"短驳费",prop:"fee",width:"90",fixed:!1},{label:"已核销短驳费",prop:"paidFee",width:"100",fixed:!1,slot:function(e){var t=e.row;return i._setTextColor(t.fee,t.paidFee,t.unpaidFee,t.paidFee)}},{label:"未核销短驳费",prop:"unpaidFee",width:"100",fixed:!1,slot:function(e){var t=e.row;return i._setTextColor(t.fee,t.paidFee,t.unpaidFee,t.unpaidFee)}},{label:"车牌号",prop:"truckIdNumber",width:"100",fixed:!1},{label:"司机名称",prop:"dirverName",width:"100",fixed:!1},{label:"司机电话",prop:"dirverMobile",width:"110",fixed:!1},{label:"短驳件数",prop:"loadAmountall",width:"90",fixed:!1},{label:"短驳重量",prop:"loadWeightall",width:"90",fixed:!1},{label:"短驳体积",prop:"loadVolumeall",width:"90",fixed:!1},{label:"备注",prop:"remark",width:"150",fixed:!1}],selectedDataList:[]}},methods:(a={changeKey:function(e){this.total=0,this.searchQuery=e,this.loading||this.fetchList()},getSearchParam:function(e){this.searchQuery.currentPage=this.$options.data().searchQuery.currentPage,this.searchQuery.pageSize=this.$options.data().searchQuery.pageSize,this.$set(this.searchQuery.vo,"feeTypeId",this.feeTypeId),this.searchQuery.vo=l()({},e),this.fetchList()},handlePageChange:function(e){this.searchQuery.currentPage=e.pageNum,this.searchQuery.pageSize=e.pageSize,this.fetchList()},fetchList:function(){var t=this;return this.$set(this.searchQuery.vo,"feeTypeId",this.feeTypeId),this.loading=!0,Object(m.j)(this.searchQuery).then(function(e){t.dataList=e.list,t.total=e.total,t.loading=!1}).catch(function(e){t.loading=!1,t._handlerCatchMsg(e)})},setTable:function(){},doAction:function(e){switch(e){case"count":this.count();break;case"export":Object(y.g)({data:0<this.selectedDataList.length?this.selectedDataList:this.dataList,columns:this.tableColumn,name:"车费核销-短驳费-"+Object(d.parseTime)(new Date,"{y}{m}{d}{h}{i}{s}")});break;case"print":Object(y.d)({data:0<this.selectedDataList.length?this.selectedDataList:this.dataList,columns:this.tableColumn,name:"车费核销-短驳费"})}},count:function(){var e=this,i=0;if(0!==this.selectedList.length&&Object(d.objectMerge2)([],this.selectedList).forEach(function(t){Object(d.objectMerge2)([],e.selectedList).forEach(function(e){console.log(t.ascriptionOrgid,e.ascriptionOrgid),t.ascriptionOrgid!==e.ascriptionOrgid&&i++})}),0<i)return i=0,this.$message({type:"warning",message:"不能同时核销两个不同的网点"}),!1;0!==this.selectedList.length&&this.$set(this.searchQuery.vo,"ascriptionOrgid",this.selectedList[0].ascriptionOrgid),this.$router.push({path:"/finance/accountsLoad/batchShort",query:{currentPage:"batchShort",searchQuery:o()(this.searchQuery),selectListBatchNos:o()(this.selectListBatchNos)}}),console.log(this.searchQuery.vo)},clickDetails:function(e){this.$refs.multipleTable.toggleRowSelection(e)},getSelection:function(e){var i=this;this.selectListBatchNos=[],(this.selectedDataList=e).forEach(function(e,t){i.selectListBatchNos.push(e.batchNo)}),this.selectedList=e},showDetail:function(e){}},n()(a,"setTable",function(){this.setupTableVisible=!0}),n()(a,"closeSetupTable",function(){this.setupTableVisible=!1}),n()(a,"setColumn",function(e){this.tableColumn=e,this.tablekey=Math.random()}),n()(a,"getSummaries",function(e){return Object(d.getSummaries)(e)}),a)}},fyBF:function(e,t,i){"use strict";var a={render:function(){var i=this,e=i.$createElement,a=i._self._c||e;return i.hasCode?a("div",{staticClass:"searchAll_lyy"},[a("el-form-item",{staticClass:"zdycx",attrs:{label:"自定义查询"}},[a("el-select",{attrs:{filterable:"",placeholder:"请选择","filter-method":i.querySearchAsync,"popper-class":"zdycx-pop",loading:i.loading},on:{change:i.handleSelect,focus:i.initdata},model:{value:i.datalist,callback:function(e){i.datalist=e},expression:"datalist"}},i._l(i.options4,function(t,e){return a("el-option",{key:e,attrs:{label:t.queryKey,value:t.id}},[i._v("\r\n        "+i._s(t.queryKey)+" "),a("i",{staticClass:"el-icon-circle-close-outline",on:{click:function(e){e.stopPropagation(),e.preventDefault(),i.deleteItem(t)}}})])})),i._v(" "),a("el-button",{attrs:{plain:""},on:{click:i.Custom}},[i._v("保存自定义")])],1),i._v(" "),a("addSave",{attrs:{code:i.hasCode,searchObj:i.searchObj,popVisible:i.popVisible},on:{close:i.closeAddDot,success:i.fetchAllloadAll}})],1):i._e()},staticRenderFns:[]};t.a=a},msh6:function(e,t,i){"use strict";var a={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-dialog",{staticClass:"wzl_settleLogSave",attrs:{title:t.popTitle,visible:t.isShow,"close-on-click-modal":!1,"before-close":t.closeMe},on:{close:t.closeMe,"update:visible":function(e){t.isShow=e}}},[i("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:t.form,rules:t.rules,"label-width":t.formLabelWidth,inline:!0,"label-position":"right",size:"mini"}},[i("el-form-item",{attrs:{label:"名称：",prop:"queryKey"}},[i("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.form.queryKey,expression:"form.queryKey",modifiers:{trim:!0}}],attrs:{maxlength:20,placeholder:"请定义名称"},domProps:{value:t.form.queryKey},on:{input:function(e){e.target.composing||t.$set(t.form,"queryKey",e.target.value.trim())},blur:function(e){t.$forceUpdate()}}})])],1),t._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{type:"primary",disabled:0===t.form.queryKey.length},on:{click:function(e){t.submitForm("ruleForm")}}},[t._v("确 定")]),t._v(" "),i("el-button",{on:{click:t.closeMe}},[t._v("取 消")])],1)],1)},staticRenderFns:[]};t.a=a},nl9Y:function(e,t){},sc8G:function(e,t,i){"use strict";var a={render:function(){var a=this,e=a.$createElement,r=a._self._c||e;return r("div",{directives:[{name:"loading",rawName:"v-loading",value:a.loading,expression:"loading"}],staticClass:"tab-content miniHeaderSearch"},[r("SearchForm",{attrs:{orgid:a.otherinfo.orgid,btnsize:a.btnsize},on:{change:a.getSearchParam}}),a._v(" "),r("div",{staticClass:"tab_info"},[r("div",{staticClass:"btns_box"},[r("el-button",{directives:[{name:"has",rawName:"v-has:PAY_LOADPRI1",arg:"PAY_LOADPRI1"}],attrs:{type:"primary",size:a.btnsize,icon:"el-icon-sort",plain:""},on:{click:function(e){a.doAction("count")}}},[a._v("核销")]),a._v(" "),r("el-button",{directives:[{name:"has",rawName:"v-has:PAY_LOADPRI1",arg:"PAY_LOADPRI1"}],attrs:{type:"primary",size:a.btnsize,icon:"el-icon-printer",plain:""},on:{click:function(e){a.doAction("print")}}},[a._v("打印")]),a._v(" "),r("el-button",{directives:[{name:"has",rawName:"v-has:PAY_LOADEXP1",arg:"PAY_LOADEXP1"}],attrs:{type:"primary",size:a.btnsize,icon:"el-icon-download",plain:""},on:{click:function(e){a.doAction("export")}}},[a._v("导出")]),a._v(" "),r("el-button",{staticClass:"table_setup",attrs:{type:"primary",size:a.btnsize,icon:"el-icon-setting",plain:""},on:{click:a.setTable}},[a._v("表格设置")])],1),a._v(" "),r("div",{staticClass:"info_tab"},[r("el-table",{key:a.tablekey,ref:"multipleTable",staticStyle:{width:"100%"},attrs:{"row-style":function(e){var t=e.row,i=e.index;return a._rowStyleAccounts({row:t,index:i},"statusName")},data:a.dataList,border:"",height:"100%","tooltip-effect":"dark","show-summary":!0,"summary-method":a.getSummaries},on:{"row-click":a.clickDetails,"selection-change":a.getSelection,"cell-dblclick":a.showDetail}},[r("el-table-column",{attrs:{fixed:"",sortable:"",type:"selection",width:"60"}}),a._v(" "),a._l(a.tableColumn,function(i){return[i.slot?r("el-table-column",{key:i.id,attrs:{fixed:i.fixed,sortable:"",label:i.label,width:i.width,prop:i.prop},scopedSlots:a._u([{key:"header",fn:function(e){return[r("tableHeaderSearch",{attrs:{scope:e,query:a.searchQuery},on:{change:a.changeKey}})]}},{key:"default",fn:function(t){return[i.click?r("span",{staticClass:"clickitem",domProps:{innerHTML:a._s(i.slot(t))},on:{click:function(e){e.stopPropagation(),i.click(t)}}}):r("span",{domProps:{innerHTML:a._s(i.slot(t))}})]}}])}):r("el-table-column",{key:i.id,attrs:{fixed:i.fixed,sortable:"",label:i.label,prop:i.prop,width:i.width},scopedSlots:a._u([{key:"header",fn:function(e){return[r("tableHeaderSearch",{attrs:{scope:e,query:a.searchQuery},on:{change:a.changeKey}})]}},{key:"default",fn:function(e){return[a._v(a._s(e.row[i.prop]))]}}])})]})],2)],1)]),a._v(" "),r("div",{staticClass:"info_tab_footer"},[a._v("\n    共计:"+a._s(a.total)+"\n    "),r("div",{staticClass:"show_pager"},[r("Pager",{attrs:{total:a.total},on:{change:a.handlePageChange}})],1)]),a._v(" "),r("TableSetup",{attrs:{popVisible:a.setupTableVisible,columns:a.tableColumn},on:{close:a.closeSetupTable,success:a.setColumn}})],1)},staticRenderFns:[]};t.a=a},seR9:function(e,t,i){"use strict";var a=i("mvHQ"),r=i.n(a),n=i("t5DY"),s=i("0xDb");t.a={computed:{isShow:{get:function(){return this.popVisible},set:function(){}}},components:{},props:{popVisible:{type:Boolean,default:!1},dotInfo:[Object,Array],searchQuery:[Object,Array],isDepMain:{type:Boolean,default:!1},createrId:[Number,String],isModify:{type:Boolean,default:!1},isAccept:{type:Boolean,default:!1},proptitle:String,searchObj:{type:[Array,Object],default:function(){}},code:{type:String,default:""}},data:function(){return{form:{userId:"",orgId:"",menuCode:"",queryKey:"",queryContent:""},searchCreatTime:+new Date,pickOption2:"",formLabelWidth:"75px",tooltip:!1,rules:{},queryKey:"",checked1:!0,popTitle:"自定义标签",loading:!1,type:""}},mounted:function(){},watch:{orgid:function(e){this.form.orgid=e},popVisible:function(e){e&&(this.form.userId=this.otherinfo.userId,this.form.orgId=this.otherinfo.orgid,this.form.menuCode=this.code||this.$route.meta.code)}},methods:{reset:function(){this.$refs.ruleForm.resetFields()},closeMe:function(e){this.$emit("close"),this.reset(),"function"==typeof e&&e()},submitForm:function(e){var i=this;this.loading||this.$refs[e].validate(function(e){if(!e)return!1;i.loading=!0,i.form.queryContent=r()(i.searchObj);var t=Object(s.objectMerge2)({},i.form);console.log("addSave_data",t),Object(n.s)(t).then(function(e){i.loading=!1,i.$message({message:"保存成功~",type:"success"}),i.closeMe(),i.$emit("success")}).catch(function(e){i.loading=!1,i.$message.warning(e.text)})})}}}},us2a:function(e,t,i){"use strict";var a=i("t5DY"),r=i("SjYS");t.a={components:{addSave:r.a},props:{searchObj:{type:[Object,Array]},value:[String,Number],code:{type:String,default:""}},data:function(){return{isModify:!1,popVisible:!1,setupTableVisible:!1,dataset:[],datalist:"",timeout:null,loading:!1,options4:[],querySearch:{currentPage:1,pageSize:10,vo:{orgId:"",userId:"",menuCode:""}}}},computed:{hasCode:function(){return this.code||this.$route.meta.code||""}},watch:{value:function(e){""===e&&(this.datalist="")},searchObj:{handler:function(e,t){},deep:!0}},mounted:function(){},methods:{initdata:function(){var t=this;this.inited||(this.inited=!0,this.loading=!0,this.fetchAllloadAll().then(function(e){t.loading=!1}))},deleteItem:function(e){var t=this;Object(a.b)(e.id).then(function(e){t.fetchAllloadAll(),t.datalist&&(t.datalist="")}).catch(function(e){t._handlerCatchMsg(e)})},Custom:function(){this.isModify=!0,this.popVisible=!0},closeAddDot:function(){this.popVisible=!1},fetchAllloadAll:function(){var t=this;return this.querySearch.vo.orgId=this.otherinfo.orgid,this.querySearch.vo.userId=this.otherinfo.userId,this.querySearch.vo.menuCode=this.code||this.$route.meta.code,Object(a.r)(this.querySearch).then(function(e){t.dataset=e.list||[],t.options4=e.list||[]})},querySearchAsync:function(e,t){var i=this.dataset,a=e?i.filter(this.createStateFilter(e)):i;t(this.options4=a)},createStateFilter:function(t){return function(e){return 0===e.queryKey.toLowerCase().indexOf(t.toLowerCase())}},handleSelect:function(t){var e=this.options4.filter(function(e){return e.id===t});if(e.length){var i=e[0].queryContent,a=JSON.parse(i);this.$emit("change",JSON.parse(i.replace(/'/g,'"'))),this.$emit("dataObj",a)}}}}},x7Sc:function(e,t,i){"use strict";var a=i("woOf"),r=i.n(a),n=i("E4LH"),s=i("o9X6"),o=i("pAQG"),c=i("0xDb"),l=i("8UOW");t.a={components:{SelectTree:s.a,querySelect:o.a,searchAll:l.a},props:{btnsize:{type:String,default:"mini"},orgid:{type:Number}},data:function(){return{searchAll:"1",searchObjs:{},searchForm:{orgid:"",ascriptionOrgid:"",status:"NOSETTLEMENT,PARTSETTLEMENT,ALLSETTLEMENT",truckIdNumber:"",dirverName:""},rules:{shipSn:[{validator:function(e,t,i){var a=n.a.ONLY_NUMBER;""!==t&&null!==t&&t&&void 0!==t?a.test(t)?i():i(new Error("请输入最多15位数字")):i()},tigger:"blur"}]},searchTime:[Object(c.parseTime)(new Date-5184e6),Object(c.parseTime)(new Date)],pickerOptions:{shortcuts:c.pickerOptions2}}},watch:{searchTime:function(e){e&&(this.$set(this.searchObjs,"departureStartTime",Object(c.parseTime)(this.searchTime[0],"{y}-{m}-{d} ")+"00:00:00"),this.$set(this.searchObjs,"departureEndTime",Object(c.parseTime)(this.searchTime[1],"{y}-{m}-{d} ")+"23:59:59"))},orgid:function(e){this.searchForm.orgId=e},searchForm:{handler:function(e,t){this.searchObjs=r()({},e),this.searchTime&&(this.$set(this.searchObjs,"departureStartTime",Object(c.parseTime)(this.searchTime[0],"{y}-{m}-{d} ")+"00:00:00"),this.$set(this.searchObjs,"departureEndTime",Object(c.parseTime)(this.searchTime[1],"{y}-{m}-{d} ")+"23:59:59"))},deep:!0}},mounted:function(){this.searchForm.orgid=this.otherinfo.orgid,this.onSubmit()},methods:{getDataObj:function(e){this.searchTime=[e.departureStartTime,e.departureEndTime],this.searchForm=r()({},e),this.$emit("change",e)},onSubmit:function(){var e=r()({},this.searchForm);this.searchTime&&(this.$set(e,"departureStartTime",Object(c.parseTime)(this.searchTime[0],"{y}-{m}-{d} ")+"00:00:00"),this.$set(e,"departureEndTime",Object(c.parseTime)(this.searchTime[1],"{y}-{m}-{d} ")+"23:59:59")),this.$emit("change",e)},clearForm:function(e){var t=this;this.$nextTick(function(){t.searchForm=t.$options.data().searchForm,t.searchTime=t.$options.data().searchTime,t.$refs[e].resetFields(),t.searchForm.orgid=t.otherinfo.orgid,t.searchForm.ascriptionOrgid=t.otherinfo.orgid,t.searchAll="1",setTimeout(function(){t.searchAll=""},50)})}}}}});