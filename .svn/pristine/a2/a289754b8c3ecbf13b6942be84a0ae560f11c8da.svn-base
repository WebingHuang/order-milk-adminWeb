<template>
   <div class="account-settings-info-view" v-if="isShow">
      <a-row :gutter="16">
         <a-col :md="24" :lg="16">
            <a-form layout="vertical">
               <a-form-item label="用户名">
                  <span>{{ userInfo.userName }}</span>
               </a-form-item>

               <!-- <a-form-item label="手机">
                  <span>{{ userInfo.phone }}</span>
               </a-form-item> -->

               <a-form-model-item has-feedback label="性别">
                  <span>{{ userInfo.sex }}</span>
               </a-form-model-item>

               <a-form-item label="昵称">
                  <span>{{ userInfo.nickName }}</span>
               </a-form-item>

               <a-form-item label="角色" :required="false">
                  <!-- <span v-for="(item,index) in roleNames" :key="index">{{ item }}</span> -->
                  <a-tag v-for="(item, index) in roleNames" :key="index">
                     {{ item }}
                  </a-tag>
               </a-form-item>

               <a-form-item label="创建时间" :required="false">
                  <span>{{ createDate }}</span>
               </a-form-item>

               <a-form-item>
                  <a-button type="primary" @click="isShow = !isShow">编辑</a-button>
               </a-form-item>
            </a-form>
         </a-col>
         <a-col :md="24" :lg="8" :style="{ minHeight: '180px' }">
            <div class="ant-upload-preview">
               <!-- <a-icon type="cloud-upload-o" class="upload-icon" /> -->
               <!-- <div class="mask">
                  <a-icon type="plus" />
               </div> -->
               <img :src="option.img" />
            </div>
         </a-col>
      </a-row>
      <!-- <avatar-modal ref="modal" @ok="setavatar" /> -->
   </div>
   <div class="account-settings-info-view" v-else>
      <a-row :gutter="16">
         <a-col :md="24" :lg="16">
            <a-form layout="vertical">
               <!-- <a-form-item label="手机">
                  <a-input placeholder="给自己起个名字" v-model="userInfo.phone" />
               </a-form-item> -->

               <a-form-model-item has-feedback label="性别">
                  <a-radio-group v-model="userInfo.sex">
                     <a-radio value="男"> 男 </a-radio>
                     <a-radio value="女"> 女 </a-radio>
                  </a-radio-group>
               </a-form-model-item>

               <a-form-item label="昵称">
                  <a-input placeholder="给自己起个名字" v-model="userInfo.nickName" />
               </a-form-item>

               <!-- <a-form-item label="邮箱" :required="false">
                  <a-input placeholder="exp@admin.com" v-model="userInfo.email" />
               </a-form-item> -->

               <!-- <a-form-item label="登录密码" :required="false">
                  <a-input placeholder="密码" />
               </a-form-item>

               <a-form-item label="确认密码" :required="false">
                  <a-input placeholder="密码" />
               </a-form-item> -->

               <a-form-item>
                  <a-button type="primary" @click="handleSubmit">提交</a-button>
                  <a-button style="margin-left: 8px" @click="closeEdit">取消</a-button>
               </a-form-item>
            </a-form>
         </a-col>
         <a-col :md="24" :lg="8" :style="{ minHeight: '180px' }">
            <div class="ant-upload-preview" @click="$refs.modal.edit(1, option.img)">
               <a-icon type="cloud-upload-o" class="upload-icon" />
               <div class="mask">
                  <a-icon type="plus" />
               </div>
               <img :src="option.img" />
            </div>
         </a-col>
      </a-row>
      <avatar-modal ref="modal" @ok="setavatar" />
   </div>
</template>

<script>
// 图片裁切组件
import AvatarModal from '@/views/account/settings/AvatarModal'
// 获取用户信息接口
import { getUserBaseInfo, updateUserInfo, getRole } from '@/api/account'

export default {
   name: 'aaa',
   components: {
      AvatarModal,
   },
   data() {
      return {
         userId: '', // 本地存贮中获取用户信息接口参数
         userInfo: {}, // 当前用户信息
         isShow: true, // 个人信息展示状态/编辑状态
         oldImg: '', // 用户修改前的头像
         createDate: '', // 用户创建时间
         roleNames: [], // 当前用户角色名称列表
         // cropper
         // preview: {},
         // 头像参数
         option: {
            img: this.$store.getters.userInfo.userInfo.photoSrc,
            info: true,
            size: 1,
            outputType: 'jpeg',
            canScale: false,
            autoCrop: true,
            // 只有自动截图开启 宽度高度才生效
            autoCropWidth: 180,
            autoCropHeight: 180,
            fixedBox: true,
            // 开启宽度和高度比例
            fixed: true,
            fixedNumber: [1, 1],
         },
      }
   },
   created() {
      this.getInfo() // 重新获取用户信息
      this.createDate = this.$renderTime(this.userInfo.createDate).substr(0, 10) // 处理创建时间格式
      console.log(this.$store.getters.userInfo.userInfo)
      return getRole().then((res) => {
         console.log(res)
         let roleListArr = this.userInfo.roleList.split(',').map((item) => {
            return item - 0
         })
         console.log(this.userInfo.roleList)
         roleListArr.forEach((item) => {
            res.data.forEach((item_) => {
               if (item == item_.roleId) {
                  this.roleNames.push(item_.roleName)
               }
            })
         })
         console.log(this.roleNames)
      })
   },
   methods: {
      setavatar(url) {
         console.log(url)
         this.option.img = url
      },
      getInfo() {
         // 状态管理中获取用户个人信息
         this.userInfo = this.deepClone(this.$store.getters.userInfo.userInfo)
         this.oldImg = this.userInfo.photoSrc // 保存修改前的头像
      },
      // 提交修改
      async handleSubmit() {
         this.userInfo['oldImg'] = this.oldImg // 修改参数中保存修改前的图片
         this.userInfo['type'] = 1
         this.userInfo.photoSrc = this.option.img // 修改参数中保存修改后的图片
         console.log(this.oldImg)
         // 修改接口
         await updateUserInfo(this.userInfo).then(async (res) => {
            // this.$router.go(0) // 重新加载页面
            // 直接改变状态管理中的个人信息,重新渲染顶部头像和昵称
            delete this.userInfo['oldImg'] // 删除元素
            if (res.state == '2000') {
               // 重新获取个人信息
               await this.$store.dispatch('GetInfo')
               this.getInfo() // 重新获取用户信息
               this.isShow = !this.isShow
               this.$message.success(res.message)
            } else {
               this.$message.success(res.message)
            }
         })
      },
      // 取消修改
      async closeEdit() {
         await this.getInfo() // 重新获取用户信息
         this.option.img=this.userInfo.photoSrc
         this.isShow = !this.isShow
      },

      // 深复制方法
      deepClone(source) {
         const targetObj = source.constructor === Array ? [] : {} // 判断复制的目标是数组还是对象
         for (let keys in source) {
            // 遍历目标
            if (source.hasOwnProperty(keys)) {
               if (source[keys] && typeof source[keys] === 'object') {
                  // 如果值是对象，就递归一下
                  targetObj[keys] = source[keys].constructor === Array ? [] : {}
                  targetObj[keys] = deepClone(source[keys])
               } else {
                  // 如果不是，就直接赋值
                  targetObj[keys] = source[keys]
               }
            }
         }
         return targetObj
      },
   },
}
</script>

<style lang="less" scoped>
.avatar-upload-wrapper {
   height: 200px;
   width: 100%;
}

.ant-upload-preview {
   position: relative;
   margin: 0 auto;
   width: 100%;
   max-width: 180px;
   border-radius: 50%;
   box-shadow: 0 0 4px #ccc;

   .upload-icon {
      position: absolute;
      top: 0;
      right: 10px;
      font-size: 1.4rem;
      padding: 0.5rem;
      background: rgba(222, 221, 221, 0.7);
      border-radius: 50%;
      border: 1px solid rgba(0, 0, 0, 0.2);
   }
   .mask {
      opacity: 0;
      position: absolute;
      background: rgba(0, 0, 0, 0.4);
      cursor: pointer;
      transition: opacity 0.4s;

      &:hover {
         opacity: 1;
      }

      i {
         font-size: 2rem;
         position: absolute;
         top: 50%;
         left: 50%;
         margin-left: -1rem;
         margin-top: -1rem;
         color: #d6d6d6;
      }
   }

   img,
   .mask {
      width: 100%;
      max-width: 180px;
      height: 100%;
      border-radius: 50%;
      overflow: hidden;
   }
}
</style>
