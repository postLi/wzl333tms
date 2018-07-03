<template>
  <el-dialog title="表格设置" :visible.sync="isShow" :close-on-click-modal="false" :before-close="closeMe" class="tms_dialog">
    <div class="tableSetup_warp">
      <!-- 左边列表 -->
      <div class="tableSetup_list">
        <div class="tableSetup_head">
          <el-checkbox :indeterminate="isIndeterminateLeft" v-model="checkAllLeft" @change="handChangeAllLeft">隐藏列 {{leftListLen}}</el-checkbox>
          <div style="margin: 3px 0;">
            <el-autocomplete class="inline-input" v-model="searchLeft" :fetch-suggestions="querySearchLeft" placeholder="请输入内容" @select="handleSearchLeft" size="mini">
              <i class="el-icon-search el-input__icon" slot="suffix"></i>
            </el-autocomplete>
          </div>
        </div>
        <div class="tableSetup_content">
          <el-checkbox-group v-model="checkListLeft" @change="handleCheckChangeLeft">
            <transition-group name="el-zoom-in-center">
              <el-row v-for="(column, index) in columnData" :key="index">
                <el-checkbox :label="column">
                  {{column.label}}
                </el-checkbox>
              </el-row>
            </transition-group>
          </el-checkbox-group>
        </div>
        <div class="tableSetup_tips">
          <span>双击，可快速左右切换。</span>
        </div>
      </div>
      <!-- 按钮区 -->
      <div class="tableSetup_btn">
        <el-button type="primary" icon="el-icon-arrow-right" @click="doAction('goRight')"></el-button>
        <br>
        <el-button type="primary" icon="el-icon-arrow-left" @click="doAction('goLeft')"></el-button>
      </div>
      <!-- 右边列表 -->
      <div class="tableSetup_list">
        <div class="tableSetup_head">
          <el-checkbox :indeterminate="isIndeterminateRight" v-model="checkAllRight" @change="handChangeAllRight">显示列 {{rightListLen}}</el-checkbox>
          <div style="margin: 3px 0;">
            <el-autocomplete class="inline-input" v-model="searchRight" :fetch-suggestions="querySearchRight" placeholder="请输入内容" @select="handleSearchRight" size="mini">
              <i class="el-icon-search el-input__icon" slot="suffix"></i>
            </el-autocomplete>
          </div>
        </div>
        <div class="tableSetup_content">
          <el-checkbox-group v-model="checkListRight" @change="handleCheckChangeRight">
             <draggable :move="canDragStart" :list="showColumnData" class="dragArea">
            <transition-group name="el-zoom-in-center">
              

              <el-row v-for="(column, index) in showColumnData" :key="index">
                <el-checkbox :label="column">
                  {{column.label}}
                </el-checkbox>
                <el-switch v-model="column.fixed" :active-text="column.fixed?'固定':'活动'" @change="handleSwitch(column)"></el-switch>
              </el-row>
            
            </transition-group>
            </draggable>
          </el-checkbox-group>
        </div>
        <div class="tableSetup_tips">
          <span>拖拽，可调整上下顺序。</span>
          <br><span>列表最多只能显示50个字段。</span>
        </div>
      </div>
    </div>
    <div slot="footer">
      <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      <el-button @click="closeMe">取 消</el-button>
    </div>
  </el-dialog>
</template>
<script>
import draggable from 'vuedraggable'
import { objectMerge2 } from '@/utils/index'
export default {
  props: {
    popVisible: {
      type: Boolean,
      default: false
    },
    issender: {
      type: Boolean,
      dafault: false
    },
    columns: {
      type: Array,
      default: []
    }
  },
  components: {
    draggable
  },
  computed: {
    isShow: {
      get() {
        return this.popVisible
      },
      set() {

      }
    }
  },
  data() {
    const generateData = _ => { // 获取左边列表
      const data = []
      if (this.columns.length > 0) {
        this.columns.forEach((e, index) => {
          data.push({
            label: e.label,
            key: index,
            fixed: e.fixed,
            prop: e.prop,
          })
        })
      }
      return data
    }
    const generateRightData = _ => {
      const data = []
      if (this.columns.length > 0) {
        this.columns.forEach((e, index) => {
          if (e.fixed) {
            data.push({
              label: e.label,
              key: index,
              fixed: e.fixed,
              prop: e.prop
            })
          }
        })
      }
      return data
    }
    const setLeftDefaultChecked = _ => { // 设置左边默认checked项
      const data = []
      this.columns.forEach((e, index) => {
        if (e.fixed) {
          data.push(index)
        }
      })
      return data
    }
    const getleftListLen = _ => {
      return this.columns.length
    }
    return {
      columnData: generateData(),
      showColumnData: generateRightData(),
      leftDefaultChecked: setLeftDefaultChecked(),
      list: [],
      rightList: [],
      listKey: 0,
      isIndeterminateLeft: true,
      isIndeterminateRight: true,
      checkAllLeft: false,
      checkAllRight: false,
      checkListLeft: [],
      checkListRight: [],
      searchLeft: '',
      searchRight: '',
      leftListLen: getleftListLen(),
      rightListLen: 0
    }
  },
  methods: {
    doAction(type) {
      switch (type) {
        case 'goRight':
          this.goRight()
          break
        case 'goLeft':
          this.goLeft()
          break
      }
    },
    canDragStart(list){
      console.log(list)
      // return !list.draggedContext.element.isfixed
    },
    setColumnNum() {
      this.leftListLen = this.columnData.length
      this.rightListLen = this.showColumnData.length
    },
    goRight() {
      this.checkListLeft.forEach((e, index) => {
        this.showColumnData.push(e) // 将左边勾选的数据项添加到右边
        let item = this.columnData.indexOf(e)
        if (item !== -1) { // 源数据减去被穿梭的数据
          this.columnData.splice(item, 1)
        }
      })
      this.checkListLeft = [] // 清空左边勾选列表
      this.setColumnNum()
    },
    goLeft() {
      this.checkListRight.forEach((e, index) => {
        this.columnData.push(e) // 将右边勾选的数据项返回到左边
        let item = this.showColumnData.indexOf(e)
        if (item !== -1) { // 源数据减去被穿梭的数据
          this.showColumnData.splice(item, 1)
        }
      })
      this.checkListRight = [] // 清空右边勾选列表
      this.setColumnNum()
    },
    handChangeAllLeft(val) { // 左边列表全选
      this.checkListLeft = val ? this.columnData : []
      this.isIndeterminate = false
    },
    handleCheckChangeLeft(val) { // 勾选左边列表项
      // console.log('勾选左边列表项', val)
    },
    handleCheckChangeRight(val) { // 勾选右边列表项
      // console.log('勾选右边列表项', val)
    },
    querySearchLeft(queryString, cb) {
      let col = this.columnData
      let results = queryString ? col.filter(this.createFilter(queryString)) : col
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    querySearchRight(queryString, cb) {
      let col = this.columnData
      let results = queryString ? col.filter(this.createFilter(queryString)) : col
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    handChangeAllRight(val) { // 右边列表全选
      this.checkListRight = val ? this.showColumnData : []
      this.isIndeterminate = false
    },
    createFilter(queryString) {
      return (data) => {
        return this.searchLeft
      }
    },
    handleSearchLeft(val) {
      // console.log('handleSearchLeft', val)
    },
    handleSearchRight(val) {
      // console.log('handleSearchRight', val)
    },
    closeMe(done) {
      this.$emit('close')
      if (typeof done === 'function') {
        done()
      }
    },
    handleChange(value, direction, movedKeys) {
      this.rightList = objectMerge2([], value)
    },
    handleSwitch(obj) {
      // console.log(obj)
    },
    submitForm(formName) {
      // this.columns = objectMerge2([], this.showColumnData)
      this.columns.forEach(e => {
        e.fixed = false
      })
      this.showColumnData.forEach((e, index) => {
        if (e.fixed) {
          this.columns[e.key].fixed = true
        }
      })
      this.listKey = Math.random()
      this.closeMe()
    }
  }
}

</script>
<style lang="scss">
.tms_dialog {
  .el-dialog {
    min-width: 600px;
  }
}

.tableSetup_warp {
  margin: -10px 0;
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  justify-content: space-between;

  .tableSetup_list {
    position: relative;
    height: 500px;
    width: 40%;
    min-width: 250px;
    border: 1px solid #eee;
    text-align: left;
    .el-row {
      position: relative;
      border-bottom: 1px solid #eee;
      padding: 10px;
      .el-checkbox {}
      .el-switch {
        position: absolute;
        right: 30px;
        .el-switch__core {
          width: 63px !important;
        }
        .el-switch__label * {
          font-size: 10px;
        }
        .el-switch__label--right {
          margin-left: -44px;
          color: #fff;
          z-index: 2;
        }
      }
    }
    .tableSetup_head {
      background-color: #eee;
      padding: 10px 10px 5px 10px;
      box-shadow: 1px 3px 10px #eee;
    }
    .tableSetup_content {
      overflow: auto;
      height: 383px;
    }
    .tableSetup_tips {
      padding: 10px;
      color: #999;
      box-shadow: -1px -3px 10px #eee;
    }
  }
  .tableSetup_btn {
    display: flex;
    flex-direction: column;
    margin-top: 15vh;
  }
}

</style>
