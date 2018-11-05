<template>
  <el-dialog
    :title="isTitle"
    :visible.sync="isShow"
    width="40%"
    center
    @click="closeMe" :close-on-click-modal="false" :before-close="closeMe" class="sub_down_dialog">
    <div class="sub_export">
      <div class="export_content">
        <div class="clearfix uploadcard">
          <upload :title="'本地上传'" :showFileList="true" :limit="6" listtype="picture" v-model="form.name"
          />
        </div>
        <div class="export_down">

        </div>

      </div>
    </div>
    <!--<el-form status-icon size="mini" ref="ruleForm" :model="form" class="sub_form" :rules="rules">-->
      <!--<el-form-item label="科目代码" prop="name">-->
        <!--&lt;!&ndash;<el-input v-model="form.name"></el-input>&ndash;&gt;-->
        <!---->
      <!--</el-form-item>-->
      <!--<el-form-item label="科目名称" prop="name" class="">-->
        <!--<el-input v-model="form.name"></el-input>-->
      <!--</el-form-item>-->
      <!--<span class="sub_span">注：1.导入前，需要先下载标准模板。按照标准模板填写后再上传。</span>-->
      <!--<span class="sub_span">2.每次最多能导入1000条，超过1000条，只导入前1000条。</span>-->
    <!--</el-form>-->
    <span slot="footer" class="dialog-footer">
    <el-button size="mini" @click="closeMe">取 消</el-button>
    <el-button size="mini" type="primary" @click="submitForm">确 定</el-button>
  </span>
  </el-dialog>
</template>

<script>
  import Upload from '@/components/Upload/singleImage2'
  export default {
    components:{
      Upload
    },
    props: {
      isShow: {
        type: Boolean,
        default: false
      },

    },
    watch: {
    },
    data() {
      return {
        isTitle: '导入模板',
        form: {
          name: '',
        },
        rules: {
          name: [
            {required: true}
          ]
        }
        // isShow: false
      };
    },
    mounted() {
      // console.log(this.isShow, 'isShow')
    },
    methods: {
      submitForm() {
        this.closeMe()
      },
      closeMe(done) {
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
  .sub_down_dialog {

    .el-dialog {
      margin-top: 30vh !important;
      /*width: 20% !important;*/
    }
    .el-dialog__header {

    }
    .el-dialog__body {
      padding: 0px 20px 30px;

       .export_content{
         .sub_span {
           font-size: 14px;
           letter-spacing: 1px;
         }
         .uploadcard {
           /*padding: 20px 20px 20px 90px;*/
           //上传图片
           .el-upload-list--picture-card .el-upload-list__item {
             width: 234px;
             height: 136px;
           }
           .el-upload-dragger {
             width: 232px;
           }
           .el-upload--picture-card {
             width: 234px;
             height: 134px;
             line-height: 30px;
           }
           .upload__tip {
             line-height: 30px;
           }
           .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
             margin-top: 8px;
           }
           //上传图片end
           .uploadlist {
             width: 100%;
             margin-left: 80px;
             li {
               float: left;
               width: 100px;
               margin-right: 10px;
             }
           }
         }
       }

    }
    .el-dialog__footer {

    }
  }
</style>
