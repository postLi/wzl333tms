webpackJsonp([279],{A9LP:function(t,o){},FAin:function(t,o,n){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var e=n("w3Od"),a=n("pJv1");var i=function(t){n("A9LP")},s=n("VU/8")(e.a,a.a,i,null,null);o.default=s.exports},pJv1:function(t,o,n){"use strict";var e={render:function(){var o=this,t=o.$createElement,n=o._self._c||t;return n("div",{staticClass:"dashboard-container"},[n("div",{staticClass:"operation_flow"},[n("div",{staticClass:"operation_flow_item"},[n("el-tooltip",{attrs:{placement:"bottom"}},[n("div",{attrs:{slot:"content"},slot:"content"},[o._v("\n          功能：安排车辆上门提货\n        ")]),o._v(" "),n("a",{on:{click:function(t){o.gotoPage("./order/pickUp","ORDER_PICK")}}},[n("i",{staticClass:"flowicon tihuo"}),o._v(" "),n("p",[o._v("提货")])])]),o._v(" "),n("el-tooltip",{attrs:{placement:"top"}},[n("div",{attrs:{slot:"content"},slot:"content"},[o._v("\n          功能：发货方，承运方之间的凭证\n        ")]),o._v(" "),n("a",{on:{click:function(t){o.gotoPage("./order/createOrder","ORDER_MADD")}}},[n("i",{staticClass:"flowicon daoru"}),o._v(" "),n("p",[o._v("开单")])])]),o._v(" "),n("el-tooltip",{attrs:{placement:"bottom"}},[n("div",{attrs:{slot:"content"},slot:"content"},[o._v("\n          功能：把同个区域不同网点收的货物配载到分拨中心，进行干线配载\n        ")]),o._v(" "),n("a",{on:{click:function(t){o.gotoPage("./order/shortDepart/arrival","LOAD_DBARRIVAL")}}},[n("i",{staticClass:"flowicon duanbo"}),o._v(" "),n("p",[o._v("短驳接收")])])]),o._v(" "),n("el-tooltip",{attrs:{placement:"top"}},[n("div",{attrs:{slot:"content"},slot:"content"},[o._v("\n          功能：接收其他网点发运到本网点的货物，以车为单位\n        ")]),o._v(" "),n("a",{on:{click:function(t){o.gotoPage("./order/arteryDelivery","GX_ARRIVE_LIST")}}},[n("i",{staticClass:"flowicon daohuo"}),o._v(" "),n("p",[o._v("干线到车")])])]),o._v(" "),n("el-tooltip",{attrs:{placement:"bottom"}},[n("div",{attrs:{slot:"content"},slot:"content"},[o._v("\n          功能：开单收货，网点到货形成库存\n        ")]),o._v(" "),n("a",{on:{click:function(t){o.gotoPage("./order/repertory/allrepertory","ORDER_REPER")}}},[n("i",{staticClass:"flowicon kucun"}),o._v(" "),n("p",[o._v("库存管理")])])])],1),o._v(" "),n("div",{staticClass:"operation_flow_item"},[n("el-tooltip",{attrs:{placement:"bottom"}},[n("div",{attrs:{slot:"content"},slot:"content"},[o._v("\n          功能：把货物转运给分拨中心\n        ")]),o._v(" "),n("a",{on:{click:function(t){o.gotoPage("./order/shortDepart/deliver","ORDER_SHORT")}}},[n("i",{staticClass:"flowicon duobofache"}),o._v(" "),n("p",[o._v("短驳发车")])])]),o._v(" "),n("el-tooltip",{attrs:{placement:"top"}},[n("div",{attrs:{slot:"content"},slot:"content"},[o._v("\n          功能：在公司网点间走货运输\n        ")]),o._v(" "),n("a",{on:{click:function(t){o.gotoPage("./order/arteryDepart","ORDER_ARTER")}}},[n("i",{staticClass:"flowicon peizai"}),o._v(" "),n("p",[o._v("干线发车")])])]),o._v(" "),n("el-tooltip",{attrs:{placement:"bottom"}},[n("div",{attrs:{slot:"content"},slot:"content"},[o._v("\n          功能：目的网点对需要送货上门的运单安排送货\n        ")]),o._v(" "),n("a",{on:{click:function(t){o.gotoPage("./order/deliverManage","ORDER_DELIVER")}}},[n("i",{staticClass:"flowicon songhuosm"}),o._v(" "),n("p",[o._v("送货上门")])])]),o._v(" "),n("el-tooltip",{attrs:{placement:"top"}},[n("div",{attrs:{slot:"content"},slot:"content"},[o._v("\n          功能：将运单转给第三方承运商\n        ")]),o._v(" "),n("a",{on:{click:function(t){o.gotoPage("./order/transferLoad","TRANSFER_INSERT")}}},[n("i",{staticClass:"flowicon zhongzhuan"}),o._v(" "),n("p",[o._v("中转外发")])])]),o._v(" "),n("el-tooltip",{attrs:{placement:"bottom"}},[n("div",{attrs:{slot:"content"},slot:"content"},[o._v("\n          功能：对自提，送货上门，中转外发运单进行签收\n        ")]),o._v(" "),n("a",{on:{click:function(t){o.gotoPage("./order/sign/Pick","ORDERSIGN1")}}},[n("i",{staticClass:"flowicon qianshou"}),o._v(" "),n("p",[o._v("签收管理")])])])],1),o._v(" "),n("div",{staticClass:"operation_flow_item"},[n("div",{staticClass:"operation_flow_foot_left"},[n("el-tooltip",{attrs:{placement:"bottom"}},[n("div",{attrs:{slot:"content"},slot:"content"},[o._v("\n            功能：对目的网点寄回的回单做接收\n          ")]),o._v(" "),n("a",{on:{click:function(t){o.gotoPage("/operation/order/receipt/Accept","RECEIPT3")}}},[n("i",{staticClass:"flowicon jieshou"}),o._v(" "),n("p",[o._v("回单接收")])])]),o._v(" "),n("el-tooltip",{attrs:{placement:"bottom"}},[n("div",{attrs:{slot:"content"},slot:"content"},[o._v("\n            功能：开单网点把回单发放给客户\n          ")]),o._v(" "),n("a",{on:{click:function(t){o.gotoPage("/operation/order/receipt/Grant","RECEIPT4")}}},[n("i",{staticClass:"flowicon fafang"}),o._v(" "),n("p",[o._v("回单发放")])])])],1),o._v(" "),n("div",{staticClass:"operation_flow_foot_right"},[n("el-tooltip",{attrs:{placement:"bottom"}},[n("div",{attrs:{slot:"content"},slot:"content"},[o._v("\n            功能：从收货人处回收回单\n          ")]),o._v(" "),n("a",{on:{click:function(t){o.gotoPage("/operation/order/receipt/Recycle","RECEIPT1")}}},[n("i",{staticClass:"flowicon huishou"}),o._v(" "),n("p",[o._v("回单回收")])])]),o._v(" "),n("el-tooltip",{attrs:{placement:"bottom"}},[n("div",{attrs:{slot:"content"},slot:"content"},[o._v("\n            功能：目的网点把回单寄到开单网点\n          ")]),o._v(" "),n("a",{on:{click:function(t){o.gotoPage("/operation/order/receipt/Send","RECEIPT2")}}},[n("i",{staticClass:"flowicon jichu"}),o._v(" "),n("p",[o._v("回单寄出")])])])],1)])])])},staticRenderFns:[]};o.a=e},w3Od:function(t,o,n){"use strict";o.a={name:"operationIndex",methods:{gotoPage:function(t,o){if(o&&!this.$_has_permission(o))return this.$message.warning("您没有权限，请联系管理员！"),this.$router.push({path:"/"}),!1;this.$router.push({path:t})}}}}});