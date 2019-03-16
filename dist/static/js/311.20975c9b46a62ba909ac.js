webpackJsonp([311],{"7jb6":function(t,e,a){"use strict";var i=a("UQm2"),r=a("t5DY"),n=a("puNT"),s=a("Mqi+");e.a={components:{TableSetup:n.a},data:function(){return{activeName2:"first",repertoryArr:[{shipSn:"234234234",shipStatusName:"已发货",shipIdentifying:"控",repertoryCreateTime:"2018-09-11 19:55:02",hashours:"6"},{shipSn:"19082334",shipStatusName:"已发货",shipIdentifying:"控",repertoryCreateTime:"2018-09-11 19:55:02",hashours:"1"}],activeName:1,setupTableVisible:!1,tablekey:0,tableColumn:[{label:"运单号",prop:"shipSn",width:"150",fixed:!0},{label:"运单状态",prop:"shipStatusName",width:"150",fixed:!1},{label:"运单标识",prop:"shipIdentifying",width:"150",fixed:!1,slot:function(t){return Object(s.b)(t.row.shipIdentifying)}},{label:"入库时间",prop:"repertoryCreateTime",width:"180",fixed:!1},{label:"库存时长",prop:"hashours",width:"150",fixed:!1},{label:"开单网点",prop:"fromOrgName",width:"150",fixed:!1},{label:"开单时间",prop:"createTime",width:"180",fixed:!1},{label:"货品名",prop:"cargoName",width:"150",fixed:!1},{label:"库存件数",prop:"repertoryAmount",width:"150",fixed:!1},{label:"库存重量",prop:"repertoryWeight",width:"150",fixed:!1},{label:"库存体积",prop:"repertoryVolume",width:"150",fixed:!1}]}},methods:{doAction:function(t){switch(t){case"print":Object(i.d)({data:this.repertoryArr,columns:this.tableColumn,name:"全部库存"});break;case"export":Object(i.g)({data:this.repertoryArr,columns:this.tableColumn,name:"全部库存"})}},downloadFile:function(){window.open(Object(r.b)())},setTable:function(){this.setupTableVisible=!0},closeSetupTable:function(){this.setupTableVisible=!1},setColumn:function(t){this.tableColumn=t,this.tablekey=(new Date).getTime()}}}},"ndV/":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("7jb6"),r=a("zQJA");var n=function(t){a("y1WK")},s=a("VU/8")(i.a,r.a,n,null,null);e.default=s.exports},y1WK:function(t,e){},zQJA:function(t,e,a){"use strict";var i={render:function(){var i=this,t=i.$createElement,r=i._self._c||t;return r("div",{staticClass:"component"},[r("h2",[i._v("打印导出  "),r("el-button",{attrs:{icon:"el-icon-download",type:"success",size:"mini"},on:{click:i.downloadFile}},[i._v("下载插件")])],1),i._v(" "),r("el-collapse",{attrs:{accordion:""},model:{value:i.activeName,callback:function(t){i.activeName=t},expression:"activeName"}},[r("el-collapse-item",{attrs:{title:"【敲黑板】用打印导出功能的两个重要前提是：1、下载插件。 2、要做好【表格设置】的功能。elementUI重新封装了table，LODOP打印插件不能识别\n        < el-table>数据，并且根据以下需求完成打印导出功能。",name:"1"}},[r("el-button",{attrs:{type:"primary",icon:"el-icon-setting",size:"mini",plain:""},on:{click:i.setTable}},[i._v("表格设置")]),i._v(" "),r("br"),i._v(" "),r("el-table",{key:i.tablekey,ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:i.repertoryArr,border:"","default-sort":{prop:"id",order:"ascending"},stripe:""}},[r("el-table-column",{attrs:{fixed:"",sortable:"",type:"selection",width:"50"}}),i._v(" "),i._l(i.tableColumn,function(a){return[a.slot?r("el-table-column",{key:a.id,attrs:{fixed:a.fixed,sortable:"",label:a.label,width:a.width},scopedSlots:i._u([{key:"default",fn:function(e){return[a.click?r("span",{staticClass:"clickitem",domProps:{innerHTML:i._s(a.slot(e))},on:{click:function(t){t.stopPropagation(),a.click(e)}}}):r("span",{domProps:{innerHTML:i._s(a.slot(e))}})]}}])}):r("el-table-column",{key:a.id,attrs:{fixed:a.fixed,sortable:"",label:a.label,prop:a.prop,width:a.width}})]})],2),i._v(" "),r("TableSetup",{attrs:{popVisible:i.setupTableVisible,columns:i.tableColumn},on:{close:i.closeSetupTable,success:i.setColumn}})],1)],1),i._v(" "),r("el-tabs",{attrs:{type:"card"},model:{value:i.activeName2,callback:function(t){i.activeName2=t},expression:"activeName2"}},[r("el-tab-pane",{attrs:{label:"打印导出表格设置中的表格",name:"first"}},[r("el-row",{attrs:{gutter:12}},[r("el-col",{attrs:{span:12}},[r("div",{staticClass:"component-remark"},[r("el-alert",{staticStyle:{"margin-top":"10px"},attrs:{title:"// script ^^举个栗子^^",type:"primary",closable:!1}},[r("div",{staticClass:"component-remark-html"},[i._v("\n                import { PrintInFullPage, SaveAsFile } from '@/utils/lodopFuncs' // 引入通用方法\n                "),r("br"),i._v(" export default {\n                "),r("br"),i._v("   components: { TableSetup },\n                "),r("br"),i._v("   data () {\n                "),r("br"),i._v("     return {\n                "),r("br"),i._v("       setupTableVisible: false, // 默认弹出框关闭\n                "),r("br"),i._v("       tablekey: 0, // 初始化表格视图key\n                "),r("br"),i._v("       tableColumn: [] // table数据列\n                "),r("br"),i._v("       repertoryArr: [] // 后台接口获取到的列表数据\n                "),r("br"),i._v("       }\n                "),r("br"),i._v("     },\n                "),r("br"),i._v("   methods: {\n                "),r("br"),i._v("     doAction(type) {\n                "),r("br"),i._v("       switch (type) {\n                "),r("br"),i._v("         case 'print': // 打印表格常用方法\n                "),r("br"),i._v("           PrintInFullPage({\n                "),r("br"),i._v("           data: this.repertoryArr, // 列表中的数据\n                "),r("br"),i._v("           columns: this.tableColumn, // 表格设置好的列\n                "),r("br"),i._v("           name: '全部库存' // 文件名称\n                "),r("br"),i._v("           })\n                "),r("br"),i._v("         break\n                "),r("br"),i._v("         case 'export': // 导出表格常用方法\n                "),r("br"),i._v("           SaveAsFile({\n                "),r("br"),i._v("           data: this.repertoryArr,// 列表中的数据\n                "),r("br"),i._v("           columns: this.tableColumn, // 表格设置好的列\n                "),r("br"),i._v("           name: '全部库存' // 文件名称\n                "),r("br"),i._v("           })\n                "),r("br"),i._v("         break\n                "),r("br"),i._v("         }\n                "),r("br"),i._v("       }\n                "),r("br"),i._v("   }\n                "),r("br"),i._v(" }\n                "),r("br")])])],1)]),i._v(" "),r("el-col",{attrs:{span:12}},[r("div",{staticClass:"component-remark"},[r("el-alert",{staticStyle:{"margin-top":"10px"},attrs:{title:"",type:"primary",closable:!1}},[r("el-button",{attrs:{type:"primary",icon:"el-icon-setting",size:"mini",plain:""},on:{click:function(t){i.doAction("print")}}},[i._v("打印")]),i._v(" "),r("el-button",{attrs:{type:"primary",icon:"el-icon-setting",size:"mini",plain:""},on:{click:function(t){i.doAction("export")}}},[i._v("导出")])],1),i._v(" "),r("el-alert",{staticStyle:{"margin-top":"10px"},attrs:{title:"",type:"primary",closable:!1}},[r("h3",[i._v("需求")]),i._v(" "),r("p",[i._v("列表中有\n                "),r("el-tag",{attrs:{size:"mini"}},[i._v("打勾选择项")]),i._v(" 就打印或者导出该项，若没有，就根据搜索条件打印或者导出当页列表中的所有数据。")],1)]),i._v(" "),r("el-alert",{staticStyle:{"margin-top":"10px"},attrs:{title:"",type:"primary",closable:!1}},[r("h3",[i._v("打印参数 PrintInFullPage "),r("el-tag",{attrs:{size:"mini",type:"info"}},[i._v("Function")])],1),i._v(" "),r("p",[i._v("data: 需要打印的列表数据\n                "),r("el-tag",{attrs:{size:"mini",type:"success"}},[i._v("Array")]),i._v(" "),r("el-tag",{attrs:{size:"mini"}},[i._v("必填项")])],1),i._v(" "),r("p",[i._v("columns: 表格设置状态中的table列\n                "),r("el-tag",{attrs:{size:"mini",type:"success"}},[i._v("Array")]),i._v(" "),r("el-tag",{attrs:{size:"mini"}},[i._v("必填项")])],1),i._v(" "),r("p",[i._v("name: 自定义导出文件名\n                "),r("el-tag",{attrs:{size:"mini",type:"success"}},[i._v("String")]),i._v(" "),r("el-tag",{attrs:{size:"mini",type:"warning"}},[i._v("非必填项")])],1)]),i._v(" "),r("el-alert",{staticStyle:{"margin-top":"10px"},attrs:{title:"",type:"primary",closable:!1}},[r("h3",[i._v("导出参数 SaveAsFile "),r("el-tag",{attrs:{size:"mini",type:"info"}},[i._v("Function")])],1),i._v(" "),r("p",[i._v("data: 需要导出的列表数据\n                "),r("el-tag",{attrs:{size:"mini",type:"success"}},[i._v("Array")]),i._v(" "),r("el-tag",{attrs:{size:"mini"}},[i._v("必填项")])],1),i._v(" "),r("p",[i._v("columns: 表格设置状态中的table列\n                "),r("el-tag",{attrs:{size:"mini",type:"success"}},[i._v("Array")]),i._v(" "),r("el-tag",{attrs:{size:"mini"}},[i._v("必填项")])],1),i._v(" "),r("p",[i._v("name: 自定义导出文件名\n                "),r("el-tag",{attrs:{size:"mini",type:"success"}},[i._v("String")]),i._v(" "),r("el-tag",{attrs:{size:"mini",type:"warning"}},[i._v("非必填项")])],1)])],1)])],1)],1),i._v(" "),r("el-tab-pane",{attrs:{label:"打印标签或运单",name:"second"}},[r("el-row",{attrs:{gutter:12}},[r("el-col",{attrs:{span:12}},[r("div",{staticClass:"component-remark"},[r("el-alert",{staticStyle:{"margin-top":"10px"},attrs:{title:"// script ^^举个栗子^^",type:"primary",closable:!1}},[r("div",{staticClass:"component-remark-html"},[r("br"),i._v("// 打印插件\n                "),r("br"),i._v("import { CreatePrintPage } from '@/utils/lodopFuncs'\n                "),r("br"),i._v("// 获取打印位置参数接口\n                "),r("br"),i._v("import { getPrintOrderItems, getPrintLibItems } from '@/api/operation/print'\n                "),r("br"),i._v(" "),r("br"),i._v(" doAction(type) {\n                "),r("br"),i._v("   switch (type) {\n                "),r("br"),i._v("     case 'printLibkey': // 打印标签（已保存）\n                "),r("br"),i._v("       getPrintLibItems(this.form.tmsOrderShipInfo.id).then(data => { // 调接口-已保存打印标签\n                "),r("br"),i._v("       CreatePrintPage(data) // 打印运单或标签通用方法\n                "),r("br"),i._v("       })\n                "),r("br"),i._v("     break\n                "),r("br"),i._v("     case 'printShipKey': // 打印运单（已保存）\n                "),r("br"),i._v("       getPrintOrderItems(this.form.tmsOrderShipInfo.id).then(data => { // 调接口-已保存打印标签\n                "),r("br"),i._v("       CreatePrintPage(data) // 打印运单或标签通用方法\n                "),r("br"),i._v("       })\n                "),r("br"),i._v("     break\n                "),r("br"),i._v("     }\n                "),r("br"),i._v("   }\n              ")])])],1)]),i._v(" "),r("el-col",{attrs:{span:12}},[r("div",{staticClass:"component-remark"},[r("el-alert",{staticStyle:{"margin-top":"10px"},attrs:{title:"",type:"primary",closable:!1}},[r("h3",[i._v("需求")]),i._v(" "),r("p",[r("el-tag",{attrs:{type:"warning",size:"mini"}},[i._v("未保存")]),i._v("打印标签或者运单需要拼接打印脚本，\n                "),r("el-tag",{attrs:{type:"warning",size:"mini"}},[i._v("已保存")]),i._v("的运单可以传\n                "),r("el-tag",{attrs:{size:"mini"}},[i._v("运单ID")]),i._v("调接口后台返回拼接好的脚本直接打印。")],1)]),i._v(" "),r("el-alert",{staticStyle:{"margin-top":"10px"},attrs:{title:"",type:"primary",closable:!1}},[r("h3",[i._v("打印参数 CreatePrintPage  "),r("el-tag",{attrs:{size:"mini",type:"info"}},[i._v("Function")])],1),i._v(" "),r("p",[i._v("data: 后台返回的脚本字符串\n                "),r("el-tag",{attrs:{size:"mini",type:"success"}},[i._v("String")]),i._v(" "),r("el-tag",{attrs:{size:"mini"}},[i._v("必填项")])],1)]),i._v(" "),r("el-alert",{staticStyle:{"margin-top":"10px"},attrs:{title:"",type:"primary",closable:!1}},[r("h3",[i._v("标签打印方法 getPrintLibItems \n                 "),r("el-tag",{attrs:{size:"mini",type:"info"}},[i._v("Function")])],1),i._v(" "),r("p",[i._v("params: 运单ID \n                "),r("el-tag",{attrs:{size:"mini",type:"success"}},[i._v("String")]),i._v(" "),r("el-tag",{attrs:{size:"mini"}},[i._v("必填项")])],1)]),i._v(" "),r("el-alert",{staticStyle:{"margin-top":"10px"},attrs:{title:"",type:"primary",closable:!1}},[r("h3",[i._v("运单打印方法 getPrintOrderItems \n                 "),r("el-tag",{attrs:{size:"mini",type:"info"}},[i._v("Function")])],1),i._v(" "),r("p",[i._v("params: 运单ID \n                "),r("el-tag",{attrs:{size:"mini",type:"success"}},[i._v("String")]),i._v(" "),r("el-tag",{attrs:{size:"mini"}},[i._v("必填项")])],1)])],1)])],1)],1),i._v(" "),r("el-tab-pane",{attrs:{label:"打印核销单",name:"third"}},[i._v("打印核销单")]),i._v(" "),r("el-tab-pane",{attrs:{label:"打印合同",name:"fourth"}},[i._v("打印合同")])],1)],1)},staticRenderFns:[]};e.a=i}});