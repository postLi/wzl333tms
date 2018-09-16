<template>
  <div class="dep-maintain">
    <PopFrame :title="popTitle" :isShow="popVisible" @close="closeMe" class='addpopDepMain' v-loading="loading">
      <template class='addRelationPop-content' slot="content">
        <div ref="ruleForm" class="depmain-div">
          <div class="depmain-content" v-if="showDate">
            <ul>
              <li :key="item.dictName" v-for="item in getMentInfo">
                <span>{{item.dictName}}</span>
              </li>
            </ul>
          </div>
          <!--添加-->
          <div class="depmain-add" v-if="hiddenAdd">
            <div class="add-fixed">
              <el-input ref="svginput"
                        v-model="dictName"
              >
              </el-input>
              <!--<input type="text" v-focus v-model="dictName" placeholder="请输入"/>-->
              <div class="addSvg">
                <span @click="addDep" class="svgSpan">
                  <icon-svg class="lll-dot-true" icon-class="lll-dot-true"></icon-svg>
                </span>
                <span @click="closeMe" class="svgSpan">
                  <icon-svg class="lll-dot-false" icon-class="lll-dot-false"></icon-svg>
                </span>
              </div>

            </div>
            <div class="depmain-list">
              <ul>
                <li :key="item.dictName" v-for="item in getMentInfo">
                  <span>{{item.dictName}}</span>
                </li>
              </ul>
            </div>
          </div>
          <!--编辑-->
          <div class="depmain-edit" v-if="hiddenEdit">
            <div class="depmain-list">
              <ul :key="theulkey">
                <li :key="index" v-for="(item, index) in getMentInfo" :class="{'showcurrent': index === currentIndex}"
                    @click="currentIndex = index">
                  <span v-once class="firstName">{{item.dictName}}</span>
                  <div class="edit-hidden">
                    <!--<input type="text" v-focus="focusIndex === index" v-model="item.dictName" />-->
                    <el-input ref="svginputEdit"
                              v-model="item.dictName"
                    >
                    </el-input>
                    <div class="addSvg">
                      <span @click="editDep(item)" class="svgSpan1">
                        <icon-svg class="lll-dot-true" icon-class="lll-dot-true"></icon-svg>
                      </span>
                      <span @click="delDep(item)" class="svgSpan2">
                        <icon-svg class="lll-dot-false" icon-class="lll-dot-false"></icon-svg>
                      </span>
                    </div>

                  </div>
                </li>
              </ul>
            </div>
          </div>


        </div>
      </template>
      <div slot="footer" class="dialog-footer-frame" v-if="showBotton">
        <el-button type="primary" @click="submitForm('ruleForm')">{{addText}}</el-button>
        <el-button @click="editMe">{{editText}}</el-button>
      </div>
      <div slot="footer" class="dialog-footer-frame" v-if="remBotton">
        <!--完成-->
        <el-button @click="closeMe">{{remText}}</el-button>
      </div>
      <div slot="footer" class="dialog-footer-frame">
        <span></span>
        <!--<el-button @click="closeMe">{{remText}}</el-button>-->
      </div>
    </PopFrame>
  </div>
</template>

<script>
  import PopFrame from '@/components/PopFrame/index'
  import {getSelectDictInfo, postDict, deletePerManage, putDict} from '../../../api/company/groupManage'

  export default {
    components: {
      PopFrame
    },
    props: {
      popVisible: {
        type: Boolean,
        default: false
      },
      dotInfo: [Object, Array],
      isDepMain: {
        type: Boolean,
        default: false
      },
      createrId: [Number, String]
    },
    directives: {
      focus: {
        // 指令的定义
        inserted: function (el) {
          el.focus()
        }
      }
    },
    data() {
      return {

        theulkey: 'theulkey',
        currentIndex: 0,
        checked1: true,
        popTitle: '部门',
        loading: true,
        getMentInfo: [
          {dictName: '', id: ''}
        ],
        // 首行
        checked: true,
        checked2: true,
        hiddenAdd: false,
        hiddenEdit: false,
        showDate: false,
        dictName: '', // 添加
        orderId: '',
        resInfo: [
          {
            dictName: ''
          }
        ],
        // 首行
        //   底部按钮
        addText: '添加',
        editText: '编辑',
        remText: '关闭',
        showBotton: false,
        remBotton: false,
        //   底部按钮

        restaurants: []
      }
    },
    computed: {
      isShow: {
        get() {
          return this.popVisible
        },
        set() {

        }
      }
    },
    watch: {
      isDepMain() {
        if (this.isDepMain) {
          this.popTitle = '部门'
          this.showBotton = true
          // this.remBotton = false
          this.hiddenAdd = false
          this.hiddenEdit = false
          this.showDate = true
        }
      },
      dotInfo(newVal) {
        // this.getMentInfo = this.dotInfo
      },
      popVisible(newVal) {
        if (this.popVisible) {
          this.getSelectDict()
        }
      },
      createrId(newVal) {

      }
    },
    mounted() {

    },
    methods: {
      editDepFun() {
        // this.editDep(item)
        // console.log()
      },
      resetValue(item, oldvalue) {
        return () => {
          item.dictName = oldvalue
        }
      },
      getSelectDict() {
        this.loading = true
        getSelectDictInfo(this.createrId).then(res => {
          this.getMentInfo = res
          this.loading = false
          this.theulkey = (Math.random() + '').substr(2)
        }).catch(err => {
          this.$message.error(err.errorInfo || err.text || '未知错误，请重试~')
        })
      },
      getAddDate() {
        this.loading = true
        return postDict(this.createrId, this.dictName).then(res => {
          this.dictName = ''
          this.loading = false
        }).catch(err => {
          this.$message.error(err.errorInfo || err.text || '未知错误，请重试~')
        })
      },
      closeMe(done) {
        if (this.popTitle === '部门') {
          this.$emit('close')
          if (typeof done === 'function') {
            done()
          }
        } else {
          this.reset()
        }
      },
      editMe() {
        this.popTitle = '编辑'
        this.remBotton = true
        this.showBotton = false
        this.hiddenAdd = false
        this.hiddenEdit = true
        this.showDate = false
        this.currentIndex = 0
        setTimeout(() => {
          this.$refs['svginputEdit'].focus()
        }, 100)
      },
      submitForm(ruleForm) {
        this.popTitle = '添加'
        // this.remBotton = true
        this.hiddenAdd = true
        this.showBotton = false
        this.hiddenEdit = false
        this.showDate = false
        setTimeout(() => {
          this.$refs['svginput'].focus()
        }, 100)
      },
      reset() {
        this.popTitle = '部门'
        this.remBotton = false
        this.showBotton = true
        this.hiddenAdd = false
        this.hiddenEdit = false
        this.showDate = true
      },
      addDep() {
        if (!this.dictName) {
          this.$message({
            message: '请输入用户名~',
            type: 'warning'
          })
          return false
        } else {
          this.loading = true
          const reqPromise = this.getAddDate()
          reqPromise.then(res => {
            this.$message({
              type: 'success',
              message: '添加成功!'
            })

            this.getSelectDict(this.createrId)
            this.closeMe()
            this.loading = false
          }).catch(err => {
            this.$message.error(err.errorInfo || err.text || '未知错误，请重试~')
          })
        }
      },
      editDep(item) {
        const id = item.id
        this.dictName = item.dictName
        if (item.orgid === 0) {
          this.$message({
            type: 'info',
            message: '系统默认部门不能修改!'
          })
          return false
        } else {
          this.loading = true
          const reqPromise = putDict(this.createrId, this.dictName, id)
          reqPromise.then(res => {
            this.$message({
              type: 'success',
              message: '修改成功!'
            })
            this.closeMe()

            this.getSelectDict()
            this.theulkey = (Math.random() + '').substr(2)
            this.loading = false
          }).catch(err => {
            this.$message.error(err.errorInfo || err.text || '未知错误，请重试~')
          })
        }
      },
      delDep(item) {
        const _id = item.id
        const deleteItem = item.dictName

        if (item.orgid === 0) {
          this.$message({
            type: 'info',
            message: '系统默认部门不能修改!'
          })
          return false
        } else {

          this.$confirm('确定要删除 ' + deleteItem + ' 部门吗？', '提示', {
            confirmButtonText: '删除',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.loading = true
            deletePerManage(_id, this.otherinfo.orgid).then(res => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.getSelectDict()
              this.theulkey = (Math.random() + '').substr(2)
              this.loading = false
            }).catch(err => {
              this.$message({
                type: 'info',
                message: err.errorInfo || err.text || '未知错误，请重试~'
              })
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
        }
      }
    }
  }
</script>

<style lang="scss">
  .dep-maintain .addpopDepMain {
    top: 29%;
    bottom: auto;
    min-width: 486px;
    max-width: 486px;

  }

  .dep-maintain .addRelationPop-content {
    padding: 20px 20px 0;
    box-sizing: border-box;
  }

  .dep-maintain .el-select .el-input__inner {
    padding-right: 15px;
  }

  .depmain-div {
    margin: 10px 0 0 10px;
  }

  /*添加*/
  /*depmain-add*/
  .add-fixed {
    position: fixed;
    background: rgba(255, 255, 255, 1);
    top: 30px;
    input {
      border-color: #e4e7ed;
      width: 350px;
      margin: 5px 20px 5px 10px;
      color: #999;
      padding: 8px 0 2px 10px;
      font-size: 14px;

    }
    .el-input{
      width: 340px;
      float: left;
    }
    .addSvg {
      display: inline-block;
      span.svgSpan {
        /*cursor: pointer;*/

        .lll-dot-true {
          font-size: 20px;
          margin: 10px 6px 1px 60px;
        }
        .lll-dot-false {
          font-size: 20px;
          margin-right: 15px;
        }
      }
    }
  }

  /*depmain-edit 编辑*/
  .depmain-edit {
    .addSvg {
      display: inline-block;
      span.svgSpan1 {

        .lll-dot-true {
          font-size: 20px;
          margin: 4px 10px 2px 50px;
          cursor: pointer;
        }

      }
      span.svgSpan2 {
        .lll-dot-false {
          font-size: 20px;
          cursor: pointer;
          margin: 3px 9px 2px 0;
          .svg-icon {
            fill: #bec4d1;
            font-size: 20px;
          }
        }
        .lll-dot-false:hover {
          /*display: block;*/
          .svg-icon {
            fill: #bec4d1;
            cursor: pointer;
          }
        }
      }
    }

  }



  .depmain-add .el-input .el-input__inner {
    height: 30px;
  }

  .depmain-add .depmain-list {
    overflow: hidden;
    ul {
      li:nth-of-type(1) {
        margin-top: 30px;
      }
    }
  }

  /*edit*/
  .depmain-edit .el-input {
    width: 340px;
    float: left;

  }

  .depmain-edit .el-input .el-input__inner {
    height: 30px;
    padding-left: 8px;
    //  border: 1px solid transparent;
  }

  /**/
  /*.depmain-edit .el-input__inner {*/
  /*-webkit-appearance: none;*/
  /*background-color: #fff;*/
  /*background-image: none;*/
  /*border-radius: 4px;*/
  /*border: 1px solid transparent;*/
  /*-webkit-box-sizing: border-box;*/
  /*box-sizing: border-box;*/
  /*color: #606266;*/
  /*display: inline-block;*/
  /*font-size: inherit;*/
  /*height: 40px;*/
  /*line-height: 40px;*/
  /*outline: 0;*/
  /*padding: 0 15px;*/
  /*-webkit-transition: border-color .2s cubic-bezier(.645, .045, .355, 1);*/
  /*transition: border-color .2s cubic-bezier(.645, .045, .355, 1);*/
  /*width: 100%;*/
  /*}*/

  .dep-maintain .depmain-edit li {
    border-bottom: 1px solid #dcdcdc;
    padding: 10px 0 10px 10px;
    color: #333;
    font-size: 14px;
    height: 35px;
    /*cursor: pointer;*/
  }

  .depmain-edit .depmain-list li .edit-hidden {
    display: none;
  }

  .depmain-edit .depmain-list .showcurrent .edit-hidden {
    display: block;
  }

  .depmain-edit .depmain-list .showcurrent .edit-hidden .el-input.is-active .el-input__inner, .depmain-edit .showcurrent .el-input__inner:focus {
    border-color: #409EFF;
  }

  /*.depmain-edit .showcurrent:focus .dep-img img:nth-of-type(1){*/
  /*display: block;*/
  /*}*/
  .dep-img img:nth-of-type(1) {

  }

  .depmain-edit .depmain-list li span.firstName {
    display: block;
  }

  .depmain-edit .depmain-list .showcurrent span.firstName {
    display: none
  }

  .depmain-edit .depmain-list .edit-hidden {
    position: relative;
    top: -8px;
    left: -9px;;
  }

  .dep-maintain .depmain-edit .depmain-list li:focus {
    // background: #0a84ff;
  }

  .depmain-edit .el-input.is-active .el-input__inner, .el-input__inner:focus {

  }

  /*dep-img*/

  .depmain-add .add-fixed .dep-img, .depmain-edit .dep-img {
    display: inline-block;
    width: 26px;
    height: 26px;
  }

  .depmain-add .add-fixed .dep-img img, .depmain-edit .dep-img img {
    width: 100%;
    height: 100%;
  }

  .depmain-add .add-fixed .dep-img img:nth-of-type(1), .depmain-edit .dep-img img:nth-of-type(1) {
    position: relative;
    top: 2px;
    left: 12px;
    width: 26px;
    height: 25px;
    cursor: pointer;
    display: none;
  }

  .depmain-add .add-fixed .dep-img img:nth-of-type(2), .depmain-edit .dep-img img:nth-of-type(2) {
    position: relative;
    top: -26px;
    left: 45px;
    width: 23px;
    height: 23px;
    cursor: pointer;
    /*display: none;*/
  }

  .depmain-edit .showcurrent .dep-img img:nth-of-type(1) {
    display: block;
  }

  /*dep-img*/

  .depmain-edit .dep-img img:nth-of-type(2) {
    top: -25px;
  }

  /*首行头部*/
  .dep-maintain .depmain-content li {
    border-bottom: 1px solid #dcdcdc;
    padding: 10px 0 10px 10px;
    color: #333;
    font-size: 14px;

  }

  .dep-maintain .depmain-add li {
    border-bottom: 1px solid #dcdcdc;
    padding: 10px 0 10px 10px;
    color: #333;
    font-size: 14px;
    height: 35px;;
  }


</style>
