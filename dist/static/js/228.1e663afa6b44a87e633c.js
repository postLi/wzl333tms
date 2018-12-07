webpackJsonp([228,316],{"//0s":function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=r("CnyF"),i=r("8Om5"),n=r("VU/8")(o.a,i.a,null,null,null);e.default=n.exports},"6b+M":function(t,e,r){"use strict";e.c=function(t){return o.b.get("/api-finance/finance/report/v1/FeeAggregation?orgId="+t.orgId+"&startTime="+t.startTime+"&endTime="+t.endTime+"&typeIds="+t.typeIds+"&senderId="+t.senderId).then(function(t){return t.data||{list:[],totalCount:0}})},e.d=function(t){return o.b.get("/api-finance/finance/report/v1/dateReport?currentPage="+t.currentPage+"&pageSize="+t.pageSize+"&createTimeStart="+t.createTimeStart+"&createTimeEnd="+t.createTimeEnd+"&shipFromOrgid="+t.shipFromOrgid+"&senderCustomerName="+t.senderCustomerName).then(function(t){return t.data})},e.e=function(t){return o.b.get("/api-finance/finance/report/v1/turnoverReport?createTimeStart="+t.createTimeStart+"&createTimeEnd="+t.createTimeEnd+"&shipFromOrgid="+t.shipFromOrgid).then(function(t){return t.data})},e.b=function(t){return o.b.get("/api-finance/finance/report/v1/findOperationReport?startTime="+t.startTime+"&endTime="+t.endTime+"&orgId="+t.orgId+"&selectType="+t.selectType+"&shipToCityName="+t.shipToCityName+"&businessType="+t.businessType).then(function(t){return t.data})},e.a=function(t){return o.b.get("/api-finance/finance/report/v1/findDetail?startCreatTime="+t.startCreatTime+"&endCreatTime="+t.endCreatTime+"&shipFromOrgid="+t.shipFromOrgid).then(function(t){return t.data})};var o=r("Vo7i")},"8Om5":function(t,e,r){"use strict";var o={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("el-form",{ref:"searchForm",staticClass:"staff_searchinfo clearfix",attrs:{inline:!0,size:e.btnsize,"label-position":"right",rules:e.rules,model:e.searchForm,"label-width":"80px"}},[r("div",{staticClass:"staff_searchinfo--input"},[r("el-form-item",{attrs:{label:"开单时间"}},[r("el-date-picker",{attrs:{"default-value":e.defaultTime,type:"daterange",align:"right","value-format":"yyyy-MM-dd","start-placeholder":"开始日期","picker-options":e.pickerOptions,"end-placeholder":"结束日期"},on:{focus:function(t){e.hideIframe(!0)},blur:function(t){e.hideIframe(!1)}},model:{value:e.searchTime,callback:function(t){e.searchTime=t},expression:"searchTime"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"开单网点",prop:"shipFromOrgid"}},[r("SelectTree",{attrs:{focus:function(){e.hideIframe(!0)},orgid:e.otherinfo.orgid},on:{change:function(){e.hideIframe(!1)}},model:{value:e.searchForm.shipFromOrgid,callback:function(t){e.$set(e.searchForm,"shipFromOrgid",t)},expression:"searchForm.shipFromOrgid"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"发货人",prop:"senderCustomerName"}},[r("el-input",{model:{value:e.searchForm.senderCustomerName,callback:function(t){e.$set(e.searchForm,"senderCustomerName",t)},expression:"searchForm.senderCustomerName"}})],1)],1),e._v(" "),r("el-form-item",{staticClass:"staff_searchinfo--btn"},[r("el-button",{attrs:{type:"primary"},on:{click:e.onSubmit}},[e._v("查询")]),e._v(" "),r("el-button",{attrs:{type:"info",plain:""},on:{click:function(t){e.clearForm("searchForm")}}},[e._v("清空")])],1)],1)},staticRenderFns:[]};e.a=o},CnyF:function(t,e,r){"use strict";var o=r("woOf"),i=r.n(o),n=r("E4LH"),a=r("o9X6"),l=r("pAQG"),s=r("0xDb");e.a={components:{SelectTree:a.a,querySelect:l.a},props:{btnsize:{type:String,default:"mini"},orgid:{type:Number}},data:function(){return{searchForm:{shipFromOrgid:"",senderCustomerName:""},rules:{shipSn:[{validator:function(t,e,r){var o=n.a.ONLY_NUMBER;""!==e&&null!==e&&e&&void 0!==e?o.test(e)?r():r(new Error("请输入最多15位数字")):r()},tigger:"blur"}]},searchTime:[Object(s.parseTime)(new Date-5184e6),Object(s.parseTime)(new Date)],defaultTime:[+new Date-5184e6,+new Date],pickerOptions:{shortcuts:s.pickerOptions2}}},mounted:function(){this.searchForm.shipFromOrgid=this.orgid,this.onSubmit()},methods:{onSubmit:function(){var t=i()({},this.searchForm);this.searchTime&&(this.$set(t,"createTimeStart",Object(s.parseTime)(this.searchTime[0],"{y}-{m}-{d}")),this.$set(t,"createTimeEnd",Object(s.parseTime)(this.searchTime[1],"{y}-{m}-{d}"))),this.$emit("change",t)},hideIframe:function(t){this.$emit("hideIframe",t)},clearForm:function(t){var e=this;this.$nextTick(function(){e.$refs[t].resetFields(),e.searchForm=e.$options.data().searchForm,console.log(e.searchForm),e.searchForm.shipFromOrgid=e.orgid})}}}},RUXP:function(t,e,r){"use strict";var o=r("woOf"),i=r.n(o),n=r("Dd8w"),a=r.n(n),l=(r("E4LH"),r("NYxO")),s=(r("0xDb"),r("//0s")),c=r("6b+M"),p=r("UQm2");e.a={components:{SearchForm:s.default},data:function(){return{loading:!0,chartIframe:"",hideiframe:"hide",query:{currentPage:1,pageSize:100},fontSizeHeadMini:2,bgcolorHead:"yellow",btnsize:"mini",isShow:!0,columns:[{label:"序号",prop:"id",textAlign:"center",width:"70"},{label:"开单网点",prop:"orgidName",textAlign:"center",width:"130"},{label:"签收网点",prop:"signOrgidName",textAlign:"center",width:"130"},{label:"到达城市",prop:"shipToCityName",textAlign:"center",width:"200"},{label:"发货人",prop:"senderCustomerName",textAlign:"center",width:"140"},{label:"货品名",prop:"cargoName",textAlign:"center"},{label:"现付(元)",prop:"shipNowpayFee",textAlign:"right"},{label:"到付(元)",prop:"shipArrivepayFee",textAlign:"right"},{label:"回单付(元)",prop:"shipReceiptpayFee",textAlign:"right"},{label:"月结(元)",prop:"shipMonthpayFee",textAlign:"right"},{label:"运费合计(元)",prop:"totalFee",textAlign:"right"},{label:"回扣(元)",prop:"brokerageFee",textAlign:"right"},{label:"代收货款(元)",prop:"agencyFund",textAlign:"right"},{label:"实收金额(元)",prop:"amountCollected",textAlign:"right"}],countCol:["shipNowpayFee","shipArrivepayFee","shipReceiptpayFee","shipMonthpayFee","totalFee","brokerageFee","agencyFund","amountCollected"],countColVal:[]}},computed:a()({},Object(l.b)(["otherinfo"])),mounted:function(){this.getScrollWidth()},methods:{getScrollWidth:function(){var t,e,r=document.createElement("DIV");r.style.cssText="position:absolute;top:-1000px;width:100px;height:100px; overflow:hidden;",t=document.body.appendChild(r).clientWidth,r.style.overflowY="scroll",e=r.clientWidth,document.body.removeChild(r),this.scrollwidth=t-e},report:function(){var I=this;this.loading=!0,Object(c.d)(this.query).then(function(t){var e=t.list;I.loading=!1;var r=document.getElementById("report_turnoverDaily_table");if(r){var o=r.getElementsByTagName("thead"),i=r.getElementsByTagName("tbody"),n=r.getElementsByTagName("tfoot");0<o.length&&(r.removeChild(o[0]),r.removeChild(i[0]),r.removeChild(n[0]));var a=document.createElement("thead"),l=document.createElement("tbody"),s=document.createElement("tfoot"),c=document.createElement("tr");r.appendChild(a),r.appendChild(l),r.appendChild(s),a.appendChild(c),r.style.borderCollapse="collapse",r.style.border="1px solid #d0d7e5",r.setAttribute("border","1"),r.setAttribute("font","12px"),c.setAttribute("height","32px"),c.setAttribute("width","100%");for(var p=0;p<I.columns.length;p++){var d=document.createElement("th"),u=document.createElement("font");u.innerHTML=I.columns[p].label,u.setAttribute("size",2),u.setAttribute("color","white"),d.setAttribute("border",1),d.setAttribute("bgcolor","dimGray"),d.appendChild(u),d.setAttribute("width",(I.columns[p].width||120)+"px"),c.appendChild(d)}for(var h=0;h<e.length;h++)for(var m=l.insertRow(),g=0;g<I.columns.length;g++){var f=m.insertCell();for(var b in I.countCol)-1!==I.columns[g].prop.indexOf(I.countCol[b])&&(e[h][I.columns[g].prop]=e[h][I.columns[g].prop]?Number(e[h][I.columns[g].prop]).toFixed(2):"");f.innerHTML="id"===I.columns[g].prop||"序号"===I.columns[g].label?h+1:void 0===e[h][I.columns[g].prop]||0===e[h][I.columns[g].prop]?"":e[h][I.columns[g].prop],f.style.textAlign=I.columns[g].textAlign,f.style.padding="2px 3px",f.style.fontSize="13px",f.setAttribute("width",(I.columns[g].width||120)+"px")}var v=t.list;for(var x in I.countCol){for(var y=0,_=I.countCol[x].split("|"),w=0;w<v.length;w++)y+=v[w][_[0]]?Number(v[w][_[0]]):0;(y||0===y)&&(_[1]&&"integer"===_[1]?I.countColVal[_[0]]=y||"":I.countColVal[_[0]]=y?y.toFixed(2):"")}var C=s.insertRow();for(var T in I.columns){var F=C.insertCell();F.innerHTML="序号"===I.columns[T].label?"合计":I.countColVal[I.columns[T].prop]?I.countColVal[I.columns[T].prop]:"-",F.style.textAlign=I.columns[T].textAlign,F.style.padding="2px 5px",F.style.fontSize="13px",F.setAttribute("bgcolor","gainsboro"),F.setAttribute("color","white")}var A=document.getElementsByClassName("footTotalFee")[0],O=A.getElementsByTagName("tfoot");0<O.length&&A.removeChild(O[0]);var N=document.createElement("tfoot");A.appendChild(N),A.style.borderCollapse="collapse",A.style.border="1px solid #d0d7e5",A.setAttribute("border","1"),A.setAttribute("font","12px");var E=N.insertRow();for(var S in I.columns){var z=E.insertCell();z.innerHTML="序号"===I.columns[S].label?"合计":I.countColVal[I.columns[S].prop]?I.countColVal[I.columns[S].prop]:"-",z.style.textAlign=I.columns[S].textAlign,z.style.padding="2px 5px",z.style.fontSize="13px",z.setAttribute("bgcolor","gainsboro"),z.setAttribute("color","white")}}}).catch(function(t){I.loading=!1,I._handlerCatchMsg(t)})},doAction:function(t){switch(t){case"print":Object(p.e)({id:"report_turnoverDaily",countCol:this.countCol});break;case"export":Object(p.h)({id:"report_turnoverDaily",name:"营业额日报表",countCol:this.countCol})}},getSearchParam:function(t){this.query=i()(this.query,t),this.report()},handleBottom:function(t){var e=t.target,r=e.scrollTop,o=e.offsetWidth<e.scrollWidth,i=e.offsetHeight,n=this.$refs.footTotalFee,a=r+i-n.offsetHeight;o&&(a-=this.scrollwidth),this.maxheight||(this.maxheight=e.scrollHeight),n.style.bottom="auto",n.style.top=(a>this.maxheight?this.maxheight:a)+"px"}}}},YeJj:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=r("RUXP"),i=r("zX6D");var n=function(t){r("oEcg")},a=r("VU/8")(o.a,i.a,n,null,null);e.default=a.exports},oEcg:function(t,e){},zX6D:function(t,e,r){"use strict";var o={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"tab-content chartSender"},[r("SearchForm",{attrs:{orgid:e.otherinfo.orgid,btnsize:e.btnsize},on:{change:e.getSearchParam}}),e._v(" "),r("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticClass:"tab_info"},[r("div",{staticClass:"btns_box"},[r("el-button",{directives:[{name:"has",rawName:"v-has:REPORT_PRINT_2",arg:"REPORT_PRINT_2"}],attrs:{type:"primary",size:e.btnsize,icon:"el-icon-printer",plain:""},on:{click:function(t){e.doAction("print")}}},[e._v("打印报表")]),e._v(" "),r("el-button",{attrs:{type:"primary",size:e.btnsize,icon:"el-icon-printer",plain:""},on:{click:function(t){e.doAction("export")}}},[e._v("导出报表")])],1),e._v(" "),r("div",{staticClass:"info_tab_report",attrs:{id:"report_turnoverDaily"},on:{scroll:e.handleBottom}},[e._m(0),e._v(" "),r("table",{ref:"footTotalFee",staticClass:"footTotalFee"},[r("colgroup",{attrs:{width:"56px"}}),e._v(" "),r("colgroup",{attrs:{width:"130px"}}),e._v(" "),r("colgroup",{attrs:{width:"140px"}}),e._v(" "),r("colgroup",{attrs:{width:"155px"}}),e._v(" "),r("colgroup",{attrs:{width:"110px"}}),e._v(" "),r("colgroup",{attrs:{width:"100px"}}),e._v(" "),r("colgroup",{attrs:{width:"100px"}}),e._v(" "),r("colgroup",{attrs:{width:"100px"}}),e._v(" "),r("colgroup",{attrs:{width:"100px"}}),e._v(" "),r("colgroup",{attrs:{width:"98px"}}),e._v(" "),r("colgroup",{attrs:{width:"98px"}}),e._v(" "),r("colgroup",{attrs:{width:"98px"}}),e._v(" "),r("colgroup",{attrs:{width:"110px"}}),e._v(" "),r("colgroup",{attrs:{width:"100px"}})])])])],1)},staticRenderFns:[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("table",{attrs:{id:"report_turnoverDaily_table"}},[r("colgroup",{attrs:{width:"58px"}}),t._v(" "),r("colgroup",{attrs:{width:"130px"}}),t._v(" "),r("colgroup",{attrs:{width:"145px"}}),t._v(" "),r("colgroup",{attrs:{width:"165px"}}),t._v(" "),r("colgroup",{attrs:{width:"120px"}}),t._v(" "),r("colgroup",{attrs:{width:"100px"}}),t._v(" "),r("colgroup",{attrs:{width:"100px"}}),t._v(" "),r("colgroup",{attrs:{width:"100px"}}),t._v(" "),r("colgroup",{attrs:{width:"100px"}}),t._v(" "),r("colgroup",{attrs:{width:"98px"}}),t._v(" "),r("colgroup",{attrs:{width:"98px"}}),t._v(" "),r("colgroup",{attrs:{width:"98px"}}),t._v(" "),r("colgroup",{attrs:{width:"120px"}}),t._v(" "),r("colgroup",{attrs:{width:"98px"}})])}]};e.a=o}});