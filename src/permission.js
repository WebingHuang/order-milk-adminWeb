import router from './router'
import store from './store'
import storage from 'store'
import NProgress from 'nprogress' // progress bar
import '@/components/NProgress/nprogress.less' // progress bar custom style
import notification from 'ant-design-vue/es/notification'
import { setDocumentTitle, domTitle } from '@/utils/domUtil'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { i18nRender } from '@/locales'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const allowList = ['login', 'register', 'registerResult'] // no redirect allowList
const loginRoutePath = '/user/login'
const defaultRoutePath = '/dashboard/workplace'

router.beforeEach((to, from, next) => {
  NProgress.start() // 开始进度条
  to.meta && (typeof to.meta.title !== 'undefined' && setDocumentTitle(`${i18nRender(to.meta.title)} - ${domTitle}`))
  /* has token */
  // 判断是不是有token
  if (storage.get(ACCESS_TOKEN)) {
    if (to.path === loginRoutePath) {
      // 如果有token,跳转到登录页默认重定向到系统首页
      next({ path: defaultRoutePath })
      NProgress.done()
    } else {
      // console.log(store)
      // check login user.roles is null
      // 检查登录用户角色为空
      if (store.getters.roles.length === 0) {
        // request login userInfo
        // 请求登录用户信息
        store
          .dispatch('GetInfo')
          .then(res => {

            if(res.message){
              notification.error({
                message: '错误',
                description: '请求用户信息失败，请重试'
              })

              // 失败时，获取用户信息失败时，调用登出，来清空历史保留信息
              store.dispatch('Logout').then(() => {
                next({ path: loginRoutePath, query: { redirect: to.fullPath } })
              })
              .catch((err) => {

                console.log(err)
                console.log("++++++++")
                alert()

                return
              })

            }

            // const roles = JSON.parse(res.result) && JSON.parse(res.result).role
            res.userInfo.userPhone = res.userInfo.userPhone.replace(/(.{3}).*(.{3})/, "$1******$2")



            const roles = res && res.role
            // console.log(roles)
            // generate dynamic router
            // 生成动态路由器
            // roles为用户的基本信息以及权限
            store.dispatch('GenerateRoutes', { roles }).then(() => {
              // 根据roles权限生成可访问的路由表
              // 动态添加可访问路由表

              router.addRoutes(store.getters.addRouters)
              // 请求带有 redirect 重定向时，登录自动重定向到该地址
              const redirect = decodeURIComponent(from.query.redirect || to.path)
              if (to.path === redirect) {
                // set the replace: true so the navigation will not leave a history record
                next({ ...to, replace: true })
              } else {
                // 跳转到目的路由
                next({ path: redirect })
              }
            })
          })
          .catch((err) => {

            console.log(err)

            notification.error({
              message: '错误',
              description: '请求用户信息失败，请重试'
            })

            // 失败时，获取用户信息失败时，调用登出，来清空历史保留信息
            store.dispatch('Logout')
              .then(() => {

                next({ path: loginRoutePath, query: { redirect: to.fullPath } })

              })
              .catch((err) => {

                console.log(err)
                console.log("-----")


                return
              })


            //userinfo接口出来后删除下面内容


          })
      } else {
        next()
      }
    }
  } else {
    if (allowList.includes(to.name)) {
      // 在免登录名单，直接进入
      next()
    } else {
      next({ path: loginRoutePath, query: { redirect: to.fullPath } })
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
