webpackJsonp([43],{"/OH/":function(e,t,r){"use strict";var i=r("xoQy"),n=r("BB2Z");var a=function(e){r("z6yh")},o=r("VU/8")(i.a,n.a,a,"data-v-52474850",null);t.a=o.exports},"7sm4":function(e,t,r){"use strict";var i={render:function(){var r=this,e=r.$createElement,i=r._self._c||e;return i("div",[!r.ui&&r.text?i("span",[r._v("\n        "+r._s(r.itemProvince&&r.itemProvince.value)+r._s(r.itemCity&&r.itemCity.value)+r._s(r.itemArea&&r.itemArea.value)+r._s(r.itemTown&&r.itemTown.value)+"\n    ")]):r._e(),r._v(" "),r.text||r.ui||!r.province?r._e():i("select",{directives:[{name:"model",rawName:"v-model",value:r.nowProvince,expression:"nowProvince"}],class:r.className,on:{change:function(e){var t=Array.prototype.filter.call(e.target.options,function(e){return e.selected}).map(function(e){return"_value"in e?e._value:e.value});r.nowProvince=e.target.multiple?t:t[0]}}},[r.blank?i("option",{attrs:{value:""}},[r._v(r._s(r.lang.pleaseSelect))]):r._e(),r._v(" "),r._l(r.listProvince,function(e){return i("option",{key:e.key,domProps:{value:e.key}},[r._v(r._s(e.value))])})],2),r._v(" "),!r.text&&!r.ui&&r.city&&r.haveCity?i("select",{directives:[{name:"model",rawName:"v-model",value:r.nowCity,expression:"nowCity"}],class:r.className,on:{change:function(e){var t=Array.prototype.filter.call(e.target.options,function(e){return e.selected}).map(function(e){return"_value"in e?e._value:e.value});r.nowCity=e.target.multiple?t:t[0]}}},[r.blank?i("option",{attrs:{value:""}},[r._v(r._s(r.lang.pleaseSelect))]):r._e(),r._v(" "),r._l(r.listCity,function(e){return i("option",{key:e.key,domProps:{value:e.key}},[r._v(r._s(e.value))])})],2):r._e(),r._v(" "),!r.text&&!r.ui&&(r.area&&r.city||!r.haveCity)&&r.listArea.length?i("select",{directives:[{name:"model",rawName:"v-model",value:r.nowArea,expression:"nowArea"}],class:r.className,on:{change:function(e){var t=Array.prototype.filter.call(e.target.options,function(e){return e.selected}).map(function(e){return"_value"in e?e._value:e.value});r.nowArea=e.target.multiple?t:t[0]}}},[r.blank?i("option",{attrs:{value:""}},[r._v(r._s(r.lang.pleaseSelect))]):r._e(),r._v(" "),r._l(r.listArea,function(e){return i("option",{key:e.key,domProps:{value:e.key}},[r._v(r._s(e.value))])})],2):r._e(),r._v(" "),!r.text&&!r.ui&&r.town&&r.area&&r.city?i("select",{directives:[{name:"model",rawName:"v-model",value:r.nowTown,expression:"nowTown"}],class:r.className,on:{change:function(e){var t=Array.prototype.filter.call(e.target.options,function(e){return e.selected}).map(function(e){return"_value"in e?e._value:e.value});r.nowTown=e.target.multiple?t:t[0]}}},[r.blank?i("option",{attrs:{value:""}},[r._v(r._s(r.lang.pleaseSelect))]):r._e(),r._v(" "),r._l(r.listTown,function(e){return i("option",{key:e.key,domProps:{value:e.key}},[r._v(r._s(e.value))])})],2):r._e(),r._v(" "),r.ui?i("div",{ref:"caller",staticClass:"caller-container",on:{click:function(e){e.stopPropagation(),e.preventDefault(),r.showDropdown(!0)}}},[r._t("default")],2):r._e(),r._v(" "),r.ui?i("v-dropdown",{ref:"dropdown",on:{hidedropdown:r.hidedropdown}},[i("div",{staticClass:"rg-header"},[i("h3",[i("span",{directives:[{name:"show",rawName:"v-show",value:!(r.itemProvince||r.itemCity||r.itemArea||r.itemTown),expression:"!itemProvince&&!itemCity&&!itemArea&&!itemTown"}]},[r._v("行政区划选择器")]),r._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:r.itemProvince||r.itemCity||r.itemArea||r.itemTown,expression:"itemProvince||itemCity||itemArea||itemTown"}],staticClass:"rg-header-selected"},[r._v("\n                    "+r._s(r.itemProvince&&r.itemProvince.value)+r._s(r.itemCity&&r.itemCity.value)+r._s(r.itemArea&&r.itemArea.value)+r._s(r.itemTown&&r.itemTown.value)+"\n                ")])]),r._v(" "),i("button",{staticClass:"rg-removeall-button",attrs:{type:"button",title:"清除选择"},on:{click:r.clear}},[i("i",{staticClass:"iconfont icon-removeall"})]),r._v(" "),i("button",{staticClass:"rg-done-button",attrs:{type:"button",title:"完成"},on:{click:function(e){r.showDropdown(!1)}}},[i("i",{staticClass:"iconfont icon-selected"})])]),r._v(" "),r.search?i("div",{staticClass:"rg-search"},[i("input",{directives:[{name:"model",rawName:"v-model.trim",value:r.query,expression:"query",modifiers:{trim:!0}}],ref:"input",staticClass:"rg-input",attrs:{type:"text",autocomplete:"off"},domProps:{value:r.query},on:{input:function(e){e.target.composing||(r.query=e.target.value.trim())},blur:function(e){r.$forceUpdate()}}})]):r._e(),r._v(" "),i("div",{staticClass:"rg-level-tabs"},[i("ul",r._l(r.levels,function(e,t){return r.checkAvailable(t)?i("li",{key:t},[i("a",{class:{active:t===r.levelIndex},attrs:{href:"javascript:void(0);",tab_id:"selectmenu_tab_"+(t+1),data_index:t},on:{click:function(e){r.levelIndex=t}}},[r._v(r._s(e.title))])]):r._e()}))]),r._v(" "),i("div",{staticClass:"rg-results-container"},[i("ul",{staticClass:"rg-results"},[r._l(r.list,function(t,e){return i("li",{key:e,class:{"rg-item":!0,active:r.matchItem(t)},on:{click:function(e){r.itemSelect(t)}}},[r._v(r._s(t.value))])}),r._v(" "),i("li",{directives:[{name:"show",rawName:"v-show",value:0===r.list.length,expression:"list.length === 0"}],staticClass:"rg-message-box"},[r._v("无匹配项目")])],2)])]):r._e()],1)},staticRenderFns:[]};t.a=i},"8sHD":function(e,t,r){var i=r("kM2E"),n=r("KpO7");i(i.S+i.F*(Number.parseInt!=n),"Number",{parseInt:n})},BB2Z:function(e,t,r){"use strict";var i={render:function(){var e=this,t=e.$createElement;return(e._self._c||t)("div",{directives:[{name:"show",rawName:"v-show",value:e.show,expression:"show"}],staticClass:"v-dropdown-container",style:[e.styleSheet]},[e._t("default")],2)},staticRenderFns:[]};t.a=i},Ek2E:function(e,t){},GZk5:function(e,t,r){"use strict";var i=r("mvHQ"),n=r.n(i),o=r("WoEk"),a=r("E4LH"),s=r("Zjyc"),l=r("mcg1"),c=r("0xDb"),u=r("o9X6");t.a={name:"lineManageDetail",components:{upload:s.a,vregion:l.a,SelectTree:u.a},data:function(){var i=this;return{unable:!1,ifShowRangeType:"0",ruleForm:{startLocation:"",endLocation:"",transportAging1:"",transportAging2:"",fromOrgid:"",lowerPrice:"",priceAbnormal:30,priceBigabnormal:30,priceNormal:10,rangeFromArea:"",rangeFromCity:"",rangeFromContacts:"",rangeFromMobile:"",rangeFromProvince:"",rangeToArea:"",rangeToCity:"",rangeToContacts:"",rangeToMobile:"",rangeToProvince:"",toOrgid:"",transportAging:"",transportAgingType:0,transportRemark:""},ligthPriceForms:[{startVolume:"0",endVolume:"",primeryPrice:"",type:"0"}],weigthPriceForms:[{startVolume:"0",endVolume:"",primeryPrice:"",type:"1"}],rules:{fromOrgid:[{required:!0,message:"请选择出发网点",trigger:"blur"}],toOrgid:[{required:!0,message:"请选择到达网点",trigger:"blur"}],startLocation:[{required:!0,message:"请输入发站",trigger:"change"}],endLocation:[{required:!0,message:"请输入到站",trigger:"change"}],rangeFromContacts:[{message:"请输入发站联系人信息",trigger:"blur"}],rangeToContacts:[{message:"请输入到站联系人信息",trigger:"blur"}],rangeFromMobile:[{required:!0,validator:function(e,t,r){""===t?r(new Error("请输入手机号码")):(a.a.MOBILE.test(t)||r(new Error("请输入正确的手机号码格式")),r())},trigger:"change"}],rangeToMobile:[{required:!0,validator:function(e,t,r){""===t?r(new Error("请输入手机号码")):(a.a.MOBILE.test(t)||r(new Error("请输入正确的手机号码格式")),r())},trigger:"change"}],rangeType:[{required:!0,message:"请选择专线类型",trigger:"change"}],transportRemark:[{min:30,max:500,message:"专线说明请在30-500字",trigger:"blur"}],weigthPriceForms:[{required:!0,validator:function(e,t,r){""===i.weigthPriceForms[0].endVolume?r(new Error("请补充重货价格区间")):i.weigthPriceForms.forEach(function(e){""===e.primeryPrice?r(new Error("请补充重货价格区间")):r()})},trigger:"blur"}],ligthPriceForms:[{required:!0,validator:function(e,t,r){i.ligthPriceForms.forEach(function(e){""===e.endVolume?r(new Error("请补充轻货运量")):""===e.primeryPrice?(console.log("123"),r(new Error("请补充轻货价格区间"))):r()})},trigger:"blur"}],primeryPrice:[{required:!0,message:"请填写价格",trigger:"blur"}]}}},watch:{$route:function(e,t){var r=/\/company\/lineManage\/(detail|create|modify)/;console.log("to path:",e.path,t.path),!1===r.test(e.path)&&r.test(t.path)&&this.saveData(t.fullPath),r.test(e.path)&&r.test(t.path)&&(this.saveData(t.fullPath),this.getParams())},"ruleForm.priceAbnormal":function(){this.ruleForm.priceBigabnormal=this.ruleForm.priceAbnormal}},activated:function(){this.getParams()},mounted:function(){},methods:{setInputVal:function(e,t,r){this.$set(t,r,isNaN(parseFloat(e,10))?"":parseFloat(e,10))},checkPrice:function(){var e=this.ruleForm.priceNormal,t=this.ruleForm.priceAbnormal;e=Number(e)||"",(t=Number(t)||"")&&(!e||t<=e)&&(this.ruleForm.priceNormal="",this.ruleForm.priceAbnormal="",this.$message.info("必须先填写正常幅度，且小于异常幅度"))},ifWrong:function(e,t){var r=e[t].endVolume<=e[t].startVolume;return!(""===e[t].endVolume&&1<=t&&t===e.length-1)&&(r?(this.$message({type:"info",message:"终止运量应不小于起始运量"}),void(e[t].endVolume="")):e.length>t+1&&(e[t+1].startVolume=e[t].endVolume,e[t+1].endVolume&&e[t+1].endVolume<e[t+1].startVolume)?(this.$message({type:"info",message:"终止运量应不小于起始运量"}),e.splice(t+1)):void 0)},isSpecialCity:function(e){return/(北京|天津|上海|重庆|香港|澳门)/.test(e)},regionChangeStart:function(e){this.ruleForm.startLocation=e.province||e.city||e.area||e.town?(""+this.getValue(e.province)+this.getValue(e.city)+this.getValue(e.area)+this.getValue(e.town)).trim():"",this.ruleForm.rangeFromProvince=e.province?e.province.name:"",this.ruleForm.rangeFromCity=this.isSpecialCity(this.ruleForm.rangeFromProvince)?e.province.name:e.city?e.city.name:"",this.ruleForm.rangeFromArea=e.area?e.area.name:""},regionChangeEnd:function(e){if(this.ruleForm.endLocation=e.province||e.city||e.area||e.town?(""+this.getValue(e.province)+this.getValue(e.city)+this.getValue(e.area)+this.getValue(e.town)).trim():"",this.ruleForm.endLocation==this.ruleForm.startLocation)return this.$message({type:"info",message:"发站不可与到站重复！"}),void(this.ruleForm.endLocation="");this.ruleForm.rangeToProvince=e.province?e.province.name:"",this.ruleForm.rangeToCity=this.isSpecialCity(this.ruleForm.rangeToProvince)?e.province.name:e.city?e.city.name:"",this.ruleForm.rangeToArea=e.area?e.area.name:""},ifProvice:function(e){return console.log("ifProvice",e),this.$message({type:"info",message:"至少选择到市级范围"}),"startLocation"===e?void(this.ruleForm.startLocation=""):void(this.ruleForm.endLocation="")},getValue:function(e){return e?e.value:""},saveData:function(e){var t=encodeURIComponent(e),r={unable:this.unable,ifShowRangeType:this.ifShowRangeType,ruleForm:this.ruleForm,ligthPriceForms:this.ligthPriceForms,weigthPriceForms:this.weigthPriceForms};sessionStorage.setItem(t,n()(r))},reinputData:function(e){var t=this.$options.data();this.unable=e.unable,this.ifShowRangeType=e.ifShowRangeType,this.ruleForm=e.ruleForm||e.ruleForm,this.ligthPriceForms=e.ligthPriceForms||t.ligthPriceForms,this.weigthPriceForms=e.weigthPriceForms||t.weigthPriceForms},getParams:function(){var n=this,e=encodeURIComponent(this.$route.fullPath),t=sessionStorage.getItem(e);if(t&&(t=JSON.parse(t)).ruleForm)return this.reinputData(t),!1;if(this.$route.query.id)this.ifShowRangeType=-1!==this.$route.path.indexOf("modify")?"1":"2",Object(o.a)(this.$route.query.id).then(function(e){var t=e.data;if(t){for(var r in t)t[r]=null===t[r]?"":t[r];for(var i in n.ruleForm)n.ruleForm[i]=e.data[i];n.ruleForm.id=e.data.id,n.ruleForm.startLocation=t.rangeFromProvince+(n.isSpecialCity(t.rangeFromProvince)?"":t.rangeFromCity)+t.rangeFromArea,n.ruleForm.endLocation=t.rangeToProvince+(n.isSpecialCity(t.rangeToProvince)?"":t.rangeToCity)+t.rangeToArea,"2"===t.transportAgingType&&(n.ruleForm.transportAgingType=2,n.ruleForm.transportAging1=t.transportAging.split("-")[0]||"",n.ruleForm.transportAging2=t.transportAging.split("-")[1]||""),n.ruleForm.transportAgingType=parseInt(t.transportAgingType,10)||0,t.heavePrice.length&&(n.weigthPriceForms=[],t.heavePrice.forEach(function(e){n.weigthPriceForms.push({startVolume:e.startVolume,endVolume:e.endVolume,primeryPrice:e.primeryPrice,type:"1"})})),t.lightPrice.length&&(n.ligthPriceForms=[],t.lightPrice.forEach(function(e){n.ligthPriceForms.push({startVolume:e.startVolume,endVolume:e.endVolume,primeryPrice:e.primeryPrice,type:"0"})}))}else n.$message.info("获取失败。")}).catch(function(e){n._handlerCatchMsg(e,"获取失败，原因：")}),"2"===this.ifShowRangeType?this.unable=!0:this.unable=!1;else{var r=this.$options.data();this.reinputData(r)}},handlerChoose:function(){var e=this.ruleForm.transportAgingUnit,t=this.ruleForm.transportAging;t="多天"!==e?(t=(t=(t=(t=t.replace(/[^\d.]/g,"")).replace(/^\./g,"")).replace(/\.{2,}/g,".")).replace(".","$#$").replace(/\./g,"").replace("$#$",".")).replace(/^(\-)*(\d+)\.(\d).*$/,"$1$2.$3"):t.replace(/[^0-9\-]+/g,""),this.ruleForm.transportAging=t},addItem:function(e,t,r){switch(e){case"weight":if(""===r.endVolume||0===r.endVolume)return this.$message({type:"info",message:"请补充重货运量"});if(""===r.primeryPrice)return this.$message({type:"info",message:"请补充重货原报价"});this.weigthPriceForms.push({startVolume:this.weigthPriceForms[t].endVolume,endVolume:"",primeryPrice:"",type:"1"});break;case"light":if(""===r.endVolume||0===r.endVolume)return this.$message({type:"info",message:"请补充轻货运量"});if(""===r.primeryPrice)return this.$message({type:"info",message:"请补充轻货原报价"});this.ligthPriceForms.push({startVolume:this.ligthPriceForms[t].endVolume,endVolume:"",primeryPrice:"",type:"0"})}},reduceItem:function(e,t){switch(console.log(e,t),t){case"weight":this.weigthPriceForms.splice(e,1);break;case"light":this.ligthPriceForms.splice(e,1)}},submitForm:function(e){var i=this;console.log(this.ruleForm);var t=!0,r=void 0;if(this.ligthPriceForms.forEach(function(e){""===e.primeryPrice&&(t=!(r="请补充轻货原报价"))}),this.weigthPriceForms.forEach(function(e){""===e.primeryPrice&&(t=!(r="请补充重货原报价"))}),""!==this.ruleForm.fromOrgid&&this.ruleForm.fromOrgid===this.ruleForm.toOrgid&&(t=!(r="出发网点跟到达网点不能一样")),2===this.ruleForm.transportAgingType){var n=Number(this.ruleForm.transportAging1)||0,a=Number(this.ruleForm.transportAging2)||0;(n+a&&!(n*a)||a<n)&&(t=!(r="请填写正确的时效值"))}t?this.$refs[e].validate(function(e){if(!e)return i.$message({type:"info",message:"请填写完整信息"}),!1;var t={tmsSystemTransportRangeDto:{},tmsSystemTransportRangePriceDtoList:[]},r=Object(c.objectMerge2)({},i.ruleForm);2===r.transportAgingType&&r.transportAging1&&r.transportAging2&&(r.transportAging=r.transportAging1+"-"+r.transportAging2),i.ligthPriceForms.forEach(function(e){t.tmsSystemTransportRangePriceDtoList.push(e)}),i.weigthPriceForms.forEach(function(e){t.tmsSystemTransportRangePriceDtoList.push(e)}),delete r.startLocation,delete r.endLocation,delete r.transportAging1,delete r.transportAging2,t.tmsSystemTransportRangeDto=r,("1"===i.ifShowRangeType?Object(o.b)(t):Object(o.d)(t)).then(function(e){console.log("res",e),200===e.status?i.$alert("操作成功","提示",{confirmButtonText:"确定",callback:function(e){i.ifShowRangeType,i.eventBus.$emit("replaceCurrentView","/company/lineManage")}}):i.$message({type:"info",message:"操作失败，原因："+(e.errorInfo?e.errorInfo:e.text)})}).catch(function(e){i.$message({type:"info",message:"操作失败，原因："+(e.errorInfo?e.errorInfo:e.text)})})}):this.$message({type:"info",message:r})},resetForm:function(e){this.$refs[e].resetFields(),this.ruleForm.transportAgingType=0,this.ruleForm.priceAbnormal=30,this.ruleForm.priceBigabnormal=30,this.ruleForm.priceNormal=10,this.ligthPriceForms=[{startVolume:"0",endVolume:"",primeryPrice:"",type:"0"}],this.weigthPriceForms=[{startVolume:"0",endVolume:"",primeryPrice:"",type:"1"}]}}}},KpO7:function(e,t,r){var i=r("7KvD").parseInt,n=r("mnVu").trim,a=r("hyta"),o=/^[-+]?0[xX]/;e.exports=8!==i(a+"08")||22!==i(a+"0x16")?function(e,t){var r=n(String(e),3);return i(r,t>>>0||(o.test(r)?16:10))}:i},Q9eS:function(e,t){},UZPH:function(e,t,r){"use strict";t.a={cn:{pleaseSelect:"请选择"},en:{pleaseSelect:"Please select"}}},WoEk:function(e,t,r){"use strict";t.d=function(e){return i.b.post("/api-system/system/tmssystemtransportrange/v1/add",e)},t.a=function(e){return i.b.get("/api-system/system/tmssystemtransportrange/v1/"+e)},t.b=function(e){return i.b.put("/api-system/system/tmssystemtransportrange/v1/update",e)},t.e=function(e){return i.b.post("/api-system/system/tmssystemtransportrange/v1/list",e)},t.c=function(e){return i.b.delete("/api-system/system/tmssystemtransportrange/v1/"+e)},t.f=function(e,t){return i.b.put("/api-system/system/tmssystemtransportrange/v1/updateStatus/"+e+"/"+t)};var i=r("Vo7i")},ekXy:function(e,t,r){"use strict";var i={render:function(){var i=this,e=i.$createElement,n=i._self._c||e;return n("div",{staticClass:"create-range page-main identification"},[n("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:i.ruleForm,rules:i.rules,"label-width":"110px"}},[n("div",{staticClass:"prompt"},[n("p",[n("span",{staticClass:"tishi"},[n("i",{staticClass:"el-icon-warning"}),i._v("小提示： ")]),i._v("(打"),n("span",{staticClass:"star"},[i._v("*")]),i._v("号为必填项)")])]),i._v(" "),n("div",{staticClass:"searchInformation information"},[n("h2",[i._v("基本信息")]),i._v(" "),n("el-form-item",{attrs:{label:"出发网点：",prop:"fromOrgid","label-width":"100px"}},[n("select-tree",{attrs:{disabled:i.unable,orgid:i.otherinfo.companyId},model:{value:i.ruleForm.fromOrgid,callback:function(e){i.$set(i.ruleForm,"fromOrgid",e)},expression:"ruleForm.fromOrgid"}})],1),i._v(" "),n("el-form-item",{attrs:{label:"发站：","label-width":"100px",prop:"startLocation"}},[i.unable?n("el-input",{attrs:{value:i.ruleForm.startLocation,disabled:""}}):n("vregion",{staticClass:"form-control",attrs:{ui:!0,ifAera:!0},on:{values:i.regionChangeStart,testCity:function(e){i.ifProvice("startLocation")}}},[n("el-input",{attrs:{placeholder:"请选择发站"},model:{value:i.ruleForm.startLocation,callback:function(e){i.$set(i.ruleForm,"startLocation",e)},expression:"ruleForm.startLocation"}})],1)],1),i._v(" "),n("el-form-item",{attrs:{label:"联系人：",prop:"rangeFromContacts","label-width":"100px"}},[n("el-input",{attrs:{maxlength:10,disabled:i.unable},model:{value:i.ruleForm.rangeFromContacts,callback:function(e){i.$set(i.ruleForm,"rangeFromContacts",e)},expression:"ruleForm.rangeFromContacts"}})],1),i._v(" "),n("el-form-item",{attrs:{label:"联系电话：",prop:"rangeFromMobile","label-width":"100px"}},[n("div",[n("input",{directives:[{name:"number-only",rawName:"v-number-only"}],staticClass:"nativeinput nativeinput-border",attrs:{maxlength:11,"auto-complete":"off",clearable:"",disabled:i.unable,type:"text"},domProps:{value:i.ruleForm.rangeFromMobile},on:{change:function(e){i.setInputVal(e.target.value,i.ruleForm,"rangeFromMobile")}}})])]),n("br"),i._v(" "),n("el-form-item",{attrs:{label:"到达网点：",prop:"toOrgid","label-width":"100px"}},[n("select-tree",{attrs:{disabled:i.unable,orgid:i.otherinfo.companyId},model:{value:i.ruleForm.toOrgid,callback:function(e){i.$set(i.ruleForm,"toOrgid",e)},expression:"ruleForm.toOrgid"}})],1),i._v(" "),n("el-form-item",{attrs:{label:"到站：","label-width":"100px",prop:"endLocation"}},[i.unable?n("el-input",{attrs:{disabled:""},model:{value:i.ruleForm.endLocation,callback:function(e){i.$set(i.ruleForm,"endLocation",e)},expression:"ruleForm.endLocation"}}):n("vregion",{staticClass:"form-control",attrs:{ui:!0,ifAera:!0},on:{values:i.regionChangeEnd,testCity:function(e){i.ifProvice("endLocation")}}},[n("el-input",{attrs:{placeholder:"请选择到站"},model:{value:i.ruleForm.endLocation,callback:function(e){i.$set(i.ruleForm,"endLocation",e)},expression:"ruleForm.endLocation"}})],1)],1),i._v(" "),n("el-form-item",{attrs:{label:"联系人：",prop:"rangeToContacts","label-width":"100px"}},[n("el-input",{attrs:{maxlength:10,disabled:i.unable},model:{value:i.ruleForm.rangeToContacts,callback:function(e){i.$set(i.ruleForm,"rangeToContacts",e)},expression:"ruleForm.rangeToContacts"}})],1),i._v(" "),n("el-form-item",{attrs:{label:"联系电话：",prop:"rangeToMobile","label-width":"100px"}},[n("div",[n("input",{directives:[{name:"number-only",rawName:"v-number-only"}],staticClass:"nativeinput nativeinput-border",attrs:{maxlength:11,"auto-complete":"off",clearable:"",disabled:i.unable,type:"text"},domProps:{value:i.ruleForm.rangeToMobile},on:{change:function(e){i.setInputVal(e.target.value,i.ruleForm,"rangeToMobile")}}})])])],1),i._v(" "),n("div",{staticClass:"information priceTime"},[n("h2",[i._v("价格时效")]),i._v(" "),n("el-form-item",{attrs:{label:"运输时效：",prop:"transportAging"}},[2===i.ruleForm.transportAgingType?n("span",[n("input",{directives:[{name:"number-only",rawName:"v-number-only"}],staticClass:"nativeinput nativeinput-border",attrs:{maxlength:2,"auto-complete":"off",clearable:"",disabled:i.unable,type:"text"},domProps:{value:i.ruleForm.transportAging1},on:{change:function(e){i.setInputVal(e.target.value,i.ruleForm,"transportAging1")}},nativeOn:{keyup:function(e){return i.handlerChoose(e)}}}),i._v("-"),n("input",{directives:[{name:"number-only",rawName:"v-number-only"}],staticClass:"nativeinput nativeinput-border",attrs:{maxlength:2,"auto-complete":"off",clearable:"",disabled:i.unable,type:"text"},domProps:{value:i.ruleForm.transportAging2},on:{change:function(e){i.setInputVal(e.target.value,i.ruleForm,"transportAging2")}},nativeOn:{keyup:function(e){return i.handlerChoose(e)}}})]):n("span",[n("input",{directives:[{name:"number-only",rawName:"v-number-only"}],staticClass:"nativeinput nativeinput-border",attrs:{maxlength:2,"auto-complete":"off",clearable:"",disabled:i.unable,type:"text"},domProps:{value:i.ruleForm.transportAging},on:{change:function(e){i.setInputVal(e.target.value,i.ruleForm,"transportAging")}},nativeOn:{keyup:function(e){return i.handlerChoose(e)}}})]),i._v(" "),n("el-radio-group",{attrs:{disabled:i.unable},model:{value:i.ruleForm.transportAgingType,callback:function(e){i.$set(i.ruleForm,"transportAgingType",e)},expression:"ruleForm.transportAgingType"}},[n("el-radio",{attrs:{label:0}},[i._v("天")]),i._v(" "),n("el-radio",{attrs:{label:1}},[i._v("小时")]),i._v(" "),n("el-radio",{attrs:{label:2}},[i._v("多天")])],1),i._v(" "),n("span",{staticClass:"supplement"},[i._v("(多天填写如：2-5，其它只能填写阿拉伯数字)")])],1),i._v(" "),n("el-form-item",{attrs:{label:"重货价格：",prop:"weigthPriceForms"}},[n("p",[i._v("(阶梯价格最大值不填，代表无穷大，例如：500-，代表500公斤以上)")]),i._v(" "),n("div",{staticClass:"goodsPriceChoose"},[n("p",[n("span",[i._v("运量")]),i._v(" "),n("span",[i._v("原报价 "),n("strong",[i._v("(必填)")])])]),i._v(" "),i._l(i.weigthPriceForms,function(t,r){return n("ul",{key:r},[n("li",[n("el-input",{directives:[{name:"numberOnly",rawName:"v-numberOnly"}],attrs:{placeholder:"包含",maxlength:"7",disabled:""},model:{value:t.startVolume,callback:function(e){i.$set(t,"startVolume",i._n(e))},expression:"form.startVolume"}}),i._v(" "),n("span",[i._v("----")]),i._v(" "),n("input",{directives:[{name:"number-only",rawName:"v-number-only"}],staticClass:"nativeinput nativeinput-border",attrs:{maxlength:7,placeholder:"不包含","auto-complete":"off",clearable:"",disabled:i.unable,type:"text"},domProps:{value:t.endVolume},on:{change:function(e){i.setInputVal(e.target.value,t,"endVolume"),i.ifWrong(i.weigthPriceForms,r)}}}),i._v("\n                          公斤\n                      ")],1),i._v(" "),n("li",[n("input",{directives:[{name:"number-only",rawName:"v-number-only:point",arg:"point"}],staticClass:"nativeinput nativeinput-border",attrs:{maxlength:7,"auto-complete":"off",clearable:"",disabled:i.unable,type:"text"},domProps:{value:t.primeryPrice},on:{change:function(e){i.setInputVal(e.target.value,t,"primeryPrice"),i.ifWrong(i.weigthPriceForms,r)}}}),i._v("\n                          元/公斤\n                      ")]),i._v(" "),i.unable?i._e():n("li",{staticClass:"buttons"},[r==i.weigthPriceForms.length-1&&4!=r?n("span",{staticClass:"addItem",on:{click:function(e){i.addItem("weight",r,t)}}}):i._e(),i._v(" "),r==i.weigthPriceForms.length-1&&1!=i.weigthPriceForms.length?n("span",{staticClass:"reduceItem",on:{click:function(e){i.reduceItem(r,"weight")}}}):i._e()])])})],2)]),i._v(" "),n("el-form-item",{attrs:{label:"轻货价格：",prop:"ligthPriceForms"}},[n("p",[i._v("(阶梯价格最大值不填，代表无穷大，例如：10-，代表10立方以上)")]),i._v(" "),n("div",{staticClass:"goodsPriceChoose"},[n("p",[n("span",[i._v("运量")]),i._v(" "),n("span",[i._v("原报价 "),n("strong",[i._v("(必填)")])])]),i._v(" "),i._l(i.ligthPriceForms,function(t,r){return n("ul",{key:r},[n("li",[n("el-input",{directives:[{name:"numberOnly",rawName:"v-numberOnly"}],attrs:{placeholder:"包含",maxlength:"7",disabled:""},model:{value:t.startVolume,callback:function(e){i.$set(t,"startVolume",i._n(e))},expression:"form.startVolume"}}),i._v(" "),n("span",[i._v("----")]),i._v(" "),n("input",{directives:[{name:"number-only",rawName:"v-number-only"}],staticClass:"nativeinput nativeinput-border",attrs:{maxlength:7,placeholder:"不包含","auto-complete":"off",clearable:"",disabled:i.unable,type:"text"},domProps:{value:t.endVolume},on:{change:function(e){i.setInputVal(e.target.value,t,"endVolume"),i.ifWrong(i.ligthPriceForms,r)}}}),i._v("\n                          立方\n                      ")],1),i._v(" "),n("li",[n("input",{directives:[{name:"number-only",rawName:"v-number-only:point",arg:"point"}],staticClass:"nativeinput nativeinput-border",attrs:{maxlength:7,"auto-complete":"off",clearable:"",disabled:i.unable,type:"text"},domProps:{value:t.primeryPrice},on:{change:function(e){i.setInputVal(e.target.value,t,"primeryPrice"),i.ifWrong(i.ligthPriceForms,r)}}}),i._v("\n                          元/立方\n                      ")]),i._v(" "),i.unable?i._e():n("li",{staticClass:"buttons"},[r==i.ligthPriceForms.length-1&&4!=r?n("span",{staticClass:"addItem",on:{click:function(e){i.addItem("light",r,t)}}}):i._e(),i._v(" "),r==i.ligthPriceForms.length-1&&1!=i.ligthPriceForms.length?n("span",{staticClass:"reduceItem",on:{click:function(e){i.reduceItem(r,"light")}}}):i._e()])])})],2)]),i._v(" "),n("el-form-item",{attrs:{label:"最低一票价格：",prop:"lowerPrice"}},[n("div",[n("input",{directives:[{name:"number-only",rawName:"v-number-only:point1",arg:"point1"}],staticClass:"nativeinput nativeinput-border",attrs:{maxlength:6,"auto-complete":"off",clearable:"",placeholder:"报价",disabled:i.unable,type:"text"},domProps:{value:i.ruleForm.lowerPrice},on:{change:function(e){i.setInputVal(e.target.value,i.ruleForm,"lowerPrice")}}}),i._v(" 元")])]),i._v(" "),n("el-form-item",{attrs:{label:"价格预警设置："}},[n("ul",[n("li",[i._v("在参考价上下幅度 "),n("div",{staticClass:"el-input-group"},[n("input",{directives:[{name:"numberOnly",rawName:"v-numberOnly"}],staticClass:"nativeinput nativeinput-border",attrs:{disabled:i.unable,placeholder:"",maxlength:7,"auto-complete":"off",clearable:"",type:"text"},domProps:{value:i.ruleForm.priceNormal},on:{blur:i.checkPrice,change:function(e){i.setInputVal(e.target.value,i.ruleForm,"priceNormal")}}}),i._v(" "),n("div",{staticClass:"el-input-group__append"},[i._v("%")])]),i._v(" 元 为正常")]),i._v(" "),n("li",[i._v("在参考价上下幅度 "),n("div",{staticClass:"el-input-group"},[n("input",{directives:[{name:"numberOnly",rawName:"v-numberOnly"}],staticClass:"nativeinput nativeinput-border",attrs:{disabled:i.unable,placeholder:"",maxlength:7,"auto-complete":"off",clearable:"",type:"text"},domProps:{value:i.ruleForm.priceAbnormal},on:{blur:i.checkPrice,change:function(e){i.setInputVal(e.target.value,i.ruleForm,"priceAbnormal")}}}),i._v(" "),n("div",{staticClass:"el-input-group__append"},[i._v("%")])]),i._v(" 元 为异常")]),i._v(" "),n("li",[i._v("在参考价上下幅度 "),n("div",{staticClass:"el-input-group"},[n("input",{directives:[{name:"numberOnly",rawName:"v-numberOnly"}],staticClass:"nativeinput nativeinput-border",attrs:{placeholder:"",maxlength:7,"auto-complete":"off",clearable:"",disabled:"",type:"text"},domProps:{value:i.ruleForm.priceBigabnormal},on:{blur:i.checkPrice,change:function(e){i.setInputVal(e.target.value,i.ruleForm,"priceBigabnormal")}}}),i._v(" "),n("div",{staticClass:"el-input-group__append"},[i._v("%")])]),i._v(" 元以上 严重异常")])])]),i._v(" "),n("el-form-item",{staticClass:"textarea",attrs:{label:"线路说明：",prop:"transportRemark"}},[n("el-input",{attrs:{type:"textarea",disabled:i.unable,autosize:{minRows:3,maxRows:10},maxlength:500,placeholder:"请填写备注30-500个字。提供原创说明有助于提升线路效果。"},model:{value:i.ruleForm.transportRemark,callback:function(e){i.$set(i.ruleForm,"transportRemark",e)},expression:"ruleForm.transportRemark"}}),i._v(" "),n("span",[i._v(i._s(i.ruleForm.transportRemark.length)+" / 500")]),i._v(" "),n("p",{staticClass:"supplement"},[i._v("请对您的线路进行补充说明，尽量使用市场上或物流行业内的常用词。")])],1)],1),i._v(" "),n("el-form-item",{directives:[{name:"show",rawName:"v-show",value:2!=i.ifShowRangeType,expression:"ifShowRangeType != 2"}],staticClass:"fromfooter"},[n("el-button",{attrs:{type:"info"},on:{click:function(e){i.resetForm("ruleForm")}}},[i._v("重置")]),i._v(" "),"1"==i.ifShowRangeType?n("el-button",{attrs:{type:"primary"},on:{click:function(e){i.submitForm("ruleForm")}}},[i._v("修改")]):n("el-button",{attrs:{type:"primary"},on:{click:function(e){i.submitForm("ruleForm")}}},[i._v("立即发布")])],1)],1)],1)},staticRenderFns:[]};t.a=i},gBtx:function(e,t,r){e.exports={default:r("qrpI"),__esModule:!0}},hyta:function(e,t){e.exports="\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff"},mcg1:function(e,t,r){"use strict";var i=r("oCPT"),n=r("7sm4");var a=function(e){r("Q9eS")},o=r("VU/8")(i.a,n.a,a,null,null);t.a=o.exports},mnVu:function(e,t,r){var o=r("kM2E"),i=r("52gC"),s=r("S82l"),l=r("hyta"),n="["+l+"]",a=RegExp("^"+n+n+"*"),c=RegExp(n+n+"*$"),u=function(e,t,r){var i={},n=s(function(){return!!l[e]()||"​"!="​"[e]()}),a=i[e]=n?t(m):l[e];r&&(i[r]=a),o(o.P+o.F*n,"String",i)},m=u.trim=function(e,t){return e=String(i(e)),1&t&&(e=e.replace(a,"")),2&t&&(e=e.replace(c,"")),e};e.exports=u},oCPT:function(e,t,r){"use strict";var i=r("//Fk"),a=r.n(i),n=r("gBtx"),o=r.n(n),s=r("fZjL"),l=r.n(s),c=r("t5DY"),u=r("/OH/"),m=r("UZPH");t.a={name:"vregion",components:{"v-dropdown":u.a},props:{blank:{type:Boolean,default:!0},province:{type:Boolean,default:!0},city:{type:Boolean,default:!0},area:{type:Boolean,default:!0},town:{type:Boolean,default:!1},i18n:{type:String,default:"cn"},selected:Object,ui:{type:Boolean,default:!1},search:{type:Boolean,default:!0},text:{type:Boolean,default:!1},ifAera:{type:Boolean,default:!1}},data:function(){return{listProvince:[],listCity:[],listArea:[],listTown:[],nowProvince:"",nowCity:"",nowArea:"",nowTown:"",haveCity:!0,className:"",lang:{},init:this.selected,pauseWatch:!1,query:"",levels:[{index:0,title:"省/直辖市"},{index:1,title:"市"},{index:2,title:"区/县"},{index:3,title:"乡/镇/街道"}],levelIndex:-1,list:[],itemProvince:null,itemCity:null,itemArea:null,itemTown:null}},watch:{query:function(t){var e=this.getList(this.levelIndex),r=[];0===(r=e.filter(function(e){return e.value.toLowerCase().includes(t.toLowerCase())})).length&&(r=e.filter(function(e){return e.key.includes(t)})),this.list=r},nowProvince:function(r){var i=this;this.pauseWatch||this.city&&this.fetchCity(r,"city").then(function(e){if(e.code===i.nowProvince){var t=e.data;i.listArea.length&&i.listArea.splice(0,i.listArea.length),i.listCity=t,i.nowCity="",i.haveCity||(i.nowArea=""),i.itemProvince=i.listProvince.find(function(e){return e.key===r}),i.haveCity=!!i.listCity.length,i.$nextTick(function(){!i.haveCity&&i.area?i.changeCity():i.initSelected(2),i.ui&&(i.levelIndex=i.haveCity?1:2)}),i.changeValues()}})},nowCity:function(t){this.pauseWatch||(this.changeCity(),this.itemCity=this.listCity.find(function(e){return e.key===t}),this.ui&&(this.levelIndex=2),this.changeValues())},nowArea:function(t){if(!this.pauseWatch){if(t&&this.town){var e=[];this.listTown=e}else this.listTown=[];this.town&&(this.nowTown=""),console.log("nowArea:",t,this.listArea),this.itemArea=this.listArea.find(function(e){return e.key===t}),this.initSelected(4),this.ui&&this.town&&(this.levelIndex=3),this.changeValues()}},nowTown:function(t){this.pauseWatch||(this.itemTown=this.listTown.find(function(e){return e.key===t}),this.changeValues())},selected:{handler:function(e){e&&l()(e).length&&(this.init=e,this.initSelected(1))},deep:!0},levelIndex:function(e){this.list=this.getList(e)}},methods:{hidedropdown:function(e){this.showDropdown(!1),this.$emit("hidedropdown",e)},changeCity:function(){var r=this;if(this.area||!this.haveCity&&this.province){if(this.haveCity&&!this.nowCity||!this.haveCity&&!this.nowProvince)console.log("2222222222:",this.haveCity,this.nowProvince,this.nowCity),this.listArea=[];else{var e=o()(this.haveCity?this.nowCity:this.nowProvince),i=this.haveCity;this.fetchCity(e).then(function(e){var t=e.data;if(i){if(r.nowCity!==e.code)return}else if(r.nowProvince!==e.code)return;r.listArea=t,console.log("333333333:",r.haveCity,r.nowProvince,r.nowCity,i,e.code,t),t.length&&(r.list=r.getList(2),r.initSelected(3))})}this.nowArea=""}else this.initSelected(3)},changeValues:function(){var e=this;this.$nextTick(function(){e.$emit("values",{province:e.itemProvince,city:e.itemCity,area:e.itemArea,town:e.itemTown})})},initSelected:function(e){var t=this,r=this.init,i=0;if(r&&l()(r).length){switch(e){case 1:t.province&&r.province&&(t.nowProvince=r.province);break;case 2:t.city&&r.city&&(t.nowCity=r.city);break;case 3:t.area&&r.area&&(t.nowArea=r.area);break;case 4:t.town&&r.town&&(t.nowTown=r.town)}t.province&&r.province&&i++,t.city&&(r.city||!r.city&&!t.haveCity&&t.area&&r.area)&&i++,t.area&&r.area&&i++,t.town&&r.town&&i++,e===i&&(this.init=null)}},getList:function(e){var t=[];switch(e){case 0:t=this.listProvince;break;case 1:t=this.listCity;break;case 2:t=this.listArea;break;case 3:t=this.listTown}return t},checkAvailable:function(e){var t=!1;switch(e){case 0:this.province&&(t=!0);break;case 1:this.city&&this.haveCity&&(t=!0);break;case 2:this.area&&(t=!0);break;case 3:this.town&&(t=!0)}return t},matchItem:function(e){return e.key===this.nowProvince||e.key===this.nowCity||e.key===this.nowArea||e.key===this.nowTown},itemSelect:function(e){switch(console.log("223434343",e),this.levelIndex){case 0:this.nowProvince=e.key,this.itemProvince=e,console.log("111111",e);break;case 1:this.nowCity=e.key,this.itemCity=e;break;case 2:this.nowArea=e.key,this.itemArea=e;break;case 3:this.nowTown=e.key,this.itemTown=e}},showDropdown:function(e){var t=this;if(console.log(e),"boolean"==typeof e){var r=this;this.$refs.dropdown.$emit("show",e,this.$refs.caller);var i=!1;!1===e&&this.ifAera&&(["北京","天津","重庆","上海","香港","澳门","台湾"].forEach(function(e){0===t.itemProvince.name.indexOf(e)&&(i=!0)}),null==this.itemCity&&!1===i&&this.$emit("testCity")),e&&(this.query="",this.$nextTick(function(){return r.$refs.input.focus({preventScroll:!0})}))}},clear:function(){var e=this;this.pauseWatch=!0,this.nowProvince="",this.nowCity="",this.nowArea="",this.nowTown="",this.itemProvince=null,this.itemCity=null,this.itemArea=null,this.itemTown=null,this.listCity=[],this.listArea=[],this.listTown=[],this.levelIndex=0,this.$nextTick(function(){e.pauseWatch=!1,e.changeValues()})},fetchCity:function(){var r=this,i=0<arguments.length&&void 0!==arguments[0]?arguments[0]:0,n=arguments[1];return new a.a(function(t){if("city"===n){var e=void 0;if(11e4===i&&(e="北京"),12e4===i&&(e="天津"),31e4===i&&(e="上海"),5e5===i&&(e="重庆"),81e4===i&&(e="香港"),82e4===i&&(e="澳门"),e)return t({code:i,data:[{key:i,value:e,id:i,name:e}]})}return Object(c.c)(i).then(function(e){return e.code=e.data.pid,e.data=e.data.regionQueryList,e.data=r.formatCity(e.data),t(e),e}).catch(function(e){console.log("err:",e),t({code:i,data:[]})})})},formatCity:function(e){return e.map(function(e){return e.key=e.id,e.value=e.name,e})}},beforeMount:function(){this.lang=m.a[this.i18n]},mounted:function(){var r=this;this.fetchCity().then(function(e){console.log("fetchCity::",e);var t=e.data.filter(function(e){return e});r.listProvince=r.ui?t.concat().sort(function(e,t){var r=e.value.length-t.value.length;return 0===r?Number(e.key)-Number(t.key):r}):t.concat(),r.className=r.$el.className,r.$el.className="v-region",r.selected&&r.selected.province&&(r.nowProvince=r.selected.province),r.ui&&(r.levelIndex=0)})}}},qbYK:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=r("GZk5"),n=r("ekXy");var a=function(e){r("Ek2E")},o=r("VU/8")(i.a,n.a,a,null,null);t.default=o.exports},qrpI:function(e,t,r){r("8sHD"),e.exports=r("FeBl").Number.parseInt},xoQy:function(e,t,r){"use strict";t.a={name:"v-dropdown",props:{position:{type:String,default:"left"}},data:function(){return{show:!1,styleSheet:{top:"",left:""}}},watch:{},methods:{visible:function(e,t){if("boolean"==typeof e){this.show=e;var r=this;this.$nextTick(function(){r.show&&r.adjust(t)})}},adjust:function(e){var t=e.getBoundingClientRect(),r=0,i=0,n=this.$el.getBoundingClientRect(),a=window.scrollY,o=document.body.clientHeight;if(this.rightClick){var s=this.y;this.y+n.height>a+o&&(s=this.y-n.height),i=this.x,r=s}else switch(r=t.top+t.height+5+a,this.position){case"left":i=t.left;break;case"center":i=t.left+t.width/2-n.width/2;break;case"right":i=t.left+t.width-n.width}this.styleSheet.top=r+"px",this.styleSheet.left=i+"px"},whole:function(e){this.show&&(-1===e.path.findIndex(function(e){return e.className&&e.className.includes("v-dropdown-container")})&&(this.show=!1,this.$emit("hidedropdown",!0)))}},mounted:function(){this.$on("show",this.visible),document.addEventListener("mousedown",this.whole)},destroyed:function(){this.$off("show",this.visible),document.removeEventListener("mousedown",this.whole)}}},z6yh:function(e,t){}});