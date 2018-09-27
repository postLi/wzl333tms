<template>
  <div class="relation-per" v-loading="loading">
    <pop-right :title='popTitle' :isShow="popRelatVisible" @close="closeMe" class='addRelationPop'>
      <template class='addRelationPop-content' slot="content">
        <el-form ref="formName" class="demo-ruleForm" :inline="true" label-position="right" size="mini">
          <table>
            <thead>
            <tr>
              <th>角色</th>
              <th>员工</th>
              <!-- <th>手机号码</th> -->
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>
                <el-input
                  v-model="inputInfo.roleName"
                  clearable
                  disabled>
                </el-input>
              </td>
              <td>
               <el-select
                collapse-tags
                popper-class="my-autocomplete"
                v-model="selected"
                multiple
                filterable
                reserve-keyword
                placeholder="请选择员工"
                :filterable-method="querySearch"
                :loading="loading">
                <el-option
                  v-for="item in userdata"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
              </td>
              <!-- <td>
                <el-input
                  placeholder=""
                  type="textarea"
                  autosize
                  v-model="mobilelist"
                  disabled>
                </el-input>
              </td> -->
            </tr>
            </tbody>

          </table>
        </el-form>
      </template>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('formName')">保存</el-button>
        <el-button @click="closeMe">取 消</el-button>
      </div>
    </pop-right>
  </div>
</template>

<script>
  import { putEmployeerAuth } from '@/api/company/employeeManage'
  import popRight from '@/components/PopRight/index'

  export default {
    components: {
      popRight
    },
    props: {
      popRelatVisible: {
        type: Boolean,
        default: false
      },
      dotInfo: Object,
      thePerAllUserInfo: [Object, Array]
    },
    computed: {
      isShow: {
        get() {
          return this.popRelatVisible
        },
        set() {

        }
      },
      mobilelist() {
        return this.selected.map(el => {
          const i = this.thePerAllUserInfo.filter(e => e.id === el)
          return i[0] ? i[0].mobilephone : ''
        }).join(', ')
        // .join('\n')
      }
    },
    watch: {
      popRelatVisible() {
        if (this.popRelatVisible) {
          this.init()
        }
      },
      dotInfo(newVal) {
        if (this.popRelatVisible) {
          this.init()
        }
        // this.inputInfo = this.dotInfo
      },
      thePerAllUserInfo(newVal) {
        console.log('this.thePerAllUserInfo', this.thePerAllUserInfo)
        // this.resInfo = this.thePerAllUserInfo || []
      }
    },
    data() {
      return {
        userdata: [],
        selected: [],
        // mobilelist: [],
        // 输入框
        inputInfo: {
          roleName: ''
        },
        // 下拉
        restaurants: [],
        resInfo: [
          {
            name: ''
          }
        ],
        selectInfo: {
          name: '',
          mobilephone: '',
          rolesId: [],
          id: ''
        },

        //
        loading: false,
        popTitle: '关联员工',
        dialogVisible: 'false'
      }
    },
    mounted() {
  
    },
    methods: {
      init() {
        this.resInfo = this.thePerAllUserInfo || []
        this.userdata = this.resInfo
        this.inputInfo = this.dotInfo
        // 本身有这个权限的ggmm
        this.selected = this.resInfo.filter(el => {
          if (el.rolesIdList.indexOf(this.dotInfo.id) !== -1) {
            return true
          }
          return false
        }).map(el => el.id)
      },
      querySearch(queryString, cb) {
        var restaurants = this.resInfo
        var results = queryString ? restaurants.filter(item => {
          return item.name ? item.name.indexOf(queryString) !== -1 : false
        }) : restaurants
      // 调用 callback 返回建议列表的数据
        this.userdata = results
        cb && cb(results)
      },
      createFilter(queryString) {
        return (restaurant) => {
          return restaurant.name.indexOf(queryString) !== -1
        }
      },
      handleSelect(item) {
        this.selectInfo = item
      },
      handleIconClick(ev) {
        console.log(ev)
      },
      //
      closeMe(done) {
        this.$emit('close')
        // this.$refs['ruleForm'].resetFields()
        if (typeof done === 'function') {
          done()
        }
      },
      submitForm(formName) {
        // this.$refs[formName].validate((valid) => {
        //   if(valid){
        this.loading = true
        const data = []
        this.selected.map(el => {
          const find = this.thePerAllUserInfo.filter(e => e.id === el)
          if (find[0]) {
            const list = find[0].rolesIdList.filter(el => el !== 0)
            list.push(this.dotInfo.id)
            data.push({
              id: el,
              rolesIdList: list
            })
          }
        })
        /* data.push({
          'id': this.selectInfo.id,
          'rolesId': this.selectInfo.rolesId
        }) */
        putEmployeerAuth(data).then(res => {
          this.$message.success('保存成功')
          this.closeMe()
          this.$emit('success')
          this.loading = false
        }).catch(err => {
          this._handlerCatchMsg(err)
        })
        //   }else{
        //     return false
        //   }
        // })
      }
    }
  }
</script>
<style type="text/css" lang="scss">
  @import "./relationPer.css";

</style>

