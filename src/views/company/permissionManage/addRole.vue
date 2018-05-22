<template>

      <pop-right :title="popTitle" :isShow="popVisible" @close="closeMe" class="add-role-pop-content">
        <template class="addEmployeerPop-content" slot="content">
          <div class="add-role" >
            <el-form ref="ruleForm">
              <div class="add-role-top">
                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                  <el-form-item label="角色名称：">
                    <el-input v-model="formInline.user" placeholder=""></el-input>
                  </el-form-item>
                  <el-form-item label="备注：">
                    <el-input type="textarea" v-model="formInline.user" placeholder=""></el-input>
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
                  :props="defaultProps">
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
        this.form = Object.assign({}, this.dotInfo)
      },
      isModify (newVal) {
        if(newVal){
          this.popTitle = '修改网点'
          this.form = Object.assign({}, this.dotInfo)
        } else {
          this.popTitle = '新增网点'
          for(let i in this.form){
            this.form[i] = ''
          }
          if(this.form.id){
            delete  this.form.id
          }
          this.form.orgType = 1
          this.form.status = 32
          this.form.manageType = 3
          this.form.parentId = this.dotInfo.parentId
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
          user: '',
          region: ''
        },
        popTitle: '新增角色',
        //多选框
        checked: true,
        loading: false,
        dialogVisible: false
      }
    },
    mounted() {
      this.treeData = this.dotInfo
      console.log(this.dotInfo)
      console.log(this.isModify);
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
      }
    }
  };

</script>

<style type="text/css" lang="scss">
  @import "addRole.css";

</style>
