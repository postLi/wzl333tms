webpackJsonp([92,219,347],{"/n+A":function(e,t,a){"use strict";var i={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"popRight-center",class:{showPopRight:e.isShow},style:{zIndex:e.zIndex}},[a("div",{staticClass:"popRight-header"},[e._t("title",[e._v(e._s(e.title))]),e._v(" "),a("i",{staticClass:"el-icon-close",attrs:{title:"关闭"},on:{click:e.close}})],2),e._v(" "),e.shouldRender?a("div",{staticClass:"popRight-content"},[e._t("content",[e._v("内容")])],2):e._e(),e._v(" "),a("div",{staticClass:"popRight-footer"},[e._t("footer",[e._v("底部")])],2)])},staticRenderFns:[]};t.a=i},"3EPC":function(e,t,a){"use strict";var i=a("qYK6"),r=a("/n+A");var o=function(e){a("f3wf")},s=a("VU/8")(i.a,r.a,o,null,null);t.a=s.exports},"55Wa":function(e,t){},DdVy:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a("z9Yg"),r=a("VOg1"),o=a("VU/8")(i.a,r.a,null,null,null);t.default=o.exports},LE6s:function(e,t){},NTyV:function(e,t,a){"use strict";var i={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-dialog",{staticClass:"wzl_addReceiptPop",attrs:{title:t.popTitle,visible:t.isShow,"close-on-click-modal":!1,"before-close":t.closeMe},on:{close:t.closeMe,"update:visible":function(e){t.isShow=e}}},[a("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:t.form,rules:t.rules,"label-width":t.formLabelWidth,inline:!0,"label-position":"right",size:"mini"}},[t.isModify?a("div",{staticClass:"addMark"},[a("el-form-item",{attrs:{label:"回收情况",prop:"recTypeId",cols:45}},[a("SelectType",{attrs:{type:"rec_type"},model:{value:t.form.recTypeId,callback:function(e){t.$set(t.form,"recTypeId",e)},expression:"form.recTypeId"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"回收日期:",prop:"recTime"}},[a("el-date-picker",{attrs:{align:"right",type:"date","picker-options":t.pickOption2,placeholder:"选择日期","value-format":"timestamp"},model:{value:t.searchCreatTime,callback:function(e){t.searchCreatTime=e},expression:"searchCreatTime"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"回收备注","label-width":t.formLabelWidth,prop:"recRemark"}},[a("el-input",{attrs:{type:"textarea",rows:7,cols:30,maxlength:200,placeholder:"最多200个字符","auto-complete":"off"},model:{value:t.form.recRemark,callback:function(e){t.$set(t.form,"recRemark",e)},expression:"form.recRemark"}})],1)],1):t._e(),t._v(" "),t.isAccept?a("div",{staticClass:"addMark"},[a("el-form-item",{attrs:{label:"接收情况",prop:"acceptTypeId",cols:45}},[a("SelectType",{attrs:{type:"accept_type"},model:{value:t.form.acceptTypeId,callback:function(e){t.$set(t.form,"acceptTypeId",e)},expression:"form.acceptTypeId"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"接收日期:",prop:"recTime"}},[a("el-date-picker",{attrs:{align:"right",type:"date","picker-options":t.pickOption2,placeholder:"选择日期","value-format":"timestamp"},model:{value:t.searchCreatTime,callback:function(e){t.searchCreatTime=e},expression:"searchCreatTime"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"接收备注","label-width":t.formLabelWidth,prop:"acceptRemark"}},[a("el-input",{attrs:{maxlength:200,type:"textarea",rows:7,cols:30,placeholder:"最多200个字符","auto-complete":"off"},model:{value:t.form.acceptRemark,callback:function(e){t.$set(t.form,"acceptRemark",e)},expression:"form.acceptRemark"}})],1)],1):t._e(),t._v(" "),t.isSend?a("div",{staticClass:"addMark"},[a("el-form-item",{attrs:{label:"寄出日期:",prop:"sendTime"}},[a("el-date-picker",{attrs:{align:"right",type:"date","picker-options":t.pickOption2,placeholder:"选择日期","value-format":"timestamp"},model:{value:t.searchCreatTime,callback:function(e){t.searchCreatTime=e},expression:"searchCreatTime"}})],1)],1):t._e(),t._v(" "),t.isGrant?a("div",{staticClass:"addMark"},[a("el-form-item",{attrs:{label:"发放日期:",prop:"giveoutTime"}},[a("el-date-picker",{attrs:{align:"right",type:"date","picker-options":t.pickOption2,placeholder:"选择日期","value-format":"timestamp"},model:{value:t.searchCreatTime,callback:function(e){t.searchCreatTime=e},expression:"searchCreatTime"}})],1)],1):t._e()]),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"primary"},on:{click:function(e){t.submitForm("ruleForm")}}},[t._v("确 定")]),t._v(" "),a("el-button",{on:{click:t.closeMe}},[t._v("取 消")])],1)],1)},staticRenderFns:[]};t.a=i},"R/Zi":function(e,t,a){"use strict";var i=a("3EPC"),r=a("o9X6"),o=a("9UCZ"),s=a("Xf+J"),n=a("0xDb");t.a={computed:{isShow:{get:function(){return this.popVisible},set:function(){}}},components:{PopFrame:i.a,SelectTree:r.a,SelectType:o.a},props:{popVisible:{type:Boolean,default:!1},dotInfo:[Object,Array],searchQuery:[Object,Array],isDepMain:{type:Boolean,default:!1},createrId:[Number,String],isModify:{type:Boolean,default:!1},isAccept:{type:Boolean,default:!1},isSend:{type:Boolean,default:!1},isGrant:{type:Boolean,default:!1},info:{type:Object,default:function(){}}},data:function(){return{form:{pageType:"",recTypeId:113,recRemark:"",acceptTypeId:115,acceptRemark:""},formLabelWidth:"75px",tooltip:!1,pickOption2:"",searchCreatTime:+new Date,rules:{},checked1:!0,popTitle:"",loading:!1,type:""}},mounted:function(){console.log(this.info)},watch:{isDepMain:function(){},dotInfo:function(e){this.getMentInfo=this.dotInfo,console.log(this.dotInfo)},searchQuery:function(e){this.form.pageType=this.searchQuery.vo.pageType},orgid:function(e){this.form.orgid=e},isModify:{handler:function(e){this.isModify&&(this.popTitle="回单回收",this.form.pageType=this.searchQuery.vo.pageType,this.$set(this.form,"recTime",Object(n.parseTime)(this.searchCreatTime,"{y}-{m}-{d} {h}:{i}:{s}")))},immediate:!0},isAccept:{handler:function(e){this.isAccept&&(this.popTitle="回单接收",this.form.pageType=this.searchQuery.vo.pageType)},immediate:!0},isSend:{handler:function(e){this.isSend&&(this.popTitle="回单寄出",this.form.pageType=this.searchQuery.vo.pageType)},immediate:!0},isGrant:{handler:function(e){this.isGrant&&(this.popTitle="回单发放",this.form.pageType=this.searchQuery.vo.pageType)},immediate:!0},createrId:function(e){}},methods:{reset:function(){this.$refs.ruleForm.resetFields()},closeMe:function(e){this.$emit("close"),this.reset(),"function"==typeof e&&e()},submitForm:function(e){var a=this;this.$refs[e].validate(function(e){if(!e)return!1;a.loading=!0,a.isModify?a.$set(a.form,"recTime",Object(n.parseTime)(a.searchCreatTime,"{y}-{m}-{d} {h}:{i}:{s}")):a.isAccept?a.$set(a.form,"acceptTime",Object(n.parseTime)(a.searchCreatTime,"{y}-{m}-{d} {h}:{i}:{s}")):a.isSend?a.$set(a.form,"sendTime",Object(n.parseTime)(a.searchCreatTime,"{y}-{m}-{d} {h}:{i}:{s}")):a.isGrant&&a.$set(a.form,"acceptTime",Object(n.parseTime)(a.searchCreatTime,"{y}-{m}-{d} {h}:{i}:{s}"));var t=Object(n.objectMerge2)({},a.form);t.receiptIds=a.dotInfo,Object(s.e)(t).then(function(e){a.$message({message:"保存成功~",type:"success"}),a.closeMe(),a.$emit("success")}).catch(function(e){a._handlerCatchMsg(e),a.closeMe()})})}}}},VOg1:function(e,t,a){"use strict";var i={render:function(){var i=this,e=i.$createElement,r=i._self._c||e;return r("div",{directives:[{name:"loading",rawName:"v-loading",value:i.loading,expression:"loading"}],staticClass:"tab-content miniHeaderSearch",attrs:{issender:!0}},[r("SearchForm",{attrs:{orgid:i.otherinfo.orgid,title:"寄出",type:"send_status",status:"sendStatus",btnsize:i.btnsize},on:{change:i.getSearchParam}}),i._v(" "),r("div",{staticClass:"tab_info"},[r("div",{staticClass:"btns_box"},[r("el-button",{directives:[{name:"has",rawName:"v-has:RECE_SEND",arg:"RECE_SEND"}],attrs:{type:"primary",size:i.btnsize,icon:"el-icon-goods",plain:""},on:{click:function(e){i.doAction("send")}}},[i._v("回单寄出")]),i._v(" "),r("el-button",{directives:[{name:"has",rawName:"v-has:RECE_SENDCANL",arg:"RECE_SENDCANL"}],attrs:{type:"warning",size:i.btnsize,icon:"el-icon-remove-outline",plain:""},on:{click:function(e){i.doAction("cancel")}}},[i._v("取消寄出")]),i._v(" "),r("el-button",{directives:[{name:"has",rawName:"v-has:RECE_EXP2",arg:"RECE_EXP2"}],attrs:{type:"primary",size:i.btnsize,icon:"el-icon-upload2",plain:""},on:{click:function(e){i.doAction("export")}}},[i._v("导出")]),i._v(" "),r("el-button",{directives:[{name:"has",rawName:"v-has:RECE_PRI2",arg:"RECE_PRI2"}],attrs:{type:"primary",size:i.btnsize,icon:"el-icon-printer",plain:""},on:{click:function(e){i.doAction("print")}}},[i._v("打印")]),i._v(" "),r("el-button",{staticClass:"table_setup",attrs:{type:"primary",size:i.btnsize,icon:"el-icon-setting",plain:""},on:{click:i.setTable}},[i._v("表格设置")])],1),i._v(" "),r("div",{staticClass:"info_tab"},[r("el-table",{key:i.tablekey,ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:i.dataset,border:"",height:"100%","summary-method":i.getSumLeft,"show-summary":"","tooltip-effect":"dark","default-sort":{prop:"id",order:"ascending"},stripe:""},on:{"row-dblclick":i.getDbClick,"row-click":i.clickDetails,"selection-change":i.getSelection}},[r("el-table-column",{attrs:{fixed:"",sortable:"",type:"selection",width:"70"}}),i._v(" "),i._l(i.tableColumn,function(a){return[a.slot?r("el-table-column",{key:a.id,attrs:{fixed:a.fixed,sortable:"",label:a.label,prop:a.prop,width:a.width},scopedSlots:i._u([{key:"header",fn:function(e){return[r("tableHeaderSearch",{attrs:{scope:e,query:i.searchQuery},on:{change:i.changeKey}})]}},{key:"default",fn:function(t){return[a.click?r("span",{staticClass:"clickitem",domProps:{innerHTML:i._s(a.slot(t))},on:{click:function(e){e.stopPropagation(),a.click(t)}}}):r("span",{domProps:{innerHTML:i._s(a.slot(t))}})]}}])}):r("el-table-column",{key:a.id,attrs:{fixed:a.fixed,sortable:"",label:a.label,prop:a.prop,width:a.width},scopedSlots:i._u([{key:"header",fn:function(e){return[r("tableHeaderSearch",{attrs:{scope:e,query:i.searchQuery},on:{change:i.changeKey}})]}},{key:"default",fn:function(e){return[i._v(i._s(e.row[a.prop]))]}}])})]})],2)],1)]),i._v(" "),r("div",{staticClass:"info_tab_footer"},[i._v("共计:"+i._s(i.total)+" "),r("div",{staticClass:"show_pager"},[r("Pager",{attrs:{total:i.total},on:{change:i.handlePageChange}})],1)]),i._v(" "),r("AddMark",{attrs:{popVisible:i.popVisible,issender:!0,dotInfo:i.dotInfo,searchQuery:i.searchQuery,isSend:i.isSend},on:{close:i.closeAddDot,success:i.fetchAllreceipt}}),i._v(" "),r("TableSetup",{attrs:{popVisible:i.setupTableVisible,columns:i.tableColumn,code:"RECEIPT2"},on:{close:i.closeSetupTable,success:i.setColumn}})],1)},staticRenderFns:[]};t.a=i},f3wf:function(e,t){},i2Q8:function(e,t,a){"use strict";var i=a("woOf"),r=a.n(i),o=a("0xDb"),s=a("9UCZ");t.a={components:{SelectType:s.a},props:{scope:{type:Object,default:function(){}},query:{type:Object,default:function(){}}},data:function(){return{btnsize:"mini",queryString:"",curSelect:{property:"shipShippingTypeName",label:"运输方式",type:"ship_shipping_type",options:[],filter:[],dispage:[]},specialType:[{property:"lowerPrice",label:"最低价格(元)",page:[],title:'查询"面议", 请输入 0'}],selectOptions:[{property:"shipShippingTypeName",label:"运输方式",dispage:[],type:"ship_shipping_type",options:[]},{property:"shipPayWayName",label:"付款方式",dispage:[],type:"ship_pay_way",options:[]},{property:"orderPayWayName",label:"付款方式",dispage:[],type:"ship_pay_way",options:[]},{property:"shipDeliveryMethodName",lable:"交接方式",type:"ship_delivery_method",options:[]},{property:"shipStatusName",lable:"运单状态",type:"ship_status",options:[]},{property:"shipBusinessTypeName",label:"业务类型",type:"ship_business_type",options:[]},{property:"sexFlag",label:"性别",type:"",options:[{dictName:"女",id:1},{dictName:"男",id:0}]},{property:"sendStatus",label:"发送状态",type:"",options:[{dictName:"开",id:1},{dictName:"关",id:0}]},{property:"licenseTypeName",label:"驾驶证类型",type:"driving_type",options:[]},{property:"truckSourceName",label:"车辆来源",type:"truck_source",options:[]},{property:"truckTypeName",label:"车型",type:"truck_type",options:[]},{property:"orerStatusName",label:"订单类型",type:"order_status",options:[]},{property:"shipReceiptRequireName",label:"回单要求",type:"ship_receipt_require",options:[]},{property:"signTypeName",label:"签收类型",type:"sign_type",options:[]},{property:"abnormalStatusName",label:"异常状态",type:"abnormal_status",options:[]},{property:"abnormalTypeName",label:"异常类型",type:"abnormal_type",options:[]},{property:"apportionType",label:"分摊方式",type:"apportion_type",options:[]},{property:"signStatus",label:"签收状态",type:"sign_status",options:[]},{property:"shipPayWay",label:"付款方式",type:"ship_pay_way",options:[]},{property:"shipDeliveryMethod",label:"交接方式",type:"ship_delivery_method",options:[]},{property:"totalStatusCn",label:"核销状态",type:"count_status",options:[],filter:[""]},{property:"nowPayStateCn",label:"核销状态",type:"count_status",options:[],filter:[""]},{property:"arrivepayStateCn",label:"核销状态",type:"count_status",options:[],filter:[""]},{property:"receiptpayStateCn",label:"核销状态",type:"count_status",options:[],filter:[""]},{property:"monthpayStateCn",label:"核销状态",type:"count_status",options:[],filter:[""]},{property:"changeStateCn",label:"核销状态",type:"count_status",options:[],filter:[""]},{property:"statusName",label:"核销状态",type:"count_status",options:[],filter:[""]},{property:"statusValue",label:"核销状态",type:"count_status",options:[],filter:[""]},{property:"incomePayTypeValue",label:"费用类型",type:"",options:[{dictName:"异动增款",id:"异动增款"},{dictName:"异动减款",id:"异动减款"}]},{property:"applyStatus",label:"审核状态",type:"",options:[{dictName:"审核中",id:0},{dictName:"审核通过",id:1},{dictName:"审核不通过",id:2}]},{property:"rangeStatus",label:"状态",type:"",options:[{dictName:"禁用",id:0},{dictName:"启用",id:1}]},{property:"pickupStatusName",label:"提货状态",type:"pickup_status",options:[],filter:["235"]},{property:"payMethodName",label:"付款方式",type:"ship_pay_way",options:[],filter:[]},{property:"batchTypeName",label:"批次状态",type:"short_batch_type",dispage:["/operation/order/arteryDepart/sender","/operation/order/track/artery","/operation/order/track/deliver","/operation/order/deliverManage"],options:[],filter:["46"]},{property:"bathStatusName",label:"批次状态",dispage:["/operation/order/arteryDelivery/sender"],type:"short_batch_type",options:[],filter:["46","47"]},{property:"batchTypeName",label:"批次状态",type:"main_batch_type",dispage:["/operation/order/shortDepart/deliver","/operation/order/track/deliver","/operation/order/track/deliver","/operation/order/deliverManage"],options:[],filter:["51"]},{property:"bathStatusName",label:"批次状态",dispage:["/operation/order/shortDepart/arrival"],type:"main_batch_type",options:[],filter:["51"]},{property:"batchTypeName",label:"批次状态",dispage:["/operation/order/shortDepart/deliver","/operation/order/arteryDepart/sender","/operation/order/track/artery"],type:"delivery_batch_type",options:[],filter:["56"]},{property:"unloadSignName",label:"卸货状态",type:"unload_type",options:[],filter:["405"]},{property:"signStatusName",label:"签收状态",type:"sign_status",options:[]},{property:"signCertificateName",label:"凭证状态",type:"sign_certificate",options:[],filter:["230"]},{property:"signCocumentTypeName",label:"签收证件",type:"sign_cocument_type",options:[]},{property:"backStatusName",label:"回单状态",type:"back_status",options:[]},{property:"recStatusName",label:"回收状态",type:"rec_status",options:[]},{property:"sendStatusName",label:"寄出状态",type:"send_status",options:[]},{property:"acceptStatusName",label:"接收状态",type:"accept_status",options:[]},{property:"giveoutStatusName",label:"发放状态",type:"giveout_status",options:[]},{property:"fundsGoodsStatusName",label:"货款状态",type:"funds_goods_status",options:[]},{property:"fundsRecStatusName",label:"回收状态",type:"funds_rec_status",options:[],filter:["253"]},{property:"fundsRemittanceStatusName",label:"汇款状态",type:"funds_remittance_status",options:[],filter:["256"]},{property:"fundsAccountStatusName",label:"到账状态",type:"funds_account_status",options:[],filter:["259"]},{property:"fundsGiveoutStatusName",label:"发放状态",type:"funds_giveout_status",options:[],filter:["262"]},{property:"paymentName",label:"中转付款方式",type:"payment_type",options:[]},{property:"status",label:"控货状态",onlypage:"/operation/service/controlgoods/allGoods",type:"",options:[{dictName:"未放货",id:1},{dictName:"已放货",id:2},{dictName:"未控货",id:"0"}]},{property:"dataSrcZh",label:"来源",type:"",options:[{dictName:"核销产生",id:"核销产生"},{dictName:"手工录入",id:"手工录入"}]},{property:"paymentsTypeZh",label:"方向",type:"",options:[{dictName:"收入",id:"收入"},{dictName:"支出",id:"支出"}]},{property:"verifyStatusZh",label:"审核状态",type:"",options:[{dictName:"未审核",id:"未审核"},{dictName:"已审核",id:"已审核"}]},{property:"checkStatusZh",label:"对账状态",type:"",options:[{dictName:"未对账",id:"未对账"},{dictName:"已对账",id:"已对账"}]}],unSearchList:[{property:"id",label:"序号"},{property:"number",label:"序号"},{property:"grossProfit",label:"毛利"},{property:"status",label:"控货状态",dispage:["/operation/service/controlgoods/noGoods","/operation/service/controlgoods/haveGoods"]}]}},computed:{specialTypeTitle:function(){var e="",t=this.scope.column.property.toLowerCase(),a=this.specialType.filter(function(e){return e.property.toLowerCase()===t});return a&&a.length&&(e=a[0].title),e},unSearch:function(){var t=this,a=this.scope.column.property.toLowerCase(),i=0,r=!1;return!this.unSearchList.filter(function(e){return e.property.toLowerCase()===a&&(r=!0,e.dispage&&e.dispage.length&&(i=e.dispage.filter(function(e){return e===t.$route.fullPath}).length)),e.dispage?!!(r&&0<i)||void 0:r}).length},isTime:function(){var e=/(time)/,t=this.scope.column.property.toLowerCase();if(e.test(t)&&"timeliness"!==t)return e.test(t);return!!["validityDate","validityStartdate","truckRegisterDate","truckScrapDate"].filter(function(e){return e.toLowerCase()===t}).length},isSelect:function(){var o=this,e=this.selectOptions.filter(function(e){var t,a=!1,i=!1,r=0;if(e.property===o.scope.column.property&&(a=!0,e.dispage&&e.dispage.length&&(r=e.dispage.filter(function(e){return e===o.$route.fullPath}).length),i=e.onlypage&&e.onlypage===o.$route.fullPath),t=!(0<r),e.onlypage){if(a&&t&&i)return!0}else if(a&&t)return!0});return e.length&&(this.curSelect=r()({},e[0])),e.length}},methods:{filterfn:function(t){if(this.curSelect.filter){var a=0;return this.curSelect.filter.forEach(function(e){t.id.toString()===e&&(a+=1)}),0===a}return""!==t.id},changeEnter:function(e,t,a){this.changeKey(e,t,a.target.value)},changeKey:function(t,e,a,i){var r=this;this.$nextTick(function(){var e=r.query;e.searchVo||r.$set(e,"searchVo",{}),r.isChange=!0,r.isTime&&(a=Object(o.parseTime)(a,"{y}-{m}-{d}")),e.searchVo[t.property]=a,e.currentPage=1,console.log("changeKey components::",e,t),r.$emit("change",e)})}}}},"j/99":function(e,t,a){"use strict";var i=a("woOf"),r=a.n(i),o=a("E4LH"),s=a("o9X6"),n=a("9UCZ"),l=a("66wn"),p=a("0xDb");t.a={components:{SelectTree:s.a,SelectCity:l.a,SelectType:n.a},props:{btnsize:{type:String,default:"mini"},orgid:{type:Number},component:{type:String,default:""},type:String,title:String,status:String,issender:{type:Boolean,dafault:!1}},computed:{},data:function(){return{searchCreatTime:[],defaultTime:[Object(p.parseTime)(+new Date-5184e6,"{y}-{m}-{d}"),Object(p.parseTime)(new Date,"{y}-{m}-{d}")],thestatus:"",searchForm:{shipFromOrgid:"",shipSn:"",shipFromCityCode:"",shipFromCityName:"",shipToCityCode:"",shipToCityName:"",shipSenderId:"",recName:""},rules:{shipSn:[{required:!0,trigger:"blur",validator:function(e,t,a){""!==t&&null!==t&&t&&void 0!==t?o.a.ONLY_NUMBER_AND_LETTER.test(t)?a():a(new Error("只能输字母和数字")):a(new Error("请输入运单号"))}}]},pickerOptions2:{shortcuts:p.pickerOptions2}}},watch:{orgid:function(e){this.searchForm.orgid=e},component:{handler:function(e,t){},deep:!0},type:{handler:function(e){console.log(e),"rec_status"===e&&(this.thestatus=105),"accept_status"===e&&(this.thestatus=109),"send_status"===e&&(this.thestatus=107),"giveout_status"===e&&(this.thestatus=111)},immediate:!0}},mounted:function(){this.searchCreatTime=this.defaultTime,this.onSubmit()},methods:{getOrgid:function(e){this.searchForm.orgid=e},onSubmit:function(){this.searchForm.startTime=this.searchCreatTime?Object(p.parseTime)(this.searchCreatTime[0],"{y}-{m}-{d} ")+"00:00:00":"",this.searchForm.endTime=this.searchCreatTime?Object(p.parseTime)(this.searchCreatTime[1],"{y}-{m}-{d} ")+"23:59:59":"";var e=r()({},this.searchForm);e[this.status]=this.thestatus,this.$emit("change",e)},clearForm:function(){this.searchForm.shipSn="",this.searchForm.recName="",this.searchForm.sendName="",this.searchCreatTime=this.$options.data().searchCreatTime,this.searchForm.shipFromCityName="",this.searchForm.shipToCityName="",this.thestatus="",this.searchCreatTime=this.defaultTime}}}},qYK6:function(e,t,a){"use strict";t.a={props:{width:{type:String,default:"400"},title:{type:String,default:"标题"},isShow:{type:Boolean,default:!1}},watch:{isShow:{handler:function(){this.isShow&&(this.shouldRender=!0)},immediate:!0}},data:function(){return{zIndex:(window.tmsPopZindex?window.tmsPopZindex+=1:window.tmsPopZindex=1e3,window.tmsPopZindex),shouldRender:!1}},methods:{close:function(){this.$emit("close")}}}},qazg:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a("R/Zi"),r=a("NTyV");var o=function(e){a("LE6s")},s=a("VU/8")(i.a,r.a,o,null,null);t.default=s.exports},qs7E:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a("j/99"),r=a("rkFF"),o=a("VU/8")(i.a,r.a,null,null,null);t.default=o.exports},rkFF:function(e,t,a){"use strict";var i={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-form",{staticClass:"staff_searchinfo clearfix",attrs:{inline:!0,size:t.btnsize,"label-position":"right",rules:t.rules,model:t.searchForm,"label-width":"70px"}},[a("div",{staticClass:"staff_searchinfo--input"},[a("el-form-item",{attrs:{label:"开单时间"}},[a("div",{staticClass:"block"},[a("el-date-picker",{attrs:{"default-value":t.defaultTime,type:"daterange","unlink-panels":"",align:"right","value-format":"yyyy-MM-dd","start-placeholder":"开始日期","picker-options":t.pickerOptions2,"end-placeholder":"结束日期"},model:{value:t.searchCreatTime,callback:function(e){t.searchCreatTime=e},expression:"searchCreatTime"}})],1)]),t._v(" "),a("el-form-item",{attrs:{label:t.title+"状态",prop:"recStatus"}},[a("selectType",{attrs:{type:t.type},model:{value:t.thestatus,callback:function(e){t.thestatus=e},expression:"thestatus"}},["accept"!==t.component?a("el-option",{attrs:{slot:"head",label:"全部",value:""},slot:"head"}):t._e()],1)],1),t._v(" "),a("el-form-item",{attrs:{label:"运单号"}},[a("el-input",{attrs:{maxlength:20,"auto-complete":"off",clearable:""},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.onSubmit(e):null}},model:{value:t.searchForm.shipSn,callback:function(e){t.$set(t.searchForm,"shipSn",e)},expression:"searchForm.shipSn"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"发站"}},[a("el-input",{attrs:{maxlength:20,"auto-complete":"off",clearable:""},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.onSubmit(e):null}},model:{value:t.searchForm.shipFromCityName,callback:function(e){t.$set(t.searchForm,"shipFromCityName",e)},expression:"searchForm.shipFromCityName"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"到站"}},[a("el-input",{attrs:{maxlength:20,"auto-complete":"off",clearable:""},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.onSubmit(e):null}},model:{value:t.searchForm.shipToCityName,callback:function(e){t.$set(t.searchForm,"shipToCityName",e)},expression:"searchForm.shipToCityName"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"发货人"}},[a("el-input",{attrs:{maxlength:15,clearable:"","auto-complete":"off"},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.onSubmit(e):null}},model:{value:t.searchForm.sendName,callback:function(e){t.$set(t.searchForm,"sendName",e)},expression:"searchForm.sendName"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"收货人"}},[a("el-input",{attrs:{maxlength:15,clearable:"","auto-complete":"off"},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.onSubmit(e):null}},model:{value:t.searchForm.recName,callback:function(e){t.$set(t.searchForm,"recName",e)},expression:"searchForm.recName"}})],1)],1),t._v(" "),a("el-form-item",{staticClass:"staff_searchinfo--btn"},[a("el-button",{attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v("查询")]),t._v(" "),a("el-button",{attrs:{type:"info",plain:""},on:{click:t.clearForm}},[t._v("清空")])],1)],1)},staticRenderFns:[]};t.a=i},sdyU:function(e,t,a){"use strict";var i={render:function(){var a=this,e=a.$createElement,i=a._self._c||e;return i("div",{staticClass:"table-header-wrapper"},[i("p",{staticClass:"table-header-label",attrs:{title:a.scope.column.label}},[a._v(a._s(a.scope.column.label))]),a._v(" "),a.isTime&&a.unSearch?i("el-date-picker",{attrs:{type:"date",placeholder:"选择日期时间",size:a.btnsize},on:{change:function(e){return a.changeKey(a.scope.column,a.scope.$index,e)}},nativeOn:{click:function(e){e.stopPropagation(),e.preventDefault()},keyup:function(e){return"button"in e||!a._k(e.keyCode,"enter",13,e.key,"Enter")?(t=e,a.changeEnter(a.scope.column,a.scope.$index,t)):null;var t}},model:{value:a.queryString,callback:function(e){a.queryString="string"==typeof e?e.trim():e},expression:"queryString"}}):a.isSelect&&a.curSelect.type?i("SelectType",{attrs:{placeholder:"请选择",size:a.btnsize,type:a.curSelect.type,clearable:"",filterfn:a.filterfn},on:{changeItem:function(e,t){return a.changeKey(a.scope.column,a.scope.$index,t.dictName||"")}},nativeOn:{click:function(e){e.stopPropagation(),e.preventDefault()},keyup:function(e){return"button"in e||!a._k(e.keyCode,"enter",13,e.key,"Enter")?(t=e,a.changeEnter(a.scope.column,a.scope.$index,t)):null;var t}},model:{value:a.queryString,callback:function(e){a.queryString=e},expression:"queryString"}}):a.isSelect&&!a.curSelect.type&&a.unSearch?i("el-select",{attrs:{placeholder:"请选择",clearable:"",size:a.btnsize,type:a.curSelect.type},on:{change:function(e){return a.changeKey(a.scope.column,a.scope.$index,e)}},nativeOn:{click:function(e){e.stopPropagation(),e.preventDefault()},keyup:function(e){return"button"in e||!a._k(e.keyCode,"enter",13,e.key,"Enter")?(t=e,a.changeEnter(a.scope.column,a.scope.$index,t)):null;var t}},model:{value:a.queryString,callback:function(e){a.queryString=e},expression:"queryString"}},a._l(a.curSelect.options,function(e,t){return i("el-option",{key:t,attrs:{label:e.dictName,value:e.id}})})):a.unSearch?i("el-tooltip",{attrs:{content:a.specialTypeTitle,disabled:!a.specialTypeTitle,placement:"top",effect:"light"}},[i("el-input",{staticClass:"table-header-input",attrs:{size:a.btnsize,placeholder:"搜索关键字",maxlength:50,clearable:""},on:{change:function(e){return a.changeKey(a.scope.column,a.scope.$index,e)}},nativeOn:{click:function(e){e.stopPropagation(),e.preventDefault()},keyup:function(e){return"button"in e||!a._k(e.keyCode,"enter",13,e.key,"Enter")?(t=e,a.changeEnter(a.scope.column,a.scope.$index,t)):null;var t}},model:{value:a.queryString,callback:function(e){a.queryString="string"==typeof e?e.trim():e},expression:"queryString"}})],1):a._e()],1)},staticRenderFns:[]};t.a=i},vmn5:function(e,t,a){"use strict";var i=a("i2Q8"),r=a("sdyU");var o=function(e){a("55Wa")},s=a("VU/8")(i.a,r.a,o,null,null);t.a=s.exports},z9Yg:function(e,t,a){"use strict";var i=a("Dd8w"),r=a.n(i),o=a("qs7E"),l=a("Xf+J"),s=a("NYxO"),n=a("puNT"),p=a("1onU"),c=a("0xDb"),u=a("UQm2"),d=a("qazg"),h=a("vmn5");t.a={components:{SearchForm:o.default,TableSetup:n.a,Pager:p.a,AddMark:d.default,tableHeaderSearch:h.a},computed:r()({},Object(s.mapGetters)(["otherinfo"]),{orgid:function(){}}),mounted:function(){},data:function(){var t=this;return{btnsize:"mini",component:"Send",selectInfo:{},selected:[],dotInfo:[],dataset:[],loading:!0,setupTableVisible:!1,popVisible:!1,isSend:!1,tablekey:0,total:0,searchQuery:{currentPage:1,pageSize:100,vo:{pageType:2,receiptIds:[],sendStatus:107}},tableColumn:[{label:"序号",prop:"number",width:"60",fixed:!0,slot:function(e){return(t.searchQuery.currentPage-1)*t.searchQuery.pageSize+e.$index+1}},{label:"运单号",prop:"shipSn",width:"120",fixed:!0},{label:"开单网点",prop:"fromOrgName",width:"120",fixed:!1},{label:"目的网点",prop:"toOrgName",width:"120",fixed:!1},{label:"开单日期",prop:"createTime",width:"165",slot:function(e){return""+Object(c.parseTime)(e.row.createTime,"{y}-{m}-{d} {h}:{i}:{s}")},fixed:!1},{label:"发站",prop:"shipFromCityName",width:"120",fixed:!1},{label:"到站",prop:"shipToCityName",width:"120",fixed:!1},{label:"寄出状态",prop:"sendStatusName",width:"120",fixed:!1},{label:"寄出日期",prop:"sendTime",width:"165",slot:function(e){return""+Object(c.parseTime)(e.row.sendTime,"{y}-{m}-{d} {h}:{i}:{s}")},fixed:!1},{label:"回单状态",prop:"backStatusName",width:"120",fixed:!1},{label:"回单类型",prop:"shipReceiptRequireName",width:"120",fixed:!1},{label:"回单数量",prop:"shipReceiptNum",width:"120",fixed:!1},{label:"发货人",prop:"sendName",width:"120",fixed:!1},{label:"收货人",prop:"recName",width:"120",fixed:!1},{label:"货品名",prop:"cargoName",width:"90",fixed:!1},{label:"件数",prop:"cargoAmount",width:"80",fixed:!1},{label:"重量",prop:"cargoWeight",width:"80",fixed:!1},{label:"体积",prop:"cargoVolume",width:"80",fixed:!1},{label:"付款方式",prop:"shipPayWayName",width:"120",fixed:!1},{label:"现付",prop:"shipNowpayFee",width:"80",fixed:!1},{label:"到付",prop:"shipArrivepayFee",width:"80",fixed:!1},{label:"回单付",prop:"shipReceiptpayFee",width:"90",fixed:!1},{label:"月结",prop:"shipMonthpayFee",width:"80",fixed:!1},{label:"中转承运商",prop:"carrierName",width:"120",fixed:!1},{label:"中转日期",prop:"transferTime",width:"165",slot:function(e){return""+Object(c.parseTime)(e.row.transferTime,"{y}-{m}-{d} {h}:{i}:{s}")},fixed:!1},{label:"中转单号",prop:"oddNumbers",width:"120",fixed:!1},{label:"发货人电话",prop:"sendMobile",width:"120",fixed:!1},{label:"发货地址",prop:"sendAddress",width:"120",fixed:!1},{label:"收货人电话",prop:"recMobile",width:"120",fixed:!1},{label:"收货地址",prop:"recAddress",width:"120",fixed:!1},{label:"到达省",prop:"endProvince",width:"120",fixed:!1},{label:"到达市",prop:"endCity",width:"120",fixed:!1},{label:"到达县",prop:"endArea",width:"120",fixed:!1}]}},methods:{changeKey:function(e){this.total=0,this.searchQuery=e,this.loading||this.fetchAllreceipt()},getSumLeft:function(e,t){return Object(c.getSummaries)(e,c.operationPropertyCalc)},fetchAllreceipt:function(){var t=this;return this.loading=!0,Object(l.c)(this.searchQuery).then(function(e){t.dataset=e.list,t.total=e.total,t.loading=!1}).catch(function(e){t.loading=!1,t._handlerCatchMsg(e)})},fetchData:function(){this.fetchAllreceipt()},handlePageChange:function(e){this.searchQuery.currentPage=e.pageNum,this.searchQuery.pageSize=e.pageSize,this.fetchAllreceipt()},getSearchParam:function(e){this.searchQuery.currentPage=this.$options.data().searchQuery.currentPage,this.searchQuery.pageSize=this.$options.data().searchQuery.pageSize,Object(c.objectMerge2)(this.searchQuery.vo,e),this.fetchAllreceipt()},doAction:function(e){var t=this;if("import"===e)return this.showImport(),!1;if(!this.selected.length&&"print"!==e&&"export"!==e)return this.$message({message:"请选择要操作的项~",type:"warning"}),!1;switch(e){case"export":var a=Object(c.objectMerge2)([],this.dataset),i=Object(c.objectMerge2)([],this.selected);Object(u.g)({data:i.length?i:a,columns:this.tableColumn,name:"回单寄出"});break;case"print":var r=Object(c.objectMerge2)([],this.dataset),o=Object(c.objectMerge2)([],this.selected);Object(u.d)({data:o.length?o:r,columns:this.tableColumn,name:"回单寄出"});break;case"send":var s=this.selected.filter(function(e){return 107===e.sendStatus}).map(function(e){return e.receiptId});s.length?(this.searchQuery.vo.receiptIds=s,this.dotInfo=s,this.popVisible=!0,this.isSend=!0):this.$message.warning("回单已寄出请选择未寄出项~");break;case"cancel":var n=this.selected.filter(function(e){return 108===e.sendStatus&&109===e.acceptStatus}).map(function(e){return e.receiptId});console.log(this.selected),n.length?(this.searchQuery.vo.receiptIds=n,Object(l.d)(this.searchQuery.vo).then(function(e){return t.$message({message:"取消寄出成功~",type:"success"}),t.fetchAllreceipt(),!1}).catch(function(e){t._handlerCatchMsg(e)})):this.$message.warning("回单未寄出不可取消~")}this.$refs.multipleTable.clearSelection()},setTable:function(){this.setupTableVisible=!0},setColumn:function(e){this.tableColumn=e,this.tablekey=Math.random()},closeAddDot:function(){this.popVisible=!1},closeSetupTable:function(){this.setupTableVisible=!1},clickDetails:function(e,t,a){this.$refs.multipleTable.toggleRowSelection(e)},getSelection:function(e){this.selected=e},getDbClick:function(){}}}}});