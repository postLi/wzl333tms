webpackJsonp([96,147],{"8UOW":function(e,t,i){"use strict";var s=i("us2a"),a=i("fyBF");var r=function(e){i("Qhr/")},o=i("VU/8")(s.a,a.a,r,null,null);t.a=o.exports},ESJ2:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=i("fdTd"),a=i("ypnH"),r=i("VU/8")(s.a,a.a,null,null,null);t.default=r.exports},"Qhr/":function(e,t){},SjYS:function(e,t,i){"use strict";var s=i("seR9"),a=i("msh6");var r=function(e){i("nl9Y")},o=i("VU/8")(s.a,a.a,r,null,null);t.a=o.exports},fdTd:function(e,t,i){"use strict";var s=i("woOf"),u=i.n(s),a=i("Dd8w"),r=i.n(a),p=i("OHys"),o=i("ukuO"),l=i("NYxO"),n=i("1onU"),m=i("0xDb"),c=i("Mqi+"),f=i("UQm2");t.a={name:"orderManage",components:{SearchForm:o.default,Pager:n.a},computed:r()({},Object(l.mapGetters)(["otherinfo"]),{orgid:function(){return this.isModify?this.selectInfo.orgid:this.searchQuery.vo.orgid||this.otherinfo.orgid}}),mounted:function(){this.thecode=this.$route.meta.code},data:function(){var t=this;return{countSum:{shipNowpayFeeAll:0,shipArrivepayFeeAll:0,shipReceiptpayFeeAll:0,shipMonthpayFeeAll:0,shipTotalFeeAll:0,brokerageFeeAll:0,cargoAmountAll:0,cargoWeightAll:0,cargoVolumeAll:0},btnsize:"mini",usersArr:[],total:0,loading:!0,setupTableVisible:!1,isModify:!1,selectInfo:{},selected:[],searchQuery:{currentPage:1,pageSize:100,vo:{shipFromOrgid:1,shipStatus:2,startTime:"",endTime:""}},tablekey:"",thecode:"",columnWidthData:{},tableColumn:[{label:"序号",prop:"number",width:"70",fixed:!0,slot:function(e){return(t.searchQuery.currentPage-1)*t.searchQuery.pageSize+e.$index+1}},{label:"运单号",prop:"shipSn",width:"150",fixed:!0},{label:"运单状态",prop:"shipStatusName",width:"120",fixed:!1},{label:"运单标识",prop:"shipIdentifying",width:"150",slot:function(e){return Object(c.b)(e.row.shipIdentifying)}},{label:"开单网点",prop:"fromOrgName",width:"150"},{label:"目的网点",prop:"toOrgName",width:"150"},{label:"开单时间",prop:"createTime",width:"180",slot:function(e){return""+Object(m.parseTime)(e.row.createTime)}},{prop:"shipEffectiveName",label:"时效",slot:function(e){return"加急"===e.row.shipEffectiveName?'<span class="red">加急</span>':e.row.shipEffectiveName}},{label:"发货人",prop:"shipSenderName",width:"150"},{label:"发货人电话",prop:"shipSenderMobile",width:"150"},{label:"收货人",prop:"shipReceiverName",width:"150"},{label:"收货人电话",prop:"shipReceiverMobile",width:"150"},{label:"交接方式",prop:"shipDeliveryMethodName",width:"150"},{label:"货号",prop:"shipGoodsSn",width:"150"},{label:"货品名",prop:"cargoName",width:"150"},{label:"品种规格",prop:"description",width:"150"},{label:"件数",prop:"cargoAmount",width:"150"},{label:"重量",prop:"cargoWeight",width:"150"},{label:"体积",prop:"cargoVolume",width:"150"},{label:"件数单价",prop:"amountFee",width:"150"},{label:"重量单价",prop:"weightFee",width:"150"},{label:"体积单价",prop:"volumeFee",width:"150"},{label:"发站",prop:"shipFromCityName",width:"150"},{label:"到站",prop:"shipToCityName",width:"150"},{label:"等通知放货",prop:"status",width:"150",slot:function(e){return 1===e.row.status?"未放货":2===e.row.status?"已放货":"未控货"}},{label:"回单要求",prop:"shipReceiptRequireName",width:"150"},{label:"回单份数",prop:"shipReceiptNum",width:"150"},{label:"代收款",prop:"agencyFund",width:"150"},{label:"付款方式",prop:"shipPayWayName",width:"150"},{label:"现付",prop:"shipNowpayFee",width:"150"},{label:"到付",prop:"shipArrivepayFee",width:"150"},{label:"回单付",prop:"shipReceiptpayFee",width:"150"},{label:"月结",prop:"shipMonthpayFee",width:"150"},{label:"运费合计",prop:"shipTotalFee",width:"150"},{label:"备注",prop:"shipRemarks",width:"150"},{label:"到达省",prop:"endProvince",width:"150",hidden:!0},{label:"到达市",prop:"endCity",width:"150",hidden:!0},{label:"到达县区",prop:"endArea",width:"150",hidden:!0},{label:"业务员",prop:"userName",hidden:!0,width:"150"},{label:"发货方",prop:"shipSenderUnit",hidden:!0,width:"150"},{label:"收货方",prop:"shipReceiverUnit",hidden:!0,width:"150"},{label:"发货人地址",prop:"shipSenderAddress",hidden:!0,width:"150"},{label:"收货人地址",prop:"shipReceiverAddress",hidden:!0,width:"150"},{label:"回单号",prop:"shipReceiptSn",hidden:!0,width:"150"},{label:"回扣",prop:"brokerageFee",hidden:!0,width:"150"},{label:"客户单号",prop:"shipCustomerNumber",hidden:!0,width:"150"},{label:"运输方式",prop:"shipShippingTypeName",hidden:!0,width:"150"},{label:"业务类型",prop:"shipBusinessTypeName",hidden:!0,width:"150"},{label:"标准时效",prop:"shipEffectiveName",hidden:!0,width:"150"},{label:"线路时效",prop:"transportAging",hidden:!1,width:"150"},{label:"运单实际用时",prop:"actualTime",hidden:!1,width:"150"},{label:"提货批次",prop:"pickupBatchNumber",hidden:!0,width:"150"},{label:"提货司机名",prop:"driverName",hidden:!0,width:"150"},{label:"提货车牌",prop:"truckIdNumber",hidden:!0,width:"150"},{label:"送货费",prop:"deliveryFee",hidden:!0,width:"150"},{label:"代收款手续费",prop:"commissionFee",hidden:!0,width:"150"},{label:"声明价值",prop:"productPrice",hidden:!0,width:"150"},{label:"保险费",prop:"insuranceFee",hidden:!0,width:"150"},{label:"装卸费",prop:"handlingFee",hidden:!0,width:"150"},{label:"包装费",prop:"packageFee",hidden:!0,width:"150"},{label:"提货费",prop:"pickupFee",hidden:!0,width:"150"},{label:"上楼费",prop:"goupstairsFee",hidden:!0,width:"150"},{label:"实际提货费",prop:"realityhandlingFee",hidden:!0,width:"150"},{label:"叉车费",prop:"forkliftFee",hidden:!0,width:"150"},{label:"报关费",prop:"customsFee",hidden:!0,width:"150"},{label:"其他费收入",prop:"otherfeeIn",hidden:!0,width:"150"},{label:"其他费支出",prop:"otherfeeOut",hidden:!0,width:"150"},{label:"税率",prop:"taxRate",hidden:!0,width:"150"},{label:"税金",prop:"taxes",hidden:!0,width:"150"},{label:"入仓费",prop:"housingFee",hidden:!0,width:"150"},{label:"印花税",prop:"stampTax",hidden:!0,width:"150"}],showtip:!1,visible2:!1,countAll:{}}},methods:{changeKey:function(e){this.total=0,this.searchQuery=e,this.loading||this.fetchAllOrder()},findAllShipCount:function(){var t=this;return p.a.findAllShipCount(this.searchQuery).then(function(e){e&&(t.countSum=e)}).catch(function(e){t._handlerCatchMsg(e)})},getSumLeft:function(e,t){return Object(m.getSummaries)(e,m.operationPropertyCalc)},viewDetails:function(e){this.$router.push({path:"/operation/order/createOrder",query:{orderid:e.id,type:"view",tab:"查看"+e.shipSn}})},showDetail:function(e){this.eventBus.$emit("showOrderDetail",e.id,e.shipSn,!0)},fetchAllOrder:function(){var i=this;return this.loading=!0,p.a.getAllShip(this.searchQuery).then(function(e){if(i.usersArr=e.list,i.total=e.total,i.loading=!1,1===i.total&&i.searchQuery.vo.shipSn&&i.searchQuery.vo.shipSn===i.usersArr[0].shipSn){var t=i.usersArr[0];i.eventBus.$emit("showOrderDetail",t.id,t.shipSn,!0)}}).catch(function(e){i.loading=!1,i._handlerCatchMsg(e)})},fetchData:function(){this.findAllShipCount(),this.fetchAllOrder()},handlePageChange:function(e){this.searchQuery.currentPage=e.pageNum,this.searchQuery.pageSize=e.pageSize,this.fetchData()},getSearchParam:function(e){this.searchQuery.currentPage=this.$options.data().searchQuery.currentPage,this.searchQuery.pageSize=this.$options.data().searchQuery.pageSize,this.searchQuery.vo=e,this.loading=!1,this.fetchData()},doAction:function(e){var t=this;if(!this.selected.length&&"add"!==e&&"export"!==e&&"print"!==e)return this.$message({message:"请选择要操作的项~",type:"warning"}),!1;switch(console.log("this.selected:",this.selected),e){case"add":this.isModify=!1,this.selectInfo={},this.$router.push({path:"/operation/order/createOrder"});break;case"modify":this.isModify=!0;var i=this.selected.filter(function(e){return 67!==e.shipStatus});if(1<i.length)this.$message({message:"每次只能修改单条数据~",type:"warning"});else if(i.length<1)this.$message({message:"已签收项不能被修改~",type:"warning"});else{this.selectInfo=i[0];var s=!0;"1"===this.otherinfo.systemSetup.shipPermission.onlyUpdateOwnShip&&(s=i[0].userid===this.otherinfo.id),s?this.$router.push({path:"/operation/order/modifyOrder",query:{orderid:this.selectInfo.id,type:"modify"}}):this.$message.warning("只能修改自己的运单~")}break;case"delete":if(1<this.selected.length)return this.$message({message:"每次只能操作单条数据~",type:"warning"}),this.$refs.multipleTable.clearSelection(),!1;var a=this.selected.filter(function(e){return 59===e.shipStatus});if(console.log("delete:",a),0===a.length)this.$message({message:"只有已入库状态才能删除~",type:"info"});else{var r=!0;if("1"===this.otherinfo.systemSetup.shipPermission.onlyDeleteOwnShip&&(r=a[0].userid===this.otherinfo.id),r){var o=a[0].id;this.$confirm("确定要删除 "+a[0].shipSn+" 运单吗？","提示",{confirmButtonText:"删除",cancelButtonText:"取消",type:"warning"}).then(function(){p.a.deleteOrderInfoById(o).then(function(e){t.$message({type:"success",message:"删除成功!"}),t.fetchData()}).catch(function(e){t.$message({type:"info",message:"删除失败，原因："+(e.text?e.text:e)})})}).catch(function(){t.$message({type:"info",message:"已取消删除"})})}else this.$message.warning("只能删除自己的运单~")}break;case"cancel":if(1<this.selected.length)return this.$message({message:"每次只能操作单条数据~",type:"warning"}),this.$refs.multipleTable.clearSelection(),!1;var l=this.selected.filter(function(e){return 59===e.shipStatus});if(0===l.length)this.$message({message:"只有已入库状态才能作废~",type:"info"});else{var n=!0;if("1"===this.otherinfo.systemSetup.shipPermission.onlyInvalidOwnShip&&(n=l[0].userid===this.otherinfo.id),n){var c=l[0].id;this.$confirm("确定要作废 "+l[0].shipSn+" 运单吗？","提示",{confirmButtonText:"作废",cancelButtonText:"取消",type:"warning"}).then(function(){p.a.deleteCancleOrderById(c).then(function(e){t.$message({type:"success",message:"作废成功!"}),t.fetchData()}).catch(function(e){t.$message({type:"info",message:e.text})})}).catch(function(){t.$message({type:"info",message:"已取消作废"})})}else this.$message.warning("只能作废自己的运单~")}break;case"export":Object(f.g)({data:this.selected.length?this.selected:this.usersArr,columns:this.tableColumn,name:"全部运单-"+Object(m.parseTime)(new Date,"{y}{m}{d}{h}{i}{s}")});break;case"print":var h=u()({},this.searchQuery),d="<style>body{width: 100%;}</style>";d+='<body width="100%"><table width="100%"><tr style="text-align:center;"><td style="font-size: 16px;">'+(h.vo.startTime||" ")+" ~ "+(h.vo.endTime||" ")+" 的全部运单列表</td></tr></table></body>",Object(f.d)({data:this.selected.length?this.selected:this.usersArr,columns:this.tableColumn,name:"全部运单",appendTopTitle:d})}this.$refs.multipleTable.clearSelection()},setTable:function(){this.setupTableVisible=!0},closeSetupTable:function(){this.setupTableVisible=!1},setColumn:function(e){var t=this;this.tableColumn=e,setTimeout(function(){t.tablekey=Math.random(),t.$refs.multipleTable.doLayout()},0)},clickDetails:function(e,t,i){this.$refs.multipleTable.toggleRowSelection(e)},getSelection:function(e){this.selected=e},setTableWidth:function(e,t,i,s){var a=this;console.log("set table:",e,t,i,this.tableColumn);var r=this.tableColumn.filter(function(e){return e.prop===i.property});r.length&&(r[0].width=e,this.visible2=!0,clearTimeout(this.tabletimer),this.tabletimer=setTimeout(function(){a.visible2=!1},1e4))},saveToTableSetup:function(){this.visible2=!1,this.eventBus.$emit("tablesetup.change",this.thecode,this.tableColumn)},showSaveBox:function(){clearTimeout(this.tabletimer)},hideSaveBox:function(){var e=this;clearTimeout(this.tabletimer),this.tabletimer=setTimeout(function(){e.visible2=!1},1e4)}}}},fyBF:function(e,t,i){"use strict";var s={render:function(){var i=this,e=i.$createElement,s=i._self._c||e;return i.hasCode?s("div",{staticClass:"searchAll_lyy"},[s("el-form-item",{staticClass:"zdycx",attrs:{label:"自定义查询"}},[s("el-select",{attrs:{filterable:"",placeholder:"请选择","filter-method":i.querySearchAsync,"popper-class":"zdycx-pop",loading:i.loading},on:{change:i.handleSelect,focus:i.initdata},model:{value:i.datalist,callback:function(e){i.datalist=e},expression:"datalist"}},i._l(i.options4,function(t,e){return s("el-option",{key:e,attrs:{label:t.queryKey,value:t.id}},[i._v("\r\n        "+i._s(t.queryKey)+" "),s("i",{staticClass:"el-icon-circle-close-outline",on:{click:function(e){e.stopPropagation(),e.preventDefault(),i.deleteItem(t)}}})])})),i._v(" "),s("el-button",{attrs:{plain:""},on:{click:i.Custom}},[i._v("保存自定义")])],1),i._v(" "),s("addSave",{attrs:{code:i.hasCode,searchObj:i.searchObj,popVisible:i.popVisible},on:{close:i.closeAddDot,success:i.fetchAllloadAll}})],1):i._e()},staticRenderFns:[]};t.a=s},"h+Si":function(e,t){},msh6:function(e,t,i){"use strict";var s={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-dialog",{staticClass:"wzl_settleLogSave",attrs:{title:t.popTitle,visible:t.isShow,"close-on-click-modal":!1,"before-close":t.closeMe},on:{close:t.closeMe,"update:visible":function(e){t.isShow=e}}},[i("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:t.form,rules:t.rules,"label-width":t.formLabelWidth,inline:!0,"label-position":"right",size:"mini"}},[i("el-form-item",{attrs:{label:"名称：",prop:"queryKey"}},[i("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.form.queryKey,expression:"form.queryKey",modifiers:{trim:!0}}],attrs:{maxlength:20,placeholder:"请定义名称"},domProps:{value:t.form.queryKey},on:{input:function(e){e.target.composing||t.$set(t.form,"queryKey",e.target.value.trim())},blur:function(e){t.$forceUpdate()}}})])],1),t._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{type:"primary",disabled:0===t.form.queryKey.length},on:{click:function(e){t.submitForm("ruleForm")}}},[t._v("确 定")]),t._v(" "),i("el-button",{on:{click:t.closeMe}},[t._v("取 消")])],1)],1)},staticRenderFns:[]};t.a=s},nl9Y:function(e,t){},q8kg:function(e,t,i){"use strict";var s={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-form",{staticClass:"staff_searchinfo clearfix",attrs:{inline:!0,size:t.btnsize,"label-position":"right","label-width":"70px",rules:t.rules,model:t.searchForm}},[i("div",{staticClass:"staff_searchinfo--input"},[i("el-form-item",{attrs:{label:"开单时间"}},[i("div",{staticClass:"block"},[i("el-date-picker",{attrs:{"default-value":t.defaultTime,"default-time":["00:00:00","23:59:59"],"unlink-panels":"",type:"datetimerange",align:"right","value-format":"yyyy-MM-dd HH:mm:ss","start-placeholder":"开始日期","picker-options":t.pickerOptions2,"end-placeholder":"结束日期"},model:{value:t.searchCreatTime,callback:function(e){t.searchCreatTime=e},expression:"searchCreatTime"}})],1)]),t._v(" "),i("el-form-item",{attrs:{label:"开单网点"}},[i("select-tree",{attrs:{orgid:t.otherinfo.orgid},model:{value:t.searchForm.orgid,callback:function(e){t.$set(t.searchForm,"orgid",e)},expression:"searchForm.orgid"}})],1),t._v(" "),i("el-form-item",{staticClass:"searchinfo--order"},[i("el-select",{model:{value:t.searchForm.type,callback:function(e){t.$set(t.searchForm,"type",e)},expression:"searchForm.type"}},[i("el-option",{attrs:{label:"运单号",value:"shipSn"}}),t._v(" "),i("el-option",{attrs:{label:"发货人",value:"shipSenderName"}}),t._v(" "),i("el-option",{attrs:{label:"发货人手机",value:"shipSenderMobile"}}),t._v(" "),i("el-option",{attrs:{label:"收货人",value:"shipReceiverName"}}),t._v(" "),i("el-option",{attrs:{label:"收货人手机",value:"shipReceiverMobile"}}),t._v(" "),i("el-option",{attrs:{label:"货物名称",value:"cargoName"}}),t._v(" "),i("el-option",{attrs:{label:"货号",value:"shipGoodsSn"}})],1),t._v(" "),i("el-input",{attrs:{maxlength:"15",clearable:""},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.onSubmit(e):null}},model:{value:t.searchForm.value,callback:function(e){t.$set(t.searchForm,"value",e)},expression:"searchForm.value"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"运单状态"}},[i("select-type",{attrs:{type:"ship_status"},model:{value:t.searchForm.shipStatus,callback:function(e){t.$set(t.searchForm,"shipStatus",e)},expression:"searchForm.shipStatus"}},[i("el-option",{attrs:{slot:"head",label:"全部",value:""},slot:"head"})],1)],1),t._v(" "),i("el-form-item",{attrs:{label:"开单员",prop:"userid"}},[i("querySelect",{attrs:{clearable:"",orgid:t.otherinfo.orgid,search:"name",show:"select",valuekey:"id",maxlength:15},model:{value:t.searchForm.userid,callback:function(e){t.$set(t.searchForm,"userid",e)},expression:"searchForm.userid"}})],1),t._v(" "),i("searchAll",{attrs:{searchObj:t.searchObjs},on:{dataObj:t.getDataObj},model:{value:t.searchAll,callback:function(e){t.searchAll=e},expression:"searchAll"}})],1),t._v(" "),i("el-form-item",{staticClass:"staff_searchinfo--btn"},[i("el-button",{attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v("查询")]),t._v(" "),i("el-button",{attrs:{type:"info",plain:""},on:{click:t.clearForm}},[t._v("清空")])],1)],1)},staticRenderFns:[]};t.a=s},rRHk:function(e,t,i){"use strict";var s=i("woOf"),a=i.n(s),r=i("0xDb"),o=i("o9X6"),l=i("9UCZ"),n=i("8UOW"),c=i("pAQG");t.a={name:"order-manage-search",components:{SelectTree:o.a,SelectType:l.a,searchAll:n.a,querySelect:c.a},props:{btnsize:{type:String,default:"mini"},orgid:{type:Number},issender:{type:Boolean,dafault:!1}},data:function(){return{searchCreatTime:[],defaultTime:[Object(r.parseTime)(+new Date-5184e6,"{y}-{m}-{d}")+" 00:00:00",Object(r.parseTime)(new Date,"{y}-{m}-{d}")+" 23:59:59"],searchForm:{orgid:"",value:"",type:"shipSn",shipStatus:"",userid:""},searchObjs:{},rules:{mobile:[{}]},pickerOptions2:{shortcuts:r.pickerOptions2},searchAll:"1"}},watch:{orgid:function(e){this.searchForm.orgid=e},searchForm:{handler:function(e,t){console.log("searchForm:",this.searchObjs,e,t),this.searchObjs=a()({},e),this.searchObjs.shipFromOrgid=this.searchForm.orgid,this.searchObjs.shipStatus=this.searchForm.shipStatus,this.searchObjs.startTime=this.searchCreatTime?this.searchCreatTime[0]:"",this.searchObjs.endTime=this.searchCreatTime?this.searchCreatTime[1]:"",this.searchObjs[this.searchForm.type]=this.searchForm.value},deep:!0}},mounted:function(){this.searchForm.orgid=this.orgid,this.setSearch(),this.searchCreatTime=this.defaultTime,this.onSubmit(),console.log("searchForm:",this.searchObjs)},methods:{setSearch:function(){var e=this.$route.query.key,t=this.$route.query.value;e&&t&&(this.searchForm.type=e,this.searchForm.value=t,this.searchForm.orgid="")},getDataObj:function(e){this.searchForm=a()({},e),this.$emit("change",e)},onSubmit:function(){var e={};e.shipFromOrgid=this.searchForm.orgid,e.shipStatus=this.searchForm.shipStatus,e.startTime=this.searchCreatTime?this.searchCreatTime[0]:"",e.endTime=this.searchCreatTime?this.searchCreatTime[1]:"",e[this.searchForm.type]=this.searchForm.value,e.userid=this.searchForm.userid,this.$emit("change",e)},clearForm:function(){var e=this;this.searchCreatTime=this.defaultTime,this.searchForm.shipStatus="",this.searchForm.shipFromOrgid=this.orgid,this.searchForm.value="",this.searchForm.type="shipSn",this.searchAll="1",this.searchForm.userid="",setTimeout(function(){e.searchAll=""},66)}}}},seR9:function(e,t,i){"use strict";var s=i("mvHQ"),a=i.n(s),r=i("t5DY"),o=i("0xDb");t.a={computed:{isShow:{get:function(){return this.popVisible},set:function(){}}},components:{},props:{popVisible:{type:Boolean,default:!1},dotInfo:[Object,Array],searchQuery:[Object,Array],isDepMain:{type:Boolean,default:!1},createrId:[Number,String],isModify:{type:Boolean,default:!1},isAccept:{type:Boolean,default:!1},proptitle:String,searchObj:{type:[Array,Object],default:function(){}},code:{type:String,default:""}},data:function(){return{form:{userId:"",orgId:"",menuCode:"",queryKey:"",queryContent:""},searchCreatTime:+new Date,pickOption2:"",formLabelWidth:"75px",tooltip:!1,rules:{},queryKey:"",checked1:!0,popTitle:"自定义标签",loading:!1,type:""}},mounted:function(){},watch:{orgid:function(e){this.form.orgid=e},popVisible:function(e){e&&(this.form.userId=this.otherinfo.userId,this.form.orgId=this.otherinfo.orgid,this.form.menuCode=this.code||this.$route.meta.code)}},methods:{reset:function(){this.$refs.ruleForm.resetFields()},closeMe:function(e){this.$emit("close"),this.reset(),"function"==typeof e&&e()},submitForm:function(e){var i=this;this.loading||this.$refs[e].validate(function(e){if(!e)return!1;i.loading=!0,i.form.queryContent=a()(i.searchObj);var t=Object(o.objectMerge2)({},i.form);console.log("addSave_data",t),Object(r.s)(t).then(function(e){i.loading=!1,i.$message({message:"保存成功~",type:"success"}),i.closeMe(),i.$emit("success")}).catch(function(e){i.loading=!1,i.$message.warning(e.text)})})}}}},ukuO:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=i("rRHk"),a=i("q8kg");var r=function(e){i("h+Si")},o=i("VU/8")(s.a,a.a,r,null,null);t.default=o.exports},us2a:function(e,t,i){"use strict";var s=i("t5DY"),a=i("SjYS");t.a={components:{addSave:a.a},props:{searchObj:{type:[Object,Array]},value:[String,Number],code:{type:String,default:""}},data:function(){return{isModify:!1,popVisible:!1,setupTableVisible:!1,dataset:[],datalist:"",timeout:null,loading:!1,options4:[],querySearch:{currentPage:1,pageSize:10,vo:{orgId:"",userId:"",menuCode:""}}}},computed:{hasCode:function(){return this.code||this.$route.meta.code||""}},watch:{value:function(e){""===e&&(this.datalist="")},searchObj:{handler:function(e,t){},deep:!0}},mounted:function(){},methods:{initdata:function(){var t=this;this.inited||(this.inited=!0,this.loading=!0,this.fetchAllloadAll().then(function(e){t.loading=!1}))},deleteItem:function(e){var t=this;Object(s.b)(e.id).then(function(e){t.fetchAllloadAll(),t.datalist&&(t.datalist="")}).catch(function(e){t._handlerCatchMsg(e)})},Custom:function(){this.isModify=!0,this.popVisible=!0},closeAddDot:function(){this.popVisible=!1},fetchAllloadAll:function(){var t=this;return this.querySearch.vo.orgId=this.otherinfo.orgid,this.querySearch.vo.userId=this.otherinfo.userId,this.querySearch.vo.menuCode=this.code||this.$route.meta.code,Object(s.r)(this.querySearch).then(function(e){t.dataset=e.list||[],t.options4=e.list||[]})},querySearchAsync:function(e,t){var i=this.dataset,s=e?i.filter(this.createStateFilter(e)):i;t(this.options4=s)},createStateFilter:function(t){return function(e){return 0===e.queryKey.toLowerCase().indexOf(t.toLowerCase())}},handleSelect:function(t){var e=this.options4.filter(function(e){return e.id===t});if(e.length){var i=e[0].queryContent,s=JSON.parse(i);this.$emit("change",JSON.parse(i.replace(/'/g,'"'))),this.$emit("dataObj",s)}}}}},ypnH:function(e,t,i){"use strict";var s={render:function(){var i=this,e=i.$createElement,s=i._self._c||e;return s("div",{directives:[{name:"loading",rawName:"v-loading",value:i.loading,expression:"loading"}],staticClass:"tab-content miniHeaderSearch"},[s("SearchForm",{attrs:{orgid:i.otherinfo.orgid,btnsize:i.btnsize},on:{change:i.getSearchParam}}),i._v(" "),s("div",{staticClass:"tab_info"},[s("div",{staticClass:"btns_box"},[s("el-button",{directives:[{name:"has",rawName:"v-has:ORDER_MADD",arg:"ORDER_MADD"}],attrs:{type:"primary",size:i.btnsize,icon:"el-icon-circle-plus",plain:""},on:{click:function(e){i.doAction("add")}}},[i._v("创建运单")]),i._v(" "),s("el-button",{directives:[{name:"has",rawName:"v-has:ORDER_MEDIT5",arg:"ORDER_MEDIT5"}],attrs:{type:"primary",size:i.btnsize,icon:"el-icon-edit",plain:""},on:{click:function(e){i.doAction("modify")}}},[i._v("运单修改")]),i._v(" "),s("el-button",{directives:[{name:"has",rawName:"v-has:ORDER_MDEL2",arg:"ORDER_MDEL2"}],attrs:{type:"info",size:i.btnsize,icon:"el-icon-delete",plain:""},on:{click:function(e){i.doAction("cancel")}}},[i._v("运单作废")]),i._v(" "),s("el-button",{directives:[{name:"has",rawName:"v-has:ORDER_MDEL",arg:"ORDER_MDEL"}],attrs:{type:"danger",size:i.btnsize,icon:"el-icon-edit-outline",plain:""},on:{click:function(e){i.doAction("delete")}}},[i._v("运单删除")]),i._v(" "),s("el-button",{directives:[{name:"has",rawName:"v-has:ORDER_MEXP",arg:"ORDER_MEXP"}],attrs:{type:"primary",size:i.btnsize,icon:"el-icon-edit-outline",plain:""},on:{click:function(e){i.doAction("export")}}},[i._v("导出")]),i._v(" "),s("el-button",{directives:[{name:"has",rawName:"v-has:ORDER_MPRI",arg:"ORDER_MPRI"}],attrs:{type:"primary",size:i.btnsize,icon:"el-icon-edit-outline",plain:""},on:{click:function(e){i.doAction("print")}}},[i._v("打印")]),i._v(" "),s("span",{staticClass:"viewtip"},[i._v("双击查看详情")]),i._v(" "),s("el-popover",{attrs:{placement:"top",width:"160",trigger:"manual"},nativeOn:{mouseenter:function(e){return i.showSaveBox(e)},mouseout:function(e){return i.hideSaveBox(e)}},model:{value:i.visible2,callback:function(e){i.visible2=e},expression:"visible2"}},[s("p",[i._v("表格宽度修改了，是否要保存？")]),i._v(" "),s("div",{staticStyle:{"text-align":"right",margin:"0"}},[s("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(e){i.visible2=!1}}},[i._v("取消")]),i._v(" "),s("el-button",{attrs:{type:"primary",size:"mini"},on:{click:i.saveToTableSetup}},[i._v("确定")])],1),i._v(" "),s("el-button",{staticClass:"table_setup",attrs:{slot:"reference",type:"primary",size:i.btnsize,icon:"el-icon-setting",plain:""},on:{click:i.setTable},slot:"reference"},[i._v("表格设置")])],1)],1),i._v(" "),s("div",{staticClass:"info_tab",on:{mouseover:function(e){i.showtip=!0},mouseout:function(e){i.showtip=!1}}},[s("el-table",{key:i.tablekey,ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:i.usersArr,stripe:"",border:"",height:"100%","summary-method":i.getSumLeft,"show-summary":"","tooltip-effect":"dark","default-sort":{prop:"id",order:"ascending"}},on:{"row-click":i.clickDetails,"row-dblclick":i.showDetail,"selection-change":i.getSelection,"header-dragend":i.setTableWidth}},[s("el-table-column",{attrs:{fixed:"",sortable:"",type:"selection",width:"60"}}),i._v(" "),i._l(i.tableColumn,function(t){return[t.slot?s("el-table-column",{key:t.id,attrs:{fixed:t.fixed,prop:t.prop,sortable:"",label:t.label,width:t.width},scopedSlots:i._u([{key:"header",fn:function(e){return[s("tableHeaderSearch",{attrs:{scope:e,query:i.searchQuery},on:{change:i.changeKey}})]}},{key:"default",fn:function(e){return[s("div",{staticClass:"td-slot",domProps:{innerHTML:i._s(t.slot(e))}})]}}])}):s("el-table-column",{key:t.id,attrs:{fixed:t.fixed,sortable:"",label:t.label,prop:t.prop,width:t.width},scopedSlots:i._u([{key:"header",fn:function(e){return[s("tableHeaderSearch",{attrs:{scope:e,query:i.searchQuery},on:{change:i.changeKey}})]}},{key:"default",fn:function(e){return[i._v(i._s(e.row[t.prop]))]}}])})]})],2)],1),i._v(" "),s("div",{staticClass:"info_tab_footer"},[s("div",{staticClass:"tab_footer_content"},[s("div",{staticClass:"footer_item"},[i._v("共计:\n          "),s("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:i.total+" 条",placement:"top"}},[s("i",[i._v(i._s(i.total)+"条")])])],1),i._v(" "),s("div",{staticClass:"footer_item"},[s("el-tag",{attrs:{size:"mini"}},[i._v("现付:")]),i._v(" "),s("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"(全部总计)："+i.countSum.shipNowpayFeeAll+" 元",placement:"top"}},[s("i",[i._v(i._s(i.countSum.shipNowpayFeeAll)+"元")])])],1),i._v(" "),s("div",{staticClass:"footer_item"},[s("el-tag",{attrs:{size:"mini"}},[i._v("到付:")]),i._v(" "),s("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"(全部总计)："+i.countSum.shipArrivepayFeeAll+" 元",placement:"top"}},[s("i",[i._v(i._s(i.countSum.shipArrivepayFeeAll)+"元")])])],1),i._v(" "),s("div",{staticClass:"footer_item"},[s("el-tag",{attrs:{size:"mini"}},[i._v("回单付:")]),i._v(" "),s("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"(全部总计)："+i.countSum.shipReceiptpayFeeAll+" 元",placement:"top"}},[s("i",[i._v(i._s(i.countSum.shipReceiptpayFeeAll)+"元")])])],1),i._v(" "),s("div",{staticClass:"footer_item"},[s("el-tag",{attrs:{size:"mini"}},[i._v("月结:")]),i._v(" "),s("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"(全部总计)："+i.countSum.shipMonthpayFeeAll+" 元",placement:"top"}},[s("i",[i._v(i._s(i.countSum.shipMonthpayFeeAll)+"元")])])],1),i._v(" "),s("div",{staticClass:"footer_item"},[s("el-tag",{attrs:{size:"mini"}},[i._v("运费合计:")]),i._v(" "),s("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"(全部总计)："+i.countSum.shipTotalFeeAll+" 元",placement:"top"}},[s("i",[i._v(i._s(i.countSum.shipTotalFeeAll)+"元")])])],1),i._v(" "),s("div",{staticClass:"footer_item"},[s("el-tag",{attrs:{size:"mini"}},[i._v("回扣:")]),i._v(" "),s("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"(全部总计)："+i.countSum.brokerageFeeAll+" 元",placement:"top"}},[s("i",[i._v(i._s(i.countSum.brokerageFeeAll)+"元")])])],1),i._v(" "),s("div",{staticClass:"footer_item"},[s("el-tag",{attrs:{size:"mini"}},[i._v("件数:")]),i._v(" "),s("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"(全部总计)："+i.countSum.cargoAmountAll+" 件",placement:"top"}},[s("i",[i._v(i._s(i.countSum.cargoAmountAll)+"件")])])],1),i._v(" "),s("div",{staticClass:"footer_item"},[s("el-tag",{attrs:{size:"mini"}},[i._v("重量:")]),i._v(" "),s("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"(全部总计)："+i.countSum.cargoWeightAll+" kg",placement:"top"}},[s("i",[i._v(i._s(i.countSum.cargoWeightAll)+"kg")])])],1),i._v(" "),s("div",{staticClass:"footer_item"},[s("el-tag",{attrs:{size:"mini"}},[i._v("体积:")]),i._v(" "),s("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"(全部总计)："+i.countSum.cargoVolumeAll+" 方",placement:"top"}},[s("i",[i._v(i._s(i.countSum.cargoVolumeAll)+"方")])])],1)]),i._v(" "),s("div",{staticClass:"show_pager"},[s("Pager",{attrs:{total:i.total},on:{change:i.handlePageChange}})],1)])]),i._v(" "),s("TableSetup",{attrs:{popVisible:i.setupTableVisible,columns:i.tableColumn,code:"ORDER_ALL"},on:{close:i.closeSetupTable,success:i.setColumn}})],1)},staticRenderFns:[]};t.a=s}});