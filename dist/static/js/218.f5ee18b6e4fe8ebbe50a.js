webpackJsonp([218],{"/n+A":function(e,t,o){"use strict";var n={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"popRight-center",class:{showPopRight:e.isShow},style:{zIndex:e.zIndex}},[o("div",{staticClass:"popRight-header"},[e._t("title",[e._v(e._s(e.title))]),e._v(" "),o("i",{staticClass:"el-icon-close",attrs:{title:"关闭"},on:{click:e.close}})],2),e._v(" "),e.shouldRender?o("div",{staticClass:"popRight-content"},[e._t("content",[e._v("内容")])],2):e._e(),e._v(" "),o("div",{staticClass:"popRight-footer"},[e._t("footer",[e._v("底部")])],2)])},staticRenderFns:[]};t.a=n},"3EPC":function(e,t,o){"use strict";var n=o("qYK6"),i=o("/n+A");var r=function(e){o("f3wf")},s=o("VU/8")(n.a,i.a,r,null,null);t.a=s.exports},"5clc":function(e,t,o){"use strict";var n=o("3EPC"),i=o("o9X6"),r=o("9UCZ"),s=o("oZAD"),a=o("E4LH"),l=o("0xDb");t.a={computed:{isShow:{get:function(){return this.popVisible},set:function(){}}},components:{PopFrame:n.a,SelectTree:i.a,SelectType:r.a},props:{popVisible:{type:Boolean,default:!1},dotInfo:[Array,Object],isDepMain:{type:Boolean,default:!1},show:{type:Boolean,default:!1},createrId:[Number,String],isModify:{type:Boolean,default:!1},isSongh:{type:Boolean,default:!1}},data:function(){return{searchCreatTime:+new Date,pickOption2:"",checked1:!0,popTitle:"",loading:!1,type:"",form:{num:"",repertoryIds:[],signTime:"",signName:"",receiver_customer_name:"",signCocumentTypeId:96,documentNum:"",signTypeId:99,remark:"",signPic:"",loadIds:[],shipIds:[],childShipIds:[],orgIds:[]},formLabelWidth:"80px",tooltip:!1,disabled:!1,rules:{documentNum:[{pattern:a.a.ONLY_NUMBER_AND_LETTER,trigger:"blur",message:"只能输入字母和数字"}],signName:[{required:!0,message:"请输入签收人",trigger:"blur"}]}}},mounted:function(){},watch:{isDepMain:function(){},dotInfo:function(e){this.form.num=this.dotInfo.length;var t=0;this.dotInfo.map(function(e){t+=e.shipArrivepayFee?e.shipArrivepayFee:0}),this.form.shipArrivepayFee=t.toFixed(2),t=0,this.dotInfo.map(function(e){t+=e.agencyFund?e.agencyFund:0}),this.form.agencyFund=t.toFixed(2)},orgid:function(e){this.form.orgid=e},isModify:{handler:function(e){this.isModify&&(this.popTitle="批量签收")},immediate:!0},isSongh:{handler:function(e){this.popTitle="批量签收"}},createrId:function(e){}},methods:{reset:function(){this.$refs.ruleForm.resetFields()},closeMe:function(e){this.$emit("close"),this.reset(),"function"==typeof e&&e()},submitForm:function(e){var n=this;this.form.signTime=this.searchCreatTime,this.$refs[e].validate(function(e){if(!e)return!1;n.loading=!0;var t=Object(l.objectMerge2)({},n.form);t.repertoryIds=n.dotInfo.map(function(e){return e.repertoryId});var o=void 0;n.isModify?o=Object(s.e)(t):n.isSongh&&(t.shipIds=n.dotInfo.map(function(e){return e.shipId}),t.childShipIds=n.dotInfo.map(function(e){return e.childShipId}),t.orgIds=n.dotInfo.map(function(e){return e.orgId}),t.loadIds=n.dotInfo.map(function(e){return e.loadId}),o=Object(s.a)(t)),o.then(function(e){n.$message({message:"签收成功~",type:"success"}),n.closeMe(),n.$emit("success")}).catch(function(e){n.loading=!1,n.$message.warning(e.text),n.closeMe()})})}}}},SZgV:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=o("5clc"),i=o("ypAC");var r=function(e){o("en8k")},s=o("VU/8")(n.a,i.a,r,null,null);t.default=s.exports},en8k:function(e,t){},f3wf:function(e,t){},oZAD:function(e,t,o){"use strict";t.g=function(e){return n.b.post("/api-order/order/sign/v1/pickupList",e).then(function(e){return e.data||{}})},t.b=function(e){return n.b.post("/api-order/order/sign/v1/cancelPickupSign",e).then(function(e){return e.data||{}})},t.f=function(e){return n.b.post("/api-order/order/sign/v1/pickupSign",e)},t.j=function(e,t){return n.b.put("/api-order/order/sign/v1/"+e,t)},t.d=function(e){return n.b.post("/api-order/order/sign/v1/deliveryList",e).then(function(e){return e.data||{}})},t.c=function(e){return n.b.post("/api-order/order/sign/v1/cancelSign",e).then(function(e){return e.data||{}})},t.h=function(e){return n.b.post("/api-order/order/sign/v1/sign",e).then(function(e){return e.data||{}})},t.i=function(e){return n.b.post("/api-order/order/sign/v1/transferList",e).then(function(e){return e.data||{}})},t.a=function(e){return n.b.post("/api-order/order/sign/v1/batchSign",e)},t.e=function(e){return n.b.post("/api-order/order/sign/v1/pickupBatchSign",e)};var n=o("Vo7i")},qYK6:function(e,t,o){"use strict";t.a={props:{width:{type:String,default:"400"},title:{type:String,default:"标题"},isShow:{type:Boolean,default:!1}},watch:{isShow:{handler:function(){this.isShow&&(this.shouldRender=!0)},immediate:!0}},data:function(){return{zIndex:(window.tmsPopZindex?window.tmsPopZindex+=1:window.tmsPopZindex=1e3,window.tmsPopZindex),shouldRender:!1}},methods:{close:function(){this.$emit("close")}}}},ypAC:function(e,t,o){"use strict";var n={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("el-dialog",{staticClass:"wzl_addBatchPop",attrs:{title:t.popTitle,visible:t.isShow,"close-on-click-modal":!1,"before-close":t.closeMe},on:{"update:visible":function(e){t.isShow=e},close:t.closeMe}},[o("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:t.form,rules:t.rules,"label-width":t.formLabelWidth,inline:!0,"label-position":"right",size:"mini"}},[o("div",{staticClass:"batch"},[o("el-form-item",{attrs:{label:"签收单数:",prop:"num"}},[o("el-input",{attrs:{maxlength:20,placeholder:t.form.num+"单","auto-complete":"off",disabled:!0}})],1),o("br"),t._v(" "),o("el-form-item",{attrs:{label:"到付合计:",prop:"shipArrivepayFee"}},[o("el-input",{directives:[{name:"number-only",rawName:"v-number-only:point",arg:"point"}],attrs:{maxlength:20,placeholder:t.form.shipArrivepayFee+"元","auto-complete":"off",disabled:!0}}),t._v(" "),o("p",{staticStyle:{color:"red","font-size":"12px","margin-bottom":"-10px"}},[t._v("拆单的到付合计不统计在内")])],1),o("br"),t._v(" "),o("el-form-item",{attrs:{label:"代收款合计:",prop:"agencyFund"}},[o("el-input",{attrs:{maxlength:20,placeholder:t.form.agencyFund+"元","auto-complete":"off",disabled:!0}}),t._v(" "),o("p",{staticStyle:{color:"red","font-size":"12px","margin-bottom":"-10px"}},[t._v("拆单的代收款合计不统计在内")])],1),o("br"),t._v(" "),o("el-form-item",{attrs:{label:"签收时间:",prop:"signTime"}},[o("el-date-picker",{attrs:{align:"right",type:"date","picker-options":t.pickOption2,placeholder:"选择日期","value-format":"timestamp"},model:{value:t.searchCreatTime,callback:function(e){t.searchCreatTime=e},expression:"searchCreatTime"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"签收类型:",prop:"signTypeId"}},[o("SelectType",{attrs:{type:"sign_type"},model:{value:t.form.signTypeId,callback:function(e){t.$set(t.form,"signTypeId",e)},expression:"form.signTypeId"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"签收人:",prop:"signName"}},[o("el-input",{attrs:{maxlength:10},model:{value:t.form.signName,callback:function(e){t.$set(t.form,"signName","string"==typeof e?e.trim():e)},expression:"form.signName"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"签收证件:",prop:"signCocumentTypeId"}},[o("SelectType",{attrs:{maxlenght:"18",type:"sign_cocument_type"},model:{value:t.form.signCocumentTypeId,callback:function(e){t.$set(t.form,"signCocumentTypeId",e)},expression:"form.signCocumentTypeId"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"证件号码:",prop:"documentNum"}},[o("el-input",{attrs:{maxlength:18,"auto-complete":"off"},model:{value:t.form.documentNum,callback:function(e){t.$set(t.form,"documentNum",e)},expression:"form.documentNum"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"备注:",prop:"remark"}},[o("el-input",{attrs:{maxlength:250,"auto-complete":"off",placeholder:"最多可输入250个字符"},model:{value:t.form.remark,callback:function(e){t.$set(t.form,"remark","string"==typeof e?e.trim():e)},expression:"form.remark"}})],1)],1)]),t._v(" "),o("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{attrs:{type:"primary"},on:{click:function(e){t.submitForm("ruleForm")}}},[t._v("确 定")]),t._v(" "),o("el-button",{on:{click:t.closeMe}},[t._v("取 消")])],1)],1)},staticRenderFns:[]};t.a=n}});