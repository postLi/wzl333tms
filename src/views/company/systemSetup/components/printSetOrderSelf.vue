<template>
  <!-- 打印运单设置 -->
  <el-dialog title="打印运单设置 (单位:毫米mm)" :visible.sync="dialogVisible" fullscreen :before-close="closeMe" class="tms_dialog_print_drag" v-loading="loading">
    <div class="print_aside" :key="viewKey">
      <div class="print_aside_head">
        <span><i class="el-icon-menu"></i> 字段列表 {{formModel.labelList.length}} </span>
        <el-popover placement="right" width="400" trigger="hover" style="float: right;margin-top:0px;margin-left: 10px">
          <span>可将信息项手动拖拽到右边纸张中显示及设置位置和宽高；<br>(单位：毫米mm)</span>
          <br>
          <span>【快捷键：】</span>
          <br>
          <span>按↑ ↓ ← →移动编辑项，</span>
          <br><span>按ctrl+↑↓控制高度变化，</span>
          <br><span>按ctrl+←→控制宽度变化 </span>
          <br>
          <span>按tab键切换编辑项，</span>
          <br><span>shift+tab切换回上一个编辑项</span>
          <i class="el-icon-warning" slot="reference"></i>
        </el-popover>
        <el-button type="success" @click="submitForm('formModel')" icon="el-icon-document" :size="btnsize" style="float: right;margin-top:10px;">保存</el-button>
        <el-button @click="review" icon="el-icon-refresh" :size="btnsize" style="float: right;margin-top:10px;margin-right: 10px;">刷新</el-button>
      </div>
      <div class="print_aside_search">
        <el-autocomplete v-model="currentSearch" :fetch-suggestions="querySearch" placeholder="查找非自定义字段" @select="handleSelect" popper-class="popperHide" size="mini" clearable>
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-autocomplete>
      </div>
      <el-form :model="formModel" :rules="rules" ref="formModel" label-width="0px">
        <div class="print_aside_content_form">
          <label>发货人信息</label>
          <ul class="print_aside_content">
            <li v-for="(item, index) in formModel.labelList" :key="index" v-if="item.type===1" draggable='true' @dragstart='drag($event)' :data-fileName='item.filedValue' @click="addItemDrag(item, index)">
              <el-tag type="info" :size="tagSize"><i class="el-icon-circle-check showLabel" v-if="item.isshow"></i> <b>{{item.filedName}}</b></el-tag>
            </li>
          </ul>
          <label>收货人信息</label>
          <ul class="print_aside_content">
            <li v-for="(item, index) in formModel.labelList" :key="index" v-if="item.type===2" draggable='true' @dragstart='drag($event)' :data-fileName='item.filedValue' @click="addItemDrag(item, index)">
              <el-tag type="info" :size="tagSize"><i class="el-icon-circle-check showLabel" v-if="item.isshow"></i> <b>{{item.filedName}}</b></el-tag>
            </li>
          </ul>
          <label>运单主要信息</label>
          <ul class="print_aside_content">
            <li v-for="(item, index) in formModel.labelList" :key="index" v-if="item.type===3" draggable='true' @dragstart='drag($event)' :data-fileName='item.filedValue' @click="addItemDrag(item, index)">
              <el-tag type="info" :size="tagSize"><i class="el-icon-circle-check showLabel" v-if="item.isshow"></i> <b>{{item.filedName}}</b></el-tag>
            </li>
          </ul>
          <label>货物主要信息
            <el-button @click="showCargoPlus" icon="el-icon-plus" size="mini" type="circle" title="添加一套货物信息"></el-button>
          </label>
          <ul class="print_aside_content" :key="cargoKey">
            <li v-for="(item, index) in formModel.labelList" :key="index" v-if="item.type===4 && item.showCargo" draggable='true' @dragstart='drag($event)' :data-fileName='item.filedValue' @click="addItemDrag(item, index)">
              <el-tag type="info" :size="tagSize"><i class="el-icon-circle-check showLabel" v-if="item.isshow"></i> <b>{{item.filedName}}</b></el-tag>
            </li>
          </ul>
          <label>自定义信息</label>
          <ul class="print_aside_content">
            <li v-for="(item, index) in formModel.labelList" :key="index" v-if="item.type===5" :data-fileName='item.filedValue' class="print_aside_content_self" style="width: 100%;">
              <!-- <i class="el-icon-circle-check showLabel" v-if="item.isshow"></i>  -->
              <el-input size="mini" placeholder="自定义标签(最多128个字符)" v-model="labelSelf" clearable @keyup.enter.native="addItemDrag(item, index)" :maxlength="128"></el-input>
              <el-button size="mini" @click="addItemDrag(item, index)" icon="el-icon-plus">添加</el-button>
            </li>
          </ul>
        </div>
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
          <el-form-item>
            <el-input placeholder="请输入内容" v-model="formModel.paper.leftx" size="mini" @change="changeDragDetailInfo">
              <template slot="prepend">左偏移</template>
              <template slot="append">mm</template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="请输入内容" v-model="formModel.paper.topy" size="mini" @change="changeDragDetailInfo">
              <template slot="prepend">上偏移</template>
              <template slot="append">mm</template>
            </el-input>
          </el-form-item>
        </div>
        <el-collapse-transition>
          <div v-if="showDragDetail">
            <div class="prinit_aside_detail">
              <span><i class="el-icon-setting"></i> {{dragDetailInfo.filedName}}</span>
              <!-- <span>{{ ' ('+ dragDetailInfo.leftx +', '+ dragDetailInfo.topy +')'}}</span> -->
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
            <el-button @click="clearImgUrl" icon="el-icon-delete" :size="btnsize" style="float: right; margin-right: 10px;margin-top:10px;" v-if="imageUrl">清除背景</el-button>
          </div>
          <Upload :title="'本地上传'" listtype="picture" v-model="imageUrl" />
          <!-- <el-upload drag :show-file-list="false" :on-change="handleChange" action="" :http-request="uploadHandleFile">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          </el-upload> -->
          <div class="prinit_aside_setpreview_foot" v-if="imageUrl">
            <el-button size="mini" @click="setBg('zoomOut')" type="primary" title="放大" icon="el-icon-circle-plus-outline"></el-button>
            <el-button size="mini" @click="setBg('zoomIn')" type="primary" title="缩小" icon="el-icon-remove-outline"></el-button>
            <el-button size="mini" @mouseup.native="stopSetBg" @mousedown.native="startSetBg('moveLeft')" type="primary" title="向左移动" icon="el-icon-caret-left"></el-button>
            <el-button size="mini" @mouseup.native="stopSetBg" @mousedown.native="startSetBg('moveRight')" type="primary" title="向右移动" icon="el-icon-caret-right"></el-button>
            <el-button size="mini" @mouseup.native="stopSetBg" @mousedown.native="startSetBg('moveUp')" type="primary" title="向上移动" icon="el-icon-caret-top"></el-button>
            <el-button size="mini" @mouseup.native="stopSetBg" @mousedown.native="startSetBg('moveDown')" type="primary" title="向下移动" icon="el-icon-caret-bottom"></el-button>
            <el-button size="mini" @click="setBg('reset')" type="primary" title="重置" icon="el-icon-refresh"></el-button>
          </div>
        </div>
        <div class="prinit_aside_info">
          <el-button type="warning" @click="resetForm('formModel')" icon="el-icon-document" :size="btnsize">全部重置为默认值</el-button>
        </div>
      </el-form>
    </div>
    <div class="print_main">
      <div class="print_main_head">
        <b>预览展示:</b>
        <span> 纸张(宽×高)：{{this.formModel.paper.width+'(mm) × '+this.formModel.paper.height + '(mm)'}}</span>
        <div class="print_main_head_btns">
          <label for="">默认打印机：</label>
          <el-select v-model="formPrint.printSetting.ship" size="mini">
            <el-option v-for="item in printers" :key="item" :value="item" :label="item"></el-option>
          </el-select>
          <el-button icon="el-icon-printer" @click="print('test')" size="mini" title="打印测试"></el-button>
          <el-button icon="el-icon-view" @click="print('preview')" size="mini" title="打印预览"></el-button>
        </div>
      </div>
      <div class="print_main_content" :style="printPreviewContent" :key="viewKey" @drop='drop($event)' @dragover='allowDrop($event)'>
        <div draggable='true' :key="index" :data-fileName="item.filedValue" @dragstart='($event) => dragStart($event, item, index)' :data-index="item._index" @dragend="($event) => dragEnd($event, item, index)" v-for="(item, index) in labelListView" class="previewBlock" :style="{
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
            <!-- {{'(x :'+Math.round(item.leftx) +' mm, y :'+ Math.round(item.topy)+ ' mm)'}} {{'(宽: '+item.width +' mm, 高: '+ item.height + ' mm)'}} -->
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
        <br> 按↑ ↓ ← →移动编辑项，按ctrl+↑↓控制高度变化，按ctrl+←→控制宽度变化
        <br/>按tab键切换编辑项，shift+tab切换回上一个编辑项
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
// 字段类型type 0-纸张设置 1-发货人信息 2-收货人信息 3-运单主要信息 4-货物主要信息 5-自定义信息
let dom = ''
import draggable from 'vuedraggable'
import hotkeys from '@/utils/hotkeys'
import { objectMerge2 } from '@/utils/index'
// import { getSettingCompanyOrder, putSettingCompanyOrder } from '@/api/operation/print'
import { getSettingCompanyOrder, putSettingCompanyOrder } from '@/api/operation/print'
import { getCommonSettingOrder } from '@/api/operation/print'
import Upload from '@/components/Upload/singleImage2'
import { CreatePrintPageEnable, CreatePrinterList } from '@/utils/lodopFuncs'
import { putSetting } from '@/api/company/systemSetup'
export default {
  components: {
    draggable,
    Upload
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
      tagSize: 'mini',
      formPrint: {
        printSetting: {
          ship: ''
        }
      },
      cargoLabelList: [
        [],
        [],
        []
      ], // 货物主要信息列表
      cargoNum: 1, // 货物字段展示数量
      maxCargo: 3, // 最多显示货物字段数量
      printers: [],
      currentSearch: '',
      labelSelf: '',
      labelIndex: 0,
      loading: true,
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
          height: 0,
          leftx: 0,
          topy: 0
        }
      },
      defaultLabelWidth: 150,
      defaultLabelHeight: 30,
      defaultLabelFontSize: 12,
      defaultPaperWidth: 240,
      defaultPaperHeight: 140,
      imgNameStr: '预览图片lyy,',
      prxvalue: 0.264,
      mm2px: 3.779,
      maxLabel: 3, // 固有字段最多显示数量
      maxLabelSelf: 19, // 自定义字段最多显示数量, 拿一个来做背景设置
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
      alignmentOptions: [{
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
      dialogVisible: false,
      commonLabelList: [],
      cargoKey: 0
    }
  },
  watch: {
    imageUrl: {
      handler(cval, oval) {
        console.log('图片', cval, oval)
      },
      deep: true
    },
    formInfo: {
      handler(cval, oval) {},
      deep: true
    },
    popVisible() {
      if (this.popVisible) {
        this.dialogVisible = true
        this.loading = true
        this.init()
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
        viewWidth = this.formModel.paper.width
        viewHeight = this.formModel.paper.height
        // this.formModel.labelList.forEach(e => {
        //   if (e.filedValue === 'setting') {
        //     console.log('printPreviewContent', e.width, e.height)
        //     viewWidth = e.width
        //     viewHeight = e.height
        //   }
        // })
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
    showCargoPlus() {
      console.log('cargoNum', this.cargoNum)
      if (this.cargoNum < this.maxCargo) {
        this.cargoNum = this.cargoNum + 1
        this.cargoLabelList[this.cargoNum - 1].forEach(e => {
          this.formModel.labelList.forEach((el, index) => {
            if (e.filedValue === el.filedValue) {
              e.showCargo = true
              this.$set(this.formModel.labelList, index, e)
            }
          })
        })
        this.cargoKey = new Date().getTime()
      } else {
        this.$message({ type: 'warning', message: '最多添加' + this.maxCargo + '套货物信息' })
      }
    },
    init() {
      this.cargoNum = this.$options.data().cargoNum
      this.cargoKey = new Date().getTime()
      this.currentSearch = ''
      this.initPrinter()
      this.formPrint = objectMerge2({}, this.formInfo)
      this.loading = true
      this.getCommonSettingOrder()
    },
    print(type) { // preview-打印预览 test-打印测试
      let labelList = objectMerge2([], this.labelListView)
      labelList.push(objectMerge2({}, this.formModel.paper))
      labelList.forEach(e => {

        e.width = Math.round(e.width / this.prxvalue)
        e.height = Math.round(e.height / this.prxvalue)
        e.isshow = e.isshow ? 1 : 0
        e.bold = e.bold ? 2 : 1
        e.isshow = e.isshow ? 1 : 0
        e.value = e.filedName

        if (e.filedValue === 'setting') {
          e.bold = 0
          e.fontsize = null
          e.alignment = null
          e.value = ''
        } else {

        }
      })
      CreatePrintPageEnable({
        orderdata: labelList, // 运单数据
        number: 1, // 打印份数
        printer: this.otherinfo.systemSetup.printSetting.ship, // 打印机
        printSetup: labelList, // 打印设置
        type: 'order', // 打印类型
        preview: type === 'preview' ? true : false, // 是否预览
        mock: true // 是否直接读取value字段
      })
    },
    initPrinter() { // 初始化打印机列表
      this.printers = Object.assign([], CreatePrinterList())
      for (const item in this.printers) {
        this.printers[item] = this.printers[item].replace(/%^/g, '\\')
      }
    },
    clearImgUrl() {
      this.imageUrl = ''
    },
    querySearch(queryString, cb) { // 查找字段
      this.currentSearch = queryString
      const list = objectMerge2([], this.orgLabelList)
      const result = queryString ? list.filter(el => el.filedName.indexOf(queryString) !== -1) : list
      this.formModel.labelList = objectMerge2([], result)
      cb(result)
    },
    handleSelect(item) {
      console.log('handleSelect item', item)
    },
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
      let len = this.labelListView.filter(e => {
        return e.filedValue === row.filedValue
      }).length
      if (row.filedValue === 'customFields') { // 自定义字段的添加，点击后需要清空输入框
        row.filedName = this.labelSelf
        setTimeout(() => {
          this.labelSelf = ''
        }, 300)
      }
      let fn = () => { // 添加一个新的字段到显示区域
        row.isshow = true
        row.fontsize = this.defaultLabelFontSize
        console.log('row::::', row)
        let currentRow = objectMerge2({}, row)
        currentRow._index = ++this.labelIndex
        currentRow.width = Math.round(this.defaultLabelWidth * this.prxvalue)
        currentRow.height = Math.round(this.defaultLabelHeight * this.prxvalue)
        // currentRow.leftx = 0
        // currentRow.topy = 0
        currentRow.fontsize = this.defaultLabelFontSize
        currentRow.bold = 0
        currentRow.alignment = 1
        this.labelListView.push(objectMerge2({}, currentRow))
        this.orgLabelList.forEach((e, index) => {
          if (e.filedValue === row.filedValue) {
            this.$set(this.orgLabelList, index, objectMerge2({}, row))
          }
        })
      }
      if (row.filedValue === 'customFields' && len < this.maxLabelSelf) { // 添加自定义字段到预览区域
        fn()
      } else if (len < this.maxLabel) { // 添加普通字段到预览区域
        fn()
      } else { // 多次添加这个字段到预览区域
        this.$notify.info({
          title: '消息',
          message: '【 ' + row.filedName + ' 】最多添加' + (row.filedValue === 'customFields' ? this.maxLabelSelf : this.maxLabel) + '次'
        })
      }
      this.editDragItem(row, index)
    },
    editDragItem(row, index, event) { // 编辑显示项
      this.dragDetailInfo = {}
      this.dragDetailInfo = Object.assign({}, row)
      console.log('编辑显示项', this.dragDetailInfo)
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
          if (e._index === this.dragDetailInfo._index) {
            this.$set(this.labelListView, index, this.dragDetailInfo)
          }
        })
        this.formModel.labelList.forEach((e, index) => {
          if (e.filedValue === this.dragDetailInfo.filedValue) {
            this.$set(this.formModel.labelList, index, this.dragDetailInfo)

          }
          if (e.filedValue === 'setting') {
            this.$set(this.formModel.labelList, index, this.formModel.paper)
            console.log('this.formModel.paper:', this.formModel.paper)
          }
        })
      }
    },
    review() { // 刷新
      this.viewKey = new Date().getTime()
      this.formModel.labelList = []
      this.orgLabelList = []
      this.labelListView = []
      this.cargoNum = this.$options.data().cargoNum
      this.cargoKey = new Date().getTime()
      this.currentSearch = ''
      this.initPrinter()
      this.getCommonSettingOrder()
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
      const strIndex = Number(dom.getAttribute('data-index'))
      this.isMove = true
      this.labelListView.forEach((e, index) => {
        if (e._index === strIndex) {
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
      const strIndex = Number(dom.getAttribute('data-index'))
      this.isMove = true
      this.labelListView.forEach(e => {
        if (e._index === strIndex) {
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
      this.labelListView = objectMerge2([], this.labelListView).filter((le, lindex) => {
        return lindex !== index
      })
      let arr = this.labelListView.filter(e => {
        return e.filedValue === row.filedValue
      }).length
      console.log('删除的' + row.filedValue + '还有' + arr + '个')
      if (arr === 0) {
        this.formModel.labelList.forEach((e, index) => {
          if (e.filedValue === row.filedValue) {
            this.$set(e, 'isshow', false)
            console.log('labelList上的row', e.filedValue, e.isshow)
          }
        })
        this.orgLabelList = objectMerge2([], this.formModel.labelList)
      }
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
      if (!this.isMove) {
        this.orgLabelList.filter(e => {
          if (e.filedValue === strName && !this.isDragView) {
            this.addItemDrag(e)
          }
        })
      }
      // if (isAddItem && !this.isDragView) {
      //   this.labelListView.push(this.orgLabelList.filter(e => {
      //     if (e.filedValue === strName) {
      //       e.leftx = event.offsetX
      //       e.topy = event.offsetY
      //       e.isshow = true
      //       return true
      //     }
      //   })[0])
      // }
    },
    allowDrop(event) {
      event.preventDefault() // preventDefault() 方法阻止元素发生默认的行为（例如，当点击提交按钮时阻止对表单的提交）
    },
    sortLabel(array, key) {
      return array.sort((a, b) => {
        let x = a[key]
        let y = b[key]
        return x.length - y.length
      })
    },
    getCommonSettingOrder() { // 获取系统所有字段
      this.loading = true
      this.commonLabelList = []
      getCommonSettingOrder().then(data => {
          if (data) {
            objectMerge2([], data).forEach((el, index) => {
              let obj = {
                id: el.id,
                filedValue: el.fieldValue,
                filedName: el.fieldName,
                topy: 0,
                leftx: 0,
                width: 0,
                height: 0,
                companyId: this.otherinfo.companyId,
                isshow: 0,
                fontsize: 10,
                alignment: 1,
                bold: 0,
                type: el.type
              }
              // type
              // 0-纸张设置 1-发货人信息 2-收货人信息 3-运单主要信息 4-货物主要信息 5-自定义信息
              this.commonLabelList.push(obj)
            })
            this.sortLabel(this.commonLabelList, 'filedName')
            this.$nextTick(() => {
              this.getSettingCompanyOrder()
            })
          }
        })
        .catch(err => {
          this.loading = false
          this._handlerCatchMsg(err)
        })
    },
    getSettingCompanyOrder() { // 获取当前公司打印设置信息
      // 清空右边栏
      this.labelListView = []
      // this.formModel.labelList = []
      this.orgLabelList = []
      this.viewKey = new Date().getTime()
      let cargoShow2 = false
      let cargoShow3 = false
      this.loading = true
      getSettingCompanyOrder().then(data => {
          if (data) {
            let array = Object.assign([], data)
            let commonArr = [] // 相同字段
            let expandArr = [] // 差异字段
            let labelList = objectMerge2([], this.commonLabelList)
            // 匹配当前公司打印设置字段和系统所有字段
            array.forEach(e => {
              labelList.forEach((el, index) => {
                if (el.filedValue === e.filedValue) {
                  if (!e.isshow && el.filedValue !== 'setting') {
                    e.width = this.defaultLabelWidth
                    e.height = this.defaultLabelHeight
                  }
                  if (el.filedValue === 'setting') {
                    console.log('纸张设置', this.formModel.labelList[index], e)
                    this.$set(this.formModel.labelList, index, e)
                    this.formModel.labelList[index] = e
                  }
                  this.$set(e, 'type', el.type) // 给旧数据设置类型
                  if (e.type === 4) {
                    if (e.filedName.slice(-1) === '2') {
                      cargoShow2 = true
                      this.cargoNum = 2
                    }
                    if (e.filedName.slice(-1) === '3') {
                      cargoShow3 = true
                      this.cargoNum = 3
                    }
                  }
                  labelList.splice(index, 1)
                  commonArr.push(e)
                }
              })
            })
            console.log('相同字段', commonArr.length, commonArr)
            console.log('差异字段', labelList.length, labelList)
            this.formModel.labelList = objectMerge2([], commonArr.concat(labelList))
            // 匹配完所有字段 初始化显示
            this.formModel.labelList.forEach((e, index) => {
              e.width = Math.round((e.width ? e.width : this.defaultLabelWidth) * this.prxvalue)
              e.height = Math.round((e.height ? e.height : this.defaultLabelHeight) * this.prxvalue)
              if (e.filedValue === 'setting') { // 设置纸张
                const obj = Object.assign({}, e)
                obj.leftx = Math.round(obj.leftx * this.prxvalue)
                obj.topy = Math.round(obj.topy * this.prxvalue)
                this.formModel.paper = obj
              } else { // 设置其他字段
                array.forEach(em => { // 重复字段处理
                  if (em.filedValue === e.filedValue) { // 显示项要在预览处初始化 
                    if (em.isshow) {
                      em.width = Math.round((em.width ? em.width : this.defaultLabelWidth) * this.prxvalue)
                      em.height = Math.round((em.height ? em.height : this.defaultLabelHeight) * this.prxvalue)
                      // em.leftx = Math.round((em.leftx ? em.leftx : 0) * this.prxvalue)
                      // em.topy = Math.round((em.topy ? em.topy : 0) * this.prxvalue)
                      // 单位是pt，缺省值是9，可以含小数，如13.5
                      em.fontsize = em.fontsize ? em.fontsize : 10
                      em.isshow = em.isshow === 1 // 1-true 显示
                      // 1代表粗体，0代表非粗体，缺省值是0
                      em.bold = em.bold === 2 // 2-true 加粗
                      em.alignment = em.alignment || 1 // 1--左靠齐 2--居中 3--右靠齐，缺省值是1
                      /////////////////////////////这里要对拿到的数据做处理 多次显示同一个字段
                      em._index = ++this.labelIndex
                      this.labelListView.push(em)
                    } else {
                      if (em.filedName.indexOf(this.imgNameStr) !== -1) { // 预览图片
                        this.imageUrl = em.filedName.split(',')[1]
                      }
                    }
                  }
                })
                // 单位是pt，缺省值是9，可以含小数，如13.5
                e.fontsize = e.fontsize ? e.fontsize : 10
                e.isshow = e.isshow === 1 // 1-true 显示
                // 1代表粗体，0代表非粗体，缺省值是0
                e.bold = e.bold === 2 // 2-true 加粗
                e.alignment = e.alignment || 1 // 1--左靠齐 2--居中 3--右靠齐，缺省值是1
              }
              if (e.type === 4) { // 货物主要信息
                e.showCargo = false
                switch (e.filedName.slice(-1)) {
                  case '2':
                    if (cargoShow2) {
                      e.showCargo = true
                    }
                    this.cargoLabelList[1].push(e)
                    break
                  case '3':
                    if (cargoShow3) {
                      e.showCargo = true
                    }
                    this.cargoLabelList[2].push(e)
                    break
                  default:
                    e.showCargo = true
                    this.cargoLabelList[0].push(e)
                    break
                }
              }

            })
            this.orgLabelList = objectMerge2([], this.formModel.labelList)
            console.log('相同+差异', this.formModel.labelList)
          }
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
        // ....这个等同于上面的返回值
        return
      }
    },
    resetForm(formName) { // 全部重置为0
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm('此操作将所有设置重置为0,是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.formModel.labelList.forEach((e, index) => {
                if (e.filedValue !== 'setting') {
                  e.topy = 0
                  e.leftx = 0
                  e.isshow = 0
                  e.width = Math.round(this.defaultLabelWidth * this.prxvalue)
                  e.height = Math.round(this.defaultLabelHeight * this.prxvalue)
                  e.fontsize = 10
                  e.bold = 0
                  e.alignment = 1
                }
              })
              this.formModel.paper.width = this.defaultPaperWidth
              this.formModel.paper.height = this.defaultPaperHeight
              this.formModel.paper.topy = 0
              this.formModel.paper.leftx = 0
              this.labelListView = []
              this.currentSearch = ''
              console.log('cargoNum', this.cargoNum)
            })
            .catch(err => {})
        }
      })
    },
    canDragStart(list) {},
    handleSwitch(newVal) { // 显示-隐藏字段 判断是否打印
      // ....取反操作符号放错位置了吧
      // this.dragDetailInfo.isshow = !this.dragDetailInfo.isshow
      let len = 0
      this.labelListView.forEach((e, index) => {
        if (e._index === this.dragDetailInfo._index) {
          this.labelListView.splice(index, 1)
        }
        if (e.filedValue === this.dragDetailInfo.filedValue) {
          len = len + 1
        }
      })
      console.log('len', len)
      if (len === 1) {
        this.formModel.labelList.forEach((e, index) => {
          if (e.filedValue === this.dragDetailInfo.filedValue) {
            this.$set(this.formModel.labelList[index], 'isshow', false)
          }
        })
        this.orgLabelList = objectMerge2([], this.formModel.labelList)
      }
      this.$nextTick(() => {
        this.showDragDetail = false
      })
    },
    changeValue(obj, item, index) {
      this.viewKey = new Date().getTime()
    },
    savePrinter() {
      if (this.formInfo.printSetting.ship !== this.formPrint.printSetting.ship) {
        this.$confirm('默认打印机已修改，是否需要保存?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 转译一下打印的\\字符
          const formPrintSetting = objectMerge2({}, this.formPrint.printSetting)
          for (const item in formPrintSetting) {
            formPrintSetting[item] = formPrintSetting[item].replace(/\\/g, '%^')
          }
          const form = Object.assign({}, this.formPrint)
          form.printSetting = Object.assign({}, formPrintSetting)
          putSetting(form).then(data => {
              this.otherinfo.systemSetup = this.formInfo
              this.$emit('success')
              this.$message({
                message: '保存打印机设置成功',
                type: 'success'
              })
            })
            .catch(err => {
              this._handlerCatchMsg(err)
            })
        }).catch(() => {})
      }
    },
    submitForm(formName) { // 保存修改
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.savePrinter()
          this.loading = true
          const arr = objectMerge2([], this.labelListView)
          let bgImg = {}
          arr.push(objectMerge2({}, this.formModel.paper)) // 添加纸张设置信息
          this.formModel.labelList.forEach(e => {
            if (e.filedValue === 'customFields') {
              if (this.imageUrl) {
                bgImg = objectMerge2({}, e)
                bgImg.filedName = this.imgNameStr + this.imageUrl
                bgImg.isshow = false
                console.log(' 提交的时候 imageUrl1', this.imageUrl, bgImg)
              }
            }
          })
          if (this.imageUrl) {
            arr.push(bgImg)
          }
          arr.forEach(e => {
            if (this.checkNull(e.topy) || this.checkNull(e.leftx) || this.checkNull(e.width) || this.checkNull(e.height)) {
              this.$message({ type: 'warning', message: '不能为空' })
              return false
            } else {
              e.width = Math.round(e.width / this.prxvalue)
              e.height = Math.round(e.height / this.prxvalue)
              e.isshow = e.isshow ? 1 : 0
              e.bold = e.bold ? 2 : 1
              if (e.filedValue === 'setting') {
                console.log('this.formModel.paper::', this.formModel.paper, e)
                e.leftx = Math.round(this.formModel.paper.leftx / this.prxvalue)
                e.topy = Math.round(this.formModel.paper.topy / this.prxvalue)
              } else {
                // e.leftx = Math.round(e.leftx / this.prxvalue)
                // e.topy = Math.round(e.topy / this.prxvalue)
              }
            }
          })
          console.log(' 提交的时候 imageUrl2', this.imageUrl, bgImg)
          putSettingCompanyOrder(arr).then(data => {
              this.loading = false
              this.$message({ type: 'success', message: '运单打印设置成功！' })
              this.getCommonSettingOrder()
              this.viewKey = new Date().getTime()
            })
            .catch(err => {
              this.loading = false
              this._handlerCatchMsg(err)
            })
        }
      })
    }
  }
}

</script>
