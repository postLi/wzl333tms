webpackJsonp([185],{"/n+A":function(e,t,r){"use strict";var o={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"popRight-center",class:{showPopRight:e.isShow},style:{zIndex:e.zIndex}},[r("div",{staticClass:"popRight-header"},[e._t("title",[e._v(e._s(e.title))]),e._v(" "),r("i",{staticClass:"el-icon-close",attrs:{title:"关闭"},on:{click:e.close}})],2),e._v(" "),e.shouldRender?r("div",{staticClass:"popRight-content"},[e._t("content",[e._v("内容")])],2):e._e(),e._v(" "),r("div",{staticClass:"popRight-footer"},[e._t("footer",[e._v("底部")])],2)])},staticRenderFns:[]};t.a=o},"2aLA":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=r("kt+m"),n=r("VkEU");var i=function(e){r("QA73")},a=r("VU/8")(o.a,n.a,i,null,null);t.default=a.exports},"3EPC":function(e,t,r){"use strict";var o=r("qYK6"),n=r("/n+A");var i=function(e){r("f3wf")},a=r("VU/8")(o.a,n.a,i,null,null);t.a=a.exports},QA73:function(e,t){},TsW9:function(e,t,r){"use strict";t.a=function(e,t){return o.b.get("/api-order/order/load/v1/getBatchNo/",{params:{orgId:e,loadTypeId:t}})},t.h=function(e){return o.b.post("/api-order/order/load/v1/",e)},t.i=function(e){return o.b.put("/api-order/order/load/v1/",e)},t.c=function(e){return o.b.get("/api-order/order/load/v1/selectAddLoadRepertoryList/",{params:{orgId:e}})},t.f=function(e,t){return o.b.get("/api-order/order/load/v1/selectUpdateLoadRepertoryList/?orgId="+e+"&loadId="+t)},t.g=function(e,t){return o.b.get("/api-order/order/load/v1/selectUpdateLoadDetailList/?orgId="+e+"&loadId="+t)},t.d=function(e){return o.b.get("/api-order/order/load/v1/selectLoadDetailList/",{params:{loadId:e}})},t.e=function(){return o.b.get("/api-system/system/trunk/v1/findCarAndDriver/").then(function(e){return e})},t.b=function(){return o.b.get("/api-system/system/trunk/v1/findDriverAndCar/").then(function(e){return e})};var o=r("Vo7i")},VkEU:function(e,t,r){"use strict";var o={render:function(){var r=this,e=r.$createElement,o=r._self._c||e;return o("div",{staticClass:"lntelligent-maintain"},[o("el-dialog",{staticClass:"pickpopDepMain",attrs:{icon:"el-icon-edit-outline",title:r.popTitle,isShow:r.popVisible,"close-on-click-modal":!1,"before-close":r.closeMe,visible:r.isShow},on:{"update:visible":function(e){r.isShow=e}}},[void 0,r._v(" "),o("div",{directives:[{name:"loading",rawName:"v-loading",value:r.loading,expression:"loading"}],staticClass:"depmain-div"},[o("el-form",{ref:"formName",attrs:{inline:!0,"label-width":"80px",rules:r.rules,model:r.formInline,size:"mini"}},[o("el-form-item",{attrs:{label:"到达网点",prop:"orgId"}},[o("SelectTree",{staticClass:"orgClass",attrs:{disabledOption:[r.otherinfo.orgid]},on:{change:r.checkOrgid},model:{value:r.formInline.orgId,callback:function(e){r.$set(r.formInline,"orgId",e)},expression:"formInline.orgId"}})],1)],1),r._v(" "),o("el-alert",{attrs:{title:r.repertoryInfoMessage,type:"info",closable:!1}}),r._v(" "),o("div",{staticClass:"loadType"},[o("el-radio-group",{model:{value:r.repertoryInfo,callback:function(e){r.repertoryInfo=e},expression:"repertoryInfo"}},[o("el-radio",{attrs:{label:"1",border:""}},[o("span",[r._v("模式一：单车配载")]),r._v(" "),o("el-tooltip",{staticClass:"loadType_tips",attrs:{effect:"dark",content:"说明：28TMS按最大效益原则提供AI算法，为您指定的这一辆车提供装车建议方案。",placement:"top"}},[o("i",{staticClass:"el-icon-info"})])],1),r._v(" "),o("el-radio",{attrs:{label:"2",border:""}},[o("span",[r._v("模式二：配载完库存")]),r._v(" "),o("el-tooltip",{staticClass:"loadType_tips",attrs:{effect:"dark",content:"说明：28TMS自动帮助您把当前库存的货一次性拉完，为您提供整体装车建议方案。",placement:"top"}},[o("i",{staticClass:"el-icon-info"})])],1)],1)],1),r._v(" "),"1"===r.repertoryInfo?o("el-table",{ref:"multipleTable",staticClass:"tableIntelligent",staticStyle:{width:"100%","margin-bottom":"10px"},attrs:{data:r.usersArr,stripe:"",border:"",height:"207px","tooltip-effect":"dark"},on:{"row-click":r.clickDetails,"selection-change":r.getSelection}},[o("el-table-column",{attrs:{fixed:"",type:"selection",width:"60"}}),r._v(" "),o("el-table-column",{attrs:{fixed:"",prop:"name",label:"车型",width:"90"}}),r._v(" "),o("el-table-column",{attrs:{fixed:"",prop:"carNo",label:"车牌"},scopedSlots:r._u([{key:"default",fn:function(t){return[o("el-select",{attrs:{placeholder:"请选择车牌号",size:r.btnsize,disabled:t.row.selectdCheck,filterable:""},model:{value:t.row.carNo,callback:function(e){r.$set(t.row,"carNo",e)},expression:"scope.row.carNo"}},r._l(r.Trucks,function(e){return o("el-option",{key:e.truckIdNumber,attrs:{label:e.truckIdNumber,value:e.truckIdNumber}})}))]}}])}),r._v(" "),o("el-table-column",{attrs:{fixed:"",prop:"weight",width:"110",label:"承载重(kg)"}}),r._v(" "),o("el-table-column",{attrs:{fixed:"",prop:"vol",width:"90",label:"承载方(m³)"}}),r._v(" "),o("el-table-column",{attrs:{fixed:"",prop:"price",width:"120",label:"车费"},scopedSlots:r._u([{key:"default",fn:function(t){return[o("input",{directives:[{name:"numberOnly",rawName:"v-numberOnly:pointer",arg:"pointer"}],ref:"price",staticClass:"nativeinput",attrs:{type:"text",size:r.btnsize,maxlength:10,disabled:t.row.selectdCheck},domProps:{value:t.row.price},on:{change:function(e){return r.changeFright(t.$index,"price",e.target.value)},click:function(e){e.stopPropagation()}}})]}}])})],1):r._e(),r._v(" "),"2"===r.repertoryInfo?o("div",{staticClass:"loadTypeRepertory"},[o("h4",[r._v("1.符合以下条件的货物,一次性配载完.")]),r._v(" "),o("p",[r._v("开发中...")]),r._v(" "),o("h4",[r._v("2.符合以下条件的货物,不纳入配载.")]),r._v(" "),o("p",[r._v("开发中...")])]):r._e(),r._v(" "),r.isShowFeeTips?o("el-alert",{attrs:{title:"注：请填写车费，保证单车毛利的准确性。",type:"error",closable:!1}}):r._e()],1),r._v(" "),o("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{attrs:{type:"primary"},on:{click:function(e){r.submitForm("formName")}}},[r._v("确 定")]),r._v(" "),o("el-button",{on:{click:r.closeMe}},[r._v("取 消")])],1)],2)],1)},staticRenderFns:[]};t.a=o},ayAl:function(e,t,r){"use strict";t.n=function(e){return o.b.post("/api-order/order/load/v1/selectLoadMainInfoList",e).then(function(e){return e.data||{}})},t.q=function(e,t,r){return o.b.put("/api-order/order/load/v1/loadDepart?loadIds="+e+"&loadTypeId="+t+"&actualSendtime="+r)},t.p=function(e,t){return o.b.put("/api-order/order/load/v1/cancelLoadTruck?loadIds="+e+"&loadTypeId="+t)},t.o=function(e,t){return o.b.put("/api-order/order/load/v1/cancelLoadDepart/?loadIds="+e+"&loadTypeId="+t)},t.h=function(e){return o.b.get("/api-order/order/load/v1/contract/"+e)},t.d=function(e){return o.b.put("/api-order/order/load/v1/contract",e)},t.g=function(e){return o.b.get("/api-order/aitransport/tmsstandardcar/v1/",e).then(function(e){return e.data})},t.f=function(e){return o.b.post("/api-order/aitransport/intelligen/v1/init",e).then(function(e){return e.data})},t.j=function(e){return o.b.post("/api-order/order/load/v1/smartLoad",e)},t.e=function(e,t){return o.b.get("/api-order/aitransport/pzcarinfotms/v1/getCarInfo/?orgid="+e+"&sign="+t).then(function(e){return e.data})},t.l=function(e){return o.b.post("/api-order/aitransport/pzcarinfotms/v1/",e)},t.r=function(e){return o.b.put("/api-order/aitransport/pzcarinfotms/v1/",e)},t.a=function(e){return o.b.delete("/api-order/aitransport/pzcarinfotms/v1/"+e)},t.k=function(e){return o.b.post("/api-order/aitransport/tmssmartloadscheme/v1/loadSchemeList/",e).then(function(e){return e.data})},t.s=function(e){return o.b.put("/api-order/aitransport/tmssmartloadscheme/v1/updateScheme/",e).then(function(e){return e.data})},t.b=function(e){return o.b.delete("/api-order/aitransport/tmssmartloadscheme/v1/deleteScheme/?schemeGroup="+e.schemeGroup+"&orgid="+e.orgid).then(function(e){return e.data})},t.c=function(e){return o.b.delete("/api-order/aitransport/tmssmartloadscheme/v1/deleteSchemeById/?schemeId="+e.schemeId).then(function(e){return e.data})},t.m=function(e){return o.b.post("/api-order/aitransport/tmssmartloadscheme/v1/saveScheme/",e).then(function(e){return e.data})},t.t=function(e){return o.b.get("/api-order/aitransport/tmssmartloadscheme/v1/selectSchemeGroupDetail?schemeGroup="+e.schemeGroup+"&orgid="+e.orgid).then(function(e){return e.data})},t.i=function(e){return o.b.get("/api-order/aitransport/tmssmartloadscheme/v1/getRepertoryInfo?arriveOrgid="+e).then(function(e){return e.data})};var o=r("Vo7i")},f3wf:function(e,t){},"kt+m":function(e,t,r){"use strict";var o=r("mvHQ"),n=r.n(o),i=r("Dd8w"),a=r.n(i),s=(r("0xDb"),r("E4LH"),r("3EPC")),c=r("pAQG"),l=(r("OYTF"),r("o9X6")),d=r("NYxO"),u=r("ayAl"),p=r("TsW9");t.a={components:{PopFrame:s.a,querySelect:c.a,SelectTree:l.a},props:{popVisible:{type:Boolean,default:!1},isDepMain:{type:Boolean,default:!1},dotInfo:{type:[Object,Boolean],default:!1},createrId:[Number,String]},data:function(){return{selectdCheck:!0,btnsize:"mini",selected:[],rules:{orgId:[{required:!0,message:"到达网点不能为空",trigger:"blur"}]},formLabelWidth:"100",usersArr:[],checked1:!0,popTitle:"智能配载",loading:!0,formInline:{orgId:""},sendId:{pickupId:"",shipId:"",pickupFee:""},searchTable:{pageNum:1,pageSize:100},Trucks:[],cacheTruckList:[],loadTypeOptions:"1",isShowFeeTips:!1,repertoryInfo:"1",infoMessage:""}},computed:a()({},Object(d.b)(["otherinfo"]),{isShow:{get:function(){return this.popVisible},set:function(){return this.formInline.orgId}},repertoryInfoMessage:{get:function(){return this.infoMessage?this.infoMessage:"暂无城市信息！请选择到达网点。"},set:function(){}}}),watch:{dotInfo:function(e){},popVisible:function(e){this.infoFetch(),e||(this.infoMessage="")},orgId:function(e){}},mounted:function(){},methods:{checkOrgid:function(e){var t=this;Object(u.i)(e).then(function(e){e&&(t.infoMessage=e)}).catch(function(e){t._handlerCatchMsg(e)})},infoFetch:function(){var t=this;return this.getTrucks(this.otherinfo.orgid),this.loading=!0,Object(u.g)(this.searchTable).then(function(e){t.usersArr=e.list,t.loading=!1}).catch(function(e){t._handlerCatchMsg(e),t.loading=!1})},changeFright:function(e,t,r){console.log(e,t,r),this.usersArr[e][t]=Number(r);var o=this.usersArr[e].price;if(0===o)this.usersArr[e].price=o,this.$notify({title:"提示",message:"车费不能为0",type:"warning"});else{if(!(o<0))return this.$refs.multipleTable.toggleRowSelection(this.usersArr[e],!0),this.usersArr[e].price;this.usersArr[e].price=o,this.$notify({title:"提示",message:"车费不能小于0,默认为初始值",type:"warning"})}},search:function(e){return!e.pickupBatchNumber},closeMe:function(e){this.reset(),this.$emit("update:popVisible",!1),"function"==typeof e&&e()},reset:function(){this.usersArr=[],this.formInline.orgId=""},submitForm:function(e){var o=this;this.$refs[e].validate(function(e){if(!e)return!1;var t=0;if(o.usersArr.forEach(function(e){""!==e.price&&void 0!==e.price||t++}),0<t)o.isShowFeeTips=!0;else{o.isShowFeeTips=!1;var r=o.usersArr.filter(function(e){return!1===e.selectdCheck});console.log("===========data",r),o.$router.push({path:"/operation/order/loadIntelligent/components/intelligentImg",query:{tab:"智能配载",orgId:o.formInline.orgId,sendData:n()(r)}}),o.closeMe()}})},clickDetails:function(e,t,r){this.$refs.multipleTable.toggleRowSelection(e)},getSelection:function(e){this.usersArr.forEach(function(e){e.selectdCheck=!0}),e&&(this.selected=e,this.selected.forEach(function(e){e.selectdCheck=!1}))},getTrucks:function(t){var r=this;this.cacheTruckList[t]?this.Trucks=this.cacheTruckList[t]:Object(p.e)().then(function(e){r.Trucks=e.data,r.cacheTruckList[t]=e.data}).catch(function(e){r._handlerCatchMsg(e)})}}}},qYK6:function(e,t,r){"use strict";t.a={props:{width:{type:String,default:"400"},title:{type:String,default:"标题"},isShow:{type:Boolean,default:!1}},watch:{isShow:{handler:function(){this.isShow&&(this.shouldRender=!0)},immediate:!0}},data:function(){return{zIndex:(window.tmsPopZindex?window.tmsPopZindex+=1:window.tmsPopZindex=1e3,window.tmsPopZindex),shouldRender:!1}},methods:{close:function(){this.$emit("close")}}}}});