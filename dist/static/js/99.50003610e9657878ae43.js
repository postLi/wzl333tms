webpackJsonp([99,374],{"6f/H":function(e,t,i){"use strict";var n={render:function(){var i=this,e=i.$createElement,n=i._self._c||e;return n("el-autocomplete",{attrs:{size:i.btnsize,"fetch-suggestions":i.querySearch,placeholder:i.placeholderText,"prefix-icon":"el-icon-search"},on:{select:i.handleSelect},scopedSlots:i._u([{key:"default",fn:function(e){var t=e.item;return[t.shipSn?n("div",{staticClass:"name"},[i._v(i._s(t.shipSn))]):n("div",{staticClass:"name"},[i._v(i._s(t.batchNo))])]}}]),model:{value:i.currentSearch,callback:function(e){i.currentSearch=e},expression:"currentSearch"}})},staticRenderFns:[]};t.a=n},"7nIZ":function(e,t,i){"use strict";t.i=function(e){return n.b.post("/api-finance/finance/tmsfinancebillrecord/v1.3/getBillRecordList/",e).then(function(e){return e.data})},t.h=function(e){return n.b.post("/api-finance/finance/tmsfinancebillrecorddetail/v1.3/getBillRecordDetailList/",e).then(function(e){return e.data})},t.j=function(e){return n.b.post("/api-finance/finance/tmsfinancebillrecord/v1.3/getVerificationBaseInfo/",e).then(function(e){return e.data})},t.g=function(e){return n.b.post("/api-finance/finance/tmsfinancebillrecord/v1.3/addIncome/",e).then(function(e){return e.data})},t.a=function(e){return n.b.post("/api-finance/finance/tmsfinancebillrecord/v1.3/cancelVerification/",e).then(function(e){return e.data})},t.f=function(e){return n.b.post("/api-finance/finance/tmsfinanceverification/v1.3/getVeryficationList/",e).then(function(e){return e.data})},t.b=function(e){return n.b.post("/api-finance//finance/tmsfinancebillrecord/v1.3/delBillRecord/",e).then(function(e){return e.data})},t.e=function(e){return n.b.post("/api-finance/finance/tmsfinancebillrecord/v1.3/getOrderList/",e).then(function(e){return e.data})},t.d=function(e){return n.b.post("/api-finance/finance/tmsfinancesubjects/v1.3/getFinanceSubjects/",e).then(function(e){return e.data})},t.c=function(e){return n.b.post("/api-finance/finance/tmsfinancebillrecord/v1.3/getBillRecordInfo",e).then(function(e){return e.data})};var n=i("Vo7i")},"8Nas":function(e,t,i){"use strict";var n=i("0xDb");t.a={props:{info:{type:Array,default:[]}},data:function(){return{currentSearch:"",btnsize:"mini"}},computed:{placeholderText:{get:function(){return-1!==this.$route.query.currentPage.indexOf("batch")?"请输入批次号":"请输入运单号"},set:function(){}}},methods:{querySearch:function(e,t){(void 0===(this.currentSearch=e).shipSn||e.batchNo)&&(this.currentSearch||this.$emit("change",Object(n.objectMerge2)([],this.info)));var i=this.info;t(e?i.filter(this.createFilter(e)):i)},createFilter:function(t){return function(e){return e.shipSn?-1!==e.shipSn.toLowerCase().indexOf(t.toLowerCase()):e.batchNo?-1!==e.batchNo.toLowerCase().indexOf(t.toLowerCase()):void 0}},handleSelect:function(e){e.shipSn?this.currentSearch=e.shipSn:e.batchNo&&(this.currentSearch=e.batchNo);[].push(e),this.currentSearch="",this.$emit("change",e,this.info.indexOf(e))}}}},DT23:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=i("8Nas"),o=i("6f/H"),a=i("VU/8")(n.a,o.a,null,null,null);t.default=a.exports},IcMT:function(e,t,i){"use strict";var n=i("PI8x"),o=i("QVoP");var a=function(e){i("jCPK")},r=i("VU/8")(n.a,o.a,a,null,null);t.a=r.exports},JW1v:function(e,t,i){"use strict";t.g=function(e){return n.b.post("/api-finance/finance/tmsfinancefeepayable/v1/findListByFeeType/",e).then(function(e){return console.log("postFindListByFeeType22222222222222"),e.data||{list:[],totalCount:0}})},t.h=function(e){return n.b.post("/api-finance/finance/tmsfinancefeepayable/v1/findTransferList/",e).then(function(e){return e.data||{list:[],totalCount:0}})},t.e=function(e){return n.b.post("/api-finance/finance/tmsfinancefeepayable/v1/findAbnormalList/",e).then(function(e){return e.data||{list:[],totalCount:0}})},t.f=function(e){return n.b.post("/api-finance/finance/tmsfinancefeepayable/v1/findChangeList/",e).then(function(e){return e.data||{list:[],totalCount:0}})},t.d=function(e,t){return n.b.post("/api-finance/finance/tmsfinancefeepayable/v1/create/"+e,t).then(function(e){return e.data})},t.k=function(e){return n.b.post("/api-finance/finance/tmsfinancefeepayable/v1/payListBySummary/",e).then(function(e){return e.data||{list:[],totalCount:0}})},t.j=function(e){return n.b.post("/api-finance/finance/tmsfinancefeepayable/v1/payListByOne/",e).then(function(e){return e.data||{list:[],totalCount:0}})},t.a=function(e,t){return n.b.get("/api-finance/finance/tmsfinancecapitalflow/v1/getFeeInfo/?orgId="+e+"&paymentsType="+t)},t.i=function(e){return n.b.post("/api-finance/finance/tmsfinancefeepayable/v1/loadSettlement/",e).then(function(e){return e.data})},t.b=function(e){return n.b.post("/api-finance/finance/tmsfinancefeepayable/v1/loadVerification",e).then(function(e){return e.data})},t.c=function(e){return n.b.post("/api-finance/finance/tmsfinancefeepayable/v1/payListByHandlingFee",e).then(function(e){return e.data})};var n=i("Vo7i");i("0xDb")},PI8x:function(e,t,i){"use strict";t.a={data:function(){return{isShowLeft:!1,isShowRight:!1,isShowReback:!1,searchForm:""}},methods:{doAction:function(e){switch(e){case"showAllLeft":this.showAllLeft();break;case"showAllRight":this.showAllRight();break;case"showReback":this.showReback()}},showAllLeft:function(){this.isShowLeft=!0,this.isShowRight=!1,this.isShowReback=!0},showAllRight:function(){this.isShowLeft=!1,this.isShowRight=!0,this.isShowReback=!0},showReback:function(){this.isShowReback=!1,this.isShowLeft=!1,this.isShowRight=!1}}}},QVoP:function(e,t,i){"use strict";var n={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"transferTable"},[i("div",{staticClass:"transferTable_header"},[i("div",{staticClass:"transferTable_searchs"},[i("div",{staticClass:"transferTable_fresh"},[t._t("tableRefresh")],2),t._v(" "),t._t("tableSearch")],2),t._v(" "),i("div",{staticClass:"transferTable_header_btn_direction"},[i("el-tooltip",{attrs:{effect:"dark",content:"向左侧拉伸",placement:"top-end"}},[i("el-button",{attrs:{icon:"el-icon-arrow-right",type:"primary",circle:"",disabled:t.isShowLeft,size:"mini",plain:""},on:{click:function(e){t.doAction("showAllLeft")}}})],1),t._v(" "),i("el-tooltip",{attrs:{effect:"dark",content:"向右侧拉伸",placement:"top-start"}},[i("el-button",{attrs:{icon:"el-icon-arrow-left",type:"primary",circle:"",disabled:t.isShowRight,size:"mini",plain:""},on:{click:function(e){t.doAction("showAllRight")}}})],1),t._v(" "),i("transition",{attrs:{name:"el-zoom-in-bottom"}},[t.isShowReback?i("el-button",{attrs:{icon:"el-icon-refresh",type:"primary",circle:"",size:"mini",plain:""},on:{click:function(e){t.doAction("showReback")}}}):t._e()],1),t._v(" "),i("div",{staticClass:"transferTable_header_btn_box clearfix"},[t._t("btnsBox")],2)],1)]),t._v(" "),i("div",{staticClass:"transferTable_content"},[i("div",{staticClass:"transferTable_content_table paddingRight",class:[t.isShowLeft?"showTableLeft":t.isShowRight?"shortTableLeft":""]},[t._t("tableLeft",[t._v("左边表格区")])],2),t._v(" "),i("div",{staticClass:"transferTable_content_table",class:[t.isShowRight?"showTableRight":""]},[t._t("tableRight",[t._v("右边表格区")])],2)])])},staticRenderFns:[]};t.a=n},URbh:function(e,t,i){"use strict";var n=i("woOf"),a=i.n(n),o=(i("t5DY"),i("0xDb")),r=i("E4LH"),s=i("7nIZ"),l=i("JW1v");t.a={props:{popVisible:{type:Boolean,default:!1},orgId:{type:[String,Number],default:""},info:{type:[Object,Array],default:function(){return[]}}},watch:{popVisible:{handler:function(e,t){e&&this.init()},immediate:!0},info:{handler:function(e,t){console.log("voucher info-table::",e,t)},deep:!0}},computed:{isShow:{get:function(){return this.popVisible},set:function(){}},currentPage:function(){var e=this.$route.query.currentPage;return e.substr(5,e.length)},dataName:function(){switch(this.$route.query.currentPage){case"batchShort":return"短驳费";case"batchDeliver":return"送货费";case"batchInsurance":return"整车保险费";case"batchStationLoad":return"发站装卸费";case"batchStationOther":return"发站其他费";case"batchArriveLoad":return"到站装卸费";case"batchArrivalOther":return"到站其他费";case"handleFee":return"操作费"}},getRouteInfo:function(){return JSON.parse(this.$route.query.searchQuery)},feeId:function(){var e=this.$route.query.currentPage;if("batchTruckAll"===e||"batchArrivalAll"===e||"handleFee"===e){var t=[];return this.info.orderList.forEach(function(e){t.push(e.feeTypeId)}),(t=this.uniqueArray(t)).join(",")}return JSON.parse(this.$route.query.searchQuery).vo.feeTypeId},fiOrderType:function(){switch(this.$route.query.currentPage){case"batchShort":return 2;case"batchDeliver":return 3;case"batchInsurance":case"batchStationLoad":case"batchStationOther":case"batchArriveLoad":case"batchArrivalOther":case"batchTruckAll":case"batchArrivalAll":return 1}}},data:function(){var e=function(e,t,i){r.a.ENGLISH_AND_NUMBER.test(t)||""===t?i():i(new Error("只可以输入阿拉伯数字和字母, 最多可输入25位"))};return{btnLoading:!1,dialogTitle:"核销凭证",loading:!0,btnsize:"mini",baseQuery:{orgId:"",amount:0,feeIds:""},formModel:{verificationWay:"",paymentsType:"",amount:"",certTime:"",receiptNo:"",invoiceNo:"",checkNo:"",remark:"",subjectOneName:"",subjectOneId:"",subjectTwoName:"",subjectTwoId:"",subjectThreeName:"",subjectThreeId:"",subjectFourName:"",subjectFourId:""},rules:{verificationId:[{required:!0,message:"请填写记账方向!",trigger:"blur"}],subjectOneId:[{required:!0,message:"请填写一级科目!",trigger:"blur"}],receiptNo:[{validator:e,trigger:"blur"}],invoiceNo:[{validator:e,trigger:"blur"}],checkNo:[{validator:e,trigger:"blur"}],manualCert:[{validator:e,trigger:"blur"}]},veryficationType:{},veryficationList:[],subjectOne:[],subjectTwo:[],subjectThree:[],subjectFour:[],searchQuerySub:{orgId:"",parentId:"",subjectLevel:""},paymentsType:1}},methods:{init:function(){this.baseQuery=this.$options.data().baseQuery,this.postVerificationBaseInfo(),this.formModel.amount=this.info.amount||0},postVerificationBaseInfo:function(){var i=this;this.loading=!0,this.baseQuery.orgId=this.orgId,this.baseQuery.amount=this.info.amount,console.log("getRouteInfo",this.getRouteInfo,this.feeId),this.baseQuery.feeIds=this.feeId+"",this.$set(this.baseQuery,"dataSrc",0),this.$set(this.baseQuery,"companyId",this.otherinfo.companyId),Object(s.j)(this.baseQuery).then(function(e){e&&(i.subjectOne=e.subOneList||[],i.subjectTwo=e.subTwoList||[],i.subjectThree=e.subThreeList||[],i.subjectFour=e.subFourList||[],i.formModel=e,i.loading=!1,e.verificationList&&(i.veryficationList=e.verificationList,e.verificationList.forEach(function(e,t){i.veryficationType[e.id]=e.verificationWay})))}).catch(function(e){i.loading=!1,i._handlerCatchMsg(e)})},initSubject:function(){var t=this;this.getFinanceSubjects().then(function(){if(t.formModel.subjectOneId){if(!t.checkSubject(1)){for(var e in t.formModel)/^subject/.test(e)&&(t.formModel[e]="");return}t.getFinanceSubjects(2,t.formModel.subjectOneId).then(function(){if(t.formModel.subjectTwoId){if(!t.checkSubject(2)){for(var e in t.formModel)/(Four|Three|Two)/.test(e)&&(t.formModel[e]="");return}t.getFinanceSubjects(3,t.formModel.subjectTwoId).then(function(){if(t.formModel.subjectThreeId){if(!t.checkSubject(3)){for(var e in t.formModel)/(Four|Three)/.test(e)&&(t.formModel[e]="");return}t.getFinanceSubjects(4,t.formModel.subjectThreeId).then(function(){if(t.formModel.subjectFourId&&!t.checkSubject(4))return t.formModel.subjectFourId="",void(t.formModel.subjectFourName="")})}})}})}})},checkSubject:function(e){var t=this;switch(e){case 1:if(0<this.subjectOne.length)return 0!==this.subjectOne.filter(function(e){return e.id===t.formModel.subjectOneId}).length||(this.formModel.subjectOneId="",this.formModel.subjectOneName="",!1);break;case 2:if(0<this.subjectTwo.length)return 0!==this.subjectTwo.filter(function(e){return e.id===t.formModel.subjectTwoId}).length||(this.formModel.subjectTwoId="",this.formModel.subjectTwoName="",!1);break;case 3:if(0<this.subjectThree.length)return 0!==this.subjectThree.filter(function(e){return e.id===t.formModel.subjectThreeId}).length||(this.formModel.subjectThreeId="",this.formModel.subjectThreeName="",!1);break;case 4:if(0<this.subjectFour.length)return 0!==this.subjectFour.filter(function(e){return e.id===t.formModel.subjectFourId}).length||(this.formModel.subjectFourId="",this.formModel.subjectFourName="",!1)}},checkSubjectIsNull:function(){return!(0<this.subjectTwo.length)||(this.formModel.subjectTwoId?!(0<this.subjectThree.length)||(this.formModel.subjectThreeId?!(0<this.subjectFour.length)||(!!this.formModel.subjectFourId||(this.$message.warning("请填写四级科目"),!1)):(this.$message.warning("请填写三级科目"),!1)):(this.$message.warning("请填写二级科目!"),!1))},submitForm:function(e){var i=this;this.checkSubjectIsNull()&&this.$refs[e].validate(function(e){if(e){i.btnLoading=!0;var t=a()({},i.formModel);i.info.settlementTypeSign&&i.$set(t,"settlementTypeSign",i.info.settlementTypeSign),i.$set(t,"tmsFinanceVerifiactionBillFees",i.info.orderList),i.$set(t,"orgId",i.orgId),i.$set(t,"paymentsType",i.paymentsType),i.$set(t,"fiOrderType",i.fiOrderType),i.$set(t,"dataSrc",0),t.certTime||(t.certTime=new Date),i.$set(t,"certTime",Object(o.parseTime)(t.certTime,"{y}-{m}-{d}")+" 00:00:00"),delete t.verificationList,console.log("保存提交的参数dataInfo",t),Object(l.b)(t).then(function(e){if(i.$message.success("保存成功！"),i.btnLoading=!1,i.popVisibleDialog=!1,"操作费"===i.dataName)i.$router.push({path:"./accountsPayable/handleFee"});else{var t=i.currentPage.substring(0,1).toLowerCase()+i.currentPage.substring(1);i.$router.push({path:"./accountsPayable/batch/"+t})}}).catch(function(e){i._handlerCatchMsg(e),i.btnLoading=!1})}})},setting:function(){this.$router.push({path:"/finance/financeInfo/subjectInfo"})},getFinanceSubjects:function(t,e){var i=this;return console.log("接口查询下级科目列表：\n",t,e),this.searchQuerySub.subjectLevel=t||"",this.searchQuerySub.parentId=e||"",Object(s.d)(this.searchQuerySub).then(function(e){switch(t){case 2:i.subjectTwo=e,i.subjectThree=[],i.subjectFour=[],console.log("科目二: ",i.subjectTwo);break;case 3:i.subjectThree=e,i.subjectFour=[],console.log("科目三: ",i.subjectThree);break;case 4:i.subjectFour=e,console.log("科目四: ",i.subjectFour);break;default:i.subjectOne=e,i.subjectTwo=[],i.subjectThree=[],i.subjectFour=[],console.log("科目一: ",i.subjectOne)}i.loading=!1,console.log("科目: ",t,e)}).catch(function(e){i.loading=!1,i._handlerCatchMsg(e)})},selectSubject:function(t,e){console.log(t);var i={};switch(e){case 1:for(var n in i=a()({},this.subjectOne.filter(function(e){return e.id===t})[0]),this.getFinanceSubjects(2,i.id),this.formModel)/^subject/.test(n)&&(this.formModel[n]="");this.formModel.subjectOneName=i.subjectName,this.formModel.subjectOneId=i.id,console.log("科目一 选中的值",i);break;case 2:for(var o in i=a()({},this.subjectTwo.filter(function(e){return e.id===t})[0]),this.getFinanceSubjects(3,i.id),this.formModel)/(Four|Three)/.test(o)&&(this.formModel[o]="");this.formModel.subjectTwoName=i.subjectName,console.log("科目二 选中的值",i);break;case 3:i=a()({},this.subjectThree.filter(function(e){return e.id===t})[0]),this.getFinanceSubjects(4,i.id),this.formModel.subjectThreeName=i.subjectName,this.formModel.subjectFourName="",this.formModel.subjectFourId="",console.log("科目三 选中的值",i);break;case 4:i=a()({},this.subjectFour.filter(function(e){return e.id===t})[0]),this.formModel.subjectFourName=i.subjectName}i={},console.log("formModel",this.formModel)},selectVerificationWay:function(t){var e;e=this.formModel.verificationList.filter(function(e){return e.id===t})[0],this.$set(this.formModel,"verificationWay",e.verificationWay),console.log("选中方向：：",e,this.formModel)},uniqueArray:function(e){for(var t=[],i=0;i<e.length;i++)-1==t.indexOf(e[i])&&t!==e[i]&&t.push(e[i]);return t},closeMe:function(e){this.$emit("close"),"function"==typeof e&&e()}}}},jCPK:function(e,t){},n80V:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=i("nHXf"),o=i("wA9E"),a=i("VU/8")(n.a,o.a,null,null,null);t.default=a.exports},nHXf:function(e,t,i){"use strict";var n=i("woOf"),a=i.n(n),o=i("Dd8w"),r=i.n(o),s=i("bOdI"),l=i.n(s),c=i("NYxO"),u=i("JW1v"),f=i("IcMT"),d=i("0xDb"),h=i("pAQG"),b=i("zmVP"),p=i("1onU"),m=i("DT23"),g=i("0xDb");t.a={components:{transferTable:f.a,querySelect:h.a,Voucher:b.a,Pager:p.a,currentSearch:m.default},data:function(){var e,i=this;return e={btnLoading:!1,infoTable:{amount:0,settlementTypeSign:"HandlingFeePay",orderList:[]},textChangeDanger:[],tablekey:"",loadTruck:"",truckMessage:"",formModel:{}},l()(e,"loadTruck","loadTruckOne"),l()(e,"loading",!0),l()(e,"popVisibleDialog",!1),l()(e,"btnsize","mini"),l()(e,"tableReceiptInfo",[]),l()(e,"orgLeftTable",[]),l()(e,"selectedRight",[]),l()(e,"selectedLeft",[]),l()(e,"isGoReceipt",!0),l()(e,"leftTable",[]),l()(e,"rightTable",[]),l()(e,"orgData",{left:[],right:[]}),l()(e,"isFresh",!1),l()(e,"feeType",8),l()(e,"searchQuery",{currentPage:1,pageSize:100,vo:{}}),l()(e,"tableColumnLeft",[{label:"发车批次",prop:"batchNo",width:"130",fixed:!0},{label:"核销状态",prop:"statusName",width:"120",fixed:!1},{label:"发车类型",prop:"loadTypeName",width:"90",fixed:!0},{label:"到达网点",prop:"arriveOrgName",width:"120",fixed:!1},{label:"发车时间",prop:"departureTime",width:"160",fixed:!1},{label:"到达时间",prop:"receivingTime",width:"160",fixed:!1},{label:"操作费",prop:"fee",width:"110",slot:function(e){return"干线"===e.row.loadTypeName?e.row.gxHandlingFeePay:e.row.dbHandlingFeePay},fixed:!1},{label:"已核销操作费",prop:"paidFee",width:"110",slot:function(e){return"干线"===e.row.loadTypeName?e.row.paidGxHandlingFeePay:e.row.paidDbHandlingFeePay},fixed:!1},{label:"未核销操作费",prop:"unpaidFee",width:"110",slot:function(e){return"干线"===e.row.loadTypeName?e.row.unpaidGxHandlingFeePay:e.row.unpaidDbHandlingFeePay},fixed:!1},{label:"车牌号",prop:"truckIdNumber",width:"110",fixed:!1},{label:"司机名称",prop:"dirverName",width:"100",fixed:!1},{label:"司机电话",prop:"dirverMobile",width:"110",fixed:!1},{label:"配载件数",prop:"loadAmountall",fixed:!1},{label:"配载体积",prop:"loadVolumeall",fixed:!1},{label:"配载重量",prop:"loadWeightall",fixed:!1},{label:"备注",prop:"remark",fixed:!1}]),l()(e,"tableColumnRight",[{label:"发车批次",prop:"batchNo",width:"130",fixed:!0},{label:"核销状态",prop:"statusName",width:"120",fixed:!1},{label:"发车类型",prop:"loadTypeName",width:"90",fixed:!0},{label:"到达网点",prop:"arriveOrgName",width:"120",fixed:!1},{label:"发车时间",prop:"departureTime",width:"160",fixed:!1},{label:"到达时间",prop:"receivingTime",width:"160",fixed:!1},{label:"操作费",prop:"fee",width:"110",fixed:!1},{label:"已核销操作费",prop:"paidFee",width:"110",slot:function(e){var t=e.row;return i._setTextColor(t.fee,t.paidFee,t.unpaidFee,t.paidFee)},fixed:!1},{label:"未核销操作费",prop:"unpaidFee",width:"110",slot:function(e){var t=e.row;return i._setTextColor(t.fee,t.paidFee,t.unpaidFee,t.unpaidFee)},fixed:!1},{label:"实际核销操作费",prop:"amount",width:"110",expand:!0,slot:function(e){return e.row.amount},fixed:!1},{label:"车牌号",prop:"truckIdNumber",width:"110",fixed:!1},{label:"司机名称",prop:"dirverName",width:"100",fixed:!1},{label:"司机电话",prop:"dirverMobile",width:"110",fixed:!1},{label:"配载件数",prop:"loadAmountall",fixed:!1},{label:"配载体积",prop:"loadVolumeall",fixed:!1},{label:"配载重量",prop:"loadWeightall",fixed:!1},{label:"备注",prop:"remark",fixed:!1}]),e},computed:r()({},Object(c.mapGetters)(["otherinfo"]),{getRouteInfo:function(){return JSON.parse(this.$route.query.searchQuery)},totalLeft:function(){return this.leftTable.length},totalRight:function(){return this.rightTable.length}}),mounted:function(){this.getList()},methods:{handlePageChangeLeft:function(e){this.searchQuery.currentPage=e.pageNum,this.searchQuery.pageSize=e.pageSize},initLeftParams:function(){this.searchQuery=a()({},this.getRouteInfo),this.$set(this.searchQuery.vo,"status","NOSETTLEMENT,PARTSETTLEMENT")},getList:function(){var i=this,t=Object(d.objectMerge2)([],JSON.parse(this.$route.query.selectListBatchNos));this.$route.query.selectListBatchNos?this.isModify=!0:this.isModify=!1,this.leftTable=this.$options.data().leftTable,this.rightTable=this.$options.data().rightTable,this.tableReceiptInfo=this.$options.data().tableReceiptInfo,this.orgLeftTable=this.$options.data().orgLeftTable,this.initLeftParams(),this.isFresh||Object(u.c)(this.searchQuery).then(function(e){i.leftTable=a()([],e.list),i.leftTable.forEach(function(e){e.fee=e.fee?e.fee:"干线"===e.loadTypeName?e.gxHandlingFeePay:e.dbHandlingFeePay,e.paidFee=e.paidFee?e.paidFee:"干线"===e.loadTypeName?e.paidGxHandlingFeePay:e.paidDbHandlingFeePay,e.unpaidFee=e.unpaidFee?e.unpaidFee:"干线"===e.loadTypeName?e.unpaidGxHandlingFeePay:e.unpaidDbHandlingFeePay,e.statusName=e.statusName?e.statusName:"干线"===e.loadTypeName?e.gxHandlingFeePayStatusZh:e.dbHandlingFeePayStatusZh,i.$set(e,"amount",e.unpaidFee)}),t.forEach(function(t){i.leftTable.forEach(function(e){t===e.batchNo&&i.rightTable.push(e)})}),i.rightTable.length<1?i.isGoReceipt=!0:i.isGoReceipt=!1,i.rightTable.forEach(function(e){var t=i.leftTable.indexOf(e);-1!==t&&i.leftTable.splice(t,1),e.amount=e.unpaidFee}),i.orgLeftTable=Object(d.objectMerge2)([],i.leftTable),i.loading=!1}).catch(function(e){i.loading=!1,i._handlerCatchMsg(e)})},changLoadData:function(e,t,i){this.rightTable[e][t]=Number(i);var n=Number(this.rightTable[e].unpaidFee),o=this.rightTable[e][t];o!==n?this.$set(this.textChangeDanger,e,!0):this.$set(this.textChangeDanger,e,!1),o<0||n<o?(this.$message({type:"warning",message:"实际核销费用不小于0，不大于未核销费用。"}),this.isGoReceipt=!0):(this.isGoReceipt=!1,this.$set(this.rightTable,e,a()(this.rightTable[e],l()({},t,this.rightTable[e][t]))))},clickDetailsRight:function(e){this.$refs.multipleTableRight.toggleRowSelection(e)},clickDetailsLeft:function(e){this.$refs.multipleTableLeft.toggleRowSelection(e)},getSelectionRight:function(e){this.selectedRight=e},getSelectionLeft:function(e){this.selectedLeft=e},changeTableKey:function(){this.tablekey=(new Date).getTime()},doAction:function(e){switch(e){case"goLeft":this.goLeft();break;case"goRight":this.goRight()}},goLeft:function(){var i=this;0===this.selectedRight.length||(this.selectedRight.forEach(function(t,e){t.amount=t.unpaidFee,i.rightTable=Object(d.objectMerge2)([],i.rightTable).filter(function(e){return e.batchNo!==t.batchNo}),i.rightTable.push(t),i.leftTable=Object(d.objectMerge2)([],i.leftTable).filter(function(e){return e.batchNo!==t.batchNo}),i.orgLeftTable=Object(d.objectMerge2)([],i.orgLeftTable).filter(function(e){return e.batchNo!==t.batchNo})}),this.selectedRight=[]),this.rightTable.length<1?this.isGoReceipt=!0:this.isGoReceipt=!1},goRight:function(){var i=this;0===this.selectedLeft.length?this.$message({type:"warning",message:"请在右边表格选择数据"}):(this.selectedLeft.forEach(function(t,e){i.leftTable=Object(d.objectMerge2)([],i.leftTable).filter(function(e){return e.batchNo!==t.batchNo}),i.orgLeftTable=Object(d.objectMerge2)([],i.orgLeftTable).filter(function(e){return e.batchNo!==t.batchNo}),i.leftTable.push(t),i.orgLeftTable.push(t),i.rightTable=Object(d.objectMerge2)([],i.rightTable).filter(function(e){return e.batchNo!==t.batchNo})}),this.selectedLeft=[]),this.rightTable.length<1?this.isGoReceipt=!0:this.isGoReceipt=!1},selectCurrent:function(e,t){this.addItem(e,t)},dclickAddItem:function(e,t){this.selectedRight=[],this.selectedRight.push(e),this.doAction("goLeft")},dclickMinusItem:function(e,t){this.selectedLeft=[],this.selectedLeft.push(e),this.doAction("goRight")},addItem:function(e,t){this.selectedRight=[],this.selectedRight[t]=e,this.doAction("goLeft")},minusItem:function(e,t){this.selectedLeft=[],this.selectedLeft[t]=e,this.doAction("goRight")},addALLList:function(){this.selectedRight=a()([],this.leftTable),this.doAction("goLeft")},minusAllList:function(){this.selectedLeft=a()([],this.rightTable),this.doAction("goRight")},searchShip:function(e){console.log("searchShip",e)},closeDialog:function(){this.popVisibleDialog=!1},openDialog:function(){this.popVisibleDialog=!0},goReceipt:function(){var n=this,i=0;if(1<this.rightTable.length&&Object(d.objectMerge2)([],this.rightTable).forEach(function(t){Object(d.objectMerge2)([],n.rightTable).forEach(function(e){t.ascriptionOrgid!==e.ascriptionOrgid&&i++})}),0<i)return i=0,this.$message({type:"warning",message:"不能同时核销两个网点"}),!1;if(this.infoTable=this.$options.data().infoTable,!this.isGoReceipt){var o=0;this.rightTable.forEach(function(e,t){o=d.tmsMath._add(o,e.amount);var i={id:e.id,amount:e.amount,feeTypeId:"干线"===e.loadTypeName?35:34};console.log(i.feeTypeId),0<i.amount&&i.amount<=e.unpaidFee&&n.infoTable.orderList.push(i),i={}}),this.infoTable.amount=o,(o=0)<this.infoTable.orderList.length?this.openDialog():this.$message({type:"warning",message:"暂无可核销项！实际核销费用不小于0，不大于未核销费用。"})}},getSumRight:function(e){return Object(g.getSummaries)(e,["_index|2|单","fee","unpaidFee","paidFee","loadAmountall|","loadWeightall|","loadVolumeall|"])},getSumLeft:function(e){return Object(g.getSummaries)(e,["_index|2|单","fee","unpaidFee","paidFee","loadAmountall|","amount","loadWeightall|","loadVolumeall|"])}}}},"p/r1":function(e,t,i){"use strict";var n={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-dialog",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"incomeDialog",attrs:{title:t.dialogTitle,visible:t.isShow,"close-on-click-modal":!1,"before-close":t.closeMe},on:{"update:visible":function(e){t.isShow=e}}},[i("el-form",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],ref:"formModel",attrs:{model:t.formModel,rules:t.rules,inline:!0,"label-width":"120px"}},[i("div",{staticClass:"income_item"},[i("el-form-item",{staticClass:"formItemTextDanger",attrs:{label:"方向",prop:"verificationId"}},[i("el-select",{attrs:{filterable:"",placeholder:"请选择",size:t.btnsize},on:{change:t.selectVerificationWay},model:{value:t.formModel.verificationId,callback:function(e){t.$set(t.formModel,"verificationId",e)},expression:"formModel.verificationId"}},t._l(t.veryficationList,function(e,t){return i("el-option",{key:t,attrs:{value:e.id,label:e.verificationWay}})}))],1),t._v(" "),i("el-form-item",{attrs:{label:"发生金额",prop:"amount"}},[i("el-input",{directives:[{name:"numberOnly",rawName:"v-numberOnly:point",arg:"point"}],attrs:{placeholder:"发生金额",size:t.btnsize,maxlength:8,disabled:""},model:{value:t.formModel.amount,callback:function(e){t.$set(t.formModel,"amount",t._n(e))},expression:"formModel.amount"}})],1)],1),t._v(" "),i("div",{staticClass:"income_item"},[i("el-form-item",{class:{formItemTextDanger:"1"===t.formModel.isNeededVoucher},attrs:{label:"一级科目",prop:"1"===t.formModel.isNeededVoucher?"subjectOneId":""}},[i("el-select",{attrs:{filterable:"",placeholder:"无数据",size:t.btnsize,disabled:"1"!==t.formModel.isNeededVoucher},on:{change:function(e){return t.selectSubject(e,1)},clear:t.initSubject},model:{value:t.formModel.subjectOneId,callback:function(e){t.$set(t.formModel,"subjectOneId",e)},expression:"formModel.subjectOneId"}},t._l(t.subjectOne,function(e,t){return i("el-option",{key:t,attrs:{label:e.subjectName,value:e.id}})}))],1),t._v(" "),i("el-form-item",{attrs:{label:"凭证日期",prop:"certTime"}},[i("el-date-picker",{attrs:{type:"date",size:t.btnsize,placeholder:"选择日期",clearable:!1},model:{value:t.formModel.certTime,callback:function(e){t.$set(t.formModel,"certTime",e)},expression:"formModel.certTime"}})],1)],1),t._v(" "),i("div",{staticClass:"income_item"},[i("el-form-item",{class:0<t.subjectTwo.length?"formItemTextDanger":"",attrs:{label:"二级科目"}},[i("el-select",{attrs:{filterable:"",placeholder:"无数据",size:t.btnsize,disabled:"1"!==t.formModel.isNeededVoucher},on:{change:function(e){return t.selectSubject(e,2)}},model:{value:t.formModel.subjectTwoId,callback:function(e){t.$set(t.formModel,"subjectTwoId",e)},expression:"formModel.subjectTwoId"}},t._l(t.subjectTwo,function(e,t){return i("el-option",{key:t,attrs:{label:e.subjectName,value:e.id}})}))],1),t._v(" "),i("el-form-item",{attrs:{label:"收据号码",prop:"receiptNo"}},[i("el-input",{attrs:{placeholder:"收据号码",size:t.btnsize,maxlength:25},model:{value:t.formModel.receiptNo,callback:function(e){t.$set(t.formModel,"receiptNo",e)},expression:"formModel.receiptNo"}})],1)],1),t._v(" "),i("div",{staticClass:"income_item"},[i("el-form-item",{class:0<t.subjectThree.length?"formItemTextDanger":"",attrs:{label:"三级科目"}},[i("el-select",{attrs:{filterable:"",placeholder:"无数据",size:t.btnsize,disabled:"1"!==t.formModel.isNeededVoucher},on:{change:function(e){return t.selectSubject(e,3)}},model:{value:t.formModel.subjectThreeId,callback:function(e){t.$set(t.formModel,"subjectThreeId",e)},expression:"formModel.subjectThreeId"}},t._l(t.subjectThree,function(e,t){return i("el-option",{key:t,attrs:{label:e.subjectName,value:e.id}})}))],1),t._v(" "),i("el-form-item",{attrs:{label:"发票号码",prop:"invoiceNo"}},[i("el-input",{attrs:{placeholder:"发票号码",size:t.btnsize,maxlength:25},model:{value:t.formModel.invoiceNo,callback:function(e){t.$set(t.formModel,"invoiceNo",e)},expression:"formModel.invoiceNo"}})],1)],1),t._v(" "),i("div",{staticClass:"income_item"},[i("el-form-item",{class:0<t.subjectFour.length?"formItemTextDanger":"",attrs:{label:"四级科目"}},[i("el-select",{attrs:{filterable:"",placeholder:"无数据",size:t.btnsize,disabled:"1"!==t.formModel.isNeededVoucher},on:{change:function(e){return t.selectSubject(e,4)}},model:{value:t.formModel.subjectFourId,callback:function(e){t.$set(t.formModel,"subjectFourId",e)},expression:"formModel.subjectFourId"}},t._l(t.subjectFour,function(e,t){return i("el-option",{key:t,attrs:{label:e.subjectName,value:e.id}})}))],1),t._v(" "),i("el-form-item",{attrs:{label:"支票号码",prop:"checkNo"}},[i("el-input",{attrs:{placeholder:"支票号码",size:t.btnsize,maxlength:25},model:{value:t.formModel.checkNo,callback:function(e){t.$set(t.formModel,"checkNo",e)},expression:"formModel.checkNo"}})],1)],1),t._v(" "),i("div",{staticClass:"income_item"},[i("el-form-item",{attrs:{label:"摘要"}},[i("el-input",{attrs:{type:"textarea",placeholder:"摘要",size:t.btnsize,maxlength:50},model:{value:t.formModel.remark,callback:function(e){t.$set(t.formModel,"remark",e)},expression:"formModel.remark"}})],1),t._v(" "),i("el-form-item")],1)]),t._v(" "),i("span",{attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{type:"primary",plain:"",icon:"el-icon-document",loading:t.btnLoading},on:{click:function(e){t.submitForm("formModel")}}},[t._v("保存")]),t._v(" "),"1"===t.formModel.isNeededVoucher?i("el-button",{attrs:{type:"warning",plain:"",icon:"el-icon-setting"},on:{click:t.setting}},[t._v("设置财务科目")]):t._e(),t._v(" "),i("el-button",{attrs:{type:"danger",plain:"",icon:"el-icon-circle-close"},on:{click:t.closeMe}},[t._v("取消")])],1)],1)},staticRenderFns:[]};t.a=n},wA9E:function(e,t,i){"use strict";var n={render:function(){var n=this,e=n.$createElement,o=n._self._c||e;return o("div",{directives:[{name:"loading",rawName:"v-loading",value:n.loading,expression:"loading"}],staticClass:"accountsLoad_table"},[o("div",{staticClass:"transferTable_search clearfix"},[o("currentSearch",{attrs:{info:n.orgLeftTable},on:{change:n.selectCurrent}})],1),n._v(" "),o("transferTable",{staticStyle:{height:"calc(100% - 40px)",padding:"10px"}},[o("div",{attrs:{slot:"btnsBox"},slot:"btnsBox"},[o("el-button",{attrs:{type:n.isGoReceipt?"info":"success",size:"mini",icon:"el-icon-sort",disabled:n.isGoReceipt},on:{click:n.goReceipt}},[n._v("核销")])],1),n._v(" "),o("div",{staticClass:"tableHeadItemBtn",staticStyle:{height:"100%"},attrs:{slot:"tableLeft"},slot:"tableLeft"},[o("el-button",{staticClass:"tableAllBtn",attrs:{size:"mini"},on:{click:n.addALLList}}),n._v(" "),o("el-table",{key:n.tablekey,ref:"multipleTableRight",attrs:{data:n.leftTable,border:"","tooltip-effect":"dark",triped:"",height:"100%","summary-method":n.getSumRight,"default-sort":{prop:"id",order:"ascending"},"show-overflow-tooltip":!0,"show-summary":!0},on:{"row-click":n.clickDetailsRight,"selection-change":n.getSelectionRight,"row-dblclick":n.dclickAddItem}},[o("el-table-column",{attrs:{fixed:"",width:"50",type:"index",label:"序号"},scopedSlots:n._u([{key:"default",fn:function(e){return[n._v("\n            "+n._s(e.$index+1)+"\n          ")]}}])}),n._v(" "),o("el-table-column",{attrs:{fixed:"",width:"50"},scopedSlots:n._u([{key:"default",fn:function(t){return[o("el-button",{staticClass:"tableItemBtn",attrs:{size:"mini"},on:{click:function(e){n.addItem(t.row,t.$index)}}})]}}])}),n._v(" "),n._l(n.tableColumnLeft,function(i){return[i.slot?o("el-table-column",{key:i.id,attrs:{fixed:i.fixed,sortable:"",label:i.label,width:i.width,prop:i.prop},scopedSlots:n._u([{key:"default",fn:function(t){return[i.click?o("span",{staticClass:"clickitem",domProps:{innerHTML:n._s(i.slot(t))},on:{click:function(e){e.stopPropagation(),i.click(t)}}}):o("span",{domProps:{innerHTML:n._s(i.slot(t))}})]}}])}):o("el-table-column",{key:i.id,attrs:{fixed:i.fixed,sortable:"",label:i.label,prop:i.prop,width:i.width}})]})],2)],1),n._v(" "),o("div",{staticClass:"tableHeadItemBtn",attrs:{slot:"tableRight"},slot:"tableRight"},[o("el-button",{staticClass:"tableAllBtnMinus",attrs:{size:"mini"},on:{click:n.minusAllList}}),n._v(" "),o("el-table",{key:n.tablekey,ref:"multipleTableLeft",staticStyle:{height:"100%"},attrs:{data:n.rightTable,border:"","tooltip-effect":"dark",triped:"",height:"100%","summary-method":n.getSumLeft,"default-sort":{prop:"id",order:"ascending"},"show-summary":!0},on:{"row-click":n.clickDetailsLeft,"selection-change":n.getSelectionLeft,"row-dblclick":n.dclickMinusItem}},[o("el-table-column",{attrs:{fixed:"",width:"50",type:"index",label:"序号"},scopedSlots:n._u([{key:"default",fn:function(e){return[n._v("\n            "+n._s(e.$index+1)+"\n          ")]}}])}),n._v(" "),o("el-table-column",{attrs:{fixed:"",width:"50"},scopedSlots:n._u([{key:"default",fn:function(t){return[o("el-button",{staticClass:"tableItemBtnMinus",attrs:{size:"mini"},on:{click:function(e){n.minusItem(t.row,t.$index)}}})]}}])}),n._v(" "),n._l(n.tableColumnRight,function(i){return[i.slot?o("el-table-column",{key:i.id,attrs:{fixed:i.fixed,sortable:"",label:i.label,width:i.width,prop:i.prop},scopedSlots:n._u([{key:"default",fn:function(t){return[i.expand?o("div",[o("el-input",{directives:[{name:"numberOnly",rawName:"v-numberOnly:point",arg:"point"}],class:{textChangeDanger:n.textChangeDanger[t.$index]},attrs:{type:"number",size:n.btnsize},on:{change:function(e){return n.changLoadData(t.$index,i.prop,e)}},nativeOn:{dblclick:function(e){e.stopPropagation(),e.preventDefault()},click:function(e){e.stopPropagation(),e.preventDefault()}},model:{value:i.slot(t),callback:function(e){n.$set(i,"slot(scope)",n._n(e))},expression:"column.slot(scope)"}})],1):o("div",[i.click?o("span",{staticClass:"clickitem",domProps:{innerHTML:n._s(i.slot(t))},on:{click:function(e){e.stopPropagation(),i.click(t)}}}):o("span",{domProps:{innerHTML:n._s(i.slot(t))}})])]}}])}):o("el-table-column",{key:i.id,attrs:{fixed:i.fixed,sortable:"",label:i.label,prop:i.prop,width:i.width}})]})],2)],1)]),n._v(" "),o("Voucher",{attrs:{popVisible:n.popVisibleDialog,info:n.infoTable,orgId:n.getRouteInfo.vo.orgid,btnLoading:n.btnLoading},on:{close:n.closeDialog}})],1)},staticRenderFns:[]};t.a=n},zmVP:function(e,t,i){"use strict";var n=i("URbh"),o=i("p/r1"),a=i("VU/8")(n.a,o.a,null,null,null);t.a=a.exports}});