webpackJsonp([212,271],{"0HpM":function(e,t){},"3hXY":function(e,t,s){"use strict";var o={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"myinfo-panel"},[s("el-row",{staticClass:"infopanel"},[s("el-col",{staticClass:"info-title",attrs:{span:24}},[s("strong",[t._v("个人信息")])]),t._v(" "),s("el-col",{attrs:{span:4}},[s("div",{staticClass:"label"},[s("img",{staticClass:"user-avatar",attrs:{src:t.avatar}})])]),t._v(" "),s("el-col",{attrs:{span:20}},[s("span",{staticClass:"inline-label"},[t._v("姓名：")]),t._v(t._s(t.otherinfo.name)+"\n        "),s("br"),t._v(" "),s("span",{staticClass:"inline-label"},[t._v("手机号：")]),t._v("\n      "+t._s(t.otherinfo.mobilephone)+"\n    ")])],1),t._v(" "),s("el-row",{staticClass:"infopanel"},[s("el-col",{staticClass:"info-title",attrs:{span:24}},[s("strong",[t._v("账号信息")])]),t._v(" "),s("el-col",{attrs:{span:4}},[s("div",{staticClass:"label"},[t._v("登录账户：")])]),t._v(" "),s("el-col",{attrs:{span:20}},[t._v("\n      "+t._s(t.otherinfo.username)+"\n    ")]),t._v(" "),s("el-col",{attrs:{span:4}},[s("div",{staticClass:"label"},[t._v("密码：")])]),t._v(" "),s("el-col",{attrs:{span:20}},[t._v("\n      *********** "),s("el-button",{attrs:{type:"text"},on:{click:function(e){t.showPop=!0}}},[t._v("修改密码")])],1)],1),t._v(" "),s("el-row",{staticClass:"infopanel"},[s("el-col",{staticClass:"info-title",attrs:{span:24}},[s("strong",[t._v("公司信息")])]),t._v(" "),s("el-col",{attrs:{span:4}},[s("div",{staticClass:"label"},[t._v("公司：")])]),t._v(" "),s("el-col",{attrs:{span:20}},[t._v("\n      "+t._s(t.otherinfo.companyName)+"\n    ")]),t._v(" "),s("el-col",{attrs:{span:4}},[s("div",{staticClass:"label"},[t._v("所属网点：")])]),t._v(" "),s("el-col",{attrs:{span:20}},[t._v("\n      "+t._s(t.otherinfo.orgName)+"\n    ")]),t._v(" "),s("el-col",{attrs:{span:4}},[s("div",{staticClass:"label"},[t._v("所属部门：")])]),t._v(" "),s("el-col",{attrs:{span:20}},[t._v("\n      "+t._s(t.otherinfo.departmentName||t.otherinfo.departmentId)+"\n    ")]),t._v(" "),s("el-col",{attrs:{span:4}},[s("div",{staticClass:"label"},[t._v("职位：")])]),t._v(" "),s("el-col",{attrs:{span:20}},[t._v("\n      "+t._s(t.otherinfo.position)+"\n    ")])],1),t._v(" "),s("ChangePwPop",{attrs:{isShow:t.showPop},on:{"update:isShow":function(e){t.showPop=e},close:t.close}})],1)},staticRenderFns:[]};t.a=o},"4dsM":function(e,t,s){"use strict";t.a=function(e){return o.b.put("/api-system/system/user/v1/updatePassword",e)};var o=s("Vo7i")},AcR2:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=s("k1xW"),a=s("3hXY");var r=function(e){s("Ebu6")},n=s("VU/8")(o.a,a.a,r,"data-v-d13f8112",null);t.default=n.exports},Ebu6:function(e,t){},KHBR:function(e,t,s){"use strict";var o=s("Dd8w"),a=s.n(o),r=s("NYxO"),n=s("4dsM");t.a={props:{isShow:{type:Boolean,default:!1}},computed:a()({},Object(r.b)(["otherinfo"])),mounted:function(){this.form.username=this.otherinfo.username,this.form.id=this.otherinfo.id},data:function(){var o=this;return{isCheck:"",form:{id:0,username:"",origin_pwd:"",pwd:"",re_pwd:"",errorTip:""},formLabelWidth:"100px",rules:{username:[{required:!0,message:"请输入用户名",trigger:"blur"}],origin_pwd:[{required:!0,message:"请输入原密码",trigger:"blur"},{validator:function(e,t,s){"false"===o.isCheck?(s(new Error("请输入正确的密码！")),o.isCheck=""):s()},message:"请输入正确的密码"}],pwd:[{required:!0,message:"请输入新密码",trigger:"blur",validator:function(e,t,s){"string"!=typeof t||""===t||t.length<6?s("密码不能小于6位"):s()}}],re_pwd:[{required:!0,message:"请再次输入新密码",trigger:"change"},{validator:function(e,t,s){""===t?s(new Error("请再次输入密码")):t!==o.form.pwd?s(new Error("两次输入密码不一致!")):s()},trigger:"blur"}]}}},methods:{submitForm:function(s){var o=this;this.$refs[s].validate(function(e){if(!e)return!1;var t=o.form;Object(n.a)({username:t.username,id:t.id,password:t.origin_pwd,newPassword:t.pwd,affirmNewPassword:t.re_pwd}).then(function(e){o.$alert("修改成功","提示",{confirmButtonText:"确定",callback:function(e){o.closeMe()}})}).catch(function(e){-1!==e.text.indexOf("原密码错误")&&(o.isCheck="false",o.$refs[s].validate()),o.$message.error(e.text)})})},resetForm:function(e){this.$refs[e].resetFields()},closeMe:function(e){this.resetForm("ruleForm"),this.$emit("update:isShow",!1),"function"==typeof e&&e()}}}},"SRf+":function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=s("KHBR"),a=s("ZE8u");var r=function(e){s("0HpM")},n=s("VU/8")(o.a,a.a,r,null,null);t.default=n.exports},ZE8u:function(e,t,s){"use strict";var o={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("el-dialog",{staticClass:"passwordPop",attrs:{title:"修改密码",visible:t.isShow,"close-on-click-modal":!1,"before-close":t.closeMe},on:{"update:visible":function(e){t.isShow=e}}},[s("el-form",{ref:"ruleForm",attrs:{model:t.form,"status-icon":"",size:"mini",rules:t.rules}},[s("el-form-item",{attrs:{label:"账号","label-width":t.formLabelWidth,prop:"username"}},[s("el-input",{attrs:{disabled:"","auto-complete":"off"},model:{value:t.form.username,callback:function(e){t.$set(t.form,"username",e)},expression:"form.username"}})],1),t._v(" "),s("el-form-item",{attrs:{label:"原始密码","label-width":t.formLabelWidth,prop:"origin_pwd"}},[s("el-input",{attrs:{type:"password","auto-complete":"off"},model:{value:t.form.origin_pwd,callback:function(e){t.$set(t.form,"origin_pwd",e)},expression:"form.origin_pwd"}})],1),t._v(" "),s("el-form-item",{attrs:{label:"新密码","label-width":t.formLabelWidth,prop:"pwd"}},[s("el-input",{attrs:{type:"password","auto-complete":"off"},model:{value:t.form.pwd,callback:function(e){t.$set(t.form,"pwd",e)},expression:"form.pwd"}})],1),t._v(" "),s("el-form-item",{attrs:{label:"确认新密码","label-width":t.formLabelWidth,prop:"re_pwd"}},[s("el-input",{attrs:{type:"password","auto-complete":"off"},model:{value:t.form.re_pwd,callback:function(e){t.$set(t.form,"re_pwd",e)},expression:"form.re_pwd"}})],1)],1),t._v(" "),s("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{attrs:{size:"mini"},on:{click:t.closeMe}},[t._v("取 消")]),t._v(" "),s("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(e){t.submitForm("ruleForm")}}},[t._v("确 定")])],1)],1)},staticRenderFns:[]};t.a=o},k1xW:function(e,t,s){"use strict";var o=s("Dd8w"),a=s.n(o),r=s("NYxO"),n=s("SRf+");t.a={name:"myinfo",components:{ChangePwPop:n.default},computed:a()({},Object(r.b)(["name","roles","company","avatar","otherinfo"])),data:function(){return{showPop:!1}},methods:{close:function(){this.showPop=!1}}}}});