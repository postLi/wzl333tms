webpackJsonp([176,275,336],{"58x0":function(e,t,r){"use strict";var o=r("woOf"),i=r.n(o),s=(r("E4LH"),r("o9X6")),l=r("pAQG"),a=r("0xDb");t.a={components:{SelectTree:s.a,querySelect:l.a},props:{btnsize:{type:String,default:"mini"},orgid:{type:Number}},data:function(){return{searchForm:{shipSn:"",shipFromCityName:"",shipToCityName:"",senderCustomerName:""},rules:{},searchTime:[Object(a.parseTime)(new Date-5184e6),Object(a.parseTime)(new Date)],defaultTime:[Object(a.parseTime)(new Date-5184e6),Object(a.parseTime)(new Date)],pickerOptions2:{shortcuts:a.pickerOptions2}}},mounted:function(){},methods:{onSubmit:function(){var e=i()({},this.searchForm);this.searchTime&&(this.$set(e,"startTime",Object(a.parseTime)(this.searchTime[0],"{y}-{m}-{d} ")+"00:00:00"),this.$set(e,"endTime",Object(a.parseTime)(this.searchTime[1],"{y}-{m}-{d} ")+"23:59:59")),this.$emit("change",e)},clearForm:function(e){var t=this;this.$nextTick(function(){i()(t.$data,t.$options.data()),t.$refs[e].resetFields(),t.searchTime=t.$options.data().searchTime})}}}},"5swg":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=r("58x0"),i=r("8AeK"),s=r("VU/8")(o.a,i.a,null,null,null);t.default=s.exports},"7BEH":function(e,t){},"8AeK":function(e,t,r){"use strict";var o={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("el-form",{ref:"searchForm",staticClass:"staff_searchinfo clearfix",attrs:{inline:!0,size:t.btnsize,"label-position":"right",rules:t.rules,model:t.searchForm,"label-width":"70px"}},[r("div",{staticClass:"staff_searchinfo--input"},[r("el-form-item",{attrs:{label:"开单时间"}},[r("el-date-picker",{attrs:{"default-value":t.defaultTime,type:"daterange",align:"right","value-format":"yyyy-MM-dd HH:mm:ss","start-placeholder":"开始日期","picker-options":t.pickerOptions2,clearable:!1,"end-placeholder":"结束日期"},model:{value:t.searchTime,callback:function(e){t.searchTime=e},expression:"searchTime"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"运单号",prop:"shipSn"}},[r("querySelect",{attrs:{clearable:"",search:"shipSn",type:"order",valuekey:"shipSn",maxlength:15},model:{value:t.searchForm.shipSn,callback:function(e){t.$set(t.searchForm,"shipSn",e)},expression:"searchForm.shipSn"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"发站"}},[r("el-input",{attrs:{maxlength:15,clearable:""},model:{value:t.searchForm.shipFromCityName,callback:function(e){t.$set(t.searchForm,"shipFromCityName",e)},expression:"searchForm.shipFromCityName"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"到站"}},[r("el-input",{attrs:{maxlength:15,clearable:""},model:{value:t.searchForm.shipToCityName,callback:function(e){t.$set(t.searchForm,"shipToCityName",e)},expression:"searchForm.shipToCityName"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"发货人",prop:"senderCustomerName"}},[r("el-input",{attrs:{maxlength:15,clearable:""},model:{value:t.searchForm.senderCustomerName,callback:function(e){t.$set(t.searchForm,"senderCustomerName",e)},expression:"searchForm.senderCustomerName"}})],1)],1),t._v(" "),r("el-form-item",{staticClass:"staff_searchinfo--btn"},[r("el-button",{attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v("查询")]),t._v(" "),r("el-button",{attrs:{type:"info",plain:""},on:{click:function(e){t.clearForm("searchForm")}}},[t._v("清空")])],1)],1)},staticRenderFns:[]};t.a=o},Lghf:function(e,t,r){"use strict";var o={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("el-dialog",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"tms_dialog",attrs:{title:t.popTitle,visible:t.isShow,"close-on-click-modal":!1,"before-close":t.closeMe},on:{"update:visible":function(e){t.isShow=e}}},[r("el-form",{ref:"ruleForm",staticClass:"colorpickerForm",attrs:{model:t.repertorySetting,rules:t.rules}},[r("el-form-item",{staticClass:"colorpickerItem",attrs:{prop:"sectionOne"}},[r("b",[t._v("超过：")]),t._v(" "),r("el-input",{model:{value:t.repertorySetting.sectionOne,callback:function(e){t.$set(t.repertorySetting,"sectionOne",e)},expression:"repertorySetting.sectionOne"}}),r("b",[t._v("小时的库存颜色")]),t._v(" "),r("el-color-picker",{attrs:{predefine:t.predefineColors},model:{value:t.repertorySetting.sectionOneColour,callback:function(e){t.$set(t.repertorySetting,"sectionOneColour",t._n(e))},expression:"repertorySetting.sectionOneColour"}})],1),t._v(" "),r("el-form-item",{staticClass:"colorpickerItem",attrs:{prop:"sectionTwo"}},[r("b",[t._v("超过：")]),t._v(" "),r("el-input",{model:{value:t.repertorySetting.sectionTwo,callback:function(e){t.$set(t.repertorySetting,"sectionTwo",e)},expression:"repertorySetting.sectionTwo"}}),r("b",[t._v("小时的库存颜色")]),t._v(" "),r("el-color-picker",{attrs:{predefine:t.predefineColors},model:{value:t.repertorySetting.sectionTwoColour,callback:function(e){t.$set(t.repertorySetting,"sectionTwoColour",t._n(e))},expression:"repertorySetting.sectionTwoColour"}})],1),t._v(" "),r("el-form-item",{staticClass:"colorpickerItem",attrs:{prop:"sectionThree"}},[r("b",[t._v("超过：")]),t._v(" "),r("el-input",{model:{value:t.repertorySetting.sectionThree,callback:function(e){t.$set(t.repertorySetting,"sectionThree",e)},expression:"repertorySetting.sectionThree"}}),r("b",[t._v("小时的库存颜色")]),t._v(" "),r("el-color-picker",{attrs:{predefine:t.predefineColors},model:{value:t.repertorySetting.sectionThreeColour,callback:function(e){t.$set(t.repertorySetting,"sectionThreeColour",t._n(e))},expression:"repertorySetting.sectionThreeColour"}})],1)],1),t._v(" "),r("div",{attrs:{slot:"footer"},slot:"footer"},[r("el-button",{attrs:{type:"primary"},on:{click:function(e){t.submitForm("ruleForm")}}},[t._v("确 定")]),t._v(" "),r("el-button",{on:{click:t.closeMe}},[t._v("取 消")])],1)],1)},staticRenderFns:[]};t.a=o},WIPA:function(e,t,r){"use strict";var o=r("woOf"),i=r.n(o),s=r("Dd8w"),l=r.n(s),a=r("bOdI"),n=r.n(a),c=r("sPV7"),p=r("NYxO"),h=r("5swg"),u=r("p6zF"),d=r("1onU"),m=r("0xDb"),b=r("puNT"),f=r("Mqi+"),g=r("UQm2");t.a={components:{Pager:d.a,SearchForm:h.default,Colorpicker:u.default,TableSetup:b.a},data:function(){var t=this;return n()({setupTableVisible:!1,tablekey:0,tableColumn:[],total:0,btnsize:"mini",repertoryArr:[],selected:[],loading:!0,colorpickerVisible:!1,isModify:!1,selectInfo:[],selectionColorSetting:{},reportorSelect:{},searchQuery:{currentPage:1,pageSize:100,vo:{orgId:1}}},"tableColumn",[{label:"序号",prop:"number",width:"70",fixed:!0,slot:function(e){return(t.searchQuery.currentPage-1)*t.searchQuery.pageSize+e.$index+1}},{label:"运单号",prop:"shipSn",width:"110",fixed:!0},{label:"运单状态",prop:"shipStatusName",width:"120"},{label:"运单标识",prop:"shipIdentifying",width:"120",slot:function(e){return Object(f.b)(e.row.shipIdentifying)}},{label:"入库时间",prop:"repertoryCreateTime",width:"160",slot:function(e){return""+Object(m.parseTime)(e.row.repertoryCreateTime,"{y}-{m}-{d} {h}:{i}:{s}")}},{label:"库存时长",prop:"hashour",width:"110"},{label:"开单网点",prop:"fromOrgName",width:"110"},{label:"开单时间",prop:"createTime",width:"160",slot:function(e){return""+Object(m.parseTime)(e.row.createTime,"{y}-{m}-{d} {h}:{i}:{s}")}},{label:"货品名",prop:"cargoName",width:"150"},{label:"库存件数",prop:"repertoryAmount",width:"90"},{label:"库存重量",prop:"repertoryWeight",width:"90"},{label:"库存体积",prop:"repertoryVolume",width:"90"},{label:"运单件数",prop:"cargoAmount",width:"90"},{label:"运单重量",prop:"cargoWeight",width:"90"},{label:"运单体积",prop:"cargoVolume",width:"90"},{label:"发站",prop:"shipFromCityName",width:"150"},{label:"到站",prop:"shipToCityName",width:"150"},{label:"发货人",prop:"senderCustomerName",width:"100"},{label:"发货人电话",prop:"receiverCustomerMobile",width:"110"},{label:"收货人",prop:"receiverCustomerName",width:"100"},{label:"收货人电话",prop:"receiverCustomerMobile",width:"110"},{label:"交接方式",prop:"shipDeliveryMethodName",width:"90"},{label:"运费",prop:"shipFee",width:"90"},{label:"提货费",prop:"pickupFee",width:"90"},{label:"回扣",prop:"brokerageFee",width:"90"},{label:"保险费",prop:"insuranceFee",width:"90"},{label:"声明价值",prop:"productPrice",width:"90"},{label:"包装费",prop:"packageFee",width:"90"},{label:"送货费",prop:"deliveryFee",width:"90"},{label:"运费合计",prop:"shipTotalFee",width:"90"},{label:"付款方式",prop:"shipPayWayName",width:"90"},{label:"现付",prop:"shipNowpayFee",width:"90"},{label:"到付",prop:"shipArrivepayFee",width:"90"},{label:"回单付",prop:"shipReceiptpayFee",width:"90"},{label:"月结",prop:"shipMonthpayFee",width:"90"},{label:"备注",prop:"shipRemarks",width:"150"},{label:"发货方",prop:"senderCustomerUnit",width:"120"},{label:"发货地址",prop:"senderDetailedAddress",width:"150"},{label:"收货方",prop:"receiverCustomerUnit",width:"120"},{label:"收货地址",prop:"receiverDetailedAddress",width:"150"},{label:"货号",prop:"shipGoodsSn",width:"150"},{label:"品种规格",prop:"description",width:"100"},{label:"件数单价",prop:"amountFee",width:"90"},{label:"重量单价",prop:"weightFee",width:"90"},{label:"体积单价",prop:"volumeFee",width:"90"},{label:"回单号",prop:"shipReceiptSn",width:"150"},{label:"回单要求",prop:"shipReceiptRequireName",width:"150"},{label:"回单份数",prop:"shipReceiptNum",width:"90"},{label:"代收款手续费",prop:"commissionFee",width:"120"},{label:"客户单号",prop:"shipCustomerNumber",width:"90"},{label:"毛利",prop:"grossProfit",width:"90"},{label:"运输方式",prop:"shipShippingTypeName",width:"100"},{label:"业务类型",prop:"shipBusinessTypeName",width:"100"},{label:"时效",prop:"shipEffectiveName",width:"100"},{label:"上楼费",prop:"goupstairsFee",width:"90"},{label:"叉车费",prop:"forkliftFee",width:"90"},{label:"装卸费",prop:"handlingFee",width:"90"},{label:"入仓费",prop:"housingFee",width:"90"}])},computed:l()({},Object(p.mapGetters)(["otherinfo"]),{orgid:function(){return this.isModify?this.selectInfo.orgid:this.searchQuery.vo.orgId||this.otherinfo.orgid}}),mounted:function(){this.searchQuery.vo.orgId=this.otherinfo.orgid},methods:{getSumLeft:function(e,t){return Object(m.getSummaries)(e,m.operationPropertyCalc)},tableRowColor:function(e){var t=e.row;e.rowIndex;return Number(this.selectionColorSetting.sectionOne)<Number(t.hashours)&&Number(t.hashours)<Number(this.selectionColorSetting.sectionTwo)+1?{color:this.selectionColorSetting.sectionOneColour}:Number(this.selectionColorSetting.sectionTwo)<Number(t.hashours)&&Number(t.hashours)<Number(this.selectionColorSetting.sectionThree)+1?{color:this.selectionColorSetting.sectionTwoColour}:Number(this.selectionColorSetting.sectionThree)<Number(t.hashours)?{color:this.selectionColorSetting.sectionThreeColour}:{color:"#333"}},getSearchParam:function(e){this.searchQuery.currentPage=this.$options.data().searchQuery.currentPage,this.searchQuery.pageSize=this.$options.data().searchQuery.pageSize,this.searchQuery.vo=i()(this.searchQuery.vo,e),this.fetchAllOrderRepertory()},doAction:function(e){switch(e){case"colorpicker":this.reportorSelect=this.selected,this.openColor();break;case"export":this.closeColorpicker(),Object(g.g)({data:this.selected.length?this.selected:this.repertoryArr,columns:this.tableColumn,name:"到货库存-"+Object(m.parseTime)(new Date,"{y}{m}{d}{h}{i}{s}")});break;case"print":this.closeColorpicker(),Object(g.d)({data:this.selected.length?this.selected:this.repertoryArr,columns:this.tableColumn,name:"到货库存-"+Object(m.parseTime)(new Date,"{y}{m}{d}{h}{i}{s}")})}},showDetail:function(e){this.eventBus.$emit("showOrderDetail",e.shipId,e.shipSn,!0),console.log(e.shipId)},setTable:function(){this.setupTableVisible=!0},closeSetupTable:function(){this.setupTableVisible=!1},clickDetails:function(e){this.$refs.multipleTable.toggleRowSelection(e)},getSelection:function(e){this.selected=e},handlePageChange:function(e){this.searchQuery.currentPage=e.pageNum,this.searchQuery.pageSize=e.pageSize,this.fetchAllOrderRepertory()},fetchAllOrderRepertory:function(){this.getAllOrderRepertory()},openColor:function(){this.colorpickerVisible=!0},closeColorpicker:function(){this.colorpickerVisible=!1},getAllOrderRepertory:function(){var t=this;return this.loading=!0,this.$set(this.searchQuery.vo,"repertoryType",2),Object(c.b)(this.searchQuery).then(function(e){t.repertoryArr=e.list,t.total=e.total,t.loading=!1}).catch(function(e){t._handlerCatchMsg(e),t.loading=!1})},setColumColor:function(e){this.selectionColorSetting=e,this.closeColorpicker(),this.fetchAllOrderRepertory()},setColumn:function(e){this.tableColumn=e,this.tablekey=Math.random()}}}},"oD/q":function(e,t,r){"use strict";var o,i=r("bOdI"),s=r.n(i),l=r("Dd8w"),a=r.n(l),n=(r("P5Di"),r("sPV7")),c=(r("E4LH"),r("NYxO")),p=r("0xDb");t.a=(o={data:function(){return{popTitle:"提醒颜色设置",repertorySetting:{},loading:!1,isShow:!1,rules:{sectionOne:[{validator:function(e,t,r){t<0||12<t?r(new Error("请输入0-12的数字")):r()},tigger:"blur"}],sectionTwo:[{validator:function(e,t,r){t<12||24<t?r(new Error("请输入12-24的数字")):r()},tigger:"blur"}],sectionThree:[{validator:function(e,t,r){t<24?r(new Error("请输入大于24的数字")):r()},tigger:"blur"}]},colorSetting:[],miniInput:"70px",predefineColors:["#ff4500","#ff8c00","#ffd700","#90ee90","#00ced1","#1e90ff","#c71585"]}},computed:{isShow:{get:function(){return this.popVisible},set:function(){}}},props:{popVisible:{type:Boolean,default:!1}},watch:{popVisible:function(){this.popVisible?this.isShow=!0:this.isShow=!1}},mounted:function(){this.getColor()}},s()(o,"computed",a()({},Object(c.mapGetters)(["otherinfo"]))),s()(o,"methods",{closeMe:function(e){this.$emit("close"),"function"==typeof e&&e()},getColor:function(){var r=this;Object(n.a)(this.otherinfo.orgid).then(function(e){if(e){var t=e.data.repertorySetting;r.$nextTick(function(){r.repertorySetting=Object(p.objectMerge2)({},t),r.colorSetting=e.data,r.$emit("success",r.colorSetting.repertorySetting)})}}).catch(function(e){r._handlerCatchMsg(e)})},submitForm:function(r){var o=this;this.$refs[r].validate(function(e){if(e){o.loading=!0;var t={};o.$set(t,"repertorySetting",o.repertorySetting),Object(n.c)(t,o.otherinfo.orgid,o.colorSetting.id).then(function(e){o.$message({type:"success",message:"修改成功"}),o.loading=!1,o.isShow=!1,o.getColor(),o.$nextTick(function(){o.$refs[r].resetFields()})}).catch(function(e){o._handlerCatchMsg(e),o.loading=!1})}})}}),o)},p6zF:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=r("oD/q"),i=r("Lghf");var s=function(e){r("7BEH")},l=r("VU/8")(o.a,i.a,s,null,null);t.default=l.exports},pHZc:function(e,t,r){"use strict";var o={render:function(){var o=this,e=o.$createElement,i=o._self._c||e;return i("div",{directives:[{name:"loading",rawName:"v-loading",value:o.loading,expression:"loading"}],staticClass:"tab-content"},[i("SearchForm",{attrs:{orgid:o.otherinfo.orgid,btnsize:o.btnsize},on:{change:o.getSearchParam}}),o._v(" "),i("div",{staticClass:"tab_info"},[i("div",{staticClass:"btns_box"},[i("el-button",{directives:[{name:"has",rawName:"v-has:ORDER_COLOUR3",arg:"ORDER_COLOUR3"}],attrs:{type:"primary",size:o.btnsize,icon:"el-icon-menu",plain:""},on:{click:function(e){o.doAction("colorpicker")}}},[o._v("提醒颜色设置")]),o._v(" "),i("el-button",{directives:[{name:"has",rawName:"v-has:ORDER_COLOURP3",arg:"ORDER_COLOURP3"}],attrs:{type:"primary",size:o.btnsize,icon:"el-icon-printer",plain:""},on:{click:function(e){o.doAction("print")}}},[o._v("打印")]),o._v(" "),i("el-button",{directives:[{name:"has",rawName:"v-has:ORDER_COLOUREXP3",arg:"ORDER_COLOUREXP3"}],attrs:{type:"primary",size:o.btnsize,icon:"el-icon-download",plain:""},on:{click:function(e){o.doAction("export")}}},[o._v("导出")]),o._v(" "),i("el-button",{staticClass:"table_setup",attrs:{type:"primary",size:o.btnsize,icon:"el-icon-setting",plain:""},on:{click:o.setTable}},[o._v("表格设置")])],1),o._v(" "),i("div",{staticClass:"info_tab"},[i("el-table",{key:o.tablekey,ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:o.repertoryArr,border:"",height:"100%","tooltip-effect":"dark","summary-method":o.getSumLeft,"show-summary":"","row-style":o.tableRowColor,"default-sort":{prop:"id",order:"ascending"}},on:{"row-dblclick":o.showDetail,"row-click":o.clickDetails,"selection-change":o.getSelection}},[i("el-table-column",{attrs:{fixed:"",sortable:"",type:"selection",width:"35"}}),o._v(" "),o._l(o.tableColumn,function(r){return[r.slot?i("el-table-column",{key:r.id,attrs:{fixed:r.fixed,sortable:"",label:r.label,width:r.width},scopedSlots:o._u([{key:"default",fn:function(t){return[r.click?i("span",{staticClass:"clickitem",domProps:{innerHTML:o._s(r.slot(t))},on:{click:function(e){e.stopPropagation(),r.click(t)}}}):i("span",{domProps:{innerHTML:o._s(r.slot(t))}})]}}])}):i("el-table-column",{key:r.id,attrs:{fixed:r.fixed,sortable:"",label:r.label,prop:r.prop,width:r.width}})]})],2)],1),o._v(" "),i("div",{staticClass:"info_tab_footer"},[o._v("\n      共计:"+o._s(o.total)+"\n      "),i("div",{staticClass:"show_pager"},[i("Pager",{attrs:{total:o.total},on:{change:o.handlePageChange}})],1)]),o._v(" "),i("Colorpicker",{attrs:{popVisible:o.colorpickerVisible,reportors:o.reportorSelect},on:{close:o.closeColorpicker,success:o.setColumColor}}),o._v(" "),i("TableSetup",{attrs:{popVisible:o.setupTableVisible,code:"ORDER_REPER_ARRIVE",columns:o.tableColumn},on:{close:o.closeSetupTable,success:o.setColumn}})],1)],1)},staticRenderFns:[]};t.a=o},wzrh:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=r("WIPA"),i=r("pHZc"),s=r("VU/8")(o.a,i.a,null,null,null);t.default=s.exports}});