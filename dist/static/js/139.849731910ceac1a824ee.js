webpackJsonp([139,219,338],{"1/wR":function(e,t){},"39bf":function(e,t,i){"use strict";var a={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"popRight-center",class:{showPopRight:e.isShow},style:{zIndex:e.zIndex}},[i("div",{staticClass:"popRight-header"},[e._t("title",[e._v(e._s(e.title))]),e._v(" "),i("i",{staticClass:"el-icon-close",attrs:{title:"关闭"},on:{click:e.close}})],2),e._v(" "),e.shouldRender?i("div",{staticClass:"popRight-content"},[e._t("content",[e._v("内容")])],2):e._e(),e._v(" "),i("div",{staticClass:"popRight-footer"},[e._t("footer",[e._v("底部")])],2)])},staticRenderFns:[]};t.a=a},"3EPC":function(e,t,i){"use strict";var a=i("qYK6"),s=i("39bf");var r=function(e){i("sZBQ")},o=i("VU/8")(a.a,s.a,r,null,null);t.a=o.exports},BhKJ:function(e,t,i){"use strict";var a={render:function(){var a=this,e=a.$createElement,s=a._self._c||e;return s("div",{directives:[{name:"loading",rawName:"v-loading",value:a.loading,expression:"loading"}],staticClass:"tab-content",on:{success:a.fetchAllreceipt}},[s("SearchForm",{attrs:{orgid:a.otherinfo.orgid,type:"rec_status",title:"回收",status:"recStatus",issender:!0,btnsize:a.btnsize},on:{change:a.getSearchParam}}),a._v(" "),s("div",{staticClass:"tab_info"},[s("div",{staticClass:"btns_box"},[s("el-button",{directives:[{name:"has",rawName:"v-has:RECE_BACK",arg:"RECE_BACK"}],attrs:{type:"primary",size:a.btnsize,icon:"el-icon-sort-down",plain:""},on:{click:function(e){a.doAction("recycle")}}},[a._v("回单回收")]),a._v(" "),s("el-button",{directives:[{name:"has",rawName:"v-has:RECE_CANCEL",arg:"RECE_CANCEL"}],attrs:{type:"primary",size:a.btnsize,icon:"el-icon-remove-outline",plain:""},on:{click:function(e){a.doAction("cancel")}}},[a._v("取消回收")]),a._v(" "),s("el-button",{directives:[{name:"has",rawName:"v-has:RECE_EXP",arg:"RECE_EXP"}],attrs:{type:"primary",size:a.btnsize,icon:"el-icon-upload2",plain:""},on:{click:function(e){a.doAction("export")}}},[a._v("导出")]),a._v(" "),s("el-button",{directives:[{name:"has",rawName:"v-has:RECE_PRI",arg:"RECE_PRI"}],attrs:{type:"primary",size:a.btnsize,icon:"el-icon-printer",plain:""},on:{click:function(e){a.doAction("print")}}},[a._v("打印")]),a._v(" "),s("el-button",{staticClass:"table_setup",attrs:{type:"primary",size:a.btnsize,icon:"el-icon-setting",plain:""},on:{click:a.setTable}},[a._v("表格设置")])],1),a._v(" "),s("div",{staticClass:"info_tab"},[s("el-table",{key:a.tablekey,ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:a.dataset,border:"",height:"100%","summary-method":a.getSumLeft,"show-summary":"","tooltip-effect":"dark","default-sort":{prop:"id",order:"ascending"},stripe:""},on:{"row-dblclick":a.getDbClick,"row-click":a.clickDetails,"selection-change":a.getSelection}},[s("el-table-column",{attrs:{fixed:"",sortable:"",type:"selection",width:"50"}}),a._v(" "),a._l(a.tableColumn,function(i){return[i.slot?s("el-table-column",{key:i.id,attrs:{fixed:i.fixed,sortable:"",label:i.label,width:i.width},scopedSlots:a._u([{key:"default",fn:function(t){return[i.click?s("span",{staticClass:"clickitem",domProps:{innerHTML:a._s(i.slot(t))},on:{click:function(e){e.stopPropagation(),i.click(t)}}}):s("span",{domProps:{innerHTML:a._s(i.slot(t))}})]}}])}):s("el-table-column",{key:i.id,attrs:{fixed:i.fixed,sortable:"",label:i.label,prop:i.prop,width:i.width}})]})],2)],1),a._v(" "),s("div",{staticClass:"info_tab_footer"},[a._v("共计:"+a._s(a.total)+" "),s("div",{staticClass:"show_pager"},[s("Pager",{attrs:{total:a.total},on:{change:a.handlePageChange}})],1)])]),a._v(" "),s("AddMark",{attrs:{popVisible:a.popVisible,issender:!0,dotInfo:a.dotInfo,searchQuery:a.searchQuery,isModify:a.isModify,isAccept:a.isAccept},on:{close:a.closeAddDot,success:a.fetchAllreceipt}}),a._v(" "),s("TableSetup",{attrs:{popVisible:a.setupTableVisible,columns:a.tableColumn,code:"RECEIPT1"},on:{close:a.closeSetupTable,success:a.setColumn}})],1)},staticRenderFns:[]};t.a=a},"R/Zi":function(e,t,i){"use strict";var a=i("3EPC"),s=i("o9X6"),r=i("9UCZ"),o=i("Xf+J"),l=i("0xDb");t.a={computed:{isShow:{get:function(){return this.popVisible},set:function(){}}},components:{PopFrame:a.a,SelectTree:s.a,SelectType:r.a},props:{popVisible:{type:Boolean,default:!1},dotInfo:[Object,Array],searchQuery:[Object,Array],isDepMain:{type:Boolean,default:!1},createrId:[Number,String],isModify:{type:Boolean,default:!1},isAccept:{type:Boolean,default:!1},isSend:{type:Boolean,default:!1},isGrant:{type:Boolean,default:!1},info:{type:Object,default:function(){}}},data:function(){return{form:{pageType:"",recTypeId:113,recRemark:"",acceptTypeId:115,acceptRemark:""},formLabelWidth:"75px",tooltip:!1,pickOption2:"",searchCreatTime:+new Date,rules:{},checked1:!0,popTitle:"",loading:!1,type:""}},mounted:function(){console.log(this.info)},watch:{isDepMain:function(){},dotInfo:function(e){this.getMentInfo=this.dotInfo,console.log(this.dotInfo)},searchQuery:function(e){this.form.pageType=this.searchQuery.vo.pageType},orgid:function(e){this.form.orgid=e},isModify:{handler:function(e){this.isModify&&(this.popTitle="回单回收",this.form.pageType=this.searchQuery.vo.pageType,this.$set(this.form,"recTime",Object(l.parseTime)(this.searchCreatTime,"{y}-{m}-{d} {h}:{i}:{s}")))},immediate:!0},isAccept:{handler:function(e){this.isAccept&&(this.popTitle="回单接收",this.form.pageType=this.searchQuery.vo.pageType)},immediate:!0},isSend:{handler:function(e){this.isSend&&(this.popTitle="回单寄出",this.form.pageType=this.searchQuery.vo.pageType)},immediate:!0},isGrant:{handler:function(e){this.isGrant&&(this.popTitle="回单发放",this.form.pageType=this.searchQuery.vo.pageType)},immediate:!0},createrId:function(e){}},methods:{reset:function(){this.$refs.ruleForm.resetFields()},closeMe:function(e){this.$emit("close"),this.reset(),"function"==typeof e&&e()},submitForm:function(e){var i=this;this.$refs[e].validate(function(e){if(!e)return!1;i.loading=!0,i.isModify?i.$set(i.form,"recTime",Object(l.parseTime)(i.searchCreatTime,"{y}-{m}-{d} {h}:{i}:{s}")):i.isAccept?i.$set(i.form,"acceptTime",Object(l.parseTime)(i.searchCreatTime,"{y}-{m}-{d} {h}:{i}:{s}")):i.isSend?i.$set(i.form,"sendTime",Object(l.parseTime)(i.searchCreatTime,"{y}-{m}-{d} {h}:{i}:{s}")):i.isGrant&&i.$set(i.form,"acceptTime",Object(l.parseTime)(i.searchCreatTime,"{y}-{m}-{d} {h}:{i}:{s}"));var t=Object(l.objectMerge2)({},i.form);t.receiptIds=i.dotInfo,Object(o.c)(t).then(function(e){i.$message({message:"保存成功~",type:"success"}),i.closeMe(),i.$emit("success")}).catch(function(e){i._handlerCatchMsg(e),i.closeMe()})})}}}},Rcz9:function(e,t,i){"use strict";var a=i("Dd8w"),s=i.n(a),r=i("qs7E"),n=i("Xf+J"),o=i("NYxO"),l=i("1onU"),c=i("puNT"),p=i("qazg"),h=i("0xDb"),m=i("UQm2");t.a={components:{SearchForm:r.default,Pager:l.a,TableSetup:c.a,AddMark:p.default},computed:s()({},Object(o.mapGetters)(["otherinfo"]),{orgid:function(){}}),mounted:function(){},data:function(){var t=this;return{btnsize:"mini",component:"Send",selectInfo:{},dataset:[],selected:[],dotInfo:[],isModify:!1,popVisible:!1,setupTableVisible:!1,isAccept:!1,tablekey:0,total:0,loading:!0,searchQuery:{currentPage:1,pageSize:100,vo:{pageType:1,receiptIds:[],recStatus:105}},tableColumn:[{label:"序号",prop:"number",width:"60",fixed:!0,slot:function(e){return(t.searchQuery.currentPage-1)*t.searchQuery.pageSize+e.$index+1}},{label:"运单号",prop:"shipSn",width:"120",fixed:!0},{label:"开单网点",prop:"fromOrgName",width:"120",fixed:!1},{label:"目的网点",prop:"toOrgName",width:"120",fixed:!1},{label:"开单日期",prop:"createTime",width:"165",slot:function(e){return""+Object(h.parseTime)(e.row.createTime,"{y}-{m}-{d} {h}:{i}:{s}")},fixed:!1},{label:"发站",prop:"shipFromCityName",width:"120",fixed:!1},{label:"到站",prop:"shipToCityName",width:"120",fixed:!1},{label:"回收状态",prop:"recStatusName",width:"120",fixed:!1},{label:"回收日期",prop:"recTime",width:"180",slot:function(e){return""+Object(h.parseTime)(e.row.recTime,"{y}-{m}-{d}")},fixed:!1},{label:"回收备注",prop:"recRemark",width:"120",fixed:!1},{label:"回单状态",prop:"backStatusName",width:"120",fixed:!1},{label:"回单类型",prop:"shipReceiptRequireName",width:"120",fixed:!1},{label:"回单数量",prop:"shipReceiptNum",width:"120",fixed:!1},{label:"发货人",prop:"sendName",width:"120",fixed:!1},{label:"收货人",prop:"recName",width:"120",fixed:!1},{label:"货品名",prop:"cargoName",width:"90",fixed:!1},{label:"件数",prop:"cargoAmount",width:"80",fixed:!1},{label:"重量",prop:"cargoWeight",width:"80",fixed:!1},{label:"体积",prop:"cargoVolume",width:"80",fixed:!1},{label:"付款方式",prop:"shipPayWayName",width:"120",fixed:!1},{label:"现付",prop:"shipNowpayFee",width:"80",fixed:!1},{label:"到付",prop:"shipArrivepayFee",width:"80",fixed:!1},{label:"回单付",prop:"shipReceiptpayFee",width:"90",fixed:!1},{label:"月结",prop:"shipMonthpayFee",width:"80",fixed:!1},{label:"中转承运商",prop:"carrierName",width:"120",fixed:!1},{label:"中转日期",prop:"transferTime",width:"165",slot:function(e){return""+Object(h.parseTime)(e.row.transferTime,"{y}-{m}-{d} {h}:{i}:{s}")},fixed:!1},{label:"中转单号",prop:"oddNumbers",width:"120",fixed:!1},{label:"发货人电话",prop:"sendMobile",width:"120",fixed:!1},{label:"发货地址",prop:"sendAddress",width:"120",fixed:!1},{label:"收货人电话",prop:"recMobile",width:"120",fixed:!1},{label:"收货地址",prop:"recAddress",width:"120",fixed:!1},{label:"到达省",prop:"endProvince",width:"120",fixed:!1},{label:"到达市",prop:"endCity",width:"120",fixed:!1},{label:"到达县",prop:"endArea",width:"120",fixed:!1}]}},methods:{getSumLeft:function(e,t){return Object(h.getSummaries)(e,h.operationPropertyCalc)},fetchAllreceipt:function(){var t=this;return this.loading=!0,Object(n.a)(this.searchQuery).then(function(e){t.dataset=e.list,t.total=e.total,t.loading=!1}).catch(function(e){t.loading=!1,t._handlerCatchMsg(e)})},fetchData:function(){this.fetchAllreceipt()},handlePageChange:function(e){this.searchQuery.currentPage=e.pageNum,this.searchQuery.pageSize=e.pageSize,this.fetchAllreceipt()},getSearchParam:function(e){this.searchQuery.currentPage=this.$options.data().searchQuery.currentPage,this.searchQuery.pageSize=this.$options.data().searchQuery.pageSize,Object(h.objectMerge2)(this.searchQuery.vo,e),this.fetchAllreceipt()},getSelection:function(e){this.selected=e},doAction:function(e){var t=this;if(console.log(this.selected),!this.selected.length&&"exprot"!==e&&"print"!==e)return this.$message({message:"请选择要操作的项~",type:"warning"}),!1;switch(e){case"export":var i=Object(h.objectMerge2)([],this.dataset);i.forEach(function(e){t.$set(e,"shipToCityName1",e.shipToCityName?e.shipToCityName.split(",")[0]:""),t.$set(e,"shipToCityName2",e.shipToCityName?e.shipToCityName.split(",")[1]:""),t.$set(e,"shipToCityName3",e.shipToCityName.split(",")[2]?e.shipToCityName.split(",")[2]:"")});var a=Object(h.objectMerge2)([],this.selected);a.forEach(function(e){t.$set(e,"shipToCityName1",e.shipToCityName?e.shipToCityName.split(",")[0]:""),t.$set(e,"shipToCityName2",e.shipToCityName?e.shipToCityName.split(",")[1]:""),t.$set(e,"shipToCityName3",e.shipToCityName.split(",")[2]?e.shipToCityName.split(",")[2]:"")}),Object(m.g)({data:a.length?a:i,columns:this.tableColumn,name:"回单回收"});break;case"print":var s=Object(h.objectMerge2)([],this.dataset);s.forEach(function(e){t.$set(e,"shipToCityName1",e.shipToCityName?e.shipToCityName.split(",")[0]:""),t.$set(e,"shipToCityName2",e.shipToCityName?e.shipToCityName.split(",")[1]:""),t.$set(e,"shipToCityName3",e.shipToCityName.split(",")[2]?e.shipToCityName.split(",")[2]:"")});var r=Object(h.objectMerge2)([],this.selected);r.forEach(function(e){t.$set(e,"shipToCityName1",e.shipToCityName?e.shipToCityName.split(",")[0]:""),t.$set(e,"shipToCityName2",e.shipToCityName?e.shipToCityName.split(",")[1]:""),t.$set(e,"shipToCityName3",e.shipToCityName.split(",")[2]?e.shipToCityName.split(",")[2]:"")}),Object(m.d)({data:r.length?r:s,columns:this.tableColumn,name:"回单回收"});break;case"recycle":var o=this.selected.filter(function(e){return 105===e.recStatus}).map(function(e){return e.receiptId});console.log(o),o.length?(this.searchQuery.vo.receiptIds=o,this.dotInfo=o,this.popVisible=!0,this.isModify=!0):this.$message.warning("请选择未回收项~");break;case"cancel":var l=this.selected.filter(function(e){return 106===e.recStatus&&107===e.sendStatus}).map(function(e){return e.receiptId});console.log(this.selected),l.length?(this.searchQuery.vo.receiptIds=l,Object(n.b)(this.searchQuery.vo).then(function(e){return t.$message({message:"取消回收成功~",type:"success"}),t.fetchAllreceipt(),!1}).catch(function(e){t._handlerCatchMsg(e)})):this.$message.warning("回单已寄出不能取消~~")}this.$refs.multipleTable.clearSelection()},closeAddDot:function(){this.popVisible=!1},clickDetails:function(e,t,i){this.$refs.multipleTable.toggleRowSelection(e)},setTable:function(){this.setupTableVisible=!0},setColumn:function(e){this.tableColumn=e,this.tablekey=Math.random()},closeSetupTable:function(){this.setupTableVisible=!1},getDbClick:function(){}}}},SgsV:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=i("Rcz9"),s=i("BhKJ"),r=i("VU/8")(a.a,s.a,null,null,null);t.default=r.exports},bLmv:function(e,t,i){"use strict";var a={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-dialog",{staticClass:"wzl_addReceiptPop",attrs:{title:t.popTitle,visible:t.isShow,"close-on-click-modal":!1,"before-close":t.closeMe},on:{close:t.closeMe,"update:visible":function(e){t.isShow=e}}},[i("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:t.form,rules:t.rules,"label-width":t.formLabelWidth,inline:!0,"label-position":"right",size:"mini"}},[t.isModify?i("div",{staticClass:"addMark"},[i("el-form-item",{attrs:{label:"回收情况",prop:"recTypeId",cols:45}},[i("SelectType",{attrs:{type:"rec_type"},model:{value:t.form.recTypeId,callback:function(e){t.$set(t.form,"recTypeId",e)},expression:"form.recTypeId"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"回收日期:",prop:"recTime"}},[i("el-date-picker",{attrs:{align:"right",type:"date","picker-options":t.pickOption2,placeholder:"选择日期","value-format":"timestamp"},model:{value:t.searchCreatTime,callback:function(e){t.searchCreatTime=e},expression:"searchCreatTime"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"回收备注","label-width":t.formLabelWidth,prop:"recRemark"}},[i("el-input",{attrs:{type:"textarea",rows:7,cols:30,maxlength:200,placeholder:"最多200个字符","auto-complete":"off"},model:{value:t.form.recRemark,callback:function(e){t.$set(t.form,"recRemark",e)},expression:"form.recRemark"}})],1)],1):t._e(),t._v(" "),t.isAccept?i("div",{staticClass:"addMark"},[i("el-form-item",{attrs:{label:"接收情况",prop:"acceptTypeId",cols:45}},[i("SelectType",{attrs:{type:"accept_type"},model:{value:t.form.acceptTypeId,callback:function(e){t.$set(t.form,"acceptTypeId",e)},expression:"form.acceptTypeId"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"接收日期:",prop:"recTime"}},[i("el-date-picker",{attrs:{align:"right",type:"date","picker-options":t.pickOption2,placeholder:"选择日期","value-format":"timestamp"},model:{value:t.searchCreatTime,callback:function(e){t.searchCreatTime=e},expression:"searchCreatTime"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"接收备注","label-width":t.formLabelWidth,prop:"acceptRemark"}},[i("el-input",{attrs:{maxlength:200,type:"textarea",rows:7,cols:30,placeholder:"最多200个字符","auto-complete":"off"},model:{value:t.form.acceptRemark,callback:function(e){t.$set(t.form,"acceptRemark",e)},expression:"form.acceptRemark"}})],1)],1):t._e(),t._v(" "),t.isSend?i("div",{staticClass:"addMark"},[i("el-form-item",{attrs:{label:"寄出日期:",prop:"sendTime"}},[i("el-date-picker",{attrs:{align:"right",type:"date","picker-options":t.pickOption2,placeholder:"选择日期","value-format":"timestamp"},model:{value:t.searchCreatTime,callback:function(e){t.searchCreatTime=e},expression:"searchCreatTime"}})],1)],1):t._e(),t._v(" "),t.isGrant?i("div",{staticClass:"addMark"},[i("el-form-item",{attrs:{label:"发放日期:",prop:"giveoutTime"}},[i("el-date-picker",{attrs:{align:"right",type:"date","picker-options":t.pickOption2,placeholder:"选择日期","value-format":"timestamp"},model:{value:t.searchCreatTime,callback:function(e){t.searchCreatTime=e},expression:"searchCreatTime"}})],1)],1):t._e()]),t._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{type:"primary"},on:{click:function(e){t.submitForm("ruleForm")}}},[t._v("确 定")]),t._v(" "),i("el-button",{on:{click:t.closeMe}},[t._v("取 消")])],1)],1)},staticRenderFns:[]};t.a=a},hqji:function(e,t,i){"use strict";var a={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-form",{staticClass:"staff_searchinfo clearfix",attrs:{inline:!0,size:t.btnsize,"label-position":"right",rules:t.rules,model:t.searchForm,"label-width":"70px"}},[i("div",{staticClass:"staff_searchinfo--input"},[i("el-form-item",{attrs:{label:"开单时间"}},[i("div",{staticClass:"block"},[i("el-date-picker",{attrs:{"default-value":t.defaultTime,type:"daterange",align:"right","value-format":"yyyy-MM-dd","start-placeholder":"开始日期","picker-options":t.pickerOptions2,"end-placeholder":"结束日期"},model:{value:t.searchCreatTime,callback:function(e){t.searchCreatTime=e},expression:"searchCreatTime"}})],1)]),t._v(" "),i("el-form-item",{attrs:{label:t.title+"状态",prop:"recStatus"}},[i("selectType",{attrs:{type:t.type},model:{value:t.thestatus,callback:function(e){t.thestatus=e},expression:"thestatus"}},[i("el-option",{attrs:{slot:"head",label:"全部",value:""},slot:"head"})],1)],1),t._v(" "),i("el-form-item",{attrs:{label:"运单号"}},[i("el-input",{attrs:{maxlength:20,"auto-complete":"off",clearable:""},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.onSubmit(e):null}},model:{value:t.searchForm.shipSn,callback:function(e){t.$set(t.searchForm,"shipSn",e)},expression:"searchForm.shipSn"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"发站"}},[i("el-input",{attrs:{maxlength:20,"auto-complete":"off",clearable:""},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.onSubmit(e):null}},model:{value:t.searchForm.shipFromCityName,callback:function(e){t.$set(t.searchForm,"shipFromCityName",e)},expression:"searchForm.shipFromCityName"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"到站"}},[i("el-input",{attrs:{maxlength:20,"auto-complete":"off",clearable:""},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.onSubmit(e):null}},model:{value:t.searchForm.shipToCityName,callback:function(e){t.$set(t.searchForm,"shipToCityName",e)},expression:"searchForm.shipToCityName"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"发货人"}},[i("el-input",{attrs:{maxlength:15,clearable:"","auto-complete":"off"},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.onSubmit(e):null}},model:{value:t.searchForm.sendName,callback:function(e){t.$set(t.searchForm,"sendName",e)},expression:"searchForm.sendName"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"收货人"}},[i("el-input",{attrs:{maxlength:15,clearable:"","auto-complete":"off"},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.onSubmit(e):null}},model:{value:t.searchForm.recName,callback:function(e){t.$set(t.searchForm,"recName",e)},expression:"searchForm.recName"}})],1)],1),t._v(" "),i("el-form-item",{staticClass:"staff_searchinfo--btn"},[i("el-button",{attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v("查询")]),t._v(" "),i("el-button",{attrs:{type:"info",plain:""},on:{click:t.clearForm}},[t._v("清空")])],1)],1)},staticRenderFns:[]};t.a=a},"j/99":function(e,t,i){"use strict";var a=i("woOf"),s=i.n(a),r=i("E4LH"),o=i("o9X6"),l=i("9UCZ"),n=i("66wn"),c=i("0xDb");t.a={components:{SelectTree:o.a,SelectCity:n.a,SelectType:l.a},props:{btnsize:{type:String,default:"mini"},orgid:{type:Number},type:String,title:String,status:String,issender:{type:Boolean,dafault:!1}},computed:{},data:function(){return{searchCreatTime:[],defaultTime:[Object(c.parseTime)(+new Date-5184e6,"{y}-{m}-{d}"),Object(c.parseTime)(new Date,"{y}-{m}-{d}")],thestatus:"",searchForm:{shipFromOrgid:"",shipSn:"",shipFromCityCode:"",shipFromCityName:"",shipToCityCode:"",shipToCityName:"",shipSenderId:"",recName:""},rules:{shipSn:[{required:!0,trigger:"blur",validator:function(e,t,i){""!==t&&null!==t&&t&&void 0!==t?r.a.ONLY_NUMBER_AND_LETTER.test(t)?i():i(new Error("只能输字母和数字")):i(new Error("请输入运单号"))}}]},pickerOptions2:{shortcuts:c.pickerOptions2}}},watch:{orgid:function(e){this.searchForm.orgid=e},type:{handler:function(e){console.log(e),"rec_status"===e&&(this.thestatus=105),"accept_status"===e&&(this.thestatus=109),"send_status"===e&&(this.thestatus=107),"giveout_status"===e&&(this.thestatus=111)},immediate:!0}},mounted:function(){this.searchCreatTime=this.defaultTime,this.onSubmit()},methods:{getOrgid:function(e){this.searchForm.orgid=e},onSubmit:function(){this.searchForm.startTime=this.searchCreatTime?Object(c.parseTime)(this.searchCreatTime[0],"{y}-{m}-{d} ")+"00:00:00":"",this.searchForm.endTime=this.searchCreatTime?Object(c.parseTime)(this.searchCreatTime[1],"{y}-{m}-{d} ")+"23:59:59":"";var e=s()({},this.searchForm);e[this.status]=this.thestatus,this.$emit("change",e)},clearForm:function(){this.searchForm.shipSn="",this.searchForm.recName="",this.searchForm.sendName="",this.searchCreatTime=this.$options.data().searchCreatTime,this.searchForm.shipFromCityName="",this.searchForm.shipToCityName="",this.thestatus="",this.searchCreatTime=this.defaultTime}}}},qYK6:function(e,t,i){"use strict";t.a={props:{width:{type:String,default:"400"},title:{type:String,default:"标题"},isShow:{type:Boolean,default:!1}},watch:{isShow:{handler:function(){this.isShow&&(this.shouldRender=!0)},immediate:!0}},data:function(){return{zIndex:(window.tmsPopZindex?window.tmsPopZindex+=1:window.tmsPopZindex=1e3,window.tmsPopZindex),shouldRender:!1}},methods:{close:function(){this.$emit("close")}}}},qazg:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=i("R/Zi"),s=i("bLmv");var r=function(e){i("1/wR")},o=i("VU/8")(a.a,s.a,r,null,null);t.default=o.exports},qs7E:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=i("j/99"),s=i("hqji"),r=i("VU/8")(a.a,s.a,null,null,null);t.default=r.exports},sZBQ:function(e,t){}});