webpackJsonp([277],{"2zSR":function(e,t){},ABFs:function(e,t,o){"use strict";var a={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"add-dot"},[o("pop-right",{staticClass:"addEmployeerPop",attrs:{title:t.popTitle,isShow:t.popVisible},on:{close:t.closeMe}},[o("template",{staticClass:"addEmployeerPop-content",slot:"content"},[t.companyId===t.form.id?o("el-form",{key:t.formKey,ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:t.form,rules:t.rules,inline:!0,"label-position":"right",size:"mini"}},[o("el-form-item",{attrs:{label:"公司名称","label-width":t.formLabelWidth,prop:"orgName"}},[o("el-input",{attrs:{"auto-complete":"off",disabled:t.companyId===t.form.id||31===t.form.status,maxlength:15},model:{value:t.form.orgName,callback:function(e){t.$set(t.form,"orgName",e)},expression:"form.orgName"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"网点类型","label-width":t.formLabelWidth}},[o("SelectType",{attrs:{type:"network_type",placeholder:"请选择",disabled:t.companyId===t.form.id||31===t.form.status},model:{value:t.form.orgType,callback:function(e){t.$set(t.form,"orgType",e)},expression:"form.orgType"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"公司状态","label-width":t.formLabelWidth,disabled:"disabled"}},[o("el-select",{attrs:{disabled:!(!t.isModify&&t.companyId===t.form.id||31===t.form.status)},model:{value:t.form.status,callback:function(e){t.$set(t.form,"status",e)},expression:"form.status"}},[o("el-option",{attrs:{label:"有效",value:32}}),t._v(" "),o("el-option",{attrs:{label:"无效",value:31}})],1)],1),t._v(" "),o("el-form-item",{attrs:{label:"公司代码","label-width":t.formLabelWidth,prop:"networkCode"}},[o("el-input",{attrs:{"auto-complete":"off ",disabled:31===t.form.status||t.companyId===t.form.id,maxlength:10,clearable:""},model:{value:t.form.networkCode,callback:function(e){t.$set(t.form,"networkCode",e)},expression:"form.networkCode"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"负责人","label-width":t.formLabelWidth,prop:"responsibleName"}},[o("el-input",{attrs:{"auto-complete":"off",disabled:31===t.form.status,clearable:""},model:{value:t.form.responsibleName,callback:function(e){t.$set(t.form,"responsibleName",e)},expression:"form.responsibleName"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"负责人电话","label-width":t.formLabelWidth,prop:"responsibleTelephone"}},[o("el-input",{attrs:{"auto-complete":"off",disabled:31===t.form.status},model:{value:t.form.responsibleTelephone,callback:function(e){t.$set(t.form,"responsibleTelephone",e)},expression:"form.responsibleTelephone"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"客服人员","label-width":t.formLabelWidth,prop:"serviceName"}},[o("el-input",{attrs:{"auto-complete":"off",disabled:31===t.form.status,clearable:""},model:{value:t.form.serviceName,callback:function(e){t.$set(t.form,"serviceName",e)},expression:"form.serviceName"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"客服电话","label-width":t.formLabelWidth,prop:"servicePhone",clearable:""}},[o("el-input",{attrs:{"auto-complete":"off",maxlength:11,disabled:31===t.form.status},model:{value:t.form.servicePhone,callback:function(e){t.$set(t.form,"servicePhone",e)},expression:"form.servicePhone"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"所在城市","label-width":t.formLabelWidth,prop:"city"}},[o("querySelect",{attrs:{filterable:"",show:"select",search:"longAddr",valuekey:"longAddr",disabled:t.companyId===t.form.id||31===t.form.status,type:"city",remote:!0,clearable:""},on:{change:t.getCity},model:{value:t.form.city,callback:function(e){t.$set(t.form,"city",e)},expression:"form.city"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"详细地址","label-width":t.formLabelWidth}},[o("el-input",{attrs:{"auto-complete":"off",disabled:31===t.form.status,maxlength:50},model:{value:t.form.detailedAddr,callback:function(e){t.$set(t.form,"detailedAddr",e)},expression:"form.detailedAddr"}})],1)],1):o("el-form",{key:t.formKey,ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:t.form,rules:t.rules,inline:!0,"label-position":"right",size:"mini"}},[o("el-form-item",{attrs:{label:"网点名称","label-width":t.formLabelWidth,prop:"orgName"}},[o("el-input",{attrs:{"auto-complete":"off",disabled:31===t.form.status,maxlength:15},model:{value:t.form.orgName,callback:function(e){t.$set(t.form,"orgName",e)},expression:"form.orgName"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"网点类型","label-width":t.formLabelWidth}},[o("SelectType",{attrs:{type:"network_type",placeholder:"请选择",disabled:t.isModify},model:{value:t.form.orgType,callback:function(e){t.$set(t.form,"orgType",e)},expression:"form.orgType"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"网点状态","label-width":t.formLabelWidth,disabled:"disabled"}},[o("el-select",{attrs:{disabled:!t.isModify},model:{value:t.form.status,callback:function(e){t.$set(t.form,"status",e)},expression:"form.status"}},[o("el-option",{attrs:{label:"有效",value:32}}),t._v(" "),o("el-option",{attrs:{label:"无效",value:31}})],1)],1),t._v(" "),o("el-form-item",{attrs:{label:"上级网点","label-width":t.formLabelWidth}},[o("SelectTree",{attrs:{disabled:t.isModify||31===t.form.status,orgid:t.form.parentId||t.otherinfo.orgid},on:{change:t.canadd},model:{value:t.form.parentId,callback:function(e){t.$set(t.form,"parentId",e)},expression:"form.parentId"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"经营类型","label-width":t.formLabelWidth}},[o("el-select",{attrs:{disabled:31===t.form.status},model:{value:t.form.manageType,callback:function(e){t.$set(t.form,"manageType",e)},expression:"form.manageType"}},[o("el-option",{attrs:{label:"自营",value:3}}),t._v(" "),o("el-option",{attrs:{label:"加盟",value:4}})],1)],1),t._v(" "),t.isModify?o("el-form-item",{attrs:{label:"创建时间","label-width":t.formLabelWidth}},[o("el-input",{attrs:{value:t._f("parseTime")(t.form.createTime,"{y}/{m}/{d}"),disabled:t.isModify||31===t.form.status}})],1):t._e(),t._v(" "),o("el-form-item",{attrs:{label:"负责人","label-width":t.formLabelWidth,prop:"responsibleName"}},[o("el-input",{attrs:{"auto-complete":"off",disabled:31===t.form.status,clearable:"",maxlength:10},model:{value:t.form.responsibleName,callback:function(e){t.$set(t.form,"responsibleName",e)},expression:"form.responsibleName"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"负责人电话","label-width":t.formLabelWidth,prop:"responsibleTelephone"}},[o("el-input",{attrs:{maxlength:11,"auto-complete":"off",disabled:31===t.form.status},model:{value:t.form.responsibleTelephone,callback:function(e){t.$set(t.form,"responsibleTelephone",e)},expression:"form.responsibleTelephone"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"所在城市","label-width":t.formLabelWidth,prop:"city"}},[o("querySelect",{attrs:{filterable:"",show:"select",search:"longAddr",valuekey:"longAddr",disabled:31===t.form.status,type:"city",remote:!0,clearable:""},on:{change:t.getCity},model:{value:t.form.city,callback:function(e){t.$set(t.form,"city",e)},expression:"form.city"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"客服人员","label-width":t.formLabelWidth,prop:"serviceName"}},[o("el-input",{attrs:{"auto-complete":"off",disabled:31===t.form.status,clearable:"",maxlength:10},model:{value:t.form.serviceName,callback:function(e){t.$set(t.form,"serviceName",e)},expression:"form.serviceName"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"客服电话","label-width":t.formLabelWidth,prop:"servicePhone",clearable:""}},[o("el-input",{attrs:{"auto-complete":"off",disabled:31===t.form.status,maxlength:11},model:{value:t.form.servicePhone,callback:function(e){t.$set(t.form,"servicePhone",e)},expression:"form.servicePhone"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"详细地址","label-width":t.formLabelWidth}},[o("el-input",{attrs:{"auto-complete":"off",disabled:31===t.form.status,maxlength:30},model:{value:t.form.detailedAddr,callback:function(e){t.$set(t.form,"detailedAddr",e)},expression:"form.detailedAddr"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"网点代码","label-width":t.formLabelWidth,prop:"networkCode"}},[o("el-input",{attrs:{"auto-complete":"off ",disabled:31===t.form.status,maxlength:10,clearable:""},model:{value:t.form.networkCode,callback:function(e){t.$set(t.form,"networkCode",e)},expression:"form.networkCode"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"代收款限额","label-width":t.formLabelWidth,prop:""}},[o("el-input",{directives:[{name:"number-only",rawName:"v-number-only"}],attrs:{"auto-complete":"off",maxlength:9,disabled:31===t.form.status},model:{value:t.form.collectionFee,callback:function(e){t.$set(t.form,"collectionFee",e)},expression:"form.collectionFee"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"提现基准","label-width":t.formLabelWidth,prop:""}},[o("el-input",{directives:[{name:"number-only",rawName:"v-number-only"}],attrs:{"auto-complete":"off",disabled:31===t.form.status,maxlength:9},model:{value:t.form.benchmark,callback:function(e){t.$set(t.form,"benchmark",e)},expression:"form.benchmark"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"预警额度","label-width":t.formLabelWidth,prop:""}},[o("el-input",{directives:[{name:"number-only",rawName:"v-number-only"}],attrs:{"auto-complete":"off",maxlength:9,disabled:31===t.form.status},model:{value:t.form.warningQuota,callback:function(e){t.$set(t.form,"warningQuota",e)},expression:"form.warningQuota"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"锁机额度","label-width":t.formLabelWidth,prop:""}},[o("el-input",{directives:[{name:"number-only",rawName:"v-number-only"}],attrs:{"auto-complete":"off",maxlength:9,disabled:31===t.form.status},model:{value:t.form.lockMachineQuota,callback:function(e){t.$set(t.form,"lockMachineQuota",e)},expression:"form.lockMachineQuota"}})],1),t._v(" "),t.isModify?t._e():o("div",{staticClass:"ad-add-dot"},[o("el-checkbox",{attrs:{checked:""},model:{value:t.form.accountStatus,callback:function(e){t.$set(t.form,"accountStatus",e)},expression:"form.accountStatus"}},[t._v("开通管理员账号")]),t._v(" "),o("p",[t._v(" 密码：123456")])],1),t._v(" "),t.form.accountStatus&&!t.isModify?o("el-form-item",{attrs:{"label-width":t.formLabelWidth,prop:"accountName"}},[o("el-tooltip",{staticClass:"item",attrs:{effect:"dark",placement:"top",enterable:!1,manual:!0,value:t.tooltip,tabindex:"-1"}},[o("div",{attrs:{slot:"content"},slot:"content"},[t._v("账号可以由字母、数字组成"),o("br"),t._v("长度范围2~15个字符")]),t._v(" "),o("el-input",{attrs:{"auto-complete":"off"},on:{focus:function(e){t.tooltip=!0},blur:function(e){t.tooltip=!1}},model:{value:t.form.accountName,callback:function(e){t.$set(t.form,"accountName","string"==typeof e?e.trim():e)},expression:"form.accountName"}})],1)],1):t._e(),t._v(" "),o("div",{staticClass:"rem-add-dot"},[o("el-form-item",{attrs:{label:"备注","label-width":t.formLabelWidth,prop:""}},[o("el-input",{attrs:{type:"textarea",rows:2,placeholder:"不可超300字","auto-complete":"off",maxlength:300},model:{value:t.form.remarks,callback:function(e){t.$set(t.form,"remarks",e)},expression:"form.remarks"}})],1)],1)],1),t._v(" "),t.companyId!==t.form.id?o("div",{staticClass:"spanDiv"},[o("span",[t._v("元")]),t._v(" "),o("span",[t._v("元")]),t._v(" "),t.isModify?o("span",{staticClass:"span-hidden"},[t._v("元")]):t._e(),t._v(" "),t.isModify?t._e():o("span",{staticClass:"span-last"},[t._v("元")])]):t._e()],1),t._v(" "),o("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{attrs:{type:"primary"},on:{click:function(e){t.submitForm("ruleForm",!0)}}},[t._v("保存并添加")]),t._v(" "),o("el-button",{attrs:{type:"primary"},on:{click:function(e){t.submitForm("ruleForm")}}},[t._v("保存")]),t._v(" "),o("el-button",{on:{click:t.closeMe}},[t._v("取 消")])],1)],2)],1)},staticRenderFns:[]};t.a=a},m59D:function(e,t,o){"use strict";var a=o("//Fk"),r=o.n(a),l=o("Dd8w"),i=o.n(l),s=o("T8y6"),m=o("P5Di"),n=o("o9X6"),f=o("66wn"),c=o("pAQG"),d=o("E4LH"),p=(o("0xDb"),o("NYxO")),u=o("9UCZ");t.a={components:{popRight:m.a,SelectTree:n.a,SelectCity:f.a,querySelect:c.a,SelectType:u.a},computed:i()({},Object(p.b)(["otherinfo"]),{isShow:{get:function(){return this.popVisible},set:function(){}}}),props:{popVisible:{type:Boolean,default:!1},isModify:{type:Boolean,default:!1},dotInfo:Object,orgid:{type:Number},companyId:{type:Number},getCheckedKeyId:{type:[Number,String]}},watch:{"form.accountStatus":{handler:function(){this.form.accountName=""}},popVisible:function(e){e&&(this.formKey=Math.random(),this.fetchData()),this.watchDate(this.doInfo)},getCheckedKeyId:function(e){this.watchDate()},doInfo:{handler:function(){this.checkShowMessage=!1,this.watchDate(this.doInfo)},immediate:!0,deep:!0},isModify:{handler:function(){this.watchDate()},immediate:!0}},data:function(){var e=function(e,t,o){o()};return{tooltip:!1,formKey:"",popTitle:"新增网点",checked:!0,loading:!1,checkShowMessage:!1,netWorkType:[],newnNetWorkType:[],manageType:[],netWorkStatus:[],isChecked:!1,isCheckedShow:!1,form:{orgName:"",orgType:1,status:32,responsibleTelephone:"",responsibleName:"",city:"",serviceName:"",parentName:"",servicePhone:"",detailedAddr:"",networkCode:"",collectionFee:"",benchmark:"",warningQuota:"",lockMachineQuota:"",manageType:3,remarks:"",accountStatus:!0,parentId:0,createTime:"",id:"",accountName:""},rules:{orgName:[{required:!0,message:"请输入网点名称"}],servicePhone:[{required:!0,pattern:d.a.TELANDPHONE,message:"客服号码格式不正确"}],responsibleName:[{validator:e,trigger:"blur"},{min:2,message:"最少2个字符",trigger:"blur"},{max:10,message:"不可超过10个字符",trigger:"blur"}],responsibleTelephone:[{pattern:d.a.MOBILE,message:"请输入正确的电话号码",trigger:["blur","change"]}],serviceName:[{validator:e,trigger:"blur"},{min:2,message:"最少2个字符",trigger:"blur"},{max:10,message:"不可超过10个字符",trigger:"blur"}],networkCode:[{required:!0,message:"请输入网点代码"},{min:2,message:"最少2个字符",trigger:"blur"},{max:10,message:"不可超过10个字符",trigger:"blur"}],city:[{required:!0,message:"请选择城市"}],accountName:[{required:!0,message:"请输入有效的登录账号",pattern:d.a.USERNAME},{max:15,message:"不能超过15个字符",trigger:"blur"}]},dialogVisible:!1,formLabelWidth:"120px"}},mounted:function(){},methods:{fetchData:function(){var t=this;this.loading=!0,this.form.parentId=this.orgid||this.companyId,r.a.all([Object(s.c)(this.form.parentId),Object(s.b)(this.form.parentId),Object(s.d)(this.form.parentId)]).then(function(e){t.manageType=e[1],t.netWorkStatus=e[2],t.netWorkType=e[0],t.loading=!1}).catch(function(e){t._handlerCatchMsg(e),t.loading=!1})},canadd:function(e,t){t&&t.index&&5<=t.index&&(this.$message.info("添加的层级数不能超过5层，请重新选择~"),this.form.parentId=this.otherinfo.companyId)},watchDate:function(){for(var e in this.form)this.form[e]="";this.isModify?(this.popTitle="修改网点",this.changeDate(this.dotInfo),this.form.id=this.dotInfo.id,this.form.parentId=this.dotInfo.parentId||this.companyId):(this.popTitle="新增网点",this.form.id&&delete this.form.id,delete this.form.createTime,this.form.orgType=1,this.form.status=32,this.form.manageType=3,this.form.parentId=this.getCheckedKeyId||this.otherinfo.orgid)},getCity:function(e){this.form.city=e?e.longAddr:e},getOrgid:function(e){this.form.parentId=e},newDate:function(){},reset:function(){for(var e in this.$refs.ruleForm.resetFields(),this.form)this.form[e]="",this.form.id&&delete this.form.id,delete this.form.createTime,this.form.orgType=1,this.form.status=32,this.form.manageType=3,this.form.parentId=this.getCheckedKeyId||this.otherinfo.orgid},closeMe:function(e){this.$emit("close"),this.reset(),"function"==typeof e&&e()},submitForm:function(e,o){var a=this;this.$refs[e].validate(function(e){if(a.isChecked=!1,a.isCheckedShow=!1,!e)return a.$message({type:"error",message:"保存失败"}),!1;a.loading=!0;var t=void 0;a.isModify?(a.form.id===a.form.parentId&&a.form.parentId===a.otherinfo.companyId&&(a.form.parentId=0),a.form.id=a.dotInfo.id,a.form.createTime=+new Date(a.form.createTime),"总公司"===a.form.orgType&&(a.form.orgType=5),t=Object(s.j)(a.form)):(!0===a.form.accountStatus?a.form.accountStatus=0:a.form.accountStatus=1,t=Object(s.h)(a.form)),t.then(function(e){a.$emit("success",a.isModify),a.$message.success("保存成功"),a.formKey=Math.random(),a.reset(),o||a.closeMe(),a.loading=!1}).catch(function(e){a._handlerCatchMsg(e),a.loading=!1})})},changeDate:function(e){this.form.orgName=e.orgName,this.form.responsibleTelephone=e.responsibleTelephone,this.form.responsibleName=e.responsibleName,this.form.city=e.city,this.form.serviceName=e.serviceName,this.form.parentName=e.parentName,this.form.servicePhone=e.servicePhone,this.form.detailedAddr=e.detailedAddr,this.form.networkCode=e.networkCode,this.form.collectionFee=e.collectionFee,this.form.benchmark=e.benchmark,this.form.warningQuota=e.warningQuota,this.form.lockMachineQuota=e.lockMachineQuota,this.form.remarks=e.remarks,this.form.status=e.status,this.form.accountStatus=e.accountStatus,this.form.manageType=e.manageType,this.form.createTime=e.createTime,5===e.orgType?this.form.orgType="总公司":this.form.orgType=e.orgType}}}},ttFD:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=o("m59D"),r=o("ABFs");var l=function(e){o("2zSR")},i=o("VU/8")(a.a,r.a,l,null,null);t.default=i.exports}});