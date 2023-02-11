// with polyfills
import 'core-js/stable'
import 'regenerator-runtime/runtime'


import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import i18n from './locales'
import { VueAxios } from './utils/request'
import ProLayout, { PageHeaderWrapper } from '@ant-design-vue/pro-layout'
import themePluginConfig from '../config/themePluginConfig'
// 引入树组件
import { FormModel,TreeSelect,Cascader } from 'ant-design-vue';
// 注册表单组件
Vue.use(FormModel);
// 注册树组件
Vue.use(TreeSelect);
// 注册级联选择组件
Vue.use(Cascader);
// 引入公共js
import {renderTime} from './utils/common'
// 转换时间戳方法
Vue.prototype.$renderTime=renderTime;
// mock
// WARNING: `mockjs` NOT SUPPORT `IE` PLEASE DO NOT USE IN `production` ENV.
// import './mock'

import bootstrap from './core/bootstrap'
import './core/lazy_use' // use lazy load components
import './permission' // permission control   开启权限放开此注释
import './utils/filter' // global filter
import './global.less' // global style

Vue.config.productionTip = false

// mount axios to `Vue.$http` and `this.$http`
Vue.use(VueAxios)
// use pro-layout components
Vue.component('pro-layout', ProLayout)
Vue.component('page-container', PageHeaderWrapper)
Vue.component('page-header-wrapper', PageHeaderWrapper)

window.umi_plugin_ant_themeVar = themePluginConfig.theme

new Vue({
  router,
  store,
  i18n,
  // init localstorage, vuex
  created: bootstrap,
  render: h => h(App)
}).$mount('#app')
