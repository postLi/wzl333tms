function activeShuoZhengCheck() {
  if ($B.type == 'edge') {
    alert('尚未支持Edge, 请点击右上角的...(更多), 用Internet Explore打开.')
  } else if ($B.type == 'ie') {
    // location.href=url + '?110';
  } else if ($B.npapi || $B.ppapi) {
    // location.href=url + '?110';
  } else {
    // 插件未安装
    if ($B.type == 'chrome') {
      if ($B.chrome_install_apitype == 'npapi')
        {window.open("install_chrome.htm");}
      else {
        var ofrm = document.getElementById('frm')
        ofrm.height = 700
        ofrm.contentWindow.location.href = 'http://www.supcan.cn/download/clientinstall.htm?110'
        olbl.innerHTML = '下载 Chrome 浏览器插件安装包'
      }
    } else { // Firefox
      if ($B.is64)
        {alert("抱歉, 不支持 64位Firefox");}
      else
        {window.open("binary/supcan.xpi");}
    }
  }
}

function autoResize() {
  var dv = document.getElementById('main')
  var height = (document.documentElement.clientHeight - 10) + 'px'
  dv.style.height = height
}
window.onload = function() {
  autoResize()
  activeShuoZhengCheck()
}
window.onresize = function() {
  autoResize()
}

function getUrlParams() { // 获取url里面的参数
  var str = decodeURI(location.href)
  // var str = location.href
  var num = str.indexOf('?')
  str = str.substr(num + 1)
  var arr = str.split('&')
  var query = new Object()

  for (var i = 0; i < arr.length - 1; i++) {
    num = arr[i].indexOf('=')
    if (num > 0) {
      name = arr[i].substring(0, num)
      value = arr[i].substr(num + 1)
      query[name] = value
    }
  }

  var strQuery = '?'
  for (var item in query) {
    if (item !== 'func') {
      strQuery += item + '=' + query[item] + '&'
    }
  }
  strQuery = strQuery.substr(0, strQuery.length - 1)
  console.log(strQuery)
  return strQuery
}

function getValue(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  var res = window.location.search.substr(1).match(reg)
  if (res[2]) {
    return res[2]
  } else {
    return null
  }
}

function getToken() { // 获取token
  var urlToken = getValue('access_token')
  return urlToken
}

function hideChart(bGray) { // 隐藏
  AF.func('grayWindow', '')
  if (bGray) {
    AF.func('grayWindow', '1\r\n backcolor=#FFFFFF;alpha=100')
  }
}
console.log('sdfsdf')
function OnEvent(id, Event, p1) {
  console.log(id, Event, p1)
  if (Event == 'Print') {
    AF.func('Callfunc', '11', 'isOpenSysDialog=true; WorkSheet=Current')
  }
  if (Event == 'Preview')
    {AF.func("Callfunc", "18");}

  if (Event == 'Setting')
    {AF.func("Callfunc", "216");}
}
