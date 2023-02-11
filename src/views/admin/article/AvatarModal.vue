<template>
  <a-modal
    title="上传封面"
    :visible="visible"
    :maskClosable="false"
    :confirmLoading="confirmLoading"
    :width="1000"
    :footer="null"
    @cancel="cancelHandel"
  >
    <a-row>
      <a-col :xs="24" :md="12" :style="{ width:'450px' , height: '350px' }">
        <vue-cropper
          ref="cropper"
          :img="options.img"
          :info="true"
          :autoCrop="options.autoCrop"
          :autoCropWidth="options.autoCropWidth"
          :autoCropHeight="options.autoCropHeight"
          :fixedBox="options.fixedBox"
          :canScale="options.canScale"
          :fixed="options.fixed"
          :fixedNumber="options.fixedNumber"
          :centerBox="options.centerBox"
          :canMoveBox="options.canMoveBox"
          :canMove="options.canMove"
          :full="options.full"
          @realTime="realTime"
          v-show="cropper_show"
        >
        </vue-cropper>
      </a-col>
      <a-col :xs="24" :md="12" :style="{ height: '400px' }">
        <div class="avatar-upload-preview">
          <!-- :style="previews.img" -->
          <img :src="previews.url" :style="previews.img" @click="editCropper"/>
        </div>
      </a-col>
    </a-row>
    <br />
    <a-row>
      <a-col :lg="2" :md="2">
        <a-upload name="file" :beforeUpload="beforeUpload" :showUploadList="false" :data="{ type: 4 }">
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
import { uploadFiles } from '@/api/article'
export default {
  data() {
    return {
      cropper_show: false,
      visible: false,
      id: null,
      confirmLoading: false,
      uploading: false,
      options: {
        img: '',
        autoCrop: true,
        autoCropWidth: 400,
        autoCropHeight: 300,
        fixedBox: false,
        fixed: true,
        fixedNumber: [4, 3],
        canScale: true,
        centerBox: true,
        canMoveBox: false,
        canMove: true,
        full: true
      },
      previews: {},
      previewVisible: false,

      cover: '',
    }
  },
  props: ["msg"],
  methods: {
    edit(id) {
      this.visible = true
      this.id = id
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
      this.cropper_show = true  // to do 
      const reader = new FileReader()
      // 把Array Buffer转化为blob 如果是base64不需要
      // 转化为base64
      const _this = this;
      reader.readAsDataURL(file)
      reader.onload = () => {
        _this.options.img = reader.result
      }
      if (_this.options.img) {
        _this.options.img = ''
      }
      // 转化为blob
      // reader.readAsArrayBuffer(file)

      return false
    },

    // 上传图片（点击上传按钮）
    finish(type) {
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
          formData.append('type', 4)
          return uploadFiles(formData).then((res) => {
            // _this.options.img = res.data[0]
            _this.$message.success('上传成功')
            _this.$emit('ok', res.data[0])
            _this.visible = false
            this.cropper_show = false
          })
        })
        // } else {
        //   this.$refs.cropper.getCropData((data) => {
        //     this.model = true
        //     this.modelSrc = data
        //   })
      }
    },
    // okHandel() {
    //   const vm = this
    //   vm.confirmLoading = true
    //   setTimeout(() => {
    //     vm.confirmLoading = false
    //     vm.close()
    //     vm.$message.success('上传头像成功')
    //   }, 2000)
    // },

    realTime(data) {
      this.previews = data
    },

    editCropper () {
      this.cropper_show = true;
    }
  },
  beforeUpdate () {
    this.cropper_show = this.msg;
  }
}
</script>

<style lang="less" scoped>
.avatar-upload-preview {
  position: absolute;
  top: 44%;
  right: 46%;
  transform: translate(50%, -50%);
  width: 357px;
  height: 268px;
  // border-radius: 50%;
  box-shadow: 0 0 4px #ccc;
  overflow: hidden;
  
}

img {
    width: 100%;
    height: 100%;
  }
</style>
