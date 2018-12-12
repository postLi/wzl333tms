<template>
  <!-- 打印标签设置 -->
  <el-dialog title="打印标签设置 (单位:毫米mm)" :visible.sync="dialogVisible" fullscreen :before-close="closeMe" class="tms_dialog_print_drag" v-loading="loading">
    <div class="print_aside" :key="viewKey">
      <div class="print_aside_head">
        <span><i class="el-icon-menu"></i> 字段列表 {{formModel.labelList.length}} </span>
        <el-popover placement="right" width="400" trigger="hover" style="float: right;margin-top:0px;margin-left: 10px">
          <span>可将信息项手动拖拽到右边纸张中显示及设置位置和宽高；<br>(单位：毫米mm)</span>
          <i class="el-icon-warning" slot="reference"></i>
        </el-popover>
        <el-button type="success" @click="submitForm('formModel')" icon="el-icon-document" :size="btnsize" style="float: right;margin-top:10px;">保存</el-button>
        <el-button icon="el-icon-document" @click="review" :size="btnsize" style="float: right;margin-top:10px;margin-right: 10px;">刷新</el-button>
      </div>
      <el-form :model="formModel" :rules="rules" ref="formModel" label-width="0px">
        <ul class="print_aside_content">
          <transition-group>
            <li v-for="(item, index) in formModel.labelList" :key="index" v-if="item.filedValue !== 'setting'" draggable='true' @dragstart='drag($event)' :data-fileName='item.filedValue' @click="addItemDrag(item, index)">
              <i class="el-icon-circle-check showLabel" v-if="item.isshow"></i> <b>{{item.filedName}}</b>
            </li>
          </transition-group>
        </ul>
        <div class="prinit_aside_paper">
          <span><i class="el-icon-document"></i> 纸张设置</span>
          <br>
          <el-form-item>
            <el-input placeholder="请输入内容" v-model="formModel.paper.width" size="mini" @change="changeDragDetailInfo" v-number-only:point>
              <template slot="prepend">宽</template>
              <template slot="append">mm</template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="请输入内容" v-model="formModel.paper.height" size="mini" @change="changeDragDetailInfo" v-number-only:point>
              <template slot="prepend">高</template>
              <template slot="append">mm</template>
            </el-input>
          </el-form-item>
        </div>
        <el-collapse-transition>
          <div v-if="showDragDetail">
            <div class="prinit_aside_detail">
              <span><i class="el-icon-setting"></i> {{dragDetailInfo.filedName}}</span>
              <span>{{ ' ('+ dragDetailInfo.leftx +', '+ dragDetailInfo.topy +')'}}</span>
              <br>
              <el-form-item>
                <el-input placeholder="请输入内容" v-model="dragDetailInfo.width" size="mini" @change="changeDragDetailInfo" v-number-only:point>
                  <template slot="prepend">宽</template>
                  <template slot="append">mm</template>
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-input placeholder="请输入内容" v-model="dragDetailInfo.height" size="mini" @change="changeDragDetailInfo" v-number-only:point>
                  <template slot="prepend">高</template>
                  <template slot="append">mm</template>
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-input placeholder="请输入内容" v-model="dragDetailInfo.fontsize" size="mini" @change="changeDragDetailInfo" v-numberOnly>
                  <template slot="prepend">字号</template>
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-checkbox v-model="dragDetailInfo.bold" label="加粗" border size="mini" @change="changeDragDetailInfo"></el-checkbox>
                <el-switch v-model="dragDetailInfo.isshow" active-color="#67c23a" :active-text="dragDetailInfo.isshow?'显示':'隐藏'" @change="handleSwitch"></el-switch>
              </el-form-item>
              <el-form-item class="print_itemSet_col">
                <el-radio-group v-model="dragDetailInfo.alignment" size="mini" @change="changeDragDetailInfo">
                  <el-radio-button v-for="item in alignmentOptions" :key="item.value" :label="item.label" border></el-radio-button>
                </el-radio-group>
              </el-form-item>
            </div>
          </div>
        </el-collapse-transition>
        <div class="prinit_aside_setpreview">
          <div class="prinit_aside_setpreview_head">
            <span><i class="el-icon-picture"></i> 打印背景图片效果预览</span>
            <el-button @click="imageUrl=''" icon="el-icon-delete" :size="btnsize" style="float: right; margin-right: 10px;margin-top:10px;" v-if="imageUrl">清除背景</el-button>
          </div>
          <el-upload drag :show-file-list="false" :on-change="handleChange" action="" :http-request="uploadHandleFile">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          </el-upload>
        </div>
        <div class="prinit_aside_info">
          <el-button type="warning" @click="resetForm('formModel')" icon="el-icon-document" :size="btnsize">全部重置为默认值</el-button>
        </div>
      </el-form>
    </div>
    <div class="print_main">
      <div class="print_main_head"><b>预览展示:</b><span> 纸张大小(宽×高)：{{this.formModel.paper.width+' (毫米mm) × '+this.formModel.paper.height + ' (毫米mm)'}}</span></div>
      <div class="print_main_content" :style="printPreviewContent" :key="viewKey" @drop='drop($event)' @dragover='allowDrop($event)'>
        <div draggable='true' :data-fileName="item.filedValue" @dragstart='($event) => dragStart($event, item, index)' @dragend="($event) => dragEnd($event, item, index)" v-for="(item, index) in labelListView" class="previewBlock" :style="{
          cursor: dragCursor,
          transform: 'translate(' + item.leftx+'px,'+item.topy + 'px)', 
          width:item.width/prxvalue +'px', 
          height:item.height/prxvalue+'px',
          lineHeight:(item.height/prxvalue - 3)+'px', 
          fontSize: item.fontsize+'px',
          whiteSpace: 'nowrap',
          fontWeight: item.bold ? 800 : 400,
          textAlign: item.alignment==='文字居中'?'center': (item.alignment==='文字靠右'?'right':'left')}" :class="{'isActiveDrag':classItem[index]}" @click="editDragItem(item, index,$event)">
          <div class="dragTips" v-if="showDragTips[index]">
            {{'(x :'+Math.round(item.leftx*prxvalue) +' mm, y :'+ Math.round(item.topy*prxvalue) + ' mm)'}} {{'(宽: '+item.width +' mm, 高: '+ item.height + ' mm)'}}
          </div>
          <div class="dragSizeControler">
            <span>{{'{ '+item.filedName+ ' }'}}</span>
            <div class="conrigth" @dragstart.prevent.stop @mousedown.prevent.stop.capture="($event) => conrigthStart($event, item, index, 'right')"></div>
            <div class="conbottom" @dragstart.prevent.stop.capture @mousedown.prevent.stop.capture="($event) => conrigthStart($event, item, index, 'bottom')"></div>
            <div class="conbottomright" @dragstart.prevent.stop.capture @mousedown.prevent.stop.capture="($event) => conrigthStart($event, item, index, 'bottomright')"></div>
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>
<script>
// lodop 打印单位换算 1in(英寸)=2.54cm(厘米)=25.4mm(毫米)=72pt(磅)=96px 1px约等于0.3mm
let dom = ''
import draggable from 'vuedraggable'
import { objectMerge2 } from '@/utils/index'
import { getSettingCompanyLi, putSettingCompanyLi } from '@/api/operation/print'
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
      loading: true,
      imageUrl: '',
      btnsize: 'mini',
      formModel: {
        labelList: [],
        paper: {
          width: 0,
          height: 0
        }
      },
      prxvalue: 0.3,
      classItem: [],
      orgLabelList: [],
      labelListView: [],
      rules: {},
      viewKey: 0,
      flags: false,
      isDragView: false,
      isMove: false,
      showDragDetail: false,
      showDragTips: [],
      isShowDragTips: true,
      isHiddenDragDetail: true, // 详细信息 true-不隐藏 false-隐藏
      isDrag: null, // 判断是拖拽还是缩放 true-拖拽 false-缩放
      dragDetailInfo: {},
      dragCursor: 'move',
      alignmentOptions: [{
        value: 0,
        label: '文字靠右'
      },
      {
        value: 1,
        label: '文字靠左'
      },
      {
        value: 2,
        label: '文字居中'
      }
      ],
      fontWeightOptions: [{
        value: 0,
        label: '默认粗细'
      },
      {
        value: 2,
        label: '加粗'
      }
      ]
    }
  },
  watch: {
    popVisible() {
      if (this.popVisible) {
        this.dialogVisible = true
        this.getSettingCompanyLi()
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
    printPreviewContent() {
      let viewWidth = 80
      let viewHeight = 80
      const bgurl = this.imageUrl
      if (this.formModel) {
        this.formModel.labelList.forEach(e => {
          if (e.filedValue === 'setting') {
            viewWidth = e.width
            viewHeight = e.height
          }
        })
      }
      return {
        width: viewWidth / this.prxvalue + 'px',
        height: viewHeight / this.prxvalue + 'px',
        backgroundImage: 'url(' + bgurl + ')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundPosition: '0 0'
      }
    },
    printPreviewPaper() {},
    isActiveDrag: () => {
      return {}
    }
  },
  mounted() {
    this.getSettingCompanyLi()
    document.addEventListener('mousemove', this.conrightMove, true)
    document.addEventListener('mouseup', this.conrightEnd, true)
  },
  methods: {
    handleChange(file, list) {
      try {
        file.url = URL.createObjectURL(file.raw)
        this.imageUrl = file.url
        this.setBg('reset')
      } catch (err) {
        console.error('上传本地图片错误', err)
        return
      }
    },
    uploadHandleFile(file) {},
    conrigthStart(event, row, index, type) { // 向右拉伸-start
      this.isHiddenDragDetail = false
      row.x = event.pageX
      row.y = event.pageY
      row.orgwidth = Math.round(row.width / this.prxvalue)
      row.orgheight = Math.round(row.height / this.prxvalue)
      row.mousetype = type
      this.isDrag = row // false-拉伸
    },
    conrightMove(event) {
      if (this.isDrag) {
        var row = this.isDrag
        var type = row.mousetype
        const w = event.pageX - row.x
        const h = event.pageY - row.y
        this.calcWH(row, w, h, type)
      }
    },
    calcWH(row, w, h, type) {
      let w2 = row.orgwidth
      let h2 = row.orgheight
      if (type === 'right' || type === 'bottomright') {
        w2 += w
      }
      if (type === 'bottom' || type === 'bottomright') {
        h2 += h
      }

      w2 = w2 < 15 ? 15 : w2 > 1000 ? 1000 : w2
      h2 = h2 < 20 ? 20 : h2 > 1000 ? 1000 : h2
      row.width = Math.round(w2 * this.prxvalue)
      row.height = Math.round(h2 * this.prxvalue)
    },
    conrightEnd(event) { // 向右拉伸-end
      if (this.isDrag) { // false-拉伸
        const row = this.isDrag
        row.x = event.pageX
        row.y = event.pageY
        this.isDrag = null
      }
    },
    addItemDrag(row, index) { // 点击显示并且添加到预览区域
      if (!row.isshow) {
        console.log('row::::', row)
        const item = this.orgLabelList.filter(e => {
          if (e.filedValue === row.filedValue) {
            e.leftx = event.offsetX
            e.topy = event.offsetY
            e.isshow = true
            return true
          }
        })[0]
        // let item = Object.assign({}, row)
        item.isshow = true
        row.isshow = true
        this.labelListView.push(item)
      } else {
        this.$notify.info({
          title: '消息',
          message: '【 ' + row.filedName + ' 】已设置显示打印'
        })
      }
      this.editDragItem(row, index)
    },
    editDragItem(row, index, event) { // 编辑显示项
      this.dragDetailInfo = {}
      this.dragDetailInfo = Object.assign({}, row)
      this.classItem = []
      this.showDragTips = []
      if (this.classItem[index] && event && this.isHiddenDragDetail) {
        this.showDragDetail = false
        this.isHiddenDragDetail = false
      } else {
        this.isHiddenDragDetail = true
        this.classItem[index] = true
        this.showDragDetail = true
      }
      this.showDragTips[index] = true
    },
    changeDragDetailInfo(newVal) { // 修改编辑显示项的数据
      if (newVal) {
        this.labelListView.forEach((e, index) => {
          if (e.filedValue === this.dragDetailInfo.filedValue) {
            this.$set(this.labelListView, index, this.dragDetailInfo)
          }
        })
        this.formModel.labelList.forEach((e, index) => {
          if (e.filedValue === 'setting') {
            this.$set(this.formModel.labelList, index, this.formModel.paper)
          }
          if (e.filedValue === this.dragDetailInfo.filedValue) {
            this.$set(this.formModel.labelList, index, this.dragDetailInfo)
          }
        })
      }
    },
    review() { // 刷新
      this.viewKey = new Date().getTime()
      this.formModel.labelList = []
      this.labelListView = []
      this.getSettingCompanyLi()
      this.showDragDetail = false
      this.dragDetailInfo = {}
      this.isDrag = null
    },
    dragStart(event, row, index) {
      this.showDragTips[index] = true
      if (this.isDrag) {
        console.log('dragStart')
        return false
      }
      this.isDragView = true
      dom = event.currentTarget
      const strName = dom.getAttribute('data-fileName')
      this.isMove = true
      this.labelListView.forEach((e, index) => {
        if (e.filedValue === strName) {
          e.x = event.pageX
          e.y = event.pageY
        }
      })
    },
    dragEnd(event, row, index) {
      if (this.isDrag) {
        console.log('dragEnd')
        return false
      }

      console.log(this.showDragTips[index])
      this.isDragView = true
      dom = event.currentTarget
      const strName = dom.getAttribute('data-fileName')
      this.isMove = true
      this.labelListView.forEach(e => {
        if (e.filedValue === strName) {
          e.leftx += event.pageX - e.x
          e.topy += event.pageY - e.y
        }
      })
      // 判断是否出纸张边界  如果是 则取消显示
      console.log(row.leftx, row.width)
      if (Math.round(row.leftx * this.prxvalue) + row.width < 0 || Math.round(row.topy * this.prxvalue) + row.height < 0 || row.leftx > Math.round(this.formModel.paper.width / this.prxvalue) || row.topy > Math.round(this.formModel.paper.height / this.prxvalue)) {
        this.dragCursor = 'not-allowed'
        row.isshow = false
        this.dragDetailInfo = {}
        this.showDragDetail = false
        this.labelListView = this.labelListView.filter((le, lindex) => {
          return lindex !== index
        })
      }
      this.editDragItem(row, index)
      this.dragCursor = 'move'
      this.showDragTips = []
    },
    drag(event) {
      this.isDragView = false
      this.isMove = false
      dom = event.currentTarget
    },
    drop(event) {
      event.preventDefault()
      const strName = dom.getAttribute('data-fileName')
      let isAddItem = false
      if (!this.isMove) {
        if (this.labelListView.filter(e => e.filedValue === strName).length) {
          isAddItem = false
        } else {
          isAddItem = true
        }
      }
      if (isAddItem && !this.isDragView) {
        this.labelListView.push(this.orgLabelList.filter(e => {
          if (e.filedValue === strName) {
            e.leftx = event.offsetX
            e.topy = event.offsetY
            e.isshow = true
            return true
          }
        })[0])
      }
    },
    allowDrop(event) {
      event.preventDefault() // preventDefault() 方法阻止元素发生默认的行为（例如，当点击提交按钮时阻止对表单的提交）
    },
    getSettingCompanyLi() {
      this.loading = true
      this.labelListView = []
      this.viewKey = new Date().getTime()
      getSettingCompanyLi().then(data => {
        // 针对瑞千鑫特殊处理
        data = data.map(e => {
          if (e.companyid === 233 || e.companyid === 234) {
            e.filedName = e.filedName.replace('业务员电话', '业务投诉电话')
          }
          return e
        })

        this.formModel.labelList = data
        this.orgLabelList = data
        this.formModel.labelList.forEach(e => {
          if (e.filedValue === 'setting') {
            e.width = Math.round((e.width ? e.width : 240) * this.prxvalue)
            e.height = Math.round((e.height ? e.height : 140) * this.prxvalue)
            this.formModel.paper = Object.assign({}, e)
          } else {
            e.width = Math.round((e.width ? e.width : 150) * this.prxvalue)
            e.height = Math.round((e.height ? e.height : 40) * this.prxvalue)
            if (e.isshow) { // 显示项要在预览处初始化
              this.labelListView.push(e)
            }
            e.fontsize = e.fontsize ? e.fontsize : 14
            e.isshow = e.isshow === 1 // 1-true 显示
            e.bold = e.bold === 2 // 2-true 加粗
            e.alignment = e.alignment ? this.alignmentOptions[e.alignment].label : '文字靠左'
          }
        })
        this.loading = false
      })
      .catch(err => {
        this.loading = false
        this._handlerCatchMsg(err)
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
          this.loading = true
          const labelList = objectMerge2([], this.formModel.labelList)
          labelList.forEach(e => {
            if (this.checkNull(e.topy) || this.checkNull(e.leftx) || this.checkNull(e.width) || this.checkNull(e.height)) {
              this.$message({ type: 'warning', message: '不能为空' })
              return false
            } else {
              console.log(e.width)
              e.width = Math.round(e.width / this.prxvalue)
              e.height = Math.round(e.height / this.prxvalue)
              console.log(e.width)
              e.isshow = e.isshow ? 1 : 0
              e.bold = e.bold ? 2 : 0
              this.alignmentOptions.forEach(el => {
                if (e.alignment === el.label) {
                  e.alignment = el.value
                }
              })
            }
          })

          putSettingCompanyLi(labelList).then(data => {
            this.$message({ type: 'success', message: '标签打印设置成功！' })
            this.getSettingCompanyLi()
            this.viewKey = new Date().getTime()
            this.loading = false
          })
          .catch(err => {
            this.loading = false
            this._handlerCatchMsg(err)
          })
        }
      })
    },
    resetForm(formName) { // 全部重置为0
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm('此操作将所有设置重置为0,重置后不可恢复,是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.formModel.labelList.forEach(e => {
              if (e.filedValue !== 'setting') {
                e.topy = 0
                e.leftx = 0
                e.isshow = 0
                e.width = Math.round(150 * this.prxvalue)
                e.height = Math.round(24 * this.prxvalue)
                e.fontsize = 14
                e.bold = 0
                e.alignment = 1
              }
            })
            this.labelListView = []
          })
            .catch(() => {})
        }
      })
    },
    canDragStart(list) {},
    handleSwitch(newVal) { // 显示-隐藏字段 判断是否打印
      this.dragDetailInfo.isshow != this.dragDetailInfo.isshow
      this.formModel.labelList.forEach((e, index) => {
        if (e.filedValue === this.dragDetailInfo.filedValue) {
          this.$set(this.formModel.labelList, index, this.dragDetailInfo)
        }
      })
      this.labelListView = this.labelListView.filter(e => {
        return e.filedValue !== this.dragDetailInfo.filedValue
      })
      this.nextTick(() => {
        this.showDragDetail = false
      })
    },
    changeValue(obj, item, index) {
      this.viewKey = new Date().getTime()
    }
  }
}

</script>
