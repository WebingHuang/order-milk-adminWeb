import request from '@/utils/request'




const api = {
   getUserBaseInfo: '/users/getUserInfo',  // 获取当前用户信息
   updateUserInfo: '/users/updateUserInfo', // 修改当前用户信息
   logout: '/sys/logout', // 退出账号
}

export default api

export function logout (query) {
  return request({
    url: api.logout,
    method: 'get',
    params: query
  })
}


export function updateUserInfo (query) {
  return request({
    url: api.updateUserInfo,
    method: 'post',
    params: query
  })
}

export function getUserBaseInfo (query) {
  return request({
    url: api.getUserBaseInfo,
    method: 'post',
    params: query
  })
}


