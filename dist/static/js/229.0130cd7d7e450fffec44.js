webpackJsonp([229,266],{O67y:function(e,t,i){"use strict";var s=i("E4LH"),a=i("o9X6"),r=i("9UCZ"),o=i("0xDb");t.a={components:{SelectTree:a.a,SelectType:r.a},props:{btnsize:{type:String,default:"mini"},orgid:{type:Number},issender:{type:Boolean,dafault:!1},isAllOrg:{type:Boolean}},computed:{},data:function(){var a=this;return{searchCreatTime:[],defaultTime:[Object(o.parseTime)(+new Date-5184e6,"{y}-{m}-{d}"),Object(o.parseTime)(new Date,"{y}-{m}-{d}")],searchForm:{orgId:"",shipSn:"",abnormalStatus:117,registerTime:"",statu:"",number:"",startcity:"",endcity:"",sendpepole:"",recivepepole:""},rules:{mobile:[{validator:function(e,t,i){a.searchForm.mobile=t.replace(s.a.NO_NUMBER,""),i()},trigger:"change"}]},pickerOptions2:{shortcuts:o.pickerOptions2}}},watch:{orgid:function(e){this.searchForm.orgId=e}},mounted:function(){this.searchForm.orgId=this.orgid,this.searchCreatTime=this.defaultTime,this.onSubmit()},methods:{getOrgid:function(e){this.searchForm.orgId=e},onSubmit:function(){this.searchForm.startTime=this.searchCreatTime?Object(o.parseTime)(this.searchCreatTime[0],"{y}-{m}-{d} ")+"00:00:00":"",this.searchForm.endTime=this.searchCreatTime?Object(o.parseTime)(this.searchCreatTime[1],"{y}-{m}-{d} ")+"23:59:59":"",this.$emit("change",this.searchForm)},clearForm:function(){this.searchForm.shipSn="",this.searchCreatTime=this.defaultTime,this.searchForm.orgId=this.orgid,this.searchForm.abnormalStatus=""}}}},OLIy:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=i("R4xs"),s=i("zQiv"),r=i("VU/8")(a.a,s.a,null,null,null);t.default=r.exports},OwoJ:function(e,t,i){"use strict";var a={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-form",{staticClass:"staff_searchinfo clearfix",attrs:{inline:!0,size:t.btnsize,"label-position":"right",rules:t.rules,model:t.searchForm,"label-width":"70px"}},[i("div",{staticClass:"staff_searchinfo--input"},[i("el-form-item",{attrs:{label:"登记时间"}},[i("div",{staticClass:"block"},[i("el-date-picker",{attrs:{"default-value":t.defaultTime,type:"daterange","unlink-panels":"",align:"right","value-format":"yyyy-MM-dd","start-placeholder":"开始日期","picker-options":t.pickerOptions2,"end-placeholder":"结束日期"},model:{value:t.searchCreatTime,callback:function(e){t.searchCreatTime=e},expression:"searchCreatTime"}})],1)]),t._v(" "),i("el-form-item",{attrs:{label:"运单号"}},[i("el-input",{attrs:{maxlength:20,"auto-complete":"off",clearable:""},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.onSubmit(e):null}},model:{value:t.searchForm.shipSn,callback:function(e){t.$set(t.searchForm,"shipSn",e)},expression:"searchForm.shipSn"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"登记网点"}},[t.isAllOrg?i("SelectTree",{attrs:{type:"org_id"},model:{value:t.searchForm.orgId,callback:function(e){t.$set(t.searchForm,"orgId",e)},expression:"searchForm.orgId"}}):i("SelectTree",{attrs:{type:"org_id",orgid:t.otherinfo.orgid},model:{value:t.searchForm.orgId,callback:function(e){t.$set(t.searchForm,"orgId",e)},expression:"searchForm.orgId"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"异常状态"}},[i("selectType",{attrs:{type:"abnormal_status"},model:{value:t.searchForm.abnormalStatus,callback:function(e){t.$set(t.searchForm,"abnormalStatus",e)},expression:"searchForm.abnormalStatus"}})],1)],1),t._v(" "),i("el-form-item",{staticClass:"staff_searchinfo--btn"},[i("el-button",{attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v("查询")]),t._v(" "),i("el-button",{attrs:{type:"info",plain:""},on:{click:t.clearForm}},[t._v("清空")])],1)],1)},staticRenderFns:[]};t.a=a},R4xs:function(e,t,i){"use strict";var a=i("woOf"),s=i.n(a),r=i("Dd8w"),o=i.n(r),n=i("l+20"),l=i("Tv76"),c=i("NYxO"),d=i("1onU"),h=i("rYeu"),u=i("0xDb"),m=i("UQm2");t.a={components:{SearchForm:n.default,Pager:d.a,Addabnormal:h.default},computed:o()({},Object(c.mapGetters)(["otherinfo"]),{orgid:function(){return this.isModify?this.selectInfo.orgid:this.searchQuery.vo.orgid||this.otherinfo.orgid}}),mounted:function(){this.loading=!0,this.searchQuery.vo.orgId=this.otherinfo.orgid},data:function(){var t=this;return{btnsize:"mini",component:"Send",selectInfo:{},loading:!0,dataset:[],isModify:!1,isCheck:!1,AddAbnormalVisible:!1,setupTableVisible:!1,tablekey:0,isDbclick:!1,licenseTypes:[],selected:[],total:0,id:"",searchQuery:{currentPage:1,pageSize:100,vo:{}},tableColumn:[{label:"序号",prop:"number",width:"60",fixed:!0,slot:function(e){return(t.searchQuery.currentPage-1)*t.searchQuery.pageSize+e.$index+1}},{label:"运单号",prop:"shipSn",width:"120",fixed:!0},{label:"异常编号",prop:"abnormalNo",width:"120",fixed:!0},{label:"登记时间",prop:"registerTime",width:"165",slot:function(e){return""+Object(u.parseTime)(e.row.registerTime,"{y}-{m}-{d} {h}:{i}:{s}")},fixed:!1},{label:"开单时间",prop:"createTime",width:"165",slot:function(e){return""+Object(u.parseTime)(e.row.createTime,"{y}-{m}-{d} {h}:{i}:{s}")},fixed:!1},{label:"货品名",prop:"cargoName",width:"120",fixed:!1},{label:"异常状态",prop:"abnormalStatusName",width:"90",fixed:!1},{label:"异常类型",prop:"abnormalTypeName",width:"120",fixed:!1},{label:"登记网点",prop:"orgName",width:"120",fixed:!1},{label:"责任网点",prop:"dutyOrgName",width:"120",fixed:!1},{label:"登记人",prop:"registerName",width:"120",fixed:!1},{label:"登记金额",prop:"registerFee",width:"120",fixed:!1},{label:"异常件数",prop:"abnormalAmount",width:"120",fixed:!1},{label:"货号",prop:"shipGoodsSn",width:"120",fixed:!1},{label:"包装",prop:"cargoPack",width:"80",fixed:!1},{label:"件数",prop:"cargoAmount",width:"80",fixed:!1},{label:"异常描述",prop:"abnormalDescribe",width:"120",fixed:!1},{label:"处理结果",prop:"disposeResultName",width:"120",fixed:!1},{label:"处理网点",prop:"disposeOrgName",width:"120",fixed:!1},{label:"处理人",prop:"disposeName",width:"90",fixed:!1},{label:"处理意见",prop:"disposeOpinion",width:"120",fixed:!1}]}},methods:{changeKey:function(e){this.total=0,this.searchQuery=e,this.loading||this.fetchAllreceipt()},getSumLeft:function(e,t){return Object(u.getSummaries)(e,u.operationPropertyCalc)},fetchAllreceipt:function(){var t=this;return this.loading=!0,Object(l.e)(this.searchQuery).then(function(e){t.dataset=e.list,t.total=e.total,t.loading=!1}).catch(function(e){t.loading=!1,t._handlerCatchMsg(e)})},handlePageChange:function(e){this.searchQuery.currentPage=e.pageNum,this.searchQuery.pageSize=e.pageSize,this.fetchData()},fetchData:function(){this.fetchAllreceipt()},getSearchParam:function(e){this.searchQuery.currentPage=this.$options.data().searchQuery.currentPage,this.searchQuery.pageSize=this.$options.data().searchQuery.pageSize,Object(u.objectMerge2)(this.searchQuery.vo,e),this.fetchData()},doAction:function(e){var t=this;if(0===this.selected.length&&"reg"!==e&&"export"!==e)return this.$message({message:"请选择要操作的项~",type:"warning"}),!1;switch(e){case"export":Object(m.g)({data:this.selected.length?this.selected:this.dataset,columns:this.tableColumn,name:"异常登记"});break;case"reg":this.isModify=!1,this.isCheck=!1,this.selectInfo={},this.openAddAbnormal();break;case"xiugai":1<this.selected.length?this.$message({message:"每次只能修改单条数据",type:"warning"}):118===this.selected[0].abnormalStatus?(this.selectInfo={},this.isModify=!0,this.isCheck=!1,this.selectInfo=s()({},this.selected[0]),this.openAddAbnormal()):119===this.selected[0].abnormalStatus&&this.$message.warning("异常已经处理，不允许修改~");break;case"check":1<this.selected.length?this.$message({message:"每次自能查看单条数据",type:"warning"}):(this.isModify=!1,this.isCheck=!0,this.selectInfo=s()({},this.selected[0]),this.openAddAbnormal());break;case"delete":if(1<this.selected.length)return this.$message.warning("请选择一条数据~"),!1;var i=this.selected[0].id;if(118===this.selected[0].abnormalStatus)this.$confirm("确定要删除订单异常信息吗？","提示",{confirmButtonText:"删除",cancelButtonText:"取消",type:"warning"}).then(function(){t.loading=!0,Object(l.i)(i).then(function(e){t.$message({type:"success",message:"删除成功!"}),t.fetchData(),t.loading=!1}).catch(function(e){t._handlerCatchMsg(e)})}).catch(function(){t.$message({type:"info",message:"已取消删除"})});else if(119===this.selected[0].abnormalStatus)return this.$message.warning("异常已处理，不允许删除"),!1}this.$refs.multipleTable.clearSelection()},openAddAbnormal:function(){this.AddAbnormalVisible=!0},closeAddAbnormal:function(){this.AddAbnormalVisible=!1},clickDetails:function(e,t,i){this.$refs.multipleTable.toggleRowSelection(e)},getSelection:function(e){this.selected=e},setTable:function(){this.setupTableVisible=!0},closeSetupTable:function(){this.setupTableVisible=!1},setColumn:function(e){this.tableColumn=e,this.tablekey=Math.random()},getDbClick:function(e,t){console.log("detail",e),this.selectInfo=e,this.isCheck=!0,this.isModify=!1,this.openAddAbnormal()}}}},eZUk:function(e,t){},"l+20":function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=i("O67y"),s=i("OwoJ");var r=function(e){i("eZUk")},o=i("VU/8")(a.a,s.a,r,null,null);t.default=o.exports},zQiv:function(e,t,i){"use strict";var a={render:function(){var a=this,e=a.$createElement,s=a._self._c||e;return s("div",{directives:[{name:"loading",rawName:"v-loading",value:a.loading,expression:"loading"}],staticClass:"tab-content miniHeaderSearch"},[s("SearchForm",{attrs:{orgid:a.otherinfo.orgid,btnsize:a.btnsize},on:{change:a.getSearchParam}}),a._v(" "),s("div",{staticClass:"tab_info"},[s("div",{staticClass:"btns_box"},[s("el-button",{directives:[{name:"has",rawName:"v-has:ABNO_ADD",arg:"ABNO_ADD"}],attrs:{type:"primary",size:a.btnsize,icon:"el-icon-circle-plus",plain:""},on:{click:function(e){a.doAction("reg")}}},[a._v("异常登记")]),a._v(" "),s("el-button",{directives:[{name:"has",rawName:"v-has:ABNO_PUT",arg:"ABNO_PUT"}],attrs:{type:"primary",size:a.btnsize,icon:"el-icon-edit",plain:""},on:{click:function(e){a.doAction("xiugai")}}},[a._v("异常修改")]),a._v(" "),s("el-button",{directives:[{name:"has",rawName:"v-has:ABNO_SELECT",arg:"ABNO_SELECT"}],attrs:{type:"primary",size:a.btnsize,icon:"el-icon-news",plain:""},on:{click:function(e){a.doAction("check")}}},[a._v("查看明细")]),a._v(" "),s("el-button",{directives:[{name:"has",rawName:"v-has:ABNO_DEL",arg:"ABNO_DEL"}],attrs:{type:"danger",size:a.btnsize,icon:"el-icon-delete",plain:""},on:{click:function(e){a.doAction("delete")}}},[a._v("删除")]),a._v(" "),s("el-button",{directives:[{name:"has",rawName:"v-has:ABNO_EXP1",arg:"ABNO_EXP1"}],attrs:{type:"primary",size:a.btnsize,icon:"el-icon-upload2",plain:""},on:{click:function(e){a.doAction("export")}}},[a._v("导出")]),a._v(" "),s("el-button",{staticClass:"table_setup",attrs:{type:"primary",size:a.btnsize,icon:"el-icon-setting",plain:""},on:{click:a.setTable}},[a._v("表格设置")])],1),a._v(" "),s("div",{staticClass:"info_tab"},[s("el-table",{key:a.tablekey,ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:a.dataset,border:"",height:"100%","summary-method":a.getSumLeft,"show-summary":"","tooltip-effect":"dark","default-sort":{prop:"id",order:"ascending"},stripe:""},on:{"row-dblclick":a.getDbClick,"row-click":a.clickDetails,"selection-change":a.getSelection}},[s("el-table-column",{attrs:{fixed:"",sortable:"",type:"selection",width:"70"}}),a._v(" "),a._l(a.tableColumn,function(i){return[i.slot?s("el-table-column",{key:i.id,attrs:{fixed:i.fixed,sortable:"",label:i.label,prop:i.prop,width:i.width},scopedSlots:a._u([{key:"header",fn:function(e){return[s("tableHeaderSearch",{attrs:{scope:e,query:a.searchQuery},on:{change:a.changeKey}})]}},{key:"default",fn:function(t){return[i.click?s("span",{staticClass:"clickitem",domProps:{innerHTML:a._s(i.slot(t))},on:{click:function(e){e.stopPropagation(),i.click(t)}}}):s("span",{domProps:{innerHTML:a._s(i.slot(t))}})]}}])}):s("el-table-column",{key:i.id,attrs:{fixed:i.fixed,sortable:"",label:i.label,prop:i.prop,width:i.width},scopedSlots:a._u([{key:"header",fn:function(e){return[s("tableHeaderSearch",{attrs:{scope:e,query:a.searchQuery},on:{change:a.changeKey}})]}},{key:"default",fn:function(e){return[a._v(a._s(e.row[i.prop]))]}}])})]})],2)],1),a._v(" "),s("div",{staticClass:"info_tab_footer"},[a._v("共计:"+a._s(a.total)+" "),s("div",{staticClass:"show_pager"},[s("Pager",{attrs:{total:a.total},on:{change:a.handlePageChange}})],1)])]),a._v(" "),s("Addabnormal",{attrs:{issender:!0,isModify:a.isModify,isCheck:a.isCheck,info:a.selectInfo,id:a.id,orgid:a.orgid,companyId:a.otherinfo.companyId,popVisible:a.AddAbnormalVisible},on:{"update:popVisible":function(e){a.AddAbnormalVisible=e},close:a.closeAddAbnormal,success:a.fetchData}}),a._v(" "),s("TableSetup",{attrs:{popVisible:a.setupTableVisible,columns:a.tableColumn,code:"ORDER_ABNO1"},on:{close:a.closeSetupTable,success:a.setColumn}})],1)},staticRenderFns:[]};t.a=a}});