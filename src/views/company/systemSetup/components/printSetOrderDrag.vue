<template>
  <!-- 打印运单设置 -->
  <el-dialog title="打印运单设置 (单位:毫米mm)" :visible.sync="dialogVisible" fullscreen :before-close="closeMe" class="tms_dialog_print_drag">
    <div class="print_aside" :key="viewKey">
      <div class="print_aside_head">
        <span><i class="el-icon-menu"></i> 字段列表 {{formModel.labelList.length}} </span>
        <el-popover placement="right" width="400" trigger="hover" style="float: right;margin-top:0px;margin-left: 10px">
          <span>可将信息项手动拖拽到右边纸张中显示及设置位置和宽高；<br>(单位：毫米mm)</span>
          <i class="el-icon-warning" slot="reference"></i>
        </el-popover>
        <el-button type="success" @click="submitForm('formModel')" icon="el-icon-document" :size="btnsize" style="float: right;margin-top:10px;">保存</el-button>
        <el-button  @click="review" icon="el-icon-refresh" :size="btnsize" style="float: right;margin-top:10px;margin-right: 10px;">刷新</el-button>
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
                  <el-radio-button v-for="item in alignmentOptions" :key="item.value" :label="item.value" border>{{item.label}}</el-radio-button>
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
          <div class="prinit_aside_setpreview_foot" v-if="imageUrl">
            <el-button size="mini" @click="setBg('zoomOut')" type="primary" title="放大" icon="el-icon-circle-plus-outline"></el-button><el-button size="mini" @click="setBg('zoomIn')" type="primary" title="缩小" icon="el-icon-remove-outline"></el-button><el-button size="mini"  @mouseup.native="stopSetBg" @mousedown.native="startSetBg('moveLeft')" type="primary" title="向左移动" icon="el-icon-caret-left"></el-button><el-button size="mini"  @mouseup.native="stopSetBg" @mousedown.native="startSetBg('moveRight')" type="primary" title="向右移动" icon="el-icon-caret-right"></el-button><el-button size="mini"  @mouseup.native="stopSetBg" @mousedown.native="startSetBg('moveUp')" type="primary" title="向上移动" icon="el-icon-caret-top"></el-button><el-button size="mini"  @mouseup.native="stopSetBg" @mousedown.native="startSetBg('moveDown')" type="primary" title="向下移动" icon="el-icon-caret-bottom"></el-button><el-button size="mini" @click="setBg('reset')" type="primary" title="重置" icon="el-icon-refresh"></el-button>
          </div>
        </div>
        <div class="prinit_aside_info">
          <el-button type="warning" @click="resetForm('formModel')" icon="el-icon-document" :size="btnsize">全部重置为默认值</el-button>
        </div>
      </el-form>
    </div>
    <div class="print_main">
      <div class="print_main_head"><b>预览展示:</b><span> 纸张大小(宽×高)：{{this.formModel.paper.width+' (毫米mm) × '+this.formModel.paper.height + ' (毫米mm)'}}</span></div>
      <div class="print_main_content" :style="printPreviewContent" :key="viewKey" @drop='drop($event)' @dragover='allowDrop($event)'>
        <div draggable='true' :key="index" :data-fileName="item.filedValue" @dragstart='($event) => dragStart($event, item, index)' @dragend="($event) => dragEnd($event, item, index)" v-for="(item, index) in labelListView" class="previewBlock" :style="{
          cursor: dragCursor,
          transform: 'translate(' + item.leftx+'px,'+item.topy + 'px)', 
          width:item.width/prxvalue +'px', 
          height:item.height/prxvalue+'px',
          lineHeight:(item.height/prxvalue - 3)+'px', 
          fontSize: item.fontsize+'pt',
          whiteSpace: 'nowrap',
          fontWeight: item.bold ? 800 : 400,
          textAlign: alignmentValue[item.alignment]}" :class="{'isActiveDrag':classItem[index]}" @click="editDragItem(item, index,$event)">
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
      <div class="print_main_foot" v-if="classItem.length">
        <br>
        按↑ ↓ ← →移动编辑项，按ctrl+↑↓控制高度变化，按ctrl+←→控制宽度变化<br/>按tab键切换编辑项，shift+tab切换回上一个编辑项
      </div>
    </div>
  </el-dialog>
</template>
<script>
// lodop 打印单位换算 1in(英寸)=2.54cm(厘米)=25.4mm(毫米)=72pt(磅)=96px 1px约等于0.3mm
// px不是像素，是绝对长度单位，1px等于1/96英寸，与正常DPI显示设置的像素值相等
// 25.4mm = 96px
// 1mm = 96/25.4 = 3.779px
// 1px = 25.4/96 = 0.26458mm
let dom = ''
import draggable from 'vuedraggable'
import hotkeys from '@/utils/hotkeys'
// import { getSettingCompanyOrder, putSettingCompanyOrder } from '@/api/operation/print'
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
      imageUrl: '',
      btnsize: 'mini',
      // 保存背景图的相关属性，用来操控
      bgprop: {
        scale: 1,
        x: 0,
        y: 0
      },
      formModel: {
        labelList: [],
        paper: {
          width: 0,
          height: 0
        }
      },
      prxvalue: 0.264,
      mm2px: 3.779,
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
      alignmentValue: ['', 'left', 'center', 'right'],
      alignmentOptions: [
        {
          value: 1,
          label: '文字靠左'
        },
        {
          value: 2,
          label: '文字居中'
        },
        {
          value: 3,
          label: '文字靠右'
        }
      ],
      dialogVisible: false
    }
  },
  watch: {
    popVisible() {
      if (this.popVisible) {
        this.dialogVisible = true
        this.getSettingCompanyOrder()
        this.bindKey()
      } else {
        this.dialogVisible = false
        this.unbindKey()
      }
    }
  },
  computed: {
    printPreviewContent() {
      let viewWidth = 300
      let viewHeight = 150
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
        backgroundSize: (this.bgprop.scale * 100) + '% auto',
        // backgroundSize: 'contain',
        backgroundPosition: this.bgprop.x + 'px ' + this.bgprop.y + 'px'
      }
    },
    printPreviewPaper() {},
    isActiveDrag: () => {
      return {}
    }
  },
  mounted() {
    // this.getSettingCompanyOrder()

  },
  // 销毁对象时，需清除绑定的事件
  destroyed() {
    this.unbindKey()
  },
  methods: {
    bindKey() {
      document.addEventListener('mousemove', this.conrightMove, true)
      document.addEventListener('mouseup', this.conrightEnd, true)
      document.addEventListener('keyup', this.deleteEditIndex, true)
      document.addEventListener('keydown', this.controlEditIndex, true)
    },
    unbindKey() {
      document.removeEventListener('mousemove', this.conrightMove)
      document.removeEventListener('mouseup', this.conrightEnd)
      document.removeEventListener('keyup', this.deleteEditIndex)
      document.removeEventListener('keydown', this.controlEditIndex)
    },
    handleChange(file, list) {
      this.imageUrl = file.url
      this.setBg('reset')
    },
    uploadHandleFile(file) {
    },
    startSetBg(type) {
      clearInterval(this.bgtimer)
      this.bgtimer = setInterval(() => {
        this.setBg(type)
      }, 100)
    },
    stopSetBg(type) {
      clearInterval(this.bgtimer)
    },
    // 设置背景图的操作
    setBg(action) {
      let scale = this.bgprop.scale
      switch (action) {

        case 'zoomOut':
          scale += 0.05
          scale = scale > 2 ? 2 : scale
          this.bgprop.scale = scale
          break
        case 'zoomIn':
          scale -= 0.05
          scale = scale < 0.5 ? 0.5 : scale
          this.bgprop.scale = scale
          break
        case 'moveLeft':
          this.bgprop.x -= 1
          break
        case 'moveRight':
          this.bgprop.x += 1
          break
        case 'moveUp':
          this.bgprop.y -= 1
          break
        case 'moveDown':
          this.bgprop.y += 1
          break
        case 'reset':
          this.bgprop = {
            scale: 1,
            x: 0,
            y: 0
          }
          break
      }
    },
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
        const item = Object.assign({}, row)
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
      this.getSettingCompanyOrder()
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
        this.deleteItemByIndex(row, index)
      } else {
        // 如果被删除了，则不在左边显示其编辑栏
        this.editDragItem(row, index)
      }

      this.dragCursor = 'move'
      this.showDragTips = []
    },
    // 删除指定位置的元素
    deleteItemByIndex(row, index) {
      row.isshow = false
      this.dragDetailInfo = {}
      this.classItem = []
      this.showDragTips = []
      this.showDragDetail = false
      this.labelListView = this.labelListView.filter((le, lindex) => {
        return lindex !== index
      })
    },
    // 处理绑定按钮的回调
    handleKeyEvent(e, keys, cb) {
      const key = hotkeys.getPressedKey(e)
      // console.log('按键值：', key, e)
      const tagName = event.target.tagName || event.srcElement.tagName
      // 不处理表单控件上的按键事件
      if (!(tagName === 'INPUT' || tagName === 'SELECT' || tagName === 'TEXTAREA')) {
        // 判断是否为指定按键
        if (keys.indexOf(key) !== -1) {
          // console.log('按键事件：', keys, key, keys.indexOf(key), e)
          // 判断是否有选中项
          if (this.dragDetailInfo.filedValue) {
            const find = {}
            this.labelListView.filter((el, lindex) => {
              if (this.dragDetailInfo.filedValue === el.filedValue) {
                find.el = el
                find.index = lindex
                return true
              } else {
                return false
              }
            })
            // 只有找到了才去回调函数
            if (find.el) {
              // 回调时传找到的元素、键值、事件对象
              cb(find, key, e)
            }
          }
        }
      }
    },
    // 按删除键删除选中的项
    deleteEditIndex(e) {
      this.handleKeyEvent(e, ['delete', 'backspace'], (find, key) => {
        this.deleteItemByIndex(find.el, find.index)
      })
    },
    // 按键移动选中的项
    // 暂时只支持单独的方向，不支持组合方向
    controlEditIndex(e) {
      // 跳转编辑项
      this.handleKeyEvent(e, ['tab', 'shift+tab'], (find, key, e) => {
        // 需要阻止默认的tab跳转
        e.preventDefault()
        let index = find.index
        if (key === 'tab') {
          index++
        } else {
          index--
        }

        // 当切换到最后一个时，跳转回第一个
        index = index >= this.labelListView.length ? 0 : index < 0 ? (this.labelListView.length - 1) : index
        this.editDragItem(this.labelListView[index], index, e)

        // 也可以BT遍历所有的x、y值，然后做到从左到右、从上到下逐个跳转的效果。。。
      })
      // 编辑宽高
      this.handleKeyEvent(e, ['ctrl+up', 'ctrl+down', 'ctrl+left', 'ctrl+right'], (find, key, e) => {
        // 因为可能会有部分浏览器绑定这些快捷键，所以需要屏蔽掉它的默认事件
        e.preventDefault()
        const keystr = /(up|down)/.test(key) ? 'height' : 'width'
        let val = find.el[keystr]
        switch (key) {
          case 'ctrl+up':
          case 'ctrl+left':
            val -= 1
            break
          case 'ctrl+down':
          case 'ctrl+right':
            val += 1
            break
        }
        // 不小于5mm高度 不大于纸张的宽度
        val = val < 5 ? 5 : val > this.formModel.paper.width ? this.formModel.paper.width : val
        find.el[keystr] = val
      })
      // 编辑移动
      this.handleKeyEvent(e, ['up', 'down', 'left', 'right'], (find, key) => {
        // 移动的时候就表示1mm
        // 为了避免未满1mm的px值影响，需要简单计算原有值对应了多少mm
        const keystr = /(up|down)/.test(key) ? 'topy' : 'leftx'
        const val = find.el[keystr]
        let rval = 0
        // 1.通过取余计算
        // 1.1 但容易遇到js计算的精度问题，所以需要做一个最小操作值判断，如果需要移动的值小于0.1，则直接跨越1mm是最好的选择
        // rval = this.mm2px - (val % this.mm2px).toFixed(3)
        // rval = rval < 1 ? this.mm2px : rval

       // 2.通过整除计算，按四舍五入去计算移动
        rval = Math.round(val / this.mm2px) * this.mm2px

        // rval = rval - val
        // console.log('计算的值：', val, rval)
        switch (key) {
          case 'up':
          case 'left':
            rval -= this.mm2px
            break
          case 'down':
          case 'right':
            rval += this.mm2px
            break
        }
        // 不能左移或者上移出去？
        // rval = rval < 0 ? 0 : rval
        find.el[keystr] = rval
      })
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
    getSettingCompanyOrder() {
      // 清空右边栏
      this.labelListView = []
      this.viewKey = new Date().getTime()
      getSettingCompanyOrder().then(data => {
        this.formModel.labelList = data
        this.orgLabelList = data
        this.formModel.labelList.forEach(e => {
          e.width = Math.round((e.width ? e.width : 150) * this.prxvalue)
          e.height = Math.round((e.height ? e.height : 24) * this.prxvalue)
          if (e.filedValue === 'setting') {
            this.formModel.paper = Object.assign({}, e)
          } else {
            if (e.isshow) { // 显示项要在预览处初始化
              this.labelListView.push(e)
            }
            // 单位是pt，缺省值是9，可以含小数，如13.5
            e.fontsize = e.fontsize ? e.fontsize : 10

            e.isshow = e.isshow === 1 // 1-true 显示
            // 1代表粗体，0代表非粗体，缺省值是0
            e.bold = e.bold === 2 // 2-true 加粗

            e.alignment = e.alignment || 1 // 1--左靠齐 2--居中 3--右靠齐，缺省值是1
          }
        })
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
        // ....这个等同于上面的返回值
        return
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.formModel.labelList.forEach(e => {
            if (this.checkNull(e.topy) || this.checkNull(e.leftx) || this.checkNull(e.width) || this.checkNull(e.height)) {
              this.$message({ type: 'warning', message: '不能为空' })
              return false
            } else {
              console.log(e.width)
              e.width = Math.round(e.width / this.prxvalue)
              e.height = Math.round(e.height / this.prxvalue)
              console.log(e.width)
              e.isshow = e.isshow ? 1 : 0
              e.bold = e.bold ? 1 : 0
            }
          })

          putSettingCompanyOrder(this.formModel.labelList).then(data => {
            this.$message({ type: 'success', message: '运单打印设置成功！' })
            this.getSettingCompanyOrder()
            this.viewKey = new Date().getTime()
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
              e.topy = 0
              e.leftx = 0
              e.width = Math.round(150 * this.prxvalue)
              e.height = Math.round(24 * this.prxvalue)
              e.fontsize = 10
              e.bold = 0
              e.alignment = 1
            })
          })
            .catch(error => {
              this.$message({ type: 'info', message: '已取消' })
            })
        }
      })
    },
    canDragStart(list) {},
    handleSwitch(newVal) { // 显示-隐藏字段 判断是否打印
      this.showDragDetail = false
      // ....取反操作符号放错位置了吧
      this.dragDetailInfo.isshow != this.dragDetailInfo.isshow
      this.formModel.labelList.forEach((e, index) => {
        if (e.filedValue === this.dragDetailInfo.filedValue) {
          this.$set(this.formModel.labelList, index, this.dragDetailInfo)
        }
      })
      this.labelListView = this.labelListView.filter(e => {
        return e.filedValue !== this.dragDetailInfo.filedValue
      })
    },
    changeValue(obj, item, index) {
      this.viewKey = new Date().getTime()
    }
  }
}

</script>
<style lang="scss">
.prinit_aside_setpreview_foot{
  .el-button+.el-button{
    margin-left: 2px;
  }
}
</style>
