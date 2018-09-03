<template>
  <div>
    <h2>全局公共事件</h2>

    <blockquote>
      定义一些公共事件，方便在各个组件中调用<br><br>
    </blockquote>

    <h3>显/隐硕正报表</h3>
    <p>因为硕正报表属于浏览器插件形式展现，正常情况下普通dom元素不能覆盖在它上面，只能配合其AF.func('grayWindow', '')方法或者iframe来实现dom元素覆盖。</p>
    <p>this.eventBus.$emit('hideSupcanChart') 隐藏报表<br>this.eventBus.$emit('showSupcanChart') 显示报表</p>
    <p>ie下需要用配合iframe来提示dom元素的展示层级，可以参考右上角用户信息弹窗的实现~</p>


    <h3>展示运单详情</h3>
    <p>this.eventBus.$emit('showOrderDetail', orderid, shipSn, isTab)</p>
    <p>orderid 运单id；shipSn 运单号;isTab true为新开标签页展示，false为弹窗形式打开 </p>

    <h3>修改运单</h3>
    <p>以弹窗形式打开修改/创建运单</p>
    <p>（以订单转运单、以提货批次转运单是创建）</p>
    <p>this.eventBus.$emit('showCreateOrder', orderobj)</p>
    <pre>
      orderobj: {
        orderid: '', // 运单id 只传这个参数表示修改该运单

        batchid: '', // 提货批次id 以这个批次创建运单
        ordernum: 1, // 运单数量 该提货批次可以创建多少个运单
        batchobj: {}, // 提货批次对象

        preid: '', // 订单id 传这个表示从订单转运单
      }
    </pre>
    <p>this.eventBus.$emit('hideCreateOrder') 关闭修改运单的弹窗</p>

    <h3>替换当前标签页</h3>
    <p>this.eventBus.$emit('replaceCurrentView', route)<br>(route 可以为vue route对象或者链接字符串)</p>

    <h3>关闭当前标签页</h3>
    <p>this.eventBus.$emit('closeCurrentView')</p>

    <br>
    <br>
    <br>
    <br>

  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogTableVisible: false,
      inputData: '安发网络'
    }
  },
  methods: {
    clipboardSuccess() {
      this.$message({
        message: '复制成功',
        type: 'success',
        duration: 1500
      })
    }
  }
}
</script>

