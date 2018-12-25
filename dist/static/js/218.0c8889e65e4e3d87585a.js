webpackJsonp([218,319],{"/wB2":function(e,t,r){"use strict";var i={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"tab-content chartSender"},[r("SearchForm",{attrs:{orgid:t.otherinfo.orgid,btnsize:t.btnsize},on:{change:t.getSearchParam}}),t._v(" "),r("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"tab_info"},[r("div",{staticClass:"btns_box"},[r("el-button",{directives:[{name:"has",rawName:"v-has:REPORT_PRINT_5",arg:"REPORT_PRINT_5"}],attrs:{type:"primary",size:t.btnsize,icon:"el-icon-printer",plain:""},on:{click:function(e){t.doAction("print")}}},[t._v("打印报表")]),t._v(" "),r("el-button",{attrs:{type:"primary",size:t.btnsize,icon:"el-icon-printer",plain:""},on:{click:function(e){t.doAction("export")}}},[t._v("导出报表")])],1),t._v(" "),t._m(0)])],1)},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"info_tab_report_incomeTotal",attrs:{id:"report_incomeTotal"}},[t("table",{attrs:{id:"report_incomeTotal_table"}})])}]};t.a=i},"6b+M":function(e,t,r){"use strict";t.c=function(e){return i.b.get("/api-finance/finance/report/v1/FeeAggregation?orgId="+e.orgId+"&startTime="+e.startTime+"&endTime="+e.endTime+"&typeIds="+e.typeIds+"&senderId="+e.senderId).then(function(e){return e.data||{list:[],totalCount:0}})},t.d=function(e){return i.b.get("/api-finance/finance/report/v1/dateReport?currentPage="+e.currentPage+"&pageSize="+e.pageSize+"&createTimeStart="+e.createTimeStart+"&createTimeEnd="+e.createTimeEnd+"&shipFromOrgid="+e.shipFromOrgid+"&senderCustomerName="+e.senderCustomerName).then(function(e){return e.data})},t.e=function(e){return i.b.get("/api-finance/finance/report/v1/turnoverReport?createTimeStart="+e.createTimeStart+"&createTimeEnd="+e.createTimeEnd+"&shipFromOrgid="+e.shipFromOrgid).then(function(e){return e.data})},t.b=function(e){return i.b.get("/api-finance/finance/report/v1/findOperationReport?startTime="+e.startTime+"&endTime="+e.endTime+"&orgId="+e.orgId+"&selectType="+e.selectType+"&shipToCityName="+e.shipToCityName+"&businessType="+e.businessType).then(function(e){return e.data})},t.a=function(e){return i.b.get("/api-finance/finance/report/v1/findDetail?startCreatTime="+e.startCreatTime+"&endCreatTime="+e.endCreatTime+"&shipFromOrgid="+e.shipFromOrgid).then(function(e){return e.data})};var i=r("Vo7i")},R2ba:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=r("XzOO"),n=r("/wB2");var a=function(e){r("axkB")},o=r("VU/8")(i.a,n.a,a,null,null);t.default=o.exports},XzOO:function(e,t,r){"use strict";var i=r("woOf"),n=r.n(i),a=r("Dd8w"),o=r.n(a),s=(r("E4LH"),r("NYxO")),c=(r("0xDb"),r("jnQ6")),l=r("6b+M"),d=r("UQm2");t.a={components:{SearchForm:c.default},data:function(){return{loading:!0,chartIframe:"",hideiframe:"hide",query:{currentPage:1,pageSize:100},fontSizeHeadMini:2,bgcolorHead:"yellow",btnsize:"mini",isShow:!0,columns:[{label:"总收入(元)",prop:"totalFee",textAlign:"right"},{label:"现付(元)",prop:"nowPayFee",textAlign:"right"},{label:"到付(元)",prop:"arrivePayFee",textAlign:"right"},{label:"回单付(元)",prop:"receiptPayFee",textAlign:"right"},{label:"月结(元)",prop:"monthPayFee",textAlign:"right"},{label:"异动费用(元)",prop:"changeFee",textAlign:"right"}],countCol:[],countColVal:[]}},computed:o()({},Object(s.b)(["otherinfo"])),methods:{report:function(){var h=this;this.loading=!0,Object(l.a)(this.query).then(function(e){var t=e;h.loading=!1;var r=document.getElementById("report_incomeTotal_table");if(r){var i=r.getElementsByTagName("thead"),n=r.getElementsByTagName("tbody");0<i.length&&(r.removeChild(i[0]),r.removeChild(n[0]));var a=document.createElement("thead"),o=document.createElement("tbody"),s=document.createElement("tr");r.appendChild(a),r.appendChild(o),a.appendChild(s),r.style.borderCollapse="collapse",r.style.border="1px solid #d0d7e5",r.setAttribute("border","1"),r.setAttribute("font","12px"),r.setAttribute("width","780px"),s.setAttribute("height","32px"),s.setAttribute("width","100%");for(var c=0;c<h.columns.length;c++){var l=document.createElement("th"),d=document.createElement("font");d.innerHTML=h.columns[c].label,d.setAttribute("size",2),d.setAttribute("color","white"),l.setAttribute("border",1),l.setAttribute("bgcolor","dimGray"),l.appendChild(d),s.appendChild(l)}var m=o.insertRow();for(var u in h.columns){var p=m.insertCell();console.log(t[h.columns[u].prop],t),p.innerHTML=t[h.columns[u].prop]?Number(t[h.columns[u].prop]).toFixed(2):"0.00",p.style.textAlign=h.columns[u].textAlign,p.style.padding="2px 5px",p.style.fontSize="13px"}}}).catch(function(e){h.loading=!1,h._handlerCatchMsg(e)})},doAction:function(e){switch(e){case"print":Object(d.e)({id:"report_incomeTotal",countCol:this.countCol});break;case"export":Object(d.h)({id:"report_incomeTotal",name:"收入统计",countCol:this.countCol})}},getSearchParam:function(e){this.query=n()(this.query,e),this.report()}}}},axkB:function(e,t){},j1X1:function(e,t,r){"use strict";var i={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("el-form",{ref:"searchForm",staticClass:"staff_searchinfo clearfix",attrs:{inline:!0,size:t.btnsize,"label-position":"right",rules:t.rules,model:t.searchForm,"label-width":"80px"}},[r("div",{staticClass:"staff_searchinfo--input"},[r("el-form-item",{attrs:{label:"开单时间"}},[r("el-date-picker",{attrs:{"default-value":t.defaultTime,type:"daterange",align:"right","value-format":"yyyy-MM-dd","start-placeholder":"开始日期","picker-options":t.pickerOptions,"end-placeholder":"结束日期"},on:{focus:function(e){t.hideIframe(!0)},blur:function(e){t.hideIframe(!1)}},model:{value:t.searchTime,callback:function(e){t.searchTime=e},expression:"searchTime"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"开单网点",prop:"shipFromOrgid"}},[r("SelectTree",{attrs:{focus:function(){t.hideIframe(!0)},orgid:t.otherinfo.orgid},on:{change:function(){t.hideIframe(!1)}},model:{value:t.searchForm.shipFromOrgid,callback:function(e){t.$set(t.searchForm,"shipFromOrgid",e)},expression:"searchForm.shipFromOrgid"}})],1)],1),t._v(" "),r("el-form-item",{staticClass:"staff_searchinfo--btn"},[r("el-button",{attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v("查询")]),t._v(" "),r("el-button",{attrs:{type:"info",plain:""},on:{click:function(e){t.clearForm("searchForm")}}},[t._v("清空")])],1)],1)},staticRenderFns:[]};t.a=i},jnQ6:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=r("y6c7"),n=r("j1X1"),a=r("VU/8")(i.a,n.a,null,null,null);t.default=a.exports},y6c7:function(e,t,r){"use strict";var i=r("woOf"),n=r.n(i),a=r("E4LH"),o=r("o9X6"),s=r("pAQG"),c=r("0xDb");t.a={components:{SelectTree:o.a,querySelect:s.a},props:{btnsize:{type:String,default:"mini"},orgid:{type:Number}},data:function(){return{searchForm:{shipFromOrgid:""},rules:{shipSn:[{validator:function(e,t,r){var i=a.a.ONLY_NUMBER;""!==t&&null!==t&&t&&void 0!==t?i.test(t)?r():r(new Error("请输入最多15位数字")):r()},tigger:"blur"}]},searchTime:[Object(c.parseTime)(new Date-5184e6),Object(c.parseTime)(new Date)],defaultTime:[+new Date-5184e6,+new Date],pickerOptions:{shortcuts:c.pickerOptions2}}},mounted:function(){this.searchForm.shipFromOrgid=this.orgid,this.onSubmit()},methods:{onSubmit:function(){var e=n()({},this.searchForm);this.searchTime&&(this.$set(e,"startCreatTime",Object(c.parseTime)(this.searchTime[0],"{y}-{m}-{d}")),this.$set(e,"endCreatTime",Object(c.parseTime)(this.searchTime[1],"{y}-{m}-{d}"))),this.$emit("change",e)},hideIframe:function(e){this.$emit("hideIframe",e)},clearForm:function(e){var t=this;this.$nextTick(function(){n()(t.$data,t.$options.data()),t.$refs[e].resetFields(),t.searchForm.shipFromOrgid=t.orgid})}}}}});