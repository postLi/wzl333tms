webpackJsonp([105,211,304],{"/n+A":function(e,t,i){"use strict";var a={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"popRight-center",class:{showPopRight:e.isShow},style:{zIndex:e.zIndex}},[i("div",{staticClass:"popRight-header"},[e._t("title",[e._v(e._s(e.title))]),e._v(" "),i("i",{staticClass:"el-icon-close",attrs:{title:"关闭"},on:{click:e.close}})],2),e._v(" "),e.shouldRender?i("div",{staticClass:"popRight-content"},[e._t("content",[e._v("内容")])],2):e._e(),e._v(" "),i("div",{staticClass:"popRight-footer"},[e._t("footer",[e._v("底部")])],2)])},staticRenderFns:[]};t.a=a},"1onU":function(e,t,i){"use strict";var a=i("VT+v"),s=i("SgVa");var n=function(e){i("FiTa"),i("7CJ8")},o=i("VU/8")(a.a,s.a,n,"data-v-4b7ed4df",null);t.a=o.exports},"3EPC":function(e,t,i){"use strict";var a=i("qYK6"),s=i("/n+A");var n=function(e){i("f3wf")},o=i("VU/8")(a.a,s.a,n,null,null);t.a=o.exports},"7CJ8":function(e,t){},FiTa:function(e,t){},IAIf:function(e,t,i){"use strict";var a=i("woOf"),r=i.n(a),s=i("DAYN"),n=i.n(s),c=i("0xDb"),l=i("t5DY");t.a={props:{popVisible:{type:Boolean,default:!1},columns:{type:Array,default:[]},code:{type:String,default:""}},components:{draggable:n.a},computed:{isShow:{get:function(){return this.popVisible},set:function(){}}},data:function(){return{orgColumnData:[],columnData:[],orgShowColumnData:[],showColumnData:[],list:[],rightList:[],listKey:0,isIndeterminateLeft:!0,isIndeterminateRight:!0,checkAllLeft:!1,checkAllRight:!1,checkListLeft:[],checkListRight:[],searchLeft:"",searchRight:"",leftListLen:0,rightListLen:0,columnListLen:0,isCheck:!0,maxLen:50,rightCheckLen:0,leftCheckLen:0,thecode:""}},mounted:function(){var a=this,e=this.code;this.$route.meta.code;"NOSET"===e?this.convertData():e?this.thecode=e:this.convertData(),this.thecode&&(this.fetchTableSetup(),this.eventBus.$on("tablesetup.change",function(e,t){if(e&&e===a.thecode){var i=a.showColumnData.filter(function(e){return e.prop===t.prop});i.length&&(i[0].width=t.width,a.changeTbaleSetup())}}))},methods:{convertData:function(e){this.initData(e),this.callback()},initData:function(t){t=t||this.columns;var o=this.maxLen,e=function(e){var s=[];if(0<t.length){var n=0;t.forEach(function(e,t){if(e.hidden){var i=Object(c.objectMerge2)(e);i.key=t,s.push(i)}else n++;if(o<n){var a=Object(c.objectMerge2)(e);a.key=t,a.hidden=!0,s.push(a)}})}return s},i=function(e){var a=[];if(0<t.length){var s=0;t.forEach(function(e,t){if(!e.hidden&&s<o){s++;var i=Object(c.objectMerge2)(e);i.hidden=!1,i.key=t,a.push(i)}})}return a},a=e().length,s=i().length;this.orgColumnData=e(),this.columnData=e(),this.orgShowColumnData=i(),this.showColumnData=i(),this.leftListLen=a,this.rightListLen=s,this.columnListLen=t.length},sort:function(e){return e.sort(function(e,t){return e.key-t.key})},doAction:function(e){switch(e){case"goRight":this.goRight();break;case"goLeft":this.goLeft()}},fetchFail:function(){this.thecode="",this.convertData()},fetchTableSetup:function(){var o=this;return Object(l.g)(this.otherinfo.orgid,this.thecode).then(function(e){var t=e.data;if((o.orgdata=t)&&t.length){1===t.length&&(t=t[0]),o.orgdata=t;var s=[],n=o.columns.length;t.sort(function(e,t){return e.titleOrder>t.titleOrder?1:-1}),t.forEach(function(e){for(var t=r()({},e),i=0;i<n;i++)if(o.columns[i].prop===e.prop){for(var a in o.columns[i])void 0!==t[a]&&null!==t[a]||(t[a]=o.columns[i][a]);break}s.push(t)}),o.columns.forEach(function(t){0===s.filter(function(e){return e.prop===t.prop}).length&&s.push(t)}),o.convertData(s)}else o.fetchFail()}).catch(function(e){o.fetchFail()})},changeTbaleSetup:function(){var t=this;if(this.thecode)return Object(l.n)(this.otherinfo.orgid,this.thecode,this.formatColumn(this.showColumnData)).then(function(e){t.$message.info("保存成功")}).catch(function(e){t._handlerCatchMsg(e)})},formatColumn:function(e){var n=this.orgdata,o=[],r=0;return e.forEach(function(t){var e=n.filter(function(e){return e.prop===t.prop});if(e.length){var i={},a=e[0];for(var s in a)i[s]=t[s];i.hidden=!1,i.titleOrder=++r,o.push(i)}}),this.columnData.forEach(function(t){var e=n.filter(function(e){return e.prop===t.prop});if(e.length){var i={},a=e[0];for(var s in a)i[s]=t[s];i.hidden=!0,i.titleOrder=++r,o.push(i)}}),o},checkRightLen:function(){this.showColumnData.length>this.maxLen?(this.$message({type:"warning",message:"列表最多只能显示"+this.maxLen+"个字段。"}),this.isCheck=!0):this.isCheck=!1},canDragStart:function(e){},setColumnLen:function(){this.leftListLen=this.columnData.length,this.rightListLen=this.showColumnData.length},handChangeAllLeft:function(e){this.checkListLeft=e?r()([],this.columnData):[],this.leftCheckLen=this.checkListLeft.length,this.isIndeterminateLeft=!1},handChangeAllRight:function(e){this.checkListRight=e?r()([],this.showColumnData):[],this.rightCheckLen=this.checkListRight.length,this.isIndeterminateRight=!1},goRight:function(){var t=this;if(this.checkListLeft.length+this.rightListLen>this.maxLen||this.rightListLen>this.maxLen-1)return this.$message({type:"warning",message:"列表最多只能显示"+this.maxLen+"个字段。"}),!1;this.columnData=this.columnData.filter(function(e){return-1===t.checkListLeft.indexOf(e)||(t.showColumnData.push(e),!1)}),this.orgColumnData=this.orgColumnData.filter(function(e){return-1===t.checkListLeft.indexOf(e)||(t.orgShowColumnData.push(e),!1)}),this.checkListLeft=[],this.setColumnLen(),this.leftCheckLen=0},goLeft:function(){var a=this;this.checkListRight.forEach(function(e,t){a.columnData.push(e),a.orgColumnData.push(e);var i=a.showColumnData.indexOf(e);-1!==i&&a.showColumnData.splice(i,1),-1!==a.orgShowColumnData.indexOf(e)&&a.orgShowColumnData.splice(i,1)}),this.sort(this.columnData),this.checkListRight=[],this.setColumnLen(),this.rightCheckLen=0},dbCheckItemLeft:function(e,t,i){if(this.rightListLen>this.maxLen-1)return this.$message({type:"warning",message:"列表最多只能显示"+this.maxLen+"个字段。"}),!1;this.showColumnData.push(e),this.orgShowColumnData.push(e),this.columnData.splice(t,1),this.orgColumnData.splice(t,1),this.setColumnLen()},dbCheckItemRight:function(e,t,i){this.columnData.push(e),this.orgColumnData.push(e),this.showColumnData.splice(t,1),this.orgShowColumnData.splice(t,1),this.setColumnLen(),this.sort(this.columnData)},handleCheckChangeLeft:function(e){this.leftCheckLen=e.length},handleCheckChangeRight:function(e){this.rightCheckLen=e.length},querySearchLeft:function(e,t){void 0===(this.searchLeft=e).label&&(this.searchLeft||(this.columnData=r()([],this.orgColumnData)));var i=r()([],this.orgColumnData);t(e?i.filter(this.createFilter(e)):i)},querySearchRight:function(e,t){void 0===(this.searchRight=e).label&&(this.searchRight||(this.showColumnData=r()([],this.orgShowColumnData)));var i=r()([],this.orgShowColumnData);t(e?i.filter(this.createFilter(e)):i)},createFilter:function(t){return function(e){return 0===e.label.toLowerCase().indexOf(t.toLowerCase())}},handleSearchLeft:function(e){var t=this;this.searchLeft=e?e.label:"";var i=r()([],this.columnData);i.forEach(function(e){e.label===t.searchLeft&&(i=[]).push(e)}),this.columnData=r()([],i),i=[]},handleSearchRight:function(e){var t=this;this.searchRight=e?e.label:"";var i=r()([],this.showColumnData);i.forEach(function(e){e.label===t.searchRight&&(i=[]).push(e)}),this.showColumnData=r()([],i),i=[]},closeMe:function(e){this.$emit("close"),"function"==typeof e&&e()},handleChange:function(e,t,i){this.rightList=r()([],e)},handleSwitch:function(e){},callback:function(){var e=r()([],this.showColumnData);e.forEach(function(e){!e.label&&e.lable&&(e.label=e.lable)}),this.$emit("success",e),this.listKey=Math.random(),this.closeMe()},submitForm:function(){var t=this;this.thecode?this.changeTbaleSetup().then(function(e){t.callback()}):this.callback()}}}},LE6s:function(e,t){},MXEa:function(e,t){},NTyV:function(e,t,i){"use strict";var a={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-dialog",{staticClass:"wzl_addReceiptPop",attrs:{title:t.popTitle,visible:t.isShow,"close-on-click-modal":!1,"before-close":t.closeMe},on:{close:t.closeMe,"update:visible":function(e){t.isShow=e}}},[i("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:t.form,rules:t.rules,"label-width":t.formLabelWidth,inline:!0,"label-position":"right",size:"mini"}},[t.isModify?i("div",{staticClass:"addMark"},[i("el-form-item",{attrs:{label:"回收情况",prop:"recTypeId",cols:45}},[i("SelectType",{attrs:{type:"rec_type"},model:{value:t.form.recTypeId,callback:function(e){t.$set(t.form,"recTypeId",e)},expression:"form.recTypeId"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"回收日期:",prop:"recTime"}},[i("el-date-picker",{attrs:{align:"right",type:"date","picker-options":t.pickOption2,placeholder:"选择日期","value-format":"timestamp"},model:{value:t.searchCreatTime,callback:function(e){t.searchCreatTime=e},expression:"searchCreatTime"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"回收备注","label-width":t.formLabelWidth,prop:"recRemark"}},[i("el-input",{attrs:{type:"textarea",rows:7,cols:30,maxlength:200,placeholder:"最多200个字符","auto-complete":"off"},model:{value:t.form.recRemark,callback:function(e){t.$set(t.form,"recRemark",e)},expression:"form.recRemark"}})],1)],1):t._e(),t._v(" "),t.isAccept?i("div",{staticClass:"addMark"},[i("el-form-item",{attrs:{label:"接收情况",prop:"acceptTypeId",cols:45}},[i("SelectType",{attrs:{type:"accept_type"},model:{value:t.form.acceptTypeId,callback:function(e){t.$set(t.form,"acceptTypeId",e)},expression:"form.acceptTypeId"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"接收日期:",prop:"recTime"}},[i("el-date-picker",{attrs:{align:"right",type:"date","picker-options":t.pickOption2,placeholder:"选择日期","value-format":"timestamp"},model:{value:t.searchCreatTime,callback:function(e){t.searchCreatTime=e},expression:"searchCreatTime"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"接收备注","label-width":t.formLabelWidth,prop:"acceptRemark"}},[i("el-input",{attrs:{maxlength:200,type:"textarea",rows:7,cols:30,placeholder:"最多200个字符","auto-complete":"off"},model:{value:t.form.acceptRemark,callback:function(e){t.$set(t.form,"acceptRemark",e)},expression:"form.acceptRemark"}})],1)],1):t._e(),t._v(" "),t.isSend?i("div",{staticClass:"addMark"},[i("el-form-item",{attrs:{label:"寄出日期:",prop:"sendTime"}},[i("el-date-picker",{attrs:{align:"right",type:"date","picker-options":t.pickOption2,placeholder:"选择日期","value-format":"timestamp"},model:{value:t.searchCreatTime,callback:function(e){t.searchCreatTime=e},expression:"searchCreatTime"}})],1)],1):t._e(),t._v(" "),t.isGrant?i("div",{staticClass:"addMark"},[i("el-form-item",{attrs:{label:"发放日期:",prop:"giveoutTime"}},[i("el-date-picker",{attrs:{align:"right",type:"date","picker-options":t.pickOption2,placeholder:"选择日期","value-format":"timestamp"},model:{value:t.searchCreatTime,callback:function(e){t.searchCreatTime=e},expression:"searchCreatTime"}})],1)],1):t._e()]),t._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{type:"primary"},on:{click:function(e){t.submitForm("ruleForm")}}},[t._v("确 定")]),t._v(" "),i("el-button",{on:{click:t.closeMe}},[t._v("取 消")])],1)],1)},staticRenderFns:[]};t.a=a},QcgQ:function(e,t,i){"use strict";var a={render:function(){var a=this,e=a.$createElement,s=a._self._c||e;return s("el-dialog",{staticClass:"tms_dialog",attrs:{title:"表格设置",visible:a.isShow,"append-to-body":"","close-on-click-modal":!1,"before-close":a.closeMe},on:{"update:visible":function(e){a.isShow=e}}},[s("div",{staticClass:"tableSetup_warp"},[s("div",{staticClass:"tableSetup_list"},[s("div",{staticClass:"tableSetup_head"},[s("div",{staticClass:"tableSetup_head_select"},[a._v("选择："+a._s(a.leftCheckLen))]),a._v(" "),s("el-checkbox",{attrs:{indeterminate:a.isIndeterminateLeft},on:{change:a.handChangeAllLeft},model:{value:a.checkAllLeft,callback:function(e){a.checkAllLeft=e},expression:"checkAllLeft"}},[a._v("隐藏列  "+a._s(a.leftListLen)+" / "+a._s(a.columnListLen))]),a._v(" "),s("div",{staticStyle:{margin:"3px 0"}},[s("el-autocomplete",{staticClass:"inline-input",attrs:{"fetch-suggestions":a.querySearchLeft,placeholder:"请输入内容",size:"mini"},on:{select:a.handleSearchLeft},scopedSlots:a._u([{key:"default",fn:function(e){var t=e.item;return[s("span",[a._v(a._s(t.label))])]}}]),model:{value:a.searchLeft,callback:function(e){a.searchLeft=e},expression:"searchLeft"}},[s("i",{staticClass:"el-icon-search el-input__icon",attrs:{slot:"suffix"},slot:"suffix"})])],1)],1),a._v(" "),s("div",{staticClass:"tableSetup_content"},[s("el-checkbox-group",{on:{change:a.handleCheckChangeLeft},model:{value:a.checkListLeft,callback:function(e){a.checkListLeft=e},expression:"checkListLeft"}},[s("transition-group",{key:a.listKey,attrs:{name:"el-zoom-in-center"}},a._l(a.columnData,function(t,i){return s("div",{key:i,staticClass:"tableSetup_item",on:{dblclick:function(e){a.dbCheckItemLeft(t,i,e)}}},[s("el-checkbox",{attrs:{label:t}},[a._v("\n                "+a._s(t.label)+"\n              ")])],1)}))],1)],1),a._v(" "),s("div",{staticClass:"tableSetup_tips"},[s("span",[a._v("双击，可快速左右切换。")])])]),a._v(" "),s("div",{staticClass:"tableSetup_btn"},[s("el-button",{attrs:{type:"primary",icon:"el-icon-arrow-right"},on:{click:function(e){a.doAction("goRight")}}}),a._v(" "),s("br"),a._v(" "),s("el-button",{attrs:{type:"primary",icon:"el-icon-arrow-left"},on:{click:function(e){a.doAction("goLeft")}}})],1),a._v(" "),s("div",{staticClass:"tableSetup_list"},[s("div",{staticClass:"tableSetup_head"},[s("div",{staticClass:"tableSetup_head_select"},[a._v("选择："+a._s(a.rightCheckLen))]),a._v(" "),s("el-checkbox",{attrs:{indeterminate:a.isIndeterminateRight},on:{change:a.handChangeAllRight},model:{value:a.checkAllRight,callback:function(e){a.checkAllRight=e},expression:"checkAllRight"}},[a._v("显示列 "+a._s(a.rightListLen)+" / "+a._s(a.columnListLen))]),a._v(" "),s("div",{staticStyle:{margin:"3px 0"}},[s("el-autocomplete",{staticClass:"inline-input",attrs:{"fetch-suggestions":a.querySearchRight,placeholder:"请输入内容",size:"mini"},on:{select:a.handleSearchRight},scopedSlots:a._u([{key:"default",fn:function(e){var t=e.item;return[s("span",[a._v(a._s(t.label))])]}}]),model:{value:a.searchRight,callback:function(e){a.searchRight=e},expression:"searchRight"}},[s("i",{staticClass:"el-icon-search el-input__icon",attrs:{slot:"suffix"},slot:"suffix"})])],1)],1),a._v(" "),s("div",{staticClass:"tableSetup_content"},[s("el-checkbox-group",{on:{change:a.handleCheckChangeRight},model:{value:a.checkListRight,callback:function(e){a.checkListRight=e},expression:"checkListRight"}},[s("draggable",{staticClass:"dragArea",attrs:{move:a.canDragStart,list:a.showColumnData}},[s("transition-group",{attrs:{name:"el-zoom-in-center"}},a._l(a.showColumnData,function(t,i){return s("div",{key:i,staticClass:"tableSetup_item",on:{dblclick:function(e){a.dbCheckItemRight(t,i,e)}}},[s("el-checkbox",{attrs:{label:t}},[a._v("\n                  "+a._s(t.label)+"\n                ")]),a._v(" "),s("el-switch",{attrs:{"active-text":t.fixed?"固定":"活动"},on:{change:function(e){a.handleSwitch(t)}},model:{value:t.fixed,callback:function(e){a.$set(t,"fixed",e)},expression:"column.fixed"}})],1)}))],1)],1)],1),a._v(" "),s("div",{staticClass:"tableSetup_tips"},[s("span",[a._v("拖拽，可调整上下顺序。")]),a._v(" "),s("br"),s("span",[a._v("列表最多只能显示"+a._s(a.maxLen)+"个字段。")])])])]),a._v(" "),s("div",{attrs:{slot:"footer"},slot:"footer"},[s("el-button",{attrs:{type:"primary"},on:{click:function(e){a.submitForm()}}},[a._v("确 定")]),a._v(" "),s("el-button",{on:{click:a.closeMe}},[a._v("取 消")])],1)])},staticRenderFns:[]};t.a=a},"R/Zi":function(e,t,i){"use strict";var a=i("3EPC"),s=i("o9X6"),n=i("9UCZ"),o=i("Xf+J"),r=i("0xDb");t.a={computed:{isShow:{get:function(){return this.popVisible},set:function(){}}},components:{PopFrame:a.a,SelectTree:s.a,SelectType:n.a},props:{popVisible:{type:Boolean,default:!1},dotInfo:[Object,Array],searchQuery:[Object,Array],isDepMain:{type:Boolean,default:!1},createrId:[Number,String],isModify:{type:Boolean,default:!1},isAccept:{type:Boolean,default:!1},isSend:{type:Boolean,default:!1},isGrant:{type:Boolean,default:!1},info:{type:Object,default:function(){}}},data:function(){return{form:{pageType:"",recTypeId:113,recRemark:"",acceptTypeId:115,acceptRemark:""},formLabelWidth:"75px",tooltip:!1,pickOption2:"",searchCreatTime:+new Date,rules:{},checked1:!0,popTitle:"",loading:!1,type:""}},mounted:function(){console.log(this.info)},watch:{isDepMain:function(){},dotInfo:function(e){this.getMentInfo=this.dotInfo,console.log(this.dotInfo)},searchQuery:function(e){this.form.pageType=this.searchQuery.vo.pageType},orgid:function(e){this.form.orgid=e},isModify:{handler:function(e){this.isModify&&(this.popTitle="回单回收",this.form.pageType=this.searchQuery.vo.pageType,this.$set(this.form,"recTime",Object(r.parseTime)(this.searchCreatTime,"{y}-{m}-{d} {h}:{i}:{s}")))},immediate:!0},isAccept:{handler:function(e){this.isAccept&&(this.popTitle="回单接收",this.form.pageType=this.searchQuery.vo.pageType)},immediate:!0},isSend:{handler:function(e){this.isSend&&(this.popTitle="回单寄出",this.form.pageType=this.searchQuery.vo.pageType)},immediate:!0},isGrant:{handler:function(e){this.isGrant&&(this.popTitle="回单发放",this.form.pageType=this.searchQuery.vo.pageType)},immediate:!0},createrId:function(e){}},methods:{reset:function(){this.$refs.ruleForm.resetFields()},closeMe:function(e){this.$emit("close"),this.reset(),"function"==typeof e&&e()},submitForm:function(e){var i=this;this.$refs[e].validate(function(e){if(!e)return!1;i.loading=!0,i.isModify?i.$set(i.form,"recTime",Object(r.parseTime)(i.searchCreatTime,"{y}-{m}-{d} {h}:{i}:{s}")):i.isAccept?i.$set(i.form,"acceptTime",Object(r.parseTime)(i.searchCreatTime,"{y}-{m}-{d} {h}:{i}:{s}")):i.isSend?i.$set(i.form,"sendTime",Object(r.parseTime)(i.searchCreatTime,"{y}-{m}-{d} {h}:{i}:{s}")):i.isGrant&&i.$set(i.form,"acceptTime",Object(r.parseTime)(i.searchCreatTime,"{y}-{m}-{d} {h}:{i}:{s}"));var t=Object(r.objectMerge2)({},i.form);t.receiptIds=i.dotInfo,Object(o.c)(t).then(function(e){i.$message({message:"保存成功~",type:"success"}),i.closeMe(),i.$emit("success")}).catch(function(e){i._handlerCatchMsg(e),i.closeMe()})})}}}},SgVa:function(e,t,i){"use strict";var a={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"tms-pagenation"},[i("span",{staticClass:"page-num",class:{disabled:t.pageNum<=1},on:{click:function(e){t.jumpTo(1)}}},[i("span",{staticClass:"first-page"})]),i("span",{staticClass:"page-num",class:{disabled:t.pageNum<=1},on:{click:function(e){t.jumpTo(t.pageNum-1)}}},[i("span",{staticClass:"prev-page"})]),t._v(" "),i("span",{staticClass:"page-jumper"},[t._v("\n    第\n    "),i("el-input",{ref:"input",staticClass:"el-pagination__editor is-in-pagination",attrs:{min:1,max:t.pages,type:"number",disabled:t.pages<=1},on:{change:t.handleChange,focus:t.handleFocus,blur:t.handleBlur},nativeOn:{keydown:function(e){return t.handleKeyup(e)}},model:{value:t.inputval,callback:function(e){t.inputval="string"==typeof e?e.trim():e},expression:"inputval"}}),t._v(" 页\n  ")],1),t._v("\n  /共 "+t._s(t.pages)+" 页\n  "),i("span",{staticClass:"page-num",class:{disabled:t.pageNum===t.pages},on:{click:function(e){t.jumpTo(t.pageNum+1)}}},[i("span",{staticClass:"next-page"})]),t._v(" "),i("span",{staticClass:"page-num",class:{disabled:t.pageNum===t.pages},on:{click:function(e){t.jumpTo(t.pages)}}},[i("span",{staticClass:"last-page"})]),t._v(" "),i("span",{staticClass:"tms-pagination__sizes"},[i("el-select",{staticClass:"page-select",attrs:{placeholder:"请选择"},on:{change:t.sizesChange},model:{value:t.size,callback:function(e){t.size=e},expression:"size"}},t._l(t.sizes,function(e,t){return i("el-option",{key:t,attrs:{label:e,value:e}})}))],1)])},staticRenderFns:[]};t.a=a},"VT+v":function(e,t,i){"use strict";t.a={props:{sizes:{type:Array,default:function(){return[100,200,300,400]}},total:{type:Number,default:0}},computed:{pages:function(){return Math.ceil(this.total/this.size)}},watch:{pageNum:function(){this.inputval=this.pageNum},size:function(){this.pageNum=1}},mounted:function(){this.size=this.sizes[0]},data:function(){return{pageNum:1,oldValue:0,inputval:1,oldNum:1,size:100}},methods:{handleFocus:function(e){this.oldValue=e.target.value},sizesChange:function(){this.pageNum=1,this.oldNum=this.pageNum,this.$emit("change",{pageNum:this.pageNum,pageSize:this.size})},changeEvent:function(){this.oldNum!==this.pageNum&&(this.oldNum=this.pageNum,this.$emit("change",{pageNum:this.pageNum,pageSize:this.size}))},handleCurrentChange:function(e){this.pageNum=e,this.changeEvent()},handleSizeChange:function(e){this.size=e,this.changeEvent()},handleChange:function(e){var t=parseInt(e,10);isNaN(t)?this.inputval=1:t<1?this.inputval=1:t>this.pages?this.inputval=this.pages:this.inputval=t},handleBlur:function(e){var t=e.target;this.handleChange(t.value),this.jumpTo(this.inputval)},handleKeyup:function(e){var t=e.keyCode,i=e.target;console.log("page keydown:",t,i),13===t&&this.oldValue&&i.value!==this.oldValue&&(this.handleChange(i.value),this.oldValue="")},jumpTo:function(e){e<1?this.pageNum=1:e>this.pages?this.pageNum=this.pages:this.pageNum=e,this.changeEvent()}}}},cYPr:function(e,t,i){"use strict";var a=i("Dd8w"),s=i.n(a),n=i("qs7E"),c=i("Xf+J"),o=i("NYxO"),r=i("puNT"),l=i("1onU"),h=i("qazg"),u=i("0xDb"),p=i("UQm2");t.a={components:{SearchForm:n.default,Pager:l.a,TableSetup:r.a,AddMark:h.default},computed:s()({},Object(o.b)(["otherinfo"]),{orgid:function(){}}),mounted:function(){var t=this;this.fetchAllreceipt(this.otherinfo.orgid).then(function(e){}).catch(function(e){t.loading=!1,t._handlerCatchMsg(e)})},data:function(){var t=this;return{btnsize:"mini",component:"Send",selectInfo:{},dataset:[],selected:[],dotInfo:[],isAccept:!1,popVisible:!1,setupTableVisible:!1,isModify:!1,tablekey:0,total:0,loading:!0,searchQuery:{currentPage:1,pageSize:100,vo:{pageType:3,receiptIds:[],acceptStatus:109}},tableColumn:[{label:"序号",prop:"id",width:"60",fixed:!0,slot:function(e){return(t.searchQuery.currentPage-1)*t.searchQuery.pageSize+e.$index+1}},{label:"运单号",prop:"shipSn",width:"120",fixed:!0},{label:"开单网点",prop:"fromOrgName",width:"120",fixed:!1},{label:"目的网点",prop:"toOrgName",width:"120",fixed:!1},{label:"开单日期",prop:"createTime",width:"165",slot:function(e){return""+Object(u.parseTime)(e.row.createTime,"{y}-{m}-{d} {h}:{i}:{s}")},fixed:!1},{label:"出发城市",prop:"shipFromCityName",width:"120",fixed:!1},{label:"到达城市",prop:"shipToCityName",width:"120",fixed:!1},{label:"接收状态",prop:"acceptStatusName",width:"120",fixed:!1},{label:"接收日期",prop:"acceptTime",width:"165",slot:function(e){return""+Object(u.parseTime)(e.row.acceptTime,"{y}-{m}-{d} {h}:{i}:{s}")},fixed:!1},{label:"回单状态",prop:"backStatusName",width:"120",fixed:!1},{label:"回单类型",prop:"shipReceiptRequireName",width:"120",fixed:!1},{label:"回单数量",prop:"shipReceiptNum",width:"120",fixed:!1},{label:"接收备注",prop:"acceptRemark",width:"120",fixed:!1},{label:"发货人",prop:"sendName",width:"120",fixed:!1},{label:"收货人",prop:"recName",width:"120",fixed:!1},{label:"货品名",prop:"cargoName",width:"90",fixed:!1},{label:"件数",prop:"cargoAmount",width:"80",fixed:!1},{label:"重量",prop:"cargoWeight",width:"80",fixed:!1},{label:"体积",prop:"cargoVolume",width:"80",fixed:!1},{label:"付款方式",prop:"shipPayWayName",width:"120",fixed:!1},{label:"现付",prop:"shipNowpayFee",width:"80",fixed:!1},{label:"到付",prop:"shipArrivepayFee",width:"80",fixed:!1},{label:"回单付",prop:"shipReceiptpayFee",width:"90",fixed:!1},{label:"月结",prop:"shipMonthpayFee",width:"80",fixed:!1},{label:"中转承运商",prop:"carrierName",width:"120",fixed:!1},{label:"中转日期",prop:"transferTime",width:"180",slot:function(e){return""+Object(u.parseTime)(e.row.transferTime,"{y}-{m}-{d} {h}:{i}:{s}")},fixed:!1},{label:"中转单号",prop:"oddNumbers",width:"120",fixed:!1},{label:"发货人电话",prop:"sendMobile",width:"120",fixed:!1},{label:"发货地址",prop:"sendAddress",width:"120",fixed:!1},{label:"收货人电话",prop:"recMobile",width:"120",fixed:!1},{label:"收货地址",prop:"recAddress",width:"120",fixed:!1},{label:"到达省",prop:"shipToCityName1",width:"120",slot:function(e){return e.row.shipToCityName?e.row.shipToCityName.split(",")[0]:""},fixed:!1},{label:"到达市",prop:"shipToCityName2",width:"120",slot:function(e){return e.row.shipToCityName?e.row.shipToCityName.split(",")[1]:""},fixed:!1},{label:"到达县",prop:"shipToCityName3",width:"120",slot:function(e){return e.row.shipToCityName?e.row.shipToCityName.split(",")[2]:""},fixed:!1}]}},methods:{fetchAllreceipt:function(){var t=this;return this.loading=!0,Object(c.a)(this.searchQuery).then(function(e){t.dataset=e.list,t.total=e.total,t.loading=!1,console.log(e)}).catch(function(e){t.loading=!1,t._handlerCatchMsg(e)})},fetchData:function(){this.fetchAllreceipt()},handlePageChange:function(e){this.searchQuery.currentPage=e.pageNum,this.searchQuery.pageSize=e.pageSize,this.fetchData()},getSearchParam:function(e){this.searchQuery.currentPage=this.$options.data().searchQuery.currentPage,this.searchQuery.pageSize=this.$options.data().searchQuery.pageSize,Object(u.objectMerge2)(this.searchQuery.vo,e),this.fetchAllreceipt()},getSelection:function(e){this.selected=e},doAction:function(e){var t=this;if(console.log(this.selected),!this.selected.length&&"print"!==e&&"export"!==e)return this.$message({message:"请选择要操作的项~",type:"warning"}),!1;switch(e){case"export":var i=Object(u.objectMerge2)([],this.dataset);i.forEach(function(e){t.$set(e,"shipToCityName1",e.shipToCityName?e.shipToCityName.split(",")[0]:""),t.$set(e,"shipToCityName2",e.shipToCityName?e.shipToCityName.split(",")[1]:""),t.$set(e,"shipToCityName3",e.shipToCityName.split(",")[2]?e.shipToCityName.split(",")[2]:"")});var a=Object(u.objectMerge2)([],this.selected);a.forEach(function(e){t.$set(e,"shipToCityName1",e.shipToCityName?e.shipToCityName.split(",")[0]:""),t.$set(e,"shipToCityName2",e.shipToCityName?e.shipToCityName.split(",")[1]:""),t.$set(e,"shipToCityName3",e.shipToCityName.split(",")[2]?e.shipToCityName.split(",")[2]:"")}),Object(p.h)({data:a.length?a:i,columns:this.tableColumn,name:"回单接收"});break;case"print":var s=Object(u.objectMerge2)([],this.dataset);s.forEach(function(e){t.$set(e,"shipToCityName1",e.shipToCityName?e.shipToCityName.split(",")[0]:""),t.$set(e,"shipToCityName2",e.shipToCityName?e.shipToCityName.split(",")[1]:""),t.$set(e,"shipToCityName3",e.shipToCityName.split(",")[2]?e.shipToCityName.split(",")[2]:"")});var n=Object(u.objectMerge2)([],this.selected);n.forEach(function(e){t.$set(e,"shipToCityName1",e.shipToCityName?e.shipToCityName.split(",")[0]:""),t.$set(e,"shipToCityName2",e.shipToCityName?e.shipToCityName.split(",")[1]:""),t.$set(e,"shipToCityName3",e.shipToCityName.split(",")[2]?e.shipToCityName.split(",")[2]:"")}),Object(p.e)({data:n.length?n:s,columns:this.tableColumn,name:"回单接收"});break;case"accept":var o=this.selected.filter(function(e){return 109===e.acceptStatus}).map(function(e){return e.receiptId});console.log(o),o.length?(this.searchQuery.vo.receiptIds=o,this.dotInfo=o,this.popVisible=!0,this.isAccept=!0):this.$message.warning("请选择未接收项~");break;case"cancel":var r=this.selected.filter(function(e){return 110===e.acceptStatus&&111===e.giveoutStatus}).map(function(e){return e.receiptId});console.log(this.selected),r.length?(this.searchQuery.vo.receiptIds=r,Object(c.b)(this.searchQuery.vo).then(function(e){return t.$message({message:"取消接收成功~",type:"success"}),t.fetchAllreceipt(),!1}).catch(function(e){t.closeAddDot(),t._handlerCatchMsg(e)})):this.$message.warning("回单已发放不能取消~~")}this.$refs.multipleTable.clearSelection()},setColumn:function(e){this.tableColumn=e,this.tablekey=Math.random()},closeSetupTable:function(){this.setupTableVisible=!1},closeAddDot:function(){this.popVisible=!1},clickDetails:function(e,t,i){this.$refs.multipleTable.toggleRowSelection(e)},setTable:function(){this.setupTableVisible=!0},getDbClick:function(){}}}},dOqr:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=i("cYPr"),s=i("nlwN"),n=i("VU/8")(a.a,s.a,null,null,null);t.default=n.exports},f3wf:function(e,t){},"j/99":function(e,t,i){"use strict";var a=i("woOf"),s=i.n(a),n=i("E4LH"),o=i("o9X6"),r=i("9UCZ"),c=i("66wn"),l=i("0xDb");t.a={components:{SelectTree:o.a,SelectCity:c.a,SelectType:r.a},props:{btnsize:{type:String,default:"mini"},orgid:{type:Number},type:String,title:String,status:String,issender:{type:Boolean,dafault:!1}},computed:{},data:function(){return{searchCreatTime:[],defaultTime:[Object(l.parseTime)(+new Date-5184e6,"{y}-{m}-{d}"),Object(l.parseTime)(new Date,"{y}-{m}-{d}")],thestatus:"",searchForm:{shipFromOrgid:"",shipSn:"",shipFromCityCode:"",shipFromCityName:"",shipToCityCode:"",shipToCityName:"",shipSenderId:"",recName:""},rules:{shipSn:[{required:!0,trigger:"blur",validator:function(e,t,i){""!==t&&null!==t&&t&&void 0!==t?n.a.ONLY_NUMBER_AND_LETTER.test(t)?i():i(new Error("只能输字母和数字")):i(new Error("请输入运单号"))}}]},pickerOptions2:{shortcuts:l.pickerOptions2}}},watch:{orgid:function(e){this.searchForm.orgid=e},type:{handler:function(e){console.log(e),"rec_status"===e&&(this.thestatus=105),"accept_status"===e&&(this.thestatus=109),"send_status"===e&&(this.thestatus=107),"giveout_status"===e&&(this.thestatus=111)},immediate:!0}},mounted:function(){this.searchCreatTime=this.defaultTime,this.onSubmit()},methods:{getOrgid:function(e){this.searchForm.orgid=e},onSubmit:function(){this.searchForm.startTime=this.searchCreatTime?Object(l.parseTime)(this.searchCreatTime[0],"{y}-{m}-{d} ")+"00:00:00":"",this.searchForm.endTime=this.searchCreatTime?Object(l.parseTime)(this.searchCreatTime[1],"{y}-{m}-{d} ")+"23:59:59":"";var e=s()({},this.searchForm);e[this.status]=this.thestatus,this.$emit("change",e)},clearForm:function(){this.searchForm.shipSn="",this.searchForm.recName="",this.searchForm.sendName="",this.searchCreatTime=this.$options.data().searchCreatTime,this.searchForm.shipFromCityName="",this.searchForm.shipToCityName="",this.thestatus="",this.searchCreatTime=this.defaultTime}}}},nlwN:function(e,t,i){"use strict";var a={render:function(){var a=this,e=a.$createElement,s=a._self._c||e;return s("div",{directives:[{name:"loading",rawName:"v-loading",value:a.loading,expression:"loading"}],staticClass:"tab-content",on:{success:a.fetchAllreceipt}},[s("SearchForm",{attrs:{orgid:a.otherinfo.orgid,title:"接收",type:"accept_status",status:"acceptStatus",btnsize:a.btnsize},on:{change:a.getSearchParam}}),a._v(" "),s("div",{staticClass:"tab_info"},[s("div",{staticClass:"btns_box"},[s("el-button",{directives:[{name:"has",rawName:"v-has:RECE_GET",arg:"RECE_GET"}],attrs:{type:"primary",size:a.btnsize,icon:"el-icon-sort-down",plain:""},on:{click:function(e){a.doAction("accept")}}},[a._v("回单接收")]),a._v(" "),s("el-button",{directives:[{name:"has",rawName:"v-has:RECE_GETCANCEL",arg:"RECE_GETCANCEL"}],attrs:{type:"primary",size:a.btnsize,icon:"el-icon-remove-outline",plain:""},on:{click:function(e){a.doAction("cancel")}}},[a._v("取消接收")]),a._v(" "),s("el-button",{directives:[{name:"has",rawName:"v-has:RECE_EXP3",arg:"RECE_EXP3"}],attrs:{type:"primary",size:a.btnsize,icon:"el-icon-upload2",plain:""},on:{click:function(e){a.doAction("export")}}},[a._v("导出")]),a._v(" "),s("el-button",{directives:[{name:"has",rawName:"v-has:RECE_PRI3",arg:"RECE_PRI3"}],attrs:{type:"primary",size:a.btnsize,icon:"el-icon-printer",plain:""},on:{click:function(e){a.doAction("print")}}},[a._v("打印")]),a._v(" "),s("el-button",{staticClass:"table_setup",attrs:{type:"primary",size:a.btnsize,icon:"el-icon-setting",plain:""},on:{click:a.setTable}},[a._v("表格设置")])],1),a._v(" "),s("div",{staticClass:"info_tab"},[s("el-table",{key:a.tablekey,ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:a.dataset,border:"",height:"100%","tooltip-effect":"dark","default-sort":{prop:"id",order:"ascending"},stripe:""},on:{"row-dblclick":a.getDbClick,"row-click":a.clickDetails,"selection-change":a.getSelection}},[s("el-table-column",{attrs:{fixed:"",sortable:"",type:"selection",width:"50"}}),a._v(" "),a._l(a.tableColumn,function(i){return[i.slot?s("el-table-column",{key:i.id,attrs:{fixed:i.fixed,sortable:"",label:i.label,width:i.width},scopedSlots:a._u([{key:"default",fn:function(t){return[i.click?s("span",{staticClass:"clickitem",domProps:{innerHTML:a._s(i.slot(t))},on:{click:function(e){e.stopPropagation(),i.click(t)}}}):s("span",{domProps:{innerHTML:a._s(i.slot(t))}})]}}])}):s("el-table-column",{key:i.id,attrs:{fixed:i.fixed,sortable:"",label:i.label,prop:i.prop,width:i.width}})]})],2)],1)]),a._v(" "),s("div",{staticClass:"info_tab_footer"},[a._v("共计:"+a._s(a.total)+" "),s("div",{staticClass:"show_pager"},[s("Pager",{attrs:{total:a.total},on:{change:a.handlePageChange}})],1)]),a._v(" "),s("AddMark",{attrs:{popVisible:a.popVisible,issender:!0,dotInfo:a.dotInfo,searchQuery:a.searchQuery,isModify:a.isModify,isAccept:a.isAccept},on:{close:a.closeAddDot,success:a.fetchAllreceipt}}),a._v(" "),s("TableSetup",{attrs:{popVisible:a.setupTableVisible,columns:a.tableColumn},on:{close:a.closeSetupTable,success:a.setColumn}})],1)},staticRenderFns:[]};t.a=a},puNT:function(e,t,i){"use strict";var a=i("IAIf"),s=i("QcgQ");var n=function(e){i("MXEa")},o=i("VU/8")(a.a,s.a,n,null,null);t.a=o.exports},qYK6:function(e,t,i){"use strict";t.a={props:{width:{type:String,default:"400"},title:{type:String,default:"标题"},isShow:{type:Boolean,default:!1}},watch:{isShow:{handler:function(){this.isShow&&(this.shouldRender=!0)},immediate:!0}},data:function(){return{zIndex:(window.tmsPopZindex?window.tmsPopZindex+=1:window.tmsPopZindex=1e3,window.tmsPopZindex),shouldRender:!1}},methods:{close:function(){this.$emit("close")}}}},qazg:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=i("R/Zi"),s=i("NTyV");var n=function(e){i("LE6s")},o=i("VU/8")(a.a,s.a,n,null,null);t.default=o.exports},qs7E:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=i("j/99"),s=i("rkFF"),n=i("VU/8")(a.a,s.a,null,null,null);t.default=n.exports},rkFF:function(e,t,i){"use strict";var a={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-form",{staticClass:"staff_searchinfo clearfix",attrs:{inline:!0,size:t.btnsize,"label-position":"right",rules:t.rules,model:t.searchForm,"label-width":"70px"}},[i("div",{staticClass:"staff_searchinfo--input"},[i("el-form-item",{attrs:{label:"开单时间"}},[i("div",{staticClass:"block"},[i("el-date-picker",{attrs:{"default-value":t.defaultTime,type:"daterange",align:"right","value-format":"yyyy-MM-dd","start-placeholder":"开始日期","picker-options":t.pickerOptions2,"end-placeholder":"结束日期"},model:{value:t.searchCreatTime,callback:function(e){t.searchCreatTime=e},expression:"searchCreatTime"}})],1)]),t._v(" "),i("el-form-item",{attrs:{label:t.title+"状态",prop:"recStatus"}},[i("selectType",{attrs:{type:t.type},model:{value:t.thestatus,callback:function(e){t.thestatus=e},expression:"thestatus"}},[i("el-option",{attrs:{slot:"head",label:"全部",value:""},slot:"head"})],1)],1),t._v(" "),i("el-form-item",{attrs:{label:"运单号"}},[i("el-input",{attrs:{maxlength:20,"auto-complete":"off",clearable:""},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.onSubmit(e):null}},model:{value:t.searchForm.shipSn,callback:function(e){t.$set(t.searchForm,"shipSn",e)},expression:"searchForm.shipSn"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"出发城市"}},[i("el-input",{attrs:{maxlength:20,"auto-complete":"off",clearable:""},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.onSubmit(e):null}},model:{value:t.searchForm.shipFromCityName,callback:function(e){t.$set(t.searchForm,"shipFromCityName",e)},expression:"searchForm.shipFromCityName"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"到达城市"}},[i("el-input",{attrs:{maxlength:20,"auto-complete":"off",clearable:""},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.onSubmit(e):null}},model:{value:t.searchForm.shipToCityName,callback:function(e){t.$set(t.searchForm,"shipToCityName",e)},expression:"searchForm.shipToCityName"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"发货人"}},[i("el-input",{attrs:{maxlength:15,clearable:"","auto-complete":"off"},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.onSubmit(e):null}},model:{value:t.searchForm.sendName,callback:function(e){t.$set(t.searchForm,"sendName",e)},expression:"searchForm.sendName"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"收货人"}},[i("el-input",{attrs:{maxlength:15,clearable:"","auto-complete":"off"},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.onSubmit(e):null}},model:{value:t.searchForm.recName,callback:function(e){t.$set(t.searchForm,"recName",e)},expression:"searchForm.recName"}})],1)],1),t._v(" "),i("el-form-item",{staticClass:"staff_searchinfo--btn"},[i("el-button",{attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v("查询")]),t._v(" "),i("el-button",{attrs:{type:"info",plain:""},on:{click:t.clearForm}},[t._v("清空")])],1)],1)},staticRenderFns:[]};t.a=a}});