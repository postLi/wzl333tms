webpackJsonp([199],{"0Q33":function(e,t){},"71e1":function(e,t,i){e.exports=i("+dzQ")(43)},"9l6W":function(e,t,i){"use strict";var r=i("woOf"),o=i.n(r),a=i("Dd8w"),s=i.n(a),n=i("E4LH"),l=i("9ani"),c=i("P5Di"),d=i("QbVN"),u=i("o9X6"),m=i("9UCZ"),f=i("NYxO"),p=i("0xDb");t.a={components:{popRight:c.a,Upload:d.a,SelectTree:u.a,SelectType:m.a},props:{popVisible:{type:Boolean,default:!1},orgid:{required:!0},isModify:{type:Boolean,default:!1},info:{type:Object,default:function(){}},licenseTypes:{type:Array,default:function(){return[]}}},computed:s()({},Object(f.mapGetters)(["otherinfo"])),data:function(){return{searchTime:[],form:{bankCardNumber:"",bankName:"",certification:"",driverAddress:"",driverCardid:"",driverMobile:"",driverName:"",driverRemarks:"",drivingPicture:"",idcardPicture:"",licenseType:"",licenseTypeName:"",openBank:"",validityDate:"",validityStartdate:"",orgid:0},formLabelWidth:"100px",tooltip:!1,rules:{driverName:[{required:!0,message:"请输入司机名称"}],orgid:[{required:!0,message:"请选择所属机构"}],driverMobile:[{required:!0,trigger:"change",validator:function(e,t,i){""!==t&&null!==t&&t&&void 0!==t?n.a.MOBILE.test(t)?i():i(new Error("请输入有效的手机号码")):i(new Error("不能为空"))}}],driverCardid:[{pattern:n.a.ONLY_NUMBER_AND_LETTER,message:"身份证号码只能输入字母和数字"}]},popTitle:"新增司机",orgArr:[],rolesArr:[],departmentArr:[],loading:!1,roles:[],departments:[],groups:[],inited:!1,pickOption2:{firstDayOfWeek:1,disabledDate:function(e){return e.getTime()<Date.now()}}}},mounted:function(){this.form.orgid=this.orgid,this.inited||(this.inited=!0,this.initInfo())},watch:{popVisible:{handler:function(e,t){this.inited||(this.inited=!0,this.initInfo())},immediate:!0},orgid:function(e){this.form.orgid=e},info:{handler:function(e,t){if(this.isModify){this.popTitle="修改司机";var i=o()({},e);for(var r in this.form)this.form[r]=i[r];e.validityStartdate&&this.$set(this.searchTime,0,e.validityStartdate),e.validityDate&&this.$set(this.searchTime,1,e.validityDate),console.log(e.validityStartdate,e.validityDate),this.form.id=i.id}else{for(var a in this.popTitle="新增司机",this.form)this.form[a]="";this.searchTime=this.$options.data().searchTime,delete this.form.id,this.form.orgid=this.orgid}},deep:!0}},methods:{initInfo:function(){this.loading=!1},getOrgid:function(e){this.form.orgid=e},submitForm:function(e,r){var a=this;this.$refs[e].validate(function(e){if(!e)return!1;a.loading=!0;var t=o()({},a.form);t.fixPhone=a.fixPhone,a.searchTime&&a.searchTime[0]&&a.searchTime[1]&&(t.validityStartdate=Object(p.parseTime)(a.searchTime[0],"{y}-{m}-{d} ")+" 00:00:00",t.validityDate=Object(p.parseTime)(a.searchTime[1],"{y}-{m}-{d} ")+" 23:59:59");var i=void 0;console.log(a.isModify),a.isModify?i=Object(l.e)(t):a.isModify||(i=Object(l.d)(t)),i.then(function(e){a.loading=!1,a.$message.success("保存成功"),a.reset(),r||a.closeMe(),a.$emit("success")}).catch(function(e){a._handlerCatchMsg(e),a.loading=!1})})},reset:function(){var e=this.form.orgid;this.$refs.ruleForm.resetFields(),this.form.driverMobile="",this.form.idcardPicture="",this.form.drivingPicture="",this.form.certification="",this.form.orgid=e},closeMe:function(e){this.$emit("update:popVisible",!1),"function"==typeof e&&e()}}}},AfEI:function(e,t,i){"use strict";var r={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("pop-right",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"addDriverPop",attrs:{title:t.popTitle,isShow:t.popVisible},on:{close:t.closeMe}},[i("template",{staticClass:"addDriverPop-content",slot:"content"},[i("el-form",{ref:"ruleForm",attrs:{model:t.form,rules:t.rules,"label-width":t.formLabelWidth,inline:!0,"label-position":"right",size:"mini"}},[i("el-form-item",{attrs:{label:"司机姓名",prop:"driverName"}},[i("el-input",{attrs:{maxlength:10,"auto-complete":"off"},model:{value:t.form.driverName,callback:function(e){t.$set(t.form,"driverName","string"==typeof e?e.trim():e)},expression:"form.driverName"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"手机号码",prop:"driverMobile"}},[i("el-input",{attrs:{maxlength:11,"auto-complete":"off"},model:{value:t.form.driverMobile,callback:function(e){t.$set(t.form,"driverMobile",e)},expression:"form.driverMobile"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"归属网点",prop:"orgid"}},[i("SelectTree",{attrs:{orgid:t.otherinfo.orgid},model:{value:t.form.orgid,callback:function(e){t.$set(t.form,"orgid",e)},expression:"form.orgid"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"身份证号",prop:"driverCardid"}},[i("el-input",{attrs:{maxlength:18,"auto-complete":"off"},model:{value:t.form.driverCardid,callback:function(e){t.$set(t.form,"driverCardid",e)},expression:"form.driverCardid"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"驾驶证类型",prop:"licenseType"}},[i("SelectType",{attrs:{type:"driving_type",placeholder:"驾驶证类型"},model:{value:t.form.licenseType,callback:function(e){t.$set(t.form,"licenseType",e)},expression:"form.licenseType"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"银行卡号",prop:"bankCardNumber"}},[i("el-input",{directives:[{name:"numberOnly",rawName:"v-numberOnly"}],attrs:{maxlength:18,"auto-complete":"off"},model:{value:t.form.bankCardNumber,callback:function(e){t.$set(t.form,"bankCardNumber",e)},expression:"form.bankCardNumber"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"银行名称",prop:"bankName"}},[i("el-input",{attrs:{maxlength:20,"auto-complete":"off"},model:{value:t.form.bankName,callback:function(e){t.$set(t.form,"bankName",e)},expression:"form.bankName"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"开户行",prop:"openBank"}},[i("el-input",{attrs:{maxlength:20,"auto-complete":"off"},model:{value:t.form.openBank,callback:function(e){t.$set(t.form,"openBank",e)},expression:"form.openBank"}})],1),t._v(" "),i("el-form-item",{staticClass:"blockInput",attrs:{label:"驾驶证有效期",prop:"validityDate"}},[i("el-date-picker",{attrs:{type:"daterange",align:"right","value-format":"yyyy-MM-dd HH:mm:ss","start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:t.searchTime,callback:function(e){t.searchTime=e},expression:"searchTime"}})],1),t._v(" "),i("el-form-item",{staticClass:"blockInput",attrs:{label:"司机地址",prop:"driverAddress"}},[i("el-input",{attrs:{maxlength:50,"auto-complete":"off"},model:{value:t.form.driverAddress,callback:function(e){t.$set(t.form,"driverAddress",e)},expression:"form.driverAddress"}})],1),t._v(" "),i("el-form-item",{staticClass:"driverRemarks",attrs:{label:"备注",prop:"driverRemarks"}},[i("el-input",{attrs:{type:"textarea",maxlength:300},model:{value:t.form.driverRemarks,callback:function(e){t.$set(t.form,"driverRemarks","string"==typeof e?e.trim():e)},expression:"form.driverRemarks"}})],1),t._v(" "),i("el-form-item",{staticClass:"clearfix uploadcard"},[i("div",{staticClass:"idcard"},[i("upload",{attrs:{title:"身份证"},model:{value:t.form.idcardPicture,callback:function(e){t.$set(t.form,"idcardPicture",e)},expression:"form.idcardPicture"}})],1),t._v(" "),i("div",{staticClass:"drviercard"},[i("upload",{attrs:{title:"驾驶证"},model:{value:t.form.drivingPicture,callback:function(e){t.$set(t.form,"drivingPicture",e)},expression:"form.drivingPicture"}})],1),t._v(" "),i("div",{staticClass:"certcard"},[i("upload",{attrs:{title:"从业资格证"},model:{value:t.form.certification,callback:function(e){t.$set(t.form,"certification",e)},expression:"form.certification"}})],1)])],1)],1),t._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t.isModify?t._e():i("el-button",{attrs:{type:"primary"},on:{click:function(e){t.submitForm("ruleForm",!0)}}},[t._v("保存并新增")]),t._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:function(e){t.submitForm("ruleForm")}}},[t._v("保 存")]),t._v(" "),i("el-button",{on:{click:t.closeMe}},[t._v("取 消")])],1)],2)},staticRenderFns:[]};t.a=r},EPeO:function(e,t,i){"use strict";var r=i("//Fk"),n=i.n(r),a=i("mvHQ"),o=i.n(a),s=(i("UDRQ"),i("t5DY")),l=i("0xDb"),c=i("71e1"),d=i.n(c),u=i("Vo7i");t.a={name:"singleImageUpload",props:{value:[String,Array],title:{type:String,default:""},tip:{type:String,default:"（jpg/png。小于5M）"},size:{type:String,default:"mini"},showFileList:{type:Boolean,default:!1},limit:{type:Number,default:1},listtype:{type:String,default:"picture",enum:["text","picture","picture-card"]},disabled:{type:Boolean,default:!1},twocode:{type:Boolean,default:!1}},computed:{imageUrl:function(){return this.value}},data:function(){return{tempUrl:"",dataObj:{token:"",key:""},upload:{key:"",policy:"",OSSAccessKeyId:"",success_action_status:"201",signature:""},uploadUrl:"",dir:"",filelist:[],showtc:!1,showtwocdetip:!0,twocodeurl:""}},watch:{showtc:function(){this.showtc?this.changeTwocode():clearInterval(this.uptimer)},value:{handler:function(e){if(this.showFileList){var t=Array.isArray(e)?e:e?e.split(","):[];t=t.filter(function(e){return e}),this.filelist=[],this.filelist=t.map(function(e){var t={};return t.url=e,t})}else this.filelist=e?[{url:e}]:[]},immediate:!0}},mounted:function(){},updated:function(){console.log("single image updated~~~")},beforeDestroy:function(){console.log("beforeDestroy"),clearInterval(this.uptimer)},methods:{init:function(){var t=this;return Object(s.m)().then(function(e){t.upload.OSSAccessKeyId=e.accessid,t.upload.policy=e.policy,t.upload.signature=e.signature,t.uploadUrl=e.host,t.dir=e.dir}).catch(function(){})},rmImage:function(t){this.filelist=this.filelist.filter(function(e){return e.url!==t}),this.emitInput(""),this.showtc=!1},onexceed:function(e,t){this.$message.error("最多上传 "+this.limit+" 张!")},handleRemove:function(e,t){console.log("handleRemove:",e,t),this.filelist=t,this.emitInput()},random_string:function(e){e=e||32;for(var t="ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",i=t.length,r="",a=0;a<e;a++)r+=t.charAt(Math.floor(Math.random()*i));return r},emitInput:function(e){e&&this.filelist.push({url:e}),this.$emit("input",this.showFileList?this.filelist.map(function(e){return e.url}).join(","):e)},handleImageScucess:function(e){var t="";-1!==e.indexOf("Location")&&(t=(t=e.match(/<Location>([^<]+)<\/Location>/m))?t[1]:""),this.emitInput(t)},handleError:function(e){this.$message.error("上传错误："+o()(e)),this.$emit("error",e)},handleUpload:function(o){var s=this;return new n.a(function(r,a){var e=o.file.name,t=(e=e||Math.random()+".jpg").match(/([^\.]+)$/);t=t?"."+t[1]:"";var i=function(e){var t=new FormData,i=s.uploadUrl;t.append("key",s.upload.key),t.append("success_action_status","201"),t.append("OSSAccessKeyId",s.upload.OSSAccessKeyId),t.append("policy",s.upload.policy),t.append("signature",s.upload.signature),t.append("file",e),u.b.post(i,t,{headers:{"Content-Type":"multipart/form-data"}}).then(function(e){r(e)}).catch(function(e){a(e),s._handlerCatchMsg(e,"上传失败:")})};/\.jpe?g/.test(t)?lrz(o.file,{width:1024}).then(function(e){i(e.file)}).catch(function(e){a(e),s._handlerCatchMsg(e,"上传失败：")}):i(o.file)})},beforeUpload:function(e){var i=this,r=/image\/\w+/.test(e.type)&&/(jpe?g|png)/i.test(e.type),a=e.size/1024/1024<5,o=e.name.match(/([^\.]+)$/);return o=o?"."+o[1]:"",new n.a(function(t,e){r?a?i.init().then(function(e){i.upload.key=i.dir+Object(l.parseTime)(new Date,"{y}{m}{d}")+"/"+i.random_string()+o,t(!0)}).catch(function(e){i._handlerCatchMsg(e),t(!1)}):(i.$message.error("上传头像图片大小不能超过 5MB!"),e(!1)):(i.$message.error("上传头像图片只能是 JPG/PNG 格式!"),e(!1))})},changeTwocode:function(){var i=this;clearInterval(this.uptimer),Object(s.k)().then(function(e){i.upid=e.data,i.startFetchData();var t="http://"+location.host+"/static/upload.html?len=1&access_token="+i.access_token+"&id="+e.data+"&url="+(window.tms_testapiurl||"");console.log("url:",t),d.a.toDataURL(t,{rendererOpts:{margin:0}}).then(function(e){i.twocodeurl=e})}).catch(function(e){i.$message.error("生成二维码出错了~")})},startFetchData:function(){var i=this;clearInterval(this.uptimer);var e=0;this.uptimer=setInterval(function(){if(57e4<(e+=5e3))return i.$message.info("二维码过期了，已重新生成~"),i.changeTwocode(),!1;Object(s.l)(i.upid).then(function(e){var t=e.data;t&&t.id===i.upid&&t.url&&(clearInterval(i.uptimer),i.showtc=!1,i.emitInput(decodeURIComponent(t.url)))}).catch(function(e){i.$message.info("二维码过期了，请重新扫描上传~")})},5e3)}}}},FKPH:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=i("9l6W"),a=i("AfEI");var o=function(e){i("grrk")},s=i("VU/8")(r.a,a.a,o,null,null);t.default=s.exports},QbVN:function(e,t,i){"use strict";var r=i("EPeO"),a=i("jxZV");var o=function(e){i("0Q33"),i("xU5l")},s=i("VU/8")(r.a,a.a,o,"data-v-de7091b2",null);t.a=s.exports},grrk:function(e,t){},jxZV:function(e,t,i){"use strict";var r={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"upload-container",class:{uploadlist:t.showFileList}},[i("el-upload",{staticClass:"image-uploader",attrs:{data:t.upload,action:t.uploadUrl,multiple:!1,drag:!t.showFileList,"show-file-list":t.showFileList,"file-list":t.filelist,limit:t.limit,"before-upload":t.beforeUpload,"list-type":t.listtype,"on-exceed":t.onexceed,disabled:t.disabled,"on-remove":t.handleRemove,"on-error":t.handleError,"http-request":t.handleUpload,"on-success":t.handleImageScucess}},[t._t("content",[t.showtc?i("div",{staticClass:"twocodebox",on:{click:function(e){e.stopPropagation(),e.preventDefault()},mouseover:function(e){t.showtwocdetip=!0},mouseout:function(e){t.showtwocdetip=!1}}},[i("div",[i("img",{attrs:{src:t.twocodeurl,alt:""}})]),t._v(" "),i("el-button",{attrs:{size:t.size,type:"primary"},on:{click:function(e){t.showtc=!1}}},[t._v("本地上传")]),t._v(" "),i("el-button",{attrs:{size:t.size,type:"primary"},on:{click:t.changeTwocode}},[t._v("更换二维码")])],1):i("div",[t.title&&!t.showFileList?i("div",{staticClass:"upload__title"},[t._v(t._s(t.title))]):t._e(),t._v(" "),i("el-button",{attrs:{size:t.size,type:"primary"}},[t._v("点击上传")]),t._v(" "),t.twocode?i("el-button",{staticClass:"uploadtwocode",attrs:{size:t.size,type:"primary"},on:{click:function(e){e.stopPropagation(),e.preventDefault(),t.showtc=!0}}},[t._v("二维码上传")]):t._e(),t._v(" "),t.showFileList?t._e():i("div",{staticClass:"el-upload__text"},[t._v("将文件拖拽到此区域")]),t._v(" "),t.tip?i("div",{staticClass:"upload__tip"},[t._v(t._s(t.tip))]):t._e()],1)])],2),t._v(" "),t.imageUrl&&!t.showFileList?i("div",{staticClass:"image-preview"},[i("div",{staticClass:"image-preview-wrapper"},[i("img",{attrs:{src:t.imageUrl}}),t._v(" "),i("div",{staticClass:"image-preview-action"},[i("i",{staticClass:"el-icon-delete",on:{click:function(e){t.rmImage(t.imageUrl)}}})])])]):t._e()],1)},staticRenderFns:[]};t.a=r},xU5l:function(e,t){}});