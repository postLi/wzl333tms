webpackJsonp([203],{"0Q33":function(e,t){},"71e1":function(e,t,i){e.exports=i("+dzQ")(43)},"8Hxk":function(e,t){},EPeO:function(e,t,i){"use strict";var r=i("//Fk"),s=i.n(r),o=i("mvHQ"),a=i.n(o),n=(i("UDRQ"),i("t5DY")),l=i("0xDb"),c=i("71e1"),u=i.n(c),m=i("Vo7i");t.a={name:"singleImageUpload",props:{value:[String,Array],title:{type:String,default:""},tip:{type:String,default:"（jpg/png。小于5M）"},size:{type:String,default:"mini"},showFileList:{type:Boolean,default:!1},limit:{type:Number,default:1},listtype:{type:String,default:"picture",enum:["text","picture","picture-card"]},disabled:{type:Boolean,default:!1},twocode:{type:Boolean,default:!1}},computed:{imageUrl:function(){return this.value}},data:function(){return{tempUrl:"",dataObj:{token:"",key:""},upload:{key:"",policy:"",OSSAccessKeyId:"",success_action_status:"201",signature:""},uploadUrl:"",dir:"",filelist:[],showtc:!1,showtwocdetip:!0,twocodeurl:""}},watch:{showtc:function(){this.showtc?this.changeTwocode():clearInterval(this.uptimer)},value:{handler:function(e){if(this.showFileList){var t=Array.isArray(e)?e:e?e.split(","):[];t=t.filter(function(e){return e}),this.filelist=[],this.filelist=t.map(function(e){var t={};return t.url=e,t})}else this.filelist=e?[{url:e}]:[]},immediate:!0}},mounted:function(){},updated:function(){console.log("single image updated~~~")},beforeDestroy:function(){console.log("beforeDestroy"),clearInterval(this.uptimer)},methods:{init:function(){var t=this;return Object(n.m)().then(function(e){t.upload.OSSAccessKeyId=e.accessid,t.upload.policy=e.policy,t.upload.signature=e.signature,t.uploadUrl=e.host,t.dir=e.dir}).catch(function(){})},rmImage:function(t){this.filelist=this.filelist.filter(function(e){return e.url!==t}),this.emitInput(""),this.showtc=!1},onexceed:function(e,t){this.$message.error("最多上传 "+this.limit+" 张!")},handleRemove:function(e,t){console.log("handleRemove:",e,t),this.filelist=t,this.emitInput()},random_string:function(e){e=e||32;for(var t="ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",i=t.length,r="",o=0;o<e;o++)r+=t.charAt(Math.floor(Math.random()*i));return r},emitInput:function(e){e&&this.filelist.push({url:e}),this.$emit("input",this.showFileList?this.filelist.map(function(e){return e.url}).join(","):e)},handleImageScucess:function(e){var t="";-1!==e.indexOf("Location")&&(t=(t=e.match(/<Location>([^<]+)<\/Location>/m))?t[1]:""),this.emitInput(t)},handleError:function(e){this.$message.error("上传错误："+a()(e)),this.$emit("error",e)},handleUpload:function(a){var n=this;return new s.a(function(r,o){var e=a.file.name,t=(e=e||Math.random()+".jpg").match(/([^\.]+)$/);t=t?"."+t[1]:"";var i=function(e){var t=new FormData,i=n.uploadUrl;t.append("key",n.upload.key),t.append("success_action_status","201"),t.append("OSSAccessKeyId",n.upload.OSSAccessKeyId),t.append("policy",n.upload.policy),t.append("signature",n.upload.signature),t.append("file",e),m.b.post(i,t,{headers:{"Content-Type":"multipart/form-data"}}).then(function(e){r(e)}).catch(function(e){o(e),n._handlerCatchMsg(e,"上传失败:")})};/\.jpe?g/.test(t)?lrz(a.file,{width:1024}).then(function(e){i(e.file)}).catch(function(e){o(e),n._handlerCatchMsg(e,"上传失败：")}):i(a.file)})},beforeUpload:function(e){var i=this,r=/image\/\w+/.test(e.type)&&/(jpe?g|png)/i.test(e.type),o=e.size/1024/1024<5,a=e.name.match(/([^\.]+)$/);return a=a?"."+a[1]:"",new s.a(function(t,e){r?o?i.init().then(function(e){i.upload.key=i.dir+Object(l.parseTime)(new Date,"{y}{m}{d}")+"/"+i.random_string()+a,t(!0)}).catch(function(e){i._handlerCatchMsg(e),t(!1)}):(i.$message.error("上传头像图片大小不能超过 5MB!"),e(!1)):(i.$message.error("上传头像图片只能是 JPG/PNG 格式!"),e(!1))})},changeTwocode:function(){var i=this;clearInterval(this.uptimer),Object(n.k)().then(function(e){i.upid=e.data,i.startFetchData();var t="http://"+location.host+"/static/upload.html?len=1&access_token="+i.access_token+"&id="+e.data+"&url="+(window.tms_testapiurl||"");console.log("url:",t),u.a.toDataURL(t,{rendererOpts:{margin:0}}).then(function(e){i.twocodeurl=e})}).catch(function(e){i.$message.error("生成二维码出错了~")})},startFetchData:function(){var i=this;clearInterval(this.uptimer);var e=0;this.uptimer=setInterval(function(){if(57e4<(e+=5e3))return i.$message.info("二维码过期了，已重新生成~"),i.changeTwocode(),!1;Object(n.l)(i.upid).then(function(e){var t=e.data;t&&t.id===i.upid&&t.url&&(clearInterval(i.uptimer),i.showtc=!1,i.emitInput(decodeURIComponent(t.url)))}).catch(function(e){i.$message.info("二维码过期了，请重新扫描上传~")})},5e3)}}}},QbVN:function(e,t,i){"use strict";var r=i("EPeO"),o=i("jxZV");var a=function(e){i("0Q33"),i("xU5l")},n=i("VU/8")(r.a,o.a,a,"data-v-de7091b2",null);t.a=n.exports},bZax:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=i("frTf"),o=i("ubb7");var a=function(e){i("8Hxk")},n=i("VU/8")(r.a,o.a,a,null,null);t.default=n.exports},frTf:function(e,t,i){"use strict";var r=i("woOf"),o=i.n(r),a=i("Dd8w"),n=i.n(a),s=i("E4LH"),l=i("4UdH"),c=i("P5Di"),u=i("QbVN"),m=i("o9X6"),d=i("NYxO");t.a={components:{popRight:c.a,Upload:u.a,SelectTree:m.a},props:{popVisible:{type:Boolean,default:!1},orgid:{required:!0},isModify:{type:Boolean,default:!1},info:{type:Object,default:function(){}},issender:{type:Boolean,dafault:!1}},computed:n()({},Object(d.mapGetters)(["otherinfo"])),data:function(){var t=this;return{form:{carrierAddr:"",carrierMobile:"",carrierName:"",carrierRemarks:"",carrierSn:"",contractEndtime:"",contractStarttime:"",customerServicePhone:"",liableName:"",liablePhone:"",orgid:0},formLabelWidth:"100px",tooltip:!1,rules:{carrierName:[{required:!0,message:"请输入承运商名称"}],orgid:[{required:!0,message:"请选择所属机构"}],carrierMobile:[{required:!0,trigger:"change",validator:function(e,t,i){""!==t&&null!==t&&t&&void 0!==t?s.a.MOBILE.test(t)?i():i(new Error("请输11位手机号码")):i(new Error("不能为空"))}}],liablePhone:[],carrierSn:[{message:"仅限字母或数字组合",pattern:s.a.ONLY_NUMBER_AND_LETTER}]},popTitle:"新增承运商",orgArr:[],rolesArr:[],departmentArr:[],loading:!1,roles:[],departments:[],groups:[],inited:!1,pickOption:{firstDayOfWeek:1,disabledDate:function(e){return!!t.form.contractEndtime&&e.getTime()>t.form.contractEndtime}},pickOption2:{firstDayOfWeek:1,disabledDate:function(e){return!!t.form.contractStarttime&&e.getTime()<t.form.contractStarttime}}}},mounted:function(){this.form.orgid=this.orgid,this.inited||(this.inited=!0,this.initInfo())},watch:{popVisible:function(e,t){this.inited||(this.inited=!0,this.initInfo()),e&&!this.isModify&&this.getCarrierSn()},orgid:function(e){this.form.orgid=e},info:function(){if(this.isModify){this.popTitle="修改承运商";var e=o()({},this.info);for(var t in this.form)this.form[t]=e[t];this.form.carrierId=e.carrierId}else{for(var i in this.popTitle="新增承运商",this.getCarrierSn(),this.form)this.form[i]="";delete this.form.carrierId,this.form.orgid=this.orgid}}},methods:{getCarrierSn:function(){var t=this;return this.loading=!0,Object(l.c)().then(function(e){t.form.carrierSn=e.data,console.log(e.data),t.loading=!1}).catch(function(e){t._handlerCatchMsg(e)})},initInfo:function(){this.loading=!1},getOrgid:function(e){this.form.orgid=e},submitForm:function(e,i){var r=this;this.$refs[e].validate(function(e){if(!e)return!1;r.loading=!0;var t=o()({},r.form);t.fixPhone=r.fixPhone;(r.isModify?Object(l.e)(t):Object(l.d)(t)).then(function(e){r.loading=!1,r.$message.success("保存成功"),r.reset(),i?(r.form.orgid=r.orgid,r.getCarrierSn()):r.closeMe(),r.$emit("success")}).catch(function(e){r._handlerCatchMsg(e),r.loading=!1})})},reset:function(){var e=this.form.orgid;this.$refs.ruleForm.resetFields(),this.form.orgid=e},closeMe:function(e){this.reset(),this.$emit("update:popVisible",!1),"function"==typeof e&&e()}}}},jxZV:function(e,t,i){"use strict";var r={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"upload-container",class:{uploadlist:t.showFileList}},[i("el-upload",{staticClass:"image-uploader",attrs:{data:t.upload,action:t.uploadUrl,multiple:!1,drag:!t.showFileList,"show-file-list":t.showFileList,"file-list":t.filelist,limit:t.limit,"before-upload":t.beforeUpload,"list-type":t.listtype,"on-exceed":t.onexceed,disabled:t.disabled,"on-remove":t.handleRemove,"on-error":t.handleError,"http-request":t.handleUpload,"on-success":t.handleImageScucess}},[t._t("content",[t.showtc?i("div",{staticClass:"twocodebox",on:{click:function(e){e.stopPropagation(),e.preventDefault()},mouseover:function(e){t.showtwocdetip=!0},mouseout:function(e){t.showtwocdetip=!1}}},[i("div",[i("img",{attrs:{src:t.twocodeurl,alt:""}})]),t._v(" "),i("el-button",{attrs:{size:t.size,type:"primary"},on:{click:function(e){t.showtc=!1}}},[t._v("本地上传")]),t._v(" "),i("el-button",{attrs:{size:t.size,type:"primary"},on:{click:t.changeTwocode}},[t._v("更换二维码")])],1):i("div",[t.title&&!t.showFileList?i("div",{staticClass:"upload__title"},[t._v(t._s(t.title))]):t._e(),t._v(" "),i("el-button",{attrs:{size:t.size,type:"primary"}},[t._v("点击上传")]),t._v(" "),t.twocode?i("el-button",{staticClass:"uploadtwocode",attrs:{size:t.size,type:"primary"},on:{click:function(e){e.stopPropagation(),e.preventDefault(),t.showtc=!0}}},[t._v("二维码上传")]):t._e(),t._v(" "),t.showFileList?t._e():i("div",{staticClass:"el-upload__text"},[t._v("将文件拖拽到此区域")]),t._v(" "),t.tip?i("div",{staticClass:"upload__tip"},[t._v(t._s(t.tip))]):t._e()],1)])],2),t._v(" "),t.imageUrl&&!t.showFileList?i("div",{staticClass:"image-preview"},[i("div",{staticClass:"image-preview-wrapper"},[i("img",{attrs:{src:t.imageUrl}}),t._v(" "),i("div",{staticClass:"image-preview-action"},[i("i",{staticClass:"el-icon-delete",on:{click:function(e){t.rmImage(t.imageUrl)}}})])])]):t._e()],1)},staticRenderFns:[]};t.a=r},ubb7:function(e,t,i){"use strict";var r={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("pop-right",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"addCarrierPop",attrs:{title:t.popTitle,isShow:t.popVisible},on:{close:t.closeMe}},[i("template",{staticClass:"addCarrierPop-content",slot:"content"},[i("el-form",{ref:"ruleForm",attrs:{model:t.form,rules:t.rules,"label-width":t.formLabelWidth,inline:!0,"label-position":"right",size:"mini"}},[i("el-form-item",{attrs:{label:"归属网点",prop:"orgid"}},[i("SelectTree",{attrs:{orgid:t.otherinfo.orgid},model:{value:t.form.orgid,callback:function(e){t.$set(t.form,"orgid",e)},expression:"form.orgid"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"承运商编码",prop:"carrierSn"}},[i("el-input",{attrs:{maxlength:11,"auto-complete":"off"},model:{value:t.form.carrierSn,callback:function(e){t.$set(t.form,"carrierSn","string"==typeof e?e.trim():e)},expression:"form.carrierSn"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"承运商",prop:"carrierName"}},[i("el-input",{attrs:{maxlength:20,"auto-complete":"off"},model:{value:t.form.carrierName,callback:function(e){t.$set(t.form,"carrierName","string"==typeof e?e.trim():e)},expression:"form.carrierName"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"承运商电话",prop:"carrierMobile"}},[i("el-input",{attrs:{maxlength:11,"auto-complete":"off"},model:{value:t.form.carrierMobile,callback:function(e){t.$set(t.form,"carrierMobile",e)},expression:"form.carrierMobile"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"负责人",prop:"liableName"}},[i("el-input",{attrs:{maxlength:25,"auto-complete":"off"},model:{value:t.form.liableName,callback:function(e){t.$set(t.form,"liableName",e)},expression:"form.liableName"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"负责人手机",prop:"liablePhone"}},[i("el-input",{directives:[{name:"numberOnly",rawName:"v-numberOnly"}],attrs:{maxlength:11,"auto-complete":"off"},model:{value:t.form.liablePhone,callback:function(e){t.$set(t.form,"liablePhone",e)},expression:"form.liablePhone"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"合同起始日",prop:"contractStarttime"}},[i("el-date-picker",{attrs:{align:"right",type:"date",placeholder:"选择日期","value-format":"timestamp","picker-options":t.pickOption},model:{value:t.form.contractStarttime,callback:function(e){t.$set(t.form,"contractStarttime",e)},expression:"form.contractStarttime"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"合同终止日",prop:"contractEndtime"}},[i("el-date-picker",{attrs:{align:"right",type:"date","picker-options":t.pickOption2,placeholder:"选择日期","value-format":"timestamp"},model:{value:t.form.contractEndtime,callback:function(e){t.$set(t.form,"contractEndtime",e)},expression:"form.contractEndtime"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"客服电话",prop:"customerServicePhone"}},[i("el-input",{directives:[{name:"numberOnly",rawName:"v-numberOnly"}],attrs:{maxlength:11,"auto-complete":"off"},model:{value:t.form.customerServicePhone,callback:function(e){t.$set(t.form,"customerServicePhone",e)},expression:"form.customerServicePhone"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"地址",prop:"carrierAddr"}},[i("el-input",{attrs:{maxlength:50,"auto-complete":"off"},model:{value:t.form.carrierAddr,callback:function(e){t.$set(t.form,"carrierAddr","string"==typeof e?e.trim():e)},expression:"form.carrierAddr"}})],1),t._v(" "),i("el-form-item",{staticClass:"carrierRemarks",attrs:{label:"备注",prop:"carrierRemarks"}},[i("el-input",{attrs:{type:"textarea",maxlength:300},model:{value:t.form.carrierRemarks,callback:function(e){t.$set(t.form,"carrierRemarks",e)},expression:"form.carrierRemarks"}})],1)],1)],1),t._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t.isModify?t._e():i("el-button",{attrs:{type:"primary"},on:{click:function(e){t.submitForm("ruleForm",!0)}}},[t._v("保存并添加")]),t._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:function(e){t.submitForm("ruleForm")}}},[t._v("保 存")]),t._v(" "),i("el-button",{on:{click:t.closeMe}},[t._v("取 消")])],1)],2)},staticRenderFns:[]};t.a=r},xU5l:function(e,t){}});