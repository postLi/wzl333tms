webpackJsonp([103,181],{"/vQs":function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=i("jpWh"),s=i("iRzY"),n=i("VU/8")(a.a,s.a,null,null,null);t.default=n.exports},"1onU":function(e,t,i){"use strict";var a=i("VT+v"),s=i("SgVa");var n=function(e){i("FiTa"),i("7CJ8")},o=i("VU/8")(a.a,s.a,n,"data-v-4b7ed4df",null);t.a=o.exports},"7CJ8":function(e,t){},"8UOW":function(e,t,i){"use strict";var a=i("us2a"),s=i("fyBF");var n=function(e){i("Qhr/")},o=i("VU/8")(a.a,s.a,n,null,null);t.a=o.exports},CaeW:function(e,t,i){"use strict";t.c=function(e,t){return s.b.post("/api-finance/finance/feeReceivable/v1/create/"+e,t)},t.b=function(e){return s.b.post("/api-finance/finance/feeReceivable/v1/list",e).then(function(e){return e.data||{list:[],totalCount:0}})},t.a=function(){return s.b.get("/api-finance/finance/feeReceivable/v1/getReceivableToDoCount")};var a=i("//Fk"),s=(i.n(a),i("Vo7i"))},FaHG:function(e,t,i){"use strict";var a=i("woOf"),s=i.n(a),n=i("CaeW"),o=i("/vQs"),r=i("puNT"),l=i("1onU"),c=i("Mqi+"),h=i("0xDb"),u=i("UQm2");t.a={components:{SearchForm:o.default,Pager:l.a,TableSetup:r.a},mounted:function(){},data:function(){var i=this;return{btnsize:"mini",usersArr:[],total:0,loading:!0,setupTableVisible:!1,isModify:!1,selectInfo:{},selected:[],searchQuery:{currentPage:1,pageSize:100,vo:{shipFromOrgid:"",endTime:"",startTime:"",senderName:"",senderCompanyName:"",shipFromCityCode:"",shipToCityCode:"",ascriptionOrgId:"",shipSn:"",status:"NOSETTLEMENT",feeType:2}},tablekey:"",tableColumn:[{label:"序号",prop:"",fixed:!0,slot:function(e){return e.$index+1}},{label:"开单网点",prop:"shipFromOrgName",fixed:!0},{label:"运单号",prop:"shipSn",width:120},{label:"货号",prop:"shipGoodsSn",width:"150"},{label:"运单标识",prop:"shipIdentifying",slot:function(e){return Object(c.b)(e.row.shipIdentifying)}},{label:"签收状态",prop:"signStatus",width:"100",fixed:!1},{label:"出发城市",prop:"shipFromCityName"},{label:"到达城市",prop:"shipToCityName"},{label:"结算状态",prop:"arrivepayStateCn"},{label:"到付",prop:"arrivepayFee"},{label:"已结到付",prop:"finishArrivepayFee",slot:function(e){var t=e.row;return i._setTextColor(t.arrivepayFee,t.finishArrivepayFee,t.notArrivepayFee,t.finishArrivepayFee)}},{label:"未结到付",prop:"notArrivepayFee",slot:function(e){var t=e.row;return i._setTextColor(t.arrivepayFee,t.finishArrivepayFee,t.notArrivepayFee,t.notArrivepayFee)}},{label:"开单日期",prop:"createTime",width:180},{label:"发货方",prop:"senderCustomerUnit"},{label:"发货人",prop:"shipSenderName"},{label:"收货方",prop:"receiverCustomerUnit"},{label:"收货人",prop:"shipReceiverName"},{label:"货品名",prop:"cargoName"},{label:"件数",prop:"cargoAmount"},{label:"重量(kg)",prop:"cargoWeight"},{label:"体积(方)",prop:"cargoVolume"},{label:"付款方式",prop:"shipPayWay"},{label:"制单人",prop:"userName"},{label:"发货人电话",prop:"senderMobile"},{label:"发货人地址",prop:"senderAddr"},{label:"收货人电话",prop:"receiverMoblie"},{label:"收货地址",prop:"receiverAddr"},{label:"交接方式",prop:"shipDeliveryMethod"},{label:"时效",prop:"shipEffectiveName"},{label:"运单备注",prop:"shipRemarks"}]}},methods:{viewDetails:function(e){e=e||[],console.log("row:",e.map(function(e){console.log("11")}).join(",")),this.$router.push({path:"/finance/accountsLoadReceivable",query:{searchQuery:this.searchQuery,currentPage:"arrive",selectListShipSns:e.map(function(e){return e.shipSn})}})},showDetail:function(e){this.viewDetails([e])},fetchAllOrder:function(){var t=this;return this.loading=!0,n.b(this.searchQuery).then(function(e){t.usersArr=e.list,t.total=e.total,t.loading=!1}).catch(function(e){t.loading=!1,t._handlerCatchMsg(e)})},fetchData:function(){this.fetchAllOrder()},handlePageChange:function(e){this.searchQuery.currentPage=e.pageNum,this.searchQuery.pageSize=e.pageSize,this.fetchData()},getSearchParam:function(e){this.searchQuery.vo=s()(this.searchQuery.vo,e),this.loading=!1,this.fetchData()},doAction:function(e){if(!this.selected.length&&"add"!==e&&"export"!==e&&"print"!==e)return this.$message({message:"请选择要操作的项~",type:"warning"}),!1;switch(console.log("this.selected:",this.selected),e){case"detail":this.isModify=!1,this.selectInfo={},this.showDetail(this.selected[0]);break;case"export":Object(u.h)({data:this.selected.length?this.selected:this.usersArr,columns:this.tableColumn,name:"到付应收账款-"+Object(h.parseTime)(new Date,"{y}{m}{d}{h}{i}{s}")});break;case"print":Object(u.e)({data:this.selected.length?this.selected:this.usersArr,columns:this.tableColumn,name:"到付应收账款"})}this.$refs.multipleTable.clearSelection()},setTable:function(){this.setupTableVisible=!0},closeSetupTable:function(){this.setupTableVisible=!1},setColumn:function(e){this.tableColumn=e,this.tablekey=Math.random()},clickDetails:function(e,t,i){this.$refs.multipleTable.toggleRowSelection(e)},getSelection:function(e){this.selected=e},getSummaries:function(e){return Object(h.getSummaries)(e)}}}},FiTa:function(e,t){},IAIf:function(e,t,i){"use strict";var a=i("woOf"),r=i.n(a),s=i("DAYN"),n=i.n(s),l=i("0xDb"),c=i("t5DY");t.a={props:{popVisible:{type:Boolean,default:!1},columns:{type:Array,default:[]},code:{type:String,default:""}},components:{draggable:n.a},computed:{isShow:{get:function(){return this.popVisible},set:function(){}}},data:function(){return{orgColumnData:[],columnData:[],orgShowColumnData:[],showColumnData:[],list:[],rightList:[],listKey:0,isIndeterminateLeft:!0,isIndeterminateRight:!0,checkAllLeft:!1,checkAllRight:!1,checkListLeft:[],checkListRight:[],searchLeft:"",searchRight:"",leftListLen:0,rightListLen:0,columnListLen:0,isCheck:!0,maxLen:50,rightCheckLen:0,leftCheckLen:0,thecode:""}},mounted:function(){var a=this,e=this.code;this.$route.meta.code;"NOSET"===e?this.convertData():e?this.thecode=e:this.convertData(),this.thecode&&(this.fetchTableSetup(),this.eventBus.$on("tablesetup.change",function(e,t){if(e&&e===a.thecode){var i=a.showColumnData.filter(function(e){return e.prop===t.prop});i.length&&(i[0].width=t.width,a.changeTbaleSetup())}}))},methods:{convertData:function(e){this.initData(e),this.callback()},initData:function(t){t=t||this.columns;var o=this.maxLen,e=function(e){var s=[];if(0<t.length){var n=0;t.forEach(function(e,t){if(e.hidden){var i=Object(l.objectMerge2)(e);i.key=t,s.push(i)}else n++;if(o<n){var a=Object(l.objectMerge2)(e);a.key=t,a.hidden=!0,s.push(a)}})}return s},i=function(e){var a=[];if(0<t.length){var s=0;t.forEach(function(e,t){if(!e.hidden&&s<o){s++;var i=Object(l.objectMerge2)(e);i.hidden=!1,i.key=t,a.push(i)}})}return a},a=e().length,s=i().length;this.orgColumnData=e(),this.columnData=e(),this.orgShowColumnData=i(),this.showColumnData=i(),this.leftListLen=a,this.rightListLen=s,this.columnListLen=t.length},sort:function(e){return e.sort(function(e,t){return e.key-t.key})},doAction:function(e){switch(e){case"goRight":this.goRight();break;case"goLeft":this.goLeft()}},fetchFail:function(){this.thecode="",this.convertData()},fetchTableSetup:function(){var o=this;return Object(c.g)(this.otherinfo.orgid,this.thecode).then(function(e){var t=e.data;if((o.orgdata=t)&&t.length){1===t.length&&(t=t[0]),o.orgdata=t;var s=[],n=o.columns.length;t.sort(function(e,t){return e.titleOrder>t.titleOrder?1:-1}),t.forEach(function(e){for(var t=r()({},e),i=0;i<n;i++)if(o.columns[i].prop===e.prop){for(var a in o.columns[i])void 0!==t[a]&&null!==t[a]||(t[a]=o.columns[i][a]);break}s.push(t)}),o.columns.forEach(function(t){0===s.filter(function(e){return e.prop===t.prop}).length&&s.push(t)}),o.convertData(s)}else o.fetchFail()}).catch(function(e){o.fetchFail()})},changeTbaleSetup:function(){var t=this;if(this.thecode)return Object(c.n)(this.otherinfo.orgid,this.thecode,this.formatColumn(this.showColumnData)).then(function(e){t.$message.info("保存成功")}).catch(function(e){t._handlerCatchMsg(e)})},formatColumn:function(e){var n=this.orgdata,o=[],r=0;return e.forEach(function(t){var e=n.filter(function(e){return e.prop===t.prop});if(e.length){var i={},a=e[0];for(var s in a)i[s]=t[s];i.hidden=!1,i.titleOrder=++r,o.push(i)}}),this.columnData.forEach(function(t){var e=n.filter(function(e){return e.prop===t.prop});if(e.length){var i={},a=e[0];for(var s in a)i[s]=t[s];i.hidden=!0,i.titleOrder=++r,o.push(i)}}),o},checkRightLen:function(){this.showColumnData.length>this.maxLen?(this.$message({type:"warning",message:"列表最多只能显示"+this.maxLen+"个字段。"}),this.isCheck=!0):this.isCheck=!1},canDragStart:function(e){},setColumnLen:function(){this.leftListLen=this.columnData.length,this.rightListLen=this.showColumnData.length},handChangeAllLeft:function(e){this.checkListLeft=e?r()([],this.columnData):[],this.leftCheckLen=this.checkListLeft.length,this.isIndeterminateLeft=!1},handChangeAllRight:function(e){this.checkListRight=e?r()([],this.showColumnData):[],this.rightCheckLen=this.checkListRight.length,this.isIndeterminateRight=!1},goRight:function(){var t=this;if(this.checkListLeft.length+this.rightListLen>this.maxLen||this.rightListLen>this.maxLen-1)return this.$message({type:"warning",message:"列表最多只能显示"+this.maxLen+"个字段。"}),!1;this.columnData=this.columnData.filter(function(e){return-1===t.checkListLeft.indexOf(e)||(t.showColumnData.push(e),!1)}),this.orgColumnData=this.orgColumnData.filter(function(e){return-1===t.checkListLeft.indexOf(e)||(t.orgShowColumnData.push(e),!1)}),this.checkListLeft=[],this.setColumnLen(),this.leftCheckLen=0},goLeft:function(){var a=this;this.checkListRight.forEach(function(e,t){a.columnData.push(e),a.orgColumnData.push(e);var i=a.showColumnData.indexOf(e);-1!==i&&a.showColumnData.splice(i,1),-1!==a.orgShowColumnData.indexOf(e)&&a.orgShowColumnData.splice(i,1)}),this.sort(this.columnData),this.checkListRight=[],this.setColumnLen(),this.rightCheckLen=0},dbCheckItemLeft:function(e,t,i){if(this.rightListLen>this.maxLen-1)return this.$message({type:"warning",message:"列表最多只能显示"+this.maxLen+"个字段。"}),!1;this.showColumnData.push(e),this.orgShowColumnData.push(e),this.columnData.splice(t,1),this.orgColumnData.splice(t,1),this.setColumnLen()},dbCheckItemRight:function(e,t,i){this.columnData.push(e),this.orgColumnData.push(e),this.showColumnData.splice(t,1),this.orgShowColumnData.splice(t,1),this.setColumnLen(),this.sort(this.columnData)},handleCheckChangeLeft:function(e){this.leftCheckLen=e.length},handleCheckChangeRight:function(e){this.rightCheckLen=e.length},querySearchLeft:function(e,t){void 0===(this.searchLeft=e).label&&(this.searchLeft||(this.columnData=r()([],this.orgColumnData)));var i=r()([],this.orgColumnData);t(e?i.filter(this.createFilter(e)):i)},querySearchRight:function(e,t){void 0===(this.searchRight=e).label&&(this.searchRight||(this.showColumnData=r()([],this.orgShowColumnData)));var i=r()([],this.orgShowColumnData);t(e?i.filter(this.createFilter(e)):i)},createFilter:function(t){return function(e){return 0===e.label.toLowerCase().indexOf(t.toLowerCase())}},handleSearchLeft:function(e){var t=this;this.searchLeft=e?e.label:"";var i=r()([],this.columnData);i.forEach(function(e){e.label===t.searchLeft&&(i=[]).push(e)}),this.columnData=r()([],i),i=[]},handleSearchRight:function(e){var t=this;this.searchRight=e?e.label:"";var i=r()([],this.showColumnData);i.forEach(function(e){e.label===t.searchRight&&(i=[]).push(e)}),this.showColumnData=r()([],i),i=[]},closeMe:function(e){this.$emit("close"),"function"==typeof e&&e()},handleChange:function(e,t,i){this.rightList=r()([],e)},handleSwitch:function(e){},callback:function(){var e=r()([],this.showColumnData);this.$emit("success",e),this.listKey=Math.random(),this.closeMe()},submitForm:function(){var t=this;this.thecode?this.changeTbaleSetup().then(function(e){t.callback()}):this.callback()}}}},MXEa:function(e,t){},QcgQ:function(e,t,i){"use strict";var a={render:function(){var a=this,e=a.$createElement,s=a._self._c||e;return s("el-dialog",{staticClass:"tms_dialog",attrs:{title:"表格设置",visible:a.isShow,"append-to-body":"","close-on-click-modal":!1,"before-close":a.closeMe},on:{"update:visible":function(e){a.isShow=e}}},[s("div",{staticClass:"tableSetup_warp"},[s("div",{staticClass:"tableSetup_list"},[s("div",{staticClass:"tableSetup_head"},[s("div",{staticClass:"tableSetup_head_select"},[a._v("选择："+a._s(a.leftCheckLen))]),a._v(" "),s("el-checkbox",{attrs:{indeterminate:a.isIndeterminateLeft},on:{change:a.handChangeAllLeft},model:{value:a.checkAllLeft,callback:function(e){a.checkAllLeft=e},expression:"checkAllLeft"}},[a._v("隐藏列  "+a._s(a.leftListLen)+" / "+a._s(a.columnListLen))]),a._v(" "),s("div",{staticStyle:{margin:"3px 0"}},[s("el-autocomplete",{staticClass:"inline-input",attrs:{"fetch-suggestions":a.querySearchLeft,placeholder:"请输入内容",size:"mini"},on:{select:a.handleSearchLeft},scopedSlots:a._u([{key:"default",fn:function(e){var t=e.item;return[s("span",[a._v(a._s(t.label))])]}}]),model:{value:a.searchLeft,callback:function(e){a.searchLeft=e},expression:"searchLeft"}},[s("i",{staticClass:"el-icon-search el-input__icon",attrs:{slot:"suffix"},slot:"suffix"})])],1)],1),a._v(" "),s("div",{staticClass:"tableSetup_content"},[s("el-checkbox-group",{on:{change:a.handleCheckChangeLeft},model:{value:a.checkListLeft,callback:function(e){a.checkListLeft=e},expression:"checkListLeft"}},[s("transition-group",{key:a.listKey,attrs:{name:"el-zoom-in-center"}},a._l(a.columnData,function(t,i){return s("div",{key:i,staticClass:"tableSetup_item",on:{dblclick:function(e){a.dbCheckItemLeft(t,i,e)}}},[s("el-checkbox",{attrs:{label:t}},[a._v("\n                "+a._s(t.label)+"\n              ")])],1)}))],1)],1),a._v(" "),s("div",{staticClass:"tableSetup_tips"},[s("span",[a._v("双击，可快速左右切换。")])])]),a._v(" "),s("div",{staticClass:"tableSetup_btn"},[s("el-button",{attrs:{type:"primary",icon:"el-icon-arrow-right"},on:{click:function(e){a.doAction("goRight")}}}),a._v(" "),s("br"),a._v(" "),s("el-button",{attrs:{type:"primary",icon:"el-icon-arrow-left"},on:{click:function(e){a.doAction("goLeft")}}})],1),a._v(" "),s("div",{staticClass:"tableSetup_list"},[s("div",{staticClass:"tableSetup_head"},[s("div",{staticClass:"tableSetup_head_select"},[a._v("选择："+a._s(a.rightCheckLen))]),a._v(" "),s("el-checkbox",{attrs:{indeterminate:a.isIndeterminateRight},on:{change:a.handChangeAllRight},model:{value:a.checkAllRight,callback:function(e){a.checkAllRight=e},expression:"checkAllRight"}},[a._v("显示列 "+a._s(a.rightListLen)+" / "+a._s(a.columnListLen))]),a._v(" "),s("div",{staticStyle:{margin:"3px 0"}},[s("el-autocomplete",{staticClass:"inline-input",attrs:{"fetch-suggestions":a.querySearchRight,placeholder:"请输入内容",size:"mini"},on:{select:a.handleSearchRight},scopedSlots:a._u([{key:"default",fn:function(e){var t=e.item;return[s("span",[a._v(a._s(t.label))])]}}]),model:{value:a.searchRight,callback:function(e){a.searchRight=e},expression:"searchRight"}},[s("i",{staticClass:"el-icon-search el-input__icon",attrs:{slot:"suffix"},slot:"suffix"})])],1)],1),a._v(" "),s("div",{staticClass:"tableSetup_content"},[s("el-checkbox-group",{on:{change:a.handleCheckChangeRight},model:{value:a.checkListRight,callback:function(e){a.checkListRight=e},expression:"checkListRight"}},[s("draggable",{staticClass:"dragArea",attrs:{move:a.canDragStart,list:a.showColumnData}},[s("transition-group",{attrs:{name:"el-zoom-in-center"}},a._l(a.showColumnData,function(t,i){return s("div",{key:i,staticClass:"tableSetup_item",on:{dblclick:function(e){a.dbCheckItemRight(t,i,e)}}},[s("el-checkbox",{attrs:{label:t}},[a._v("\n                  "+a._s(t.label)+"\n                ")]),a._v(" "),s("el-switch",{attrs:{"active-text":t.fixed?"固定":"活动"},on:{change:function(e){a.handleSwitch(t)}},model:{value:t.fixed,callback:function(e){a.$set(t,"fixed",e)},expression:"column.fixed"}})],1)}))],1)],1)],1),a._v(" "),s("div",{staticClass:"tableSetup_tips"},[s("span",[a._v("拖拽，可调整上下顺序。")]),a._v(" "),s("br"),s("span",[a._v("列表最多只能显示"+a._s(a.maxLen)+"个字段。")])])])]),a._v(" "),s("div",{attrs:{slot:"footer"},slot:"footer"},[s("el-button",{attrs:{type:"primary"},on:{click:function(e){a.submitForm()}}},[a._v("确 定")]),a._v(" "),s("el-button",{on:{click:a.closeMe}},[a._v("取 消")])],1)])},staticRenderFns:[]};t.a=a},"Qhr/":function(e,t){},SgVa:function(e,t,i){"use strict";var a={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"tms-pagenation"},[i("span",{staticClass:"page-num",class:{disabled:t.pageNum<=1},on:{click:function(e){t.jumpTo(1)}}},[i("span",{staticClass:"first-page"})]),i("span",{staticClass:"page-num",class:{disabled:t.pageNum<=1},on:{click:function(e){t.jumpTo(t.pageNum-1)}}},[i("span",{staticClass:"prev-page"})]),t._v(" "),i("span",{staticClass:"page-jumper"},[t._v("\n    第\n    "),i("el-input",{ref:"input",staticClass:"el-pagination__editor is-in-pagination",attrs:{min:1,max:t.pages,type:"number",disabled:t.pages<=1},on:{change:t.handleChange,focus:t.handleFocus,blur:t.handleBlur},nativeOn:{keydown:function(e){return t.handleKeyup(e)}},model:{value:t.inputval,callback:function(e){t.inputval="string"==typeof e?e.trim():e},expression:"inputval"}}),t._v(" 页\n  ")],1),t._v("\n  /共 "+t._s(t.pages)+" 页\n  "),i("span",{staticClass:"page-num",class:{disabled:t.pageNum===t.pages},on:{click:function(e){t.jumpTo(t.pageNum+1)}}},[i("span",{staticClass:"next-page"})]),t._v(" "),i("span",{staticClass:"page-num",class:{disabled:t.pageNum===t.pages},on:{click:function(e){t.jumpTo(t.pages)}}},[i("span",{staticClass:"last-page"})]),t._v(" "),i("span",{staticClass:"tms-pagination__sizes"},[i("el-select",{staticClass:"page-select",attrs:{placeholder:"请选择"},on:{change:t.sizesChange},model:{value:t.size,callback:function(e){t.size=e},expression:"size"}},t._l(t.sizes,function(e,t){return i("el-option",{key:t,attrs:{label:e,value:e}})}))],1)])},staticRenderFns:[]};t.a=a},SjYS:function(e,t,i){"use strict";var a=i("seR9"),s=i("msh6");var n=function(e){i("nl9Y")},o=i("VU/8")(a.a,s.a,n,null,null);t.a=o.exports},"VT+v":function(e,t,i){"use strict";t.a={props:{sizes:{type:Array,default:function(){return[100,200,300,400]}},total:{type:Number,default:0}},computed:{pages:function(){return Math.ceil(this.total/this.size)}},watch:{pageNum:function(){this.inputval=this.pageNum},size:function(){this.pageNum=1}},mounted:function(){this.size=this.sizes[0]},data:function(){return{pageNum:1,oldValue:0,inputval:1,oldNum:1,size:100}},methods:{handleFocus:function(e){this.oldValue=e.target.value},sizesChange:function(){this.pageNum=1,this.oldNum=this.pageNum,this.$emit("change",{pageNum:this.pageNum,pageSize:this.size})},changeEvent:function(){this.oldNum!==this.pageNum&&(this.oldNum=this.pageNum,this.$emit("change",{pageNum:this.pageNum,pageSize:this.size}))},handleCurrentChange:function(e){this.pageNum=e,this.changeEvent()},handleSizeChange:function(e){this.size=e,this.changeEvent()},handleChange:function(e){var t=parseInt(e,10);isNaN(t)?this.inputval=1:t<1?this.inputval=1:t>this.pages?this.inputval=this.pages:this.inputval=t},handleBlur:function(e){var t=e.target;this.handleChange(t.value),this.jumpTo(this.inputval)},handleKeyup:function(e){var t=e.keyCode,i=e.target;console.log("page keydown:",t,i),13===t&&this.oldValue&&i.value!==this.oldValue&&(this.handleChange(i.value),this.oldValue="")},jumpTo:function(e){e<1?this.pageNum=1:e>this.pages?this.pageNum=this.pages:this.pageNum=e,this.changeEvent()}}}},fyBF:function(e,t,i){"use strict";var a={render:function(){var i=this,e=i.$createElement,a=i._self._c||e;return a("div",{staticClass:"searchAll_lyy"},[a("el-form-item",{staticClass:"zdycx",attrs:{label:"自定义查询"}},[a("el-select",{attrs:{filterable:"",placeholder:"请选择","filter-method":i.querySearchAsync,"popper-class":"zdycx-pop",loading:i.loading},on:{change:i.handleSelect,focus:i.initdata},model:{value:i.datalist,callback:function(e){i.datalist=e},expression:"datalist"}},i._l(i.options4,function(t,e){return a("el-option",{key:e,attrs:{label:t.queryKey,value:t.id}},[i._v("\r\n        "+i._s(t.queryKey)+" "),a("i",{staticClass:"el-icon-circle-close-outline",on:{click:function(e){e.stopPropagation(),e.preventDefault(),i.deleteItem(t.id)}}})])})),i._v(" "),a("el-button",{attrs:{plain:""},on:{click:i.Custom}},[i._v("保存自定义")])],1),i._v(" "),a("addSave",{attrs:{searchObj:i.searchObj,popVisible:i.popVisible},on:{close:i.closeAddDot,success:i.fetchAllloadAll}})],1)},staticRenderFns:[]};t.a=a},iRzY:function(e,t,i){"use strict";var a={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-form",{staticClass:"staff_searchinfo feeReceivableSearch clearfix",attrs:{inline:!0,size:t.btnsize,"label-position":"right",model:t.searchForm,"label-width":"70px"}},[i("div",{staticClass:"staff_searchinfo--input"},[i("el-form-item",{attrs:{label:"开单时间"}},[i("div",{staticClass:"block"},[i("el-date-picker",{attrs:{"default-value":t.defaultTime,type:"daterange",align:"right","picker-options":t.pickerOptions2,"value-format":"yyyy-MM-dd","start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:t.searchCreatTime,callback:function(e){t.searchCreatTime=e},expression:"searchCreatTime"}})],1)]),t._v(" "),t.filter?i("el-form-item",{attrs:{label:"结算网点"}},[i("select-tree",{attrs:{orgid:t.otherinfo.orgid},model:{value:t.searchForm.ascriptionOrgId,callback:function(e){t.$set(t.searchForm,"ascriptionOrgId",e)},expression:"searchForm.ascriptionOrgId"}})],1):t._e(),t._v(" "),t.isShow?i("el-form-item",{attrs:{label:"开单网点"}},[i("select-tree",{model:{value:t.searchForm.shipFromOrgid,callback:function(e){t.$set(t.searchForm,"shipFromOrgid",e)},expression:"searchForm.shipFromOrgid"}})],1):t._e(),t._v(" "),i("el-form-item",{attrs:{label:"发货人"}},[i("el-input",{attrs:{clearable:""},model:{value:t.searchForm.senderName,callback:function(e){t.$set(t.searchForm,"senderName",e)},expression:"searchForm.senderName"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"发货方"}},[i("el-input",{attrs:{clearable:""},model:{value:t.searchForm.senderCompanyName,callback:function(e){t.$set(t.searchForm,"senderCompanyName",e)},expression:"searchForm.senderCompanyName"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"出发城市"}},[i("el-input",{attrs:{clearable:""},model:{value:t.searchForm.shipFromCityCode,callback:function(e){t.$set(t.searchForm,"shipFromCityCode",e)},expression:"searchForm.shipFromCityCode"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"到达城市"}},[i("el-input",{attrs:{clearable:""},model:{value:t.searchForm.shipToCityCode,callback:function(e){t.$set(t.searchForm,"shipToCityCode",e)},expression:"searchForm.shipToCityCode"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"运单号"}},[i("el-input",{attrs:{clearable:""},model:{value:t.searchForm.shipSn,callback:function(e){t.$set(t.searchForm,"shipSn",e)},expression:"searchForm.shipSn"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"结算状态"}},[i("select-type",{attrs:{type:"count_status"},model:{value:t.searchForm.status,callback:function(e){t.$set(t.searchForm,"status",e)},expression:"searchForm.status"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"签收状态",prop:"signStatus"}},[i("selectType",{attrs:{type:"sign_status"},model:{value:t.searchForm.signStatus,callback:function(e){t.$set(t.searchForm,"signStatus",e)},expression:"searchForm.signStatus"}},[i("el-option",{attrs:{slot:"head",label:"全部",value:""},slot:"head"})],1)],1),t._v(" "),i("searchAll",{attrs:{searchObj:t.searchObjs},on:{dataObj:t.getDataObj},model:{value:t.searchAll,callback:function(e){t.searchAll=e},expression:"searchAll"}})],1),t._v(" "),i("el-form-item",{staticClass:"staff_searchinfo--btn"},[i("el-button",{attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v("查询")]),i("el-button",{attrs:{type:"info",plain:""},on:{click:t.clearForm}},[t._v("清空")])],1)],1)},staticRenderFns:[]};t.a=a},jpWh:function(e,t,i){"use strict";var a=i("woOf"),s=i.n(a),n=i("o9X6"),o=i("9UCZ"),r=i("0xDb"),l=i("8UOW");t.a={name:"handaccount-manage-search",components:{SelectTree:n.a,SelectType:o.a,searchAll:l.a},props:{btnsize:{type:String,default:"mini"},orgid:{type:Number},filter:{type:Boolean,default:!1},isShow:{type:Boolean,default:!0}},data:function(){return{searchAll:"1",searchCreatTime:[],searchObjs:{},defaultTime:[Object(r.parseTime)(+new Date-5184e6,"{y}-{m}-{d}"),Object(r.parseTime)(new Date,"{y}-{m}-{d}")],searchForm:{shipFromOrgid:"",endTime:"",startTime:"",senderName:"",senderCompanyName:"",shipFromCityCode:"",shipToCityCode:"",shipSn:"",ascriptionOrgId:"",status:"",signStatus:""},pickerOptions2:{shortcuts:r.pickerOptions2}}},watch:{orgid:function(e){this.searchForm.shipFromOrgid=e},searchCreatTime:function(e){e&&(this.$set(this.searchObjs,"startTime",Object(r.parseTime)(this.searchCreatTime[0],"{y}-{m}-{d} ")+"00:00:00"),this.$set(this.searchObjs,"endTime",Object(r.parseTime)(this.searchCreatTime[1],"{y}-{m}-{d} ")+"23:59:59"))},searchForm:{handler:function(e,t){this.searchObjs=s()({},e),this.searchCreatTime&&this.searchCreatTime[0]&&(this.searchObjs.startTime=this.searchCreatTime[0]+" 00:00:00",this.searchObjs.endTime=this.searchCreatTime[1]+" 23:59:59")},deep:!0}},mounted:function(){var e=this;this.searchCreatTime=this.defaultTime,this.searchForm.ascriptionOrgId=this.otherinfo.orgid,this.onSubmit(),this.eventBus.$on("updateAccountsReceivableList",function(){e.onSubmit()})},methods:{getDataObj:function(e){this.searchCreatTime=[e.startTime,e.endTime],this.searchForm=s()({},e),this.$emit("change",e)},onSubmit:function(){var e=s()({},this.searchForm);this.searchCreatTime&&this.searchCreatTime[0]&&(e.startTime=this.searchCreatTime[0]+" 00:00:00",e.endTime=this.searchCreatTime[1]+" 23:59:59"),this.$emit("change",e)},clearForm:function(){var e=this;this.searchForm=this.$options.data().searchForm,this.searchCreatTime=this.defaultTime,this.searchForm.ascriptionOrgId=this.otherinfo.orgid,this.searchAll="1",setTimeout(function(){e.searchAll=""},50)}}}},lbLu:function(e,t,i){"use strict";var a={render:function(){var i=this,e=i.$createElement,a=i._self._c||e;return a("div",{directives:[{name:"loading",rawName:"v-loading",value:i.loading,expression:"loading"}],staticClass:"tab-content accountsReceivable-summary"},[a("SearchForm",{attrs:{filter:!0,orgid:i.otherinfo.orgid,btnsize:i.btnsize},on:{change:i.getSearchParam}}),i._v(" "),a("div",{staticClass:"tab_info"},[a("div",{staticClass:"btns_box"},[a("el-button",{directives:[{name:"has",rawName:"v-has:REC_SET3",arg:"REC_SET3"}],attrs:{type:"success",size:i.btnsize,icon:"el-icon-sort",plain:""},on:{click:function(e){i.viewDetails(i.selected)}}},[i._v("结算")]),i._v(" "),a("el-button",{directives:[{name:"has",rawName:"v-has:REC_PRI3",arg:"REC_PRI3"}],attrs:{type:"primary",size:i.btnsize,icon:"el-icon-edit-outline",plain:""},on:{click:function(e){i.doAction("print")}}},[i._v("打印")]),i._v(" "),a("el-button",{directives:[{name:"has",rawName:"v-has:REC_EXP3",arg:"REC_EXP3"}],attrs:{type:"primary",size:i.btnsize,icon:"el-icon-edit-outline",plain:""},on:{click:function(e){i.doAction("export")}}},[i._v("导出")]),i._v(" "),a("el-button",{staticClass:"table_setup",attrs:{type:"primary",size:i.btnsize,icon:"el-icon-setting",plain:""},on:{click:i.setTable}},[i._v("表格设置")])],1),i._v(" "),a("div",{staticClass:"info_tab"},[a("el-table",{key:i.tablekey,ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:i.usersArr,stripe:"",border:"",height:"100%","show-summary":"","summary-method":i.getSummaries,"tooltip-effect":"dark","default-sort":{prop:"id",order:"ascending"}},on:{"row-click":i.clickDetails,"row-dblclick":i.showDetail,"selection-change":i.getSelection}},[a("el-table-column",{attrs:{fixed:"",sortable:"",type:"selection",width:"80"}}),i._v(" "),i._l(i.tableColumn,function(t){return[t.slot?a("el-table-column",{key:t.id,attrs:{prop:t.prop,fixed:t.fixed,sortable:"",label:t.label,width:t.width},scopedSlots:i._u([{key:"default",fn:function(e){return[a("div",{staticClass:"td-slot",domProps:{innerHTML:i._s(t.slot(e))}})]}}])}):a("el-table-column",{key:t.id,attrs:{fixed:t.fixed,sortable:"",label:t.label,prop:t.prop,width:t.width}})]})],2)],1),i._v(" "),a("div",{staticClass:"info_tab_footer"},[i._v("共计:"+i._s(i.total)+" "),a("div",{staticClass:"show_pager"},[a("Pager",{attrs:{total:i.total},on:{change:i.handlePageChange}})],1)])]),i._v(" "),a("TableSetup",{attrs:{popVisible:i.setupTableVisible,columns:i.tableColumn},on:{close:i.closeSetupTable,success:i.setColumn}})],1)},staticRenderFns:[]};t.a=a},msh6:function(e,t,i){"use strict";var a={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-dialog",{staticClass:"wzl_settleLogSave",attrs:{title:t.popTitle,visible:t.isShow,"close-on-click-modal":!1,"before-close":t.closeMe},on:{close:t.closeMe,"update:visible":function(e){t.isShow=e}}},[i("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:t.form,rules:t.rules,"label-width":t.formLabelWidth,inline:!0,"label-position":"right",size:"mini"}},[i("el-form-item",{attrs:{label:"名称：",prop:"queryKey"}},[i("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.form.queryKey,expression:"form.queryKey",modifiers:{trim:!0}}],attrs:{maxlength:20,placeholder:"请定义名称"},domProps:{value:t.form.queryKey},on:{input:function(e){e.target.composing||t.$set(t.form,"queryKey",e.target.value.trim())},blur:function(e){t.$forceUpdate()}}})])],1),t._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{type:"primary",disabled:0===t.form.queryKey.length},on:{click:function(e){t.submitForm("ruleForm")}}},[t._v("确 定")]),t._v(" "),i("el-button",{on:{click:t.closeMe}},[t._v("取 消")])],1)],1)},staticRenderFns:[]};t.a=a},nl9Y:function(e,t){},puNT:function(e,t,i){"use strict";var a=i("IAIf"),s=i("QcgQ");var n=function(e){i("MXEa")},o=i("VU/8")(a.a,s.a,n,null,null);t.a=o.exports},seR9:function(e,t,i){"use strict";var a=i("mvHQ"),s=i.n(a),n=i("t5DY"),o=i("0xDb");t.a={computed:{isShow:{get:function(){return this.popVisible},set:function(){}}},components:{},props:{popVisible:{type:Boolean,default:!1},dotInfo:[Object,Array],searchQuery:[Object,Array],isDepMain:{type:Boolean,default:!1},createrId:[Number,String],isModify:{type:Boolean,default:!1},isAccept:{type:Boolean,default:!1},proptitle:String,searchObj:{type:[Array,Object],default:function(){}}},data:function(){return{form:{userId:"",orgId:"",menuCode:"",queryKey:"",queryContent:""},searchCreatTime:+new Date,pickOption2:"",formLabelWidth:"75px",tooltip:!1,rules:{},queryKey:"",checked1:!0,popTitle:"自定义标签",loading:!1,type:""}},mounted:function(){},watch:{orgid:function(e){this.form.orgid=e},popVisible:function(e){e&&(this.form.userId=this.otherinfo.userId,this.form.orgId=this.otherinfo.orgid,this.form.menuCode=this.$route.meta.code)}},methods:{reset:function(){this.$refs.ruleForm.resetFields()},closeMe:function(e){this.$emit("close"),this.reset(),"function"==typeof e&&e()},submitForm:function(e){var i=this;this.loading||this.$refs[e].validate(function(e){if(!e)return!1;i.loading=!0,i.form.queryContent=s()(i.searchObj);var t=Object(o.objectMerge2)({},i.form);console.log("addSave_data",t),Object(n.m)(t).then(function(e){i.loading=!1,i.$message({message:"保存成功~",type:"success"}),i.closeMe(),i.$emit("success")}).catch(function(e){i.loading=!1,i.$message.warning(e.text)})})}}}},us2a:function(e,t,i){"use strict";var a=i("t5DY"),s=i("SjYS");t.a={components:{addSave:s.a},props:{searchObj:{type:[Object,Array]},value:[String,Number]},data:function(){return{isModify:!1,popVisible:!1,setupTableVisible:!1,dataset:[],datalist:"",timeout:null,loading:!1,options4:[],querySearch:{currentPage:1,pageSize:10,vo:{orgId:"",userId:"",menuCode:""}}}},watch:{value:function(e){console.log("nnn:",e),""===e&&(this.datalist="")},searchObj:{handler:function(e,t){this.$nextTick(function(){console.log("searchAll_cval",e,t)})},deep:!0}},mounted:function(){},methods:{initdata:function(){var t=this;this.inited||(this.inited=!0,this.loading=!0,this.fetchAllloadAll().then(function(e){t.loading=!1}))},deleteItem:function(e){var t=this;Object(a.a)(e).then(function(e){t.fetchAllloadAll()}).catch(function(e){t._handlerCatchMsg(e)})},Custom:function(){this.isModify=!0,this.popVisible=!0},closeAddDot:function(){this.popVisible=!1},fetchAllloadAll:function(){var t=this;return this.querySearch.vo.orgId=this.otherinfo.orgid,this.querySearch.vo.userId=this.otherinfo.userId,this.querySearch.vo.menuCode=this.$route.meta.code,Object(a.l)(this.querySearch).then(function(e){t.dataset=e.list,t.options4=e.list})},querySearchAsync:function(e,t){var i=this.dataset,a=e?i.filter(this.createStateFilter(e)):i;t(this.options4=a)},createStateFilter:function(t){return function(e){return 0===e.queryKey.toLowerCase().indexOf(t.toLowerCase())}},handleSelect:function(t){var e=this.options4.filter(function(e){return e.id===t});if(e.length){var i=e[0].queryContent,a=JSON.parse(i);this.$emit("change",JSON.parse(i.replace(/'/g,'"'))),this.$emit("dataObj",a)}}}}},yJ0t:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=i("FaHG"),s=i("lbLu"),n=i("VU/8")(a.a,s.a,null,null,null);t.default=n.exports}});