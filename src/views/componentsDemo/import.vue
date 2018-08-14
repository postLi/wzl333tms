<template>
  <div>
    <h2>批量导入</h2>
    <ImportDialog :popVisible="importDialogVisible" @close="importDialogVisible = false" @success="fetchData" :info="'driver'"></ImportDialog>
    <el-row :gutter="12">
      <el-col :span="12">
        <div class="component-remark">
          <el-alert title="// html " type="primary" :closable="false" style="margin-top: 10px;">
            <div v-html class="component-remark-html">
              {{htmlMessage1}}
              <el-button type="info" icon="el-icon-document" size="mini" plain v-clipboard:copy='htmlMessage1' v-clipboard:success='clipboardSuccess'>copy</el-button>
            </div>
          </el-alert>
          <el-alert title="// script ^^举个栗子^^" type="primary" :closable="false" style="margin-top: 10px;">
            <div v-html class="component-remark-html">
              import ImportDialog from '@/components/importDialog' // 引入通用方法
              <br> export default {
              <br> &nbsp;&nbsp;components: { ImportDialog },
              <br> &nbsp;&nbsp;data () {
              <br> &nbsp;&nbsp;&nbsp;&nbsp;return {
              <br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;importDialogVisible: false, // 默认弹出框关闭
              <br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}
              <br> &nbsp;&nbsp;&nbsp;&nbsp;},
              <br> &nbsp;&nbsp;methods: {
              <br> &nbsp;&nbsp;&nbsp;&nbsp;doAction(type) {
              <br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;switch (type) {
              <br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;case 'import': // 点击打开导入弹出框
              <br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;this.importDialogVisible = true
              <br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;break
              <br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}
              <br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}
              <br> &nbsp;&nbsp;&nbsp;&nbsp;fetchData () { // 重新获取列表数据 }
              <br> &nbsp;&nbsp;}
              <br> }
              <br>
            </div>
          </el-alert>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="component-remark">
          <el-alert title="" type="primary" :closable="false" style="margin-top: 10px;">
            <el-button @click="doAction('import')" type="primary" plain size="mini" icon="el-icon-upload2">批量导入</el-button>
          </el-alert>
          <el-alert title="" type="primary" :closable="false" style="margin-top: 10px;">
            <h3>需求</h3>
            <p>按照模板下载excel模板，然后用户填充数据后，上传excel表格文件，从而导入数据。</p>
          </el-alert>
          <el-alert title="" type="primary" :closable="false" style="margin-top: 10px;">
            <h3>标识 info <el-tag size="mini" type="info">String</el-tag> <el-tag size="mini">必填项</el-tag></h3>
            <b>使用 < el-table :info="'sender'" > < /el-table></b><br>
            <p>标识(具体标识如下)</p>
            <br>
            <ol>
              <li>'driver'：司机</li>
              <li>'carrier'：承运商</li>
              <li>'truck'：车辆</li>
              <li>'sender'：发货人</li>
              <li>'receiver'：收货人</li>
            </ol>
          </el-alert>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import ImportDialog from '@/components/importDialog'
export default {
  components: {
    ImportDialog
  },
  data() {
    return {
      importDialogVisible: false,
      htmlMessage1: '<ImportDialog :popVisible="importDialogVisible" @close="importDialogVisible = false" @success="fetchData" :info="\'driver\'"></ImportDialog>'
    }
  },
  methods: {
    doAction(type) {
      switch (type) {
        case 'import':
          this.importDialogVisible = true
          break
      }
    },
    fetchData() {
      // 重新获取列表数据
    },
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
<style lang="scss">
.component-remark {
  width: 100%;
  background-color: #eee;
  padding: 10px 20px;
  margin-top: 10px;
  h5 {
    margin: 10px;
  }
  .component-remark-html {
    font-size: 13px;
    line-height: 18px;
  }
}

</style>
