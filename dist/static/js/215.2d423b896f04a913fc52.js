webpackJsonp([215,316],{"//0s":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=r("CnyF"),i=r("8Om5"),n=r("VU/8")(o.a,i.a,null,null,null);t.default=n.exports},"6b+M":function(e,t,r){"use strict";t.c=function(e){return o.b.get("/api-finance/finance/report/v1/FeeAggregation?orgId="+e.orgId+"&startTime="+e.startTime+"&endTime="+e.endTime+"&typeIds="+e.typeIds+"&senderId="+e.senderId).then(function(e){return e.data||{list:[],totalCount:0}})},t.d=function(e){return o.b.get("/api-finance/finance/report/v1/dateReport?currentPage="+e.currentPage+"&pageSize="+e.pageSize+"&createTimeStart="+e.createTimeStart+"&createTimeEnd="+e.createTimeEnd+"&shipFromOrgid="+e.shipFromOrgid+"&senderCustomerName="+e.senderCustomerName).then(function(e){return e.data})},t.e=function(e){return o.b.get("/api-finance/finance/report/v1/turnoverReport?createTimeStart="+e.createTimeStart+"&createTimeEnd="+e.createTimeEnd+"&shipFromOrgid="+e.shipFromOrgid).then(function(e){return e.data})},t.b=function(e){return o.b.get("/api-finance/finance/report/v1/findOperationReport?startTime="+e.startTime+"&endTime="+e.endTime+"&orgId="+e.orgId+"&selectType="+e.selectType+"&shipToCityName="+e.shipToCityName+"&businessType="+e.businessType).then(function(e){return e.data})},t.a=function(e){return o.b.get("/api-finance/finance/report/v1/findDetail?startCreatTime="+e.startCreatTime+"&endCreatTime="+e.endCreatTime+"&shipFromOrgid="+e.shipFromOrgid).then(function(e){return e.data})};var o=r("Vo7i")},"8Om5":function(e,t,r){"use strict";var o={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("el-form",{ref:"searchForm",staticClass:"staff_searchinfo clearfix",attrs:{inline:!0,size:t.btnsize,"label-position":"right",rules:t.rules,model:t.searchForm,"label-width":"80px"}},[r("div",{staticClass:"staff_searchinfo--input"},[r("el-form-item",{attrs:{label:"开单时间"}},[r("el-date-picker",{attrs:{"default-value":t.defaultTime,type:"daterange",align:"right","value-format":"yyyy-MM-dd","start-placeholder":"开始日期","picker-options":t.pickerOptions,"end-placeholder":"结束日期"},on:{focus:function(e){t.hideIframe(!0)},blur:function(e){t.hideIframe(!1)}},model:{value:t.searchTime,callback:function(e){t.searchTime=e},expression:"searchTime"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"开单网点",prop:"shipFromOrgid"}},[r("SelectTree",{attrs:{focus:function(){t.hideIframe(!0)},orgid:t.otherinfo.orgid},on:{change:function(){t.hideIframe(!1)}},model:{value:t.searchForm.shipFromOrgid,callback:function(e){t.$set(t.searchForm,"shipFromOrgid",e)},expression:"searchForm.shipFromOrgid"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"发货人",prop:"senderCustomerName"}},[r("el-input",{model:{value:t.searchForm.senderCustomerName,callback:function(e){t.$set(t.searchForm,"senderCustomerName",e)},expression:"searchForm.senderCustomerName"}})],1)],1),t._v(" "),r("el-form-item",{staticClass:"staff_searchinfo--btn"},[r("el-button",{attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v("查询")]),t._v(" "),r("el-button",{attrs:{type:"info",plain:""},on:{click:function(e){t.clearForm("searchForm")}}},[t._v("清空")])],1)],1)},staticRenderFns:[]};t.a=o},CnyF:function(e,t,r){"use strict";var o=r("woOf"),i=r.n(o),n=r("E4LH"),a=r("o9X6"),l=r("pAQG"),s=r("0xDb");t.a={components:{SelectTree:a.a,querySelect:l.a},props:{btnsize:{type:String,default:"mini"},orgid:{type:Number}},data:function(){return{searchForm:{shipFromOrgid:"",senderCustomerName:""},rules:{shipSn:[{validator:function(e,t,r){var o=n.a.ONLY_NUMBER;""!==t&&null!==t&&t&&void 0!==t?o.test(t)?r():r(new Error("请输入最多15位数字")):r()},tigger:"blur"}]},searchTime:[Object(s.parseTime)(new Date-5184e6),Object(s.parseTime)(new Date)],defaultTime:[+new Date-5184e6,+new Date],pickerOptions:{shortcuts:s.pickerOptions2}}},mounted:function(){this.searchForm.shipFromOrgid=this.orgid,this.onSubmit()},methods:{onSubmit:function(){var e=i()({},this.searchForm);this.searchTime&&(this.$set(e,"createTimeStart",Object(s.parseTime)(this.searchTime[0],"{y}-{m}-{d}")),this.$set(e,"createTimeEnd",Object(s.parseTime)(this.searchTime[1],"{y}-{m}-{d}"))),this.$emit("change",e)},hideIframe:function(e){this.$emit("hideIframe",e)},clearForm:function(e){var t=this;this.$nextTick(function(){t.$refs[e].resetFields(),t.searchForm=t.$options.data().searchForm,console.log(t.searchForm),t.searchForm.shipFromOrgid=t.orgid})}}}},RUXP:function(e,t,r){"use strict";var o=r("woOf"),i=r.n(o),n=r("Dd8w"),a=r.n(n),l=(r("E4LH"),r("NYxO")),s=(r("0xDb"),r("//0s")),c=r("6b+M"),p=r("UQm2");t.a={components:{SearchForm:s.default},data:function(){return{loading:!0,chartIframe:"",hideiframe:"hide",query:{currentPage:1,pageSize:100},fontSizeHeadMini:2,bgcolorHead:"yellow",btnsize:"mini",isShow:!0,columns:[{label:"序号",prop:"id",textAlign:"center",width:"70"},{label:"开单网点",prop:"orgidName",textAlign:"center",width:"130"},{label:"签收网点",prop:"signOrgidName",textAlign:"center",width:"130"},{label:"到站",prop:"shipToCityName",textAlign:"center",width:"200"},{label:"发货人",prop:"senderCustomerName",textAlign:"center",width:"140"},{label:"货品名",prop:"cargoName",textAlign:"center"},{label:"现付(元)",prop:"shipNowpayFee",textAlign:"right"},{label:"到付(元)",prop:"shipArrivepayFee",textAlign:"right"},{label:"回单付(元)",prop:"shipReceiptpayFee",textAlign:"right"},{label:"月结(元)",prop:"shipMonthpayFee",textAlign:"right"},{label:"运费合计(元)",prop:"totalFee",textAlign:"right"},{label:"回扣(元)",prop:"brokerageFee",textAlign:"right"},{label:"代收货款(元)",prop:"agencyFund",textAlign:"right"},{label:"实收金额(元)",prop:"amountCollected",textAlign:"right"}],countCol:["shipNowpayFee","shipArrivepayFee","shipReceiptpayFee","shipMonthpayFee","totalFee","brokerageFee","agencyFund","amountCollected"],countColVal:[]}},computed:a()({},Object(l.b)(["otherinfo"])),mounted:function(){this.getScrollWidth()},methods:{getScrollWidth:function(){var e,t,r=document.createElement("DIV");r.style.cssText="position:absolute;top:-1000px;width:100px;height:100px; overflow:hidden;",e=document.body.appendChild(r).clientWidth,r.style.overflowY="scroll",t=r.clientWidth,document.body.removeChild(r),this.scrollwidth=e-t},report:function(){var D=this;this.loading=!0,Object(c.d)(this.query).then(function(e){var t=e.list;D.loading=!1;var r=document.getElementById("report_turnoverDaily"),o=document.getElementById("report_turnoverDaily_table");if(o){var i=o.getElementsByTagName("thead"),n=o.getElementsByTagName("tbody"),a=o.getElementsByTagName("tfoot");0<i.length&&(o.removeChild(i[0]),o.removeChild(n[0]),o.removeChild(a[0]));var l=document.createElement("thead"),s=document.createElement("tbody"),c=document.createElement("tfoot"),p=document.createElement("tr");o.appendChild(l),o.appendChild(s),o.appendChild(c),l.appendChild(p),o.style.borderCollapse="collapse",o.style.border="1px solid #d0d7e5",o.setAttribute("border","1"),o.setAttribute("font","12px"),p.setAttribute("height","32px"),p.setAttribute("width","100%");for(var d=0;d<D.columns.length;d++){var u=document.createElement("th"),h=document.createElement("font");h.innerHTML=D.columns[d].label,h.setAttribute("size",2),h.setAttribute("color","white"),u.setAttribute("border",1),u.setAttribute("bgcolor","dimGray"),u.appendChild(h),u.setAttribute("width",(D.columns[d].width||120)+"px"),p.appendChild(u)}console.log("table",o);var m=o.cloneNode(!0);m.setAttribute("id","tableClone"),m.setAttribute("refs","tableClone"),m.className="tableCloneHead",console.log("tableClone",m),r.appendChild(m);for(var g=0;g<t.length;g++)for(var f=s.insertRow(),b=0;b<D.columns.length;b++){var v=f.insertCell();for(var x in D.countCol)-1!==D.columns[b].prop.indexOf(D.countCol[x])&&(t[g][D.columns[b].prop]=t[g][D.columns[b].prop]?Number(t[g][D.columns[b].prop]).toFixed(2):"");v.innerHTML="id"===D.columns[b].prop||"序号"===D.columns[b].label?g+1:void 0===t[g][D.columns[b].prop]||0===t[g][D.columns[b].prop]?"":t[g][D.columns[b].prop],v.style.textAlign=D.columns[b].textAlign,v.style.padding="2px 3px",v.style.fontSize="13px",v.setAttribute("width",(D.columns[b].width||120)+"px")}var y=e.list;for(var _ in D.countCol){for(var C=0,w=D.countCol[_].split("|"),T=0;T<y.length;T++)C+=y[T][w[0]]?Number(y[T][w[0]]):0;(C||0===C)&&(w[1]&&"integer"===w[1]?D.countColVal[w[0]]=C||"":D.countColVal[w[0]]=C?C.toFixed(2):"")}var F=c.insertRow();for(var A in D.columns){var O=F.insertCell();O.innerHTML="序号"===D.columns[A].label?"合计":D.countColVal[D.columns[A].prop]?D.countColVal[D.columns[A].prop]:"-",O.style.textAlign=D.columns[A].textAlign,O.style.padding="2px 5px",O.style.fontSize="13px",O.setAttribute("bgcolor","gainsboro"),O.setAttribute("color","white")}var N=document.getElementsByClassName("footTotalFee")[0],E=N.getElementsByTagName("tfoot");0<E.length&&N.removeChild(E[0]);var S=document.createElement("tfoot");N.appendChild(S),N.style.borderCollapse="collapse",N.style.border="1px solid #d0d7e5",N.setAttribute("border","1"),N.setAttribute("font","12px");var I=S.insertRow();for(var z in D.columns){var R=I.insertCell();R.innerHTML="序号"===D.columns[z].label?"合计":D.countColVal[D.columns[z].prop]?D.countColVal[D.columns[z].prop]:"-",R.style.textAlign=D.columns[z].textAlign,R.style.padding="2px 5px",R.style.fontSize="13px",R.setAttribute("bgcolor","gainsboro"),R.setAttribute("color","white")}}}).catch(function(e){D.loading=!1,D._handlerCatchMsg(e)})},doAction:function(e){switch(e){case"print":Object(p.e)({id:"report_turnoverDaily",countCol:this.countCol});break;case"export":Object(p.h)({id:"report_turnoverDaily",name:"营业额日报表",countCol:this.countCol})}},getSearchParam:function(e){this.query=i()(this.query,e),this.report()},handleBottom:function(e){var t=e.target,r=t.scrollTop,o=t.offsetWidth<t.scrollWidth,i=t.offsetHeight,n=this.$refs.footTotalFee,a=r+i-n.offsetHeight;o&&(a-=this.scrollwidth),this.maxheight||(this.maxheight=t.scrollHeight),n.style.bottom="auto",n.style.top=(a>this.maxheight?this.maxheight:a)+"px",document.getElementById("tableClone").style.top=r+"px"}}}},YeJj:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=r("RUXP"),i=r("zX6D");var n=function(e){r("oEcg")},a=r("VU/8")(o.a,i.a,n,null,null);t.default=a.exports},oEcg:function(e,t){},zX6D:function(e,t,r){"use strict";var o={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"tab-content chartSender"},[r("SearchForm",{attrs:{orgid:t.otherinfo.orgid,btnsize:t.btnsize},on:{change:t.getSearchParam}}),t._v(" "),r("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"tab_info"},[r("div",{staticClass:"btns_box"},[r("el-button",{directives:[{name:"has",rawName:"v-has:REPORT_PRINT_2",arg:"REPORT_PRINT_2"}],attrs:{type:"primary",size:t.btnsize,icon:"el-icon-printer",plain:""},on:{click:function(e){t.doAction("print")}}},[t._v("打印报表")]),t._v(" "),r("el-button",{attrs:{type:"primary",size:t.btnsize,icon:"el-icon-printer",plain:""},on:{click:function(e){t.doAction("export")}}},[t._v("导出报表")])],1),t._v(" "),r("div",{staticClass:"info_tab_report",attrs:{id:"report_turnoverDaily"},on:{scroll:t.handleBottom}},[t._m(0),t._v(" "),r("table",{ref:"footTotalFee",staticClass:"footTotalFee"},[r("colgroup",{attrs:{width:"56px"}}),t._v(" "),r("colgroup",{attrs:{width:"130px"}}),t._v(" "),r("colgroup",{attrs:{width:"140px"}}),t._v(" "),r("colgroup",{attrs:{width:"155px"}}),t._v(" "),r("colgroup",{attrs:{width:"110px"}}),t._v(" "),r("colgroup",{attrs:{width:"100px"}}),t._v(" "),r("colgroup",{attrs:{width:"100px"}}),t._v(" "),r("colgroup",{attrs:{width:"100px"}}),t._v(" "),r("colgroup",{attrs:{width:"100px"}}),t._v(" "),r("colgroup",{attrs:{width:"98px"}}),t._v(" "),r("colgroup",{attrs:{width:"98px"}}),t._v(" "),r("colgroup",{attrs:{width:"98px"}}),t._v(" "),r("colgroup",{attrs:{width:"110px"}}),t._v(" "),r("colgroup",{attrs:{width:"100px"}})])])])],1)},staticRenderFns:[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("table",{staticClass:"report_turnoverDaily_table",attrs:{id:"report_turnoverDaily_table"}},[r("colgroup",{attrs:{width:"58px"}}),e._v(" "),r("colgroup",{attrs:{width:"130px"}}),e._v(" "),r("colgroup",{attrs:{width:"145px"}}),e._v(" "),r("colgroup",{attrs:{width:"165px"}}),e._v(" "),r("colgroup",{attrs:{width:"120px"}}),e._v(" "),r("colgroup",{attrs:{width:"100px"}}),e._v(" "),r("colgroup",{attrs:{width:"100px"}}),e._v(" "),r("colgroup",{attrs:{width:"100px"}}),e._v(" "),r("colgroup",{attrs:{width:"100px"}}),e._v(" "),r("colgroup",{attrs:{width:"98px"}}),e._v(" "),r("colgroup",{attrs:{width:"98px"}}),e._v(" "),r("colgroup",{attrs:{width:"98px"}}),e._v(" "),r("colgroup",{attrs:{width:"120px"}}),e._v(" "),r("colgroup",{attrs:{width:"98px"}})])}]};t.a=o}});