webpackJsonp([113,234,292],{"01nq":function(t,e,i){"use strict";e.e=function(t){return a.b.post("/api-order/order/track/v1/list/",t).then(function(t){return t.data||{list:[],totalCount:0}})},e.f=function(t){return a.b.post("/api-order/order/track/v1/transferList/",t).then(function(t){return t.data||{list:[],totalCount:0}})},e.b=function(t){return a.b.get("/api-order/order/track/v1/getLoadTrack/"+t).then(function(t){return t.data})},e.a=function(t){return a.b.delete("/api-order/order/track/v1/"+t).then(function(t){return t.data})},e.d=function(t){return a.b.post("/api-order/order/track/v1/insertTrack/",t).then(function(t){return t.data})},e.g=function(t){return a.b.put("/api-order/order/track/v1/updateById/",t).then(function(t){return t.data})},e.c=function(t){return a.b.get("/api-order/order/load/v1/selectLoadDetailList/?loadId="+t).then(function(t){return t.data})};var a=i("Vo7i")},"1onU":function(t,e,i){"use strict";var a=i("VT+v"),s=i("SgVa");var n=function(t){i("FiTa"),i("7CJ8")},o=i("VU/8")(a.a,s.a,n,"data-v-4b7ed4df",null);e.a=o.exports},"2uhx":function(t,e,i){"use strict";var a={render:function(){var i=this,t=i.$createElement,a=i._self._c||t;return a("pop-right",{directives:[{name:"loading",rawName:"v-loading",value:i.loading,expression:"loading"}],staticClass:"trackInfoPop",attrs:{title:i.popTitle,isShow:i.popVisible},on:{close:i.closeMe}},[a("template",{slot:"content"},[a("div",{directives:[{name:"loading",rawName:"v-loading",value:i.loading,expression:"loading"}],staticClass:"info_box"},[a("el-row",{staticClass:"stepItem_title"},[a("el-col",{staticClass:"tracktype",attrs:{span:5}},[i._v("类型")]),i._v(" "),a("el-col",{attrs:{span:4}},[i._v("操作时间")]),i._v(" "),a("el-col",{attrs:{span:4}},[i._v("操作网点")]),i._v(" "),a("el-col",{attrs:{span:3}},[i._v("操作人")]),i._v(" "),a("el-col",{attrs:{span:8}},[i._v("操作信息")])],1),i._v(" "),a("div",{staticClass:"stepinfo"},[a("el-steps",{attrs:{direction:"vertical"}},i._l(i.trackDetail,function(e,t){return a("el-step",{key:t,class:{firstactive:0===t},nativeOn:{mouseover:function(t){return i.setThisActive(t)},mouseout:function(t){return i.offThisActive(t)}}},[a("span",{staticClass:"location",attrs:{slot:"icon"},slot:"icon"}),i._v(" "),a("template",{slot:"description"},[a("el-row",{staticClass:"stepItem"},[a("el-col",{attrs:{span:5}},[a("span",{staticClass:"typebox"},[i._v(i._s(e.trackNode))]),i._v(" "),1===e.trackType?[a("span",{staticClass:"modifybtn",attrs:{title:"编辑"},on:{click:function(t){i.editItem(e)}}}),i._v(" "),a("span",{staticClass:"deletebtn",attrs:{title:"删除"},on:{click:function(t){i.deleteTrack(e)}}})]:i._e()],2),i._v(" "),a("el-col",{attrs:{span:4}},[a("p",[i._v(i._s(i._f("parseTime")(e.createTime,"{y}-{m}-{d} {h}:{i}:{s}")))])]),i._v(" "),a("el-col",{attrs:{span:3}},[a("p",[i._v(i._s(e.orgName))])]),i._v(" "),a("el-col",{attrs:{span:4}},[a("p",[1===e.addStatus?a("i",{staticClass:"track-human"}):a("i",{staticClass:"icon_blank"}),i._v(" "+i._s(e.trackDetailed)+"\n                  ")])]),i._v(" "),a("el-col",{attrs:{span:8}},[a("p",[i._v(i._s(e.trackInfo))])])],1)],1)],2)}))],1)],1)]),i._v(" "),a("div",{staticClass:"stepinfo-footer stepFrom",attrs:{slot:"footer"},slot:"footer"},[a("el-form",{ref:"formModel",attrs:{inline:"",model:i.formModel,rules:i.ruleForm}},[a("el-form-item",{attrs:{label:"类型",prop:"trackNode"}},[a("el-input",{attrs:{maxlength:10,placeholder:"类型",size:"mini"},model:{value:i.formModel.trackNode,callback:function(t){i.$set(i.formModel,"trackNode",t)},expression:"formModel.trackNode"}})],1),i._v(" "),a("el-form-item",{attrs:{label:"时间",prop:"createTime"}},[a("el-date-picker",{attrs:{type:"datetime",placeholder:"选择时间",size:"mini"},model:{value:i.formModel.createTime,callback:function(t){i.$set(i.formModel,"createTime",t)},expression:"formModel.createTime"}})],1),i._v(" "),a("el-form-item",{attrs:{label:"操作信息",prop:"trackInfo"}},[a("el-input",{attrs:{maxlength:250,placeholder:"操作信息",size:"mini"},model:{value:i.formModel.trackInfo,callback:function(t){i.$set(i.formModel,"trackInfo",t)},expression:"formModel.trackInfo"}})],1),i._v(" "),a("el-form-item",{staticClass:"tracksavebtn"},[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(t){i.submitForm("formModel")}}},[i._v("保 存")]),i._v(" "),a("transition",{attrs:{name:"el-zoom-in-center"}},[i.isModify?a("el-button",{attrs:{type:"warning",size:"mini"},on:{click:function(t){i.resetForm()}}},[i._v("取 消")]):i._e()],1)],1)],1)],1)],2)},staticRenderFns:[]};e.a=a},"6Ytk":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i("Ho6I"),s=i("PSJa"),n=i("VU/8")(a.a,s.a,null,null,null);e.default=n.exports},"7CJ8":function(t,e){},DGFZ:function(t,e,i){"use strict";var a={render:function(){var a=this,t=a.$createElement,s=a._self._c||t;return s("div",{directives:[{name:"loading",rawName:"v-loading",value:a.loading,expression:"loading"}],staticClass:"tab-content"},[s("SearchForm",{attrs:{orgid:a.otherinfo.orgid,btnsize:a.btnsize},on:{change:a.getSearchParam}}),a._v(" "),s("div",{staticClass:"tab_info"},[s("div",{staticClass:"btns_box"},[s("el-button",{staticClass:"table_setup",attrs:{type:"primary",size:a.btnsize,icon:"el-icon-setting",plain:""},on:{click:a.setTable}},[a._v("表格设置")]),a._v(" "),s("el-button",{directives:[{name:"has",rawName:"v-has:LOADTRACK4",arg:"LOADTRACK4"}],staticClass:"table_setup",attrs:{type:"success",size:a.btnsize,icon:"el-icon-setting",plain:"",disabled:a.isDisBtn},on:{click:a.setInfo}},[a._v("在途跟踪")])],1),a._v(" "),s("div",{staticClass:"info_tab"},[s("el-table",{key:a.tablekey,ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:a.dataList,stripe:"",border:"",height:"100%","tooltip-effect":"dark","default-sort":{prop:"id",order:"ascending"}},on:{"row-click":a.clickDetails,"selection-change":a.getSelection,"row-dblclick":a.setInfo}},[s("el-table-column",{attrs:{fixed:"",sortable:"",type:"selection",width:"50"}}),a._v(" "),a._l(a.tableColumn,function(i){return[i.slot?s("el-table-column",{key:i.id,attrs:{fixed:i.fixed,sortable:"",label:i.label,width:i.width},scopedSlots:a._u([{key:"default",fn:function(e){return[i.click?s("span",{staticClass:"clickitem",domProps:{innerHTML:a._s(i.slot(e))},on:{click:function(t){t.stopPropagation(),i.click(e)}}}):s("span",{domProps:{innerHTML:a._s(i.slot(e))}})]}}])}):s("el-table-column",{key:i.id,attrs:{fixed:i.fixed,sortable:"",label:i.label,prop:i.prop,width:i.width}})]})],2)],1),a._v(" "),s("div",{staticClass:"info_tab_footer"},[a._v("\n      共计:"+a._s(a.total)+"\n      "),s("div",{staticClass:"show_pager"},[s("Pager",{attrs:{total:a.total},on:{change:a.handlePageChange}})],1)]),a._v(" "),s("editInfoTransfer",{attrs:{orgid:a.orgid,id:a.transferId,shipId:a.shipId,popVisible:a.editInfoVisible},on:{"update:popVisible":function(t){a.editInfoVisible=t},close:a.closeMe}}),a._v(" "),s("TableSetup",{attrs:{popVisible:a.setupTableVisible,columns:a.tableColumn},on:{close:a.closeSetupTable,success:a.setColumn}})],1)],1)},staticRenderFns:[]};e.a=a},FOOn:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i("rRK3"),s=i("2uhx");var n=function(t){i("Pcqt")},o=i("VU/8")(a.a,s.a,n,null,null);e.default=o.exports},FiTa:function(t,e){},Ho6I:function(t,e,i){"use strict";var a=i("woOf"),s=i.n(a),n=i("E4LH"),o=i("o9X6"),r=i("pAQG"),l=i("0xDb");e.a={components:{SelectTree:o.a,querySelect:r.a},props:{btnsize:{type:String,default:"mini"},orgid:{type:Number}},data:function(){return{carrierName:{},searchForm:{orgId:0,carrierName:"",startTime:"",endTime:""},city:"",searchData:{orgId:0,carrierName:"",startTime:"",endTime:""},cityName:{},rules:{shipSn:[{validator:function(t,e,i){var a=n.a.ONLY_NUMBER;""!==e&&null!==e&&e&&void 0!==e?a.test(e)?i():i(new Error("请输入最多15位数字")):i()},tigger:"blur"}]},searchTime:[Object(l.parseTime)(new Date-5184e6),Object(l.parseTime)(new Date)],defaultTime:[new Date-5184e6,new Date],pickerOptions:{shortcuts:l.pickerOptions2}}},methods:{getcity:function(){},onSubmit:function(){this.searchTime&&(this.searchForm.startTime=Object(l.parseTime)(this.searchTime[0],"{y}-{m}-{d} ")+"00:00:00",this.searchForm.endTime=Object(l.parseTime)(this.searchTime[1],"{y}-{m}-{d} ")+"23:59:59"),this.$emit("change",this.searchForm)},clearForm:function(t){this.$refs[t].resetFields(),this.searchTime=this.$options.data().searchTime,this.searchForm=s()({},this.searchData)}}}},IAIf:function(t,e,i){"use strict";var a=i("woOf"),r=i.n(a),s=i("DAYN"),n=i.n(s),l=i("0xDb"),c=i("t5DY");e.a={props:{popVisible:{type:Boolean,default:!1},columns:{type:Array,default:[]},code:{type:String,default:""}},components:{draggable:n.a},computed:{isShow:{get:function(){return this.popVisible},set:function(){}}},data:function(){return{orgColumnData:[],columnData:[],orgShowColumnData:[],showColumnData:[],list:[],rightList:[],listKey:0,isIndeterminateLeft:!0,isIndeterminateRight:!0,checkAllLeft:!1,checkAllRight:!1,checkListLeft:[],checkListRight:[],searchLeft:"",searchRight:"",leftListLen:0,rightListLen:0,columnListLen:0,isCheck:!0,maxLen:50,rightCheckLen:0,leftCheckLen:0,thecode:""}},mounted:function(){var a=this,t=this.code;this.$route.meta.code;"NOSET"===t?this.convertData():t?this.thecode=t:this.convertData(),this.thecode&&(this.fetchTableSetup(),this.eventBus.$on("tablesetup.change",function(t,e){if(t&&t===a.thecode){var i=a.showColumnData.filter(function(t){return t.prop===e.prop});i.length&&(i[0].width=e.width,a.changeTbaleSetup())}}))},methods:{convertData:function(t){this.initData(t),this.callback()},initData:function(e){e=e||this.columns;var o=this.maxLen,t=function(t){var s=[];if(0<e.length){var n=0;e.forEach(function(t,e){if(t.hidden){var i=Object(l.objectMerge2)(t);i.key=e,s.push(i)}else n++;if(o<n){var a=Object(l.objectMerge2)(t);a.key=e,a.hidden=!0,s.push(a)}})}return s},i=function(t){var a=[];if(0<e.length){var s=0;e.forEach(function(t,e){if(!t.hidden&&s<o){s++;var i=Object(l.objectMerge2)(t);i.hidden=!1,i.key=e,a.push(i)}})}return a},a=t().length,s=i().length;this.orgColumnData=t(),this.columnData=t(),this.orgShowColumnData=i(),this.showColumnData=i(),this.leftListLen=a,this.rightListLen=s,this.columnListLen=e.length},sort:function(t){return t.sort(function(t,e){return t.key-e.key})},doAction:function(t){switch(t){case"goRight":this.goRight();break;case"goLeft":this.goLeft()}},fetchFail:function(){this.thecode="",this.convertData()},fetchTableSetup:function(){var o=this;return Object(c.g)(this.otherinfo.orgid,this.thecode).then(function(t){var e=t.data;if((o.orgdata=e)&&e.length){1===e.length&&(e=e[0]),o.orgdata=e;var s=[],n=o.columns.length;e.sort(function(t,e){return t.titleOrder>e.titleOrder?1:-1}),e.forEach(function(t){for(var e=r()({},t),i=0;i<n;i++)if(o.columns[i].prop===t.prop){for(var a in o.columns[i])void 0!==e[a]&&null!==e[a]||(e[a]=o.columns[i][a]);break}s.push(e)}),o.columns.forEach(function(e){0===s.filter(function(t){return t.prop===e.prop}).length&&s.push(e)}),o.convertData(s)}else o.fetchFail()}).catch(function(t){o.fetchFail()})},changeTbaleSetup:function(){var e=this;if(this.thecode)return Object(c.n)(this.otherinfo.orgid,this.thecode,this.formatColumn(this.showColumnData)).then(function(t){e.$message.info("保存成功")}).catch(function(t){e._handlerCatchMsg(t)})},formatColumn:function(t){var n=this.orgdata,o=[],r=0;return t.forEach(function(e){var t=n.filter(function(t){return t.prop===e.prop});if(t.length){var i={},a=t[0];for(var s in a)i[s]=e[s];i.hidden=!1,i.titleOrder=++r,o.push(i)}}),this.columnData.forEach(function(e){var t=n.filter(function(t){return t.prop===e.prop});if(t.length){var i={},a=t[0];for(var s in a)i[s]=e[s];i.hidden=!0,i.titleOrder=++r,o.push(i)}}),o},checkRightLen:function(){this.showColumnData.length>this.maxLen?(this.$message({type:"warning",message:"列表最多只能显示"+this.maxLen+"个字段。"}),this.isCheck=!0):this.isCheck=!1},canDragStart:function(t){},setColumnLen:function(){this.leftListLen=this.columnData.length,this.rightListLen=this.showColumnData.length},handChangeAllLeft:function(t){this.checkListLeft=t?r()([],this.columnData):[],this.leftCheckLen=this.checkListLeft.length,this.isIndeterminateLeft=!1},handChangeAllRight:function(t){this.checkListRight=t?r()([],this.showColumnData):[],this.rightCheckLen=this.checkListRight.length,this.isIndeterminateRight=!1},goRight:function(){var e=this;if(this.checkListLeft.length+this.rightListLen>this.maxLen||this.rightListLen>this.maxLen-1)return this.$message({type:"warning",message:"列表最多只能显示"+this.maxLen+"个字段。"}),!1;this.columnData=this.columnData.filter(function(t){return-1===e.checkListLeft.indexOf(t)||(e.showColumnData.push(t),!1)}),this.orgColumnData=this.orgColumnData.filter(function(t){return-1===e.checkListLeft.indexOf(t)||(e.orgShowColumnData.push(t),!1)}),this.checkListLeft=[],this.setColumnLen(),this.leftCheckLen=0},goLeft:function(){var a=this;this.checkListRight.forEach(function(t,e){a.columnData.push(t),a.orgColumnData.push(t);var i=a.showColumnData.indexOf(t);-1!==i&&a.showColumnData.splice(i,1),-1!==a.orgShowColumnData.indexOf(t)&&a.orgShowColumnData.splice(i,1)}),this.sort(this.columnData),this.checkListRight=[],this.setColumnLen(),this.rightCheckLen=0},dbCheckItemLeft:function(t,e,i){if(this.rightListLen>this.maxLen-1)return this.$message({type:"warning",message:"列表最多只能显示"+this.maxLen+"个字段。"}),!1;this.showColumnData.push(t),this.orgShowColumnData.push(t),this.columnData.splice(e,1),this.orgColumnData.splice(e,1),this.setColumnLen()},dbCheckItemRight:function(t,e,i){this.columnData.push(t),this.orgColumnData.push(t),this.showColumnData.splice(e,1),this.orgShowColumnData.splice(e,1),this.setColumnLen(),this.sort(this.columnData)},handleCheckChangeLeft:function(t){this.leftCheckLen=t.length},handleCheckChangeRight:function(t){this.rightCheckLen=t.length},querySearchLeft:function(t,e){void 0===(this.searchLeft=t).label&&(this.searchLeft||(this.columnData=r()([],this.orgColumnData)));var i=r()([],this.orgColumnData);e(t?i.filter(this.createFilter(t)):i)},querySearchRight:function(t,e){void 0===(this.searchRight=t).label&&(this.searchRight||(this.showColumnData=r()([],this.orgShowColumnData)));var i=r()([],this.orgShowColumnData);e(t?i.filter(this.createFilter(t)):i)},createFilter:function(e){return function(t){return 0===t.label.toLowerCase().indexOf(e.toLowerCase())}},handleSearchLeft:function(t){var e=this;this.searchLeft=t?t.label:"";var i=r()([],this.columnData);i.forEach(function(t){t.label===e.searchLeft&&(i=[]).push(t)}),this.columnData=r()([],i),i=[]},handleSearchRight:function(t){var e=this;this.searchRight=t?t.label:"";var i=r()([],this.showColumnData);i.forEach(function(t){t.label===e.searchRight&&(i=[]).push(t)}),this.showColumnData=r()([],i),i=[]},closeMe:function(t){this.$emit("close"),"function"==typeof t&&t()},handleChange:function(t,e,i){this.rightList=r()([],t)},handleSwitch:function(t){},callback:function(){var t=r()([],this.showColumnData);t.forEach(function(t){!t.label&&t.lable&&(t.label=t.lable)}),this.$emit("success",t),this.listKey=Math.random(),this.closeMe()},submitForm:function(){var e=this;this.thecode?this.changeTbaleSetup().then(function(t){e.callback()}):this.callback()}}}},MXEa:function(t,e){},PSJa:function(t,e,i){"use strict";var a={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("el-form",{ref:"searchForm",staticClass:"staff_searchinfo clearfix",attrs:{inline:!0,size:e.btnsize,"label-position":"right",rules:e.rules,model:e.searchForm,"label-width":"70px"}},[i("div",{staticClass:"staff_searchinfo--input"},[i("el-form-item",{attrs:{label:"中转时间"}},[i("el-date-picker",{attrs:{"default-value":e.defaultTime,type:"daterange",align:"right","value-format":"yyyy-MM-dd HH:mm:ss","start-placeholder":"开始日期","picker-options":e.pickerOptions,"end-placeholder":"结束日期"},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.onSubmit(t):null}},model:{value:e.searchTime,callback:function(t){e.searchTime=t},expression:"searchTime"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"承运商",prop:"carrierName"}},[i("el-input",{attrs:{maxlength:15,"auto-complete":"off",placeholder:"承运商",clearable:""},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.onSubmit(t):null}},model:{value:e.searchForm.carrierName,callback:function(t){e.$set(e.searchForm,"carrierName",t)},expression:"searchForm.carrierName"}})],1)],1),e._v(" "),i("el-form-item",{staticClass:"staff_searchinfo--btn"},[i("el-button",{attrs:{type:"primary"},on:{click:e.onSubmit}},[e._v("查询")]),e._v(" "),i("el-button",{attrs:{type:"info",plain:""},on:{click:function(t){e.clearForm("searchForm")}}},[e._v("清空")])],1)],1)},staticRenderFns:[]};e.a=a},Pcqt:function(t,e){},QcgQ:function(t,e,i){"use strict";var a={render:function(){var a=this,t=a.$createElement,s=a._self._c||t;return s("el-dialog",{staticClass:"tms_dialog",attrs:{title:"表格设置",visible:a.isShow,"append-to-body":"","close-on-click-modal":!1,"before-close":a.closeMe},on:{"update:visible":function(t){a.isShow=t}}},[s("div",{staticClass:"tableSetup_warp"},[s("div",{staticClass:"tableSetup_list"},[s("div",{staticClass:"tableSetup_head"},[s("div",{staticClass:"tableSetup_head_select"},[a._v("选择："+a._s(a.leftCheckLen))]),a._v(" "),s("el-checkbox",{attrs:{indeterminate:a.isIndeterminateLeft},on:{change:a.handChangeAllLeft},model:{value:a.checkAllLeft,callback:function(t){a.checkAllLeft=t},expression:"checkAllLeft"}},[a._v("隐藏列  "+a._s(a.leftListLen)+" / "+a._s(a.columnListLen))]),a._v(" "),s("div",{staticStyle:{margin:"3px 0"}},[s("el-autocomplete",{staticClass:"inline-input",attrs:{"fetch-suggestions":a.querySearchLeft,placeholder:"请输入内容",size:"mini"},on:{select:a.handleSearchLeft},scopedSlots:a._u([{key:"default",fn:function(t){var e=t.item;return[s("span",[a._v(a._s(e.label))])]}}]),model:{value:a.searchLeft,callback:function(t){a.searchLeft=t},expression:"searchLeft"}},[s("i",{staticClass:"el-icon-search el-input__icon",attrs:{slot:"suffix"},slot:"suffix"})])],1)],1),a._v(" "),s("div",{staticClass:"tableSetup_content"},[s("el-checkbox-group",{on:{change:a.handleCheckChangeLeft},model:{value:a.checkListLeft,callback:function(t){a.checkListLeft=t},expression:"checkListLeft"}},[s("transition-group",{key:a.listKey,attrs:{name:"el-zoom-in-center"}},a._l(a.columnData,function(e,i){return s("div",{key:i,staticClass:"tableSetup_item",on:{dblclick:function(t){a.dbCheckItemLeft(e,i,t)}}},[s("el-checkbox",{attrs:{label:e}},[a._v("\n                "+a._s(e.label)+"\n              ")])],1)}))],1)],1),a._v(" "),s("div",{staticClass:"tableSetup_tips"},[s("span",[a._v("双击，可快速左右切换。")])])]),a._v(" "),s("div",{staticClass:"tableSetup_btn"},[s("el-button",{attrs:{type:"primary",icon:"el-icon-arrow-right"},on:{click:function(t){a.doAction("goRight")}}}),a._v(" "),s("br"),a._v(" "),s("el-button",{attrs:{type:"primary",icon:"el-icon-arrow-left"},on:{click:function(t){a.doAction("goLeft")}}})],1),a._v(" "),s("div",{staticClass:"tableSetup_list"},[s("div",{staticClass:"tableSetup_head"},[s("div",{staticClass:"tableSetup_head_select"},[a._v("选择："+a._s(a.rightCheckLen))]),a._v(" "),s("el-checkbox",{attrs:{indeterminate:a.isIndeterminateRight},on:{change:a.handChangeAllRight},model:{value:a.checkAllRight,callback:function(t){a.checkAllRight=t},expression:"checkAllRight"}},[a._v("显示列 "+a._s(a.rightListLen)+" / "+a._s(a.columnListLen))]),a._v(" "),s("div",{staticStyle:{margin:"3px 0"}},[s("el-autocomplete",{staticClass:"inline-input",attrs:{"fetch-suggestions":a.querySearchRight,placeholder:"请输入内容",size:"mini"},on:{select:a.handleSearchRight},scopedSlots:a._u([{key:"default",fn:function(t){var e=t.item;return[s("span",[a._v(a._s(e.label))])]}}]),model:{value:a.searchRight,callback:function(t){a.searchRight=t},expression:"searchRight"}},[s("i",{staticClass:"el-icon-search el-input__icon",attrs:{slot:"suffix"},slot:"suffix"})])],1)],1),a._v(" "),s("div",{staticClass:"tableSetup_content"},[s("el-checkbox-group",{on:{change:a.handleCheckChangeRight},model:{value:a.checkListRight,callback:function(t){a.checkListRight=t},expression:"checkListRight"}},[s("draggable",{staticClass:"dragArea",attrs:{move:a.canDragStart,list:a.showColumnData}},[s("transition-group",{attrs:{name:"el-zoom-in-center"}},a._l(a.showColumnData,function(e,i){return s("div",{key:i,staticClass:"tableSetup_item",on:{dblclick:function(t){a.dbCheckItemRight(e,i,t)}}},[s("el-checkbox",{attrs:{label:e}},[a._v("\n                  "+a._s(e.label)+"\n                ")]),a._v(" "),s("el-switch",{attrs:{"active-text":e.fixed?"固定":"活动"},on:{change:function(t){a.handleSwitch(e)}},model:{value:e.fixed,callback:function(t){a.$set(e,"fixed",t)},expression:"column.fixed"}})],1)}))],1)],1)],1),a._v(" "),s("div",{staticClass:"tableSetup_tips"},[s("span",[a._v("拖拽，可调整上下顺序。")]),a._v(" "),s("br"),s("span",[a._v("列表最多只能显示"+a._s(a.maxLen)+"个字段。")])])])]),a._v(" "),s("div",{attrs:{slot:"footer"},slot:"footer"},[s("el-button",{attrs:{type:"primary"},on:{click:function(t){a.submitForm()}}},[a._v("确 定")]),a._v(" "),s("el-button",{on:{click:a.closeMe}},[a._v("取 消")])],1)])},staticRenderFns:[]};e.a=a},SgVa:function(t,e,i){"use strict";var a={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"tms-pagenation"},[i("span",{staticClass:"page-num",class:{disabled:e.pageNum<=1},on:{click:function(t){e.jumpTo(1)}}},[i("span",{staticClass:"first-page"})]),i("span",{staticClass:"page-num",class:{disabled:e.pageNum<=1},on:{click:function(t){e.jumpTo(e.pageNum-1)}}},[i("span",{staticClass:"prev-page"})]),e._v(" "),i("span",{staticClass:"page-jumper"},[e._v("\n    第\n    "),i("el-input",{ref:"input",staticClass:"el-pagination__editor is-in-pagination",attrs:{min:1,max:e.pages,type:"number",disabled:e.pages<=1},on:{change:e.handleChange,focus:e.handleFocus,blur:e.handleBlur},nativeOn:{keydown:function(t){return e.handleKeyup(t)}},model:{value:e.inputval,callback:function(t){e.inputval="string"==typeof t?t.trim():t},expression:"inputval"}}),e._v(" 页\n  ")],1),e._v("\n  /共 "+e._s(e.pages)+" 页\n  "),i("span",{staticClass:"page-num",class:{disabled:e.pageNum===e.pages},on:{click:function(t){e.jumpTo(e.pageNum+1)}}},[i("span",{staticClass:"next-page"})]),e._v(" "),i("span",{staticClass:"page-num",class:{disabled:e.pageNum===e.pages},on:{click:function(t){e.jumpTo(e.pages)}}},[i("span",{staticClass:"last-page"})]),e._v(" "),i("span",{staticClass:"tms-pagination__sizes"},[i("el-select",{staticClass:"page-select",attrs:{placeholder:"请选择"},on:{change:e.sizesChange},model:{value:e.size,callback:function(t){e.size=t},expression:"size"}},e._l(e.sizes,function(t,e){return i("el-option",{key:e,attrs:{label:t,value:t}})}))],1)])},staticRenderFns:[]};e.a=a},"VT+v":function(t,e,i){"use strict";e.a={props:{sizes:{type:Array,default:function(){return[100,200,300,400]}},total:{type:Number,default:0}},computed:{pages:function(){return Math.ceil(this.total/this.size)}},watch:{pageNum:function(){this.inputval=this.pageNum},size:function(){this.pageNum=1}},mounted:function(){this.size=this.sizes[0]},data:function(){return{pageNum:1,oldValue:0,inputval:1,oldNum:1,size:100}},methods:{handleFocus:function(t){this.oldValue=t.target.value},sizesChange:function(){this.pageNum=1,this.oldNum=this.pageNum,this.$emit("change",{pageNum:this.pageNum,pageSize:this.size})},changeEvent:function(){this.oldNum!==this.pageNum&&(this.oldNum=this.pageNum,this.$emit("change",{pageNum:this.pageNum,pageSize:this.size}))},handleCurrentChange:function(t){this.pageNum=t,this.changeEvent()},handleSizeChange:function(t){this.size=t,this.changeEvent()},handleChange:function(t){var e=parseInt(t,10);isNaN(e)?this.inputval=1:e<1?this.inputval=1:e>this.pages?this.inputval=this.pages:this.inputval=e},handleBlur:function(t){var e=t.target;this.handleChange(e.value),this.jumpTo(this.inputval)},handleKeyup:function(t){var e=t.keyCode,i=t.target;console.log("page keydown:",e,i),13===e&&this.oldValue&&i.value!==this.oldValue&&(this.handleChange(i.value),this.oldValue="")},jumpTo:function(t){t<1?this.pageNum=1:t>this.pages?this.pageNum=this.pages:this.pageNum=t,this.changeEvent()}}}},bOdI:function(t,e,i){"use strict";e.__esModule=!0;var a,s=i("C4MV"),n=(a=s)&&a.__esModule?a:{default:a};e.default=function(t,e,i){return e in t?(0,n.default)(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}},puNT:function(t,e,i){"use strict";var a=i("IAIf"),s=i("QcgQ");var n=function(t){i("MXEa")},o=i("VU/8")(a.a,s.a,n,null,null);e.a=o.exports},pyjA:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i("zT8x"),s=i("DGFZ"),n=i("VU/8")(a.a,s.a,null,null,null);e.default=n.exports},rRK3:function(t,e,i){"use strict";var a=i("bOdI"),s=i.n(a),n=(i("E4LH"),i("P5Di")),o=i("OHys"),r=(i("NYxO"),i("t5DY")),l=i("0xDb");e.a={components:{popRight:n.a},props:{popVisible:{type:Boolean,default:!1},orgid:{required:!0},id:{type:[Number,String]},shipId:{type:[Number,String]}},data:function(){return s()({popTitle:"在途跟踪",loading:!1,isModify:!1,infoId:{},trackDetail:[],formModel:{},ruleForm:{trackNode:[{required:!0,trigger:"blur",message:"不能为空"}],createTime:[{required:!0,trigger:"blur",message:"不能为空"}],trackInfo:[{required:!0,trigger:"blur",message:"不能为空"}]},isShowBtn:!0,isFootEdit:!0},"formModel",{createTime:"",orgid:"",shipId:"",trackDetailed:"",trackInfo:"",trackNode:"",trackType:1})},watch:{id:function(){},shipId:function(t){t&&(console.log("shipId",t),this.getDetail(),this.getSystemTime())},popVisible:function(t,e){this.popVisible&&(this.getDetail(),this.getSystemTime())}},methods:{submitForm:function(t){var e=this;this.$refs[t].validate(function(t){t&&(e.formModel.id?e.$confirm("此操作将修改跟踪信息, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){e.editTrack()}):e.$confirm("此操作将添加跟踪信息, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){e.addTrack()}))})},getDetail:function(){var e=this,t=(this.id,this.shipId);o.a.getShipTrackinfo(t).then(function(t){e.trackDetail=t}).catch(function(t){e.loading=!1,e._handlerCatchMsg(t)})},closeMe:function(t){this.$emit("update:popVisible",!1),"function"==typeof t&&t()},deleteTrack:function(t){var e=this;this.$confirm("此操作将删除本跟踪信息, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){o.a.deleteTrackinfo(t.id).then(function(t){e.$message({type:"success",message:"删除成功"}),e.getDetail()}).catch(function(t){e._handlerCatchMsg(t)})})},editItem:function(t){this.formModel=Object(l.objectMerge2)({},t),this.isModify=!0},editTrack:function(){var e=this;this.formModel.createTime=Object(l.parseTime)(this.formModel.createTime,"{y}-{m}-{d} {h}:{i}:{s}"),console.log(this.formModel.createTime),o.a.putTrackinfo(this.formModel).then(function(t){e.$message({type:"success",message:"修改成功"}),e.getDetail(),e.resetForm()}).catch(function(t){e._handlerCatchMsg(t)})},addTrack:function(){var e=this,t=Object(l.objectMerge2)({},this.formModel);t.createTime=Object(l.parseTime)(+new Date(t.createTime),"{y}-{m}-{d} {h}:{i}:{s}"),t.shipId=this.shipId,t.orgid=this.otherinfo.orgid,console.log(t.createTime),o.a.postTrackinfo(t).then(function(t){e.$message({type:"success",message:"添加成功"}),e.getDetail(),e.resetForm()}).catch(function(t){e._handlerCatchMsg(t)})},getSystemTime:function(){var e=this;this.formModel.id||Object(r.f)().then(function(t){e.formModel.createTime=new Date(t.trim()),console.log("系统：",e.formModel.createTime)}).catch(function(t){e._handlerCatchMsg(t)})},resetForm:function(){var t=this;this.$nextTick(function(){t.isModify=!1,t.$refs.formModel.resetFields(),t.formModel=t.$options.data().formModel,t.getSystemTime()})},offThisActive:function(t){var e=Object(l.closest)(t.target,".el-step");e&&e.classList.remove("trackactive")},setThisActive:function(t){var e=Object(l.closest)(t.target,".el-step");e&&e.classList.add("trackactive")}}}},zT8x:function(t,e,i){"use strict";var a=i("woOf"),s=i.n(a),n=i("Dd8w"),o=i.n(n),r=i("6Ytk"),l=i("NYxO"),c=i("01nq"),h=i("1onU"),u=i("FOOn"),p=i("puNT"),d=i("0xDb");e.a={components:{SearchForm:r.default,Pager:h.a,editInfoTransfer:u.default,TableSetup:p.a},computed:o()({},Object(l.b)(["otherinfo"]),{orgid:function(){return this.isModify?this.selectInfo.orgid:this.searchQuery.vo.orgid||this.otherinfo.orgid}}),data:function(){return{btnsize:"mini",dataList:[],total:0,isDisBtn:!0,transferId:"",shipId:"",tablekey:0,selectInfo:[],trackInfo:{},loading:!0,editInfoVisible:!1,setupTableVisible:!1,searchQuery:{currentPage:1,pageSize:100,vo:{orgId:0}},tableColumn:[{label:"中转单号",prop:"oddNumbers",width:"140",fixed:!0},{label:"运单号",prop:"shipSn",width:"120",fixed:!0},{label:"运单状态",prop:"shipStatusName",width:"100",fixed:!0},{label:"开单网点",prop:"shipFromOrgidName",width:"110"},{label:"承运商",prop:"carrierName",width:"120"},{label:"承运商电话",prop:"carrierMobile",width:"120"},{label:"到站电话",prop:"arrivalMobile",width:"120"},{label:"开单时间",prop:"createTime",width:"160",slot:function(t){return""+Object(d.parseTime)(t.row.createTime,"{y}-{m}-{d} {h}:{i}:{s}")}},{label:"中转时间",prop:"transferTime",width:"160",slot:function(t){return""+Object(d.parseTime)(t.row.transferTime,"{y}-{m}-{d} {h}:{i}:{s}")}},{label:"中转运费",prop:"transferCharge",width:"120"},{label:"中转送货费",prop:"deliveryExpense",width:"120"},{label:"中转费其他费",prop:"transferOtherFee",width:"120"},{label:"中转费合计",prop:"totalCost",width:"120"},{label:"中转付款方式",prop:"paymentName",width:"120"},{label:"代收货款",prop:"codService",width:"120"},{label:"发货人",prop:"senderName",width:"120"},{label:"发货人电话",prop:"senderMobile",width:"120"},{label:"收货人",prop:"receiverName",width:"120"},{label:"收货人电话",prop:"receiverMobile",width:"120"},{label:"出发城市",prop:"shipFromCityName",width:"120"},{label:"到达城市",prop:"shipToCityName",width:"120"},{label:"货物名称",prop:"cargoName",width:"120"},{label:"件数",prop:"cargoAmount",width:"120"},{label:"重量",prop:"cargoWeight",width:"120"},{label:"体积",prop:"cargoVolume",width:"120"},{label:"包装",prop:"cargoPack",width:"120"},{label:"运单备注",prop:"shipRemarks",width:"120"},{label:"中转备注",prop:"remark",width:"120"},{label:"发货单位",prop:"senderUnit",width:"120"},{label:"发货地址",prop:"senderAddr",width:"120"},{label:"收货单位",prop:"receiverUnit",width:"120"},{label:"收货地址",prop:"receiverAddr",width:"120"},{label:"运费",prop:"shipFee",width:"120"},{label:"交接方式",prop:"shipDeliveryMethodName",width:"120"},{label:"货号",prop:"shipGoodsSn",width:"160"},{label:"品种规格",prop:"description",width:"120"},{label:"重量单价",prop:"weightFee",width:"100"},{label:"体积单价",prop:"volumeFee",width:"100"},{label:"回单要求",prop:"shipReceiptRequireName",width:"120"},{label:"回单份数",prop:"shipReceiptNum",width:"120"},{label:"代收款手续费",prop:"commissionFee",width:"120"},{label:"付款方式",prop:"shipPayWayName",width:"100"},{label:"现付",prop:"shipNowpayFee",width:"100"},{label:"到付",prop:"shipArrivepayFee",width:"100"},{label:"回单付",prop:"shipReceiptpayFee",width:"100"},{label:"月结",prop:"shipMonthpayFee",width:"100"},{label:"运费合计",prop:"shipTotalFee",width:"120"},{label:"制单人",prop:"name",width:"120"},{label:"回扣",prop:"brokerageFee",width:"100"},{label:"送货费",prop:"deliveryFee",width:"100"},{label:"声明价值",prop:"productPrice",width:"120"},{label:"保险费",prop:"insuranceFee",width:"120"},{label:"装卸费",prop:"handlingFee",width:"120"},{label:"包装费",prop:"packageFee",width:"120"},{label:"提货费",prop:"pickupFee",width:"120"},{label:"实际提货费",prop:"realityhandlingFee",width:"120"},{label:"上楼费",prop:"goupstairsFee",width:"120"},{label:"报关费",prop:"customsFee",width:"120"},{label:"其他费收入",prop:"otherfeeIn",width:"120"},{label:"其他费支出",prop:"otherfeeOut",width:"120"}]}},activated:function(){this.editInfoVisible=!1,this.$route.query.transfer&&(this.editInfoVisible=!0),this.searchQuery.vo.orgId=this.otherinfo.orgid,this.fetchList()},methods:{getSearchParam:function(t){this.searchQuery.currentPage=this.$options.data().searchQuery.currentPage,this.searchQuery.pageSize=this.$options.data().searchQuery.pageSize,this.searchQuery.vo=s()({},t),this.searchQuery.vo.orgId||(this.searchQuery.vo.orgId=this.otherinfo.orgid),this.fetchList()},getSelection:function(t){this.$route.query.transfer?(this.transferId=this.$route.query.transfer,this.shipId=this.$route.query.shipId):1===t.length?(this.selectInfo=s()([],t),this.isDisBtn=!1,this.transferId=this.selectInfo[0].transferId,this.shipId=this.selectInfo[0].shipId,this.trackInfo=s()({},this.selectInfo[0])):(1<t.length&&this.$message({type:"warning",message:"只能选择一条数据进行跟踪设置"}),this.isDisBtn=!0)},clickDetails:function(t){this.$refs.multipleTable.toggleRowSelection(t)},setTable:function(){this.setupTableVisible=!0},closeSetupTable:function(){this.setupTableVisible=!1},setInfo:function(){this.editInfoVisible=!0,this.$refs.multipleTable.clearSelection()},closeMe:function(){this.editInfoVisible=!1},handlePageChange:function(t){this.searchQuery.currentPage=t.pageNum,this.searchQuery.pageSize=t.pageSize,this.fetchList()},fetchList:function(){this.getAllList()},getAllList:function(){var e=this;this.loading=!0,Object(c.f)(this.searchQuery).then(function(t){t?(e.dataList=t.list,e.total=t.total,e.loading=!1,e.searchQuery.vo={}):e.loading=!1}).catch(function(t){e._handlerCatchMsg(t)}),this.isTransferTrack()},isTransferTrack:function(){this.$route.query.transfer?(console.log("transfer",this.$route.query.transfer),this.getSelection(),this.setInfo()):this.closeMe()},setColumn:function(t){this.tableColumn=t,this.tablekey=Math.random()}}}}});