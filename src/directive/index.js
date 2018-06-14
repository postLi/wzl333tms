import Vue from 'vue'
import { MessageBox } from 'element-ui'
import Clipboard from './clipboard'
import DragDialog from './el-dragDialog'
import Waves from './waves'
import vueSticky from './sticky'

Clipboard.install()
DragDialog.install()
Waves.install()
vueSticky.install()

let hasPoint = false
const VueDirectiveObject = {
  findInput: function(el) {
    return el.classList.contains('el-input') ? el.querySelector('input') : el
  },
  keepNumber: function() {
    // 如果第一位为小数点，则补0
    this.value = hasPoint ? this.value.replace(/[^0-9.]/g, '').replace(/\./, '*').replace(/\./g, '').replace(/\*/, '.').replace(/^\./, '0.') : this.value.replace(/\D/g, '')
  },
  onkeydown: function(event) {
    // console.log('event.keyCode:',event.keyCode,String.fromCharCode(event.keyCode),event.key,event.code, /[\d]/.test(String.fromCharCode(event.keyCode)))
    // 左右、删除、tab键
    if (!(event.keyCode === 46) && !(event.keyCode === 8) && !(event.keyCode === 37) && !(event.keyCode === 39) && !(event.keyCode === 9) && !(event.key === '.' && hasPoint)) {
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
    hasPoint = binding.arg === 'point'
    VueDirectiveObject.findInput(el).addEventListener('input', VueDirectiveObject.keepNumber)
    VueDirectiveObject.findInput(el).addEventListener('keydown', VueDirectiveObject.onkeydown)
  },
  unbind: function(el) {
    VueDirectiveObject.findInput(el).removeEventListener('input', VueDirectiveObject.keepNumber)
    VueDirectiveObject.findInput(el).removeEventListener('keydown', VueDirectiveObject.onkeydown)
  }
})

Vue.directive('showPicture', {
  bind: function(el) {
    el.addEventListener('click', function(e) {
      e.preventDefault()
      e.stopPropagation()
      MessageBox.alert('<div class="showPictureBox"><img src="' + (this.getAttribute('imgurl') || el.src || el.href) + '" /></div>', {
        dangerouslyUseHTMLString: true,
        showConfirmButton: false,
        closeOnClickModal: true,
        center: true,
        customClass: 'showPictureWrapper'
      })
    })
  },
  unbind: function(el) {

  }
})
