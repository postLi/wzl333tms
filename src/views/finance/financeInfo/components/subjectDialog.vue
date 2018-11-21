<template>
  <el-dialog
    :title="isTitle"
    :visible.sync="isVisibleShow"
    width="30%"
    center
    @click="closeMe"
    :close-on-click-modal="false"
    class="sub_dialog"
    v-loading="loading"
    :before-close="closeMe">
    <el-form size="mini" ref="ruleForm" :model="form" class="" :rules="rules" v-if="isDoAddEnd">
      <el-form-item label="科目代码:" class="sub_el_form_item">
        <span>{{currentForm.subjectCode}}</span>
      </el-form-item>
      <el-form-item label="上级科目:" class="sub_el_form_item">
        <span>{{currentForm.subjectName }}</span>
      </el-form-item>
      <el-form-item label="科目代码11" prop='subjectCode' class="sub_subjectCode">
        <el-input v-model="form.subjectCode" :maxlength="isFNum">
          <template slot="prepend">{{currentForm.subjectCode}}</template>
        </el-input>
      </el-form-item>
      <el-form-item label="科目名称" prop='subjectName' label-width="72px" class="info_item ">
        <el-input v-model="form.subjectName" :maxlength="15" clearable></el-input>
      </el-form-item>
      <span class="sub_span">注：科目代码规则：1.最多可创建4级科目，一级科目代码数值：4位，二级6位，三级8位，四级10位。</span>
    </el-form>

    <el-form size="mini" ref="ruleForm" :model="form" class="" :rules="rules" v-if="doAddStair">

      <div>
        <el-form-item label="科目代码" prop='newScubjectCode' label-width="98px" class="info_item">
          <el-input v-model="form.newScubjectCode" :maxlength="isFNum" class="info_input">
            <template slot="prepend" v-if="isSubjectLevelFn">{{currentForm.subjectCode}}</template>

          </el-input>
        </el-form-item>
        <el-form-item label="科目名称" prop='subjectName' label-width="98px" class="info_item">
          <el-input v-model="form.subjectName" maxlength="15" clearable></el-input>
        </el-form-item>

        <!--'财务科目类型 0 收入, 1 支出'
  -->
        <el-form-item label="财务科目类型" prop="subjectType" class="">
          <el-select v-model="form.subjectType" placeholder="请选择财务科目类型">
            <el-option label="收入" value="0"></el-option>
            <el-option label="支出" value="1"></el-option>
          </el-select>
          <!--<el-input v-model="form.subjectName"></el-input>-->
        </el-form-item>
      </div>
      <span class="sub_span">注：科目代码规则：1.最多可创建4级科目，一级科目代码数值：4位，二级6位，三级8位，四级10位。</span>
    </el-form>

    <!--<el-form size="mini" ref="ruleForm" :model="form" class="direct"-->
    <!--label-width="80px" v-if="false" width="100%">-->
    <!--<el-form-item label="核销方向" prop="verificationWay" :rules="[{ required: true, message: '核销方向不能为空'}]">-->
    <!--<el-input v-model.trim="form.verificationWay" placeholder="请输入核销方向如：工商银行" :minlength="1"-->
    <!--:maxlength="35"></el-input>-->
    <!--</el-form-item>-->
    <!--<el-form-item label="备注">-->
    <!--<el-input type="textarea" v-model="form.remark" placeholder="最多输入50个字符。" :maxlength='50'></el-input>-->
    <!--</el-form-item>-->
    <!--</el-form>-->

    <el-form size="mini" ref="ruleForm" :model="form" class="sub_close" :rules="rules" v-if="isSubClose">
      <el-form-item label="核销科目">
        <el-input v-model="form.subjectsFeeType" disabled></el-input>
      </el-form-item>
      <el-form-item label="一级科目">

        <el-select v-model="form.oneName" placeholder="请选择" @change="changeSelctListO">

          <el-option
            v-for="(item,index) in closeOptions.oneOptions"
            :key="item.id"
            :label="item.subjectName"
            :value="item.subjectName"
          >
          </el-option>
        </el-select>

      </el-form-item>
      <el-form-item label="二级科目" class="">
        <el-select v-model="form.twoName" placeholder="请选择" @change="changeSelctListTwO1">
          <el-option
            v-for="item in closeOptions.twoOptions"
            :key="item.id"
            :label="item.subjectName"
            :value="item.subjectName"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级科目" class="">
        <el-select v-model="form.threeName" placeholder="请选择" @change="changeSelctListThree1">
          <el-option
            v-for="item in closeOptions.threeOptions"
            :key="item.id"
            :label="item.subjectName"
            :value="item.subjectName"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="四级科目" class="">
        <el-select v-model="form.fourName" placeholder="请选择" @change="changeSelctListFour1">
          <el-option
            v-for="item in closeOptions.forthOptions"
            :key="item.id"
            :label="item.subjectName"
            :value="item.subjectName"
          >
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">

    <el-button size="mini" type="primary" @click="submitForm('ruleForm')">保 存</el-button>
      <el-button size="mini" @click="closeMe">取 消</el-button>
  </span>
  </el-dialog>
</template>

<script>
  import {
    postAddFinFicationl,
    putExtFinFicationl,
    getSelectList,
    postAddLevel,
    postAddNextLevel,
    getFinSubCloseInfo,
    putFinanceEdit
  } from '@/api/finance/finanInfo'

  import {mapGetters} from 'vuex'
  import {objectMerge2} from '@/utils/index'
  import {REGEX} from '@/utils/validate'
  import SelectType from '@/components/selectType/index'

  export default {
    components: {
      SelectType,
    },
    computed: {
      ...mapGetters([
        'otherinfo'
      ]),
      isVisibleShow: {
        get() {
          return this.isShow
        },
        set() {
        }
      }
    },
    props: {
      isShow: {
        type: Boolean,
        default: false
      },
      isDoAddEnd: {
        type: Boolean,
        default: false
      },
      doAddStair: {
        type: Boolean,
        default: false
      },
      isDoExport: {
        type: Boolean,
        default: false
      },
      isSubClose: {
        type: Boolean,
        default: false
      },
      isDoAddSub: {
        type: Boolean,
        default: false
      },
      isDoEdit: {
        type: Boolean,
        default: false
      },
      // doAddStair
      info: {
        type: [Array, Object],
        default: () => {
        }
      },
    },
    watch: {
      // isShow(n) {
      //
      // },
      info: {
        handler() {
          this.comWatch(this.info)
        },
        immediate: true
      },
      // isDoAddEnd(n) {
      //   if (n) {
      //     this.comWatch(this.info)
      //   }
      // },
      isDoAddEnd: {
        handler(n, o) {
          this.comWatch(this.info)
        },
        immediate: true
      },
      // doAddStair(n,o) {
      //   if (n) {
      //     this.comWatch(this.info)
      //   } else {
      //     // return
      //     this.checkShowMessage = false
      //   }
      // },
      doAddStair: {
        handler(n, o) {
          if (n === true) {
            this.comWatch(this.info)

          } else {
            this.comWatch(this.info)
            // debugger
          }

        },
        // immediate: true
        deep: true
      },
      isDoExport: {
        handler() {
          this.comWatch(this.info)
        },
        immediate: true
      },
      isSubClose: {
        handler() {
          // this.comWatch(this.info)
        },
        immediate: true
      },
      isDoAddSub: {

        handler(n) {
        },
        immediate: true,
        deep: true
      },
      isDoEdit: {
        handler() {
          // this.comWatch(this.info)
        },
        immediate: true
      },
    },
    data() {
      const validateSubjectCode = (rule, value, callback) => {
        if (REGEX.ONLY_NUMBER.test(value)) {
          // callback()
          console.log(this.isSubjectLevel, 'this.isSubjectLevel');
          if (this.isSubjectLevel === 1) {
            if (/[0-9]{4}/.test(value)) {
              callback()
            } else {
              callback(new Error('只能4位数字'))
            }

          } else {
            if (/[0-9]{2}/.test(value)) {
              callback()
            } else if (/[0-9]{1}/.test(value)) {
              callback(new Error('只能2位数字'))
            } else {
              callback(new Error('只能2位数字'))
            }
          }
        } else {
          callback(new Error('只能输入数字'))
        }
      }
      // const validateSubName = (rule, value, callback) => {
      //   if (/^[a-zA-Z\u4e00-\u9fa5]+$/.test(value)) {
      //     // if (REGEX.CHINESE_AND_ENGLISH.test(value)) {
      //     callback()
      //   } else {
      //     callback(new Error('只能输入中文和字母'))
      //   }
      // }
      return {
        labelWidth: '98px',
        isFNum: 4,
        isSubjectLevelFn: false,
        checkShowMessage: false,
        isSubject: true,
        loading: false,
        isTitle: '增加一级',
        isSubjectLevel: '',
        currentForm: {
          subjectCode: '',
          subjectName: '',
        },
        closeIds: {
          oneId: '',
          twoId: '',
          threeId: '',
          fourId: ''
        },
        closeOptions: {
          oneOptions: [],
          twoOptions: [],
          threeOptions: [],
          forthOptions: []
        },
        form: {
          verificationWay: '',//核销方向
          remark: '',//核销方向
          subjectsFeeType: '',   //  核销科目
          oneId: '',
          twoId: '',
          threeId: '',
          fourId: '',
          oneName: '',
          twoName: '',
          threeName: '',
          fourName: '',//  核销科目
          subjectCode: '',//  自定义
          subjectName: '',
          subjectType: '',
          newScubjectCode: ''
          //  自定义

        },
        rules: {
          verificationWay: [
            {required: true, message: '核销方向不能为空~'}
          ],
          newScubjectCode: [
            {required: true, message: '科目代码不能为空~'},
            {validator: validateSubjectCode}
          ],
          subjectCode: [
            {required: true, message: '科目代码不能为空~'},
            {validator: validateSubjectCode}
          ],
          subjectName: [
            {required: true, message: '科目名称不能为空~'},
            // {message: '只能输入中文加字母~', pattern: REGEX.CHINESE_AND_ENGLISH}
            // {validator: validateSubName}
          ],
          subjectType: [
            {required: true, message: '财务科目类型不能为空~'}
          ]
        },
        isDirect: false,
        isFirst: false,
        // subjectDirection: false
      };
    },
    mounted() {
    },
    methods: {

      comWatch(item) {

        if (this.$refs['ruleForm']) {
          this.$refs['ruleForm'].resetFields()
        }
        this.isDirect = false

        if (this.isDoAddEnd) {
          this.isTitle = '增加下级'
          this.currentForm.subjectCode = item.subjectCode
          this.currentForm.subjectName = item.subjectName
        }
        else if (this.doAddStair) {
          this.isTitle = '增加一级'
          this.isSubjectLevel = item.subjectLevel
          if (item.parent && item.subjectLevel > 1) {
            this.isSubjectLevelFn = true
            this.currentForm.subjectCode = item.parent.subjectCode
            this.isFNum = 2
          } else {
            this.isFNum = item.subjectLevel * 2 + 2
            console.log(this.isFNum, 'isFNum');
          }
        }

        //
        // this.isTitle = '增加一级'
        // this.isAddLE = true
        // if (item.parent) {
        //   this.currentForm.subjectCode = item.parent.subjectCode
        // }
        // this.isSubjectLevel = item.subjectLevel
        // if (this.isSubjectLevel > 1) {
        //   this.isFNum = 2
        // } else {
        //   this.isFNum = item.subjectLevel * 2 + 2
        // }


        else if (this.isDoEdit) {
          this.isTitle = '修改'
          this.isDirect = true
          this.form.verificationWay = item.verificationWay
          this.form.remark = item.remark
          // console.log(item, '修改');
        }
        else if (this.isSubClose) {
          this.isTitle = '修改'
          this.getoptio1(item.id)
        } else if (this.isDoAddSub) {
          this.isTitle = '新增'
          this.isDirect = true
        }


      },
      getoptio1(id) {
        getFinSubCloseInfo(id).then(res => {
          this.form.subjectsFeeType = res.po.subjectsFeeType
          this.form.oneId = res.po.oneId
          this.form.oneName = res.po.oneName
          // this.form.oneId = res.oneLevel[0].id
          // this.form.oneName = res.oneLevel[0].subjectName
          this.closeOptions.oneOptions = res.oneLevel
          this.changeSelctListTwO(this.form.oneId)

          this.form.twoId = res.po.twoId
          this.form.twoName = res.po.twoName
          this.form.threeId = res.po.threeId
          this.form.threeName = res.po.threeName
          this.form.fourId = res.po.fourId
          this.form.fourName = res.po.fourName
        })
      },
      changeSelctListO(obj, index) {
        // this.closeOptions.oneOptions = []
        this.closeOptions.oneOptions.filter((item, index) => {
          if (item.subjectName === obj) {
            this.form.oneId = item.id
            this.form.oneName = item.subjectName
            this.changeSelctListTwO(this.form.oneId)

          }
        })
      },
      changeSelctListTwO(item) {
        getSelectList(item, 2).then((res, index) => {
          if (res === '数据库无对应记录' || '') {
            this.form.twoId = ''
            this.form.twoName = ''
            this.form.threeId = ''
            this.form.threeName = ''
            this.form.fourId = ''
            this.form.fourName = ''
            this.closeOptions.twoOptions = ''
            return false
          } else {
            this.closeOptions.twoOptions = res
            // this.form.twoId = res[0].id
            // this.form.twoName = res[0].subjectName
            this.changeSelctListThree(this.form.twoId)
          }
        })
      },
      changeSelctListTwO1(obj) {
        this.closeOptions.twoOptions.filter(item => {
          if (item.subjectName === obj) {
            this.form.twoId = item.id
            this.form.twoName = item.subjectName
            this.changeSelctListThree(this.form.twoId)
          }
        })
      },
      changeSelctListThree(item) {
        getSelectList(item, 3).then(res => {
          if (res === '数据库无对应记录' || '') {
            this.form.threeId = ''
            this.form.threeName = ''
            this.form.fourId = ''
            this.form.fourName = ''
            this.closeOptions.threeOptions = ''
            return false
          } else {
            this.closeOptions.threeOptions = res
            this.changeSelctListFour(this.form.threeId)
          }
        })
      },
      changeSelctListThree1(obj) {
        this.closeOptions.threeOptions.filter(item => {
          if (item.subjectName === obj) {
            this.form.threeId = item.id
            this.form.threeName = item.subjectName
            this.changeSelctListFour(this.form.threeId)
          }
        })
      },

      changeSelctListFour(item) {
        getSelectList(item, 4).then(res => {
          if (res === '数据库无对应记录' || '') {
            this.form.fourId = ''
            this.form.fourName = ''
            this.closeOptions.forthOptions = ''
            return false
          } else {
            this.closeOptions.forthOptions = res
          }
        })
      },
      changeSelctListFour1(obj) {
        this.closeOptions.forthOptions.filter(item => {
          if (item.subjectName === obj) {
            this.form.fourId = item.id
            this.form.fourName = item.subjectName
            // this.changeSelctListFour(this.form.fourId)
          }
        })
      },
      submitForm(ruleForm) {
        this.$refs[ruleForm].validate((valid) => {

          if (valid) {
            let promiseObj
            this.loading = true

            const data = objectMerge2({}, this.form)
            if (this.isDoAddSub) {
              this.delectFn(data)
              delete data.subjectCode
              delete data.subjectName
              delete data.subjectType
              delete data.newScubjectCode
              // this.checkShowMessage = true
              promiseObj = postAddFinFicationl(data)
            } else if (this.doAddStair) {
              this.delectFn(data)
              delete data.verificationWay
              delete data.remark
              if (this.isSubjectLevel = 1) {
                data.subjectCode = this.currentForm.subjectCode + this.form.newScubjectCode
                delete data.newScubjectCode

              }
              promiseObj = postAddLevel(this.info.id, data)
            }
            else if (this.isDoEdit) {
              this.delectFn(data)
              delete data.subjectCode
              delete data.subjectName
              delete data.subjectType
              delete data.newScubjectCode

              promiseObj = putExtFinFicationl(this.info.id, data)
            } else if (this.isSubClose) {
              delete data.verificationWay
              delete data.remark
              delete data.subjectCode
              delete data.subjectName
              delete data.subjectType
              delete data.subjectsFeeType

              promiseObj = putFinanceEdit(this.info.id, data)
            } else if (this.isDoAddEnd) {
              delete data.verificationWay
              delete data.remark
              this.delectFn(data)
              delete data.subjectType
              delete data.newScubjectCode
              data.subjectCode = this.currentForm.subjectCode + this.form.subjectCode

              promiseObj = postAddNextLevel(this.info.id, data)
            }
            promiseObj.then(res => {
              this.$emit('success')
              this.$message.success('保存成功')
              this.closeMe()
              // this.reset()
              this.loading = false
            }).catch(err => {
              this.loading = false
              this._handlerCatchMsg(err)
              return false
            })
          } else {
            return false
          }
        })

      },
      delectFn(data) {

        delete data.subjectsFeeType
        delete data.oneName
        delete data.twoName
        delete data.threeName
        delete data.fourName
        delete data.oneId
        delete data.twoId
        delete data.threeId
        delete data.fourId
      },
      reset() {
        this.$refs['ruleForm'].resetFields()
        // this.form = {}
      },
      closeMe(done) {
        if (this.isDoEdit) {
          this.form = {}
        }
        this.reset()
        this.$emit('update:isShow', false)
        this.$emit('close')
        if (typeof done === 'function') {
          done()
        }
      }
    }
  }
</script>

<style lang="scss">
  .sub_dialog {

    .el-dialog {
      margin-top: 30vh !important;
      width: 20% !important;
    }
    .el-dialog__header {
      border-bottom: 1px solid #e6e6e6;
      .el-dialog__title {
        font-size: 14px;
        font-weight: bold;
      }
    }
    .el-dialog__body {
      padding: 10px 20px 30px;
      .el-form {
        .el-form-item {
          display: flex;
        }
        .info_item {
          .el-form-item__content {
            margin-left: 0 !important;
            .info_input {
              .el-input__inner {
                width: 111%;
              }
            }

            .el-input-group {
              .el-input-group__prepend {
                padding: 0 4px;
                text-align: center;
                width: 65px;
              }
              .el-input__inner {
                width: 122px;
              }
            }
          }
        }
        .sub_el_form_item {
          display: inline-flex;
          margin-bottom: 0;
        }
        .sub_el_form_item:nth-of-type(2) {
          margin-left: 30px;
        }
        .sub_subjectCode {
          display: inline-flex;
          .el-form-item__content {
            .el-input-group {
              .el-input-group__prepend {
                padding: 0 4px;
                text-align: center;
                width: 65px;
              }
              .el-input__inner {
                width: 124px;
              }
            }
          }
        }

        .el-form-item__content {
          display: flex;
          .el-input__inner {
            height: 32px;
            line-height: 32px;
            border-radius: 0;
          }
          .el-input.el-input--mini.is-disabled {
            .el-input__inner {
              background-color: #fff;
              border-color: #dcdfe6;
              color: #606266;
            }
          }
        }

        .sub_span {
          font-size: 14px;
          letter-spacing: 1px;
          color: #606266;
        }
      }
      .direct {
        .el-form-item__content {
          margin-left: 0 !important;
          .el-input__inner {
            width: 116%;
          }
          .el-textarea__inner {
            width: 116%;
          }
        }
      }
      .sub_close {
        .el-form-item--mini:first-of-type {
          .el-input {
            width: 110%;
            .el-input__inner {
              width: 110%;
            }
          }
        }
      }

    }
    .el-dialog__footer {
      border-top: 1px solid #b6dfff;
      padding-bottom: 10px;
    }
  }
</style>
