webpackJsonp([147,278,334],{"1onU":function(e,t,i){"use strict";var o=i("VT+v"),a=i("SgVa");var n=function(e){i("FiTa"),i("7CJ8")},s=i("VU/8")(o.a,a.a,n,"data-v-4b7ed4df",null);t.a=s.exports},"58x0":function(e,t,i){"use strict";var o=i("woOf"),a=i.n(o),n=(i("E4LH"),i("o9X6")),s=i("pAQG"),r=i("0xDb");t.a={components:{SelectTree:n.a,querySelect:s.a},props:{btnsize:{type:String,default:"mini"},orgid:{type:Number}},data:function(){return{searchForm:{shipSn:"",shipFromCityName:"",shipToCityName:"",senderCustomerName:""},rules:{},searchTime:[Object(r.parseTime)(new Date-5184e6),Object(r.parseTime)(new Date)],defaultTime:[Object(r.parseTime)(new Date-5184e6),Object(r.parseTime)(new Date)],pickerOptions2:{shortcuts:r.pickerOptions2}}},mounted:function(){},methods:{onSubmit:function(){var e=a()({},this.searchForm);this.searchTime&&(this.$set(e,"startTime",Object(r.parseTime)(this.searchTime[0],"{y}-{m}-{d} ")+"00:00:00"),this.$set(e,"endTime",Object(r.parseTime)(this.searchTime[1],"{y}-{m}-{d} ")+"23:59:59")),this.$emit("change",e)},clearForm:function(e){var t=this;this.$nextTick(function(){a()(t.$data,t.$options.data()),t.$refs[e].resetFields(),t.searchTime=t.$options.data().searchTime})}}}},"5swg":function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=i("58x0"),a=i("8AeK"),n=i("VU/8")(o.a,a.a,null,null,null);t.default=n.exports},"7BEH":function(e,t){},"7CJ8":function(e,t){},"8AeK":function(e,t,i){"use strict";var o={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-form",{ref:"searchForm",staticClass:"staff_searchinfo clearfix",attrs:{inline:!0,size:t.btnsize,"label-position":"right",rules:t.rules,model:t.searchForm,"label-width":"70px"}},[i("div",{staticClass:"staff_searchinfo--input"},[i("el-form-item",{attrs:{label:"开单时间"}},[i("el-date-picker",{attrs:{"default-value":t.defaultTime,type:"daterange",align:"right","value-format":"yyyy-MM-dd HH:mm:ss","start-placeholder":"开始日期","picker-options":t.pickerOptions2,"end-placeholder":"结束日期"},model:{value:t.searchTime,callback:function(e){t.searchTime=e},expression:"searchTime"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"运单号",prop:"shipSn"}},[i("querySelect",{attrs:{search:"shipSn",type:"order",valuekey:"shipSn",maxlength:15},model:{value:t.searchForm.shipSn,callback:function(e){t.$set(t.searchForm,"shipSn",e)},expression:"searchForm.shipSn"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"出发城市"}},[i("el-input",{attrs:{maxlength:15},model:{value:t.searchForm.shipFromCityName,callback:function(e){t.$set(t.searchForm,"shipFromCityName",e)},expression:"searchForm.shipFromCityName"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"到达城市"}},[i("el-input",{attrs:{maxlength:15},model:{value:t.searchForm.shipToCityName,callback:function(e){t.$set(t.searchForm,"shipToCityName",e)},expression:"searchForm.shipToCityName"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"发货人",prop:"senderCustomerName"}},[i("el-input",{attrs:{maxlength:15},model:{value:t.searchForm.senderCustomerName,callback:function(e){t.$set(t.searchForm,"senderCustomerName",e)},expression:"searchForm.senderCustomerName"}})],1)],1),t._v(" "),i("el-form-item",{staticClass:"staff_searchinfo--btn"},[i("el-button",{attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v("查询")]),t._v(" "),i("el-button",{attrs:{type:"info",plain:""},on:{click:function(e){t.clearForm("searchForm")}}},[t._v("清空")])],1)],1)},staticRenderFns:[]};t.a=o},FiTa:function(e,t){},IAIf:function(e,t,i){"use strict";var o=i("woOf"),r=i.n(o),a=i("DAYN"),n=i.n(a),l=i("0xDb"),c=i("t5DY");t.a={props:{popVisible:{type:Boolean,default:!1},columns:{type:Array,default:[]},code:{type:String,default:""}},components:{draggable:n.a},computed:{isShow:{get:function(){return this.popVisible},set:function(){}}},data:function(){return{orgColumnData:[],columnData:[],orgShowColumnData:[],showColumnData:[],list:[],rightList:[],listKey:0,isIndeterminateLeft:!0,isIndeterminateRight:!0,checkAllLeft:!1,checkAllRight:!1,checkListLeft:[],checkListRight:[],searchLeft:"",searchRight:"",leftListLen:0,rightListLen:0,columnListLen:0,isCheck:!0,maxLen:50,rightCheckLen:0,leftCheckLen:0,thecode:""}},mounted:function(){var o=this,e=this.code;this.$route.meta.code;this.thecode="","NOSET"===e?this.convertData():e?this.thecode=e:this.convertData(),this.thecode&&(this.fetchTableSetup(),this.eventBus.$on("tablesetup.change",function(e,t){if(e&&e===o.thecode)if(t.prop){var i=o.showColumnData.filter(function(e){return e.prop===t.prop});i.length&&(i[0].width=t.width,o.changeTbaleSetup())}else t.forEach(function(t){var e=o.showColumnData.filter(function(e){return e.prop===t.prop});e.length&&(e[0].width=t.width)}),o.changeTbaleSetup()}))},methods:{convertData:function(e){this.initData(e),this.callback()},initData:function(t){var e=Object(l.objectMerge2)([],this.columns);e=this.sort(e),(t=t||e).forEach(function(i){"shipFromCityName"!==i.prop&&"shipToCityName"!==i.prop||i.slot||(i.slot=function(e){var t=(e.row[i.prop]||"").split(",");return t[2]||t[1]||t[0]||""})});var s=this.maxLen,i=function(e){var a=[];if(0<t.length){var n=0;t.forEach(function(e,t){if(e.hidden){var i=Object(l.objectMerge2)(e);i.key=t,a.push(i)}else n++;if(s<n){var o=Object(l.objectMerge2)(e);o.key=t,o.hidden=!0,a.push(o)}})}return a},o=function(e){var o=[];if(0<t.length){var a=0;t.forEach(function(e,t){if(!e.hidden&&a<s){a++;var i=Object(l.objectMerge2)(e);i.hidden=!1,i.key=t,o.push(i)}})}return o},a=i().length,n=o().length;this.orgColumnData=i(),this.columnData=i(),this.orgShowColumnData=o(),this.showColumnData=o(),this.leftListLen=a,this.rightListLen=n,this.columnListLen=t.length},sort:function(e){var t=[],i=[];return e.forEach(function(e){e.fixed?t.push(e):i.push(e)}),t.concat(i)},doAction:function(e){switch(e){case"goRight":this.goRight();break;case"goLeft":this.goLeft()}},fetchFail:function(){this.thecode="",this.convertData()},fetchTableSetup:function(){var s=this;return Object(c.i)(this.otherinfo.orgid,this.thecode).then(function(e){var t=e.data;if((s.orgdata=t)&&t.length){if(Array.isArray(t[0])&&(t=t[0]),t.length<=1)return console.log("后台返回表格数据异常:",t),s.fetchFail(),!1;s.orgdata=t;var a=[],n=s.columns.length;t.sort(function(e,t){return e.titleOrder>t.titleOrder?1:-1}),t.forEach(function(e){var t=r()({},e);t.label=t.label||t.lable;for(var i=0;i<n;i++)if(s.columns[i].prop===e.prop){for(var o in s.columns[i])void 0!==t[o]&&null!==t[o]||(t[o]=s.columns[i][o]);break}a.push(t)}),s.columns.forEach(function(t){0===a.filter(function(e){return e.prop===t.prop}).length&&(console.log("本地项，需要后台添加：",t),a.push(t))}),a=s.sort(a),s.convertData(a)}else s.fetchFail()}).catch(function(e){s.fetchFail()})},changeTbaleSetup:function(){var t=this;if(this.thecode)return Object(c.q)(this.otherinfo.orgid,this.thecode,this.formatColumn(this.showColumnData)).then(function(e){t.$message.info("保存成功")}).catch(function(e){t._handlerCatchMsg(e)})},formatColumn:function(e){var n=this.orgdata,s=[],r=0;return e.forEach(function(t){var e=n.filter(function(e){return e.prop===t.prop});if(e.length){var i={},o=e[0];for(var a in o)i[a]=t[a];i.hidden=!1,i.titleOrder=++r,s.push(i)}}),this.columnData.forEach(function(t){var e=n.filter(function(e){return e.prop===t.prop});if(e.length){var i={},o=e[0];for(var a in o)i[a]=t[a];i.hidden=!0,i.titleOrder=++r,s.push(i)}}),s},checkRightLen:function(){this.showColumnData.length>this.maxLen?(this.$message({type:"warning",message:"列表最多只能显示"+this.maxLen+"个字段。"}),this.isCheck=!0):this.isCheck=!1},canDragStart:function(e){},setChangeData:function(){this.reRenderData()},reRenderData:function(){var e=Object(l.objectMerge2)([],this.showColumnData);this.showColumnData=this.sort(e)},setColumnLen:function(){this.leftListLen=this.columnData.length,this.rightListLen=this.showColumnData.length},handChangeAllLeft:function(e){this.checkListLeft=e?r()([],this.columnData):[],this.leftCheckLen=this.checkListLeft.length,this.isIndeterminateLeft=!1},handChangeAllRight:function(e){this.checkListRight=e?r()([],this.showColumnData):[],this.rightCheckLen=this.checkListRight.length,this.isIndeterminateRight=!1},goRight:function(){var t=this;if(this.checkListLeft.length+this.rightListLen>this.maxLen||this.rightListLen>this.maxLen-1)return this.$message({type:"warning",message:"列表最多只能显示"+this.maxLen+"个字段。"}),!1;this.columnData=this.columnData.filter(function(e){return-1===t.checkListLeft.indexOf(e)||(e.fixed=!1,t.showColumnData.push(e),!1)}),this.orgColumnData=this.orgColumnData.filter(function(e){return-1===t.checkListLeft.indexOf(e)||(e.fixed=!1,t.orgShowColumnData.push(e),!1)}),this.checkListLeft=[],this.setColumnLen(),this.leftCheckLen=0,this.reRenderData()},goLeft:function(){var o=this;this.checkListRight.forEach(function(e,t){o.columnData.push(e),o.orgColumnData.push(e);var i=o.showColumnData.indexOf(e);-1!==i&&o.showColumnData.splice(i,1),-1!==o.orgShowColumnData.indexOf(e)&&o.orgShowColumnData.splice(i,1)}),this.checkListRight=[],this.setColumnLen(),this.rightCheckLen=0,this.reRenderData()},dbCheckItemLeft:function(e,t,i){if(this.rightListLen>this.maxLen-1)return this.$message({type:"warning",message:"列表最多只能显示"+this.maxLen+"个字段。"}),!1;e.fixed=!1,this.showColumnData.push(e),this.orgShowColumnData.push(e),this.columnData.splice(t,1),this.orgColumnData.splice(t,1),this.setColumnLen(),this.reRenderData()},dbCheckItemRight:function(e,t,i){this.columnData.push(e),this.orgColumnData.push(e),this.showColumnData.splice(t,1),this.orgShowColumnData.splice(t,1),this.setColumnLen(),this.reRenderData()},handleCheckChangeLeft:function(e){this.leftCheckLen=e.length},handleCheckChangeRight:function(e){this.rightCheckLen=e.length},querySearchLeft:function(e,t){void 0===(this.searchLeft=e).label&&(this.searchLeft||(this.columnData=r()([],this.orgColumnData)));var i=r()([],this.orgColumnData);t(e?i.filter(this.createFilter(e)):i)},querySearchRight:function(e,t){void 0===(this.searchRight=e).label&&(this.searchRight||(this.showColumnData=r()([],this.orgShowColumnData)));var i=r()([],this.orgShowColumnData);t(e?i.filter(this.createFilter(e)):i)},createFilter:function(t){return function(e){return 0===e.label.toLowerCase().indexOf(t.toLowerCase())}},handleSearchLeft:function(e){var t=this;this.searchLeft=e?e.label:"";var i=r()([],this.columnData);i.forEach(function(e){e.label===t.searchLeft&&(i=[]).push(e)}),this.columnData=r()([],i),i=[]},handleSearchRight:function(e){var t=this;this.searchRight=e?e.label:"";var i=r()([],this.showColumnData);i.forEach(function(e){e.label===t.searchRight&&(i=[]).push(e)}),this.showColumnData=r()([],i),i=[]},closeMe:function(e){this.$emit("close"),"function"==typeof e&&e()},handleChange:function(e,t,i){this.rightList=r()([],e)},handleSwitch:function(e,t){e.fixed=!e.fixed,this.reRenderData()},callback:function(){var e=r()([],this.showColumnData);e.forEach(function(e){!e.label&&e.lable&&(e.label=e.lable)}),this.$emit("success",e),this.listKey=Math.random(),this.closeMe()},submitForm:function(){var t=this;this.thecode?this.changeTbaleSetup().then(function(e){t.callback()}):this.callback()}}}},Lghf:function(e,t,i){"use strict";var o={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-dialog",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"tms_dialog",attrs:{title:t.popTitle,visible:t.isShow,"close-on-click-modal":!1,"before-close":t.closeMe},on:{"update:visible":function(e){t.isShow=e}}},[i("el-form",{ref:"ruleForm",staticClass:"colorpickerForm",attrs:{model:t.repertorySetting,rules:t.rules}},[i("el-form-item",{staticClass:"colorpickerItem",attrs:{prop:"sectionOne"}},[i("b",[t._v("超过：")]),t._v(" "),i("el-input",{model:{value:t.repertorySetting.sectionOne,callback:function(e){t.$set(t.repertorySetting,"sectionOne",e)},expression:"repertorySetting.sectionOne"}}),i("b",[t._v("小时的库存颜色")]),t._v(" "),i("el-color-picker",{attrs:{predefine:t.predefineColors},model:{value:t.repertorySetting.sectionOneColour,callback:function(e){t.$set(t.repertorySetting,"sectionOneColour",t._n(e))},expression:"repertorySetting.sectionOneColour"}})],1),t._v(" "),i("el-form-item",{staticClass:"colorpickerItem",attrs:{prop:"sectionTwo"}},[i("b",[t._v("超过：")]),t._v(" "),i("el-input",{model:{value:t.repertorySetting.sectionTwo,callback:function(e){t.$set(t.repertorySetting,"sectionTwo",e)},expression:"repertorySetting.sectionTwo"}}),i("b",[t._v("小时的库存颜色")]),t._v(" "),i("el-color-picker",{attrs:{predefine:t.predefineColors},model:{value:t.repertorySetting.sectionTwoColour,callback:function(e){t.$set(t.repertorySetting,"sectionTwoColour",t._n(e))},expression:"repertorySetting.sectionTwoColour"}})],1),t._v(" "),i("el-form-item",{staticClass:"colorpickerItem",attrs:{prop:"sectionThree"}},[i("b",[t._v("超过：")]),t._v(" "),i("el-input",{model:{value:t.repertorySetting.sectionThree,callback:function(e){t.$set(t.repertorySetting,"sectionThree",e)},expression:"repertorySetting.sectionThree"}}),i("b",[t._v("小时的库存颜色")]),t._v(" "),i("el-color-picker",{attrs:{predefine:t.predefineColors},model:{value:t.repertorySetting.sectionThreeColour,callback:function(e){t.$set(t.repertorySetting,"sectionThreeColour",t._n(e))},expression:"repertorySetting.sectionThreeColour"}})],1)],1),t._v(" "),i("div",{attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{type:"primary"},on:{click:function(e){t.submitForm("ruleForm")}}},[t._v("确 定")]),t._v(" "),i("el-button",{on:{click:t.closeMe}},[t._v("取 消")])],1)],1)},staticRenderFns:[]};t.a=o},MXEa:function(e,t){},QcgQ:function(e,t,i){"use strict";var o={render:function(){var o=this,e=o.$createElement,a=o._self._c||e;return a("el-dialog",{staticClass:"tms_dialog",attrs:{title:"表格设置",visible:o.isShow,"append-to-body":"","close-on-click-modal":!1,"before-close":o.closeMe},on:{"update:visible":function(e){o.isShow=e}}},[a("div",{staticClass:"tableSetup_warp"},[a("div",{staticClass:"tableSetup_list"},[a("div",{staticClass:"tableSetup_head"},[a("div",{staticClass:"tableSetup_head_select"},[o._v("选择："+o._s(o.leftCheckLen))]),o._v(" "),a("el-checkbox",{attrs:{indeterminate:o.isIndeterminateLeft},on:{change:o.handChangeAllLeft},model:{value:o.checkAllLeft,callback:function(e){o.checkAllLeft=e},expression:"checkAllLeft"}},[o._v("隐藏列  "+o._s(o.leftListLen)+" / "+o._s(o.columnListLen))]),o._v(" "),a("div",{staticStyle:{margin:"3px 0"}},[a("el-autocomplete",{staticClass:"inline-input",attrs:{"fetch-suggestions":o.querySearchLeft,placeholder:"请输入内容",size:"mini"},on:{select:o.handleSearchLeft},scopedSlots:o._u([{key:"default",fn:function(e){var t=e.item;return[a("span",[o._v(o._s(t.label))])]}}]),model:{value:o.searchLeft,callback:function(e){o.searchLeft=e},expression:"searchLeft"}},[a("i",{staticClass:"el-icon-search el-input__icon",attrs:{slot:"suffix"},slot:"suffix"})])],1)],1),o._v(" "),a("div",{staticClass:"tableSetup_content"},[a("el-checkbox-group",{on:{change:o.handleCheckChangeLeft},model:{value:o.checkListLeft,callback:function(e){o.checkListLeft=e},expression:"checkListLeft"}},[a("transition-group",{key:o.listKey,attrs:{name:"el-zoom-in-center"}},o._l(o.columnData,function(t,i){return a("div",{key:i,staticClass:"tableSetup_item",on:{dblclick:function(e){o.dbCheckItemLeft(t,i,e)}}},[a("el-checkbox",{attrs:{label:t}},[o._v("\n                "+o._s(t.label)+"\n              ")])],1)}))],1)],1),o._v(" "),a("div",{staticClass:"tableSetup_tips"},[a("span",[o._v("双击，可快速左右切换。")])])]),o._v(" "),a("div",{staticClass:"tableSetup_btn"},[a("el-button",{attrs:{type:"primary",icon:"el-icon-arrow-right"},on:{click:function(e){o.doAction("goRight")}}}),o._v(" "),a("br"),o._v(" "),a("el-button",{attrs:{type:"primary",icon:"el-icon-arrow-left"},on:{click:function(e){o.doAction("goLeft")}}})],1),o._v(" "),a("div",{staticClass:"tableSetup_list"},[a("div",{staticClass:"tableSetup_head"},[a("div",{staticClass:"tableSetup_head_select"},[o._v("选择："+o._s(o.rightCheckLen))]),o._v(" "),a("el-checkbox",{attrs:{indeterminate:o.isIndeterminateRight},on:{change:o.handChangeAllRight},model:{value:o.checkAllRight,callback:function(e){o.checkAllRight=e},expression:"checkAllRight"}},[o._v("显示列 "+o._s(o.rightListLen)+" / "+o._s(o.columnListLen))]),o._v(" "),a("div",{staticStyle:{margin:"3px 0"}},[a("el-autocomplete",{staticClass:"inline-input",attrs:{"fetch-suggestions":o.querySearchRight,placeholder:"请输入内容",size:"mini"},on:{select:o.handleSearchRight},scopedSlots:o._u([{key:"default",fn:function(e){var t=e.item;return[a("span",[o._v(o._s(t.label))])]}}]),model:{value:o.searchRight,callback:function(e){o.searchRight=e},expression:"searchRight"}},[a("i",{staticClass:"el-icon-search el-input__icon",attrs:{slot:"suffix"},slot:"suffix"})])],1)],1),o._v(" "),a("div",{staticClass:"tableSetup_content"},[a("el-checkbox-group",{on:{change:o.handleCheckChangeRight},model:{value:o.checkListRight,callback:function(e){o.checkListRight=e},expression:"checkListRight"}},[a("draggable",{staticClass:"dragArea",attrs:{move:o.canDragStart,list:o.showColumnData},on:{change:o.setChangeData}},[a("transition-group",{attrs:{name:"el-zoom-in-center"}},o._l(o.showColumnData,function(t,i){return a("div",{key:i,staticClass:"tableSetup_item",on:{dblclick:function(e){o.dbCheckItemRight(t,i,e)}}},[a("el-checkbox",{attrs:{label:t}},[o._v("\n                  "+o._s(t.label)+"\n                ")]),o._v(" "),a("el-switch",{attrs:{value:t.fixed,"active-text":t.fixed?"固定":"活动"},on:{change:function(e){o.handleSwitch(t,i)}}})],1)}))],1)],1)],1),o._v(" "),a("div",{staticClass:"tableSetup_tips"},[a("span",[o._v("拖拽，可调整上下顺序。")]),o._v(" "),a("br"),a("span",[o._v("列表最多只能显示"+o._s(o.maxLen)+"个字段。")])])])]),o._v(" "),a("div",{attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"primary"},on:{click:function(e){o.submitForm()}}},[o._v("确 定")]),o._v(" "),a("el-button",{on:{click:o.closeMe}},[o._v("取 消")])],1)])},staticRenderFns:[]};t.a=o},SgVa:function(e,t,i){"use strict";var o={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"tms-pagenation"},[i("span",{staticClass:"page-num",class:{disabled:t.pageNum<=1},on:{click:function(e){t.jumpTo(1)}}},[i("span",{staticClass:"first-page"})]),i("span",{staticClass:"page-num",class:{disabled:t.pageNum<=1},on:{click:function(e){t.jumpTo(t.pageNum-1)}}},[i("span",{staticClass:"prev-page"})]),t._v(" "),i("span",{staticClass:"page-jumper"},[t._v("\n    第\n    "),i("el-input",{ref:"input",staticClass:"el-pagination__editor is-in-pagination",attrs:{min:1,max:t.pages,type:"number",disabled:t.pages<=1},on:{change:t.handleChange,focus:t.handleFocus,blur:t.handleBlur},nativeOn:{keydown:function(e){return t.handleKeyup(e)}},model:{value:t.inputval,callback:function(e){t.inputval="string"==typeof e?e.trim():e},expression:"inputval"}}),t._v(" 页\n  ")],1),t._v("\n  /共 "+t._s(t.pages)+" 页\n  "),i("span",{staticClass:"page-num",class:{disabled:t.pageNum===t.pages},on:{click:function(e){t.jumpTo(t.pageNum+1)}}},[i("span",{staticClass:"next-page"})]),t._v(" "),i("span",{staticClass:"page-num",class:{disabled:t.pageNum===t.pages},on:{click:function(e){t.jumpTo(t.pages)}}},[i("span",{staticClass:"last-page"})]),t._v(" "),i("span",{staticClass:"tms-pagination__sizes"},[i("el-select",{staticClass:"page-select",attrs:{placeholder:"请选择"},on:{change:t.sizesChange},model:{value:t.size,callback:function(e){t.size=e},expression:"size"}},t._l(t.sizes,function(e,t){return i("el-option",{key:t,attrs:{label:e,value:e}})}))],1)])},staticRenderFns:[]};t.a=o},"VT+v":function(e,t,i){"use strict";t.a={props:{sizes:{type:Array,default:function(){return[100,200,300,400]}},total:{type:Number,default:0}},computed:{pages:function(){return Math.ceil(this.total/this.size)}},watch:{pageNum:function(){this.inputval=this.pageNum},size:function(){this.pageNum=1}},mounted:function(){this.size=this.sizes[0]},data:function(){return{pageNum:1,oldValue:0,inputval:1,oldNum:1,size:100}},methods:{handleFocus:function(e){this.oldValue=e.target.value},sizesChange:function(){this.pageNum=1,this.oldNum=this.pageNum,this.$emit("change",{pageNum:this.pageNum,pageSize:this.size})},changeEvent:function(){this.oldNum!==this.pageNum&&(this.oldNum=this.pageNum,this.$emit("change",{pageNum:this.pageNum,pageSize:this.size}))},handleCurrentChange:function(e){this.pageNum=e,this.changeEvent()},handleSizeChange:function(e){this.size=e,this.changeEvent()},handleChange:function(e){var t=parseInt(e,10);isNaN(t)?this.inputval=1:t<1?this.inputval=1:t>this.pages?this.inputval=this.pages:this.inputval=t},handleBlur:function(e){var t=e.target;this.handleChange(t.value),this.jumpTo(this.inputval)},handleKeyup:function(e){var t=e.keyCode,i=e.target;console.log("page keydown:",t,i),13===t&&this.oldValue&&i.value!==this.oldValue&&(this.handleChange(i.value),this.oldValue="")},jumpTo:function(e){e<1?this.pageNum=1:e>this.pages?this.pageNum=this.pages:this.pageNum=e,this.changeEvent()}}}},WIPA:function(e,t,i){"use strict";var o=i("woOf"),a=i.n(o),n=i("Dd8w"),s=i.n(n),r=i("bOdI"),l=i.n(r),c=i("sPV7"),h=i("NYxO"),u=i("5swg"),p=i("p6zF"),d=i("1onU"),f=i("0xDb"),m=i("puNT"),g=i("Mqi+"),b=i("UQm2");t.a={components:{Pager:d.a,SearchForm:u.default,Colorpicker:p.default,TableSetup:m.a},data:function(){return l()({setupTableVisible:!1,tablekey:0,tableColumn:[],total:0,btnsize:"mini",repertoryArr:[],selected:[],loading:!0,colorpickerVisible:!1,isModify:!1,selectInfo:[],selectionColorSetting:{},reportorSelect:{},searchQuery:{currentPage:1,pageSize:100,vo:{orgId:1}}},"tableColumn",[{label:"运单号",prop:"shipSn",width:"110",fixed:!0},{label:"运单状态",prop:"shipStatusName",width:"120"},{label:"运单标识",prop:"shipIdentifying",width:"120",slot:function(e){return Object(g.b)(e.row.shipIdentifying)}},{label:"入库时间",prop:"repertoryCreateTime",width:"160",slot:function(e){return""+Object(f.parseTime)(e.row.repertoryCreateTime,"{y}-{m}-{d} {h}:{i}:{s}")}},{label:"库存时长",prop:"hashour",width:"110"},{label:"开单网点",prop:"fromOrgName",width:"110"},{label:"开单时间",prop:"createTime",width:"160",slot:function(e){return""+Object(f.parseTime)(e.row.repertoryCreateTime,"{y}-{m}-{d} {h}:{i}:{s}")}},{label:"货品名",prop:"cargoName",width:"150"},{label:"库存件数",prop:"repertoryAmount",width:"90"},{label:"库存重量",prop:"repertoryWeight",width:"90"},{label:"库存体积",prop:"repertoryVolume",width:"90"},{label:"运单件数",prop:"cargoAmount",width:"90"},{label:"运单重量",prop:"cargoWeight",width:"90"},{label:"运单体积",prop:"cargoVolume",width:"90"},{label:"出发城市",prop:"shipFromCityName",width:"150"},{label:"到达城市",prop:"shipToCityName",width:"150"},{label:"发货人",prop:"senderCustomerName",width:"100"},{label:"发货人电话",prop:"receiverCustomerMobile",width:"110"},{label:"收货人",prop:"receiverCustomerName",width:"100"},{label:"收货人电话",prop:"receiverCustomerMobile",width:"110"},{label:"交接方式",prop:"shipDeliveryMethodName",width:"90"},{label:"运费",prop:"shipFee",width:"90"},{label:"提货费",prop:"pickupFee",width:"90"},{label:"回扣",prop:"brokerageFee",width:"90"},{label:"保险费",prop:"insuranceFee",width:"90"},{label:"声明价值",prop:"productPrice",width:"90"},{label:"包装费",prop:"packageFee",width:"90"},{label:"送货费",prop:"deliveryFee",width:"90"},{label:"运费合计",prop:"shipTotalFee",width:"90"},{label:"付款方式",prop:"shipPayWayName",width:"90"},{label:"现付",prop:"shipNowpayFee",width:"90"},{label:"到付",prop:"shipArrivepayFee",width:"90"},{label:"回单付",prop:"shipReceiptpayFee",width:"90"},{label:"月结",prop:"shipMonthpayFee",width:"90"},{label:"备注",prop:"shipRemarks",width:"150"},{label:"发货方",prop:"senderCustomerUnit",width:"120"},{label:"发货地址",prop:"senderDetailedAddress",width:"150"},{label:"收货方",prop:"receiverCustomerUnit",width:"120"},{label:"收货地址",prop:"receiverDetailedAddress",width:"150"},{label:"货号",prop:"shipGoodsSn",width:"150"},{label:"品种规格",prop:"description",width:"100"},{label:"件数单价",prop:"amountFee",width:"90"},{label:"重量单价",prop:"weightFee",width:"90"},{label:"体积单价",prop:"volumeFee",width:"90"},{label:"回单号",prop:"shipReceiptSn",width:"150"},{label:"回单要求",prop:"shipReceiptRequireName",width:"150"},{label:"回单份数",prop:"shipReceiptNum",width:"90"},{label:"代收款手续费",prop:"commissionFee",width:"120"},{label:"客户单号",prop:"shipCustomerNumber",width:"90"},{label:"运输方式",prop:"shipShippingTypeName",width:"100"},{label:"业务类型",prop:"shipBusinessType",width:"100"},{label:"时效",prop:"shipEffectiveName",width:"100"},{label:"上楼费",prop:"goupstairsFee",width:"90"},{label:"叉车费",prop:"forkliftFee",width:"90"},{label:"装卸费",prop:"handlingFee",width:"90"},{label:"入仓费",prop:"housingFee",width:"90"}])},computed:s()({},Object(h.b)(["otherinfo"]),{orgid:function(){return this.isModify?this.selectInfo.orgid:this.searchQuery.vo.orgId||this.otherinfo.orgid}}),mounted:function(){this.searchQuery.vo.orgId=this.otherinfo.orgid,this.fetchAllOrderRepertory()},methods:{getSumLeft:function(e,t){return Object(f.getSummaries)(e,f.operationPropertyCalc)},tableRowColor:function(e){var t=e.row;e.rowIndex;return Number(this.selectionColorSetting.sectionOne)<Number(t.hashours)&&Number(t.hashours)<Number(this.selectionColorSetting.sectionTwo)+1?{color:this.selectionColorSetting.sectionOneColour}:Number(this.selectionColorSetting.sectionTwo)<Number(t.hashours)&&Number(t.hashours)<Number(this.selectionColorSetting.sectionThree)+1?{color:this.selectionColorSetting.sectionTwoColour}:Number(this.selectionColorSetting.sectionThree)<Number(t.hashours)?{color:this.selectionColorSetting.sectionThreeColour}:{color:"#333"}},getSearchParam:function(e){this.searchQuery.currentPage=this.$options.data().searchQuery.currentPage,this.searchQuery.pageSize=this.$options.data().searchQuery.pageSize,this.searchQuery.vo=a()(this.searchQuery.vo,e),this.fetchAllOrderRepertory()},doAction:function(e){switch(e){case"colorpicker":this.reportorSelect=this.selected,this.openColor();break;case"export":this.closeColorpicker(),Object(b.g)({data:this.selected.length?this.selected:this.repertoryArr,columns:this.tableColumn,name:"到货库存"});break;case"print":this.closeColorpicker(),Object(b.d)({data:this.selected.length?this.selected:this.repertoryArr,columns:this.tableColumn,name:"到货库存"})}},showDetail:function(e){this.eventBus.$emit("showOrderDetail",e.shipId,e.shipSn,!0),console.log(e.shipId)},setTable:function(){this.setupTableVisible=!0},closeSetupTable:function(){this.setupTableVisible=!1},clickDetails:function(e){this.$refs.multipleTable.toggleRowSelection(e)},getSelection:function(e){this.selected=e},handlePageChange:function(e){this.searchQuery.currentPage=e.pageNum,this.searchQuery.pageSize=e.pageSize,this.fetchAllOrderRepertory()},fetchAllOrderRepertory:function(){this.getAllOrderRepertory()},openColor:function(){this.colorpickerVisible=!0},closeColorpicker:function(){this.colorpickerVisible=!1},getAllOrderRepertory:function(){var t=this;return this.loading=!0,this.$set(this.searchQuery.vo,"repertoryType",2),Object(c.b)(this.searchQuery).then(function(e){t.repertoryArr=e.list,t.total=e.total,t.loading=!1}).catch(function(e){t._handlerCatchMsg(e),t.loading=!1})},setColumColor:function(e){this.selectionColorSetting=e,this.closeColorpicker(),this.fetchAllOrderRepertory()},setColumn:function(e){this.tableColumn=e,this.tablekey=Math.random()}}}},"oD/q":function(e,t,i){"use strict";var o,a=i("bOdI"),n=i.n(a),s=i("Dd8w"),r=i.n(s),l=(i("P5Di"),i("sPV7")),c=(i("E4LH"),i("NYxO")),h=i("0xDb");t.a=(o={data:function(){return{popTitle:"提醒颜色设置",repertorySetting:{},loading:!1,isShow:!1,rules:{sectionOne:[{validator:function(e,t,i){t<0||12<t?i(new Error("请输入0-12的数字")):i()},tigger:"blur"}],sectionTwo:[{validator:function(e,t,i){t<12||24<t?i(new Error("请输入12-24的数字")):i()},tigger:"blur"}],sectionThree:[{validator:function(e,t,i){t<24?i(new Error("请输入大于24的数字")):i()},tigger:"blur"}]},colorSetting:[],miniInput:"70px",predefineColors:["#ff4500","#ff8c00","#ffd700","#90ee90","#00ced1","#1e90ff","#c71585"]}},computed:{isShow:{get:function(){return this.popVisible},set:function(){}}},props:{popVisible:{type:Boolean,default:!1}},watch:{popVisible:function(){this.popVisible?this.isShow=!0:this.isShow=!1}},mounted:function(){this.getColor()}},n()(o,"computed",r()({},Object(c.b)(["otherinfo"]))),n()(o,"methods",{closeMe:function(e){this.$emit("close"),"function"==typeof e&&e()},getColor:function(){var i=this;Object(l.a)(this.otherinfo.orgid).then(function(e){if(e){var t=e.data.repertorySetting;i.$nextTick(function(){i.repertorySetting=Object(h.objectMerge2)({},t),i.colorSetting=e.data,i.$emit("success",i.colorSetting.repertorySetting)})}}).catch(function(e){i._handlerCatchMsg(e)})},submitForm:function(i){var o=this;this.$refs[i].validate(function(e){if(e){o.loading=!0;var t={};o.$set(t,"repertorySetting",o.repertorySetting),Object(l.c)(t,o.otherinfo.orgid,o.colorSetting.id).then(function(e){o.$message({type:"success",message:"修改成功"}),o.loading=!1,o.isShow=!1,o.getColor(),o.$nextTick(function(){o.$refs[i].resetFields()})}).catch(function(e){o._handlerCatchMsg(e),o.loading=!1})}})}}),o)},p6zF:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=i("oD/q"),a=i("Lghf");var n=function(e){i("7BEH")},s=i("VU/8")(o.a,a.a,n,null,null);t.default=s.exports},pHZc:function(e,t,i){"use strict";var o={render:function(){var o=this,e=o.$createElement,a=o._self._c||e;return a("div",{directives:[{name:"loading",rawName:"v-loading",value:o.loading,expression:"loading"}],staticClass:"tab-content"},[a("SearchForm",{attrs:{orgid:o.otherinfo.orgid,btnsize:o.btnsize},on:{change:o.getSearchParam}}),o._v(" "),a("div",{staticClass:"tab_info"},[a("div",{staticClass:"btns_box"},[a("el-button",{directives:[{name:"has",rawName:"v-has:ORDER_COLOUR3",arg:"ORDER_COLOUR3"}],attrs:{type:"primary",size:o.btnsize,icon:"el-icon-menu",plain:""},on:{click:function(e){o.doAction("colorpicker")}}},[o._v("提醒颜色设置")]),o._v(" "),a("el-button",{directives:[{name:"has",rawName:"v-has:ORDER_COLOURP3",arg:"ORDER_COLOURP3"}],attrs:{type:"primary",size:o.btnsize,icon:"el-icon-printer",plain:""},on:{click:function(e){o.doAction("print")}}},[o._v("打印")]),o._v(" "),a("el-button",{directives:[{name:"has",rawName:"v-has:ORDER_COLOUREXP3",arg:"ORDER_COLOUREXP3"}],attrs:{type:"primary",size:o.btnsize,icon:"el-icon-download",plain:""},on:{click:function(e){o.doAction("export")}}},[o._v("导出")]),o._v(" "),a("el-button",{staticClass:"table_setup",attrs:{type:"primary",size:o.btnsize,icon:"el-icon-setting",plain:""},on:{click:o.setTable}},[o._v("表格设置")])],1),o._v(" "),a("div",{staticClass:"info_tab"},[a("el-table",{key:o.tablekey,ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:o.repertoryArr,border:"",height:"100%","tooltip-effect":"dark","summary-method":o.getSumLeft,"show-summary":"","row-style":o.tableRowColor,"default-sort":{prop:"id",order:"ascending"}},on:{"row-dblclick":o.showDetail,"row-click":o.clickDetails,"selection-change":o.getSelection}},[a("el-table-column",{attrs:{fixed:"",sortable:"",type:"selection",width:"35"}}),o._v(" "),o._l(o.tableColumn,function(i){return[i.slot?a("el-table-column",{key:i.id,attrs:{fixed:i.fixed,sortable:"",label:i.label,width:i.width},scopedSlots:o._u([{key:"default",fn:function(t){return[i.click?a("span",{staticClass:"clickitem",domProps:{innerHTML:o._s(i.slot(t))},on:{click:function(e){e.stopPropagation(),i.click(t)}}}):a("span",{domProps:{innerHTML:o._s(i.slot(t))}})]}}])}):a("el-table-column",{key:i.id,attrs:{fixed:i.fixed,sortable:"",label:i.label,prop:i.prop,width:i.width}})]})],2)],1),o._v(" "),a("div",{staticClass:"info_tab_footer"},[o._v("\n      共计:"+o._s(o.total)+"\n      "),a("div",{staticClass:"show_pager"},[a("Pager",{attrs:{total:o.total},on:{change:o.handlePageChange}})],1)]),o._v(" "),a("Colorpicker",{attrs:{popVisible:o.colorpickerVisible,reportors:o.reportorSelect},on:{close:o.closeColorpicker,success:o.setColumColor}}),o._v(" "),a("TableSetup",{attrs:{popVisible:o.setupTableVisible,columns:o.tableColumn},on:{close:o.closeSetupTable,success:o.setColumn}})],1)],1)},staticRenderFns:[]};t.a=o},puNT:function(e,t,i){"use strict";var o=i("IAIf"),a=i("QcgQ");var n=function(e){i("MXEa")},s=i("VU/8")(o.a,a.a,n,null,null);t.a=s.exports},wzrh:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=i("WIPA"),a=i("pHZc"),n=i("VU/8")(o.a,a.a,null,null,null);t.default=n.exports}});