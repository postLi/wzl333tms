webpackJsonp([88,219,235,325],{"+RRO":function(e,t,i){"use strict";var r=i("woOf"),n=i.n(r),a=i("Dd8w"),o=i.n(a),s=(i("E4LH"),i("NYxO")),l=i("o9X6"),c=i("pAQG"),m=(i("0xDb"),i("//0s")),h=i("TIfe");t.a={components:{SelectTree:l.a,querySelect:c.a,SearchForm:m.default},data:function(){return{chartIframe:"",query:{currentPage:1,pageSize:100},btnsize:"mini"}},computed:o()({},Object(s.mapGetters)(["otherinfo"])),methods:{doAction:function(e){switch(e){case"print":document.getElementById("senderIframe").contentWindow.OnEvent("AF","Print","");break;case"preview":document.getElementById("senderIframe").contentWindow.OnEvent("AF","Preview","");break;case"setting":document.getElementById("senderIframe").contentWindow.OnEvent("AF","Setting","")}},hideIframe:function(e){e?"show"!==this.hideiframe&&(this.hideiframe="show",document.getElementById("senderIframe").contentWindow.hideChart(e)):"hide"!==this.hideiframe&&(this.hideiframe="hide",document.getElementById("senderIframe").contentWindow.hideChart(e))},getSearchParam:function(e){this.query=n()(this.query,e);var t=Object(h.b)();this.$set(this.query,"access_token",t);var i="?";for(var r in this.query)i+=r+"="+String(this.query[r]).trim()+"&";var a=window.location.protocol+"//"+window.location.host+"/static/supcan/turnoverDaily.html"+i+"&"+(new Date).getTime();this.chartIframe=encodeURI(a)},setTable:function(){}}}},"//0s":function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=i("CnyF"),a=i("8Om5"),n=i("VU/8")(r.a,a.a,null,null,null);t.default=n.exports},"6b+M":function(e,t,i){"use strict";t.c=function(e){return r.b.get("/api-finance/finance/report/v1/FeeAggregation?orgId="+e.orgId+"&startTime="+e.startTime+"&endTime="+e.endTime+"&typeIds="+e.typeIds+"&senderId="+e.senderId).then(function(e){return e.data||{list:[],totalCount:0}})},t.d=function(e){return r.b.get("/api-finance/finance/report/v1/dateReport?currentPage="+e.currentPage+"&pageSize="+e.pageSize+"&createTimeStart="+e.createTimeStart+"&createTimeEnd="+e.createTimeEnd+"&shipFromOrgid="+e.shipFromOrgid+"&senderCustomerName="+e.senderCustomerName+"&shipToOrgid="+e.shipToOrgid+"&shipToCityName="+e.shipToCityName+"&shipFromCityName="+e.shipFromCityName).then(function(e){return e.data})},t.e=function(e){return r.b.get("/api-finance/finance/report/v1/turnoverReport?createTimeStart="+e.createTimeStart+"&createTimeEnd="+e.createTimeEnd+"&shipFromOrgid="+e.shipFromOrgid).then(function(e){return e.data})},t.b=function(e){return r.b.get("/api-finance/finance/report/v1/findOperationReport?startTime="+e.startTime+"&endTime="+e.endTime+"&orgId="+e.orgId+"&selectType="+e.selectType+"&shipToCityName="+e.shipToCityName+"&businessType="+e.businessType).then(function(e){return e.data})},t.a=function(e){return r.b.get("/api-finance/finance/report/v1/findDetail?startCreatTime="+e.startCreatTime+"&endCreatTime="+e.endCreatTime+"&shipFromOrgid="+e.shipFromOrgid).then(function(e){return e.data})};var r=i("Vo7i")},"8Om5":function(e,t,i){"use strict";var r={render:function(){var i=this,e=i.$createElement,t=i._self._c||e;return t("el-form",{ref:"searchForm",staticClass:"staff_searchinfo clearfix",attrs:{inline:!0,size:i.btnsize,"label-position":"right",rules:i.rules,model:i.searchForm,"label-width":"70px"}},[t("div",{staticClass:"staff_searchinfo--input"},[t("el-form-item",{attrs:{label:"开单时间"}},[t("el-date-picker",{attrs:{"default-value":i.defaultTime,type:"daterange","unlink-panels":"",align:"right","value-format":"yyyy-MM-dd","start-placeholder":"开始日期","picker-options":i.pickerOptions,"end-placeholder":"结束日期"},on:{focus:function(e){i.hideIframe(!0)},blur:function(e){i.hideIframe(!1)}},model:{value:i.searchTime,callback:function(e){i.searchTime=e},expression:"searchTime"}})],1),i._v(" "),t("el-form-item",{attrs:{label:"开单网点",prop:"shipFromOrgid"}},[t("SelectTree",{attrs:{focus:function(){i.hideIframe(!0)},orgid:i.otherinfo.orgid},on:{change:function(e,t){i.hideIframe(!1,e,t,"from")}},model:{value:i.searchForm.shipFromOrgid,callback:function(e){i.$set(i.searchForm,"shipFromOrgid",e)},expression:"searchForm.shipFromOrgid"}})],1),i._v(" "),t("el-form-item",{attrs:{label:"到达网点",prop:"shipToOrgid"}},[t("SelectTree",{attrs:{focus:function(){i.hideIframe(!0)},clearable:""},on:{change:function(e,t){i.hideIframe(!1,e,t,"to")}},model:{value:i.searchForm.shipToOrgid,callback:function(e){i.$set(i.searchForm,"shipToOrgid",e)},expression:"searchForm.shipToOrgid"}})],1),i._v(" "),t("el-form-item",{attrs:{label:"发货人",prop:"senderCustomerName"}},[t("el-input",{model:{value:i.searchForm.senderCustomerName,callback:function(e){i.$set(i.searchForm,"senderCustomerName",e)},expression:"searchForm.senderCustomerName"}})],1),i._v(" "),t("el-form-item",{attrs:{label:"发站",prop:"shipFromCityName"}},[t("el-input",{model:{value:i.searchForm.shipFromCityName,callback:function(e){i.$set(i.searchForm,"shipFromCityName",e)},expression:"searchForm.shipFromCityName"}})],1),i._v(" "),t("el-form-item",{attrs:{label:"到站",prop:"shipToCityName"}},[t("el-input",{model:{value:i.searchForm.shipToCityName,callback:function(e){i.$set(i.searchForm,"shipToCityName",e)},expression:"searchForm.shipToCityName"}})],1)],1),i._v(" "),t("el-form-item",{staticClass:"staff_searchinfo--btn"},[t("el-button",{attrs:{type:"primary"},on:{click:i.onSubmit}},[i._v("查询")]),i._v(" "),t("el-button",{attrs:{type:"info",plain:""},on:{click:function(e){i.clearForm("searchForm")}}},[i._v("清空")])],1)],1)},staticRenderFns:[]};t.a=r},CnyF:function(e,t,i){"use strict";var r=i("woOf"),a=i.n(r),n=i("bOdI"),o=i.n(n),s=i("E4LH"),l=i("o9X6"),c=i("hq98"),m=i("pAQG"),h=i("0xDb");t.a={components:{SelectTree:l.a,querySelect:m.a,querySelectCity:c.a},props:{btnsize:{type:String,default:"mini"},orgid:{type:Number}},data:function(){var e;return{searchForm:(e={shipFromOrgid:"",senderCustomerName:""},o()(e,"shipFromOrgid",""),o()(e,"shipToOrgid",""),o()(e,"shipToCityName",""),o()(e,"shipFromCityName",""),e),orgName:{from:"",to:""},rules:{shipSn:[{validator:function(e,t,i){var r=s.a.ONLY_NUMBER;""!==t&&null!==t&&t&&void 0!==t?r.test(t)?i():i(new Error("请输入最多15位数字")):i()},tigger:"blur"}]},searchTime:[Object(h.parseTime)(new Date-5184e6),Object(h.parseTime)(new Date)],defaultTime:[+new Date-5184e6,+new Date],pickerOptions:{shortcuts:h.pickerOptions2}}},mounted:function(){this.searchForm.shipFromOrgid=this.orgid,this.orgName.from=this.otherinfo.orgName,this.$emit("orgName",this.orgName),this.onSubmit()},methods:{getCity:function(e,t){this.searchForm[t]=e?e.longAddr:e},onSubmit:function(){var e=a()({},this.searchForm);this.searchTime&&(this.$set(e,"createTimeStart",Object(h.parseTime)(this.searchTime[0],"{y}-{m}-{d}")),this.$set(e,"createTimeEnd",Object(h.parseTime)(this.searchTime[1],"{y}-{m}-{d}"))),this.$emit("change",e)},hideIframe:function(e,t,i,r){this.$emit("hideIframe",e),console.log(t,i,r),r&&(this.orgName[r]=i.name,this.$emit("orgName",this.orgName))},clearForm:function(e){var t=this;this.$nextTick(function(){t.$refs[e].resetFields(),t.searchForm=t.$options.data().searchForm,console.log(t.searchForm),t.searchForm.shipFromOrgid=t.orgid})}}}},IDkV:function(e,t,i){"use strict";var r={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"tab-content chartSender"},[i("SearchForm",{attrs:{orgid:t.otherinfo.orgid,btnsize:t.btnsize},on:{change:t.getSearchParam,hideIframe:t.hideIframe}}),t._v(" "),i("div",{staticClass:"tab_info"},[i("div",{staticClass:"btns_box"},[i("el-button",{directives:[{name:"has",rawName:"v-has:REPORT_PRINT_2",arg:"REPORT_PRINT_2"}],attrs:{type:"primary",size:t.btnsize,icon:"el-icon-printer",plain:""},on:{click:function(e){t.doAction("print")}}},[t._v("打印报表")]),t._v(" "),i("el-button",{directives:[{name:"has",rawName:"v-has:REPORT_VIEW_2",arg:"REPORT_VIEW_2"}],attrs:{type:"primary",size:t.btnsize,icon:"el-icon-view",plain:""},on:{click:function(e){t.doAction("preview")}}},[t._v("打印预览")]),t._v(" "),i("el-button",{directives:[{name:"has",rawName:"v-has:REPORT_SETTING_2",arg:"REPORT_SETTING_2"}],attrs:{type:"primary",size:t.btnsize,icon:"el-icon-setting",plain:""},on:{click:function(e){t.doAction("setting")}}},[t._v("打印设置")])],1),t._v(" "),i("div",{staticClass:"info_tab"},[i("iframe",{ref:"senderIframe",staticClass:"chartIframe",attrs:{src:t.chartIframe,id:"senderIframe",frameborder:"0",scrolling:"none",name:"showHere"}})])])],1)},staticRenderFns:[]};t.a=r},IyQW:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=i("+RRO"),a=i("IDkV");var n=function(e){i("b8y3")},o=i("VU/8")(r.a,a.a,n,null,null);t.default=o.exports},PnK4:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=i("rnGW"),a=i("yF/J"),n=i("VU/8")(r.a,a.a,null,null,null);t.default=n.exports},RUXP:function(e,t,i){"use strict";var r=i("woOf"),a=i.n(r),n=i("Dd8w"),o=i.n(n),s=(i("E4LH"),i("NYxO")),l=i("0xDb"),c=i("//0s"),m=i("6b+M"),h=i("UQm2"),d=i("puNT"),u=i("1onU");t.a={components:{SearchForm:c.default,TableSetup:d.a,Pager:u.a},data:function(){return{tableTitle:"",titleObj:{title:"",time:"",arrive:"",area:""},res:{},total:0,tablekey:0,dataList:[],setupTableVisible:!1,thecode:"FINANCE_DATEREPORT",visible2:!1,loading:!0,chartIframe:"",hideiframe:"hide",query:{currentPage:1,pageSize:1e3},fontSizeHeadMini:2,bgcolorHead:"yellow",btnsize:"mini",isShow:!0,columns:[{label:"序号",prop:"number",textAlign:"center"},{label:"货号",prop:"shipGoodsSn",textAlign:"center",width:"150"},{label:"开单网点",prop:"orgidName",textAlign:"center"},{label:"签收网点",prop:"signOrgidName",textAlign:"center"},{label:"开单时间",prop:"createTime",textAlign:"center"},{label:"发站",prop:"shipFromCityName",textAlign:"center"},{label:"到站",prop:"shipToCityName",textAlign:"center"},{label:"发货人",prop:"senderCustomerName",textAlign:"center"},{label:"货品名",prop:"cargoName",textAlign:"center"},{label:"现付(元)",prop:"shipNowpayFee",textAlign:"right"},{label:"到付(元)",prop:"shipArrivepayFee",textAlign:"right"},{label:"回单付(元)",prop:"shipReceiptpayFee",textAlign:"right"},{label:"月结(元)",prop:"shipMonthpayFee",textAlign:"right"},{label:"运费合计(元)",prop:"totalFee",textAlign:"right"},{label:"回扣(元)",prop:"brokerageFee",textAlign:"right"},{label:"代收货款(元)",prop:"agencyFund",textAlign:"right"},{label:"实收金额(元)",prop:"amountCollected",textAlign:"right"}],countCol:["shipNowpayFee","shipArrivepayFee","shipReceiptpayFee","shipMonthpayFee","totalFee","brokerageFee","agencyFund","amountCollected"],countColVal:[],getOrgName:{from:"",to:""}}},computed:o()({},Object(s.mapGetters)(["otherinfo"])),mounted:function(){this.getScrollWidth()},methods:{handleOrgName:function(e){this.getOrgName=a()({},e)},rowStyle:function(e){e.row;if(0===e.rowIndex)return this.query.createTimeStart&&this.query.createTimeEnd?this.tableTitle=Object(l.parseTime)(this.query.createTimeStart,"{y}年{m}月{d}日")+"~"+Object(l.parseTime)(this.query.createTimeEnd,"{y}年{m}月{d}日")+"营业额汇总表":this.tableTitle="营业额汇总表",{fontSize:"16px"}},setTableTitle:function(){var e={title:Object(l.parseTime)(this.query.createTimeStart,"{y}年{m}月{d}日")+"~"+Object(l.parseTime)(this.query.createTimeEnd,"{y}年{m}月{d}日")+"营业额汇总表",starttime:Object(l.parseTime)(this.query.createTimeStart,"{y}-{m}-{d}"),endtime:Object(l.parseTime)(this.query.createTimeEnd,"{y}-{m}-{d}"),area:"",shipToName:this.getOrgName.from},t=Object(l.objectMerge2)([],this.dataList);if(this.dataList.length){var i=this.dataList[0].shipFromCityName+"—"+this.dataList[0].shipToCityName,r=t.every(function(e){return e.shipFromCityName+"—"+e.shipToCityName===i});e.area=r?i:"存在多个区间"}else e.area="";var a='<table width="100%"><tr style="text-align: left;padding: 20px 10px;"><td style="padding:0 10px;">开单时间：'+e.starttime+"至"+e.endtime+'</td><td style="padding:0 10px;'+(e.shipToName?"":"display:none")+'">     收货网点：'+e.shipToName+'</td><td style="padding：0 10px;'+(e.area?"":"display:none")+'">     区间：'+e.area+"</td></tr></table>";return{title:e.title,content:a}},handlePageChange:function(e){this.query.currentPage=e.pageNum,this.query.pageSize=e.pageSize,this.fetchData()},getScrollWidth:function(){var e,t,i=document.createElement("DIV");i.style.cssText="position:absolute;top:-1000px;width:100px;height:100px; overflow:hidden;",e=document.body.appendChild(i).clientWidth,i.style.overflowY="scroll",t=i.clientWidth,document.body.removeChild(i),this.scrollwidth=e-t},fetchData:function(){var i=this;Object(m.d)(this.query).then(function(e){e.list&&e.list.forEach(function(e,t){e.number=(i.query.currentPage-1)*i.query.pageSize+t+1}),i.res=e||{list:[]},i.total=e.total,i.report()}).catch(function(e){i.loading=!1,i._handlerCatchMsg(e)})},report:function(){this.loading=!0;var e=this.res.list,t=this.res.list||[];this.dataList=t;this.loading=!1;var i=document.getElementById("report_turnoverDaily"),r=document.getElementById("report_turnoverDaily_table");if(r){var a=r.getElementsByTagName("thead"),n=r.getElementsByTagName("tbody"),o=r.getElementsByTagName("tfoot");0<a.length&&(r.removeChild(a[0]),r.removeChild(n[0]),r.removeChild(o[0]));var s=document.createElement("thead"),l=document.createElement("tbody"),c=document.createElement("tfoot"),m=document.createElement("tr"),h=this.setTableTitle(),d=document.createElement("tr"),u=document.createElement("th"),p=document.createElement("font");u.setAttribute("colspan",this.columns.length),p.innerHTML=h.title,u.appendChild(p),d.appendChild(u),s.appendChild(d);var f=document.createElement("tr"),b=document.createElement("th"),g=document.createElement("font");b.setAttribute("colspan",this.columns.length),g.innerHTML=h.content,b.appendChild(g),f.appendChild(b),s.appendChild(f),r.appendChild(s),r.appendChild(l),r.appendChild(c),s.appendChild(m),r.style.borderCollapse="collapse",r.style.border="1px solid #d0d7e5",r.setAttribute("border","1"),r.setAttribute("font","12px"),m.setAttribute("height","32px"),m.setAttribute("width","100%");for(var v=0;v<this.columns.length;v++){var y=document.createElement("th"),T=document.createElement("font");T.innerHTML=this.columns[v].label,T.setAttribute("size",2),T.setAttribute("color","white"),y.setAttribute("border",1),y.setAttribute("bgcolor","dimGray"),y.appendChild(T),y.setAttribute("width",(this.columns[v].width||120)+"px"),m.appendChild(y)}var C=r.cloneNode(!0);C.setAttribute("id","tableClone"),C.setAttribute("refs","tableClone"),C.className="tableCloneHead",i.appendChild(C);for(var _=0;_<e.length;_++)for(var x=l.insertRow(),F=0;F<this.columns.length;F++){var w=x.insertCell();for(var N in this.countCol)-1!==this.columns[F].prop.indexOf(this.countCol[N])&&(e[_][this.columns[F].prop]=e[_][this.columns[F].prop]?Number(e[_][this.columns[F].prop]).toFixed(2):"",t=e);var O=(this.query.currentPage-1)*this.query.pageSize+_+1,S="number"===this.columns[F].prop||"序号"===this.columns[F].label?O:void 0===e[_][this.columns[F].prop]||0===e[_][this.columns[F].prop]?"":e[_][this.columns[F].prop];w.innerHTML=S,t[_][this.columns[F].prop]=S,w.style.textAlign=this.columns[F].textAlign,w.style.padding="2px 3px",w.style.fontSize="13px",w.setAttribute("width",(this.columns[F].width||120)+"px"),w.style.wordBreak="break-all"}this.dataList=t;var E=this.res.list;for(var A in this.countCol){for(var I=0,k=this.countCol[A].split("|"),R=0;R<E.length;R++)I+=E[R][k[0]]?Number(E[R][k[0]]):0;(I||0===I)&&(k[1]&&"integer"===k[1]?this.countColVal[k[0]]=I||"":this.countColVal[k[0]]=I?I.toFixed(2):"")}var z=c.insertRow();for(var P in this.columns){var q=z.insertCell();q.innerHTML="序号"===this.columns[P].label?"合计":this.countColVal[this.columns[P].prop]?this.countColVal[this.columns[P].prop]:"-",q.style.textAlign=this.columns[P].textAlign,q.style.padding="2px 5px",q.style.fontSize="13px",q.setAttribute("bgcolor","gainsboro"),q.setAttribute("color","white"),q.style.wordBreak="break-all"}var D=document.getElementsByClassName("footTotalFee")[0],j=D.getElementsByTagName("tfoot");0<j.length&&D.removeChild(j[0]);var B=document.createElement("tfoot");D.appendChild(B),D.style.borderCollapse="collapse",D.style.border="1px solid #d0d7e5",D.setAttribute("border","1"),D.setAttribute("font","12px");var V=B.insertRow();for(var M in this.columns){var $=V.insertCell();$.innerHTML="序号"===this.columns[M].label?"合计":this.countColVal[this.columns[M].prop]?this.countColVal[this.columns[M].prop]:"-",$.style.textAlign=this.columns[M].textAlign,$.style.padding="2px 5px",$.style.fontSize="13px",$.setAttribute("bgcolor","gainsboro"),$.setAttribute("color","white"),$.style.wordBreak="break-all"}}},doAction:function(e){switch(this.report(),e){case"print":Object(h.e)({id:"report_turnoverDaily",countCol:this.countCol});break;case"export":Object(h.h)({id:"report_turnoverDaily",name:"营业额日报表",countCol:this.countCol})}},getSearchParam:function(e){this.query=a()(this.query,e),this.fetchData()},handleBottom:function(e){var t=e.target,i=t.scrollTop,r=t.offsetWidth<t.scrollWidth,a=t.offsetHeight,n=this.$refs.footTotalFee,o=i+a-n.offsetHeight;r&&(o-=this.scrollwidth),this.maxheight||(this.maxheight=t.scrollHeight),n.style.bottom="auto",n.style.top=(o>this.maxheight?this.maxheight:o)+"px",document.getElementById("tableClone").style.top=i+"px"},showSaveBox:function(){clearTimeout(this.tabletimer)},hideSaveBox:function(){var e=this;clearTimeout(this.tabletimer),this.tabletimer=setTimeout(function(){e.visible2=!1},1e4)},setTableWidth:function(e,t,i,r){var a=this,n=this.columns.filter(function(e){return e.prop===i.property});n.length&&(n[0].width=e+"",this.visible2=!0,clearTimeout(this.tabletimer),this.tabletimer=setTimeout(function(){a.visible2=!1},1e4)),console.log("setTableWidth",e,t,i,r,this.columns)},saveToTableSetup:function(){this.visible2=!1,this.eventBus.$emit("tablesetup.change",this.thecode,this.columns)},setColumn:function(e){this.columns=e,this.tablekey=(new Date).getTime()},getSummary:function(e){var r=this,t=e.columns,a=(e.data,[]);return a[0]="合计",t.forEach(function(e,t){for(var i in r.countColVal)e.property===i&&(a[t]=r.countColVal[i]+"")}),a}}}},YeJj:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=i("RUXP"),a=i("zX6D");var n=function(e){i("oEcg")},o=i("VU/8")(r.a,a.a,n,null,null);t.default=o.exports},b8y3:function(e,t){},oEcg:function(e,t){},rnGW:function(e,t,i){"use strict";var r=i("IyQW"),a=i("YeJj");t.a={components:{sender:r.default,list:a.default},data:function(){return{component:"list"}}}},"yF/J":function(e,t,i){"use strict";var r={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"tab-wrapper tab-wrapper-100"},[t(this.component,{tag:"keep-alive"})],1)},staticRenderFns:[]};t.a=r},zX6D:function(e,t,i){"use strict";var r={render:function(){var i=this,e=i.$createElement,r=i._self._c||e;return r("div",{staticClass:"tab-content chartSender"},[r("SearchForm",{attrs:{orgid:i.otherinfo.orgid,btnsize:i.btnsize},on:{orgName:i.handleOrgName,change:i.getSearchParam}}),i._v(" "),r("div",{directives:[{name:"loading",rawName:"v-loading",value:i.loading,expression:"loading"}],staticClass:"tab_info"},[r("div",{staticClass:"btns_box"},[r("el-button",{directives:[{name:"has",rawName:"v-has:REPORT_PRINT_2",arg:"REPORT_PRINT_2"}],attrs:{type:"primary",size:i.btnsize,icon:"el-icon-printer",plain:""},on:{click:function(e){i.doAction("print")}}},[i._v("打印报表")]),i._v(" "),r("el-button",{attrs:{type:"primary",size:i.btnsize,icon:"el-icon-printer",plain:""},on:{click:function(e){i.doAction("export")}}},[i._v("导出报表")]),i._v(" "),r("el-popover",{attrs:{placement:"right-end",width:"160",trigger:"manual"},nativeOn:{mouseenter:function(e){return i.showSaveBox(e)},mouseout:function(e){return i.hideSaveBox(e)}},model:{value:i.visible2,callback:function(e){i.visible2=e},expression:"visible2"}},[r("p",[i._v("表格宽度修改了，是否要保存？")]),i._v(" "),r("div",{staticStyle:{"text-align":"right",margin:"0"}},[r("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(e){i.visible2=!1}}},[i._v("取消")]),i._v(" "),r("el-button",{attrs:{type:"primary",size:"mini"},on:{click:i.saveToTableSetup}},[i._v("确定")])],1),i._v(" "),r("el-button",{attrs:{slot:"reference",type:"text"},slot:"reference"})],1)],1),i._v(" "),r("div",{staticClass:"tab_report_daily"},[r("el-table",{key:i.tablekey,ref:"multipleTableRight",staticStyle:{width:"100%"},attrs:{slot:"reference",data:i.dataList,"show-summary":!0,height:"100%",border:"","tooltip-effect":"dark",triped:"","show-overflow-tooltip":!0,"header-row-style":i.rowStyle,"summary-method":i.getSummary},on:{"header-dragend":i.setTableWidth},slot:"reference"},[r("el-table-column",{staticClass:"tableTitle",attrs:{label:i.tableTitle}},[i._l(i.columns,function(t){return[t.scope?r("el-table-column",{attrs:{"show-overflow-tooltip":"",prop:t.prop,label:t.label,width:t.width,fixed:t.fixed},scopedSlots:i._u([{key:"default",fn:function(e){return[r("span",{domProps:{innerHTML:i._s(t.slot(e))}})]}}])}):r("el-table-column",{attrs:{"show-overflow-tooltip":"",prop:t.prop,label:t.label,width:t.width,fixed:t.fixed}})]})],2)],1)],1),i._v(" "),r("div",{staticClass:"info_tab_footer"},[i._v("\n      共计:"+i._s(i.total)+"\n      "),r("div",{staticClass:"show_pager"},[r("Pager",{attrs:{total:i.total,defaultSize:i.query.pageSize,sizes:[100,200,500,1e3,2e3]},on:{change:i.handlePageChange}})],1)]),i._v(" "),r("div",{staticClass:"info_tab_report",staticStyle:{display:"none"},attrs:{id:"report_turnoverDaily"},on:{scroll:i.handleBottom}},[r("div",{staticStyle:{"text-align":"center"},attrs:{id:"tableTitle"}}),i._v(" "),r("table",{staticClass:"report_turnoverDaily_table",attrs:{id:"report_turnoverDaily_table"}}),i._v(" "),r("table",{ref:"footTotalFee",staticClass:"footTotalFee"})])]),i._v(" "),r("TableSetup",{attrs:{popVisible:i.setupTableVisible,columns:i.columns,code:i.thecode},on:{close:function(e){i.setupTableVisible=!1},success:i.setColumn}})],1)},staticRenderFns:[]};t.a=r}});