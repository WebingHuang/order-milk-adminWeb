<template>
  <a-modal
    :title="title"
    :visible="visible"
    :maskClosable="false"
    :confirmLoading="confirmLoading"
    :width="1000"
    :footer="null"
    @cancel="cancelHandel"
  >
    <a-row>
      <a-col :xs="24" :md="12" :style="{ height: '350px' }">
        <vue-cropper
          ref="cropper"
          key="0"
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
          @realTime="realTime"
        >
        </vue-cropper>
      </a-col>

      <!-- 右边截图区域 -->
      <a-col :xs="24" :md="12" :style="{ height: '400px' }">
        <div class="avatar-upload-preview">
          <img :src="previews.url" :style="previews.img" />
        </div>
      </a-col>

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
import { filesCompany } from '@/api/company'
export default {
  name: 'HeadCut',
  data() {
    return {
      title: '',
      visible: false,
      id: null,
      confirmLoading: false,
      uploading: false,
      // logo
      options: {
        img: '',
        autoCrop: true,
        autoCropWidth: 400,
        autoCropHeight: 300,
        fixedBox: false,
        fixed: false,
        fixedNumber: [7, 7],
        canScale: true,
        centerBox: true,
      },
      previews: {},
      previewVisible: false,
      cover: '',
    }
  },
  methods: {
    edit(id) {
      this.id = id
      this.visible = true
      if (id == 1) {
        this.title = '上传Logo'
      } else {
        this.title = '上传营业执照'
      }
    },
    close() {
      this.id = null
      this.visible = false
      this.options.img = ''
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
        this.options.img = reader.result
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
          formData.append('type', 5)
          return filesCompany(formData).then((res) => {
            // _this.options.img = res.data[0]
            _this.$message.success('上传成功')
            _this.$emit('ok', 1, res.data[0])
            _this.visible = false
          })
        })
      } else {
        this.$refs.cropper.getCropData((data) => {
          this.model = true
          this.modelSrc = data
        })
      }
    },
    realTime(data) {
    //  this.options = {
    //     div: {
    //       height: '300px',
    //       width: '400px',
    //     },
    //     html: `<divclass="show-preview"style="width: 400px; height: 300px,; overflow: hidden"><divstyle="width: 400px; height: 300px"><imgsrc=blob:http://localhost:8000/0b33dd5b-b5e0-46b5-b724-5fa05b445806style="width: 500px; height: 374px; transform:           scale(0.9358288770053476)translate3d(-41.674285714285716px, -43.81142857142857px, 0px)rotateZ(0deg)"></div></div>`,
    //     img: {
    //       height: '374px',
    //       width: '500px',
    //       transform:
    //         'scale(0.9358288770053476)translate3d(-41.674285714285716px, -43.81142857142857px, 0px)rotateZ(0deg)',
    //     },
    //     url: 'blob:http://localhost:8000/0b33dd5b-b5e0-46b5-b724-5fa05b445806',
    //     h: 300,
    //     w: 400,
    //   }
      this.previews = data
    },
  },
}
</script>

<style lang="less" scoped>
.avatar-upload-preview {
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
  width: 80%;
  height: 60%;
  // border-radius: 50%;
  box-shadow: 0 0 4px #ccc;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
  }
}
</style>
