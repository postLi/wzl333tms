webpackJsonp([118,364],{"1onU":function(e,t,i){"use strict";var n=i("VT+v"),o=i("SgVa");var a=function(e){i("FiTa"),i("7CJ8")},s=i("VU/8")(n.a,o.a,a,"data-v-4b7ed4df",null);t.a=s.exports},"2hoF":function(e,t,i){"use strict";var n={render:function(){var n=this,e=n.$createElement,o=n._self._c||e;return o("div",{staticClass:"customer-manager tab-wrapper tab-wrapper-100 receivableTable"},[o("div",{staticClass:"accountsLoad_table"},[o("div",{staticClass:"transferTable_search clearfix"},[o("currentSearch",{attrs:{info:n.orgLeftTable},on:{change:n.selectCurrent}})],1),n._v(" "),o("transferTable",{staticStyle:{height:"calc(100% - 40px)",padding:"10px"}},[o("div",{attrs:{slot:"btnsBox"},slot:"btnsBox"},[o("el-button",{attrs:{type:n.isGoReceipt?"info":"success",size:"mini",icon:"el-icon-sort",disabled:n.isGoReceipt},on:{click:n.goReceipt}},[n._v("核销")])],1),n._v(" "),o("div",{staticClass:"tableHeadItemBtn",staticStyle:{height:"100%"},attrs:{slot:"tableLeft"},slot:"tableLeft"},[o("el-table",{key:n.tablekey,ref:"multipleTableRight",attrs:{data:n.leftTable,border:"","tooltip-effect":"dark",triped:"",height:"100%","summary-method":n.getSumRight,"default-sort":{prop:"id",order:"ascending"},"show-overflow-tooltip":!0,"show-summary":!0},on:{"row-click":n.clickDetailsRight,"selection-change":n.getSelectionRight,"row-dblclick":n.dclickAddItem}},[o("el-table-column",{attrs:{fixed:"",width:"50",label:"序号"},scopedSlots:n._u([{key:"default",fn:function(e){return[n._v("\n            "+n._s(e.$index+1)+"\n          ")]}}])}),n._v(" "),o("el-table-column",{attrs:{fixed:"","render-header":n.setHeader,width:"50"},scopedSlots:n._u([{key:"default",fn:function(t){return[o("el-button",{staticClass:"tableItemBtn",attrs:{size:"mini"},on:{click:function(e){n.addItem(t.row,t.$index)}}})]}}])}),n._v(" "),n._l(n.tableColumnLeft,function(i){return i.expand?n._e():[i.slot?o("el-table-column",{key:i.id,attrs:{fixed:i.fixed,sortable:"",label:i.label,width:i.width,prop:i.prop},scopedSlots:n._u([{key:"default",fn:function(t){return[i.expand?o("div",[o("el-input",{attrs:{type:"number",size:n.btnsize},on:{change:function(e){return n.changLoadData(t.$index,i.prop,e)}},model:{value:i.slot(t),callback:function(e){n.$set(i,"slot(scope)",n._n(e))},expression:"column.slot(scope)"}})],1):o("div",[i.click?o("span",{staticClass:"clickitem",domProps:{innerHTML:n._s(i.slot(t))},on:{click:function(e){e.stopPropagation(),i.click(t)}}}):o("span",{domProps:{innerHTML:n._s(i.slot(t))}})])]}}])}):o("el-table-column",{key:i.id,attrs:{fixed:i.fixed,sortable:"",label:i.label,prop:i.prop,width:i.width}})]})],2)],1),n._v(" "),o("div",{staticClass:"tableHeadItemBtn",attrs:{slot:"tableRight"},slot:"tableRight"},[o("el-table",{key:n.tablekey,ref:"multipleTableLeft",staticStyle:{height:"100%"},attrs:{data:n.rightTable,border:"","tooltip-effect":"dark",triped:"",height:"100%","summary-method":n.getSumLeft,"default-sort":{prop:"id",order:"ascending"},"show-summary":!0},on:{"row-click":n.clickDetailsLeft,"selection-change":n.getSelectionLeft,"row-dblclick":n.dclickMinusItem}},[o("el-table-column",{attrs:{fixed:"",width:"50",label:"序号"},scopedSlots:n._u([{key:"default",fn:function(e){return[n._v("\n            "+n._s(e.$index+1)+"\n          ")]}}])}),n._v(" "),o("el-table-column",{attrs:{"render-header":n.setHeader2,fixed:"",width:"50"},scopedSlots:n._u([{key:"default",fn:function(t){return[o("el-button",{staticClass:"tableItemBtnMinus",attrs:{size:"mini"},on:{click:function(e){n.minusItem(t.row,t.$index)}}})]}}])}),n._v(" "),n._l(n.tableColumnLeft,function(i){return[i.slot?o("el-table-column",{key:i.id,attrs:{fixed:i.fixed,sortable:"",label:i.label,width:i.width,prop:i.prop},scopedSlots:n._u([{key:"default",fn:function(t){return[i.expand?o("div",[o("el-input",{directives:[{name:"numberOnly",rawName:"v-numberOnly:point",arg:"point"}],class:{textChangeDanger:n.textChangeDanger[t.$index]},attrs:{value:t.row.notMonthpayFee,size:n.btnsize},on:{change:function(e){return n.changLoadData(t.$index,i.prop,e)}},nativeOn:{dblclick:function(e){e.stopPropagation(),e.preventDefault()}}})],1):o("div",[i.click?o("span",{staticClass:"clickitem",domProps:{innerHTML:n._s(i.slot(t))},on:{click:function(e){e.stopPropagation(),i.click(t)}}}):o("span",{domProps:{innerHTML:n._s(i.slot(t))}})])]}}])}):o("el-table-column",{key:i.id,attrs:{fixed:i.fixed,sortable:"",label:i.label,prop:i.prop,width:i.width}})]})],2)],1)]),n._v(" "),o("Voucher",{attrs:{popVisible:n.popVisibleDialog,info:n.infoTable,orgId:n.getRouteInfo.vo.ascriptionOrgId,btnLoading:n.btnLoading},on:{close:n.closeDialog}})],1)])},staticRenderFns:[]};t.a=n},"7CJ8":function(e,t){},"7nIZ":function(e,t,i){"use strict";t.i=function(e){return n.b.post("/api-finance/finance/tmsfinancebillrecord/v1.3/getBillRecordList/",e).then(function(e){return e.data})},t.h=function(e){return n.b.post("/api-finance/finance/tmsfinancebillrecorddetail/v1.3/getBillRecordDetailList/",e).then(function(e){return e.data})},t.j=function(e){return n.b.post("/api-finance/finance/tmsfinancebillrecord/v1.3/getVerificationBaseInfo/",e).then(function(e){return e.data})},t.g=function(e){return n.b.post("/api-finance/finance/tmsfinancebillrecord/v1.3/addIncome/",e).then(function(e){return e.data})},t.a=function(e){return n.b.post("/api-finance/finance/tmsfinancebillrecord/v1.3/cancelVerification/",e).then(function(e){return e.data})},t.f=function(e){return n.b.post("/api-finance/finance/tmsfinanceverification/v1.3/getVeryficationList/",e).then(function(e){return e.data})},t.b=function(e){return n.b.post("/api-finance//finance/tmsfinancebillrecord/v1.3/delBillRecord/",e).then(function(e){return e.data})},t.e=function(e){return n.b.post("/api-finance/finance/tmsfinancebillrecord/v1.3/getOrderList/",e).then(function(e){return e.data})},t.d=function(e){return n.b.post("/api-finance/finance/tmsfinancesubjects/v1.3/getFinanceSubjects/",e).then(function(e){return e.data})},t.c=function(e){return n.b.post("/api-finance/finance/tmsfinancebillrecord/v1.3/getBillRecordInfo",e).then(function(e){return e.data})};var n=i("Vo7i")},B6Ve:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=i("pPks"),o=i("HCdn"),a=i("VU/8")(n.a,o.a,null,null,null);t.default=a.exports},CaeW:function(e,t,i){"use strict";t.c=function(e,t){return o.b.post("/api-finance/finance/feeReceivable/v1/create/"+e,t)},t.b=function(e){return o.b.post("/api-finance/finance/feeReceivable/v1/list",e).then(function(e){return e.data||{list:[],totalCount:0}})},t.a=function(){return o.b.get("/api-finance/finance/feeReceivable/v1/getReceivableToDoCount")};var n=i("//Fk"),o=(i.n(n),i("Vo7i"))},FiTa:function(e,t){},H3Z1:function(e,t,i){"use strict";var n={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-dialog",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"incomeDialog",attrs:{title:t.dialogTitle,visible:t.isShow,"close-on-click-modal":!1,"before-close":t.closeMe},on:{"update:visible":function(e){t.isShow=e}}},[i("el-form",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],ref:"formModel",attrs:{model:t.formModel,rules:t.rules,inline:!0,"label-width":"120px"}},[i("div",{staticClass:"income_item"},[i("el-form-item",{staticClass:"formItemTextDanger",attrs:{label:"方向",prop:"verificationId"}},[i("el-select",{attrs:{filterable:"",placeholder:"请选择",size:t.btnsize},on:{change:t.selectVerificationWay},model:{value:t.formModel.verificationId,callback:function(e){t.$set(t.formModel,"verificationId",e)},expression:"formModel.verificationId"}},t._l(t.veryficationList,function(e,t){return i("el-option",{key:t,attrs:{value:e.id,label:e.verificationWay}})}))],1),t._v(" "),i("el-form-item",{attrs:{label:"发生金额",prop:"amount"}},[i("el-input",{directives:[{name:"numberOnly",rawName:"v-numberOnly:point",arg:"point"}],attrs:{placeholder:"发生金额",size:t.btnsize,maxlength:8,disabled:""},model:{value:t.formModel.amount,callback:function(e){t.$set(t.formModel,"amount",t._n(e))},expression:"formModel.amount"}})],1)],1),t._v(" "),i("div",{staticClass:"income_item"},[i("el-form-item",{class:{formItemTextDanger:"1"===t.formModel.isNeededVoucher},attrs:{label:"一级科目",prop:"1"===t.formModel.isNeededVoucher?"subjectOneId":""}},[i("el-select",{attrs:{filterable:"",placeholder:"无数据",size:t.btnsize,disabled:"1"!==t.formModel.isNeededVoucher},on:{change:function(e){return t.selectSubject(e,1)},clear:t.initSubject},model:{value:t.formModel.subjectOneId,callback:function(e){t.$set(t.formModel,"subjectOneId",e)},expression:"formModel.subjectOneId"}},t._l(t.subjectOne,function(e,t){return i("el-option",{key:t,attrs:{label:e.subjectName,value:e.id}})}))],1),t._v(" "),i("el-form-item",{attrs:{label:"凭证日期",prop:"certTime"}},[i("el-date-picker",{attrs:{type:"date",size:t.btnsize,placeholder:"选择日期",clearable:!1},model:{value:t.formModel.certTime,callback:function(e){t.$set(t.formModel,"certTime",e)},expression:"formModel.certTime"}})],1)],1),t._v(" "),i("div",{staticClass:"income_item"},[i("el-form-item",{class:0<t.subjectTwo.length?"formItemTextDanger":"",attrs:{label:"二级科目"}},[i("el-select",{attrs:{filterable:"",placeholder:"无数据",size:t.btnsize,disabled:"1"!==t.formModel.isNeededVoucher},on:{change:function(e){return t.selectSubject(e,2)}},model:{value:t.formModel.subjectTwoId,callback:function(e){t.$set(t.formModel,"subjectTwoId",e)},expression:"formModel.subjectTwoId"}},t._l(t.subjectTwo,function(e,t){return i("el-option",{key:t,attrs:{label:e.subjectName,value:e.id}})}))],1),t._v(" "),i("el-form-item",{attrs:{label:"收据号码",prop:"receiptNo"}},[i("el-input",{attrs:{placeholder:"收据号码",size:t.btnsize,maxlength:25},model:{value:t.formModel.receiptNo,callback:function(e){t.$set(t.formModel,"receiptNo",e)},expression:"formModel.receiptNo"}})],1)],1),t._v(" "),i("div",{staticClass:"income_item"},[i("el-form-item",{class:0<t.subjectThree.length?"formItemTextDanger":"",attrs:{label:"三级科目"}},[i("el-select",{attrs:{filterable:"",placeholder:"无数据",size:t.btnsize,disabled:"1"!==t.formModel.isNeededVoucher},on:{change:function(e){return t.selectSubject(e,3)}},model:{value:t.formModel.subjectThreeId,callback:function(e){t.$set(t.formModel,"subjectThreeId",e)},expression:"formModel.subjectThreeId"}},t._l(t.subjectThree,function(e,t){return i("el-option",{key:t,attrs:{label:e.subjectName,value:e.id}})}))],1),t._v(" "),i("el-form-item",{attrs:{label:"发票号码",prop:"invoiceNo"}},[i("el-input",{attrs:{placeholder:"发票号码",size:t.btnsize,maxlength:25},model:{value:t.formModel.invoiceNo,callback:function(e){t.$set(t.formModel,"invoiceNo",e)},expression:"formModel.invoiceNo"}})],1)],1),t._v(" "),i("div",{staticClass:"income_item"},[i("el-form-item",{class:0<t.subjectFour.length?"formItemTextDanger":"",attrs:{label:"四级科目"}},[i("el-select",{attrs:{filterable:"",placeholder:"无数据",size:t.btnsize,disabled:"1"!==t.formModel.isNeededVoucher},on:{change:function(e){return t.selectSubject(e,4)}},model:{value:t.formModel.subjectFourId,callback:function(e){t.$set(t.formModel,"subjectFourId",e)},expression:"formModel.subjectFourId"}},t._l(t.subjectFour,function(e,t){return i("el-option",{key:t,attrs:{label:e.subjectName,value:e.id}})}))],1),t._v(" "),i("el-form-item",{attrs:{label:"支票号码",prop:"checkNo"}},[i("el-input",{attrs:{placeholder:"支票号码",size:t.btnsize,maxlength:25},model:{value:t.formModel.checkNo,callback:function(e){t.$set(t.formModel,"checkNo",e)},expression:"formModel.checkNo"}})],1)],1),t._v(" "),i("div",{staticClass:"income_item"},[i("el-form-item",{attrs:{label:"摘要"}},[i("el-input",{attrs:{type:"textarea",placeholder:"摘要",size:t.btnsize,maxlength:50},model:{value:t.formModel.remark,callback:function(e){t.$set(t.formModel,"remark",e)},expression:"formModel.remark"}})],1),t._v(" "),i("el-form-item")],1)]),t._v(" "),i("span",{attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{type:"primary",plain:"",icon:"el-icon-document",loading:t.btnLoading},on:{click:function(e){t.submitForm("formModel")}}},[t._v("保存")]),t._v(" "),i("el-button",{attrs:{type:"warning",plain:"",icon:"el-icon-setting"},on:{click:t.setting}},[t._v("设置财务科目")]),t._v(" "),i("el-button",{attrs:{type:"danger",plain:"",icon:"el-icon-circle-close"},on:{click:t.closeMe}},[t._v("取消")])],1)],1)},staticRenderFns:[]};t.a=n},HCdn:function(e,t,i){"use strict";var n={render:function(){var i=this,e=i.$createElement,n=i._self._c||e;return n("el-autocomplete",{attrs:{size:i.btnsize,"fetch-suggestions":i.querySearch,placeholder:"请输入运单号","prefix-icon":"el-icon-search"},on:{select:i.handleSelect},scopedSlots:i._u([{key:"default",fn:function(e){var t=e.item;return[t.shipSn?n("div",{staticClass:"name"},[i._v(i._s(t.shipSn))]):n("div",{staticClass:"name"},[i._v(i._s(t.batchNo))])]}}]),model:{value:i.currentSearch,callback:function(e){i.currentSearch=e},expression:"currentSearch"}})},staticRenderFns:[]};t.a=n},IcMT:function(e,t,i){"use strict";var n=i("PI8x"),o=i("QVoP");var a=function(e){i("jCPK")},s=i("VU/8")(n.a,o.a,a,null,null);t.a=s.exports},JW1v:function(e,t,i){"use strict";t.g=function(e){return n.b.post("/api-finance/finance/tmsfinancefeepayable/v1/findListByFeeType/",e).then(function(e){return console.log("postFindListByFeeType22222222222222"),e.data||{list:[],totalCount:0}})},t.h=function(e){return n.b.post("/api-finance/finance/tmsfinancefeepayable/v1/findTransferList/",e).then(function(e){return e.data||{list:[],totalCount:0}})},t.e=function(e){return n.b.post("/api-finance/finance/tmsfinancefeepayable/v1/findAbnormalList/",e).then(function(e){return e.data||{list:[],totalCount:0}})},t.f=function(e){return n.b.post("/api-finance/finance/tmsfinancefeepayable/v1/findChangeList/",e).then(function(e){return e.data||{list:[],totalCount:0}})},t.d=function(e,t){return n.b.post("/api-finance/finance/tmsfinancefeepayable/v1/create/"+e,t).then(function(e){return e.data})},t.k=function(e){return n.b.post("/api-finance/finance/tmsfinancefeepayable/v1/payListBySummary/",e).then(function(e){return e.data||{list:[],totalCount:0}})},t.j=function(e){return n.b.post("/api-finance/finance/tmsfinancefeepayable/v1/payListByOne/",e).then(function(e){return e.data||{list:[],totalCount:0}})},t.a=function(e,t){return n.b.get("/api-finance/finance/tmsfinancecapitalflow/v1/getFeeInfo/?orgId="+e+"&paymentsType="+t)},t.i=function(e){return n.b.post("/api-finance/finance/tmsfinancefeepayable/v1/loadSettlement/",e).then(function(e){return e.data})},t.b=function(e){return n.b.post("/api-finance/finance/tmsfinancefeepayable/v1/loadVerification",e).then(function(e){return e.data})},t.c=function(e){return n.b.post("/api-finance/finance/tmsfinancefeepayable/v1/payListByHandlingFee",e).then(function(e){return e.data})};var n=i("Vo7i");i("0xDb")},PI8x:function(e,t,i){"use strict";t.a={data:function(){return{isShowLeft:!1,isShowRight:!1,isShowReback:!1,searchForm:""}},methods:{doAction:function(e){switch(e){case"showAllLeft":this.showAllLeft();break;case"showAllRight":this.showAllRight();break;case"showReback":this.showReback()}},showAllLeft:function(){this.isShowLeft=!0,this.isShowRight=!1,this.isShowReback=!0},showAllRight:function(){this.isShowLeft=!1,this.isShowRight=!0,this.isShowReback=!0},showReback:function(){this.isShowReback=!1,this.isShowLeft=!1,this.isShowRight=!1}}}},"Q36+":function(e,t,i){"use strict";var n=i("woOf"),a=i.n(n),s=(i("t5DY"),i("0xDb")),o=i("7nIZ"),r=i("JW1v"),c=i("E4LH"),l=i("CaeW");t.a={props:{popVisible:{type:Boolean,default:!1},orgId:{type:[String,Number],default:""},info:{type:[Object,Array],default:function(){return[]}}},watch:{popVisible:{handler:function(e,t){e&&this.init()},immediate:!0},info:{handler:function(e,t){console.log("voucher info-table::",e,t)},deep:!0},orgId:{handler:function(e,t){},deep:!0}},computed:{isShow:{get:function(){return this.popVisible},set:function(){}},currentPage:function(){var e=this.$route.query.currentPage;return e.substr(7,e.length)},getRouteInfo:function(){return JSON.parse(this.$route.query.searchQuery)},feeId:function(){if("handleFee"===this.$route.query.currentPage){var t=[];return this.info.orderList.forEach(function(e){"干线"===e.loadTypeName?t.push(33):"短驳"===e.loadTypeName&&t.push(32)}),this.uniqueArray(t).join(",")}return"全部核销"===this.$route.query.tab?this.uniqueArray(this.info.feeIds).join(","):(console.log("JSON.parse(this.$route.query.searchQuery).vo.feeType",JSON.parse(this.$route.query.searchQuery).vo.feeType),JSON.parse(this.$route.query.searchQuery).vo.feeType)}},data:function(){var e=function(e,t,i){c.a.ENGLISH_AND_NUMBER.test(t)||""===t?i():i(new Error("只可以输入阿拉伯数字和字母, 最多可输入25位"))};return{dialogTitle:"核销凭证",loading:!0,btnLoading:!1,btnsize:"mini",baseQuery:{orgId:"",amount:0,feeIds:""},formModel:{verificationWay:"",paymentsType:"",amount:"",certTime:"",receiptNo:"",invoiceNo:"",checkNo:"",remark:"",subjectOneName:"",subjectOneId:"",subjectTwoName:"",subjectTwoId:"",subjectThreeName:"",subjectThreeId:"",subjectFourName:"",subjectFourId:""},rules:{verificationId:[{required:!0,message:"请填写记账方向!",trigger:"blur"}],subjectOneId:[{required:!0,message:"请填写一级科目!",trigger:"blur"}],receiptNo:[{validator:e,trigger:"blur"}],invoiceNo:[{validator:e,trigger:"blur"}],checkNo:[{validator:e,trigger:"blur"}],manualCert:[{validator:e,trigger:"blur"}]},veryficationType:{},veryficationList:[],subjectOne:[],subjectTwo:[],subjectThree:[],subjectFour:[],searchQuerySub:{orgId:"",parentId:"",subjectLevel:""},paymentsType:0}},methods:{init:function(){this.baseQuery=this.$options.data().baseQuery,this.postVerificationBaseInfo(),this.formModel.amount=this.info.amount||0},postVerificationBaseInfo:function(){var i=this;this.loading=!0,this.baseQuery.orgId=this.orgId,this.baseQuery.amount=this.info.amount,console.log("getRouteInfo",this.getRouteInfo,this.feeId),this.baseQuery.feeIds=this.feeId+""||"",console.log("baseQuery",this.baseQuery,this.orgId),this.$set(this.baseQuery,"dataSrc",0),Object(o.j)(this.baseQuery).then(function(e){(i.formModel=e).verificationList&&(i.veryficationList=e.verificationList,e.verificationList.forEach(function(e,t){i.veryficationType[e.id]=e.verificationWay})),i.initSubject(),i.loading=!1}).catch(function(e){i.loading=!1,i._handlerCatchMsg(e)})},initSubject:function(){var t=this;this.getFinanceSubjects().then(function(){if(t.formModel.subjectOneId){if(!t.checkSubject(1)){for(var e in t.formModel)/^subject/.test(e)&&(t.formModel[e]="");return}t.getFinanceSubjects(2,t.formModel.subjectOneId).then(function(){if(t.formModel.subjectTwoId){if(!t.checkSubject(2)){for(var e in t.formModel)/(Four|Three|Two)/.test(e)&&(t.formModel[e]="");return}t.getFinanceSubjects(3,t.formModel.subjectTwoId).then(function(){if(t.formModel.subjectThreeId){if(!t.checkSubject(3)){for(var e in t.formModel)/(Four|Three)/.test(e)&&(t.formModel[e]="");return}t.getFinanceSubjects(4,t.formModel.subjectThreeId).then(function(){if(t.formModel.subjectFourId&&!t.checkSubject(4))return t.formModel.subjectFourId="",void(t.formModel.subjectFourName="")})}})}})}})},checkSubject:function(e){var t=this;switch(e){case 1:if(0<this.subjectOne.length)return 0!==this.subjectOne.filter(function(e){return e.id===t.formModel.subjectOneId}).length||(this.formModel.subjectOneId="",this.formModel.subjectOneName="",!1);break;case 2:if(0<this.subjectTwo.length)return 0!==this.subjectTwo.filter(function(e){return e.id===t.formModel.subjectTwoId}).length||(this.formModel.subjectTwoId="",this.formModel.subjectTwoName="",!1);break;case 3:if(0<this.subjectThree.length)return 0!==this.subjectThree.filter(function(e){return e.id===t.formModel.subjectThreeId}).length||(this.formModel.subjectThreeId="",this.formModel.subjectThreeName="",!1);break;case 4:if(0<this.subjectFour.length)return 0!==this.subjectFour.filter(function(e){return e.id===t.formModel.subjectFourId}).length||(this.formModel.subjectFourId="",this.formModel.subjectFourName="",!1)}},checkSubjectIsNull:function(){return!(0<this.subjectTwo.length)||(this.formModel.subjectTwoId?!(0<this.subjectThree.length)||(this.formModel.subjectThreeId?!(0<this.subjectFour.length)||(!!this.formModel.subjectFourId||(this.$message.warning("请填写四级科目"),!1)):(this.$message.warning("请填写三级科目"),!1)):(this.$message.warning("请填写二级科目!"),!1))},submitForm:function(e){var o=this;this.checkSubjectIsNull()&&this.$refs[e].validate(function(e){if(e)if(o.btnLoading=!0,"handleFee"===o.$route.query.currentPage){var t=a()({},o.formModel);o.info.settlementTypeSign&&o.$set(t,"settlementTypeSign",o.info.settlementTypeSign),o.$set(t,"tmsFinanceVerifiactionBillFees",o.info.orderList),o.$set(t,"orgId",o.orgId),o.$set(t,"paymentsType",o.paymentsType),o.$set(t,"dataSrc",0),t.certTime||(t.certTime=new Date),o.$set(t,"certTime",Object(s.parseTime)(t.certTime,"{y}-{m}-{d} {h}:{i}:{s}")),delete t.verificationList,console.log("保存提交的参数handleFeeInfo",t),Object(r.b)(t).then(function(e){o.$message({type:"success",message:"保存成功"}),setTimeout(function(){o.btnLoading=!1,o.eventBus.$emit("replaceCurrentView","/finance/accountsReceivable/"+o.$route.query.currentPage),o.eventBus.$emit("updateAccountsReceivableList")},500),o.closeMe()}).catch(function(e){o._handlerCatchMsg(e),o.btnLoading=!1})}else{var i=a()({},o.formModel);o.$set(i,"orderList",o.info.orderList),o.$set(i,"dataSrc",0),delete i.verificationList,i.certTime||(i.certTime=new Date),o.$set(i,"certTime",Object(s.parseTime)(i.certTime,"{y}-{m}-{d}")+" 00:00:00");var n={receivableFees:i.orderList,tmsFinanceBillRecordDto:i};delete n.tmsFinanceBillRecordDto.orderList,l.c(o.orgId,n).then(function(e){o.$message({type:"success",message:"保存成功"}),o.closeMe(),setTimeout(function(){o.btnLoading=!1,o.eventBus.$emit("replaceCurrentView","/finance/accountsReceivable/"+o.$route.query.currentPage),o.eventBus.$emit("updateAccountsReceivableList")},500)}).catch(function(e){o._handlerCatchMsg(e),o.btnLoading=!1})}})},setting:function(){this.$router.push({path:"/finance/financeInfo/subjectInfo"})},getFinanceSubjects:function(t,e){var i=this;return console.log("接口查询下级科目列表：\n",t,e),this.searchQuerySub.subjectLevel=t||"",this.searchQuerySub.parentId=e||"",this.searchQuerySub.orgId=this.orgId,Object(o.d)(this.searchQuerySub).then(function(e){switch(t){case 2:i.subjectTwo=e,i.subjectThree=[],i.subjectFour=[],console.log("科目二: ",i.subjectTwo);break;case 3:i.subjectThree=e,i.subjectFour=[],console.log("科目三: ",i.subjectThree);break;case 4:i.subjectFour=e,console.log("科目四: ",i.subjectFour);break;default:i.subjectOne=e,i.subjectTwo=[],i.subjectThree=[],i.subjectFour=[],console.log("科目一: ",i.subjectOne)}i.loading=!1,console.log("科目: ",t,e)}).catch(function(e){i.loading=!1,i._handlerCatchMsg(e)})},selectSubject:function(t,e){console.log(t);var i={};switch(e){case 1:for(var n in i=a()({},this.subjectOne.filter(function(e){return e.id===t})[0]),this.getFinanceSubjects(2,i.id),this.formModel)/^subject/.test(n)&&(this.formModel[n]="");this.formModel.subjectOneName=i.subjectName,this.formModel.subjectOneId=i.id,console.log("科目一 选中的值",i);break;case 2:for(var o in i=a()({},this.subjectTwo.filter(function(e){return e.id===t})[0]),this.getFinanceSubjects(3,i.id),this.formModel)/(Four|Three)/.test(o)&&(this.formModel[o]="");this.formModel.subjectTwoName=i.subjectName,console.log("科目二 选中的值",i);break;case 3:i=a()({},this.subjectThree.filter(function(e){return e.id===t})[0]),this.getFinanceSubjects(4,i.id),this.formModel.subjectThreeName=i.subjectName,this.formModel.subjectFourName="",this.formModel.subjectFourId="",console.log("科目三 选中的值",i);break;case 4:i=a()({},this.subjectFour.filter(function(e){return e.id===t})[0]),this.formModel.subjectFourName=i.subjectName}i={},console.log("formModel",this.formModel)},selectVerificationWay:function(t){var e;e=this.formModel.verificationList.filter(function(e){return e.id===t})[0],this.$set(this.formModel,"verificationWay",e.verificationWay),console.log("选中方向：：",e,this.formModel)},uniqueArray:function(e){for(var t=[],i=0;i<e.length;i++)-1==t.indexOf(e[i])&&t!==e[i]&&t.push(e[i]);return t},closeMe:function(e){this.$emit("close"),"function"==typeof e&&e()}}}},QVoP:function(e,t,i){"use strict";var n={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"transferTable"},[i("div",{staticClass:"transferTable_header"},[i("div",{staticClass:"transferTable_searchs"},[i("div",{staticClass:"transferTable_fresh"},[t._t("tableRefresh")],2),t._v(" "),t._t("tableSearch")],2),t._v(" "),i("div",{staticClass:"transferTable_header_btn_direction"},[i("el-tooltip",{attrs:{effect:"dark",content:"向左侧拉伸",placement:"top-end"}},[i("el-button",{attrs:{icon:"el-icon-arrow-right",type:"primary",circle:"",disabled:t.isShowLeft,size:"mini",plain:""},on:{click:function(e){t.doAction("showAllLeft")}}})],1),t._v(" "),i("el-tooltip",{attrs:{effect:"dark",content:"向右侧拉伸",placement:"top-start"}},[i("el-button",{attrs:{icon:"el-icon-arrow-left",type:"primary",circle:"",disabled:t.isShowRight,size:"mini",plain:""},on:{click:function(e){t.doAction("showAllRight")}}})],1),t._v(" "),i("transition",{attrs:{name:"el-zoom-in-bottom"}},[t.isShowReback?i("el-button",{attrs:{icon:"el-icon-refresh",type:"primary",circle:"",size:"mini",plain:""},on:{click:function(e){t.doAction("showReback")}}}):t._e()],1),t._v(" "),i("div",{staticClass:"transferTable_header_btn_box clearfix"},[t._t("btnsBox")],2)],1)]),t._v(" "),i("div",{staticClass:"transferTable_content"},[i("div",{staticClass:"transferTable_content_table paddingRight",class:[t.isShowLeft?"showTableLeft":t.isShowRight?"shortTableLeft":""]},[t._t("tableLeft",[t._v("左边表格区")])],2),t._v(" "),i("div",{staticClass:"transferTable_content_table",class:[t.isShowRight?"showTableRight":""]},[t._t("tableRight",[t._v("右边表格区")])],2)])])},staticRenderFns:[]};t.a=n},SgVa:function(e,t,i){"use strict";var n={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"tms-pagenation"},[i("span",{staticClass:"page-num",class:{disabled:t.pageNum<=1},on:{click:function(e){t.jumpTo(1)}}},[i("span",{staticClass:"first-page"})]),i("span",{staticClass:"page-num",class:{disabled:t.pageNum<=1},on:{click:function(e){t.jumpTo(t.pageNum-1)}}},[i("span",{staticClass:"prev-page"})]),t._v(" "),i("span",{staticClass:"page-jumper"},[t._v("\n    第\n    "),i("el-input",{ref:"input",staticClass:"el-pagination__editor is-in-pagination",attrs:{min:1,max:t.pages,type:"number",disabled:t.pages<=1},on:{change:t.handleChange,focus:t.handleFocus,blur:t.handleBlur},nativeOn:{keydown:function(e){return t.handleKeyup(e)}},model:{value:t.inputval,callback:function(e){t.inputval="string"==typeof e?e.trim():e},expression:"inputval"}}),t._v(" 页\n  ")],1),t._v("\n  /共 "+t._s(t.pages)+" 页\n  "),i("span",{staticClass:"page-num",class:{disabled:t.pageNum===t.pages},on:{click:function(e){t.jumpTo(t.pageNum+1)}}},[i("span",{staticClass:"next-page"})]),t._v(" "),i("span",{staticClass:"page-num",class:{disabled:t.pageNum===t.pages},on:{click:function(e){t.jumpTo(t.pages)}}},[i("span",{staticClass:"last-page"})]),t._v(" "),i("span",{staticClass:"tms-pagination__sizes"},[i("el-select",{staticClass:"page-select",attrs:{placeholder:"请选择"},on:{change:t.sizesChange},model:{value:t.size,callback:function(e){t.size=e},expression:"size"}},t._l(t.sizes,function(e,t){return i("el-option",{key:t,attrs:{label:e,value:e}})}))],1)])},staticRenderFns:[]};t.a=n},"VT+v":function(e,t,i){"use strict";t.a={props:{sizes:{type:Array,default:function(){return[100,200,300,400]}},total:{type:Number,default:0}},computed:{pages:function(){return Math.ceil(this.total/this.size)}},watch:{pageNum:function(){this.inputval=this.pageNum},size:function(){this.pageNum=1}},mounted:function(){this.size=this.sizes[0]},data:function(){return{pageNum:1,oldValue:0,inputval:1,oldNum:1,size:100}},methods:{handleFocus:function(e){this.oldValue=e.target.value},sizesChange:function(){this.pageNum=1,this.oldNum=this.pageNum,this.$emit("change",{pageNum:this.pageNum,pageSize:this.size})},changeEvent:function(){this.oldNum!==this.pageNum&&(this.oldNum=this.pageNum,this.$emit("change",{pageNum:this.pageNum,pageSize:this.size}))},handleCurrentChange:function(e){this.pageNum=e,this.changeEvent()},handleSizeChange:function(e){this.size=e,this.changeEvent()},handleChange:function(e){var t=parseInt(e,10);isNaN(t)?this.inputval=1:t<1?this.inputval=1:t>this.pages?this.inputval=this.pages:this.inputval=t},handleBlur:function(e){var t=e.target;this.handleChange(t.value),this.jumpTo(this.inputval)},handleKeyup:function(e){var t=e.keyCode,i=e.target;console.log("page keydown:",t,i),13===t&&this.oldValue&&i.value!==this.oldValue&&(this.handleChange(i.value),this.oldValue="")},jumpTo:function(e){e<1?this.pageNum=1:e>this.pages?this.pageNum=this.pages:this.pageNum=e,this.changeEvent()}}}},YBsd:function(e,t,i){"use strict";var n=i("Q36+"),o=i("H3Z1"),a=i("VU/8")(n.a,o.a,null,null,null);t.a=a.exports},bEIv:function(e,t,i){"use strict";var n=i("bOdI"),o=i.n(n),a=i("woOf"),s=i.n(a),r=i("CaeW"),c=(i("Mqi+"),i("JW1v"),i("IcMT")),l=i("0xDb"),u=i("pAQG"),f=i("1onU"),h=i("B6Ve"),d=i("YBsd");t.a={components:{transferTable:c.a,querySelect:u.a,Pager:f.a,currentSearch:h.default,Voucher:d.a},data:function(){var i=this;return{btnLoading:!1,infoTable:{amount:0,orderList:[]},textChangeDanger:[],currentSearch:"",tablekey:"",truckMessage:"",formModel:{},loading:!1,popVisibleDialog:!1,btnsize:"mini",tableReceiptInfo:[],orgLeftTable:[],selectedRight:[],selectedLeft:[],isGoReceipt:!0,leftTable:[],rightTable:[],orgData:{left:[],right:[]},isFresh:!1,feeType:8,searchQuery:{currentPage:1,pageSize:100,vo:{}},tableColumnLeft:[{label:"运单号",prop:"shipSn",width:"120",fixed:!1},{label:"开单网点",prop:"shipFromOrgName",width:"120",fixed:!1},{label:"核销状态",prop:"totalStatusCn",width:"120"},{label:"签收状态",prop:"signStatus",width:"100",fixed:!1},{label:"发货人",prop:"shipSenderName",width:"120",fixed:!1},{label:"收货人",prop:"shipReceiverName",width:"120",fixed:!1},{label:"月结",prop:"monthpayFee"},{label:"月结核销状态",prop:"monthpayStateCn"},{label:"已核销月结",prop:"finishMonthpayFee",slot:function(e){var t=e.row;return i._setTextColor(t.monthpayFee,t.finishMonthpayFee,t.notMonthpayFee,t.finishMonthpayFee)}},{label:"未核销月结",prop:"notMonthpayFee",slot:function(e){var t=e.row;return i._setTextColor(t.monthpayFee,t.finishMonthpayFee,t.notMonthpayFee,t.notMonthpayFee)}},{label:"实结月付",prop:"inputMonthpayFee",fixed:!1,expand:!0,slot:function(e){return e.row.inputMonthpayFee}},{label:"发货方",prop:"senderCustomerUnit"},{label:"收货方",prop:"receiverCustomerUnit"},{label:"货号",prop:"shipGoodsSn",width:"120",fixed:!1},{label:"开单时间",prop:"createTime",width:"150",fixed:!1,slot:function(e){return""+Object(l.parseTime)(e.row.createTime)}},{label:"出发城市",prop:"shipFromCityName",width:"120",fixed:!1},{label:"到达城市",prop:"shipToCityName",width:"120",fixed:!1},{label:"货品名",prop:"cargoName",width:"120",fixed:!1},{label:"件数",prop:"cargoAmount",width:"120",fixed:!1},{label:"重量",prop:"cargoWeight",width:"120",fixed:!1},{label:"体积",prop:"cargoVolume",width:"120",fixed:!1},{label:"运单备注",prop:"shipRemarks",width:"120",fixed:!1}]}},computed:{getRouteInfo:function(){console.log("xxxxxxxxxxxxxxxxxx222:",this.$route.query,JSON.parse(this.$route.query.searchQuery));var e=this.$route.query;return JSON.parse(e.searchQuery)},totalLeft:function(){return this.leftTable.length},totalRight:function(){return this.rightTable.length}},watch:{"$route.query":{handler:function(e,t){e&&this.getList()},deep:!0}},mounted:function(){this.getList()},methods:{handlePageChangeLeft:function(e){this.searchQuery.currentPage=e.pageNum,this.searchQuery.pageSize=e.pageSize},initLeftParams:function(){this.$route.query?(this.$set(this.searchQuery.vo,"feeType",this.getRouteInfo.vo.feeType),this.searchQuery.vo.ascriptionOrgId=this.otherinfo.orgid,this.$set(this.searchQuery.vo,"status",""),this.isFresh=!1):(this.eventBus.$emit("replaceCurrentView","/finance/accountsReceivable"),this.isFresh=!0)},setRight:function(e){e.inputNowPayFee=e.notNowPayFee,e.inputArrivepayFee=e.notArrivepayFee,e.inputReceiptpayFee=e.notReceiptpayFee,e.inputMonthpayFee=e.notMonthpayFee,e.inputChangeFee=e.notChangeFee,this.$set(this.rightTable,this.rightTable.length,e)},getList:function(){var i=this;this.loading=!0;var t=Object(l.objectMerge2)([],JSON.parse(this.$route.query.selectListShipSns));JSON.parse(this.$route.query.selectListShipSns)?this.isModify=!0:this.isModify=!1,this.leftTable=this.$options.data().leftTable,this.rightTable=this.$options.data().rightTable,this.infoTable=this.$options.data().infoTable,this.orgLeftTable=this.$options.data().orgLeftTable,this.initLeftParams(),this.isFresh||r.b(this.searchQuery).then(function(e){i.leftTable=s()([],e.list.filter(function(e){return/(NOSETTLEMENT|PARTSETTLEMENT)/.test(e.monthpayState)})),t.forEach(function(t){i.leftTable.forEach(function(e){t===e.shipSn&&i.setRight(e)})}),i.rightTable.length<1?i.isGoReceipt=!0:i.isGoReceipt=!1,i.rightTable.forEach(function(e){e.inputBrokerageFee=e.unpaidFee;var t=i.leftTable.indexOf(e);-1!==t&&i.leftTable.splice(t,1)}),i.orgLeftTable=Object(l.objectMerge2)([],i.leftTable)}).catch(function(e){i.loading=!1,i._handlerCatchMsg(e)})},changLoadData:function(e,t,i){return this.$set(this.rightTable,e,s()(this.rightTable[e],o()({},t,Number(i)))),this.rightTable[e].notMonthpayFee!==i?this.textChangeDanger[e]=!0:this.textChangeDanger[e]=!1,Number(i)<0||Number(i)>this.rightTable[e].notMonthpayFee?(this.isGoReceipt=!0,this.$message({type:"warning",message:"实结费用不小于0，不大于未核销费用。"})):this.isGoReceipt=!1,!1},clickDetailsRight:function(e){this.$refs.multipleTableRight.toggleRowSelection(e)},clickDetailsLeft:function(e){this.$refs.multipleTableLeft.toggleRowSelection(e)},getSelectionRight:function(e){this.selectedRight=e},getSelectionLeft:function(e){this.selectedLeft=e},changeTableKey:function(){this.tablekey=Math.random()},doAction:function(e){switch(e){case"goLeft":this.goLeft();break;case"goRight":this.goRight()}},goLeft:function(){var i=this;0===this.selectedRight.length?this.$message({type:"warning",message:"请在左边表格选择数据"}):(this.selectedRight.forEach(function(t,e){t.inputBrokerageFee=t.unpaidFee,i.setRight(t),i.rightTable=Object(l.objectMerge2)([],i.rightTable).filter(function(e){return e.shipSn!==t.shipSn}),i.rightTable.push(t),i.leftTable=Object(l.objectMerge2)([],i.leftTable).filter(function(e){return e.shipSn!==t.shipSn}),i.orgLeftTable=Object(l.objectMerge2)([],i.orgLeftTable).filter(function(e){return e.shipSn!==t.shipSn})}),this.selectedRight=[]),this.rightTable.length<1?this.isGoReceipt=!0:this.isGoReceipt=!1},goRight:function(){var i=this;0===this.selectedLeft.length?this.$message({type:"warning",message:"请在右边表格选择数据"}):(this.selectedLeft.forEach(function(t,e){i.leftTable=Object(l.objectMerge2)([],i.leftTable).filter(function(e){return e.shipSn!==t.shipSn}),i.orgLeftTable=Object(l.objectMerge2)([],i.orgLeftTable).filter(function(e){return e.shipSn!==t.shipSn}),i.leftTable.push(t),i.orgLeftTable.push(t),i.rightTable=Object(l.objectMerge2)([],i.rightTable).filter(function(e){return e.shipSn!==t.shipSn})}),this.selectedLeft=[]),this.rightTable.length<1?this.isGoReceipt=!0:this.isGoReceipt=!1},selectCurrent:function(e,t){this.addItem(e,t)},addItem:function(e,t){this.selectedRight=[],this.selectedRight[t]=e,this.doAction("goLeft")},minusItem:function(e,t){this.selectedLeft=[],this.selectedLeft[t]=e,this.doAction("goRight")},addALLList:function(){this.selectedRight=s()([],this.leftTable),this.doAction("goLeft")},minusAllList:function(){this.selectedLeft=s()([],this.rightTable),this.doAction("goRight")},dclickAddItem:function(e,t){this.selectedRight=[],this.selectedRight.push(e),this.doAction("goLeft")},dclickMinusItem:function(e,t){this.selectedLeft=[],this.selectedLeft.push(e),this.doAction("goRight")},closeDialog:function(){this.popVisibleDialog=!1},openDialog:function(){this.popVisibleDialog=!0},goReceipt:function(){var i=this;if(this.infoTable=this.$options.data().infoTable,!this.isGoReceipt){var n=0;this.rightTable.forEach(function(e,t){n=l.tmsMath._add(n,e.inputMonthpayFee),e.inputMonthpayFee&&0<e.notMonthpayFee&&e.inputMonthpayFee<=e.notMonthpayFee&&i.infoTable.orderList.push(e)}),this.infoTable.amount=n,0<this.infoTable.orderList.length?this.openDialog():this.$message({type:"warning",message:"暂无可核销项！实结费用不小于0，不大于未核销费用。"})}},getSumRight:function(e){return Object(l.getSummaries)(e)},getSumLeft:function(e){return Object(l.getSummaries)(e)},setHeader:function(e,t){t.column;return e("el-button",{props:{size:"mini"},class:{tableAllBtn:!0,setTableHeader:!0},on:{click:this.addALLList}})},setHeader2:function(e,t){t.column;return e("el-button",{props:{size:"mini"},class:{tableAllBtnMinus:!0,setTableHeader:!0},on:{click:this.minusAllList}})}}}},jCPK:function(e,t){},nXTq:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=i("bEIv"),o=i("2hoF");var a=function(e){i("y1m7")},s=i("VU/8")(n.a,o.a,a,null,null);t.default=s.exports},pPks:function(e,t,i){"use strict";var n=i("0xDb");t.a={props:{info:{type:Array,default:[]}},data:function(){return{currentSearch:"",btnsize:"mini"}},methods:{querySearch:function(e,t){(void 0===(this.currentSearch=e).shipSn||e.batchNo)&&(this.currentSearch||this.$emit("change",Object(n.objectMerge2)([],this.info)));var i=this.info;t(e?i.filter(this.createFilter(e)):i)},createFilter:function(t){return function(e){return e.shipSn?-1!==e.shipSn.toLowerCase().indexOf(t.toLowerCase()):e.batchNo?-1!==e.batchNo.toLowerCase().indexOf(t.toLowerCase()):void 0}},handleSelect:function(e){e.shipSn?this.currentSearch=e.shipSn:e.batchNo&&(this.currentSearch=e.batchNo);[].push(e),this.currentSearch="",this.$emit("change",e,this.info.indexOf(e))}}}},y1m7:function(e,t){}});