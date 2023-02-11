import storage from 'store'
import { login, getInfo} from '@/api/login'
import { logout } from '@/api/user'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { welcome } from '@/utils/util'

const user = {
  state: {
    token: '',
    name: '',
    welcome: '',
    avatar: '',
    roles: [],
    info: {}
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, { name, welcome }) => {
      state.name = name
      state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
    }
  },

  actions: {
    // 登录
    Login ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {
          const result = response;
          if (result.code == 200) {
            //登录成功
            storage.set(ACCESS_TOKEN, result.data.token, 1 * 24 * 60 * 60 * 1000)
            // storage.set("cf01", result.cf01, 1 * 24 * 60 * 60 * 1000)
            // commit('cf01', result.cf01)
            commit('SET_TOKEN', result.data.token)
            resolve()
          } else {
              //登录失败
            // alert("登录失败");
            // storage.set("cf01", result.cf01, 1 * 24 * 60 * 60 * 1000)
            // commit('cf01', '')
            commit('SET_TOKEN', '')
          }


        }).catch(error => {
          reject(error)
        })
      })
    },


    // 获取用户信息
    GetInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          // 用户的基本信息
          if (response.message) {
            storage.remove('cf01')
            storage.remove(ACCESS_TOKEN)
            // commit('cf01', '')
            commit('SET_TOKEN', '')
          } else {
            // console.log(response)

          const result = response;

          if (result.role && result.role.permissions.length > 0) {
            // 获取不同模块下的权限
            const role = result.role
            role.permissions = result.role.permissions
            result.role.permissions.map(item => {
              if (item.children) {
                item.children.map(child => {
                  // console.log(child)
                  role.permissions.push(child.name)
                  if (child.children) {
                    child.children.map(child => {
                      role.permissions.push(child.name)
                    })
                  }
                })
              }
              role.permissions.push(item.name)
            })
            // 返回一个新的role实例
            // role.permissions.map(per => {
            //   // per相当于role.permission
            //   // 不同模块的按钮权限
            //   if (per.actionEntitySet != null && per.actionEntitySet.length > 0) {
            //     const action = per.actionEntitySet.map(action => { return action.action })
            //     per.actionList = action
            //   }
            // })
            role.permissionList = role.permissions.map(permission => {
              return permission
            })
            commit('SET_ROLES', result.role)
            commit('SET_INFO', result)
          } else {
            reject(new Error('getInfo: roles must be a non-null array !'))
          }

          commit('SET_NAME', { name: result.name, welcome: welcome() })
          commit('SET_AVATAR', result.avatar)

          resolve(response)
          }
        }).catch(error => {
          reject(error)
        })


        // 发起请求获取用户信息
        // getInfo({userId:storage.get("cf01"),end:"pc"}).then(response => {
        //   // 用户的基本信息

        //   const result = JSON.parse(response.result);
        //   console.log(result)
        //   if (result.role && result.role.permissions.length > 0) {
        //     // 获取不同模块下的权限
        //     const role = result.role
        //     role.permissions = result.role.permissions
        //     // 返回一个新的role实例
        //     role.permissions.map(per => {
        //       // per相当于role.permission
        //       // 不同模块的按钮权限
        //       if (per.actionEntitySet != null && per.actionEntitySet.length > 0) {
        //         const action = per.actionEntitySet.map(action => { return action.action })
        //         per.actionList = action
        //       }
        //     })
        //     role.permissionList = role.permissions.map(permission => { return permission.permissionId })
        //      console.log( result )
        //     commit('SET_ROLES', result.role)
        //     commit('SET_INFO', result)
        //   } else {
        //     reject(new Error('getInfo: roles must be a non-null array !'))
        //   }

        //   commit('SET_NAME', { name: result.name, welcome: welcome() })
        //   commit('SET_AVATAR', result.avatar)

        //   resolve(response)
        // }).catch(error => {
        //   reject(error)
        // })
      })
    },

    // 登出
    Logout({ commit }) {


      // 获取本地存储信息
      // const userInfo = {
      //   userId:localStorage.getItem("cf01"),
      // }
      // 请求退出接口
      return logout().then(res=>{
        // 清空本地存储
        localStorage.clear();
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        storage.remove(ACCESS_TOKEN)

      })
      .catch(err => {
        localStorage.clear();
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        storage.remove(ACCESS_TOKEN)
      })
    }

  }
}

export default user
