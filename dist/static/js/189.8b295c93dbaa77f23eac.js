webpackJsonp([189],{"0Q33":function(e,t){},"6az1":function(e,t,r){"use strict";var o=r("Dd8w"),i=r.n(o),s=r("E4LH"),a=r("NoOq"),c=r("P5Di"),n=r("QbVN"),m=r("o9X6"),d=r("9UCZ"),l=r("pAQG"),u=r("hq98"),f=r("NYxO"),p=r("0xDb");t.a={components:{popRight:c.a,Upload:n.a,SelectTree:m.a,SelectType:d.a,querySelect:l.a,queryCity:u.a},props:{popVisible:{type:Boolean,default:!1},orgid:{required:!0},isModify:{type:Boolean,default:!1},isDbclick:{type:Boolean,default:!1},info:{type:Object,default:function(){}},issender:{type:Boolean,dafault:!1},networkFlog:{type:Boolean,default:!1}},computed:i()({},Object(f.mapGetters)(["otherinfo"])),data:function(){var o=this,i=!1,e=function(e,t,r){""===o.form.tmsOrderCargoList.cargoVolume&&""===o.form.tmsOrderCargoList.cargoWeight&&(i=!1),t||i?(i=!0,r()):r(new Error("体积或重量必填其中一项"))};return{ke1yVal:"",rules:{"tmsOrderPre.orderToCityName":[{required:!0,validator:this.validateIsEmpty("到站不能为空")}],"customSend.customerName":[{required:!0,validator:function(e,t,r){if(!t)return r(new Error("发货人不能为空"));r()}}],"customSend.customerMobile":[{required:!0,validator:this.validateIsEmpty("发货人联系电话不能为空")}],"customRece.customerName":[{required:!0,validator:this.validateIsEmpty("收货人不能为空")}],"customRece.customerMobile":[{required:!0,validator:this.validateIsEmpty("收货人联系电话不能为空")}],"tmsOrderCargoList.cargoName":[{validator:this.validateIsEmpty("货品名不能为空")}],"tmsOrderCargoList.cargoAmount":[{validator:this.validateIsEmpty("件数不能为空")},{validator:function(e,t,r){s.a.ONLY_NUMBER.test(t)?r():r(new Error("只能输入数字"))}}],"tmsOrderCargoList.cargoVolume":[{validator:e},{message:"只能输入数字",pattern:s.a.Number_point}],"tmsOrderCargoList.cargoWeight":[{validator:e},{message:"只能输入数字",pattern:s.a.Number_point}],"tmsOrderCargoList.description":[{validator:function(e,t,r){s.a.ONLY_NUMBER_AND_LETTER.test(t)?r():""==t?r():r(new Error("只能输入数字或者字母"))}}],"tmsOrderCargoList.agencyFund":[{message:"只能输入数字",pattern:s.a.Number_point}],"tmsOrderCargoList.commissionFee":[{message:"只能输入数字",pattern:s.a.Number_point}],"tmsOrderCargoList.shipFee":[{message:"只能输入数字",pattern:s.a.Number_point}],"tmsOrderCargoList.productPrice":[{message:"只能输入数字",pattern:s.a.Number_point}]},btnsize:"mini",carObj:{cargoName:"",cargoAmount:"",cargoWeight:"",cargoVolume:"",cargoPack:""},form:{customSend:{customerId:"",customerUnit:"",customerName:"",customerMobile:"",detailedAddress:"",customerType:1},customRece:{customerId:"",customerUnit:"",customerName:"",customerMobile:"",detailedAddress:"",customerType:2},customerList:[{},{}],tmsOrderCargoList:[{cargoName:"",cargoAmount:"",cargoWeight:"",cargoVolume:"",cargoPack:"",description:"",commissionFee:"",agencyFund:"",productPrice:"",shipFee:"",id:""}],tmsOrderPre:{orderFromCityCode:"",orderFromCityName:"",orderToCityCode:"",orderToCityName:"",orderFromOrgid:"",orderToOrgid:"",orderPickupMethod:218,orderEffective:94,orderPayWay:76,orderRemarks:"",id:""}},customSend:{customerUnit:"",customerName:"",customerMobile:"",detailedAddress:"",customerType:1},customRece:{customerUnit:"",customerName:"",customerMobile:"",detailedAddress:"",customerType:2},popTitle:"新增订单",orderSn:"",loading:!0,inited:!1,checkShowMessage:!1,isChecked:!1,isCheckedShow:!1}},mounted:function(){this.inited||(this.inited=!0,this.initInfo())},watch:{popVisible:function(e,t){this.inited||(this.inited=!0,this.initInfo(),this.$refs.ruleForm.resetFields())},orgid:function(e){},info:function(){this.s_init()},isModify:function(){this.s_init()},isDbclick:function(){this.s_init()}},methods:{s_init:function(){this.isModify?(this.popTitle="修改订单",this.orderSn=this.info.orderSn,this.infoData(this.info)):this.isDbclick?(this.popTitle="查看订单",this.orderSn=this.info.orderSn,this.infoData(this.info)):(this.popTitle="新增订单",this.reset())},setInputVal:function(e,t){this.$set(this.form.tmsOrderCargoList,t,e)},changeOrderTo:function(e){},watchData:function(){this.isModify?(this.popTitle="修改订单",this.orderSn=this.info.orderSn,this.infoData(this.info)):this.isDbclick?(this.popTitle="查看订单",this.orderSn=this.info.orderSn,this.infoData(this.info)):(this.popTitle="新增订单",this.newinfoData(),this.ke1yVal=Math.random())},infoData:function(e){this.networkFlog&&(this.orderSn="",this.$set(this.form.tmsOrderPre,"orderFromOrgid",this.otherinfo.companyId)),console.log("item::",e),this.form.tmsOrderCargoList.cargoName=e.cargoName,this.form.tmsOrderCargoList.cargoAmount=e.cargoAmount,this.form.tmsOrderCargoList.cargoWeight=e.cargoWeight,this.form.tmsOrderCargoList.cargoVolume=e.cargoVolume,this.form.tmsOrderCargoList.cargoPack=e.cargoPack,this.form.tmsOrderCargoList.description=e.description,this.form.tmsOrderCargoList.agencyFund=e.agencyFund,this.form.tmsOrderCargoList.commissionFee=e.commissionFee,this.form.tmsOrderCargoList.shipFee=e.shipFee,this.form.tmsOrderCargoList.productPrice=e.productPrice,this.form.tmsOrderCargoList.id=e.cargoId,this.form.customSend.customerName=e.senderName,this.form.customSend.customerMobile=e.senderMobile,this.form.customSend.detailedAddress=e.senderAddr,this.form.customSend.customerUnit=e.senderUnit,this.form.customSend.customerId=e.senderId,this.form.customRece.customerName=e.receiverName,this.form.customRece.customerMobile=e.receiverMobile,this.form.customRece.detailedAddress=e.receiverAddr,this.form.customRece.customerUnit=e.receiverUnit,this.form.customRece.customerId=e.receiverId,this.form.tmsOrderPre.orderFromCityName=this.info.orderFromCityName,this.form.tmsOrderPre.orderToCityName=this.info.orderToCityName,this.form.tmsOrderPre.orderRemarks=e.orderRemarks,this.form.tmsOrderPre.orderEffective=e.orderEffective,this.form.tmsOrderPre.id=e.id,this.form.tmsOrderPre.orderFromOrgid=e.orderFromOrgid,this.form.tmsOrderPre.orderToOrgid=e.orderToOrgid,this.ke1yVal=Math.random()},validateIsEmpty:function(){var o=this,i=0<arguments.length&&void 0!==arguments[0]?arguments[0]:"不能为空！";return function(e,t,r){t?r():(o.showMessage(i),r(new Error(i)))}},showMessage:function(e){this.isChecked&&!this.isCheckedShow&&(this.isCheckedShow=!0),this.isCheckedShow?this.checkShowMessage=!0:this.checkShowMessage=!1},selectFromCity:function(e,t){e&&(this.form.tmsOrderPre.orderFromCityCode=e.id,this.form.tmsOrderPre.orderFromCityName=e.longAddr)},selectToCity:function(e,t){e&&(this.form.tmsOrderPre.orderToCityCode=e.id,this.form.tmsOrderPre.orderToCityName=e.longAddr)},setSender:function(e,t){t=t?"customRece":"customSend",e&&(this.form[t].customerType="customSend"===t?1:2,this.form[t].customerUnit=e.customerUnit,this.form[t].customerName=e.customerName,this.form[t].customerMobile=e.customerMobile,this.form[t].detailedAddress=e.detailedAddress)},setReceiver:function(e){this.setSender(e,"receiver")},setObject:function(e,t){for(var r in e)e[r]=t?t[r]:"";return e},initInfo:function(){this.loading=!1},getOrgid:function(e){},submitForm:function(e){var i=this;this.isChecked=!0,this.isCheckedShow=!0,this.checkShowMessage=!0,this.$refs[e].validate(function(e){if(i.isChecked=!1,i.isCheckedShow=!1,!e||i.loading)return!1;i.loading=!0,i.form.customerList[0]=i.form.customSend,i.form.customerList[1]=i.form.customRece;i.networkFlog&&(i.$set(i.form.tmsOrderPre,"type",1),i.$set(i.form.tmsOrderPre,"orderFromOrgid",i.otherinfo.companyId));var t=Object(p.objectMerge2)({},i.form);delete t.customSend,delete t.customRece;var r={};for(var o in t.tmsOrderCargoList)r[o]=t.tmsOrderCargoList[o];t.tmsOrderCargoList=[r],i.loading=!0,(i.isModify?Object(a.f)(t):i.networkFlog?Object(a.d)(t):Object(a.e)(t)).then(function(e){i.$emit("success"),i.closeMe(),i.$message.success("保存成功"),i.loading=!1}).catch(function(e){i.loading=!1,i._handlerCatchMsg(e)})})},newinfoData:function(){this.orderSn="",this.form={customSend:{customerId:"",customerUnit:"",customerName:"",customerMobile:"",detailedAddress:"",customerType:1},customRece:{customerId:"",customerUnit:"",customerName:"",customerMobile:"",detailedAddress:"",customerType:2},customerList:[{},{}],tmsOrderCargoList:[{cargoName:"",cargoAmount:"",cargoWeight:"",cargoVolume:"",cargoPack:"",description:"",commissionFee:"",agencyFund:"",productPrice:"",shipFee:"",id:""}],tmsOrderPre:{orderFromCityCode:"",orderFromCityName:"",orderToCityCode:"",orderToCityName:"",orderFromOrgid:this.otherinfo.orgid,orderToOrgid:"",orderPickupMethod:218,orderEffective:94,orderPayWay:76,orderRemarks:"",id:""}}},reset:function(){this.watchData()},closeMe:function(e){this.reset(),this.$emit("update:popVisible",!1),this.$emit("close"),"function"==typeof e&&e()}}}},"71e1":function(e,t,r){e.exports=r("+dzQ")(43)},"7Lww":function(e,t){},CNiu:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=r("6az1"),i=r("SWHF");var s=function(e){r("7Lww")},a=r("VU/8")(o.a,i.a,s,null,null);t.default=a.exports},EPeO:function(e,t,r){"use strict";var o=r("//Fk"),a=r.n(o),i=r("mvHQ"),s=r.n(i),c=(r("UDRQ"),r("t5DY")),n=r("0xDb"),m=r("71e1"),d=r.n(m),l=r("Vo7i");t.a={name:"singleImageUpload",props:{value:[String,Array],title:{type:String,default:""},tip:{type:String,default:"（jpg/png。小于5M）"},size:{type:String,default:"mini"},showFileList:{type:Boolean,default:!1},limit:{type:Number,default:1},listtype:{type:String,default:"picture",enum:["text","picture","picture-card"]},disabled:{type:Boolean,default:!1},twocode:{type:Boolean,default:!1}},computed:{imageUrl:function(){return this.value}},data:function(){return{tempUrl:"",dataObj:{token:"",key:""},upload:{key:"",policy:"",OSSAccessKeyId:"",success_action_status:"201",signature:""},uploadUrl:"",dir:"",filelist:[],showtc:!1,showtwocdetip:!0,twocodeurl:""}},watch:{showtc:function(){this.showtc?this.changeTwocode():clearInterval(this.uptimer)},value:{handler:function(e){if(this.showFileList){var t=Array.isArray(e)?e:e?e.split(","):[];t=t.filter(function(e){return e}),this.filelist=[],this.filelist=t.map(function(e){var t={};return t.url=e,t})}else this.filelist=e?[{url:e}]:[]},immediate:!0}},mounted:function(){},updated:function(){console.log("single image updated~~~")},beforeDestroy:function(){console.log("beforeDestroy"),clearInterval(this.uptimer)},methods:{init:function(){var t=this;return Object(c.m)().then(function(e){t.upload.OSSAccessKeyId=e.accessid,t.upload.policy=e.policy,t.upload.signature=e.signature,t.uploadUrl=e.host,t.dir=e.dir}).catch(function(){})},rmImage:function(t){this.filelist=this.filelist.filter(function(e){return e.url!==t}),this.emitInput(""),this.showtc=!1},onexceed:function(e,t){this.$message.error("最多上传 "+this.limit+" 张!")},handleRemove:function(e,t){console.log("handleRemove:",e,t),this.filelist=t,this.emitInput()},random_string:function(e){e=e||32;for(var t="ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",r=t.length,o="",i=0;i<e;i++)o+=t.charAt(Math.floor(Math.random()*r));return o},emitInput:function(e){e&&this.filelist.push({url:e}),this.$emit("input",this.showFileList?this.filelist.map(function(e){return e.url}).join(","):e)},handleImageScucess:function(e){var t="";-1!==e.indexOf("Location")&&(t=(t=e.match(/<Location>([^<]+)<\/Location>/m))?t[1]:""),this.emitInput(t)},handleError:function(e){this.$message.error("上传错误："+s()(e)),this.$emit("error",e)},handleUpload:function(e){var s=this;return new a.a(function(o,i){lrz(e.file,{width:1024}).then(function(e){var t=new FormData,r=s.uploadUrl;t.append("key",s.upload.key),t.append("success_action_status","201"),t.append("OSSAccessKeyId",s.upload.OSSAccessKeyId),t.append("policy",s.upload.policy),t.append("signature",s.upload.signature),t.append("file",e.file),l.b.post(r,t,{headers:{"Content-Type":"multipart/form-data"}}).then(function(e){o(e)}).catch(function(e){i(e),s._handlerCatchMsg(e,"上传失败:")})}).catch(function(e){i(e),s._handlerCatchMsg(e,"上传失败：")})})},beforeUpload:function(e){var r=this,o=/image\/\w+/.test(e.type)&&/(jpe?g|png)/i.test(e.type),i=e.size/1024/1024<5,s=e.name.match(/([^\.]+)$/);return s=s?"."+s[1]:"",new a.a(function(t,e){o?i?r.init().then(function(e){r.upload.key=r.dir+Object(n.parseTime)(new Date,"{y}{m}{d}")+"/"+r.random_string()+s,t(!0)}).catch(function(e){r._handlerCatchMsg(e),t(!1)}):(r.$message.error("上传头像图片大小不能超过 5MB!"),e(!1)):(r.$message.error("上传头像图片只能是 JPG/PNG 格式!"),e(!1))})},changeTwocode:function(){var r=this;clearInterval(this.uptimer),Object(c.k)().then(function(e){r.upid=e.data,r.startFetchData();var t="http://"+location.host+"/static/upload.html?len=1&access_token="+r.access_token+"&id="+e.data+"&url="+(window.tms_testapiurl||"");console.log("url:",t),d.a.toDataURL(t,{rendererOpts:{margin:0}}).then(function(e){r.twocodeurl=e})}).catch(function(e){r.$message.error("生成二维码出错了~")})},startFetchData:function(){var r=this;clearInterval(this.uptimer);var e=0;this.uptimer=setInterval(function(){if(57e4<(e+=5e3))return r.$message.info("二维码过期了，已重新生成~"),r.changeTwocode(),!1;Object(c.l)(r.upid).then(function(e){var t=e.data;t&&t.id===r.upid&&t.url&&(clearInterval(r.uptimer),r.showtc=!1,r.emitInput(decodeURIComponent(t.url)))}).catch(function(e){r.$message.info("二维码过期了，请重新扫描上传~")})},5e3)}}}},QbVN:function(e,t,r){"use strict";var o=r("EPeO"),i=r("jxZV");var s=function(e){r("0Q33"),r("xU5l")},a=r("VU/8")(o.a,i.a,s,"data-v-de7091b2",null);t.a=a.exports},SWHF:function(e,t,r){"use strict";var o={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("pop-right",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],key:t.ke1yVal,staticClass:"addPreOrderPop_lll",attrs:{title:t.popTitle+t.orderSn,isShow:t.popVisible},on:{close:t.closeMe}},[r("template",{staticClass:"addPreOrderPop-content",slot:"content"},[r("el-form",{ref:"ruleForm",staticClass:"manage-add manage-add_lrl",attrs:{model:t.form,rules:t.rules,inline:!0,"label-position":"right",size:"mini","label-width":"100px","show-message":t.checkShowMessage}},[r("div",{staticClass:"info_order clearfloat"},[t._v("发货人信息")]),t._v(" "),r("div",{staticClass:"info_send clearfloat"},[r("ul",[r("li",[r("el-form-item",{attrs:{label:"发货方:"}},[r("querySelect",{attrs:{search:"customerUnit",type:"sender",valuekey:"companyName",disabled:t.isDbclick},on:{change:t.setSender},model:{value:t.form.customSend.customerUnit,callback:function(e){t.$set(t.form.customSend,"customerUnit",e)},expression:"form.customSend.customerUnit"}})],1)],1),t._v(" "),r("li",[r("el-form-item",{attrs:{label:"发货人:",prop:"customSend.customerName"}},[r("querySelect",{attrs:{search:"customerName",type:"sender",valuekey:"customerName",disabled:t.isDbclick},on:{change:t.setSender},model:{value:t.form.customSend.customerName,callback:function(e){t.$set(t.form.customSend,"customerName",e)},expression:"form.customSend.customerName"}})],1)],1),t._v(" "),r("li",[r("el-form-item",{attrs:{label:"联系号码:",prop:"customSend.customerMobile"}},[r("querySelect",{attrs:{search:"customerMobile",type:"sender",valuekey:"customerMobile",maxlength:11,disabled:t.isDbclick},on:{change:t.setSender},model:{value:t.form.customSend.customerMobile,callback:function(e){t.$set(t.form.customSend,"customerMobile",e)},expression:"form.customSend.customerMobile"}})],1)],1),t._v(" "),r("li",[r("el-form-item",{attrs:{label:"发货地址:"}},[r("querySelect",{staticClass:"send_detailedAddress",attrs:{search:"detailedAddress",type:"sender",valuekey:"detailedAddress",disabled:t.isDbclick},on:{change:t.setSender},model:{value:t.form.customSend.detailedAddress,callback:function(e){t.$set(t.form.customSend,"detailedAddress",e)},expression:"form.customSend.detailedAddress"}})],1)],1)])]),t._v(" "),r("div",{staticClass:"info_order clearfloat"},[t._v("收货人信息")]),t._v(" "),r("div",{staticClass:"info_send clearfloat"},[r("ul",[r("li",{staticClass:"marginTop_10"},[r("el-form-item",{attrs:{label:"收货方:"}},[r("querySelect",{attrs:{search:"customerUnit",type:"receiver",valuekey:"customerUnit",disabled:t.isDbclick},on:{change:t.setReceiver},model:{value:t.form.customRece.customerUnit,callback:function(e){t.$set(t.form.customRece,"customerUnit",e)},expression:"form.customRece.customerUnit"}})],1)],1),t._v(" "),r("li",{staticClass:"marginTop_10"},[r("el-form-item",{attrs:{label:"收货人:",prop:"customRece.customerName"}},[r("querySelect",{attrs:{search:"customerName",type:"receiver",valuekey:"customerName",maxlength:20,disabled:t.isDbclick},on:{change:t.setReceiver},model:{value:t.form.customRece.customerName,callback:function(e){t.$set(t.form.customRece,"customerName",e)},expression:"form.customRece.customerName"}})],1)],1),t._v(" "),r("li",{staticClass:"marginTop_10"},[r("el-form-item",{attrs:{label:"联系号码:",prop:"customRece.customerMobile"}},[r("querySelect",{attrs:{search:"customerMobile",type:"receiver",valuekey:"customerMobile",disabled:t.isDbclick},on:{change:t.setReceiver},model:{value:t.form.customRece.customerMobile,callback:function(e){t.$set(t.form.customRece,"customerMobile",e)},expression:"form.customRece.customerMobile"}})],1)],1),t._v(" "),r("li",[r("el-form-item",{attrs:{label:"收货地址:"}},[r("querySelect",{attrs:{search:"detailedAddress",type:"receiver",valuekey:"detailedAddress",disabled:t.isDbclick},on:{change:t.setReceiver},model:{value:t.form.customRece.detailedAddress,callback:function(e){t.$set(t.form.customRece,"detailedAddress",e)},expression:"form.customRece.detailedAddress"}})],1)],1)])]),t._v(" "),r("div",{staticClass:"info_order"},[t._v("货物信息")]),t._v(" "),r("div",{staticClass:"info_table"},[r("ul",[r("li",[r("p",[r("i",[t._v("*")]),t._v(" 货品名")]),t._v(" "),r("el-form-item",{attrs:{prop:"tmsOrderCargoList.cargoName"}},[r("querySelect",{attrs:{size:"mini",search:"value",type:"cargoName",valuekey:"value",disabled:t.isDbclick},model:{value:t.form.tmsOrderCargoList.cargoName,callback:function(e){t.$set(t.form.tmsOrderCargoList,"cargoName",e)},expression:"form.tmsOrderCargoList.cargoName"}})],1)],1),t._v(" "),r("li",[r("p",[r("i",[t._v("*")]),t._v(" 件数")]),t._v(" "),r("el-form-item",{attrs:{prop:"tmsOrderCargoList.cargoAmount"}},[r("el-input",{directives:[{name:"numberOnly",rawName:"v-numberOnly"}],attrs:{maxlength:8,disabled:t.isDbclick},model:{value:t.form.tmsOrderCargoList.cargoAmount,callback:function(e){t.$set(t.form.tmsOrderCargoList,"cargoAmount",e)},expression:"form.tmsOrderCargoList.cargoAmount"}})],1)],1),t._v(" "),r("li",[r("p",[t._v("重量(kg)")]),t._v(" "),r("el-form-item",{attrs:{prop:"tmsOrderCargoList.cargoWeight"}},[r("input",{directives:[{name:"number-only",rawName:"v-number-only:point",arg:"point"}],staticClass:"nativeinput order_com",attrs:{maxlength:8,"auto-complete":"off",clearable:"",disabled:t.isDbclick,type:"text"},domProps:{value:t.form.tmsOrderCargoList.cargoWeight},on:{change:function(e){t.setInputVal(e.target.value,"cargoWeight")}}})])],1),t._v(" "),r("li",[r("p",[t._v("体积(方)")]),t._v(" "),r("el-form-item",{attrs:{prop:"tmsOrderCargoList.cargoVolume"}},[r("input",{directives:[{name:"number-only",rawName:"v-number-only:point",arg:"point"}],staticClass:"nativeinput order_com",attrs:{maxlength:8,"auto-complete":"off",clearable:"",disabled:t.isDbclick,type:"text"},domProps:{value:t.form.tmsOrderCargoList.cargoVolume},on:{change:function(e){t.setInputVal(e.target.value,"cargoVolume")}}})])],1),t._v(" "),r("li",[r("p",[t._v("包装")]),t._v(" "),r("el-form-item",{attrs:{prop:"nowpayCarriage"}},[r("querySelect",{attrs:{size:"mini",search:"value",type:"cargoPack",valuekey:"value",disabled:t.isDbclick},model:{value:t.form.tmsOrderCargoList.cargoPack,callback:function(e){t.$set(t.form.tmsOrderCargoList,"cargoPack",e)},expression:"form.tmsOrderCargoList.cargoPack"}})],1)],1),t._v(" "),r("li",[r("p",[t._v("品种规格")]),t._v(" "),r("el-form-item",{attrs:{prop:""}},[r("el-input",{attrs:{maxlength:20,disabled:t.isDbclick},model:{value:t.form.tmsOrderCargoList.description,callback:function(e){t.$set(t.form.tmsOrderCargoList,"description",e)},expression:"form.tmsOrderCargoList.description"}})],1)],1)])]),t._v(" "),r("div",{staticClass:"info_order",staticStyle:{"margin-top":"18px"}},[t._v("订单信息")]),t._v(" "),r("div",{staticClass:"manage-add-table-foot"},[r("table",[r("tbody",[r("tr",[r("td",[r("el-form-item",{attrs:{label:"发站"}},[r("queryCity",{attrs:{search:"longAddr",type:"city",remote:!0,disabled:t.isDbclick},on:{change:t.selectFromCity},model:{value:t.form.tmsOrderPre.orderFromCityName,callback:function(e){t.$set(t.form.tmsOrderPre,"orderFromCityName",e)},expression:"form.tmsOrderPre.orderFromCityName"}})],1)],1),t._v(" "),r("td",[r("el-form-item",{attrs:{label:"到站",prop:"tmsOrderPre.orderToCityName"}},[r("queryCity",{attrs:{search:"longAddr",type:"city",remote:!0,disabled:t.isDbclick},on:{change:t.selectToCity},model:{value:t.form.tmsOrderPre.orderToCityName,callback:function(e){t.$set(t.form.tmsOrderPre,"orderToCityName",e)},expression:"form.tmsOrderPre.orderToCityName"}})],1)],1),t._v(" "),r("td",[r("el-form-item",{attrs:{label:"开单网点"}},[r("SelectTree",{attrs:{disabled:""},model:{value:t.form.tmsOrderPre.orderFromOrgid,callback:function(e){t.$set(t.form.tmsOrderPre,"orderFromOrgid",e)},expression:"form.tmsOrderPre.orderFromOrgid"}})],1)],1),t._v(" "),r("td",[r("el-form-item",{attrs:{label:"目的网点"}},[r("SelectTree",{attrs:{disabled:t.isDbclick},on:{change:t.changeOrderTo},model:{value:t.form.tmsOrderPre.orderToOrgid,callback:function(e){t.$set(t.form.tmsOrderPre,"orderToOrgid",e)},expression:"form.tmsOrderPre.orderToOrgid"}})],1)],1)]),t._v(" "),r("tr",[r("td",[r("el-form-item",{attrs:{label:"提货方式"}},[r("SelectType",{attrs:{type:"order_pickup_method",disabled:t.isDbclick},model:{value:t.form.tmsOrderPre.orderPickupMethod,callback:function(e){t.$set(t.form.tmsOrderPre,"orderPickupMethod",e)},expression:"form.tmsOrderPre.orderPickupMethod"}})],1)],1),t._v(" "),r("td",[r("el-form-item",{attrs:{label:"紧急度"}},[r("SelectType",{attrs:{type:"ship_effective",disabled:t.isDbclick},model:{value:t.form.tmsOrderPre.orderEffective,callback:function(e){t.$set(t.form.tmsOrderPre,"orderEffective",e)},expression:"form.tmsOrderPre.orderEffective"}})],1)],1),t._v(" "),r("td",[r("el-form-item",{attrs:{label:"代收款",prop:""}},[r("input",{directives:[{name:"number-only",rawName:"v-number-only:point",arg:"point"}],staticClass:"nativeinput",attrs:{maxlength:8,"auto-complete":"off",clearable:"",disabled:t.isDbclick,type:"text"},domProps:{value:t.form.tmsOrderCargoList.agencyFund},on:{change:function(e){t.setInputVal(e.target.value,"agencyFund")}}})])],1),t._v(" "),r("td",[r("el-form-item",{attrs:{label:"代收款手续费",prop:"tmsOrderCargoList.commissionFee"}},[r("input",{directives:[{name:"number-only",rawName:"v-number-only:point",arg:"point"}],staticClass:"nativeinput order_com",attrs:{maxlength:8,"auto-complete":"off",clearable:"",disabled:t.isDbclick,type:"text"},domProps:{value:t.form.tmsOrderCargoList.commissionFee},on:{change:function(e){t.setInputVal(e.target.value,"commissionFee")}}})])],1)]),t._v(" "),r("tr",[r("td",[r("el-form-item",{attrs:{label:"付款方式"}},[r("SelectType",{attrs:{type:"ship_pay_way",disabled:t.isDbclick},model:{value:t.form.tmsOrderPre.orderPayWay,callback:function(e){t.$set(t.form.tmsOrderPre,"orderPayWay",e)},expression:"form.tmsOrderPre.orderPayWay"}})],1)],1),t._v(" "),r("td",[r("el-form-item",{attrs:{label:"运费",prop:""}},[r("input",{directives:[{name:"number-only",rawName:"v-number-only:point",arg:"point"}],staticClass:"nativeinput",attrs:{maxlength:8,"auto-complete":"off",clearable:"",disabled:t.isDbclick,type:"text"},domProps:{value:t.form.tmsOrderCargoList.shipFee},on:{change:function(e){t.setInputVal(e.target.value,"shipFee")}}})])],1),t._v(" "),r("td",[r("el-form-item",{attrs:{label:"声明价值",prop:""}},[r("input",{directives:[{name:"number-only",rawName:"v-number-only:point",arg:"point"}],staticClass:"nativeinput",attrs:{maxlength:8,"auto-complete":"off",clearable:"",disabled:t.isDbclick,type:"text"},domProps:{value:t.form.tmsOrderCargoList.productPrice},on:{change:function(e){t.setInputVal(e.target.value,"productPrice")}}})])],1)]),t._v(" "),r("tr",[r("td",[r("el-form-item",{attrs:{label:"备注"}},[r("el-input",{staticClass:"add-textarea",attrs:{maxlength:300,"auto-complete":"off",type:"textarea",clearable:"",placeholder:"少于300字",disabled:t.isDbclick},model:{value:t.form.tmsOrderPre.orderRemarks,callback:function(e){t.$set(t.form.tmsOrderPre,"orderRemarks",e)},expression:"form.tmsOrderPre.orderRemarks"}})],1)],1)])])])])])],1),t._v(" "),t.isDbclick?r("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:t.closeMe}},[t._v("关 闭")])],1):r("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{attrs:{type:"primary"},on:{click:function(e){t.submitForm("ruleForm")}}},[t._v("保 存")]),t._v(" "),r("el-button",{on:{click:t.closeMe}},[t._v("取 消")])],1)],2)},staticRenderFns:[]};t.a=o},jxZV:function(e,t,r){"use strict";var o={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"upload-container",class:{uploadlist:t.showFileList}},[r("el-upload",{staticClass:"image-uploader",attrs:{data:t.upload,action:t.uploadUrl,multiple:!1,drag:!t.showFileList,"show-file-list":t.showFileList,"file-list":t.filelist,limit:t.limit,"before-upload":t.beforeUpload,"list-type":t.listtype,"on-exceed":t.onexceed,disabled:t.disabled,"on-remove":t.handleRemove,"on-error":t.handleError,"http-request":t.handleUpload,"on-success":t.handleImageScucess}},[t._t("content",[t.showtc?r("div",{staticClass:"twocodebox",on:{click:function(e){e.stopPropagation(),e.preventDefault()},mouseover:function(e){t.showtwocdetip=!0},mouseout:function(e){t.showtwocdetip=!1}}},[r("div",[r("img",{attrs:{src:t.twocodeurl,alt:""}})]),t._v(" "),r("el-button",{attrs:{size:t.size,type:"primary"},on:{click:function(e){t.showtc=!1}}},[t._v("本地上传")]),t._v(" "),r("el-button",{attrs:{size:t.size,type:"primary"},on:{click:t.changeTwocode}},[t._v("更换二维码")])],1):r("div",[t.title&&!t.showFileList?r("div",{staticClass:"upload__title"},[t._v(t._s(t.title))]):t._e(),t._v(" "),r("el-button",{attrs:{size:t.size,type:"primary"}},[t._v("点击上传")]),t._v(" "),t.twocode?r("el-button",{staticClass:"uploadtwocode",attrs:{size:t.size,type:"primary"},on:{click:function(e){e.stopPropagation(),e.preventDefault(),t.showtc=!0}}},[t._v("二维码上传")]):t._e(),t._v(" "),t.showFileList?t._e():r("div",{staticClass:"el-upload__text"},[t._v("将文件拖拽到此区域")]),t._v(" "),t.tip?r("div",{staticClass:"upload__tip"},[t._v(t._s(t.tip))]):t._e()],1)])],2),t._v(" "),t.imageUrl&&!t.showFileList?r("div",{staticClass:"image-preview"},[r("div",{staticClass:"image-preview-wrapper"},[r("img",{attrs:{src:t.imageUrl}}),t._v(" "),r("div",{staticClass:"image-preview-action"},[r("i",{staticClass:"el-icon-delete",on:{click:function(e){t.rmImage(t.imageUrl)}}})])])]):t._e()],1)},staticRenderFns:[]};t.a=o},xU5l:function(e,t){}});