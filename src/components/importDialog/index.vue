<template>
  <!-- 批量导入Excel弹出框 -->
  <el-dialog title="批量导入" :visible.sync="isShow" :close-on-click-modal="false" :before-close="closeMe" class="tms_dialog tms_dialog_import" width="500px">
    <el-row>
      <el-col :span="12">
        <el-upload :show-file-list="false" :on-change="handleChange" action="" :http-request="uploadHandleFile">
          <div class="bigIconBtn_primary" @click="doAction('import')">
            <i class="el-icon-upload2"></i>
            <br>
            <span>上传文件</span>
          </div>
        </el-upload>
      </el-col>
      <el-col :span="12">
        <div class="bigIconBtn_success" @click="doAction('download')">
          <i class="el-icon-download"></i>
          <br>
          <span>下载标准模板</span>
        </div>
      </el-col>
      <el-col :span="23" :offset="1">
        <ul class="importTips" type="1">
          <li>1、导入前，需要先下载标准版，按照标准模板后再上传。</li>
          <li>2、发货人，手机号码必须填写，且不能与已有客户重复。</li>
          <li>3、导入所属网点默认为本网点。</li>
          <li>4、每次最多能导入1000条，超过1000条，只导入前1000条。</li>
        </ul>
      </el-col>
    </el-row>
  </el-dialog>
</template>
<script>
import { getUploadPolicy, postImportExcel } from '@/api/common'
export default {
  props: {
    popVisible: {
      type: Boolean,
      default: false
    },
    info: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {}
  },
  computed: {
    isShow: {
      get() {
        if (this.popVisible) {
          this.init()
        }
        return this.popVisible
      },
      set() {}
    }
  },
  methods: {
    init() {
      getUploadPolicy().then(data => {
        console.log('policydata', data)
      })
    },
    doAction(type) {
      switch (type) {
        case 'import':
          break
        case 'download':
          this.downloadFile()
          break
      }
    },
    downloadFile() {
      if (this.info.download) {
        window.open(this.info.download)
      }
    },
    closeMe(done) {
      this.$emit('close')
      if (typeof done === 'function') {
        done()
      }
    },
    handleChange() {},
    uploadHandleFile(_this) {
      const file = _this.file
      console.log(file)
      let extension = ''
      let fileName = file.name.toLowerCase()
      let i = fileName.lastIndexOf('.')
      if (i > -1) {
        extension = fileName.substring(i)
      }
      if (!extension || extension !== '.xlsx') {
        this.$message({
          type: 'info',
          message: '只能上传 .xlsx 或者 .xls 文件'
        })
        return
      }

      let data = new FormData()
      data.append('uploadfile', file)
      data.append('excelSign', 'sender')
      //excelSign标识
      //driver：司机
      //carrier：承运商
      //truck：车辆
      //sender：发货人
      //receiver：收货人
      postImportExcel(data).then(data => {
          this.closeMe()
          this.$emit('success')
          this.$message({ type: 'success', message: '导入成功' })
        })
        .catch(error => {
          this.$message({ type: 'error', message: '导入失败' })
        })
    }
  }
}

</script>
