<template>
  <div>
    <!-- 实际发车时间 -->
    <el-dialog :title="'请选择实际'+title+'时间'" :isShow="popVisible" append-to-body :visible.sync="popVisible" @close="closeMe" :before-close="closeMe" width="430px" :close-on-click-modal="false" center>
      <el-form :model="searchForm" ref="searchForm">
        <!-- 到车 -->
        <el-form-item :label="'实际'+title+'时间'" :label-width="formLabelWidth" v-if="isArrival">
          <el-date-picker v-model.trim="searchForm.actualArrivetime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" :picker-options="pickOption" placeholder="选择时间">
          </el-date-picker>
        </el-form-item>
        <!-- 发车 -->
        <el-form-item :label="'实际'+title+'时间'" :label-width="formLabelWidth" v-else>
          <el-date-picker v-model.trim="searchForm.actualSendtime" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择时间">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
     <el-button @click="closeMe">取 消</el-button>
      <el-button type="primary" @click="submitForm('searchForm')" :loading="loading">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>
<script>
import { parseTime } from '@/utils/index'
import { getSystemTime } from '@/api/common'
export default {
  props: {
    popVisible: {
      type: Boolean,
      default: false
    },
    isArrival: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '发车'
    },
    disableTimer: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      inited: true,
      loading: false,
      formLabelWidth: '120px',
      systemTime: '',
      currentTime: parseTime(+new Date(), '{y}-{m}-{d} {h}:{i}:{s}'),
      searchForm: {
        actualSendtime: '', // 发车页面使用 string
        actualArrivetime: '' // 到车页面使用 date
      }
    }
  },
  computed: {
    pickOption() {
      const _this = this
      return {
        firstDayOfWeek: 1,
        disabledDate(time) {
          if (_this.disableTimer) {
            let start = _this.disableTimer
            const outTime = new Date(new Date(start).getFullYear(), new Date(start).getMonth(), new Date(start).getDate())
            return outTime ? time.getTime() < outTime : false
          } else {
            return false
          }
        }
      }
    }
  },
  watch: {
    popVisible: {
      handler(cval, oval) {
        if (cval) {
          console.log('title', this.title, this.isArrival, this.disableTimer)
          this.inited = true
          this.loading = false
          this.currentTime = parseTime(+new Date(), '{y}-{m}-{d} {h}:{i}:{s}')
          this.searchForm.actualArrivetime = this.currentTime
          this.searchForm.actualSendtime = this.currentTime
          const _this = this

          getSystemTime().then(data => {
              if (data) {
                this.systemTime = data.trim()
                this.searchForm.actualArrivetime = data.trim()
                this.searchForm.actualSendtime = data.trim()
              }
            })
            .catch(err => {
              this._handlerCatchMsg(err)
            })
        }
      },
      immediate: true,
      deep: true
    },
    isArrival() {}
  },
  methods: {
    submitForm(formName) {
      this.loading = true
      if (this.inited) {
        let obj = {
          actualSendtime: this.searchForm.actualSendtime ? this.searchForm.actualSendtime : this.systemTime ? this.systemTime : this.currentTime,
          actualArrivetime: this.searchForm.actualArrivetime ? this.searchForm.actualArrivetime : this.systemTime ? this.systemTime : this.currentTime
        }
        this.$emit('time', obj)
        this.loading = false
        this.closeMe()
      }

    },
    closeMe(done) {
      this.inited = false
      this.$emit('update:popVisible', false)
    }
  }
}

</script>
