<template>
  <!-- 批量导入Excel弹出框 -->
  <el-dialog title="批量导入" :visible.sync="isShow" :close-on-click-modal="false" :before-close="closeMe" class="tms_dialog tms_dialog_import" width="500px">
    <el-row v-if="isInitDialog">
      <el-col :span="12">
        <el-upload :show-file-list="false" :on-change="handleChange" action="" :http-request="uploadHandleFile">
          <div class="bigIconBtn_primary" @click="doAction('import')">
            <i class="icon-export-btn"></i>
            <br>
            <span>上传文件</span>
          </div>
        </el-upload>
      </el-col>
      <el-col :span="12">
        <div class="bigIconBtn_success" @click="doAction('download')">
          <i class="icon-import-btn"></i>
          <br>
          <span>下载标准模板</span>
        </div>
      </el-col>
      <el-col :span="22" :offset="2">
        <ul class="importTips" type="1">
          <li>1、导入前，需要先下载标准版，按照标准模板后再上传。</li>
          <li>2、发货人，手机号码必须填写，且不能与已有客户重复。</li>
          <li>3、导入所属网点默认为本网点。</li>
          <li>4、每次最多能导入1000条，超过1000条，只导入前1000条。</li>
        </ul>
      </el-col>
    </el-row>
    <div class="import_result" v-else>
      <el-progress :text-inside="true" :stroke-width="15" :percentage="percentage" status="success" v-if="isProgress"></el-progress>
      <p v-else>{{resMessage.resultInfo}}</p>
      <el-table ref="multipleTable" :data="resMessage.failInfoList" stripe border tooltip-effect="dark" :default-sort="{prop: 'id', order: 'ascending'}" style="width: 100%;height: 400px;margin-top: 10px;" :key="tableKey">
        <el-table-column sortable type="index" width="60">
        </el-table-column>
        <el-table-column prop="failExcelNum" width="130" label="失败行"></el-table-column>
        <el-table-column prop="failInfo" label="失败字段"></el-table-column>
      </el-table>
    </div>
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
      type: String,
      default: ''
    }
  },
  data() {
    return {
      importType: {},
      isInitDialog: true, // true-导入下载界面 false-导入结果界面
      resMessage: {
        failInfoList: []
      },
      percentage: 0,
      isProgress: true,
      dataInfo: [],
      tableKey: 0
    }
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
    init() { // 下载链接
      //excelSign标识 driver-司机 carrier-承运商 truck-车辆 sender-发货人 receiver-收货人
      this.$set(this.importType, 'sender', this.$const.CUSTOMER_SENDER_EXCEL)
      this.$set(this.importType, 'receiver', this.$const.CUSTOMER_RECEIVER_EXCEL)
      this.$set(this.importType, 'truck', this.$const.TRUCK_EXCEL)
      this.$set(this.importType, 'carrier', this.$const.CARRIER_EXCEL)
      this.$set(this.importType, 'driver', this.$const.DRIVER_EXCEL)
      this.isInitDialog = true
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
      if (this.info) {
        window.open(this.importType[this.info])
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
      let extension = ''
      let fileName = file.name.toLowerCase()
      let i = fileName.lastIndexOf('.')
      if (i > -1) {
        extension = fileName.substring(i)
      }
      if (!extension || extension !== '.xlsx') {
        this.$message({
          type: 'info',
          message: '只能上传 .xlsx 模板文件'
        })
        return
      }

      let data = new FormData()
      data.append('uploadfile', file)
      data.append('excelSign', this.info)
      this.isProgress = true
      postImportExcel(data).then(res => {
          this.resMessage = res
          this.failInfoList = res.failInfoList
          this.isInitDialog = false
          this.percentageAnimated()
          this.$emit('success')
          this.$message({ type: 'success', message: '操作成功' })
        })
        .catch(err => {
          this.resMessage = error
          this.isInitDialog = false
          this.percentageAnimated()
          this._handlerCatchMsg(err)
        })
    },
    percentageAnimated() {
      let count = 0
      let init = setInterval(() => {
        count++
        this.percentage = count
        if (count === 100) {
          this.isProgress = false
          window.clearInterval(init)
        }
      }, 10)
    }
  }
}

</script>
