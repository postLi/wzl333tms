webpackJsonp([79,200],{"0bwg":function(t,e){},"1onU":function(t,e,i){"use strict";var a=i("VT+v"),n=i("SgVa");var s=function(t){i("FiTa"),i("7CJ8")},o=i("VU/8")(a.a,n.a,s,"data-v-4b7ed4df",null);e.a=o.exports},"7CJ8":function(t,e){},"7ZQA":function(t,e,i){"use strict";e.a=function(t){return n.b.post("/api-finance/finance/employeeaccount/v1/getEmployeeList",t).then(function(t){return t.data||{list:[],totalCount:0}})},e.b=function(t){return n.b.post("/api-finance/finance/employeeaccount/v1/getEmployeeSummarize",t).then(function(t){return t.data||{list:[],totalCount:0}})};var a=i("//Fk"),n=(i.n(a),i("Vo7i"))},"8UOW":function(t,e,i){"use strict";var a=i("us2a"),n=i("fyBF");var s=function(t){i("Qhr/")},o=i("VU/8")(a.a,n.a,s,null,null);e.a=o.exports},"9sPy":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i("eLXT"),n=i("tCx7");var s=function(t){i("0bwg")},o=i("VU/8")(a.a,n.a,s,null,null);e.default=o.exports},FiTa:function(t,e){},IAIf:function(t,e,i){"use strict";var a=i("woOf"),l=i.n(a),n=i("DAYN"),s=i.n(n),r=i("0xDb"),c=i("t5DY");e.a={props:{popVisible:{type:Boolean,default:!1},columns:{type:Array,default:[]},code:{type:String,default:""}},components:{draggable:s.a},computed:{isShow:{get:function(){return this.popVisible},set:function(){}}},data:function(){return{orgColumnData:[],columnData:[],orgShowColumnData:[],showColumnData:[],list:[],rightList:[],listKey:0,isIndeterminateLeft:!0,isIndeterminateRight:!0,checkAllLeft:!1,checkAllRight:!1,checkListLeft:[],checkListRight:[],searchLeft:"",searchRight:"",leftListLen:0,rightListLen:0,columnListLen:0,isCheck:!0,maxLen:50,rightCheckLen:0,leftCheckLen:0,thecode:""}},mounted:function(){var a=this,t=this.code;this.$route.meta.code;this.thecode="","NOSET"===t?this.convertData():t?this.thecode=t:this.convertData(),this.thecode&&(this.fetchTableSetup(),this.eventBus.$on("tablesetup.change",function(t,e){if(t&&t===a.thecode)if(e.prop){var i=a.showColumnData.filter(function(t){return t.prop===e.prop});i.length&&(i[0].width=e.width,a.changeTbaleSetup())}else e.forEach(function(e){var t=a.showColumnData.filter(function(t){return t.prop===e.prop});t.length&&(t[0].width=e.width)}),a.changeTbaleSetup()}))},methods:{convertData:function(t){this.initData(t),this.callback()},initData:function(e){var t=Object(r.objectMerge2)([],this.columns);t=this.sort(t),(e=e||t).forEach(function(i){"shipFromCityName"!==i.prop&&"shipToCityName"!==i.prop||i.slot||(i.slot=function(t){var e=(t.row[i.prop]||"").split(",");return e[2]||e[1]||e[0]||""})});var o=this.maxLen,i=function(t){var n=[];if(0<e.length){var s=0;e.forEach(function(t,e){if(t.hidden){var i=Object(r.objectMerge2)(t);i.key=e,n.push(i)}else s++;if(o<s){var a=Object(r.objectMerge2)(t);a.key=e,a.hidden=!0,n.push(a)}})}return n},a=function(t){var a=[];if(0<e.length){var n=0;e.forEach(function(t,e){if(!t.hidden&&n<o){n++;var i=Object(r.objectMerge2)(t);i.hidden=!1,i.key=e,a.push(i)}})}return a},n=i().length,s=a().length;this.orgColumnData=i(),this.columnData=i(),this.orgShowColumnData=a(),this.showColumnData=a(),this.leftListLen=n,this.rightListLen=s,this.columnListLen=e.length},sort:function(t){var e=[],i=[];return t.forEach(function(t){t.fixed?e.push(t):i.push(t)}),e.concat(i)},doAction:function(t){switch(t){case"goRight":this.goRight();break;case"goLeft":this.goLeft()}},fetchFail:function(){this.thecode="",this.convertData()},fetchTableSetup:function(){var o=this;return Object(c.i)(this.otherinfo.orgid,this.thecode).then(function(t){var e=t.data;if((o.orgdata=e)&&e.length){if(Array.isArray(e[0])&&(e=e[0]),e.length<=1)return console.log("后台返回表格数据异常:",e),o.fetchFail(),!1;o.orgdata=e;var n=[],s=o.columns.length;e.sort(function(t,e){return t.titleOrder>e.titleOrder?1:-1}),e.forEach(function(t){var e=l()({},t);e.label=e.label||e.lable;for(var i=0;i<s;i++)if(o.columns[i].prop===t.prop){for(var a in o.columns[i])void 0!==e[a]&&null!==e[a]||(e[a]=o.columns[i][a]);break}n.push(e)}),o.columns.forEach(function(e){0===n.filter(function(t){return t.prop===e.prop}).length&&(console.log("本地项，需要后台添加：",e),n.push(e))}),n=o.sort(n),o.convertData(n)}else o.fetchFail()}).catch(function(t){o.fetchFail()})},changeTbaleSetup:function(){var e=this;if(this.thecode)return Object(c.q)(this.otherinfo.orgid,this.thecode,this.formatColumn(this.showColumnData)).then(function(t){e.$message.info("保存成功")}).catch(function(t){e._handlerCatchMsg(t)})},formatColumn:function(t){var s=this.orgdata,o=[],l=0;return t.forEach(function(e){var t=s.filter(function(t){return t.prop===e.prop});if(t.length){var i={},a=t[0];for(var n in a)i[n]=e[n];i.hidden=!1,i.titleOrder=++l,o.push(i)}}),this.columnData.forEach(function(e){var t=s.filter(function(t){return t.prop===e.prop});if(t.length){var i={},a=t[0];for(var n in a)i[n]=e[n];i.hidden=!0,i.titleOrder=++l,o.push(i)}}),o},checkRightLen:function(){this.showColumnData.length>this.maxLen?(this.$message({type:"warning",message:"列表最多只能显示"+this.maxLen+"个字段。"}),this.isCheck=!0):this.isCheck=!1},canDragStart:function(t){},setChangeData:function(){this.reRenderData()},reRenderData:function(){var t=Object(r.objectMerge2)([],this.showColumnData);this.showColumnData=this.sort(t)},setColumnLen:function(){this.leftListLen=this.columnData.length,this.rightListLen=this.showColumnData.length},handChangeAllLeft:function(t){this.checkListLeft=t?l()([],this.columnData):[],this.leftCheckLen=this.checkListLeft.length,this.isIndeterminateLeft=!1},handChangeAllRight:function(t){this.checkListRight=t?l()([],this.showColumnData):[],this.rightCheckLen=this.checkListRight.length,this.isIndeterminateRight=!1},goRight:function(){var e=this;if(this.checkListLeft.length+this.rightListLen>this.maxLen||this.rightListLen>this.maxLen-1)return this.$message({type:"warning",message:"列表最多只能显示"+this.maxLen+"个字段。"}),!1;this.columnData=this.columnData.filter(function(t){return-1===e.checkListLeft.indexOf(t)||(t.fixed=!1,e.showColumnData.push(t),!1)}),this.orgColumnData=this.orgColumnData.filter(function(t){return-1===e.checkListLeft.indexOf(t)||(t.fixed=!1,e.orgShowColumnData.push(t),!1)}),this.checkListLeft=[],this.setColumnLen(),this.leftCheckLen=0,this.reRenderData()},goLeft:function(){var a=this;this.checkListRight.forEach(function(t,e){a.columnData.push(t),a.orgColumnData.push(t);var i=a.showColumnData.indexOf(t);-1!==i&&a.showColumnData.splice(i,1),-1!==a.orgShowColumnData.indexOf(t)&&a.orgShowColumnData.splice(i,1)}),this.checkListRight=[],this.setColumnLen(),this.rightCheckLen=0,this.reRenderData()},dbCheckItemLeft:function(t,e,i){if(this.rightListLen>this.maxLen-1)return this.$message({type:"warning",message:"列表最多只能显示"+this.maxLen+"个字段。"}),!1;t.fixed=!1,this.showColumnData.push(t),this.orgShowColumnData.push(t),this.columnData.splice(e,1),this.orgColumnData.splice(e,1),this.setColumnLen(),this.reRenderData()},dbCheckItemRight:function(t,e,i){this.columnData.push(t),this.orgColumnData.push(t),this.showColumnData.splice(e,1),this.orgShowColumnData.splice(e,1),this.setColumnLen(),this.reRenderData()},handleCheckChangeLeft:function(t){this.leftCheckLen=t.length},handleCheckChangeRight:function(t){this.rightCheckLen=t.length},querySearchLeft:function(t,e){void 0===(this.searchLeft=t).label&&(this.searchLeft||(this.columnData=l()([],this.orgColumnData)));var i=l()([],this.orgColumnData);e(t?i.filter(this.createFilter(t)):i)},querySearchRight:function(t,e){void 0===(this.searchRight=t).label&&(this.searchRight||(this.showColumnData=l()([],this.orgShowColumnData)));var i=l()([],this.orgShowColumnData);e(t?i.filter(this.createFilter(t)):i)},createFilter:function(e){return function(t){return 0===t.label.toLowerCase().indexOf(e.toLowerCase())}},handleSearchLeft:function(t){var e=this;this.searchLeft=t?t.label:"";var i=l()([],this.columnData);i.forEach(function(t){t.label===e.searchLeft&&(i=[]).push(t)}),this.columnData=l()([],i),i=[]},handleSearchRight:function(t){var e=this;this.searchRight=t?t.label:"";var i=l()([],this.showColumnData);i.forEach(function(t){t.label===e.searchRight&&(i=[]).push(t)}),this.showColumnData=l()([],i),i=[]},closeMe:function(t){this.$emit("close"),"function"==typeof t&&t()},handleChange:function(t,e,i){this.rightList=l()([],t)},handleSwitch:function(t,e){t.fixed=!t.fixed,this.reRenderData()},callback:function(){var t=l()([],this.showColumnData);t.forEach(function(t){!t.label&&t.lable&&(t.label=t.lable)}),this.$emit("success",t),this.listKey=Math.random(),this.closeMe()},submitForm:function(){var e=this;this.thecode?this.isloading||(this.isloading=!0,this.changeTbaleSetup().then(function(t){e.isloading=!1,e.callback()}).catch(function(t){e.isloading=!1})):this.callback()}}}},MXEa:function(t,e){},OEqj:function(t,e,i){"use strict";var a=i("woOf"),n=i.n(a),s=i("o9X6"),o=i("9UCZ"),l=i("8UOW");e.a={name:"handaccount-manage-search",components:{SelectTree:s.a,SelectType:o.a,searchAll:l.a},props:{btnsize:{type:String,default:"mini"},orgid:{type:Number}},data:function(){return{searchObjs:{},searchForm:{orgid:"",status:"",userName:""}}},watch:{orgid:function(t){this.searchForm.orgid=t},searchForm:{handler:function(t,e){this.searchObjs=n()({},t),this.searchObjs.status=""===this.searchObjs.status?null:this.searchObjs.status},deep:!0}},mounted:function(){this.searchForm.orgid=this.orgid,this.onSubmit()},methods:{getDataObj:function(t){this.searchForm=n()({},t),this.$emit("change",t)},onSubmit:function(){var t=n()({},this.searchForm);t.status=""===t.status?null:t.status,this.$emit("change",t)},clearForm:function(){this.searchForm.status="",this.searchForm.userName="",this.searchForm.orgid=this.otherinfo.orgid}}}},QcgQ:function(t,e,i){"use strict";var a={render:function(){var a=this,t=a.$createElement,n=a._self._c||t;return n("el-dialog",{staticClass:"tms_dialog",attrs:{title:"表格设置",visible:a.isShow,"append-to-body":"","close-on-click-modal":!1,"before-close":a.closeMe},on:{"update:visible":function(t){a.isShow=t}}},[n("div",{staticClass:"tableSetup_warp"},[n("div",{staticClass:"tableSetup_list"},[n("div",{staticClass:"tableSetup_head"},[n("div",{staticClass:"tableSetup_head_select"},[a._v("选择："+a._s(a.leftCheckLen))]),a._v(" "),n("el-checkbox",{attrs:{indeterminate:a.isIndeterminateLeft},on:{change:a.handChangeAllLeft},model:{value:a.checkAllLeft,callback:function(t){a.checkAllLeft=t},expression:"checkAllLeft"}},[a._v("隐藏列  "+a._s(a.leftListLen)+" / "+a._s(a.columnListLen))]),a._v(" "),n("div",{staticStyle:{margin:"3px 0"}},[n("el-autocomplete",{staticClass:"inline-input",attrs:{"fetch-suggestions":a.querySearchLeft,placeholder:"请输入内容",size:"mini"},on:{select:a.handleSearchLeft},scopedSlots:a._u([{key:"default",fn:function(t){var e=t.item;return[n("span",[a._v(a._s(e.label))])]}}]),model:{value:a.searchLeft,callback:function(t){a.searchLeft=t},expression:"searchLeft"}},[n("i",{staticClass:"el-icon-search el-input__icon",attrs:{slot:"suffix"},slot:"suffix"})])],1)],1),a._v(" "),n("div",{staticClass:"tableSetup_content"},[n("el-checkbox-group",{on:{change:a.handleCheckChangeLeft},model:{value:a.checkListLeft,callback:function(t){a.checkListLeft=t},expression:"checkListLeft"}},[n("transition-group",{key:a.listKey,attrs:{name:"el-zoom-in-center"}},a._l(a.columnData,function(e,i){return n("div",{key:i,staticClass:"tableSetup_item",on:{dblclick:function(t){a.dbCheckItemLeft(e,i,t)}}},[n("el-checkbox",{attrs:{label:e}},[a._v("\n                "+a._s(e.label)+"\n              ")])],1)}))],1)],1),a._v(" "),n("div",{staticClass:"tableSetup_tips"},[n("span",[a._v("双击，可快速左右切换。")])])]),a._v(" "),n("div",{staticClass:"tableSetup_btn"},[n("el-button",{attrs:{type:"primary",icon:"el-icon-arrow-right"},on:{click:function(t){a.doAction("goRight")}}}),a._v(" "),n("br"),a._v(" "),n("el-button",{attrs:{type:"primary",icon:"el-icon-arrow-left"},on:{click:function(t){a.doAction("goLeft")}}})],1),a._v(" "),n("div",{staticClass:"tableSetup_list"},[n("div",{staticClass:"tableSetup_head"},[n("div",{staticClass:"tableSetup_head_select"},[a._v("选择："+a._s(a.rightCheckLen))]),a._v(" "),n("el-checkbox",{attrs:{indeterminate:a.isIndeterminateRight},on:{change:a.handChangeAllRight},model:{value:a.checkAllRight,callback:function(t){a.checkAllRight=t},expression:"checkAllRight"}},[a._v("显示列 "+a._s(a.rightListLen)+" / "+a._s(a.columnListLen))]),a._v(" "),n("div",{staticStyle:{margin:"3px 0"}},[n("el-autocomplete",{staticClass:"inline-input",attrs:{"fetch-suggestions":a.querySearchRight,placeholder:"请输入内容",size:"mini"},on:{select:a.handleSearchRight},scopedSlots:a._u([{key:"default",fn:function(t){var e=t.item;return[n("span",[a._v(a._s(e.label))])]}}]),model:{value:a.searchRight,callback:function(t){a.searchRight=t},expression:"searchRight"}},[n("i",{staticClass:"el-icon-search el-input__icon",attrs:{slot:"suffix"},slot:"suffix"})])],1)],1),a._v(" "),n("div",{staticClass:"tableSetup_content"},[n("el-checkbox-group",{on:{change:a.handleCheckChangeRight},model:{value:a.checkListRight,callback:function(t){a.checkListRight=t},expression:"checkListRight"}},[n("draggable",{staticClass:"dragArea",attrs:{move:a.canDragStart,list:a.showColumnData},on:{change:a.setChangeData}},[n("transition-group",{attrs:{name:"el-zoom-in-center"}},a._l(a.showColumnData,function(e,i){return n("div",{key:i,staticClass:"tableSetup_item",on:{dblclick:function(t){a.dbCheckItemRight(e,i,t)}}},[n("el-checkbox",{attrs:{label:e}},[a._v("\n                  "+a._s(e.label)+"\n                ")]),a._v(" "),n("el-switch",{attrs:{value:e.fixed,"active-text":e.fixed?"固定":"活动"},on:{change:function(t){a.handleSwitch(e,i)}}})],1)}))],1)],1)],1),a._v(" "),n("div",{staticClass:"tableSetup_tips"},[n("span",[a._v("拖拽，可调整上下顺序。")]),a._v(" "),n("br"),n("span",[a._v("列表最多只能显示"+a._s(a.maxLen)+"个字段。")])])])]),a._v(" "),n("div",{attrs:{slot:"footer"},slot:"footer"},[n("el-button",{attrs:{type:"primary"},on:{click:function(t){a.submitForm()}}},[a._v("确 定")]),a._v(" "),n("el-button",{on:{click:a.closeMe}},[a._v("取 消")])],1)])},staticRenderFns:[]};e.a=a},"Qhr/":function(t,e){},SgVa:function(t,e,i){"use strict";var a={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"tms-pagenation"},[i("span",{staticClass:"page-num",class:{disabled:e.pageNum<=1},on:{click:function(t){e.jumpTo(1)}}},[i("span",{staticClass:"first-page"})]),i("span",{staticClass:"page-num",class:{disabled:e.pageNum<=1},on:{click:function(t){e.jumpTo(e.pageNum-1)}}},[i("span",{staticClass:"prev-page"})]),e._v(" "),i("span",{staticClass:"page-jumper"},[e._v("\n    第\n    "),i("el-input",{ref:"input",staticClass:"el-pagination__editor is-in-pagination",attrs:{min:1,max:e.pages,type:"number",disabled:e.pages<=1},on:{change:e.handleChange,focus:e.handleFocus,blur:e.handleBlur},nativeOn:{keydown:function(t){return e.handleKeyup(t)}},model:{value:e.inputval,callback:function(t){e.inputval="string"==typeof t?t.trim():t},expression:"inputval"}}),e._v(" 页\n  ")],1),e._v("\n  /共 "+e._s(e.pages)+" 页\n  "),i("span",{staticClass:"page-num",class:{disabled:e.pageNum===e.pages},on:{click:function(t){e.jumpTo(e.pageNum+1)}}},[i("span",{staticClass:"next-page"})]),e._v(" "),i("span",{staticClass:"page-num",class:{disabled:e.pageNum===e.pages},on:{click:function(t){e.jumpTo(e.pages)}}},[i("span",{staticClass:"last-page"})]),e._v(" "),i("span",{staticClass:"tms-pagination__sizes"},[i("el-select",{staticClass:"page-select",attrs:{placeholder:"请选择"},on:{change:e.sizesChange},model:{value:e.size,callback:function(t){e.size=t},expression:"size"}},e._l(e.sizes,function(t,e){return i("el-option",{key:e,attrs:{label:t,value:t}})}))],1)])},staticRenderFns:[]};e.a=a},SjYS:function(t,e,i){"use strict";var a=i("seR9"),n=i("msh6");var s=function(t){i("nl9Y")},o=i("VU/8")(a.a,n.a,s,null,null);e.a=o.exports},"VT+v":function(t,e,i){"use strict";e.a={props:{sizes:{type:Array,default:function(){return[100,200,300,400]}},total:{type:Number,default:0}},computed:{pages:function(){return Math.ceil(this.total/this.size)}},watch:{pageNum:function(){this.inputval=this.pageNum},size:function(){this.pageNum=1}},mounted:function(){this.size=this.sizes[0]},data:function(){return{pageNum:1,oldValue:0,inputval:1,oldNum:1,size:100}},methods:{handleFocus:function(t){this.oldValue=t.target.value},sizesChange:function(){this.pageNum=1,this.oldNum=this.pageNum,this.$emit("change",{pageNum:this.pageNum,pageSize:this.size})},changeEvent:function(){this.oldNum!==this.pageNum&&(this.oldNum=this.pageNum,this.$emit("change",{pageNum:this.pageNum,pageSize:this.size}))},handleCurrentChange:function(t){this.pageNum=t,this.changeEvent()},handleSizeChange:function(t){this.size=t,this.changeEvent()},handleChange:function(t){var e=parseInt(t,10);isNaN(e)?this.inputval=1:e<1?this.inputval=1:e>this.pages?this.inputval=this.pages:this.inputval=e},handleBlur:function(t){var e=t.target;this.handleChange(e.value),this.jumpTo(this.inputval)},handleKeyup:function(t){var e=t.keyCode,i=t.target;console.log("page keydown:",e,i),13===e&&this.oldValue&&i.value!==this.oldValue&&(this.handleChange(i.value),this.oldValue="")},jumpTo:function(t){t<1?this.pageNum=1:t>this.pages?this.pageNum=this.pages:this.pageNum=t,this.changeEvent()}}}},YXC3:function(t,e,i){"use strict";var a={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("el-form",{staticClass:"staff_searchinfo clearfix",attrs:{inline:!0,size:e.btnsize,"label-position":"right",model:e.searchForm,"label-width":"70px"}},[i("div",{staticClass:"staff_searchinfo--input"},[i("el-form-item",{attrs:{label:"所在网点"}},[i("select-tree",{attrs:{orgid:e.otherinfo.orgid},model:{value:e.searchForm.orgid,callback:function(t){e.$set(e.searchForm,"orgid",t)},expression:"searchForm.orgid"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"员工姓名"}},[i("el-input",{attrs:{maxlength:"15",clearable:""},on:{change:e.onSubmit},model:{value:e.searchForm.userName,callback:function(t){e.$set(e.searchForm,"userName",t)},expression:"searchForm.userName"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"交账状态"}},[i("select-type",{attrs:{type:"fee_status"},model:{value:e.searchForm.status,callback:function(t){e.$set(e.searchForm,"status",t)},expression:"searchForm.status"}})],1),e._v(" "),i("searchAll",{attrs:{searchObj:e.searchObjs},on:{dataObj:e.getDataObj}})],1),e._v(" "),i("el-form-item",{staticClass:"staff_searchinfo--btn"},[i("el-button",{attrs:{type:"primary"},on:{click:e.onSubmit}},[e._v("查询")]),e._v(" "),i("el-button",{attrs:{type:"info",plain:""},on:{click:e.clearForm}},[e._v("清空")])],1)],1)},staticRenderFns:[]};e.a=a},eLXT:function(t,e,i){"use strict";var a=i("7ZQA"),n=i("zJck"),s=i("puNT"),o=i("1onU"),l=i("0xDb"),r=i("UQm2");e.a={components:{SearchForm:n.default,Pager:o.a,TableSetup:s.a},mounted:function(){},data:function(){return{btnsize:"mini",usersArr:[],total:0,loading:!0,setupTableVisible:!1,isModify:!1,selectInfo:{},selected:[],searchQuery:{currentPage:1,pageSize:100,vo:{orgid:"",status:"",userName:""}},tablekey:"",tableColumn:[{label:"序号",prop:"",fixed:!0,slot:function(t){return t.$index+1}},{label:"网点",prop:"orgName",fixed:!0},{label:"员工姓名",prop:"name"},{label:"交账合计",prop:"shipNowpayFee"},{label:"交账状态",prop:"feeStatus",width:"150"},{label:"已交账合计",prop:"finishAccount"},{label:"未交账合记",prop:"noSettlementFee"}]}},methods:{viewDetails:function(t){this.$router.push({path:"/finance/handAccount/detail",query:{id:t.userId,tab:"查看"+t.name,orgid:t.orgid}})},showDetail:function(t){this.viewDetails(t)},fetchAllOrder:function(){var e=this;return this.loading=!0,a.b(this.searchQuery).then(function(t){e.usersArr=t.list,e.total=t.total,e.loading=!1}).catch(function(t){e.loading=!1,e._handlerCatchMsg(t)})},fetchData:function(){this.fetchAllOrder()},handlePageChange:function(t){this.searchQuery.currentPage=t.pageNum,this.searchQuery.pageSize=t.pageSize,this.fetchData()},getSearchParam:function(t){this.searchQuery.currentPage=this.$options.data().searchQuery.currentPage,this.searchQuery.pageSize=this.$options.data().searchQuery.pageSize,this.searchQuery.vo=t,this.loading=!1,this.fetchData()},doAction:function(t){if(!this.selected.length&&"add"!==t&&"export"!==t&&"print"!==t)return this.$message({message:"请选择要操作的项~",type:"warning"}),!1;switch(console.log("this.selected:",this.selected),t){case"detail":this.isModify=!1,this.selectInfo={},this.showDetail(this.selected[0]);break;case"export":Object(r.g)({data:this.selected.length?this.selected:this.usersArr,columns:this.tableColumn,name:"员工交账-"+Object(l.parseTime)(new Date,"{y}{m}{d}{h}{i}{s}")});break;case"print":Object(r.d)({data:this.selected.length?this.selected:this.usersArr,columns:this.tableColumn,name:"员工交账"})}this.$refs.multipleTable.clearSelection()},setTable:function(){this.setupTableVisible=!0},closeSetupTable:function(){this.setupTableVisible=!1},setColumn:function(t){this.tableColumn=t,this.tablekey=Math.random()},clickDetails:function(t,e,i){this.$refs.multipleTable.toggleRowSelection(t)},getSelection:function(t){this.selected=t},getSummaries:function(t){return Object(l.getSummaries)(t,["shipNowpayFee","finishAccount","noSettlementFee"])}}}},fyBF:function(t,e,i){"use strict";var a={render:function(){var i=this,t=i.$createElement,a=i._self._c||t;return i.hasCode?a("div",{staticClass:"searchAll_lyy"},[a("el-form-item",{staticClass:"zdycx",attrs:{label:"自定义查询"}},[a("el-select",{attrs:{filterable:"",placeholder:"请选择","filter-method":i.querySearchAsync,"popper-class":"zdycx-pop",loading:i.loading},on:{change:i.handleSelect,focus:i.initdata},model:{value:i.datalist,callback:function(t){i.datalist=t},expression:"datalist"}},i._l(i.options4,function(e,t){return a("el-option",{key:t,attrs:{label:e.queryKey,value:e.id}},[i._v("\r\n        "+i._s(e.queryKey)+" "),a("i",{staticClass:"el-icon-circle-close-outline",on:{click:function(t){t.stopPropagation(),t.preventDefault(),i.deleteItem(e.id)}}})])})),i._v(" "),a("el-button",{attrs:{plain:""},on:{click:i.Custom}},[i._v("保存自定义")])],1),i._v(" "),a("addSave",{attrs:{code:i.hasCode,searchObj:i.searchObj,popVisible:i.popVisible},on:{close:i.closeAddDot,success:i.fetchAllloadAll}})],1):i._e()},staticRenderFns:[]};e.a=a},msh6:function(t,e,i){"use strict";var a={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("el-dialog",{staticClass:"wzl_settleLogSave",attrs:{title:e.popTitle,visible:e.isShow,"close-on-click-modal":!1,"before-close":e.closeMe},on:{close:e.closeMe,"update:visible":function(t){e.isShow=t}}},[i("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.form,rules:e.rules,"label-width":e.formLabelWidth,inline:!0,"label-position":"right",size:"mini"}},[i("el-form-item",{attrs:{label:"名称：",prop:"queryKey"}},[i("input",{directives:[{name:"model",rawName:"v-model.trim",value:e.form.queryKey,expression:"form.queryKey",modifiers:{trim:!0}}],attrs:{maxlength:20,placeholder:"请定义名称"},domProps:{value:e.form.queryKey},on:{input:function(t){t.target.composing||e.$set(e.form,"queryKey",t.target.value.trim())},blur:function(t){e.$forceUpdate()}}})])],1),e._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{type:"primary",disabled:0===e.form.queryKey.length},on:{click:function(t){e.submitForm("ruleForm")}}},[e._v("确 定")]),e._v(" "),i("el-button",{on:{click:e.closeMe}},[e._v("取 消")])],1)],1)},staticRenderFns:[]};e.a=a},nl9Y:function(t,e){},puNT:function(t,e,i){"use strict";var a=i("IAIf"),n=i("QcgQ");var s=function(t){i("MXEa")},o=i("VU/8")(a.a,n.a,s,null,null);e.a=o.exports},seR9:function(t,e,i){"use strict";var a=i("mvHQ"),n=i.n(a),s=i("t5DY"),o=i("0xDb");e.a={computed:{isShow:{get:function(){return this.popVisible},set:function(){}}},components:{},props:{popVisible:{type:Boolean,default:!1},dotInfo:[Object,Array],searchQuery:[Object,Array],isDepMain:{type:Boolean,default:!1},createrId:[Number,String],isModify:{type:Boolean,default:!1},isAccept:{type:Boolean,default:!1},proptitle:String,searchObj:{type:[Array,Object],default:function(){}},code:{type:String,default:""}},data:function(){return{form:{userId:"",orgId:"",menuCode:"",queryKey:"",queryContent:""},searchCreatTime:+new Date,pickOption2:"",formLabelWidth:"75px",tooltip:!1,rules:{},queryKey:"",checked1:!0,popTitle:"自定义标签",loading:!1,type:""}},mounted:function(){},watch:{orgid:function(t){this.form.orgid=t},popVisible:function(t){t&&(this.form.userId=this.otherinfo.userId,this.form.orgId=this.otherinfo.orgid,this.form.menuCode=this.code||this.$route.meta.code)}},methods:{reset:function(){this.$refs.ruleForm.resetFields()},closeMe:function(t){this.$emit("close"),this.reset(),"function"==typeof t&&t()},submitForm:function(t){var i=this;this.loading||this.$refs[t].validate(function(t){if(!t)return!1;i.loading=!0,i.form.queryContent=n()(i.searchObj);var e=Object(o.objectMerge2)({},i.form);console.log("addSave_data",e),Object(s.p)(e).then(function(t){i.loading=!1,i.$message({message:"保存成功~",type:"success"}),i.closeMe(),i.$emit("success")}).catch(function(t){i.loading=!1,i.$message.warning(t.text)})})}}}},tCx7:function(t,e,i){"use strict";var a={render:function(){var i=this,t=i.$createElement,a=i._self._c||t;return a("div",{directives:[{name:"loading",rawName:"v-loading",value:i.loading,expression:"loading"}],staticClass:"tab-content handAccount-summary"},[a("SearchForm",{attrs:{orgid:i.otherinfo.orgid,btnsize:i.btnsize},on:{change:i.getSearchParam}}),i._v(" "),a("div",{staticClass:"tab_info"},[a("div",{staticClass:"btns_box"},[a("el-button",{directives:[{name:"has",rawName:"v-has:FINANCE_ACCOUNT1",arg:"FINANCE_ACCOUNT1"}],attrs:{type:"primary",size:i.btnsize,icon:"el-icon-info",plain:""},on:{click:function(t){i.doAction("detail")}}},[i._v("查看明细")]),i._v(" "),a("el-button",{staticClass:"table_setup",attrs:{type:"primary",size:i.btnsize,icon:"el-icon-edit-outline",plain:""},on:{click:function(t){i.doAction("export")}}},[i._v("导出")]),i._v(" "),a("el-button",{staticClass:"table_setup",attrs:{type:"primary",size:i.btnsize,icon:"el-icon-edit-outline",plain:""},on:{click:function(t){i.doAction("print")}}},[i._v("打印")]),i._v(" "),a("el-button",{staticClass:"table_setup",attrs:{type:"primary",size:i.btnsize,icon:"el-icon-setting",plain:""},on:{click:i.setTable}},[i._v("表格设置")])],1),i._v(" "),a("div",{staticClass:"info_tab"},[a("el-table",{key:i.tablekey,ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:i.usersArr,stripe:"",border:"",height:"100%","show-summary":"","summary-method":i.getSummaries,"tooltip-effect":"dark","default-sort":{prop:"id",order:"ascending"}},on:{"row-click":i.clickDetails,"row-dblclick":i.showDetail,"selection-change":i.getSelection}},[a("el-table-column",{attrs:{fixed:"",sortable:"",type:"selection",width:"80"}}),i._v(" "),i._l(i.tableColumn,function(e){return[e.slot?a("el-table-column",{key:e.id,attrs:{fixed:e.fixed,sortable:"",label:e.label,width:e.width},scopedSlots:i._u([{key:"default",fn:function(t){return[i._v("\n                "+i._s(e.slot(t))+"\n            ")]}}])}):a("el-table-column",{key:e.id,attrs:{fixed:e.fixed,sortable:"",label:e.label,prop:e.prop,width:e.width}})]})],2)],1),i._v(" "),a("div",{staticClass:"info_tab_footer"},[i._v("共计:"+i._s(i.total)+" "),a("div",{staticClass:"show_pager"},[a("Pager",{attrs:{total:i.total},on:{change:i.handlePageChange}})],1)])]),i._v(" "),a("TableSetup",{attrs:{popVisible:i.setupTableVisible,columns:i.tableColumn},on:{close:i.closeSetupTable,success:i.setColumn}})],1)},staticRenderFns:[]};e.a=a},us2a:function(t,e,i){"use strict";var a=i("t5DY"),n=i("SjYS");e.a={components:{addSave:n.a},props:{searchObj:{type:[Object,Array]},value:[String,Number],code:{type:String,default:""}},data:function(){return{isModify:!1,popVisible:!1,setupTableVisible:!1,dataset:[],datalist:"",timeout:null,loading:!1,options4:[],querySearch:{currentPage:1,pageSize:10,vo:{orgId:"",userId:"",menuCode:""}}}},computed:{hasCode:function(){return this.code||this.$route.meta.code||""}},watch:{value:function(t){console.log("nnn:",t),""===t&&(this.datalist="")},searchObj:{handler:function(t,e){this.$nextTick(function(){console.log("searchAll_cval",t,e)})},deep:!0}},mounted:function(){},methods:{initdata:function(){var e=this;this.inited||(this.inited=!0,this.loading=!0,this.fetchAllloadAll().then(function(t){e.loading=!1}))},deleteItem:function(t){var e=this;Object(a.a)(t).then(function(t){e.fetchAllloadAll()}).catch(function(t){e._handlerCatchMsg(t)})},Custom:function(){this.isModify=!0,this.popVisible=!0},closeAddDot:function(){this.popVisible=!1},fetchAllloadAll:function(){var e=this;return this.querySearch.vo.orgId=this.otherinfo.orgid,this.querySearch.vo.userId=this.otherinfo.userId,this.querySearch.vo.menuCode=this.code||this.$route.meta.code,Object(a.o)(this.querySearch).then(function(t){e.dataset=t.list,e.options4=t.list})},querySearchAsync:function(t,e){var i=this.dataset,a=t?i.filter(this.createStateFilter(t)):i;e(this.options4=a)},createStateFilter:function(e){return function(t){return 0===t.queryKey.toLowerCase().indexOf(e.toLowerCase())}},handleSelect:function(e){var t=this.options4.filter(function(t){return t.id===e});if(t.length){var i=t[0].queryContent,a=JSON.parse(i);this.$emit("change",JSON.parse(i.replace(/'/g,'"'))),this.$emit("dataObj",a)}}}}},zJck:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i("OEqj"),n=i("YXC3"),s=i("VU/8")(a.a,n.a,null,null,null);e.default=s.exports}});