webpackJsonp([233],{"9Zi4":function(e,t,i){"use strict";var a={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"component"},[a("h2",[e._v("表格设置")]),e._v(" "),a("el-button",{attrs:{type:"primary",icon:"el-icon-setting",size:"mini",plain:""},on:{click:e.setTable}},[e._v("表格设置")]),e._v(" "),a("el-table",{key:e.tablekey,ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:e.repertoryArr,border:"","default-sort":{prop:"id",order:"ascending"},stripe:""}},[a("el-table-column",{attrs:{fixed:"",sortable:"",type:"selection",width:"50"}}),e._v(" "),e._l(e.tableColumn,function(i){return[i.slot?a("el-table-column",{key:i.id,attrs:{fixed:i.fixed,sortable:"",label:i.label,width:i.width},scopedSlots:e._u([{key:"default",fn:function(t){return[i.click?a("span",{staticClass:"clickitem",domProps:{innerHTML:e._s(i.slot(t))},on:{click:function(e){e.stopPropagation(),i.click(t)}}}):a("span",{domProps:{innerHTML:e._s(i.slot(t))}})]}}])}):a("el-table-column",{key:i.id,attrs:{fixed:i.fixed,sortable:"",label:i.label,prop:i.prop,width:i.width}})]})],2),e._v(" "),a("TableSetup",{attrs:{popVisible:e.setupTableVisible,columns:e.tableColumn},on:{close:e.closeSetupTable,success:e.setColumn}}),e._v(" "),a("div",{staticClass:"component-remark"},[a("h4",[e._v("【表格设置组件】-用法")]),e._v(" "),a("h5",[e._v("1/父组件引入：")]),e._v(" "),a("el-alert",{attrs:{title:"// html   复制后自己格式化一下~",type:"primary",closable:!1}},[a("div",{staticClass:"component-remark-html"},[e._v("\n      \t\t"+e._s(e.htmlMessage1)+" "),a("el-button",{directives:[{name:"clipboard",rawName:"v-clipboard:copy",value:e.htmlMessage1,expression:"htmlMessage1",arg:"copy"},{name:"clipboard",rawName:"v-clipboard:success",value:e.clipboardSuccess,expression:"clipboardSuccess",arg:"success"}],attrs:{type:"info",icon:"el-icon-document",size:"mini",plain:""}},[e._v("copy")]),a("br"),a("br"),e._v("\n      \t\t"+e._s(e.htmlMessage2)+" "),a("el-button",{directives:[{name:"clipboard",rawName:"v-clipboard:copy",value:e.htmlMessage2,expression:"htmlMessage2",arg:"copy"},{name:"clipboard",rawName:"v-clipboard:success",value:e.clipboardSuccess,expression:"clipboardSuccess",arg:"success"}],attrs:{type:"info",icon:"el-icon-document",size:"mini",plain:""}},[e._v("copy")]),a("br"),a("br"),e._v("\n      \t\t"+e._s(e.htmlMessage3)+" "),a("el-button",{directives:[{name:"clipboard",rawName:"v-clipboard:copy",value:e.htmlMessage3,expression:"htmlMessage3",arg:"copy"},{name:"clipboard",rawName:"v-clipboard:success",value:e.clipboardSuccess,expression:"clipboardSuccess",arg:"success"}],attrs:{type:"info",icon:"el-icon-document",size:"mini",plain:""}},[e._v("copy")])],1)]),e._v(" "),a("el-alert",{attrs:{title:"// script",type:"primary",closable:!1}},[a("div",{staticClass:"component-remark-html"},[e._v("\n      \timport TableSetup from '@/components/tableSetup' "),a("br"),e._v("\n\t    export default { "),a("br"),e._v("\n\t      components: { TableSetup }, "),a("br"),e._v("\n\t      data () { "),a("br"),e._v("\n\t        return { "),a("br"),e._v("\n\t          setupTableVisible: false, // 默认弹出框关闭 "),a("br"),e._v("\n\t          tablekey: 0, // 初始化表格视图key "),a("br"),e._v("\n\t          tableColumn: [] // 后台接口获取到的列表数据 "),a("br"),e._v("\n\t          } "),a("br"),e._v("\n\t        }, "),a("br"),e._v("\n\t      methods: { "),a("br"),e._v("\n\t        setTable() { "),a("br"),e._v("\n\t          this.setupTableVisible = true "),a("br"),e._v("\n\t        }, "),a("br"),e._v("\n\t        closeSetupTable() { // 关闭弹出框 "),a("br"),e._v("\n\t          this.setupTableVisible = false "),a("br"),e._v("\n\t        }, "),a("br"),e._v("\n\t        setColumn(obj) { // 重绘表格列表 "),a("br"),e._v("\n\t          this.tableColumn = obj "),a("br"),e._v("\n\t          this.tablekey = Math.random() // 刷新表格视图 "),a("br"),e._v("\n\t        } "),a("br"),e._v("\n\t      } "),a("br"),e._v("\n\t     } "),a("br")])]),e._v(" "),a("h5",[e._v("2/数据结构：")]),e._v(" "),a("el-alert",{attrs:{title:"",type:"primary",closable:!1}},[a("div",{staticClass:"component-remark-html"},[a("b",[e._v("【 tableColumn 】：对应< el-table >上的列column "),a("el-tag",{attrs:{size:"mini",type:"info"}},[e._v("Array")])],1),a("br"),e._v("\n      \tlabel: 数据字段展示名称 "),a("el-tag",{attrs:{size:"mini",type:"info"}},[e._v("String")]),e._v(" "),a("el-tag",{attrs:{size:"mini"}},[e._v("必填项")]),a("br"),e._v("\n      \tprop: 数据字段绑定值 "),a("el-tag",{attrs:{size:"mini",type:"info"}},[e._v("String")]),e._v(" "),a("el-tag",{attrs:{size:"mini"}},[e._v("必填项")]),a("br"),e._v("\n      \twidth: 数据展示长度 "),a("el-tag",{attrs:{size:"mini",type:"info"}},[e._v("String | Number")]),e._v(" "),a("el-tag",{attrs:{size:"mini"}},[e._v("非必填项")]),a("br"),e._v("\n      \tfixed: 该列是否固定 "),a("el-tag",{attrs:{size:"mini",type:"info"}},[e._v("Boolean")]),e._v(" "),a("el-tag",{attrs:{size:"mini"}},[e._v("非必填项")]),e._v(" flase-不固定 true-固定"),a("br"),e._v('\n      \tslot: 相当于template solt-scope=""可以自定义当前表格项,方便用闭包 '),a("el-tag",{attrs:{size:"mini",type:"info"}},[e._v("Function")]),e._v(" "),a("el-tag",{attrs:{size:"mini"}},[e._v("非必填项")]),e._v(" flase-不固定 true-固定"),a("br"),a("br"),e._v("\n      \t^^举个栗子^^："),a("br"),e._v("\n      \ttableColumn: [{"),a("br"),e._v("\n          label: '运单标识',"),a("br"),e._v("\n          prop: 'shipIdentifying',"),a("br"),e._v("\n          width: '150',"),a("br"),e._v("\n          fixed: false,"),a("br"),e._v("\n          slot: function(scope) {"),a("br"),e._v("\n            return parseShipStatus(scope.row.shipIdentifying)"),a("br"),e._v("\n          }"),a("br"),e._v("\n        }],"),a("br"),e._v(" "),a("br"),e._v(" "),a("b",[e._v('【 repertoryArr 】：表格的数据,< el-table :data="repertoryArr" > '),a("el-tag",{attrs:{size:"mini",type:"info"}},[e._v("Array")])],1),a("br"),e._v(" "),a("b",[e._v("【 setupTableVisible 】：表格设置弹出框是否关闭 "),a("el-tag",{attrs:{size:"mini",type:"info"}},[e._v("Boolean")]),e._v(" false-关闭 true-显示")],1),a("br"),e._v(" "),a("b",[e._v("【 tablekey 】：表格视图key， 可以刷新当前table视图 "),a("el-tag",{attrs:{size:"mini",type:"info"}},[e._v("Number")]),e._v(" 可采用Math.random()或者 new Date().getTime()")],1),a("br")],1)])],1)],1)},staticRenderFns:[]};t.a=a},AOcM:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=i("SNy4"),l=i("9Zi4");var s=function(e){i("r+1A")},n=i("VU/8")(a.a,l.a,s,null,null);t.default=n.exports},IAIf:function(e,t,i){"use strict";var a=i("woOf"),o=i.n(a),l=i("DAYN"),s=i.n(l),r=i("0xDb"),c=i("t5DY");t.a={props:{popVisible:{type:Boolean,default:!1},columns:{type:Array,default:[]},code:{type:String,default:""}},components:{draggable:s.a},computed:{isShow:{get:function(){return this.popVisible},set:function(){}}},data:function(){return{orgColumnData:[],columnData:[],orgShowColumnData:[],showColumnData:[],list:[],rightList:[],listKey:0,isIndeterminateLeft:!0,isIndeterminateRight:!0,checkAllLeft:!1,checkAllRight:!1,checkListLeft:[],checkListRight:[],searchLeft:"",searchRight:"",leftListLen:0,rightListLen:0,columnListLen:0,isCheck:!0,maxLen:50,rightCheckLen:0,leftCheckLen:0,thecode:""}},mounted:function(){var a=this,e=this.code;this.$route.meta.code;this.thecode="","NOSET"===e?this.convertData():e?this.thecode=e:this.convertData(),this.thecode&&(this.fetchTableSetup(),this.eventBus.$on("tablesetup.change",function(e,t){if(e&&e===a.thecode){var i=a.showColumnData.filter(function(e){return e.prop===t.prop});i.length&&(i[0].width=t.width,a.changeTbaleSetup())}}))},methods:{convertData:function(e){this.initData(e),this.callback()},initData:function(t){var e=Object(r.objectMerge2)([],this.columns);e=this.sort(e),(t=t||e).forEach(function(i){"shipFromCityName"!==i.prop&&"shipToCityName"!==i.prop||i.slot||(i.slot=function(e){var t=(e.row[i.prop]||"").split(",");return t[2]||t[1]||t[0]||""})});var n=this.maxLen,i=function(e){var l=[];if(0<t.length){var s=0;t.forEach(function(e,t){if(e.hidden){var i=Object(r.objectMerge2)(e);i.key=t,l.push(i)}else s++;if(n<s){var a=Object(r.objectMerge2)(e);a.key=t,a.hidden=!0,l.push(a)}})}return l},a=function(e){var a=[];if(0<t.length){var l=0;t.forEach(function(e,t){if(!e.hidden&&l<n){l++;var i=Object(r.objectMerge2)(e);i.hidden=!1,i.key=t,a.push(i)}})}return a},l=i().length,s=a().length;this.orgColumnData=i(),this.columnData=i(),this.orgShowColumnData=a(),this.showColumnData=a(),this.leftListLen=l,this.rightListLen=s,this.columnListLen=t.length},sort:function(e){var t=[],i=[];return e.forEach(function(e){e.fixed?t.push(e):i.push(e)}),t.concat(i)},doAction:function(e){switch(e){case"goRight":this.goRight();break;case"goLeft":this.goLeft()}},fetchFail:function(){this.thecode="",this.convertData()},fetchTableSetup:function(){var n=this;return Object(c.i)(this.otherinfo.orgid,this.thecode).then(function(e){var t=e.data;if((n.orgdata=t)&&t.length){if(1===t.length&&(t=t[0]),t.length<=1)return console.log("后台返回表格数据异常:",t),n.fetchFail(),!1;n.orgdata=t;var l=[],s=n.columns.length;t.sort(function(e,t){return e.titleOrder>t.titleOrder?1:-1}),t.forEach(function(e){var t=o()({},e);t.label=t.label||t.lable;for(var i=0;i<s;i++)if(n.columns[i].prop===e.prop){for(var a in n.columns[i])void 0!==t[a]&&null!==t[a]||(t[a]=n.columns[i][a]);break}l.push(t)}),n.columns.forEach(function(t){0===l.filter(function(e){return e.prop===t.prop}).length&&(console.log("本地项，需要后台添加：",t),l.push(t))}),l=n.sort(l),n.convertData(l)}else n.fetchFail()}).catch(function(e){n.fetchFail()})},changeTbaleSetup:function(){var t=this;if(this.thecode)return Object(c.q)(this.otherinfo.orgid,this.thecode,this.formatColumn(this.showColumnData)).then(function(e){t.$message.info("保存成功")}).catch(function(e){t._handlerCatchMsg(e)})},formatColumn:function(e){var s=this.orgdata,n=[],o=0;return e.forEach(function(t){var e=s.filter(function(e){return e.prop===t.prop});if(e.length){var i={},a=e[0];for(var l in a)i[l]=t[l];i.hidden=!1,i.titleOrder=++o,n.push(i)}}),this.columnData.forEach(function(t){var e=s.filter(function(e){return e.prop===t.prop});if(e.length){var i={},a=e[0];for(var l in a)i[l]=t[l];i.hidden=!0,i.titleOrder=++o,n.push(i)}}),n},checkRightLen:function(){this.showColumnData.length>this.maxLen?(this.$message({type:"warning",message:"列表最多只能显示"+this.maxLen+"个字段。"}),this.isCheck=!0):this.isCheck=!1},canDragStart:function(e){},setChangeData:function(){this.reRenderData()},reRenderData:function(){var e=Object(r.objectMerge2)([],this.showColumnData);this.showColumnData=this.sort(e)},setColumnLen:function(){this.leftListLen=this.columnData.length,this.rightListLen=this.showColumnData.length},handChangeAllLeft:function(e){this.checkListLeft=e?o()([],this.columnData):[],this.leftCheckLen=this.checkListLeft.length,this.isIndeterminateLeft=!1},handChangeAllRight:function(e){this.checkListRight=e?o()([],this.showColumnData):[],this.rightCheckLen=this.checkListRight.length,this.isIndeterminateRight=!1},goRight:function(){var t=this;if(this.checkListLeft.length+this.rightListLen>this.maxLen||this.rightListLen>this.maxLen-1)return this.$message({type:"warning",message:"列表最多只能显示"+this.maxLen+"个字段。"}),!1;this.columnData=this.columnData.filter(function(e){return-1===t.checkListLeft.indexOf(e)||(e.fixed=!1,t.showColumnData.push(e),!1)}),this.orgColumnData=this.orgColumnData.filter(function(e){return-1===t.checkListLeft.indexOf(e)||(e.fixed=!1,t.orgShowColumnData.push(e),!1)}),this.checkListLeft=[],this.setColumnLen(),this.leftCheckLen=0,this.reRenderData()},goLeft:function(){var a=this;this.checkListRight.forEach(function(e,t){a.columnData.push(e),a.orgColumnData.push(e);var i=a.showColumnData.indexOf(e);-1!==i&&a.showColumnData.splice(i,1),-1!==a.orgShowColumnData.indexOf(e)&&a.orgShowColumnData.splice(i,1)}),this.checkListRight=[],this.setColumnLen(),this.rightCheckLen=0,this.reRenderData()},dbCheckItemLeft:function(e,t,i){if(this.rightListLen>this.maxLen-1)return this.$message({type:"warning",message:"列表最多只能显示"+this.maxLen+"个字段。"}),!1;e.fixed=!1,this.showColumnData.push(e),this.orgShowColumnData.push(e),this.columnData.splice(t,1),this.orgColumnData.splice(t,1),this.setColumnLen(),this.reRenderData()},dbCheckItemRight:function(e,t,i){this.columnData.push(e),this.orgColumnData.push(e),this.showColumnData.splice(t,1),this.orgShowColumnData.splice(t,1),this.setColumnLen(),this.reRenderData()},handleCheckChangeLeft:function(e){this.leftCheckLen=e.length},handleCheckChangeRight:function(e){this.rightCheckLen=e.length},querySearchLeft:function(e,t){void 0===(this.searchLeft=e).label&&(this.searchLeft||(this.columnData=o()([],this.orgColumnData)));var i=o()([],this.orgColumnData);t(e?i.filter(this.createFilter(e)):i)},querySearchRight:function(e,t){void 0===(this.searchRight=e).label&&(this.searchRight||(this.showColumnData=o()([],this.orgShowColumnData)));var i=o()([],this.orgShowColumnData);t(e?i.filter(this.createFilter(e)):i)},createFilter:function(t){return function(e){return 0===e.label.toLowerCase().indexOf(t.toLowerCase())}},handleSearchLeft:function(e){var t=this;this.searchLeft=e?e.label:"";var i=o()([],this.columnData);i.forEach(function(e){e.label===t.searchLeft&&(i=[]).push(e)}),this.columnData=o()([],i),i=[]},handleSearchRight:function(e){var t=this;this.searchRight=e?e.label:"";var i=o()([],this.showColumnData);i.forEach(function(e){e.label===t.searchRight&&(i=[]).push(e)}),this.showColumnData=o()([],i),i=[]},closeMe:function(e){this.$emit("close"),"function"==typeof e&&e()},handleChange:function(e,t,i){this.rightList=o()([],e)},handleSwitch:function(e,t){e.fixed=!e.fixed,this.reRenderData()},callback:function(){var e=o()([],this.showColumnData);e.forEach(function(e){!e.label&&e.lable&&(e.label=e.lable)}),this.$emit("success",e),this.listKey=Math.random(),this.closeMe()},submitForm:function(){var t=this;this.thecode?this.changeTbaleSetup().then(function(e){t.callback()}):this.callback()}}}},MXEa:function(e,t){},QcgQ:function(e,t,i){"use strict";var a={render:function(){var a=this,e=a.$createElement,l=a._self._c||e;return l("el-dialog",{staticClass:"tms_dialog",attrs:{title:"表格设置",visible:a.isShow,"append-to-body":"","close-on-click-modal":!1,"before-close":a.closeMe},on:{"update:visible":function(e){a.isShow=e}}},[l("div",{staticClass:"tableSetup_warp"},[l("div",{staticClass:"tableSetup_list"},[l("div",{staticClass:"tableSetup_head"},[l("div",{staticClass:"tableSetup_head_select"},[a._v("选择："+a._s(a.leftCheckLen))]),a._v(" "),l("el-checkbox",{attrs:{indeterminate:a.isIndeterminateLeft},on:{change:a.handChangeAllLeft},model:{value:a.checkAllLeft,callback:function(e){a.checkAllLeft=e},expression:"checkAllLeft"}},[a._v("隐藏列  "+a._s(a.leftListLen)+" / "+a._s(a.columnListLen))]),a._v(" "),l("div",{staticStyle:{margin:"3px 0"}},[l("el-autocomplete",{staticClass:"inline-input",attrs:{"fetch-suggestions":a.querySearchLeft,placeholder:"请输入内容",size:"mini"},on:{select:a.handleSearchLeft},scopedSlots:a._u([{key:"default",fn:function(e){var t=e.item;return[l("span",[a._v(a._s(t.label))])]}}]),model:{value:a.searchLeft,callback:function(e){a.searchLeft=e},expression:"searchLeft"}},[l("i",{staticClass:"el-icon-search el-input__icon",attrs:{slot:"suffix"},slot:"suffix"})])],1)],1),a._v(" "),l("div",{staticClass:"tableSetup_content"},[l("el-checkbox-group",{on:{change:a.handleCheckChangeLeft},model:{value:a.checkListLeft,callback:function(e){a.checkListLeft=e},expression:"checkListLeft"}},[l("transition-group",{key:a.listKey,attrs:{name:"el-zoom-in-center"}},a._l(a.columnData,function(t,i){return l("div",{key:i,staticClass:"tableSetup_item",on:{dblclick:function(e){a.dbCheckItemLeft(t,i,e)}}},[l("el-checkbox",{attrs:{label:t}},[a._v("\n                "+a._s(t.label)+"\n              ")])],1)}))],1)],1),a._v(" "),l("div",{staticClass:"tableSetup_tips"},[l("span",[a._v("双击，可快速左右切换。")])])]),a._v(" "),l("div",{staticClass:"tableSetup_btn"},[l("el-button",{attrs:{type:"primary",icon:"el-icon-arrow-right"},on:{click:function(e){a.doAction("goRight")}}}),a._v(" "),l("br"),a._v(" "),l("el-button",{attrs:{type:"primary",icon:"el-icon-arrow-left"},on:{click:function(e){a.doAction("goLeft")}}})],1),a._v(" "),l("div",{staticClass:"tableSetup_list"},[l("div",{staticClass:"tableSetup_head"},[l("div",{staticClass:"tableSetup_head_select"},[a._v("选择："+a._s(a.rightCheckLen))]),a._v(" "),l("el-checkbox",{attrs:{indeterminate:a.isIndeterminateRight},on:{change:a.handChangeAllRight},model:{value:a.checkAllRight,callback:function(e){a.checkAllRight=e},expression:"checkAllRight"}},[a._v("显示列 "+a._s(a.rightListLen)+" / "+a._s(a.columnListLen))]),a._v(" "),l("div",{staticStyle:{margin:"3px 0"}},[l("el-autocomplete",{staticClass:"inline-input",attrs:{"fetch-suggestions":a.querySearchRight,placeholder:"请输入内容",size:"mini"},on:{select:a.handleSearchRight},scopedSlots:a._u([{key:"default",fn:function(e){var t=e.item;return[l("span",[a._v(a._s(t.label))])]}}]),model:{value:a.searchRight,callback:function(e){a.searchRight=e},expression:"searchRight"}},[l("i",{staticClass:"el-icon-search el-input__icon",attrs:{slot:"suffix"},slot:"suffix"})])],1)],1),a._v(" "),l("div",{staticClass:"tableSetup_content"},[l("el-checkbox-group",{on:{change:a.handleCheckChangeRight},model:{value:a.checkListRight,callback:function(e){a.checkListRight=e},expression:"checkListRight"}},[l("draggable",{staticClass:"dragArea",attrs:{move:a.canDragStart,list:a.showColumnData},on:{change:a.setChangeData}},[l("transition-group",{attrs:{name:"el-zoom-in-center"}},a._l(a.showColumnData,function(t,i){return l("div",{key:i,staticClass:"tableSetup_item",on:{dblclick:function(e){a.dbCheckItemRight(t,i,e)}}},[l("el-checkbox",{attrs:{label:t}},[a._v("\n                  "+a._s(t.label)+"\n                ")]),a._v(" "),l("el-switch",{attrs:{value:t.fixed,"active-text":t.fixed?"固定":"活动"},on:{change:function(e){a.handleSwitch(t,i)}}})],1)}))],1)],1)],1),a._v(" "),l("div",{staticClass:"tableSetup_tips"},[l("span",[a._v("拖拽，可调整上下顺序。")]),a._v(" "),l("br"),l("span",[a._v("列表最多只能显示"+a._s(a.maxLen)+"个字段。")])])])]),a._v(" "),l("div",{attrs:{slot:"footer"},slot:"footer"},[l("el-button",{attrs:{type:"primary"},on:{click:function(e){a.submitForm()}}},[a._v("确 定")]),a._v(" "),l("el-button",{on:{click:a.closeMe}},[a._v("取 消")])],1)])},staticRenderFns:[]};t.a=a},SNy4:function(e,t,i){"use strict";var a=i("puNT"),l=i("Mqi+");t.a={components:{TableSetup:a.a},data:function(){return{repertoryArr:[{shipSn:"234234234",shipStatusName:"已发货",shipIdentifying:"控"},{shipSn:"19082334",shipStatusName:"已发货",shipIdentifying:"控"}],setupTableVisible:!1,tablekey:0,tableColumn:[{label:"运单号",prop:"shipSn",width:"150",fixed:!0},{label:"运单状态",prop:"shipStatusName",width:"150",fixed:!1},{label:"运单标识",prop:"shipIdentifying",width:"150",fixed:!1,slot:function(e){return Object(l.b)(e.row.shipIdentifying)}},{label:"入库时间",prop:"repertoryCreateTime",width:"180",fixed:!1},{label:"库存时长",prop:"hashours",width:"150",fixed:!1},{label:"开单网点",prop:"fromOrgName",width:"150",fixed:!1},{label:"开单时间",prop:"createTime",width:"180",fixed:!1},{label:"货品名",prop:"cargoName",width:"150",fixed:!1},{label:"库存件数",prop:"repertoryAmount",width:"150",fixed:!1},{label:"库存重量",prop:"repertoryWeight",width:"150",fixed:!1},{label:"库存体积",prop:"repertoryVolume",width:"150",fixed:!1},{label:"运单件数",prop:"cargoAmount",width:"150",fixed:!1},{label:"运单重量",prop:"cargoWeight",width:"150",fixed:!1},{label:"运单体积",prop:"cargoVolume",width:"150",fixed:!1},{label:"出发城市",prop:"shipFromCityName",width:"150",fixed:!1},{label:"到达城市",prop:"shipToCityName",width:"150",fixed:!1},{label:"发货人",prop:"senderCustomerName",width:"150",fixed:!1},{label:"发货人电话",prop:"receiverCustomerMobile",width:"150",fixed:!1},{label:"收货人",prop:"receiverCustomerName",width:"150",fixed:!1},{label:"收货人电话",prop:"receiverCustomerMobile",width:"150",fixed:!1},{label:"交接方式",prop:"shipDeliveryMethodName",width:"150",fixed:!1},{label:"运费",prop:"shipTotalFee",width:"150",fixed:!1},{label:"提货费",prop:"pickupFee",width:"150",fixed:!1},{label:"回扣",prop:"brokerageFee",width:"150",fixed:!1},{label:"保险费",prop:"insuranceFee",width:"150",fixed:!1},{label:"声明价值",prop:"productPrice",width:"150",fixed:!1},{label:"包装费",prop:"packageFee",width:"150",fixed:!1},{label:"送货费",prop:"deliveryFee",width:"150",fixed:!1},{label:"运费合计",prop:"shipTotalFee",width:"150",fixed:!1},{label:"付款方式",prop:"shipPayWayName",width:"150",fixed:!1},{label:"现付",prop:"shipNowpayFee",width:"150",fixed:!1},{label:"到付",prop:"shipArrivepayFee",width:"150",fixed:!1},{label:"回单付",prop:"shipReceiptpayFee",width:"150",fixed:!1},{label:"月结",prop:"shipMonthpayFee",width:"150",fixed:!1},{label:"备注",prop:"shipRemarks",width:"150",fixed:!1},{label:"发货方",prop:"senderCustomerUnit",width:"150",fixed:!1},{label:"发货地址",prop:"senderDetailedAddress",width:"150",fixed:!1},{label:"收货方",prop:"receiverCustomerUnit",width:"150",fixed:!1},{label:"收货地址",prop:"receiverDetailedAddress",width:"150",fixed:!1},{label:"货号",prop:"shipGoodsSn",width:"150",fixed:!1},{label:"品种规格",prop:"description",width:"150",fixed:!1},{label:"件数单价",prop:"amountFee",width:"150",fixed:!1},{label:"重量单价",prop:"weightFee",width:"150",fixed:!1},{label:"体积单价",prop:"volumeFee",width:"150",fixed:!1},{label:"回单号",prop:"shipReceiptSn",width:"150",fixed:!1},{label:"回单要求",prop:"shipReceiptRequireName",width:"150",fixed:!1},{label:"回单份数",prop:"shipReceiptNum",width:"150",fixed:!1},{label:"代收货款",prop:"agencyFund",width:"150",fixed:!1},{label:"代收款手续费",prop:"commissionFee",width:"150",fixed:!1},{label:"制单人",prop:"userName",width:"150"},{label:"客户单号",prop:"shipCustomerNumber",width:"150",fixed:!1},{label:"运输方式",prop:"shipShippingTypeName",width:"150",fixed:!1},{label:"业务类型",prop:"shipBusinessType",width:"150",fixed:!1},{label:"是时效",prop:"shipEffectiveName",width:"150",fixed:!1},{label:"上楼费",prop:"goupstairsFee",width:"150",fixed:!1},{label:"叉车费",prop:"forkliftFee",width:"150",fixed:!1},{label:"装卸费",prop:"handlingFee",width:"150",fixed:!1},{label:"入仓费",prop:"housingFee",width:"150",fixed:!1}],htmlMessage1:'<el-button type="primary" :size="btnsize" icon="el-icon-setting" plain @click="setTable" class="table_setup">表格设置</el-button>',htmlMessage2:'<el-table ref="multipleTable" :data="repertoryArr" border :key="tablekey" style="width:100%;" :default-sort="{prop: "id", order: "ascending"}" stripe><el-table-column fixed sortable type="selection" width="50"></el-table-column><template v-for="column in tableColumn"><el-table-column :key="column.id" :fixed="column.fixed" sortable :label="column.label" :prop="column.prop" v-if="!column.slot" :width="column.width"></el-table-column><el-table-column :key="column.id" :fixed="column.fixed" sortable :label="column.label" v-else :width="column.width"><template slot-scope="scope"><span class="clickitem" v-if="column.click" v-html="column.slot(scope)" @click.stop="column.click(scope)"></span><span v-else v-html="column.slot(scope)"></span></template></el-table-column></template></el-table>',htmlMessage3:' <TableSetup :popVisible="setupTableVisible" :columns="tableColumn" @close="closeSetupTable" @success="setColumn"></TableSetup>'}},methods:{setTable:function(){this.setupTableVisible=!0},closeSetupTable:function(){this.setupTableVisible=!1},setColumn:function(e){this.tableColumn=e,this.tablekey=Math.random()},clipboardSuccess:function(){this.$message({message:"复制成功",type:"success",duration:1500})}}}},puNT:function(e,t,i){"use strict";var a=i("IAIf"),l=i("QcgQ");var s=function(e){i("MXEa")},n=i("VU/8")(a.a,l.a,s,null,null);t.a=n.exports},"r+1A":function(e,t){}});