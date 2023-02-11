<template>
  <div id="audit">
    <page-header-wrapper>
      <!-- 新增公司 -->
      <!-- PageHeader 第二种使用方式 (v-slot) -->
      <template v-slot:content> 新建公司信息 </template>
      <a-card :bordered="false">
        <a-steps class="steps" :current="currentTab">
          <a-step title="填写公司信息" />
          <a-step title="确认公司信息" />
          <a-step title="完成" />
        </a-steps>
        <div>
          <!-- 初始数据 -->
          <a-form style="max-width: 500px; margin: 40px auto 0" v-if="isHide && isHidea == 0">
            <a-form-model :model="foda" :label-col="labelCol" :wrapper-col="wrapperCol" ref="foda" :rules="rules">
              <a-form-model-item label="公司名称" prop="companyName">
                <a-input v-model="foda.companyName" />
              </a-form-model-item>
              <a-form-model-item label="公司类型">
                <!-- <a-input v-model="foda.companyType" /> -->
                <!-- 下拉树 -->
                <a-select :size="size" :value="companyType" style="width: 200px" @change="typeTreea">
                  <a-select-option v-for="(item, index) in typecompanya" :key="index">
                    {{ item.companyType }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>

              <!-- logo -->
              <a-form-model-item label="Logo">
                <!-- logo -->
                <div
                  class="ant-upload-preview ant-upload ant-upload-select ant-upload-select-picture-card"
                  @click="$refs.upimg.edit(1)"
                >
                  <img v-if="preview" :src="foda.icon" style="height: 100px; width: 100px" />
                  <img v-else src="../../../assets/upload.jpg" style="height: 50px; width: 50px; margin-top: 25%;"/>
                </div>
                <HeadCut ref="upimg" @ok="setavatar"/>
              </a-form-model-item>


              <!-- 营业执照 -->
              <a-form-model-item label="营业执照">
               <div
                  class="ant-upload-preview ant-upload ant-upload-select ant-upload-select-picture-card"
                  @click="$refs.upimg1.edit(2)"
                >
                  <img v-if="preview1" :src="foda.licenseUrl" style="height: 100px; width: 100px" />
                  <img v-else src="../../../assets/upload.jpg" style="height: 50px; width: 50px; margin-top: 25%;"/>
                </div>
                <HeadCut1 ref="upimg1" @ok="setavatar1"/>
              </a-form-model-item>

              <a-form-model-item label="描述">
                <a-input v-model="foda.describe" />
              </a-form-model-item>
            </a-form-model>
            <a-form-item :wrapperCol="{ span: 19, offset: 5 }">
              <a-button type="primary" @click="nextStep">下一步</a-button>
            </a-form-item>
          </a-form>
          <!-- 点击下一步以后展示的数据 -->
          <a-form style="max-width: 500px; margin: 40px auto 0" v-if="!isHide && isHidea == 1">
            <a-form-model :label-col="labelCol" :wrapper-col="wrapperCol" ref="foda" :model="foda">
              <a-form-model-item label="公司名称">
                {{ foda.companyName }}
              </a-form-model-item>
              <a-form-model-item label="公司类型">
                {{ foda.companyType }}
              </a-form-model-item>
              <a-form-model-item label="Logo">
                <img :src="foda.icon" style="width: 100px; height: 100px" />
              </a-form-model-item>
              <a-form-model-item label="营业执照">
                <img :src="foda.licenseUrl" style="width: 100px; height: 100px" />
              </a-form-model-item>
              <a-form-model-item label="描述">
                {{ foda.describe }}
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
                <a-form-model-item label="公司名称">
                  {{ foda.companyName }}
                </a-form-model-item>
                <a-form-model-item label="公司类型">
                  {{ foda.companyType }}
                </a-form-model-item>
                <a-form-model-item label="Logo">
                  <img :src="foda.icon" style="width: 100px; height: 100px" />
                </a-form-model-item>
                <a-form-model-item label="营业执照">
                  <img :src="foda.licenseUrl" style="width: 100px; height: 100px" />
                </a-form-model-item>
                <a-form-model-item label="描述">
                  {{ foda.describe }}
                </a-form-model-item>
              </a-form-model>
              <a-form-item :wrapperCol="{ span: 19, offset: 5 }">
                <a-button type="primary" @click="finish">已完成,点我返回</a-button>
              </a-form-item>
            </a-result>
          </a-form>
        </div>
        <div class="step-form-style-desc">
          <h3>说明</h3>
          <h4>转账到支付宝账户</h4>
          <p>
            如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。
          </p>
        </div>
      </a-card>
    </page-header-wrapper>
  </div>
</template>

<script>
// 引入新建接口
import { addCompany, filesCompany, typeCompany } from '@/api/company'
import HeadCut from './HeadCut'
import HeadCut1 from './HeadCut'

// 上传图片
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}
export default {
  name: 'StepForm',
  components: {
    HeadCut,
    HeadCut1
  },
  data() {
    return {
      // 判断是上传Logo还是执照的值
      flag:false,
      LogoandLicense:false,
      preview: false,
      preview1: false,
      // 公司类型
      typecompanya: [],
      companyType: '',
      // 公司类型下拉
      size: 'default',
      // 储存图片的数组
      fileList: [],
      fileList2: [],
      previewVisible: false,
      previewVisible2: false,
      previewImage: '',
      previewImage2: '',
      foda: {
        companyName: '',
        companyType: '',
        userId: '',
        icon: '',
        authentication: '',
        describe: '',
        nickName: '',
        introduce: '',
        id: '',
        licenseUrl: '',
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
        companyName: [
          { required: true, message: '请输入公司名称' },
          { whitespace: true, message: '不能添加空格' },
          { pattern: /^[\u4e00-\u9fa5]{0,}$/, message: '输入有误' },
          { max: 20, message: '最大10个字符' },
          { min: 3, message: '最小3个字符' },
        ]
      },
    }
  },
  methods: {
    setavatar(id,url) {
        this.foda.icon = url
        this.preview = true
    },
    setavatar1(id,url) {
        this.foda.licenseUrl = url
        this.preview1 = true
    },
    // 下拉树
    typeTreea(value) {
      this.foda.companyType = this.typecompanya[value].id
      this.companyType = this.typecompanya[value].companyType
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
      this.foda['type'] = 5
      return addCompany(this.foda)
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
      this.companyType = ''
      this.preview1 = false
      this.preview = false
      this.foda.userId = JSON.parse(localStorage.getItem('cf01'))
    },
    typeCompanyaa() {
      return typeCompany().then((res) => {
        this.typecompanya = res.data
      })
    },
    getLocalStorage() {
      this.foda.userId = JSON.parse(localStorage.getItem('cf01'))
    },

  },
  mounted() {
    this.typeCompanyaa()
    this.getLocalStorage()
  },
}
</script>

<style lang="less" scoped>
.steps {
  max-width: 750px;
  margin: 16px auto;
}
</style>