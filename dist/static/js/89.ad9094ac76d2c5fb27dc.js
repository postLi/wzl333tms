webpackJsonp([89,217,231,319],{"2IIl":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n("anTx"),i=n("XgtD");var a=function(e){n("qo0w")},o=n("VU/8")(r.a,i.a,a,null,null);t.default=o.exports},"3HOR":function(e,t){},"4QOB":function(e,t,n){"use strict";var r={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"tab-content chartSender"},[n("SearchForm",{attrs:{orgid:t.otherinfo.orgid,btnsize:t.btnsize},on:{change:t.getSearchParam,hideIframe:t.hideIframe}}),t._v(" "),n("div",{staticClass:"tab_info"},[n("div",{staticClass:"btns_box"},[n("el-button",{directives:[{name:"has",rawName:"v-has:REPORT_PRINT_4",arg:"REPORT_PRINT_4"}],attrs:{type:"primary",size:t.btnsize,icon:"el-icon-printer",plain:""},on:{click:function(e){t.doAction("print")}}},[t._v("打印报表")]),t._v(" "),n("el-button",{directives:[{name:"has",rawName:"v-has:REPORT_VIEW_4",arg:"REPORT_VIEW_4"}],attrs:{type:"primary",size:t.btnsize,icon:"el-icon-view",plain:""},on:{click:function(e){t.doAction("preview")}}},[t._v("打印预览")]),t._v(" "),n("el-button",{directives:[{name:"has",rawName:"v-has:REPORT_SETTING_4",arg:"REPORT_SETTING_4"}],attrs:{type:"primary",size:t.btnsize,icon:"el-icon-setting",plain:""},on:{click:function(e){t.doAction("setting")}}},[t._v("打印设置")])],1),t._v(" "),n("div",{staticClass:"info_tab"},[n("iframe",{ref:"senderIframe",staticClass:"chartIframe",attrs:{src:t.chartIframe,id:"senderIframe",frameborder:"0",scrolling:"auto",name:"showHere"}})])])],1)},staticRenderFns:[]};t.a=r},"6b+M":function(e,t,n){"use strict";t.c=function(e){return r.b.get("/api-finance/finance/report/v1/FeeAggregation?orgId="+e.orgId+"&startTime="+e.startTime+"&endTime="+e.endTime+"&typeIds="+e.typeIds+"&senderId="+e.senderId).then(function(e){return e.data||{list:[],totalCount:0}})},t.d=function(e){return r.b.get("/api-finance/finance/report/v1/dateReport?currentPage="+e.currentPage+"&pageSize="+e.pageSize+"&createTimeStart="+e.createTimeStart+"&createTimeEnd="+e.createTimeEnd+"&shipFromOrgid="+e.shipFromOrgid+"&senderCustomerName="+e.senderCustomerName).then(function(e){return e.data})},t.e=function(e){return r.b.get("/api-finance/finance/report/v1/turnoverReport?createTimeStart="+e.createTimeStart+"&createTimeEnd="+e.createTimeEnd+"&shipFromOrgid="+e.shipFromOrgid).then(function(e){return e.data})},t.b=function(e){return r.b.get("/api-finance/finance/report/v1/findOperationReport?startTime="+e.startTime+"&endTime="+e.endTime+"&orgId="+e.orgId+"&selectType="+e.selectType+"&shipToCityName="+e.shipToCityName+"&businessType="+e.businessType).then(function(e){return e.data})},t.a=function(e){return r.b.get("/api-finance/finance/report/v1/findDetail?startCreatTime="+e.startCreatTime+"&endCreatTime="+e.endCreatTime+"&shipFromOrgid="+e.shipFromOrgid).then(function(e){return e.data})};var r=n("Vo7i")},"7kH5":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n("iz4D"),i=n("W78R"),a=n("VU/8")(r.a,i.a,null,null,null);t.default=a.exports},W78R:function(e,t,n){"use strict";var r={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("el-form",{ref:"searchForm",staticClass:"staff_searchinfo clearfix",attrs:{inline:!0,size:t.btnsize,"label-position":"right",rules:t.rules,model:t.searchForm,"label-width":"80px"}},[n("div",{staticClass:"staff_searchinfo--input"},[n("el-form-item",{attrs:{label:"时间"}},[n("el-date-picker",{attrs:{"default-value":t.defaultTime,type:"daterange",align:"right","value-format":"yyyy-MM-dd","start-placeholder":"开始日期","picker-options":t.pickerOptions,"end-placeholder":"结束日期"},on:{focus:function(e){t.hideIframe(!0)},blur:function(e){t.hideIframe(!1)}},model:{value:t.searchTime,callback:function(e){t.searchTime=e},expression:"searchTime"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"网点",prop:"orgId"}},[n("SelectTree",{attrs:{focus:function(){t.hideIframe(!0)}},on:{change:function(){t.hideIframe(!1)}},model:{value:t.searchForm.orgId,callback:function(e){t.$set(t.searchForm,"orgId",e)},expression:"searchForm.orgId"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"到站",prop:"shipToCityName"}},[n("el-input",{model:{value:t.searchForm.shipToCityName,callback:function(e){t.$set(t.searchForm,"shipToCityName",e)},expression:"searchForm.shipToCityName"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"时间类型",prop:"selectType"}},[n("el-select",{on:{focus:function(){t.hideIframe(!0)},change:function(){t.hideIframe(!1)}},model:{value:t.searchForm.selectType,callback:function(e){t.$set(t.searchForm,"selectType",e)},expression:"searchForm.selectType"}},t._l(t.selectType,function(e,t){return n("el-option",{key:e.key,attrs:{label:e.label,value:e.value}})}))],1),t._v(" "),n("el-form-item",{attrs:{label:"业务类型",prop:"businessType"}},[n("el-select",{on:{focus:function(){t.hideIframe(!0)},change:function(){t.hideIframe(!1)}},model:{value:t.searchForm.businessType,callback:function(e){t.$set(t.searchForm,"businessType",e)},expression:"searchForm.businessType"}},t._l(t.businessType,function(e,t){return n("el-option",{key:e.key,attrs:{label:e.label,value:e.value}})}))],1)],1),t._v(" "),n("el-form-item",{staticClass:"staff_searchinfo--btn"},[n("el-button",{attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v("查询")]),t._v(" "),n("el-button",{attrs:{type:"info",plain:""},on:{click:function(e){t.clearForm("searchForm")}}},[t._v("清空")])],1)],1)},staticRenderFns:[]};t.a=r},XDcA:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n("cUWr"),i=n("4QOB");var a=function(e){n("3HOR")},o=n("VU/8")(r.a,i.a,a,null,null);t.default=o.exports},XgtD:function(e,t,n){"use strict";var r={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"tab-content chartSender"},[n("SearchForm",{attrs:{orgid:t.otherinfo.orgid,btnsize:t.btnsize},on:{change:t.getSearchParam}}),t._v(" "),n("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"tab_info"},[n("div",{staticClass:"btns_box"},[n("el-button",{directives:[{name:"has",rawName:"v-has:REPORT_PRINT_4",arg:"REPORT_PRINT_4"}],attrs:{type:"primary",size:t.btnsize,icon:"el-icon-printer",plain:""},on:{click:function(e){t.doAction("print")}}},[t._v("打印报表")]),t._v(" "),n("el-button",{attrs:{type:"primary",size:t.btnsize,icon:"el-icon-printer",plain:""},on:{click:function(e){t.doAction("export")}}},[t._v("导出报表")])],1),t._v(" "),n("div",{staticClass:"info_tab_report_operation",attrs:{id:"report_operation"},on:{scroll:t.handleBottom}},[n("table",{attrs:{id:"report_operation_table"}})])])],1)},staticRenderFns:[]};t.a=r},anTx:function(e,t,n){"use strict";var r=n("woOf"),i=n.n(r),a=n("Dd8w"),o=n.n(a),s=(n("E4LH"),n("NYxO")),c=(n("0xDb"),n("7kH5")),l=n("6b+M"),d=n("UQm2");t.a={components:{SearchForm:c.default},data:function(){return{loading:!0,chartIframe:"",hideiframe:"hide",query:{currentPage:1,pageSize:100},fontSizeHeadMini:2,bgcolorHead:"yellow",btnsize:"mini",isShow:!0,columns:[{label:"时间",prop:"time",textAlign:"center"},{label:"总运费(元)",prop:"shipFee",textAlign:"right"},{label:"件数",prop:"shipAmount",textAlign:"right"},{label:"重量(千克)",prop:"shipWeight",textAlign:"right"},{label:"体积(方)",prop:"shipVolume",textAlign:"right"}],countCol:[],countColVal:[]}},computed:o()({},Object(s.mapGetters)(["otherinfo"])),mounted:function(){this.getScrollWidth()},methods:{getScrollWidth:function(){var e,t,n=document.createElement("DIV");n.style.cssText="position:absolute;top:-1000px;width:100px;height:100px; overflow:hidden;",e=document.body.appendChild(n).clientWidth,n.style.overflowY="scroll",t=n.clientWidth,document.body.removeChild(n),this.scrollwidth=e-t},report:function(){var g=this;console.log("sdfsdf2347823748",this.query),this.loading=!0,Object(l.b)(this.query).then(function(e){var t=e;g.loading=!1;var n=document.getElementById("report_operation"),r=document.getElementById("report_operation_table");if(r){var i=r.getElementsByTagName("thead"),a=r.getElementsByTagName("tbody");0<i.length&&(r.removeChild(i[0]),r.removeChild(a[0]));var o=document.createElement("thead"),s=document.createElement("tbody"),c=document.createElement("tr");r.appendChild(o),r.appendChild(s),o.appendChild(c),r.style.borderCollapse="collapse",r.style.border="1px solid #d0d7e5",r.setAttribute("border","1"),r.setAttribute("font","12px"),r.setAttribute("width","780px"),c.setAttribute("height","32px"),c.setAttribute("width","100%");for(var l=0;l<g.columns.length;l++){var d=document.createElement("th"),u=document.createElement("font");u.innerHTML=g.columns[l].label,u.setAttribute("size",2),u.setAttribute("color","white"),d.setAttribute("border",1),d.setAttribute("bgcolor","dimGray"),d.appendChild(u),d.setAttribute("width",(g.columns[l].width||120)+"px"),c.appendChild(d)}var m=r.cloneNode(!0);m.setAttribute("id","tableClone"),m.setAttribute("refs","tableClone"),m.className="tableCloneHead",console.log("tableClone",m),n.appendChild(m);for(var p=0;p<t.length;p++)for(var h=s.insertRow(),f=0;f<g.columns.length;f++){var b=h.insertCell();for(var v in g.countCol)-1!==g.columns[f].prop.indexOf(g.countCol[v])&&(t[p][g.columns[f].prop]=t[p][g.columns[f].prop]?t[p][g.columns[f].prop]:"0.00");b.innerHTML="id"===g.columns[f].prop||"序号"===g.columns[f].label?p+1:void 0===t[p][g.columns[f].prop]?"":t[p][g.columns[f].prop],b.style.textAlign=g.columns[f].textAlign,b.style.padding="2px 5px",b.style.fontSize="13px",b.style.width=(g.columns[f].width||120)+"px"}}}).catch(function(e){g.loading=!1,g._handlerCatchMsg(e)})},doAction:function(e){switch(e){case"print":Object(d.e)({id:"report_operation",countCol:this.countCol});break;case"export":Object(d.h)({id:"report_operation",name:"营运统计分析",countCol:this.countCol})}},getSearchParam:function(e){this.query=i()(this.query,e),this.report()},handleBottom:function(e){var t=e.target,n=t.scrollTop;t.offsetWidth,t.scrollWidth,t.offsetHeight;this.maxheight||(this.maxheight=t.scrollHeight),document.getElementById("tableClone").style.top=n+"px"}}}},byKq:function(e,t,n){"use strict";var r=n("XDcA"),i=n("2IIl");t.a={components:{sender:r.default,list:i.default},data:function(){return{component:"list"}}}},cUWr:function(e,t,n){"use strict";var r=n("woOf"),a=n.n(r),i=n("Dd8w"),o=n.n(i),s=(n("E4LH"),n("NYxO")),c=n("o9X6"),l=n("pAQG"),d=(n("0xDb"),n("7kH5")),u=n("TIfe");t.a={components:{SelectTree:c.a,querySelect:l.a,SearchForm:d.default},data:function(){return{chartIframe:"",query:{shipToCityName:""},btnsize:"mini"}},computed:o()({},Object(s.mapGetters)(["otherinfo"])),methods:{doAction:function(e){switch(e){case"print":document.getElementById("senderIframe").contentWindow.OnEvent("AF","Print","");break;case"preview":document.getElementById("senderIframe").contentWindow.OnEvent("AF","Preview","");break;case"setting":document.getElementById("senderIframe").contentWindow.OnEvent("AF","Setting","")}},hideIframe:function(e){e?"show"!==this.hideiframe&&(this.hideiframe="show",document.getElementById("senderIframe").contentWindow.hideChart(e)):"hide"!==this.hideiframe&&(this.hideiframe="hide",document.getElementById("senderIframe").contentWindow.hideChart(e))},getSearchParam:function(e){this.query=a()(this.query,e);var t=Object(u.b)();this.$set(this.query,"access_token",t);var n="?";for(var r in this.query)n+=r+"="+this.query[r]+"&";var i=window.location.protocol+"//"+window.location.host+"/static/supcan/operation.html"+n+(new Date).getTime();this.chartIframe=encodeURI(i),console.log(i,this.$refs.senderIframe.contentWindow)},setTable:function(){}}}},iz4D:function(e,t,n){"use strict";var r=n("woOf"),i=n.n(r),a=n("E4LH"),o=n("o9X6"),s=n("9UCZ"),c=n("0xDb");t.a={components:{SelectTree:o.a,SelectType:s.a},props:{btnsize:{type:String,default:"mini"},orgid:{type:Number}},data:function(){return{searchForm:{orgId:"",selectType:"",businessType:"",shipToCityName:""},businessType:[{value:0,label:"全部"},{value:1,label:"走货业务"},{value:2,label:"来货业务"}],selectType:[{value:1,label:"按月"},{value:2,label:"按日"}],rules:{shipSn:[{validator:function(e,t,n){var r=a.a.ONLY_NUMBER;""!==t&&null!==t&&t&&void 0!==t?r.test(t)?n():n(new Error("请输入最多15位数字")):n()},tigger:"blur"}]},searchTime:[Object(c.parseTime)(new Date-5184e6),Object(c.parseTime)(new Date)],defaultTime:[+new Date-5184e6,+new Date],pickerOptions:{shortcuts:c.pickerOptions2}}},mounted:function(){this.searchForm.orgId=this.orgid,this.searchForm.selectType=1,this.searchForm.businessType=1,this.onSubmit()},methods:{onSubmit:function(){var e=i()({},this.searchForm);this.searchTime&&(this.$set(e,"startTime",Object(c.parseTime)(this.searchTime[0],"{y}-{m}-{d} ")+"00:00:00"),this.$set(e,"endTime",Object(c.parseTime)(this.searchTime[1],"{y}-{m}-{d} ")+"23:59:59")),this.$emit("change",e)},hideIframe:function(e){this.$emit("hideIframe",e)},clearForm:function(e){var t=this;this.$nextTick(function(){i()(t.$data,t.$options.data()),t.$refs[e].resetFields(),t.searchForm.orgId=t.orgid})}}}},pK1n:function(e,t,n){"use strict";var r={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"tab-wrapper tab-wrapper-100"},[t(this.component,{tag:"keep-alive"})],1)},staticRenderFns:[]};t.a=r},q42A:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n("byKq"),i=n("pK1n"),a=n("VU/8")(r.a,i.a,null,null,null);t.default=a.exports},qo0w:function(e,t){}});