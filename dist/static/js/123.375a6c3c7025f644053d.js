webpackJsonp([123,262,359],{"1onU":function(e,t,i){"use strict";var n=i("VT+v"),a=i("SgVa");var s=function(e){i("FiTa"),i("7CJ8")},o=i("VU/8")(n.a,a.a,s,"data-v-4b7ed4df",null);t.a=o.exports},"7CJ8":function(e,t){},"8SVc":function(e,t){},B6Ve:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=i("pPks"),a=i("HCdn"),s=i("VU/8")(n.a,a.a,null,null,null);t.default=s.exports},CaeW:function(e,t,i){"use strict";t.c=function(e,t){return a.b.post("/api-finance/finance/feeReceivable/v1/create/"+e,t)},t.b=function(e){return a.b.post("/api-finance/finance/feeReceivable/v1/list",e).then(function(e){return e.data||{list:[],totalCount:0}})},t.a=function(){return a.b.get("/api-finance/finance/feeReceivable/v1/getReceivableToDoCount")};var n=i("//Fk"),a=(i.n(n),i("Vo7i"))},DuDq:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=i("ZYUm"),a=i("lNpE");var s=function(e){i("8SVc")},o=i("VU/8")(n.a,a.a,s,null,null);t.default=o.exports},FiTa:function(e,t){},HCdn:function(e,t,i){"use strict";var n={render:function(){var i=this,e=i.$createElement,n=i._self._c||e;return n("el-autocomplete",{attrs:{size:i.btnsize,"fetch-suggestions":i.querySearch,placeholder:"请输入运单号","prefix-icon":"el-icon-search"},on:{select:i.handleSelect},scopedSlots:i._u([{key:"default",fn:function(e){var t=e.item;return[t.shipSn?n("div",{staticClass:"name"},[i._v(i._s(t.shipSn))]):n("div",{staticClass:"name"},[i._v(i._s(t.batchNo))])]}}]),model:{value:i.currentSearch,callback:function(e){i.currentSearch=e},expression:"currentSearch"}})},staticRenderFns:[]};t.a=n},Hd1C:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=i("crE8"),a=i("UGwY"),s=i("VU/8")(n.a,a.a,null,null,null);t.default=s.exports},IcMT:function(e,t,i){"use strict";var n=i("PI8x"),a=i("QVoP");var s=function(e){i("jCPK")},o=i("VU/8")(n.a,a.a,s,null,null);t.a=o.exports},JW1v:function(e,t,i){"use strict";t.e=function(e){return n.b.post("/api-finance/finance/tmsfinancefeepayable/v1/findListByFeeType/",e).then(function(e){return e.data||{list:[],totalCount:0}}).catch(function(e){Object(a.handleErrorMsg)(e)})},t.f=function(e){return n.b.post("/api-finance/finance/tmsfinancefeepayable/v1/findTransferList/",e).then(function(e){return e.data||{list:[],totalCount:0}}).catch(function(e){Object(a.handleErrorMsg)(e)})},t.c=function(e){return n.b.post("/api-finance/finance/tmsfinancefeepayable/v1/findAbnormalList/",e).then(function(e){return e.data||{list:[],totalCount:0}}).catch(function(e){Object(a.handleErrorMsg)(e)})},t.d=function(e){return n.b.post("/api-finance/finance/tmsfinancefeepayable/v1/findChangeList/",e).then(function(e){return e.data||{list:[],totalCount:0}}).catch(function(e){Object(a.handleErrorMsg)(e)})},t.b=function(e,t){return n.b.post("/api-finance/finance/tmsfinancefeepayable/v1/create/"+e,t).then(function(e){return e.data}).catch(function(e){Object(a.handleErrorMsg)(e)})},t.i=function(e){return n.b.post("/api-finance/finance/tmsfinancefeepayable/v1/payListBySummary/",e).then(function(e){return e.data||{list:[],totalCount:0}}).catch(function(e){Object(a.handleErrorMsg)(e)})},t.h=function(e){return n.b.post("/api-finance/finance/tmsfinancefeepayable/v1/payListByOne/",e).then(function(e){return e.data||{list:[],totalCount:0}}).catch(function(e){Object(a.handleErrorMsg)(e)})},t.a=function(e,t){return n.b.get("/api-finance/finance/tmsfinancecapitalflow/v1/getFeeInfo/?orgId="+e+"&paymentsType="+t)},t.g=function(e){return n.b.post("/api-finance/finance/tmsfinancefeepayable/v1/loadSettlement/",e).then(function(e){return e.data}).catch(function(e){Object(a.handleErrorMsg)(e)})};var n=i("Vo7i"),a=i("0xDb")},PI8x:function(e,t,i){"use strict";t.a={data:function(){return{isShowLeft:!1,isShowRight:!1,isShowReback:!1,searchForm:""}},methods:{doAction:function(e){switch(e){case"showAllLeft":this.showAllLeft();break;case"showAllRight":this.showAllRight();break;case"showReback":this.showReback()}},showAllLeft:function(){this.isShowLeft=!0,this.isShowRight=!1,this.isShowReback=!0},showAllRight:function(){this.isShowLeft=!1,this.isShowRight=!0,this.isShowReback=!0},showReback:function(){this.isShowReback=!1,this.isShowLeft=!1,this.isShowRight=!1}}}},QVoP:function(e,t,i){"use strict";var n={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"transferTable"},[i("div",{staticClass:"transferTable_header"},[i("div",{staticClass:"transferTable_searchs"},[i("div",{staticClass:"transferTable_fresh"},[t._t("tableRefresh")],2),t._v(" "),t._t("tableSearch")],2),t._v(" "),i("div",{staticClass:"transferTable_header_btn_direction"},[i("el-tooltip",{attrs:{effect:"dark",content:"向左侧拉伸",placement:"top-end"}},[i("el-button",{attrs:{icon:"el-icon-arrow-right",type:"primary",circle:"",disabled:t.isShowLeft,size:"mini",plain:""},on:{click:function(e){t.doAction("showAllLeft")}}})],1),t._v(" "),i("el-tooltip",{attrs:{effect:"dark",content:"向右侧拉伸",placement:"top-start"}},[i("el-button",{attrs:{icon:"el-icon-arrow-left",type:"primary",circle:"",disabled:t.isShowRight,size:"mini",plain:""},on:{click:function(e){t.doAction("showAllRight")}}})],1),t._v(" "),i("transition",{attrs:{name:"el-zoom-in-bottom"}},[t.isShowReback?i("el-button",{attrs:{icon:"el-icon-refresh",type:"primary",circle:"",size:"mini",plain:""},on:{click:function(e){t.doAction("showReback")}}}):t._e()],1),t._v(" "),i("div",{staticClass:"transferTable_header_btn_box clearfix"},[t._t("btnsBox")],2)],1)]),t._v(" "),i("div",{staticClass:"transferTable_content"},[i("div",{staticClass:"transferTable_content_table paddingRight",class:[t.isShowLeft?"showTableLeft":t.isShowRight?"shortTableLeft":""]},[t._t("tableLeft",[t._v("左边表格区")])],2),t._v(" "),i("div",{staticClass:"transferTable_content_table",class:[t.isShowRight?"showTableRight":""]},[t._t("tableRight",[t._v("右边表格区")])],2)])])},staticRenderFns:[]};t.a=n},SgVa:function(e,t,i){"use strict";var n={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"tms-pagenation"},[i("span",{staticClass:"page-num",class:{disabled:t.pageNum<=1},on:{click:function(e){t.jumpTo(1)}}},[i("span",{staticClass:"first-page"})]),i("span",{staticClass:"page-num",class:{disabled:t.pageNum<=1},on:{click:function(e){t.jumpTo(t.pageNum-1)}}},[i("span",{staticClass:"prev-page"})]),t._v(" "),i("span",{staticClass:"page-jumper"},[t._v("\n    第\n    "),i("el-input",{ref:"input",staticClass:"el-pagination__editor is-in-pagination",attrs:{min:1,max:t.pages,type:"number",disabled:t.pages<=1},on:{change:t.handleChange,focus:t.handleFocus,blur:t.handleBlur},nativeOn:{keydown:function(e){return t.handleKeyup(e)}},model:{value:t.inputval,callback:function(e){t.inputval="string"==typeof e?e.trim():e},expression:"inputval"}}),t._v(" 页\n  ")],1),t._v("\n  /共 "+t._s(t.pages)+" 页\n  "),i("span",{staticClass:"page-num",class:{disabled:t.pageNum===t.pages},on:{click:function(e){t.jumpTo(t.pageNum+1)}}},[i("span",{staticClass:"next-page"})]),t._v(" "),i("span",{staticClass:"page-num",class:{disabled:t.pageNum===t.pages},on:{click:function(e){t.jumpTo(t.pages)}}},[i("span",{staticClass:"last-page"})]),t._v(" "),i("span",{staticClass:"tms-pagination__sizes"},[i("el-select",{staticClass:"page-select",attrs:{placeholder:"请选择"},on:{change:t.sizesChange},model:{value:t.size,callback:function(e){t.size=e},expression:"size"}},t._l(t.sizes,function(e,t){return i("el-option",{key:t,attrs:{label:e,value:e}})}))],1)])},staticRenderFns:[]};t.a=n},UGwY:function(e,t,i){"use strict";var n={render:function(){var i=this,e=i.$createElement,n=i._self._c||e;return n("el-dialog",{directives:[{name:"loading",rawName:"v-loading",value:i.loading,expression:"loading"}],staticClass:"receiptDialog",attrs:{title:i.dialogTitle,visible:i.isShow,"close-on-click-modal":!1,"before-close":i.closeMe},on:{"update:visible":function(e){i.isShow=e}}},[n("el-form",{ref:"formModel",attrs:{model:i.formModel,rules:i.rules}},[n("div",{staticClass:"receiptDialog_head"},[n("div",{staticClass:"receiptDialog_head_item"},[n("label",[i._v("单据号")]),i._v(" "),n("el-input",{attrs:{placeholder:"请输入",size:i.btnsize,disabled:""},model:{value:i.formModel.settlementSn,callback:function(e){i.$set(i.formModel,"settlementSn",e)},expression:"formModel.settlementSn"}})],1),i._v(" "),n("div",{staticClass:"receiptDialog_head_item"},[n("label",[i._v("发生时间")]),i._v(" "),n("el-date-picker",{attrs:{size:i.btnsize,"value-format":"yyyy-MM-dd HH:mm:ss",type:"date"},model:{value:i.formModel.settlementTime,callback:function(e){i.$set(i.formModel,"settlementTime",e)},expression:"formModel.settlementTime"}})],1),i._v(" "),n("div",{staticClass:"receiptDialog_head_item"},[n("label",[i._v("经办人")]),i._v(" "),n("querySelect",{attrs:{orgid:i.otherinfo.orgid,show:"select",size:i.btnsize,valuekey:"name",search:"name",label:"name"},model:{value:i.formModel.settlementBy,callback:function(e){i.$set(i.formModel,"settlementBy",e)},expression:"formModel.settlementBy"}})],1)]),i._v(" "),n("div",{staticClass:"receiptDialog_table"},[n("el-table",{staticStyle:{width:"100%",height:"100%"},attrs:{data:i.formModel.detailDtoList2,height:"100%",stripe:"","show-summary":"","summary-method":i.getSum}},[n("el-table-column",{attrs:{prop:"date",label:"序号",type:"index",width:"70"}}),i._v(" "),n("el-table-column",{attrs:{prop:"dataName",label:"费用项"}}),i._v(" "),n("el-table-column",[n("el-table-column",{attrs:{prop:"tenMillion",label:"千",width:"40"}}),i._v(" "),n("el-table-column",{attrs:{prop:"million",label:"百",width:"40"}}),i._v(" "),n("el-table-column",{attrs:{prop:"oneHundrenThousand",label:"十",width:"40"}}),i._v(" "),n("el-table-column",{attrs:{prop:"tenThousand",label:"万",width:"40"}}),i._v(" "),n("el-table-column",{attrs:{prop:"thousand",label:"千",width:"40"}}),i._v(" "),n("el-table-column",{attrs:{prop:"hundren",label:"百",width:"40"}}),i._v(" "),n("el-table-column",{attrs:{prop:"ten",label:"十",width:"40"}}),i._v(" "),n("el-table-column",{attrs:{prop:"yuan",label:"元",width:"40"}}),i._v(" "),n("el-table-column",{attrs:{prop:"jiao",label:"角",width:"40"}}),i._v(" "),n("el-table-column",{attrs:{prop:"fen",label:"分",width:"40"}})],1)],1)],1),i._v(" "),n("div",{staticClass:"receiptDialog_todo"},[n("el-button",{staticClass:"tableBtnAdd",attrs:{size:"mini"},on:{click:i.plusItem}}),i._v(" "),n("el-table",{staticStyle:{width:"100%"},attrs:{data:i.formModel.szDtoList,border:"",height:"100%",stripe:""}},[n("el-table-column",{attrs:{fixed:"",width:"50"},scopedSlots:i._u([{key:"default",fn:function(t){return[n("el-button",{staticClass:"tableBtnMinus",attrs:{size:"mini"},on:{click:function(e){i.minusItem(t.row,t.$index)}}})]}}])}),i._v(" "),n("el-table-column",{attrs:{prop:"financialWay",label:"收支方式",width:"100"},scopedSlots:i._u([{key:"default",fn:function(t){return[n("el-autocomplete",{attrs:{"popper-class":"querySelectItem",size:i.btnsize,"fetch-suggestions":i.querySearch,placeholder:"支付方式"},on:{select:function(e){return i.sender(e,t.$index)}},scopedSlots:i._u([{key:"default",fn:function(e){var t=e.item;return i._l(i.BANK_INFO,function(e){return n("span",[i._v(i._s(t[e]))])})}}]),model:{value:t.row.financialWay,callback:function(e){i.$set(t.row,"financialWay",e)},expression:"props.row.financialWay"}})]}}])}),i._v(" "),n("el-table-column",{attrs:{prop:"bankName",label:"银行名称"},scopedSlots:i._u([{key:"default",fn:function(t){return[n("el-input",{attrs:{size:i.btnsize},model:{value:t.row.bankName,callback:function(e){i.$set(t.row,"bankName",e)},expression:"props.row.bankName"}})]}}])}),i._v(" "),n("el-table-column",{attrs:{prop:"bankAccount",label:"银行卡号"},scopedSlots:i._u([{key:"default",fn:function(t){return[n("el-input",{attrs:{size:i.btnsize},model:{value:t.row.bankAccount,callback:function(e){i.$set(t.row,"bankAccount",e)},expression:"props.row.bankAccount"}})]}}])}),i._v(" "),n("el-table-column",{attrs:{prop:"bankAccountName",label:"开户人"},scopedSlots:i._u([{key:"default",fn:function(t){return[n("el-input",{attrs:{size:i.btnsize},model:{value:t.row.bankAccountName,callback:function(e){i.$set(t.row,"bankAccountName",e)},expression:"props.row.bankAccountName"}})]}}])}),i._v(" "),n("el-table-column",{attrs:{prop:"chequeNumber",label:"支票号码"},scopedSlots:i._u([{key:"default",fn:function(t){return[n("el-input",{attrs:{size:i.btnsize},model:{value:t.row.chequeNumber,callback:function(e){i.$set(t.row,"chequeNumber",e)},expression:"props.row.chequeNumber"}})]}}])}),i._v(" "),n("el-table-column",{attrs:{prop:"receivableNumber",label:"汇款号码"},scopedSlots:i._u([{key:"default",fn:function(t){return[n("el-input",{attrs:{size:i.btnsize},model:{value:t.row.receivableNumber,callback:function(e){i.$set(t.row,"receivableNumber",e)},expression:"props.row.receivableNumber"}})]}}])}),i._v(" "),n("el-table-column",{attrs:{prop:"wechatAccount",label:"微信号"},scopedSlots:i._u([{key:"default",fn:function(t){return[n("el-input",{attrs:{size:i.btnsize},model:{value:t.row.wechatAccount,callback:function(e){i.$set(t.row,"wechatAccount",e)},expression:"props.row.wechatAccount"}})]}}])}),i._v(" "),n("el-table-column",{attrs:{prop:"alipayAccount",label:"支付宝号"},scopedSlots:i._u([{key:"default",fn:function(t){return[n("el-input",{attrs:{size:i.btnsize},model:{value:t.row.alipayAccount,callback:function(e){i.$set(t.row,"alipayAccount",e)},expression:"props.row.alipayAccount"}})]}}])}),i._v(" "),n("el-table-column",{attrs:{prop:"agent",label:"经办人",width:"110"},scopedSlots:i._u([{key:"default",fn:function(t){return[n("querySelect",{attrs:{orgid:i.otherinfo.orgid,show:"select",size:i.btnsize,valuekey:"name",search:"name",label:"name"},model:{value:t.row.agent,callback:function(e){i.$set(t.row,"agent",e)},expression:"props.row.agent"}})]}}])})],1)],1),i._v(" "),n("div",{staticClass:"receiptDialog_remark"},[n("label",[i._v("备注")]),i._v(" "),n("el-input",{attrs:{placeholder:"最多可输入300个字符",size:i.btnsize,maxlength:300},model:{value:i.formModel.remark,callback:function(e){i.$set(i.formModel,"remark",e)},expression:"formModel.remark"}})],1)]),i._v(" "),n("div",{attrs:{slot:"footer"},slot:"footer"},[n("el-button",{attrs:{type:"primary",size:i.btnsize,icon:"el-icon-document"},on:{click:function(e){i.submitForm("formModel")}}},[i._v("保存")]),i._v(" "),n("el-button",{attrs:{type:"primary",size:i.btnsize,icon:"el-icon-printer"},on:{click:i.print}},[i._v("保存并打印")]),i._v(" "),n("el-button",{attrs:{type:"danger",size:i.btnsize,icon:"el-icon-circle-close-outline"},on:{click:i.closeMe}},[i._v("取 消")])],1)],1)},staticRenderFns:[]};t.a=n},"VT+v":function(e,t,i){"use strict";t.a={props:{sizes:{type:Array,default:function(){return[100,200,300,400]}},total:{type:Number,default:0}},computed:{pages:function(){return Math.ceil(this.total/this.size)}},watch:{pageNum:function(){this.inputval=this.pageNum},size:function(){this.pageNum=1}},mounted:function(){this.size=this.sizes[0]},data:function(){return{pageNum:1,oldValue:0,inputval:1,oldNum:1,size:100}},methods:{handleFocus:function(e){this.oldValue=e.target.value},sizesChange:function(){this.pageNum=1,this.oldNum=this.pageNum,this.$emit("change",{pageNum:this.pageNum,pageSize:this.size})},changeEvent:function(){this.oldNum!==this.pageNum&&(this.oldNum=this.pageNum,this.$emit("change",{pageNum:this.pageNum,pageSize:this.size}))},handleCurrentChange:function(e){this.pageNum=e,this.changeEvent()},handleSizeChange:function(e){this.size=e,this.changeEvent()},handleChange:function(e){var t=parseInt(e,10);isNaN(t)?this.inputval=1:t<1?this.inputval=1:t>this.pages?this.inputval=this.pages:this.inputval=t},handleBlur:function(e){var t=e.target;this.handleChange(t.value),this.jumpTo(this.inputval)},handleKeyup:function(e){var t=e.keyCode,i=e.target;console.log("page keydown:",t,i),13===t&&this.oldValue&&i.value!==this.oldValue&&(this.handleChange(i.value),this.oldValue="")},jumpTo:function(e){e<1?this.pageNum=1:e>this.pages?this.pageNum=this.pages:this.pageNum=e,this.changeEvent()}}}},ZYUm:function(e,t,i){"use strict";var n=i("bOdI"),a=i.n(n),s=i("woOf"),o=i.n(s),l=i("CaeW"),r=(i("Mqi+"),i("JW1v"),i("IcMT")),c=i("0xDb"),u=i("pAQG"),h=i("Hd1C"),f=i("1onU"),p=i("B6Ve");t.a={components:{transferTable:r.a,querySelect:u.a,Receipt:h.default,Pager:f.a,currentSearch:p.default},data:function(){var i=this;return{textChangeDanger:[],currentSearch:"",tablekey:"",truckMessage:"",formModel:{},loading:!1,popVisibleDialog:!1,btnsize:"mini",tableReceiptInfo:[],orgLeftTable:[],selectedRight:[],selectedLeft:[],isGoReceipt:!0,leftTable:[],rightTable:[],orgData:{left:[],right:[]},isFresh:!1,feeType:8,searchQuery:{currentPage:1,pageSize:100,vo:{}},tableColumnLeft:[{label:"运单号",prop:"shipSn",width:"120",fixed:!1},{label:"开单网点",prop:"shipFromOrgName",width:"120",fixed:!1},{label:"结算状态",prop:"totalStatusCn",width:"120"},{label:"签收状态",prop:"signStatus",width:"100",fixed:!1},{label:"发货人",prop:"shipSenderName",width:"120",fixed:!1},{label:"收货人",prop:"shipReceiverName",width:"120",fixed:!1},{label:"回单付",prop:"receiptpayFee"},{label:"回单付结算状态",prop:"receiptpayStateCn"},{label:"已结回单付",width:"100",prop:"finishReceiptpayFee",slot:function(e){var t=e.row;return i._setTextColor(t.receiptpayFee,t.finishReceiptpayFee,t.notReceiptpayFee,t.finishReceiptpayFee)}},{label:"未结回单付",width:"100",prop:"notReceiptpayFee",slot:function(e){var t=e.row;return i._setTextColor(t.receiptpayFee,t.finishReceiptpayFee,t.notReceiptpayFee,t.notReceiptpayFee)}},{label:"实结回单付",prop:"inputReceiptpayFee",fixed:!1,expand:!0,slot:function(e){return e.row.inputReceiptpayFee}},{label:"发货方",prop:"senderCustomerUnit"},{label:"收货方",prop:"receiverCustomerUnit"},{label:"货号",prop:"shipGoodsSn",width:"120",fixed:!1},{label:"开单时间",prop:"createTime",width:"150",fixed:!1,slot:function(e){return""+Object(c.parseTime)(e.row.createTime)}},{label:"出发城市",prop:"shipFromCityName",width:"120",fixed:!1},{label:"到达城市",prop:"shipToCityName",width:"120",fixed:!1},{label:"货品名",prop:"cargoName",width:"120",fixed:!1},{label:"件数",prop:"cargoAmount",width:"120",fixed:!1},{label:"重量",prop:"cargoWeight",width:"120",fixed:!1},{label:"体积",prop:"cargoVolume",width:"120",fixed:!1},{label:"运单备注",prop:"shipRemarks",width:"120",fixed:!1}]}},computed:{getRouteInfo:function(){return this.$route.query.searchQuery},totalLeft:function(){return this.leftTable.length},totalRight:function(){return this.rightTable.length}},mounted:function(){this.getList()},methods:{handlePageChangeLeft:function(e){this.searchQuery.currentPage=e.pageNum,this.searchQuery.pageSize=e.pageSize},initLeftParams:function(){this.$route.query.searchQuery.vo?(this.$set(this.searchQuery.vo,"feeType",this.getRouteInfo.vo.feeType),this.searchQuery.vo.ascriptionOrgId=this.otherinfo.orgid,this.$set(this.searchQuery.vo,"status",""),this.isFresh=!1):(this.eventBus.$emit("replaceCurrentView","/finance/accountsReceivable"),this.isFresh=!0)},setRight:function(e){e.inputNowPayFee=e.notNowPayFee,e.inputArrivepayFee=e.notArrivepayFee,e.inputReceiptpayFee=e.notReceiptpayFee,e.inputMonthpayFee=e.notMonthpayFee,e.inputChangeFee=e.notChangeFee,this.$set(this.rightTable,this.rightTable.length,e)},getList:function(){var i=this,t=Object(c.objectMerge2)([],this.$route.query.selectListShipSns);this.$route.query.selectListShipSns?this.isModify=!0:this.isModify=!1,this.leftTable=this.$options.data().leftTable,this.rightTable=this.$options.data().rightTable,this.tableReceiptInfo=this.$options.data().tableReceiptInfo,this.orgLeftTable=this.$options.data().orgLeftTable,this.initLeftParams(),this.isFresh||l.b(this.searchQuery).then(function(e){i.leftTable=o()([],e.list.filter(function(e){return/(NOSETTLEMENT|PARTSETTLEMENT)/.test(e.receiptpayState)})),t.forEach(function(t){i.leftTable.forEach(function(e){t===e.shipSn&&i.setRight(e)})}),i.rightTable.length<1?i.isGoReceipt=!0:i.isGoReceipt=!1,i.rightTable.forEach(function(e){e.inputBrokerageFee=e.unpaidFee;var t=i.leftTable.indexOf(e);-1!==t&&i.leftTable.splice(t,1)}),i.orgLeftTable=Object(c.objectMerge2)([],i.leftTable)}).catch(function(e){i.loading=!1,i._handlerCatchMsg(e)})},changLoadData:function(e,t,i){return this.$set(this.rightTable,e,o()(this.rightTable[e],a()({},t,Number(i)))),this.rightTable[e].notReceiptpayFee!==i?this.textChangeDanger[e]=!0:this.textChangeDanger[e]=!1,!1},clickDetailsRight:function(e){this.$refs.multipleTableRight.toggleRowSelection(e)},clickDetailsLeft:function(e){this.$refs.multipleTableLeft.toggleRowSelection(e)},getSelectionRight:function(e){this.selectedRight=e},getSelectionLeft:function(e){this.selectedLeft=e},changeTableKey:function(){this.tablekey=Math.random()},doAction:function(e){switch(e){case"goLeft":this.goLeft();break;case"goRight":this.goRight()}},goLeft:function(){var t=this;0===this.selectedRight.length?this.$message({type:"warning",message:"请在左边表格选择数据"}):(this.selectedRight.forEach(function(i,e){i.inputBrokerageFee=i.unpaidFee,t.setRight(i);var n=-1;t.leftTable.map(function(e,t){e.shipSn===i.shipSn&&(n=t)}),-1!==n&&(t.leftTable.splice(n,1),t.orgLeftTable.splice(n,1))}),this.selectedRight=[]),this.rightTable.length<1?this.isGoReceipt=!0:this.isGoReceipt=!1},goRight:function(){var i=this;0===this.selectedLeft.length?this.$message({type:"warning",message:"请在右边表格选择数据"}):(this.selectedLeft.forEach(function(t,e){i.leftTable=Object(c.objectMerge2)([],i.leftTable).filter(function(e){return e.shipSn!==t.shipSn}),i.orgLeftTable=Object(c.objectMerge2)([],i.orgLeftTable).filter(function(e){return e.shipSn!==t.shipSn}),i.leftTable.push(t),i.orgLeftTable.push(t),i.rightTable=Object(c.objectMerge2)([],i.rightTable).filter(function(e){return e.shipSn!==t.shipSn})}),this.selectedLeft=[]),this.rightTable.length<1?this.isGoReceipt=!0:this.isGoReceipt=!1},selectCurrent:function(e,t){this.addItem(e,t)},addItem:function(e,t){this.selectedRight=[],this.selectedRight[t]=e,this.doAction("goLeft")},minusItem:function(e,t){this.selectedLeft=[],this.selectedLeft[t]=e,this.doAction("goRight")},addALLList:function(){this.selectedRight=o()([],this.leftTable),this.doAction("goLeft")},minusAllList:function(){this.selectedLeft=o()([],this.rightTable),this.doAction("goRight")},closeDialog:function(){this.popVisibleDialog=!1},openDialog:function(){this.popVisibleDialog=!0},goReceipt:function(){var n=this;this.tableReceiptInfo=[],this.isGoReceipt||(this.rightTable.forEach(function(e,t){var i={shipId:e.shipId,shipSn:e.shipSn};e.inputReceiptpayFee&&0<e.notReceiptpayFee&&e.inputReceiptpayFee<=e.notReceiptpayFee&&n.tableReceiptInfo.push(o()({dataName:"回单付",amount:e.inputReceiptpayFee,inputReceiptpayFee:e.inputReceiptpayFee},i))}),0<this.tableReceiptInfo.length?this.openDialog():this.$message({type:"warning",message:"暂无可结算项！实结费用不小于0，不大于未结费用。"}))},getSumRight:function(e){return Object(c.getSummaries)(e)},getSumLeft:function(e){return Object(c.getSummaries)(e)},setHeader:function(e,t){t.column;return e("el-button",{props:{size:"mini"},class:{tableAllBtn:!0,setTableHeader:!0},on:{click:this.addALLList}})},setHeader2:function(e,t){t.column;return e("el-button",{props:{size:"mini"},class:{tableAllBtnMinus:!0,setTableHeader:!0},on:{click:this.minusAllList}})}}}},bOdI:function(e,t,i){"use strict";t.__esModule=!0;var n,a=i("C4MV"),s=(n=a)&&n.__esModule?n:{default:n};t.default=function(e,t,i){return t in e?(0,s.default)(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}},crE8:function(e,t,i){"use strict";var n=i("woOf"),s=i.n(n),a=i("Dd8w"),o=i.n(a),l=(i("E4LH"),i("NYxO")),r=i("JW1v"),c=i("CaeW"),u=i("t5DY"),h=i("0xDb"),f=i("Q0Ca"),p=i("pAQG"),d=i("UQm2"),m=i("xAap");t.a={components:{querySelect:p.a},data:function(){return{amount:0,amountMessage:"",financialWalList:[],formModel:{szDtoList:[],detailDtoList2:[]},loading:!0,rules:{},btnsize:"mini",dialogTitle:"结 算 收 款 单",submitData:{},BANK_INFO:["financialWay","bankName","bankAccount","bankAccountName","chequeNumber","receivableNumber","wechatAccount","alipayAccount","agent"],paymentsType:0}},computed:o()({},Object(l.b)(["otherinfo"]),{isShow:{get:function(){return this.popVisible},set:function(){}},getRouteInfo:function(){return this.$route.query.searchQuery},settlementTypeId:function(){return 178},dataName:function(){switch(this.$route.query.currentPage){case"batchShort":return"短驳费";case"batchDeliver":return"送货费";case"batchInsurance":return"整车保险费";case"batchStationLoad":return"发站装卸费";case"batchStationOther":return"发站其他费";case"batchArrivalLoad":return"到站装卸费";case"batchArrivalOther":return"到站其他费";case"waybillKickback":return"回扣"}}}),props:{popVisible:{type:Boolean,default:!1},info:{type:Array,default:function(){return[]}}},watch:{popVisible:function(){this.popVisible?(this.isShow=!0,this.getFeeInfo()):this.isShow=!1},info:function(e){if(e)return this.info}},mounted:function(){var e=this;this.postTmsFfinancialwayList(),this.$nextTick(function(){e.init()})},methods:{print:function(){var e=s()(this.formModel);this.$set(e,"amountMessage",this.amountMessage),Object(d.g)(e),this.submitForm("formModel")},postTmsFfinancialwayList:function(){var t=this,e={currentPage:1,pageSize:100,vo:{financialWay:"",financialWayTypeId:"",orgId:this.otherinfo.orgid,status:""}};Object(m.b)(e).then(function(e){t.financialWalList=[],e.list.forEach(function(e){"启用"===e.statusStr&&t.financialWalList.push(e)})}).catch(function(e){t.loading=!1,t._handlerCatchMsg(e)})},querySearch:function(e,t){var i=this.financialWalList;t(e?i.filter(this.createFilter(e)):i)},createFilter:function(t){return function(e){return 0===e.financialWay.toLowerCase().indexOf(t.toLowerCase())}},init:function(){this.loading=!1},getFeeInfo:function(){var t=this,e=this.otherinfo.orgid;return Object(r.a)(e,this.paymentsType).then(function(e){t.formModel=e.data,t.formModel.detailDtoList2=[],t.formModel.settlementTime=Object(h.parseTime)(new Date),t.formModel.settlementBy=t.otherinfo.name,t.initDetailDtoList(),t.formModel.szDtoList.length?t.formModel.szDtoList.forEach(function(e){e.agent=t.otherinfo.name}):t.plusItem()}).catch(function(e){t.loading=!1,t._handlerCatchMsg(e)})},initDetailDtoList:function(){var a=this;this.formModel.amount=0,this.formModel.detailDtoList=s()([],this.info);var t={};for(var e in this.formModel.detailDtoList.map(function(e){t[e.dataName]?t[e.dataName].amount+=e.amount:t[e.dataName]=e}),t)this.formModel.detailDtoList2.push(t[e]);this.formModel.detailDtoList2.forEach(function(e,t){a.formModel.amount+=e.amount;var i=e.amount.toFixed(2).toString().split("").reverse(),n=i.indexOf(".");-1!==n&&i.splice(n,1),e.fen=i[0],e.jiao=i[1],e.yuan=i[2],e.ten=i[3],e.hundren=i[4],e.thousand=i[5],e.tenThousand=i[6],e.oneHundrenThousand=i[7],e.million=i[8],e.tenMillion=i[9]}),this.amountMessage=Object(f.smalltoBIG)(this.formModel.amount),this.amount=this.formModel.amount.toFixed(2).toString().split("").reverse();var i=this.amount.indexOf(".");-1!==i&&this.amount.splice(i,1)},sender:function(e,t){this.$set(this.formModel.szDtoList,t,s()(this.formModel.szDtoList[t],e))},getSystemTime:function(){var t=this;Object(u.f)().then(function(e){t.formModel.settlementTime=new Date(e.trim())}).catch(function(e){t.loading=!1,t._handlerCatchMsg(e)})},closeMe:function(e){this.$emit("close"),"function"==typeof e&&e()},setData:function(){this.submitData.capitalFlow={amount:this.formModel.amount,orgId:this.otherinfo.orgid,paymentsType:1,settlementBy:this.formModel.settlementBy,settlementSn:this.formModel.settlementSn,settlementTime:this.formModel.settlementTime,remark:this.formModel.remark},this.$set(this.submitData,"receivableFees",this.formModel.detailDtoList),this.$set(this.submitData,"financialWayLogs",this.formModel.szDtoList)},submitForm:function(e){var t=this;this.$refs[e].validate(function(e){e&&(t.setData(),c.c(t.$route.query.searchQuery.vo.ascriptionOrgId,t.submitData).then(function(e){t.$message({type:"success",message:"保存成功"}),t.closeMe(),t.eventBus.$emit("replaceCurrentView","/finance/accountsReceivable/"+t.$route.query.currentPage),t.eventBus.$emit("updateAccountsReceivableList")}).catch(function(e){t._handlerCatchMsg(e)}))})},minusItem:function(e,t){var i=this.formModel.szDtoList.indexOf(e);-1!==i&&this.formModel.szDtoList.splice(i,1)},plusItem:function(){this.formModel.szDtoList.push({agent:"",alipayAccount:"",bankAccount:"",bankAccountName:"",bankName:"",chequeNumber:"",financialWay:"",flowId:"",receivableNumber:"",rnum:"",wechatAccount:""})},getSum:function(e){var s=this,t=e.columns,o=e.data,l=[];return this.$nextTick(function(){}),t.forEach(function(t,e){if(0!==e)if(1!==e){for(var i=-2,n=12;2<n;n--)if(i++,e===n)return void(l[e]=s.amount[i]);var a=o.map(function(e){return Number(e[t.property])});a.every(function(e){return isNaN(e)})?l[e]="":(l[e]=a.reduce(function(e,t){var i=Number(t);return isNaN(i)?e:e+t},0),l[e]+="")}else l[e]=s.amountMessage;else l[e]="合计"}),l}}}},jCPK:function(e,t){},lNpE:function(e,t,i){"use strict";var n={render:function(){var n=this,e=n.$createElement,a=n._self._c||e;return a("div",{staticClass:"customer-manager tab-wrapper tab-wrapper-100"},[a("div",{staticClass:"accountsLoad_table"},[a("div",{staticClass:"transferTable_search clearfix"},[a("currentSearch",{attrs:{info:n.orgLeftTable},on:{change:n.selectCurrent}})],1),n._v(" "),a("transferTable",{staticStyle:{height:"calc(100% - 40px)",padding:"10px"}},[a("div",{attrs:{slot:"btnsBox"},slot:"btnsBox"},[a("el-button",{attrs:{type:n.isGoReceipt?"info":"success",size:"mini",icon:"el-icon-sort",disabled:n.isGoReceipt},on:{click:n.goReceipt}},[n._v("结算")])],1),n._v(" "),a("div",{staticClass:"tableHeadItemBtn",staticStyle:{height:"100%"},attrs:{slot:"tableLeft"},slot:"tableLeft"},[a("el-table",{key:n.tablekey,ref:"multipleTableRight",attrs:{data:n.leftTable,border:"","tooltip-effect":"dark",triped:"",height:"100%","summary-method":n.getSumRight,"default-sort":{prop:"id",order:"ascending"},"show-overflow-tooltip":!0,"show-summary":!0},on:{"row-click":n.clickDetailsRight,"selection-change":n.getSelectionRight}},[a("el-table-column",{attrs:{fixed:"",width:"50",label:"序号"},scopedSlots:n._u([{key:"default",fn:function(e){return[n._v("\n            "+n._s(e.$index+1)+"\n          ")]}}])}),n._v(" "),a("el-table-column",{attrs:{fixed:"","render-header":n.setHeader,width:"50"},scopedSlots:n._u([{key:"default",fn:function(t){return[a("el-button",{staticClass:"tableItemBtn",attrs:{size:"mini"},on:{click:function(e){n.addItem(t.row,t.$index)}}})]}}])}),n._v(" "),n._l(n.tableColumnLeft,function(i){return i.expand?n._e():[i.slot?a("el-table-column",{key:i.id,attrs:{fixed:i.fixed,sortable:"",label:i.label,width:i.width,prop:i.prop},scopedSlots:n._u([{key:"default",fn:function(t){return[i.expand?a("div",[a("el-input",{attrs:{type:"number",size:n.btnsize},on:{change:function(e){return n.changLoadData(t.$index,i.prop,e)}},model:{value:i.slot(t),callback:function(e){n.$set(i,"slot(scope)",n._n(e))},expression:"column.slot(scope)"}})],1):a("div",[i.click?a("span",{staticClass:"clickitem",domProps:{innerHTML:n._s(i.slot(t))},on:{click:function(e){e.stopPropagation(),i.click(t)}}}):a("span",{domProps:{innerHTML:n._s(i.slot(t))}})])]}}])}):a("el-table-column",{key:i.id,attrs:{fixed:i.fixed,sortable:"",label:i.label,prop:i.prop,width:i.width}})]})],2)],1),n._v(" "),a("div",{staticClass:"tableHeadItemBtn",attrs:{slot:"tableRight"},slot:"tableRight"},[a("el-table",{key:n.tablekey,ref:"multipleTableLeft",staticStyle:{height:"100%"},attrs:{data:n.rightTable,border:"","tooltip-effect":"dark",triped:"",height:"100%","summary-method":n.getSumLeft,"default-sort":{prop:"id",order:"ascending"},"show-summary":!0},on:{"row-click":n.clickDetailsLeft,"selection-change":n.getSelectionLeft}},[a("el-table-column",{attrs:{fixed:"",width:"50",label:"序号"},scopedSlots:n._u([{key:"default",fn:function(e){return[n._v("\n            "+n._s(e.$index+1)+"\n          ")]}}])}),n._v(" "),a("el-table-column",{attrs:{"render-header":n.setHeader2,fixed:"",width:"50"},scopedSlots:n._u([{key:"default",fn:function(t){return[a("el-button",{staticClass:"tableItemBtnMinus",attrs:{size:"mini"},on:{click:function(e){n.minusItem(t.row,t.$index)}}})]}}])}),n._v(" "),n._l(n.tableColumnLeft,function(i){return[i.slot?a("el-table-column",{key:i.id,attrs:{fixed:i.fixed,sortable:"",label:i.label,width:i.width,prop:i.prop},scopedSlots:n._u([{key:"default",fn:function(t){return[i.expand?a("div",[a("el-input",{class:{textChangeDanger:n.textChangeDanger[t.$index]},attrs:{value:t.row.notReceiptpayFee,size:n.btnsize},on:{change:function(e){return n.changLoadData(t.$index,i.prop,e)}},nativeOn:{dblclick:function(e){e.stopPropagation(),e.preventDefault()}}})],1):a("div",[i.click?a("span",{staticClass:"clickitem",domProps:{innerHTML:n._s(i.slot(t))},on:{click:function(e){e.stopPropagation(),i.click(t)}}}):a("span",{domProps:{innerHTML:n._s(i.slot(t))}})])]}}])}):a("el-table-column",{key:i.id,attrs:{fixed:i.fixed,sortable:"",label:i.label,prop:i.prop,width:i.width}})]})],2)],1)]),n._v(" "),a("Receipt",{attrs:{popVisible:n.popVisibleDialog,info:n.tableReceiptInfo},on:{close:n.closeDialog}})],1)])},staticRenderFns:[]};t.a=n},pPks:function(e,t,i){"use strict";var n=i("0xDb");t.a={props:{info:{type:Array,default:[]}},data:function(){return{currentSearch:"",btnsize:"mini"}},methods:{querySearch:function(e,t){(void 0===(this.currentSearch=e).shipSn||e.batchNo)&&(this.currentSearch||this.$emit("change",Object(n.objectMerge2)([],this.info)));var i=this.info;t(e?i.filter(this.createFilter(e)):i)},createFilter:function(t){return function(e){return e.shipSn?-1!==e.shipSn.toLowerCase().indexOf(t.toLowerCase()):e.batchNo?-1!==e.batchNo.toLowerCase().indexOf(t.toLowerCase()):void 0}},handleSelect:function(e){e.shipSn?this.currentSearch=e.shipSn:e.batchNo&&(this.currentSearch=e.batchNo);[].push(e),this.currentSearch="",this.$emit("change",e,this.info.indexOf(e))}}}}});
//# sourceMappingURL=123.375a6c3c7025f644053d.js.map