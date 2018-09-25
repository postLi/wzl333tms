<template>
  <pop-right :title="popTitle" :isShow="popVisible" @close="closeMe" v-loading="loading">
    <template slot="content">
      <div class="smsedit_wrapper">
        <div class="smsedit_tite">
          <span>{{info.sendNode}}</span>
        </div>
        <div class="smsedit_search">
          <el-autocomplete v-model="currentSearch" :fetch-suggestions="querySearch" placeholder="请输入内容" @select="handleSelect" popper-class="popperHide">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
            <template slot="prepend"> 可配置字段 <span>{{smsColumnLen}}</span></template>
          </el-autocomplete>
        </div>
        <div class="smsedit_list clearfix">
          <ul>
            <li v-for="(item, index) in smsColumn" :key="item.id" draggable='true' @dragstart='drag($event)' :data-fileName='item.colName' @click="addTemplate(item.colName, item,index)">
              <el-tag :type="item.colName.indexOf(currentSearch)!==-1?(currentSearch ? 'danger':'info'):'info'" size="mini">{{item.colName}}</el-tag>
            </li>
          </ul>
        </div>
        <div class="smsedit_tite">
          <span>短信内容</span>
        </div>
        <div class="smsedit_content">
          <!-- <div @drop='drop($event)' @dragover='allowDrop($event)' v-for="item in smsColumn2">
            ({{item}})
          </div> -->
          <el-input @drop='drop($event)' @dragover='allowDrop($event)' id="templateContent" @keydown.delete.native="deleteItem" style="height: 100%;" type="textarea" :rows="2" placeholder="请输入内容" v-model="smsTemplate" focus>
          </el-input>
        </div>
      </div>
    </template>
    <div slot="footer">
      <el-button @click="resetForm" type="primary">恢复默认</el-button>
      <el-button @click="closeMe">取消</el-button>
      <el-button @click="submitForm('formModel')" type="success">保存</el-button>
    </div>
  </pop-right>
</template>
<script>
let dom = ''
import popRight from '@/components/PopRight/index'
import draggable from 'vuedraggable'
import { postSmsSetColumnsList, postDefaultSmsTemplate, postSmsTemplateLog, udpateSmsTemplateLog } from '@/api/company/sms'
export default {
  components: {
    popRight,
    draggable
  },
  props: {
    popVisible: {
      type: Boolean,
      default: false
    },
    info: {
      type: Object,
      default: {}
    }
  },
  watch: {
    info(newVal) {
      if (newVal) {
        this.$nextTick(() => {
          this.postSmsSetColumnsList()
          this.postSmsTemplateLog()
          // this.initTextarea()
        })
      }
    },
    popVisible(newVal) {},
    smsColumn(newVal) {
      console.log(newVal.length)
      if (newVal) {
        this.smsColumnLen = newVal.length
      }
    }
  },
  data() {
    return {
      popTitle: '编辑短信',
      loading: false,
      currentSearch: '',
      smsColumn: [],
      smsColumn2: [],
      orgSmsColumn: [],
      smsTemplate: '',
      smsTemplateObj: {},
      smsColumnLen: 0
    }
  },
  mounted() {

  },
  methods: {
    initTextarea() {
      const range = document.selection.createRange()
      const editor = document.getElementById('templateContent')
      range.moveToElementText(editor)
    },
    drag(event) {
      dom = event.currentTarget
      console.log('drap', dom)
    },

    drop(event) {
      event.preventDefault()
      const strName = dom.getAttribute('data-fileName')
      this.addTemplate(strName)
    },
    allowDrop(event) {
      event.preventDefault() // preventDefault() 方法阻止元素发生默认的行为（例如，当点击提交按钮时阻止对表单的提交）
    },
    addTemplate(strName, object, index) { // 添加到短信模板内容区, 并且可配置区域减少该字段
      const newStrName = '(' + strName + ')'
      const tx = document.getElementById('templateContent')
      const pos = this.$const.cursorPosition.get(tx)
      this.$const.cursorPosition.add(tx, pos, newStrName)
      this.$nextTick(() => {
        this.smsColumn2.push(strName)
        // this.smsColumn.splice(index, 1)
        console.log(this.smsTemplate)
      })
    },
    deleteItem(e) {
      const tx = document.getElementById('templateContent')
      const pos = this.$const.cursorPosition.get(tx)
      // {text: "", start: 0, end: 0}
      // 光标位置
      const curPos = pos.start

      if (pos.start !== pos.end) {
        e.preventDefault()
        const sindex = this.findCursorIndex(pos.start + 1)
        const endindex = this.findCursorIndex(pos.end)
        this.deleteStr(sindex[0] - (sindex[0] === sindex[1] ? 1 : 0), endindex[1])
      } else {
        const indexArr = this.findCursorIndex(curPos)
        if (indexArr[0] !== indexArr[1]) {
          e.preventDefault()
          this.deleteStr(indexArr[0], indexArr[1])
        }
        // // 1.先检查右边括弧
        // if (valArr[curPos - 1] === ')') {
        //   e.preventDefault()
        //   // 找到左边的括弧
        //   this.deleteStr(findStr.lastIndexOf('('), curPos)
        // } else if (findStr.indexOf('(') === -1 && findStr.indexOf(')') === -1) {
        //   // 不作处理
        // } else if (findStr.lastIndexOf('(') !== -1 && (findStr.lastIndexOf(')') < findStr.lastIndexOf('('))) {
        //   e.preventDefault()
        //   const leftIndex2 = findStr.lastIndexOf('(')
        //   const findStr2 = val.substring(leftIndex2)
        //   const rightIndex2 = findStr2.indexOf(')')
        //   this.deleteStr(leftIndex2, leftIndex2 + rightIndex2 + 1)
        // }
      }
    },
    // 找到光标删除位置
    findCursorIndex(sindex) {
      const tx = document.getElementById('templateContent')
      const val = tx.value
      const curPos = sindex
      const findStr = val.substring(0, curPos)
      const valArr = val.split('')
      // 1.先检查右边括弧
      if (valArr[curPos - 1] === ')') {
          // 找到左边的括弧
        return [findStr.lastIndexOf('('), curPos]
      } else if (findStr.indexOf('(') === -1 && findStr.indexOf(')') === -1) {
          // 不作处理
        return [sindex, sindex]
      } else if (findStr.lastIndexOf('(') !== -1 && (findStr.lastIndexOf(')') < findStr.lastIndexOf('('))) {
        const leftIndex2 = findStr.lastIndexOf('(')
        const findStr2 = val.substring(leftIndex2)

        const rightIndex2 = findStr2.indexOf(')')
        return [leftIndex2, leftIndex2 + rightIndex2 + 1]
      } else {
        return [sindex, sindex]
      }
    },
    deleteStr(start, end) {
      const tx = document.getElementById('templateContent')
      const val = tx.value
      const matchStr = val.substring(start, end)
      console.log('matchStr:', start, end, matchStr)
        // 做回显到上面
      const matchArr = matchStr.match(/(\([^)]*\))/gm)
      console.log('matchArr:', matchArr)
        // 删除文本框值
      tx.value = val.replace(matchStr, '')
        // 调用￥set方法
      this.$const.cursorPosition.set(tx, {
        text: '',
        start: start,
        end: start })
    },
    submitForm(formName) {
      const obj = {
        id: this.info.id,
        defaultTmpId: this.info.defaultTmpId,
        companyId: this.info.companyId,
        remindTarget: this.info.remindTarget,
        remindTargetCode: this.info.remindTargetCode,
        sendNode: this.info.remindTargetCode,
        sendNodeCode: this.info.sendNodeCode,
        templateContent: this.smsTemplate,
        templateContentCoded: this.info.templateContentCoded,
        applyStatus: this.info.applyStatus,
        sendStatus: this.info.sendStatus ? 0 : 1
      }
      console.log(obj)
      if (obj.templateContent === '') {
        return
      }
      udpateSmsTemplateLog(obj).then(data => {
        this.$message.success('更新短信模板成功！')
        this.closeMe()
      })
        .catch(error => {
          this.$message.error(error.errorInfo || error.text || '发生未知错误！')
        })
    },
    postSmsSetColumnsList() { // 获取可配置字段,查询模板相关默认字段
      const obj = {
        orgId: this.otherinfo.orgid,
        tmpLogId: this.info.id,
        defaultTmpId: ''
      }
      postSmsSetColumnsList(obj).then(data => {
        this.smsColumn = data
        this.orgSmsColumn = data
        this.smsColumnLen = this.smsColumn.length
      })
    },
    postDefaultSmsTemplate() { // 获取短信默认模板
      const obj = {
        defaultTmpId: this.info.defaultTmpId,
        orgId: this.otherinfo.orgid
      }
      postDefaultSmsTemplate(obj).then(data => {
        this.smsTemplate = data.templateContent
        this.smsTemplateObj = data
      })
    },
    postSmsTemplateLog() { // 获取当前短信模板
      const obj = {
        id: this.info.id,
        orgId: this.otherinfo.orgid
      }
      postSmsTemplateLog(obj).then(data => {
        if (data) {
          this.smsTemplate = data.templateContent
          this.smsTemplateObj = data
          this.smsColumn2 = []
          if (data.columnsLogList && data.columnsLogList.length > 0) {
            data.columnsLogList.forEach((e, index) => {
              this.smsColumn2.push(e.colName)
            })
          }
        }
      })
    },
    resetForm() { // 恢复默认短信模板
      this.loading = true
      this.postDefaultSmsTemplate()
      const obj = {
        orgId: this.otherinfo.orgid,
        tmpLogId: '',
        defaultTmpId: this.info.defaultTmpId
      }
      postSmsSetColumnsList(obj).then(data => {
        this.loading = false
        this.smsColumn = data
        this.orgSmsColumn = data
        this.smsColumnLen = this.smsColumn.length
      })
        .catch(erro => {
          this.loading = false
        })
    },
    querySearch(queryString, cb) {
      // this.currentSearch = queryString
      // if (queryString === undefined) {
      //   if (!this.currentSearch) { // 如果搜索框为空则恢复左边列表
      //     this.smsColumn = Object.assign([], this.orgSmsColumn)
      //   }
      // }
      const smsColumn = this.orgSmsColumn
      const result = queryString ? smsColumn.filter(this.createFilter(new RegExp(queryString, 'gi'), 'colName')) : smsColumn
      // this.smsColumn = result
      cb(result)
    },
    createFilter(queryString, prop) {
      return (data) => {
        if (data[prop]) {
          return (queryString.test(data[prop]))
        }
      }
    },
    handleSelect(item) {
      this.currentSearch = item.colName
    },
    closeMe(done) {
      this.$emit('update:popVisible', false)
      if (typeof done === 'function') {
        done()
      }
    }
  }
}

</script>
<style lang="scss">
.smsedit_wrapper {
  padding: 10px;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  .smsedit_tite {
    line-height: 28px;
    padding: 0 0 10px 0;
  }
  .smsedit_search {
    .el-autocomplete {
      width: 100%;
    }
    .el-input-group__prepend {
      padding: 0 10px;
    }
  }
  .smsedit_list {
    margin: 10px 0;
    overflow: auto;
    height: calc(100% - 350px);
    padding: 10px;
    border: 1px solid #dcdfe6;

    ul {
      margin: 0;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      li {
        width: 20%;
        padding: 5px 0;
        cursor: pointer;
        span {
          transition: 0.5s;
        }
        span:hover {
          transition: 0.1s;
          transform: scale(1.1);
        }
        .el-tag--info,
        .el-tag--info .el-tag__close {
          color: #333;
        }
      }
    }
  }
  .smsedit_content {
    border: 1px solid #dcdfe6;
    height: calc(100% - 600px);
    overflow: auto;
    .el-textarea__inner {
      height: 100%;
    }
  }
  .sortable-ghost {
    border: 1px dashed #f00;
    background: #ffe;
  }
}

</style>
