webpackJsonp([240],{"7BEH":function(e,t){},Lghf:function(e,t,o){"use strict";var r={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("el-dialog",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"tms_dialog",attrs:{title:t.popTitle,visible:t.isShow,"close-on-click-modal":!1,"before-close":t.closeMe},on:{"update:visible":function(e){t.isShow=e}}},[o("el-form",{ref:"ruleForm",staticClass:"colorpickerForm",attrs:{model:t.repertorySetting,rules:t.rules}},[o("el-form-item",{staticClass:"colorpickerItem",attrs:{prop:"sectionOne"}},[o("b",[t._v("超过：")]),t._v(" "),o("el-input",{model:{value:t.repertorySetting.sectionOne,callback:function(e){t.$set(t.repertorySetting,"sectionOne",e)},expression:"repertorySetting.sectionOne"}}),o("b",[t._v("小时的库存颜色")]),t._v(" "),o("el-color-picker",{attrs:{predefine:t.predefineColors},model:{value:t.repertorySetting.sectionOneColour,callback:function(e){t.$set(t.repertorySetting,"sectionOneColour",t._n(e))},expression:"repertorySetting.sectionOneColour"}})],1),t._v(" "),o("el-form-item",{staticClass:"colorpickerItem",attrs:{prop:"sectionTwo"}},[o("b",[t._v("超过：")]),t._v(" "),o("el-input",{model:{value:t.repertorySetting.sectionTwo,callback:function(e){t.$set(t.repertorySetting,"sectionTwo",e)},expression:"repertorySetting.sectionTwo"}}),o("b",[t._v("小时的库存颜色")]),t._v(" "),o("el-color-picker",{attrs:{predefine:t.predefineColors},model:{value:t.repertorySetting.sectionTwoColour,callback:function(e){t.$set(t.repertorySetting,"sectionTwoColour",t._n(e))},expression:"repertorySetting.sectionTwoColour"}})],1),t._v(" "),o("el-form-item",{staticClass:"colorpickerItem",attrs:{prop:"sectionThree"}},[o("b",[t._v("超过：")]),t._v(" "),o("el-input",{model:{value:t.repertorySetting.sectionThree,callback:function(e){t.$set(t.repertorySetting,"sectionThree",e)},expression:"repertorySetting.sectionThree"}}),o("b",[t._v("小时的库存颜色")]),t._v(" "),o("el-color-picker",{attrs:{predefine:t.predefineColors},model:{value:t.repertorySetting.sectionThreeColour,callback:function(e){t.$set(t.repertorySetting,"sectionThreeColour",t._n(e))},expression:"repertorySetting.sectionThreeColour"}})],1)],1),t._v(" "),o("div",{attrs:{slot:"footer"},slot:"footer"},[o("el-button",{attrs:{type:"primary"},on:{click:function(e){t.submitForm("ruleForm")}}},[t._v("确 定")]),t._v(" "),o("el-button",{on:{click:t.closeMe}},[t._v("取 消")])],1)],1)},staticRenderFns:[]};t.a=r},bOdI:function(e,t,o){"use strict";t.__esModule=!0;var r,i=o("C4MV"),n=(r=i)&&r.__esModule?r:{default:r};t.default=function(e,t,o){return t in e?(0,n.default)(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}},"oD/q":function(e,t,o){"use strict";var r,i=o("bOdI"),n=o.n(i),s=o("Dd8w"),c=o.n(s),l=(o("P5Di"),o("sPV7")),a=(o("E4LH"),o("NYxO")),u=o("0xDb");t.a=(r={data:function(){return{popTitle:"提醒颜色设置",repertorySetting:{},loading:!1,isShow:!1,rules:{sectionOne:[{validator:function(e,t,o){t<0||12<t?o(new Error("请输入0-12的数字")):o()},tigger:"blur"}],sectionTwo:[{validator:function(e,t,o){t<12||24<t?o(new Error("请输入12-24的数字")):o()},tigger:"blur"}],sectionThree:[{validator:function(e,t,o){t<24?o(new Error("请输入大于24的数字")):o()},tigger:"blur"}]},colorSetting:[],miniInput:"70px",predefineColors:["#ff4500","#ff8c00","#ffd700","#90ee90","#00ced1","#1e90ff","#c71585"]}},computed:{isShow:{get:function(){return this.popVisible},set:function(){}}},props:{popVisible:{type:Boolean,default:!1}},watch:{popVisible:function(){this.popVisible?this.isShow=!0:this.isShow=!1}},mounted:function(){this.getColor()}},n()(r,"computed",c()({},Object(a.b)(["otherinfo"]))),n()(r,"methods",{closeMe:function(e){this.$emit("close"),"function"==typeof e&&e()},getColor:function(){var o=this;Object(l.a)(this.otherinfo.orgid).then(function(e){if(e){var t=e.data.repertorySetting;o.$nextTick(function(){o.repertorySetting=Object(u.objectMerge2)({},t),o.colorSetting=e.data,o.$emit("success",o.colorSetting.repertorySetting)})}}).catch(function(e){o._handlerCatchMsg(e)})},submitForm:function(o){var r=this;this.$refs[o].validate(function(e){if(e){r.loading=!0;var t={};r.$set(t,"repertorySetting",r.repertorySetting),Object(l.c)(t,r.otherinfo.orgid,r.colorSetting.id).then(function(e){r.$message({type:"success",message:"修改成功"}),r.loading=!1,r.isShow=!1,r.getColor(),r.$nextTick(function(){r.$refs[o].resetFields()})}).catch(function(e){r._handlerCatchMsg(e),r.loading=!1})}})}}),r)},p6zF:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=o("oD/q"),i=o("Lghf");var n=function(e){o("7BEH")},s=o("VU/8")(r.a,i.a,n,null,null);t.default=s.exports}});