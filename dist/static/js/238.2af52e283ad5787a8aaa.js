webpackJsonp([238,271],{"3oKu":function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=i("b0gS"),r=i("EIn/");var s=function(e){i("R6cw")},o=i("VU/8")(a.a,r.a,s,null,null);t.default=o.exports},"9b/C":function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=i("T1Xz"),r=i("dgo5"),s=i("VU/8")(a.a,r.a,null,null,null);t.default=s.exports},"EIn/":function(e,t,i){"use strict";var a={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-form",{staticClass:"staff_searchinfo clearfix",attrs:{inline:!0,size:t.btnsize,"label-position":"right",rules:t.rules,model:t.searchForm,"label-width":"70px"}},[i("div",{staticClass:"staff_searchinfo--input"},[i("el-form-item",{attrs:{label:"开单时间"}},[i("div",{staticClass:"block"},[i("el-date-picker",{attrs:{"default-value":t.defaultTime,type:"daterange",align:"right","value-format":"yyyy-MM-dd","start-placeholder":"开始日期","picker-options":t.pickerOptions2,"end-placeholder":"结束日期"},model:{value:t.searchCreatTime,callback:function(e){t.searchCreatTime=e},expression:"searchCreatTime"}})],1)]),t._v(" "),i("el-form-item",{attrs:{label:"开单网点"}},[i("SelectTree",{attrs:{orgid:t.otherinfo.orgid},model:{value:t.searchForm.shipFromOrgid,callback:function(e){t.$set(t.searchForm,"shipFromOrgid",e)},expression:"searchForm.shipFromOrgid"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"运单号",prop:"shipSn"}},[i("el-input",{attrs:{maxlength:20,"auto-complete":"off",clearable:""},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.onSubmit(e):null}},model:{value:t.searchForm.shipSn,callback:function(e){t.$set(t.searchForm,"shipSn",e)},expression:"searchForm.shipSn"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"发站"}},[i("el-input",{attrs:{maxlength:20,"auto-complete":"off",clearable:""},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.onSubmit(e):null}},model:{value:t.searchForm.shipFromCityName,callback:function(e){t.$set(t.searchForm,"shipFromCityName",e)},expression:"searchForm.shipFromCityName"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"到站"}},[i("el-input",{attrs:{maxlength:20,"auto-complete":"off",clearable:""},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.onSubmit(e):null}},model:{value:t.searchForm.shipToCityName,callback:function(e){t.$set(t.searchForm,"shipToCityName",e)},expression:"searchForm.shipToCityName"}})],1)],1),t._v(" "),i("el-form-item",{staticClass:"staff_searchinfo--btn"},[i("el-button",{attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v("查询")]),t._v(" "),i("el-button",{attrs:{type:"info",plain:""},on:{click:t.clearForm}},[t._v("清空")])],1)],1)},staticRenderFns:[]};t.a=a},R6cw:function(e,t){},T1Xz:function(e,t,i){"use strict";var a=i("Dd8w"),r=i.n(a),s=i("3oKu"),o=i("Tv76"),l=i("OHys"),n=i("NYxO"),p=i("1onU"),h=i("puNT"),c=i("0xDb"),d=i("Mqi+");t.a={components:{SearchForm:s.default,TableSetup:h.a,Pager:p.a},computed:r()({},Object(n.mapGetters)(["otherinfo"])),mounted:function(){},data:function(){var t=this;return{btnsize:"mini",component:"Send",selectInfo:{},dataset:[],loading:!0,setupTableVisible:!1,selected:[],total:0,id:"",allId:!0,tablekey:0,searchQuery:{currentPage:1,pageSize:100,vo:{shipFromOrgid:1}},tableColumn:[{label:"序号",prop:"number",width:"60",fixed:!0,slot:function(e){return(t.searchQuery.currentPage-1)*t.searchQuery.pageSize+e.$index+1}},{label:"运单号",prop:"shipSn",width:"120",fixed:!0},{label:"控货状态",prop:"status",width:"120",slot:function(e){return 1===e.row.status?"未放货":2===e.row.status?"已放货":"未控货"},fixed:!1},{label:"运单状态",prop:"shipStatusName",width:"120",fixed:!1},{label:"运单标识",prop:"shipIdentifying",width:"120",slot:function(e){return Object(d.b)(e.row.shipIdentifying)},fixed:!1},{label:"开单网点",prop:"fromOrgName",width:"120",fixed:!1},{label:"目的网点",prop:"toOrgName",width:"120",fixed:!1},{label:"开单时间",prop:"createTime",width:"165",slot:function(e){return""+Object(c.parseTime)(e.row.createTime,"{y}-{m}-{d} {h}:{i}:{s}")},fixed:!1},{label:"发货人",prop:"shipSenderName",width:"120",fixed:!1},{label:"发货人电话",prop:"shipSenderMobile",width:"120",fixed:!1},{label:"收货人",prop:"shipReceiverName",width:"120",fixed:!1},{label:"收货人电话",prop:"shipReceiverMobile",width:"120",fixed:!1},{label:"发货人地址",prop:"shipSenderAddress",width:"120",fixed:!1},{label:"收货地址",prop:"shipReceiverAddress",width:"120",fixed:!1},{label:"交接方式",prop:"shipDeliveryMethodName",width:"120",fixed:!1},{label:"货物名称",prop:"cargoName",width:"120",fixed:!1},{label:"品种规格",prop:"description",width:"120",fixed:!1},{label:"件数",prop:"cargoAmount",width:"90",fixed:!1},{label:"重量",prop:"cargoWeight",width:"90",fixed:!1},{label:"体积",prop:"cargoVolume",width:"90",fixed:!1},{label:"件数单价",prop:"amountFee",width:"120",fixed:!1},{label:"重量单价",prop:"weightFee",width:"120",fixed:!1},{label:"体积单价",prop:"volumeFee",width:"120",fixed:!1},{label:"发站",prop:"shipFromCityName",width:"120",fixed:!1},{label:"到站",prop:"shipToCityName",width:"120",fixed:!1},{label:"送货方式",prop:"shipDeliveryMethodName",width:"120",fixed:!1},{label:"回单要求",prop:"shipReceiptRequireName",width:"120",fixed:!1},{label:"回单份数",prop:"shipReceiptNum",width:"120",fixed:!1},{label:"代收货款",prop:"agencyFund",width:"120",fixed:!1},{label:"付款方式",prop:"shipPayWayName",width:"120",fixed:!1},{label:"现付",prop:"shipNowpayFee",width:"80",fixed:!1},{label:"到付",prop:"shipArrivepayFee",width:"80",fixed:!1},{label:"回单付",prop:"shipReceiptpayFee",width:"90",fixed:!1},{label:"月结",prop:"shipMonthpayFee",width:"80",fixed:!1},{label:"合计运费",prop:"shipTotalFee",width:"120",fixed:!1},{label:"备注",prop:"shipRemarks",width:"120",fixed:!1},{label:"目的省",prop:"shipToCityName",width:"120",slot:function(e){return e.row.shipToCityName?e.row.shipToCityName.split(",")[0]:""},fixed:!1},{label:"目的市",prop:"shipToCityName",width:"120",slot:function(e){return e.row.shipToCityName?e.row.shipToCityName.split(",")[1]:""},fixed:!1},{label:"目的区",prop:"shipToCityName",width:"120",slot:function(e){return e.row.shipToCityName?e.row.shipToCityName.split(",")[2]:""},fixed:!1},{label:"制单人",prop:"userName",width:"120",fixed:!1},{label:"发货单位",prop:"shipSenderUnit",width:"120",fixed:!1},{label:"收货单位",prop:"shipReceiverUnit",width:"120",fixed:!1},{label:"回扣",prop:"brokerageFee",width:"80",fixed:!1},{label:"送货费",prop:"deliveryFee",width:"90",fixed:!1},{label:"代收手续费",prop:"commissionFee",width:"120",fixed:!1},{label:"声明价值",prop:"productPrice",width:"120",fixed:!1},{label:"保险费",prop:"insuranceFee",width:"90",fixed:!1},{label:"包装费",prop:"packageFee",width:"90",fixed:!1},{label:"提货费",prop:"pickupFee",width:"90",fixed:!1},{label:"上楼费",prop:"goupstairsFee",width:"90",fixed:!1},{label:"实际提货费",prop:"shipFee",width:"120",fixed:!1},{label:"叉车费",prop:"forkliftFee",width:"120",fixed:!1},{label:"实际装卸费",prop:"realityhandlingFee",width:"120",fixed:!1},{label:"报关费",prop:"customsFee",width:"90",fixed:!1},{label:"其他费收入",prop:"otherfeeIn",width:"120",fixed:!1},{label:"其他费支出",prop:"otherfeeOut",width:"120",fixed:!1},{label:"税率",prop:"taxRate",width:"80",fixed:!1},{label:"入仓费",prop:"housingFee",width:"90",fixed:!1},{label:"印花税",prop:"stampTax",width:"90",fixed:!1}]}},methods:{getSumLeft:function(e,t){return Object(c.getSummaries)(e,c.operationPropertyCalc)},parseShipStatus:function(e){return Object(d.b)(e)},fetchAllPutFh:function(){var t=this;return this.loading=!0,l.a.getAllShip(this.searchQuery).then(function(e){t.dataset=e.list,t.total=e.total,t.loading=!1}).catch(function(e){t._handlerCatchMsg(e)})},fetchData:function(){this.fetchAllPutFh()},getSearchParam:function(e){this.searchQuery.currentPage=this.$options.data().searchQuery.currentPage,this.searchQuery.pageSize=this.$options.data().searchQuery.pageSize,Object(c.objectMerge2)(this.searchQuery.vo,e),this.fetchData()},handlePageChange:function(e){this.searchQuery.currentPage=e.pageNum,this.searchQuery.pageSize=e.pageSize,this.fetchData()},getSelection:function(e){this.selected=e},doAction:function(e){var t=this;if(!this.selected.length&&"export"!==e)return this.$message({message:"请选择要操作的项~",type:"warning"}),!1;switch(e){case"controlGoods":if(1<this.selected.length)this.$message({message:"一次只能选择一条运单",type:"warning"});else if(67==this.selected[0].shipStatus)this.$message.warning("选择的运单已签收不能控货！");else{var i=this.selected[0].id;console.log(i),Object(o.b)(i).then(function(e){return t.$message({message:"控货成功~",type:"success"}).catch(function(e){t._handlerCatchMsg(e)}),t.fetchData(),!1})}}this.$refs.multipleTable.clearSelection()},setTable:function(){this.setupTableVisible=!0},setColumn:function(e){this.tableColumn=e,this.tablekey=Math.random()},closeSetupTable:function(){this.setupTableVisible=!1},clickDetails:function(e,t,i){this.$refs.multipleTable.toggleRowSelection(e)},getDbClick:function(e){this.eventBus.$emit("showOrderDetail",e.id,e.shipSn,!0)}}}},b0gS:function(e,t,i){"use strict";var a=i("0xDb"),r=i("o9X6"),s=i("66wn");t.a={components:{SelectTree:r.a,SelectCity:s.a},props:{btnsize:{type:String,default:"mini"},orgid:{type:[Array,Number]},shipSn:{type:Number},issender:{type:Boolean,dafault:!1},allId:{type:Boolean,dafault:!1}},computed:{},data:function(){return{searchCreatTime:[],defaultTime:[Object(a.parseTime)(+new Date-5184e6,"{y}-{m}-{d}"),Object(a.parseTime)(new Date,"{y}-{m}-{d}")],pickerOptions1:"",searchForm:{shipFromOrgid:"",shipSn:"",shipFromCityName:"",shipToCityName:""},rules:{},pickerOptions2:{shortcuts:a.pickerOptions2}}},watch:{orgid:function(e){this.searchForm.shipFromOrgid=e},allId:function(e){}},mounted:function(){this.searchForm.shipFromOrgid=this.orgid,this.searchCreatTime=this.defaultTime,this.onSubmit()},methods:{onSubmit:function(){this.searchForm.startTime=this.searchCreatTime?Object(a.parseTime)(this.searchCreatTime[0],"{y}-{m}-{d} ")+"00:00:00":"",this.searchForm.endTime=this.searchCreatTime?Object(a.parseTime)(this.searchCreatTime[1],"{y}-{m}-{d} ")+"23:59:59":"";var e=Object(a.objectMerge2)({},this.searchForm);this.allId?e.shipFromOrgid=this.searchForm.shipFromOrgid:this.searchForm.shipFromOrgid?e.shipFromOrgid=[this.searchForm.shipFromOrgid]:delete e.shipFromOrgid,this.$emit("change",e)},clearForm:function(){this.searchForm.shipFromOrgid=this.orgid,this.searchForm.shipSn="",this.searchForm.shipFromCityName="",this.searchForm.shipToCityName="",this.searchForm.shipFromOrgid="",this.searchCreatTime=this.defaultTime}}}},dgo5:function(e,t,i){"use strict";var a={render:function(){var a=this,e=a.$createElement,r=a._self._c||e;return r("div",{directives:[{name:"loading",rawName:"v-loading",value:a.loading,expression:"loading"}],staticClass:"tab-content"},[r("SearchForm",{attrs:{orgid:a.otherinfo.orgid,allId:a.allId,btnsize:a.btnsize},on:{change:a.getSearchParam}}),a._v(" "),r("div",{staticClass:"tab_info"},[r("div",{staticClass:"btns_box"},[r("el-button",{directives:[{name:"has",rawName:"v-has:CONTR_ADD",arg:"CONTR_ADD"}],attrs:{type:"primary",size:a.btnsize,icon:"el-icon-goods",plain:""},on:{click:function(e){a.doAction("controlGoods")}}},[a._v("控货")]),a._v(" "),r("el-button",{staticClass:"table_setup",attrs:{type:"primary",size:a.btnsize,icon:"el-icon-setting",plain:""},on:{click:a.setTable}},[a._v("表格设置")])],1),a._v(" "),r("div",{staticClass:"info_tab"},[r("el-table",{key:a.tablekey,ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:a.dataset,border:"",height:"100%","summary-method":a.getSumLeft,"show-summary":"","tooltip-effect":"dark","default-sort":{prop:"id",order:"ascending"},stripe:""},on:{"row-dblclick":a.getDbClick,"row-click":a.clickDetails,"selection-change":a.getSelection}},[r("el-table-column",{attrs:{fixed:"",sortable:"",type:"selection",width:"50"}}),a._v(" "),a._l(a.tableColumn,function(i){return[i.slot?r("el-table-column",{key:i.id,attrs:{fixed:i.fixed,sortable:"",label:i.label,width:i.width},scopedSlots:a._u([{key:"default",fn:function(t){return[i.click?r("span",{staticClass:"clickitem",domProps:{innerHTML:a._s(i.slot(t))},on:{click:function(e){e.stopPropagation(),i.click(t)}}}):r("span",{domProps:{innerHTML:a._s(i.slot(t))}})]}}])}):r("el-table-column",{key:i.id,attrs:{fixed:i.fixed,sortable:"",label:i.label,prop:i.prop,width:i.width}})]})],2)],1),a._v(" "),r("div",{staticClass:"info_tab_footer"},[a._v("共计:"+a._s(a.total)+" "),r("div",{staticClass:"show_pager"},[r("Pager",{attrs:{total:a.total},on:{change:a.handlePageChange}})],1)]),a._v(" "),r("TableSetup",{attrs:{popVisible:a.setupTableVisible,columns:a.tableColumn,code:"CONTRO_All"},on:{close:a.closeSetupTable,success:a.setColumn}})],1)],1)},staticRenderFns:[]};t.a=a}});