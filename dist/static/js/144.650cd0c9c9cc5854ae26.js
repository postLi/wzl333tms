webpackJsonp([144,248],{"1onU":function(t,e,i){"use strict";var a=i("VT+v"),s=i("SgVa");var n=function(t){i("FiTa"),i("7CJ8")},o=i("VU/8")(a.a,s.a,n,"data-v-4b7ed4df",null);e.a=o.exports},"7CJ8":function(t,e){},FiTa:function(t,e){},IAIf:function(t,e,i){"use strict";var a=i("woOf"),l=i.n(a),s=i("DAYN"),n=i.n(s),c=i("0xDb"),r=i("t5DY");e.a={props:{popVisible:{type:Boolean,default:!1},columns:{type:Array,default:[]},code:{type:String,default:""}},components:{draggable:n.a},computed:{isShow:{get:function(){return this.popVisible},set:function(){}}},data:function(){return{orgColumnData:[],columnData:[],orgShowColumnData:[],showColumnData:[],list:[],rightList:[],listKey:0,isIndeterminateLeft:!0,isIndeterminateRight:!0,checkAllLeft:!1,checkAllRight:!1,checkListLeft:[],checkListRight:[],searchLeft:"",searchRight:"",leftListLen:0,rightListLen:0,columnListLen:0,isCheck:!0,maxLen:50,rightCheckLen:0,leftCheckLen:0,thecode:""}},mounted:function(){var a=this,t=this.code;this.$route.meta.code;"NOSET"===t?this.convertData():t?this.thecode=t:this.convertData(),this.thecode&&(this.fetchTableSetup(),this.eventBus.$on("tablesetup.change",function(t,e){if(t&&t===a.thecode){var i=a.showColumnData.filter(function(t){return t.prop===e.prop});i.length&&(i[0].width=e.width,a.changeTbaleSetup())}}))},methods:{convertData:function(t){this.initData(t),this.callback()},initData:function(e){e=e||this.columns;var o=this.maxLen,t=function(t){var s=[];if(0<e.length){var n=0;e.forEach(function(t,e){if(t.hidden){var i=Object(c.objectMerge2)(t);i.key=e,s.push(i)}else n++;if(o<n){var a=Object(c.objectMerge2)(t);a.key=e,a.hidden=!0,s.push(a)}})}return s},i=function(t){var a=[];if(0<e.length){var s=0;e.forEach(function(t,e){if(!t.hidden&&s<o){s++;var i=Object(c.objectMerge2)(t);i.hidden=!1,i.key=e,a.push(i)}})}return a},a=t().length,s=i().length;this.orgColumnData=t(),this.columnData=t(),this.orgShowColumnData=i(),this.showColumnData=i(),this.leftListLen=a,this.rightListLen=s,this.columnListLen=e.length},sort:function(t){return t.sort(function(t,e){return t.key-e.key})},doAction:function(t){switch(t){case"goRight":this.goRight();break;case"goLeft":this.goLeft()}},fetchFail:function(){this.thecode="",this.convertData()},fetchTableSetup:function(){var o=this;return Object(r.g)(this.otherinfo.orgid,this.thecode).then(function(t){var e=t.data;if((o.orgdata=e)&&e.length){1===e.length&&(e=e[0]),o.orgdata=e;var s=[],n=o.columns.length;e.sort(function(t,e){return t.titleOrder>e.titleOrder?1:-1}),e.forEach(function(t){t.label=t.label||t.lable;for(var e=l()({},t),i=0;i<n;i++)if(o.columns[i].prop===t.prop){for(var a in o.columns[i])void 0!==e[a]&&null!==e[a]||(e[a]=o.columns[i][a]);break}s.push(e)}),o.columns.forEach(function(e){0===s.filter(function(t){return t.prop===e.prop}).length&&s.push(e)}),s.sort(function(t,e){return t.fixed?-1:0}),o.convertData(s)}else o.fetchFail()}).catch(function(t){o.fetchFail()})},changeTbaleSetup:function(){var e=this;if(this.thecode)return Object(r.n)(this.otherinfo.orgid,this.thecode,this.formatColumn(this.showColumnData)).then(function(t){e.$message.info("保存成功")}).catch(function(t){e._handlerCatchMsg(t)})},formatColumn:function(t){var n=this.orgdata,o=[],l=0;return t.forEach(function(e){var t=n.filter(function(t){return t.prop===e.prop});if(t.length){var i={},a=t[0];for(var s in a)i[s]=e[s];i.hidden=!1,i.titleOrder=++l,o.push(i)}}),this.columnData.forEach(function(e){var t=n.filter(function(t){return t.prop===e.prop});if(t.length){var i={},a=t[0];for(var s in a)i[s]=e[s];i.hidden=!0,i.titleOrder=++l,o.push(i)}}),o},checkRightLen:function(){this.showColumnData.length>this.maxLen?(this.$message({type:"warning",message:"列表最多只能显示"+this.maxLen+"个字段。"}),this.isCheck=!0):this.isCheck=!1},canDragStart:function(t){},setColumnLen:function(){this.leftListLen=this.columnData.length,this.rightListLen=this.showColumnData.length},handChangeAllLeft:function(t){this.checkListLeft=t?l()([],this.columnData):[],this.leftCheckLen=this.checkListLeft.length,this.isIndeterminateLeft=!1},handChangeAllRight:function(t){this.checkListRight=t?l()([],this.showColumnData):[],this.rightCheckLen=this.checkListRight.length,this.isIndeterminateRight=!1},goRight:function(){var e=this;if(this.checkListLeft.length+this.rightListLen>this.maxLen||this.rightListLen>this.maxLen-1)return this.$message({type:"warning",message:"列表最多只能显示"+this.maxLen+"个字段。"}),!1;this.columnData=this.columnData.filter(function(t){return-1===e.checkListLeft.indexOf(t)||(e.showColumnData.push(t),!1)}),this.orgColumnData=this.orgColumnData.filter(function(t){return-1===e.checkListLeft.indexOf(t)||(e.orgShowColumnData.push(t),!1)}),this.checkListLeft=[],this.setColumnLen(),this.leftCheckLen=0},goLeft:function(){var a=this;this.checkListRight.forEach(function(t,e){a.columnData.push(t),a.orgColumnData.push(t);var i=a.showColumnData.indexOf(t);-1!==i&&a.showColumnData.splice(i,1),-1!==a.orgShowColumnData.indexOf(t)&&a.orgShowColumnData.splice(i,1)}),this.sort(this.columnData),this.checkListRight=[],this.setColumnLen(),this.rightCheckLen=0},dbCheckItemLeft:function(t,e,i){if(this.rightListLen>this.maxLen-1)return this.$message({type:"warning",message:"列表最多只能显示"+this.maxLen+"个字段。"}),!1;this.showColumnData.push(t),this.orgShowColumnData.push(t),this.columnData.splice(e,1),this.orgColumnData.splice(e,1),this.setColumnLen()},dbCheckItemRight:function(t,e,i){this.columnData.push(t),this.orgColumnData.push(t),this.showColumnData.splice(e,1),this.orgShowColumnData.splice(e,1),this.setColumnLen(),this.sort(this.columnData)},handleCheckChangeLeft:function(t){this.leftCheckLen=t.length},handleCheckChangeRight:function(t){this.rightCheckLen=t.length},querySearchLeft:function(t,e){void 0===(this.searchLeft=t).label&&(this.searchLeft||(this.columnData=l()([],this.orgColumnData)));var i=l()([],this.orgColumnData);e(t?i.filter(this.createFilter(t)):i)},querySearchRight:function(t,e){void 0===(this.searchRight=t).label&&(this.searchRight||(this.showColumnData=l()([],this.orgShowColumnData)));var i=l()([],this.orgShowColumnData);e(t?i.filter(this.createFilter(t)):i)},createFilter:function(e){return function(t){return 0===t.label.toLowerCase().indexOf(e.toLowerCase())}},handleSearchLeft:function(t){var e=this;this.searchLeft=t?t.label:"";var i=l()([],this.columnData);i.forEach(function(t){t.label===e.searchLeft&&(i=[]).push(t)}),this.columnData=l()([],i),i=[]},handleSearchRight:function(t){var e=this;this.searchRight=t?t.label:"";var i=l()([],this.showColumnData);i.forEach(function(t){t.label===e.searchRight&&(i=[]).push(t)}),this.showColumnData=l()([],i),i=[]},closeMe:function(t){this.$emit("close"),"function"==typeof t&&t()},handleChange:function(t,e,i){this.rightList=l()([],t)},handleSwitch:function(t,e){console.log("handleSwitch",t);var i=0,a=!1;this.showColumnData.forEach(function(t,e){t.fixed&&!a?i=e:a=!0}),t.fixed?(this.showColumnData.splice(e,1),this.showColumnData.splice(i,0,t),t.fixed=!1):(console.log("find:",i,e),this.showColumnData.splice(i+1,0,t),this.showColumnData.splice(e+1,1),t.fixed=!0)},callback:function(){var t=l()([],this.showColumnData);t.forEach(function(t){!t.label&&t.lable&&(t.label=t.lable)}),this.$emit("success",t),this.listKey=Math.random(),this.closeMe()},submitForm:function(){var e=this;this.thecode?this.changeTbaleSetup().then(function(t){e.callback()}):this.callback()}}}},MXEa:function(t,e){},O67y:function(t,e,i){"use strict";var s=i("E4LH"),a=i("o9X6"),n=i("9UCZ"),o=i("0xDb");e.a={components:{SelectTree:a.a,SelectType:n.a},props:{btnsize:{type:String,default:"mini"},orgid:{type:Number},issender:{type:Boolean,dafault:!1},isAllOrg:{type:Boolean}},computed:{},data:function(){var a=this;return{searchCreatTime:[],defaultTime:[Object(o.parseTime)(+new Date-5184e6,"{y}-{m}-{d}"),Object(o.parseTime)(new Date,"{y}-{m}-{d}")],searchForm:{orgId:"",shipSn:"",abnormalStatus:117,registerTime:"",statu:"",number:"",startcity:"",endcity:"",sendpepole:"",recivepepole:""},rules:{mobile:[{validator:function(t,e,i){a.searchForm.mobile=e.replace(s.a.NO_NUMBER,""),i()},trigger:"change"}]},pickerOptions2:{shortcuts:o.pickerOptions2}}},watch:{orgid:function(t){this.searchForm.orgId=t}},mounted:function(){this.searchForm.orgId=this.orgid,this.searchCreatTime=this.defaultTime,this.onSubmit()},methods:{getOrgid:function(t){this.searchForm.orgId=t},onSubmit:function(){this.searchForm.startTime=this.searchCreatTime?Object(o.parseTime)(this.searchCreatTime[0],"{y}-{m}-{d} ")+"00:00:00":"",this.searchForm.endTime=this.searchCreatTime?Object(o.parseTime)(this.searchCreatTime[1],"{y}-{m}-{d} ")+"23:59:59":"",this.$emit("change",this.searchForm)},clearForm:function(){this.searchForm.shipSn="",this.searchCreatTime=this.defaultTime,this.searchForm.orgId=this.orgid,this.searchForm.abnormalStatus=""}}}},OLIy:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i("R4xs"),s=i("zQiv"),n=i("VU/8")(a.a,s.a,null,null,null);e.default=n.exports},OwoJ:function(t,e,i){"use strict";var a={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("el-form",{staticClass:"staff_searchinfo clearfix",attrs:{inline:!0,size:e.btnsize,"label-position":"right",rules:e.rules,model:e.searchForm,"label-width":"70px"}},[i("div",{staticClass:"staff_searchinfo--input"},[i("el-form-item",{attrs:{label:"登记时间"}},[i("div",{staticClass:"block"},[i("el-date-picker",{attrs:{"default-value":e.defaultTime,type:"daterange",align:"right","value-format":"yyyy-MM-dd","start-placeholder":"开始日期","picker-options":e.pickerOptions2,"end-placeholder":"结束日期"},model:{value:e.searchCreatTime,callback:function(t){e.searchCreatTime=t},expression:"searchCreatTime"}})],1)]),e._v(" "),i("el-form-item",{attrs:{label:"运单号"}},[i("el-input",{attrs:{maxlength:20,"auto-complete":"off",clearable:""},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.onSubmit(t):null}},model:{value:e.searchForm.shipSn,callback:function(t){e.$set(e.searchForm,"shipSn",t)},expression:"searchForm.shipSn"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"登记网点"}},[e.isAllOrg?i("SelectTree",{attrs:{type:"org_id"},model:{value:e.searchForm.orgId,callback:function(t){e.$set(e.searchForm,"orgId",t)},expression:"searchForm.orgId"}}):i("SelectTree",{attrs:{type:"org_id",orgid:e.otherinfo.orgid},model:{value:e.searchForm.orgId,callback:function(t){e.$set(e.searchForm,"orgId",t)},expression:"searchForm.orgId"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"异常状态"}},[i("selectType",{attrs:{type:"abnormal_status"},model:{value:e.searchForm.abnormalStatus,callback:function(t){e.$set(e.searchForm,"abnormalStatus",t)},expression:"searchForm.abnormalStatus"}})],1)],1),e._v(" "),i("el-form-item",{staticClass:"staff_searchinfo--btn"},[i("el-button",{attrs:{type:"primary"},on:{click:e.onSubmit}},[e._v("查询")]),e._v(" "),i("el-button",{attrs:{type:"info",plain:""},on:{click:e.clearForm}},[e._v("清空")])],1)],1)},staticRenderFns:[]};e.a=a},QcgQ:function(t,e,i){"use strict";var a={render:function(){var a=this,t=a.$createElement,s=a._self._c||t;return s("el-dialog",{staticClass:"tms_dialog",attrs:{title:"表格设置",visible:a.isShow,"append-to-body":"","close-on-click-modal":!1,"before-close":a.closeMe},on:{"update:visible":function(t){a.isShow=t}}},[s("div",{staticClass:"tableSetup_warp"},[s("div",{staticClass:"tableSetup_list"},[s("div",{staticClass:"tableSetup_head"},[s("div",{staticClass:"tableSetup_head_select"},[a._v("选择："+a._s(a.leftCheckLen))]),a._v(" "),s("el-checkbox",{attrs:{indeterminate:a.isIndeterminateLeft},on:{change:a.handChangeAllLeft},model:{value:a.checkAllLeft,callback:function(t){a.checkAllLeft=t},expression:"checkAllLeft"}},[a._v("隐藏列  "+a._s(a.leftListLen)+" / "+a._s(a.columnListLen))]),a._v(" "),s("div",{staticStyle:{margin:"3px 0"}},[s("el-autocomplete",{staticClass:"inline-input",attrs:{"fetch-suggestions":a.querySearchLeft,placeholder:"请输入内容",size:"mini"},on:{select:a.handleSearchLeft},scopedSlots:a._u([{key:"default",fn:function(t){var e=t.item;return[s("span",[a._v(a._s(e.label))])]}}]),model:{value:a.searchLeft,callback:function(t){a.searchLeft=t},expression:"searchLeft"}},[s("i",{staticClass:"el-icon-search el-input__icon",attrs:{slot:"suffix"},slot:"suffix"})])],1)],1),a._v(" "),s("div",{staticClass:"tableSetup_content"},[s("el-checkbox-group",{on:{change:a.handleCheckChangeLeft},model:{value:a.checkListLeft,callback:function(t){a.checkListLeft=t},expression:"checkListLeft"}},[s("transition-group",{key:a.listKey,attrs:{name:"el-zoom-in-center"}},a._l(a.columnData,function(e,i){return s("div",{key:i,staticClass:"tableSetup_item",on:{dblclick:function(t){a.dbCheckItemLeft(e,i,t)}}},[s("el-checkbox",{attrs:{label:e}},[a._v("\n                "+a._s(e.label)+"\n              ")])],1)}))],1)],1),a._v(" "),s("div",{staticClass:"tableSetup_tips"},[s("span",[a._v("双击，可快速左右切换。")])])]),a._v(" "),s("div",{staticClass:"tableSetup_btn"},[s("el-button",{attrs:{type:"primary",icon:"el-icon-arrow-right"},on:{click:function(t){a.doAction("goRight")}}}),a._v(" "),s("br"),a._v(" "),s("el-button",{attrs:{type:"primary",icon:"el-icon-arrow-left"},on:{click:function(t){a.doAction("goLeft")}}})],1),a._v(" "),s("div",{staticClass:"tableSetup_list"},[s("div",{staticClass:"tableSetup_head"},[s("div",{staticClass:"tableSetup_head_select"},[a._v("选择："+a._s(a.rightCheckLen))]),a._v(" "),s("el-checkbox",{attrs:{indeterminate:a.isIndeterminateRight},on:{change:a.handChangeAllRight},model:{value:a.checkAllRight,callback:function(t){a.checkAllRight=t},expression:"checkAllRight"}},[a._v("显示列 "+a._s(a.rightListLen)+" / "+a._s(a.columnListLen))]),a._v(" "),s("div",{staticStyle:{margin:"3px 0"}},[s("el-autocomplete",{staticClass:"inline-input",attrs:{"fetch-suggestions":a.querySearchRight,placeholder:"请输入内容",size:"mini"},on:{select:a.handleSearchRight},scopedSlots:a._u([{key:"default",fn:function(t){var e=t.item;return[s("span",[a._v(a._s(e.label))])]}}]),model:{value:a.searchRight,callback:function(t){a.searchRight=t},expression:"searchRight"}},[s("i",{staticClass:"el-icon-search el-input__icon",attrs:{slot:"suffix"},slot:"suffix"})])],1)],1),a._v(" "),s("div",{staticClass:"tableSetup_content"},[s("el-checkbox-group",{on:{change:a.handleCheckChangeRight},model:{value:a.checkListRight,callback:function(t){a.checkListRight=t},expression:"checkListRight"}},[s("draggable",{staticClass:"dragArea",attrs:{move:a.canDragStart,list:a.showColumnData}},[s("transition-group",{attrs:{name:"el-zoom-in-center"}},a._l(a.showColumnData,function(e,i){return s("div",{key:i,staticClass:"tableSetup_item",on:{dblclick:function(t){a.dbCheckItemRight(e,i,t)}}},[s("el-checkbox",{attrs:{label:e}},[a._v("\n                  "+a._s(e.label)+"\n                ")]),a._v(" "),s("el-switch",{attrs:{value:e.fixed,"active-text":e.fixed?"固定":"活动"},on:{change:function(t){a.handleSwitch(e,i)}}})],1)}))],1)],1)],1),a._v(" "),s("div",{staticClass:"tableSetup_tips"},[s("span",[a._v("拖拽，可调整上下顺序。")]),a._v(" "),s("br"),s("span",[a._v("列表最多只能显示"+a._s(a.maxLen)+"个字段。")])])])]),a._v(" "),s("div",{attrs:{slot:"footer"},slot:"footer"},[s("el-button",{attrs:{type:"primary"},on:{click:function(t){a.submitForm()}}},[a._v("确 定")]),a._v(" "),s("el-button",{on:{click:a.closeMe}},[a._v("取 消")])],1)])},staticRenderFns:[]};e.a=a},R4xs:function(t,e,i){"use strict";var a=i("woOf"),s=i.n(a),n=i("//Fk"),o=i.n(n),l=i("Dd8w"),c=i.n(l),r=i("l+20"),h=i("Tv76"),u=i("NYxO"),d=i("puNT"),f=i("1onU"),p=i("rYeu"),m=i("0xDb"),g=i("UQm2");e.a={components:{SearchForm:r.default,Pager:f.a,TableSetup:d.a,Addabnormal:p.default},computed:c()({},Object(u.b)(["otherinfo"]),{orgid:function(){return this.isModify?this.selectInfo.orgid:this.searchQuery.vo.orgid||this.otherinfo.orgid}}),mounted:function(){var e=this;this.loading=!0,this.searchQuery.vo.orgId=this.otherinfo.orgid,o.a.all([this.fetchAllreceipt(this.otherinfo.orgid)]).then(function(t){e.loading=!1})},data:function(){var e=this;return{btnsize:"mini",component:"Send",selectInfo:{},loading:!0,dataset:[],isModify:!1,isCheck:!1,AddAbnormalVisible:!1,setupTableVisible:!1,tablekey:0,isDbclick:!1,licenseTypes:[],selected:[],total:0,id:"",searchQuery:{currentPage:1,pageSize:100,vo:{}},tableColumn:[{label:"序号",prop:"id",width:"60",fixed:!0,slot:function(t){return(e.searchQuery.currentPage-1)*e.searchQuery.pageSize+t.$index+1}},{label:"运单号",prop:"shipSn",width:"120",fixed:!0},{label:"异常编号",prop:"abnormalNo",width:"120",fixed:!0},{label:"登记时间",prop:"registerTime",width:"165",slot:function(t){return""+Object(m.parseTime)(t.row.registerTime,"{y}-{m}-{d} {h}:{i}:{s}")},fixed:!1},{label:"开单时间",prop:"createTime",width:"165",slot:function(t){return""+Object(m.parseTime)(t.row.createTime,"{y}-{m}-{d} {h}:{i}:{s}")},fixed:!1},{label:"货品名",prop:"cargoName",width:"120",fixed:!1},{label:"异常状态",prop:"abnormalStatusName",width:"90",fixed:!1},{label:"异常类型",prop:"abnormalTypeName",width:"120",fixed:!1},{label:"登记网点",prop:"orgName",width:"120",fixed:!1},{label:"责任网点",prop:"dutyOrgName",width:"120",fixed:!1},{label:"登记人",prop:"registerName",width:"120",fixed:!1},{label:"登记金额",prop:"registerFee",width:"120",fixed:!1},{label:"异常件数",prop:"abnormalAmount",width:"120",fixed:!1},{label:"货号",prop:"shipGoodsSn",width:"120",fixed:!1},{label:"包装",prop:"cargoPack",width:"80",fixed:!1},{label:"件数",prop:"cargoAmount",width:"80",fixed:!1},{label:"异常描述",prop:"abnormalDescribe",width:"120",fixed:!1},{label:"处理结果",prop:"disposeResultName",width:"120",fixed:!1},{label:"处理网点",prop:"disposeOrgName",width:"120",fixed:!1},{label:"处理人",prop:"disposeName",width:"90",fixed:!1},{label:"处理意见",prop:"disposeOpinion",width:"120",fixed:!1}]}},methods:{fetchAllreceipt:function(){var e=this;return this.loading=!0,Object(h.e)(this.searchQuery).then(function(t){e.dataset=t.list,e.total=t.total,e.loading=!1}).catch(function(t){e.loading=!1,e._handlerCatchMsg(t)})},handlePageChange:function(t){this.searchQuery.currentPage=t.pageNum,this.searchQuery.pageSize=t.pageSize,this.fetchData()},fetchData:function(){this.fetchAllreceipt()},getSearchParam:function(t){this.searchQuery.currentPage=this.$options.data().searchQuery.currentPage,this.searchQuery.pageSize=this.$options.data().searchQuery.pageSize,Object(m.objectMerge2)(this.searchQuery.vo,t),this.fetchData()},doAction:function(t){var e=this;if(0===this.selected.length&&"reg"!==t&&"export"!==t)return this.$message({message:"请选择要操作的项~",type:"warning"}),!1;switch(t){case"export":Object(g.h)({data:this.selected.length?this.selected:this.dataset,columns:this.tableColumn,name:"异常登记"});break;case"reg":this.isModify=!1,this.isCheck=!1,this.selectInfo={},this.openAddAbnormal();break;case"xiugai":1<this.selected.length?this.$message({message:"每次只能修改单条数据",type:"warning"}):118===this.selected[0].abnormalStatus?(this.selectInfo={},this.isModify=!0,this.isCheck=!1,this.selectInfo=s()({},this.selected[0]),this.openAddAbnormal()):119===this.selected[0].abnormalStatus&&this.$message.warning("异常已经处理，不允许修改~");break;case"check":1<this.selected.length?this.$message({message:"每次自能查看单条数据",type:"warning"}):(this.isModify=!1,this.isCheck=!0,this.selectInfo=s()({},this.selected[0]),this.openAddAbnormal());break;case"delete":var i=1<this.selected.length?this.selected.length+"名":this.selected[0].id,a=this.selected.map(function(t){return t.id});if(118===this.selected[0].abnormalStatus)this.$confirm("确定要删除 "+i+" 订单异常信息吗？","提示",{confirmButtonText:"删除",cancelButtonText:"取消",type:"warning"}).then(function(){e.loading=!0,Object(h.i)(a).then(function(t){e.$message({type:"success",message:"删除成功!"}),e.fetchData(),e.loading=!1}).catch(function(t){e._handlerCatchMsg(t)})}).catch(function(){e.$message({type:"info",message:"已取消删除"})});else if(119===this.selected[0].abnormalStatus)return this.$message.warning("异常已处理，不允许删除"),!1}this.$refs.multipleTable.clearSelection()},openAddAbnormal:function(){this.AddAbnormalVisible=!0},closeAddAbnormal:function(){this.AddAbnormalVisible=!1},clickDetails:function(t,e,i){this.$refs.multipleTable.toggleRowSelection(t)},getSelection:function(t){this.selected=t},setTable:function(){this.setupTableVisible=!0},closeSetupTable:function(){this.setupTableVisible=!1},setColumn:function(t){this.tableColumn=t,this.tablekey=Math.random()},getDbClick:function(t,e){console.log("detail",t),this.selectInfo=t,this.isCheck=!0,this.isModify=!1,this.openAddAbnormal()}}}},SgVa:function(t,e,i){"use strict";var a={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"tms-pagenation"},[i("span",{staticClass:"page-num",class:{disabled:e.pageNum<=1},on:{click:function(t){e.jumpTo(1)}}},[i("span",{staticClass:"first-page"})]),i("span",{staticClass:"page-num",class:{disabled:e.pageNum<=1},on:{click:function(t){e.jumpTo(e.pageNum-1)}}},[i("span",{staticClass:"prev-page"})]),e._v(" "),i("span",{staticClass:"page-jumper"},[e._v("\n    第\n    "),i("el-input",{ref:"input",staticClass:"el-pagination__editor is-in-pagination",attrs:{min:1,max:e.pages,type:"number",disabled:e.pages<=1},on:{change:e.handleChange,focus:e.handleFocus,blur:e.handleBlur},nativeOn:{keydown:function(t){return e.handleKeyup(t)}},model:{value:e.inputval,callback:function(t){e.inputval="string"==typeof t?t.trim():t},expression:"inputval"}}),e._v(" 页\n  ")],1),e._v("\n  /共 "+e._s(e.pages)+" 页\n  "),i("span",{staticClass:"page-num",class:{disabled:e.pageNum===e.pages},on:{click:function(t){e.jumpTo(e.pageNum+1)}}},[i("span",{staticClass:"next-page"})]),e._v(" "),i("span",{staticClass:"page-num",class:{disabled:e.pageNum===e.pages},on:{click:function(t){e.jumpTo(e.pages)}}},[i("span",{staticClass:"last-page"})]),e._v(" "),i("span",{staticClass:"tms-pagination__sizes"},[i("el-select",{staticClass:"page-select",attrs:{placeholder:"请选择"},on:{change:e.sizesChange},model:{value:e.size,callback:function(t){e.size=t},expression:"size"}},e._l(e.sizes,function(t,e){return i("el-option",{key:e,attrs:{label:t,value:t}})}))],1)])},staticRenderFns:[]};e.a=a},"VT+v":function(t,e,i){"use strict";e.a={props:{sizes:{type:Array,default:function(){return[100,200,300,400]}},total:{type:Number,default:0}},computed:{pages:function(){return Math.ceil(this.total/this.size)}},watch:{pageNum:function(){this.inputval=this.pageNum},size:function(){this.pageNum=1}},mounted:function(){this.size=this.sizes[0]},data:function(){return{pageNum:1,oldValue:0,inputval:1,oldNum:1,size:100}},methods:{handleFocus:function(t){this.oldValue=t.target.value},sizesChange:function(){this.pageNum=1,this.oldNum=this.pageNum,this.$emit("change",{pageNum:this.pageNum,pageSize:this.size})},changeEvent:function(){this.oldNum!==this.pageNum&&(this.oldNum=this.pageNum,this.$emit("change",{pageNum:this.pageNum,pageSize:this.size}))},handleCurrentChange:function(t){this.pageNum=t,this.changeEvent()},handleSizeChange:function(t){this.size=t,this.changeEvent()},handleChange:function(t){var e=parseInt(t,10);isNaN(e)?this.inputval=1:e<1?this.inputval=1:e>this.pages?this.inputval=this.pages:this.inputval=e},handleBlur:function(t){var e=t.target;this.handleChange(e.value),this.jumpTo(this.inputval)},handleKeyup:function(t){var e=t.keyCode,i=t.target;console.log("page keydown:",e,i),13===e&&this.oldValue&&i.value!==this.oldValue&&(this.handleChange(i.value),this.oldValue="")},jumpTo:function(t){t<1?this.pageNum=1:t>this.pages?this.pageNum=this.pages:this.pageNum=t,this.changeEvent()}}}},eZUk:function(t,e){},"l+20":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i("O67y"),s=i("OwoJ");var n=function(t){i("eZUk")},o=i("VU/8")(a.a,s.a,n,null,null);e.default=o.exports},puNT:function(t,e,i){"use strict";var a=i("IAIf"),s=i("QcgQ");var n=function(t){i("MXEa")},o=i("VU/8")(a.a,s.a,n,null,null);e.a=o.exports},zQiv:function(t,e,i){"use strict";var a={render:function(){var a=this,t=a.$createElement,s=a._self._c||t;return s("div",{directives:[{name:"loading",rawName:"v-loading",value:a.loading,expression:"loading"}],staticClass:"tab-content"},[s("SearchForm",{attrs:{orgid:a.otherinfo.orgid,btnsize:a.btnsize},on:{change:a.getSearchParam}}),a._v(" "),s("div",{staticClass:"tab_info"},[s("div",{staticClass:"btns_box"},[s("el-button",{directives:[{name:"has",rawName:"v-has:ABNO_ADD",arg:"ABNO_ADD"}],attrs:{type:"primary",size:a.btnsize,icon:"el-icon-circle-plus",plain:""},on:{click:function(t){a.doAction("reg")}}},[a._v("异常登记")]),a._v(" "),s("el-button",{directives:[{name:"has",rawName:"v-has:ABNO_PUT",arg:"ABNO_PUT"}],attrs:{type:"primary",size:a.btnsize,icon:"el-icon-edit",plain:""},on:{click:function(t){a.doAction("xiugai")}}},[a._v("异常修改")]),a._v(" "),s("el-button",{directives:[{name:"has",rawName:"v-has:ABNO_SELECT",arg:"ABNO_SELECT"}],attrs:{type:"primary",size:a.btnsize,icon:"el-icon-news",plain:""},on:{click:function(t){a.doAction("check")}}},[a._v("查看明细")]),a._v(" "),s("el-button",{directives:[{name:"has",rawName:"v-has:ABNO_DEL",arg:"ABNO_DEL"}],attrs:{type:"danger",size:a.btnsize,icon:"el-icon-delete",plain:""},on:{click:function(t){a.doAction("delete")}}},[a._v("删除")]),a._v(" "),s("el-button",{directives:[{name:"has",rawName:"v-has:ABNO_EXP1",arg:"ABNO_EXP1"}],attrs:{type:"primary",size:a.btnsize,icon:"el-icon-upload2",plain:""},on:{click:function(t){a.doAction("export")}}},[a._v("导出")]),a._v(" "),s("el-button",{staticClass:"table_setup",attrs:{type:"primary",size:a.btnsize,icon:"el-icon-setting",plain:""},on:{click:a.setTable}},[a._v("表格设置")])],1),a._v(" "),s("div",{staticClass:"info_tab"},[s("el-table",{key:a.tablekey,ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:a.dataset,border:"",height:"100%","tooltip-effect":"dark","default-sort":{prop:"id",order:"ascending"},stripe:""},on:{"row-dblclick":a.getDbClick,"row-click":a.clickDetails,"selection-change":a.getSelection}},[s("el-table-column",{attrs:{fixed:"",sortable:"",type:"selection",width:"50"}}),a._v(" "),a._l(a.tableColumn,function(i){return[i.slot?s("el-table-column",{key:i.id,attrs:{fixed:i.fixed,sortable:"",label:i.label,width:i.width},scopedSlots:a._u([{key:"default",fn:function(e){return[i.click?s("span",{staticClass:"clickitem",domProps:{innerHTML:a._s(i.slot(e))},on:{click:function(t){t.stopPropagation(),i.click(e)}}}):s("span",{domProps:{innerHTML:a._s(i.slot(e))}})]}}])}):s("el-table-column",{key:i.id,attrs:{fixed:i.fixed,sortable:"",label:i.label,prop:i.prop,width:i.width}})]})],2)],1),a._v(" "),s("div",{staticClass:"info_tab_footer"},[a._v("共计:"+a._s(a.total)+" "),s("div",{staticClass:"show_pager"},[s("Pager",{attrs:{total:a.total},on:{change:a.handlePageChange}})],1)])]),a._v(" "),s("Addabnormal",{attrs:{issender:!0,isModify:a.isModify,isCheck:a.isCheck,info:a.selectInfo,id:a.id,orgid:a.orgid,companyId:a.otherinfo.companyId,popVisible:a.AddAbnormalVisible},on:{"update:popVisible":function(t){a.AddAbnormalVisible=t},close:a.closeAddAbnormal,success:a.fetchData}}),a._v(" "),s("TableSetup",{attrs:{popVisible:a.setupTableVisible,columns:a.tableColumn},on:{close:a.closeSetupTable,success:a.setColumn}})],1)},staticRenderFns:[]};e.a=a}});