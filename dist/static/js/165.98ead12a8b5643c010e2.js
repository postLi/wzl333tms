webpackJsonp([165,363],{"1onU":function(t,e,i){"use strict";var a=i("VT+v"),n=i("SgVa");var s=function(t){i("FiTa"),i("7CJ8")},o=i("VU/8")(a.a,n.a,s,"data-v-4b7ed4df",null);e.a=o.exports},"6izB":function(t,e,i){"use strict";var a={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("el-form",{staticClass:"staff_searchinfo clearfix",attrs:{inline:!0,size:e.btnsize,"label-position":"right","label-width":"70px",rules:e.rules,model:e.searchForm}},[i("div",{staticClass:"staff_searchinfo--input"},[i("el-form-item",{attrs:{label:"凭证时间"}},[i("div",{staticClass:"block"},[i("el-date-picker",{attrs:{type:"daterange",align:"right","picker-options":e.pickerOptions2,"start-placeholder":"开始日期","end-placeholder":"结束日期","unlink-panels":""},model:{value:e.searchCreatTime,callback:function(t){e.searchCreatTime=t},expression:"searchCreatTime"}})],1)]),e._v(" "),i("el-form-item",{attrs:{label:"核销网点"}},[i("SelectTree",{attrs:{orgid:e.otherinfo.orgid,clearible:""},model:{value:e.searchForm.orgId,callback:function(t){e.$set(e.searchForm,"orgId",t)},expression:"searchForm.orgId"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"审核状态"}},[i("el-select",{attrs:{clearable:""},model:{value:e.searchForm.verifyStatus,callback:function(t){e.$set(e.searchForm,"verifyStatus",t)},expression:"searchForm.verifyStatus"}},[i("el-option",{attrs:{label:"未审核",value:0}}),e._v(" "),i("el-option",{attrs:{label:"已审核",value:1}}),e._v(" "),i("el-option",{attrs:{label:"全部",value:""}})],1)],1),e._v(" "),i("el-form-item",{attrs:{label:"方向"}},[i("el-select",{attrs:{clearable:""},model:{value:e.searchForm.paymentsType,callback:function(t){e.$set(e.searchForm,"paymentsType",t)},expression:"searchForm.paymentsType"}},[i("el-option",{attrs:{label:"收入",value:0}}),e._v(" "),i("el-option",{attrs:{label:"支出",value:1}}),e._v(" "),i("el-option",{attrs:{label:"全部",value:""}})],1)],1),e._v(" "),i("el-form-item",{attrs:{label:"来源"}},[i("el-select",{attrs:{clearable:""},model:{value:e.searchForm.dataSrc,callback:function(t){e.$set(e.searchForm,"dataSrc",t)},expression:"searchForm.dataSrc"}},[i("el-option",{attrs:{label:"核销产生",value:0}}),e._v(" "),i("el-option",{attrs:{label:"手工录入",value:1}}),e._v(" "),i("el-option",{attrs:{label:"全部",value:""}})],1)],1)],1),e._v(" "),i("el-form-item",{staticClass:"staff_searchinfo--btn"},[i("el-button",{attrs:{type:"primary"},on:{click:e.onSubmit}},[e._v("查询")]),e._v(" "),i("el-button",{attrs:{type:"info",plain:""},on:{click:e.clearForm}},[e._v("清空")])],1)],1)},staticRenderFns:[]};e.a=a},"7CJ8":function(t,e){},FiTa:function(t,e){},HOwW:function(t,e,i){"use strict";i("E4LH");var a=i("9UCZ"),n=i("o9X6"),s=i("0xDb");e.a={components:{SelectType:a.a,SelectTree:n.a},props:{btnsize:{type:[String,Object],default:"mini"},orgid:{type:Number},issender:{type:Boolean,dafault:!1}},computed:{title:function(){}},data:function(){return{searchCreatTime:[Object(s.parseTime)(+new Date-5184e6,"{y}-{m}-{d}"),Object(s.parseTime)(new Date,"{y}-{m}-{d}")],searchForm:{orgId:"",verifyStatus:0,paymentsType:"",dataSrc:"",startTime:"",endTime:""},rules:{mobile:[{}]},pickerOptions2:{shortcuts:s.pickerOptions2}}},watch:{orgid:function(t){this.searchForm.orgId=t}},mounted:function(){this.loading=!0,this.searchForm.orgId=this.orgid,this.onSubmit()},methods:{getOrgid:function(t){},onSubmit:function(){this.searchForm.startTime=this.searchCreatTime[0]?Object(s.parseTime)(this.searchCreatTime[0],"{y}-{m}-{d} ")+"00:00:00":"",this.searchForm.endTime=this.searchCreatTime[1]?Object(s.parseTime)(this.searchCreatTime[1],"{y}-{m}-{d} ")+"23:59:59":"",this.$emit("change",this.searchForm)},clearForm:function(){this.searchForm.startTime="",this.searchForm.endTime="",this.searchCreatTime=[+new Date-5184e6,+new Date],this.searchForm.orgId=this.orgid,this.searchForm.verifyStatus="",this.searchForm.paymentsType="",this.searchForm.dataSrc="",this.searchForm.dataSrc=""}}}},IAIf:function(t,e,i){"use strict";var a=i("woOf"),l=i.n(a),n=i("DAYN"),s=i.n(n),c=i("0xDb"),r=i("t5DY");e.a={props:{popVisible:{type:Boolean,default:!1},columns:{type:Array,default:[]},code:{type:String,default:""}},components:{draggable:s.a},computed:{isShow:{get:function(){return this.popVisible},set:function(){}}},data:function(){return{orgColumnData:[],columnData:[],orgShowColumnData:[],showColumnData:[],list:[],rightList:[],listKey:0,isIndeterminateLeft:!0,isIndeterminateRight:!0,checkAllLeft:!1,checkAllRight:!1,checkListLeft:[],checkListRight:[],searchLeft:"",searchRight:"",leftListLen:0,rightListLen:0,columnListLen:0,isCheck:!0,maxLen:50,rightCheckLen:0,leftCheckLen:0,thecode:""}},mounted:function(){var a=this,t=this.code;this.$route.meta.code;this.thecode="","NOSET"===t?this.convertData():t?this.thecode=t:this.convertData(),this.thecode&&(this.fetchTableSetup(),this.eventBus.$on("tablesetup.change",function(t,e){if(t&&t===a.thecode)if(e.prop){var i=a.showColumnData.filter(function(t){return t.prop===e.prop});i.length&&(i[0].width=e.width,a.changeTbaleSetup())}else e.forEach(function(e){var t=a.showColumnData.filter(function(t){return t.prop===e.prop});t.length&&(t[0].width=e.width)}),a.changeTbaleSetup()}))},methods:{convertData:function(t){this.initData(t),this.callback()},initData:function(e){var t=Object(c.objectMerge2)([],this.columns);t=this.sort(t),(e=e||t).forEach(function(i){"shipFromCityName"!==i.prop&&"shipToCityName"!==i.prop||i.slot||(i.slot=function(t){var e=(t.row[i.prop]||"").split(",");return e[2]||e[1]||e[0]||""})});var o=this.maxLen,i=function(t){var n=[];if(0<e.length){var s=0;e.forEach(function(t,e){if(t.hidden){var i=Object(c.objectMerge2)(t);i.key=e,n.push(i)}else s++;if(o<s){var a=Object(c.objectMerge2)(t);a.key=e,a.hidden=!0,n.push(a)}})}return n},a=function(t){var a=[];if(0<e.length){var n=0;e.forEach(function(t,e){if(!t.hidden&&n<o){n++;var i=Object(c.objectMerge2)(t);i.hidden=!1,i.key=e,a.push(i)}})}return a},n=i().length,s=a().length;this.orgColumnData=i(),this.columnData=i(),this.orgShowColumnData=a(),this.showColumnData=a(),this.leftListLen=n,this.rightListLen=s,this.columnListLen=e.length},sort:function(t){var e=[],i=[];return t.forEach(function(t){t.fixed?e.push(t):i.push(t)}),e.concat(i)},doAction:function(t){switch(t){case"goRight":this.goRight();break;case"goLeft":this.goLeft()}},fetchFail:function(){this.thecode="",this.convertData()},fetchTableSetup:function(){var o=this;return Object(r.i)(this.otherinfo.orgid,this.thecode).then(function(t){var e=t.data;if((o.orgdata=e)&&e.length){if(Array.isArray(e[0])&&(e=e[0]),e.length<=1)return console.log("后台返回表格数据异常:",e),o.fetchFail(),!1;o.orgdata=e;var n=[],s=o.columns.length;e.sort(function(t,e){return t.titleOrder>e.titleOrder?1:-1}),e.forEach(function(t){var e=l()({},t);e.label=e.label||e.lable;for(var i=0;i<s;i++)if(o.columns[i].prop===t.prop){for(var a in o.columns[i])void 0!==e[a]&&null!==e[a]||(e[a]=o.columns[i][a]);break}n.push(e)}),o.columns.forEach(function(e){0===n.filter(function(t){return t.prop===e.prop}).length&&(console.log("本地项，需要后台添加：",e),n.push(e))}),n=o.sort(n),o.convertData(n)}else o.fetchFail()}).catch(function(t){o.fetchFail()})},changeTbaleSetup:function(){var e=this;if(this.thecode)return Object(r.q)(this.otherinfo.orgid,this.thecode,this.formatColumn(this.showColumnData)).then(function(t){e.$message.info("保存成功")}).catch(function(t){e._handlerCatchMsg(t)})},formatColumn:function(t){var s=this.orgdata,o=[],l=0;return t.forEach(function(e){var t=s.filter(function(t){return t.prop===e.prop});if(t.length){var i={},a=t[0];for(var n in a)i[n]=e[n];i.hidden=!1,i.titleOrder=++l,o.push(i)}}),this.columnData.forEach(function(e){var t=s.filter(function(t){return t.prop===e.prop});if(t.length){var i={},a=t[0];for(var n in a)i[n]=e[n];i.hidden=!0,i.titleOrder=++l,o.push(i)}}),o},checkRightLen:function(){this.showColumnData.length>this.maxLen?(this.$message({type:"warning",message:"列表最多只能显示"+this.maxLen+"个字段。"}),this.isCheck=!0):this.isCheck=!1},canDragStart:function(t){},setChangeData:function(){this.reRenderData()},reRenderData:function(){var t=Object(c.objectMerge2)([],this.showColumnData);this.showColumnData=this.sort(t)},setColumnLen:function(){this.leftListLen=this.columnData.length,this.rightListLen=this.showColumnData.length},handChangeAllLeft:function(t){this.checkListLeft=t?l()([],this.columnData):[],this.leftCheckLen=this.checkListLeft.length,this.isIndeterminateLeft=!1},handChangeAllRight:function(t){this.checkListRight=t?l()([],this.showColumnData):[],this.rightCheckLen=this.checkListRight.length,this.isIndeterminateRight=!1},goRight:function(){var e=this;if(this.checkListLeft.length+this.rightListLen>this.maxLen||this.rightListLen>this.maxLen-1)return this.$message({type:"warning",message:"列表最多只能显示"+this.maxLen+"个字段。"}),!1;this.columnData=this.columnData.filter(function(t){return-1===e.checkListLeft.indexOf(t)||(t.fixed=!1,e.showColumnData.push(t),!1)}),this.orgColumnData=this.orgColumnData.filter(function(t){return-1===e.checkListLeft.indexOf(t)||(t.fixed=!1,e.orgShowColumnData.push(t),!1)}),this.checkListLeft=[],this.setColumnLen(),this.leftCheckLen=0,this.reRenderData()},goLeft:function(){var a=this;this.checkListRight.forEach(function(t,e){a.columnData.push(t),a.orgColumnData.push(t);var i=a.showColumnData.indexOf(t);-1!==i&&a.showColumnData.splice(i,1),-1!==a.orgShowColumnData.indexOf(t)&&a.orgShowColumnData.splice(i,1)}),this.checkListRight=[],this.setColumnLen(),this.rightCheckLen=0,this.reRenderData()},dbCheckItemLeft:function(t,e,i){if(this.rightListLen>this.maxLen-1)return this.$message({type:"warning",message:"列表最多只能显示"+this.maxLen+"个字段。"}),!1;t.fixed=!1,this.showColumnData.push(t),this.orgShowColumnData.push(t),this.columnData.splice(e,1),this.orgColumnData.splice(e,1),this.setColumnLen(),this.reRenderData()},dbCheckItemRight:function(t,e,i){this.columnData.push(t),this.orgColumnData.push(t),this.showColumnData.splice(e,1),this.orgShowColumnData.splice(e,1),this.setColumnLen(),this.reRenderData()},handleCheckChangeLeft:function(t){this.leftCheckLen=t.length},handleCheckChangeRight:function(t){this.rightCheckLen=t.length},querySearchLeft:function(t,e){void 0===(this.searchLeft=t).label&&(this.searchLeft||(this.columnData=l()([],this.orgColumnData)));var i=l()([],this.orgColumnData);e(t?i.filter(this.createFilter(t)):i)},querySearchRight:function(t,e){void 0===(this.searchRight=t).label&&(this.searchRight||(this.showColumnData=l()([],this.orgShowColumnData)));var i=l()([],this.orgShowColumnData);e(t?i.filter(this.createFilter(t)):i)},createFilter:function(e){return function(t){return 0===t.label.toLowerCase().indexOf(e.toLowerCase())}},handleSearchLeft:function(t){var e=this;this.searchLeft=t?t.label:"";var i=l()([],this.columnData);i.forEach(function(t){t.label===e.searchLeft&&(i=[]).push(t)}),this.columnData=l()([],i),i=[]},handleSearchRight:function(t){var e=this;this.searchRight=t?t.label:"";var i=l()([],this.showColumnData);i.forEach(function(t){t.label===e.searchRight&&(i=[]).push(t)}),this.showColumnData=l()([],i),i=[]},closeMe:function(t){this.$emit("close"),"function"==typeof t&&t()},handleChange:function(t,e,i){this.rightList=l()([],t)},handleSwitch:function(t,e){t.fixed=!t.fixed,this.reRenderData()},callback:function(){var t=l()([],this.showColumnData);t.forEach(function(t){!t.label&&t.lable&&(t.label=t.lable)}),this.$emit("success",t),this.listKey=Math.random(),this.closeMe()},submitForm:function(){var e=this;this.thecode?this.changeTbaleSetup().then(function(t){e.callback()}):this.callback()}}}},MXEa:function(t,e){},QcgQ:function(t,e,i){"use strict";var a={render:function(){var a=this,t=a.$createElement,n=a._self._c||t;return n("el-dialog",{staticClass:"tms_dialog",attrs:{title:"表格设置",visible:a.isShow,"append-to-body":"","close-on-click-modal":!1,"before-close":a.closeMe},on:{"update:visible":function(t){a.isShow=t}}},[n("div",{staticClass:"tableSetup_warp"},[n("div",{staticClass:"tableSetup_list"},[n("div",{staticClass:"tableSetup_head"},[n("div",{staticClass:"tableSetup_head_select"},[a._v("选择："+a._s(a.leftCheckLen))]),a._v(" "),n("el-checkbox",{attrs:{indeterminate:a.isIndeterminateLeft},on:{change:a.handChangeAllLeft},model:{value:a.checkAllLeft,callback:function(t){a.checkAllLeft=t},expression:"checkAllLeft"}},[a._v("隐藏列  "+a._s(a.leftListLen)+" / "+a._s(a.columnListLen))]),a._v(" "),n("div",{staticStyle:{margin:"3px 0"}},[n("el-autocomplete",{staticClass:"inline-input",attrs:{"fetch-suggestions":a.querySearchLeft,placeholder:"请输入内容",size:"mini"},on:{select:a.handleSearchLeft},scopedSlots:a._u([{key:"default",fn:function(t){var e=t.item;return[n("span",[a._v(a._s(e.label))])]}}]),model:{value:a.searchLeft,callback:function(t){a.searchLeft=t},expression:"searchLeft"}},[n("i",{staticClass:"el-icon-search el-input__icon",attrs:{slot:"suffix"},slot:"suffix"})])],1)],1),a._v(" "),n("div",{staticClass:"tableSetup_content"},[n("el-checkbox-group",{on:{change:a.handleCheckChangeLeft},model:{value:a.checkListLeft,callback:function(t){a.checkListLeft=t},expression:"checkListLeft"}},[n("transition-group",{key:a.listKey,attrs:{name:"el-zoom-in-center"}},a._l(a.columnData,function(e,i){return n("div",{key:i,staticClass:"tableSetup_item",on:{dblclick:function(t){a.dbCheckItemLeft(e,i,t)}}},[n("el-checkbox",{attrs:{label:e}},[a._v("\n                "+a._s(e.label)+"\n              ")])],1)}))],1)],1),a._v(" "),n("div",{staticClass:"tableSetup_tips"},[n("span",[a._v("双击，可快速左右切换。")])])]),a._v(" "),n("div",{staticClass:"tableSetup_btn"},[n("el-button",{attrs:{type:"primary",icon:"el-icon-arrow-right"},on:{click:function(t){a.doAction("goRight")}}}),a._v(" "),n("br"),a._v(" "),n("el-button",{attrs:{type:"primary",icon:"el-icon-arrow-left"},on:{click:function(t){a.doAction("goLeft")}}})],1),a._v(" "),n("div",{staticClass:"tableSetup_list"},[n("div",{staticClass:"tableSetup_head"},[n("div",{staticClass:"tableSetup_head_select"},[a._v("选择："+a._s(a.rightCheckLen))]),a._v(" "),n("el-checkbox",{attrs:{indeterminate:a.isIndeterminateRight},on:{change:a.handChangeAllRight},model:{value:a.checkAllRight,callback:function(t){a.checkAllRight=t},expression:"checkAllRight"}},[a._v("显示列 "+a._s(a.rightListLen)+" / "+a._s(a.columnListLen))]),a._v(" "),n("div",{staticStyle:{margin:"3px 0"}},[n("el-autocomplete",{staticClass:"inline-input",attrs:{"fetch-suggestions":a.querySearchRight,placeholder:"请输入内容",size:"mini"},on:{select:a.handleSearchRight},scopedSlots:a._u([{key:"default",fn:function(t){var e=t.item;return[n("span",[a._v(a._s(e.label))])]}}]),model:{value:a.searchRight,callback:function(t){a.searchRight=t},expression:"searchRight"}},[n("i",{staticClass:"el-icon-search el-input__icon",attrs:{slot:"suffix"},slot:"suffix"})])],1)],1),a._v(" "),n("div",{staticClass:"tableSetup_content"},[n("el-checkbox-group",{on:{change:a.handleCheckChangeRight},model:{value:a.checkListRight,callback:function(t){a.checkListRight=t},expression:"checkListRight"}},[n("draggable",{staticClass:"dragArea",attrs:{move:a.canDragStart,list:a.showColumnData},on:{change:a.setChangeData}},[n("transition-group",{attrs:{name:"el-zoom-in-center"}},a._l(a.showColumnData,function(e,i){return n("div",{key:i,staticClass:"tableSetup_item",on:{dblclick:function(t){a.dbCheckItemRight(e,i,t)}}},[n("el-checkbox",{attrs:{label:e}},[a._v("\n                  "+a._s(e.label)+"\n                ")]),a._v(" "),n("el-switch",{attrs:{value:e.fixed,"active-text":e.fixed?"固定":"活动"},on:{change:function(t){a.handleSwitch(e,i)}}})],1)}))],1)],1)],1),a._v(" "),n("div",{staticClass:"tableSetup_tips"},[n("span",[a._v("拖拽，可调整上下顺序。")]),a._v(" "),n("br"),n("span",[a._v("列表最多只能显示"+a._s(a.maxLen)+"个字段。")])])])]),a._v(" "),n("div",{attrs:{slot:"footer"},slot:"footer"},[n("el-button",{attrs:{type:"primary"},on:{click:function(t){a.submitForm()}}},[a._v("确 定")]),a._v(" "),n("el-button",{on:{click:a.closeMe}},[a._v("取 消")])],1)])},staticRenderFns:[]};e.a=a},SgVa:function(t,e,i){"use strict";var a={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"tms-pagenation"},[i("span",{staticClass:"page-num",class:{disabled:e.pageNum<=1},on:{click:function(t){e.jumpTo(1)}}},[i("span",{staticClass:"first-page"})]),i("span",{staticClass:"page-num",class:{disabled:e.pageNum<=1},on:{click:function(t){e.jumpTo(e.pageNum-1)}}},[i("span",{staticClass:"prev-page"})]),e._v(" "),i("span",{staticClass:"page-jumper"},[e._v("\n    第\n    "),i("el-input",{ref:"input",staticClass:"el-pagination__editor is-in-pagination",attrs:{min:1,max:e.pages,type:"number",disabled:e.pages<=1},on:{change:e.handleChange,focus:e.handleFocus,blur:e.handleBlur},nativeOn:{keydown:function(t){return e.handleKeyup(t)}},model:{value:e.inputval,callback:function(t){e.inputval="string"==typeof t?t.trim():t},expression:"inputval"}}),e._v(" 页\n  ")],1),e._v("\n  /共 "+e._s(e.pages)+" 页\n  "),i("span",{staticClass:"page-num",class:{disabled:e.pageNum===e.pages},on:{click:function(t){e.jumpTo(e.pageNum+1)}}},[i("span",{staticClass:"next-page"})]),e._v(" "),i("span",{staticClass:"page-num",class:{disabled:e.pageNum===e.pages},on:{click:function(t){e.jumpTo(e.pages)}}},[i("span",{staticClass:"last-page"})]),e._v(" "),i("span",{staticClass:"tms-pagination__sizes"},[i("el-select",{staticClass:"page-select",attrs:{placeholder:"请选择"},on:{change:e.sizesChange},model:{value:e.size,callback:function(t){e.size=t},expression:"size"}},e._l(e.sizes,function(t,e){return i("el-option",{key:e,attrs:{label:t,value:t}})}))],1)])},staticRenderFns:[]};e.a=a},"VT+v":function(t,e,i){"use strict";e.a={props:{sizes:{type:Array,default:function(){return[100,200,300,400]}},total:{type:Number,default:0}},computed:{pages:function(){return Math.ceil(this.total/this.size)}},watch:{pageNum:function(){this.inputval=this.pageNum},size:function(){this.pageNum=1}},mounted:function(){this.size=this.sizes[0]},data:function(){return{pageNum:1,oldValue:0,inputval:1,oldNum:1,size:100}},methods:{handleFocus:function(t){this.oldValue=t.target.value},sizesChange:function(){this.pageNum=1,this.oldNum=this.pageNum,this.$emit("change",{pageNum:this.pageNum,pageSize:this.size})},changeEvent:function(){this.oldNum!==this.pageNum&&(this.oldNum=this.pageNum,this.$emit("change",{pageNum:this.pageNum,pageSize:this.size}))},handleCurrentChange:function(t){this.pageNum=t,this.changeEvent()},handleSizeChange:function(t){this.size=t,this.changeEvent()},handleChange:function(t){var e=parseInt(t,10);isNaN(e)?this.inputval=1:e<1?this.inputval=1:e>this.pages?this.inputval=this.pages:this.inputval=e},handleBlur:function(t){var e=t.target;this.handleChange(e.value),this.jumpTo(this.inputval)},handleKeyup:function(t){var e=t.keyCode,i=t.target;console.log("page keydown:",e,i),13===e&&this.oldValue&&i.value!==this.oldValue&&(this.handleChange(i.value),this.oldValue="")},jumpTo:function(t){t<1?this.pageNum=1:t>this.pages?this.pageNum=this.pages:this.pageNum=t,this.changeEvent()}}}},ihBp:function(t,e,i){"use strict";var a=i("mvHQ"),n=i.n(a),s=i("Dd8w"),o=i.n(s),l=(i("Vi15"),i("onZQ")),c=i("ycAe"),r=i("puNT"),h=i("NYxO"),u=i("1onU"),f=i("0xDb"),p=i("UQm2");e.a={components:{SearchForm:c.default,Pager:u.a,TableSetup:r.a},computed:o()({},Object(h.b)(["otherinfo"]),{orgid:function(){}}),mounted:function(){this.searchQuery.vo.orgId=this.otherinfo.orgid},data:function(){var e=this;return{mykey:"",btnsize:"mini",usersArr:[],total:0,tablekey:0,loading:!0,setupTableVisible:!1,selectInfo:{},selected:[],searchQuery:{currentPage:1,pageSize:100,vo:{orgId:1,verifyStatus:"",paymentsType:"",dataSrc:"",startTime:"",endTime:""}},tableColumn:[{label:"序号",prop:"id",width:"70",fixed:!0,slot:function(t){return(e.searchQuery.currentPage-1)*e.searchQuery.pageSize+t.$index+1}},{label:"审核状态",prop:"verifyStatusZh",width:"110",fixed:!0},{label:"来源",prop:"dataSrcZh",width:"110",fixed:!0},{label:"核销项目",prop:"subjectName",width:"120",fixed:!1},{label:"类别",prop:"verificationWay",width:"130",fixed:!1},{label:"方向",prop:"paymentsTypeZh",width:"170",fixed:!1},{label:"金额",prop:"amount",width:"120",fixed:!1},{label:"凭证号",prop:"certNo",width:"150",fixed:!1},{label:"凭证日期",prop:"certTime",width:"160",fixed:!1},{label:"系统操作日期",prop:"createTime",width:"160",fixed:!1},{label:"一级科目",prop:"subjectOne",width:"120",fixed:!1},{label:"二级科目",prop:"subjectTwo",width:"120",fixed:!1},{label:"三级科目",prop:"subjectThree",width:"120",fixed:!1},{label:"四级科目",prop:"subjectFour",width:"120",fixed:!1},{label:"摘要",prop:"remark",width:"180",fixed:!1},{label:"核销网点",prop:"orgName",width:"120",fixed:!1},{label:"笔数",prop:"verifyCount",width:"120",fixed:!1},{label:"发票号码",prop:"invoiceNo",width:"150",fixed:!1},{label:"收据号码",prop:"receiptNo",width:"150",fixed:!1},{label:"支票号码",prop:"checkNo",width:"150",fixed:!1},{label:"手工凭证号",prop:"manualCert",width:"150",fixed:!1}]}},methods:{fetchAllCustomer:function(){var e=this;return this.loading=!0,Object(l.b)(this.searchQuery).then(function(t){e.usersArr=t.list,e.total=t.total,e.loading=!1}).catch(function(t){e.loading=!1,e._handlerCatchMsg(t)})},fetchData:function(){this.fetchAllCustomer()},handlePageChange:function(t){this.searchQuery.currentPage=t.pageNum,this.searchQuery.pageSize=t.pageSize},getSearchParam:function(t){this.searchQuery.vo=Object(f.objectMerge2)(this.searchQuery.vo,t),this.fetchAllCustomer()},doAction:function(t){var e=this;if(!this.selected.length&&"export"!==t&&"print"!==t)return this.$message({message:"请选择要操作的项~",type:"warning"}),!1;switch(t){case"theAudit":var i=this.selected.filter(function(t){return 1===t.verifyStatus}).map(function(t){return t.id});if(!i.length)return this.$message.info("凭证还未审核，不可以反审核~"),!1;this.$confirm("你已选择"+i.length+"条凭证？","提示",{confirmButtonText:"反审核",cancelButtonText:"取消",type:"warning"}).then(function(){var t={};t.idList=i,t.verifyStatus=0,Object(l.a)(t).then(function(t){e.$message({type:"success",message:"反核销成功!"}),e.fetchData()}).catch(function(t){e._handlerCatchMsg(t)})});break;case"audit":var a=this.selected.filter(function(t){return 0===t.verifyStatus}).map(function(t){return t.id});if(!a.length)return this.$message.info("凭证已经审核，不能重复审核~"),!1;this.$confirm("你已选择"+a.length+"条凭证？","提示",{confirmButtonText:"审核",cancelButtonText:"取消",type:"warning"}).then(function(){var t={};t.idList=a,t.verifyStatus=1,Object(l.a)(t).then(function(t){e.$message({type:"success",message:"审核成功!"}),e.fetchData()}).catch(function(t){e._handlerCatchMsg(t)})});break;case"export":Object(p.g)({data:this.selected.length?this.selected:this.usersArr,columns:this.tableColumn,name:"凭证审核"}),this.$refs.multipleTable.clearSelection();break;case"print":Object(p.d)({data:this.selected.length?this.selected:this.usersArr,columns:this.tableColumn})}this.$refs.multipleTable.clearSelection()},setTable:function(){this.setupTableVisible=!0},closeSetupTable:function(){this.setupTableVisible=!1},clickDetails:function(t,e,i){this.$refs.multipleTable.toggleRowSelection(t)},getSelection:function(t){this.selected=t},getDbClick:function(t,e){var i=n()(this.searchQuery);this.$router.push({path:"/finance/cashDetail",query:{recordId:t.billRecordId,searchQuery:i}}),this.$refs.multipleTable.clearSelection()},setColumn:function(t){this.tableColumn=t,this.tablekey=Math.random()}}}},jllS:function(t,e,i){"use strict";var a={render:function(){var a=this,t=a.$createElement,n=a._self._c||t;return n("div",{directives:[{name:"loading",rawName:"v-loading",value:a.loading,expression:"loading"}],staticClass:"tab-content"},[n("SearchForm",{attrs:{orgid:a.otherinfo.orgid,issender:!0,btnsize:a.btnsize},on:{change:a.getSearchParam}}),a._v(" "),n("div",{staticClass:"tab_info"},[n("div",{staticClass:"btns_box"},[n("el-button",{directives:[{name:"has",rawName:"v-has:CERTVERFICATION_CONTRARY_VERIFY",arg:"CERTVERFICATION_CONTRARY_VERIFY"}],attrs:{type:"success",size:a.btnsize,icon:"el-icon-document",plain:""},on:{click:function(t){a.doAction("theAudit")}}},[a._v("反审核\n      ")]),a._v(" "),n("el-button",{directives:[{name:"has",rawName:"v-has:CERTVERFICATION_VERIFY",arg:"CERTVERFICATION_VERIFY"}],attrs:{type:"info",size:a.btnsize,icon:"el-icon-tickets",plain:""},on:{click:function(t){a.doAction("audit")}}},[a._v("审核\n      ")]),a._v(" "),n("el-button",{directives:[{name:"has",rawName:"v-has:CERTVERFICATION_EXPORT",arg:"CERTVERFICATION_EXPORT"}],attrs:{type:"primary",size:a.btnsize,icon:"el-icon-download",plain:""},on:{click:function(t){a.doAction("export")}}},[a._v("导出\n      ")]),a._v(" "),n("span",{staticStyle:{"font-size":"14px","line-height":"28px","padding-left":"10px",color:"#ccc"}},[a._v("双击查看明细")]),a._v(" "),n("el-button",{staticClass:"table_setup",attrs:{type:"primary",size:a.btnsize,icon:"el-icon-setting",plain:""},on:{click:a.setTable}},[a._v("\n        表格设置\n      ")])],1),a._v(" "),n("div",{staticClass:"info_tab"},[n("el-table",{key:a.tablekey,ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:a.usersArr,border:"",height:"100%","tooltip-effect":"dark","default-sort":{prop:"id",order:"ascending"},stripe:""},on:{"row-dblclick":a.getDbClick,"row-click":a.clickDetails,"selection-change":a.getSelection}},[n("el-table-column",{attrs:{fixed:"",sortable:"",type:"selection",width:"50"}}),a._v(" "),a._l(a.tableColumn,function(i){return[i.slot?n("el-table-column",{key:i.id,attrs:{fixed:i.fixed,sortable:"",label:i.label,width:i.width},scopedSlots:a._u([{key:"default",fn:function(e){return[i.click?n("span",{staticClass:"clickitem",domProps:{innerHTML:a._s(i.slot(e))},on:{click:function(t){t.stopPropagation(),i.click(e)}}}):n("span",{domProps:{innerHTML:a._s(i.slot(e))}})]}}])}):n("el-table-column",{key:i.id,attrs:{fixed:i.fixed,sortable:"",label:i.label,prop:i.prop,width:i.width}})]})],2)],1),a._v(" "),n("div",{staticClass:"info_tab_footer"},[a._v("共计:"+a._s(a.total)+"\n      "),n("div",{staticClass:"show_pager"},[n("Pager",{attrs:{total:a.total},on:{change:a.handlePageChange}})],1)])]),a._v(" "),n("TableSetup",{attrs:{popVisible:a.setupTableVisible,columns:a.tableColumn},on:{close:a.closeSetupTable,success:a.setColumn}})],1)},staticRenderFns:[]};e.a=a},onZQ:function(t,e,i){"use strict";e.b=function(t){return a.b.post("/api-finance/finance/tmsfinanceverificationcert/v1.3/getVerificationCertList",t).then(function(t){return t.data||{list:[],totalCount:0}})},e.a=function(t){return a.b.post("/api-finance/finance/tmsfinanceverificationcert/v1.3/updateVerificationCertStatus",t)};var a=i("Vo7i")},puNT:function(t,e,i){"use strict";var a=i("IAIf"),n=i("QcgQ");var s=function(t){i("MXEa")},o=i("VU/8")(a.a,n.a,s,null,null);e.a=o.exports},qYnG:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i("ihBp"),n=i("jllS"),s=i("VU/8")(a.a,n.a,null,null,null);e.default=s.exports},ycAe:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i("HOwW"),n=i("6izB"),s=i("VU/8")(a.a,n.a,null,null,null);e.default=s.exports}});