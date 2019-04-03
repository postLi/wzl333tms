webpackJsonp([321],{"9l6W":function(e,r,t){"use strict";var i=t("woOf"),a=t.n(i),o=t("Dd8w"),s=t.n(o),l=t("E4LH"),n=t("9ani"),d=t("P5Di"),m=t("QbVN"),c=t("o9X6"),f=t("9UCZ"),p=t("NYxO"),u=t("0xDb");r.a={components:{popRight:d.a,Upload:m.a,SelectTree:c.a,SelectType:f.a},props:{popVisible:{type:Boolean,default:!1},orgid:{required:!0},isModify:{type:Boolean,default:!1},info:{type:Object,default:function(){}},licenseTypes:{type:Array,default:function(){return[]}}},computed:s()({},Object(p.mapGetters)(["otherinfo"])),data:function(){return{searchTime:[],form:{bankCardNumber:"",bankName:"",certification:"",driverAddress:"",driverCardid:"",driverMobile:"",driverName:"",driverRemarks:"",drivingPicture:"",idcardPicture:"",licenseType:"",licenseTypeName:"",openBank:"",validityDate:"",validityStartdate:"",orgid:0},formLabelWidth:"100px",tooltip:!1,rules:{driverName:[{required:!0,message:"请输入司机名称"}],orgid:[{required:!0,message:"请选择所属机构"}],driverMobile:[{required:!0,trigger:"change",validator:function(e,r,t){""!==r&&null!==r&&r&&void 0!==r?l.a.MOBILE.test(r)?t():t(new Error("请输入有效的手机号码")):t(new Error("不能为空"))}}],driverCardid:[{pattern:l.a.ONLY_NUMBER_AND_LETTER,message:"身份证号码只能输入字母和数字"}]},popTitle:"新增司机",orgArr:[],rolesArr:[],departmentArr:[],loading:!1,roles:[],departments:[],groups:[],inited:!1,pickOption2:{firstDayOfWeek:1,disabledDate:function(e){return e.getTime()<Date.now()}}}},mounted:function(){this.form.orgid=this.orgid,this.inited||(this.inited=!0,this.initInfo())},watch:{popVisible:{handler:function(e,r){this.inited||(this.inited=!0,this.initInfo())},immediate:!0},orgid:function(e){this.form.orgid=e},info:{handler:function(e,r){if(this.isModify){this.popTitle="修改司机";var t=a()({},e);for(var i in this.form)this.form[i]=t[i];e.validityStartdate&&this.$set(this.searchTime,0,e.validityStartdate),e.validityDate&&this.$set(this.searchTime,1,e.validityDate),console.log(e.validityStartdate,e.validityDate),this.form.id=t.id}else{for(var o in this.popTitle="新增司机",this.form)this.form[o]="";this.searchTime=this.$options.data().searchTime,delete this.form.id,this.form.orgid=this.orgid}},deep:!0}},methods:{initInfo:function(){this.loading=!1},getOrgid:function(e){this.form.orgid=e},submitForm:function(e,i){var o=this;this.$refs[e].validate(function(e){if(!e)return!1;o.loading=!0;var r=a()({},o.form);r.fixPhone=o.fixPhone,o.searchTime&&o.searchTime[0]&&o.searchTime[1]&&(r.validityStartdate=Object(u.parseTime)(o.searchTime[0],"{y}-{m}-{d} ")+" 00:00:00",r.validityDate=Object(u.parseTime)(o.searchTime[1],"{y}-{m}-{d} ")+" 23:59:59");var t=void 0;console.log(o.isModify),o.isModify?t=Object(n.e)(r):o.isModify||(t=Object(n.d)(r)),t.then(function(e){o.loading=!1,o.$message.success("保存成功"),o.reset(),i||o.closeMe(),o.$emit("success")}).catch(function(e){o._handlerCatchMsg(e),o.loading=!1})})},reset:function(){var e=this.form.orgid;this.$refs.ruleForm.resetFields(),this.form.driverMobile="",this.form.idcardPicture="",this.form.drivingPicture="",this.form.certification="",this.form.orgid=e,this.searchTime=[]},closeMe:function(e){this.$emit("update:popVisible",!1),"function"==typeof e&&e()}}}},AfEI:function(e,r,t){"use strict";var i={render:function(){var r=this,e=r.$createElement,t=r._self._c||e;return t("pop-right",{directives:[{name:"loading",rawName:"v-loading",value:r.loading,expression:"loading"}],staticClass:"addDriverPop",attrs:{title:r.popTitle,isShow:r.popVisible},on:{close:r.closeMe}},[t("template",{staticClass:"addDriverPop-content",slot:"content"},[t("el-form",{ref:"ruleForm",attrs:{model:r.form,rules:r.rules,"label-width":r.formLabelWidth,inline:!0,"label-position":"right",size:"mini"}},[t("el-form-item",{attrs:{label:"司机姓名",prop:"driverName"}},[t("el-input",{attrs:{maxlength:10,"auto-complete":"off"},model:{value:r.form.driverName,callback:function(e){r.$set(r.form,"driverName","string"==typeof e?e.trim():e)},expression:"form.driverName"}})],1),r._v(" "),t("el-form-item",{attrs:{label:"手机号码",prop:"driverMobile"}},[t("el-input",{attrs:{maxlength:11,"auto-complete":"off"},model:{value:r.form.driverMobile,callback:function(e){r.$set(r.form,"driverMobile",e)},expression:"form.driverMobile"}})],1),r._v(" "),t("el-form-item",{attrs:{label:"归属网点",prop:"orgid"}},[t("SelectTree",{attrs:{orgid:r.otherinfo.orgid},model:{value:r.form.orgid,callback:function(e){r.$set(r.form,"orgid",e)},expression:"form.orgid"}})],1),r._v(" "),t("el-form-item",{attrs:{label:"身份证号",prop:"driverCardid"}},[t("el-input",{attrs:{maxlength:18,"auto-complete":"off"},model:{value:r.form.driverCardid,callback:function(e){r.$set(r.form,"driverCardid",e)},expression:"form.driverCardid"}})],1),r._v(" "),t("el-form-item",{attrs:{label:"驾驶证类型",prop:"licenseType"}},[t("SelectType",{attrs:{type:"driving_type",placeholder:"驾驶证类型"},model:{value:r.form.licenseType,callback:function(e){r.$set(r.form,"licenseType",e)},expression:"form.licenseType"}})],1),r._v(" "),t("el-form-item",{attrs:{label:"银行卡号",prop:"bankCardNumber"}},[t("el-input",{directives:[{name:"numberOnly",rawName:"v-numberOnly"}],attrs:{maxlength:18,"auto-complete":"off"},model:{value:r.form.bankCardNumber,callback:function(e){r.$set(r.form,"bankCardNumber",e)},expression:"form.bankCardNumber"}})],1),r._v(" "),t("el-form-item",{attrs:{label:"银行名称",prop:"bankName"}},[t("el-input",{attrs:{maxlength:20,"auto-complete":"off"},model:{value:r.form.bankName,callback:function(e){r.$set(r.form,"bankName",e)},expression:"form.bankName"}})],1),r._v(" "),t("el-form-item",{attrs:{label:"开户行",prop:"openBank"}},[t("el-input",{attrs:{maxlength:20,"auto-complete":"off"},model:{value:r.form.openBank,callback:function(e){r.$set(r.form,"openBank",e)},expression:"form.openBank"}})],1),r._v(" "),t("el-form-item",{staticClass:"blockInput",attrs:{label:"驾驶证有效期",prop:"validityDate"}},[t("el-date-picker",{attrs:{type:"daterange","unlink-panels":"",align:"right","value-format":"yyyy-MM-dd HH:mm:ss","start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:r.searchTime,callback:function(e){r.searchTime=e},expression:"searchTime"}})],1),r._v(" "),t("el-form-item",{staticClass:"blockInput",attrs:{label:"司机地址",prop:"driverAddress"}},[t("el-input",{attrs:{maxlength:50,"auto-complete":"off"},model:{value:r.form.driverAddress,callback:function(e){r.$set(r.form,"driverAddress",e)},expression:"form.driverAddress"}})],1),r._v(" "),t("el-form-item",{staticClass:"driverRemarks",attrs:{label:"备注",prop:"driverRemarks"}},[t("el-input",{attrs:{type:"textarea",maxlength:300},model:{value:r.form.driverRemarks,callback:function(e){r.$set(r.form,"driverRemarks","string"==typeof e?e.trim():e)},expression:"form.driverRemarks"}})],1),r._v(" "),t("el-form-item",{staticClass:"clearfix uploadcard"},[t("div",{staticClass:"idcard"},[t("upload",{attrs:{title:"身份证"},model:{value:r.form.idcardPicture,callback:function(e){r.$set(r.form,"idcardPicture",e)},expression:"form.idcardPicture"}})],1),r._v(" "),t("div",{staticClass:"drviercard"},[t("upload",{attrs:{title:"驾驶证"},model:{value:r.form.drivingPicture,callback:function(e){r.$set(r.form,"drivingPicture",e)},expression:"form.drivingPicture"}})],1),r._v(" "),t("div",{staticClass:"certcard"},[t("upload",{attrs:{title:"从业资格证"},model:{value:r.form.certification,callback:function(e){r.$set(r.form,"certification",e)},expression:"form.certification"}})],1)])],1)],1),r._v(" "),t("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r.isModify?r._e():t("el-button",{attrs:{type:"primary"},on:{click:function(e){r.submitForm("ruleForm",!0)}}},[r._v("保存并新增")]),r._v(" "),t("el-button",{attrs:{type:"primary"},on:{click:function(e){r.submitForm("ruleForm")}}},[r._v("保 存")]),r._v(" "),t("el-button",{on:{click:r.closeMe}},[r._v("取 消")])],1)],2)},staticRenderFns:[]};r.a=i},FKPH:function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var i=t("9l6W"),o=t("AfEI");var a=function(e){t("grrk")},s=t("VU/8")(i.a,o.a,a,null,null);r.default=s.exports},grrk:function(e,r){}});