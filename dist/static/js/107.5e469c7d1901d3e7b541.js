webpackJsonp([107,168],{"04N3":function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=i("OM6m"),s=i("pWsp"),r=i("VU/8")(a.a,s.a,null,null,null);t.default=r.exports},"8UOW":function(e,t,i){"use strict";var a=i("us2a"),s=i("fyBF");var r=function(e){i("Qhr/")},n=i("VU/8")(a.a,s.a,r,null,null);t.a=n.exports},JW1v:function(e,t,i){"use strict";t.g=function(e){return a.b.post("/api-finance/finance/tmsfinancefeepayable/v1/findListByFeeType/",e).then(function(e){return console.log("postFindListByFeeType22222222222222"),e.data||{list:[],totalCount:0}})},t.h=function(e){return a.b.post("/api-finance/finance/tmsfinancefeepayable/v1/findTransferList/",e).then(function(e){return e.data||{list:[],totalCount:0}})},t.e=function(e){return a.b.post("/api-finance/finance/tmsfinancefeepayable/v1/findAbnormalList/",e).then(function(e){return e.data||{list:[],totalCount:0}})},t.f=function(e){return a.b.post("/api-finance/finance/tmsfinancefeepayable/v1/findChangeList/",e).then(function(e){return e.data||{list:[],totalCount:0}})},t.d=function(e,t){return a.b.post("/api-finance/finance/tmsfinancefeepayable/v1/create/"+e,t).then(function(e){return e.data})},t.k=function(e){return a.b.post("/api-finance/finance/tmsfinancefeepayable/v1/payListBySummary/",e).then(function(e){return e.data||{list:[],totalCount:0}})},t.j=function(e){return a.b.post("/api-finance/finance/tmsfinancefeepayable/v1/payListByOne/",e).then(function(e){return e.data||{list:[],totalCount:0}})},t.a=function(e,t){return a.b.get("/api-finance/finance/tmsfinancecapitalflow/v1/getFeeInfo/?orgId="+e+"&paymentsType="+t)},t.i=function(e){return a.b.post("/api-finance/finance/tmsfinancefeepayable/v1/loadSettlement/",e).then(function(e){return e.data})},t.b=function(e){return a.b.post("/api-finance/finance/tmsfinancefeepayable/v1/loadVerification",e).then(function(e){return e.data})},t.c=function(e){return a.b.post("/api-finance/finance/tmsfinancefeepayable/v1/payListByHandlingFee",e).then(function(e){return e.data})};var a=i("Vo7i");i("0xDb")},OM6m:function(e,t,i){"use strict";var a,s=i("bOdI"),r=i.n(s),n=i("mvHQ"),o=i.n(n),l=i("woOf"),c=i.n(l),h=i("0xDb"),u=i("WE62"),d=i("1onU"),p=i("JW1v"),m=i("Mqi+"),f=i("UQm2");t.a={components:{SearchForm:u.default,Pager:d.a},data:function(){var i=this;return{btnsize:"mini",feeType:10,selectListShipSns:[],searchQuery:{currentPage:1,pageSize:100,vo:{}},tablekey:0,total:0,dataList:[],loading:!0,setupTableVisible:!1,tableColumn:[{label:"运单号",prop:"shipSn",width:"120",fixed:!1},{label:"开单网点",prop:"shipFromOrgName",width:"120",fixed:!0},{label:"货号",prop:"shipGoodsSn",width:"150",fixed:!1},{label:"核销状态",prop:"statusName",width:"90",fixed:!1},{label:"签收状态",prop:"signStatusName",width:"100",fixed:!1},{label:"运单标识",prop:"shipIdentifying",width:"150",fixed:!1,slot:function(e){return Object(m.b)(e.row.shipIdentifying)}},{label:"发站",prop:"shipFromCityName",width:"140",fixed:!1},{label:"到站",prop:"shipToCityName",width:"140",fixed:!1},{label:"实际提货费",prop:"fee",width:"100",fixed:!1},{label:"已核销实际提货费",prop:"closeFee",width:"120",fixed:!1,slot:function(e){var t=e.row;return i._setTextColor(t.fee,t.closeFee,t.unpaidFee,t.closeFee)}},{label:"未核销实际提货费",prop:"unpaidFee",width:"120",fixed:!1,slot:function(e){var t=e.row;return i._setTextColor(t.fee,t.closeFee,t.unpaidFee,t.unpaidFee)}},{label:"开单日期",prop:"createTime",width:"160",slot:function(e){return""+Object(h.parseTime)(e.row.createTime,"{y}-{m}-{d} {h}:{i}:{s}")},fixed:!1},{label:"发货方",prop:"senderUnit",width:"100",fixed:!1},{label:"发货人",prop:"senderCustomerName",width:"100",fixed:!1},{label:"收货方",prop:"receiverUnit",width:"100",fixed:!1},{label:"收货人",prop:"receiverCustomerName",width:"100",fixed:!1},{label:"货品名",prop:"cargoName",width:"100",fixed:!1},{label:"件数",prop:"cargoAmount",width:"90",fixed:!1},{label:"重量(kg)",prop:"cargoWeight",width:"90",fixed:!1},{label:"体积(方)",prop:"cargoVolume",width:"90",fixed:!1},{label:"付款方式",prop:"shipPayWayName",width:"100",fixed:!1},{label:"制单人",prop:"userName",width:"100",fixed:!1},{label:"发货人电话",prop:"senderCustomerMobile",width:"110",fixed:!1},{label:"发货人地址",prop:"senderDetailedAddress",width:"150",fixed:!1},{label:"收货人电话",prop:"receiverCustomerMobile",width:"110",fixed:!1},{label:"收货地址",prop:"receiverDetailedAddress",width:"150",fixed:!1},{label:"交接方式",prop:"shipDeliveryMethodName",width:"100",fixed:!1},{label:"时效",prop:"shipEffectiveName",width:"90",fixed:!1},{label:"运单备注",prop:"shipRemarks",width:"150",fixed:!1}],selectedDataList:[]}},methods:(a={changeKey:function(e){this.total=0,this.searchQuery=e,this.loading||this.fetchList()},getSearchParam:function(e){this.searchQuery.currentPage=this.$options.data().searchQuery.currentPage,this.searchQuery.pageSize=this.$options.data().searchQuery.pageSize,this.$set(this.searchQuery.vo,"feeType",this.feeType),this.searchQuery.vo=c()({},e),this.fetchList()},handlePageChange:function(e){this.searchQuery.currentPage=e.pageNum,this.searchQuery.pageSize=e.pageSize,this.fetchList()},fetchList:function(){var t=this;return this.loading=!0,this.$set(this.searchQuery.vo,"feeType",this.feeType),Object(p.g)(this.searchQuery).then(function(e){t.dataList=e.list,t.total=e.total,t.loading=!1,console.log(t.dataList)}).catch(function(e){t.loading=!1,t._handlerCatchMsg(e)})},setTable:function(){},doAction:function(e){switch(e){case"count":this.count();break;case"export":Object(f.g)({data:0<this.selectedDataList.length?this.selectedDataList:this.dataList,columns:this.tableColumn,name:"运单核销-实际提货费-"+Object(h.parseTime)(new Date,"{y}{m}{d}{h}{i}{s}")});break;case"print":Object(f.d)({data:0<this.selectedDataList.length?this.selectedDataList:this.dataList,columns:this.tableColumn,name:"运单核销-实际提货费"})}},count:function(){this.$router.push({path:"../../accountsLoad",query:{tab:"实际提货费核销",currentPage:"waybillTicket",searchQuery:o()(this.searchQuery),selectListShipSns:o()(this.selectListShipSns)}})},clickDetails:function(e){this.$refs.multipleTable.toggleRowSelection(e)},getSelection:function(e){var i=this;this.selectListShipSns=[],(this.selectedDataList=e).forEach(function(e,t){i.selectListShipSns.push(e.shipSn)})},showDetail:function(e){this.eventBus.$emit("showOrderDetail",e.shipId,e.shipSn,!0)}},r()(a,"setTable",function(){this.setupTableVisible=!0}),r()(a,"closeSetupTable",function(){this.setupTableVisible=!1}),r()(a,"setColumn",function(e){this.tableColumn=e,this.tablekey=Math.random()}),r()(a,"getSummary",function(e){return Object(h.getSummaries)(e)}),a)}},"Qhr/":function(e,t){},SjYS:function(e,t,i){"use strict";var a=i("seR9"),s=i("msh6");var r=function(e){i("nl9Y")},n=i("VU/8")(a.a,s.a,r,null,null);t.a=n.exports},WE62:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=i("xK1H"),s=i("wLV8"),r=i("VU/8")(a.a,s.a,null,null,null);t.default=r.exports},fyBF:function(e,t,i){"use strict";var a={render:function(){var i=this,e=i.$createElement,a=i._self._c||e;return i.hasCode?a("div",{staticClass:"searchAll_lyy"},[a("el-form-item",{staticClass:"zdycx",attrs:{label:"自定义查询"}},[a("el-select",{attrs:{filterable:"",placeholder:"请选择","filter-method":i.querySearchAsync,"popper-class":"zdycx-pop",loading:i.loading},on:{change:i.handleSelect,focus:i.initdata},model:{value:i.datalist,callback:function(e){i.datalist=e},expression:"datalist"}},i._l(i.options4,function(t,e){return a("el-option",{key:e,attrs:{label:t.queryKey,value:t.id}},[i._v("\r\n        "+i._s(t.queryKey)+" "),a("i",{staticClass:"el-icon-circle-close-outline",on:{click:function(e){e.stopPropagation(),e.preventDefault(),i.deleteItem(t)}}})])})),i._v(" "),a("el-button",{attrs:{plain:""},on:{click:i.Custom}},[i._v("保存自定义")])],1),i._v(" "),a("addSave",{attrs:{code:i.hasCode,searchObj:i.searchObj,popVisible:i.popVisible},on:{close:i.closeAddDot,success:i.fetchAllloadAll}})],1):i._e()},staticRenderFns:[]};t.a=a},msh6:function(e,t,i){"use strict";var a={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-dialog",{staticClass:"wzl_settleLogSave",attrs:{title:t.popTitle,visible:t.isShow,"close-on-click-modal":!1,"before-close":t.closeMe},on:{close:t.closeMe,"update:visible":function(e){t.isShow=e}}},[i("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:t.form,rules:t.rules,"label-width":t.formLabelWidth,inline:!0,"label-position":"right",size:"mini"}},[i("el-form-item",{attrs:{label:"名称：",prop:"queryKey"}},[i("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.form.queryKey,expression:"form.queryKey",modifiers:{trim:!0}}],attrs:{maxlength:20,placeholder:"请定义名称"},domProps:{value:t.form.queryKey},on:{input:function(e){e.target.composing||t.$set(t.form,"queryKey",e.target.value.trim())},blur:function(e){t.$forceUpdate()}}})])],1),t._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{type:"primary",disabled:0===t.form.queryKey.length},on:{click:function(e){t.submitForm("ruleForm")}}},[t._v("确 定")]),t._v(" "),i("el-button",{on:{click:t.closeMe}},[t._v("取 消")])],1)],1)},staticRenderFns:[]};t.a=a},nl9Y:function(e,t){},pWsp:function(e,t,i){"use strict";var a={render:function(){var a=this,e=a.$createElement,s=a._self._c||e;return s("div",{directives:[{name:"loading",rawName:"v-loading",value:a.loading,expression:"loading"}],staticClass:"tab-content miniHeaderSearch"},[s("SearchForm",{attrs:{orgid:a.otherinfo.orgid,btnsize:a.btnsize},on:{change:a.getSearchParam}}),a._v(" "),s("div",{staticClass:"tab_info"},[s("div",{staticClass:"btns_box"},[s("el-button",{directives:[{name:"has",rawName:"v-has:PAY_SHIPSET3",arg:"PAY_SHIPSET3"}],attrs:{type:"primary",size:a.btnsize,icon:"el-icon-sort",plain:""},on:{click:function(e){a.doAction("count")}}},[a._v("核销")]),a._v(" "),s("el-button",{directives:[{name:"has",rawName:"v-has:PAY_SHIPPRI3",arg:"PAY_SHIPPRI3"}],attrs:{type:"primary",size:a.btnsize,icon:"el-icon-printer",plain:""},on:{click:function(e){a.doAction("print")}}},[a._v("打印")]),a._v(" "),s("el-button",{directives:[{name:"has",rawName:"v-has:PAY_SHIPEXP3",arg:"PAY_SHIPEXP3"}],attrs:{type:"primary",size:a.btnsize,icon:"el-icon-download",plain:""},on:{click:function(e){a.doAction("export")}}},[a._v("导出")]),a._v(" "),s("el-button",{staticClass:"table_setup",attrs:{type:"primary",size:a.btnsize,icon:"el-icon-setting",plain:""},on:{click:a.setTable}},[a._v("表格设置")])],1),a._v(" "),s("div",{staticClass:"info_tab"},[s("el-table",{key:a.tablekey,ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:a.dataList,stripe:"",border:"",height:"100%","tooltip-effect":"dark","show-summary":!0,"summary-method":a.getSummary},on:{"row-click":a.clickDetails,"selection-change":a.getSelection,"cell-dblclick":a.showDetail}},[s("el-table-column",{attrs:{fixed:"",sortable:"",type:"selection",width:"80"}}),a._v(" "),a._l(a.tableColumn,function(i){return[i.slot?s("el-table-column",{key:i.id,attrs:{fixed:i.fixed,sortable:"",label:i.label,width:i.width,prop:i.prop},scopedSlots:a._u([{key:"header",fn:function(e){return[s("tableHeaderSearch",{attrs:{scope:e,query:a.searchQuery},on:{change:a.changeKey}})]}},{key:"default",fn:function(t){return[i.click?s("span",{staticClass:"clickitem",domProps:{innerHTML:a._s(i.slot(t))},on:{click:function(e){e.stopPropagation(),i.click(t)}}}):s("span",{domProps:{innerHTML:a._s(i.slot(t))}})]}}])}):s("el-table-column",{key:i.id,attrs:{fixed:i.fixed,sortable:"",label:i.label,prop:i.prop,width:i.width},scopedSlots:a._u([{key:"header",fn:function(e){return[s("tableHeaderSearch",{attrs:{scope:e,query:a.searchQuery},on:{change:a.changeKey}})]}},{key:"default",fn:function(e){return[a._v(a._s(e.row[i.prop]))]}}])})]})],2)],1)]),a._v(" "),s("div",{staticClass:"info_tab_footer"},[a._v("\n    共计:"+a._s(a.total)+"\n    "),s("div",{staticClass:"show_pager"},[s("Pager",{attrs:{total:a.total},on:{change:a.handlePageChange}})],1)]),a._v(" "),s("TableSetup",{attrs:{popVisible:a.setupTableVisible,columns:a.tableColumn},on:{close:a.closeSetupTable,success:a.setColumn}})],1)},staticRenderFns:[]};t.a=a},seR9:function(e,t,i){"use strict";var a=i("mvHQ"),s=i.n(a),r=i("t5DY"),n=i("0xDb");t.a={computed:{isShow:{get:function(){return this.popVisible},set:function(){}}},components:{},props:{popVisible:{type:Boolean,default:!1},dotInfo:[Object,Array],searchQuery:[Object,Array],isDepMain:{type:Boolean,default:!1},createrId:[Number,String],isModify:{type:Boolean,default:!1},isAccept:{type:Boolean,default:!1},proptitle:String,searchObj:{type:[Array,Object],default:function(){}},code:{type:String,default:""}},data:function(){return{form:{userId:"",orgId:"",menuCode:"",queryKey:"",queryContent:""},searchCreatTime:+new Date,pickOption2:"",formLabelWidth:"75px",tooltip:!1,rules:{},queryKey:"",checked1:!0,popTitle:"自定义标签",loading:!1,type:""}},mounted:function(){},watch:{orgid:function(e){this.form.orgid=e},popVisible:function(e){e&&(this.form.userId=this.otherinfo.userId,this.form.orgId=this.otherinfo.orgid,this.form.menuCode=this.code||this.$route.meta.code)}},methods:{reset:function(){this.$refs.ruleForm.resetFields()},closeMe:function(e){this.$emit("close"),this.reset(),"function"==typeof e&&e()},submitForm:function(e){var i=this;this.loading||this.$refs[e].validate(function(e){if(!e)return!1;i.loading=!0,i.form.queryContent=s()(i.searchObj);var t=Object(n.objectMerge2)({},i.form);console.log("addSave_data",t),Object(r.s)(t).then(function(e){i.loading=!1,i.$message({message:"保存成功~",type:"success"}),i.closeMe(),i.$emit("success")}).catch(function(e){i.loading=!1,i.$message.warning(e.text)})})}}}},us2a:function(e,t,i){"use strict";var a=i("t5DY"),s=i("SjYS");t.a={components:{addSave:s.a},props:{searchObj:{type:[Object,Array]},value:[String,Number],code:{type:String,default:""}},data:function(){return{isModify:!1,popVisible:!1,setupTableVisible:!1,dataset:[],datalist:"",timeout:null,loading:!1,options4:[],querySearch:{currentPage:1,pageSize:10,vo:{orgId:"",userId:"",menuCode:""}}}},computed:{hasCode:function(){return this.code||this.$route.meta.code||""}},watch:{value:function(e){""===e&&(this.datalist="")},searchObj:{handler:function(e,t){},deep:!0}},mounted:function(){},methods:{initdata:function(){var t=this;this.inited||(this.inited=!0,this.loading=!0,this.fetchAllloadAll().then(function(e){t.loading=!1}))},deleteItem:function(e){var t=this;Object(a.b)(e.id).then(function(e){t.fetchAllloadAll(),t.datalist&&(t.datalist="")}).catch(function(e){t._handlerCatchMsg(e)})},Custom:function(){this.isModify=!0,this.popVisible=!0},closeAddDot:function(){this.popVisible=!1},fetchAllloadAll:function(){var t=this;return this.querySearch.vo.orgId=this.otherinfo.orgid,this.querySearch.vo.userId=this.otherinfo.userId,this.querySearch.vo.menuCode=this.code||this.$route.meta.code,Object(a.r)(this.querySearch).then(function(e){t.dataset=e.list||[],t.options4=e.list||[]})},querySearchAsync:function(e,t){var i=this.dataset,a=e?i.filter(this.createStateFilter(e)):i;t(this.options4=a)},createStateFilter:function(t){return function(e){return 0===e.queryKey.toLowerCase().indexOf(t.toLowerCase())}},handleSelect:function(t){var e=this.options4.filter(function(e){return e.id===t});if(e.length){var i=e[0].queryContent,a=JSON.parse(i);this.$emit("change",JSON.parse(i.replace(/'/g,'"'))),this.$emit("dataObj",a)}}}}},wLV8:function(e,t,i){"use strict";var a={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-form",{ref:"searchForm",staticClass:"staff_searchinfo clearfix",attrs:{inline:!0,size:t.btnsize,"label-position":"right",rules:t.rules,model:t.searchForm,"label-width":"70px"}},[i("div",{staticClass:"staff_searchinfo--input"},[i("el-form-item",{attrs:{label:"开单时间"}},[i("el-date-picker",{attrs:{"default-value":t.defaultTime,type:"daterange","unlink-panels":"",align:"right","value-format":"yyyy-MM-dd HH:mm:ss","start-placeholder":"开始日期","picker-options":t.pickerOptions,"end-placeholder":"结束日期"},model:{value:t.searchTime,callback:function(e){t.searchTime=e},expression:"searchTime"}})],1),t._v(" "),t.isTerminal?i("el-form-item",{attrs:{label:"送货时间"}},[i("el-date-picker",{attrs:{"default-value":t.defaultTime,type:"daterange","unlink-panels":"",align:"right","value-format":"yyyy-MM-dd HH:mm:ss","start-placeholder":"开始日期","picker-options":t.pickerOptions,"end-placeholder":"结束日期"},model:{value:t.searchSendTime,callback:function(e){t.searchSendTime=e},expression:"searchSendTime"}})],1):i("el-form-item",{attrs:{label:"开单网点",prop:"shipFromOrgid"}},[t.isTransferSel||t.isAbnormal?i("SelectTree",{model:{value:t.searchForm.shipFromOrgid,callback:function(e){t.$set(t.searchForm,"shipFromOrgid",e)},expression:"searchForm.shipFromOrgid"}}):i("SelectTree",{attrs:{orgid:t.otherinfo.orgid},model:{value:t.searchForm.shipFromOrgid,callback:function(e){t.$set(t.searchForm,"shipFromOrgid",e)},expression:"searchForm.shipFromOrgid"}})],1),t._v(" "),t.isTransferSel&&!t.isTerminal?i("el-form-item",{attrs:{label:"中转网点",prop:"transferOrgid"}},[i("SelectTree",{attrs:{orgid:t.otherinfo.orgid},model:{value:t.searchForm.transferOrgid,callback:function(e){t.$set(t.searchForm,"transferOrgid",e)},expression:"searchForm.transferOrgid"}})],1):t._e(),t._v(" "),t.isAbnormal&&!t.isTerminal?i("el-form-item",{attrs:{label:"核销网点",prop:"orgid"}},[i("SelectTree",{attrs:{orgid:t.otherinfo.orgid},model:{value:t.searchForm.orgid,callback:function(e){t.$set(t.searchForm,"orgid",e)},expression:"searchForm.orgid"}})],1):t._e(),t._v(" "),i("el-form-item",{attrs:{label:"核销状态",prop:"status"}},[i("el-select",{attrs:{placeholder:"核销状态"},model:{value:t.searchForm.status,callback:function(e){t.$set(t.searchForm,"status",e)},expression:"searchForm.status"}},t._l(t.$const.COUNT_STATUS,function(e,t){return i("el-option",{key:t,attrs:{value:t,label:e}})}))],1),t._v(" "),i("el-form-item",{attrs:{label:"运单号",prop:"shipSn"}},[i("el-input",{attrs:{maxlength:t.isTerminal?25:15,clearable:""},nativeOn:{keyup:function(e){t.validates("shipSn")}},model:{value:t.searchForm.shipSn,callback:function(e){t.$set(t.searchForm,"shipSn",e)},expression:"searchForm.shipSn"}})],1),t._v(" "),t.isTerminal?i("el-form-item",{attrs:{label:"货号",prop:"shipGoodsSn"}},[i("el-input",{attrs:{maxlength:t.isTerminal?25:15,clearable:""},nativeOn:{keyup:function(e){t.validates("shipGoodsSn")}},model:{value:t.searchForm.shipGoodsSn,callback:function(e){t.$set(t.searchForm,"shipGoodsSn",e)},expression:"searchForm.shipGoodsSn"}})],1):t._e(),t._v(" "),t.isTerminal?t._e():i("el-form-item",{attrs:{label:"发货方",prop:"senderUnit"}},[i("el-input",{attrs:{clearable:"",maxlength:t.maxlength},model:{value:t.searchForm.senderUnit,callback:function(e){t.$set(t.searchForm,"senderUnit",e)},expression:"searchForm.senderUnit"}})],1),t._v(" "),t.isTerminal?t._e():i("el-form-item",{attrs:{label:"发货人",prop:"senderName"}},[i("el-input",{attrs:{clearable:"",maxlength:t.maxlength},model:{value:t.searchForm.senderName,callback:function(e){t.$set(t.searchForm,"senderName",e)},expression:"searchForm.senderName"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"发站"}},[i("el-input",{attrs:{clearable:"",maxlength:t.isTerminal?15:t.maxlength},model:{value:t.searchForm.shipFromCityName,callback:function(e){t.$set(t.searchForm,"shipFromCityName",e)},expression:"searchForm.shipFromCityName"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"到站"}},[i("el-input",{attrs:{clearable:"",maxlength:t.isTerminal?15:t.maxlength},model:{value:t.searchForm.shipToCityName,callback:function(e){t.$set(t.searchForm,"shipToCityName",e)},expression:"searchForm.shipToCityName"}})],1),t._v(" "),t.isTerminal?t._e():i("el-form-item",{attrs:{label:"签收状态",prop:"signStatus"}},[i("selectType",{attrs:{type:"sign_status"},model:{value:t.searchForm.signStatus,callback:function(e){t.$set(t.searchForm,"signStatus",e)},expression:"searchForm.signStatus"}},[i("el-option",{attrs:{slot:"head",label:"全部",value:""},slot:"head"})],1)],1),t._v(" "),i("searchAll",{attrs:{searchObj:t.searchObjs},on:{dataObj:t.getDataObj},model:{value:t.searchAll,callback:function(e){t.searchAll=e},expression:"searchAll"}})],1),t._v(" "),i("el-form-item",{staticClass:"staff_searchinfo--btn"},[i("el-button",{attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v("查询")]),t._v(" "),i("el-button",{attrs:{type:"info",plain:""},on:{click:function(e){t.clearForm("searchForm")}}},[t._v("清空")])],1)],1)},staticRenderFns:[]};t.a=a},xK1H:function(e,t,i){"use strict";var a=i("woOf"),s=i.n(a),r=(i("E4LH"),i("o9X6")),n=i("pAQG"),o=i("0xDb"),l=i("8UOW"),c=i("9UCZ");t.a={components:{SelectTree:r.a,querySelect:n.a,searchAll:l.a,SelectType:c.a},props:{btnsize:{type:String,default:"mini"},orgid:{type:Number},isTransferSel:{type:Boolean,default:!1},isAbnormal:{type:Boolean,default:!1},isTerminal:{type:Boolean,default:!1}},data:function(){return{searchAll:"1",maxlength:25,searchObjs:{},searchForm:{shipFromOrgid:"",orgid:"",signStatus:"",shipSn:"",shipGoodsSn:"",status:""},rules:{},searchTime:[Object(o.parseTime)(new Date-5184e6),Object(o.parseTime)(new Date)],searchSendTime:"",defaultTime:[+new Date-5184e6,+new Date],pickerOptions:{shortcuts:o.pickerOptions2}}},watch:{orgid:function(e){this.searchForm.orgid=e},searchTime:function(e){e&&(this.$set(this.searchObjs,"startTime",Object(o.parseTime)(this.searchTime[0],"{y}-{m}-{d} ")+"00:00:00"),this.$set(this.searchObjs,"endTime",Object(o.parseTime)(this.searchTime[1],"{y}-{m}-{d} ")+"23:59:59"))},searchForm:{handler:function(e,t){this.searchObjs=s()({},e),this.searchTime&&(this.$set(this.searchObjs,"startTime",Object(o.parseTime)(this.searchTime[0],"{y}-{m}-{d} ")+"00:00:00"),this.$set(this.searchObjs,"endTime",Object(o.parseTime)(this.searchTime[1],"{y}-{m}-{d} ")+"23:59:59"))},deep:!0}},mounted:function(){this.isTransferSel&&(this.searchForm.transferOrgid=this.orgid),this.isAbnormal&&(this.searchForm.orgid=this.orgid),this.searchForm.shipFromOrgid=this.orgid,this.onSubmit()},methods:{validates:function(e){this.$set(this.searchForm,e,this.searchForm[e].replace(/[^\d|a-zA-Z|\-]/g,""))},getDataObj:function(e){this.searchTime=[e.startTime,e.endTime],this.searchForm=s()({},e),this.$emit("change",e)},onSubmit:function(){var e=s()({},this.searchForm);this.searchTime&&(this.$set(e,"startTime",Object(o.parseTime)(this.searchTime[0],"{y}-{m}-{d} ")+"00:00:00"),this.$set(e,"endTime",Object(o.parseTime)(this.searchTime[1],"{y}-{m}-{d} ")+"23:59:59")),this.searchSendTime&&this.isTerminal&&(this.$set(e,"deliveryStartTime",Object(o.parseTime)(this.searchSendTime[0],"{y}-{m}-{d} ")+"00:00:00"),this.$set(e,"deliveryEndTime",Object(o.parseTime)(this.searchSendTime[1],"{y}-{m}-{d} ")+"23:59:59")),this.$emit("change",e)},clearForm:function(e){var t=this;this.$nextTick(function(){s()(t.$data,t.$options.data()),t.$refs[e].resetFields(),t.searchForm.shipFromOrgid=t.orgid,t.searchAll="1",setTimeout(function(){t.searchAll=""},50)})}}}}});