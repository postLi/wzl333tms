webpackJsonp([202,285],{"2IIl":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=r("anTx"),n=r("6+Yw");var a=function(e){r("rY5f")},o=r("VU/8")(i.a,n.a,a,null,null);t.default=o.exports},"6+Yw":function(e,t,r){"use strict";var i={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"tab-content chartSender"},[r("SearchForm",{attrs:{orgid:t.otherinfo.orgid,btnsize:t.btnsize},on:{change:t.getSearchParam}}),t._v(" "),r("div",{staticClass:"tab_info"},[r("div",{staticClass:"btns_box"},[r("el-button",{directives:[{name:"has",rawName:"v-has:REPORT_PRINT_4",arg:"REPORT_PRINT_4"}],attrs:{type:"primary",size:t.btnsize,icon:"el-icon-printer",plain:""},on:{click:function(e){t.doAction("print")}}},[t._v("打印报表")]),t._v(" "),r("el-button",{attrs:{type:"primary",size:t.btnsize,icon:"el-icon-printer",plain:""},on:{click:function(e){t.doAction("export")}}},[t._v("导出报表")])],1),t._v(" "),t._m(0)])],1)},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"info_tab_report",attrs:{id:"report_operation"}},[t("table",{attrs:{id:"report_operation_table"}})])}]};t.a=i},"6b+M":function(e,t,r){"use strict";t.c=function(e){return i.b.get("/api-finance/finance/report/v1/FeeAggregation?orgId="+e.orgId+"&startTime="+e.startTime+"&endTime="+e.endTime+"&typeIds="+e.typeIds+"&senderId="+e.senderId).then(function(e){return e.data||{list:[],totalCount:0}})},t.d=function(e){return i.b.get("/api-finance/finance/report/v1/dateReport?currentPage="+e.currentPage+"&pageSize="+e.pageSize+"&createTimeStart="+e.createTimeStart+"&createTimeEnd="+e.createTimeEnd+"&shipFromOrgid="+e.shipFromOrgid+"&senderCustomerName="+e.senderCustomerName).then(function(e){return e.data})},t.e=function(e){return i.b.get("/api-finance/finance/report/v1/turnoverReport?createTimeStart="+e.createTimeStart+"&createTimeEnd="+e.createTimeEnd+"&shipFromOrgid="+e.shipFromOrgid).then(function(e){return e.data})},t.b=function(e){return i.b.get("/api-finance/finance/report/v1/findOperationReport?startTime="+e.startTime+"&endTime="+e.endTime+"&orgId="+e.orgId+"&selectType="+e.selectType+"&shipToCityName="+e.shipToCityName+"&businessType="+e.businessType).then(function(e){return e.data})},t.a=function(e){return i.b.get("/api-finance/finance/report/v1/findDetail?startCreatTime="+e.startCreatTime+"&endCreatTime="+e.endCreatTime+"&shipFromOrgid="+e.shipFromOrgid).then(function(e){return e.data})};var i=r("Vo7i")},"7kH5":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=r("iz4D"),n=r("Xkbo"),a=r("VU/8")(i.a,n.a,null,null,null);t.default=a.exports},Xkbo:function(e,t,r){"use strict";var i={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("el-form",{ref:"searchForm",staticClass:"staff_searchinfo clearfix",attrs:{inline:!0,size:t.btnsize,"label-position":"right",rules:t.rules,model:t.searchForm,"label-width":"80px"}},[r("div",{staticClass:"staff_searchinfo--input"},[r("el-form-item",{attrs:{label:"时间"}},[r("el-date-picker",{attrs:{"default-value":t.defaultTime,type:"daterange",align:"right","value-format":"yyyy-MM-dd","start-placeholder":"开始日期","picker-options":t.pickerOptions,"end-placeholder":"结束日期"},on:{focus:function(e){t.hideIframe(!0)},blur:function(e){t.hideIframe(!1)}},model:{value:t.searchTime,callback:function(e){t.searchTime=e},expression:"searchTime"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"网点",prop:"orgId"}},[r("SelectTree",{attrs:{focus:function(){t.hideIframe(!0)}},on:{change:function(){t.hideIframe(!1)}},model:{value:t.searchForm.orgId,callback:function(e){t.$set(t.searchForm,"orgId",e)},expression:"searchForm.orgId"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"到达城市",prop:"shipToCityName"}},[r("el-input",{model:{value:t.searchForm.shipToCityName,callback:function(e){t.$set(t.searchForm,"shipToCityName",e)},expression:"searchForm.shipToCityName"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"时间类型",prop:"selectType"}},[r("el-select",{on:{focus:function(){t.hideIframe(!0)},change:function(){t.hideIframe(!1)}},model:{value:t.searchForm.selectType,callback:function(e){t.$set(t.searchForm,"selectType",e)},expression:"searchForm.selectType"}},t._l(t.selectType,function(e,t){return r("el-option",{key:e.key,attrs:{label:e.label,value:e.value}})}))],1),t._v(" "),r("el-form-item",{attrs:{label:"业务类型",prop:"businessType"}},[r("el-select",{on:{focus:function(){t.hideIframe(!0)},change:function(){t.hideIframe(!1)}},model:{value:t.searchForm.businessType,callback:function(e){t.$set(t.searchForm,"businessType",e)},expression:"searchForm.businessType"}},t._l(t.businessType,function(e,t){return r("el-option",{key:e.key,attrs:{label:e.label,value:e.value}})}))],1)],1),t._v(" "),r("el-form-item",{staticClass:"staff_searchinfo--btn"},[r("el-button",{attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v("查询")]),t._v(" "),r("el-button",{attrs:{type:"info",plain:""},on:{click:function(e){t.clearForm("searchForm")}}},[t._v("清空")])],1)],1)},staticRenderFns:[]};t.a=i},anTx:function(e,t,r){"use strict";var i=r("woOf"),n=r.n(i),a=r("Dd8w"),o=r.n(a),s=(r("E4LH"),r("NYxO")),c=(r("0xDb"),r("7kH5")),l=r("6b+M"),u=r("UQm2");t.a={components:{SearchForm:c.default},data:function(){return{chartIframe:"",hideiframe:"hide",query:{currentPage:1,pageSize:100},fontSizeHeadMini:2,bgcolorHead:"yellow",btnsize:"mini",isShow:!0,columns:[{label:"时间",prop:"time",textAlign:"center"},{label:"总运费(元)",prop:"shipFee",textAlign:"right"},{label:"件数",prop:"shipAmount",textAlign:"right"},{label:"重量(千克)",prop:"shipWeight",textAlign:"right"},{label:"体积(方)",prop:"shipVolume",textAlign:"right"}],countCol:[],countColVal:[]}},computed:o()({},Object(s.b)(["otherinfo"])),methods:{report:function(){var b=this;console.log("sdfsdf2347823748",this.query),Object(l.b)(this.query).then(function(e){var t=e,r=document.getElementById("report_operation_table");if(r){var i=r.getElementsByTagName("thead"),n=r.getElementsByTagName("tbody");0<i.length&&(r.removeChild(i[0]),r.removeChild(n[0]));var a=document.createElement("thead"),o=document.createElement("tbody"),s=document.createElement("tr");r.appendChild(a),r.appendChild(o),a.appendChild(s),r.style.borderCollapse="collapse",r.style.border="1px solid #d0d7e5",r.setAttribute("border","1"),r.setAttribute("font","12px"),r.setAttribute("width","780px"),s.setAttribute("height","32px"),s.setAttribute("width","100%");for(var c=0;c<b.columns.length;c++){var l=document.createElement("th"),u=document.createElement("font");u.innerHTML=b.columns[c].label,u.setAttribute("size",2),u.setAttribute("color","white"),l.setAttribute("border",1),l.setAttribute("bgcolor","dimGray"),l.appendChild(u),l.setAttribute("width",(b.columns[c].width||120)+"px"),s.appendChild(l)}for(var p=0;p<t.length;p++){console.log(p);for(var m=o.insertRow(),d=0;d<b.columns.length;d++){console.log("j",d,b.countCol);var h=m.insertCell();for(var f in b.countCol)-1!==b.columns[d].prop.indexOf(b.countCol[f])&&(t[p][b.columns[d].prop]=t[p][b.columns[d].prop]?t[p][b.columns[d].prop]:"0.00");h.innerHTML="id"===b.columns[d].prop||"序号"===b.columns[d].label?p+1:void 0===t[p][b.columns[d].prop]?"":t[p][b.columns[d].prop],h.style.textAlign=b.columns[d].textAlign,h.style.padding="2px 5px",h.style.fontSize="13px",h.style.width=(b.columns[d].width||120)+"px"}}}}).catch(function(e){b.loading=!1,b._handlerCatchMsg(e)})},doAction:function(e){switch(e){case"print":Object(u.f)({id:"report_operation",countCol:this.countCol});break;case"export":Object(u.i)({id:"report_operation",name:"营运统计分析",countCol:this.countCol})}},getSearchParam:function(e){this.query=n()(this.query,e),this.report()}}}},iz4D:function(e,t,r){"use strict";var i=r("woOf"),n=r.n(i),a=r("E4LH"),o=r("o9X6"),s=r("9UCZ"),c=r("0xDb");t.a={components:{SelectTree:o.a,SelectType:s.a},props:{btnsize:{type:String,default:"mini"},orgid:{type:Number}},data:function(){return{searchForm:{orgId:"",selectType:"",businessType:"",shipToCityName:""},businessType:[{value:0,label:"全部"},{value:1,label:"走货业务"},{value:2,label:"来货业务"}],selectType:[{value:1,label:"按月"},{value:2,label:"按日"}],rules:{shipSn:[{validator:function(e,t,r){var i=a.a.ONLY_NUMBER;""!==t&&null!==t&&t&&void 0!==t?i.test(t)?r():r(new Error("请输入最多15位数字")):r()},tigger:"blur"}]},searchTime:[Object(c.parseTime)(new Date-5184e6),Object(c.parseTime)(new Date)],defaultTime:[+new Date-5184e6,+new Date],pickerOptions:{shortcuts:c.pickerOptions2}}},mounted:function(){this.searchForm.orgId=this.orgid,this.searchForm.selectType=1,this.searchForm.businessType=1,this.onSubmit()},methods:{onSubmit:function(){var e=n()({},this.searchForm);this.searchTime&&(this.$set(e,"startTime",Object(c.parseTime)(this.searchTime[0],"{y}-{m}-{d} ")+"00:00:00"),this.$set(e,"endTime",Object(c.parseTime)(this.searchTime[1],"{y}-{m}-{d} ")+"23:59:59")),this.$emit("change",e)},hideIframe:function(e){this.$emit("hideIframe",e)},clearForm:function(e){var t=this;this.$nextTick(function(){n()(t.$data,t.$options.data()),t.$refs[e].resetFields(),t.searchForm.orgId=t.orgid})}}}},rY5f:function(e,t){}});