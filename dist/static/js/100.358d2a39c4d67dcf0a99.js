webpackJsonp([100,210,354],{"/n+A":function(e,t,i){"use strict";var a={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"popRight-center",class:{showPopRight:e.isShow},style:{zIndex:e.zIndex}},[i("div",{staticClass:"popRight-header"},[e._t("title",[e._v(e._s(e.title))]),e._v(" "),i("i",{staticClass:"el-icon-close",attrs:{title:"关闭"},on:{click:e.close}})],2),e._v(" "),e.shouldRender?i("div",{staticClass:"popRight-content"},[e._t("content",[e._v("内容")])],2):e._e(),e._v(" "),i("div",{staticClass:"popRight-footer"},[e._t("footer",[e._v("底部")])],2)])},staticRenderFns:[]};t.a=a},"2H+U":function(e,t,i){"use strict";var a=i("woOf"),n=i.n(a),o=i("Dd8w"),s=i.n(o),r=(i("Vi15"),i("fpk6")),c=i("fGOG"),l=i("QtuL"),d=i("puNT"),u=i("uR+I"),h=i("NYxO"),f=i("1onU"),p=i("UQm2");t.a={components:{SearchForm:l.default,Pager:f.a,TableSetup:d.a,IndexDialog:u.default},computed:s()({},Object(h.b)(["otherinfo"]),{orgid:function(){}}),mounted:function(){this.currentOrgid=this.$route.query.orgid,this.searchQuery.vo.memberId=this.$route.query.id},data:function(){var t=this;return{tablekey:0,btnsize:"mini",usersArr:[],total:0,trackId:"",batchTypeId:"",loading:!1,setupTableVisible:!1,AddCustomerVisible:!1,isModify:!1,isDbclick:!1,selectInfo:{},selected:[],searchQuery:{currentPage:1,pageSize:100,vo:{orgId:"",memberId:"",memberIdType:2,checkStatus:"",startTime:"",endTime:""}},currentOrgid:"",tableColumn:[{label:"序号",prop:"id",width:"70",fixed:!0,slot:function(e){return(t.searchQuery.currentPage-1)*t.searchQuery.pageSize+e.$index+1}},{label:"发货方",prop:"memberName",width:"130",fixed:!0},{label:"发货人",prop:"memberPerson",width:"130",fixed:!0},{label:"对账状态",prop:"checkStatusName",width:"120",fixed:!1},{label:"创建时间",prop:"createTime",width:"160",fixed:!1},{label:"对账单名",prop:"checkBillName",width:"320",fixed:!1},{label:"对账编号",prop:"checkBillCode",width:"140",fixed:!1},{label:"对账开始时间",prop:"checkStartTime",width:"150",fixed:!1},{label:"对账结束时间",prop:"checkEndTime",width:"150",fixed:!1},{label:"应收应付对账合计",prop:"totalCountFee",width:"160",fixed:!1},{label:"未收账款",prop:"receivableFee",width:"120",fixed:!1},{label:"未付账款",prop:"payableFee",width:"120",fixed:!1},{label:"已收账款",prop:"receivedFee",width:"120",fixed:!1},{label:"已付账款",prop:"paidFee",width:"120",fixed:!1},{label:"创建人",prop:"createBy",width:"120",fixed:!1},{label:"总单数",prop:"totalCount",width:"120",fixed:!1},{label:"备注",prop:"remark",width:"120",fixed:!1},{label:"业务负责人",prop:"memberPerson",width:"120",fixed:!1},{label:"业务负责人电话",prop:"memberPersonPhone",width:"140",fixed:!1},{label:"核销方式",prop:"settlementType",width:"120",fixed:!1},{label:"账户账号",prop:"bankAccount",width:"130",fixed:!1},{label:"账户开户行",prop:"bankName",width:"150",fixed:!1},{label:"财务负责人",prop:"financialOfficer",width:"130",fixed:!1},{label:"财务负责人电话",prop:"financialOfficerPhone",width:"130",fixed:!1},{label:"支付宝",prop:"alipayAccount",width:"130",fixed:!1},{label:"微信",prop:"wechatAccount",width:"130",fixed:!1}]}},methods:{fetchAllCustomer:function(){var t=this;return this.loading=!0,Object(r.b)(this.searchQuery).then(function(e){t.usersArr=e.list,t.total=e.total,t.loading=!1}).catch(function(e){t._handlerCatchMsg(e),t.loading=!1})},fetchData:function(){this.fetchAllCustomer()},handlePageChange:function(e){this.searchQuery.currentPage=e.pageNum,this.searchQuery.pageSize=e.pageSize,this.fetchData()},getSearchParam:function(e){this.searchQuery.currentPage=this.$options.data().searchQuery.currentPage,this.searchQuery.pageSize=this.$options.data().searchQuery.pageSize,this.searchQuery.vo=n()(this.searchQuery.vo,e),this.fetchAllCustomer()},showImport:function(){},doAction:function(e){var t=this;if(!this.selected.length&&"storage"!==e&&"export"!==e&&"print"!==e)return this.$message({message:"请选择要操作的对账单~",type:"warning"}),!1;switch(e){case"storage":this.$router.push({path:"/finance/reconciliation/customer/detailTable/customerRecon",query:{tab:"客户对账-创建对账",id:this.$route.query.id}});break;case"modify":this.$router.push({path:"/finance/reconciliation/customer/detailTable/customerRecon",query:{tab:"客户对账-修改查看",id:this.selected[0].id,urlId:this.$route.query.id}});break;case"completion":if(1<this.selected.length)return this.$message({message:"只能选择一条数据进行跟踪设置~",type:"warning"}),!1;0===this.selected[0].checkStatus?(this.openAddCustomer(),this.selectInfo=this.selected[0]):this.$message({type:"info",message:"该对账单已经完成对账~"});break;case"cancelCom":if(this.closeAddCustomer(),1<this.selected.length)return this.$message({message:"只能选择一条数据进行跟踪设置~",type:"warning"}),!1;if(1!==this.selected[0].checkStatus)return this.$message({type:"info",message:"该对账单还没对账~"}),this.$refs.multipleTable.clearSelection(),!1;var i={id:"",checkStatus:0};i.id=this.selected[0].id,this.loading=!0,Object(c.i)(i).then(function(e){t.$message({type:"success",message:"已取消对账~"}),t.fetchData(),t.loading=!1}).catch(function(e){t._handlerCatchMsg(e),t.loading=!1});break;case"detele":if(this.closeAddCustomer(),1<this.selected.length)return this.$message({message:"只能选择一条数据进行跟踪设置~",type:"warning"}),!1;if(this.loading=!0,0!==this.selected[0].checkStatus)return this.$message({type:"info",message:"该对账单已完成对账不可以删除~"}),this.loading=!1,this.$refs.multipleTable.clearSelection(),!1;var a=this.selected[0].id;Object(c.a)(a).then(function(e){t.loading=!1,t.$message({type:"success",message:"删除成功~"}),t.fetchData()}).catch(function(e){t._handlerCatchMsg(e),t.loading=!1});break;case"print":Object(p.d)({data:this.usersArr,columns:this.tableColumn,name:"全部对账单"});break;case"export":Object(p.g)({data:this.usersArr,columns:this.tableColumn,name:"全部对账单"})}this.$refs.multipleTable.clearSelection()},setTable:function(){this.setupTableVisible=!0},closeSetupTable:function(){this.setupTableVisible=!1},openAddCustomer:function(){this.AddCustomerVisible=!0},closeAddCustomer:function(){this.AddCustomerVisible=!1},clickDetails:function(e,t,i){this.$refs.multipleTable.toggleRowSelection(e)},getSelection:function(e){this.selected=e},getDbClick:function(e,t){this.$router.push({path:"/finance/reconciliation/customer/detailTable/customerRecon",query:{tab:"客户对账-修改查看",id:e.id,urlId:this.$route.query.id}})},setColumn:function(e){this.tableColumn=e,this.tablekey=Math.random()}}}},"3EPC":function(e,t,i){"use strict";var a=i("qYK6"),n=i("/n+A");var o=function(e){i("f3wf")},s=i("VU/8")(a.a,n.a,o,null,null);t.a=s.exports},"4Wso":function(e,t){},"BU+S":function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=i("2H+U"),n=i("jBlx"),o=i("VU/8")(a.a,n.a,null,null,null);t.default=o.exports},BnG3:function(e,t,i){"use strict";var a=i("o9X6"),n=i("9UCZ"),o=(i("E4LH"),i("0xDb"));t.a={components:{SelectTree:a.a,SelectType:n.a},props:{btnsize:{type:String,default:"mini"},orgid:{type:[Number,String]},issender:{type:Boolean,dafault:!1}},computed:{title:function(){}},data:function(){var t=this;return{searchCreatTime:[],defaultTime:[Object(o.parseTime)(+new Date-5184e6,"{y}-{m}-{d}"),Object(o.parseTime)(new Date,"{y}-{m}-{d}")],pickOption:{firstDayOfWeek:1,disabledDate:function(e){return!!t.form.tmsOrderPickup.arriveTime&&e.getTime()>t.form.tmsOrderPickup.arriveTime}},pickOption2:{firstDayOfWeek:1,disabledDate:function(e){return!!t.form.tmsOrderPickup.outTime&&e.getTime()<t.form.tmsOrderPickup.outTime}},searchForm:{orgId:"",checkStatus:"",startTime:"",endTime:""},rules:{},pickerOptions2:{shortcuts:o.pickerOptions2}}},watch:{orgid:function(e){this.searchForm.orgId=e}},mounted:function(){this.searchForm.orgId=this.orgid,this.searchCreatTime=this.defaultTime,this.onSubmit()},methods:{onSubmit:function(){this.searchForm.startTime=this.searchCreatTime?Object(o.parseTime)(this.searchCreatTime[0],"{y}-{m}-{d} ")+"00:00:00":"",this.searchForm.endTime=this.searchCreatTime?Object(o.parseTime)(this.searchCreatTime[1],"{y}-{m}-{d} ")+"23:59:59":"",this.$emit("change",this.searchForm)},clearForm:function(){this.searchForm=this.$options.data().searchForm,this.searchForm.orgId=this.orgid,this.searchForm.checkStatus="",this.searchForm.startTime="",this.searchForm.endTime="",this.searchCreatTime=this.defaultTime,console.log(this.searchForm,this.orgid)}}}},IlIf:function(e,t,i){"use strict";var a={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"saveDialog-index"},[i("PopFrame",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"pickpopDepMain",attrs:{title:t.popTitle,isShow:t.popVisible},on:{close:t.closeMe}},[i("template",{staticClass:"pickRelationPop-content",slot:"content"},[i("div",{staticClass:"depmain-div"},[i("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:t.dialogInfo,stripe:"",border:"",height:"160","tooltip-effect":"dark","default-sort":{prop:"id",order:"ascending"}}},[i("el-table-column",{attrs:{fixed:"",sortable:"",label:"序号",width:"80"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(e.$index+1))]}}])}),t._v(" "),i("el-table-column",{attrs:{fixed:"",sortable:"",prop:"date",width:"120",label:"费用项"}}),t._v(" "),i("el-table-column",{attrs:{fixed:"",sortable:"",prop:"toPay",width:"230",label:"金额"}})],1)],1)]),t._v(" "),i("div",{staticClass:"dialog-footer-frame",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:t.closeMe}},[t._v("取 消")]),t._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:t.submitForm}},[t._v("确 定")])],1)],2)],1)},staticRenderFns:[]};t.a=a},QtuL:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=i("BnG3"),n=i("mOvB"),o=i("VU/8")(a.a,n.a,null,null,null);t.default=o.exports},f3wf:function(e,t){},fGOG:function(e,t,i){"use strict";t.g=function(e){return a.b.post("/api-finance/finance/tmsfinancebillcheck/v1/carFeePagelist/",e).then(function(e){return e.data||{list:[],totalCount:0}})},t.c=function(e){return a.b.post("/api-finance/finance/tmsfinancebillcheck/v1/getBillCheckCarBaseInfo/",e).then(function(e){return e.data})},t.d=function(e){return a.b.post("/api-finance/finance/tmsfinancebillcheckcardetail/v1/getBillCheckCarInitList",e).then(function(e){return e.data})},t.h=function(e){return a.b.post("/api-finance/finance/tmsfinancebillcheck/v1/createBillCheckCarInfo",e).then(function(e){return e.data})},t.f=function(e){return a.b.get("/api-finance/finance/tmsfinancebillcheck/v1/getDtoById/"+e)},t.e=function(e){return a.b.post("/api-finance/finance/tmsfinancebillcheckcardetail/v1/getBillCheckCarUpdateList",e).then(function(e){return e.data})},t.a=function(e){return a.b.delete("/api-finance/finance/tmsfinancebillcheck/v1/"+e)},t.i=function(e){return a.b.post("/api-finance/finance/tmsfinancebillcheck/v1/updateBillCheckSelective",e)},t.b=function(){return a.b.get("/api-order/order/load/v1/getLoadTruck")};var a=i("Vo7i")},fpk6:function(e,t,i){"use strict";t.e=function(e){return a.b.post("/api-finance/finance/customerdetail/v1/",e).then(function(e){return e.data||{list:[],totalCount:0}})},t.b=function(e){return a.b.post("/api-finance/finance/tmsfinancebillcheck/v1/getCustomerDetailList/",e).then(function(e){return e.data||{list:[],totalCount:0}})},t.c=function(e){return a.b.post("/api-finance/finance/customerdetail/v1/initialize/",e).then(function(e){return e.data||{list:[],totalCount:0}})},t.d=function(e){return a.b.post("/api-finance/finance/customerdetail/v1/saveCustomerDetail/",e).then(function(e){return e.data})},t.a=function(e){return a.b.get("/api-finance/finance/customerdetail/v1/"+e).then(function(e){return e.data})};var a=i("Vo7i")},jBlx:function(e,t,i){"use strict";var a={render:function(){var a=this,e=a.$createElement,n=a._self._c||e;return n("div",{directives:[{name:"loading",rawName:"v-loading",value:a.loading,expression:"loading"}],staticClass:"tab-content"},[n("SearchForm",{attrs:{orgid:a.currentOrgid,issender:!0,btnsize:a.btnsize},on:{change:a.getSearchParam}}),a._v(" "),n("div",{staticClass:"tab_info"},[n("div",{staticClass:"btns_box"},[n("el-button",{attrs:{type:"primary",size:a.btnsize,icon:"el-icon-plus",plain:""},on:{click:function(e){a.doAction("storage")}}},[a._v("创建对账单")]),a._v(" "),n("el-button",{attrs:{type:"success",size:a.btnsize,icon:"el-icon-tickets",plain:""},on:{click:function(e){a.doAction("completion")}}},[a._v("对账完成")]),a._v(" "),n("el-button",{attrs:{type:"info",size:a.btnsize,icon:"el-icon-error",plain:""},on:{click:function(e){a.doAction("cancelCom")}}},[a._v("取消完成")]),a._v(" "),n("el-button",{attrs:{type:"primary",size:a.btnsize,icon:"el-icon-edit",plain:""},on:{click:function(e){a.doAction("modify")}}},[a._v("修改查看")]),a._v(" "),n("el-button",{attrs:{type:"danger",size:a.btnsize,icon:"el-icon-delete",plain:""},on:{click:function(e){a.doAction("detele")}}},[a._v("删除")]),a._v(" "),n("el-button",{attrs:{type:"primary",size:a.btnsize,icon:"el-icon-download",plain:""},on:{click:function(e){a.doAction("export")}}},[a._v("导出")]),a._v(" "),n("el-button",{attrs:{type:"primary",size:a.btnsize,icon:"el-icon-printer",plain:""},on:{click:function(e){a.doAction("print")}}},[a._v("打印")]),a._v(" "),n("el-button",{staticClass:"table_setup",attrs:{type:"primary",size:a.btnsize,icon:"el-icon-setting",plain:""},on:{click:a.setTable}},[a._v("表格设置")])],1),a._v(" "),n("div",{staticClass:"info_tab"},[n("el-table",{key:a.tablekey,ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:a.usersArr,border:"",height:"100%","tooltip-effect":"dark","default-sort":{prop:"id",order:"ascending"},stripe:""},on:{"row-dblclick":a.getDbClick,"row-click":a.clickDetails,"selection-change":a.getSelection}},[n("el-table-column",{attrs:{fixed:"",sortable:"",type:"selection",width:"50"}}),a._v(" "),a._l(a.tableColumn,function(i){return[i.slot?n("el-table-column",{key:i.id,attrs:{fixed:i.fixed,sortable:"",label:i.label,width:i.width},scopedSlots:a._u([{key:"default",fn:function(t){return[i.click?n("span",{staticClass:"clickitem",domProps:{innerHTML:a._s(i.slot(t))},on:{click:function(e){e.stopPropagation(),i.click(t)}}}):n("span",{domProps:{innerHTML:a._s(i.slot(t))}})]}}])}):n("el-table-column",{key:i.id,attrs:{fixed:i.fixed,sortable:"",label:i.label,prop:i.prop,width:i.width}})]})],2)],1),a._v(" "),n("div",{staticClass:"info_tab_footer"},[a._v("共计:"+a._s(a.total)+" "),n("div",{staticClass:"show_pager"},[n("Pager",{attrs:{total:a.total},on:{change:a.handlePageChange}})],1)])]),a._v(" "),n("IndexDialog",{attrs:{issender:!0,isModify:a.isModify,dotInfo:a.selectInfo,orgid:a.orgid,id:a.trackId,popVisible:a.AddCustomerVisible},on:{"update:popVisible":function(e){a.AddCustomerVisible=e},close:a.closeAddCustomer,success:a.fetchData}}),a._v(" "),n("TableSetup",{attrs:{popVisible:a.setupTableVisible,columns:a.tableColumn},on:{close:a.closeSetupTable,success:a.setColumn}})],1)},staticRenderFns:[]};t.a=a},mOvB:function(e,t,i){"use strict";var a={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-form",{staticClass:"staff_searchinfo clearfix",attrs:{inline:!0,size:t.btnsize,"label-position":"right",rules:t.rules,model:t.searchForm,"label-width":"70px"}},[i("div",{staticClass:"staff_searchinfo--input"},[i("el-form-item",{attrs:{label:"创建时间"}},[i("el-date-picker",{attrs:{"default-value":t.defaultTime,type:"daterange",align:"right","value-format":"yyyy-MM-dd","start-placeholder":"开始日期","picker-options":t.pickerOptions2,"end-placeholder":"结束日期"},model:{value:t.searchCreatTime,callback:function(e){t.searchCreatTime=e},expression:"searchCreatTime"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"对账网点"}},[i("SelectTree",{attrs:{orgid:t.otherinfo.orgid},model:{value:t.searchForm.orgId,callback:function(e){t.$set(t.searchForm,"orgId",e)},expression:"searchForm.orgId"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"对账状态\n"}},[i("el-select",{model:{value:t.searchForm.checkStatus,callback:function(e){t.$set(t.searchForm,"checkStatus",e)},expression:"searchForm.checkStatus"}},[i("el-option",{attrs:{label:"未对账",value:0}}),t._v(" "),i("el-option",{attrs:{label:"已对账",value:1}}),t._v(" "),i("el-option",{attrs:{label:"全部",value:""}})],1)],1)],1),t._v(" "),i("el-form-item",{staticClass:"staff_searchinfo--btn art_marginTop"},[i("el-button",{attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v("查询")]),t._v(" "),i("el-button",{attrs:{type:"info",plain:""},on:{click:t.clearForm}},[t._v("清空")])],1)],1)},staticRenderFns:[]};t.a=a},qYK6:function(e,t,i){"use strict";t.a={props:{width:{type:String,default:"400"},title:{type:String,default:"标题"},isShow:{type:Boolean,default:!1}},watch:{isShow:{handler:function(){this.isShow&&(this.shouldRender=!0)},immediate:!0}},data:function(){return{zIndex:(window.tmsPopZindex?window.tmsPopZindex+=1:window.tmsPopZindex=1e3,window.tmsPopZindex),shouldRender:!1}},methods:{close:function(){this.$emit("close")}}}},"uR+I":function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=i("w3vU"),n=i("IlIf");var o=function(e){i("4Wso")},s=i("VU/8")(a.a,n.a,o,null,null);t.default=s.exports},w3vU:function(e,t,i){"use strict";i("E4LH");var a=i("3EPC"),n=i("pAQG"),o=i("fGOG");i("0xDb");t.a={components:{PopFrame:a.a,querySelect:n.a},props:{popVisible:{type:Boolean,default:!1},isDepMain:{type:Boolean,default:!1},dotInfo:{type:[Object,Array,Boolean],default:!1},sendId:[Number,String]},data:function(){return{selected:[],formLabelWidth:"90",dialogInfo:[{toPay:10,date:"未收账款"},{toPay:20,date:"未付账款"},{toPay:10,date:"已收货款"},{toPay:20,date:"已付账款"}],dialogData:{},checked1:!0,popTitle:"",totaMoney:"",loading:!1,formInline:{shipSn:"",shipGoodsSn:"",pickupFee:""}}},computed:{isShow:{get:function(){return this.popVisible},set:function(){}}},watch:{dotInfo:function(e){this.dialogInfo[0].toPay=0,this.dialogInfo[1].toPay=0,this.dialogInfo[2].toPay=0,this.dialogInfo[3].toPay=0,this.dialogInfo[0].toPay=this.dotInfo.receivableFee,this.dialogInfo[1].toPay=this.dotInfo.payableFee,this.dialogInfo[2].toPay=this.dotInfo.receivedFee,this.dialogInfo[3].toPay=this.dotInfo.paidFee,this.popTitle=this.dotInfo.checkBillName},popVisible:function(e){},sendId:function(e){}},mounted:function(){this.popVisible},methods:{closeMe:function(e){this.reset(),this.$emit("update:popVisible",!1),"function"==typeof e&&e()},reset:function(){},submitForm:function(e){var t=this,i={id:"",checkStatus:1};i.id=this.dotInfo.id,Object(o.i)(i).then(function(e){t.loading=!1,t.$message({type:"success",message:"该对账单已经完成对账~"}),t.$emit("success"),t.closeMe()}).catch(function(e){t.loading=!1,t._handlerCatchMsg(e)})}}}}});