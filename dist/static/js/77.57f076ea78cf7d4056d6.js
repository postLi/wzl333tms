webpackJsonp([77,181],{"/67x":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i("djiy"),n=i("ycBC"),s=i("VU/8")(a.a,n.a,null,null,null);e.default=s.exports},"1onU":function(t,e,i){"use strict";var a=i("VT+v"),n=i("SgVa");var s=function(t){i("FiTa"),i("7CJ8")},o=i("VU/8")(a.a,n.a,s,"data-v-4b7ed4df",null);e.a=o.exports},"7CJ8":function(t,e){},"8UOW":function(t,e,i){"use strict";var a=i("us2a"),n=i("fyBF");var s=function(t){i("Qhr/")},o=i("VU/8")(a.a,n.a,s,null,null);e.a=o.exports},FiTa:function(t,e){},IAIf:function(t,e,i){"use strict";var a=i("woOf"),r=i.n(a),n=i("DAYN"),s=i.n(n),c=i("0xDb"),l=i("t5DY");e.a={props:{popVisible:{type:Boolean,default:!1},columns:{type:Array,default:[]},code:{type:String,default:""}},components:{draggable:s.a},computed:{isShow:{get:function(){return this.popVisible},set:function(){}}},data:function(){return{orgColumnData:[],columnData:[],orgShowColumnData:[],showColumnData:[],list:[],rightList:[],listKey:0,isIndeterminateLeft:!0,isIndeterminateRight:!0,checkAllLeft:!1,checkAllRight:!1,checkListLeft:[],checkListRight:[],searchLeft:"",searchRight:"",leftListLen:0,rightListLen:0,columnListLen:0,isCheck:!0,maxLen:50,rightCheckLen:0,leftCheckLen:0,thecode:""}},mounted:function(){var a=this,t=this.code;this.$route.meta.code;"NOSET"===t?this.convertData():t?this.thecode=t:this.convertData(),this.thecode&&(this.fetchTableSetup(),this.eventBus.$on("tablesetup.change",function(t,e){if(t&&t===a.thecode){var i=a.showColumnData.filter(function(t){return t.prop===e.prop});i.length&&(i[0].width=e.width,a.changeTbaleSetup())}}))},methods:{convertData:function(t){this.initData(t),this.callback()},initData:function(e){e=e||this.columns;var o=this.maxLen,t=function(t){var n=[];if(0<e.length){var s=0;e.forEach(function(t,e){if(t.hidden){var i=Object(c.objectMerge2)(t);i.key=e,n.push(i)}else s++;if(o<s){var a=Object(c.objectMerge2)(t);a.key=e,a.hidden=!0,n.push(a)}})}return n},i=function(t){var a=[];if(0<e.length){var n=0;e.forEach(function(t,e){if(!t.hidden&&n<o){n++;var i=Object(c.objectMerge2)(t);i.hidden=!1,i.key=e,a.push(i)}})}return a},a=t().length,n=i().length;this.orgColumnData=t(),this.columnData=t(),this.orgShowColumnData=i(),this.showColumnData=i(),this.leftListLen=a,this.rightListLen=n,this.columnListLen=e.length},sort:function(t){return t.sort(function(t,e){return t.key-e.key})},doAction:function(t){switch(t){case"goRight":this.goRight();break;case"goLeft":this.goLeft()}},fetchFail:function(){this.thecode="",this.convertData()},fetchTableSetup:function(){var o=this;return Object(l.g)(this.otherinfo.orgid,this.thecode).then(function(t){var e=t.data;if((o.orgdata=e)&&e.length){1===e.length&&(e=e[0]),o.orgdata=e;var n=[],s=o.columns.length;e.sort(function(t,e){return t.titleOrder>e.titleOrder?1:-1}),e.forEach(function(t){t.label=t.label||t.lable;for(var e=r()({},t),i=0;i<s;i++)if(o.columns[i].prop===t.prop){for(var a in o.columns[i])void 0!==e[a]&&null!==e[a]||(e[a]=o.columns[i][a]);break}n.push(e)}),o.columns.forEach(function(e){0===n.filter(function(t){return t.prop===e.prop}).length&&n.push(e)}),n.sort(function(t,e){return t.fixed?-1:0}),o.convertData(n)}else o.fetchFail()}).catch(function(t){o.fetchFail()})},changeTbaleSetup:function(){var e=this;if(this.thecode)return Object(l.n)(this.otherinfo.orgid,this.thecode,this.formatColumn(this.showColumnData)).then(function(t){e.$message.info("保存成功")}).catch(function(t){e._handlerCatchMsg(t)})},formatColumn:function(t){var s=this.orgdata,o=[],r=0;return t.forEach(function(e){var t=s.filter(function(t){return t.prop===e.prop});if(t.length){var i={},a=t[0];for(var n in a)i[n]=e[n];i.hidden=!1,i.titleOrder=++r,o.push(i)}}),this.columnData.forEach(function(e){var t=s.filter(function(t){return t.prop===e.prop});if(t.length){var i={},a=t[0];for(var n in a)i[n]=e[n];i.hidden=!0,i.titleOrder=++r,o.push(i)}}),o},checkRightLen:function(){this.showColumnData.length>this.maxLen?(this.$message({type:"warning",message:"列表最多只能显示"+this.maxLen+"个字段。"}),this.isCheck=!0):this.isCheck=!1},canDragStart:function(t){},setColumnLen:function(){this.leftListLen=this.columnData.length,this.rightListLen=this.showColumnData.length},handChangeAllLeft:function(t){this.checkListLeft=t?r()([],this.columnData):[],this.leftCheckLen=this.checkListLeft.length,this.isIndeterminateLeft=!1},handChangeAllRight:function(t){this.checkListRight=t?r()([],this.showColumnData):[],this.rightCheckLen=this.checkListRight.length,this.isIndeterminateRight=!1},goRight:function(){var e=this;if(this.checkListLeft.length+this.rightListLen>this.maxLen||this.rightListLen>this.maxLen-1)return this.$message({type:"warning",message:"列表最多只能显示"+this.maxLen+"个字段。"}),!1;this.columnData=this.columnData.filter(function(t){return-1===e.checkListLeft.indexOf(t)||(e.showColumnData.push(t),!1)}),this.orgColumnData=this.orgColumnData.filter(function(t){return-1===e.checkListLeft.indexOf(t)||(e.orgShowColumnData.push(t),!1)}),this.checkListLeft=[],this.setColumnLen(),this.leftCheckLen=0},goLeft:function(){var a=this;this.checkListRight.forEach(function(t,e){a.columnData.push(t),a.orgColumnData.push(t);var i=a.showColumnData.indexOf(t);-1!==i&&a.showColumnData.splice(i,1),-1!==a.orgShowColumnData.indexOf(t)&&a.orgShowColumnData.splice(i,1)}),this.sort(this.columnData),this.checkListRight=[],this.setColumnLen(),this.rightCheckLen=0},dbCheckItemLeft:function(t,e,i){if(this.rightListLen>this.maxLen-1)return this.$message({type:"warning",message:"列表最多只能显示"+this.maxLen+"个字段。"}),!1;this.showColumnData.push(t),this.orgShowColumnData.push(t),this.columnData.splice(e,1),this.orgColumnData.splice(e,1),this.setColumnLen()},dbCheckItemRight:function(t,e,i){this.columnData.push(t),this.orgColumnData.push(t),this.showColumnData.splice(e,1),this.orgShowColumnData.splice(e,1),this.setColumnLen(),this.sort(this.columnData)},handleCheckChangeLeft:function(t){this.leftCheckLen=t.length},handleCheckChangeRight:function(t){this.rightCheckLen=t.length},querySearchLeft:function(t,e){void 0===(this.searchLeft=t).label&&(this.searchLeft||(this.columnData=r()([],this.orgColumnData)));var i=r()([],this.orgColumnData);e(t?i.filter(this.createFilter(t)):i)},querySearchRight:function(t,e){void 0===(this.searchRight=t).label&&(this.searchRight||(this.showColumnData=r()([],this.orgShowColumnData)));var i=r()([],this.orgShowColumnData);e(t?i.filter(this.createFilter(t)):i)},createFilter:function(e){return function(t){return 0===t.label.toLowerCase().indexOf(e.toLowerCase())}},handleSearchLeft:function(t){var e=this;this.searchLeft=t?t.label:"";var i=r()([],this.columnData);i.forEach(function(t){t.label===e.searchLeft&&(i=[]).push(t)}),this.columnData=r()([],i),i=[]},handleSearchRight:function(t){var e=this;this.searchRight=t?t.label:"";var i=r()([],this.showColumnData);i.forEach(function(t){t.label===e.searchRight&&(i=[]).push(t)}),this.showColumnData=r()([],i),i=[]},closeMe:function(t){this.$emit("close"),"function"==typeof t&&t()},handleChange:function(t,e,i){this.rightList=r()([],t)},handleSwitch:function(t,e){console.log("handleSwitch",t);var i=0,a=!1;this.showColumnData.forEach(function(t,e){t.fixed&&!a?i=e:a=!0}),t.fixed?(this.showColumnData.splice(e,1),this.showColumnData.splice(i,0,t),t.fixed=!1):(console.log("find:",i,e),this.showColumnData.splice(i+1,0,t),this.showColumnData.splice(e+1,1),t.fixed=!0)},callback:function(){var t=r()([],this.showColumnData);t.forEach(function(t){!t.label&&t.lable&&(t.label=t.lable)}),this.$emit("success",t),this.listKey=Math.random(),this.closeMe()},submitForm:function(){var e=this;this.thecode?this.changeTbaleSetup().then(function(t){e.callback()}):this.callback()}}}},JMwQ:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i("Vv2p"),n=i("khpt"),s=i("VU/8")(a.a,n.a,null,null,null);e.default=s.exports},JW1v:function(t,e,i){"use strict";e.e=function(t){return a.b.post("/api-finance/finance/tmsfinancefeepayable/v1/findListByFeeType/",t).then(function(t){return t.data||{list:[],totalCount:0}}).catch(function(t){Object(n.handleErrorMsg)(t)})},e.f=function(t){return a.b.post("/api-finance/finance/tmsfinancefeepayable/v1/findTransferList/",t).then(function(t){return t.data||{list:[],totalCount:0}}).catch(function(t){Object(n.handleErrorMsg)(t)})},e.c=function(t){return a.b.post("/api-finance/finance/tmsfinancefeepayable/v1/findAbnormalList/",t).then(function(t){return t.data||{list:[],totalCount:0}}).catch(function(t){Object(n.handleErrorMsg)(t)})},e.d=function(t){return a.b.post("/api-finance/finance/tmsfinancefeepayable/v1/findChangeList/",t).then(function(t){return t.data||{list:[],totalCount:0}}).catch(function(t){Object(n.handleErrorMsg)(t)})},e.b=function(t,e){return a.b.post("/api-finance/finance/tmsfinancefeepayable/v1/create/"+t,e).then(function(t){return t.data}).catch(function(t){Object(n.handleErrorMsg)(t)})},e.i=function(t){return a.b.post("/api-finance/finance/tmsfinancefeepayable/v1/payListBySummary/",t).then(function(t){return t.data||{list:[],totalCount:0}}).catch(function(t){Object(n.handleErrorMsg)(t)})},e.h=function(t){return a.b.post("/api-finance/finance/tmsfinancefeepayable/v1/payListByOne/",t).then(function(t){return t.data||{list:[],totalCount:0}}).catch(function(t){Object(n.handleErrorMsg)(t)})},e.a=function(t,e){return a.b.get("/api-finance/finance/tmsfinancecapitalflow/v1/getFeeInfo/?orgId="+t+"&paymentsType="+e)},e.g=function(t){return a.b.post("/api-finance/finance/tmsfinancefeepayable/v1/loadSettlement/",t).then(function(t){return t.data}).catch(function(t){Object(n.handleErrorMsg)(t)})};var a=i("Vo7i"),n=i("0xDb")},MXEa:function(t,e){},QcgQ:function(t,e,i){"use strict";var a={render:function(){var a=this,t=a.$createElement,n=a._self._c||t;return n("el-dialog",{staticClass:"tms_dialog",attrs:{title:"表格设置",visible:a.isShow,"append-to-body":"","close-on-click-modal":!1,"before-close":a.closeMe},on:{"update:visible":function(t){a.isShow=t}}},[n("div",{staticClass:"tableSetup_warp"},[n("div",{staticClass:"tableSetup_list"},[n("div",{staticClass:"tableSetup_head"},[n("div",{staticClass:"tableSetup_head_select"},[a._v("选择："+a._s(a.leftCheckLen))]),a._v(" "),n("el-checkbox",{attrs:{indeterminate:a.isIndeterminateLeft},on:{change:a.handChangeAllLeft},model:{value:a.checkAllLeft,callback:function(t){a.checkAllLeft=t},expression:"checkAllLeft"}},[a._v("隐藏列  "+a._s(a.leftListLen)+" / "+a._s(a.columnListLen))]),a._v(" "),n("div",{staticStyle:{margin:"3px 0"}},[n("el-autocomplete",{staticClass:"inline-input",attrs:{"fetch-suggestions":a.querySearchLeft,placeholder:"请输入内容",size:"mini"},on:{select:a.handleSearchLeft},scopedSlots:a._u([{key:"default",fn:function(t){var e=t.item;return[n("span",[a._v(a._s(e.label))])]}}]),model:{value:a.searchLeft,callback:function(t){a.searchLeft=t},expression:"searchLeft"}},[n("i",{staticClass:"el-icon-search el-input__icon",attrs:{slot:"suffix"},slot:"suffix"})])],1)],1),a._v(" "),n("div",{staticClass:"tableSetup_content"},[n("el-checkbox-group",{on:{change:a.handleCheckChangeLeft},model:{value:a.checkListLeft,callback:function(t){a.checkListLeft=t},expression:"checkListLeft"}},[n("transition-group",{key:a.listKey,attrs:{name:"el-zoom-in-center"}},a._l(a.columnData,function(e,i){return n("div",{key:i,staticClass:"tableSetup_item",on:{dblclick:function(t){a.dbCheckItemLeft(e,i,t)}}},[n("el-checkbox",{attrs:{label:e}},[a._v("\n                "+a._s(e.label)+"\n              ")])],1)}))],1)],1),a._v(" "),n("div",{staticClass:"tableSetup_tips"},[n("span",[a._v("双击，可快速左右切换。")])])]),a._v(" "),n("div",{staticClass:"tableSetup_btn"},[n("el-button",{attrs:{type:"primary",icon:"el-icon-arrow-right"},on:{click:function(t){a.doAction("goRight")}}}),a._v(" "),n("br"),a._v(" "),n("el-button",{attrs:{type:"primary",icon:"el-icon-arrow-left"},on:{click:function(t){a.doAction("goLeft")}}})],1),a._v(" "),n("div",{staticClass:"tableSetup_list"},[n("div",{staticClass:"tableSetup_head"},[n("div",{staticClass:"tableSetup_head_select"},[a._v("选择："+a._s(a.rightCheckLen))]),a._v(" "),n("el-checkbox",{attrs:{indeterminate:a.isIndeterminateRight},on:{change:a.handChangeAllRight},model:{value:a.checkAllRight,callback:function(t){a.checkAllRight=t},expression:"checkAllRight"}},[a._v("显示列 "+a._s(a.rightListLen)+" / "+a._s(a.columnListLen))]),a._v(" "),n("div",{staticStyle:{margin:"3px 0"}},[n("el-autocomplete",{staticClass:"inline-input",attrs:{"fetch-suggestions":a.querySearchRight,placeholder:"请输入内容",size:"mini"},on:{select:a.handleSearchRight},scopedSlots:a._u([{key:"default",fn:function(t){var e=t.item;return[n("span",[a._v(a._s(e.label))])]}}]),model:{value:a.searchRight,callback:function(t){a.searchRight=t},expression:"searchRight"}},[n("i",{staticClass:"el-icon-search el-input__icon",attrs:{slot:"suffix"},slot:"suffix"})])],1)],1),a._v(" "),n("div",{staticClass:"tableSetup_content"},[n("el-checkbox-group",{on:{change:a.handleCheckChangeRight},model:{value:a.checkListRight,callback:function(t){a.checkListRight=t},expression:"checkListRight"}},[n("draggable",{staticClass:"dragArea",attrs:{move:a.canDragStart,list:a.showColumnData}},[n("transition-group",{attrs:{name:"el-zoom-in-center"}},a._l(a.showColumnData,function(e,i){return n("div",{key:i,staticClass:"tableSetup_item",on:{dblclick:function(t){a.dbCheckItemRight(e,i,t)}}},[n("el-checkbox",{attrs:{label:e}},[a._v("\n                  "+a._s(e.label)+"\n                ")]),a._v(" "),n("el-switch",{attrs:{value:e.fixed,"active-text":e.fixed?"固定":"活动"},on:{change:function(t){a.handleSwitch(e,i)}}})],1)}))],1)],1)],1),a._v(" "),n("div",{staticClass:"tableSetup_tips"},[n("span",[a._v("拖拽，可调整上下顺序。")]),a._v(" "),n("br"),n("span",[a._v("列表最多只能显示"+a._s(a.maxLen)+"个字段。")])])])]),a._v(" "),n("div",{attrs:{slot:"footer"},slot:"footer"},[n("el-button",{attrs:{type:"primary"},on:{click:function(t){a.submitForm()}}},[a._v("确 定")]),a._v(" "),n("el-button",{on:{click:a.closeMe}},[a._v("取 消")])],1)])},staticRenderFns:[]};e.a=a},"Qhr/":function(t,e){},SgVa:function(t,e,i){"use strict";var a={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"tms-pagenation"},[i("span",{staticClass:"page-num",class:{disabled:e.pageNum<=1},on:{click:function(t){e.jumpTo(1)}}},[i("span",{staticClass:"first-page"})]),i("span",{staticClass:"page-num",class:{disabled:e.pageNum<=1},on:{click:function(t){e.jumpTo(e.pageNum-1)}}},[i("span",{staticClass:"prev-page"})]),e._v(" "),i("span",{staticClass:"page-jumper"},[e._v("\n    第\n    "),i("el-input",{ref:"input",staticClass:"el-pagination__editor is-in-pagination",attrs:{min:1,max:e.pages,type:"number",disabled:e.pages<=1},on:{change:e.handleChange,focus:e.handleFocus,blur:e.handleBlur},nativeOn:{keydown:function(t){return e.handleKeyup(t)}},model:{value:e.inputval,callback:function(t){e.inputval="string"==typeof t?t.trim():t},expression:"inputval"}}),e._v(" 页\n  ")],1),e._v("\n  /共 "+e._s(e.pages)+" 页\n  "),i("span",{staticClass:"page-num",class:{disabled:e.pageNum===e.pages},on:{click:function(t){e.jumpTo(e.pageNum+1)}}},[i("span",{staticClass:"next-page"})]),e._v(" "),i("span",{staticClass:"page-num",class:{disabled:e.pageNum===e.pages},on:{click:function(t){e.jumpTo(e.pages)}}},[i("span",{staticClass:"last-page"})]),e._v(" "),i("span",{staticClass:"tms-pagination__sizes"},[i("el-select",{staticClass:"page-select",attrs:{placeholder:"请选择"},on:{change:e.sizesChange},model:{value:e.size,callback:function(t){e.size=t},expression:"size"}},e._l(e.sizes,function(t,e){return i("el-option",{key:e,attrs:{label:t,value:t}})}))],1)])},staticRenderFns:[]};e.a=a},SjYS:function(t,e,i){"use strict";var a=i("seR9"),n=i("msh6");var s=function(t){i("nl9Y")},o=i("VU/8")(a.a,n.a,s,null,null);e.a=o.exports},"VT+v":function(t,e,i){"use strict";e.a={props:{sizes:{type:Array,default:function(){return[100,200,300,400]}},total:{type:Number,default:0}},computed:{pages:function(){return Math.ceil(this.total/this.size)}},watch:{pageNum:function(){this.inputval=this.pageNum},size:function(){this.pageNum=1}},mounted:function(){this.size=this.sizes[0]},data:function(){return{pageNum:1,oldValue:0,inputval:1,oldNum:1,size:100}},methods:{handleFocus:function(t){this.oldValue=t.target.value},sizesChange:function(){this.pageNum=1,this.oldNum=this.pageNum,this.$emit("change",{pageNum:this.pageNum,pageSize:this.size})},changeEvent:function(){this.oldNum!==this.pageNum&&(this.oldNum=this.pageNum,this.$emit("change",{pageNum:this.pageNum,pageSize:this.size}))},handleCurrentChange:function(t){this.pageNum=t,this.changeEvent()},handleSizeChange:function(t){this.size=t,this.changeEvent()},handleChange:function(t){var e=parseInt(t,10);isNaN(e)?this.inputval=1:e<1?this.inputval=1:e>this.pages?this.inputval=this.pages:this.inputval=e},handleBlur:function(t){var e=t.target;this.handleChange(e.value),this.jumpTo(this.inputval)},handleKeyup:function(t){var e=t.keyCode,i=t.target;console.log("page keydown:",e,i),13===e&&this.oldValue&&i.value!==this.oldValue&&(this.handleChange(i.value),this.oldValue="")},jumpTo:function(t){t<1?this.pageNum=1:t>this.pages?this.pageNum=this.pages:this.pageNum=t,this.changeEvent()}}}},Vv2p:function(t,e,i){"use strict";var a=i("woOf"),n=i.n(a),s=i("E4LH"),o=i("o9X6"),r=i("pAQG"),c=i("0xDb"),l=i("8UOW");e.a={components:{SelectTree:o.a,querySelect:r.a,searchAll:l.a},props:{btnsize:{type:String,default:"mini"},orgid:{type:Number}},data:function(){return{searchAll:"1",searchObjs:{},searchForm:{orgid:"",ascriptionOrgid:"",status:"NOSETTLEMENT,PARTSETTLEMENT,ALLSETTLEMENT",truckIdNumber:"",dirverName:""},rules:{shipSn:[{validator:function(t,e,i){var a=s.a.ONLY_NUMBER;""!==e&&null!==e&&e&&void 0!==e?a.test(e)?i():i(new Error("请输入最多15位数字")):i()},tigger:"blur"}]},searchTime:[Object(c.parseTime)(new Date-5184e6),Object(c.parseTime)(new Date)],pickerOptions:{shortcuts:c.pickerOptions2}}},watch:{searchTime:function(t){t&&(this.$set(this.searchObjs,"loadStartTime",Object(c.parseTime)(this.searchTime[0],"{y}-{m}-{d} ")+"00:00:00"),this.$set(this.searchObjs,"loadEndTime",Object(c.parseTime)(this.searchTime[1],"{y}-{m}-{d} ")+"23:59:59"))},searchForm:{handler:function(t,e){this.searchObjs=n()({},t),this.searchTime&&(this.$set(this.searchObjs,"loadStartTime",Object(c.parseTime)(this.searchTime[0],"{y}-{m}-{d} ")+"00:00:00"),this.$set(this.searchObjs,"loadEndTime",Object(c.parseTime)(this.searchTime[1],"{y}-{m}-{d} ")+"23:59:59"))},deep:!0}},mounted:function(){this.searchForm.orgid=this.otherinfo.orgid,this.onSubmit()},methods:{getDataObj:function(t){this.searchTime=[t.loadStartTime,t.loadEndTime],this.searchForm=n()({},t),this.$emit("change",t)},onSubmit:function(){var t=n()({},this.searchForm);this.searchTime&&(this.$set(t,"loadStartTime",Object(c.parseTime)(this.searchTime[0],"{y}-{m}-{d} ")+"00:00:00"),this.$set(t,"loadEndTime",Object(c.parseTime)(this.searchTime[1],"{y}-{m}-{d} ")+"23:59:59")),this.$emit("change",t)},clearForm:function(t){var e=this;this.$nextTick(function(){e.searchForm=e.$options.data().searchForm,e.searchTime=e.$options.data().searchTime,e.$refs[t].resetFields(),e.searchForm.orgid=e.otherinfo.orgid,e.searchForm.ascriptionOrgid=e.otherinfo.orgid,e.searchAll="1",setTimeout(function(){e.searchAll=""},50)})}}}},bOdI:function(t,e,i){"use strict";e.__esModule=!0;var a,n=i("C4MV"),s=(a=n)&&a.__esModule?a:{default:a};e.default=function(t,e,i){return e in t?(0,s.default)(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}},djiy:function(t,e,i){"use strict";var a,n=i("bOdI"),s=i.n(n),o=i("mvHQ"),r=i.n(o),c=i("woOf"),l=i.n(c),h=i("Dd8w"),u=i.n(h),f=i("0xDb"),d=i("JMwQ"),p=i("1onU"),m=i("puNT"),g=i("JW1v"),b=i("NYxO"),v=i("UQm2");e.a={components:{SearchForm:d.default,Pager:p.a,TableSetup:m.a},computed:u()({},Object(b.b)(["otherinfo"])),data:function(){var i=this;return{btnsize:"mini",feeTypeId:18,searchQuery:{currentPage:1,pageSize:100,vo:{status:"NOSETTLEMENT,PARTSETTLEMENT,ALLSETTLEMENT"}},tablekey:0,total:0,dataList:[],selectedList:[],selectListBatchNos:[],loading:!0,setupTableVisible:!1,tableColumn:[{label:"序号",prop:"id",width:"50",fixed:!0,slot:function(t){return(i.searchQuery.currentPage-1)*i.searchQuery.pageSize+t.$index+1}},{label:"送货批次",prop:"batchNo",width:"130",fixed:!0},{label:"结算状态",prop:"statusName",width:"90",fixed:!1},{label:"发车网点",prop:"orgName",width:"120",fixed:!1},{label:"送货时间",prop:"loadTime",width:"160",fixed:!1,slot:function(t){return""+Object(f.parseTime)(t.row.loadTime,"{y}-{m}-{d} {h}:{i}:{s}")}},{label:"送货费",prop:"fee",width:"90",fixed:!1},{label:"已结送货费",prop:"paidFee",width:"100",fixed:!1,slot:function(t){var e=t.row;return i._setTextColor(e.fee,e.paidFee,e.unpaidFee,e.paidFee)}},{label:"未结送货费",prop:"unpaidFee",width:"100",fixed:!1,slot:function(t){var e=t.row;return i._setTextColor(e.fee,e.paidFee,e.unpaidFee,e.unpaidFee)}},{label:"车牌号",prop:"truckIdNumber",width:"100",fixed:!1},{label:"司机名称",prop:"dirverName",width:"100",fixed:!1},{label:"司机电话",prop:"dirverMobile",width:"110",fixed:!1},{label:"送货件数",prop:"loadAmountall",width:"90",fixed:!1},{label:"送货重量",prop:"loadWeightall",width:"90",fixed:!1},{label:"送货体积",prop:"loadVolumeall",width:"90",fixed:!1},{label:"备注",prop:"remark",width:"150",fixed:!1}]}},mounted:function(){this.fetchList()},methods:(a={getSearchParam:function(t){this.searchQuery.currentPage=this.$options.data().searchQuery.currentPage,this.searchQuery.pageSize=this.$options.data().searchQuery.pageSize,this.$set(this.searchQuery.vo,"feeTypeId",this.feeTypeId),this.searchQuery.vo=l()({},t),this.fetchList()},handlePageChange:function(t){this.searchQuery.currentPage=t.pageNum,this.searchQuery.pageSize=t.pageSize,this.fetchList()},fetchList:function(){var e=this;return this.$set(this.searchQuery.vo,"feeTypeId",this.feeTypeId),this.loading=!0,Object(g.h)(this.searchQuery).then(function(t){e.dataList=t.list,e.total=t.total,e.loading=!1}).catch(function(t){e.loading=!1,e._handlerCatchMsg(t)})},setTable:function(){},doAction:function(t){switch(t){case"count":this.count();break;case"export":Object(v.g)({data:this.dataList,columns:this.tableColumn,name:"车费结算-送货费-"+Object(f.parseTime)(new Date,"{y}{m}{d}{h}{i}{s}")});break;case"print":Object(v.d)({data:this.dataList,columns:this.tableColumn,name:"车费结算-送货费"})}},count:function(){var t=this,i=0;if(0!==this.selectedList.length&&Object(f.objectMerge2)([],this.selectedList).forEach(function(e){Object(f.objectMerge2)([],t.selectedList).forEach(function(t){console.log(e.ascriptionOrgid,t.ascriptionOrgid),e.ascriptionOrgid!==t.ascriptionOrgid&&i++})}),0<i)return i=0,this.$message({type:"warning",message:"不能同时结算两个不同的网点"}),!1;0!==this.selectedList.length&&this.$set(this.searchQuery.vo,"ascriptionOrgid",this.selectedList[0].ascriptionOrgid),this.$router.push({path:"../../accountsLoad",query:{tab:"送货费结算",currentPage:"batchDeliver",searchQuery:r()(this.searchQuery),selectListBatchNos:r()(this.selectListBatchNos)}})},clickDetails:function(t){this.$refs.multipleTable.toggleRowSelection(t)},getSelection:function(t){var i=this;this.selectListBatchNos=[],t.forEach(function(t,e){i.selectListBatchNos.push(t.batchNo)}),this.selectedList=t,console.log(this.selectListBatchNos)},showDetail:function(t){}},s()(a,"setTable",function(){this.setupTableVisible=!0}),s()(a,"closeSetupTable",function(){this.setupTableVisible=!1}),s()(a,"setColumn",function(t){this.tableColumn=t,this.tablekey=Math.random()}),a)}},fyBF:function(t,e,i){"use strict";var a={render:function(){var i=this,t=i.$createElement,a=i._self._c||t;return a("div",{staticClass:"searchAll_lyy"},[a("el-form-item",{staticClass:"zdycx",attrs:{label:"自定义查询"}},[a("el-select",{attrs:{filterable:"",placeholder:"请选择","filter-method":i.querySearchAsync,"popper-class":"zdycx-pop",loading:i.loading},on:{change:i.handleSelect,focus:i.initdata},model:{value:i.datalist,callback:function(t){i.datalist=t},expression:"datalist"}},i._l(i.options4,function(e,t){return a("el-option",{key:t,attrs:{label:e.queryKey,value:e.id}},[i._v("\r\n        "+i._s(e.queryKey)+" "),a("i",{staticClass:"el-icon-circle-close-outline",on:{click:function(t){t.stopPropagation(),t.preventDefault(),i.deleteItem(e.id)}}})])})),i._v(" "),a("el-button",{attrs:{plain:""},on:{click:i.Custom}},[i._v("保存自定义")])],1),i._v(" "),a("addSave",{attrs:{searchObj:i.searchObj,popVisible:i.popVisible},on:{close:i.closeAddDot,success:i.fetchAllloadAll}})],1)},staticRenderFns:[]};e.a=a},khpt:function(t,e,i){"use strict";var a={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("el-form",{ref:"searchForm",staticClass:"staff_searchinfo clearfix",attrs:{inline:!0,size:e.btnsize,"label-position":"right",rules:e.rules,model:e.searchForm,"label-width":"70px"}},[i("div",{staticClass:"staff_searchinfo--input"},[i("el-form-item",{attrs:{label:"送货时间"}},[i("el-date-picker",{attrs:{type:"daterange",align:"right","value-format":"yyyy-MM-dd HH:mm:ss","start-placeholder":"开始日期","picker-options":e.pickerOptions,"end-placeholder":"结束日期"},model:{value:e.searchTime,callback:function(t){e.searchTime=t},expression:"searchTime"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"送货网点",prop:"orgid"}},[i("SelectTree",{attrs:{orgid:e.otherinfo.orgid},model:{value:e.searchForm.orgid,callback:function(t){e.$set(e.searchForm,"orgid",t)},expression:"searchForm.orgid"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"送货批次",prop:"batchNo"}},[i("el-input",{attrs:{placeholder:"请输入送货批次"},model:{value:e.searchForm.batchNo,callback:function(t){e.$set(e.searchForm,"batchNo",t)},expression:"searchForm.batchNo"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"车牌号",prop:"truckIdNumber"}},[i("el-input",{attrs:{placeholder:"请输入车牌号"},model:{value:e.searchForm.truckIdNumber,callback:function(t){e.$set(e.searchForm,"truckIdNumber",t)},expression:"searchForm.truckIdNumber"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"司机"}},[i("el-input",{attrs:{clearable:"",maxlength:10,placeholder:"司机名称"},model:{value:e.searchForm.dirverName,callback:function(t){e.$set(e.searchForm,"dirverName",t)},expression:"searchForm.dirverName"}})],1),e._v(" "),i("searchAll",{attrs:{searchObj:e.searchObjs},on:{dataObj:e.getDataObj},model:{value:e.searchAll,callback:function(t){e.searchAll=t},expression:"searchAll"}})],1),e._v(" "),i("el-form-item",{staticClass:"staff_searchinfo--btn"},[i("el-button",{attrs:{type:"primary"},on:{click:e.onSubmit}},[e._v("查询")]),e._v(" "),i("el-button",{attrs:{type:"info",plain:""},on:{click:function(t){e.clearForm("searchForm")}}},[e._v("清空")])],1)],1)},staticRenderFns:[]};e.a=a},msh6:function(t,e,i){"use strict";var a={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("el-dialog",{staticClass:"wzl_settleLogSave",attrs:{title:e.popTitle,visible:e.isShow,"close-on-click-modal":!1,"before-close":e.closeMe},on:{close:e.closeMe,"update:visible":function(t){e.isShow=t}}},[i("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.form,rules:e.rules,"label-width":e.formLabelWidth,inline:!0,"label-position":"right",size:"mini"}},[i("el-form-item",{attrs:{label:"名称：",prop:"queryKey"}},[i("input",{directives:[{name:"model",rawName:"v-model.trim",value:e.form.queryKey,expression:"form.queryKey",modifiers:{trim:!0}}],attrs:{maxlength:20,placeholder:"请定义名称"},domProps:{value:e.form.queryKey},on:{input:function(t){t.target.composing||e.$set(e.form,"queryKey",t.target.value.trim())},blur:function(t){e.$forceUpdate()}}})])],1),e._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{type:"primary",disabled:0===e.form.queryKey.length},on:{click:function(t){e.submitForm("ruleForm")}}},[e._v("确 定")]),e._v(" "),i("el-button",{on:{click:e.closeMe}},[e._v("取 消")])],1)],1)},staticRenderFns:[]};e.a=a},nl9Y:function(t,e){},puNT:function(t,e,i){"use strict";var a=i("IAIf"),n=i("QcgQ");var s=function(t){i("MXEa")},o=i("VU/8")(a.a,n.a,s,null,null);e.a=o.exports},seR9:function(t,e,i){"use strict";var a=i("mvHQ"),n=i.n(a),s=i("t5DY"),o=i("0xDb");e.a={computed:{isShow:{get:function(){return this.popVisible},set:function(){}}},components:{},props:{popVisible:{type:Boolean,default:!1},dotInfo:[Object,Array],searchQuery:[Object,Array],isDepMain:{type:Boolean,default:!1},createrId:[Number,String],isModify:{type:Boolean,default:!1},isAccept:{type:Boolean,default:!1},proptitle:String,searchObj:{type:[Array,Object],default:function(){}}},data:function(){return{form:{userId:"",orgId:"",menuCode:"",queryKey:"",queryContent:""},searchCreatTime:+new Date,pickOption2:"",formLabelWidth:"75px",tooltip:!1,rules:{},queryKey:"",checked1:!0,popTitle:"自定义标签",loading:!1,type:""}},mounted:function(){},watch:{orgid:function(t){this.form.orgid=t},popVisible:function(t){t&&(this.form.userId=this.otherinfo.userId,this.form.orgId=this.otherinfo.orgid,this.form.menuCode=this.$route.meta.code)}},methods:{reset:function(){this.$refs.ruleForm.resetFields()},closeMe:function(t){this.$emit("close"),this.reset(),"function"==typeof t&&t()},submitForm:function(t){var i=this;this.loading||this.$refs[t].validate(function(t){if(!t)return!1;i.loading=!0,i.form.queryContent=n()(i.searchObj);var e=Object(o.objectMerge2)({},i.form);console.log("addSave_data",e),Object(s.m)(e).then(function(t){i.loading=!1,i.$message({message:"保存成功~",type:"success"}),i.closeMe(),i.$emit("success")}).catch(function(t){i.loading=!1,i.$message.warning(t.text)})})}}}},us2a:function(t,e,i){"use strict";var a=i("t5DY"),n=i("SjYS");e.a={components:{addSave:n.a},props:{searchObj:{type:[Object,Array]},value:[String,Number]},data:function(){return{isModify:!1,popVisible:!1,setupTableVisible:!1,dataset:[],datalist:"",timeout:null,loading:!1,options4:[],querySearch:{currentPage:1,pageSize:10,vo:{orgId:"",userId:"",menuCode:""}}}},watch:{value:function(t){console.log("nnn:",t),""===t&&(this.datalist="")},searchObj:{handler:function(t,e){this.$nextTick(function(){console.log("searchAll_cval",t,e)})},deep:!0}},mounted:function(){},methods:{initdata:function(){var e=this;this.inited||(this.inited=!0,this.loading=!0,this.fetchAllloadAll().then(function(t){e.loading=!1}))},deleteItem:function(t){var e=this;Object(a.a)(t).then(function(t){e.fetchAllloadAll()}).catch(function(t){e._handlerCatchMsg(t)})},Custom:function(){this.isModify=!0,this.popVisible=!0},closeAddDot:function(){this.popVisible=!1},fetchAllloadAll:function(){var e=this;return this.querySearch.vo.orgId=this.otherinfo.orgid,this.querySearch.vo.userId=this.otherinfo.userId,this.querySearch.vo.menuCode=this.$route.meta.code,Object(a.l)(this.querySearch).then(function(t){e.dataset=t.list,e.options4=t.list})},querySearchAsync:function(t,e){var i=this.dataset,a=t?i.filter(this.createStateFilter(t)):i;e(this.options4=a)},createStateFilter:function(e){return function(t){return 0===t.queryKey.toLowerCase().indexOf(e.toLowerCase())}},handleSelect:function(e){var t=this.options4.filter(function(t){return t.id===e});if(t.length){var i=t[0].queryContent,a=JSON.parse(i);this.$emit("change",JSON.parse(i.replace(/'/g,'"'))),this.$emit("dataObj",a)}}}}},ycBC:function(t,e,i){"use strict";var a={render:function(){var a=this,t=a.$createElement,n=a._self._c||t;return n("div",{directives:[{name:"loading",rawName:"v-loading",value:a.loading,expression:"loading"}],staticClass:"tab-content"},[n("SearchForm",{attrs:{orgid:a.otherinfo.orgid,btnsize:a.btnsize},on:{change:a.getSearchParam}}),a._v(" "),n("div",{staticClass:"tab_info"},[n("div",{staticClass:"btns_box"},[n("el-button",{directives:[{name:"has",rawName:"v-has:PAY_LOADSET2",arg:"PAY_LOADSET2"}],attrs:{type:"primary",size:a.btnsize,icon:"el-icon-sort",plain:""},on:{click:function(t){a.doAction("count")}}},[a._v("结算")]),a._v(" "),n("el-button",{directives:[{name:"has",rawName:"v-has:PAY_LOADPRI2",arg:"PAY_LOADPRI2"}],attrs:{type:"primary",size:a.btnsize,icon:"el-icon-printer",plain:""},on:{click:function(t){a.doAction("print")}}},[a._v("打印")]),a._v(" "),n("el-button",{directives:[{name:"has",rawName:"v-has:PAY_LOADEXP2",arg:"PAY_LOADEXP2"}],attrs:{type:"primary",size:a.btnsize,icon:"el-icon-download",plain:""},on:{click:function(t){a.doAction("export")}}},[a._v("导出")]),a._v(" "),n("el-button",{staticClass:"table_setup",attrs:{type:"primary",size:a.btnsize,icon:"el-icon-setting",plain:""},on:{click:a.setTable}},[a._v("表格设置")])],1),a._v(" "),n("div",{staticClass:"info_tab"},[n("el-table",{key:a.tablekey,ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:a.dataList,stripe:"",border:"",height:"100%","tooltip-effect":"dark"},on:{"row-click":a.clickDetails,"selection-change":a.getSelection,"cell-dblclick":a.showDetail}},[n("el-table-column",{attrs:{fixed:"",sortable:"",type:"selection",width:"35"}}),a._v(" "),a._l(a.tableColumn,function(i){return[i.slot?n("el-table-column",{key:i.id,attrs:{fixed:i.fixed,sortable:"",label:i.label,width:i.width},scopedSlots:a._u([{key:"default",fn:function(e){return[i.click?n("span",{staticClass:"clickitem",domProps:{innerHTML:a._s(i.slot(e))},on:{click:function(t){t.stopPropagation(),i.click(e)}}}):n("span",{domProps:{innerHTML:a._s(i.slot(e))}})]}}])}):n("el-table-column",{key:i.id,attrs:{fixed:i.fixed,sortable:"",label:i.label,prop:i.prop,width:i.width}})]})],2)],1)]),a._v(" "),n("div",{staticClass:"info_tab_footer"},[a._v("\n    共计:"+a._s(a.total)+"\n    "),n("div",{staticClass:"show_pager"},[n("Pager",{attrs:{total:a.total},on:{change:a.handlePageChange}})],1)]),a._v(" "),n("TableSetup",{attrs:{popVisible:a.setupTableVisible,columns:a.tableColumn},on:{close:a.closeSetupTable,success:a.setColumn}})],1)},staticRenderFns:[]};e.a=a}});