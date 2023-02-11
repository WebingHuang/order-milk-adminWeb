<template>
   <a-modal
      title="修改头像"
      :visible="visible"
      :maskClosable="false"
      :confirmLoading="confirmLoading"
      :width="800"
      :footer="null"
      @cancel="cancelHandel"
   >
      <a-row>
         <a-col :xs="24" :md="12" :style="{ height: '350px' }">
            <vue-cropper
               ref="cropper"
               :img="options.img"
               :info="true"
               :autoCrop="options.autoCrop"
               :autoCropWidth="options.autoCropWidth"
               :autoCropHeight="options.autoCropHeight"
               :fixedBox="options.fixedBox"
               :mode="options.mode"
               @realTime="realTime"
            >
            </vue-cropper>
         </a-col>
         <a-col :xs="24" :md="12" :style="{ height: '350px' }">
            <div :class="id==1?'avatar-upload-radius avatar-upload-preview':'avatar-upload-preview' ">
               <img :src="previews.url" :style="previews.img"/>
            </div>
         </a-col>
      </a-row> 
      <br />
      <a-row>
         <a-col :lg="2" :md="2">
            <a-upload name="file" :beforeUpload="beforeUpload" :showUploadList="false">
               <a-button icon="upload">选择图片</a-button>
            </a-upload>
         </a-col>
         <a-col :lg="{ span: 1, offset: 2 }" :md="2">
            <a-button icon="plus" @click="changeScale(1)" />
         </a-col>
         <a-col :lg="{ span: 1, offset: 1 }" :md="2">
            <a-button icon="minus" @click="changeScale(-1)" />
         </a-col>
         <a-col :lg="{ span: 1, offset: 1 }" :md="2">
            <a-button icon="undo" @click="rotateLeft" />
         </a-col>
         <a-col :lg="{ span: 1, offset: 1 }" :md="2">
            <a-button icon="redo" @click="rotateRight" />
         </a-col>
         <a-col :lg="{ span: 2, offset: 6 }" :md="2">
            <a-button type="primary" @click="finish('blob')">保存</a-button>
         </a-col>
      </a-row>
   </a-modal>
</template>
<script>
import { getUploadImgUrl } from '@/api/system'
export default {
   name: 'userModal',

   data() {
      return {
         visible: false,
         id: null,
         confirmLoading: false,
         fileList: [],
         uploading: false,
         options: {
            img: this.$store.getters.userInfo.userInfo.photoSrc, // 默认回显为当前用户的头像
            autoCrop: true,
            autoCropWidth: 180,
            autoCropHeight: 180,
            fixedBox: true,
            mode: 'contain',
         },
         previews: {},
      }
   },
   methods: {
      edit(id, photoSrc) {
         this.visible = true
         this.id = id
        // 选择图片回显
         this.options.img = photoSrc
         //adfafdaghaljkhfdkpahihgfpiahpodhfpoahdfpoh;o 点击+号
         /* 获取原始头像 */
      },
      close() {
         this.id = null
         this.visible = false
      },
      cancelHandel() {
         this.close()
      },
      changeScale(num) {
         num = num || 1
         this.$refs.cropper.changeScale(num)
      },
      rotateLeft() {
         this.$refs.cropper.rotateLeft()
      },
      rotateRight() {
         this.$refs.cropper.rotateRight()
      },
      beforeUpload(file) {
         const reader = new FileReader()
         // 把Array Buffer转化为blob 如果是base64不需要
         // 转化为base64
         reader.readAsDataURL(file)
         reader.onload = () => {
            this.options.img = reader.result // 点击头像的裁切回显
         }
         // 转化为blob
         // reader.readAsArrayBuffer(file)

         return false
      },

      // 上传图片（点击上传按钮）
      finish(type) {
         console.log('finish')
         const _this = this
         const formData = new FormData()
         // 输出
         if (type === 'blob') {
            this.$refs.cropper.getCropBlob((data) => {
               const img = window.URL.createObjectURL(data)
               this.model = true
               this.modelSrc = img

               const fileData = new File([data], 'image' + '.jpeg')
               formData.append('files', fileData)
               formData.append('type', 1)

               // 转化图片接口,将图片转化为线上地址
               return getUploadImgUrl(formData).then((res) => {
                  // _this.options.img = res.data[0] // 裁切图片前的回显 如果在这赋值会导致裁剪框异常 应112行赋值
                  _this.$message.success('上传成功')
                  _this.$emit('ok', res.data[0]) // 修改后的图片传给父组件
                  _this.visible = false
                  this.cropper_show = false

                  console.log(_this.options)
               })
            })
         } else {
            this.$refs.cropper.getCropData((data) => {
               this.model = true
               this.modelSrc = data
            })
         }
      },
      okHandel() {
         const vm = this

         vm.confirmLoading = true
         setTimeout(() => {
            vm.confirmLoading = false
            vm.close()
            vm.$message.success('上传头像成功')
         }, 2000)
      },

      realTime(data) {
         this.previews = data
      },
   },
}
</script>

<style lang="less" scoped>
.avatar-upload-radius{
  border-radius: 50%;
}
.avatar-upload-preview {
   position: absolute;
   top: 50%;
   transform: translate(50%, -50%);
   width: 180px;
   height: 180px;
   box-shadow: 0 0 4px #ccc;
   overflow: hidden;

   img {
      width: 100%;
      height: 100%;
   }
}
</style>
