webpackJsonp([85,191],{"1onU":function(t,e,i){"use strict";var a=i("VT+v"),s=i("SgVa");var n=function(t){i("FiTa"),i("7CJ8")},o=i("VU/8")(a.a,s.a,n,"data-v-4b7ed4df",null);e.a=o.exports},"3F+I":function(t,e,i){"use strict";var a={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("el-form",{staticClass:"staff_searchinfo clearfix",attrs:{inline:!0,size:e.btnsize,"label-position":"right",model:e.searchForm,"label-width":"70px"}},[i("div",{staticClass:"staff_searchinfo--input"},[i("el-form-item",{attrs:{label:"开单网点"}},[i("select-tree",{attrs:{orgid:e.searchForm.orgid},model:{value:e.searchForm.orgid,callback:function(t){e.$set(e.searchForm,"orgid",t)},expression:"searchForm.orgid"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"交账状态"}},[i("select-type",{attrs:{type:"fee_status"},model:{value:e.searchForm.status,callback:function(t){e.$set(e.searchForm,"status",t)},expression:"searchForm.status"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"开单时间"}},[i("div",{staticClass:"block"},[i("el-date-picker",{attrs:{"default-value":e.defaultTime,type:"daterange",align:"right","picker-options":e.pickerOptions2,"value-format":"yyyy-MM-dd","start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:e.searchCreatTime,callback:function(t){e.searchCreatTime=t},expression:"searchCreatTime"}})],1)]),e._v(" "),i("el-form-item",{attrs:{label:"签收状态",prop:"signStatus"}},[i("selectType",{attrs:{type:"sign_status"},model:{value:e.searchForm.signStatus,callback:function(t){e.$set(e.searchForm,"signStatus",t)},expression:"searchForm.signStatus"}},[i("el-option",{attrs:{slot:"head",label:"全部",value:""},slot:"head"})],1)],1),e._v(" "),i("searchAll",{attrs:{searchObj:e.searchObjs},on:{dataObj:e.getDataObj}})],1),e._v(" "),i("el-form-item",{staticClass:"staff_searchinfo--btn"},[i("el-button",{attrs:{type:"primary"},on:{click:e.onSubmit}},[e._v("查询")]),e._v(" "),i("el-button",{attrs:{type:"info",plain:""},on:{click:e.clearForm}},[e._v("清空")])],1)],1)},staticRenderFns:[]};e.a=a},"7CJ8":function(t,e){},"7ZQA":function(t,e,i){"use strict";e.a=function(t){return s.b.post("/api-finance/finance/employeeaccount/v1/getEmployeeList",t).then(function(t){return t.data||{list:[],totalCount:0}})},e.b=function(t){return s.b.post("/api-finance/finance/employeeaccount/v1/getEmployeeSummarize",t).then(function(t){return t.data||{list:[],totalCount:0}})};var a=i("//Fk"),s=(i.n(a),i("Vo7i"))},"803T":function(t,e,i){"use strict";var a={render:function(){var i=this,t=i.$createElement,a=i._self._c||t;return a("div",{staticClass:"handAccount-manager tab-wrapper tab-wrapper-100"},[a("div",{directives:[{name:"loading",rawName:"v-loading",value:i.loading,expression:"loading"}],staticClass:"tab-content handAccount-detail"},[a("SearchForm",{attrs:{orgid:i.searchQuery.vo.orgid,btnsize:i.btnsize},on:{change:i.getSearchParam}}),i._v(" "),a("div",{staticClass:"tab_info"},[a("div",{staticClass:"btns_box"},[a("el-button",{staticClass:"table_setup",attrs:{type:"primary",size:i.btnsize,icon:"el-icon-edit-outline",plain:""},on:{click:function(t){i.doAction("export")}}},[i._v("导出")]),i._v(" "),a("el-button",{staticClass:"table_setup",attrs:{type:"primary",size:i.btnsize,icon:"el-icon-edit-outline",plain:""},on:{click:function(t){i.doAction("print")}}},[i._v("打印")]),i._v(" "),a("el-button",{staticClass:"table_setup",attrs:{type:"primary",size:i.btnsize,icon:"el-icon-setting",plain:""},on:{click:i.setTable}},[i._v("表格设置")])],1),i._v(" "),a("div",{staticClass:"info_tab"},[a("el-table",{key:i.tablekey,ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:i.usersArr,stripe:"",border:"",height:"100%","show-summary":"","summary-method":i.getSummaries,"tooltip-effect":"dark","default-sort":{prop:"id",order:"ascending"}},on:{"row-click":i.clickDetails,"selection-change":i.getSelection}},[a("el-table-column",{attrs:{fixed:"",sortable:"",type:"selection",width:"80"}}),i._v(" "),i._l(i.tableColumn,function(e){return[e.slot?a("el-table-column",{key:e.id,attrs:{fixed:e.fixed,sortable:"",label:e.label,width:e.width},scopedSlots:i._u([{key:"default",fn:function(t){return[i._v("\r\n                  "+i._s(e.slot(t))+"\r\n              ")]}}])}):a("el-table-column",{key:e.id,attrs:{fixed:e.fixed,sortable:"",label:e.label,prop:e.prop,width:e.width}})]})],2)],1),i._v(" "),a("div",{staticClass:"info_tab_footer"},[i._v("共计:"+i._s(i.total)+" "),a("div",{staticClass:"show_pager"},[a("Pager",{attrs:{total:i.total},on:{change:i.handlePageChange}})],1)])]),i._v(" "),a("TableSetup",{attrs:{popVisible:i.setupTableVisible,columns:i.tableColumn},on:{close:i.closeSetupTable,success:i.setColumn}})],1)])},staticRenderFns:[]};e.a=a},"8UOW":function(t,e,i){"use strict";var a=i("us2a"),s=i("fyBF");var n=function(t){i("Qhr/")},o=i("VU/8")(a.a,s.a,n,null,null);e.a=o.exports},FiTa:function(t,e){},I01s:function(t,e,i){"use strict";var a=i("woOf"),s=i.n(a),n=i("o9X6"),o=i("9UCZ"),r=i("0xDb"),l=i("8UOW");e.a={name:"handaccount-manage-search",components:{SelectTree:n.a,SelectType:o.a,searchAll:l.a},props:{btnsize:{type:String,default:"mini"},orgid:{type:[Number,String]}},data:function(){return{searchObjs:{},searchCreatTime:[],defaultTime:[Object(r.parseTime)(+new Date-5184e6,"{y}-{m}-{d}"),Object(r.parseTime)(new Date,"{y}-{m}-{d}")],searchForm:{orgid:"",status:"",endTime:"",startTime:""},pickerOptions2:{shortcuts:r.pickerOptions2}}},watch:{searchCreatTime:function(t){t&&(this.$set(this.searchObjs,"startTime",Object(r.parseTime)(this.searchCreatTime[0],"{y}-{m}-{d} ")+"00:00:00"),this.$set(this.searchObjs,"endTime",Object(r.parseTime)(this.searchCreatTime[1],"{y}-{m}-{d} ")+"23:59:59"))},orgid:{handler:function(t){this.searchForm.orgid=Number(t)||""},immediate:!0},searchForm:{handler:function(t,e){this.searchObjs=s()({},t),this.searchObjs.status=""===this.searchObjs.status?null:this.searchObjs.status,this.searchCreatTime&&(this.$set(this.searchObjs,"startTime",Object(r.parseTime)(this.searchCreatTime[0],"{y}-{m}-{d} ")+"00:00:00"),this.$set(this.searchObjs,"endTime",Object(r.parseTime)(this.searchCreatTime[1],"{y}-{m}-{d} ")+"23:59:59"))},deep:!0}},mounted:function(){this.searchForm.orgid=this.orgid,this.searchCreatTime=this.defaultTime,this.onSubmit()},methods:{getDataObj:function(t){this.searchCreatTime=[t.startTime,t.endTime],this.searchForm=s()({},t),this.$emit("change",t)},onSubmit:function(){var t=s()({},this.searchForm);t.status=""===t.status?null:t.status,this.searchCreatTime&&this.searchCreatTime[0]&&(t.startTime=this.searchCreatTime[0]+" 00:00:00",t.endTime=this.searchCreatTime[1]+" 23:59:59"),this.$emit("change",t)},clearForm:function(){this.searchForm.status="",this.searchForm.startTime="",this.searchForm.endTime="",this.searchCreatTime=this.defaultTime,this.searchForm.orgid=this.otherinfo.orgid,this.searchObjs.signStatus=""}}}},IAIf:function(t,e,i){"use strict";var a=i("woOf"),r=i.n(a),s=i("DAYN"),n=i.n(s),l=i("0xDb"),c=i("t5DY");e.a={props:{popVisible:{type:Boolean,default:!1},columns:{type:Array,default:[]},code:{type:String,default:""}},components:{draggable:n.a},computed:{isShow:{get:function(){return this.popVisible},set:function(){}}},data:function(){return{orgColumnData:[],columnData:[],orgShowColumnData:[],showColumnData:[],list:[],rightList:[],listKey:0,isIndeterminateLeft:!0,isIndeterminateRight:!0,checkAllLeft:!1,checkAllRight:!1,checkListLeft:[],checkListRight:[],searchLeft:"",searchRight:"",leftListLen:0,rightListLen:0,columnListLen:0,isCheck:!0,maxLen:50,rightCheckLen:0,leftCheckLen:0,thecode:""}},mounted:function(){var a=this,t=this.code;this.$route.meta.code;"NOSET"===t?this.convertData():t?this.thecode=t:this.convertData(),this.thecode&&(this.fetchTableSetup(),this.eventBus.$on("tablesetup.change",function(t,e){if(t&&t===a.thecode){var i=a.showColumnData.filter(function(t){return t.prop===e.prop});i.length&&(i[0].width=e.width,a.changeTbaleSetup())}}))},methods:{convertData:function(t){this.initData(t),this.callback()},initData:function(e){e=e||this.columns;var o=this.maxLen,t=function(t){var s=[];if(0<e.length){var n=0;e.forEach(function(t,e){if(t.hidden){var i=Object(l.objectMerge2)(t);i.key=e,s.push(i)}else n++;if(o<n){var a=Object(l.objectMerge2)(t);a.key=e,a.hidden=!0,s.push(a)}})}return s},i=function(t){var a=[];if(0<e.length){var s=0;e.forEach(function(t,e){if(!t.hidden&&s<o){s++;var i=Object(l.objectMerge2)(t);i.hidden=!1,i.key=e,a.push(i)}})}return a},a=t().length,s=i().length;this.orgColumnData=t(),this.columnData=t(),this.orgShowColumnData=i(),this.showColumnData=i(),this.leftListLen=a,this.rightListLen=s,this.columnListLen=e.length},sort:function(t){return t.sort(function(t,e){return t.key-e.key})},doAction:function(t){switch(t){case"goRight":this.goRight();break;case"goLeft":this.goLeft()}},fetchFail:function(){this.thecode="",this.convertData()},fetchTableSetup:function(){var o=this;return Object(c.g)(this.otherinfo.orgid,this.thecode).then(function(t){var e=t.data;if((o.orgdata=e)&&e.length){1===e.length&&(e=e[0]),o.orgdata=e;var s=[],n=o.columns.length;e.sort(function(t,e){return t.titleOrder>e.titleOrder?1:-1}),e.forEach(function(t){for(var e=r()({},t),i=0;i<n;i++)if(o.columns[i].prop===t.prop){for(var a in o.columns[i])void 0!==e[a]&&null!==e[a]||(e[a]=o.columns[i][a]);break}s.push(e)}),o.columns.forEach(function(e){0===s.filter(function(t){return t.prop===e.prop}).length&&s.push(e)}),o.convertData(s)}else o.fetchFail()}).catch(function(t){o.fetchFail()})},changeTbaleSetup:function(){var e=this;if(this.thecode)return Object(c.n)(this.otherinfo.orgid,this.thecode,this.formatColumn(this.showColumnData)).then(function(t){e.$message.info("保存成功")}).catch(function(t){e._handlerCatchMsg(t)})},formatColumn:function(t){var n=this.orgdata,o=[],r=0;return t.forEach(function(e){var t=n.filter(function(t){return t.prop===e.prop});if(t.length){var i={},a=t[0];for(var s in a)i[s]=e[s];i.hidden=!1,i.titleOrder=++r,o.push(i)}}),this.columnData.forEach(function(e){var t=n.filter(function(t){return t.prop===e.prop});if(t.length){var i={},a=t[0];for(var s in a)i[s]=e[s];i.hidden=!0,i.titleOrder=++r,o.push(i)}}),o},checkRightLen:function(){this.showColumnData.length>this.maxLen?(this.$message({type:"warning",message:"列表最多只能显示"+this.maxLen+"个字段。"}),this.isCheck=!0):this.isCheck=!1},canDragStart:function(t){},setColumnLen:function(){this.leftListLen=this.columnData.length,this.rightListLen=this.showColumnData.length},handChangeAllLeft:function(t){this.checkListLeft=t?r()([],this.columnData):[],this.leftCheckLen=this.checkListLeft.length,this.isIndeterminateLeft=!1},handChangeAllRight:function(t){this.checkListRight=t?r()([],this.showColumnData):[],this.rightCheckLen=this.checkListRight.length,this.isIndeterminateRight=!1},goRight:function(){var e=this;if(this.checkListLeft.length+this.rightListLen>this.maxLen||this.rightListLen>this.maxLen-1)return this.$message({type:"warning",message:"列表最多只能显示"+this.maxLen+"个字段。"}),!1;this.columnData=this.columnData.filter(function(t){return-1===e.checkListLeft.indexOf(t)||(e.showColumnData.push(t),!1)}),this.orgColumnData=this.orgColumnData.filter(function(t){return-1===e.checkListLeft.indexOf(t)||(e.orgShowColumnData.push(t),!1)}),this.checkListLeft=[],this.setColumnLen(),this.leftCheckLen=0},goLeft:function(){var a=this;this.checkListRight.forEach(function(t,e){a.columnData.push(t),a.orgColumnData.push(t);var i=a.showColumnData.indexOf(t);-1!==i&&a.showColumnData.splice(i,1),-1!==a.orgShowColumnData.indexOf(t)&&a.orgShowColumnData.splice(i,1)}),this.sort(this.columnData),this.checkListRight=[],this.setColumnLen(),this.rightCheckLen=0},dbCheckItemLeft:function(t,e,i){if(this.rightListLen>this.maxLen-1)return this.$message({type:"warning",message:"列表最多只能显示"+this.maxLen+"个字段。"}),!1;this.showColumnData.push(t),this.orgShowColumnData.push(t),this.columnData.splice(e,1),this.orgColumnData.splice(e,1),this.setColumnLen()},dbCheckItemRight:function(t,e,i){this.columnData.push(t),this.orgColumnData.push(t),this.showColumnData.splice(e,1),this.orgShowColumnData.splice(e,1),this.setColumnLen(),this.sort(this.columnData)},handleCheckChangeLeft:function(t){this.leftCheckLen=t.length},handleCheckChangeRight:function(t){this.rightCheckLen=t.length},querySearchLeft:function(t,e){void 0===(this.searchLeft=t).label&&(this.searchLeft||(this.columnData=r()([],this.orgColumnData)));var i=r()([],this.orgColumnData);e(t?i.filter(this.createFilter(t)):i)},querySearchRight:function(t,e){void 0===(this.searchRight=t).label&&(this.searchRight||(this.showColumnData=r()([],this.orgShowColumnData)));var i=r()([],this.orgShowColumnData);e(t?i.filter(this.createFilter(t)):i)},createFilter:function(e){return function(t){return 0===t.label.toLowerCase().indexOf(e.toLowerCase())}},handleSearchLeft:function(t){var e=this;this.searchLeft=t?t.label:"";var i=r()([],this.columnData);i.forEach(function(t){t.label===e.searchLeft&&(i=[]).push(t)}),this.columnData=r()([],i),i=[]},handleSearchRight:function(t){var e=this;this.searchRight=t?t.label:"";var i=r()([],this.showColumnData);i.forEach(function(t){t.label===e.searchRight&&(i=[]).push(t)}),this.showColumnData=r()([],i),i=[]},closeMe:function(t){this.$emit("close"),"function"==typeof t&&t()},handleChange:function(t,e,i){this.rightList=r()([],t)},handleSwitch:function(t){},callback:function(){var t=r()([],this.showColumnData);this.$emit("success",t),this.listKey=Math.random(),this.closeMe()},submitForm:function(){var e=this;this.thecode?this.changeTbaleSetup().then(function(t){e.callback()}):this.callback()}}}},"K3o+":function(t,e,i){"use strict";var a=i("woOf"),s=i.n(a),n=i("7ZQA"),o=i("dpKv"),r=i("puNT"),l=i("0xDb"),c=i("UQm2"),h=i("1onU");e.a={name:"handAccountDetail",components:{SearchForm:o.default,TableSetup:r.a,Pager:h.a},mounted:function(){},activated:function(){},watch:{$route:{handler:function(){this.searchQuery.vo.userId=this.$route.query.id,this.searchQuery.vo.orgid=this.$route.query.orgid,this.fetchData()},immediate:!0}},data:function(){return{btnsize:"mini",usersArr:[],total:0,loading:!0,setupTableVisible:!1,isModify:!1,selectInfo:{},selected:[],searchQuery:{currentPage:1,pageSize:100,vo:{orgid:"",status:"",endTime:"",startTime:"",userId:""}},tablekey:"",tableColumn:[{label:"序号",prop:"",fixed:!0,slot:function(t){return t.$index+1}},{label:"网点",prop:"orgName",fixed:!0},{label:"员工姓名",prop:"userName"},{label:"运单号",prop:"shipSn",width:"120"},{label:"签收状态",prop:"signStatus",width:"100"},{label:"费用类别",prop:"feeName"},{label:"金额",prop:"shipNowpayFee"},{label:"交账状态",prop:"statusValue",width:"120"},{label:"已交金额",prop:"finishAccount"},{label:"未交账金额",prop:"noSettlementFee",width:"120"},{label:"开单时间",prop:"createTime",width:"180"},{label:"业务员",prop:"shipUserName",width:"100"},{label:"出发城市",prop:"shipFromCityName"},{label:"到达城市",prop:"shipToCityName"},{label:"发货方",prop:"senderCustomerUnit"},{label:"发货人",prop:"senderCustomerName"},{label:"收货方",prop:"receiverCustomerUnit"},{label:"收货人",prop:"receiverCustomerName"}]}},methods:{viewDetails:function(t){this.$router.push({path:"/finance/handAccount/detail",query:{orderid:t.id,type:"view",tab:"查看"+t.shipSn}})},showDetail:function(t){this.viewDetails(t)},fetchAllOrder:function(){var e=this;return this.loading=!0,n.a(this.searchQuery).then(function(t){e.usersArr=t.list,e.total=t.total,e.loading=!1}).catch(function(t){e.loading=!1,e._handlerCatchMsg(t)})},fetchData:function(){this.fetchAllOrder()},setColumn:function(){},handlePageChange:function(t){this.searchQuery.currentPage=t.pageNum,this.searchQuery.pageSize=t.pageSize,this.fetchData()},getSearchParam:function(t){this.searchQuery.vo=s()(this.searchQuery.vo,t),this.loading=!1,this.fetchData()},doAction:function(t){if(!this.selected.length&&"add"!==t&&"export"!==t&&"print"!==t)return this.$message({message:"请选择要操作的项~",type:"warning"}),!1;switch(console.log("this.selected:",this.selected),t){case"detail":this.isModify=!1,this.selectInfo={},this.showDetail(this.selected[0]);break;case"export":Object(c.h)({data:this.selected.length?this.selected:this.usersArr,columns:this.tableColumn,name:this.$route.query.tab.replace("查看","")+"交账单-"+Object(l.parseTime)(new Date,"{y}{m}{d}{h}{i}{s}")});break;case"print":Object(c.e)({data:this.selected.length?this.selected:this.usersArr,columns:this.tableColumn,name:this.$route.query.tab.replace("查看","")+"交账单"})}this.$refs.multipleTable.clearSelection()},setTable:function(){this.setupTableVisible=!0},closeSetupTable:function(){this.setupTableVisible=!1},clickDetails:function(t,e,i){this.$refs.multipleTable.toggleRowSelection(t)},getSelection:function(t){this.selected=t},getSummaries:function(t){return Object(l.getSummaries)(t,["shipNowpayFee","finishAccount","noSettlementFee"])}}}},MXEa:function(t,e){},QcgQ:function(t,e,i){"use strict";var a={render:function(){var a=this,t=a.$createElement,s=a._self._c||t;return s("el-dialog",{staticClass:"tms_dialog",attrs:{title:"表格设置",visible:a.isShow,"append-to-body":"","close-on-click-modal":!1,"before-close":a.closeMe},on:{"update:visible":function(t){a.isShow=t}}},[s("div",{staticClass:"tableSetup_warp"},[s("div",{staticClass:"tableSetup_list"},[s("div",{staticClass:"tableSetup_head"},[s("div",{staticClass:"tableSetup_head_select"},[a._v("选择："+a._s(a.leftCheckLen))]),a._v(" "),s("el-checkbox",{attrs:{indeterminate:a.isIndeterminateLeft},on:{change:a.handChangeAllLeft},model:{value:a.checkAllLeft,callback:function(t){a.checkAllLeft=t},expression:"checkAllLeft"}},[a._v("隐藏列  "+a._s(a.leftListLen)+" / "+a._s(a.columnListLen))]),a._v(" "),s("div",{staticStyle:{margin:"3px 0"}},[s("el-autocomplete",{staticClass:"inline-input",attrs:{"fetch-suggestions":a.querySearchLeft,placeholder:"请输入内容",size:"mini"},on:{select:a.handleSearchLeft},scopedSlots:a._u([{key:"default",fn:function(t){var e=t.item;return[s("span",[a._v(a._s(e.label))])]}}]),model:{value:a.searchLeft,callback:function(t){a.searchLeft=t},expression:"searchLeft"}},[s("i",{staticClass:"el-icon-search el-input__icon",attrs:{slot:"suffix"},slot:"suffix"})])],1)],1),a._v(" "),s("div",{staticClass:"tableSetup_content"},[s("el-checkbox-group",{on:{change:a.handleCheckChangeLeft},model:{value:a.checkListLeft,callback:function(t){a.checkListLeft=t},expression:"checkListLeft"}},[s("transition-group",{key:a.listKey,attrs:{name:"el-zoom-in-center"}},a._l(a.columnData,function(e,i){return s("div",{key:i,staticClass:"tableSetup_item",on:{dblclick:function(t){a.dbCheckItemLeft(e,i,t)}}},[s("el-checkbox",{attrs:{label:e}},[a._v("\n                "+a._s(e.label)+"\n              ")])],1)}))],1)],1),a._v(" "),s("div",{staticClass:"tableSetup_tips"},[s("span",[a._v("双击，可快速左右切换。")])])]),a._v(" "),s("div",{staticClass:"tableSetup_btn"},[s("el-button",{attrs:{type:"primary",icon:"el-icon-arrow-right"},on:{click:function(t){a.doAction("goRight")}}}),a._v(" "),s("br"),a._v(" "),s("el-button",{attrs:{type:"primary",icon:"el-icon-arrow-left"},on:{click:function(t){a.doAction("goLeft")}}})],1),a._v(" "),s("div",{staticClass:"tableSetup_list"},[s("div",{staticClass:"tableSetup_head"},[s("div",{staticClass:"tableSetup_head_select"},[a._v("选择："+a._s(a.rightCheckLen))]),a._v(" "),s("el-checkbox",{attrs:{indeterminate:a.isIndeterminateRight},on:{change:a.handChangeAllRight},model:{value:a.checkAllRight,callback:function(t){a.checkAllRight=t},expression:"checkAllRight"}},[a._v("显示列 "+a._s(a.rightListLen)+" / "+a._s(a.columnListLen))]),a._v(" "),s("div",{staticStyle:{margin:"3px 0"}},[s("el-autocomplete",{staticClass:"inline-input",attrs:{"fetch-suggestions":a.querySearchRight,placeholder:"请输入内容",size:"mini"},on:{select:a.handleSearchRight},scopedSlots:a._u([{key:"default",fn:function(t){var e=t.item;return[s("span",[a._v(a._s(e.label))])]}}]),model:{value:a.searchRight,callback:function(t){a.searchRight=t},expression:"searchRight"}},[s("i",{staticClass:"el-icon-search el-input__icon",attrs:{slot:"suffix"},slot:"suffix"})])],1)],1),a._v(" "),s("div",{staticClass:"tableSetup_content"},[s("el-checkbox-group",{on:{change:a.handleCheckChangeRight},model:{value:a.checkListRight,callback:function(t){a.checkListRight=t},expression:"checkListRight"}},[s("draggable",{staticClass:"dragArea",attrs:{move:a.canDragStart,list:a.showColumnData}},[s("transition-group",{attrs:{name:"el-zoom-in-center"}},a._l(a.showColumnData,function(e,i){return s("div",{key:i,staticClass:"tableSetup_item",on:{dblclick:function(t){a.dbCheckItemRight(e,i,t)}}},[s("el-checkbox",{attrs:{label:e}},[a._v("\n                  "+a._s(e.label)+"\n                ")]),a._v(" "),s("el-switch",{attrs:{"active-text":e.fixed?"固定":"活动"},on:{change:function(t){a.handleSwitch(e)}},model:{value:e.fixed,callback:function(t){a.$set(e,"fixed",t)},expression:"column.fixed"}})],1)}))],1)],1)],1),a._v(" "),s("div",{staticClass:"tableSetup_tips"},[s("span",[a._v("拖拽，可调整上下顺序。")]),a._v(" "),s("br"),s("span",[a._v("列表最多只能显示"+a._s(a.maxLen)+"个字段。")])])])]),a._v(" "),s("div",{attrs:{slot:"footer"},slot:"footer"},[s("el-button",{attrs:{type:"primary"},on:{click:function(t){a.submitForm()}}},[a._v("确 定")]),a._v(" "),s("el-button",{on:{click:a.closeMe}},[a._v("取 消")])],1)])},staticRenderFns:[]};e.a=a},"Qhr/":function(t,e){},SgVa:function(t,e,i){"use strict";var a={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"tms-pagenation"},[i("span",{staticClass:"page-num",class:{disabled:e.pageNum<=1},on:{click:function(t){e.jumpTo(1)}}},[i("span",{staticClass:"first-page"})]),i("span",{staticClass:"page-num",class:{disabled:e.pageNum<=1},on:{click:function(t){e.jumpTo(e.pageNum-1)}}},[i("span",{staticClass:"prev-page"})]),e._v(" "),i("span",{staticClass:"page-jumper"},[e._v("\n    第\n    "),i("el-input",{ref:"input",staticClass:"el-pagination__editor is-in-pagination",attrs:{min:1,max:e.pages,type:"number",disabled:e.pages<=1},on:{change:e.handleChange,focus:e.handleFocus,blur:e.handleBlur},nativeOn:{keydown:function(t){return e.handleKeyup(t)}},model:{value:e.inputval,callback:function(t){e.inputval="string"==typeof t?t.trim():t},expression:"inputval"}}),e._v(" 页\n  ")],1),e._v("\n  /共 "+e._s(e.pages)+" 页\n  "),i("span",{staticClass:"page-num",class:{disabled:e.pageNum===e.pages},on:{click:function(t){e.jumpTo(e.pageNum+1)}}},[i("span",{staticClass:"next-page"})]),e._v(" "),i("span",{staticClass:"page-num",class:{disabled:e.pageNum===e.pages},on:{click:function(t){e.jumpTo(e.pages)}}},[i("span",{staticClass:"last-page"})]),e._v(" "),i("span",{staticClass:"tms-pagination__sizes"},[i("el-select",{staticClass:"page-select",attrs:{placeholder:"请选择"},on:{change:e.sizesChange},model:{value:e.size,callback:function(t){e.size=t},expression:"size"}},e._l(e.sizes,function(t,e){return i("el-option",{key:e,attrs:{label:t,value:t}})}))],1)])},staticRenderFns:[]};e.a=a},SjYS:function(t,e,i){"use strict";var a=i("seR9"),s=i("msh6");var n=function(t){i("nl9Y")},o=i("VU/8")(a.a,s.a,n,null,null);e.a=o.exports},"VT+v":function(t,e,i){"use strict";e.a={props:{sizes:{type:Array,default:function(){return[100,200,300,400]}},total:{type:Number,default:0}},computed:{pages:function(){return Math.ceil(this.total/this.size)}},watch:{pageNum:function(){this.inputval=this.pageNum},size:function(){this.pageNum=1}},mounted:function(){this.size=this.sizes[0]},data:function(){return{pageNum:1,oldValue:0,inputval:1,oldNum:1,size:100}},methods:{handleFocus:function(t){this.oldValue=t.target.value},sizesChange:function(){this.pageNum=1,this.oldNum=this.pageNum,this.$emit("change",{pageNum:this.pageNum,pageSize:this.size})},changeEvent:function(){this.oldNum!==this.pageNum&&(this.oldNum=this.pageNum,this.$emit("change",{pageNum:this.pageNum,pageSize:this.size}))},handleCurrentChange:function(t){this.pageNum=t,this.changeEvent()},handleSizeChange:function(t){this.size=t,this.changeEvent()},handleChange:function(t){var e=parseInt(t,10);isNaN(e)?this.inputval=1:e<1?this.inputval=1:e>this.pages?this.inputval=this.pages:this.inputval=e},handleBlur:function(t){var e=t.target;this.handleChange(e.value),this.jumpTo(this.inputval)},handleKeyup:function(t){var e=t.keyCode,i=t.target;console.log("page keydown:",e,i),13===e&&this.oldValue&&i.value!==this.oldValue&&(this.handleChange(i.value),this.oldValue="")},jumpTo:function(t){t<1?this.pageNum=1:t>this.pages?this.pageNum=this.pages:this.pageNum=t,this.changeEvent()}}}},WIFf:function(t,e){},dpKv:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i("I01s"),s=i("3F+I"),n=i("VU/8")(a.a,s.a,null,null,null);e.default=n.exports},fyBF:function(t,e,i){"use strict";var a={render:function(){var i=this,t=i.$createElement,a=i._self._c||t;return a("div",{staticClass:"searchAll_lyy"},[a("el-form-item",{staticClass:"zdycx",attrs:{label:"自定义查询"}},[a("el-select",{attrs:{filterable:"",placeholder:"请选择","filter-method":i.querySearchAsync,"popper-class":"zdycx-pop",loading:i.loading},on:{change:i.handleSelect,focus:i.initdata},model:{value:i.datalist,callback:function(t){i.datalist=t},expression:"datalist"}},i._l(i.options4,function(e,t){return a("el-option",{key:t,attrs:{label:e.queryKey,value:e.id}},[i._v("\r\n        "+i._s(e.queryKey)+" "),a("i",{staticClass:"el-icon-circle-close-outline",on:{click:function(t){t.stopPropagation(),t.preventDefault(),i.deleteItem(e.id)}}})])})),i._v(" "),a("el-button",{attrs:{plain:""},on:{click:i.Custom}},[i._v("保存自定义")])],1),i._v(" "),a("addSave",{attrs:{searchObj:i.searchObj,popVisible:i.popVisible},on:{close:i.closeAddDot,success:i.fetchAllloadAll}})],1)},staticRenderFns:[]};e.a=a},msh6:function(t,e,i){"use strict";var a={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("el-dialog",{staticClass:"wzl_settleLogSave",attrs:{title:e.popTitle,visible:e.isShow,"close-on-click-modal":!1,"before-close":e.closeMe},on:{close:e.closeMe,"update:visible":function(t){e.isShow=t}}},[i("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.form,rules:e.rules,"label-width":e.formLabelWidth,inline:!0,"label-position":"right",size:"mini"}},[i("el-form-item",{attrs:{label:"名称：",prop:"queryKey"}},[i("input",{directives:[{name:"model",rawName:"v-model.trim",value:e.form.queryKey,expression:"form.queryKey",modifiers:{trim:!0}}],attrs:{maxlength:20,placeholder:"请定义名称"},domProps:{value:e.form.queryKey},on:{input:function(t){t.target.composing||e.$set(e.form,"queryKey",t.target.value.trim())},blur:function(t){e.$forceUpdate()}}})])],1),e._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{type:"primary",disabled:0===e.form.queryKey.length},on:{click:function(t){e.submitForm("ruleForm")}}},[e._v("确 定")]),e._v(" "),i("el-button",{on:{click:e.closeMe}},[e._v("取 消")])],1)],1)},staticRenderFns:[]};e.a=a},nl9Y:function(t,e){},puNT:function(t,e,i){"use strict";var a=i("IAIf"),s=i("QcgQ");var n=function(t){i("MXEa")},o=i("VU/8")(a.a,s.a,n,null,null);e.a=o.exports},q4No:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i("K3o+"),s=i("803T");var n=function(t){i("WIFf")},o=i("VU/8")(a.a,s.a,n,null,null);e.default=o.exports},seR9:function(t,e,i){"use strict";var a=i("mvHQ"),s=i.n(a),n=i("t5DY"),o=i("0xDb");e.a={computed:{isShow:{get:function(){return this.popVisible},set:function(){}}},components:{},props:{popVisible:{type:Boolean,default:!1},dotInfo:[Object,Array],searchQuery:[Object,Array],isDepMain:{type:Boolean,default:!1},createrId:[Number,String],isModify:{type:Boolean,default:!1},isAccept:{type:Boolean,default:!1},proptitle:String,searchObj:{type:[Array,Object],default:function(){}}},data:function(){return{form:{userId:"",orgId:"",menuCode:"",queryKey:"",queryContent:""},searchCreatTime:+new Date,pickOption2:"",formLabelWidth:"75px",tooltip:!1,rules:{},queryKey:"",checked1:!0,popTitle:"自定义标签",loading:!1,type:""}},mounted:function(){},watch:{orgid:function(t){this.form.orgid=t},popVisible:function(t){t&&(this.form.userId=this.otherinfo.userId,this.form.orgId=this.otherinfo.orgid,this.form.menuCode=this.$route.meta.code)}},methods:{reset:function(){this.$refs.ruleForm.resetFields()},closeMe:function(t){this.$emit("close"),this.reset(),"function"==typeof t&&t()},submitForm:function(t){var i=this;this.loading||this.$refs[t].validate(function(t){if(!t)return!1;i.loading=!0,i.form.queryContent=s()(i.searchObj);var e=Object(o.objectMerge2)({},i.form);console.log("addSave_data",e),Object(n.m)(e).then(function(t){i.loading=!1,i.$message({message:"保存成功~",type:"success"}),i.closeMe(),i.$emit("success")}).catch(function(t){i.loading=!1,i.$message.warning(t.text)})})}}}},us2a:function(t,e,i){"use strict";var a=i("t5DY"),s=i("SjYS");e.a={components:{addSave:s.a},props:{searchObj:{type:[Object,Array]},value:[String,Number]},data:function(){return{isModify:!1,popVisible:!1,setupTableVisible:!1,dataset:[],datalist:"",timeout:null,loading:!1,options4:[],querySearch:{currentPage:1,pageSize:10,vo:{orgId:"",userId:"",menuCode:""}}}},watch:{value:function(t){console.log("nnn:",t),""===t&&(this.datalist="")},searchObj:{handler:function(t,e){this.$nextTick(function(){console.log("searchAll_cval",t,e)})},deep:!0}},mounted:function(){},methods:{initdata:function(){var e=this;this.inited||(this.inited=!0,this.loading=!0,this.fetchAllloadAll().then(function(t){e.loading=!1}))},deleteItem:function(t){var e=this;Object(a.a)(t).then(function(t){e.fetchAllloadAll()}).catch(function(t){e._handlerCatchMsg(t)})},Custom:function(){this.isModify=!0,this.popVisible=!0},closeAddDot:function(){this.popVisible=!1},fetchAllloadAll:function(){var e=this;return this.querySearch.vo.orgId=this.otherinfo.orgid,this.querySearch.vo.userId=this.otherinfo.userId,this.querySearch.vo.menuCode=this.$route.meta.code,Object(a.l)(this.querySearch).then(function(t){e.dataset=t.list,e.options4=t.list})},querySearchAsync:function(t,e){var i=this.dataset,a=t?i.filter(this.createStateFilter(t)):i;e(this.options4=a)},createStateFilter:function(e){return function(t){return 0===t.queryKey.toLowerCase().indexOf(e.toLowerCase())}},handleSelect:function(e){var t=this.options4.filter(function(t){return t.id===e});if(t.length){var i=t[0].queryContent,a=JSON.parse(i);this.$emit("change",JSON.parse(i.replace(/'/g,'"'))),this.$emit("dataObj",a)}}}}}});
//# sourceMappingURL=85.db3a8a1523dee82c350e.js.map