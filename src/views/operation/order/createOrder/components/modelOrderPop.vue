<!-- 弹出框-创建运单模板设置 -->
<template>
  <el-dialog :title="'运单模板'+(isModify?'-编辑':(isClose ? '-详情':'-预览'))" class="modelDialog" :visible="popVisible" :close-on-click-modal="false" :append-to-body="true" v-loading="loading" @opened="getFeeSetup" :before-close="closeWindow" :key="modelKey" center>
    <div class="modelDialog-tips">
      <i class="el-icon-question"></i> 操作提示：
      <el-tag size="mini" type="warning"><i class="el-icon-check"></i> 打勾为显示, 不打勾为隐藏</el-tag>
      <el-tag size="mini" type="warning"> <i class="el-icon-d-caret" style="transform: rotate(90deg);"></i> 可左右拖拽移动 </el-tag>
      <el-tag size="mini" type="warning"> <i class="el-icon-d-caret"></i> 可上下拖拽移动</el-tag>
    </div>
    <!-- 修改界面 -->
    <draggable class="model-list" @start="startDragModel" @end="endDragModel" v-if="isModify">
      <div class="model-item item-1" data-name="tmsOrderShipTop" :data-index="m_index.tmsOrderShipTop">
        <span class="el-icon-d-caret sortBtn"></span>
        <draggable v-model="dataList">
          <div class="model-cell cell-6" v-for="(item, index) in dataList" v-if="item.templateType === 'tmsOrderShipTop'">
            <el-checkbox v-model="item.hide" :label="item.fieldName" @change="(val) => changeCheck(val,item, index)"></el-checkbox> <i class="el-icon-d-caret" style="transform: rotate(90deg);"></i></div>
          <div style="clear:both;"></div>
        </draggable>
      </div>
      <div class="model-item item-1" data-name="customerInfo" :data-index="m_index.customerInfo">
        <span class="el-icon-d-caret sortBtn"></span>
        <div class="item-1 customerTitle">
          <div class="item-2">发货方</div>
            <!-- <el-tooltip effect="dark" content="点击可左右调换" placement="top">
              <el-button icon="el-icon-sort" circle size="mini" class="exchange-btn" @click="exchange"></el-button>
            </el-tooltip> -->
          <div class="item-2">收货方</div>
        </div>
        <draggable v-model="dataList" class="item-2">
          <div class="model-cell cell-12" v-for="(item, index) in dataList" v-if="item.templateType ==='senderCustomer' && /(Sender)/.test(item.fieldProperty)">
            <el-checkbox v-model="item.hide" :label="item.fieldName"></el-checkbox> <i class="el-icon-d-caret"></i></div>
          <div style="clear:both"></div>
        </draggable>
        <draggable v-model="dataList" class="item-2">
          <div class="model-cell cell-12" v-for="(item, index) in dataList" v-if="item.templateType === 'receiverCustomer' && /(Receiver)/.test(item.fieldProperty)">
            <el-checkbox v-model="item.hide" :label="item.fieldName"></el-checkbox> <i class="el-icon-d-caret"></i></div>
          <div style="clear:both"></div>
        </draggable>
        <div style="clear:both"></div>
      </div>
      <div class="model-item item-1" style="cursor:default;" data-name="tmsOrderCargoList" :data-index="m_index.tmsOrderCargoList">
        <span class="el-icon-d-caret sortBtn"></span>
        <div class="model-cell" v-for="(item, index) in dataList" v-if="item.templateType === 'tmsOrderCargoList'">
          {{item.fieldName}}
          <!-- <el-checkbox v-model="item.hide" :label="item.fieldName"></el-checkbox> -->
        </div>
        <div style="clear:both"></div>
      </div>
      <div class="model-item item-1" data-name="tmsOrderShip" :data-index="m_index.tmsOrderShip">
        <span class="el-icon-d-caret sortBtn"></span>
        <draggable v-model="dataList">
          <div class="model-cell cell-6" v-for="(item, index) in dataList" v-if="item.templateType === 'tmsOrderShip'" :style="{
            width: item.fieldProperty==='shipOther' ? '33.32%' : (item.fieldProperty==='shipRemarks'? '100%' : '16.66%'),
            borderTop: item.fieldProperty==='shipRemarks' ? '1px solid #d4d4d4':''
          }">
            <el-checkbox v-model="item.hide" :label="item.fieldName"></el-checkbox>
            <i class="el-icon-d-caret" style="transform: rotate(90deg);" v-if="item.fieldProperty!=='shipRemarks'"></i>
            <i class="el-icon-d-caret"></i>
          </div>
          <div style="clear:both"></div>
        </draggable>
      </div>
    </draggable>
    <!-- 详情界面 -->
    <div class="model-list" v-else>
      <div class="model-item item-1" data-name="tmsOrderShipTop" :data-index="m_index.tmsOrderShipTop">
        <div v-model="dataList">
          <div class="model-cell cell-6" v-for="(item, index) in dataList" v-if="item.templateType === 'tmsOrderShipTop' && item.hide">{{item.fieldName}}</div>
          <div style="clear:both;"></div>
        </div>
      </div>
      <div class="model-item item-1" data-name="customerInfo" :data-index="m_index.customerInfo">
        <div class="item-1 customerTitle">
          <div class="item-2">发货方</div>
          <div class="item-2">收货方</div>
        </div>
        <div class="item-2">
          <div class="model-cell cell-12" v-for="(item, index) in dataList" v-if="item.templateType === 'senderCustomer' && /(Sender)/.test(item.fieldProperty)&& item.hide">
            {{item.fieldName}}</div>
          <div style="clear:both"></div>
        </div>
        <div class="item-2">
          <div class="model-cell cell-12" v-for="(item, index) in dataList" v-if="item.templateType === 'receiverCustomer' && /(Receiver)/.test(item.fieldProperty)&& item.hide">
            {{item.fieldName}}</div>
          <div style="clear:both"></div>
        </div>
        <div style="clear:both"></div>
      </div>
      <div class="model-item item-1" style="cursor:default;" data-name="tmsOrderCargoList" :data-index="m_index.tmsOrderCargoList">
        <div class="model-cell" v-for="(item, index) in dataList" v-if="item.templateType === 'tmsOrderCargoList'">{{item.fieldName}}</div>
        <div style="clear:both"></div>
      </div>
      <div class="model-item item-1" data-name="tmsOrderShip" :data-index="m_index.tmsOrderShip">
        <div v-model="dataList">
          <div>
            <div class="model-cell cell-6" v-for="(item, index) in dataList" v-if="item.templateType === 'tmsOrderShip' && item.hide" :style="{
            width: item.fieldProperty==='shipOther' ? '33.32%' : (item.fieldProperty==='shipRemarks'? '100%' : '16.66%'),
            borderTop: item.fieldProperty==='shipRemarks' ? '1px solid #d4d4d4':''
          }">
              {{item.fieldName}}
            </div>
            <div style="clear:both"></div>
          </div>
          <div style="clear:both"></div>
        </div>
      </div>
    </div>
    <div class="model-foot">
      <el-button type="info" icon="el-icon-back" @click="doAction('close')" v-if="isClose">关闭</el-button>
      <el-button type="info" icon="el-icon-back" @click="doAction('back')" v-if="!isClose">返回</el-button>
      <el-button type="primary" icon="el-icon-edit-outline" v-if="!isModify" @click="doAction('edit')">编辑模板</el-button>
      <el-button type="success" icon="el-icon-document" v-if="isModify" @click="doAction('save')">保存</el-button>
      <el-button type="warning" icon="el-icon-view" v-if="isModify" @click="doAction('preview')">预览</el-button>
      <el-button type="warning" icon="el-icon-view" v-if="isModify" @click="doAction('default')">恢复默认模板</el-button>
    </div>
  </el-dialog>
</template>
<script>
let dom = ''
import draggable from 'vuedraggable'
import { objectMerge2 } from '@/utils/index'
import orderManage from '@/api/operation/orderManage'
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
  watch: {
    popVisible: {
      handler(cval, oval) {
        if (cval) {
          this.isModify = false
          this.fetchData()
        }
      },
      deep: true
    },
    isModify: {
      handler(cval, oval) {
        this.sortModel()
      }
    }
  },
  data() {
    return {
      isClose: true,
      isModify: false,
      modelKey: 0,
      loading: false,
      orgDataList: [],
      dataList: [],
      org_m_index: {
        tmsOrderShipTop: 1,
        customerInfo: 2,
        tmsOrderCargoList: 3,
        tmsOrderShip: 4
      },
      m_index: {
        tmsOrderShipTop: 1,
        customerInfo: 2,
        tmsOrderCargoList: 3,
        tmsOrderShip: 4
      }
    }
  },
  mounted() {
    this.sortModel()
  },
  methods: {
    exchange() { // 交换发货方和收货方

    },
    changeCheck(val, item, index) {
      if (item.fieldProperty === 'shipToCityName') {
        item.hide = true
        this.$message.warning('【' + item.fieldName + '为必填项不可隐藏，需要隐藏请先取消必填项设置】')
        return false
      }
      if (this.otherinfo.systemSetup) {
        const sysprops = Object.assign([], this.otherinfo.systemSetup.shipPageFunc.shipFieldValue)
        for (const i in sysprops) {
          if (i === item.fieldProperty) {
            if (sysprops[i] === '1') {
              item.hide = true
              this.$message.warning('【' + item.fieldName + '为必填项不可隐藏，需要隐藏请先取消必填项设置】')
            }
          }
        }
      }
    },
    initModelIndex() { // 初始化模块排序
      if (this.dataList) {
        this.dataList.forEach((el, index) => {
          if (/(senderCustomer|receiverCustomer)/.test(el.templateType)) { // 发货人或收货人
            this.m_index.customerInfo = el.typeOrder
          } else {
            this.m_index[el.templateType] = el.typeOrder
          }
        })
        this.org_m_index = objectMerge2({}, this.m_index)
        this.sortModel()
      }
    },
    sortModel() {
      // 1/需要深拷贝DOM
    // 2/清空容器的dom
    // 3/排序每个模块
    // 4/重新把dom设置进去被清空的容器里面，实现排序效果
      // this.$nextTick(() => {
      //   if (this.dataList) {
      //     const root = document.querySelector('.model-list')
      //     const list = objectMerge2([], root.children || document.querySelectorAll('.model-item'))
      //     root.innerHTML = ''
      //     const arr = Array.prototype.slice.call(list)
      //     arr.sort(function(a, b) {
      //       return Number(a.getAttribute('data-index') - Number(b.getAttribute('data-index')))
      //     })
      //     for (let i = 0; i < arr.length; i++) {
      //       root.appendChild(arr[i])
      //       const name = arr[i].getAttribute('data-name')
      //       const index = arr[i].getAttribute('data-index')
      //     }
      //     this.loading = false
      //   }
      // })
      this.$nextTick(() => {
        if (this.dataList) {
          const list = document.querySelectorAll('.model-item')
          const arr = Array.prototype.slice.call(list)
          arr.sort(function(a, b) {
            return Number(a.getAttribute('data-index') - Number(b.getAttribute('data-index')))
          })
          const modelDiv = document.querySelectorAll('.model-list')[0]
          for (let i = 0; i < arr.length; i++) {
            modelDiv.appendChild(arr[i])
            // const name = arr[i].getAttribute('data-name')
            // const index = arr[i].getAttribute('data-index')
          }
        }
      })
    },
    startDragModel(event) {
      dom = event.item
      const modelName = dom.getAttribute('data-name')
      const modelIndex = Number(dom.getAttribute('data-index'))
    },
    endDragModel(event) {
      dom = Array.prototype.slice.call(event.target.children)
      dom.forEach((el, index) => {
        const modelName = el.getAttribute('data-name')
        this.m_index[modelName] = index + 1
      })
      if (this.dataList) {
        this.dataList.forEach((el, index) => {
          if (/(senderCustomer|receiverCustomer)/.test(el.templateType)) { // 发货人或收货人
            el.typeOrder = this.m_index.customerInfo
          } else {
            el.typeOrder = this.m_index[el.templateType]
          }
        })
      }
    },
    fetchData() {
      return orderManage.getOrderModel().then(data => {
        if (data) {
          this.dataList = data
          this.setData()
        }
      })
        .catch(err => {
          this._handlerCatchMsg(err)
        })
    },
    setData() {
      // 格式化数据
      this.dataList.forEach((el, index) => {
        el.hide = el.hide === 1
      })
      this.orgDataList = objectMerge2([], this.dataList)
      // 初始化模块排序
      this.initModelIndex()
    },
    close(done) {
      this.$emit('update:popVisible', false)
      this.$emit('close')
      if (typeof done === 'function') {
        done()
      }
    },
    closeWindow() {
      if (this.isModify) {
        const str = JSON.stringify(objectMerge2([], this.dataList))
        const orgstr = JSON.stringify(objectMerge2([], this.orgDataList))
        if (str === orgstr) {
          this.close()
        } else {
          this.$confirm('模板已修改, 是否保存?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.updateModel()
          }).catch(() => {})
        }
      } else {
        this.close()
      }
    },
    getFeeSetup() {},
    doAction(type) {
      switch (type) {
        case 'close':
          if (this.isModify) {
            const str = JSON.stringify(objectMerge2([], this.dataList))
            const orgstr = JSON.stringify(objectMerge2([], this.orgDataList))
            if (str === orgstr) {
              this.close()
            } else {
              this.$confirm('模板已修改, 是否保存?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.updateModel()
                this.isModify = false
                this.isClose = false
              }).catch(() => {
                this.dataList = objectMerge2([], this.orgDataList)
                this.initModelIndex()
                this.sortModel()
                this.isModify = false
              })
            }
          } else {
            this.close()
          }
          break
        case 'back':
          if (this.isModify) {
            const str = JSON.stringify(objectMerge2([], this.dataList))
            const orgstr = JSON.stringify(objectMerge2([], this.orgDataList))
            if (str === orgstr) {
              this.isClose = true
              this.isModify = false
            } else {
              this.$confirm('模板已修改, 是否保存?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.updateModel()
                this.isClose = true
                this.isModify = false
              }).catch(() => {
                this.dataList = objectMerge2([], this.orgDataList)
                this.initModelIndex()
                this.sortModel()
                this.isClose = true
                this.isModify = false
              })
            }
          } else {
            this.isClose = false
            this.isModify = true
          }
          break
        case 'edit':
          this.isModify = true
          this.isClose = false
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
                this.updateModel()
                instance.confirmButtonLoading = false
                done()
              } else {
                this.m_index = objectMerge2({}, this.org_m_index)
                this.dataList = objectMerge2([], this.orgDataList)
                done()
              }
            }
          }).then(action => {

          })
          break
        case 'preview':
          this.isModify = false
          this.isClose = false
          break
        case 'default':
          const hh = this.$createElement
          this.$msgbox({
            title: '提示',
            closeOnClickModal: false,
            closeOnPressEscape: false,
            closeOnHashChange: false,
            message: hh('p', null, [
              hh('p', null, '是否使用默认模板，确定保存为全公司通用模板吗？'),
              hh('p', { style: 'color: #999' }, '修改后，公司所有网点都按照该模板开单')
            ]),
            showCancelButton: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            beforeClose: (action, instance, done) => {
              if (action === 'confirm') {
                instance.confirmButtonLoading = true
                instance.confirmButtonText = '执行中...'
                this.updateModel('default')
                instance.confirmButtonLoading = false
                done()
              } else {
                this.m_index = objectMerge2({}, this.org_m_index)
                this.dataList = objectMerge2([], this.orgDataList)
                done()
              }
            }
          }).then(action => {

          })
          break
      }
    },
    updateModel(flag) {
      return new Promise((resolve, reject) => {
        try {
          // let dataList = []
          // if (flag) {
          //   dataList = objectMerge2([], this.$const.MODELLIST)
          //   console.log('111111111', dataList)
          // } else {
          //   dataList = objectMerge2([], this.dataList)
          //   console.log('222222222', dataList)
          // }
          const dataList = objectMerge2([], this.dataList)

          dataList.forEach((el, index) => {
            if (flag) {
              this.$const.MODELLIST.forEach((em, eindex) => {
                if (em.fieldProperty === el.fieldProperty) {
                  el.fieldOrder = em.fieldOrder
                  el.hide = em.hide
                  el.typeOrder = em.typeOrder
                }
              })
            } else {
              el.fieldOrder = index + 1
              el.hide = el.hide ? 1 : 0
            }
          })
          return orderManage.putOrderModel(dataList).then(data => {
            this.$message.success('保存成功！')
            this.fetchData()
            this.$emit('success')
            this.close()
            resolve()
          })
            .catch(err => {
              this._handlerCatchMsg(err)
              reject(err)
            })
        } catch (err) {
          reject(err)
        }
      })
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
  .modelDialog-tips {
    margin-bottom: 10px;
  }
  .exchange-btn{
    position: absolute;
    transform: rotate(90deg);
    left: 50%;
    margin-left: -13px;
  }

  .model-list {
    border: 2px solid $borderLineColor;
    .model-item {
      margin-bottom: 10px;
      width: 100%;
      position: relative;
      min-height: $cellHeight;
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
        cursor: move;
      }

      .model-cell {
        float: left;
        line-height: $cellHeight;
        height: $cellHeight;
        font-size: 14px;
        min-width: 100px;
        position: relative;
        padding: 0 5px;
        cursor: move;
        transition: 0.5s;
        i {
          transition: 0.5s;
          float: right;
          margin-top: 7px;
          color: #999;
          display: none;
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
          right: 0px;
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
        &:before {
          content: '';
          position: absolute;
          background-color: rgba(0, 0, 0, 0);
          top: -2px;
          right: 0px;
        }
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
      border-left: 1px solid $borderLineColor;
    }
  }

  .customerTitle {
    color: #5dabed;
    font-size: 14px;
    line-height: $cellHeight;
    text-align: center;
    .item-2 {
      background-color: #cbe1f7;
    }
  }
  .model-foot {
    text-align: center;
    padding-top: 20px;
  }
}

</style>
