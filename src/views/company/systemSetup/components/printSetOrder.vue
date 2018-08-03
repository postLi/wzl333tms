<template>
  <!-- 打印运单设置 -->
  <el-dialog title="打印运单设置" :visible.sync="dialogVisible" fullscreen :before-close="closeMe" class="tms_dialog_print">
    <div class="print_aside">
      <div class="print_aside_head">
        <span>字段列表 {{formModel.labelList.length}} </span>
        <el-button type="warning" @click="submitForm('formModel')" icon="el-icon-document" :size="btnsize" style="float: right;margin-top:10px;">保存设置</el-button>
      </div>
      <el-form :model="formModel" :rules="rules" ref="formModel" label-width="0px">
        <ul class="print_aside_content">
          <draggable :move="canDragStart" :list="formModel.labelList" class="dragArea" @start="drag=true" @end="drag=false">
            <transition-group>
              <li v-for="(item, index) in formModel.labelList" :key="index">
                <i :class="item.isshow===1? 'el-icon-circle-check showLabel' : 'el-icon-circle-close hideLabel'"></i> <b>{{item.filedName}}</b> <span>{{item.filedValue}}</span>
                <el-switch v-model="item.isshow===1?true:false" :active-text="item.isshow?'显示':'隐藏'" @change="handleSwitch(item)" v-if="item.filedValue!=='setting'"></el-switch>
                <div class="print_aside_content_itemSet">
                  <el-form-item>
                    <el-input :size="btnsize" v-model="item.topx" placeholder="X轴坐标" @change="(obj) => {changeValue(obj, item,index)}">
                      <template slot="prepend">X</template>
                    </el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-input :size="btnsize" v-model="item.lefty" placeholder="Y轴坐标" @change="(obj) => {changeValue(obj, item,index)}">
                      <template slot="prepend">Y</template>
                    </el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-input :size="btnsize" v-model="item.width" placeholder="宽度" @change="(obj) => {changeValue(obj, item,index)}">
                      <template slot="prepend">宽</template>
                    </el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-input :size="btnsize" v-model="item.height" placeholder="高度" @change="(obj) => {changeValue(obj, item,index)}">
                      <template slot="prepend">高</template>
                    </el-input>
                  </el-form-item>
                </div>
              </li>
            </transition-group>
          </draggable>
        </ul>
      </el-form>
    </div>
    <div class="print_main">
      <div class="print_main_head"><span>预览展示</span></div>
      <div class="print_main_content" :style="printPreviewContent">
        <draggable :move="canDragStart" :list="formModel.labelList" class="dragArea" @start="drag=true" @end="drag=false">
        </draggable>
      </div>
    </div>
  </el-dialog>
</template>
<script>
import draggable from 'vuedraggable'
import { getSettingCompanyOrder, putSettingCompanyOrder } from '@/api/operation/print'
export default {
  components: {
    draggable
  },
  props: {
    popVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      btnsize: 'mini',
      formModel: {
        labelList: []
      },
      rules: {}
    }
  },
  watch: {
    popVisible() {
      if (this.popVisible) {
        this.dialogVisible = true
        this.getSettingCompanyOrder()
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
    },
    printPreviewContent () {
      let viewWidth = 600
      let viewHeight = 400
      if (this.formModel) {
        this.formModel.labelList.forEach(e => {
          if (e.filedValue === 'setting') {
            viewWidth = e.width
            viewHeight = e.height
          }
        })
      }
      return {
        width: viewWidth + 'px',
        height: viewHeight + 'px'
      }
    }
  },
  mounted() {
    this.getSettingCompanyOrder()
  },
  methods: {
    getSettingCompanyOrder() {
      getSettingCompanyOrder().then(data => {
        this.formModel.labelList = data
      })

    },
    closeMe(done) {
      this.$emit('close')
      if (typeof done === 'function') {
        done()
      }
    },
    checkNull(value) {
      if (value === undefined || value === null || value === '') {
        return false
      } else {
        return
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.formModel.labelList.forEach(e => {
            if (this.checkNull(e.topx) || this.checkNull(e.lefty) || this.checkNull(e.width) || this.checkNull(e.height)) {
              this.$message({ type: 'warning', message: '不能为空' })
              return false
            }
          })
          putSettingCompanyOrder(this.formModel.labelList).then(data => {
            this.$message({ type: 'success', message: '运单打印设置成功！' })
            this.getSettingCompanyOrder()
          })
        }
      })
    },
    canDragStart(list) {},
    handleSwitch(obj) {
      obj.isshow === 1 ? obj.isshow = 0 : obj.isshow = 1
    },
    changeValue (obj, item, index) {
      console.log(obj, item, index)
    }
  }
}

</script>
