webpackJsonp([104,197,367],{"/Zv6":function(e,t,i){"use strict";var a={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"saveDialog-index"},[i("PopFrame",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"pickpopDepMain",attrs:{title:t.popTitle,isShow:t.popVisible},on:{close:t.closeMe}},[i("template",{staticClass:"pickRelationPop-content",slot:"content"},[i("div",{staticClass:"depmain-div"},[i("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:t.dialogInfo,stripe:"",border:"",height:"160","tooltip-effect":"dark","default-sort":{prop:"id",order:"ascending"}}},[i("el-table-column",{attrs:{fixed:"",sortable:"",label:"序号",width:"80"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(e.$index+1))]}}])}),t._v(" "),i("el-table-column",{attrs:{fixed:"",sortable:"",prop:"date",width:"164",label:"费用项"}}),t._v(" "),i("el-table-column",{attrs:{fixed:"",sortable:"",prop:"toPay",width:"220",label:"金额"}})],1)],1)]),t._v(" "),i("div",{staticClass:"dialog-footer-frame",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:t.closeMe}},[t._v("取 消")]),t._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:t.submitForm}},[t._v("确 定")])],1)],2)],1)},staticRenderFns:[]};t.a=a},"/n+A":function(e,t,i){"use strict";var a={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"popRight-center",class:{showPopRight:e.isShow},style:{zIndex:e.zIndex}},[i("div",{staticClass:"popRight-header"},[e._t("title",[e._v(e._s(e.title))]),e._v(" "),i("i",{staticClass:"el-icon-close",attrs:{title:"关闭"},on:{click:e.close}})],2),e._v(" "),e.shouldRender?i("div",{staticClass:"popRight-content"},[e._t("content",[e._v("内容")])],2):e._e(),e._v(" "),i("div",{staticClass:"popRight-footer"},[e._t("footer",[e._v("底部")])],2)])},staticRenderFns:[]};t.a=a},"3EPC":function(e,t,i){"use strict";var a=i("qYK6"),n=i("/n+A");var s=function(e){i("f3wf")},o=i("VU/8")(a.a,n.a,s,null,null);t.a=o.exports},"GI/0":function(e,t,i){"use strict";var a=i("woOf"),n=i.n(a),s=i("Dd8w"),o=i.n(s),r=i("OMGQ"),c=i("fGOG"),l=i("TkmW"),d=i("iMvP"),u=i("NYxO"),h=i("1onU"),f=i("UQm2");t.a={components:{SearchForm:l.default,Pager:h.a,IndexDialog:d.default},computed:o()({},Object(u.mapGetters)(["otherinfo"]),{orgid:function(){}}),mounted:function(){this.searchQuery.vo.orgid=this.$route.query.orgid},data:function(){var t=this;return{tablekey:0,btnsize:"mini",usersArr:[],total:0,trackId:"",loading:!1,setupTableVisible:!1,AddCustomerVisible:!1,isModify:!1,isDbclick:!1,selectInfo:{},selected:[],searchQuery:{currentPage:1,pageSize:100,vo:{orgid:"",checkStatus:"",arriveOrgid:"",truckIdNumber:"",startTime:"",endTime:""}},tableColumn:[{label:"序号",prop:"id",width:"100",fixed:!0,slot:function(e){return(t.searchQuery.currentPage-1)*t.searchQuery.pageSize+e.$index+1}},{label:"创建时间",prop:"createTime",width:"160",fixed:!0},{label:"对账单名称",prop:"checkBillName",width:"350",fixed:!0},{label:"开始时间",prop:"checkStartTime",width:"160",fixed:!1},{label:"结束时间",prop:"checkEndTime",width:"160",fixed:!1},{label:"对账网点",prop:"orgName",width:"160",fixed:!1},{label:"对账状态",prop:"checkStatusName",width:"120",fixed:!1},{label:"已收（应收）",prop:"receivedFee",width:"130",fixed:!1},{label:"未收（应收）",prop:"receivableFee",width:"130",fixed:!1},{label:"未付（应付）",prop:"payableFee",width:"130",fixed:!1},{label:"已付（应付）",prop:"paidFee",width:"130",fixed:!1},{label:"车牌号",prop:"truckIdNumber",width:"120",fixed:!1},{label:"对账单编号",prop:"checkBillCode",width:"120",fixed:!1},{label:"负责人",prop:"memberPerson",width:"120",fixed:!1},{label:"联系方式",prop:"memberPersonPhone",width:"120",fixed:!1},{label:"备注",prop:"remark",width:"120",fixed:!1}]}},methods:{fetchAllCustomer:function(){var t=this;return this.loading=!0,Object(r.c)(this.searchQuery).then(function(e){t.usersArr=e.list,t.total=e.total,t.loading=!1}).catch(function(e){t._handlerCatchMsg(e),t.loading=!1})},fetchData:function(){this.fetchAllCustomer()},handlePageChange:function(e){this.searchQuery.currentPage=e.pageNum,this.searchQuery.pageSize=e.pageSize,this.fetchData()},getSearchParam:function(e){this.searchQuery.currentPage=this.$options.data().searchQuery.currentPage,this.searchQuery.pageSize=this.$options.data().searchQuery.pageSize,this.searchQuery.vo=n()(this.searchQuery.vo,e),this.fetchAllCustomer()},showImport:function(){},doAction:function(e){var t=this;if(!this.selected.length&&"storage"!==e&&"print"!==e&&"export"!==e)return this.$message({message:"请选择要操作的对账单~",type:"warning"}),!1;switch(e){case"storage":this.$router.push({path:"/finance/reconciliation/group/detailTable/groupRecon",query:{tab:"网点对账-创建对账",arriveOrgid:this.$route.query.arriveOrgid,orgid:this.$route.query.orgid,orgName:this.$route.query.orgName}});break;case"modify":this.$router.push({path:"/finance/reconciliation/group/detailTable/groupRecon",query:{tab:"网点对账-修改查看",id:this.selected[0].id,arriveOrgid:this.$route.query.arriveOrgid,orgid:this.$route.query.orgid,orgName:this.$route.query.orgName}});break;case"completion":if(1<this.selected.length)return this.$message({message:"只能选择一条数据进行跟踪设置~",type:"warning"}),!1;0===this.selected[0].checkStatus?(this.openAddCustomer(),this.selectInfo=this.selected[0]):this.$message({type:"info",message:"该对账单已经完成对账~"});break;case"cancelCom":if(this.closeAddCustomer(),1<this.selected.length)return this.$message({message:"只能选择一条数据进行跟踪设置~",type:"warning"}),!1;if(1===this.selected[0].checkStatus){var i={id:"",checkStatus:0};i.id=this.selected[0].id,Object(c.i)(i).then(function(e){t.loading=!1,t.$message({type:"success",message:"保存成功~"}),t.fetchData()}).catch(function(e){t._handlerCatchMsg(e),t.loading=!1})}else this.$message({type:"info",message:"该对账单还没对账~"});break;case"detele":if(this.closeAddCustomer(),1<this.selected.length)return this.$message({message:"只能选择一条数据进行跟踪设置~",type:"warning"}),!1;if(0===this.selected[0].checkStatus){var a=this.selected[0].id;Object(c.a)(a).then(function(e){t.loading=!1,t.$message({type:"success",message:"保存成功~"}),t.fetchData()}).catch(function(e){t._handlerCatchMsg(e),t.loading=!1})}else this.$message({type:"info",message:"该对账单已完成对账不可以删除~"});break;case"export":this.closeAddCustomer(),Object(f.g)({data:this.selected.length?this.selected:this.usersArr,columns:this.tableColumn,name:"网点对账全部明细"});break;case"print":this.closeAddCustomer(),Object(f.d)({data:this.selected.length?this.selected:this.usersArr,columns:this.tableColumn,name:"网点对账全部明细"});break;case"export":Object(f.g)({data:this.selected.length?this.selected:this.usersArr,columns:this.tableColumn})}this.$refs.multipleTable.clearSelection()},setTable:function(){this.setupTableVisible=!0},closeSetupTable:function(){this.setupTableVisible=!1},openAddCustomer:function(){this.AddCustomerVisible=!0},closeAddCustomer:function(){this.AddCustomerVisible=!1},clickDetails:function(e,t,i){this.$refs.multipleTable.toggleRowSelection(e)},getSelection:function(e){this.selected=e},getDbClick:function(e,t){this.$router.push({path:"/finance/reconciliation/group/detailTable/groupRecon",query:{tab:"网点对账-修改查看",id:e.id,arriveOrgid:this.$route.query.arriveOrgid,orgid:this.$route.query.orgid,orgName:this.$route.query.orgName}})},setColumn:function(e){this.tableColumn=e,this.tablekey=Math.random()}}}},LRqz:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=i("GI/0"),n=i("PCKM"),s=i("VU/8")(a.a,n.a,null,null,null);t.default=s.exports},MDhp:function(e,t,i){"use strict";i("E4LH");var a=i("3EPC"),n=i("pAQG"),s=i("fGOG");i("0xDb");t.a={components:{PopFrame:a.a,querySelect:n.a},props:{popVisible:{type:Boolean,default:!1},isDepMain:{type:Boolean,default:!1},dotInfo:{type:[Object,Array,Boolean],default:!1},sendId:[Number,String]},data:function(){return{selected:[],formLabelWidth:"90",dialogInfo:[{toPay:10,date:"已收（应收账款）"},{toPay:20,date:"未收（应收账款）"},{toPay:10,date:"已付（应付账款）"},{toPay:20,date:"未付（应付账款）"}],dialogData:{},checked1:!0,popTitle:"",totaMoney:"",loading:!1,formInline:{shipSn:"",shipGoodsSn:"",pickupFee:""}}},computed:{isShow:{get:function(){return this.popVisible},set:function(){}}},watch:{dotInfo:function(e){this.dialogInfo[0].toPay=0,this.dialogInfo[1].toPay=0,this.dialogInfo[2].toPay=0,this.dialogInfo[3].toPay=0,this.dialogInfo[1].toPay=this.dotInfo.receivableFee,this.dialogInfo[0].toPay=this.dotInfo.receivedFee,this.dialogInfo[3].toPay=this.dotInfo.payableFee,this.dialogInfo[2].toPay=this.dotInfo.paidFee,this.popTitle=this.dotInfo.checkBillName},popVisible:function(e){},sendId:function(e){}},mounted:function(){this.popVisible},methods:{closeMe:function(e){this.reset(),this.$emit("update:popVisible",!1),"function"==typeof e&&e()},reset:function(){},submitForm:function(e){var t=this,i={id:"",checkStatus:1};i.id=this.dotInfo.id,Object(s.i)(i).then(function(e){t.loading=!1,t.$message({type:"success",message:"该对账单已经完成对账~"}),t.$emit("success"),t.closeMe()}).catch(function(e){t.loading=!1,t._handlerCatchMsg(e)})}}}},OMGQ:function(e,t,i){"use strict";t.e=function(e){return a.b.post("/api-finance/finance/orgdetail/v1/list",e).then(function(e){return e.data||{list:[],totalCount:0}})},t.c=function(e){return a.b.post("/api-finance/finance/tmsfinancebillcheck/v1/getOrgDetailList",e).then(function(e){return e.data||{list:[],totalCount:0}})},t.d=function(e){return a.b.post("/api-finance/finance/orgdetail/v1/initialize/",e).then(function(e){return e.data||{list:[],totalCount:0}})},t.b=function(e){return a.b.post("/api-finance/finance/orgdetail/v1/saveOrgDetail",e).then(function(e){return e.data})},t.a=function(e){return a.b.get("/api-finance/finance/orgdetail/v1/"+e)};var a=i("Vo7i")},PCKM:function(e,t,i){"use strict";var a={render:function(){var a=this,e=a.$createElement,n=a._self._c||e;return n("div",{directives:[{name:"loading",rawName:"v-loading",value:a.loading,expression:"loading"}],staticClass:"tab-content"},[n("SearchForm",{attrs:{orgid:a.searchQuery.vo.orgid,issender:!0,btnsize:a.btnsize},on:{change:a.getSearchParam}}),a._v(" "),n("div",{staticClass:"tab_info"},[n("div",{staticClass:"btns_box"},[n("el-button",{attrs:{type:"primary",size:a.btnsize,icon:"el-icon-plus",plain:""},on:{click:function(e){a.doAction("storage")}}},[a._v("创建对账单\n      ")]),a._v(" "),n("el-button",{attrs:{type:"success",size:a.btnsize,icon:"el-icon-tickets",plain:""},on:{click:function(e){a.doAction("completion")}}},[a._v("对账完成\n      ")]),a._v(" "),n("el-button",{attrs:{type:"info",size:a.btnsize,icon:"el-icon-error",plain:""},on:{click:function(e){a.doAction("cancelCom")}}},[a._v("取消完成\n      ")]),a._v(" "),n("el-button",{attrs:{type:"primary",size:a.btnsize,icon:"el-icon-edit",plain:""},on:{click:function(e){a.doAction("modify")}}},[a._v("修改查看")]),a._v(" "),n("el-button",{attrs:{type:"danger",size:a.btnsize,icon:"el-icon-delete",plain:""},on:{click:function(e){a.doAction("detele")}}},[a._v("删除")]),a._v(" "),n("el-button",{attrs:{type:"primary",size:a.btnsize,icon:"el-icon-download",plain:""},on:{click:function(e){a.doAction("export")}}},[a._v("导出\n      ")]),a._v(" "),n("el-button",{attrs:{type:"primary",size:a.btnsize,icon:"el-icon-printer",plain:""},on:{click:function(e){a.doAction("print")}}},[a._v("打印")]),a._v(" "),n("el-button",{staticClass:"table_setup",attrs:{type:"primary",size:a.btnsize,icon:"el-icon-setting",plain:""},on:{click:a.setTable}},[a._v("\n        表格设置\n      ")])],1),a._v(" "),n("div",{staticClass:"info_tab"},[n("el-table",{key:a.tablekey,ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:a.usersArr,border:"",height:"100%","tooltip-effect":"dark","default-sort":{prop:"id",order:"ascending"},stripe:""},on:{"row-dblclick":a.getDbClick,"row-click":a.clickDetails,"selection-change":a.getSelection}},[n("el-table-column",{attrs:{fixed:"",sortable:"",type:"selection",width:"50"}}),a._v(" "),a._l(a.tableColumn,function(i){return[i.slot?n("el-table-column",{key:i.id,attrs:{fixed:i.fixed,sortable:"",label:i.label,width:i.width},scopedSlots:a._u([{key:"default",fn:function(t){return[i.click?n("span",{staticClass:"clickitem",domProps:{innerHTML:a._s(i.slot(t))},on:{click:function(e){e.stopPropagation(),i.click(t)}}}):n("span",{domProps:{innerHTML:a._s(i.slot(t))}})]}}])}):n("el-table-column",{key:i.id,attrs:{fixed:i.fixed,sortable:"",label:i.label,prop:i.prop,width:i.width}})]})],2)],1),a._v(" "),n("div",{staticClass:"info_tab_footer"},[a._v("共计:"+a._s(a.total)+"\n      "),n("div",{staticClass:"show_pager"},[n("Pager",{attrs:{total:a.total},on:{change:a.handlePageChange}})],1)])]),a._v(" "),n("IndexDialog",{attrs:{issender:!0,isModify:a.isModify,isDbclick:a.isDbclick,dotInfo:a.selectInfo,orgid:a.orgid,id:a.trackId,popVisible:a.AddCustomerVisible},on:{"update:popVisible":function(e){a.AddCustomerVisible=e},close:a.closeAddCustomer,success:a.fetchData}}),a._v(" "),n("TableSetup",{attrs:{popVisible:a.setupTableVisible,columns:a.tableColumn},on:{close:a.closeSetupTable,success:a.setColumn}})],1)},staticRenderFns:[]};t.a=a},TkmW:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=i("mUIH"),n=i("qiSl"),s=i("VU/8")(a.a,n.a,null,null,null);t.default=s.exports},f3wf:function(e,t){},fGOG:function(e,t,i){"use strict";t.g=function(e){return a.b.post("/api-finance/finance/tmsfinancebillcheck/v1/carFeePagelist/",e).then(function(e){return e.data||{list:[],totalCount:0}})},t.c=function(e){return a.b.post("/api-finance/finance/tmsfinancebillcheck/v1/getBillCheckCarBaseInfo/",e).then(function(e){return e.data})},t.d=function(e){return a.b.post("/api-finance/finance/tmsfinancebillcheckcardetail/v1/getBillCheckCarInitList",e).then(function(e){return e.data})},t.h=function(e){return a.b.post("/api-finance/finance/tmsfinancebillcheck/v1/createBillCheckCarInfo",e).then(function(e){return e.data})},t.f=function(e){return a.b.get("/api-finance/finance/tmsfinancebillcheck/v1/getDtoById/"+e)},t.e=function(e){return a.b.post("/api-finance/finance/tmsfinancebillcheckcardetail/v1/getBillCheckCarUpdateList",e).then(function(e){return e.data})},t.a=function(e){return a.b.delete("/api-finance/finance/tmsfinancebillcheck/v1/"+e)},t.i=function(e){return a.b.post("/api-finance/finance/tmsfinancebillcheck/v1/updateBillCheckSelective",e)},t.b=function(){return a.b.get("/api-order/order/load/v1/getLoadTruck")};var a=i("Vo7i")},iMvP:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=i("MDhp"),n=i("/Zv6");var s=function(e){i("wrjT")},o=i("VU/8")(a.a,n.a,s,null,null);t.default=o.exports},mUIH:function(e,t,i){"use strict";var a=i("o9X6"),n=i("9UCZ"),s=(i("E4LH"),i("0xDb"));t.a={components:{SelectTree:a.a,SelectType:n.a},props:{btnsize:{type:String,default:"mini"},orgid:{type:[Number,String]},issender:{type:Boolean,dafault:!1}},computed:{title:function(){}},data:function(){var t=this;return{searchCreatTime:[],defaultTime:[Object(s.parseTime)(+new Date-5184e6,"{y}-{m}-{d}"),Object(s.parseTime)(new Date,"{y}-{m}-{d}")],pickOption:{firstDayOfWeek:1,disabledDate:function(e){return!!t.form.tmsOrderPickup.arriveTime&&e.getTime()>t.form.tmsOrderPickup.arriveTime}},pickOption2:{firstDayOfWeek:1,disabledDate:function(e){return!!t.form.tmsOrderPickup.outTime&&e.getTime()<t.form.tmsOrderPickup.outTime}},searchForm:{orgid:"",checkStatus:"",arriveOrgid:"",truckIdNumber:"",startTime:"",endTime:""},rules:{},pickerOptions2:{shortcuts:s.pickerOptions2}}},watch:{orgid:function(e){this.searchForm.orgid=e}},mounted:function(){this.searchForm.orgid=this.orgid,this.searchForm.arriveOrgid=this.$route.query.arriveOrgid,this.searchCreatTime=this.defaultTime,this.onSubmit()},methods:{onSubmit:function(){this.searchForm.startTime=this.searchCreatTime?Object(s.parseTime)(this.searchCreatTime[0],"{y}-{m}-{d} ")+"00:00:00":"",this.searchForm.endTime=this.searchCreatTime?Object(s.parseTime)(this.searchCreatTime[1],"{y}-{m}-{d} ")+"23:59:59":"",this.$emit("change",this.searchForm)},clearForm:function(){this.searchForm.orgid=this.orgid,this.searchForm.checkStatus="",this.searchForm.truckIdNumber="",this.searchForm.arriveOrgid="",this.searchForm.startTime="",this.searchForm.endTime="",this.searchCreatTime=this.defaultTime}}}},qYK6:function(e,t,i){"use strict";t.a={props:{width:{type:String,default:"400"},title:{type:String,default:"标题"},isShow:{type:Boolean,default:!1}},watch:{isShow:{handler:function(){this.isShow&&(this.shouldRender=!0)},immediate:!0}},data:function(){return{zIndex:(window.tmsPopZindex?window.tmsPopZindex+=1:window.tmsPopZindex=1e3,window.tmsPopZindex),shouldRender:!1}},methods:{close:function(){this.$emit("close")}}}},qiSl:function(e,t,i){"use strict";var a={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-form",{staticClass:"staff_searchinfo clearfix",attrs:{inline:!0,size:t.btnsize,"label-position":"right",rules:t.rules,model:t.searchForm,"label-width":"70px"}},[i("div",{staticClass:"staff_searchinfo--input"},[i("el-form-item",{attrs:{label:"创建时间"}},[i("el-date-picker",{attrs:{"default-value":t.defaultTime,type:"daterange","unlink-panels":"",align:"right","value-format":"yyyy-MM-dd","start-placeholder":"开始日期","picker-options":t.pickerOptions2,"end-placeholder":"结束日期"},model:{value:t.searchCreatTime,callback:function(e){t.searchCreatTime=e},expression:"searchCreatTime"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"对账网点"}},[i("el-input",{staticClass:"input-disabled",attrs:{disabled:""},model:{value:t.$route.query.orgName,callback:function(e){t.$set(t.$route.query,"orgName",e)},expression:"$route.query.orgName"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"对账状态\n"}},[i("el-select",{model:{value:t.searchForm.checkStatus,callback:function(e){t.$set(t.searchForm,"checkStatus",e)},expression:"searchForm.checkStatus"}},[i("el-option",{attrs:{label:"未对账",value:0}}),t._v(" "),i("el-option",{attrs:{label:"已对账",value:1}}),t._v(" "),i("el-option",{attrs:{label:"全部",value:""}})],1)],1),t._v(" "),i("el-form-item",{attrs:{label:"车牌号"}},[i("el-input",{attrs:{clearable:""},model:{value:t.searchForm.truckIdNumber,callback:function(e){t.$set(t.searchForm,"truckIdNumber",e)},expression:"searchForm.truckIdNumber"}})],1)],1),t._v(" "),i("el-form-item",{staticClass:"staff_searchinfo--btn art_marginTop"},[i("el-button",{attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v("查询")]),t._v(" "),i("el-button",{attrs:{type:"info",plain:""},on:{click:t.clearForm}},[t._v("清空")])],1)],1)},staticRenderFns:[]};t.a=a},wrjT:function(e,t){}});