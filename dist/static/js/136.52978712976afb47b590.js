webpackJsonp([136,295],{"5lwl":function(t,e){},"6IHP":function(t,e){},"6fDq":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=a("IBzX"),o=a("H2NR");var l=function(t){a("5lwl")},n=a("VU/8")(r.a,o.a,l,null,null);e.default=n.exports},"7nIZ":function(t,e,a){"use strict";e.i=function(t){return r.b.post("/api-finance/finance/tmsfinancebillrecord/v1.3/getBillRecordList/",t).then(function(t){return t.data})},e.h=function(t){return r.b.post("/api-finance/finance/tmsfinancebillrecorddetail/v1.3/getBillRecordDetailList/",t).then(function(t){return t.data})},e.j=function(t){return r.b.post("/api-finance/finance/tmsfinancebillrecord/v1.3/getVerificationBaseInfo/",t).then(function(t){return t.data})},e.g=function(t){return r.b.post("/api-finance/finance/tmsfinancebillrecord/v1.3/addIncome/",t).then(function(t){return t.data})},e.a=function(t){return r.b.post("/api-finance/finance/tmsfinancebillrecord/v1.3/cancelVerification/",t).then(function(t){return t.data})},e.f=function(t){return r.b.post("/api-finance/finance/tmsfinanceverification/v1.3/getVeryficationList/",t).then(function(t){return t.data})},e.b=function(t){return r.b.post("/api-finance//finance/tmsfinancebillrecord/v1.3/delBillRecord/",t).then(function(t){return t.data})},e.e=function(t){return r.b.post("/api-finance/finance/tmsfinancebillrecord/v1.3/getOrderList/",t).then(function(t){return t.data})},e.d=function(t){return r.b.post("/api-finance/finance/tmsfinancesubjects/v1.3/getFinanceSubjects/",t).then(function(t){return t.data})},e.c=function(t){return r.b.post("/api-finance/finance/tmsfinancebillrecord/v1.3/getBillRecordInfo",t).then(function(t){return t.data})};var r=a("Vo7i")},H2NR:function(t,e,a){"use strict";var r={render:function(){var a=this,t=a.$createElement,r=a._self._c||t;return r("el-form",{ref:"searchForm",staticClass:"tableHeadItemForm",attrs:{inline:"","label-position":"right",model:a.searchForm,"label-width":"60px"}},[r("el-form-item",[r("el-select",{attrs:{placeholder:"发货方或发货人",size:a.btnsize,clearable:""},on:{clear:a.clearSearchSelect,focus:a.clearSender},model:{value:a.senderSearch,callback:function(t){a.senderSearch=t},expression:"senderSearch"}},[r("el-option",{attrs:{label:"发货方",value:"unit"}}),a._v(" "),r("el-option",{attrs:{label:"发货人",value:"customer"}})],1)],1),a._v(" "),"customer"===a.senderSearch?r("el-form-item",[r("el-autocomplete",{attrs:{"popper-class":"popperHide",maxlength:15,size:a.btnsize,"fetch-suggestions":function(t,e){return a.querySearch("shipSenderName",t,e)},placeholder:"发货人搜索"},on:{select:a.handleSelect},model:{value:a.searchForm.shipSenderName,callback:function(t){a.$set(a.searchForm,"shipSenderName",t)},expression:"searchForm.shipSenderName"}})],1):a._e(),a._v(" "),"unit"===a.senderSearch?r("el-form-item",[r("el-autocomplete",{attrs:{"popper-class":"popperHide",size:a.btnsize,maxlength:15,"fetch-suggestions":function(t,e){return a.querySearch("shipSenderUnit",t,e)},placeholder:"发货方搜索"},on:{select:a.handleSelect},model:{value:a.searchForm.shipSenderUnit,callback:function(t){a.$set(a.searchForm,"shipSenderUnit",t)},expression:"searchForm.shipSenderUnit"}})],1):a._e(),a._v(" "),r("el-form-item",{attrs:{label:"运单号"}},[r("el-autocomplete",{attrs:{"popper-class":"popperHide",size:a.btnsize,"fetch-suggestions":function(t,e){return a.querySearch("shipSn",t,e)},placeholder:"运单号搜索",maxlength:20},on:{select:a.handleSelect},scopedSlots:a._u([{key:"default",fn:function(t){var e=t.item;return[r("div",{staticClass:"name"},[a._v(a._s(e.shipSn))])]}}]),model:{value:a.searchForm.shipSn,callback:function(t){a.$set(a.searchForm,"shipSn",t)},expression:"searchForm.shipSn"}})],1)],1)},staticRenderFns:[]};e.a=r},IBzX:function(t,e,a){"use strict";var r=a("pAQG"),i=a("0xDb");e.a={components:{querySelect:r.a},data:function(){return{senderSearch:"",searchForm:{shipSenderName:"",senderCustomerUnit:"",shipSn:""},btnsize:"mini",selectVal:""}},props:{info:{type:Array,default:[]}},methods:{clearSearchSelect:function(t){this.$emit("change",Object(i.objectMerge2)([],this.info))},querySearch:function(t,e,a){var r=this.info;for(var o in this.searchForm[t]=e,this.selectVal=t,this.searchForm)void 0!==this.searchForm[o]&&""!==this.searchForm[o]||this.$emit("change",Object(i.objectMerge2)([],this.info));var l=e?r.filter(this.createFilter(e,t)):r;a(l);var n=[];l.forEach(function(t){n.push(t)}),this.$emit("change",n)},createFilter:function(e,a){return function(t){return-1!==t[a].toLowerCase().indexOf(e.toLowerCase())}},handleSelect:function(t){this.searchForm[this.selectVal]=t[this.selectVal],this.selectVal="";var e=[];e.push(t),this.$emit("change",e)},clearSender:function(t){this.searchForm=this.$options.data().searchForm}}}},IcMT:function(t,e,a){"use strict";var r=a("PI8x"),o=a("cYST");var l=function(t){a("6IHP")},n=a("VU/8")(r.a,o.a,l,null,null);e.a=n.exports},PI8x:function(t,e,a){"use strict";e.a={data:function(){return{isShowLeft:!1,isShowRight:!1,isShowReback:!1,searchForm:""}},methods:{doAction:function(t){switch(t){case"showAllLeft":this.showAllLeft();break;case"showAllRight":this.showAllRight();break;case"showReback":this.showReback()}},showAllLeft:function(){this.isShowLeft=!0,this.isShowRight=!1,this.isShowReback=!0},showAllRight:function(){this.isShowLeft=!1,this.isShowRight=!0,this.isShowReback=!0},showReback:function(){this.isShowReback=!1,this.isShowLeft=!1,this.isShowRight=!1}}}},TsW9:function(t,e,a){"use strict";e.a=function(t,e){return r.b.get("/api-order/order/load/v1/getBatchNo/",{params:{orgId:t,loadTypeId:e}})},e.h=function(t){return r.b.post("/api-order/order/load/v1/",t)},e.i=function(t){return r.b.put("/api-order/order/load/v1/",t)},e.c=function(t){return r.b.get("/api-order/order/load/v1/selectAddLoadRepertoryList/",{params:{orgId:t}})},e.f=function(t,e){return r.b.get("/api-order/order/load/v1/selectUpdateLoadRepertoryList/?orgId="+t+"&loadId="+e)},e.g=function(t,e){return r.b.get("/api-order/order/load/v1/selectUpdateLoadDetailList/?orgId="+t+"&loadId="+e)},e.d=function(t){return r.b.get("/api-order/order/load/v1/selectLoadDetailList/",{params:{loadId:t}})},e.e=function(){return r.b.get("/api-system/system/trunk/v1/findCarAndDriver/").then(function(t){return t})},e.b=function(){return r.b.get("/api-system/system/trunk/v1/findDriverAndCar/").then(function(t){return t})};var r=a("Vo7i")},ULTU:function(t,e){},Zh6v:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=a("lI7z"),o=a("ry5G");var l=function(t){a("ULTU")},n=a("VU/8")(r.a,o.a,l,null,null);e.default=n.exports},cYST:function(t,e,a){"use strict";var r={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"transferTable"},[a("div",{staticClass:"transferTable_header"},[a("div",{staticClass:"transferTable_searchs"},[a("div",{staticClass:"transferTable_fresh"},[e._t("tableRefresh")],2),e._v(" "),e._t("tableSearch")],2),e._v(" "),a("div",{staticClass:"transferTable_header_btn_direction"},[a("el-tooltip",{attrs:{effect:"dark",content:"向左侧拉伸",placement:"top-end"}},[a("el-button",{attrs:{icon:"el-icon-arrow-right",type:"primary",circle:"",disabled:e.isShowLeft,size:"mini",plain:""},on:{click:function(t){e.doAction("showAllLeft")}}})],1),e._v(" "),a("el-tooltip",{attrs:{effect:"dark",content:"向右侧拉伸",placement:"top-start"}},[a("el-button",{attrs:{icon:"el-icon-arrow-left",type:"primary",circle:"",disabled:e.isShowRight,size:"mini",plain:""},on:{click:function(t){e.doAction("showAllRight")}}})],1),e._v(" "),a("transition",{attrs:{name:"el-zoom-in-bottom"}},[e.isShowReback?a("el-button",{attrs:{icon:"el-icon-refresh",type:"primary",circle:"",size:"mini",plain:""},on:{click:function(t){e.doAction("showReback")}}}):e._e()],1),e._v(" "),a("div",{staticClass:"transferTable_header_btn_box clearfix"},[e._t("btnsBox")],2)],1)]),e._v(" "),a("div",{staticClass:"transferTable_content"},[a("div",{staticClass:"transferTable_content_table paddingRight",class:[e.isShowLeft?"showTableLeft":e.isShowRight?"shortTableLeft":""]},[e._t("tableLeft",[e._v("左边表格区")])],2),e._v(" "),a("div",{staticClass:"transferTable_content_table",class:[e.isShowRight?"showTableRight":""]},[e._t("tableRight",[e._v("右边表格区")])],2)])])},staticRenderFns:[]};e.a=r},lI7z:function(t,e,a){"use strict";var r=a("pFYg"),l=a.n(r),o=a("woOf"),n=a.n(o),i=a("Dd8w"),s=a.n(i),c=a("bOdI"),h=a.n(c),u=a("NYxO"),d=(a("TsW9"),a("pAQG")),p=a("IcMT"),b=a("0xDb"),f=a("7nIZ"),m=a("6fDq"),y=a("0xDb");e.a={data:function(){var t;return t={loading:!0,searchTime:[Object(b.parseTime)(new Date-5184e6),Object(b.parseTime)(new Date)],tablekey:"",truckMessage:"",searchForm:{},incomePayType:"PAYABLE",paymentsType:0,settlementId:178},h()(t,"loading",!1),h()(t,"btnsize","mini"),h()(t,"selectedRight",[]),h()(t,"selectedLeft",[]),h()(t,"orgLeftTable",[]),h()(t,"countOrgLeftTable",[]),h()(t,"leftTable",[]),h()(t,"rightTable",[]),h()(t,"orgData",{left:[],right:[]}),h()(t,"arrLastPartActualFeeName",[]),h()(t,"arrLastPartNoFeeName",[]),h()(t,"arrLastPartFeeName",[]),h()(t,"arrNoPayName",[]),h()(t,"arrPayName",[]),h()(t,"arrPayNameActual",[]),t},props:{setLoadTable:{type:Object,default:function(){}},isModify:{type:Boolean,default:!1},countSuccessList:{type:Array,default:[]},countNum:{type:[Number,String]},activeName:{type:String,default:""},orgId:{type:[Number,String]},componentKey:{type:[Number,String]},fiOrderType:{type:[Number,String]}},computed:s()({},Object(u.mapGetters)(["otherinfo"])),components:{transferTable:p.a,querySelect:d.a,currentSearch:m.default},watch:{isModify:{handler:function(t,e){this.getList()},deep:!0},setLoadTable:{handler:function(t,e){t&&(this.orgData=n()({},t),this.getList())},deep:!0},countSuccessList:{handler:function(t,e){this.initCount(t,e)},deep:!0},countNum:{handler:function(t,e){return t},deep:!0},activeName:{handler:function(t,e){"second"===t&&(console.log("activeName",t),this.getList())},deep:!0},fiOrderType:{handler:function(t,e){},deep:!0}},activated:function(){this.getPayName(),this.getList()},methods:{getPayName:function(){if(0!==this.rightTable.length){for(var t in this.arrNoPayName=[],this.rightTable[0])0===t.indexOf("no")&&this.arrNoPayName.push(t);for(var e in this.arrPayName=[],this.arrNoPayName){var a=this.arrNoPayName[e].substring(2,3).toLowerCase()+this.arrNoPayName[e].substring(3);this.arrPayName.push(a)}for(var r in this.arrhadPayName=[],this.arrNoPayName){var o="had"+this.arrNoPayName[r].substring(2);this.arrhadPayName.push(o)}for(var l in this.arrPayNameActual=[],this.arrPayName){var n=this.arrPayName[l]+"Actual";this.arrPayNameActual.push(n)}var i={arrPayName:this.arrPayName,arrNoPayName:this.arrNoPayName,arrhadPayName:this.arrhadPayName,arrPayNameActual:this.arrPayNameActual};this.$emit("feeName",i)}},initCount:function(t,e){var o=this;if(console.log("============后台返回的智能运单=============\n",t),this.arrLastPartActualFeeName=[],this.arrLastPartNoFeeName=[],this.arrLastPartFeeName=[],this.leftTable=[],this.rightTable=Object(b.objectMerge2)([],t),this.$emit("loadTable",this.rightTable),0===this.rightTable.length)return this.$message({type:"warning",message:"无符合智能核销条件的运单。"}),this.leftTable=Object(b.objectMerge2)([],this.orgLeftTable),!1;this.leftTable=Object(b.objectMerge2)([],this.orgLeftTable).filter(function(e,t){return-1===o.rightTable.findIndex(function(t){return e.shipSn===t.shipSn})}),0!==this.leftTable.length&&(this.leftTable=this.uniqueArray(this.leftTable,"shipSn")),this.$emit("loadTable",this.rightTable),this.getPayName();this.arrPayNameActual.forEach(function(t,e){var a=o.rightTable[o.rightTable.length-1][t],r=o.rightTable[o.rightTable.length-1][o.arrNoPayName[e]];r!==a&&""!==r&&null!==r&&""!==a&&null!==a&&(void 0===r?"undefined":l()(r))===(void 0===a?"undefined":l()(a))&&(!0,o.arrLastPartFeeName.push(o.arrPayName[e]),o.arrLastPartActualFeeName.push(t),o.arrLastPartNoFeeName.push(o.arrNoPayName[e]))}),this.rightTable[this.rightTable.length-1].shipFeeTotal!==this.rightTable[this.rightTable.length-1].shipFeeTotalActual&&(this.$notify.info({title:"提示",message:"最后一条数据实际只需支付部分未核销费用，多余的需要返回到左边列表！"}),this.leftTable.push(Object(b.objectMerge2)([],this.rightTable[this.rightTable.length-1])),this.arrLastPartFeeName.forEach(function(t){var e="no"+t.substring(0,1).toUpperCase()+t.substring(1),a=t+"Actual";o.leftTable[o.leftTable.length-1][a]=o.rightTable[o.rightTable.length-1][e]-o.rightTable[o.rightTable.length-1][a]})),this.$emit("loadTable",this.rightTable),this.countOrgLeftTable=Object(b.objectMerge2)([],this.leftTable)},getList:function(){var e=this;this.leftTable=this.$options.data().leftTable,this.rightTable=this.$options.data().rightTable,this.orgLeftTable=this.$options.data().orgLeftTable,this.countOrgLeftTable=this.$options.data().countOrgLeftTable;var t={};this.isModify?(this.leftTable=this.orgData.left,this.rightTable=this.orgData.right,this.orgLeftTable=this.orgData.left,this.countOrgLeftTable=this.orgData.left,this.$emit("loadTable",this.rightTable)):(this.$set(t,"orgId",this.orgId),this.$set(t,"paymentsType",this.paymentsType),this.$set(t,"settlementId",this.settlementId),this.$set(t,"startTime",Object(b.parseTime)(this.searchTime[0],"{y}-{m}-{d} ")+"00:00:00"),this.$set(t,"endTime",Object(b.parseTime)(this.searchTime[1],"{y}-{m}-{d} ")+"23:59:59"),this.$set(t,"autoTotalAmount",""),this.$set(t,"feeId",""),this.$set(t,"fiOrderType",this.fiOrderType),Object(f.e)(t).then(function(t){e.loading=!1,e.leftTable=t,e.orgLeftTable=t,e.countOrgLeftTable=t,e.$emit("loadTable",e.rightTable)}).catch(function(t){e.loading=!1,e._handlerCatchMsg(t)}),t={})},getSearch:function(t){this.leftTable=t},clickDetailsRight:function(t){this.$refs.multipleTableRight.toggleRowSelection(t)},clickDetailsLeft:function(t){this.$refs.multipleTableLeft.toggleRowSelection(t)},getSelectionRight:function(t){this.selectedRight=t},getSelectionLeft:function(t){this.selectedLeft=t},changeTableKey:function(){this.tablekey=Math.random()},doAction:function(t){switch(t){case"goLeft":this.goLeft();break;case"goRight":this.goRight()}},uniqueArray:function(t,e,a){for(var r=[t[0]],o=1;o<t.length;o++){for(var l=t[o],n=!1,i=0;i<r.length;i++)if(l[e]===r[i][e]){if(a)for(var s in a)r[i][a[s]]=y.tmsMath._add(l[a[s]],r[i][a[s]]);n=!0;break}n||r.push(l)}return r},goLeft:function(){var a=this;0===this.selectedRight.length?this.$message({type:"warning",message:"请在左边表格选择数据"}):(this.selectedRight.forEach(function(e,t){e.loadAmount=e.repertoryAmount,e.loadWeight=e.repertoryWeight,e.loadVolume=e.repertoryVolume,a.leftTable=Object(b.objectMerge2)([],a.leftTable).filter(function(t){return t.shipSn!==e.shipSn}),a.rightTable.push(e),a.countOrgLeftTable=Object(b.objectMerge2)([],a.countOrgLeftTable).filter(function(t){return t.shipSn!==e.shipSn})}),this.rightTable=this.uniqueArray(Object(b.objectMerge2)(this.rightTable),"shipSn",this.arrLastPartActualFeeName),this.selectedRight=[],this.getPayName(),this.$emit("loadTable",this.rightTable))},goRight:function(){var a=this;0===this.selectedLeft.length?this.$message({type:"warning",message:"请在右边表格 选择数据"}):(this.selectedLeft.forEach(function(e,t){a.leftTable.push(e),a.countOrgLeftTable.push(e),a.rightTable=Object(b.objectMerge2)([],a.rightTable).filter(function(t){return t.shipSn!==e.shipSn})}),this.leftTable=this.uniqueArray(Object(b.objectMerge2)(this.leftTable),"shipSn",this.arrLastPartActualFeeName),this.countOrgLeftTable=this.uniqueArray(Object(b.objectMerge2)(this.countOrgLeftTable),"shipSn",this.arrLastPartActualFeeName),this.selectedLeft=[],this.getPayName(),this.$emit("loadTable",this.rightTable))},addItem:function(t,e){var a=this;clearTimeout(this.addTimer),this.addTimer=setTimeout(function(){a.selectedRight=[],a.selectedRight[e]=t,a.doAction("goLeft")},50)},minusItem:function(t,e){var a=this;clearTimeout(this.minusTimer),this.minusTimer=setTimeout(function(){a.selectedLeft=[],a.selectedLeft[e]=t,a.doAction("goRight")},50)},addALLList:function(){this.selectedRight=n()([],this.leftTable),this.doAction("goLeft")},minusAllList:function(){this.selectedLeft=n()([],this.rightTable),this.doAction("goRight")},dclickAddItem:function(t,e){this.selectedRight=[],this.selectedRight.push(t),this.doAction("goLeft")},dclickMinusItem:function(t,e){this.selectedLeft=[],this.selectedLeft.push(t),this.doAction("goRight")},getSumRight:function(t){return Object(y.getSummaries)(t,["shipFeeTotalActual","shipFeeTotal","onPay","noOnPay","hadOnPay","hadBackPay","hadArrivalPay","noArrivalPay","hadMonthPay","noMonthPay","noBackPay","hadUnusualPay","noUnusualPay","arrivalPay","backPay","unusualPay","monthPay","cargoAmount|","cargoWeight|","cargoVolume|","noShipFeeTotal","noShipFeeTotal","hadShipFeeTotal"])},getSumLeft:function(t){return Object(y.getSummaries)(t,["shipFeeTotalActual","shipFeeTotal","onPay","noOnPay","hadBackPay","hadArrivalPay","hadOnPay","noArrivalPay","hadMonthPay","noMonthPay","noBackPay","hadUnusualPay","noUnusualPay","hadBackPay","hadArrivalPay","arrivalPay","backPay","unusualPay","monthPay","cargoAmount|","cargoWeight|","cargoVolume|","noShipFeeTotal","noShipFeeTotal","hadShipFeeTotal","hadShipFeeTotal","onPayActual","arrivalPayActual","backPayActual","unusualPayActual","monthPayActual"])}}}},ry5G:function(t,e,a){"use strict";var r={render:function(){var a=this,t=a.$createElement,r=a._self._c||t;return r("transferTable",{directives:[{name:"loading",rawName:"v-loading",value:a.loading,expression:"loading"}]},[r("div",{staticClass:"tableHeadItemForm clearfix",attrs:{slot:"tableSearch"},slot:"tableSearch"},[r("currentSearch",{attrs:{info:a.countOrgLeftTable},on:{change:a.getSearch}})],1),a._v(" "),r("div",{staticClass:"tableHeadItemBtn",staticStyle:{height:"100%"},attrs:{slot:"tableLeft"},slot:"tableLeft"},[r("el-button",{staticClass:"tableAllBtn",attrs:{size:"mini"},on:{click:a.addALLList}}),a._v(" "),r("el-table",{key:a.tablekey,ref:"multipleTableRight",attrs:{data:a.leftTable,border:"","tooltip-effect":"dark",triped:"",height:"100%","summary-method":a.getSumRight,"default-sort":{prop:"id",order:"ascending"},"show-overflow-tooltip":!0,"show-summary":!0},on:{"row-click":a.clickDetailsRight,"selection-change":a.getSelectionRight,"row-dblclick":a.dclickAddItem}},[r("el-table-column",{attrs:{fixed:"",width:"50",type:"index",label:"序号"},scopedSlots:a._u([{key:"default",fn:function(t){return[a._v("\n          "+a._s(t.$index+1)+"\n        ")]}}])}),a._v(" "),r("el-table-column",{attrs:{fixed:"",width:"50"},scopedSlots:a._u([{key:"default",fn:function(e){return[r("el-button",{staticClass:"tableItemBtn",attrs:{size:"mini"},on:{click:function(t){a.addItem(e.row,e.$index)}}})]}}])}),a._v(" "),r("el-table-column",{attrs:{prop:"shipSn",label:"运单号",fixed:"",width:"130"}}),a._v(" "),r("el-table-column",{attrs:{prop:"shipGoodsSn",sortable:"",label:"货号",width:"150"}}),a._v(" "),r("el-table-column",{attrs:{prop:"shipFeeTotalActual",sortable:"",label:"实际合计",width:"150"}}),a._v(" "),r("el-table-column",{attrs:{prop:"shipFeeTotal",sortable:"",label:"运费合计",width:"120"}}),a._v(" "),r("el-table-column",{attrs:{prop:"noShipFeeTotal",sortable:"",label:"未核销运费合计",width:"120"},scopedSlots:a._u([{key:"default",fn:function(t){return[r("span",{domProps:{innerHTML:a._s(a._setTextColor(t.row.shipFeeTotal,t.row.hadShipFeeTotal,t.row.noShipFeeTotal,t.row.noShipFeeTotal))}})]}}])}),a._v(" "),r("el-table-column",{attrs:{prop:"hadShipFeeTotal",sortable:"",label:"已核销运费合计",width:"120"},scopedSlots:a._u([{key:"default",fn:function(t){return[r("span",{domProps:{innerHTML:a._s(a._setTextColor(t.row.shipFeeTotal,t.row.hadShipFeeTotal,t.row.noShipFeeTotal,t.row.hadShipFeeTotal))}})]}}])}),a._v(" "),r("el-table-column",{attrs:{prop:"onPay",sortable:"",label:"现付",width:"90"}}),a._v(" "),r("el-table-column",{attrs:{prop:"noOnPay",sortable:"",label:"未核销现付",width:"90"},scopedSlots:a._u([{key:"default",fn:function(t){return[r("span",{domProps:{innerHTML:a._s(a._setTextColor(t.row.onPay,t.row.hadOnPay,t.row.noOnPay,t.row.noOnPay))}})]}}])}),a._v(" "),r("el-table-column",{attrs:{prop:"hadOnPay",sortable:"",label:"已核销现付",width:"90"},scopedSlots:a._u([{key:"default",fn:function(t){return[r("span",{domProps:{innerHTML:a._s(a._setTextColor(t.row.onPay,t.row.hadOnPay,t.row.noOnPay,t.row.hadOnPay))}})]}}])}),a._v(" "),r("el-table-column",{attrs:{prop:"arrivalPay",sortable:"",label:"到付",width:"90"}}),a._v(" "),r("el-table-column",{attrs:{prop:"noArrivalPay",sortable:"",label:"未核销到付",width:"90"},scopedSlots:a._u([{key:"default",fn:function(t){return[r("span",{domProps:{innerHTML:a._s(a._setTextColor(t.row.arrivalPay,t.row.hadArrivalPay,t.row.noArrivalPay,t.row.noArrivalPay))}})]}}])}),a._v(" "),r("el-table-column",{attrs:{prop:"hadArrivalPay",sortable:"",label:"已核销到付",width:"90"},scopedSlots:a._u([{key:"default",fn:function(t){return[r("span",{domProps:{innerHTML:a._s(a._setTextColor(t.row.arrivalPay,t.row.hadArrivalPay,t.row.noArrivalPay,t.row.hadArrivalPay))}})]}}])}),a._v(" "),r("el-table-column",{attrs:{prop:"backPay",sortable:"",label:"回单付",width:"90"}}),a._v(" "),r("el-table-column",{attrs:{prop:"noBackPay",sortable:"",label:"未核销回单付",width:"100"},scopedSlots:a._u([{key:"default",fn:function(t){return[r("span",{domProps:{innerHTML:a._s(a._setTextColor(t.row.backPay,t.row.hadBackPay,t.row.noBackPay,t.row.noBackPay))}})]}}])}),a._v(" "),r("el-table-column",{attrs:{prop:"hadBackPay",sortable:"",label:"已核销回单付",width:"100"},scopedSlots:a._u([{key:"default",fn:function(t){return[r("span",{domProps:{innerHTML:a._s(a._setTextColor(t.row.backPay,t.row.hadBackPay,t.row.noBackPay,t.row.hadBackPay))}})]}}])}),a._v(" "),r("el-table-column",{attrs:{prop:"monthPay",sortable:"",label:"月结",width:"90"}}),a._v(" "),r("el-table-column",{attrs:{prop:"noMonthPay",sortable:"",label:"未核销月结",width:"90"},scopedSlots:a._u([{key:"default",fn:function(t){return[r("span",{domProps:{innerHTML:a._s(a._setTextColor(t.row.monthPay,t.row.hadMonthPay,t.row.noMonthPay,t.row.noMonthPay))}})]}}])}),a._v(" "),r("el-table-column",{attrs:{prop:"hadMonthPay",sortable:"",label:"已核销月结",width:"90"},scopedSlots:a._u([{key:"default",fn:function(t){return[r("span",{domProps:{innerHTML:a._s(a._setTextColor(t.row.monthPay,t.row.hadMonthPay,t.row.noMonthPay,t.row.hadMonthPay))}})]}}])}),a._v(" "),r("el-table-column",{attrs:{prop:"unusualPay",sortable:"",label:"异动费用",width:"90"}}),a._v(" "),r("el-table-column",{attrs:{prop:"noUnusualPay",sortable:"",label:"未核销异动费用",width:"110"},scopedSlots:a._u([{key:"default",fn:function(t){return[r("span",{domProps:{innerHTML:a._s(a._setTextColor(t.row.unusualPay,t.row.hadUnusualPay,t.row.noUnusualPay,t.row.noUnusualPay))}})]}}])}),a._v(" "),r("el-table-column",{attrs:{prop:"hadUnusualPay",sortable:"",label:"已核销异动费用",width:"110"},scopedSlots:a._u([{key:"default",fn:function(t){return[r("span",{domProps:{innerHTML:a._s(a._setTextColor(t.row.unusualPay,t.row.hadUnusualPay,t.row.noUnusualPay,t.row.hadUnusualPay))}})]}}])}),a._v(" "),r("el-table-column",{attrs:{prop:"shipFromCityName",sortable:"",label:"发站",width:"120"},scopedSlots:a._u([{key:"default",fn:function(t){return[a._v("\n          "+a._s(a._processTableSlot(t,"shipFromCityName"))+"\n        ")]}}])}),a._v(" "),r("el-table-column",{attrs:{prop:"shipToCityName",sortable:"",label:"到站",width:"120"},scopedSlots:a._u([{key:"default",fn:function(t){return[a._v("\n          "+a._s(a._processTableSlot(t,"shipToCityName"))+"\n        ")]}}])}),a._v(" "),r("el-table-column",{attrs:{prop:"cargoName",sortable:"",label:"货品名",width:"120"}}),a._v(" "),r("el-table-column",{attrs:{prop:"cargoAmount",sortable:"",label:"件数",width:"120"}}),a._v(" "),r("el-table-column",{attrs:{prop:"cargoWeight",sortable:"",label:"重量",width:"120"}}),a._v(" "),r("el-table-column",{attrs:{prop:"cargoVolume",sortable:"",label:"体积",width:"120"}}),a._v(" "),r("el-table-column",{attrs:{prop:"shipSenderUnit",sortable:"",label:"发货方",width:"120"}}),a._v(" "),r("el-table-column",{attrs:{prop:"shipSenderName",sortable:"",label:"发货人",width:"120"}}),a._v(" "),r("el-table-column",{attrs:{prop:"shipRemarks",sortable:"",label:"运单备注",width:"120"}})],1)],1),a._v(" "),r("div",{staticClass:"tableHeadItemBtn",attrs:{slot:"tableRight"},slot:"tableRight"},[r("el-button",{staticClass:"tableAllBtnMinus",attrs:{size:"mini"},on:{click:a.minusAllList}}),a._v(" "),r("el-table",{key:a.tablekey,ref:"multipleTableLeft",staticStyle:{height:"100%"},attrs:{data:a.rightTable,border:"","tooltip-effect":"dark",triped:"",height:"100%","summary-method":a.getSumLeft,"default-sort":{prop:"id",order:"ascending"},"show-summary":!0},on:{"row-dblclick":a.dclickMinusItem,"row-click":a.clickDetailsLeft,"selection-change":a.getSelectionLeft}},[r("el-table-column",{attrs:{fixed:"",width:"50",type:"index",label:"序号"},scopedSlots:a._u([{key:"default",fn:function(t){return[a._v("\n          "+a._s(t.$index+1)+"\n        ")]}}])}),a._v(" "),r("el-table-column",{attrs:{fixed:"",width:"50"},scopedSlots:a._u([{key:"default",fn:function(e){return[r("el-button",{staticClass:"tableItemBtnMinus",attrs:{size:"mini"},on:{click:function(t){a.minusItem(e.row,e.$index)}}})]}}])}),a._v(" "),r("el-table-column",{attrs:{prop:"shipSn",label:"运单号",fixed:"",width:"130"}}),a._v(" "),r("el-table-column",{attrs:{prop:"shipGoodsSn",sortable:"",label:"货号",width:"150"}}),a._v(" "),r("el-table-column",{attrs:{prop:"shipFeeTotalActual",sortable:"",label:"实际合计",width:"150"}}),a._v(" "),r("el-table-column",{attrs:{prop:"shipFeeTotal",sortable:"",label:"运费合计",width:"120"}}),a._v(" "),r("el-table-column",{attrs:{prop:"noShipFeeTotal",sortable:"",label:"未核销运费合计",width:"120"},scopedSlots:a._u([{key:"default",fn:function(t){return[r("span",{domProps:{innerHTML:a._s(a._setTextColor(t.row.shipFeeTotal,t.row.hadShipFeeTotal,t.row.noShipFeeTotal,t.row.noShipFeeTotal))}})]}}])}),a._v(" "),r("el-table-column",{attrs:{prop:"hadShipFeeTotal",sortable:"",label:"已核销运费合计",width:"120"},scopedSlots:a._u([{key:"default",fn:function(t){return[r("span",{domProps:{innerHTML:a._s(a._setTextColor(t.row.shipFeeTotal,t.row.hadShipFeeTotal,t.row.noShipFeeTotal,t.row.hadShipFeeTotal))}})]}}])}),a._v(" "),r("el-table-column",{attrs:{prop:"shipFeeTotalActual",sortable:"",label:"实际运费合计",width:"120"}}),a._v(" "),r("el-table-column",{attrs:{prop:"onPay",sortable:"",label:"现付",width:"90"}}),a._v(" "),r("el-table-column",{attrs:{prop:"noOnPay",sortable:"",label:"未核销现付",width:"90"},scopedSlots:a._u([{key:"default",fn:function(t){return[r("span",{domProps:{innerHTML:a._s(a._setTextColor(t.row.onPay,t.row.hadOnPay,t.row.noOnPay,t.row.noOnPay))}})]}}])}),a._v(" "),r("el-table-column",{attrs:{prop:"hadOnPay",sortable:"",label:"已核销现付",width:"90"},scopedSlots:a._u([{key:"default",fn:function(t){return[r("span",{domProps:{innerHTML:a._s(a._setTextColor(t.row.onPay,t.row.hadOnPay,t.row.noOnPay,t.row.hadOnPay))}})]}}])}),a._v(" "),r("el-table-column",{attrs:{prop:"onPayActual",sortable:"",label:"实际核销现付",width:"90"}}),a._v(" "),r("el-table-column",{attrs:{prop:"arrivalPay",sortable:"",label:"到付",width:"90"}}),a._v(" "),r("el-table-column",{attrs:{prop:"noArrivalPay",sortable:"",label:"未核销到付",width:"90"},scopedSlots:a._u([{key:"default",fn:function(t){return[r("span",{domProps:{innerHTML:a._s(a._setTextColor(t.row.arrivalPay,t.row.hadArrivalPay,t.row.noArrivalPay,t.row.noArrivalPay))}})]}}])}),a._v(" "),r("el-table-column",{attrs:{prop:"hadArrivalPay",sortable:"",label:"已核销到付",width:"90"},scopedSlots:a._u([{key:"default",fn:function(t){return[r("span",{domProps:{innerHTML:a._s(a._setTextColor(t.row.arrivalPay,t.row.hadArrivalPay,t.row.noArrivalPay,t.row.hadArrivalPay))}})]}}])}),a._v(" "),r("el-table-column",{attrs:{prop:"arrivalPayActual",sortable:"",label:"实际核销到付",width:"90"}}),a._v(" "),r("el-table-column",{attrs:{prop:"backPay",sortable:"",label:"回单付",width:"90"}}),a._v(" "),r("el-table-column",{attrs:{prop:"noBackPay",sortable:"",label:"未核销回单付",width:"100"},scopedSlots:a._u([{key:"default",fn:function(t){return[r("span",{domProps:{innerHTML:a._s(a._setTextColor(t.row.backPay,t.row.hadBackPay,t.row.noBackPay,t.row.noBackPay))}})]}}])}),a._v(" "),r("el-table-column",{attrs:{prop:"hadBackPay",sortable:"",label:"已核销回单付",width:"100"},scopedSlots:a._u([{key:"default",fn:function(t){return[r("span",{domProps:{innerHTML:a._s(a._setTextColor(t.row.backPay,t.row.hadBackPay,t.row.noBackPay,t.row.hadBackPay))}})]}}])}),a._v(" "),r("el-table-column",{attrs:{prop:"backPayActual",sortable:"",label:"实际核销回单付",width:"100"}}),a._v(" "),r("el-table-column",{attrs:{prop:"monthPay",sortable:"",label:"月结",width:"90"}}),a._v(" "),r("el-table-column",{attrs:{prop:"noMonthPay",sortable:"",label:"未核销月结",width:"90"},scopedSlots:a._u([{key:"default",fn:function(t){return[r("span",{domProps:{innerHTML:a._s(a._setTextColor(t.row.monthPay,t.row.hadMonthPay,t.row.noMonthPay,t.row.noMonthPay))}})]}}])}),a._v(" "),r("el-table-column",{attrs:{prop:"hadMonthPay",sortable:"",label:"已核销月结",width:"90"},scopedSlots:a._u([{key:"default",fn:function(t){return[r("span",{domProps:{innerHTML:a._s(a._setTextColor(t.row.monthPay,t.row.hadMonthPay,t.row.noMonthPay,t.row.hadMonthPay))}})]}}])}),a._v(" "),r("el-table-column",{attrs:{prop:"monthPayActual",sortable:"",label:"实际核销月结",width:"90"}}),a._v(" "),r("el-table-column",{attrs:{prop:"unusualPay",sortable:"",label:"异动费用",width:"90"}}),a._v(" "),r("el-table-column",{attrs:{prop:"noUnusualPay",sortable:"",label:"未核销异动费用",width:"110"},scopedSlots:a._u([{key:"default",fn:function(t){return[r("span",{domProps:{innerHTML:a._s(a._setTextColor(t.row.unusualPay,t.row.hadUnusualPay,t.row.noUnusualPay,t.row.noUnusualPay))}})]}}])}),a._v(" "),r("el-table-column",{attrs:{prop:"hadUnusualPay",sortable:"",label:"已核销异动费用",width:"110"},scopedSlots:a._u([{key:"default",fn:function(t){return[r("span",{domProps:{innerHTML:a._s(a._setTextColor(t.row.unusualPay,t.row.hadUnusualPay,t.row.noUnusualPay,t.row.hadUnusualPay))}})]}}])}),a._v(" "),r("el-table-column",{attrs:{prop:"unusualPayActual",sortable:"",label:"实际核销异动费用",width:"110"}}),a._v(" "),r("el-table-column",{attrs:{prop:"shipFromCityName",sortable:"",label:"发站",width:"120"},scopedSlots:a._u([{key:"default",fn:function(t){return[a._v("\n          "+a._s(a._processTableSlot(t,"shipFromCityName"))+"\n        ")]}}])}),a._v(" "),r("el-table-column",{attrs:{prop:"shipToCityName",sortable:"",label:"到站",width:"120"},scopedSlots:a._u([{key:"default",fn:function(t){return[a._v("\n          "+a._s(a._processTableSlot(t,"shipToCityName"))+"\n        ")]}}])}),a._v(" "),r("el-table-column",{attrs:{prop:"cargoName",sortable:"",label:"货品名",width:"120"}}),a._v(" "),r("el-table-column",{attrs:{prop:"cargoAmount",sortable:"",label:"件数",width:"120"}}),a._v(" "),r("el-table-column",{attrs:{prop:"cargoWeight",sortable:"",label:"重量",width:"120"}}),a._v(" "),r("el-table-column",{attrs:{prop:"cargoVolume",sortable:"",label:"体积",width:"120"}}),a._v(" "),r("el-table-column",{attrs:{prop:"shipSenderUnit",sortable:"",label:"发货方",width:"120"}}),a._v(" "),r("el-table-column",{attrs:{prop:"shipSenderName",sortable:"",label:"发货人",width:"120"}}),a._v(" "),r("el-table-column",{attrs:{prop:"shipRemarks",sortable:"",label:"运单备注",width:"120"}})],1)],1)])},staticRenderFns:[]};e.a=r}});