webpackJsonp([166,194],{"+dUt":function(t,e,i){"use strict";var n={render:function(){var i=this,t=i.$createElement,n=i._self._c||t;return n("pop-right",{directives:[{name:"loading",rawName:"v-loading",value:i.loading,expression:"loading"}],staticClass:"deliverInfoPop",attrs:{title:i.popTitle,isShow:i.popVisible},on:{close:i.closeMe}},[n("template",{slot:"content"},[n("div",{staticClass:"content_head"},[i._v("\n      批次号： "+i._s(i.info.batchNo)+"\n    ")]),i._v(" "),n("div",{staticClass:"editInfoPop_content"},[n("el-tabs",{on:{"tab-click":i.handleClick},model:{value:i.activeName,callback:function(t){i.activeName=t},expression:"activeName"}},[n("el-tab-pane",{attrs:{label:"批次详情",name:"first"}},[n("Detail",{staticClass:"animated fadeInRight",attrs:{info:i.info,isShow:i.popVisible},on:{isSuccess:i.isSuccess,sendInfoData:i.sendInfo}})],1),i._v(" "),n("el-tab-pane",{attrs:{label:"批次跟踪",name:"second"}},[n("div",{directives:[{name:"loading",rawName:"v-loading",value:i.loading,expression:"loading"}],staticClass:"info_box"},[n("el-row",{staticClass:"stepItem_title"},[n("el-col",{staticClass:"tracktype",attrs:{span:5}},[i._v("类型")]),i._v(" "),n("el-col",{attrs:{span:4}},[i._v("操作时间")]),i._v(" "),n("el-col",{attrs:{span:3}},[i._v("操作网点")]),i._v(" "),n("el-col",{attrs:{span:4}},[i._v("操作人")]),i._v(" "),n("el-col",{attrs:{span:8}},[i._v("操作信息")])],1),i._v(" "),n("div",{staticClass:"stepinfo"},[n("el-steps",{attrs:{direction:"vertical"}},i._l(i.trackDetail,function(e,t){return n("el-step",{key:t,class:{firstactive:0===t},nativeOn:{mouseover:function(t){return i.setThisActive(t)},mouseout:function(t){return i.offThisActive(t)}}},[n("span",{staticClass:"location",attrs:{slot:"icon"},slot:"icon"}),i._v(" "),n("template",{slot:"description"},[n("el-row",{staticClass:"stepItem"},[n("el-col",{attrs:{span:5}},[n("span",{staticClass:"typebox"},[i._v(i._s(e.loadStatus))]),i._v(" "),1===e.addStatus?[n("span",{staticClass:"modifybtn",attrs:{title:"编辑"},on:{click:function(t){i.editItem(e)}}}),i._v(" "),n("span",{staticClass:"deletebtn",attrs:{title:"删除"},on:{click:function(t){i.deleteTrack(e)}}})]:i._e()],2),i._v(" "),n("el-col",{attrs:{span:4}},[n("p",[i._v(i._s(e.operatorTime))])]),i._v(" "),n("el-col",{attrs:{span:3}},[n("p",[i._v(i._s(e.orgName))])]),i._v(" "),n("el-col",{attrs:{span:4}},[n("p",[1===e.addStatus?n("i",{staticClass:"track-human"}):n("i",{staticClass:"icon_blank"}),i._v(" "+i._s(e.operatorUsername)+"\n                        ")])]),i._v(" "),n("el-col",{attrs:{span:8}},[n("p",[i._v(i._s(e.operatorInfo))])])],1)],1)],2)}))],1)],1)])],1)],1)]),i._v(" "),i.isFootEdit?n("div",{staticClass:"stepinfo-footer stepFrom",attrs:{slot:"footer"},slot:"footer"},[n("el-form",{ref:"formModel",attrs:{inline:"",model:i.formModel,rules:i.ruleForm}},[n("el-form-item",{attrs:{label:"类型",prop:"trackNode"}},[n("el-input",{attrs:{maxlength:10,placeholder:"类型",size:"mini"},model:{value:i.formModel.loadStatus,callback:function(t){i.$set(i.formModel,"loadStatus",t)},expression:"formModel.loadStatus"}})],1),i._v(" "),n("el-form-item",{attrs:{label:"时间",prop:"createTime"}},[n("el-date-picker",{attrs:{"value-format":"yyyy-MM-dd HH:mm:ss",type:"datetime",placeholder:"选择时间",size:"mini"},model:{value:i.formModel.operatorTime,callback:function(t){i.$set(i.formModel,"operatorTime","string"==typeof t?t.trim():t)},expression:"formModel.operatorTime"}})],1),i._v(" "),n("el-form-item",{attrs:{label:"操作信息",prop:"trackInfo"}},[n("el-input",{attrs:{maxlength:250,placeholder:"",size:"mini"},model:{value:i.formModel.operatorInfo,callback:function(t){i.$set(i.formModel,"operatorInfo",t)},expression:"formModel.operatorInfo"}})],1),i._v(" "),n("el-form-item",{staticClass:"tracksavebtn"},[n("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(t){i.submitForm("formModel")}}},[i._v("保 存")]),i._v(" "),n("transition",{attrs:{name:"el-zoom-in-center"}},[i.isModify?n("el-button",{attrs:{type:"warning",size:"mini"},on:{click:function(t){i.resetForm()}}},[i._v("取 消")]):i._e()],1)],1)],1)],1):n("div",{attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:i.closeMe}},[i._v("关闭")])],1)],2)},staticRenderFns:[]};e.a=n},"01nq":function(t,e,i){"use strict";e.e=function(t){return n.b.post("/api-order/order/track/v1/list/",t).then(function(t){return t.data||{list:[],totalCount:0}})},e.f=function(t){return n.b.post("/api-order/order/track/v1/transferList/",t).then(function(t){return t.data||{list:[],totalCount:0}})},e.b=function(t){return n.b.get("/api-order/order/track/v1/getLoadTrack/"+t).then(function(t){return t.data})},e.a=function(t){return n.b.delete("/api-order/order/track/v1/"+t).then(function(t){return t.data})},e.d=function(t){return n.b.post("/api-order/order/track/v1/insertTrack/",t).then(function(t){return t.data})},e.g=function(t){return n.b.put("/api-order/order/track/v1/updateById/",t).then(function(t){return t.data})},e.c=function(t){return n.b.get("/api-order/order/load/v1/selectLoadDetailList/?loadId="+t).then(function(t){return t.data})};var n=i("Vo7i")},"1SLW":function(t,e){},"4Psg":function(t,e,i){"use strict";i("E4LH");var n=i("P5Di"),s=i("01nq"),a=i("T+eR"),o=i("t5DY"),l=i("0xDb");e.a={components:{popRight:n.a,Detail:a.default},props:{popVisible:{type:Boolean,default:!1},orgid:{required:!0},id:{type:[Number,String]},info:{type:Array,default:function(){}}},data:function(){return{popTitle:"查看详情",loading:!1,isModify:!1,infoId:{},trackDetail:[],activeName:"first",ruleForm:{loadStatus:[{required:!0,trigger:"blur",message:"不能为空"}],operatorTime:[{required:!0,trigger:"blur",message:"不能为空"}],operatorInfo:[{required:!0,trigger:"blur",message:"不能为空"}]},isShowBtn:!1,isFootEdit:!1,formModel:{addStatus:1,loadId:0,loadStatus:"",operatorInfo:"",operatorOrgid:1,operatorTime:Object(l.parseTime)(new Date),operatorUserid:0}}},watch:{id:function(){},info:function(t){t&&(this.getDetail(),this.getSystemTime())},popVisible:function(t,e){this.popVisible&&this.getDetail()}},methods:{getSystemTime:function(){var e=this;Object(o.f)().then(function(t){t&&(e.formModel.operatorTime=t)}).catch(function(t){e.loading=!1,e._handlerCatchMsg(t)})},submitForm:function(t){var e=this;this.$refs[t].validate(function(t){t&&(e.formModel.id?(console.log("edit"),e.$confirm("此操作将修改跟踪信息, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){e.editTrack()}).catch(function(){e.$message({type:"warning",message:"取消操作"})})):(console.log("add"),e.$confirm("此操作将修改跟踪信息, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){e.addTrack()}).catch(function(){e.$message({type:"warning",message:"取消操作"})})))})},getDetail:function(){var e=this,t=this.id;Object(s.b)(t).then(function(t){e.trackDetail=Object(l.objectMerge2)([],t)})},closeMe:function(t){this.$emit("update:popVisible",!1),"function"==typeof t&&t()},deleteTrack:function(t){var e=this;this.$confirm("此操作将修改跟踪信息, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){return Object(s.a)(t.id).then(function(t){e.$message({type:"success",message:"删除成功"}),e.getDetail()}).catch(function(t){e._handlerCatchMsg(t)})}).catch(function(){e.$message({type:"warning",message:"取消操作"})})},editItem:function(t){this.resetForm(),this.formModel=Object(l.objectMerge2)({},t),this.isModify=!0},editTrack:function(){var e=this;this.formModel.transferId=0,Object(s.g)(this.formModel).then(function(t){e.$message({type:"success",message:"修改成功"}),e.getDetail(),e.resetForm()}).catch(function(t){e._handlerCatchMsg(t)})},addTrack:function(){var e=this;this.formModel.loadId=this.id,Object(s.d)(this.formModel).then(function(t){e.$message({type:"success",message:"添加成功"}),e.getDetail(),e.resetForm(),e.getSystemTime()}).catch(function(t){e._handlerCatchMsg(t)})},handleClick:function(){"second"===this.activeName?this.isFootEdit=!0:this.isFootEdit=!1},resetForm:function(){this.$refs.formModel.resetFields(),this.formModel=this.$options.data().formModel,this.isModify=!1},isSuccess:function(t){t&&(this.closeMe(),this.$emit("isSuccess",t))},sendInfo:function(t){console.log("父",t),this.$emit("sendInfoData",t)},offThisActive:function(t){var e=Object(l.closest)(t.target,".el-step");e&&e.classList.remove("trackactive")},setThisActive:function(t){var e=Object(l.closest)(t.target,".el-step");e&&e.classList.add("trackactive")}}}},IAIf:function(t,e,i){"use strict";var n=i("woOf"),l=i.n(n),s=i("DAYN"),a=i.n(s),r=i("0xDb"),c=i("t5DY");e.a={props:{popVisible:{type:Boolean,default:!1},columns:{type:Array,default:[]},code:{type:String,default:""}},components:{draggable:a.a},computed:{isShow:{get:function(){return this.popVisible},set:function(){}}},data:function(){return{orgColumnData:[],columnData:[],orgShowColumnData:[],showColumnData:[],list:[],rightList:[],listKey:0,isIndeterminateLeft:!0,isIndeterminateRight:!0,checkAllLeft:!1,checkAllRight:!1,checkListLeft:[],checkListRight:[],searchLeft:"",searchRight:"",leftListLen:0,rightListLen:0,columnListLen:0,isCheck:!0,maxLen:50,rightCheckLen:0,leftCheckLen:0,thecode:""}},mounted:function(){var n=this,t=this.code;this.$route.meta.code;"NOSET"===t?this.convertData():t?this.thecode=t:this.convertData(),this.thecode&&(this.fetchTableSetup(),this.eventBus.$on("tablesetup.change",function(t,e){if(t&&t===n.thecode){var i=n.showColumnData.filter(function(t){return t.prop===e.prop});i.length&&(i[0].width=e.width,n.changeTbaleSetup())}}))},methods:{convertData:function(t){this.initData(t),this.callback()},initData:function(e){e=e||this.columns;var o=this.maxLen,t=function(t){var s=[];if(0<e.length){var a=0;e.forEach(function(t,e){if(t.hidden){var i=Object(r.objectMerge2)(t);i.key=e,s.push(i)}else a++;if(o<a){var n=Object(r.objectMerge2)(t);n.key=e,n.hidden=!0,s.push(n)}})}return s},i=function(t){var n=[];if(0<e.length){var s=0;e.forEach(function(t,e){if(!t.hidden&&s<o){s++;var i=Object(r.objectMerge2)(t);i.hidden=!1,i.key=e,n.push(i)}})}return n},n=t().length,s=i().length;this.orgColumnData=t(),this.columnData=t(),this.orgShowColumnData=i(),this.showColumnData=i(),this.leftListLen=n,this.rightListLen=s,this.columnListLen=e.length},sort:function(t){return t.sort(function(t,e){return t.key-e.key})},doAction:function(t){switch(t){case"goRight":this.goRight();break;case"goLeft":this.goLeft()}},fetchFail:function(){this.thecode="",this.convertData()},fetchTableSetup:function(){var o=this;return Object(c.g)(this.otherinfo.orgid,this.thecode).then(function(t){var e=t.data;if((o.orgdata=e)&&e.length){1===e.length&&(e=e[0]),o.orgdata=e;var s=[],a=o.columns.length;e.sort(function(t,e){return t.titleOrder>e.titleOrder?1:-1}),e.forEach(function(t){for(var e=l()({},t),i=0;i<a;i++)if(o.columns[i].prop===t.prop){for(var n in o.columns[i])void 0!==e[n]&&null!==e[n]||(e[n]=o.columns[i][n]);break}s.push(e)}),o.columns.forEach(function(e){0===s.filter(function(t){return t.prop===e.prop}).length&&s.push(e)}),o.convertData(s)}else o.fetchFail()}).catch(function(t){o.fetchFail()})},changeTbaleSetup:function(){var e=this;if(this.thecode)return Object(c.n)(this.otherinfo.orgid,this.thecode,this.formatColumn(this.showColumnData)).then(function(t){e.$message.info("保存成功")}).catch(function(t){e._handlerCatchMsg(t)})},formatColumn:function(t){var a=this.orgdata,o=[],l=0;return t.forEach(function(e){var t=a.filter(function(t){return t.prop===e.prop});if(t.length){var i={},n=t[0];for(var s in n)i[s]=e[s];i.hidden=!1,i.titleOrder=++l,o.push(i)}}),this.columnData.forEach(function(e){var t=a.filter(function(t){return t.prop===e.prop});if(t.length){var i={},n=t[0];for(var s in n)i[s]=e[s];i.hidden=!0,i.titleOrder=++l,o.push(i)}}),o},checkRightLen:function(){this.showColumnData.length>this.maxLen?(this.$message({type:"warning",message:"列表最多只能显示"+this.maxLen+"个字段。"}),this.isCheck=!0):this.isCheck=!1},canDragStart:function(t){},setColumnLen:function(){this.leftListLen=this.columnData.length,this.rightListLen=this.showColumnData.length},handChangeAllLeft:function(t){this.checkListLeft=t?l()([],this.columnData):[],this.leftCheckLen=this.checkListLeft.length,this.isIndeterminateLeft=!1},handChangeAllRight:function(t){this.checkListRight=t?l()([],this.showColumnData):[],this.rightCheckLen=this.checkListRight.length,this.isIndeterminateRight=!1},goRight:function(){var e=this;if(this.checkListLeft.length+this.rightListLen>this.maxLen||this.rightListLen>this.maxLen-1)return this.$message({type:"warning",message:"列表最多只能显示"+this.maxLen+"个字段。"}),!1;this.columnData=this.columnData.filter(function(t){return-1===e.checkListLeft.indexOf(t)||(e.showColumnData.push(t),!1)}),this.orgColumnData=this.orgColumnData.filter(function(t){return-1===e.checkListLeft.indexOf(t)||(e.orgShowColumnData.push(t),!1)}),this.checkListLeft=[],this.setColumnLen(),this.leftCheckLen=0},goLeft:function(){var n=this;this.checkListRight.forEach(function(t,e){n.columnData.push(t),n.orgColumnData.push(t);var i=n.showColumnData.indexOf(t);-1!==i&&n.showColumnData.splice(i,1),-1!==n.orgShowColumnData.indexOf(t)&&n.orgShowColumnData.splice(i,1)}),this.sort(this.columnData),this.checkListRight=[],this.setColumnLen(),this.rightCheckLen=0},dbCheckItemLeft:function(t,e,i){if(this.rightListLen>this.maxLen-1)return this.$message({type:"warning",message:"列表最多只能显示"+this.maxLen+"个字段。"}),!1;this.showColumnData.push(t),this.orgShowColumnData.push(t),this.columnData.splice(e,1),this.orgColumnData.splice(e,1),this.setColumnLen()},dbCheckItemRight:function(t,e,i){this.columnData.push(t),this.orgColumnData.push(t),this.showColumnData.splice(e,1),this.orgShowColumnData.splice(e,1),this.setColumnLen(),this.sort(this.columnData)},handleCheckChangeLeft:function(t){this.leftCheckLen=t.length},handleCheckChangeRight:function(t){this.rightCheckLen=t.length},querySearchLeft:function(t,e){void 0===(this.searchLeft=t).label&&(this.searchLeft||(this.columnData=l()([],this.orgColumnData)));var i=l()([],this.orgColumnData);e(t?i.filter(this.createFilter(t)):i)},querySearchRight:function(t,e){void 0===(this.searchRight=t).label&&(this.searchRight||(this.showColumnData=l()([],this.orgShowColumnData)));var i=l()([],this.orgShowColumnData);e(t?i.filter(this.createFilter(t)):i)},createFilter:function(e){return function(t){return 0===t.label.toLowerCase().indexOf(e.toLowerCase())}},handleSearchLeft:function(t){var e=this;this.searchLeft=t?t.label:"";var i=l()([],this.columnData);i.forEach(function(t){t.label===e.searchLeft&&(i=[]).push(t)}),this.columnData=l()([],i),i=[]},handleSearchRight:function(t){var e=this;this.searchRight=t?t.label:"";var i=l()([],this.showColumnData);i.forEach(function(t){t.label===e.searchRight&&(i=[]).push(t)}),this.showColumnData=l()([],i),i=[]},closeMe:function(t){this.$emit("close"),"function"==typeof t&&t()},handleChange:function(t,e,i){this.rightList=l()([],t)},handleSwitch:function(t){},callback:function(){var t=l()([],this.showColumnData);this.$emit("success",t),this.listKey=Math.random(),this.closeMe()},submitForm:function(){var e=this;this.thecode?this.changeTbaleSetup().then(function(t){e.callback()}):this.callback()}}}},MXEa:function(t,e){},OVjY:function(t,e){},QcgQ:function(t,e,i){"use strict";var n={render:function(){var n=this,t=n.$createElement,s=n._self._c||t;return s("el-dialog",{staticClass:"tms_dialog",attrs:{title:"表格设置",visible:n.isShow,"append-to-body":"","close-on-click-modal":!1,"before-close":n.closeMe},on:{"update:visible":function(t){n.isShow=t}}},[s("div",{staticClass:"tableSetup_warp"},[s("div",{staticClass:"tableSetup_list"},[s("div",{staticClass:"tableSetup_head"},[s("div",{staticClass:"tableSetup_head_select"},[n._v("选择："+n._s(n.leftCheckLen))]),n._v(" "),s("el-checkbox",{attrs:{indeterminate:n.isIndeterminateLeft},on:{change:n.handChangeAllLeft},model:{value:n.checkAllLeft,callback:function(t){n.checkAllLeft=t},expression:"checkAllLeft"}},[n._v("隐藏列  "+n._s(n.leftListLen)+" / "+n._s(n.columnListLen))]),n._v(" "),s("div",{staticStyle:{margin:"3px 0"}},[s("el-autocomplete",{staticClass:"inline-input",attrs:{"fetch-suggestions":n.querySearchLeft,placeholder:"请输入内容",size:"mini"},on:{select:n.handleSearchLeft},scopedSlots:n._u([{key:"default",fn:function(t){var e=t.item;return[s("span",[n._v(n._s(e.label))])]}}]),model:{value:n.searchLeft,callback:function(t){n.searchLeft=t},expression:"searchLeft"}},[s("i",{staticClass:"el-icon-search el-input__icon",attrs:{slot:"suffix"},slot:"suffix"})])],1)],1),n._v(" "),s("div",{staticClass:"tableSetup_content"},[s("el-checkbox-group",{on:{change:n.handleCheckChangeLeft},model:{value:n.checkListLeft,callback:function(t){n.checkListLeft=t},expression:"checkListLeft"}},[s("transition-group",{key:n.listKey,attrs:{name:"el-zoom-in-center"}},n._l(n.columnData,function(e,i){return s("div",{key:i,staticClass:"tableSetup_item",on:{dblclick:function(t){n.dbCheckItemLeft(e,i,t)}}},[s("el-checkbox",{attrs:{label:e}},[n._v("\n                "+n._s(e.label)+"\n              ")])],1)}))],1)],1),n._v(" "),s("div",{staticClass:"tableSetup_tips"},[s("span",[n._v("双击，可快速左右切换。")])])]),n._v(" "),s("div",{staticClass:"tableSetup_btn"},[s("el-button",{attrs:{type:"primary",icon:"el-icon-arrow-right"},on:{click:function(t){n.doAction("goRight")}}}),n._v(" "),s("br"),n._v(" "),s("el-button",{attrs:{type:"primary",icon:"el-icon-arrow-left"},on:{click:function(t){n.doAction("goLeft")}}})],1),n._v(" "),s("div",{staticClass:"tableSetup_list"},[s("div",{staticClass:"tableSetup_head"},[s("div",{staticClass:"tableSetup_head_select"},[n._v("选择："+n._s(n.rightCheckLen))]),n._v(" "),s("el-checkbox",{attrs:{indeterminate:n.isIndeterminateRight},on:{change:n.handChangeAllRight},model:{value:n.checkAllRight,callback:function(t){n.checkAllRight=t},expression:"checkAllRight"}},[n._v("显示列 "+n._s(n.rightListLen)+" / "+n._s(n.columnListLen))]),n._v(" "),s("div",{staticStyle:{margin:"3px 0"}},[s("el-autocomplete",{staticClass:"inline-input",attrs:{"fetch-suggestions":n.querySearchRight,placeholder:"请输入内容",size:"mini"},on:{select:n.handleSearchRight},scopedSlots:n._u([{key:"default",fn:function(t){var e=t.item;return[s("span",[n._v(n._s(e.label))])]}}]),model:{value:n.searchRight,callback:function(t){n.searchRight=t},expression:"searchRight"}},[s("i",{staticClass:"el-icon-search el-input__icon",attrs:{slot:"suffix"},slot:"suffix"})])],1)],1),n._v(" "),s("div",{staticClass:"tableSetup_content"},[s("el-checkbox-group",{on:{change:n.handleCheckChangeRight},model:{value:n.checkListRight,callback:function(t){n.checkListRight=t},expression:"checkListRight"}},[s("draggable",{staticClass:"dragArea",attrs:{move:n.canDragStart,list:n.showColumnData}},[s("transition-group",{attrs:{name:"el-zoom-in-center"}},n._l(n.showColumnData,function(e,i){return s("div",{key:i,staticClass:"tableSetup_item",on:{dblclick:function(t){n.dbCheckItemRight(e,i,t)}}},[s("el-checkbox",{attrs:{label:e}},[n._v("\n                  "+n._s(e.label)+"\n                ")]),n._v(" "),s("el-switch",{attrs:{"active-text":e.fixed?"固定":"活动"},on:{change:function(t){n.handleSwitch(e)}},model:{value:e.fixed,callback:function(t){n.$set(e,"fixed",t)},expression:"column.fixed"}})],1)}))],1)],1)],1),n._v(" "),s("div",{staticClass:"tableSetup_tips"},[s("span",[n._v("拖拽，可调整上下顺序。")]),n._v(" "),s("br"),s("span",[n._v("列表最多只能显示"+n._s(n.maxLen)+"个字段。")])])])]),n._v(" "),s("div",{attrs:{slot:"footer"},slot:"footer"},[s("el-button",{attrs:{type:"primary"},on:{click:function(t){n.submitForm()}}},[n._v("确 定")]),n._v(" "),s("el-button",{on:{click:n.closeMe}},[n._v("取 消")])],1)])},staticRenderFns:[]};e.a=n},"T+eR":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i("TRi9"),s=i("s0og");var a=function(t){i("OVjY")},o=i("VU/8")(n.a,s.a,a,null,null);e.default=o.exports},TRi9:function(t,e,i){"use strict";var n=i("TsW9"),a=i("0xDb"),s=i("puNT"),o=i("UQm2");e.a={components:{TableSetup:s.a},props:{info:{type:Array,default:[]},isShow:{type:Boolean,default:!1}},data:function(){return{btnsize:"mini",setupTableVisible:!1,loadId:"",tablekey:0,detailList:[],selectDetailList:[],message:!1,signData:{shipIds:[],orgIds:[],childShipIds:[],loadIds:[],signTime:"",signName:"",signCocumentTypeId:0,documentNum:"",signTypeId:0,remark:"",signPic:""},tableColumn:[{label:"运单号",prop:"shipSn",width:"120",fixed:!0},{label:"开单网点",prop:"shipFromOrgName",width:"120",fixed:!1},{label:"签收状态",prop:"signStatus",width:"120",fixed:!1},{label:"到付(元)",prop:"shipArrivepayFee",width:"90",fixed:!1},{label:"配载件数",prop:"loadAmount",width:"120",fixed:!1},{label:"配载重量(kg)",prop:"loadWeight",width:"120",fixed:!1},{label:"配载体积(m³)",prop:"loadVolume",width:"120",fixed:!1},{label:"运单件数",prop:"cargoAmount",width:"120",fixed:!1},{label:"运单重量(kg)",prop:"cargoWeight",width:"120",fixed:!1},{label:"运单体积(m³)",prop:"cargoVolume",width:"120",fixed:!1},{label:"出发城市",prop:"shipFromCityName",width:"160",fixed:!1},{label:"到达城市",prop:"shipToCityName",width:"160",fixed:!1},{label:"发货人",prop:"shipSenderName",width:"120",fixed:!1},{label:"发货人电话",prop:"shipSenderMobile",width:"120",fixed:!1},{label:"收货人",prop:"shipReceiverName",width:"120",fixed:!1},{label:"收货人电话",prop:"shipReceiverMobile",width:"120",fixed:!1},{label:"货品名",prop:"cargoName",width:"120",fixed:!1},{label:"货号",prop:"shipGoodsSn",width:"130",fixed:!1},{label:"运单备注",prop:"shipRemarks",width:"120",fixed:!1}]}},watch:{isShow:{handler:function(t,e){t&&(this.getLoadTrack(),this.toggleAllRows())},immediate:!0},info:{handler:function(t,e){t&&(this.getLoadTrack(),this.toggleAllRows())},deep:!0}},methods:{setTable:function(){this.setupTableVisible=!0},doAction:function(t){switch(t){case"add":this.openSignVisible();break;case"print":Object(o.e)({data:this.selectDetailList.length?this.selectDetailList:this.detailList,columns:this.tableColumn,name:"送货管理"});break;case"export":Object(o.h)({data:this.selectDetailList.length?this.selectDetailList:this.detailList,columns:this.tableColumn,name:"送货管理"})}},setData:function(){},getLoadTrack:function(){var e=this;this.loadId=this.info.id,Object(n.d)(this.loadId).then(function(t){t&&(e.detailList=t.data,e.toggleAllRows())}).catch(function(t){e.loading=!1,e._handlerCatchMsg(t)})},clickDetails:function(t){this.$refs.multipleTable.toggleRowSelection(t)},getSelection:function(t){var i=this,n={};this.$set(n,"shipIds",[]),this.$set(n,"orgIds",[]),this.$set(n,"childShipIds",[]),this.$set(n,"loadIds",[]),this.$set(n,"signName","");var s=[];0<t.length?(this.selectDetailList=Object(a.objectMerge2)([],t),this.selectDetailList.forEach(function(t,e){n.shipIds.push(t.shipId),t.childShipId&&""!==t.childShipId||(t.childShipId=null),t.orgid&&""!==t.orgid||(t.orgid=null),s[e]=t.shipReceiverName,n.childShipIds.push(t.childShipId),n.orgIds.push(t.orgid),n.loadIds.push(i.loadId)}),1<(s=s.filter(function(t,e){return s.indexOf(t)===e})).length&&s[0]!==s[1]&&(n.signName=""),1===s.length&&(n.signName=s[0]),console.log(n.signName)):this.isBatch=!1,this.signData.shipIds=n.shipIds,this.signData.childShipIds=n.childShipIds,this.signData.orgIds=n.orgIds,this.signData.loadIds=n.loadIds,this.signData.signName=n.signName,n={},console.log("signData",this.signData)},toggleAllRows:function(){var i=this;this.$nextTick(function(){i.detailList.forEach(function(t,e){i.$refs.multipleTable.toggleRowSelection(t,!0)})})},openSignVisible:function(){console.log("批次详情页",this.signData),this.$emit("sendInfoData",this.signData)},setColumn:function(t){this.tableColumn=t,this.tablekey=Math.random()}}}},TsW9:function(t,e,i){"use strict";e.a=function(t,e){return n.b.get("/api-order/order/load/v1/getBatchNo/",{params:{orgId:t,loadTypeId:e}})},e.h=function(t){return n.b.post("/api-order/order/load/v1/",t)},e.i=function(t){return n.b.put("/api-order/order/load/v1/",t)},e.c=function(t){return n.b.get("/api-order/order/load/v1/selectAddLoadRepertoryList/",{params:{orgId:t}})},e.f=function(t,e){return n.b.get("/api-order/order/load/v1/selectUpdateLoadRepertoryList/?orgId="+t+"&loadId="+e)},e.g=function(t,e){return n.b.get("/api-order/order/load/v1/selectUpdateLoadDetailList/?orgId="+t+"&loadId="+e)},e.d=function(t){return n.b.get("/api-order/order/load/v1/selectLoadDetailList/",{params:{loadId:t}})},e.e=function(){return n.b.get("/api-system/system/trunk/v1/findCarAndDriver/").then(function(t){return t})},e.b=function(){return n.b.get("/api-system/system/trunk/v1/findDriverAndCar/").then(function(t){return t})};var n=i("Vo7i")},bZPe:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i("4Psg"),s=i("+dUt");var a=function(t){i("1SLW")},o=i("VU/8")(n.a,s.a,a,null,null);e.default=o.exports},puNT:function(t,e,i){"use strict";var n=i("IAIf"),s=i("QcgQ");var a=function(t){i("MXEa")},o=i("VU/8")(n.a,s.a,a,null,null);e.a=o.exports},s0og:function(t,e,i){"use strict";var n={render:function(){var n=this,t=n.$createElement,s=n._self._c||t;return s("div",{staticClass:"detailTablePop"},[s("el-form",{staticClass:"detailTablePop_info",attrs:{inline:"","label-width":"100"},model:{value:n.info,callback:function(t){n.info=t},expression:"info"}},[s("table",[s("tbody",[s("tr",[s("th",[n._v("送货费")]),n._v(" "),s("td",[s("el-input",{attrs:{size:n.btnsize,disabled:""},model:{value:n.info.deliveryFee,callback:function(t){n.$set(n.info,"deliveryFee",t)},expression:"info.deliveryFee"}})],1),n._v(" "),s("th",[n._v("司机名称")]),n._v(" "),s("td",[s("el-input",{attrs:{size:n.btnsize,disabled:""},model:{value:n.info.dirverName,callback:function(t){n.$set(n.info,"dirverName",t)},expression:"info.dirverName"}})],1),n._v(" "),s("th",[n._v("司机电话")]),n._v(" "),s("td",[s("el-input",{attrs:{size:n.btnsize,disabled:""},model:{value:n.info.dirverMobile,callback:function(t){n.$set(n.info,"dirverMobile",t)},expression:"info.dirverMobile"}})],1)]),n._v(" "),s("tr",[s("th",[n._v("车牌号码")]),n._v(" "),s("td",[s("el-input",{attrs:{size:n.btnsize,disabled:""},model:{value:n.info.truckIdNumber,callback:function(t){n.$set(n.info,"truckIdNumber",t)},expression:"info.truckIdNumber"}})],1),n._v(" "),s("th",[n._v("可载体积")]),n._v(" "),s("td",[s("el-input",{attrs:{size:n.btnsize,disabled:""},model:{value:n.info.truckVolume,callback:function(t){n.$set(n.info,"truckVolume",t)},expression:"info.truckVolume"}})],1),n._v(" "),s("th",[n._v("可载重量")]),n._v(" "),s("td",[s("el-input",{attrs:{size:n.btnsize,disabled:""},model:{value:n.info.truckLoad,callback:function(t){n.$set(n.info,"truckLoad",t)},expression:"info.truckLoad"}})],1)]),n._v(" "),s("tr",[s("th",[n._v("分摊方式")]),n._v(" "),s("td",[s("el-input",{attrs:{size:n.btnsize,disabled:""},model:{value:n.info.apportionTypeName,callback:function(t){n.$set(n.info,"apportionTypeName",t)},expression:"info.apportionTypeName"}})],1),n._v(" "),s("th",[n._v("送货日期")]),n._v(" "),s("td",[s("el-input",{attrs:{value:n._f("parseTime")(n.info.loadTime,"{y}-{m}-{d} {h}:{i}:{s}"),size:n.btnsize,disabled:""}})],1),n._v(" "),s("th",[n._v("要求到达时间")]),n._v(" "),s("td",[s("el-input",{attrs:{value:n._f("parseTime")(n.info.requireArrivedTime,"{y}-{m}-{d} {h}:{i}:{s}"),size:n.btnsize,disabled:""}})],1)]),n._v(" "),s("tr",[s("th",[n._v("备注")]),n._v(" "),s("td",{attrs:{colspan:"5"}},[s("el-input",{attrs:{size:n.btnsize,disabled:""},model:{value:n.info.remark,callback:function(t){n.$set(n.info,"remark",t)},expression:"info.remark"}})],1)])])])]),n._v(" "),s("div",{staticClass:"tab_infos"},[s("div",{staticClass:"btns_box"},[s("el-button",{attrs:{size:n.btnsize,type:"warning",icon:"el-icon-circle-plus",plain:""},on:{click:function(t){n.doAction("add")}}},[n._v("签收")]),n._v(" "),s("el-button",{staticClass:"table_setup",attrs:{type:"primary",size:n.btnsize,icon:"el-icon-setting",plain:""},on:{click:n.setTable}},[n._v("表格设置")]),n._v(" "),s("el-button",{staticClass:"table_setup",attrs:{type:"success",size:n.btnsize,icon:"el-icon-printer",plain:""},on:{click:function(t){n.doAction("export")}}},[n._v("导出清单")]),n._v(" "),s("el-button",{staticClass:"table_setup",attrs:{type:"success",size:n.btnsize,icon:"el-icon-printer",plain:""},on:{click:function(t){n.doAction("print")}}},[n._v("打印清单")])],1),n._v(" "),s("div",{staticClass:"info_tab"},[s("el-table",{ref:"multipleTable",staticStyle:{height:"100%"},attrs:{"reserve-selection":!0,data:n.detailList,stripe:"",border:"",height:"100%","default-sort":{prop:"id",order:"ascending"},"tooltip-effect":"dark"},on:{"row-click":n.clickDetails,"selection-change":n.getSelection}},[s("el-table-column",{attrs:{fixed:"",sortable:"",type:"selection",width:"50"}}),n._v(" "),n._l(n.tableColumn,function(i){return[i.slot?s("el-table-column",{key:i.id,attrs:{fixed:i.fixed,sortable:"",label:i.label,width:i.width},scopedSlots:n._u([{key:"default",fn:function(e){return[i.click?s("span",{staticClass:"clickitem",domProps:{innerHTML:n._s(i.slot(e))},on:{click:function(t){t.stopPropagation(),i.click(e)}}}):s("span",{domProps:{innerHTML:n._s(i.slot(e))}})]}}])}):s("el-table-column",{key:i.id,attrs:{fixed:i.fixed,sortable:"",label:i.label,prop:i.prop,width:i.width}})]})],2)],1)]),n._v(" "),s("TableSetup",{attrs:{popVisible:n.setupTableVisible,columns:n.tableColumn},on:{close:function(t){n.setupTableVisible=!1},success:n.setColumn}})],1)},staticRenderFns:[]};e.a=n}});