webpackJsonp([76,204,257,329],{"+eew":function(e,t,i){"use strict";var r={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-form",{staticClass:"staff_searchinfo wzl clearfix",attrs:{inline:!0,size:t.btnsize,"label-position":"right","label-width":"70px",rules:t.rules,model:t.searchForm}},[i("div",{staticClass:"staff_searchinfo--input"},[i("el-form-item",{attrs:{label:"开单时间"}},[i("div",{staticClass:"block"},[i("el-date-picker",{attrs:{"default-value":t.defaultTime,type:"daterange",align:"right","popper-class":"searchCreatTime","value-format":"yyyy-MM-dd","start-placeholder":"开始日期","picker-options":t.pickerOptions2,"end-placeholder":"结束日期"},model:{value:t.searchCreatTime,callback:function(e){t.searchCreatTime=e},expression:"searchCreatTime"}})],1)]),t._v(" "),i("el-form-item",{attrs:{label:"开单网点"}},[i("SelectTree",{model:{value:t.searchForm.shipFromOrgid,callback:function(e){t.$set(t.searchForm,"shipFromOrgid",e)},expression:"searchForm.shipFromOrgid"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"签收网点"}},[i("SelectTree",{attrs:{orgid:t.otherinfo.orgid},model:{value:t.searchForm.signOrgid,callback:function(e){t.$set(t.searchForm,"signOrgid",e)},expression:"searchForm.signOrgid"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"签收状态",prop:"signStatus"}},[i("selectType",{attrs:{type:"sign_status"},model:{value:t.searchForm.signStatus,callback:function(e){t.$set(t.searchForm,"signStatus",e)},expression:"searchForm.signStatus"}},[i("el-option",{attrs:{slot:"head",label:"全部",value:""},slot:"head"})],1)],1),t._v(" "),i("el-form-item",{attrs:{label:"凭证状态",prop:"signCertificate"}},[i("selectType",{attrs:{type:"sign_certificate"},model:{value:t.searchForm.signCertificate,callback:function(e){t.$set(t.searchForm,"signCertificate",e)},expression:"searchForm.signCertificate"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"运单号",prop:"shipSn"}},[i("el-input",{attrs:{maxlength:20,"auto-complete":"off",clearable:""},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.onSubmit(e):null}},model:{value:t.searchForm.shipSn,callback:function(e){t.$set(t.searchForm,"shipSn",e)},expression:"searchForm.shipSn"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"发站"}},[i("el-input",{attrs:{maxlength:20,"auto-complete":"off",clearable:""},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.onSubmit(e):null}},model:{value:t.searchForm.shipFromCityName,callback:function(e){t.$set(t.searchForm,"shipFromCityName",e)},expression:"searchForm.shipFromCityName"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"到站"}},[i("el-input",{attrs:{maxlength:20,"auto-complete":"off",clearable:""},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.onSubmit(e):null}},model:{value:t.searchForm.shipToCityName,callback:function(e){t.$set(t.searchForm,"shipToCityName",e)},expression:"searchForm.shipToCityName"}})],1)],1),t._v(" "),i("el-form-item",{staticClass:"staff_searchinfo--btn"},[i("el-button",{attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v("查询")]),t._v(" "),i("el-button",{attrs:{type:"info",plain:""},on:{click:t.clearForm}},[t._v("清空")])],1)],1)},staticRenderFns:[]};t.a=r},"/n+A":function(e,t,i){"use strict";var r={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"popRight-center",class:{showPopRight:e.isShow},style:{zIndex:e.zIndex}},[i("div",{staticClass:"popRight-header"},[e._t("title",[e._v(e._s(e.title))]),e._v(" "),i("i",{staticClass:"el-icon-close",attrs:{title:"关闭"},on:{click:e.close}})],2),e._v(" "),e.shouldRender?i("div",{staticClass:"popRight-content"},[e._t("content",[e._v("内容")])],2):e._e(),e._v(" "),i("div",{staticClass:"popRight-footer"},[e._t("footer",[e._v("底部")])],2)])},staticRenderFns:[]};t.a=r},"0Iqq":function(e,t){},"3EPC":function(e,t,i){"use strict";var r=i("qYK6"),s=i("/n+A");var o=function(e){i("f3wf")},a=i("VU/8")(r.a,s.a,o,null,null);t.a=a.exports},"3qpv":function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=i("eawI"),s=i("+eew"),o=i("VU/8")(r.a,s.a,null,null,null);t.default=o.exports},"5clc":function(e,t,i){"use strict";var r=i("3EPC"),s=i("o9X6"),o=i("9UCZ"),a=i("oZAD"),n=i("E4LH"),l=i("0xDb");t.a={computed:{isShow:{get:function(){return this.popVisible},set:function(){}}},components:{PopFrame:r.a,SelectTree:s.a,SelectType:o.a},props:{popVisible:{type:Boolean,default:!1},dotInfo:[Array,Object],isDepMain:{type:Boolean,default:!1},show:{type:Boolean,default:!1},createrId:[Number,String],isModify:{type:Boolean,default:!1},isSongh:{type:Boolean,default:!1}},data:function(){return{searchCreatTime:+new Date,pickOption2:"",checked1:!0,popTitle:"",loading:!1,type:"",form:{num:"",repertoryIds:[],signTime:"",signName:"",receiver_customer_name:"",signCocumentTypeId:96,documentNum:"",signTypeId:99,remark:"",signPic:"",loadIds:[],shipIds:[],childShipIds:[],orgIds:[]},formLabelWidth:"80px",tooltip:!1,disabled:!1,rules:{documentNum:[{pattern:n.a.ONLY_NUMBER_AND_LETTER,trigger:"blur",message:"只能输入字母和数字"}],signName:[{required:!0,message:"请输入签收人",trigger:"blur"}]}}},mounted:function(){},watch:{isDepMain:function(){},dotInfo:function(e){this.form.num=this.dotInfo.length;var t=0;this.dotInfo.map(function(e){t+=e.shipArrivepayFee?e.shipArrivepayFee:0}),this.form.shipArrivepayFee=t.toFixed(2),t=0,this.dotInfo.map(function(e){t+=e.agencyFund?e.agencyFund:0}),this.form.agencyFund=t.toFixed(2)},orgid:function(e){this.form.orgid=e},isModify:{handler:function(e){this.isModify&&(this.popTitle="批量签收")},immediate:!0},isSongh:{handler:function(e){this.popTitle="批量签收"}},createrId:function(e){}},methods:{reset:function(){this.$refs.ruleForm.resetFields()},closeMe:function(e){this.$emit("close"),this.reset(),"function"==typeof e&&e()},submitForm:function(e){var r=this;this.form.signTime=this.searchCreatTime,this.$refs[e].validate(function(e){if(!e)return!1;r.loading=!0;var t=Object(l.objectMerge2)({},r.form);t.repertoryIds=r.dotInfo.map(function(e){return e.repertoryId});var i=void 0;r.isModify?i=Object(a.e)(t):r.isSongh&&(t.shipIds=r.dotInfo.map(function(e){return e.shipId}),t.childShipIds=r.dotInfo.map(function(e){return e.childShipId}),t.orgIds=r.dotInfo.map(function(e){return e.orgId}),t.loadIds=r.dotInfo.map(function(e){return e.loadId}),i=Object(a.a)(t)),i.then(function(e){r.$message({message:"签收成功~",type:"success"}),r.closeMe(),r.$emit("success")}).catch(function(e){r.loading=!1,r.$message.warning(e.text),r.closeMe()})})}}}},FQaU:function(e,t,i){"use strict";var r=i("Dd8w"),s=i.n(r),o=(i("E4LH"),i("oZAD")),a=i("P5Di"),n=i("Zjyc"),l=i("o9X6"),c=i("9UCZ"),p=i("NYxO"),d=i("0xDb");t.a={components:{popRight:a.a,Upload:n.a,SelectTree:l.a,SelectType:c.a},props:{popVisible:{type:Boolean,default:!1},repertoryId:[Object,Array,String],orgid:{required:!0},id:{type:[Number,String]},isModify:{type:Boolean,default:!1},isPick:{type:Boolean,default:!1},isDelivery:{type:Boolean,default:!1},info:{type:Object,default:function(){}},issender:{type:Boolean,dafault:!1},isDbclick:{type:Boolean,default:!1}},computed:s()({},Object(p.b)(["otherinfo"])),data:function(){return{senderList:[],receiverList:[],dataset:[],searchCreatTime:+new Date,pickOption2:"",dataform:{},childShipId:"",disabled:!1,form:{repertoryId:"",signTime:"",signName:"",signCocumentTypeId:96,shipsignNameSn:"",documentNum:"",signTypeId:99,remark:"",signPic:""},obj:{repertoryId:"",signTime:"",signName:"",signCocumentTypeId:96,shipsignNameSn:"",documentNum:"",signTypeId:99,remark:"",signPic:"",signId:""},devobj:{childShipId:""},rules:{signName:[{required:!0,message:"请输入签收人",trigger:"blur"}],searchCreatTime:[{required:!0,message:"请选择时间",trigger:"blur"}]},formLabelWidth:"100px",tooltip:!1,popTitle:"签收录入",loading:!1,inited:!1}},mounted:function(){this.form.signId=this.orgid,this.inited||(this.inited=!0,this.initInfo())},watch:{popVisible:function(e,t){this.inited||(this.inited=!0,this.initInfo()),console.log("popVisible:",e,this.repertoryId),e&&this.setInfo()},repertoryId:function(){for(var e in this.form)this.form[e]="";this.isDbclick?this.popTitle="查看信息":this.isPick?this.popTitle="修改签收":this.popTitle="签收录入",this.setInfo()},immediate:!0},methods:{setInfo:function(){this.form=Object(d.objectMerge2)({},this.form,this.repertoryId),this.obj.repertoryId=this.repertoryId.repertoryId,this.obj.signTime=this.repertoryId.signTime,this.obj.signCocumentTypeId=this.repertoryId.signCocumentTypeId,this.obj.shipsignNameSn=this.repertoryId.shipsignNameSn,this.obj.documentNum=this.repertoryId.documentNum,this.obj.remark=this.repertoryId.remark,this.obj.signPic=this.repertoryId.signPic,this.form.remark=this.repertoryId.signRemark,console.log(this.obj.signTypeId),this.repertoryId.signTypeId?(this.form.signTypeId=this.repertoryId.signTypeId,this.form.signCocumentTypeId=this.repertoryId.signCocumentTypeId):(this.form.signTypeId=99,this.form.signCocumentTypeId=96),this.form.signName=this.repertoryId.receiver_customer_name},reset:function(){this.$refs.ruleForm.resetFields()},querySearchSender:function(i){var r=this;return function(t,e){e(r.senderList.filter(function(e){return-1!==e[i].indexOf(t)}))}},pick:function(){var t=this;return Object(o.g)().then(function(e){console.log(e)}).catch(function(e){t.loading=!1,t._handlerCatchMsg(e)})},querySearchReceiver:function(i){var r=this;return function(t,e){e(r.receiverList.filter(function(e){return-1!==e[i].indexOf(t)}))}},handleSelectReceiver:function(e){},initInfo:function(){},submitForm:function(e){var s=this;this.form.signTime=this.searchCreatTime,this.$refs[e].validate(function(e){if(!e)return!1;s.loading=!0;var t=Object(d.objectMerge2)({},s.obj);for(var i in t)t[i]=s.form[i];t.childShipId=s.repertoryId.childShipId,t.shipId=s.repertoryId.shipId,t.loadId=s.repertoryId.loadId;var r=void 0;s.isPick?r=Object(o.j)(s.id,t):s.isDelivery?(t.orgId=s.repertoryId.orgId,r=Object(o.h)(t)):r=Object(o.f)(t),r.then(function(e){s.$message({message:"保存成功~",type:"success"}),s.closeMe(),s.$emit("success"),s.loading=!1}).catch(function(e){s.loading=!1,s._handlerCatchMsg(e),s.closeMe()})})},closeMe:function(e){this.reset(),this.$emit("update:popVisible",!1),"function"==typeof e&&e()}}}},MunV:function(e,t,i){"use strict";var r={render:function(){var r=this,e=r.$createElement,s=r._self._c||e;return s("div",{directives:[{name:"loading",rawName:"v-loading",value:r.loading,expression:"loading"}],staticClass:"tab-content",on:{success:r.fetchAllreceipt}},[s("SearchForm",{attrs:{orgid:r.otherinfo.orgid,btnsize:r.btnsize},on:{change:r.getSearchParam}}),r._v(" "),s("div",{staticClass:"tab_info"},[s("div",{staticClass:"btns_box"},[s("el-button",{directives:[{name:"has",rawName:"v-has:ORDERSIGN_ADD2",arg:"ORDERSIGN_ADD2"}],attrs:{type:"primary",size:r.btnsize,icon:"el-icon-circle-check-outline",plain:""},on:{click:function(e){r.doAction("pick")}}},[r._v("签收")]),r._v(" "),s("el-button",{directives:[{name:"has",rawName:"v-has:ORDERSIGN_CANCEL2",arg:"ORDERSIGN_CANCEL2"}],attrs:{type:"primary",size:r.btnsize,icon:"el-icon-circle-close-outline",plain:""},on:{click:function(e){r.doAction("cancel")}}},[r._v("取消签收")]),r._v(" "),s("el-button",{directives:[{name:"has",rawName:"v-has:ORDERSIGN_EDIT2",arg:"ORDERSIGN_EDIT2"}],attrs:{type:"primary",size:r.btnsize,icon:"el-icon-edit",plain:""},on:{click:function(e){r.doAction("amend")}}},[r._v("修改")]),r._v(" "),s("el-button",{directives:[{name:"has",rawName:"v-has:ORDERSIGN_EXP2",arg:"ORDERSIGN_EXP2"}],attrs:{type:"primary",size:r.btnsize,icon:"el-icon-upload2",plain:""},on:{click:function(e){r.doAction("export")}}},[r._v("导出")]),r._v(" "),s("el-button",{staticClass:"table_setup",attrs:{type:"primary",size:r.btnsize,icon:"el-icon-setting",plain:""},on:{click:r.setTable}},[r._v("表格设置")])],1),r._v(" "),s("div",{staticClass:"info_tab"},[s("el-table",{key:r.tablekey,ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:r.dataset,border:"","summary-method":r.getSumLeft,"show-summary":"",height:"100%","tooltip-effect":"dark","default-sort":{prop:"id",order:"ascending"},stripe:""},on:{"row-dblclick":r.getDbClick,"row-click":r.clickDetails,"selection-change":r.getSelection}},[s("el-table-column",{attrs:{fixed:"",sortable:"",type:"selection",width:"50"}}),r._v(" "),r._l(r.tableColumn,function(i){return[i.slot?s("el-table-column",{key:i.id,attrs:{fixed:i.fixed,sortable:"",label:i.label,width:i.width},scopedSlots:r._u([{key:"default",fn:function(t){return[i.click?s("span",{staticClass:"clickitem",domProps:{innerHTML:r._s(i.slot(t))},on:{click:function(e){e.stopPropagation(),i.click(t)}}}):s("span",{domProps:{innerHTML:r._s(i.slot(t))}})]}}])}):s("el-table-column",{key:i.id,attrs:{fixed:i.fixed,sortable:"",label:i.label,prop:i.prop,width:i.width}})]})],2)],1),r._v(" "),s("div",{staticClass:"info_tab_footer"},[r._v("共计:"+r._s(r.total)+"\n      "),s("div",{staticClass:"show_pager"},[s("Pager",{attrs:{total:r.total},on:{change:r.handlePageChange}})],1)])]),r._v(" "),s("Addsign",{attrs:{isPick:r.isPick,issender:!0,isDbclick:r.isDbclick,repertoryId:r.repertoryId,info:r.selectInfo,orgid:r.orgid,popVisible:r.AddSignVisible,id:r.id,isDelivery:r.isDelivery},on:{"update:popVisible":function(e){r.AddSignVisible=e},close:r.openAddSign,success:r.fetchData}}),r._v(" "),s("Addbatch",{attrs:{issender:!0,dotInfo:r.dotInfo,popVisible:r.popVisible,isModify:r.isModify,isSongh:r.isSongh},on:{close:r.closeAddBacth,success:r.fetchData}}),r._v(" "),s("TableSetup",{attrs:{popVisible:r.setupTableVisible,columns:r.tableColumn,code:"ORDERSIGN2"},on:{close:r.closeSetupTable,success:r.setColumn}})],1)},staticRenderFns:[]};t.a=r},P2s3:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=i("FQaU"),s=i("zcuI");var o=function(e){i("0Iqq")},a=i("VU/8")(r.a,s.a,o,null,null);t.default=a.exports},SZgV:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=i("5clc"),s=i("ypAC");var o=function(e){i("en8k")},a=i("VU/8")(r.a,s.a,o,null,null);t.default=a.exports},eawI:function(e,t,i){"use strict";var r=i("woOf"),s=i.n(r),o=i("o9X6"),a=i("9UCZ"),n=i("66wn"),l=i("0xDb");t.a={components:{SelectTree:o.a,SelectCity:n.a,SelectType:a.a},props:{btnsize:{type:String,default:"mini"},orgid:{type:Number},issender:{type:Boolean,dafault:!1}},computed:{},data:function(){return{searchCreatTime:[],defaultTime:[Object(l.parseTime)(+new Date-5184e6,"{y}-{m}-{d}"),Object(l.parseTime)(new Date,"{y}-{m}-{d}")],thestatus:"",searchForm:{shipFromOrgid:"",signOrgid:"",shipSn:"",shipFromCityName:"",shipToCityName:"",signCertificate:230,signStatus:226,startTime:"",endTime:""},rules:{},pickerOptions2:{shortcuts:l.pickerOptions2}}},watch:{orgid:function(e){this.searchForm.shipFromOrgid=e}},mounted:function(){this.searchForm.shipFromOrgid="",this.searchForm.signOrgid=this.otherinfo.orgid,this.searchCreatTime=this.defaultTime,this.onSubmit()},methods:{onSubmit:function(){this.searchForm.startTime=this.searchCreatTime?Object(l.parseTime)(this.searchCreatTime[0],"{y}-{m}-{d}")+" 00:00:00":"",this.searchForm.endTime=this.searchCreatTime?Object(l.parseTime)(this.searchCreatTime[1],"{y}-{m}-{d}")+" 23:59:59":"";var e=s()({},this.searchForm);this.$emit("change",e)},clearForm:function(){this.searchForm.signOrgid=this.otherinfo.orgid,this.searchForm.shipFromOrgid="",this.searchForm.signStatus="",this.searchForm.signCertificate="",this.searchForm.shipSn="",this.searchForm.shipFromCityName="",this.searchForm.shipToCityName="",this.searchCreatTime=this.defaultTime}}}},en8k:function(e,t){},f3wf:function(e,t){},hRtg:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=i("uEAc"),s=i("MunV"),o=i("VU/8")(r.a,s.a,null,null,null);t.default=o.exports},oZAD:function(e,t,i){"use strict";t.g=function(e){return r.b.post("/api-order/order/sign/v1/pickupList",e).then(function(e){return e.data||{}})},t.b=function(e){return r.b.post("/api-order/order/sign/v1/cancelPickupSign",e).then(function(e){return e.data||{}})},t.f=function(e){return r.b.post("/api-order/order/sign/v1/pickupSign",e)},t.j=function(e,t){return r.b.put("/api-order/order/sign/v1/"+e,t)},t.d=function(e){return r.b.post("/api-order/order/sign/v1/deliveryList",e).then(function(e){return e.data||{}})},t.c=function(e){return r.b.post("/api-order/order/sign/v1/cancelSign",e).then(function(e){return e.data||{}})},t.h=function(e){return r.b.post("/api-order/order/sign/v1/sign",e).then(function(e){return e.data||{}})},t.i=function(e){return r.b.post("/api-order/order/sign/v1/transferList",e).then(function(e){return e.data||{}})},t.a=function(e){return r.b.post("/api-order/order/sign/v1/batchSign",e)},t.e=function(e){return r.b.post("/api-order/order/sign/v1/pickupBatchSign",e)};var r=i("Vo7i")},qYK6:function(e,t,i){"use strict";t.a={props:{width:{type:String,default:"400"},title:{type:String,default:"标题"},isShow:{type:Boolean,default:!1}},watch:{isShow:{handler:function(){this.isShow&&(this.shouldRender=!0)},immediate:!0}},data:function(){return{zIndex:(window.tmsPopZindex?window.tmsPopZindex+=1:window.tmsPopZindex=1e3,window.tmsPopZindex),shouldRender:!1}},methods:{close:function(){this.$emit("close")}}}},uEAc:function(e,t,i){"use strict";var r=i("Dd8w"),s=i.n(r),o=i("3qpv"),n=i("oZAD"),a=i("NYxO"),l=i("1onU"),c=i("puNT"),p=i("P2s3"),d=i("SZgV"),m=i("0xDb"),u=i("Mqi+"),h=i("UQm2");t.a={components:{SearchForm:o.default,Addsign:p.default,Addbatch:d.default,TableSetup:c.a,Pager:l.a},computed:s()({},Object(a.b)(["otherinfo"]),{orgid:function(){return this.isModify?this.selectInfo.orgid:this.searchQuery.vo.orgid||this.otherinfo.orgid}}),mounted:function(){},data:function(){var t=this;return{btnsize:"mini",component:"Send",selectInfo:{},selected:[],dataset:[],AddSignVisible:!1,AddBatchVisible:!1,setupTableVisible:!1,popVisible:!1,isModify:!1,isDelivery:!1,isPick:!1,isSongh:!1,isDbclick:!1,dotInfo:[],repertoryId:"",signId:"",loading:!0,tablekey:0,total:0,id:"",searchQuery:{currentPage:1,pageSize:100,vo:{shipId:"",signId:"",signStatus:"226"}},tableColumn:[{label:"序号",prop:"number",width:"60",fixed:!0,slot:function(e){return(t.searchQuery.currentPage-1)*t.searchQuery.pageSize+e.$index+1}},{label:"运单号",prop:"shipSn",width:"120",fixed:!0},{label:"开单网点",prop:"fromOrgName",width:"120",fixed:!1},{label:"开单时间",prop:"createTime",width:"165",slot:function(e){return""+Object(m.parseTime)(e.row.createTime,"{y}-{m}-{d} {h}:{i}:{s}")},fixed:!1},{label:"签收状态",prop:"signStatusName",width:"120",fixed:!1},{label:"凭证状态",prop:"signCertificateName",width:"120",fixed:!1},{label:"签收时间",prop:"signTime",width:"165",slot:function(e){return""+Object(m.parseTime)(e.row.signTime,"{y}-{m}-{d} {h}:{i}:{s}")},fixed:!1},{label:"签收类型",prop:"signTypeName",width:"120",fixed:!1},{label:"发站",prop:"shipFromCityName",width:"120",fixed:!1},{label:"到站",prop:"shipToCityName",width:"120",fixed:!1},{label:"交接方式",prop:"shipDeliveryMethodName",width:"120",fixed:!1},{label:"货品名",prop:"cargoName",width:"90",fixed:!1},{label:"件数",prop:"cargoAmount",width:"80",fixed:!1},{label:"重量",prop:"cargoWeight",width:"80",fixed:!1},{label:"体积",prop:"cargoVolume",width:"80",fixed:!1},{label:"发货人",prop:"sender_customer_name",width:"120",fixed:!1},{label:"发货人电话",prop:"sender_customer_mobile",width:"120",fixed:!1},{label:"发货人地址",prop:"sender_detailed_address",width:"200",fixed:!1},{label:"收货人",prop:"receiver_customer_name",width:"120",fixed:!1},{label:"收货人电话",prop:"receiver_customer_mobile",width:"120",fixed:!1},{label:"收货地址",prop:"receiver_detailed_address",width:"200",fixed:!1},{label:"代收款",prop:"agencyFund",width:"90",fixed:!1},{label:"代收手续费",prop:"commissionFee",width:"120",fixed:!1},{label:"运单标识",prop:"shipIdentifying",width:"120",slot:function(e){return Object(u.b)(e.row.shipIdentifying)},fixed:!1},{label:"签收人",prop:"signName",width:"120",fixed:!1},{label:"签收证件",prop:"signCocumentTypeName",width:"120",fixed:!1},{label:"证件号码",prop:"documentNum",width:"120",fixed:!1},{label:"回单类型",prop:"shipReceiptRequireName",width:"120",fixed:!1},{label:"回单号",prop:"shipReceiptSn",width:"90",fixed:!1},{label:"回单份数",prop:"shipReceiptNum",width:"120",fixed:!1},{label:"签收备注",prop:"signRemark",width:"120",fixed:!1},{label:"到达省",prop:"shipToCityName1",width:"120",slot:function(e){return e.row.shipToCityName?e.row.shipToCityName.split(",")[0]:""},fixed:!1},{label:"到达市",prop:"shipToCityName2",width:"120",slot:function(e){return e.row.shipToCityName?e.row.shipToCityName.split(",")[1]:""},fixed:!1},{label:"到达县",prop:"shipToCityName3",width:"120",slot:function(e){return e.row.shipToCityName?e.row.shipToCityName.split(",")[2]:""},fixed:!1},{label:"付款方式",prop:"shipPayWayName",width:"120",fixed:!1},{label:"运费合计",prop:"shipTotalFee",width:"120",fixed:!1},{label:"现付",prop:"shipNowpayFee",width:"80",fixed:!1},{label:"到付",prop:"shipArrivepayFee",width:"80",fixed:!1},{label:"回单付",prop:"shipReceiptpayFee",width:"90",fixed:!1},{label:"月结",prop:"shipMonthpayFee",width:"80",fixed:!1},{label:"运费",prop:"shipFee",width:"80",fixed:!1},{label:"回扣",prop:"brokerageFee",width:"80",fixed:!1},{label:"声明价值",prop:"productPrice",width:"120",fixed:!1},{label:"保险费",prop:"insuranceFee",width:"90",fixed:!1},{label:"装卸费",prop:"handlingFee",width:"90",fixed:!1},{label:"包装费",prop:"packageFee",width:"90",fixed:!1},{label:"提货费",prop:"pickupFee",width:"90",fixed:!1},{label:"上楼费",prop:"goupstairsFee",width:"90",fixed:!1},{label:"实际提货费",prop:"realityhandlingFee",width:"120",fixed:!1},{label:"叉车费",prop:"forkliftFee",width:"90",fixed:!1},{label:"报关费",prop:"customsFee",width:"90",fixed:!1},{label:"其他费收入",prop:"otherfeeIn",width:"120",fixed:!1},{label:"其他费支出",prop:"otherfeeOut",width:"120",fixed:!1},{label:"税率",prop:"taxRate",width:"80",fixed:!1},{label:"税金",prop:"taxes",width:"80",fixed:!1},{label:"入仓费",prop:"housingFee",width:"90",fixed:!1},{label:"印花税",prop:"stampTax",width:"90",fixed:!1},{label:"件数单价",prop:"amountFees",width:"120",fixed:!1},{label:"重量单价",prop:"weightFees",width:"120",fixed:!1},{label:"体积单价",prop:"volumeFees",width:"120",fixed:!1},{label:"运单备注",prop:"shipRemarks",width:"120",fixed:!1},{label:"送货车牌",prop:"shipTruckIdNumber",width:"120",fixed:!1},{label:"送货司机",prop:"dirverName",width:"120",fixed:!1}]}},methods:{getSumLeft:function(e,t){return Object(m.getSummaries)(e,m.operationPropertyCalc)},parseShipStatus:function(e){return Object(u.b)(e)},fetchAllreceipt:function(){var t=this;return this.loading=!0,Object(n.d)(this.searchQuery).then(function(e){t.dataset=e.list,t.total=e.total,t.signId=e.signId,t.loading=!1}).catch(function(e){t.loading=!1,t._handlerCatchMsg(e)})},fetchData:function(){this.fetchAllreceipt()},getSearchParam:function(e){this.searchQuery.currentPage=this.$options.data().searchQuery.currentPage,this.searchQuery.pageSize=this.$options.data().searchQuery.pageSize,Object(m.objectMerge2)(this.searchQuery.vo,e),this.fetchData()},handlePageChange:function(e){this.searchQuery.currentPage=e.pageNum,this.searchQuery.pageSize=e.pageSize,this.fetchData()},doAction:function(e){var t=this;if("import"===e)return this.showImport(),!1;if(!this.selected.length&&"export"!==e)return this.$message({message:"请选择要操作的项~",type:"warning"}),!1;switch(e){case"export":var i=Object(m.objectMerge2)([],this.dataset);i.forEach(function(e){t.$set(e,"shipToCityName1",e.shipToCityName?e.shipToCityName.split(",")[0]:""),t.$set(e,"shipToCityName2",e.shipToCityName?e.shipToCityName.split(",")[1]:""),t.$set(e,"shipToCityName3",e.shipToCityName.split(",")[2]?e.shipToCityName.split(",")[2]:"")});var r=Object(m.objectMerge2)([],this.selected);r.forEach(function(e){t.$set(e,"shipToCityName1",e.shipToCityName?e.shipToCityName.split(",")[0]:""),t.$set(e,"shipToCityName2",e.shipToCityName?e.shipToCityName.split(",")[1]:""),t.$set(e,"shipToCityName3",e.shipToCityName.split(",")[2]?e.shipToCityName.split(",")[2]:"")}),Object(h.g)({data:r.length?r:i,columns:this.tableColumn,name:"送货签收-"+Object(m.parseTime)(new Date,"{y}{m}{d}{h}{i}{s}")});break;case"pick":var s=this.selected.filter(function(e){return 227!==e.signStatus});1<s.length?(this.dotInfo=s,this.isSongh=!0,this.isDelivery=!0,this.isPick=!1,this.openAddBatch()):s.length?(this.repertoryId=this.selected[0],this.isDbclick=!1,this.isDelivery=!0,this.isPick=!1,this.openAddSign()):this.$message({message:"不可重复签收",type:"warning"});break;case"amend":1<this.selected.length?this.$message({message:"每次只能修改单条数据",type:"warning"}):227===this.selected[0].signStatus?(this.isPick=!0,this.isDbclick=!1,this.isDelivery=!1,this.repertoryId=this.selected[0],this.id=this.selected[0].signId,console.log(this.id),this.openAddSign()):this.$message({message:"已签收状态才可以修改",type:"warning"});break;case"cancel":if(this.selected.filter(function(e){return 227===e.signStatus}).length){var o=this.selected[0].shipId,a=this.selected[0].signId;this.searchQuery.vo.shipId=o,this.searchQuery.vo.signId=a,Object(n.c)(this.searchQuery.vo).then(function(e){return t.$message({message:"取消签收成功~",type:"success"}),t.fetchAllreceipt(),!1}).catch(function(e){t._handlerCatchMsg(e)})}else this.$message.warning("不可取消~")}this.$refs.multipleTable.clearSelection()},setTable:function(){this.setupTableVisible=!0},setColumn:function(e){this.tableColumn=e,this.tablekey=Math.random()},closeSetupTable:function(){this.setupTableVisible=!1},openAddSign:function(){this.AddSignVisible=!0},closeAddSign:function(){this.AddSignVisible=!1},openAddBatch:function(){this.popVisible=!0},closeAddBacth:function(){this.popVisible=!1},clickDetails:function(e,t,i){this.$refs.multipleTable.toggleRowSelection(e)},getSelection:function(e){this.selected=e},getDbClick:function(e,t){this.repertoryId=e,this.isPick=!1,this.isDbclick=!0,this.openAddSign()}}}},ypAC:function(e,t,i){"use strict";var r={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-dialog",{staticClass:"wzl_addBatchPop",attrs:{title:t.popTitle,visible:t.isShow,"close-on-click-modal":!1,"before-close":t.closeMe},on:{"update:visible":function(e){t.isShow=e},close:t.closeMe}},[i("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:t.form,rules:t.rules,"label-width":t.formLabelWidth,inline:!0,"label-position":"right",size:"mini"}},[i("div",{staticClass:"batch"},[i("el-form-item",{attrs:{label:"签收单数:",prop:"num"}},[i("el-input",{attrs:{maxlength:20,placeholder:t.form.num+"单","auto-complete":"off",disabled:!0}})],1),i("br"),t._v(" "),i("el-form-item",{attrs:{label:"到付合计:",prop:"shipArrivepayFee"}},[i("el-input",{directives:[{name:"number-only",rawName:"v-number-only:point",arg:"point"}],attrs:{maxlength:20,placeholder:t.form.shipArrivepayFee+"元","auto-complete":"off",disabled:!0}}),t._v(" "),i("p",{staticStyle:{color:"red","font-size":"12px","margin-bottom":"-10px"}},[t._v("拆单的到付合计不统计在内")])],1),i("br"),t._v(" "),i("el-form-item",{attrs:{label:"代收款合计:",prop:"agencyFund"}},[i("el-input",{attrs:{maxlength:20,placeholder:t.form.agencyFund+"元","auto-complete":"off",disabled:!0}}),t._v(" "),i("p",{staticStyle:{color:"red","font-size":"12px","margin-bottom":"-10px"}},[t._v("拆单的代收款合计不统计在内")])],1),i("br"),t._v(" "),i("el-form-item",{attrs:{label:"签收时间:",prop:"signTime"}},[i("el-date-picker",{attrs:{align:"right",type:"date","picker-options":t.pickOption2,placeholder:"选择日期","value-format":"timestamp"},model:{value:t.searchCreatTime,callback:function(e){t.searchCreatTime=e},expression:"searchCreatTime"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"签收类型:",prop:"signTypeId"}},[i("SelectType",{attrs:{type:"sign_type"},model:{value:t.form.signTypeId,callback:function(e){t.$set(t.form,"signTypeId",e)},expression:"form.signTypeId"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"签收人:",prop:"signName"}},[i("el-input",{attrs:{maxlength:10},model:{value:t.form.signName,callback:function(e){t.$set(t.form,"signName","string"==typeof e?e.trim():e)},expression:"form.signName"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"签收证件:",prop:"signCocumentTypeId"}},[i("SelectType",{attrs:{maxlenght:"18",type:"sign_cocument_type"},model:{value:t.form.signCocumentTypeId,callback:function(e){t.$set(t.form,"signCocumentTypeId",e)},expression:"form.signCocumentTypeId"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"证件号码:",prop:"documentNum"}},[i("el-input",{attrs:{maxlength:18,"auto-complete":"off"},model:{value:t.form.documentNum,callback:function(e){t.$set(t.form,"documentNum",e)},expression:"form.documentNum"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"备注:",prop:"remark"}},[i("el-input",{attrs:{maxlength:250,"auto-complete":"off",placeholder:"最多可输入250个字符"},model:{value:t.form.remark,callback:function(e){t.$set(t.form,"remark","string"==typeof e?e.trim():e)},expression:"form.remark"}})],1)],1)]),t._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{type:"primary"},on:{click:function(e){t.submitForm("ruleForm")}}},[t._v("确 定")]),t._v(" "),i("el-button",{on:{click:t.closeMe}},[t._v("取 消")])],1)],1)},staticRenderFns:[]};t.a=r},zcuI:function(e,t,i){"use strict";var r={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("pop-right",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"wzl_addSignPop",attrs:{title:t.popTitle,isShow:t.popVisible},on:{close:t.closeMe}},[i("template",{staticClass:"wzl_addSignPop-content",attrs:{"label-width":t.formLabelWidth},slot:"content"},[i("el-form",{ref:"ruleForm",staticClass:"manage-add",attrs:{model:t.form,rules:t.rules,"label-width":t.formLabelWidth,inline:!0,"label-position":"right",size:"mini"}},[i("div",{staticClass:"content_top"},[i("el-form-item",{attrs:{label:"运单号:",prop:"shipSn"}},[i("el-input",{attrs:{maxlength:20,"auto-complete":"off",disabled:!0},model:{value:t.form.shipSn,callback:function(e){t.$set(t.form,"shipSn",e)},expression:"form.shipSn"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"开单日期:",prop:"createTime"}},[i("el-input",{attrs:{maxlength:20,"auto-complete":"off",disabled:!0},model:{value:t.form.createTime,callback:function(e){t.$set(t.form,"createTime",e)},expression:"form.createTime"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"回单号:",prop:"shipReceiptSn"}},[i("el-input",{attrs:{maxlength:20,"auto-complete":"off",disabled:!0},model:{value:t.form.shipReceiptSn,callback:function(e){t.$set(t.form,"shipReceiptSn",e)},expression:"form.shipReceiptSn"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"回单数:",prop:"shipReceiptNum"}},[i("el-input",{attrs:{maxlength:20,"auto-complete":"off",disabled:!0},model:{value:t.form.shipReceiptNum,callback:function(e){t.$set(t.form,"shipReceiptNum",e)},expression:"form.shipReceiptNum"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"发货人:",prop:"sender_customer_name"}},[i("el-input",{attrs:{maxlength:20,"auto-complete":"off",disabled:!0},model:{value:t.form.sender_customer_name,callback:function(e){t.$set(t.form,"sender_customer_name",e)},expression:"form.sender_customer_name"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"发货人电话:",prop:"sender_customer_mobile"}},[i("el-input",{attrs:{maxlength:20,"auto-complete":"off",disabled:!0},model:{value:t.form.sender_customer_mobile,callback:function(e){t.$set(t.form,"sender_customer_mobile",e)},expression:"form.sender_customer_mobile"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"收货人:",prop:"receiver_customer_name"}},[i("el-input",{attrs:{maxlength:20,"auto-complete":"off",disabled:!0},model:{value:t.form.receiver_customer_name,callback:function(e){t.$set(t.form,"receiver_customer_name",e)},expression:"form.receiver_customer_name"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"收货人电话:",prop:"receiver_customer_mobile"}},[i("el-input",{attrs:{maxlength:20,"auto-complete":"off",disabled:!0},model:{value:t.form.receiver_customer_mobile,callback:function(e){t.$set(t.form,"receiver_customer_mobile",e)},expression:"form.receiver_customer_mobile"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"签收时间:",prop:"signTime"}},[i("el-date-picker",{attrs:{align:"right",type:"date","picker-options":t.pickOption2,placeholder:"选择日期","value-format":"timestamp",disabled:t.isDbclick},model:{value:t.searchCreatTime,callback:function(e){t.searchCreatTime=e},expression:"searchCreatTime"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"交接方式:",prop:"shipDeliveryMethodName"}},[i("el-input",{attrs:{type:"ship_delivery_method",disabled:!0},model:{value:t.form.shipDeliveryMethodName,callback:function(e){t.$set(t.form,"shipDeliveryMethodName",e)},expression:"form.shipDeliveryMethodName"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"到付款:",prop:"shipArrivepayFee"}},[i("el-input",{attrs:{maxlength:20,"auto-complete":"off",disabled:!0},model:{value:t.form.shipArrivepayFee,callback:function(e){t.$set(t.form,"shipArrivepayFee",e)},expression:"form.shipArrivepayFee"}}),t._v(" "),i("p",{staticStyle:{color:"red","font-size":"12px","margin-bottom":"-25px"}},[t._v("拆单的到付款不统计在内")])],1),t._v(" "),i("el-form-item",{attrs:{label:"代收货款:",prop:"agencyFund"}},[i("el-input",{attrs:{maxlength:20,"auto-complete":"off",disabled:!0},model:{value:t.form.agencyFund,callback:function(e){t.$set(t.form,"agencyFund",e)},expression:"form.agencyFund"}}),t._v(" "),i("p",{staticStyle:{color:"red","font-size":"12px","margin-bottom":"-25px"}},[t._v("拆单的代收货款不统计在内")])],1),t._v(" "),i("el-form-item",{attrs:{label:"签收人:",prop:"signName"}},[227!==t.repertoryId.signStatus&&t.isDbclick?i("el-input",{attrs:{disabled:""}}):i("el-input",{attrs:{maxlength:10,"auto-complete":"off",disabled:!!t.isDbclick,onkeyup:"this.value=this.value.replace(/^ +| +$/g,'')"},model:{value:t.form.signName,callback:function(e){t.$set(t.form,"signName",e)},expression:"form.signName"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"签收证件:",prop:"signCocumentTypeId"}},[227!==t.repertoryId.signStatus&&t.isDbclick?i("el-input",{attrs:{disabled:""}}):i("SelectType",{attrs:{type:"sign_cocument_type",disabled:t.isDbclick},model:{value:t.form.signCocumentTypeId,callback:function(e){t.$set(t.form,"signCocumentTypeId",e)},expression:"form.signCocumentTypeId"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"证件号码:",prop:"documentNum"}},[227!==t.repertoryId.signStatus&&t.isDbclick?i("el-input",{attrs:{disabled:""}}):i("el-input",{attrs:{"auto-complete":"off",maxlength:18,disabled:t.isDbclick},model:{value:t.form.documentNum,callback:function(e){t.$set(t.form,"documentNum",e)},expression:"form.documentNum"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"签收类型:",prop:"signTypeId"}},[227!==t.repertoryId.signStatus&&t.isDbclick?i("el-input",{attrs:{disabled:""}}):i("SelectType",{attrs:{type:"sign_type",disabled:t.isDbclick},model:{value:t.form.signTypeId,callback:function(e){t.$set(t.form,"signTypeId",e)},expression:"form.signTypeId"}})],1),t._v(" "),i("el-form-item",{staticClass:"driverRemarks ms",attrs:{label:"备注",prop:"remark"}},[t.isDbclick?i("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.form.remark,expression:"form.remark",modifiers:{trim:!0}}],staticClass:"bz",attrs:{maxlength:250,disabled:"isDbclick",placeholder:"最多可输入250个字符"},domProps:{value:t.form.remark},on:{input:function(e){e.target.composing||t.$set(t.form,"remark",e.target.value.trim())},blur:function(e){t.$forceUpdate()}}}):i("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.form.remark,expression:"form.remark",modifiers:{trim:!0}}],staticClass:"bz1",attrs:{maxlength:250,placeholder:"最多可输入250个字符"},domProps:{value:t.form.remark},on:{input:function(e){e.target.composing||t.$set(t.form,"remark",e.target.value.trim())},blur:function(e){t.$forceUpdate()}}})])],1),t._v(" "),i("div",{staticClass:"content_bot imgshow mark"},[i("div",{staticClass:"pz"},[i("div",[t._v("签收凭证"),i("span",{staticClass:"ts"},[t._v("（最多可上传6张）")])])]),t._v(" "),i("div",{staticClass:"clearfix uploadcard"},[i("upload",{attrs:{title:"本地上传",showFileList:!0,limit:6,listtype:"picture",disabled:t.isDbclick},model:{value:t.form.signPic,callback:function(e){t.$set(t.form,"signPic",e)},expression:"form.signPic"}})],1)])])],1),t._v(" "),t.isDbclick?i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:t.closeMe}},[t._v("关 闭")])],1):i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t.isPick?i("el-button",{attrs:{type:"primary"},on:{click:function(e){t.submitForm("ruleForm")}}},[t._v("修改签收")]):i("el-button",{attrs:{type:"primary"},on:{click:function(e){t.submitForm("ruleForm")}}},[t._v("签 收")]),t._v(" "),i("el-button",{on:{click:t.closeMe}},[t._v("取 消")])],1)],2)},staticRenderFns:[]};t.a=r}});