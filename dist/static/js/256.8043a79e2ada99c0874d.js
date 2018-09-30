webpackJsonp([256],{FAin:function(t,o,e){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var n=e("w3Od"),r=e("pJv1");var s=function(t){e("WL+X")},a=e("VU/8")(n.a,r.a,s,null,null);o.default=a.exports},"WL+X":function(t,o){},pJv1:function(t,o,e){"use strict";var n={render:function(){var t=this,o=t.$createElement,e=t._self._c||o;return e("div",{staticClass:"dashboard-container"},[e("div",{staticClass:"operation_flow"},[e("div",{staticClass:"operation_flow_item"},[e("el-tooltip",{attrs:{placement:"bottom"}},[e("div",{attrs:{slot:"content"},slot:"content"},[t._v("\n          功能：安排车辆上门提货\n        ")]),t._v(" "),e("router-link",{attrs:{to:"./order/pickUp"}},[e("i",{staticClass:"flowicon tihuo"}),t._v(" "),e("p",[t._v("提货")])])],1),t._v(" "),e("el-tooltip",{attrs:{placement:"top"}},[e("div",{attrs:{slot:"content"},slot:"content"},[t._v("\n          功能：发货方，承运方之间的凭证\n        ")]),t._v(" "),e("router-link",{attrs:{to:"./order/createOrder"}},[e("i",{staticClass:"flowicon daoru"}),t._v(" "),e("p",[t._v("开单")])])],1),t._v(" "),e("el-tooltip",{attrs:{placement:"bottom"}},[e("div",{attrs:{slot:"content"},slot:"content"},[t._v("\n          功能：把同个区域不同网点收的货物配载到分拨中心，进行干线配载\n        ")]),t._v(" "),e("router-link",{attrs:{to:"./order/shortDepart/arrival"}},[e("i",{staticClass:"flowicon duanbo"}),t._v(" "),e("p",[t._v("短驳接收")])])],1),t._v(" "),e("el-tooltip",{attrs:{placement:"top"}},[e("div",{attrs:{slot:"content"},slot:"content"},[t._v("\n          功能：接收其他网点发运到本网点的货物，以车为单位\n        ")]),t._v(" "),e("router-link",{attrs:{to:"./order/arteryDelivery"}},[e("i",{staticClass:"flowicon daohuo"}),t._v(" "),e("p",[t._v("干线到车")])])],1),t._v(" "),e("el-tooltip",{attrs:{placement:"bottom"}},[e("div",{attrs:{slot:"content"},slot:"content"},[t._v("\n          功能：开单收货，网点到货形成库存\n        ")]),t._v(" "),e("router-link",{attrs:{to:"./order/repertory/allrepertory"}},[e("i",{staticClass:"flowicon kucun"}),t._v(" "),e("p",[t._v("库存管理")])])],1)],1),t._v(" "),e("div",{staticClass:"operation_flow_item"},[e("el-tooltip",{attrs:{placement:"bottom"}},[e("div",{attrs:{slot:"content"},slot:"content"},[t._v("\n          功能：把货物转运给分拨中心\n        ")]),t._v(" "),e("router-link",{attrs:{to:"./order/shortDepart/deliver"}},[e("i",{staticClass:"flowicon duobofache"}),t._v(" "),e("p",[t._v("短驳发车")])])],1),t._v(" "),e("el-tooltip",{attrs:{placement:"top"}},[e("div",{attrs:{slot:"content"},slot:"content"},[t._v("\n          功能：在公司网点间走货运输\n        ")]),t._v(" "),e("router-link",{attrs:{to:"./order/arteryDepart"}},[e("i",{staticClass:"flowicon peizai"}),t._v(" "),e("p",[t._v("干线发车")])])],1),t._v(" "),e("el-tooltip",{attrs:{placement:"bottom"}},[e("div",{attrs:{slot:"content"},slot:"content"},[t._v("\n          功能：目的网点对需要送货上门的运单安排送货\n        ")]),t._v(" "),e("router-link",{attrs:{to:"./order/deliverManage"}},[e("i",{staticClass:"flowicon songhuosm"}),t._v(" "),e("p",[t._v("送货上门")])])],1),t._v(" "),e("el-tooltip",{attrs:{placement:"top"}},[e("div",{attrs:{slot:"content"},slot:"content"},[t._v("\n          功能：将运单转给第三方承运商\n        ")]),t._v(" "),e("router-link",{attrs:{to:"./order/transferLoad"}},[e("i",{staticClass:"flowicon zhongzhuan"}),t._v(" "),e("p",[t._v("中转外发")])])],1),t._v(" "),e("el-tooltip",{attrs:{placement:"bottom"}},[e("div",{attrs:{slot:"content"},slot:"content"},[t._v("\n          功能：对自提，送货上门，中转外发运单进行签收\n        ")]),t._v(" "),e("router-link",{attrs:{to:"./order/sign/Pick"}},[e("i",{staticClass:"flowicon qianshou"}),t._v(" "),e("p",[t._v("签收管理")])])],1)],1),t._v(" "),e("div",{staticClass:"operation_flow_item"},[e("div",{staticClass:"operation_flow_foot_left"},[e("el-tooltip",{attrs:{placement:"bottom"}},[e("div",{attrs:{slot:"content"},slot:"content"},[t._v("\n            功能：对目的网点寄回的回单做接收\n          ")]),t._v(" "),e("router-link",{attrs:{to:"/operation/order/receipt/Accept"}},[e("i",{staticClass:"flowicon jieshou"}),t._v(" "),e("p",[t._v("回单接收")])])],1),t._v(" "),e("el-tooltip",{attrs:{placement:"bottom"}},[e("div",{attrs:{slot:"content"},slot:"content"},[t._v("\n            功能：开单网点把回单发放给客户\n          ")]),t._v(" "),e("router-link",{attrs:{to:"/operation/order/receipt/Grant"}},[e("i",{staticClass:"flowicon fafang"}),t._v(" "),e("p",[t._v("回单发放")])])],1)],1),t._v(" "),e("div",{staticClass:"operation_flow_foot_right"},[e("el-tooltip",{attrs:{placement:"bottom"}},[e("div",{attrs:{slot:"content"},slot:"content"},[t._v("\n            功能：从收货人处回收回单\n          ")]),t._v(" "),e("router-link",{attrs:{to:"/operation/order/receipt/Recycle"}},[e("i",{staticClass:"flowicon huishou"}),t._v(" "),e("p",[t._v("回单回收")])])],1),t._v(" "),e("el-tooltip",{attrs:{placement:"bottom"}},[e("div",{attrs:{slot:"content"},slot:"content"},[t._v("\n            功能：目的网点把回单寄到开单网点\n          ")]),t._v(" "),e("router-link",{attrs:{to:"/operation/order/receipt/Send"}},[e("i",{staticClass:"flowicon jichu"}),t._v(" "),e("p",[t._v("回单寄出")])])],1)],1)])])])},staticRenderFns:[]};o.a=n},w3Od:function(t,o,e){"use strict";o.a={data:function(){return{}},methods:{gotoPage:function(t,o){this.$router.push({path:o,query:{tableKey:t}})}}}}});