window.CreatedOKLodop7766 = null;

//====判断是否需要安装CLodop云打印服务器:====
function needCLodop() {
  try {
    var ua = navigator.userAgent;
    if (ua.match(/Windows\sPhone/i) != null) return true;
    if (ua.match(/iPhone|iPod/i) != null) return true;
    if (ua.match(/Android/i) != null) return true;
    if (ua.match(/Edge\D?\d+/i) != null) return true;

    var verTrident = ua.match(/Trident\D?\d+/i);
    var verIE = ua.match(/MSIE\D?\d+/i);
    var verOPR = ua.match(/OPR\D?\d+/i);
    var verFF = ua.match(/Firefox\D?\d+/i);
    var x64 = ua.match(/x64/i);
    if ((verTrident == null) && (verIE == null) && (x64 !== null))
      return true;
    else
    if (verFF !== null) {
      verFF = verFF[0].match(/\d+/);
      if ((verFF[0] >= 41) || (x64 !== null)) return true;
    } else
    if (verOPR !== null) {
      verOPR = verOPR[0].match(/\d+/);
      if (verOPR[0] >= 32) return true;
    } else
    if ((verTrident == null) && (verIE == null)) {
      var verChrome = ua.match(/Chrome\D?\d+/i);
      if (verChrome !== null) {
        verChrome = verChrome[0].match(/\d+/);
        if (verChrome[0] >= 41) return true;
      };
    };
    return false;
  } catch (err) { return true; };
};

//====页面引用CLodop云打印必须的JS文件：====
if (needCLodop()) {
  var head = document.head || document.getElementsByTagName("head")[0] || document.documentElement;
  var oscript = document.createElement("script");
  oscript.src = "http://localhost:8000/CLodopfuncs.js?priority=1";
  head.insertBefore(oscript, head.firstChild);

  //引用双端口(8000和18000）避免其中某个被占用：
  oscript = document.createElement("script");
  oscript.src = "http://localhost:18000/CLodopfuncs.js?priority=0";
  head.insertBefore(oscript, head.firstChild);
};

//====获取LODOP对象的主过程：====
function getLodop(oOBJECT, oEMBED) {
  var strHtmInstall = "<br><font color='#FF00FF'>打印控件未安装!点击这里<a href='install_lodop32.exe' target='_self'>执行安装</a>,安装后请刷新页面或重新进入。</font>";
  var strHtmUpdate = "<br><font color='#FF00FF'>打印控件需要升级!点击这里<a href='install_lodop32.exe' target='_self'>执行升级</a>,升级后请重新进入。</font>";
  var strHtm64_Install = "<br><font color='#FF00FF'>打印控件未安装!点击这里<a href='install_lodop64.exe' target='_self'>执行安装</a>,安装后请刷新页面或重新进入。</font>";
  var strHtm64_Update = "<br><font color='#FF00FF'>打印控件需要升级!点击这里<a href='install_lodop64.exe' target='_self'>执行升级</a>,升级后请重新进入。</font>";
  var strHtmFireFox = "<br><br><font color='#FF00FF'>（注意：如曾安装过Lodop旧版附件npActiveXPLugin,请在【工具】->【附加组件】->【扩展】中先卸它）</font>";
  var strHtmChrome = "<br><br><font color='#FF00FF'>(如果此前正常，仅因浏览器升级或重安装而出问题，需重新执行以上安装）</font>";
  var strCLodopInstall = "<br><font color='#FF00FF'>CLodop云打印服务(localhost本地)未安装启动!点击这里<a href='CLodop_Setup_for_Win32NT.exe' target='_self'>执行安装</a>,安装后请刷新页面。</font>";
  var strCLodopUpdate = "<br><font color='#FF00FF'>CLodop云打印服务需升级!点击这里<a href='CLodop_Setup_for_Win32NT.exe' target='_self'>执行升级</a>,升级后请刷新页面。</font>";
  var LODOP;
  try {
    var isIE = (navigator.userAgent.indexOf('MSIE') >= 0) || (navigator.userAgent.indexOf('Trident') >= 0);
    if (needCLodop()) {
      try { LODOP = getCLodop(); } catch (err) {};
      if (!LODOP && document.readyState !== "complete") { alert("C-Lodop没准备好，请稍后再试！"); return; };
      if (!LODOP) {
        if (isIE) document.write(strCLodopInstall);
        else
          document.body.innerHTML = strCLodopInstall + document.body.innerHTML;
        return;
      } else {
        if (CLODOP.CVERSION < "3.0.4.3") {
          if (isIE) document.write(strCLodopUpdate);
          else
            document.body.innerHTML = strCLodopUpdate + document.body.innerHTML;
        };
        if (oEMBED && oEMBED.parentNode) oEMBED.parentNode.removeChild(oEMBED);
        if (oOBJECT && oOBJECT.parentNode) oOBJECT.parentNode.removeChild(oOBJECT);
      };
    } else {
      var is64IE = isIE && (navigator.userAgent.indexOf('x64') >= 0);
      //=====如果页面有Lodop就直接使用，没有则新建:==========
      if (oOBJECT != undefined || oEMBED != undefined) {
        if (isIE) LODOP = oOBJECT;
        else LODOP = oEMBED;
      } else if (CreatedOKLodop7766 == null) {
        LODOP = document.createElement("object");
        LODOP.setAttribute("width", 0);
        LODOP.setAttribute("height", 0);
        LODOP.setAttribute("style", "position:absolute;left:0px;top:-100px;width:0px;height:0px;");
        if (isIE) LODOP.setAttribute("classid", "clsid:2105C259-1E0C-4534-8141-A753534CB4CA");
        else LODOP.setAttribute("type", "application/x-print-lodop");
        document.documentElement.appendChild(LODOP);
        CreatedOKLodop7766 = LODOP;
      } else LODOP = CreatedOKLodop7766;
      //=====Lodop插件未安装时提示下载地址:==========
      if ((LODOP == null) || (typeof(LODOP.VERSION) == "undefined")) {
        if (navigator.userAgent.indexOf('Chrome') >= 0)
          document.body.innerHTML = strHtmChrome + document.body.innerHTML;
        if (navigator.userAgent.indexOf('Firefox') >= 0)
          document.body.innerHTML = strHtmFireFox + document.body.innerHTML;
        if (is64IE) document.write(strHtm64_Install);
        else
        if (isIE) document.write(strHtmInstall);
        else
          document.body.innerHTML = strHtmInstall + document.body.innerHTML;
        return LODOP;
      };
    };
    if (LODOP.VERSION < "6.2.2.3") {
      if (!needCLodop()) {
        if (is64IE) document.write(strHtm64_Update);
        else
        if (isIE) document.write(strHtmUpdate);
        else
          document.body.innerHTML = strHtmUpdate + document.body.innerHTML;
      };
      return LODOP;
    };
    //===如下空白位置适合调用统一功能(如注册语句、语言选择等):===

    //===========================================================
    return LODOP;
  } catch (err) { alert("getLodop出错:" + err); };
};

window.LODOP; //声明为全局变量   
//直接打印
function myPrint() {
  CreatePrintPage();
  LODOP.PRINT();
};
//选择打印机
function myPrintA() {
  CreatePrintPage();
  LODOP.PRINTA();
};
//  打印预览
function myPreview() {
  CreatePrintPage();
  LODOP.SET_PREVIEW_WINDOW(0, 0, 0, 2400, 1400, "");
  LODOP.PREVIEW();
};
//打印维护  
function mySetup() {
  CreatePrintPage();
  LODOP.PRINT_SETUP();
};
//打印设计  
function myDesign() {
  CreatePrintPage();
  LODOP.PRINT_DESIGN();
};
//空白设计  
function myBlankDesign() {
  LODOP = getLodop();
  LODOP.PRINT_INIT("打印控件功能演示_Lodop功能_空白练习");
  LODOP.PRINT_DESIGN();
};
//打印表格
function PrintInFullPage() {
  LODOP = getLodop();
  LODOP.PRINT_INIT("打印控件功能演示_Lodop功能_整页表格");
  LODOP.SET_PRINT_PAGESIZE(2, 0, 0, "A4");
  LODOP.ADD_PRINT_TABLE("2%", "1%", "96%", "98%", document.getElementById("div1").innerHTML);
  LODOP.SET_PREVIEW_WINDOW(0, 0, 0, 800, 600, "");
  LODOP.PREVIEW();
};

//创建打印页面    
function CreatePrintPage() {
  LODOP = getLodop();
  LODOP.PRINT_INITA(9, 7, 2400, 1400, "安发网络-青春物流托运单打印");
  LODOP.SET_PRINT_PAGESIZE(0, 2400, 1400, "A4");
  LODOP.ADD_PRINT_SETUP_BKIMG("D:\\resourcesfile\\images\\青春物流.jpg");
  LODOP.ADD_PRINT_TEXT(57, 47, 100, 25, "广州");
  LODOP.SET_PRINT_STYLEA(0, "FontSize", 11);
  LODOP.ADD_PRINT_TEXT(165, 14, 75, 20, "电脑");
  LODOP.SET_PRINT_STYLEA(0, "FontSize", 11);
  LODOP.ADD_PRINT_TEXT(38, 366, 109, 20, "2018-7-12");
  LODOP.SET_PRINT_STYLEA(0, "FontSize", 11);
  LODOP.ADD_PRINT_TEXT(324, 177, 166, 20, "这里是备注信息");
  LODOP.SET_PRINT_STYLEA(0, "FontSize", 11);
  LODOP.ADD_PRINT_TEXT(63, 170, 100, 20, "湖北");
  LODOP.ADD_PRINT_TEXT(41, 488, 100, 19, "201872808");
  LODOP.ADD_PRINT_TEXT(85, 93, 81, 20, "方坚");
  LODOP.ADD_PRINT_TEXT(114, 96, 82, 20, "刘德华");
  LODOP.ADD_PRINT_TEXT(90, 230, 202, 20, "广东省广州市番禺区市桥街道");
  LODOP.ADD_PRINT_TEXT(116, 234, 204, 20, "湖北省襄阳市樊城区春天大道2203");
  LODOP.ADD_PRINT_TEXT(90, 485, 100, 20, "13825160872");
  LODOP.ADD_PRINT_TEXT(112, 486, 100, 20, "13825160866");
  LODOP.ADD_PRINT_TEXT(164, 104, 60, 20, "90821");
  LODOP.ADD_PRINT_TEXT(163, 184, 29, 20, "件");
  LODOP.ADD_PRINT_TEXT(269, 323, 58, 20, "460元");
};

// 保存为xls文件
function SaveAsFile() {
  LODOP = getLodop();
  LODOP.PRINT_INIT("");
  LODOP.ADD_PRINT_TABLE("2%", "1%", "96%", "98%", document.getElementById("div1").innerHTML);
  //LODOP.ADD_PRINT_TABLE(100,20,900,80,document.documentElement.innerHTML); 
  LODOP.SET_SAVE_MODE("Orientation", 2); //Excel文件的页面设置：横向打印   1-纵向,2-横向;
  LODOP.SET_SAVE_MODE("PaperSize", 9); //Excel文件的页面设置：纸张大小   9-对应A4
  LODOP.SET_SAVE_MODE("Zoom", 90); //Excel文件的页面设置：缩放比例
  LODOP.SET_SAVE_MODE("CenterHorizontally", true); //Excel文件的页面设置：页面水平居中
  LODOP.SET_SAVE_MODE("CenterVertically", true); //Excel文件的页面设置：页面垂直居中
  //      LODOP.SET_SAVE_MODE("QUICK_SAVE",true);//快速生成（无表格样式,数据量较大时或许用到） 
  LODOP.SAVE_TO_FILE("新文件名.xls");
};

//检查当前是否有装lodop插件
function CheckIsInstall() {
  try {
    var LODOP = getLodop();
    if (LODOP.VERSION) {
      if (LODOP.CVERSION)
        alert("当前有C-Lodop云打印可用!\n C-Lodop版本:" + LODOP.CVERSION + "(内含Lodop" + LODOP.VERSION + ")");
      else
        alert("本机已成功安装了Lodop控件！\n 版本号:" + LODOP.VERSION);

    };
  } catch (err) {}
};
let lodop = {
    myPrint: myPrint(), //直接打印
    myPrintA: myPrintA(), //选择打印机
    myPreview: myPreview(), //打印预览
    mySetup: mySetup(), //直接打印
    myDesign: myDesign(), //直接打印
    myBlankDesign: myBlankDesign(), //直接打印
    PrintInFullPage: PrintInFullPage(), //直接打印
    CreatePrintPage: CreatePrintPage(), //直接打印
    SaveAsFile: SaveAsFile(), //直接打印
    CheckIsInstall: CheckIsInstall(), //直接打印
}
export default lodop