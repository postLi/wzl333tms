<template>
    <div class="box_container_2" :class="{'hideuploadbtn': (filelist.length >= limit) || disabled}">
      <el-upload
        class="image-uploader"
        drag
        :data="upload"
        :action="uploadUrl"
        :multiple="false"
        list-type="picture-card"
        :show-file-list="showFileList"
        :file-list="filelist"
        :limit="limit"
        :disabled="disabled"
        :before-upload="beforeUpload"
        :on-preview="handlePictureCardPreview"
        :on-error="handleError"
        :on-exceed="onexceed"
        :on-success="handleImageScucess"
        :http-request="handleUpload"
        :on-remove="handleRemove">

        <!-- <i class="el-icon-upload"></i> -->
        <!-- <el-button :size="size" type="primary" style="">点击上传</el-button> -->
        <!-- <div class="el-upload__text clearfix"><span class="fl">将文件拖拽至此区域上传</span><em class="fl">点击上传</em></div> -->
        <!-- <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div> -->
        <!-- <div class="el-upload__text" style="font-size:4px">将文本拖拽到此区域或,<em>点击上传</em></div> -->
        <!-- <i class="el-icon-plus"></i> -->
        <slot name="content">
          <el-button :size="size" type="primary" class="button" :disabled="disabled">点击上传</el-button>
          <div class="el-upload__text">将文件拖拽到此区域</div>
          <div v-if="tip" class="upload__tip">{{ tip }}</div>

        </slot>
      </el-upload>
      <el-dialog custom-class="singleimage2" :visible.sync="dialogVisible" :append-to-body="true">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
    </div>
</template>

<script>
import '@/vendor/lrz.all.bundle.js'

// 上传接口
import { getUploadPolicy } from '@/api/common'
import { parseTime } from '@/utils/'
import fetch from '@/utils/fetch'

export default {
  name: 'singleImageUpload',
  props: {
    value: [String, Array],
    title: {
      type: String,
      default: ''
    },
    tip: {
      type: String,
      default: '（jpg/png。小于5M）'
    },
    size: {
      type: String,
      default: 'mini'
    },
    'showFileList': {
      type: Boolean,
      default: false
    },
    limit: {
      type: Number,
      default: 10
    },
    listtype: {
      type: String,
      default: 'picture',
      enum: ['text', 'picture', 'picture-card']
    },
    disabled: {
      type: Boolean,
      default: false
    },
    // 隐藏文字
    hidBut: {
      type: Boolean,
      default: false
    },
    showBut: {
      type: Boolean
      // default: false
    }
  },
  computed: {
    imageUrl() {
      return this.value
    }
  },
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      tempUrl: '',
      dataObj: { token: '', key: '' },
      // 上传参数文档
      // https://help.aliyun.com/document_detail/31988.html
      upload: {
        'key': '', // 文件名称
        'policy': '',
        'OSSAccessKeyId': '',
        'success_action_status': '201', // 让服务端返回200,不然，默认会返回204;201会返回xml格式
        // 'callback': 'callbackbody',
        'signature': ''
      },
      uploadUrl: '',
      dir: '',
      filelist: []
    }
  },
  watch: {
    value: {
      handler(newVal) {
        if (this.showFileList) {
          let arr = Array.isArray(newVal) ? newVal : newVal ? newVal.split(',') : []
          arr = arr.filter(el => el)
          this.filelist = arr.map(el => {
            const obj = {}
            obj.url = el
            return obj
          })
        }
      },
      immediate: true
    },
    hidBut() {

    },
    disabled() {

    }
  },
  mounted() {
    // this.init()
  },
  methods: {
    init() {
        // 从后台获取policy
      return getUploadPolicy().then(data => {
        this.upload.OSSAccessKeyId = data.accessid
        this.upload.policy = data.policy
        this.upload.signature = data.signature
        this.uploadUrl = data.host
        this.dir = data.dir
        // this.upload.key = data.dir + this.random_string() + type
      }).catch(err => {
        this._handlerCatchMsg(err)
      })
    },
    rmImage() {
      this.emitInput('')
    },
    // 超出上传数量
    onexceed(file, filelist) {
      this.$message.error(`最多上传 ${this.limit} 张!`)
    },
    // 删除列表
    handleRemove(file, fileList) {
      console.log('handleRemove:', file, fileList)
      this.filelist = fileList
      this.emitInput()
    },
    // 保存上传
    handleUpload(options) {
      return new Promise((resolve, reject) => {
        // options.file
        // 只处理jpg图片
        
        var name = options.file.name;
      name = !name ? Math.random()+'.jpg' : name;
      // 表单域 file 必须为最后一个表单域；
      var type = name.match(/([^\.]+)$/);
      type = type ? '.' + type[1] : ''

      let fn = (file)=>{
        const form = new FormData()
          const url = this.uploadUrl

          form.append('key', this.upload.key)
          form.append('success_action_status', '201')
          form.append('OSSAccessKeyId', this.upload.OSSAccessKeyId)
          form.append('policy', this.upload.policy)
          form.append('signature', this.upload.signature)
          form.append('file', file)

          fetch.post(url, form, {
            headers: { 'Content-Type': 'multipart/form-data' }
          }).then(xml => {
            resolve(xml)
          }).catch(err => {
            reject(err)
            this._handlerCatchMsg(err, '上传失败:')
          })
      }

      if(/\.jpe?g/.test(type)){
        lrz(options.file, {
          width: 1024
        }).then(rst => {
          fn(rst.file)
        }).catch(err => {
          reject(err)
          this._handlerCatchMsg(err, '上传失败：')
        })
      } else {
          fn(options.file)
      }

        
      })
    },
    // 设置随机的文件名
    random_string(len) {
      len = len || 32
      var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
      var maxPos = chars.length
      var pwd = ''
      for (var i = 0; i < len; i++) {
        pwd += chars.charAt(Math.floor(Math.random() * maxPos))
      }
      return pwd
    },
    emitInput(val) {
      if (val) {
        this.filelist.push({
          url: val
        })
      }

      this.$emit('input', this.showFileList ? this.filelist.map(el => {
        return el.url
      }).join(',') : val)
    },
    handleImageScucess(xml) {
      let url = ''
      if (xml.indexOf('Location') !== -1) {
        url = xml.match(/<Location>([^<]+)<\/Location>/m)
        url = url ? url[1] : ''
      }
      this.emitInput(url)
      // this.imageUrl = url
    },
    handleError(err) {
      this.$emit('error', err)
    },
    beforeUpload(file) {
      const isJPG = /image\/\w+/.test(file.type) && /(jpe?g|png)/i.test(file.type)
      const isLt5M = file.size / 1024 / 1024 < 5
      let type = file.name.match(/([^\.]+)$/)
      type = type ? '.' + type[1] : ''

      return new Promise((resolve, reject) => {
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG/PNG 格式!')
          reject(false)
        } else if (!isLt5M) {
          this.$message.error('上传头像图片大小不能超过 5MB!')
          reject(false)
        } else {
          // 上传前统一取一下凭证
          this.init().then(res => {
            // 设置文件名
            this.upload.key = this.dir + parseTime(new Date(), '{y}{m}{d}') + '/' + this.random_string() + type
            // setTimeout(() => {
            resolve(true)
            // }, 10 * 1000)
          })
          .catch(err => {
            this._handlerCatchMsg(err)
            resolve(false)
          })
        }
      })
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    }
  }
}
</script>
<style lang="scss">
.uploadlist{
    display: inline-block;
    width: auto !important;
    height: auto;

    .el-upload {
        width: auto;

        .el-button{
            margin-top: 20px;
        }
    }
}
.hideuploadbtn{
  .el-upload.el-upload--picture-card{
    // display: none;
  }
}
</style>

<style lang="scss">
    @import "src/styles/mixin.scss";
    .singleimage2{
      margin-top: 10vh !important;
      width: 40% !important;
    }
    .box_container_2 {
        width: 100%;
        position: relative;
        @include clearfix;

        .el-upload-list__item{
          transition: none;
        }

        .el-upload .el-upload-dragger{
            height: 132px;
        }
        .image-uploader {
            width: 100%;
            height: 100%;
        }
        .image-preview {
            width: 100%;
            height: 100%;
            position: absolute;
            background-color:#fff;
            top:0;
            left:0;
            .image-preview-wrapper {
                position: relative;
                width: 100%;
                height: 100%;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .image-preview-action {
                position: absolute;
                width: 100%;
                height: 100%;
                left: 0;
                top: 0;
                cursor: default;
                text-align: center;
                color: #fff;
                opacity: 0;
                font-size: 20px;
                background-color: rgba(0, 0, 0, .5);
                transition: opacity .3s;
                cursor: pointer;
                text-align: center;
                line-height: 200px;
                .el-icon-delete {
                    font-size: 36px;
                }
            }
            &:hover {
                .image-preview-action {
                    opacity: 1;
                }
            }
        }
        .el-button{
            margin-top: 24px;
            // float:left;
        }
        .el-upload__text{
            margin-top: 10px;
            margin-bottom: 5px;
            font-size: 12px;
            line-height:30px;
        }
        .upload__tip{
            font-size:12px;
            line-height:30px;
            color:#999;
        }
        .upload__title{
            font-size:13px;
            color:#666;
            margin-top:14px;
        }
        .el-upload--picture-card{
          line-height:43px;
        }
        // .upload__tip{
        //   line-height:43px;
        // }
    }

</style>
