webpackJsonp([214],{"7jb6":function(t,e,i){"use strict";var a=i("UQm2"),n=i("t5DY"),s=i("puNT"),r=i("Mqi+");e.a={components:{TableSetup:s.a},data:function(){return{activeName2:"first",repertoryArr:[{shipSn:"234234234",shipStatusName:"已发货",shipIdentifying:"控",repertoryCreateTime:"2018-09-11 19:55:02",hashours:"6"},{shipSn:"19082334",shipStatusName:"已发货",shipIdentifying:"控",repertoryCreateTime:"2018-09-11 19:55:02",hashours:"1"}],activeName:1,setupTableVisible:!1,tablekey:0,tableColumn:[{label:"运单号",prop:"shipSn",width:"150",fixed:!0},{label:"运单状态",prop:"shipStatusName",width:"150",fixed:!1},{label:"运单标识",prop:"shipIdentifying",width:"150",fixed:!1,slot:function(t){return Object(r.b)(t.row.shipIdentifying)}},{label:"入库时间",prop:"repertoryCreateTime",width:"180",fixed:!1},{label:"库存时长",prop:"hashours",width:"150",fixed:!1},{label:"开单网点",prop:"fromOrgName",width:"150",fixed:!1},{label:"开单时间",prop:"createTime",width:"180",fixed:!1},{label:"货品名",prop:"cargoName",width:"150",fixed:!1},{label:"库存件数",prop:"repertoryAmount",width:"150",fixed:!1},{label:"库存重量",prop:"repertoryWeight",width:"150",fixed:!1},{label:"库存体积",prop:"repertoryVolume",width:"150",fixed:!1}]}},methods:{doAction:function(t){switch(t){case"print":Object(a.e)({data:this.repertoryArr,columns:this.tableColumn,name:"全部库存"});break;case"export":Object(a.h)({data:this.repertoryArr,columns:this.tableColumn,name:"全部库存"})}},downloadFile:function(){window.open(Object(n.b)())},setTable:function(){this.setupTableVisible=!0},closeSetupTable:function(){this.setupTableVisible=!1},setColumn:function(t){this.tableColumn=t,this.tablekey=Math.random()}}}},IAIf:function(t,e,i){"use strict";var a=i("woOf"),l=i.n(a),n=i("DAYN"),s=i.n(n),o=i("0xDb"),c=i("t5DY");e.a={props:{popVisible:{type:Boolean,default:!1},columns:{type:Array,default:[]},code:{type:String,default:""}},components:{draggable:s.a},computed:{isShow:{get:function(){return this.popVisible},set:function(){}}},data:function(){return{orgColumnData:[],columnData:[],orgShowColumnData:[],showColumnData:[],list:[],rightList:[],listKey:0,isIndeterminateLeft:!0,isIndeterminateRight:!0,checkAllLeft:!1,checkAllRight:!1,checkListLeft:[],checkListRight:[],searchLeft:"",searchRight:"",leftListLen:0,rightListLen:0,columnListLen:0,isCheck:!0,maxLen:50,rightCheckLen:0,leftCheckLen:0,thecode:""}},mounted:function(){var a=this,t=this.code;this.$route.meta.code;"NOSET"===t?this.convertData():t?this.thecode=t:this.convertData(),this.thecode&&(this.fetchTableSetup(),this.eventBus.$on("tablesetup.change",function(t,e){if(t&&t===a.thecode){var i=a.showColumnData.filter(function(t){return t.prop===e.prop});i.length&&(i[0].width=e.width,a.changeTbaleSetup())}}))},methods:{convertData:function(t){this.initData(t),this.callback()},initData:function(e){e=e||this.columns;var r=this.maxLen,t=function(t){var n=[];if(0<e.length){var s=0;e.forEach(function(t,e){if(t.hidden){var i=Object(o.objectMerge2)(t);i.key=e,n.push(i)}else s++;if(r<s){var a=Object(o.objectMerge2)(t);a.key=e,a.hidden=!0,n.push(a)}})}return n},i=function(t){var a=[];if(0<e.length){var n=0;e.forEach(function(t,e){if(!t.hidden&&n<r){n++;var i=Object(o.objectMerge2)(t);i.hidden=!1,i.key=e,a.push(i)}})}return a},a=t().length,n=i().length;this.orgColumnData=t(),this.columnData=t(),this.orgShowColumnData=i(),this.showColumnData=i(),this.leftListLen=a,this.rightListLen=n,this.columnListLen=e.length},sort:function(t){return t.sort(function(t,e){return t.key-e.key})},doAction:function(t){switch(t){case"goRight":this.goRight();break;case"goLeft":this.goLeft()}},fetchFail:function(){this.thecode="",this.convertData()},fetchTableSetup:function(){var r=this;return Object(c.g)(this.otherinfo.orgid,this.thecode).then(function(t){var e=t.data;if((r.orgdata=e)&&e.length){var n=[],s=r.columns.length;e.sort(function(t,e){return t.titleOrder>e.titleOrder?1:-1}),e.forEach(function(t){for(var e=l()({},t),i=0;i<s;i++)if(r.columns[i].prop===t.prop){for(var a in r.columns[i])void 0!==e[a]&&null!==e[a]||(e[a]=r.columns[i][a]);break}n.push(e)}),r.columns.forEach(function(e){0===n.filter(function(t){return t.prop===e.prop}).length&&n.push(e)}),r.convertData(n)}else r.fetchFail()}).catch(function(t){r.fetchFail()})},changeTbaleSetup:function(){var e=this;if(this.thecode)return Object(c.n)(this.otherinfo.orgid,this.thecode,this.formatColumn(this.showColumnData)).then(function(t){e.$message.info("保存成功")}).catch(function(t){e._handlerCatchMsg(t)})},formatColumn:function(t){var s=this.orgdata,r=[],l=0;return t.forEach(function(e){var t=s.filter(function(t){return t.prop===e.prop});if(t.length){var i={},a=t[0];for(var n in a)i[n]=e[n];i.hidden=!1,i.titleOrder=++l,r.push(i)}}),this.columnData.forEach(function(e){var t=s.filter(function(t){return t.prop===e.prop});if(t.length){var i={},a=t[0];for(var n in a)i[n]=e[n];i.hidden=!0,i.titleOrder=++l,r.push(i)}}),r},checkRightLen:function(){this.showColumnData.length>this.maxLen?(this.$message({type:"warning",message:"列表最多只能显示"+this.maxLen+"个字段。"}),this.isCheck=!0):this.isCheck=!1},canDragStart:function(t){},setColumnLen:function(){this.leftListLen=this.columnData.length,this.rightListLen=this.showColumnData.length},handChangeAllLeft:function(t){this.checkListLeft=t?l()([],this.columnData):[],this.leftCheckLen=this.checkListLeft.length,this.isIndeterminateLeft=!1},handChangeAllRight:function(t){this.checkListRight=t?l()([],this.showColumnData):[],this.rightCheckLen=this.checkListRight.length,this.isIndeterminateRight=!1},goRight:function(){var e=this;if(this.checkListLeft.length+this.rightListLen>this.maxLen||this.rightListLen>this.maxLen-1)return this.$message({type:"warning",message:"列表最多只能显示"+this.maxLen+"个字段。"}),!1;this.columnData=this.columnData.filter(function(t){return-1===e.checkListLeft.indexOf(t)||(e.showColumnData.push(t),!1)}),this.orgColumnData=this.orgColumnData.filter(function(t){return-1===e.checkListLeft.indexOf(t)||(e.orgShowColumnData.push(t),!1)}),this.checkListLeft=[],this.setColumnLen(),this.leftCheckLen=0},goLeft:function(){var a=this;this.checkListRight.forEach(function(t,e){a.columnData.push(t),a.orgColumnData.push(t);var i=a.showColumnData.indexOf(t);-1!==i&&a.showColumnData.splice(i,1),-1!==a.orgShowColumnData.indexOf(t)&&a.orgShowColumnData.splice(i,1)}),this.sort(this.columnData),this.checkListRight=[],this.setColumnLen(),this.rightCheckLen=0},dbCheckItemLeft:function(t,e,i){if(this.rightListLen>this.maxLen-1)return this.$message({type:"warning",message:"列表最多只能显示"+this.maxLen+"个字段。"}),!1;this.showColumnData.push(t),this.orgShowColumnData.push(t),this.columnData.splice(e,1),this.orgColumnData.splice(e,1),this.setColumnLen()},dbCheckItemRight:function(t,e,i){this.columnData.push(t),this.orgColumnData.push(t),this.showColumnData.splice(e,1),this.orgShowColumnData.splice(e,1),this.setColumnLen(),this.sort(this.columnData)},handleCheckChangeLeft:function(t){this.leftCheckLen=t.length},handleCheckChangeRight:function(t){this.rightCheckLen=t.length},querySearchLeft:function(t,e){void 0===(this.searchLeft=t).label&&(this.searchLeft||(this.columnData=l()([],this.orgColumnData)));var i=l()([],this.orgColumnData);e(t?i.filter(this.createFilter(t)):i)},querySearchRight:function(t,e){void 0===(this.searchRight=t).label&&(this.searchRight||(this.showColumnData=l()([],this.orgShowColumnData)));var i=l()([],this.orgShowColumnData);e(t?i.filter(this.createFilter(t)):i)},createFilter:function(e){return function(t){return 0===t.label.toLowerCase().indexOf(e.toLowerCase())}},handleSearchLeft:function(t){var e=this;this.searchLeft=t?t.label:"";var i=l()([],this.columnData);i.forEach(function(t){t.label===e.searchLeft&&(i=[]).push(t)}),this.columnData=l()([],i),i=[]},handleSearchRight:function(t){var e=this;this.searchRight=t?t.label:"";var i=l()([],this.showColumnData);i.forEach(function(t){t.label===e.searchRight&&(i=[]).push(t)}),this.showColumnData=l()([],i),i=[]},closeMe:function(t){this.$emit("close"),"function"==typeof t&&t()},handleChange:function(t,e,i){this.rightList=l()([],t)},handleSwitch:function(t){},callback:function(){var t=l()([],this.showColumnData);this.$emit("success",t),this.listKey=Math.random(),this.closeMe()},submitForm:function(){var e=this;this.thecode?this.changeTbaleSetup().then(function(t){e.callback()}):this.callback()}}}},MXEa:function(t,e){},QcgQ:function(t,e,i){"use strict";var a={render:function(){var a=this,t=a.$createElement,n=a._self._c||t;return n("el-dialog",{staticClass:"tms_dialog",attrs:{title:"表格设置",visible:a.isShow,"append-to-body":"","close-on-click-modal":!1,"before-close":a.closeMe},on:{"update:visible":function(t){a.isShow=t}}},[n("div",{staticClass:"tableSetup_warp"},[n("div",{staticClass:"tableSetup_list"},[n("div",{staticClass:"tableSetup_head"},[n("div",{staticClass:"tableSetup_head_select"},[a._v("选择："+a._s(a.leftCheckLen))]),a._v(" "),n("el-checkbox",{attrs:{indeterminate:a.isIndeterminateLeft},on:{change:a.handChangeAllLeft},model:{value:a.checkAllLeft,callback:function(t){a.checkAllLeft=t},expression:"checkAllLeft"}},[a._v("隐藏列  "+a._s(a.leftListLen)+" / "+a._s(a.columnListLen))]),a._v(" "),n("div",{staticStyle:{margin:"3px 0"}},[n("el-autocomplete",{staticClass:"inline-input",attrs:{"fetch-suggestions":a.querySearchLeft,placeholder:"请输入内容",size:"mini"},on:{select:a.handleSearchLeft},scopedSlots:a._u([{key:"default",fn:function(t){var e=t.item;return[n("span",[a._v(a._s(e.label))])]}}]),model:{value:a.searchLeft,callback:function(t){a.searchLeft=t},expression:"searchLeft"}},[n("i",{staticClass:"el-icon-search el-input__icon",attrs:{slot:"suffix"},slot:"suffix"})])],1)],1),a._v(" "),n("div",{staticClass:"tableSetup_content"},[n("el-checkbox-group",{on:{change:a.handleCheckChangeLeft},model:{value:a.checkListLeft,callback:function(t){a.checkListLeft=t},expression:"checkListLeft"}},[n("transition-group",{key:a.listKey,attrs:{name:"el-zoom-in-center"}},a._l(a.columnData,function(e,i){return n("div",{key:i,staticClass:"tableSetup_item",on:{dblclick:function(t){a.dbCheckItemLeft(e,i,t)}}},[n("el-checkbox",{attrs:{label:e}},[a._v("\n                "+a._s(e.label)+"\n              ")])],1)}))],1)],1),a._v(" "),n("div",{staticClass:"tableSetup_tips"},[n("span",[a._v("双击，可快速左右切换。")])])]),a._v(" "),n("div",{staticClass:"tableSetup_btn"},[n("el-button",{attrs:{type:"primary",icon:"el-icon-arrow-right"},on:{click:function(t){a.doAction("goRight")}}}),a._v(" "),n("br"),a._v(" "),n("el-button",{attrs:{type:"primary",icon:"el-icon-arrow-left"},on:{click:function(t){a.doAction("goLeft")}}})],1),a._v(" "),n("div",{staticClass:"tableSetup_list"},[n("div",{staticClass:"tableSetup_head"},[n("div",{staticClass:"tableSetup_head_select"},[a._v("选择："+a._s(a.rightCheckLen))]),a._v(" "),n("el-checkbox",{attrs:{indeterminate:a.isIndeterminateRight},on:{change:a.handChangeAllRight},model:{value:a.checkAllRight,callback:function(t){a.checkAllRight=t},expression:"checkAllRight"}},[a._v("显示列 "+a._s(a.rightListLen)+" / "+a._s(a.columnListLen))]),a._v(" "),n("div",{staticStyle:{margin:"3px 0"}},[n("el-autocomplete",{staticClass:"inline-input",attrs:{"fetch-suggestions":a.querySearchRight,placeholder:"请输入内容",size:"mini"},on:{select:a.handleSearchRight},scopedSlots:a._u([{key:"default",fn:function(t){var e=t.item;return[n("span",[a._v(a._s(e.label))])]}}]),model:{value:a.searchRight,callback:function(t){a.searchRight=t},expression:"searchRight"}},[n("i",{staticClass:"el-icon-search el-input__icon",attrs:{slot:"suffix"},slot:"suffix"})])],1)],1),a._v(" "),n("div",{staticClass:"tableSetup_content"},[n("el-checkbox-group",{on:{change:a.handleCheckChangeRight},model:{value:a.checkListRight,callback:function(t){a.checkListRight=t},expression:"checkListRight"}},[n("draggable",{staticClass:"dragArea",attrs:{move:a.canDragStart,list:a.showColumnData}},[n("transition-group",{attrs:{name:"el-zoom-in-center"}},a._l(a.showColumnData,function(e,i){return n("div",{key:i,staticClass:"tableSetup_item",on:{dblclick:function(t){a.dbCheckItemRight(e,i,t)}}},[n("el-checkbox",{attrs:{label:e}},[a._v("\n                  "+a._s(e.label)+"\n                ")]),a._v(" "),n("el-switch",{attrs:{"active-text":e.fixed?"固定":"活动"},on:{change:function(t){a.handleSwitch(e)}},model:{value:e.fixed,callback:function(t){a.$set(e,"fixed",t)},expression:"column.fixed"}})],1)}))],1)],1)],1),a._v(" "),n("div",{staticClass:"tableSetup_tips"},[n("span",[a._v("拖拽，可调整上下顺序。")]),a._v(" "),n("br"),n("span",[a._v("列表最多只能显示"+a._s(a.maxLen)+"个字段。")])])])]),a._v(" "),n("div",{attrs:{slot:"footer"},slot:"footer"},[n("el-button",{attrs:{type:"primary"},on:{click:function(t){a.submitForm()}}},[a._v("确 定")]),a._v(" "),n("el-button",{on:{click:a.closeMe}},[a._v("取 消")])],1)])},staticRenderFns:[]};e.a=a},"ndV/":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i("7jb6"),n=i("zQJA");var s=function(t){i("y1WK")},r=i("VU/8")(a.a,n.a,s,null,null);e.default=r.exports},puNT:function(t,e,i){"use strict";var a=i("IAIf"),n=i("QcgQ");var s=function(t){i("MXEa")},r=i("VU/8")(a.a,n.a,s,null,null);e.a=r.exports},y1WK:function(t,e){},zQJA:function(t,e,i){"use strict";var a={render:function(){var a=this,t=a.$createElement,n=a._self._c||t;return n("div",{staticClass:"component"},[n("h2",[a._v("打印导出  "),n("el-button",{attrs:{icon:"el-icon-download",type:"success",size:"mini"},on:{click:a.downloadFile}},[a._v("下载插件")])],1),a._v(" "),n("el-collapse",{attrs:{accordion:""},model:{value:a.activeName,callback:function(t){a.activeName=t},expression:"activeName"}},[n("el-collapse-item",{attrs:{title:"【敲黑板】用打印导出功能的两个重要前提是：1、下载插件。 2、要做好【表格设置】的功能。elementUI重新封装了table，LODOP打印插件不能识别\n        < el-table>数据，并且根据以下需求完成打印导出功能。",name:"1"}},[n("el-button",{attrs:{type:"primary",icon:"el-icon-setting",size:"mini",plain:""},on:{click:a.setTable}},[a._v("表格设置")]),a._v(" "),n("br"),a._v(" "),n("el-table",{key:a.tablekey,ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:a.repertoryArr,border:"","default-sort":{prop:"id",order:"ascending"},stripe:""}},[n("el-table-column",{attrs:{fixed:"",sortable:"",type:"selection",width:"50"}}),a._v(" "),a._l(a.tableColumn,function(i){return[i.slot?n("el-table-column",{key:i.id,attrs:{fixed:i.fixed,sortable:"",label:i.label,width:i.width},scopedSlots:a._u([{key:"default",fn:function(e){return[i.click?n("span",{staticClass:"clickitem",domProps:{innerHTML:a._s(i.slot(e))},on:{click:function(t){t.stopPropagation(),i.click(e)}}}):n("span",{domProps:{innerHTML:a._s(i.slot(e))}})]}}])}):n("el-table-column",{key:i.id,attrs:{fixed:i.fixed,sortable:"",label:i.label,prop:i.prop,width:i.width}})]})],2),a._v(" "),n("TableSetup",{attrs:{popVisible:a.setupTableVisible,columns:a.tableColumn},on:{close:a.closeSetupTable,success:a.setColumn}})],1)],1),a._v(" "),n("el-tabs",{attrs:{type:"card"},model:{value:a.activeName2,callback:function(t){a.activeName2=t},expression:"activeName2"}},[n("el-tab-pane",{attrs:{label:"打印导出表格设置中的表格",name:"first"}},[n("el-row",{attrs:{gutter:12}},[n("el-col",{attrs:{span:12}},[n("div",{staticClass:"component-remark"},[n("el-alert",{staticStyle:{"margin-top":"10px"},attrs:{title:"// script ^^举个栗子^^",type:"primary",closable:!1}},[n("div",{staticClass:"component-remark-html"},[a._v("\n                import { PrintInFullPage, SaveAsFile } from '@/utils/lodopFuncs' // 引入通用方法\n                "),n("br"),a._v(" export default {\n                "),n("br"),a._v("   components: { TableSetup },\n                "),n("br"),a._v("   data () {\n                "),n("br"),a._v("     return {\n                "),n("br"),a._v("       setupTableVisible: false, // 默认弹出框关闭\n                "),n("br"),a._v("       tablekey: 0, // 初始化表格视图key\n                "),n("br"),a._v("       tableColumn: [] // table数据列\n                "),n("br"),a._v("       repertoryArr: [] // 后台接口获取到的列表数据\n                "),n("br"),a._v("       }\n                "),n("br"),a._v("     },\n                "),n("br"),a._v("   methods: {\n                "),n("br"),a._v("     doAction(type) {\n                "),n("br"),a._v("       switch (type) {\n                "),n("br"),a._v("         case 'print': // 打印表格常用方法\n                "),n("br"),a._v("           PrintInFullPage({\n                "),n("br"),a._v("           data: this.repertoryArr, // 列表中的数据\n                "),n("br"),a._v("           columns: this.tableColumn, // 表格设置好的列\n                "),n("br"),a._v("           name: '全部库存' // 文件名称\n                "),n("br"),a._v("           })\n                "),n("br"),a._v("         break\n                "),n("br"),a._v("         case 'export': // 导出表格常用方法\n                "),n("br"),a._v("           SaveAsFile({\n                "),n("br"),a._v("           data: this.repertoryArr,// 列表中的数据\n                "),n("br"),a._v("           columns: this.tableColumn, // 表格设置好的列\n                "),n("br"),a._v("           name: '全部库存' // 文件名称\n                "),n("br"),a._v("           })\n                "),n("br"),a._v("         break\n                "),n("br"),a._v("         }\n                "),n("br"),a._v("       }\n                "),n("br"),a._v("   }\n                "),n("br"),a._v(" }\n                "),n("br")])])],1)]),a._v(" "),n("el-col",{attrs:{span:12}},[n("div",{staticClass:"component-remark"},[n("el-alert",{staticStyle:{"margin-top":"10px"},attrs:{title:"",type:"primary",closable:!1}},[n("el-button",{attrs:{type:"primary",icon:"el-icon-setting",size:"mini",plain:""},on:{click:function(t){a.doAction("print")}}},[a._v("打印")]),a._v(" "),n("el-button",{attrs:{type:"primary",icon:"el-icon-setting",size:"mini",plain:""},on:{click:function(t){a.doAction("export")}}},[a._v("导出")])],1),a._v(" "),n("el-alert",{staticStyle:{"margin-top":"10px"},attrs:{title:"",type:"primary",closable:!1}},[n("h3",[a._v("需求")]),a._v(" "),n("p",[a._v("列表中有\n                "),n("el-tag",{attrs:{size:"mini"}},[a._v("打勾选择项")]),a._v(" 就打印或者导出该项，若没有，就根据搜索条件打印或者导出当页列表中的所有数据。")],1)]),a._v(" "),n("el-alert",{staticStyle:{"margin-top":"10px"},attrs:{title:"",type:"primary",closable:!1}},[n("h3",[a._v("打印参数 PrintInFullPage "),n("el-tag",{attrs:{size:"mini",type:"info"}},[a._v("Function")])],1),a._v(" "),n("p",[a._v("data: 需要打印的列表数据\n                "),n("el-tag",{attrs:{size:"mini",type:"success"}},[a._v("Array")]),a._v(" "),n("el-tag",{attrs:{size:"mini"}},[a._v("必填项")])],1),a._v(" "),n("p",[a._v("columns: 表格设置状态中的table列\n                "),n("el-tag",{attrs:{size:"mini",type:"success"}},[a._v("Array")]),a._v(" "),n("el-tag",{attrs:{size:"mini"}},[a._v("必填项")])],1),a._v(" "),n("p",[a._v("name: 自定义导出文件名\n                "),n("el-tag",{attrs:{size:"mini",type:"success"}},[a._v("String")]),a._v(" "),n("el-tag",{attrs:{size:"mini",type:"warning"}},[a._v("非必填项")])],1)]),a._v(" "),n("el-alert",{staticStyle:{"margin-top":"10px"},attrs:{title:"",type:"primary",closable:!1}},[n("h3",[a._v("导出参数 SaveAsFile "),n("el-tag",{attrs:{size:"mini",type:"info"}},[a._v("Function")])],1),a._v(" "),n("p",[a._v("data: 需要导出的列表数据\n                "),n("el-tag",{attrs:{size:"mini",type:"success"}},[a._v("Array")]),a._v(" "),n("el-tag",{attrs:{size:"mini"}},[a._v("必填项")])],1),a._v(" "),n("p",[a._v("columns: 表格设置状态中的table列\n                "),n("el-tag",{attrs:{size:"mini",type:"success"}},[a._v("Array")]),a._v(" "),n("el-tag",{attrs:{size:"mini"}},[a._v("必填项")])],1),a._v(" "),n("p",[a._v("name: 自定义导出文件名\n                "),n("el-tag",{attrs:{size:"mini",type:"success"}},[a._v("String")]),a._v(" "),n("el-tag",{attrs:{size:"mini",type:"warning"}},[a._v("非必填项")])],1)])],1)])],1)],1),a._v(" "),n("el-tab-pane",{attrs:{label:"打印标签或运单",name:"second"}},[n("el-row",{attrs:{gutter:12}},[n("el-col",{attrs:{span:12}},[n("div",{staticClass:"component-remark"},[n("el-alert",{staticStyle:{"margin-top":"10px"},attrs:{title:"// script ^^举个栗子^^",type:"primary",closable:!1}},[n("div",{staticClass:"component-remark-html"},[n("br"),a._v("// 打印插件\n                "),n("br"),a._v("import { CreatePrintPage } from '@/utils/lodopFuncs'\n                "),n("br"),a._v("// 获取打印位置参数接口\n                "),n("br"),a._v("import { getPrintOrderItems, getPrintLibItems } from '@/api/operation/print'\n                "),n("br"),a._v(" "),n("br"),a._v(" doAction(type) {\n                "),n("br"),a._v("   switch (type) {\n                "),n("br"),a._v("     case 'printLibkey': // 打印标签（已保存）\n                "),n("br"),a._v("       getPrintLibItems(this.form.tmsOrderShipInfo.id).then(data => { // 调接口-已保存打印标签\n                "),n("br"),a._v("       CreatePrintPage(data) // 打印运单或标签通用方法\n                "),n("br"),a._v("       })\n                "),n("br"),a._v("     break\n                "),n("br"),a._v("     case 'printShipKey': // 打印运单（已保存）\n                "),n("br"),a._v("       getPrintOrderItems(this.form.tmsOrderShipInfo.id).then(data => { // 调接口-已保存打印标签\n                "),n("br"),a._v("       CreatePrintPage(data) // 打印运单或标签通用方法\n                "),n("br"),a._v("       })\n                "),n("br"),a._v("     break\n                "),n("br"),a._v("     }\n                "),n("br"),a._v("   }\n              ")])])],1)]),a._v(" "),n("el-col",{attrs:{span:12}},[n("div",{staticClass:"component-remark"},[n("el-alert",{staticStyle:{"margin-top":"10px"},attrs:{title:"",type:"primary",closable:!1}},[n("h3",[a._v("需求")]),a._v(" "),n("p",[n("el-tag",{attrs:{type:"warning",size:"mini"}},[a._v("未保存")]),a._v("打印标签或者运单需要拼接打印脚本，\n                "),n("el-tag",{attrs:{type:"warning",size:"mini"}},[a._v("已保存")]),a._v("的运单可以传\n                "),n("el-tag",{attrs:{size:"mini"}},[a._v("运单ID")]),a._v("调接口后台返回拼接好的脚本直接打印。")],1)]),a._v(" "),n("el-alert",{staticStyle:{"margin-top":"10px"},attrs:{title:"",type:"primary",closable:!1}},[n("h3",[a._v("打印参数 CreatePrintPage  "),n("el-tag",{attrs:{size:"mini",type:"info"}},[a._v("Function")])],1),a._v(" "),n("p",[a._v("data: 后台返回的脚本字符串\n                "),n("el-tag",{attrs:{size:"mini",type:"success"}},[a._v("String")]),a._v(" "),n("el-tag",{attrs:{size:"mini"}},[a._v("必填项")])],1)]),a._v(" "),n("el-alert",{staticStyle:{"margin-top":"10px"},attrs:{title:"",type:"primary",closable:!1}},[n("h3",[a._v("标签打印方法 getPrintLibItems \n                 "),n("el-tag",{attrs:{size:"mini",type:"info"}},[a._v("Function")])],1),a._v(" "),n("p",[a._v("params: 运单ID \n                "),n("el-tag",{attrs:{size:"mini",type:"success"}},[a._v("String")]),a._v(" "),n("el-tag",{attrs:{size:"mini"}},[a._v("必填项")])],1)]),a._v(" "),n("el-alert",{staticStyle:{"margin-top":"10px"},attrs:{title:"",type:"primary",closable:!1}},[n("h3",[a._v("运单打印方法 getPrintOrderItems \n                 "),n("el-tag",{attrs:{size:"mini",type:"info"}},[a._v("Function")])],1),a._v(" "),n("p",[a._v("params: 运单ID \n                "),n("el-tag",{attrs:{size:"mini",type:"success"}},[a._v("String")]),a._v(" "),n("el-tag",{attrs:{size:"mini"}},[a._v("必填项")])],1)])],1)])],1)],1),a._v(" "),n("el-tab-pane",{attrs:{label:"打印结算单",name:"third"}},[a._v("打印结算单")]),a._v(" "),n("el-tab-pane",{attrs:{label:"打印合同",name:"fourth"}},[a._v("打印合同")])],1)],1)},staticRenderFns:[]};e.a=a}});