webpackJsonp([154,229,278],{"0Qo4":function(e,t){},"3ZBm":function(e,t,i){"use strict";var n={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"relation-per"},[i("pop-right",{staticClass:"addRelationPop",attrs:{title:t.popTitle,isShow:t.popRelatVisible},on:{close:t.closeMe}},[i("template",{staticClass:"addRelationPop-content",slot:"content"},[i("el-form",{ref:"formName",staticClass:"demo-ruleForm",attrs:{inline:!0,"label-position":"right",size:"mini"}},[i("table",[i("thead",[i("tr",[i("th",[t._v("角色")]),t._v(" "),i("th",[t._v("员工")])])]),t._v(" "),i("tbody",[i("tr",[i("td",[i("el-input",{attrs:{clearable:"",disabled:""},model:{value:t.inputInfo.roleName,callback:function(e){t.$set(t.inputInfo,"roleName",e)},expression:"inputInfo.roleName"}})],1),t._v(" "),i("td",[i("el-select",{attrs:{"collapse-tags":"","popper-class":"my-autocomplete",multiple:"",filterable:"","reserve-keyword":"",placeholder:"请选择员工","filterable-method":t.querySearch,loading:t.loading},model:{value:t.selected,callback:function(e){t.selected=e},expression:"selected"}},t._l(t.userdata,function(e){return i("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})}))],1)])])])])],1),t._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{type:"primary"},on:{click:function(e){t.submitForm("formName")}}},[t._v("保存")]),t._v(" "),i("el-button",{on:{click:t.closeMe}},[t._v("取 消")])],1)],2)],1)},staticRenderFns:[]};t.a=n},"5CI6":function(e,t,i){"use strict";t.e=function(e){return s.b.post("/api-system/system/role/v1/",e).then(function(e){return e.data?e.data:{}})},t.f=function(e){return s.b.put("/api-system/system/role/v1/",e).then(function(e){return e.data?e.data:{}})},t.a=function(e){return s.b.delete("/api-system/system/role/v1/"+e).then(function(e){return e.data?e.data:{}})},t.b=function(e,t){var i=2<arguments.length&&void 0!==arguments[2]?arguments[2]:1,n=3<arguments.length&&void 0!==arguments[3]?arguments[3]:100;return s.b.post("/api-system/system/role/v1/findAllInfo",{currentPage:i,pageSize:n,vo:{orgid:e,rolesName:t}}).then(function(e){return e.data||{total:0,list:[]}})},t.d=function(e){return s.b.get("/api-system/system/menu/v1/menuTree/",{params:{role_id:e||0}}).then(function(e){return e.data||[]})},t.c=function(e){return Object(n.e)("menu_type",e)};var s=i("Vo7i"),n=i("t5DY")},NmrW:function(e,t,i){"use strict";var n={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"permManage"},[i("div",{staticClass:"permManage-top"},[i("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:t.searchDate}},[i("el-form-item",{attrs:{label:"角色名称："}},[i("el-input",{attrs:{placeholder:"",clearable:""},model:{value:t.searchDate.roleName,callback:function(e){t.$set(t.searchDate,"roleName",e)},expression:"searchDate.roleName"}})],1),t._v(" "),i("el-form-item",[i("el-button",{attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v("查询")])],1)],1)],1),t._v(" "),i("div",{staticClass:"permManage-content"},[i("div",{staticClass:"side_right_bottom clearfix"},[i("div",{staticClass:"btns_box clearfix"},[i("div",{staticClass:"btns_box_lrl clearfix"},[i("el-button",{directives:[{name:"has",rawName:"v-has:PERMISSION_ADD",arg:"PERMISSION_ADD"}],attrs:{type:"primary",size:t.btnsize,icon:"el-icon-circle-plus",plain:""},on:{click:function(e){t.doAction("addRole")}}},[t._v("新增角色")]),t._v(" "),i("el-button",{directives:[{name:"has",rawName:"v-has:PERMISSION_EDIT",arg:"PERMISSION_EDIT"}],attrs:{type:"primary",size:t.btnsize,icon:"el-icon-edit",plain:""},on:{click:function(e){t.doAction("roleNot")}}},[t._v("修改")]),t._v(" "),i("el-button",{directives:[{name:"has",rawName:"v-has:PERMISSION_DELETE",arg:"PERMISSION_DELETE"}],attrs:{type:"danger",size:t.btnsize,icon:"el-icon-delete",plain:""},on:{click:function(e){t.doAction("deletePeople")}}},[t._v("删除")]),t._v(" "),i("el-button",{directives:[{name:"has",rawName:"v-has:PERMISSION_COPY",arg:"PERMISSION_COPY"}],attrs:{type:"primary",size:t.btnsize,icon:"el-icon-edit",plain:""},on:{click:function(e){t.doAction("reference")}}},[t._v("参照")]),t._v(" "),i("el-button",{directives:[{name:"has",rawName:"v-has:PERMISSION_LINK",arg:"PERMISSION_LINK"}],attrs:{type:"primary",size:t.btnsize,icon:"el-icon-edit",plain:""},on:{click:function(e){t.doAction("relationPer")}}},[t._v("关联员工")])],1)]),t._v(" "),i("div",{staticClass:"info_news"},[i("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:t.usersArr,stripe:"",border:"",height:"100%","tooltip-effect":"dark"},on:{"row-click":t.clickDetails,"selection-change":t.seleClick}},[i("el-table-column",{attrs:{fixed:"",type:"selection",width:"55"}}),t._v(" "),i("el-table-column",{attrs:{fixed:"",prop:"id",label:"序号",width:"50"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(e.$index+1))]}}])}),t._v(" "),i("el-table-column",{attrs:{fixed:"",prop:"roleName",label:"角色名称"}}),t._v(" "),i("el-table-column",{attrs:{prop:"createrName",label:"创建者"}}),t._v(" "),i("el-table-column",{attrs:{label:"创建时间",prop:"createTime"}}),t._v(" "),i("el-table-column",{attrs:{prop:"remark",label:"备注"}})],1)],1)])]),t._v(" "),i("AddRole",{attrs:{dotInfo:t.getTreeArr,isModify:t.isModify,reference:t.isReference,popVisible:t.addDoRoleVisible,createrId:t.otherinfo.id,theUser:t.theUser},on:{close:t.closeAddRole,success:t.getSeachInfo}}),t._v(" "),i("RelationPer",{attrs:{popRelatVisible:t.addRelatVisible,dotInfo:t.thePer,thePerAllUserInfo:t.thePerAllUser},on:{close:t.closeAddDot,success:t.getSeachInfo}}),t._v(" "),i("div",{staticClass:"info_table_footer"},[i("div",{staticClass:"total_footer"},[t._v("共计:"+t._s(t.usersArr.length))])])],1)},staticRenderFns:[]};t.a=n},TyhB:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABOklEQVQ4T8WTsUoDURBF77xNRAt3U6QQIRCFNPoL7ib+gHWIICSktrEQa2PhFwgib0VEBE1rFSGYhTTxD0TExkb0uRol8e2OJJWgyQohONUUM4c7lzuEEYtG3Mf4AbkTPxl0eBvMMWNSbNUL5uN31UMVOEcfcwg6l2DcgUgDSIu0uVBf7vf9GgjIuW8zIXSLGTuNUmKvN2y76pwhLryiKSMBtlS7AMU10b7BYdcrJW5t+XIKUK1RMg8GAhz5noLBSQ4+8z0AEVoA8ixQoRDHkSfYUtVJ0Jlgoxog8B5ezcXZaV+JeDyjqdv2VhPPQ020pWrrkFLNsvXUG3QO/Q0wZ6+K1spvmflhou2qGhjXIVsVg/xNBoo6RLZZtm7+BFiSal4QqgAyzFTj2MS6tzZ1Pyix409i1K/8v4IvMT9zEV3+DDMAAAAASUVORK5CYII="},XCyX:function(e,t,i){"use strict";var n=i("woOf"),s=i.n(n),o=i("P5Di"),r=i("5CI6"),a=i("0xDb");t.a={components:{popRight:o.a},props:{popVisible:{type:Boolean,default:!1},isModify:{type:Boolean,default:!1},reference:{type:Boolean,default:!1},dotInfo:Array,theUser:Object,createrId:[Number,String]},watch:{dotInfo:function(e){this.treeData=this.dotInfo,this.$refs.tree.setCheckedKeys(function t(e){var i=[];return e.map(function(e){e.isSelected?i.push(e.id):e.children&&(i=i.concat(t(e.children)))}),i}(this.treeData))},theUser:function(e){this.isModify&&(this.popTitle="修改角色",this.formInline=Object(a.objectMerge2)(this.theUser||{}),this.$refs.tree.setCheckedKeys(this.formInline.menusId)),this.reference?(this.formInline.menusId=this.theUser.id,this.$refs.tree.setCheckedKeys(this.formInline.menusId)):(this.popTitle="新增角色",this.result()),this.roleKey=Math.random()},reference:function(){this.reference&&(this.formInline={roleName:"",remark:"",menusId:this.theUser.id,createrId:this.createrId},this.popTitle="新增角色")}},computed:{isShow:{get:function(){return this.popVisible},set:function(){}}},data:function(){return{rules:{roleName:[{required:!0,message:"请输入角色名称",validator:function(e,t,i){if(!t)return i(new Error("请输入角色名称"));i()},trigger:"blur"},{max:12,message:"最多可输入12个字符"}],remarks:[{validator:function(e,t,i){i()},trigger:"blur"},{max:250,message:"最多可输入250个字符",trigger:"blur"}]},roleKey:"",treeData:[],defaultProps:{children:"children",label:"name"},formInline:{roleName:"",remark:"",menusId:[],createrId:this.createrId},popTitle:"新增角色",loading:!1}},mounted:function(){},methods:{newInfoData:function(){this.formInline={roleName:"",remark:"",menusId:"",createrId:this.createrId}},result:function(){this.newInfoData(),this.roleKey=Math.random()},closeMe:function(e){this.result(),this.$emit("close"),this.$refs.formName.resetFields(),"function"==typeof e&&e()},getCheckedNodes:function(e,t){var n=this;this.$refs[e].validate(function(e){if(!e)return!1;n.loading=!0;var t=n.$refs.tree.getCheckedNodes();n.formInline.menusId=t.map(function(e){return e.id});var i=s()({},n.formInline);(n.isModify?Object(r.f)(i):(n.reference,Object(r.e)(i))).then(function(e){n.$emit("success"),n.loading=!1,n.closeMe(),n.$message.success("保存成功")}).catch(function(e){n._handlerCatchMsg(e),n.loading=!1})})}}}},czv6:function(e,t,i){"use strict";var o=i("u8ra"),n=i("P5Di");t.a={components:{popRight:n.a},props:{popRelatVisible:{type:Boolean,default:!1},dotInfo:Object,thePerAllUserInfo:[Object,Array]},computed:{isShow:{get:function(){return this.popRelatVisible},set:function(){}},mobilelist:function(){var i=this;return this.selected.map(function(t){var e=i.thePerAllUserInfo.filter(function(e){return e.id===t});return e[0]?e[0].mobilephone:""}).join(", ")}},watch:{popRelatVisible:function(){this.popRelatVisible&&this.init()},dotInfo:function(e){this.popRelatVisible&&this.init()},thePerAllUserInfo:function(e){console.log("this.thePerAllUserInfo",this.thePerAllUserInfo)}},data:function(){return{userdata:[],selected:[],inputInfo:{roleName:""},restaurants:[],resInfo:[{name:""}],selectInfo:{name:"",mobilephone:"",rolesId:[],id:""},loading:!1,popTitle:"关联员工",dialogVisible:"false"}},mounted:function(){},methods:{init:function(){var t=this;this.resInfo=this.thePerAllUserInfo||[],this.userdata=this.resInfo,this.inputInfo=this.dotInfo,this.selected=this.resInfo.filter(function(e){return-1!==e.rolesIdList.indexOf(t.dotInfo.id)}).map(function(e){return e.id})},querySearch:function(t,e){var i=this.resInfo,n=t?i.filter(function(e){return!!e.name&&-1!==e.name.indexOf(t)}):i;this.userdata=n,e&&e(n)},createFilter:function(t){return function(e){return-1!==e.name.indexOf(t)}},handleSelect:function(e){this.selectInfo=e},handleIconClick:function(e){console.log(e)},closeMe:function(e){this.$emit("close"),"function"==typeof e&&e()},submitForm:function(e){var n=this;this.loading=!0;var s=[];this.selected.map(function(t){var e=n.thePerAllUserInfo.filter(function(e){return e.id===t});if(e[0]){var i=e[0].rolesIdList.filter(function(e){return 0!==e});i.push(n.dotInfo.id),s.push({id:t,rolesIdList:i})}}),Object(o.j)(s).then(function(e){n.$message.success("保存成功"),n.closeMe(),n.$emit("success"),n.loading=!1}).catch(function(e){n._handlerCatchMsg(e)})}}}},dI7A:function(e,t){},e2Px:function(e,t,i){"use strict";var n=i("//Fk"),s=i.n(n),o=i("Dd8w"),r=i.n(o),a=i("5CI6"),l=i("u8ra"),c=i("NYxO"),d=i("xbwg"),f=i("sLXT");t.a={name:"permissionManage",components:{AddRole:d.default,RelationPer:f.default},computed:r()({},Object(c.b)(["otherinfo"])),created:function(){},data:function(){return{searchDate:{roleName:"",id:""},btnsize:"mini",loading:!0,addRelatVisible:!1,addDoRoleVisible:!1,addDoTotVisible:!1,addPeopleVisible:!1,isModify:!1,isReference:!1,formLabelWidth:"120px",selected:[],usersArr:[],getTreeArr:[],theUser:{},thePer:{},theMentInfo:{},thePerAllUser:{},orgInfoCache:{}}},mounted:function(){var t=this;s.a.all([Object(a.c)(this.otherinfo.orgid),this.fetchAllUser(this.otherinfo.orgid)]).then(function(e){t.loading=!1,t.theMentInfo=e[0],t.thePerAllUser=e[1].list}).catch(function(e){t.loading=!1,t._handlerCatchMsg(e)}),this.getSeachInfo(),this.getTreeInfo()},methods:{fetchAllUser:function(e,t,i){return Object(l.d)(e,t||"",i||"")},getSeachInfo:function(e,t){var i=this;t?(this.searchDate.roleName=t,Object(a.b)(this.otherinfo.orgid,this.searchDate.roleName).then(function(e){i.loading=!1,i.usersArr=e.list}).catch(function(e){i._handlerCatchMsg(e)})):(this.loading=!1,Object(a.b)(this.otherinfo.orgid).then(function(e){i.usersArr=e.list}).catch(function(e){i._handlerCatchMsg(e)}))},getTreeInfo:function(){var t=this;this.isModify||this.isReference?Object(a.d)(this.theUser.id).then(function(e){t.loading=!1,t.getTreeArr=e}).catch(function(e){t._handlerCatchMsg(e)}):Object(a.d)(0).then(function(e){t.loading=!1,t.getTreeArr=e}).catch(function(e){t._handlerCatchMsg(e)})},seleClick:function(e){this.selected=e},doAction:function(e){var t=this;if(!this.selected.length&&"addRole"!==e&&"depMain"!==e&&"deletePeople"!==e)return this.$message({message:"请选择要操作的角色~",type:"warning"}),!1;switch(e){case"addRole":this.theUser={},this.addDoRoleVisible=!0,this.addRelatVisible=!1,this.isModify=!1,this.isReference=!1;break;case"roleNot":if(1<this.selected.length)return this.$message({message:"每次只能修改单条数据~",type:"warning"}),!1;this.addDoRoleVisible=!0,this.addRelatVisible=!1,this.isReference=!1,this.isModify=!0,this.theUser=this.selected[0],this.getTreeInfo();break;case"reference":if(1<this.selected.length)return this.$message({message:"每次只能参照单条数据~",type:"warning"}),!1;this.addDoRoleVisible=!0,this.addRelatVisible=!1,this.isModify=!1,this.isReference=!0,this.theUser=this.selected[0],this.getTreeInfo();break;case"relationPer":if(1<this.selected.length)return this.$message({message:"每次只能参照单条数据~",type:"warning"}),!1;this.addRelatVisible=!0,this.addDoRoleVisible=!1,this.isModify=!1,this.isReference=!1,this.thePer=this.selected[0];break;case"deletePeople":this.addDoRoleVisible=!1,this.addRelatVisible=!1;var i=1<this.selected.length?this.selected.length+"名":this.selected[0].roleName,n="";this.selected.map(function(e){n+=e.id+","}),n=n.slice(0,n.length-1);var s=this.selected[0].id;this.$confirm("确定要删除 "+i+" 角色吗？","提示",{confirmButtonText:"删除",cancelButtonText:"取消",type:"warning"}).then(function(){Object(a.a)(s).then(function(e){t.$message({type:"success",message:"删除成功!"}),t.getSeachInfo()}).catch(function(e){t.$message({type:"info",message:e.errorInfo})})}).catch(function(){t.$message({type:"info",message:"已取消删除"})})}this.$refs.multipleTable.clearSelection()},filterTag:function(e,t){return t.tag===e},clickDetails:function(e,t,i){this.$refs.multipleTable.toggleRowSelection(e)},closeAddRole:function(){this.addDoRoleVisible=!1},closeAddDot:function(){this.addRelatVisible=!1},onSubmit:function(){this.getSeachInfo(this.otherinfo.orgid,this.searchDate.roleName)}}}},"f/K7":function(e,t,o){"use strict";var i={render:function(){var n=this,e=n.$createElement,s=n._self._c||e;return s("pop-right",{directives:[{name:"loading",rawName:"v-loading",value:n.loading,expression:"loading"}],staticClass:"add-role-pop-content",attrs:{title:n.popTitle,isShow:n.popVisible},on:{close:n.closeMe}},[s("template",{staticClass:"addEmployeerPop-content",slot:"content"},[s("div",{staticClass:"add-role"},[s("div",{staticClass:"add-role-top"},[s("el-form",{ref:"formName",staticClass:"demo-form-inline",attrs:{inline:!0,rules:n.rules,model:n.formInline}},[s("el-form-item",{attrs:{label:"角色名称：",prop:"roleName"}},[s("el-input",{attrs:{clearable:""},model:{value:n.formInline.roleName,callback:function(e){n.$set(n.formInline,"roleName",e)},expression:"formInline.roleName"}})],1),n._v(" "),s("el-form-item",{attrs:{label:"备注：",prop:"remark"}},[s("el-input",{attrs:{type:"textarea",placeholder:"",maxlength:300},model:{value:n.formInline.remark,callback:function(e){n.$set(n.formInline,"remark",e)},expression:"formInline.remark"}})],1)],1)],1),n._v(" "),s("div",{staticClass:"add-role-tree"},[s("el-tree",{key:n.roleKey,ref:"tree",attrs:{data:n.treeData,"show-checkbox":"","default-expand-all":"","node-key":"id","highlight-current":"",props:n.defaultProps},scopedSlots:n._u([{key:"default",fn:function(e){var t=e.node,i=e.data;return s("span",{staticClass:"custom-tree-node"},[0===i.status?s("span",[s("img",{attrs:{src:o("TyhB"),alt:""}}),n._v("\n                  "+n._s(t.label)+"\n                  ")]):s("span",[s("img",{attrs:{src:o("vzGk"),alt:""}}),n._v("\n                  "+n._s(t.label)+"\n                  ")])])}}])})],1)])]),n._v(" "),s("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{attrs:{type:"primary"},on:{click:function(e){n.getCheckedNodes("formName")}}},[n._v("保存")]),n._v(" "),s("el-button",{on:{click:n.closeMe}},[n._v("取 消")])],1)],2)},staticRenderFns:[]};t.a=i},n0i5:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=i("e2Px"),s=i("NmrW");var o=function(e){i("q7dF")},r=i("VU/8")(n.a,s.a,o,null,null);t.default=r.exports},q7dF:function(e,t){},sLXT:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=i("czv6"),s=i("3ZBm");var o=function(e){i("dI7A")},r=i("VU/8")(n.a,s.a,o,null,null);t.default=r.exports},vzGk:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACL0lEQVQ4T6WTP0xTURTGv3NuXxX0vSqDmxsxQQY1RjSR1nQwBgeNg4MSiS0kuuDgwkBMjEYGYkwMCybaAoZFF2EyBgdeUyQYXdT4Z/DPpMGl71GgvL57jymCsbQmJN7t3nPuL9937ncJ/7mo3v1jWT8ukEEAR9bqsyDucy/a7sb+aoAIxUe8exC0EasrJZJ3umSHjVZxP6DvgjCX+xa7jOtk1kFVgPasf5XEdBShzm+HHgD4J8hEBPxjObCHtkX95xCadNPO7bqARLbwucR8aKs2A2FEXZvpsufXGyu2QoN5RWbKTe/YXQNoH/X3sJbxgKJnLQnO6AiPq1DPgagBwkli6SiHMmEpeVwGn3uRcj5UIH8stI8UDrJBvxY1pEjvAkNE6DAJlsH4BCMrYPVdjO5losHpVOxlNWC8sJMCml0KnAMArMao3yGgfQxZEVl9jZJh7ldGP1wsx5KvLpFXBahsElnvmQCZ3wXpM+CnLOarAE0A7QUkXrFkjNOc76aFWsDYQouEZgqEIgShEE0abQ2HVrlohXYA9lsV0Eug4emUk6sBVA7io14bDJ4sBU5zo7VwPJd2Jv4OTyLjjQo4k0vb03UBq5CMdwdAIZeO3diYvHjWGyPi++uprBvlow/EZvLeUGRL0u1q+FKtoPAaEdXpdtnv/6lgbaAnAbkVanVhpsd+2/pIok1F7yYRnXJTsZa6SayRm/FPE5lOAU4AZEOQN0I9+W7n46YAm/npvwB8uekRXlNOoQAAAABJRU5ErkJggg=="},xbwg:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=i("XCyX"),s=i("f/K7");var o=function(e){i("0Qo4")},r=i("VU/8")(n.a,s.a,o,null,null);t.default=r.exports}});
//# sourceMappingURL=154.e3ffdfd4ca19465526c3.js.map