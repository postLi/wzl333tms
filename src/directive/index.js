import Vue from 'vue'

const VueDirectiveObject = {
  findInput: function(el) {
    return el.classList.contains('el-input') ? el.querySelector('input') : el
  },
  keepNumber: function() {
    this.value = this.value.replace(/\D+/, '')
  },
  onkeydown: function(event) {
    // console.log('event.keyCode:',event.keyCode,String.fromCharCode(event.keyCode), /[\d]/.test(String.fromCharCode(event.keyCode)))

    if (!(event.keyCode === 46) && !(event.keyCode === 8) && !(event.keyCode === 37) && !(event.keyCode === 39) && !(event.keyCode === 9)) {
      if (!((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105))) {
        event.stopPropagation()
        event.preventDefault()
      }
    }
  }
}
// 限制只能输入数字
Vue.directive('numberOnly', {
  bind: function(el) {
    VueDirectiveObject.findInput(el).addEventListener('input', VueDirectiveObject.keepNumber)
    VueDirectiveObject.findInput(el).addEventListener('keydown', VueDirectiveObject.onkeydown)
  },
  unbind: function(el) {
    VueDirectiveObject.findInput(el).removeEventListener('input', VueDirectiveObject.keepNumber)
    VueDirectiveObject.findInput(el).removeEventListener('keydown', VueDirectiveObject.onkeydown)
  }
})
