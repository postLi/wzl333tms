webpackJsonp([261],{"0Iqq":function(e,t){},FQaU:function(e,t,i){"use strict";var r=i("Dd8w"),o=i.n(r),s=(i("E4LH"),i("oZAD")),n=i("P5Di"),a=i("Zjyc"),l=i("o9X6"),c=i("9UCZ"),m=i("NYxO"),p=i("0xDb");t.a={components:{popRight:n.a,Upload:a.a,SelectTree:l.a,SelectType:c.a},props:{popVisible:{type:Boolean,default:!1},repertoryId:[Object,Array,String],orgid:{required:!0},id:{type:[Number,String]},isModify:{type:Boolean,default:!1},isPick:{type:Boolean,default:!1},isDelivery:{type:Boolean,default:!1},info:{type:Object,default:function(){}},issender:{type:Boolean,dafault:!1},isDbclick:{type:Boolean,default:!1}},computed:o()({},Object(m.mapGetters)(["otherinfo"])),data:function(){return{senderList:[],receiverList:[],dataset:[],searchCreatTime:+new Date,pickOption2:"",dataform:{},childShipId:"",disabled:!1,form:{repertoryId:"",signTime:"",signName:"",signCocumentTypeId:96,shipsignNameSn:"",documentNum:"",signTypeId:99,remark:"",signPic:""},obj:{repertoryId:"",signTime:"",signName:"",signCocumentTypeId:96,shipsignNameSn:"",documentNum:"",signTypeId:99,remark:"",signPic:"",signId:""},devobj:{childShipId:""},rules:{signName:[{required:!0,message:"请输入签收人",trigger:"blur"}],searchCreatTime:[{required:!0,message:"请选择时间",trigger:"blur"}]},formLabelWidth:"100px",tooltip:!1,popTitle:"签收录入",loading:!1,inited:!1}},mounted:function(){this.form.signId=this.orgid,this.inited||(this.inited=!0,this.initInfo())},watch:{popVisible:function(e,t){this.inited||(this.inited=!0,this.initInfo()),console.log("popVisible:",e,this.repertoryId),e&&this.setInfo()},repertoryId:function(){for(var e in this.form)this.form[e]="";this.isDbclick?this.popTitle="查看信息":this.isPick?this.popTitle="修改签收":this.popTitle="签收录入",this.setInfo()},immediate:!0},methods:{setInfo:function(){this.form=Object(p.objectMerge2)({},this.form,this.repertoryId),this.obj.repertoryId=this.repertoryId.repertoryId,this.obj.signTime=this.repertoryId.signTime,this.obj.signCocumentTypeId=this.repertoryId.signCocumentTypeId,this.obj.shipsignNameSn=this.repertoryId.shipsignNameSn,this.obj.documentNum=this.repertoryId.documentNum,this.obj.remark=this.repertoryId.remark,this.obj.signPic=this.repertoryId.signPic,this.form.remark=this.repertoryId.signRemark,console.log(this.obj.signTypeId),this.repertoryId.signTypeId?(this.form.signTypeId=this.repertoryId.signTypeId,this.form.signCocumentTypeId=this.repertoryId.signCocumentTypeId):(this.form.signTypeId=99,this.form.signCocumentTypeId=96),this.form.signName=this.repertoryId.signName||this.repertoryId.receiver_customer_name},reset:function(){this.$refs.ruleForm.resetFields()},querySearchSender:function(i){var r=this;return function(t,e){e(r.senderList.filter(function(e){return-1!==e[i].indexOf(t)}))}},pick:function(){var t=this;return Object(s.g)().then(function(e){console.log(e)}).catch(function(e){t.loading=!1,t._handlerCatchMsg(e)})},querySearchReceiver:function(i){var r=this;return function(t,e){e(r.receiverList.filter(function(e){return-1!==e[i].indexOf(t)}))}},handleSelectReceiver:function(e){},initInfo:function(){},submitForm:function(e){var o=this;this.form.signTime=this.searchCreatTime,this.$refs[e].validate(function(e){if(!e)return!1;o.loading=!0;var t=Object(p.objectMerge2)({},o.obj);for(var i in t)t[i]=o.form[i];t.childShipId=o.repertoryId.childShipId,t.shipId=o.repertoryId.shipId,t.loadId=o.repertoryId.loadId;var r=void 0;o.isPick?r=Object(s.j)(o.id,t):o.isDelivery?(t.orgId=o.repertoryId.orgId,r=Object(s.h)(t)):r=Object(s.f)(t),r.then(function(e){o.$message({message:"保存成功~",type:"success"}),o.closeMe(),o.$emit("success"),o.loading=!1}).catch(function(e){o.loading=!1,o._handlerCatchMsg(e),o.closeMe()})})},closeMe:function(e){this.reset(),this.$emit("update:popVisible",!1),"function"==typeof e&&e()}}}},P2s3:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=i("FQaU"),o=i("zcuI");var s=function(e){i("0Iqq")},n=i("VU/8")(r.a,o.a,s,null,null);t.default=n.exports},oZAD:function(e,t,i){"use strict";t.g=function(e){return r.b.post("/api-order/order/sign/v1/pickupList",e).then(function(e){return e.data||{}})},t.b=function(e){return r.b.post("/api-order/order/sign/v1/cancelPickupSign",e).then(function(e){return e.data||{}})},t.f=function(e){return r.b.post("/api-order/order/sign/v1/pickupSign",e)},t.j=function(e,t){return r.b.put("/api-order/order/sign/v1/"+e,t)},t.d=function(e){return r.b.post("/api-order/order/sign/v1/deliveryList",e).then(function(e){return e.data||{}})},t.c=function(e){return r.b.post("/api-order/order/sign/v1/cancelSign",e).then(function(e){return e.data||{}})},t.h=function(e){return r.b.post("/api-order/order/sign/v1/sign",e).then(function(e){return e.data||{}})},t.i=function(e){return r.b.post("/api-order/order/sign/v1/transferList",e).then(function(e){return e.data||{}})},t.a=function(e){return r.b.post("/api-order/order/sign/v1/batchSign",e)},t.e=function(e){return r.b.post("/api-order/order/sign/v1/pickupBatchSign",e)};var r=i("Vo7i")},zcuI:function(e,t,i){"use strict";var r={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("pop-right",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"wzl_addSignPop",attrs:{title:t.popTitle,isShow:t.popVisible},on:{close:t.closeMe}},[i("template",{staticClass:"wzl_addSignPop-content",attrs:{"label-width":t.formLabelWidth},slot:"content"},[i("el-form",{ref:"ruleForm",staticClass:"manage-add",attrs:{model:t.form,rules:t.rules,"label-width":t.formLabelWidth,inline:!0,"label-position":"right",size:"mini"}},[i("div",{staticClass:"content_top"},[i("el-form-item",{attrs:{label:"运单号:",prop:"shipSn"}},[i("el-input",{attrs:{maxlength:20,"auto-complete":"off",disabled:!0},model:{value:t.form.shipSn,callback:function(e){t.$set(t.form,"shipSn",e)},expression:"form.shipSn"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"开单日期:",prop:"createTime"}},[i("el-input",{attrs:{maxlength:20,"auto-complete":"off",disabled:!0},model:{value:t.form.createTime,callback:function(e){t.$set(t.form,"createTime",e)},expression:"form.createTime"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"回单号:",prop:"shipReceiptSn"}},[i("el-input",{attrs:{maxlength:20,"auto-complete":"off",disabled:!0},model:{value:t.form.shipReceiptSn,callback:function(e){t.$set(t.form,"shipReceiptSn",e)},expression:"form.shipReceiptSn"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"回单数:",prop:"shipReceiptNum"}},[i("el-input",{attrs:{maxlength:20,"auto-complete":"off",disabled:!0},model:{value:t.form.shipReceiptNum,callback:function(e){t.$set(t.form,"shipReceiptNum",e)},expression:"form.shipReceiptNum"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"发货人:",prop:"sender_customer_name"}},[i("el-input",{attrs:{maxlength:20,"auto-complete":"off",disabled:!0},model:{value:t.form.sender_customer_name,callback:function(e){t.$set(t.form,"sender_customer_name",e)},expression:"form.sender_customer_name"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"发货人电话:",prop:"sender_customer_mobile"}},[i("el-input",{attrs:{maxlength:20,"auto-complete":"off",disabled:!0},model:{value:t.form.sender_customer_mobile,callback:function(e){t.$set(t.form,"sender_customer_mobile",e)},expression:"form.sender_customer_mobile"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"收货人:",prop:"receiver_customer_name"}},[i("el-input",{attrs:{maxlength:20,"auto-complete":"off",disabled:!0},model:{value:t.form.receiver_customer_name,callback:function(e){t.$set(t.form,"receiver_customer_name",e)},expression:"form.receiver_customer_name"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"收货人电话:",prop:"receiver_customer_mobile"}},[i("el-input",{attrs:{maxlength:20,"auto-complete":"off",disabled:!0},model:{value:t.form.receiver_customer_mobile,callback:function(e){t.$set(t.form,"receiver_customer_mobile",e)},expression:"form.receiver_customer_mobile"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"签收时间:",prop:"signTime"}},[i("el-date-picker",{attrs:{align:"right",type:"date","picker-options":t.pickOption2,placeholder:"选择日期","value-format":"timestamp",disabled:t.isDbclick},model:{value:t.searchCreatTime,callback:function(e){t.searchCreatTime=e},expression:"searchCreatTime"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"交接方式:",prop:"shipDeliveryMethodName"}},[i("el-input",{attrs:{type:"ship_delivery_method",disabled:!0},model:{value:t.form.shipDeliveryMethodName,callback:function(e){t.$set(t.form,"shipDeliveryMethodName",e)},expression:"form.shipDeliveryMethodName"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"到付款:",prop:"shipArrivepayFee"}},[i("el-input",{attrs:{maxlength:20,"auto-complete":"off",disabled:!0},model:{value:t.form.shipArrivepayFee,callback:function(e){t.$set(t.form,"shipArrivepayFee",e)},expression:"form.shipArrivepayFee"}}),t._v(" "),i("p",{staticStyle:{color:"red","font-size":"12px","margin-bottom":"-25px"}},[t._v("拆单的到付款不统计在内")])],1),t._v(" "),i("el-form-item",{attrs:{label:"代收货款:",prop:"agencyFund"}},[i("el-input",{attrs:{maxlength:20,"auto-complete":"off",disabled:!0},model:{value:t.form.agencyFund,callback:function(e){t.$set(t.form,"agencyFund",e)},expression:"form.agencyFund"}}),t._v(" "),i("p",{staticStyle:{color:"red","font-size":"12px","margin-bottom":"-25px"}},[t._v("拆单的代收货款不统计在内")])],1),t._v(" "),i("el-form-item",{attrs:{label:"签收人:",prop:"signName"}},[227!==t.repertoryId.signStatus&&t.isDbclick?i("el-input",{attrs:{disabled:""}}):i("el-input",{attrs:{maxlength:10,"auto-complete":"off",disabled:!!t.isDbclick,onkeyup:"this.value=this.value.replace(/^ +| +$/g,'')"},model:{value:t.form.signName,callback:function(e){t.$set(t.form,"signName",e)},expression:"form.signName"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"签收证件:",prop:"signCocumentTypeId"}},[227!==t.repertoryId.signStatus&&t.isDbclick?i("el-input",{attrs:{disabled:""}}):i("SelectType",{attrs:{type:"sign_cocument_type",disabled:t.isDbclick},model:{value:t.form.signCocumentTypeId,callback:function(e){t.$set(t.form,"signCocumentTypeId",e)},expression:"form.signCocumentTypeId"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"证件号码:",prop:"documentNum"}},[227!==t.repertoryId.signStatus&&t.isDbclick?i("el-input",{attrs:{disabled:""}}):i("el-input",{attrs:{"auto-complete":"off",maxlength:18,disabled:t.isDbclick},model:{value:t.form.documentNum,callback:function(e){t.$set(t.form,"documentNum",e)},expression:"form.documentNum"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"签收类型:",prop:"signTypeId"}},[227!==t.repertoryId.signStatus&&t.isDbclick?i("el-input",{attrs:{disabled:""}}):i("SelectType",{attrs:{type:"sign_type",disabled:t.isDbclick},model:{value:t.form.signTypeId,callback:function(e){t.$set(t.form,"signTypeId",e)},expression:"form.signTypeId"}})],1),t._v(" "),i("el-form-item",{staticClass:"driverRemarks ms",attrs:{label:"备注",prop:"remark"}},[t.isDbclick?i("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.form.remark,expression:"form.remark",modifiers:{trim:!0}}],staticClass:"bz",attrs:{maxlength:250,disabled:"isDbclick",placeholder:"最多可输入250个字符"},domProps:{value:t.form.remark},on:{input:function(e){e.target.composing||t.$set(t.form,"remark",e.target.value.trim())},blur:function(e){t.$forceUpdate()}}}):i("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.form.remark,expression:"form.remark",modifiers:{trim:!0}}],staticClass:"bz1",attrs:{maxlength:250,placeholder:"最多可输入250个字符"},domProps:{value:t.form.remark},on:{input:function(e){e.target.composing||t.$set(t.form,"remark",e.target.value.trim())},blur:function(e){t.$forceUpdate()}}})])],1),t._v(" "),i("div",{staticClass:"content_bot imgshow mark"},[i("div",{staticClass:"pz"},[i("div",[t._v("签收凭证"),i("span",{staticClass:"ts"},[t._v("（最多可上传6张）")])])]),t._v(" "),i("div",{staticClass:"clearfix uploadcard"},[i("upload",{attrs:{title:"本地上传",showFileList:!0,limit:6,listtype:"picture",disabled:t.isDbclick},model:{value:t.form.signPic,callback:function(e){t.$set(t.form,"signPic",e)},expression:"form.signPic"}})],1)])])],1),t._v(" "),t.isDbclick?i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:t.closeMe}},[t._v("关 闭")])],1):i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t.isPick?i("el-button",{attrs:{type:"primary"},on:{click:function(e){t.submitForm("ruleForm")}}},[t._v("修改签收")]):i("el-button",{attrs:{type:"primary"},on:{click:function(e){t.submitForm("ruleForm")}}},[t._v("签 收")]),t._v(" "),i("el-button",{on:{click:t.closeMe}},[t._v("取 消")])],1)],2)},staticRenderFns:[]};t.a=r}});