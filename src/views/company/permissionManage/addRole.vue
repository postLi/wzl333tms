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
                  :data="data2"
                  show-checkbox
                  default-expand-all
                  node-key="id"
                  ref="tree"
                  highlight-current
                  :props="defaultProps">
                </el-tree>
                <div class="buttons">
                  <el-button @click="getCheckedNodes">通过 node 获取</el-button>
                  <el-button @click="getCheckedKeys">通过 key 获取</el-button>
                  <el-button @click="setCheckedNodes">通过 node 设置</el-button>
                  <el-button @click="setCheckedKeys">通过 key 设置</el-button>
                  <el-button @click="resetChecked">清空</el-button>
                </div>
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
        type:Boolean,
        default:false
      },
      isModify: {
        type:Boolean,
        default:false
      },
      dotInfo: Object
    },
    watch: {
      isModify () {
        if(this.isModify){
          console.log(this.isModify);
          this.form = this.dotInfo
          this.popTitle = '修改网点'
        }else{
          console.log(this.isModify);
          this.popTitle = '新增网点'
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
        data2: [{
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-166',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2',
              children: [{
                id: 4,
                label: '二级 1-15',
                children: [{
                  id: 9,
                  label: '三级 1-1-1'
                }, {
                  id: 10,
                  label: '三级 1-1-2',
                  children: [{
                    id: 4,
                    label: '二级 1-1',
                    children: [{
                      id: 9,
                      label: '三级 1-1-1'
                    }, {
                      id: 10,
                      label: '三级 1-1-2'
                    }]
                  }]
                }]
              }]
            }]
          }]
          ,
          children: [{
            id: 4,
            label: '二级 1-11',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2',
              children: [{
                id: 4,
                label: '二级 1-1',
                children: [{
                  id: 9,
                  label: '三级 1-1-1'
                }, {
                  id: 10,
                  label: '三级 1-1-2'
                }]
              }]
            }]
          }],
          children: [{
            id: 4,
            label: '1二级 1-11',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2',
              children: [{
                id: 4,
                label: '二级 1-1',
                children: [{
                  id: 9,
                  label: '三级 1-1-1'
                }, {
                  id: 10,
                  label: '三级 1-1-2'
                }]
              }]
            }]
          }],
          children: [{
            id: 4,
            label: '4级 1-11',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2',
              children: [{
                id: 4,
                label: '二级 1-1',
                children: [{
                  id: 9,
                  label: '三级 1-1-1'
                }, {
                  id: 10,
                  label: '三级 1-1-2'
                }]
              }]
            }]
          }],
          children: [{
            id: 4,
            label: '二级 1-11',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2',
              children: [{
                id: 4,
                label: '二级 1-1',
                children: [{
                  id: 9,
                  label: '三级 1-1-1'
                }, {
                  id: 10,
                  label: '三级 1-1-2'
                }]
              }]
            }]
          }],

        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
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
    mounted(){
      // this.creatTime = getNowFormatDate
    },
    methods: {
      getCheckedNodes() {
        console.log(this.$refs.tree.getCheckedNodes());
      },
      getCheckedKeys() {
        console.log(this.$refs.tree.getCheckedKeys());
      },
      setCheckedNodes() {
        this.$refs.tree.setCheckedNodes([{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 9,
          label: '三级 1-1-1'
        }]);
      },
      setCheckedKeys() {
        this.$refs.tree.setCheckedKeys([3]);
      },
      resetChecked() {
        this.$refs.tree.setCheckedKeys([]);
      },
      closeMe(done){
        done()
        // this.$emit('close')
        // this.$refs['ruleForm'].resetFields()
        // if(typeof done === 'function'){
        //   done()


        //   console.log(9999);
        // }
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
