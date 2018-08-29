import Vue from 'vue'
import { MessageBox } from 'element-ui'
import Clipboard from './clipboard'
import DragDialog from './el-dragDialog'
import Waves from './waves'
import vueSticky from './sticky'
import { getUserInfo } from '@/utils/auth'

Clipboard.install()
DragDialog.install()
Waves.install()
vueSticky.install()

let hasPoint = false
let pointNum = 2
const VueDirectiveObject = {
  findInput: function(el) {
    return el.classList.contains('el-input') ? el.querySelector('input') : el
  },
  keepNumber: function() {
    var hasPoint = this.hasPoint
    var pointNum = this.pointNum
    // 如果第一位为小数点，则补0
    this.value = hasPoint ? this.value.replace(/[^0-9.]/g, '').replace(/\./, '*').replace(/\./g, '').replace(/\*/, '.').replace(/^\./, '0.').replace(new RegExp('^(\\d+)\\.(\\d{' + Math.abs(pointNum) + '}).*$'), '$1.$2') : this.value.replace(/\D/g, '').replace(/\./g, '')
  },
  keepNumberAndLetter() {
    this.value = this.value.replace(/[\u4E00-\u9FA5]/g, '')
  },
  onkeydown: function(event) {
    // console.log('event.keyCode:',event.keyCode,String.fromCharCode(event.keyCode),event.key,event.code, /[\d]/.test(String.fromCharCode(event.keyCode)))
    // enter ctrl+c ctrl+v ctrl+a ctrl+x 应该仍然可以使用
    // 左右、删除、tab键
    if (!(event.keyCode === 46) && !(event.keyCode === 8) && !(event.keyCode === 37) && !(event.keyCode === 39) && !(event.keyCode === 9) && !(event.key === '.' && this.hasPoint) && !(event.keyCode === 13) &&
    !((event.keyCode === 67 || event.keyCode === 86 || event.keyCode === 65 || event.keyCode === 88) && event.ctrlKey && !event.altKey && !event.shiftKey)
  ) {
      // 数字 小键盘数字
      if (!((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105))) {
        event.stopPropagation()
        event.preventDefault()
      }
    }
  }
}
// 限制只能输入数字
Vue.directive('numberOnly', {
  bind: function(el, binding) {
    // 判断是否需要小数点
    const arg = binding.arg || ''
    const el2 = VueDirectiveObject.findInput(el)
    // v-numberOnly:point2
    hasPoint = arg.indexOf('point') !== -1
    // 判断需要小数点后几位，默认为 俩位
    pointNum = parseInt(arg.replace('point', ''), 10) || 2
    if (el2) {
      el2.hasPoint = hasPoint
      el2.pointNum = pointNum
      el2.style.imeMode = 'disabled'
      el2.addEventListener('input', VueDirectiveObject.keepNumber)
      el2.addEventListener('keydown', VueDirectiveObject.onkeydown)
      el2.addEventListener('keyup', VueDirectiveObject.keepNumber)
      el2.addEventListener('change', VueDirectiveObject.keepNumber)
      el2.addEventListener('blur', VueDirectiveObject.keepNumber)
      // el2.addEventListener('onkeyup', VueDirectiveObject.keepNumber) // 20180809 lyy add
      // ...... 没毛病 ......
      /*       el2.addEventListener('blur', function(event) {
              // 隔100毫秒后再处理
              // 因为需要等elementUI回填数据后再处理
              setTimeout(() => {
                VueDirectiveObject.keepNumber.call(this, event)
              }, 100)
            }) */
      // 输入法关闭事件
      el2.addEventListener('compositionstart', VueDirectiveObject.keepNumber)
      el2.addEventListener('compositionend', VueDirectiveObject.keepNumber)
    }
  },
  unbind: function(el) {
    VueDirectiveObject.findInput(el).removeEventListener('input', VueDirectiveObject.keepNumber)
    VueDirectiveObject.findInput(el).removeEventListener('keydown', VueDirectiveObject.onkeydown)
  }
})
// 限制只能输入数字
Vue.directive('onlyNumberAndLetter', {
  bind: function(el, binding) {
    // 判断是否需要小数点
    const arg = binding.arg || ''
    const el2 = VueDirectiveObject.findInput(el)

    if (el2) {
      el2.style.imeMode = 'disabled'
      el2.addEventListener('input', VueDirectiveObject.keepNumberAndLetter)
      el2.addEventListener('keyup', VueDirectiveObject.keepNumberAndLetter)
      el2.addEventListener('change', VueDirectiveObject.keepNumberAndLetter)
      el2.addEventListener('blur', VueDirectiveObject.keepNumberAndLetter)
      /*       el2.addEventListener('blur', function(event) {
              // 隔100毫秒后再处理
              // 因为需要等elementUI回填数据后再处理
              setTimeout(() => {
                VueDirectiveObject.keepNumber.call(this, event)
              }, 100)
            }) */
      // 输入法关闭事件
      el2.addEventListener('compositionstart', VueDirectiveObject.keepNumberAndLetter)
      el2.addEventListener('compositionend', VueDirectiveObject.keepNumberAndLetter)
    }
  },
  unbind: function(el) {
    VueDirectiveObject.findInput(el).removeEventListener('input', VueDirectiveObject.keepNumberAndLetter)
  }
})
// 展示大图
function clickImageShowBig(el) {
  MessageBox.alert('<div class="showPictureBox"><img src="' + (el.getAttribute('imgurl') || el.src || el.href) + '" /></div>', {
    dangerouslyUseHTMLString: true,
    showConfirmButton: false,
    closeOnClickModal: true,
    center: true,
    customClass: 'showPictureWrapper',
    // 必须指定callback 或者 promise回调，否则会报错
    callback: () => {

    }
  })
}
// 全局绑定一个委托事件，用来侦测是否需要预览
function bingAppClickImageShow() {
  const el = document.getElementById('app')
  if (el) {
    el.addEventListener('click', function(e) {
      // 简单判断
      const find = e.srcElement
      if (find.classList.contains('toPreviewImg')) {
        e.preventDefault()
        e.stopPropagation()
        clickImageShowBig(find)
      }
    })
  }
}
bingAppClickImageShow()

Vue.directive('showPicture', {
  bind: function(el) {
    el.classList.add('toPreviewImage')

    el.addEventListener('click', function(e) {
      e.preventDefault()
      e.stopPropagation()
      clickImageShowBig(el)
    })
  },
  inserted: function(el) {
    const par = el.parentElement
    if (par && par.classList.contains('clickimg')) {
      par.addEventListener('click', function(e) {
        e.preventDefault()
        e.stopPropagation()
        clickImageShowBig(el)
      })
    }
  },
  unbind: function(el) {

  }
})

/** 权限指令**/
Vue.directive('has', {
  bind: function(el, binding) {
    if (!Vue.prototype.$_has_permission(binding.value)) {
      el.parentNode.removeChild(el)
    }
  }
})
// 权限检查方法
Vue.prototype.$_has_permission = function(value) {
  let isExist = false
  const buttonperms = getUserInfo()
  if (buttonperms == undefined || buttonperms == null) {
    return false
  }
  if (!buttonperms.permissionTrees || !buttonperms.permissionTrees.length) {
    return false
  }
  const ptree = buttonperms.permissionTrees
  for (let i = 0; i < ptree.length; i++) {
    if (ptree[i].perms.indexOf(value) > -1) {
      isExist = true
      break
    }
  }
  return isExist
}
