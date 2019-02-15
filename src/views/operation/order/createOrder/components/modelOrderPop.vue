<!-- 弹出框-创建运单模板设置 -->
<template>
  <el-dialog :title="'运单模板'+(isModify?'-编辑':'-详情')" class="modelDialog" :visible="popVisible" :close-on-click-modal="false" :append-to-body="true" v-loading="loading" @opened="getFeeSetup" :before-close="close" :key="modelKey">
    <!-- 修改界面 -->
    <draggable class="model-list" v-if="isModify">
      <div class="model-item item-1">
        <span class="el-icon-d-caret sortBtn"></span>
        <draggable v-model="dataList">
          <div class="model-cell cell-6" v-for="(item, index) in dataList" v-if="item.type === 1">
            <el-checkbox v-model="item.show" :label="item.name"></el-checkbox> <i class="el-icon-d-caret" style="transform: rotate(90deg);"></i></div>
          <div style="clear:both;"></div>
        </draggable>
      </div>
      <div class="model-item item-1">
        <span class="el-icon-d-caret sortBtn"></span>
        <div class="model-item item-1 customerTitle">
          <div class="item-2">发货方</div>
          <div class="item-2">收货方</div>
        </div>
        <draggable v-model="dataList" class="item-2">
          <div class="model-cell cell-12" v-for="(item, index) in dataList" v-if="item.type === 2">
            <el-checkbox v-model="item.show" :label="item.name"></el-checkbox> <i class="el-icon-d-caret"></i></div>
          <div style="clear:both"></div>
        </draggable>
        <draggable v-model="dataList" class="item-2">
          <div class="model-cell cell-12" v-for="(item, index) in dataList" v-if="item.type === 3">
            <el-checkbox v-model="item.show" :label="item.name"></el-checkbox> <i class="el-icon-d-caret"></i></div>
          <div style="clear:both"></div>
        </draggable>
        <div style="clear:both"></div>
      </div>
      <div class="model-item item-1" style="cursor:default;">
        <span class="el-icon-d-caret sortBtn"></span>
        <div class="model-cell" v-for="(item, index) in dataList" v-if="item.type === 4">{{item.name}}</div>
        <div style="clear:both"></div>
      </div>
      <div class="model-item item-1">
        <span class="el-icon-d-caret sortBtn"></span>
        <draggable v-model="dataList">
          <div class="model-cell cell-6" v-for="(item, index) in dataList" v-if="item.type === 5">
            <el-checkbox v-model="item.show" :label="item.name"></el-checkbox> <i class="el-icon-d-caret" style="transform: rotate(90deg);"></i></div>
          <div style="clear:both"></div>
        </draggable>
      </div>
    </draggable>
    <!-- 详情界面 -->
    <div class="model-list" v-else>
      <div class="model-item item-1">
        <div v-model="dataList">
          <div class="model-cell cell-6" v-for="(item, index) in dataList" v-if="item.type === 1 && item.show">{{item.name}}</div>
          <div style="clear:both;"></div>
        </div>
      </div>
      <div class="model-item item-1">
        <div class="model-item item-1 customerTitle">
          <div class="item-2">发货方</div>
          <div class="item-2">收货方</div>
        </div>
        <div v-model="dataList" class="item-2">
          <div class="model-cell cell-12" v-for="(item, index) in dataList" v-if="item.type === 2 && item.show">{{item.name}}</div>
          <div style="clear:both"></div>
        </div>
        <div v-model="dataList" class="item-2">
          <div class="model-cell cell-12" v-for="(item, index) in dataList" v-if="item.type === 3 && item.show">{{item.name}}</div>
          <div style="clear:both"></div>
        </div>
        <div style="clear:both"></div>
      </div>
      <div class="model-item item-1" style="cursor:default;">
        <div class="model-cell" v-for="(item, index) in dataList" v-if="item.type === 4">{{item.name}}</div>
        <div style="clear:both"></div>
      </div>
      <div class="model-item item-1">
        <div v-model="dataList">
          <div class="model-cell cell-6" v-for="(item, index) in dataList" v-if="item.type === 5 && item.show">{{item.name}}</div>
          <div style="clear:both"></div>
        </div>
      </div>
    </div>
    <div class="model-foot">
      <el-button type="info" icon="el-icon-back" @click="doAction('back')">返回</el-button>
      <el-button type="primary" icon="el-icon-edit-outline" v-if="!isModify" @click="doAction('edit')">编辑模板</el-button>
      <el-button type="success" icon="el-icon-document" v-if="isModify" @click="doAction('save')">保存</el-button>
      <el-button type="warning" icon="el-icon-view" v-if="isModify" @click="doAction('preview')">预览</el-button>
    </div>
  </el-dialog>
</template>
<script>
import draggable from 'vuedraggable'
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
      isModify: false,
      modelKey: 0,
      loading: false,
      dataList: [{
          id: 1,
          name: '开单网点',
          prop: 'createOrgid',
          type: 1,
          show: true
        },
        {
          id: 2,
          name: '发站',
          prop: 'sendP',
          type: 1,
          show: false
        },
        {
          id: 3,
          name: '到站',
          prop: 'arrivalP',
          type: 1,
          show: false
        },
        {
          id: 3,
          name: '目的网点',
          prop: 'arrivalP',
          type: 1,
          show: false
        },
        {
          id: 3,
          name: '交接方式',
          prop: 'arrivalP',
          type: 1,
          show: false
        },
        {
          id: 3,
          name: '货号',
          prop: 'arrivalP',
          type: 1,
          show: false
        },
        {
          id: 1,
          name: '发货方',
          prop: 'createOrgid',
          type: 2,
          show: false
        },
        {
          id: 2,
          name: '发货人',
          prop: 'sendP',
          type: 2,
          show: true
        },
        {
          id: 3,
          name: '联系电话',
          prop: 'arrivalP',
          type: 2,
          show: false
        },
        {
          id: 1,
          name: '发货地址',
          prop: 'createOrgid',
          type: 2,
          show: false
        },
        {
          id: 2,
          name: '收货方',
          prop: 'sendP',
          type: 3,
          show: false
        },
        {
          id: 3,
          name: '收货人',
          prop: 'arrivalP',
          type: 3,
          show: true
        },
        {
          id: 1,
          name: '联系电话',
          prop: 'createOrgid',
          type: 3,
          show: true
        },
        {
          id: 2,
          name: '收货地址',
          prop: 'sendP',
          type: 3,
          show: true
        },
        {
          id: 3,
          name: '到站3',
          prop: 'arrivalP',
          type: 4,
          show: true
        },
        {
          id: 1,
          name: '开单网点4',
          prop: 'createOrgid',
          type: 4,
          show: false
        },
        {
          id: 2,
          name: '发站4',
          prop: 'sendP',
          type: 4,
          show: true
        },
        {
          id: 3,
          name: '运费合计',
          prop: 'arrivalP',
          type: 5,
          show: true
        },
        {
          id: 3,
          name: '付款方式',
          prop: 'arrivalP',
          type: 5,
          show: true
        },
        {
          id: 3,
          name: '现付',
          prop: 'arrivalP',
          type: 5,
          show: true
        },
        {
          id: 3,
          name: '到付',
          prop: 'arrivalP',
          type: 5,
          show: true
        },
        {
          id: 3,
          name: '运费合计',
          prop: 'arrivalP',
          type: 5,
          show: true
        },
        {
          id: 3,
          name: '付款方式',
          prop: 'arrivalP',
          type: 5,
          show: false
        },
        {
          id: 3,
          name: '现付',
          prop: 'arrivalP',
          type: 5,
          show: true
        },
        {
          id: 3,
          name: '到付',
          prop: 'arrivalP',
          type: 5,
          show: true
        },
      ]
    }
  },
  methods: {
    close(done) {
      this.$emit('update:popVisible', false)
      this.$emit('close')
      if (typeof done === 'function') {
        done()
      }
    },
    getFeeSetup() {},
    doAction(type) {
      switch (type) {
        case 'back':
          if (this.isModify) {
            this.isModify = false
          } else {
            this.close()
          }
          break
        case 'edit':
          this.isModify = true
          break
        case 'save':
          const h = this.$createElement
          this.$msgbox({
            title: '提示',
            closeOnClickModal: false,
            closeOnPressEscape: false,
            closeOnHashChange: false,
            message: h('p', null, [
              h('p', null, '确定保存为全公司通用模板吗？'),
              h('p', { style: 'color: #999' }, '修改后，公司所有网点都按照该模板开单')
            ]),
            showCancelButton: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            beforeClose: (action, instance, done) => {
              if (action === 'confirm') {
                instance.confirmButtonLoading = true
                instance.confirmButtonText = '执行中...'
                setTimeout(() => {
                  done()
                  setTimeout(() => {
                    instance.confirmButtonLoading = false
                    this.$message.success('保存成功！')
                  }, 300)
                }, 3000)
              } else {
                done()
              }
            }
          }).then(action => {

          })
          break
        case 'preview':
          this.isModify = false
          break
      }
    }
  }
}

</script>
<style lang="scss">
$borderLineColor: #d4d4d4;
$cellHeight: 28px;
$cellHoverHeightColor: #409eff;
.modelDialog {
  .el-dialog {
    width: 100%;
    max-width: 1200px;
    min-width: 800px;
    .el-dialog__body {
      padding-left: 60px;
    }
  }
  .sortable-ghost {
    border: 2px dotted #409eff;
  }

  .model-list {
    border: 2px solid $borderLineColor;
    .model-item {
      margin-bottom: 10px;
      width: 100%;
      position: relative;
      clear: both;
      .sortBtn {
        position: absolute;
        padding: 7px;
        top: 0px;
        left: -43px;
        display: block;
        width: $cellHeight;
        height: $cellHeight;
        background-color: #eee;
        color: #666;
        cursor: pointer;
      }

      .model-cell {
        float: left;
        line-height: $cellHeight;
        height: $cellHeight;
        font-size: 14px;
        min-width: 100px;
        position: relative;
        padding: 0 5px;
        cursor: pointer;
        transition: 0.5s;
        i {
          transition: 0.5s;
          float: right;
          margin-top: 7px;
          color: #999; // display: none;
        }
        &:hover {
          i {
            transition: 0.2s;
            display: inline-block;
            color: $cellHoverHeightColor;
          }
        }
        &:before {
          content: '';
          position: absolute;
          width: 1px;
          height: $cellHeight;
          background-color: $borderLineColor;
          top: -2px;
          right: 0;
        }
        &:after {
          content: '';
          position: absolute;
          width: 100%;
          height: 1px;
          background-color: $borderLineColor;
          bottom: -1px;
          right: 0;
        }
      }
      .cell-6 {
        width: 16.66%;
      }
      .cell-12 {
        width: 100%;
      }
    }
    .item-1 {
      width: 100%;
      background-color: #f2f2f2;
      border-top: 1px solid $borderLineColor;
      border-bottom: 1px solid $borderLineColor;
    }
    .item-2 {
      width: 50%;
      float: left;
    }
  }

  .customerTitle {
    color: #5dabed;
    font-size: 14px;
    line-height: $cellHeight;
    text-align: center;
    .item-2 {
      background-color: #cbe1f7;
      border-right: 1px solid $borderLineColor;
    }
  }
  .model-foot {
    text-align: center;
    padding-top: 20px;
  }
}

</style>
