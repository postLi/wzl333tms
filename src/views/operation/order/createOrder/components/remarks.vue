<template>
  <el-dialog
    title="常用备注"
    class="remarksPopSetup"
    :visible="popVisible"
    custom-class="feeSetupDialog"
    :close-on-click-modal="false"
    :modal-append-to-body="false"
    v-loading="loading"
    @open="getRemarkSetup"
    width="300px"
    :before-close="close">
    <div class="setup-info-remark">
      <div class="addNew" v-if="isAdd">
        <el-input size="mini" @change="addItem" /><el-button size="mini" icon="el-icon-check" class="add-btn"></el-button><el-button size="mini" icon="el-icon-close" class="delete-btn"></el-button>
      </div>
      <ul>
        <li v-for="(item, index) in remarksData" :key="index">
          <div class="remark-info" v-if="!isedit">{{ item.value }}</div>
          <div class="remarks-edit" v-else>
            <el-input size="mini" :vlaue="item.value" @change="(val)=>{changeItem(item.id, val)}" />
              <el-button size="mini" icon="el-icon-check" class="add-btn"></el-button>
              <el-button size="mini" icon="el-icon-close" class="delete-btn"></el-button>
          </div>
        </li>
      </ul>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" @click="canAdd">添 加</el-button>
      <el-button size="mini" type="primary" @click="canEdit">编 辑</el-button>
    </span>
  </el-dialog>
</template>
<script>
import OrderApi from  '@/api/operation/orderManage'

export default {
  props: {
    popVisible: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    // 搜索项不参与拖拉排序
    searchList () {
      if(this.query){
        return this.remarksData.filter(el=>{
          return el.name.indexOf(this.query) !== -1
        })
      } else {
        return []
      }
    }
  },
  data () {
    return {
      remarksData: [],
      // 用来搜索项
      query: "",
      loading: false,
      isedit: false,
      isAdd: false
    }
  },
  methods: {
    close(done){
      this.$emit('update:popVisible', false)
      this.$emit('close')
      if(typeof done === 'function'){
        done()
      }
    },
    // 新增
    addItem (val) {

    },
     // 修改
    changeItem (id, val) {

    },
    // 当打开设置窗口时，从后台获取最新的设置
    getRemarkSetup() {
      this.loading = true
      return OrderApi.getRemarkList().then(res => {
        this.remarksData = res.list
        this.loading = false
      })
    },
    submitRemarkSetup() {
      this.loading = true
      this.remarksData = this.remarksData.map((el, i) => {
        el.fieldOrder = i + 1
        return el
      })
      return OrderApi.putCargoSetting(this.remarksData).then(res => {
        this.loading = false
        if(res.status === 200) {
          this.$message.info('修改成功！')
          this.close()
        } else {

        }
      })
    },
    canEdit(){
      this.isedit = true
      this.isAdd = false
    },
    canAdd(){
      this.isAdd = true
      this.isedit = false
    }
  }
}
</script>
<style lang="scss">
.remarksPopSetup{
  .el-dialog__header, .el-dialog__footer{
    background: #eee;
    padding: 10px;
  }
  .el-dialog__headerbtn{
    top: 10px;
    right: 10px;
  }
  .el-dialog__body{
    padding: 10px 0 20px;
    position: relative;
  }
  .el-dialog__title{
    font-size: 14px;
  }
  .el-input{
    width: 180px;
    margin-left: 5px;
    .el-input__inner{
      border-color: #cce1f9;
    }
  }
  .el-button+.el-button{
    margin-left: 5px;
  }
  .el-button{
    margin-left: 5px;
    i{
      font-weight: bold;
    }
  }
  .add-btn{
    color: #3b95ee;
    border: 1px solid #3b95ee;
  }
  .delete-btn{
    color: #f00;
    border: 1px solid #f00;
  }
  .setup-info-remark{
    height: 258px;
    overflow: auto;

    li{
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      border-bottom: 1px solid #ccc;
      line-height: 30px;
    }
  }
}
</style>

