<template>
  <div class="personal-wrapper" v-loading="loading">
    <div class="personal-btn" @click="openDialog">
      <img :src="personalIcon">
      <span>个性化设置</span>
    </div>
    <el-dialog
      title="个性化设置"
      :visible.sync="dialogVisible"
      append-to-body 
      width="600px"
      :close-on-click-modal="false"
      :before-close="closeMe">
      <div class="personal-content">
        <el-form :model="formModel" :rules="rules" :size="btnsize" ref="formModel" label-width="90px">
          <el-form-item label="字体大小:" prop="name">
              <el-radio-group v-model="formModel.fontSize" size="mini">
                <el-radio-button v-for="item in fontSizes" :key="item.value" :label="item.value"><span :style="{'font-size': item.value + 'px'}">{{item.label}}</span></el-radio-button>
              </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button :size="btnsize" @click="dialogVisible = false">取 消</el-button>
        <el-button  :size="btnsize" type="primary" @click="onSubmit()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { objectMerge2 } from '@/utils/'
import { findAllByUserId, updateByUserId } from '@/api/common'
export default {
  data() {
    return {
      btnsize: 'mini',
      formModel: {
        fontSize: '18'
      },
      loading: false,
      dialogVisible: false,
      personalIcon: require('../../../assets/personal.png'),
      rules: {},
      fontSizes: [{
        label: '超小',
        value: '12'
      }, {
        label: '常规',
        value: '14'
      }, {
        label: '较大',
        value: '16'
      }, {
        label: '最大',
        value: '18'
      }]
    }
  },
  created() {
    this.initTheme()
  },
  methods: {
    initTheme() {
      // 获取系统个性化设置
      return findAllByUserId().then(data => {
        if (data) {
          this.formModel = data
          console.log('获取系统个性化设置', this.formModel)
          this.setTheme()
        }
      })
       .catch(err => {
         this._handlerCatchMsg(err)
         this.setTheme()
       })
    },
    setTheme() {
      const formModel = objectMerge2({}, this.formModel)
          // 如果没有选择就显示缺省值
      for (const i in formModel) {
        formModel[i] = formModel[i] === '' ? this.$options.data().formModel[i] : formModel[i]
      }
      const body = document.body
      // let themeName = 'tms_theme_default'
      let themeName = ''
      switch (formModel.fontSize) {
        case '12': //  '超小'
          themeName = 'tms_theme_mini'
          break
        case '14'://  '常规'
          themeName = ''
          break
        case '16': // '较大'
          themeName = 'tms_theme_medium'
          break
        case '18': // '最大'
          themeName = 'tms_theme_large'
          break
        default: themeName = 'tms_theme_large'
          break
      }
      // 设置全局样式
      body.setAttribute('class', themeName)
      console.log('body', body, body.style.fontSize)
    },
    onSubmit() {
      this.$refs.formModel.validate((valid) => {
        if (valid) {
          this.loading = true
          const formModel = objectMerge2({}, this.formModel)
          const data = []
          for (const item in formModel) {
            if (item !== 'userId') {
              const obj = {
                fieldName: item,
                fieldVal: formModel[item]
              }
              data.push(obj)
            }
          }
          updateByUserId(data).then(data => {
            this.loading = false
            this.$message.success('修改成功')
            this.setTheme()
          })
          .catch(err => {
            this._handlerCatchMsg(err)
          })
          // 设置全局样式
          this.setTheme()
          this.closeMe()
        }
      })
    },
    openDialog() {
      this.dialogVisible = true
    },
    closeMe() {
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="scss">
@import '../../../styles/element-variables.scss';
body {
  @include golbal_font_size($tms_theme_default);
}
.personal-wrapper {
  padding: 15px 5px;
  .personal-content {

  }
  .personal-btn {
    // background-color: rgba(64, 158, 255, 0.7);
    background-color: #E6A23C;
    color: #fff;
    text-align: center;
    border-radius: 30px;
    cursor: pointer;
    font-size: 12px;
    &:hover{
      background-color: #42485B;
    }
    img {
      padding: 0;
      margin: 0;
      width: 28px;
      height: 28px;
      vertical-align: middle;
    }
  }
}
</style>
