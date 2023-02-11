<template>
   <div :class="wrpCls">
      <avatar-dropdown :menu="showMenu" :current-user="currentUser" :class="prefixCls" />
      <!-- <select-lang :class="prefixCls" /> -->
   </div>
</template>

<script>
import AvatarDropdown from './AvatarDropdown'
// import SelectLang from '@/components/SelectLang' // 顶部右侧选择语言组件
import store from '../../store/index'

export default {
   name: 'RightContent',
   components: {
      AvatarDropdown,
      // SelectLang
   },
   props: {
      prefixCls: {
         type: String,
         default: 'ant-pro-global-header-index-action',
      },
      isMobile: {
         type: Boolean,
         default: () => false,
      },
      topMenu: {
         type: Boolean,
         required: true,
      },
      theme: {
         type: String,
         required: true,
      },
   },
   data() {
      return {
         showMenu: true,
         currentUser: {},
      }
   },
   computed: {
      wrpCls() {
         return {
            'ant-pro-global-header-index-right': true,
            [`ant-pro-global-header-index-${this.isMobile || !this.topMenu ? 'light' : this.theme}`]: true,
         }
      },
      // 定义计算属性接收Vuex中的个人信息
      info() {
         //  计算属性
         return this.$store.getters.userInfo.userInfo //  Vuex 中定义的属性
      },
   },
   mounted() {
      this.getInfo()
   },
  //  监听个人信息,如果发生变化,重新赋值
   watch: {
      info() {
         this.getInfo() //   需要调用的方法
      },
   },
   methods: {
      getInfo() {
         this.currentUser = {
            // 从状态管理中拿到用户信息
            userInfo: this.$store.getters.userInfo.userInfo,
         }
      },
   },
}
</script>
