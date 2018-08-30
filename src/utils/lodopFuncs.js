 import { getSummaries } from './index'
 // import ExportJsonExcel from 'js-export-excel'
//  const ExportJsonExcel = require('js-export-excel')
 const ExportJsonExcel = require('./excel')
//  console.log('ExportJsonExcel:', ExportJsonExcel)

 var CreatedOKLodop7766 = null
 var createTableComplate = false
 // var downloadPath = 'http://www.lodop.net/download/CLodop_Setup_for_Win64NT_3.046Extend.zip'
 // const downloadPath = 'https://aflc.oss-cn-shenzhen.aliyuncs.com/plugin/tms_web_plugin.rar'
 const downloadPath = 'https://aflc.oss-cn-shenzhen.aliyuncs.com/plugin/28tms_win32_cLodop_20180821.exe'

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
     if ((verTrident == null) && (verIE == null) && (x64 !== null)) { return true } else
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
   } catch (err) { return true }
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
       try { LODOP = getCLodop() } catch (err) {}
       if (!LODOP && document.readyState !== 'complete') { alert('C-Lodop没准备好，请稍后再试！'); return }
       if (!LODOP) {
         if (isIE) document.write(strCLodopInstall)
         else { var conf = confirm('没有安装LODOP云打印插件,确认下载？') }
         if (conf) {
           window.open(downloadPath)
         }
         // document.body.innerHTML = strCLodopInstall + document.body.innerHTML;
         return false
       } else {
         if (CLODOP.CVERSION < '3.0.4.3') {
           if (isIE) document.write(strCLodopUpdate)
           else { document.body.innerHTML = strCLodopUpdate + document.body.innerHTML }
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
         if (navigator.userAgent.indexOf('Chrome') >= 0) { document.body.innerHTML = strHtmChrome + document.body.innerHTML }
         if (navigator.userAgent.indexOf('Firefox') >= 0) { document.body.innerHTML = strHtmFireFox + document.body.innerHTML }
         if (is64IE) document.write(strHtm64_Install)
         else
         if (isIE) document.write(strHtmInstall)
         else { document.body.innerHTML = strHtmInstall + document.body.innerHTML }
         return LODOP
       }
     }
     if (LODOP.VERSION < '6.2.2.3') {
       if (!needCLodop()) {
         if (is64IE) document.write(strHtm64_Update)
         else
         if (isIE) document.write(strHtmUpdate)
         else { document.body.innerHTML = strHtmUpdate + document.body.innerHTML }
       }
       return LODOP
     }
     // ===如下空白位置适合调用统一功能(如注册语句、语言选择等):===

     // ===========================================================
     return LODOP
   } catch (err) { alert('getLodop出错:' + err) }
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
   try {
     // let tableId = createTable(data, columns) // 重新创建打印视图table
     obj = formatTableData(obj)
     const tableId = createTable(obj) // 重新创建打印视图table
     LODOP = getLodop()
     LODOP.PRINT_INIT('订货单')
     // LODOP.SET_PRINT_STYLE("FontSize", 10);
     // LODOP.SET_PRINT_STYLE("FontName", "微软雅黑")
     // LODOP.SET_PRINT_STYLE("Bold", 1);
     LODOP.SET_PRINT_PAGESIZE(2, 0, 0, 'A4')
     // LODOP.ADD_PRINT_TEXT(50, 231, 260, 39, "打印页面部分内容");
     LODOP.ADD_PRINT_TABLE('1%', '1%', '98%', '100%', document.getElementById(tableId).innerHTML)
     // LODOP.SET_PREVIEW_WINDOW(0, 0, 0, 800, 600, "");
     LODOP.SET_SHOW_MODE('LANDSCAPE_DEFROTATED', 1) // 横向时的正向显示
     LODOP.PREVIEW()
   } catch (err) {
     getLodop()
   }
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
     LODOP.SET_PRINT_PAGESIZE(1, 0, 0, 'A4')
     // LODOP.ADD_PRINT_TEXT(50, 231, 260, 39, "打印页面部分内容");
     LODOP.ADD_PRINT_TABLE('1%', '1%', '98%', '100%', document.getElementById(tableId).innerHTML)
     // LODOP.SET_PREVIEW_WINDOW(0, 0, 0, 800, 600, "");
     LODOP.SET_SHOW_MODE('LANDSCAPE_DEFROTATED', 1) // 横向时的正向显示
     LODOP.PREVIEW()
   } catch (err) {
     getLodop()
   }
 }
 // 打印合同
 export function PrintContract(obj) {
   try {
     const tableId = obj
     LODOP = getLodop()
     LODOP.PRINT_INIT('合同')
     LODOP.SET_PRINT_STYLE('FontSize', 14)
     // LODOP.SET_PRINT_STYLE("FontName", "微软雅黑")
     LODOP.SET_PRINT_STYLE('Bold', 1)
     LODOP.SET_PRINT_PAGESIZE(1, 0, 0, 'A4')
     // LODOP.ADD_PRINT_TEXT(50, 231, 260, 39, "打印页面部分内容");
     console.log(obj)
     LODOP.ADD_PRINT_HTM('1%', '1%', '98%', '100%', 'URL:' + obj)
     // LODOP.ADD_PRINT_HTM("1%", "1%", "98%", "100%", document.getElementById(tableId).innerHTML);
     // LODOP.SET_PREVIEW_WINDOW(0, 0, 0, 800, 600, "");
     LODOP.SET_SHOW_MODE('LANDSCAPE_DEFROTATED', 1) // 横向时的正向显示
     LODOP.PREVIEW()
   } catch (err) {
     getLodop()
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
     LODOP.ADD_PRINT_SETUP_BKIMG('D:\\company\\program\\TMS\\print\\运单背景图')
     eval(info)
     // LODOP.PRINT_SETUP()
     LODOP.PREVIEW()
   } catch (err) {
     getLodop()
   }
 }
 // 创建打印页面    【未保存】标签或运单
 export function CreatePrintPageEnable(info) {
   try {
     LODOP.SET_PRINT_MODE('WINDOW_DEFPRINTER', 'KZDesigner GK888t (EPL)')
     LODOP = getLodop()
     let arr = new Array()
     arr = Object.assign([], info)
     let str = ''
     arr.forEach((e, index) => {
       if (e.filedValue === 'setting') {
         str += 'LODOP.PRINT_INIT(' + e.topy + ',' + e.leftx + ',' + e.width + ',' + e.height + ',"青春物流流托运单打印");'
       } else {
         str += 'LODOP.ADD_PRINT_TEXT(' + e.topy + ',' + e.leftx + ',' + e.width + ',' + e.height + ',"' + e.filedName + ':' + e.value + '");'
         str += 'LODOP.SET_PRINT_STYLEA(0,"FontSize",' + e.fontsize + ');'
       }
     })
     eval(str)
     // LODOP.PRINT_SETUP()
     LODOP.PREVIEW()
   } catch (err) {
     getLodop()
   }
 }

 // 格式化数据
 function formatTableData(obj) {
   obj.data.forEach((el, k) => {
     obj.columns.forEach((column, j) => {
       if (column.prop === 'id' || column.label === '序号') {
         el[column.prop] = k + 1
       }
       if (typeof el[column.prop] === 'undefined') {
         el[column.prop] = ''
       }
       column.width = column.width || 120
     })
   })
   return obj
 }

 // 保存为xls文件
 export function SaveAsFile(obj) {
   obj = formatTableData(obj)
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
       optionObj.sheetFilter.push(column.prop)
       sumObj[column.prop] = summaries[index]
     })
     obj.data.forEach(el => {
       optionObj.sheetData.push(el)
     })
     optionObj.sheetData.push(sumObj)
     option.datas = [optionObj]
     var toExcel = new ExportJsonExcel['js-export-excel'](option) // new
    //  var toExcel = new ExportJsonExcel(option) // new
     toExcel.saveExcel() // 保存
   } else {
     try {
     // let tableId = createTable(data, columns) // 重新创建打印视图table
       const tableId = createTable(obj) // 重新创建打印视图table
       LODOP = getLodop()
       LODOP.PRINT_INIT('数据表格')
     // LODOP.ADD_PRINT_TABLE(0, 0, 350, 600, document.getElementById(tableId).innerHTML);
       LODOP.ADD_PRINT_TABLE('1%', '1%', '100%', '100%', document.getElementById(tableId).innerHTML)
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
       if (LODOP.CVERSION) { alert('当前有C-Lodop云打印可用!\n C-Lodop版本:' + LODOP.CVERSION + '(内含Lodop' + LODOP.VERSION + ')') } else { alert('本机已成功安装了Lodop控件！\n 版本号:' + LODOP.VERSION) }
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
       return 6// IE版本<=7
     }
   } else if (isEdge) {
     return 'edge'// edge
   } else if (isIE11) {
     return 11 // IE11
   } else {
     return -1// 不是ie浏览器
   }
 }

 function createTable(obj) { // 打印导出创建表格视图
   const data = obj.data // 数据表格
   const columns = obj.columns // 表格设置列

   const div = document.createElement('div')
   const table = document.createElement('table')
   const thead = document.createElement('thead')
   const tbody = document.createElement('tbody')
   const tfoot = document.createElement('tfoot')
   const theadTr = document.createElement('tr')
   const tfootTr = document.createElement('tr')
   const colgroup = document.createElement('colgroup') // 设置列宽 无效果
   const summaries = getSummaries(obj)

   for (let i = 0; i < columns.length; i++) { // 设置表头
     const th = document.createElement('td')
     const col = document.createElement('col')
     col.setAttribute('width', columns[i].width)
     th.innerHTML = columns[i].label
     th.style.fontWeight = 600

     theadTr.appendChild(th)
     colgroup.appendChild(col)

     const tfoottd = document.createElement('td')
     tfoottd.innerHTML = summaries[i]
     tfootTr.appendChild(tfoottd)
   }
   table.appendChild(colgroup)
   table.appendChild(thead)
   thead.appendChild(theadTr)

   table.appendChild(tbody) // 对应列数据填充
   for (let k = 0; k < data.length; k++) {
     const tbodyTr = tbody.insertRow()
     for (let j = 0; j < columns.length; j++) {
       const td = tbodyTr.insertCell()
       // 处理当列没有值、宽度设置等信息时，做默认值处理
      // td.innerHTML = (columns[j].prop === 'id' || columns[j].label === '序号') ? k + 1 : (typeof data[k][columns[j].prop] === 'undefined' ? '' : data[k][columns[j].prop])
       td.innerHTML = data[k][columns[j].prop]
       td.style.width = data[k][columns[j].width] + 'px'
       // td.setAttribute('width', data[k][columns[j].width])
     }
   }

   table.appendChild(tfoot)
   tfoot.appendChild(tfootTr)

   const tableId = 'dataTable' + String(new Date().getTime()) // 设置打印表格id

   table.setAttribute('width', '1200px')
   table.setAttribute('border', '1px solid #999')
   table.style.borderCollapse = 'collapse'
   table.style.fontSize = '12px'
   // table.style.wordBreak = 'break-all';
   // table.style.wordWrap = 'break'
   div.appendChild(table)
   div.setAttribute('id', tableId)
   div.setAttribute('width', '100%')
   document.body.appendChild(div) // 创建table
   createTableComplate = true
   return tableId
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
   const infoStr = '<p style="margin:0;padding:0;">单据号<label style="border-bottom:1px solid #333;padding:0 20px 0 ;margin-left: 10px;">' +
     obj.settlementSn + '</label></p><p style="margin:0;padding:0;">发生时间<label style="border-bottom:1px solid #333;padding:0 20px 0 ;margin-left: 10px;">' +
     obj.settlementTime + '</label></p><p style="margin:0;padding:0;">经办人<label style="border-bottom:1px solid #333;padding:0 20px 0 ;margin-left: 10px;">' +
     obj.settlementBy + '</label></p>'

   div.setAttribute('id', tableId)
   div.setAttribute('style', "text-align:center;width:100%;font-family:'微软雅黑';font-size:10px")
   h3.setAttribute('style', 'border-bottom: 2px solid #333;margin-left:calc(50% - 80px);font-size:1.6rem;')
   table.setAttribute('style', "width: 100%;text-align:center;font-size:0.8rem;font-family:'微软雅黑';margin-top:0.8rem;")
   thead.setAttribute('style', "background-color: '#EEEEEE';font-weight:400;")
   table.setAttribute('border', '1px solid #999')
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
