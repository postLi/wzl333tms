import Vue from 'vue'

Vue.directive('numberOnly', {
  bind: function() {
    this.handler = function() {
      this.el.value = this.el.value.replace(/\D+/, '')
    }.bind(this)
    this.el.addEventListener('input', this.handler)
  },
  unbind: function() {
    this.el.removeEventListener('input', this.handler)
  }
})
