<template>
  <!-- 打印运单设置 -->
  <el-dialog title="打印运单设置" :visible.sync="dialogVisible" fullscreen :before-close="closeMe" class="tms_dialog_print">
    <div class="print_aside">
      <div class="print_aside_head">
        <span>字段列表 {{formModel.labelList.length}} </span>
        <el-button type="success" @click="submitForm('formModel')" icon="el-icon-document" :size="btnsize" style="float: right;margin-top:10px;">保存设置</el-button>
        <el-button @click="resetForm('formModel')" icon="el-icon-document" :size="btnsize" style="float: right;margin-top:10px;margin-right: 10px;">全部重置</el-button>
      </div>
      <el-form :model="formModel" :rules="rules" ref="formModel" label-width="0px">
        <ul class="print_aside_content">
          <!-- <draggable :list="formModel.labelList" class="dragArea" :move="canDragStart"> -->
          <transition-group>
            <li v-for="(item, index) in formModel.labelList" :key="index">
              <i :class="item.isshow===1? 'el-icon-circle-check showLabel' : 'el-icon-circle-close hideLabel'"></i> <b>{{item.filedName}}</b> <span>{{item.filedValue}}</span>
              <el-switch v-model="item.isshow===1?true:false" :active-text="item.isshow?'显示':'隐藏'" @change="handleSwitch(item)" v-if="item.filedValue!=='setting'"></el-switch>
              <div class="print_aside_content_itemSet">
                <el-form-item v-if=" item.filedValue!=='setting'">
                  <el-input :size="btnsize" v-model="item.leftx" v-numberOnly placeholder="X轴坐标" @change="(obj) => {changeValue(obj, item,index)}">
                    <template slot="prepend">X</template>
                  </el-input>
                </el-form-item>
                <el-form-item v-if=" item.filedValue!=='setting'">
                  <el-input :size="btnsize" v-model="item.topy" v-numberOnly placeholder="Y轴坐标" @change="(obj) => {changeValue(obj, item,index)}">
                    <template slot="prepend">Y</template>
                  </el-input>
                </el-form-item>
                <el-form-item v-if="item.filedValue !== 'urgent' && item.filedValue !== 'common'">
                  <el-input :size="btnsize" v-model="item.width" v-numberOnly placeholder="宽度" @change="(obj) => {changeValue(obj, item,index)}">
                    <template slot="prepend">宽</template>
                  </el-input>
                </el-form-item>
                <el-form-item v-if="item.filedValue !== 'urgent' && item.filedValue !== 'common'">
                  <el-input :size="btnsize" v-model="item.height" placeholder="高度" @change="(obj) => {changeValue(obj, item,index)}">
                    <template slot="prepend">高</template>
                  </el-input>
                </el-form-item>
                <el-form-item v-if=" item.filedValue!=='setting' && item.filedValue !== 'urgent' && item.filedValue !== 'common'">
                  <el-input :size="btnsize" v-model="item.fontsize" v-numberOnly placeholder="字号" @change="(obj) => {changeValue(obj, item,index)}">
                    <template slot="prepend">字号</template>
                  </el-input>
                </el-form-item>
                <el-form-item v-if=" item.filedValue!=='setting' && item.filedValue !== 'urgent' && item.filedValue !== 'common'">
                  <el-select v-model="item.bold" placeholder="粗细" size="mini">
                     <el-option
                      v-for="item in fontWeightOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item v-if=" item.filedValue!=='setting' && item.filedValue !== 'urgent' && item.filedValue !== 'common'">
                  <el-select v-model="item.alignment" placeholder="位置" size="mini">
                     <el-option
                      v-for="item in alignmentOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
            </li>
          </transition-group>
          <!-- </draggable> -->
        </ul>
      </el-form>
    </div>
    <div class="print_main">
      <div class="print_main_head"><span>预览展示</span>
        <!-- <el-button type="success" @click="submitForm('formModel')" icon="el-icon-document" :size="btnsize" style="float: right;margin-top:10px;">临时预览背景图</el-button> -->
      </div>
      <div class="print_main_content" :style="printPreviewContent" :key="viewKey">
        <!-- <div v-for="(item, index) in formModel.labelList" class="previewBlock" :style="{transform: 'translate(' + item.leftx+'px,'+item.topy + 'px)', width:item.width +'px', height:item.height+'px',lineHeight:item.height+'px'}" v-if="item.filedValue !=='setting' && item.isshow === 1" @mousedown="down" @mousemove="move" @mouseup="end">
          <span>{{item.filedName}}</span>
        </div> -->
        <div 
        v-for="(item, index) in formModel.labelList" 
        class="previewBlock" 
        :style="{
          transform: 'translate(' + item.leftx+'px,'+item.topy + 'px)', 
          width:item.width +'px', 
          height:item.height+'px',
          lineHeight:item.height+'px', 
          fontSize: item.fontsize+'px',
          fontWeight: parseInt(item.bold) === 0? 400 : parseInt(item.bold) * 400,
          textAlign: item.alignment===2?'center': (item.alignment===0?'right':'left')}" 
        v-if="item.filedValue !=='setting' && item.isshow === 1"
        @mousedown="down" 
        @mousemove="move" 
        @mouseup="end">
          <span>{{item.filedName}}</span>
        </div>
        <!-- </draggable> -->
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
      rules: {},
      viewKey: 0,
      flags: false,
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
      }],
      fontWeightOptions: [{
        value: 0,
        label: '默认粗细'
      },
      {
        value: 2,
        label: '加粗'
      }],
      noShowFontAndPositionAndHold: false
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
    printPreviewContent() {
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
    },
    printPreviewPaper() {

    }
  },
  mounted() {
    this.getSettingCompanyOrder()
  },
  methods: {
    down() {
      console.log(event)
      // this.flags = true;
      // let touch;
      // if (event.touches) {
      //   touch = event.touches[0];
      // } else {
      //   touch = event;
      // }
      // this.position.x = touch.clientX;
      // this.position.y = touch.clientY;
      // this.dx = moveDiv.offsetLeft;
      // this.dy = moveDiv.offsetTop;
    },
    move() {
      // console.log(event)
      // if (this.flags) {
      //   let touch;
      //   if (event.touches) {
      //     touch = event.touches[0];
      //   } else {
      //     touch = event;
      //   }
      //   this.nx = touch.clientX - this.position.x;
      //   this.ny = touch.clientY - this.position.y;
      //   this.xPum = this.dx + this.nx;
      //   this.yPum = this.dy + this.ny;
      //   moveDiv.style.left = this.xPum + "px";
      //   moveDiv.style.top = this.yPum + "px";
      //   //阻止页面的滑动默认事件
      //   document.addEventListener("touchmove", function() {
      //     event.preventDefault();
      //   }, false);
      // }
    },
    end() {
      // this.flags = false;
    },
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
            if (this.checkNull(e.topy) || this.checkNull(e.leftx) || this.checkNull(e.width) || this.checkNull(e.height)) {
              this.$message({ type: 'warning', message: '不能为空' })
              return false
            }
          })
          // this.formModel.labelList.forEach(e => { // 测试随机位置
          //   if (e.filedValue !== 'setting') {
          //     e.topy = Math.random() * 500
          //     e.leftx = Math.random() * 600
          //     e.width = 120
          //     e.height = 30
          //     e.fontsize = 14
          //     e.bold = 0
          //     e.alignment = 0
          //   }
          // })
          putSettingCompanyOrder(this.formModel.labelList).then(data => {
            this.$message({ type: 'success', message: '运单打印设置成功！' })
            this.getSettingCompanyOrder()
            this.viewKey = new Date().getTime()
          })
        }
      })
    },
    resetForm(formName) {
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
              e.width = 0
              e.height = 0
              e.fontsize = 14
              e.bold = 0
              e.alignment = 0
            })
          })
          .catch (error => {
            this.$message({type: 'info', type:'已取消'})
          })
        }
      })
    },
    canDragStart(list) {},
    handleSwitch(obj) {
      obj.isshow === 1 ? obj.isshow = 0 : obj.isshow = 1
    },
    changeValue(obj, item, index) {
      console.log(obj, item, index)
      this.viewKey = new Date().getTime()

    }
  }
}

</script>
