webpackJsonp([244,356],{"2Cv4":function(e,t,i){"use strict";var r=i("o9X6"),a=i("9UCZ"),n=i("pAQG"),s=(i("E4LH"),i("0xDb"));t.a={components:{SelectTree:r.a,SelectType:a.a,querySelect:n.a},props:{btnsize:{type:String,default:"mini"},orgid:{type:Number},issender:{type:Boolean,dafault:!1}},computed:{title:function(){}},data:function(){var t=this;return{searchCreatTime:[],defaultTime:[Object(s.parseTime)(+new Date-5184e6,"{y}-{m}-{d}"),Object(s.parseTime)(new Date,"{y}-{m}-{d}")],pickOption:{firstDayOfWeek:1,disabledDate:function(e){return!!t.form.tmsOrderPickup.arriveTime&&e.getTime()>t.form.tmsOrderPickup.arriveTime}},pickOption2:{firstDayOfWeek:1,disabledDate:function(e){return!!t.form.tmsOrderPickup.outTime&&e.getTime()<t.form.tmsOrderPickup.outTime}},searchForm:{orgid:"",carrierId:"",startTime:"",endTime:""},rules:{},pickerOptions2:{shortcuts:s.pickerOptions2}}},watch:{orgid:function(e){this.searchForm.orgid=e}},mounted:function(){this.searchForm.orgid=this.orgid,this.searchCreatTime=this.defaultTime,this.onSubmit()},methods:{getCarrier:function(e){e&&(this.searchForm.carrierId=e.carrierId)},onSubmit:function(){this.searchForm.startTime=this.searchCreatTime?Object(s.parseTime)(this.searchCreatTime[0],"{y}-{m}-{d} ")+"00:00:00":"",this.searchForm.endTime=this.searchCreatTime?Object(s.parseTime)(this.searchCreatTime[1],"{y}-{m}-{d} ")+"23:59:59":"",this.$emit("change",this.searchForm)},clearForm:function(){this.searchForm.orgid=this.orgid,this.searchForm.carrierId="",this.searchForm.startTime="",this.searchForm.endTime="",this.searchCreatTime=this.defaultTime},carrierItem:function(e){this.searchForm.orgid=e.orgid}}}},Dkqu:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=i("TuwM"),a=i("nsu3"),n=i("VU/8")(r.a,a.a,null,null,null);t.default=n.exports},EACm:function(e,t,i){"use strict";var r={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-form",{staticClass:"staff_searchinfo clearfix",attrs:{inline:!0,size:t.btnsize,"label-position":"right",rules:t.rules,model:t.searchForm,"label-width":"70px"}},[i("div",{staticClass:"staff_searchinfo--input"},[i("el-form-item",{attrs:{label:"中转时间"}},[i("el-date-picker",{attrs:{"default-value":t.defaultTime,type:"daterange",align:"right","value-format":"yyyy-MM-dd","start-placeholder":"开始日期","picker-options":t.pickerOptions2,"end-placeholder":"结束日期"},model:{value:t.searchCreatTime,callback:function(e){t.searchCreatTime=e},expression:"searchCreatTime"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"中转网点"}},[i("SelectTree",{attrs:{orgid:t.otherinfo.orgid},model:{value:t.searchForm.orgid,callback:function(e){t.$set(t.searchForm,"orgid",e)},expression:"searchForm.orgid"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"承运商"}},[i("querySelect",{attrs:{size:"mini",search:"carrierName",type:"carrier",valuekey:"carrierId",filterable:!0,show:"select"},on:{change:t.getCarrier},model:{value:t.searchForm.carrierId,callback:function(e){t.$set(t.searchForm,"carrierId",e)},expression:"searchForm.carrierId"}})],1)],1),t._v(" "),i("el-form-item",{staticClass:"staff_searchinfo--btn art_marginTop"},[i("el-button",{attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v("查询")]),t._v(" "),i("el-button",{attrs:{type:"info",plain:""},on:{click:t.clearForm}},[t._v("清空")])],1)],1)},staticRenderFns:[]};t.a=r},TuwM:function(e,t,i){"use strict";var r=i("woOf"),a=i.n(r),n=i("Dd8w"),s=i.n(n),o=(i("Vi15"),i("wnRn")),c=i("p2e2"),l=i("puNT"),u=i("NYxO"),d=i("1onU"),h=i("UQm2");t.a={components:{SearchForm:c.default,Pager:d.a,TableSetup:l.a},computed:s()({},Object(u.mapGetters)(["otherinfo"]),{orgid:function(){}}),mounted:function(){this.searchQuery.vo.orgid=this.otherinfo.orgid},data:function(){var t=this;return{tablekey:0,btnsize:"mini",usersArr:[],total:0,trackId:"",loading:!0,setupTableVisible:!1,AddCustomerVisible:!1,isModify:!1,isDbclick:!1,selectInfo:{},selected:[],searchQuery:{currentPage:1,pageSize:100,vo:{orgid:"",carrierId:"",startTime:"",endTime:""}},tableColumn:[{label:"序号",prop:"id",width:"120",fixed:!0,slot:function(e){return(t.searchQuery.currentPage-1)*t.searchQuery.pageSize+e.$index+1}},{label:"网点",prop:"orgName",width:"250",fixed:!0},{label:"承运商",prop:"carrierName",width:"200",fixed:!0},{label:"承运商电话",prop:"carrierMobile",width:"220",fixed:!1},{label:"应收账款",prop:"receivableFee",width:"220",fixed:!1},{label:"应付账款",prop:"payableFee",width:"220",fixed:!1},{label:"应收应付对账合计",prop:"recAndPayFee",width:"250",fixed:!1},{label:"总单数",prop:"totalCount",width:"200",fixed:!1}]}},methods:{fetchAllCustomer:function(){var t=this;return this.loading=!0,Object(o.b)(this.searchQuery).then(function(e){t.usersArr=e.list,t.total=e.total,t.loading=!1}).catch(function(e){t._handlerCatchMsg(e),t.loading=!1})},fetchData:function(){this.fetchAllCustomer()},handlePageChange:function(e){this.searchQuery.currentPage=e.pageNum,this.searchQuery.pageSize=e.pageSize,this.fetchData()},getSearchParam:function(e){this.searchQuery.currentPage=this.$options.data().searchQuery.currentPage,this.searchQuery.pageSize=this.$options.data().searchQuery.pageSize,this.searchQuery.vo=a()(this.searchQuery.vo,e),this.fetchData()},showImport:function(){},doAction:function(e){if(!this.selected.length&&"export"!==e&&"print"!==e)return this.$message({message:"请选择要操作的项~",type:"warning"}),!1;switch(e){case"export":Object(h.g)({data:this.selected.length?this.selected:this.usersArr,columns:this.tableColumn,name:"承运商对账"});break;case"print":Object(h.d)({data:this.selected.length?this.selected:this.usersArr,columns:this.tableColumn,name:"承运商对账"});break;case"storage":this.$router.push({path:"/finance/reconciliation/carrier/detailTable",query:{tab:"承运商对账明细",id:this.selected[0].carrierId,orgid:this.searchQuery.vo.orgid}})}this.$refs.multipleTable.clearSelection()},setTable:function(){this.setupTableVisible=!0},closeSetupTable:function(){this.setupTableVisible=!1},openAddCustomer:function(){this.AddCustomerVisible=!0},closeAddCustomer:function(){this.AddCustomerVisible=!1},clickDetails:function(e,t,i){this.$refs.multipleTable.toggleRowSelection(e)},getSelection:function(e){this.selected=e},getDbClick:function(e,t){this.$router.push({path:"/finance/reconciliation/carrier/detailTable",query:{tab:"承运商对账明细",id:e.carrierId}})},setColumn:function(e){this.tableColumn=e,this.tablekey=Math.random()}}}},nsu3:function(e,t,i){"use strict";var r={render:function(){var r=this,e=r.$createElement,a=r._self._c||e;return a("div",{directives:[{name:"loading",rawName:"v-loading",value:r.loading,expression:"loading"}],staticClass:"tab-content"},[a("SearchForm",{attrs:{orgid:r.otherinfo.orgid,issender:!0,btnsize:r.btnsize},on:{change:r.getSearchParam}}),r._v(" "),a("div",{staticClass:"tab_info"},[a("div",{staticClass:"btns_box"},[a("el-button",{directives:[{name:"has",rawName:"v-has:FINANCE_CARRIERDETAIL",arg:"FINANCE_CARRIERDETAIL"}],attrs:{type:"primary",size:r.btnsize,icon:"el-icon-document",plain:""},on:{click:function(e){r.doAction("storage")}}},[r._v("对账明细\n      ")]),r._v(" "),a("el-button",{directives:[{name:"has",rawName:"v-has:FINANCE_CARRIERPRI",arg:"FINANCE_CARRIERPRI"}],attrs:{type:"primary",size:r.btnsize,icon:"el-icon-download",plain:""},on:{click:function(e){r.doAction("export")}}},[r._v("导出\n      ")]),r._v(" "),a("el-button",{directives:[{name:"has",rawName:"v-has:FINANCE_CARRIEREXP",arg:"FINANCE_CARRIEREXP"}],attrs:{type:"primary",size:r.btnsize,icon:"el-icon-printer",plain:""},on:{click:function(e){r.doAction("print")}}},[r._v("打印\n      ")]),r._v(" "),a("el-button",{staticClass:"table_setup",attrs:{type:"primary",size:r.btnsize,icon:"el-icon-setting",plain:""},on:{click:r.setTable}},[r._v("\n        表格设置\n      ")])],1),r._v(" "),a("div",{staticClass:"info_tab"},[a("el-table",{key:r.tablekey,ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:r.usersArr,border:"",height:"100%","tooltip-effect":"dark","default-sort":{prop:"id",order:"ascending"},stripe:""},on:{"row-dblclick":r.getDbClick,"row-click":r.clickDetails,"selection-change":r.getSelection}},[a("el-table-column",{attrs:{fixed:"",sortable:"",type:"selection",width:"50"}}),r._v(" "),r._l(r.tableColumn,function(i){return[i.slot?a("el-table-column",{key:i.id,attrs:{fixed:i.fixed,sortable:"",label:i.label,width:i.width},scopedSlots:r._u([{key:"default",fn:function(t){return[i.click?a("span",{staticClass:"clickitem",domProps:{innerHTML:r._s(i.slot(t))},on:{click:function(e){e.stopPropagation(),i.click(t)}}}):a("span",{domProps:{innerHTML:r._s(i.slot(t))}})]}}])}):a("el-table-column",{key:i.id,attrs:{fixed:i.fixed,sortable:"",label:i.label,prop:i.prop,width:i.width}})]})],2)],1),r._v(" "),a("div",{staticClass:"info_tab_footer"},[r._v("共计:"+r._s(r.total)+"\n      "),a("div",{staticClass:"show_pager"},[a("Pager",{attrs:{total:r.total},on:{change:r.handlePageChange}})],1)])]),r._v(" "),a("TableSetup",{attrs:{popVisible:r.setupTableVisible,columns:r.tableColumn},on:{close:r.closeSetupTable,success:r.setColumn}})],1)},staticRenderFns:[]};t.a=r},p2e2:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=i("2Cv4"),a=i("EACm"),n=i("VU/8")(r.a,a.a,null,null,null);t.default=n.exports},wnRn:function(e,t,i){"use strict";t.b=function(e){return r.b.post("/api-finance/finance/carrierdetail/v1/carrierList",e).then(function(e){return e.data||{list:[],totalCount:0}})},t.c=function(e){return r.b.post("/api-finance/finance/tmsfinancebillcheck/v1/getCarrierDetailList",e).then(function(e){return e.data||{list:[],totalCount:0}})},t.d=function(e){return r.b.post("/api-finance/finance/carrierdetail/v1/initialize/",e).then(function(e){return e.data||{list:[],totalCount:0}})},t.e=function(e){return r.b.post("/api-finance/finance/carrierdetail/v1/saveCarrierDetail",e).then(function(e){return e.data})},t.a=function(e){return r.b.get("/api-finance/finance/carrierdetail/v1/"+e)};var r=i("Vo7i")}});