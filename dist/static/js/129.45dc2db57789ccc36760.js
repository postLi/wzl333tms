webpackJsonp([129,169],{"2XB9":function(e,t,i){"use strict";var r=i("woOf"),a=i.n(r),n=i("E4LH"),o=i("o9X6"),s=i("pAQG"),l=i("0xDb"),c=i("8UOW");t.a={components:{SelectTree:o.a,querySelect:s.a,searchAll:c.a},props:{btnsize:{type:String,default:"mini"},orgid:{type:Number},isAllOrg:{type:Boolean},isArrivalSel:{type:Boolean}},data:function(){return{searchAll:"1",searchObjs:{},searchForm:{orgid:"",ascriptionOrgid:"",arriveOrgid:"",status:"NOSETTLEMENT,PARTSETTLEMENT,ALLSETTLEMENT",truckIdNumber:"",dirverName:""},rules:{shipSn:[{validator:function(e,t,i){var r=n.a.ONLY_NUMBER;""!==t&&null!==t&&t&&void 0!==t?r.test(t)?i():i(new Error("请输入最多15位数字")):i()},tigger:"blur"}]},searchTime:[Object(l.parseTime)(new Date-5184e6),Object(l.parseTime)(new Date)],pickerOptions:{shortcuts:l.pickerOptions2}}},watch:{searchTime:function(e){e&&(this.$set(this.searchObjs,"departureStartTime",Object(l.parseTime)(this.searchTime[0],"{y}-{m}-{d} ")+"00:00:00"),this.$set(this.searchObjs,"departureEndTime",Object(l.parseTime)(this.searchTime[1],"{y}-{m}-{d} ")+"23:59:59"))},searchForm:{handler:function(e,t){this.searchObjs=a()({},e),this.searchTime&&(this.$set(this.searchObjs,"departureStartTime",Object(l.parseTime)(this.searchTime[0],"{y}-{m}-{d} ")+"00:00:00"),this.$set(this.searchObjs,"departureEndTime",Object(l.parseTime)(this.searchTime[1],"{y}-{m}-{d} ")+"23:59:59"))},deep:!0}},mounted:function(){this.searchForm.orgid=this.otherinfo.orgid,this.isAllOrg&&(this.searchForm.ascriptionOrgid=this.otherinfo.orgid),this.onSubmit()},methods:{getDataObj:function(e){this.searchTime=[e.departureStartTime,e.departureEndTime],this.searchForm=a()({},e),this.$emit("change",e)},onSubmit:function(){var e=a()({},this.searchForm);this.searchTime&&(this.$set(e,"departureStartTime",Object(l.parseTime)(this.searchTime[0],"{y}-{m}-{d} ")+"00:00:00"),this.$set(e,"departureEndTime",Object(l.parseTime)(this.searchTime[1],"{y}-{m}-{d} ")+"23:59:59")),this.$emit("change",e)},clearForm:function(e){var t=this;this.$nextTick(function(){t.searchForm=t.$options.data().searchForm,t.searchTime=t.$options.data().searchTime,t.$refs[e].resetFields(),t.searchForm.orgid=t.otherinfo.orgid,t.searchForm.ascriptionOrgid=t.otherinfo.orgid,t.searchAll="1",setTimeout(function(){t.searchAll=""},50)})}}}},"6A83":function(e,t,i){"use strict";var r={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-dialog",{staticClass:"wzl_settleLogSave",attrs:{title:t.popTitle,visible:t.isShow,"close-on-click-modal":!1,"before-close":t.closeMe},on:{close:t.closeMe,"update:visible":function(e){t.isShow=e}}},[i("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:t.form,rules:t.rules,"label-width":t.formLabelWidth,inline:!0,"label-position":"right",size:"mini"}},[i("el-form-item",{attrs:{label:"名称：",prop:"queryKey"}},[i("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.form.queryKey,expression:"form.queryKey",modifiers:{trim:!0}}],attrs:{maxlength:20,placeholder:"请定义名称"},domProps:{value:t.form.queryKey},on:{input:function(e){e.target.composing||t.$set(t.form,"queryKey",e.target.value.trim())},blur:function(e){t.$forceUpdate()}}})])],1),t._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{type:"primary",disabled:0===t.form.queryKey.length},on:{click:function(e){t.submitForm("ruleForm")}}},[t._v("确 定")]),t._v(" "),i("el-button",{on:{click:t.closeMe}},[t._v("取 消")])],1)],1)},staticRenderFns:[]};t.a=r},"6zVS":function(e,t,i){"use strict";var r={render:function(){var i=this,e=i.$createElement,r=i._self._c||e;return i.hasCode?r("div",{staticClass:"searchAll_lyy"},[r("el-form-item",{staticClass:"zdycx",attrs:{label:"自定义查询"}},[r("el-select",{attrs:{filterable:"",placeholder:"请选择","filter-method":i.querySearchAsync,"popper-class":"zdycx-pop",loading:i.loading},on:{change:i.handleSelect,focus:i.initdata},model:{value:i.datalist,callback:function(e){i.datalist=e},expression:"datalist"}},i._l(i.options4,function(t,e){return r("el-option",{key:e,attrs:{label:t.queryKey,value:t.id}},[i._v("\n        "+i._s(t.queryKey)+" "),r("i",{staticClass:"el-icon-circle-close-outline",on:{click:function(e){e.stopPropagation(),e.preventDefault(),i.deleteItem(t.id)}}})])})),i._v(" "),r("el-button",{attrs:{plain:""},on:{click:i.Custom}},[i._v("保存自定义")])],1),i._v(" "),r("addSave",{attrs:{code:i.hasCode,searchObj:i.searchObj,popVisible:i.popVisible},on:{close:i.closeAddDot,success:i.fetchAllloadAll}})],1):i._e()},staticRenderFns:[]};t.a=r},"8UOW":function(e,t,i){"use strict";var r=i("us2a"),a=i("6zVS");var n=function(e){i("Pnd5")},o=i("VU/8")(r.a,a.a,n,null,null);t.a=o.exports},"9rO5":function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=i("SBFw"),a=i("NUs4"),n=i("VU/8")(r.a,a.a,null,null,null);t.default=n.exports},JW1v:function(e,t,i){"use strict";t.g=function(e){return r.b.post("/api-finance/finance/tmsfinancefeepayable/v1/findListByFeeType/",e).then(function(e){return console.log("postFindListByFeeType22222222222222"),e.data||{list:[],totalCount:0}})},t.h=function(e){return r.b.post("/api-finance/finance/tmsfinancefeepayable/v1/findTransferList/",e).then(function(e){return e.data||{list:[],totalCount:0}})},t.e=function(e){return r.b.post("/api-finance/finance/tmsfinancefeepayable/v1/findAbnormalList/",e).then(function(e){return e.data||{list:[],totalCount:0}})},t.f=function(e){return r.b.post("/api-finance/finance/tmsfinancefeepayable/v1/findChangeList/",e).then(function(e){return e.data||{list:[],totalCount:0}})},t.d=function(e,t){return r.b.post("/api-finance/finance/tmsfinancefeepayable/v1/create/"+e,t).then(function(e){return e.data})},t.k=function(e){return r.b.post("/api-finance/finance/tmsfinancefeepayable/v1/payListBySummary/",e).then(function(e){return e.data||{list:[],totalCount:0}})},t.j=function(e){return r.b.post("/api-finance/finance/tmsfinancefeepayable/v1/payListByOne/",e).then(function(e){return e.data||{list:[],totalCount:0}})},t.a=function(e,t){return r.b.get("/api-finance/finance/tmsfinancecapitalflow/v1/getFeeInfo/?orgId="+e+"&paymentsType="+t)},t.i=function(e){return r.b.post("/api-finance/finance/tmsfinancefeepayable/v1/loadSettlement/",e).then(function(e){return e.data})},t.b=function(e){return r.b.post("/api-finance/finance/tmsfinancefeepayable/v1/loadVerification",e).then(function(e){return e.data})},t.c=function(e){return r.b.post("/api-finance/finance/tmsfinancefeepayable/v1/payListByHandlingFee",e).then(function(e){return e.data})};var r=i("Vo7i");i("0xDb")},N5yE:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=i("2XB9"),a=i("PqY0"),n=i("VU/8")(r.a,a.a,null,null,null);t.default=n.exports},NUs4:function(e,t,i){"use strict";var r={render:function(){var r=this,e=r.$createElement,a=r._self._c||e;return a("div",{directives:[{name:"loading",rawName:"v-loading",value:r.loading,expression:"loading"}],staticClass:"tab-content"},[a("SearchForm",{attrs:{orgid:r.otherinfo.orgid,isAllOrg:!0,btnsize:r.btnsize},on:{change:r.getSearchParam}}),r._v(" "),a("div",{staticClass:"tab_info"},[a("div",{staticClass:"btns_box"},[a("el-button",{directives:[{name:"has",rawName:"v-has:PAY_LOADSET4",arg:"PAY_LOADSET4"}],attrs:{type:"primary",size:r.btnsize,icon:"el-icon-sort",plain:""},on:{click:function(e){r.doAction("count")}}},[r._v("核销")]),r._v(" "),a("el-button",{directives:[{name:"has",rawName:"v-has:PAY_LOADPRI4",arg:"PAY_LOADPRI4"}],attrs:{type:"primary",size:r.btnsize,icon:"el-icon-printer",plain:""},on:{click:function(e){r.doAction("print")}}},[r._v("打印")]),r._v(" "),a("el-button",{directives:[{name:"has",rawName:"v-has:PAY_LOADEXP4",arg:"PAY_LOADEXP4"}],attrs:{type:"primary",size:r.btnsize,icon:"el-icon-download",plain:""},on:{click:function(e){r.doAction("export")}}},[r._v("导出")]),r._v(" "),a("el-button",{staticClass:"table_setup",attrs:{type:"primary",size:r.btnsize,icon:"el-icon-setting",plain:""},on:{click:r.setTable}},[r._v("表格设置")])],1),r._v(" "),a("div",{staticClass:"info_tab"},[a("el-table",{key:r.tablekey,ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:r.dataList,stripe:"",border:"",height:"100%","tooltip-effect":"dark"},on:{"row-click":r.clickDetails,"selection-change":r.getSelection,"cell-dblclick":r.showDetail}},[a("el-table-column",{attrs:{fixed:"",sortable:"",type:"selection",width:"35"}}),r._v(" "),r._l(r.tableColumn,function(i){return[i.slot?a("el-table-column",{key:i.id,attrs:{fixed:i.fixed,sortable:"",label:i.label,width:i.width},scopedSlots:r._u([{key:"default",fn:function(t){return[i.click?a("span",{staticClass:"clickitem",domProps:{innerHTML:r._s(i.slot(t))},on:{click:function(e){e.stopPropagation(),i.click(t)}}}):a("span",{domProps:{innerHTML:r._s(i.slot(t))}})]}}])}):a("el-table-column",{key:i.id,attrs:{fixed:i.fixed,sortable:"",label:i.label,prop:i.prop,width:i.width}})]})],2)],1)]),r._v(" "),a("div",{staticClass:"info_tab_footer"},[r._v("\n    共计:"+r._s(r.total)+"\n    "),a("div",{staticClass:"show_pager"},[a("Pager",{attrs:{total:r.total},on:{change:r.handlePageChange}})],1)]),r._v(" "),a("TableSetup",{attrs:{popVisible:r.setupTableVisible,columns:r.tableColumn},on:{close:r.closeSetupTable,success:r.setColumn}})],1)},staticRenderFns:[]};t.a=r},Pnd5:function(e,t){},PqY0:function(e,t,i){"use strict";var r={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-form",{ref:"searchForm",staticClass:"staff_searchinfo clearfix",attrs:{inline:!0,size:t.btnsize,"label-position":"right",rules:t.rules,model:t.searchForm,"label-width":"70px"}},[i("div",{staticClass:"staff_searchinfo--input"},[i("el-form-item",{attrs:{label:"发车时间"}},[i("el-date-picker",{attrs:{type:"daterange",align:"right","value-format":"yyyy-MM-dd HH:mm:ss","start-placeholder":"开始日期","picker-options":t.pickerOptions,"end-placeholder":"结束日期"},model:{value:t.searchTime,callback:function(e){t.searchTime=e},expression:"searchTime"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"发车网点"}},[t.isAllOrg?i("SelectTree",{model:{value:t.searchForm.orgid,callback:function(e){t.$set(t.searchForm,"orgid",e)},expression:"searchForm.orgid"}}):i("SelectTree",{attrs:{orgid:t.otherinfo.orgid},model:{value:t.searchForm.orgid,callback:function(e){t.$set(t.searchForm,"orgid",e)},expression:"searchForm.orgid"}})],1),t._v(" "),t.isAllOrg?i("el-form-item",{attrs:{label:"核销网点"}},[i("SelectTree",{attrs:{orgid:t.otherinfo.orgid},model:{value:t.searchForm.ascriptionOrgid,callback:function(e){t.$set(t.searchForm,"ascriptionOrgid",e)},expression:"searchForm.ascriptionOrgid"}})],1):t._e(),t._v(" "),!t.isAllOrg&&t.isArrivalSel?i("el-form-item",{attrs:{label:"到车网点"}},[i("SelectTree",{attrs:{clearable:""},model:{value:t.searchForm.arriveOrgid,callback:function(e){t.$set(t.searchForm,"arriveOrgid",e)},expression:"searchForm.arriveOrgid"}})],1):t._e(),t._v(" "),i("el-form-item",{attrs:{label:"发车批次",prop:"batchNo"}},[i("el-input",{attrs:{placeholder:"请输入发车批次"},model:{value:t.searchForm.batchNo,callback:function(e){t.$set(t.searchForm,"batchNo",e)},expression:"searchForm.batchNo"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"车牌号",prop:"truckIdNumber"}},[i("el-input",{attrs:{placeholder:"请输入车牌号"},model:{value:t.searchForm.truckIdNumber,callback:function(e){t.$set(t.searchForm,"truckIdNumber",e)},expression:"searchForm.truckIdNumber"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"司机"}},[i("el-input",{attrs:{clearable:"",maxlength:10,placeholder:"司机名称"},model:{value:t.searchForm.dirverName,callback:function(e){t.$set(t.searchForm,"dirverName",e)},expression:"searchForm.dirverName"}})],1),t._v(" "),i("searchAll",{attrs:{searchObj:t.searchObjs},on:{dataObj:t.getDataObj},model:{value:t.searchAll,callback:function(e){t.searchAll=e},expression:"searchAll"}})],1),t._v(" "),i("el-form-item",{staticClass:"staff_searchinfo--btn"},[i("el-button",{attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v("查询")]),t._v(" "),i("el-button",{attrs:{type:"info",plain:""},on:{click:function(e){t.clearForm("searchForm")}}},[t._v("清空")])],1)],1)},staticRenderFns:[]};t.a=r},SBFw:function(e,t,i){"use strict";var r,a=i("bOdI"),n=i.n(a),o=i("mvHQ"),s=i.n(o),l=i("woOf"),c=i.n(l),u=i("Dd8w"),d=i.n(u),h=i("0xDb"),p=i("N5yE"),f=i("1onU"),m=i("puNT"),b=i("JW1v"),v=i("NYxO"),g=i("UQm2");t.a={components:{SearchForm:p.default,Pager:f.a,TableSetup:m.a},computed:d()({},Object(v.mapGetters)(["otherinfo"])),data:function(){var i=this;return{btnsize:"mini",sign:2,searchQuery:{currentPage:1,pageSize:100,vo:{status:"NOSETTLEMENT,PARTSETTLEMENT,ALLSETTLEMENT"}},tablekey:0,total:0,dataList:[],selectListBatchNos:[],loading:!0,setupTableVisible:!1,tableColumn:[{label:"序号",prop:"id",width:"50",fixed:!0,slot:function(e){return(i.searchQuery.currentPage-1)*i.searchQuery.pageSize+e.$index+1}},{label:"发车批次",prop:"batchNo",width:"120",fixed:!0},{label:"批次状态",prop:"batchTypeName",width:"100",fixed:!1},{label:"发车网点",prop:"orgName",width:"120",fixed:!1},{label:"到达网点",prop:"arriveOrgName",width:"120",fixed:!1},{label:"发车时间",prop:"departureTime",width:"160",fixed:!1,slot:function(e){return""+Object(h.parseTime)(e.row.departureTime,"{y}-{m}-{d} {h}:{i}:{s}")}},{label:"到达时间",prop:"receivingTime",width:"160",fixed:!1,slot:function(e){return""+Object(h.parseTime)(e.row.receivingTime,"{y}-{m}-{d} {h}:{i}:{s}")}},{label:"到付车费",prop:"arrivepayCarriage",width:"90",fixed:!1},{label:"已核销到付车费",prop:"paidArrivepayCarriage",width:"120",fixed:!1,slot:function(e){var t=e.row;return i._setTextColor(t.arrivepayCarriage,t.paidArrivepayCarriage,t.unpaidArrivepayCarriage,t.paidArrivepayCarriage)}},{label:"未核销到付车费",prop:"unpaidArrivepayCarriage",width:"120",fixed:!1,slot:function(e){var t=e.row;return i._setTextColor(t.arrivepayCarriage,t.paidArrivepayCarriage,t.unpaidArrivepayCarriage,t.unpaidArrivepayCarriage)}},{label:"到付油卡",prop:"arrivepayOilCard",width:"90",fixed:!1},{label:"已核销到付油卡",prop:"paidArrivepayOilCard",width:"120",fixed:!1,slot:function(e){var t=e.row;return i._setTextColor(t.arrivepayOilCard,t.paidArrivepayOilCard,t.unpaidArrivepayOilCard,t.paidArrivepayOilCard)}},{label:"未核销到付油卡",prop:"unpaidArrivepayOilCard",width:"120",fixed:!1,slot:function(e){var t=e.row;return i._setTextColor(t.arrivepayOilCard,t.paidArrivepayOilCard,t.unpaidArrivepayOilCard,t.unpaidArrivepayOilCard)}},{label:"到站装卸费",prop:"arriveHandlingFee",width:"100",fixed:!1},{label:"已核销到站装卸费",prop:"paidArriveHandlingFee",width:"120",fixed:!1,slot:function(e){var t=e.row;return i._setTextColor(t.arriveHandlingFee,t.paidArriveHandlingFee,t.unpaidArriveHandlingFee,t.paidArriveHandlingFee)}},{label:"未核销到站装卸费",prop:"unpaidArriveHandlingFee",width:"120",fixed:!1,slot:function(e){var t=e.row;return i._setTextColor(t.arriveHandlingFee,t.paidArriveHandlingFee,t.unpaidArriveHandlingFee,t.unpaidArriveHandlingFee)}},{label:"到站其他费",prop:"arriveOtherFee",width:"100",fixed:!1},{label:"已核销到站其他费",prop:"paidArriveOtherFee",width:"120",fixed:!1,slot:function(e){var t=e.row;return i._setTextColor(t.arriveOtherFee,t.paidArriveOtherFee,t.unpaidArriveOtherFee,t.paidArriveOtherFee)}},{label:"未核销到站其他费",prop:"unpaidArriveOtherFee",width:"120",fixed:!1,slot:function(e){var t=e.row;return i._setTextColor(t.arriveOtherFee,t.paidArriveOtherFee,t.unpaidArriveOtherFee,t.unpaidArriveOtherFee)}},{label:"车牌号",prop:"truckIdNumber",width:"100",fixed:!1},{label:"司机名称",prop:"dirverName",width:"100",fixed:!1},{label:"司机电话",prop:"dirverMobile",width:"110",fixed:!1},{label:"配载件数",prop:"loadAmountall",width:"90",fixed:!1},{label:"配载重量",prop:"loadWeightall",width:"90",fixed:!1},{label:"配载体积",prop:"loadVolumeall",width:"90",fixed:!1},{label:"备注",prop:"remark",width:"150",fixed:!1}],selectedDataList:[]}},methods:(r={getSearchParam:function(e){this.searchQuery.currentPage=this.$options.data().searchQuery.currentPage,this.searchQuery.pageSize=this.$options.data().searchQuery.pageSize,this.searchQuery.vo=c()({},e),this.fetchList()},handlePageChange:function(e){this.searchQuery.currentPage=e.pageNum,this.searchQuery.pageSize=e.pageSize,this.fetchList()},fetchList:function(){var t=this;return this.$set(this.searchQuery.vo,"sign",this.sign),this.loading=!0,Object(b.k)(this.searchQuery).then(function(e){t.dataList=e.list,t.total=e.total,t.loading=!1}).catch(function(e){t.loading=!1,t._handlerCatchMsg(e)})},setTable:function(){},doAction:function(e){switch(e){case"count":this.count();break;case"export":Object(g.g)({data:0<this.selectedDataList.length?this.selectedDataList:this.dataList,columns:this.tableColumn,name:"车费核销-到车汇总-"+Object(h.parseTime)(new Date,"{y}{m}{d}{h}{i}{s}")});break;case"print":Object(g.d)({data:0<this.selectedDataList.length?this.selectedDataList:this.dataList,columns:this.tableColumn,name:"车费核销-到车汇总"})}},count:function(){this.$router.push({path:"../../accountsLoad",query:{tab:"到车汇总核销",currentPage:"batchArrivalAll",searchQuery:s()(this.searchQuery),selectListBatchNos:s()(this.selectListBatchNos)}})},clickDetails:function(e){this.$refs.multipleTable.toggleRowSelection(e)},getSelection:function(e){var i=this;this.selectListBatchNos=[],(this.selectedDataList=e).forEach(function(e,t){i.selectListBatchNos.push(e.batchNo)})},showDetail:function(e){}},n()(r,"setTable",function(){this.setupTableVisible=!0}),n()(r,"closeSetupTable",function(){this.setupTableVisible=!1}),n()(r,"setColumn",function(e){this.tableColumn=e,this.tablekey=Math.random()}),r)}},SjYS:function(e,t,i){"use strict";var r=i("seR9"),a=i("6A83");var n=function(e){i("oWEi")},o=i("VU/8")(r.a,a.a,n,null,null);t.a=o.exports},oWEi:function(e,t){},seR9:function(e,t,i){"use strict";var r=i("mvHQ"),a=i.n(r),n=i("t5DY"),o=i("0xDb");t.a={computed:{isShow:{get:function(){return this.popVisible},set:function(){}}},components:{},props:{popVisible:{type:Boolean,default:!1},dotInfo:[Object,Array],searchQuery:[Object,Array],isDepMain:{type:Boolean,default:!1},createrId:[Number,String],isModify:{type:Boolean,default:!1},isAccept:{type:Boolean,default:!1},proptitle:String,searchObj:{type:[Array,Object],default:function(){}},code:{type:String,default:""}},data:function(){return{form:{userId:"",orgId:"",menuCode:"",queryKey:"",queryContent:""},searchCreatTime:+new Date,pickOption2:"",formLabelWidth:"75px",tooltip:!1,rules:{},queryKey:"",checked1:!0,popTitle:"自定义标签",loading:!1,type:""}},mounted:function(){},watch:{orgid:function(e){this.form.orgid=e},popVisible:function(e){e&&(this.form.userId=this.otherinfo.userId,this.form.orgId=this.otherinfo.orgid,this.form.menuCode=this.code||this.$route.meta.code)}},methods:{reset:function(){this.$refs.ruleForm.resetFields()},closeMe:function(e){this.$emit("close"),this.reset(),"function"==typeof e&&e()},submitForm:function(e){var i=this;this.loading||this.$refs[e].validate(function(e){if(!e)return!1;i.loading=!0,i.form.queryContent=a()(i.searchObj);var t=Object(o.objectMerge2)({},i.form);console.log("addSave_data",t),Object(n.q)(t).then(function(e){i.loading=!1,i.$message({message:"保存成功~",type:"success"}),i.closeMe(),i.$emit("success")}).catch(function(e){i.loading=!1,i.$message.warning(e.text)})})}}}},us2a:function(e,t,i){"use strict";var r=i("t5DY"),a=i("SjYS");t.a={components:{addSave:a.a},props:{searchObj:{type:[Object,Array]},value:[String,Number],code:{type:String,default:""}},data:function(){return{isModify:!1,popVisible:!1,setupTableVisible:!1,dataset:[],datalist:"",timeout:null,loading:!1,options4:[],querySearch:{currentPage:1,pageSize:10,vo:{orgId:"",userId:"",menuCode:""}}}},computed:{hasCode:function(){return this.code||this.$route.meta.code||""}},watch:{value:function(e){console.log("nnn:",e),""===e&&(this.datalist="")},searchObj:{handler:function(e,t){this.$nextTick(function(){console.log("searchAll_cval",e,t)})},deep:!0}},mounted:function(){},methods:{initdata:function(){var t=this;this.inited||(this.inited=!0,this.loading=!0,this.fetchAllloadAll().then(function(e){t.loading=!1}))},deleteItem:function(e){var t=this;Object(r.a)(e).then(function(e){t.fetchAllloadAll()}).catch(function(e){t._handlerCatchMsg(e)})},Custom:function(){this.isModify=!0,this.popVisible=!0},closeAddDot:function(){this.popVisible=!1},fetchAllloadAll:function(){var t=this;return this.querySearch.vo.orgId=this.otherinfo.orgid,this.querySearch.vo.userId=this.otherinfo.userId,this.querySearch.vo.menuCode=this.code||this.$route.meta.code,Object(r.p)(this.querySearch).then(function(e){t.dataset=e.list,t.options4=e.list})},querySearchAsync:function(e,t){var i=this.dataset,r=e?i.filter(this.createStateFilter(e)):i;t(this.options4=r)},createStateFilter:function(t){return function(e){return 0===e.queryKey.toLowerCase().indexOf(t.toLowerCase())}},handleSelect:function(t){var e=this.options4.filter(function(e){return e.id===t});if(e.length){var i=e[0].queryContent,r=JSON.parse(i);this.$emit("change",JSON.parse(i.replace(/'/g,'"'))),this.$emit("dataObj",r)}}}}}});