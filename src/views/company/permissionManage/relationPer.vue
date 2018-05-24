<template>
  <div class="relation-per" v-loading="loading">
  <pop-right :title='popTitle' :isShow="popRelatVisible" @close="closeMe" class='addRelationPop'>
    <template class='addRelationPop-content' slot="content">
          <el-form  ref="formName"  class="demo-ruleForm" :inline="true" label-position="right" size="mini">
            <table>
              <thead>
              <tr>
                <th>角色</th>
                <th>员工</th>
                <th>手机号码</th>
              </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <el-input
                      placeholder="请输入内容"
                      v-model="input10"
                      clearable>
                    </el-input>
                  </td>
                  <el-select
                    v-model="value9"
                    multiple
                    filterable
                    remote
                    reserve-keyword
                    placeholder="请输入关键词"
                    :remote-method="remoteMethod"
                    :loading="loading">
                    <el-option
                      v-for="item in options4"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                  <td>
                    <el-input
                      placeholder=""
                      v-model="input10"
                      clearable>
                    </el-input>
                  </td>
                </tr>
              <!--<tr v-for="(user) in myusers" :key="user.username">-->
                <!--<td>-->
                  <!--{{user.name}}-->
                <!--</td>-->
                <!--<td>-->
                  <!--<el-select size="mini" multiple v-model="form.users[user.id]" placeholder="请选择权限" @change="getId(user.id)">-->
                    <!--<el-option v-for="item in roles" :key="item.id" :label="item.roleName" :value="item.id"></el-option>-->
                  <!--</el-select>-->
                <!--</td>-->
              <!--</tr>-->
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
  import { postOrgSaveDate} from '../../../api/company/groupManage'
  import popRight from '@/components/PopRight/index'
  import SelectTree from '@/components/selectTree/index'
  import SelectCity from '@/components/selectCity/index'
  import {REGEX ,isvalidUsername} from '../../../utils/validate'
  import { getAllOrgInfo } from '../../../api/company/employeeManage'

  export default {
    components: {
      popRight,
      SelectTree,
      SelectCity
    },
    props: {
      popRelatVisible: {
        type:Boolean,
        default:false
      },
      isModify: {
        type:Boolean,
        default:false
      },
      dotInfo: Object,
      orgid: {
        type: Number
      }
    },
    computed: {
      isShow: {
        get(){
          return this.popRelatVisible
        },
        set(){

        }
      }
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
    data() {
      return {
        //输入框
        input10: '',
        //下拉
        options4: [],
        value9: [],
        list: [],
        loading: false,
        states: ["Alabama", "Wyoming"],
        myusers:{
          name:'调度角色',
        },
        popTitle: '关联员工',
        loading: false,
        dialogVisible: 'false'
      }
    },
    mounted(){
      // console.log(this.isModify);
      this.list = this.states.map(item => {
        return { value: item, label: item };
      });
    },
    methods: {
      remoteMethod(query) {
        if (query !== '') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.options4 = this.list.filter(item => {
              return item.label.toLowerCase()
                .indexOf(query.toLowerCase()) > -1;
            });
          }, 200);
        } else {
          this.options4 = [];
        }
      },
      closeMe(done){
        this.$emit('close')
        this.$refs['ruleForm'].resetFields()
        if(typeof done === 'function'){
          done()
        }
      },
      submitForm(formName){
        this.$refs[formName].validate((valid) => {
          if(valid){
            this.loading = true
            postOrgSaveDate(this.form).then(res=>{
              this.$alert('保存成功', '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  this.loading = false
                  this.closeMe()
                  this.$emit('success')
                }
              })

            })
          }else{
            return false
          }
        })
      }
    }
  };
</script>
<style type="text/css" lang="scss">
  @import "./relationPer.css";

</style>

