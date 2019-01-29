<template>
  <!-- 批量导入Excel弹出框 -->
  <el-dialog :title="titlePop" :visible.sync="isShow" :close-on-click-modal="false" append-to-body :before-close="closeMe" class="tms_userTree" width="500px">
    <el-tree :data="dataList" :props="defaultProps" node-key="id" default-expand-all :expand-on-click-node="false">
      <span class="custom-tree-node" slot-scope="{ node, data }">
      <span>{{ data.name }}</span>
      <span v-if="data.username">
          <el-button
          type="text"
            size="mini"
            icon="el-icon-location-outline"
            @click="() => append(data, node)">
            马上切换登录
          </el-button>
        </span>
      </span>
    </el-tree>
  </el-dialog>
</template>
<script>
import { getOrgAndFollowingUser } from '@/api/login'
import { getToken } from '@/utils/auth'
export default {
  props: {
    popVisible: {
      type: Boolean,
      default: false
    },
    info: {
      type: String,
      default: ''
    }
  },
  watch: {

  },
  data() {
    return {
      titlePop: '其他网点账户',
      dataList: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  computed: {
    isShow: {
      get() {
        if (this.popVisible) {
          this.init()
        }
        return this.popVisible
      },
      set() {}
    }
  },
  methods: {
    init() { // 下载链接
      this.fetchData()
    },
    append(data, node) {
      const query = {
        switch_username: data.username,
        grant_type: 'access_token',
        access_token: getToken()
      }
      this.changeLogin(query)
    },
    changeLogin(query) {
      this.$store.dispatch('OtherLogin', query).then(() => {
        location.href = '/'
        this.closeMe()
      }).catch((error) => {
        this._handlerCatchMsg(error)
      })
    },
    fetchData() {
      getOrgAndFollowingUser().then(data => {
          if (data) {
            let res = []
            data.forEach((el, index) => {
              for (let item in el) {
                let ele = {
                  name: item,
                  children: el[item]
                }
                res.push(ele)
              }
            })
            this.dataList = res
          }
        })
        .catch(err => {
          this._handlerCatchMsg(err)
        })
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1
    },
    closeMe(done) {
      this.$emit('close')
      if (typeof done === 'function') {
        done()
      }
    }
  }
}

</script>
<style lang="scss">
.tms_userTree {
  .el-dialog__body {
    max-height: 500px;
    overflow: auto;
  }
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
}

</style>
