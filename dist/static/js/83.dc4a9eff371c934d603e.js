webpackJsonp([83,319,320,397],{"+sND":function(e,t,o){"use strict";var i={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("el-form",{ref:"searchFormRef",staticClass:"staff_searchinfo clearfix",attrs:{inline:!0,size:t.btnsize,"label-position":"right","label-width":"70px",rules:t.rules,model:t.searchForm}},[o("div",{staticClass:"staff_searchinfo--input"},[o("el-form-item",{attrs:{label:"归属网点"}},[o("SelectTree",{attrs:{orgid:t.otherinfo.orgid},model:{value:t.searchForm.orgid,callback:function(e){t.$set(t.searchForm,"orgid",e)},expression:"searchForm.orgid"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"员工名称"}},[o("el-input",{attrs:{placeholder:"请输入姓名",clearable:""},model:{value:t.searchForm.name,callback:function(e){t.$set(t.searchForm,"name",e)},expression:"searchForm.name"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"手机号码"}},[o("el-input",{directives:[{name:"numberOnly",rawName:"v-numberOnly"}],attrs:{placeholder:"请输入手机号码",maxlength:"11",clearable:""},model:{value:t.searchForm.mobile,callback:function(e){t.$set(t.searchForm,"mobile",e)},expression:"searchForm.mobile"}})],1)],1),t._v(" "),o("el-form-item",{staticClass:"staff_searchinfo--btn"},[o("el-button",{attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v("查询")]),o("el-button",{attrs:{type:"info",plain:""},on:{click:function(e){t.clearForm("searchFormRef")}}},[t._v("清空")])],1)],1)},staticRenderFns:[]};t.a=i},"5dwe":function(e,t,o){"use strict";var i=o("Dd8w"),r=o.n(i),s=o("u8ra"),a=o("P5Di"),n=o("NYxO");t.a={components:{popRight:a.a},props:{popVisible:{type:Boolean,default:!1},users:{type:Array,default:[]}},computed:r()({},Object(n.mapGetters)(["otherinfo"]),{myusers:function(){var t=this;return console.log("users",this.users),this.form.users={},this.users.map(function(e){t.$set(t.form.users,e.id,e.rolesIdList)}),this.users}}),data:function(){return{form:{rolesId:[],users:{}},loading:!1,roles:[],inited:!1}},watch:{popVisible:function(e){e&&(this.inited||(this.inited=!0,this.initInfo()))}},methods:{initInfo:function(){var t=this;return this.loading=!0,Object(s.e)(this.otherinfo.orgid).then(function(e){t.roles=e.list,t.loading=!1}).catch(function(e){t.loading=!1,t.inited=!1,t._handlerCatchMsg(e)})},submitForm:function(){var t=this;console.log("closeMe1"),this.loading=!0;var e=[];for(var o in this.form.users)e.push({id:o,rolesId:this.form.users[o].join(",")});Object(s.l)(e).then(function(e){t.loading=!1,t.$message.success("保存成功"),t.closeMe(),t.$emit("success")}).catch(function(e){t.loading=!1,t._handlerCatchMsg(e)})},closeMe:function(){console.log("closeMe2"),this.form.users={},this.$emit("update:popVisible",!1)},getId:function(e,t){console.log("change:: ",e,t)}}}},"6vdS":function(e,t,o){"use strict";var i=o("E4LH"),r=o("o9X6");t.a={components:{SelectTree:r.a},props:{btnsize:{type:String,default:"mini"},orgid:{type:Number}},data:function(){return{searchForm:{orgid:"",name:"",mobile:""},rules:{mobile:[{pattern:i.a.MOBILE}]}}},watch:{orgid:function(e){this.searchForm.orgid=e}},mounted:function(){this.searchForm.orgid=this.otherinfo.orgid,this.onSubmit()},methods:{onSubmit:function(){this.$emit("change",this.searchForm)},clearForm:function(e){this.searchForm.name="",this.searchForm.orgid=this.orgid,this.searchForm.mobile=""}}}},BwaQ:function(e,t){},DAQk:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=o("wO8r"),r=o("Q5/P");var s=function(e){o("whtI")},a=o("VU/8")(i.a,r.a,s,null,null);t.default=a.exports},JjvL:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=o("d9yd"),r=o("rS1/");var s=function(e){o("BwaQ")},a=o("VU/8")(i.a,r.a,s,null,null);t.default=a.exports},"Q5/P":function(e,t,o){"use strict";var i={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("pop-right",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"addEmployeerPop",attrs:{title:t.popTitle,isShow:t.popVisible},on:{close:t.closeMe}},[o("template",{staticClass:"addEmployeerPop-content",slot:"content"},[o("el-form",{ref:"ruleForm",attrs:{model:t.form,rules:t.rules,inline:!0,"label-position":"right",size:"mini"}},[o("el-form-item",{attrs:{label:"用户姓名","label-width":t.formLabelWidth,prop:"name"}},[o("el-input",{attrs:{"auto-complete":"off"},model:{value:t.form.name,callback:function(e){t.$set(t.form,"name",e)},expression:"form.name"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"手机号码","label-width":t.formLabelWidth,prop:"mobilephone"}},[o("el-input",{attrs:{maxlength:11,"auto-complete":"off"},model:{value:t.form.mobilephone,callback:function(e){t.$set(t.form,"mobilephone",e)},expression:"form.mobilephone"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"登录账号","label-width":t.formLabelWidth,prop:"username"}},[o("el-tooltip",{staticClass:"item",attrs:{effect:"dark",placement:"top",enterable:!1,manual:!0,value:t.tooltip,tabindex:"-1"}},[o("div",{attrs:{slot:"content"},slot:"content"},[t._v("账号可以由小写字母、数字组成"),o("br"),t._v("长度范围2~30个字符")]),t._v(" "),o("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.form.username,expression:"form.username",modifiers:{trim:!0}},{name:"onlyNumberAndLetter",rawName:"v-onlyNumberAndLetter"}],staticClass:"nativeinput",attrs:{type:"text","auto-complete":"off",maxlength:"30"},domProps:{value:t.form.username},on:{focus:function(e){t.tooltip=!0},blur:[function(e){t.tooltip=!1},function(e){t.$forceUpdate()}],input:function(e){e.target.composing||t.$set(t.form,"username",e.target.value.trim())}}})])],1),t._v(" "),o("el-form-item",{attrs:{label:"密码","label-width":t.formLabelWidth,prop:"password"}},[o("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.form.password,expression:"form.password",modifiers:{trim:!0}},{name:"onlyNumberAndLetter",rawName:"v-onlyNumberAndLetter"}],staticClass:"nativeinput",attrs:{type:"text",maxlength:"15","auto-complete":"off"},domProps:{value:t.form.password},on:{input:function(e){e.target.composing||t.$set(t.form,"password",e.target.value.trim())},blur:function(e){t.$forceUpdate()}}})]),t._v(" "),o("el-form-item",{attrs:{label:"职位","label-width":t.formLabelWidth,prop:"position"}},[o("el-input",{attrs:{"auto-complete":"off"},model:{value:t.form.position,callback:function(e){t.$set(t.form,"position",e)},expression:"form.position"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"员工号","label-width":t.formLabelWidth,prop:"jobNumber"}},[o("el-input",{attrs:{"auto-complete":"off",maxlength:20},model:{value:t.form.jobNumber,callback:function(e){t.$set(t.form,"jobNumber",e)},expression:"form.jobNumber"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"性别",prop:"sexFlag","label-width":t.formLabelWidth}},[o("el-select",{attrs:{placeholder:"请选择性别"},model:{value:t.form.sexFlag,callback:function(e){t.$set(t.form,"sexFlag",e)},expression:"form.sexFlag"}},[o("el-option",{attrs:{label:"男",value:"0"}}),t._v(" "),o("el-option",{attrs:{label:"女",value:"1"}})],1)],1),t._v(" "),o("el-form-item",{attrs:{required:"",prop:"orgid",label:"归属网点","label-width":t.formLabelWidth}},[o("SelectTree",{attrs:{filterable:"",orgid:t.otherinfo.orgid},model:{value:t.form.orgid,callback:function(e){t.$set(t.form,"orgid",e)},expression:"form.orgid"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"权限角色","label-width":t.formLabelWidth,prop:"rolesId"}},[o("el-select",{attrs:{"collapse-tags":"",filterable:"",multiple:"","filter-method":t.makefilter,placeholder:"请选择权限"},model:{value:t.form.rolesId,callback:function(e){t.$set(t.form,"rolesId",e)},expression:"form.rolesId"}},t._l(t.roleslist,function(e){return o("el-option",{key:e.id,attrs:{label:e.roleName,value:e.id}},[o("span",{staticClass:"query-input-myautocomplete",domProps:{innerHTML:t._s(t.highLight(e,"roleName"))}})])}))],1),t._v(" "),o("el-form-item",{attrs:{label:"归属部门","label-width":t.formLabelWidth,prop:"departmentId"}},[o("SelectType",{attrs:{orgid:t.otherinfo.orgid,type:"department_type",filterable:"",placeholder:"请选择部门"},model:{value:t.form.departmentId,callback:function(e){t.$set(t.form,"departmentId",e)},expression:"form.departmentId"}})],1)],1),t._v(" "),t.isModify?t._e():o("div",{staticClass:"info"},[t._v("注：密码默认为：123456")])],1),t._v(" "),o("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t.isModify?t._e():o("el-button",{attrs:{type:"primary"},on:{click:function(e){t.submitForm("ruleForm",!0)}}},[t._v("保存并添加")]),t._v(" "),o("el-button",{attrs:{type:"primary"},on:{click:function(e){t.submitForm("ruleForm")}}},[t._v("确 定")]),t._v(" "),o("el-button",{on:{click:t.closeMe}},[t._v("取 消")])],1)],2)},staticRenderFns:[]};t.a=i},XiRE:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=o("6vdS"),r=o("+sND"),s=o("VU/8")(i.a,r.a,null,null,null);t.default=s.exports},awDT:function(e,t){},d9yd:function(e,t,o){"use strict";var i=o("woOf"),r=o.n(i),s=o("Dd8w"),a=o.n(s),n=o("u8ra"),l=o("NYxO"),c=o("XiRE"),u=o("DAQk"),d=o("qz27"),m=o("1onU"),f=o("0xDb");t.a={name:"employeeManage",components:{SearchForm:c.default,AddEmployeer:u.default,SetAuth:d.default,Pager:m.a},computed:a()({},Object(l.mapGetters)(["otherinfo"])),data:function(){var t=this;return{rolesArr:[],departmentArr:[],usersArr:[],loading:!0,selected:[],authUser:[],theUser:{},btnsize:"mini",setupTableVisible:!1,AddEmployeerVisible:!1,SetAuthVisible:!1,showTableSetup:!1,showSetAuth:!1,showAddEmployeer:!1,searchQuery:{pageSize:100,currentPage:1,vo:{name:"",pageSize:100,pageNum:1,mobile:"",orgid:""},searchVo:{}},searchForm:{name:"",pageSize:100,pageNum:1,mobile:"",orgid:"",searchVo:{}},dialogFormVisible:!1,isModify:!1,total:0,tablekey:"",tableColumn:[{label:"序号",prop:"number",width:"70",fixed:!0,slot:function(e){return(t.searchForm.pageNum-1)*t.searchForm.pageSize+e.$index+1}},{label:"姓名",prop:"name",width:"120",fixed:!0},{label:"归属网点",prop:"orgName",width:"120",fixed:!1},{label:"归属部门",prop:"departmentName",width:"120",fixed:!1},{label:"职务",prop:"position",width:"120",fixed:!1},{label:"员工号",prop:"jobNumber",width:"120",fixed:!1},{label:"登录账号",prop:"username",width:"120",fixed:!1},{label:"权限角色",prop:"rolesName",width:"200",slot:function(e){return"0"!==e.row.rolesId?e.row.rolesName:'<span class="unauth" v-else>未授权</span>'},fixed:!1},{label:"性别",prop:"sexFlag",width:"100",slot:function(e){return"0"===e.row.sexFlag?"男":"1"===e.row.sexFlag?"女":""}},{label:"联系手机",prop:"mobilephone",width:"120",fixed:!1},{label:"创建日期",prop:"createTime",slot:function(e){return""+Object(f.parseTime)(e.row.createTime,"{y}-{m}-{d} {h}:{i}:{s}")},fixed:!1}]}},methods:{newGetAllUser:function(){var t=this;return this.loading=!0,Object(n.h)(this.searchQuery).then(function(e){t.usersArr=e.list,t.total=e.total,t.loading=!1}).catch(function(e){t.loading=!1,t._handlerCatchMsg(e)})},changeKey:function(e){this.total=0,this.searchQuery=e,this.loading||this.fetchData()},fetchData:function(){this.SetAuthVisible=!1,this.newGetAllUser()},getSearchParam:function(e){this.searchQuery.pageSize=this.$options.data().searchQuery.pageSize,this.searchQuery.currentPage=this.$options.data().searchQuery.currentPage,this.searchQuery.vo=r()({},e),this.fetchData()},handlePageChange:function(e){r()(this.searchForm,e),this.fetchData()},doAction:function(e){var t=this;if(!this.selected.length&&"add"!==e)return this.closeAuth(),this.closeAddEmployeer(),this.$message({message:"请选择要操作的员工~",type:"warning"}),!1;switch(console.log("this.selected:",this.selected),e){case"add":this.isModify=!1,this.theUser={},this.openAddEmployeer();break;case"modify":1<this.selected.length&&this.$message({message:"每次只能修改单条数据~",type:"warning"}),this.theUser=Object(f.objectMerge2)({},this.selected[0]),this._checkExperience(this.theUser,"username")&&(this.isModify=!0,this.openAddEmployeer());break;case"delete":if(!this._checkExperience(this.selected[0],"username"))return!1;var o=1<this.selected.length?this.selected.length+"名":this.selected[0].name,i="";this.selected.map(function(e){i+=e.id+","}),i=i.slice(0,i.length-1),this.$confirm("确定要删除 "+o+" 员工吗？","提示",{confirmButtonText:"删除",cancelButtonText:"取消",type:"warning"}).then(function(){Object(n.a)(i).then(function(e){t.$message({type:"success",message:"删除成功!"}),t.fetchData()}).catch(function(e){t.$message({type:"info",message:e.errorInfo})})}).catch(function(){t.$message({type:"info",message:"已取消删除"})});break;case"auth":this.authUser=this.selected,this.openAuth()}this.$refs.multipleTable.clearSelection()},setTable:function(){this.showTableSetup=!0,this.setupTableVisible=!0},closeSetupTable:function(){this.setupTableVisible=!1},setColumn:function(e){this.tableColumn=e,this.tablekey=(new Date).getTime()},openAddEmployeer:function(){this.showAddEmployeer=!0,this.AddEmployeerVisible=!0},closeAddEmployeer:function(){this.AddEmployeerVisible=!1},openAuth:function(){this.showSetAuth=!0,this.SetAuthVisible=!0},closeAuth:function(){this.SetAuthVisible=!1},clickDetails:function(e,t,o){this.$refs.multipleTable.toggleRowSelection(e)},getSelection:function(e){this.selected=e}}}},pajN:function(e,t,o){"use strict";var i={render:function(){var o=this,e=o.$createElement,i=o._self._c||e;return i("pop-right",{directives:[{name:"loading",rawName:"v-loading",value:o.loading,expression:"loading"}],staticClass:"setUserAuthPop",attrs:{title:"员工授权",isShow:o.popVisible},on:{close:o.closeMe}},[i("template",{staticClass:"setUserAuthPop-content",slot:"content"},[i("table",[i("thead",[i("tr",[i("th",[o._v("员工")]),o._v(" "),i("th",[o._v("权限角色")])])]),o._v(" "),i("tbody",o._l(o.myusers,function(t){return i("tr",{key:t.username},[i("td",[o._v("\n            "+o._s(t.name)+"\n          ")]),o._v(" "),i("td",[i("el-select",{attrs:{size:"mini",multiple:"",placeholder:"请选择权限"},on:{change:function(e){o.getId(t.id)}},model:{value:o.form.users[t.id],callback:function(e){o.$set(o.form.users,t.id,e)},expression:"form.users[user.id]"}},o._l(o.roles,function(e){return i("el-option",{key:e.id,attrs:{label:e.roleName,value:e.id}})}))],1)])}))])]),o._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{type:"primary"},on:{click:function(e){o.submitForm()}}},[o._v("保存")]),o._v(" "),i("el-button",{on:{click:o.closeMe}},[o._v("取 消")])],1)],2)},staticRenderFns:[]};t.a=i},qz27:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=o("5dwe"),r=o("pajN");var s=function(e){o("awDT")},a=o("VU/8")(i.a,r.a,s,null,null);t.default=a.exports},"rS1/":function(e,t,o){"use strict";var i={render:function(){var i=this,e=i.$createElement,r=i._self._c||e;return r("div",{directives:[{name:"loading",rawName:"v-loading",value:i.loading,expression:"loading"}],staticClass:"staff_manage miniHeaderSearch"},[r("SearchForm",{attrs:{orgid:i.otherinfo.orgid,btnsize:i.btnsize},on:{change:i.getSearchParam}}),i._v(" "),r("div",{staticClass:"staff_info"},[r("div",{staticClass:"btns_box"},[r("el-button",{directives:[{name:"has",rawName:"v-has:USER_ADD",arg:"USER_ADD"}],attrs:{type:"primary",size:i.btnsize,icon:"el-icon-circle-plus",plain:""},on:{click:function(e){i.doAction("add")}}},[i._v("新增员工")]),i._v(" "),r("el-button",{directives:[{name:"has",rawName:"v-has:USER_ROLES",arg:"USER_ROLES"}],attrs:{type:"primary",size:i.btnsize,icon:"el-icon-edit-outline",plain:""},on:{click:function(e){i.doAction("auth")}}},[i._v("员工授权")]),i._v(" "),r("el-button",{directives:[{name:"has",rawName:"v-has:USER_UPDATE",arg:"USER_UPDATE"}],attrs:{type:"primary",size:i.btnsize,icon:"el-icon-edit",plain:""},on:{click:function(e){i.doAction("modify")}}},[i._v("修改")]),i._v(" "),r("el-button",{directives:[{name:"has",rawName:"v-has:USER_DELETE",arg:"USER_DELETE"}],attrs:{type:"danger",size:i.btnsize,icon:"el-icon-delete",plain:""},on:{click:function(e){i.doAction("delete")}}},[i._v("删除")]),i._v(" "),r("el-button",{staticClass:"table_setup",attrs:{type:"primary",size:i.btnsize,icon:"el-icon-setting",plain:""},on:{click:i.setTable}},[i._v("表格设置")])],1),i._v(" "),r("div",{staticClass:"info_news"},[r("el-table",{key:i.tablekey,ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:i.usersArr,stripe:"",border:"",height:"100%","tooltip-effect":"dark","default-sort":{prop:"id",order:"ascending"}},on:{"row-click":i.clickDetails,"selection-change":i.getSelection}},[r("el-table-column",{attrs:{fixed:"",sortable:"",type:"selection",width:"50"}}),i._v(" "),i._l(i.tableColumn,function(o){return[o.slot?r("el-table-column",{key:o.id,attrs:{fixed:o.fixed,sortable:"",label:o.label,width:o.width||"",prop:o.prop},scopedSlots:i._u([{key:"header",fn:function(e){return[r("tableHeaderSearch",{attrs:{scope:e,query:i.searchQuery},on:{change:i.changeKey}})]}},{key:"default",fn:function(t){return[o.click?r("span",{staticClass:"clickitem",domProps:{innerHTML:i._s(o.slot(t))},on:{click:function(e){e.stopPropagation(),o.click(t)}}}):r("span",{domProps:{innerHTML:i._s(o.slot(t))}})]}}])}):r("el-table-column",{key:o.id,attrs:{fixed:o.fixed,sortable:"",label:o.label,prop:o.prop,width:o.width},scopedSlots:i._u([{key:"header",fn:function(e){return[r("tableHeaderSearch",{attrs:{scope:e,query:i.searchQuery},on:{change:i.changeKey}})]}},{key:"default",fn:function(e){return[i._v(i._s(e.row[o.prop]))]}}])})]})],2)],1),i._v(" "),r("div",{staticClass:"info_news_footer"},[i._v("共计:"+i._s(i.total)+"\n      "),r("div",{staticClass:"show_pager"},[r("Pager",{attrs:{total:i.total},on:{change:i.handlePageChange}})],1)])]),i._v(" "),r("AddEmployeer",{attrs:{isModify:i.isModify,userInfo:i.theUser,orgid:i.searchForm.orgid||i.otherinfo.orgid,popVisible:i.AddEmployeerVisible},on:{"update:popVisible":function(e){i.AddEmployeerVisible=e},close:i.closeAddEmployeer,success:i.fetchData}}),i._v(" "),r("TableSetup",{attrs:{popVisible:i.setupTableVisible,columns:i.tableColumn},on:{close:i.closeSetupTable,success:i.setColumn}}),i._v(" "),r("SetAuth",{attrs:{orgid:i.otherinfo.companyId,popVisible:i.SetAuthVisible,users:i.authUser},on:{"update:popVisible":function(e){i.SetAuthVisible=e},close:i.closeAuth,success:i.fetchData}})],1)},staticRenderFns:[]};t.a=i},wO8r:function(e,t,o){"use strict";var i=o("mvHQ"),s=o.n(i),r=o("//Fk"),a=o.n(r),n=o("woOf"),l=o.n(n),c=o("Dd8w"),u=o.n(c),d=o("E4LH"),m=o("u8ra"),f=o("P5Di"),h=o("o9X6"),p=o("NYxO"),g=o("9UCZ"),b=o("pAQG");t.a={components:{popRight:f.a,SelectTree:h.a,SelectType:g.a,querySelect:b.a},props:{popVisible:{type:Boolean,default:!1},orgid:{required:!0},isModify:{type:Boolean,default:!1},userInfo:{type:Object,default:function(){}}},computed:u()({},Object(p.mapGetters)(["otherinfo"])),data:function(){return{querykey:"11",form:{name:"",mobilephone:"",username:"",password:"123456",position:"",sexFlag:"",orgid:"",rolesId:[],departmentId:""},formLabelWidth:"80px",tooltip:!1,rules:{name:[{required:!0,message:"请输入用户姓名"},{min:2,max:10,message:"长度在 2 到 10 个字符",trigger:"blur"}],password:[{required:!0,message:"请输入密码",trigger:"change"},{min:6,max:15,message:"长度在 6 到 15 个字符",trigger:"change"}],mobilephone:[{required:!0,trigger:"change",validator:function(e,t,o){""!==t&&null!==t&&t&&void 0!==t?d.a.MOBILE.test(t)?o():o(new Error("请输入有效的手机号码")):o(new Error("不能为空"))}}],orgid:[{required:!0,message:"请选择归属网点"}],username:[{required:!0,message:"请输入有效的登录账号",pattern:d.a.USERNAME_NOUP},{max:30,message:"不能超过30个字符",trigger:"change"}],position:[{max:10,message:"不能超过10个字符",trigger:"blur"}]},popTitle:"新增员工",orgArr:[],rolesArr:[],departmentArr:[],loading:!1,roles:[],departments:[],groups:[],inited:!1,query:"",roleslist:[]}},mounted:function(){this.form.orgid=this.orgid,console.log("orgid2222::::::",this.orgid)},watch:{popVisible:function(e,t){this.initInfo()},orgid:function(e){console.log("orgid::::::",e),this.form.orgid=e},userInfo:function(){var e=this;if(this.isModify){this.popTitle="修改员工";l()({},this.userInfo);for(var t in this.form)this.form[t]=this.userInfo[t];this.form.rolesId="0"===this.userInfo.rolesId?[]:this.userInfo.rolesIdList,this.form.password=""}else{for(var o in this.popTitle="新增员工",this.form)this.form[o]="password"===o?"123456":"rolesId"===o?[]:"";this.$nextTick(function(){console.log("orgid333333",e.orgid),e.form.orgid=e.orgid})}},"form.username":function(e){e&&this.$refs.ruleForm.validate(function(e){})},"form.password":function(e){e&&this.$refs.ruleForm.validate(function(e){})}},methods:{highLight:function(e,t){return""!==this.query?this.setHightLight(e[t],this.query):e[t]},setHightLight:function(e,t){return e.replace(new RegExp(t,"igm"),'<i class="highlight">'+t+"</i>")},makefilter:function(e){this.query=e;var t=new RegExp(e,"i");this.roleslist=this.roles.filter(function(e){return t.test(e.roleName)})},initInfo:function(){var t=this;return this.loading=!0,a.a.all([Object(m.e)(this.otherinfo.companyId),Object(m.f)(this.otherinfo.companyId)]).then(function(e){t.loading=!1,t.roles=e[0].list,t.roleslist=t.roles,t.departments=e[1]}).catch(function(e){t.$message.error("错误1："+(e.text||e.errInfo||e.data||s()(e))),t.loading=!1,t.inited=!1})},getOrgid:function(e){this.form.orgid=e},reset:function(){var e=this.form.orgid;this.$refs.ruleForm.resetFields(),console.log("id",e,this.form.orgid),this.form.orgid=e},submitForm:function(e,i){var r=this;this.$refs[e].validate(function(e){if(!e)return!1;r.loading=!0;var t=l()({},r.form),o=void 0;t.rolesId=t.rolesId.join(","),r.isModify?(t.id=r.userInfo.id,o=Object(m.k)(t)):o=Object(m.j)(t),o.then(function(e){r.loading=!1,r.$message({type:"success",message:"保存成功!"}),r.reset(),i||r.closeMe(),r.$emit("success")}).catch(function(e){r.$message.error("错误2："+(e.text||e.errInfo||e.data||s()(e))),r.loading=!1})})},closeMe:function(e){this.reset(),this.$emit("update:popVisible",!1),"function"==typeof e&&e()}}}},whtI:function(e,t){}});