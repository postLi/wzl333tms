webpackJsonp([274],{"7jmh":function(e,t){},"T9W+":function(e,t,n){"use strict";var i={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"tab-content chartSender"},[n("div",{staticClass:"tab_info"},[n("div",{staticClass:"btns_box"},[n("el-button",{directives:[{name:"has",rawName:"v-has:REPORT_PRINT_6",arg:"REPORT_PRINT_6"}],attrs:{type:"primary",size:t.btnsize,icon:"el-icon-printer",plain:""},on:{click:function(e){t.doAction("print")}}},[t._v("打印报表")]),t._v(" "),n("el-button",{directives:[{name:"has",rawName:"v-has:REPORT_VIEW_6",arg:"REPORT_VIEW_6"}],attrs:{type:"primary",size:t.btnsize,icon:"el-icon-view",plain:""},on:{click:function(e){t.doAction("preview")}}},[t._v("打印预览")]),t._v(" "),n("el-button",{directives:[{name:"has",rawName:"v-has:REPORT_SETTING_6",arg:"REPORT_SETTING_6"}],attrs:{type:"primary",size:t.btnsize,icon:"el-icon-setting",plain:""},on:{click:function(e){t.doAction("setting")}}},[t._v("打印设置")])],1),t._v(" "),n("div",{staticClass:"info_tab"},[n("iframe",{ref:"senderIframe",staticClass:"chartIframe",attrs:{src:t.chartIframe,id:"senderIframe",frameborder:"0",scrolling:"auto",name:"showHere"}})])])])},staticRenderFns:[]};t.a=i},eye4:function(e,t,n){"use strict";var i=n("Dd8w"),a=n.n(i),r=(n("E4LH"),n("NYxO")),c=n("o9X6"),o=n("pAQG"),s=(n("0xDb"),n("TIfe"));t.a={components:{SelectTree:c.a,querySelect:o.a},data:function(){return{chartIframe:"",query:{},btnsize:"mini"}},computed:a()({},Object(r.mapGetters)(["otherinfo"])),mounted:function(){this.getSearchParam()},methods:{doAction:function(e){switch(e){case"print":document.getElementById("senderIframe").contentWindow.OnEvent("AF","Print","");break;case"preview":document.getElementById("senderIframe").contentWindow.OnEvent("AF","Preview","");break;case"setting":document.getElementById("senderIframe").contentWindow.OnEvent("AF","Setting","")}},hideIframe:function(e){e?"show"!==this.hideiframe&&(this.hideiframe="show",document.getElementById("senderIframe").contentWindow.hideChart(e)):"hide"!==this.hideiframe&&(this.hideiframe="hide",document.getElementById("senderIframe").contentWindow.hideChart(e))},getSearchParam:function(){var e=Object(s.b)(),t=window.location.protocol+"//"+window.location.host+"/static/supcan/crossReport.html?access_token="+e+"&"+(new Date).getTime();this.chartIframe=encodeURI(t)},setTable:function(){}}}},"vXB+":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n("eye4"),a=n("T9W+");var r=function(e){n("7jmh")},c=n("VU/8")(i.a,a.a,r,null,null);t.default=c.exports}});