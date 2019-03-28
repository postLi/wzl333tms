<template>
  <!-- 打印配载单设置 -->
  <el-dialog title="打印配载单设置" width="990px" :visible.sync="dialogVisible"  :before-close="closeMe" :close-on-click-modal="false" class="tms_dialog_print2">
    <el-form inline :model="formModel" :size="btnsize" ref="formModel" label-width="100px" class="tms_dialog_print2-ruleForm">
      <h3>打印内容</h3>
      <el-form-item class="tms_dialog_print2-title" label="标题" >
        <el-input :maxlength="30" v-model="formModel.heading_content" autocomplete="off"></el-input>
      </el-form-item>
      <br>
      <el-form-item label="标题字号" >
        <el-select v-model="formModel.heading_word_size">
          <el-option v-for="item in fontSizes" :key="item" :value="item" :label="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="内容字号" >
        <el-select v-model="formModel.content_word_size">
          <el-option v-for="item in fontSizes" :key="item" :value="item" :label="item"></el-option>
        </el-select>
      </el-form-item>
      <br>
      <el-form-item label="其它：" >
        <el-checkbox v-model="formModel.print_page_num" true-label="1" false-label="0" label="打印页码"></el-checkbox>
        <el-checkbox v-model="formModel.content_wrap" true-label="1" false-label="0" label="内容是否换行"></el-checkbox>
      </el-form-item>
       
      <h3>打印参数</h3>
      <el-form-item label="默认打印机">
        <el-select v-model="formModel.printer">
          <el-option v-for="item in printers" :key="item" :value="item" :label="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="纸张宽度(mm)">
        <el-input :maxlength="5" v-model="formModel.paper_width" autocomplete="off"></el-input>
      </el-form-item>
      
      <el-form-item label="左边距(mm)">
        <el-input :maxlength="5" v-model="formModel.left_distance" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="打印方向">
        <el-select v-model="formModel.printing_direction">
          <el-option  key="2" value="2" label="横向"></el-option>
          <el-option  key="1" value="1" label="竖向"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="纸张高度(mm)">
        <el-input :maxlength="5" v-model="formModel.paper_height" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="上边距(mm)">
        <el-input :maxlength="5" v-model="formModel.top_distance" autocomplete="off"></el-input>
      </el-form-item>

      <h3>其他设置</h3>
      <el-form-item label="打印字体">
        <el-select v-model="formPrint.printFontSetting.load" size="mini">
          <el-option v-for="(item, index) in $const.PRINT_FONT" :key="index" :value="item" :label="item"></el-option>
        </el-select>
      </el-form-item>
      
      <div class="tms_dialog_print2-footer">
        <el-button type="primary" @click="submitForm('ruleForm2')">保存</el-button>
        <el-button @click="closeMe">关闭</el-button>
      </div>
    </el-form>
  </el-dialog>
</template>
<script>
import { CreatePrinterList } from '@/utils/lodopFuncs'
import { getPrintSetting, putPrintSetting } from '@/api/operation/print'
import { objectMerge2 } from '@/utils/index'
export default {
  components: {
  },
  props: {
    popVisible: {
      type: Boolean,
      default: false
    },
    formInfo: {
      type: [Object, Array],
      default: () => {}
    }
  },
  data() {
    return {
      btnsize: 'mini',
      formModel: {
        heading_content: '',
        heading_word_size: '',
        content_word_size: '',
        print_page_num: '',
        content_wrap: '',
        printer: '',
        paper_width: '',
        left_distance: '',
        printing_direction: '',
        paper_height: '',
        top_distance: '',
        printing_date: '',
        printing_person: ''
      },
      formPrint: {
        printFontSetting: { // 打印字体
          load: ''
        }
      },
      printers: [],
      fontSizes: [12, 13, 14, 15, 16, 18, 20, 22, 24, 26, 28, 32, 40, 60],
      orgData: []
    }
  },
  watch: {
    popVisible() {
      if (this.popVisible) {
        this.dialogVisible = true
        this.getPrintSetting()
        this.formPrint = objectMerge2({}, this.formInfo)
        console.log('formPrint', this.formPrint)
      } else {
        this.dialogVisible = false
      }
    }
  },
  computed: {
    dialogVisible: {
      get() {
        return this.popVisible
      },
      set() {}
    }
  },
  mounted() {
    this.getPrintSetting()
    this.initPrinter()
  },
  methods: {
    initPrinter() {
      this.printers = Object.assign([], CreatePrinterList())
      for (const item in this.printers) {
        this.printers[item] = this.printers[item].replace(/%^/g, '\\')
      }
    },
    savePrinter() {
      if (this.formInfo.printFontSetting.load !== this.formPrint.printFontSetting.load) {
        this.$emit('success', {
          loadFont: this.formPrint.printFontSetting.load
        })
        // this.closeMe()
      }
    },
    getPrintSetting() {
      this.orgData = []
      getPrintSetting({
        'companyId': this.otherinfo.companyId,
        'printType': 0
      }).then(res => {
        const data = res.data
        if (data) {
          this.orgData = data
          data.forEach(el => {
            if (typeof this.formModel[el.fieldName] !== 'undefined') {
              this.formModel[el.fieldName] = el.fieldValue || ''
            }
          })
        } else {
          this._handlerCatchMsg(res)
        }
      }).catch(err => {
        this._handlerCatchMsg(err)
      })
    },
    closeMe(done) {
      this.$emit('close')
      if (typeof done === 'function') {
        done()
      }
    },
    submitForm(formName) {
      // 先格式化数据
      const data = []
      this.savePrinter()
      this.orgData.forEach(el => {
        if (typeof this.formModel[el.fieldName] !== 'undefined') {
          el.fieldValue = this.formModel[el.fieldName]
        }
        data.push(el)
      })

      putPrintSetting({
        'companyId': this.otherinfo.companyId,
        'printType': 0,
        settingList: data
      }).then(data => {
        this.$message({ type: 'success', message: '打印设置成功！' })
        this.closeMe()
      }).catch(err => {
        this._handlerCatchMsg(err)
      })
    }
  }
}

</script>
