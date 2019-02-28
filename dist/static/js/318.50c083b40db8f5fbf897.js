webpackJsonp([318],{DAQk:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=o("wO8r"),i=o("Q5/P");var l=function(e){o("whtI")},s=o("VU/8")(r.a,i.a,l,null,null);t.default=s.exports},"Q5/P":function(e,t,o){"use strict";var r={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("pop-right",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"addEmployeerPop",attrs:{title:t.popTitle,isShow:t.popVisible},on:{close:t.closeMe}},[o("template",{staticClass:"addEmployeerPop-content",slot:"content"},[o("el-form",{ref:"ruleForm",attrs:{model:t.form,rules:t.rules,inline:!0,"label-position":"right",size:"mini"}},[o("el-form-item",{attrs:{label:"用户姓名","label-width":t.formLabelWidth,prop:"name"}},[o("el-input",{attrs:{"auto-complete":"off"},model:{value:t.form.name,callback:function(e){t.$set(t.form,"name",e)},expression:"form.name"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"手机号码","label-width":t.formLabelWidth,prop:"mobilephone"}},[o("el-input",{attrs:{maxlength:11,"auto-complete":"off"},model:{value:t.form.mobilephone,callback:function(e){t.$set(t.form,"mobilephone",e)},expression:"form.mobilephone"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"登录账号","label-width":t.formLabelWidth,prop:"username"}},[o("el-tooltip",{staticClass:"item",attrs:{effect:"dark",placement:"top",enterable:!1,manual:!0,value:t.tooltip,tabindex:"-1"}},[o("div",{attrs:{slot:"content"},slot:"content"},[t._v("账号可以由小写字母、数字组成"),o("br"),t._v("长度范围2~30个字符")]),t._v(" "),o("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.form.username,expression:"form.username",modifiers:{trim:!0}},{name:"onlyNumberAndLetter",rawName:"v-onlyNumberAndLetter"}],staticClass:"nativeinput",attrs:{type:"text","auto-complete":"off",maxlength:"30"},domProps:{value:t.form.username},on:{focus:function(e){t.tooltip=!0},blur:[function(e){t.tooltip=!1},function(e){t.$forceUpdate()}],input:function(e){e.target.composing||t.$set(t.form,"username",e.target.value.trim())}}})])],1),t._v(" "),o("el-form-item",{attrs:{label:"密码","label-width":t.formLabelWidth,prop:"password"}},[o("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.form.password,expression:"form.password",modifiers:{trim:!0}},{name:"onlyNumberAndLetter",rawName:"v-onlyNumberAndLetter"}],staticClass:"nativeinput",attrs:{type:"text",maxlength:"15","auto-complete":"off"},domProps:{value:t.form.password},on:{input:function(e){e.target.composing||t.$set(t.form,"password",e.target.value.trim())},blur:function(e){t.$forceUpdate()}}})]),t._v(" "),o("el-form-item",{attrs:{label:"职位","label-width":t.formLabelWidth,prop:"position"}},[o("el-input",{attrs:{"auto-complete":"off"},model:{value:t.form.position,callback:function(e){t.$set(t.form,"position",e)},expression:"form.position"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"员工号","label-width":t.formLabelWidth,prop:"jobNumber"}},[o("el-input",{attrs:{"auto-complete":"off",maxlength:20},model:{value:t.form.jobNumber,callback:function(e){t.$set(t.form,"jobNumber",e)},expression:"form.jobNumber"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"性别",prop:"sexFlag","label-width":t.formLabelWidth}},[o("el-select",{attrs:{placeholder:"请选择性别"},model:{value:t.form.sexFlag,callback:function(e){t.$set(t.form,"sexFlag",e)},expression:"form.sexFlag"}},[o("el-option",{attrs:{label:"男",value:"0"}}),t._v(" "),o("el-option",{attrs:{label:"女",value:"1"}})],1)],1),t._v(" "),o("el-form-item",{attrs:{required:"",prop:"orgid",label:"归属网点","label-width":t.formLabelWidth}},[o("SelectTree",{attrs:{filterable:"",orgid:t.otherinfo.orgid},model:{value:t.form.orgid,callback:function(e){t.$set(t.form,"orgid",e)},expression:"form.orgid"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"权限角色","label-width":t.formLabelWidth,prop:"rolesId"}},[o("el-select",{attrs:{"collapse-tags":"",filterable:"",multiple:"","filter-method":t.makefilter,placeholder:"请选择权限"},model:{value:t.form.rolesId,callback:function(e){t.$set(t.form,"rolesId",e)},expression:"form.rolesId"}},t._l(t.roleslist,function(e){return o("el-option",{key:e.id,attrs:{label:e.roleName,value:e.id}},[o("span",{staticClass:"query-input-myautocomplete",domProps:{innerHTML:t._s(t.highLight(e,"roleName"))}})])}))],1),t._v(" "),o("el-form-item",{attrs:{label:"归属部门","label-width":t.formLabelWidth,prop:"departmentId"}},[o("SelectType",{attrs:{orgid:t.otherinfo.orgid,type:"department_type",filterable:"",placeholder:"请选择部门"},model:{value:t.form.departmentId,callback:function(e){t.$set(t.form,"departmentId",e)},expression:"form.departmentId"}})],1)],1),t._v(" "),t.isModify?t._e():o("div",{staticClass:"info"},[t._v("注：密码默认为：123456")])],1),t._v(" "),o("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t.isModify?t._e():o("el-button",{attrs:{type:"primary"},on:{click:function(e){t.submitForm("ruleForm",!0)}}},[t._v("保存并添加")]),t._v(" "),o("el-button",{attrs:{type:"primary"},on:{click:function(e){t.submitForm("ruleForm")}}},[t._v("确 定")]),t._v(" "),o("el-button",{on:{click:t.closeMe}},[t._v("取 消")])],1)],2)},staticRenderFns:[]};t.a=r},wO8r:function(e,t,o){"use strict";var r=o("mvHQ"),l=o.n(r),i=o("//Fk"),s=o.n(i),a=o("woOf"),n=o.n(a),m=o("Dd8w"),f=o.n(m),d=o("E4LH"),u=o("u8ra"),p=o("P5Di"),c=o("o9X6"),h=o("NYxO"),g=o("9UCZ"),b=o("pAQG");t.a={components:{popRight:p.a,SelectTree:c.a,SelectType:g.a,querySelect:b.a},props:{popVisible:{type:Boolean,default:!1},orgid:{required:!0},isModify:{type:Boolean,default:!1},userInfo:{type:Object,default:function(){}}},computed:f()({},Object(h.mapGetters)(["otherinfo"])),data:function(){return{querykey:"11",form:{name:"",mobilephone:"",username:"",password:"123456",position:"",sexFlag:"",orgid:"",rolesId:[],departmentId:""},formLabelWidth:"80px",tooltip:!1,rules:{name:[{required:!0,message:"请输入用户姓名"},{min:2,max:10,message:"长度在 2 到 10 个字符",trigger:"blur"}],password:[{required:!0,message:"请输入密码",trigger:"blur"},{min:6,max:10,message:"长度在 6 到 15 个字符",trigger:"blur"}],mobilephone:[{required:!0,trigger:"change",validator:function(e,t,o){""!==t&&null!==t&&t&&void 0!==t?d.a.MOBILE.test(t)?o():o(new Error("请输入有效的手机号码")):o(new Error("不能为空"))}}],orgid:[{required:!0,message:"请选择归属网点"}],username:[{required:!0,message:"请输入有效的登录账号",pattern:d.a.USERNAME_NOUP},{max:30,message:"不能超过30个字符",trigger:"change"}],position:[{max:10,message:"不能超过10个字符",trigger:"blur"}]},popTitle:"新增员工",orgArr:[],rolesArr:[],departmentArr:[],loading:!1,roles:[],departments:[],groups:[],inited:!1,query:"",roleslist:[]}},mounted:function(){this.form.orgid=this.orgid,console.log("orgid2222::::::",this.orgid)},watch:{popVisible:function(e,t){this.initInfo()},orgid:function(e){console.log("orgid::::::",e),this.form.orgid=e},userInfo:function(){var e=this;if(this.isModify){this.popTitle="修改员工";n()({},this.userInfo);for(var t in this.form)this.form[t]=this.userInfo[t];this.form.rolesId="0"===this.userInfo.rolesId?[]:this.userInfo.rolesIdList,this.form.password=""}else{for(var o in this.popTitle="新增员工",this.form)this.form[o]="password"===o?"123456":"rolesId"===o?[]:"";this.$nextTick(function(){console.log("orgid333333",e.orgid),e.form.orgid=e.orgid})}}},methods:{highLight:function(e,t){return""!==this.query?this.setHightLight(e[t],this.query):e[t]},setHightLight:function(e,t){return e.replace(new RegExp(t,"igm"),'<i class="highlight">'+t+"</i>")},makefilter:function(e){this.query=e;var t=new RegExp(e,"i");this.roleslist=this.roles.filter(function(e){return t.test(e.roleName)})},initInfo:function(){var t=this;return this.loading=!0,s.a.all([Object(u.e)(this.otherinfo.companyId),Object(u.f)(this.otherinfo.companyId)]).then(function(e){t.loading=!1,t.roles=e[0].list,t.roleslist=t.roles,t.departments=e[1]}).catch(function(e){t.$message.error("错误1："+(e.text||e.errInfo||e.data||l()(e))),t.loading=!1,t.inited=!1})},getOrgid:function(e){this.form.orgid=e},reset:function(){var e=this.form.orgid;this.$refs.ruleForm.resetFields(),console.log("id",e,this.form.orgid),this.form.orgid=e},submitForm:function(e,r){var i=this;this.$refs[e].validate(function(e){if(!e)return!1;i.loading=!0;var t=n()({},i.form),o=void 0;t.rolesId=t.rolesId.join(","),i.isModify?(t.id=i.userInfo.id,o=Object(u.j)(t)):o=Object(u.i)(t),o.then(function(e){i.loading=!1,i.$message({type:"success",message:"保存成功!"}),i.reset(),r||i.closeMe(),i.$emit("success")}).catch(function(e){i.$message.error("错误2："+(e.text||e.errInfo||e.data||l()(e))),i.loading=!1})})},closeMe:function(e){this.reset(),this.$emit("update:popVisible",!1),"function"==typeof e&&e()}}}},whtI:function(e,t){}});