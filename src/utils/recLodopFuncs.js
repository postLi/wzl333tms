var CreatedOKLodop7766 = null
var createTableComplate = false
// var downloadPath = 'http://www.lodop.net/download/CLodop_Setup_for_Win64NT_3.046Extend.zip'
const downloadPath = 'https://aflc.oss-cn-shenzhen.aliyuncs.com/plugin/tms_web_plugin.rar'
import {objectMerge2} from '@/utils/index'

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
    } else if (verFF !== null) {
      verFF = verFF[0].match(/\d+/)
      if ((verFF[0] >= 41) || (x64 !== null)) return true
    } else if (verOPR !== null) {
      verOPR = verOPR[0].match(/\d+/)
      if (verOPR[0] >= 32) return true
    } else if ((verTrident == null) && (verIE == null)) {
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
      } catch (err) {
      }
      if (!LODOP && document.readyState !== 'complete') {
        alert('C-Lodop没准备好，请稍后再试！');
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
      if ((LODOP == null) || (typeof (LODOP.VERSION) === 'undefined')) {
        if (navigator.userAgent.indexOf('Chrome') >= 0) {
          document.body.innerHTML = strHtmChrome + document.body.innerHTML
        }
        if (navigator.userAgent.indexOf('Firefox') >= 0) {
          document.body.innerHTML = strHtmFireFox + document.body.innerHTML
        }
        if (is64IE) document.write(strHtm64_Install)
        else if (isIE) document.write(strHtmInstall)
        else {
          document.body.innerHTML = strHtmInstall + document.body.innerHTML
        }
        return LODOP
      }
    }
    if (LODOP.VERSION < '6.2.2.3') {
      if (!needCLodop()) {
        if (is64IE) document.write(strHtm64_Update)
        else if (isIE) document.write(strHtmUpdate)
        else {
          document.body.innerHTML = strHtmUpdate + document.body.innerHTML
        }
      }
      return LODOP
    }
    // ===如下空白位置适合调用统一功能(如注册语句、语言选择等):===

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
  try {
    // let tableId = createTable(data, columns) // 重新创建打印视图table
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
    info = info.replace('PRINT_INITA', 'PRINT_INIT')
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

// 保存为xls文件
export function SaveAsFileCarrier(obj) {
  try {
    // let tableId = createTable(data, columns) // 重新创建打印视图table
    const tableId = createCarrier(obj.data) // 重新创建打印视图table
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
      LODOP.SAVE_TO_FILE(obj.name + '_' + (new Date().getTime()) + '.xls')
    } else {
      LODOP.SAVE_TO_FILE('新文件名.xls')
    }
  } catch (err) {
    console.log(err);
    getLodop()
  }
}

export function SaveAsFileGroup(obj) {
  try {
    // let tableId = createTable(data, columns) // 重新创建打印视图table
    const tableId = createGroup(obj.data) // 重新创建打印视图table
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
      LODOP.SAVE_TO_FILE(obj.name + '_' + (new Date().getTime()) + '.xls')
    } else {
      LODOP.SAVE_TO_FILE('新文件名.xls')
    }
  } catch (err) {
    console.log(err);
    getLodop()
  }
}

export function SaveAsFileCustomer(obj) {
  try {
    // let tableId = createTable(data, columns) // 重新创建打印视图table
    const tableId = createCustomer(obj.data) // 重新创建打印视图table
    // console.log(obj);
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
      LODOP.SAVE_TO_FILE(obj.name + '_' + (new Date().getTime()) + '.xls')
    } else {
      LODOP.SAVE_TO_FILE('新文件名.xls')
    }
  } catch (err) {
    getLodop()
  }
}


export function SaveAsFileCarfeefeeShort(obj) {
  try {
    // let tableId = createTable(data, columns) // 重新创建打印视图table
    const tableId = createCarfeefeeShort(obj.data) // 重新创建打印视图table
    // console.log(obj);
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
      LODOP.SAVE_TO_FILE(obj.name + '_' + (new Date().getTime()) + '.xls')
    } else {
      LODOP.SAVE_TO_FILE('新文件名.xls')
    }
  } catch (err) {
    console.log(err);
    getLodop()
  }
}

export function SaveAsFileCarfeefeeArt(obj) {
  try {
    // let tableId = createTable(data, columns) // 重新创建打印视图table
    const tableId = createCarfeefeeArt(obj.data) // 重新创建打印视图table
    // console.log(obj);
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
      LODOP.SAVE_TO_FILE(obj.name + '_' + (new Date().getTime()) + '.xls')
    } else {
      LODOP.SAVE_TO_FILE('新文件名.xls')
    }
  } catch (err) {
    console.log(err);
    getLodop()
  }
}

//

export function SaveAsFileCarfeeDeliver(obj) {
  try {
    // let tableId = createTable(data, columns) // 重新创建打印视图table
    const tableId = createCarfeefeeDeliver(obj.data) // 重新创建打印视图table
    // console.log(obj);
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
      LODOP.SAVE_TO_FILE(obj.name + '_' + (new Date().getTime()) + '.xls')
    } else {
      LODOP.SAVE_TO_FILE('新文件名.xls')
    }
  } catch (err) {
    console.log(err);
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

function createTables(obj) { // obj-页面数据 对象
  let id = ''
  for (const item in obj) {
    id += createTable(obj[item])
  }
  return id
}

function createTable(obj) { // 打印导出创建表格视图
  const data = obj.data // 数据表格
  const columns = obj.columns // 表格设置列

  const div = document.createElement('div')
  const table = document.createElement('table')
  const thead = document.createElement('thead')
  const tbody = document.createElement('tbody')
  const theadTr = document.createElement('tr')
  const colgroup = document.createElement('colgroup') // 设置列宽 无效果

  for (let i = 0; i < columns.length; i++) { // 设置表头
    const th = document.createElement('td')
    const col = document.createElement('col')
    col.setAttribute('width', columns[i].width)
    th.innerHTML = columns[i].label
    th.style.fontWeight = 600

    theadTr.appendChild(th)
    colgroup.appendChild(col)
  }
  table.appendChild(colgroup)
  table.appendChild(thead)
  thead.appendChild(theadTr)

  table.appendChild(tbody) // 对应列数据填充
  for (let k = 0; k < data.length; k++) {
    const tbodyTr = tbody.insertRow()
    for (let j = 0; j < columns.length; j++) {
      const td = tbodyTr.insertCell()
      td.innerHTML = data[k][columns[j].prop]
      td.style.width = data[k][columns[j].width] + 'px'
    }
  }
  const tableId = 'dataTable' + String(new Date().getTime()) // 设置打印表格id
  table.setAttribute('width', '100%')
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

//承运商
function createCarrier(params) {
  // console.log(params,params)
  let dealInfo = []
  let dealPayInfo = []
  let alreadyInfo = []
  let alreadyPayInfo = []
  params.carrierDetailDtoList.forEach(function (el, val) {
    if (el.type === 1) {
      dealInfo.push(el)
    }
    else if (el.type === 2) {
      dealPayInfo.push(el)
    }
    else if (el.type === 3) {
      alreadyInfo.push(el)
    }
    else {
      alreadyPayInfo.push(el)
    }
  })

  //初始化tmsFinanceBillCheckDto
  for (var i in params.tmsFinanceBillCheckDto) {
    params.tmsFinanceBillCheckDto[i] = params.tmsFinanceBillCheckDto[i] === null ? '' : params.tmsFinanceBillCheckDto[i]
  }
  //初始化dealInfo
  const tableId = 'dataTable' + String(new Date().getTime()) // 设置打印表格id
  const div = document.createElement('div')
  const infoDiv = document.createElement('font')
  infoDiv.setAttribute('size', '2')
  const table = document.createElement('table')
  div.id = tableId
  const thead = document.createElement('thead')
  const tbody = document.createElement('tbody')
  table.style.border = '1px solid #ff000';
  table.setAttribute('border', '1')
  table.setAttribute('font', '12px')
  table.setAttribute('width', '1800')
  table.setAttribute('table-layout', 'fixed')
  tbody.setAttribute('style', "text-align:center;")
  var theadStr = ''
  // 标题
  theadStr = `
    <tr>
      <td colspan="16" style="text-align: center;border:1px double red;margin-left: -1px;margin-top: -1px;height:60px;font-weight: 500;font-size: 14px" >${params.tmsFinanceBillCheckDto.checkBillName}</td>
    </tr>
   `
  let tbodyStr = ` <tr>
    <td width="5%" height="25px" >承运商名称 </td>
    <td colspan="3" width="20%" >${params.tmsFinanceBillCheckDto.memberName}</td>
    <td width="5%"  height="25px" >业务负责人</td>
    <td colspan="3" width="20%" >${params.tmsFinanceBillCheckDto.memberPerson}</td>
    <td width="5%" height="25px" >联系方式</td>
    <td colspan="3" width="20%" >${params.tmsFinanceBillCheckDto.memberPersonPhone}</td>
    <td width="5%" height="25px" >对账单编号 </td>
    <td colspan="3" width="15%" >${params.tmsFinanceBillCheckDto.checkBillCode}</td>
  </tr>
   <tr>
      <td width="5%" height="25px">客户编号</td>
      <td colspan="3" width="20%" >${params.tmsFinanceBillCheckDto.memberCode}</td>
      <td width="5%" height="25px">开始时间</td>
      <td colspan="3" width="20%" > ${params.tmsFinanceBillCheckDto.checkStartTime}</td>
      <td width="5%" height="25px">结束时间 </td>
      <td colspan="3" width="20%" >${params.tmsFinanceBillCheckDto.checkEndTime}</td>
      <td width="5%" height="25px">结算方式</td>
      <td colspan="3" width="20%" >${params.tmsFinanceBillCheckDto.settlementType}</td>
  </tr>
  <tr>
    <td width="5%" >账户账号</td>
    <td colspan="3">${params.tmsFinanceBillCheckDto.bankAccount}</td>
    <td width="5%" >账户开户行 </td>
    <td colspan="3" >${params.tmsFinanceBillCheckDto.bankName}</td>
    <td width="5%" >财务负责人</td>
    <td colspan="3" >${params.tmsFinanceBillCheckDto.financialOfficer}</td>
    <td width="5%">财务联系电话</td>
    <td colspan="3" >${params.tmsFinanceBillCheckDto.financialOfficerPhone}</td>
  </tr>
  <tr>
      <td >支付宝 </td>
      <td colspan="3">${params.tmsFinanceBillCheckDto.alipayAccount}</td>
      <td >微信</td>
      <td colspan="11">${params.tmsFinanceBillCheckDto.wechatAccount}</td>
  </tr>`
  //dealInfo
  tbodyStr = tbodyStr + `
    <tr>
        <td colspan="16" bgcolor="yellow" align="left">应收清单 </td>
    </tr>
  `
  tbodyStr = tbodyStr + `<tr>
          <td colspan="1">序号</td>
          <td colspan="1">中转时间</td>
          <td colspan="1">运单号</td>
          <td colspan="1">中转单号</td>
          <td colspan="1">出发城市</td>
          <td colspan="1">到达城市</td>
          <td colspan="1">货品名</td>
          <td colspan="1">件数</td>
          <td colspan="1">交接方式</td>
          <td colspan="1">异常类型</td>
          <td colspan="1">异常件数</td>
          <td colspan="1">异常费用</td>
          <td colspan="1">到付款</td>
          <td colspan="1">代收货款</td>
          <td colspan="1">小计</td>
          <td colspan="1">备注</td>
      </tr>`

  for (let i = 0; i < dealInfo.length; i++) {
    tbodyStr += `
             <tr>
              <td colspan="1">${i + 1}</td>
              <td colspan="1">${dealInfo[i].createTime ? dealInfo[i].createTime : ''}</td>
              <td colspan="1">${dealInfo[i].shipSn ? dealInfo[i].shipSn : ''}</td>
              <td colspan="1">${dealInfo[i].oddNumbers ? dealInfo[i].oddNumbers : ''} </td>
              <td colspan="1">${dealInfo[i].shipFromCityName ? dealInfo[i].shipFromCityName : ''}</td>
              <td colspan="1">${dealInfo[i].shipToCityName ? dealInfo[i].shipToCityName : ''}</td>
              <td colspan="1">${dealInfo[i].cargoName ? dealInfo[i].cargoName : ''}</td>
              <td colspan="1">${dealInfo[i].cargoAmount ? dealInfo[i].cargoAmount : ''}</td>
              <td colspan="1">${dealInfo[i].shipDeliveryMethod ? dealInfo[i].shipDeliveryMethod : ''}</td>
              <td colspan="1">${dealInfo[i].abnormalType ? dealInfo[i].abnormalType : ''}</td>
              <td colspan="1">${dealInfo[i].abnormalAmount ? dealInfo[i].abnormalAmount : ''}</td>
              <td colspan="1">${dealInfo[i].registerFee ? dealInfo[i].registerFee : ''}</td>
              <td colspan="1">${dealInfo[i].shipArrivepayFee ? dealInfo[i].shipArrivepayFee : ''}</td>
              <td colspan="1">${dealInfo[i].agencyFund ? dealInfo[i].agencyFund : ''}</td>
              <td colspan="1">${dealInfo[i].totalFee ? dealInfo[i].totalFee : ''}</td>
              <td colspan="1">${dealInfo[i].remark ? dealInfo[i].remark : ''}</td>
            </tr>
    `
  }
  //dealInfo
  //dealPayInfo
  tbodyStr = tbodyStr + `
    <tr>
        <td colspan="16" bgcolor="rgb(255,193,0)" align="left">应付清单 </td>
    </tr>
  `
  tbodyStr = tbodyStr + `
          <td colspan="1">序号</td>
          <td colspan="1">中转时间</td>
          <td colspan="1">运单号</td>
          <td colspan="1">中转单号</td>
          <td colspan="1">出发城市</td>
          <td colspan="1">到达城市</td>
          <td colspan="1">货品名</td>
          <td colspan="1">件数</td>
          <td colspan="1">交接方式</td>
          <td colspan="1">中转付款方式</td>
          <td colspan="1">中转费</td>
          <td colspan="1">中转送货费</td>
          <td colspan="1">中转其他费</td>
          <td colspan="1">中转费合计</td>
          <td colspan="1">备注</td>
      </tr>`
  // tbodyStr = tbodyStr
  for (let i = 0; i < dealPayInfo.length; i++) {
    tbodyStr += `
             <tr>
              <td colspan="1">${i + 1}</td>
              <td colspan="1">${dealPayInfo[i].createTime ? dealPayInfo[i].createTime : ''}</td>
              <td colspan="1">${dealPayInfo[i].shipSn ? dealPayInfo[i].shipSn : ''}</td>
              <td colspan="1">${dealPayInfo[i].oddNumbers ? dealPayInfo[i].oddNumbers : ''} </td>
              <td colspan="1">${dealPayInfo[i].shipFromCityName ? dealPayInfo[i].shipFromCityName : ''}</td>
              <td colspan="1">${dealPayInfo[i].shipToCityName ? dealPayInfo[i].shipToCityName : ''}</td>
              <td colspan="1">${dealPayInfo[i].cargoName ? dealPayInfo[i].cargoName : ''}</td>
              <td colspan="1">${dealPayInfo[i].cargoAmount ? dealPayInfo[i].cargoAmount : ''}</td>
              <td colspan="1">${dealPayInfo[i].shipDeliveryMethod ? dealPayInfo[i].shipDeliveryMethod : ''}</td>
              <td colspan="1">${dealPayInfo[i].paymentMethod ? dealPayInfo[i].paymentMethod : ''}</td>
              <td colspan="1">${dealPayInfo[i].transferCharge ? dealPayInfo[i].transferCharge : ''}</td>
              <td colspan="1">${dealPayInfo[i].deliveryExpense ? dealPayInfo[i].deliveryExpense : ''}</td>
              <td colspan="1">${dealPayInfo[i].transferOtherFee ? dealPayInfo[i].transferOtherFee : ''}</td>
              <td colspan="1">${dealPayInfo[i].totalCost ? dealPayInfo[i].totalCost : ''}</td>
              <td colspan="1">${dealPayInfo[i].remark ? dealPayInfo[i].remark : ''}</td>
            </tr>
    `
  }
  //dealPayInfo
  //alreadyInfo
  tbodyStr = tbodyStr + `
    <tr>
        <td colspan="16" bgcolor="yellow" align="left">已收清单(本结算期内) </td>
    </tr>
  `
  tbodyStr = tbodyStr + `<tr>
          <td colspan="1">序号</td>
          <td colspan="1">中转时间</td>
          <td colspan="1">运单号</td>
          <td colspan="1">中转单号</td>
          <td colspan="1">出发城市</td>
          <td colspan="1">到达城市</td>
          <td colspan="1">货品名</td>
          <td colspan="1">件数</td>
          <td colspan="1">交接方式</td>
          <td colspan="1">异常类型</td>
          <td colspan="1">异常件数</td>
          <td colspan="1">异常费用</td>
          <td colspan="1">到付款</td>
          <td colspan="1">代收货款</td>
          <td colspan="1">小计</td>
          <td colspan="1">备注</td>
      </tr>`
  for (let i = 0; i < alreadyInfo.length; i++) {
    tbodyStr += `
             <tr>
              <td colspan="1">${i + 1}</td>
              <td colspan="1">${alreadyInfo[i].createTime ? alreadyInfo[i].createTime : ''}</td>
              <td colspan="1">${alreadyInfo[i].shipSn ? alreadyInfo[i].shipSn : ''}</td>
              <td colspan="1">${alreadyInfo[i].oddNumbers ? alreadyInfo[i].oddNumbers : ''} </td>
              <td colspan="1">${alreadyInfo[i].shipFromCityName ? alreadyInfo[i].shipFromCityName : ''}</td>
              <td colspan="1">${alreadyInfo[i].shipToCityName ? alreadyInfo[i].shipToCityName : ''}</td>
              <td colspan="1">${alreadyInfo[i].cargoName ? alreadyInfo[i].cargoName : ''}</td>
              <td colspan="1">${alreadyInfo[i].cargoAmount ? alreadyInfo[i].cargoAmount : ''}</td>
              <td colspan="1">${alreadyInfo[i].shipDeliveryMethod ? alreadyInfo[i].shipDeliveryMethod : ''}</td>
              <td colspan="1">${alreadyInfo[i].abnormalType ? alreadyInfo[i].abnormalType : ''}</td>
              <td colspan="1">${alreadyInfo[i].abnormalAmount ? alreadyInfo[i].abnormalAmount : ''}</td>
              <td colspan="1">${alreadyInfo[i].registerFee ? alreadyInfo[i].registerFee : ''}</td>
              <td colspan="1">${alreadyInfo[i].shipArrivepayFee ? alreadyInfo[i].shipArrivepayFee : ''}</td>
              <td colspan="1">${alreadyInfo[i].agencyFund ? alreadyInfo[i].agencyFund : ''}</td>
              <td colspan="1">${alreadyInfo[i].totalFee ? alreadyInfo[i].totalFee : ''}</td>
              <td colspan="1">${alreadyInfo[i].remark ? alreadyInfo[i].remark : ''}</td>
            </tr>
    `
  }
  //dealPayInfo
  //alreadyPayInfo
  tbodyStr = tbodyStr + `
    <tr>
        <td colspan="16" bgcolor="rgb(255,193,0)" align="left">已付清单(本结算期内) </td>
    </tr>
  `
  tbodyStr = tbodyStr + `<tr>
          <td colspan="1">序号</td>
          <td colspan="1">中转时间</td>
          <td colspan="1">运单号</td>
          <td colspan="1">中转单号</td>
          <td colspan="1">出发城市</td>
          <td colspan="1">到达城市</td>
          <td colspan="1">货品名</td>
          <td colspan="1">件数</td>
          <td colspan="1">交接方式</td>
          <td colspan="1">异常类型</td>
          <td colspan="1">异常件数</td>
          <td colspan="1">异常费用</td>
          <td colspan="1">到付款</td>
          <td colspan="1">代收货款</td>
          <td colspan="1">小计</td>
          <td colspan="1">备注</td>
      </tr>`
  for (let i = 0; i < alreadyPayInfo.length; i++) {
    tbodyStr += `
             <tr>
              <td colspan="1">${i + 1}</td>
              <td colspan="1">${alreadyPayInfo[i].createTime ? alreadyPayInfo[i].createTime : ''}</td>
              <td colspan="1">${alreadyPayInfo[i].shipSn ? alreadyPayInfo[i].shipSn : ''}</td>
              <td colspan="1">${alreadyPayInfo[i].oddNumbers ? alreadyPayInfo[i].oddNumbers : ''} </td>
              <td colspan="1">${alreadyPayInfo[i].shipFromCityName ? alreadyPayInfo[i].shipFromCityName : ''}</td>
              <td colspan="1">${alreadyPayInfo[i].shipToCityName ? alreadyPayInfo[i].shipToCityName : ''}</td>
              <td colspan="1">${alreadyPayInfo[i].cargoName ? alreadyPayInfo[i].cargoName : ''}</td>
              <td colspan="1">${alreadyPayInfo[i].cargoAmount ? alreadyPayInfo[i].cargoAmount : ''}</td>
              <td colspan="1">${alreadyPayInfo[i].shipDeliveryMethod ? alreadyPayInfo[i].shipDeliveryMethod : ''}</td>
              <td colspan="1">${alreadyPayInfo[i].abnormalType ? alreadyPayInfo[i].abnormalType : ''}</td>
              <td colspan="1">${alreadyPayInfo[i].abnormalAmount ? alreadyPayInfo[i].abnormalAmount : ''}</td>
              <td colspan="1">${alreadyPayInfo[i].registerFee ? alreadyPayInfo[i].registerFee : ''}</td>
              <td colspan="1">${alreadyPayInfo[i].shipArrivepayFee ? alreadyPayInfo[i].shipArrivepayFee : ''}</td>
              <td colspan="1">${alreadyPayInfo[i].agencyFund ? alreadyPayInfo[i].agencyFund : ''}</td>
              <td colspan="1">${alreadyPayInfo[i].totalFee ? alreadyPayInfo[i].totalFee : ''}</td>
              <td colspan="1">${alreadyPayInfo[i].remark ? alreadyPayInfo[i].remark : ''}</td>
            </tr>
    `
  }
  //alreadyPayInfo
  // alreadyPayInfo
  tbodyStr = tbodyStr + `
    <tr>
      <td >备注</td>
      <td colspan="15">${params.tmsFinanceBillCheckDto.remark}</td>
    </tr>
  `
  tbodyStr = tbodyStr + `
    <tr>
      <td colspan="16" bgcolor="yellow">若对以上对账 明细有疑问，请及时联系我们，我们的联系信息如下</td>
      
    </tr>
  `
  tbodyStr = tbodyStr + `
    <tr>
      <td >公司名称</td>
      <td colspan="3">${params.tmsFinanceBillCheckDto.companyName}</td>
      <td >业务负责人</td>
      <td colspan="3">${params.tmsFinanceBillCheckDto.orgBusinessOfficer}</td>
      <td >联系方式</td>
       <td colspan="3">${params.tmsFinanceBillCheckDto.orgBusinessOfficerPhone}</td>
       <td >财务负责人</td>
       <td colspan="3">${params.tmsFinanceBillCheckDto.orgFinancialOfficer}</td>
       </tr>
       <tr>
       <td>财务联系电话</td>
       <td colspan="3">${params.tmsFinanceBillCheckDto.orgFinancialOfficerPhone}</td>
       <td>时间</td>
       <td colspan="11">${params.tmsFinanceBillCheckDto.createTime}</td>
    </tr>
  `

  tbody.innerHTML = tbodyStr
  div.appendChild(infoDiv)
  thead.innerHTML = theadStr
  table.appendChild(thead)
  table.appendChild(tbody)
  infoDiv.appendChild(table)
  div.appendChild(infoDiv)
  document.body.appendChild(div)
  return tableId
}

function createGroup(params) {
  console.log(params, params)
  // debugger
  let dealInfo = []
  let dealPayInfo = []
  let alreadyInfo = []
  let alreadyPayInfo = []
  params.orgDetailQueryList.forEach(function (el, val) {
    if (el.type === 1) {
      dealInfo.push(el)
    }
    else if (el.type === 3) {
      dealPayInfo.push(el)
    }
    else if (el.type === 2) {
      alreadyInfo.push(el)
    }
    else {
      alreadyPayInfo.push(el)
    }
  })

  //初始化tmsFinanceBillCheckDto
  for (var i in params.tmsFinanceBillCheckDto) {
    params.tmsFinanceBillCheckDto[i] = params.tmsFinanceBillCheckDto[i] === null ? '' : params.tmsFinanceBillCheckDto[i]
  }
  //初始化dealInfo
  const tableId = 'dataTable' + String(new Date().getTime()) // 设置打印表格id
  const div = document.createElement('div')
  const infoDiv = document.createElement('font')
  infoDiv.setAttribute('size', '2')
  const table = document.createElement('table')
  div.id = tableId
  const thead = document.createElement('thead')
  const tbody = document.createElement('tbody')
  table.style.border = '1px solid #ff000';
  table.setAttribute('border', '1')
  table.setAttribute('font', '12px')
  table.setAttribute('width', '1800')
  table.setAttribute('table-layout', 'fixed')
  tbody.setAttribute('style', "text-align:center;")
  var theadStr = ''
  // 标题
  theadStr = `
    <tr>
      <td colspan="16" style="text-align: center;border:1px double red;margin-left: -1px;margin-top: -1px;height:60px;font-weight: 500;font-size: 14px" >${params.tmsFinanceBillCheckDto.checkBillName}</td>
    </tr>
   `
  let tbodyStr = ` <tr>
    <td>对账网点 </td>
    <td>${params.tmsFinanceBillCheckDto.memberName}</td>
    <td>负责人</td>
    <td >${params.tmsFinanceBillCheckDto.memberPerson}</td>
    <td>联系方式</td>
    <td >${params.tmsFinanceBillCheckDto.memberPersonPhone}</td>
    <td>对账单编号 </td>
    <td >${params.tmsFinanceBillCheckDto.checkBillCode}</td>
    <td>开始时间</td>
    <td colspan="3">${params.tmsFinanceBillCheckDto.checkStartTime}</td>
    <td>结束时间 </td>
    <td colspan="3">${params.tmsFinanceBillCheckDto.checkEndTime}</td>
  </tr>
  <tr>
    <td>账户账号</td>
    <td colspan="2">${params.tmsFinanceBillCheckDto.bankAccount}</td>
    <td>账户开户行 </td>
    <td colspan="2">${params.tmsFinanceBillCheckDto.bankName}</td>
    <td>支付宝 </td>
    <td colspan="2">${params.tmsFinanceBillCheckDto.alipayAccount}</td>
    <td>微信</td>
    <td colspan="6">${params.tmsFinanceBillCheckDto.wechatAccount}</td>
  </tr>`
  //dealInfo
  tbodyStr = tbodyStr + `
    <tr>
        <td colspan="16" bgcolor="yellow" align="left">已收 (应收账款) </td>
    </tr>
  `
  tbodyStr = tbodyStr + `<tr>
          <td>序号</td>
          <td>发车时间</td>
          <td>车牌号码</td>
          <td>司机姓名</td>
          <td>发车批次</td>
          <td>合同编号</td>
          <td>到达网点</td>
          <td>到付款</td>
          <td>代收货款</td>
          <td>操作费</td>
          <td>配载总件数</td>
          <td>配载总体积</td>
          <td>配载总重量</td>
          <td>备注</td>
      </tr>`

  for (let i = 0; i < dealInfo.length; i++) {
    tbodyStr += `
             <tr>
              <td colspan="1">${i + 1}</td>
              <td colspan="1">${dealInfo[i].departureTime ? dealInfo[i].departureTime : ''}</td>
              <td colspan="1">${dealInfo[i].truckIdNumber ? dealInfo[i].truckIdNumber : ''}</td>
              <td colspan="1">${dealInfo[i].dirverName ? dealInfo[i].dirverName : ''} </td>
              <td colspan="1">${dealInfo[i].batchNo ? dealInfo[i].batchNo : ''}</td>
              <td colspan="1">${dealInfo[i].contractNo ? dealInfo[i].contractNo : ''}</td>
              <td colspan="1">${dealInfo[i].arriveOrgName ? dealInfo[i].arriveOrgName : ''}</td>
              <td colspan="1">${dealInfo[i].shipArrivepayFee ? dealInfo[i].shipArrivepayFee : ''}</td>
              <td colspan="1">${dealInfo[i].agencyFund ? dealInfo[i].agencyFund : ''}</td>
              <td colspan="1">${dealInfo[i].handlingFeeReceivable ? dealInfo[i].handlingFeeReceivable : ''}</td>
              <td colspan="1">${dealInfo[i].loadAmountall ? dealInfo[i].loadAmountall : ''}</td>
              <td colspan="1">${dealInfo[i].loadVolumeall ? dealInfo[i].loadVolumeall : ''}</td>
              <td colspan="1">${dealInfo[i].loadWeightall ? dealInfo[i].loadWeightall : ''}</td>
              <td colspan="1">${dealInfo[i].remark ? dealInfo[i].remark : ''}</td>
            </tr>
    `
  }
  //dealInfo
  //dealPayInfo
  tbodyStr = tbodyStr + `
    <tr>
        <td colspan="16" bgcolor="rgb(255,193,0)" align="left">未收 (应收账款) </td>
    </tr>
  `
  tbodyStr = tbodyStr + `
          <td>序号</td>
          <td>发车时间</td>
          <td>车牌号码</td>
          <td>司机姓名</td>
          <td>发车批次</td>
          <td>合同编号</td>
          <td>到达网点</td>
          <td>到付款</td>
          <td>代收货款</td>
          <td>操作费</td>
          <td>配载总件数</td>
          <td>配载总体积</td>
          <td>配载总重量</td>
          <td>备注</td>
      </tr>`
  // tbodyStr = tbodyStr
  for (let i = 0; i < dealPayInfo.length; i++) {
    tbodyStr += `
             <tr>
              <td colspan="1">${i + 1}</td>
              <td colspan="1">${dealPayInfo[i].departureTime ? dealPayInfo[i].departureTime : ''}</td>
              <td colspan="1">${dealPayInfo[i].truckIdNumber ? dealPayInfo[i].truckIdNumber : ''}</td>
              <td colspan="1">${dealPayInfo[i].dirverName ? dealPayInfo[i].dirverName : ''} </td>
              <td colspan="1">${dealPayInfo[i].batchNo ? dealPayInfo[i].batchNo : ''}</td>
              <td colspan="1">${dealPayInfo[i].contractNo ? dealPayInfo[i].contractNo : ''}</td>
              <td colspan="1">${dealPayInfo[i].arriveOrgName ? dealPayInfo[i].arriveOrgName : ''}</td>
              <td colspan="1">${dealPayInfo[i].shipArrivepayFee ? dealPayInfo[i].shipArrivepayFee : ''}</td>
              <td colspan="1">${dealPayInfo[i].agencyFund ? dealPayInfo[i].agencyFund : ''}</td>
              <td colspan="1">${dealPayInfo[i].handlingFeeReceivable ? dealPayInfo[i].handlingFeeReceivable : ''}</td>
              <td colspan="1">${dealPayInfo[i].loadAmountall ? dealPayInfo[i].loadAmountall : ''}</td>
              <td colspan="1">${dealPayInfo[i].loadVolumeall ? dealPayInfo[i].loadVolumeall : ''}</td>
              <td colspan="1">${dealPayInfo[i].loadWeightall ? dealPayInfo[i].loadWeightall : ''}</td>
              <td colspan="1">${dealPayInfo[i].remark ? dealPayInfo[i].remark : ''}</td>
            </tr>
    `
  }
  //dealPayInfo
  //alreadyInfo
  tbodyStr = tbodyStr + `
    <tr>
        <td colspan="16" bgcolor="yellow" align="left">已付(应付账款) </td>
    </tr>
  `
  tbodyStr = tbodyStr + `<tr>
          <td colspan="1">序号</td>
          <td colspan="1">发车时间</td>
          <td colspan="1">车牌号码</td>
          <td colspan="1">司机姓名</td>
          <td colspan="1">发车批次</td>
          <td colspan="1">合同编号</td>
          <td colspan="1">到达网点</td>
          <td colspan="1">操作费</td>
          <td colspan="1">到站装卸费</td>
          <td colspan="1">到站其他费</td>
          <td colspan="1">到付运费</td>
          <td colspan="1">到付油卡</td>
          <td colspan="1">配载总件数</td>
          <td colspan="1">配载总体积</td>
          <td colspan="1">配载总重量</td>
          <td colspan="1">备注</td>
      </tr>`
  for (let i = 0; i < alreadyInfo.length; i++) {
    tbodyStr += `
             <tr>
              <td colspan="1">${i + 1}</td>
              <td colspan="1">${alreadyInfo[i].departureTime ? alreadyInfo[i].departureTime : ''}</td>
              <td colspan="1">${alreadyInfo[i].truckIdNumber ? alreadyInfo[i].truckIdNumber : ''}</td>
              <td colspan="1">${alreadyInfo[i].dirverName ? alreadyInfo[i].dirverName : ''} </td>
              <td colspan="1">${alreadyInfo[i].batchNo ? alreadyInfo[i].batchNo : ''}</td>
              <td colspan="1">${alreadyInfo[i].contractNo ? alreadyInfo[i].contractNo : ''}</td>
              <td colspan="1">${alreadyInfo[i].arriveOrgName ? alreadyInfo[i].arriveOrgName : ''}</td>
              <td colspan="1">${alreadyInfo[i].handlingFeePayable ? alreadyInfo[i].handlingFeePayable : ''}</td>
              <td colspan="1">${alreadyInfo[i].arriveHandlingFee ? alreadyInfo[i].arriveHandlingFee : ''}</td>
              <td colspan="1">${alreadyInfo[i].arriveOtherFee ? alreadyInfo[i].arriveOtherFee : ''}</td>
              <td colspan="1">${alreadyInfo[i].abnormalAmount ? alreadyInfo[i].abnormalAmount : ''}</td>
              <td colspan="1">${alreadyInfo[i].registerFee ? alreadyInfo[i].registerFee : ''}</td>
              <td colspan="1">${alreadyInfo[i].arrivepayCarriage ? alreadyInfo[i].arrivepayCarriage : ''}</td>
              <td colspan="1">${alreadyInfo[i].arrivepayOilCard ? alreadyInfo[i].arrivepayOilCard : ''}</td>
              <td colspan="1">${alreadyInfo[i].loadAmountall ? alreadyInfo[i].loadAmountall : ''}</td>
              <td colspan="1">${alreadyInfo[i].loadVolumeall ? alreadyInfo[i].loadVolumeall : ''}</td>
              <td colspan="1">${alreadyInfo[i].loadWeightall ? alreadyInfo[i].loadWeightall : ''}</td>
              <td colspan="1">${alreadyInfo[i].remark ? alreadyInfo[i].remark : ''}</td>
            </tr>
    `
  }
  //dealPayInfo
  //alreadyPayInfo
  tbodyStr = tbodyStr + `
    <tr>
        <td colspan="16" bgcolor="rgb(255,193,0)" align="left">未付 (应付账款) </td>
    </tr>
  `
  tbodyStr = tbodyStr + `<tr>
          <td colspan="1">序号</td>
          <td colspan="1">发车时间</td>
          <td colspan="1">车牌号码</td>
          <td colspan="1">司机姓名</td>
          <td colspan="1">发车批次</td>
          <td colspan="1">合同编号</td>
          <td colspan="1">到达网点</td>
          <td colspan="1">操作费</td>
          <td colspan="1">到站装卸费</td>
          <td colspan="1">到站其他费</td>
          <td colspan="1">到付运费</td>
          <td colspan="1">到付油卡</td>
          <td colspan="1">配载总件数</td>
          <td colspan="1">配载总体积</td>
          <td colspan="1">配载总重量</td>
          <td colspan="1">备注</td>
      </tr>`
  for (let i = 0; i < alreadyPayInfo.length; i++) {
    tbodyStr += `
             <tr>
              <td colspan="1">${i + 1}</td>
              <td colspan="1">${alreadyPayInfo[i].departureTime ? alreadyPayInfo[i].departureTime : ''}</td>
              <td colspan="1">${alreadyPayInfo[i].truckIdNumber ? alreadyPayInfo[i].truckIdNumber : ''}</td>
              <td colspan="1">${alreadyPayInfo[i].dirverName ? alreadyPayInfo[i].dirverName : ''} </td>
              <td colspan="1">${alreadyPayInfo[i].batchNo ? alreadyPayInfo[i].batchNo : ''}</td>
              <td colspan="1">${alreadyPayInfo[i].contractNo ? alreadyPayInfo[i].contractNo : ''}</td>
              <td colspan="1">${alreadyPayInfo[i].arriveOrgName ? alreadyPayInfo[i].arriveOrgName : ''}</td>
              <td colspan="1">${alreadyPayInfo[i].handlingFeePayable ? alreadyPayInfo[i].handlingFeePayable : ''}</td>
              <td colspan="1">${alreadyPayInfo[i].arriveHandlingFee ? alreadyPayInfo[i].arriveHandlingFee : ''}</td>
              <td colspan="1">${alreadyPayInfo[i].arriveOtherFee ? alreadyPayInfo[i].arriveOtherFee : ''}</td>
              <td colspan="1">${alreadyPayInfo[i].arrivepayCarriage ? alreadyPayInfo[i].arrivepayCarriage : ''}</td>
              <td colspan="1">${alreadyPayInfo[i].arrivepayOilCard ? alreadyPayInfo[i].arrivepayOilCard : ''}</td>
              <td colspan="1">${alreadyPayInfo[i].loadAmountall ? alreadyPayInfo[i].loadAmountall : ''}</td>
              <td colspan="1">${alreadyPayInfo[i].loadVolumeall ? alreadyPayInfo[i].loadVolumeall : ''}</td>
              <td colspan="1">${alreadyPayInfo[i].loadWeightall ? alreadyPayInfo[i].loadWeightall : ''}</td>
              <td colspan="1">${alreadyPayInfo[i].remark ? alreadyPayInfo[i].remark : ''}</td>
            </tr>
    `
  }
  tbodyStr = tbodyStr + `
    <tr>
      <td >备注</td>
      <td colspan="15">${params.tmsFinanceBillCheckDto.remark}</td>
    </tr>
  `
  tbodyStr = tbodyStr + `
    <tr>
      <td colspan="16" bgcolor="yellow">若对以上对账 明细有疑问，请及时联系我们，我们的联系信息如下</td>
      
    </tr>
  `
  tbodyStr = tbodyStr + `
    <tr>
      <td >网点</td>
      <td colspan="2">${params.tmsFinanceBillCheckDto.orgName}</td>
      <td >业务负责人</td>
      <td colspan="2">${params.tmsFinanceBillCheckDto.orgBusinessOfficer}</td>
      <td >联系方式</td>
      <td>${params.tmsFinanceBillCheckDto.orgBusinessOfficerPhone}</td>
      <td >财务负责人</td>
      <td colspan="2">${params.tmsFinanceBillCheckDto.orgFinancialOfficer}</td>
      <td>财务联系电话</td>
      <td>${params.tmsFinanceBillCheckDto.orgFinancialOfficerPhone}</td>
      <td>时间</td>
      <td colspan="2">${params.tmsFinanceBillCheckDto.createTime}</td>
     </tr>
  `

  tbody.innerHTML = tbodyStr
  div.appendChild(infoDiv)
  thead.innerHTML = theadStr
  table.appendChild(thead)
  table.appendChild(tbody)
  infoDiv.appendChild(table)
  div.appendChild(infoDiv)
  document.body.appendChild(div)
  return tableId
}

//客户
function createCustomer(params) {
  console.log(params, params.tmsFinanceBillCheckDto.companyName)
  let dealInfo = []
  let dealPayInfo = []
  let alreadyInfo = []
  let alreadyPayInfo = []
  params.customerDetailDtoList.forEach(function (el, val) {
    if (el.type === 1) {
      dealInfo.push(el)
    }
    else if (el.type === 2) {
      dealPayInfo.push(el)
    }
    else if (el.type === 3) {
      alreadyInfo.push(el)
    }
    else {
      alreadyPayInfo.push(el)
    }
  })

  //初始化tmsFinanceBillCheckDto
  for (var i in params.tmsFinanceBillCheckDto) {
    params.tmsFinanceBillCheckDto[i] = params.tmsFinanceBillCheckDto[i] === null ? '' : params.tmsFinanceBillCheckDto[i]
  }
  //初始化dealInfo
  const tableId = 'dataTable' + String(new Date().getTime()) // 设置打印表格id
  const div = document.createElement('div')
  const infoDiv = document.createElement('font')
  infoDiv.setAttribute('size', '2')
  const table = document.createElement('table')
  div.id = tableId
  const thead = document.createElement('thead')
  const tbody = document.createElement('tbody')
  table.style.border = '1px solid #ff000';
  table.setAttribute('border', '1')
  table.setAttribute('font', '12px')
  table.setAttribute('width', '1800')
  table.setAttribute('table-layout', 'fixed')
  tbody.setAttribute('style', "text-align:center;")
  var theadStr = ''
  // 标题
  theadStr = `
    <tr>
      <td colspan="18" style="text-align: center;border:1px double red;margin-left: -1px;margin-top: -1px;height:60px" >${params.tmsFinanceBillCheckDto.checkBillName}</td>
    </tr>
   `
  let tbodyStr = ` <tr>
    <td width="5%" height="25px">发货方 </td>
    <td colspan="3" width="20%">${params.tmsFinanceBillCheckDto.memberName}</td>
    <td width="5%"  height="25px">发货人</td>
    <td colspan="3" width="20%">${params.tmsFinanceBillCheckDto.memberPerson}</td>
    <td width="5%" height="25px">联系方式</td>
    <td colspan="5" width="20%">${params.tmsFinanceBillCheckDto.memberPersonPhone}</td>
    <td width="5%" height="25px">对账单编号 </td>
    <td colspan="3" width="15%">${params.tmsFinanceBillCheckDto.checkBillCode}</td>
  </tr>
   <tr>
      <td width="5%" height="25px">客户编号</td>
      <td colspan="3" width="20%">${params.tmsFinanceBillCheckDto.memberCode}</td>
      <td width="5%" height="25px">开始时间</td>
      <td colspan="3" width="20%"> ${params.tmsFinanceBillCheckDto.checkStartTime}</td>
      <td width="5%" height="25px">结束时间 </td>
      <td colspan="5" width="20%">${params.tmsFinanceBillCheckDto.checkEndTime}</td>
      <td width="5%" height="25px">结算方式</td>
      <td colspan="3" width="20%">${params.tmsFinanceBillCheckDto.settlementType}</td>
  </tr>
  <tr>
    <td width="5%">账户账号</td>
    <td colspan="3" width="20%">${params.tmsFinanceBillCheckDto.bankAccount}</td>
    <td width="5%">账户开户行 </td>
    <td colspan="3" width="20%">${params.tmsFinanceBillCheckDto.bankName}</td>
    <td width="5%">财务负责人</td>
    <td colspan="5" width="20%">${params.tmsFinanceBillCheckDto.financialOfficer}</td>
    <td width="5%">联系方式</td>
    <td colspan="3" width="20%">${params.tmsFinanceBillCheckDto.financialOfficerPhone}</td>
  </tr>
  <tr>
      <td width="5%" height="25px">支付宝 </td>
      <td colspan="3">${params.tmsFinanceBillCheckDto.alipayAccount}</td>
      <td width="5%" height="25px">微信</td>
      <td colspan="13">${params.tmsFinanceBillCheckDto.wechatAccount}</td>
  </tr>`
  //dealInfo
  tbodyStr = tbodyStr + `
    <tr>
        <td colspan="18" bgcolor="yellow" align="left">应收清单 </td>
    </tr>
  `
  tbodyStr = tbodyStr + `<tr>
          <td colspan="1" >序号</td>
          <td colspan="1" >开单时间</td>
          <td colspan="1" >运单号</td>
          <td colspan="1" >货号</td>
          <td colspan="1" >出发城市</td>
          <td colspan="1" >到达城市</td>
          <td colspan="1" >货品名</td>
          <td colspan="1" >件数</td>
          <td colspan="1" >重量</td>
          <td colspan="1" >体积</td>
          <td colspan="1" >交接方式</td>
          <td colspan="1" >异动备注</td>
          <td colspan="1" >付款方式</td>
          <td colspan="1" >异动增款</td>
          <td colspan="1" >回单付</td>
          <td colspan="1" >月结</td>
          <td colspan="1" >小计</td>
          <td colspan="1" >备注</td>
      </tr>`

  for (let i = 0; i < dealInfo.length; i++) {
    tbodyStr += `
             <tr>
              <td colspan="1">${i + 1}</td>
              <td colspan="1" >${dealInfo[i].createTime ? dealInfo[i].createTime : ''}</td>
              <td colspan="1" >${dealInfo[i].shipSn ? dealInfo[i].shipSn : ''}</td>
              <td colspan="1"  >${dealInfo[i].shipGoodsSn ? dealInfo[i].shipGoodsSn : ''} </td>
              <td colspan="1" >${dealInfo[i].shipFromCityName ? dealInfo[i].shipFromCityName : ''}</td>
              <td colspan="1" >${dealInfo[i].shipToCityName ? dealInfo[i].shipToCityName : ''}</td>
              <td colspan="1" >${dealInfo[i].cargoName ? dealInfo[i].cargoName : ''}</td>
              <td colspan="1" >${dealInfo[i].cargoAmount ? dealInfo[i].cargoAmount : ''}</td>
              <td colspan="1" >${dealInfo[i].cargoWeight ? dealInfo[i].cargoWeight : ''}</td>
              <td colspan="1" >${dealInfo[i].cargoVolume ? dealInfo[i].cargoVolume : ''}</td>
              <td colspan="1" >${dealInfo[i].shipDeliveryMethod ? dealInfo[i].shipDeliveryMethod : ''}</td>
              <td colspan="1" >${dealInfo[i].unusualRemark ? dealInfo[i].unusualRemark : ''}</td>
              <td colspan="1" >${dealInfo[i].shipPayWay ? dealInfo[i].shipPayWay : ''}</td>
              <td colspan="1" >${dealInfo[i].unusualFee ? dealInfo[i].unusualFee : ''}</td>
              <td colspan="1" >${dealInfo[i].shipReceiptpayFee ? dealInfo[i].shipReceiptpayFee : ''}</td>
              <td colspan="1" >${dealInfo[i].shipMonthpayFee ? dealInfo[i].shipMonthpayFee : ''}</td>
              <td colspan="1" >${dealInfo[i].totalFee ? dealInfo[i].totalFee : ''}</td>
              <td colspan="1" >${dealInfo[i].remark ? dealInfo[i].remark : ''}</td>
            </tr>
    `
  }
  //dealInfo
  //dealPayInfo
  tbodyStr = tbodyStr + `
    <tr>
        <td colspan="18" bgcolor="rgb(255,193,0)" align="left">应付清单 </td>
    </tr>
  `
  tbodyStr = tbodyStr + `<tr>
          <td colspan="1" >序号</td>
          <td colspan="1" >开单时间</td>
          <td colspan="1" >运单号</td>
          <td colspan="1" >货号</td>
          <td colspan="1" >出发城市</td>
          <td colspan="1" >到达城市</td>
          <td colspan="1" >货品名</td>
          <td colspan="1" >件数</td>
          <td colspan="1" >重量</td>
          <td colspan="1" >体积</td>
          <td colspan="1" >异动备注</td>
          <td colspan="1" >异常类型</td>
          <td colspan="1" >异常件数</td>
          <td colspan="1" >异动减款</td>
          <td colspan="1" >异常金额</td>
          <td colspan="1" >代收货款</td>
          <td colspan="1" >小计</td>
          <td colspan="1" >备注</td>
      </tr>`
  // tbodyStr = tbodyStr
  for (let i = 0; i < dealPayInfo.length; i++) {
    tbodyStr += `
             <tr>
              <td colspan="1">${i + 1}</td>
              <td colspan="1" >${dealPayInfo[i].createTime ? dealPayInfo[i].createTime : ''}</td>
              <td colspan="1" >${dealPayInfo[i].shipSn ? dealPayInfo[i].shipSn : ''}</td>
              <td colspan="1" >${dealPayInfo[i].shipGoodsSn ? dealPayInfo[i].shipGoodsSn : ''} </td>
              <td colspan="1" >${dealPayInfo[i].shipFromCityName ? dealPayInfo[i].shipFromCityName : ''}</td>
              <td colspan="1" >${dealPayInfo[i].shipToCityName ? dealPayInfo[i].shipToCityName : ''}</td>
              <td colspan="1" >${dealPayInfo[i].cargoName ? dealPayInfo[i].cargoName : ''}</td>
              <td colspan="1" >${dealPayInfo[i].cargoAmount ? dealPayInfo[i].cargoAmount : ''}</td>
              <td colspan="1" >${dealPayInfo[i].cargoWeight ? dealPayInfo[i].cargoWeight : ''}</td>
              <td colspan="1" >${dealPayInfo[i].cargoVolume ? dealPayInfo[i].cargoVolume : ''}</td>
              <td colspan="1" >${dealPayInfo[i].unusualRemark ? dealPayInfo[i].unusualRemark : ''}</td>
              <td colspan="1" >${dealPayInfo[i].abnormalType ? dealPayInfo[i].abnormalType : ''}</td>
              <td colspan="1" >${dealPayInfo[i].abnormalAmount ? dealPayInfo[i].abnormalAmount : ''}</td>
              <td colspan="1" >${dealPayInfo[i].unusualFee ? dealPayInfo[i].unusualFee : ''}</td>
              <td colspan="1" >${dealPayInfo[i].registerFee ? dealPayInfo[i].registerFee : ''}</td>
              <td colspan="1" >${dealPayInfo[i].agencyFund ? dealPayInfo[i].agencyFund : ''}</td>
              <td colspan="1" >${dealPayInfo[i].totalFee ? dealPayInfo[i].totalFee : ''}</td>
              <td colspan="1" >${dealPayInfo[i].remark ? dealPayInfo[i].remark : ''}</td>
            </tr>
    `
  }
  //dealPayInfo
  //alreadyInfo
  tbodyStr = tbodyStr + `
    <tr>
        <td colspan="18" bgcolor="yellow" align="left">已收清单(本结算期内) </td>
    </tr>
  `
  tbodyStr = tbodyStr + `<tr>
          <td colspan="1" >序号</td>
          <td colspan="1" >开单时间</td>
          <td colspan="1" >运单号</td>
          <td colspan="1" >货号</td>
          <td colspan="1" >出发城市</td>
          <td colspan="1" >到达城市</td>
          <td colspan="1" >货品名</td>
          <td colspan="1" >件数</td>
          <td colspan="1" >重量</td>
          <td colspan="1" >体积</td>
          <td colspan="1" >交接方式</td>
          <td colspan="1" >异动备注</td>
          <td colspan="1" >付款方式</td>
          <td colspan="1" >异动增款</td>
          <td colspan="1" >回单付</td>
          <td colspan="1" >月结</td>
          <td colspan="1" >小计</td>
          <td colspan="1" >备注</td>
      </tr>`
  for (let i = 0; i < alreadyInfo.length; i++) {
    tbodyStr += `
             <tr>
              <td colspan="1">${i + 1}</td>
              <td colspan="1" >${alreadyInfo[i].createTime ? alreadyInfo[i].createTime : ''}</td>
              <td colspan="1" >${alreadyInfo[i].shipSn ? alreadyInfo[i].shipSn : ''}</td>
              <td colspan="1" >${alreadyInfo[i].shipGoodsSn ? alreadyInfo[i].shipGoodsSn : ''} </td>
              <td colspan="1" >${alreadyInfo[i].shipFromCityName ? alreadyInfo[i].shipFromCityName : ''}</td>
              <td colspan="1" >${alreadyInfo[i].shipToCityName ? alreadyInfo[i].shipToCityName : ''}</td>
              <td colspan="1" >${alreadyInfo[i].cargoName ? alreadyInfo[i].cargoName : ''}</td>
              <td colspan="1" >${alreadyInfo[i].cargoAmount ? alreadyInfo[i].cargoAmount : ''}</td>
              <td colspan="1" >${alreadyInfo[i].cargoWeight ? alreadyInfo[i].cargoWeight : ''}</td>
              <td colspan="1" >${alreadyInfo[i].cargoVolume ? alreadyInfo[i].cargoVolume : ''}</td>
              <td colspan="1" >${alreadyInfo[i].shipDeliveryMethod ? alreadyInfo[i].shipDeliveryMethod : ''}</td>
              <td colspan="1" >${alreadyInfo[i].unusualRemark ? alreadyInfo[i].unusualRemark : ''}</td>
              <td colspan="1" >${alreadyInfo[i].shipPayWay ? alreadyInfo[i].shipPayWay : ''}</td>
              <td colspan="1" >${alreadyInfo[i].unusualFee ? alreadyInfo[i].unusualFee : ''}</td>
              <td colspan="1" >${alreadyInfo[i].shipReceiptpayFee ? alreadyInfo[i].shipReceiptpayFee : ''}</td>
              <td colspan="1" >${alreadyInfo[i].shipMonthpayFee ? alreadyInfo[i].shipMonthpayFee : ''}</td>
              <td colspan="1" >${alreadyInfo[i].totalFee ? alreadyInfo[i].totalFee : ''}</td>
              <td colspan="1" >${alreadyInfo[i].remark ? alreadyInfo[i].remark : ''}</td>
            </tr>
    `
  }
  //dealPayInfo
  //alreadyPayInfo
  tbodyStr = tbodyStr + `
    <tr>
        <td colspan="18" bgcolor="rgb(255,193,0)" align="left">已付清单(本结算期内) </td>
    </tr>
  `
  tbodyStr = tbodyStr + `<tr>
           <td colspan="1" >序号</td>
          <td colspan="1" >开单时间</td>
          <td colspan="1" >运单号</td>
          <td colspan="1" >货号</td>
          <td colspan="1" >出发城市</td>
          <td colspan="1" >到达城市</td>
          <td colspan="1" >货品名</td>
          <td colspan="1" >件数</td>
          <td colspan="1" >重量</td>
          <td colspan="1" >体积</td>
          <td colspan="1" >异动备注</td>
          <td colspan="1" >异常类型</td>
          <td colspan="1" >异常件数</td>
          <td colspan="1" >异动减款</td>
          <td colspan="1" >异常金额</td>
          <td colspan="1" >代收货款</td>
          <td colspan="1" >小计</td>
          <td colspan="1" >备注</td>
      </tr>`
  for (let i = 0; i < alreadyPayInfo.length; i++) {
    tbodyStr += `
             <tr>
              <td colspan="1">${i + 1}</td>
              <td colspan="1" >${alreadyPayInfo[i].createTime ? alreadyPayInfo[i].createTime : ''}</td>
              <td colspan="1" >${alreadyPayInfo[i].shipSn ? alreadyPayInfo[i].shipSn : ''}</td>
              <td colspan="1" >${alreadyPayInfo[i].shipGoodsSn ? alreadyPayInfo[i].shipGoodsSn : ''} </td>
              <td colspan="1" >${alreadyPayInfo[i].shipFromCityName ? alreadyPayInfo[i].shipFromCityName : ''}</td>
              <td colspan="1" >${alreadyPayInfo[i].shipToCityName ? alreadyPayInfo[i].shipToCityName : ''}</td>
              <td colspan="1" >${alreadyPayInfo[i].cargoName ? alreadyPayInfo[i].cargoName : ''}</td>
              <td colspan="1" >${alreadyPayInfo[i].cargoAmount ? alreadyPayInfo[i].cargoAmount : ''}</td>
              <td colspan="1" >${alreadyPayInfo[i].cargoWeight ? alreadyPayInfo[i].cargoWeight : ''}</td>
              <td colspan="1" >${alreadyPayInfo[i].cargoVolume ? alreadyPayInfo[i].cargoVolume : ''}</td>
              <td colspan="1" >${alreadyPayInfo[i].unusualRemark ? alreadyPayInfo[i].unusualRemark : ''}</td>
              <td colspan="1" >${alreadyPayInfo[i].abnormalType ? alreadyPayInfo[i].abnormalType : ''}</td>
              <td colspan="1" >${alreadyPayInfo[i].abnormalAmount ? alreadyPayInfo[i].abnormalAmount : ''}</td>
              <td colspan="1" >${alreadyPayInfo[i].unusualFee ? alreadyPayInfo[i].unusualFee : ''}</td>
              <td colspan="1" >${alreadyPayInfo[i].registerFee ? alreadyPayInfo[i].registerFee : ''}</td>
              <td colspan="1" >${alreadyPayInfo[i].agencyFund ? alreadyPayInfo[i].agencyFund : ''}</td>
              <td colspan="1" >${alreadyPayInfo[i].totalFee ? alreadyPayInfo[i].totalFee : ''}</td>
              <td colspan="1" >${alreadyPayInfo[i].remark ? alreadyPayInfo[i].remark : ''}</td>
            </tr>
    `
  }
  //alreadyPayInfo
  // alreadyPayInfo
  tbodyStr = tbodyStr + `
    <tr>
      <td >备注</td>
      <td colspan="17">${params.tmsFinanceBillCheckDto.remark}</td>
    </tr>
  `
  tbodyStr = tbodyStr + `
    <tr>
      <td colspan="18" bgcolor="yellow">若对以上对账 明细有疑问，请及时联系我们，我们的联系信息如下</td>
      
    </tr>
  `
  tbodyStr = tbodyStr + `
    <tr>
      <td width="5%" height="10px">公司名称</td>
      <td colspan="3">${params.tmsFinanceBillCheckDto.companyName}</td>
      <td width="5%" height="10px">业务负责人</td>
      <td colspan="3">${params.tmsFinanceBillCheckDto.orgBusinessOfficer}</td>
      <td width="5%" height="10px">联系方式</td>
       <td colspan="5">${params.tmsFinanceBillCheckDto.orgBusinessOfficerPhone}</td>
       <td width="5%" height="10px">财务负责人</td>
       <td colspan="3">${params.tmsFinanceBillCheckDto.orgFinancialOfficer}</td>
       </tr>
       <tr>
       <td width="5%" height="10px">财务联系电话</td>
       <td colspan="3">${params.tmsFinanceBillCheckDto.orgFinancialOfficerPhone}</td>
       <td width="5%" height="10px">时间</td>
       <td colspan="13">${params.tmsFinanceBillCheckDto.createTime}</td>
    </tr>
  `
  tbody.innerHTML = tbodyStr
  div.appendChild(infoDiv)
  thead.innerHTML = theadStr
  table.appendChild(thead)
  table.appendChild(tbody)
  infoDiv.appendChild(table)
  div.appendChild(infoDiv)
  document.body.appendChild(div)
  return tableId
}


//短驳
function createCarfeefeeShort(params) {
  console.log(params, params.payDetailList)

  //初始化tmsFinanceBillCheckDto
  for (var i in params) {
    params[i] = params[i] === null || undefined ? '' : params[i]
  }
  for (var i in params.payDetailList) {
    params.payDetailList[i] = params.payDetailList[i] === null || undefined ? '' : params.payDetailList[i]
    // alert(params.payDetailList[i])
  }
  //初始化dealInfo
  const tableId = 'dataTable' + String(new Date().getTime()) // 设置打印表格id
  const div = document.createElement('div')
  const infoDiv = document.createElement('font')
  infoDiv.setAttribute('size', '2')
  const table = document.createElement('table')
  div.id = tableId
  const thead = document.createElement('thead')
  const tbody = document.createElement('tbody')
  table.style.border = '1px solid #ff000';
  table.setAttribute('border', '1')
  table.setAttribute('font', '12px')
  table.setAttribute('width', '1900')
  table.setAttribute('table-layout', 'fixed')
  tbody.setAttribute('style', "text-align:center;")
  var theadStr = ''
  // 标题
  theadStr = `
    <tr>
      <td colspan="12" style="text-align: center;border:1px double red;margin-left: -1px;margin-top: -1px;height:60px" >${params.checkBillName}</td>
    </tr>
   `
  let tbodyStr = ` <tr>
    <td width="5%" height="25px">车牌号 </td>
    <td colspan="2" width="20%">${params.memberName}</td>
    <td width="5%"  height="25px">司机</td>
    <td colspan="2" width="20%">${params.memberPerson}</td>
    <td width="5%" height="25px">联系方式</td>
    <td colspan="2" width="20%">${params.memberPersonPhone}</td>
    <td width="5%" height="25px">对账单编号 </td>
    <td colspan="2" width="15%">${params.checkBillCode}</td>
  </tr>
   <tr>
     
      <td width="5%" height="25px">开始时间</td>
      <td colspan="2" width="20%"> ${params.checkStartTime}</td>
      <td width="5%" height="25px">结束时间 </td>
      <td colspan="2" width="20%">${params.checkEndTime}</td>
      
      <td width="5%">账户账号</td>
      <td colspan="2" width="20%">${params.bankAccount}</td>
      <td width="5%">账户开户行 </td>
      <td colspan="2" width="20%">${params.bankName}</td>
  </tr>
  <tr>
      <td width="5%" height="25px">支付宝 </td>
      <td colspan="3">${params.alipayAccount}</td>
      <td width="5%" height="25px">微信</td>
      <td colspan="7">${params.wechatAccount}</td>
  </tr>`
  //dealInfo
  tbodyStr = tbodyStr + `
    <tr>
        <td colspan="12" bgcolor="yellow" align="left">应付账款 </td>
    </tr>
  `
  tbodyStr = tbodyStr + `<tr>
          <td colspan="1" >序号</td>
          <td colspan="1" >发车时间</td>
          <td colspan="1" >短驳批次号</td>
          <td colspan="1" >发车网点</td>
          <td colspan="1" >到达网点</td>
          <td colspan="1" >配载件数</td>
          <td colspan="1" >配载重量</td>
          <td colspan="1" >配载体积</td>
          <td colspan="1" >司机</td>
          <td colspan="2" >短驳费</td>
          <td colspan="1" >备注</td>
      </tr>`

  for (let i = 0; i < params.payDetailList.length; i++) {

    tbodyStr += `
             <tr>
              <td colspan="1" >${i + 1}</td>
              <td colspan="1" >${params.payDetailList[i].departureTime ? params.payDetailList[i].departureTime : ''}</td>
              <td colspan="1" >${params.payDetailList[i].batchNo ? params.payDetailList[i].batchNo : ''}</td>
              <td colspan="1" >${params.payDetailList[i].orgName ? params.payDetailList[i].orgName : ''}</td>
              <td colspan="1" >${params.payDetailList[i].arriveOrgName ? params.payDetailList[i].arriveOrgName : ''}</td>
              <td colspan="1" >${params.payDetailList[i].loadAmount ? params.payDetailList[i].loadAmount : ''}</td>
              <td colspan="1" >${params.payDetailList[i].loadWeight ? params.payDetailList[i].loadWeight : ''}</td>
              <td colspan="1" >${params.payDetailList[i].loadVolume ? params.payDetailList[i].loadVolume : ''}</td>
              <td colspan="1" >${params.payDetailList[i].driverName ? params.payDetailList[i].driverName : ''}</td>
              <td colspan="2" >${params.payDetailList[i].shortPay ? params.payDetailList[i].shortPay : '' }</td>
              <td colspan="1" >${params.payDetailList[i].remark ? params.payDetailList[i].remark : ''}</td>
            </tr>
    `
  }
  //dealInfo
  //dealPayInfo
  tbodyStr = tbodyStr + `
    <tr>
        <td colspan="12" bgcolor="rgb(255,193,0)" align="left">已付清单(本结算期内) </td>
    </tr>
  `
  tbodyStr = tbodyStr + `<tr>
          <td colspan="1" >序号</td>
          <td colspan="1" >发车时间</td>
          <td colspan="1" >短驳批次号</td>
          <td colspan="1" >发车网点</td>
          <td colspan="1" >到达网点</td>
          <td colspan="1" >配载件数</td>
          <td colspan="1" >配载重量</td>
          <td colspan="1" >配载体积</td>
          <td colspan="1" >司机</td>
          <td colspan="2" >短驳费</td>
          <td colspan="1" >备注</td>
      </tr>`
  // tbodyStr = tbodyStr
  for (let i = 0; i < params.hadPayDetailList.length; i++) {
    tbodyStr += `
             <tr>
              <td colspan="1">${i + 1}</td>
              <td colspan="1" >${params.hadPayDetailList[i].departureTime ? params.hadPayDetailList[i].departureTime : ''}</td>
              <td colspan="1" >${params.hadPayDetailList[i].batchNo ? params.hadPayDetailList[i].batchNo : ''}</td>
              <td colspan="1" >${params.hadPayDetailList[i].orgName ? params.hadPayDetailList[i].orgName : ''}</td>
              <td colspan="1" >${params.hadPayDetailList[i].arriveOrgName ? params.hadPayDetailList[i].arriveOrgName : ''}</td>
              <td colspan="1" >${params.hadPayDetailList[i].loadAmount ? params.hadPayDetailList[i].loadAmount : ''}</td>
              <td colspan="1" >${params.hadPayDetailList[i].loadWeight ? params.hadPayDetailList[i].loadWeight : ''}</td>
              <td colspan="1" >${params.hadPayDetailList[i].loadVolume ? params.hadPayDetailList[i].loadVolume : ''}</td>
              <td colspan="1" >${params.hadPayDetailList[i].driverName ? params.hadPayDetailList[i].driverName : ''}</td>
              <td colspan="2" >${params.hadPayDetailList[i].shortPay ? params.hadPayDetailList[i].shortPay : ''}</td>
              <td colspan="1" >${params.hadPayDetailList[i].remark ? params.hadPayDetailList[i].remark : ''}</td>
            </tr>
    `
  }
  //dealPayInfo
  // alreadyPayInfo
  tbodyStr = tbodyStr + `
    <tr>
      <td >备注</td>
      <td colspan="11">${params.remark}</td>
    </tr>
  `
  tbodyStr = tbodyStr + `
    <tr>
      <td colspan="12" bgcolor="yellow">若对以上对账 明细有疑问，请及时联系我们，我们的联系信息如下</td>
      
    </tr>
  `
  tbodyStr = tbodyStr + `
    <tr>
      <td width="5%" height="10px">公司名称</td>
      <td colspan="2">${params.companyName}</td>
      <td width="5%" height="10px">业务负责人</td>
      <td colspan="2">${params.orgBusinessOfficer}</td>
      <td width="5%" height="10px">联系方式</td>
       <td colspan="2">${params.orgBusinessOfficerPhone}</td>
       <td width="5%" height="10px">财务负责人</td>
       <td colspan="2">${params.orgFinancialOfficer}</td>
       </tr>
       <tr>
       <td width="5%" height="10px">联系方式</td>
       <td colspan="2">${params.orgFinancialOfficerPhone}</td>
       <td width="5%" height="10px">时间</td>
       <td colspan="8">${params.createTime}</td>
    </tr>
  `
  tbody.innerHTML = tbodyStr
  div.appendChild(infoDiv)
  thead.innerHTML = theadStr
  table.appendChild(thead)
  table.appendChild(tbody)
  infoDiv.appendChild(table)
  div.appendChild(infoDiv)
  document.body.appendChild(div)
  return tableId
}


//干线
function createCarfeefeeArt(params) {
  console.log(params, params.payDetailList)

  //初始化tmsFinanceBillCheckDto
  for (var i in params) {
    params[i] = params[i] === null || undefined ? '' : params[i]
  }
  for (var i in params.payDetailList) {
    params.payDetailList[i] = params.payDetailList[i] === null || undefined ? '' : params.payDetailList[i]
    // alert(params.payDetailList[i])
  }
  //初始化dealInfo
  const tableId = 'dataTable' + String(new Date().getTime()) // 设置打印表格id
  const div = document.createElement('div')
  const infoDiv = document.createElement('font')
  infoDiv.setAttribute('size', '2')
  const table = document.createElement('table')
  div.id = tableId
  const thead = document.createElement('thead')
  const tbody = document.createElement('tbody')
  table.style.border = '1px solid #ff000';
  table.setAttribute('border', '1')
  table.setAttribute('font', '12px')
  table.setAttribute('width', '1800')
  table.setAttribute('table-layout', 'fixed')
  tbody.setAttribute('style', "text-align:center;")
  var theadStr = ''
  // 标题
  theadStr = `
    <tr>
      <td colspan="18" style="text-align: center;border:1px double red;margin-left: -1px;margin-top: -1px;height:60px" >${params.checkBillName}</td>
    </tr>
   `
  let tbodyStr = ` <tr>
    <td width="5%" height="25px">车牌号 </td>
    <td colspan="3" width="20%">${params.memberName}</td>
    <td width="5%"  height="25px">司机</td>
    <td colspan="3" width="20%">${params.memberPerson}</td>
    <td width="5%" height="25px">联系方式</td>
    <td colspan="5" width="20%">${params.memberPersonPhone}</td>
    <td width="5%" height="25px">对账单编号 </td>
    <td colspan="3" width="15%">${params.checkBillCode}</td>
  </tr>
   <tr>
     
      <td width="5%" height="25px">开始时间</td>
      <td colspan="3" width="20%"> ${params.checkStartTime}</td>
      <td width="5%" height="25px">结束时间 </td>
      <td colspan="3" width="20%">${params.checkEndTime}</td>
      
      <td width="5%">账户账号</td>
      <td colspan="5" width="20%">${params.bankAccount}</td>
      <td width="5%">账户开户行 </td>
      <td colspan="3" width="20%">${params.bankName}</td>
  </tr>
  <tr>
      <td width="5%" height="25px">支付宝 </td>
      <td colspan="3">${params.alipayAccount}</td>
      <td width="5%" height="25px">微信</td>
      <td colspan="13">${params.wechatAccount}</td>
  </tr>`
  //dealInfo
  tbodyStr = tbodyStr + `
    <tr>
        <td colspan="18" bgcolor="yellow" align="left">应付账款 </td>
    </tr>
  `
  tbodyStr = tbodyStr + `<tr>
          <td colspan="1" >序号</td>
          <td colspan="1" >发车时间</td>
          <td colspan="1" >批次号</td>
          <td colspan="1" >合同编号</td>
          <td colspan="1" >发车网点</td>
          <td colspan="1" >到达网点</td>
          <td colspan="1" >司机</td>
          <td colspan="1" >配载件数</td>
          <td colspan="1" >配载重量</td>
          <td colspan="1" >配载体积</td>
          <td colspan="1" >现付运费</td>
          <td colspan="1" >现付油卡</td>
          <td colspan="1" >回付运费</td>
          <td colspan="1" >回付油卡</td>
          <td colspan="1" >到付运费</td>
          <td colspan="1" >到付油卡</td>
          <td colspan="1" >运费合计</td>
          <td colspan="1" >备注</td>
      </tr>`

  for (let i = 0; i < params.payDetailList.length; i++) {

    tbodyStr += `
             <tr>
              <td colspan="1" >${i + 1}</td>
              <td colspan="1" >${params.payDetailList[i].departureTime ? params.payDetailList[i].departureTime : ''}</td>
              <td colspan="1" >${params.payDetailList[i].batchNo ? params.payDetailList[i].batchNo : ''}</td>
              <td colspan="1" >${params.payDetailList[i].contractNo ? params.payDetailList[i].contractNo : ''} </td>
              <td colspan="1" >${params.payDetailList[i].orgName ? params.payDetailList[i].orgName : ''}</td>
              <td colspan="1" >${params.payDetailList[i].arriveOrgName ? params.payDetailList[i].arriveOrgName : ''}</td>
              <td colspan="1" >${params.payDetailList[i].driverName ? params.payDetailList[i].driverName : ''}</td>
              <td colspan="1" >${params.payDetailList[i].loadAmount ? params.payDetailList[i].loadAmount : ''}</td>
              <td colspan="1" >${params.payDetailList[i].loadWeight ? params.payDetailList[i].loadWeight : ''}</td>
              <td colspan="1" >${params.payDetailList[i].loadVolume ? params.payDetailList[i].loadVolume : ''}</td>
              <td colspan="1" >${params.payDetailList[i].onSendPay ? params.payDetailList[i].onSendPay : ''}</td>
              <td colspan="1" >${params.payDetailList[i].onCardPay ? params.payDetailList[i].onCardPay : ''}</td>
              <td colspan="1" >${params.payDetailList[i].backSendPay ? params.payDetailList[i].backSendPay : ''}</td>
              <td colspan="1" >${params.payDetailList[i].backCardPay ? params.payDetailList[i].backCardPay : ''}</td>
              <td colspan="1" >${params.payDetailList[i].arrSendPay ? params.payDetailList[i].arrSendPay : ''}</td>
              <td colspan="1" >${params.payDetailList[i].arrCardPay ? params.payDetailList[i].arrCardPay : ''}</td>
              <td colspan="1" >${params.payDetailList[i].totalPay ? params.payDetailList[i].totalPay : ''}</td>
              <td colspan="1" >${params.payDetailList[i].remark ? params.payDetailList[i].remark : ''}</td>
            </tr>
    `
  }
  //dealInfo
  //dealPayInfo
  tbodyStr = tbodyStr + `
    <tr>
        <td colspan="18" bgcolor="rgb(255,193,0)" align="left">已付清单(本结算期内) </td>
    </tr>
  `
  tbodyStr = tbodyStr + `<tr>
          <td colspan="1" >序号</td>
          <td colspan="1" >发车时间</td>
          <td colspan="1" >批次号</td>
          <td colspan="1" >合同编号</td>
          <td colspan="1" >发车网点</td>
          <td colspan="1" >到达网点</td>
          <td colspan="1" >司机</td>
          <td colspan="1" >配载件数</td>
          <td colspan="1" >配载重量</td>
          <td colspan="1" >配载体积</td>
          <td colspan="1" >现付运费</td>
          <td colspan="1" >现付油卡</td>
          <td colspan="1" >回付运费</td>
          <td colspan="1" >回付油卡</td>
          <td colspan="1" >到付运费</td>
          <td colspan="1" >到付油卡</td>
          <td colspan="1" >运费合计</td>
          <td colspan="1" >备注</td>
      </tr>`
  // tbodyStr = tbodyStr
  for (let i = 0; i < params.hadPayDetailList.length; i++) {
    tbodyStr += `
             <tr>
              <td colspan="1">${i + 1}</td>
              <td colspan="1" >${params.hadPayDetailList[i].departureTime ? params.hadPayDetailList[i].departureTime : ''}</td>
              <td colspan="1" >${params.hadPayDetailList[i].batchNo ? params.hadPayDetailList[i].batchNo : ''}</td>
              <td colspan="1" >${params.hadPayDetailList[i].contractNo ? params.hadPayDetailList[i].contractNo : ''} </td>
              <td colspan="1" >${params.hadPayDetailList[i].orgName ? params.hadPayDetailList[i].orgName : ''}</td>
              <td colspan="1" >${params.hadPayDetailList[i].arriveOrgName ? params.hadPayDetailList[i].arriveOrgName : ''}</td>
              <td colspan="1" >${params.hadPayDetailList[i].driverName ? params.hadPayDetailList[i].driverName : ''}</td>
              <td colspan="1" >${params.hadPayDetailList[i].loadAmount ? params.hadPayDetailList[i].loadAmount : ''}</td>
              <td colspan="1" >${params.hadPayDetailList[i].loadWeight ? params.hadPayDetailList[i].loadWeight : ''}</td>
              <td colspan="1" >${params.hadPayDetailList[i].loadVolume ? params.hadPayDetailList[i].loadVolume : ''}</td>
              <td colspan="1" >${params.hadPayDetailList[i].onSendPay ? params.hadPayDetailList[i].onSendPay : ''}</td>
              <td colspan="1" >${params.hadPayDetailList[i].onCardPay ? params.hadPayDetailList[i].onCardPay : ''}</td>
              <td colspan="1" >${params.hadPayDetailList[i].backSendPay ? params.hadPayDetailList[i].backSendPay : ''}</td>
              <td colspan="1" >${params.hadPayDetailList[i].backCardPay ? params.hadPayDetailList[i].backCardPay : ''}</td>
              <td colspan="1" >${params.hadPayDetailList[i].arrSendPay ? params.hadPayDetailList[i].arrSendPay : ''}</td>
              <td colspan="1" >${params.hadPayDetailList[i].arrCardPay ? params.hadPayDetailList[i].arrCardPay : ''}</td>
              <td colspan="1" >${params.hadPayDetailList[i].totalPay ? params.hadPayDetailList[i].totalPay : ''}</td>
              <td colspan="1" >${params.hadPayDetailList[i].remark ? params.hadPayDetailList[i].remark : ''}</td>
            </tr>
    `
  }
  //dealPayInfo
  // alreadyPayInfo
  tbodyStr = tbodyStr + `
    <tr>
      <td >备注</td>
      <td colspan="17">${params.remark}</td>
    </tr>
  `
  tbodyStr = tbodyStr + `
    <tr>
      <td colspan="18" bgcolor="yellow">若对以上对账 明细有疑问，请及时联系我们，我们的联系信息如下</td>
      
    </tr>
  `
  tbodyStr = tbodyStr + `
    <tr>
      <td width="5%" height="10px">公司名称</td>
      <td colspan="3">${params.companyName}</td>
      <td width="5%" height="10px">业务负责人</td>
      <td colspan="3">${params.orgBusinessOfficer}</td>
      <td width="5%" height="10px">联系方式</td>
       <td colspan="5">${params.orgBusinessOfficerPhone}</td>
       <td width="5%" height="10px">财务负责人</td>
       <td colspan="3">${params.orgFinancialOfficer}</td>
       </tr>
       <tr>
       <td width="5%" height="10px">财务联系电话</td>
       <td colspan="3">${params.orgFinancialOfficerPhone}</td>
       <td width="5%" height="10px">时间</td>
       <td colspan="13">${params.createTime}</td>
    </tr>
  `
  tbody.innerHTML = tbodyStr
  div.appendChild(infoDiv)
  thead.innerHTML = theadStr
  table.appendChild(thead)
  table.appendChild(tbody)
  infoDiv.appendChild(table)
  div.appendChild(infoDiv)
  document.body.appendChild(div)
  return tableId
}


//送货
function createCarfeefeeDeliver(params) {
  console.log(params, params.payDetailList)

  //初始化tmsFinanceBillCheckDto
  for (var i in params) {
    params[i] = params[i] === null || undefined ? '' : params[i]
  }
  for (var i in params.payDetailList) {
    params.payDetailList[i] = params.payDetailList[i] === null || undefined ? '' : params.payDetailList[i]
    // alert(params.payDetailList[i])
  }
  //初始化dealInfo
  const tableId = 'dataTable' + String(new Date().getTime()) // 设置打印表格id
  const div = document.createElement('div')
  const infoDiv = document.createElement('font')
  infoDiv.setAttribute('size', '2')
  const table = document.createElement('table')
  div.id = tableId
  const thead = document.createElement('thead')
  const tbody = document.createElement('tbody')
  table.style.border = '1px solid #ff000';
  table.setAttribute('border', '1')
  table.setAttribute('font', '12px')
  table.setAttribute('width', '1800')
  table.setAttribute('table-layout', 'fixed')
  tbody.setAttribute('style', "text-align:center;")
  var theadStr = ''
  // 标题
  theadStr = `
    <tr>
      <td colspan="12" style="text-align: center;border:1px double red;margin-left: -1px;margin-top: -1px;height:60px" >${params.checkBillName}</td>
    </tr>
   `
  let tbodyStr = ` <tr>
    <td width="5%" height="25px">车牌号 </td>
    <td colspan="3" width="20%">${params.memberName}</td>
    <td width="5%"  height="25px">司机</td>
    <td colspan="1" width="20%">${params.memberPerson}</td>
    <td width="5%" height="25px">联系方式</td>
    <td colspan="2" width="20%">${params.memberPersonPhone}</td>
    <td width="5%" height="25px">对账单编号 </td>
    <td colspan="2" width="15%">${params.checkBillCode}</td>
  </tr>
   <tr>
     
      <td width="5%" height="25px">开始时间</td>
      <td colspan="3" width="20%"> ${params.checkStartTime}</td>
      <td width="5%" height="25px">结束时间 </td>
      <td colspan="1" width="20%">${params.checkEndTime}</td>
      
      <td width="5%">账户账号</td>
      <td colspan="2" width="20%">${params.bankAccount}</td>
      <td width="5%">账户开户行 </td>
      <td colspan="2" width="20%">${params.bankName}</td>
  </tr>
  <tr>
      <td width="5%" height="25px">支付宝 </td>
      <td colspan="3">${params.alipayAccount}</td>
      <td width="5%" height="25px">微信</td>
      <td colspan="7">${params.wechatAccount}</td>
  </tr>`
  //dealInfo
  tbodyStr = tbodyStr + `
    <tr>
        <td colspan="12" bgcolor="yellow" align="left">应付账款 </td>
    </tr>
  `
  tbodyStr = tbodyStr + `<tr>
          <td colspan="1" >序号</td>
          <td colspan="1" >送货时间</td>
          <td colspan="1" >送货批次号</td>
          <td colspan="1" >司机</td>
          <td colspan="1" >发车网点</td>
          <td colspan="1" >配载件数</td>
          <td colspan="1" >配载重量</td>
          <td colspan="1" >配载体积</td>
          <td colspan="3" >送货费</td>
          <td colspan="1" >备注</td>
      </tr>`

  for (let i = 0; i < params.payDetailList.length; i++) {

    tbodyStr += `
             <tr>
              <td colspan="1" >${i + 1}</td>
              <td colspan="1" >${params.payDetailList[i].departureTime ? params.payDetailList[i].departureTime : ''}</td>
              <td colspan="1" >${params.payDetailList[i].batchNo ? params.payDetailList[i].batchNo : ''}</td>
              <td colspan="1" >${params.payDetailList[i].driverName ? params.payDetailList[i].driverName : ''}</td>
              <td colspan="1" >${params.payDetailList[i].orgName ? params.payDetailList[i].orgName : ''}</td>
              <td colspan="1" >${params.payDetailList[i].loadAmount ? params.payDetailList[i].loadAmount : ''}</td>
              <td colspan="1" >${params.payDetailList[i].loadWeight ? params.payDetailList[i].loadWeight : ''}</td>
              <td colspan="1" >${params.payDetailList[i].loadVolume ? params.payDetailList[i].loadVolume : ''}</td>
              <td colspan="3" >${params.payDetailList[i].sendPay ? params.payDetailList[i].sendPay : ''}</td>
              <td colspan="1" >${params.payDetailList[i].remark ? params.payDetailList[i].remark : ''}</td>
            </tr>
    `
  }
  //dealInfo
  //dealPayInfo
  tbodyStr = tbodyStr + `
    <tr>
        <td colspan="12" bgcolor="rgb(255,193,0)" align="left">已付清单(本结算期内) </td>
    </tr>
  `
  tbodyStr = tbodyStr + `<tr>
          <td colspan="1" >序号</td>
          <td colspan="1" >送货时间</td>
          <td colspan="1" >送货批次号</td>
          <td colspan="1" >司机</td>
          <td colspan="1" >发车网点</td>
          <td colspan="1" >配载件数</td>
          <td colspan="1" >配载重量</td>
          <td colspan="1" >配载体积</td>
          <td colspan="3" >送货费</td>
          <td colspan="1" >备注</td>
      </tr>`
  // tbodyStr = tbodyStr
  for (let i = 0; i < params.hadPayDetailList.length; i++) {
    tbodyStr += `
             <tr>
              <td colspan="1">${i + 1}</td>
              <td colspan="1" >${params.hadPayDetailList[i].departureTime ? params.hadPayDetailList[i].departureTime : ''}</td>
              <td colspan="1" >${params.hadPayDetailList[i].batchNo ? params.hadPayDetailList[i].batchNo : ''}</td>
              <td colspan="1" >${params.hadPayDetailList[i].driverName ? params.hadPayDetailList[i].driverName : ''}</td>
              <td colspan="1" >${params.hadPayDetailList[i].orgName ? params.hadPayDetailList[i].orgName : ''}</td>
              <td colspan="1" >${params.hadPayDetailList[i].loadAmount ? params.hadPayDetailList[i].loadAmount : ''}</td>
              <td colspan="1" >${params.hadPayDetailList[i].loadWeight ? params.hadPayDetailList[i].loadWeight : ''}</td>
              <td colspan="1" >${params.hadPayDetailList[i].loadVolume ? params.hadPayDetailList[i].loadVolume : ''}</td>
              <td colspan="3" >${params.hadPayDetailList[i].shortPay ? params.hadPayDetailList[i].shortPay : ''}</td>
              <td colspan="1" >${params.hadPayDetailList[i].remark ? params.hadPayDetailList[i].remark : ''}</td>
            </tr>
    `
  }
  //dealPayInfo
  // alreadyPayInfo
  tbodyStr = tbodyStr + `
    <tr>
      <td >备注</td>
      <td colspan="11">${params.remark}</td>
    </tr>
  `
  tbodyStr = tbodyStr + `
    <tr>
      <td colspan="12" bgcolor="yellow">若对以上对账 明细有疑问，请及时联系我们，我们的联系信息如下</td>
      
    </tr>
  `
  tbodyStr = tbodyStr + `
    <tr>
      <td width="5%" height="10px">公司名称</td>
      <td colspan="2">${params.companyName}</td>
      <td width="5%" height="10px">业务负责人</td>
      <td colspan="2">${params.orgBusinessOfficer}</td>
      <td width="5%" height="10px">联系方式</td>
       <td colspan="2">${params.orgBusinessOfficerPhone}</td>
       <td width="5%" height="10px">财务负责人</td>
       <td colspan="2">${params.orgFinancialOfficer}</td>
       </tr>
       <tr>
       <td width="5%" height="10px">财务联系电话</td>
       <td colspan="2">${params.orgFinancialOfficerPhone}</td>
       <td width="5%" height="10px">时间</td>
       <td colspan="8">${params.createTime}</td>
    </tr>
  `
  tbody.innerHTML = tbodyStr
  div.appendChild(infoDiv)
  thead.innerHTML = theadStr
  table.appendChild(thead)
  table.appendChild(tbody)
  infoDiv.appendChild(table)
  div.appendChild(infoDiv)
  document.body.appendChild(div)
  return tableId
}
