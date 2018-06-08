<template>
  <el-dialog
    title="费用设置"
    class="feePopSetup"
    :visible="dialogVisible"
    custom-class="feeSetupDialog"
    :close-on-click-modal="false"
    :modal-append-to-body="false"
    @open="getFeeSetup"
    width="300px"
    :before-close="close">
    <div class="setup-info-fee">
      <div class="searchinput">
        <el-input
          placeholder="搜索"
          size="mini"
          v-model="query"
          @change="search"
          suffix-icon="el-icon-search"
          clearable>
        </el-input>
      </div>
      <draggable :move="canDragStart" v-show="!!!query" :list="feeData" class="dragArea" :options="sortOption">
        <div class="list-complete-item" v-for="element in feeData" :key='element.id'>
          <el-checkbox :title="element.name" v-model="element.ischeck">{{ element.name }}</el-checkbox>
          <span class="switch-box"><el-switch
            @change="changeList(element)"
            v-model="element.isfixed"
            active-text="定">
          </el-switch></span>
        </div>
      </draggable>
      <div v-show="!!query" class="searchlist">
        <div class="list-complete-item" v-for="element in searchList" :key='element.id'>
          <el-checkbox :title="element.name" v-model="element.ischeck">{{ element.name }}</el-checkbox>
          <span class="switch-box"><el-switch
            @change="changeList(element)"
            v-model="element.isfixed"
            active-text="定">
          </el-switch></span>
        </div>
      </div>
    </div>
    <div class="tip-info">拖拽，可调整上下顺序。</div>
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" @click="close">取 消</el-button>
      <el-button size="mini" type="primary" @click="close">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import OrderApi from  '@/api/operation/orderManage'
import draggable from 'vuedraggable'

export default {
  components: {
    draggable
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    // 搜索项不参与拖拉排序
    searchList () {
      if(this.query){
        return this.feeData.filter(el=>{
          return el.name.indexOf(this.query) !== -1
        })
      } else {
        return []
      }
    }
  },
  data () {
    return {
      feeData: [],
      // 用来搜索项
      query: "",
      sortOption: {
        group:'item',
        sort: true,
        dataIdAttr: ''
      }
    }
  },
  methods: {
    close(done){
      this.$emit('update:dialogVisible', false)
      this.$emit('close')
      if(done){
        done()
      }
    },
    // 当打开设置窗口时，从后台获取最新的设置
    getFeeSetup() {
      return OrderApi.getFeeSetup().then(res => {
        this.feeData = res
      })
    },
    submitFeeSetup() {
      return OrderApi.putChangeFeeSetup()
    },
    changeList(el){

      console.log(this.feeData)
    },
    search () {
      
    },
    canDragStart(list){
      return !list.draggedContext.element.isfixed
    }
  }
}
</script>
<style lang="scss">
.feePopSetup{
  .el-dialog__header, .el-dialog__footer{
    background: #eee;
    padding: 10px;
  }
  .el-dialog__headerbtn{
    top: 10px;
    right: 10px;
  }
  .el-dialog__body{
    padding: 35px 10px 20px;
    position: relative;
  }
  .el-dialog__title{
    font-size: 14px;
  }
  .el-switch__label{
    color: #999;
    font-size: 12px;
  }
  .el-switch__label.is-active{
    color: #409EFF;
  }
  .setup-info-fee{
    height: 258px;
    overflow: auto;
  }
  .dragArea{

  }
  .list-complete-item{
    clear: both;
    overflow: hidden;
    padding: 3px 0;
    border: 1px solid #fff;

    .el-checkbox{
      float: left;
      width: 186px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .switch-box{
      float: right;
      width: 70px;
    }
  }
  .searchinput,.tip-info{
    position: absolute;
    width: 100%;
    left: 0;
  }
  .searchinput{
    top: 5px;
    width: 90%;
    left: 5%;
  }
  .tip-info{
    font-size: 12px;
    color: #999;
    text-align: center;
    line-height: 20px;
    bottom: 0;
  }
  .sortable-ghost{
    border:1px dashed #f00;
    background: #ffe;
  }
}
</style>

