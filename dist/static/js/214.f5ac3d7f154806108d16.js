webpackJsonp([214,316],{"+n0J":function(e,t,r){"use strict";var o={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"tab-content chartSender"},[r("SearchForm",{attrs:{orgid:t.otherinfo.orgid,btnsize:t.btnsize},on:{change:t.getSearchParam}}),t._v(" "),r("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"tab_info"},[r("div",{staticClass:"btns_box"},[r("el-button",{directives:[{name:"has",rawName:"v-has:REPORT_PRINT_3",arg:"REPORT_PRINT_3"}],attrs:{type:"primary",size:t.btnsize,icon:"el-icon-printer",plain:""},on:{click:function(e){t.doAction("print")}}},[t._v("打印报表")]),t._v(" "),r("el-button",{attrs:{type:"primary",size:t.btnsize,icon:"el-icon-printer",plain:""},on:{click:function(e){t.doAction("export")}}},[t._v("导出报表")])],1),t._v(" "),r("div",{staticClass:"info_tab_report",attrs:{id:"report_turnoverTotal"},on:{scroll:t.handleBottom}},[r("table",{staticClass:"report_turnoverTotal_table",attrs:{id:"report_turnoverTotal_table"}}),t._v(" "),r("table",{ref:"footTotalFee",staticClass:"footTotalFee_turnoverTotal"},[r("colgroup",{attrs:{width:"65px"}}),t._v(" "),r("colgroup",{attrs:{width:"110px"}}),t._v(" "),r("colgroup",{attrs:{width:"110px"}}),t._v(" "),r("colgroup",{attrs:{width:"110px"}}),t._v(" "),r("colgroup",{attrs:{width:"110px"}}),t._v(" "),r("colgroup",{attrs:{width:"110px"}}),t._v(" "),r("colgroup",{attrs:{width:"110px"}}),t._v(" "),r("colgroup",{attrs:{width:"110px"}}),t._v(" "),r("colgroup",{attrs:{width:"110px"}})])])])],1)},staticRenderFns:[]};t.a=o},"/GP8":function(e,t){},"6b+M":function(e,t,r){"use strict";t.c=function(e){return o.b.get("/api-finance/finance/report/v1/FeeAggregation?orgId="+e.orgId+"&startTime="+e.startTime+"&endTime="+e.endTime+"&typeIds="+e.typeIds+"&senderId="+e.senderId).then(function(e){return e.data||{list:[],totalCount:0}})},t.d=function(e){return o.b.get("/api-finance/finance/report/v1/dateReport?currentPage="+e.currentPage+"&pageSize="+e.pageSize+"&createTimeStart="+e.createTimeStart+"&createTimeEnd="+e.createTimeEnd+"&shipFromOrgid="+e.shipFromOrgid+"&senderCustomerName="+e.senderCustomerName).then(function(e){return e.data})},t.e=function(e){return o.b.get("/api-finance/finance/report/v1/turnoverReport?createTimeStart="+e.createTimeStart+"&createTimeEnd="+e.createTimeEnd+"&shipFromOrgid="+e.shipFromOrgid).then(function(e){return e.data})},t.b=function(e){return o.b.get("/api-finance/finance/report/v1/findOperationReport?startTime="+e.startTime+"&endTime="+e.endTime+"&orgId="+e.orgId+"&selectType="+e.selectType+"&shipToCityName="+e.shipToCityName+"&businessType="+e.businessType).then(function(e){return e.data})},t.a=function(e){return o.b.get("/api-finance/finance/report/v1/findDetail?startCreatTime="+e.startCreatTime+"&endCreatTime="+e.endCreatTime+"&shipFromOrgid="+e.shipFromOrgid).then(function(e){return e.data})};var o=r("Vo7i")},"7mzR":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=r("qj+C"),i=r("VCM0"),n=r("VU/8")(o.a,i.a,null,null,null);t.default=n.exports},VCM0:function(e,t,r){"use strict";var o={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("el-form",{ref:"searchForm",staticClass:"staff_searchinfo clearfix",attrs:{inline:!0,size:t.btnsize,"label-position":"right",rules:t.rules,model:t.searchForm,"label-width":"80px"}},[r("div",{staticClass:"staff_searchinfo--input"},[r("el-form-item",{attrs:{label:"开单时间"}},[r("el-date-picker",{attrs:{"default-value":t.defaultTime,type:"daterange",align:"right","value-format":"yyyy-MM-dd",clearable:!1,"start-placeholder":"开始日期","picker-options":t.pickerOptions,"end-placeholder":"结束日期"},on:{focus:function(e){t.hideIframe(!0)},blur:function(e){t.hideIframe(!1)}},model:{value:t.searchTime,callback:function(e){t.searchTime=e},expression:"searchTime"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"开单网点",prop:"shipFromOrgid"}},[r("SelectTree",{attrs:{focus:function(){t.hideIframe(!0)},orgid:t.otherinfo.orgid},on:{change:function(){t.hideIframe(!1)}},model:{value:t.searchForm.shipFromOrgid,callback:function(e){t.$set(t.searchForm,"shipFromOrgid",e)},expression:"searchForm.shipFromOrgid"}})],1)],1),t._v(" "),r("el-form-item",{staticClass:"staff_searchinfo--btn"},[r("el-button",{attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v("查询")]),t._v(" "),r("el-button",{attrs:{type:"info",plain:""},on:{click:function(e){t.clearForm("searchForm")}}},[t._v("清空")])],1)],1)},staticRenderFns:[]};t.a=o},cCju:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=r("o+UU"),i=r("+n0J");var n=function(e){r("/GP8")},a=r("VU/8")(o.a,i.a,n,null,null);t.default=a.exports},"o+UU":function(e,t,r){"use strict";var o=r("woOf"),i=r.n(o),n=r("Dd8w"),a=r.n(n),l=(r("E4LH"),r("NYxO")),V=r("0xDb"),s=r("7mzR"),c=r("6b+M"),d=r("UQm2");t.a={components:{SearchForm:s.default},data:function(){return{loading:!0,chartIframe:"",hideiframe:"hide",query:{currentPage:1,pageSize:100},fontSizeHeadMini:2,bgcolorHead:"yellow",btnsize:"mini",isShow:!0,columns:[{label:"序号",prop:"id",textAlign:"center"},{label:"开单网点",prop:"orgidName",textAlign:"center"},{label:"总运费(元)",prop:"totalFee",textAlign:"right"},{label:"实收费用(元)",prop:"shipTotalFee",textAlign:"right"},{label:"回扣(元)",prop:"brokerageFee",textAlign:"right"},{label:"现付(元)",prop:"nowPayFee",textAlign:"right"},{label:"到付(元)",prop:"arrivePayFee",textAlign:"right"},{label:"回单付(元)",prop:"receiptPayFee",textAlign:"right"},{label:"月结(元)",prop:"monthPayFee",textAlign:"right"}],countCol:["nowPayFee","arrivePayFee","shipReceiptpayFee","monthPayFee","totalFee","brokerageFee","receiptPayFee","shipTotalFee"],countColVal:[]}},computed:a()({},Object(l.mapGetters)(["otherinfo"])),mounted:function(){this.getScrollWidth()},methods:{getScrollWidth:function(){var e,t,r=document.createElement("DIV");r.style.cssText="position:absolute;top:-1000px;width:100px;height:100px; overflow:hidden;",e=document.body.appendChild(r).clientWidth,r.style.overflowY="scroll",t=r.clientWidth,document.body.removeChild(r),this.scrollwidth=e-t},report:function(){var H=this;this.loading=!0,Object(c.e)(this.query).then(function(e){var t=e.list;H.loading=!1;var r=document.getElementById("report_turnoverTotal"),o=document.getElementById("report_turnoverTotal_table");if(o){var i=o.getElementsByTagName("thead"),n=o.getElementsByTagName("tbody"),a=o.getElementsByTagName("tfoot");0<i.length&&(o.removeChild(i[0]),o.removeChild(n[0]),o.removeChild(a[0]));var l=document.createElement("thead"),s=document.createElement("tbody"),c=document.createElement("tfoot"),d=document.createElement("tr"),p=document.createElement("tr"),u=document.createElement("th"),m=document.createElement("font"),h="营业额汇总表";u.setAttribute("colspan",H.columns.length),u.setAttribute("height","32px"),u.setAttribute("bgcolor","gray"),m.setAttribute("color","white"),H.timeobj.createTimeStart&&(h=Object(V.parseTime)(H.timeobj.createTimeStart,"{y}年{m}月{d}日")+"~"+Object(V.parseTime)(H.timeobj.createTimeEnd,"{y}年{m}月{d}日")+h),m.innerHTML=h,u.appendChild(m),p.appendChild(u),l.appendChild(p),o.appendChild(l),o.appendChild(s),o.appendChild(c),l.appendChild(d),o.style.borderCollapse="collapse",o.style.border="1px solid #d0d7e5",o.setAttribute("border","1"),o.setAttribute("font","12px"),o.setAttribute("width","780px"),d.setAttribute("height","32px"),d.setAttribute("width","100%");for(var f=0;f<H.columns.length;f++){var g=document.createElement("th"),b=document.createElement("font");b.innerHTML=H.columns[f].label,b.setAttribute("size",2),b.setAttribute("color","white"),g.setAttribute("border",1),g.setAttribute("bgcolor","dimGray"),g.appendChild(b),d.appendChild(g)}var v=o.cloneNode(!0);v.setAttribute("id","tableClone"),v.setAttribute("refs","tableClone"),v.className="tableCloneHead",console.log("tableClone",v),r.appendChild(v);for(var T=0;T<t.length;T++)for(var y=s.insertRow(),x=0;x<H.columns.length;x++){var C=y.insertCell();for(var _ in H.countCol)-1!==H.columns[x].prop.indexOf(H.countCol[_])&&(t[T][H.columns[x].prop]=t[T][H.columns[x].prop]?Number(t[T][H.columns[x].prop]).toFixed(2):"0.00");C.innerHTML="id"===H.columns[x].prop||"序号"===H.columns[x].label?T+1:void 0===t[T][H.columns[x].prop]?"":t[T][H.columns[x].prop],C.style.textAlign=H.columns[x].textAlign,C.style.padding="2px 5px",C.style.fontSize="13px",C.style.width=(H.columns[x].width||120)+"px"}var F=e.list;for(var w in H.countCol){for(var A=0,O=H.countCol[w].split("|"),E=0;E<F.length;E++)A+=F[E][O[0]]?Number(F[E][O[0]]):0;(A||0===A)&&(O[1]&&"integer"===O[1]?H.countColVal[O[0]]=A||"0.00":H.countColVal[O[0]]=A?A.toFixed(2):"0.00")}var S=c.insertRow();for(var I in H.columns){var P=S.insertCell();P.innerHTML="序号"===H.columns[I].label?"合计":H.countColVal[H.columns[I].prop]?H.countColVal[H.columns[I].prop]:"-",P.style.textAlign=H.columns[I].textAlign,P.style.padding="2px 5px",P.style.fontSize="13px",P.setAttribute("bgcolor","gainsboro"),P.setAttribute("color","white")}var z=document.getElementsByClassName("footTotalFee_turnoverTotal")[0],N=z.getElementsByTagName("tfoot");0<N.length&&z.removeChild(N[0]);var j=document.createElement("tfoot");z.appendChild(j),z.style.borderCollapse="collapse",z.style.border="1px solid #d0d7e5",z.setAttribute("border","1"),z.setAttribute("font","12px");var R=j.insertRow();for(var k in H.columns){var M=R.insertCell();M.innerHTML="序号"===H.columns[k].label?"合计":H.countColVal[H.columns[k].prop]?H.countColVal[H.columns[k].prop]:"-",M.style.textAlign=H.columns[k].textAlign,M.style.padding="2px 5px",M.style.fontSize="13px",M.setAttribute("bgcolor","gainsboro"),M.setAttribute("color","white")}}}).catch(function(e){H.loading=!1,H._handlerCatchMsg(e)})},doAction:function(e){switch(e){case"print":Object(d.e)({id:"report_turnoverTotal",countCol:this.countCol});break;case"export":Object(d.h)({id:"report_turnoverTotal",name:"营业额汇总表",countCol:this.countCol})}},getSearchParam:function(e,t){this.query=i()(this.query,e),this.timeobj=t,this.report()},handleBottom:function(e){var t=e.target,r=t.scrollTop,o=t.offsetWidth<t.scrollWidth,i=t.offsetHeight,n=this.$refs.footTotalFee,a=r+i-n.offsetHeight;o&&(a-=this.scrollwidth),this.maxheight||(this.maxheight=t.scrollHeight),n.style.bottom="auto",n.style.top=(a>this.maxheight?this.maxheight:a)+"px",document.getElementById("tableClone").style.top=r+"px"}}}},"qj+C":function(e,t,r){"use strict";var o=r("woOf"),i=r.n(o),n=(r("E4LH"),r("o9X6")),a=r("pAQG"),l=r("0xDb");t.a={components:{SelectTree:n.a,querySelect:a.a},props:{btnsize:{type:String,default:"mini"},orgid:{type:Number}},data:function(){return{searchForm:{shipFromOrgid:""},rules:{},searchTime:[Object(l.parseTime)(new Date-5184e6),Object(l.parseTime)(new Date)],defaultTime:[+new Date-5184e6,+new Date],pickerOptions:{shortcuts:l.pickerOptions2}}},mounted:function(){this.searchForm.shipFromOrgid=this.orgid,this.onSubmit()},methods:{onSubmit:function(){var e=i()({},this.searchForm);this.searchTime&&(this.$set(e,"createTimeStart",Object(l.parseTime)(this.searchTime[0],"{y}-{m}-{d}")),this.$set(e,"createTimeEnd",Object(l.parseTime)(this.searchTime[1],"{y}-{m}-{d}"))),this.$emit("change",e,{createTimeStart:this.searchTime[0]||"",createTimeEnd:this.searchTime[1]||""})},hideIframe:function(e){this.$emit("hideIframe",e)},clearForm:function(e){var t=this;this.$nextTick(function(){i()(t.$data,t.$options.data()),t.$refs[e].resetFields()})}}}}});