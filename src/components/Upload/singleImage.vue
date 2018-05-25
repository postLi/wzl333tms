<template>
    <div class="upload-container">
        <el-upload v-if="uploadUrl" class="image-uploader" :data="upload" :before-upload="beforeUpload" drag :multiple="false" :show-file-list="false" :action="uploadUrl"
            :on-success="handleImageScucess">
            <slot name="content">
                <div v-if="title" class="upload__title">{{ title }}</div>
                <el-button :size="size" type="primary">点击上传</el-button>
                <div class="el-upload__text">将文件拖拽到此区域</div>
                <div v-if="tip" class="upload__tip">{{ tip }}</div>
            </slot>
        </el-upload>
        <div class="image-preview"  v-if="imageUrl">
            <div class="image-preview-wrapper">
                <img :src="imageUrl">
                <div class="image-preview-action">
                    <i @click="rmImage" class="el-icon-delete"></i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// 上传接口
import { getUploadPolicy } from '@/api/common'
import fetch from '@/utils/fetch'

export default {
  name: 'singleImageUpload',
  props: {
    value: String,
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
    }
  },
  computed: {
    imageUrl() {
      return this.value
    }
  },
  data() {
    return {
      tempUrl: '',
      dataObj: { token: '', key: '' },
      // 上传参数文档
      // https://help.aliyun.com/document_detail/31988.html
      upload: {
        'key': '', // 文件名称
        'policy': '',
        'OSSAccessKeyId': '',
        'success_action_status': '201', //让服务端返回200,不然，默认会返回204;201会返回xml格式
        //'callback': 'callbackbody',
        'signature': ''
      },
      uploadUrl: '',
      dir: ''
    }
  },
  mounted () {
    this.init()  
  },
  methods: {
    init(){
        // 从后台获取policy
        getUploadPolicy().then(data => {
            this.upload.OSSAccessKeyId = data.accessid
            this.upload.policy = data.policy
            this.upload.signature = data.signature
            this.uploadUrl = data.host
            this.dir = data.dir
            this.upload.key = data.dir + this.random_string() + type
        }).catch(err => {
        })
    },
    rmImage() {
      this.emitInput('')
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
      this.$emit('input', val)
    },
    handleImageScucess(xml) {
        let url = ''
        if(xml.indexOf('Location') !== -1){
            url = xml.match(/<Location>([^<]+)<\/Location>/m)
            url = url ? url[1] : ''
        }
      this.emitInput(url)
      //this.imageUrl = url
    },
    beforeUpload(file) {
      const _self = this
      const isJPG = /image\/\w+/.test(file.type) && /(jpeg|jpg|png)/i.test(file.type)
      const isLt5M = file.size / 1024 / 1024 < 5
      let type = file.name.match(/([^\.]+)$/)
      type = type ? '.' + type[1] : ''

      return new Promise((resolve, reject) => {
        if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG/PNG 格式!')
            reject(false)
        }else if (!isLt5M) {
            this.$message.error('上传头像图片大小不能超过 5MB!')
            reject(false)
        } else {
            // 设置文件名
            this.upload.key = this.dir + this.random_string() + type
            resolve(true)
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    @import "src/styles/mixin.scss";
    .upload-container {
        width: 100%;
        position: relative;
        @include clearfix;

        .el-upload .el-upload-dragger{
            height: 116px;
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
        }
        .el-upload__text{
            margin-top: 10px;
            margin-bottom: 5px;
            font-size: 12px;
        }
        .upload__tip{
            font-size:12px;
            color:#999;
        }
        .upload__title{
            font-size:13px;
            color:#666;
            margin-top:14px;
        }
    }

</style>
