webpackJsonp([237],{"/1Qb":function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=o("o4aj"),s=o("S+72");var r=function(e){o("/DdK")},n=o("VU/8")(i.a,s.a,r,null,null);t.default=n.exports},"/DdK":function(e,t){},H58X:function(e,t,o){"use strict";t.b=function(e){return i.b.post("/api-order/order/load/v1/selectLoadMainInfoList/",e).then(function(e){return e.data||{list:[],totalCount:0}})},t.d=function(e){return i.b.put("/api-order/order/load/v1/cancelLoadTruck/?loadTypeId="+e.loadTypeId+"&loadIds="+e.loadIds)},t.c=function(e){return i.b.put("/api-order/order/load/v1/completeDelivery/?loadTypeId="+e.loadTypeId+"&loadIds="+e.loadIds+"&actualSendtime="+e.actualSendtime)},t.a=function(e){return i.b.post("/api-order/order/sign/v1/batchSign/",e).then(function(e){return e.data||{}})};var i=o("Vo7i")},"S+72":function(e,t,o){"use strict";var i={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("el-dialog",{staticClass:"signDialog",attrs:{title:t.popTitle,visible:t.isShow,"close-on-click-modal":!1,"before-close":t.closeMe},on:{"update:visible":function(e){t.isShow=e},close:t.closeMe}},[o("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:t.form,rules:t.rules,"label-width":"80px",inline:!0,"label-position":"right",size:"mini"}},[o("div",{staticClass:"batch"},[o("el-form-item",{attrs:{label:"签收单数:"}},[o("p",{staticClass:"tp"},[t._v(t._s(t.orderNum)+"单")])]),t._v(" "),o("el-form-item",{attrs:{label:"签收人:",prop:"signName"}},[o("el-input",{attrs:{maxlength:250,"auto-complete":"off",placeholder:"签收人"},model:{value:t.form.signName,callback:function(e){t.$set(t.form,"signName","string"==typeof e?e.trim():e)},expression:"form.signName"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"签收时间:",prop:"signTime"}},[o("el-date-picker",{attrs:{align:"right",type:"date",placeholder:"选择日期","value-format":"timestamp",format:"yyyy-MM-dd"},model:{value:t.form.signTime,callback:function(e){t.$set(t.form,"signTime",e)},expression:"form.signTime"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"签收类型:",prop:"signTypeId"}},[o("SelectType",{attrs:{type:"sign_type"},model:{value:t.form.signTypeId,callback:function(e){t.$set(t.form,"signTypeId",e)},expression:"form.signTypeId"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"签收证件:",prop:"signCocumentTypeId"}},[o("SelectType",{attrs:{type:"sign_cocument_type"},model:{value:t.form.signCocumentTypeId,callback:function(e){t.$set(t.form,"signCocumentTypeId",e)},expression:"form.signCocumentTypeId"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"证件号码:",prop:"documentNum"}},[o("el-input",{directives:[{name:"numberOnly",rawName:"v-numberOnly"}],attrs:{maxlength:20,"auto-complete":"off",placeholder:"证件号码"},model:{value:t.form.documentNum,callback:function(e){t.$set(t.form,"documentNum",e)},expression:"form.documentNum"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"备注:",prop:"remark"}},[o("el-input",{attrs:{maxlength:300,"auto-complete":"off",placeholder:"备注"},model:{value:t.form.remark,callback:function(e){t.$set(t.form,"remark","string"==typeof e?e.trim():e)},expression:"form.remark"}})],1)],1)]),t._v(" "),o("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{attrs:{type:"primary"},on:{click:function(e){t.submitForm("ruleForm")}}},[t._v("确 定")]),t._v(" "),o("el-button",{on:{click:t.closeMe}},[t._v("取 消")])],1)],1)},staticRenderFns:[]};t.a=i},o4aj:function(e,t,o){"use strict";var i=o("woOf"),s=o.n(i),r=o("o9X6"),n=o("9UCZ"),a=(o("E4LH"),o("0xDb"),o("H58X")),l=o("t5DY");t.a={computed:{isShow:{get:function(){return this.popVisible},set:function(){}}},components:{SelectTree:r.a,SelectType:n.a},props:{popVisible:{type:Boolean,default:!1},dotInfo:{type:Object,default:{}},isModify:{type:Boolean,default:!1}},data:function(){return{checked1:!0,popTitle:"送货签收",loading:!1,message:!1,orderNum:0,form:{shipIds:[],childShipIds:[],orgIds:[],signTime:new Date,signName:"",signCocumentTypeId:0,documentNum:"",signTypeId:0,remark:""},rules:{signName:[{required:!0,trigger:"blur",message:"签收人不能为空！"}]}}},watch:{isDepMain:function(){},dotInfo:function(e){e&&(this.form=e,this.form.signTime=new Date,this.form.signName=e.signName,this.form.signTypeId=99,this.form.signCocumentTypeId=96,this.orderNum=e.shipIds.length,0===this.orderNum&&(this.orderNum=e.childShipIds.length))},orgid:function(e){this.form.orgid=e},isModify:{handler:function(e){this.isModify},immediate:!0}},methods:{setSystemTime:function(){var t=this;return Object(l.f)().then(function(e){t.form.signTime=e}).catch(function(e){t.loading=!1,t._handlerCatchMsg(e)})},reset:function(){this.$refs.ruleForm.resetFields()},closeMe:function(e){this.$emit("close"),this.reset(),"function"==typeof e&&e()},submitForm:function(e){var o=this;this.$refs[e].validate(function(e){if(e){o.loading=!0;var t=s()({},o.form);Object(a.a)(t).then(function(e){o.$message({type:"success",message:"签收成功"}),o.message=!0,o.closeMe(),o.$emit("message",o.message)}).catch(function(e){o._handlerCatchMsg(e),o.message=!1,o.closeMe(),o.$emit("message",o.message)})}})}}}}});