<template>
  <el-dialog
    :title="isTitle"
    :visible.sync="isShow"
    width="30%"
    center
    @click="closeMe" :close-on-click-modal="false" :before-close="closeMe" class="sub_dialog" v-loading="loading">
    <el-form size="mini" ref="ruleForm" :model="form" class="" :rules="rules" v-if="isAddLE">
      <div v-if="isDoAddEnd">
        <el-form-item label="科目代码:" class="sub_el_form_item">
          <span>{{currentForm.subjectCode}}</span>
        </el-form-item>
        <el-form-item label="上级科目:" class="sub_el_form_item">
          <span>{{currentForm.subjectName }}</span>
        </el-form-item>
        <el-form-item label="科目代码" prop='subjectCode' class="sub_subjectCode">
          <el-input v-model="form.subjectCode" :maxlength="2" v-numberOnly>
            <template slot="prepend">{{currentForm.subjectCode}}</template>
          </el-input>
        </el-form-item>
        <el-form-item label="科目名称" prop='subjectName' label-width="72px" class="info_item">
          <el-input v-model="form.subjectName" :maxlength="15"></el-input>
        </el-form-item>
      </div>
      <div v-if="!isDoAddEnd">
        <el-form-item label="科目代码" prop='subjectCode' label-width="98px" class="info_item">
          <el-input v-model="form.subjectCode" v-numberOnly :maxlength="isFNum">
            <template slot="prepend" v-if="isSubjectLevel > 1">{{currentForm.subjectCode}}</template>

          </el-input>
        </el-form-item>
        <el-form-item label="科目名称" prop='subjectName' label-width="98px" class="info_item">
          <el-input v-model="form.subjectName" :maxlength="15"></el-input>
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
      <span class="sub_span">注：科目代码规则：1.最多可创建4级科目，一级科目代码数值：4位，二级6位，三级6位，四级8位。</span>
    </el-form>

    <el-form size="mini" ref="ruleForm" :model="form" class="direct" :rules="rules"
             label-width="80px" v-else-if="isDirect" width="100%" :show-message="checkShowMessage">
      <el-form-item label="核销方向" prop="verificationWay">
        <el-input v-model.trim="form.verificationWay" placeholder="请输入核销方向如：工商银行" :minlength="1"
                  :maxlength="35"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input type="textarea" v-model="form.remark" placeholder="最多输入50个字符。" :maxlength='50'></el-input>
      </el-form-item>
    </el-form>

    <el-form size="mini" ref="ruleForm" :model="form" class="sub_close" :rules="rules" v-else>
      <el-form-item label="核销科目">
        <el-input v-model="form.subjectsFeeType" disabled></el-input>
      </el-form-item>
      <el-form-item label="一级科目">

        <el-select v-model="form.oneName" placeholder="请选择" @change="changelist">
          <el-option
            v-for="item in closeOptions.oneOptions"
            :key="item.id"
            :label="item.subjectName"
            :value="item.id"
            @>
          </el-option>
        </el-select>

      </el-form-item>
      <el-form-item label="二级科目" class="">
        <el-select v-model="form.twoName" placeholder="请选择" @change="changelist">
          <el-option
            v-for="item in closeOptions.twoOptions"
            :key="item.id"
            :label="item.subjectName"
            :value="item.id"
            @>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级科目" class="">
        <el-select v-model="form.threeName" placeholder="请选择" @change="changelist">
          <el-option
            v-for="item in closeOptions.threeOptions"
            :key="item.id"
            :label="item.subjectName"
            :value="item.id"
            @>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="四级科目" class="">
        <el-select v-model="form.fourName" placeholder="请选择" @change="changelist">
          <el-option
            v-for="item in closeOptions.forthOptions"
            :key="item.id"
            :label="item.subjectName"
            :value="item.id"
            @>
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
      info: {
        handler() {
          this.comWatch(this.info)
        },
        immediate: true
      },
      isDoAddEnd: {
        handler() {
          this.comWatch()
        },
        immediate: true
      },
      doAddStair: {
        handler() {
          this.comWatch()
        },
        immediate: true
      },
      isDoExport: {
        handler() {
          this.comWatch()
        },
        immediate: true
      },
      isSubClose: {
        handler() {

        },
        immediate: true
      },
      isDoAddSub: {
        // handler() {
        //   this.comWatch()
        // },
        // immediate: true
      },
      isDoEdit: {
        // handler() {
        //   // this.comWatch()
        // },
        // immediate: true
      },
    },
    data() {
      // const reg1 = new RegExp("^[0-9]{4}$")
      const validateSubjectCode = (rule, value, callback) => {
        if (this.isSubjectLevel === 1) {
          // this.isFNum = 4
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
        // console.log(this.info, 'infommm')
      }
      const validateSubName = (rule, value, callback) => {
        if (/^[a-zA-Z\u4e00-\u9fa5]+$/.test(value)) {
          // if (REGEX.CHINESE_AND_ENGLISH.test(value)) {
          callback()
        } else {
          callback(new Error('只能输入中文和字母'))
        }
      }
      return {
        labelWidth: '98px',
        isFNum: 4,
        checkShowMessage: false,
        isSubject: true,
        loading: true,
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
          oneOptions: {},
          twoOptions: {},
          threeOptions: {},
          forthOptions: {}
        },
        form: {
          name: '',
          verificationWay: '',//核销方向
          remark: '',//核销方向
          subjectsFeeType: '',   //  核销科目
          oneName: '',
          twoName: '',
          threeName: '',
          fourName: '',//  核销科目
          subjectCode: '',//  自定义
          subjectName: '',
          subjectType: '',

          //  自定义

        },
        rules: {
          name: [
            {required: true}
          ],
          verificationWay: [
            {required: true, message: '核销方向不能为空~'}
          ],
          subjectCode: [
            {required: true, message: '科目代码不能为空~',},
            // { min: 4, max: 4, message: '一级科目代码只能4位数字4555' },
            {validator: validateSubjectCode}
          ],
          subjectName: [
            {required: true, message: '科目名称不能为空~'},
            // {message: '只能输入中文加字母~', pattern: REGEX.CHINESE_AND_ENGLISH}
            {validator: validateSubName}
          ],
          subjectType: [
            {required: true, message: '财务科目类型不能为空~'}
          ]
        },
        isAddLE: false,
        isDirect: false,
        isFirst: false,
        // subjectDirection: false
      };
    },
    mounted() {
    },
    methods: {
      changelist(item) {
        console.log(item)
        // this.comSelectList(item, 1)
      },
      // comSelectList(id, type) {
      //   getSelectList(id, type).then(data => {
      //     console.log(data)
      //   })
      // },
      comWatch(item) {
        if (this.$refs['ruleForm']) {
          this.$refs['ruleForm'].resetFields()
        }
        this.checkShowMessage = false
        this.isAddLE = false
        this.isDirect = false

        if (this.isDoAddEnd) {
          this.isTitle = '增加下级'
          this.isAddLE = true
          this.currentForm.subjectCode = item.subjectCode
          this.currentForm.subjectName = item.subjectName
          console.log(item,'item1111')

          // this.form.subjectCode = item.subjectCode
          // this.form.subjectName = item.subjectName
        }
        else if (this.doAddStair) {
          this.isTitle = '增加一级'
          this.isAddLE = true
          this.currentForm.subjectCode = item.parent.subjectCode
          this.isSubjectLevel = item.subjectLevel
          if (this.isSubjectLevel > 1) {
            this.isFNum = 2
          } else {
            this.isFNum = item.subjectLevel * 2 + 2
          }

          // if(this.is)
          // this.form.subjectCode = item.subjectCode
          // this.form.subjectName = item.subjectName
          // console.log(this.isSubjectLevel, 'item')
        }
        else if (this.isDoExport) {
          this.isTitle = '导入模板'
        }
        else if (this.isSubClose) {
          // this.isTitle = '修改'
          // this.form.subjectsFeeType = item.subjectsFeeType
          // this.form.oneName = item.oneName
          // this.form.twoName = item.twoName
          // this.form.threeName = item.threeName
          // this.form.fourName = item.fourName
          // this.closeIds.oneId = item.oneId || ''
          // this.closeIds.twoId = item.twoId || ''
          // this.closeIds.threeId = item.threeId || ''
          // this.closeIds.fourId = item.fourId || ''
          // Promise.all([getSelectList(this.closeIds.oneId, 2), getSelectList(this.closeIds.twoId, 3), getSelectList(this.closeIds.threeId, 4), getSelectList(this.closeIds.fourId, 5)]).then((resArr, index) => {
          //   // console.log(resArr,'666');
          //   this.closeOptions.oneOptions = resArr[0].data
          //   this.closeOptions.twoOptions = resArr[1].data
          //   this.closeOptions.threeOptions = resArr[2].data
          //   this.closeOptions.forthOptions = resArr[3].data
          //
          //   // this.loading = false
          //   // this.licenseTypes = resArr[1]
          // }).catch(err => {
          //   this._handlerCatchMsg(err)
          //   this.loading = false
          // })
          // putFinSubCloseInfo(item.id).then(data => {
          //   console.log(data);
          // }).catch(err => {
          //   this._handlerCatchMsg(err)
          //   this.loading = false
          // })
          this.fetchFinSubCloseInfo(item.id)
        }
        else if (this.isDoAddSub) {
          this.isTitle = '新增'
          this.isDirect = true
          this.reset()
        }
        else if (this.isDoEdit) {
          this.isTitle = '修改'
          this.isDirect = true
          this.form.verificationWay = item.verificationWay
          this.form.remark = item.remark
          // console.log(this.form,'修改')
          // this.reset()
          // console.log(this.info,'selectInfo')
        }

      },
      fetchFinSubCloseInfo(id) {
        getFinSubCloseInfo(id).then(res => {
          console.log(res)
          this.form.subjectsFeeType = res.po.subjectsFeeType
          this.form.oneName = res.po.oneName
          this.form.twoName = res.po.twoName
          this.form.threeName = res.po.threeName
          this.form.fourName = res.po.fourName
          this.closeOptions.oneOptions = res.po.oneLevel
          Promise.all([getSelectList(res.po.oneId, 2), getSelectList(res.po.twoId, 3), getSelectList(res.po.threeId, 4), getSelectList(res.po.fourId, 5)]).then((resArr, index) => {
            console.log(resArr,'Promise.all');

            this.closeOptions.twoOptions = resArr[1].data
            this.closeOptions.threeOptions = resArr[2].data
            this.closeOptions.forthOptions = resArr[3].data

            // this.loading = false
            // this.licenseTypes = resArr[1]
          }).catch(err => {
            this._handlerCatchMsg(err)
            this.loading = false
          })
        }).catch(err => {
          this._handlerCatchMsg(err)
          this.loading = false
        })
      },
      submitForm(ruleForm) {
        this.$refs[ruleForm].validate((valid) => {
          // this.checkShowMessage = true
          if (valid) {
            let promiseObj
            this.loading = true
            delete this.form.name

            const data = objectMerge2({}, this.form)
            if (this.isDoAddSub) {
              promiseObj = postAddFinFicationl(data)
            }
            else if (this.isDoEdit) {
              promiseObj = putExtFinFicationl(this.info.id, data)
            } else if (this.isSubClose) {
              delete this.form.verificationWay
              delete this.form.remark

              // fourName: null
              // oneName: "主营业务收入"
              // subjectCode: ""
              // subjectName: ""
              // subjectType: ""
              // subjectsFeeType: "现付"
              // threeName: null
              // twoName: "现付"
              console.log(this.form, 'isSubClose');
              // promiseObj = putFinanceEdit(this.info.id, data)
              // delete this.form.closeIds
            } else if (this.doAddStair) {
              delete data.verificationWay
              delete data.remark
              delete data.subjectsFeeType
              delete data.oneName
              delete data.twoName
              delete data.threeName
              delete data.fourName
              // console.log(data, 'data');
              if (this.isSubjectLevel > 1) {
                data.subjectCode = this.currentForm.subjectCode + this.form.subjectCode
              }
              promiseObj = postAddLevel(this.info.id, data)
            } else if (this.isDoAddEnd) {
              delete data.verificationWay
              delete data.remark
              delete data.subjectsFeeType
              delete data.oneName
              delete data.twoName
              delete data.threeName
              delete data.fourName
              delete data.subjectType
              data.subjectCode = this.currentForm.subjectCode + this.form.subjectCode

              // debugger
              promiseObj = postAddNextLevel(this.info.id, data)
            }
            promiseObj.then(res => {
              this.$emit('success')
              this.$message.success('保存成功')
              this.closeMe()
              this.reset()
              this.loading = false
            }).catch(err => {
              this.loading = false
              this._handlerCatchMsg(err)
            })
          } else {
            return false
          }
        })

      },
      // resetForm(formName) {
      //   this.$refs[formName].resetFields()
      // },
      reset() {
        this.form = {
          verificationWay: '',//核销方向
          remark: '',//核销方向
          subjectsFeeType: '',   //  核销科目
          oneName: '',
          twoName: '',
          threeName: '',
          fourName: '',//  核销科目
          subjectCode: '',//  自定义
          subjectName: '',
          subjectType: '',
        }
      },
      closeMe(done) {
        // this.reset()
        // this.resetForm('ruleForm')
        this.$emit('update:isShow', false)
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
            .el-input__inner {
              width: 109%;
            }
            .el-input-group {
              .el-input-group__prepend {
                padding: 0 4px;
              }
              .el-input__inner {
                width: 88% !important;
              }
            }
          }
        }
        .sub_el_form_item {
          display: inline-flex;
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
              }
              .el-input__inner {
                width: 82% !important;
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
            width: 110%;
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
