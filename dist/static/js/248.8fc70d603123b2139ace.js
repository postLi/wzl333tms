webpackJsonp([248],{HBjM:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=i("KK8W"),a=i("IOGq");var o=function(t){i("wdkd")},n=i("VU/8")(s.a,a.a,o,null,null);e.default=n.exports},IOGq:function(t,e,i){"use strict";var s={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[i("h2",[e._v("批量导入")]),e._v(" "),i("ImportDialog",{attrs:{popVisible:e.importDialogVisible,info:"driver"},on:{close:function(t){e.importDialogVisible=!1},success:e.fetchData}}),e._v(" "),i("el-row",{attrs:{gutter:12}},[i("el-col",{attrs:{span:12}},[i("div",{staticClass:"component-remark"},[i("el-alert",{staticStyle:{"margin-top":"10px"},attrs:{title:"// html ",type:"primary",closable:!1}},[i("div",{staticClass:"component-remark-html"},[e._v("\n            "+e._s(e.htmlMessage1)+"\n            "),i("el-button",{directives:[{name:"clipboard",rawName:"v-clipboard:copy",value:e.htmlMessage1,expression:"htmlMessage1",arg:"copy"},{name:"clipboard",rawName:"v-clipboard:success",value:e.clipboardSuccess,expression:"clipboardSuccess",arg:"success"}],attrs:{type:"info",icon:"el-icon-document",size:"mini",plain:""}},[e._v("copy")])],1)]),e._v(" "),i("el-alert",{staticStyle:{"margin-top":"10px"},attrs:{title:"// script ^^举个栗子^^",type:"primary",closable:!1}},[i("div",{staticClass:"component-remark-html"},[e._v("\n            import ImportDialog from '@/components/importDialog' // 引入通用方法\n            "),i("br"),e._v(" export default {\n            "),i("br"),e._v("   components: { ImportDialog },\n            "),i("br"),e._v("   data () {\n            "),i("br"),e._v("     return {\n            "),i("br"),e._v("       importDialogVisible: false, // 默认弹出框关闭\n            "),i("br"),e._v("       }\n            "),i("br"),e._v("     },\n            "),i("br"),e._v("   methods: {\n            "),i("br"),e._v("     doAction(type) {\n            "),i("br"),e._v("       switch (type) {\n            "),i("br"),e._v("         case 'import': // 点击打开导入弹出框\n            "),i("br"),e._v("           this.importDialogVisible = true\n            "),i("br"),e._v("         break\n            "),i("br"),e._v("         }\n            "),i("br"),e._v("       }\n            "),i("br"),e._v("     fetchData () { // 重新获取列表数据 }\n            "),i("br"),e._v("   }\n            "),i("br"),e._v(" }\n            "),i("br")])])],1)]),e._v(" "),i("el-col",{attrs:{span:12}},[i("div",{staticClass:"component-remark"},[i("el-alert",{staticStyle:{"margin-top":"10px"},attrs:{title:"",type:"primary",closable:!1}},[i("el-button",{attrs:{type:"primary",plain:"",size:"mini",icon:"el-icon-upload2"},on:{click:function(t){e.doAction("import")}}},[e._v("批量导入")])],1),e._v(" "),i("el-alert",{staticStyle:{"margin-top":"10px"},attrs:{title:"",type:"primary",closable:!1}},[i("h3",[e._v("需求")]),e._v(" "),i("p",[e._v("按照模板下载excel模板，然后用户填充数据后，上传excel表格文件，从而导入数据。")])]),e._v(" "),i("el-alert",{staticStyle:{"margin-top":"10px"},attrs:{title:"",type:"primary",closable:!1}},[i("h3",[e._v("标识 info "),i("el-tag",{attrs:{size:"mini",type:"info"}},[e._v("String")]),e._v(" "),i("el-tag",{attrs:{size:"mini"}},[e._v("必填项")])],1),e._v(" "),i("b",[e._v("使用 < el-table :info=\"'sender'\" > < /el-table>")]),i("br"),e._v(" "),i("p",[e._v("标识(具体标识如下)")]),e._v(" "),i("br"),e._v(" "),i("ol",[i("li",[e._v("'driver'：司机")]),e._v(" "),i("li",[e._v("'carrier'：承运商")]),e._v(" "),i("li",[e._v("'truck'：车辆")]),e._v(" "),i("li",[e._v("'sender'：发货人")]),e._v(" "),i("li",[e._v("'receiver'：收货人")])])])],1)])],1)],1)},staticRenderFns:[]};e.a=s},KK8W:function(t,e,i){"use strict";var s=i("ijWn");e.a={components:{ImportDialog:s.a},data:function(){return{importDialogVisible:!1,htmlMessage1:'<ImportDialog :popVisible="importDialogVisible" @close="importDialogVisible = false" @success="fetchData" :info="\'driver\'"></ImportDialog>'}},methods:{doAction:function(t){switch(t){case"import":this.importDialogVisible=!0}},fetchData:function(){},clipboardSuccess:function(){this.$message({message:"复制成功",type:"success",duration:1500})}}}},bPPU:function(t,e,i){"use strict";var l=i("t5DY");e.a={props:{isSubjectInfo:{type:Boolean,default:!1},popVisible:{type:Boolean,default:!1},info:{type:String,default:""}},watch:{isSubjectInfo:function(t){this.titlePop=t?"导入模板":"批量导入"}},data:function(){return{titlePop:"批量导入",importType:{},isInitDialog:!0,resMessage:{failInfoList:[]},percentage:0,isProgress:!0,dataInfo:[],tableKey:0}},computed:{isShow:{get:function(){return this.popVisible&&this.init(),this.popVisible},set:function(){}}},methods:{init:function(){this.$set(this.importType,"sender",this.$const.CUSTOMER_SENDER_EXCEL),this.$set(this.importType,"receiver",this.$const.CUSTOMER_RECEIVER_EXCEL),this.$set(this.importType,"truck",this.$const.TRUCK_EXCEL),this.$set(this.importType,"carrier",this.$const.CARRIER_EXCEL),this.$set(this.importType,"driver",this.$const.DRIVER_EXCEL),this.$set(this.importType,"subinfo",this.$const.SUBINFO_EXCEL),this.isInitDialog=!0},doAction:function(t){switch(t){case"import":break;case"download":this.downloadFile()}},downloadFile:function(){this.info&&window.open(this.importType[this.info])},closeMe:function(t){this.$emit("close"),"function"==typeof t&&t()},handleChange:function(){},uploadHandleFile:function(t){var e=this,i=t.file,s="",a=i.name.toLowerCase(),o=a.lastIndexOf(".");if(-1<o&&(s=a.substring(o)),s&&".xlsx"===s){var n=new FormData,r=void 0;n.append("uploadfile",i),this.isProgress=!0,this.isSubjectInfo?r=Object(l.o)(n):(n.append("excelSign",this.info),r=Object(l.n)(n)),r.then(function(t){e.resMessage=t,e.failInfoList=t.failInfoList,e.isInitDialog=!1,e.percentageAnimated(),e.$emit("success"),e.$message({type:"success",message:"操作成功"})}).catch(function(t){e.resMessage=t,e.isInitDialog=!1,e.percentageAnimated(),e._handlerCatchMsg(t)})}else this.$message({type:"info",message:"只能上传 .xlsx 模板文件"})},percentageAnimated:function(){var t=this,e=0,i=setInterval(function(){e++,100===(t.percentage=e)&&(t.isProgress=!1,window.clearInterval(i))},10)}}}},ijWn:function(t,e,i){"use strict";var s=i("bPPU"),a=i("j///"),o=i("VU/8")(s.a,a.a,null,null,null);e.a=o.exports},"j///":function(t,e,i){"use strict";var s={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("el-dialog",{staticClass:"tms_dialog tms_dialog_import",attrs:{title:e.titlePop,visible:e.isShow,"close-on-click-modal":!1,"before-close":e.closeMe,width:"500px"},on:{"update:visible":function(t){e.isShow=t}}},[e.isInitDialog?i("el-row",[i("el-col",{attrs:{span:12}},[i("el-upload",{attrs:{"show-file-list":!1,"on-change":e.handleChange,action:"","http-request":e.uploadHandleFile}},[i("div",{staticClass:"bigIconBtn_primary",on:{click:function(t){e.doAction("import")}}},[i("i",{staticClass:"icon-export-btn"}),e._v(" "),i("br"),e._v(" "),i("span",[e._v("上传文件")])])])],1),e._v(" "),i("el-col",{attrs:{span:12}},[i("div",{staticClass:"bigIconBtn_success",on:{click:function(t){e.doAction("download")}}},[i("i",{staticClass:"icon-import-btn"}),e._v(" "),i("br"),e._v(" "),i("span",[e._v("下载标准模板")])])]),e._v(" "),i("el-col",{attrs:{span:22,offset:2}},[e.isSubjectInfo?i("ul",{staticClass:"importTips",attrs:{type:"1"}},[i("li",[e._v("1、导入前，需要先下载标准版，按照标准模板后再上传。")]),e._v(" "),i("li",[e._v("2、每次最多能导入1000条，超过1000条，只导入前1000条。")])]):i("ul",{staticClass:"importTips",attrs:{type:"1"}},[i("li",[e._v("1、导入前，需要先下载标准版，按照标准模板后再上传。")]),e._v(" "),i("li",[e._v("2、发货人，手机号码必须填写，且不能与已有客户重复。")]),e._v(" "),i("li",[e._v("3、导入所属网点默认为本网点。")]),e._v(" "),i("li",[e._v("4、每次最多能导入1000条，超过1000条，只导入前1000条。")])])])],1):i("div",{staticClass:"import_result"},[e.isProgress?i("el-progress",{attrs:{"text-inside":!0,"stroke-width":15,percentage:e.percentage,status:"success"}}):i("p",[e._v(e._s(e.resMessage.resultInfo))]),e._v(" "),i("el-table",{key:e.tableKey,ref:"multipleTable",class:11<e.resMessage.failInfoList.length?"failinScroll":"",staticStyle:{width:"100%","margin-top":"10px"},attrs:{data:e.resMessage.failInfoList,stripe:"",border:"","tooltip-effect":"dark","default-sort":{prop:"id",order:"ascending"}}},[i("el-table-column",{attrs:{sortable:"",type:"index",width:"60",label:"序号"}}),e._v(" "),i("el-table-column",{attrs:{prop:"failExcelNum",width:"130",label:"失败行"}}),e._v(" "),i("el-table-column",{attrs:{prop:"failInfo",label:"失败字段"}})],1)],1)],1)},staticRenderFns:[]};e.a=s},wdkd:function(t,e){}});