webpackJsonp([136,210,347],{"/n+A":function(e,t,i){"use strict";var a={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"popRight-center",class:{showPopRight:e.isShow},style:{zIndex:e.zIndex}},[i("div",{staticClass:"popRight-header"},[e._t("title",[e._v(e._s(e.title))]),e._v(" "),i("i",{staticClass:"el-icon-close",attrs:{title:"关闭"},on:{click:e.close}})],2),e._v(" "),e.shouldRender?i("div",{staticClass:"popRight-content"},[e._t("content",[e._v("内容")])],2):e._e(),e._v(" "),i("div",{staticClass:"popRight-footer"},[e._t("footer",[e._v("底部")])],2)])},staticRenderFns:[]};t.a=a},"34lJ":function(e,t,i){"use strict";var a=i("Dd8w"),r=i.n(a),s=i("qs7E"),o=i("Xf+J"),n=i("NYxO"),l=i("1onU"),c=i("0xDb"),p=i("UQm2"),d=i("qazg");t.a={components:{SearchForm:s.default,Pager:l.a,AddMark:d.default},computed:r()({},Object(n.mapGetters)(["otherinfo"]),{orgid:function(){}}),mounted:function(){},data:function(){var t=this;return{btnsize:"mini",component:"Send",selectInfo:{},selected:[],dataset:[],dotInfo:[],loading:!0,setupTableVisible:!1,popVisible:!1,isGrant:!1,tablekey:0,total:0,searchQuery:{currentPage:1,pageSize:100,vo:{pageType:4,receiptIds:[],giveoutStatus:111}},tableColumn:[{label:"序号",prop:"number",width:"60",fixed:!0,slot:function(e){return(t.searchQuery.currentPage-1)*t.searchQuery.pageSize+e.$index+1}},{label:"运单号",prop:"shipSn",width:"120",fixed:!0},{label:"开单网点",prop:"fromOrgName",width:"120",fixed:!1},{label:"目的网点",prop:"toOrgName",width:"120",fixed:!1},{label:"开单日期",prop:"createTime",width:"165",slot:function(e){return""+Object(c.parseTime)(e.row.createTime,"{y}-{m}-{d} {h}:{i}:{s}")},fixed:!1},{label:"发站",prop:"shipFromCityName",width:"120",fixed:!1},{label:"到站",prop:"shipToCityName",width:"120",fixed:!1},{label:"发放状态",prop:"giveoutStatusName",width:"120",fixed:!1},{label:"发放日期",prop:"giveoutTime",width:"165",slot:function(e){return""+Object(c.parseTime)(e.row.giveoutTime,"{y}-{m}-{d} {h}:{i}:{s}")},fixed:!1},{label:"回单状态",prop:"backStatusName",width:"120",fixed:!1},{label:"回单类型",prop:"shipReceiptRequireName",width:"120",fixed:!1},{label:"回单数量",prop:"shipReceiptNum",width:"120",fixed:!1},{label:"发货人",prop:"sendName",width:"120",fixed:!1},{label:"收货人",prop:"recName",width:"120",fixed:!1},{label:"货品名",prop:"cargoName",width:"90",fixed:!1},{label:"件数",prop:"cargoAmount",width:"80",fixed:!1},{label:"重量",prop:"cargoWeight",width:"80",fixed:!1},{label:"体积",prop:"cargoVolume",width:"80",fixed:!1},{label:"付款方式",prop:"shipPayWayName",width:"120",fixed:!1},{label:"现付",prop:"shipNowpayFee",width:"80",fixed:!1},{label:"到付",prop:"shipArrivepayFee",width:"80",fixed:!1},{label:"回单付",prop:"shipReceiptpayFee",width:"90",fixed:!1},{label:"月结",prop:"shipMonthpayFee",width:"80",fixed:!1},{label:"中转承运商",prop:"carrierName",width:"120",fixed:!1},{label:"中转日期",prop:"transferTime",width:"180",slot:function(e){return""+Object(c.parseTime)(e.row.transferTime,"{y}-{m}-{d} {h}:{i}:{s}")},fixed:!1},{label:"中转单号",prop:"oddNumbers",width:"120",fixed:!1},{label:"发货人电话",prop:"sendMobile",width:"120",fixed:!1},{label:"发货地址",prop:"sendAddress",width:"120",fixed:!1},{label:"收货人电话",prop:"recMobile",width:"120",fixed:!1},{label:"收货地址",prop:"recAddress",width:"120",fixed:!1},{label:"到达省",prop:"endProvince",width:"120",fixed:!1},{label:"到达市",prop:"endCity",width:"120",fixed:!1},{label:"到达县",prop:"endArea",width:"120",fixed:!1}]}},methods:{changeKey:function(e){this.total=0,this.searchQuery=e,this.loading||this.fetchAllreceipt()},getSumLeft:function(e,t){return Object(c.getSummaries)(e,c.operationPropertyCalc)},fetchAllreceipt:function(){var t=this;return this.loading=!0,Object(o.c)(this.searchQuery).then(function(e){t.dataset=e.list,t.total=e.total,t.loading=!1}).catch(function(e){t.loading=!1,t._handlerCatchMsg(e)})},fetchData:function(){this.fetchAllreceipt()},handlePageChange:function(e){this.searchQuery.currentPage=e.pageNum,this.searchQuery.pageSize=e.pageSize,this.fetchAllreceipt()},getSearchParam:function(e){this.searchQuery.currentPage=this.$options.data().searchQuery.currentPage,this.searchQuery.pageSize=this.$options.data().searchQuery.pageSize,Object(c.objectMerge2)(this.searchQuery.vo,e),this.fetchAllreceipt()},doAction:function(e){if("import"===e)return this.showImport(),!1;if(!this.selected.length&&"print"!==e&&"export"!==e)return this.$message({message:"请选择要操作的项~",type:"warning"}),!1;switch(e){case"export":var t=Object(c.objectMerge2)([],this.dataset),i=Object(c.objectMerge2)([],this.selected);Object(p.g)({data:i.length?i:t,columns:this.tableColumn,name:"回单发放"});break;case"print":var a=Object(c.objectMerge2)([],this.dataset),r=Object(c.objectMerge2)([],this.selected);Object(p.d)({data:r.length?r:a,columns:this.tableColumn,name:"回单发放"});break;case"grant":var s=this.selected.filter(function(e){return 111===e.giveoutStatus}).map(function(e){return e.receiptId});s.length?(this.searchQuery.vo.receiptIds=s,this.dotInfo=s,this.popVisible=!0,this.isGrant=!0,this.searchQuery.vo.receiptIds=s):this.$message.warning("请选择未发放项~")}this.$refs.multipleTable.clearSelection()},setTable:function(){this.setupTableVisible=!0},closeAddDot:function(){this.popVisible=!1},setColumn:function(e){this.tableColumn=e,this.tablekey=Math.random()},closeSetupTable:function(){this.setupTableVisible=!1},clickDetails:function(e,t,i){this.$refs.multipleTable.toggleRowSelection(e)},getSelection:function(e){this.selected=e}}}},"3EPC":function(e,t,i){"use strict";var a=i("qYK6"),r=i("/n+A");var s=function(e){i("f3wf")},o=i("VU/8")(a.a,r.a,s,null,null);t.a=o.exports},LE6s:function(e,t){},LKdI:function(e,t,i){"use strict";var a={render:function(){var a=this,e=a.$createElement,r=a._self._c||e;return r("div",{directives:[{name:"loading",rawName:"v-loading",value:a.loading,expression:"loading"}],staticClass:"tab-content miniHeaderSearch",on:{success:a.fetchAllreceipt}},[r("SearchForm",{attrs:{orgid:a.otherinfo.orgid,title:"发放",type:"giveout_status",status:"giveoutStatus",btnsize:a.btnsize},on:{change:a.getSearchParam}}),a._v(" "),r("div",{staticClass:"tab_info"},[r("div",{staticClass:"btns_box"},[r("el-button",{directives:[{name:"has",rawName:"v-has:RECE_SENSUCCESS",arg:"RECE_SENSUCCESS"}],attrs:{type:"primary",size:a.btnsize,icon:"el-icon-goods",plain:""},on:{click:function(e){a.doAction("grant")}}},[a._v("回单发放")]),a._v(" "),r("el-button",{directives:[{name:"has",rawName:"v-has:RECE_EXP4",arg:"RECE_EXP4"}],attrs:{type:"primary",size:a.btnsize,icon:"el-icon-upload2",plain:""},on:{click:function(e){a.doAction("export")}}},[a._v("导出")]),a._v(" "),r("el-button",{directives:[{name:"has",rawName:"v-has:RECE_PRI4",arg:"RECE_PRI4"}],attrs:{type:"primary",size:a.btnsize,icon:"el-icon-printer",plain:""},on:{click:function(e){a.doAction("print")}}},[a._v("打印")]),a._v(" "),r("el-button",{staticClass:"table_setup",attrs:{type:"primary",size:a.btnsize,icon:"el-icon-setting",plain:""},on:{click:a.setTable}},[a._v("表格设置")])],1),a._v(" "),r("div",{staticClass:"info_tab"},[r("el-table",{key:a.tablekey,ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:a.dataset,border:"",height:"100%","tooltip-effect":"dark","summary-method":a.getSumLeft,"show-summary":"","default-sort":{prop:"id",order:"ascending"},stripe:""},on:{"row-click":a.clickDetails,"selection-change":a.getSelection}},[r("el-table-column",{attrs:{fixed:"",sortable:"",type:"selection",width:"70"}}),a._v(" "),a._l(a.tableColumn,function(i){return[i.slot?r("el-table-column",{key:i.id,attrs:{fixed:i.fixed,sortable:"",label:i.label,prop:i.prop,width:i.width},scopedSlots:a._u([{key:"header",fn:function(e){return[r("tableHeaderSearch",{attrs:{scope:e,query:a.searchQuery},on:{change:a.changeKey}})]}},{key:"default",fn:function(t){return[i.click?r("span",{staticClass:"clickitem",domProps:{innerHTML:a._s(i.slot(t))},on:{click:function(e){e.stopPropagation(),i.click(t)}}}):r("span",{domProps:{innerHTML:a._s(i.slot(t))}})]}}])}):r("el-table-column",{key:i.id,attrs:{fixed:i.fixed,sortable:"",label:i.label,prop:i.prop,width:i.width},scopedSlots:a._u([{key:"header",fn:function(e){return[r("tableHeaderSearch",{attrs:{scope:e,query:a.searchQuery},on:{change:a.changeKey}})]}},{key:"default",fn:function(e){return[a._v(a._s(e.row[i.prop]))]}}])})]})],2)],1)]),a._v(" "),r("div",{staticClass:"info_tab_footer"},[a._v("共计:"+a._s(a.total)+" "),r("div",{staticClass:"show_pager"},[r("Pager",{attrs:{total:a.total},on:{change:a.handlePageChange}})],1)]),a._v(" "),r("AddMark",{attrs:{popVisible:a.popVisible,issender:!0,dotInfo:a.dotInfo,searchQuery:a.searchQuery,isGrant:a.isGrant},on:{close:a.closeAddDot,success:a.fetchAllreceipt}}),a._v(" "),r("TableSetup",{attrs:{popVisible:a.setupTableVisible,columns:a.tableColumn,code:"RECEIPT4"},on:{close:a.closeSetupTable,success:a.setColumn}})],1)},staticRenderFns:[]};t.a=a},NTyV:function(e,t,i){"use strict";var a={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-dialog",{staticClass:"wzl_addReceiptPop",attrs:{title:t.popTitle,visible:t.isShow,"close-on-click-modal":!1,"before-close":t.closeMe},on:{close:t.closeMe,"update:visible":function(e){t.isShow=e}}},[i("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:t.form,rules:t.rules,"label-width":t.formLabelWidth,inline:!0,"label-position":"right",size:"mini"}},[t.isModify?i("div",{staticClass:"addMark"},[i("el-form-item",{attrs:{label:"回收情况",prop:"recTypeId",cols:45}},[i("SelectType",{attrs:{type:"rec_type"},model:{value:t.form.recTypeId,callback:function(e){t.$set(t.form,"recTypeId",e)},expression:"form.recTypeId"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"回收日期:",prop:"recTime"}},[i("el-date-picker",{attrs:{align:"right",type:"date","picker-options":t.pickOption2,placeholder:"选择日期","value-format":"timestamp"},model:{value:t.searchCreatTime,callback:function(e){t.searchCreatTime=e},expression:"searchCreatTime"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"回收备注","label-width":t.formLabelWidth,prop:"recRemark"}},[i("el-input",{attrs:{type:"textarea",rows:7,cols:30,maxlength:200,placeholder:"最多200个字符","auto-complete":"off"},model:{value:t.form.recRemark,callback:function(e){t.$set(t.form,"recRemark",e)},expression:"form.recRemark"}})],1)],1):t._e(),t._v(" "),t.isAccept?i("div",{staticClass:"addMark"},[i("el-form-item",{attrs:{label:"接收情况",prop:"acceptTypeId",cols:45}},[i("SelectType",{attrs:{type:"accept_type"},model:{value:t.form.acceptTypeId,callback:function(e){t.$set(t.form,"acceptTypeId",e)},expression:"form.acceptTypeId"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"接收日期:",prop:"recTime"}},[i("el-date-picker",{attrs:{align:"right",type:"date","picker-options":t.pickOption2,placeholder:"选择日期","value-format":"timestamp"},model:{value:t.searchCreatTime,callback:function(e){t.searchCreatTime=e},expression:"searchCreatTime"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"接收备注","label-width":t.formLabelWidth,prop:"acceptRemark"}},[i("el-input",{attrs:{maxlength:200,type:"textarea",rows:7,cols:30,placeholder:"最多200个字符","auto-complete":"off"},model:{value:t.form.acceptRemark,callback:function(e){t.$set(t.form,"acceptRemark",e)},expression:"form.acceptRemark"}})],1)],1):t._e(),t._v(" "),t.isSend?i("div",{staticClass:"addMark"},[i("el-form-item",{attrs:{label:"寄出日期:",prop:"sendTime"}},[i("el-date-picker",{attrs:{align:"right",type:"date","picker-options":t.pickOption2,placeholder:"选择日期","value-format":"timestamp"},model:{value:t.searchCreatTime,callback:function(e){t.searchCreatTime=e},expression:"searchCreatTime"}})],1)],1):t._e(),t._v(" "),t.isGrant?i("div",{staticClass:"addMark"},[i("el-form-item",{attrs:{label:"发放日期:",prop:"giveoutTime"}},[i("el-date-picker",{attrs:{align:"right",type:"date","picker-options":t.pickOption2,placeholder:"选择日期","value-format":"timestamp"},model:{value:t.searchCreatTime,callback:function(e){t.searchCreatTime=e},expression:"searchCreatTime"}})],1)],1):t._e()]),t._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{type:"primary"},on:{click:function(e){t.submitForm("ruleForm")}}},[t._v("确 定")]),t._v(" "),i("el-button",{on:{click:t.closeMe}},[t._v("取 消")])],1)],1)},staticRenderFns:[]};t.a=a},"R/Zi":function(e,t,i){"use strict";var a=i("3EPC"),r=i("o9X6"),s=i("9UCZ"),o=i("Xf+J"),n=i("0xDb");t.a={computed:{isShow:{get:function(){return this.popVisible},set:function(){}}},components:{PopFrame:a.a,SelectTree:r.a,SelectType:s.a},props:{popVisible:{type:Boolean,default:!1},dotInfo:[Object,Array],searchQuery:[Object,Array],isDepMain:{type:Boolean,default:!1},createrId:[Number,String],isModify:{type:Boolean,default:!1},isAccept:{type:Boolean,default:!1},isSend:{type:Boolean,default:!1},isGrant:{type:Boolean,default:!1},info:{type:Object,default:function(){}}},data:function(){return{form:{pageType:"",recTypeId:113,recRemark:"",acceptTypeId:115,acceptRemark:""},formLabelWidth:"75px",tooltip:!1,pickOption2:"",searchCreatTime:+new Date,rules:{},checked1:!0,popTitle:"",loading:!1,type:""}},mounted:function(){console.log(this.info)},watch:{isDepMain:function(){},dotInfo:function(e){this.getMentInfo=this.dotInfo,console.log(this.dotInfo)},searchQuery:function(e){this.form.pageType=this.searchQuery.vo.pageType},orgid:function(e){this.form.orgid=e},isModify:{handler:function(e){this.isModify&&(this.popTitle="回单回收",this.form.pageType=this.searchQuery.vo.pageType,this.$set(this.form,"recTime",Object(n.parseTime)(this.searchCreatTime,"{y}-{m}-{d} {h}:{i}:{s}")))},immediate:!0},isAccept:{handler:function(e){this.isAccept&&(this.popTitle="回单接收",this.form.pageType=this.searchQuery.vo.pageType)},immediate:!0},isSend:{handler:function(e){this.isSend&&(this.popTitle="回单寄出",this.form.pageType=this.searchQuery.vo.pageType)},immediate:!0},isGrant:{handler:function(e){this.isGrant&&(this.popTitle="回单发放",this.form.pageType=this.searchQuery.vo.pageType)},immediate:!0},createrId:function(e){}},methods:{reset:function(){this.$refs.ruleForm.resetFields()},closeMe:function(e){this.$emit("close"),this.reset(),"function"==typeof e&&e()},submitForm:function(e){var i=this;this.$refs[e].validate(function(e){if(!e)return!1;i.loading=!0,i.isModify?i.$set(i.form,"recTime",Object(n.parseTime)(i.searchCreatTime,"{y}-{m}-{d} {h}:{i}:{s}")):i.isAccept?i.$set(i.form,"acceptTime",Object(n.parseTime)(i.searchCreatTime,"{y}-{m}-{d} {h}:{i}:{s}")):i.isSend?i.$set(i.form,"sendTime",Object(n.parseTime)(i.searchCreatTime,"{y}-{m}-{d} {h}:{i}:{s}")):i.isGrant&&i.$set(i.form,"acceptTime",Object(n.parseTime)(i.searchCreatTime,"{y}-{m}-{d} {h}:{i}:{s}"));var t=Object(n.objectMerge2)({},i.form);t.receiptIds=i.dotInfo,Object(o.e)(t).then(function(e){i.$message({message:"保存成功~",type:"success"}),i.closeMe(),i.$emit("success")}).catch(function(e){i._handlerCatchMsg(e),i.closeMe()})})}}}},f3wf:function(e,t){},"j/99":function(e,t,i){"use strict";var a=i("woOf"),r=i.n(a),s=i("E4LH"),o=i("o9X6"),n=i("9UCZ"),l=i("66wn"),c=i("0xDb");t.a={components:{SelectTree:o.a,SelectCity:l.a,SelectType:n.a},props:{btnsize:{type:String,default:"mini"},orgid:{type:Number},component:{type:String,default:""},type:String,title:String,status:String,issender:{type:Boolean,dafault:!1}},computed:{},data:function(){return{searchCreatTime:[],defaultTime:[Object(c.parseTime)(+new Date-5184e6,"{y}-{m}-{d}"),Object(c.parseTime)(new Date,"{y}-{m}-{d}")],thestatus:"",searchForm:{shipFromOrgid:"",shipSn:"",shipFromCityCode:"",shipFromCityName:"",shipToCityCode:"",shipToCityName:"",shipSenderId:"",recName:""},rules:{shipSn:[{required:!0,trigger:"blur",validator:function(e,t,i){""!==t&&null!==t&&t&&void 0!==t?s.a.ONLY_NUMBER_AND_LETTER.test(t)?i():i(new Error("只能输字母和数字")):i(new Error("请输入运单号"))}}]},pickerOptions2:{shortcuts:c.pickerOptions2}}},watch:{orgid:function(e){this.searchForm.orgid=e},component:{handler:function(e,t){},deep:!0},type:{handler:function(e){console.log(e),"rec_status"===e&&(this.thestatus=105),"accept_status"===e&&(this.thestatus=109),"send_status"===e&&(this.thestatus=107),"giveout_status"===e&&(this.thestatus=111)},immediate:!0}},mounted:function(){this.searchCreatTime=this.defaultTime,this.onSubmit()},methods:{getOrgid:function(e){this.searchForm.orgid=e},onSubmit:function(){this.searchForm.startTime=this.searchCreatTime?Object(c.parseTime)(this.searchCreatTime[0],"{y}-{m}-{d} ")+"00:00:00":"",this.searchForm.endTime=this.searchCreatTime?Object(c.parseTime)(this.searchCreatTime[1],"{y}-{m}-{d} ")+"23:59:59":"";var e=r()({},this.searchForm);e[this.status]=this.thestatus,this.$emit("change",e)},clearForm:function(){this.searchForm.shipSn="",this.searchForm.recName="",this.searchForm.sendName="",this.searchCreatTime=this.$options.data().searchCreatTime,this.searchForm.shipFromCityName="",this.searchForm.shipToCityName="",this.thestatus="",this.searchCreatTime=this.defaultTime}}}},qVAb:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=i("34lJ"),r=i("LKdI"),s=i("VU/8")(a.a,r.a,null,null,null);t.default=s.exports},qYK6:function(e,t,i){"use strict";t.a={props:{width:{type:String,default:"400"},title:{type:String,default:"标题"},isShow:{type:Boolean,default:!1}},watch:{isShow:{handler:function(){this.isShow&&(this.shouldRender=!0)},immediate:!0}},data:function(){return{zIndex:(window.tmsPopZindex?window.tmsPopZindex+=1:window.tmsPopZindex=1e3,window.tmsPopZindex),shouldRender:!1}},methods:{close:function(){this.$emit("close")}}}},qazg:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=i("R/Zi"),r=i("NTyV");var s=function(e){i("LE6s")},o=i("VU/8")(a.a,r.a,s,null,null);t.default=o.exports},qs7E:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=i("j/99"),r=i("rkFF"),s=i("VU/8")(a.a,r.a,null,null,null);t.default=s.exports},rkFF:function(e,t,i){"use strict";var a={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-form",{staticClass:"staff_searchinfo clearfix",attrs:{inline:!0,size:t.btnsize,"label-position":"right",rules:t.rules,model:t.searchForm,"label-width":"70px"}},[i("div",{staticClass:"staff_searchinfo--input"},[i("el-form-item",{attrs:{label:"开单时间"}},[i("div",{staticClass:"block"},[i("el-date-picker",{attrs:{"default-value":t.defaultTime,type:"daterange","unlink-panels":"",align:"right","value-format":"yyyy-MM-dd","start-placeholder":"开始日期","picker-options":t.pickerOptions2,"end-placeholder":"结束日期"},model:{value:t.searchCreatTime,callback:function(e){t.searchCreatTime=e},expression:"searchCreatTime"}})],1)]),t._v(" "),i("el-form-item",{attrs:{label:t.title+"状态",prop:"recStatus"}},[i("selectType",{attrs:{type:t.type},model:{value:t.thestatus,callback:function(e){t.thestatus=e},expression:"thestatus"}},["accept"!==t.component?i("el-option",{attrs:{slot:"head",label:"全部",value:""},slot:"head"}):t._e()],1)],1),t._v(" "),i("el-form-item",{attrs:{label:"运单号"}},[i("el-input",{attrs:{maxlength:20,"auto-complete":"off",clearable:""},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.onSubmit(e):null}},model:{value:t.searchForm.shipSn,callback:function(e){t.$set(t.searchForm,"shipSn",e)},expression:"searchForm.shipSn"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"发站"}},[i("el-input",{attrs:{maxlength:20,"auto-complete":"off",clearable:""},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.onSubmit(e):null}},model:{value:t.searchForm.shipFromCityName,callback:function(e){t.$set(t.searchForm,"shipFromCityName",e)},expression:"searchForm.shipFromCityName"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"到站"}},[i("el-input",{attrs:{maxlength:20,"auto-complete":"off",clearable:""},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.onSubmit(e):null}},model:{value:t.searchForm.shipToCityName,callback:function(e){t.$set(t.searchForm,"shipToCityName",e)},expression:"searchForm.shipToCityName"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"发货人"}},[i("el-input",{attrs:{maxlength:15,clearable:"","auto-complete":"off"},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.onSubmit(e):null}},model:{value:t.searchForm.sendName,callback:function(e){t.$set(t.searchForm,"sendName",e)},expression:"searchForm.sendName"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"收货人"}},[i("el-input",{attrs:{maxlength:15,clearable:"","auto-complete":"off"},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.onSubmit(e):null}},model:{value:t.searchForm.recName,callback:function(e){t.$set(t.searchForm,"recName",e)},expression:"searchForm.recName"}})],1)],1),t._v(" "),i("el-form-item",{staticClass:"staff_searchinfo--btn"},[i("el-button",{attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v("查询")]),t._v(" "),i("el-button",{attrs:{type:"info",plain:""},on:{click:t.clearForm}},[t._v("清空")])],1)],1)},staticRenderFns:[]};t.a=a}});