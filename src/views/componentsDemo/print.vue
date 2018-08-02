<template>
  <div class="component">
    <h2>打印导出</h2>
    <h3>【敲黑板】用打印导出功能的一个重要前提是： 要做好【表格设置】的功能。elementUI重新封装了table，LODOP打印插件不能识别< el-table >数据，并且根据以下需求完成打印导出功能。</h3>
    <h3>【需求】</h3>
    <ul>
    	<li>1/</li>
    </ul>
    <el-button type="primary" icon="el-icon-setting" size="mini" plain @click="doAction('print')">打印</el-button>
    <el-button type="primary" icon="el-icon-setting" size="mini" plain @click="doAction('export')">导出</el-button>
  </div>
</template>

<script>
import { PrintInFullPage, SaveAsFile } from '@/utils/lodopFuncs'
export default {
  data() {
    return {}
  },
  methods: {
    doAction(type) {
      switch (type) {
        case 'print':
           PrintInFullPage()
          break
        case 'export':
          SaveAsFile()
          break
      }
    }
  }
}

</script>
