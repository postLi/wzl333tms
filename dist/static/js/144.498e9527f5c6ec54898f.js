webpackJsonp([144,248],{"1onU":function(e,t,i){"use strict";var a=i("VT+v"),s=i("SgVa");var n=function(e){i("FiTa"),i("7CJ8")},o=i("VU/8")(a.a,s.a,n,"data-v-4b7ed4df",null);t.a=o.exports},"7CJ8":function(e,t){},FiTa:function(e,t){},IAIf:function(e,t,i){"use strict";var a=i("woOf"),l=i.n(a),s=i("DAYN"),n=i.n(s),c=i("0xDb"),r=i("t5DY");t.a={props:{popVisible:{type:Boolean,default:!1},columns:{type:Array,default:[]},code:{type:String,default:""}},components:{draggable:n.a},computed:{isShow:{get:function(){return this.popVisible},set:function(){}}},data:function(){return{orgColumnData:[],columnData:[],orgShowColumnData:[],showColumnData:[],list:[],rightList:[],listKey:0,isIndeterminateLeft:!0,isIndeterminateRight:!0,checkAllLeft:!1,checkAllRight:!1,checkListLeft:[],checkListRight:[],searchLeft:"",searchRight:"",leftListLen:0,rightListLen:0,columnListLen:0,isCheck:!0,maxLen:50,rightCheckLen:0,leftCheckLen:0,thecode:""}},mounted:function(){var a=this,e=this.code;this.$route.meta.code;this.thecode="","NOSET"===e?this.convertData():e?this.thecode=e:this.convertData(),this.thecode&&(this.fetchTableSetup(),this.eventBus.$on("tablesetup.change",function(e,t){if(e&&e===a.thecode){var i=a.showColumnData.filter(function(e){return e.prop===t.prop});i.length&&(i[0].width=t.width,a.changeTbaleSetup())}}))},methods:{convertData:function(e){this.initData(e),this.callback()},initData:function(t){t=t||this.columns;var o=this.maxLen,e=function(e){var s=[];if(0<t.length){var n=0;t.forEach(function(e,t){if(e.hidden){var i=Object(c.objectMerge2)(e);i.key=t,s.push(i)}else n++;if(o<n){var a=Object(c.objectMerge2)(e);a.key=t,a.hidden=!0,s.push(a)}})}return s},i=function(e){var a=[];if(0<t.length){var s=0;t.forEach(function(e,t){if(!e.hidden&&s<o){s++;var i=Object(c.objectMerge2)(e);i.hidden=!1,i.key=t,a.push(i)}})}return a},a=e().length,s=i().length;this.orgColumnData=e(),this.columnData=e(),this.orgShowColumnData=i(),this.showColumnData=i(),this.leftListLen=a,this.rightListLen=s,this.columnListLen=t.length},sort:function(e){return e.sort(function(e,t){return e.key-t.key})},doAction:function(e){switch(e){case"goRight":this.goRight();break;case"goLeft":this.goLeft()}},fetchFail:function(){this.thecode="",this.convertData()},fetchTableSetup:function(){var o=this;return Object(r.g)(this.otherinfo.orgid,this.thecode).then(function(e){var t=e.data;if((o.orgdata=t)&&t.length){if(1===t.length&&(t=t[0]),t.length<=1)return console.log("后台返回表格数据异常:",t),o.fetchFail(),!1;o.orgdata=t;var s=[],n=o.columns.length;t.sort(function(e,t){return e.titleOrder>t.titleOrder?1:-1}),t.forEach(function(e){var t=l()({},e);t.label=t.label||t.lable;for(var i=0;i<n;i++)if(o.columns[i].prop===e.prop){for(var a in o.columns[i])void 0!==t[a]&&null!==t[a]||(t[a]=o.columns[i][a]);break}s.push(t)}),o.columns.forEach(function(t){0===s.filter(function(e){return e.prop===t.prop}).length&&(console.log("本地项，需要后台添加：",t),s.push(t))}),s.sort(function(e,t){return e.fixed&&t.fixed?0:e.fixed?-1:0}),o.convertData(s)}else o.fetchFail()}).catch(function(e){o.fetchFail()})},changeTbaleSetup:function(){var t=this;if(this.thecode)return Object(r.n)(this.otherinfo.orgid,this.thecode,this.formatColumn(this.showColumnData)).then(function(e){t.$message.info("保存成功")}).catch(function(e){t._handlerCatchMsg(e)})},formatColumn:function(e){var n=this.orgdata,o=[],l=0;return e.forEach(function(t){var e=n.filter(function(e){return e.prop===t.prop});if(e.length){var i={},a=e[0];for(var s in a)i[s]=t[s];i.hidden=!1,i.titleOrder=++l,o.push(i)}}),this.columnData.forEach(function(t){var e=n.filter(function(e){return e.prop===t.prop});if(e.length){var i={},a=e[0];for(var s in a)i[s]=t[s];i.hidden=!0,i.titleOrder=++l,o.push(i)}}),o},checkRightLen:function(){this.showColumnData.length>this.maxLen?(this.$message({type:"warning",message:"列表最多只能显示"+this.maxLen+"个字段。"}),this.isCheck=!0):this.isCheck=!1},canDragStart:function(e){},setChangeData:function(){this.reRenderData()},reRenderData:function(){var e=Object(c.objectMerge2)([],this.showColumnData);e.sort(function(e,t){return e.fixed&&t.fixed?0:e.fixed?-1:0}),this.showColumnData=e},setColumnLen:function(){this.leftListLen=this.columnData.length,this.rightListLen=this.showColumnData.length},handChangeAllLeft:function(e){this.checkListLeft=e?l()([],this.columnData):[],this.leftCheckLen=this.checkListLeft.length,this.isIndeterminateLeft=!1},handChangeAllRight:function(e){this.checkListRight=e?l()([],this.showColumnData):[],this.rightCheckLen=this.checkListRight.length,this.isIndeterminateRight=!1},goRight:function(){var t=this;if(this.checkListLeft.length+this.rightListLen>this.maxLen||this.rightListLen>this.maxLen-1)return this.$message({type:"warning",message:"列表最多只能显示"+this.maxLen+"个字段。"}),!1;this.columnData=this.columnData.filter(function(e){return-1===t.checkListLeft.indexOf(e)||(e.fixed=!1,t.showColumnData.push(e),!1)}),this.orgColumnData=this.orgColumnData.filter(function(e){return-1===t.checkListLeft.indexOf(e)||(e.fixed=!1,t.orgShowColumnData.push(e),!1)}),this.checkListLeft=[],this.setColumnLen(),this.leftCheckLen=0,this.reRenderData()},goLeft:function(){var a=this;this.checkListRight.forEach(function(e,t){a.columnData.push(e),a.orgColumnData.push(e);var i=a.showColumnData.indexOf(e);-1!==i&&a.showColumnData.splice(i,1),-1!==a.orgShowColumnData.indexOf(e)&&a.orgShowColumnData.splice(i,1)}),this.checkListRight=[],this.setColumnLen(),this.rightCheckLen=0,this.reRenderData()},dbCheckItemLeft:function(e,t,i){if(this.rightListLen>this.maxLen-1)return this.$message({type:"warning",message:"列表最多只能显示"+this.maxLen+"个字段。"}),!1;e.fixed=!1,this.showColumnData.push(e),this.orgShowColumnData.push(e),this.columnData.splice(t,1),this.orgColumnData.splice(t,1),this.setColumnLen(),this.reRenderData()},dbCheckItemRight:function(e,t,i){this.columnData.push(e),this.orgColumnData.push(e),this.showColumnData.splice(t,1),this.orgShowColumnData.splice(t,1),this.setColumnLen(),this.reRenderData()},handleCheckChangeLeft:function(e){this.leftCheckLen=e.length},handleCheckChangeRight:function(e){this.rightCheckLen=e.length},querySearchLeft:function(e,t){void 0===(this.searchLeft=e).label&&(this.searchLeft||(this.columnData=l()([],this.orgColumnData)));var i=l()([],this.orgColumnData);t(e?i.filter(this.createFilter(e)):i)},querySearchRight:function(e,t){void 0===(this.searchRight=e).label&&(this.searchRight||(this.showColumnData=l()([],this.orgShowColumnData)));var i=l()([],this.orgShowColumnData);t(e?i.filter(this.createFilter(e)):i)},createFilter:function(t){return function(e){return 0===e.label.toLowerCase().indexOf(t.toLowerCase())}},handleSearchLeft:function(e){var t=this;this.searchLeft=e?e.label:"";var i=l()([],this.columnData);i.forEach(function(e){e.label===t.searchLeft&&(i=[]).push(e)}),this.columnData=l()([],i),i=[]},handleSearchRight:function(e){var t=this;this.searchRight=e?e.label:"";var i=l()([],this.showColumnData);i.forEach(function(e){e.label===t.searchRight&&(i=[]).push(e)}),this.showColumnData=l()([],i),i=[]},closeMe:function(e){this.$emit("close"),"function"==typeof e&&e()},handleChange:function(e,t,i){this.rightList=l()([],e)},handleSwitch:function(e,t){e.fixed=!e.fixed,this.reRenderData()},callback:function(){var e=l()([],this.showColumnData);e.forEach(function(e){!e.label&&e.lable&&(e.label=e.lable)}),this.$emit("success",e),this.listKey=Math.random(),this.closeMe()},submitForm:function(){var t=this;this.thecode?this.changeTbaleSetup().then(function(e){t.callback()}):this.callback()}}}},MXEa:function(e,t){},O67y:function(e,t,i){"use strict";var s=i("E4LH"),a=i("o9X6"),n=i("9UCZ"),o=i("0xDb");t.a={components:{SelectTree:a.a,SelectType:n.a},props:{btnsize:{type:String,default:"mini"},orgid:{type:Number},issender:{type:Boolean,dafault:!1},isAllOrg:{type:Boolean}},computed:{},data:function(){var a=this;return{searchCreatTime:[],defaultTime:[Object(o.parseTime)(+new Date-5184e6,"{y}-{m}-{d}"),Object(o.parseTime)(new Date,"{y}-{m}-{d}")],searchForm:{orgId:"",shipSn:"",abnormalStatus:117,registerTime:"",statu:"",number:"",startcity:"",endcity:"",sendpepole:"",recivepepole:""},rules:{mobile:[{validator:function(e,t,i){a.searchForm.mobile=t.replace(s.a.NO_NUMBER,""),i()},trigger:"change"}]},pickerOptions2:{shortcuts:o.pickerOptions2}}},watch:{orgid:function(e){this.searchForm.orgId=e}},mounted:function(){this.searchForm.orgId=this.orgid,this.searchCreatTime=this.defaultTime,this.onSubmit()},methods:{getOrgid:function(e){this.searchForm.orgId=e},onSubmit:function(){this.searchForm.startTime=this.searchCreatTime?Object(o.parseTime)(this.searchCreatTime[0],"{y}-{m}-{d} ")+"00:00:00":"",this.searchForm.endTime=this.searchCreatTime?Object(o.parseTime)(this.searchCreatTime[1],"{y}-{m}-{d} ")+"23:59:59":"",this.$emit("change",this.searchForm)},clearForm:function(){this.searchForm.shipSn="",this.searchCreatTime=this.defaultTime,this.searchForm.orgId=this.orgid,this.searchForm.abnormalStatus=""}}}},OLIy:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=i("R4xs"),s=i("zQiv"),n=i("VU/8")(a.a,s.a,null,null,null);t.default=n.exports},OwoJ:function(e,t,i){"use strict";var a={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-form",{staticClass:"staff_searchinfo clearfix",attrs:{inline:!0,size:t.btnsize,"label-position":"right",rules:t.rules,model:t.searchForm,"label-width":"70px"}},[i("div",{staticClass:"staff_searchinfo--input"},[i("el-form-item",{attrs:{label:"登记时间"}},[i("div",{staticClass:"block"},[i("el-date-picker",{attrs:{"default-value":t.defaultTime,type:"daterange",align:"right","value-format":"yyyy-MM-dd","start-placeholder":"开始日期","picker-options":t.pickerOptions2,"end-placeholder":"结束日期"},model:{value:t.searchCreatTime,callback:function(e){t.searchCreatTime=e},expression:"searchCreatTime"}})],1)]),t._v(" "),i("el-form-item",{attrs:{label:"运单号"}},[i("el-input",{attrs:{maxlength:20,"auto-complete":"off",clearable:""},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.onSubmit(e):null}},model:{value:t.searchForm.shipSn,callback:function(e){t.$set(t.searchForm,"shipSn",e)},expression:"searchForm.shipSn"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"登记网点"}},[t.isAllOrg?i("SelectTree",{attrs:{type:"org_id"},model:{value:t.searchForm.orgId,callback:function(e){t.$set(t.searchForm,"orgId",e)},expression:"searchForm.orgId"}}):i("SelectTree",{attrs:{type:"org_id",orgid:t.otherinfo.orgid},model:{value:t.searchForm.orgId,callback:function(e){t.$set(t.searchForm,"orgId",e)},expression:"searchForm.orgId"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"异常状态"}},[i("selectType",{attrs:{type:"abnormal_status"},model:{value:t.searchForm.abnormalStatus,callback:function(e){t.$set(t.searchForm,"abnormalStatus",e)},expression:"searchForm.abnormalStatus"}})],1)],1),t._v(" "),i("el-form-item",{staticClass:"staff_searchinfo--btn"},[i("el-button",{attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v("查询")]),t._v(" "),i("el-button",{attrs:{type:"info",plain:""},on:{click:t.clearForm}},[t._v("清空")])],1)],1)},staticRenderFns:[]};t.a=a},QcgQ:function(e,t,i){"use strict";var a={render:function(){var a=this,e=a.$createElement,s=a._self._c||e;return s("el-dialog",{staticClass:"tms_dialog",attrs:{title:"表格设置",visible:a.isShow,"append-to-body":"","close-on-click-modal":!1,"before-close":a.closeMe},on:{"update:visible":function(e){a.isShow=e}}},[s("div",{staticClass:"tableSetup_warp"},[s("div",{staticClass:"tableSetup_list"},[s("div",{staticClass:"tableSetup_head"},[s("div",{staticClass:"tableSetup_head_select"},[a._v("选择："+a._s(a.leftCheckLen))]),a._v(" "),s("el-checkbox",{attrs:{indeterminate:a.isIndeterminateLeft},on:{change:a.handChangeAllLeft},model:{value:a.checkAllLeft,callback:function(e){a.checkAllLeft=e},expression:"checkAllLeft"}},[a._v("隐藏列  "+a._s(a.leftListLen)+" / "+a._s(a.columnListLen))]),a._v(" "),s("div",{staticStyle:{margin:"3px 0"}},[s("el-autocomplete",{staticClass:"inline-input",attrs:{"fetch-suggestions":a.querySearchLeft,placeholder:"请输入内容",size:"mini"},on:{select:a.handleSearchLeft},scopedSlots:a._u([{key:"default",fn:function(e){var t=e.item;return[s("span",[a._v(a._s(t.label))])]}}]),model:{value:a.searchLeft,callback:function(e){a.searchLeft=e},expression:"searchLeft"}},[s("i",{staticClass:"el-icon-search el-input__icon",attrs:{slot:"suffix"},slot:"suffix"})])],1)],1),a._v(" "),s("div",{staticClass:"tableSetup_content"},[s("el-checkbox-group",{on:{change:a.handleCheckChangeLeft},model:{value:a.checkListLeft,callback:function(e){a.checkListLeft=e},expression:"checkListLeft"}},[s("transition-group",{key:a.listKey,attrs:{name:"el-zoom-in-center"}},a._l(a.columnData,function(t,i){return s("div",{key:i,staticClass:"tableSetup_item",on:{dblclick:function(e){a.dbCheckItemLeft(t,i,e)}}},[s("el-checkbox",{attrs:{label:t}},[a._v("\n                "+a._s(t.label)+"\n              ")])],1)}))],1)],1),a._v(" "),s("div",{staticClass:"tableSetup_tips"},[s("span",[a._v("双击，可快速左右切换。")])])]),a._v(" "),s("div",{staticClass:"tableSetup_btn"},[s("el-button",{attrs:{type:"primary",icon:"el-icon-arrow-right"},on:{click:function(e){a.doAction("goRight")}}}),a._v(" "),s("br"),a._v(" "),s("el-button",{attrs:{type:"primary",icon:"el-icon-arrow-left"},on:{click:function(e){a.doAction("goLeft")}}})],1),a._v(" "),s("div",{staticClass:"tableSetup_list"},[s("div",{staticClass:"tableSetup_head"},[s("div",{staticClass:"tableSetup_head_select"},[a._v("选择："+a._s(a.rightCheckLen))]),a._v(" "),s("el-checkbox",{attrs:{indeterminate:a.isIndeterminateRight},on:{change:a.handChangeAllRight},model:{value:a.checkAllRight,callback:function(e){a.checkAllRight=e},expression:"checkAllRight"}},[a._v("显示列 "+a._s(a.rightListLen)+" / "+a._s(a.columnListLen))]),a._v(" "),s("div",{staticStyle:{margin:"3px 0"}},[s("el-autocomplete",{staticClass:"inline-input",attrs:{"fetch-suggestions":a.querySearchRight,placeholder:"请输入内容",size:"mini"},on:{select:a.handleSearchRight},scopedSlots:a._u([{key:"default",fn:function(e){var t=e.item;return[s("span",[a._v(a._s(t.label))])]}}]),model:{value:a.searchRight,callback:function(e){a.searchRight=e},expression:"searchRight"}},[s("i",{staticClass:"el-icon-search el-input__icon",attrs:{slot:"suffix"},slot:"suffix"})])],1)],1),a._v(" "),s("div",{staticClass:"tableSetup_content"},[s("el-checkbox-group",{on:{change:a.handleCheckChangeRight},model:{value:a.checkListRight,callback:function(e){a.checkListRight=e},expression:"checkListRight"}},[s("draggable",{staticClass:"dragArea",attrs:{move:a.canDragStart,list:a.showColumnData},on:{change:a.setChangeData}},[s("transition-group",{attrs:{name:"el-zoom-in-center"}},a._l(a.showColumnData,function(t,i){return s("div",{key:i,staticClass:"tableSetup_item",on:{dblclick:function(e){a.dbCheckItemRight(t,i,e)}}},[s("el-checkbox",{attrs:{label:t}},[a._v("\n                  "+a._s(t.label)+"\n                ")]),a._v(" "),s("el-switch",{attrs:{value:t.fixed,"active-text":t.fixed?"固定":"活动"},on:{change:function(e){a.handleSwitch(t,i)}}})],1)}))],1)],1)],1),a._v(" "),s("div",{staticClass:"tableSetup_tips"},[s("span",[a._v("拖拽，可调整上下顺序。")]),a._v(" "),s("br"),s("span",[a._v("列表最多只能显示"+a._s(a.maxLen)+"个字段。")])])])]),a._v(" "),s("div",{attrs:{slot:"footer"},slot:"footer"},[s("el-button",{attrs:{type:"primary"},on:{click:function(e){a.submitForm()}}},[a._v("确 定")]),a._v(" "),s("el-button",{on:{click:a.closeMe}},[a._v("取 消")])],1)])},staticRenderFns:[]};t.a=a},R4xs:function(e,t,i){"use strict";var a=i("woOf"),s=i.n(a),n=i("//Fk"),o=i.n(n),l=i("Dd8w"),c=i.n(l),r=i("l+20"),h=i("Tv76"),u=i("NYxO"),d=i("puNT"),f=i("1onU"),p=i("rYeu"),m=i("0xDb"),g=i("UQm2");t.a={components:{SearchForm:r.default,Pager:f.a,TableSetup:d.a,Addabnormal:p.default},computed:c()({},Object(u.b)(["otherinfo"]),{orgid:function(){return this.isModify?this.selectInfo.orgid:this.searchQuery.vo.orgid||this.otherinfo.orgid}}),mounted:function(){var t=this;this.loading=!0,this.searchQuery.vo.orgId=this.otherinfo.orgid,o.a.all([this.fetchAllreceipt(this.otherinfo.orgid)]).then(function(e){t.loading=!1})},data:function(){var t=this;return{btnsize:"mini",component:"Send",selectInfo:{},loading:!0,dataset:[],isModify:!1,isCheck:!1,AddAbnormalVisible:!1,setupTableVisible:!1,tablekey:0,isDbclick:!1,licenseTypes:[],selected:[],total:0,id:"",searchQuery:{currentPage:1,pageSize:100,vo:{}},tableColumn:[{label:"序号",prop:"id",width:"60",fixed:!0,slot:function(e){return(t.searchQuery.currentPage-1)*t.searchQuery.pageSize+e.$index+1}},{label:"运单号",prop:"shipSn",width:"120",fixed:!0},{label:"异常编号",prop:"abnormalNo",width:"120",fixed:!0},{label:"登记时间",prop:"registerTime",width:"165",slot:function(e){return""+Object(m.parseTime)(e.row.registerTime,"{y}-{m}-{d} {h}:{i}:{s}")},fixed:!1},{label:"开单时间",prop:"createTime",width:"165",slot:function(e){return""+Object(m.parseTime)(e.row.createTime,"{y}-{m}-{d} {h}:{i}:{s}")},fixed:!1},{label:"货品名",prop:"cargoName",width:"120",fixed:!1},{label:"异常状态",prop:"abnormalStatusName",width:"90",fixed:!1},{label:"异常类型",prop:"abnormalTypeName",width:"120",fixed:!1},{label:"登记网点",prop:"orgName",width:"120",fixed:!1},{label:"责任网点",prop:"dutyOrgName",width:"120",fixed:!1},{label:"登记人",prop:"registerName",width:"120",fixed:!1},{label:"登记金额",prop:"registerFee",width:"120",fixed:!1},{label:"异常件数",prop:"abnormalAmount",width:"120",fixed:!1},{label:"货号",prop:"shipGoodsSn",width:"120",fixed:!1},{label:"包装",prop:"cargoPack",width:"80",fixed:!1},{label:"件数",prop:"cargoAmount",width:"80",fixed:!1},{label:"异常描述",prop:"abnormalDescribe",width:"120",fixed:!1},{label:"处理结果",prop:"disposeResultName",width:"120",fixed:!1},{label:"处理网点",prop:"disposeOrgName",width:"120",fixed:!1},{label:"处理人",prop:"disposeName",width:"90",fixed:!1},{label:"处理意见",prop:"disposeOpinion",width:"120",fixed:!1}]}},methods:{getSumLeft:function(e,t){return Object(m.getSummaries)(e,m.operationPropertyCalc)},fetchAllreceipt:function(){var t=this;return this.loading=!0,Object(h.e)(this.searchQuery).then(function(e){t.dataset=e.list,t.total=e.total,t.loading=!1}).catch(function(e){t.loading=!1,t._handlerCatchMsg(e)})},handlePageChange:function(e){this.searchQuery.currentPage=e.pageNum,this.searchQuery.pageSize=e.pageSize,this.fetchData()},fetchData:function(){this.fetchAllreceipt()},getSearchParam:function(e){this.searchQuery.currentPage=this.$options.data().searchQuery.currentPage,this.searchQuery.pageSize=this.$options.data().searchQuery.pageSize,Object(m.objectMerge2)(this.searchQuery.vo,e),this.fetchData()},doAction:function(e){var t=this;if(0===this.selected.length&&"reg"!==e&&"export"!==e)return this.$message({message:"请选择要操作的项~",type:"warning"}),!1;switch(e){case"export":Object(g.g)({data:this.selected.length?this.selected:this.dataset,columns:this.tableColumn,name:"异常登记"});break;case"reg":this.isModify=!1,this.isCheck=!1,this.selectInfo={},this.openAddAbnormal();break;case"xiugai":1<this.selected.length?this.$message({message:"每次只能修改单条数据",type:"warning"}):118===this.selected[0].abnormalStatus?(this.selectInfo={},this.isModify=!0,this.isCheck=!1,this.selectInfo=s()({},this.selected[0]),this.openAddAbnormal()):119===this.selected[0].abnormalStatus&&this.$message.warning("异常已经处理，不允许修改~");break;case"check":1<this.selected.length?this.$message({message:"每次自能查看单条数据",type:"warning"}):(this.isModify=!1,this.isCheck=!0,this.selectInfo=s()({},this.selected[0]),this.openAddAbnormal());break;case"delete":var i=1<this.selected.length?this.selected.length+"名":this.selected[0].id,a=this.selected.map(function(e){return e.id});if(118===this.selected[0].abnormalStatus)this.$confirm("确定要删除 "+i+" 订单异常信息吗？","提示",{confirmButtonText:"删除",cancelButtonText:"取消",type:"warning"}).then(function(){t.loading=!0,Object(h.i)(a).then(function(e){t.$message({type:"success",message:"删除成功!"}),t.fetchData(),t.loading=!1}).catch(function(e){t._handlerCatchMsg(e)})}).catch(function(){t.$message({type:"info",message:"已取消删除"})});else if(119===this.selected[0].abnormalStatus)return this.$message.warning("异常已处理，不允许删除"),!1}this.$refs.multipleTable.clearSelection()},openAddAbnormal:function(){this.AddAbnormalVisible=!0},closeAddAbnormal:function(){this.AddAbnormalVisible=!1},clickDetails:function(e,t,i){this.$refs.multipleTable.toggleRowSelection(e)},getSelection:function(e){this.selected=e},setTable:function(){this.setupTableVisible=!0},closeSetupTable:function(){this.setupTableVisible=!1},setColumn:function(e){this.tableColumn=e,this.tablekey=Math.random()},getDbClick:function(e,t){console.log("detail",e),this.selectInfo=e,this.isCheck=!0,this.isModify=!1,this.openAddAbnormal()}}}},SgVa:function(e,t,i){"use strict";var a={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"tms-pagenation"},[i("span",{staticClass:"page-num",class:{disabled:t.pageNum<=1},on:{click:function(e){t.jumpTo(1)}}},[i("span",{staticClass:"first-page"})]),i("span",{staticClass:"page-num",class:{disabled:t.pageNum<=1},on:{click:function(e){t.jumpTo(t.pageNum-1)}}},[i("span",{staticClass:"prev-page"})]),t._v(" "),i("span",{staticClass:"page-jumper"},[t._v("\n    第\n    "),i("el-input",{ref:"input",staticClass:"el-pagination__editor is-in-pagination",attrs:{min:1,max:t.pages,type:"number",disabled:t.pages<=1},on:{change:t.handleChange,focus:t.handleFocus,blur:t.handleBlur},nativeOn:{keydown:function(e){return t.handleKeyup(e)}},model:{value:t.inputval,callback:function(e){t.inputval="string"==typeof e?e.trim():e},expression:"inputval"}}),t._v(" 页\n  ")],1),t._v("\n  /共 "+t._s(t.pages)+" 页\n  "),i("span",{staticClass:"page-num",class:{disabled:t.pageNum===t.pages},on:{click:function(e){t.jumpTo(t.pageNum+1)}}},[i("span",{staticClass:"next-page"})]),t._v(" "),i("span",{staticClass:"page-num",class:{disabled:t.pageNum===t.pages},on:{click:function(e){t.jumpTo(t.pages)}}},[i("span",{staticClass:"last-page"})]),t._v(" "),i("span",{staticClass:"tms-pagination__sizes"},[i("el-select",{staticClass:"page-select",attrs:{placeholder:"请选择"},on:{change:t.sizesChange},model:{value:t.size,callback:function(e){t.size=e},expression:"size"}},t._l(t.sizes,function(e,t){return i("el-option",{key:t,attrs:{label:e,value:e}})}))],1)])},staticRenderFns:[]};t.a=a},"VT+v":function(e,t,i){"use strict";t.a={props:{sizes:{type:Array,default:function(){return[100,200,300,400]}},total:{type:Number,default:0}},computed:{pages:function(){return Math.ceil(this.total/this.size)}},watch:{pageNum:function(){this.inputval=this.pageNum},size:function(){this.pageNum=1}},mounted:function(){this.size=this.sizes[0]},data:function(){return{pageNum:1,oldValue:0,inputval:1,oldNum:1,size:100}},methods:{handleFocus:function(e){this.oldValue=e.target.value},sizesChange:function(){this.pageNum=1,this.oldNum=this.pageNum,this.$emit("change",{pageNum:this.pageNum,pageSize:this.size})},changeEvent:function(){this.oldNum!==this.pageNum&&(this.oldNum=this.pageNum,this.$emit("change",{pageNum:this.pageNum,pageSize:this.size}))},handleCurrentChange:function(e){this.pageNum=e,this.changeEvent()},handleSizeChange:function(e){this.size=e,this.changeEvent()},handleChange:function(e){var t=parseInt(e,10);isNaN(t)?this.inputval=1:t<1?this.inputval=1:t>this.pages?this.inputval=this.pages:this.inputval=t},handleBlur:function(e){var t=e.target;this.handleChange(t.value),this.jumpTo(this.inputval)},handleKeyup:function(e){var t=e.keyCode,i=e.target;console.log("page keydown:",t,i),13===t&&this.oldValue&&i.value!==this.oldValue&&(this.handleChange(i.value),this.oldValue="")},jumpTo:function(e){e<1?this.pageNum=1:e>this.pages?this.pageNum=this.pages:this.pageNum=e,this.changeEvent()}}}},eZUk:function(e,t){},"l+20":function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=i("O67y"),s=i("OwoJ");var n=function(e){i("eZUk")},o=i("VU/8")(a.a,s.a,n,null,null);t.default=o.exports},puNT:function(e,t,i){"use strict";var a=i("IAIf"),s=i("QcgQ");var n=function(e){i("MXEa")},o=i("VU/8")(a.a,s.a,n,null,null);t.a=o.exports},zQiv:function(e,t,i){"use strict";var a={render:function(){var a=this,e=a.$createElement,s=a._self._c||e;return s("div",{directives:[{name:"loading",rawName:"v-loading",value:a.loading,expression:"loading"}],staticClass:"tab-content"},[s("SearchForm",{attrs:{orgid:a.otherinfo.orgid,btnsize:a.btnsize},on:{change:a.getSearchParam}}),a._v(" "),s("div",{staticClass:"tab_info"},[s("div",{staticClass:"btns_box"},[s("el-button",{directives:[{name:"has",rawName:"v-has:ABNO_ADD",arg:"ABNO_ADD"}],attrs:{type:"primary",size:a.btnsize,icon:"el-icon-circle-plus",plain:""},on:{click:function(e){a.doAction("reg")}}},[a._v("异常登记")]),a._v(" "),s("el-button",{directives:[{name:"has",rawName:"v-has:ABNO_PUT",arg:"ABNO_PUT"}],attrs:{type:"primary",size:a.btnsize,icon:"el-icon-edit",plain:""},on:{click:function(e){a.doAction("xiugai")}}},[a._v("异常修改")]),a._v(" "),s("el-button",{directives:[{name:"has",rawName:"v-has:ABNO_SELECT",arg:"ABNO_SELECT"}],attrs:{type:"primary",size:a.btnsize,icon:"el-icon-news",plain:""},on:{click:function(e){a.doAction("check")}}},[a._v("查看明细")]),a._v(" "),s("el-button",{directives:[{name:"has",rawName:"v-has:ABNO_DEL",arg:"ABNO_DEL"}],attrs:{type:"danger",size:a.btnsize,icon:"el-icon-delete",plain:""},on:{click:function(e){a.doAction("delete")}}},[a._v("删除")]),a._v(" "),s("el-button",{directives:[{name:"has",rawName:"v-has:ABNO_EXP1",arg:"ABNO_EXP1"}],attrs:{type:"primary",size:a.btnsize,icon:"el-icon-upload2",plain:""},on:{click:function(e){a.doAction("export")}}},[a._v("导出")]),a._v(" "),s("el-button",{staticClass:"table_setup",attrs:{type:"primary",size:a.btnsize,icon:"el-icon-setting",plain:""},on:{click:a.setTable}},[a._v("表格设置")])],1),a._v(" "),s("div",{staticClass:"info_tab"},[s("el-table",{key:a.tablekey,ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:a.dataset,border:"",height:"100%","summary-method":a.getSumLeft,"show-summary":"","tooltip-effect":"dark","default-sort":{prop:"id",order:"ascending"},stripe:""},on:{"row-dblclick":a.getDbClick,"row-click":a.clickDetails,"selection-change":a.getSelection}},[s("el-table-column",{attrs:{fixed:"",sortable:"",type:"selection",width:"50"}}),a._v(" "),a._l(a.tableColumn,function(i){return[i.slot?s("el-table-column",{key:i.id,attrs:{fixed:i.fixed,sortable:"",label:i.label,width:i.width},scopedSlots:a._u([{key:"default",fn:function(t){return[i.click?s("span",{staticClass:"clickitem",domProps:{innerHTML:a._s(i.slot(t))},on:{click:function(e){e.stopPropagation(),i.click(t)}}}):s("span",{domProps:{innerHTML:a._s(i.slot(t))}})]}}])}):s("el-table-column",{key:i.id,attrs:{fixed:i.fixed,sortable:"",label:i.label,prop:i.prop,width:i.width}})]})],2)],1),a._v(" "),s("div",{staticClass:"info_tab_footer"},[a._v("共计:"+a._s(a.total)+" "),s("div",{staticClass:"show_pager"},[s("Pager",{attrs:{total:a.total},on:{change:a.handlePageChange}})],1)])]),a._v(" "),s("Addabnormal",{attrs:{issender:!0,isModify:a.isModify,isCheck:a.isCheck,info:a.selectInfo,id:a.id,orgid:a.orgid,companyId:a.otherinfo.companyId,popVisible:a.AddAbnormalVisible},on:{"update:popVisible":function(e){a.AddAbnormalVisible=e},close:a.closeAddAbnormal,success:a.fetchData}}),a._v(" "),s("TableSetup",{attrs:{popVisible:a.setupTableVisible,columns:a.tableColumn},on:{close:a.closeSetupTable,success:a.setColumn}})],1)},staticRenderFns:[]};t.a=a}});