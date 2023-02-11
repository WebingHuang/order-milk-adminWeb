import { asyncRouterMap, constantRouterMap } from '@/config/router.config'

/**
 * 过滤账户是否拥有某一个权限，并将菜单从加载列表移除
 *
 * @param permission
 * @param route
 * @returns {boolean}
 */
function hasPermission (permission, route) {
  // permission:当前用户的所有权限
  // route:所有的路由信息
  if (route.meta && route.meta.permission) {
    let flag = false
    for (let i = 0, len = permission.length; i < len; i++) {
      // 判断每一条路由相对应的权限里是包含当前用户的权限
      flag = route.meta.permission.includes(permission[i])
      if (flag) {
        return true
      }
    }
    return false
  }
  return true
}

/**
 * 单账户多角色时，使用该方法可过滤角色不存在的菜单
 *
 * @param roles
 * @param route
 * @returns {*}
 */
// eslint-disable-next-line
function hasRole(roles, route) {
  if (route.meta && route.meta.roles) {
    return route.meta.roles.includes(roles.id)
  } else {
    return true
  }
}

function filterAsyncRouter(routerMap, roles) {
  // console.log(roles)
  // console.log(routerMap)
  // routerMap:所有的路由信息
  // roles:用户的权限信息
  // 只返回 hasPermission
  const accessedRouters = routerMap.filter(route => {
    if (hasPermission(roles.permissionList, route)) {
      if (route.children && route.children.length) {
        // 子路由也进行匹配,传递的参数顺序正反无所谓,因为是进行相互匹配
        route.children = filterAsyncRouter(route.children, roles)

      }

      return true
    }
    return false
  })

  return accessedRouters
}

function recursion(obj) {
  obj.map(item => {
    if (item.meta) {
      item.meta = JSON.parse(item.meta);
    }
    if (item.children) {
      // console.log(item.children)
      recursion(item.children); //递归遍历
    }
  })
  return obj
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes ({ commit }, data) {
      return new Promise(resolve => {
        const { roles } = data
        // console.log(asyncRouterMap)
        recursion(roles.permissions);
        // roles.permissions.map(item => {
        //   if (item.meta) {
        //     item.meta = JSON.parse(item.meta);
        //   }
        //   if (item.children) {
        //     console.log(item)
        //     item.children.map(child => {
        //       child.meta = JSON.parse(child.meta);
        //       // console.log(child)
        //     });
        //   }
        // })

        // console.log(roles.permissions)

        // 过滤器将路由中匹配的路由过滤出来,并且将过滤出来的路由存储到Vuex中
        // accessedRouters就是最终想要的根据账号权限匹配后的正确路由
        const accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
        // console.log("accessedRouters:")
        // console.log(accessedRouters)
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

export default permission
