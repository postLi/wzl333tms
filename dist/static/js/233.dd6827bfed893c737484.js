webpackJsonp([233],{"0Qo4":function(e,t){},"5CI6":function(e,t,r){"use strict";t.e=function(e){return o.b.post("/api-system/system/role/v1/",e).then(function(e){return e.data?e.data:{}})},t.f=function(e){return o.b.put("/api-system/system/role/v1/",e).then(function(e){return e.data?e.data:{}})},t.a=function(e){return o.b.delete("/api-system/system/role/v1/"+e).then(function(e){return e.data?e.data:{}})},t.b=function(e,t){var r=2<arguments.length&&void 0!==arguments[2]?arguments[2]:1,n=3<arguments.length&&void 0!==arguments[3]?arguments[3]:100;return o.b.post("/api-system/system/role/v1/findAllInfo",{currentPage:r,pageSize:n,vo:{orgid:e,rolesName:t}}).then(function(e){return e.data||{total:0,list:[]}})},t.d=function(e){return o.b.get("/api-system/system/menu/v1/menuTree/",{params:{role_id:e||0}}).then(function(e){return e.data||[]})},t.c=function(e){return Object(n.e)("menu_type",e)};var o=r("Vo7i"),n=r("t5DY")},TyhB:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABOklEQVQ4T8WTsUoDURBF77xNRAt3U6QQIRCFNPoL7ib+gHWIICSktrEQa2PhFwgib0VEBE1rFSGYhTTxD0TExkb0uRol8e2OJJWgyQohONUUM4c7lzuEEYtG3Mf4AbkTPxl0eBvMMWNSbNUL5uN31UMVOEcfcwg6l2DcgUgDSIu0uVBf7vf9GgjIuW8zIXSLGTuNUmKvN2y76pwhLryiKSMBtlS7AMU10b7BYdcrJW5t+XIKUK1RMg8GAhz5noLBSQ4+8z0AEVoA8ixQoRDHkSfYUtVJ0Jlgoxog8B5ezcXZaV+JeDyjqdv2VhPPQ020pWrrkFLNsvXUG3QO/Q0wZ6+K1spvmflhou2qGhjXIVsVg/xNBoo6RLZZtm7+BFiSal4QqgAyzFTj2MS6tzZ1Pyix409i1K/8v4IvMT9zEV3+DDMAAAAASUVORK5CYII="},XCyX:function(e,t,r){"use strict";var n=r("woOf"),o=r.n(n),s=r("P5Di"),a=r("5CI6"),i=r("0xDb");t.a={components:{popRight:s.a},props:{popVisible:{type:Boolean,default:!1},isModify:{type:Boolean,default:!1},reference:{type:Boolean,default:!1},dotInfo:Array,theUser:Object,createrId:[Number,String]},watch:{dotInfo:function(e){this.treeData=this.dotInfo,this.$refs.tree.setCheckedKeys(function t(e){var r=[];return e.map(function(e){e.isSelected?r.push(e.id):e.children&&(r=r.concat(t(e.children)))}),r}(this.treeData))},theUser:function(e){this.isModify&&(this.popTitle="修改角色",this.formInline=Object(i.objectMerge2)(this.theUser||{}),this.$refs.tree.setCheckedKeys(this.formInline.menusId)),this.reference?(this.formInline.menusId=this.theUser.id,this.$refs.tree.setCheckedKeys(this.formInline.menusId)):(this.popTitle="新增角色",this.result()),this.roleKey=Math.random()},reference:function(){this.reference&&(this.formInline={roleName:"",remark:"",menusId:this.theUser.id,createrId:this.createrId},this.popTitle="新增角色")}},computed:{isShow:{get:function(){return this.popVisible},set:function(){}}},data:function(){return{rules:{roleName:[{required:!0,message:"请输入角色名称",validator:function(e,t,r){if(!t)return r(new Error("请输入角色名称"));r()},trigger:"blur"},{max:12,message:"最多可输入12个字符"}],remarks:[{validator:function(e,t,r){r()},trigger:"blur"},{max:250,message:"最多可输入250个字符",trigger:"blur"}]},roleKey:"",treeData:[],defaultProps:{children:"children",label:"name"},formInline:{roleName:"",remark:"",menusId:[],createrId:this.createrId},popTitle:"新增角色",loading:!1}},mounted:function(){},methods:{newInfoData:function(){this.formInline={roleName:"",remark:"",menusId:"",createrId:this.createrId}},result:function(){this.newInfoData(),this.roleKey=Math.random()},closeMe:function(e){this.result(),this.$emit("close"),this.$refs.formName.resetFields(),"function"==typeof e&&e()},getCheckedNodes:function(e,t){var n=this;this.$refs[e].validate(function(e){if(!e)return!1;n.loading=!0;var t=n.$refs.tree.getCheckedNodes();n.formInline.menusId=t.map(function(e){return e.id});var r=o()({},n.formInline);(n.isModify?Object(a.f)(r):(n.reference,Object(a.e)(r))).then(function(e){n.$emit("success"),n.loading=!1,n.closeMe(),n.$message.success("保存成功")}).catch(function(e){n._handlerCatchMsg(e),n.loading=!1})})}}}},"f/K7":function(e,t,s){"use strict";var r={render:function(){var n=this,e=n.$createElement,o=n._self._c||e;return o("pop-right",{directives:[{name:"loading",rawName:"v-loading",value:n.loading,expression:"loading"}],staticClass:"add-role-pop-content",attrs:{title:n.popTitle,isShow:n.popVisible},on:{close:n.closeMe}},[o("template",{staticClass:"addEmployeerPop-content",slot:"content"},[o("div",{staticClass:"add-role"},[o("div",{staticClass:"add-role-top"},[o("el-form",{ref:"formName",staticClass:"demo-form-inline",attrs:{inline:!0,rules:n.rules,model:n.formInline}},[o("el-form-item",{attrs:{label:"角色名称：",prop:"roleName"}},[o("el-input",{attrs:{clearable:""},model:{value:n.formInline.roleName,callback:function(e){n.$set(n.formInline,"roleName",e)},expression:"formInline.roleName"}})],1),n._v(" "),o("el-form-item",{attrs:{label:"备注：",prop:"remark"}},[o("el-input",{attrs:{type:"textarea",placeholder:"",maxlength:300},model:{value:n.formInline.remark,callback:function(e){n.$set(n.formInline,"remark",e)},expression:"formInline.remark"}})],1)],1)],1),n._v(" "),o("div",{staticClass:"add-role-tree"},[o("el-tree",{key:n.roleKey,ref:"tree",attrs:{data:n.treeData,"show-checkbox":"","default-expand-all":"","node-key":"id","highlight-current":"",props:n.defaultProps},scopedSlots:n._u([{key:"default",fn:function(e){var t=e.node,r=e.data;return o("span",{staticClass:"custom-tree-node"},[0===r.status?o("span",[o("img",{attrs:{src:s("TyhB"),alt:""}}),n._v("\n                  "+n._s(t.label)+"\n                  ")]):o("span",[o("img",{attrs:{src:s("vzGk"),alt:""}}),n._v("\n                  "+n._s(t.label)+"\n                  ")])])}}])})],1)])]),n._v(" "),o("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{attrs:{type:"primary"},on:{click:function(e){n.getCheckedNodes("formName")}}},[n._v("保存")]),n._v(" "),o("el-button",{on:{click:n.closeMe}},[n._v("取 消")])],1)],2)},staticRenderFns:[]};t.a=r},vzGk:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACL0lEQVQ4T6WTP0xTURTGv3NuXxX0vSqDmxsxQQY1RjSR1nQwBgeNg4MSiS0kuuDgwkBMjEYGYkwMCybaAoZFF2EyBgdeUyQYXdT4Z/DPpMGl71GgvL57jymCsbQmJN7t3nPuL9937ncJ/7mo3v1jWT8ukEEAR9bqsyDucy/a7sb+aoAIxUe8exC0EasrJZJ3umSHjVZxP6DvgjCX+xa7jOtk1kFVgPasf5XEdBShzm+HHgD4J8hEBPxjObCHtkX95xCadNPO7bqARLbwucR8aKs2A2FEXZvpsufXGyu2QoN5RWbKTe/YXQNoH/X3sJbxgKJnLQnO6AiPq1DPgagBwkli6SiHMmEpeVwGn3uRcj5UIH8stI8UDrJBvxY1pEjvAkNE6DAJlsH4BCMrYPVdjO5losHpVOxlNWC8sJMCml0KnAMArMao3yGgfQxZEVl9jZJh7ldGP1wsx5KvLpFXBahsElnvmQCZ3wXpM+CnLOarAE0A7QUkXrFkjNOc76aFWsDYQouEZgqEIgShEE0abQ2HVrlohXYA9lsV0Eug4emUk6sBVA7io14bDJ4sBU5zo7VwPJd2Jv4OTyLjjQo4k0vb03UBq5CMdwdAIZeO3diYvHjWGyPi++uprBvlow/EZvLeUGRL0u1q+FKtoPAaEdXpdtnv/6lgbaAnAbkVanVhpsd+2/pIok1F7yYRnXJTsZa6SayRm/FPE5lOAU4AZEOQN0I9+W7n46YAm/npvwB8uekRXlNOoQAAAABJRU5ErkJggg=="},xbwg:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r("XCyX"),o=r("f/K7");var s=function(e){r("0Qo4")},a=r("VU/8")(n.a,o.a,s,null,null);t.default=a.exports}});