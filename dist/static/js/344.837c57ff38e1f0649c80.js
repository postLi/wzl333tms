webpackJsonp([344],{"j/99":function(e,t,a){"use strict";var r=a("woOf"),s=a.n(r),i=a("E4LH"),n=a("o9X6"),o=a("9UCZ"),l=a("66wn"),c=a("0xDb");t.a={components:{SelectTree:n.a,SelectCity:l.a,SelectType:o.a},props:{btnsize:{type:String,default:"mini"},orgid:{type:Number},component:{type:String,default:""},type:String,title:String,status:String,issender:{type:Boolean,dafault:!1}},computed:{},data:function(){return{searchCreatTime:[],defaultTime:[Object(c.parseTime)(+new Date-5184e6,"{y}-{m}-{d}"),Object(c.parseTime)(new Date,"{y}-{m}-{d}")],thestatus:"",searchForm:{shipFromOrgid:"",shipSn:"",shipFromCityCode:"",shipFromCityName:"",shipToCityCode:"",shipToCityName:"",shipSenderId:"",recName:""},rules:{shipSn:[{required:!0,trigger:"blur",validator:function(e,t,a){""!==t&&null!==t&&t&&void 0!==t?i.a.ONLY_NUMBER_AND_LETTER.test(t)?a():a(new Error("只能输字母和数字")):a(new Error("请输入运单号"))}}]},pickerOptions2:{shortcuts:c.pickerOptions2}}},watch:{orgid:function(e){this.searchForm.orgid=e},component:{handler:function(e,t){},deep:!0},type:{handler:function(e){console.log(e),"rec_status"===e&&(this.thestatus=105),"accept_status"===e&&(this.thestatus=109),"send_status"===e&&(this.thestatus=107),"giveout_status"===e&&(this.thestatus=111)},immediate:!0}},mounted:function(){this.searchCreatTime=this.defaultTime,this.onSubmit()},methods:{getOrgid:function(e){this.searchForm.orgid=e},onSubmit:function(){this.searchForm.startTime=this.searchCreatTime?Object(c.parseTime)(this.searchCreatTime[0],"{y}-{m}-{d} ")+"00:00:00":"",this.searchForm.endTime=this.searchCreatTime?Object(c.parseTime)(this.searchCreatTime[1],"{y}-{m}-{d} ")+"23:59:59":"";var e=s()({},this.searchForm);e[this.status]=this.thestatus,this.$emit("change",e)},clearForm:function(){this.searchForm.shipSn="",this.searchForm.recName="",this.searchForm.sendName="",this.searchCreatTime=this.$options.data().searchCreatTime,this.searchForm.shipFromCityName="",this.searchForm.shipToCityName="",this.thestatus="",this.searchCreatTime=this.defaultTime}}}},qs7E:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("j/99"),s=a("rkFF"),i=a("VU/8")(r.a,s.a,null,null,null);t.default=i.exports},rkFF:function(e,t,a){"use strict";var r={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-form",{staticClass:"staff_searchinfo clearfix",attrs:{inline:!0,size:t.btnsize,"label-position":"right",rules:t.rules,model:t.searchForm,"label-width":"70px"}},[a("div",{staticClass:"staff_searchinfo--input"},[a("el-form-item",{attrs:{label:"开单时间"}},[a("div",{staticClass:"block"},[a("el-date-picker",{attrs:{"default-value":t.defaultTime,type:"daterange","unlink-panels":"",align:"right","value-format":"yyyy-MM-dd","start-placeholder":"开始日期","picker-options":t.pickerOptions2,"end-placeholder":"结束日期"},model:{value:t.searchCreatTime,callback:function(e){t.searchCreatTime=e},expression:"searchCreatTime"}})],1)]),t._v(" "),a("el-form-item",{attrs:{label:t.title+"状态",prop:"recStatus"}},[a("selectType",{attrs:{type:t.type},model:{value:t.thestatus,callback:function(e){t.thestatus=e},expression:"thestatus"}},["accept"!==t.component?a("el-option",{attrs:{slot:"head",label:"全部",value:""},slot:"head"}):t._e()],1)],1),t._v(" "),a("el-form-item",{attrs:{label:"运单号"}},[a("el-input",{attrs:{maxlength:20,"auto-complete":"off",clearable:""},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.onSubmit(e):null}},model:{value:t.searchForm.shipSn,callback:function(e){t.$set(t.searchForm,"shipSn",e)},expression:"searchForm.shipSn"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"发站"}},[a("el-input",{attrs:{maxlength:20,"auto-complete":"off",clearable:""},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.onSubmit(e):null}},model:{value:t.searchForm.shipFromCityName,callback:function(e){t.$set(t.searchForm,"shipFromCityName",e)},expression:"searchForm.shipFromCityName"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"到站"}},[a("el-input",{attrs:{maxlength:20,"auto-complete":"off",clearable:""},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.onSubmit(e):null}},model:{value:t.searchForm.shipToCityName,callback:function(e){t.$set(t.searchForm,"shipToCityName",e)},expression:"searchForm.shipToCityName"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"发货人"}},[a("el-input",{attrs:{maxlength:15,clearable:"","auto-complete":"off"},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.onSubmit(e):null}},model:{value:t.searchForm.sendName,callback:function(e){t.$set(t.searchForm,"sendName",e)},expression:"searchForm.sendName"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"收货人"}},[a("el-input",{attrs:{maxlength:15,clearable:"","auto-complete":"off"},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.onSubmit(e):null}},model:{value:t.searchForm.recName,callback:function(e){t.$set(t.searchForm,"recName",e)},expression:"searchForm.recName"}})],1)],1),t._v(" "),a("el-form-item",{staticClass:"staff_searchinfo--btn"},[a("el-button",{attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v("查询")]),t._v(" "),a("el-button",{attrs:{type:"info",plain:""},on:{click:t.clearForm}},[t._v("清空")])],1)],1)},staticRenderFns:[]};t.a=r}});