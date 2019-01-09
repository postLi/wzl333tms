webpackJsonp([182,243,354],{"6m/D":function(e,t,i){"use strict";var a={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-form",{staticClass:"staff_searchinfo clearfix",attrs:{inline:!0,size:t.btnsize,"label-position":"right",rules:t.rules,model:t.searchForm,"label-width":"80px"}},[i("div",{staticClass:"staff_searchinfo--input"},[i("el-form-item",{attrs:{label:"开单时间"}},[i("el-date-picker",{attrs:{"default-value":t.defaultTime,type:"daterange",align:"right","value-format":"yyyy-MM-dd","start-placeholder":"开始日期","picker-options":t.pickerOptions2,"end-placeholder":"结束日期"},model:{value:t.searchCreatTime,callback:function(e){t.searchCreatTime=e},expression:"searchCreatTime"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"开单网点"}},[i("SelectTree",{attrs:{orgid:t.otherinfo.orgid},model:{value:t.searchForm.orgid,callback:function(e){t.$set(t.searchForm,"orgid",e)},expression:"searchForm.orgid"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"发货人"}},[i("el-input",{attrs:{maxlength:"15",clearable:""},model:{value:t.searchForm.customerName,callback:function(e){t.$set(t.searchForm,"customerName",e)},expression:"searchForm.customerName"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"发货人电话"}},[i("el-input",{directives:[{name:"numberOnly",rawName:"v-numberOnly"}],attrs:{maxlength:"11",clearable:""},model:{value:t.searchForm.customerMobile,callback:function(e){t.$set(t.searchForm,"customerMobile",e)},expression:"searchForm.customerMobile"}})],1)],1),t._v(" "),i("el-form-item",{staticClass:"staff_searchinfo--btn art_marginTop"},[i("el-button",{attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v("查询")]),t._v(" "),i("el-button",{attrs:{type:"info",plain:""},on:{click:t.clearForm}},[t._v("清空")])],1)],1)},staticRenderFns:[]};t.a=a},LbqO:function(e,t,i){"use strict";var a={render:function(){var a=this,e=a.$createElement,r=a._self._c||e;return r("div",{directives:[{name:"loading",rawName:"v-loading",value:a.loading,expression:"loading"}],staticClass:"tab-content"},[r("SearchForm",{attrs:{orgid:a.otherinfo.orgid,issender:!0,btnsize:a.btnsize},on:{change:a.getSearchParam}}),a._v(" "),r("div",{staticClass:"tab_info"},[r("div",{staticClass:"btns_box"},[r("el-button",{directives:[{name:"has",rawName:"v-has:FINANCE_CUSTOMERDETAIL",arg:"FINANCE_CUSTOMERDETAIL"}],attrs:{type:"primary",size:a.btnsize,icon:"el-icon-document",plain:""},on:{click:function(e){a.doAction("storage")}}},[a._v("对账明细")]),a._v(" "),r("el-button",{directives:[{name:"has",rawName:"v-has:FINANCE_CUSTOMERPRI",arg:"FINANCE_CUSTOMERPRI"}],attrs:{type:"primary",size:a.btnsize,icon:"el-icon-download",plain:""},on:{click:function(e){a.doAction("export")}}},[a._v("导出")]),a._v(" "),r("el-button",{directives:[{name:"has",rawName:"v-has:FINANCE_CARRIEREXP",arg:"FINANCE_CARRIEREXP"}],attrs:{type:"primary",size:a.btnsize,icon:"el-icon-printer",plain:""},on:{click:function(e){a.doAction("print")}}},[a._v("打印")]),a._v(" "),r("el-button",{staticClass:"table_setup",attrs:{type:"primary",size:a.btnsize,icon:"el-icon-setting",plain:""},on:{click:a.setTable}},[a._v("表格设置")])],1),a._v(" "),r("div",{staticClass:"info_tab"},[r("el-table",{key:a.tablekey,ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:a.usersArr,border:"",height:"100%","tooltip-effect":"dark","default-sort":{prop:"id",order:"ascending"},stripe:""},on:{"row-dblclick":a.getDbClick,"row-click":a.clickDetails,"selection-change":a.getSelection}},[r("el-table-column",{attrs:{fixed:"",sortable:"",type:"selection",width:"50"}}),a._v(" "),a._l(a.tableColumn,function(i){return[i.slot?r("el-table-column",{key:i.id,attrs:{fixed:i.fixed,sortable:"",label:i.label,width:i.width},scopedSlots:a._u([{key:"default",fn:function(t){return[i.click?r("span",{staticClass:"clickitem",domProps:{innerHTML:a._s(i.slot(t))},on:{click:function(e){e.stopPropagation(),i.click(t)}}}):r("span",{domProps:{innerHTML:a._s(i.slot(t))}})]}}])}):r("el-table-column",{key:i.id,attrs:{fixed:i.fixed,sortable:"",label:i.label,prop:i.prop,width:i.width}})]})],2)],1),a._v(" "),r("div",{staticClass:"info_tab_footer"},[a._v("共计:"+a._s(a.total)+" "),r("div",{staticClass:"show_pager"},[r("Pager",{attrs:{total:a.total},on:{change:a.handlePageChange}})],1)])]),a._v(" "),r("TableSetup",{attrs:{popVisible:a.setupTableVisible,columns:a.tableColumn},on:{close:a.closeSetupTable,success:a.setColumn}})],1)},staticRenderFns:[]};t.a=a},NOUF:function(e,t,i){"use strict";var a=i("woOf"),r=i.n(a),s=i("Dd8w"),n=i.n(s),o=(i("Vi15"),i("fpk6")),c=i("W/i2"),l=i("puNT"),u=i("NYxO"),m=i("1onU"),d=i("UQm2");t.a={components:{SearchForm:c.default,Pager:m.a,TableSetup:l.a},computed:n()({},Object(u.mapGetters)(["otherinfo"]),{orgid:function(){}}),mounted:function(){},data:function(){var t=this;return{tablekey:0,btnsize:"mini",usersArr:[],total:0,trackId:"",batchTypeId:"",loading:!0,setupTableVisible:!1,AddCustomerVisible:!1,isModify:!1,isDbclick:!1,selectInfo:{},selected:[],searchQuery:{currentPage:1,pageSize:100,vo:{orgid:"",customerName:"",customerMobile:"",startTime:"",endTime:""}},tableColumn:[{label:"序号",prop:"id",width:"120",fixed:!0,slot:function(e){return(t.searchQuery.currentPage-1)*t.searchQuery.pageSize+e.$index+1}},{label:"网点",prop:"orgName",width:"150",fixed:!0},{label:"发货方",prop:"customerUnit",width:"200",fixed:!0},{label:"发货人",prop:"customerName",fixed:!1},{label:"客户电话",prop:"customerMobile",width:"150",fixed:!1},{label:"对账合计",prop:"totalFee",width:"150",fixed:!1},{label:"应收账款",prop:"receivableFee",width:"150",fixed:!1},{label:"应付账款",prop:"payableFee",width:"150",fixed:!1},{label:"总单数",prop:"totalCount",width:"150",fixed:!1}]}},methods:{fetchAllCustomer:function(){var t=this;return this.loading=!0,Object(o.e)(this.searchQuery).then(function(e){t.usersArr=e.list,t.total=e.total,t.loading=!1}).catch(function(e){t._handlerCatchMsg(e)})},fetchData:function(){this.fetchAllCustomer()},handlePageChange:function(e){this.searchQuery.currentPage=e.pageNum,this.searchQuery.pageSize=e.pageSize,this.fetchData()},getSearchParam:function(e){this.searchQuery.currentPage=this.$options.data().searchQuery.currentPage,this.searchQuery.pageSize=this.$options.data().searchQuery.pageSize,this.searchQuery.vo=r()(this.searchQuery.vo,e),this.fetchAllCustomer()},showImport:function(){},doAction:function(e){if(!this.selected.length&&"print"!==e&&"export"!==e)return this.$message({message:"请选择要操作的项~",type:"warning"}),!1;switch(e){case"storage":this.$router.push({path:"/finance/reconciliation/customer/detailTable",query:{tab:"客户对账明细",id:this.selected[0].shipSenderId,orgid:this.searchQuery.vo.orgid}});break;case"print":Object(d.d)({data:this.usersArr,columns:this.tableColumn,name:"客户对账"});break;case"export":Object(d.g)({data:this.usersArr,columns:this.tableColumn,name:"客户对账"})}this.$refs.multipleTable.clearSelection()},setTable:function(){this.setupTableVisible=!0},closeSetupTable:function(){this.setupTableVisible=!1},openAddCustomer:function(){this.AddCustomerVisible=!0},closeAddCustomer:function(){this.AddCustomerVisible=!1},clickDetails:function(e,t,i){this.$refs.multipleTable.toggleRowSelection(e)},getSelection:function(e){this.selected=e},getDbClick:function(e,t){this.$router.push({path:"/finance/reconciliation/customer/detailTable",query:{tab:"客户对账明细",id:e.shipSenderId}})},setColumn:function(e){this.tableColumn=e,this.tablekey=Math.random()}}}},OoFq:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=i("s7XG"),r=i("uj2W"),s=i("VU/8")(a.a,r.a,null,null,null);t.default=s.exports},"W/i2":function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=i("ZLvg"),r=i("6m/D"),s=i("VU/8")(a.a,r.a,null,null,null);t.default=s.exports},ZLvg:function(e,t,i){"use strict";var a=i("o9X6"),r=i("9UCZ"),s=i("E4LH"),n=i("0xDb");t.a={components:{SelectTree:a.a,SelectType:r.a},props:{btnsize:{type:String,default:"mini"},orgid:{type:[Number,String]},issender:{type:Boolean,dafault:!1}},computed:{title:function(){}},data:function(){var t=this;return{rules:{customerMobile:[{validator:function(e,t,i){s.a.ONLY_NUMBER.test(t)?i():i(new Error("只能输入数字"))},trigger:"blur"}]},searchCreatTime:[],defaultTime:[Object(n.parseTime)(+new Date-5184e6,"{y}-{m}-{d}"),Object(n.parseTime)(new Date,"{y}-{m}-{d}")],pickOption:{firstDayOfWeek:1,disabledDate:function(e){return!!t.form.tmsOrderPickup.arriveTime&&e.getTime()>t.form.tmsOrderPickup.arriveTime}},pickOption2:{firstDayOfWeek:1,disabledDate:function(e){return!!t.form.tmsOrderPickup.outTime&&e.getTime()<t.form.tmsOrderPickup.outTime}},searchForm:{orgid:"",customerName:"",customerMobile:"",startTime:"",endTime:""},pickerOptions2:{shortcuts:n.pickerOptions2}}},watch:{},mounted:function(){this.searchForm.orgid=this.orgid,this.searchCreatTime=this.defaultTime,this.onSubmit()},methods:{onSubmit:function(){this.searchForm.startTime=this.searchCreatTime?Object(n.parseTime)(this.searchCreatTime[0],"{y}-{m}-{d} ")+"00:00:00":"",this.searchForm.endTime=this.searchCreatTime?Object(n.parseTime)(this.searchCreatTime[1],"{y}-{m}-{d} ")+"23:59:59":"",this.$emit("change",this.searchForm)},clearForm:function(){this.searchForm=this.$options.data().searchForm,this.searchForm.orgid=this.orgid,this.searchForm.customerName="",this.searchForm.customerMobile="",this.searchForm.startTime="",this.searchForm.endTime="",this.searchCreatTime=this.defaultTime,console.log(this.searchForm,this.orgid)}}}},fpk6:function(e,t,i){"use strict";t.e=function(e){return a.b.post("/api-finance/finance/customerdetail/v1/",e).then(function(e){return e.data||{list:[],totalCount:0}})},t.b=function(e){return a.b.post("/api-finance/finance/tmsfinancebillcheck/v1/getCustomerDetailList/",e).then(function(e){return e.data||{list:[],totalCount:0}})},t.c=function(e){return a.b.post("/api-finance/finance/customerdetail/v1/initialize/",e).then(function(e){return e.data||{list:[],totalCount:0}})},t.d=function(e){return a.b.post("/api-finance/finance/customerdetail/v1/saveCustomerDetail/",e).then(function(e){return e.data})},t.a=function(e){return a.b.get("/api-finance/finance/customerdetail/v1/"+e).then(function(e){return e.data})};var a=i("Vo7i")},jwIM:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=i("NOUF"),r=i("LbqO"),s=i("VU/8")(a.a,r.a,null,null,null);t.default=s.exports},s7XG:function(e,t,i){"use strict";var a=i("jwIM");t.a={components:{Sender:a.default},props:{isShow:{type:Boolean,default:!1}},data:function(){return{component:"Sender"}}}},uj2W:function(e,t,i){"use strict";var a={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"customer-manager tab-wrapper tab-wrapper-100"},[t("keep-alive",[t(this.component,{tag:"component"})],1)],1)},staticRenderFns:[]};t.a=a}});