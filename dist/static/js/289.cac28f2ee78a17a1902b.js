webpackJsonp([289],{"F/lD":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=r("NJ7+"),i=r("M4Am");var o=function(e){r("anjp")},n=r("VU/8")(s.a,i.a,o,null,null);t.default=n.exports},M4Am:function(e,t,r){"use strict";var s={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("el-dialog",{attrs:{title:"忘记密码",visible:t.dialogVisible,center:"","close-on-click-modal":!1,"close-on-press-escape":!1,"before-close":t.closeMe,width:"800px"},on:{"update:visible":function(e){t.dialogVisible=e}}},[r("el-steps",{staticClass:"forgetPwd-steps",attrs:{active:t.active,"finish-status":"success","align-center":""}},[r("el-step",{attrs:{title:t.active<1?"步骤 1":"成功",description:t.desA}}),t._v(" "),r("el-step",{attrs:{title:t.active<2?"步骤 2":"成功",description:t.desB}}),t._v(" "),r("el-step",{attrs:{title:t.active<3?"步骤 3":"成功",description:"请为你的账号"+(0<t.active?t.formA.username:"")+"设置一个新密码"}})],1),t._v(" "),r("div",{staticClass:"forgetPwd-form"},[0===t.active?r("el-form",{ref:"formA",staticClass:"demo-ruleForm",attrs:{model:t.formA,rules:t.ruleA,"label-width":"100px"}},[r("el-form-item",{attrs:{label:"账号",prop:"username"}},[r("el-input",{attrs:{autofocus:!0,autoComplete:"off",placeholder:"请输入账号",maxlength:"30"},on:{focus:function(e){t.focus()}},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.next(e):null}},model:{value:t.formA.username,callback:function(e){t.$set(t.formA,"username",e)},expression:"formA.username"}})],1)],1):t._e(),t._v(" "),1===t.active?r("el-form",{ref:"formB",staticClass:"demo-ruleForm",attrs:{model:t.formB,rules:t.ruleB,"label-width":"100px"}},[r("el-form-item",{attrs:{label:"手机号",prop:"phone"}},[r("el-input",{attrs:{autoComplete:"off",placeholder:"请输入手机号",maxlength:"11",clearable:""},model:{value:t.formB.phone,callback:function(e){t.$set(t.formB,"phone",e)},expression:"formB.phone"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"短信验证码",prop:"code"}},[r("el-input",{attrs:{autoComplete:"off",placeholder:"请输入短信验证码"},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.next(e):null}},model:{value:t.formB.code,callback:function(e){t.$set(t.formB,"code",e)},expression:"formB.code"}}),t._v(" "),r("el-button",{attrs:{type:"primary",size:"mini",disabled:!t.regphone.test(t.formB.phone)||"短信验证码"!==t.timerMsg},on:{click:t.getUserValidate}},[t._v(t._s(t.timerMsg))])],1)],1):t._e(),t._v(" "),2===t.active?r("el-form",{ref:"formC",attrs:{model:t.formC,rules:t.ruleC,"label-width":t.formLabelWidth,size:t.formSize,rule:t.ruleC}},[r("el-form-item",{attrs:{label:"新密码",prop:"newPassword"}},[r("el-input",{attrs:{autoComplete:"off",type:t.isview?"text":"password",placeholder:"请设置6-15位(可数字+字母)",maxlength:"15"},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.next(e):null}},model:{value:t.formC.newPassword,callback:function(e){t.$set(t.formC,"newPassword",e)},expression:"formC.newPassword"}},[r("i",{class:t.isview?"icon_zy":"icon_by",attrs:{slot:"suffix"},on:{click:function(e){t.isview=!t.isview}},slot:"suffix"})])],1)],1):t._e()],1),t._v(" "),r("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{attrs:{type:2<t.active?"success":"primary"},on:{click:t.next}},[t._v(t._s(1<t.active?"保存新密码":"下一步"))])],1)],1)},staticRenderFns:[]};t.a=s},"NJ7+":function(e,t,r){"use strict";var s=r("woOf"),i=r.n(s),o=r("M9A7"),n=r("0xDb"),a=(r("E4LH"),r("NC6I")),c=r.n(a);t.a={data:function(){return{regphone:/\d{11}/,active:0,isview:!1,formLabelWidth:"90px",formSize:"",formA:{username:""},formB:{username:"",phone:"",code:""},formC:{username:"",newPassword:"",successFlag:""},timerMsg:"短信验证码",desA:"请填写你要找回的密码的账号",desB:"请填写手机号码",ruleA:{username:[{required:!0,trigger:"blur",message:"请输入账号"}]},ruleB:{phone:[{required:!0,trigger:"blur",validator:function(e,t,r){"string"!=typeof t||""===t||t.length<11?r("请输入11位手机号"):/\d{11}/.test(t)?r():r("请输入手机号")}}],code:[{required:!0,trigger:"blur",message:"请输入短信验证码"}]},ruleC:{newPassword:[{required:!0,trigger:"blur",message:"请输入新密码",validator:function(e,t,r){"string"!=typeof t||""===t||t.length<6?r("密码不能小于6位"):r()}}]}}},props:{popVisible:{type:Boolean,default:!1},info:{type:Object,default:function(){}}},watch:{popVisible:{handler:function(e,t){e&&this.init()},immediate:!0}},computed:{dialogVisible:{get:function(){return this.popVisible},set:function(){}}},methods:{init:function(){var e=this;this.active=0,this.formA=i()({},this.$options.data().formA),this.formB=i()({},this.$options.data().formB),this.formC=i()({},this.$options.data().formC),this.$nextTick(function(){e.$refs.formA.resetFields()}),this.formA.username=this.info.username||"",clearInterval(this.timerOption)},next:function(){var t=this,e=0===this.active?"formA":1===this.active?"formB":"formC";this.$refs[e].validate(function(e){if(e)switch(t.active){case 0:t.checkUsername();break;case 1:t.checkUserValidate();break;case 2:t.forgetAndUpdatePwd()}})},codeTime:function(){var e=this,t=60;this.timerOption=setInterval(function(){t-=1,e.timerMsg=t+" 秒后刷新",t<=0&&(e.timerMsg=e.$options.data().timerMsg,clearInterval(e.timerOption),t=60)},1e3)},checkUsername:function(){var t=this;return Object(o.c)(this.formA).then(function(e){t.active++,t.formB.username=t.formA.username,t.formC.username=t.formA.username}).catch(function(e){t._handlerCatchMsg(e)})},getUserValidate:function(){var t=this;if(this.formB.phone)return Object(o.g)(this.formB).then(function(e){t.codeTime(),t.$notify({title:"成功",message:"短信已发送成功，注意查收！",type:"success"})}).catch(function(e){t._handlerCatchMsg(e)});this.$message.warning("请填写手机号码")},checkUserValidate:function(){var t=this;return Object(o.b)(this.formB).then(function(e){t.active++,e&&(t.formC.successFlag=e)}).catch(function(e){t._handlerCatchMsg(e)})},forgetAndUpdatePwd:function(){var t=this,e=Object(n.objectMerge2)({},this.formC);return e.newPassword=c()(e.newPassword),Object(o.d)(e).then(function(e){t.active++,t.$message.success("修改密码成功！"),t.closeMe()}).catch(function(e){t._handlerCatchMsg(e)})},closeMe:function(){this.$emit("update:popVisible",!1)},focus:function(){}}}},anjp:function(e,t){}});