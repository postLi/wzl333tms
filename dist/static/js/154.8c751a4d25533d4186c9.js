webpackJsonp([154,243,321],{"1EIs":function(e,t,i){"use strict";var r=i("0xDb"),a=i("o9X6"),o=i("pAQG");t.a={name:"order-manage-search",components:{SelectTree:a.a,querySelect:o.a},props:{btnsize:{type:String,default:"mini"},orgid:{type:Number},isbatch:{type:Boolean,dafault:!1}},data:function(){return{searchCreatTime:[],searchCreatTime2:[],defaultTime:[Object(r.parseTime)(new Date-5184e6,"{y}-{m}-{d}"),Object(r.parseTime)(new Date,"{y}-{m}-{d}")],searchForm:{orgid:"",shipFromCityName:"",carrierId:"",shipToCityName:""},rules:{mobile:[{}]},pickerOptions2:{shortcuts:r.pickerOptions2}}},watch:{orgid:function(e){this.searchForm.orgid=e}},mounted:function(){this.searchForm.orgid=this.orgid,this.searchCreatTime=this.defaultTime,this.onSubmit()},methods:{onSubmit:function(){var e={};e.orgId=this.searchForm.orgid,this.isbatch||(e.shipFromCityName=this.searchForm.shipFromCityName,e.shipToCityName=this.searchForm.shipToCityName),this.searchCreatTime&&this.searchCreatTime[0]&&(e.transferTimeStart=this.searchCreatTime[0]+" 00:00:00",e.transferTimeEnd=this.searchCreatTime[1]+" 23:59:59"),this.searchCreatTime2&&this.searchCreatTime2[0]&&!this.isbatch&&(e.ydCreateTimeStart=this.searchCreatTime2[0]+" 00:00:00",e.ydCreateTimeEnd=this.searchCreatTime2[1]+" 23:59:59"),e.carrierId=this.searchForm.carrierId,this.$emit("change",e)},clearForm:function(){this.searchForm.orgid=this.orgid,this.searchForm.shipFromCityName="",this.searchForm.shipToCityName="",this.searchForm.carrierId="",this.searchCreatTime=this.defaultTime,this.searchCreatTime2=[]}}}},"E+6i":function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=i("dRA7"),a=i("jSBX"),o=i("VU/8")(r.a,a.a,null,null,null);t.default=o.exports},XFlZ:function(e,t,i){"use strict";var r=i("woOf"),a=i.n(r),o=(i("E4LH"),i("Vi15"),i("P5Di")),s=i("QbVN"),l=i("o9X6"),n=i("0xDb"),p=i("exln"),c=(i("t5DY"),i("pAQG")),h=i("UQm2");t.a={components:{popRight:o.a,Upload:s.a,SelectTree:l.a,querySelect:c.a},props:{popVisible:{type:Boolean,default:!1},orgid:{required:!0},isModify:{type:Boolean,default:!1},info:{type:Object,default:function(){}},issender:{type:Boolean,dafault:!1}},computed:{fixPhone:{get:function(){return this.phoneshort+"-"+this.phonelong},set:function(e){var t=e?e.split("-"):"";t?(this.phoneshort=t[1]?t[0]:"",this.phonelong=t[1]?t[1]:t[0]):(this.phoneshort="",this.phonelong="")}}},data:function(){return{visible2:!1,stepCode:"TRANSFER_LOAD-1",setupTableVisible:!1,btnsize:"mini",usersArr:[],carrierName:"",phoneshort:"",phonelong:"",form:{carrierName:"",transferTime:"",carrierMobile:"",arrivalMobile:"",remark:""},tableColumn:[{label:"序号",prop:"number",width:"100",fixed:!0,slot:function(e){return e.$index+1}},{label:"开单网点",prop:"shipFromOrgName",width:"100",fixed:!0},{label:"承运商",prop:"carrierName",width:"100"},{label:"承运商电话",prop:"carrierMobile",width:"100"},{label:"到站电话",prop:"arrivalMobile",width:"100"},{label:"运单状态",prop:"shipStatusName",width:"120"},{label:"运单号",prop:"shipSn",width:"100"},{label:"中转单号",prop:"oddNumbers",width:"100"},{label:"中转批次",prop:"transferBatchNo",width:"100"},{label:"开单时间",prop:"ydCreateTime",width:"100",slot:function(e){return""+Object(n.parseTime)(e.row.ydCreateTime,"{y}-{m}-{d}")}},{label:"中转时间",prop:"transferTime",width:"100",slot:function(e){return""+Object(n.parseTime)(e.row.transferTime,"{y}-{m}-{d}")}},{label:"中转运费",prop:"transferCharge",width:"100"},{label:"中转送货费",prop:"deliveryExpense",width:"100"},{label:"中转费其他费",prop:"transferOtherFee",width:"100"},{label:"中转费合计",prop:"totalCost",width:"100"},{label:"中转费付款方式",prop:"paymentName",width:"100"},{label:"代收货款",prop:"codService",width:"100"},{label:"发货人",prop:"shipSenderName",width:"100"},{label:"发货人电话",prop:"shipSenderMobile",width:"100"},{label:"收货人",prop:"shipReceiverName",width:"100"},{label:"收货人电话",prop:"shipReceiverMobile",width:"100"},{label:"发站",prop:"shipFromCityName",width:"100"},{label:"到站",prop:"shipToCityName",width:"100"},{label:"货品名",prop:"cargoName",width:"100"},{label:"件数",prop:"cargoAmount",width:"100"},{label:"重量",prop:"cargoWeight",width:"100"},{label:"体积",prop:"cargoVolume",width:"100"},{label:"包装",prop:"cargoPack",width:"100"},{label:"运单备注",prop:"shipRemarks",width:"100"},{label:"中转备注",prop:"remark",width:"100"},{label:"到达省",prop:"endProvince",width:"100"},{label:"到达市",prop:"endCity",width:"100"},{label:"到达县区",prop:"endArea",width:"100"},{label:"发货方",prop:"sendCustomerUnit",width:"100"},{label:"收货方",prop:"receiverCustomerUnit",width:"100"},{label:"发货人地址",prop:"sendDetailedAddress",width:"100"},{label:"收货人地址",prop:"receiverDetailedAddress",width:"100"},{label:"运费",prop:"shipFee",width:"100"},{label:"目的网点",prop:"shipToOrgName",width:"100"},{label:"交接方式",prop:"shipDeliveryMethodName",width:"100"},{label:"货号",prop:"shipGoodsSn",width:"100"},{label:"品种规格",prop:"description",width:"100"},{label:"件数单价",prop:"amountFee",width:"100"},{label:"重量单价",prop:"weightFee",width:"100"},{label:"体积单价",prop:"volumeFee",width:"100"},{label:"等通知放货",prop:"cgStatus",width:"100"},{label:"回单要求",prop:"shipReceiptRequireName",width:"100"},{label:"回单份数",prop:"shipReceiptNum",width:"100"},{label:"付款方式",prop:"shipPayWayName",width:"100"},{label:"现付",prop:"shipNowpayFee",width:"100"},{label:"到付",prop:"shipArrivepayFee",width:"100"},{label:"回单付",prop:"shipReceiptpayFee",width:"100"},{label:"月结",prop:"shipMonthpayFee",width:"100"},{label:"运费合计",prop:"shipTotalFee",width:"100"},{label:"制单人",prop:"shipUserName",width:"100"},{label:"回单号",prop:"shipReceiptNum",width:"100"},{label:"回扣",prop:"brokerageFee",width:"100"},{label:"客户单号",prop:"shipCustomerNumber",width:"100"},{label:"送货费",prop:"deliveryFee",width:"100"},{label:"代收款手续费",prop:"commissionFee",width:"100"},{label:"声明价值",prop:"productPrice",width:"100"},{label:"保险费",prop:"insuranceFee",width:"100"},{label:"装卸费",prop:"handlingFee",width:"100"},{label:"包装费",prop:"packageFee",width:"100"},{label:"提货费",prop:"pickupFee",width:"100"},{label:"上楼费",prop:"goupstairsFee",width:"100"},{label:"实际提货费",prop:"realityhandlingFee",width:"100"},{label:"报关费",prop:"customsFee",width:"100"},{label:"其他费收入",prop:"otherfeeIn",width:"100"},{label:"其他费支出",prop:"otherfeeOut",width:"100"}],formLabelWidth:"90px",tooltip:!1,popTitle:"中转批次：",orgArr:[],rolesArr:[],departmentArr:[],loading:!1,roles:[],departments:[],groups:[],inited:!1,transferBatchNo:"",selectDetailList:[]}},mounted:function(){this.form.orgid=this.orgid,this.inited||(this.inited=!0,this.initInfo())},watch:{popVisible:function(e,t){this.inited||(this.inited=!0,this.initInfo())},orgid:function(e){this.form.orgid=e},info:function(e){e.transferBatchNo&&(this.popTitle="中转批次："+e.transferBatchNo,this.transferBatchNo=e.transferBatchNo,this.getUpdateTransferDetail(e.transferBatchNo))}},methods:{doAction:function(e){var t=Object(n.objectMerge2)([],this.tableColumn);switch(e){case"cancel":this.$emit("action","cancel",[this.transferBatchNo]);break;case"print":Object(h.d)({data:this.selectDetailList.length?this.selectDetailList:this.usersArr,columns:t,name:"中转-"+Object(n.parseTime)(new Date,"{y}{m}{d}{h}{i}{s}")});break;case"export":Object(h.g)({data:this.selectDetailList.length?this.selectDetailList:this.usersArr,columns:t,name:"中转-"+Object(n.parseTime)(new Date,"{y}{m}{d}{h}{i}{s}")})}},setColumn:function(e){this.tableColumn=e,this.setupTableVisible=!1,this.tablekey=Math.random()},setTable:function(){this.setupTableVisible=!0},getUpdateTransferDetail:function(e){var r=this;return p.f({orgId:this.otherinfo.orgid,transferBatchNo:e}).then(function(e){if(e.length){var t=(r.usersArr=e)[0];for(var i in r.form)r.form[i]=t[i];r.form.transferTime=Object(n.parseTime)(new Date(r.form.transferTime))}else r.$alert("当前批次号不存在","提示",{confirmButtonText:"确定",callback:function(e){r.closeMe()}})}).catch(function(e){r.loading=!1,r._handlerCatchMsg(e)})},clickDetails:function(e){this.$refs.multipleTable.toggleRowSelection(e)},getSelection:function(e){this.selectDetailList=a()([],e)},initInfo:function(){this.loading=!1},getOrgid:function(e){this.form.orgid=e},reset:function(){this.$refs.ruleForm.resetFields()},saveToTableSetup:function(){this.visible2=!1,this.eventBus.$emit("tablesetup.change",this.thecode,this.tableColumn)},setTableWidth:function(e,t,i,r){var a=this,o=this.tableColumn.filter(function(e){return e.prop===i.property});o.length&&(o[0].width=e,this.visible2=!0,clearTimeout(this.tabletimer),this.tabletimer=setTimeout(function(){a.visible2=!1},1e4))},showSaveBox:function(){clearTimeout(this.tabletimer)},hideSaveBox:function(){var e=this;clearTimeout(this.tabletimer),this.tabletimer=setTimeout(function(){e.visible2=!1},1e4)},closeMe:function(e){this.reset(),this.$emit("update:popVisible",!1),"function"==typeof e&&e()}}}},ZkwN:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=i("XFlZ"),a=i("piRJ");var o=function(e){i("ouXS")},s=i("VU/8")(r.a,a.a,o,null,null);t.default=s.exports},dRA7:function(e,t,i){"use strict";var r=i("Dd8w"),a=i.n(r),l=i("exln"),o=i("dpuf"),s=i("ZkwN"),n=i("NYxO"),p=i("1onU"),c=i("0xDb"),h=i("UQm2");t.a={components:{SearchForm:o.default,Pager:p.a,AddOrder:s.default},computed:a()({},Object(n.mapGetters)(["otherinfo"]),{orgid:function(){return console.log(this.selectInfo.orgid,this.searchQuery.vo.orgid,this.otherinfo.orgid),this.isModify?this.selectInfo.orgid:this.searchQuery.vo.orgid||this.otherinfo.orgid}}),mounted:function(){},data:function(){var t=this;return{btnsize:"mini",usersArr:[],total:0,loading:!0,setupTableVisible:!1,AddOrderVisible:!1,isModify:!1,selectInfo:{},selected:[],searchQuery:{currentPage:1,pageSize:100,vo:{orgId:1,transferTimeStart:"",transferTimeEnd:"",ydCreateTimeStart:"",ydCreateTimeEnd:"",carrierId:"",shipFromCityName:"",shipToCityName:""}},tablekey:"",tableColumn:[{label:"序号",prop:"number",width:"70",fixed:!0,slot:function(e){return(t.searchQuery.currentPage-1)*t.searchQuery.pageSize+e.$index+1}},{label:"开单网点",prop:"shipFromOrgName",width:"150"},{label:"承运商",prop:"carrierName",width:"150"},{label:"承运商电话",prop:"carrierMobile",width:"150"},{label:"到付(元)",prop:"shipArrivepayFee",width:"90",fixed:!1},{label:"到站电话",prop:"arrivalMobile",width:"150"},{label:"运单状态",prop:"shipStatusName",width:"120",fixed:!1},{label:"运单号",prop:"shipSn",width:"130",fixed:!0},{label:"中转单号",prop:"oddNumbers",width:"150",fixed:!1},{label:"中转批次",prop:"transferBatchNo",width:"150",fixed:!1},{label:"开单时间",prop:"ydCreateTime",width:"160",slot:function(e){return""+Object(c.parseTime)(e.row.ydCreateTime)}},{label:"中转时间",prop:"transferTime",width:"160",slot:function(e){return""+Object(c.parseTime)(e.row.transferTime)}},{label:"中转运费(元)",prop:"transferCharge",width:"150"},{label:"中转送货费(元)",prop:"deliveryExpense",width:"150"},{label:"中转费其他费(元)",prop:"transferOtherFee",width:"150"},{label:"中转费合计(元)",prop:"totalCost",width:"150"},{label:"中转费付款方式",prop:"paymentName",width:"150"},{label:"代收货款(元)",prop:"codService",width:"150"},{label:"发货人",prop:"shipSenderName",width:"150"},{label:"发货人电话",prop:"shipSenderMobile",width:"150"},{label:"收货人",prop:"shipReceiverName",width:"150"},{label:"收货人电话",prop:"shipReceiverMobile",width:"150"},{label:"发站",prop:"shipFromCityName",width:"150"},{label:"到站",prop:"shipToCityName",width:"150"},{label:"货品名",prop:"cargoName",width:"150"},{label:"件数",prop:"transferAmount",width:"100"},{label:"重量(kg)",prop:"transferWeight",width:"100"},{label:"体积(m³)",prop:"transferVolume",width:"100"},{label:"包装",prop:"cargoPack",width:"100"},{label:"运单备注",prop:"shipRemarks",width:"150"},{label:"中转备注",prop:"remark",width:"150"},{label:"到达省",prop:"endProvince",width:"150"},{label:"到达市",prop:"endCity",width:"150"},{label:"到达区",prop:"endArea",width:"150"},{label:"发货方",prop:"sendCustomerUnit",width:"150"},{label:"收货方",prop:"receiverCustomerUnit",width:"150"},{label:"发货人地址",prop:"sendDetailedAddress",width:"150"},{label:"收货人地址",prop:"receiverDetailedAddress",width:"150"},{label:"运费(元)",prop:"shipFee",width:"150"},{label:"运费合计(元)",prop:"shipTotalFee",width:"150"},{label:"目的网点",prop:"shipToOrgName",width:"150"},{label:"交接方式",prop:"shipDeliveryMethodName",width:"150"},{label:"货号",prop:"shipGoodsSn",width:"150"},{label:"品种规格",prop:"description",width:"150"},{label:"件数单价(元)",prop:"amountFee",width:"150"},{label:"重量单价(元)",prop:"weightFee",width:"150"},{label:"体积单价(元)",prop:"volumeFee",width:"150"},{label:"等通知放货",prop:"cgStatus",width:"150"},{label:"回单要求",prop:"shipReceiptRequireName",width:"150"},{label:"回单份数",prop:"shipReceiptNum",width:"150"},{label:"付款方式",prop:"shipPayWayName",width:"150"},{label:"现付(元)",prop:"shipNowpayFee",width:"150"},{label:"到付(元)",prop:"shipArrivepayFee",width:"150"},{label:"回单付(元)",prop:"shipReceiptpayFee",width:"150"},{label:"月结(元)",prop:"shipMonthpayFee",width:"150"},{label:"制单人",prop:"shipUserName",width:"150"},{label:"回单号",prop:"shipReceiptNum",width:"150"},{label:"回扣",prop:"brokerageFee",width:"150"},{label:"客户单号",prop:"shipCustomerNumber",width:"150"},{label:"送货费(元)",prop:"deliveryFee",width:"150"},{label:"代收款手续费(元)",prop:"commissionFee",width:"150"},{label:"声明价值(元)",prop:"productPrice",width:"150"},{label:"保险费(元)",prop:"insuranceFee",width:"150"},{label:"装卸费(元)",prop:"handlingFee",width:"150"},{label:"包装费(元)",prop:"packageFee",width:"150"},{label:"提货费(元)",prop:"pickupFee",width:"150"},{label:"上楼费(元)",prop:"goupstairsFee",width:"150"},{label:"实际提货费(元)",prop:"realityhandlingFee",width:"150"},{label:"报关费(元)",prop:"customsFee",width:"150"},{label:"其他费收入(元)",prop:"otherfeeIn",width:"150"},{label:"其他费支出(元)",prop:"otherfeeOut",width:"150"}]}},methods:{showDetail:function(e){this.eventBus.$emit("showOrderDetail",e.shipId,e.shipSn,!0)},changeKey:function(e){this.total=0,this.searchQuery=e,this.loading||this.fetchAllTransfer()},getSumLeft:function(e,t){return Object(c.getSummaries)(e,c.operationPropertyCalc)},fetchAllTransfer:function(){var t=this;return this.loading=!0,l.c(this.searchQuery).then(function(e){t.usersArr=e.list,t.total=e.total,t.loading=!1}).catch(function(e){t.loading=!1,t._handlerCatchMsg(e)})},fetchData:function(){this.fetchAllTransfer()},handlePageChange:function(e){this.searchQuery.currentPage=e.pageNum,this.searchQuery.pageSize=e.pageSize,this.fetchData()},getSearchParam:function(e){this.searchQuery.currentPage=this.$options.data().searchQuery.currentPage,this.searchQuery.pageSize=this.$options.data().searchQuery.pageSize,this.searchQuery.vo=e,this.loading=!1,this.fetchData()},doAction:function(e){var t=this;if(!this.selected.length&&"waifa"!==e&&"export"!==e&&"print"!==e)return this.closeAddOrder(),this.$message({message:"请选择要操作的项~",type:"warning"}),!1;switch(console.log("this.selected:",this.selected),e){case"waifa":this.isModify=!1,this.selectInfo={},this.$router.push("/operation/order/transferLoad");break;case"modify":this.isModify=!0,1<this.selected.length&&this.$message({message:"每次只能修改单条数据~",type:"warning"}),this.selectInfo=this.selected[0],this.$router.push({path:"/operation/order/transferLoad/modify",query:{transferId:this.selectInfo.transferBatchNo}});break;case"track":1<this.selected.length&&this.$message({message:"每次只能操作单条数据~",type:"warning"});var i=this.selected[0].id,r=this.selected[0].shipId;this.$router.push({path:"/operation/order/track/transfer",query:{transfer:i,shipId:r}});break;case"cancel":var a=this.selected.filter(function(e){return 67!==e.ship_status});if(a.length){var o=a.map(function(e){return e.transferBatchNo}),s=a.map(function(e){return e.shipId});this.$confirm("确定要取消 "+a.length+" 条运单吗？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){l.a(t.otherinfo.orgid,o.join(","),s.join(",")).then(function(e){t.$message({type:"success",message:"取消成功!"}),t.fetchData()}).catch(function(e){t.$message({type:"info",message:"取消失败，原因："+(e.errorInfo?e.errorInfo:e.text)})})}).catch(function(e){t.$message({type:"info",message:"已取消"})})}else this.$message.warning("已签收运单不能被取消~");break;case"export":Object(h.g)({data:this.selected.length?this.selected:this.usersArr,columns:this.tableColumn,name:"已中转列表-"+Object(c.parseTime)(new Date,"{y}{m}{d}{h}{i}{s}")});break;case"print":Object(h.d)({data:this.selected.length?this.selected:this.usersArr,columns:this.tableColumn,name:"已中转列表"})}this.$refs.multipleTable.clearSelection()},setTable:function(){this.setupTableVisible=!0},closeSetupTable:function(){this.setupTableVisible=!1},setColumn:function(e){this.tableColumn=e,this.tablekey=Math.random()},openAddOrder:function(){this.AddOrderVisible=!0},closeAddOrder:function(){this.AddOrderVisible=!1},clickDetails:function(e,t,i){this.$refs.multipleTable.toggleRowSelection(e)},getSelection:function(e){this.selected=e}}}},dpuf:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=i("1EIs"),a=i("qfp3"),o=i("VU/8")(r.a,a.a,null,null,null);t.default=o.exports},exln:function(e,t,i){"use strict";t.e=function(e){return a.b.get("/api-order/order/load/v1/selectAddLoadRepertoryList/",{params:{orgId:e}}).then(a.a)},t.i=function(e){return a.b.post("/api-order/order/transfer/v1/insertTransfer",e).then(a.a)},t.j=function(e){return a.b.put("/api-order/order/transfer/v1/updateTransfer",e).then(a.a)},t.g=function(e,t){return a.b.get("/api-order/order/transfer/v1/selectUpdateLoadRepertoryList",{params:{batchNo:t,orgId:e}}).then(a.a)},t.h=function(e,t){return a.b.get("/api-order/order/transfer/v1/selectUpdateTransferDetailList",{params:{batchNo:t,orgId:e}}).then(a.a)},t.c=function(e){return a.b.post("/api-order/order/transfer/v1/selectAlreadyTransferList",e).then(a.a).then(function(e){return e.data||{list:[],total:0}})},t.b=function(e){return a.b.post("/api-order/order/transfer/v1/selectTransferBatchList",e).then(a.a).then(function(e){return e.data||{list:[],total:0}})},t.f=function(e){return a.b.post("/api-order/order/transfer/v1/selectTransferBatchDetailsList",e).then(a.a).then(function(e){return e.data||[]})},t.a=function(e,t,i){return a.b.delete("/api-order/order/transfer/v1/cancelTransfer?orgId="+e+"&batchNos="+t+"&shipIds="+i).then(a.a)},t.d=function(e){return a.b.get("/api-order/order/transfer/v1/getBatchNo",{params:{orgId:e}}).then(a.a)};var r=i("//Fk"),a=(i.n(r),i("Vo7i"))},jSBX:function(e,t,i){"use strict";var r={render:function(){var i=this,e=i.$createElement,r=i._self._c||e;return r("div",{directives:[{name:"loading",rawName:"v-loading",value:i.loading,expression:"loading"}],staticClass:"tab-content miniHeaderSearch"},[r("SearchForm",{attrs:{orgid:i.otherinfo.orgid,btnsize:i.btnsize},on:{change:i.getSearchParam}}),i._v(" "),r("div",{staticClass:"tab_info"},[r("div",{staticClass:"btns_box"},[r("el-button",{directives:[{name:"has",rawName:"v-has:TRANSFER_INSERT",arg:"TRANSFER_INSERT"}],attrs:{type:"primary",size:i.btnsize,icon:"el-icon-circle-plus",plain:""},on:{click:function(e){i.doAction("waifa")}}},[i._v("中转外发")]),i._v(" "),r("el-button",{directives:[{name:"has",rawName:"v-has:TRANSFER_DELETE",arg:"TRANSFER_DELETE"}],attrs:{type:"info",size:i.btnsize,icon:"el-icon-delete",plain:""},on:{click:function(e){i.doAction("cancel")}}},[i._v("取消中转")]),i._v(" "),r("el-button",{directives:[{name:"has",rawName:"v-has:TRANSFER_UPDATE",arg:"TRANSFER_UPDATE"}],attrs:{type:"primary",size:i.btnsize,icon:"el-icon-edit",plain:""},on:{click:function(e){i.doAction("modify")}}},[i._v("修改")]),i._v(" "),r("el-button",{directives:[{name:"has",rawName:"v-has:TRANSFER_FOLLOW",arg:"TRANSFER_FOLLOW"}],attrs:{type:"primary",size:i.btnsize,icon:"el-icon-edit-outline",plain:""},on:{click:function(e){i.doAction("track")}}},[i._v("中转跟踪")]),i._v(" "),r("el-button",{directives:[{name:"has",rawName:"v-has:TRANSFER_EXPORT",arg:"TRANSFER_EXPORT"}],attrs:{type:"primary",size:i.btnsize,icon:"el-icon-edit-outline",plain:""},on:{click:function(e){i.doAction("export")}}},[i._v("导出")]),i._v(" "),r("el-button",{directives:[{name:"has",rawName:"v-has:TRANSFER_PRINT",arg:"TRANSFER_PRINT"}],attrs:{type:"primary",size:i.btnsize,icon:"el-icon-edit-outline",plain:""},on:{click:function(e){i.doAction("print")}}},[i._v("打印")]),i._v(" "),r("el-button",{staticClass:"table_setup",attrs:{type:"primary",size:i.btnsize,icon:"el-icon-setting",plain:""},on:{click:i.setTable}},[i._v("表格设置")])],1),i._v(" "),r("div",{staticClass:"info_tab"},[r("el-table",{key:i.tablekey,ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:i.usersArr,stripe:"",border:"",height:"100%","tooltip-effect":"dark","summary-method":i.getSumLeft,"show-summary":"","default-sort":{prop:"id",order:"ascending"}},on:{"row-dblclick":i.showDetail,"row-click":i.clickDetails,"selection-change":i.getSelection}},[r("el-table-column",{attrs:{fixed:"",sortable:"",type:"selection",width:"70"}}),i._v(" "),i._l(i.tableColumn,function(t){return[t.slot?r("el-table-column",{key:t.id,attrs:{fixed:t.fixed,sortable:"",prop:t.prop,label:t.label,"show-overflow-tooltip":"",width:t.width},scopedSlots:i._u([{key:"header",fn:function(e){return[r("tableHeaderSearch",{attrs:{scope:e,query:i.searchQuery},on:{change:i.changeKey}})]}},{key:"default",fn:function(e){return[i._v("\n                "+i._s(t.slot(e))+"\n            ")]}}])}):r("el-table-column",{key:t.id,attrs:{fixed:t.fixed,sortable:"","show-overflow-tooltip":"",label:t.label,prop:t.prop,width:t.width},scopedSlots:i._u([{key:"header",fn:function(e){return[r("tableHeaderSearch",{attrs:{scope:e,query:i.searchQuery},on:{change:i.changeKey}})]}},{key:"default",fn:function(e){return[i._v(i._s(e.row[t.prop]))]}}])})]})],2)],1),i._v(" "),r("div",{staticClass:"info_tab_footer"},[i._v("共计:"+i._s(i.total)+" "),r("div",{staticClass:"show_pager"},[r("Pager",{attrs:{total:i.total},on:{change:i.handlePageChange}})],1)])]),i._v(" "),r("AddOrder",{attrs:{isModify:i.isModify,info:i.selectInfo,orgid:i.orgid,popVisible:i.AddOrderVisible},on:{"update:popVisible":function(e){i.AddOrderVisible=e},close:i.closeAddOrder,success:i.fetchData}}),i._v(" "),r("TableSetup",{attrs:{popVisible:i.setupTableVisible,columns:i.tableColumn,code:"TRANSFER_ALREADY"},on:{close:i.closeSetupTable,success:i.setColumn}})],1)},staticRenderFns:[]};t.a=r},ouXS:function(e,t){},piRJ:function(e,t,i){"use strict";var r={render:function(){var r=this,e=r.$createElement,a=r._self._c||e;return a("pop-right",{directives:[{name:"loading",rawName:"v-loading",value:r.loading,expression:"loading"}],staticClass:"addTransferPop",attrs:{title:r.popTitle,isShow:r.popVisible},on:{close:r.closeMe}},[a("template",{staticClass:"addTransferPop-content",slot:"content"},[a("el-form",{ref:"ruleForm",attrs:{model:r.form,inline:!0,"label-position":"right",size:"mini"}},[a("el-form-item",{staticClass:"addCarrierInput",attrs:{label:"承运商",prop:"carrierId"}},[a("el-input",{attrs:{disabled:"",value:r.form.carrierName}})],1),r._v(" "),a("el-form-item",{attrs:{prop:"transferTime",label:"中转日期"}},[a("el-input",{attrs:{disabled:"",value:r.form.transferTime}})],1),r._v(" "),a("el-form-item",{attrs:{label:"承运商电话",prop:"carrierMobile"}},[a("el-input",{attrs:{size:"mini",disabled:"",value:r.form.carrierMobile,placeholder:"承运商电话"}})],1),r._v(" "),a("el-form-item",{attrs:{label:"到站电话",prop:"arrivalMobile"}},[a("el-input",{attrs:{size:"mini",disabled:"",value:r.form.arrivalMobile,placeholder:"到站电话"}})],1),r._v(" "),a("el-form-item",{staticClass:"remark",attrs:{label:"备注"}},[a("el-input",{attrs:{size:"mini",maxlength:300,disabled:"",value:r.form.remark,placeholder:"备注"}})],1)],1),r._v(" "),a("div",{staticClass:"btns_box clearfix"},[a("el-button",{staticClass:"cancelBtn",attrs:{type:"info",size:r.btnsize,icon:"el-icon-delete",plain:""},on:{click:function(e){r.doAction("cancel")}}},[r._v("取消中转")]),r._v(" "),a("el-button",{attrs:{type:"primary",size:r.btnsize,icon:"el-icon-edit-outline",plain:""},on:{click:function(e){r.doAction("print")}}},[r._v("打印清单")]),r._v(" "),a("el-button",{attrs:{type:"primary",size:r.btnsize,icon:"el-icon-edit-outline",plain:""},on:{click:function(e){r.doAction("export")}}},[r._v("导出清单")]),r._v(" "),a("el-popover",{attrs:{placement:"top",trigger:"manual",width:"160",value:r.visible2},nativeOn:{mouseenter:function(e){return r.showSaveBox(e)},mouseout:function(e){return r.hideSaveBox(e)}}},[a("p",[r._v("表格宽度修改了，是否要保存？")]),r._v(" "),a("div",{staticStyle:{"text-align":"right",margin:"0"}},[a("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(e){r.visible2=!1}}},[r._v("取消")]),r._v(" "),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:r.saveToTableSetup}},[r._v("确定")])],1),r._v(" "),a("el-button",{staticClass:"table_setup",attrs:{slot:"reference",type:"primary",size:r.btnsize,icon:"el-icon-setting",plain:""},on:{click:r.setTable},slot:"reference"},[r._v("表格设置")])],1)],1),r._v(" "),a("div",{staticClass:"table_wrapper"},[a("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:r.usersArr,stripe:"",border:"",height:"100%","tooltip-effect":"dark","default-sort":{prop:"id",order:"ascending"}},on:{"header-dragend":r.setTableWidth,"row-click":r.clickDetails,"selection-change":r.getSelection}},[a("el-table-column",{attrs:{fixed:"",sortable:"",type:"selection",width:"50"}}),r._v(" "),r._l(r.tableColumn,function(i){return[i.slot?a("el-table-column",{key:i.id,attrs:{fixed:i.fixed,sortable:"","show-overflow-tooltip":"",label:i.label,width:i.width},scopedSlots:r._u([{key:"default",fn:function(t){return[i.click?a("span",{staticClass:"clickitem",domProps:{innerHTML:r._s(i.slot(t))},on:{click:function(e){e.stopPropagation(),i.click(t)}}}):a("span",{domProps:{innerHTML:r._s(i.slot(t))}})]}}])}):a("el-table-column",{key:i.id,attrs:{fixed:i.fixed,sortable:"",label:i.label,"show-overflow-tooltip":"",prop:i.prop,width:i.width}})]})],2)],1),r._v(" "),a("TableSetup",{attrs:{popVisible:r.setupTableVisible,columns:r.tableColumn,code:r.stepCode},on:{close:function(e){r.setupTableVisible=!1},success:r.setColumn}})],1),r._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:r.closeMe}},[r._v("关闭")])],1)],2)},staticRenderFns:[]};t.a=r},qfp3:function(e,t,i){"use strict";var r={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-form",{staticClass:"staff_searchinfo clearfix",attrs:{inline:!0,size:t.btnsize,"label-position":"right",rules:t.rules,"label-width":"70px",model:t.searchForm}},[i("div",{staticClass:"staff_searchinfo--input"},[i("el-form-item",{attrs:{label:"中转时间:"}},[i("div",{staticClass:"block"},[i("el-date-picker",{attrs:{type:"daterange","unlink-panels":"",align:"right",size:t.btnsize,"value-format":"yyyy-MM-dd","start-placeholder":"开始日期","picker-options":t.pickerOptions2,"end-placeholder":"结束日期"},model:{value:t.searchCreatTime,callback:function(e){t.searchCreatTime=e},expression:"searchCreatTime"}})],1)]),t._v(" "),i("el-form-item",{attrs:{label:"承运商:"}},[i("querySelect",{attrs:{search:"carrierName",type:"carrier",valuekey:"carrierId",show:"select",filterable:!1,placeholder:"请选择"},model:{value:t.searchForm.carrierId,callback:function(e){t.$set(t.searchForm,"carrierId",e)},expression:"searchForm.carrierId"}})],1),t._v(" "),t.isbatch?t._e():i("el-form-item",{staticClass:"searchinfo--order",attrs:{label:"发站:"}},[i("el-input",{attrs:{maxlength:"15",clearable:""},on:{change:t.onSubmit},model:{value:t.searchForm.shipFromCityName,callback:function(e){t.$set(t.searchForm,"shipFromCityName",e)},expression:"searchForm.shipFromCityName"}})],1),t._v(" "),t.isbatch?t._e():i("el-form-item",{staticClass:"searchinfo--order",attrs:{label:"到站:"}},[i("el-input",{attrs:{maxlength:"15",clearable:""},on:{change:t.onSubmit},model:{value:t.searchForm.shipToCityName,callback:function(e){t.$set(t.searchForm,"shipToCityName",e)},expression:"searchForm.shipToCityName"}})],1),t._v(" "),t.isbatch?t._e():i("el-form-item",{attrs:{label:"开单时间:"}},[i("div",{staticClass:"block"},[i("el-date-picker",{attrs:{type:"daterange","unlink-panels":"",align:"right",size:t.btnsize,"value-format":"yyyy-MM-dd","start-placeholder":"开始日期","picker-options":t.pickerOptions2,"end-placeholder":"结束日期"},model:{value:t.searchCreatTime2,callback:function(e){t.searchCreatTime2=e},expression:"searchCreatTime2"}})],1)])],1),t._v(" "),i("el-form-item",{staticClass:"staff_searchinfo--btn"},[i("el-button",{attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v("查询")]),t._v(" "),i("el-button",{attrs:{type:"info",plain:""},on:{click:t.clearForm}},[t._v("清空")])],1)],1)},staticRenderFns:[]};t.a=r}});