webpackJsonp([151,266,310],{"++fd":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=n("6fVI"),i=n("eE4v"),o=n("VU/8")(s.a,i.a,null,null,null);e.default=o.exports},"1ojz":function(t,e,n){"use strict";var s={render:function(){var n=this,t=n.$createElement,s=n._self._c||t;return s("div",{directives:[{name:"loading",rawName:"v-loading",value:n.loading,expression:"loading"}],staticClass:"tab-content tab-content_sms"},[s("div",{staticClass:"tab_info"},[s("div",{staticClass:"btns_box"},[s("el-button",{directives:[{name:"has",rawName:"v-has:SMS_CUSTOMIZATION_1",arg:"SMS_CUSTOMIZATION_1"}],attrs:{type:"primary",size:n.btnsize,icon:"el-icon-document",plain:""},on:{click:n.openAddSign}},[n._v("定制专属签名")]),n._v(" "),n.isShowSignBtn?s("el-button",{directives:[{name:"has",rawName:"v-has:SMS_CUSTOMIZATION_2",arg:"SMS_CUSTOMIZATION_2"}],attrs:{type:"primary",size:n.btnsize,icon:"el-icon-document",plain:""},on:{click:n.openShowSign}},[n._v("查看专属签名")]):n._e(),n._v(" "),s("span",{staticClass:"btns_box_smstips"},[n._v(n._s(n.smsDocText))])],1),n._v(" "),s("div",{staticClass:"info_tab info_tab_sms"},[s("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{height:"100%","tooltip-effect":"dark",data:n.infoList,stripe:"",border:""},on:{"row-dblclick":n.editContent}},[s("el-table-column",{attrs:{fixed:"",sortable:"",width:"50",label:"序号"},scopedSlots:n._u([{key:"default",fn:function(t){return[n._v("\n            "+n._s((n.searchQuery.currentPage-1)*n.searchQuery.pageSize+t.$index+1)+"\n          ")]}}])}),n._v(" "),s("el-table-column",{attrs:{sortable:"",label:"短信发送节点",width:"150",prop:"sendNode"}}),n._v(" "),s("el-table-column",{attrs:{sortable:"",label:"提醒对象",width:"110",prop:"remindTarget"}}),n._v(" "),s("el-table-column",{attrs:{sortable:"",label:"短信内容（双击编辑短信内容）",prop:"templateContent",align:"left"},scopedSlots:n._u([{key:"default",fn:function(t){return[s("el-popover",{attrs:{placement:"bottom",width:"400",trigger:"hover",content:t.row.templateContent}},[s("span",{attrs:{slot:"reference"},slot:"reference"},[n._v(n._s(t.row.templateContent))])])]}}])}),n._v(" "),s("el-table-column",{attrs:{sortable:"",label:"审核状态",width:"120",prop:"applyStatus"},scopedSlots:n._u([{key:"default",fn:function(t){return[n._v("\n            "+n._s(0===t.row.applyStatus?"审核中":1===t.row.applyStatus?"审核通过":"审核不通过")+"\n          ")]}}])}),n._v(" "),s("el-table-column",{attrs:{sortable:"",label:"发送状态",width:"120",prop:"sendStatus"},scopedSlots:n._u([{key:"default",fn:function(e){return[s("el-switch",{attrs:{"active-color":"#67c23a","active-text":e.row.sendStatus?"开":"关"},on:{change:function(t){return n.handleEnable(t,e.row)}},model:{value:e.row.sendStatus,callback:function(t){n.$set(e.row,"sendStatus",t)},expression:"scope.row.sendStatus"}})]}}])})],1)],1),n._v(" "),s("div",{staticClass:"info_tab_footer"},[n._v("\n      共计:"+n._s(n.total)+"\n      "),s("div",{staticClass:"show_pager"},[s("Pager",{attrs:{total:n.total},on:{change:n.handlePageChange}})],1)])]),n._v(" "),s("addCustomized",{attrs:{popVisible:n.addPopVisible},on:{close:n.closeAdd,success:n.fetchList}}),n._v(" "),s("popRight",{attrs:{info:n.selectInfo,popVisible:n.editInfoVisible},on:{"update:popVisible":function(t){n.editInfoVisible=t},close:n.closeEdit,success:n.getFecthList}})],1)},staticRenderFns:[]};e.a=s},"3gSR":function(t,e,n){"use strict";var s={render:function(){var s=this,t=s.$createElement,i=s._self._c||t;return i("pop-right",{directives:[{name:"loading",rawName:"v-loading",value:s.loading,expression:"loading"}],attrs:{title:s.popTitle,isShow:s.popVisible},on:{close:s.closeMe}},[i("template",{slot:"content"},[i("div",{staticClass:"smsedit_wrapper"},[i("div",{staticClass:"smsedit_tite"},[i("span",[s._v(s._s(s.info.sendNode))])]),s._v(" "),i("div",{staticClass:"smsedit_search"},[i("el-autocomplete",{attrs:{"fetch-suggestions":s.querySearch,placeholder:"请输入内容","popper-class":"popperHide"},on:{select:s.handleSelect},model:{value:s.currentSearch,callback:function(t){s.currentSearch=t},expression:"currentSearch"}},[i("i",{staticClass:"el-input__icon el-icon-search",attrs:{slot:"prefix"},slot:"prefix"}),s._v(" "),i("template",{slot:"prepend"},[s._v(" 可配置字段 "),i("span",[s._v(s._s(s.smsColumnLen))])])],2)],1),s._v(" "),i("div",{staticClass:"smsedit_list clearfix"},[s.isEmptySearch?i("p",[s._v("暂无数据")]):s._e(),s._v(" "),i("ul",s._l(s.smsColumn,function(e,n){return 0===e.isShow?i("li",{key:e.id,attrs:{draggable:"true","data-fileName":e.colName},on:{dragstart:function(t){s.drag(t)},click:function(t){s.addTemplate(e.colName,e,n)}}},[i("el-tag",{attrs:{type:-1!==e.colName.indexOf(s.currentSearch)&&s.currentSearch?"danger":"info",size:"mini"}},[s._v(s._s(e.colName))])],1):s._e()}))]),s._v(" "),i("div",{staticClass:"smsedit_tite"},[i("span",[s._v("短信内容 "),i("b",[s._v(s._s(s.contentLen)+"/250")])])]),s._v(" "),i("div",{staticClass:"smsedit_content",on:{drop:function(t){s.drop(t)},dragover:function(t){s.allowDrop(t)}}},[i("div",{staticClass:"smsedit_content_title"},[s._v("【"+s._s(s.info.sign)+"】")]),s._v(" "),i("el-input",{staticStyle:{height:"100%"},attrs:{id:"templateContent",type:"textarea",rows:2,placeholder:"请输入内容",autofocus:!0,maxlength:250},nativeOn:{keydown:function(t){return"button"in t||!s._k(t.keyCode,"delete",[8,46],t.key,["Backspace","Delete"])?s.deleteItem(t):null}},model:{value:s.smsTemplate,callback:function(t){s.smsTemplate=t},expression:"smsTemplate"}})],1)])]),s._v(" "),i("div",{attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{type:"primary"},on:{click:s.resetForm}},[s._v("恢复默认")]),s._v(" "),i("el-button",{on:{click:s.closeMe}},[s._v("取消")]),s._v(" "),i("el-button",{attrs:{type:"success"},on:{click:function(t){s.submitForm("formModel")}}},[s._v("保存")])],1)],2)},staticRenderFns:[]};e.a=s},"51XE":function(t,e,n){"use strict";var s=n("woOf"),i=n.n(s),o=n("P5Di"),a=n("DAYN"),r=n.n(a),l=n("l1TW"),c=n("0xDb"),u="";e.a={components:{popRight:o.a,draggable:r.a},props:{popVisible:{type:Boolean,default:!1},info:{type:Object,default:{}}},watch:{info:function(t){var e=this;t&&this.$nextTick(function(){e.postSmsSetColumnsList(),e.postSmsTemplateLog()})},popVisible:function(t){},smsColumn:function(t){t&&(this.smsColumnLen=t.length)}},computed:{contentLen:function(){var t=this.info.sign?this.info.sign.length:0;return this.smsTemplate.length+t+2},isEmptySearch:function(){return console.log(this.smsColumnLen),0===this.smsColumnLen}},data:function(){return{popTitle:"编辑短信",loading:!1,currentSearch:"",smsColumn:[],orgSmsColumn:[],smsTemplate:"",smsTemplateObj:{},smsColumnLen:0}},mounted:function(){},methods:{initTextarea:function(){var t=document.selection.createRange(),e=document.getElementById("templateContent");t.moveToElementText(e)},drag:function(t){u=t.currentTarget},drop:function(t){var n=this;t.preventDefault();var s=u.getAttribute("data-fileName");this.smsColumn.forEach(function(t,e){t.colName===s&&n.addTemplate(s,t,e)})},allowDrop:function(t){t.preventDefault()},addTemplate:function(n,t){var e="("+n+")",s=document.getElementById("templateContent"),i=this.$const.cursorPosition.get(s);if(this.contentLen<250){this.$const.cursorPosition.add(s,i,e);var o="",a="";this.smsColumn.forEach(function(t,e){t.colName===n&&(o=e)}),this.orgSmsColumn.forEach(function(t,e){t.colName===n&&(a=e)}),this.smsColumn[o].isShow=1,this.orgSmsColumn[a].isShow=1,this.smsColumn.splice(o,1),this.smsTemplate=s.value}},deleteItem:function(t){var e=document.getElementById("templateContent"),n=this.$const.cursorPosition.get(e),s=n.start;if(n.start!==n.end){t.preventDefault();var i=this.findCursorIndex(n.start+1),o=this.findCursorIndex(n.end);this.deleteStr(i[0]-(i[0]===i[1]?1:0),o[1])}else{var a=this.findCursorIndex(s);a[0]!==a[1]&&(t.preventDefault(),this.deleteStr(a[0],a[1]))}},findCursorIndex:function(t){var e=document.getElementById("templateContent").value,n=t,s=e.substring(0,n);if(")"===e.split("")[n-1])return[s.lastIndexOf("("),n];if(-1===s.indexOf("(")&&-1===s.indexOf(")"))return[t,t];if(-1!==s.lastIndexOf("(")&&s.lastIndexOf(")")<s.lastIndexOf("(")){var i=s.lastIndexOf("(");return[i,i+e.substring(i).indexOf(")")+1]}return[t,t]},deleteStr:function(t,e){var n=this,s=document.getElementById("templateContent"),i=s.value,o=i.substring(t,e),a=o.match(/(\([^)]*\))/gm),r=Object(c.objectMerge2)([],a);s.value=i.replace(o,""),this.$const.cursorPosition.set(s,{text:"",start:t,end:t}),this.smsTemplate=s.value,r.forEach(function(t,e){n.$set(r,e,t.substring(1,t.length-1))}),this.orgSmsColumn.forEach(function(e,t){r.forEach(function(t){e.colName===t&&(e.isShow=0,n.smsColumn.push(e))})})},submitForm:function(t){var e=this,n={id:this.info.id,defaultTmpId:this.info.defaultTmpId,companyId:this.info.companyId,remindTarget:this.info.remindTarget,remindTargetCode:this.info.remindTargetCode,sendNode:this.info.sendNode,sendNodeCode:this.info.sendNodeCode,templateContent:this.smsTemplate,templateContentCoded:this.info.templateContentCoded,applyStatus:this.info.applyStatus,sendStatus:this.info.sendStatus?0:1,sign:this.info.sign};console.log("submitForm",n),""!==n.templateContent?Object(l.l)(n).then(function(t){e.$message.success("更新短信模板成功！"),e.$emit("success"),e.closeMe()}).catch(function(t){e._handlerCatchMsg(t)}):this.$message.warning("短信不能为空！")},postSmsSetColumnsList:function(){var e=this,t={orgId:this.otherinfo.orgid,tmpLogId:this.info.id,defaultTmpId:""};Object(l.h)(t).then(function(t){e.smsColumn=t.filter(function(t){return 0===t.isShow}),e.orgSmsColumn=t,e.smsColumnLen=e.smsColumn.length})},postDefaultSmsTemplate:function(){var e=this,t={defaultTmpId:this.info.defaultTmpId,orgId:this.otherinfo.orgid};Object(l.f)(t).then(function(t){e.smsTemplate=t.templateContent,e.smsTemplateObj=t})},postSmsTemplateLog:function(){var e=this,t={id:this.info.id,orgId:this.otherinfo.orgid};Object(l.j)(t).then(function(t){t&&(e.smsTemplate=t.templateContent,e.smsTemplateObj=t)})},resetForm:function(){var e=this;this.loading=!0,this.postDefaultSmsTemplate();var t={orgId:this.otherinfo.orgid,tmpLogId:"",defaultTmpId:this.info.defaultTmpId};Object(l.h)(t).then(function(t){e.loading=!1,e.smsColumn=t.filter(function(t){return 0===t.isShow}),e.orgSmsColumn=t,e.smsColumnLen=e.smsColumn.length}).catch(function(t){e.loading=!1})},querySearch:function(e,t){void 0===(this.currentSearch=e)&&(this.currentSearch||(this.smsColumn=i()([],this.orgSmsColumn).filter(function(t){return 0===t.isShow})));var n=this.orgSmsColumn,s=e?n.filter(function(t){return-1!==t.colName.indexOf(e)}):n;this.smsColumn=Object(c.objectMerge2)([],s).filter(function(t){return 0===t.isShow}),t(s)},handleSelect:function(t){this.currentSearch=t.colName},closeMe:function(t){this.$emit("update:popVisible",!1),"function"==typeof t&&t()}}}},"6fVI":function(t,e,n){"use strict";var s=n("l1TW");e.a={props:{popVisible:{type:Boolean,default:!1}},data:function(){return{popTitle:"定制专属签名",loading:!0,isEdit:!1,formModel:{id:"",modifySign:"",companyId:""},rules:{modifySign:[{required:!0,message:"不能为空",trigger:"change"}]},isShow:!1}},watch:{popVisible:function(t){(this.isShow=t)&&this.postSmsSign()}},methods:{postSmsSign:function(){var e=this;Object(s.i)(this.otherinfo.orgid).then(function(t){t&&(e.formModel.modifySign=t.data.modifySign,e.formModel.id=t.data.id,e.isEdit=1===t.data.modifyCount&&"审核不通过"!==t.data.applyStatusZh)}).catch(function(t){e._handlerCatchMsg(t)})},closeMe:function(t){this.$emit("close"),"function"==typeof t&&t()},submitForm:function(t){var e=this;this.$refs[t].validate(function(t){t&&(e.formModel.companyId=e.otherinfo.companyId,Object(s.a)(e.formModel).then(function(t){e.$message.success("添加专属签名成功！"),e.$emit("success"),e.closeMe()}))})}}}},AfZR:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=n("51XE"),i=n("3gSR");var o=function(t){n("LceZ")},a=n("VU/8")(s.a,i.a,o,null,null);e.default=a.exports},LceZ:function(t,e){},TggM:function(t,e,n){"use strict";var s=n("woOf"),i=n.n(s),o=(n("NYxO"),n("l1TW")),a=n("1onU"),r=n("++fd"),l=n("AfZR");e.a={components:{Pager:a.a,popRight:l.default,addCustomized:r.default},data:function(){return{btnsize:"mini",infoList:[],signName:"",isShowSignBtn:!1,loading:!0,addPopVisible:!1,total:0,smsDocText:"",editInfoVisible:!1,selectInfo:{},searchQuery:{currentPage:1,pageSize:100,vo:{orgId:""}}}},mounted:function(){this.getSmsDocText(),this.postSmsSign(),this.fetchList()},methods:{getSmsDocText:function(){var e=this;Object(o.c)(this.otherinfo.orgid).then(function(t){e.smsDocText=t.smsDocText}).catch(function(t){e._handlerCatchMsg(t)})},postSmsSign:function(){var e=this;Object(o.i)(this.otherinfo.orgid).then(function(t){t.data&&(e.signName=t.data.modifySign,1===t.data.modifyCount?e.isShowSignBtn=!0:e.isShowSignBtn=!1)}).catch(function(t){e._handlerCatchMsg(t)})},fetchList:function(){var e=this;this.loading=!0,this.searchQuery.vo.orgId=this.otherinfo.orgid,Object(o.k)(this.searchQuery).then(function(t){t&&(e.infoList=t.list,e.infoList.forEach(function(t){t.sendStatus=0===t.sendStatus}),e.total=t.total,e.loading=!1)}).catch(function(t){e._handlerCatchMsg(t),e.loading=!1})},handlePageChange:function(t){this.searchQuery.currentPage=t.pageNum,this.searchQuery.pageSize=t.pageSize},openShowSign:function(){var t=this.$createElement;this.$msgbox({title:"专属签名",message:t("div",{style:"text-align: center"},[t("p",{style:"font-size: 16px"},this.signName)])})},openAddSign:function(){this.addPopVisible=!0},closeAdd:function(){this.addPopVisible=!1},editContent:function(t,e){console.log(t),this.selectInfo=i()({},t),this.editInfoVisible=!0},closeEdit:function(){this.editInfoVisible=!1},getFecthList:function(){console.log("sdfsdfsdfsdf"),this.fetchList()},handleEnable:function(e,n){var s=this,t={id:n.id,sendStatus:e?0:1};Object(o.m)(t).then(function(t){s.fetchList(),s.$message.success("修改发送状态成功！")}).catch(function(t){n.sendStatus=!e,s._handlerCatchMsg(t)})}}}},YJbe:function(t,e){},eE4v:function(t,e,n){"use strict";var s={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("el-dialog",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticClass:"tms_dialog tms_dialog_alignleft",attrs:{title:e.popTitle,visible:e.isShow,"close-on-click-modal":!1,"before-close":e.closeMe,width:"500px"},on:{"update:visible":function(t){e.isShow=t}}},[n("el-form",{ref:"formModel",attrs:{model:e.formModel,rules:e.rules}},[n("el-form-item",{attrs:{prop:"modifySign"}},[n("el-input",{attrs:{placeholder:"请输入短信前缀",disabled:e.isEdit,maxlength:25,minlength:1},model:{value:e.formModel.modifySign,callback:function(t){e.$set(e.formModel,"modifySign",t)},expression:"formModel.modifySign"}})],1),e._v(" "),n("p",[n("b",[e._v("系统默认前缀为公司名称：")]),n("br"),n("br"),n("el-tag",{attrs:{size:"mini"}},[e._v("例如")]),e._v(" 【公司名称】您在某某网点托运的5件电脑，已成功受理，运单号：123445554.")],1)],1),e._v(" "),n("div",{attrs:{slot:"footer"},slot:"footer"},[e.isEdit?e._e():n("el-button",{attrs:{type:"primary"},on:{click:function(t){e.submitForm("formModel")}}},[e._v("确 定")]),e._v(" "),n("el-button",{on:{click:e.closeMe}},[e._v("取 消")])],1)],1)},staticRenderFns:[]};e.a=s},l1TW:function(t,e,n){"use strict";e.d=function(){return s.b.get("/api-plugin/system/tmssystemsmspackages/v1/all/").then(function(t){return t.data||{}})},e.b=function(t){return s.b.get("/api-plugin/system/tmssystemsmssummary/v1/searchSmsSurplus/",t).then(function(t){return t.data})},e.e=function(t){return s.b.post("/api-plugin/system/tmssystemsmssummary/v1/buy/",{packageId:t}).then(function(t){return t.data})},e.k=function(t){return s.b.post("/api-plugin/system/tmssystemsmstemplatelog/v1.1/getSmsTemplateLogList/",t).then(function(t){return t.data||{}})},e.a=function(t){return s.b.post("/api-plugin/system/tmssystemsmssign/v1.1/updateSmsSign/",t).then(function(t){return t.data||{}})},e.i=function(t){return s.b.post("/api-plugin/system/tmssystemsmssign/v1.1/getSmsSign/",{orgId:t}).then(function(t){return t})},e.m=function(t){return s.b.post("/api-plugin/system/tmssystemsmstemplatelog/v1.1/udpateSmsTemplateLogStatus/",t).then(function(t){return t.data})},e.g=function(t){return s.b.post("/api-plugin/system/tmssystemsmssendlog/v1.1/getSmsSendLogList/",t).then(function(t){return t.data})},e.h=function(t){return s.b.post("/api-plugin/system/tmssystemsmssetcolumns/v1.1/getSmsSetColumnsList/",t).then(function(t){return t.data})},e.f=function(t){return s.b.post("/api-plugin/system/tmssystemsmstemplate/v1.1/getDefaultSmsTemplate/",t).then(function(t){return t.data})},e.j=function(t){return s.b.post("/api-plugin/system/tmssystemsmstemplatelog/v1.1/getSmsTemplateLog/",t).then(function(t){return t.data})},e.l=function(t){return s.b.post("/api-plugin/system/tmssystemsmstemplatelog/v1.1/udpateSmsTemplateLog/",t).then(function(t){return t.data})},e.c=function(t){return s.b.post("/api-plugin/system/tmssystemsmssign/v1.1/getSmsDocText/",{orgId:t}).then(function(t){return t.data})};var s=n("Vo7i")},o1Rk:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=n("TggM"),i=n("1ojz");var o=function(t){n("YJbe")},a=n("VU/8")(s.a,i.a,o,null,null);e.default=a.exports}});