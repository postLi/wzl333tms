webpackJsonp([217,319],{"//0s":function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=i("CnyF"),o=i("8Om5"),n=i("VU/8")(r.a,o.a,null,null,null);t.default=n.exports},"6b+M":function(e,t,i){"use strict";t.c=function(e){return r.b.get("/api-finance/finance/report/v1/FeeAggregation?orgId="+e.orgId+"&startTime="+e.startTime+"&endTime="+e.endTime+"&typeIds="+e.typeIds+"&senderId="+e.senderId).then(function(e){return e.data||{list:[],totalCount:0}})},t.d=function(e){return r.b.get("/api-finance/finance/report/v1/dateReport?currentPage="+e.currentPage+"&pageSize="+e.pageSize+"&createTimeStart="+e.createTimeStart+"&createTimeEnd="+e.createTimeEnd+"&shipFromOrgid="+e.shipFromOrgid+"&senderCustomerName="+e.senderCustomerName).then(function(e){return e.data})},t.e=function(e){return r.b.get("/api-finance/finance/report/v1/turnoverReport?createTimeStart="+e.createTimeStart+"&createTimeEnd="+e.createTimeEnd+"&shipFromOrgid="+e.shipFromOrgid).then(function(e){return e.data})},t.b=function(e){return r.b.get("/api-finance/finance/report/v1/findOperationReport?startTime="+e.startTime+"&endTime="+e.endTime+"&orgId="+e.orgId+"&selectType="+e.selectType+"&shipToCityName="+e.shipToCityName+"&businessType="+e.businessType).then(function(e){return e.data})},t.a=function(e){return r.b.get("/api-finance/finance/report/v1/findDetail?startCreatTime="+e.startCreatTime+"&endCreatTime="+e.endCreatTime+"&shipFromOrgid="+e.shipFromOrgid).then(function(e){return e.data})};var r=i("Vo7i")},"8Om5":function(e,t,i){"use strict";var r={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-form",{ref:"searchForm",staticClass:"staff_searchinfo clearfix",attrs:{inline:!0,size:t.btnsize,"label-position":"right",rules:t.rules,model:t.searchForm,"label-width":"80px"}},[i("div",{staticClass:"staff_searchinfo--input"},[i("el-form-item",{attrs:{label:"开单时间"}},[i("el-date-picker",{attrs:{"default-value":t.defaultTime,type:"daterange",align:"right","value-format":"yyyy-MM-dd","start-placeholder":"开始日期","picker-options":t.pickerOptions,"end-placeholder":"结束日期"},on:{focus:function(e){t.hideIframe(!0)},blur:function(e){t.hideIframe(!1)}},model:{value:t.searchTime,callback:function(e){t.searchTime=e},expression:"searchTime"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"开单网点",prop:"shipFromOrgid"}},[i("SelectTree",{attrs:{focus:function(){t.hideIframe(!0)},orgid:t.otherinfo.orgid},on:{change:function(){t.hideIframe(!1)}},model:{value:t.searchForm.shipFromOrgid,callback:function(e){t.$set(t.searchForm,"shipFromOrgid",e)},expression:"searchForm.shipFromOrgid"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"发货人",prop:"senderCustomerName"}},[i("el-input",{model:{value:t.searchForm.senderCustomerName,callback:function(e){t.$set(t.searchForm,"senderCustomerName",e)},expression:"searchForm.senderCustomerName"}})],1)],1),t._v(" "),i("el-form-item",{staticClass:"staff_searchinfo--btn"},[i("el-button",{attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v("查询")]),t._v(" "),i("el-button",{attrs:{type:"info",plain:""},on:{click:function(e){t.clearForm("searchForm")}}},[t._v("清空")])],1)],1)},staticRenderFns:[]};t.a=r},CnyF:function(e,t,i){"use strict";var r=i("woOf"),o=i.n(r),n=i("E4LH"),a=i("o9X6"),s=i("pAQG"),l=i("0xDb");t.a={components:{SelectTree:a.a,querySelect:s.a},props:{btnsize:{type:String,default:"mini"},orgid:{type:Number}},data:function(){return{searchForm:{shipFromOrgid:"",senderCustomerName:""},rules:{shipSn:[{validator:function(e,t,i){var r=n.a.ONLY_NUMBER;""!==t&&null!==t&&t&&void 0!==t?r.test(t)?i():i(new Error("请输入最多15位数字")):i()},tigger:"blur"}]},searchTime:[Object(l.parseTime)(new Date-5184e6),Object(l.parseTime)(new Date)],defaultTime:[+new Date-5184e6,+new Date],pickerOptions:{shortcuts:l.pickerOptions2}}},mounted:function(){this.searchForm.shipFromOrgid=this.orgid,this.onSubmit()},methods:{onSubmit:function(){var e=o()({},this.searchForm);this.searchTime&&(this.$set(e,"createTimeStart",Object(l.parseTime)(this.searchTime[0],"{y}-{m}-{d}")),this.$set(e,"createTimeEnd",Object(l.parseTime)(this.searchTime[1],"{y}-{m}-{d}"))),this.$emit("change",e)},hideIframe:function(e){this.$emit("hideIframe",e)},clearForm:function(e){var t=this;this.$nextTick(function(){t.$refs[e].resetFields(),t.searchForm=t.$options.data().searchForm,console.log(t.searchForm),t.searchForm.shipFromOrgid=t.orgid})}}}},RUXP:function(e,t,i){"use strict";var r=i("woOf"),o=i.n(r),n=i("Dd8w"),a=i.n(n),s=(i("E4LH"),i("NYxO")),l=(i("0xDb"),i("//0s")),c=i("6b+M"),u=i("UQm2"),h=i("puNT");t.a={components:{SearchForm:l.default,TableSetup:h.a},data:function(){return{res:{},tablekey:0,dataList:[],setupTableVisible:!1,thecode:"FINANCE_DATEREPORT",visible2:!1,loading:!0,chartIframe:"",hideiframe:"hide",query:{currentPage:1,pageSize:500},fontSizeHeadMini:2,bgcolorHead:"yellow",btnsize:"mini",isShow:!0,columns:[{label:"序号",prop:"number",textAlign:"center"},{label:"开单网点",prop:"orgidName",textAlign:"center"},{label:"签收网点",prop:"signOrgidName",textAlign:"center"},{label:"到站",prop:"shipToCityName",textAlign:"center"},{label:"发货人",prop:"senderCustomerName",textAlign:"center"},{label:"货品名",prop:"cargoName",textAlign:"center"},{label:"现付(元)",prop:"shipNowpayFee",textAlign:"right"},{label:"到付(元)",prop:"shipArrivepayFee",textAlign:"right"},{label:"回单付(元)",prop:"shipReceiptpayFee",textAlign:"right"},{label:"月结(元)",prop:"shipMonthpayFee",textAlign:"right"},{label:"运费合计(元)",prop:"totalFee",textAlign:"right"},{label:"回扣(元)",prop:"brokerageFee",textAlign:"right"},{label:"代收货款(元)",prop:"agencyFund",textAlign:"right"},{label:"实收金额(元)",prop:"amountCollected",textAlign:"right"}],countCol:["shipNowpayFee","shipArrivepayFee","shipReceiptpayFee","shipMonthpayFee","totalFee","brokerageFee","agencyFund","amountCollected"],countColVal:[]}},computed:a()({},Object(s.mapGetters)(["otherinfo"])),mounted:function(){this.getScrollWidth()},methods:{getScrollWidth:function(){var e,t,i=document.createElement("DIV");i.style.cssText="position:absolute;top:-1000px;width:100px;height:100px; overflow:hidden;",e=document.body.appendChild(i).clientWidth,i.style.overflowY="scroll",t=i.clientWidth,document.body.removeChild(i),this.scrollwidth=e-t},fetchData:function(){var t=this;Object(c.d)(this.query).then(function(e){e.list&&e.list.forEach(function(e,t){e.number=t+1}),t.res=e||{list:[]},t.report()}).catch(function(e){t.loading=!1,t._handlerCatchMsg(e)})},report:function(){this.loading=!0;var e=this.res.list,t=this.res.list||[];this.dataList=t;this.loading=!1;var i=document.getElementById("report_turnoverDaily"),r=document.getElementById("report_turnoverDaily_table");if(r){var o=r.getElementsByTagName("thead"),n=r.getElementsByTagName("tbody"),a=r.getElementsByTagName("tfoot");0<o.length&&(r.removeChild(o[0]),r.removeChild(n[0]),r.removeChild(a[0]));var s=document.createElement("thead"),l=document.createElement("tbody"),c=document.createElement("tfoot"),u=document.createElement("tr");r.appendChild(s),r.appendChild(l),r.appendChild(c),s.appendChild(u),r.style.borderCollapse="collapse",r.style.border="1px solid #d0d7e5",r.setAttribute("border","1"),r.setAttribute("font","12px"),u.setAttribute("height","32px"),u.setAttribute("width","100%");for(var h=0;h<this.columns.length;h++){var p=document.createElement("th"),d=document.createElement("font");d.innerHTML=this.columns[h].label,d.setAttribute("size",2),d.setAttribute("color","white"),p.setAttribute("border",1),p.setAttribute("bgcolor","dimGray"),p.appendChild(d),p.setAttribute("width",(this.columns[h].width||120)+"px"),u.appendChild(p)}var m=r.cloneNode(!0);m.setAttribute("id","tableClone"),m.setAttribute("refs","tableClone"),m.className="tableCloneHead",i.appendChild(m);for(var f=0;f<e.length;f++)for(var b=l.insertRow(),g=0;g<this.columns.length;g++){var v=b.insertCell();for(var y in this.countCol)-1!==this.columns[g].prop.indexOf(this.countCol[y])&&(e[f][this.columns[g].prop]=e[f][this.columns[g].prop]?Number(e[f][this.columns[g].prop]).toFixed(2):"",t=e);var T="number"===this.columns[g].prop||"序号"===this.columns[g].label?f+1:void 0===e[f][this.columns[g].prop]||0===e[f][this.columns[g].prop]?"":e[f][this.columns[g].prop];v.innerHTML=T,t[f][this.columns[g].prop]=T,v.style.textAlign=this.columns[g].textAlign,v.style.padding="2px 3px",v.style.fontSize="13px",v.setAttribute("width",(this.columns[g].width||120)+"px"),v.style.wordBreak="break-all"}this.dataList=t;var x=this.res.list;for(var C in this.countCol){for(var F=0,_=this.countCol[C].split("|"),w=0;w<x.length;w++)F+=x[w][_[0]]?Number(x[w][_[0]]):0;(F||0===F)&&(_[1]&&"integer"===_[1]?this.countColVal[_[0]]=F||"":this.countColVal[_[0]]=F?F.toFixed(2):"")}var A=c.insertRow();for(var S in this.columns){var O=A.insertCell();O.innerHTML="序号"===this.columns[S].label?"合计":this.countColVal[this.columns[S].prop]?this.countColVal[this.columns[S].prop]:"-",O.style.textAlign=this.columns[S].textAlign,O.style.padding="2px 5px",O.style.fontSize="13px",O.setAttribute("bgcolor","gainsboro"),O.setAttribute("color","white"),O.style.wordBreak="break-all"}var E=document.getElementsByClassName("footTotalFee")[0],N=E.getElementsByTagName("tfoot");0<N.length&&E.removeChild(N[0]);var k=document.createElement("tfoot");E.appendChild(k),E.style.borderCollapse="collapse",E.style.border="1px solid #d0d7e5",E.setAttribute("border","1"),E.setAttribute("font","12px");var z=k.insertRow();for(var D in this.columns){var I=z.insertCell();I.innerHTML="序号"===this.columns[D].label?"合计":this.countColVal[this.columns[D].prop]?this.countColVal[this.columns[D].prop]:"-",I.style.textAlign=this.columns[D].textAlign,I.style.padding="2px 5px",I.style.fontSize="13px",I.setAttribute("bgcolor","gainsboro"),I.setAttribute("color","white"),I.style.wordBreak="break-all"}}},doAction:function(e){switch(this.report(),e){case"print":Object(u.e)({id:"report_turnoverDaily",countCol:this.countCol});break;case"export":Object(u.h)({id:"report_turnoverDaily",name:"营业额日报表",countCol:this.countCol})}},getSearchParam:function(e){this.query=o()(this.query,e),this.fetchData()},handleBottom:function(e){var t=e.target,i=t.scrollTop,r=t.offsetWidth<t.scrollWidth,o=t.offsetHeight,n=this.$refs.footTotalFee,a=i+o-n.offsetHeight;r&&(a-=this.scrollwidth),this.maxheight||(this.maxheight=t.scrollHeight),n.style.bottom="auto",n.style.top=(a>this.maxheight?this.maxheight:a)+"px",document.getElementById("tableClone").style.top=i+"px"},showSaveBox:function(){clearTimeout(this.tabletimer)},hideSaveBox:function(){var e=this;clearTimeout(this.tabletimer),this.tabletimer=setTimeout(function(){e.visible2=!1},1e4)},setTableWidth:function(e,t,i,r){var o=this,n=this.columns.filter(function(e){return e.prop===i.property});n.length&&(n[0].width=e+"",this.visible2=!0,clearTimeout(this.tabletimer),this.tabletimer=setTimeout(function(){o.visible2=!1},1e4)),console.log("setTableWidth",e,t,i,r,this.columns)},saveToTableSetup:function(){this.visible2=!1,this.eventBus.$emit("tablesetup.change",this.thecode,this.columns)},setColumn:function(e){this.columns=e,this.tablekey=(new Date).getTime()},getSummary:function(e){var r=this,t=e.columns,o=(e.data,[]);return o[0]="合计",t.forEach(function(e,t){for(var i in r.countColVal)e.property===i&&(o[t]=r.countColVal[i]+"")}),o}}}},YeJj:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=i("RUXP"),o=i("zX6D");var n=function(e){i("oEcg")},a=i("VU/8")(r.a,o.a,n,null,null);t.default=a.exports},oEcg:function(e,t){},zX6D:function(e,t,i){"use strict";var r={render:function(){var i=this,e=i.$createElement,r=i._self._c||e;return r("div",{staticClass:"tab-content chartSender"},[r("SearchForm",{attrs:{orgid:i.otherinfo.orgid,btnsize:i.btnsize},on:{change:i.getSearchParam}}),i._v(" "),r("div",{directives:[{name:"loading",rawName:"v-loading",value:i.loading,expression:"loading"}],staticClass:"tab_info"},[r("div",{staticClass:"btns_box"},[r("el-button",{directives:[{name:"has",rawName:"v-has:REPORT_PRINT_2",arg:"REPORT_PRINT_2"}],attrs:{type:"primary",size:i.btnsize,icon:"el-icon-printer",plain:""},on:{click:function(e){i.doAction("print")}}},[i._v("打印报表")]),i._v(" "),r("el-button",{attrs:{type:"primary",size:i.btnsize,icon:"el-icon-printer",plain:""},on:{click:function(e){i.doAction("export")}}},[i._v("导出报表")]),i._v(" "),r("el-popover",{attrs:{placement:"right-end",width:"160",trigger:"manual"},nativeOn:{mouseenter:function(e){return i.showSaveBox(e)},mouseout:function(e){return i.hideSaveBox(e)}},model:{value:i.visible2,callback:function(e){i.visible2=e},expression:"visible2"}},[r("p",[i._v("表格宽度修改了，是否要保存？")]),i._v(" "),r("div",{staticStyle:{"text-align":"right",margin:"0"}},[r("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(e){i.visible2=!1}}},[i._v("取消")]),i._v(" "),r("el-button",{attrs:{type:"primary",size:"mini"},on:{click:i.saveToTableSetup}},[i._v("确定")])],1),i._v(" "),r("el-button",{attrs:{slot:"reference",type:"text"},slot:"reference"})],1)],1),i._v(" "),r("div",{staticClass:"tab_report"},[r("el-table",{key:i.tablekey,ref:"multipleTableRight",staticStyle:{width:"100%"},attrs:{slot:"reference",data:i.dataList,"show-summary":!0,height:"100%",border:"","tooltip-effect":"dark",triped:"","show-overflow-tooltip":!0,"summary-method":i.getSummary},on:{"header-dragend":i.setTableWidth},slot:"reference"},[i._l(i.columns,function(t){return[t.scope?r("el-table-column",{attrs:{"show-overflow-tooltip":"",prop:t.prop,label:t.label,width:t.width,fixed:t.fixed},scopedSlots:i._u([{key:"default",fn:function(e){return[r("span",{domProps:{innerHTML:i._s(t.slot(e))}})]}}])}):r("el-table-column",{attrs:{"show-overflow-tooltip":"",prop:t.prop,label:t.label,width:t.width,fixed:t.fixed}})]})],2)],1),i._v(" "),r("div",{staticClass:"info_tab_report",staticStyle:{display:"none"},attrs:{id:"report_turnoverDaily"},on:{scroll:i.handleBottom}},[r("table",{staticClass:"report_turnoverDaily_table",attrs:{id:"report_turnoverDaily_table"}}),i._v(" "),r("table",{ref:"footTotalFee",staticClass:"footTotalFee"})])]),i._v(" "),r("TableSetup",{attrs:{popVisible:i.setupTableVisible,columns:i.columns,code:i.thecode},on:{close:function(e){i.setupTableVisible=!1},success:i.setColumn}})],1)},staticRenderFns:[]};t.a=r}});