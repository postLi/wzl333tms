webpackJsonp([81,182],{"1onU":function(e,t,i){"use strict";var a=i("VT+v"),n=i("SgVa");var s=function(e){i("FiTa"),i("7CJ8")},o=i("VU/8")(a.a,n.a,s,"data-v-4b7ed4df",null);t.a=o.exports},"7CJ8":function(e,t){},"8UOW":function(e,t,i){"use strict";var a=i("us2a"),n=i("fyBF");var s=function(e){i("Qhr/")},o=i("VU/8")(a.a,n.a,s,null,null);t.a=o.exports},FiTa:function(e,t){},IAIf:function(e,t,i){"use strict";var a=i("woOf"),r=i.n(a),n=i("DAYN"),s=i.n(n),l=i("0xDb"),c=i("t5DY");t.a={props:{popVisible:{type:Boolean,default:!1},columns:{type:Array,default:[]},code:{type:String,default:""}},components:{draggable:s.a},computed:{isShow:{get:function(){return this.popVisible},set:function(){}}},data:function(){return{orgColumnData:[],columnData:[],orgShowColumnData:[],showColumnData:[],list:[],rightList:[],listKey:0,isIndeterminateLeft:!0,isIndeterminateRight:!0,checkAllLeft:!1,checkAllRight:!1,checkListLeft:[],checkListRight:[],searchLeft:"",searchRight:"",leftListLen:0,rightListLen:0,columnListLen:0,isCheck:!0,maxLen:50,rightCheckLen:0,leftCheckLen:0,thecode:""}},mounted:function(){var a=this,e=this.code;this.$route.meta.code;"NOSET"===e?this.convertData():e?this.thecode=e:this.convertData(),this.thecode&&(this.fetchTableSetup(),this.eventBus.$on("tablesetup.change",function(e,t){if(e&&e===a.thecode){var i=a.showColumnData.filter(function(e){return e.prop===t.prop});i.length&&(i[0].width=t.width,a.changeTbaleSetup())}}))},methods:{convertData:function(e){this.initData(e),this.callback()},initData:function(t){t=t||this.columns;var o=this.maxLen,e=function(e){var n=[];if(0<t.length){var s=0;t.forEach(function(e,t){if(e.hidden){var i=Object(l.objectMerge2)(e);i.key=t,n.push(i)}else s++;if(o<s){var a=Object(l.objectMerge2)(e);a.key=t,a.hidden=!0,n.push(a)}})}return n},i=function(e){var a=[];if(0<t.length){var n=0;t.forEach(function(e,t){if(!e.hidden&&n<o){n++;var i=Object(l.objectMerge2)(e);i.hidden=!1,i.key=t,a.push(i)}})}return a},a=e().length,n=i().length;this.orgColumnData=e(),this.columnData=e(),this.orgShowColumnData=i(),this.showColumnData=i(),this.leftListLen=a,this.rightListLen=n,this.columnListLen=t.length},sort:function(e){return e.sort(function(e,t){return e.key-t.key})},doAction:function(e){switch(e){case"goRight":this.goRight();break;case"goLeft":this.goLeft()}},fetchFail:function(){this.thecode="",this.convertData()},fetchTableSetup:function(){var o=this;return Object(c.g)(this.otherinfo.orgid,this.thecode).then(function(e){var t=e.data;if((o.orgdata=t)&&t.length){1===t.length&&(t=t[0]),o.orgdata=t;var n=[],s=o.columns.length;t.sort(function(e,t){return e.titleOrder>t.titleOrder?1:-1}),t.forEach(function(e){for(var t=r()({},e),i=0;i<s;i++)if(o.columns[i].prop===e.prop){for(var a in o.columns[i])void 0!==t[a]&&null!==t[a]||(t[a]=o.columns[i][a]);break}n.push(t)}),o.columns.forEach(function(t){0===n.filter(function(e){return e.prop===t.prop}).length&&n.push(t)}),o.convertData(n)}else o.fetchFail()}).catch(function(e){o.fetchFail()})},changeTbaleSetup:function(){var t=this;if(this.thecode)return Object(c.n)(this.otherinfo.orgid,this.thecode,this.formatColumn(this.showColumnData)).then(function(e){t.$message.info("保存成功")}).catch(function(e){t._handlerCatchMsg(e)})},formatColumn:function(e){var s=this.orgdata,o=[],r=0;return e.forEach(function(t){var e=s.filter(function(e){return e.prop===t.prop});if(e.length){var i={},a=e[0];for(var n in a)i[n]=t[n];i.hidden=!1,i.titleOrder=++r,o.push(i)}}),this.columnData.forEach(function(t){var e=s.filter(function(e){return e.prop===t.prop});if(e.length){var i={},a=e[0];for(var n in a)i[n]=t[n];i.hidden=!0,i.titleOrder=++r,o.push(i)}}),o},checkRightLen:function(){this.showColumnData.length>this.maxLen?(this.$message({type:"warning",message:"列表最多只能显示"+this.maxLen+"个字段。"}),this.isCheck=!0):this.isCheck=!1},canDragStart:function(e){},setColumnLen:function(){this.leftListLen=this.columnData.length,this.rightListLen=this.showColumnData.length},handChangeAllLeft:function(e){this.checkListLeft=e?r()([],this.columnData):[],this.leftCheckLen=this.checkListLeft.length,this.isIndeterminateLeft=!1},handChangeAllRight:function(e){this.checkListRight=e?r()([],this.showColumnData):[],this.rightCheckLen=this.checkListRight.length,this.isIndeterminateRight=!1},goRight:function(){var t=this;if(this.checkListLeft.length+this.rightListLen>this.maxLen||this.rightListLen>this.maxLen-1)return this.$message({type:"warning",message:"列表最多只能显示"+this.maxLen+"个字段。"}),!1;this.columnData=this.columnData.filter(function(e){return-1===t.checkListLeft.indexOf(e)||(t.showColumnData.push(e),!1)}),this.orgColumnData=this.orgColumnData.filter(function(e){return-1===t.checkListLeft.indexOf(e)||(t.orgShowColumnData.push(e),!1)}),this.checkListLeft=[],this.setColumnLen(),this.leftCheckLen=0},goLeft:function(){var a=this;this.checkListRight.forEach(function(e,t){a.columnData.push(e),a.orgColumnData.push(e);var i=a.showColumnData.indexOf(e);-1!==i&&a.showColumnData.splice(i,1),-1!==a.orgShowColumnData.indexOf(e)&&a.orgShowColumnData.splice(i,1)}),this.sort(this.columnData),this.checkListRight=[],this.setColumnLen(),this.rightCheckLen=0},dbCheckItemLeft:function(e,t,i){if(this.rightListLen>this.maxLen-1)return this.$message({type:"warning",message:"列表最多只能显示"+this.maxLen+"个字段。"}),!1;this.showColumnData.push(e),this.orgShowColumnData.push(e),this.columnData.splice(t,1),this.orgColumnData.splice(t,1),this.setColumnLen()},dbCheckItemRight:function(e,t,i){this.columnData.push(e),this.orgColumnData.push(e),this.showColumnData.splice(t,1),this.orgShowColumnData.splice(t,1),this.setColumnLen(),this.sort(this.columnData)},handleCheckChangeLeft:function(e){this.leftCheckLen=e.length},handleCheckChangeRight:function(e){this.rightCheckLen=e.length},querySearchLeft:function(e,t){void 0===(this.searchLeft=e).label&&(this.searchLeft||(this.columnData=r()([],this.orgColumnData)));var i=r()([],this.orgColumnData);t(e?i.filter(this.createFilter(e)):i)},querySearchRight:function(e,t){void 0===(this.searchRight=e).label&&(this.searchRight||(this.showColumnData=r()([],this.orgShowColumnData)));var i=r()([],this.orgShowColumnData);t(e?i.filter(this.createFilter(e)):i)},createFilter:function(t){return function(e){return 0===e.label.toLowerCase().indexOf(t.toLowerCase())}},handleSearchLeft:function(e){var t=this;this.searchLeft=e?e.label:"";var i=r()([],this.columnData);i.forEach(function(e){e.label===t.searchLeft&&(i=[]).push(e)}),this.columnData=r()([],i),i=[]},handleSearchRight:function(e){var t=this;this.searchRight=e?e.label:"";var i=r()([],this.showColumnData);i.forEach(function(e){e.label===t.searchRight&&(i=[]).push(e)}),this.showColumnData=r()([],i),i=[]},closeMe:function(e){this.$emit("close"),"function"==typeof e&&e()},handleChange:function(e,t,i){this.rightList=r()([],e)},handleSwitch:function(e){},callback:function(){var e=r()([],this.showColumnData);this.$emit("success",e),this.listKey=Math.random(),this.closeMe()},submitForm:function(){var t=this;this.thecode?this.changeTbaleSetup().then(function(e){t.callback()}):this.callback()}}}},JW1v:function(e,t,i){"use strict";t.e=function(e){return a.b.post("/api-finance/finance/tmsfinancefeepayable/v1/findListByFeeType/",e).then(function(e){return e.data||{list:[],totalCount:0}}).catch(function(e){Object(n.handleErrorMsg)(e)})},t.f=function(e){return a.b.post("/api-finance/finance/tmsfinancefeepayable/v1/findTransferList/",e).then(function(e){return e.data||{list:[],totalCount:0}}).catch(function(e){Object(n.handleErrorMsg)(e)})},t.c=function(e){return a.b.post("/api-finance/finance/tmsfinancefeepayable/v1/findAbnormalList/",e).then(function(e){return e.data||{list:[],totalCount:0}}).catch(function(e){Object(n.handleErrorMsg)(e)})},t.d=function(e){return a.b.post("/api-finance/finance/tmsfinancefeepayable/v1/findChangeList/",e).then(function(e){return e.data||{list:[],totalCount:0}}).catch(function(e){Object(n.handleErrorMsg)(e)})},t.b=function(e,t){return a.b.post("/api-finance/finance/tmsfinancefeepayable/v1/create/"+e,t).then(function(e){return e.data}).catch(function(e){Object(n.handleErrorMsg)(e)})},t.i=function(e){return a.b.post("/api-finance/finance/tmsfinancefeepayable/v1/payListBySummary/",e).then(function(e){return e.data||{list:[],totalCount:0}}).catch(function(e){Object(n.handleErrorMsg)(e)})},t.h=function(e){return a.b.post("/api-finance/finance/tmsfinancefeepayable/v1/payListByOne/",e).then(function(e){return e.data||{list:[],totalCount:0}}).catch(function(e){Object(n.handleErrorMsg)(e)})},t.a=function(e,t){return a.b.get("/api-finance/finance/tmsfinancecapitalflow/v1/getFeeInfo/?orgId="+e+"&paymentsType="+t)},t.g=function(e){return a.b.post("/api-finance/finance/tmsfinancefeepayable/v1/loadSettlement/",e).then(function(e){return e.data}).catch(function(e){Object(n.handleErrorMsg)(e)})};var a=i("Vo7i"),n=i("0xDb")},MXEa:function(e,t){},NPIh:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=i("mSzi"),n=i("e463"),s=i("VU/8")(a.a,n.a,null,null,null);t.default=s.exports},QcgQ:function(e,t,i){"use strict";var a={render:function(){var a=this,e=a.$createElement,n=a._self._c||e;return n("el-dialog",{staticClass:"tms_dialog",attrs:{title:"表格设置",visible:a.isShow,"append-to-body":"","close-on-click-modal":!1,"before-close":a.closeMe},on:{"update:visible":function(e){a.isShow=e}}},[n("div",{staticClass:"tableSetup_warp"},[n("div",{staticClass:"tableSetup_list"},[n("div",{staticClass:"tableSetup_head"},[n("div",{staticClass:"tableSetup_head_select"},[a._v("选择："+a._s(a.leftCheckLen))]),a._v(" "),n("el-checkbox",{attrs:{indeterminate:a.isIndeterminateLeft},on:{change:a.handChangeAllLeft},model:{value:a.checkAllLeft,callback:function(e){a.checkAllLeft=e},expression:"checkAllLeft"}},[a._v("隐藏列  "+a._s(a.leftListLen)+" / "+a._s(a.columnListLen))]),a._v(" "),n("div",{staticStyle:{margin:"3px 0"}},[n("el-autocomplete",{staticClass:"inline-input",attrs:{"fetch-suggestions":a.querySearchLeft,placeholder:"请输入内容",size:"mini"},on:{select:a.handleSearchLeft},scopedSlots:a._u([{key:"default",fn:function(e){var t=e.item;return[n("span",[a._v(a._s(t.label))])]}}]),model:{value:a.searchLeft,callback:function(e){a.searchLeft=e},expression:"searchLeft"}},[n("i",{staticClass:"el-icon-search el-input__icon",attrs:{slot:"suffix"},slot:"suffix"})])],1)],1),a._v(" "),n("div",{staticClass:"tableSetup_content"},[n("el-checkbox-group",{on:{change:a.handleCheckChangeLeft},model:{value:a.checkListLeft,callback:function(e){a.checkListLeft=e},expression:"checkListLeft"}},[n("transition-group",{key:a.listKey,attrs:{name:"el-zoom-in-center"}},a._l(a.columnData,function(t,i){return n("div",{key:i,staticClass:"tableSetup_item",on:{dblclick:function(e){a.dbCheckItemLeft(t,i,e)}}},[n("el-checkbox",{attrs:{label:t}},[a._v("\n                "+a._s(t.label)+"\n              ")])],1)}))],1)],1),a._v(" "),n("div",{staticClass:"tableSetup_tips"},[n("span",[a._v("双击，可快速左右切换。")])])]),a._v(" "),n("div",{staticClass:"tableSetup_btn"},[n("el-button",{attrs:{type:"primary",icon:"el-icon-arrow-right"},on:{click:function(e){a.doAction("goRight")}}}),a._v(" "),n("br"),a._v(" "),n("el-button",{attrs:{type:"primary",icon:"el-icon-arrow-left"},on:{click:function(e){a.doAction("goLeft")}}})],1),a._v(" "),n("div",{staticClass:"tableSetup_list"},[n("div",{staticClass:"tableSetup_head"},[n("div",{staticClass:"tableSetup_head_select"},[a._v("选择："+a._s(a.rightCheckLen))]),a._v(" "),n("el-checkbox",{attrs:{indeterminate:a.isIndeterminateRight},on:{change:a.handChangeAllRight},model:{value:a.checkAllRight,callback:function(e){a.checkAllRight=e},expression:"checkAllRight"}},[a._v("显示列 "+a._s(a.rightListLen)+" / "+a._s(a.columnListLen))]),a._v(" "),n("div",{staticStyle:{margin:"3px 0"}},[n("el-autocomplete",{staticClass:"inline-input",attrs:{"fetch-suggestions":a.querySearchRight,placeholder:"请输入内容",size:"mini"},on:{select:a.handleSearchRight},scopedSlots:a._u([{key:"default",fn:function(e){var t=e.item;return[n("span",[a._v(a._s(t.label))])]}}]),model:{value:a.searchRight,callback:function(e){a.searchRight=e},expression:"searchRight"}},[n("i",{staticClass:"el-icon-search el-input__icon",attrs:{slot:"suffix"},slot:"suffix"})])],1)],1),a._v(" "),n("div",{staticClass:"tableSetup_content"},[n("el-checkbox-group",{on:{change:a.handleCheckChangeRight},model:{value:a.checkListRight,callback:function(e){a.checkListRight=e},expression:"checkListRight"}},[n("draggable",{staticClass:"dragArea",attrs:{move:a.canDragStart,list:a.showColumnData}},[n("transition-group",{attrs:{name:"el-zoom-in-center"}},a._l(a.showColumnData,function(t,i){return n("div",{key:i,staticClass:"tableSetup_item",on:{dblclick:function(e){a.dbCheckItemRight(t,i,e)}}},[n("el-checkbox",{attrs:{label:t}},[a._v("\n                  "+a._s(t.label)+"\n                ")]),a._v(" "),n("el-switch",{attrs:{"active-text":t.fixed?"固定":"活动"},on:{change:function(e){a.handleSwitch(t)}},model:{value:t.fixed,callback:function(e){a.$set(t,"fixed",e)},expression:"column.fixed"}})],1)}))],1)],1)],1),a._v(" "),n("div",{staticClass:"tableSetup_tips"},[n("span",[a._v("拖拽，可调整上下顺序。")]),a._v(" "),n("br"),n("span",[a._v("列表最多只能显示"+a._s(a.maxLen)+"个字段。")])])])]),a._v(" "),n("div",{attrs:{slot:"footer"},slot:"footer"},[n("el-button",{attrs:{type:"primary"},on:{click:function(e){a.submitForm()}}},[a._v("确 定")]),a._v(" "),n("el-button",{on:{click:a.closeMe}},[a._v("取 消")])],1)])},staticRenderFns:[]};t.a=a},"Qhr/":function(e,t){},SgVa:function(e,t,i){"use strict";var a={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"tms-pagenation"},[i("span",{staticClass:"page-num",class:{disabled:t.pageNum<=1},on:{click:function(e){t.jumpTo(1)}}},[i("span",{staticClass:"first-page"})]),i("span",{staticClass:"page-num",class:{disabled:t.pageNum<=1},on:{click:function(e){t.jumpTo(t.pageNum-1)}}},[i("span",{staticClass:"prev-page"})]),t._v(" "),i("span",{staticClass:"page-jumper"},[t._v("\n    第\n    "),i("el-input",{ref:"input",staticClass:"el-pagination__editor is-in-pagination",attrs:{min:1,max:t.pages,type:"number",disabled:t.pages<=1},on:{change:t.handleChange,focus:t.handleFocus,blur:t.handleBlur},nativeOn:{keydown:function(e){return t.handleKeyup(e)}},model:{value:t.inputval,callback:function(e){t.inputval="string"==typeof e?e.trim():e},expression:"inputval"}}),t._v(" 页\n  ")],1),t._v("\n  /共 "+t._s(t.pages)+" 页\n  "),i("span",{staticClass:"page-num",class:{disabled:t.pageNum===t.pages},on:{click:function(e){t.jumpTo(t.pageNum+1)}}},[i("span",{staticClass:"next-page"})]),t._v(" "),i("span",{staticClass:"page-num",class:{disabled:t.pageNum===t.pages},on:{click:function(e){t.jumpTo(t.pages)}}},[i("span",{staticClass:"last-page"})]),t._v(" "),i("span",{staticClass:"tms-pagination__sizes"},[i("el-select",{staticClass:"page-select",attrs:{placeholder:"请选择"},on:{change:t.sizesChange},model:{value:t.size,callback:function(e){t.size=e},expression:"size"}},t._l(t.sizes,function(e,t){return i("el-option",{key:t,attrs:{label:e,value:e}})}))],1)])},staticRenderFns:[]};t.a=a},SjYS:function(e,t,i){"use strict";var a=i("seR9"),n=i("msh6");var s=function(e){i("nl9Y")},o=i("VU/8")(a.a,n.a,s,null,null);t.a=o.exports},"VT+v":function(e,t,i){"use strict";t.a={props:{sizes:{type:Array,default:function(){return[100,200,300,400]}},total:{type:Number,default:0}},computed:{pages:function(){return Math.ceil(this.total/this.size)}},watch:{pageNum:function(){this.inputval=this.pageNum},size:function(){this.pageNum=1}},mounted:function(){this.size=this.sizes[0]},data:function(){return{pageNum:1,oldValue:0,inputval:1,oldNum:1,size:100}},methods:{handleFocus:function(e){this.oldValue=e.target.value},sizesChange:function(){this.pageNum=1,this.oldNum=this.pageNum,this.$emit("change",{pageNum:this.pageNum,pageSize:this.size})},changeEvent:function(){this.oldNum!==this.pageNum&&(this.oldNum=this.pageNum,this.$emit("change",{pageNum:this.pageNum,pageSize:this.size}))},handleCurrentChange:function(e){this.pageNum=e,this.changeEvent()},handleSizeChange:function(e){this.size=e,this.changeEvent()},handleChange:function(e){var t=parseInt(e,10);isNaN(t)?this.inputval=1:t<1?this.inputval=1:t>this.pages?this.inputval=this.pages:this.inputval=t},handleBlur:function(e){var t=e.target;this.handleChange(t.value),this.jumpTo(this.inputval)},handleKeyup:function(e){var t=e.keyCode,i=e.target;console.log("page keydown:",t,i),13===t&&this.oldValue&&i.value!==this.oldValue&&(this.handleChange(i.value),this.oldValue="")},jumpTo:function(e){e<1?this.pageNum=1:e>this.pages?this.pageNum=this.pages:this.pageNum=e,this.changeEvent()}}}},WE62:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=i("xK1H"),n=i("wLV8"),s=i("VU/8")(a.a,n.a,null,null,null);t.default=s.exports},bOdI:function(e,t,i){"use strict";t.__esModule=!0;var a,n=i("C4MV"),s=(a=n)&&a.__esModule?a:{default:a};t.default=function(e,t,i){return t in e?(0,s.default)(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}},e463:function(e,t,i){"use strict";var a={render:function(){var a=this,e=a.$createElement,n=a._self._c||e;return n("div",{directives:[{name:"loading",rawName:"v-loading",value:a.loading,expression:"loading"}],staticClass:"tab-content"},[n("SearchForm",{attrs:{orgid:a.otherinfo.orgid,btnsize:a.btnsize,isAbnormal:!0},on:{change:a.getSearchParam}}),a._v(" "),n("div",{staticClass:"tab_info"},[n("div",{staticClass:"btns_box"},[n("el-button",{directives:[{name:"has",rawName:"v-has:PAY_SHIPSET5",arg:"PAY_SHIPSET5"}],attrs:{type:"primary",size:a.btnsize,icon:"el-icon-sort",plain:""},on:{click:function(e){a.doAction("count")}}},[a._v("结算")]),a._v(" "),n("el-button",{directives:[{name:"has",rawName:"v-has:PAY_SHIPPRI5",arg:"PAY_SHIPPRI5"}],attrs:{type:"primary",size:a.btnsize,icon:"el-icon-printer",plain:""},on:{click:function(e){a.doAction("print")}}},[a._v("打印")]),a._v(" "),n("el-button",{directives:[{name:"has",rawName:"v-has:PAY_SHIPEXP5",arg:"PAY_SHIPEXP5"}],attrs:{type:"primary",size:a.btnsize,icon:"el-icon-download",plain:""},on:{click:function(e){a.doAction("export")}}},[a._v("导出")]),a._v(" "),n("el-button",{staticClass:"table_setup",attrs:{type:"primary",size:a.btnsize,icon:"el-icon-setting",plain:""},on:{click:a.setTable}},[a._v("表格设置")])],1),a._v(" "),n("div",{staticClass:"info_tab"},[n("el-table",{key:a.tablekey,ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:a.dataList,stripe:"",border:"",height:"100%","tooltip-effect":"dark"},on:{"row-click":a.clickDetails,"selection-change":a.getSelection,"cell-dblclick":a.showDetail}},[n("el-table-column",{attrs:{fixed:"",sortable:"",type:"selection",width:"35"}}),a._v(" "),a._l(a.tableColumn,function(i){return[i.slot?n("el-table-column",{key:i.id,attrs:{fixed:i.fixed,sortable:"",label:i.label,width:i.width},scopedSlots:a._u([{key:"default",fn:function(t){return[i.click?n("span",{staticClass:"clickitem",domProps:{innerHTML:a._s(i.slot(t))},on:{click:function(e){e.stopPropagation(),i.click(t)}}}):n("span",{domProps:{innerHTML:a._s(i.slot(t))}})]}}])}):n("el-table-column",{key:i.id,attrs:{fixed:i.fixed,sortable:"",label:i.label,prop:i.prop,width:i.width}})]})],2)],1)]),a._v(" "),n("div",{staticClass:"info_tab_footer"},[a._v("\n    共计:"+a._s(a.total)+"\n    "),n("div",{staticClass:"show_pager"},[n("Pager",{attrs:{total:a.total},on:{change:a.handlePageChange}})],1)]),a._v(" "),n("TableSetup",{attrs:{popVisible:a.setupTableVisible,columns:a.tableColumn},on:{close:a.closeSetupTable,success:a.setColumn}})],1)},staticRenderFns:[]};t.a=a},fyBF:function(e,t,i){"use strict";var a={render:function(){var i=this,e=i.$createElement,a=i._self._c||e;return a("div",{staticClass:"searchAll_lyy"},[a("el-form-item",{staticClass:"zdycx",attrs:{label:"自定义查询"}},[a("el-select",{attrs:{filterable:"",placeholder:"请选择","filter-method":i.querySearchAsync,"popper-class":"zdycx-pop",loading:i.loading},on:{change:i.handleSelect,focus:i.initdata},model:{value:i.datalist,callback:function(e){i.datalist=e},expression:"datalist"}},i._l(i.options4,function(t,e){return a("el-option",{key:e,attrs:{label:t.queryKey,value:t.id}},[i._v("\r\n        "+i._s(t.queryKey)+" "),a("i",{staticClass:"el-icon-circle-close-outline",on:{click:function(e){e.stopPropagation(),e.preventDefault(),i.deleteItem(t.id)}}})])})),i._v(" "),a("el-button",{attrs:{plain:""},on:{click:i.Custom}},[i._v("保存自定义")])],1),i._v(" "),a("addSave",{attrs:{searchObj:i.searchObj,popVisible:i.popVisible},on:{close:i.closeAddDot,success:i.fetchAllloadAll}})],1)},staticRenderFns:[]};t.a=a},mSzi:function(e,t,i){"use strict";var a,n=i("bOdI"),s=i.n(n),o=i("mvHQ"),r=i.n(o),l=i("woOf"),c=i.n(l),h=i("0xDb"),u=i("WE62"),f=i("1onU"),d=i("puNT"),p=i("JW1v"),m=i("Mqi+"),g=i("UQm2");t.a={components:{SearchForm:u.default,Pager:f.a,TableSetup:d.a},data:function(){var i=this;return{btnsize:"mini",searchQuery:{currentPage:1,pageSize:100,vo:{}},tablekey:0,total:0,dataList:[],loading:!0,setupTableVisible:!1,tableColumn:[{label:"开单网点",prop:"shipFromOrgName",width:"140",fixed:!0},{label:"运单号",prop:"shipSn",width:"120",fixed:!1},{label:"货号",prop:"shipGoodsSn",width:"150",fixed:!1},{label:"结算状态",prop:"statusName",width:"150",fixed:!1},{label:"签收状态",prop:"signStatusName",width:"100",fixed:!1},{label:"运单标识",prop:"shipIdentifying",width:"150",fixed:!1,slot:function(e){return Object(m.b)(e.row.shipIdentifying)}},{label:"出发城市",prop:"shipFromCityName",width:"140",fixed:!1},{label:"到达城市",prop:"shipToCityName",width:"140",fixed:!1},{label:"异常理赔",prop:"fee",width:"90",fixed:!1},{label:"已结异常理赔",prop:"closeFee",width:"110",fixed:!1,slot:function(e){var t=e.row;return i._setTextColor(t.fee,t.closeFee,t.unpaidFee,t.closeFee)}},{label:"未结异常理赔",prop:"unpaidFee",width:"110",fixed:!1,slot:function(e){var t=e.row;return i._setTextColor(t.fee,t.closeFee,t.unpaidFee,t.unpaidFee)}},{label:"开单日期",prop:"createTime",width:"160",slot:function(e){return""+Object(h.parseTime)(e.row.createTime,"{y}-{m}-{d} {h}:{i}:{s}")},fixed:!1},{label:"发货方",prop:"senderUnit",width:"100",fixed:!1},{label:"发货人",prop:"senderCustomerName",width:"100",fixed:!1},{label:"收货方",prop:"receiverUnit",width:"100",fixed:!1},{label:"收货人",prop:"receiverCustomerName",width:"100",fixed:!1},{label:"货品名",prop:"cargoName",width:"100",fixed:!1},{label:"件数",prop:"cargoAmount",width:"90",fixed:!1},{label:"重量(kg)",prop:"cargoWeight",width:"90",fixed:!1},{label:"体积(方)",prop:"cargoVolume",width:"90",fixed:!1},{label:"付款方式",prop:"shipPayWayName",width:"90",fixed:!1},{label:"制单人",prop:"userName",width:"100",fixed:!1},{label:"发货人电话",prop:"senderCustomerMobile",width:"110",fixed:!1},{label:"发货人地址",prop:"senderDetailedAddress",width:"150",fixed:!1},{label:"收货人电话",prop:"receiverCustomerMobile",width:"110",fixed:!1},{label:"收货地址",prop:"receiverDetailedAddress",width:"150",fixed:!1},{label:"交接方式",prop:"shipDeliveryMethodName",width:"100",fixed:!1},{label:"时效",prop:"shipEffectiveName",width:"80",fixed:!1},{label:"运单备注",prop:"shipRemarks",width:"150",fixed:!1}]}},methods:(a={getSearchParam:function(e){this.searchQuery.vo=c()({},e),this.fetchList()},handlePageChange:function(e){this.searchQuery.currentPage=e.pageNum,this.searchQuery.pageSize=e.pageSize,this.fetchList()},fetchList:function(){var t=this;return this.selectListShipSns=[],this.loading=!0,Object(p.c)(this.searchQuery).then(function(e){t.dataList=e.list,t.total=e.total,t.loading=!1}).catch(function(e){t.loading=!1,t._handlerCatchMsg(e)})},setTable:function(){},doAction:function(e){switch(e){case"count":this.count();break;case"export":Object(g.h)({data:this.dataList,columns:this.tableColumn,name:"运单结算-异常理赔-"+Object(h.parseTime)(new Date,"{y}{m}{d}{h}{i}{s}")});break;case"print":Object(g.e)({data:this.dataList,columns:this.tableColumn,name:"运单结算-异常理赔"})}},count:function(){this.$router.push({path:"../../accountsLoad",query:{tab:"异常理赔结算",currentPage:"waybillAbnormal",searchQuery:r()(this.searchQuery),selectListShipSns:r()(this.selectListShipSns)}})},clickDetails:function(e){this.$refs.multipleTable.toggleRowSelection(e)},getSelection:function(e){var i=this;this.selectListShipSns=[],e.forEach(function(e,t){i.selectListShipSns.push(e.shipSn)})},showDetail:function(e){this.eventBus.$emit("showOrderDetail",e.shipId,e.shipSn,!0)}},s()(a,"setTable",function(){this.setupTableVisible=!0}),s()(a,"closeSetupTable",function(){this.setupTableVisible=!1}),s()(a,"setColumn",function(e){this.tableColumn=e,this.tablekey=Math.random()}),a)}},msh6:function(e,t,i){"use strict";var a={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-dialog",{staticClass:"wzl_settleLogSave",attrs:{title:t.popTitle,visible:t.isShow,"close-on-click-modal":!1,"before-close":t.closeMe},on:{close:t.closeMe,"update:visible":function(e){t.isShow=e}}},[i("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:t.form,rules:t.rules,"label-width":t.formLabelWidth,inline:!0,"label-position":"right",size:"mini"}},[i("el-form-item",{attrs:{label:"名称：",prop:"queryKey"}},[i("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.form.queryKey,expression:"form.queryKey",modifiers:{trim:!0}}],attrs:{maxlength:20,placeholder:"请定义名称"},domProps:{value:t.form.queryKey},on:{input:function(e){e.target.composing||t.$set(t.form,"queryKey",e.target.value.trim())},blur:function(e){t.$forceUpdate()}}})])],1),t._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{type:"primary",disabled:0===t.form.queryKey.length},on:{click:function(e){t.submitForm("ruleForm")}}},[t._v("确 定")]),t._v(" "),i("el-button",{on:{click:t.closeMe}},[t._v("取 消")])],1)],1)},staticRenderFns:[]};t.a=a},nl9Y:function(e,t){},puNT:function(e,t,i){"use strict";var a=i("IAIf"),n=i("QcgQ");var s=function(e){i("MXEa")},o=i("VU/8")(a.a,n.a,s,null,null);t.a=o.exports},seR9:function(e,t,i){"use strict";var a=i("mvHQ"),n=i.n(a),s=i("t5DY"),o=i("0xDb");t.a={computed:{isShow:{get:function(){return this.popVisible},set:function(){}}},components:{},props:{popVisible:{type:Boolean,default:!1},dotInfo:[Object,Array],searchQuery:[Object,Array],isDepMain:{type:Boolean,default:!1},createrId:[Number,String],isModify:{type:Boolean,default:!1},isAccept:{type:Boolean,default:!1},proptitle:String,searchObj:{type:[Array,Object],default:function(){}}},data:function(){return{form:{userId:"",orgId:"",menuCode:"",queryKey:"",queryContent:""},searchCreatTime:+new Date,pickOption2:"",formLabelWidth:"75px",tooltip:!1,rules:{},queryKey:"",checked1:!0,popTitle:"自定义标签",loading:!1,type:""}},mounted:function(){},watch:{orgid:function(e){this.form.orgid=e},popVisible:function(e){e&&(this.form.userId=this.otherinfo.userId,this.form.orgId=this.otherinfo.orgid,this.form.menuCode=this.$route.meta.code)}},methods:{reset:function(){this.$refs.ruleForm.resetFields()},closeMe:function(e){this.$emit("close"),this.reset(),"function"==typeof e&&e()},submitForm:function(e){var i=this;this.loading||this.$refs[e].validate(function(e){if(!e)return!1;i.loading=!0,i.form.queryContent=n()(i.searchObj);var t=Object(o.objectMerge2)({},i.form);console.log("addSave_data",t),Object(s.m)(t).then(function(e){i.loading=!1,i.$message({message:"保存成功~",type:"success"}),i.closeMe(),i.$emit("success")}).catch(function(e){i.loading=!1,i.$message.warning(e.text)})})}}}},us2a:function(e,t,i){"use strict";var a=i("t5DY"),n=i("SjYS");t.a={components:{addSave:n.a},props:{searchObj:{type:[Object,Array]},value:[String,Number]},data:function(){return{isModify:!1,popVisible:!1,setupTableVisible:!1,dataset:[],datalist:"",timeout:null,loading:!1,options4:[],querySearch:{currentPage:1,pageSize:10,vo:{orgId:"",userId:"",menuCode:""}}}},watch:{value:function(e){console.log("nnn:",e),""===e&&(this.datalist="")},searchObj:{handler:function(e,t){this.$nextTick(function(){console.log("searchAll_cval",e,t)})},deep:!0}},mounted:function(){},methods:{initdata:function(){var t=this;this.inited||(this.inited=!0,this.loading=!0,this.fetchAllloadAll().then(function(e){t.loading=!1}))},deleteItem:function(e){var t=this;Object(a.a)(e).then(function(e){t.fetchAllloadAll()}).catch(function(e){t._handlerCatchMsg(e)})},Custom:function(){this.isModify=!0,this.popVisible=!0},closeAddDot:function(){this.popVisible=!1},fetchAllloadAll:function(){var t=this;return this.querySearch.vo.orgId=this.otherinfo.orgid,this.querySearch.vo.userId=this.otherinfo.userId,this.querySearch.vo.menuCode=this.$route.meta.code,Object(a.l)(this.querySearch).then(function(e){t.dataset=e.list,t.options4=e.list})},querySearchAsync:function(e,t){var i=this.dataset,a=e?i.filter(this.createStateFilter(e)):i;t(this.options4=a)},createStateFilter:function(t){return function(e){return 0===e.queryKey.toLowerCase().indexOf(t.toLowerCase())}},handleSelect:function(t){var e=this.options4.filter(function(e){return e.id===t});if(e.length){var i=e[0].queryContent,a=JSON.parse(i);this.$emit("change",JSON.parse(i.replace(/'/g,'"'))),this.$emit("dataObj",a)}}}}},wLV8:function(e,t,i){"use strict";var a={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-form",{ref:"searchForm",staticClass:"staff_searchinfo clearfix",attrs:{inline:!0,size:t.btnsize,"label-position":"right",rules:t.rules,model:t.searchForm,"label-width":"70px"}},[i("div",{staticClass:"staff_searchinfo--input"},[i("el-form-item",{attrs:{label:"开单时间"}},[i("el-date-picker",{attrs:{"default-value":t.defaultTime,type:"daterange",align:"right","value-format":"yyyy-MM-dd HH:mm:ss","start-placeholder":"开始日期","picker-options":t.pickerOptions,"end-placeholder":"结束日期"},model:{value:t.searchTime,callback:function(e){t.searchTime=e},expression:"searchTime"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"开单网点",prop:"shipFromOrgid"}},[t.isTransferSel||t.isAbnormal?i("SelectTree",{model:{value:t.searchForm.shipFromOrgid,callback:function(e){t.$set(t.searchForm,"shipFromOrgid",e)},expression:"searchForm.shipFromOrgid"}}):i("SelectTree",{attrs:{orgid:t.otherinfo.orgid},model:{value:t.searchForm.shipFromOrgid,callback:function(e){t.$set(t.searchForm,"shipFromOrgid",e)},expression:"searchForm.shipFromOrgid"}})],1),t._v(" "),t.isTransferSel?i("el-form-item",{attrs:{label:"中转网点",prop:"transferOrgid"}},[i("SelectTree",{attrs:{orgid:t.otherinfo.orgid},model:{value:t.searchForm.transferOrgid,callback:function(e){t.$set(t.searchForm,"transferOrgid",e)},expression:"searchForm.transferOrgid"}})],1):t._e(),t._v(" "),t.isAbnormal?i("el-form-item",{attrs:{label:"结算网点",prop:"orgid"}},[i("SelectTree",{attrs:{orgid:t.otherinfo.orgid},model:{value:t.searchForm.orgid,callback:function(e){t.$set(t.searchForm,"orgid",e)},expression:"searchForm.orgid"}})],1):t._e(),t._v(" "),i("el-form-item",{attrs:{label:"结算状态",prop:"status"}},[i("el-select",{attrs:{placeholder:"结算状态"},model:{value:t.searchForm.status,callback:function(e){t.$set(t.searchForm,"status",e)},expression:"searchForm.status"}},t._l(t.$const.COUNT_STATUS,function(e,t){return i("el-option",{key:t,attrs:{value:t,label:e}})}))],1),t._v(" "),i("el-form-item",{attrs:{label:"运单号",prop:"shipSn"}},[i("el-input",{attrs:{maxlength:t.maxlength,clearable:""},model:{value:t.searchForm.shipSn,callback:function(e){t.$set(t.searchForm,"shipSn",e)},expression:"searchForm.shipSn"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"发货方",prop:"senderUnit"}},[i("el-input",{attrs:{clearable:"",maxlength:t.maxlength},model:{value:t.searchForm.senderUnit,callback:function(e){t.$set(t.searchForm,"senderUnit",e)},expression:"searchForm.senderUnit"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"发货人",prop:"senderName"}},[i("el-input",{attrs:{clearable:"",maxlength:t.maxlength},model:{value:t.searchForm.senderName,callback:function(e){t.$set(t.searchForm,"senderName",e)},expression:"searchForm.senderName"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"出发城市"}},[i("el-input",{attrs:{clearable:"",maxlength:t.maxlength},model:{value:t.searchForm.shipFromCityName,callback:function(e){t.$set(t.searchForm,"shipFromCityName",e)},expression:"searchForm.shipFromCityName"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"到达城市"}},[i("el-input",{attrs:{clearable:"",maxlength:t.maxlength},model:{value:t.searchForm.shipToCityName,callback:function(e){t.$set(t.searchForm,"shipToCityName",e)},expression:"searchForm.shipToCityName"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"签收状态",prop:"signStatus"}},[i("selectType",{attrs:{type:"sign_status"},model:{value:t.searchForm.signStatus,callback:function(e){t.$set(t.searchForm,"signStatus",e)},expression:"searchForm.signStatus"}},[i("el-option",{attrs:{slot:"head",label:"全部",value:""},slot:"head"})],1)],1),t._v(" "),i("searchAll",{attrs:{searchObj:t.searchObjs},on:{dataObj:t.getDataObj},model:{value:t.searchAll,callback:function(e){t.searchAll=e},expression:"searchAll"}})],1),t._v(" "),i("el-form-item",{staticClass:"staff_searchinfo--btn"},[i("el-button",{attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v("查询")]),t._v(" "),i("el-button",{attrs:{type:"info",plain:""},on:{click:function(e){t.clearForm("searchForm")}}},[t._v("清空")])],1)],1)},staticRenderFns:[]};t.a=a},xK1H:function(e,t,i){"use strict";var a=i("woOf"),n=i.n(a),s=i("E4LH"),o=i("o9X6"),r=i("pAQG"),l=i("0xDb"),c=i("8UOW"),h=i("9UCZ");t.a={components:{SelectTree:o.a,querySelect:r.a,searchAll:c.a,SelectType:h.a},props:{btnsize:{type:String,default:"mini"},orgid:{type:Number},isTransferSel:{type:Boolean,default:!1},isAbnormal:{type:Boolean,default:!1}},data:function(){return{searchAll:"1",maxlength:25,searchObjs:{},searchForm:{shipFromOrgid:"",orgid:"",signStatus:"",shipSn:"",status:""},rules:{shipSn:[{validator:function(e,t,i){var a=s.a.ONLY_NUMBER;""!==t&&null!==t&&t&&void 0!==t?a.test(t)?i():i(new Error("请输入最多15位数字")):i()},tigger:"blur"}]},searchTime:[Object(l.parseTime)(new Date-5184e6),Object(l.parseTime)(new Date)],defaultTime:[+new Date-5184e6,+new Date],pickerOptions:{shortcuts:l.pickerOptions2}}},watch:{orgid:function(e){this.searchForm.orgid=e},searchTime:function(e){e&&(this.$set(this.searchObjs,"startTime",Object(l.parseTime)(this.searchTime[0],"{y}-{m}-{d} ")+"00:00:00"),this.$set(this.searchObjs,"endTime",Object(l.parseTime)(this.searchTime[1],"{y}-{m}-{d} ")+"23:59:59"))},searchForm:{handler:function(e,t){this.searchObjs=n()({},e),this.searchTime&&(this.$set(this.searchObjs,"startTime",Object(l.parseTime)(this.searchTime[0],"{y}-{m}-{d} ")+"00:00:00"),this.$set(this.searchObjs,"endTime",Object(l.parseTime)(this.searchTime[1],"{y}-{m}-{d} ")+"23:59:59")),console.log(this.searchObjs,e,t)},deep:!0}},mounted:function(){this.isTransferSel&&(this.searchForm.transferOrgid=this.orgid),this.isAbnormal&&(this.searchForm.orgid=this.orgid),this.searchForm.shipFromOrgid=this.orgid,this.onSubmit()},methods:{getDataObj:function(e){this.searchTime=[e.startTime,e.endTime],this.searchForm=n()({},e),this.$emit("change",e)},onSubmit:function(){var e=n()({},this.searchForm);this.searchTime&&(this.$set(e,"startTime",Object(l.parseTime)(this.searchTime[0],"{y}-{m}-{d} ")+"00:00:00"),this.$set(e,"endTime",Object(l.parseTime)(this.searchTime[1],"{y}-{m}-{d} ")+"23:59:59")),this.$emit("change",e)},clearForm:function(e){var t=this;this.$nextTick(function(){n()(t.$data,t.$options.data()),t.$refs[e].resetFields(),t.searchForm.shipFromOrgid=t.orgid,t.searchAll="1",setTimeout(function(){t.searchAll=""},50)})}}}}});