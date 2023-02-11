<template>
   <a-list itemLayout="horizontal" :dataSource="userDate">
      <a-list-item slot="renderItem" slot-scope="item, index" :key="index">
         <a-list-item-meta>
            <a slot="title">{{ item.title }}</a>
            <span slot="description" v-show="item.flag">
               <span class="security-list-description">{{ item.description }}</span>
               <span class="security-list-value" v-if="item.id == 1"> : {{ item.value }}</span>
               <span class="security-list-value" v-if="item.id == 2"> : ******</span>
               <span class="security-list-value" v-if="item.id == 3">
                  : {{ item.value.replace(/(.{3}).*(.{3})/, '$1******$2') }}</span
               >
            </span>
            <span slot="description" v-show="!item.flag">
               <a-input v-model="item.value" allowClear style="width: 300px" />
               <!-- <a-input v-if="item.id == 2"></a-input> -->
            </span>
         </a-list-item-meta>
         <template>
            <!-- <a slot="actions" @click="item.actions.callback">{{ item.actions.title }}</a> -->
            <a @click="updata(item)" v-show="item.flag == true && item.id != 1">修改</a>
            <a @click="ok(item)" v-show="item.flag == false">保存</a>
            <a v-show="item.flag == false" style="margin: 0 5px; color: #ccc">/</a>
            <a @click="close(item)" v-show="item.flag == false">取消</a>
         </template>
      </a-list-item>
   </a-list>
</template>

<script>
// 修改信息接口
import { updateUserInfo } from '@/api/account'

// 深复制方法
function deepClone(source) {
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
}

export default {
   data() {
      return {
         userInfo: [],
         userDate: [],
      }
   },
   created() {
      this.getuser()
   },
   methods: {
      // 点击修改切换按钮
      updata(item) {
         item.flag = false
         // 修改某一个,关闭其他修改,类似tab切换
         this.userDate.forEach((item_) => {
            if (item_.id != item.id) {
               item_.flag = true
            }
         })
      },
      // 提交修改
      async ok(item) {
         // 修改参数
         let parameter = {
            userId: this.userInfo.userId,
            oldImg: '',
            type: 1,
         }
         let attr = null //保存当前要修改的属性名称
         switch (item.id) {
            case 1:
               attr = 'phone' // 手机号
               break
            case 2:
               attr = 'password' // 密码
               break
            case 3:
               attr = 'email' // 邮箱
               break
            default:
               attr = ''
         }
         parameter[attr] = item.value // 参数赋值
         if (parameter[attr] != '') {
            await updateUserInfo(parameter).then(async (res) => {
               if (attr == 'email') {
                  // 更新个人信息
                  await this.$store.dispatch('GetInfo')
                  this.$message.success(res.message)
               }
               if (attr == 'password') {
                  this.$router.go(0) // 重新加载页面
               }
               this.getuser()
            })
         }
         item.flag = true
      },
      // 取消修改
      async close(item) {
         await this.$store.dispatch('GetInfo')
         this.getuser()
      },

      // 获取用户信息
      getuser() {
         this.userInfo = deepClone(this.$store.getters.userInfo.userInfo)
         this.userDate = [
            {
               id: 1,
               flag: true,
               title: '手机',
               description: '已绑定手机',
               value: this.userInfo.phone,
            },
            {
               id: 2,
               flag: true,
               title: '密码',
               description: '当前密码',
               value: '',
            },
            {
               id: 3,
               flag: true,
               title: '邮箱',
               description: '已绑定邮箱',
               value: this.userInfo.email,
            },
         ]
      },
   },
}
</script>

<style scoped>
</style>
