webpackJsonp([40],{"0Q33":function(t,e){},"1Y2G":function(t,i,e){var o=e("oLzS"),a=e("Sd0T"),s=e("utyv"),u=e("uF9H"),l=e("yYhy"),c=e("Dsid"),r=o.getBCHDigit(7973);function f(t,e){return u.getCharCountIndicator(t,e)+4}function h(t,r){var n=0;return t.forEach(function(t){var e=f(t.mode,r);n+=e+t.getBitsLength()}),n}i.from=function(t,e){return l.isValid(t)?parseInt(t,10):e},i.getCapacity=function(t,e,r){if(!l.isValid(t))throw new Error("Invalid QR Code version");void 0===r&&(r=u.BYTE);var n=8*(o.getSymbolTotalCodewords(t)-a.getTotalCodewordsCount(t,e));if(r===u.MIXED)return n;var i=n-f(r,t);switch(r){case u.NUMERIC:return Math.floor(i/10*3);case u.ALPHANUMERIC:return Math.floor(i/11*2);case u.KANJI:return Math.floor(i/13);case u.BYTE:default:return Math.floor(i/8)}},i.getBestVersionForData=function(t,e){var r,n=s.from(e,s.M);if(c(t)){if(1<t.length)return function(t,e){for(var r=1;r<=40;r++)if(h(t,r)<=i.getCapacity(r,e,u.MIXED))return r}(t,n);if(0===t.length)return 1;r=t[0]}else r=t;return function(t,e,r){for(var n=1;n<=40;n++)if(e<=i.getCapacity(n,r,t))return n}(r.mode,r.getLength(),n)},i.getEncodedBits=function(t){if(!l.isValid(t)||t<7)throw new Error("Invalid QR Code version");for(var e=t<<12;0<=o.getBCHDigit(e)-r;)e^=7973<<o.getBCHDigit(e)-r;return t<<12|e}},"71e1":function(t,e,r){var l=r("mwnW"),c=r("WEzc"),n=r("9ff9"),i=r("729m");function o(n,i,o,a,e){var t=[].slice.call(arguments,1),r=t.length,s="function"==typeof t[r-1];if(!s&&!l())throw new Error("Callback required as last argument");if(!s){if(r<1)throw new Error("Too few arguments provided");return 1===r?(o=i,i=a=void 0):2!==r||i.getContext||(a=o,o=i,i=void 0),new Promise(function(t,e){try{var r=c.create(o,a);t(n(r,i,a))}catch(t){e(t)}})}if(r<2)throw new Error("Too few arguments provided");2===r?(e=o,o=i,i=a=void 0):3===r&&(i.getContext&&void 0===e?(e=a,a=void 0):(e=a,a=o,o=i,i=void 0));try{var u=c.create(o,a);e(null,n(u,i,a))}catch(t){e(t)}}e.create=c.create,e.toCanvas=o.bind(null,n.render),e.toDataURL=o.bind(null,n.renderToDataURL),e.toString=o.bind(null,function(t,e,r){return i.render(t,r)})},"729m":function(t,e,r){var f=r("nwDn");function h(t,e){var r=t.a/255,n=e+'="'+t.hex+'"';return r<1?n+" "+e+'-opacity="'+r.toFixed(2).slice(1)+'"':n}function d(t,e,r){var n=t+e;return void 0!==r&&(n+=" "+r),n}e.render=function(t,e,r){var n=f.getOptions(e),i=t.modules.size,o=t.modules.data,a=i+2*n.margin,s=n.color.light.a?"<path "+h(n.color.light,"fill")+' d="M0 0h'+a+"v"+a+'H0z"/>':"",u="<path "+h(n.color.dark,"stroke")+' d="'+function(t,e,r){for(var n="",i=0,o=!1,a=0,s=0;s<t.length;s++){var u=Math.floor(s%e),l=Math.floor(s/e);u||o||(o=!0),t[s]?(a++,0<s&&0<u&&t[s-1]||(n+=o?d("M",u+r,.5+l+r):d("m",i,0),i=0,o=!1),u+1<e&&t[s+1]||(n+=d("h",a),a=0)):i++}return n}(o,i,n.margin)+'"/>',l='viewBox="0 0 '+a+" "+a+'"',c='<svg xmlns="http://www.w3.org/2000/svg" '+(n.width?'width="'+n.width+'" height="'+n.width+'" ':"")+l+' shape-rendering="crispEdges">'+s+u+"</svg>";return"function"==typeof r&&r(null,c),c}},"9ff9":function(t,s,e){var c=e("nwDn");s.render=function(t,e,r){var n=r,i=e;void 0!==n||e&&e.getContext||(n=e,e=void 0),e||(i=function(){try{return document.createElement("canvas")}catch(t){throw new Error("You need to specify a canvas element")}}()),n=c.getOptions(n);var o,a,s=c.getImageWidth(t.modules.size,n),u=i.getContext("2d"),l=u.createImageData(s,s);return c.qrToImageData(l.data,t,n),o=i,a=s,u.clearRect(0,0,o.width,o.height),o.style||(o.style={}),o.height=a,o.width=a,o.style.height=a+"px",o.style.width=a+"px",u.putImageData(l,0,0),i},s.renderToDataURL=function(t,e,r){var n=r;void 0!==n||e&&e.getContext||(n=e,e=void 0),n||(n={});var i=s.render(t,e,n),o=n.type||"image/png",a=n.rendererOpts||{};return i.toDataURL(o,a.quality)}},"9jEu":function(t,a,e){var s=e("oLzS").getSymbolSize;a.getRowColCoords=function(t){if(1===t)return[];for(var e=Math.floor(t/7)+2,r=s(t),n=145===r?26:2*Math.ceil((r-13)/(2*e-2)),i=[r-7],o=1;o<e-1;o++)i[o]=i[o-1]-n;return i.push(6),i.reverse()},a.getPositions=function(t){for(var e=[],r=a.getRowColCoords(t),n=r.length,i=0;i<n;i++)for(var o=0;o<n;o++)0===i&&0===o||0===i&&o===n-1||i===n-1&&0===o||e.push([r[i],r[o]]);return e}},DEuz:function(t,e){function r(){this.buffer=[],this.length=0}r.prototype={get:function(t){var e=Math.floor(t/8);return 1==(this.buffer[e]>>>7-t%8&1)},put:function(t,e){for(var r=0;r<e;r++)this.putBit(1==(t>>>e-r-1&1))},getLengthInBits:function(){return this.length},putBit:function(t){var e=Math.floor(this.length/8);this.buffer.length<=e&&this.buffer.push(0),t&&(this.buffer[e]|=128>>>this.length%8),this.length++}},t.exports=r},Dsid:function(t,e){var r={}.toString;t.exports=Array.isArray||function(t){return"[object Array]"==r.call(t)}},EPeO:function(t,e,r){"use strict";var n=r("//Fk"),a=r.n(n),i=r("mvHQ"),o=r.n(i),s=r("t5DY"),u=r("0xDb"),l=r("71e1"),c=r.n(l);e.a={name:"singleImageUpload",props:{value:[String,Array],title:{type:String,default:""},tip:{type:String,default:"（jpg/png。小于5M）"},size:{type:String,default:"mini"},showFileList:{type:Boolean,default:!1},limit:{type:Number,default:1},listtype:{type:String,default:"picture",enum:["text","picture","picture-card"]},disabled:{type:Boolean,default:!1},twocode:{type:Boolean,default:!1}},computed:{imageUrl:function(){return this.value}},data:function(){return{tempUrl:"",dataObj:{token:"",key:""},upload:{key:"",policy:"",OSSAccessKeyId:"",success_action_status:"201",signature:""},uploadUrl:"",dir:"",filelist:[],showtc:!1,showtwocdetip:!0,twocodeurl:""}},watch:{showtc:function(){this.showtc?this.changeTwocode():clearInterval(this.uptimer)},value:{handler:function(t){if(this.showFileList){var e=Array.isArray(t)?t:t?t.split(","):[];e=e.filter(function(t){return t}),this.filelist=[],this.filelist=e.map(function(t){var e={};return e.url=t,e})}else this.filelist=t?[t]:[]},immediate:!0}},mounted:function(){this.init()},updated:function(){console.log("single image updated~~~")},beforeDestroy:function(){console.log("beforeDestroy"),clearInterval(this.uptimer)},methods:{init:function(){var e=this;return Object(s.j)().then(function(t){e.upload.OSSAccessKeyId=t.accessid,e.upload.policy=t.policy,e.upload.signature=t.signature,e.uploadUrl=t.host,e.dir=t.dir}).catch(function(){})},rmImage:function(e){this.filelist=this.filelist.filter(function(t){return t.url!==e}),this.emitInput(""),this.showtc=!1},onexceed:function(t,e){this.$message.error("最多上传 "+this.limit+" 张!")},handleRemove:function(t,e){console.log("handleRemove:",t,e),this.filelist=e,this.emitInput()},random_string:function(t){t=t||32;for(var e="ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",r=e.length,n="",i=0;i<t;i++)n+=e.charAt(Math.floor(Math.random()*r));return n},emitInput:function(t){t&&this.filelist.push({url:t}),this.$emit("input",this.showFileList?this.filelist.map(function(t){return t.url}).join(","):t)},handleImageScucess:function(t){var e="";-1!==t.indexOf("Location")&&(e=(e=t.match(/<Location>([^<]+)<\/Location>/m))?e[1]:""),this.emitInput(e)},handleError:function(t){this.$message.error("上传错误："+o()(t)),this.$emit("error",t)},beforeUpload:function(t){var r=this,n=/image\/\w+/.test(t.type)&&/(jpe?g|png)/i.test(t.type),i=t.size/1024/1024<5,o=t.name.match(/([^\.]+)$/);return o=o?"."+o[1]:"",new a.a(function(e,t){n?i?r.init().then(function(t){r.upload.key=r.dir+Object(u.parseTime)(new Date,"{y}{m}{d}")+"/"+r.random_string()+o,e(!0)}).catch(function(t){r._handlerCatchMsg(t),e(!1)}):(r.$message.error("上传头像图片大小不能超过 5MB!"),t(!1)):(r.$message.error("上传头像图片只能是 JPG/PNG 格式!"),t(!1))})},changeTwocode:function(){var r=this;clearInterval(this.uptimer),Object(s.h)().then(function(t){r.upid=t.data,r.startFetchData();var e="http://"+location.host+"/static/upload.html?len=1&access_token="+r.access_token+"&id="+t.data+"&url="+(window.tms_testapiurl||"");console.log("url:",e),c.a.toDataURL(e,{rendererOpts:{margin:0}}).then(function(t){r.twocodeurl=t})}).catch(function(t){r.$message.error("生成二维码出错了~")})},startFetchData:function(){var r=this;clearInterval(this.uptimer);var t=0;this.uptimer=setInterval(function(){if(57e4<(t+=5e3))return r.$message.info("二维码过期了，已重新生成~"),r.changeTwocode(),!1;Object(s.i)(r.upid).then(function(t){var e=t.data;e&&e.id===r.upid&&e.url&&(clearInterval(r.uptimer),r.showtc=!1,r.emitInput(decodeURIComponent(e.url)))}).catch(function(t){r.$message.info("二维码过期了，请重新扫描上传~")})},5e3)}}}},FUcU:function(t,e,r){"use strict";var n={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"component"},[r("h2",[e._v("上传图片")]),e._v(" "),r("h4",[e._v("默认样式")]),e._v(" "),r("UploadImage",{model:{value:e.url1,callback:function(t){e.url1=t},expression:"url1"}}),e._v(" "),r("h4",[e._v("定义标题")]),e._v(" "),r("UploadImage",{attrs:{title:"法人身份证正面"},model:{value:e.url2,callback:function(t){e.url2=t},expression:"url2"}}),e._v(" "),r("h4",[e._v("定义提示")]),e._v(" "),r("UploadImage",{attrs:{tip:"（有年检章，jpg/png。小于5M）"},model:{value:e.url3,callback:function(t){e.url3=t},expression:"url3"}}),e._v(" "),r("h4",[e._v("定义标题跟提示 + 默认值")]),e._v(" "),r("UploadImage",{attrs:{title:"法人身份证正面",tip:"（有年检章，jpg/png。小于5M）"},on:{success:e.getUrl},model:{value:e.url,callback:function(t){e.url=t},expression:"url"}}),e._v(" "),r("p",[e._v("上传后的链接地址："+e._s(e.url))]),e._v(" "),r("img",{attrs:{src:e.url}}),e._v(" "),r("h4",[e._v("展示预览列表")]),e._v(" "),r("UploadImage",{attrs:{showFileList:"",limit:2,listtype:"picture",tip:""},on:{success:e.getUrl},model:{value:e.url4,callback:function(t){e.url4=t},expression:"url4"}}),e._v(" "),r("p",[e._v("上传后的链接地址："+e._s(JSON.stringify(e.url4)))]),e._v(" "),r("h4",[e._v("二维码上传")]),e._v(" "),r("UploadImage",{staticClass:"twocodeimager",attrs:{twocode:"",tip:""},on:{success:e.getUrl},model:{value:e.url5,callback:function(t){e.url5=t},expression:"url5"}}),e._v(" "),r("blockquote",[e._v("\n    引用地址：\n    components/Upload/singleImage.vue\n  ")]),e._v(" "),r("h3",[e._v("prop")]),e._v(" "),e._m(0),e._v(" "),r("p",[e._v("注意事项：当showFileList为true时，v-model绑定的值为数组类型或者是以英文逗号分隔的图片链接")]),e._v(" "),r("h3",[e._v("event")]),e._v(" "),e._m(1)],1)},staticRenderFns:[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("ul",[r("li",{staticClass:"info-require"},[t._v("v-model"),r("div",{staticClass:"type"},[t._v("String")]),t._v("用来绑定控件的值")]),t._v(" "),r("li",[t._v("title"),r("div",{staticClass:"type"},[t._v("String")]),t._v("标题")]),t._v(" "),r("li",[t._v("tip"),r("div",{staticClass:"type"},[t._v("String")]),t._v("提示信息")]),t._v(" "),r("li",[t._v("showFileList"),r("div",{staticClass:"type"},[t._v("Boolean")]),t._v("是否显示预览图")]),t._v(" "),r("li",[t._v("limit"),r("div",{staticClass:"type"},[t._v("Number")]),t._v("限制上传n张图片")]),t._v(" "),r("li",[t._v("listtype"),r("div",{staticClass:"type"},[t._v("String")]),t._v("展示形式，可取'text', 'picture', 'picture-card' ")])])},function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("ul",[r("li",[r("div",{staticClass:"function"},[t._v("success")]),t._v("返回当前控件的值，如 "),r("pre",[t._v("    'xxxx' // 上传后的链接  \n    ")])])])}]};e.a=n},HMrH:function(t,e,r){"use strict";var n=r("QbVN");e.a={components:{UploadImage:n.a},data:function(){return{url:"",url1:"",url2:"",url3:"",url4:["https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"],url5:""}},methods:{getUrl:function(t){console.log("upload Url:",t)}}}},IJ74:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=r("HMrH"),i=r("FUcU");var o=function(t){r("oVEo")},a=r("VU/8")(n.a,i.a,o,null,null);e.default=a.exports},NV47:function(t,e,r){var n=r("jF+B"),i=new n(512),o=new n(256);!function(){for(var t=1,e=0;e<255;e++)i[e]=t,o[t]=e,256&(t<<=1)&&(t^=285);for(e=255;e<512;e++)i[e]=i[e-255]}(),e.log=function(t){if(t<1)throw new Error("log("+t+")");return o[t]},e.exp=function(t){return i[t]},e.mul=function(t,e){return 0===t||0===e?0:i[o[t]+o[e]]}},"NY/E":function(t,e){var r="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+",n="(?:(?![A-Z0-9 $%*+\\-./:]|"+(r=r.replace(/u/g,"\\u"))+").)+";e.KANJI=new RegExp(r,"g"),e.BYTE_KANJI=new RegExp("[^A-Z0-9 $%*+\\-./:]+","g"),e.BYTE=new RegExp(n,"g"),e.NUMERIC=new RegExp("[0-9]+","g"),e.ALPHANUMERIC=new RegExp("[A-Z $%*+\\-./:]+","g");var i=new RegExp("^"+r+"$"),o=new RegExp("^[0-9]+$"),a=new RegExp("^[A-Z0-9 $%*+\\-./:]+$");e.testKanji=function(t){return i.test(t)},e.testNumeric=function(t){return o.test(t)},e.testAlphanumeric=function(t){return a.test(t)}},QbVN:function(t,e,r){"use strict";var n=r("EPeO"),i=r("jxZV");var o=function(t){r("0Q33"),r("xU5l")},a=r("VU/8")(n.a,i.a,o,"data-v-de7091b2",null);e.a=a.exports},RO0P:function(t,e,r){var n=r("uF9H"),i=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function o(t){this.mode=n.ALPHANUMERIC,this.data=t}o.getBitsLength=function(t){return 11*Math.floor(t/2)+t%2*6},o.prototype.getLength=function(){return this.data.length},o.prototype.getBitsLength=function(){return o.getBitsLength(this.data.length)},o.prototype.write=function(t){var e;for(e=0;e+2<=this.data.length;e+=2){var r=45*i.indexOf(this.data[e]);r+=i.indexOf(this.data[e+1]),t.put(r,11)}this.data.length%2&&t.put(i.indexOf(this.data[e]),6)},t.exports=o},RY9c:function(t,e,r){var n=r("jF+B");function i(t){if(!t||t<1)throw new Error("BitMatrix size must be defined and greater than 0");this.size=t,this.data=new n(t*t),this.data.fill(0),this.reservedBit=new n(t*t),this.reservedBit.fill(0)}i.prototype.set=function(t,e,r,n){var i=t*this.size+e;this.data[i]=r,n&&(this.reservedBit[i]=!0)},i.prototype.get=function(t,e){return this.data[t*this.size+e]},i.prototype.xor=function(t,e,r){this.data[t*this.size+e]^=r},i.prototype.isReserved=function(t,e){return this.reservedBit[t*this.size+e]},t.exports=i},Sd0T:function(t,e,r){var n=r("utyv"),i=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],o=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];e.getBlocksCount=function(t,e){switch(e){case n.L:return i[4*(t-1)+0];case n.M:return i[4*(t-1)+1];case n.Q:return i[4*(t-1)+2];case n.H:return i[4*(t-1)+3];default:return}},e.getTotalCodewordsCount=function(t,e){switch(e){case n.L:return o[4*(t-1)+0];case n.M:return o[4*(t-1)+1];case n.Q:return o[4*(t-1)+2];case n.H:return o[4*(t-1)+3];default:return}}},WEzc:function(t,e,r){var B=r("jF+B"),C=r("oLzS"),o=r("utyv"),s=r("DEuz"),f=r("RY9c"),h=r("9jEu"),d=r("YamF"),g=r("ljsv"),R=r("Sd0T"),I=r("wBZN"),p=r("1Y2G"),u=r("xR/K"),l=r("uF9H"),v=r("nyx9"),m=r("Dsid");function w(t,e,r){var n,i,o=t.size,a=u.getEncodedBits(e,r);for(n=0;n<15;n++)i=1==(a>>n&1),n<6?t.set(n,8,i,!0):n<8?t.set(n+1,8,i,!0):t.set(o-15+n,8,i,!0),n<8?t.set(8,o-n-1,i,!0):n<9?t.set(8,15-n-1+1,i,!0):t.set(8,15-n-1,i,!0);t.set(o-8,8,1,!0)}function y(e,t,r){var n=new s;r.forEach(function(t){n.put(t.mode.bit,4),n.put(t.getLength(),l.getCharCountIndicator(t.mode,e)),t.write(n)});var i=8*(C.getSymbolTotalCodewords(e)-R.getTotalCodewordsCount(e,t));for(n.getLengthInBits()+4<=i&&n.put(0,4);n.getLengthInBits()%8!=0;)n.putBit(0);for(var o=(i-n.getLengthInBits())/8,a=0;a<o;a++)n.put(a%2?17:236,8);return function(t,e,r){for(var n=C.getSymbolTotalCodewords(e),i=R.getTotalCodewordsCount(e,r),o=n-i,a=R.getBlocksCount(e,r),s=a-n%a,u=Math.floor(n/a),l=Math.floor(o/a),c=l+1,f=u-l,h=new I(f),d=0,g=new Array(a),p=new Array(a),v=0,m=new B(t.buffer),w=0;w<a;w++){var y=w<s?l:c;g[w]=m.slice(d,d+y),p[w]=h.encode(g[w]),d+=y,v=Math.max(v,y)}var _,E,b=new B(n),A=0;for(_=0;_<v;_++)for(E=0;E<a;E++)_<g[E].length&&(b[A++]=g[E][_]);for(_=0;_<f;_++)for(E=0;E<a;E++)b[A++]=p[E][_];return b}(n,e,t)}function a(t,e,r,n){var i;if(m(t))i=v.fromArray(t);else{if("string"!=typeof t)throw new Error("Invalid data");var o=e;if(!o){var a=v.rawSplit(t);o=p.getBestVersionForData(a,r)}i=v.fromString(t,o||40)}var s=p.getBestVersionForData(i,r);if(!s)throw new Error("The amount of data is too big to be stored in a QR Code");if(e){if(e<s)throw new Error("\nThe chosen QR Code version cannot contain this amount of data.\nMinimum version required to store current data is: "+s+".\n")}else e=s;var u=y(e,r,i),l=C.getSymbolSize(e),c=new f(l);return function(t,e){for(var r=t.size,n=d.getPositions(e),i=0;i<n.length;i++)for(var o=n[i][0],a=n[i][1],s=-1;s<=7;s++)if(!(o+s<=-1||r<=o+s))for(var u=-1;u<=7;u++)a+u<=-1||r<=a+u||(0<=s&&s<=6&&(0===u||6===u)||0<=u&&u<=6&&(0===s||6===s)||2<=s&&s<=4&&2<=u&&u<=4?t.set(o+s,a+u,!0,!0):t.set(o+s,a+u,!1,!0))}(c,e),function(t){for(var e=t.size,r=8;r<e-8;r++){var n=r%2==0;t.set(r,6,n,!0),t.set(6,r,n,!0)}}(c),function(t,e){for(var r=h.getPositions(e),n=0;n<r.length;n++)for(var i=r[n][0],o=r[n][1],a=-2;a<=2;a++)for(var s=-2;s<=2;s++)-2===a||2===a||-2===s||2===s||0===a&&0===s?t.set(i+a,o+s,!0,!0):t.set(i+a,o+s,!1,!0)}(c,e),w(c,r,0),7<=e&&function(t,e){for(var r,n,i,o=t.size,a=p.getEncodedBits(e),s=0;s<18;s++)r=Math.floor(s/3),n=s%3+o-8-3,i=1==(a>>s&1),t.set(r,n,i,!0),t.set(n,r,i,!0)}(c,e),function(t,e){for(var r=t.size,n=-1,i=r-1,o=7,a=0,s=r-1;0<s;s-=2)for(6===s&&s--;;){for(var u=0;u<2;u++)if(!t.isReserved(i,s-u)){var l=!1;a<e.length&&(l=1==(e[a]>>>o&1)),t.set(i,s-u,l),-1==--o&&(a++,o=7)}if((i+=n)<0||r<=i){i-=n,n=-n;break}}}(c,u),isNaN(n)&&(n=g.getBestMask(c,w.bind(null,c,r))),g.applyMask(n,c),w(c,r,n),{modules:c,version:e,errorCorrectionLevel:r,maskPattern:n,segments:i}}e.create=function(t,e){if(void 0===t||""===t)throw new Error("No input text");var r,n,i=o.M;return void 0!==e&&(i=o.from(e.errorCorrectionLevel,o.M),r=p.from(e.version),n=g.from(e.maskPattern),e.toSJISFunc&&C.setToSJISFunction(e.toSJISFunc)),a(t,r,i,n)}},X0RI:function(t,n,e){var a=e("jF+B"),s=e("NV47");n.mul=function(t,e){var r=new a(t.length+e.length-1);r.fill(0);for(var n=0;n<t.length;n++)for(var i=0;i<e.length;i++)r[n+i]^=s.mul(t[n],e[i]);return r},n.mod=function(t,e){for(var r=new a(t);0<=r.length-e.length;){for(var n=r[0],i=0;i<e.length;i++)r[i]^=s.mul(e[i],n);for(var o=0;o<r.length&&0===r[o];)o++;r=r.slice(o)}return r},n.generateECPolynomial=function(t){for(var e=new a([1]),r=0;r<t;r++)e=n.mul(e,[1,s.exp(r)]);return e}},YamF:function(t,e,r){var n=r("oLzS").getSymbolSize;e.getPositions=function(t){var e=n(t);return[[0,0],[e-7,0],[0,e-7]]}},"b2+w":function(t,e,r){"use strict";var g={single_source_shortest_paths:function(t,e,r){var n={},i={};i[e]=0;var o,a,s,u,l,c,f,h=g.PriorityQueue.make();for(h.push(e,0);!h.empty();)for(s in a=(o=h.pop()).value,u=o.cost,l=t[a]||{})l.hasOwnProperty(s)&&(c=u+l[s],f=i[s],(void 0===i[s]||c<f)&&(i[s]=c,h.push(s,c),n[s]=a));if(void 0!==r&&void 0===i[r]){var d=["Could not find a path from ",e," to ",r,"."].join("");throw new Error(d)}return n},extract_shortest_path_from_predecessor_list:function(t,e){for(var r=[],n=e;n;)r.push(n),t[n],n=t[n];return r.reverse(),r},find_path:function(t,e,r){var n=g.single_source_shortest_paths(t,e,r);return g.extract_shortest_path_from_predecessor_list(n,r)},PriorityQueue:{make:function(t){var e,r=g.PriorityQueue,n={};for(e in t=t||{},r)r.hasOwnProperty(e)&&(n[e]=r[e]);return n.queue=[],n.sorter=t.sorter||r.default_sorter,n},default_sorter:function(t,e){return t.cost-e.cost},push:function(t,e){var r={value:t,cost:e};this.queue.push(r),this.queue.sort(this.sorter)},pop:function(){return this.queue.shift()},empty:function(){return 0===this.queue.length}}};t.exports=g},"jF+B":function(t,e,r){"use strict";var a=r("Dsid");var n=(s.TYPED_ARRAY_SUPPORT=function(){try{var t=new Uint8Array(1);return t.__proto__={__proto__:Uint8Array.prototype,foo:function(){return 42}},42===t.foo()}catch(t){return!1}}())?2147483647:1073741823;function s(t,e,r){return s.TYPED_ARRAY_SUPPORT||this instanceof s?"number"==typeof t?l(this,t):function(t,e,r,n){if("number"==typeof e)throw new TypeError('"value" argument must not be a number');if("undefined"!=typeof ArrayBuffer&&e instanceof ArrayBuffer)return function(t,e,r,n){if(r<0||e.byteLength<r)throw new RangeError("'offset' is out of bounds");if(e.byteLength<r+(n||0))throw new RangeError("'length' is out of bounds");var i;i=void 0===r&&void 0===n?new Uint8Array(e):void 0===n?new Uint8Array(e,r):new Uint8Array(e,r,n);s.TYPED_ARRAY_SUPPORT?i.__proto__=s.prototype:i=c(t,i);return i}(t,e,r,n);if("string"==typeof e)return function(t,e){var r=0|h(e),n=u(t,r),i=n.write(e);i!==r&&(n=n.slice(0,i));return n}(t,e);return function(t,e){if(s.isBuffer(e)){var r=0|o(e.length),n=u(t,r);return 0===n.length||e.copy(n,0,0,r),n}if(e){if("undefined"!=typeof ArrayBuffer&&e.buffer instanceof ArrayBuffer||"length"in e)return"number"!=typeof e.length||(i=e.length)!=i?u(t,0):c(t,e);if("Buffer"===e.type&&Array.isArray(e.data))return c(t,e.data)}var i;throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")}(t,e)}(this,t,e,r):new s(t,e,r)}function o(t){if(n<=t)throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+n.toString(16)+" bytes");return 0|t}function u(t,e){var r;return s.TYPED_ARRAY_SUPPORT?(r=new Uint8Array(e)).__proto__=s.prototype:(null===(r=t)&&(r=new s(e)),r.length=e),r}function l(t,e){var r=u(t,e<0?0:0|o(e));if(!s.TYPED_ARRAY_SUPPORT)for(var n=0;n<e;++n)r[n]=0;return r}function c(t,e){for(var r=e.length<0?0:0|o(e.length),n=u(t,r),i=0;i<r;i+=1)n[i]=255&e[i];return n}function f(t,e){var r;e=e||1/0;for(var n=t.length,i=null,o=[],a=0;a<n;++a){if(55295<(r=t.charCodeAt(a))&&r<57344){if(!i){if(56319<r){-1<(e-=3)&&o.push(239,191,189);continue}if(a+1===n){-1<(e-=3)&&o.push(239,191,189);continue}i=r;continue}if(r<56320){-1<(e-=3)&&o.push(239,191,189),i=r;continue}r=65536+(i-55296<<10|r-56320)}else i&&-1<(e-=3)&&o.push(239,191,189);if(i=null,r<128){if((e-=1)<0)break;o.push(r)}else if(r<2048){if((e-=2)<0)break;o.push(r>>6|192,63&r|128)}else if(r<65536){if((e-=3)<0)break;o.push(r>>12|224,r>>6&63|128,63&r|128)}else{if(!(r<1114112))throw new Error("Invalid code point");if((e-=4)<0)break;o.push(r>>18|240,r>>12&63|128,r>>6&63|128,63&r|128)}}return o}function h(t){return s.isBuffer(t)?t.length:"undefined"!=typeof ArrayBuffer&&"function"==typeof ArrayBuffer.isView&&(ArrayBuffer.isView(t)||t instanceof ArrayBuffer)?t.byteLength:("string"!=typeof t&&(t=""+t),0===t.length?0:f(t).length)}s.TYPED_ARRAY_SUPPORT&&(s.prototype.__proto__=Uint8Array.prototype,s.__proto__=Uint8Array,"undefined"!=typeof Symbol&&Symbol.species&&s[Symbol.species]===s&&Object.defineProperty(s,Symbol.species,{value:null,configurable:!0,enumerable:!1,writable:!1})),s.prototype.write=function(t,e,r){void 0===e?(r=this.length,e=0):void 0===r&&"string"==typeof e?(r=this.length,e=0):isFinite(e)&&(e|=0,isFinite(r)?r|=0:r=void 0);var n,i,o,a=this.length-e;if((void 0===r||a<r)&&(r=a),0<t.length&&(r<0||e<0)||e>this.length)throw new RangeError("Attempt to write outside buffer bounds");return i=e,o=r,function(t,e,r,n){for(var i=0;i<n&&!(i+r>=e.length||i>=t.length);++i)e[i+r]=t[i];return i}(f(t,(n=this).length-i),n,i,o)},s.prototype.slice=function(t,e){var r,n=this.length;if((t=~~t)<0?(t+=n)<0&&(t=0):n<t&&(t=n),(e=void 0===e?n:~~e)<0?(e+=n)<0&&(e=0):n<e&&(e=n),e<t&&(e=t),s.TYPED_ARRAY_SUPPORT)(r=this.subarray(t,e)).__proto__=s.prototype;else{var i=e-t;r=new s(i,void 0);for(var o=0;o<i;++o)r[o]=this[o+t]}return r},s.prototype.copy=function(t,e,r,n){if(r||(r=0),n||0===n||(n=this.length),e>=t.length&&(e=t.length),e||(e=0),0<n&&n<r&&(n=r),n===r)return 0;if(0===t.length||0===this.length)return 0;if(e<0)throw new RangeError("targetStart out of bounds");if(r<0||r>=this.length)throw new RangeError("sourceStart out of bounds");if(n<0)throw new RangeError("sourceEnd out of bounds");n>this.length&&(n=this.length),t.length-e<n-r&&(n=t.length-e+r);var i,o=n-r;if(this===t&&r<e&&e<n)for(i=o-1;0<=i;--i)t[i+e]=this[i+r];else if(o<1e3||!s.TYPED_ARRAY_SUPPORT)for(i=0;i<o;++i)t[i+e]=this[i+r];else Uint8Array.prototype.set.call(t,this.subarray(r,r+o),e);return o},s.prototype.fill=function(t,e,r){if("string"==typeof t){if("string"==typeof e?(e=0,r=this.length):"string"==typeof r&&(r=this.length),1===t.length){var n=t.charCodeAt(0);n<256&&(t=n)}}else"number"==typeof t&&(t&=255);if(e<0||this.length<e||this.length<r)throw new RangeError("Out of range index");if(r<=e)return this;var i;if(e>>>=0,r=void 0===r?this.length:r>>>0,t||(t=0),"number"==typeof t)for(i=e;i<r;++i)this[i]=t;else{var o=s.isBuffer(t)?t:new s(t),a=o.length;for(i=0;i<r-e;++i)this[i+e]=o[i%a]}return this},s.concat=function(t,e){if(!a(t))throw new TypeError('"list" argument must be an Array of Buffers');if(0===t.length)return u(null,0);var r;if(void 0===e)for(r=e=0;r<t.length;++r)e+=t[r].length;var n=l(null,e),i=0;for(r=0;r<t.length;++r){var o=t[r];if(!s.isBuffer(o))throw new TypeError('"list" argument must be an Array of Buffers');o.copy(n,i),i+=o.length}return n},s.byteLength=h,s.prototype._isBuffer=!0,s.isBuffer=function(t){return!(null==t||!t._isBuffer)},t.exports=s},jxZV:function(t,e,r){"use strict";var n={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"upload-container",class:{uploadlist:e.showFileList}},[e.uploadUrl?r("el-upload",{staticClass:"image-uploader",attrs:{data:e.upload,action:e.uploadUrl,multiple:!1,drag:!e.showFileList,"show-file-list":e.showFileList,"file-list":e.filelist,limit:e.limit,"before-upload":e.beforeUpload,"list-type":e.listtype,"on-exceed":e.onexceed,disabled:e.disabled,"on-remove":e.handleRemove,"on-error":e.handleError,"on-success":e.handleImageScucess}},[e._t("content",[e.showtc?r("div",{staticClass:"twocodebox",on:{click:function(t){t.stopPropagation(),t.preventDefault()},mouseover:function(t){e.showtwocdetip=!0},mouseout:function(t){e.showtwocdetip=!1}}},[r("div",[r("img",{attrs:{src:e.twocodeurl,alt:""}})]),e._v(" "),r("el-button",{attrs:{size:e.size,type:"primary"},on:{click:function(t){e.showtc=!1}}},[e._v("本地上传")]),e._v(" "),r("el-button",{attrs:{size:e.size,type:"primary"},on:{click:e.changeTwocode}},[e._v("更换二维码")])],1):r("div",[e.title&&!e.showFileList?r("div",{staticClass:"upload__title"},[e._v(e._s(e.title))]):e._e(),e._v(" "),r("el-button",{attrs:{size:e.size,type:"primary"}},[e._v("点击上传")]),e._v(" "),e.twocode?r("el-button",{staticClass:"uploadtwocode",attrs:{size:e.size,type:"primary"},on:{click:function(t){t.stopPropagation(),t.preventDefault(),e.showtc=!0}}},[e._v("二维码上传")]):e._e(),e._v(" "),e.showFileList?e._e():r("div",{staticClass:"el-upload__text"},[e._v("将文件拖拽到此区域")]),e._v(" "),e.tip?r("div",{staticClass:"upload__tip"},[e._v(e._s(e.tip))]):e._e()],1)])],2):e._e(),e._v(" "),e.imageUrl&&!e.showFileList?r("div",{staticClass:"image-preview"},[r("div",{staticClass:"image-preview-wrapper"},[r("img",{attrs:{src:e.imageUrl}}),e._v(" "),r("div",{staticClass:"image-preview-action"},[r("i",{staticClass:"el-icon-delete",on:{click:function(t){e.rmImage(e.imageUrl)}}})])])]):e._e()],1)},staticRenderFns:[]};e.a=n},ljsv:function(t,s){s.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};var c=3,a=3,u=40,i=10;function o(t,e,r){switch(t){case s.Patterns.PATTERN000:return(e+r)%2==0;case s.Patterns.PATTERN001:return e%2==0;case s.Patterns.PATTERN010:return r%3==0;case s.Patterns.PATTERN011:return(e+r)%3==0;case s.Patterns.PATTERN100:return(Math.floor(e/2)+Math.floor(r/3))%2==0;case s.Patterns.PATTERN101:return e*r%2+e*r%3==0;case s.Patterns.PATTERN110:return(e*r%2+e*r%3)%2==0;case s.Patterns.PATTERN111:return(e*r%3+(e+r)%2)%2==0;default:throw new Error("bad maskPattern:"+t)}}s.isValid=function(t){return null!=t&&""!==t&&!isNaN(t)&&0<=t&&t<=7},s.from=function(t){return s.isValid(t)?parseInt(t,10):void 0},s.getPenaltyN1=function(t){for(var e=t.size,r=0,n=0,i=0,o=null,a=null,s=0;s<e;s++){n=i=0,o=a=null;for(var u=0;u<e;u++){var l=t.get(s,u);l===o?n++:(5<=n&&(r+=c+(n-5)),o=l,n=1),(l=t.get(u,s))===a?i++:(5<=i&&(r+=c+(i-5)),a=l,i=1)}5<=n&&(r+=c+(n-5)),5<=i&&(r+=c+(i-5))}return r},s.getPenaltyN2=function(t){for(var e=t.size,r=0,n=0;n<e-1;n++)for(var i=0;i<e-1;i++){var o=t.get(n,i)+t.get(n,i+1)+t.get(n+1,i)+t.get(n+1,i+1);4!==o&&0!==o||r++}return r*a},s.getPenaltyN3=function(t){for(var e=t.size,r=0,n=0,i=0,o=0;o<e;o++){n=i=0;for(var a=0;a<e;a++)n=n<<1&2047|t.get(o,a),10<=a&&(1488===n||93===n)&&r++,i=i<<1&2047|t.get(a,o),10<=a&&(1488===i||93===i)&&r++}return r*u},s.getPenaltyN4=function(t){for(var e=0,r=t.data.length,n=0;n<r;n++)e+=t.data[n];return Math.abs(Math.ceil(100*e/r/5)-10)*i},s.applyMask=function(t,e){for(var r=e.size,n=0;n<r;n++)for(var i=0;i<r;i++)e.isReserved(i,n)||e.xor(i,n,o(t,i,n))},s.getBestMask=function(t,e){for(var r=Object.keys(s.Patterns).length,n=0,i=1/0,o=0;o<r;o++){e(o),s.applyMask(o,t);var a=s.getPenaltyN1(t)+s.getPenaltyN2(t)+s.getPenaltyN3(t)+s.getPenaltyN4(t);s.applyMask(o,t),a<i&&(i=a,n=o)}return n}},mulC:function(e,t,r){"use strict";(function(t){e.exports="object"==typeof self&&self.self===self&&self||"object"==typeof t&&t.global===t&&t||this}).call(t,r("DuR2"))},mwnW:function(t,e,r){"use strict";var n=r("mulC");t.exports=function(){return"function"==typeof n.Promise&&"function"==typeof n.Promise.prototype.then}},nwDn:function(t,d){function i(t){if("string"!=typeof t)throw new Error("Color should be defined as hex string");var e=t.slice().replace("#","").split("");if(e.length<3||5===e.length||8<e.length)throw new Error("Invalid hex color: "+t);3!==e.length&&4!==e.length||(e=Array.prototype.concat.apply([],e.map(function(t){return[t,t]}))),6===e.length&&e.push("F","F");var r=parseInt(e.join(""),16);return{r:r>>24&255,g:r>>16&255,b:r>>8&255,a:255&r,hex:"#"+e.slice(0,6).join("")}}d.getOptions=function(t){t||(t={}),t.color||(t.color={});var e=void 0===t.margin||null===t.margin||t.margin<0?4:t.margin,r=t.width&&21<=t.width?t.width:void 0,n=t.scale||4;return{width:r,scale:r?4:n,margin:e,color:{dark:i(t.color.dark||"#000000ff"),light:i(t.color.light||"#ffffffff")},type:t.type,rendererOpts:t.rendererOpts||{}}},d.getScale=function(t,e){return e.width&&e.width>=t+2*e.margin?e.width/(t+2*e.margin):e.scale},d.getImageWidth=function(t,e){var r=d.getScale(t,e);return Math.floor((t+2*e.margin)*r)},d.qrToImageData=function(t,e,r){for(var n=e.modules.size,i=e.modules.data,o=d.getScale(n,r),a=Math.floor((n+2*r.margin)*o),s=r.margin*o,u=[r.color.light,r.color.dark],l=0;l<a;l++)for(var c=0;c<a;c++){var f=4*(l*a+c),h=r.color.light;if(s<=l&&s<=c&&l<a-s&&c<a-s)h=u[i[Math.floor((l-s)/o)*n+Math.floor((c-s)/o)]?1:0];t[f++]=h.r,t[f++]=h.g,t[f++]=h.b,t[f]=h.a}}},nyx9:function(t,a,e){var d=e("uF9H"),i=e("sYKs"),o=e("RO0P"),s=e("vPzN"),u=e("zYqW"),l=e("NY/E"),c=e("oLzS"),f=e("b2+w");function h(t){return unescape(encodeURIComponent(t)).length}function g(t,e,r){for(var n,i=[];null!==(n=t.exec(r));)i.push({data:n[0],index:n.index,mode:e,length:n[0].length});return i}function p(t){var e,r,n=g(l.NUMERIC,d.NUMERIC,t),i=g(l.ALPHANUMERIC,d.ALPHANUMERIC,t);return c.isKanjiModeEnabled()?(e=g(l.BYTE,d.BYTE,t),r=g(l.KANJI,d.KANJI,t)):(e=g(l.BYTE_KANJI,d.BYTE,t),r=[]),n.concat(i,e,r).sort(function(t,e){return t.index-e.index}).map(function(t){return{data:t.data,mode:t.mode,length:t.length}})}function v(t,e){switch(e){case d.NUMERIC:return i.getBitsLength(t);case d.ALPHANUMERIC:return o.getBitsLength(t);case d.KANJI:return u.getBitsLength(t);case d.BYTE:return s.getBitsLength(t)}}function r(t,e){var r,n=d.getBestModeForData(t);if((r=d.from(e,n))!==d.BYTE&&r.bit<n.bit)throw new Error('"'+t+'" cannot be encoded with mode '+d.toString(r)+".\n Suggested mode is: "+d.toString(n));switch(r!==d.KANJI||c.isKanjiModeEnabled()||(r=d.BYTE),r){case d.NUMERIC:return new i(t);case d.ALPHANUMERIC:return new o(t);case d.KANJI:return new u(t);case d.BYTE:return new s(t)}}a.fromArray=function(t){return t.reduce(function(t,e){return"string"==typeof e?t.push(r(e,null)):e.data&&t.push(r(e.data,e.mode)),t},[])},a.fromString=function(t,e){for(var r=function(t,e){for(var r={},n={start:{}},i=["start"],o=0;o<t.length;o++){for(var a=t[o],s=[],u=0;u<a.length;u++){var l=a[u],c=""+o+u;s.push(c),r[c]={node:l,lastCount:0},n[c]={};for(var f=0;f<i.length;f++){var h=i[f];r[h]&&r[h].node.mode===l.mode?(n[h][c]=v(r[h].lastCount+l.length,l.mode)-v(r[h].lastCount,l.mode),r[h].lastCount+=l.length):(r[h]&&(r[h].lastCount=l.length),n[h][c]=v(l.length,l.mode)+4+d.getCharCountIndicator(l.mode,e))}}i=s}for(f=0;f<i.length;f++)n[i[f]].end=0;return{map:n,table:r}}(function(t){for(var e=[],r=0;r<t.length;r++){var n=t[r];switch(n.mode){case d.NUMERIC:e.push([n,{data:n.data,mode:d.ALPHANUMERIC,length:n.length},{data:n.data,mode:d.BYTE,length:n.length}]);break;case d.ALPHANUMERIC:e.push([n,{data:n.data,mode:d.BYTE,length:n.length}]);break;case d.KANJI:e.push([n,{data:n.data,mode:d.BYTE,length:h(n.data)}]);break;case d.BYTE:e.push([{data:n.data,mode:d.BYTE,length:h(n.data)}])}}return e}(p(t,c.isKanjiModeEnabled())),e),n=f.find_path(r.map,"start","end"),i=[],o=1;o<n.length-1;o++)i.push(r.table[n[o]].node);return a.fromArray(i.reduce(function(t,e){var r=0<=t.length-1?t[t.length-1]:null;return r&&r.mode===e.mode?t[t.length-1].data+=e.data:t.push(e),t},[]))},a.rawSplit=function(t){return a.fromArray(p(t,c.isKanjiModeEnabled()))}},oLzS:function(t,e){var r,n=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];e.getSymbolSize=function(t){if(!t)throw new Error('"version" cannot be null or undefined');if(t<1||40<t)throw new Error('"version" should be in range from 1 to 40');return 4*t+17},e.getSymbolTotalCodewords=function(t){return n[t]},e.getBCHDigit=function(t){for(var e=0;0!==t;)e++,t>>>=1;return e},e.setToSJISFunction=function(t){if("function"!=typeof t)throw new Error('"toSJISFunc" is not a valid function.');r=t},e.isKanjiModeEnabled=function(){return void 0!==r},e.toSJIS=function(t){return r(t)}},oVEo:function(t,e){},sYKs:function(t,e,r){var n=r("uF9H");function i(t){this.mode=n.NUMERIC,this.data=t.toString()}i.getBitsLength=function(t){return 10*Math.floor(t/3)+(t%3?t%3*3+1:0)},i.prototype.getLength=function(){return this.data.length},i.prototype.getBitsLength=function(){return i.getBitsLength(this.data.length)},i.prototype.write=function(t){var e,r,n;for(e=0;e+3<=this.data.length;e+=3)r=this.data.substr(e,3),n=parseInt(r,10),t.put(n,10);var i=this.data.length-e;0<i&&(r=this.data.substr(e),n=parseInt(r,10),t.put(n,3*i+1))},t.exports=i},uF9H:function(t,r,e){var n=e("yYhy"),i=e("NY/E");r.NUMERIC={id:"Numeric",bit:1,ccBits:[10,12,14]},r.ALPHANUMERIC={id:"Alphanumeric",bit:2,ccBits:[9,11,13]},r.BYTE={id:"Byte",bit:4,ccBits:[8,16,16]},r.KANJI={id:"Kanji",bit:8,ccBits:[8,10,12]},r.MIXED={bit:-1},r.getCharCountIndicator=function(t,e){if(!t.ccBits)throw new Error("Invalid mode: "+t);if(!n.isValid(e))throw new Error("Invalid version: "+e);return 1<=e&&e<10?t.ccBits[0]:e<27?t.ccBits[1]:t.ccBits[2]},r.getBestModeForData=function(t){return i.testNumeric(t)?r.NUMERIC:i.testAlphanumeric(t)?r.ALPHANUMERIC:i.testKanji(t)?r.KANJI:r.BYTE},r.toString=function(t){if(t&&t.id)return t.id;throw new Error("Invalid mode")},r.isValid=function(t){return t&&t.bit&&t.ccBits},r.from=function(t,e){if(r.isValid(t))return t;try{return function(t){if("string"!=typeof t)throw new Error("Param is not a string");switch(t.toLowerCase()){case"numeric":return r.NUMERIC;case"alphanumeric":return r.ALPHANUMERIC;case"kanji":return r.KANJI;case"byte":return r.BYTE;default:throw new Error("Unknown mode: "+t)}}(t)}catch(t){return e}}},utyv:function(t,r){r.L={bit:1},r.M={bit:0},r.Q={bit:3},r.H={bit:2},r.isValid=function(t){return t&&void 0!==t.bit&&0<=t.bit&&t.bit<4},r.from=function(t,e){if(r.isValid(t))return t;try{return function(t){if("string"!=typeof t)throw new Error("Param is not a string");switch(t.toLowerCase()){case"l":case"low":return r.L;case"m":case"medium":return r.M;case"q":case"quartile":return r.Q;case"h":case"high":return r.H;default:throw new Error("Unknown EC Level: "+t)}}(t)}catch(t){return e}}},vPzN:function(t,e,r){var n=r("jF+B"),i=r("uF9H");function o(t){this.mode=i.BYTE,this.data=new n(t)}o.getBitsLength=function(t){return 8*t},o.prototype.getLength=function(){return this.data.length},o.prototype.getBitsLength=function(){return o.getBitsLength(this.data.length)},o.prototype.write=function(t){for(var e=0,r=this.data.length;e<r;e++)t.put(this.data[e],8)},t.exports=o},wBZN:function(t,e,r){var a=r("jF+B"),s=r("X0RI");function n(t){this.genPoly=void 0,this.degree=t,this.degree&&this.initialize(this.degree)}n.prototype.initialize=function(t){this.degree=t,this.genPoly=s.generateECPolynomial(this.degree)},n.prototype.encode=function(t){if(!this.genPoly)throw new Error("Encoder not initialized");var e=new a(this.degree);e.fill(0);var r=a.concat([t,e],t.length+this.degree),n=s.mod(r,this.genPoly),i=this.degree-n.length;if(0<i){var o=new a(this.degree);return o.fill(0),n.copy(o,i),o}return n},t.exports=n},"xR/K":function(t,e,r){var i=r("oLzS"),o=i.getBCHDigit(1335);e.getEncodedBits=function(t,e){for(var r=t.bit<<3|e,n=r<<10;0<=i.getBCHDigit(n)-o;)n^=1335<<i.getBCHDigit(n)-o;return 21522^(r<<10|n)}},xU5l:function(t,e){},yYhy:function(t,e){e.isValid=function(t){return!isNaN(t)&&1<=t&&t<=40}},zYqW:function(t,e,r){var n=r("uF9H"),i=r("oLzS");function o(t){this.mode=n.KANJI,this.data=t}o.getBitsLength=function(t){return 13*t},o.prototype.getLength=function(){return this.data.length},o.prototype.getBitsLength=function(){return o.getBitsLength(this.data.length)},o.prototype.write=function(t){var e;for(e=0;e<this.data.length;e++){var r=i.toSJIS(this.data[e]);if(33088<=r&&r<=40956)r-=33088;else{if(!(57408<=r&&r<=60351))throw new Error("Invalid SJIS character: "+this.data[e]+"\nMake sure your charset is UTF-8");r-=49472}r=192*(r>>>8&255)+(255&r),t.put(r,13)}},t.exports=o}});
//# sourceMappingURL=40.3097a5e0d7113f782985.js.map