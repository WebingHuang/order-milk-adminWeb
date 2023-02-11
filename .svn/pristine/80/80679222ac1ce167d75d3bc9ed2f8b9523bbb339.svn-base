<template>
  <a-dropdown v-if="currentUser && currentUser.userInfo" placement="bottomRight">
    <span class="ant-pro-account-avatar">
      <a-avatar size="small" :src="currentUser.userInfo.userHeader" class="antd-pro-global-header-index-avatar" />
      <span>{{ currentUser.userInfo.userName }}</span>
    </span>
    <template v-slot:overlay>
      <a-menu class="ant-pro-drop-down menu" :selected-keys="[]">
        <!-- <a-menu-item v-if="menu" key="center" @click="handleToCenter">
          <a-icon type="user" />
          个人中心
        </a-menu-item> -->
        <a-menu-item v-if="menu" key="settings" @click="handleToSettings">
          <a-icon type="setting" />
          个人设置
        </a-menu-item>
        <a-menu-divider v-if="menu" />
        <a-menu-item key="logout" @click="handleLogout">
          <a-icon type="logout" />
          退出登录
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
  <span v-else>
    <a-spin size="small" :style="{ marginLeft: 8, marginRight: 8 }" />
  </span>
</template>

<script>
import { Modal } from 'ant-design-vue'
import { logout } from '@/api/user'
import storage from 'store'

export default {
  name: 'AvatarDropdown',
  props: {
    currentUser: {
      type: Object,
      default: () => {}
    },
    menu: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    handleToCenter () {
      // 跳转到个人中心
      this.$router.push({ path: '/account/center' })
    },
    // 跳转到个人设置
    handleToSettings () {
      this.$router.push({ path: '/account/settings' })
    },
    // 退出登录
    handleLogout (e) {
      Modal.confirm({
        title: this.$t('退出登录'),
        content: this.$t('确认是否退出系统嘛'),
        onOk: () => {
          // 调用vuex中退出方法
          return this.$store.dispatch('Logout').then((res) => {
            console.log(res)

            return
            // 跳转到登录页
            this.$router.push({ name: 'login' })
          })
        },
        onCancel () {}
      })
    }
  }
}
</script>

<style lang="less" scoped>
.ant-pro-drop-down {
  /deep/ .action {
    margin-right: 8px;
  }
  /deep/ .ant-dropdown-menu-item {
    min-width: 160px;
  }
}
</style>
