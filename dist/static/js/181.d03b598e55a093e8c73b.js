webpackJsonp([181,250],{"+dUt":function(t,e,i){"use strict";var o={render:function(){var i=this,t=i.$createElement,o=i._self._c||t;return o("pop-right",{directives:[{name:"loading",rawName:"v-loading",value:i.loading,expression:"loading"}],staticClass:"deliverInfoPop",attrs:{title:i.popTitle,isShow:i.popVisible},on:{close:i.closeMe}},[o("template",{slot:"content"},[o("div",{staticClass:"content_head"},[i._v("\n      批次号： "+i._s(i.info.batchNo)+"\n    ")]),i._v(" "),o("div",{staticClass:"editInfoPop_content"},[o("el-tabs",{on:{"tab-click":i.handleClick},model:{value:i.activeName,callback:function(t){i.activeName=t},expression:"activeName"}},[o("el-tab-pane",{attrs:{label:"批次详情",name:"first"}},[o("Detail",{staticClass:"animated fadeInRight",attrs:{info:i.info,isShow:i.popVisible},on:{isSuccess:i.isSuccess,sendInfoData:i.sendInfo}})],1),i._v(" "),o("el-tab-pane",{attrs:{label:"批次跟踪",name:"second"}},[o("div",{directives:[{name:"loading",rawName:"v-loading",value:i.loading,expression:"loading"}],staticClass:"info_box"},[o("el-row",{staticClass:"stepItem_title"},[o("el-col",{staticClass:"tracktype",attrs:{span:5}},[i._v("类型")]),i._v(" "),o("el-col",{attrs:{span:4}},[i._v("操作时间")]),i._v(" "),o("el-col",{attrs:{span:3}},[i._v("操作网点")]),i._v(" "),o("el-col",{attrs:{span:4}},[i._v("操作人")]),i._v(" "),o("el-col",{attrs:{span:8}},[i._v("操作信息")])],1),i._v(" "),o("div",{staticClass:"stepinfo"},[o("el-steps",{attrs:{direction:"vertical"}},i._l(i.trackDetail,function(e,t){return o("el-step",{key:t,class:{firstactive:0===t},nativeOn:{mouseover:function(t){return i.setThisActive(t)},mouseout:function(t){return i.offThisActive(t)}}},[o("span",{staticClass:"location",attrs:{slot:"icon"},slot:"icon"}),i._v(" "),o("template",{slot:"description"},[o("el-row",{staticClass:"stepItem"},[o("el-col",{attrs:{span:5}},[o("span",{staticClass:"typebox"},[i._v(i._s(e.loadStatus))]),i._v(" "),1===e.addStatus?[o("span",{staticClass:"modifybtn",attrs:{title:"编辑"},on:{click:function(t){i.editItem(e)}}}),i._v(" "),o("span",{staticClass:"deletebtn",attrs:{title:"删除"},on:{click:function(t){i.deleteTrack(e)}}})]:i._e()],2),i._v(" "),o("el-col",{attrs:{span:4}},[o("p",[i._v(i._s(e.operatorTime))])]),i._v(" "),o("el-col",{attrs:{span:3}},[o("p",[i._v(i._s(e.orgName))])]),i._v(" "),o("el-col",{attrs:{span:4}},[o("p",[1===e.addStatus?o("i",{staticClass:"track-human"}):o("i",{staticClass:"icon_blank"}),i._v(" "+i._s(e.operatorUsername)+"\n                        ")])]),i._v(" "),o("el-col",{attrs:{span:8}},[o("p",[i._v(i._s(e.operatorInfo))])])],1)],1)],2)}))],1)],1)])],1)],1)]),i._v(" "),i.isFootEdit?o("div",{staticClass:"stepinfo-footer stepFrom",attrs:{slot:"footer"},slot:"footer"},[o("el-form",{ref:"formModel",attrs:{inline:"",model:i.formModel,rules:i.ruleForm}},[o("el-form-item",{attrs:{label:"类型",prop:"trackNode"}},[o("el-input",{attrs:{maxlength:10,placeholder:"类型",size:"mini"},model:{value:i.formModel.loadStatus,callback:function(t){i.$set(i.formModel,"loadStatus",t)},expression:"formModel.loadStatus"}})],1),i._v(" "),o("el-form-item",{attrs:{label:"时间",prop:"createTime"}},[o("el-date-picker",{attrs:{"value-format":"yyyy-MM-dd HH:mm:ss",type:"datetime",placeholder:"选择时间",size:"mini"},model:{value:i.formModel.operatorTime,callback:function(t){i.$set(i.formModel,"operatorTime","string"==typeof t?t.trim():t)},expression:"formModel.operatorTime"}})],1),i._v(" "),o("el-form-item",{attrs:{label:"操作信息",prop:"trackInfo"}},[o("el-input",{attrs:{maxlength:250,placeholder:"",size:"mini"},model:{value:i.formModel.operatorInfo,callback:function(t){i.$set(i.formModel,"operatorInfo",t)},expression:"formModel.operatorInfo"}})],1),i._v(" "),o("el-form-item",{staticClass:"tracksavebtn"},[o("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(t){i.submitForm("formModel")}}},[i._v("保 存")]),i._v(" "),o("transition",{attrs:{name:"el-zoom-in-center"}},[i.isModify?o("el-button",{attrs:{type:"warning",size:"mini"},on:{click:function(t){i.resetForm()}}},[i._v("取 消")]):i._e()],1)],1)],1)],1):o("div",{attrs:{slot:"footer"},slot:"footer"},[o("el-button",{on:{click:i.closeMe}},[i._v("关闭")])],1)],2)},staticRenderFns:[]};e.a=o},"01nq":function(t,e,i){"use strict";e.e=function(t){return o.b.post("/api-order/order/track/v1/list/",t).then(function(t){return t.data||{list:[],totalCount:0}})},e.f=function(t){return o.b.post("/api-order/order/track/v1/transferList/",t).then(function(t){return t.data||{list:[],totalCount:0}})},e.b=function(t){return o.b.get("/api-order/order/track/v1/getLoadTrack/"+t).then(function(t){return t.data})},e.a=function(t){return o.b.delete("/api-order/order/track/v1/"+t).then(function(t){return t.data})},e.d=function(t){return o.b.post("/api-order/order/track/v1/insertTrack/",t).then(function(t){return t.data})},e.g=function(t){return o.b.put("/api-order/order/track/v1/updateById/",t).then(function(t){return t.data})},e.c=function(t){return o.b.get("/api-order/order/load/v1/selectLoadDetailList/?loadId="+t).then(function(t){return t.data})};var o=i("Vo7i")},"1SLW":function(t,e){},"4Psg":function(t,e,i){"use strict";i("E4LH");var o=i("P5Di"),s=i("01nq"),a=i("T+eR"),n=i("t5DY"),r=i("0xDb");e.a={components:{popRight:o.a,Detail:a.default},props:{popVisible:{type:Boolean,default:!1},orgid:{required:!0},id:{type:[Number,String]},info:{type:Array,default:function(){}}},data:function(){return{popTitle:"查看详情",loading:!1,isModify:!1,infoId:{},trackDetail:[],activeName:"first",ruleForm:{loadStatus:[{required:!0,trigger:"blur",message:"不能为空"}],operatorTime:[{required:!0,trigger:"blur",message:"不能为空"}],operatorInfo:[{required:!0,trigger:"blur",message:"不能为空"}]},isShowBtn:!1,isFootEdit:!1,formModel:{addStatus:1,loadId:0,loadStatus:"",operatorInfo:"",operatorOrgid:1,operatorTime:Object(r.parseTime)(new Date),operatorUserid:0}}},watch:{id:function(){},info:function(t){t&&(this.getDetail(),this.getSystemTime())},popVisible:function(t,e){this.popVisible&&this.getDetail()}},methods:{getSystemTime:function(){var e=this;Object(n.k)().then(function(t){t&&(e.formModel.operatorTime=t)}).catch(function(t){e.loading=!1,e._handlerCatchMsg(t)})},submitForm:function(t){var e=this;this.$refs[t].validate(function(t){t&&(e.formModel.id?(console.log("edit"),e.$confirm("此操作将修改跟踪信息, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){e.editTrack()}).catch(function(){e.$message({type:"warning",message:"取消操作"})})):(console.log("add"),e.$confirm("此操作将修改跟踪信息, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){e.addTrack()}).catch(function(){e.$message({type:"warning",message:"取消操作"})})))})},getDetail:function(){var e=this,t=this.id;Object(s.b)(t).then(function(t){e.trackDetail=Object(r.objectMerge2)([],t)})},closeMe:function(t){this.$emit("update:popVisible",!1),"function"==typeof t&&t()},deleteTrack:function(t){var e=this;this.$confirm("此操作将修改跟踪信息, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){return Object(s.a)(t.id).then(function(t){e.$message({type:"success",message:"删除成功"}),e.getDetail()}).catch(function(t){e._handlerCatchMsg(t)})}).catch(function(){e.$message({type:"warning",message:"取消操作"})})},editItem:function(t){this.resetForm(),this.formModel=Object(r.objectMerge2)({},t),this.isModify=!0},editTrack:function(){var e=this;this.formModel.transferId=0,Object(s.g)(this.formModel).then(function(t){e.$message({type:"success",message:"修改成功"}),e.getDetail(),e.resetForm()}).catch(function(t){e._handlerCatchMsg(t)})},addTrack:function(){var e=this;this.formModel.loadId=this.id,Object(s.d)(this.formModel).then(function(t){e.$message({type:"success",message:"添加成功"}),e.getDetail(),e.resetForm(),e.getSystemTime()}).catch(function(t){e._handlerCatchMsg(t)})},handleClick:function(){"second"===this.activeName?this.isFootEdit=!0:this.isFootEdit=!1},resetForm:function(){this.$refs.formModel.resetFields(),this.formModel=this.$options.data().formModel,this.isModify=!1},isSuccess:function(t){t&&(this.closeMe(),this.$emit("isSuccess",t))},sendInfo:function(t){console.log("父",t),this.$emit("sendInfoData",t)},offThisActive:function(t){var e=Object(r.closest)(t.target,".el-step");e&&e.classList.remove("trackactive")},setThisActive:function(t){var e=Object(r.closest)(t.target,".el-step");e&&e.classList.add("trackactive")}}}},OVjY:function(t,e){},"T+eR":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=i("TRi9"),s=i("s0og");var a=function(t){i("OVjY")},n=i("VU/8")(o.a,s.a,a,null,null);e.default=n.exports},TRi9:function(t,e,i){"use strict";var o=i("TsW9"),a=i("0xDb"),s=i("UQm2");e.a={components:{},props:{info:{type:Array,default:[]},isShow:{type:Boolean,default:!1}},data:function(){return{visible2:!1,thecode:"ORDER_DELIVER-1",btnsize:"mini",setupTableVisible:!1,loadId:"",tablekey:0,detailList:[],selectDetailList:[],message:!1,signData:{shipIds:[],orgIds:[],childShipIds:[],loadIds:[],signTime:"",signName:"",signCocumentTypeId:0,documentNum:"",signTypeId:0,remark:"",signPic:""},tableColumn:[{label:"运单号",prop:"shipSn",width:"120",fixed:!0},{label:"开单网点",prop:"shipFromOrgName",width:"120",fixed:!1},{label:"签收状态",prop:"signStatus",width:"120",fixed:!1},{label:"到付(元)",prop:"shipArrivepayFee",width:"90",fixed:!1},{label:"实付送货费(元)",prop:"deliveryFeeToPay",width:"100",fixed:!1},{label:"配载件数",prop:"loadAmount",width:"120",fixed:!1},{label:"配载重量(kg)",prop:"loadWeight",width:"120",fixed:!1},{label:"配载体积(m³)",prop:"loadVolume",width:"120",fixed:!1},{label:"运单件数",prop:"cargoAmount",width:"120",fixed:!1},{label:"运单重量(kg)",prop:"cargoWeight",width:"120",fixed:!1},{label:"运单体积(m³)",prop:"cargoVolume",width:"120",fixed:!1},{label:"发站",prop:"shipFromCityName",width:"160",fixed:!1},{label:"到站",prop:"shipToCityName",width:"160",fixed:!1},{label:"发货人",prop:"shipSenderName",width:"120",fixed:!1},{label:"发货人电话",prop:"shipSenderMobile",width:"120",fixed:!1},{label:"收货人",prop:"shipReceiverName",width:"120",fixed:!1},{label:"收货人电话",prop:"shipReceiverMobile",width:"120",fixed:!1},{label:"货品名",prop:"cargoName",width:"120",fixed:!1},{label:"货号",prop:"shipGoodsSn",width:"130",fixed:!1},{label:"运单备注",prop:"shipRemarks",width:"120",fixed:!1}]}},watch:{isShow:{handler:function(t,e){t&&(this.getLoadTrack(),this.toggleAllRows())},immediate:!0},info:{handler:function(t,e){t&&(this.getLoadTrack(),this.toggleAllRows())},deep:!0}},methods:{setTable:function(){this.setupTableVisible=!0},doAction:function(t){switch(t){case"add":this.openSignVisible();break;case"print":Object(s.d)({data:this.selectDetailList.length?this.selectDetailList:this.detailList,columns:this.tableColumn,name:"送货管理",type:"load"});break;case"export":Object(s.g)({data:this.selectDetailList.length?this.selectDetailList:this.detailList,columns:this.tableColumn,name:"送货管理"})}},setData:function(){},getLoadTrack:function(){var e=this;this.loadId=this.info.id,Object(o.e)(this.loadId).then(function(t){t&&(e.detailList=t.data,e.toggleAllRows())}).catch(function(t){e.loading=!1,e._handlerCatchMsg(t)})},clickDetails:function(t){this.$refs.multipleTable.toggleRowSelection(t)},getSelection:function(t){var i=this,o={};this.$set(o,"shipIds",[]),this.$set(o,"orgIds",[]),this.$set(o,"childShipIds",[]),this.$set(o,"loadIds",[]),this.$set(o,"signName","");var s=[];0<t.length?(this.selectDetailList=Object(a.objectMerge2)([],t),this.selectDetailList.forEach(function(t,e){o.shipIds.push(t.shipId),t.childShipId&&""!==t.childShipId||(t.childShipId=null),t.orgid&&""!==t.orgid||(t.orgid=null),s[e]=t.shipReceiverName,o.childShipIds.push(t.childShipId),o.orgIds.push(t.orgid),o.loadIds.push(i.loadId)}),1<(s=s.filter(function(t,e){return s.indexOf(t)===e})).length&&s[0]!==s[1]&&(o.signName=""),1===s.length&&(o.signName=s[0]),console.log(o.signName)):this.isBatch=!1,this.signData.shipIds=o.shipIds,this.signData.childShipIds=o.childShipIds,this.signData.orgIds=o.orgIds,this.signData.loadIds=o.loadIds,this.signData.signName=o.signName,o={},console.log("signData",this.signData)},toggleAllRows:function(){var i=this;this.$nextTick(function(){i.detailList.forEach(function(t,e){i.$refs.multipleTable.toggleRowSelection(t,!0)})})},openSignVisible:function(){console.log("批次详情页",this.signData),this.$emit("sendInfoData",this.signData)},setColumn:function(t){this.tableColumn=t,this.tablekey=(new Date).getTime(),this.$refs.multipleTable.doLayout()},setTableWidth:function(t,e,i,o){var s=this,a=this.tableColumn.filter(function(t){return t.prop===i.property});a.length&&(a[0].width=t,console.log("应该要显示保存框了"),this.visible2=!0,clearTimeout(this.tabletimer),this.tabletimer=setTimeout(function(){s.visible2=!1},1e4))},saveToTableSetup:function(){this.visible2=!1,this.eventBus.$emit("tablesetup.change",this.thecode,this.tableColumn)},showSaveBox:function(){clearTimeout(this.tabletimer)},hideSaveBox:function(){var t=this;clearTimeout(this.tabletimer),this.tabletimer=setTimeout(function(){t.visible2=!1},1e4)}}}},TsW9:function(t,e,i){"use strict";e.a=function(t,e){return o.b.get("/api-order/order/load/v1/getBatchNo/",{params:{orgId:t,loadTypeId:e}})},e.i=function(t){return o.b.post("/api-order/order/load/v1/",t)},e.j=function(t){return o.b.put("/api-order/order/load/v1/",t)},e.d=function(t){return o.b.get("/api-order/order/load/v1/selectAddLoadRepertoryList/",{params:{orgId:t}})},e.g=function(t,e){return o.b.get("/api-order/order/load/v1/selectUpdateLoadRepertoryList/?orgId="+t+"&loadId="+e)},e.h=function(t,e){return o.b.get("/api-order/order/load/v1/selectUpdateLoadDetailList/?orgId="+t+"&loadId="+e)},e.e=function(t){return o.b.get("/api-order/order/load/v1/selectLoadDetailList/",{params:{loadId:t}})},e.f=function(){return o.b.get("/api-system/system/trunk/v1/findCarAndDriver/").then(function(t){return t})},e.b=function(){return o.b.get("/api-system/system/trunk/v1/findDriverAndCar/").then(function(t){return t})},e.c=function(t){return o.b.post("/api-order/order/tmsordertrailterminal/v1/list",t).then(function(t){return t.data})};var o=i("Vo7i")},bZPe:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=i("4Psg"),s=i("+dUt");var a=function(t){i("1SLW")},n=i("VU/8")(o.a,s.a,a,null,null);e.default=n.exports},s0og:function(t,e,i){"use strict";var o={render:function(){var o=this,t=o.$createElement,s=o._self._c||t;return s("div",{staticClass:"detailTablePop"},[s("el-form",{staticClass:"detailTablePop_info",attrs:{inline:"","label-width":"100"},model:{value:o.info,callback:function(t){o.info=t},expression:"info"}},[s("table",[s("tbody",[s("tr",[s("th",[o._v("送货费")]),o._v(" "),s("td",[s("el-input",{attrs:{size:o.btnsize,disabled:""},model:{value:o.info.deliveryFee,callback:function(t){o.$set(o.info,"deliveryFee",t)},expression:"info.deliveryFee"}})],1),o._v(" "),s("th",[o._v("司机名称")]),o._v(" "),s("td",[s("el-input",{attrs:{size:o.btnsize,disabled:""},model:{value:o.info.dirverName,callback:function(t){o.$set(o.info,"dirverName",t)},expression:"info.dirverName"}})],1),o._v(" "),s("th",[o._v("司机电话")]),o._v(" "),s("td",[s("el-input",{attrs:{size:o.btnsize,disabled:""},model:{value:o.info.dirverMobile,callback:function(t){o.$set(o.info,"dirverMobile",t)},expression:"info.dirverMobile"}})],1)]),o._v(" "),s("tr",[s("th",[o._v("车牌号码")]),o._v(" "),s("td",[s("el-input",{attrs:{size:o.btnsize,disabled:""},model:{value:o.info.truckIdNumber,callback:function(t){o.$set(o.info,"truckIdNumber",t)},expression:"info.truckIdNumber"}})],1),o._v(" "),s("th",[o._v("可载体积")]),o._v(" "),s("td",[s("el-input",{attrs:{size:o.btnsize,disabled:""},model:{value:o.info.truckVolume,callback:function(t){o.$set(o.info,"truckVolume",t)},expression:"info.truckVolume"}})],1),o._v(" "),s("th",[o._v("可载重量")]),o._v(" "),s("td",[s("el-input",{attrs:{size:o.btnsize,disabled:""},model:{value:o.info.truckLoad,callback:function(t){o.$set(o.info,"truckLoad",t)},expression:"info.truckLoad"}})],1)]),o._v(" "),s("tr",[s("th",[o._v("分摊方式")]),o._v(" "),s("td",[s("el-input",{attrs:{size:o.btnsize,disabled:""},model:{value:o.info.apportionTypeName,callback:function(t){o.$set(o.info,"apportionTypeName",t)},expression:"info.apportionTypeName"}})],1),o._v(" "),s("th",[o._v("送货日期")]),o._v(" "),s("td",[s("el-input",{attrs:{value:o._f("parseTime")(o.info.loadTime,"{y}-{m}-{d} {h}:{i}:{s}"),size:o.btnsize,disabled:""}})],1),o._v(" "),s("th",[o._v("要求到达时间")]),o._v(" "),s("td",[s("el-input",{attrs:{value:o._f("parseTime")(o.info.requireArrivedTime,"{y}-{m}-{d} {h}:{i}:{s}"),size:o.btnsize,disabled:""}})],1)]),o._v(" "),s("tr",[s("th",[o._v("追货宝")]),o._v(" "),s("td",[s("el-input",{attrs:{value:o.info.terminalNo,size:o.btnsize,disabled:""}})],1),o._v(" "),s("th",[o._v("备注")]),o._v(" "),s("td",{attrs:{colspan:"5"}},[s("el-input",{attrs:{size:o.btnsize,disabled:""},model:{value:o.info.remark,callback:function(t){o.$set(o.info,"remark",t)},expression:"info.remark"}})],1)])])])]),o._v(" "),s("div",{staticClass:"tab_infos"},[s("div",{staticClass:"btns_box"},[s("el-button",{attrs:{size:o.btnsize,type:"warning",icon:"el-icon-circle-plus",plain:""},on:{click:function(t){o.doAction("add")}}},[o._v("签收")]),o._v(" "),s("el-popover",{attrs:{placement:"top",trigger:"manual",width:"160",value:o.visible2},nativeOn:{mouseenter:function(t){return o.showSaveBox(t)},mouseout:function(t){return o.hideSaveBox(t)}}},[s("p",[o._v("表格宽度修改了，是否要保存？")]),o._v(" "),s("div",{staticStyle:{"text-align":"right",margin:"0"}},[s("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(t){o.visible2=!1}}},[o._v("取消")]),o._v(" "),s("el-button",{attrs:{type:"primary",size:"mini"},on:{click:o.saveToTableSetup}},[o._v("确定")])],1),o._v(" "),s("el-button",{staticClass:"table_setup",attrs:{slot:"reference",type:"primary",size:o.btnsize,icon:"el-icon-setting",plain:""},on:{click:o.setTable},slot:"reference"},[o._v("表格设置")])],1),o._v(" "),s("el-button",{staticClass:"table_setup",attrs:{type:"success",size:o.btnsize,icon:"el-icon-printer",plain:""},on:{click:function(t){o.doAction("export")}}},[o._v("导出清单")]),o._v(" "),s("el-button",{staticClass:"table_setup",attrs:{type:"success",size:o.btnsize,icon:"el-icon-printer",plain:""},on:{click:function(t){o.doAction("print")}}},[o._v("打印清单")])],1),o._v(" "),s("div",{staticClass:"info_tab"},[s("el-table",{key:o.tablekey,ref:"multipleTable",staticStyle:{height:"100%"},attrs:{"reserve-selection":!0,data:o.detailList,stripe:"",border:"",height:"100%","default-sort":{prop:"id",order:"ascending"},"tooltip-effect":"dark"},on:{"header-dragend":o.setTableWidth,"row-click":o.clickDetails,"selection-change":o.getSelection}},[s("el-table-column",{attrs:{fixed:"",sortable:"",type:"selection",width:"50"}}),o._v(" "),o._l(o.tableColumn,function(i){return[i.slot?s("el-table-column",{key:i.id,attrs:{fixed:i.fixed,sortable:"",label:i.label,width:i.width},scopedSlots:o._u([{key:"default",fn:function(e){return[i.click?s("span",{staticClass:"clickitem",domProps:{innerHTML:o._s(i.slot(e))},on:{click:function(t){t.stopPropagation(),i.click(e)}}}):s("span",{domProps:{innerHTML:o._s(i.slot(e))}})]}}])}):s("el-table-column",{key:i.id,attrs:{fixed:i.fixed,sortable:"",label:i.label,prop:i.prop,width:i.width}})]})],2)],1)]),o._v(" "),s("TableSetup",{attrs:{popVisible:o.setupTableVisible,columns:o.tableColumn,code:o.thecode},on:{close:function(t){o.setupTableVisible=!1},success:o.setColumn}})],1)},staticRenderFns:[]};e.a=o}});