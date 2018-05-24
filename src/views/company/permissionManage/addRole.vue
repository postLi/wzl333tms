<template>

      <pop-right :title="popTitle" :isShow="popVisible" @close="closeMe" class="add-role-pop-content" v-loading="loading">
        <template class="addEmployeerPop-content" slot="content">
          <div class="add-role" >
            <el-form ref="ruleForm">
              <div class="add-role-top">
                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                  <el-form-item label="角色名称：">
                    <el-input v-model="formInline.roleName" placeholder="" clearable></el-input>
                  </el-form-item>
                  <el-form-item label="备注：">
                    <el-input
                      type="textarea"
                      v-model="formInline.remark"
                      placeholder=""
                      >
                      <!--:autosize="{ minRows: 2}"-->
                    </el-input>
                  </el-form-item>

                </el-form>
              </div>
              <div class="add-role-tree">
                <el-tree
                  :data="treeData"
                  show-checkbox
                  default-expand-all
                  node-key="id"
                  ref="tree"
                  highlight-current
                  :props="defaultProps"
                >
                </el-tree>
              </div>
            </el-form>
          </div>
        </template>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="getCheckedNodes()">保存</el-button>
          <el-button @click="closeMe">取 消</el-button>
        </div>
      </pop-right>
    <!---->
</template>

<script>
  import popRight from '@/components/PopRight/index'
  import { postRoleInfo,putRoleInfo} from '../../../api/company/permissionManage'
  export default {
    components: {
      popRight
    },
    props: {
      popVisible: {
        type: Boolean,
        default:false
      },
      isModify: {
        type: Boolean,
        default:false
      },
      dotInfo: Array,
      theUser: Object,
      createrId: [Number,String]
    },
    watch: {
      dotInfo (newVal) {
        this.treeData = this.dotInfo
      },
      theUser (newVal) {
        if(this.isModify) {
          this.formInline = this.theUser
          this.formInline.menusId = [3,4]
          this.$refs.tree.setCheckedKeys(this.formInline.menusId)
          console.log('this.theUser',this.theUser)
        }
      },
      isModify () {
        if(this.isModify){
          this.formInline = this.theUser
          this.popTitle = '修改角色'
        }else{
          this.formInline = {
            roleName: '',
            remark: '',
            menusId: [],
            createrId : this.createrId
          }
          this.popTitle = '新增角色'
        }
      }
    },
    computed: {
      isShow: {
        get(){
          return this.popVisible
        },
        set(){

        }
      }
    },
    data() {
      return {
        treeData: [],
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        formInline: {
          roleName: '',
          remark: '',
          menusId: [],
          createrId : this.createrId
        },
        popTitle: '新增角色',
        loading: false
      }
    },
    mounted() {
      this.treeData = this.dotInfo
    },
    methods: {
      closeMe(done){
        this.$emit('close')
        this.$refs['ruleForm'].resetFields()
        if(typeof done === 'function'){
          done()
        }
      },
      getCheckedNodes() {
        this.loading = true
        let getNodeId = this.$refs.tree.getCheckedNodes()
        let promiseObj
        this.formInline.menusId = getNodeId.map(el => {
          return el.id
        })
        let data = Object.assign({},this.formInline)
        if(this.isModify){
          promiseObj = putRoleInfo(data)
        }else{
          promiseObj = postRoleInfo(data)
        }
        promiseObj.then(res => {
          this.loading = false
          this.$alert('操作成功', '提示', {
            confirmButtonText: '确定',
            callback: action => {
              this.closeMe()
              this.$emit('success')
            }
          });
        }).catch(err => {
          this.loading = false
        })
      }
    }
  };

</script>

<style type="text/css" lang="scss">
  @import "./addRole.css";

</style>
