webpackJsonp([248],{"6/o8":function(e,t,o){"use strict";var r={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("el-dialog",{staticClass:"personalPopSetup",attrs:{title:"个人设置",visible:t.dialogVisiblePerson,"custom-class":"feeSetupDialog","close-on-click-modal":!1,"modal-append-to-body":!1,width:"600px","before-close":t.close},on:{open:t.getPersonalSetup}},[o("el-form",{ref:"ruleForm",attrs:{model:t.form,"label-width":"100px",inline:!0,"label-position":"right",size:"mini"}},[o("el-collapse",{model:{value:t.activeNames,callback:function(e){t.activeNames=e},expression:"activeNames"}},[o("el-collapse-item",{attrs:{name:"setup1",title:"运单默认值设置"}},[o("el-form-item",[o("el-checkbox",{attrs:{"true-label":"1","false-label":"0"},model:{value:t.form.shipDefault.openOrderAndTransferInfo,callback:function(e){t.$set(t.form.shipDefault,"openOrderAndTransferInfo",e)},expression:"form.shipDefault.openOrderAndTransferInfo"}},[t._v("开单页面附带中转信息")])],1),t._v(" "),o("el-form-item",[o("el-checkbox",{attrs:{"true-label":"1",disabled:"","false-label":"0"},model:{value:t.form.shipDefault.aloneWindow,callback:function(e){t.$set(t.form.shipDefault,"aloneWindow",e)},expression:"form.shipDefault.aloneWindow"}},[t._v("开单页面独立窗口")])],1)],1),t._v(" "),o("el-collapse-item",{attrs:{name:"setup2",title:"快捷键设置"}},[o("div",{on:{keydown:function(e){e.stopPropagation(),e.preventDefault()},keyup:function(e){e.stopPropagation(),e.preventDefault()},keypress:function(e){e.stopPropagation(),e.preventDefault()}}},[o("el-form-item",{attrs:{label:"清空"}},[o("el-input",{attrs:{placeholder:""},nativeOn:{keydown:function(e){e.stopPropagation(),e.preventDefault(),t.showkeycode("cleanKey",e)}},model:{value:t.form.printKey.cleanKey,callback:function(e){t.$set(t.form.printKey,"cleanKey",e)},expression:"form.printKey.cleanKey"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"打印标签"}},[o("el-input",{attrs:{placeholder:""},nativeOn:{keydown:function(e){e.preventDefault(),e.stopPropagation(),t.showkeycode("printLibkey",e)}},model:{value:t.form.printKey.printLibkey,callback:function(e){t.$set(t.form.printKey,"printLibkey",e)},expression:"form.printKey.printLibkey"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"打印运单"}},[o("el-input",{attrs:{placeholder:""},nativeOn:{keydown:function(e){e.preventDefault(),e.stopPropagation(),t.showkeycode("printShipKey",e)}},model:{value:t.form.printKey.printShipKey,callback:function(e){t.$set(t.form.printKey,"printShipKey",e)},expression:"form.printKey.printShipKey"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"保存运单"}},[o("el-input",{attrs:{placeholder:""},nativeOn:{keydown:function(e){e.preventDefault(),e.stopPropagation(),t.showkeycode("saveShipKey",e)}},model:{value:t.form.printKey.saveShipKey,callback:function(e){t.$set(t.form.printKey,"saveShipKey",e)},expression:"form.printKey.saveShipKey"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"保存并打印"}},[o("el-input",{attrs:{placeholder:""},nativeOn:{keydown:function(e){e.preventDefault(),e.stopPropagation(),t.showkeycode("savePrintKey",e)}},model:{value:t.form.printKey.savePrintKey,callback:function(e){t.$set(t.form.printKey,"savePrintKey",e)},expression:"form.printKey.savePrintKey"}})],1)],1)]),t._v(" "),o("el-collapse-item",{attrs:{name:"setup3",title:"运单默认值设置"}},[o("el-form-item",{attrs:{label:"交接方式"}},[o("SelectType",{attrs:{type:"ship_delivery_method"},model:{value:t.form.shipSetKey.handoverMode,callback:function(e){t.$set(t.form.shipSetKey,"handoverMode",e)},expression:"form.shipSetKey.handoverMode"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"回单类型"}},[o("SelectType",{attrs:{type:"ship_receipt_require"},model:{value:t.form.shipSetKey.receiptType,callback:function(e){t.$set(t.form.shipSetKey,"receiptType",e)},expression:"form.shipSetKey.receiptType"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"回单份数"}},[o("el-input",{attrs:{placeholder:""},model:{value:t.form.shipSetKey.receiptNum,callback:function(e){t.$set(t.form.shipSetKey,"receiptNum",e)},expression:"form.shipSetKey.receiptNum"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"付款方式"}},[o("SelectType",{attrs:{type:"ship_pay_way"},model:{value:t.form.shipSetKey.paymentMode,callback:function(e){t.$set(t.form.shipSetKey,"paymentMode",e)},expression:"form.shipSetKey.paymentMode"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"运输方式"}},[o("SelectType",{attrs:{type:"ship_shipping_type"},model:{value:t.form.shipSetKey.transportMode,callback:function(e){t.$set(t.form.shipSetKey,"transportMode",e)},expression:"form.shipSetKey.transportMode"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"业务类型"}},[o("SelectType",{attrs:{type:"ship_business_type"},model:{value:t.form.shipSetKey.businessType,callback:function(e){t.$set(t.form.shipSetKey,"businessType",e)},expression:"form.shipSetKey.businessType"}})],1)],1)],1)],1),t._v(" "),o("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{attrs:{size:"mini"},on:{click:t.resetSetup}},[t._v("恢复默认设置")]),t._v(" "),o("el-button",{attrs:{size:"mini",type:"primary"},on:{click:t.submitFeeSetup}},[t._v("确 定")]),t._v(" "),o("el-button",{attrs:{size:"mini"},on:{click:t.close}},[t._v("取 消")])],1)],1)},staticRenderFns:[]};t.a=r},W9xb:function(e,t,o){"use strict";var r=o("woOf"),i=o.n(r),n=o("OHys"),s=o("9UCZ"),a=o("oagj");t.a={components:{SelectType:s.a},props:{dialogVisiblePerson:{type:Boolean,default:!1}},data:function(){return{feeData:[],query:"",sortOption:{group:"item",sort:!0,dataIdAttr:""},activeNames:["setup1","setup2","setup3","setup4"],form:{shipDefault:{openOrderAndTransferInfo:"0",aloneWindow:"0"},printKey:{printLibkey:"",savePrintKey:"",saveShipKey:"",cleanKey:"",printShipKey:""},shipSetKey:{receiptType:"",receiptNum:"",handoverMode:"",paymentMode:"",transportMode:"",businessType:""}},userId:1}},mounted:function(){this.userId=this.otherinfo.id},methods:{close:function(e){this.$emit("update:dialogVisiblePerson",!1),this.$emit("close"),"function"==typeof e&&e()},getPersonalSetup:function(){var t=this;return n.a.getPersonalSetup(this.userId).then(function(e){t.form=e})},resetSetup:function(){var t=this;return n.a.resetPersonalSetup(this.userId).then(function(e){t.$message("重置成功！"),t.getPersonalSetup(t.userId)})},submitFeeSetup:function(){var t=this,e=i()({},this.form);return e.userId=this.userId,n.a.putPersonalSetup(e).then(function(e){t.$message("修改成功！"),t.$emit("success"),t.close()})},showkeycode:function(e,t){return t.preventDefault(),t.stopPropagation(),console.log("showkeycode:",t),this.$set(this.form.printKey,e,a.a.getPressedKey(t)),!1}}}},iXxK:function(e,t){},mCYf:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=o("W9xb"),i=o("6/o8");var n=function(e){o("iXxK")},s=o("VU/8")(r.a,i.a,n,null,null);t.default=s.exports}});