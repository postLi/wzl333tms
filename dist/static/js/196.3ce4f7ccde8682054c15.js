webpackJsonp([196],{"/02+":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i("TA9/"),o=i("sPyv");var n=function(t){i("JnVP")},s=i("VU/8")(a.a,o.a,n,null,null);e.default=s.exports},"0Q33":function(t,e){},"71e1":function(t,e,i){t.exports=i("+dzQ")(43)},EPeO:function(t,e,i){"use strict";var a=i("//Fk"),l=i.n(a),o=i("mvHQ"),n=i.n(o),s=(i("UDRQ"),i("t5DY")),c=i("0xDb"),r=i("71e1"),u=i.n(r),f=i("Vo7i");e.a={name:"singleImageUpload",props:{value:[String,Array],title:{type:String,default:""},tip:{type:String,default:"（jpg/png。小于5M）"},size:{type:String,default:"mini"},showFileList:{type:Boolean,default:!1},limit:{type:Number,default:1},listtype:{type:String,default:"picture",enum:["text","picture","picture-card"]},disabled:{type:Boolean,default:!1},twocode:{type:Boolean,default:!1}},computed:{imageUrl:function(){return this.value}},data:function(){return{tempUrl:"",dataObj:{token:"",key:""},upload:{key:"",policy:"",OSSAccessKeyId:"",success_action_status:"201",signature:""},uploadUrl:"",dir:"",filelist:[],showtc:!1,showtwocdetip:!0,twocodeurl:""}},watch:{showtc:function(){this.showtc?this.changeTwocode():clearInterval(this.uptimer)},value:{handler:function(t){if(this.showFileList){var e=Array.isArray(t)?t:t?t.split(","):[];e=e.filter(function(t){return t}),this.filelist=[],this.filelist=e.map(function(t){var e={};return e.url=t,e})}else this.filelist=t?[{url:t}]:[]},immediate:!0}},mounted:function(){},updated:function(){console.log("single image updated~~~")},beforeDestroy:function(){console.log("beforeDestroy"),clearInterval(this.uptimer)},methods:{init:function(){var e=this;return Object(s.m)().then(function(t){e.upload.OSSAccessKeyId=t.accessid,e.upload.policy=t.policy,e.upload.signature=t.signature,e.uploadUrl=t.host,e.dir=t.dir}).catch(function(){})},rmImage:function(e){this.filelist=this.filelist.filter(function(t){return t.url!==e}),this.emitInput(""),this.showtc=!1},onexceed:function(t,e){this.$message.error("最多上传 "+this.limit+" 张!")},handleRemove:function(t,e){console.log("handleRemove:",t,e),this.filelist=e,this.emitInput()},random_string:function(t){t=t||32;for(var e="ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",i=e.length,a="",o=0;o<t;o++)a+=e.charAt(Math.floor(Math.random()*i));return a},emitInput:function(t){t&&this.filelist.push({url:t}),this.$emit("input",this.showFileList?this.filelist.map(function(t){return t.url}).join(","):t)},handleImageScucess:function(t){var e="";-1!==t.indexOf("Location")&&(e=(e=t.match(/<Location>([^<]+)<\/Location>/m))?e[1]:""),this.emitInput(e)},handleError:function(t){this.$message.error("上传错误："+n()(t)),this.$emit("error",t)},handleUpload:function(n){var s=this;return new l.a(function(a,o){var t=n.file.name,e=(t=t||Math.random()+".jpg").match(/([^\.]+)$/);e=e?"."+e[1]:"";var i=function(t){var e=new FormData,i=s.uploadUrl;e.append("key",s.upload.key),e.append("success_action_status","201"),e.append("OSSAccessKeyId",s.upload.OSSAccessKeyId),e.append("policy",s.upload.policy),e.append("signature",s.upload.signature),e.append("file",t),f.b.post(i,e,{headers:{"Content-Type":"multipart/form-data"}}).then(function(t){a(t)}).catch(function(t){o(t),s._handlerCatchMsg(t,"上传失败:")})};/\.jpe?g/.test(e)?lrz(n.file,{width:1024}).then(function(t){i(t.file)}).catch(function(t){o(t),s._handlerCatchMsg(t,"上传失败：")}):i(n.file)})},beforeUpload:function(t){var i=this,a=/image\/\w+/.test(t.type)&&/(jpe?g|png)/i.test(t.type),o=t.size/1024/1024<5,n=t.name.match(/([^\.]+)$/);return n=n?"."+n[1]:"",new l.a(function(e,t){a?o?i.init().then(function(t){i.upload.key=i.dir+Object(c.parseTime)(new Date,"{y}{m}{d}")+"/"+i.random_string()+n,e(!0)}).catch(function(t){i._handlerCatchMsg(t),e(!1)}):(i.$message.error("上传头像图片大小不能超过 5MB!"),t(!1)):(i.$message.error("上传头像图片只能是 JPG/PNG 格式!"),t(!1))})},changeTwocode:function(){var i=this;clearInterval(this.uptimer),Object(s.k)().then(function(t){i.upid=t.data,i.startFetchData();var e="http://"+location.host+"/static/upload.html?len=1&access_token="+i.access_token+"&id="+t.data+"&url="+(window.tms_testapiurl||"");console.log("url:",e),u.a.toDataURL(e,{rendererOpts:{margin:0}}).then(function(t){i.twocodeurl=t})}).catch(function(t){i.$message.error("生成二维码出错了~")})},startFetchData:function(){var i=this;clearInterval(this.uptimer);var t=0;this.uptimer=setInterval(function(){if(57e4<(t+=5e3))return i.$message.info("二维码过期了，已重新生成~"),i.changeTwocode(),!1;Object(s.l)(i.upid).then(function(t){var e=t.data;e&&e.id===i.upid&&e.url&&(clearInterval(i.uptimer),i.showtc=!1,i.emitInput(decodeURIComponent(e.url)))}).catch(function(t){i.$message.info("二维码过期了，请重新扫描上传~")})},5e3)}}}},JnVP:function(t,e){},QbVN:function(t,e,i){"use strict";var a=i("EPeO"),o=i("jxZV");var n=function(t){i("0Q33"),i("xU5l")},s=i("VU/8")(a.a,o.a,n,"data-v-de7091b2",null);e.a=s.exports},"TA9/":function(t,e,i){"use strict";var a=i("Dd8w"),o=i.n(a),n=i("E4LH"),s=i("xAap"),l=i("P5Di"),c=i("QbVN"),r=i("o9X6"),u=i("9UCZ"),f=i("66wn"),d=i("pAQG"),m=i("NYxO");e.a={components:{popRight:l.a,Upload:c.a,querySelect:d.a,SelectType:u.a,SelectTree:r.a,SelectCity:f.a},props:{popVisible:{type:Boolean,default:!1},orgid:{required:!0},isModify:{type:Boolean,default:!1},isDbclick:{type:Boolean,default:!1},info:{type:Object,default:function(){}},issender:{type:Boolean,dafault:!1}},computed:o()({},Object(m.mapGetters)(["otherinfo"])),data:function(){return{rules:{financialWayId:[{required:!0,validator:this.validateIsEmpty("收支方式不能为空"),trigger:"blur"}],bankName:[{max:20,message:"最多可以输入20个字符~",trigger:"blur"},{pattern:n.a.ONLY_CHINESE,trigger:"blur",message:"只能输入中文"}],bankAccount:[]},form:{orgId:"",financialWay:"",financialWayId:"",bankName:"",bankAccount:"",bankAccountName:"",alipayAccount:"",wechatAccount:"",remark:"",agent:""},checked:!0,formLabelWidth:"80px",popTitle:"新增收支方式",loading:!1,inited:!1,bankPay:!1,aliPay:!1,wPay:!1,casyPay:!1,chePay:!1}},mounted:function(){this.inited||(this.inited=!0,this.initInfo())},watch:{popVisible:function(t,e){this.inited||(this.inited=!0,this.initInfo())},orgid:function(t){this.form.orgId=t},info:function(){this.isModify?(this.popTitle="修改收支方式",this.changeInfo(this.info)):this.isDbclick?(this.popTitle="查看收支方式",this.changeInfo(this.info)):(this.popTitle="新增收支方式",this.newInfo(this.otherinfo))},isModify:{handler:function(){this.isModify?(this.popTitle="修改收支方式",this.changeInfo(this.info)):this.isDbclick?(this.popTitle="查看收支方式",this.changeInfo(this.info)):(this.popTitle="新增收支方式",this.newInfo(this.otherinfo))},immediate:!0}},methods:{changeInfo:function(t){this.form.orgId=t.orgId,this.form.financialWay=t.financialWay,this.form.financialWayId=t.financialWayId,this.form.remark=t.remark,this.form.bankAccount=t.bankAccount,this.form.bankAccountName=t.bankAccountName,this.form.alipayAccount=t.alipayAccount,this.form.wechatAccount=t.wechatAccount,this.form.bankName=t.bankName,this.financialWayClick(this.form.financialWayId)},newInfo:function(t){this.form.orgId=t.orgid,this.form.remark="",this.form.bankAccount="",this.form.bankAccountName="",this.form.alipayAccount="",this.form.wechatAccount="",this.form.financialWayId=280,this.form.financialWay="",this.form.bankName="",this.financialWayClick(this.form.financialWayId)},validateIsEmpty:function(){var a=0<arguments.length&&void 0!==arguments[0]?arguments[0]:"不能为空！";return function(t,e,i){e?i():i(new Error(a))}},getData:function(t){},financialWayClick:function(t){this.bankPay=!1,this.aliPay=!1,this.wPay=!1,this.casyPay=!1,this.chePay=!1,280===t||"银行卡"===t?(this.bankPay=!0,this.form.financialWay="银行卡"):281===t||"支付宝"===t?(this.aliPay=!0,this.form.financialWay="支付宝"):282===t||"微信"===t?(this.wPay=!0,this.form.financialWay="微信"):283===t||"现金"===t?(this.casyPay=!0,this.form.financialWay="现金"):(this.chePay=!0,this.form.financialWay="支票")},initInfo:function(){this.loading=!1},submit:function(){console.log("保存并打印")},submitForm:function(t){var a=this;this.$refs[t].validate(function(t){if(!t)return!1;a.loading=!0;var e={};e=a.form;var i=void 0;a.isModify?(e.id=a.info.id,i=Object(s.e)(e)):i=Object(s.a)(e),i.then(function(t){a.loading=!1,a.$message.success("保存成功"),a.$emit("success"),a.closeMe()}).catch(function(t){a._handlerCatchMsg(t),a.loading=!1})})},reset:function(){this.form.orgId=this.otherinfo.orgid},closeMe:function(t){this.reset(),this.$emit("update:popVisible",!1),"function"==typeof t&&t()}}}},jxZV:function(t,e,i){"use strict";var a={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"upload-container",class:{uploadlist:e.showFileList}},[i("el-upload",{staticClass:"image-uploader",attrs:{data:e.upload,action:e.uploadUrl,multiple:!1,drag:!e.showFileList,"show-file-list":e.showFileList,"file-list":e.filelist,limit:e.limit,"before-upload":e.beforeUpload,"list-type":e.listtype,"on-exceed":e.onexceed,disabled:e.disabled,"on-remove":e.handleRemove,"on-error":e.handleError,"http-request":e.handleUpload,"on-success":e.handleImageScucess}},[e._t("content",[e.showtc?i("div",{staticClass:"twocodebox",on:{click:function(t){t.stopPropagation(),t.preventDefault()},mouseover:function(t){e.showtwocdetip=!0},mouseout:function(t){e.showtwocdetip=!1}}},[i("div",[i("img",{attrs:{src:e.twocodeurl,alt:""}})]),e._v(" "),i("el-button",{attrs:{size:e.size,type:"primary"},on:{click:function(t){e.showtc=!1}}},[e._v("本地上传")]),e._v(" "),i("el-button",{attrs:{size:e.size,type:"primary"},on:{click:e.changeTwocode}},[e._v("更换二维码")])],1):i("div",[e.title&&!e.showFileList?i("div",{staticClass:"upload__title"},[e._v(e._s(e.title))]):e._e(),e._v(" "),i("el-button",{attrs:{size:e.size,type:"primary"}},[e._v("点击上传")]),e._v(" "),e.twocode?i("el-button",{staticClass:"uploadtwocode",attrs:{size:e.size,type:"primary"},on:{click:function(t){t.stopPropagation(),t.preventDefault(),e.showtc=!0}}},[e._v("二维码上传")]):e._e(),e._v(" "),e.showFileList?e._e():i("div",{staticClass:"el-upload__text"},[e._v("将文件拖拽到此区域")]),e._v(" "),e.tip?i("div",{staticClass:"upload__tip"},[e._v(e._s(e.tip))]):e._e()],1)])],2),e._v(" "),e.imageUrl&&!e.showFileList?i("div",{staticClass:"image-preview"},[i("div",{staticClass:"image-preview-wrapper"},[i("img",{attrs:{src:e.imageUrl}}),e._v(" "),i("div",{staticClass:"image-preview-action"},[i("i",{staticClass:"el-icon-delete",on:{click:function(t){e.rmImage(e.imageUrl)}}})])])]):e._e()],1)},staticRenderFns:[]};e.a=a},sPyv:function(t,e,i){"use strict";var a={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("pop-right",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticClass:"addIOManagePop",attrs:{title:e.popTitle,isShow:e.popVisible},on:{close:e.closeMe}},[i("template",{staticClass:"addIOManagePop-content",slot:"content"},[i("el-form",{ref:"ruleForm",staticClass:"pickup_lrl",attrs:{model:e.form,rules:e.rules,"label-width":e.formLabelWidth,inline:!0,"label-position":"right",size:"mini"}},[i("div",{staticClass:"iommanage-bottom"},[i("el-form-item",{attrs:{label:"所属网点"}},[i("SelectTree",{attrs:{disabled:e.isDbclick,orgid:e.otherinfo.orgid},model:{value:e.form.orgId,callback:function(t){e.$set(e.form,"orgId",t)},expression:"form.orgId"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"收支方式",prop:"financialWayId"}},[i("SelectType",{attrs:{type:"financial_way_type",placeholder:"请选择",disabled:e.isDbclick?e.isDbclick:e.isModify},on:{change:e.financialWayClick,mounted:e.getData},model:{value:e.form.financialWayId,callback:function(t){e.$set(e.form,"financialWayId",t)},expression:"form.financialWayId"}})],1),e._v(" "),!0===e.bankPay?i("div",[i("el-form-item",{attrs:{label:"银行名称",prop:"bankName"}},[i("el-input",{attrs:{"auto-complete":"off",disabled:e.isDbclick},model:{value:e.form.bankName,callback:function(t){e.$set(e.form,"bankName",t)},expression:"form.bankName"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"银行卡号",prop:"bankAccount"}},[i("el-input",{directives:[{name:"numberOnly",rawName:"v-numberOnly"}],attrs:{"auto-complete":"off",disabled:e.isDbclick},model:{value:e.form.bankAccount,callback:function(t){e.$set(e.form,"bankAccount",t)},expression:"form.bankAccount"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"开户人"}},[i("el-input",{attrs:{"auto-complete":"off",disabled:e.isDbclick},model:{value:e.form.bankAccountName,callback:function(t){e.$set(e.form,"bankAccountName",t)},expression:"form.bankAccountName"}})],1)],1):e._e(),e._v(" "),!0===e.aliPay?i("div",[i("el-form-item",{attrs:{label:"支付宝号"}},[i("el-input",{attrs:{"auto-complete":"off",disabled:e.isDbclick},model:{value:e.form.alipayAccount,callback:function(t){e.$set(e.form,"alipayAccount",t)},expression:"form.alipayAccount"}})],1)],1):e._e(),e._v(" "),!0===e.wPay?i("div",[i("el-form-item",{attrs:{label:"微信号"}},[i("el-input",{attrs:{"auto-complete":"off",disabled:e.isDbclick},model:{value:e.form.wechatAccount,callback:function(t){e.$set(e.form,"wechatAccount",t)},expression:"form.wechatAccount"}})],1)],1):e._e(),e._v(" "),!0===e.casyPay?i("div",[i("el-form-item",{attrs:{label:"经手人"}},[i("el-input",{attrs:{"auto-complete":"off",disabled:e.isDbclick},model:{value:e.form.agent,callback:function(t){e.$set(e.form,"agent",t)},expression:"form.agent"}})],1)],1):e._e(),e._v(" "),i("el-form-item",{staticClass:"iom_textarea",attrs:{label:"备注"}},[i("el-input",{attrs:{maxlength:200,"auto-complete":"off",disabled:e.isDbclick,type:"textarea"},model:{value:e.form.remark,callback:function(t){e.$set(e.form,"remark",t)},expression:"form.remark"}})],1)],1)])],1),e._v(" "),e.isDbclick?i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:e.closeMe}},[e._v("关 闭")])],1):i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{type:"primary"},on:{click:function(t){e.submitForm("ruleForm")}}},[e._v("保 存")]),e._v(" "),i("el-button",{on:{click:e.closeMe}},[e._v("取 消")])],1)],2)},staticRenderFns:[]};e.a=a},xU5l:function(t,e){}});