webpackJsonp([149,269,345],{"+eE9":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=r("WdPR"),o=r("Xkk4"),a=r("VU/8")(i.a,o.a,null,null,null);t.default=a.exports},"55Wa":function(e,t){},"58x0":function(e,t,r){"use strict";var i=r("woOf"),o=r.n(i),a=(r("E4LH"),r("o9X6")),n=r("pAQG"),s=r("0xDb");t.a={components:{SelectTree:a.a,querySelect:n.a},props:{btnsize:{type:String,default:"mini"},orgid:{type:Number}},data:function(){return{searchForm:{shipSn:"",shipFromCityName:"",shipToCityName:"",senderCustomerName:""},rules:{},searchTime:[Object(s.parseTime)(new Date-5184e6),Object(s.parseTime)(new Date)],defaultTime:[Object(s.parseTime)(new Date-5184e6),Object(s.parseTime)(new Date)],pickerOptions2:{shortcuts:s.pickerOptions2}}},mounted:function(){},methods:{onSubmit:function(){var e=o()({},this.searchForm);this.searchTime&&(this.$set(e,"startTime",Object(s.parseTime)(this.searchTime[0],"{y}-{m}-{d} ")+"00:00:00"),this.$set(e,"endTime",Object(s.parseTime)(this.searchTime[1],"{y}-{m}-{d} ")+"23:59:59")),this.$emit("change",e)},clearForm:function(e){var t=this;this.$nextTick(function(){o()(t.$data,t.$options.data()),t.$refs[e].resetFields(),t.searchTime=t.$options.data().searchTime})}}}},"5swg":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=r("58x0"),o=r("8AeK"),a=r("VU/8")(i.a,o.a,null,null,null);t.default=a.exports},"7BEH":function(e,t){},"8AeK":function(e,t,r){"use strict";var i={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("el-form",{ref:"searchForm",staticClass:"staff_searchinfo clearfix",attrs:{inline:!0,size:t.btnsize,"label-position":"right",rules:t.rules,model:t.searchForm,"label-width":"70px"}},[r("div",{staticClass:"staff_searchinfo--input"},[r("el-form-item",{attrs:{label:"开单时间"}},[r("el-date-picker",{attrs:{"default-value":t.defaultTime,type:"daterange","unlink-panels":"",align:"right","value-format":"yyyy-MM-dd HH:mm:ss","start-placeholder":"开始日期","picker-options":t.pickerOptions2,clearable:!1,"end-placeholder":"结束日期"},model:{value:t.searchTime,callback:function(e){t.searchTime=e},expression:"searchTime"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"运单号",prop:"shipSn"}},[r("querySelect",{attrs:{clearable:"",search:"shipSn",type:"order",valuekey:"shipSn",maxlength:15},model:{value:t.searchForm.shipSn,callback:function(e){t.$set(t.searchForm,"shipSn",e)},expression:"searchForm.shipSn"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"发站"}},[r("el-input",{attrs:{maxlength:15,clearable:""},model:{value:t.searchForm.shipFromCityName,callback:function(e){t.$set(t.searchForm,"shipFromCityName",e)},expression:"searchForm.shipFromCityName"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"到站"}},[r("el-input",{attrs:{maxlength:15,clearable:""},model:{value:t.searchForm.shipToCityName,callback:function(e){t.$set(t.searchForm,"shipToCityName",e)},expression:"searchForm.shipToCityName"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"发货人",prop:"senderCustomerName"}},[r("el-input",{attrs:{maxlength:15,clearable:""},model:{value:t.searchForm.senderCustomerName,callback:function(e){t.$set(t.searchForm,"senderCustomerName",e)},expression:"searchForm.senderCustomerName"}})],1)],1),t._v(" "),r("el-form-item",{staticClass:"staff_searchinfo--btn"},[r("el-button",{attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v("查询")]),t._v(" "),r("el-button",{attrs:{type:"info",plain:""},on:{click:function(e){t.clearForm("searchForm")}}},[t._v("清空")])],1)],1)},staticRenderFns:[]};t.a=i},Lghf:function(e,t,r){"use strict";var i={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("el-dialog",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"tms_dialog",attrs:{title:t.popTitle,visible:t.isShow,"close-on-click-modal":!1,"before-close":t.closeMe},on:{"update:visible":function(e){t.isShow=e}}},[r("el-form",{ref:"ruleForm",staticClass:"colorpickerForm",attrs:{model:t.repertorySetting,rules:t.rules}},[r("el-form-item",{staticClass:"colorpickerItem",attrs:{prop:"sectionOne"}},[r("b",[t._v("超过：")]),t._v(" "),r("el-input",{model:{value:t.repertorySetting.sectionOne,callback:function(e){t.$set(t.repertorySetting,"sectionOne",e)},expression:"repertorySetting.sectionOne"}}),r("b",[t._v("小时的库存颜色")]),t._v(" "),r("el-color-picker",{attrs:{predefine:t.predefineColors},model:{value:t.repertorySetting.sectionOneColour,callback:function(e){t.$set(t.repertorySetting,"sectionOneColour",t._n(e))},expression:"repertorySetting.sectionOneColour"}})],1),t._v(" "),r("el-form-item",{staticClass:"colorpickerItem",attrs:{prop:"sectionTwo"}},[r("b",[t._v("超过：")]),t._v(" "),r("el-input",{model:{value:t.repertorySetting.sectionTwo,callback:function(e){t.$set(t.repertorySetting,"sectionTwo",e)},expression:"repertorySetting.sectionTwo"}}),r("b",[t._v("小时的库存颜色")]),t._v(" "),r("el-color-picker",{attrs:{predefine:t.predefineColors},model:{value:t.repertorySetting.sectionTwoColour,callback:function(e){t.$set(t.repertorySetting,"sectionTwoColour",t._n(e))},expression:"repertorySetting.sectionTwoColour"}})],1),t._v(" "),r("el-form-item",{staticClass:"colorpickerItem",attrs:{prop:"sectionThree"}},[r("b",[t._v("超过：")]),t._v(" "),r("el-input",{model:{value:t.repertorySetting.sectionThree,callback:function(e){t.$set(t.repertorySetting,"sectionThree",e)},expression:"repertorySetting.sectionThree"}}),r("b",[t._v("小时的库存颜色")]),t._v(" "),r("el-color-picker",{attrs:{predefine:t.predefineColors},model:{value:t.repertorySetting.sectionThreeColour,callback:function(e){t.$set(t.repertorySetting,"sectionThreeColour",t._n(e))},expression:"repertorySetting.sectionThreeColour"}})],1)],1),t._v(" "),r("div",{attrs:{slot:"footer"},slot:"footer"},[r("el-button",{attrs:{type:"primary"},on:{click:function(e){t.submitForm("ruleForm")}}},[t._v("确 定")]),t._v(" "),r("el-button",{on:{click:t.closeMe}},[t._v("取 消")])],1)],1)},staticRenderFns:[]};t.a=i},WdPR:function(e,t,r){"use strict";var i=r("woOf"),o=r.n(i),a=r("Dd8w"),n=r.n(a),s=r("sPV7"),l=r("NYxO"),p=r("5swg"),c=r("p6zF"),u=r("1onU"),d=r("puNT"),h=r("0xDb"),y=r("Mqi+"),f=r("UQm2"),m=r("vmn5");t.a={components:{Pager:u.a,SearchForm:p.default,Colorpicker:c.default,TableSetup:d.a,tableHeaderSearch:m.a},data:function(){var t=this;return{thecode:"ORDER_REPER_ALL",visible2:!1,isFix:!1,total:0,tablekey:"",btnsize:"mini",setupTableVisible:!1,repertoryArr:[],selected:[],loading:!0,colorpickerVisible:!1,isModify:!1,selectInfo:[],selectionColorSetting:{},reportorSelect:{},searchQuery:{currentPage:1,pageSize:100,vo:{orgId:1}},tableColumn:[{label:"序号",prop:"number",width:"70",fixed:!0,slot:function(e){return(t.searchQuery.currentPage-1)*t.searchQuery.pageSize+e.$index+1}},{label:"运单号",prop:"shipSn",width:"120",fixed:!0},{label:"运单状态",prop:"shipStatusName",width:"80",fixed:!1},{label:"运单标识",prop:"shipIdentifying",width:"150",fixed:!1,slot:function(e){return Object(y.b)(e.row.shipIdentifying)}},{label:"入库时间",prop:"repertoryCreateTime",width:"160",fixed:!1},{label:"库存时长",prop:"hashour",width:"110",fixed:!1},{label:"开单网点",prop:"fromOrgName",width:"110",fixed:!1},{label:"开单时间",prop:"createTime",width:"160",fixed:!1},{label:"货品名",prop:"cargoName",width:"150",fixed:!1},{label:"库存件数",prop:"repertoryAmount",width:"90",fixed:!1},{label:"库存重量",prop:"repertoryWeight",width:"90",fixed:!1},{label:"库存体积",prop:"repertoryVolume",width:"90",fixed:!1},{label:"运单件数",prop:"cargoAmount",width:"90",fixed:!1},{label:"运单重量",prop:"cargoWeight",width:"90",fixed:!1},{label:"运单体积",prop:"cargoVolume",width:"90",fixed:!1},{label:"发站",prop:"shipFromCityName",width:"150",fixed:!1},{label:"到站",prop:"shipToCityName",width:"150",fixed:!1},{label:"发货人",prop:"senderCustomerName",width:"100",fixed:!1},{label:"发货人电话",prop:"senderCustomerMobile",width:"110",fixed:!1},{label:"收货人",prop:"receiverCustomerName",width:"100",fixed:!1},{label:"收货人电话",prop:"receiverCustomerMobile",width:"110",fixed:!1},{label:"交接方式",prop:"shipDeliveryMethodName",width:"90",fixed:!1},{label:"运费",prop:"shipFee",width:"90",fixed:!1},{label:"提货费",prop:"pickupFee",width:"90",fixed:!1},{label:"回扣",prop:"brokerageFee",width:"90",fixed:!1},{label:"保险费",prop:"insuranceFee",width:"90",fixed:!1},{label:"声明价值",prop:"productPrice",width:"90",fixed:!1},{label:"包装费",prop:"packageFee",width:"90",fixed:!1},{label:"送货费",prop:"deliveryFee",width:"90",fixed:!1},{label:"运费合计",prop:"shipTotalFee",width:"90",fixed:!1},{label:"付款方式",prop:"shipPayWayName",width:"90",fixed:!1},{label:"现付",prop:"shipNowpayFee",width:"90",fixed:!1},{label:"到付",prop:"shipArrivepayFee",width:"90",fixed:!1},{label:"回单付",prop:"shipReceiptpayFee",width:"90",fixed:!1},{label:"月结",prop:"shipMonthpayFee",width:"90",fixed:!1},{label:"备注",prop:"shipRemarks",width:"150",fixed:!1},{label:"发货方",prop:"senderCustomerUnit",width:"120",fixed:!1},{label:"发货地址",prop:"senderDetailedAddress",width:"120",fixed:!1},{label:"收货方",prop:"receiverCustomerUnit",width:"120",fixed:!1},{label:"收货地址",prop:"receiverDetailedAddress",width:"120",fixed:!1},{label:"货号",prop:"shipGoodsSn",width:"150",fixed:!1},{label:"品种规格",prop:"description",width:"100",fixed:!1},{label:"件数单价",prop:"amountFee",width:"90",fixed:!1},{label:"重量单价",prop:"weightFee",width:"90",fixed:!1},{label:"体积单价",prop:"volumeFee",width:"90",fixed:!1},{label:"回单号",prop:"shipReceiptSn",width:"150",fixed:!1},{label:"回单要求",prop:"shipReceiptRequireName",width:"150",fixed:!1},{label:"回单份数",prop:"shipReceiptNum",width:"90",fixed:!1},{label:"代收货款",prop:"agencyFund",width:"90",fixed:!1},{label:"代收款手续费",prop:"commissionFee",width:"120",fixed:!1},{label:"制单人",prop:"userName",width:"90"},{label:"毛利",prop:"grossProfit",width:"90"},{label:"客户单号",prop:"shipCustomerNumber",width:"150",fixed:!1},{label:"运输方式",prop:"shipShippingTypeName",width:"100",fixed:!1},{label:"业务类型",prop:"shipBusinessTypeName",width:"100",fixed:!1},{label:"时效",prop:"shipEffectiveName",width:"100",fixed:!1},{label:"上楼费",prop:"goupstairsFee",width:"90",fixed:!1},{label:"叉车费",prop:"forkliftFee",width:"90",fixed:!1},{label:"装卸费",prop:"handlingFee",width:"90",fixed:!1},{label:"入仓费",prop:"housingFee",width:"90",fixed:!1}]}},computed:n()({},Object(l.mapGetters)(["otherinfo"]),{orgid:function(){return this.isModify?this.selectInfo.orgid:this.searchQuery.vo.orgId||this.otherinfo.orgid}}),mounted:function(){this.initTable(),this.searchQuery.vo.orgId=this.otherinfo.orgid},methods:{changeKey:function(e){this.total=0,this.searchQuery=e,this.loading||this.fetchAllOrderRepertory()},getSumLeft:function(e,t){return Object(h.getSummaries)(e,h.operationPropertyCalc)},showDetail:function(e){this.eventBus.$emit("showOrderDetail",e.shipId,e.shipSn,!0)},initTable:function(){this.$refs.multipleTable.columns;this.$refs.multipleTable.columns.forEach(function(e,t){0<t&&"运单状态"===e.label&&(e.fixed=!0)})},tableRowColor:function(e){var t=e.row;e.rowIndex;return Number(this.selectionColorSetting.sectionOne)<Number(t.hashours)&&Number(t.hashours)<Number(this.selectionColorSetting.sectionTwo)+1?{color:this.selectionColorSetting.sectionOneColour}:Number(this.selectionColorSetting.sectionTwo)<Number(t.hashours)&&Number(t.hashours)<Number(this.selectionColorSetting.sectionThree)+1?{color:this.selectionColorSetting.sectionTwoColour}:Number(this.selectionColorSetting.sectionThree)<Number(t.hashours)?{color:this.selectionColorSetting.sectionThreeColour}:{color:"#222"}},getSearchParam:function(e){this.searchQuery.currentPage=this.$options.data().searchQuery.currentPage,this.searchQuery.pageSize=this.$options.data().searchQuery.pageSize,this.searchQuery.vo=o()(this.searchQuery.vo,e),this.fetchAllOrderRepertory()},doAction:function(e){switch(e){case"colorpicker":this.reportorSelect=this.selected,this.openColor();break;case"export":this.closeColorpicker(),Object(f.g)({data:this.selected.length?this.selected:this.repertoryArr,columns:this.tableColumn,name:"全部库存"});break;case"print":this.closeColorpicker(),Object(f.d)({data:this.selected.length?this.selected:this.repertoryArr,columns:this.tableColumn,name:"全部库存"})}},setTable:function(){this.setupTableVisible=!0},closeSetupTable:function(){this.setupTableVisible=!1},clickDetails:function(e){this.$refs.multipleTable.toggleRowSelection(e)},getSelection:function(e){this.selected=e},handlePageChange:function(e){this.searchQuery.currentPage=e.pageNum,this.searchQuery.pageSize=e.pageSize,this.fetchAllOrderRepertory()},fetchAllOrderRepertory:function(){this.getAllOrderRepertory()},openColor:function(){this.colorpickerVisible=!0},closeColorpicker:function(){this.colorpickerVisible=!1},getAllOrderRepertory:function(){var t=this;this.loading=!0,Object(s.b)(this.searchQuery).then(function(e){e.list.forEach(function(e){e.grossProfit=e.shipTotalFee-e.brokerageFee}),t.repertoryArr=e.list,t.total=e.total,t.loading=!1}).catch(function(e){t._handlerCatchMsg(e),t.loading=!1})},setColumColor:function(e){this.selectionColorSetting=e,this.closeColorpicker(),this.fetchAllOrderRepertory(),this.tablekey=Math.random()},setColumn:function(e){this.tableColumn=e,this.tablekey=Math.random()},setTableWidth:function(e,t,r,i){var o=this,a=this.tableColumn.filter(function(e){return e.prop===r.property});a.length&&(a[0].width=e,this.visible2=!0,clearTimeout(this.tabletimer),this.tabletimer=setTimeout(function(){o.visible2=!1},1e4))},saveToTableSetup:function(){this.visible2=!1,this.eventBus.$emit("tablesetup.change",this.thecode,this.tableColumn)},showSaveBox:function(){clearTimeout(this.tabletimer)},hideSaveBox:function(){var e=this;clearTimeout(this.tabletimer),this.tabletimer=setTimeout(function(){e.visible2=!1},1e4)}}}},Xkk4:function(e,t,r){"use strict";var i={render:function(){var i=this,e=i.$createElement,o=i._self._c||e;return o("div",{directives:[{name:"loading",rawName:"v-loading",value:i.loading,expression:"loading"}],staticClass:"tab-content miniHeaderSearch"},[o("SearchForm",{attrs:{orgid:i.otherinfo.orgid,btnsize:i.btnsize},on:{change:i.getSearchParam}}),i._v(" "),o("div",{staticClass:"tab_info"},[o("div",{staticClass:"btns_box"},[o("el-button",{directives:[{name:"has",rawName:"v-has:ORDER_COLOUR1",arg:"ORDER_COLOUR1"}],attrs:{type:"primary",size:i.btnsize,icon:"el-icon-menu",plain:""},on:{click:function(e){i.doAction("colorpicker")}}},[i._v("提醒颜色设置")]),i._v(" "),o("el-button",{directives:[{name:"has",rawName:"v-has:ORDER_COLOURP1",arg:"ORDER_COLOURP1"}],attrs:{type:"success",size:i.btnsize,icon:"el-icon-printer",plain:""},on:{click:function(e){i.doAction("print")}}},[i._v("打印")]),i._v(" "),o("el-button",{directives:[{name:"has",rawName:"v-has:ORDER_COLOUREXP1",arg:"ORDER_COLOUREXP1"}],attrs:{type:"success",size:i.btnsize,icon:"el-icon-download",plain:""},on:{click:function(e){i.doAction("export")}}},[i._v("导出")]),i._v(" "),o("el-popover",{attrs:{placement:"top",width:"160",trigger:"manual"},nativeOn:{mouseenter:function(e){return i.showSaveBox(e)},mouseout:function(e){return i.hideSaveBox(e)}},model:{value:i.visible2,callback:function(e){i.visible2=e},expression:"visible2"}},[o("p",[i._v("表格宽度修改了，是否要保存？")]),i._v(" "),o("div",{staticStyle:{"text-align":"right",margin:"0"}},[o("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(e){i.visible2=!1}}},[i._v("取消")]),i._v(" "),o("el-button",{attrs:{type:"primary",size:"mini"},on:{click:i.saveToTableSetup}},[i._v("确定")])],1),i._v(" "),o("el-button",{staticClass:"table_setup",attrs:{slot:"reference",type:"primary",size:i.btnsize,icon:"el-icon-setting",plain:""},on:{click:i.setTable},slot:"reference"},[i._v("表格设置")])],1)],1),i._v(" "),o("div",{staticClass:"info_tab"},[o("el-table",{key:i.tablekey,ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:i.repertoryArr,border:"",height:"100%","tooltip-effect":"dark","row-style":i.tableRowColor,"summary-method":i.getSumLeft,"show-summary":"","default-sort":{prop:"id",order:"ascending"},stripe:""},on:{"row-dblclick":i.showDetail,"row-click":i.clickDetails,"selection-change":i.getSelection,"header-dragend":i.setTableWidth}},[o("el-table-column",{attrs:{fixed:"",sortable:"",type:"selection",width:"60"}}),i._v(" "),i._l(i.tableColumn,function(r){return[r.slot?o("el-table-column",{key:r.id,attrs:{fixed:r.fixed,prop:r.prop,sortable:"",label:r.label,width:r.width},scopedSlots:i._u([{key:"header",fn:function(e){return[o("tableHeaderSearch",{attrs:{scope:e,query:i.searchQuery},on:{change:i.changeKey}})]}},{key:"default",fn:function(t){return[r.click?o("span",{staticClass:"clickitem",domProps:{innerHTML:i._s(r.slot(t))},on:{click:function(e){e.stopPropagation(),r.click(t)}}}):o("span",{domProps:{innerHTML:i._s(r.slot(t))}})]}}])}):o("el-table-column",{key:r.id,attrs:{fixed:r.fixed,sortable:"",label:r.label,prop:r.prop,width:r.width},scopedSlots:i._u([{key:"header",fn:function(e){return[o("tableHeaderSearch",{attrs:{scope:e,query:i.searchQuery},on:{change:i.changeKey}})]}},{key:"default",fn:function(e){return[i._v(i._s(e.row[r.prop]))]}}])})]})],2)],1),i._v(" "),o("div",{staticClass:"info_tab_footer"},[i._v("\n      共计:"+i._s(i.total)+"\n      "),o("div",{staticClass:"show_pager"},[o("Pager",{attrs:{total:i.total},on:{change:i.handlePageChange}})],1)]),i._v(" "),o("Colorpicker",{attrs:{popVisible:i.colorpickerVisible,reportors:i.reportorSelect},on:{close:i.closeColorpicker,success:i.setColumColor}}),i._v(" "),o("TableSetup",{attrs:{code:i.thecode,popVisible:i.setupTableVisible,columns:i.tableColumn},on:{close:i.closeSetupTable,success:i.setColumn}})],1)],1)},staticRenderFns:[]};t.a=i},i2Q8:function(e,t,r){"use strict";var i=r("woOf"),o=r.n(i),a=r("0xDb"),n=r("9UCZ");t.a={components:{SelectType:n.a},props:{scope:{type:Object,default:function(){}},query:{type:Object,default:function(){}}},data:function(){return{btnsize:"mini",queryString:"",curSelect:{property:"shipShippingTypeName",label:"运输方式",type:"ship_shipping_type",options:[],filter:[],dispage:[]},specialType:[{property:"lowerPrice",label:"最低价格(元)",page:[],title:'查询"面议", 请输入 0'}],selectOptions:[{property:"shipShippingTypeName",label:"运输方式",dispage:[],type:"ship_shipping_type",options:[]},{property:"shipPayWayName",label:"付款方式",dispage:[],type:"ship_pay_way",options:[]},{property:"orderPayWayName",label:"付款方式",dispage:[],type:"ship_pay_way",options:[]},{property:"shipDeliveryMethodName",lable:"交接方式",type:"ship_delivery_method",options:[]},{property:"shipStatusName",lable:"运单状态",type:"ship_status",options:[]},{property:"shipBusinessTypeName",label:"业务类型",type:"ship_business_type",options:[]},{property:"sexFlag",label:"性别",type:"",options:[{dictName:"女",id:1},{dictName:"男",id:0}]},{property:"sendStatus",label:"发送状态",type:"",options:[{dictName:"开",id:1},{dictName:"关",id:0}]},{property:"licenseTypeName",label:"驾驶证类型",type:"driving_type",options:[]},{property:"truckSourceName",label:"车辆来源",type:"truck_source",options:[]},{property:"truckTypeName",label:"车型",type:"truck_type",options:[]},{property:"orerStatusName",label:"订单类型",type:"order_status",options:[]},{property:"shipReceiptRequireName",label:"回单要求",type:"ship_receipt_require",options:[]},{property:"signTypeName",label:"签收类型",type:"sign_type",options:[]},{property:"abnormalStatusName",label:"异常状态",type:"abnormal_status",options:[]},{property:"abnormalTypeName",label:"异常类型",type:"abnormal_type",options:[]},{property:"apportionType",label:"分摊方式",type:"apportion_type",options:[]},{property:"signStatus",label:"签收状态",type:"sign_status",options:[]},{property:"shipPayWay",label:"付款方式",type:"ship_pay_way",options:[]},{property:"shipDeliveryMethod",label:"交接方式",type:"ship_delivery_method",options:[]},{property:"totalStatusCn",label:"核销状态",type:"count_status",options:[],filter:[""]},{property:"nowPayStateCn",label:"核销状态",type:"count_status",options:[],filter:[""]},{property:"arrivepayStateCn",label:"核销状态",type:"count_status",options:[],filter:[""]},{property:"receiptpayStateCn",label:"核销状态",type:"count_status",options:[],filter:[""]},{property:"monthpayStateCn",label:"核销状态",type:"count_status",options:[],filter:[""]},{property:"changeStateCn",label:"核销状态",type:"count_status",options:[],filter:[""]},{property:"statusName",label:"核销状态",type:"count_status",options:[],filter:[""]},{property:"statusValue",label:"核销状态",type:"count_status",options:[],filter:[""]},{property:"incomePayTypeValue",label:"费用类型",type:"",options:[{dictName:"异动增款",id:"异动增款"},{dictName:"异动减款",id:"异动减款"}]},{property:"applyStatus",label:"审核状态",type:"",options:[{dictName:"审核中",id:0},{dictName:"审核通过",id:1},{dictName:"审核不通过",id:2}]},{property:"rangeStatus",label:"状态",type:"",options:[{dictName:"禁用",id:0},{dictName:"启用",id:1}]},{property:"pickupStatusName",label:"提货状态",type:"pickup_status",options:[],filter:["235"]},{property:"payMethodName",label:"付款方式",type:"ship_pay_way",options:[],filter:[]},{property:"batchTypeName",label:"批次状态",type:"short_batch_type",dispage:["/operation/order/arteryDepart/sender","/operation/order/track/artery","/operation/order/track/deliver","/operation/order/deliverManage"],options:[],filter:["46"]},{property:"bathStatusName",label:"批次状态",dispage:["/operation/order/arteryDelivery/sender"],type:"short_batch_type",options:[],filter:["46","47"]},{property:"batchTypeName",label:"批次状态",type:"main_batch_type",dispage:["/operation/order/shortDepart/deliver","/operation/order/track/deliver","/operation/order/track/deliver","/operation/order/deliverManage"],options:[],filter:["51"]},{property:"bathStatusName",label:"批次状态",dispage:["/operation/order/shortDepart/arrival"],type:"main_batch_type",options:[],filter:["51"]},{property:"batchTypeName",label:"批次状态",dispage:["/operation/order/shortDepart/deliver","/operation/order/arteryDepart/sender","/operation/order/track/artery"],type:"delivery_batch_type",options:[],filter:["56"]},{property:"unloadSignName",label:"卸货状态",type:"unload_type",options:[],filter:["405"]},{property:"signStatusName",label:"签收状态",type:"sign_status",options:[]},{property:"signCertificateName",label:"凭证状态",type:"sign_certificate",options:[],filter:["230"]},{property:"signCocumentTypeName",label:"签收证件",type:"sign_cocument_type",options:[]},{property:"backStatusName",label:"回单状态",type:"back_status",options:[]},{property:"recStatusName",label:"回收状态",type:"rec_status",options:[]},{property:"sendStatusName",label:"寄出状态",type:"send_status",options:[]},{property:"acceptStatusName",label:"接收状态",type:"accept_status",options:[]},{property:"giveoutStatusName",label:"发放状态",type:"giveout_status",options:[]},{property:"fundsGoodsStatusName",label:"货款状态",type:"funds_goods_status",options:[]},{property:"fundsRecStatusName",label:"回收状态",type:"funds_rec_status",options:[],filter:["253"]},{property:"fundsRemittanceStatusName",label:"汇款状态",type:"funds_remittance_status",options:[],filter:["256"]},{property:"fundsAccountStatusName",label:"到账状态",type:"funds_account_status",options:[],filter:["259"]},{property:"fundsGiveoutStatusName",label:"发放状态",type:"funds_giveout_status",options:[],filter:["262"]},{property:"paymentName",label:"中转付款方式",type:"payment_type",options:[]},{property:"status",label:"控货状态",onlypage:"/operation/service/controlgoods/allGoods",type:"",options:[{dictName:"未放货",id:1},{dictName:"已放货",id:2},{dictName:"未控货",id:"0"}]},{property:"dataSrcZh",label:"来源",type:"",options:[{dictName:"核销产生",id:"核销产生"},{dictName:"手工录入",id:"手工录入"}]},{property:"paymentsTypeZh",label:"方向",type:"",options:[{dictName:"收入",id:"收入"},{dictName:"支出",id:"支出"}]},{property:"verifyStatusZh",label:"审核状态",type:"",options:[{dictName:"未审核",id:"未审核"},{dictName:"已审核",id:"已审核"}]},{property:"checkStatusZh",label:"对账状态",type:"",options:[{dictName:"未对账",id:"未对账"},{dictName:"已对账",id:"已对账"}]}],unSearchList:[{property:"id",label:"序号"},{property:"number",label:"序号"},{property:"grossProfit",label:"毛利"},{property:"status",label:"控货状态",dispage:["/operation/service/controlgoods/noGoods","/operation/service/controlgoods/haveGoods"]}]}},computed:{specialTypeTitle:function(){var e="",t=this.scope.column.property.toLowerCase(),r=this.specialType.filter(function(e){return e.property.toLowerCase()===t});return r&&r.length&&(e=r[0].title),e},unSearch:function(){var t=this,r=this.scope.column.property.toLowerCase(),i=0,o=!1;return!this.unSearchList.filter(function(e){return e.property.toLowerCase()===r&&(o=!0,e.dispage&&e.dispage.length&&(i=e.dispage.filter(function(e){return e===t.$route.fullPath}).length)),e.dispage?!!(o&&0<i)||void 0:o}).length},isTime:function(){var e=/(time)/,t=this.scope.column.property.toLowerCase();if(e.test(t)&&"timeliness"!==t)return e.test(t);return!!["validityDate","validityStartdate","truckRegisterDate","truckScrapDate"].filter(function(e){return e.toLowerCase()===t}).length},isSelect:function(){var a=this,e=this.selectOptions.filter(function(e){var t,r=!1,i=!1,o=0;if(e.property===a.scope.column.property&&(r=!0,e.dispage&&e.dispage.length&&(o=e.dispage.filter(function(e){return e===a.$route.fullPath}).length),i=e.onlypage&&e.onlypage===a.$route.fullPath),t=!(0<o),e.onlypage){if(r&&t&&i)return!0}else if(r&&t)return!0});return e.length&&(this.curSelect=o()({},e[0])),e.length}},methods:{filterfn:function(t){if(this.curSelect.filter){var r=0;return this.curSelect.filter.forEach(function(e){t.id.toString()===e&&(r+=1)}),0===r}return""!==t.id},changeEnter:function(e,t,r){this.changeKey(e,t,r.target.value)},changeKey:function(t,e,r,i){var o=this;this.$nextTick(function(){var e=o.query;e.searchVo||o.$set(e,"searchVo",{}),o.isChange=!0,o.isTime&&(r=Object(a.parseTime)(r,"{y}-{m}-{d}")),e.searchVo[t.property]=r,e.currentPage=1,console.log("changeKey components::",e,t),o.$emit("change",e)})}}}},"oD/q":function(e,t,r){"use strict";var i,o=r("bOdI"),a=r.n(o),n=r("Dd8w"),s=r.n(n),l=(r("P5Di"),r("sPV7")),p=(r("E4LH"),r("NYxO")),c=r("0xDb");t.a=(i={data:function(){return{popTitle:"提醒颜色设置",repertorySetting:{},loading:!1,isShow:!1,rules:{sectionOne:[{validator:function(e,t,r){t<0||12<t?r(new Error("请输入0-12的数字")):r()},tigger:"blur"}],sectionTwo:[{validator:function(e,t,r){t<12||24<t?r(new Error("请输入12-24的数字")):r()},tigger:"blur"}],sectionThree:[{validator:function(e,t,r){t<24?r(new Error("请输入大于24的数字")):r()},tigger:"blur"}]},colorSetting:[],miniInput:"70px",predefineColors:["#ff4500","#ff8c00","#ffd700","#90ee90","#00ced1","#1e90ff","#c71585"]}},computed:{isShow:{get:function(){return this.popVisible},set:function(){}}},props:{popVisible:{type:Boolean,default:!1}},watch:{popVisible:function(){this.popVisible?this.isShow=!0:this.isShow=!1}},mounted:function(){this.getColor()}},a()(i,"computed",s()({},Object(p.mapGetters)(["otherinfo"]))),a()(i,"methods",{closeMe:function(e){this.$emit("close"),"function"==typeof e&&e()},getColor:function(){var r=this;Object(l.a)(this.otherinfo.orgid).then(function(e){if(e){var t=e.data.repertorySetting;r.$nextTick(function(){r.repertorySetting=Object(c.objectMerge2)({},t),r.colorSetting=e.data,r.$emit("success",r.colorSetting.repertorySetting)})}}).catch(function(e){r._handlerCatchMsg(e)})},submitForm:function(r){var i=this;this.$refs[r].validate(function(e){if(e){i.loading=!0;var t={};i.$set(t,"repertorySetting",i.repertorySetting),Object(l.c)(t,i.otherinfo.orgid,i.colorSetting.id).then(function(e){i.$message({type:"success",message:"修改成功"}),i.loading=!1,i.isShow=!1,i.getColor(),i.$nextTick(function(){i.$refs[r].resetFields()})}).catch(function(e){i._handlerCatchMsg(e),i.loading=!1})}})}}),i)},p6zF:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=r("oD/q"),o=r("Lghf");var a=function(e){r("7BEH")},n=r("VU/8")(i.a,o.a,a,null,null);t.default=n.exports},sdyU:function(e,t,r){"use strict";var i={render:function(){var r=this,e=r.$createElement,i=r._self._c||e;return i("div",{staticClass:"table-header-wrapper"},[i("p",{staticClass:"table-header-label",attrs:{title:r.scope.column.label}},[r._v(r._s(r.scope.column.label))]),r._v(" "),r.isTime&&r.unSearch?i("el-date-picker",{attrs:{type:"date",placeholder:"选择日期时间",size:r.btnsize},on:{change:function(e){return r.changeKey(r.scope.column,r.scope.$index,e)}},nativeOn:{click:function(e){e.stopPropagation(),e.preventDefault()},keyup:function(e){return"button"in e||!r._k(e.keyCode,"enter",13,e.key,"Enter")?(t=e,r.changeEnter(r.scope.column,r.scope.$index,t)):null;var t}},model:{value:r.queryString,callback:function(e){r.queryString="string"==typeof e?e.trim():e},expression:"queryString"}}):r.isSelect&&r.curSelect.type?i("SelectType",{attrs:{placeholder:"请选择",size:r.btnsize,type:r.curSelect.type,clearable:"",filterfn:r.filterfn},on:{changeItem:function(e,t){return r.changeKey(r.scope.column,r.scope.$index,t.dictName||"")}},nativeOn:{click:function(e){e.stopPropagation(),e.preventDefault()},keyup:function(e){return"button"in e||!r._k(e.keyCode,"enter",13,e.key,"Enter")?(t=e,r.changeEnter(r.scope.column,r.scope.$index,t)):null;var t}},model:{value:r.queryString,callback:function(e){r.queryString=e},expression:"queryString"}}):r.isSelect&&!r.curSelect.type&&r.unSearch?i("el-select",{attrs:{placeholder:"请选择",clearable:"",size:r.btnsize,type:r.curSelect.type},on:{change:function(e){return r.changeKey(r.scope.column,r.scope.$index,e)}},nativeOn:{click:function(e){e.stopPropagation(),e.preventDefault()},keyup:function(e){return"button"in e||!r._k(e.keyCode,"enter",13,e.key,"Enter")?(t=e,r.changeEnter(r.scope.column,r.scope.$index,t)):null;var t}},model:{value:r.queryString,callback:function(e){r.queryString=e},expression:"queryString"}},r._l(r.curSelect.options,function(e,t){return i("el-option",{key:t,attrs:{label:e.dictName,value:e.id}})})):r.unSearch?i("el-tooltip",{attrs:{content:r.specialTypeTitle,disabled:!r.specialTypeTitle,placement:"top",effect:"light"}},[i("el-input",{staticClass:"table-header-input",attrs:{size:r.btnsize,placeholder:"搜索关键字",maxlength:50,clearable:""},on:{change:function(e){return r.changeKey(r.scope.column,r.scope.$index,e)}},nativeOn:{click:function(e){e.stopPropagation(),e.preventDefault()},keyup:function(e){return"button"in e||!r._k(e.keyCode,"enter",13,e.key,"Enter")?(t=e,r.changeEnter(r.scope.column,r.scope.$index,t)):null;var t}},model:{value:r.queryString,callback:function(e){r.queryString="string"==typeof e?e.trim():e},expression:"queryString"}})],1):r._e()],1)},staticRenderFns:[]};t.a=i},vmn5:function(e,t,r){"use strict";var i=r("i2Q8"),o=r("sdyU");var a=function(e){r("55Wa")},n=r("VU/8")(i.a,o.a,a,null,null);t.a=n.exports}});