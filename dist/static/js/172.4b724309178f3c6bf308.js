webpackJsonp([172,291],{"+RrR":function(t,e,a){"use strict";var l=a("woOf"),o=a.n(l),i=a("pAQG"),n=a("0xDb");e.a={components:{querySelect:i.a},data:function(){return{senderSearch:"",searchForm:{shipSenderName:"",senderCustomerUnit:"",shipSn:""},btnsize:"mini",selectVal:""}},props:{info:{type:Array,default:[]}},methods:{querySearch:function(t,e,a){var l=o()([],this.info);for(var i in console.log(l.length),this.searchForm[t]=e,this.selectVal=t,this.searchForm)void 0!==this.searchForm[i]&&""!==this.searchForm[i]||this.$emit("change",Object(n.objectMerge2)([],this.info));var r=e?l.filter(this.createFilter(e,t)):l;a(r);var s=[];r.forEach(function(t){s.push(t)}),this.$emit("change",s)},createFilter:function(e,a){return function(t){return-1!==t[a].toLowerCase().indexOf(e.toLowerCase())}},handleSelect:function(t){this.searchForm[this.selectVal]=t[this.selectVal],this.selectVal="";var e=[];e.push(t),this.$emit("change",e),this.searchForm=this.$options.data().searchForm},clearSender:function(t){this.searchForm=this.$options.data().searchForm}}}},AYHi:function(t,e,a){"use strict";var l=a("pFYg"),r=a.n(l),i=a("woOf"),s=a.n(i),o=a("Dd8w"),n=a.n(o),c=a("bOdI"),h=a.n(c),u=a("NYxO"),b=(a("TsW9"),a("IcMT")),d=a("pAQG"),p=a("0xDb"),f=a("QS/K"),m=a("G6YA"),g=a("0xDb");e.a={data:function(){var t;return t={loading:!0,searchTime:[Object(p.parseTime)(new Date-5184e6),Object(p.parseTime)(new Date)],tablekey:"",truckMessage:"",incomePayType:"RECEIVABLE",paymentsType:0,settlementId:178},h()(t,"loading",!1),h()(t,"btnsize","mini"),h()(t,"searchForm",{}),h()(t,"selectedRight",[]),h()(t,"selectedLeft",[]),h()(t,"orgLeftTable",[]),h()(t,"countOrgLeftTable",[]),h()(t,"leftTable",[]),h()(t,"rightTable",[]),h()(t,"orgData",{left:[],right:[]}),h()(t,"senderSearch",""),h()(t,"arrLastPartActualFeeName",[]),h()(t,"arrLastPartNoFeeName",[]),h()(t,"arrLastPartFeeName",[]),h()(t,"arrNoPayName",[]),h()(t,"arrPayName",[]),h()(t,"arrPayNameActual",[]),t},props:{setLoadTable:{type:Object,default:function(){}},isModify:{type:Boolean,default:!1},countSuccessList:{type:Array,default:[]},countNum:{type:Number,default:0},orgId:{type:[Number,String]}},computed:n()({},Object(u.b)(["otherinfo"])),components:{transferTable:b.a,querySelect:d.a,currentSearch:m.default},watch:{isModify:{handler:function(t,e){},deep:!0},setLoadTable:{handler:function(t,e){t&&(this.orgData=s()({},t))},deep:!0},countSuccessList:{handler:function(t,e){this.initCount(t,e)},deep:!0}},mounted:function(){this.getList()},activated:function(){this.getList()},methods:{getPayName:function(){if(0!==this.rightTable.length){for(var t in this.arrNoPayName=[],this.rightTable[0])0===t.indexOf("no")&&this.arrNoPayName.push(t);for(var e in this.arrPayName=[],this.arrNoPayName){var a=this.arrNoPayName[e].substring(2,3).toLowerCase()+this.arrNoPayName[e].substring(3);this.arrPayName.push(a)}for(var l in this.arrhadPayName=[],this.arrNoPayName){var i="had"+this.arrNoPayName[l].substring(2);this.arrhadPayName.push(i)}for(var r in this.arrPayNameActual=[],this.arrPayName){var s=this.arrPayName[r]+"Actual";this.arrPayNameActual.push(s)}var o={arrPayName:this.arrPayName,arrNoPayName:this.arrNoPayName,arrhadPayName:this.arrhadPayName,arrPayNameActual:this.arrPayNameActual};this.$emit("feeName",o)}},initCount:function(t,e){var i=this;if(console.log("============后台返回的智能运单=============\n",t),this.arrLastPartActualFeeName=[],this.arrLastPartNoFeeName=[],this.arrLastPartFeeName=[],this.leftTable=[],this.rightTable=Object(p.objectMerge2)([],t),this.$emit("loadTable",this.rightTable),0===this.rightTable.length)return this.$message({type:"warning",message:"无符合智能核销条件的运单。"}),this.leftTable=Object(p.objectMerge2)([],this.orgLeftTable),!1;console.log("orgLeftTable",this.orgLeftTable.length),this.leftTable=s()([],this.orgLeftTable).filter(function(e,t){return-1===i.rightTable.findIndex(function(t){return t.shipSn===e.shipSn})}),0!==this.leftTable.length&&(this.leftTable=this.uniqueArray(this.leftTable,"shipSn")),this.$emit("loadTable",this.rightTable),this.getPayName();this.arrPayNameActual.forEach(function(t,e){var a=i.rightTable[i.rightTable.length-1][t],l=i.rightTable[i.rightTable.length-1][i.arrNoPayName[e]];l!==a&&""!==l&&null!==l&&""!==a&&null!==a&&(void 0===l?"undefined":r()(l))===(void 0===a?"undefined":r()(a))&&(!0,i.arrLastPartFeeName.push(i.arrPayName[e]),i.arrLastPartActualFeeName.push(t),i.arrLastPartNoFeeName.push(i.arrNoPayName[e]))}),this.rightTable[this.rightTable.length-1].shipFeeTotal!==this.rightTable[this.rightTable.length-1].shipFeeTotalActual&&(this.$notify.info({title:"提示",message:"最后一条数据实际只需支付部分未核销费用，多余的需要返回到左边列表！"}),this.leftTable.push(Object(p.objectMerge2)([],this.rightTable[this.rightTable.length-1])),this.arrLastPartFeeName.forEach(function(t){var e="no"+t.substring(0,1).toUpperCase()+t.substring(1),a=t+"Actual";i.leftTable[i.leftTable.length-1][a]=i.rightTable[i.rightTable.length-1][e]-i.rightTable[i.rightTable.length-1][a]})),this.$emit("loadTable",this.rightTable),this.countOrgLeftTable=Object(p.objectMerge2)([],this.leftTable)},getList:function(){var e=this;this.leftTable=this.$options.data().leftTable,this.rightTable=this.$options.data().rightTable,this.orgLeftTable=this.$options.data().orgLeftTable;var t={};this.isModify?(this.leftTable=this.orgData.left,this.orgLeftTable=this.orgData.left,this.rightTable=this.orgData.right,this.countOrgLeftTable=this.orgData.left,this.$emit("loadTable",this.rightTable)):(this.$set(t,"orgId",this.orgId),this.$set(t,"incomePayType",this.incomePayType),this.$set(t,"paymentsType",this.paymentsType),this.$set(t,"settlementId",this.settlementId),this.$set(t,"startTime",Object(p.parseTime)(this.searchTime[0],"{y}-{m}-{d} ")+"00:00:00"),this.$set(t,"endTime",Object(p.parseTime)(this.searchTime[1],"{y}-{m}-{d} ")+"23:59:59"),this.$set(t,"autoTotalAmount",""),Object(f.c)(t).then(function(t){e.loading=!1,e.leftTable=t,e.orgLeftTable=t,e.countOrgLeftTable=t,e.$emit("loadTable",e.rightTable)}).catch(function(t){e.loading=!1,e._handlerCatchMsg(t)}),t={})},getSearch:function(t){this.leftTable=t},clickDetailsRight:function(t){this.$refs.multipleTableRight.toggleRowSelection(t)},clickDetailsLeft:function(t){this.$refs.multipleTableLeft.toggleRowSelection(t)},getSelectionRight:function(t){this.selectedRight=t},getSelectionLeft:function(t){this.selectedLeft=t},changeTableKey:function(){this.tablekey=Math.random()},doAction:function(t){switch(t){case"goLeft":this.goLeft();break;case"goRight":this.goRight()}},dclickAddItem:function(t,e){this.selectedRight=[],this.selectedRight.push(t),console.log("selectedRight",this.selectedRight.length),this.doAction("goLeft")},dclickMinusItem:function(t,e){this.selectedLeft=[],this.selectedLeft.push(t),console.log("selectedLeft",this.selectedLeft.length),this.doAction("goRight")},uniqueArray:function(t,e,a){for(var l=[t[0]],i=1;i<t.length;i++){for(var r=t[i],s=!1,o=0;o<l.length;o++)if(r[e]===l[o][e]){if(a)for(var n in a)l[o][a[n]]=g.tmsMath._add(r[a[n]],l[o][a[n]]);s=!0;break}s||l.push(r)}return l},goLeft:function(){var a=this;0===this.selectedRight.length?this.$message({type:"warning",message:"请在左边表格选择数据"}):(this.selectedRight.forEach(function(e,t){a.leftTable=Object(p.objectMerge2)([],a.leftTable).filter(function(t){return t.shipSn!==e.shipSn}),a.rightTable.push(e),a.countOrgLeftTable=Object(p.objectMerge2)([],a.countOrgLeftTable).filter(function(t){return t.shipSn!==e.shipSn})}),this.rightTable=this.uniqueArray(Object(p.objectMerge2)(this.rightTable),"shipSn",this.arrLastPartActualFeeName),this.selectedRight=[],this.getPayName(),this.$emit("loadTable",this.rightTable),console.log("-",this.countOrgLeftTable.length))},goRight:function(){var a=this;0===this.selectedLeft.length?this.$message({type:"warning",message:"请在右边表格选择数据"}):(this.selectedLeft.forEach(function(e,t){a.leftTable.push(e),a.countOrgLeftTable.push(e),a.rightTable=Object(p.objectMerge2)([],a.rightTable).filter(function(t){return t.shipSn!==e.shipSn})}),this.leftTable=this.uniqueArray(Object(p.objectMerge2)(this.leftTable),"shipSn",this.arrLastPartActualFeeName),this.countOrgLeftTable=this.uniqueArray(Object(p.objectMerge2)(this.countOrgLeftTable),"shipSn",this.arrLastPartActualFeeName),this.selectedLeft=[],this.getPayName(),this.$emit("loadTable",this.rightTable),console.log("+",this.countOrgLeftTable.length))},addItem:function(t,e){var a=this;clearTimeout(this.addTimer),this.addTimer=setTimeout(function(){a.selectedRight=[],a.selectedRight[e]=t,a.doAction("goLeft")})},minusItem:function(t,e){var a=this;clearTimeout(this.minusTimer),this.minusTimer=setTimeout(function(){a.selectedLeft=[],a.selectedLeft[e]=t,a.doAction("goRight")})},addALLList:function(){this.selectedRight=s()([],this.leftTable),this.doAction("goLeft")},minusAllList:function(){this.selectedLeft=s()([],this.rightTable),this.doAction("goRight")},getSumRight:function(t){return Object(g.getSummaries)(t,["shipFeeTotalActual","shipFeeTotal","onPay","noOnPay","hadOnPay","hadBackPay","hadArrivalPay","noArrivalPay","hadMonthPay","noMonthPay","noBackPay","hadUnusualPay","noUnusualPay","arrivalPay","backPay","unusualPay","monthPay","cargoAmount|","cargoWeight|","cargoVolume|","noShipFeeTotal","noShipFeeTotal","hadShipFeeTotal"])},getSumLeft:function(t){return Object(g.getSummaries)(t,["shipFeeTotalActual","shipFeeTotal","onPay","noOnPay","hadBackPay","hadArrivalPay","hadOnPay","noArrivalPay","hadMonthPay","noMonthPay","noBackPay","hadUnusualPay","noUnusualPay","hadBackPay","hadArrivalPay","arrivalPay","backPay","unusualPay","monthPay","cargoAmount|","cargoWeight|","cargoVolume|","noShipFeeTotal","noShipFeeTotal","hadShipFeeTotal","hadShipFeeTotal","onPayActual","arrivalPayActual","backPayActual","unusualPayActual","monthPayActual"])}}}},EFuo:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l=a("AYHi"),i=a("Zhxg");var r=function(t){a("bd3A")},s=a("VU/8")(l.a,i.a,r,null,null);e.default=s.exports},G6YA:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l=a("+RrR"),i=a("IqXp");var r=function(t){a("Qvz8")},s=a("VU/8")(l.a,i.a,r,null,null);e.default=s.exports},IcMT:function(t,e,a){"use strict";var l=a("PI8x"),i=a("QVoP");var r=function(t){a("jCPK")},s=a("VU/8")(l.a,i.a,r,null,null);e.a=s.exports},IqXp:function(t,e,a){"use strict";var l={render:function(){var a=this,t=a.$createElement,l=a._self._c||t;return l("el-form",{ref:"searchForm",staticClass:"tableHeadItemForm",attrs:{inline:"","label-position":"right",model:a.searchForm,"label-width":"60px"}},[l("el-form-item",[l("el-select",{attrs:{placeholder:"发货方或发货人",size:a.btnsize,clearable:""},on:{focus:a.clearSender},model:{value:a.senderSearch,callback:function(t){a.senderSearch=t},expression:"senderSearch"}},[l("el-option",{attrs:{label:"发货方",value:"unit"}}),a._v(" "),l("el-option",{attrs:{label:"发货人",value:"customer"}})],1)],1),a._v(" "),"customer"===a.senderSearch?l("el-form-item",[l("el-autocomplete",{ref:"searchAutocomplete",attrs:{"popper-class":"popperHide",size:a.btnsize,maxlength:15,"fetch-suggestions":function(t,e){return a.querySearch("shipSenderName",t,e)},placeholder:"发货人搜索"},on:{select:a.handleSelect},model:{value:a.searchForm.shipSenderName,callback:function(t){a.$set(a.searchForm,"shipSenderName",t)},expression:"searchForm.shipSenderName"}})],1):a._e(),a._v(" "),"unit"===a.senderSearch?l("el-form-item",[l("el-autocomplete",{attrs:{"popper-class":"popperHide",size:a.btnsize,maxlength:15,"fetch-suggestions":function(t,e){return a.querySearch("shipSenderUnit",t,e)},placeholder:"发货方搜索"},on:{select:a.handleSelect},model:{value:a.searchForm.shipSenderUnit,callback:function(t){a.$set(a.searchForm,"shipSenderUnit",t)},expression:"searchForm.shipSenderUnit"}})],1):a._e(),a._v(" "),l("el-form-item",{attrs:{label:"运单号"}},[l("el-autocomplete",{attrs:{"popper-class":"popperHide",size:a.btnsize,maxlength:20,"fetch-suggestions":function(t,e){return a.querySearch("shipSn",t,e)},placeholder:"运单号搜索"},on:{select:a.handleSelect},scopedSlots:a._u([{key:"default",fn:function(t){var e=t.item;return[l("div",{staticClass:"name"},[a._v(a._s(e.shipSn))])]}}]),model:{value:a.searchForm.shipSn,callback:function(t){a.$set(a.searchForm,"shipSn",t)},expression:"searchForm.shipSn"}})],1)],1)},staticRenderFns:[]};e.a=l},PI8x:function(t,e,a){"use strict";e.a={data:function(){return{isShowLeft:!1,isShowRight:!1,isShowReback:!1,searchForm:""}},methods:{doAction:function(t){switch(t){case"showAllLeft":this.showAllLeft();break;case"showAllRight":this.showAllRight();break;case"showReback":this.showReback()}},showAllLeft:function(){this.isShowLeft=!0,this.isShowRight=!1,this.isShowReback=!0},showAllRight:function(){this.isShowLeft=!1,this.isShowRight=!0,this.isShowReback=!0},showReback:function(){this.isShowReback=!1,this.isShowLeft=!1,this.isShowRight=!1}}}},"QS/K":function(t,e,a){"use strict";e.i=function(t){return l.b.post("/api-finance/finance/tmsfinancecapitalflow/v1/list/",t).then(function(t){return t.data})},e.a=function(t,e){return l.b.get("/api-finance/finance/tmsfinancecapitalflow/v1/getFeeInfo?orgId="+t+"&paymentsType="+e).then(function(t){return t.data})},e.c=function(t){return l.b.post("/api-finance/finance/tmsfinancecapitalflow/v1/getOrderShipList/",{orgId:t.orgId,paymentsType:t.paymentsType,incomePayType:t.incomePayType,settlementId:t.settlementId,startTime:t.startTime,endTime:t.endTime,autoTotalAmount:t.autoTotalAmount,shipSenderName:t.shipSenderName,feeId:t.feeId,truckIdNumber:t.truckIdNumber}).then(function(t){return t.data})},e.g=function(t){return l.b.post("/api-finance/finance/tmsfinancecapitalflow/v1/cancelSettlement/",{flowId:t.flowId,detailFlowId:t.detailFlowId})},e.f=function(t){return l.b.post("/api-finance/finance/tmsfinancecapitalflow/v1/addIncome/",t).then(function(t){return t.data})},e.h=function(t){return l.b.post("/api-finance/finance/tmsfinancecapitalflowdetail/v1/list/",t).then(function(t){return t.data})},e.e=function(t,e){return l.b.get("/api-finance/finance/tmsfinancecapitalflow/v1/getSettlementInfo?flowId="+t+"&settlementId="+e)},e.b=function(t){return l.b.post("/api-finance/finance/tmsfinancefeetype/v1/getFeeTypeDict",{paymentsType:t.paymentsType,fiOrderType:t.fiOrderType}).then(function(t){return t.data})},e.d=function(t){return l.b.post("/api-finance/finance/tmsfinancefinancialway/v1/getOrgFirstFinancialWay/",{financialWay:t.financialWay,orgId:t.orgId}).then(function(t){return t.data})};var l=a("Vo7i");a("0xDb")},QVoP:function(t,e,a){"use strict";var l={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"transferTable"},[a("div",{staticClass:"transferTable_header"},[a("div",{staticClass:"transferTable_searchs"},[a("div",{staticClass:"transferTable_fresh"},[e._t("tableRefresh")],2),e._v(" "),e._t("tableSearch")],2),e._v(" "),a("div",{staticClass:"transferTable_header_btn_direction"},[a("el-tooltip",{attrs:{effect:"dark",content:"向左侧拉伸",placement:"top-end"}},[a("el-button",{attrs:{icon:"el-icon-arrow-right",type:"primary",circle:"",disabled:e.isShowLeft,size:"mini",plain:""},on:{click:function(t){e.doAction("showAllLeft")}}})],1),e._v(" "),a("el-tooltip",{attrs:{effect:"dark",content:"向右侧拉伸",placement:"top-start"}},[a("el-button",{attrs:{icon:"el-icon-arrow-left",type:"primary",circle:"",disabled:e.isShowRight,size:"mini",plain:""},on:{click:function(t){e.doAction("showAllRight")}}})],1),e._v(" "),a("transition",{attrs:{name:"el-zoom-in-bottom"}},[e.isShowReback?a("el-button",{attrs:{icon:"el-icon-refresh",type:"primary",circle:"",size:"mini",plain:""},on:{click:function(t){e.doAction("showReback")}}}):e._e()],1),e._v(" "),a("div",{staticClass:"transferTable_header_btn_box clearfix"},[e._t("btnsBox")],2)],1)]),e._v(" "),a("div",{staticClass:"transferTable_content"},[a("div",{staticClass:"transferTable_content_table paddingRight",class:[e.isShowLeft?"showTableLeft":e.isShowRight?"shortTableLeft":""]},[e._t("tableLeft",[e._v("左边表格区")])],2),e._v(" "),a("div",{staticClass:"transferTable_content_table",class:[e.isShowRight?"showTableRight":""]},[e._t("tableRight",[e._v("右边表格区")])],2)])])},staticRenderFns:[]};e.a=l},Qvz8:function(t,e){},TsW9:function(t,e,a){"use strict";e.a=function(t,e){return l.b.get("/api-order/order/load/v1/getBatchNo/",{params:{orgId:t,loadTypeId:e}})},e.h=function(t){return l.b.post("/api-order/order/load/v1/",t)},e.i=function(t){return l.b.put("/api-order/order/load/v1/",t)},e.c=function(t){return l.b.get("/api-order/order/load/v1/selectAddLoadRepertoryList/",{params:{orgId:t}})},e.f=function(t,e){return l.b.get("/api-order/order/load/v1/selectUpdateLoadRepertoryList/?orgId="+t+"&loadId="+e)},e.g=function(t,e){return l.b.get("/api-order/order/load/v1/selectUpdateLoadDetailList/?orgId="+t+"&loadId="+e)},e.d=function(t){return l.b.get("/api-order/order/load/v1/selectLoadDetailList/",{params:{loadId:t}})},e.e=function(){return l.b.get("/api-system/system/trunk/v1/findCarAndDriver/").then(function(t){return t})},e.b=function(){return l.b.get("/api-system/system/trunk/v1/findDriverAndCar/").then(function(t){return t})};var l=a("Vo7i")},Zhxg:function(t,e,a){"use strict";var l={render:function(){var a=this,t=a.$createElement,l=a._self._c||t;return l("transferTable",{directives:[{name:"loading",rawName:"v-loading",value:a.loading,expression:"loading"}]},[l("div",{staticClass:"tableHeadItemForm clearfix",attrs:{slot:"tableSearch"},slot:"tableSearch"},[l("currentSearch",{attrs:{info:a.countOrgLeftTable},on:{change:a.getSearch}})],1),a._v(" "),l("div",{staticClass:"tableHeadItemBtn",staticStyle:{height:"100%"},attrs:{slot:"tableLeft"},slot:"tableLeft"},[l("el-button",{staticClass:"tableAllBtn",attrs:{size:"mini"},on:{click:a.addALLList}}),a._v(" "),l("el-table",{key:a.tablekey,ref:"multipleTableRight",attrs:{data:a.leftTable,border:"","tooltip-effect":"dark",triped:"",height:"100%","summary-method":a.getSumRight,"default-sort":{prop:"id",order:"ascending"},"show-overflow-tooltip":!0,"show-summary":!0},on:{"row-click":a.clickDetailsRight,"selection-change":a.getSelectionRight,"row-dblclick":a.dclickAddItem}},[l("el-table-column",{attrs:{fixed:"",width:"50",type:"index",label:"序号"},scopedSlots:a._u([{key:"default",fn:function(t){return[a._v("\n          "+a._s(t.$index+1)+"\n        ")]}}])}),a._v(" "),l("el-table-column",{attrs:{fixed:"",width:"50"},scopedSlots:a._u([{key:"default",fn:function(e){return[l("el-button",{staticClass:"tableItemBtn",attrs:{size:"mini"},on:{click:function(t){a.addItem(e.row,e.$index)}}})]}}])}),a._v(" "),l("el-table-column",{attrs:{prop:"shipSn",label:"运单号",fixed:"",width:"120"}}),a._v(" "),l("el-table-column",{attrs:{prop:"shipGoodsSn",sortable:"",label:"货号",width:"140"}}),a._v(" "),l("el-table-column",{attrs:{prop:"shipFeeTotal",sortable:"",label:"运费合计",width:"120"}}),a._v(" "),l("el-table-column",{attrs:{prop:"noShipFeeTotal",sortable:"",label:"未核销运费合计",width:"120"}}),a._v(" "),l("el-table-column",{attrs:{prop:"hadShipFeeTotal",sortable:"",label:"已核销运费合计",width:"120"}}),a._v(" "),l("el-table-column",{attrs:{prop:"onPay",sortable:"",label:"现付",width:"90"}}),a._v(" "),l("el-table-column",{attrs:{prop:"noOnPay",sortable:"",label:"未核销现付",width:"90"}}),a._v(" "),l("el-table-column",{attrs:{prop:"hadOnPay",sortable:"",label:"已核销现付",width:"90"}}),a._v(" "),l("el-table-column",{attrs:{prop:"arrivalPay",sortable:"",label:"到付",width:"90"}}),a._v(" "),l("el-table-column",{attrs:{prop:"noArrivalPay",sortable:"",label:"未核销到付",width:"90"}}),a._v(" "),l("el-table-column",{attrs:{prop:"hadArrivalPay",sortable:"",label:"已核销到付",width:"90"}}),a._v(" "),l("el-table-column",{attrs:{prop:"backPay",sortable:"",label:"回单付",width:"90"}}),a._v(" "),l("el-table-column",{attrs:{prop:"noBackPay",sortable:"",label:"未核销回单付",width:"100"}}),a._v(" "),l("el-table-column",{attrs:{prop:"hadBackPay",sortable:"",label:"已核销回单付",width:"100"}}),a._v(" "),l("el-table-column",{attrs:{prop:"unusualPay",sortable:"",label:"异动费用",width:"90"}}),a._v(" "),l("el-table-column",{attrs:{prop:"noUnusualPay",sortable:"",label:"未核销异动费用",width:"110"}}),a._v(" "),l("el-table-column",{attrs:{prop:"hadUnusualPay",sortable:"",label:"已核销异动费用",width:"110"}}),a._v(" "),l("el-table-column",{attrs:{prop:"monthPay",sortable:"",label:"月结",width:"90"}}),a._v(" "),l("el-table-column",{attrs:{prop:"noMonthPay",sortable:"",label:"未核销月结",width:"90"}}),a._v(" "),l("el-table-column",{attrs:{prop:"hadMonthPay",sortable:"",label:"已核销月结",width:"90"}}),a._v(" "),l("el-table-column",{attrs:{prop:"shipFromCityName",sortable:"",label:"出发城市",width:"120"},scopedSlots:a._u([{key:"default",fn:function(t){return[a._v("\n          "+a._s(a._processTableSlot(t,"shipFromCityName"))+"\n        ")]}}])}),a._v(" "),l("el-table-column",{attrs:{prop:"shipToCityName",sortable:"",label:"到达城市",width:"120"},scopedSlots:a._u([{key:"default",fn:function(t){return[a._v("\n          "+a._s(a._processTableSlot(t,"shipToCityName"))+"\n        ")]}}])}),a._v(" "),l("el-table-column",{attrs:{prop:"cargoName",sortable:"",label:"货品名",width:"100"}}),a._v(" "),l("el-table-column",{attrs:{prop:"cargoAmount",sortable:"",label:"件数",width:"80"}}),a._v(" "),l("el-table-column",{attrs:{prop:"cargoWeight",sortable:"",label:"重量",width:"80"}}),a._v(" "),l("el-table-column",{attrs:{prop:"cargoVolume",sortable:"",label:"体积",width:"80"}}),a._v(" "),l("el-table-column",{attrs:{prop:"shipSenderUnit",sortable:"",label:"发货方",width:"120"}}),a._v(" "),l("el-table-column",{attrs:{prop:"shipSenderName",sortable:"",label:"发货人",width:"120"}}),a._v(" "),l("el-table-column",{attrs:{prop:"shipRemarks",sortable:"",label:"运单备注",width:"150"}})],1)],1),a._v(" "),l("div",{staticClass:"tableHeadItemBtn",attrs:{slot:"tableRight"},slot:"tableRight"},[l("el-button",{staticClass:"tableAllBtnMinus",attrs:{size:"mini"},on:{click:a.minusAllList}}),a._v(" "),l("el-table",{key:a.tablekey,ref:"multipleTableLeft",staticStyle:{height:"100%"},attrs:{data:a.rightTable,border:"","tooltip-effect":"dark",triped:"",height:"100%","summary-method":a.getSumLeft,"default-sort":{prop:"id",order:"ascending"},"show-summary":!0},on:{"row-dblclick":a.dclickMinusItem,"row-click":a.clickDetailsLeft,"selection-change":a.getSelectionLeft}},[l("el-table-column",{attrs:{fixed:"",width:"50",type:"index",label:"序号"},scopedSlots:a._u([{key:"default",fn:function(t){return[a._v("\n          "+a._s(t.$index+1)+"\n        ")]}}])}),a._v(" "),l("el-table-column",{attrs:{fixed:"",width:"50"},scopedSlots:a._u([{key:"default",fn:function(e){return[l("el-button",{staticClass:"tableItemBtnMinus",attrs:{size:"mini"},on:{click:function(t){a.minusItem(e.row,e.$index)}}})]}}])}),a._v(" "),l("el-table-column",{attrs:{prop:"shipSn",label:"运单号",fixed:"",width:"120"}}),a._v(" "),l("el-table-column",{attrs:{prop:"shipGoodsSn",sortable:"",label:"货号",width:"140"}}),a._v(" "),l("el-table-column",{attrs:{prop:"shipFeeTotalActual",sortable:"",label:"实际合计",width:"90"}}),a._v(" "),l("el-table-column",{attrs:{prop:"shipFeeTotal",sortable:"",label:"运费合计",width:"90"}}),a._v(" "),l("el-table-column",{attrs:{prop:"noShipFeeTotal",sortable:"",label:"未核销运费合计",width:"120"}}),a._v(" "),l("el-table-column",{attrs:{prop:"hadShipFeeTotal",sortable:"",label:"已核销运费合计",width:"120"}}),a._v(" "),l("el-table-column",{attrs:{prop:"shipFeeTotalActual",sortable:"",label:"实际运费合计",width:"120"}}),a._v(" "),l("el-table-column",{attrs:{prop:"onPay",sortable:"",label:"现付",width:"90"}}),a._v(" "),l("el-table-column",{attrs:{prop:"noOnPay",sortable:"",label:"未核销现付",width:"90"}}),a._v(" "),l("el-table-column",{attrs:{prop:"hadOnPay",sortable:"",label:"已核销现付",width:"90"}}),a._v(" "),l("el-table-column",{attrs:{prop:"onPayActual",sortable:"",label:"实结现付",width:"90"}}),a._v(" "),l("el-table-column",{attrs:{prop:"arrivalPay",sortable:"",label:"到付",width:"90"}}),a._v(" "),l("el-table-column",{attrs:{prop:"noArrivalPay",sortable:"",label:"未核销到付",width:"90"}}),a._v(" "),l("el-table-column",{attrs:{prop:"hadArrivalPay",sortable:"",label:"已核销到付",width:"90"}}),a._v(" "),l("el-table-column",{attrs:{prop:"arrivalPayActual",sortable:"",label:"实结到付",width:"90"}}),a._v(" "),l("el-table-column",{attrs:{prop:"backPay",sortable:"",label:"回单付",width:"90"}}),a._v(" "),l("el-table-column",{attrs:{prop:"noBackPay",sortable:"",label:"未核销回单付",width:"100"}}),a._v(" "),l("el-table-column",{attrs:{prop:"hadBackPay",sortable:"",label:"已核销回单付",width:"100"}}),a._v(" "),l("el-table-column",{attrs:{prop:"backPayActual",sortable:"",label:"实结回单付",width:"100"}}),a._v(" "),l("el-table-column",{attrs:{prop:"unusualPay",sortable:"",label:"异动费用",width:"90"}}),a._v(" "),l("el-table-column",{attrs:{prop:"noUnusualPay",sortable:"",label:"未核销异动费用",width:"110"}}),a._v(" "),l("el-table-column",{attrs:{prop:"hadUnusualPay",sortable:"",label:"已核销异动费用",width:"110"}}),a._v(" "),l("el-table-column",{attrs:{prop:"unusualPayActual",sortable:"",label:"实结异动费用",width:"110"}}),a._v(" "),l("el-table-column",{attrs:{prop:"monthPay",sortable:"",label:"月结",width:"90"}}),a._v(" "),l("el-table-column",{attrs:{prop:"noMonthPay",sortable:"",label:"未核销月结",width:"90"}}),a._v(" "),l("el-table-column",{attrs:{prop:"hadMonthPay",sortable:"",label:"已核销月结",width:"90"}}),a._v(" "),l("el-table-column",{attrs:{prop:"monthPayActual",sortable:"",label:"实结月结",width:"90"}}),a._v(" "),l("el-table-column",{attrs:{prop:"shipFromCityName",sortable:"",label:"出发城市",width:"120"},scopedSlots:a._u([{key:"default",fn:function(t){return[a._v("\n          "+a._s(a._processTableSlot(t,"shipFromCityName"))+"\n        ")]}}])}),a._v(" "),l("el-table-column",{attrs:{prop:"shipToCityName",sortable:"",label:"到达城市",width:"120"},scopedSlots:a._u([{key:"default",fn:function(t){return[a._v("\n          "+a._s(a._processTableSlot(t,"shipToCityName"))+"\n        ")]}}])}),a._v(" "),l("el-table-column",{attrs:{prop:"cargoName",sortable:"",label:"货品名",width:"100"}}),a._v(" "),l("el-table-column",{attrs:{prop:"cargoAmount",sortable:"",label:"件数",width:"90"}}),a._v(" "),l("el-table-column",{attrs:{prop:"cargoWeight",sortable:"",label:"重量",width:"90"}}),a._v(" "),l("el-table-column",{attrs:{prop:"cargoVolume",sortable:"",label:"体积",width:"90"}}),a._v(" "),l("el-table-column",{attrs:{prop:"shipSenderUnit",sortable:"",label:"发货方",width:"120"}}),a._v(" "),l("el-table-column",{attrs:{prop:"shipSenderName",sortable:"",label:"发货人",width:"120"}}),a._v(" "),l("el-table-column",{attrs:{prop:"shipRemarks",sortable:"",label:"运单备注",width:"150"}})],1)],1)])},staticRenderFns:[]};e.a=l},bd3A:function(t,e){},jCPK:function(t,e){}});