webpackJsonp([294],{NQjn:function(e,i,t){"use strict";var o={render:function(){var i=this,e=i.$createElement,t=i._self._c||e;return t("el-dialog",{directives:[{name:"loading",rawName:"v-loading",value:i.loading,expression:"loading"}],staticClass:"dialog_direct",attrs:{title:i.isTitle,visible:i.isPopVisible,width:"25%",center:"","close-on-click-modal":!1,"before-close":i.closeMe},on:{"update:visible":function(e){i.isPopVisible=e},click:i.closeMe}},[t("el-form",{ref:"ruleForm",attrs:{size:"mini",model:i.form,rules:i.rules,"label-width":"80px"}},[t("el-form-item",{attrs:{label:"核销方向",prop:"verificationWay"}},[t("el-input",{attrs:{placeholder:"请输入核销方向如:工商银行",maxlength:35,clearable:""},model:{value:i.form.verificationWay,callback:function(e){i.$set(i.form,"verificationWay","string"==typeof e?e.trim():e)},expression:"form.verificationWay"}})],1),i._v(" "),t("el-form-item",{attrs:{label:"备注"}},[t("el-input",{attrs:{type:"textarea",placeholder:"最多输入50个字符。",maxlength:50,clearable:""},model:{value:i.form.remark,callback:function(e){i.$set(i.form,"remark",e)},expression:"form.remark"}})],1)],1),i._v(" "),t("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{attrs:{type:"primary"},on:{click:function(e){i.submitForm("ruleForm")}}},[i._v("保 存")]),i._v(" "),t("el-button",{on:{click:i.closeMe}},[i._v("取 消")])],1)],1)},staticRenderFns:[]};i.a=o},lLoU:function(e,i,t){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var o=t("qiRJ"),r=t("NQjn");var a=function(e){t("tW/u")},s=t("VU/8")(o.a,r.a,a,null,null);i.default=s.exports},qiRJ:function(e,i,t){"use strict";var o=t("0xDb"),r=t("Nsdl");t("E4LH");i.a={data:function(){return{loading:!0,isTitle:"新增",form:{verificationWay:"",remark:""},rules:{verificationWay:[{required:!0,message:"请输入核销方向~"}]}}},computed:{isPopVisible:{get:function(){return this.popVisible},set:function(){}}},props:{popVisible:{type:Boolean,default:!1},isDoEdit:{type:Boolean,default:!1},info:{type:[Array,Object],default:function(){}}},watch:{isDoEdit:{handler:function(e,i){this.isTitle=e?"修改":"新增"},immediate:!0},info:{handler:function(e,i){this.isDoEdit?(this.isTitle="修改",this.form.verificationWay=this.info.verificationWay,this.form.remark=this.info.remark):(this.isTitle="新增",this.form={})},immediate:!0}},methods:{submitForm:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return!1;t.loading=!0;var i=Object(o.objectMerge2)({},t.form);return/\s/.test(i.verificationWay)?(t.$message.warning("不能输入空格~"),t.loading=!1):""===i.verificationWay?(t.$message.warning("请输入核销方向~"),t.loading=!1):void(t.isDoEdit?Object(r.k)(t.info.id,i):Object(r.f)(i)).then(function(e){t.$emit("success"),t.$message.success("保存成功"),t.closeMe(),t.loading=!1}).catch(function(e){t.loading=!1,t._handlerCatchMsg(e)})})},reset:function(){this.$refs.ruleForm.resetFields()},closeMe:function(e){this.reset(),this.$emit("update:popVisible",!1),this.$emit("close"),"function"==typeof e&&e()}}}},"tW/u":function(e,i){}});