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
                      v-model="inputInfo.roleName"
                      clearable>
                    </el-input>
                  </td>
                    <el-autocomplete
                      popper-class="my-autocomplete"
                      v-model="state3"
                      :fetch-suggestions="querySearch"
                      placeholder="请输入内容"
                      @select="handleSelect">
                      <i
                        class="el-icon-edit el-input__icon"
                        slot="suffix"
                        @click="handleIconClick">
                      </i>
                      <template slot-scope="{ item }">
                        <div class="name">{{ item.value }}</div>
                        <span class="addr">{{ item.address }}</span>
                      </template>
                    </el-autocomplete>
                  <td>
                    <el-input
                      placeholder=""
                      v-model="inputInfo.roleName"
                      disabled >
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
            <!--<div class="hiddenDiv">-->
              <!--<ul>-->
                <!--<li>1111111</li>-->
                <!--<li>222222222</li>-->
              <!--</ul>-->
            <!--</div>-->
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
      thePerAllUserInfo: [Object,Array],
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
        this.inputInfo = this.dotInfo
        // this.form = Object.assign({}, this.dotInfo)
      },
      thePerAllUserInfo (newVal) {
        this.resInfo = this.thePerAllUserInfo
        console.log(this.thePerAllUserInfo);
        // this.form = Object.assign({}, this.dotInfo)
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
        inputInfo: {
          roleName:''
        },
        //下拉
        restaurants: [],
        state3: '',
        resInfo:[
          {
            name:'',
            mobilephone:''
          }
        ],
        //
        options4: [],
        value9: [],
        list: [],
        loading: false,
        popTitle: '关联员工',
        loading: false,
        dialogVisible: 'false'
      }
    },
    mounted(){

      this.restaurants = this.loadAll();
      // this.restaurants = this.resInfo;
      // this.list = this.states.map(item => {
      //   return { value: item, label: item };
      // });
    },
    methods: {
      theper(){

      },
      loadAll() {
        return [
          { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
          { "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" }
          ]
      },
      querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect(item) {
        console.log(item);
      },
      handleIconClick(ev) {
        console.log(ev);
      },
      //
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

