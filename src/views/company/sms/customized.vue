<template>
  <div class="tab-content tab-content_sms miniHeaderSearch" v-loading="loading">
    <div class="tab_info">
      <div class="btns_box">
        <el-button type="primary" :size="btnsize" icon="el-icon-document" plain @click="openAddSign" v-has:SMS_CUSTOMIZATION_1>定制专属签名</el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-document" plain @click="openShowSign" v-if="isShowSignBtn" v-has:SMS_CUSTOMIZATION_2>查看专属签名</el-button>
        <span class="btns_box_smstips">{{smsDocText}}</span>
      </div>
      <div class="info_tab info_tab_sms">
        <el-table ref="multipleTable" height="100%" @row-dblclick="editContent" style="width:100%;" tooltip-effect="dark" :data="infoList" stripe border>
          <el-table-column fixed sortable width="50" label="序号">
            <template slot-scope="scope">
              {{((searchQuery.currentPage - 1) * searchQuery.pageSize) + scope.$index + 1}}
            </template>
          </el-table-column>
          <el-table-column sortable label="短信发送节点" width="150" prop="sendNode">
            <template slot="header" slot-scope="scope">
              <tableHeaderSearch :scope="scope" :query="searchQuery" @change="changeKey" />
            </template>
             <template slot-scope="scope">{{scope.row.sendNode}}</template>
          </el-table-column>
          <el-table-column sortable label="提醒对象" width="110" prop="remindTarget">
            <template slot="header" slot-scope="scope">
              <tableHeaderSearch :scope="scope" :query="searchQuery" @change="changeKey" />
            </template>
            <template slot-scope="scope">{{scope.row.remindTarget}}</template>
          </el-table-column>
          <el-table-column sortable label="短信内容（双击编辑短信内容）" prop="templateContent" align="left">
            <template slot="header" slot-scope="scope">
              <tableHeaderSearch :scope="scope" :query="searchQuery" @change="changeKey" />
            </template>
            <template slot-scope="scope">
              <el-popover placement="bottom" width="400" trigger="hover" :content="scope.row.templateContent">
                <span slot="reference">{{scope.row.templateContent}}</span>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column sortable label="审核状态" width="120" prop="applyStatus">
            <template slot="header" slot-scope="scope">
              <tableHeaderSearch :scope="scope" :query="searchQuery" @change="changeKey" />
            </template>
            <template slot-scope="scope">
              {{ scope.row.applyStatus===0 ? '审核中' : scope.row.applyStatus===1 ? '审核通过' : '审核不通过' }}
            </template>
          </el-table-column>
          <el-table-column sortable label="发送状态" width="120" prop="sendStatus">
            <template slot="header" slot-scope="scope">
              <tableHeaderSearch :scope="scope" :query="searchQuery" @change="changeKey" />
            </template>
            <template slot-scope="scope">
              <el-switch v-model="scope.row.sendStatus" active-color="#67c23a" :active-text="scope.row.sendStatus?'开':'关'" @dblclick.stop.prevent.native @change="(newVal) => handleEnable(newVal, scope.row)"></el-switch>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="info_tab_footer">
        共计:{{ total }}
        <div class="show_pager">
          <Pager :total="total" @change="handlePageChange" />
        </div>
      </div>
    </div>
    <!-- 定制专属签名 -->
    <addCustomized :popVisible="addPopVisible" @close="closeAdd" @success="fetchList"></addCustomized>
    <!-- 编辑短信 -->
    <popRight :info="selectInfo" :popVisible.sync="editInfoVisible" @close="closeEdit" @success="getFecthList"></popRight>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { postSmsTemplateLogList, sendSmsByTemplateLog, postSmsSign, udpateSmsTemplateLogStatus, getSmsDocText } from '@/api/company/sms'
import Pager from '@/components/Pagination/index'
import addCustomized from './components/addCustomized'
import popRight from './components/editContent'
import tableHeaderSearch from '@/components/tableHeaderSearch'
export default {
  components: {
    Pager,
    popRight,
    addCustomized,
    tableHeaderSearch
  },
  data() {
    return {
      btnsize: 'mini',
      infoList: [],
      signName: '',
      isShowSignBtn: false,
      loading: true,
      addPopVisible: false,
      total: 0,
      smsDocText: '',
      editInfoVisible: false,
      selectInfo: {},
      searchQuery: {
        currentPage: 1,
        pageSize: 100,
        vo: {
          orgId: ''
        }
      }
    }
  },
  mounted() {
    this.getSmsDocText()
    this.postSmsSign()
    this.fetchList()
  },
  methods: {
    changeKey(obj) {
      this.searchQuery = obj
      this.fetchList()
    },
    getSmsDocText() { // 免费短信文案提示
      getSmsDocText(this.otherinfo.orgid).then(data => {
          this.smsDocText = data.smsDocText
        })
        .catch(err => {
          this._handlerCatchMsg(err)
        })
    },
    postSmsSign() { // 签名
      postSmsSign(this.otherinfo.orgid).then(data => {
          if (data.data) {
            this.signName = data.data.modifySign
            if (data.data.modifyCount === 1) {
              this.isShowSignBtn = true
            } else {
              this.isShowSignBtn = false
            }
          }
        })
        .catch(err => {
          this._handlerCatchMsg(err)
        })
    },
    fetchList() {
      this.loading = true
      this.searchQuery.vo.orgId = this.otherinfo.orgid
      postSmsTemplateLogList(this.searchQuery).then(data => {
          if (data) {
            this.infoList = data.list
            this.infoList.forEach(e => {
              e.sendStatus = e.sendStatus === 0 // true-0 可发送  false-1 不发送
            })
            this.total = data.total
            this.loading = false
          }

        })
        .catch(err => {
          this._handlerCatchMsg(err)
          this.loading = false
        })
    },
    handlePageChange(obj) { // 翻页
      this.searchQuery.currentPage = obj.pageNum
      this.searchQuery.pageSize = obj.pageSize
    },
    openShowSign() {
      const h = this.$createElement
      this.$msgbox({
        title: '专属签名',
        message: h('div', { style: 'text-align: center' }, [
          h('p', { style: 'font-size: 16px' }, this.signName)
        ])
      })
    },
    openAddSign() {
      this.addPopVisible = true
    },
    closeAdd() {
      this.addPopVisible = false
    },
    editContent(row, event) {
      console.log(row)
      this.selectInfo = Object.assign({}, row)
      this.editInfoVisible = true
    },
    closeEdit() {
      this.editInfoVisible = false
    },
    getFecthList() {
      console.log('sdfsdfsdfsdf')
      // this.editInfoVisible = false
      this.fetchList()
    },
    handleEnable(newVal, row) { // true-0 可发送  false-1 不发送
      const obj = {
        id: row.id,
        sendStatus: newVal ? 0 : 1
      }
      udpateSmsTemplateLogStatus(obj).then(data => {
          this.fetchList()
          this.$message.success('修改发送状态成功！')
        })
        .catch(err => {
          row.sendStatus = !newVal
          this._handlerCatchMsg(err)
        })
    }
  }
}

</script>
<style lang="scss">
.tab-content_sms {
  .el-message-box__content {
    text-align: center;
    font-size: 16px;
  }
  .btns_box_smstips {
    color: #999;
    font-size: 14px;
    margin: 0px 10px;
    line-height: 36px;
  }
}

</style>
