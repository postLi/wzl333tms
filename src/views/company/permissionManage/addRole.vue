<template>

      <pop-right :title="popTitle" :isShow="popVisible" @close="closeMe" class="add-role-pop-content">
        <template class="addEmployeerPop-content" slot="content">
          <div class="add-role" >
            <el-form ref="ruleForm">
              <div class="add-role-top">
                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                  <el-form-item label="角色名称：">
                    <el-input v-model="formInline.roleName" placeholder="" clearable></el-input>
                  </el-form-item>
                  <el-form-item label="备注：">
                    <el-input type="textarea" v-model="formInline.remark" placeholder=""></el-input>
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
                  @check-change="handleCheckChange"
                  @node-click="getCheckedKeys"
                  @click="getCheckedKeys"
                >
                </el-tree>
              </div>
            </el-form>
          </div>
        </template>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
          <el-button @click="closeMe">取 消</el-button>
        </div>
      </pop-right>
    <!---->
</template>

<script>
  import popRight from '@/components/PopRight/index'
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
      dotInfo: Array
    },
    watch: {
      dotInfo (newVal) {
        if(this.isModify){
          this.form = Object.assign({}, this.dotInfo)
        }
      },
      isModify () {
        if(this.isModify){
          console.log(this.dotInfo);
          // this.form = this.dotInfo
          this.popTitle = '修改角色'
          // this.treeData = this.dotInfo
        }else{
          // this.treeData = this.dotInfo

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
          id:''
        },
        popTitle: '新增角色',
        loading: false
      }
    },
    mounted() {
      this.treeData = this.dotInfo
      console.log(this.dotInfo+'' )

      // this.creatTime = getNowFormatDate
    },
    methods: {
      closeMe(done){
        // done()
        this.$emit('close')
        this.$refs['ruleForm'].resetFields()
        if(typeof done === 'function'){
          done()
        }
      },
      submitForm(formName){
        console.log(this.formInline.roleName)
        console.log(this.$refs.tree.getCheckedNodes());
        this.$refs[formName].validate((valid) => {
          if ( valid ) {
            this.loading = true
            // postOrgSaveDate(this.form).then(res=>{
            //   console.log(res);
            //   this.$alert('保存成功', '提示', {
            //     confirmButtonText: '确定',
            //     callback: action => {
            //       this.loading = false
            //       this.closeMe()
            //       this.$emit('success')
            //     }
            //   })
            //
            // })
          } else {
            return false
          }
        })
      },
      handleCheckChange(data, checked, indeterminate) {
        console.log(data, checked, indeterminate);
      },
      getCheckedKeys() {
        console.log(this.$refs.tree)
        alert(this.$refs.tree._data.currentNode.node.data.id)
      },
      getCheckedKeys() {
        console.log(this.$refs.tree);
      },
    }
  };

</script>

<style type="text/css" lang="scss">
  @import "./addRole.css";

</style>
