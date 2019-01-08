 import {
   getSummaries,
   objectMerge2
 } from './index'
 // 阿拉伯数字转中文大写
 import {
   smalltoBIG
 } from '@/filters/'
 import {
   tmsMath,
   parseTime
 } from '@/utils/'
 import {
   getUserInfo
 } from '@/utils/auth'
 import {
   getPrintSetting
 } from '@/api/operation/print'

 // import ExportJsonExcel from 'js-export-excel'
 //  const ExportJsonExcel = require('js-export-excel')
 //  const ExportJsonExcel = require('./excel')
 const ExportJsonExcel2 = require('./exceljs.min')
 const FileSaver = require('./fileSaver')

 //  console.log('ExportJsonExcel:', ExportJsonExcel)

 var CreatedOKLodop7766 = null
 var createTableComplate = false
 // var downloadPath = 'http://www.lodop.net/download/CLodop_Setup_for_Win64NT_3.046Extend.zip'
 // const downloadPath = 'https://aflc.oss-cn-shenzhen.aliyuncs.com/plugin/tms_web_plugin.rar'
 const downloadPath = 'https://aflc.oss-cn-shenzhen.aliyuncs.com/plugin/28tms_win32_cLodop_20180821.exe'
 // 打印回调
 var TaskID, TaskID1, TaskID2, P_ID = '',
   loop = 0,
   waiting = false
 // ====判断是否需要安装CLodop云打印服务器:====
 export function needCLodop() {
   try {
     var ua = navigator.userAgent
     if (ua.match(/Windows\sPhone/i) != null) return true
     if (ua.match(/iPhone|iPod/i) != null) return true
     if (ua.match(/Android/i) != null) return true
     if (ua.match(/Edge\D?\d+/i) != null) return true

     var verTrident = ua.match(/Trident\D?\d+/i)
     var verIE = ua.match(/MSIE\D?\d+/i)
     var verOPR = ua.match(/OPR\D?\d+/i)
     var verFF = ua.match(/Firefox\D?\d+/i)
     var x64 = ua.match(/x64/i)
     if ((verTrident == null) && (verIE == null) && (x64 !== null)) {
       return true
     } else
     if (verFF !== null) {
       verFF = verFF[0].match(/\d+/)
       if ((verFF[0] >= 41) || (x64 !== null)) return true
     } else
     if (verOPR !== null) {
       verOPR = verOPR[0].match(/\d+/)
       if (verOPR[0] >= 32) return true
     } else
     if ((verTrident == null) && (verIE == null)) {
       var verChrome = ua.match(/Chrome\D?\d+/i)
       if (verChrome !== null) {
         verChrome = verChrome[0].match(/\d+/)
         if (verChrome[0] >= 41) return true
       }
     }
     return false
   } catch (err) {
     return true
   }
 }

 // ====页面引用CLodop云打印必须的JS文件：====
 if (needCLodop()) {
   var head = document.head || document.getElementsByTagName('head')[0] || document.documentElement
   var oscript = document.createElement('script')
   oscript.src = 'http://localhost:8000/CLodopfuncs.js?priority=1'
   head.insertBefore(oscript, head.firstChild)

   // 引用双端口(8000和18000）避免其中某个被占用：
   oscript = document.createElement('script')
   oscript.src = 'http://localhost:18000/CLodopfuncs.js?priority=0'
   head.insertBefore(oscript, head.firstChild)
 }
 // ====获取LODOP对象的主过程：====
 export function getLodop(oOBJECT, oEMBED) {
   console.log('getLodop:<=')
   // var strHtmInstall = "<br><p color='#FF00FF'>打印控件未安装!点击这里<a href='"+ downloadPath+"' target='_self'>执行安装</a>,安装后请刷新页面或重新进入。</p>";
   // var strHtmUpdate = "<br><p color='#FF00FF'>打印控件需要升级!点击这里<a href='"+ downloadPath+"' target='_self'>执行升级</a>,升级后请重新进入。</p>";
   // var strHtm64_Install = "<br><p color='#FF00FF'>打印控件未安装!点击这里<a href='"+ downloadPath+"' target='_self'>执行安装</a>,安装后请刷新页面或重新进入。</p>";
   // var strHtm64_Update = "<br><p color='#FF00FF'>打印控件需要升级!点击这里<a href='"+ downloadPath+"' target='_self'>执行升级</a>,升级后请重新进入。</p>";
   // var strHtmFireFox = "<br><br><p color='#FF00FF'>（注意：如曾安装过Lodop旧版附件npActiveXPLugin,请在【工具】->【附加组件】->【扩展】中先卸它）</p>";
   // var strHtmChrome = "<br><br><p color='#FF00FF'>(如果此前正常，仅因浏览器升级或重安装而出问题，需重新执行以上安装）</p>";
   // var strCLodopInstall = "<br><p color='#FF00FF'>CLodop云打印服务(localhost本地)未安装启动!点击这里<a href='"+ downloadPath+"' target='_self'>执行安装</a>,安装后请刷新页面。</p>";
   // var strCLodopUpdate = "<br><p color='#FF00FF'>CLodop云打印服务需升级!点击这里<a href='"+ downloadPath+"' target='_self'>执行升级</a>,升级后请刷新页面。</p>";
   var strHtmInstall = "<br><font color='#FF00FF'>打印控件未安装!点击这里<a href='install_lodop32.exe' target='_self'>执行安装</a>,安装后请刷新页面或重新进入。</font>"
   var strHtmUpdate = "<br><font color='#FF00FF'>打印控件需要升级!点击这里<a href='install_lodop32.exe' target='_self'>执行升级</a>,升级后请重新进入。</font>"
   var strHtm64_Install = "<br><font color='#FF00FF'>打印控件未安装!点击这里<a href='install_lodop64.exe' target='_self'>执行安装</a>,安装后请刷新页面或重新进入。</font>"
   var strHtm64_Update = "<br><font color='#FF00FF'>打印控件需要升级!点击这里<a href='install_lodop64.exe' target='_self'>执行升级</a>,升级后请重新进入。</font>"
   var strHtmFireFox = "<br><br><font color='#FF00FF'>（注意：如曾安装过Lodop旧版附件npActiveXPLugin,请在【工具】->【附加组件】->【扩展】中先卸它）</font>"
   var strHtmChrome = "<br><br><font color='#FF00FF'>(如果此前正常，仅因浏览器升级或重安装而出问题，需重新执行以上安装）</font>"
   var strCLodopInstall = "<br><font color='#FF00FF'>CLodop云打印服务(localhost本地)未安装启动!点击这里<a href='CLodop_Setup_for_Win32NT.exe' target='_self'>执行安装</a>,安装后请刷新页面。</font>"
   var strCLodopUpdate = "<br><font color='#FF00FF'>CLodop云打印服务需升级!点击这里<a href='CLodop_Setup_for_Win32NT.exe' target='_self'>执行升级</a>,升级后请刷新页面。</font>"
   let LODOP
   try {
     var isIE = (navigator.userAgent.indexOf('MSIE') >= 0) || (navigator.userAgent.indexOf('Trident') >= 0)
     if (needCLodop()) {
       try {
         LODOP = getCLodop()
       } catch (err) {}
       if (!LODOP && document.readyState !== 'complete') {
         alert('C-Lodop没准备好，请稍后再试！')
         return
       }
       if (!LODOP) {
         if (isIE) document.write(strCLodopInstall)
         else {
           var conf = confirm('没有安装LODOP云打印插件,确认下载？')
         }
         if (conf) {
           window.open(downloadPath)
         }
         // document.body.innerHTML = strCLodopInstall + document.body.innerHTML;
         return false
       } else {
         if (CLODOP.CVERSION < '3.0.4.3') {
           if (isIE) document.write(strCLodopUpdate)
           else {
             document.body.innerHTML = strCLodopUpdate + document.body.innerHTML
           }
         }
         if (oEMBED && oEMBED.parentNode) oEMBED.parentNode.removeChild(oEMBED)
         if (oOBJECT && oOBJECT.parentNode) oOBJECT.parentNode.removeChild(oOBJECT)
       }
     } else {
       var is64IE = isIE && (navigator.userAgent.indexOf('x64') >= 0)
       // =====如果页面有Lodop就直接使用，没有则新建:==========
       if (oOBJECT != undefined || oEMBED != undefined) {
         if (isIE) LODOP = oOBJECT
         else LODOP = oEMBED
       } else if (CreatedOKLodop7766 == null) {
         LODOP = document.createElement('object')
         LODOP.setAttribute('width', 0)
         LODOP.setAttribute('height', 0)
         LODOP.setAttribute('style', 'position:absolute;left:0px;top:-100px;width:0px;height:0px;')
         if (isIE) LODOP.setAttribute('classid', 'clsid:2105C259-1E0C-4534-8141-A753534CB4CA')
         else LODOP.setAttribute('type', 'application/x-print-lodop')
         document.documentElement.appendChild(LODOP)
         CreatedOKLodop7766 = LODOP
       } else LODOP = CreatedOKLodop7766
       // =====Lodop插件未安装时提示下载地址:==========
       if ((LODOP == null) || (typeof(LODOP.VERSION) === 'undefined')) {
         if (navigator.userAgent.indexOf('Chrome') >= 0) {
           document.body.innerHTML = strHtmChrome + document.body.innerHTML
         }
         if (navigator.userAgent.indexOf('Firefox') >= 0) {
           document.body.innerHTML = strHtmFireFox + document.body.innerHTML
         }
         if (is64IE) document.write(strHtm64_Install)
         else
         if (isIE) document.write(strHtmInstall)
         else {
           document.body.innerHTML = strHtmInstall + document.body.innerHTML
         }
         return LODOP
       }
     }
     if (LODOP.VERSION < '6.2.2.3') {
       if (!needCLodop()) {
         if (is64IE) document.write(strHtm64_Update)
         else
         if (isIE) document.write(strHtmUpdate)
         else {
           document.body.innerHTML = strHtmUpdate + document.body.innerHTML
         }
       }
       return LODOP
     }
     // ===如下空白位置适合调用统一功能(如注册语句、语言选择等):===
     LODOP.SET_LICENSES("", "917C869B415ADA72B3A20365731AF08D", "C94CEE276DB2187AE6B65D56B3FC2848", "");
     console.warn('LODOP::', JSON.stringify(LODOP))
     // ===========================================================
     return LODOP
   } catch (err) {
     alert('getLodop出错:' + err)
   }
 }

 // 全局常量
 // export const LODOP

 // export let LODOP

 // var LODOP; //声明为全局变量
 // 直接打印
 export function lodopPrint() {
   try {
     CreatePrintPage()
     LODOP.PRINT()
   } catch (err) {
     getLodop()
   }
 }
 // 选择打印机
 export function lodopPrinter() {
   try {
     CreatePrintPage()
     LODOP.PRINTA()
   } catch (err) {
     getLodop()
   }
 }
 //  打印预览
 export function lodopPreview() {
   try {
     CreatePrintPage()
     LODOP.SET_PREVIEW_WINDOW(0, 0, 0, 2400, 1400, '')
     LODOP.PREVIEW()
   } catch (err) {
     getLodop()
   }
 }
 // 打印维护
 export function lodopSetup() {
   try {
     CreatePrintPage()
     LODOP.PRINT_SETUP()
   } catch (err) {
     getLodop()
   }
 }
 // 打印设计
 export function lodopDesign() {
   try {
     CreatePrintPage()
     LODOP.PRINT_DESIGN()
   } catch (err) {
     getLodop()
   }
 }
 // 空白设计
 export function myBlankDesign() {
   try {
     LODOP = getLodop()
     LODOP.PRINT_INIT('打印控件功能演示_Lodop功能_空白练习')
     LODOP.PRINT_DESIGN()
   } catch (err) {
     getLodop()
   }
 }
 // 打印表格
 export function PrintInFullPage(obj) {
   const fn = (printObj) => {
     try {
       // let tableId = createTable(data, columns) // 重新创建打印视图table
       obj = formatTableData(objectMerge2({}, obj))
       const topStyle = objectMerge2({
         top: '1%',
         left: '1%',
         width: '98%',
         height: '20%'
       }, obj.topStyle || {})
       const _topMainStyle = {
         top: '14%',
         left: '1%',
         width: '97.5%',
         height: '78%'
       }
       const _mainStyle = {
         top: '1%',
         left: '1%',
         width: '97.5%',
         height: '98%'
       }

       const mainStyle = objectMerge2(obj.appendTop ? _topMainStyle : _mainStyle, obj.mainStyle || {})
       /* const pageStyle = objectMerge2({
         intOrient: 2, // 1---纵向打印，固定纸张 2---横向打印，固定纸张 3---纵向打印，宽度固定，高度按打印内容的高度自适应 0---方向不定，由操作者自行选择或按打印机缺省设置
         intPageWidth: 0, // 单位为0.1mm
         intPageHeight: 0,
         strPageName: 'A4' // intPageWidth等于零时本参数才有效
       }, obj.pageStyle || {}) */
       const pageStyle = objectMerge2({
         intOrient: 2, // 1---纵向打印，固定纸张 2---横向打印，固定纸张 3---纵向打印，宽度固定，高度按打印内容的高度自适应 0---方向不定，由操作者自行选择或按打印机缺省设置
         intPageWidth: (printObj.paper_width || '218') + 'mm', // 单位为0.1mm 带孔240mm
         intPageHeight: (printObj.paper_height || '278') + 'mm',
         strPageName: ''
       }, obj.pageStyle || {})

       const objp = {
         w: printObj.paper_width,
         h: printObj.paper_height,
         l: printObj.left_distance || 0,
         t: printObj.top_distance || 0
       }
       objp.w = objp.w - 5 - objp.l
       objp.h = objp.h - 5 - objp.t

       console.log('print obj:', obj)
       const tableId = createTable(obj, true, '', printObj) // 重新创建打印视图table
       console.log('tableId.innerHTML:', tableId.innerHTML)
       LODOP = getLodop()
       // PRINT_INITA(Top,Left,Width,Height,strPrintName)

       if (obj.appendTop) {
         pageStyle.intOrient = printObj.printing_direction || pageStyle.intOrient
         LODOP.PRINT_INITA(objp.t, objp.l, objp.w, objp.h, '订货单')
       } else {
         LODOP.PRINT_INITA('0', '0', pageStyle.intPageWidth, pageStyle.intPageHeight, '订货单')
       }

       //  LODOP.PRINT_INIT('订货单')
       // LODOP.SET_PRINT_STYLE("FontSize", 10);
       // LODOP.SET_PRINT_STYLE("FontName", "微软雅黑")
       // LODOP.SET_PRINT_STYLE("Bold", 1);
       LODOP.SET_PRINT_PAGESIZE(pageStyle.intOrient, pageStyle.intPageWidth, pageStyle.intPageHeight, pageStyle.strPageName)
       LODOP.SET_PRINT_MODE('POS_BASEON_PAPER', true) // 设置以纸张边缘为基点
       // LODOP.ADD_PRINT_TEXT(50, 231, 260, 39, "打印页面部分内容");

       if (printObj.printer) {
         LODOP.SET_PRINTER_INDEXA(printObj.printer)
       }

       if (obj.appendTop) {
         obj.appendTop = obj.appendTop.replace('{heading_content}', printObj.heading_content).replace('{heading_word_size}', printObj.heading_word_size).replace('{content_word_size}', printObj.content_word_size)
         LODOP.ADD_PRINT_HTM(topStyle.top, topStyle.left, topStyle.width, topStyle.height, "<body style='margin-top:0'>" + obj.appendTop + '</body>')

         //  LODOP.SET_PRINT_STYLEA(0, 'TableHeightScope', 1)
       }
       LODOP.ADD_PRINT_TABLE(mainStyle.top, mainStyle.left, mainStyle.width, mainStyle.height, tableId.innerHTML)
       if (obj.appendTop) {
         LODOP.SET_PRINT_STYLEA(0, 'Offset2Top', '-12%')
         LODOP.SET_PRINT_STYLEA(0, 'Offset2Left', '2%')
       }

       if (printObj.print_page_num === '1') {
         const le = objp.w - 20
         const to = objp.h - 20
         // 如果是横向，翻转宽高位置
         if (printObj.printing_direction === '2') {
           const a = le
           le = to
           to = a
         }
         LODOP.ADD_PRINT_TEXT('70mm', '25mm', 88, 22, '第#页/共&页')
         LODOP.SET_PRINT_STYLEA(0, 'ItemType', 2)
         LODOP.SET_PRINT_STYLEA(0, 'Horient', 1)
         LODOP.SET_PRINT_STYLEA(0, 'Vorient', 1)
       }
       console.log('printObj:', printObj)

       //  LODOP.SET_PRINT_STYLEA(0, 'Offset2Left', '1%')

       // LODOP.SET_PREVIEW_WINDOW(0, 0, 0, 800, 600, "");
       LODOP.SET_SHOW_MODE('LANDSCAPE_DEFROTATED', 1) // 横向时的正向显示
       LODOP.PREVIEW()
     } catch (err) {
       console.log('lodop PrintInFullPage error:', err)
       getLodop()
     }
   }
   // 获取用户信息
   const user = getUserInfo()
   getPrintSetting({
     'companyId': user.companyId,
     'printType': 0
   }).then(res => {
     const data = res.data
     if (data) {
       const obj = {}
       data.forEach(el => {
         obj[el.fieldName] = el.fieldValue
       })
       fn(obj)
     } else {
       console.error('获取打印信息失败')
     }
   }).catch(err => {

   })
 }
 // 打印表格 普通table
 export function PrintInSamplePage(obj) {
   try {
     // let tableId = createTable(data, columns) // 重新创建打印视图table
     const tableId = obj.id // 重新创建打印视图table
     LODOP = getLodop()

     LODOP.PRINT_INIT('订货单')
     // LODOP.SET_PRINT_STYLE("FontSize", 10);
     // LODOP.SET_PRINT_STYLE("FontName", "微软雅黑")
     // LODOP.SET_PRINT_STYLE("Bold", 1);
     LODOP.SET_PRINT_PAGESIZE(0, 0, 0, 'A4')
     // LODOP.ADD_PRINT_TEXT(50, 231, 260, 39, "打印页面部分内容");
     LODOP.ADD_PRINT_TABLE('1%', '1%', '98%', '100%', document.getElementById(tableId).innerHTML)
     // LODOP.SET_PREVIEW_WINDOW(0, 0, 0, 800, 600, "");
     LODOP.SET_SHOW_MODE('LANDSCAPE_DEFROTATED', 1) // 横向时的正向显示
     LODOP.PREVIEW()
   } catch (err) {
     getLodop()
   }
 }
 // 打印合同或核销凭证
 export function PrintContract(obj, type) {
   const fn = (printObj) => {
     try {
       const tableId = obj
       LODOP = getLodop()

       if (type === 'voucher') {

         LODOP.PRINT_INITA('0', '5mm', '218mm', '280mm', '现金记账凭证【出纳】')
         LODOP.SET_PRINT_PAGESIZE(1, '218mm', '280mm', '合同')
       } else {
         const objp = {
           w: printObj.paper_width,
           h: printObj.paper_height,
           l: printObj.left_distance || 0,
           t: printObj.top_distance || 5
         }
         objp.w = objp.w - 5 - objp.l
         objp.h = objp.h - 5 - objp.t
         LODOP.PRINT_INITA(objp.t + 'mm', objp.l + 'mm', objp.w + 'mm', objp.h + 'mm', '合同')
         LODOP.SET_PRINT_PAGESIZE(printObj.printing_direction, printObj.paper_width + 'mm', printObj.paper_height + 'mm', '合同')
         if (printObj.printer) {
           LODOP.SET_PRINTER_INDEXA(printObj.printer)
         }
         console.log('PrintContract printObj:', printObj, objp)
         obj += encodeURI('&heading_content=' + printObj.heading_content + '&heading_word_size=' + printObj.heading_word_size + '&content_word_size=' + printObj.content_word_size)
       }
       //  LODOP.PRINT_INIT('合同')

       LODOP.SET_PRINT_MODE('POS_BASEON_PAPER', true) // 设置以纸张边缘为基点
       LODOP.SET_PRINT_STYLE('FontSize', 14)
       // LODOP.SET_PRINT_STYLE("FontName", "微软雅黑")
       LODOP.SET_PRINT_STYLE('Bold', 1)
       //  LODOP.SET_PRINT_PAGESIZE(1, 0, 0, 'A4')

       // LODOP.ADD_PRINT_TEXT(50, 231, 260, 39, "打印页面部分内容");
       console.log(obj)
       LODOP.ADD_PRINT_HTM('1%', '1%', '98%', '98%', 'URL:' + obj)
       // LODOP.ADD_PRINT_HTM("1%", "1%", "98%", "100%", document.getElementById(tableId).innerHTML);
       // LODOP.SET_PREVIEW_WINDOW(0, 0, 0, 800, 600, "");
       LODOP.SET_SHOW_MODE('LANDSCAPE_DEFROTATED', 1) // 横向时的正向显示
       LODOP.PREVIEW()
     } catch (err) {
       getLodop()
     }
   }
   if (type === 'voucher') {
     fn()
   } else {
     // 获取用户信息
     const user = getUserInfo()
     getPrintSetting({
       'companyId': user.companyId,
       'printType': 1
     }).then(res => {
       const data = res.data
       if (data) {
         const obj = {}
         data.forEach(el => {
           obj[el.fieldName] = el.fieldValue
         })
         fn(obj)
       } else {
         console.error('获取打印信息失败')
       }
     }).catch(err => {

     })
   }
 }
 // 打印结算单
 export function PrintSettlement(obj) {
   try {
     const tableId = createSettlement(obj) // 重新创建打印视图table
     LODOP = getLodop()

     LODOP.PRINT_INIT('订货单')
     // LODOP.SET_PRINT_STYLE("FontSize", 10);
     // LODOP.SET_PRINT_STYLE("FontName", "微软雅黑")
     // LODOP.SET_PRINT_STYLE("Bold", 1);
     LODOP.SET_PRINT_PAGESIZE(2, 0, 0, 'A4')
     // LODOP.ADD_PRINT_TEXT(50, 231, 260, 39, "打印页面部分内容");
     // LODOP.ADD_PRINT_TABLE("1%", "1%", "98%", "100%", document.getElementById(tableId).innerHTML);
     LODOP.ADD_PRINT_HTM('5%', '10%', '80%', '95%', document.getElementById(tableId).innerHTML)
     // LODOP.SET_PREVIEW_WINDOW(0, 0, 0, 800, 600, "");
     LODOP.SET_SHOW_MODE('LANDSCAPE_DEFROTATED', 1) // 横向时的正向显示
     LODOP.PREVIEW()
   } catch (err) {

   }
 }

 // 创建打印页面    【已保存】标签或运单
 export function CreatePrintPage(info) {
   try {
     LODOP = getLodop()

     // let info = "LODOP.PRINT_INITA(9,7,2400,1400,\"青春物流流托运单打印\");LODOP.ADD_PRINT_TEXT(41,488,100,19,\"180701404\");LODOP.ADD_PRINT_TEXT(57,47,100,25,\"云南省,\");LODOP.ADD_PRINT_TEXT(63,170,100,20,\"北京市,\");LODOP.ADD_PRINT_TEXT(85,93,81,20,\"发发\");LODOP.ADD_PRINT_TEXT(114,96,82,20,\"收收A\");LODOP.ADD_PRINT_TEXT(90,230,202,20,\"大街上\");LODOP.ADD_PRINT_TEXT(90,485,100,20,\"15920000002\");LODOP.ADD_PRINT_TEXT(116,234,204,20,\"收货address\");LODOP.ADD_PRINT_TEXT(112,486,100,20,\"15932145601\");LODOP.ADD_PRINT_TEXT(165,14,75,20,\"电脑\");LODOP.ADD_PRINT_TEXT(164,104,60,20,\"1807014043\");LODOP.ADD_PRINT_TEXT(163,184,29,20,\"56\");LODOP.ADD_PRINT_TEXT(269,323,58,20,\"34.00\");LODOP.ADD_PRINT_TEXT(324,177,166,20,\"\");LODOP.ADD_PRINT_TEXT(38,366,109,20,\"2018-07-31\" );"
     // info.replace(/^\"|\"$/g,"")
     info.replace(/[\\]/g, '')
     // info = info.replace('PRINT_INITA', 'PRINT_INIT')

     eval(info)
     //  LODOP.ADD_PRINT_SETUP_BKIMG('E:/工作资料/打印机驱动/20180921095700758_0003.jpg')
     // LODOP.PRINT_SETUP()
     LODOP.PREVIEW()
     //  LODOP.PRINT_DESIGN()
   } catch (err) {
     getLodop()
   }
 }
 // 转化费用为大写
 export function setFeeToBig(fee) { // 费用转成中文大写
   console.log('fee:::::::', fee, smalltoBIG(fee))
   if (fee) {
     // fee = Math.round(parseFloat(fee)) 不需要四舍五入，所以注释掉
     let feezh = fee.toString().split('').reverse()
     const pointIndex = feezh.indexOf('.') + 1
     const feezhAll = smalltoBIG(fee)
     feezh = feezh.slice(pointIndex).reverse()
     feezh.forEach((e, index) => {
       feezh[index] = smalltoBIG(e).slice(0, 1)
     })
     feezh = feezh.reverse()
     if (feezh && feezh.length > 4) { // 过万的数字直接拼接
       feezh[4] = feezhAll.slice(0, feezhAll.indexOf('万'))
     } else if (feezh && feezh.length < 5) { // 补充零
       for (let i = 0; i < 5; i++) {
         feezh[i] = feezh[i] || '零'
       }
     }
     console.log('feezh:::::', feezh)
     return feezh
   }
   return ''
 }
 /**
  * 格式化运单数据
  * {
  * tmsOrderShipInfo, 运单信息
  * tmsOrderCargoList 货物信息
  * tmsOrderTransferList 中转信息
  *
  * tmsOrderShipSignList 签收信息
  * tmsGxLoadsList 干线信息
  * tmsDbLoadsList 短驳信息
  * }
  */
 export function formatOrderData(info, type) {
   // 获取用户信息
   const user = getUserInfo()
   console.log('formatOrderData:', info, type, user)
   const obj = {}
   const infoDetail = Object.assign({}, info.tmsOrderShipInfo)
   const cargoList = info.tmsOrderCargoList || []
   const tmsOrderTransferList = info.tmsOrderTransferList

   const cargoOne = cargoList[0] || {}
   const cargoLen = info.tmsOrderCargoList.length
   console.log('货品列表长度：', cargoLen)
   const addrToCity = infoDetail.shipToCityName || ''
   const addrToCityArr = addrToCity.split(',')

   const addrFormCity = infoDetail.shipFromCityName || ''
   const addrFormCityArr = addrFormCity.split(',')

   for (const item in cargoOne) {
     if (item !== 'id' && item !== 'orgid' && item !== 'createTime') {
       for (let i = 0; i < cargoLen; i++) {
         const itemDetail = item + (i > 0 ? i + 1 : '')
         infoDetail[itemDetail] = cargoList[i][item]
       }
     }
   }
   infoDetail.agencyFundTotal = 0 // 代收货款合计
   infoDetail.cargoAmountTotal = 0 // 货品件数合计
   // infoDetail.brokerageFeeTotal = 0 // 回扣合计
   cargoList.forEach(e => { // 计算代收货款合计
     infoDetail.agencyFundTotal = tmsMath._add(infoDetail.agencyFundTotal, e.agencyFund)
     infoDetail.cargoAmountTotal = tmsMath._add(infoDetail.cargoAmountTotal, e.cargoAmount)
     // infoDetail.brokerageFeeTotal = tmsMath._add(infoDetail.brokerageFeeTotal, e.brokerageFee)
   })
   console.warn(infoDetail)
   // 公用
   obj.shipSn = infoDetail.shipSn // 运单号
   obj.createTime = infoDetail.createTime // 开单日期
   obj.senderUnit = infoDetail.shipSenderUnit // 发货单位
   obj.senderName = infoDetail.shipSenderName // 发货人
   obj.senderMobile = infoDetail.shipSenderMobile // 发货电话
   obj.senderAddress = infoDetail.shipSenderAddress // 发货地址
   obj.receiverUnit = infoDetail.shipReceiverUnit // 收货单位
   obj.receiverName = infoDetail.shipReceiverName // 收货人
   obj.receiverAddress = infoDetail.shipReceiverAddress // 收货地址
   obj.receiverMobile = infoDetail.shipReceiverMobile // 收货人电话
   obj.toOrgName = infoDetail.toOrgName // 目的网点 || 到达网点
   obj.fromCity = addrFormCityArr[2] || addrFormCityArr[1] || addrFormCityArr[0] || '' // 发站
   obj.toCity = addrToCityArr[2] || addrToCityArr[1] || addrToCityArr[0] || '' // 到站
   obj.deliveryMethod = infoDetail.shipDeliveryMethodName // 交接方式
   obj.clerk = infoDetail.userName || user.name || user.username // 业务员

   if (type === 'lib') {
     console.log('lib companyAddr', infoDetail.detailedAddr, user.city + user.companyInfo.detailedAddr)
     obj.customerSn = infoDetail.shipCustomerNumber // 客户单号
     obj.companyName = infoDetail.companyName || user.companyName // 公司名称
     obj.companyPhone = infoDetail.servicePhone || user.companyInfo.servicePhone // 公司电话
     obj.companyAddr = infoDetail.detailedAddr || (user.companyInfo.city || '') + (user.companyInfo.detailedAddr || '') // 公司地址
     obj.qrcode = '' // 二维码
     obj.clerkMobile = infoDetail.userMobile || user.mobilephone // 业务员电话
     obj.goodsSn = infoDetail.shipGoodsSn // 货号
     obj.cargoName = infoDetail.cargoName // 货品名
     obj.cargoPack = infoDetail.cargoPack // 包装
     obj.cargoAmount = infoDetail.cargoAmount // 件数
     obj.cargoWeight = infoDetail.cargoWeight // 重量
     obj.cargoVolume = infoDetail.cargoVolume // 体积
     obj.fromOrgName = infoDetail.fromOrgName // 开单网点
     obj.description = infoDetail.description // 品种规格
   } else if (type === 'order') {
     const objCargoNotNum = ['goodsSn', 'cargoName', 'cargoPack', 'cargoAmount', 'cargoWeight', 'cargoVolume', 'fromOrgName', 'description']
     const objCargo = [{ // 货号
       cargo: 'goodsSn', // 数据库label名称
       info: 'shipGoodsSn' // 数据lable名称
     }, { // 货品名
       cargo: 'cargoName',
       info: 'cargoName'
     }, { // 包装
       cargo: 'cargoPack',
       info: 'cargoPack'
     }, { // 件数
       cargo: 'cargoAmount',
       info: 'cargoAmount'
     }, { // 重量
       cargo: 'cargoVolume',
       info: 'cargoVolume'
     }, { // 体积
       cargo: 'cargoWeight',
       info: 'cargoWeight'
     }, { // 开单网点
       cargo: 'fromOrgName',
       info: 'fromOrgName'
     }, { // 品种规格
       cargo: 'description',
       info: 'description'
     }, { // 运费
       cargo: 'shipFee',
       info: 'shipFee'
     }, { // 送货费
       cargo: 'deliveryFee',
       info: 'deliveryFee'
     }, { // 声明价值
       cargo: 'productPrice',
       info: 'productPrice'
     }, { // 回扣
       cargo: 'brokerageFee',
       info: 'brokerageFee'
     }, { // 代收货款
       cargo: 'agencyFund',
       info: 'agencyFund'
     }, { // 代收货款手续费
       cargo: 'commissionFee',
       info: 'commissionFee'
     }, { // 上楼费
       cargo: 'upStairsFee',
       info: 'goupstairsFee'
     }, { // 装卸费
       cargo: 'handlingFee',
       info: 'handlingFee'
     }, { // 保险费
       cargo: 'insuranceFee',
       info: 'insuranceFee'
     }, { // 包装费
       cargo: 'packageFee',
       info: 'packageFee'
     }, { // 提货费
       cargo: 'pickupFee',
       info: 'pickupFee'
     }, { // 实际提货费
       cargo: 'realityhandlingFee',
       info: 'realityhandlingFee'
     }, { // 叉车费
       cargo: 'forkliftFee',
       info: 'forkliftFee'
     }, { // 报关费
       cargo: 'customsFee',
       info: 'customsFee'
     }, { // 重量单价
       cargo: 'weightFee',
       info: 'weightFee'
     }, { // 体积单价
       cargo: 'volumeFee',
       info: 'volumeFee'
     }, { // 件数单价
       cargo: 'amountFee',
       info: 'amountFee'
     }, { // 其他费用支出
       cargo: 'otherfeeOut',
       info: 'otherfeeOut'
     }, { // 其他费用收入
       cargo: 'otherfeeIn',
       info: 'otherfeeIn'
     }, { // 税率
       cargo: 'taxRate',
       info: 'taxRate'
     }, { // 税金
       cargo: 'taxes',
       info: 'taxes'
     }, { // 入仓费
       cargo: 'housingFee',
       info: 'housingFee'
     }, { // 印花税
       cargo: 'stampTax',
       info: 'stampTax'
     }]
     objCargo.forEach((item, index) => {
       for (let i = 0; i < cargoLen; i++) {
         const itemCargo = item.cargo + (i > 0 ? i + 1 : '')
         const itemInfo = item.info + (i > 0 ? i + 1 : '')
         obj[itemCargo] = (objCargoNotNum.indexOf(item.cargo) !== -1) ? infoDetail[itemInfo] : (parseFloat(infoDetail[itemInfo]) || '')
         if (/(Amount|Volume|Weight|cargoPack|description)/.test(item.cargo) !== -1) { // 件数、重量、体积、包装、品种规格为0的时候不显示0
           obj[itemCargo] = obj[itemCargo] ? obj[itemCargo] === '0' ? '' : obj[itemCargo] : ''
         }
       }
     })
     obj.createrName = infoDetail.createUserName || user.name || user.username // 开单员
     obj.userName = infoDetail.createUserName || user.name || user.username // 制单员
     obj.totalFee = parseFloat(infoDetail.shipTotalFee) || '' // 运费合计
     obj.agencyFundTotal = parseFloat(infoDetail.agencyFundTotal) || '' // 代收款合计
     // obj.brokerageFeeTotal = parseFloat(infoDetail.brokerageFeeTotal) || '' // 回扣合计
     obj.receiptRequire = infoDetail.shipReceiptRequireName // 回单要求
     obj.shipReceiptNum = infoDetail.shipReceiptNum // 回单份数
     obj.shipReceiptSn = infoDetail.shipReceiptSn // 回单号
     obj.customerNumber = infoDetail.shipCustomerNumber // 客户单号

     obj.shippingType = infoDetail.shipShippingTypeName // 运输方式
     obj.businessType = infoDetail.shipBusinessTypeName // 业务类型
     obj.remarks = infoDetail.shipRemarks // 备注
     obj.effective = infoDetail.shipEffectiveName // 时效
     // ///////////////////////////////////////////////////////////
     // /运单号-件数
     obj.shipSnCargoAmount = infoDetail.shipSn + '-' + infoDetail.cargoAmountTotal
     // //////////////////////////////////////////////////////////
     // /年月日
     const year = parseTime(infoDetail.createTime, '{y}')
     obj.createYear = parseTime(infoDetail.createTime, '{y}')
     obj.createYear2 = year.substr(2, 2)
     obj.createMonth = parseTime(infoDetail.createTime, '{m}')
     obj.createDate = parseTime(infoDetail.createTime, '{d}')
     // //////////////////////////////////////////////////////////
     // /特殊处理 中转费
     let totalTransferFee = 0
     if (tmsOrderTransferList && tmsOrderTransferList.length > 0) {
       tmsOrderTransferList.forEach(e => {
         totalTransferFee = tmsMath._add(totalTransferFee, e.totalCost)
       })
     }
     obj.transferFee = parseFloat(totalTransferFee) || '' // 中转费
     console.log('中转费', totalTransferFee)

     // //////////////////////////////////////////////////////////
     // /付款方式
     // 104 多笔付
     obj.payWay = infoDetail.shipPayWayName
     // 付款方式
     switch (Number(infoDetail.shipPayWay)) { // 付款方式
       case 76:
         obj.nowPay = '√' // 现付（√）
         obj.nowPayFee = parseFloat(infoDetail.shipNowpayFee) || ''
         break
       case 77:
         obj.deliveryPay = '√' // 提付（√）|| 到付（√）
         obj.deliveryPayFee = parseFloat(infoDetail.shipArrivepayFee) || ''
         break
       case 78:
         obj.monthPay = '√' // 月结（√）
         obj.monthPayFee = parseFloat(infoDetail.shipMonthpayFee) || ''
         break
       case 79:
         obj.receiptPay = '√' // 回单付（√）
         obj.receiptPayFee = parseFloat(infoDetail.shipReceiptpayFee) || ''
         break
       case 104: // 多笔付
         obj.nowPay = infoDetail.shipNowpayFee ? '√' : ''
         obj.deliveryPay = infoDetail.shipArrivepayFee ? '√' : ''
         obj.monthPay = infoDetail.shipMonthpayFee ? '√' : ''
         obj.receiptPay = infoDetail.shipReceiptpayFee ? '√' : ''
         obj.nowPayFee = parseFloat(infoDetail.shipNowpayFee) || ''
         obj.deliveryPayFee = parseFloat(infoDetail.shipArrivepayFee) || ''
         obj.monthPayFee = parseFloat(infoDetail.shipMonthpayFee) || ''
         obj.receiptPayFee = parseFloat(infoDetail.shipReceiptpayFee) || ''
         break
     }
     // //////////////////////////////////////////////////////
     // /回单要求
     // /
     switch (Number(infoDetail.shipReceiptRequire)) {
       case 81: // 签回单
         obj.receiptSign = infoDetail.shipReceiptRequire ? '√' : ''
         break
       case 82: // 签原单
         obj.receiptOriginal = infoDetail.shipReceiptRequire ? '√' : ''
         break
       case 83: // 打收条
         obj.receiptIssue = infoDetail.shipReceiptRequire ? '√' : ''
         break
       case 84: // 签信封
         obj.receiptMailer = infoDetail.shipReceiptRequire ? '√' : ''
         break
       case 85: // 签回单盖章
         obj.receiptSeal = infoDetail.shipReceiptRequire ? '√' : ''
         break
       case 86: // 电子回单
         obj.receiptElectronic = infoDetail.shipReceiptRequire ? '√' : ''
         break
       case 102: // 传真
         obj.receiptFax = infoDetail.shipReceiptRequire ? '√' : ''
         break
     }
     // /////////////////////////////////////////////////////////
     // /业务类型
     // /
     switch (Number(infoDetail.shipBusinessType)) {
       case 91: // 整车
         obj.carLoad = infoDetail.shipBusinessType ? '√' : ''
         break
       case 92: // 零担
         obj.zeroLoad = infoDetail.shipBusinessType ? '√' : ''
         break
       case 93: // 专线
         obj.specialLine = infoDetail.shipBusinessType ? '√' : ''
         break
     }
     // ////////////////////////////////////////////////////////
     // / 运输方式
     // /
     switch (Number(infoDetail.shipShippingType)) {
       case 87: // 普通汽运
         obj.shipTrucks = infoDetail.shipShippingType ? '√' : ''
         break
       case 88: // 卡车航班
         obj.shipAutotruck = infoDetail.shipShippingType ? '√' : ''
         break
       case 89: // 水运
         obj.shipCarrige = infoDetail.shipShippingType ? '√' : ''
         break
       case 90: // 铁路
         obj.shipTrain = infoDetail.shipShippingType ? '√' : ''
         break
     }
     if (Number(infoDetail.shipDeliveryMethod) === 68) {
       obj.deliveryGood = '√' // 自提（√）
     } else if (Number(infoDetail.shipDeliveryMethod) === 69) {
       obj.sendGood = '√' // 送货（√）
     }
     if (infoDetail.shipOther && Number(infoDetail.shipOther) === 168) {
       obj.controlGoods = infoDetail.shipOther // 168-控货
     }
     if (infoDetail.shipOther && Number(infoDetail.shipOther) === 169) {
       obj.valuables = infoDetail.shipOther //  169-贵重物品
     }
     if (infoDetail.shipEffective === 95) {
       obj.urgent = infoDetail.shipEffective // 95-时效-加急
     } else {
       obj.common = infoDetail.shipEffective // 94-时效-普通
     }
     // //////////////////////////////////////////////////////////
     // /处理合计中文大写
     if (infoDetail.shipTotalFee) {
       const totalFeeBig = setFeeToBig(infoDetail.shipTotalFee)
       obj.uptotalFeeW = totalFeeBig[4] // 运费合计(万)
       obj.uptotalFeeQ = totalFeeBig[3] // 运费合计(仟)
       obj.uptotalFeeB = totalFeeBig[2] // 运费合计(佰)
       obj.uptotalFeeS = totalFeeBig[1] // 运费合计(拾)
       obj.uptotalFeeY = totalFeeBig[0] // 运费合计(元)
     }

     if (infoDetail.agencyFundTotal) {
       const upagencyFeeBig = setFeeToBig(infoDetail.agencyFundTotal)
       obj.upagencyFundW = upagencyFeeBig[4] // 代收货款(万)
       obj.upagencyFundQ = upagencyFeeBig[3] // 代收货款(仟)
       obj.upagencyFundB = upagencyFeeBig[2] // 代收货款(佰)
       obj.upagencyFundS = upagencyFeeBig[1] // 代收货款(拾)
       obj.upagencyFundY = upagencyFeeBig[0] // 代收货款(元)
     }
   }
   console.warn('obj', obj)
   return obj
 }

 // 创建打印页面    【未保存】标签或运单
 /**
  * info{
  * orderdata, // 运单数据
  * number, // 打印份数
  * printer, // 打印机
  * printSetup // 打印设置
  * type // 打印类型
  * preview // 是否预览
  * mock // 是否直接读取value字段
  * bkimg // 是否包含背景图
  * }
  */
 export function CreatePrintPageEnable(info, printer, preview, number) {
   console.log('是否预览', preview, info)
   const user = getUserInfo()

   // info-打印数据
   // printer-打印机
   // number-打印份数
   // preview-是否预览
   // bkimg-是否背景图
   return new Promise((resolve, reject) => {
     try {
       const prxvalue = 0.264
       const str = ''
       const imgNameStr = '预览图片TMS,'
       // let islib = false // 判断是否标签打印
       let printSetup = []
       let copy = []
       const bkimg = info.bkimg || false
       LODOP = getLodop()

       console.log('print', info, printer, number)
       // 2.0：处理数据
       if (info.orderdata) {
         number = parseInt(info.number, 10) || 0

         if (!info.printer) {
           // 如果没有填写打印机，则根据类型判断去设置打印机
           printer = info.type === 'lib' ? user.systemSetup.printSetting.label : info.type === 'order' ? user.systemSetup.printSetting.ship : ''
         } else {
           printer = info.printer
         }
         preview = !info.preview
         printSetup = objectMerge2([], info.printSetup)
         if (!info.mock) {
           const cargoLen = info.orderdata.tmsOrderCargoList.length
           info = formatOrderData(info.orderdata, info.type)
           copy = printSetup.map(el => {
             if (el.filedValue === 'customFields') {
               el.value = el.filedName
             } else {
               const val = info[el.filedValue]
               el.value = typeof val === 'undefined' ? '' : val === null ? '' : val
             }
             return el
           })
         } else {
           copy = printSetup
         }
         info = copy
         // 如果是0份则不处理，直接标记完成且不需要预览
         if (!number && preview) {
           resolve()
           return
         }
       }

       // if (printer) {
       // LODOP.SET_PRINT_MODE('WINDOW_DEFPRINTER', printer)
       // str += "LODOP.SET_PRINT_MODE('WINDOW_DEFPRINTER', " + printer + ");"
       // console.log(str)
       // }

       let arr = new Array()
       let bkimgUrl = '' // 背景图片的url链接
       arr = Object.assign([], info)
       let title = ''
       for (const item in arr) { // 没有传值的项设置位空字符串
         if (arr[item].filedValue === 'setting') {
           if (arr[item].filedName === '标签尺寸') {
             title = '标签打印'

           } else {
             title = '托运单打印'
           }
           console.log('setting::', arr[item])
           // str += 'LODOP.PRINT_INITA(' + e.topy + ',' + e.leftx + ',' + e.width + ',' + e.height + ',' + title + ');'
           LODOP.PRINT_INITA(arr[item].topy, arr[item].leftx, arr[item].width * prxvalue + 'mm', arr[item].height * prxvalue + 'mm', title)
           // str += 'LODOP.SET_PRINT_PAGESIZE(0, ' + arr[item].width + ',' + arr[item].height + ', "");'
           // LODOP.PRINT_INITA(10, 10, 762, 533, "移动公司发票全样")
           LODOP.SET_PRINT_PAGESIZE(0, arr[item].width * prxvalue + 'mm', arr[item].height * prxvalue + 'mm', '')


         }
         if (arr[item].value === undefined || arr[item].value === null) {
           arr[item].value = ''
         }
         if (arr[item].filedName.indexOf(imgNameStr) !== -1) { // 是否有背景图片
           bkimgUrl = arr[item].filedName.split(',')[1] || ''
           console.log('拿到背景图片url', bkimgUrl, info)
           if (bkimg) {
             console.log('ADD_PRINT_SETUP_BKIMG')
             LODOP.ADD_PRINT_SETUP_BKIMG("<img border='0' src='" + bkimgUrl + "'>")
           }
           console.log('BKIMG_IN_PREVIEW')
           LODOP.SET_SHOW_MODE('BKIMG_IN_PREVIEW', bkimg ? 1 : 0) // 第二个参数 整数或字符型，1或true=是,否则不是
         }
       }

       arr.forEach((e, index) => {
         let title = ''
         if (e.filedName === '标签尺寸') {
           title = '标签打印'
         } else {
           title = '托运单打印'
         }
         if (e.filedValue !== 'setting' && Number(e.isshow) === 1) {
           if ((e.filedValue === 'urgent' && e.value) || (e.filedValue === 'common' && e.value || (e.filedValue === 'controlGoods' && e.value) || (e.filedValue === 'valuables' && e.value))) { // 加急urgent和普通common 需要特殊处理为打勾
             // str += 'LODOP.ADD_PRINT_TEXT(' + e.topy + ',' + e.leftx + ',' + e.width + ',' + e.height + ',"√");'
             // str += 'LODOP.SET_PRINT_STYLEA(0,"FontSize",' + e.fontsize + ');'
             LODOP.ADD_PRINT_TEXT(e.topy, e.leftx, e.width, e.height, '√')
             LODOP.SET_PRINT_STYLEA(0, 'FontSize', e.fontsize)
           } else {
             LODOP.ADD_PRINT_TEXT(e.topy, e.leftx, e.width, e.height, e.value)
             LODOP.SET_PRINT_STYLEA(0, 'TextNeatRow', true)
             LODOP.SET_PRINT_STYLEA(0, 'FontSize', e.fontsize)
             LODOP.SET_PRINT_STYLEA(0, 'Alignment', e.alignment)
             // str += 'LODOP.ADD_PRINT_TEXT(' + e.topy + ',' + e.leftx + ',' + e.width + ',' + e.height + ',"' + e.value + '");'
             // str += 'LODOP.SET_PRINT_STYLEA(0,"FontSize",' + e.fontsize + ');'
             // str += 'LODOP.SET_PRINT_STYLEA(0,"Alignment",' + e.alignment + ');'
           }
         }
         if (e.filedValue === 'settingRotate') {
           LODOP.SET_PRINT_STYLEA(0, "AngleOfPageInside", Math.round(e.width * prxvalue))
         }
       })

       LODOP.SET_PRINT_MODE('CATCH_PRINT_STATUS', true)
       if (printer) {
         LODOP.SET_PRINTER_INDEXA(printer)
       }

       window.LODOP_PRITERN_CODE = ''
       LODOP.On_Return = function(TaskID, value) {
         console.log('On_Return1::', TaskID, value)
         window.LODOP_PRITERN_CODE = value
       }

       if (number) {
         console.log('number', number)
         LODOP.SET_PRINT_COPIES(number)
       }
       LODOP.SET_PRINT_MODE('RESELECT_COPIES', 1)

       if (preview) { // 直接打印不预览
         var code = LODOP.PRINT()
       } else { // 打开打印设置弹框
         // var code = LODOP.PRINTA()
         var code = LODOP.PREVIEW()
       }
       console.log('code', code)
       setTimeout(() => {
         resolve()
       }, 2000)
       if (!code) {
         reject()
       }
     } catch (err) {
       reject('LODOP加载失败')
       console.log(err)
       getLodop()
     }
   })
 }

 window.CreatePrintPageEnable = CreatePrintPageEnable

 function checkLodopStatus(r, index) {
   var code = window.LODOP_PRITERN_CODE
   if (code) {
     console.log('checkLodopStatus1:', code)
     LODOP.On_Return = function(TaskID, value) {
       var code = window.LODOP_PRITERN_CODE
       console.log('checkLodopStatus2:', TaskID, value, code)

       console.log('PRINT_STATUS_OK:', value)
       r()
     }
     LODOP.GET_VALUE('PRINT_STATUS_OK', window.LODOP_PRITERN_CODE)
   } else {
     setTimeout(() => {
       if (++index < 10) {
         checkLodopStatus(r, index)
       } else {
         r()
       }
     }, 200)
   }
 }

 // 格式化数据
 function formatTableData(obj) {
   /*  obj.columns.sort((a, b) => {
      return a.fixed ? -1 : 0
    }) */
   obj.data.forEach((el, k) => {
     obj.columns.forEach((column, j) => {
       if (column.prop === 'id' || column.label === '序号') {
         console.log('column.label:', column.label)
         el['index'] = k + 1
         el['id'] = k + 1
         el['number'] = k + 1
         /* if (column.label === '序号') {

         } else {

         } */
       }
       if (typeof el[column.prop] === 'undefined' || el[column.prop] === null) {
         el[column.prop] = ''
       }
       // 特殊处理某些字段
       if (/(shipFromCityName|shipToCityName)/.test(column.prop)) {
         const objArr = el[column.prop].split(',')
         el[column.prop] = objArr[2] || objArr[1] || objArr[0] || ''
       }
       column.width = column.width || ''
     })
   })
   return obj
 }

 function SaveExcelByOne(option) {
   // 旧版代码
   var toExcel = new ExportJsonExcel['js-export-excel'](option) // new
   //  var toExcel = new ExportJsonExcel(option) // new
   toExcel.saveExcel() // 保存
 }

 function SaveExcelByTwo(option) {
   // https://github.com/guyonroche/exceljs
   var workbook = new ExcelJS.Workbook()
   workbook.creator = '28TMS'
   workbook.lastModifiedBy = '28TMS'
   workbook.created = new Date()
   workbook.modified = new Date()
   workbook.lastPrinted = new Date()

   // 暂时只处理第一个表格
   // 如果需要，可以改成遍历表格
   const data = option.datas[0]

   // 表格名称
   var worksheet = workbook.addWorksheet('Sheet')
   // 冻结第一行
   worksheet.views = [{
     state: 'frozen',
     xSplit: 0,
     ySplit: 1
   }]

   // 添加过滤器
   /* worksheet.autoFilter = {
     from: 'A1',
     to: 'M1'
   } */
   // 定义列样式
   const columnsStyle = {
     alignment: {
       wrapText: true,
       horizontal: 'center',
       vertical: 'middle'
     },
     border: {
       top: {
         style: 'thin',
         color: {
           argb: 'FF999999'
         }
       },
       left: {
         style: 'thin',
         color: {
           argb: 'FF999999'
         }
       },
       bottom: {
         style: 'thin',
         color: {
           argb: 'FF999999'
         }
       },
       right: {
         style: 'thin',
         color: {
           argb: 'FF999999'
         }
       }
     }
   }
   const columns = []
   data.sheetHeader.forEach((el, index) => {
     columns.push({
       header: el,
       key: data.sheetFilter[index] || 'index',
       width: 15,
       height: 20,
       style: columnsStyle
     })
   })
   worksheet.columns = columns
   /*    worksheet.columns = [
      { header: 'Index', key: 'Index', width: 15 },
      { header: 'Title', key: 'title', width: 25, style: { alignment: { wrapText: true }}},
      { header: 'Authors', key: 'authors', width: 20, style: { alignment: { wrapText: true }}},
      { header: 'Journal/Conference', key: 'jc', width: 25, style: { alignment: { wrapText: true }}},
      { header: 'Type', key: 'type', width: 12, style: { alignment: { wrapText: true }}},
      { header: 'Year', key: 'year', width: 12, style: { numFmt: '0000' }},
      { header: 'Month', key: 'month', width: 12 },
      { header: 'volume', key: 'volume', width: 12 },
      { header: 'number', key: 'number', width: 12 },
      { header: 'Pages', key: 'pages', width: 12 },
      { header: 'Location', key: 'location', width: 20, style: { alignment: { wrapText: true }}},
      { header: 'doi', key: 'doi', width: 22, style: { alignment: { wrapText: true }}},
      { header: 'affiliation', key: 'affiliation', width: 20, style: { alignment: { wrapText: true }}}
      ] */

   // 设置第一行标题样式
   var firstRow = worksheet.getRow(1)
   firstRow.font = {
     name: 'MicrosoftYaHei',
     family: 1,
     size: 10,
     bold: true,
     color: {
       argb: '80333333'
     }
   }
   firstRow.alignment = {
     vertical: 'middle',
     horizontal: 'center'
   }
   firstRow.height = 20
   firstRow.border = {
     top: {
       style: 'thin',
       color: {
         argb: 'FF999999'
       }
     },
     left: {
       style: 'thin',
       color: {
         argb: 'FF999999'
       }
     },
     bottom: {
       style: 'thin',
       color: {
         argb: 'FF999999'
       }
     },
     right: {
       style: 'thin',
       color: {
         argb: 'FF999999'
       }
     }
   }
   firstRow.fill = {
     type: 'pattern',
     pattern: 'solid',
     fgColor: {
       argb: 'FFCCCCCC'
     }
   }

   const datas = []

   data.sheetData.map((el, index) => {
     const arr = []
     data.sheetFilter.map(ee => {
       arr.push(el[ee || 'index'])
     })
     datas.push(arr)
   })

   //  csv.shift();
   worksheet.addRows(datas)
   // 添加数据

   // 设置间隔样式
   // 除第一行外的奇数行设置背景色
   worksheet.eachRow({
     includeEmpty: true
   }, function(row, rowNumber) {
     //  console.log('Row ' + rowNumber + ' = ' + JSON.stringify(row.values))
     if (rowNumber > 1 && rowNumber % 2) {
       row.fill = {
         type: 'pattern',
         pattern: 'solid',
         fgColor: {
           argb: 'FFEEEEEE'
         }
       }
     }
   })

   var buff = workbook.xlsx.writeBuffer().then(function(data) {
     var blob = new Blob([data], {
       type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
     })
     saveAs(blob, (option.fileName || '报表') + '.xlsx')
   })

   console.log('option:::::', option)
   //global .FileSaver
 }

 // 保存为xls文件
 export function SaveAsFile(obj) {
   console.log('SaveAsFile:::::', objectMerge2({}, obj))
   obj = formatTableData(objectMerge2({}, obj))
   // 如果是ie10+则用js-export-excel
   // 否则用lodop
   const isie = IEVersion()
   let uselodop = false
   if (isie !== -1) {
     if (isie !== 'edge' && isie < 10) {
       uselodop = true
     } else {
       uselodop = false
     }
   } else {
     uselodop = false
   }
   if (!uselodop) {
     const summaries = getSummaries(obj)
     const sumObj = {}
     var option = {}
     option.fileName = obj.name
     var optionObj = {
       sheetData: [],
       // sheetName:'sheet',
       sheetFilter: [],
       sheetHeader: []
       // columnWidths: [20, 20]
     }
     obj.columns.forEach((column, index) => {
       optionObj.sheetHeader.push(column.label)
       // optionObj.columnWidths.push(column.width || 120)
       optionObj.sheetFilter.push(column.prop || 'index')
       sumObj[column.prop || 'index'] = summaries[index]
     })
     obj.data.forEach(el => {
       optionObj.sheetData.push(el)
     })
     optionObj.sheetData.push(sumObj)
     option.datas = [optionObj]

     //  SaveExcelByOne(option)
     SaveExcelByTwo(option)
   } else {
     try {
       // by lyy
       // let tableId = createTable(data, columns) // 重新创建打印视图table
       const tableId = createTable(obj) // 重新创建打印视图table
       LODOP = getLodop()

       LODOP.PRINT_INIT('数据表格')
       // LODOP.ADD_PRINT_TABLE(0, 0, 350, 600, document.getElementById(tableId).innerHTML);
       LODOP.ADD_PRINT_TABLE('1%', '1%', '100%', '100%', tableId.innerHTML)
       // LODOP.ADD_PRINT_TABLE(100,20,900,80,document.documentElement.innerHTML);
       LODOP.SET_SAVE_MODE('Orientation', 2) // Excel文件的页面设置：横向打印   1-纵向,2-横向;
       LODOP.SET_SAVE_MODE('PaperSize', 9) // Excel文件的页面设置：纸张大小   9-对应A4
       LODOP.SET_SAVE_MODE('Zoom', 100) // Excel文件的页面设置：缩放比例
       LODOP.SET_SAVE_MODE('CenterHorizontally', true) // Excel文件的页面设置：页面水平居中
       LODOP.SET_SAVE_MODE('CenterVertically', true) // Excel文件的页面设置：页面垂直居中
       //      LODOP.SET_SAVE_MODE("QUICK_SAVE",true);//快速生成（无表格样式,数据量较大时或许用到）
       if (obj.name) {
         LODOP.SAVE_TO_FILE(obj.name + '.xls')
       } else {
         LODOP.SAVE_TO_FILE('新文件名.xls')
       }
     } catch (err) {
       getLodop()
     }
   }
 }
 // 保存为xls文件 普通table
 export function SaveAsSampleFile(obj) {
   try {
     // let tableId = createTable(data, columns) // 重新创建打印视图table
     const tableId = obj.id // 重新创建打印视图table、
     LODOP = getLodop()

     LODOP.PRINT_INIT('数据表格')
     // LODOP.ADD_PRINT_TABLE(0, 0, 350, 600, document.getElementById(tableId).innerHTML);
     LODOP.ADD_PRINT_TABLE('1%', '1%', '100%', '100%', document.getElementById(tableId).innerHTML)
     // LODOP.ADD_PRINT_TABLE(100,20,900,80,document.documentElement.innerHTML);
     LODOP.SET_SAVE_MODE('Orientation', 1) // Excel文件的页面设置：横向打印   1-纵向,2-横向;
     LODOP.SET_SAVE_MODE('PaperSize', 9) // Excel文件的页面设置：纸张大小   9-对应A4
     LODOP.SET_SAVE_MODE('Zoom', 100) // Excel文件的页面设置：缩放比例
     LODOP.SET_SAVE_MODE('CenterHorizontally', true) // Excel文件的页面设置：页面水平居中
     LODOP.SET_SAVE_MODE('CenterVertically', true) // Excel文件的页面设置：页面垂直居中
     // LODOP.SET_SAVE_MODE("QUICK_SAVE",true);//快速生成（无表格样式,数据量较大时或许用到）
     if (obj.name) {
       LODOP.SAVE_TO_FILE(obj.name + '.xls')
     } else {
       LODOP.SAVE_TO_FILE('新文件名.xls')
     }
   } catch (err) {
     getLodop()
   }
 }

 // 检查当前是否有装lodop插件
 export function CheckIsInstall() {
   try {
     var LODOP = getLodop()

     if (LODOP.VERSION) {
       if (LODOP.CVERSION) {
         alert('当前有C-Lodop云打印可用!\n C-Lodop版本:' + LODOP.CVERSION + '(内含Lodop' + LODOP.VERSION + ')')
       } else {
         alert('本机已成功安装了Lodop控件！\n 版本号:' + LODOP.VERSION)
       }
     }
   } catch (err) {
     getLodop()
   }
 }
 // 创建打印机列表
 export function CreatePrinterList() {
   try {
     const iPrinterCount = LODOP.GET_PRINTER_COUNT()
     const arr = new Array()
     for (let i = 0; i < iPrinterCount; i++) {
       arr[i] = LODOP.GET_PRINTER_NAME(i)
     }
     return arr
   } catch (err) {
     getLodop()
   }
 }

 function IEVersion() {
   var userAgent = navigator.userAgent // 取得浏览器的userAgent字符串
   var isIE = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1 // 判断是否IE<11浏览器
   var isEdge = userAgent.indexOf('Edge') > -1 && !isIE // 判断是否IE的Edge浏览器
   var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf('rv:11.0') > -1
   if (isIE) {
     var reIE = new RegExp('MSIE (\\d+\\.\\d+);')
     reIE.test(userAgent)
     var fIEVersion = parseFloat(RegExp['$1'])
     if (fIEVersion == 7) {
       return 7
     } else if (fIEVersion == 8) {
       return 8
     } else if (fIEVersion == 9) {
       return 9
     } else if (fIEVersion == 10) {
       return 10
     } else {
       return 6 // IE版本<=7
     }
   } else if (isEdge) {
     return 'edge' // edge
   } else if (isIE11) {
     return 11 // IE11
   } else {
     return -1 // 不是ie浏览器
   }
 }

 function createTable(obj, noUnit, page, printObj) { // 打印导出创建表格视图
   const data = obj.data // 数据表格
   const columns = obj.columns // 表格设置列
   console.log('data', data)
   console.log('columns', columns)

   // 处理序号问题
   // 简单排序
   // page:
   // {
   // currentPage: 1, //当前页码
   // pageSize: 100 // 显示条数
   // }
   if (!page) {
     page = {
       currentPage: 1,
       pageSize: 100
     }
   }
   data.map((el, index) => {
     el.number = ((page.currentPage - 1) * page.pageSize) + index + 1
   })
   console.log('createTable data', data, page)

   const div = document.createElement('div')
   const table = document.createElement('table')
   const thead = document.createElement('thead')
   const tbody = document.createElement('tbody')
   const tfoot = document.createElement('tfoot')
   const theadTr = document.createElement('tr')
   const tfootTr = document.createElement('tr')
   const colgroup = document.createElement('colgroup') // 设置列宽 无效果
   const summaries = getSummaries(obj, '', noUnit, '')

   // 控制是否换行
   const iswrap = printObj.content_wrap === '1' ? 'normal;word-break: break-all;' : 'nowrap;'

   for (let i = 0; i < columns.length; i++) { // 设置表头
     const th = document.createElement('td')
     const col = document.createElement('col')
     col.setAttribute('width', columns[i].width)
     // th.innerHTML = columns[i].label
     th.style.fontWeight = 600
     th.style.height = '25px'
     th.innerHTML = '<div style="white-space:' + iswrap + 'width:' + columns[i].width + 'px;overflow:hidden;">' + (columns[i].label || '').replace(/\(.*$/, '') + '</div>'

     theadTr.appendChild(th)
     colgroup.appendChild(col)

     const tfoottd = document.createElement('td')
     console.warn(typeof summaries[i], summaries[i])
     tfoottd.innerHTML = '<div style="white-space:' + iswrap + 'width:' + columns[i].width + 'px;overflow:hidden;">' + (Number(summaries[i]) === 0 ? '' : summaries[i]) + '</div>'
     // tfoottd.innerHTML = Number(summaries[i]) === 0 ? '' : summaries[i]
     tfootTr.appendChild(tfoottd)
   }
   table.appendChild(colgroup)
   table.appendChild(thead)
   thead.appendChild(theadTr)

   // 底部备注
   const theadTrRemark = document.createElement('tr')
   theadTrRemark.innerHTML = '<td>备注</td><td colspan="' + (columns.length - 1) + '"></td>'
   tfootTr.appendChild(theadTrRemark)

   table.appendChild(tbody) // 对应列数据填充
   for (let k = 0; k < data.length; k++) {
     const tbodyTr = tbody.insertRow()
     for (let j = 0; j < columns.length; j++) {
       const td = tbodyTr.insertCell()
       // 处理当列没有值、宽度设置等信息时，做默认值处理
       // td.innerHTML = (columns[j].prop === 'id' || columns[j].label === '序号') ? k + 1 : (typeof data[k][columns[j].prop] === 'undefined' ? '' : data[k][columns[j].prop])
       // td.innerHTML = data[k][columns[j].prop] || ''
       td.innerHTML = '<div style="white-space:' + iswrap + 'width:' + columns[j].width + 'px;overflow:hidden;">' + (data[k][columns[j].prop] || '') + '</div>'
       td.style.width = columns[j].width
       //  td.style.whitSpace = iswrap
       // td.setAttribute('width', data[k][columns[j].width])
     }
   }

   table.appendChild(tfoot)
   tfoot.appendChild(tfootTr)

   const tableId = 'dataTable' + String(new Date().getTime()) // 设置打印表格id

   //  table.setAttribute('width', '100%')
   table.setAttribute('border', '1')
   table.style.borderCollapse = 'collapse'
   table.style.fontSize = (printObj.content_word_size || '16') + 'px'
   // table.style.wordBreak = 'break-all';
   // table.style.wordWrap = 'break'
   div.appendChild(table)
   div.setAttribute('id', tableId)
   div.setAttribute('width', '100%')
   return div
   //  document.body.appendChild(div) // 创建table
   createTableComplate = true
   //  return tableId
 }

 function createSettlement(obj) { // 打印创建结算单视图
   console.log(obj)
   const tableId = 'dataTable' + String(new Date().getTime()) // 设置打印表格id
   const div = document.createElement('div')
   const h3 = document.createElement('b') // 标题【结算收款单】
   const infoDiv = document.createElement('div')
   const table = document.createElement('table')
   const thead = document.createElement('thead')
   const tbody = document.createElement('tbody')
   // 添加表头标题
   const theadStr = '<tr><th rowspan="2" style="background-color:#f5f7fa;">序号</th><th rowspan="2" style="background-color:#f5f7fa;width:50%;">费用</th><th colspan="10" style="background-color:#f5f7fa;">&nbsp;</th></tr>' +
     '<tr style="background-color:#f5f7fa;"><th style="background-color:#f5f7fa;">千</th><th style="background-color:#f5f7fa;">百</th><th style="background-color:#f5f7fa;">十</th><th style="background-color:#f5f7fa;">万</th><th style="background-color:#f5f7fa;">千</th><th style="background-color:#f5f7fa;">百</th><th style="background-color:#f5f7fa;">十</th><th style="background-color:#f5f7fa;">元</th><th style="background-color:#f5f7fa;">角</th><th style="background-color:#f5f7fa;">元</th></tr>'
   h3.innerHTML = '结 算 收 款 单'
   let tbodyStr = '' // 添加数据行
   for (let i = 0; i < obj.detailDtoList2.length; i++) {
     tbodyStr += '<tr style="min-height: 36px;">'
     tbodyStr += '<td>' + (i + 1) + '</td>' + '<td>' + obj.detailDtoList2[i].dataName + '</td>' +
       '<td>' + (obj.detailDtoList2[i].tenMillion ? obj.detailDtoList2[i].tenMillion : '') + '</td>' +
       '<td>' + (obj.detailDtoList2[i].million ? obj.detailDtoList2[i].million : '') + '</td>' +
       '<td>' + (obj.detailDtoList2[i].oneHundrenThousand ? obj.detailDtoList2[i].oneHundrenThousand : '') + '</td>' +
       '<td>' + (obj.detailDtoList2[i].tenThousand ? obj.detailDtoList2[i].tenThousand : '') + '</td>' +
       '<td>' + (obj.detailDtoList2[i].thousand ? obj.detailDtoList2[i].thousand : '') + '</td>' +
       '<td>' + (obj.detailDtoList2[i].hundren ? obj.detailDtoList2[i].hundren : '') + '</td>' +
       '<td>' + (obj.detailDtoList2[i].ten ? obj.detailDtoList2[i].ten : '') + '</td>' +
       '<td>' + (obj.detailDtoList2[i].yuan ? obj.detailDtoList2[i].yuan : '') + '</td>' +
       '<td>' + (obj.detailDtoList2[i].jiao ? obj.detailDtoList2[i].jiao : '') + '</td>' +
       '<td>' + (obj.detailDtoList2[i].fen ? obj.detailDtoList2[i].fen : '') + '</td>'
     tbodyStr += '</tr>'
   }
   // 添加表尾合计
   tbodyStr += '<tr style="height:36px;"><td>合计</td><td style="text-align:left;">大写：' + obj.amountMessage + '</td>' +
     '<td colspan="10" style="text-align:left;">小写：' + obj.amount + ' 元</td>'
   // 结算单信息
   const infoStr = '<p style="margin:0;padding:0;">单据号<label style="border-bottom:1px solid black;padding:0 20px 0 ;margin-left: 10px;">' +
     obj.settlementSn + '</label></p><p style="margin:0;padding:0;">发生时间<label style="border-bottom:1px solid black;padding:0 20px 0 ;margin-left: 10px;">' +
     obj.settlementTime + '</label></p><p style="margin:0;padding:0;">经办人<label style="border-bottom:1px solid black;padding:0 20px 0 ;margin-left: 10px;">' +
     obj.settlementBy + '</label></p>'

   div.setAttribute('id', tableId)
   div.setAttribute('style', "text-align:center;width:100%;font-family:'微软雅黑';font-size:10px")
   h3.setAttribute('style', 'border-bottom: 2px solid black;margin-left:calc(50% - 80px);font-size:1.6rem;')
   table.setAttribute('style', "width: 100%;text-align:center;font-size:0.8rem;font-family:'微软雅黑';margin-top:0.8rem;")
   thead.setAttribute('style', "background-color: '#EEEEEE';font-weight:400;")
   table.setAttribute('border', '1px solid black')
   table.style.borderCollapse = 'collapse'
   infoDiv.setAttribute('style', 'width:100%;display: inline-flex;flex-direction: row;line-height: 1.3rem;margin-top: 2rem;margin-bottom: 1rem;justify-content: space-between;font-size:1rem;')
   thead.innerHTML = theadStr
   tbody.innerHTML = tbodyStr
   infoDiv.innerHTML = infoStr
   div.appendChild(h3)
   div.appendChild(infoDiv)
   table.appendChild(thead)
   table.appendChild(tbody)
   div.appendChild(table)

   document.body.appendChild(div)
   return tableId
 }