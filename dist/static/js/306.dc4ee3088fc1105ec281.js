webpackJsonp([306],{Oebo:function(n,t,e){"use strict";var i=e("oagj"),o=e("OHys");t.a={props:{isChange:[String,Number]},data:function(){return{keys:{printLibkey:"",savePrintKey:"",saveShipKey:"",cleanKey:"",printShipKey:""}}},mounted:function(){this.getKeySetup()},beforeDestroy:function(){this.unbindKey()},watch:{isChange:function(){this.getKeySetup()}},methods:{doAction:function(n){this.$emit("doAction",n)},handleCommand:function(n){this.$emit("doCommand",n)},getKeySetup:function(){var t=this;return o.a.getPersonalSetup(this.otherinfo.id,"printKey").then(function(n){t.inited?t.unbindKey():t.inited=!0,t.keys=n,t.bindKey()})},bindKey:function(){var e=this,n=function(t){Object(i.a)(e.keys[t],function(n){n.preventDefault(),e.doAction(t)})};for(var t in this.keys)n(t)},unbindKey:function(){for(var n in this.keys)i.a.unbind(this.keys[n])}}}},"d+Lg":function(n,t,e){"use strict";var i={render:function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"order-btns"},[e("el-button",{attrs:{icon:"el-icon-circle-close-outline",type:"danger",plain:""},on:{click:function(n){t.doAction("cleanKey")}}},[t._v("清空（"+t._s(t.keys.cleanKey)+"）")]),t._v(" "),e("el-button",{attrs:{icon:"el-icon-printer",type:"primary",plain:""},on:{click:function(n){t.doAction("printLibkey")}}},[t._v("打印标签（"+t._s(t.keys.printLibkey)+"）")]),t._v(" "),e("el-button",{attrs:{icon:"el-icon-tickets",type:"primary",plain:""},on:{click:function(n){t.doAction("printShipKey")}}},[t._v("打印运单（"+t._s(t.keys.printShipKey)+"）")]),t._v(" "),e("el-button",{attrs:{icon:"el-icon-document",type:"primary",plain:""},on:{click:function(n){t.doAction("saveShipKey")}}},[t._v("保存（"+t._s(t.keys.saveShipKey)+"）")]),t._v(" "),e("el-button",{attrs:{icon:"el-icon-circle-check-outline",type:"success",plain:""},on:{click:function(n){t.doAction("savePrintKey")}}},[t._v("保存并打印（"+t._s(t.keys.savePrintKey)+"）")]),t._v(" "),e("el-dropdown",{staticClass:"createOrder-setup",attrs:{type:"primary",trigger:"click"},on:{command:t.handleCommand}},[e("span",{staticClass:"el-dropdown-link"},[e("el-button",{attrs:{icon:"el-icon-setting",size:"mini",type:"primary",plain:""}})],1),t._v(" "),e("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[e("el-dropdown-item",{attrs:{command:"feeSetup"}},[t._v("费用设置")]),t._v(" "),e("el-dropdown-item",{attrs:{command:"personalSetup"}},[t._v("个人设置")]),t._v(" "),e("el-dropdown-item",{attrs:{command:"orderSetup"}},[t._v("运单设置")]),t._v(" "),e("el-dropdown-item",{attrs:{command:"openInNewWindow"}},[t._v("独立窗口")])],1)],1)],1)},staticRenderFns:[]};t.a=i},ju65:function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=e("Oebo"),o=e("d+Lg"),r=e("VU/8")(i.a,o.a,null,null,null);t.default=r.exports}});