webpackJsonp([141,288],{"7nIZ":function(t,e,a){"use strict";e.i=function(t){return i.b.post("/api-finance/finance/tmsfinancebillrecord/v1.3/getBillRecordList/",t).then(function(t){return t.data})},e.h=function(t){return i.b.post("/api-finance/finance/tmsfinancebillrecorddetail/v1.3/getBillRecordDetailList/",t).then(function(t){return t.data})},e.j=function(t){return i.b.post("/api-finance/finance/tmsfinancebillrecord/v1.3/getVerificationBaseInfo/",t).then(function(t){return t.data})},e.g=function(t){return i.b.post("/api-finance/finance/tmsfinancebillrecord/v1.3/addIncome/",t).then(function(t){return t.data})},e.a=function(t){return i.b.post("/api-finance/finance/tmsfinancebillrecord/v1.3/cancelVerification/",t).then(function(t){return t.data})},e.f=function(t){return i.b.post("/api-finance/finance/tmsfinanceverification/v1.3/getVeryficationList/",t).then(function(t){return t.data})},e.b=function(t){return i.b.post("/api-finance//finance/tmsfinancebillrecord/v1.3/delBillRecord/",t).then(function(t){return t.data})},e.e=function(t){return i.b.post("/api-finance/finance/tmsfinancebillrecord/v1.3/getOrderList/",t).then(function(t){return t.data})},e.d=function(t){return i.b.post("/api-finance/finance/tmsfinancesubjects/v1.3/getFinanceSubjects/",t).then(function(t){return t.data})},e.c=function(t){return i.b.post("/api-finance/finance/tmsfinancebillrecord/v1.3/getBillRecordInfo",t).then(function(t){return t.data})};var i=a("Vo7i")},"7ueC":function(t,e){},"9cTb":function(t,e,a){"use strict";var i={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticClass:"transferTable"},[a("div",{staticClass:"transferTable_header"},[a("div",{staticClass:"transferTable_searchs"},[a("div",{staticClass:"transferTable_fresh"},[e._t("tableRefresh")],2),e._v(" "),e._t("tableSearch")],2),e._v(" "),a("div",{staticClass:"transferTable_header_btn_direction"},[a("el-tooltip",{attrs:{effect:"dark",content:"向左侧拉伸",placement:"top-end"}},[a("el-button",{staticClass:"btn-leftright",attrs:{icon:"el-icon-arrow-right",type:"primary",circle:"",disabled:e.isShowLeft,size:"mini",plain:""},on:{click:function(t){e.doAction("showAllLeft")}}})],1),e._v(" "),a("el-tooltip",{attrs:{effect:"dark",content:"向右侧拉伸",placement:"top-start"}},[a("el-button",{staticClass:"btn-leftright",attrs:{icon:"el-icon-arrow-left",type:"primary",circle:"",disabled:e.isShowRight,size:"mini",plain:""},on:{click:function(t){e.doAction("showAllRight")}}})],1),e._v(" "),a("transition",{attrs:{name:"el-zoom-in-bottom"}},[e.isShowReback?a("el-button",{staticClass:"btn-leftright",attrs:{icon:"el-icon-refresh",type:"primary",circle:"",size:"mini",plain:""},on:{click:function(t){e.doAction("showReback")}}}):e._e()],1),e._v(" "),a("div",{staticClass:"transferTable_header_btn_box clearfix"},[e._t("btnsBox")],2)],1)]),e._v(" "),a("div",{staticClass:"transferTable_content"},[a("div",{staticClass:"transferTable_content_table paddingRight",class:e.leftTableClass},[e._t("tableLeft",[e._v("左边表格区")])],2),e._v(" "),a("div",{staticClass:"transferTable_content_table",class:e.rightTableClass},[e._t("tableRight",[e._v("右边表格区")])],2)])])},staticRenderFns:[]};e.a=i},FsBr:function(t,e,a){"use strict";var i=a("pFYg"),n=a.n(i),r=a("woOf"),s=a.n(r),o=a("Dd8w"),l=a.n(o),c=a("bOdI"),h=a.n(c),u=a("NYxO"),d=a("pAQG"),f=a("IcMT"),b=a("0xDb"),m=a("7nIZ"),g=a("sR0s"),p=a("0xDb");e.a={data:function(){var t;return t={showtable:!0,loading:!0,searchTime:[Object(b.parseTime)(new Date-5184e6),Object(b.parseTime)(new Date)],tablekey:0,truckMessage:"",searchForm:{},incomePayType:"PAYABLE",paymentsType:0,settlementId:179},h()(t,"loading",!1),h()(t,"btnsize","mini"),h()(t,"selectedRight",[]),h()(t,"selectedLeft",[]),h()(t,"orgLeftTable",[]),h()(t,"leftTable",[]),h()(t,"rightTable",[]),h()(t,"countOrgLeftTable",[]),h()(t,"FEE_TYPE",{179:"loadFeeTotal",180:"shortPay",181:"sendPay"}),h()(t,"orgData",{left:[],right:[]}),h()(t,"arrLastPartActualFeeName",[]),h()(t,"arrLastPartNoFeeName",[]),h()(t,"arrLastPartFeeName",[]),h()(t,"arrNoPayName",[]),h()(t,"arrPayName",[]),h()(t,"arrPayNameActual",[]),t},props:{setLoadTable:{type:Object,default:function(){}},isModify:{type:Boolean,default:!1},countSuccessList:{type:Array,default:[]},countNum:{type:[Number,String]},getSettlementId:{type:[Number,String]},orgId:{type:[Number,String]},componentKey:{type:[Number,String]},fiOrderType:{type:[Number,String]}},computed:l()({},Object(u.mapGetters)(["otherinfo"]),{feeName:{get:function(){return this.FEE_TYPE[this.settlementId]},set:function(){return""}}}),components:{transferTable:f.a,querySelect:d.a,currentSearch:g.default},watch:{isModify:{get:function(){this.isModify},set:function(){}},setLoadTable:{handler:function(t,e){t&&(this.orgData=s()({},t))},deep:!0},countSuccessList:{handler:function(t,e){this.initCount(t,e)},deep:!0},getSettlementId:{handler:function(t,e){t&&(this.settlementId=t,this.getList())},deep:!0},fiOrderType:{handler:function(t,e){console.log("fiOrderType",t,e)},deep:!0},orgId:function(){this.getPayName(),this.getList()}},methods:{getPayName:function(){if(0!==this.rightTable.length){for(var t in this.arrNoPayName=[],this.rightTable[0])0===t.indexOf("no")&&this.arrNoPayName.push(t);for(var e in this.arrPayName=[],this.arrNoPayName){var a=this.arrNoPayName[e].substring(2,3).toLowerCase()+this.arrNoPayName[e].substring(3);this.arrPayName.push(a)}for(var i in this.arrhadPayName=[],this.arrNoPayName){var r="had"+this.arrNoPayName[i].substring(2);this.arrhadPayName.push(r)}for(var s in this.arrPayNameActual=[],this.arrPayName){var n=this.arrPayName[s]+"Actual";this.arrPayNameActual.push(n)}var o={arrPayName:this.arrPayName,arrNoPayName:this.arrNoPayName,arrhadPayName:this.arrhadPayName,arrPayNameActual:this.arrPayNameActual};this.$emit("feeName",o)}},initCount:function(t,e){var r=this;if(console.log("============后台返回的智能运单=============\n",t),this.arrLastPartActualFeeName=[],this.arrLastPartNoFeeName=[],this.arrLastPartFeeName=[],this.leftTable=[],this.rightTable=Object(b.objectMerge2)([],t),this.$emit("loadTable",this.rightTable),0===this.rightTable.length)return this.$message({type:"warning",message:"无符合智能核销条件的运单。"}),this.leftTable=Object(b.objectMerge2)([],this.orgLeftTable),!1;this.leftTable=Object(b.objectMerge2)([],this.orgLeftTable).filter(function(e,t){return-1===r.rightTable.findIndex(function(t){return e.batchNo===t.batchNo})}),0!==this.leftTable.length&&(console.log("第一次去重！！！！！"),this.leftTable=this.uniqueArray(this.leftTable,"batchNo")),this.$emit("loadTable",this.rightTable),this.getPayName();var s=!1;this.arrPayNameActual.forEach(function(t,e){var a=r.rightTable[r.rightTable.length-1][t],i=r.rightTable[r.rightTable.length-1][r.arrNoPayName[e]];i!==a&&""!==i&&null!==i&&""!==a&&null!==a&&(void 0===i?"undefined":n()(i))===(void 0===a?"undefined":n()(a))&&(s=!0,r.arrLastPartFeeName.push(r.arrPayName[e]),r.arrLastPartActualFeeName.push(t),r.arrLastPartNoFeeName.push(r.arrNoPayName[e]))}),this.rightTable[this.rightTable.length-1].loadFeeTotal!==this.rightTable[this.rightTable.length-1].loadFeeTotalActual?(this.$notify.info({title:"提示",message:"最后一条数据实际只需支付部分未核销费用，多余的需要返回到左边列表！"}),s=!0,this.arrLastPartFeeName.push("loadFeeTotal"),this.arrLastPartActualFeeName.push("loadFeeTotalActual")):s=!1,s&&(this.leftTable.push(Object(b.objectMerge2)([],this.rightTable[this.rightTable.length-1])),this.arrLastPartFeeName.forEach(function(t){var e="no"+t.substring(0,1).toUpperCase()+t.substring(1),a=t+"Actual";r.leftTable[r.leftTable.length-1][a]=r.rightTable[r.rightTable.length-1][e]-r.rightTable[r.rightTable.length-1][a],r.leftTable[r.leftTable.length-1].loadFeeTotalActual=r.rightTable[r.rightTable.length-1].loadFeeTotal-r.rightTable[r.rightTable.length-1].loadFeeTotalActual})),this.$emit("loadTable",this.rightTable),this.countOrgLeftTable=Object(b.objectMerge2)([],this.leftTable),console.log(this.countOrgLeftTable.length)},uniqueArray:function(t,e,a){for(var i=[t[0]],r=1;r<t.length;r++){for(var s=t[r],n=!1,o=0;o<i.length;o++)if(console.log(e,"//////111",s[e],i[o][e]),s[e]===i[o][e]){if(console.log(e,"//////222"),a)for(var l in a)i[o][a[l]]=p.tmsMath._add(s[a[l]],i[o][a[l]]);n=!0;break}n||i.push(s)}return i},getList:function(){var e=this;this.leftTable=this.$options.data().leftTable,this.rightTable=this.$options.data().rightTable,this.orgLeftTable=this.$options.data().orgLeftTable,this.countOrgLeftTable=this.$options.data().countOrgLeftTable;var t={};this.isModify?(this.leftTable=this.orgData.left,this.orgLeftTable=this.orgData.left,this.rightTable=this.orgData.right,this.countOrgLeftTable=this.orgData.left,this.$emit("loadTable",this.rightTable)):(this.$set(t,"orgId",this.orgId),this.$set(t,"paymentsType",this.paymentsType),this.$set(t,"startTime",Object(b.parseTime)(this.searchTime[0],"{y}-{m}-{d} ")+"00:00:00"),this.$set(t,"endTime",Object(b.parseTime)(this.searchTime[1],"{y}-{m}-{d} ")+"23:59:59"),this.$set(t,"autoTotalAmount",""),this.$set(t,"feeId",""),this.$set(t,"fiOrderType",this.fiOrderType),Object(m.e)(t).then(function(t){e.loading=!1,e.leftTable=t,e.orgLeftTable=t,e.countOrgLeftTable=t,e.$emit("loadTable",e.rightTable)}).catch(function(t){e.loading=!1,e._handlerCatchMsg(t)}),t={})},setSettlementId:function(t){var e=this;t&&(this.settlementId=t,this.rightTable=this.$options.data().rightTable,this.$emit("setSettlementId",this.settlementId),this.tableKey=Math.random(),this.showtable=!1,this.$nextTick(function(){e.showtable=!0}))},getSearch:function(t){this.leftTable=t},clickDetailsRight:function(t){this.$refs.multipleTableRight.toggleRowSelection(t)},clickDetailsLeft:function(t){this.$refs.multipleTableLeft.toggleRowSelection(t)},getSelectionRight:function(t){this.selectedRight=t},getSelectionLeft:function(t){this.selectedLeft=t},changeTableKey:function(){this.tablekey=Math.random()},doAction:function(t){switch(t){case"goLeft":this.goLeft();break;case"goRight":this.goRight()}},goLeft:function(){var a=this;0===this.selectedRight.length?this.$message({type:"warning",message:"请在左边表格选择数据"}):(this.selectedRight.forEach(function(e,t){e.loadAmount=e.repertoryAmount,e.loadWeight=e.repertoryWeight,e.loadVolume=e.repertoryVolume,a.leftTable=Object(b.objectMerge2)([],a.leftTable).filter(function(t){return t.batchNo!==e.batchNo}),a.rightTable.push(e),a.countOrgLeftTable=Object(b.objectMerge2)([],a.countOrgLeftTable).filter(function(t){return t.batchNo!==e.batchNo})}),this.rightTable=this.uniqueArray(Object(b.objectMerge2)(this.rightTable),"batchNo",this.arrLastPartActualFeeName),this.selectedRight=[],this.getPayName(),this.$emit("loadTable",this.rightTable),console.log("-",this.countOrgLeftTable.length))},goRight:function(){var a=this;0===this.selectedLeft.length?this.$message({type:"warning",message:"请在右边表格选择数据"}):(this.selectedLeft.forEach(function(e,t){a.leftTable.push(e),a.countOrgLeftTable.push(e),a.rightTable=Object(b.objectMerge2)([],a.rightTable).filter(function(t){return t.batchNo!==e.batchNo})}),this.leftTable=this.uniqueArray(Object(b.objectMerge2)(this.leftTable),"batchNo",this.arrLastPartActualFeeName),this.countOrgLeftTable=this.uniqueArray(Object(b.objectMerge2)(this.countOrgLeftTable),"batchNo",this.arrLastPartActualFeeName),this.selectedLeft=[],this.getPayName(),this.$emit("loadTable",this.rightTable),console.log("+",this.countOrgLeftTable.length))},addItem:function(t,e){var a=this;clearTimeout(this.addTimer),this.addTimer=setTimeout(function(){a.selectedRight=[],a.selectedRight[e]=t,a.doAction("goLeft")},50)},minusItem:function(t,e){var a=this;clearTimeout(this.minusTimer),this.minusTimer=setTimeout(function(){a.selectedLeft=[],a.selectedLeft[e]=t,a.doAction("goRight")},50)},addALLList:function(){this.selectedRight=s()([],this.leftTable),this.doAction("goLeft")},minusAllList:function(){this.selectedLeft=s()([],this.rightTable),this.doAction("goRight")},dclickAddItem:function(t,e){this.selectedRight=[],this.selectedRight.push(t),this.doAction("goLeft")},dclickMinusItem:function(t,e){this.selectedLeft=[],this.selectedLeft.push(t),this.doAction("goRight")},getSumRight:function(t){return Object(p.getSummaries)(t,["loadFeeTotalActual","operationPay","noOperationPay","hadOperationPay","operationPayActual"])},getSumLeft:function(t){return Object(p.getSummaries)(t,["loadFeeTotalActual","operationPay","noOperationPay","hadOperationPay","operationPayActual"])}}}},IcMT:function(t,e,a){"use strict";var i=a("PI8x"),r=a("9cTb");var s=function(t){a("7ueC")},n=a("VU/8")(i.a,r.a,s,"data-v-4bbec734",null);e.a=n.exports},OKCs:function(t,e){},PI8x:function(t,e,a){"use strict";e.a={data:function(){return{loading:!1,isShowLeft:!1,isShowRight:!1,isShowReback:!1,searchForm:""}},computed:{leftTableClass:function(){return this.isShowLeft?"showTableLeft":this.isShowRight?"shortTableLeft":"averageTable"},rightTableClass:function(){return this.isShowRight?"showTableRight":this.isShowLeft?"shortTableRight":"averageTable"}},methods:{doAction:function(t){switch(this.loading=!0,t){case"showAllLeft":this.showAllLeft();break;case"showAllRight":this.showAllRight();break;case"showReback":this.showReback()}this.$emit("resizeVTable"),this.loading=!1},showAllLeft:function(){this.isShowLeft=!0,this.isShowRight=!1,this.isShowReback=!0},showAllRight:function(){this.isShowLeft=!1,this.isShowRight=!0,this.isShowReback=!0},showReback:function(){this.isShowReback=!1,this.isShowLeft=!1,this.isShowRight=!1}}}},SG4p:function(t,e){},X4lU:function(t,e,a){"use strict";var i={render:function(){var a=this,t=a.$createElement,i=a._self._c||t;return i("transferTable",{directives:[{name:"loading",rawName:"v-loading",value:a.loading,expression:"loading"}]},[i("div",{staticClass:"tableHeadItemForm clearfix",attrs:{slot:"tableSearch"},slot:"tableSearch"},[i("currentSearch",{attrs:{info:a.countOrgLeftTable,getSettlementId:a.settlementId},on:{change:a.getSearch,setSettlementId:a.setSettlementId}})],1),a._v(" "),i("div",{staticClass:"tableHeadItemBtn",staticStyle:{height:"100%"},attrs:{slot:"tableLeft"},slot:"tableLeft"},[i("el-button",{staticClass:"tableAllBtn",attrs:{size:"mini"},on:{click:a.addALLList}}),a._v(" "),a.showtable?i("el-table",{key:a.tablekey,ref:"multipleTableRight",attrs:{data:a.leftTable,border:"","tooltip-effect":"dark",triped:"",height:"100%","summary-method":a.getSumRight,"default-sort":{prop:"id",order:"ascending"},"show-overflow-tooltip":!0,"show-summary":!0},on:{"row-click":a.clickDetailsRight,"selection-change":a.getSelectionRight,"row-dblclick":a.dclickAddItem}},[i("el-table-column",{attrs:{fixed:"",type:"index",width:"60",label:"序号"}}),a._v(" "),i("el-table-column",{attrs:{fixed:"",width:"50"},scopedSlots:a._u([{key:"default",fn:function(e){return[i("el-button",{staticClass:"tableItemBtn",attrs:{size:"mini"},on:{click:function(t){a.addItem(e.row,e.$index)}}})]}}])}),a._v(" "),i("el-table-column",{attrs:{label:"发车批次",prop:"batchNo",fixed:"",width:"120"}}),a._v(" "),i("el-table-column",{attrs:{prop:"truckIdNumber",sortable:"",label:"车牌号",width:"100"}}),a._v(" "),i("el-table-column",{attrs:{prop:"driverName",sortable:"",label:"司机",width:"120"}}),a._v(" "),181!==a.settlementId?i("el-table-column",{attrs:{prop:"operationPay",sortable:"",label:"操作费",width:"120"}}):a._e(),a._v(" "),181!==a.settlementId?i("el-table-column",{attrs:{prop:"noOperationPay",sortable:"",label:"未核销操作费",width:"120"},scopedSlots:a._u([{key:"default",fn:function(t){return[i("span",{domProps:{innerHTML:a._s(a._setTextColor(t.row.operationPay,t.row.hadOperationPay,t.row.noOperationPay,t.row.noOperationPay))}})]}}])}):a._e(),a._v(" "),181!==a.settlementId?i("el-table-column",{attrs:{prop:"hadOperationPay",sortable:"",label:"已核销操作费",width:"120"},scopedSlots:a._u([{key:"default",fn:function(t){return[i("span",{domProps:{innerHTML:a._s(a._setTextColor(t.row.operationPay,t.row.hadOperationPay,t.row.noOperationPay,t.row.hadOperationPay))}})]}}])}):a._e(),a._v(" "),181===a.settlementId?i("el-table-column",{attrs:{prop:"departureTime",sortable:"",label:"送货时间",width:"160"}}):a._e(),a._v(" "),181===a.settlementId?i("el-table-column",{attrs:{prop:"requireArrivedTime",sortable:"",label:"到达时间",width:"160"}}):a._e(),a._v(" "),179===a.settlementId?i("el-table-column",{attrs:{prop:"departureTime",sortable:"",label:"发车时间",width:"160"}}):a._e(),a._v(" "),181!==a.settlementId?i("el-table-column",{attrs:{prop:"receivingTime",sortable:"",label:"到车时间",width:"160"}}):a._e(),a._v(" "),181!==a.settlementId?i("el-table-column",{attrs:{prop:"orgName",sortable:"",label:"发车网点",width:"120"}}):a._e(),a._v(" "),181!==a.settlementId?i("el-table-column",{attrs:{prop:"arriveOrgName",sortable:"",label:"到车网点",width:"120"}}):a._e(),a._v(" "),i("el-table-column",{attrs:{prop:"remark",sortable:"",label:"备注"}})],1):a._e()],1),a._v(" "),i("div",{staticClass:"tableHeadItemBtn",attrs:{slot:"tableRight"},slot:"tableRight"},[i("el-button",{staticClass:"tableAllBtnMinus",attrs:{size:"mini"},on:{click:a.minusAllList}}),a._v(" "),i("el-table",{key:a.tablekey,ref:"multipleTableLeft",staticStyle:{height:"100%"},attrs:{data:a.rightTable,border:"","tooltip-effect":"dark",triped:"",height:"100%","summary-method":a.getSumLeft,"default-sort":{prop:"id",order:"ascending"},"show-summary":!0},on:{"row-dblclick":a.dclickMinusItem,"row-click":a.clickDetailsLeft,"selection-change":a.getSelectionLeft}},[i("el-table-column",{attrs:{fixed:"",type:"index",width:"60",label:"序号"}}),a._v(" "),i("el-table-column",{attrs:{fixed:"",width:"50"},scopedSlots:a._u([{key:"default",fn:function(e){return[i("el-button",{staticClass:"tableItemBtnMinus",attrs:{size:"mini"},on:{click:function(t){a.minusItem(e.row,e.$index)}}})]}}])}),a._v(" "),i("el-table-column",{attrs:{label:"发车批次",fixed:"",prop:"batchNo",width:"120"}}),a._v(" "),i("el-table-column",{attrs:{prop:"truckIdNumber",sortable:"",label:"车牌号",width:"120"}}),a._v(" "),i("el-table-column",{attrs:{prop:"driverName",sortable:"",label:"司机",width:"120"}}),a._v(" "),i("el-table-column",{attrs:{prop:"loadFeeTotalActual",sortable:"",label:"实际合计",width:"120"}}),a._v(" "),181!==a.settlementId?i("el-table-column",{attrs:{prop:"operationPay",sortable:"",label:"操作费",width:"120"}}):a._e(),a._v(" "),181!==a.settlementId?i("el-table-column",{attrs:{prop:"noOperationPay",sortable:"",label:"未核销操作费",width:"120"},scopedSlots:a._u([{key:"default",fn:function(t){return[i("span",{domProps:{innerHTML:a._s(a._setTextColor(t.row.operationPay,t.row.hadOperationPay,t.row.noOperationPay,t.row.noOperationPay))}})]}}])}):a._e(),a._v(" "),181!==a.settlementId?i("el-table-column",{attrs:{prop:"hadOperationPay",sortable:"",label:"已核销操作费",width:"120"},scopedSlots:a._u([{key:"default",fn:function(t){return[i("span",{domProps:{innerHTML:a._s(a._setTextColor(t.row.operationPay,t.row.hadOperationPay,t.row.noOperationPay,t.row.hadOperationPay))}})]}}])}):a._e(),a._v(" "),181!==a.settlementId?i("el-table-column",{attrs:{prop:"operationPayActual",sortable:"",label:"实际核销操作费",width:"120"}}):a._e(),a._v(" "),181===a.settlementId?i("el-table-column",{attrs:{prop:"departureTime",sortable:"",label:"送货时间",width:"160"}}):a._e(),a._v(" "),179===a.settlementId?i("el-table-column",{attrs:{prop:"departureTime",sortable:"",label:"发车时间",width:"160"}}):a._e(),a._v(" "),181!==a.settlementId?i("el-table-column",{attrs:{prop:"receivingTime",sortable:"",label:"到车时间",width:"160"}}):a._e(),a._v(" "),181!==a.settlementId?i("el-table-column",{attrs:{prop:"orgName",sortable:"",label:"发车网点",width:"120"}}):a._e(),a._v(" "),181!==a.settlementId?i("el-table-column",{attrs:{prop:"arriveOrgName",sortable:"",label:"到车网点",width:"120"}}):a._e(),a._v(" "),i("el-table-column",{attrs:{prop:"remark",sortable:"",label:"备注"}})],1)],1)])},staticRenderFns:[]};e.a=i},XHcD:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("FsBr"),r=a("X4lU");var s=function(t){a("OKCs")},n=a("VU/8")(i.a,r.a,s,null,null);e.default=n.exports},bMpP:function(t,e,a){"use strict";var i={render:function(){var a=this,t=a.$createElement,i=a._self._c||t;return i("el-form",{ref:"searchForm",staticClass:"tableHeadItemForm",attrs:{inline:"","label-position":"right",model:a.searchForm,"label-width":"60px"}},[i("el-form-item",[i("el-select",{attrs:{placeholder:"批次类型",size:a.btnsize},on:{change:a.changeSenderSearch},model:{value:a.senderSearch,callback:function(t){a.senderSearch=t},expression:"senderSearch"}},[i("el-option",{attrs:{label:"短驳",value:"short"}}),a._v(" "),i("el-option",{attrs:{label:"干线",value:"load"}})],1)],1),a._v(" "),"short"===a.senderSearch?i("el-form-item",[i("el-autocomplete",{attrs:{maxlength:20,size:a.btnsize,"fetch-suggestions":function(t,e){return a.querySearch("shortBatchNo",t,e)},placeholder:"短驳批次号搜索","popper-class":"popperHide"},on:{select:a.handleSelect,focus:function(t){a.focusFormItm("shortBatchNo")}},scopedSlots:a._u([{key:"default",fn:function(t){var e=t.item;return[i("div",{staticClass:"name"},[a._v(a._s(e.batchNo))])]}}]),model:{value:a.searchForm.shortBatchNo,callback:function(t){a.$set(a.searchForm,"shortBatchNo",t)},expression:"searchForm.shortBatchNo"}})],1):a._e(),a._v(" "),"load"===a.senderSearch?i("el-form-item",[i("el-autocomplete",{attrs:{maxlength:20,size:a.btnsize,"fetch-suggestions":function(t,e){return a.querySearch("mainBatchNo",t,e)},placeholder:"干线批次号搜索","popper-class":"popperHide"},on:{select:a.handleSelect,focus:function(t){a.focusFormItm("mainBatchNo")}},scopedSlots:a._u([{key:"default",fn:function(t){var e=t.item;return[i("div",{staticClass:"name"},[a._v(a._s(e.batchNo))])]}}]),model:{value:a.searchForm.mainBatchNo,callback:function(t){a.$set(a.searchForm,"mainBatchNo",t)},expression:"searchForm.mainBatchNo"}})],1):a._e(),a._v(" "),"deliver"===a.senderSearch?i("el-form-item",[i("el-autocomplete",{attrs:{maxlength:20,size:a.btnsize,"fetch-suggestions":function(t,e){return a.querySearch("sendBatchNo",t,e)},placeholder:"送货批次号搜索","popper-class":"popperHide"},on:{select:a.handleSelect,focus:function(t){a.focusFormItm("sendBatchNo")}},scopedSlots:a._u([{key:"default",fn:function(t){var e=t.item;return[i("div",{staticClass:"name"},[a._v(a._s(e.batchNo))])]}}]),model:{value:a.searchForm.sendBatchNo,callback:function(t){a.$set(a.searchForm,"sendBatchNo",t)},expression:"searchForm.sendBatchNo"}})],1):a._e(),a._v(" "),i("el-form-item",{attrs:{label:"车牌号"}},[i("el-autocomplete",{attrs:{maxlength:8,size:a.btnsize,"fetch-suggestions":function(t,e){return a.querySearch("truckIdNumber",t,e)},placeholder:"车牌号搜索","popper-class":"popperHide"},on:{select:a.handleSelect,focus:function(t){a.focusFormItm("truckIdNumber")}},scopedSlots:a._u([{key:"default",fn:function(t){var e=t.item;return[i("div",{staticClass:"name"},[a._v(a._s(e.truckIdNumber))])]}}]),model:{value:a.searchForm.truckIdNumber,callback:function(t){a.$set(a.searchForm,"truckIdNumber",t)},expression:"searchForm.truckIdNumber"}})],1)],1)},staticRenderFns:[]};e.a=i},edkX:function(t,e,a){"use strict";var i=a("pAQG"),o=a("0xDb");e.a={components:{querySelect:i.a},data:function(){return{senderSearch:"load",searchForm:{shortBatchNo:"",mainBatchNo:"",sendBatchNo:"",truckIdNumber:""},btnsize:"mini",selectVal:"",settlementId:"",isSender:!1,SETTLEMENT_TYPE:{short:180,load:179,deliver:181}}},props:{info:{type:Array,default:[]},getSettlementId:{type:[Number,String]}},watch:{getSettlementId:{handler:function(t,e){t&&(this.isSender=!0,this.settlementId=t,this.senderSearch=179===t?"load":180===t?"short":"deliver")},deep:!0}},mounted:function(){this.isSender||this.initSettlementid()},methods:{focusFormItm:function(t){for(var e in this.searchForm)e!==t&&this.$set(this.searchForm,e,"")},initSettlementid:function(){this.senderSearch;this.settlementId=this.SETTLEMENT_TYPE[this.senderSearch],console.log("选择批次类型后的settlementId",this.settlementId),this.$emit("setSettlementId",this.settlementId)},changeSenderSearch:function(t){t&&this.initSettlementid()},querySearch:function(t,e,a){var i=i=this.info;for(var r in this.searchForm[t]=e,this.selectVal=t,this.searchForm)void 0!==this.searchForm[r]&&""!==this.searchForm[r]||this.$emit("change",Object(o.objectMerge2)([],this.info));var s=e?i.filter(this.createFilter(e,t)):i;a(s);var n=[];s.forEach(function(t){n.push(t)}),this.$emit("change",n)},createFilter:function(e,a){return function(t){if("truckIdNumber"!==a){if(t.batchNo)return-1!==t.batchNo.toLowerCase().indexOf(e.toLowerCase())}else if(t.truckIdNumber)return-1!==t.truckIdNumber.toLowerCase().indexOf(e.toLowerCase())}},handleSelect:function(t){this.searchForm[this.selectVal]=t[this.selectVal],this.selectVal="";var e=[];e.push(t),this.$emit("change",e),this.searchForm=this.$options.data().searchForm},clearSender:function(t){this.searchForm=this.$options.data().searchForm}}}},sR0s:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("edkX"),r=a("bMpP");var s=function(t){a("SG4p")},n=a("VU/8")(i.a,r.a,s,null,null);e.default=n.exports}});