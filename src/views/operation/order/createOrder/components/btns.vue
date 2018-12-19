<template>
  <div class="order-btns">
    <el-button v-if="keys.cleanKeyVisible === '1'" size="medium" @click="doAction('cleanKey')" icon="el-icon-circle-close-outline" type="danger" plain>清空（{{keys.cleanKey}}）</el-button>
    <el-button v-if="keys.printLibkeyVisible === '1'" size="medium" @click="doAction('printLibkey')" icon="el-icon-printer" type="primary" plain>打印标签（{{keys.printLibkey}}）</el-button>
    <el-button v-if="keys.printShipKeyVisible === '1'" size="medium" @click="doAction('printShipKey')" icon="el-icon-tickets" type="primary" plain>打印运单（{{keys.printShipKey}}）</el-button>
    <el-button v-if="keys.printLibShipKeyVisible === '1'" size="medium" @click="doAction('printLibShipKey')" icon="el-icon-tickets" type="primary" plain>打印运单和标签（{{keys.printLibShipKey}}）</el-button>
    <el-button v-if="keys.saveShipKeyVisible === '1'" size="medium" @click="doAction('saveShipKey')" icon="el-icon-document" type="primary" plain>保存（{{keys.saveShipKey}}）</el-button>
    <el-button class="saveInsertKey" v-if="keys.saveInsertKeyVisible === '1'" size="medium" @click="doAction('saveInsertKey')" icon="el-icon-tickets" type="primary" plain>保存并新增（{{keys.saveInsertKey}}）</el-button>
    <el-button v-if="keys.savePrintKeyVisible === '1'" size="medium" @click="doAction('savePrintKey')" icon="el-icon-circle-check-outline" type="success" plain>保存并打印（{{keys.savePrintKey}}）</el-button>
    <el-button v-if="keys.saveInsertPrintKeyVisible === '1'" size="medium" @click="doAction('saveInsertPrintKey')" icon="el-icon-circle-check-outline" type="success" plain>保存新增并打印（{{keys.saveInsertPrintKey}}）</el-button>
    
    <el-dropdown type="primary" trigger="click" class="createOrder-setup"  @command="handleCommand">
      <span class="el-dropdown-link">
        <el-button icon="el-icon-setting" size="mini" type="primary" plain></el-button>
      </span>
      
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="feeSetup">费用设置</el-dropdown-item>
        <el-dropdown-item command="personalSetup">个人设置</el-dropdown-item>
        <el-dropdown-item command="orderSetup">运单设置</el-dropdown-item>
        <el-dropdown-item command="openInNewWindow">独立窗口</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
// http://unixpapa.com/js/key.html
// http://wangchujiang.com/hotkeys/
// 键盘事件
import hotkeys from '@/utils/hotkeys'
import { closest } from '@/utils/'
import OrderApi from '@/api/operation/orderManage'

export default {
  props: {
    isChange: [String, Number]
  },
  data() {
    return {
      keys: {
        'printLibkey': '',
        'savePrintKey': '',
        'saveShipKey': '',
        'cleanKey': '',
        'printShipKey': '',
        saveInsertPrintKey: '',
        printLibShipKey: '',
        saveInsertKey: '',

        'printLibkeyVisible': 0,
        'savePrintKeyVisible': 0,
        'saveShipKeyVisible': 1,
        'cleanKeyVisible': 1,
        'printShipKeyVisible': 0,
        'saveInsertKeyVisible': 0,
        'printLibShipKeyVisible': 1,
        'saveInsertPrintKeyVisible': 1
      }
    }
  },
  mounted() {
    this.getKeySetup()
  },
  beforeDestroy() {
    this.unbindKey()
  },
  watch: {
    isChange() {
      this.getKeySetup()
    }
  },
  methods: {
    // 底部按钮操作
    doAction(type) {
      this.$emit('doAction', type)
    },
    // 右下角设置按钮菜单点击操作
    handleCommand(command) {
      this.$emit('doCommand', command)
    },
    // 获取快捷键设置
    getKeySetup() {
      return OrderApi.getPersonalSetup(this.otherinfo.id, 'printKey').then(res => {
        if (this.inited) {
          // 清除上一次绑定的快捷键
          this.unbindKey()
        } else {
          this.inited = true
        }
        // 需要在解绑后才赋值，避免解绑旧值失败
        this.keys = res

        // 重新绑定新的快捷键
        this.bindKey()
      }).catch((err) => {
        this.loading = false
        this._handlerCatchMsg(err)
      })
    },
    // 绑定快捷键
    bindKey() {
      for (const i in this.keys) {
        if (i.indexOf('Visible') === -1) {
          hotkeys(this.keys[i], (e) => {
          // 需要判断是否为开单页面才触发
            const elem = document.querySelector('.createOrder-main')
            if (elem) {
            // 因为有可能打开了其它标签页，所以需要判断当前标签页是否为开单页面
              if (elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length) {
                e.preventDefault()
                this.doAction(i)
              }
            }
          })
        }
      }
    },
    // 取消绑定快捷键
    unbindKey() {
      for (const i in this.keys) {
        if (i.indexOf('Visible') === -1) {
          hotkeys.unbind(this.keys[i])
        }
      }
    }
  }
}
</script>

