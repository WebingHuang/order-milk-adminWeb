<template>
   <div id="shopedit">
      <page-header-wrapper>
         <!-- 新增店铺 -->
         <!-- PageHeader 第二种使用方式 (v-slot) -->
         <template v-slot:content> 新建店铺信息 </template>
         <a-card :bordered="false">
            <a-steps class="steps" :current="currentTab">
               <a-step title="填写店铺信息" />
               <a-step title="确认店铺信息" />
               <a-step title="完成" />
            </a-steps>
            <div>
               <!-- 初始数据 -->
               <a-form style="max-width: 500px; margin: 40px auto 0" v-if="isHide && isHidea == 0">
                  <a-form-model :model="shopForm" :label-col="labelCol" :wrapper-col="wrapperCol" ref="foda" :rules="rules">
                     <a-form-model-item label="店铺名称" prop="storeName">
                        <a-input v-model="shopForm.storeName" />
                     </a-form-model-item>

                      <a-form-model-item label="上传营业执照" >

                         <a-upload
                          name="avatar"
                          list-type="picture-card"
                          class="avatar-uploader"
                          :show-upload-list="false"
                          action="/"
                          :before-upload="beforeUpload"
                           @change="handleChange"
                        >
                          <img v-if="shopForm.img" :src="shopForm.img" alt="avatar" />
                          <div v-else>
                            <a-icon :type="loading ? 'loading' : 'plus'" />
                            <div class="ant-upload-text">
                              点击上传
                            </div>
                          </div>
                        </a-upload>

                      </a-form-model-item>






                     <!-- <a-form-model-item label="描述">
                        <a-input v-model="foda.description" />
                     </a-form-model-item> -->
                  </a-form-model>
                  <a-form-item :wrapperCol="{ span: 19, offset: 5 }">
                     <a-button type="primary" @click="nextStep">下一步</a-button>
                  </a-form-item>
               </a-form>
               <!-- 点击下一步以后展示的数据 -->
               <a-form style="max-width: 500px; margin: 40px auto 0" v-if="!isHide && isHidea == 1">
                  <a-form-model :label-col="labelCol" :wrapper-col="wrapperCol" ref="foda" :model="foda">
                     <a-form-model-item label="店铺名称">
                        {{ shopForm.storeName }}
                     </a-form-model-item>

                     <a-form-model-item label="营业执照" >


                         <a-upload
                          name="avatar"
                          list-type="picture-card"
                          class="avatar-uploader"
                          :show-upload-list="false"
                          action="/"
                          :before-upload="beforeUpload"
                           @change="handleChange"
                        >
                          <img v-if="shopForm.img" :src="shopForm.img" alt="avatar" />
                          <div v-else>
                            <!-- <a-icon :type="loading ? 'loading' : 'plus'" /> -->
                            <div class="ant-upload-text">
                              Upload
                            </div>
                          </div>
                        </a-upload>

                      </a-form-model-item>

                  </a-form-model>
                  <a-form-item :wrapperCol="{ span: 19, offset: 5 }">
                     <a-button type="primary" @click="nextStepa">下一步</a-button>
                     <a-button style="margin-left: 8px" @click="prevStep">上一步</a-button>
                  </a-form-item>
               </a-form>
               <!-- 完成以后显示的数据 -->
               <a-form style="max-width: 500px; margin: 40px auto 0" v-if="isHide && isHidea == 2">
                  <a-result title="添加成功" :is-success="true" style="max-width: 560px; margin: 40px auto 0">
                     <a-form-model :label-col="labelCol" :wrapper-col="wrapperCol" ref="foda" :model="foda">
                        <a-form-model-item label="店铺名称">
                           {{ shopForm.storeName }}
                        </a-form-model-item>
                        <a-form-model-item label="营业执照" >


                         <a-upload
                          name="avatar"
                          list-type="picture-card"
                          class="avatar-uploader"
                          :show-upload-list="false"
                          action="/"
                          :before-upload="beforeUpload"
                           @change="handleChange"
                        >
                          <img v-if="shopForm.img" :src="shopForm.img" alt="avatar" />
                          <div v-else>
                            <!-- <a-icon :type="loading ? 'loading' : 'plus'" /> -->
                            <div class="ant-upload-text">
                              Upload
                            </div>
                          </div>
                        </a-upload>

                      </a-form-model-item>





                     </a-form-model>
                     <a-form-item :wrapperCol="{ span: 19, offset: 5 }">
                        <a-button type="primary" @click="finish">已完成,点我返回</a-button>
                     </a-form-item>
                  </a-result>
               </a-form>
            </div>
            <div class="step-form-style-desc">
               <!-- <h3>说明</h3>
               <h4>转账到支付宝账户</h4>
               <p>
                  如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。
               </p> -->
            </div>
         </a-card>
      </page-header-wrapper>
   </div>
</template>

<script>
// 引入新建接口
// import HeadCut from './HeadCut'
// import HeadCut1 from './HeadCut'

// 增删改查接口
import { addShop } from '@/api/shop'
import { uploadFiles } from '@/api/system'


function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}



export default {
   name: 'shopedit',
   components: {
      // HeadCut,
      // HeadCut1,
   },
   data() {
      return {
         loading:false,
         LogoandLicense: false,
         preview: false,
         preview1: false,
         // 店铺类型
         typeShop: [
            { type: '线上', id: 1 },
            { type: '线下', id: 2 },
         ],
         type: '',
         // 店铺类型下拉
         size: 'default',
         // 储存图片的数组
         fileList: [],
         fileList2: [],
         previewVisible: false,
         previewVisible2: false,
         previewImage: '',
         previewImage2: '',
         foda: {
            shopName: '', // 店铺名称
            shopType: '', // 店铺类型
            userId: '', // 用户ID
            logo: '', // 店铺LOGO
            manageType: '', //经营类型
            description: '', // 店铺介绍
            companyId: '', // 公司ID
            address: '', // 店铺地址
            type: 8,
         },

         //店铺表单
         shopForm:{
           storeName:"",
           img:"",

         },
         // 数据显示状态
         isHide: true,
         isHidea: 0,
         complete: false,
         labelCol: { lg: { span: 5 }, sm: { span: 5 } },
         wrapperCol: { lg: { span: 19 }, sm: { span: 19 } },
         currentTab: 0,
         // form
         form: null,
         // 表单验证
         rules: {
            storeName: [
               { required: true, message: '请输入店铺名称' },
               { whitespace: true, message: '不能添加空格' },
               { pattern: /^[\u4e00-\u9fa5]{0,}$/, message: '输入有误' },
               { max: 20, message: '最大10个字符' },
               { min: 2, message: '最小2个字符' },
            ],
         },
      }
   },
   methods: {

      handleChange(info){

         const formData = new FormData()

          formData.append('files', info.file)

          return uploadFiles(formData)
          .then((res) => {
            console.log(res)
            if(res.code == 200){

              this.$message.success('上传成功')
              // _this.visible = false;
            }

          })


      },

      beforeUpload(file) {

         const reader = new FileReader();
         // 把Array Buffer转化为blob 如果是base64不需要
         // 转化为base64
         reader.readAsDataURL(file)
         reader.onload = () => {
            // console.log(reader)
            this.shopForm.img = reader.result // 点击头像的裁切回显

         }

         return false
      },




      setavatar(id, url) {
         this.foda.logo = url
         this.preview = true
      },
      setavatar1(id, url) {
         this.foda.licenseUrl = url
         this.preview1 = true
      },
      // 下拉树
      typeTreea(value) {
         this.foda.manageType = this.typeShop[value].type
         this.type = this.typeShop[value].type
      },
      // handler
      nextStep() {
         this.$refs.foda.validate((valid) => {
            // 校验未全部通过，结束当前提交 (验证失败)
            if (!valid) {
               return false
               this.currentTab = this.currentTab
            } else if (this.currentTab < 2) {
               this.currentTab += 1
               this.isHide = false
               this.isHidea = 1
            }
         })
      },
      nextStepa() {
         this.isHide = true
         this.isHidea = 2
         if (this.currentTab < 2) {
            this.currentTab += 1
         }
         this.foda['type'] = 8
         return addShop(this.foda)
      },
      prevStep() {
         this.isHide = true
         this.isHidea = 0
         if (this.currentTab > 0) {
            this.currentTab -= 1
         }
      },
      finish() {
         this.isHide = true
         this.isHidea = 0
         this.currentTab = 0
         this.foda = {}
         this.fileList = []
         this.fileList2 = []
         this.type = ''
         this.preview1 = false
         this.preview = false
         this.foda.userId = JSON.parse(localStorage.getItem('cf01'))
      },
      getLocalStorage() {
         this.foda.userId = JSON.parse(localStorage.getItem('cf01'))
      },
   },
   mounted() {
      this.getLocalStorage()
   },
}
</script>

<style lang="less" scoped>
.steps {
   max-width: 750px;
   margin: 16px auto;
}



.ant-upload.ant-upload-select-picture-card{

   img{
      width: 100%;
   }
}
</style>