webpackJsonp([247],{"3oKu":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=r("b0gS"),a=r("EIn/");var s=function(e){r("R6cw")},o=r("VU/8")(i.a,a.a,s,null,null);t.default=o.exports},"EIn/":function(e,t,r){"use strict";var i={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("el-form",{staticClass:"staff_searchinfo clearfix",attrs:{inline:!0,size:t.btnsize,"label-position":"right",rules:t.rules,model:t.searchForm,"label-width":"70px"}},[r("div",{staticClass:"staff_searchinfo--input"},[r("el-form-item",{attrs:{label:"开单时间"}},[r("div",{staticClass:"block"},[r("el-date-picker",{attrs:{"default-value":t.defaultTime,type:"daterange",align:"right","value-format":"yyyy-MM-dd","start-placeholder":"开始日期","picker-options":t.pickerOptions2,"end-placeholder":"结束日期"},model:{value:t.searchCreatTime,callback:function(e){t.searchCreatTime=e},expression:"searchCreatTime"}})],1)]),t._v(" "),r("el-form-item",{attrs:{label:"开单网点"}},[r("SelectTree",{attrs:{orgid:t.otherinfo.orgid},model:{value:t.searchForm.shipFromOrgid,callback:function(e){t.$set(t.searchForm,"shipFromOrgid",e)},expression:"searchForm.shipFromOrgid"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"运单号",prop:"shipSn"}},[r("el-input",{attrs:{maxlength:20,"auto-complete":"off",clearable:""},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.onSubmit(e):null}},model:{value:t.searchForm.shipSn,callback:function(e){t.$set(t.searchForm,"shipSn",e)},expression:"searchForm.shipSn"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"出发城市"}},[r("el-input",{attrs:{maxlength:20,"auto-complete":"off",clearable:""},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.onSubmit(e):null}},model:{value:t.searchForm.shipFromCityName,callback:function(e){t.$set(t.searchForm,"shipFromCityName",e)},expression:"searchForm.shipFromCityName"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"到达城市"}},[r("el-input",{attrs:{maxlength:20,"auto-complete":"off",clearable:""},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.onSubmit(e):null}},model:{value:t.searchForm.shipToCityName,callback:function(e){t.$set(t.searchForm,"shipToCityName",e)},expression:"searchForm.shipToCityName"}})],1)],1),t._v(" "),r("el-form-item",{staticClass:"staff_searchinfo--btn"},[r("el-button",{attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v("查询")]),t._v(" "),r("el-button",{attrs:{type:"info",plain:""},on:{click:t.clearForm}},[t._v("清空")])],1)],1)},staticRenderFns:[]};t.a=i},R6cw:function(e,t){},b0gS:function(e,t,r){"use strict";var i=r("0xDb"),a=r("o9X6"),s=r("66wn");t.a={components:{SelectTree:a.a,SelectCity:s.a},props:{btnsize:{type:String,default:"mini"},orgid:{type:[Array,Number]},shipSn:{type:Number},issender:{type:Boolean,dafault:!1},allId:{type:Boolean,dafault:!1}},computed:{},data:function(){return{searchCreatTime:[],defaultTime:[Object(i.parseTime)(+new Date-5184e6,"{y}-{m}-{d}"),Object(i.parseTime)(new Date,"{y}-{m}-{d}")],pickerOptions1:"",searchForm:{shipFromOrgid:"",shipSn:"",shipFromCityName:"",shipToCityName:""},rules:{},pickerOptions2:{shortcuts:i.pickerOptions2}}},watch:{orgid:function(e){this.searchForm.shipFromOrgid=e},allId:function(e){}},mounted:function(){this.searchForm.shipFromOrgid=this.orgid,this.searchCreatTime=this.defaultTime,this.onSubmit()},methods:{onSubmit:function(){this.searchForm.startTime=this.searchCreatTime?Object(i.parseTime)(this.searchCreatTime[0],"{y}-{m}-{d} ")+"00:00:00":"",this.searchForm.endTime=this.searchCreatTime?Object(i.parseTime)(this.searchCreatTime[1],"{y}-{m}-{d} ")+"23:59:59":"";var e=Object(i.objectMerge2)({},this.searchForm);this.allId?e.shipFromOrgid=this.searchForm.shipFromOrgid:this.searchForm.shipFromOrgid?e.shipFromOrgid=[this.searchForm.shipFromOrgid]:delete e.shipFromOrgid,this.$emit("change",e)},clearForm:function(){this.searchForm.shipFromOrgid=this.orgid,this.searchForm.shipSn="",this.searchForm.shipFromCityName="",this.searchForm.shipToCityName="",this.searchForm.shipFromOrgid="",this.searchCreatTime=this.defaultTime}}}}});