webpackJsonp([188],{"46Pd":function(t,e,i){"use strict";var n=i("TsW9"),a=i("puNT"),s=i("UQm2");e.a={components:{TableSetup:a.a},props:{info:{type:Object,default:{}},isShow:{type:Boolean,default:!1}},data:function(){return{btnsize:"mini",setupTableVisible:!1,loadId:"",detailList:[],selected:[],query:{arriveOrgid:0,batchNo:"",batchTypeId:0,departureEndTime:"",departureStartTime:"",dirverName:"",loadEndTime:"",loadId:0,loadStartTime:"",loadTypeId:0,orgId:0,truckIdNumber:""},tableColumn:[{label:"运单号",prop:"shipSn",width:"130",fixed:!0},{label:"开单网点",prop:"shipFromOrgName",width:"130",fixed:!1},{label:"配载件数",prop:"loadAmount",width:"120",fixed:!1},{label:"配载重量",prop:"loadWeight",width:"120",fixed:!1},{label:"配载体积",prop:"loadVolume",width:"120",fixed:!1},{label:"库存件数",prop:"repertoryAmount",width:"120",fixed:!1},{label:"库存重量",prop:"repertoryWeight",width:"120",fixed:!1},{label:"库存体积",prop:"repertoryVolume",width:"120",fixed:!1},{label:"运单件数",prop:"cargoAmount",width:"120",fixed:!1},{label:"运单重量",prop:"cargoWeight",width:"120",fixed:!1},{label:"运单体积",prop:"cargoVolume",width:"120",fixed:!1},{label:"出发城市",prop:"shipFromCityName",width:"120",fixed:!1},{label:"到达城市",prop:"shipToCityName",width:"120",fixed:!1},{label:"发货人",prop:"shipSenderName",width:"120",fixed:!1},{label:"收货人",prop:"shipReceiverName",width:"120",fixed:!1},{label:"收货人电话",prop:"shipReceiverMobile",width:"120",fixed:!1},{label:"货品名",prop:"cargoName",width:"120",fixed:!1},{label:"货号",prop:"shipGoodsSn",width:"120",fixed:!1},{label:"运单备注",prop:"shipRemarks",width:"120",fixed:!1}]}},watch:{isShow:function(){this.isShow&&this.fecthSelectLoadList()},info:function(t){t&&this.fecthSelectLoadList()}},methods:{setTable:function(){this.setupTableVisible=!0},fecthSelectLoadList:function(){this.getLoadTrack()},getSelection:function(t){this.selected=t},doAction:function(t){switch(t){case"print":Object(s.d)({data:this.selected.length?this.selected:this.detailList,columns:this.tableColumn});break;case"export":Object(s.g)({data:this.selected.length?this.selected:this.detailList,columns:this.tableColumn,name:"在途跟踪"})}},clickDetails:function(t){this.$refs.multipleTable.toggleRowSelection(t)},getLoadTrack:function(){var e=this;this.loadId=this.info.id,Object(n.d)(this.loadId).then(function(t){e.detailList=t.data}).catch(function(t){e.loading=!1,e._handlerCatchMsg(t)})},setColumn:function(t){this.tableColumn=t,this.tablekey=Math.random()}}}},"8vYc":function(t,e){},F5BD:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i("46Pd"),a=i("lIxA");var s=function(t){i("8vYc")},o=i("VU/8")(n.a,a.a,s,null,null);e.default=o.exports},IAIf:function(t,e,i){"use strict";var n=i("woOf"),l=i.n(n),a=i("DAYN"),s=i.n(a),c=i("0xDb"),r=i("t5DY");e.a={props:{popVisible:{type:Boolean,default:!1},columns:{type:Array,default:[]},code:{type:String,default:""}},components:{draggable:s.a},computed:{isShow:{get:function(){return this.popVisible},set:function(){}}},data:function(){return{orgColumnData:[],columnData:[],orgShowColumnData:[],showColumnData:[],list:[],rightList:[],listKey:0,isIndeterminateLeft:!0,isIndeterminateRight:!0,checkAllLeft:!1,checkAllRight:!1,checkListLeft:[],checkListRight:[],searchLeft:"",searchRight:"",leftListLen:0,rightListLen:0,columnListLen:0,isCheck:!0,maxLen:50,rightCheckLen:0,leftCheckLen:0,thecode:""}},mounted:function(){var n=this,t=this.code;this.$route.meta.code;"NOSET"===t?this.convertData():t?this.thecode=t:this.convertData(),this.thecode&&(this.fetchTableSetup(),this.eventBus.$on("tablesetup.change",function(t,e){if(t&&t===n.thecode){var i=n.showColumnData.filter(function(t){return t.prop===e.prop});i.length&&(i[0].width=e.width,n.changeTbaleSetup())}}))},methods:{convertData:function(t){this.initData(t),this.callback()},initData:function(e){e=e||this.columns;var o=this.maxLen,t=function(t){var a=[];if(0<e.length){var s=0;e.forEach(function(t,e){if(t.hidden){var i=Object(c.objectMerge2)(t);i.key=e,a.push(i)}else s++;if(o<s){var n=Object(c.objectMerge2)(t);n.key=e,n.hidden=!0,a.push(n)}})}return a},i=function(t){var n=[];if(0<e.length){var a=0;e.forEach(function(t,e){if(!t.hidden&&a<o){a++;var i=Object(c.objectMerge2)(t);i.hidden=!1,i.key=e,n.push(i)}})}return n},n=t().length,a=i().length;this.orgColumnData=t(),this.columnData=t(),this.orgShowColumnData=i(),this.showColumnData=i(),this.leftListLen=n,this.rightListLen=a,this.columnListLen=e.length},sort:function(t){return t.sort(function(t,e){return t.key-e.key})},doAction:function(t){switch(t){case"goRight":this.goRight();break;case"goLeft":this.goLeft()}},fetchFail:function(){this.thecode="",this.convertData()},fetchTableSetup:function(){var o=this;return Object(r.g)(this.otherinfo.orgid,this.thecode).then(function(t){var e=t.data;if((o.orgdata=e)&&e.length){1===e.length&&(e=e[0]),o.orgdata=e;var a=[],s=o.columns.length;e.sort(function(t,e){return t.titleOrder>e.titleOrder?1:-1}),e.forEach(function(t){t.label=t.label||t.lable;for(var e=l()({},t),i=0;i<s;i++)if(o.columns[i].prop===t.prop){for(var n in o.columns[i])void 0!==e[n]&&null!==e[n]||(e[n]=o.columns[i][n]);break}a.push(e)}),o.columns.forEach(function(e){0===a.filter(function(t){return t.prop===e.prop}).length&&a.push(e)}),a.sort(function(t,e){return t.fixed?-1:0}),o.convertData(a)}else o.fetchFail()}).catch(function(t){o.fetchFail()})},changeTbaleSetup:function(){var e=this;if(this.thecode)return Object(r.n)(this.otherinfo.orgid,this.thecode,this.formatColumn(this.showColumnData)).then(function(t){e.$message.info("保存成功")}).catch(function(t){e._handlerCatchMsg(t)})},formatColumn:function(t){var s=this.orgdata,o=[],l=0;return t.forEach(function(e){var t=s.filter(function(t){return t.prop===e.prop});if(t.length){var i={},n=t[0];for(var a in n)i[a]=e[a];i.hidden=!1,i.titleOrder=++l,o.push(i)}}),this.columnData.forEach(function(e){var t=s.filter(function(t){return t.prop===e.prop});if(t.length){var i={},n=t[0];for(var a in n)i[a]=e[a];i.hidden=!0,i.titleOrder=++l,o.push(i)}}),o},checkRightLen:function(){this.showColumnData.length>this.maxLen?(this.$message({type:"warning",message:"列表最多只能显示"+this.maxLen+"个字段。"}),this.isCheck=!0):this.isCheck=!1},canDragStart:function(t){},setColumnLen:function(){this.leftListLen=this.columnData.length,this.rightListLen=this.showColumnData.length},handChangeAllLeft:function(t){this.checkListLeft=t?l()([],this.columnData):[],this.leftCheckLen=this.checkListLeft.length,this.isIndeterminateLeft=!1},handChangeAllRight:function(t){this.checkListRight=t?l()([],this.showColumnData):[],this.rightCheckLen=this.checkListRight.length,this.isIndeterminateRight=!1},goRight:function(){var e=this;if(this.checkListLeft.length+this.rightListLen>this.maxLen||this.rightListLen>this.maxLen-1)return this.$message({type:"warning",message:"列表最多只能显示"+this.maxLen+"个字段。"}),!1;this.columnData=this.columnData.filter(function(t){return-1===e.checkListLeft.indexOf(t)||(e.showColumnData.push(t),!1)}),this.orgColumnData=this.orgColumnData.filter(function(t){return-1===e.checkListLeft.indexOf(t)||(e.orgShowColumnData.push(t),!1)}),this.checkListLeft=[],this.setColumnLen(),this.leftCheckLen=0},goLeft:function(){var n=this;this.checkListRight.forEach(function(t,e){n.columnData.push(t),n.orgColumnData.push(t);var i=n.showColumnData.indexOf(t);-1!==i&&n.showColumnData.splice(i,1),-1!==n.orgShowColumnData.indexOf(t)&&n.orgShowColumnData.splice(i,1)}),this.sort(this.columnData),this.checkListRight=[],this.setColumnLen(),this.rightCheckLen=0},dbCheckItemLeft:function(t,e,i){if(this.rightListLen>this.maxLen-1)return this.$message({type:"warning",message:"列表最多只能显示"+this.maxLen+"个字段。"}),!1;this.showColumnData.push(t),this.orgShowColumnData.push(t),this.columnData.splice(e,1),this.orgColumnData.splice(e,1),this.setColumnLen()},dbCheckItemRight:function(t,e,i){this.columnData.push(t),this.orgColumnData.push(t),this.showColumnData.splice(e,1),this.orgShowColumnData.splice(e,1),this.setColumnLen(),this.sort(this.columnData)},handleCheckChangeLeft:function(t){this.leftCheckLen=t.length},handleCheckChangeRight:function(t){this.rightCheckLen=t.length},querySearchLeft:function(t,e){void 0===(this.searchLeft=t).label&&(this.searchLeft||(this.columnData=l()([],this.orgColumnData)));var i=l()([],this.orgColumnData);e(t?i.filter(this.createFilter(t)):i)},querySearchRight:function(t,e){void 0===(this.searchRight=t).label&&(this.searchRight||(this.showColumnData=l()([],this.orgShowColumnData)));var i=l()([],this.orgShowColumnData);e(t?i.filter(this.createFilter(t)):i)},createFilter:function(e){return function(t){return 0===t.label.toLowerCase().indexOf(e.toLowerCase())}},handleSearchLeft:function(t){var e=this;this.searchLeft=t?t.label:"";var i=l()([],this.columnData);i.forEach(function(t){t.label===e.searchLeft&&(i=[]).push(t)}),this.columnData=l()([],i),i=[]},handleSearchRight:function(t){var e=this;this.searchRight=t?t.label:"";var i=l()([],this.showColumnData);i.forEach(function(t){t.label===e.searchRight&&(i=[]).push(t)}),this.showColumnData=l()([],i),i=[]},closeMe:function(t){this.$emit("close"),"function"==typeof t&&t()},handleChange:function(t,e,i){this.rightList=l()([],t)},handleSwitch:function(t,e){console.log("handleSwitch",t);var i=0,n=!1;this.showColumnData.forEach(function(t,e){t.fixed&&!n?i=e:n=!0}),t.fixed?(this.showColumnData.splice(e,1),this.showColumnData.splice(i,0,t),t.fixed=!1):(console.log("find:",i,e),this.showColumnData.splice(i+1,0,t),this.showColumnData.splice(e+1,1),t.fixed=!0)},callback:function(){var t=l()([],this.showColumnData);t.forEach(function(t){!t.label&&t.lable&&(t.label=t.lable)}),this.$emit("success",t),this.listKey=Math.random(),this.closeMe()},submitForm:function(){var e=this;this.thecode?this.changeTbaleSetup().then(function(t){e.callback()}):this.callback()}}}},MXEa:function(t,e){},QcgQ:function(t,e,i){"use strict";var n={render:function(){var n=this,t=n.$createElement,a=n._self._c||t;return a("el-dialog",{staticClass:"tms_dialog",attrs:{title:"表格设置",visible:n.isShow,"append-to-body":"","close-on-click-modal":!1,"before-close":n.closeMe},on:{"update:visible":function(t){n.isShow=t}}},[a("div",{staticClass:"tableSetup_warp"},[a("div",{staticClass:"tableSetup_list"},[a("div",{staticClass:"tableSetup_head"},[a("div",{staticClass:"tableSetup_head_select"},[n._v("选择："+n._s(n.leftCheckLen))]),n._v(" "),a("el-checkbox",{attrs:{indeterminate:n.isIndeterminateLeft},on:{change:n.handChangeAllLeft},model:{value:n.checkAllLeft,callback:function(t){n.checkAllLeft=t},expression:"checkAllLeft"}},[n._v("隐藏列  "+n._s(n.leftListLen)+" / "+n._s(n.columnListLen))]),n._v(" "),a("div",{staticStyle:{margin:"3px 0"}},[a("el-autocomplete",{staticClass:"inline-input",attrs:{"fetch-suggestions":n.querySearchLeft,placeholder:"请输入内容",size:"mini"},on:{select:n.handleSearchLeft},scopedSlots:n._u([{key:"default",fn:function(t){var e=t.item;return[a("span",[n._v(n._s(e.label))])]}}]),model:{value:n.searchLeft,callback:function(t){n.searchLeft=t},expression:"searchLeft"}},[a("i",{staticClass:"el-icon-search el-input__icon",attrs:{slot:"suffix"},slot:"suffix"})])],1)],1),n._v(" "),a("div",{staticClass:"tableSetup_content"},[a("el-checkbox-group",{on:{change:n.handleCheckChangeLeft},model:{value:n.checkListLeft,callback:function(t){n.checkListLeft=t},expression:"checkListLeft"}},[a("transition-group",{key:n.listKey,attrs:{name:"el-zoom-in-center"}},n._l(n.columnData,function(e,i){return a("div",{key:i,staticClass:"tableSetup_item",on:{dblclick:function(t){n.dbCheckItemLeft(e,i,t)}}},[a("el-checkbox",{attrs:{label:e}},[n._v("\n                "+n._s(e.label)+"\n              ")])],1)}))],1)],1),n._v(" "),a("div",{staticClass:"tableSetup_tips"},[a("span",[n._v("双击，可快速左右切换。")])])]),n._v(" "),a("div",{staticClass:"tableSetup_btn"},[a("el-button",{attrs:{type:"primary",icon:"el-icon-arrow-right"},on:{click:function(t){n.doAction("goRight")}}}),n._v(" "),a("br"),n._v(" "),a("el-button",{attrs:{type:"primary",icon:"el-icon-arrow-left"},on:{click:function(t){n.doAction("goLeft")}}})],1),n._v(" "),a("div",{staticClass:"tableSetup_list"},[a("div",{staticClass:"tableSetup_head"},[a("div",{staticClass:"tableSetup_head_select"},[n._v("选择："+n._s(n.rightCheckLen))]),n._v(" "),a("el-checkbox",{attrs:{indeterminate:n.isIndeterminateRight},on:{change:n.handChangeAllRight},model:{value:n.checkAllRight,callback:function(t){n.checkAllRight=t},expression:"checkAllRight"}},[n._v("显示列 "+n._s(n.rightListLen)+" / "+n._s(n.columnListLen))]),n._v(" "),a("div",{staticStyle:{margin:"3px 0"}},[a("el-autocomplete",{staticClass:"inline-input",attrs:{"fetch-suggestions":n.querySearchRight,placeholder:"请输入内容",size:"mini"},on:{select:n.handleSearchRight},scopedSlots:n._u([{key:"default",fn:function(t){var e=t.item;return[a("span",[n._v(n._s(e.label))])]}}]),model:{value:n.searchRight,callback:function(t){n.searchRight=t},expression:"searchRight"}},[a("i",{staticClass:"el-icon-search el-input__icon",attrs:{slot:"suffix"},slot:"suffix"})])],1)],1),n._v(" "),a("div",{staticClass:"tableSetup_content"},[a("el-checkbox-group",{on:{change:n.handleCheckChangeRight},model:{value:n.checkListRight,callback:function(t){n.checkListRight=t},expression:"checkListRight"}},[a("draggable",{staticClass:"dragArea",attrs:{move:n.canDragStart,list:n.showColumnData}},[a("transition-group",{attrs:{name:"el-zoom-in-center"}},n._l(n.showColumnData,function(e,i){return a("div",{key:i,staticClass:"tableSetup_item",on:{dblclick:function(t){n.dbCheckItemRight(e,i,t)}}},[a("el-checkbox",{attrs:{label:e}},[n._v("\n                  "+n._s(e.label)+"\n                ")]),n._v(" "),a("el-switch",{attrs:{value:e.fixed,"active-text":e.fixed?"固定":"活动"},on:{change:function(t){n.handleSwitch(e,i)}}})],1)}))],1)],1)],1),n._v(" "),a("div",{staticClass:"tableSetup_tips"},[a("span",[n._v("拖拽，可调整上下顺序。")]),n._v(" "),a("br"),a("span",[n._v("列表最多只能显示"+n._s(n.maxLen)+"个字段。")])])])]),n._v(" "),a("div",{attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"primary"},on:{click:function(t){n.submitForm()}}},[n._v("确 定")]),n._v(" "),a("el-button",{on:{click:n.closeMe}},[n._v("取 消")])],1)])},staticRenderFns:[]};e.a=n},TsW9:function(t,e,i){"use strict";e.a=function(t,e){return n.b.get("/api-order/order/load/v1/getBatchNo/",{params:{orgId:t,loadTypeId:e}})},e.h=function(t){return n.b.post("/api-order/order/load/v1/",t)},e.i=function(t){return n.b.put("/api-order/order/load/v1/",t)},e.c=function(t){return n.b.get("/api-order/order/load/v1/selectAddLoadRepertoryList/",{params:{orgId:t}})},e.f=function(t,e){return n.b.get("/api-order/order/load/v1/selectUpdateLoadRepertoryList/?orgId="+t+"&loadId="+e)},e.g=function(t,e){return n.b.get("/api-order/order/load/v1/selectUpdateLoadDetailList/?orgId="+t+"&loadId="+e)},e.d=function(t){return n.b.get("/api-order/order/load/v1/selectLoadDetailList/",{params:{loadId:t}})},e.e=function(){return n.b.get("/api-system/system/trunk/v1/findCarAndDriver/").then(function(t){return t})},e.b=function(){return n.b.get("/api-system/system/trunk/v1/findDriverAndCar/").then(function(t){return t})};var n=i("Vo7i")},lIxA:function(t,e,i){"use strict";var n={render:function(){var n=this,t=n.$createElement,a=n._self._c||t;return a("div",{staticClass:"detailTables"},[a("el-form",{staticClass:"detailTables_info",attrs:{inline:"","label-width":"100"},model:{value:n.info,callback:function(t){n.info=t},expression:"info"}},[a("table",[a("tbody",[a("tr",[a("th",[n._v("司机名称")]),n._v(" "),a("td",[a("el-input",{attrs:{size:n.btnsize,disabled:""},model:{value:n.info.dirverName,callback:function(t){n.$set(n.info,"dirverName",t)},expression:"info.dirverName"}})],1),n._v(" "),a("th",[n._v("司机电话")]),n._v(" "),a("td",[a("el-input",{attrs:{size:n.btnsize,disabled:""},model:{value:n.info.dirverMobile,callback:function(t){n.$set(n.info,"dirverMobile",t)},expression:"info.dirverMobile"}})],1),n._v(" "),a("th",[n._v("车牌号码")]),n._v(" "),a("td",[a("el-input",{attrs:{size:n.btnsize,disabled:""},model:{value:n.info.truckIdNumber,callback:function(t){n.$set(n.info,"truckIdNumber",t)},expression:"info.truckIdNumber"}})],1)]),n._v(" "),a("tr",[a("th",[n._v("送货费")]),n._v(" "),a("td",[a("el-input",{attrs:{size:n.btnsize,disabled:""},model:{value:n.info.deliveryFee,callback:function(t){n.$set(n.info,"deliveryFee",t)},expression:"info.deliveryFee"}})],1),n._v(" "),a("th",[n._v("分摊方式")]),n._v(" "),a("td",[a("el-input",{attrs:{size:n.btnsize,disabled:""},model:{value:n.info.apportionType,callback:function(t){n.$set(n.info,"apportionType",t)},expression:"info.apportionType"}})],1),n._v(" "),a("th",[n._v("送货日期")]),n._v(" "),a("td",[a("el-input",{attrs:{value:n._f("parseTime")(n.info.loadTime,"{y}-{m}-{d} {h}:{i}:{s}"),size:n.btnsize,disabled:""}})],1)]),n._v(" "),a("tr",[a("th",[n._v("可载重量")]),n._v(" "),a("td",[a("el-input",{attrs:{size:n.btnsize,disabled:""},model:{value:n.info.truckLoad,callback:function(t){n.$set(n.info,"truckLoad",t)},expression:"info.truckLoad"}})],1),n._v(" "),a("th",[n._v("可载体积")]),n._v(" "),a("td",[a("el-input",{attrs:{size:n.btnsize,disabled:""},model:{value:n.info.truckVolume,callback:function(t){n.$set(n.info,"truckVolume",t)},expression:"info.truckVolume"}})],1),n._v(" "),a("th",[n._v("要求到达时间")]),n._v(" "),a("td",[a("el-input",{attrs:{value:n._f("parseTime")(n.info.requireArrivedTime,"{y}-{m}-{d} {h}:{i}:{s}"),size:n.btnsize,disabled:""}})],1)]),n._v(" "),a("tr",[a("th",[n._v("备注")]),n._v(" "),a("td",{attrs:{colspan:"5"}},[a("el-input",{attrs:{size:n.btnsize,disabled:"",maxlength:300},model:{value:n.info.remark,callback:function(t){n.$set(n.info,"remark",t)},expression:"info.remark"}})],1)])])])]),n._v(" "),a("div",{staticClass:"tab_infos"},[a("div",{staticClass:"btns_box"},[a("el-button",{staticClass:"table_setup",attrs:{type:"primary",size:n.btnsize,icon:"el-icon-setting",plain:""},on:{click:n.setTable}},[n._v("表格设置")]),n._v(" "),a("el-button",{staticClass:"table_setup",attrs:{type:"success",size:n.btnsize,icon:"el-icon-setting",plain:""},on:{click:function(t){n.doAction("export")}}},[n._v("导出清单")]),n._v(" "),a("el-button",{staticClass:"table_setup",attrs:{type:"success",size:n.btnsize,icon:"el-icon-setting",plain:""},on:{click:function(t){n.doAction("print")}}},[n._v("打印清单")])],1),n._v(" "),a("div",{staticClass:"info_tab"},[a("el-table",{ref:"multipleTable",staticStyle:{height:"100%"},attrs:{data:n.detailList,stripe:"",border:"",height:"100%","default-sort":{prop:"id",order:"ascending"},"tooltip-effect":"dark"},on:{"row-click":n.clickDetails,"selection-change":n.getSelection}},[a("el-table-column",{attrs:{fixed:"",sortable:"",type:"selection",width:"50"}}),n._v(" "),n._l(n.tableColumn,function(i){return[i.slot?a("el-table-column",{key:i.id,attrs:{fixed:i.fixed,sortable:"",label:i.label,width:i.width},scopedSlots:n._u([{key:"default",fn:function(e){return[i.click?a("span",{staticClass:"clickitem",domProps:{innerHTML:n._s(i.slot(e))},on:{click:function(t){t.stopPropagation(),i.click(e)}}}):a("span",{domProps:{innerHTML:n._s(i.slot(e))}})]}}])}):a("el-table-column",{key:i.id,attrs:{fixed:i.fixed,sortable:"",label:i.label,prop:i.prop,width:i.width}})]})],2)],1)]),n._v(" "),a("TableSetup",{attrs:{popVisible:n.setupTableVisible,columns:n.tableColumn},on:{close:function(t){n.setupTableVisible=!1},success:n.setColumn}})],1)},staticRenderFns:[]};e.a=n},puNT:function(t,e,i){"use strict";var n=i("IAIf"),a=i("QcgQ");var s=function(t){i("MXEa")},o=i("VU/8")(n.a,a.a,s,null,null);e.a=o.exports}});
//# sourceMappingURL=188.d08bb353a4ec7238de42.js.map